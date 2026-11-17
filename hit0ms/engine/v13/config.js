// Video #13 — cakes (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#4a1f10';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
const SPR=['#ff4d6d','#4dabf7','#ffd43b','#69db7c','#b197fc','#ff922b'];
function sprinkles(x0,y0,w,h,n,seed=0){for(let i=0;i<n;i++){c.save();c.translate(x0+((i*53+seed*7)%w),y0+((i*31+seed)%h));c.rotate(i*1.7);c.fillStyle=SPR[i%6];c.beginPath();c.roundRect(-6,-2,12,4,2);c.fill();c.restore();}}
function drips(x0,x1,y,col,amp=24){c.beginPath();c.moveTo(x0,y-14);c.lineTo(x1,y-14);c.lineTo(x1,y);let k=0;for(let x=x1;x>=x0;x-=22){const d=((k++*37)%3)*amp/2+8;c.quadraticCurveTo(x-6,y+d+8,x-11,y);}c.lineTo(x0,y-14);c.closePath();shape(col,3,'rgba(0,0,0,.25)');}
function layer(y,w,h,col){c.beginPath();c.roundRect(-w/2,y,w,h,10);shape(lin(0,y,0,y+h,[[0,col[0]],[1,col[1]]]),4,O);}
// 1 birthday
function birthday(){ell(0,92,140,18);shape(lin(0,76,0,108,[[0,'#fff'],[1,'#c9cfd6']]),3,'#6c757d');
  layer(-10,220,96,['#ff9ec4','#e0558f']);c.fillStyle='#fff6e8';c.fillRect(-110,32,220,10);drips(-112,112,-6,'#fff6e8');
  ell(0,-14,112,22);shape('#fff6e8',4,O);sprinkles(-90,-26,180,20,22,1);sprinkles(-100,52,200,30,14,3);
  for(const x of [-60,-20,20,60]){c.beginPath();c.roundRect(x-6,-70,12,52,3);shape(lin(x-6,0,x+6,0,[[0,'#7fd3f7'],[1,'#2f7da3']]),2,'#0a2a50');c.strokeStyle='#fff';c.lineWidth=3;for(let y=-64;y<-24;y+=12){c.beginPath();c.moveTo(x-6,y+6);c.lineTo(x+6,y);c.stroke();}
    c.beginPath();c.moveTo(x,-96);c.quadraticCurveTo(x+11,-80,x,-74);c.quadraticCurveTo(x-11,-80,x,-96);shape(rad(x,-80,1,14,[[0,'#fff6a0'],[1,'#ff8a00']]),0);}gloss(-70,10,10,26,0,.3);}
function crumbP(i,cols){ell(0,0,15+(i%3)*5,11+(i%2)*4,i);shape(cols[i%cols.length],2,O);}
function creamP(i){c.beginPath();for(let k=0;k<=8;k++){const a=k/8*Math.PI*2,r=(17+(i%3)*6)*(0.8+0.3*Math.sin(k*2.3+i));c.lineTo(Math.cos(a)*r,Math.sin(a)*r*0.7);}c.closePath();shape('#fff6e8',2,'rgba(0,0,0,.25)');}
const bdO={h:200,w:240,rot:-Math.PI*1.1,burst:520,up:1.2,spin:12,draw:birthday,
  parts(){const o=[];for(let i=0;i<10;i++)o.push({dx:(i-5)*22,dy:30,h:26,rest:11,draw:()=>crumbP(i,['#ff9ec4','#e0558f','#ffd0e2'])});for(let i=0;i<8;i++)o.push({dx:(i-4)*26,dy:-10,h:20,rest:8,draw:()=>creamP(i)});
    for(const x of [-60,-20,20,60])o.push({dx:x,dy:-44,h:52,rest:6,draw:()=>{c.beginPath();c.roundRect(-6,-26,12,52,3);shape('#7fd3f7',2,'#0a2a50');}});
    o.push({dx:0,dy:92,h:20,rest:6,draw:()=>{ell(0,0,140,18);shape('#fff',3,'#6c757d');}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(80+Math.sin(i*2.7)*16)*g;c.lineTo(x+Math.cos(a)*r*1.35,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,158,196,.9)';c.fill();sprinkles(x-90*g,H.FLOOR_Y-4,180*g,8,16,5);}};
// 2 cheesecake slice
function cheese(){c.beginPath();c.moveTo(-120,40);c.lineTo(120,40);c.lineTo(120,70);c.lineTo(-120,70);c.closePath();shape(lin(0,40,0,70,[[0,'#d99a55'],[1,'#a8642a']]),4,O);
  c.beginPath();c.moveTo(-120,40);c.lineTo(-120,-30);c.lineTo(120,-60);c.lineTo(120,40);c.closePath();shape(lin(0,-60,0,40,[[0,'#fff6d6'],[1,'#ffe6a8']]),4,O);
  c.fillStyle='rgba(200,160,80,.25)';for(let i=0;i<14;i++){ell(-100+((i*47)%210),-10+((i*29)%40),3,2);c.fill();}
  c.beginPath();c.moveTo(-124,-30);c.lineTo(124,-62);c.lineTo(124,-44);for(let x=124;x>=-124;x-=24){c.quadraticCurveTo(x-6,-28+(124-x)*0.13+((x/24|0)%2?18:6),x-12,-44+(124-x)*0.13);}c.closePath();shape(lin(0,-70,0,-20,[[0,'#ff4d6d'],[1,'#b0001c']]),4,'#4a0008');
  for(const [x,y] of [[-60,-46],[0,-58],[60,-70]]){c.beginPath();c.moveTo(x,y+20);c.quadraticCurveTo(x-24,y,x-12,y-14);c.quadraticCurveTo(x,y-20,x+12,y-14);c.quadraticCurveTo(x+24,y,x,y+20);shape(rad(x-4,y-6,2,26,[[0,'#ff6b7a'],[1,'#c8102e']]),3,'#4a0008');
    c.fillStyle='#ffd43b';for(let k=0;k<5;k++){ell(x-8+(k%3)*8,y-6+(k>2?10:0),1.6,2.4);c.fill();}c.beginPath();c.moveTo(x-8,y-16);c.lineTo(x,y-26);c.lineTo(x+8,y-16);c.lineWidth=4;c.strokeStyle='#2b8a3e';c.stroke();}
  gloss(-80,-36,18,4,-0.1,.45);}
const ccO={h:160,w:260,rot:-Math.PI*1.2,burst:480,up:1.0,spin:10,draw:cheese,
  parts(){const o=[];for(let i=0;i<9;i++)o.push({dx:(i-4)*26,dy:0,h:30,rest:13,draw:()=>crumbP(i,['#fff6d6','#ffe6a8','#d99a55'])});for(let i=0;i<3;i++)o.push({dx:(i-1)*60,dy:-50,h:40,rest:18,draw:()=>{c.beginPath();c.moveTo(0,20);c.quadraticCurveTo(-24,0,-12,-14);c.quadraticCurveTo(0,-20,12,-14);c.quadraticCurveTo(24,0,0,20);shape('#e8203f',3,'#4a0008');}});
    for(let i=0;i<8;i++)o.push({dx:(i-4)*24,dy:-40,h:14,rest:6,draw:()=>{ell(0,0,10,6,i);shape('#d6102e',2,'#4a0008');}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(75+Math.sin(i*2.1)*16)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(214,16,46,.75)';c.fill();}};
// 3 cupcake
function cupcake(){c.beginPath();c.moveTo(-70,10);c.lineTo(70,10);c.lineTo(52,110);c.lineTo(-52,110);c.closePath();shape(lin(-70,0,70,0,[[0,'#4dabf7'],[.5,'#a5d8ff'],[1,'#1c7ed6']]),4,'#0a2a50');
  c.strokeStyle='rgba(10,42,80,.35)';c.lineWidth=3;for(let i=-3;i<=3;i++){c.beginPath();c.moveTo(i*20,12);c.lineTo(i*15,108);c.stroke();}
  for(const [y,w,h] of [[-6,80,34],[-40,64,30],[-70,44,26],[-92,24,20]]){c.beginPath();c.ellipse(0,y,w,h,0,0,7);shape(rad(-w*.3,y-h*.3,3,w,[[0,'#fff0f6'],[1,'#f783ac']]),4,'#a61e4d');}
  sprinkles(-60,-80,120,80,18,4);ell(0,-120,18,18);shape(rad(-6,-126,2,20,[[0,'#ff8a8a'],[1,'#c8102e']]),3,'#4a0008');gloss(-6,-126,5,3);c.strokeStyle='#2b6b1a';c.lineWidth=4;c.beginPath();c.moveTo(2,-136);c.quadraticCurveTo(10,-160,24,-164);c.stroke();gloss(-36,-30,14,7);}
const cupO={h:270,w:150,rot:-Math.PI*1.3,burst:500,up:1.5,spin:14,draw:cupcake,
  parts(){const o=[{dx:0,dy:60,h:100,rest:44,draw:()=>{c.save();c.translate(0,-60);c.beginPath();c.moveTo(-70,10);c.lineTo(70,10);c.lineTo(52,110);c.lineTo(-52,110);c.closePath();shape('#74c0fc',4,'#0a2a50');c.restore();}},
    {dx:0,dy:-120,h:36,rest:18,draw:()=>{ell(0,0,18,18);shape('#e8203f',3,'#4a0008');}}];for(let i=0;i<10;i++)o.push({dx:(i-5)*20,dy:-50,h:26,rest:11,draw:()=>{c.beginPath();c.ellipse(0,0,16+(i%3)*4,11,i,0,7);shape('#f8a5c2',3,'#a61e4d');}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(70+Math.sin(i*2.9)*14)*g;c.lineTo(x+Math.cos(a)*r*1.35,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(247,131,172,.85)';c.fill();sprinkles(x-80*g,H.FLOOR_Y-4,160*g,8,14,2);}};
// 4 wedding cake
function tier(y,w,h){c.beginPath();c.roundRect(-w/2,y,w,h,8);shape(lin(-w/2,0,w/2,0,[[0,'#f1ece4'],[.4,'#ffffff'],[1,'#d9d2c6']]),4,'#7a6a55');c.fillStyle='#fff';for(let x=-w/2+10;x<w/2;x+=16){ell(x,y+h-6,5,5);c.fill();c.strokeStyle='rgba(122,106,85,.4)';c.lineWidth=1.5;c.stroke();}
  c.strokeStyle='rgba(212,175,55,.9)';c.lineWidth=4;c.beginPath();c.moveTo(-w/2,y+10);c.lineTo(w/2,y+10);c.stroke();}
function rose(x,y,r=13){ell(x,y,r,r);shape(rad(x-3,y-3,1,r,[[0,'#ffc9de'],[1,'#e64980']]),2,'#87203f');c.strokeStyle='rgba(135,32,63,.6)';c.lineWidth=2;c.beginPath();c.arc(x,y,r*0.55,0.5,5.2);c.stroke();}
function wedding(){ell(0,124,150,16);shape('#e9ecef',3,'#6c757d');tier(40,260,80);tier(-30,190,70);tier(-90,120,60);
  for(const [x,y] of [[-110,40],[96,40],[-80,-30],[70,-30],[-46,-90],[40,-90]])rose(x,y);
  c.strokeStyle='#d4af37';c.lineWidth=4;c.beginPath();c.moveTo(-8,-90);c.lineTo(-8,-130);c.moveTo(8,-90);c.lineTo(8,-130);c.stroke();ell(-12,-140,14,14);ell(12,-140,14,14);c.lineWidth=5;c.stroke();gloss(-90,70,10,24,0,.3);}
const wdO={h:290,w:270,rot:-Math.PI*0.95,burst:600,up:1.3,spin:12,draw:wedding,
  parts(){const o=[[40,260,80],[-30,190,70],[-90,120,60]].map(([y,w,h],i)=>({dx:0,dy:y+h/2,h:h,rest:h/2,draw:()=>{c.save();c.translate(0,-(y+h/2));tier(y,w,h);c.restore();}}));
    for(let i=0;i<6;i++)o.push({dx:(i-3)*40,dy:-40,h:26,rest:13,draw:()=>rose(0,0)});for(let i=0;i<8;i++)o.push({dx:(i-4)*30,dy:0,h:22,rest:9,draw:()=>creamP(i)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(95+Math.sin(i*2.3)*16)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,250,240,.95)';c.fill();c.strokeStyle='rgba(122,106,85,.4)';c.lineWidth=2;c.stroke();}};
function S(o,k=1.45){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[bdO,ccO,cupO,wdO].forEach(o=>S(o));
return {tag:'CHALLENGE #13',ask:'WHICH CAKE WOULD YOU SAVE? &darr;',askStyle:{background:'#e64980',color:'#fff'},
 palette:{wallTop:'#3a1f3a',wallBot:'#7a3f6a',sky1:'#ffb3c6',sky2:'#fff0d6',night:false,floorA:'#f4ecdc',floorB:'#c2255c'},
 objects:{birthday:bdO,cheesecake:ccO,cupcake:cupO,wedding:wdO},
 onTable(){const y=880;ell(150,y-6,60,10);shape('#e9ecef',3,'#6c757d');c.save();c.translate(150,y-14);c.scale(0.45,0.45);cupcake();c.restore();
   c.save();c.translate(260,y);c.strokeStyle='#adb5bd';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(-30,-4);c.lineTo(30,-14);c.stroke();c.beginPath();c.moveTo(-30,-20);c.lineTo(30,-24);c.stroke();c.restore();}};};
