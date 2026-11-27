#!/usr/bin/env python3
# Legendas sincronizadas com a voz, sem Whisper (os modelos não descarregam aqui).
# Deteta os núcleos das sílabas na voz (picos de energia da banda da fala) e reparte as sílabas do texto por esses picos,
# frase a frase (cada frase do guião casa com um bloco de fala entre silêncios). Dá o início de cada palavra (~±60 ms).
# uso: python3 align3.py voz.mp3 legendas.txt captions.json [y]
#   legendas.txt: uma linha de legenda por linha; os blocos que aparecem juntos separados por " | "; *palavras* a amarelo.
#   Linha em branco = fim de uma frase falada (tem de coincidir com uma pausa da voz).
import sys,re,json,subprocess,numpy as np
from scipy.signal import butter,sosfiltfilt,find_peaks
voz,txt,out=sys.argv[1],sys.argv[2],sys.argv[3];Y=int(sys.argv[4]) if len(sys.argv)>4 else 1650
SR=16000
pcm=subprocess.run(['ffmpeg','-v','error','-i',voz,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
x=np.frombuffer(pcm,np.int16).astype(np.float32)/32768;dur=len(x)/SR
bp=sosfiltfilt(butter(4,[250,2500],'band',fs=SR,output='sos'),x)
hop=int(SR*0.01);env=np.sqrt(np.convolve(bp**2,np.ones(hop*3)/(hop*3),'same'))[::hop]
env=np.convolve(env,np.hanning(7)/np.hanning(7).sum(),'same');db=20*np.log10(env+1e-6);top=np.percentile(db,95)
speech=db>top-32
# blocos de fala: entre os silêncios que o ffmpeg deteta (≥ 0.12 s a -35 dB)
log=subprocess.run(['ffmpeg','-i',voz,'-af','silencedetect=n=-35dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(v) for v in re.findall(r'silence_start: ([\d.]+)',log)];se=[float(v) for v in re.findall(r'silence_end: ([\d.]+)',log)]
blocks=[];cur=0.0
for a_,b_ in zip(ss,se+[dur]*(len(ss)-len(se))):
    if a_-cur>0.08:blocks.append((int(cur*100),int(a_*100)))
    cur=b_
if dur-cur>0.08:blocks.append((int(cur*100),int(dur*100)))
# texto
raw=open(txt,encoding='utf8').read().strip('\n')
frases=[f for f in re.split(r'\n\s*\n',raw) if f.strip()]
syl=lambda w:max(1,len(re.findall(r'[aeiouáéíóúâêôãõàyAEIOUÁÉÍÓÚÂÊÔÃÕÀY]+',w)))
# junta blocos até termos tantos como frases (os blocos mais próximos fundem-se)
while len(blocks)>len(frases):
    gaps=[blocks[k+1][0]-blocks[k][1] for k in range(len(blocks)-1)];k=int(np.argmin(gaps));blocks[k]=(blocks[k][0],blocks[k+1][1]);del blocks[k+1]
if len(blocks)<len(frases):sys.exit(f'Há {len(frases)} frases mas só {len(blocks)} blocos de fala: junta frases no legendas.txt')
lines=[];allw=[]
for (b0,b1),fr in zip(blocks,frases):
    L=[[ch.strip() for ch in l.split('|')] for l in fr.strip().split('\n')]
    words=[(li,ci,w) for li,l in enumerate(L) for ci,ch in enumerate(l) for w in ch.replace('*','').split()]
    S=[syl(w) for _,_,w in words];tot=sum(S)
    seg=db[b0:b1];pk,_=find_peaks(seg,distance=9,prominence=2.5,height=top-26)
    pk=list(pk+b0)
    # ajusta o nº de picos ao nº de sílabas (tira os mais fracos / acrescenta a meio dos maiores intervalos)
    while len(pk)>tot:k=int(np.argmin([db[p] for p in pk]));del pk[k]
    while len(pk)<tot:
        pts=[b0]+pk+[b1];g=[pts[k+1]-pts[k] for k in range(len(pts)-1)];k=int(np.argmax(g));pk.insert(k,(pts[k]+pts[k+1])//2);pk=sorted(pk)
    acc=0;wt=[]
    for (li,ci,w),s in zip(words,S):
        p=pk[acc];start=max(b0,p-7)*0.01 if acc else b0*0.01;wt.append((li,ci,w,round(start,2)));acc+=s
    end=round(b1*0.01,2)
    for li,l in enumerate(L):
        ts=[];
        for ci in range(len(l)):ts.append(min(t for a,b,_,t in wt if a==li and b==ci))
        nxt=min([t for a,_,_,t in wt if a>li],default=end+0.12)
        lines.append({'start':ts[0],'end':round(min(nxt,end+0.12),2),'chunks':l,'times':ts})
    allw+=[(w,t) for _,_,w,t in wt]
json.dump({'y':Y,'lines':lines},open(out,'w',encoding='utf8'),ensure_ascii=False,indent=0)
print(f'{len(frases)} frases, {len(blocks)} blocos, {dur:.2f}s');print(' '.join(f'{w}@{t}' for w,t in allw))
