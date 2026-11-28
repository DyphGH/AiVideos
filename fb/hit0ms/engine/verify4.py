# usage: python3 verify4.py list6.json CHECK.json IMGDIR   (CHECK.json = stdout of shot6.js; IMGDIR holds the JPGs and dbg-*.png)
# Independent checks of the fb5.html puzzles (25-29), from the rendered pixels.
import json,sys
import numpy as np
from PIL import Image
from scipy import ndimage
L={x['n']:x for x in json.load(open(sys.argv[1]))};C=json.load(open(sys.argv[2]));D=sys.argv[3]
def cellof(g,x,y): return int((y-g['gy'])//g['ch'])+1,int((x-g['gx'])//g['cw'])+1
def blobs(mask,minsize=10):
    lab,n=ndimage.label(mask,structure=np.ones((3,3)));
    if n==0: return []
    idx=range(1,n+1);sz=ndimage.sum(mask,lab,idx);cm=ndimage.center_of_mass(mask,lab,idx)
    return [(cy,cx,s) for (cy,cx),s in zip(cm,sz) if s>=minsize]
def report(name,want,found): print(f"{name}: found {found} | wanted {want} | {'OK' if found==want else 'MISMATCH'}")
for n,it in L.items():
    if it.get('icon')=='gummy':
        g=C[n]['g'];cnt={}
        # (a) buttons-only debug render: every black blob is one button
        for cy,cx,s in blobs(np.array(Image.open(f"{D}/dbg-{n}.png").convert('L'))<128): k=cellof(g,cx,cy);cnt[k]=cnt.get(k,0)+1
        odd=[[k,v] for k,v in sorted(cnt.items()) if v!=2]
        print(f"{n} dbg: cells with buttons {len(cnt)}/{g['rows']*g['cols']}, buttons per cell {sorted(set(cnt.values()))}, odd {odd}")
        # (b) the real JPG: pure-white dots on the belly line of every bear
        im=np.array(Image.open(f"{D}/fb-hit0ms-{n}.jpg").convert('RGB')).astype(int);cnt2={}
        for r in range(g['rows']):
            for q in range(g['cols']):
                x=g['gx']+g['cw']//2+g['cw']*q;y=g['gy']+g['ch']//2+g['ch']*r;sub=im[y-12:y+28,x-6:x+7]
                cnt2[(r+1,q+1)]=len(blobs((sub.min(axis=2)>235),3))
        odd2=[[k,v] for k,v in cnt2.items() if v!=2];print(f"{n} jpg: odd {odd2}")
        report(n,(it['or']+1,it['oc']+1),odd[0][0] if len(odd)==1 else odd)
    if it.get('icon')=='letter':
        # every cell of the real JPG vs the median cell: the odd one differs a lot
        g=C[n]['g'];im=np.array(Image.open(f"{D}/fb-hit0ms-{n}.jpg").convert('L')).astype(int)
        cells={(r+1,q+1):im[g['gy']+g['ch']*r:g['gy']+g['ch']*(r+1),g['gx']+g['cw']*q:g['gx']+g['cw']*(q+1)] for r in range(g['rows']) for q in range(g['cols'])}
        med=np.median(np.stack(list(cells.values())),axis=0);d={k:int((abs(v-med)>80).sum()) for k,v in cells.items()}
        odd=[k for k,v in d.items() if v>40];print(f"{n}: diff px per cell: odd {[(k,d[k]) for k in odd]}, max of the rest {max(v for k,v in d.items() if k not in odd)}")
        report(n,(it['or']+1,it['oc']+1),odd[0] if len(odd)==1 else odd)
    if it['mode']=='melon':
        # id-buffer render: each slice has its own flat colour, the bowl front is white. Count slices that are visible,
        # how much of each shows (vs its full sector area), and that every answer badge sits on its own slice.
        ck=C[n];im=np.array(Image.open(f"{D}/dbg-{n}.png").convert('RGB')).astype(int);vis=[];
        for k,col in enumerate(ck['cols']):
            rgb=np.array([int(v) for v in col[4:-1].split(',')]);m=(abs(im-rgb).max(axis=2)<=2)
            comps=blobs(m,30);vis.append(int(m.sum()))
            onit=[i+1 for i,(bx,by) in enumerate(ck['badge']) if m[by-3:by+4,bx-3:bx+4].all()]
            print(f"  slice drawn #{k+1:2d}: visible {m.sum():6d}px = {100*m.sum()/ck['full'][k]:5.1f}% of its area, pieces {len(comps)}, answer badge(s) on it: {onit}")
        n_vis=sum(1 for v,f in zip(vis,ck['full']) if v/f>0.15)
        report(n,12,n_vis)
    if it['mode']=='knife':
        # knives-only render: measure each knife's horizontal extent (handle end to blade tip) in its own band
        ck=C[n];im=np.array(Image.open(f"{D}/dbg-{n}.png").convert('L'))<128;W={}
        for lab,y in [('A',ck['ya']),('B',ck['yb'])]:
            band=im[y-60:y+60];cols=np.where(band.any(axis=0))[0];W[lab]=(int(cols.min()),int(cols.max()),int(cols.max()-cols.min()+1))
            # also the length along the centre row only
            row=np.where(im[y])[0];W[lab+'@centre']=(int(row.min()),int(row.max()),int(row.max()-row.min()+1))
        print(f"{n}: config L={ck['L']} for both | measured {W}")
        report(n,'equal','equal' if W['A'][2]==W['B'][2] and W['A@centre'][2]==W['B@centre'][2] else 'different')
    if it['mode']=='advent':
        # (a) uniform render (all doors same colour, no numbers): the open door is the only one that differs
        ck=C[n];dw,dh=ck['dw'],ck['dh'];im=np.array(Image.open(f"{D}/dbg-{n}.png").convert('L')).astype(int)
        cells={(d['r'],d['q']):im[d['y']:d['y']+dh,d['x']:d['x']+dw] for d in ck['doors']}
        med=np.median(np.stack(list(cells.values())),axis=0);dd={k:int((abs(v-med)>60).sum()) for k,v in cells.items()}
        odd=[k for k,v in dd.items() if v>200];print(f"{n}: differing door(s) {[(k,dd[k]) for k in odd]}, max of the rest {max(v for k,v in dd.items() if k not in odd)}")
        # (b) read the number painted on every door of the real JPG by template matching against the Anton font
        # (each candidate 1-24 rendered by PIL, both cropped to their ink box and resized to 48x64, best IoU wins)
        from PIL import ImageFont,ImageDraw
        fnt=ImageFont.truetype(f"{sys.path[0]}/anton-latin-400-normal.woff2",70)
        def norm(m):
            ys,xs=np.where(m);return np.array(Image.fromarray((m[ys.min():ys.max()+1,xs.min():xs.max()+1]*255).astype(np.uint8)).resize((48,64)))>127
        T={}
        for k in range(1,25):
            g=Image.new('L',(160,120),0);ImageDraw.Draw(g).text((10,10),str(k),font=fnt,fill=255);T[str(k)]=norm(np.array(g)>127)
        jp=Image.open(f"{D}/fb-hit0ms-{n}.jpg").convert('L');read={}
        for d in ck['doors']:
            a=np.array(jp.crop((d['x']+18,d['y']+dh//2-40,d['x']+dw-26,d['y']+dh//2+44))).astype(int);th=(a.max()+a.min())/2
            ink=(a<th) if (a<th).sum()<(a>=th).sum() else (a>=th)   # the number is the minority colour
            lab,nn=ndimage.label(ink);sz=ndimage.sum(ink,lab,range(1,nn+1));ink=np.isin(lab,[i+1 for i,s_ in enumerate(sz) if s_>150])  # drop specks
            m=norm(ink);sc={k:(m&t).sum()/(m|t).sum() for k,t in T.items()};best=max(sc,key=sc.get);read[(d['r'],d['q'])]=best
        bad=[(k,v) for k,v in read.items() if v!=str((k[0]-1)*6+k[1])];print(f"{n}: door numbers read (template match) vs row-major 1-24: mismatches {bad}")
        if len(odd)==1: print(f"{n}: open door at row {odd[0][0]}, column {odd[0][1]} shows number '{read[odd[0]]}'")
        report(n,(3,5,'17'),(odd[0][0],odd[0][1],read[odd[0]]) if len(odd)==1 else odd)
