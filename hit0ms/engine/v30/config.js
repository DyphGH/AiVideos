// Video #29 — snowmen: four original snowmen that smash, burst into powder and melt on the floor
// (original illustrations). Question: WHICH SNOWMAN WOULD YOU SAVE?
//  1 classic   — carrot nose, coal smile, twig arms, blue bobble beanie          -> "CARROT"
//  2 tiny      — tiny kawaii snow-baby, big shiny eyes, blush, pink earmuffs     -> "SNOWBALL"
//  3 goofy     — summer snowman: sunglasses, buck-tooth grin, swim ring, ice pop -> "MELT"
//  4 gentleman — tilted top hat with holly, monocle, twig moustache, striped scarf, candy cane -> "BLIZZARD"
// Break FX: each snow ball splits into jagged wedges, plus snow lumps, a drifting powder cloud,
// coal bits, the carrot/hat/accessories flying. A slush mound + melt-water puddle grows on the floor
// and the chunks shrink while the hold lasts (driven by MELT, computed from the timeline in onTable).
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
const TL=await (await fetch('/timeline.json')).json();
export default (H)=>{const {c,lin,rad,shape,ell}=H;
const NV='#1e3350',TW='#7a4e28',TWD='#2e1a0c',PI=Math.PI;
// ---------- melt clock: seconds since impact (mirrors the engine's fxT, incl. the rewind) ----------
let MELT=0;
function meltClock(f){MELT=0;for(const a of TL.attempts){if(f>=a.impact&&f<a.end){const k=f-a.impact;
  if(k<a.hold)MELT=k/TL.fps;else{const rw=(k-a.hold+1)/(a.rw+1);MELT=rw<.4?(a.hold-1)/TL.fps*(1-rw/.4):0;}}}}
const melt01=()=>Math.min(1,MELT/0.45);
// ---------- shared bits ----------
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function lumpy(x,y,r,s,n=64,amp=.016){c.beginPath();for(let i=0;i<=n;i++){const a=i/n*PI*2,rr=r*(1+amp*Math.sin(i*2.3+s)+amp*.6*Math.cos(i*3.7+s*2));const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;i?c.lineTo(px,py):c.moveTo(px,py);}c.closePath();}
const SNOW=(x,y,r)=>rad(x-r*.38,y-r*.42,r*.05,r*1.35,[[0,'#ffffff'],[.45,'#f3f8fd'],[.78,'#d3e3f4'],[1,'#a3bddc']]);
function sparkle(x,y,s){c.save();c.translate(x,y);c.fillStyle='rgba(150,200,255,.95)';c.beginPath();c.moveTo(0,-s*2);c.lineTo(s*.4,-s*.4);c.lineTo(s*2,0);c.lineTo(s*.4,s*.4);c.lineTo(0,s*2);c.lineTo(-s*.4,s*.4);c.lineTo(-s*2,0);c.lineTo(-s*.4,-s*.4);c.closePath();c.fill();c.restore();}
function texture(x,y,r,s){for(let i=0;i<16;i++){const a=i*2.4+s,d=r*(.2+((i*37)%65)/100);ell(x+Math.cos(a)*d,y+Math.sin(a)*d,1.5+(i%3),1.1+(i%2),a);c.fillStyle=i%4?'rgba(110,155,210,.26)':'rgba(255,255,255,.95)';c.fill();}}
function snowBall(x,y,r,s=1){lumpy(x,y,r,s);shape(SNOW(x,y,r),5,NV);
  c.save();lumpy(x,y,r,s);c.clip();ell(x+r*.22,y+r*.78,r*1.05,r*.45);c.fillStyle='rgba(70,110,170,.17)';c.fill();texture(x,y,r,s);c.restore();
  gloss(x-r*.38,y-r*.45,r*.26,r*.14,-.6,.95);sparkle(x+r*.42,y-r*.28,2.6);sparkle(x-r*.12,y+r*.5,2);}
function contact(x,y,w){ell(x,y,w,w*.22);c.fillStyle='rgba(55,90,145,.3)';c.fill();}
function coal(x,y,r,i=0){c.save();c.translate(x,y);c.rotate(i*1.3);c.beginPath();for(let k=0;k<6;k++){const a=k/6*PI*2,rr=r*(.85+.25*((k*7+i*3)%5)/4);c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();
  shape(rad(-r*.3,-r*.3,0,r*1.3,[[0,'#5d606c'],[.5,'#26272e'],[1,'#0b0b10']]),2,'#05050a');ell(-r*.35,-r*.38,r*.28,r*.16,-.6);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.restore();}
function smile(x,y,r,n=5,cr=4,i=0){for(let k=0;k<n;k++){const a=PI*(.22+.56*k/(n-1));coal(x+Math.cos(a)*r,y+Math.sin(a)*r*.7,cr,k+i);}}
function carrot(x,y,len,ang,w=11){c.save();c.translate(x,y);c.rotate(ang);c.beginPath();c.moveTo(0,-w);c.quadraticCurveTo(len*.5,-w*.75,len,-1.2);c.quadraticCurveTo(len+3,0,len,1.2);c.quadraticCurveTo(len*.5,w*.75,0,w);c.quadraticCurveTo(-4,0,0,-w);c.closePath();
  shape(lin(0,-w,0,w,[[0,'#ffc56e'],[.35,'#ff8a1f'],[1,'#c4470a']]),3.5,'#5a2200');
  c.strokeStyle='rgba(120,45,0,.55)';c.lineWidth=2;c.lineCap='round';for(let k=1;k<5;k++){const px=len*k/5.5,hw=w*(1-k/6)*.85;c.beginPath();c.moveTo(px,-hw);c.lineTo(px+3,-hw*.15);c.stroke();}
  c.beginPath();c.moveTo(3,-w*.55);c.quadraticCurveTo(len*.45,-w*.55,len*.8,-2);c.lineWidth=2.5;c.strokeStyle='rgba(255,232,195,.75)';c.stroke();c.restore();}
function twig(x,y,ang,len,s=1){c.save();c.translate(x,y);c.rotate(ang);c.scale(1,s);
  const P=()=>{c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(len*.5,-len*.06,len,-len*.02);c.moveTo(len*.62,-len*.05);c.lineTo(len*.86,-len*.25);c.moveTo(len*.78,-len*.03);c.lineTo(len*1.0,len*.13);c.moveTo(len*.33,-len*.03);c.lineTo(len*.46,-len*.17);};
  c.lineCap='round';c.lineJoin='round';P();c.lineWidth=11;c.strokeStyle=TWD;c.stroke();P();c.lineWidth=6;c.strokeStyle=TW;c.stroke();
  c.beginPath();c.moveTo(6,-1.5);c.quadraticCurveTo(len*.5,-len*.06-1.5,len*.9,-len*.03-1.5);c.lineWidth=1.6;c.strokeStyle='rgba(255,220,180,.5)';c.stroke();c.restore();}
function fluffy(x,y,r,col,n=14){c.beginPath();for(let k=0;k<=n;k++){const a=k/n*PI*2,rr=r*(k%2?.84:1.06);c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();shape(rad(x-r*.3,y-r*.35,0,r*1.25,[[0,'#ffffff'],[.4,col],[1,col]]),3,NV);}
function beanie(x,y,r,c1,c2,pom){const dome=()=>{c.beginPath();c.moveTo(x-r*.94,y-r*.4);c.bezierCurveTo(x-r*.98,y-r*1.5,x+r*.98,y-r*1.5,x+r*.94,y-r*.4);c.closePath();};
  dome();shape(lin(x-r,0,x+r,0,[[0,c2],[.4,c1],[1,c2]]),4,NV);
  c.save();dome();c.clip();c.fillStyle='rgba(255,255,255,.9)';c.fillRect(x-r,y-r*.9,2*r,r*.15);c.fillStyle=c2;c.fillRect(x-r,y-r*1.12,2*r,r*.08);
  c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=2;for(let k=-4;k<=4;k++){c.beginPath();c.moveTo(x+k*r*.22,y-r*.4);c.quadraticCurveTo(x+k*r*.2,y-r*.9,x+k*r*.12,y-r*1.3);c.stroke();}c.restore();
  c.beginPath();c.roundRect(x-r*1.02,y-r*.6,r*2.04,r*.36,r*.15);shape(lin(0,y-r*.6,0,y-r*.24,[[0,c1],[1,c2]]),4,NV);
  c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=2;for(let k=-8;k<=8;k++){c.beginPath();c.moveTo(x+k*r*.115,y-r*.56);c.lineTo(x+k*r*.115,y-r*.28);c.stroke();}
  fluffy(x,y-r*1.22,r*.3,pom);}
function pool(x,g,R,col,n=24,seedK=2.7,yo=2){c.beginPath();for(let i=0;i<=n;i++){const a=i/n*PI*2,r=(R+Math.sin(i*seedK)*R*.2)*g;c.lineTo(x+Math.cos(a)*r*1.45,H.FLOOR_Y+yo+Math.sin(a)*r*0.27);}c.closePath();c.fillStyle=col;c.fill();}
// ---------- break parts ----------
// wedge of a snow ball with jagged fresh-snow cut faces; the part shrinks as it melts
function wedge(r,a0,a1,s){const J=(ax,ay,bx,by,k)=>{for(let t=1;t<=4;t++){const u=t/4,j=(t<4?Math.sin(s*3.1+t*2.7+k)*r*.06:0);c.lineTo(ax+(bx-ax)*u+j,ay+(by-ay)*u-j*.6);}};
  const m=(a0+a1)/2,ia=Math.cos(a0+.25)*r*.3,ib=Math.sin(a0+.25)*r*.3,ja=Math.cos(a1-.25)*r*.3,jb=Math.sin(a1-.25)*r*.3,sx=Math.cos(a0)*r,sy=Math.sin(a0)*r,ex=Math.cos(a1)*r,ey=Math.sin(a1)*r,px=(ia+ja)/2,py=(ib+jb)/2;
  const path=()=>{c.beginPath();c.moveTo(ja,jb);J(ja,jb,ia,ib,9);J(ia,ib,sx,sy,0);const n=16;for(let i=1;i<=n;i++){const a=a0+(a1-a0)*i/n,rr=r*(1+.025*Math.sin(i*2.3+s));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}J(ex,ey,ja,jb,5);c.closePath();};
  path();shape(SNOW(0,0,r),4,NV);c.save();path();c.clip();texture(0,0,r,s);
  c.strokeStyle='rgba(120,165,215,.45)';c.lineWidth=2;c.beginPath();c.moveTo(px*.5+sx*.15,py*.5+sy*.15);c.lineTo(px*.5+ex*.2,py*.5+ey*.2);c.stroke();c.restore();
  gloss(Math.cos(m)*r*.6-r*.1,Math.sin(m)*r*.6-r*.12,r*.14,r*.07,-.6,.8);}
const shrink=()=>1-melt01()*.38;
function ballParts(o,bx,by,r,s,n=3,off=0){for(let k=0;k<n;k++){const a0=off+k/n*PI*2,a1=off+(k+1)/n*PI*2,m=(a0+a1)/2,ox=Math.cos(m)*r*.45,oy=Math.sin(m)*r*.45;
  o.push({dx:bx+ox,dy:by+oy,h:r*.9,rest:r*.3,draw:()=>{const q=shrink();c.save();c.scale(q,q);c.translate(-ox,-oy);wedge(r,a0,a1,s+k*1.7);c.restore();}});}
  o.push({dx:bx,dy:by,h:r*.7,rest:r*.3,draw:()=>lump(s+9,r*.36)});}
function lump(i,r){const q=shrink();c.save();c.scale(q,q);lumpy(0,0,r,i,12,.16);shape(SNOW(0,0,r),3,NV);gloss(-r*.3,-r*.35,r*.3,r*.16,-.6,.9);c.restore();}
function powder(i){const m=melt01(),s=1+m*1.8,a=.8*(1-m*.7);c.save();c.scale(s,s);for(let k=0;k<3;k++){const x=((k*13+i*7)%22)-11,y=((k*9+i*5)%14)-7,r=16+(i%3)*5-k*3;ell(x,y,r,r*.85);c.fillStyle=rad(x,y,0,r,[[0,`rgba(255,255,255,${a})`],[.6,`rgba(240,247,255,${a*.6})`],[1,'rgba(240,247,255,0)']]);c.fill();}c.restore();}
function snowBits(o,n,spanX,dy,big=1){for(let i=0;i<n;i++)o.push({dx:((i*37)%spanX)-spanX/2,dy:dy-((i*23)%60),h:16*big,rest:(5+(i%3)*2)*big,draw:()=>lump(i,(7+(i%4)*3)*big)});}
function powderCloud(o,n,spanX,dy){for(let i=0;i<n;i++)o.push({dx:((i*41)%spanX)-spanX/2,dy:dy-((i*29)%80),h:20,rest:6,g:.12,drag:2.6,vmax:70,flut:40,draw:()=>powder(i)});}
function coalParts(o,list,r=6){list.forEach(([x,y],i)=>o.push({dx:x,dy:y,h:r*2,rest:r*.8,draw:()=>coal(0,0,r,i)}));}
function slush(x,g,W,water='rgba(150,200,245,.72)',mound=1){const m=melt01(),y=H.FLOOR_Y;
  pool(x,g*(0.55+m*.75),W*.95,water,26,2.7,3);ell(x-W*.35*g,y+1,W*.45*g,3*g);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const w=W*g*(.8+m*.18),hh=W*.5*g*(1-m*.45)*mound;c.beginPath();c.moveTo(x-w,y+5);for(let i=0;i<=14;i++){const u=i/14;c.lineTo(x-w+u*2*w,y+5-Math.sin(u*PI)*hh*(1+.2*Math.sin(i*2.1))-(i%2)*3*g);}c.closePath();
  shape(lin(0,y-hh,0,y+5,[[0,'#ffffff'],[.6,'#e6f0fa'],[1,'#b6cce6']]),3,NV);gloss(x-w*.35,y-hh*.55,w*.22,3+hh*.08,-.08,.85);
  for(let i=0;i<26;i++){const bx=x-W*1.5*g+((i*53)%Math.round(W*3))*g,by=y-6+((i*17)%26);ell(bx,by,3+(i%3)*1.5,2+(i%2)*1.2);c.fillStyle='#ffffff';c.fill();c.lineWidth=1.2;c.strokeStyle='rgba(30,51,80,.55)';c.stroke();}}

// ================= 1 — CLASSIC SNOWMAN =================
function classic(){c.save();c.translate(0,10);
  twig(-38,-40,PI+.5,92,-1);twig(38,-40,-.48,92);
  snowBall(0,78,72,1);contact(0,18,42);snowBall(0,-30,54,2);contact(0,-74,28);snowBall(0,-110,40,3);
  coal(0,-58,6,1);coal(1,-34,6.5,2);coal(0,-9,6,3);coal(-2,40,6,4);
  coal(-15,-122,6.5,5);coal(15,-122,6.5,6);gloss(-17,-125,2,1.4,0,1);gloss(13,-125,2,1.4,0,1);
  smile(0,-108,22,5,3.6,7);carrot(2,-110,54,.14,10);
  beanie(0,-110,40,'#4dabf7','#1864ab','#e7f5ff');c.restore();}
const classicO={h:322,w:230,rot:-PI*0.62,burst:430,up:1.1,spin:12,draw:classic,
  parts(){const o=[];ballParts(o,0,88,72,1,3,.3);ballParts(o,0,-20,54,2,3,1.1);ballParts(o,0,-100,40,3,2,.6);
    coalParts(o,[[0,-48],[1,-24],[0,1],[-2,50],[-15,-112],[15,-112],[-18,-96],[-9,-92],[0,-90],[9,-92],[18,-96]]);
    o.push({dx:30,dy:-98,h:22,rest:9,draw:()=>carrot(-27,0,54,0,10)});
    o.push({dx:-80,dy:-60,h:20,rest:7,draw:()=>twig(-46,0,0,92)},{dx:80,dy:-60,h:20,rest:7,draw:()=>twig(-46,0,0,92,-1)});
    o.push({dx:0,dy:-140,h:50,rest:18,draw:()=>{c.save();c.translate(0,30);c.beginPath();c.rect(-60,-80,120,64);c.clip();beanie(0,0,40,'#4dabf7','#1864ab','#e7f5ff');c.restore();}});
    snowBits(o,18,240,40);powderCloud(o,14,220,-20);return o;},
  decal(x,g){slush(x,g,120);}};

// ================= 2 — TINY CUTE SNOW-BABY =================
function kawaiiEye(x,y,s){ell(x,y,7*s,9*s);c.fillStyle='#14151c';c.fill();ell(x-2.4*s,y-3.2*s,2.8*s,2.8*s);c.fillStyle='#fff';c.fill();ell(x+2.2*s,y+3*s,1.3*s,1.3*s);c.fill();}
function mitten(x,y,a,col){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-9,-12,18,22,9);shape(col,3,NV);ell(-9,-2,5,7,-.4);shape(col,3,NV);c.beginPath();c.roundRect(-10,8,20,7,3);shape('#ffffff',2.5,NV);c.restore();}
function earmuffs(x,y,r){c.save();c.lineCap='round';c.beginPath();c.arc(x,y,r*1.06,PI*1.08,PI*1.92);c.lineWidth=10;c.strokeStyle=NV;c.stroke();c.lineWidth=6;c.strokeStyle='#ff6fa5';c.stroke();c.restore();
  fluffy(x-r*1.0,y-r*.05,r*.36,'#ff9cc4',16);fluffy(x+r*1.0,y-r*.05,r*.36,'#ff9cc4',16);}
function tiny(){c.save();c.translate(0,4);
  twig(-36,40,PI+.85,44,-1);twig(36,40,-.85,44);mitten(-62,10,-.5,'#ff6b6b');mitten(62,10,.5,'#ff6b6b');
  snowBall(0,46,54,5);contact(0,-2,30);snowBall(0,-38,46,6);
  coal(0,30,4.5,1);coal(0,52,4.5,2);
  kawaiiEye(-16,-42,1.15);kawaiiEye(16,-42,1.15);
  ell(-29,-27,8,4.5);c.fillStyle='rgba(255,120,160,.55)';c.fill();ell(29,-27,8,4.5);c.fill();
  c.beginPath();c.moveTo(-6,-21);c.quadraticCurveTo(-3,-17,0,-21);c.quadraticCurveTo(3,-17,6,-21);c.lineWidth=2.6;c.strokeStyle='#14151c';c.lineCap='round';c.stroke();
  carrot(0,-31,20,.2,5);earmuffs(0,-38,46);
  // a falling snowflake friend on top
  c.save();c.translate(22,-92);c.strokeStyle='#8cc8ff';c.lineWidth=2.5;c.lineCap='round';for(let k=0;k<6;k++){c.rotate(PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(0,-9);c.moveTo(0,-5);c.lineTo(-3,-8);c.moveTo(0,-5);c.lineTo(3,-8);c.stroke();}c.restore();
  c.restore();}
const tinyO={h:206,w:170,rot:-PI*0.95,burst:400,up:1.15,spin:16,draw:tiny,
  parts(){const o=[];ballParts(o,0,50,54,5,3,.2);ballParts(o,0,-34,46,6,3,.9);
    coalParts(o,[[0,34],[0,56]],4.5);
    o.push({dx:-16,dy:-38,h:18,rest:9,draw:()=>kawaiiEye(0,0,1.15)},{dx:16,dy:-38,h:18,rest:9,draw:()=>kawaiiEye(0,0,1.15)});
    o.push({dx:10,dy:-27,h:12,rest:5,draw:()=>carrot(-10,0,20,0,5)});
    o.push({dx:-46,dy:-40,h:30,rest:13,draw:()=>fluffy(0,0,16,'#ff9cc4',16)},{dx:46,dy:-40,h:30,rest:13,draw:()=>fluffy(0,0,16,'#ff9cc4',16)});
    o.push({dx:0,dy:-80,h:14,rest:5,draw:()=>{c.save();c.lineCap='round';c.beginPath();c.arc(0,30,48,PI*1.15,PI*1.85);c.lineWidth=10;c.strokeStyle=NV;c.stroke();c.lineWidth=6;c.strokeStyle='#ff6fa5';c.stroke();c.restore();}});
    o.push({dx:-62,dy:14,h:22,rest:11,draw:()=>mitten(0,0,0,'#ff6b6b')},{dx:62,dy:14,h:22,rest:11,draw:()=>mitten(0,0,0,'#ff6b6b')});
    o.push({dx:-40,dy:40,h:10,rest:5,draw:()=>twig(-22,0,0,44)},{dx:40,dy:40,h:10,rest:5,draw:()=>twig(-22,0,0,44,-1)});
    snowBits(o,12,170,30,.8);powderCloud(o,10,160,-10);return o;},
  decal(x,g){slush(x,g,84,'rgba(170,215,255,.75)');for(const dx of [-50,40]){ell(x+dx*g,H.FLOOR_Y+3,5*g,2*g);c.fillStyle='rgba(255,111,165,.9)';c.fill();}}};

// ================= 3 — GOOFY SUMMER SNOWMAN =================
function shades(x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);
  c.beginPath();c.moveTo(-8,-4);c.quadraticCurveTo(0,-9,8,-4);c.lineWidth=5;c.strokeStyle='#111';c.stroke();
  for(const sx of [-1,1]){c.beginPath();c.moveTo(sx*6,-7);c.lineTo(sx*34,-9);c.quadraticCurveTo(sx*36,10,sx*22,12);c.quadraticCurveTo(sx*8,12,sx*6,-7);c.closePath();
    shape(lin(0,-9,0,12,[[0,'#ff4fa0'],[.5,'#7b2ff7'],[1,'#1b0b3a']]),4,'#111');c.beginPath();c.moveTo(sx*12,-4);c.lineTo(sx*20,-5);c.lineTo(sx*12,6);c.closePath();c.fillStyle='rgba(255,255,255,.55)';c.fill();}
  c.beginPath();c.moveTo(-34,-9);c.lineTo(-44,-12);c.moveTo(34,-9);c.lineTo(44,-12);c.lineWidth=4;c.strokeStyle='#111';c.stroke();c.restore();}
function grin(x,y){c.beginPath();c.moveTo(x-22,y-4);c.quadraticCurveTo(x,y+30,x+22,y-4);c.quadraticCurveTo(x,y+4,x-22,y-4);c.closePath();shape('#6a0f1f',3,'#14151c');
  c.save();c.beginPath();c.moveTo(x-22,y-4);c.quadraticCurveTo(x,y+30,x+22,y-4);c.quadraticCurveTo(x,y+4,x-22,y-4);c.clip();ell(x+4,y+18,11,8);c.fillStyle='#ff6b8b';c.fill();c.restore();
  for(const s of [-1,1]){c.beginPath();c.roundRect(x+(s<0?-10:1),y-1,9,11,2);shape('#ffffff',2,'#14151c');}}
function swimRing(x,y,rx,ry,half){c.save();c.lineCap='butt';const arc=()=>{c.beginPath();if(half)c.ellipse(x,y,rx,ry,0,0.02,PI-.02);else c.ellipse(x,y,rx,ry,0,0,PI*2);};
  arc();c.lineWidth=28;c.strokeStyle='#14151c';c.stroke();arc();c.lineWidth=22;c.strokeStyle='#ffffff';c.stroke();
  c.setLineDash([22,22]);arc();c.strokeStyle='#ff3d6e';c.stroke();c.setLineDash([]);
  if(half){c.beginPath();c.ellipse(x,y-5,rx,ry,0,.35,PI*.55);c.lineWidth=4;c.strokeStyle='rgba(255,255,255,.75)';c.stroke();}c.restore();}
function umbrella(x,y,a,s=1){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);c.beginPath();c.moveTo(0,0);c.lineTo(0,-46);c.lineWidth=4;c.strokeStyle='#8a5a2a';c.lineCap='round';c.stroke();
  c.beginPath();c.moveTo(-30,-40);c.quadraticCurveTo(0,-74,30,-40);c.closePath();shape('#ffd43b',3,NV);
  c.save();c.beginPath();c.moveTo(-30,-40);c.quadraticCurveTo(0,-74,30,-40);c.closePath();c.clip();c.fillStyle='#ff6b6b';for(const k of [-1,1]){c.beginPath();c.moveTo(0,-58);c.lineTo(k*12,-40);c.lineTo(k*22,-40);c.closePath();c.fill();}c.beginPath();c.moveTo(0,-58);c.lineTo(-4,-40);c.lineTo(4,-40);c.closePath();c.fill();c.restore();
  ell(0,-58,3,3);c.fillStyle='#8a5a2a';c.fill();c.restore();}
function icePop(x,y,a){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-4,10,8,26,3);shape('#e9c48a',2.5,'#5a3a1a');
  c.beginPath();c.roundRect(-14,-30,28,44,[13,13,5,5]);shape(lin(0,-30,0,14,[[0,'#ff8787'],[.5,'#fa5252'],[1,'#c92a2a']]),3,'#5a0a0a');
  c.fillStyle='rgba(255,255,255,.5)';c.fillRect(-9,-22,4,26);c.beginPath();c.moveTo(-14,8);c.quadraticCurveTo(-16,20,-12,20);c.quadraticCurveTo(-9,20,-10,9);c.fillStyle='#fa5252';c.fill();c.restore();}
function drop(x,y,s){c.beginPath();c.moveTo(x,y-9*s);c.quadraticCurveTo(x+7*s,y+2*s,x,y+5*s);c.quadraticCurveTo(x-7*s,y+2*s,x,y-9*s);shape('#74c0fc',2,NV);gloss(x-2*s,y,1.5*s,2.4*s,0,.8);}
function goofy(){c.save();c.translate(0,18);
  twig(-36,-30,PI+.95,90,-1);twig(42,-34,-.15,84);icePop(132,-56,.35);
  snowBall(0,80,70,7);swimRing(6,-14,70,19,false);contact(0,20,40);
  c.save();c.translate(6,-24);c.rotate(.08);snowBall(0,0,50,8);c.restore();swimRing(6,-14,70,19,true);
  c.save();c.translate(-4,-104);c.rotate(-.12);
  snowBall(0,0,42,9);umbrella(12,-34,.4,1);
  shades(0,-8,.92);grin(0,14);carrot(-4,2,46,.55,9);
  c.restore();drop(-50,-128,1.1);drop(52,-96,.9);drop(-58,-90,.7);
  coal(4,-36,5.5,1);coal(9,46,6,2);coal(10,72,6,3);c.restore();}
const goofyO={h:330,w:260,rot:-PI*1.05,burst:460,up:1.12,spin:14,draw:goofy,
  parts(){const o=[];ballParts(o,0,98,70,7,3,.5);ballParts(o,6,-6,50,8,3,1.3);ballParts(o,-4,-86,42,9,2,.2);
    coalParts(o,[[4,-18],[9,64],[10,90]],6);
    o.push({dx:0,dy:-90,h:20,rest:9,draw:()=>shades(0,0,.92)});
    o.push({dx:20,dy:-80,h:20,rest:8,draw:()=>carrot(-23,0,46,0,9)});
    o.push({dx:6,dy:4,h:40,rest:14,g:.8,draw:()=>{c.save();c.scale(.8,.8);swimRing(0,0,70,19,false);c.restore();}});
    o.push({dx:20,dy:-150,h:30,rest:6,draw:()=>{c.rotate(1.4);umbrella(0,20,0,1);}});
    o.push({dx:120,dy:-40,h:24,rest:12,draw:()=>icePop(0,0,1.57)});
    o.push({dx:-80,dy:-60,h:20,rest:7,draw:()=>twig(-45,0,0,90)},{dx:80,dy:-40,h:20,rest:7,draw:()=>twig(-42,0,0,84,-1)});
    o.push({dx:0,dy:-74,h:24,rest:8,draw:()=>grin(0,-8)});
    for(let i=0;i<6;i++)o.push({dx:((i*47)%160)-80,dy:-100,h:12,rest:4,draw:()=>drop(0,0,.8)});
    snowBits(o,18,240,40);powderCloud(o,14,220,-30);return o;},
  decal(x,g){slush(x,g,128,'rgba(120,190,250,.8)',.75);for(let i=0;i<8;i++){c.save();c.translate(x-110*g+((i*37)%220)*g,H.FLOOR_Y+((i*5)%6)-2);c.rotate(i);c.fillStyle=i%2?'rgba(250,82,82,.85)':'rgba(255,212,59,.9)';c.fillRect(-4,-2,8,4);c.restore();}}};

// ================= 4 — THE GENTLEMAN =================
function holly(x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);for(const a of [-.45,.65]){c.save();c.rotate(a);c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(6,-7,9,-3);c.quadraticCurveTo(13,-11,17,-5);c.quadraticCurveTo(23,-11,26,0);c.quadraticCurveTo(23,11,17,5);c.quadraticCurveTo(13,11,9,3);c.quadraticCurveTo(6,7,0,0);shape('#2f9e44',2,'#0b3d1a');c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=1.2;c.beginPath();c.moveTo(2,0);c.lineTo(22,0);c.stroke();c.restore();}
  for(const [bx,by] of [[-2,-4],[4,2],[-4,4]]){ell(bx,by,4.2,4.2);shape('#e03131',1.5,'#5a0a0a');ell(bx-1.3,by-1.3,1.3,1);c.fillStyle='#fff';c.fill();}c.restore();}
function topHat(x,y,a,s=1){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);
  ell(0,0,64,14);shape(lin(0,-14,0,14,[[0,'#3a3d48'],[1,'#0e0f14']]),4,'#05060a');
  c.beginPath();c.moveTo(-40,0);c.lineTo(-45,-86);c.quadraticCurveTo(0,-94,45,-86);c.lineTo(40,0);c.quadraticCurveTo(0,8,-40,0);c.closePath();
  shape(lin(-45,0,45,0,[[0,'#24262f'],[.28,'#4c5060'],[.5,'#23252e'],[1,'#0c0d12']]),4,'#05060a');
  ell(0,-88,45,9);shape(lin(0,-97,0,-79,[[0,'#50545f'],[1,'#26282f']]),4,'#05060a');
  c.beginPath();c.moveTo(-41,-12);c.lineTo(-42.5,-32);c.quadraticCurveTo(0,-39,42.5,-32);c.lineTo(41,-12);c.quadraticCurveTo(0,-5,-41,-12);c.closePath();shape(lin(0,-38,0,-8,[[0,'#ff4d5e'],[1,'#a50e24']]),3,'#05060a');
  c.beginPath();c.moveTo(-30,-80);c.lineTo(-32,-40);c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.18)';c.lineCap='round';c.stroke();
  c.beginPath();c.ellipse(0,0,64,14,0,.08,PI-.08);c.lineWidth=4;c.strokeStyle='rgba(255,255,255,.2)';c.stroke();
  holly(24,-24,1);c.restore();}
function scarfTail(x,y,a,len){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-14,0,28,len,6);shape('#e03131',4,NV);
  c.save();c.beginPath();c.roundRect(-14,0,28,len,6);c.clip();c.fillStyle='#ffffff';for(let k=10;k<len;k+=26)c.fillRect(-16,k,32,9);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(4,0,10,len);c.restore();
  c.strokeStyle='#e03131';c.lineWidth=3;c.lineCap='round';for(let k=-11;k<=11;k+=5.5){c.beginPath();c.moveTo(k,len);c.lineTo(k+1,len+10);c.stroke();}c.restore();}
function scarfWrap(x,y,w){const P=()=>{c.beginPath();c.moveTo(x-w/2,y-12);c.quadraticCurveTo(x,y+2,x+w/2,y-12);c.lineTo(x+w/2+3,y+11);c.quadraticCurveTo(x,y+28,x-w/2-3,y+11);c.closePath();};
  P();shape('#e03131',4,NV);c.save();P();c.clip();c.fillStyle='#ffffff';for(let k=-w/2+8;k<w/2;k+=30)c.fillRect(x+k,y-20,10,50);c.restore();
  c.beginPath();c.roundRect(x+w*.16,y-6,24,24,8);shape('#c92a2a',3.5,NV);}
function monocle(x,y,r){c.beginPath();c.moveTo(x+r*.7,y+r*.7);c.bezierCurveTo(x+r*2.2,y+r*3,x+r*.2,y+r*4.2,x+r*1.6,y+r*6);c.lineWidth=2;c.strokeStyle='#d4a017';c.setLineDash([3,2]);c.stroke();c.setLineDash([]);
  ell(x,y,r,r);c.fillStyle='rgba(190,230,255,.35)';c.fill();c.lineWidth=4;c.strokeStyle='#8a6a10';c.stroke();ell(x,y,r,r);c.lineWidth=2.4;c.strokeStyle='#ffd43b';c.stroke();gloss(x-r*.35,y-r*.35,r*.3,r*.15,-.6,.8);}
function stache(x,y){c.save();c.lineCap='round';const P=()=>{c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x-10,y-8,x-22,y+4,x-30,y-6);c.bezierCurveTo(x-34,y-12,x-38,y-6,x-34,y-2);c.moveTo(x,y);c.bezierCurveTo(x+10,y-8,x+22,y+4,x+30,y-6);c.bezierCurveTo(x+34,y-12,x+38,y-6,x+34,y-2);};
  P();c.lineWidth=9;c.strokeStyle=TWD;c.stroke();P();c.lineWidth=5;c.strokeStyle=TW;c.stroke();c.restore();}
function cane(x,y,a,s=1){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);const P=()=>{c.beginPath();c.moveTo(0,90);c.lineTo(0,0);c.arc(-16,0,16,0,PI,true);c.lineTo(-32,10);};
  c.lineCap='round';P();c.lineWidth=15;c.strokeStyle='#5a0a0a';c.stroke();P();c.lineWidth=10;c.strokeStyle='#ffffff';c.stroke();c.setLineDash([9,9]);P();c.strokeStyle='#e03131';c.stroke();c.setLineDash([]);
  c.beginPath();c.moveTo(-3,80);c.lineTo(-3,4);c.lineWidth=2;c.strokeStyle='rgba(255,255,255,.6)';c.stroke();c.restore();}
function gent(){c.save();c.translate(0,26);
  twig(-46,-36,PI+.25,96,-1);cane(-123,-42,0,1);twig(44,-38,-.55,96);
  snowBall(0,94,76,11);contact(0,30,46);snowBall(0,-22,58,12);contact(0,-70,30);snowBall(0,-110,44,13);
  coal(0,-2,6.5,1);coal(0,22,6.5,2);coal(1,60,6.5,3);
  scarfTail(22,-64,-.12,94);scarfWrap(0,-70,96);
  coal(-16,-122,6.5,4);coal(16,-122,6.5,5);monocle(16,-122,13);
  smile(0,-104,22,5,3.4,6);stache(0,-104);carrot(0,-110,58,.08,10);
  topHat(4,-146,.16,.86);c.restore();}
const gentO={h:350,w:262,rot:-PI*0.58,burst:480,up:1.15,spin:13,draw:gent,
  parts(){const o=[];ballParts(o,0,120,76,11,4,.2);ballParts(o,0,4,58,12,3,1.0);ballParts(o,0,-84,44,13,3,.4);
    coalParts(o,[[0,24],[0,48],[1,86],[-16,-96],[-18,-80],[-9,-76],[0,-74],[9,-76],[18,-80]],6.5);
    o.push({dx:10,dy:-210,h:76,rest:14,g:.85,draw:()=>{c.save();c.translate(0,40);topHat(0,0,0,.86);c.restore();}});
    o.push({dx:16,dy:-96,h:28,rest:12,draw:()=>monocle(0,0,13)});
    o.push({dx:32,dy:-80,h:22,rest:9,draw:()=>carrot(-29,0,58,0,10)});
    o.push({dx:0,dy:-74,h:16,rest:6,draw:()=>stache(0,0)});
    o.push({dx:-30,dy:-44,h:24,rest:5,drag:1.4,vmax:420,flut:120,g:.7,draw:()=>{c.rotate(-1.3);scarfTail(0,-47,0,94);}});
    o.push({dx:20,dy:-44,h:24,rest:8,drag:.8,flut:60,draw:()=>{c.save();c.translate(0,26);c.beginPath();c.rect(-60,-60,120,120);c.clip();scarfWrap(0,-26,96);c.restore();}});
    o.push({dx:-123,dy:-10,h:30,rest:8,draw:()=>{c.rotate(1.57);cane(0,-45,0,1);}});
    o.push({dx:-92,dy:-50,h:20,rest:7,draw:()=>twig(-48,0,0,96)},{dx:92,dy:-60,h:20,rest:7,draw:()=>twig(-48,0,0,96,-1)});
    for(let i=0;i<3;i++)o.push({dx:30+i*8,dy:-190,h:10,rest:4,draw:()=>holly(0,0,.8)});
    snowBits(o,22,260,50,1.1);powderCloud(o,18,260,-30);return o;},
  decal(x,g){slush(x,g,140);ell(x+60*g,H.FLOOR_Y+2,22*g,3*g);c.fillStyle='rgba(224,49,49,.5)';c.fill();}};

// ---------- scale ----------
function S(o,k=1.1){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
S(tinyO,1.3);S(classicO,1.04);
// ---------- the room: snowfall in the window, icicles, snowy sill, cocoa, snowballs, spare noses ----------
const WX=730,WY=430,WW=260,WH=330;
function windowSnow(f){const T=TL.total;c.save();c.beginPath();
  for(const [px,py] of [[WX,WY],[WX+WW/2+7,WY],[WX,WY+WH/2+7],[WX+WW/2+7,WY+WH/2+7]])c.rect(px,py,WW/2-7,WH/2-7);c.clip();
  // distant snowy hills + pine trees
  c.beginPath();c.moveTo(WX,WY+WH-60);c.quadraticCurveTo(WX+70,WY+WH-100,WX+140,WY+WH-70);c.quadraticCurveTo(WX+210,WY+WH-110,WX+WW,WY+WH-80);c.lineTo(WX+WW,WY+WH);c.lineTo(WX,WY+WH);c.closePath();c.fillStyle='#dbe9f8';c.fill();
  for(const [tx,ty,s] of [[WX+40,WY+WH-72,1],[WX+70,WY+WH-66,.7],[WX+200,WY+WH-86,1.1],[WX+232,WY+WH-80,.75]]){c.beginPath();c.moveTo(tx,ty-60*s);c.lineTo(tx+20*s,ty);c.lineTo(tx-20*s,ty);c.closePath();c.fillStyle='#1f4a5a';c.fill();c.beginPath();c.moveTo(tx,ty-60*s);c.lineTo(tx+8*s,ty-36*s);c.lineTo(tx-8*s,ty-36*s);c.closePath();c.fillStyle='#f4f9ff';c.fill();}
  c.fillStyle='#f4f9ff';c.beginPath();c.moveTo(WX,WY+WH-30);c.quadraticCurveTo(WX+130,WY+WH-58,WX+WW,WY+WH-34);c.lineTo(WX+WW,WY+WH);c.lineTo(WX,WY+WH);c.closePath();c.fill();
  for(let i=0;i<46;i++){const n=1+(i%3),y=WY-10+((i*71+f*(WH+20)*n/T)%(WH+20)),x=WX+((i*53)%WW)+Math.sin(2*PI*(f/T)*n*2+i)*8,r=1.4+(i%4)*.8;ell(x,y,r,r);c.fillStyle=`rgba(255,255,255,${.55+(i%3)*.15})`;c.fill();}
  // frosted corners
  for(const [px,py] of [[WX,WY],[WX+WW,WY],[WX,WY+WH],[WX+WW,WY+WH]]){const g=c.createRadialGradient(px,py,0,px,py,70);g.addColorStop(0,'rgba(235,245,255,.55)');g.addColorStop(1,'rgba(235,245,255,0)');c.fillStyle=g;c.fillRect(px-70,py-70,140,140);}
  c.restore();
  // icicles on the top of the frame + snow on the sill
  for(let i=0;i<13;i++){const x=WX-10+i*22+((i*7)%9),l=16+((i*29)%30);c.beginPath();c.moveTo(x-7,WY-16);c.lineTo(x,WY-16+l+18);c.lineTo(x+7,WY-16);c.closePath();shape(lin(x-7,0,x+7,0,[[0,'#ffffff'],[.5,'#cfe8ff'],[1,'#8fc2f0']]),2,'#5a7ea8');}
  c.beginPath();c.moveTo(WX-24,WY-16);for(let i=0;i<=16;i++){const x=WX-24+i*(WW+48)/16;c.lineTo(x,WY-26-((i*5)%3)*3-Math.sin(i*1.7)*3);}c.lineTo(WX+WW+24,WY-12);c.lineTo(WX-24,WY-12);c.closePath();shape('#ffffff',2.5,'#7fa0c8');
  c.beginPath();c.moveTo(WX-30,WY+WH+18);for(let i=0;i<=18;i++){const x=WX-30+i*(WW+60)/18;c.lineTo(x,WY+WH+8-Math.abs(Math.sin(i*1.3))*10);}c.lineTo(WX+WW+30,WY+WH+18);c.closePath();shape('#ffffff',2.5,'#7fa0c8');}
function mug(x,y,f){const T=TL.total;
  for(let k=0;k<3;k++){const ph=2*PI*f/T*2+k*2;c.beginPath();c.moveTo(x-14+k*14,y-96);c.bezierCurveTo(x-24+k*14+Math.sin(ph)*8,y-118,x-4+k*14-Math.sin(ph)*8,y-136,x-14+k*14+Math.sin(ph+1)*6,y-160);c.lineWidth=5;c.lineCap='round';c.strokeStyle=`rgba(255,255,255,${.35+.15*Math.sin(ph)})`;c.stroke();}
  c.beginPath();c.arc(x+42,y-52,20,-PI*.5,PI*.5);c.lineWidth=13;c.strokeStyle='#2a1a10';c.stroke();c.lineWidth=7;c.strokeStyle='#d6336c';c.stroke();
  c.beginPath();c.roundRect(x-42,y-92,84,92,[6,6,16,16]);shape(lin(x-42,0,x+42,0,[[0,'#a61e4d'],[.35,'#e64980'],[1,'#a61e4d']]),4,'#2a1a10');
  ell(x,y-92,42,9);shape('#6b3a1e',3,'#2a1a10');for(const [mx,my,r] of [[-14,-96,9],[6,-99,8],[22,-94,7],[-2,-90,7]]){c.beginPath();c.roundRect(x+mx-r,y+my-r*.8,r*2,r*1.6,4);shape('#ffffff',2,'#8a7a6a');}
  c.save();c.translate(x,y-44);c.strokeStyle='#ffffff';c.lineWidth=3.2;c.lineCap='round';for(let k=0;k<6;k++){c.rotate(PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(0,-17);c.moveTo(0,-10);c.lineTo(-5,-15);c.moveTo(0,-10);c.lineTo(5,-15);c.stroke();}c.restore();
  c.fillStyle='rgba(255,255,255,.3)';c.fillRect(x-34,y-84,7,74);}
function crate(x,y){for(const [cx,a] of [[x+18,-.3],[x+40,-.05],[x+62,.25],[x+84,.5]]){carrot(cx,y-40,48,-PI/2+a,9);}
  c.beginPath();c.roundRect(x,y-58,104,58,4);shape(lin(0,y-58,0,y,[[0,'#d9a066'],[1,'#a0662e']]),4,'#3a220f');c.strokeStyle='rgba(58,34,15,.5)';c.lineWidth=2;for(const yy of [y-38,y-19]){c.beginPath();c.moveTo(x+3,yy);c.lineTo(x+101,yy);c.stroke();}
  c.beginPath();c.roundRect(x+12,y-46,80,26,4);shape('#fff6e0',2.5,'#3a220f');c.save();c.fillStyle='#c4470a';c.font='400 17px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText('SPARE NOSES',x+52,y-32.5);c.restore();}
function onTable(f){meltClock(f);windowSnow(f);const y=880;
  mug(96,y,f);
  for(const [bx,by,r,s] of [[176,y-21,21,21],[218,y-21,21,22],[260,y-21,21,23],[197,y-56,21,24],[239,y-56,21,25],[218,y-91,21,26]]){lumpy(bx,by,r,s,18,.05);shape(SNOW(bx,by,r),3.5,NV);gloss(bx-r*.35,by-r*.4,r*.28,r*.14,-.6,.9);}
  crate(290,y);}
return {tag:'CHALLENGE #29',ask:'WHICH SNOWMAN WOULD YOU SAVE? &darr;',askStyle:{fontSize:'38px',left:'90px',right:'90px',background:'#e7f5ff',color:'#0b3a6e',border:'5px solid #0b3a6e',boxShadow:'0 0 0 4px #e7f5ff, 0 10px 40px rgba(0,0,0,.6)'},
 palette:{wallTop:'#0b1d38',wallBot:'#2d5f99',sky1:'#0c1a3c',sky2:'#4a6fae',night:true,floorA:'#e3f0fb',floorB:'#2a64a8'},
 objects:{classic:classicO,tiny:tinyO,goofy:goofyO,gent:gentO},onTable};};
