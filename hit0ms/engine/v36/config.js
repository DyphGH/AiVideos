// Video #35 — BOWLING: pause before the STRIKE. Four original bowling balls (classic, marble swirl, galaxy, fire-gold) fall onto a
// pin set on the floor; each impact = STRIKE (pins fly). Words climb a score ladder: SPARE -> STRIKE -> TURKEY -> PERFECT 300.
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
const TL=await (await fetch('/timeline.json')).json();
// ---- UI overlay (DOM only, inside #ui so hideUI() still hides it) ----
{const ui=document.getElementById('ui'),tag=document.getElementById('tag');tag.style.top='34px';
 const pill=document.createElement('div');pill.id='onepct';pill.innerHTML='ONLY <b>1%</b> CAN DO IT';
 Object.assign(pill.style,{position:'absolute',top:'82px',left:'50%',transform:'translateX(-50%) rotate(-2deg)',padding:'8px 30px 6px',borderRadius:'99px',
  background:'#ffd23f',color:'#111',fontFamily:'Inter',fontWeight:'800',fontSize:'40px',letterSpacing:'2px',whiteSpace:'nowrap',boxShadow:'0 6px 0 rgba(0,0,0,.35),0 0 40px rgba(255,210,63,.45)',border:'4px solid #111'});
 ui.appendChild(pill);{const h2=document.querySelector('.title h2');if(h2)h2.textContent='WHEN IT HITS THE PINS';}const st=document.createElement('style');st.textContent='#onepct b{color:#d6141f}.title{top:172px!important}';document.head.appendChild(st);
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
// ================= bowling pins + balls =================
function pin(s=1,tilt=0){c.save();c.rotate(tilt);c.scale(s,s);c.beginPath();c.moveTo(0,-62);c.bezierCurveTo(13,-62,14,-44,9,-34);c.bezierCurveTo(5,-26,5,-22,9,-14);c.bezierCurveTo(24,6,24,40,14,58);c.lineTo(-14,58);c.bezierCurveTo(-24,40,-24,6,-9,-14);c.bezierCurveTo(-5,-22,-5,-26,-9,-34);c.bezierCurveTo(-14,-44,-13,-62,0,-62);c.closePath();
  shape(lin(-22,0,22,0,[[0,'#c9ced8'],[.35,'#ffffff'],[.7,'#f1f3f8'],[1,'#aeb4c2']]),3.5,O);
  c.save();c.clip();c.fillStyle='#e03131';c.fillRect(-20,-30,40,5);c.fillRect(-20,-21,40,5);c.restore();
  gloss(-6,-48,3,8,0,.7);gloss(-9,20,4,16,0,.45);c.restore();}
function pinSet(x,y){const K=1.45;for(const [dx0,dy0,s0] of [[-60,-14,.9],[-20,-14,.9],[20,-14,.9],[60,-14,.9],[-40,-6,.95],[0,-6,.95],[40,-6,.95],[-20,2,1],[20,2,1],[0,10,1.05]]){const dx=dx0*K,dy=dy0*K,s=s0*K;c.save();c.translate(x+dx,y+dy-58*s);pin(s);c.restore();}}
function holes(r){for(const [x,y,rr] of [[-r*.22,-r*.38,r*.1],[r*.12,-r*.42,r*.1],[-r*.04,-r*.12,r*.12]]){ell(x,y,rr,rr);c.fillStyle='#05060c';c.fill();ell(x-rr*.2,y-rr*.25,rr*.5,rr*.35);c.fillStyle='rgba(255,255,255,.12)';c.fill();}}
function ballBase(r,fill){ell(0,0,r,r);shape(fill,5,O);}
function ballGloss(r){gloss(-r*.42,-r*.48,r*.28,r*.14,-.6,.75);ell(r*.3,r*.35,r*.5,r*.4);c.fillStyle='rgba(0,0,0,.18)';c.fill();}
function ball1(r=74){ballBase(r,rad(-r*.3,-r*.35,r*.1,r*1.1,[[0,'#5a5f78'],[.5,'#1c1f2e'],[1,'#07080f']]));holes(r);ballGloss(r);}
function ball2(r=74){ballBase(r,rad(-r*.3,-r*.35,r*.1,r*1.1,[[0,'#ffb3f0'],[.6,'#b23ad6'],[1,'#4a1070']]));c.save();ell(0,0,r,r);c.clip();
  for(let k=0;k<5;k++){c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(-r+2*r*t,-r+k*r*.5+Math.sin(t*7+k)*r*.25);c.lineWidth=r*.12;c.strokeStyle=k%2?'rgba(255,255,255,.45)':'rgba(80,220,255,.45)';c.stroke();}c.restore();holes(r);ballGloss(r);}
function ball3(r=74){ballBase(r,rad(-r*.2,-r*.2,r*.1,r*1.1,[[0,'#3d6fd1'],[.5,'#1a1a5e'],[1,'#07071f']]));c.save();ell(0,0,r,r);c.clip();
  ell(r*.1,r*.2,r*.7,r*.25,-.5);c.fillStyle='rgba(255,79,216,.35)';c.fill();for(let k=0;k<26;k++){ell((hr(k,1)-.5)*2*r,(hr(k,2)-.5)*2*r,1.5+hr(k,3)*2,1.5+hr(k,3)*2);c.fillStyle='#fff';c.fill();}
  star(-r*.35,r*.3,9,3.5);c.fillStyle='#ffe066';c.fill();c.restore();holes(r);ballGloss(r);}
function ball4(r=74){ballBase(r,rad(-r*.3,-r*.35,r*.1,r*1.1,[[0,'#fff3a0'],[.45,'#ffc31f'],[1,'#b06a00']]));c.save();ell(0,0,r,r);c.clip();
  for(let k=0;k<6;k++){c.beginPath();c.moveTo(-r+k*r*.4,r);c.quadraticCurveTo(-r+k*r*.4+20,r*.2,-r+k*r*.4+(k%2?30:-10),-r*.2+Math.sin(FR*.3+k)*8);c.quadraticCurveTo(-r+k*r*.4+40,r*.3,-r+k*r*.4+50,r);c.closePath();c.fillStyle=k%2?'rgba(255,90,30,.7)':'rgba(255,40,40,.55)';c.fill();}c.restore();holes(r);ballGloss(r);
  c.fillStyle=O;c.font='900 18px Inter';c.textAlign='center';c.fillText('300',r*.35,r*.55);}
const BALLS={classic:ball1,swirl:ball2,galaxy:ball3,fire:ball4};
function splinter(i){c.save();c.rotate(hr(i,2)*6);c.beginPath();c.moveTo(-14,-3);c.lineTo(12,-4);c.lineTo(16,0);c.lineTo(12,4);c.lineTo(-14,3);c.closePath();shape('#e8c08a',2,O);c.restore();}
function sparkS(i){star(0,0,9+(i%3)*3,3.5);shape(i%2?'#ffe066':'#ffffff',1.5,'rgba(120,80,20,.5)');}
function ballO(kind,R,extra){return {h:2*R,w:2*R,rot:-PI*0.6,burst:560,up:1.25,spin:9,draw:()=>{c.save();c.rotate(FR*.15);BALLS[kind](R);c.restore();},
  parts(){const o=[];
    o.push({dx:0,dy:0,h:2*R,rest:R,drag:.15,vmax:200,draw:()=>BALLS[kind](R)});
    for(let i=0;i<10;i++)o.push({dx:((i*37)%180)-90,dy:-40-((i*23)%60),h:40,rest:20,drag:.35,draw:()=>pin(1.3,(i%2?1:-1)*1.2)});
    for(let i=0;i<10;i++)o.push({dx:((i*41)%200)-100,dy:-20,h:8,rest:4,drag:1.1,draw:()=>splinter(i)});
    for(let i=0;i<12;i++)o.push({dx:((i*31)%220)-110,dy:-60+((i*17)%60),h:10,rest:4,drag:2,vmax:240,flut:90,g:.6,draw:()=>sparkS(i)});
    for(let i=0;i<5;i++)o.push({dx:(i-2.5)*36,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i)});
    if(extra)extra(o);return o;},
  decal(x,g){burst(x,g,'#ffffff','#ffd21f',50,1.1+R/200);const u=Math.min(1,g*1.3);ell(x,F+10,(170*u+30),22);c.fillStyle='rgba(0,0,0,.22)';c.fill();
    for(let i=0;i<6;i++){c.save();c.translate(x+(hr(i,4)-.5)*300*u,F-14);c.rotate(PI/2+(hr(i,6)-.5)*.6);pin(1.15);c.restore();}
    if(g<1){c.save();c.globalAlpha=1-g;c.font='400 90px Anton';c.textAlign='center';c.fillStyle='#ffd21f';c.lineWidth=10;c.strokeStyle=O;c.strokeText('STRIKE!',x-40,F-260-g*60);c.fillText('STRIKE!',x-40,F-260-g*60);c.restore();}}};}
const classicO=ballO('classic',62),swirlO=ballO('swirl',68),galaxyO=ballO('galaxy',74),fireO=ballO('fire',82);
// ---------- room: bowling alley ----------
function neonSign(){const on=BEAT%2===0;c.save();c.translate(330,700);c.rotate(-.04);c.font='400 78px Anton';c.textAlign='center';c.lineWidth=6;
  c.shadowColor='#ff4fd8';c.shadowBlur=on?34:6;c.strokeStyle=on?'#ff9ad5':'#7a2b6e';c.strokeText('BOWL',0,0);c.shadowColor='#4dd4ff';c.strokeStyle=on?'#9ff0ff':'#1f5a6e';c.strokeText('★ ★ ★',0,64);c.restore();}
function rack(x,y){c.save();c.translate(x,y);c.beginPath();c.roundRect(-150,-14,300,20,8);shape(P('dark',-150,150),4,O);
  for(let k=0;k<4;k++){c.save();c.translate(-105+k*70,-46);[ball1,ball2,ball3,ball4][k](30);c.restore();}c.restore();}
function scoreScreen(f){const wx=730,wy=430,ww=260,wh=330;c.save();c.beginPath();c.rect(wx,wy,ww,wh);c.clip();c.fillStyle=lin(0,wy,0,wy+wh,[[0,'#0a1a3a'],[1,'#13306b']]);c.fillRect(wx,wy,ww,wh);
  c.font='400 40px Anton';c.textAlign='center';c.fillStyle='#ffd21f';c.fillText('FRAME',wx+ww/2,wy+60);
  c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;for(let k=0;k<4;k++){c.strokeRect(wx+20+k*56,wy+90,50,60);c.fillStyle='#fff';c.font='400 34px Anton';c.fillText('X',wx+45+k*56,wy+134);}
  c.font='400 70px Anton';c.fillStyle='#3cff8a';c.fillText(String(30*(1+Math.floor(((f%240)/60)))),wx+ww/2,wy+250);
  for(let k=0;k<12;k++){ell(wx+hr(k,1)*ww,wy+300+hr(k,2)*20,2,2);c.fillStyle='rgba(255,255,255,.5)';c.fill();}c.restore();}
function onTable(f){FR=f;const f0=((f-TL.offset)%TL.total+TL.total)%TL.total;BEAT=Math.floor((f0-12+240)/7.5);
  scoreScreen(f0);neonSign();rack(300,880);
  const a=TL.attempts.find(q=>f>=q.start&&f<q.end);if(a&&f<a.impact)pinSet(800,F);}
return {tag:'CHALLENGE #35',ask:'WHICH BALL IS YOURS? &darr;',askStyle:{background:'#fffbea',color:'#b35c00',border:'5px solid #b35c00',fontSize:'42px',left:'90px',right:'90px',boxShadow:'0 0 0 4px #fffbea, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'STRIKE!'},
 palette:{wallTop:'#0b1030',wallBot:'#2a1a5e',sky1:'#0a1a3a',sky2:'#13306b',night:true,floorA:'#e8c08a',floorB:'#b9824a'},
 objects:{classic:classicO,swirl:swirlO,galaxy:galaxyO,fire:fireO},onTable};};
