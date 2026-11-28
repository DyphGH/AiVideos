# v39 (#41 CHRISTMAS TREATS): v34 helpers (gingerbread crunch, candy clatter, sugar glass, powdered-sugar poof, sparkle) + v33 ceramic/glass
# + xmas_* sound kinds + the same synthesized Jingle Bells (public domain) loop — timeline has the v34/v38 timing so impacts land on beats
# usage: python3 audio.py v39 '{"cookie":"xmas_cookie","cocoa":"xmas_cocoa","cane":"xmas_cane","pudding":"xmas_pudding"}'
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
def glass(t0,g=1.0,n=30,spread=.5):
    add(hp(noise(.05),3000)*np.exp(-tt(.05)*90),t0,0.9*g);add(bp(noise(.3),2000,9000)*np.exp(-tt(.3)*14),t0,0.4*g)
    for t in np.sort(t0+np.abs(rng.normal(0,spread/2.5,n))):
        f=rng.uniform(2500,7000);w=tt(.18);sig=sum(np.sin(2*np.pi*f*m*w)/(k+1) for k,m in enumerate((1,2.76,5.4)))*np.exp(-w*rng.uniform(25,45));add(sig,t,rng.uniform(.04,.14)*g)
def ceramic(t0,g=1.0):
    add(bp(noise(.04),1200,6000)*np.exp(-tt(.04)*120),t0,1.0*g)
    for t in t0+np.abs(rng.normal(0,.08,12)):f=rng.uniform(1200,3000);w=tt(.12);add(np.sin(2*np.pi*f*w)*np.exp(-w*40)+0.5*np.sin(2*np.pi*f*2.3*w)*np.exp(-w*60),t,rng.uniform(.08,.2)*g)
def sparkle(t0,g=.08):     # C-major sugar sparkle (in key with the music)
    for j,f in enumerate((2093,2637,3136,4186)):ping(t0+.05+j*.05,f,.45,g)

for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    dd=rs-st;add(bp(noise(dd),1500,4000)*np.linspace(.2,.7,int(dd*SR)),st,0.05)
    dd=ri-rs;add(bp(noise(dd),400,1600)*np.linspace(0,1,int(dd*SR))**2,rs,0.15)
    k=kinds[a['obj']]
    if k=='xmas_cookie':    # giant gingerbread man: dry cookie SNAP + crunch cluster + gumdrop buttons clatter + powdered-sugar poof
        add(hp(noise(.03),2000)*np.exp(-tt(.03)*140),ri,0.9);gcrunch(ri,1.1);gcrunch(ri+.07,0.6,.5)
        candies(ri,24,.22,.25);poof(ri+.02,.45,.3);patter(ri+.05,30,.4,.1);sparkle(ri)
    if k=='xmas_cocoa':     # Christmas mug: ceramic crack + shards + hot chocolate splash + marshmallow boings + candy cane clink
        ceramic(ri,1.2);smash(ri+.01,1.0,1.2,lo=300)
        for dt in (.08,.2,.31):w=tt(.12);add(np.sin(2*np.pi*np.cumsum(420*(1+0.5*np.exp(-w*25)))/SR)*np.exp(-w*22),ri+dt,0.12)
        click(ri+.12,.35);sparkle(ri,.06)
    if k=='xmas_cane':      # giant candy cane: sugar-glass SHATTER, the stick snaps 3 times, peppermints clatter, mint dust
        glass(ri,1.0,40,.5);add(hp(noise(.03),2200)*np.exp(-tt(.03)*150),ri,0.9)
        for dt in (.03,.09,.16):add(hp(noise(.02),2600)*np.exp(-tt(.02)*200),ri+dt,0.6)
        sugarglass(ri+.01,1.0);candies(ri,40,.25,.3);poof(ri+.02,.5,.3);patter(ri+.05,40,.5,.12);sparkle(ri);ooh(ri+.1,.8,.18)
    if k=='xmas_pudding':   # LEGEND: heavy pudding SPLAT + plate shatters + raisin rain + gold sparkle + crowd ooh
        w=tt(.45);add(lp(noise(.45),350)*np.exp(-w*9),ri,1.2);add(np.sin(2*np.pi*(62-20*w/.45)*w)*np.exp(-w*8),ri,1.0)
        smash(ri,size=1.6,wet=1.4,lo=240);ceramic(ri+.01,1.0);glass(ri+.02,.6,25,.4)
        candies(ri,50,.35,.22);patter(ri+.05,60,.6,.14);sparkle(ri,.12);ooh(ri+.08,1.1,.3)
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd)
    fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.035)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))

# ---- music: synthesized JINGLE BELLS chorus (public domain, J. Pierpont 1857), 8 bars at 240 qpm = exactly one 8 s loop ----
# Built in OUTPUT time. Bar 1 starts at output frame 12 (0.4 s); the impacts land on bar 3, 5, 7 downbeats and on beat 3
# of bar 8 (the final held G) -> output frames 72 / 132 / 192 / 237 (= impact+1 - offset, see timeline.json).
mus=np.zeros(N);Q=0.25;T0=12/fps
def madd(sig,t,g):i=int(round(t*SR))%N;idx=(i+np.arange(len(sig)))%N;np.add.at(mus,idx,sig*g)
hz=lambda m:440*2**((m-69)/12)
C4,D4,E4,F4,G4,A4,B4,C5,D5,E5,F5,G5=60,62,64,65,67,69,71,72,74,76,77,79
MEL=[(E5,1),(E5,1),(E5,2),(E5,1),(E5,1),(E5,2),(E5,1),(G5,1),(C5,1.5),(D5,.5),(E5,4),
     (F5,1),(F5,1),(F5,1.5),(F5,.5),(F5,1),(E5,1),(E5,1),(E5,.5),(E5,.5),(E5,1),(D5,1),(D5,1),(E5,1),(D5,2),(G5,2)]
def bell(f,d,g):   # celesta/glock-ish lead + soft square body
    w=tt(max(d,.1)+.5);e=np.exp(-w*5)
    s=np.sin(2*np.pi*f*w)+.45*np.sin(2*np.pi*2*f*w)*np.exp(-w*6)+.18*np.sin(2*np.pi*4.01*f*w)*np.exp(-w*12)
    sq=lp(np.sign(np.sin(2*np.pi*f*w)),2600)*np.minimum(1,w/.01)*np.clip((d*.9-w)/.04+1,0,1)*.25
    return (s*e+sq)*np.minimum(1,w/.003)
t=T0
for m,du in MEL:madd(bell(hz(m),du*Q,1),t,.30);t+=du*Q
CH=[(C4,[60,64,67]),(C4,[60,64,67]),(C4,[60,64,67]),(C4,[60,64,67]),(F4,[60,65,69]),(C4,[60,64,67]),(D4,[62,66,69,72]),(G4,[59,62,65,67])]
def keys(fs,d,g):w=tt(d);return sum(np.sin(2*np.pi*f*w)+.3*np.sin(4*np.pi*f*w) for f in fs)*np.exp(-w*9)*np.minimum(1,w/.004)*g
for b,(root,ch) in enumerate(CH):
    tb=T0+b*4*Q
    for q,(m,acc) in enumerate([(root-24,1),(root-17,.8),(root-24,.9),(root-17,.8)]):   # oom-pah bass on every beat
        w=tt(.24);madd((np.sin(2*np.pi*hz(m)*w)+.3*np.sin(4*np.pi*hz(m)*w))*np.exp(-w*7)*np.minimum(1,w/.005),tb+q*Q,.32*acc)
    for q in (1,3):madd(keys([hz(x) for x in ch],.22,1),tb+q*Q,.07)                   # offbeat chord stabs
    for q in (0,2):w=tt(.25);madd(np.sin(2*np.pi*(52+60*np.exp(-w*28))*w)*np.exp(-w*11),tb+q*Q,.35)   # soft kick
    for q in (1,3):madd(bp(noise(.12),1500,6000)*np.exp(-tt(.12)*30),tb+q*Q,.08)                   # light snare/clap
    for e in range(8):                                                                               # sleigh bells on the 8ths
        dd=.09;w=tt(dd);sb=sum(np.sin(2*np.pi*f*w+rng.uniform(0,6)) for f in rng.uniform(5200,9000,5))*(0.6+0.4*(rng.random(len(w))>.5))
        madd((sb*.25+hp(noise(dd),6000))*np.exp(-w*45)*np.minimum(1,w/.004),tb+e*Q/2,.07 if e%2 else .11)
mus/=np.max(np.abs(mus))
mix=out+0.42*mus;mix/=np.max(np.abs(mix))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([mix,mix],1).astype(np.float32));print('ok',N/SR)
