#!/usr/bin/env python3
# Alinhamento por sílabas distribuídas pelo tempo de fala (ignora silêncios). uso: align2.py voz.mp3 txt
import sys,re,subprocess,json
a,txt=sys.argv[1],open(sys.argv[2]).read()
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',a],capture_output=True,text=True).stdout)
log=subprocess.run(['ffmpeg','-i',a,'-af','silencedetect=n=-30dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; se=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
segs=[];cur=0
for s,e in zip(ss,se+[dur]*(len(ss)-len(se))):
    if s>cur: segs.append((cur,s))
    cur=e
if cur<dur: segs.append((cur,dur))
words=re.findall(r"[\wÀ-ÿ'’-]+[?!.,…:]*",re.sub(r'\[[^\]]*\]','',txt))
syl=lambda w:max(1,len(re.findall(r'[aeiouáéíóúâêôãõà]+',w.lower())))
S=[syl(w)+(.6 if re.search(r'[.?!…,:]$',w) else 0) for w in words]; tot=sum(S); sp=sum(e-s for s,e in segs)
def at(x): # x em segundos de fala -> tempo real
    for s,e in segs:
        if x<=e-s: return s+x
        x-=e-s
    return segs[-1][1]
out=[];acc=0
for w,k in zip(words,S):
    st=at(acc/tot*sp); acc+=k; en=at(acc/tot*sp-0.001); out.append((w,round(st,2),round(en,2)))
print(' '.join(f'{w}@{s}' for w,s,e in out))
