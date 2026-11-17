export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const W=1080,HH=1240,OY=230;
const off=document.createElement('canvas');off.width=W;off.height=HH;const o=off.getContext('2d');
function L(x0,y0,x1,y1,st){const g=o.createLinearGradient(x0,y0,x1,y1);st.forEach(([a,b])=>g.addColorStop(a,b));return g;}
function R(x,y,r0,r1,st){const g=o.createRadialGradient(x,y,r0,x,y,r1);st.forEach(([a,b])=>g.addColorStop(a,b));return g;}
function F(fill,lw=0,st='#3a2410'){o.fillStyle=fill;o.fill();if(lw){o.lineWidth=lw;o.strokeStyle=st;o.lineJoin='round';o.stroke();}}
function E(x,y,rx,ry,a=0){o.beginPath();o.ellipse(x,y,rx,ry,a,0,7);}
// scene
o.fillStyle=L(0,0,0,HH,[[0,'#2e8bff'],[.55,'#8fd0ff'],[1,'#c9ecff']]);o.fillRect(0,0,W,HH);
E(880,170,90,90);F(R(880,170,10,95,[[0,'#fff6b0'],[1,'#ffcc00']]));
for(const [x,y,s] of [[180,160,1],[520,110,.7]]){o.fillStyle='rgba(255,255,255,.95)';for(const [dx,dy,r] of [[0,0,50],[50,-20,60],[105,0,48],[50,15,55]]){E(x+dx*s,y+dy*s,r*s,r*s*.8);o.fill();}}
o.beginPath();o.moveTo(0,820);o.quadraticCurveTo(300,720,560,800);o.quadraticCurveTo(820,870,1080,760);o.lineTo(1080,HH);o.lineTo(0,HH);o.closePath();F(L(0,760,0,HH,[[0,'#46d14a'],[1,'#1f8a2a']]));
for(let i=0;i<14;i++){const x=40+i*77,y=1000+((i*53)%180);o.strokeStyle='#2a7a1a';o.lineWidth=5;o.beginPath();o.moveTo(x,y+30);o.lineTo(x,y);o.stroke();
  for(let k=0;k<5;k++){E(x+Math.cos(k*1.26)*13,y+Math.sin(k*1.26)*13,9,9);o.fillStyle=['#ff3b6b','#ffd400','#a64dff','#ff7a00'][i%4];o.fill();}E(x,y,7,7);o.fillStyle='#fff6b0';o.fill();}
// red ball
E(890,1060,85,85);F(R(860,1030,10,95,[[0,'#ff7a7a'],[1,'#d01020']]),6,'#5a0008');o.strokeStyle='#fff';o.lineWidth=10;o.beginPath();o.arc(890,1060,85,-0.6,0.9);o.stroke();
// dog body
const FUR='#f0a040',FUR2='#c86f1c',CRM='#fff3dd';
E(540,1080,250,190);F(L(0,900,0,1270,[[0,FUR],[1,FUR2]]),6);
E(540,1010,120,150);F(CRM);
// ears
for(const sx of [-1,1]){o.beginPath();o.moveTo(540+sx*150,330);o.quadraticCurveTo(540+sx*330,330,540+sx*300,640);o.quadraticCurveTo(540+sx*230,700,540+sx*180,560);o.closePath();F(L(0,330,0,700,[[0,'#b65f14'],[1,'#7a3a08']]),6);}
// head
o.beginPath();o.moveTo(540,250);o.bezierCurveTo(800,250,820,520,770,640);o.bezierCurveTo(730,760,640,820,540,820);o.bezierCurveTo(440,820,350,760,310,640);o.bezierCurveTo(260,520,280,250,540,250);o.closePath();F(R(470,420,40,460,[[0,'#ffc070'],[.6,FUR],[1,FUR2]]),6);
// fur strokes
o.strokeStyle='rgba(150,80,10,.35)';o.lineWidth=4;o.lineCap='round';for(let i=0;i<22;i++){const x=340+((i*67)%400),y=300+((i*41)%220);o.beginPath();o.moveTo(x,y);o.quadraticCurveTo(x+8,y+14,x+2,y+28);o.stroke();}
// muzzle + forehead blaze
o.beginPath();o.moveTo(540,330);o.quadraticCurveTo(580,470,640,560);o.quadraticCurveTo(700,700,540,790);o.quadraticCurveTo(380,700,440,560);o.quadraticCurveTo(500,470,540,330);o.closePath();F(L(0,330,0,790,[[0,'#fff8ea'],[1,'#ffe6c4']]));
// eyes
for(const sx of [-1,1]){const x=540+sx*120,y=500;E(x,y,46,50);F('#3b1f0a',5,'#1a0d03');E(x,y+4,32,36);F(R(x-6,y-6,4,40,[[0,'#8a4a14'],[1,'#2a1405']]));E(x-12,y-14,13,13);o.fillStyle='#fff';o.fill();E(x+12,y+14,6,6);o.fill();
  o.strokeStyle='#7a3a08';o.lineWidth=7;o.beginPath();o.moveTo(x-40,y-70);o.quadraticCurveTo(x,y-90,x+40,y-72);o.stroke();}
// cheeks blush
for(const sx of [-1,1]){E(540+sx*190,640,48,26);o.fillStyle='rgba(255,90,120,.35)';o.fill();}
// nose
o.beginPath();o.moveTo(480,600);o.quadraticCurveTo(540,575,600,600);o.quadraticCurveTo(605,650,540,668);o.quadraticCurveTo(475,650,480,600);o.closePath();F(R(520,600,4,80,[[0,'#5a4a4a'],[1,'#120a0a']]),5,'#000');E(515,600,18,9,-0.2);o.fillStyle='rgba(255,255,255,.55)';o.fill();
// mouth + tongue
o.strokeStyle='#3a1f0a';o.lineWidth=7;o.beginPath();o.moveTo(540,668);o.lineTo(540,700);o.quadraticCurveTo(500,740,460,705);o.moveTo(540,700);o.quadraticCurveTo(580,740,620,705);o.stroke();
o.beginPath();o.moveTo(500,718);o.quadraticCurveTo(540,735,580,718);o.quadraticCurveTo(590,800,540,805);o.quadraticCurveTo(490,800,500,718);o.closePath();F(L(0,718,0,805,[[0,'#ff7aa0'],[1,'#e0406a']]),5,'#7a1030');o.strokeStyle='rgba(150,20,50,.6)';o.lineWidth=4;o.beginPath();o.moveTo(540,730);o.lineTo(540,785);o.stroke();
// collar + tag
o.beginPath();o.moveTo(350,800);o.quadraticCurveTo(540,880,730,800);o.lineTo(740,850);o.quadraticCurveTo(540,935,340,850);o.closePath();F(L(0,800,0,900,[[0,'#2f6bff'],[1,'#1a3fb0']]),6,'#0a1a50');
E(540,930,40,40);F(R(528,918,4,44,[[0,'#fff3a0'],[1,'#e0a000']]),5,'#6a4a00');
const COL=off;
const NEG=document.createElement('canvas');NEG.width=W;NEG.height=HH;const n=NEG.getContext('2d');n.filter='invert(1)';n.drawImage(COL,0,0);
const GRY=document.createElement('canvas');GRY.width=W;GRY.height=HH;const g=GRY.getContext('2d');g.filter='grayscale(1)';g.drawImage(COL,0,0);
const DOT=[540,618+OY];const SW=18.9,END=24.9;
function dot(r=14){c.beginPath();c.arc(DOT[0],DOT[1],r+8,0,7);c.fillStyle='#000';c.fill();c.beginPath();c.arc(DOT[0],DOT[1],r,0,7);c.fillStyle='#ff1f3d';c.fill();}
function frame(t){c.fillStyle='#0b1430';c.fillRect(0,0,1080,1920);
  const img=t<SW?NEG:GRY;c.drawImage(img,0,OY);
  c.fillStyle=lin(0,OY+HH-160,0,OY+HH,[[0,'rgba(11,20,48,0)'],[1,'rgba(11,20,48,1)']]);c.fillRect(0,OY+HH-160,1080,160);c.fillStyle=lin(0,OY,0,OY+120,[[0,'rgba(11,20,48,1)'],[1,'rgba(11,20,48,0)']]);c.fillRect(0,OY,1080,120);
  if(t<SW){dot(14+3*Math.sin(t*5));
    const p=clamp(t/SW,0,1);c.save();c.translate(540,135);c.beginPath();c.roundRect(-380,-62,760,124,62);K.fs('#fff',7,NV);K.text('OLHA PRO PONTO',-40,4,58,NV,0);
      c.beginPath();c.arc(300,0,42,0,7);c.fillStyle='#e9edf5';c.fill();c.beginPath();c.moveTo(300,0);c.arc(300,0,42,-Math.PI/2,-Math.PI/2+p*Math.PI*2);c.closePath();c.fillStyle='#e5484d';c.fill();
      K.text(String(Math.ceil(SW-t)),300,4,40,'#fff',8);c.restore();
    if(t>6.9){const k=back((t-6.9)/.4);c.save();c.translate(540,1590);c.scale(k,k);K.text('NÃO PISCA!',0,0,96,Y,20);c.restore();}}
  else{const k=t-SW;const fl=clamp(1-k/.25,0,1);c.fillStyle=`rgba(255,255,255,${fl})`;c.fillRect(0,0,1080,1920);dot(14);
    const p=back(k/.35);c.save();c.translate(540,135);c.scale(p,p);c.beginPath();c.roundRect(-400,-62,800,124,62);K.fs(Y,7,NV);K.text('ELE FICOU COLORIDO?',0,4,54,NV,0);c.restore();
    if(t>END-1.2){const q=back((t-END+1.2)/.3);c.save();c.translate(540,1700);c.scale(q,q);c.beginPath();c.roundRect(-420,-50,840,100,50);K.fs(Y,6,NV);K.text('SEGUE · AMANHÃ TEM MAIS 2 FATOS',0,4,38,NV,0);c.restore();}}
}
return {frame};};
