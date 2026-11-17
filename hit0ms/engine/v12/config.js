// Video #12 — Christmas (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
// 1 ornament
function ornament(){c.beginPath();c.roundRect(-22,-112,44,26,5);shape(lin(-22,0,22,0,[[0,'#fff3a0'],[.5,'#d4a017'],[1,'#8a6400']]),4,'#4a3400');c.strokeStyle='#8a6400';c.lineWidth=5;c.beginPath();c.arc(0,-122,12,Math.PI,0);c.stroke();
  ell(0,0,95,95);shape(rad(-35,-35,8,110,[[0,'#ff6b7a'],[.5,'#d6102e'],[1,'#6a0012']]),5,'#3a000a');
  c.save();ell(0,0,95,95);c.clip();c.strokeStyle='#ffd43b';c.lineWidth=8;for(const y of [-30,30]){c.beginPath();c.moveTo(-100,y);for(let x=-100;x<=100;x+=20)c.lineTo(x,y+((x/20)%2?-10:10));c.stroke();}
  c.fillStyle='#fff';for(let i=0;i<9;i++){ell(-80+i*20,0,4,4);c.fill();}c.restore();gloss(-38,-42,24,13);gloss(48,40,8,4,0.6,.35);}
function shard(i){c.beginPath();c.moveTo(0,-14-(i%3)*4);c.lineTo(12+(i%2)*6,6);c.lineTo(-10,10+(i%4)*2);c.closePath();shape(lin(-10,-10,10,10,[[0,'#ff6b7a'],[1,'#a8001c']]),2,'#3a000a');gloss(-2,-4,3,1.5,0,.7);}
const ornO={h:230,w:190,rot:-Math.PI*1.2,burst:640,up:1.2,spin:22,draw:ornament,
  parts(){const o=[{dx:0,dy:-100,h:30,rest:13,draw:()=>{c.beginPath();c.roundRect(-22,-13,44,26,5);shape('#d4a017',4,'#4a3400');}}];for(let i=0;i<20;i++)o.push({dx:((i*37)%160)-80,dy:((i*53)%160)-80,h:20,rest:6,draw:()=>shard(i)});return o;},
  decal(x,g){c.fillStyle='rgba(214,16,46,.8)';for(let i=0;i<22;i++){c.save();c.translate(x-120*g+((i*61)%240)*g,H.FLOOR_Y+((i*7)%8)-3);c.rotate(i);c.beginPath();c.moveTo(0,-4);c.lineTo(6,3);c.lineTo(-5,3);c.closePath();c.fill();c.restore();}}};
// 2 gingerbread
const GB=[['head',[0,-82]],['body',[0,20]],['armL',[-70,-10]],['armR',[70,-10]],['legL',[-38,96]],['legR',[38,96]]];
function gbPiece(n){c.save();const G=rad(-20,-20,5,110,[[0,'#e09a55'],[1,'#a85c1e']]);c.beginPath();
  if(n==='head')ell(0,0,52,50);if(n==='body')c.roundRect(-52,-56,104,112,40);if(n==='armL')c.roundRect(-46,-22,92,44,22);if(n==='armR')c.roundRect(-46,-22,92,44,22);if(n==='legL'||n==='legR')c.roundRect(-26,-44,52,88,24);
  shape(G,5,'#4a2408');c.strokeStyle='#fff';c.lineWidth=6;c.lineCap='round';
  if(n==='head'){c.beginPath();c.arc(0,8,22,0.2,Math.PI-0.2);c.stroke();ell(-18,-12,7,8);c.fillStyle='#2a1406';c.fill();ell(18,-12,7,8);c.fill();ell(-30,10,8,5);c.fillStyle='rgba(255,90,90,.6)';c.fill();ell(30,10,8,5);c.fill();}
  if(n==='body'){for(const y of [-24,4,32]){ell(0,y,9,9);c.fillStyle=['#ff4d6d','#51cf66','#4dabf7'][(y+24)/28|0];c.fill();c.strokeStyle='#4a2408';c.lineWidth=2;c.stroke();}}
  if(n.startsWith('arm')){c.beginPath();for(let x=-30;x<=30;x+=15){c.moveTo(x-5,-10);c.quadraticCurveTo(x+3,0,x-5,10);}c.stroke();}
  if(n.startsWith('leg')){c.beginPath();for(let y=10;y<=30;y+=10){c.moveTo(-14,y);c.quadraticCurveTo(0,y+6,14,y);}c.stroke();}
  c.restore();}
function gingerman(){for(const [n,[x,y]] of [GB[2],GB[3],GB[4],GB[5],GB[1],GB[0]]){c.save();c.translate(x,y);gbPiece(n);c.restore();}}
function crumb(i){ell(0,0,5+(i%3)*2,4+(i%2)*2,i);shape('#c47a35',2,'#4a2408');}
const gbO={h:280,w:200,rot:-Math.PI*1.3,burst:520,up:1.4,spin:14,draw:gingerman,
  parts(){const o=GB.map(([n,[x,y]])=>({dx:x,dy:y,h:n==='body'?112:n==='head'?100:48,rest:n==='body'?50:n==='head'?50:22,draw:()=>gbPiece(n)}));for(let i=0;i<14;i++)o.push({dx:(i-7)*12,dy:0,h:10,rest:5,draw:()=>crumb(i)});return o;},
  decal(x,g){c.fillStyle='rgba(196,122,53,.9)';for(let i=0;i<26;i++){ell(x-110*g+((i*47)%220)*g,H.FLOOR_Y+((i*5)%8)-3,4,2.5,i);c.fill();}}};
// 3 cocoa mug
function mug(){c.beginPath();c.moveTo(-70,-70);c.lineTo(70,-70);c.lineTo(62,80);c.quadraticCurveTo(0,96,-62,80);c.closePath();shape(lin(-70,0,70,0,[[0,'#2f6bff'],[.45,'#6fa0ff'],[1,'#1a3fb0']]),5,'#0a1a50');
  c.strokeStyle='#0a1a50';c.lineWidth=5;c.beginPath();c.arc(78,4,36,-1.2,1.2);c.lineWidth=20;c.strokeStyle='#2f6bff';c.stroke();c.lineWidth=5;c.strokeStyle='#0a1a50';c.beginPath();c.arc(78,4,46,-1.1,1.1);c.stroke();c.beginPath();c.arc(78,4,26,-1.2,1.2);c.stroke();
  c.fillStyle='#fff';for(let i=0;i<5;i++){c.save();c.translate(-40+i*20,10+(i%2)*26);c.rotate(.3);c.fillRect(-6,-2,12,4);c.fillRect(-2,-6,4,12);c.restore();}
  ell(0,-70,70,14);shape(rad(-10,-74,2,70,[[0,'#8a5230'],[1,'#4a2410']]),4,'#0a1a50');
  for(const [x,y] of [[-26,-82],[8,-88],[34,-80],[-4,-76]]){c.beginPath();c.roundRect(x-13,y-10,26,20,7);shape(lin(0,y-10,0,y+10,[[0,'#ffffff'],[1,'#ffd6e6']]),3,'#a8507a');}
  c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=6;c.lineCap='round';for(const x of [-20,10,40]){c.beginPath();c.moveTo(x,-110);c.bezierCurveTo(x-14,-130,x+14,-145,x,-165);c.stroke();}gloss(-46,-20,8,30,0,.35);}
function chip(i){c.beginPath();c.moveTo(-16,-10);c.lineTo(14,-14);c.lineTo(18+(i%3)*4,10);c.lineTo(-12,14);c.closePath();shape(lin(-16,0,18,0,[[0,'#6fa0ff'],[1,'#1a3fb0']]),3,'#0a1a50');}
function drop(i){ell(0,0,8+(i%3)*3,7);shape('#6b3415',2,'#3a1606');}
const mugO={h:200,w:200,rot:-Math.PI*1.0,burst:560,up:1.2,spin:14,draw:mug,
  parts(){const o=[];for(let i=0;i<9;i++)o.push({dx:(i-4)*20,dy:(i%3)*30-20,h:28,rest:12,draw:()=>chip(i)});for(let i=0;i<14;i++)o.push({dx:(i-7)*14,dy:-60,h:16,rest:7,draw:()=>drop(i)});
    for(let i=0;i<4;i++)o.push({dx:(i-2)*30,dy:-80,h:20,rest:10,draw:()=>{c.beginPath();c.roundRect(-13,-10,26,20,7);shape('#fff',3,'#a8507a');}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(85+Math.sin(i*2.7)*16)*g;c.lineTo(x+Math.cos(a)*r*1.35,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(107,52,21,.88)';c.fill();}};
// 4 snow globe
function globe(){c.beginPath();c.moveTo(-90,60);c.lineTo(90,60);c.lineTo(76,110);c.lineTo(-76,110);c.closePath();shape(lin(0,60,0,110,[[0,'#a0522d'],[1,'#5a2a10']]),5,'#2a1206');c.fillStyle='#ffd43b';c.fillRect(-60,80,120,10);
  ell(0,-30,105,105);shape(rad(-30,-60,10,120,[[0,'rgba(220,245,255,.95)'],[.7,'rgba(130,190,240,.85)'],[1,'rgba(60,110,190,.9)']]),5,'#1a3f70');
  c.save();ell(0,-30,105,105);c.clip();ell(0,60,110,40);c.fillStyle='#fff';c.fill();
  c.beginPath();c.moveTo(0,-90);c.lineTo(-50,10);c.lineTo(50,10);c.closePath();shape(lin(0,-90,0,10,[[0,'#3fbf5f'],[1,'#1f7a3a']]),4,'#0d3a1a');c.beginPath();c.moveTo(0,-110);c.lineTo(-38,-40);c.lineTo(38,-40);c.closePath();shape('#3fbf5f',4,'#0d3a1a');
  ell(0,-112,9,9);c.fillStyle='#ffd43b';c.fill();for(const [x,y,col] of [[-20,-20,'#ff4d6d'],[18,-36,'#4dabf7'],[10,0,'#ffd43b'],[-14,-60,'#ff922b']]){ell(x,y,6,6);c.fillStyle=col;c.fill();}
  c.fillStyle='#fff';for(let i=0;i<30;i++){ell(-90+((i*53)%180),-120+((i*37)%170),3,3);c.fill();}c.restore();gloss(-50,-80,30,14,-0.6,.7);gloss(60,0,8,20,0.3,.3);}
function gshard(i){c.beginPath();c.moveTo(0,-16);c.lineTo(14+(i%3)*4,8);c.lineTo(-12,12);c.closePath();shape('rgba(180,220,255,.8)',2,'#1a3f70');gloss(-2,-4,3,1.5,0,.8);}
const globeO={h:250,w:220,rot:-Math.PI*1.15,burst:600,up:1.2,spin:16,draw:globe,
  parts(){const o=[{dx:0,dy:85,h:50,rest:25,draw:()=>{c.save();c.translate(0,-85);c.beginPath();c.moveTo(-90,60);c.lineTo(90,60);c.lineTo(76,110);c.lineTo(-76,110);c.closePath();shape('#a0522d',5,'#2a1206');c.restore();}},
    {dx:0,dy:-50,h:120,rest:50,draw:()=>{c.save();c.translate(0,50);c.beginPath();c.moveTo(0,-110);c.lineTo(-50,10);c.lineTo(50,10);c.closePath();shape('#3fbf5f',4,'#0d3a1a');c.restore();}}];
    for(let i=0;i<16;i++)o.push({dx:((i*43)%200)-100,dy:((i*59)%180)-120,h:22,rest:7,draw:()=>gshard(i)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(90+Math.sin(i*2.3)*14)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(140,200,255,.55)';c.fill();
    c.fillStyle='#fff';for(let i=0;i<24;i++){ell(x-120*g+((i*41)%240)*g,H.FLOOR_Y+((i*5)%8)-3,3,2);c.fill();}}};
function S(o,k=1.25){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[ornO,gbO,mugO,globeO].forEach(o=>S(o));
return {tag:'CHALLENGE #12',ask:'SAVE CHRISTMAS! WHICH ONE FIRST? &darr;',askStyle:{background:'#d6102e',color:'#fff'},
 palette:{wallTop:'#0f3a2a',wallBot:'#1f6b4a',sky1:'#1b2a5a',sky2:'#6a8ad0',night:true,floorA:'#f4ecdc',floorB:'#b3122e'},
 objects:{ornament:ornO,gingerbread:gbO,cocoa:mugO,globe:globeO},
 onTable(){const y=880;// mini tree + candy cane
   c.beginPath();c.moveTo(150,y-150);c.lineTo(100,y-10);c.lineTo(200,y-10);c.closePath();shape(lin(0,y-150,0,y,[[0,'#3fbf5f'],[1,'#1f7a3a']]),4,'#0d3a1a');c.fillStyle='#8a4a1c';c.fillRect(142,y-12,16,12);
   for(const [x,yy,col] of [[140,y-90,'#ff4d6d'],[165,y-60,'#ffd43b'],[130,y-40,'#4dabf7'],[170,y-30,'#ff922b']]){ell(x,yy,6,6);c.fillStyle=col;c.fill();}ell(150,y-154,9,9);c.fillStyle='#ffd43b';c.fill();
   c.save();c.translate(260,y);c.lineCap='round';c.lineWidth=14;c.strokeStyle='#fff';c.beginPath();c.moveTo(0,0);c.lineTo(0,-70);c.arc(16,-70,16,Math.PI,0);c.stroke();c.setLineDash([10,10]);c.strokeStyle='#d6102e';c.stroke();c.restore();}};};
