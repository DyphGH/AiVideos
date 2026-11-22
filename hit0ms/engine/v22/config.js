// Video #21 — pizza crimes 2
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#3a1c0c';
function base(){
  // sauce layer peeking under cheese
  c.beginPath();c.moveTo(-100,-58);c.quadraticCurveTo(0,-84,100,-58);c.lineTo(0,78);c.closePath();shape(lin(0,-60,0,78,[[0,'#d9481f'],[1,'#a82a12']]),5,'#5a1404');
  // melted cheese with wavy edge + drip at the tip
  c.beginPath();c.moveTo(-90,-52);c.quadraticCurveTo(0,-76,90,-52);for(let i=0;i<=8;i++){const t=i/8;const x=90-t*90,y=-52+t*122;c.lineTo(x+Math.sin(i*1.7)*5,y);}c.lineTo(4,92);c.quadraticCurveTo(-4,104,-8,84);
  for(let i=8;i>=0;i--){const t=i/8;const x=-90+t*90,y=-52+t*122;c.lineTo(x+Math.sin(i*2.3)*5,y);}c.closePath();
  shape(lin(0,-60,0,90,[[0,'#ffe27a'],[.6,'#ffc93c'],[1,'#f2a51a']]),4,'#a86a00');
  // cheese bubbles / browned spots + shine
  for(const [x,y,r] of [[-52,-36,9],[44,-38,7],[10,-18,6],[-20,12,7],[20,40,5],[-30,-50,5]]){ell(x,y,r,r*0.7);c.fillStyle='rgba(214,140,30,.55)';c.fill();}
  c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(-62,-44);c.quadraticCurveTo(-34,-14,-44,10);c.stroke();
  // oregano flecks
  c.fillStyle='#3f7a2a';for(let i=0;i<16;i++){const x=-60+((i*37)%120),y=-44+((i*53)%100);if(Math.abs(x)<(78-(y+52)*0.62)){ell(x,y,2.4,1.4,i);c.fill();}}
  // crust with bubbles and char
  c.beginPath();c.moveTo(-106,-60);c.quadraticCurveTo(0,-92,106,-60);c.quadraticCurveTo(110,-50,99,-44);c.quadraticCurveTo(0,-72,-99,-44);c.quadraticCurveTo(-110,-50,-106,-60);c.closePath();
  shape(lin(0,-90,0,-44,[[0,'#f0b56c'],[.5,'#d08a42'],[1,'#a8642a']]),5,'#4a2408');
  for(const [x,y,r] of [[-70,-62,7],[-30,-72,6],[10,-75,8],[50,-70,6],[82,-60,5]]){ell(x,y,r,r*0.7);c.fillStyle='rgba(255,220,160,.6)';c.fill();ell(x+2,y+2,r*0.5,r*0.3);c.fillStyle='rgba(90,40,10,.5)';c.fill();}}
const SP=[[-48,-30],[28,-30],[-4,4],[-14,38],[30,10]];
function flag(t){c.save();c.translate(58,-112);c.strokeStyle='#8a6a40';c.lineWidth=4;c.beginPath();c.moveTo(0,46);c.lineTo(0,-34);c.stroke();c.font='900 20px Inter';const W=Math.max(110,c.measureText(t).width+26);c.beginPath();c.roundRect(-4,-52,W,36,8);shape('#ffffff',3,O);c.fillStyle='#e5484d';c.textAlign='center';c.textBaseline='middle';c.fillText(t,W/2-4,-34);c.restore();}
function blob(r,col){c.beginPath();for(let i=0;i<=12;i++){const a=i/12*Math.PI*2,rr=r*(0.75+0.3*Math.sin(i*1.9));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*0.75);}c.closePath();c.fillStyle=col;c.fill();c.lineWidth=2;c.strokeStyle='rgba(0,0,0,.25)';c.stroke();ell(-r*0.3,-r*0.3,r*0.28,r*0.12,-0.5);c.fillStyle='rgba(255,255,255,.6)';c.fill();}
const T={
 fries:{lab:'+ FRIES',col:'#ffd23f',piece(i){c.rotate(i*0.5-1);c.beginPath();c.roundRect(-5,-20,10,40,3);shape(lin(-5,0,5,0,[[0,'#fff1a0'],[.6,'#ffd23f'],[1,'#e0a400']]),2.5,'#8a6400');c.fillStyle='rgba(160,100,0,.35)';c.fillRect(-5,12,10,8);},
   over(){c.save();for(const [x,y,a] of [[-30,-10,.8],[20,-20,-.6],[0,30,.3]]){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-5,-22,10,44,3);shape(lin(-5,0,5,0,[[0,'#fff1a0'],[1,'#e0a400']]),2.5,'#8a6400');c.restore();}c.restore();}},
 sushi:{lab:'+ SUSHI',col:'#ff8a5b',piece(i){c.rotate(i*0.4);c.beginPath();c.roundRect(-14,-6,28,16,7);shape('#fbfaf5',2.5,'#9a9a8a');c.beginPath();c.roundRect(-16,-14,32,13,6);shape(lin(0,-14,0,0,[[0,'#ffb38a'],[1,'#ff6f3c']]),2.5,'#a8401a');c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=2;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(-10+k*8,-13);c.lineTo(-4+k*8,-2);c.stroke();}},
   over(){ell(-56,-30,12,6);c.fillStyle='#7bc043';c.fill();c.strokeStyle='#3f6e1a';c.lineWidth=2;c.stroke();}},
 cereal:{lab:'+ CEREAL',cols:['#ff4d6d','#ffd43b','#69db7c','#4dabf7','#ff922b'],col:'#fff7e8',piece(i){c.beginPath();c.arc(0,0,9,0,7);c.arc(0,0,3.5,0,7,true);c.fillStyle=T.cereal.cols[i%5];c.fill();c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=2;c.stroke();},
   over(){c.fillStyle='rgba(255,252,240,.88)';c.beginPath();c.moveTo(-70,-44);c.quadraticCurveTo(-30,-30,0,-40);c.quadraticCurveTo(40,-30,70,-44);c.quadraticCurveTo(50,10,20,40);c.quadraticCurveTo(0,56,-20,40);c.quadraticCurveTo(-50,10,-70,-44);c.fill();
     for(const [x,y,k] of [[-40,-20,0],[-10,-28,1],[20,-18,2],[45,-34,3],[-24,8,4],[6,10,0],[30,-2,1],[-2,30,2]]){c.save();c.translate(x,y);T.cereal.piece(k);c.restore();}}},
 banana:{lab:'+ BANANA',col:'#fff3b0',piece(i){ell(0,0,12,12);shape(rad(-3,-3,1,13,[[0,'#fffbe0'],[1,'#f2dc7a']]),2.5,'#9a8a3a');c.fillStyle='rgba(120,100,40,.55)';for(let k=0;k<5;k++){ell(Math.cos(k*1.25)*4,Math.sin(k*1.25)*4,1.2,1.2);c.fill();}},
   over(){c.save();c.translate(10,-6);c.rotate(-0.3);c.beginPath();c.moveTo(-50,-6);c.quadraticCurveTo(0,26,50,-10);c.quadraticCurveTo(0,8,-50,-6);c.closePath();shape(lin(0,-10,0,20,[[0,'#fff28a'],[1,'#e0b000']]),3,'#6a5000');c.restore();}}};
function slice(kind){return ()=>{c.save();c.scale(1.3,1.3);base();const t=T[kind];if(t.over)t.over();SP.forEach(([x,y],i)=>{c.save();c.translate(x,y);c.rotate(i*0.7);t.piece(i);c.restore();});flag(t.lab);c.restore();};}
function mk(kind){const t=T[kind];return {h:208,w:260,rot:-Math.PI*1.4,burst:430,up:1.0,spin:12,draw:slice(kind),
  parts(){const o=[{dx:0,dy:0,h:22,rest:10,draw:()=>{c.save();c.scale(1.3,0.43);base();c.restore();}}];for(let i=0;i<10;i++)o.push({dx:((i*37)%160)-80,dy:-14,h:20,rest:9,draw:()=>{c.save();c.scale(1.3,1.3);t.piece(i);c.restore();}});for(let i=0;i<26;i++){const r=8+(i%4)*3;const col=['#ffc93c','#ffe27a','#d9481f',t.col][i%4];o.push({dx:((i*41)%140)-70,dy:-30,h:r,rest:r*0.4,g:0.8,draw:()=>blob(r,col)});}return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(80+Math.sin(i*2.7)*14)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,210,70,.92)';c.fill();
    ell(x+26,H.FLOOR_Y+1,30*g,5*g);c.fillStyle=t.col||'#ff4d6d';c.fill();}};}
function S(o,k){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
return {tag:'CHALLENGE #21',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#3a1612',wallBot:'#8a3226',sky1:'#ff9a76',sky2:'#ffe1a8',night:false,floorA:'#f6eedd',floorB:'#b3261e'},
 objects:{fries:S(mk('fries'),1.3),sushi:S(mk('sushi'),1.3),cereal:S(mk('cereal'),1.3),banana:S(mk('banana'),1.3)},
 onTable(){const x=160,y=880;ell(x,y-6,70,12);shape(lin(0,y-18,0,y+6,[[0,'#f1f3f5'],[1,'#adb5bd']]),3,'#495057');
   c.beginPath();c.roundRect(240,y-60,34,60,6);shape(lin(240,0,274,0,[[0,'#ff6b6b'],[1,'#c92a2a']]),3,'#5a0a0a');c.fillStyle='#fff';c.fillRect(246,y-40,22,14);}};};
