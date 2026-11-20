// Video #18 — ice cream crimes
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#3a1c0c';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function cone(){c.beginPath();c.moveTo(-50,-10);c.lineTo(50,-10);c.lineTo(0,110);c.closePath();shape(lin(-50,0,50,0,[[0,'#f3c27a'],[1,'#c4823a']]),5,O);c.save();c.clip();c.strokeStyle='rgba(120,60,10,.55)';c.lineWidth=3;for(let i=-6;i<8;i++){c.beginPath();c.moveTo(i*16-40,-10);c.lineTo(i*16+40,110);c.stroke();c.beginPath();c.moveTo(i*16+40,-10);c.lineTo(i*16-40,110);c.stroke();}c.restore();
 c.beginPath();c.roundRect(-56,-20,112,18,8);shape('#e3a95a',4,O);}
function cup(){c.beginPath();c.moveTo(-60,-10);c.lineTo(60,-10);c.lineTo(44,90);c.lineTo(-44,90);c.closePath();shape(lin(-60,0,60,0,[[0,'#ff8fb8'],[1,'#e0457f']]),5,'#6a0f35');c.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<4;i++){ell(-30+i*20,30+(i%2)*20,6,6);c.fill();}}
function scoop(x,y,r,col){c.beginPath();for(let i=0;i<=20;i++){const a=Math.PI+i/20*Math.PI;c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}for(let i=0;i<=8;i++){const u=i/8;c.lineTo(x+r-u*2*r,y+(i%2?r*0.28:r*0.1));}c.closePath();shape(rad(x-r*.3,y-r*.4,2,r*1.2,[[0,col[0]],[1,col[1]]]),5,col[2]);gloss(x-r*0.35,y-r*0.5,r*0.25,r*0.12,-0.5,.6);}
const VAN=['#fff7e0','#f0d9a8','#8a6a30'],STR=['#ffc2d6','#f06292','#8a1f45'],CHO=['#9a5a32','#5a2e14','#2a1206'],MIN=['#c9f7e3','#7fd8b0','#2a6b4a'];
function fries(){for(const [x,a] of [[-24,-0.4],[-8,-0.15],[8,0.1],[22,0.35],[0,0]]){c.save();c.translate(x,-70);c.rotate(a);c.beginPath();c.roundRect(-6,-60,12,64,3);shape(lin(-6,0,6,0,[[0,'#ffe27a'],[1,'#f2b705']]),3,'#8a6400');c.restore();}}
function pickles(){for(const [x,y,a] of [[-22,-78,-0.3],[18,-88,0.4],[0,-60,0]]){c.save();c.translate(x,y);c.rotate(a);ell(0,0,18,12);shape(rad(-4,-4,2,18,[[0,'#b9e36a'],[1,'#5a8a1f']]),3,'#2a4a0a');c.fillStyle='rgba(255,255,220,.8)';for(let k=0;k<5;k++){ell(-8+k*4,(k%2)*4-2,2,2);c.fill();}c.restore();}}
function ketchup(){c.strokeStyle='#d6281f';c.lineWidth=9;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-40,-70);for(let i=0;i<7;i++)c.lineTo(-30+i*12,-70+(i%2?-18:6));c.stroke();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;c.stroke();for(const x of [-30,10,34]){c.beginPath();c.moveTo(x,-60);c.quadraticCurveTo(x+3,-40,x,-30);c.lineWidth=7;c.strokeStyle='#d6281f';c.stroke();}}
function cereal(){const C=['#ff4d6d','#ffd43b','#69db7c','#4dabf7','#ff922b'];for(let i=0;i<12;i++){const x=-42+(i*29)%84,y=-78-((i*17)%40);c.beginPath();c.arc(x,y,8,0,7);c.fillStyle=C[i%5];c.fill();c.lineWidth=2.5;c.strokeStyle='rgba(0,0,0,.35)';c.stroke();c.beginPath();c.arc(x,y,3,0,7);c.fillStyle='#fff3c4';c.fill();}}
const ITEMS={
 fries:{lab:'+ FRIES',one:()=>{c.beginPath();c.roundRect(-6,-30,12,60,3);shape(lin(-6,0,6,0,[[0,'#ffe27a'],[1,'#f2b705']]),3,'#8a6400');},base:cone,scoops:[[0,-36,52,VAN],[0,-80,40,STR]],top:fries,col:'#ffe27a'},
 ketchup:{lab:'+ KETCHUP',one:()=>{ell(0,0,10,8);c.fillStyle='#d6281f';c.fill();ell(-3,-3,3,2);c.fillStyle='rgba(255,255,255,.6)';c.fill();},base:cup,scoops:[[-26,-28,40,VAN],[26,-28,40,VAN],[0,-58,38,STR]],top:ketchup,col:'#d6281f'},
 pickles:{lab:'+ PICKLES',one:()=>{ell(0,0,18,12);shape(rad(-4,-4,2,18,[[0,'#b9e36a'],[1,'#5a8a1f']]),3,'#2a4a0a');},base:cone,scoops:[[0,-36,52,MIN],[0,-80,40,MIN]],top:pickles,col:'#7fd8b0'},
 cereal:{lab:'+ CEREAL',one:()=>{c.beginPath();c.arc(0,0,9,0,7);c.fillStyle='#ffd43b';c.fill();c.lineWidth=2.5;c.strokeStyle='rgba(0,0,0,.35)';c.stroke();c.beginPath();c.arc(0,0,3.5,0,7);c.fillStyle='#fff3c4';c.fill();},base:cup,scoops:[[-26,-28,40,CHO],[26,-28,40,VAN],[0,-58,38,CHO]],top:cereal,col:'#9a5a32'}};
function drips(it){const col=it.scoops[0][3];for(const [x,l] of [[-30,30],[8,46],[34,22]]){c.beginPath();c.moveTo(x-7,-12);c.lineTo(x-6,-12+l);c.arc(x,-12+l,6,Math.PI,0,true);c.lineTo(x+7,-12);c.closePath();c.fillStyle=col[1];c.fill();c.strokeStyle=col[2];c.lineWidth=2.5;c.stroke();}}
function chips(x,y,r,col){if(col!==VAN&&col!==MIN)return;c.fillStyle=col===MIN?'#3a1f0a':'#c9a066';for(let i=0;i<7;i++){ell(x-r*0.6+((i*29)%(r*1.2)),y-r*0.6+((i*17)%(r*0.8)),3,2,i);c.fill();}}
function flag(t){c.save();c.translate(46,-118);c.strokeStyle='#8a6a40';c.lineWidth=4;c.beginPath();c.moveTo(0,40);c.lineTo(0,-34);c.stroke();c.beginPath();c.roundRect(-4,-50,120,34,8);shape('#ffffff',3,O);c.fillStyle='#e5484d';c.font='900 19px Inter';c.textAlign='center';c.textBaseline='middle';c.fillText(t,56,-33);c.restore();}
function draw(it){return ()=>{it.base();drips(it);for(const [x,y,r,col] of it.scoops){scoop(x,y,r,col);chips(x,y,r,col);}it.top();flag(it.lab);};}
function blob(r,col){c.beginPath();for(let i=0;i<=12;i++){const a=i/12*Math.PI*2,rr=r*(0.75+0.3*Math.sin(i*1.9));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*0.75);}c.closePath();shape(rad(-r*.3,-r*.3,2,r*1.1,[[0,col[0]],[1,col[1]]]),3,col[2]);gloss(-r*0.3,-r*0.3,r*0.28,r*0.12,-0.5,.6);}
function mk(key){const it=ITEMS[key];return {h:250,w:150,rot:-Math.PI*1.2,burst:520,up:1.2,spin:12,draw:draw(it),
 parts(){const o=[{dx:0,dy:50,h:60,rest:24,draw:()=>{c.save();c.translate(0,-50);it.base();c.restore();}}];
   it.scoops.forEach(([x,y,r,col],i)=>{for(let k=0;k<3;k++)o.push({dx:x+(k-1)*20,dy:y,h:r*0.8,rest:r*0.3,draw:()=>blob(r*0.85,col)});});
   for(let i=0;i<10;i++)o.push({dx:(i-5)*14,dy:-90,h:14,rest:6,draw:()=>it.one()});
   for(let i=0;i<8;i++)o.push({dx:(i-4)*16,dy:40,h:12,rest:5,draw:()=>{c.beginPath();c.moveTo(-10,-6);c.lineTo(10,-8);c.lineTo(6,8);c.lineTo(-8,6);c.closePath();shape(it.base===cone?'#e3a95a':'#ff8fb8',3,O);}});return o;},
 decal(x,g){const k=Math.min(1,g*1.4);for(const [dx,cc] of [[-30,it.scoops[0][3]],[40,it.scoops[it.scoops.length-1][3]]]){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(110+Math.sin(i*2.7)*20)*k;c.lineTo(x+dx+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle=cc[1];c.globalAlpha=.85;c.fill();c.globalAlpha=1;}
   ell(x+60,H.FLOOR_Y+1,30*k,5*k);c.fillStyle=it.col;c.fill();}};}
function S(o,k=1.5){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
return {tag:'CHALLENGE #18',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#3a1f3a',wallBot:'#b85c8a',sky1:'#8fd3ff',sky2:'#fff3c4',night:false,floorA:'#fff3f8',floorB:'#ff8fb8'},
 objects:{fries:S(mk('fries')),ketchup:S(mk('ketchup')),pickles:S(mk('pickles')),cereal:S(mk('cereal'))},
 onTable(){const y=880;c.save();c.translate(150,y-40);c.scale(0.4,0.4);cone();scoop(0,-36,52,STR);c.restore();}};};
