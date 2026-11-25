# usage: python3 verify3.py list3.json CHECK.json DBGDIR
# CHECK.json = stdout of shot3.js; DBGDIR holds dbg-10-legs.png (legs-only render)
import json,sys,itertools
import numpy as np
from PIL import Image
from scipy import ndimage
L={x['n']:x for x in json.load(open(sys.argv[1]))};C=json.load(open(sys.argv[2]));D=sys.argv[3]
# 10 legs: count separate leg blobs in the legs-only render
im=np.array(Image.open(f"{D}/dbg-10-legs.png").convert('L'))<128
lab,n=ndimage.label(im,structure=np.ones((3,3)));sizes=ndimage.sum(im,lab,range(1,n+1))
print('legs: blobs =',int((sizes>50).sum()),'| drawn per item =',C['10-legs']['legs'],'| expected 3*2+2*4+8+3 =',3*2+2*4+8+3)
# 11/12 grids: the pixel-diff odd cell (1-based row from top, col from left, same as the labels) vs requested
for k,want in [('11-mrs-claus',(6,3)),('12-spot-the-n',(4,9))]:
    g=L[k];odd=C[k]['odd'];print(f"{k}: odd cells found {[o['rc'] for o in odd]} | config row {g['or']+1}, col {g['oc']+1} | want {want} | grid {g['rows']}x{g['cols']}")
# 13 rectangles: brute force over all 4-point sets of grid intersections forming axis-aligned rectangles
R=L['13-rectangles'];xs=range(R['cols']+1);ys=range(R['rows']+1);P=[(x,y) for x in xs for y in ys];by={};tot=0
for a,b in itertools.combinations(P,2):
    if a[0]<b[0] and a[1]<b[1]:  # a = top-left, b = bottom-right; the other two corners always exist and edges lie on grid lines
        tot+=1;k=f"{b[0]-a[0]}x{b[1]-a[1]}";by[k]=by.get(k,0)+1
print('rectangles:',tot,dict(sorted(by.items())),'(WxH)')
# 14 Ebbinghaus
E=L['14-ebbinghaus'];ck=C['14-ebbinghaus'];print('ebbinghaus: config radius A = B =',E['R'],'| measured A',ck['A'],'B',ck['B'],'| equal:',ck['A']==ck['B'])
