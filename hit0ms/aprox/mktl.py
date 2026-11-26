# Timeline do motor "aprox": python3 mktl.py <pasta> [segundos de aproximação por nível...]
# Cada tentativa: aproximação (fica mais rápida a cada nível) → 0ms (toque, congelado 1 frame) → rebenta (hold) → rewind.
import json,sys
d=sys.argv[1];secs=[float(x) for x in sys.argv[2:]] or [2.2,1.6,1.15,0.8]
FPS=30;HOLD=26;RW=10;att=[];f=0
for i,s in enumerate(secs):
    n=round(s*FPS);a=dict(level=i+1,speed=round(secs[0]/s,2),start=f,contact=f+n,hold=HOLD,rw=RW);a['end']=a['contact']+HOLD+RW;att.append(a);f=a['end']
pad=(-f)%15;att[-1]['hold']+=pad;att[-1]['end']+=pad;f+=pad
max_speed=max(a['speed'] for a in att)
for a in att:a['speed']=round(a['speed']/max_speed,2)
off=att[-1]['contact']+6
json.dump(dict(fps=FPS,attempts=att,total=f,offset=off),open(d+'/timeline.json','w'),indent=1)
print(d,f,f/FPS,[(a['contact']-off)%f for a in att])
