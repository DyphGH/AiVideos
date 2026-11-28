// Video #41 — CHRISTMAS TREATS ("Christmas only works with food"): four original Christmas foods (no brands) fall off the table and smash
// Secret words climb from the snack to the legend (each one cosier / rarer than the last): CRUNCH -> COZY -> MINTY -> LEGEND
//  1 GIANT GINGERBREAD MAN COOKIE — the v33 gingerbread man at 3x: icing smile + eyes, zig-zag icing cuffs, 3 gumdrop buttons,
//    red icing bow tie, rosy cheeks -> snaps into real cookie pieces (head with the face, both arms, both legs, belly; jagged
//    clip edges with a raw-dough rim), gumdrop buttons bounce, gingerbread slabs + crumbs + sugar stars + powdered-sugar puffs   word CRUNCH
//  2 CHRISTMAS MUG OF HOT CHOCOLATE — red mug with white snowflakes, green polka band, gold rim, whipped-cream swirl with cocoa
//    dust, 3 marshmallows, candy cane hooked on the rim, steam -> ceramic shards (red with cream inside), handle snaps off,
//    bottom half stays, candy cane flies, marshmallows bounce, cocoa drops + puddle with a cream splat                            word COZY
//  3 GIANT CANDY CANE — glossy peppermint stripes, green ribbon bow with a berry -> SHATTERS like sugar glass: the hook flies
//    off whole, the stick snaps in 3, striped shards, peppermint candies, red/white glass slivers, mint dust, sparkle on the floor word MINTY
//  4 LEGEND: GOLDEN CHRISTMAS PUDDING — dark fruity dome (raisins, cherries, orange peel), thick white icing with drips, holly
//    + 3 berries on top, gold-rimmed plate, golden glow + twinkling sparkles -> heavy SPLAT: pudding chunks with icing, raisins,
//    icing blobs, holly leaves, berries, gold plate shards, gold sparkle shower; a squashed pudding + icing pile stays on the floor word LEGEND
// Christmas UI (no engine change): "ONLY 1% CAN DO IT" pill + EARLY / PERFECT / LATE labels (v32), catch card "TREAT SAVED!",
// green wall with Christmas lights that blink on the beat (audio.py: synthesized Jingle Bells, public domain — same timing as
// v34/v38 so every impact lands on a beat), snow in the window, table: COOKIES jar, plate of mini gingerbread men, mini mug.
// Red/cream checker floor. Loop-seamless (240 frames, timeline = v38 timing). Helpers copied from v34 (gingerbread) + v33 (mug).
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
const ICE='#fffdf8';
const GB=(x0,x1)=>lin(x0,0,x1,0,[[0,'#7f3f12'],[.28,'#c97a3a'],[.55,'#b9692c'],[1,'#723510']]);
const GUMS=[['#ff6b6b','#b01818'],['#69db7c','#1f7a34'],['#ffd43b','#c27c00'],['#b197fc','#5f3dc4'],['#ffa94d','#c2410c'],['#4dabf7','#1864ab'],['#f783ac','#a61e4d']];
const WAF=['#ffc9de','#b2f2bb','#fff3bf','#e5dbff','#c5f6fa'];
function grain(x,y,w,h,n,s){for(let k=0;k<n;k++){ell(x+hr(k,s)*w,y+hr(k,s+.37)*h,1.8,1.3);c.fillStyle='rgba(80,35,8,.35)';c.fill();}}
function pipe(path,w=6){path();c.lineCap='round';c.lineJoin='round';c.lineWidth=w+4;c.strokeStyle=O;c.stroke();c.lineWidth=w;c.strokeStyle=ICE;c.stroke();}
// icing edge with drips hanging down from the segment (x0,y0)-(x1,y1)
function drips(x0,y0,x1,y1,n,s,th=8){c.beginPath();c.moveTo(x0,y0-3);c.lineTo(x1,y1-3);const P=t=>[x0+(x1-x0)*t,y0+(y1-y0)*t];
  for(let k=n;k>0;k--){const [xa,ya]=P(k/n),[xb,yb]=P((k-1)/n),[xm,ym]=P((k-.5)/n);const L=th+(hr(k,s)>.4?5+hr(k,s+1)*15:2);
    c.lineTo(xa,ya+th);c.bezierCurveTo(xm+(xa-xm)*.45,ym+th,xm+(xa-xm)*.5,ym+L,xm,ym+L);c.bezierCurveTo(xm-(xa-xm)*.5,ym+L,xm-(xa-xm)*.45,ym+th,xb,yb+th);}
  c.closePath();shape(ICE,3,O);}
function gum(r,k){const [a,b]=GUMS[k%GUMS.length];c.beginPath();c.moveTo(-r,0);c.bezierCurveTo(-r,-r*1.3,r,-r*1.3,r,0);c.quadraticCurveTo(0,r*.28,-r,0);c.closePath();
  shape(rad(-r*.3,-r*.6,r*.1,r*1.3,[[0,'#ffffff'],[.22,a],[1,b]]),Math.max(2,r*.17),O);
  for(let i=0;i<6;i++){ell((hr(i,k)-.5)*r*1.3,-r*(.15+hr(i,k+3)*.7),Math.max(.8,r*.07),Math.max(.8,r*.07));c.fillStyle='rgba(255,255,255,.75)';c.fill();}}
function mint(r){ell(0,0,r,r);shape('#ffffff',Math.max(2,r*.14),O);c.save();ell(0,0,r,r);c.clip();for(let k=0;k<8;k+=2){const a=k/8*PI*2;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(Math.cos(a+.5)*r*.5,Math.sin(a+.5)*r*.5,Math.cos(a)*r,Math.sin(a)*r);c.arc(0,0,r,a,a+PI/4);c.quadraticCurveTo(Math.cos(a+1)*r*.5,Math.sin(a+1)*r*.5,0,0);c.fillStyle='#e03131';c.fill();}
  ell(0,0,r,r);c.fillStyle=rad(-r*.3,-r*.3,r*.1,r*1.1,[[0,'rgba(255,255,255,0)'],[1,'rgba(90,0,0,.25)']]);c.fill();c.restore();ell(0,0,r,r);c.lineWidth=Math.max(2,r*.14);c.strokeStyle=O;c.stroke();gloss(-r*.35,-r*.4,r*.25,r*.12,-.6,.7);}
// candy cane: stick from (0,L) up to (0,0), hook curling right
function cane(L,w=9,hook=true){const R=w*1.6;c.beginPath();c.moveTo(0,L);c.lineTo(0,0);if(hook){c.arc(R,0,R,PI,0,false);c.lineTo(2*R,R*.7);}
  c.lineCap='round';c.lineJoin='round';c.lineWidth=w+5;c.strokeStyle=O;c.stroke();c.lineWidth=w;c.strokeStyle='#ffffff';c.stroke();
  c.setLineDash([w*.75,w*.85]);c.lineCap='butt';c.lineWidth=w;c.strokeStyle='#e03131';c.stroke();c.setLineDash([]);c.lineCap='round';
  c.lineWidth=w*.25;c.strokeStyle='rgba(255,255,255,.55)';c.beginPath();c.moveTo(-w*.22,L-3);c.lineTo(-w*.22,2);c.stroke();}
function lolly(r,L){c.beginPath();c.moveTo(0,0);c.lineTo(0,L);c.lineWidth=7;c.strokeStyle=O;c.stroke();c.lineWidth=4;c.strokeStyle='#f8f0e3';c.stroke();
  ell(0,0,r,r);shape('#ffffff',3,O);c.save();ell(0,0,r,r);c.clip();c.beginPath();for(let t=0;t<16;t+=.2)c.lineTo(Math.cos(t)*t*r/16,Math.sin(t)*t*r/16);c.lineWidth=r*.22;c.strokeStyle='#e64980';c.stroke();
  c.beginPath();for(let t=0;t<16;t+=.2)c.lineTo(Math.cos(t+PI)*t*r/16,Math.sin(t+PI)*t*r/16);c.strokeStyle='#37b24d';c.stroke();c.restore();ell(0,0,r,r);c.lineWidth=3;c.strokeStyle=O;c.stroke();gloss(-r*.35,-r*.4,r*.25,r*.12,-.6,.7);}
// lit boiled-sugar window
function win(x,y,w,h,arch=false,cross=true){c.save();ell(x+w/2,y+h/2,w*.95,h*.8);c.fillStyle='rgba(255,200,80,.22)';c.fill();c.restore();
  const p=()=>{c.beginPath();if(arch){c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.arc(x+w/2,y+w/2,w/2,PI,0);c.lineTo(x+w,y+h);c.closePath();}else c.rect(x,y,w,h);};
  p();shape(rad(x+w*.4,y+h*.4,2,Math.max(w,h),[[0,'#fffbe0'],[.45,'#ffd43b'],[1,'#f08c00']]),3,O);
  if(cross){pipe(()=>{c.beginPath();c.moveTo(x+w/2,y+(arch?3:0));c.lineTo(x+w/2,y+h);c.moveTo(x,y+h*.55);c.lineTo(x+w,y+h*.55);},3);}
  pipe(()=>p(),4);}
function door(x,y,w,h,col='#6b3410'){c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.arc(x+w/2,y+w/2,w/2,PI,0);c.lineTo(x+w,y+h);c.closePath();
  shape(lin(x,0,x+w,0,[[0,'#4a2008'],[.4,col],[1,'#3d1a06']]),3.5,O);c.save();c.clip();c.strokeStyle='rgba(30,10,0,.35)';c.lineWidth=2;for(let k=1;k<4;k++){c.beginPath();c.moveTo(x+k*w/4,y);c.lineTo(x+k*w/4,y+h);c.stroke();}c.restore();
  pipe(()=>{c.beginPath();c.moveTo(x+3,y+h);c.lineTo(x+3,y+w/2);c.arc(x+w/2,y+w/2,w/2-3,PI,0);c.lineTo(x+w-3,y+h);},3);
  ell(x+w*.78,y+h*.6,4,4);shape('#ffd43b',2,O);}
// gingerbread man (feet at ~y=38, head top ~y=-46)
function gman(s=1,wave=0){c.save();c.scale(s,s);const S=[[0,-18,0,6],[-4,-12,-21,-22-wave],[4,-12,21,-6],[0,4,-12,27],[0,4,12,27]];
  for(const [col,lw] of [[O,25],['#c97b3c',19]]){c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';for(const q of S){c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[2],q[3]);c.stroke();}
    const e=(lw-19)/2;ell(0,-32,14+e,14+e);c.fillStyle=col;c.fill();ell(0,-6,13+e,16+e);c.fill();}
  ell(-4,-36,6,4,-.4);c.fillStyle='rgba(255,220,170,.45)';c.fill();
  for(const [ex,ey] of [[-5,-34],[5,-34]]){ell(ex,ey,2.4,2.6);c.fillStyle=ICE;c.fill();}
  c.beginPath();c.arc(0,-29,6,.3,PI-.3);c.lineWidth=2.4;c.strokeStyle=ICE;c.stroke();
  for(const [bx,by,k] of [[0,-12,0],[0,-2,1],[0,8,2]]){c.save();c.translate(bx,by+3);gum(4.5,k);c.restore();}
  c.lineWidth=2.2;c.strokeStyle=ICE;for(const [x,y,a] of [[-17,-19,-.9],[17,-8,-.1],[-10,22,.5],[10,22,-.5]]){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.moveTo(-6,-2);c.lineTo(-3,2);c.lineTo(0,-2);c.lineTo(3,2);c.lineTo(6,-2);c.stroke();c.restore();}
  c.restore();}
// flash + rays on impact
function burst(x,g,c1,c2,yo=40,R=1){if(g>=1)return;c.save();c.globalAlpha=Math.min(1,(1-g)*1.7);c.lineCap='round';for(let i=0;i<16;i++){const a=-PI+i/15*PI,r0=70*g+30,r1=(110+260*g)*R;c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-yo+Math.sin(a)*r0*.9);c.lineTo(x+Math.cos(a)*r1,F-yo+Math.sin(a)*r1*.9);
  c.lineWidth=i%2?8:13;c.strokeStyle=i%2?c1:c2;c.stroke();}ell(x,F-yo,90*g+30,70*g+20);c.fillStyle='rgba(255,252,230,.6)';c.fill();c.restore();}
function puff(i,col='rgba(255,255,255,.85)'){blob(12+(i%3)*5,i,8,.3);c.fillStyle=col;c.fill();}

// ---------- debris pieces ----------
const KCOL={gb:null,log:'#8a4519',stripe:'#ffffff',choc:'#4a230b',snow:'#f4fbff',wafer:'#f6d9a8',pink:'#f783ac'};
function slabPath(i,w,h){const p=[[-w,-h*.8],[-w*.3,-h-hr(i,3)*6],[w*.5,-h*.9],[w,-h*.2],[w*.8,h*.7],[w*.1,h],[-w*.6,h*.8],[-w*1.05,h*.1]];c.beginPath();p.forEach(([x,y])=>c.lineTo(x,y));c.closePath();return p;}
function slab(i,s,kind){const w=(24+hr(i,1)*20)*s,h=(16+hr(i,2)*13)*s;const p=slabPath(i,w,h);
  c.fillStyle=kind==='gb'?GB(-w,w):kind==='choc'?lin(0,-h,0,h,[[0,'#6b3a17'],[1,'#2e1405']]):kind==='snow'?lin(0,-h,0,h,[[0,'#ffffff'],[1,'#c5ddf0']]):kind==='pink'?lin(-w,0,w,0,[[0,'#c2255c'],[.4,'#faa2c1'],[1,'#a61e4d']]):kind==='log'?lin(0,-h,0,h,[[0,'#b5672a'],[1,'#6b3410']]):KCOL[kind];c.fill();
  c.save();c.clip();
  if(kind==='gb')grain(-w,-h,w*2,h*2,14,i);
  if(kind==='stripe'){c.rotate(-.5);c.fillStyle='#e03131';for(let k=-6;k<7;k++)c.fillRect(k*16-4,-80,9,160);}
  if(kind==='log'){c.fillStyle='rgba(255,255,255,.85)';for(let k=0;k<10;k++){ell((hr(k,i)-.5)*w*2,(hr(k,i+2)-.5)*h*2,2.2,1.4,hr(k));c.fill();}c.strokeStyle='rgba(40,15,0,.4)';c.lineWidth=2;for(let y=-h;y<h;y+=12){c.beginPath();c.moveTo(-w*1.2,y);c.lineTo(w*1.2,y);c.stroke();}}
  if(kind==='choc'){c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=2;for(let y=-h;y<h;y+=13){c.beginPath();c.moveTo(-w*1.2,y);c.lineTo(w*1.2,y);c.stroke();for(let x=-w+((y/13|0)%2)*10;x<w;x+=20){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+13);c.stroke();}}}
  if(kind==='wafer'){for(let k=0;k<12;k++){ell(-w+(k%4)*w*.6+((k>>2)%2)*8,-h+Math.floor(k/4)*h*.75+4,9*s,9*s);shape(WAF[(k+i)%5],1.5,'rgba(60,30,10,.6)');}}
  if(kind==='snow'){c.fillStyle='rgba(120,170,220,.25)';ell(0,h*.6,w,h*.5);c.fill();}
  if(kind==='pink'){c.fillStyle='rgba(255,255,255,.8)';for(let k=0;k<10;k++){ell((hr(k,i)-.5)*w*2,(hr(k,i+5)-.5)*h*2,2,2);c.fill();}}
  c.restore();slabPath(i,w,h);c.lineWidth=3;c.strokeStyle=O;c.lineJoin='round';c.stroke();
  if(kind==='gb'||kind==='log'||kind==='choc')pipe(()=>{c.beginPath();c.moveTo(p[0][0]+3,p[0][1]+3);c.quadraticCurveTo(p[1][0],p[1][1]+8,p[2][0]-2,p[2][1]+4);},4);
  if(kind==='gb'&&i%3===0){c.save();c.translate(w*.2,h*.25);gum(6*s,i);c.restore();}}
function crumb(i){c.save();c.rotate(i);blob(4+(i%3)*2.2,i,6,.5);shape(i%4?'#b5672a':'#7a3a12',1.5,'rgba(40,15,0,.6)');c.restore();}
function sugar(i){star(0,0,8+(i%3)*2,3.2);shape(i%3?'#ffffff':'#fff3bf',1.4,'rgba(120,80,20,.5)');}
function shard(i,col='#ffd43b'){c.save();c.rotate(hr(i)*6);c.beginPath();c.moveTo(-10,-6);c.lineTo(9,-9);c.lineTo(4,9);c.closePath();c.fillStyle=col;c.globalAlpha=.85;c.fill();c.globalAlpha=1;c.lineWidth=2;c.strokeStyle='rgba(120,60,0,.8)';c.stroke();c.restore();}
function squiggle(i){c.save();c.rotate(hr(i,2)*6);pipe(()=>{c.beginPath();c.moveTo(-14,0);c.bezierCurveTo(-8,-12,-2,12,4,0);c.bezierCurveTo(8,-8,12,6,15,-2);},5);c.restore();}
function common(o,{crumbs=26,sug=18,puffs=6,squig=6,shards=4,shCol='#ffd43b'}={}){
  for(let i=0;i<crumbs;i++)o.push({dx:((i*37)%220)-110,dy:-40+((i*13)%90),h:8,rest:3,drag:.8,draw:()=>crumb(i)});
  for(let i=0;i<squig;i++)o.push({dx:((i*47)%160)-80,dy:-30,h:10,rest:4,drag:1.2,draw:()=>squiggle(i)});
  for(let i=0;i<shards;i++)o.push({dx:((i*53)%140)-70,dy:-10,h:8,rest:3,drag:1,draw:()=>shard(i,shCol)});
  for(let i=0;i<sug;i++)o.push({dx:((i*41)%240)-120,dy:-60+((i*17)%80),h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.6,draw:()=>sugar(i)});
  for(let i=0;i<puffs;i++)o.push({dx:(i-puffs/2)*32,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i)});
  return o;}
// collapsed house on the floor
function wreck(x,g,kinds,board,R=1){burst(x,g,'#ffffff','#ffd43b',40,R);const u=Math.min(1,g*1.3);
  ell(x,F+10,(150*u+30)*R,22);c.fillStyle='rgba(0,0,0,.24)';c.fill();
  ell(x,F+6,(110+90*u)*R,18+10*u);c.fillStyle=rad(x,F+6,10,200*R,[[0,'rgba(255,255,255,.85)'],[.6,'rgba(255,255,255,.45)'],[1,'rgba(255,255,255,0)']]);c.fill();
  c.save();c.translate(x,F+6);c.scale(1,.3);c.beginPath();c.roundRect(-118*R,-40,236*R,60,18);shape(board,6,O);c.restore();
  for(let i=0;i<16;i++){c.save();c.translate(x+(hr(i,4)-.5)*190*R*(.5+.5*u),F-4-hr(i,5)*18*u);c.rotate((hr(i,6)-.5)*1.4);slab(i+40,.8,kinds[i%kinds.length]);c.restore();}
  for(let i=0;i<34;i++){c.save();c.translate(x+((hr(i,1)-.5)*360*R)*(.4+.6*g),F+hr(i,2)*30-6);crumb(i);c.restore();}
  for(let i=0;i<6;i++){c.save();c.translate(x+(hr(i,8)-.5)*260*R*u,F+4+hr(i,9)*14);gum(9,i);c.restore();}}

// ---------- extra helpers (v32 mug / v33 shards) ----------
function txt(s,x,y,font,fill,stroke,lw=4,al='center'){c.save();c.textAlign=al;c.textBaseline='middle';c.font=font;if(stroke){c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=fill;c.fillText(s,x,y);c.restore();}
function puddle(x,y,rx,ry,i,fill,lw=4){c.beginPath();for(let k=0;k<=28;k++){const a=k/28*PI*2,j=1+.22*Math.sin(a*5+i)+.12*Math.sin(a*9+i*2);c.lineTo(x+Math.cos(a)*rx*j,y+Math.sin(a)*ry*j);}c.closePath();shape(fill,lw,O);}
function cshard(i,cols,inner,R=40,sy=.75){c.save();c.rotate(hr(i)*6);c.beginPath();const n=4+(i%3);for(let k=0;k<n;k++){const a=k/n*PI*2+hr(i,k)*.4,rr=R*(.5+.5*hr(i,k+2));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*sy);}c.closePath();
  c.fillStyle=lin(-R,0,R,0,cols);c.fill();c.save();c.clip();c.fillStyle=inner;c.fillRect(-R,R*sy*.3,R*2,R);c.restore();c.lineWidth=3.5;c.strokeStyle=O;c.lineJoin='round';c.stroke();c.restore();}
// a broken-off fragment of a whole drawing: clip the drawing to a jagged polygon (object coords), re-centred on (cx,cy)
function frag(draw,poly,cx,cy,edge='#e8b27a'){return ()=>{c.save();c.translate(-cx,-cy);c.beginPath();poly.forEach(([x,y])=>c.lineTo(x,y));c.closePath();c.save();c.clip();draw();c.restore();c.restore();};}   // (no outline: the clip edge would show over empty space)
// jagged break line from (x0,y0) to (x1,y1)
function jag(x0,y0,x1,y1,n,s,amp=9){const p=[];for(let k=0;k<=n;k++){const t=k/n;p.push([x0+(x1-x0)*t+(k%2?amp*.4:0),y0+(y1-y0)*t+(k&&k<n?(hr(k,s)-.5)*2*amp:0)]);}return p;}
function snowflake(x,y,r,col,lw=3){c.save();c.translate(x,y);c.strokeStyle=col;c.lineWidth=lw;c.lineCap='round';for(let k=0;k<6;k++){c.rotate(PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(0,-r);
  c.moveTo(0,-r*.55);c.lineTo(-r*.25,-r*.78);c.moveTo(0,-r*.55);c.lineTo(r*.25,-r*.78);c.stroke();}c.restore();}
function holly(s,rot){c.save();c.rotate(rot);c.scale(s,s);c.beginPath();const L=34,W=13;c.moveTo(-L,0);
  for(let k=1;k<=6;k++){const x=-L+k*2*L/6,xm=x-L/6;c.quadraticCurveTo(xm,-W*Math.sin(PI*(k-.5)/6)*.55,x,-W*Math.sin(PI*k/6)-(k<6?5:0));}
  for(let k=5;k>=0;k--){const x=-L+k*2*L/6,xm=x+L/6;c.quadraticCurveTo(xm,W*Math.sin(PI*(k+.5)/6)*.55,x,W*Math.sin(PI*k/6)+(k>0?5:0));}
  c.closePath();shape(lin(0,-W,0,W,[[0,'#51cf66'],[.5,'#2b8a3e'],[1,'#1b5e2a']]),3,O);c.beginPath();c.moveTo(-L+4,0);c.lineTo(L-4,0);c.lineWidth=2;c.strokeStyle='rgba(220,255,220,.6)';c.stroke();c.restore();}
function berry(r=9){ell(0,0,r,r);shape(rad(-r*.35,-r*.35,1,r*1.2,[[0,'#ff8787'],[.5,'#e03131'],[1,'#8a0f0f']]),2.5,O);gloss(-r*.35,-r*.35,r*.3,r*.18,-.6,.85);}
function sparkleStar(i,x,y,s){const tw=.5+.5*Math.sin(FR*.55+i*1.9);star(x,y,s*(.5+.6*tw),s*.22,4);c.fillStyle=`rgba(255,250,215,${.45+.55*tw})`;c.fill();}

// ================= 1 — GIANT GINGERBREAD MAN COOKIE =================
// the v33 gingerbread man at 3x: thick iced cookie, white icing smile, eyes, zig-zag cuffs, 3 gumdrop buttons + a red icing bow tie
const GS=3,GY=10;
function cookieMan(){c.save();c.translate(0,GY);gman(GS,4);
  c.save();c.scale(GS,GS);c.beginPath();c.moveTo(0,-18);c.lineTo(-7,-22);c.lineTo(-7,-14);c.closePath();c.moveTo(0,-18);c.lineTo(7,-22);c.lineTo(7,-14);c.closePath();shape('#e03131',1,O);ell(0,-18,2.2,2.2);shape('#ff6b6b',1,O);
  for(const x of [-8.5,8.5]){ell(x,-30,3,2);c.fillStyle='rgba(255,120,120,.45)';c.fill();}c.restore();
  c.restore();}
const CK=(x,y)=>[x,y+GY];
const cookieO={h:256,w:200,rot:-PI*0.9,burst:560,up:1.3,spin:12,draw:cookieMan,
  parts(){const o=[];const D=cookieMan;
    o.push({dx:0,dy:-70,h:84,rest:40,drag:.5,draw:frag(D,[CK(-60,-150),CK(60,-150),CK(60,-62),...jag(48,-60+GY,-48,-58+GY,6,3,8)],0,-96)});          // head with the face
    o.push({dx:-70,dy:-20,h:40,rest:20,drag:.5,draw:frag(D,[CK(-130,-110),CK(-36,-86),...jag(-30,-40+GY,-60,-20+GY,3,5,7),CK(-130,-30)],-70,-60)}); // waving arm
    o.push({dx:70,dy:-10,h:40,rest:20,drag:.5,draw:frag(D,[CK(34,-60),CK(110,-60),CK(110,0),...jag(48,10+GY,30,-24+GY,3,6,7)],70,-28)});         // other arm
    o.push({dx:-40,dy:60,h:40,rest:20,drag:.5,draw:frag(D,[...jag(-70,40+GY,0,46+GY,4,7,7),CK(0,140),CK(-70,140)],-34,88)});                      // left leg
    o.push({dx:40,dy:60,h:40,rest:20,drag:.5,draw:frag(D,[...jag(0,46+GY,70,40+GY,4,8,7),CK(70,140),CK(0,140)],34,88)});                         // right leg
    o.push({dx:0,dy:10,h:60,rest:28,drag:.5,draw:frag(D,[...jag(-48,-58+GY,48,-60+GY,6,3,8),...jag(40,-30+GY,70,40+GY,2,9,6),...jag(0,46+GY,-70,40+GY,4,7,7).reverse(),...jag(-60,-20+GY,-40,-50+GY,2,4,6)],0,-6)}); // belly
    for(let i=0;i<3;i++)o.push({dx:(i-1)*34,dy:-10+i*20,h:30,rest:14,drag:.6,draw:()=>gum(14,i)});
    for(let i=0;i<6;i++)o.push({dx:((i*41)%170)-85,dy:-30+((i*29)%80),h:26,rest:10,drag:.6,draw:()=>slab(i+3,.7+(i%3)*.15,'gb')});
    return common(o,{crumbs:40,sug:16,puffs:5,squig:8,shards:0});},
  decal(x,g){burst(x,g,'#ffffff','#ffc078',40,1);const u=Math.min(1,g*1.3);
    ell(x,F+10,140*u+30,20);c.fillStyle='rgba(0,0,0,.22)';c.fill();
    ell(x,F+6,(100+80*u),16+8*u);c.fillStyle=rad(x,F+6,10,180,[[0,'rgba(255,255,255,.8)'],[.6,'rgba(255,255,255,.35)'],[1,'rgba(255,255,255,0)']]);c.fill();
    for(let i=0;i<9;i++){c.save();c.translate(x+(hr(i,4)-.5)*170*(.5+.5*u),F-2-hr(i,5)*12*u);c.rotate((hr(i,6)-.5)*1.4);slab(i+60,.75,'gb');c.restore();}
    for(let i=0;i<40;i++){c.save();c.translate(x+((hr(i,1)-.5)*380)*(.4+.6*g),F+hr(i,2)*30-6);crumb(i);c.restore();}}};

// ================= 2 — CHRISTMAS MUG OF HOT CHOCOLATE =================
// red Christmas mug (white snowflakes, green band, gold rim), hot chocolate with whipped-cream swirl, marshmallows, a candy cane hooked on the rim, steam
const RED=[[0,'#8a0f14'],[.35,'#f03e3e'],[.6,'#d6262c'],[1,'#7a0a10']];
function mugPath(){c.beginPath();c.roundRect(-72,-58,144,158,[8,8,36,36]);}
function mugBody(){mugPath();shape(lin(-72,0,72,0,RED),4.5,O);
  c.save();mugPath();c.clip();c.fillStyle=lin(-72,0,72,0,[[0,'#1b5e2a'],[.4,'#40c057'],[1,'#1b5e2a']]);c.fillRect(-80,62,160,18);c.fillStyle='rgba(255,255,255,.9)';for(let x=-70;x<80;x+=16){ell(x,71,3,3);c.fill();}
  snowflake(-6,10,30,'rgba(255,255,255,.95)',5);snowflake(-46,-26,12,'rgba(255,255,255,.65)',3);snowflake(42,-30,13,'rgba(255,255,255,.65)',3);snowflake(46,40,10,'rgba(255,255,255,.55)',2.5);snowflake(-44,46,9,'rgba(255,255,255,.55)',2.5);
  c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-58,-48,10,128);c.restore();}
function mugHandle(){c.beginPath();c.moveTo(66,-30);c.bezierCurveTo(130,-36,130,66,66,62);c.lineCap='round';c.lineWidth=27;c.strokeStyle=O;c.stroke();c.lineWidth=18;c.strokeStyle='#e03131';c.stroke();
  c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.45)';c.beginPath();c.moveTo(82,-26);c.bezierCurveTo(112,-26,118,16,114,28);c.stroke();}
function mallow(i,s=1){c.save();c.rotate((hr(i)-.5)*.8);c.beginPath();c.roundRect(-13*s,-11*s,26*s,22*s,6*s);shape(i%3===1?'#ffc9de':'#fffaf3',3,O);ell(-4*s,-5*s,5*s,2.5*s);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.restore();}
function steam(){c.save();c.lineCap='round';for(let k=0;k<3;k++){const x0=-30+k*30;c.beginPath();for(let y=0;y<62;y+=4){const x=x0+Math.sin(y*.12+FR*.35+k*2)*8;y?c.lineTo(x,-92-y):c.moveTo(x,-92-y);}c.lineWidth=8;c.strokeStyle=`rgba(255,255,255,${.55-k*.08})`;c.stroke();}c.restore();}
function mugTop(){ell(0,-58,72,16);shape(lin(-72,0,72,0,[[0,'#c27c00'],[.5,'#ffe066'],[1,'#b8860b']]),4.5,O);ell(0,-55,60,11);c.fillStyle=rad(-15,-58,2,60,[[0,'#a0643a'],[1,'#5a2e14']]);c.fill();}
function cream(){c.beginPath();c.moveTo(-46,-58);c.bezierCurveTo(-50,-80,-20,-82,-14,-74);c.bezierCurveTo(-8,-96,26,-94,26,-76);c.bezierCurveTo(44,-80,52,-64,44,-56);c.quadraticCurveTo(0,-48,-46,-58);c.closePath();
  shape(lin(0,-96,0,-52,[[0,'#ffffff'],[1,'#f1e4d3']]),3.5,O);c.beginPath();c.moveTo(-30,-66);c.quadraticCurveTo(-6,-74,20,-66);c.lineWidth=2.5;c.strokeStyle='rgba(150,110,80,.45)';c.stroke();
  c.fillStyle='#7a4223';for(let i=0;i<10;i++){ell(-30+hr(i,2)*66,-84+hr(i,3)*22,2.2,1.4,hr(i));c.fill();}}
function mugCane(){c.save();c.translate(-50,-40);c.rotate(-.35);c.translate(0,-62);c.scale(-1,1);cane(78,10);c.restore();}
const cocoaO={h:200,w:190,rot:-PI*.85,burst:540,up:1.3,spin:12,
  draw(){steam();mugHandle();mugCane();mugBody();mugTop();cream();
    c.save();c.translate(-26,-70);mallow(0);c.restore();c.save();c.translate(18,-82);mallow(1,.9);c.restore();c.save();c.translate(36,-64);mallow(2,.85);c.restore();},
  parts(){const o=[];
    o.push({dx:40,dy:10,h:50,rest:24,drag:.6,draw:()=>{c.save();c.translate(-96,-16);mugHandle();c.restore();}});
    o.push({dx:-10,dy:60,h:50,rest:22,drag:.5,draw:()=>{c.save();c.translate(0,-78);c.beginPath();c.moveTo(-80,112);c.lineTo(-80,60);for(let k=0;k<=8;k++)c.lineTo(-72+k*18,60+(k%2?-12:6));c.lineTo(80,112);c.closePath();c.save();c.clip();mugBody();c.restore();
      c.beginPath();for(let k=0;k<=8;k++)c.lineTo(-72+k*18,60+(k%2?-12:6));c.lineWidth=4;c.strokeStyle='#ffffff';c.stroke();c.restore();}});
    o.push({dx:-60,dy:-40,h:30,rest:10,drag:.6,draw:()=>{c.save();c.rotate(1.5);c.translate(0,-40);cane(78,10);c.restore();}});
    for(let i=0;i<7;i++)o.push({dx:((i*41)%160)-80,dy:-50+((i*23)%70),h:40,rest:12,drag:.8,draw:()=>cshard(i,RED,'#fff8f0',34+(i%3)*8)});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*26,dy:-70,h:24,rest:11,drag:.7,draw:()=>mallow(i,1.1)});
    for(let i=0;i<20;i++)o.push({dx:((i*37)%180)-90,dy:-60+((i*13)%40),h:8,rest:3,drag:1.8,vmax:300,flut:40,g:.85,draw:()=>{blob(5+(i%3)*3,i,7,.4);shape(i%4?'#7a4223':'#a0643a',1.5,'rgba(40,15,0,.6)');}});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*30,dy:-90,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(255,255,255,.8)')});
    for(let i=0;i<10;i++)o.push({dx:((i*41)%240)-120,dy:-60+((i*17)%80),h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.6,draw:()=>sugar(i)});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ffc078');const u=Math.min(1,g*1.3);ell(x,F+10,120*u+20,18);c.fillStyle='rgba(0,0,0,.2)';c.fill();
    puddle(x+8,F+8,40+130*u,10+16*u,3,rad(x-20,F,5,160,[[0,'#9c5c34'],[.6,'#6b3519'],[1,'#4a220e']]));ell(x-30,F+4,40*u,5*u);c.fillStyle='rgba(255,230,200,.35)';c.fill();
    puddle(x-10,F+2,18+30*u,5+6*u,5,'#fffaf3',2.5);
    for(let i=0;i<14;i++){const px=x+(hr(i,3)-.5)*340*(.4+.6*g),py=F+hr(i,4)*30-6;puddle(px,py,4+hr(i)*7,2+hr(i)*3,i,'#6b3519',1.5);}
    c.save();c.translate(x+60*u,F+2);mallow(7,.9);c.restore();}};

// ================= 3 — GIANT CANDY CANE =================
// a big glossy peppermint candy cane with a green ribbon bow -> it SHATTERS like glass: hook flies off whole, stick snaps in 3, striped shards + mint dust
const CW=34,CL=214,CR=CW*1.6;
function bigCane(){c.save();c.translate(-CR,-(CL-CR)/2);cane(CL,CW);
  c.lineCap='round';c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.75)';c.beginPath();c.arc(CR,0,CR-CW*.25,PI*1.08,PI*1.6);c.stroke();
  c.save();c.translate(0,CL*.52);c.beginPath();c.rect(-CW/2-3,-10,CW+6,20);shape(lin(0,-10,0,10,[[0,'#69db7c'],[1,'#1b7a34']]),3,O);
  for(const k of [-1,1]){c.beginPath();c.moveTo(0,0);c.bezierCurveTo(k*40,-34,k*60,-6,k*44,10);c.bezierCurveTo(k*30,20,k*12,8,0,0);c.closePath();shape(lin(0,-30,0,20,[[0,'#8ce99a'],[1,'#1b7a34']]),3,O);
    c.beginPath();c.moveTo(k*4,4);c.quadraticCurveTo(k*18,30,k*30,52);c.lineTo(k*20,56);c.quadraticCurveTo(k*10,30,0,6);c.closePath();shape('#2f9e44',3,O);}
  ell(0,0,9,9);shape('#40c057',3,O);berry(6);c.restore();c.restore();}
const cH=(-(CL-CR)/2);   // y of the hook start in object coords
const caneO={h:290,w:150,rot:-PI*1.1,burst:600,up:1.35,spin:13,draw:bigCane,
  parts(){const o=[];const D=bigCane,X=-CR;
    o.push({dx:20,dy:-90,h:70,rest:30,drag:.5,draw:frag(D,[[X-40,cH-CR-30],[X+2*CR+40,cH-CR-30],[X+2*CR+40,cH+CR],...jag(X+CW/2+8,cH+28,X-CW/2-8,cH+22,3,2,8)],X+CR,cH-10,'#ffe3e3')});
    o.push({dx:-30,dy:-10,h:34,rest:17,drag:.5,draw:frag(D,[...jag(X-CW/2-8,cH+22,X+CW/2+8,cH+28,3,2,8),...jag(X+CW/2+8,cH+100,X-CW/2-8,cH+92,3,4,8)],X,cH+60,'#ffe3e3')});
    o.push({dx:30,dy:50,h:60,rest:30,drag:.5,draw:frag(D,[...jag(X-60,cH+92,X+60,cH+100,4,4,8),...jag(X+60,cH+176,X-60,cH+168,4,6,8)],X,cH+134,'#ffe3e3')});
    o.push({dx:-10,dy:110,h:34,rest:17,drag:.5,draw:frag(D,[...jag(X-CW/2-8,cH+168,X+CW/2+8,cH+176,3,6,8),[X+CW/2+8,cH+CL+30],[X-CW/2-8,cH+CL+30]],X,cH+200,'#ffe3e3')});
    for(let i=0;i<12;i++)o.push({dx:((i*41)%180)-90,dy:-40+((i*29)%110),h:20,rest:8,drag:.7,draw:()=>{c.save();c.scale(.7,.7);slab(i+7,.8,'stripe');c.restore();}});
    for(let i=0;i<5;i++)o.push({dx:((i*47)%160)-80,dy:-20,h:24,rest:12,drag:.6,draw:()=>mint(12)});
    for(let i=0;i<10;i++)o.push({dx:((i*53)%200)-100,dy:-30+((i*7)%40),h:8,rest:3,drag:1,draw:()=>shard(i,i%2?'#ffffff':'#ff6b6b')});
    for(let i=0;i<26;i++)o.push({dx:((i*41)%260)-130,dy:-80+((i*17)%120),h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.6,draw:()=>sugar(i)});
    for(let i=0;i<6;i++)o.push({dx:(i-3)*32,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(235,255,245,.85)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ff8787',40,1.1);const u=Math.min(1,g*1.3);
    ell(x,F+10,130*u+30,20);c.fillStyle='rgba(0,0,0,.2)';c.fill();
    ell(x,F+6,(110+90*u),16+8*u);c.fillStyle=rad(x,F+6,10,200,[[0,'rgba(240,255,248,.9)'],[.6,'rgba(240,255,248,.4)'],[1,'rgba(240,255,248,0)']]);c.fill();
    for(let i=0;i<12;i++){c.save();c.translate(x+(hr(i,4)-.5)*220*(.5+.5*u),F-2-hr(i,5)*10*u);c.rotate((hr(i,6)-.5)*2);c.scale(.6,.6);slab(i+30,.8,'stripe');c.restore();}
    for(let i=0;i<26;i++){c.save();c.translate(x+((hr(i,1)-.5)*400)*(.4+.6*g),F+hr(i,2)*30-6);shard(i+20,i%3?'#ffffff':'#ff6b6b');c.restore();}
    for(let i=0;i<14;i++)sparkleStar(i,x+(hr(i,7)-.5)*300*u,F-10-hr(i,8)*40,10);}};

// ================= 4 — LEGEND: GOLDEN CHRISTMAS PUDDING =================
// dark fruity Christmas pudding (raisins, cherries, orange peel), thick white icing with drips, holly + 3 berries on top,
// on a gold-rimmed plate, with a golden glow + twinkling sparkles (the rare one) -> heavy SPLAT: pudding chunks, raisins,
// icing blobs, holly, berries, gold plate shards, gold sparkle shower, big squashed pudding + icing on the floor
function domePath(){c.beginPath();c.moveTo(-116,96);c.bezierCurveTo(-124,-20,-70,-104,0,-106);c.bezierCurveTo(70,-104,124,-20,116,96);c.quadraticCurveTo(0,118,-116,96);c.closePath();}
function icingPath(){c.beginPath();c.moveTo(-140,-140);c.lineTo(140,-140);c.lineTo(140,-26);const n=9;
  for(let k=0;k<n;k++){const xa=140-k*280/n,xb=140-(k+1)*280/n,xm=(xa+xb)/2,y0=-30+Math.abs(xm)*.12,L=y0+(hr(k,4)>.35?22+hr(k,5)*34:8);
    c.bezierCurveTo(xa-6,y0+4,xm+16,L,xm,L);c.bezierCurveTo(xm-16,L,xb+6,y0+4,xb,y0);}
  c.closePath();}
function pudPlate(){ell(0,108,140,26);shape(lin(-140,0,140,0,[[0,'#b8860b'],[.3,'#ffe066'],[.55,'#fff3bf'],[1,'#a87400']]),4,O);ell(0,104,112,17);shape(lin(-112,0,112,0,[[0,'#e9ecef'],[.5,'#ffffff'],[1,'#ced4da']]),2.5,'rgba(120,90,20,.6)');}
function pudBody(){domePath();shape(rad(-30,-40,10,150,[[0,'#8a4a1e'],[.5,'#5e2c0e'],[1,'#2e1205']]),4.5,O);
  c.save();domePath();c.clip();
  for(let i=0;i<46;i++){const x=(hr(i,1)-.5)*220,y=-80+hr(i,2)*180;ell(x,y,5+hr(i,3)*4,3.5+hr(i,4)*3,hr(i,5)*3);c.fillStyle=i%7===0?'#c92a2a':i%5===0?'#f08c00':i%3?'#1e0a02':'#3d1808';c.fill();
    if(i%7===0){gloss(x-2,y-1,2,1,-.5,.7);}}
  for(let i=0;i<40;i++){ell((hr(i,8)-.5)*220,-80+hr(i,9)*180,1.6,1.2);c.fillStyle='rgba(255,200,150,.35)';c.fill();}
  ell(60,40,80,90);c.fillStyle=rad(70,50,10,100,[[0,'rgba(0,0,0,.3)'],[1,'rgba(0,0,0,0)']]);c.fill();
  icingPath();c.fillStyle=lin(0,-110,0,40,[[0,'#ffffff'],[1,'#f3ece2']]);c.fill();c.lineWidth=4;c.strokeStyle=O;c.stroke();
  ell(-40,-74,34,12,-.5);c.fillStyle='rgba(255,255,255,.95)';c.fill();c.restore();
  domePath();c.lineWidth=4.5;c.strokeStyle=O;c.stroke();gloss(-58,-30,10,24,.4,.25);}
function pudTop(){c.save();c.translate(0,-104);holly(1.2,-.45+PI);holly(1.2,.45);c.translate(0,-6);for(const [x,y] of [[-9,0],[9,-2],[0,-13]]){c.save();c.translate(x,y);berry(10);c.restore();}c.restore();}
function pudding(){ell(0,10,190,190);c.fillStyle=rad(0,10,20,190,[[0,'rgba(255,214,90,.45)'],[1,'rgba(255,214,90,0)']]);c.fill();
  pudPlate();pudBody();pudTop();for(let i=0;i<12;i++)sparkleStar(i,(hr(i,9)-.5)*300,-150+hr(i,10)*260,8+hr(i,11)*8);}
const GOLDS=[[0,'#a87400'],[.35,'#ffe066'],[.6,'#ffd43b'],[1,'#8a5a00']];
function pudChunk(i,s=1){c.save();c.rotate(hr(i)*6);blob(20*s+(i%3)*6*s,i,9,.4);shape(rad(-6,-6,2,30*s,[[0,'#7a3a16'],[1,'#2e1205']]),3,O);
  for(let k=0;k<5;k++){ell((hr(k,i)-.5)*26*s,(hr(k,i+3)-.5)*18*s,3,2.2);c.fillStyle=k===0?'#c92a2a':'#140600';c.fill();}
  if(i%2===0){c.beginPath();c.arc(-4*s,-12*s,10*s,PI,0);c.closePath();shape('#ffffff',2.5,O);}c.restore();}
const puddingO={h:300,w:260,rot:-PI*0.95,burst:600,up:1.4,spin:11,draw:pudding,
  parts(){const o=[];
    for(let i=0;i<10;i++)o.push({dx:((i*41)%200)-100,dy:-40+((i*29)%110),h:44,rest:18,drag:.6,draw:()=>pudChunk(i,1+(i%3)*.2)});
    for(let i=0;i<4;i++)o.push({dx:(i-1.5)*50,dy:-120,h:30,rest:8,drag:.8,draw:()=>holly(1.1,hr(i,3)*6)});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*36,dy:-130,h:20,rest:9,drag:.5,draw:()=>berry(10)});
    for(let i=0;i<6;i++)o.push({dx:((i*53)%220)-110,dy:110,h:30,rest:10,drag:.8,draw:()=>cshard(i+3,GOLDS,'#ffffff',36+(i%3)*8,.45)});
    for(let i=0;i<24;i++)o.push({dx:((i*37)%240)-120,dy:-40+((i*13)%90),h:8,rest:3,drag:.8,draw:()=>{ell(0,0,5+(i%3),3.5);shape(i%5?'#1e0a02':'#c92a2a',1.2,'rgba(0,0,0,.6)');}});
    for(let i=0;i<8;i++)o.push({dx:((i*31)%200)-100,dy:-90,h:14,rest:5,drag:1.2,draw:()=>{blob(9+(i%3)*3,i+20,8,.4);shape('#ffffff',2.5,O);}});
    for(let i=0;i<34;i++)o.push({dx:((i*41)%300)-150,dy:-120+((i*17)%140),h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.6,draw:()=>{const tw=.6+.4*Math.sin(FR*.7+i);star(0,0,(8+(i%3)*3)*tw,3,4);shape(i%3?'#ffe066':'#ffffff',1.2,'rgba(140,90,0,.6)');}});
    for(let i=0;i<7;i++)o.push({dx:(i-3.5)*34,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(255,248,225,.85)')});
    return o;},
  decal(x,g){burst(x,g,'#fff3bf','#ffd43b',50,1.4);const u=Math.min(1,g*1.3);
    ell(x,F+12,(180*u+40),24);c.fillStyle='rgba(0,0,0,.26)';c.fill();
    ell(x,F+6,(150+110*u),22+10*u);c.fillStyle=rad(x,F+6,10,260,[[0,'rgba(255,224,102,.55)'],[1,'rgba(255,224,102,0)']]);c.fill();
    puddle(x,F-4,70+60*u,22+10*u,7,rad(x-30,F-20,5,140,[[0,'#7a3a16'],[.6,'#4a1e08'],[1,'#2e1205']]));
    puddle(x-6,F-14,40+44*u,10+6*u,2,lin(0,F-24,0,F,[[0,'#ffffff'],[1,'#eee4d6']]),3);
    for(let i=0;i<8;i++){c.save();c.translate(x+(hr(i,4)-.5)*300*(.5+.5*u),F-4);c.rotate((hr(i,6)-.5)*.5);c.scale(1,.6);cshard(i+40,GOLDS,'#ffffff',30,.4);c.restore();}
    for(let i=0;i<30;i++){c.save();c.translate(x+((hr(i,1)-.5)*440)*(.4+.6*g),F+hr(i,2)*30-6);ell(0,0,4+(i%3),3);shape(i%5?'#1e0a02':'#c92a2a',1,'rgba(0,0,0,.5)');c.restore();}
    c.save();c.translate(x+30,F-30-6*u);holly(1,-.2);c.translate(-12,-6);berry(9);c.restore();
    for(let i=0;i<16;i++)sparkleStar(i,x+(hr(i,7)-.5)*360*u,F-20-hr(i,8)*90,12);}};

// ---------- room: Christmas lights on the beat, snow in the window, cookie jar + plate of mini gingerbread men + a mug on the table ----------
function jar(x,y){c.save();c.translate(x,y);c.beginPath();c.roundRect(-44,-96,88,96,16);c.fillStyle='rgba(220,240,255,.25)';c.fill();
  c.save();c.clip();for(let i=0;i<9;i++){c.save();c.translate(-26+(i%3)*26,-18-Math.floor(i/3)*26);c.rotate((hr(i)-.5)*.8);gman(.42);c.restore();}c.restore();
  c.beginPath();c.roundRect(-44,-96,88,96,16);c.lineWidth=4;c.strokeStyle=O;c.stroke();gloss(-30,-64,5,20,0,.45);
  c.beginPath();c.roundRect(-40,-112,80,18,6);shape('#2f9e44',3.5,O);c.beginPath();c.moveTo(-40,-103);c.lineTo(40,-103);c.lineWidth=4;c.strokeStyle='#e03131';c.stroke();
  c.beginPath();c.roundRect(-34,-62,68,26,6);shape('#fff8f0',2.5,O);txt('COOKIES',0,-49,'400 20px Anton','#c92a2a');c.restore();}
function plate(x,y){ell(x,y-4,70,11);shape(lin(x-70,0,x+70,0,[[0,'#ced4da'],[.4,'#ffffff'],[1,'#adb5bd']]),3.5,O);
  for(const [dx,a] of [[-26,-.25],[26,.2]]){c.save();c.translate(x+dx,y-42);c.rotate(a);gman(.62);c.restore();}
  c.save();c.translate(x,y-16);star(0,0,22,10);shape(GB(-22,22),3,O);pipe(()=>{star(0,0,15,7);},2.5);c.restore();}
function miniMug(x,y){c.save();c.translate(x,y-30);c.scale(.36,.36);steam();mugHandle();mugBody();mugTop();c.restore();}
function lights(){const x0=-20,x1=700,y0=594,sag=42;c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(x0+(x1-x0)*t,y0+Math.sin(t*PI)*sag);c.lineWidth=3;c.strokeStyle='#123d1f';c.stroke();
  const C=['#ff4d4d','#ffd43b','#51cf66','#4dabf7','#f783ac'];for(let k=0;k<15;k++){const t=(k+.5)/15,x=x0+(x1-x0)*t,y=y0+Math.sin(t*PI)*sag+4;const col=C[k%5];const on=(k+BEAT)%2===0;
    if(on){ell(x,y+16,34,34);c.fillStyle=rad(x,y+16,2,36,[[0,col],[.35,col+'88'],[1,'rgba(0,0,0,0)']]);c.globalAlpha=.55;c.fill();c.globalAlpha=1;}
    c.beginPath();c.roundRect(x-6,y-4,12,10,2);shape('#2b5a2b',2,O);ell(x,y+17,8,12);shape(on?rad(x-2,y+12,1,14,[[0,'#ffffff'],[.4,col],[1,col]]):'#4a3b3b',2.5,O);if(on)gloss(x-3,y+12,2,4,0,.8);}}
function windowSnow(f){const wx=730,wy=430,ww=260,wh=330;c.save();c.beginPath();c.rect(wx,wy,ww,wh);c.clip();
  c.fillStyle='#ffffff';c.beginPath();c.moveTo(wx,wy+wh);for(let x=wx;x<=wx+ww;x+=10)c.lineTo(x,wy+wh-22-Math.sin(x*.05)*10);c.lineTo(wx+ww,wy+wh);c.closePath();c.fill();
  for(let i=0;i<46;i++){const sp=1+(i%3),y=wy+((hr(i,2)*wh+f/240*wh*sp)%wh),x=wx+hr(i)*ww+Math.sin(f/240*PI*2*sp+i)*8;ell(x,y,1.6+hr(i,4)*2.2,1.6+hr(i,4)*2.2);c.fillStyle='rgba(255,255,255,.9)';c.fill();}
  c.restore();c.fillStyle='#e9dcc6';c.fillRect(wx+ww/2-7,wy,14,wh);c.fillRect(wx,wy+wh/2-7,ww,14);
  c.beginPath();c.moveTo(wx-30,wy+wh+18);for(let x=wx-30;x<=wx+ww+30;x+=12)c.quadraticCurveTo(x+6,wy+wh+6-hr(x)*6,x+12,wy+wh+18);c.closePath();c.fillStyle='#ffffff';c.fill();
  c.beginPath();c.moveTo(wx-16,wy-14);for(let x=wx-16;x<=wx+ww+16;x+=12)c.quadraticCurveTo(x+6,wy-26-hr(x,3)*6,x+12,wy-14);c.closePath();c.fillStyle='#ffffff';c.fill();}
function onTable(f){FR=f;const f0=((f-TL.offset)%TL.total+TL.total)%TL.total;BEAT=Math.floor((f0-12+240)/7.5);
  const y=880;windowSnow(f);lights();jar(90,y);plate(225,y);miniMug(345,y);}
return {tag:'CHALLENGE #41',ask:'WHICH CHRISTMAS TREAT WOULD YOU SAVE? &darr;',askStyle:{background:'#fff5f5',color:'#c92a2a',border:'5px solid #c92a2a',fontSize:'36px',left:'60px',right:'60px',boxShadow:'0 0 0 4px #fff5f5, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'TREAT SAVED!'},
 palette:{wallTop:'#0b3a24',wallBot:'#1f7a4d',sky1:'#0a1633',sky2:'#3b5b94',night:true,floorA:'#fff4e6',floorB:'#c92a2a'},
 objects:{cookie:cookieO,cocoa:cocoaO,cane:caneO,pudding:puddingO},onTable};};
