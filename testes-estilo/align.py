#!/usr/bin/env python3
# Alinhamento aproximado palavra-a-palavra sem ASR: picos de sílaba no áudio + contagem de sílabas do texto.
# uso: python3 align.py voz.mp3 texto.txt  -> imprime JSON [{w, s, e}]
import sys, json, re, subprocess, numpy as np
from scipy.signal import find_peaks, butter, sosfiltfilt
audio, txt = sys.argv[1], open(sys.argv[2]).read()
sr=16000
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',audio,'-ac','1','-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout,np.int16).astype(float)
x=sosfiltfilt(butter(4,[300,3000],btype='band',fs=sr,output='sos'),x)
hop=160; env=np.array([np.sqrt((x[i:i+400]**2).mean()) for i in range(0,len(x)-400,hop)])
env=np.convolve(env,np.ones(5)/5,'same'); db=20*np.log10(env+1e-6); db-=db.max()
speech=db>-38
pk,_=find_peaks(db,distance=9,prominence=3.5,height=-32)
peaks=[p*hop/sr for p in pk]
# palavras e sílabas (grupos de vogais), sem tags [..]
txt=re.sub(r'\[[^\]]*\]','',txt)
words=re.findall(r"[\wÀ-ÿ'’-]+[?!.,…:]*",txt)
def syl(w):
    v=re.findall(r'[aeiouáéíóúâêôãõày]+',w.lower()); n=len(v)
    return max(1,n)
S=[syl(w) for w in words]; tot=sum(S)
# mapeia sílaba k -> pico (reamostra se nº difere)
P=np.array(peaks); n=len(P)
idx=lambda k: P[min(n-1,int(round(k*(n-1)/max(1,tot-1))))]
out=[]; k=0
for w,s in zip(words,S):
    st=idx(k)-0.08; en=idx(k+s-1)+0.12; out.append({'w':w,'s':round(max(0,st),2),'e':round(en,2)}); k+=s
print(json.dumps({'peaks':n,'syl':tot,'words':out},ensure_ascii=False))
