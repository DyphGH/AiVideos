# copy of ../audio.py for v33 (#32 cat crimes) with the gift_* (v31), golf_* (v32) and cat_* sound kinds added
# cat_*: paw swipe at every push, a grumpy synth 'mrrow' as the object leaves the table, the object smash, then a tsundere 'hmph' huff
# usage: python3 audio.py v33 '{"mug":"cat_mug","plant":"cat_plant","cake":"cat_cake","phone":"cat_phone"}'
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

def glass(t0,g=1.0,n=30,spread=.5):
    add(hp(noise(.05),3000)*np.exp(-tt(.05)*90),t0,0.9*g);add(bp(noise(.3),2000,9000)*np.exp(-tt(.3)*14),t0,0.4*g)
    for t in np.sort(t0+np.abs(rng.normal(0,spread/2.5,n))):
        f=rng.uniform(2500,7000);w=tt(.18);sig=sum(np.sin(2*np.pi*f*m*w)/(k+1) for k,m in enumerate((1,2.76,5.4)))*np.exp(-w*rng.uniform(25,45));add(sig,t,rng.uniform(.04,.14)*g)
def ceramic(t0,g=1.0):
    add(bp(noise(.04),1200,6000)*np.exp(-tt(.04)*120),t0,1.0*g)
    for t in t0+np.abs(rng.normal(0,.08,12)):f=rng.uniform(1200,3000);w=tt(.12);add(np.sin(2*np.pi*f*w)*np.exp(-w*40)+0.5*np.sin(2*np.pi*f*2.3*w)*np.exp(-w*60),t,rng.uniform(.08,.2)*g)
def click(t0,g):w=tt(.025);add(bp(noise(.025),2500,7000)*np.exp(-w*260),t0,g);ping(t0,rng.uniform(1800,3200),.04,g*0.5)

# ---- golf helpers (v32) ----
def tink(t0,g=1.0):   # club face meets ball: sharp bright 'tink'
    add(hp(noise(.006),4000)*np.exp(-tt(.006)*600),t0,0.5*g)
    for f,dc,a in ((3150,38,1.0),(5400,55,.6),(8100,80,.35),(1250,30,.5)):w=tt(.35);add(np.sin(2*np.pi*f*w)*np.exp(-w*dc),t0,0.32*a*g)
def swoosh(t1,d=.28,g=.35):   # golf swing whoosh ending at t1
    w=tt(d);sig=sweep_bp(noise(d),500,3200,2.5)*np.sin(np.pi*np.minimum(1,w/d))**1.5;add(sig,t1-d,g)
def tok(t0,g=.4,f=1500):     # ball bounce on a hard floor
    add(bp(noise(.02),800,3000)*np.exp(-tt(.02)*220),t0,g);w=tt(.06);add(np.sin(2*np.pi*f*w)*np.exp(-w*70),t0,g*0.7)
def bounces(t0,n=5,first=.2,g=.4,f=1500):
    t,dt=t0,first
    for i in range(n):tok(t,g,f*(1+0.04*i));t+=dt;dt*=.68;g*=.62
def clang(t0,fs,g=.3,dec=4.0,d=1.2):
    w=tt(d);add(sum(np.sin(2*np.pi*f*w+rng.uniform(0,6))*np.exp(-w*dec*(1+j*.6))/(1+j*.5) for j,f in enumerate(fs))*np.minimum(1,w*3000),t0,g)
def ooh(t0,d=1.0,g=.3,n=14):   # small crowd 'ooooh'
    w=tt(d);acc=np.zeros(len(w))
    for v in range(n):
        f=rng.uniform(120,280)*(1+0.07*np.exp(-w*3))*(1-0.07*w/d);ph=2*np.pi*np.cumsum(f)/SR+rng.uniform(0,6)
        on=rng.uniform(0,.12);e=np.clip((w-on)/.14,0,1)
        acc+=sum(np.sin(k*ph)/k for k in range(1,11))*e*rng.uniform(.6,1)
    acc+=lp(noise(d),1200)*0.8
    y=bp(acc,250,480)+0.6*bp(acc,650,1000)+0.12*bp(acc,2200,2800);y*=np.exp(-w*(1.6/d))*np.minimum(1,(d-w)*6);add(y/(np.max(np.abs(y))+1e-9),t0,g)
def claps(t0,d=1.0,n=60,g=.25):   # applause
    for t in np.sort(t0+rng.uniform(0,d,n)**1.6*d):dd=.025;e=np.exp(-(t-t0)*1.8);add(bp(noise(dd),900,2800)*np.exp(-tt(dd)*160),t,rng.uniform(.5,1)*g*e)

# ---- cat helpers (v33) ----
def formant(sig,fcs,q=4.0):   # band-pass with a moving centre frequency (fcs: array, same length as sig)
    out=np.zeros_like(sig);ch=240;zi=None
    for i in range(0,len(sig),ch):
        fc=float(fcs[min(i,len(fcs)-1)]);bw=fc/q
        sos=butter(2,[max(40,fc-bw/2),min(SR/2-100,fc+bw/2)],'band',fs=SR,output='sos')
        if zi is None:zi=np.zeros((sos.shape[0],2))
        out[i:i+ch],zi=sosfilt(sos,sig[i:i+ch],zi=zi)
    return out
def meow(t0,d=.5,f0=520,g=.25,bend=.45):   # synth cat 'mrrow': buzzy source, pitch up-then-down, vowel i->a->u
    w=tt(d);x=w/d;f=f0*(1+bend*np.sin(np.pi*np.minimum(1,x*1.15)))*(1+0.015*np.sin(2*np.pi*6*w))
    ph=2*np.pi*np.cumsum(f)/SR;src=sum(np.sin(k*ph)/k**0.7 for k in range(1,18))+0.15*rng.standard_normal(len(w))
    y=formant(src,700+500*np.sin(np.pi*x),3.0)+0.7*formant(src,1900+500*np.sin(np.pi*x)-700*x,4.0)
    env=np.minimum(1,w/.04)*np.minimum(1,(d-w)/.12)*(1-0.3*x);y*=env;add(y/(np.max(np.abs(y))+1e-9),t0,g)
def hmph(t0,g=.3):   # 'hm' (closed nasal hum) + 'PH' (breath puff)
    w=tt(.16);ph=2*np.pi*np.cumsum(230*(1-0.15*w/.16))/SR;y=lp(sum(np.sin(k*ph)/k for k in range(1,8)),700)*np.minimum(1,w/.02)*np.minimum(1,(.16-w)/.03);add(y/(np.max(np.abs(y))+1e-9),t0,g)
    w=tt(.14);add(bp(noise(.14),400,2500)*np.minimum(1,w/.01)*np.exp(-w*22),t0+.15,g*1.1)
def paw_swipe(t0,g=.3):w=tt(.16);add(sweep_bp(noise(.16),900,4200,2.5)*np.sin(np.pi*w/.16)**1.5,t0,g);w=tt(.05);add(lp(noise(.05),700)*np.exp(-w*90),t0+.15,g*.9)
T=N/SR;beat=0.5
for k in range(int(T/beat)):
    t=k*beat;w=tt(.25);add(np.sin(2*np.pi*(55+70*np.exp(-w*25))*w)*np.exp(-w*10),t,0.25)
    w=tt(.12);add(np.sin(2*np.pi*[523,659,784,659][k%4]*w)*np.exp(-w*25),t+beat/2,0.05)
for a in TL['attempts']:
    st,rs,ri=a['start']/fps,a['release']/fps,a['impact']/fps+1/fps
    dd=rs-st;add(bp(noise(dd),1500,4000)*np.linspace(.2,.7,int(dd*SR)),st,0.05)
    dd=ri-rs;add(bp(noise(dd),400,1600)*np.linspace(0,1,int(dd*SR))**2,rs,0.15)
    k=kinds[a['obj']]
    if k.startswith('cat_'):paw_swipe(st,0.32);meow(rs+.02,.42 if a['level']<4 else .55,[560,500,620,440][a['level']-1],0.2)
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
    if k=='ornament':glass(ri,1.0,40,.6);slap(ri,0.4,200)
    if k=='gingerbread':
        slap(ri,0.6,150)
        for _ in range(26):add(hp(noise(.03),1800)*np.exp(-tt(.03)*150),ri+abs(rng.normal(0,.07)),rng.uniform(.2,.5))
        patter(ri+.05,40,.5,.12)
    if k=='cocoa':ceramic(ri,1.0);smash(ri+.01,1.2,1.4,lo=260)
    if k=='globe':glass(ri,1.0,45,.7);smash(ri+.01,1.1,1.2,lo=300);slap(ri,0.5,120)
    if k=='cake':slap(ri,0.8,140);smash(ri,1.2,1.3,lo=240);patter(ri+.05,25,.4,.1)
    if k=='cake2':slap(ri,0.9,170);smash(ri,1.0,1.1,lo=280)
    if k=='cake3':slap(ri,0.6,180);smash(ri,0.8,1.2,lo=300);pops(ri+.04,6,.12)
    if k=='cake4':
        for dt in (0,.09,.19):slap(ri+dt,0.8-dt,120+dt*200)
        smash(ri,1.7,1.5,lo=220);patter(ri+.05,30,.5,.1)
    if k=='cashbag':
        w=tt(.25);add(lp(noise(.25),500)*np.exp(-w*18),ri,1.0);add(np.sin(2*np.pi*(70-25*w/.25)*w)*np.exp(-w*14),ri,0.8)
        for t in np.sort(ri+0.02+np.abs(rng.normal(0,.35,70))):dd=rng.uniform(.03,.07);add(bp(noise(dd),1800,7000)*np.exp(-tt(dd)*rng.uniform(40,90))*np.sin(np.pi*np.minimum(1,tt(dd)/dd)),t,rng.uniform(.06,.16))
        for _ in range(6):ping(ri+rng.uniform(0,.15),rng.uniform(2500,4000),.15,0.05)
    if k=='goldbars':
        for j,(dt,g) in enumerate([(0,1.0),(.11,.6),(.2,.45),(.33,.3),(.45,.2)]):
            w=tt(.9);sig=sum(np.sin(2*np.pi*f*w)*np.exp(-w*dc)*a for f,dc,a in [(1180+j*40,6,1),(2950+j*60,9,.6),(4700,12,.4),(6900,16,.25)]);add(sig*np.minimum(1,w*2000),ri+dt,0.35*g);add(lp(noise(.06),900)*np.exp(-tt(.06)*60),ri+dt,0.7*g)
    if k=='diamond':
        add(hp(noise(.03),2500)*np.exp(-tt(.03)*120),ri,1.2);w=tt(.18);add(lp(noise(.18),1200)*np.exp(-w*25),ri,0.7)
        for t in np.sort(ri+np.abs(rng.normal(0,.12,24))):add(bp(noise(.02),1500,6000)*np.exp(-tt(.02)*200),t,rng.uniform(.15,.45))
        for f in (3300,5200,7400):w=tt(1.0);add(np.sin(2*np.pi*f*w)*np.exp(-w*5),ri+.02,0.08)
    if k=='briefcase':
        w=tt(.2);add(lp(noise(.2),700)*np.exp(-w*20),ri,0.9);add(np.sin(2*np.pi*(90-30*w/.2)*w)*np.exp(-w*18),ri,0.6)
        for dt in (.05,.09):click(ri+dt,0.8)
        w=tt(.35);add(lp(noise(.35),1500)*np.sin(np.pi*w/.35)*0.6,ri+.1,0.3)
        for t in np.sort(ri+0.12+np.abs(rng.normal(0,.3,50))):dd=rng.uniform(.03,.07);add(bp(noise(dd),1800,7000)*np.exp(-tt(dd)*60)*np.sin(np.pi*np.minimum(1,tt(dd)/dd)),t,rng.uniform(.06,.14))
    if k=='drink':
        glass(ri,0.9,35,.55);smash(ri+.01,1.3,1.6,lo=380)
        for t in np.sort(ri+0.2+np.abs(rng.normal(0,.25,30))):dd=.03;w=tt(dd);f=np.linspace(rng.uniform(700,1100),rng.uniform(1600,2600),len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*90),t,rng.uniform(.04,.1))
    if k=='icecream':
        slap(ri,0.7,150);smash(ri,1.2,1.4,lo=260)
        for _ in range(22):add(hp(noise(.025),2000)*np.exp(-tt(.025)*170),ri+abs(rng.normal(0,.06)),rng.uniform(.15,.4))
        patter(ri+.05,25,.4,.08)
    if k=='banana':
        slap(ri,1.0,120);smash(ri+.01,1.0,1.5,lo=220);slap(ri+.09,0.5,160);patter(ri+.05,20,.35,.08)
    if k=='melon':
        add(lp(noise(.06),600)*np.exp(-tt(.06)*50),ri,1.0);add(np.sin(2*np.pi*(95-40*tt(.25))*tt(.25))*np.exp(-tt(.25)*14),ri,0.8)
        smash(ri+.01,1.6,1.7,crack=0.35,lo=240);patter(ri+.05,70,.6,.16)
        for _ in range(14):add(hp(noise(.02),2500)*np.exp(-tt(.02)*200),ri+abs(rng.normal(0,.12)),rng.uniform(.1,.25))
    if k=='donut':
        for j,(dt,g) in enumerate([(0,1.0),(.2,.45)]):
            w=tt(.25);f=180*(1+0.35*np.exp(-w*12));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*12),ri+dt,0.5*g);slap(ri+dt,0.7*g,150)
        smash(ri+.01,1.0,1.2,lo=300);pops(ri+.04,18,.12)
    if k=='cookie':
        for _ in range(30):add(hp(noise(.03),1800)*np.exp(-tt(.03)*140),ri+abs(rng.normal(0,.07)),rng.uniform(.2,.55))
        add(lp(noise(.2),1100)*np.exp(-tt(.2)*18),ri,0.6);smash(ri+.03,0.9,1.3,lo=320);patter(ri+.08,25,.4,.1)
    if k=='cashbrick':
        w=tt(.3);add(lp(noise(.3),450)*np.exp(-w*15),ri,1.0);add(np.sin(2*np.pi*(65-25*w/.3)*w)*np.exp(-w*12),ri,0.9)
        w=tt(.25);add(bp(noise(.25),1500,5000)*np.exp(-w*14),ri+.01,0.35)
        for t in np.sort(ri+0.02+np.abs(rng.normal(0,.4,90))):dd=rng.uniform(.03,.07);add(bp(noise(dd),1800,7000)*np.exp(-tt(dd)*rng.uniform(40,90))*np.sin(np.pi*np.minimum(1,tt(dd)/dd)),t,rng.uniform(.06,.16))
    if k=='watch':
        glass(ri,0.8,25,.4)
        for j,f in enumerate((2100,3150,4400)):w=tt(.7);add(np.sin(2*np.pi*f*w)*np.exp(-w*7)*np.minimum(1,w*2000),ri,0.25/(j+1))
        for t in np.sort(ri+0.03+np.abs(rng.normal(0,.2,30))):ping(t,rng.uniform(3000,6500),.06,rng.uniform(.04,.1))
        for j in range(5):click(ri+.25+j*.11,0.35-j*.05)
    if k=='pearls':
        add(lp(noise(.12),900)*np.exp(-tt(.12)*30),ri,0.8)
        for t in np.sort(ri+np.abs(rng.normal(0,.28,110))):dd=.018;w=tt(dd);add((bp(noise(dd),2500,8000)*0.6+np.sin(2*np.pi*rng.uniform(3500,5500)*w))*np.exp(-w*260),t,rng.uniform(.06,.22))
    if k=='safe':
        w=tt(.5);add(lp(noise(.5),300)*np.exp(-w*9),ri,1.2);add(np.sin(2*np.pi*(55-15*w/.5)*w)*np.exp(-w*8),ri,1.0)
        for f in (380,610,950):w=tt(.8);add(np.sin(2*np.pi*f*w)*np.exp(-w*6),ri,0.12)
        for t in np.sort(ri+0.06+np.abs(rng.normal(0,.35,80))):
            for f in (rng.uniform(3800,5200),rng.uniform(6000,8000)):ping(t,f,.12,rng.uniform(.03,.07))
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
    if k=='ornament2':
        glass(ri,1.1,50,.7);slap(ri,0.35,220)
        [ping(ri+rng.uniform(.05,.6),rng.uniform(3500,7500),.25,rng.uniform(.03,.07)) for _ in range(14)]
    if k=='star':glass(ri,1.0,40,.6);[ping(ri+.02+j*.07,f,.5,.12) for j,f in enumerate((1568,2093,2637,3136))]
    if k=='candy':
        add(hp(noise(.03),2200)*np.exp(-tt(.03)*150),ri,1.0)
        for _ in range(28):add(hp(noise(.025),2500)*np.exp(-tt(.025)*170),ri+abs(rng.normal(0,.08)),rng.uniform(.2,.5))
        glass(ri+.01,0.5,20,.4)
    if k=='ceramic2':ceramic(ri,1.2);slap(ri,0.6,160);[add(bp(noise(.04),1200,5000)*np.exp(-tt(.04)*100),ri+abs(rng.normal(0,.12)),rng.uniform(.15,.35)) for _ in range(10)]
    if k in ('balloon','balloonXL'):
        big=1.6 if k=='balloonXL' else 1.0
        add(hp(noise(.02),1500)*np.exp(-tt(.02)*200),ri,1.3*big)                       # pop
        w=tt(.08);add(np.sin(2*np.pi*(160-60*w/.08)*w)*np.exp(-w*40),ri,0.7*big)         # rubber snap body
        dw=.9*big;w=tt(dw);sp=lp(noise(dw),2500)*np.exp(-w*(4.5/big));add(sp/np.max(np.abs(sp)+1e-9),ri+.01,0.9)   # water burst
        smash(ri+.02,1.2*big,1.6,lo=300)
        for t in np.sort(ri+0.05+np.abs(rng.normal(0,.35*big,int(60*big)))):          # droplets raining down
            dd=.03;w=tt(dd);f=np.linspace(rng.uniform(600,1000),rng.uniform(1400,2400),len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*90),t,rng.uniform(.05,.14))
        patter(ri+.15,int(70*big),.6*big,.14)
    if k in ('egg','eggXL','eggGold'):
        bg=1.7 if k=='eggXL' else 1.0
        add(hp(noise(.025),2200)*np.exp(-tt(.025)*180),ri,1.1*bg)
        for _ in range(int(10*bg)):add(hp(noise(.015),3000)*np.exp(-tt(.015)*250),ri+abs(rng.normal(0,.04)),rng.uniform(.2,.45))
        slap(ri+.01,0.7*bg,180);smash(ri+.02,0.8*bg,1.2,lo=320)
        if k=='eggGold':[ping(ri+j*.06,f,.6,.1) for j,f in enumerate((2093,2637,3136))]
    if k=='tv':       # heavy thud + screen glass smash + electric fizz/sparks
        w=tt(.35);add(lp(noise(.35),400)*np.exp(-w*12),ri,1.1);add(np.sin(2*np.pi*(60-20*w/.35)*w)*np.exp(-w*10),ri,0.9)
        glass(ri,1.2,55,.7)
        dz=.6;w=tt(dz);bz=np.sign(np.sin(2*np.pi*120*w))*0.5+bp(noise(dz),2000,7000)*0.8;add(bz*np.exp(-w*5)*(0.5+0.5*(rng.random(len(w))>.6)),ri+.03,0.12)
        for t in np.sort(ri+0.03+np.abs(rng.normal(0,.2,26))):add(hp(noise(.012),3500)*np.exp(-tt(.012)*300),t,rng.uniform(.1,.3))
    if k=='console':  # plastic crack + rattling clicks + disc spin
        add(hp(noise(.03),1800)*np.exp(-tt(.03)*140),ri,1.0);add(bp(noise(.12),900,4500)*np.exp(-tt(.12)*35),ri,0.8)
        w=tt(.25);add(np.sin(2*np.pi*(95-35*w/.25)*w)*np.exp(-w*16),ri,0.7)
        ts=np.sort(ri+0.02+np.abs(rng.normal(0,.2,40)));[click(t,rng.uniform(.12,.35)) for t in ts]
        w=tt(.5);add(np.sin(2*np.pi*np.cumsum(900+700*np.exp(-w*6))/SR)*np.exp(-w*7)*(0.6+0.4*np.sin(2*np.pi*30*w)),ri+.05,0.06)
    if k=='headphones':  # plastic snap + bouncy cups + spring boings
        add(hp(noise(.025),2200)*np.exp(-tt(.025)*170),ri,1.0);slap(ri,0.6,190)
        for j,(dt,g) in enumerate([(0,1.0),(.22,.5),(.38,.25)]):
            w=tt(.22);f=240*(1+0.4*np.exp(-w*14));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-w*14),ri+dt,0.45*g);add(lp(noise(.06),900)*np.exp(-tt(.06)*50),ri+dt,0.5*g)
        for dt in (.06,.16):w=tt(.4);fr=520*(1+0.25*np.sin(2*np.pi*14*w)*np.exp(-w*5));add(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-w*8),ri+dt,0.12)
        ts=np.sort(ri+0.03+np.abs(rng.normal(0,.15,18)));[click(t,rng.uniform(.08,.22)) for t in ts]
    if k=='sneaker':  # rubber thud + sole squeak + cardboard crunch + tissue rustle
        w=tt(.22);add(lp(noise(.22),600)*np.exp(-w*20),ri,1.0);add(np.sin(2*np.pi*(110-40*w/.22)*w)*np.exp(-w*18),ri,0.8);slap(ri+.1,0.5,140)
        w=tt(.18);fr=1400+500*np.sin(np.pi*w/.18);add(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.sin(np.pi*w/.18)*(0.7+0.3*np.sin(2*np.pi*60*w)),ri+.04,0.18)
        for _ in range(14):add(bp(noise(.03),700,3000)*np.exp(-tt(.03)*110),ri+abs(rng.normal(0,.06)),rng.uniform(.15,.4))
        w=tt(.45);add(bp(noise(.45),2500,8000)*np.sin(np.pi*w/.45)*(0.5+0.5*np.abs(np.sin(2*np.pi*11*w))),ri+.05,0.12)
    if k.startswith('gift_'):   # v31 gift boxes: cardboard thud + party-popper pop + paper rip + ribbon snap + confetti rustle + ta-da sparkle
        w=tt(.22);add(lp(noise(.22),650)*np.exp(-w*20),ri,1.0);add(np.sin(2*np.pi*(105-45*w/.22)*w)*np.exp(-w*18),ri,0.8)        # box thud
        add(hp(noise(.018),1200)*np.exp(-tt(.018)*260),ri+.004,1.3);w=tt(.07);add(np.sin(2*np.pi*(220-120*w/.07)*w)*np.exp(-w*45),ri+.004,0.6)  # POP
        dd=.32;w=tt(dd);am=(0.45+0.55*(rng.random(len(w))>.55))*np.minimum(1,w/.01)*np.exp(-w*5)                                    # paper rip
        add(sweep_bp(noise(dd)*am,1500,5200,2.0),ri+.02,0.7)
        for dt in (.03,.06):w=tt(.09);add(np.sin(2*np.pi*np.cumsum(700*np.exp(-w*30)+180)/SR)*np.exp(-w*40),ri+dt,0.22)          # ribbon snap twang
        patter(ri+.05,70,.9,.12)                                                                                                    # confetti rustle
        for j,f in enumerate((1568,1976,2349,3136)):ping(ri+.06+j*.05,f,.45,.07)                                                  # sparkle ta-da
        if k=='gift_teddy':
            for dt,f0 in ((.12,950),(.3,1250)):w=tt(.2);fr=f0*(1+0.25*np.sin(np.pi*w/.2))*(1+0.03*np.sin(2*np.pi*38*w));add(np.tanh(1.6*np.sin(2*np.pi*np.cumsum(fr)/SR))*np.sin(np.pi*w/.2),ri+dt,0.16)
        if k=='gift_rocket':
            dd=.6;w=tt(dd);add(sweep_bp(noise(dd),300,3500,2.5)*np.sin(np.pi*w/dd)**.6,ri+.05,0.45)
            w=tt(.35);add(np.sin(2*np.pi*np.cumsum(2600*np.exp(-w*7)+300)/SR)*np.exp(-w*6),ri+.08,0.1)
        if k=='gift_candy':
            ts=np.sort(ri+0.02+np.abs(rng.normal(0,.2,36)));[click(t,rng.uniform(.12,.35)) for t in ts]
            w=tt(.3);add(bp(noise(.3),2500,8000)*np.sin(np.pi*w/.3)*(0.5+0.5*np.abs(np.sin(2*np.pi*13*w))),ri+.05,0.12)
        if k=='gift_party':
            dd=.5;w=tt(dd);fr=380*(1+0.06*w/dd)*(1+0.02*np.sin(2*np.pi*7*w));ph=2*np.pi*np.cumsum(fr)/SR;saw=2*((ph/(2*np.pi))%1)-1
            add(bp(saw,300,3000)*np.minimum(1,w/.03)*np.minimum(1,(dd-w)*15),ri+.1,0.28)                                            # party horn
            for dt in (.2,.32,.45):w=tt(.12);add(np.sin(2*np.pi*np.cumsum(900+500*np.sin(np.pi*w/.12))/SR)*np.sin(np.pi*w/.12),ri+dt,0.08)  # balloon squeaks
    if k.startswith('golf_'):   # v32 golf: swing whoosh + club 'tink' at the impact, then the object-specific smash and a crowd reaction
        swoosh(ri+.01,.3,.32);tink(ri,0.9)
        if k=='golf_ball':   # giant ball: shell crack + rubber windings twang + red core bouncing + crowd ooh
            add(hp(noise(.03),2200)*np.exp(-tt(.03)*150),ri+.005,0.55);w=tt(.2);add(np.sin(2*np.pi*(120-50*w/.2)*w)*np.exp(-w*20),ri,0.8)
            for _ in range(16):add(hp(noise(.02),2500)*np.exp(-tt(.02)*200),ri+abs(rng.normal(0,.06)),rng.uniform(.15,.4))
            for dt in (.04,.1,.17):w=tt(.25);fr=300*(1+0.5*np.exp(-w*18))*(1+0.08*np.sin(2*np.pi*22*w));add(np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-w*12),ri+dt,0.18)
            bounces(ri+.08,6,.22,.45,1350);patter(ri+.05,30,.5,.1);ooh(ri+.12,1.0,.32)
        if k=='golf_flag':   # turf plug: heavy sod thud + soil crumble + metal pole clank + flag flap + ball plunks into the cup + small cheer
            w=tt(.3);add(lp(noise(.3),500)*np.exp(-w*14),ri,1.1);add(np.sin(2*np.pi*(80-30*w/.3)*w)*np.exp(-w*12),ri,0.9)
            for t in np.sort(ri+np.abs(rng.normal(0,.18,60))):dd=rng.uniform(.02,.05);add(lp(noise(dd),rng.uniform(600,1600))*np.exp(-tt(dd)*80),t,rng.uniform(.1,.3))
            clang(ri+.03,(640,1720,2950,4400),.22,6,.8)
            dd=.35;w=tt(dd);add(bp(noise(dd),300,1800)*(0.4+0.6*np.abs(np.sin(2*np.pi*14*w)))*np.sin(np.pi*w/dd),ri+.06,0.25)
            for dt,f in ((.3,820),(.36,1180)):w=tt(.15);add(np.sin(2*np.pi*f*(1-0.15*w/.15)*w)*np.exp(-w*28),ri+dt,0.3)
            ooh(ri+.1,.8,.22);claps(ri+.3,.8,40,.18)
        if k=='golf_bag':    # bag thump + clubs clattering + balls bouncing everywhere + tees rattle + crowd ooh
            w=tt(.25);add(lp(noise(.25),600)*np.exp(-w*16),ri,1.0);add(np.sin(2*np.pi*(95-35*w/.25)*w)*np.exp(-w*14),ri,0.8)
            for j in range(7):t=ri+.02+abs(rng.normal(0,.12));clang(t,(rng.uniform(1400,2200),rng.uniform(3300,4300),rng.uniform(5600,7200)),rng.uniform(.06,.14),rng.uniform(10,18),.4)
            for j in range(4):bounces(ri+rng.uniform(.05,.25),5,rng.uniform(.14,.22),.3,rng.uniform(1200,1700))
            ts=np.sort(ri+0.03+np.abs(rng.normal(0,.2,24)));[click(t,rng.uniform(.08,.22)) for t in ts]
            patter(ri+.05,20,.4,.08);ooh(ri+.12,1.0,.32)
        if k=='golf_trophy': # big gold clang + marble crack + coins/sparkle + crowd ooh into applause
            w=tt(.3);add(lp(noise(.3),450)*np.exp(-w*14),ri,1.0);add(np.sin(2*np.pi*(70-25*w/.3)*w)*np.exp(-w*11),ri,0.8)
            clang(ri,(523,1310,2380,3720,5100),.35,3.2,1.4);ceramic(ri+.01,1.0)
            for t in np.sort(ri+0.04+np.abs(rng.normal(0,.3,40))):ping(t,rng.uniform(3000,6500),.12,rng.uniform(.03,.08))
            for j,f in enumerate((1568,2093,2637,3136)):ping(ri+.08+j*.06,f,.5,.08)
            ooh(ri+.08,.9,.28);claps(ri+.25,1.1,90,.24)
    if k.startswith('cat_'):   # v33 cat crimes
        if k=='cat_mug':     # ceramic mug: crack + shards + cocoa splash + marshmallow boings
            ceramic(ri,1.2);smash(ri+.01,1.0,1.2,lo=300)
            for dt in (.08,.2,.31):w=tt(.12);add(np.sin(2*np.pi*np.cumsum(420*(1+0.5*np.exp(-w*25)))/SR)*np.exp(-w*22),ri+dt,0.12)
        if k=='cat_plant':   # terracotta pot: low crack + soil thud + crumble + leaf rustle
            w=tt(.3);add(lp(noise(.3),500)*np.exp(-w*14),ri,1.0);add(np.sin(2*np.pi*(85-30*w/.3)*w)*np.exp(-w*12),ri,0.8)
            add(bp(noise(.05),700,3500)*np.exp(-tt(.05)*90),ri,0.9)
            for _ in range(12):add(bp(noise(.04),600,2800)*np.exp(-tt(.04)*90),ri+abs(rng.normal(0,.09)),rng.uniform(.15,.35))
            for t in np.sort(ri+np.abs(rng.normal(0,.2,50))):dd=rng.uniform(.02,.05);add(lp(noise(dd),rng.uniform(600,1600))*np.exp(-tt(dd)*80),t,rng.uniform(.08,.25))
            patter(ri+.05,40,.6,.1)
        if k=='cat_cake':    # cake: wet splat + plate smash + sad deflating party horn
            slap(ri,0.9,140);smash(ri,1.3,1.4,lo=240);ceramic(ri+.02,0.8);patter(ri+.05,25,.4,.1)
            dd=.7;w=tt(dd);fr=420*(1-0.45*w/dd)*(1+0.03*np.sin(2*np.pi*6*w));ph=2*np.pi*np.cumsum(fr)/SR;saw=2*((ph/(2*np.pi))%1)-1
            add(bp(saw,250,2500)*np.minimum(1,w/.03)*np.minimum(1,(dd-w)*8),ri+.25,0.16)
        if k=='cat_phone':   # phone: screen glass shatter + plastic crack + rattle + electric fizz + sad power-off tone
            add(hp(noise(.03),1800)*np.exp(-tt(.03)*140),ri,1.0);w=tt(.22);add(np.sin(2*np.pi*(100-35*w/.22)*w)*np.exp(-w*16),ri,0.7)
            glass(ri,1.2,55,.7);ts=np.sort(ri+0.02+np.abs(rng.normal(0,.2,26)));[click(t,rng.uniform(.1,.3)) for t in ts]
            dz=.5;w=tt(dz);bz=np.sign(np.sin(2*np.pi*120*w))*0.5+bp(noise(dz),2000,7000)*0.8;add(bz*np.exp(-w*5)*(0.5+0.5*(rng.random(len(w))>.6)),ri+.03,0.1)
            for j,f in enumerate((1318,1046,784,523)):ping(ri+.2+j*.09,f,.22,.1)
        r0=(a['impact']+a['hold'])/fps
        hmph(ri+(9 if a['hold']<20 else 10)/fps,0.32)
    r0=(a['impact']+a['hold'])/fps;dd=a['rw']/fps;w=tt(dd)
    fr=2400-1800*w/dd;ph=2*np.cumsum(np.pi*fr)/SR;ch=np.sign(np.sin(ph))*0.5*(np.sin(2*np.pi*14*w)>0)
    add(lp(ch,3500)*np.minimum(1,w/dd*2.5)*np.minimum(1,(dd-w)*30),r0,0.035)
out=np.roll(out,-int(TL['offset']/fps*SR));out/=np.max(np.abs(out))*1.12
wavfile.write(d+'/audio.wav',SR,np.stack([out,out],1).astype(np.float32));print('ok',N/SR)
