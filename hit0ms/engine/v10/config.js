// Video #10 — sushi (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
const NORI='#1d2a1f';
function grains(w,h,n,seed=1){for(let i=0;i<n;i++){const x=((i*73+seed*31)%w)-w/2,y=((i*41+seed*17)%h)-h/2;ell(x,y,5,2.6,i*0.9);c.fillStyle=i%3?'rgba(255,255,255,.9)':'rgba(200,205,210,.8)';c.fill();}}
function riceBlob(w,h){c.beginPath();c.roundRect(-w/2,-h/2,w,h,h*0.45);shape(lin(0,-h/2,0,h/2,[[0,'#ffffff'],[1,'#d9dde2']]),4,'#8a9096');c.save();c.clip();grains(w,h,Math.round(w*h/90));c.restore();}
function salmon(w,h){c.beginPath();c.moveTo(-w/2,h*0.1);c.quadraticCurveTo(-w*0.45,-h*0.6,0,-h*0.55);c.quadraticCurveTo(w*0.5,-h*0.5,w/2,h*0.15);c.quadraticCurveTo(0,h*0.55,-w/2,h*0.1);c.closePath();
  shape(lin(0,-h/2,0,h/2,[[0,'#ff9f6b'],[.6,'#ff7a45'],[1,'#e55a2b']]),4,'#8a2e0e');c.save();c.clip();c.strokeStyle='rgba(255,236,220,.85)';c.lineWidth=5;
  for(let i=-5;i<6;i++){c.beginPath();c.moveTo(i*w/9-20,-h);c.quadraticCurveTo(i*w/9,0,i*w/9+20,h);c.stroke();}c.restore();
  c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(-w*0.3,-h*0.32);c.quadraticCurveTo(-w*0.05,-h*0.45,w*0.2,-h*0.36);c.stroke();}
function roe(x,y,r=6){ell(x,y,r,r);shape(rad(x-2,y-2,1,r,[[0,'#ffd08a'],[1,'#ff6a00']]),1.5,'#a33a00');ell(x-2,y-2,r*0.35,r*0.35);c.fillStyle='rgba(255,255,255,.85)';c.fill();}
function clump(w,h){c.beginPath();const n=6;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;c.moveTo(Math.cos(a)*w*0.28+w*0.22,Math.sin(a)*h*0.28);c.arc(Math.cos(a)*w*0.28,Math.sin(a)*h*0.28,Math.min(w,h)*0.32,0,Math.PI*2);}
  shape(lin(0,-h/2,0,h/2,[[0,'#ffffff'],[1,'#d5d9de']]),3,'#8a9096');c.save();c.clip();grains(w,h,Math.round(w*h/70)+3,w|0);c.restore();}
// 1 nigiri
const nigiri={h:150,w:240,rot:-Math.PI*1.2,burst:460,up:1.0,spin:10,
  draw(){c.save();c.translate(0,28);riceBlob(200,74);c.restore();c.save();c.translate(0,-14);salmon(236,70);c.restore();
    c.beginPath();c.roundRect(-16,-46,32,110,6);shape(lin(-16,0,16,0,[[0,'#2c3d2e'],[1,NORI]]),3,'#0d140e');},
  parts(){const o=[{dx:0,dy:-14,h:40,rest:16,draw:()=>salmon(236,70)}];for(let i=0;i<7;i++)o.push({dx:(i-3)*24,dy:28,h:26,rest:12,draw:()=>clump(46+(i%3)*8,34)});o.push({dx:0,dy:0,h:20,rest:6,draw:()=>{c.beginPath();c.roundRect(-16,-30,32,60,6);shape(NORI,3,'#0d140e');}});return o;},
  decal(x,g){c.fillStyle='rgba(255,255,255,.95)';for(let i=0;i<28;i++){ell(x-110*g+((i*53)%220)*g,H.FLOOR_Y+((i*7)%9)-3,5,2.5,i);c.fill();}ell(x+20,H.FLOOR_Y+2,60*g,6*g);c.fillStyle='rgba(255,122,69,.55)';c.fill();}};
// 2 maki trio
function makiPiece(fill){ // front-ish view: cylinder with top face
  c.beginPath();c.roundRect(-38,-22,76,62,10);shape(lin(-38,0,38,0,[[0,'#2f4232'],[.5,NORI],[1,'#111a12']]),4,'#070b07');
  ell(0,-22,38,16);shape('#f4f6f8',4,'#070b07');ell(0,-22,30,11);c.fillStyle='#fff';c.fill();c.save();ell(0,-22,30,11);c.clip();grains(60,22,14,3);c.restore();
  if(fill==='salmon'){ell(0,-22,12,6);shape('#ff7a45',2,'#8a2e0e');}
  if(fill==='cucumber'){ell(0,-22,12,6);shape('#7fd36a',2,'#2b6b1a');ell(0,-22,5,2.5);c.fillStyle='#d8f5c8';c.fill();}
  if(fill==='tuna'){ell(0,-22,12,6);shape('#e0314a',2,'#6b0a18');}
  c.strokeStyle='rgba(255,255,255,.15)';c.lineWidth=4;c.beginPath();c.moveTo(-26,-4);c.lineTo(-26,30);c.stroke();}
const MK=[['salmon',-82],['cucumber',0],['tuna',82]];
const maki={h:120,w:250,rot:-Math.PI*1.0,burst:520,up:1.15,spin:14,
  draw(){for(const [f,x] of MK){c.save();c.translate(x,10);makiPiece(f);c.restore();}},
  parts(){const o=MK.map(([f,x])=>({dx:x,dy:10,h:62,rest:30,draw:()=>makiPiece(f)}));for(let i=0;i<6;i++)o.push({dx:(i-2.5)*30,dy:-10,h:20,rest:9,draw:()=>clump(32,26)});return o;},
  decal(x,g){c.fillStyle='rgba(255,255,255,.95)';for(let i=0;i<34;i++){ell(x-120*g+((i*61)%240)*g,H.FLOOR_Y+((i*5)%9)-3,5,2.5,i);c.fill();}}};
// 3 temaki cone
function cone(){c.beginPath();c.moveTo(-70,-60);c.quadraticCurveTo(0,-82,78,-56);c.lineTo(8,92);c.closePath();shape(lin(-70,0,78,0,[[0,'#33473a'],[.55,NORI],[1,'#0e150f']]),5,'#060a06');
  c.strokeStyle='rgba(120,160,120,.18)';c.lineWidth=2;for(let i=0;i<7;i++){c.beginPath();c.moveTo(-60+i*20,-64);c.lineTo(4+i*1,88);c.stroke();}}
function coneTop(){c.beginPath();c.moveTo(-66,-58);c.quadraticCurveTo(-60,-98,-10,-96);c.quadraticCurveTo(50,-110,74,-58);c.quadraticCurveTo(0,-76,-66,-58);c.closePath();shape('#f4f6f8',4,'#8a9096');c.save();c.clip();grains(150,60,30,5);c.restore();
  c.save();c.translate(10,-92);c.rotate(-0.25);salmon(110,46);c.restore();
  for(const [x,a] of [[-30,-0.5],[-14,-0.35]]){c.save();c.translate(x,-104);c.rotate(a);c.beginPath();c.roundRect(-6,-40,12,64,4);shape(lin(-6,0,6,0,[[0,'#9be37f'],[1,'#3f9b2c']]),2.5,'#1f5c12');c.restore();}
  for(let i=0;i<9;i++)roe(30+(i%3)*12,-118+Math.floor(i/3)*11,5.5);}
const temaki={h:220,w:170,rot:-Math.PI*1.3,burst:470,up:1.05,spin:12,
  draw(){cone();coneTop();},
  parts(){const o=[{dx:0,dy:10,h:150,rest:40,draw:cone},{dx:10,dy:-92,h:46,rest:18,draw:()=>salmon(110,46)}];for(let i=0;i<5;i++)o.push({dx:(i-2)*26,dy:-80,h:22,rest:10,draw:()=>clump(36,28)});for(let i=0;i<10;i++)o.push({dx:(i-5)*10,dy:-110,h:10,rest:5,draw:()=>roe(0,0,5.5)});return o;},
  decal(x,g){for(let i=0;i<14;i++){ell(x-80*g+((i*37)%160)*g,H.FLOOR_Y-1,5,3);c.fillStyle='#ff7a1a';c.fill();}c.fillStyle='rgba(255,255,255,.95)';for(let i=0;i<20;i++){ell(x-90*g+((i*47)%180)*g,H.FLOOR_Y+((i*5)%7)-2,5,2.5,i);c.fill();}}};
// 4 dragon roll
function rollBody(n=6,L=300){const w=L/n;for(let i=0;i<n;i++){const x=-L/2+i*w;c.beginPath();c.roundRect(x+2,-26,w-4,62,8);shape(lin(0,-26,0,36,[[0,'#ffffff'],[1,'#d5d9de']]),4,'#7c838a');c.save();c.clip();grains(w,62,16,i+7);c.restore();
  c.fillStyle='#2b2b2b';for(let k=0;k<5;k++){ell(x+8+((k*13+i*7)%(w-14)),4+((k*11)%26),2.2,1.2,k);c.fill();}}}
function avocado(L=300,n=11){for(let i=0;i<n;i++){const x=-L/2+18+i*(L-30)/(n-1);c.save();c.translate(x,-28);c.rotate(-0.35);c.beginPath();c.ellipse(0,0,32,17,0,Math.PI,0);c.closePath();shape(lin(0,-13,0,2,[[0,'#3f7d2a'],[.25,'#9ccc4f'],[1,'#e2f2a2']]),3,'#1f4a12');c.restore();}}
function eel(L=300){c.strokeStyle='#5a2a10';c.lineWidth=7;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-L/2+10,-44);for(let i=0;i<12;i++)c.lineTo(-L/2+20+i*(L-30)/11,-38+(i%2?-12:8));c.stroke();c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=2;c.stroke();
  c.fillStyle='#fff7e0';for(let i=0;i<22;i++){ell(-L/2+12+((i*29)%(L-20)),-50+((i*13)%22),2.4,1.4,i);c.fill();}}
const dragon={h:140,w:320,rot:-Math.PI*0.9,burst:560,up:1.1,spin:16,
  draw(){rollBody();avocado();eel();for(let i=0;i<6;i++)roe(118+(i%3)*10,-56+Math.floor(i/3)*10,5);},
  parts(){const o=[];for(let i=0;i<6;i++)o.push({dx:-125+i*50,dy:4,h:62,rest:30,draw:()=>{c.save();c.translate(125-i*50,0);c.beginPath();c.rect(-150+i*50,-60,50,100);c.clip();rollBody();avocado();eel();c.restore();}});for(let i=0;i<8;i++)o.push({dx:(i-4)*30,dy:-30,h:16,rest:7,draw:()=>{c.save();c.rotate(-0.35);c.beginPath();c.ellipse(0,0,32,17,0,Math.PI,0);c.closePath();shape(lin(0,-13,0,2,[[0,'#3f7d2a'],[.25,'#9ccc4f'],[1,'#e2f2a2']]),3,'#1f4a12');c.restore();}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(70+Math.sin(i*2.3)*12)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(70,30,10,.75)';c.fill();
    c.fillStyle='rgba(255,255,255,.95)';for(let i=0;i<30;i++){ell(x-130*g+((i*43)%260)*g,H.FLOOR_Y+((i*5)%9)-3,5,2.5,i);c.fill();}}};
function S(o,k=1.4){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[nigiri,maki,temaki,dragon].forEach(o=>S(o));
return {tag:'CHALLENGE #10',ask:'WHICH SUSHI WOULD YOU SAVE? &darr;',askStyle:{background:'#ff6a3d',color:'#fff'},
 palette:{wallTop:'#2a1712',wallBot:'#5b3122',sky1:'#ff8a65',sky2:'#ffe0b2',night:false,floorA:'#f4ecdc',floorB:'#9b2c22'},
 objects:{nigiri,maki,temaki,dragon},
 onTable(){const y=880; // soy dish, wasabi, ginger, chopsticks
   ell(150,y-8,62,14);shape(lin(0,y-22,0,y+6,[[0,'#ffffff'],[1,'#b8bec5']]),3,'#495057');ell(150,y-12,46,8);c.fillStyle='#3a1606';c.fill();ell(136,y-14,14,2.5);c.fillStyle='rgba(255,255,255,.35)';c.fill();
   ell(250,y-10,20,12);shape(rad(244,y-16,2,22,[[0,'#b6e36a'],[1,'#6aa12a']]),3,'#2f5a10');
   for(let i=0;i<3;i++){ell(300+i*10,y-8-i*4,18,8,0.3*i);shape(lin(0,y-20,0,y,[[0,'#ffd1dc'],[1,'#f59fb3']]),2,'#a8506a');}
   c.save();c.translate(90,y-30);c.rotate(-0.12);for(const o of [0,14]){c.beginPath();c.moveTo(0,o);c.lineTo(200,o+3);c.lineTo(200,o+7);c.lineTo(0,o+8);c.closePath();shape(lin(0,0,200,0,[[0,'#3a1d0f'],[1,'#c08a52']]),2,'#2a1206');}c.restore();}};};
