// Video #33 — gingerbread houses: four original gingerbread houses that crumble apart on the floor (original illustrations, no brands)
// Secret words climb a "sugar ladder" (each one sweeter / bigger than the last): CRUMB -> ICING -> GUMDROP -> SUGAR RUSH
//  1 TINY COTTAGE  — pastel wafer-disc roof, icing drips, gumdrop ridge, round sugar-glass window, candy-cane door posts,
//                    peppermint-striped board -> wall slabs, wafer roof halves, gumdrops, wafers, candy canes, crumbs     word CRUMB
//  2 CANDY-CANE CASTLE — two red/white striped towers with pink icing cones + gumdrop tips, crenellated keep, peppermint
//                    rose window, chocolate gate with icing portcullis, wafer drawbridge -> cones, tower chunks, merlons,
//                    peppermints, gate, drawbridge, gumdrops                                                             word ICING
//  3 SNOWY CABIN   — pretzel-log walls, thick snow-icing roof with icicles, candy-stone chimney, lit window, candy cane in
//                    the snow, and a GINGERBREAD MAN standing at the door (he flies off in one piece)                    word GUMDROP
//  4 GIANT MANSION — two storeys, chocolate-shingle roof, central gable, twin brick chimneys, candy-cane columns, wreath on
//                    the double door, gumdrop hedge, lollipops, string of lights -> everything flies, biggest sugar cloud word SUGAR RUSH
// Every house: on impact a powdered-sugar flash + rays, the walls crack into iced gingerbread slabs, roof tiles/gumdrops/
// candy scatter, crumbs + sugar sparkles + powdered-sugar puffs, and a collapsed rubble pile on the floor (decal).
// Christmas UI (no engine change): the v32 "ONLY 1% CAN DO IT" pill + EARLY / PERFECT / LATE bar labels, the catch card
// says "HOUSE SAVED!", the wall has a string of Christmas lights that blink on the beat of the music (audio.py plays a
// synthesized Jingle Bells; every impact lands on a beat), and it snows outside the window. Loop-seamless (240 frames).
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

// ================= 1 — TINY COTTAGE =================
function cotRoofHalf(){c.beginPath();c.moveTo(0,-106);c.lineTo(116,10);c.lineTo(100,28);c.lineTo(0,-74);c.closePath();c.fillStyle='#f6d9a8';c.fill();
  c.save();c.clip();c.translate(0,-106);c.rotate(PI/4);for(let row=0;row<3;row++)for(let k=0;k<14;k++){const x=k*13+(row%2)*6.5,y=2+row*10;ell(x,y,8.5,8.5);shape(WAF[(k+row*2)%5],1.5,'rgba(70,35,10,.55)');gloss(x-3,y-3,3,1.5,-.6,.6);}c.restore();
  c.beginPath();c.moveTo(0,-106);c.lineTo(116,10);c.lineTo(100,28);c.lineTo(0,-74);c.lineWidth=4;c.strokeStyle=O;c.lineJoin='round';c.stroke();
  drips(1,-74,100,25,7,3,7);for(const t of [.22,.47,.72,.93]){c.save();c.translate(t*116,-106+t*116);c.rotate(PI/4);gum(10,Math.round(t*9));c.restore();}}
function cottage(){
  c.beginPath();c.roundRect(-114,104,228,16,6);c.fillStyle='#ffffff';c.fill();c.save();c.clip();c.fillStyle='#e03131';for(let x=-130;x<130;x+=22)c.fillRect(x,104,11,16);c.restore();c.beginPath();c.roundRect(-114,104,228,16,6);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  c.beginPath();c.rect(40,-80,28,56);shape(GB(40,68),4,O);drips(37,-82,71,-82,3,9,8);
  c.beginPath();c.moveTo(-82,106);c.lineTo(-82,8);c.lineTo(0,-72);c.lineTo(82,8);c.lineTo(82,106);c.closePath();shape(GB(-82,82),4,O);
  c.save();c.clip();grain(-82,-72,164,178,60,1);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(-82,-72,164,26);c.restore();
  win(-17,-41,34,34,false,true);pipe(()=>{c.beginPath();c.arc(0,-24,21,0,PI*2);},4);for(let k=0;k<8;k++){const a=k/8*PI*2;ell(Math.cos(a)*21,-24+Math.sin(a)*21,3,3);c.fillStyle=k%2?'#e03131':'#37b24d';c.fill();}
  win(-70,42,28,28);win(42,42,28,28);
  door(-20,50,40,56);
  c.save();c.translate(-34,46);c.scale(-1,1);cane(58,8);c.restore();c.save();c.translate(34,46);cane(58,8);c.restore();
  for(const x of [-74,-56,56,74]){ell(x,80,4,4);shape(x<0?'#37b24d':'#e03131',1.5,O);}
  pipe(()=>{c.beginPath();for(let x=-80;x<=80;x+=10){c.moveTo(x,102);c.arc(x+5,102,5,PI,0,true);}},3);
  c.save();c.scale(-1,1);cotRoofHalf();c.restore();cotRoofHalf();c.save();c.translate(0,-104);gum(14,0);c.restore();}
const cottageO={h:240,w:228,rot:-PI*0.85,burst:540,up:1.3,spin:12,draw:cottage,
  parts(){const o=[];
    for(const k of [-1,1])o.push({dx:k*55,dy:-60,h:34,rest:13,drag:.5,draw:()=>{c.save();c.scale(1.25,1.25);slab(k+5,1.1,'wafer');c.restore();}});
    for(let i=0;i<7;i++)o.push({dx:((i*41)%170)-85,dy:-20+((i*29)%90),h:34,rest:14,drag:.6,draw:()=>slab(i,1+(i%3)*.2,'gb')});
    o.push({dx:0,dy:60,h:40,rest:16,drag:.6,draw:()=>door(-20,-28,40,56)});
    for(const k of [-1,1])o.push({dx:k*36,dy:40,h:14,rest:6,drag:.8,draw:()=>{c.save();c.translate(0,-30);cane(58,8);c.restore();}});
    o.push({dx:52,dy:-60,h:26,rest:12,drag:.6,draw:()=>{c.beginPath();c.rect(-14,-26,28,52);shape(GB(-14,14),3.5,O);drips(-17,-28,17,-28,3,9,7);}});
    o.push({dx:0,dy:-24,h:30,rest:12,draw:()=>{win(-17,-17,34,34);}});
    for(let i=0;i<10;i++)o.push({dx:((i*37)%200)-100,dy:-70+((i*19)%50),h:22,rest:9,drag:.5,draw:()=>gum(10+(i%3)*2,i)});
    for(let i=0;i<14;i++)o.push({dx:((i*31)%200)-100,dy:-50,h:8,rest:4,drag:1.5,vmax:300,flut:60,g:.8,draw:()=>{ell(0,0,9,9);shape(WAF[i%5],2,'rgba(70,35,10,.7)');gloss(-3,-3,3,1.5,-.6,.6);}});
    return common(o,{crumbs:30,sug:18,puffs:6,squig:6,shards:5});},
  decal(x,g){wreck(x,g,['gb','wafer','gb'],'#ffffff',1);}};

// ================= 2 — CANDY-CANE CASTLE =================
function tower(cx){c.beginPath();c.rect(cx-28,-50,56,200);c.fillStyle='#ffffff';c.fill();c.save();c.clip();c.translate(cx,50);c.rotate(-.5);c.fillStyle='#e03131';for(let k=-12;k<13;k++)c.fillRect(k*24-6,-220,12,440);c.restore();
  c.save();c.beginPath();c.rect(cx-28,-50,56,200);c.clip();c.fillStyle=lin(cx-28,0,cx+28,0,[[0,'rgba(60,0,0,.35)'],[.3,'rgba(255,255,255,.25)'],[.55,'rgba(0,0,0,0)'],[1,'rgba(60,0,0,.45)']]);c.fillRect(cx-28,-50,56,200);c.restore();
  c.beginPath();c.rect(cx-28,-50,56,200);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  win(cx-10,-12,20,30,true,false);win(cx-10,62,20,30,true,false);
  c.beginPath();c.moveTo(cx-38,-46);c.lineTo(cx,-150);c.lineTo(cx+38,-46);c.closePath();shape(lin(cx-38,0,cx+38,0,[[0,'#a61e4d'],[.35,'#faa2c1'],[.6,'#f06595'],[1,'#a61e4d']]),4,O);
  c.save();c.clip();for(let k=0;k<26;k++){ell(cx+(hr(k,cx)-.5)*60,-60-hr(k,cx+1)*80,2.2,2.2);c.fillStyle=['#ffffff','#ffd43b','#74c0fc','#8ce99a'][k%4];c.fill();}c.restore();
  drips(cx-40,-48,cx+40,-48,5,cx,8);c.save();c.translate(cx,-146);gum(12,cx>0?1:5);c.restore();}
function keep(){c.beginPath();c.rect(-66,-40,132,190);shape(GB(-66,66),4,O);c.save();c.clip();grain(-66,-40,132,190,70,4);c.restore();
  for(let k=0;k<5;k++){const x=-66+k*28;c.beginPath();c.rect(x,-62,20,24);shape(GB(x,x+20),3.5,O);drips(x-2,-64,x+22,-64,2,k,6);}
  win(-46,-14,24,36,true);win(22,-14,24,36,true);c.save();c.translate(0,38);mint(17);c.restore();
  c.beginPath();c.moveTo(-30,150);c.lineTo(-30,102);c.arc(0,102,30,PI,0);c.lineTo(30,150);c.closePath();shape(lin(-30,0,30,0,[[0,'#2e1405'],[.5,'#5c2c0e'],[1,'#2e1405']]),4,O);
  c.save();c.clip();pipe(()=>{c.beginPath();for(let x=-20;x<=20;x+=10){c.moveTo(x,70);c.lineTo(x,146);}for(let y=88;y<146;y+=14){c.moveTo(-30,y);c.lineTo(30,y);}},2.5);c.restore();
  pipe(()=>{c.beginPath();c.moveTo(-36,150);c.lineTo(-36,102);c.arc(0,102,36,PI,0);c.lineTo(36,150);},5);
  for(let k=0;k<7;k++){const a=PI+k/6*PI;ell(Math.cos(a)*36,102+Math.sin(a)*36,4,4);shape(GUMS[k%7][0],1.5,O);}}
function bridge(){c.beginPath();c.moveTo(-34,0);c.lineTo(34,0);c.lineTo(44,18);c.lineTo(-44,18);c.closePath();shape('#f2cf8f',3.5,O);c.save();c.clip();c.strokeStyle='#c4924a';c.lineWidth=2;for(let x=-50;x<50;x+=8){c.beginPath();c.moveTo(x,0);c.lineTo(x*1.2,18);c.stroke();}for(let y=5;y<18;y+=6){c.beginPath();c.moveTo(-50,y);c.lineTo(50,y);c.stroke();}c.restore();}
function castle(){c.beginPath();c.moveTo(-130,170);c.lineTo(-130,152);for(let x=-130;x<=130;x+=13)c.quadraticCurveTo(x+6.5,146-(hr(x)*6),x+13,152);c.lineTo(130,170);c.closePath();shape(lin(0,146,0,170,[[0,'#c3fae8'],[1,'#63e6be']]),4,O);
  keep();tower(-96);tower(96);c.save();c.translate(0,150);bridge();c.restore();
  for(const x of [-60,60,-118,118]){c.save();c.translate(x,160);gum(9,x>0?2:6);c.restore();}}
const castleO={h:340,w:264,rot:-PI*0.95,burst:560,up:1.35,spin:11,draw:castle,
  parts(){const o=[];
    for(const k of [-1,1])o.push({dx:k*96,dy:-110,h:44,rest:18,drag:.5,draw:()=>{c.save();c.translate(-k*96,90);c.beginPath();c.moveTo(k*96-38,-46);c.lineTo(k*96,-150);c.lineTo(k*96+38,-46);c.closePath();shape(lin(k*96-38,0,k*96+38,0,[[0,'#a61e4d'],[.35,'#faa2c1'],[1,'#a61e4d']]),4,O);drips(k*96-40,-48,k*96+40,-48,5,k+3,8);c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:(i%2?1:-1)*96,dy:-20+(i>>1)*50,h:34,rest:14,drag:.6,draw:()=>slab(i+20,1.15,'stripe')});
    for(let i=0;i<6;i++)o.push({dx:((i*37)%120)-60,dy:-20+((i*29)%120),h:34,rest:14,drag:.6,draw:()=>slab(i+30,1.1,'gb')});
    for(let i=0;i<5;i++)o.push({dx:-56+i*28,dy:-50,h:24,rest:12,drag:.7,draw:()=>{c.beginPath();c.rect(-10,-12,20,24);shape(GB(-10,10),3,O);drips(-12,-14,12,-14,2,i,6);}});
    o.push({dx:0,dy:100,h:30,rest:10,drag:.6,draw:()=>{c.save();c.translate(0,-9);bridge();c.restore();}});
    o.push({dx:-10,dy:90,h:40,rest:20,drag:.6,draw:()=>{c.beginPath();c.moveTo(-30,30);c.lineTo(-30,0);c.arc(0,0,30,PI,0);c.lineTo(30,30);c.closePath();shape(lin(-30,0,30,0,[[0,'#2e1405'],[.5,'#5c2c0e'],[1,'#2e1405']]),4,O);}});
    o.push({dx:0,dy:38,h:34,rest:17,draw:()=>mint(17)});
    for(let i=0;i<7;i++)o.push({dx:((i*43)%200)-100,dy:-40+((i*31)%120),h:24,rest:12,drag:.6,draw:()=>mint(9+(i%3)*2)});
    for(let i=0;i<8;i++)o.push({dx:((i*29)%220)-110,dy:-100+((i*41)%200),h:20,rest:9,drag:.5,draw:()=>gum(9+(i%3)*2,i)});
    return common(o,{crumbs:26,sug:22,puffs:6,squig:6,shards:6,shCol:'#ffd43b'});},
  decal(x,g){wreck(x,g,['stripe','gb','pink'],'#63e6be',1.05);}};

// ================= 3 — SNOWY CABIN with a gingerbread man at the door =================
function logs(x0,y0,w,h,ext=6){for(let y=y0;y<y0+h;y+=15.5){c.beginPath();c.roundRect(x0-ext,y,w+ext*2,15,7.5);shape(lin(0,y,0,y+15,[[0,'#c57a35'],[.35,'#a0521d'],[1,'#5c2a0a']]),2.5,O);
  for(let k=0;k<Math.floor(w/18);k++){ell(x0+hr(k,y)*w,y+3+hr(k,y+1)*9,2.2,1.3,hr(k,y)*3);c.fillStyle='rgba(255,255,255,.9)';c.fill();}}}
function snowRoof(){c.beginPath();c.moveTo(-130,4);c.lineTo(0,-126);c.lineTo(130,4);c.quadraticCurveTo(128,22,114,20);c.lineTo(0,-94);c.lineTo(-114,20);c.quadraticCurveTo(-128,22,-130,4);c.closePath();
  shape(lin(0,-126,0,22,[[0,'#ffffff'],[.7,'#e7f5ff'],[1,'#a5d8ff']]),4,O);
  for(let k=0;k<12;k++){const t=(k+.5)/12,s=k<6?-1:1,tt=k<6?1-t*2:t*2-1;const x=s*130*tt,y=-126+130*tt;ell(x,y-2,13,9);c.fillStyle='#ffffff';c.fill();}
  c.beginPath();c.moveTo(-130,4);c.lineTo(0,-126);c.lineTo(130,4);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  for(let k=0;k<9;k++){const s=k%2?1:-1,t=.35+Math.floor(k/2)*.16,x=s*114*t,y=-94+114*t,L=10+hr(k)*18;c.beginPath();c.moveTo(x-5,y);c.lineTo(x,y+L);c.lineTo(x+5,y);c.closePath();shape('#d0ebff',2,'#1c4a7a');}}
function cabin(){c.beginPath();c.moveTo(-128,140);c.lineTo(-128,124);for(let x=-128;x<=128;x+=16)c.quadraticCurveTo(x+8,112-hr(x,1)*8,x+16,122);c.lineTo(128,140);c.closePath();shape(lin(0,112,0,140,[[0,'#ffffff'],[1,'#c5ddf0']]),4,O);
  for(let k=0;k<6;k++){const y=-110+k*12,x=-76+(k%2)*5;c.beginPath();c.roundRect(x,y,30,11,5);shape(['#ced4da','#adb5bd','#e9ecef'][k%3],2,O);}
  ell(-61,-112,20,8);c.fillStyle='#ffffff';c.fill();c.lineWidth=3;c.strokeStyle=O;c.stroke();
  c.save();c.beginPath();c.moveTo(-92,-6);c.lineTo(0,-96);c.lineTo(92,-6);c.lineTo(92,118);c.lineTo(-92,118);c.closePath();c.clip();logs(-92,-100,184,220,0);c.restore();
  c.beginPath();c.moveTo(-92,-6);c.lineTo(0,-96);c.lineTo(92,-6);c.lineTo(92,118);c.lineTo(-92,118);c.closePath();c.lineWidth=4;c.strokeStyle=O;c.stroke();
  for(let y=-4;y<116;y+=15.5){for(const x of [-98,98]){ell(x,y+7.5,7,7.5);shape(lin(x-7,0,x+7,0,[[0,'#e8a86a'],[1,'#8a4519']]),2.5,O);ell(x,y+7.5,3,3.5);c.fillStyle='rgba(90,40,10,.6)';c.fill();}}
  win(-20,-54,40,30,true);
  door(-12,52,40,66);c.save();c.translate(8,66);c.beginPath();c.moveTo(0,4);c.bezierCurveTo(-10,-4,-6,-12,0,-6);c.bezierCurveTo(6,-12,10,-4,0,4);shape('#e03131',2,O);c.restore();
  win(44,34,36,34);c.beginPath();c.ellipse(62,70,22,5,0,PI,0);c.fillStyle='#ffffff';c.fill();c.lineWidth=2.5;c.strokeStyle=O;c.stroke();
  snowRoof();
  c.save();c.translate(108,52);c.scale(-1,1);cane(70,9);c.restore();
  c.save();c.translate(-52,82);gman(.82,FR%30<15?0:6);c.restore();}
const cabinO={h:280,w:258,rot:-PI*0.9,burst:560,up:1.35,spin:12,draw:cabin,
  parts(){const o=[];
    for(const k of [-1,1])o.push({dx:k*60,dy:-90,h:40,rest:16,drag:.5,draw:()=>{c.save();c.scale(1.4,1.3);slab(k+11,1,'snow');c.restore();}});
    for(let i=0;i<8;i++)o.push({dx:((i*37)%220)-110,dy:-80+((i*23)%60),h:24,rest:10,drag:.8,draw:()=>slab(i+50,.7,'snow')});
    for(let i=0;i<10;i++)o.push({dx:((i*31)%180)-90,dy:-20+((i*17)%120),h:16,rest:7,drag:.5,draw:()=>{c.save();c.rotate((hr(i)-.5)*.4);c.beginPath();c.roundRect(-40-hr(i,2)*20,-7.5,80+hr(i,2)*40,15,7.5);shape(lin(0,-7,0,8,[[0,'#c57a35'],[1,'#5c2a0a']]),2.5,O);for(let k=0;k<6;k++){ell(-34+k*13,-1+hr(k,i)*4,2.2,1.3);c.fillStyle='#fff';c.fill();}c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:-60+(i%3)*8,dy:-130+i*6,h:12,rest:6,drag:.6,draw:()=>{c.beginPath();c.roundRect(-15,-5.5,30,11,5);shape(['#ced4da','#adb5bd','#e9ecef'][i%3],2,O);}});
    o.push({dx:-50,dy:20,h:60,rest:14,drag:.35,draw:()=>gman(.82,8)});
    o.push({dx:8,dy:80,h:40,rest:12,drag:.6,draw:()=>door(-20,-33,40,66)});
    o.push({dx:100,dy:40,h:16,rest:7,drag:.8,draw:()=>{c.save();c.translate(0,-35);cane(70,9);c.restore();}});
    for(let i=0;i<8;i++)o.push({dx:((i*29)%200)-100,dy:-40,h:8,rest:4,drag:1.1,draw:()=>{c.beginPath();c.moveTo(-5,0);c.lineTo(0,18+i%3*5);c.lineTo(5,0);c.closePath();shape('#d0ebff',2,'#1c4a7a');}});
    for(let i=0;i<5;i++)o.push({dx:((i*41)%160)-80,dy:-60,h:20,rest:9,drag:.5,draw:()=>gum(10,i+2)});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*40,dy:-80,h:20,rest:8,drag:2.6,vmax:120,flut:60,g:.3,draw:()=>puff(i+3,'rgba(240,248,255,.9)')});
    return common(o,{crumbs:24,sug:20,puffs:4,squig:4,shards:4});},
  decal(x,g){wreck(x,g,['log','snow','log'],'#e7f5ff',1.05);}};

// ================= 4 — GIANT MANSION =================
function chimney(x){c.beginPath();c.rect(x-14,-152,28,56);shape('#c92a2a',3.5,O);c.save();c.clip();c.strokeStyle='rgba(255,230,230,.8)';c.lineWidth=2;for(let y=-152;y<-96;y+=9){c.beginPath();c.moveTo(x-14,y);c.lineTo(x+14,y);c.stroke();for(let xx=x-14+((y/9|0)%2)*7;xx<x+14;xx+=14){c.beginPath();c.moveTo(xx,y);c.lineTo(xx,y+9);c.stroke();}}c.restore();
  ell(x,-153,19,7);c.fillStyle='#ffffff';c.fill();c.lineWidth=3;c.strokeStyle=O;c.stroke();}
function chocRoof(){c.beginPath();c.moveTo(-138,-40);c.lineTo(-96,-120);c.lineTo(96,-120);c.lineTo(138,-40);c.closePath();c.fillStyle='#3b1a06';c.fill();c.save();c.clip();
  for(let r=0;r<7;r++){const y=-124+r*13;for(let x=-150+(r%2)*11;x<150;x+=22){c.beginPath();c.roundRect(x,y,21,15,[0,0,7,7]);c.fillStyle=lin(0,y,0,y+15,[[0,'#7a4119'],[1,'#3d1c07']]);c.fill();c.lineWidth=1.5;c.strokeStyle='rgba(0,0,0,.55)';c.stroke();gloss(x+6,y+5,4,1.6,0,.25);}}c.restore();
  c.beginPath();c.moveTo(-138,-40);c.lineTo(-96,-120);c.lineTo(96,-120);c.lineTo(138,-40);c.closePath();c.lineWidth=4;c.strokeStyle=O;c.stroke();
  pipe(()=>{c.beginPath();c.moveTo(-96,-120);c.lineTo(96,-120);},6);}
function bulbs(y,x0,x1,n){c.beginPath();for(let k=0;k<=n;k++){const x=x0+(x1-x0)*k/n;c.lineTo(x,y+Math.sin(k*PI)*0+((k%2)?5:0));}c.lineWidth=2;c.strokeStyle='#1b3b1b';c.stroke();
  for(let k=0;k<=n;k++){const x=x0+(x1-x0)*k/n,yy=y+((k%2)?5:0)+6;const col=['#ff4d4d','#ffd43b','#51cf66','#4dabf7'][k%4];const on=(k+BEAT)%2===0;
    if(on){ell(x,yy+2,10,10);c.fillStyle=rad(x,yy+2,1,11,[[0,col],[1,'rgba(255,255,255,0)']]);c.globalAlpha=.6;c.fill();c.globalAlpha=1;}
    ell(x,yy+3,3.6,5.5);shape(on?col:'#555',1.5,O);}}
function mansion(){c.beginPath();c.roundRect(-140,152,280,18,5);shape(lin(-140,0,140,0,[[0,'#8a6400'],[.3,'#ffe066'],[.6,'#f5c331'],[1,'#7a5600']]),4,O);
  chimney(-84);chimney(84);
  c.beginPath();c.rect(-120,-40,240,192);shape(GB(-120,120),4,O);c.save();c.clip();grain(-120,-40,240,192,110,7);c.fillStyle='rgba(0,0,0,.14)';c.fillRect(-120,-40,240,18);c.restore();
  drips(-122,56,122,56,14,4,6);
  for(const x of [-88,-36,36,88])win(x-15,-18,30,40,true);
  for(const x of [-88,88]){win(x-18,82,36,46);for(const s of [-1,1]){c.beginPath();c.rect(x+s*24-6,82,12,46);shape('#c92a2a',2.5,O);c.fillStyle='rgba(255,255,255,.6)';c.fillRect(x+s*24-2,86,4,38);}}
  c.beginPath();c.rect(-28,92,56,60);shape(lin(-28,0,28,0,[[0,'#3d1a06'],[.5,'#6b3410'],[1,'#3d1a06']]),3.5,O);c.beginPath();c.moveTo(0,92);c.lineTo(0,152);c.lineWidth=3;c.strokeStyle=O;c.stroke();
  pipe(()=>{c.beginPath();c.rect(-24,96,48,56);},3);for(const x of [-6,6]){ell(x,128,3.5,3.5);shape('#ffd43b',1.5,O);}
  c.save();c.translate(0,114);c.beginPath();c.arc(0,0,13,0,PI*2);c.lineWidth=12;c.strokeStyle=O;c.stroke();c.lineWidth=8;c.strokeStyle='#2b8a3e';c.stroke();for(let k=0;k<6;k++){const a=k/6*PI*2;ell(Math.cos(a)*13,Math.sin(a)*13,2.5,2.5);c.fillStyle='#ff4d4d';c.fill();}
  c.beginPath();c.moveTo(0,12);c.lineTo(-7,20);c.lineTo(-2,12);c.moveTo(0,12);c.lineTo(7,20);c.lineTo(2,12);c.lineWidth=3;c.strokeStyle='#e03131';c.stroke();c.restore();
  for(const x of [-44,44]){c.save();c.translate(x,72);cane(80,10,false);c.restore();}
  c.beginPath();c.moveTo(-62,74);c.lineTo(0,40);c.lineTo(62,74);c.closePath();shape(ICE,3.5,O);c.beginPath();c.moveTo(-46,68);c.lineTo(0,46);c.lineTo(46,68);c.closePath();shape('#ffe3e3',2,O);
  c.save();c.translate(0,61);gum(7,0);c.restore();
  chocRoof();drips(-140,-40,140,-40,16,2,7);bulbs(-34,-130,130,12);
  c.beginPath();c.moveTo(-54,-40);c.lineTo(0,-150);c.lineTo(54,-40);c.closePath();shape(GB(-54,54),4,O);c.save();c.clip();grain(-54,-150,108,110,30,9);c.restore();
  pipe(()=>{c.beginPath();c.moveTo(-58,-36);c.lineTo(0,-152);c.lineTo(58,-36);},6);win(-16,-98,32,32,false,true);pipe(()=>{c.beginPath();c.arc(0,-82,20,0,PI*2);},3);
  c.save();c.translate(0,-150);gum(12,3);c.restore();for(const x of [-60,-30,30,60]){c.save();c.translate(x,-121);gum(8,x>0?4:1);c.restore();}
  for(let x=-130;x<=130;x+=20){if(Math.abs(x)<36)continue;c.save();c.translate(x,154);gum(11,1);c.restore();}
  for(const x of [-128,128]){c.save();c.translate(x,92);lolly(16,62);c.restore();}}
const mansionO={h:340,w:290,rot:-PI*0.9,burst:600,up:1.35,spin:12,draw:mansion,
  parts(){const o=[];
    for(let i=0;i<4;i++)o.push({dx:-90+i*60,dy:-110,h:36,rest:15,drag:.5,draw:()=>{c.save();c.scale(1.35,1.2);slab(i+60,1.05,'choc');c.restore();}});
    o.push({dx:0,dy:-120,h:50,rest:20,drag:.5,draw:()=>{c.save();c.translate(0,90);c.beginPath();c.moveTo(-54,-40);c.lineTo(0,-150);c.lineTo(54,-40);c.closePath();shape(GB(-54,54),4,O);pipe(()=>{c.beginPath();c.moveTo(-58,-36);c.lineTo(0,-152);c.lineTo(58,-36);},6);win(-16,-98,32,32,false,true);c.restore();}});
    for(const k of [-1,1])o.push({dx:k*84,dy:-140,h:28,rest:14,drag:.6,draw:()=>{c.save();c.translate(-k*84,124);chimney(k*84);c.restore();}});
    for(let i=0;i<10;i++)o.push({dx:((i*41)%220)-110,dy:-30+((i*29)%170),h:34,rest:14,drag:.6,draw:()=>slab(i+70,1.1+(i%3)*.2,'gb')});
    for(const k of [-1,1])o.push({dx:k*44,dy:80,h:14,rest:6,drag:.7,draw:()=>{c.save();c.translate(0,-40);cane(80,10,false);c.restore();}});
    for(const k of [-1,1])o.push({dx:k*14,dy:120,h:20,rest:8,drag:.6,draw:()=>{c.beginPath();c.rect(-14,-30,28,60);shape(lin(-14,0,14,0,[[0,'#3d1a06'],[.5,'#6b3410'],[1,'#3d1a06']]),3.5,O);}});
    o.push({dx:0,dy:110,h:30,rest:10,drag:.7,draw:()=>{c.beginPath();c.arc(0,0,13,0,PI*2);c.lineWidth=12;c.strokeStyle=O;c.stroke();c.lineWidth=8;c.strokeStyle='#2b8a3e';c.stroke();for(let k=0;k<6;k++){const a=k/6*PI*2;ell(Math.cos(a)*13,Math.sin(a)*13,2.5,2.5);c.fillStyle='#ff4d4d';c.fill();}}});
    o.push({dx:0,dy:56,h:30,rest:10,drag:.6,draw:()=>{c.save();c.translate(0,-57);c.beginPath();c.moveTo(-62,74);c.lineTo(0,40);c.lineTo(62,74);c.closePath();shape(ICE,3.5,O);c.restore();}});
    for(const k of [-1,1])o.push({dx:k*128,dy:120,h:30,rest:15,drag:.6,draw:()=>{c.save();c.translate(0,-20);lolly(16,62);c.restore();}});
    for(let i=0;i<14;i++)o.push({dx:((i*37)%260)-130,dy:150-((i*23)%60),h:22,rest:10,drag:.5,draw:()=>gum(10+(i%3)*2,i)});
    for(let i=0;i<8;i++)o.push({dx:((i*31)%240)-120,dy:-36,h:10,rest:4,drag:1.2,draw:()=>{ell(0,0,3.6,5.5);shape(['#ff4d4d','#ffd43b','#51cf66','#4dabf7'][i%4],1.5,O);}});
    return common(o,{crumbs:40,sug:30,puffs:8,squig:8,shards:8});},
  decal(x,g){wreck(x,g,['gb','choc','gb'],'#f5c331',1.2);}};

// ---------- table + wall: jar of gumdrops, cookies on a plate, piping bag, Christmas lights on the beat, snow in the window ----------
function jar(x,y){c.save();c.translate(x,y);c.beginPath();c.roundRect(-38,-82,76,82,14);c.fillStyle='rgba(220,240,255,.25)';c.fill();
  c.save();c.clip();for(let i=0;i<16;i++){c.save();c.translate(-30+(i%5)*15+((i/5|0)%2)*7,-6-Math.floor(i/5)*14);gum(9,i);c.restore();}c.restore();
  c.beginPath();c.roundRect(-38,-82,76,82,14);c.lineWidth=4;c.strokeStyle=O;c.stroke();gloss(-24,-56,5,18,0,.45);
  c.beginPath();c.roundRect(-34,-96,68,16,5);shape('#e03131',3.5,O);c.beginPath();c.moveTo(-34,-88);c.lineTo(34,-88);c.lineWidth=4;c.strokeStyle='#ffd43b';c.stroke();c.restore();}
function plate(x,y){ell(x,y-4,70,11);shape(lin(x-70,0,x+70,0,[[0,'#ced4da'],[.4,'#ffffff'],[1,'#adb5bd']]),3.5,O);
  for(const [dx,a] of [[-26,-.25],[26,.2]]){c.save();c.translate(x+dx,y-42);c.rotate(a);gman(.62);c.restore();}
  c.save();c.translate(x,y-16);star(0,0,22,10);shape(GB(-22,22),3,O);pipe(()=>{star(0,0,15,7);},2.5);c.restore();}
function pipingBag(x,y){c.save();c.translate(x,y);c.rotate(-.18);c.beginPath();c.moveTo(-60,-16);c.lineTo(40,-6);c.lineTo(40,6);c.lineTo(-60,16);c.quadraticCurveTo(-72,0,-60,-16);c.closePath();
  shape(lin(0,-16,0,16,[[0,'#f8f9fa'],[.5,'#ffffff'],[1,'#ced4da']]),3.5,O);c.beginPath();c.moveTo(40,-6);c.lineTo(58,-2);c.lineTo(58,2);c.lineTo(40,6);c.closePath();shape('#e03131',3,O);
  pipe(()=>{c.beginPath();c.moveTo(60,0);c.quadraticCurveTo(70,6,64,12);},4);c.restore();}
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
  const y=880;windowSnow(f);lights();jar(80,y);plate(205,y);pipingBag(320,y-14);}
return {tag:'CHALLENGE #33',ask:'WHICH HOUSE WOULD YOU SAVE? &darr;',askStyle:{background:'#fff5f5',color:'#c92a2a',border:'5px solid #c92a2a',fontSize:'40px',left:'90px',right:'90px',boxShadow:'0 0 0 4px #fff5f5, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'HOUSE SAVED!'},
 palette:{wallTop:'#3b0a14',wallBot:'#8c1c2e',sky1:'#0a1633',sky2:'#3b5b94',night:true,floorA:'#fff4e6',floorB:'#2b8a5a'},
 objects:{cottage:cottageO,castle:castleO,cabin:cabinO,mansion:mansionO},onTable};};
