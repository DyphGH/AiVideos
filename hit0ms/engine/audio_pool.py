import json,sys,numpy as np
from scipy.signal import butter,sosfilt
from scipy.io import wavfile
d=sys.argv[1];TL=json.load(open(d+'/timeline.json'));SR=48000;fps=TL['fps']
N=int(TL['total']/fps*SR);out=np.zeros(N);rng=np.random.default_rng(7)
bp=lambda x,lo,hi:sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
lp=lambda x,f:sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
hp=lambda x,f:sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
tt=lambda d:np.arange(int(d*SR))/SR
noise=lambda d:rng.standard_normal(int(d*SR))
def add(sig,t,g=1.0):
    i=int(t*SR)%N;idx=(i+np.arange(len(sig)))%N;np.add.at(out,idx,sig*g)
def chirp(t0,f0,f1,d,g,dec=60):w=tt(d);f=np.linspace(f0,f1,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*dec)*np.minimum(1,w*800),t0,g)
def sweep_bp(sig,f0,f1,q=2.5):
    o=np.zeros_like(sig);n=len(sig);ch=256;zi=None
    for i in range(0,n,ch):
        t=i/max(1,n-1);fc=f0*(f1/f0)**t;bw=fc/q
        sos=butter(2,[max(40,fc-bw/2),min(SR/2-100,fc+bw/2)],'band',fs=SR,output='sos')
        if zi is None:zi=np.zeros((sos.shape[0],2))
        o[i:i+ch],zi=sosfilt(sos,sig[i:i+ch],zi=zi)
    return o
def splash(t0,slap=0.5,plunge=1.0,bloomp=1.0,bf=(170,55),spray=1.0,rain=40,rainlen=1.0,bub=30):
    if slap:add(hp(noise(.06),700)*np.exp(-tt(.06)*70),t0,1.3*slap);w=tt(.12);add(np.sin(2*np.pi*(80-30*w/.12)*w)*np.exp(-w*30),t0,0.9*slap)
    dd=0.55*plunge+0.15;w=tt(dd);sg=sweep_bp(noise(dd),3200,280)*np.minimum(1,w/0.006)*np.exp(-w*(5.5/max(plunge,.3)));add(sg/np.max(np.abs(sg)),t0+0.004,0.9*plunge)
    if bloomp:w=tt(.22);f=np.linspace(bf[0],bf[1],len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*np.minimum(1,w/.22))*np.exp(-w*8),t0+0.07,0.9*bloomp)
    if spray:w=tt(.7);add(bp(noise(.7),2200,7500)*np.exp(-w*5)*np.minimum(1,w/0.02),t0+0.01,0.35*spray)
    for _ in range(bub):t=t0+0.08+abs(rng.normal(0,0.35));chirp(t,rng.uniform(380,700),rng.uniform(900,1700),rng.uniform(.02,.045),rng.uniform(.05,.14),dec=50)
    for _ in range(rain):
        t=t0+0.25+rng.uniform(0,rainlen)
        if rng.random()<0.6:chirp(t,rng.uniform(1200,2200),rng.uniform(2500,4200),0.018,rng.uniform(.03,.09),dec=150)
        else:add(bp(noise(.012),2500,7000)*np.exp(-tt(.012)*300),t,rng.uniform(.04,.1))
def rip(t0):
    w=tt(.16);add(bp(noise(.16),1800,6500)*np.exp(-w*18)*np.minimum(1,w/0.004),t0,0.8);chirp(t0+0.05,420,160,0.12,0.35,dec=25)
    for _ in range(10):chirp(t0+0.08+rng.uniform(0,.4),rng.uniform(500,800),rng.uniform(1100,1600),0.03,0.06)
def boing(t0,g=0.5):
    w=tt(.6);f=95*(1+0.08*np.sin(2*np.pi*11*w)*np.exp(-w*4));add(np.tanh(1.6*np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-w*6),t0,g);add(lp(noise(.05),900)*np.exp(-tt(.05)*60),t0,0.6*g)
def step(t0,g=0.12):add(lp(noise(.04),700)*np.exp(-tt(.04)*90),t0,g);chirp(t0,160,120,0.05,g*0.8,dec=70)
T=N/SR;beat=0.5
for k in range(int(T/beat)):
    t=k*beat;w=tt(.25);add(np.sin(2*np.pi*(55+70*np.exp(-w*25))*w)*np.exp(-w*10),t,0.22)
    w=tt(.12);add(np.sin(2*np.pi*[523,659,784,659][k%4]*w)*np.exp(-w*25),t+beat/2,0.045)
P={'flop':dict(slap=1.0,plunge=0.9,bloomp=0.5,bf=(150,60),spray=0.9,rain=45,rainlen=0.9,bub=22),
   'bomb':dict(slap=0.25,plunge=1.4,bloomp=1.4,bf=(150,42),spray=1.1,rain=80,rainlen=1.3,bub=40),
   'flip':dict(slap=0.15,plunge=0.9,bloomp=0.8,bf=(200,70),spray=0.7,rain=35,rainlen=0.9,bub=30)}
for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    walk=(rs-st)*0.55
    for i in range(4):step(st+walk*(i+0.5)/4)
    boing(rs-0.12,0.45)
    dd=ri-rs;add(bp(noise(dd),300,1400)*np.linspace(0,1,int(dd*SR))**2,rs,0.12)
    if a['obj']=='perfect':rip(ri)
    else:splash(ri,**P[a['obj']])
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd);fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.035)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([out,out],1).astype(np.float32));print('ok',N/SR)
