// Video #17 — drink crimes
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#1e2a38';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
const GW=70,GH=150;
function glassPath(){c.beginPath();c.moveTo(-GW,-GH/2);c.lineTo(GW,-GH/2);c.lineTo(GW*0.82,GH/2);c.quadraticCurveTo(0,GH/2+10,-GW*0.82,GH/2);c.closePath();}
function drink(D){ // D: {a,b,mix,top,extra}
 glassPath();c.fillStyle='rgba(220,240,255,.25)';c.fill();
 c.save();glassPath();c.clip();const ly=-GH/2+22;c.fillStyle=lin(0,ly,0,GH/2,[[0,D.a],[1,D.b]]);c.fillRect(-GW,ly,GW*2,GH);
 if(D.swirl){c.strokeStyle=D.swirl;c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(-40,ly+10);c.bezierCurveTo(30,ly+30,-50,ly+60,20,ly+80);c.bezierCurveTo(60,ly+95,-20,ly+115,10,ly+125);c.stroke();c.lineWidth=4;c.globalAlpha=.6;c.beginPath();c.moveTo(30,ly+20);c.bezierCurveTo(-30,ly+50,40,ly+70,-20,ly+100);c.stroke();c.globalAlpha=1;}
 if(D.blobs){c.fillStyle=D.blobs;for(let i=0;i<12;i++){ell(-45+((i*37)%90),ly+20+((i*29)%100),7+(i%3)*3,5+(i%2)*2,i);c.fill();}}
 if(D.top){c.fillStyle=D.top;c.beginPath();c.ellipse(0,ly,GW*0.97,10,0,0,7);c.fill();for(let i=0;i<8;i++){ell(-50+i*14,ly-4,7,6);c.fill();}}
 // ice cubes + bubbles
 for(const [x,y,a] of [[-30,ly+16,0.3],[22,ly+30,-0.4]]){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-16,-16,32,32,5);c.fillStyle='rgba(255,255,255,.45)';c.fill();c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=2;c.stroke();c.restore();}
 c.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<9;i++){ell(-40+((i*31)%80),ly+50+((i*23)%80),2.5,2.5);c.fill();}
 c.restore();
 glassPath();c.lineWidth=5;c.strokeStyle=O;c.stroke();ell(0,-GH/2,GW,9);c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=3;c.stroke();
 gloss(-46,-10,8,48,0.08,.45);gloss(44,10,4,30,-0.08,.25);
 // straw + garnish
 c.save();c.translate(30,-GH/2-10);c.rotate(0.35);c.beginPath();c.roundRect(-6,-70,12,110,5);shape(D.straw||'#ff4d8d',3,O);c.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<5;i++)c.fillRect(-6,-66+i*22,12,8);c.restore();
 if(D.extra)D.extra();}
function shard(i){c.beginPath();c.moveTo(0,-12-(i%3)*5);c.lineTo(10+(i%2)*6,7);c.lineTo(-9,9);c.closePath();c.fillStyle='rgba(220,240,255,.75)';c.fill();c.strokeStyle='rgba(30,42,56,.7)';c.lineWidth=2;c.stroke();ell(-2,-2,2,1.5);c.fillStyle='#fff';c.fill();}
function mk(D){return {h:GH+20,w:GW*2,rot:-Math.PI*1.15,burst:600,up:1.3,spin:16,draw:()=>drink(D),
 parts(){const o=[];for(let i=0;i<16;i++)o.push({dx:((i*37)%140)-70,dy:((i*53)%140)-70,h:16,rest:6,draw:()=>shard(i)});
   for(let i=0;i<36;i++){const col=i%3?D.a:(D.swirl&&i%2?'#f6efe6':D.b);const r=8+(i%4)*4;o.push({dx:((i*41)%120)-60,dy:-40,h:r,rest:r*0.4,g:0.75,draw:()=>{c.beginPath();c.ellipse(0,0,r*1.25,r,0,0,7);c.fillStyle=col;c.globalAlpha=.92;c.fill();c.globalAlpha=1;c.lineWidth=2;c.strokeStyle='rgba(0,0,0,.25)';c.stroke();ell(-r*0.4,-r*0.35,r*0.35,r*0.22,-0.5);c.fillStyle='rgba(255,255,255,.8)';c.fill();}});}
   for(let i=0;i<2;i++)o.push({dx:(i?25:-25),dy:0,h:28,rest:14,draw:()=>{c.beginPath();c.roundRect(-14,-14,28,28,5);c.fillStyle='rgba(235,250,255,.85)';c.fill();c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=2;c.stroke();}});
   o.push({dx:30,dy:-80,h:12,rest:6,draw:()=>{c.save();c.rotate(1.4);c.beginPath();c.roundRect(-6,-50,12,100,5);shape(D.straw||'#ff4d8d',3,O);c.restore();}});return o;},
 decal(x,g){const k=Math.min(1,g*1.4);c.beginPath();for(let i=0;i<=28;i++){const a=i/28*Math.PI*2;const r=(120+Math.sin(i*2.7)*22+Math.sin(i*5.3)*10)*k;c.lineTo(x+Math.cos(a)*r*1.55,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle=lin(x-140,0,x+140,0,[[0,D.a],[1,D.b]]);c.globalAlpha=.9;c.fill();c.globalAlpha=1;
   if(D.swirl){c.strokeStyle=D.swirl;c.lineWidth=6;c.beginPath();c.ellipse(x+10,H.FLOOR_Y+2,70*k,7*k,0,0.3,4);c.stroke();}
   ell(x-30,H.FLOOR_Y-1,60*k,4);c.fillStyle='rgba(255,255,255,.55)';c.fill();for(let i=0;i<9;i++){ell(x-170*k+((i*67)%340)*k,H.FLOOR_Y+((i*5)%9)-3,10+(i%3)*4,4);c.fillStyle=i%2?D.a:D.b;c.fill();}}};}
const D1={a:'#4a2410',b:'#2a1206',swirl:'rgba(255,250,240,.85)',top:'#e9d8c4',straw:'#e5484d'};               // milk + cola
const D2={a:'#ffb347',b:'#8a4a1c',swirl:'rgba(90,45,15,.6)',straw:'#2fd15a',extra:()=>{c.save();c.translate(-60,-GH/2);c.rotate(-0.4);ell(0,0,26,26);shape(rad(-6,-6,2,28,[[0,'#ffd27a'],[1,'#ff8a00']]),3,O);for(let i=0;i<8;i++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(i*0.785)*20,Math.sin(i*0.785)*20);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;c.stroke();}c.restore();}}; // coffee + OJ
const D3={a:'#c8794a',b:'#8a3a1c',swirl:'rgba(214,40,31,.9)',straw:'#ffd21f',extra:()=>{c.save();c.translate(-58,-GH/2-6);ell(0,0,10,4);c.fillStyle='#d6281f';c.fill();c.restore();}}; // tea + ketchup
const D4={a:'#ff9a3c',b:'#e86a10',blobs:'rgba(255,248,235,.9)',straw:'#3b82f6'}; // juice + milk
function S(o,k=1.45){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
const OBJ={cola:S(mk(D1)),coffee:S(mk(D2)),tea:S(mk(D3)),juice:S(mk(D4))};
return {tag:'CHALLENGE #17',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#12324a',wallBot:'#2c6a8a',sky1:'#ff9a76',sky2:'#ffe1a8',night:false,floorA:'#f4ecdc',floorB:'#2c6a8a'},
 objects:OBJ,
 onTable(){const y=880;c.beginPath();c.roundRect(110,y-90,44,90,8);shape(lin(110,0,154,0,[[0,'#e5484d'],[1,'#a3121e']]),3,O);c.fillStyle='#fff';c.fillRect(110,y-60,44,16);
   c.beginPath();c.roundRect(180,y-110,50,110,10);shape(lin(180,0,230,0,[[0,'#ffffff'],[1,'#d5dbe6']]),3,O);c.fillStyle='#3b82f6';c.fillRect(180,y-80,50,22);}};};
