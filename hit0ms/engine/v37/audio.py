# v37 (#36 PARTY POPS): v35 helpers + party_* kinds (pop/bang/boom/kaboom + confetti rustle + party horn + cheer) + original synthwave loop
# usage: python3 audio.py v37 '{"popper":"party_1","cannon":"party_2","balloon":"party_3","bomb":"party_4"}'
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
def ooh(t0,d=1.0,g=.3,n=14):   # small crowd 'ooooh' (from v32)
    w=tt(d);acc=np.zeros(len(w))
    for v in range(n):
        f=rng.uniform(120,280)*(1+0.07*np.exp(-w*3))*(1-0.07*w/d);ph=2*np.pi*np.cumsum(f)/SR+rng.uniform(0,6)
        on=rng.uniform(0,.12);e=np.clip((w-on)/.14,0,1)
        acc+=sum(np.sin(k*ph)/k for k in range(1,11))*e*rng.uniform(.6,1)
    acc+=lp(noise(d),1200)*0.8
    y=bp(acc,250,480)+0.6*bp(acc,650,1000)+0.12*bp(acc,2200,2800);y*=np.exp(-w*(1.6/d))*np.minimum(1,(d-w)*6);add(y/(np.max(np.abs(y))+1e-9),t0,g)

# ---- gingerbread helpers (v34) ----
def gcrunch(t0,size=1.0,g=1.0):   # gingerbread wall snapping: dry cookie crunch cluster + low body thud
    w=tt(.25);add(lp(noise(.25),700)*np.exp(-w*18),t0,0.9*g*size);add(np.sin(2*np.pi*(95-35*w/.25)*w)*np.exp(-w*15),t0,0.75*g*size)
    for _ in range(int(34*size)):add(hp(noise(.03),1700)*np.exp(-tt(.03)*rng.uniform(110,170)),t0+abs(rng.normal(0,.08*size)),rng.uniform(.18,.5)*g)
    add(lp(noise(.2),1100)*np.exp(-tt(.2)*18),t0+.01,0.5*g)
def candies(t0,n=30,spread=.25,g=.3):   # hard candies / gumdrops clattering on the floor
    for t in np.sort(t0+0.02+np.abs(rng.normal(0,spread,n))):click(t,rng.uniform(.4,1)*g)
def sugarglass(t0,g=.6):   # boiled-sugar windows tinkling
    add(hp(noise(.04),3000)*np.exp(-tt(.04)*100),t0,0.6*g)
    for t in np.sort(t0+np.abs(rng.normal(0,.12,18))):
        f=rng.uniform(2500,6500);w=tt(.15);add(sum(np.sin(2*np.pi*f*m*w)/(k+1) for k,m in enumerate((1,2.76,5.4)))*np.exp(-w*rng.uniform(25,45)),t,rng.uniform(.04,.12)*g)
def poof(t0,d=.5,g=.35):   # powdered-sugar cloud
    w=tt(d);add(lp(noise(d),1500)*np.exp(-w*(5/d))*np.minimum(1,w/.01),t0,g)
def sparkle(t0,g=.08):     # C-major sugar sparkle (in key with the music)
    for j,f in enumerate((2093,2637,3136,4186)):ping(t0+.05+j*.05,f,.45,g)

for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    dd=rs-st;add(bp(noise(dd),1500,4000)*np.linspace(.2,.7,int(dd*SR)),st,0.05)
    dd=ri-rs;add(bp(noise(dd),400,1600)*np.linspace(0,1,int(dd*SR))**2,rs,0.15)
    k=kinds[a['obj']]
    lvl=int(k[-1])
    add(hp(noise(.02),800)*np.exp(-tt(.02)*120),ri,1.0)                                                                  # sharp pop
    w=tt(.3+.1*lvl);add(lp(noise(.3+.1*lvl),400+200*lvl)*np.exp(-w*(14-2*lvl)),ri,0.6+0.25*lvl)                          # body of the bang
    add(np.sin(2*np.pi*(90-30*w/w[-1])*w)*np.exp(-w*10),ri,0.5+0.2*lvl)
    for t in np.sort(ri+.05+np.abs(rng.normal(0,.35,40+20*lvl))):dd=.02;add(hp(noise(dd),3000)*np.exp(-tt(dd)*150),t,rng.uniform(.03,.08))   # confetti rustle
    if lvl>=2:dd=.5;w=tt(dd);f=380+40*np.sin(2*np.pi*6*w);add(np.tanh(2*np.sin(2*np.pi*np.cumsum(f)/SR))*np.minimum(1,w/.02)*np.exp(-w*3),ri+.1,0.06)   # party horn
    sparkle(ri,.06+.01*lvl)
    if lvl>=3:ooh(ri+.1,.6+.2*lvl,.12+.05*lvl)
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd)
    fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.035)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))

# ---- music: ORIGINAL synthwave loop (Am-F-C-G), 8 bars at 240 qpm = exactly one 8 s loop, impacts on bar downbeats ----
mus=np.zeros(N);Q=0.25;T0=12/fps
def madd(sig,t,g):i=int(round(t*SR))%N;idx=(i+np.arange(len(sig)))%N;np.add.at(mus,idx,sig*g)
hz=lambda m:440*2**((m-69)/12)
def saw(f,d):w=tt(d);return lp(sum(np.sin(2*np.pi*f*k*w)/k for k in range(1,7)),3000)*np.exp(-w*4)*np.minimum(1,w/.004)
CH=[[57,60,64],[57,60,64],[53,57,60],[53,57,60],[60,64,67],[60,64,67],[55,59,62],[55,59,62]]
LEAD=[76,76,74,72,72,74,76,79]
for b,ch in enumerate(CH):
    tb=T0+b*4*Q
    for e in range(8):m=ch[e%3]+12*(e//3%2);madd(saw(hz(m),.12),tb+e*Q/2,.10)                     # arpeggio on the 8ths
    w=tt(4*Q);madd(sum(np.sin(2*np.pi*hz(x-12)*w) for x in ch)*np.exp(-w*1.2)*np.minimum(1,w/.05),tb,.05)   # pad
    for q in range(4):w=tt(.22);madd(np.sin(2*np.pi*hz(ch[0]-24)*w)*np.exp(-w*8)*np.minimum(1,w/.005),tb+q*Q,.32)   # bass
    for q in (0,2):w=tt(.25);madd(np.sin(2*np.pi*(52+60*np.exp(-w*28))*w)*np.exp(-w*11),tb+q*Q,.38)                 # kick
    for q in (1,3):madd(bp(noise(.14),1200,6000)*np.exp(-tt(.14)*24),tb+q*Q,.12)                                    # snare
    for e in range(8):madd(hp(noise(.03),7000)*np.exp(-tt(.03)*120),tb+e*Q/2,.05)                                  # hats
    madd(saw(hz(LEAD[b]),.9),tb,.13)                                                                                # lead note per bar
mus/=np.max(np.abs(mus))
mix=out+0.42*mus;mix/=np.max(np.abs(mix))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([mix,mix],1).astype(np.float32));print('ok',N/SR)
