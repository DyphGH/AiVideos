# Som do motor "aprox": python3 audio.py <pasta>  → <pasta>/audio.wav (tensão na aproximação, POP no toque+1, rewind)
import json,sys,numpy as np
from scipy.signal import butter,sosfilt
from scipy.io import wavfile
d=sys.argv[1];KIND=sys.argv[2] if len(sys.argv)>2 else 'balao';TL=json.load(open(d+'/timeline.json'));SR=48000;fps=TL['fps'];T=TL['total'];off=TL['offset']
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
    # borracha a esticar (a agulha a entrar): rangido que sobe de tom
    ps=s+0.62*(cf-s);pd=(cf-ps)/fps
    if pd>0.05 and KIND=='balao':
        w=tt(pd);f=np.linspace(180,900,len(w));car=np.sin(2*np.pi*np.cumsum(f)/SR)*(0.6+0.4*np.sign(np.sin(2*np.pi*np.cumsum(f*0.12)/SR)))
        add(bp(car+0.3*noise(pd),150,2500)*np.minimum(1,w/0.05)*(0.4+0.6*w/pd),vf(ps),0.22)
    # 0ms: "ding" curtinho
    w=tt(.25);add((np.sin(2*np.pi*1760*w)+.5*np.sin(2*np.pi*2640*w))*np.exp(-w*14),vf(cf),0.25)
    if KIND=='porcelana':
        # pedra a voar: zumbido grave que cresce
        w=tt(dur);add(lp(noise(dur),400)*np.minimum(1,w/0.2)*(0.2+0.8*(w/dur)**2),vf(s),0.35)
        p=vf(cf+1)
        add(hp(noise(.05),1500)*np.exp(-tt(.05)*60),p,1.0)                                     # estalo
        w=tt(.3);add(np.sin(2*np.pi*np.cumsum(70*np.exp(-w*8)+50)/SR)*np.exp(-w*14),p,0.8)       # pancada
        add(bp(noise(.8),2000,9000)*np.exp(-tt(.8)*5),p+0.01,0.5)                              # vidrado a partir
        for _ in range(60):                                                                       # cacos a tilintar e a cair
            f0=rng.uniform(2500,7500);dd=rng.uniform(.04,.12);w=tt(dd);add(np.sin(2*np.pi*f0*w)*np.exp(-w*(40+rng.uniform(0,60))),p+abs(rng.normal(0.25,0.3)),rng.uniform(.05,.18))
        rw=vf(cf+a['hold']);w=tt(.35);f=np.linspace(2400,300,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*w/.35)*0.18,rw)
        continue
    if KIND=='melancia':
        # faca a descer: aço a vibrar (parciais agudos) + sopro grave que cresce
        w=tt(dur);add(lp(noise(dur),500)*np.minimum(1,w/0.2)*(0.15+0.85*(w/dur)**2),vf(s),0.25)
        add(sum(np.sin(2*np.pi*f0*w)*g0 for f0,g0 in ((3150,.5),(4720,.3),(6280,.2)))*np.minimum(1,w/0.4)*(0.3+0.7*w/dur),vf(s),0.05)
        p=vf(cf+1)
        add(hp(noise(.04),2500)*np.exp(-tt(.04)*90),p,0.9)                                         # casca a estalar
        w=tt(.35);add(np.sin(2*np.pi*np.cumsum(95*np.exp(-w*9)+45)/SR)*np.exp(-w*12),p,0.9)          # chop grave
        w=tt(.45);sq=bp(noise(.45),300,2200)*(0.6+0.4*np.sin(2*np.pi*w*(18+30*w)));add(sq*np.exp(-w*6),p+0.01,0.55)   # polpa sumarenta
        w=tt(.18);add(np.sin(2*np.pi*np.cumsum(220*np.exp(-w*14)+120)/SR)*np.exp(-w*25),vf(cf+2),0.7) # faca bate na tábua
        add(bp(noise(.6),1500,7000)*np.exp(-tt(.6)*7),p+0.02,0.25)                                 # spray
        for _ in range(26):                                                                         # gotas a cair
            dd=rng.uniform(.02,.05);add(bp(noise(dd),600,2500)*np.exp(-tt(dd)*120),p+abs(rng.normal(0.3,0.15)),rng.uniform(.08,.2))
        w=tt(.3);add(lp(noise(.3),700)*np.exp(-tt(.3)*14),p+0.28,0.5)                               # metades a tombar
        rw=vf(cf+a['hold']);w=tt(.35);f=np.linspace(2400,300,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*w/.35)*0.18,rw)
        add(bp(noise(.35),500,4000)*np.sin(np.pi*tt(.35)/.35),rw,0.15)
        continue
    if KIND=='ovo':
        # colher a descer: sopro grave suave que cresce
        w=tt(dur);add(lp(noise(dur),450)*np.minimum(1,w/0.2)*(0.15+0.85*(w/dur)**2),vf(s),0.22)
        p=vf(cf+1)
        w=tt(.3);add(sum(np.sin(2*np.pi*f0*w)*g0*np.exp(-w*d0) for f0,g0,d0 in ((2350,.6,18),(3900,.35,26),(6100,.2,40))),p,0.35)   # "tink" da colher na casca
        add(hp(noise(.025),3000)*np.exp(-tt(.025)*160),p,1.0)                                       # estalo seco da casca
        for j in range(14):                                                                         # racha a correr (crepitar curto)
            dd=rng.uniform(.004,.012);add(hp(noise(dd),2500)*np.exp(-tt(dd)*400),p+0.01+j*0.006+rng.uniform(0,.004),rng.uniform(.25,.6))
        w=tt(.2);add(np.sin(2*np.pi*np.cumsum(140*np.exp(-w*12)+70)/SR)*np.exp(-w*20),vf(cf+2),0.45)   # casca a ceder
        w=tt(.5);gl=bp(noise(.5),150,1200)*(0.55+0.45*np.sin(2*np.pi*w*(9+22*w)));add(gl*np.exp(-w*7)*np.minimum(1,w/0.03),vf(cf+3),0.75)   # clara a cair (glop molhado)
        w=tt(.16);add(np.sin(2*np.pi*np.cumsum(260*np.exp(-w*16)+90)/SR)*np.exp(-w*22),vf(cf+6),0.35)  # gema a assentar (blop)
        add(bp(noise(.35),800,4000)*np.exp(-tt(.35)*10),vf(cf+5),0.18)                              # splash
        for _ in range(12):                                                                          # lascas a tilintar na ardósia
            dd=rng.uniform(.01,.03);w=tt(dd);add(bp(noise(dd),2500,7000)*np.exp(-w*180),p+abs(rng.normal(0.3,0.12)),rng.uniform(.08,.2))
        rw=vf(cf+a['hold']);w=tt(.35);f=np.linspace(2400,300,len(w));add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*w/.35)*0.18,rw)
        add(bp(noise(.35),500,4000)*np.sin(np.pi*tt(.35)/.35),rw,0.15)
        continue
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
