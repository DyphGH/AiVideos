// Video #34 — THEN vs NOW: four original retro gadgets (no brands) fall and smash: cassette (MIXTAPE), flip phone (RINGTONE),
// game console + controller (HIGH SCORE), 35mm film camera (SAY CHEESE). Synthwave window, lava lamp, floppies, neon strip on the beat.
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
const TL=await (await fetch('/timeline.json')).json();
// ---- UI overlay (DOM only, inside #ui so hideUI() still hides it) ----
{const ui=document.getElementById('ui'),tag=document.getElementById('tag');tag.style.top='34px';
 const pill=document.createElement('div');pill.id='onepct';pill.innerHTML='ONLY <b>1%</b> CAN DO IT';
 Object.assign(pill.style,{position:'absolute',top:'82px',left:'50%',transform:'translateX(-50%) rotate(-2deg)',padding:'8px 30px 6px',borderRadius:'99px',
  background:'#ffd23f',color:'#111',fontFamily:'Inter',fontWeight:'800',fontSize:'40px',letterSpacing:'2px',whiteSpace:'nowrap',boxShadow:'0 6px 0 rgba(0,0,0,.35),0 0 40px rgba(255,210,63,.45)',border:'4px solid #111'});
 ui.appendChild(pill);const st=document.createElement('style');st.textContent='#onepct b{color:#d6141f}.title{top:172px!important}';document.head.appendChild(st);
 const lbl=document.querySelector('.hud .lbl');if(lbl){lbl.innerHTML='<span style="color:var(--r)">&#9664; EARLY</span><span style="color:var(--g)">PERFECT</span><span style="color:var(--o)">LATE &#9654;</span>';
  Object.assign(lbl.style,{display:'flex',justifyContent:'space-between',fontSize:'24px',letterSpacing:'3px'});}
 const bar=document.querySelector('.hud .bar');if(bar){const t=document.createElement('div');Object.assign(t.style,{position:'absolute',left:'50%',top:'-6px',width:'4px',height:'26px',marginLeft:'-2px',background:'#0b0f0c',borderRadius:'2px',opacity:'.55'});bar.insertBefore(t,bar.firstChild);}}
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1408';const F=H.FLOOR_Y;const PI=Math.PI;
let FR=0,BEAT=0;   // timeline frame + quarter-note index of the music (set in onTable)
const hr=(a,b=0)=>{const s=Math.sin(a*12.9898+b*78.233)*43758.5453;return s-Math.floor(s);};
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function star(x,y,R,r,n=5){c.beginPath();for(let i=0;i<2*n;i++){const a=-PI/2+i*PI/n,rr=i%2?r:R;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function blob(r,i,n=9,j=.35){c.beginPath();for(let k=0;k<n;k++){const a=k/n*PI*2,rr=r*(1-j/2+j*hr(i,k));c.lineTo(Math.cos(a)*rr*1.15,Math.sin(a)*rr*.85);}c.closePath();}
// ---------- generic retro-plastic helpers ----------
function burst(x,g,c1,c2,yo=40,R=1){if(g>=1)return;c.save();c.globalAlpha=Math.min(1,(1-g)*1.7);c.lineCap='round';for(let i=0;i<16;i++){const a=-PI+i/15*PI,r0=70*g+30,r1=(110+260*g)*R;c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-yo+Math.sin(a)*r0*.9);c.lineTo(x+Math.cos(a)*r1,F-yo+Math.sin(a)*r1*.9);
  c.lineWidth=i%2?8:13;c.strokeStyle=i%2?c1:c2;c.stroke();}ell(x,F-yo,90*g+30,70*g+20);c.fillStyle='rgba(255,252,230,.6)';c.fill();c.restore();}
function puff(i,col='rgba(255,255,255,.8)'){blob(12+(i%3)*5,i,8,.3);c.fillStyle=col;c.fill();}
const PL={grey:['#d9dbe2','#9a9fb0'],dark:['#4a4f63','#22253a'],red:['#ff6b6b','#b01818'],blue:['#6fb3ff','#1d5fbf'],yel:['#ffe066','#d9a400'],pur:['#c4a2ff','#6b3fd6'],silver:['#f1f3f8','#8d94a6'],black:['#4b4b55','#17171f'],orange:['#ffb35c','#d9620b'],teal:['#7fe6d6','#16897a']};
const P=(k,x0,x1)=>lin(x0,0,x1,0,[[0,PL[k][1]],[.35,PL[k][0]],[.6,PL[k][0]],[1,PL[k][1]]]);
// plastic shard
function shardP(i,s,k){const w=(20+hr(i,1)*20)*s,h=(14+hr(i,2)*12)*s;c.beginPath();const p=[[-w,-h*.6],[-w*.2,-h-hr(i,3)*5],[w*.7,-h*.8],[w,h*.1],[w*.4,h],[-w*.5,h*.8],[-w*1.05,0]];p.forEach(([x,y])=>c.lineTo(x,y));c.closePath();
  shape(lin(0,-h,0,h,[[0,PL[k][0]],[1,PL[k][1]]]),3,O);c.beginPath();c.moveTo(-w*.6,-h*.4);c.lineTo(w*.3,-h*.6);c.lineWidth=2.5;c.strokeStyle='rgba(255,255,255,.55)';c.stroke();}
function screw(i){c.save();c.rotate(hr(i)*6);ell(0,0,6,6);shape('#c9ced8',2,O);c.beginPath();c.moveTo(-4,0);c.lineTo(4,0);c.lineWidth=2;c.strokeStyle=O;c.stroke();c.restore();}
function spring(i){c.save();c.rotate(hr(i,4)*6);c.beginPath();for(let t=0;t<=1;t+=.04)c.lineTo(-16+32*t,Math.sin(t*PI*8)*6);c.lineWidth=4.5;c.strokeStyle=O;c.stroke();c.lineWidth=2.5;c.strokeStyle='#e8ecf4';c.stroke();c.restore();}
function btn(i,col){c.save();c.rotate(hr(i,5)*1.2-.6);c.beginPath();c.roundRect(-9,-7,18,14,5);shape(col||['#ffffff','#ffd43b','#ff6b6b','#69db7c'][i%4],2.5,O);c.restore();}
function chip(i){c.save();c.rotate(hr(i,6)*6);c.beginPath();c.roundRect(-14,-9,28,18,3);shape('#2f9e44',2.5,O);c.fillStyle='#ffd43b';for(let k=0;k<4;k++)c.fillRect(-11+k*7,-5,3,10);c.restore();}
function tape(i,L=70){c.save();c.rotate(hr(i,2)*6);c.beginPath();c.moveTo(-L/2,0);for(let t=0;t<=1;t+=.05)c.lineTo(-L/2+L*t,Math.sin(t*PI*3+i)*14*(1-t*.4));c.lineCap='round';c.lineWidth=6;c.strokeStyle='#2a1408';c.stroke();c.lineWidth=3.5;c.strokeStyle='#8a4b1f';c.stroke();c.restore();}
function common(o,{shards=10,kinds=['grey'],screws=6,springs=3,btns=6,chips=2,puffs=5}={}){
  for(let i=0;i<shards;i++)o.push({dx:((i*37)%220)-110,dy:-40+((i*13)%90),h:12,rest:5,drag:.8,draw:()=>shardP(i,.7+(i%3)*.15,kinds[i%kinds.length])});
  for(let i=0;i<screws;i++)o.push({dx:((i*47)%160)-80,dy:-30,h:8,rest:4,drag:1.2,draw:()=>screw(i)});
  for(let i=0;i<springs;i++)o.push({dx:((i*53)%140)-70,dy:-10,h:8,rest:4,drag:1,draw:()=>spring(i)});
  for(let i=0;i<btns;i++)o.push({dx:((i*41)%200)-100,dy:-50+((i*17)%60),h:10,rest:5,drag:1,draw:()=>btn(i)});
  for(let i=0;i<chips;i++)o.push({dx:((i*59)%120)-60,dy:0,h:10,rest:5,drag:.9,draw:()=>chip(i)});
  for(let i=0;i<puffs;i++)o.push({dx:(i-puffs/2)*32,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i)});
  return o;}
function wreck(x,g,kinds,R=1,extra){burst(x,g,'#ffffff','#ff4fd8',40,R);const u=Math.min(1,g*1.3);
  ell(x,F+10,(150*u+30)*R,22);c.fillStyle='rgba(0,0,0,.24)';c.fill();
  for(let i=0;i<14;i++){c.save();c.translate(x+(hr(i,4)-.5)*200*R*(.5+.5*u),F-4-hr(i,5)*16*u);c.rotate((hr(i,6)-.5)*1.4);shardP(i+40,.8,kinds[i%kinds.length]);c.restore();}
  for(let i=0;i<10;i++){c.save();c.translate(x+((hr(i,1)-.5)*340*R)*(.4+.6*g),F+hr(i,2)*24-4);if(i%2)screw(i);else btn(i);c.restore();}
  if(extra)extra(x,u);}
// ================= 1 — CASSETTE TAPE =================
function reel(x,y,r,rot){c.save();c.translate(x,y);ell(0,0,r,r);shape('#ffffff',3,O);c.rotate(rot);for(let k=0;k<6;k++){c.rotate(PI/3);c.beginPath();c.roundRect(-3,r*.45,6,r*.4,2);c.fillStyle=O;c.fill();}ell(0,0,r*.38,r*.38);shape('#e9ecef',2.5,O);c.restore();}
function cassette(){const w=150,h=96;
  c.beginPath();c.roundRect(-w,-h,2*w,2*h,14);shape(P('dark',-w,w),5,O);
  for(const [sx,sy] of [[-w+16,-h+16],[w-16,-h+16],[-w+16,h-16],[w-16,h-16]]){c.save();c.translate(sx,sy);screw(sx*sy);c.restore();}
  c.beginPath();c.roundRect(-w+24,-h+22,2*w-48,96,8);shape(lin(0,-h+22,0,-h+118,[[0,'#ffe066'],[.5,'#ff9a3c'],[1,'#ff4fd8']]),4,O);
  c.fillStyle='rgba(42,20,8,.75)';c.font='800 22px Inter';c.textAlign='left';c.fillText('MIX  ★  SIDE A',-w+40,-h+48);
  c.beginPath();c.roundRect(-78,-36,156,52,22);shape('#1a1d2e',4,O);
  ell(-46,-10,30,30);c.fillStyle='#6b3a1a';c.fill();ell(46,-10,20,20);c.fillStyle='#6b3a1a';c.fill();
  reel(-46,-10,16,FR*.25);reel(46,-10,16,FR*.25);
  c.beginPath();c.roundRect(-24,-24,48,28,4);c.fillStyle='rgba(190,220,255,.35)';c.fill();
  c.beginPath();c.moveTo(-100,h);c.lineTo(-80,40);c.lineTo(80,40);c.lineTo(100,h);c.closePath();shape(P('dark',-100,100),4,O);
  for(const hx of [-50,-16,16,50]){ell(hx,68,7,7);c.fillStyle='#0b0d18';c.fill();}
  gloss(-w+40,-h+12,60,6,0,.35);}
const cassetteO={h:192,w:300,rot:-PI*0.85,burst:540,up:1.3,spin:12,draw:cassette,
  parts(){const o=[];
    for(const k of [-1,1])o.push({dx:k*60,dy:-40,h:40,rest:16,drag:.5,draw:()=>{c.beginPath();c.roundRect(-75,-45,150,90,12);shape(P('dark',-75,75),4,O);c.beginPath();c.roundRect(-60,-34,120,40,6);shape(lin(0,-34,0,6,[[0,'#ffe066'],[1,'#ff4fd8']]),3,O);}});
    for(const k of [-1,1])o.push({dx:k*46,dy:-10,h:34,rest:15,drag:.6,draw:()=>{ell(0,0,26,26);c.fillStyle='#6b3a1a';c.fill();reel(0,0,14,FR*.3*k);}});
    for(let i=0;i<9;i++)o.push({dx:((i*41)%180)-90,dy:-30+((i*29)%60),h:12,rest:4,drag:1.6,vmax:280,flut:80,g:.7,draw:()=>tape(i,60+(i%3)*25)});
    o.push({dx:0,dy:-10,h:14,rest:6,drag:.8,draw:()=>{c.beginPath();c.roundRect(-24,-14,48,28,4);c.fillStyle='rgba(190,220,255,.6)';c.fill();c.lineWidth=3;c.strokeStyle=O;c.stroke();}});
    return common(o,{shards:12,kinds:['dark','orange','dark'],screws:8,springs:2,btns:0,chips:0,puffs:5});},
  decal(x,g){wreck(x,g,['dark','orange'],1,(x,u)=>{for(let i=0;i<10;i++){c.save();c.translate(x+(hr(i,7)-.5)*300*u,F-6-hr(i,8)*10);tape(i+20,80+hr(i,9)*60);c.restore();}});}};
// ================= 2 — FLIP PHONE =================
function flip(){c.save();
  // bottom half (keypad)
  c.beginPath();c.roundRect(-62,4,124,150,[10,10,28,28]);shape(P('silver',-62,62),5,O);
  c.beginPath();c.roundRect(-50,14,100,124,14);shape('#dfe3ec',3,O);
  c.beginPath();c.roundRect(-20,18,40,22,8);shape(P('blue',-20,20),3,O);
  for(let r=0;r<4;r++)for(let k=0;k<3;k++){c.beginPath();c.roundRect(-42+k*30,48+r*21,24,15,6);shape('#ffffff',2.5,O);c.fillStyle=O;c.font='700 11px Mono';c.textAlign='center';c.fillText('123456789*0#'[r*3+k],-30+k*30,60+r*21);}
  // hinge
  c.beginPath();c.roundRect(-58,-8,116,20,10);shape(P('grey',-58,58),4,O);
  // top half (screen) slightly tilted back
  c.beginPath();c.roundRect(-58,-150,116,144,[26,26,10,10]);shape(P('silver',-58,58),5,O);
  c.beginPath();c.roundRect(-44,-132,88,96,10);shape('#1b1e2e',3,O);
  c.beginPath();c.roundRect(-38,-126,76,84,6);shape(lin(0,-126,0,-42,[[0,'#b6f08a'],[1,'#6fcf5a']]),2,'#3a5a2a');
  c.fillStyle='#24401a';c.font='700 13px Mono';c.textAlign='center';c.fillText('12:00',0,-108);c.fillText('▮▮▮▯',18,-120);
  // little snake game pixels on the screen
  for(let k=0;k<6;k++)c.fillRect(-26+k*7,-80,6,6);c.fillRect(16,-90,6,6);
  c.beginPath();c.roundRect(-16,-144,32,6,3);c.fillStyle='#1b1e2e';c.fill();
  // antenna
  c.beginPath();c.roundRect(34,-186,16,40,8);shape(P('dark',34,50),3.5,O);
  gloss(-40,-140,30,5,0,.5);c.restore();}
const flipO={h:340,w:130,rot:-PI*0.95,burst:560,up:1.35,spin:13,draw:()=>{c.save();c.translate(0,16);flip();c.restore();},
  parts(){const o=[];
    o.push({dx:0,dy:-70,h:50,rest:20,drag:.5,draw:()=>{c.beginPath();c.roundRect(-58,-72,116,144,[26,26,10,10]);shape(P('silver',-58,58),5,O);c.beginPath();c.roundRect(-38,-50,76,84,6);shape(lin(0,-50,0,34,[[0,'#b6f08a'],[1,'#6fcf5a']]),3,O);c.strokeStyle='#24401a';c.lineWidth=3;c.beginPath();c.moveTo(-30,-30);c.lineTo(10,20);c.moveTo(20,-40);c.lineTo(-6,6);c.stroke();}});
    o.push({dx:0,dy:70,h:50,rest:20,drag:.5,draw:()=>{c.beginPath();c.roundRect(-62,-75,124,150,[10,10,28,28]);shape(P('silver',-62,62),5,O);c.beginPath();c.roundRect(-50,-64,100,124,14);shape('#dfe3ec',3,O);}});
    o.push({dx:40,dy:-150,h:12,rest:8,drag:.8,draw:()=>{c.beginPath();c.roundRect(-8,-20,16,40,8);shape(P('dark',-8,8),3,O);}});
    o.push({dx:-20,dy:40,h:16,rest:8,drag:.7,draw:()=>{c.beginPath();c.roundRect(-36,-20,72,40,6);shape(P('blue',-36,36),3,O);c.fillStyle='#fff';c.font='800 12px Inter';c.textAlign='center';c.fillText('Li-ion',0,5);}});
    for(let i=0;i<12;i++)o.push({dx:((i*37)%120)-60,dy:20+((i*19)%90),h:8,rest:4,drag:1,draw:()=>btn(i+3,'#ffffff')});
    return common(o,{shards:10,kinds:['silver','grey'],screws:6,springs:2,btns:0,chips:2,puffs:5});},
  decal(x,g){wreck(x,g,['silver','grey'],1,(x,u)=>{for(let i=0;i<8;i++){c.save();c.translate(x+(hr(i,3)-.5)*240*u,F-2);btn(i+30,'#ffffff');c.restore();}});}};
// ================= 3 — RETRO GAME CONSOLE + controller =================
function consoleBox(){
  c.beginPath();c.roundRect(-150,-20,300,120,16);shape(P('grey',-150,150),5,O);
  c.beginPath();c.roundRect(-150,60,300,40,[0,0,16,16]);shape(P('dark',-150,150),4,O);
  c.strokeStyle='rgba(42,20,8,.35)';c.lineWidth=3;for(let k=0;k<6;k++){c.beginPath();c.moveTo(40+k*16,4);c.lineTo(40+k*16,48);c.stroke();}
  // cartridge sticking out
  c.beginPath();c.roundRect(-110,-86,130,80,[10,10,0,0]);shape(P('red',-110,20),4,O);
  c.beginPath();c.roundRect(-96,-76,102,46,6);shape(lin(0,-76,0,-30,[[0,'#ffe066'],[1,'#ff9a3c']]),3,O);
  c.fillStyle=O;c.font='800 16px Inter';c.textAlign='center';c.fillText('SUPER',-45,-56);c.fillText('JUMP 3',-45,-38);
  c.beginPath();c.roundRect(-128,-10,166,16,6);shape('#1b1e2e',3,O);
  // power + reset
  for(const [bx,col] of [[-120,'#ff6b6b'],[-80,'#ffffff']]){c.beginPath();c.roundRect(bx,68,32,18,6);shape(col,3,O);}
  ell(110,78,7,7);c.fillStyle=(FR%20<14)?'#ff3b3b':'#7a1010';c.fill();
  gloss(-100,-12,70,5,0,.45);}
function pad(){c.beginPath();c.roundRect(-70,-30,140,60,30);shape(P('grey',-70,70),4,O);
  c.fillStyle='#1b1e2e';c.fillRect(-48,-6,30,10);c.fillRect(-38,-16,10,30);
  ell(34,-6,9,9);shape('#ff6b6b',2.5,O);ell(52,6,9,9);shape('#ffd43b',2.5,O);
  c.beginPath();c.roundRect(-10,4,10,6,3);c.fillStyle='#1b1e2e';c.fill();c.beginPath();c.roundRect(4,4,10,6,3);c.fill();}
function consoleAll(){consoleBox();c.save();c.translate(60,150);c.rotate(-.06);pad();c.restore();
  c.beginPath();c.moveTo(130,40);c.bezierCurveTo(190,80,140,150,120,140);c.lineWidth=7;c.strokeStyle=O;c.stroke();c.lineWidth=4;c.strokeStyle='#5b6078';c.stroke();}
const consoleO={h:280,w:300,rot:-PI*0.9,burst:580,up:1.35,spin:11,draw:()=>{c.save();c.translate(0,-40);consoleAll();c.restore();},
  parts(){const o=[];
    o.push({dx:-40,dy:-120,h:40,rest:20,drag:.5,draw:()=>{c.beginPath();c.roundRect(-65,-40,130,80,[10,10,0,0]);shape(P('red',-65,65),4,O);c.beginPath();c.roundRect(-51,-30,102,46,6);shape(lin(0,-30,0,16,[[0,'#ffe066'],[1,'#ff9a3c']]),3,O);c.fillStyle=O;c.font='800 16px Inter';c.textAlign='center';c.fillText('SUPER',0,-10);c.fillText('JUMP 3',0,8);}});
    o.push({dx:60,dy:110,h:30,rest:15,drag:.6,draw:pad});
    for(const k of [-1,1])o.push({dx:k*70,dy:-20,h:40,rest:16,drag:.5,draw:()=>{c.beginPath();c.roundRect(-75,-30,150,60,12);shape(P('grey',-75,75),4,O);}});
    o.push({dx:0,dy:40,h:20,rest:10,drag:.6,draw:()=>{c.beginPath();c.roundRect(-150,-20,300,40,12);shape(P('dark',-150,150),4,O);}});
    for(let i=0;i<4;i++)o.push({dx:((i*53)%160)-80,dy:20,h:10,rest:5,drag:.9,draw:()=>chip(i+7)});
    return common(o,{shards:12,kinds:['grey','dark','red'],screws:8,springs:3,btns:6,chips:3,puffs:6});},
  decal(x,g){wreck(x,g,['grey','dark','red'],1.15,(x,u)=>{c.save();c.translate(x+120*u,F-14);c.rotate(.3);pad();c.restore();c.save();c.translate(x-90*u,F-20);c.rotate(-.5);c.scale(.8,.8);c.beginPath();c.roundRect(-65,-40,130,80,10);shape(P('red',-65,65),4,O);c.restore();});}};
// ================= 4 — FILM CAMERA =================
function camera(){
  c.beginPath();c.moveTo(-160,-40);c.lineTo(-120,-80);c.lineTo(-40,-80);c.lineTo(-20,-110);c.lineTo(40,-110);c.lineTo(60,-80);c.lineTo(160,-80);c.lineTo(160,-40);c.closePath();shape(P('silver',-160,160),5,O);
  c.beginPath();c.roundRect(-170,-50,340,160,18);shape(P('black',-170,170),5,O);
  // leatherette texture
  c.save();c.beginPath();c.roundRect(-160,-20,320,110,10);c.clip();for(let k=0;k<160;k++){ell(-160+hr(k,1)*320,-20+hr(k,2)*110,2,1.5);c.fillStyle='rgba(255,255,255,.07)';c.fill();}c.restore();
  // dials
  for(const dx of [-120,110]){c.beginPath();c.roundRect(dx-22,-104,44,26,6);shape(P('silver',dx-22,dx+22),4,O);c.strokeStyle='rgba(42,20,8,.45)';c.lineWidth=2;for(let k=0;k<6;k++){c.beginPath();c.moveTo(dx-18+k*7,-100);c.lineTo(dx-18+k*7,-82);c.stroke();}}
  c.beginPath();c.roundRect(122,-118,22,16,5);shape('#ff6b6b',3,O);
  // viewfinder window
  c.beginPath();c.roundRect(-10,-100,40,16,4);shape('#1b2b4a',3,O);
  // flash
  c.beginPath();c.roundRect(-150,-40,70,40,6);shape(lin(0,-40,0,0,[[0,'#ffffff'],[1,'#cfd6e6']]),3,O);c.strokeStyle='rgba(42,20,8,.25)';for(let k=0;k<5;k++){c.beginPath();c.moveTo(-145+k*14,-36);c.lineTo(-139+k*14,-4);c.stroke();}
  // lens
  ell(10,40,96,96);shape(P('silver',-86,106),5,O);ell(10,40,78,78);shape(P('black',-68,88),4,O);
  ell(10,40,58,58);shape(rad(-10,20,4,70,[[0,'#bfe4ff'],[.35,'#3d6fd1'],[.8,'#141a3a'],[1,'#05070f']]),4,O);
  ell(-8,22,16,10,-.6);c.fillStyle='rgba(255,255,255,.75)';c.fill();ell(30,62,8,5,-.6);c.fillStyle='rgba(255,180,255,.45)';c.fill();
  c.fillStyle='#e9ecef';c.font='700 12px Mono';c.textAlign='center';c.fillText('35mm',10,-48);
  gloss(-120,-70,40,5,0,.4);}
function film(i,L=120){c.save();c.rotate(hr(i,3)*6);c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(-L/2+L*t,Math.sin(t*PI*2+i)*12);c.lineCap='round';c.lineWidth=22;c.strokeStyle=O;c.stroke();c.lineWidth=17;c.strokeStyle='#8a4b1f';c.stroke();
  c.setLineDash([4,6]);c.lineWidth=13;c.strokeStyle='#f1d6a8';c.stroke();c.setLineDash([]);c.lineWidth=7;c.strokeStyle='#5a2e10';c.stroke();c.restore();}
const cameraO={h:240,w:340,rot:-PI*0.9,burst:620,up:1.35,spin:12,draw:()=>{c.save();c.translate(0,10);camera();c.restore();},
  parts(){const o=[];
    o.push({dx:10,dy:40,h:50,rest:24,drag:.5,draw:()=>{ell(0,0,96,96);shape(P('silver',-96,96),5,O);ell(0,0,58,58);shape(rad(-20,-20,4,70,[[0,'#bfe4ff'],[.35,'#3d6fd1'],[.8,'#141a3a'],[1,'#05070f']]),4,O);}});
    for(const k of [-1,1])o.push({dx:k*90,dy:-10,h:40,rest:16,drag:.5,draw:()=>{c.beginPath();c.roundRect(-80,-50,160,100,14);shape(P('black',-80,80),4,O);}});
    o.push({dx:-110,dy:-60,h:20,rest:10,drag:.7,draw:()=>{c.beginPath();c.roundRect(-35,-20,70,40,6);shape(lin(0,-20,0,20,[[0,'#ffffff'],[1,'#cfd6e6']]),3,O);}});
    o.push({dx:20,dy:-100,h:20,rest:10,drag:.7,draw:()=>{c.beginPath();c.moveTo(-60,10);c.lineTo(-40,-20);c.lineTo(40,-20);c.lineTo(60,10);c.closePath();shape(P('silver',-60,60),4,O);}});
    o.push({dx:-40,dy:30,h:24,rest:12,drag:.6,draw:()=>{c.beginPath();c.roundRect(-22,-34,44,68,10);shape(P('yel',-22,22),3.5,O);c.beginPath();c.roundRect(-12,-44,24,12,4);shape('#c9ced8',3,O);}});
    for(let i=0;i<6;i++)o.push({dx:((i*43)%220)-110,dy:-20+((i*31)%70),h:12,rest:5,drag:1.4,vmax:260,flut:70,g:.7,draw:()=>film(i,90+(i%3)*30)});
    for(let i=0;i<10;i++)o.push({dx:((i*29)%160)-80,dy:20,h:8,rest:4,drag:1.1,draw:()=>{c.save();c.rotate(hr(i)*6);c.beginPath();c.moveTo(-10,-7);c.lineTo(9,-9);c.lineTo(5,9);c.closePath();c.fillStyle='rgba(160,210,255,.8)';c.fill();c.lineWidth=2;c.strokeStyle=O;c.stroke();c.restore();}});
    return common(o,{shards:14,kinds:['black','silver','black'],screws:10,springs:3,btns:2,chips:2,puffs:7});},
  decal(x,g){wreck(x,g,['black','silver'],1.25,(x,u)=>{for(let i=0;i<5;i++){c.save();c.translate(x+(hr(i,11)-.5)*320*u,F-8);film(i+40,140);c.restore();}});}};
// ---------- room: synthwave sunset in the window, lava lamp, floppy disks, cube puzzle; neon strip on the beat ----------
function lava(x,y){c.save();c.translate(x,y);c.beginPath();c.moveTo(-18,0);c.lineTo(-30,-26);c.lineTo(30,-26);c.lineTo(18,0);c.closePath();shape(P('silver',-30,30),3.5,O);
  c.beginPath();c.moveTo(-26,-26);c.lineTo(-14,-112);c.lineTo(14,-112);c.lineTo(26,-26);c.closePath();shape(lin(0,-112,0,-26,[[0,'#ff9ad5'],[1,'#ff4fd8']]),3.5,O);
  c.save();c.clip();for(let k=0;k<4;k++){const yy=-40-((FR*1.2+k*30)%80);ell(Math.sin(FR*.05+k)*6,yy,8+(k%2)*4,10+(k%3)*3);c.fillStyle='#ffe066';c.fill();}c.restore();
  c.beginPath();c.moveTo(-14,-112);c.lineTo(-10,-124);c.lineTo(10,-124);c.lineTo(14,-112);c.closePath();shape(P('silver',-14,14),3,O);c.restore();}
function floppy(x,y,col,rot){c.save();c.translate(x,y);c.rotate(rot);c.beginPath();c.roundRect(-34,-34,68,68,4);shape(col,3,O);c.beginPath();c.roundRect(-18,-34,36,22,2);shape('#c9ced8',2.5,O);c.beginPath();c.roundRect(-24,4,48,26,3);shape('#ffffff',2.5,O);c.restore();}
function cube(x,y){c.save();c.translate(x,y);const C=['#ff6b6b','#ffd43b','#69db7c','#4dabf7','#ffffff','#ffa94d'];for(let r=0;r<3;r++)for(let k=0;k<3;k++){c.beginPath();c.roundRect(-30+k*20,-60+r*20,19,19,3);shape(C[(r*3+k+1)%6],2,O);}c.restore();}
function windowSynth(f){const wx=730,wy=430,ww=260,wh=330;c.save();c.beginPath();c.rect(wx,wy,ww,wh);c.clip();
  c.fillStyle=lin(0,wy,0,wy+wh,[[0,'#1a0b3d'],[.55,'#7a1fa2'],[.62,'#ff4fd8'],[1,'#1a0b3d']]);c.fillRect(wx,wy,ww,wh);
  const sx=wx+ww/2,sy=wy+wh*.56;c.save();ell(sx,sy,80,80);c.clip();c.fillStyle=lin(0,sy-80,0,sy,[[0,'#ffe066'],[1,'#ff4fd8']]);c.fillRect(sx-80,sy-80,160,80);c.fillStyle='#7a1fa2';for(let k=0;k<5;k++)c.fillRect(sx-80,sy-40+k*9,160,2+k);c.restore();
  c.fillStyle='#120630';c.fillRect(wx,sy,ww,wh);c.strokeStyle='rgba(255,79,216,.8)';c.lineWidth=2;
  for(let k=0;k<8;k++){const yy=sy+((k*k*4+f*.8)%(wh-(sy-wy)));c.beginPath();c.moveTo(wx,yy);c.lineTo(wx+ww,yy);c.stroke();}
  for(let k=-6;k<=6;k++){c.beginPath();c.moveTo(sx+k*8,sy);c.lineTo(sx+k*70,wy+wh);c.stroke();}
  for(let k=0;k<24;k++){ell(wx+hr(k,1)*ww,wy+hr(k,2)*wh*.45,1.4,1.4);c.fillStyle=`rgba(255,255,255,${.4+.6*Math.abs(Math.sin(f*.05+k))})`;c.fill();}
  c.restore();}
function neon(){const on=BEAT%2===0;c.save();c.lineCap='round';c.lineWidth=10;c.strokeStyle=on?'#ff4fd8':'#7a2b6e';c.shadowColor='#ff4fd8';c.shadowBlur=on?30:0;c.beginPath();c.moveTo(40,600);c.lineTo(660,600);c.stroke();
  c.strokeStyle=on?'#4dd4ff':'#1f5a6e';c.shadowColor='#4dd4ff';c.beginPath();c.moveTo(40,622);c.lineTo(660,622);c.stroke();c.restore();}
function onTable(f){FR=f;const f0=((f-TL.offset)%TL.total+TL.total)%TL.total;BEAT=Math.floor((f0-12+240)/7.5);
  const y=880;windowSynth(f);neon();lava(70,y);floppy(170,y-34,'#4dabf7',-.05);floppy(176,y-70,'#ff6b6b',.06);floppy(168,y-104,'#ffd43b',-.03);cube(260,y);}
return {tag:'CHALLENGE #34',ask:'WHICH ONE DID YOU OWN? &darr;',askStyle:{background:'#fff0fb',color:'#a3127f',border:'5px solid #a3127f',fontSize:'42px',left:'90px',right:'90px',boxShadow:'0 0 0 4px #fff0fb, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'RETRO SAVED!'},
 palette:{wallTop:'#1a0b3d',wallBot:'#4a1a6e',sky1:'#1a0b3d',sky2:'#7a1fa2',night:true,floorA:'#2a1a4a',floorB:'#4dd4ff'},
 objects:{cassette:cassetteO,flip:flipO,console:consoleO,camera:cameraO},onTable};};
