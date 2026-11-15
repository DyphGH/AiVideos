import json,random,sys
def make(path,levels,seed,T_REAL=0.36,speeds=(0.4,0.6,0.8,1.0),HOLD=14,RW=8,FPS=30):
    random.seed(seed);att=[];f=0
    for i,(lv,s) in enumerate(zip(levels,speeds)):
        slideF=round(random.uniform(0.5,0.75)*FPS);fallF=round(T_REAL/s*FPS)
        d=dict(level=i+1,speed=s,start=f,release=f+slideF,impact=f+slideF+fallF,hold=HOLD,rw=RW);d.update(lv);att.append(d);f+=slideF+fallF+HOLD+RW
    pad=(-f)%15;att[-1]['hold']+=pad;f+=pad
    for a in att:a['end']=a['impact']+a['hold']+a['rw']
    off=att[-1]['impact']+4
    json.dump(dict(fps=FPS,attempts=att,total=f,offset=off),open(path,'w'),indent=1)
    print(path,f,f/FPS,[(a['impact']-off)%f for a in att])
