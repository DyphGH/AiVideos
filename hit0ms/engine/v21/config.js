// Video #20 — heist loot 2
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1a10';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
// ---- cash bill ----
function bill(w=58,h=28){c.beginPath();c.roundRect(-w/2,-h/2,w,h,3);shape(lin(-w/2,0,w/2,0,[[0,'#7fd39b'],[.5,'#b9eccb'],[1,'#5fbf82']]),2.5,'#1f5c34');
 c.strokeStyle='rgba(31,92,52,.6)';c.lineWidth=1.5;c.strokeRect(-w/2+4,-h/2+4,w-8,h-8);ell(0,0,h*0.3,h*0.3);c.fillStyle='rgba(31,92,52,.35)';c.fill();c.fillStyle='#1f5c34';c.font=`900 ${h*0.42}px Inter`;c.textAlign='center';c.textBaseline='middle';c.fillText('$',0,1);}
// ---- shrink-wrapped cash brick ----
function band(w,h){c.fillStyle='#f4e3b5';c.fillRect(-8,-h/2,16,h);c.strokeStyle='#8a6a2a';c.lineWidth=1.5;c.strokeRect(-8,-h/2,16,h);c.fillStyle='#8a6a2a';c.font='900 8px Inter';c.textAlign='center';c.textBaseline='middle';c.save();c.rotate(-Math.PI/2);c.fillText('$10K',0,0);c.restore();}
function brick(){const cols=3,rows=4;for(let r=rows-1;r>=0;r--)for(let k=0;k<cols;k++){c.save();c.translate(-72+k*72,60-r*34);for(let i=3;i>=0;i--){c.save();c.translate(0,-i*3);bill(70,32);c.restore();}band(70,32);c.restore();}
 c.beginPath();c.roundRect(-112,-90,224,172,14);c.fillStyle='rgba(220,240,255,.12)';c.fill();c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=3;c.stroke();
 gloss(-70,-40,10,60,0.15,.35);gloss(80,30,5,40,-0.1,.25);c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;for(const [x1,y1,x2,y2] of [[-100,-70,-40,-84],[60,70,100,40],[-90,40,-60,74]]){c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}}
const brickO={h:180,w:230,rot:-Math.PI*0.7,burst:640,up:1.4,spin:8,draw:()=>{c.save();c.translate(0,8);brick();c.restore();},
 parts(){const o=[];for(let i=0;i<6;i++)o.push({dx:((i*53)%180)-90,dy:20,h:34,rest:16,draw:()=>{for(let j=3;j>=0;j--){c.save();c.translate(0,-j*3);bill(70,32);c.restore();}band(70,32);}});
   for(let i=0;i<46;i++)o.push({dx:((i*37)%180)-90,dy:-60-(i%5)*10,h:8,rest:3,g:0.2,drag:1.2,vmax:240,flut:130,draw:()=>bill(52,24)});
   for(let i=0;i<4;i++)o.push({dx:(i-1.5)*50,dy:-40,h:10,rest:4,g:0.5,drag:1,vmax:500,flut:60,draw:()=>{c.rotate(i);c.beginPath();c.moveTo(-40,-20);c.quadraticCurveTo(0,-34,40,-14);c.lineTo(30,20);c.quadraticCurveTo(-6,8,-36,22);c.closePath();c.fillStyle='rgba(220,240,255,.35)';c.fill();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;c.stroke();}});return o;},
 decal(x,g){for(let i=0;i<14;i++){c.save();c.translate(x-150*g+((i*53)%300)*g,H.FLOOR_Y-2);c.scale(1,0.35);c.rotate(i*0.7);bill(52,24);c.restore();}}};
// ---- gold watch ----
function link(){c.beginPath();c.roundRect(-30,-11,60,22,5);shape(lin(0,-11,0,11,[[0,'#fff2a8'],[.5,'#e0a400'],[1,'#8a5a00']]),3,'#4a3000');c.fillStyle='rgba(255,255,255,.5)';c.fillRect(-26,-8,52,4);}
function watch(){for(let i=1;i<=3;i++){c.save();c.translate(0,-54-i*20);c.scale(1-i*0.04,1);link();c.restore();c.save();c.translate(0,54+i*20);c.scale(1-i*0.04,1);link();c.restore();}
 c.beginPath();c.roundRect(-46,-62,92,124,22);shape(lin(-46,0,46,0,[[0,'#8a5a00'],[.3,'#ffe27a'],[.7,'#e0a400'],[1,'#7a4a00']]),4,'#4a3000');
 c.beginPath();c.arc(0,0,58,0,7);shape(lin(-58,-58,58,58,[[0,'#fff2a8'],[.5,'#e0a400'],[1,'#8a5a00']]),5,'#4a3000');
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;ell(Math.cos(a)*51,Math.sin(a)*51,3.2,3.2);c.fillStyle=i%2?'#ffffff':'#cfefff';c.fill();}
 c.beginPath();c.arc(0,0,44,0,7);shape(rad(-10,-10,4,48,[[0,'#2b6f5a'],[1,'#0b2a22']]),3,'#000');
 c.strokeStyle='#ffe27a';c.lineWidth=4;for(let i=0;i<12;i++){const a=i/12*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*34,Math.sin(a)*34);c.lineTo(Math.cos(a)*40,Math.sin(a)*40);c.stroke();}
 c.lineCap='round';c.lineWidth=6;c.beginPath();c.moveTo(0,0);c.lineTo(16,-18);c.stroke();c.lineWidth=4;c.beginPath();c.moveTo(0,0);c.lineTo(-6,-32);c.stroke();c.strokeStyle='#ff3b3b';c.lineWidth=2;c.beginPath();c.moveTo(0,6);c.lineTo(24,22);c.stroke();ell(0,0,4,4);c.fillStyle='#ffe27a';c.fill();
 c.beginPath();c.roundRect(60,-10,12,20,4);shape('#e0a400',3,'#4a3000');gloss(-18,-20,18,8,-0.6,.35);}
const gear=i=>{const r=8+(i%3)*4;c.beginPath();for(let k=0;k<16;k++){const a=k/16*Math.PI*2,rr=k%2?r:r*1.3;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();shape(i%2?'#ffd23f':'#c9ccd2',2,'#4a3000');ell(0,0,r*0.35,r*0.35);c.fillStyle='#4a3000';c.fill();};
const watchO={h:240,w:150,rot:-Math.PI*1.2,burst:520,up:1.4,spin:14,draw:()=>{c.save();c.scale(1.15,1.15);watch();c.restore();},
 parts(){const o=[{dx:0,dy:0,h:110,rest:30,draw:()=>{c.save();c.scale(1,0.95);c.beginPath();c.arc(0,0,58,0,7);shape(lin(-58,-58,58,58,[[0,'#fff2a8'],[.5,'#e0a400'],[1,'#8a5a00']]),5,'#4a3000');c.beginPath();c.arc(0,0,44,0,7);c.fillStyle='#0b2a22';c.fill();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;for(let k=0;k<6;k++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(k)*44,Math.sin(k*1.3)*44);c.stroke();}c.restore();}}];
   for(let i=0;i<6;i++)o.push({dx:(i-3)*30,dy:-40,h:22,rest:11,draw:link});for(let i=0;i<12;i++)o.push({dx:((i*29)%120)-60,dy:-20,h:20,rest:9,draw:()=>gear(i)});
   for(let i=0;i<14;i++)o.push({dx:((i*41)%140)-70,dy:-30,h:8,rest:3,draw:()=>{c.rotate(i);c.beginPath();c.moveTo(0,-9);c.lineTo(8,6);c.lineTo(-7,5);c.closePath();c.fillStyle='rgba(220,245,255,.85)';c.fill();c.strokeStyle='rgba(30,42,56,.6)';c.lineWidth=1.5;c.stroke();}});return o;},
 decal(x,g){ell(x,H.FLOOR_Y+2,120*Math.min(1,g*2),9);c.fillStyle='rgba(255,210,60,.22)';c.fill();}};
// ---- pearl necklace ----
function pearl(r){ell(0,0,r,r);c.fillStyle=rad(-r*.35,-r*.35,1,r*1.1,[[0,'#ffffff'],[.6,'#f1e9df'],[1,'#b9aea0']]);c.fill();c.strokeStyle='rgba(90,70,50,.55)';c.lineWidth=1.5;c.stroke();ell(-r*.35,-r*.35,r*.3,r*.2,-0.6);c.fillStyle='rgba(255,255,255,.95)';c.fill();}
function necklace(){c.beginPath();c.roundRect(-110,-36,220,140,18);shape(lin(0,-36,0,104,[[0,'#7a1430'],[1,'#3a0614']]),4,'#1a0008');c.beginPath();c.roundRect(-98,-26,196,120,12);c.fillStyle=rad(0,20,10,120,[[0,'#2a2a3a'],[1,'#0e0e16']]);c.fill();
 const N=27;for(let i=0;i<N;i++){const t=i/(N-1);const a=Math.PI*(1-t);const x=Math.cos(a)*78,y=-6+Math.sin(a)*72;c.save();c.translate(x,y);pearl(9);c.restore();}
 c.save();c.translate(0,76);c.beginPath();c.moveTo(0,-14);c.lineTo(14,0);c.lineTo(0,18);c.lineTo(-14,0);c.closePath();shape(lin(-14,-14,14,18,[[0,'#ff7a8a'],[.5,'#e0102f'],[1,'#7a0012']]),3,'#3a0008');gloss(-4,-4,4,2,-0.6,.8);c.restore();
 c.beginPath();c.moveTo(-110,-36);c.lineTo(-90,-110);c.lineTo(90,-110);c.lineTo(110,-36);c.closePath();shape(lin(0,-110,0,-36,[[0,'#9a1c3e'],[1,'#5a0a20']]),4,'#1a0008');c.beginPath();c.roundRect(-82,-100,164,54,8);c.fillStyle='rgba(20,20,30,.8)';c.fill();
 c.fillStyle='#ffd23f';c.beginPath();c.roundRect(-12,-44,24,14,3);c.fill();gloss(-60,-80,30,5,0,.25);}
const pearlO={h:220,w:230,rot:-Math.PI*0.8,burst:700,up:1.6,spin:12,draw:()=>{c.save();c.translate(0,6);necklace();c.restore();},
 parts(){const o=[];for(let i=0;i<40;i++)o.push({dx:((i*37)%200)-100,dy:-20,h:18,rest:9,draw:()=>pearl(9)});
   o.push({dx:0,dy:30,h:40,rest:12,draw:()=>{c.beginPath();c.roundRect(-110,-20,220,40,14);shape('#5a0a20',4,'#1a0008');}});
   o.push({dx:30,dy:-40,h:30,rest:12,draw:()=>{c.beginPath();c.moveTo(0,-14);c.lineTo(14,0);c.lineTo(0,18);c.lineTo(-14,0);c.closePath();shape('#e0102f',3,'#3a0008');}});return o;},
 decal(x,g){}};
// ---- safe ----
function safe(){c.beginPath();c.roundRect(-100,-100,200,200,16);shape(lin(-100,-100,100,100,[[0,'#7d8794'],[.5,'#4a535e'],[1,'#262c33']]),5,'#0b0e12');
 c.beginPath();c.roundRect(-82,-82,164,164,10);shape(lin(0,-82,0,82,[[0,'#5d6773'],[1,'#323941']]),3,'#0b0e12');
 for(const [x,y] of [[-70,-70],[70,-70],[-70,70],[70,70]]){ell(x,y,5,5);c.fillStyle='#aab3bf';c.fill();}
 c.save();c.translate(-10,0);c.beginPath();c.arc(0,0,40,0,7);shape(rad(-10,-10,4,42,[[0,'#e9edf2'],[1,'#7d8794']]),4,'#0b0e12');for(let i=0;i<20;i++){const a=i/20*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*30,Math.sin(a)*30);c.lineTo(Math.cos(a)*38,Math.sin(a)*38);c.strokeStyle='#222';c.lineWidth=i%5?1.5:3;c.stroke();}c.beginPath();c.arc(0,0,14,0,7);shape('#2a2f36',3,'#000');c.restore();
 c.save();c.translate(52,0);c.lineCap='round';c.strokeStyle='#c9ccd2';c.lineWidth=9;for(let i=0;i<3;i++){const a=i*Math.PI*2/3-0.3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*24,Math.sin(a)*24);c.stroke();}ell(0,0,8,8);c.fillStyle='#e9edf2';c.fill();c.restore();
 for(const y of [-60,60]){c.beginPath();c.roundRect(94,y-14,12,28,3);shape('#3a414a',3,'#0b0e12');}
 c.beginPath();c.roundRect(-104,96,40,12,3);c.fillStyle='#111';c.fill();c.beginPath();c.roundRect(64,96,40,12,3);c.fill();gloss(-60,-70,40,6,0,.2);}
function coin(){ell(0,0,12,12);c.fillStyle=rad(-4,-4,1,13,[[0,'#fff2a8'],[.6,'#ffc81a'],[1,'#a86f00']]);c.fill();c.strokeStyle='#6a4500';c.lineWidth=2;c.stroke();ell(0,0,8,8);c.strokeStyle='rgba(120,80,0,.6)';c.lineWidth=1.5;c.stroke();c.fillStyle='rgba(120,80,0,.8)';c.font='900 11px Inter';c.textAlign='center';c.textBaseline='middle';c.fillText('$',0,1);}
const safeO={h:210,w:210,rot:-Math.PI*0.55,burst:560,up:1.3,spin:7,draw:()=>{c.save();c.translate(0,-5);safe();c.restore();},
 parts(){const o=[{dx:-10,dy:40,h:150,rest:62,draw:()=>{c.save();c.scale(1,0.62);c.beginPath();c.roundRect(-100,-100,200,200,16);shape(lin(0,-100,0,100,[[0,'#4a535e'],[1,'#262c33']]),5,'#0b0e12');c.beginPath();c.roundRect(-82,-82,164,164,10);c.fillStyle='#101317';c.fill();c.restore();for(let i=0;i<9;i++){c.save();c.translate(-60+i*15,-30+(i%3)*8);coin();c.restore();}}},
   {dx:60,dy:-30,h:20,rest:10,draw:()=>{c.save();c.scale(0.9,0.12);c.beginPath();c.roundRect(-82,-82,164,164,10);shape('#5d6773',5,'#0b0e12');c.restore();}}];
   for(let i=0;i<44;i++)o.push({dx:((i*37)%160)-80,dy:-50-(i%4)*10,h:24,rest:5,draw:()=>{c.save();c.scale(1,i%3?0.35:1);coin();c.restore();}});
   for(let i=0;i<3;i++)o.push({dx:(i-1)*60,dy:-30,h:44,rest:22,draw:()=>{c.save();c.scale(0.6,0.6);for(let j=3;j>=0;j--){c.save();c.translate(0,-j*3);bill(70,32);c.restore();}c.restore();}});return o;},
 decal(x,g){c.save();c.strokeStyle='rgba(10,5,20,.85)';c.lineWidth=5;c.lineCap='round';for(let i=0;i<6;i++){const a=Math.PI*i/5;const L=150*Math.min(1,g*2.2);c.beginPath();c.moveTo(x,H.FLOOR_Y+2);c.lineTo(x+Math.cos(a)*L*0.6+((i*13)%14-7),H.FLOOR_Y+2+Math.sin(a)*L*0.08);c.lineTo(x+Math.cos(a)*L*1.4,H.FLOOR_Y+2+Math.sin(a)*L*0.2);c.stroke();}c.restore();}};
function S(o,k){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
S(brickO,1.3);S(watchO,1.2);S(pearlO,1.15);S(safeO,1.1);
return {tag:'CHALLENGE #20',ask:'WHICH ONE WOULD YOU STEAL? &darr;',askStyle:{background:'#ff2e88',color:'#fff'},
 secret:{title:'WASTED',color:'#ff3b3b',gray:true,border:'#ff3b3b'},
 palette:{wallTop:'#16123a',wallBot:'#1f7a8c',sky1:'#ff4f8b',sky2:'#ffb86b',night:false,floorA:'#141026',floorB:'#21c7b8'},
 objects:{cash:brickO,watch:watchO,pearls:pearlO,safe:safeO},
 onTable(){c.save();c.translate(140,866);for(let j=4;j>=0;j--){c.save();c.translate(0,-j*4);bill(64,28);c.restore();}c.restore();c.save();c.translate(230,868);c.scale(1.3,1.3);coin();c.restore();c.save();c.translate(262,870);c.scale(1.1,1.1);coin();c.restore();}};};
