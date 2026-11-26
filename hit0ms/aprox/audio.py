# Som do motor "aprox": python3 audio.py <pasta>  → <pasta>/audio.wav (tensão na aproximação, POP no toque+1, rewind)
import json,sys,numpy as np
from scipy.signal import butter,sosfilt
from scipy.io import wavfile
d=sys.argv[1];TL=json.load(open(d+'/timeline.json'));SR=48000;fps=TL['fps'];T=TL['total'];off=TL['offset']
N=int(T/fps*SR);out=np.zeros(N);rng=np.random.default_rng(7)
def bp(x,lo,hi):return sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def lp(x,f):return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f):return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
tt=lambda s:np.arange(int(s*SR))/SR
noise=lambda s:rng.standard_normal(int(s*SR))
def add(sig,t,g=1.0):i=int(t*SR)%N;idx=(i+np.arange(len(sig)))%N;np.add.at(out,idx,sig*g)
vf=lambda f:((f-off)%T)/fps   # frame da timeline → segundos do vídeo
# batida de fundo (pulso grave + hi-hat) a 120 bpm
for k in range(int(T/fps*2)):
    t0=k*0.5;w=tt(.18);add(np.sin(2*np.pi*55*w*(1-w))*np.exp(-w*18),t0,0.35)
    add(hp(noise(.03),7000)*np.exp(-tt(.03)*120),t0+0.25,0.06)
for a in TL['attempts']:
    s,cf=a['start'],a['contact'];dur=(cf-s)/fps
    # tensão: tom que sobe + ticks cada vez mais rápidos
    w=tt(dur);f=np.linspace(220,660,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.minimum(1,w/0.3)*0.10,vf(s))
    n=int(6+a['level']*4)
    for j in range(n):
        tj=dur*(1-(1-j/n)**1.6);add(bp(noise(.02),2500,6000)*np.exp(-tt(.02)*200),vf(s)+tj,0.22)
    # 0ms: "ding" curtinho
    w=tt(.25);add((np.sin(2*np.pi*1760*w)+.5*np.sin(2*np.pi*2640*w))*np.exp(-w*14),vf(cf),0.25)
    # POP: estalo seco + ar + borracha
    p=vf(cf+1);add(hp(noise(.06),1200)*np.exp(-tt(.06)*70),p,1.0)
    w=tt(.25);add(np.sin(2*np.pi*np.cumsum(90*np.exp(-w*10)+40)/SR)*np.exp(-w*16),p,0.9)
    add(lp(noise(.5),3500)*np.exp(-tt(.5)*7),p+0.01,0.35)
    for _ in range(8):add(bp(noise(.015),800,3000)*np.exp(-tt(.015)*300),p+rng.uniform(.05,.6),rng.uniform(.1,.25))
    # rewind
    rw=vf(cf+a['hold']);w=tt(.35);f=np.linspace(2400,300,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*w/.35)*0.18,rw)
    add(bp(noise(.35),500,4000)*np.sin(np.pi*tt(.35)/.35),rw,0.15)
out=out/np.max(np.abs(out))*0.89
wavfile.write(d+'/audio.wav',SR,(out*32767).astype(np.int16))
print('audio',len(out)/SR)
