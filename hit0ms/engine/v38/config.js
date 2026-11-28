// Video #39 — GUMMY CANDIES: four original gummies (no brands) fall and SQUISH on the floor with an elastic jelly wobble,
// translucent chunks, juice droplets and sour-sugar sparkle: red gummy bear (SWEET), sugared peach ring (SQUISH),
// striped sour worm blue/pink/yellow (SOUR), giant golden gummy bear (LEGEND). Candy-shop room: gummy jar on the table.
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
export default (H)=>{const {c,lin,rad,ell}=H;const F=H.FLOOR_Y;const PI=Math.PI;
let FR=0;   // timeline frame (set in onTable, which runs before decal/parts every frame)
const hr=(a,b=0)=>{const s=Math.sin(a*12.9898+b*78.233)*43758.5453;return s-Math.floor(s);};
// seconds after impact, mirrored from the engine (also runs backwards during the rewind)
function after(){const A=TL.attempts,a=A.find(x=>FR>=x.start&&FR<x.end);if(!a)return 0;const k=FR-a.impact;
  if(k>=1&&k<a.hold)return k/TL.fps;if(k>=a.hold){const rwv=(k-a.hold+1)/(a.rw+1);if(rwv<0.4)return (a.hold-1)/TL.fps*(1-rwv/0.4);}return 0;}
function star(x,y,R,r,n=4){c.beginPath();for(let i=0;i<2*n;i++){const a=-PI/2+i*PI/n,rr=i%2?r:R;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function blob(r,i,n=9,j=.35){c.beginPath();for(let k=0;k<n;k++){const a=k/n*PI*2,rr=r*(1-j/2+j*hr(i,k));c.lineTo(Math.cos(a)*rr*1.15,Math.sin(a)*rr*.85);}c.closePath();}
const E=(x,y,rx,ry,r=0)=>{c.moveTo(x+rx*Math.cos(r),y+rx*Math.sin(r));c.ellipse(x,y,rx,ry,r,0,PI*2);};
// ---------- gummy material: translucent jelly lit from the top-left ----------
// C = {hi, mid, lo, edge, glow}; L = half size; path() builds the silhouette (union of sub-paths, same winding)
function sugar(L,n,seed,a=.9){for(let i=0;i<n;i++){const x=(hr(i,seed)-.5)*2.2*L,y=(hr(i,seed+1)-.5)*2.2*L,s=2+hr(i,seed+2)*3.2;c.save();c.translate(x,y);c.rotate(hr(i,seed+3)*3);
  c.fillStyle=`rgba(255,255,255,${a*(.55+.45*hr(i,seed+4))})`;c.fillRect(-s/2,-s/2,s,s);c.restore();}}
function gum(path,C,L,o={}){
  path();c.lineWidth=11;c.lineJoin='round';c.strokeStyle=C.edge;c.stroke();                                   // dark jelly edge
  path();c.fillStyle=o.fill||rad(-L*.4,-L*.5,L*.05,L*1.45,[[0,C.hi],[.42,C.mid],[1,C.lo]]);c.fill();          // body
  c.save();path();c.clip();
  c.fillStyle=rad(L*.28,L*.42,0,L*.75,[[0,C.glow],[1,'rgba(255,255,255,0)']]);c.fillRect(-L*2,-L*2,L*4,L*4);  // light passing through (bottom-right)
  path();c.lineWidth=L*.16;c.strokeStyle='rgba(40,0,10,.22)';c.stroke();                                      // inner depth rim
  c.save();c.translate(L*.05,L*.06);path();c.restore();c.lineWidth=L*.07;c.strokeStyle='rgba(255,255,255,.22)';c.stroke(); // rim light
  if(o.inner)o.inner();if(o.sugar)sugar(L,o.sugar,o.seed||3);c.restore();
  if(o.spec!==false){ell(-L*.42,-L*.55,L*.13,L*.06,-.7);c.fillStyle='rgba(255,255,255,.92)';c.fill();              // sharp specular
    ell(-L*.24,-L*.66,L*.045,L*.03,-.7);c.fillStyle='rgba(255,255,255,.85)';c.fill();
    ell(L*.32,L*.42,L*.06,L*.025,-.5);c.fillStyle='rgba(255,255,255,.45)';c.fill();}}
// ---------- 1 & 4: gummy bear ----------
// one clean outer contour (union of the ellipses, sampled as a polar envelope from the belly) so no inner seams show
const BE=[[0,40,64,74,0],[0,-58,56,50,0],[-42,-102,21,21,0],[42,-102,21,21,0],[-58,0,22,32,.5],[58,0,22,32,-.5],[-36,98,30,26,0],[36,98,30,26,0]];
const BEAR=(()=>{const cx=0,cy=10,pts=[];for(let i=0;i<360;i++){const th=i/360*PI*2,dx=Math.cos(th),dy=Math.sin(th);let best=0;
  for(const [ex,ey,rx,ry,r] of BE){const co=Math.cos(-r),si=Math.sin(-r);const ox=(cx-ex)*co-(cy-ey)*si,oy=(cx-ex)*si+(cy-ey)*co,vx=dx*co-dy*si,vy=dx*si+dy*co;
    const A=vx*vx/(rx*rx)+vy*vy/(ry*ry),B=2*(ox*vx/(rx*rx)+oy*vy/(ry*ry)),C=ox*ox/(rx*rx)+oy*oy/(ry*ry)-1,D=B*B-4*A*C;if(D<0)continue;const t=(-B+Math.sqrt(D))/(2*A);if(t>best)best=t;}
  pts.push([cx+dx*best,cy+dy*best]);}return pts;})();
function bearPath(){c.beginPath();for(const [x,y] of BEAR)c.lineTo(x,y);c.closePath();}
function bear(C,s,gold){c.save();c.scale(s,s);
  gum(bearPath,C,125,{inner(){ell(0,-42,24,17);c.fillStyle='rgba(255,255,255,.16)';c.fill();                          // snout
     ell(0,-50,8,6);c.fillStyle=C.lo;c.fill();for(const x of [-20,20]){ell(x,-70,7,8);c.fillStyle=C.lo;c.fill();ell(x-2,-73,2.5,2.5);c.fillStyle='rgba(255,255,255,.8)';c.fill();}
     for(const x of [-42,42]){ell(x,-102,10,10);c.fillStyle='rgba(60,0,10,.18)';c.fill();}
     ell(0,50,36,46);c.fillStyle='rgba(255,255,255,.13)';c.fill();                                                     // belly
     c.beginPath();c.moveTo(-34,-14);c.quadraticCurveTo(0,-2,34,-14);c.lineWidth=5;c.strokeStyle='rgba(60,0,10,.2)';c.stroke(); // neck crease
     for(const x of [-36,36])for(const d of [-10,0,10]){c.beginPath();c.moveTo(x+d,112);c.lineTo(x+d*1.2,120);c.lineWidth=3;c.strokeStyle='rgba(60,0,10,.25)';c.stroke();}
     if(gold){for(let i=0;i<16;i++){const tw=.5+.5*Math.sin(FR*.5+i*1.7);star(-60+hr(i,9)*120,-110+hr(i,8)*220,7*tw+2,2);c.fillStyle=`rgba(255,255,240,${.5+.5*tw})`;c.fill();}}}});
  c.restore();}
// ---------- 2: sugared peach ring ----------
function ringPath(dy=0){return ()=>{c.beginPath();c.moveTo(96,dy);c.ellipse(0,dy,96,86,0,0,PI*2);c.moveTo(38,dy);c.ellipse(0,dy,38,33,0,0,PI*2,true);};}
function ring(){const Cb={hi:'#fffaf0',mid:'#ffe2c4',lo:'#d89a6a',edge:'#5a2a08',glow:'rgba(255,255,255,.5)'};
  const Ct={hi:'#ffe98a',mid:'#ff9a1f',lo:'#c4400a',edge:'#5a2a08',glow:'rgba(255,240,170,.75)'};
  gum(ringPath(12),Cb,100,{spec:false,sugar:120,seed:11});
  gum(ringPath(-6),Ct,100,{fill:rad(0,-6,30,100,[[0,'#ffe066'],[.35,'#ffc23a'],[.7,'#ff8a1a'],[1,'#d9480f']]),sugar:260,seed:5,
    inner(){c.fillStyle=rad(-50,-60,0,70,[[0,'rgba(255,255,230,.55)'],[1,'rgba(255,255,230,0)']]);c.fillRect(-120,-120,240,240);}});}
// ---------- 3: striped sour worm ----------
const WC=[['#7ec8ff','#1e7be0','#0b3d8f'],['#ffb0dc','#ff3fa4','#a3105e'],['#fff38a','#ffd400','#b88a00']];
const wp=t=>[46*Math.sin(t*PI*2.2+.3),-120+240*t];
function wcurve(a,b,dx=0,dy=0){c.beginPath();for(let t=a;t<=b+1e-6;t+=.02){const [x,y]=wp(Math.min(t,b));c.lineTo(x+dx,y+dy);}}
function worm(){c.lineCap='round';c.lineJoin='round';
  wcurve(0,1);c.lineWidth=62;c.strokeStyle='#2a0d3a';c.stroke();
  const NB=6;for(let i=0;i<NB;i++){const a=i/NB,b=(i+1)/NB,col=WC[i%3];c.lineCap=(i===0||i===NB-1)?'round':'butt';
    wcurve(a,b);c.lineWidth=51;c.strokeStyle=col[1];c.stroke();
    wcurve(a,b,6,7);c.lineWidth=22;c.strokeStyle=col[0]+'99';c.stroke();                       // light passing through
    wcurve(a,b,-7,-6);c.lineWidth=16;c.strokeStyle=col[0];c.stroke();}                          // lit side
  c.lineCap='round';wcurve(0,1,11,9);c.lineWidth=9;c.strokeStyle='rgba(30,0,40,.22)';c.stroke();   // shadow side
  for(const [a,b] of [[.04,.14],[.3,.42],[.62,.72],[.86,.94]]){wcurve(a,b,-13,-10);c.lineWidth=6;c.strokeStyle='rgba(255,255,255,.9)';c.stroke();}
  for(let i=0;i<240;i++){const [x,y]=wp(hr(i,1));const a=hr(i,2)*PI*2,d=hr(i,3)*24;const s=2+hr(i,4)*3;c.save();c.translate(x+Math.cos(a)*d,y+Math.sin(a)*d);c.rotate(hr(i,5)*3);
    c.fillStyle=`rgba(255,255,255,${.55+.4*hr(i,6)})`;c.fillRect(-s/2,-s/2,s,s);c.restore();}}
// ---------- colours ----------
const RED={hi:'#ffb0a8',mid:'#ef1b31',lo:'#6e0010',edge:'#3e0008',glow:'rgba(255,150,130,.7)'};
const GOLD={hi:'#fff6c2',mid:'#ffbf1f',lo:'#a85a00',edge:'#4a2800',glow:'rgba(255,250,210,.8)'};
// ---------- pieces ----------
function chunk(i,C,s=1){c.save();c.rotate(hr(i,7)*6);blob(11*s+(i%3)*4*s,i,8,.4);c.fillStyle=rad(-5*s,-6*s,1,20*s,[[0,C.hi],[.5,C.mid],[1,C.lo]]);c.globalAlpha=.82;c.fill();c.globalAlpha=1;
  c.lineWidth=3;c.strokeStyle=C.edge;c.stroke();ell(-5*s,-5*s,4*s,2*s,-.6);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.restore();}
function drop(i,C){ell(0,0,6+(i%3)*2,7+(i%3)*2);c.fillStyle=C.mid+'cc';c.fill();ell(-2,-3,2,1.5);c.fillStyle='rgba(255,255,255,.9)';c.fill();}
function crystal(i){const tw=.6+.4*Math.sin(FR*.7+i);c.save();c.rotate(hr(i,4)*3+FR*.15);if(i%4===0){star(0,0,9*tw,2.5);c.fillStyle='#ffffff';c.fill();}else{c.fillStyle='rgba(255,255,255,.95)';c.fillRect(-3.5,-3.5,7,7);}c.restore();}
function ringBurst(x,t,C,R){if(t>.3)return;const g=t/.3;c.save();c.globalAlpha=1-g;c.lineCap='round';for(let i=0;i<14;i++){const a=-PI+(i+.5)/14*PI,r0=60*R+60*g*R,r1=(110+220*g)*R;
  c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-30+Math.sin(a)*r0*.8);c.lineTo(x+Math.cos(a)*r1,F-30+Math.sin(a)*r1*.8);c.lineWidth=i%2?7:11;c.strokeStyle=i%2?'#ffffff':C.hi;c.stroke();}c.restore();}
// elastic squish of the whole gummy on the floor + juicy translucent splat
function mkGummy({draw,h,w,C,Cs,R,rot,chunks,crys}){Cs=Cs||[C];
  return {h,w,rot,burst:520,up:1.15,spin:10,draw,
    parts(){const o=[];for(let i=0;i<chunks;i++)o.push({dx:((i*41)%160)-80,dy:-30+((i*23)%60),h:22,rest:9,drag:.5,draw:()=>chunk(i,Cs[i%Cs.length],.9+(i%3)*.25)});
      for(let i=0;i<Math.round(10*R);i++)o.push({dx:((i*37)%200)-100,dy:-20,h:12,rest:5,drag:.9,draw:()=>drop(i,Cs[(i+1)%Cs.length])});
      for(let i=0;i<crys;i++)o.push({dx:((i*29)%240)-120,dy:-60+((i*13)%80),h:6,rest:2,drag:1.6,vmax:420,flut:60,g:.6,draw:()=>crystal(i)});return o;},
    decal(x){const t=after(),u=Math.min(1,t*7);
      // translucent juice puddle + droplets
      ell(x,F+6,(w*.55+70*R*u),16+10*R*u);c.fillStyle=C.mid+'66';c.fill();ell(x-20,F+2,(w*.3+30*R*u),5);c.fillStyle='rgba(255,255,255,.35)';c.fill();
      for(let i=0;i<10;i++){const sd=(hr(i,3)-.5)*2,px=x+sd*(w*.5+160*R*u),py=F+4+hr(i,4)*18;ell(px,py,(5+hr(i,5)*9)*u+1,(3+hr(i,5)*4)*u+.5);c.fillStyle=Cs[i%Cs.length].mid+'aa';c.fill();
        ell(px-2,py-1,2*u,1*u);c.fillStyle='rgba(255,255,255,.8)';c.fill();}
      ringBurst(x,t,C,R);
      // elastic body: squash -> stretch overshoot -> damped jelly wobble, anchored at the floor
      const sy=1-.56*Math.exp(-t*5.2)*Math.cos(t*25),sx=1+(1-sy)*.85,sk=.14*Math.exp(-t*4.5)*Math.sin(t*31);
      H.shadow(x,F+4,w*.7*sx,12,.4);c.save();c.translate(x,F+3);c.transform(1,0,sk,1,0,0);c.scale(sx,sy);c.translate(0,-h/2);draw();c.restore();}};}
const bearO=mkGummy({draw:()=>bear(RED,1),h:250,w:165,C:RED,R:.9,rot:-PI*2,chunks:7,crys:14});
const ringO=mkGummy({draw:ring,h:200,w:196,C:{hi:'#ffe98a',mid:'#ff9a1f',lo:'#c4400a',edge:'#5a2a08'},Cs:[{hi:'#ffe98a',mid:'#ff9a1f',lo:'#c4400a',edge:'#5a2a08'},{hi:'#fff6dd',mid:'#ffd6a8',lo:'#d89a6a',edge:'#5a2a08'}],R:1,rot:-PI*2,chunks:8,crys:30});
const WCS=WC.map(([hi,mid,lo])=>({hi,mid,lo,edge:'#2a0d3a'}));
const wormO=mkGummy({draw:worm,h:300,w:150,C:WCS[1],Cs:WCS,R:1.2,rot:-PI,chunks:10,crys:40});
const giantO=mkGummy({draw:()=>bear(GOLD,1.36,true),h:340,w:230,C:GOLD,R:1.7,rot:-PI*2,chunks:14,crys:46});
// ---------- candy shop decor ----------
const MINI=[RED,GOLD,{hi:'#c6ffb0',mid:'#3fcf3a',lo:'#16701a',edge:'#0b3a0e',glow:'rgba(220,255,200,.6)'},{hi:'#ffe98a',mid:'#ff8a1a',lo:'#a33d00',edge:'#4a1a00',glow:'rgba(255,240,180,.6)'},
  {hi:'#ffd0f0',mid:'#ff4fb8',lo:'#8a0d58',edge:'#40052a',glow:'rgba(255,200,240,.6)'},{hi:'#e8f7ff',mid:'#ffffff',lo:'#a8c4d8',edge:'#4a5a6a',glow:'rgba(255,255,255,.6)'}];
function mini(x,y,s,i,r=0){c.save();c.translate(x,y);c.rotate(r);c.scale(s,s);bearPath();c.lineWidth=12;c.strokeStyle=MINI[i%6].edge;c.stroke();bearPath();
  c.fillStyle=rad(-40,-50,4,170,[[0,MINI[i%6].hi],[.45,MINI[i%6].mid],[1,MINI[i%6].lo]]);c.fill();ell(-40,-60,14,7,-.7);c.fillStyle='rgba(255,255,255,.9)';c.fill();c.restore();}
function jar(){const x0=88,x1=272,yb=878,yt=640;
  c.save();c.beginPath();c.roundRect(x0,yt,x1-x0,yb-yt,28);c.clip();c.fillStyle='rgba(220,245,255,.18)';c.fillRect(x0,yt,x1-x0,yb-yt);
  for(let i=0;i<30;i++){const r=Math.floor(i/6),k=i%6;mini(x0+24+k*28+(r%2)*12,yb-22-r*38-hr(i,2)*8,.17,i+r,(hr(i,1)-.5)*1.6);}c.restore();
  c.beginPath();c.roundRect(x0,yt,x1-x0,yb-yt,28);c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.75)';c.stroke();
  c.beginPath();c.roundRect(x0+16,yt+30,14,yb-yt-70,7);c.fillStyle='rgba(255,255,255,.45)';c.fill();
  c.beginPath();c.roundRect(x0+12,yt-30,x1-x0-24,34,10);c.fillStyle=lin(0,yt-30,0,yt+4,[[0,'#ff6b9a'],[1,'#c2185b']]);c.fill();c.lineWidth=4;c.strokeStyle='#4a0a24';c.stroke();
  c.beginPath();c.roundRect(x0+30,yt+70,x1-x0-60,46,10);c.fillStyle='#fff6e8';c.fill();c.lineWidth=3;c.strokeStyle='#c2185b';c.stroke();
  c.fillStyle='#c2185b';c.font='400 34px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText('GUMMIES',(x0+x1)/2,yt+94);}
function onTable(f){FR=f;jar();mini(312,858,.2,0,.3);mini(352,862,.17,2,-.4);}
return {tag:'CHALLENGE #39',ask:'WHICH GUMMY WOULD YOU SAVE? &darr;',askStyle:{background:'#fff0f6',color:'#c2185b',border:'5px solid #c2185b',fontSize:'40px',left:'80px',right:'80px',boxShadow:'0 0 0 4px #fff0f6, 0 10px 40px rgba(0,0,0,.6)'},
 secret:{title:'SAVED IT!'},
 palette:{wallTop:'#3a0a3e',wallBot:'#c22f72',sky1:'#7fd3ff',sky2:'#e8f8ff',night:false,floorA:'#fff6fb',floorB:'#8fe3cf'},
 objects:{bear:bearO,ring:ringO,worm:wormO,giant:giantO},onTable};};
