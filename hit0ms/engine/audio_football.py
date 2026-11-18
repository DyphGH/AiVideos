import json,sys,numpy as np
from scipy.signal import butter,sosfilt
from scipy.io import wavfile
d=sys.argv[1];TL=json.load(open(d+'/timeline.json'));SR=48000;fps=TL['fps']
N=int(TL['total']/fps*SR);out=np.zeros(N);rng=np.random.default_rng(9)
bp=lambda x,lo,hi:sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
lp=lambda x,f:sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
hp=lambda x,f:sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
tt=lambda d:np.arange(int(d*SR))/SR
noise=lambda d:rng.standard_normal(int(d*SR))
def add(sig,t,g=1.0):
    i=int(t*SR)%N;idx=(i+np.arange(len(sig)))%N;np.add.at(out,idx,sig*g)
def kick(t0,g=1.0):
    w=tt(.16);f=95*np.exp(-w*14)+48;add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*18),t0,1.1*g)
    add(bp(noise(.03),900,5000)*np.exp(-tt(.03)*160),t0,0.9*g);add(hp(noise(.008),3000),t0,0.4*g)
def whoosh(t0,d,g):w=tt(d);sw=np.linspace(0,1,len(w));sig=bp(noise(d),500,2600)*sw**2*np.minimum(1,(d-w)*40);add(sig,t0,g)
def netHit(t0):
    w=tt(.2);add(np.sin(2*np.pi*(70+40*np.exp(-w*20))*w)*np.exp(-w*16),t0,1.0)
    w=tt(.6);add(bp(noise(.6),1500,7000)*np.exp(-w*7)*np.minimum(1,w/0.01),t0,0.55)
    for t in t0+np.abs(rng.normal(0,.08,40)):add(hp(noise(.01),2500)*np.exp(-tt(.01)*400),t,rng.uniform(.08,.25))
def roar(t0,g=1.0):
    d=1.8;w=tt(d);env=np.minimum(1,w/0.18)*np.exp(-np.maximum(0,w-0.35)*1.6)
    base=bp(noise(d),350,2800)+1.6*bp(noise(d),550,950)
    add(base*env,t0+0.03,0.55*g)
    for _ in range(6):f=rng.uniform(1800,2600);ww=tt(.35);add(np.sin(2*np.pi*f*ww)*np.exp(-ww*6)*(np.sin(2*np.pi*7*ww)>0),t0+rng.uniform(.05,.6),0.03*g)
def step(t0,g=0.1):add(lp(noise(.05),600)*np.exp(-tt(.05)*70),t0,g)
T=N/SR
amb=bp(noise(T),300,1800);amb=amb*(0.7+0.3*np.sin(2*np.pi*0.3*np.arange(N)/SR));add(amb[:N],0,0.05)
for k in range(int(T/0.5)):
    t=k*0.5;w=tt(.25);add(np.sin(2*np.pi*(55+70*np.exp(-w*25))*w)*np.exp(-w*10),t,0.16)
    w=tt(.12);add(np.sin(2*np.pi*[523,659,784,659][k%4]*w)*np.exp(-w*25),t+0.25,0.03)
for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    for i in range(3):step(st+(rs-st)*(i+0.3)/3.3)
    kick(rs,1.2 if a['obj']=='rocket' else 1.0)
    whoosh(rs,ri-rs,0.35 if a['obj']!='rocket' else 0.55)
    netHit(ri);roar(ri)
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd);fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.03)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([out,out],1).astype(np.float32));print('ok',N/SR)
