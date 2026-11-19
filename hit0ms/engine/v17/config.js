// Video #16 v2 — heist loot (detailed 2D)
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1a10';
function gloss(x,y,rx,ry,a=-0.4,o=.5){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
// ---- cash bill ----
function bill(w=58,h=28){c.beginPath();c.roundRect(-w/2,-h/2,w,h,3);shape(lin(-w/2,0,w/2,0,[[0,'#7fd39b'],[.5,'#b9eccb'],[1,'#5fbf82']]),2.5,'#1f5c34');
 c.strokeStyle='rgba(31,92,52,.6)';c.lineWidth=1.5;c.strokeRect(-w/2+4,-h/2+4,w-8,h-8);ell(0,0,h*0.3,h*0.3);c.fillStyle='rgba(31,92,52,.35)';c.fill();c.fillStyle='#1f5c34';c.font=`900 ${h*0.42}px Inter`;c.textAlign='center';c.textBaseline='middle';c.fillText('$',0,1);}
function stack(w=70,h=30,n=4){for(let i=n-1;i>=0;i--){c.save();c.translate(0,i*-5);bill(w,h);c.restore();}c.fillStyle='#f4e3b5';c.fillRect(-7,-h/2-(n-1)*5,14,h+(n-1)*5);c.strokeStyle='#8a6a2a';c.lineWidth=1.5;c.strokeRect(-7,-h/2-(n-1)*5,14,h+(n-1)*5);}
// ---- money bag (burlap sack, tied neck, big $) ----
function sack(){c.beginPath();c.moveTo(-40,-92);c.quadraticCurveTo(-30,-70,-58,-52);c.bezierCurveTo(-120,-20,-118,78,-70,96);c.quadraticCurveTo(0,116,70,96);c.bezierCurveTo(118,78,120,-20,58,-52);c.quadraticCurveTo(30,-70,40,-92);c.quadraticCurveTo(0,-82,-40,-92);c.closePath();
 shape(rad(-30,-10,10,140,[[0,'#e8cf9a'],[.6,'#c9a466'],[1,'#8f6a35']]),5,O);
 c.save();c.clip();c.strokeStyle='rgba(110,75,30,.25)';c.lineWidth=2;for(let i=-130;i<130;i+=9){c.beginPath();c.moveTo(i,-100);c.lineTo(i+20,120);c.stroke();}for(let y=-90;y<120;y+=9){c.beginPath();c.moveTo(-130,y);c.lineTo(130,y+6);c.stroke();}c.restore();
 // stitches + folds
 c.strokeStyle='rgba(90,60,20,.6)';c.lineWidth=3;c.setLineDash([8,7]);c.beginPath();c.moveTo(-96,40);c.quadraticCurveTo(0,92,96,40);c.stroke();c.setLineDash([]);
 c.strokeStyle='rgba(90,60,20,.45)';c.lineWidth=3;c.beginPath();c.moveTo(-30,-60);c.quadraticCurveTo(-20,-30,-34,-8);c.moveTo(26,-62);c.quadraticCurveTo(18,-36,30,-14);c.stroke();
 // big $
 c.font='900 120px Inter';c.textAlign='center';c.textBaseline='middle';c.lineWidth=10;c.strokeStyle='#14532d';c.strokeText('$',0,26);c.fillStyle='#2f9e57';c.fillText('$',0,26);
 // rope tie + top flaps + bills peeking
 for(const [x,a] of [[-26,-0.5],[0,0.1],[24,0.6]]){c.save();c.translate(x,-104);c.rotate(a);bill(46,22);c.restore();}
 c.beginPath();c.moveTo(-44,-100);c.quadraticCurveTo(-60,-126,-30,-120);c.quadraticCurveTo(0,-110,30,-120);c.quadraticCurveTo(60,-126,44,-100);c.closePath();shape(lin(0,-126,0,-100,[[0,'#d9bb80'],[1,'#a98446']]),4,O);
 c.beginPath();c.roundRect(-46,-90,92,16,8);shape(lin(0,-90,0,-74,[[0,'#b07a3a'],[1,'#7a4a1c']]),4,O);c.strokeStyle='rgba(255,230,180,.5)';c.lineWidth=2;for(let x=-40;x<40;x+=8){c.beginPath();c.moveTo(x,-88);c.lineTo(x+6,-76);c.stroke();}
 c.beginPath();c.moveTo(30,-82);c.quadraticCurveTo(60,-70,52,-48);c.lineWidth=7;c.strokeStyle='#7a4a1c';c.stroke();
 gloss(-60,10,14,34,0.2,.25);}
const bagO={h:230,w:240,rot:-Math.PI*1.1,burst:700,up:1.5,spin:10,draw:sack,
 parts(){const o=[{dx:0,dy:30,h:70,rest:28,draw:()=>{c.save();c.scale(1,0.45);sack();c.restore();}}];for(let i=0;i<34;i++)o.push({dx:((i*37)%160)-80,dy:-60-(i%5)*10,h:8,rest:3,g:0.22,drag:1.2,vmax:260,flut:120,draw:()=>bill(52,24)});return o;},
 decal(x,g){for(let i=0;i<10;i++){c.save();c.translate(x-120*g+((i*53)%240)*g,H.FLOOR_Y-2);c.scale(1,0.35);c.rotate(i*0.7);bill(52,24);c.restore();}}};
// ---- gold bars ----
function bar(w=120,h=44){c.beginPath();c.moveTo(-w/2,h/2);c.lineTo(w/2,h/2);c.lineTo(w/2-16,-h/2);c.lineTo(-w/2+16,-h/2);c.closePath();shape(lin(0,-h/2,0,h/2,[[0,'#fff2a8'],[.35,'#ffd23f'],[.7,'#e0a400'],[1,'#a86f00']]),4,'#5a3a00');
 c.beginPath();c.moveTo(-w/2+16,-h/2);c.lineTo(w/2-16,-h/2);c.lineTo(w/2-26,-h/2+8);c.lineTo(-w/2+26,-h/2+8);c.closePath();c.fillStyle='rgba(255,255,255,.55)';c.fill();
 c.beginPath();c.roundRect(-26,-6,52,18,3);c.strokeStyle='rgba(120,80,0,.6)';c.lineWidth=2;c.stroke();c.fillStyle='rgba(120,80,0,.7)';c.font='900 11px Inter';c.textAlign='center';c.textBaseline='middle';c.fillText('999.9',0,3);gloss(-30,6,16,3,0,.5);}
const BARS=[[-62,30],[62,30],[0,-14],[0,30]];
function goldPile(){for(const [x,y] of [[-62,30],[62,30],[0,30],[0,-14]]){c.save();c.translate(x,y);bar();c.restore();}for(let i=0;i<6;i++){const a=i*1.05;c.save();c.translate(Math.cos(a)*90,-30+Math.sin(a)*30);c.fillStyle='rgba(255,255,220,.9)';c.beginPath();for(let k=0;k<4;k++){const aa=k*Math.PI/2;c.lineTo(Math.cos(aa)*9,Math.sin(aa)*9);c.lineTo(Math.cos(aa+Math.PI/4)*3,Math.sin(aa+Math.PI/4)*3);}c.fill();c.restore();}}
const goldO={h:100,w:250,rot:-Math.PI*0.6,burst:360,up:0.8,spin:6,draw:goldPile,
 parts(){return BARS.map(([x,y])=>({dx:x,dy:y,h:44,rest:22,draw:()=>bar()}));},
 decal(x,g){ell(x,H.FLOOR_Y+2,130*g,10*g);c.fillStyle='rgba(255,210,60,.25)';c.fill();}};
// ---- diamond (brilliant cut) ----
function gem(s=1){c.save();c.scale(s,s);const P=[[-80,-20],[-50,-56],[50,-56],[80,-20],[0,80]];
 c.beginPath();c.moveTo(-80,-20);c.lineTo(-50,-56);c.lineTo(50,-56);c.lineTo(80,-20);c.lineTo(0,82);c.closePath();shape(lin(-80,-56,80,80,[[0,'#e9fbff'],[.4,'#7fe0ff'],[.7,'#2fb3e6'],[1,'#e9fbff']]),5,'#0a3a5a');
 const F=[[[-80,-20],[-50,-56],[-26,-20]],[[-26,-20],[-50,-56],[0,-56]],[[-26,-20],[0,-56],[26,-20]],[[26,-20],[0,-56],[50,-56]],[[26,-20],[50,-56],[80,-20]],[[-80,-20],[-26,-20],[0,82]],[[-26,-20],[26,-20],[0,82]],[[26,-20],[80,-20],[0,82]]];
 F.forEach((f,i)=>{c.beginPath();f.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=['rgba(255,255,255,.55)','rgba(180,240,255,.35)','rgba(255,255,255,.7)','rgba(120,210,255,.3)','rgba(220,250,255,.5)','rgba(40,150,210,.35)','rgba(200,245,255,.25)','rgba(20,110,170,.4)'][i];c.fill();c.strokeStyle='rgba(10,58,90,.5)';c.lineWidth=2;c.stroke();});
 for(const [x,y,r] of [[-30,-40,10],[40,-30,7],[-10,20,6]]){c.save();c.translate(x,y);c.fillStyle='#fff';c.beginPath();for(let k=0;k<4;k++){const aa=k*Math.PI/2;c.lineTo(Math.cos(aa)*r,Math.sin(aa)*r);c.lineTo(Math.cos(aa+Math.PI/4)*r*0.3,Math.sin(aa+Math.PI/4)*r*0.3);}c.fill();c.restore();}c.restore();}
const gemO={h:140,w:170,rot:-Math.PI*1.25,burst:420,up:1.6,spin:12,draw:()=>gem(1),
 parts(){const o=[{dx:0,dy:0,h:140,rest:52,draw:()=>gem(0.95)}];for(let i=0;i<12;i++)o.push({dx:(i-6)*16,dy:60,h:8,rest:4,draw:()=>{c.fillStyle=i%2?'#d9cdb8':'#2a1a3a';c.beginPath();c.moveTo(-6,-4);c.lineTo(6,-6);c.lineTo(4,5);c.lineTo(-5,4);c.closePath();c.fill();}});return o;},
 decal(x,g){c.save();c.strokeStyle='rgba(15,5,25,.95)';c.lineWidth=7;c.lineCap='round';const n=9;for(let i=0;i<n;i++){const a=Math.PI*(i/(n-1))*1.0+Math.PI*0.0;let px=x,py=H.FLOOR_Y+2;c.beginPath();c.moveTo(px,py);const L=(170+((i*37)%110))*Math.min(1,g*2.2);for(let k=1;k<=4;k++){px=x+Math.cos(a)*L*k/4*1.6+((i*k*13)%14-7);py=H.FLOOR_Y+2+Math.sin(a)*L*k/4*0.22+((i*k*7)%8-4);c.lineTo(px,py);}c.stroke();c.save();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;c.translate(0,-3);c.stroke();c.restore();
   if(i%2===0){c.lineWidth=2;c.beginPath();c.moveTo(x+Math.cos(a)*L*0.8,H.FLOOR_Y+2+Math.sin(a)*L*0.1);c.lineTo(x+Math.cos(a+0.3)*L*1.1,H.FLOOR_Y+2+Math.sin(a+0.3)*L*0.16);c.stroke();c.lineWidth=4;}}
   ell(x,H.FLOOR_Y+3,46*Math.min(1,g*2),9*Math.min(1,g*2));c.fillStyle='rgba(15,5,25,.85)';c.fill();c.restore();}};
// ---- briefcase (opens on impact) ----
function caseBody(){c.beginPath();c.roundRect(-120,-60,240,120,14);shape(lin(0,-60,0,60,[[0,'#3a3f47'],[.5,'#22262c'],[1,'#121418']]),5,'#000');
 c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=3;c.beginPath();c.roundRect(-110,-50,220,100,10);c.stroke();c.fillStyle='#c9ccd2';c.fillRect(-120,-6,240,6);
 for(const x of [-70,70]){c.beginPath();c.roundRect(x-16,-14,32,22,4);shape(lin(0,-14,0,8,[[0,'#ffe27a'],[1,'#b8860b']]),3,'#5a4000');}
 c.beginPath();c.moveTo(-40,-60);c.lineTo(-40,-82);c.quadraticCurveTo(0,-100,40,-82);c.lineTo(40,-60);c.lineWidth=12;c.strokeStyle='#111';c.stroke();c.lineWidth=6;c.strokeStyle='#3a3f47';c.stroke();gloss(-80,-38,40,6,0,.15);}
const caseO={h:150,w:250,rot:-Math.PI*0.95,burst:520,up:1.3,spin:8,draw:caseBody,
 parts(){const o=[];for(let i=0;i<22;i++)o.push({dx:((i*41)%200)-100,dy:-40,h:8,rest:3,g:0.22,drag:1.2,vmax:240,flut:110,draw:()=>bill(52,24)});return o;},
 decal(x,g){const y=H.FLOOR_Y;const open=Math.min(1,g*1.3);c.save();c.translate(x,y-30);
   // base tray with cash stacks
   c.beginPath();c.roundRect(-125,-20,250,50,10);shape(lin(0,-20,0,30,[[0,'#2a2e35'],[1,'#0f1114']]),5,'#000');c.beginPath();c.roundRect(-112,-16,224,30,6);c.fillStyle='#5a1a1a';c.fill();
   for(let i=0;i<4;i++){c.save();c.translate(-84+i*56,-6);stack(50,22,4);c.restore();}
   // lid rotating open (back)
   c.save();c.translate(0,-20);c.scale(1,-Math.max(0.15,open));c.beginPath();c.roundRect(-125,0,250,90,12);shape(lin(0,0,0,90,[[0,'#3a3f47'],[1,'#16181c']]),5,'#000');c.beginPath();c.roundRect(-112,8,224,74,8);c.fillStyle='#6a1f1f';c.fill();c.restore();
   c.restore();}};
return {tag:'CHALLENGE #16',ask:'WHICH ONE WOULD YOU STEAL? &darr;',askStyle:{background:'#ff2e88',color:'#fff'},
 secret:{title:'WASTED',color:'#ff3b3b',gray:true,border:'#ff3b3b'},
 palette:{wallTop:'#2b1055',wallBot:'#b8337a',sky1:'#ff6a5f',sky2:'#ffc36b',night:false,floorA:'#20163a',floorB:'#ff2e88'},
 objects:{bag:bagO,gold:goldO,diamond:gemO,brief:caseO},
 onTable(){c.save();c.translate(150,862);stack(64,28,5);c.restore();c.save();c.translate(250,868);c.scale(0.45,0.45);bar();c.restore();
   c.save();c.font='900 120px Inter';c.textAlign='center';c.shadowColor='#ff2e88';c.shadowBlur=40;c.fillStyle='#ff7ab8';c.fillText('$',150,520);c.restore();}};};
