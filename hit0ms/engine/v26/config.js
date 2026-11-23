// Video #25 — breakfast crimes: four cursed breakfasts (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function plate(r=110){ell(0,0,r,r*.28);shape(lin(0,-30,0,30,[[0,'#ffffff'],[1,'#c9ced8']]),4,'#3a3f48');ell(0,-4,r*.72,r*.18);c.fillStyle='rgba(0,0,0,.06)';c.fill();}
function blob(col,i,r=12){ell(0,0,r+(i%3)*4,r*.8+(i%2)*3,i);shape(col,2,'#2a1a10');}
// 1 cereal with ORANGE JUICE
function bowl(){c.beginPath();c.moveTo(-110,-20);c.quadraticCurveTo(-100,90,0,92);c.quadraticCurveTo(100,90,110,-20);c.closePath();shape(lin(-110,0,110,0,[[0,'#4dabf7'],[.5,'#a5d8ff'],[1,'#1971c2']]),5,'#0b2a50');
  ell(0,-20,110,26);shape(rad(-20,-24,4,110,[[0,'#ffd27a'],[1,'#ff9f1a']]),4,'#7a4a00');
  for(let i=0;i<16;i++){c.save();c.translate(-80+((i*37)%160),-26+((i*13)%14));c.rotate(i);ell(0,0,11,9);shape(['#f4c06a','#e89a3a','#ffd27a'][i%3],2,'#7a4a10');ell(0,0,3,3);c.fillStyle='#7a4a10';c.fill();c.restore();}
  c.save();c.translate(-40,-60);c.rotate(-.5);c.beginPath();c.roundRect(-10,-70,20,110,8);shape('#e9ecef',3,'#495057');ell(0,40,18,10);shape('#e9ecef',3,'#495057');c.restore();
  c.beginPath();c.moveTo(70,-90);c.lineTo(120,-90);c.lineTo(114,-24);c.lineTo(76,-24);c.closePath();shape(lin(0,-90,0,-24,[[0,'#ffd27a'],[1,'#ff8c00']]),4,'#7a4a00');c.fillStyle='#fff';c.font='900 14px Inter';c.fillText('OJ',85,-50);gloss(-60,40,12,30,0,.35);}
const bowlO={h:190,w:230,rot:-Math.PI*0.9,burst:600,up:1.3,spin:14,draw:bowl,
  parts(){const o=[];for(let i=0;i<8;i++)o.push({dx:(i-4)*26,dy:30,h:30,rest:12,draw:()=>{c.save();c.rotate(i);c.beginPath();c.moveTo(-20,-10);c.lineTo(18,-14);c.lineTo(22,10);c.lineTo(-16,14);c.closePath();shape('#74c0fc',3,'#0b2a50');c.restore();}});
    for(let i=0;i<20;i++)o.push({dx:((i*41)%200)-100,dy:-20,h:18,rest:8,draw:()=>{ell(0,0,11,9);shape(['#f4c06a','#e89a3a','#ffd27a'][i%3],2,'#7a4a10');}});
    for(let i=0;i<14;i++)o.push({dx:((i*29)%200)-100,dy:-30,h:14,rest:5,drag:.5,draw:()=>blob('#ffa41c',i,9)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=(95+Math.sin(i*2.7)*16)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(255,150,20,.85)';c.fill();}};
// 2 pancakes with KETCHUP
function pancakes(){plate(120);for(let i=0;i<5;i++){const y=-14-i*24;ell(0,y,92,24);shape(lin(0,y-24,0,y+24,[[0,'#f2c27a'],[.5,'#d9934a'],[1,'#a8642a']]),4,'#5a3010');}
  c.beginPath();c.moveTo(-80,-118);c.quadraticCurveTo(-60,-150,0,-146);c.quadraticCurveTo(70,-150,84,-118);c.quadraticCurveTo(70,-96,64,-70);c.quadraticCurveTo(52,-96,30,-104);c.quadraticCurveTo(10,-80,-8,-104);c.quadraticCurveTo(-40,-90,-50,-70);c.quadraticCurveTo(-58,-100,-80,-118);c.closePath();shape(lin(0,-150,0,-70,[[0,'#ff4d3d'],[1,'#b0100a']]),4,'#4a0000');
  gloss(-20,-138,26,6,0,.55);c.beginPath();c.roundRect(-12,-170,28,18,4);shape('#fff7d6',3,'#a08a40');}
const panO={h:220,w:240,rot:-Math.PI*0.7,burst:520,up:1.3,spin:12,draw:pancakes,
  parts(){const o=[];for(let i=0;i<5;i++)o.push({dx:(i-2)*24,dy:-14-i*24+60,h:48,rest:20,draw:()=>{ell(0,0,92,24);shape('#d9934a',4,'#5a3010');}});
    for(let i=0;i<6;i++)o.push({dx:(i-3)*36,dy:60,h:20,rest:8,draw:()=>{c.save();c.rotate(i);c.beginPath();c.moveTo(-20,-8);c.lineTo(20,-10);c.lineTo(18,8);c.lineTo(-16,10);c.closePath();shape('#f1f3f5',3,'#3a3f48');c.restore();}});
    for(let i=0;i<14;i++)o.push({dx:((i*31)%160)-80,dy:-60,h:14,rest:5,drag:.5,draw:()=>blob('#d0100a',i,9)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=(70+Math.sin(i*3.1)*20)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(200,16,10,.85)';c.fill();}};
// 3 waffle with MAYO + sprinkles
function waffle(){plate(118);c.save();c.rotate(-.08);c.beginPath();c.roundRect(-90,-120,180,110,18);shape(lin(0,-120,0,-10,[[0,'#ffd27a'],[1,'#c88a3a']]),5,'#5a3010');
  c.fillStyle='rgba(120,70,20,.35)';for(let x=-76;x<80;x+=26)for(let y=-108;y<-20;y+=26){c.beginPath();c.roundRect(x,y,18,18,3);c.fill();}
  c.beginPath();c.moveTo(-70,-118);for(let x=-70;x<=70;x+=14)c.quadraticCurveTo(x+7,-140,x+14,-118);c.lineTo(60,-90);c.quadraticCurveTo(0,-80,-60,-92);c.closePath();shape('#fffbe6',3,'#b8a870');
  for(let i=0;i<22;i++){c.save();c.translate(-60+((i*41)%120),-128+((i*17)%34));c.rotate(i);c.fillStyle=['#ff4d6d','#4dabf7','#51cf66','#ffd43b'][i%4];c.fillRect(-5,-1.5,10,3);c.restore();}c.restore();
  c.save();c.translate(98,-70);c.rotate(.3);c.beginPath();c.roundRect(-16,-60,32,80,10);shape('#fffbe6',3,'#b8a870');c.fillStyle='#2e86d0';c.fillRect(-16,-30,32,20);c.restore();}
const wafO={h:200,w:240,rot:-Math.PI*1.1,burst:560,up:1.3,spin:14,draw:waffle,
  parts(){const o=[];for(let i=0;i<4;i++)o.push({dx:(i%2)*90-45,dy:-60+(i>>1)*50,h:52,rest:22,draw:()=>{c.beginPath();c.roundRect(-44,-26,88,52,10);shape('#e8b060',4,'#5a3010');}});
    for(let i=0;i<10;i++)o.push({dx:((i*37)%160)-80,dy:-90,h:14,rest:5,drag:.5,draw:()=>blob('#fffbe6',i,10)});for(let i=0;i<20;i++)o.push({dx:((i*29)%160)-80,dy:-100,h:6,rest:2,draw:()=>{c.fillStyle=['#ff4d6d','#4dabf7','#51cf66','#ffd43b'][i%4];c.fillRect(-5,-1.5,10,3);}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=20;i++){const a=i/20*Math.PI*2,r=(60+Math.sin(i*2.1)*14)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(255,251,230,.95)';c.fill();
    for(let i=0;i<30;i++){c.fillStyle=['#ff4d6d','#4dabf7','#51cf66','#ffd43b'][i%4];c.fillRect(x-100*g+((i*37)%200)*g,H.FLOOR_Y-4+(i%6),8,3);}}};
// 4 toast with SARDINES + jam
function toast(){plate(110);c.save();c.rotate(.05);c.beginPath();c.moveTo(-80,-20);c.lineTo(-84,-110);c.quadraticCurveTo(-84,-150,-40,-150);c.quadraticCurveTo(-10,-170,20,-150);c.quadraticCurveTo(84,-150,84,-110);c.lineTo(80,-20);c.closePath();shape(lin(0,-160,0,-20,[[0,'#c88a3a'],[.15,'#f4d6a0'],[1,'#e8bc78']]),5,'#5a3010');
  c.beginPath();c.moveTo(-64,-34);c.lineTo(-66,-110);c.quadraticCurveTo(-66,-134,-36,-134);c.quadraticCurveTo(-10,-150,16,-134);c.quadraticCurveTo(66,-134,66,-110);c.lineTo(62,-34);c.closePath();shape('#c8102e',3,'#4a0000');gloss(-30,-110,20,8,-.3,.45);
  for(let i=0;i<3;i++){c.save();c.translate(-30+i*30,-70-i*12);c.rotate(-.5+i*.3);c.beginPath();c.moveTo(-40,0);c.quadraticCurveTo(0,-16,34,0);c.lineTo(48,-12);c.lineTo(46,12);c.lineTo(34,2);c.quadraticCurveTo(0,16,-40,0);c.closePath();shape(lin(0,-14,0,14,[[0,'#cfd8e3'],[.5,'#8fa3b8'],[1,'#5a6d82']]),3,'#1a2a3a');ell(-30,-2,3,3);c.fillStyle='#111';c.fill();c.restore();}c.restore();}
const toastO={h:210,w:220,rot:-Math.PI*1.25,burst:540,up:1.3,spin:16,draw:toast,
  parts(){const o=[];for(let i=0;i<3;i++)o.push({dx:-30+i*30,dy:0,h:24,rest:10,draw:()=>{c.beginPath();c.moveTo(-40,0);c.quadraticCurveTo(0,-16,34,0);c.lineTo(48,-12);c.lineTo(46,12);c.lineTo(34,2);c.quadraticCurveTo(0,16,-40,0);c.closePath();shape('#8fa3b8',3,'#1a2a3a');}});
    for(let i=0;i<6;i++)o.push({dx:(i-3)*30,dy:-40,h:40,rest:16,draw:()=>{c.save();c.rotate(i);c.beginPath();c.roundRect(-30,-20,60,40,8);shape('#e8bc78',3,'#5a3010');c.restore();}});
    for(let i=0;i<12;i++)o.push({dx:((i*31)%160)-80,dy:-60,h:14,rest:5,drag:.5,draw:()=>blob('#c8102e',i,9)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=22;i++){const a=i/22*Math.PI*2,r=(64+Math.sin(i*2.5)*14)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(200,16,46,.85)';c.fill();
    c.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<14;i++){c.beginPath();c.arc(x-100*g+((i*41)%200)*g,H.FLOOR_Y-6+(i%5)*2,3,0,7);c.fill();}}};
function S(o,k=1.15){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[bowlO,panO,wafO,toastO].forEach(o=>S(o));
return {tag:'CHALLENGE #25',ask:'WHICH BREAKFAST IS THE WORST CRIME? &darr;',askStyle:{background:'#ff8c00',color:'#111'},
 palette:{wallTop:'#5a3a1a',wallBot:'#c88a3a',sky1:'#ffb36b',sky2:'#ffe8c2',night:false,floorA:'#fff7e6',floorB:'#e8590c'},
 objects:{cereal:bowlO,pancakes:panO,waffle:wafO,toast:toastO},
 onTable(){const y=880;// coffee mug + toaster
   c.beginPath();c.roundRect(90,y-110,150,110,18);shape(lin(90,0,240,0,[[0,'#dfe5ee'],[1,'#8a93a3']]),4,'#2a2f36');c.fillStyle='#2a2f36';c.fillRect(110,y-116,40,10);c.fillRect(170,y-116,40,10);
   c.beginPath();c.roundRect(225,y-70,18,30,4);shape('#e03131',3,'#4a0000');
   c.beginPath();c.moveTo(290,y-80);c.lineTo(350,y-80);c.lineTo(346,y);c.lineTo(294,y);c.closePath();shape('#fff',4,'#3a3f48');c.beginPath();c.arc(356,y-44,18,-1.3,1.3);c.lineWidth=8;c.strokeStyle='#3a3f48';c.stroke();ell(320,y-80,30,7);c.fillStyle='#5a3214';c.fill();
   c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=4;for(const x of [305,325]){c.beginPath();c.moveTo(x,y-90);c.bezierCurveTo(x-8,y-104,x+8,y-114,x,y-128);c.stroke();}}};};
