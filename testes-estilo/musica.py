#!/usr/bin/env python3
# Música de fundo original (sem direitos de autor): loop alegre tipo "cartoon" — baixo, acordes plucked, melodia, kick/hat.
# uso: python3 musica.py saida.wav duracao_seg [bpm] [seed]
import sys, numpy as np, wave
out=sys.argv[1]; dur=float(sys.argv[2]); bpm=float(sys.argv[3]) if len(sys.argv)>3 else 118; seed=int(sys.argv[4]) if len(sys.argv)>4 else 1
sr=44100; n=int(dur*sr); t=np.arange(n)/sr; beat=60/bpm
rng=np.random.default_rng(seed)
mid=lambda m:440*2**((m-69)/12)
prog=[[60,64,67],[67,71,74],[69,72,76],[65,69,72]]  # C G Am F
if seed%2==0: prog=[[62,66,69],[69,73,76],[71,74,78],[67,71,74]]  # D A Bm G
mix=np.zeros(n)
def env(L,a=.005,d=.25):
    x=np.arange(L)/sr; return np.minimum(1,x/a)*np.exp(-x/d)
def note(f,st,L,vol,shape='pluck',d=.25):
    i0=int(st*sr); L=min(int(L*sr),n-i0)
    if L<=0: return
    x=np.arange(L)/sr; e=env(L,d=d)
    if shape=='pluck': w=np.sin(2*np.pi*f*x)+.35*np.sin(4*np.pi*f*x)+.15*np.sign(np.sin(2*np.pi*f*x))
    elif shape=='bass': w=np.sin(2*np.pi*f*x)+.3*np.sin(4*np.pi*f*x)
    else: w=np.sign(np.sin(2*np.pi*f*x))*.5+np.sin(2*np.pi*f*x)*.5
    mix[i0:i0+L]+=vol*w*e
bar=4*beat; nb=int(dur/bar)+1
mel_scale=[0,2,4,7,9,12,14,16]
for b in range(nb):
    ch=prog[b%4]; t0=b*bar
    note(mid(ch[0]-24),t0,bar*.5,.35,'bass',.5); note(mid(ch[0]-24),t0+2*beat,bar*.5,.3,'bass',.5)
    for k in range(8):
        note(mid(ch[k%3]),t0+k*beat/2,beat/2,.10,'pluck',.12)
    for k in range(8):
        if rng.random()<.6:
            m=ch[0]+12+mel_scale[rng.integers(0,len(mel_scale))]; note(mid(m),t0+k*beat/2,beat/2,.07,'sq',.09)
# percussão
for k in range(int(dur/beat)+1):
    i0=int(k*beat*sr); L=min(int(.18*sr),n-i0)
    if L<=0: break
    x=np.arange(L)/sr; kick=np.sin(2*np.pi*(55+90*np.exp(-x*30))*x)*np.exp(-x*14)
    mix[i0:i0+L]+=.5*kick
    j0=int((k+.5)*beat*sr); L2=min(int(.05*sr),n-j0)
    if L2>0: mix[j0:j0+L2]+=.08*rng.standard_normal(L2)*np.exp(-np.arange(L2)/sr*80)
# fade in/out e normalização
f=int(.3*sr); mix[:f]*=np.linspace(0,1,f); mix[-f:]*=np.linspace(1,0,f)
mix=mix/np.max(np.abs(mix))*.8
st=np.stack([mix,mix],1)
with wave.open(out,'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st*32767).astype(np.int16).tobytes())
