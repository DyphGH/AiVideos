// Video #8 — polemic pizza toppings (original illustrations)
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
const T={
 pineapple:{col:'#ffd43b',piece(){c.beginPath();c.moveTo(-14,-10);c.lineTo(14,-10);c.lineTo(10,10);c.lineTo(-10,10);c.closePath();shape(lin(0,-10,0,10,[[0,'#fff3a0'],[1,'#f5c400']]),3,'#9a7400');c.strokeStyle='rgba(180,140,0,.6)';c.lineWidth=2;c.beginPath();c.moveTo(-6,-8);c.lineTo(-4,8);c.moveTo(4,-8);c.lineTo(5,8);c.stroke();}},
 chocolate:{col:'#6b3a1c',piece(){ell(0,0,11,9);shape(rad(-3,-3,1,12,[[0,'#8a5230'],[1,'#3d1f0b']]),3,'#2a1206');},
   over(){c.strokeStyle='#4a240c';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(-80,-46);for(let i=0;i<7;i++)c.lineTo(-60+i*22,-46+(i%2?36:8)+i*10);c.stroke();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=3;c.stroke();}},
 gummies:{cols:['#ff4d6d','#51cf66','#ffd43b','#4dabf7','#ff922b'],piece(i=0){const col=T.gummies.cols[i%5];c.fillStyle=col;c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=2;
   ell(0,4,9,11);c.fill();c.stroke();ell(0,-9,7,6);c.fill();c.stroke();ell(-6,-14,3,3);c.fill();ell(6,-14,3,3);c.fill();ell(-3,-4,3,4);c.fillStyle='rgba(255,255,255,.5)';c.fill();}},
 ketchup:{col:'#d6281f',piece(){c.beginPath();c.roundRect(-5,-16,10,32,3);shape(lin(-5,0,5,0,[[0,'#ffd23f'],[1,'#e6a800']]),2,'#8a6400');},
   over(){c.strokeStyle='#c81e14';c.lineWidth=10;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-70,-40);for(let i=0;i<8;i++)c.lineTo(-60+i*17,-36+(i%2?26:0)+i*12);c.stroke();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;c.stroke();}}};
function slice(kind){return ()=>{c.save();c.scale(1.3,1.3);base();const t=T[kind];if(t.over)t.over();SP.forEach(([x,y],i)=>{c.save();c.translate(x,y);c.rotate(i*0.7);t.piece(i);c.restore();});c.restore();};}
function mk(kind){const t=T[kind];return {h:208,w:260,rot:-Math.PI*1.4,burst:430,up:1.0,spin:12,draw:slice(kind),
  parts(){return [{dx:0,dy:0,h:22,rest:10,draw:()=>{c.save();c.scale(1,0.33);slice(kind)();c.restore();}},...SP.map((p,i)=>({dx:(i-2)*26,dy:-14,h:20,rest:9,draw:()=>t.piece(i)}))];},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(80+Math.sin(i*2.7)*14)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,210,70,.92)';c.fill();
    ell(x+26,H.FLOOR_Y+1,30*g,5*g);c.fillStyle=t.col||'#ff4d6d';c.fill();}};}
return {tag:'CHALLENGE #8',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#173323',wallBot:'#2e5a3d',sky1:'#ff9a76',sky2:'#ffe1a8',night:false,floorA:'#f4ecdc',floorB:'#2f6b3f'},
 objects:{pineapple:mk('pineapple'),chocolate:mk('chocolate'),gummies:mk('gummies'),ketchup:mk('ketchup')},
 onTable(){const x=160,y=880;ell(x,y-6,70,12);shape(lin(0,y-18,0,y+6,[[0,'#f1f3f5'],[1,'#adb5bd']]),3,'#495057');
   c.beginPath();c.roundRect(240,y-60,34,60,6);shape(lin(240,0,274,0,[[0,'#ff6b6b'],[1,'#c92a2a']]),3,'#5a0a0a');c.fillStyle='#fff';c.fillRect(246,y-40,22,14);}};};
