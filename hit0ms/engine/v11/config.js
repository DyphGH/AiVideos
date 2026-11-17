// Video #11 — jelly & slime (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.55){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function bubbles(pts,col='rgba(255,255,255,.45)'){for(const [x,y,r] of pts){ell(x,y,r,r);c.strokeStyle=col;c.lineWidth=2;c.stroke();ell(x-r*0.3,y-r*0.3,r*0.25,r*0.25);c.fillStyle=col;c.fill();}}
// 1 jello mold
function jelloShape(){c.beginPath();c.moveTo(-95,50);c.lineTo(-80,-30);c.quadraticCurveTo(-70,-70,-40,-72);c.lineTo(40,-72);c.quadraticCurveTo(70,-70,80,-30);c.lineTo(95,50);c.quadraticCurveTo(0,66,-95,50);c.closePath();}
function jello(){ell(0,58,120,16);shape(lin(0,44,0,74,[[0,'#ffffff'],[1,'#b8bec5']]),3,'#6c757d');
  jelloShape();shape(lin(-90,0,90,0,[[0,'rgba(170,10,40,.95)'],[.45,'rgba(240,40,70,.88)'],[1,'rgba(140,0,30,.95)']]),4,'#5a0012');
  c.save();jelloShape();c.clip();c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=10;for(const x of [-50,-15,20,55]){c.beginPath();c.moveTo(x*0.8,-72);c.quadraticCurveTo(x,0,x*1.15,60);c.stroke();}
  bubbles([[-40,10,6],[30,-20,4],[50,30,5],[-10,40,3],[10,-40,4]]);c.restore();
  gloss(-52,-40,10,26,0.2,.6);gloss(-30,-62,22,6,0,.5);
  ell(10,-86,16,16);shape(rad(5,-91,2,17,[[0,'#ff6b7a'],[1,'#b0001c']]),3,'#4a0008');gloss(4,-92,5,3);c.strokeStyle='#2b6b1a';c.lineWidth=4;c.beginPath();c.moveTo(12,-100);c.quadraticCurveTo(20,-120,32,-124);c.stroke();}
function jChunk(r){c.beginPath();for(let i=0;i<=10;i++){const a=i/10*Math.PI*2,rr=r*(0.8+0.25*Math.sin(i*2.1));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*0.8);}c.closePath();shape(rad(-r*0.3,-r*0.3,2,r,[[0,'rgba(255,90,110,.95)'],[1,'rgba(170,10,40,.95)']]),3,'#5a0012');gloss(-r*0.35,-r*0.35,r*0.25,r*0.12);}
const jelloO={h:190,w:240,rot:-Math.PI*1.1,burst:470,up:1.3,spin:10,draw:jello,
  parts(){const o=[];for(let i=0;i<9;i++)o.push({dx:(i-4)*22,dy:-10+(i%3)*14,h:40,rest:16,draw:()=>jChunk(22+(i%3)*6)});o.push({dx:10,dy:-86,h:32,rest:16,draw:()=>{ell(0,0,16,16);shape(rad(-5,-5,2,17,[[0,'#ff6b7a'],[1,'#b0001c']]),3,'#4a0008');}});
    o.push({dx:0,dy:58,h:20,rest:6,draw:()=>{ell(0,0,120,16);shape(lin(0,-14,0,16,[[0,'#ffffff'],[1,'#b8bec5']]),3,'#6c757d');}});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(75+Math.sin(i*2.9)*14)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(220,20,60,.55)';c.fill();}};
// 2 slime
function slimeBlob(){c.beginPath();c.moveTo(-110,50);c.quadraticCurveTo(-120,-20,-70,-50);c.quadraticCurveTo(-30,-90,10,-70);c.quadraticCurveTo(60,-95,90,-50);c.quadraticCurveTo(125,-10,110,50);
  c.quadraticCurveTo(96,62,86,52);c.quadraticCurveTo(80,80,70,52);c.quadraticCurveTo(20,64,-30,56);c.quadraticCurveTo(-40,86,-52,56);c.quadraticCurveTo(-90,62,-110,50);c.closePath();}
function slime(){slimeBlob();shape(rad(-30,-40,10,140,[[0,'#d4ff5e'],[.5,'#66e03a'],[1,'#1f9a3a']]),4,'#0d4a18');c.save();slimeBlob();c.clip();
  bubbles([[-60,0,10],[-20,-30,6],[30,10,12],[60,-30,5],[0,30,7],[-80,30,4],[80,20,6],[40,-55,4]],'rgba(255,255,255,.55)');
  c.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<18;i++){ell(-90+((i*41)%180),-50+((i*29)%90),2.5,2.5);c.fill();}c.restore();
  gloss(-55,-45,30,10,-0.5,.7);gloss(50,-62,14,5,0.4,.5);}
function sBlob(r,s){c.beginPath();for(let i=0;i<=12;i++){const a=i/12*Math.PI*2,rr=r*(0.75+0.3*Math.sin(i*1.7+s));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*0.75);}c.closePath();shape(rad(-r*0.3,-r*0.3,2,r,[[0,'#d4ff5e'],[1,'#2fae3a']]),3,'#0d4a18');gloss(-r*0.3,-r*0.3,r*0.3,r*0.12);}
const slimeO={h:160,w:250,rot:-Math.PI*0.7,burst:380,up:0.8,spin:6,draw:slime,
  parts(){const o=[{dx:0,dy:20,h:70,rest:22,draw:()=>{c.save();c.scale(1,0.45);slime();c.restore();}}];for(let i=0;i<10;i++)o.push({dx:(i-5)*24,dy:-30,h:24,rest:9,draw:()=>sBlob(14+(i%3)*5,i)});return o;},
  decal(x,g){c.beginPath();for(let i=0;i<=28;i++){const a=i/28*Math.PI*2;const r=(95+Math.sin(i*2.3)*18)*g;c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(102,224,58,.85)';c.fill();
    c.fillStyle='rgba(255,255,255,.5)';ell(x-30,H.FLOOR_Y-2,40*g,3);c.fill();}};
// 3 giant gummy bear
const GB='rgba(255,140,20,.92)';
function gpart(fn){c.beginPath();fn();shape(rad(-10,-10,4,90,[[0,'rgba(255,200,90,.95)'],[1,'rgba(230,100,0,.95)']]),4,'#7a3600');}
const BEAR=[['legL',()=>ell(-36,70,26,20)],['legR',()=>ell(36,70,26,20)],['body',()=>ell(0,20,60,66)],['armL',()=>ell(-58,0,18,30,0.5)],['armR',()=>ell(58,0,18,30,-0.5)],
  ['earL',()=>ell(-40,-104,16,16)],['earR',()=>ell(40,-104,16,16)],['head',()=>ell(0,-70,52,46)]];
function bear(){for(const [,f] of BEAR)gpart(f);c.fillStyle='rgba(120,50,0,.6)';ell(-18,-76,6,7);c.fill();ell(18,-76,6,7);c.fill();ell(0,-58,10,7);c.fill();
  c.strokeStyle='rgba(120,50,0,.5)';c.lineWidth=3;c.beginPath();c.moveTo(-10,-48);c.quadraticCurveTo(0,-40,10,-48);c.stroke();gloss(-20,-96,18,8,-0.3,.55);gloss(-30,0,10,26,0.2,.45);gloss(26,40,8,14,0,.3);}
const bearO={h:250,w:180,rot:-Math.PI*1.25,burst:520,up:1.5,spin:12,draw:bear,
  parts(){const P=[[-36,70],[36,70],[0,20],[-58,0],[58,0],[-40,-104],[40,-104],[0,-70]];return BEAR.map(([n,f],i)=>({dx:P[i][0],dy:P[i][1],h:n==='body'?120:n==='head'?90:36,rest:n==='body'?50:n==='head'?40:16,draw:()=>{c.save();c.translate(-P[i][0],-P[i][1]);gpart(f);c.restore();}}));},
  decal(x,g){c.fillStyle='rgba(255,170,40,.6)';ell(x,H.FLOOR_Y+2,70*g,7*g);c.fill();}};
// 4 marshmallow tower
function mm(col){c.beginPath();c.roundRect(-46,-26,92,52,20);shape(lin(0,-26,0,26,[[0,col[0]],[1,col[1]]]),4,col[2]);ell(0,-20,40,8);c.fillStyle='rgba(255,255,255,.55)';c.fill();c.fillStyle='rgba(0,0,0,.06)';for(let i=0;i<8;i++){ell(-34+i*10,4+(i%2)*8,2,2);c.fill();}}
const MMC=[['#ffffff','#e9e3ef','#8d8199'],['#ffd6e6','#ff9cc2','#a8507a'],['#fff3c4','#ffd96b','#a88520'],['#d8f5ff','#8fd8f5','#2f7da3'],['#ffffff','#e9e3ef','#8d8199']];
function tower(){MMC.forEach((col,i)=>{c.save();c.translate((i%2?6:-4),80-i*42);mm(col);c.restore();});}
const mmO={h:230,w:120,rot:-Math.PI*0.9,burst:560,up:1.7,spin:14,draw:tower,
  parts(){return MMC.map((col,i)=>({dx:(i%2?6:-4)+(i-2)*30,dy:80-i*42,h:52,rest:26,draw:()=>mm(col)}));},
  decal(x,g){c.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<12;i++){ell(x-90*g+((i*31)%180)*g,H.FLOOR_Y,4,2);c.fill();}}};
function S(o,k=1.3){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[jelloO,slimeO,bearO,mmO].forEach(o=>S(o));
return {tag:'CHALLENGE #11',ask:'MOST SATISFYING SQUISH? &darr;',askStyle:{background:'#8a3ffc',color:'#fff'},
 palette:{wallTop:'#1c1640',wallBot:'#3d2f7a',sky1:'#ff8ad8',sky2:'#c8f3ff',night:false,floorA:'#f4ecdc',floorB:'#7048c8'},
 objects:{jello:jelloO,slime:slimeO,bear:bearO,marshmallow:mmO},
 onTable(){const y=880;c.beginPath();c.roundRect(110,y-70,90,70,10);shape(lin(110,0,200,0,[[0,'rgba(200,240,255,.7)'],[1,'rgba(140,200,230,.7)']]),3,'#2f7da3');
   c.save();c.beginPath();c.roundRect(112,y-40,86,38,8);c.clip();c.fillStyle='#66e03a';c.fillRect(110,y-40,90,40);c.restore();c.fillStyle='#1f3b6b';c.fillRect(106,y-80,98,14);
   for(let i=0;i<4;i++){ell(250+i*26,y-12,12,10);shape(['#ff4d6d','#51cf66','#ffd43b','#4dabf7'][i],2,'rgba(0,0,0,.4)');}}};};
