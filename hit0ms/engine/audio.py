import json,sys,numpy as np
from scipy.signal import butter,sosfilt
from scipy.io import wavfile
d=sys.argv[1];kinds=json.loads(sys.argv[2])   # obj -> sound kind
TL=json.load(open(d+'/timeline.json'));SR=48000;fps=TL['fps']
N=int(TL['total']/fps*SR);out=np.zeros(N);rng=np.random.default_rng(23)
def bp(x,lo,hi):return sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def lp(x,f):return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f):return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
def add(sig,t,g=1.0):
    i=int(t*SR)%N;idx=(i+np.arange(len(sig)))%N;np.add.at(out,idx,sig*g)
tt=lambda d:np.arange(int(d*SR))/SR
noise=lambda d:rng.standard_normal(int(d*SR))
def ping(t0,f0,d,g):w=tt(d);add(np.sin(2*np.pi*f0*w)*np.exp(-w*(6/d)),t0,g)

def sweep_bp(sig,f0,f1,q=3.0):
    out=np.zeros_like(sig);n=len(sig);ch=240;zi=None
    for i in range(0,n,ch):
        t=i/max(1,n-1);fc=f0*(f1/f0)**t;bw=fc/q
        sos=butter(2,[max(40,fc-bw/2),min(SR/2-100,fc+bw/2)],'band',fs=SR,output='sos')
        if zi is None or zi.shape!=(sos.shape[0],2):zi=np.zeros((sos.shape[0],2))
        out[i:i+ch],zi=sosfilt(sos,sig[i:i+ch],zi=zi)
    return out
def smash(t0,size=1.0,wet=1.0,crack=0.0,lo=350):
    w=tt(.22);add(np.sin(2*np.pi*np.cumsum(75*size**-0.3*np.exp(-w*6)+35)/SR)*np.exp(-w*14),t0,1.1*size)       # thump
    if crack:add(hp(noise(.035),2500)*np.exp(-tt(.035)*160),t0,crack)                                              # crack
    d=0.42*size**0.5;w=tt(d);am=0.55+0.45*np.sin(2*np.pi*32*w)*np.sin(2*np.pi*7*w)
    sq=sweep_bp(noise(d)*am,2400,lo)*np.minimum(1,w/0.004)*np.exp(-w*(6.5/size**0.5))
    add(sq/np.max(np.abs(sq)+1e-9),t0+0.005,0.9*wet)                                                             # squelch
    for _ in range(int(8*wet*size)):                                                                               # wet splats
        dd=rng.uniform(.02,.05);add(lp(noise(dd),rng.uniform(900,1800))*np.exp(-tt(dd)*90),t0+rng.uniform(.02,.45*size),rng.uniform(.2,.45)*wet)
    for _ in range(int(5*wet)):                                                                                    # drips/bubbles
        dd=.03;w=tt(dd);f=np.linspace(rng.uniform(450,700),rng.uniform(1000,1500),len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*70),t0+rng.uniform(.15,.6),0.12)

def slap(t0,g=1.0,body=170):
    w=tt(.09);add(lp(noise(.09),3200)*np.exp(-w*55),t0,1.0*g);w=tt(.18);add(np.sin(2*np.pi*body*w*(1-0.25*w/0.18))*np.exp(-w*28),t0,0.55*g)
def patter(t0,n=40,spread=.45,g=0.18):
    for t in np.sort(t0+np.abs(rng.normal(0,spread/2.5,n))):
        dd=.012;add(bp(noise(dd),rng.uniform(2500,4500),rng.uniform(5500,8000))*np.exp(-tt(dd)*350),t,rng.uniform(.4,1)*g)
def pops(t0,n=10,g=0.22):
    for t in t0+rng.uniform(.02,.35,n):
        w=tt(.035);f=np.linspace(rng.uniform(900,1300),rng.uniform(2200,3200),len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*90),t,g)
def crackle(t0,n=25,g=0.3):
    for t in t0+np.abs(rng.normal(0,.05,n)):add(hp(noise(.02),1800)*np.exp(-tt(.02)*220),t,rng.uniform(.3,1)*g)

def wobble(t0,f=150,d=.7,g=.6):
    w=tt(d);fr=f*(1+0.35*np.sin(2*np.pi*9*w)*np.exp(-w*4));add(np.tanh(2*np.sin(2*np.pi*np.cumsum(fr)/SR))*np.exp(-w*5),t0,g);add(lp(noise(d),500)*np.exp(-w*6)*(0.5+0.5*np.sin(2*np.pi*9*w)),t0,g*0.6)
def puff(t0,g=.6):w=tt(.15);add(lp(noise(.15),700)*np.exp(-w*25),t0,g);add(np.sin(2*np.pi*(110-50*w)*w)*np.exp(-w*30),t0,g*0.6)
def click(t0,g):w=tt(.025);add(bp(noise(.025),2500,7000)*np.exp(-w*260),t0,g);ping(t0,rng.uniform(1800,3200),.04,g*0.5)
T=N/SR;beat=0.5
for k in range(int(T/beat)):
    t=k*beat;w=tt(.25);add(np.sin(2*np.pi*(55+70*np.exp(-w*25))*w)*np.exp(-w*10),t,0.25)
    w=tt(.12);add(np.sin(2*np.pi*[523,659,784,659][k%4]*w)*np.exp(-w*25),t+beat/2,0.05)
for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    dd=rs-st;add(bp(noise(dd),1500,4000)*np.linspace(.2,.7,int(dd*SR)),st,0.05)
    dd=ri-rs;add(bp(noise(dd),400,1600)*np.linspace(0,1,int(dd*SR))**2,rs,0.15)
    k=kinds[a['obj']]
    if k=='bricks':   # big plastic crash + cascade of clicks settling
        add(bp(noise(.12),1500,6000)*np.exp(-tt(.12)*35),ri,0.9);add(np.sin(2*np.pi*120*tt(.12))*np.exp(-tt(.12)*30),ri,0.5)
        ts=np.sort(ri+np.abs(rng.normal(0,.18,45)));[click(t,rng.uniform(.15,.4)) for t in ts]
    if k=='squash':smash(ri,0.8,1.0)
    if k=='squash_big':smash(ri,1.6,1.3,crack=0.9,lo=250)
    if k=='pizza_squash':smash(ri,1.0,0.9,crack=0.25,lo=300)
    if k=='gummy_squash':
        smash(ri,0.9,0.7,lo=300)
        for dt in (.05,.18,.3):w=tt(.15);f=320*(1+0.4*np.exp(-w*20));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*16),ri+dt,0.25)
    if k=='nigiri':slap(ri,1.0,190);smash(ri+.01,0.9,1.0,lo=320);patter(ri+.03,45)
    if k=='maki':
        for dt in (0,.07,.15):slap(ri+dt,0.6,140+dt*300)
        smash(ri,0.7,0.8,lo=300);patter(ri+.05,40)
    if k=='temaki':crackle(ri,28,0.35);smash(ri,0.9,1.0,lo=300);pops(ri+.03,14);patter(ri+.05,30)
    if k=='dragon':slap(ri,1.2,120);smash(ri,1.5,1.3,crack=0.3,lo=240);patter(ri+.04,60,.6)
    if k=='jello':slap(ri,0.7,160);smash(ri,0.9,1.0,lo=280);wobble(ri+.02,140,.8,.5);pops(ri+.05,6,.15)
    if k=='slime':smash(ri,1.4,1.5,lo=200);smash(ri+.12,0.7,1.0,lo=350);pops(ri+.1,16,.2)
    if k=='bear':
        slap(ri,0.9,130);smash(ri,0.9,0.7,lo=300)
        for dt,gg in ((.0,.55),(.22,.35),(.38,.2)):wobble(ri+dt,260+dt*200,.3,gg)
    if k=='marshmallow':
        for j,dt in enumerate((0,.08,.17,.3,.42)):puff(ri+dt,.7-j*.1)
        patter(ri+.05,12,.4,.08)
    if k=='squish':   # soft food thud + wet squish
        add(lp(noise(.3),900)*np.exp(-tt(.3)*14),ri,1.0);add(np.sin(2*np.pi*(90-40*tt(.2))*tt(.2))*np.exp(-tt(.2)*16),ri,0.7)
        for _ in range(5):add(bp(noise(.05),600,2000)*np.exp(-tt(.05)*60),ri+rng.uniform(.03,.25),0.25)
    if k=='crunch':   # crispy shell shatter
        for _ in range(18):add(hp(noise(.03),2000)*np.exp(-tt(.03)*150),ri+abs(rng.normal(0,.06)),rng.uniform(.2,.5))
        add(lp(noise(.25),1200)*np.exp(-tt(.25)*14),ri+.02,0.5)
    if k=='splat':    # cheesy splat
        add(lp(noise(.35),1600)*np.exp(-tt(.35)*10),ri,1.0)
        for _ in range(8):add(bp(noise(.04),1000,3000)*np.exp(-tt(.04)*80),ri+rng.uniform(.02,.3),0.2)
    if k=='bounce':   # donut boing + bounces
        for j,(dt,g) in enumerate([(0,1.0),(.28,.5),(.46,.25)]):
            w=tt(.3);f=200*(1+0.3*np.exp(-w*10))*(1+0.1*np.sin(2*np.pi*9*w));ph=2*np.pi*np.cumsum(f)/SR;add(np.sin(ph)*np.exp(-w*9),ri+dt,0.6*g);add(lp(noise(.08),800)*np.exp(-tt(.08)*40),ri+dt,0.6*g)
        for _ in range(12):ping(ri+rng.uniform(0,.4),rng.uniform(3000,6000),.05,0.05)
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd)
    fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.035)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([out,out],1).astype(np.float32));print('ok',N/SR)
