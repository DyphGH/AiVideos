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
    add(lp(ch,5000)*np.minimum(1,w*30)*np.minimum(1,(dd-w)*30),r0,0.1)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([out,out],1).astype(np.float32));print('ok',N/SR)
