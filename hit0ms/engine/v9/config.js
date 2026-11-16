// Video #9 — fruit smash (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
const seeds=(n,rx,ry,col)=>{c.fillStyle=col;for(let i=0;i<n;i++){const a=i*2.39,r=Math.sqrt(i/n);ell(Math.cos(a)*rx*r*0.8,Math.sin(a)*ry*r*0.8,2.4,3.5,a);c.fill();}};
// strawberry
const berry=()=>{c.beginPath();c.moveTo(0,52);c.bezierCurveTo(-58,20,-56,-40,0,-38);c.bezierCurveTo(56,-40,58,20,0,52);shape(rad(-14,-14,4,70,[[0,'#ff6b6b'],[1,'#c2182c']]),5,'#6a0a14');
  c.save();c.translate(0,4);seeds(22,40,40,'#ffe08a');c.restore();
  c.fillStyle='#37b24d';c.strokeStyle='#1e6b2a';c.lineWidth=3;for(let i=0;i<5;i++){c.save();c.translate(0,-38);c.rotate(-1.2+i*0.6);c.beginPath();c.ellipse(0,-10,7,16,0,0,7);c.fill();c.stroke();c.restore();}
  ell(-16,-14,9,5,-0.6);c.fillStyle='rgba(255,255,255,.45)';c.fill();};
const berryBit=()=>{ell(0,0,14,11);shape('#e8304a',3,'#6a0a14');ell(-3,-2,5,3);c.fillStyle='#ffb3bd';c.fill();};
// banana
const banana=()=>{
  // crescent body
  c.beginPath();c.moveTo(-112,-34);c.bezierCurveTo(-90,52,82,58,108,-46);c.bezierCurveTo(92,-6,-60,2,-112,-34);c.closePath();
  shape(lin(0,-40,0,50,[[0,'#fff6a3'],[.45,'#ffd93b'],[1,'#e0a800']]),5,'#6b4a00');
  // facets (ridges along the length)
  c.strokeStyle='rgba(170,120,0,.45)';c.lineWidth=3;c.beginPath();c.moveTo(-100,-22);c.bezierCurveTo(-60,34,60,38,100,-34);c.stroke();
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=5;c.beginPath();c.moveTo(-84,-20);c.bezierCurveTo(-50,4,40,6,80,-24);c.stroke();
  // speckles
  c.fillStyle='rgba(120,80,10,.55)';for(const [x,y,r] of [[-40,20,3],[-10,28,2.5],[25,24,3.5],[52,12,2.5],[-62,8,2]]){ell(x,y,r,r*0.8);c.fill();}
  // stem (right) and dark tip (left)
  c.save();c.translate(108,-46);c.rotate(-0.7);c.beginPath();c.roundRect(-6,-26,13,30,4);shape(lin(-6,0,7,0,[[0,'#8a9a3a'],[1,'#5a6420']]),3,'#2e3410');ell(0,-26,7,4);c.fillStyle='#3a2a10';c.fill();c.restore();
  ell(-112,-34,8,6,0.5);c.fillStyle='#3a2a10';c.fill();};
const peel=()=>{c.beginPath();c.moveTo(-50,4);c.quadraticCurveTo(-30,-34,-8,-6);c.quadraticCurveTo(0,-40,10,-6);c.quadraticCurveTo(32,-34,50,4);c.quadraticCurveTo(0,16,-50,4);shape(lin(0,-30,0,10,[[0,'#ffe066'],[1,'#e0a800']]),4,'#6b4a00');c.beginPath();c.moveTo(-20,4);c.quadraticCurveTo(0,-8,20,4);c.lineWidth=6;c.strokeStyle='#fff3c4';c.stroke();};
const mush=()=>{c.beginPath();c.moveTo(-30,6);c.quadraticCurveTo(-28,-14,0,-12);c.quadraticCurveTo(28,-14,30,6);c.closePath();shape(lin(0,-12,0,6,[[0,'#fffbe6'],[1,'#f1dc9a']]),3,'#b89a40');c.fillStyle='rgba(120,90,30,.5)';for(let i=-2;i<=2;i++){ell(i*9,-2,1.6,1.2);c.fill();}};
// kiwi
const kiwi=()=>{ell(0,0,56,46);shape(rad(-16,-16,4,60,[[0,'#a07a4a'],[1,'#6b4a26']]),5,'#3a2410');c.strokeStyle='rgba(60,40,20,.35)';c.lineWidth=1.5;for(let i=0;i<40;i++){const a=i*2.4,r=20+(i*7%30);c.beginPath();c.moveTo(Math.cos(a)*r,Math.sin(a)*r*0.8);c.lineTo(Math.cos(a)*(r+5),Math.sin(a)*(r+5)*0.8);c.stroke();}};
const kiwiHalf=()=>{ell(0,0,44,36);shape('#6b4a26',4,'#3a2410');ell(0,0,38,30);c.fillStyle=rad(0,0,4,38,[[0,'#f4ffd6'],[.35,'#9bd84a'],[1,'#4f9a1e']]);c.fill();
  c.fillStyle='#1a1a1a';for(let i=0;i<18;i++){const a=i/18*Math.PI*2;ell(Math.cos(a)*14,Math.sin(a)*11,2.2,1.4,a);c.fill();}ell(0,0,8,6);c.fillStyle='#fbffe8';c.fill();};
// watermelon
const melon=()=>{ell(0,0,120,82);shape(rad(-40,-30,10,130,[[0,'#6fd06a'],[1,'#1e6b25']]),6,'#0f3a12');
  c.save();ell(0,0,120,82);c.clip();c.strokeStyle='#14501a';c.lineWidth=12;for(let i=-5;i<=5;i++){c.beginPath();c.moveTo(i*24,-90);c.bezierCurveTo(i*24+14,-30,i*24-14,30,i*24,90);c.stroke();}c.restore();
  ell(-46,-40,28,10,-0.4);c.fillStyle='rgba(255,255,255,.3)';c.fill();};
const wedge=()=>{c.beginPath();c.moveTo(-40,10);c.quadraticCurveTo(0,-40,40,10);c.closePath();shape('#ff4d5e',4,'#7a0f1a');c.beginPath();c.moveTo(-40,10);c.quadraticCurveTo(0,20,40,10);c.lineWidth=8;c.strokeStyle='#2f8a33';c.stroke();
  c.fillStyle='#1a1a1a';for(const [x,y] of [[-12,-4],[8,-8],[0,4],[18,2]]){ell(x,y,2.5,4);c.fill();}};
const rind=()=>{c.beginPath();c.moveTo(-26,0);c.quadraticCurveTo(0,-14,26,0);c.lineWidth=12;c.lineCap='round';c.strokeStyle='#2b7a2f';c.stroke();};
const seed=()=>{ell(0,0,3,5);c.fillStyle='#111';c.fill();};
const juice=(col,s)=>(x,g)=>{c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(60*s+Math.sin(i*3.1)*12)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+3+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle=col;c.fill();
  for(let i=0;i<6;i++){ell(x-90*s*g+i*36*s*g,H.FLOOR_Y-2+((i*7)%3),5*g,3*g);c.fill();}};
const many=(n,fn,spread)=>Array.from({length:n},(_,i)=>({dx:(i-(n-1)/2)*spread,dy:-10,h:20,rest:8,draw:fn}));
return {tag:'CHALLENGE #9',ask:'WHICH FRUIT IS THE MOST SATISFYING? &darr;',askStyle:{fontSize:'36px'},
 palette:{wallTop:'#3a2a12',wallBot:'#7a5a22',sky1:'#7fd3ff',sky2:'#e2f6ff',night:false,floorA:'#f5efe0',floorB:'#4c8a3c'},
 objects:{
  berry:{h:100,w:110,rot:-Math.PI*2,burst:420,draw:berry,parts:()=>[...many(7,berryBit,12)],decal:juice('rgba(220,30,60,.75)',0.7)},
  banana:{h:80,w:200,rot:-Math.PI*1.2,burst:360,draw:banana,parts:()=>[{dx:-30,dy:0,h:20,rest:8,draw:peel},{dx:30,dy:0,h:20,rest:8,draw:peel},{dx:0,dy:-6,h:24,rest:10,draw:mush},{dx:10,dy:-6,h:24,rest:10,draw:mush}],decal:juice('rgba(255,240,170,.85)',0.8)},
  kiwi:{h:94,w:115,rot:-Math.PI*1.6,burst:380,draw:kiwi,parts:()=>[{dx:-30,dy:0,h:72,rest:30,draw:kiwiHalf},{dx:30,dy:0,h:72,rest:30,draw:kiwiHalf}],decal:juice('rgba(130,200,60,.75)',0.8)},
  melon:{h:166,w:240,rot:-Math.PI*0.5,burst:560,up:1.2,draw:melon,parts:()=>[...many(6,wedge,30),...many(5,rind,40),...many(14,seed,10)],decal:juice('rgba(230,40,60,.8)',1.3)}},
 onTable(){const x=170,y=880;ell(x,y-8,80,16);shape(lin(0,y-24,0,y+8,[[0,'#d9a066'],[1,'#8a5a2c']]),4,'#4a2a10');
   for(const [dx,col] of [[-30,'#ff922b'],[0,'#ff4d6d'],[30,'#ffd43b']]){ell(x+dx,y-28,20,20);shape(rad(x+dx-6,y-34,2,22,[[0,'#fff'],[.2,col],[1,col]]),3,'rgba(0,0,0,.4)');}}};};
