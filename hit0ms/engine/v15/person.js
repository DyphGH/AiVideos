const LEN={T:78,N:10,UA:44,FA:40,TH:58,SH:56,FT:24};
const CH={
 striker:{skin:['#e8b48f','#c98a5f'],hair:'#2a1a10',trunks:['#ffffff','#cfd6e4'],shirt:['#e5484d','#a3121e'],num:'10',belly:0,style:'short'},
 keeper:{skin:['#c98a5f','#8a5a35'],hair:'#111',trunks:['#1b1b1b','#000'],shirt:['#c6f432','#7fae00'],num:'1',belly:0,style:'curly'},
 flop:{skin:['#ffd3b0','#e9a77c'],hair:'#5a3a22',trunks:['#ff4d4d','#b3122e'],belly:20,style:'short',must:true},
 bomb:{skin:['#a8704a','#6e4426'],hair:'#1b1210',trunks:['#ffd21f','#e0a000'],belly:4,style:'curly',kid:true},
 perfect:{skin:['#f3c29c','#d79368'],hair:'#e5484d',suit:['#1d3a8a','#0f1f55'],belly:0,style:'cap',female:true},
 flip:{skin:['#d79a6a','#9c6538'],hair:'#ffd34d',trunks:['#2fd15a','#16803a'],belly:3,style:'spiky'}};
const dirv=a=>[Math.sin(a),Math.cos(a)];
function capPath(x,y,a,l,w0,w1){const [dx,dy]=dirv(a);const px=-dy,py=dx;const x2=x+dx*l,y2=y+dy*l;const an=Math.atan2(py,px);
 c.moveTo(x+px*w0,y+py*w0);c.lineTo(x2+px*w1,y2+py*w1);c.arc(x2,y2,w1,an,an+Math.PI,true);c.lineTo(x-px*w0,y-py*w0);c.arc(x,y,w0,an+Math.PI,an+2*Math.PI,true);c.closePath();return [x2,y2];}
// geometry of a figure (figure frame, pelvis at 0,0, facing +x)
function geo(C,P){const T=LEN.T,k=C.kid?0.9:1;const R=(px,py,a)=>[px*Math.cos(a)-py*Math.sin(a),px*Math.sin(a)+py*Math.cos(a)];
 const sh=R(0,-T+12,P.tor),neck=R(0,-T-LEN.N,P.tor);
 const limb=(o,a1,l1,w0,w1,a2,l2,w2,w3)=>{const [d1x,d1y]=dirv(a1);const j=[o[0]+d1x*l1,o[1]+d1y*l1];const [d2x,d2y]=dirv(a2);const e=[j[0]+d2x*l2,j[1]+d2y*l2];return {o,j,e,a1,a2,l1,l2,w0,w1,w2,w3};};
 const armN=limb(sh,P.shN+P.tor,LEN.UA*k,11,9,P.shN+P.elN+P.tor,LEN.FA*k,8.5,6.5),armF=limb(sh,P.shF+P.tor,LEN.UA*k,11,9,P.shF+P.elF+P.tor,LEN.FA*k,8.5,6.5);
 const legN=limb([4,-2],P.hpN,LEN.TH*k,17,12,P.hpN+P.knN,LEN.SH*k,11.5,7),legF=limb([-2,-2],P.hpF,LEN.TH*k,17,12,P.hpF+P.knF,LEN.SH*k,11.5,7);
 return {sh,neck,armN,armF,legN,legF};}
const up=L=>()=>capPath(L.o[0],L.o[1],L.a1,L.l1,L.w0,L.w1),lo=L=>()=>capPath(L.j[0],L.j[1],L.a2,L.l2,L.w2,L.w3);
function handPath(L){const [dx,dy]=dirv(L.a2);const hx=L.e[0]+dx*9,hy=L.e[1]+dy*9;c.moveTo(hx+dx*11,hy+dy*11);c.ellipse(hx,hy,12,7.5,Math.atan2(dy,dx),0,7);const tx=L.e[0]+dx*4-dy*7,ty=L.e[1]+dy*4+dx*7;c.moveTo(tx+5,ty);c.ellipse(tx,ty,6,3.5,Math.atan2(dy,dx)+0.6,0,7);}
function footPath(L,ft){const fa=L.a2+Math.PI/2*(1-ft);const [dx,dy]=dirv(fa);const [sx,sy]=dirv(L.a2);const ax=L.e[0],ay=L.e[1];
 c.moveTo(ax-sy*0+(-dx)*6,ay+(-dy)*6);c.ellipse(ax+dx*10,ay+dy*10,17,7,Math.atan2(dy,dx),0,7);}
function torsoPath(C,P){const T=LEN.T,b=C.belly;c.save();c.rotate(P.tor);c.moveTo(-19,6);c.bezierCurveTo(-27,-T*0.4,-25,-T*0.8,-17,-T+2);c.quadraticCurveTo(-4,-T-12,14,-T+1);
 if(C.female)c.bezierCurveTo(26,-T*0.8,28,-T*0.62,18,-T*0.52);else c.bezierCurveTo(25,-T*0.82,23,-T*0.66,20,-T*0.56);
 c.bezierCurveTo(21+b,-T*0.42,23+b,-T*0.02,15,6);c.closePath();c.restore();}
function headPath(){const r=24;c.moveTo(-r,-4);c.arc(0,-6,r,Math.PI,0.05);c.quadraticCurveTo(r+6,8,r-2,14);c.quadraticCurveTo(8,r+4,-8,r-2);c.quadraticCurveTo(-r-2,12,-r,-4);c.closePath();}
const OL=3.4;
function group(list,fill,patch){for(const p of list){c.beginPath();p();c.lineWidth=OL*2;c.strokeStyle=OUT;c.lineJoin='round';c.stroke();c.fillStyle=OUT;c.fill();}if(patch)patch();for(const p of list){c.beginPath();p();c.fillStyle=fill;c.fill();}}
function trunks(C,G){if(!C.trunks)return;const f=lin(-20,-10,24,30,[[0,C.trunks[0]],[1,C.trunks[1]]]);c.beginPath();
 for(const Lg of [G.legF,G.legN])capPath(Lg.o[0],Lg.o[1],Lg.a1,24,18.5,17.5);c.save();c.rotate(0);c.rect(-21,-14,42,18);c.restore();c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=f;c.fill();
 c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=2.5;c.beginPath();c.moveTo(-18,-9);c.lineTo(18,-9);c.stroke();
 if(C===CH.flop){c.fillStyle='rgba(255,255,255,.75)';for(const [x,y] of [[-10,0],[8,4],[0,14]]){ell(x,y,3.5,2.2);c.fill();}}}
function suit(C,P){if(C.shirt){const T=LEN.T;c.save();c.rotate(P.tor);c.beginPath();c.moveTo(-21,6);c.bezierCurveTo(-28,-T*0.4,-26,-T*0.8,-17,-T+2);c.quadraticCurveTo(-4,-T-12,14,-T+1);c.bezierCurveTo(25,-T*0.82,23,-T*0.66,20,-T*0.56);c.bezierCurveTo(23,-T*0.42,25,-T*0.02,17,6);c.closePath();c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=lin(-20,-T,24,0,[[0,C.shirt[0]],[1,C.shirt[1]]]);c.fill();
 c.beginPath();c.moveTo(4,-T+2);c.quadraticCurveTo(12,-T+10,18,-T+4);c.strokeStyle='#fff';c.lineWidth=3;c.stroke();c.font='900 26px Inter';c.textAlign='center';c.fillStyle='rgba(255,255,255,.9)';c.fillText(C.num,-2,-T*0.38);c.restore();return;}
 if(!C.suit)return;const T=LEN.T;c.save();c.rotate(P.tor);c.beginPath();c.moveTo(-21,8);c.bezierCurveTo(-27,-T*0.4,-25,-T*0.62,-20,-T*0.7);c.lineTo(14,-T*0.7);c.bezierCurveTo(24,-T*0.62,26,-T*0.55,18,-T*0.5);c.bezierCurveTo(21,-T*0.4,23,-T*0.02,15,8);c.quadraticCurveTo(0,16,-21,8);c.closePath();
 c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=lin(-20,-T,24,0,[[0,C.suit[0]],[1,C.suit[1]]]);c.fill();c.fillStyle='#ffd21f';c.fillRect(-24,-T*0.42,48,5);c.restore();}
function details(C,P,G){c.strokeStyle='rgba(110,55,25,.35)';c.lineWidth=2.2;c.lineCap='round';
 for(const Lg of [G.legN]){c.beginPath();c.arc(Lg.j[0],Lg.j[1],6,Lg.a1-0.4,Lg.a1+0.4);c.stroke();}
 c.save();c.rotate(P.tor);const T=LEN.T;if(!C.suit){c.beginPath();c.moveTo(4,-T+8);c.quadraticCurveTo(12,-T+4,18,-T+8);c.stroke();ell(14+C.belly*0.7,-T*0.22,2,3);c.stroke();if(!C.female){c.beginPath();c.moveTo(8,-T*0.66);c.quadraticCurveTo(14,-T*0.6,20,-T*0.64);c.stroke();}}
 c.fillStyle='rgba(255,255,255,.22)';ell(-8,-T*0.6,5,T*0.25);c.fill();c.restore();}
function hairAndFace(C,face){c.save();
 ell(-6,2,6,8);c.fillStyle=C.skin[1];c.fill();c.strokeStyle=OUT;c.lineWidth=2.5;c.stroke();c.beginPath();c.arc(-6,2,3,-1,1.2);c.stroke();
 const surprised=face==='o';ell(11,-6,4.4,surprised?5.8:4.8);c.fillStyle='#1a1410';c.fill();ell(12.4,-7.8,1.5,1.5);c.fillStyle='#fff';c.fill();
 c.strokeStyle=C.hair==='#e5484d'?'#5a3a22':C.hair;c.lineWidth=3.2;c.beginPath();c.moveTo(5,surprised?-17:-15);c.quadraticCurveTo(12,surprised?-21:-18,18,-15);c.stroke();
 c.beginPath();c.moveTo(22,-5);c.quadraticCurveTo(30,4,22,7);c.lineWidth=3;c.strokeStyle=OUT;c.stroke();
 ell(14,5,6,3.5);c.fillStyle='rgba(255,110,110,.35)';c.fill();
 if(surprised){ell(16,14,4,5.5);c.fillStyle='#5a1a1a';c.fill();}else{c.beginPath();c.moveTo(10,12);c.quadraticCurveTo(16,17,21,11);c.strokeStyle='#5a1a1a';c.lineWidth=3;c.stroke();}
 if(C.must){c.beginPath();c.moveTo(12,8);c.quadraticCurveTo(19,4,25,9);c.lineWidth=5;c.strokeStyle=C.hair;c.stroke();}
 c.fillStyle=C.hair;c.strokeStyle=OUT;c.lineWidth=3;
 if(C.style==='short'){c.beginPath();c.moveTo(-24,-2);c.quadraticCurveTo(-28,-30,-4,-32);c.quadraticCurveTo(20,-34,24,-14);c.quadraticCurveTo(10,-22,-2,-18);c.quadraticCurveTo(-12,-14,-14,0);c.closePath();c.fill();c.stroke();}
 if(C.style==='curly'){for(const [x,y,s] of [[-18,-18,11],[-6,-28,12],[8,-28,11],[18,-20,9],[-22,-4,9],[-12,-12,9]]){ell(x,y,s,s);c.fill();c.stroke();}}
 if(C.style==='cap'){c.beginPath();c.moveTo(-26,0);c.quadraticCurveTo(-28,-34,0,-34);c.quadraticCurveTo(24,-34,26,-12);c.quadraticCurveTo(4,-16,-6,-10);c.quadraticCurveTo(-14,-4,-14,4);c.closePath();shape(lin(0,-34,0,0,[[0,'#ff6b6b'],[1,'#c81e2e']]),3);
   ell(-8,-24,7,3,-0.4);c.fillStyle='rgba(255,255,255,.5)';c.fill();c.beginPath();c.roundRect(4,-14,22,9,4);shape('rgba(80,200,255,.85)',2.5);}
 if(C.style==='spiky'){c.beginPath();c.moveTo(-24,0);for(let i=0;i<7;i++){const a=Math.PI*1.05+i*Math.PI*0.14;c.lineTo(Math.cos(a)*24,Math.sin(a)*24-8);const a2=a+Math.PI*0.07;c.lineTo(Math.cos(a2)*40,Math.sin(a2)*40-10);}c.lineTo(22,-14);c.quadraticCurveTo(6,-18,-6,-12);c.quadraticCurveTo(-14,-6,-14,2);c.closePath();c.fill();c.stroke();}
 c.restore();}
// pose: {tor, nk, shN, elN, shF, elF, hpN, knN, hpF, knF, ft, face}
const POSES={
 stand:{tor:0,nk:0,shN:0.12,elN:0.25,shF:-0.08,elF:0.2,hpN:0.02,knN:-0.02,hpF:-0.04,knF:0,ft:0,face:'s'},
 crouch:{tor:0.35,nk:-0.2,shN:-0.9,elN:0.3,shF:-1.1,elF:0.2,hpN:1.0,knN:-1.4,hpF:0.9,knF:-1.3,ft:0,face:'s'},
 reach:{tor:-0.05,nk:-0.1,shN:3.0,elN:0.05,shF:2.9,elF:0.05,hpN:-0.05,knN:0,hpF:-0.15,knF:0,ft:1,face:'s'},
 flop:{tor:0,nk:-0.5,shN:2.0,elN:0.2,shF:1.6,elF:0.3,hpN:0.0,knN:0.1,hpF:-0.1,knF:0.15,ft:1,face:'o'},
 bomb:{tor:0.25,nk:0.1,shN:0.9,elN:1.6,shF:0.8,elF:1.7,hpN:2.3,knN:-2.5,hpF:2.2,knF:-2.4,ft:0.6,face:'o'},
 dive:{tor:0,nk:0.1,shN:3.12,elN:0,shF:3.1,elF:0,hpN:0,knN:0,hpF:0,knF:0,ft:1,face:'s'},
 tuck:{tor:0.4,nk:0.3,shN:1.2,elN:1.3,shF:1.1,elF:1.4,hpN:2.4,knN:-2.6,hpF:2.3,knF:-2.5,ft:0.8,face:'s'},
 feet:{tor:0,nk:0,shN:0.05,elN:0,shF:-0.05,elF:0,hpN:0,knN:0,hpF:0,knF:0,ft:1,face:'s'}};
const KEYS=['tor','nk','shN','elN','shF','elF','hpN','knN','hpF','knF','ft'];
function mix(a,b,t){const o={};for(const k of KEYS)o[k]=L(a[k],b[k],t);o.face=t<.5?a.face:b.face;return o;}
function person(C,P,x,y,rot,s=SC){const G=geo(C,P);const sk=lin(-30,-90,30,60,[[0,C.skin[0]],[1,C.skin[1]]]);c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
 group([up(G.armF),lo(G.armF),()=>handPath(G.armF),up(G.legF),lo(G.legF),()=>footPath(G.legF,P.ft)],C.skin[1]);
 if(C.shirt){c.beginPath();capPath(G.armF.o[0],G.armF.o[1],G.armF.a1,LEN.UA*0.55,13,11.5);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=C.shirt[1];c.fill();c.save();c.translate(-3,-2);c.restore();}
 {const A=G.legF;c.beginPath();capPath(A.j[0],A.j[1],A.a2,LEN.SH*0.85,12,8.5);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=C.shirt?'#e9edf5':'#fff';c.fill();}
 if(C===CH.keeper){const A=G.armF;const [dx,dy]=dirv(A.a2);const gx=A.e[0]+dx*10,gy=A.e[1]+dy*10;c.beginPath();c.ellipse(gx,gy,17,13,Math.atan2(dy,dx),0,7);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle='#e9edf5';c.fill();}
 const hx=G.neck[0]+Math.sin(P.tor+P.nk)*18,hy=G.neck[1]-Math.cos(P.tor+P.nk)*18;
 const nb=[Math.sin(P.tor)*(LEN.T-6),-Math.cos(P.tor)*(LEN.T-6)];
 group([()=>torsoPath(C,P),up(G.legN),lo(G.legN),()=>footPath(G.legN,P.ft),()=>capPath(nb[0],nb[1],P.tor+Math.PI,18,9.5,9),()=>{c.save();c.translate(hx,hy);c.rotate(P.tor+P.nk);headPath();c.restore();}],sk);
 suit(C,P);trunks(C,G);details(C,P,G);
 if(C.shirt){const A=G.legN;c.beginPath();capPath(A.j[0],A.j[1],A.a2,LEN.SH*0.85,12,8.5);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle='#ffffff';c.fill();c.fillStyle=C.shirt[0];const [dx,dy]=dirv(A.a2);c.beginPath();capPath(A.j[0]+dx*8,A.j[1]+dy*8,A.a2,8,12.5,12);c.fill();
  const [ex,ey]=[A.e[0],A.e[1]];c.beginPath();footPath(A,P.ft);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle='#1b1b1b';c.fill();}
 c.save();c.translate(hx,hy);c.rotate(P.tor+P.nk);hairAndFace(C,P.face);c.restore();
 group([up(G.armN),lo(G.armN),()=>handPath(G.armN)],sk,()=>{c.beginPath();c.arc(G.armN.o[0],G.armN.o[1],13,0,7);c.fillStyle=C.skin[0];c.fill();});
 if(C.shirt){c.beginPath();capPath(G.armN.o[0],G.armN.o[1],G.armN.a1,LEN.UA*0.55,13,11.5);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle=C.shirt[0];c.fill();}
 if(C===CH.keeper){for(const A of [G.armN]){const [dx,dy]=dirv(A.a2);const gx=A.e[0]+dx*10,gy=A.e[1]+dy*10;c.beginPath();c.ellipse(gx,gy,17,13,Math.atan2(dy,dx),0,7);c.lineWidth=OL;c.strokeStyle=OUT;c.stroke();c.fillStyle='#ffffff';c.fill();c.beginPath();c.ellipse(gx,gy,10,7,Math.atan2(dy,dx),0,7);c.fillStyle='#c6f432';c.fill();}}
 c.strokeStyle='rgba(110,55,25,.35)';c.lineWidth=2;c.beginPath();c.arc(G.armN.j[0],G.armN.j[1],5,G.armN.a1+2.6,G.armN.a1+3.6);c.stroke();
 c.restore();}
