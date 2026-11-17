const TL=await (await fetch('/timeline.json')).json();
const cv=document.getElementById('cv');let c=cv.getContext('2d');
const W=1080,H=1920,WY=1130,BOARD_Y=760,BOARD_X1=400,SC=1.45;const OUT='#22303a';
const lin=(x0,y0,x1,y1,st)=>{const g=c.createLinearGradient(x0,y0,x1,y1);st.forEach(([o,k])=>g.addColorStop(o,k));return g;};
const rad=(x,y,r0,r1,st)=>{const g=c.createRadialGradient(x,y,r0,x,y,r1);st.forEach(([o,k])=>g.addColorStop(o,k));return g;};
const shape=(f,lw=4,s=OUT)=>{c.fillStyle=f;c.fill();if(lw){c.lineWidth=lw;c.strokeStyle=s;c.lineJoin='round';c.lineCap='round';c.stroke();}};
const ell=(x,y,rx,ry,r=0)=>{c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),r,0,7);};
const ease=t=>1-Math.pow(1-t,3),inout=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,L=(a,b,t)=>a+(b-a)*t,cl=(x,a,b)=>Math.max(a,Math.min(b,x));
$('tag').textContent='CHALLENGE #14';$('ask').innerHTML='WHICH SPLASH WAS THE BIGGEST? &darr;';Object.assign($('ask').style,{background:'#1fa2ff',color:'#fff'});
function $(id){return document.getElementById(id);}
// ---------------- background ----------------
const bg=document.createElement('canvas');bg.width=W;bg.height=H;{const g=bg.getContext('2d');
 const sky=g.createLinearGradient(0,0,0,WY);sky.addColorStop(0,'#2f8fe8');sky.addColorStop(.6,'#8fd3ff');sky.addColorStop(1,'#d8f2ff');g.fillStyle=sky;g.fillRect(0,0,W,WY);
 const sun=g.createRadialGradient(880,260,10,880,260,320);sun.addColorStop(0,'rgba(255,250,210,1)');sun.addColorStop(.12,'rgba(255,240,170,.9)');sun.addColorStop(1,'rgba(255,240,170,0)');g.fillStyle=sun;g.fillRect(0,0,W,WY);
 g.fillStyle='rgba(255,255,255,.85)';for(const [x,y,s] of [[150,520,1],[620,430,.8],[980,560,.7]]){g.beginPath();g.arc(x,y,40*s,0,7);g.arc(x+46*s,y-18*s,52*s,0,7);g.arc(x+100*s,y,38*s,0,7);g.arc(x+50*s,y+12*s,40*s,0,7);g.fill();}
 g.save();g.translate(0,WY-1010);
 // distant hills + hotel
 g.fillStyle='#7cc4a0';g.beginPath();g.moveTo(0,860);g.quadraticCurveTo(300,760,560,840);g.quadraticCurveTo(820,780,1080,830);g.lineTo(1080,960);g.lineTo(0,960);g.fill();
 g.fillStyle='#f3e6d0';g.fillRect(560,700,380,240);g.fillStyle='#e2cfb0';g.fillRect(560,700,380,22);for(let r=0;r<4;r++)for(let k=0;k<7;k++){g.fillStyle=(r+k)%3?'#7fc7f0':'#a9dcf7';g.fillRect(580+k*52,740+r*48,34,30);g.fillStyle='#fff';g.fillRect(578+k*52,770+r*48,38,5);}
 // palms
 function palm(x,y,h,lean){g.save();g.translate(x,y);g.strokeStyle='#6b4423';g.lineCap='round';for(let i=0;i<12;i++){const t0=i/12,t1=(i+1)/12;g.lineWidth=26-i*1.1;g.strokeStyle=i%2?'#8a5a2e':'#74491f';g.beginPath();g.moveTo(lean*t0*t0*h,-h*t0);g.lineTo(lean*t1*t1*h,-h*t1);g.stroke();}
  const tx=lean*h,ty=-h;for(let i=0;i<8;i++){const a=-Math.PI*0.95+i*Math.PI/7.5;const len=150+((i*37)%50);g.save();g.translate(tx,ty);g.rotate(a);const gr=g.createLinearGradient(0,0,len,0);gr.addColorStop(0,'#1f7a3a');gr.addColorStop(1,'#4fc36a');g.fillStyle=gr;
   g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(len*.5,-30,len,22+((i%3)*6));g.quadraticCurveTo(len*.5,10,0,0);g.fill();g.strokeStyle='rgba(15,70,30,.6)';g.lineWidth=2;for(let k=1;k<9;k++){const px=len*k/9;g.beginPath();g.moveTo(px,-18+px*0.12);g.lineTo(px+10,8+px*0.18);g.stroke();}g.restore();}
  g.fillStyle='#6b3f1a';for(const [dx,dy] of [[-10,8],[8,10],[0,18]]){g.beginPath();g.arc(tx+dx,ty+dy,11,0,7);g.fill();}g.restore();}
 palm(1000,980,430,-0.25);palm(470,980,330,0.2);
 // deck
 g.fillStyle='#efe4d0';g.fillRect(0,950,W,60);g.fillStyle='rgba(0,0,0,.08)';for(let x=0;x<W;x+=60)g.fillRect(x,950,2,60);g.fillStyle='#d9ccb4';g.fillRect(0,995,W,15);
 g.restore();
 // pool body
 const wg=g.createLinearGradient(0,WY,0,H);wg.addColorStop(0,'#3cc6f0');wg.addColorStop(.4,'#139bd8');wg.addColorStop(1,'#0a5e9e');g.fillStyle=wg;g.fillRect(0,WY,W,H-WY);
 g.strokeStyle='rgba(255,255,255,.14)';g.lineWidth=2;for(let y=WY+30;y<H;y+=36*(1+(y-WY)/900)){g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();}
 for(let k=-12;k<=12;k++){g.beginPath();g.moveTo(540+k*60,WY);g.lineTo(540+k*160,H);g.stroke();}
 g.fillStyle='rgba(10,40,90,.35)';g.fillRect(500,WY+300,80,700);g.fillRect(380,WY+870,320,40);
 // tower
 g.fillStyle='#c9d3dc';g.fillRect(40,BOARD_Y+20,90,WY-BOARD_Y-20);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(110,BOARD_Y+20,20,WY-BOARD_Y-20);
 g.strokeStyle='#9aa7b3';g.lineWidth=8;g.beginPath();g.moveTo(10,BOARD_Y-60);g.lineTo(10,WY);g.moveTo(34,BOARD_Y-60);g.lineTo(34,WY);g.stroke();g.lineWidth=5;for(let y=BOARD_Y-40;y<WY;y+=34){g.beginPath();g.moveTo(10,y);g.lineTo(34,y);g.stroke();}
 g.strokeStyle='#e9eef2';g.lineWidth=7;g.beginPath();g.moveTo(40,BOARD_Y-70);g.lineTo(40,BOARD_Y);g.moveTo(40,BOARD_Y-70);g.quadraticCurveTo(80,BOARD_Y-78,120,BOARD_Y-40);g.stroke();}
function board(bend){c.beginPath();c.moveTo(30,BOARD_Y);c.lineTo(130,BOARD_Y);c.quadraticCurveTo(250,BOARD_Y+bend*0.4,BOARD_X1,BOARD_Y+bend);c.lineTo(BOARD_X1,BOARD_Y+bend+22);c.quadraticCurveTo(250,BOARD_Y+22+bend*0.4,130,BOARD_Y+22);c.lineTo(30,BOARD_Y+22);c.closePath();
 shape(lin(0,BOARD_Y,0,BOARD_Y+22,[[0,'#ffffff'],[.4,'#eef3f7'],[1,'#1f6fd1']]),4);c.fillStyle='#1f6fd1';c.fillRect(100,BOARD_Y+22,40,24);}
// ---------------- person ----------------
const LEN={T:78,N:10,UA:44,FA:40,TH:58,SH:56,FT:24};
const CH={
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
function suit(C,P){if(!C.suit)return;const T=LEN.T;c.save();c.rotate(P.tor);c.beginPath();c.moveTo(-21,8);c.bezierCurveTo(-27,-T*0.4,-25,-T*0.62,-20,-T*0.7);c.lineTo(14,-T*0.7);c.bezierCurveTo(24,-T*0.62,26,-T*0.55,18,-T*0.5);c.bezierCurveTo(21,-T*0.4,23,-T*0.02,15,8);c.quadraticCurveTo(0,16,-21,8);c.closePath();
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
 const hx=G.neck[0]+Math.sin(P.tor+P.nk)*18,hy=G.neck[1]-Math.cos(P.tor+P.nk)*18;
 const nb=[Math.sin(P.tor)*(LEN.T-6),-Math.cos(P.tor)*(LEN.T-6)];
 group([()=>torsoPath(C,P),up(G.legN),lo(G.legN),()=>footPath(G.legN,P.ft),()=>capPath(nb[0],nb[1],P.tor+Math.PI,18,9.5,9),()=>{c.save();c.translate(hx,hy);c.rotate(P.tor+P.nk);headPath();c.restore();}],sk);
 suit(C,P);trunks(C,G);details(C,P,G);
 c.save();c.translate(hx,hy);c.rotate(P.tor+P.nk);hairAndFace(C,P.face);c.restore();
 group([up(G.armN),lo(G.armN),()=>handPath(G.armN)],sk,()=>{c.beginPath();c.arc(G.armN.o[0],G.armN.o[1],13,0,7);c.fillStyle=C.skin[0];c.fill();});
 c.strokeStyle='rgba(110,55,25,.35)';c.lineWidth=2;c.beginPath();c.arc(G.armN.j[0],G.armN.j[1],5,G.armN.a1+2.6,G.armN.a1+3.6);c.stroke();
 c.restore();}
// ---------------- dives ----------------
const D={
 flop:{pose:'flop',rotEnd:Math.PI/2,spin:0,entry:620,splash:{n:70,vx:520,vy:900,sheet:1.3,col:0.6}},
 bomb:{pose:'bomb',rotEnd:-0.3,spin:0,entry:640,splash:{n:85,vx:330,vy:1500,sheet:1.0,col:1.6}},
 perfect:{pose:'dive',rotEnd:Math.PI*1.02,spin:0,entry:660,splash:{n:14,vx:150,vy:700,sheet:0.25,col:0.25}},
 flip:{pose:'tuck',rotEnd:Math.PI*2,spin:1,entry:640,splash:{n:45,vx:300,vy:1100,sheet:0.7,col:0.9}}};
const STAND_Y=BOARD_Y-(LEN.TH+LEN.SH+6)*SC;
const LOW={flop:32,bomb:72,perfect:166,flip:126};
function flightState(a,u){const d=D[a.obj];const x0=BOARD_X1-40,y0=STAND_Y-10,x1=d.entry,y1=WY-LOW[a.obj]*SC;
 const x=L(x0,x1,ease(u)*0.3+u*0.7);const y=L(y0,y1,u*u)-150*Math.sin(Math.PI*Math.min(1,u*1.15))*(1-u*0.6);let rot,P;
 if(a.obj==='flip'){const spinU=cl(u/0.8,0,1);rot=inout(spinU)*Math.PI*2;P=mix(POSES.tuck,POSES.feet,cl((u-0.75)/0.25,0,1));if(u<0.12)P=mix(POSES.reach,POSES.tuck,u/0.12);}
 else if(a.obj==='perfect'){rot=d.rotEnd*inout(u);P=mix(POSES.reach,POSES.dive,cl(u/0.3,0,1));}
 else{rot=d.rotEnd*ease(cl(u/0.7,0,1));P=mix(POSES.reach,POSES[d.pose],cl(u/0.35,0,1));}
 return {x,y,rot,P};}
// ---------------- water FX ----------------
let seed=1;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
const pc=document.createElement('canvas');pc.width=W;pc.height=H;const pg=pc.getContext('2d');
const SPL={ // per dive: crown cup, side wings, jet, drops, mist
 flop:{cup:0,wings:1,jet:0,drops:{n:90,vx:[260,720],vy:[250,700],r:[3,9],spread:220},mist:1,foam:1.6,ring:1.4},
 bomb:{cup:1.2,wings:0,jet:1.25,drops:{n:110,vx:[60,380],vy:[700,1500],r:[4,11],spread:120},mist:0.8,foam:1.2,ring:1.2},
 perfect:{cup:0.12,wings:0,jet:0,drops:{n:8,vx:[20,90],vy:[200,420],r:[2,4],spread:20},mist:0.1,foam:0.25,ring:0.5},
 flip:{cup:0.6,wings:0,jet:0.75,drops:{n:45,vx:[40,240],vy:[500,1050],r:[3,8],spread:60},mist:0.4,foam:0.7,ring:0.9}};
const DR={};function drops(key){if(DR[key])return DR[key];seed=key.length*977+11;const q=SPL[key].drops;const arr=[];for(let i=0;i<q.n;i++){const side=rnd()<.5?-1:1;arr.push({vx:side*L(q.vx[0],q.vx[1],rnd()),vy:-L(q.vy[0],q.vy[1],rnd()),r:L(q.r[0],q.r[1],rnd()),dx:(rnd()-.5)*q.spread,t0:rnd()*0.12});}return DR[key]=arr;}
const WATER=(y0,y1,a=1)=>lin(0,y0,0,y1,[[0,`rgba(255,255,255,${0.96*a})`],[.35,`rgba(225,247,255,${0.88*a})`],[1,`rgba(120,210,250,${0.75*a})`]]);
function droplet(x,y,r,vx,vy){const ang=Math.atan2(vy,vx);const st=cl(Math.hypot(vx,vy)/900,0,1);c.save();c.translate(x,y);c.rotate(ang);c.beginPath();c.ellipse(0,0,r*(1+st*1.4),r,0,0,7);
 c.fillStyle=rad(-r*0.3,-r*0.3,r*0.1,r*1.6,[[0,'rgba(255,255,255,1)'],[.5,'rgba(215,245,255,.95)'],[1,'rgba(90,190,240,.85)']]);c.fill();c.restore();}
function crownCup(x,t,k){ // flared crown splash with fingered rim
 const life=cl(t/0.7,0,1);const hgt=k*165*Math.sin(Math.PI*life)*(1-life*0.3);if(hgt<3)return;const rb=(40+50*k)*(1+t*0.8),rt=rb*(1.5+0.6*life),ryb=rb*0.15,ryt=rt*0.16;const top=WY-hgt;
 const wall=(front)=>{c.beginPath();if(front){c.ellipse(x,top,rt,ryt,0,0,Math.PI);c.bezierCurveTo(x-rt*0.85,top+hgt*0.45,x-rb*1.05,WY-hgt*0.2,x-rb,WY);c.ellipse(x,WY,rb,ryb,0,Math.PI,0,true);c.bezierCurveTo(x+rb*1.05,WY-hgt*0.2,x+rt*0.85,top+hgt*0.45,x+rt,top);}
   else{c.ellipse(x,top,rt,ryt,0,Math.PI,0);c.bezierCurveTo(x+rt*0.85,top+hgt*0.45,x+rb*1.05,WY-hgt*0.2,x+rb,WY);c.ellipse(x,WY,rb,ryb,0,0,Math.PI,true);c.bezierCurveTo(x-rb*1.05,WY-hgt*0.2,x-rt*0.85,top+hgt*0.45,x-rt,top);}c.closePath();};
 wall(false);c.fillStyle=lin(0,top,0,WY,[[0,'rgba(255,255,255,.45)'],[1,'rgba(140,215,250,.2)']]);c.fill();
 wall(true);c.fillStyle=lin(x-rt,0,x+rt,0,[[0,'rgba(220,245,255,.75)'],[.12,'rgba(160,225,255,.35)'],[.3,'rgba(255,255,255,.6)'],[.5,'rgba(170,230,255,.28)'],[.88,'rgba(160,225,255,.35)'],[1,'rgba(220,245,255,.75)']]);c.fill();
 c.strokeStyle='rgba(255,255,255,1)';c.lineWidth=4;c.beginPath();c.ellipse(x,top,rt,ryt,0,0,Math.PI*2);c.stroke();c.strokeStyle='rgba(70,165,225,.35)';c.lineWidth=2;wall(true);c.stroke();
 const n=16;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const px=x+Math.cos(a)*rt,py=top+Math.sin(a)*ryt;const fl=(16+18*k)*(0.6+0.4*Math.sin(i*2.3))*Math.sin(Math.PI*life);const dx=Math.cos(a)*0.6;
   c.beginPath();c.moveTo(px-5,py+2);c.quadraticCurveTo(px+dx*fl*0.5,py-fl*0.6,px+dx*fl,py-fl);c.lineTo(px+5,py+2);c.closePath();c.fillStyle='rgba(245,253,255,.97)';c.fill();
   if(life>0.25)droplet(px+dx*fl*1.4+dx*(life-0.25)*120,py-fl-(life-0.25)*60+(life-0.25)**2*300,4+3*k,dx*300,-100+life*600);}}
function wings(x,t){ // belly flop: two low lateral sheets thrown sideways
 const life=cl(t/0.75,0,1),g=Math.sin(Math.PI*life);if(g<0.02)return;
 for(const sd of [-1,1]){const reach=(120+260*life)*sd,hh=150*g;c.beginPath();c.moveTo(x+sd*30,WY+4);c.bezierCurveTo(x+sd*60,WY-hh*0.9,x+reach*0.6,WY-hh*1.1,x+reach,WY-hh*0.35);
   for(let i=0;i<8;i++){const u=i/8;c.lineTo(x+reach-u*sd*40+Math.sin(i*2.1)*6,WY-hh*0.35+u*hh*0.35+(i%2?10:-6)*g);}c.lineTo(x+reach*0.9,WY+4);c.closePath();c.fillStyle=WATER(WY-hh,WY,0.85);c.fill();
   c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=3;c.stroke();for(let i=0;i<7;i++){const u=0.3+i*0.1;droplet(x+reach*u+sd*life*80,WY-hh*(0.8+0.3*Math.sin(i*2))*u-life*40+life*life*120,3+i%3*1.5,sd*500,-200+life*700);}}}
function jet(x,t,k){ // Worthington jet: rises after cavity collapse
 const life=cl((t-0.18)/0.75,0,1);const h=k*360*Math.sin(Math.PI*life);if(h<4)return;const w=16+12*k;
 c.beginPath();c.moveTo(x-w,WY+4);c.bezierCurveTo(x-w*0.45,WY-h*0.35,x-w*0.3,WY-h*0.8,x-w*0.28,WY-h);c.arc(x,WY-h,w*0.28,Math.PI,0);c.bezierCurveTo(x+w*0.3,WY-h*0.8,x+w*0.45,WY-h*0.35,x+w,WY+4);c.closePath();
 c.fillStyle=lin(x-w,0,x+w,0,[[0,'rgba(150,220,255,.85)'],[.4,'rgba(255,255,255,.98)'],[1,'rgba(140,215,255,.85)']]);c.fill();c.strokeStyle='rgba(50,150,215,.4)';c.lineWidth=2;c.stroke();
 const bh=WY-h-w*0.45-(life>0.5?(life-0.5)*120:0);droplet(x,bh,w*0.5,0,-300);if(life>0.4)droplet(x+6,bh-w*1.1-(life-0.4)*90,w*0.3,0,-400);}
function splash(key,x,t){if(t<0)return;const S=SPL[key];
 for(let i=0;i<4;i++){const tt=t-i*0.1;if(tt<0)continue;const r=30+tt*380*S.ring;c.beginPath();c.ellipse(x,WY+4,r,r*0.12,0,0,7);c.strokeStyle=`rgba(255,255,255,${Math.max(0,0.8-tt*0.75)})`;c.lineWidth=5-i;c.stroke();}
 const fo=Math.max(0,1-t*0.55);if(fo>0){c.beginPath();const fw=(50+60*S.foam)*(1+t*0.8),fh=(10+6*S.foam);for(let i=0;i<=16;i++){const a=i/16*Math.PI*2;const r=1+0.12*Math.sin(i*3.1);c.lineTo(x+Math.cos(a)*fw*r,WY+6+Math.sin(a)*fh*r);}c.closePath();c.fillStyle=`rgba(250,254,255,${0.9*fo})`;c.fill();
   c.fillStyle=`rgba(255,255,255,${fo})`;for(let i=0;i<12;i++){ell(x+(i-6)*fw/7,WY+4+Math.sin(i*1.7)*fh*0.5,4+i%3*2,3);c.fill();}}
 if(S.cup)crownCup(x,t,S.cup);if(S.wings)wings(x,t);if(S.jet)jet(x,t,S.jet);
 if(S.mist){for(let i=0;i<40*S.mist;i++){const a=(i*2.39)%(Math.PI)+Math.PI,sp=(200+(i*53)%300)*S.mist;const px=x+Math.cos(a)*sp*t*(S.wings?1.6:1),py=WY+Math.sin(a)*sp*t*0.8+500*t*t;if(py>WY+4)continue;c.beginPath();c.arc(px,py,1.6+(i%3),0,7);c.fillStyle=`rgba(255,255,255,${0.7*Math.max(0,1-t*1.2)})`;c.fill();}}
 for(const d of drops(key)){const tt=t-d.t0;if(tt<0)continue;const vy=d.vy+1500*tt,px=x+d.dx+d.vx*tt,py=WY-4+d.vy*tt+750*tt*tt;
   if(py>WY+6){const st=(-d.vy/1500)*2;const tl=tt-st;if(tl>0&&tl<0.25){ell(px,WY+4,d.r*2+tl*60,d.r*0.5+tl*6);c.strokeStyle=`rgba(255,255,255,${0.8-tl*3})`;c.lineWidth=2;c.stroke();}continue;}
   droplet(px,py,d.r,d.vx,vy);}}
function bubbles(x,t,n){for(let i=0;i<n;i++){const bx=x+Math.sin(i*2.3+t*4)*30+((i*37)%80-40),by=WY+40+((i*53)%160)-t*(140+(i%5)*40);if(by<WY+6)continue;c.beginPath();c.arc(bx,by,3+(i%4)*2,0,7);c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=2;c.stroke();}}
function waterSurface(f){c.beginPath();c.moveTo(0,WY);for(let x=0;x<=W;x+=20)c.lineTo(x,WY+Math.sin(x*0.02+f*0.12)*3+Math.sin(x*0.051-f*0.09)*2);c.lineTo(W,WY+14);c.lineTo(0,WY+14);c.closePath();c.fillStyle='rgba(220,248,255,.7)';c.fill();
 c.save();c.globalAlpha=.22;c.strokeStyle='#fff';c.lineWidth=3;for(let i=0;i<14;i++){const y=WY+60+i*60+Math.sin(f*0.07+i)*8;c.beginPath();for(let x=-20;x<=W;x+=40){const yy=y+Math.sin(x*0.013+f*0.05+i*1.7)*14;x<0?c.moveTo(x,yy):c.lineTo(x,yy);}c.stroke();}c.restore();}
function floatie(x,y,s){c.save();c.translate(x,y);c.scale(s,s);ell(0,0,150,46);c.fillStyle=rad(-40,-20,10,170,[[0,'#ffb3d1'],[1,'#ff4d8d']]);c.fill();c.lineWidth=5;c.strokeStyle='#8a1f4a';c.stroke();ell(0,-4,70,18);c.fillStyle='#29b6f6';c.fill();c.stroke();
 for(let i=0;i<6;i++){const a=i/6*Math.PI*2;ell(Math.cos(a)*110,Math.sin(a)*32,14,8,a);c.fillStyle='#fff';c.fill();}ell(-70,-28,30,8,-0.1);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.restore();}
// ---------------- render ----------------
window.renderAt=(f0)=>{const fps=TL.fps;const f=(f0+TL.offset)%TL.total;const ff=f*30/fps;const A=TL.attempts;const ai=A.findIndex(x=>f>=x.start&&f<x.end);const a=A[ai];const nx=A[(ai+1)%A.length];const k=f-a.impact;
 let C=CH[a.obj],x,y,rot=0,P=POSES.stand,bend=0,show=true,caught=false,fx=-1,rwv=-1,under=0,shake=0;
 if(f<a.release){const u=(f-a.start)/(a.release-a.start);const walk=cl(u/0.55,0,1);x=L(150,BOARD_X1-40,ease(walk));y=STAND_Y;
   if(u>0.55){const b=(u-0.55)/0.45;const dip=Math.sin(b*Math.PI);bend=dip*34;y+=bend*0.9;P=mix(POSES.stand,POSES.crouch,dip*0.8);if(b>0.7)P=mix(P,POSES.reach,(b-0.7)/0.3);}
   else{const ph=Math.sin(walk*Math.PI*4);P={...POSES.stand,hpN:0.35*ph,hpF:-0.35*ph,knN:-0.25*Math.max(0,-ph),knF:-0.25*Math.max(0,ph),shN:-0.3*ph,shF:0.3*ph};y+=Math.abs(ph)*-5;}}
 else if(f<a.impact){const u=(f-a.release)/(a.impact-a.release);const S=flightState(a,u);x=S.x;y=S.y;rot=S.rot;P=S.P;bend=Math.max(0,1-u*4)*-22*Math.cos(u*30);}
 else if(k===0){caught=true;const S=flightState(a,1);x=S.x;y=S.y-50;rot=S.rot;P=S.P;}
 else if(k<a.hold){fx=k/fps;const S=flightState(a,1);x=S.x;y=S.y+Math.min(260,k*16*30/fps);rot=S.rot;P=S.P;under=1;shake=k<10?(10-k)/10:0;}
 else{rwv=(k-a.hold+1)/(a.rw+1);if(rwv<0.7){const u=1-inout(rwv/0.7);const S=flightState(a,u);x=S.x;y=S.y;rot=S.rot;P=S.P;fx=rwv<0.4?(a.hold-1)/fps*(1-rwv/0.4):-1;}
   else{C=CH[nx.obj];const w=(rwv-0.7)/0.3;x=150;y=STAND_Y-200*(1-ease(w));P=POSES.stand;}}
 c.save();if(shake)c.translate(Math.sin(ff*7.1)*7*shake,Math.cos(ff*9.3)*7*shake);
 c.drawImage(bg,0,0);board(bend);waterSurface(ff);
 const D0=D[a.obj];
 if(under){const mc=c;pg.setTransform(1,0,0,1,0,0);pg.clearRect(0,0,W,H);c=pg;person(C,P,x,y,rot);pg.globalCompositeOperation='source-atop';pg.fillStyle='rgba(25,120,200,.55)';pg.fillRect(0,0,W,H);pg.globalCompositeOperation='source-over';c=mc;c.save();c.beginPath();c.rect(0,WY+6,W,H);c.clip();c.globalAlpha=0.8;c.drawImage(pc,0,0);c.globalAlpha=1;c.restore();bubbles(D0.entry,fx,26);}
 if(fx>=0)splash(a.obj,D0.entry,fx);
 if(show&&!under){if(caught)floatie(D[a.obj].entry,WY-10,1.15);person(C,P,x,y,rot);
   // shadow on water
   if(f>=a.release&&!caught){const dist=WY-y;ell(x,WY+8,60*Math.max(.3,1-dist/700),8);c.fillStyle='rgba(0,40,80,.18)';c.fill();}}
 if(caught){for(let i=0;i<10;i++){const a2=i/10*Math.PI*2;c.beginPath();c.arc(x+Math.cos(a2)*190,WY-40+Math.sin(a2)*80,5,0,7);c.fillStyle='#fff6a0';c.fill();}}
 c.restore();
 const ms=Math.round(k*1000/fps);let res,col;if(ms===0){res='PERFECT!';col='var(--g)';}else if(Math.abs(ms)<=100){res='ALMOST!';col='var(--y)';}else if(ms<0){res='TOO EARLY';col='var(--r)';}else{res='TOO LATE';col='var(--o)';}
 $('lv').textContent=`LEVEL ${a.level} / ${A.length}`;$('sp').textContent=`SPEED ${Math.round(a.speed*100)}%`;$('res').textContent=res;$('res').style.color=col;$('val').textContent=(ms>0?'+':'')+ms+' ms';$('val').style.color=col;
 $('mk').style.left=(50+Math.max(-1,Math.min(1,ms/1000))*50)+'%';$('hud').classList.toggle('perfect',ms===0);$('secret').style.display=caught?'flex':'none';$('word').textContent=`"${a.word}"`;
 $('rw').style.opacity=rwv>=0?(0.55+0.45*Math.abs(Math.sin(ff*0.9))):0;};
window.hideUI=()=>{$('ui').style.display='none';};
await document.fonts.ready;window.ready=true;
