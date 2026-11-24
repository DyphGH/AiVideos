import json,sys,itertools
from fractions import Fraction as F
L={x['n']:x for x in json.load(open(sys.argv[1]))}
def inter(s,t):
    (x1,y1),(x2,y2)=s;(x3,y3),(x4,y4)=t
    d=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
    if d==0: return None
    a=F((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4),d); b=F(-((x1-x2)*(y1-y3)-(y1-y2)*(x1-x3)),d)
    if 0<=a<=1 and 0<=b<=1: return (x1+a*(x2-x1),y1+a*(y2-y1))
def on(p,s):
    (x1,y1),(x2,y2)=s;x,y=p
    return (x2-x1)*(y-y1)-(y2-y1)*(x-x1)==0 and min(x1,x2)<=x<=max(x1,x2) and min(y1,y2)<=y<=max(y1,y2)
def pts(segs):
    P=set(map(lambda p:(F(p[0]),F(p[1])),[q for s in segs for q in s]))
    for s,t in itertools.combinations(segs,2):
        p=inter(s,t)
        if p: P.add(p)
    return sorted(P)
def conn(a,b,segs): return any(on(a,s) and on(b,s) for s in segs)
# triangles
T=L['07-triangles'];ax,ay=T['apex'];(bx0,by),(bx1,_)=T['base'];hy=T['hy'];t=F(hy-ay,by-ay)
segs=[((ax,ay),(bx,by)) for bx in [bx0,*T['inner'],bx1]]+[((bx0,by),(bx1,by)),((ax+(bx0-ax)*t,hy),(ax+(bx1-ax)*t,hy))]
P=pts(segs);n=0
for a,b,c in itertools.combinations(P,3):
    if (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])==0: continue
    if conn(a,b,segs) and conn(b,c,segs) and conn(a,c,segs): n+=1
print('triangles:',n,'(points:',len(P),')')
# squares: any 4 points forming a square (incl. tilted) whose 4 edges lie on drawn segments
S=L['08-squares'];x0,y0,sz,k=S['x0'],S['y0'],S['size'],S['n4'];st=sz//k
segs=[((x0+i*st,y0),(x0+i*st,y0+sz)) for i in range(k+1)]+[((x0,y0+i*st),(x0+sz,y0+i*st)) for i in range(k+1)]
P=pts(segs);Ps=set(P);found=set();by={}
for a,b in itertools.permutations(P,2):
    dx,dy=b[0]-a[0],b[1]-a[1];c=(b[0]-dy,b[1]+dx);d=(a[0]-dy,a[1]+dx)
    if c in Ps and d in Ps and all(conn(p,q,segs) for p,q in [(a,b),(b,c),(c,d),(d,a)]):
        key=frozenset([a,b,c,d])
        if key not in found: found.add(key);side=abs(dx or dy)//st;by[side]=by.get(side,0)+1
print('squares:',len(found),'by size:',dict(sorted(by.items())))
