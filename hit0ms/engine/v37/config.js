// Video #36 — PARTY POPS: four original party poppers fall and burst into confetti: party popper cone (POP), confetti cannon (BANG),
// confetti balloon (BOOM), giant party bomb (KABOOM). Party room: bunting on the beat, balloons, fireworks in the window.
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
// ================= confetti + party objects =================
const CONF=['#ff4d6d','#ffd21f','#3ccf73','#4dabf7','#b197fc','#ff922b','#ffffff','#f783ac'];
function conf(i){c.save();c.rotate(hr(i,1)*6+FR*.2*(i%2?1:-1));const w=10+hr(i,2)*8,h=5+hr(i,3)*4;c.scale(1,Math.abs(Math.sin(FR*.25+i))*.8+.2);
  if(i%5===0){star(0,0,8,3.5);c.fillStyle=CONF[i%8];c.fill();}else if(i%3===0){ell(0,0,6,6);c.fillStyle=CONF[i%8];c.fill();}else{c.fillStyle=CONF[i%8];c.fillRect(-w/2,-h/2,w,h);}c.restore();}
function streamer(i,L=90){c.save();c.rotate(hr(i,4)*6);c.beginPath();for(let t=0;t<=1;t+=.04)c.lineTo(-L/2+L*t,Math.sin(t*PI*5+i+FR*.2)*10);c.lineCap='round';c.lineWidth=8;c.strokeStyle=O;c.stroke();c.lineWidth=5;c.strokeStyle=CONF[(i+2)%8];c.stroke();c.restore();}
function bigBurst(x,g,R){burst(x,g,'#ffffff','#ff4fd8',60,R);if(g<1){c.save();c.globalAlpha=(1-g);for(let i=0;i<60;i++){const a=hr(i,7)*PI*2,d=(60+hr(i,8)*380*R)*Math.min(1,g*2);c.save();c.translate(x+Math.cos(a)*d,F-160*R+Math.sin(a)*d*.8-g*40);conf(i+100);c.restore();}c.restore();}}
function partyFloor(x,g,R){const u=Math.min(1,g*1.3);for(let i=0;i<70;i++){c.save();c.translate(x+(hr(i,1)-.5)*420*R*(.4+.6*u),F+hr(i,2)*26-6);c.scale(1,.5);conf(i);c.restore();}
  for(let i=0;i<6;i++){c.save();c.translate(x+(hr(i,5)-.5)*300*R*u,F-2);c.scale(1,.4);streamer(i+30,70);c.restore();}}
// 1 — party popper cone
function popper(){c.save();c.beginPath();c.moveTo(0,90);c.lineTo(-48,-70);c.quadraticCurveTo(0,-92,48,-70);c.closePath();shape(lin(-48,0,48,0,[[0,'#b01818'],[.4,'#ff6b6b'],[1,'#b01818']]),5,O);
  c.save();c.clip();for(let k=-6;k<8;k++){c.beginPath();c.moveTo(-60,k*22);c.lineTo(60,k*22-30);c.lineWidth=8;c.strokeStyle='rgba(255,210,31,.9)';c.stroke();}c.restore();
  c.beginPath();c.moveTo(0,90);c.lineTo(-48,-70);c.quadraticCurveTo(0,-92,48,-70);c.closePath();c.lineWidth=5;c.strokeStyle=O;c.stroke();
  ell(0,-72,48,12);shape('#ffe066',4,O);for(let i=0;i<5;i++){c.save();c.translate(-30+i*15,-82);conf(i*3);c.restore();}
  c.beginPath();c.moveTo(0,90);c.lineTo(10,118);c.lineWidth=4;c.strokeStyle='#ffffff';c.stroke();ell(10,122,5,5);shape('#ff4d6d',2,O);gloss(-24,-40,6,22,.3,.4);c.restore();}
// 2 — confetti cannon tube
function cannon(){c.beginPath();c.roundRect(-38,-120,76,230,14);shape(lin(-38,0,38,0,[[0,'#1d5fbf'],[.4,'#6fb3ff'],[1,'#1d5fbf']]),5,O);
  c.save();c.beginPath();c.roundRect(-38,-120,76,230,14);c.clip();for(let k=0;k<12;k++){ell(-20+(k%3)*20,-90+Math.floor(k/3)*55,6,6);c.fillStyle=CONF[k%8];c.fill();}c.restore();
  c.beginPath();c.roundRect(-44,-134,88,26,8);shape('#ffd21f',4,O);c.beginPath();c.roundRect(-44,96,88,26,8);shape('#ffd21f',4,O);
  c.beginPath();c.roundRect(-30,-30,60,44,6);shape('#ffffff',3,O);c.fillStyle=O;c.font='400 26px Anton';c.textAlign='center';c.fillText('PARTY',0,0);
  c.beginPath();c.moveTo(0,122);c.lineTo(0,150);c.lineWidth=5;c.strokeStyle=O;c.stroke();ell(0,154,9,9);shape('#ff4d6d',3,O);gloss(-20,-80,5,30,0,.5);}
// 3 — confetti balloon
function cballoon(){c.beginPath();c.moveTo(0,110);c.lineTo(-6,140);c.lineTo(8,140);c.closePath();shape('#ff4fd8',3,O);
  ell(0,0,96,112);c.fillStyle='rgba(255,220,250,.35)';c.fill();c.save();ell(0,0,96,112);c.clip();for(let i=0;i<40;i++){c.save();c.translate((hr(i,1)-.5)*180,10+hr(i,2)*100);conf(i);c.restore();}c.restore();
  ell(0,0,96,112);c.lineWidth=5;c.strokeStyle=O;c.stroke();gloss(-40,-50,22,40,-.4,.6);gloss(40,30,6,12,-.4,.3);
  c.beginPath();c.moveTo(0,140);c.bezierCurveTo(-20,170,20,190,-6,220);c.lineWidth=3;c.strokeStyle='#ffffff';c.stroke();}
// 4 — giant party bomb
function pbomb(){ell(0,10,128,128);shape(rad(-40,-40,10,150,[[0,'#c4a2ff'],[.55,'#7a3fe0'],[1,'#3a1a7a']]),6,O);
  c.save();ell(0,10,128,128);c.clip();for(let k=0;k<10;k++){star(-90+(k%4)*60,-70+Math.floor(k/4)*70,16,7);c.fillStyle=CONF[k%8];c.fill();}c.restore();
  ell(0,10,128,128);c.lineWidth=6;c.strokeStyle=O;c.stroke();
  c.beginPath();c.roundRect(-30,-138,60,30,8);shape('#ffd21f',4,O);
  c.beginPath();c.moveTo(0,-138);c.bezierCurveTo(10,-170,40,-160,36,-190);c.lineWidth=7;c.strokeStyle=O;c.stroke();c.lineWidth=4;c.strokeStyle='#e8c08a';c.stroke();
  const fl=.8+.4*Math.sin(FR*1.3);c.save();c.translate(36,-196);c.scale(fl,fl);star(0,0,22,9,6);c.fillStyle='#ffd21f';c.fill();star(0,0,12,5,6);c.fillStyle='#ffffff';c.fill();c.restore();
  c.fillStyle='#fff';c.font='400 46px Anton';c.textAlign='center';c.lineWidth=7;c.strokeStyle=O;c.strokeText('BOOM!',0,30);c.fillText('BOOM!',0,30);gloss(-60,-60,26,14,-.6,.6);}
function partyO(draw,h,w,R,shells){return {h,w,rot:-PI*0.85,burst:560,up:1.3,spin:12,draw,
  parts(){const o=[];for(let i=0;i<shells.n;i++)o.push({dx:((i*41)%160)-80,dy:-30+((i*23)%60),h:24,rest:10,drag:.6,draw:()=>shardP(i,.9+(i%3)*.2,shells.k[i%shells.k.length])});
    for(let i=0;i<Math.round(50*R);i++)o.push({dx:((i*37)%260)-130,dy:-80+((i*13)%100),h:6,rest:2,drag:2.4,vmax:160,flut:120,g:.35,draw:()=>conf(i)});
    for(let i=0;i<Math.round(6*R);i++)o.push({dx:((i*53)%200)-100,dy:-50,h:10,rest:3,drag:1.8,vmax:200,flut:90,g:.5,draw:()=>streamer(i,70+(i%3)*30)});
    for(let i=0;i<6;i++)o.push({dx:(i-3)*36,dy:40,h:20,rest:8,drag:2.6,vmax:120,flut:50,g:.3,draw:()=>puff(i)});return o;},
  decal(x,g){bigBurst(x,g,R);partyFloor(x,g,R);}};}
PL.pink=['#ffb3f0','#d63aa0'];
const popperO=partyO(popper,230,100,.8,{n:6,k:['red','yel']}),cannonO=partyO(cannon,290,90,1,{n:8,k:['blue','yel']}),balloonO=partyO(cballoon,280,200,1.3,{n:6,k:['pink']}),bombO=partyO(pbomb,330,260,1.7,{n:10,k:['pur','yel']});
// ---------- room ----------
function bunting(){const x0=-20,x1=700,y0=590,sag=40;c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(x0+(x1-x0)*t,y0+Math.sin(t*PI)*sag);c.lineWidth=3;c.strokeStyle='#ffffff';c.stroke();
  for(let k=0;k<14;k++){const t=(k+.5)/14,x=x0+(x1-x0)*t,y=y0+Math.sin(t*PI)*sag;c.beginPath();c.moveTo(x-20,y);c.lineTo(x+20,y);c.lineTo(x,y+40);c.closePath();shape((BEAT+k)%2?CONF[k%8]:'#ffffff',2.5,O);}}
function balloon(x,y,col,s=1){c.save();c.translate(x,y+Math.sin(FR*.08+x)*6);c.scale(s,s);c.beginPath();c.moveTo(0,40);c.bezierCurveTo(-8,70,8,90,0,120);c.lineWidth=2;c.strokeStyle='#ffffff';c.stroke();ell(0,0,32,40);shape(col,3.5,O);gloss(-12,-16,7,12,-.4,.6);c.restore();}
function hat(x,y){c.save();c.translate(x,y);c.beginPath();c.moveTo(0,-70);c.lineTo(-30,0);c.lineTo(30,0);c.closePath();shape(lin(-30,0,30,0,[[0,'#2f9e44'],[.5,'#69db7c'],[1,'#2f9e44']]),3.5,O);for(let k=0;k<4;k++){ell(-12+k*8,-14-k*12,4,4);c.fillStyle='#ffd21f';c.fill();}star(0,-74,10,4);shape('#ffd21f',2,O);c.restore();}
function fireworks(f){const wx=730,wy=430,ww=260,wh=330;c.save();c.beginPath();c.rect(wx,wy,ww,wh);c.clip();c.fillStyle=lin(0,wy,0,wy+wh,[[0,'#07071f'],[1,'#1a1a5e']]);c.fillRect(wx,wy,ww,wh);
  for(let k=0;k<3;k++){const ph=((f+k*80)%240)/80;if(ph>1)continue;const cx=wx+50+k*80,cy=wy+80+(k%2)*80;for(let i=0;i<14;i++){const a=i/14*PI*2,d=ph*60;ell(cx+Math.cos(a)*d,cy+Math.sin(a)*d,3,3);c.fillStyle=CONF[(i+k)%8];c.globalAlpha=1-ph;c.fill();}c.globalAlpha=1;}
  c.fillStyle='#0b0b2a';c.fillRect(wx,wy+wh-60,ww,60);c.restore();}
function onTable(f){FR=f;const f0=((f-TL.offset)%TL.total+TL.total)%TL.total;BEAT=Math.floor((f0-12+240)/7.5);
  fireworks(f0);bunting();balloon(80,700,'#ff4d6d');balloon(140,680,'#4dabf7',1.1);balloon(200,705,'#ffd21f',.95);hat(330,880);
  for(let i=0;i<8;i++){c.save();c.translate(400+i*22,878);c.scale(1,.4);conf(i+50);c.restore();}}
return {tag:'CHALLENGE #36',ask:'BIGGEST POP? &darr;',askStyle:{background:'#fff0fb',color:'#7a1fa2',border:'5px solid #7a1fa2',fontSize:'44px',left:'90px',right:'90px',boxShadow:'0 0 0 4px #fff0fb, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'POPPED IT!'},
 palette:{wallTop:'#2a0b4a',wallBot:'#7a1f6e',sky1:'#07071f',sky2:'#1a1a5e',night:true,floorA:'#fff4e6',floorB:'#ff9ad5'},
 objects:{popper:popperO,cannon:cannonO,balloon:balloonO,bomb:bombO},onTable};};
