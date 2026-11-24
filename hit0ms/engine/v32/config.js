// Video #31 — golf: four original golf objects that smash on the floor (original illustrations, no brands)
// Secret words climb the golf score ladder (each rarer than the last): PAR -> BIRDIE -> EAGLE -> ALBATROSS
//  1 GIANT GOLF BALL on a wooden tee -> the dimpled shell cracks open: shell shards, rubber windings, red core          word PAR
//  2 FLAG PIN in a plug of putting-green turf + hole cup -> sod wedges, soil clods, grass tufts, pole snaps, cup rolls word BIRDIE
//  3 GOLF BAG full of clubs (knit head covers) -> clubs, balls, tees, glove, towel, scorecard scatter; the bag flops over word EAGLE
//  4 GOLD CHAMPION TROPHY (ball-on-tee finial, marble plinth) -> handles snap, marble shatters, gold sparkles            word ALBATROSS
// Golf-themed UI (no engine change): reuses the engine's ms timing bar and relabels it EARLY / PERFECT / LATE,
// adds an "ONLY 1% CAN DO IT" pill at the top, and the catch card says "HOLE IN ONE!".
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
// ---- golf UI overlay (DOM only, inside #ui so hideUI() still hides it) ----
{const ui=document.getElementById('ui'),tag=document.getElementById('tag');tag.style.top='34px';
 const pill=document.createElement('div');pill.id='onepct';pill.innerHTML='ONLY <b>1%</b> CAN DO IT';
 Object.assign(pill.style,{position:'absolute',top:'82px',left:'50%',transform:'translateX(-50%) rotate(-2deg)',padding:'8px 30px 6px',borderRadius:'99px',
  background:'#ffd23f',color:'#111',fontFamily:'Inter',fontWeight:'800',fontSize:'40px',letterSpacing:'2px',whiteSpace:'nowrap',boxShadow:'0 6px 0 rgba(0,0,0,.35),0 0 40px rgba(255,210,63,.45)',border:'4px solid #111'});
 ui.appendChild(pill);const st=document.createElement('style');st.textContent='#onepct b{color:#d6141f}.title{top:172px!important}';document.head.appendChild(st);
 const lbl=document.querySelector('.hud .lbl');if(lbl){lbl.innerHTML='<span style="color:var(--r)">&#9664; EARLY</span><span style="color:var(--g)">PERFECT</span><span style="color:var(--o)">LATE &#9654;</span>';
  Object.assign(lbl.style,{display:'flex',justifyContent:'space-between',fontSize:'24px',letterSpacing:'3px'});}
 const bar=document.querySelector('.hud .bar');if(bar){const t=document.createElement('div');Object.assign(t.style,{position:'absolute',left:'50%',top:'-6px',width:'4px',height:'26px',marginLeft:'-2px',background:'#0b0f0c',borderRadius:'2px',opacity:'.55'});bar.insertBefore(t,bar.firstChild);}}
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#1a1e1c';const F=H.FLOOR_Y;
let FR=0;   // current timeline frame (set in onTable) -> flag waving
const hr=(a,b=0)=>{const s=Math.sin(a*12.9898+b*78.233)*43758.5453;return s-Math.floor(s);};
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function star(x,y,R,r,n=5){c.beginPath();for(let i=0;i<2*n;i++){const a=-Math.PI/2+i*Math.PI/n,rr=i%2?r:R;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function txt(s,x,y,font,fill,stroke,lw=4){c.save();c.textAlign='center';c.textBaseline='middle';c.font=font;if(stroke){c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=fill;c.fillText(s,x,y);c.restore();}
function blob(r,i,n=9,j=.35){c.beginPath();for(let k=0;k<n;k++){const a=k/n*Math.PI*2,rr=r*(1-j/2+j*hr(i,k));c.lineTo(Math.cos(a)*rr*1.15,Math.sin(a)*rr*.85);}c.closePath();}
const GOLD=[[0,'#7a4b00'],[.18,'#e0a419'],[.34,'#fff3b0'],[.5,'#f5c331'],[.78,'#c48a0a'],[1,'#6b4000']];
const GRN=['#2b8a3e','#37b24d','#51cf66','#69db7c','#40c057'];

// ---------- golf ball with real-looking dimples (sphere-projected) ----------
function dball(R,det=1,mark=false){ell(0,0,R,R);shape(rad(-R*.32,-R*.38,R*.05,R*1.05,[[0,'#ffffff'],[.55,'#f1f3f5'],[.86,'#c9d0d8'],[1,'#9aa3ad']]),Math.max(2,R*.045),O);
  c.save();ell(0,0,R,R);c.clip();const st=det>.5?0.2:0.36,rr=R*st*.37;
  for(let b=-1.48,row=0;b<1.49;b+=st,row++){const cb=Math.cos(b),da=st/Math.max(.18,cb);for(let a=-1.56+(row%2)*da/2;a<1.57;a+=da){const z=Math.cos(a)*cb;if(z<.1)continue;
    const x=R*Math.sin(a)*cb,y=R*Math.sin(b),an=Math.atan2(y,x);c.beginPath();c.ellipse(x,y,Math.max(.4,rr*z),rr,an,0,Math.PI*2);c.fillStyle=`rgba(95,105,120,${.12+.2*z})`;c.fill();
    if(det>.5){c.beginPath();c.ellipse(x+Math.cos(an)*rr*.22*z,y+Math.sin(an)*rr*.22,Math.max(.3,rr*z*.62),rr*.62,an,0,Math.PI*2);c.fillStyle='rgba(255,255,255,.55)';c.fill();}}}
  if(mark){c.save();c.rotate(-.25);c.beginPath();c.moveTo(-R*.55,R*.12);c.lineTo(R*.5,R*.12);c.lineWidth=R*.05;c.strokeStyle='#d6141f';c.stroke();
    c.beginPath();c.moveTo(R*.5,R*.12);c.lineTo(R*.38,R*.04);c.lineTo(R*.38,R*.2);c.closePath();c.fillStyle='#d6141f';c.fill();txt('1',-R*.1,-R*.2,`400 ${R*.42}px Anton`,'#d6141f');c.restore();}
  ell(0,0,R,R);c.fillStyle=rad(-R*.2,-R*.25,R*.5,R*1.02,[[0,'rgba(40,50,70,0)'],[1,'rgba(40,50,70,.32)']]);c.fill();c.restore();
  gloss(-R*.38,-R*.42,R*.22,R*.12,-.6,.75);ell(0,0,R,R);c.lineWidth=Math.max(2,R*.045);c.strokeStyle=O;c.stroke();}
function tee(h,col='#e8b04a',dark='#9c6b1c'){c.beginPath();c.moveTo(-h*.36,0);c.quadraticCurveTo(0,h*.12,h*.36,0);c.lineTo(h*.08,h*.3);c.lineTo(h*.07,h*.9);c.lineTo(0,h);c.lineTo(-h*.07,h*.9);c.lineTo(-h*.08,h*.3);c.closePath();
  shape(lin(-h*.3,0,h*.3,0,[[0,dark],[.4,col],[1,dark]]),Math.max(2,h*.05),O);ell(0,0,h*.36,h*.07);c.fillStyle='rgba(0,0,0,.25)';c.fill();}
// flash + rays on impact
function burst(x,g,c1,c2,yo=40,R=1){if(g>=1)return;c.save();c.globalAlpha=Math.min(1,(1-g)*1.7);c.lineCap='round';for(let i=0;i<16;i++){const a=-Math.PI+i/15*Math.PI,r0=70*g+30,r1=(110+260*g)*R;c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-yo+Math.sin(a)*r0*.9);c.lineTo(x+Math.cos(a)*r1,F-yo+Math.sin(a)*r1*.9);
  c.lineWidth=i%2?8:13;c.strokeStyle=i%2?c1:c2;c.stroke();}ell(x,F-yo,90*g+30,70*g+20);c.fillStyle='rgba(255,252,230,.55)';c.fill();c.restore();}
function cracks(x,g,n=9,col='rgba(20,40,20,.55)'){c.save();c.lineCap='round';c.lineJoin='round';for(let i=0;i<n;i++){const a=i/n*Math.PI*2+hr(i)*.5,L=(70+90*hr(i,2))*Math.min(1,g*1.4);let px=x,py=F+8;c.beginPath();c.moveTo(px,py);
  for(let k=1;k<=4;k++){const aa=a+(hr(i,k)-.5)*.7;px=x+Math.cos(aa)*L*k/4;py=F+8+Math.sin(aa)*L*k/4*.3;c.lineTo(px,py);}c.lineWidth=4;c.strokeStyle=col;c.stroke();c.lineWidth=1.5;c.strokeStyle='rgba(255,255,255,.35)';c.stroke();}c.restore();}
function puff(i,col='rgba(235,235,225,.85)'){blob(12+(i%3)*4,i,8,.3);c.fillStyle=col;c.fill();}

// ================= 1 — GIANT GOLF BALL ON A TEE =================
const BR=88;
const ballO={h:240,w:190,rot:-Math.PI*0.85,burst:560,up:1.3,spin:12,
  draw(){c.save();c.translate(0,-32);c.save();c.translate(0,BR-14);tee(80);c.restore();dball(BR,1,true);c.restore();},
  parts(){const o=[];
    o.push({dx:-10,dy:-40,h:40,rest:15,drag:.6,draw:()=>core()});
    for(let i=0;i<7;i++)o.push({dx:((i*41)%160)-80,dy:-60+((i*23)%60),h:40,rest:10,drag:.8,draw:()=>shell(i,1+(i%3)*.2)});
    o.push({dx:30,dy:-50,h:60,rest:22,drag:.6,draw:()=>halfShell()});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*28,dy:-30,h:20,rest:8,drag:1.6,vmax:320,flut:60,g:.8,draw:()=>tangle(i,1)});
    o.push({dx:-20,dy:60,h:20,rest:6,draw:()=>{c.save();c.rotate(.3);c.translate(0,-20);tee(48);c.restore();}});
    o.push({dx:24,dy:80,h:14,rest:5,draw:()=>{c.beginPath();c.moveTo(-14,-3);c.lineTo(14,-2);c.lineTo(18,0);c.lineTo(14,3);c.lineTo(-14,3);c.closePath();shape('#d39a3a',2.5,O);}});
    for(let i=0;i<34;i++)o.push({dx:((i*37)%200)-100,dy:-40+((i*13)%60),h:6,rest:2,drag:2.2,vmax:240,flut:70,g:.75,draw:()=>{c.save();c.rotate(i);blob(5+(i%3)*2,i,6,.5);shape(i%5?'#f8f9fa':'#e9c891',1.5,'rgba(0,0,0,.5)');c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*30,dy:40,h:20,rest:6,drag:2.6,vmax:120,flut:50,g:.35,draw:()=>puff(i)});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#ffe066');ell(x,F+10,120*Math.min(1,g*1.3),18);c.fillStyle='rgba(0,0,0,.22)';c.fill();cracks(x,g,10);
    c.save();c.translate(x-6,F-6);c.scale(1.5,.55);for(let i=0;i<4;i++){c.save();c.translate((i-1.5)*18,0);tangle(i+10,.9);c.restore();}c.restore();}};
function core(){ell(0,0,30,30);shape(rad(-9,-10,3,32,[[0,'#ffc9c9'],[.4,'#fa5252'],[1,'#a51111']]),3.5,O);gloss(-10,-12,8,4,-.5,.7);
  c.beginPath();c.arc(0,0,30,-.4,1.2);c.lineWidth=4;c.strokeStyle='rgba(233,200,145,.9)';c.stroke();}
function shell(i,s){const a0=hr(i)*6,sp=.9+hr(i,1)*.6,R=46*s,r=28*s;c.save();c.beginPath();for(let k=0;k<=8;k++){const a=a0+sp*k/8;c.lineTo(Math.cos(a)*R,Math.sin(a)*R);}
  for(let k=8;k>=0;k--){const a=a0+sp*k/8,rr=r+(k%2?6:-2)*s;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();
  c.fillStyle=rad(0,0,r,R,[[0,'#ced4da'],[.4,'#f8f9fa'],[1,'#dee2e6']]);c.fill();c.save();c.clip();
  for(let k=0;k<9;k++){const a=a0+sp*(k%3+.5)/3,rr=r+8*s+(Math.floor(k/3))*7*s;ell(Math.cos(a)*rr,Math.sin(a)*rr,4.2*s,3.2*s,a);c.fillStyle='rgba(95,105,120,.32)';c.fill();}c.restore();
  c.lineWidth=3;c.strokeStyle=O;c.lineJoin='round';c.stroke();c.beginPath();for(let k=0;k<=8;k++){const a=a0+sp*k/8,rr=r+(k%2?6:-2)*s+3;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.lineWidth=3;c.strokeStyle='rgba(233,200,145,.9)';c.stroke();c.restore();}
function halfShell(){c.save();c.beginPath();c.rect(-60,-60,120,60);c.clip();c.scale(.6,.6);dball(BR,0);c.restore();ell(0,0,53,12);shape(rad(0,0,4,54,[[0,'#868e96'],[.7,'#ced4da'],[1,'#e9ecef']]),3,O);
  c.save();ell(0,0,53,12);c.clip();for(let k=0;k<6;k++){c.beginPath();c.ellipse(0,2,40-k*6,8-k,0,0,Math.PI*2);c.lineWidth=2.5;c.strokeStyle='rgba(233,200,145,.85)';c.stroke();}c.restore();}
function tangle(i,s){c.save();c.scale(s,s);c.beginPath();c.moveTo(-28,0);for(let k=0;k<5;k++){const x=-28+k*14;c.bezierCurveTo(x+(hr(i,k)-.5)*40,-26+hr(i,k+5)*20,x+(hr(i,k+9)-.5)*40,26-hr(i,k+3)*20,x+14,(hr(i,k+7)-.5)*18);}
  c.lineCap='round';c.lineJoin='round';c.lineWidth=6;c.strokeStyle='rgba(60,40,20,.8)';c.stroke();c.lineWidth=3.5;c.strokeStyle='#e9c891';c.stroke();c.lineWidth=1;c.strokeStyle='#fff4dc';c.stroke();c.restore();}

// ================= 2 — FLAG PIN IN A TURF PLUG =================
function sod(rx,ry,dep,ty){
  c.beginPath();c.moveTo(-rx,ty);c.lineTo(-rx,ty+dep);c.ellipse(0,ty+dep,rx,ry,0,Math.PI,0,true);c.lineTo(rx,ty);c.ellipse(0,ty,rx,ry,0,0,Math.PI,false);c.closePath();
  c.fillStyle=lin(-rx,0,rx,0,[[0,'#3d220f'],[.3,'#8b5a2b'],[.55,'#7a4a22'],[1,'#3a200c']]);c.fill();c.save();c.clip();
  c.fillStyle='rgba(30,15,5,.28)';for(let k=0;k<4;k++){c.beginPath();c.moveTo(-rx,ty+22+k*16);for(let x=-rx;x<=rx;x+=12)c.lineTo(x,ty+22+k*16+Math.sin(x*.08+k)*4+ry*Math.sqrt(Math.max(0,1-(x/rx)**2)));c.lineTo(rx,ty+dep+ry+10);c.lineTo(-rx,ty+dep+ry+10);c.closePath();c.fill();}
  for(let k=0;k<18;k++){const x=(hr(k,1)-.5)*rx*1.8,y=ty+ry*.8+12+hr(k,2)*(dep-6);ell(x,y,3+hr(k)*4,2.5+hr(k)*2.5);c.fillStyle=k%3?'#a7835a':'#5c3d20';c.fill();}
  c.strokeStyle='rgba(235,210,160,.55)';c.lineWidth=1.6;for(let k=0;k<7;k++){const x=(hr(k,4)-.5)*rx*1.6;c.beginPath();c.moveTo(x,ty+ry);c.bezierCurveTo(x+8,ty+ry+18,x-8,ty+ry+26,x+4,ty+ry+40+hr(k)*18);c.stroke();}
  c.fillStyle='rgba(43,90,30,.9)';c.beginPath();c.moveTo(-rx,ty);for(let x=-rx;x<=rx;x+=6)c.lineTo(x,ty+ry*Math.sqrt(Math.max(0,1-(x/rx)**2))+10+Math.sin(x*.5)*2);c.lineTo(rx,ty-10);c.closePath();c.fill();c.restore();
  c.lineWidth=4;c.strokeStyle=O;c.lineJoin='round';c.beginPath();c.moveTo(-rx,ty);c.lineTo(-rx,ty+dep);c.ellipse(0,ty+dep,rx,ry,0,Math.PI,0,true);c.lineTo(rx,ty);c.stroke();
  ell(0,ty,rx,ry);c.fillStyle=rad(-rx*.3,ty-ry,4,rx*1.2,[[0,'#8ce99a'],[.5,'#40c057'],[1,'#2b8a3e']]);c.fill();c.save();c.clip();
  for(let k=-6;k<7;k+=2){c.beginPath();c.moveTo(k*22-30,ty-ry);c.lineTo(k*22+0,ty-ry);c.lineTo(k*22+20,ty+ry);c.lineTo(k*22-10,ty+ry);c.closePath();c.fillStyle='rgba(255,255,255,.1)';c.fill();}
  for(let k=0;k<60;k++){const x=(hr(k,7)-.5)*rx*1.9,y=ty+(hr(k,8)-.5)*ry*1.8;c.beginPath();c.moveTo(x,y);c.lineTo(x+1.5,y-4);c.lineWidth=1.4;c.strokeStyle=k%2?'rgba(20,80,30,.45)':'rgba(200,255,200,.4)';c.stroke();}c.restore();
  ell(0,ty,rx,ry);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  for(let x=-rx+4;x<rx;x+=6){const y=ty+ry*Math.sqrt(Math.max(0,1-(x/rx)**2)),hh=7+hr(x,3)*9;c.beginPath();c.moveTo(x-2.5,y+1);c.lineTo(x+(hr(x)-.5)*4,y-hh);c.lineTo(x+2.5,y+1);c.closePath();c.fillStyle=GRN[Math.floor(hr(x,5)*5)];c.fill();}}
function flagCloth(x0,y0,wv){const W=120,Hh=74;c.save();c.translate(x0,y0);c.beginPath();c.moveTo(0,0);
  for(let k=1;k<=6;k++){const x=W*k/6;c.lineTo(x,Math.sin(k*.9+wv)*6*k/6+k*1.5);}for(let k=6;k>=0;k--){const x=W*k/6;c.lineTo(x-(k===6?4:0),Hh-k*3+Math.sin(k*.9+wv+.5)*6*k/6);}c.closePath();
  shape(lin(0,0,W,0,[[0,'#a51111'],[.3,'#ff4d4d'],[.55,'#e03131'],[.8,'#ff6b6b'],[1,'#b51d1d']]),4,O);
  c.save();c.clip();for(let k=1;k<6;k++){const x=W*k/6;c.fillStyle=Math.sin(k*.9+wv)>0?'rgba(255,255,255,.12)':'rgba(0,0,0,.14)';c.fillRect(x-10,-10,20,Hh+20);}c.restore();
  txt('18',W*.45,Hh*.5+4,'400 42px Anton','#ffffff','#7a0a0a',5);c.restore();}
function pole(y0,y1){c.beginPath();c.roundRect(-5,y0,10,y1-y0,4);shape(lin(-5,0,5,0,[[0,'#adb5bd'],[.4,'#ffffff'],[1,'#868e96']]),3,O);
  c.save();c.beginPath();c.rect(-5,y0,10,y1-y0);c.clip();c.fillStyle='#1a1e1c';for(let y=y1-40;y>y1-120&&y>y0;y-=36)c.fillRect(-6,y,12,10);c.restore();}
function cup(){c.beginPath();c.moveTo(-22,-16);c.lineTo(-22,16);c.ellipse(0,16,22,7,0,Math.PI,0,true);c.lineTo(22,-16);c.closePath();shape(lin(-22,0,22,0,[[0,'#ced4da'],[.4,'#ffffff'],[1,'#adb5bd']]),3,O);
  ell(0,-16,22,7);shape('#343a40',3,O);ell(0,-15,16,4.5);c.fillStyle='#111';c.fill();}
const PT=60;
const flagO={h:360,w:210,rot:-Math.PI*0.95,burst:540,up:1.3,spin:11,
  draw(){const wv=FR*.55;sod(105,30,80,PT);ell(18,PT+2,25,8);shape('#141414',3,O);c.beginPath();c.ellipse(18,PT+3,23,6.5,0,0,Math.PI);c.lineWidth=3;c.strokeStyle='#f8f9fa';c.stroke();
    c.save();c.translate(-52,PT-4);dball(14,0);c.restore();c.save();c.translate(18,0);pole(-180,PT+2);ell(0,-182,8,8);shape(rad(-2,-185,1,9,[[0,'#fff3b0'],[1,'#c48a0a']]),2.5,O);flagCloth(4,-172,wv);c.restore();},
  parts(){const o=[];
    o.push({dx:24,dy:-110,h:30,rest:12,drag:.7,draw:()=>{c.save();c.rotate(Math.PI/2);c.translate(0,40);pole(-110,20);flagCloth(4,-104,FR*.7);c.restore();}});
    o.push({dx:10,dy:20,h:12,rest:5,draw:()=>{c.save();c.rotate(Math.PI/2);pole(-60,60);c.restore();}});
    o.push({dx:30,dy:PT,h:40,rest:16,drag:.5,draw:()=>{c.save();c.rotate(Math.PI/2);cup();c.restore();}});
    o.push({dx:-50,dy:PT-10,h:28,rest:14,draw:()=>dball(14,0)});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*44,dy:PT+30,h:44,rest:16,drag:.5,draw:()=>sodChunk(i)});
    for(let i=0;i<16;i++)o.push({dx:((i*31)%200)-100,dy:PT+40,h:12,rest:6,drag:.6,draw:()=>{blob(7+(i%4)*3,i,8,.45);shape(i%3?'#7a4a22':'#5c3a1e',2,O);}});
    for(let i=0;i<10;i++)o.push({dx:((i*43)%200)-100,dy:PT,h:10,rest:4,drag:2.2,vmax:220,flut:80,g:.7,draw:()=>tuft(i)});
    for(let i=0;i<7;i++)o.push({dx:(i-3)*30,dy:PT+40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i,'rgba(150,110,70,.55)')});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#d8b27a');const u=Math.min(1,g*1.3);ell(x,F+12,130*u+20,20);c.fillStyle='rgba(0,0,0,.22)';c.fill();
    c.beginPath();for(let k=0;k<=24;k++){const a=Math.PI+k/24*Math.PI,r=(70+30*hr(k,3))*u;c.lineTo(x+Math.cos(a)*r*1.5,F+6+Math.sin(a)*r*.32);}c.lineTo(x+105*u,F+14);c.quadraticCurveTo(x,F+24,x-105*u,F+14);c.closePath();
    shape(lin(0,F-30,0,F+20,[[0,'#9c6b3a'],[1,'#5c3a1e']]),3.5,O);
    for(let i=0;i<30;i++){const px=x+((hr(i,1)-.5)*300)*(.4+.6*g),py=F+((hr(i,2))*36)-8;ell(px,py,3+hr(i)*5,2+hr(i)*2);c.fillStyle=i%3?'#6b4423':'#3d220f';c.fill();}
    for(let i=0;i<8;i++){c.save();c.translate(x+(hr(i,5)-.5)*180*u,F+2+hr(i,6)*10);tuft(i);c.restore();}}};
function sodChunk(i){c.save();c.rotate((hr(i)-.5)*.6);const w=34+hr(i,1)*12;c.beginPath();c.moveTo(-w,-8);c.lineTo(w,-12);c.lineTo(w+4,16);c.lineTo(w*.3,22);c.lineTo(-w*.4,18);c.lineTo(-w-3,22);c.closePath();
  shape(lin(0,-10,0,22,[[0,'#8b5a2b'],[1,'#4a2c14']]),3,O);c.beginPath();c.moveTo(-w,-8);c.lineTo(w,-12);c.lineTo(w,-2);c.lineTo(-w,2);c.closePath();shape(lin(0,-12,0,2,[[0,'#69db7c'],[1,'#2f9e44']]),3,O);
  for(let x=-w+3;x<w;x+=5){c.beginPath();c.moveTo(x-2,-9+x*-.05);c.lineTo(x+(hr(x,i)-.5)*4,-16-hr(x,i+1)*7);c.lineTo(x+2,-9+x*-.05);c.fillStyle=GRN[(x+i*7+60)%5|0];c.fill();}c.restore();}
function tuft(i){c.save();c.rotate((hr(i,2)-.5)*1.2);for(let k=0;k<6;k++){c.beginPath();c.moveTo(-6+k*2.4,6);c.quadraticCurveTo(-8+k*3+(hr(i,k)-.5)*10,-6,-8+k*4+(hr(i,k+3)-.5)*12,-14-hr(i,k)*6);c.lineWidth=3;c.lineCap='round';c.strokeStyle=GRN[(i+k)%5];c.stroke();}c.restore();}

// ================= 3 — GOLF BAG WITH CLUBS =================
function headcover(s,cA,cB){c.save();c.scale(s,s);c.beginPath();c.moveTo(-24,30);c.bezierCurveTo(-30,0,-32,-34,0,-38);c.bezierCurveTo(32,-34,30,0,24,30);c.closePath();shape(cA,3.5,O);
  c.save();c.clip();for(let y=-30;y<32;y+=14){c.fillStyle=cB;c.fillRect(-40,y,80,6);}c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=1.5;for(let x=-28;x<30;x+=5){c.beginPath();c.moveTo(x,-40);c.lineTo(x+3,34);c.stroke();}
  c.fillStyle=lin(-26,0,26,0,[[0,'rgba(0,0,0,.3)'],[.4,'rgba(255,255,255,.12)'],[1,'rgba(0,0,0,.35)']]);c.fillRect(-40,-40,80,80);c.restore();
  c.beginPath();c.moveTo(-24,30);c.bezierCurveTo(-30,0,-32,-34,0,-38);c.bezierCurveTo(32,-34,30,0,24,30);c.closePath();c.lineWidth=3.5;c.strokeStyle=O;c.stroke();
  for(let k=0;k<12;k++){const a=k/12*Math.PI*2;ell(Math.cos(a)*9,-44+Math.sin(a)*9,7,7);c.fillStyle=k%2?cB:'#ffffff';c.fill();}ell(0,-44,12,12);shape(rad(-3,-47,1,13,[[0,'#ffffff'],[1,cB]]),2.5,O);c.restore();}
function ironHead(){c.beginPath();c.moveTo(-6,6);c.lineTo(36,-6);c.quadraticCurveTo(44,-6,42,6);c.lineTo(38,16);c.lineTo(-4,16);c.closePath();shape(lin(0,-6,0,16,[[0,'#f1f3f5'],[.5,'#adb5bd'],[1,'#6c757d']]),3,O);
  c.strokeStyle='rgba(60,60,70,.55)';c.lineWidth=1.3;for(let k=0;k<4;k++){c.beginPath();c.moveTo(2,3+k*3.5);c.lineTo(34,-1+k*3.5);c.stroke();}}
function putterHead(){c.beginPath();c.roundRect(-8,-4,46,18,5);shape(lin(0,-4,0,14,[[0,'#dee2e6'],[1,'#495057']]),3,O);c.fillStyle='#f8f9fa';c.fillRect(12,-2,2,14);}
function driverHead(){c.beginPath();c.moveTo(-6,-14);c.bezierCurveTo(30,-26,60,-12,58,6);c.bezierCurveTo(56,20,20,22,-4,10);c.closePath();shape(rad(20,-10,3,50,[[0,'#6c7a89'],[.4,'#2b3036'],[1,'#0b0d10']]),3.5,O);gloss(24,-12,12,4,.05,.45);
  c.beginPath();c.moveTo(-4,8);c.bezierCurveTo(20,18,50,16,57,4);c.lineWidth=2;c.strokeStyle='#adb5bd';c.stroke();}
function club(type){c.save();c.beginPath();c.roundRect(-140,-6,58,12,5);shape('#212529',3,O);c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=1.5;for(let x=-136;x<-84;x+=6){c.beginPath();c.moveTo(x,-5);c.lineTo(x+4,5);c.stroke();}
  c.beginPath();c.moveTo(-84,-4);c.lineTo(112,-2);c.lineTo(112,2);c.lineTo(-84,4);c.closePath();shape(lin(0,-4,0,4,[[0,'#f8f9fa'],[.5,'#adb5bd'],[1,'#6c757d']]),2.5,O);
  c.translate(112,0);c.rotate(-Math.PI/2+.25);if(type==='driver')driverHead();else if(type==='putter')putterHead();else ironHead();c.restore();}
function bagBody(){c.beginPath();c.roundRect(-62,-40,124,210,[10,10,24,24]);c.fillStyle=lin(-62,0,62,0,[[0,'#0c1c40'],[.3,'#2f5fb8'],[.55,'#234a96'],[1,'#0a1733']]);c.fill();c.save();c.clip();
  c.fillStyle='#f8f9fa';c.fillRect(-70,-40,140,16);c.fillStyle='#e03131';c.fillRect(-70,-24,140,8);c.fillStyle='#e03131';c.fillRect(-70,26,140,10);c.fillStyle='#f8f9fa';c.fillRect(-70,36,140,4);
  c.fillStyle=lin(0,140,0,170,[[0,'#1a1e1c'],[1,'#000']]);c.fillRect(-70,140,140,32);c.fillStyle='#f8f9fa';c.fillRect(-70,136,140,4);
  c.fillStyle=lin(-62,0,62,0,[[0,'rgba(0,0,0,.28)'],[.3,'rgba(255,255,255,.12)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.35)']]);c.fillRect(-70,-40,140,210);c.restore();
  c.beginPath();c.roundRect(-62,-40,124,210,[10,10,24,24]);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  c.beginPath();c.roundRect(-40,48,80,84,16);shape(lin(-40,0,40,0,[[0,'#1d3f86'],[.4,'#3b6fd0'],[1,'#173273']]),3.5,O);
  c.beginPath();c.moveTo(-34,58);c.quadraticCurveTo(0,50,34,58);c.setLineDash([4,3]);c.lineWidth=3;c.strokeStyle='#ced4da';c.stroke();c.setLineDash([]);
  c.beginPath();c.roundRect(26,56,8,18,3);shape('#adb5bd',2,O);
  c.save();c.translate(0,96);c.beginPath();c.moveTo(-4,22);c.lineTo(-4,-20);c.lineTo(18,-12);c.lineTo(-4,-4);c.lineWidth=3;c.strokeStyle='#ffffff';c.stroke();c.fillStyle='#ffd23f';c.beginPath();c.moveTo(-4,-20);c.lineTo(18,-12);c.lineTo(-4,-4);c.closePath();c.fill();ell(-4,24,12,4);c.strokeStyle='#ffffff';c.lineWidth=2.5;c.stroke();c.restore();
  c.beginPath();c.moveTo(58,-22);c.bezierCurveTo(98,0,100,90,60,124);c.lineWidth=16;c.strokeStyle=O;c.lineCap='round';c.stroke();c.lineWidth=11;c.strokeStyle='#212529';c.stroke();c.setLineDash([3,4]);c.lineWidth=1.5;c.strokeStyle='#868e96';c.stroke();c.setLineDash([]);
  c.beginPath();c.roundRect(70,20,22,40,6);shape('#343a40',3,O);}
function bagTop(){ell(0,-40,62,18);shape('#0a0f1c',4,O);c.beginPath();c.moveTo(-50,-40);c.lineTo(50,-40);c.moveTo(0,-56);c.lineTo(0,-24);c.lineWidth=3;c.strokeStyle='#495057';c.stroke();}
function bagRim(){c.beginPath();c.ellipse(0,-40,62,18,0,0,Math.PI);c.lineWidth=9;c.strokeStyle=O;c.stroke();c.lineWidth=5;c.strokeStyle='#f1f3f5';c.stroke();}
function shaftUp(x0,x1,y1){c.beginPath();c.moveTo(x0,-40);c.lineTo(x1,y1);c.lineWidth=7;c.strokeStyle=O;c.stroke();c.lineWidth=4;c.strokeStyle='#ced4da';c.stroke();}
const bagO={h:350,w:170,rot:-Math.PI*0.9,burst:560,up:1.3,spin:11,
  draw(){bagBody();bagTop();
    shaftUp(26,34,-140);c.save();c.translate(34,-140);c.rotate(-.5);ironHead();c.restore();
    shaftUp(42,52,-122);c.save();c.translate(52,-122);c.rotate(-.35);ironHead();c.restore();
    shaftUp(8,10,-150);c.save();c.translate(10,-152);c.rotate(-.1);putterHead();c.restore();
    shaftUp(-6,-2,-110);c.save();c.translate(-4,-128);c.rotate(.12);headcover(.78,'#1c7ed6','#ffffff');c.restore();
    shaftUp(-30,-40,-118);c.save();c.translate(-40,-136);c.rotate(-.18);headcover(.95,'#e03131','#ffffff');c.restore();
    bagRim();},
  parts(){const o=[];
    const CL=['driver','iron','putter','iron'];for(let i=0;i<4;i++)o.push({dx:(i-1.5)*40,dy:-130,h:30,rest:9,drag:.5,draw:()=>club(CL[i])});
    o.push({dx:-40,dy:-140,h:60,rest:24,drag:.9,draw:()=>headcover(.95,'#e03131','#ffffff')});
    o.push({dx:-4,dy:-130,h:50,rest:20,drag:.9,draw:()=>headcover(.78,'#1c7ed6','#ffffff')});
    for(let i=0;i<7;i++)o.push({dx:((i*29)%120)-60,dy:-40+i*10,h:32,rest:16,draw:()=>dball(16,0)});
    for(let i=0;i<10;i++)o.push({dx:((i*23)%140)-70,dy:-30,h:8,rest:4,drag:1.2,draw:()=>{c.save();c.rotate(Math.PI/2);c.translate(0,-14);tee(28,['#ffd23f','#ff6b6b','#ffffff','#4dabf7','#e8b04a'][i%5],'#5f3d10');c.restore();}});
    o.push({dx:30,dy:60,h:12,rest:6,drag:1.6,flut:50,draw:()=>glove()});
    o.push({dx:-30,dy:20,h:12,rest:4,drag:2.2,vmax:240,flut:90,g:.6,draw:()=>towel()});
    o.push({dx:10,dy:80,h:8,rest:3,drag:2.6,vmax:180,flut:110,g:.5,draw:()=>card()});
    o.push({dx:0,dy:90,h:6,rest:3,drag:1,draw:()=>{c.beginPath();c.moveTo(-20,-3);c.lineTo(14,-3);c.lineTo(22,0);c.lineTo(14,3);c.lineTo(-20,3);c.closePath();shape('#ffd23f',2,O);}});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*30,dy:120,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i)});
    return o;},
  decal(x,g){burst(x,g,'#ffffff','#74c0fc');const u=Math.min(1,g*1.4),b=g<1?Math.sin(Math.PI*Math.min(1,g*1.6))*14:0;ell(x+40,F+10,170,22);c.fillStyle='rgba(0,0,0,.24)';c.fill();
    c.save();c.translate(x-40,F-60-b);c.rotate(-Math.PI/2*(.75+.25*u));bagBody();bagTop();bagRim();c.restore();}};
function glove(){c.save();c.beginPath();c.moveTo(-18,10);c.lineTo(-20,-6);for(let k=0;k<4;k++){c.lineTo(-14+k*8,-24+Math.abs(k-1.5)*3);c.lineTo(-10+k*8,-24+Math.abs(k-1.5)*3);c.lineTo(-8+k*8,-6);}c.lineTo(22,-10);c.lineTo(28,-2);c.lineTo(16,8);c.lineTo(14,12);c.closePath();shape('#f8f9fa',3,O);
  c.beginPath();c.roundRect(-18,6,32,8,3);shape('#212529',2,O);c.restore();}
function towel(){c.beginPath();c.moveTo(-26,-14);c.quadraticCurveTo(0,-20,26,-14);c.lineTo(24,14);c.quadraticCurveTo(0,8,-24,16);c.closePath();shape('#ffffff',3,O);c.save();c.clip();c.fillStyle='rgba(43,138,62,.75)';for(let x=-26;x<28;x+=12)c.fillRect(x,-20,5,40);for(let y=-14;y<16;y+=12)c.fillRect(-30,y,60,4);c.restore();}
function card(){c.beginPath();c.rect(-22,-14,44,28);shape('#fffaf0',2.5,O);c.strokeStyle='rgba(43,138,62,.8)';c.lineWidth=1;for(let x=-14;x<22;x+=8){c.beginPath();c.moveTo(x,-14);c.lineTo(x,14);c.stroke();}for(let y=-6;y<14;y+=7){c.beginPath();c.moveTo(-22,y);c.lineTo(22,y);c.stroke();}
  c.fillStyle='#2b8a3e';c.fillRect(-22,-14,44,6);}

// ================= 4 — GOLD CHAMPION TROPHY =================
function marble(x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);shape(lin(x,0,x+w,0,[[0,'#0b2a1e'],[.35,'#1f5c43'],[.6,'#164a35'],[1,'#071c14']]),4,O);c.save();c.clip();
  c.strokeStyle='rgba(220,255,235,.35)';c.lineWidth=1.6;for(let k=0;k<4;k++){c.beginPath();c.moveTo(x+hr(k,y)*w,y);c.bezierCurveTo(x+hr(k,1)*w,y+h*.4,x+hr(k,2)*w,y+h*.6,x+hr(k,3)*w,y+h);c.stroke();}
  c.fillStyle='rgba(255,255,255,.12)';c.fillRect(x,y,w,4);c.restore();}
function bowl(){c.beginPath();c.moveTo(-82,-95);c.bezierCurveTo(-82,-20,-40,18,0,20);c.bezierCurveTo(40,18,82,-20,82,-95);c.closePath();shape(lin(-82,0,82,0,GOLD),4.5,O);
  c.save();c.clip();c.beginPath();c.moveTo(-60,-85);c.bezierCurveTo(-60,-30,-36,0,-20,8);c.lineWidth=7;c.strokeStyle='rgba(255,255,255,.55)';c.stroke();
  c.translate(0,-42);c.strokeStyle='rgba(110,70,0,.75)';c.lineWidth=4;c.lineCap='round';for(const k of [-1,1]){c.beginPath();c.moveTo(k*-26,-24);c.lineTo(k*20,24);c.stroke();c.beginPath();c.moveTo(k*20,24);c.lineTo(k*30,20);c.stroke();}
  ell(0,-30,7,7);c.stroke();c.beginPath();c.moveTo(-38,32);c.quadraticCurveTo(0,44,38,32);c.stroke();c.restore();
  ell(0,-95,82,14);shape(lin(-82,0,82,0,[[0,'#6b4000'],[.5,'#c48a0a'],[1,'#5a3500']]),4.5,O);ell(0,-93,70,9);c.fillStyle='rgba(40,20,0,.45)';c.fill();}
function handle(k){c.beginPath();c.moveTo(k*78,-80);c.bezierCurveTo(k*128,-84,k*128,-8,k*42,6);c.lineCap='round';c.lineWidth=20;c.strokeStyle=O;c.stroke();c.lineWidth=13;c.strokeStyle='#e0a419';c.stroke();c.lineWidth=4;c.strokeStyle='#fff3b0';c.stroke();}
function stem(){c.beginPath();c.moveTo(-14,20);c.quadraticCurveTo(-8,48,-34,78);c.lineTo(34,78);c.quadraticCurveTo(8,48,14,20);c.closePath();shape(lin(-34,0,34,0,GOLD),4,O);ell(0,44,22,8);shape(lin(-22,0,22,0,GOLD),3.5,O);}
function finial(){c.save();c.translate(0,-128);tee(30,'#f5c331','#7a4b00');c.restore();c.save();c.translate(0,-148);dball(22,0);c.restore();}
const trophyO={h:330,w:260,rot:-Math.PI*0.9,burst:600,up:1.35,spin:12,
  draw(){c.save();c.translate(0,5);marble(-95,110,190,50,6);marble(-75,78,150,34,5);c.beginPath();c.roundRect(-58,122,116,28,4);shape(lin(-58,0,58,0,GOLD),3,O);txt('CHAMPION',0,137,'400 20px Anton','#4a2c00');
    stem();handle(-1);handle(1);bowl();finial();c.restore();},
  parts(){const o=[];
    o.push({dx:0,dy:-40,h:110,rest:44,drag:.5,draw:()=>bowl()});
    for(const k of [-1,1])o.push({dx:k*90,dy:-40,h:30,rest:14,drag:.8,draw:()=>{c.save();c.translate(-k*80,40);handle(k);c.restore();}});
    o.push({dx:10,dy:60,h:40,rest:20,drag:.6,draw:()=>{c.save();c.translate(0,-48);stem();c.restore();}});
    o.push({dx:-20,dy:-150,h:44,rest:22,draw:()=>dball(22,0)});
    o.push({dx:20,dy:-130,h:10,rest:5,drag:1,draw:()=>{c.save();c.rotate(Math.PI/2);c.translate(0,-15);tee(30,'#f5c331','#7a4b00');c.restore();}});
    o.push({dx:-30,dy:135,h:20,rest:10,drag:1,draw:()=>{c.beginPath();c.roundRect(-58,-14,116,28,4);shape(lin(-58,0,58,0,GOLD),3,O);txt('CHAMPION',0,1,'400 20px Anton','#4a2c00');}});
    for(let i=0;i<7;i++)o.push({dx:((i*53)%180)-90,dy:110,h:30,rest:12,drag:.6,draw:()=>{c.save();c.rotate(hr(i)*3);c.beginPath();const w=20+hr(i,1)*20;c.moveTo(-w,-10);c.lineTo(w*.7,-14);c.lineTo(w,8);c.lineTo(-w*.4,14);c.closePath();c.clip();marble(-w-4,-16,w*2+8,32,0);c.restore();
      c.save();c.rotate(hr(i)*3);c.beginPath();const w2=20+hr(i,1)*20;c.moveTo(-w2,-10);c.lineTo(w2*.7,-14);c.lineTo(w2,8);c.lineTo(-w2*.4,14);c.closePath();c.lineWidth=3;c.strokeStyle=O;c.stroke();c.restore();}});
    for(let i=0;i<24;i++)o.push({dx:((i*41)%240)-120,dy:-60+((i*17)%80),h:10,rest:3,drag:2.2,vmax:220,flut:100,g:.6,draw:()=>{star(0,0,9+(i%3)*2,3.8);shape(i%3?'#ffd43b':'#fff3b0',1.5,'#7a4b00');}});
    for(let i=0;i<30;i++)o.push({dx:((i*29)%240)-120,dy:-80,h:8,rest:2,drag:2.4,vmax:200,flut:100,g:.7,draw:()=>{c.save();c.rotate(i*1.3);c.beginPath();c.rect(-8,-3,16,6);shape(lin(-8,0,8,0,GOLD),1.2,'rgba(0,0,0,.45)');c.restore();}});
    return o;},
  decal(x,g){burst(x,g,'#fff3b0','#ffd43b',50,1.1);const u=Math.min(1,g*1.3);ell(x,F+10,140*u+30,22);c.fillStyle='rgba(0,0,0,.24)';c.fill();cracks(x,g,12,'rgba(10,30,15,.6)');
    for(let i=0;i<9;i++){c.save();c.translate(x+(hr(i,4)-.5)*240*u,F+4+hr(i,5)*14);c.rotate((hr(i,6)-.5)*.5);const w=16+hr(i,7)*22;c.beginPath();c.moveTo(-w,-6);c.lineTo(w*.8,-10);c.lineTo(w,6);c.lineTo(-w*.6,9);c.closePath();c.save();c.clip();marble(-w-2,-12,w*2+4,24,0);c.restore();
      c.beginPath();c.moveTo(-w,-6);c.lineTo(w*.8,-10);c.lineTo(w,6);c.lineTo(-w*.6,9);c.closePath();c.lineWidth=3;c.strokeStyle=O;c.stroke();c.restore();}
    for(let i=0;i<26;i++){c.save();c.translate(x+(((i*71)%340)-170)*(.4+.6*g),F+((i*17)%34)-6);c.rotate(i*.7);c.scale(1,.45);c.fillStyle=i%2?'#ffd43b':'#e0a419';c.fillRect(-7,-4,14,8);c.restore();}}};

// ---------- table: bucket of range balls, a driver addressing a ball on a tee; golf pennants on the wall ----------
function bucket(x,y){c.save();c.translate(x,y);for(let i=0;i<14;i++){const bx=-44+(i%7)*15+(i>6?7:0),by=-70-(i>6?14:0)-Math.sin(i)*3;c.save();c.translate(bx,by);dball(11,0);c.restore();}
  c.beginPath();c.moveTo(-56,-66);c.lineTo(56,-66);c.lineTo(44,0);c.lineTo(-44,0);c.closePath();shape(lin(-56,0,56,0,[[0,'#868e96'],[.4,'#dee2e6'],[1,'#6c757d']]),4,O);
  c.save();c.clip();c.strokeStyle='rgba(30,30,30,.45)';c.lineWidth=2;for(let k=-8;k<9;k++){c.beginPath();c.moveTo(k*12,-70);c.lineTo(k*12+40,4);c.stroke();c.beginPath();c.moveTo(k*12,-70);c.lineTo(k*12-40,4);c.stroke();}c.restore();
  c.beginPath();c.roundRect(-58,-72,116,10,4);shape('#495057',3,O);c.beginPath();c.moveTo(-50,-68);c.bezierCurveTo(-50,-130,50,-130,50,-68);c.lineWidth=5;c.strokeStyle=O;c.stroke();c.lineWidth=2.5;c.strokeStyle='#ced4da';c.stroke();c.restore();}
function pennants(){const x0=-20,x1=700,y0=598,sag=40;c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(x0+(x1-x0)*t,y0+Math.sin(t*Math.PI)*sag);c.lineWidth=3;c.strokeStyle='#f8f0e0';c.stroke();
  const PC=['#e03131','#ffffff','#ffd23f','#37b24d'];for(let k=0;k<11;k++){const t=(k+.5)/11,x=x0+(x1-x0)*t,y=y0+Math.sin(t*Math.PI)*sag;c.beginPath();c.moveTo(x-22,y);c.lineTo(x+22,y+2);c.lineTo(x,y+42);c.closePath();shape(PC[k%4],3,O);
    c.save();c.translate(x,y+16);c.beginPath();c.moveTo(-1,8);c.lineTo(-1,-8);c.lineTo(8,-4);c.lineTo(-1,0);c.lineWidth=2;c.strokeStyle=k%4===1?'#e03131':'#1a1e1c';c.stroke();c.restore();}}
function onTable(f){FR=f;const y=880;pennants();
  c.save();c.translate(251,y-118);c.rotate(1.24);club('driver');c.restore();
  bucket(110,y);c.save();c.translate(372,y-24);tee(24);c.restore();c.save();c.translate(372,y-38);dball(15,0);c.restore();
  ell(372,y+1,16,3);c.fillStyle='rgba(0,0,0,.25)';c.fill();}
return {tag:'CHALLENGE #31',ask:'IS GOLF EVEN A REAL SPORT? &darr;',askStyle:{background:'#ffffff',color:'#2b8a3e',border:'5px solid #2b8a3e',fontSize:'40px',left:'110px',right:'110px'},
 secret:{title:'HOLE IN ONE!'},
 palette:{wallTop:'#0b2b20',wallBot:'#1f6b4c',sky1:'#4dabf7',sky2:'#d0f0ff',night:false,floorA:'#8fdc77',floorB:'#4fae4a'},
 objects:{ball:ballO,flag:flagO,bag:bagO,trophy:trophyO},onTable};};
