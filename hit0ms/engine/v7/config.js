// Video #7 — party food (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
const O='#3a1c0c';
// ---- piece painters (all drawn around their own centre) ----
const bunBottom=()=>{c.beginPath();c.moveTo(-95,-12);c.lineTo(95,-12);c.quadraticCurveTo(98,16,70,18);c.lineTo(-70,18);c.quadraticCurveTo(-98,16,-95,-12);c.closePath();shape(lin(0,-12,0,18,[[0,'#f6c27a'],[1,'#c9853f']]),5,O);};
const patty=()=>{c.beginPath();c.roundRect(-100,-15,200,30,14);shape(lin(0,-15,0,15,[[0,'#7a3e1d'],[.5,'#5a2c12'],[1,'#3d1d0a']]),5,'#2a1206');c.fillStyle='rgba(255,255,255,.12)';for(let i=-80;i<80;i+=26){c.fillRect(i,-8,12,3);}};
const cheese=()=>{c.beginPath();c.moveTo(-100,-6);c.lineTo(100,-6);c.lineTo(96,6);c.lineTo(70,6);c.quadraticCurveTo(64,30,56,6);c.lineTo(-20,6);c.quadraticCurveTo(-28,26,-36,6);c.lineTo(-96,6);c.closePath();shape(lin(0,-6,0,20,[[0,'#ffd84d'],[1,'#f2a900']]),4,'#a86a00');};
const lettuce=()=>{c.beginPath();c.moveTo(-104,4);for(let x=-104;x<=104;x+=13){c.quadraticCurveTo(x+6,(x/13)%2?-14:10,x+13,0);}c.lineTo(100,8);c.lineTo(-100,8);c.closePath();shape(lin(0,-12,0,8,[[0,'#8fe36a'],[1,'#3f9b2c']]),4,'#245c18');};
const tomato=()=>{for(const x of [-52,0,52]){ell(x,0,30,10);shape(lin(0,-10,0,10,[[0,'#ff6b5b'],[1,'#c81e1e']]),4,'#7a0f0f');ell(x,-2,16,4);c.fillStyle='rgba(255,200,180,.6)';c.fill();}};
const bunTop=()=>{c.beginPath();c.moveTo(-98,24);c.quadraticCurveTo(-100,-46,0,-50);c.quadraticCurveTo(100,-46,98,24);c.closePath();shape(rad(-30,-30,5,120,[[0,'#ffd08a'],[.6,'#e7a052'],[1,'#b8702c']]),5,O);
  c.fillStyle='#fff6dc';for(const [x,y] of [[-50,-20],[-20,-32],[10,-36],[40,-26],[62,-6],[-70,0],[-28,-8],[22,-12]]){ell(x,y,6,3,0.4);c.fill();}
  ell(-40,-28,20,7,-0.3);c.fillStyle='rgba(255,255,255,.35)';c.fill();};
const BURGER=[[bunBottom,62],[patty,32],[cheese,14],[lettuce,4],[tomato,-8],[bunTop,-46]];
const burger={h:170,w:200,rot:-Math.PI*1.2,burst:520,up:1.1,
  draw(){for(const [p,y] of BURGER){c.save();c.translate(0,y);p();c.restore();}},
  parts(){return BURGER.map(([p,y],i)=>({dx:(i-2.5)*14,dy:y,h:30,rest:14,draw:p}));},
  decal(x,g){ell(x+10,H.FLOOR_Y+2,70*g,9*g);c.fillStyle='rgba(200,30,30,.55)';c.fill();}};
// taco
const shellHalf=(s)=>()=>{c.beginPath();c.moveTo(0,-40);c.quadraticCurveTo(s*95,-40,s*90,30);c.lineTo(0,30);c.closePath();shape(lin(0,-40,0,30,[[0,'#ffd36b'],[1,'#e09a1f']]),5,'#8a5600');c.fillStyle='rgba(160,90,0,.35)';for(let i=0;i<7;i++){ell(s*(15+i*10),-10+(i%3)*12,3,3);c.fill();}};
const meat=()=>{for(let i=0;i<6;i++){ell(-40+i*16,0,10,7);c.fillStyle='#6b3415';c.fill();c.strokeStyle='#3d1d0a';c.lineWidth=2;c.stroke();}};
const salad=()=>{for(let i=0;i<7;i++){c.beginPath();c.moveTo(-60+i*18,0);c.quadraticCurveTo(-52+i*18,-18,-44+i*18,0);c.closePath();shape('#6fd04a',3,'#2b6b1a');}};
const cubes=()=>{for(let i=0;i<5;i++){c.beginPath();c.roundRect(-45+i*20,-7,13,13,3);shape('#e8322a',3,'#7a0f0f');}};
const cheeseShreds=()=>{c.strokeStyle='#ffb800';c.lineWidth=4;c.lineCap='round';for(let i=0;i<9;i++){c.beginPath();c.moveTo(-50+i*12,-4);c.lineTo(-42+i*12,6);c.stroke();}};
const TACO=[[shellHalf(-1),[0,10]],[shellHalf(1),[0,10]],[meat,[0,-22]],[salad,[0,-34]],[cubes,[0,-30]],[cheeseShreds,[0,-40]]];
const taco={h:120,w:190,rot:-Math.PI*1.0,burst:560,up:1.2,
  draw(){for(const [p,[x,y]] of [TACO[2],TACO[4],TACO[3],TACO[5],TACO[0],TACO[1]]){c.save();c.translate(x,y);p();c.restore();}},
  parts(){const out=[];TACO.forEach(([p,[x,y]],i)=>out.push({dx:i<2?(i?40:-40):(i-3)*20,dy:y,h:30,rest:14,draw:p}));return out;},
  decal(x,g){c.fillStyle='#6fd04a';for(let i=0;i<10;i++){ell(x-80+i*17,H.FLOOR_Y+2,6*g,3*g);c.fill();}}};
// pizza slice
const slice=()=>{c.beginPath();c.moveTo(-95,-55);c.quadraticCurveTo(0,-80,95,-55);c.lineTo(0,75);c.closePath();shape(lin(0,-60,0,75,[[0,'#ffd65a'],[1,'#f4a92a']]),5,'#8a4a00');
  c.beginPath();c.moveTo(-98,-56);c.quadraticCurveTo(0,-84,98,-56);c.lineTo(92,-44);c.quadraticCurveTo(0,-70,-92,-44);c.closePath();shape(lin(0,-80,0,-44,[[0,'#e8a45a'],[1,'#b8702c']]),5,O);
  for(const [x,y] of [[-40,-30],[30,-28],[0,8],[-12,38]]){ell(x,y,17,15);shape(rad(x-4,y-4,2,18,[[0,'#e84a3a'],[1,'#a01818']]),3,'#5a0a0a');}
  c.strokeStyle='rgba(255,240,180,.8)';c.lineWidth=3;c.beginPath();c.moveTo(-60,-40);c.quadraticCurveTo(-30,-10,-50,10);c.stroke();};
const pep=()=>{ell(0,0,16,14);shape(rad(-4,-4,2,18,[[0,'#e84a3a'],[1,'#a01818']]),3,'#5a0a0a');};
const pizza={h:160,w:200,rot:-Math.PI*1.5,burst:420,up:0.9,spin:10,
  draw:slice,
  parts(){return [{dx:0,dy:0,h:20,rest:10,draw:()=>{c.save();c.scale(1,0.35);slice();c.restore();}},...[0,1,2,3,4].map(i=>({dx:(i-2)*24,dy:-10,h:16,rest:8,draw:pep}))];},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(80+Math.sin(i*2.7)*14)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,210,70,.9)';c.fill();
    ell(x+30,H.FLOOR_Y,26*g,5*g);c.fillStyle='rgba(200,40,20,.8)';c.fill();}};
// donut
const SPR=['#ff4d6d','#4dabf7','#ffd43b','#69db7c','#ffffff','#b197fc'];
const donutBody=()=>{ell(0,0,75,72);shape(rad(-20,-20,10,85,[[0,'#f1c17f'],[1,'#c48335']]),5,O);
  c.beginPath();for(let i=0;i<=30;i++){const a=i/30*Math.PI*2;const r=66+Math.sin(i*1.9)*6;c.lineTo(Math.cos(a)*r,Math.sin(a)*r-4);}c.closePath();shape(rad(-20,-24,6,80,[[0,'#ffb3d1'],[1,'#ff5c9d']]),4,'#9c1a52');
  ell(0,-2,24,23);shape(lin(0,-25,0,25,[[0,'#7a4a1c'],[1,'#3d220a']]),5,O);
  for(let i=0;i<22;i++){const a=i*2.39,r=34+(i*13%26);c.save();c.translate(Math.cos(a)*r,Math.sin(a)*r-4);c.rotate(a*1.7);c.fillStyle=SPR[i%6];c.beginPath();c.roundRect(-6,-2,12,4,2);c.fill();c.restore();}
  ell(-30,-36,18,8,-0.5);c.fillStyle='rgba(255,255,255,.4)';c.fill();};
const donut={h:150,w:150,rot:-Math.PI*0.8,burst:300,up:1.6,spin:6,
  draw:donutBody,
  parts(){const out=[{dx:0,dy:0,h:150,rest:75,draw:donutBody}];for(let i=0;i<14;i++){const col=SPR[i%6];out.push({dx:(i%2?1:-1)*(10+i*3),dy:-40,h:6,rest:3,draw:()=>{c.fillStyle=col;c.beginPath();c.roundRect(-6,-2,12,4,2);c.fill();}});}return out;}};
return {tag:'CHALLENGE #7',ask:'RANK THEM 1&ndash;4 &darr;',
 palette:{wallTop:'#2b1d3a',wallBot:'#5b3a6b',sky1:'#ff9a76',sky2:'#ffd6a5',night:false,floorA:'#f4ecdc',floorB:'#c0392b'},
 objects:{burger,taco,pizza,donut},
 onTable(){ // little party props
   const x=150,y=880;c.beginPath();c.moveTo(x-40,y);c.lineTo(x-28,y-60);c.lineTo(x+28,y-60);c.lineTo(x+40,y);c.closePath();shape(lin(0,y-60,0,y,[[0,'#ff6b6b'],[1,'#c92a2a']]),4,'#5a0a0a');
   c.fillStyle='#fff';for(let i=0;i<3;i++){c.fillRect(x-30+i*22,y-58,8,56);}
   for(let i=0;i<8;i++){ell(x-20+i*7,y-66-(i%3)*5,6,6);c.fillStyle=['#fff3bf','#ffe066'][i%2];c.fill();}
   ell(260,y-22,22,22);shape(rad(252,y-30,2,24,[[0,'#ffe066'],[1,'#f59f00']]),3,'#8a5600');}};};
