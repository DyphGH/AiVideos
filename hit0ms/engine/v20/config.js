// Video #19 — snack crimes
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1a10';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function q(p0,cp,p1,t){const u=1-t;return [u*u*p0[0]+2*u*t*cp[0]+t*t*p1[0],u*u*p0[1]+2*u*t*cp[1]+t*t*p1[1]];}
function zig(pts,col,w=9){c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=w+4;c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=w*0.3;c.stroke();}
function flag(t,x=70,y=-120){c.save();c.translate(x,y);c.strokeStyle='#8a6a40';c.lineWidth=4;c.beginPath();c.moveTo(0,46);c.lineTo(0,-34);c.stroke();c.font='900 20px Inter';const W=Math.max(120,c.measureText(t).width+26);c.beginPath();c.roundRect(-4,-52,W,36,8);shape('#ffffff',3,O);c.fillStyle='#e5484d';c.font='900 20px Inter';c.textAlign='center';c.textBaseline='middle';c.fillText(t,W/2-4,-34);c.restore();}
// ---- banana + mayo ----
const BA=[95,-45],BC=[0,45],BB=[-95,-35];
function banana(){c.beginPath();c.moveTo(-95,-35);c.quadraticCurveTo(0,125,95,-45);c.quadraticCurveTo(0,30,-95,-35);c.closePath();shape(lin(0,-20,0,60,[[0,'#fff28a'],[.5,'#ffd92e'],[1,'#d9a400']]),5,O);
 c.strokeStyle='rgba(150,100,0,.45)';c.lineWidth=3;c.beginPath();c.moveTo(-80,-20);c.quadraticCurveTo(0,96,82,-32);c.stroke();
 c.fillStyle='rgba(110,70,10,.55)';for(const [x,y,r] of [[-40,30,4],[-10,48,3],[30,40,5],[56,20,3],[12,54,3]]){ell(x,y,r,r*0.7);c.fill();}
 c.save();c.translate(95,-45);c.rotate(-0.6);c.beginPath();c.roundRect(-5,-22,12,24,3);shape('#7a5a1a',3,O);c.fillStyle='#3a2a0a';c.fillRect(-5,-24,12,6);c.restore();
 ell(-96,-35,7,6);c.fillStyle='#3a2a0a';c.fill();gloss(-20,30,30,5,0.2,.45);
 const P=[];for(let i=0;i<=10;i++){const [x,y]=q(BA,[0,48],BB,0.15+i*0.07);P.push([x,y+(i%2?-7:6)]);}zig(P,'#fffbea',7);
 for(const t of [.3,.55,.75]){const [x,y]=q(BA,[0,48],BB,t);ell(x,y+8,6,8);c.fillStyle='#fffbea';c.fill();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=2;c.stroke();}
 flag('+ MAYO',40,-70);}
// ---- watermelon + mustard ----
function melon(){c.beginPath();c.moveTo(-92,30);c.quadraticCurveTo(0,92,92,30);c.lineTo(0,-96);c.closePath();shape(lin(0,30,0,80,[[0,'#3fbf4a'],[1,'#1d6b25']]),5,'#103a14');
 c.beginPath();c.moveTo(-82,26);c.quadraticCurveTo(0,78,82,26);c.lineTo(0,-86);c.closePath();c.fillStyle='#f4f7d6';c.fill();
 c.beginPath();c.moveTo(-74,20);c.quadraticCurveTo(0,66,74,20);c.lineTo(0,-82);c.closePath();c.fillStyle=lin(0,-82,0,60,[[0,'#ff6b7a'],[1,'#e8283f']]);c.fill();
 c.fillStyle='#1b0d0a';for(const [x,y,a] of [[-30,0,.4],[0,14,0],[30,0,-.4],[-14,-30,.3],[14,-30,-.3],[0,-56,0],[-46,24,.5],[46,24,-.5]]){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.moveTo(0,-7);c.quadraticCurveTo(6,2,0,7);c.quadraticCurveTo(-6,2,0,-7);c.fill();c.restore();}
 c.strokeStyle='rgba(16,58,20,.5)';c.lineWidth=3;for(const x of [-50,-20,15,48]){c.beginPath();c.moveTo(x,40+Math.abs(x)*-0.15);c.lineTo(x+6,58+Math.abs(x)*-0.3);c.stroke();}
 gloss(-26,-20,8,26,0.4,.3);
 const P=[];for(let i=0;i<=10;i++)P.push([-56+i*11.5,-20+i*2+(i%2?-12:10)]);zig(P,'#ffc61a',10);
 flag('+ MUSTARD',36,-96);}
// ---- donut + hot sauce ----
function donut(){c.beginPath();c.ellipse(0,0,88,80,0,0,7);c.ellipse(0,-4,26,22,0,0,7,true);shape(rad(-20,-20,10,95,[[0,'#f7c98a'],[.7,'#d9954a'],[1,'#a8642a']]),5,O);
 c.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2;const r=74+Math.sin(i*1.7)*6+(i%5===0?8:0);c.lineTo(Math.cos(a)*r,Math.sin(a)*r*0.9-6);}c.closePath();c.ellipse(0,-4,34,30,0,0,7,true);shape(rad(-20,-30,5,80,[[0,'#ffc2dc'],[1,'#ff5fa2']]),4,'#8a1f52');
 const SC=['#ffffff','#ffd43b','#4dabf7','#69db7c','#845ef7'];for(let i=0;i<26;i++){const a=i*2.39,r=44+(i*13)%26;c.save();c.translate(Math.cos(a)*r,Math.sin(a)*r*0.88-6);c.rotate(i*1.3);c.fillStyle=SC[i%5];c.beginPath();c.roundRect(-6,-2,12,4,2);c.fill();c.restore();}
 gloss(-40,-44,22,8,-0.5,.55);
 const P=[];for(let i=0;i<=9;i++)P.push([-66+i*14.5,-40+i*7+(i%2?-12:12)]);zig(P,'#d61f1f',9);
 for(const [x,l] of [[-58,26],[40,34]]){c.beginPath();c.moveTo(x-6,-10);c.lineTo(x-5,l);c.arc(x,l,6,Math.PI,0,true);c.lineTo(x+6,-10);c.fillStyle='#d61f1f';c.fill();}
 c.save();c.translate(56,-70);c.rotate(0.5);c.beginPath();c.moveTo(-30,0);c.quadraticCurveTo(0,-22,32,-6);c.quadraticCurveTo(6,14,-30,0);shape(lin(0,-20,0,10,[[0,'#ff5a4a'],[1,'#b3120c']]),3,'#5a0806');c.beginPath();c.moveTo(32,-6);c.quadraticCurveTo(44,-14,42,-26);c.lineWidth=6;c.strokeStyle='#2f9e44';c.stroke();gloss(-4,-8,12,3,-0.2,.6);c.restore();
 flag('+ HOT SAUCE',-40,-104);}
// ---- sandwich cookie + ketchup ----
function disc(y,h){c.beginPath();c.ellipse(0,y+h,84,22,0,0,Math.PI);c.lineTo(-84,y);c.ellipse(0,y,84,22,0,Math.PI,0,true);c.closePath();shape(lin(-84,0,84,0,[[0,'#3a2a22'],[.4,'#24160f'],[1,'#120a06']]),4,'#000');
 c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=2;for(let x=-76;x<=76;x+=8){c.beginPath();c.moveTo(x,y+Math.sqrt(1-(x/84)**2)*22-2);c.lineTo(x,y+h+Math.sqrt(1-(x/84)**2)*22-2);c.stroke();}}
function cookie(){disc(30,26);c.beginPath();c.ellipse(0,30,82,21,0,0,Math.PI);c.lineTo(-82,18);c.ellipse(0,18,82,21,0,Math.PI,0,true);c.closePath();shape(lin(0,10,0,50,[[0,'#ffffff'],[1,'#e8e2d6']]),3,'#8a8070');
 disc(-12,26);c.beginPath();c.ellipse(0,-12,84,22,0,0,7);shape(rad(-20,-20,4,90,[[0,'#3e2c22'],[1,'#1a0f09']]),4,'#000');
 c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=2.5;c.beginPath();c.ellipse(0,-12,62,16,0,0,7);c.stroke();c.beginPath();c.ellipse(0,-12,28,7,0,0,7);c.stroke();for(let i=0;i<16;i++){const a=i/16*Math.PI*2;ell(Math.cos(a)*73,-12+Math.sin(a)*19,3,1.6);c.fillStyle='rgba(255,255,255,.2)';c.fill();}
 c.beginPath();for(let i=0;i<=18;i++){const a=i/18*Math.PI*2;const r=44+Math.sin(i*2.3)*9;c.lineTo(10+Math.cos(a)*r,-16+Math.sin(a)*r*0.3);}c.closePath();shape(lin(0,-30,0,0,[[0,'#ff4a3a'],[1,'#b5140c']]),3,'#5a0806');gloss(-6,-22,18,4,0,.55);
 for(const [x,l] of [[-24,40],[34,58]]){c.beginPath();c.moveTo(x-7,-6);c.lineTo(x-6,l);c.arc(x,l,7,Math.PI,0,true);c.lineTo(x+7,-6);c.fillStyle='#c8180f';c.fill();c.strokeStyle='#5a0806';c.lineWidth=2;c.stroke();}
 flag('+ KETCHUP',20,-70);}
// ---- generic splat item ----
function blob(r,col){c.beginPath();for(let i=0;i<=12;i++){const a=i/12*Math.PI*2,rr=r*(0.75+0.3*Math.sin(i*1.9));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*0.75);}c.closePath();c.fillStyle=col;c.fill();c.lineWidth=2;c.strokeStyle='rgba(0,0,0,.28)';c.stroke();gloss(-r*0.3,-r*0.3,r*0.28,r*0.12,-0.5,.65);}
function mk(I){return {h:I.h,w:I.w,rot:-Math.PI*1.15,burst:620,up:1.3,spin:14,draw:I.draw,
 parts(){const o=[];I.chunks.forEach(([n,fn,h])=>{for(let i=0;i<n;i++)o.push({dx:((i*47+n*13)%140)-70,dy:((i*31)%80)-40,h,rest:h*0.45,draw:()=>fn(i)});});
   for(let i=0;i<34;i++){const col=I.cols[i%I.cols.length];const r=7+(i%4)*4;o.push({dx:((i*41)%120)-60,dy:-30,h:r,rest:r*0.4,g:0.75,draw:()=>blob(r,col)});}return o;},
 decal(x,g){const k=Math.min(1,g*1.4);c.beginPath();for(let i=0;i<=28;i++){const a=i/28*Math.PI*2;const r=(115+Math.sin(i*2.7)*22+Math.sin(i*5.3)*10)*k;c.lineTo(x+Math.cos(a)*r*1.5,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle=I.pud[0];c.globalAlpha=.9;c.fill();c.globalAlpha=1;
   c.beginPath();for(let i=0;i<=20;i++){const a=i/20*Math.PI*2;const r=(60+Math.sin(i*3.1)*14)*k;c.lineTo(x+30+Math.cos(a)*r*1.4,H.FLOOR_Y+1+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle=I.pud[1];c.fill();
   ell(x-30,H.FLOOR_Y-1,55*k,4);c.fillStyle='rgba(255,255,255,.5)';c.fill();for(let i=0;i<9;i++){ell(x-170*k+((i*67)%340)*k,H.FLOOR_Y+((i*5)%9)-3,9+(i%3)*4,4);c.fillStyle=I.cols[i%I.cols.length];c.fill();}}};}
const peel=i=>{c.save();c.rotate(i);c.beginPath();c.moveTo(-26,-6);c.quadraticCurveTo(0,14,26,-8);c.quadraticCurveTo(0,4,-26,-6);shape('#ffd92e',3,O);c.restore();};
const mush=i=>{blob(12+(i%3)*3,'#fff1c2');};
const rind=i=>{c.beginPath();c.moveTo(-22,0);c.quadraticCurveTo(0,12,22,0);c.lineTo(0,-20);c.closePath();shape('#ff4d5e',3,'#7a0a18');c.beginPath();c.moveTo(-22,0);c.quadraticCurveTo(0,12,22,0);c.lineWidth=6;c.strokeStyle='#2f9e44';c.stroke();};
const seed=i=>{c.beginPath();c.moveTo(0,-6);c.quadraticCurveTo(5,2,0,6);c.quadraticCurveTo(-5,2,0,-6);c.fillStyle='#1b0d0a';c.fill();};
const dhalf=i=>{c.save();c.rotate(i*2);c.beginPath();c.arc(0,0,40,Math.PI,0);c.arc(0,0,14,0,Math.PI,true);c.closePath();shape('#e0a25a',3,O);c.beginPath();c.arc(0,-3,34,Math.PI,0);c.arc(0,-3,17,0,Math.PI,true);c.closePath();c.fillStyle='#ff6fae';c.fill();c.restore();};
const spr=i=>{c.save();c.rotate(i);c.fillStyle=['#fff','#ffd43b','#4dabf7','#69db7c','#845ef7'][i%5];c.beginPath();c.roundRect(-7,-2.5,14,5,2);c.fill();c.restore();};
const frag=i=>{c.save();c.rotate(i*1.7);c.beginPath();c.moveTo(-18,-10);c.lineTo(16,-14);c.lineTo(20,8);c.lineTo(-6,16);c.lineTo(-20,6);c.closePath();shape('#24160f',3,'#000');c.restore();};
const cream=i=>blob(10,'#fbf7ee');
const ITEMS={
 banana:{h:150,w:200,draw:()=>{c.save();c.translate(0,40);banana();c.restore();},chunks:[[2,peel,22],[10,mush,22]],cols:['#fffbea','#fffbea','#fff1c2'],pud:['rgba(255,251,234,.95)','#ffe680']},
 melon:{h:190,w:190,draw:()=>{c.save();c.translate(0,34);melon();c.restore();},chunks:[[8,rind,26],[18,seed,8]],cols:['#ff4d5e','#e8283f','#ffc61a','#ff6b7a'],pud:['rgba(232,40,63,.85)','#ffc61a']},
 donut:{h:170,w:180,draw:()=>{c.save();c.translate(0,5);donut();c.restore();},chunks:[[2,dhalf,40],[24,spr,6]],cols:['#d61f1f','#ff6fae','#d61f1f','#e0a25a'],pud:['rgba(214,31,31,.85)','#ff8cc0']},
 cookie:{h:130,w:175,draw:()=>{c.save();c.translate(0,-13);cookie();c.restore();},chunks:[[12,frag,22],[6,cream,14]],cols:['#c8180f','#ff4a3a','#24160f','#fbf7ee'],pud:['rgba(200,24,15,.9)','#24160f']}};
function S(o,k=1.45){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
const OBJ={};for(const k in ITEMS)OBJ[k]=S(mk(ITEMS[k]));
return {tag:'CHALLENGE #19',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#0f3d2e',wallBot:'#2f8a5f',sky1:'#ff9a76',sky2:'#ffe1a8',night:false,floorA:'#f6eedd',floorB:'#2f8a5f'},
 objects:OBJ,
 onTable(){const y=880;c.beginPath();c.roundRect(110,y-100,46,100,10);shape(lin(110,0,156,0,[[0,'#ffd43b'],[1,'#e0a400']]),3,O);c.beginPath();c.moveTo(122,y-100);c.lineTo(133,y-126);c.lineTo(144,y-100);c.closePath();shape('#e5484d',3,O);
   c.beginPath();c.roundRect(180,y-80,60,80,10);shape(lin(180,0,240,0,[[0,'#ffffff'],[1,'#dfe3ea']]),3,O);c.beginPath();c.roundRect(176,y-92,68,16,5);shape('#3b82f6',3,O);c.fillStyle='#3b82f6';c.font='900 13px Inter';c.textAlign='center';c.fillText('MAYO',210,y-36);}};};
