// Video #32 — cat crimes: a grumpy "tsundere" ginger cat sits on the table and swipes four things off the edge, one by one
// (original illustrations: the cat is an original design — ginger tabby, white socks + bib, red collar with a bell — no brands, no known characters)
// Secret words climb the cat's excuses, from "accident" to full villain: OOPS -> HMPH -> ON PURPOSE -> NOT SORRY
//  1 PAW-PRINT MUG of hot cocoa, marshmallows + steam -> ceramic shards, handle snaps off, cocoa puddle, marshmallows bounce          word OOPS
//  2 POTTED PLANT (terracotta pot, heart leaves, pink flowers) -> pot shards + rim, soil pile, root ball flops, leaves/flowers flutter word HMPH
//  3 BIRTHDAY CAKE (two tiers, drips, 3 candles, "HAPPY BIRTHDAY") on a plate -> cake chunks, frosting splat, candles, cherry, plate shards word ON PURPOSE
//  4 PHONE in a cat-ear case on a wooden stand (lock screen: 07:30, the cat as wallpaper, "MOM: is the cat ok??")
//    -> screen glass shatters, case + ears pop off, battery/chips/screws, sparks; the phone lies cracked on the floor           word NOT SORRY
// The cat (drawn in onTable, reads timeline.json itself) reacts on every attempt:
//   push = narrowed eyes + anger mark, paw swipe (speed lines) pushing the object to the edge
//   fall = smug half-lidded smirk, paw hovering over the edge, eyes follow the object down
//   0 ms / impact = shocked wide eyes, ears back, fur puffed, "?!" / "!"   then   tsundere pose: eyes shut, nose up, blush, paw crossed, "HMPH!" bubble
//   rewind = annoyed, then winds the paw up while the next object drops in
// UI (no engine change): h2 becomes "BEFORE THE CAT KNOCKS IT OFF", "ONLY 1% CAN DO IT" pill, EARLY / PERFECT / LATE timing bar, catch card "NICE CATCH!".
const TL=await (await fetch('/timeline.json')).json();
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
// ---- cat UI overlay (DOM only, inside #ui so hideUI() still hides it) ----
{const ui=document.getElementById('ui'),tag=document.getElementById('tag');tag.style.top='34px';
 const pill=document.createElement('div');pill.id='onepct';pill.innerHTML='ONLY <b>1%</b> CAN DO IT';
 Object.assign(pill.style,{position:'absolute',top:'82px',left:'50%',transform:'translateX(-50%) rotate(-2deg)',padding:'8px 30px 6px',borderRadius:'99px',
  background:'#ffd23f',color:'#111',fontFamily:'Inter',fontWeight:'800',fontSize:'40px',letterSpacing:'2px',whiteSpace:'nowrap',boxShadow:'0 6px 0 rgba(0,0,0,.35),0 0 40px rgba(255,210,63,.45)',border:'4px solid #111'});
 ui.appendChild(pill);const st=document.createElement('style');st.textContent='#onepct b{color:#e8590c}.title{top:172px!important}.title h2{font-size:46px!important}';document.head.appendChild(st);
 const h2=document.querySelector('.title h2');if(h2)h2.textContent='BEFORE THE CAT KNOCKS IT OFF';
 const lbl=document.querySelector('.hud .lbl');if(lbl){lbl.innerHTML='<span style="color:var(--r)">&#9664; EARLY</span><span style="color:var(--g)">PERFECT</span><span style="color:var(--o)">LATE &#9654;</span>';
  Object.assign(lbl.style,{display:'flex',justifyContent:'space-between',fontSize:'24px',letterSpacing:'3px'});}
 const bar=document.querySelector('.hud .bar');if(bar){const t=document.createElement('div');Object.assign(t.style,{position:'absolute',left:'50%',top:'-6px',width:'4px',height:'26px',marginLeft:'-2px',background:'#0b0f0c',borderRadius:'2px',opacity:'.55'});bar.insertBefore(t,bar.firstChild);}}
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1a14';const F=H.FLOOR_Y,TY=H.TABLE_Y,EX=H.EDGE_X,SL=EX-150;
let FR=0;   // current timeline frame (set in onTable) -> steam, flames, tail
const hr=(a,b=0)=>{const s=Math.sin(a*12.9898+b*78.233)*43758.5453;return s-Math.floor(s);};
const ease=t=>1-Math.pow(1-t,3),inout=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,lerp=(a,b,t)=>a+(b-a)*t,cl=x=>Math.max(0,Math.min(1,x));
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function star(x,y,R,r,n=5){c.beginPath();for(let i=0;i<2*n;i++){const a=-Math.PI/2+i*Math.PI/n,rr=i%2?r:R;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function txt(s,x,y,font,fill,stroke,lw=4,al='center'){c.save();c.textAlign=al;c.textBaseline='middle';c.font=font;if(stroke){c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=fill;c.fillText(s,x,y);c.restore();}
function blob(r,i,n=9,j=.35){c.beginPath();for(let k=0;k<n;k++){const a=k/n*Math.PI*2,rr=r*(1-j/2+j*hr(i,k));c.lineTo(Math.cos(a)*rr*1.15,Math.sin(a)*rr*.85);}c.closePath();}
function puddle(x,y,rx,ry,i,fill,lw=4){c.beginPath();for(let k=0;k<=28;k++){const a=k/28*Math.PI*2,j=1+.22*Math.sin(a*5+i)+.12*Math.sin(a*9+i*2);c.lineTo(x+Math.cos(a)*rx*j,y+Math.sin(a)*ry*j);}c.closePath();shape(fill,lw,O);}
// flash + rays on impact
function burst(x,g,c1,c2,yo=40,R=1){if(g>=1)return;c.save();c.globalAlpha=Math.min(1,(1-g)*1.7);c.lineCap='round';for(let i=0;i<16;i++){const a=-Math.PI+i/15*Math.PI,r0=70*g+30,r1=(110+260*g)*R;c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-yo+Math.sin(a)*r0*.9);c.lineTo(x+Math.cos(a)*r1,F-yo+Math.sin(a)*r1*.9);
  c.lineWidth=i%2?8:13;c.strokeStyle=i%2?c1:c2;c.stroke();}ell(x,F-yo,90*g+30,70*g+20);c.fillStyle='rgba(255,252,230,.55)';c.fill();c.restore();}
function puff(i,col='rgba(235,235,225,.85)'){blob(12+(i%3)*4,i,8,.3);c.fillStyle=col;c.fill();}
function shard(i,cols,inner,R=40,sy=.75){c.save();c.rotate(hr(i)*6);c.beginPath();const n=4+(i%3);for(let k=0;k<n;k++){const a=k/n*Math.PI*2+hr(i,k)*.4,rr=R*(.5+.5*hr(i,k+2));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*sy);}c.closePath();
  c.fillStyle=lin(-R,0,R,0,cols);c.fill();c.save();c.clip();c.fillStyle=inner;c.fillRect(-R,R*sy*.3,R*2,R);c.restore();c.lineWidth=3.5;c.strokeStyle=O;c.lineJoin='round';c.stroke();c.restore();}

// ================= 1 — PAW-PRINT MUG OF COCOA =================
const BLUE=[[0,'#3d76b8'],[.35,'#8ec0ef'],[.6,'#6aa5e0'],[1,'#2f5f99']];
function pawPrint(x,y,s,col){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;ell(0,8,13,11);c.fill();for(const [px,py] of [[-15,-8],[-5,-15],[6,-15],[16,-8]]){ell(px,py,5.5,6.5);c.fill();}c.restore();}
function mugPath(){c.beginPath();c.roundRect(-72,-58,144,158,[8,8,36,36]);}
function mugBody(){mugPath();shape(lin(-72,0,72,0,BLUE),4.5,O);
  c.save();mugPath();c.clip();pawPrint(-4,30,1.9,'rgba(255,255,255,.92)');pawPrint(-44,-22,.8,'rgba(255,255,255,.5)');pawPrint(46,72,.8,'rgba(255,255,255,.5)');
  c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-56,-48,11,128);c.restore();}
function mugHandle(){c.beginPath();c.moveTo(66,-30);c.bezierCurveTo(130,-36,130,66,66,62);c.lineCap='round';c.lineWidth=27;c.strokeStyle=O;c.stroke();c.lineWidth=18;c.strokeStyle='#6aa5e0';c.stroke();
  c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.45)';c.beginPath();c.moveTo(82,-26);c.bezierCurveTo(112,-26,118,16,114,28);c.stroke();}
function mallow(i,s=1){c.save();c.rotate((hr(i)-.5)*.8);c.beginPath();c.roundRect(-13*s,-11*s,26*s,22*s,6*s);shape(i%3===1?'#ffc9de':'#fffaf3',3,O);ell(-4*s,-5*s,5*s,2.5*s);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.restore();}
function steam(){c.save();c.lineCap='round';for(let k=0;k<3;k++){const x0=-30+k*30;c.beginPath();for(let y=0;y<62;y+=4){const x=x0+Math.sin(y*.12+FR*.35+k*2)*8;y?c.lineTo(x,-80-y):c.moveTo(x,-80-y);}c.lineWidth=8;c.strokeStyle=`rgba(255,255,255,${.55-k*.08})`;c.stroke();}c.restore();}
function mugTop(){ell(0,-58,72,16);shape(lin(-72,0,72,0,[[0,'#dfe9f5'],[.5,'#ffffff'],[1,'#c9d7e8']]),4.5,O);ell(0,-55,60,11);c.fillStyle=rad(-15,-58,2,60,[[0,'#a0643a'],[1,'#5a2e14']]);c.fill();}
const mugO={h:200,w:190,rot:-Math.PI*.85,burst:540,up:1.3,spin:12,pl:-72,py:58,
  draw(){steam();mugHandle();mugBody();mugTop();
    c.save();c.translate(-26,-62);mallow(0);c.restore();c.save();c.translate(8,-67);mallow(1);c.restore();c.save();c.translate(36,-60);mallow(2,.85);c.restore();},
  parts(){const o=[];
    o.push({dx:40,dy:10,h:50,rest:24,drag:.6,draw:()=>{c.save();c.translate(-96,-16);mugHandle();c.restore();}});
    o.push({dx:-10,dy:60,h:50,rest:22,drag:.5,draw:()=>{c.save();c.translate(0,-78);c.beginPath();c.moveTo(-80,112);c.lineTo(-80,60);for(let k=0;k<=8;k++)c.lineTo(-72+k*18,60+(k%2?-12:6));c.lineTo(80,112);c.closePath();c.save();c.clip();mugBody();c.restore();
      c.beginPath();for(let k=0;k<=8;k++)c.lineTo(-72+k*18,60+(k%2?-12:6));c.lineWidth=4;c.strokeStyle='#ffffff';c.stroke();c.restore();}});
    for(let i=0;i<7;i++)o.push({dx:((i*41)%160)-80,dy:-50+((i*23)%70),h:40,rest:12,drag:.8,draw:()=>shard(i,BLUE,'#f8fbff',34+(i%3)*8)});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*26,dy:-70,h:24,rest:11,drag:.7,draw:()=>mallow(i,1.1)});
    for(let i=0;i<20;i++)o.push({dx:((i*37)%180)-90,dy:-60+((i*13)%40),h:8,rest:3,drag:1.8,vmax:300,flut:40,g:.85,draw:()=>{blob(5+(i%3)*3,i,7,.4);shape(i%4?'#7a4223':'#a0643a',1.5,'rgba(40,15,0,.6)');}});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*30,dy:-90,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(255,255,255,.75)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ffc078');const u=Math.min(1,g*1.3);ell(x,F+10,120*u+20,18);c.fillStyle='rgba(0,0,0,.2)';c.fill();
    puddle(x+8,F+8,40+130*u,10+16*u,3,rad(x-20,F,5,160,[[0,'#9c5c34'],[.6,'#6b3519'],[1,'#4a220e']]));ell(x-30,F+4,40*u,5*u);c.fillStyle='rgba(255,230,200,.35)';c.fill();
    for(let i=0;i<14;i++){const px=x+(hr(i,3)-.5)*340*(.4+.6*g),py=F+hr(i,4)*30-6;puddle(px,py,4+hr(i)*7,2+hr(i)*3,i,'#6b3519',1.5);}
    c.save();c.translate(x+60*u,F+2);mallow(7,.9);c.restore();}};

// ================= 2 — POTTED PLANT =================
const TERRA=[[0,'#8a3d1c'],[.3,'#d9773f'],[.55,'#e8935e'],[1,'#94421e']];
const LEAF=[[0,'#2b8a3e'],[.5,'#69db7c'],[1,'#2f9e44']];
function heart(x,y,s,col){c.save();c.translate(x,y);c.beginPath();c.moveTo(0,s*.5);c.bezierCurveTo(-s*1.3,-s*.25,-s*.6,-s*1.15,0,-s*.45);c.bezierCurveTo(s*.6,-s*1.15,s*1.3,-s*.25,0,s*.5);c.closePath();c.fillStyle=col;c.fill();c.restore();}
function potPath(){c.beginPath();c.moveTo(-62,32);c.lineTo(62,32);c.lineTo(50,138);c.quadraticCurveTo(48,150,36,150);c.lineTo(-36,150);c.quadraticCurveTo(-48,150,-50,138);c.closePath();}
function pot(){potPath();shape(lin(-62,0,62,0,TERRA),4.5,O);c.save();potPath();c.clip();heart(0,88,26,'#fff3e6');c.fillStyle='#fff3e6';for(let k=-2;k<=2;k++){ell(k*20,130,4,4);c.fill();}
  c.fillStyle='rgba(255,255,255,.16)';c.fillRect(-46,40,10,104);c.restore();
  c.beginPath();c.roundRect(-76,8,152,32,9);shape(lin(-76,0,76,0,TERRA),4.5,O);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(-68,13,136,5);ell(0,10,64,9);c.fillStyle='#3b2414';c.fill();}
function leaf(s,cols=LEAF){c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-34*s,-8*s,-34*s,-52*s,0,-70*s);c.bezierCurveTo(34*s,-52*s,34*s,-8*s,0,0);c.closePath();shape(lin(-30*s,0,30*s,0,cols),3,O);
  c.beginPath();c.moveTo(0,-4*s);c.quadraticCurveTo(3*s,-36*s,0,-62*s);c.lineWidth=2.5;c.strokeStyle='rgba(20,70,25,.55)';c.stroke();gloss(-9*s,-36*s,5*s,14*s,.2,.25);}
function flower(s){c.save();c.scale(s,s);for(let k=0;k<5;k++){c.save();c.rotate(k*Math.PI*2/5);ell(0,-14,9,13);shape('#ff8fab',2.5,O);c.restore();}ell(0,0,8,8);shape('#ffd43b',2.5,O);c.restore();}
const LV=[[-52,-22,-1.0,1.05],[-32,-44,-.5,1.2],[2,-52,0,1.3],[34,-44,.5,1.2],[54,-20,1.0,1.05],[-14,-70,-.22,.95],[20,-66,.28,.95]];
function plantTop(sc=1,n=7){for(let i=0;i<n;i++){const [lx,ly]=LV[i];c.beginPath();c.moveTo(0,10);c.quadraticCurveTo(lx*.2,ly*.3+10,lx*sc,ly*sc+10);c.lineWidth=6;c.strokeStyle='#2b6b2f';c.lineCap='round';c.stroke();}
  for(let i=0;i<n;i++){const [lx,ly,a,s]=LV[i];c.save();c.translate(lx*sc,ly*sc+10);c.rotate(a+Math.sin(FR*.2+i)*.04);leaf(s*sc);c.restore();}
  if(n>4){c.save();c.translate(-40*sc,-96*sc);flower(.95*sc);c.restore();c.save();c.translate(44*sc,-88*sc);flower(.8*sc);c.restore();c.save();c.translate(4*sc,-128*sc);flower(.7*sc);c.restore();}}
const plantO={h:300,w:190,rot:-Math.PI*.9,burst:540,up:1.3,spin:11,pl:-60,py:62,
  draw(){plantTop();pot();},
  parts(){const o=[];
    o.push({dx:-10,dy:-30,h:90,rest:34,drag:.6,draw:()=>{c.save();c.translate(0,20);plantTop(.75,5);c.restore();c.save();c.translate(0,30);blob(42,3,10,.3);shape(rad(-10,-10,4,50,[[0,'#6b4423'],[1,'#3b2414']]),3.5,O);c.restore();}});
    for(let i=0;i<8;i++)o.push({dx:((i*31)%160)-80,dy:60+((i*17)%60),h:40,rest:12,drag:.7,draw:()=>shard(i,TERRA,'#8a3d1c',32+(i%3)*8,.7)});
    for(let i=0;i<2;i++)o.push({dx:i?50:-50,dy:20,h:30,rest:14,drag:.8,draw:()=>{c.save();c.rotate(i?.3:-.3);c.beginPath();c.roundRect(-44,-14,88,28,8);shape(lin(-44,0,44,0,TERRA),4,O);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(-38,-9,76,4);c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*34,dy:-80,h:12,rest:5,drag:2,vmax:260,flut:80,g:.6,draw:()=>{c.save();c.rotate(Math.PI/2);c.translate(0,30);leaf(.75);c.restore();}});
    for(let i=0;i<3;i++)o.push({dx:(i-1)*60,dy:-100,h:12,rest:5,drag:2.2,vmax:220,flut:90,g:.5,draw:()=>flower(.9)});
    for(let i=0;i<18;i++)o.push({dx:((i*29)%200)-100,dy:20+((i*11)%40),h:12,rest:6,drag:.6,draw:()=>{blob(7+(i%4)*3,i,8,.45);shape(i%3?'#5c3a1e':'#3b2414',2,O);}});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*30,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(150,110,70,.55)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ffa94d');const u=Math.min(1,g*1.3);ell(x,F+12,130*u+20,20);c.fillStyle='rgba(0,0,0,.22)';c.fill();
    c.beginPath();for(let k=0;k<=24;k++){const a=Math.PI+k/24*Math.PI,r=(60+28*hr(k,3))*u;c.lineTo(x+Math.cos(a)*r*1.5,F+6+Math.sin(a)*r*.36);}c.lineTo(x+95*u,F+14);c.quadraticCurveTo(x,F+24,x-95*u,F+14);c.closePath();
    shape(lin(0,F-30,0,F+20,[[0,'#6b4423'],[1,'#3b2414']]),3.5,O);
    for(let i=0;i<30;i++){const px=x+((hr(i,1)-.5)*300)*(.4+.6*g),py=F+((hr(i,2))*36)-8;ell(px,py,3+hr(i)*5,2+hr(i)*2);c.fillStyle=i%3?'#5c3a1e':'#2e1a0c';c.fill();}}};

// ================= 3 — BIRTHDAY CAKE =================
const PINK=[[0,'#d6336c'],[.35,'#ff8fb1'],[.6,'#ff6f9c'],[1,'#c2255c']];
const MINT=[[0,'#c3fae8'],[.35,'#ffffff'],[.6,'#f1fffa'],[1,'#96f2d7']];
const SPR=['#ff6b6b','#ffd43b','#4dabf7','#69db7c','#cc5de8','#ffffff'];
function tier(y0,y1,hw,cols,top,drip,seed){const ry=hw*.17;
  c.beginPath();c.moveTo(-hw,y0);c.lineTo(-hw,y1);c.ellipse(0,y1,hw,ry,0,Math.PI,0,true);c.lineTo(hw,y0);c.closePath();shape(lin(-hw,0,hw,0,cols),4.5,O);
  c.save();c.beginPath();c.moveTo(-hw,y0);c.lineTo(-hw,y1);c.ellipse(0,y1,hw,ry,0,Math.PI,0,true);c.lineTo(hw,y0);c.closePath();c.clip();
  for(let i=0;i<28;i++){const px=(hr(i,seed)-.5)*hw*1.9,py=y0+ry+14+hr(i,seed+1)*(y1-y0-10);c.save();c.translate(px,py);c.rotate(hr(i,seed+2)*3);c.fillStyle=SPR[i%6];c.fillRect(-5,-1.6,10,3.2);c.restore();}
  c.beginPath();c.moveTo(-hw,y0);for(let k=0;k<=20;k++){const x=-hw+k*hw/10;c.lineTo(x,y0+ry*Math.sqrt(Math.max(0,1-(x/hw)**2))+6);}c.lineTo(hw,y0-4);c.closePath();c.fillStyle=drip;c.fill();
  for(let k=0;k<9;k++){const x=-hw*.88+k*hw*.22,yb=y0+ry*Math.sqrt(Math.max(0,1-(x/hw)**2)),L=10+hr(k,seed+5)*26;c.beginPath();c.roundRect(x-6,yb,12,L,6);c.fillStyle=drip;c.fill();}
  c.restore();ell(0,y0,hw,ry);shape(top,4.5,O);}
function candle(x,y,L=64,flame=true){c.save();c.translate(x,y);c.beginPath();c.roundRect(-6,-L,12,L,3);shape('#ffffff',3,O);c.save();c.beginPath();c.rect(-6,-L,12,L);c.clip();c.fillStyle='#4dabf7';for(let k=-L;k<0;k+=14){c.beginPath();c.moveTo(-8,k);c.lineTo(8,k-7);c.lineTo(8,k-1);c.lineTo(-8,k+6);c.closePath();c.fill();}c.restore();
  c.beginPath();c.moveTo(0,-L);c.lineTo(0,-L-7);c.lineWidth=2.5;c.strokeStyle=O;c.stroke();
  if(flame){const fl=1+Math.sin(FR*1.7+x)*.12;c.save();c.translate(0,-L-8);c.scale(1,fl);c.beginPath();c.moveTo(0,-26);c.bezierCurveTo(10,-14,10,-2,0,0);c.bezierCurveTo(-10,-2,-10,-14,0,-26);c.closePath();c.fillStyle=rad(0,-6,1,18,[[0,'#fff9db'],[.5,'#ffd43b'],[1,'#ff922b']]);c.fill();c.restore();
    ell(0,-L-14,22,22);c.fillStyle='rgba(255,220,120,.16)';c.fill();}c.restore();}
function cherry(){c.beginPath();c.moveTo(0,-10);c.quadraticCurveTo(4,-26,14,-30);c.lineWidth=3;c.strokeStyle='#2b8a3e';c.stroke();ell(0,0,12,12);shape(rad(-4,-4,1,13,[[0,'#ff8787'],[1,'#c92a2a']]),3,O);gloss(-4,-4,4,2.5,-.5,.8);}
function rosette(x,y,col){c.save();c.translate(x,y);ell(0,0,11,8);shape(col,2.5,O);c.beginPath();c.arc(0,-1,5,0,Math.PI*1.5);c.lineWidth=2;c.strokeStyle='rgba(0,0,0,.2)';c.stroke();c.restore();}
function plate(){ell(0,138,120,17);shape(lin(-120,0,120,0,[[0,'#dee2e6'],[.5,'#ffffff'],[1,'#ced4da']]),4,O);ell(0,135,100,11);c.strokeStyle='rgba(120,140,160,.35)';c.lineWidth=2;c.stroke();}
const cakeO={h:290,w:240,rot:-Math.PI*.9,burst:580,up:1.3,spin:11,pl:-100,py:50,
  draw(){plate();tier(56,128,100,PINK,'#ff8fb1','#ffffff',1);txt('HAPPY BIRTHDAY',0,104,'400 23px Anton','#ffffff','#a61e4d',5);
    tier(-26,52,66,MINT,'#ffffff','#ff8fb1',7);for(let k=0;k<9;k++){const a=Math.PI*(.05+k*.1125);rosette(Math.cos(a)*86,56+Math.sin(a)*15,'#ffffff');}
    for(let k=0;k<7;k++){const a=Math.PI*(.08+k*.14);rosette(Math.cos(a)*56,-26+Math.sin(a)*10,'#ff8fb1');}
    candle(-30,-24,62);candle(0,-30,70);candle(30,-24,62);c.save();c.translate(-80,46);cherry();c.restore();},
  parts(){const o=[];
    for(let i=0;i<6;i++)o.push({dx:((i*47)%180)-90,dy:-20+((i*19)%60),h:44,rest:20,drag:.7,draw:()=>cakeChunk(i)});
    o.push({dx:10,dy:-60,h:70,rest:30,drag:.6,draw:()=>{c.save();c.scale(.8,.8);cakeChunk(9,1.5);c.restore();candle(6,-12,52,false);}});
    for(let i=0;i<10;i++)o.push({dx:((i*31)%200)-100,dy:-40,h:16,rest:7,drag:1,draw:()=>{blob(10+(i%3)*4,i,9,.45);shape(i%2?'#ff8fb1':'#ffffff',2.5,O);}});
    for(let i=0;i<2;i++)o.push({dx:i?-40:40,dy:-120,h:12,rest:6,drag:1,draw:()=>{c.save();c.rotate(Math.PI/2);candle(0,32,62,false);c.restore();}});
    o.push({dx:-60,dy:30,h:24,rest:12,draw:()=>cherry()});
    for(let i=0;i<6;i++)o.push({dx:((i*53)%200)-100,dy:130,h:20,rest:8,drag:.8,draw:()=>shard(i+20,[[0,'#dee2e6'],[.5,'#ffffff'],[1,'#ced4da']],'#adb5bd',30+(i%2)*10,.5)});
    for(let i=0;i<30;i++)o.push({dx:((i*37)%220)-110,dy:-30+((i*13)%60),h:6,rest:2,drag:2.2,vmax:240,flut:70,g:.75,draw:()=>{c.save();c.rotate(i);c.fillStyle=SPR[i%6];c.fillRect(-6,-2,12,4);c.restore();}});
    for(let i=0;i<3;i++)o.push({dx:(i-1)*30,dy:-140,h:20,rest:8,drag:2.8,vmax:100,flut:40,g:.2,draw:()=>puff(i,'rgba(200,200,200,.6)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ff8fb1');const u=Math.min(1,g*1.3);ell(x,F+10,140*u+20,20);c.fillStyle='rgba(0,0,0,.22)';c.fill();
    puddle(x,F+8,50+120*u,12+14*u,5,'#ff8fb1');puddle(x-30*u,F+6,30+50*u,6+8*u,8,'#ffffff',3);
    c.beginPath();c.ellipse(x+10,F+6,70*u+10,(40*u+6),0,Math.PI,0);c.closePath();shape(lin(0,F-40,0,F+6,[[0,'#ffe8a3'],[1,'#e8b04a']]),3.5,O);
    c.beginPath();for(let k=0;k<=16;k++){const xx=x+10-(70*u+10)+k*(140*u+20)/16;c.lineTo(xx,F+6-(40*u+6)*Math.sqrt(Math.max(0,1-((xx-x-10)/(70*u+10))**2))+(k%2?10:-2));}c.closePath();c.fillStyle='#ff8fb1';c.fill();c.lineWidth=3;c.strokeStyle=O;c.stroke();
    for(let i=0;i<24;i++){c.save();c.translate(x+(((i*71)%340)-170)*(.4+.6*g),F+((i*17)%30)-4);c.rotate(i*.7);c.fillStyle=SPR[i%6];c.fillRect(-6,-2,12,4);c.restore();}}};
function cakeChunk(i,s=1){c.save();c.rotate((hr(i)-.5)*.8);c.scale(s,s);const w=30+hr(i,1)*12;c.beginPath();c.moveTo(-w,-16);c.lineTo(w,-12);c.lineTo(w-4,20);c.lineTo(-w+4,18);c.closePath();c.fillStyle='#ffe08a';c.fill();
  c.save();c.clip();c.fillStyle='#ff8fb1';c.fillRect(-w-5,-22,2*w+10,12);c.fillStyle='#e03131';c.fillRect(-w-5,2,2*w+10,4);c.fillStyle='rgba(200,140,40,.5)';for(let k=0;k<8;k++){ell(-w+hr(i,k)*2*w,-6+hr(i,k+3)*24,1.8,1.8);c.fill();}c.restore();
  c.beginPath();c.moveTo(-w,-16);c.lineTo(w,-12);c.lineTo(w-4,20);c.lineTo(-w+4,18);c.closePath();c.lineWidth=3.5;c.strokeStyle=O;c.lineJoin='round';c.stroke();c.restore();}

// ================= 4 — PHONE IN A CAT-EAR CASE =================
const LIL=[[0,'#6741d9'],[.35,'#b197fc'],[.6,'#9775fa'],[1,'#5f3dc4']];
function miniCat(x,y,s){c.save();c.translate(x,y);c.scale(s,s);for(const k of [-1,1]){c.beginPath();c.moveTo(k*12,-26);c.lineTo(k*30,-46);c.lineTo(k*34,-12);c.closePath();shape('#f4a04a',2.5,O);}
  ell(0,0,38,32);shape(rad(-8,-10,4,40,[[0,'#ffc78a'],[1,'#f08c3a']]),2.5,O);ell(-8,14,12,9);c.fillStyle='#fff4e6';c.fill();ell(8,14,12,9);c.fill();
  c.lineWidth=3;c.strokeStyle=O;c.lineCap='round';for(const k of [-1,1]){c.beginPath();c.arc(k*14,-4,7,.15*Math.PI,.85*Math.PI);c.stroke();}
  ell(0,8,4,3);c.fillStyle='#ff8fa3';c.fill();ell(-24,8,6,3.5);c.fillStyle='rgba(255,110,140,.6)';c.fill();ell(24,8,6,3.5);c.fill();c.restore();}
function phoneScreen(){c.beginPath();c.roundRect(-64,-138,128,258,16);c.fillStyle=lin(0,-138,0,120,[[0,'#ffcf87'],[.55,'#ff9e6b'],[1,'#e8596b']]);c.fill();
  c.save();c.clip();miniCat(0,62,1.15);txt('07:30',0,-92,'400 50px Anton','#ffffff','rgba(120,40,20,.35)',3);txt('TUESDAY',0,-60,'800 14px Inter','#ffffff');
  c.beginPath();c.roundRect(-56,-38,112,46,10);c.fillStyle='rgba(255,255,255,.88)';c.fill();txt('MOM',-46,-24,'800 15px Inter','#e8590c',null,4,'left');txt('is the cat ok??',-46,-6,'800 14px Inter','#212529',null,4,'left');
  c.beginPath();c.moveTo(-64,-40);c.lineTo(-20,-138);c.lineTo(10,-138);c.lineTo(-64,30);c.closePath();c.fillStyle='rgba(255,255,255,.14)';c.fill();
  c.beginPath();c.roundRect(-20,108,40,5,3);c.fillStyle='rgba(255,255,255,.8)';c.fill();c.restore();
  c.beginPath();c.roundRect(-64,-138,128,258,16);c.lineWidth=3;c.strokeStyle='#111';c.stroke();ell(0,-126,4,4);c.fillStyle='#111';c.fill();}
function caseEars(){for(const s of [-1,1]){c.beginPath();c.moveTo(s*24,-148);c.lineTo(s*58,-182);c.lineTo(s*74,-128);c.closePath();shape(lin(-76,0,76,0,LIL),4,O);c.beginPath();c.moveTo(s*38,-148);c.lineTo(s*56,-168);c.lineTo(s*64,-142);c.closePath();c.fillStyle='#ffc9de';c.fill();}}
function phoneCase(){c.beginPath();c.roundRect(-76,-150,152,282,26);shape(lin(-76,0,76,0,LIL),5,O);}
function stand(){c.beginPath();c.moveTo(-70,128);c.lineTo(70,128);c.lineTo(84,160);c.lineTo(-84,160);c.closePath();shape(lin(0,128,0,160,[[0,'#d39a5f'],[1,'#8a5a2b']]),4,O);c.beginPath();c.roundRect(-78,110,156,22,6);shape(lin(0,110,0,132,[[0,'#d8a26a'],[1,'#b5773f']]),4,O);pawPrint(0,122,.45,'rgba(90,50,20,.45)');}
function webCracks(cx,cy,n,L,seed){c.save();c.lineCap='round';c.lineJoin='round';const ends=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2+hr(i,seed)*.5;let px=cx,py=cy;c.beginPath();c.moveTo(px,py);
  for(let k=1;k<=4;k++){const aa=a+(hr(i,k+seed)-.5)*.5,r=L*k/4*(.7+.3*hr(i,k));px=cx+Math.cos(aa)*r;py=cy+Math.sin(aa)*r;c.lineTo(px,py);if(k===2)ends.push([px,py]);}
  c.lineWidth=3.5;c.strokeStyle='rgba(20,20,30,.55)';c.stroke();c.lineWidth=1.6;c.strokeStyle='rgba(255,255,255,.9)';c.stroke();}
  c.beginPath();ends.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.lineWidth=1.6;c.strokeStyle='rgba(255,255,255,.8)';c.stroke();c.restore();}
const phoneO={h:320,w:170,rot:-Math.PI*.9,burst:600,up:1.35,spin:12,pl:-76,py:150,
  draw(){caseEars();phoneCase();phoneScreen();stand();},
  parts(){const o=[];
    for(let i=0;i<2;i++)o.push({dx:i?40:-40,dy:-150,h:16,rest:8,drag:1.2,vmax:400,flut:60,g:.8,draw:()=>{c.save();c.translate(0,150);c.beginPath();c.rect(i?0:-90,-200,90,80);c.clip();caseEars();c.restore();}});
    o.push({dx:-30,dy:-40,h:30,rest:14,drag:.7,draw:()=>{c.save();c.scale(.55,.55);c.rotate(.3);c.beginPath();c.roundRect(-76,-150,152,282,26);c.roundRect(-58,-132,116,246,18);c.fillStyle=lin(-76,0,76,0,LIL);c.fill('evenodd');c.lineWidth=6;c.strokeStyle=O;c.stroke();c.restore();}});
    for(let i=0;i<16;i++)o.push({dx:((i*37)%200)-100,dy:-80+((i*29)%140),h:10,rest:4,drag:1.4,vmax:500,flut:30,g:.9,draw:()=>{c.save();c.rotate(hr(i)*6);const s=12+(i%4)*6;c.beginPath();c.moveTo(-s,-s*.4);c.lineTo(s,-s*.7);c.lineTo(s*.2,s*.8);c.closePath();
      c.fillStyle=lin(-s,0,s,0,[[0,'rgba(170,230,255,.85)'],[.5,'rgba(255,255,255,.95)'],[1,'rgba(120,170,255,.8)']]);c.fill();c.lineWidth=2;c.strokeStyle='rgba(30,40,70,.7)';c.stroke();c.restore();}});
    o.push({dx:20,dy:0,h:30,rest:14,drag:.8,draw:()=>{c.beginPath();c.roundRect(-36,-20,72,40,6);shape(lin(0,-20,0,20,[[0,'#868e96'],[1,'#495057']]),3,O);c.beginPath();c.moveTo(4,-14);c.lineTo(-8,2);c.lineTo(2,2);c.lineTo(-4,14);c.lineTo(10,-2);c.lineTo(0,-2);c.closePath();c.fillStyle='#ffd43b';c.fill();}});
    for(let i=0;i<6;i++)o.push({dx:((i*41)%160)-80,dy:20,h:12,rest:5,drag:1,draw:()=>{c.save();c.rotate(i);c.beginPath();c.rect(-12,-8,24,16);shape('#2b8a3e',2,O);c.fillStyle='#ffd43b';for(let k=0;k<4;k++)c.fillRect(-10+k*6,-6,3,3);c.fillStyle='#111';c.fillRect(-4,0,8,5);c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:((i*23)%140)-70,dy:40,h:6,rest:3,drag:1,draw:()=>{c.save();c.rotate(i*1.3);c.beginPath();c.rect(-7,-2,10,4);shape('#adb5bd',1.5,O);ell(5,0,4,4);shape('#ced4da',1.5,O);c.restore();}});
    for(let i=0;i<14;i++)o.push({dx:((i*41)%200)-100,dy:-60,h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.55,draw:()=>{star(0,0,9+(i%3)*3,3.5);shape(i%3?'#ffd43b':'#fff3b0',1.5,'#a15c00');}});
    for(let i=0;i<2;i++)o.push({dx:i?60:-60,dy:140,h:24,rest:12,drag:.8,draw:()=>{c.save();c.rotate(i?.2:-.2);c.beginPath();c.moveTo(-50,-12);c.lineTo(40,-14);c.lineTo(50,12);c.lineTo(-44,14);c.closePath();shape(lin(0,-12,0,12,[[0,'#d8a26a'],[1,'#8a5a2b']]),3.5,O);c.restore();}});
    for(let i=0;i<4;i++)o.push({dx:(i-1.5)*30,dy:-20,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.25,draw:()=>puff(i,'rgba(120,120,130,.55)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#74c0fc',50,1.1);const u=Math.min(1,g*1.3),b=g<1?Math.sin(Math.PI*Math.min(1,g*1.6))*14:0;ell(x+10,F+10,150*u+30,22);c.fillStyle='rgba(0,0,0,.24)';c.fill();
    for(let i=0;i<30;i++){const px=x+((hr(i,8)-.5)*320)*(.4+.6*g),py=F+hr(i,9)*28-4;star(px,py,3+hr(i)*3,1.2,4);c.fillStyle='rgba(220,245,255,.9)';c.fill();}
    c.save();c.translate(x-10,F-58-b);c.rotate(-Math.PI/2*(.8+.2*u));c.scale(.82,.82);c.beginPath();c.roundRect(-72,-146,144,274,24);shape('#212529',5,O);phoneScreen();
    c.save();c.beginPath();c.roundRect(-64,-138,128,258,16);c.clip();c.fillStyle='rgba(10,10,30,.25)';c.fillRect(-70,-140,140,270);webCracks(14,-30,11,170,3);webCracks(-30,70,7,80,9);c.restore();c.restore();}};

// ================= THE CAT (original: ginger tabby, white socks + bib, red collar, tsundere) =================
const GIN=[[0,'#ffd29a'],[.55,'#f6a04d'],[1,'#d9772f']],STR='#c25e22',CREAM='#fff4e6',SC=.9,CX0=208;
const OBJ={mug:mugO,plant:plantO,cake:cakeO,phone:phoneO};
function fallP(ob,u){return {x:EX+150*u,y:(TY-ob.h/2)+((F-ob.h/2)-(TY-ob.h/2))*u*u};}
function catState(f){const A=TL.attempts;const a=A.find(x=>f>=x.start&&f<x.end)||A[0];const ob=OBJ[a.obj];const k=f-a.impact;
  const S={lean:0,paw:null,look:[EX,TY-120],lid:.4,angry:.2,closed:false,wide:false,mouth:'w',vein:false,ears:0,blush:.55,tilt:0,bubble:null,puff:0,swipe:0,tailUp:0,beans:false};
  if(f<a.release){const u=(f-a.start)/(a.release-a.start),e=ease(u),ox=SL+150*e;S.lean=e;S.paw=[ox+ob.pl-20,TY-ob.py];S.look=[ox,TY-ob.py-20];S.lid=.5;S.angry=.55;S.vein=true;S.mouth='pout';S.swipe=u<.3?1-u/.3:0;}
  else if(k<0){const t=(f-a.release)/(a.impact-a.release),P=fallP(ob,t),t2=ease(Math.min(1,(f-a.release)/6));S.lean=1;S.paw=[lerp(EX+ob.pl-20,EX-40,t2),lerp(TY-ob.py,TY-96,t2)];S.beans=true;S.look=[P.x,P.y];S.lid=.58;S.angry=-.15;S.mouth='smirk';S.blush=.7;}
  else if(k===0){S.lean=1;S.paw=[EX-50,TY-110];S.beans=true;S.wide=true;S.ears=1;S.mouth='o';S.look=[EX+170,F-160];S.bubble='?!';S.puff=1;}
  else if(k<5){const t=k/5;S.lean=1-.5*t;S.paw=[EX-50-60*t,TY-110-20*t];S.beans=true;S.wide=true;S.ears=1;S.mouth='o';S.look=[EX+150,F-30];S.puff=1-t;S.bubble='!';}
  else if(k<a.hold){const t=ease(Math.min(1,(k-5)/4));S.lean=.5*(1-t);S.from=[EX-110,TY-130];S.cross=t;S.closed=true;S.tilt=-.17*t;S.blush=1;S.mouth='hmph';S.bubble='HMPH!';S.tailUp=t;S.angry=.3;}
  else{const rw=(k-a.hold+1)/(a.rw+1);if(rw<.7){S.look=[EX+80,TY-80];S.lid=.45;S.angry=.35;S.mouth='pout';S.cross=1-rw/.7;}
    else{const w=ease((rw-.7)/.3),nob=OBJ[TL.attempts[(A.indexOf(a)+1)%A.length].obj];S.wind=w;S.look=[SL,TY-nob.h/2-120*(1-w)];S.lid=.42;S.angry=.45;S.mouth='smirk';S.beans=true;}}
  return S;}
function catEye(x,y,S,side,lx,ly){if(S.closed){c.beginPath();c.arc(x,y-10,16,.18*Math.PI,.82*Math.PI);c.lineWidth=5.5;c.strokeStyle=O;c.lineCap='round';c.stroke();
    c.beginPath();c.moveTo(x-side*14,y-28);c.lineTo(x+side*12,y-22);c.lineWidth=5;c.stroke();return;}
  const rx=S.wide?22:19,ry=S.wide?25:21;ell(x,y,rx,ry);c.fillStyle='#ffffff';c.fill();c.save();ell(x,y,rx,ry);c.clip();
  const ir=S.wide?11:15,px=x+lx*(rx-ir*.7),py=y+ly*(ry-ir*.8);ell(px,py,ir,ir*1.08);c.fillStyle=rad(px-3,py-4,2,ir,[[0,'#d8f5a2'],[.6,'#8ce056'],[1,'#3e8e1e']]);c.fill();
  if(S.wide){ell(px,py,4,4);}else{ell(px,py,3.6,ir*.85);}c.fillStyle='#111';c.fill();ell(px-5,py-6,4,4);c.fillStyle='#fff';c.fill();
  if(!S.wide){const base=y-ry+2*ry*S.lid,ti=S.angry*ry*.9;const yo=base-ti*.25,yi=base+ti;const xl=x-rx-3,xr=x+rx+3;const yL=side<0?yo:yi,yR=side<0?yi:yo;
    c.beginPath();c.moveTo(xl,y-ry-6);c.lineTo(xr,y-ry-6);c.lineTo(xr,yR);c.lineTo(xl,yL);c.closePath();c.fillStyle='#f39a48';c.fill();c.restore();
    c.beginPath();c.moveTo(xl+2,yL);c.lineTo(xr-2,yR);c.lineWidth=5.5;c.strokeStyle=O;c.lineCap='round';c.stroke();}else c.restore();
  ell(x,y,rx,ry);c.lineWidth=4.5;c.strokeStyle=O;c.stroke();}
function catHead(S,hx,hy){c.save();c.translate(hx,hy);c.rotate(S.tilt);const pf=1+.05*S.puff;c.scale(pf,pf);
  for(const s of [-1,1]){c.save();c.translate(s*46+8,-50);c.rotate(s*(.12+.75*S.ears));c.beginPath();c.moveTo(-26,8);c.lineTo(s*6,-62+14*S.ears);c.lineTo(26,8);c.closePath();shape(lin(-26,0,26,0,GIN),4.5,O);
    c.beginPath();c.moveTo(-14,2);c.lineTo(s*5,-42+10*S.ears);c.lineTo(14,2);c.closePath();c.fillStyle='#ffb3b3';c.fill();c.restore();}
  c.beginPath();for(let k=0;k<=48;k++){const a=k/48*Math.PI*2,sa=Math.sin(a),ca=Math.cos(a);const fluff=(sa>.1&&Math.abs(ca)>.45)?(k%2?1.13:1):1;c.lineTo(ca*88*fluff,sa*72*fluff);}c.closePath();
  shape(rad(-16,-26,8,96,[[0,'#ffd8a6'],[.6,'#f6a04d'],[1,'#e0823a']]),4.5,O);
  c.save();c.clip();c.fillStyle=STR;for(const [x,w] of [[-22,9],[0,11],[22,9]]){c.beginPath();c.moveTo(x-w,-74);c.lineTo(x+w,-74);c.lineTo(x,-38);c.closePath();c.fill();}
  for(const s of [-1,1]){c.beginPath();c.moveTo(s*90,-6);c.lineTo(s*64,0);c.lineTo(s*90,8);c.fill();c.beginPath();c.moveTo(s*90,14);c.lineTo(s*68,18);c.lineTo(s*90,26);c.fill();}c.restore();
  const fx=10+(S.lookX||0)*8;
  ell(fx-14,26,24,17);c.fillStyle=CREAM;c.fill();ell(fx+14,26,24,17);c.fill();ell(fx,40,16,10);c.fill();
  const bl=S.blush;c.save();c.globalAlpha=bl;for(const s of [-1,1]){ell(fx+s*54,18,16,9);c.fillStyle='rgba(255,110,140,.65)';c.fill();c.lineWidth=2.4;c.strokeStyle='rgba(230,60,100,.8)';for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(fx+s*54+k*8-3,22);c.lineTo(fx+s*54+k*8+3,14);c.stroke();}}c.restore();
  const lx=S.lookX||0,ly=S.lookY||0;catEye(fx-34,-8,S,-1,lx,ly);catEye(fx+34,-8,S,1,lx,ly);
  c.beginPath();c.moveTo(fx-7,12);c.lineTo(fx+7,12);c.lineTo(fx,20);c.closePath();shape('#ff8fa3',2.5,O);
  c.lineWidth=4;c.strokeStyle=O;c.lineCap='round';c.lineJoin='round';
  if(S.mouth==='o'){ell(fx,38,9,12);shape('#8f1d2c',3.5,O);ell(fx,44,6,4);c.fillStyle='#ff8fa3';c.fill();}
  else if(S.mouth==='pout'){c.beginPath();c.moveTo(fx-14,34);c.quadraticCurveTo(fx-7,27,fx,32);c.quadraticCurveTo(fx+7,27,fx+14,34);c.stroke();}
  else if(S.mouth==='hmph'){c.beginPath();c.moveTo(fx-12,32);c.lineTo(fx+12,30);c.stroke();c.beginPath();c.moveTo(fx+4,31);c.lineTo(fx+8,40);c.lineTo(fx+11,31);c.closePath();shape('#ffffff',2,O);}
  else{c.beginPath();c.moveTo(fx,20);c.lineTo(fx,26);c.stroke();c.beginPath();c.arc(fx-7,26,7,.1,Math.PI-.3);c.stroke();c.beginPath();c.arc(fx+7,26,7,.3,Math.PI-.1);c.stroke();
    if(S.mouth==='smirk'){c.beginPath();c.moveTo(fx+13,27);c.lineTo(fx+22,20);c.stroke();}c.beginPath();c.moveTo(fx+3,31);c.lineTo(fx+6,39);c.lineTo(fx+10,31);c.closePath();shape('#ffffff',2,O);}
  c.lineWidth=2.5;c.strokeStyle='rgba(40,20,10,.75)';for(const s of [-1,1])for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(fx+s*40,26+k*7);c.lineTo(fx+s*96,22+k*16);c.stroke();}
  if(S.vein){c.save();c.translate(60,-54);c.lineWidth=5.5;c.strokeStyle='#ff2b2b';c.lineCap='round';for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){c.beginPath();c.moveTo(sx*4,sy*14);c.quadraticCurveTo(sx*4,sy*4,sx*14,sy*4);c.stroke();}c.restore();}
  c.restore();}
function catPaw(x,y,ang,beans){c.save();c.translate(x,y);c.rotate(ang);ell(0,0,27,21);shape(CREAM,4.5,O);c.lineWidth=3;c.strokeStyle=O;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(18,k*8);c.lineTo(27,k*9);c.stroke();}
  if(beans){ell(-4,0,8,7);c.fillStyle='#ff9fb2';c.fill();for(let k=-1;k<=1;k++){ell(12,k*9,4,3.5);c.fill();}}c.restore();}
function drawCat(f){const S=catState(f);const cx=CX0+85*S.lean,rot=S.lean*.09;
  const toW=(px,py)=>[cx+(px*Math.cos(rot)-py*Math.sin(rot))*SC,TY+(px*Math.sin(rot)+py*Math.cos(rot))*SC];
  const [hx,hy]=toW(26,-246);const dx=S.look[0]-hx,dy=S.look[1]-(hy-8),dl=Math.hypot(dx,dy)||1;S.lookX=dx/dl;S.lookY=dy/dl;
  // tail (behind)
  c.save();c.translate(cx,TY);c.rotate(rot);c.scale(SC,SC);const sw=Math.sin(FR*.22)*22,up=S.tailUp*50,tw=30*(1+.35*S.puff);
  c.beginPath();c.moveTo(-70,-22);c.bezierCurveTo(-150,-6,-196,-70,-176+sw*.3,-130-up*.5);c.quadraticCurveTo(-166+sw,-170-up,-138+sw,-176-up);c.lineCap='round';c.lineWidth=tw+9;c.strokeStyle=O;c.stroke();c.lineWidth=tw;c.strokeStyle='#f39a48';c.stroke();
  c.setLineDash([12,18]);c.lineDashOffset=0;c.lineWidth=tw;c.strokeStyle=STR;c.lineCap='butt';c.stroke();c.setLineDash([]);
  // body
  const bodyP=()=>{c.beginPath();c.moveTo(-92,0);c.bezierCurveTo(-114,-96,-64,-180,6,-182);c.bezierCurveTo(76,-180,106,-96,90,0);c.closePath();};
  bodyP();shape(lin(-100,0,100,0,GIN),4.5,O);c.save();bodyP();c.clip();c.lineWidth=11;c.strokeStyle=STR;c.lineCap='round';
  for(let i=0;i<4;i++){c.beginPath();c.moveTo(-108,-34-i*34);c.quadraticCurveTo(-82,-44-i*34,-66+i*4,-30-i*36);c.stroke();}ell(30,-96,44,70);c.fillStyle=CREAM;c.fill();c.restore();
  ell(-40,-46,60,46);shape(lin(-100,0,20,0,GIN),4.5,O);c.save();ell(-40,-46,60,46);c.clip();c.lineWidth=9;c.strokeStyle=STR;for(let i=0;i<3;i++){c.beginPath();c.arc(-40,-46,20+i*16,Math.PI*1.05,Math.PI*1.45);c.stroke();}c.restore();
  ell(-4,-10,34,13);shape(CREAM,4,O);
  c.beginPath();c.roundRect(4,-122,32,116,15);shape(lin(4,0,36,0,[[0,'#e58a3c'],[1,'#f6a04d']]),4.5,O);ell(22,-8,24,12);shape(CREAM,4,O);
  c.beginPath();c.ellipse(14,-170,64,16,0,.05,Math.PI-.05);c.lineWidth=17;c.strokeStyle=O;c.lineCap='round';c.stroke();c.lineWidth=11;c.strokeStyle='#e03131';c.stroke();
  ell(20,-150,12,12);shape(rad(16,-154,1,13,[[0,'#fff3b0'],[1,'#d9a400']]),3,O);c.beginPath();c.moveTo(20,-150);c.lineTo(20,-140);c.lineWidth=3;c.stroke();c.restore();
  // near arm (world space): shoulder -> paw
  const [sx,sy]=toW(54,-136);let px,py,ang=0,beans=S.beans;
  if(S.cross!==undefined){const [ax,ay]=toW(-6,-118),[rx,ry]=toW(64,-12),fr=S.from||[rx,ry],t=S.cross;px=lerp(fr[0],ax,t);py=lerp(fr[1],ay,t);ang=Math.PI*.9*t;}
  else if(S.wind!==undefined){const [rx,ry]=toW(64,-12);px=lerp(rx,cx+140,S.wind);py=lerp(ry,TY-185,S.wind);ang=-Math.PI/2*S.wind;}
  else if(S.paw){[px,py]=S.paw;ang=Math.atan2(py-sy,px-sx);}
  else{[px,py]=toW(64,-12);}
  const mx=(sx+px)/2,my=Math.min(sy,py)-26;c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,px,py);c.lineCap='round';c.lineWidth=40;c.strokeStyle=O;c.stroke();c.lineWidth=31;c.strokeStyle='#f39a48';c.stroke();
  c.save();c.beginPath();c.moveTo(sx,sy);c.quadraticCurveTo(mx,my,px,py);c.setLineDash([9,20]);c.lineCap='butt';c.lineWidth=31;c.strokeStyle=STR;c.stroke();c.restore();
  if(S.swipe>0){c.save();c.globalAlpha=S.swipe;c.lineCap='round';for(let k=0;k<3;k++){c.beginPath();c.arc(px-30,py-60+k*6,70+k*22,Math.PI*.55,Math.PI*.95);c.lineWidth=7-k*1.5;c.strokeStyle='#ffffff';c.stroke();}c.restore();}
  catPaw(px,py,ang,beans);
  catHead(S,hx,hy);
  if(S.bubble==='HMPH!'){const bx=hx+150,by=hy-70;c.save();c.translate(bx,by);c.rotate(-.06);c.beginPath();c.roundRect(-82,-38,164,76,30);c.moveTo(-60,30);c.lineTo(-92,60);c.lineTo(-30,34);shape('#ffffff',5,O);txt('HMPH!',0,2,'400 52px Anton','#e8590c');c.restore();}
  else if(S.bubble){c.save();c.translate(hx+138,hy-30);c.rotate(.12);txt(S.bubble,0,0,'400 84px Anton','#ff2b2b','#ffffff',12);c.restore();}}
function yarn(x,y){c.beginPath();c.moveTo(x+20,y-6);c.bezierCurveTo(x+60,y+2,x+80,y-14,x+120,y-3);c.lineWidth=4;c.strokeStyle='#e64980';c.lineCap='round';c.stroke();
  ell(x,y-30,30,30);shape(rad(x-8,y-40,3,32,[[0,'#ffa8c5'],[1,'#d6336c']]),4,O);c.save();ell(x,y-30,30,30);c.clip();c.lineWidth=2.5;c.strokeStyle='rgba(120,10,60,.55)';
  for(let k=0;k<5;k++){c.beginPath();c.ellipse(x,y-30,30,10+k*4,.6+k*.5,0,Math.PI*2);c.stroke();}c.restore();}
function onTable(f){FR=f;yarn(62,TY);drawCat(f);}
return {tag:'CHALLENGE #32',ask:'WHICH ONE WOULD YOU SAVE? &darr;',askStyle:{background:'#ffffff',color:'#e8590c',border:'5px solid #e8590c',fontSize:'42px',left:'110px',right:'110px'},
 secret:{title:'NICE CATCH!'},
 palette:{wallTop:'#0f3540',wallBot:'#2a7d82',sky1:'#4dabf7',sky2:'#d0f0ff',night:false,floorA:'#fff1dc',floorB:'#f0955e'},
 objects:OBJ,onTable};};
