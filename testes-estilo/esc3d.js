// Teste v2 "nível engineeredwithin": 3D detalhado → 360x640 → dither Bayer + paleta → upscale pixelado.
// Texturas procedurais, perfil por torno, dentes extrudidos, PCB, fios, ímanes, comutador, barbearia pixel. node px3d2.js <out> <frames> [step] [start]
const {chromium}=require('playwright');const fs=require('fs');
const three=fs.readFileSync(__dirname+'/node_modules/three/build/three.cjs','utf8');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const W=1080,H=1920,PX=3,w=W/PX,h=H/PX;
const page=`<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font});font-weight:900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#000}
canvas#out{position:absolute;inset:0;width:${W}px;height:${H}px;image-rendering:pixelated}
#hook{position:absolute;left:40px;top:150px;width:1000px;height:200px;border-radius:28px;background:#ffd21f;border:10px solid #0a1633;box-sizing:border-box;box-shadow:0 14px 0 rgba(0,0,0,.25);font-family:M;font-weight:900;text-align:center;line-height:1}
#hook div:first-child{font-size:66px;color:#0a1633;margin-top:28px}#hook div:last-child{font-size:66px;color:#e0483a;margin-top:12px}
</style></head><body>
<canvas id=out width=${w} height=${h}></canvas>
<div id=hook><div>COMO FUNCIONA A</div><div>ESCOVA ELÉTRICA?</div></div>
<script>window.THREE=(function(){var module={exports:{}},exports=module.exports;${three};return module.exports;})();</script>
<script>
const w=${w},h=${h}; const ease=x=>1-Math.pow(1-Math.max(0,Math.min(1,x)),3), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const out=document.getElementById('out'), ctx=out.getContext('2d',{willReadFrequently:true}); ctx.imageSmoothingEnabled=false;
const R=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true}); R.setSize(w/2,h/2,false); R.setPixelRatio(1);
const S=new THREE.Scene(), cam=new THREE.PerspectiveCamera(30,w/h,.05,100);
S.add(new THREE.HemisphereLight(0xffe6d0,0x2a1a5a,1.0)); const key=new THREE.DirectionalLight(0xfff2dd,2.6); key.position.set(5,7,6); S.add(key);
const rim=new THREE.DirectionalLight(0x6fd8ff,2.0); rim.position.set(-6,3,-5); S.add(rim); const fill=new THREE.PointLight(0xff7ab8,6,20); fill.position.set(-3,-2,4); S.add(fill);
const grad=new THREE.DataTexture(new Uint8Array([55,55,55,255, 120,120,120,255, 190,190,190,255, 255,255,255,255]),4,1); grad.needsUpdate=true; grad.minFilter=grad.magFilter=THREE.NearestFilter;
// texturas procedurais (pixel)
function tex(fn,sz=32,rep=[1,1]){ const c=document.createElement('canvas'); c.width=c.height=sz; const g=c.getContext('2d'); fn(g,sz); const t=new THREE.CanvasTexture(c); t.magFilter=t.minFilter=THREE.NearestFilter; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(...rep); t.colorSpace=THREE.SRGBColorSpace; return t; }
const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(7);
const T={
 plastic:tex((g,s)=>{g.fillStyle='#e0483a';g.fillRect(0,0,s,s);for(let i=0;i<120;i++){g.fillStyle=rnd()<.5?'#d23c30':'#ea5a4a';g.fillRect(rnd()*s|0,rnd()*s|0,1,1);} },32,[3,3]),
 ribs:tex((g,s)=>{g.fillStyle='#b8322a';g.fillRect(0,0,s,s);for(let y=0;y<s;y+=4){g.fillStyle='#8a2018';g.fillRect(0,y,s,2);g.fillStyle='#e0584a';g.fillRect(0,y+2,s,1);} },32,[4,2]),
 steel:tex((g,s)=>{g.fillStyle='#c9ced8';g.fillRect(0,0,s,s);for(let i=0;i<s;i++){g.fillStyle=rnd()<.5?'#b6bccb':'#dde2ea';g.fillRect(0,i,s,1);} for(let i=0;i<60;i++){g.fillStyle='#eef2f8';g.fillRect(rnd()*s|0,rnd()*s|0,2,1);} },32,[2,1]),
 gold:tex((g,s)=>{g.fillStyle='#e6b84a';g.fillRect(0,0,s,s);for(let i=0;i<s;i++){g.fillStyle=rnd()<.5?'#d4a43a':'#f2cc66';g.fillRect(0,i,s,1);} },32,[2,1]),
 copper:tex((g,s)=>{for(let y=0;y<s;y++){g.fillStyle=y%2?'#b8641e':'#e08a3a';g.fillRect(0,y,s,1);} for(let i=0;i<40;i++){g.fillStyle='#ffc07a';g.fillRect(rnd()*s|0,rnd()*s|0,1,1);} },32,[4,6]),
 batt:tex((g,s)=>{g.fillStyle='#4fcf7a';g.fillRect(0,0,s,s);g.fillStyle='#2f9a58';g.fillRect(0,s*.3,s,s*.12);g.fillStyle='#fff';g.fillRect(s*.2,s*.55,s*.6,2);g.fillRect(s*.2,s*.65,s*.4,2); },32,[3,1]),
 pcb:tex((g,s)=>{g.fillStyle='#1f7a4a';g.fillRect(0,0,s,s);g.fillStyle='#e6c060';for(let i=0;i<10;i++){const y=rnd()*s|0;g.fillRect(0,y,rnd()*s|0,1);const x=rnd()*s|0;g.fillRect(x,0,1,rnd()*s|0);} for(let i=0;i<8;i++){g.fillStyle='#d9d9d9';g.fillRect(rnd()*s|0,rnd()*s|0,2,2);} },32,[2,2]),
 yoke:tex((g,s)=>{g.fillStyle='#f4f4f8';g.fillRect(0,0,s,s);for(let i=0;i<50;i++){g.fillStyle='#dcdce8';g.fillRect(rnd()*s|0,rnd()*s|0,1,1);} },16,[1,1]),
};
const M=(o)=>new THREE.MeshToonMaterial(Object.assign({gradientMap:grad},o));
const OUT=new THREE.MeshBasicMaterial({color:0x0a0a1a,side:THREE.BackSide});
function add(geo,mat,par,{x=0,y=0,z=0,rx=0,ry=0,rz=0,ol=1.04,sc=null}={}){ const m=new THREE.Mesh(geo,mat); m.position.set(x,y,z); m.rotation.set(rx,ry,rz); if(sc) m.scale.set(...sc); par.add(m);
  if(ol){ const o=new THREE.Mesh(geo,OUT); o.scale.setScalar(ol); m.add(o); m.userData.ol=o; } return m; }
const root=new THREE.Group(); S.add(root);
// ---- ESCOVA ELÉTRICA: cabo por torno, cabeça redonda com cerdas, eixo, alavanca, roda dentada, pinhão, motor, pilha, bobina de carga
T.white=tex((g,s)=>{g.fillStyle='#f4f6fb';g.fillRect(0,0,s,s);for(let i=0;i<90;i++){g.fillStyle=rnd()<.5?'#e6eaf3':'#ffffff';g.fillRect(rnd()*s|0,rnd()*s|0,1,1);} },32,[3,3]);
T.blue=tex((g,s)=>{g.fillStyle='#2e6fd0';g.fillRect(0,0,s,s);for(let y=0;y<s;y+=3){g.fillStyle='#2558b0';g.fillRect(0,y,s,1);} },32,[2,4]);
T.cell=tex((g,s)=>{g.fillStyle='#ffd21f';g.fillRect(0,0,s,s);g.fillStyle='#1a1a22';g.fillRect(0,s*.38,s,s*.24);g.fillStyle='#ffd21f';g.font='bold 9px sans-serif';g.fillText('1,2V',3,s*.58); },32,[2,1]);
const shell=new THREE.Group(); root.add(shell);
const prof=[[0,-4.6],[.7,-4.55],[.82,-4.3],[.85,-3],[.8,-1],[.72,.6],[.62,1.4],[.45,1.7],[0,1.72]].map(p=>new THREE.Vector2(p[0],p[1]));
const bodyM=M({map:T.white,transparent:true}); add(new THREE.LatheGeometry(prof,40),bodyM,shell,{});
const gripM=M({map:T.blue,transparent:true}); add(new THREE.CylinderGeometry(.86,.83,2.6,40,1,true,-.9,1.8),gripM,shell,{y:-2.4,ol:0});
const swM=M({color:0x2e6fd0,transparent:true}); const btn=add(new THREE.CylinderGeometry(.22,.22,.08,20),swM,shell,{y:.1,z:.74,rx:Math.PI/2,ol:1.1});
const ledM=M({color:0x5fe08a,emissive:0x2fd06a,transparent:true}); add(new THREE.SphereGeometry(.06,8,6),ledM,shell,{y:-.5,z:.8,ol:0});
const bandM=M({color:0xc9ced8,transparent:true}); add(new THREE.CylinderGeometry(.5,.62,.25,32),bandM,shell,{y:1.6});
const knob={material:M({transparent:true})};
// pescoço + cabeça (cabeça oscila à volta do eixo z)
const neck=add(new THREE.CylinderGeometry(.22,.32,2.0,24),M({map:T.white}),root,{y:2.7});
add(new THREE.BoxGeometry(.1,1.6,.02),M({color:0x2e6fd0}),neck,{z:.27,ol:0});
const headG=new THREE.Group(); headG.position.set(0,3.85,.12); root.add(headG);
const headSpin=new THREE.Group(); headG.add(headSpin);
add(new THREE.CylinderGeometry(.55,.55,.22,32),M({map:T.white}),headSpin,{rx:Math.PI/2});
for(let r=0;r<3;r++){ const n=[1,8,14][r], rr=[0,.22,.42][r]; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2+r; add(new THREE.CylinderGeometry(.05,.05,.32,6),M({color:(r+i)%3===0?0x2e86d0:((r===2&&i%2)?0x7fe3ff:0xffffff)}),headSpin,{x:Math.cos(a)*rr,y:Math.sin(a)*rr,z:.27,rx:Math.PI/2,ol:1.15}); } }
// interior
const inside=new THREE.Group(); root.add(inside);
const shaft=add(new THREE.CylinderGeometry(.05,.05,4.2,8),M({color:0xdfe5ee}),inside,{y:1.6});
const lever=new THREE.Group(); lever.position.y=-.45; inside.add(lever);
add(new THREE.BoxGeometry(.7,.12,.16),M({color:0x5fd8c0}),lever,{x:.32});
const lpin=add(new THREE.CylinderGeometry(.06,.06,.3,8),M({color:0xe0483a}),lever,{x:.62,y:-.12});
function gear(r,n,th,col){ const g=new THREE.Group(); add(new THREE.CylinderGeometry(r,r,th,28),M({color:col}),g,{}); for(let i=0;i<n;i++){ const a=i/n*Math.PI*2; add(new THREE.BoxGeometry(.1,th,.12),M({color:col}),g,{x:Math.cos(a)*(r+.04),z:Math.sin(a)*(r+.04),ry:-a,ol:0}); } return g; }
const wheel=gear(.42,18,.14,0xffd21f); wheel.position.set(.62,-.8,0); inside.add(wheel); const wpin=add(new THREE.CylinderGeometry(.06,.06,.22,8),M({color:0xe0483a}),wheel,{x:.22,y:.15});
const pinion=gear(.16,8,.16,0xe6b84a); pinion.position.set(.62+.62,-.8,0); inside.add(pinion);
const motor=new THREE.Group(); motor.position.set(.35,-1.9,0); inside.add(motor);
add(new THREE.CylinderGeometry(.45,.45,1.2,28,1,true),M({color:0x9aa6bb,side:THREE.DoubleSide,transparent:true,opacity:.45}),motor,{ol:0});
for(const [c,a] of [[0xe0483a,0],[0x2e86d0,Math.PI]]) add(new THREE.CylinderGeometry(.42,.42,1.05,24,1,true,a-1,2),M({color:c,side:THREE.DoubleSide}),motor,{ol:0});
const arm=new THREE.Group(); motor.add(arm); add(new THREE.CylinderGeometry(.26,.26,.85,6),M({map:T.copper}),arm,{ol:1.03}); const ring=add(new THREE.CylinderGeometry(.13,.13,.18,10),M({color:0xe6b84a}),arm,{y:.55,ol:0});
add(new THREE.CylinderGeometry(.04,.04,1.0,6),M({color:0xdfe5ee}),arm,{y:.9,ol:0});
const batt=add(new THREE.CylinderGeometry(.45,.45,1.5,24),M({map:T.cell}),inside,{y:-3.25});
const pcb=add(new THREE.BoxGeometry(.5,2.4,.05),M({map:T.pcb}),inside,{y:-1.4,z:.55,x:-.1}); const sw=add(new THREE.BoxGeometry(.24,.24,.1),M({color:0xe0483a}),pcb,{y:1.5,z:.06,ol:1.1});
const coilG=new THREE.Group(); coilG.position.y=-4.25; inside.add(coilG); for(let i=0;i<6;i++) add(new THREE.TorusGeometry(.38,.045,6,24),M({map:T.copper}),coilG,{y:i*.07,rx:Math.PI/2,ol:0});
const base=add(new THREE.CylinderGeometry(1.0,1.15,.5,32),M({color:0xdfe5ee}),root,{y:-4.95}); const baseGlow=add(new THREE.TorusGeometry(.7,.05,6,32),M({color:0x7fe3ff,emissive:0x3fb0ff}),root,{y:-4.68,rx:Math.PI/2,ol:0});
// dentes
const teeth=new THREE.Group(); teeth.position.set(0,3.85,.95); root.add(teeth); teeth.visible=false;
add(new THREE.BoxGeometry(3.2,.5,.6),M({color:0xff8fa0}),teeth,{y:-.75});
for(let i=0;i<6;i++) add(new THREE.BoxGeometry(.42,.9,.42),M({color:0xfffaf0}),teeth,{x:-1.25+i*.5,y:-.15,ol:1.06});

// ---- pessoa (de frente) a escovar + caneca de café
const PX0=50, P=new THREE.Group(); P.position.set(PX0,0,0); S.add(P);
const skinP=M({color:0xe2b48c});
add(new THREE.SphereGeometry(1.3,32,24),skinP,P,{sc:[1,1.1,1]});
add(new THREE.SphereGeometry(1.36,32,24,0,Math.PI*2,0,Math.PI*.42),M({color:0x4a2a12}),P,{sc:[1,1.1,1],ol:1.02});
for(const sx of [-1,1]){ add(new THREE.SphereGeometry(.2,12,10),M({color:0xffffff}),P,{x:sx*.45,y:.35,z:1.12,ol:1.08}); add(new THREE.SphereGeometry(.1,10,8),M({color:0x2a1a10}),P,{x:sx*.45,y:.35,z:1.3,ol:0}); add(new THREE.SphereGeometry(.28,10,8),skinP,P,{x:sx*1.3,y:.05,sc:[.4,1,.7]}); add(new THREE.BoxGeometry(.4,.07,.05),M({color:0x3a2010}),P,{x:sx*.45,y:.65,z:1.2,rz:sx*.15,ol:0}); }
add(new THREE.SphereGeometry(.16,10,8),skinP,P,{y:.02,z:1.4});
add(new THREE.SphereGeometry(.42,20,14),M({color:0x5a1424}),P,{y:-.5,z:1.02,sc:[1.3,.7,.5],ol:1.04});
const tMatsP=[]; for(let i=0;i<6;i++){ const m=M({color:0xfffaf0}); tMatsP.push(m); add(new THREE.BoxGeometry(.13,.14,.08),m,P,{x:-.34+i*.135,y:-.36,z:1.22,ol:1.1}); }
for(let i=0;i<6;i++){ add(new THREE.BoxGeometry(.13,.12,.08),tMatsP[i],P,{x:-.34+i*.135,y:-.66,z:1.18,ol:1.1}); }
add(new THREE.TorusGeometry(.42,.06,8,24),M({color:0xd9626e}),P,{y:-.5,z:1.08,sc:[1.3,.75,1],ol:0});
add(new THREE.ConeGeometry(1.8,1.6,24,1,true),M({color:0x2e6fd0,side:THREE.DoubleSide}),P,{y:-2.1});
const brush2=root.clone(true); brush2.scale.setScalar(.32); brush2.rotation.set(0,0,Math.PI/2); P.add(brush2);
const hand=add(new THREE.CapsuleGeometry(.22,.5,6,12),skinP,P,{rz:Math.PI/2});
const mug=new THREE.Group(); P.add(mug); add(new THREE.CylinderGeometry(.32,.28,.7,20),M({color:0xffffff}),mug,{}); add(new THREE.TorusGeometry(.18,.05,6,16),M({color:0xffffff}),mug,{x:.36,ry:0}); add(new THREE.CylinderGeometry(.29,.29,.05,20),M({color:0x5a3214}),mug,{y:.3,ol:0});
const cWhite=new THREE.Color(0xfffaf0), cYel=new THREE.Color(0xd9b84a);
const hairs=[], strand={visible:false,position:new THREE.Vector3(),rotation:new THREE.Euler()};
const bubbles=[]; for(let i=0;i<30;i++) bubbles.push(add(new THREE.SphereGeometry(.06+.03*(i%3),8,6),M({color:0xffffff,transparent:true,opacity:.8}),root,{ol:0}));

// ---- 2D: fundos pixel + HUD
function barbearia(t){ ctx.fillStyle='#3fa39a'; ctx.fillRect(0,0,w,h); for(let x=0;x<w;x+=24){ctx.fillStyle='#38938b';ctx.fillRect(x,0,12,h*.62);}
  ctx.fillStyle='#8a6a3a'; ctx.fillRect(30,150,w-60,290); ctx.fillStyle='#bfe8e2'; ctx.fillRect(38,158,w-76,274); ctx.fillStyle='#d8f4f0'; for(let i=0;i<6;i++) ctx.fillRect(60+i*8,170+i*22,60,3);
  for(let i=0;i<7;i++){ const x=48+i*44; ctx.fillStyle='#ffe9a8'; ctx.fillRect(x-5,136,10,10); ctx.fillStyle='rgba(255,233,168,.25)'; ctx.fillRect(x-9,132,18,18); }
  ctx.fillStyle='#e8e2d2'; ctx.fillRect(0,h*.62,w,h); for(let x=0;x<w;x+=20){ for(let y=h*.62;y<h;y+=20){ ctx.fillStyle=((x+y)/20)%2?'#ddd5c0':'#ece6d6'; ctx.fillRect(x,y,20,20);} }
  ctx.fillStyle='#e0483a'; ctx.fillRect(w-26,160,10,120); for(let y=160;y<280;y+=12){ctx.fillStyle='#fff';ctx.fillRect(w-26,y+((t*20)%12),10,4);} }
function blueprint(t){ ctx.fillStyle='#1b2340'; ctx.fillRect(0,0,w,h); ctx.fillStyle='#232d52'; for(let x=0;x<w;x+=16) ctx.fillRect(x,0,1,h); for(let y=0;y<h;y+=16) ctx.fillRect(0,y,w,1);
  ctx.fillStyle='#2c3866'; for(let x=0;x<w;x+=64) ctx.fillRect(x,0,1,h); for(let y=0;y<h;y+=64) ctx.fillRect(0,y,w,1); }
// dither Bayer 4x4 + quantização (6 níveis por canal) → cara de pixel-art
const BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function dither(){ const im=ctx.getImageData(0,0,w,h), d=im.data, L=5;
  for(let y=0;y<h;y++) for(let x=0;x<w;x++){ const i=(y*w+x)*4, th=(BY[(y&3)*4+(x&3)]/16-.5)*(255/L);
    for(let c=0;c<3;c++){ const v=d[i+c]+th; d[i+c]=Math.max(0,Math.min(255,Math.round(v/(255/L))*(255/L))); } }
  ctx.putImageData(im,0,0); }
function box(x,y,wd,ht,fill,stroke='#0a0a1a'){ ctx.fillStyle=stroke; ctx.fillRect(x-1,y-1,wd+2,ht+2); ctx.fillStyle=fill; ctx.fillRect(x,y,wd,ht); }
function txt(s,x,y,sz,col,al='left'){ ctx.font='900 '+sz+'px M'; ctx.textAlign=al; ctx.fillStyle=col; ctx.fillText(s,x,y); ctx.textAlign='left'; }
function hud(t,sl){ const real=sl<1.05, lab=real?'VELOCIDADE REAL':(Math.round(sl)+'x MAIS DEVAGAR'); ctx.font='900 12px M'; const tw=ctx.measureText(lab).width;
  box(10,124,tw+12,18,real?'#e0483a':'#2e86d0'); for(let x=12;x<tw+20;x+=6){ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(x,126,3,14);} txt(lab,16,138,12,'#fff');
  // mostrador
  const cx=232, cy=140; ctx.fillStyle='#0a0a1a'; ctx.beginPath(); ctx.arc(cx,cy,17,Math.PI,0); ctx.fill(); ctx.fillStyle='#fffaf0'; ctx.beginPath(); ctx.arc(cx,cy,15,Math.PI,0); ctx.fill();
  for(let k=0;k<=8;k++){ const a=Math.PI+k*Math.PI/8; ctx.fillStyle=k>5?'#e0483a':'#0a0a1a'; ctx.fillRect(cx+Math.cos(a)*12|0,cy+Math.sin(a)*12|0,2,2); }
  const fr=clamp(Math.log2(7200/sl+1)/13,0,1), a=Math.PI+fr*Math.PI; ctx.strokeStyle='#e0483a'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*11,cy+Math.sin(a)*11); ctx.stroke();
  box(258,124,92,18,'#0a0a1a','#ffd21f'); txt('RPM',263,138,11,'#ffd21f'); txt(String(Math.round(7200/sl)),345,138,12,'#fff','right');
  for(let i=0;i<10;i++){ ctx.fillStyle=i<Math.round(fr*10)?(i>6?'#e0483a':'#ffd21f'):'#2a2a44'; ctx.fillRect(262+i*8,145,6,3); } }
function card(t,t0,n,title,sub){ if(t<t0) return; const k=ease((t-t0)/.25); ctx.save(); ctx.translate(w/2,172); ctx.scale(k,k); ctx.font='900 16px M'; const tw=Math.max(ctx.measureText(title).width, sub?ctx.measureText(sub).width*0.7:0)+28;
  box(-tw/2,-14,tw,sub?40:28,'#fffaf0'); ctx.fillStyle='#e0483a'; for(let x=-tw/2+2;x<tw/2-2;x+=6){ ctx.fillRect(x,-12,3,1); ctx.fillRect(x,(sub?24:12),3,1); }
  txt(title,0,5,16,'#0a0a1a','center'); if(sub) txt(sub,0,20,10,'#e0483a','center');
  if(n){ ctx.fillStyle='#0a0a1a'; ctx.fillRect(-tw/2-9,-21,18,18); ctx.fillStyle='#e0483a'; ctx.fillRect(-tw/2-8,-20,16,16); txt(String(n),-tw/2,-7,12,'#fff','center'); } ctx.restore(); }
function label(obj,s,dx,dy){ const v=new THREE.Vector3(); obj.getWorldPosition(v); v.project(cam); const x=(v.x*.5+.5)*w|0, y=(-v.y*.5+.5)*h|0;
  ctx.fillStyle='#ffd21f'; const ex=x+dx, ey=y+dy; for(let i=0;i<=20;i++){ ctx.fillRect(x+(ex-x)*i/20|0,y+(ey-y)*i/20|0,1,1); } ctx.fillRect(x-1,y-1,3,3);
  ctx.font='900 10px M'; const tw=ctx.measureText(s).width; const bx=dx>0?ex:ex-tw-8; box(bx,ey-7,tw+8,14,'#ffd21f'); txt(s,bx+4,ey+4,10,'#0a0a1a'); }
function setShell(o){ [bodyM,gripM,swM,ledM,bandM].forEach(m=>m.opacity=o); shell.traverse(m=>{ if(m.material===OUT) m.visible=o>.6; }); }
const E={slow:2.6, vai:4.4, c1:6.2, c2:11.2, c3:15.6, tudo:20.0, cafe:22.6, rampa:24.4, real:28.8, pop:31.2, end:32.8};
function sp(t){ if(t<E.slow) return 1; if(t<E.slow+.7) return 1+63*ease((t-E.slow)/.7); if(t<E.tudo+2.6) return 64; if(t<E.cafe) return 64; if(t<E.rampa) return 1; if(t<E.real){ const st=[32,8,2,1]; const k=Math.min(3,Math.floor((t-E.rampa)/1.1)); return st[k]; } return 1; }
function hud2(t,sl){ const real=sl<1.05, lab=real?'VELOCIDADE REAL':(sl>=64?'64x MAIS DEVAGAR':Math.round(sl)+'x MAIS DEVAGAR'); ctx.font='900 12px M'; const tw=ctx.measureText(lab).width;
  box(10,124,tw+12,18,real?'#e0483a':'#2e86d0'); for(let x=12;x<tw+20;x+=6){ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(x,126,3,14);} txt(lab,16,138,12,'#fff');
  const v=Math.round(7680/sl); box(232,124,118,18,'#0a0a1a','#ffd21f'); txt('MOV/MIN',237,137,9,'#ffd21f'); txt(String(v),345,138,12,'#fff','right');
  const fr=clamp(Math.log2(v)/13,0,1); for(let i=0;i<10;i++){ ctx.fillStyle=i<Math.round(fr*10)?(i>6?'#e0483a':'#ffd21f'):'#2a2a44'; ctx.fillRect(236+i*11,145,9,3); } }
function gauge(t,v){ const cx=60, cy=232; box(18,196,92,64,'#fffaf0'); ctx.fillStyle='#0a0a1a'; ctx.beginPath(); ctx.arc(cx,cy,26,Math.PI,0); ctx.fill(); ctx.fillStyle='#e8f6ff'; ctx.beginPath(); ctx.arc(cx,cy,24,Math.PI,0); ctx.fill();
  [4,16,32,64,128].forEach((n,i)=>{ const a=Math.PI+i/4*Math.PI; txt(String(n),cx+Math.cos(a)*17,cy+Math.sin(a)*17+3,6,i>3?'#e0483a':'#0a0a1a','center'); });
  const a=Math.PI+clamp(Math.log2(v/4)/5,0,1)*Math.PI; ctx.strokeStyle='#e0483a'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a)*20,cy+Math.sin(a)*20); ctx.stroke();
  box(26,240,76,14,'#2e86d0'); txt(v+' POR SEGUNDO',64,251,8,'#fff','center'); }
function bgP(t){ const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'#2b2160'); g.addColorStop(.55,'#3d2f7a'); g.addColorStop(1,'#231a4d'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(255,255,255,.045)'; const o=(t*10)%24; for(let i=-h;i<w+h;i+=24){ ctx.beginPath(); ctx.moveTo(i+o,0); ctx.lineTo(i+o+12,0); ctx.lineTo(i+o+12-h*.7,h); ctx.lineTo(i+o-h*.7,h); ctx.fill(); }
  ctx.fillStyle='#ffd27a'; for(let i=0;i<26;i++){ ctx.globalAlpha=.25+.25*Math.sin(t*2+i); ctx.fillRect((i*53)%w,(i*97+((t*5)|0))%h,1,1); } ctx.globalAlpha=1; }
const toothMats=[]; teeth.children.forEach((m,i)=>{ if(i>0&&m.material){ m.material=m.material.clone(); toothMats.push(m.material);} });
const cDirty=new THREE.Color(0x8a5a2a), cClean=new THREE.Color(0xfffaf0);
window.F_=function(t){
  const sl=sp(t), ph=t*128*Math.PI/sl; // 128 idas/voltas por segundo reais
  const osc=Math.sin(ph); headSpin.rotation.z=osc*.55; shaft.rotation.y=osc*.55; lever.rotation.y=osc*.55;
  const wa=ph; wheel.rotation.y=wa; pinion.rotation.y=-wa*2.6; arm.rotation.y=wa*2.6;
  root.position.x=sl<1.5?Math.sin(t*97)*.02:0;
  const shots=[0,E.slow*.75,E.vai,E.c1,8.6,E.c2,13.4,E.c3,17.8,E.tudo,E.cafe,E.rampa,E.real,E.pop]; let s0=0; shots.forEach(x=>{ if(t>=x) s0=x; }); const since=t-s0, whip=Math.max(0,1-since/.18);
  let cut=0,a=0,rad=12,cy=2,ly=1,lx=0; teeth.visible=false; headG.position.set(0,3.85,.12); headG.rotation.set(0,0,0); baseGlow.visible=false;
  const personShot=(t<E.slow*.75)||(t>=E.cafe&&t<E.pop);
  P.visible=personShot; root.visible=!personShot; mug.visible=t>=E.cafe&&t<E.rampa+.3;
  if(personShot){ // pessoa
    let bx=.2*Math.sin(t*(t<E.slow?5:3)), by=0, vib=(sl<1.5?Math.sin(t*97)*.02:0);
    if(t>=E.cafe&&t<E.rampa){ bx=3; } // escova fora durante o café
    if(t>=E.rampa&&t<E.real){ const u=(t-E.rampa)/(E.real-E.rampa); bx=-.45+(.9*((u*3)%1>.5?2-(u*3%1)*2:(u*3%1)*2)); }
    const mx=bx, my=-.5+by+vib; brush2.position.set(mx+1.34,my,1.25); hand.position.set(mx+2.0,my-.05,1.3);
    if(t>=E.cafe&&t<E.rampa){ const u=clamp((t-E.cafe)/1.2,0,1), back=clamp((t-E.cafe-1.3)/.4,0,1); mug.position.set(1.2-u*.5+back*.6,-1.1+u*.55-back*.5,1.6); mug.rotation.z=u*1.1-back*1.1; }
    const yel=clamp((t-E.cafe-.9)/.6,0,1); tMatsP.forEach((m,i)=>{ const clean=t>=E.rampa?clamp((t-E.rampa-.5-i*.55)/.5,0,1):0; m.color.copy(cWhite).lerp(cYel,yel*(1-clean)); if(t<E.cafe) m.color.copy(cWhite); });
    a=.15*Math.sin(t*.7); cam.position.set(PX0+Math.sin(a)*7.6,.2,Math.cos(a)*7.6); cam.lookAt(PX0,.05,0); rad=-1;
  } else
  if(t<E.slow){ a=-.5+t*.15; rad=27; cy=4.5; ly=1.3; }
  else if(t<E.c1){ const u=ease((t-E.slow)/.6); a=-.2+(t-E.slow)*.06; rad=27-u*22.5; cy=4.5-u*.1; ly=1.3+u*2.2; }
  else if(t<E.c2){ cut=ease((t-E.c1)/.5); a=t<8.6?.6+(t-E.c1)*.08:-.7+(t-8.6)*.08; rad=t<8.6?5.2:3.6; cy=t<8.6?.6:.4; ly=t<8.6?-.4:-.7; lx=.5; }
  else if(t<E.c3){ cut=1; a=t<13.4?1.45+(t-E.c2)*.08:-1.5+(t-13.4)*.08; rad=t<13.4?4.6:3.6; cy=-1.2; ly=-1.9; lx=.35; }
  else if(t<E.tudo){ cut=1; baseGlow.visible=t>=17.8; a=t<17.8?.8+(t-E.c3)*.06:-.6+(t-17.8)*.08; rad=t<17.8?5.6:5.0; cy=t<17.8?-.6:-3.2; ly=t<17.8?-1.6:-3.9; }
  else if(t<E.cafe){ cut=1; a=-.4+(t-E.tudo)*.3; rad=17; cy=1.5; ly=-.6; }
  else { const u=t-E.pop; headG.position.y=3.85+u*2.2-u*u*1.2; headG.rotation.set(u*4,u*6,0); a=.2; rad=9; cy=4.5; ly=3.6; }
  setShell(1-.88*cut); inside.visible=cut>.03; pcb.visible=t>=E.c3;
  toothMats.forEach((m,i)=>{ const c=clamp((t-E.rampa-.4-i*.55)/.5,0,1); m.color.copy(cDirty).lerp(cClean,c); });
  if(rad>0){ a+=whip*.35*Math.sin(since*60); rad*=1+whip*.12; }
  if(rad>0){ cam.position.set(Math.sin(a)*rad,cy,Math.cos(a)*rad); cam.lookAt(lx,ly,0); }
  bubbles.forEach((b,i)=>{ const p=((t*(sl<1.5?1.2:.05)+i/30)%1); b.position.set(Math.cos(i*2.1)*(.4+p*1.6),3.85+Math.sin(i*1.3)*.5+p*1.2,.5+p*.8); b.visible=(t<E.slow||t>=E.rampa)&&p<.9; b.material.opacity=.8*(1-p); });
  bgP(t); R.render(S,cam); ctx.drawImage(R.domElement,0,0,w,h); dither(); hud2(t,sl);
  if(t<E.slow) card(t,.05,0,'ESCOVA ELÉTRICA','128 MOVIMENTOS POR SEGUNDO');
  else if(t<E.c1){ if(t<E.vai) card(t,E.slow+.4,0,'ELA NÃO GIRA...',''); else card(t,E.vai,0,'VAI E VOLTA!','±30° CADA VEZ'); label(headSpin,'CABEÇA',62,-30); }
  else if(t<E.c2){ card(t,E.c1,1,'O QUE FAZ BALANÇAR?',''); if(cut>.6){ label(shaft,'EIXO',-60,-60); label(lever,'ALAVANCA',-62,6); if(t>=7.4) label(wpin,'PINO',58,-26); if(t>=8.6) label(wheel,'RODA DENTADA',56,20); if(t>=9.6) label(pinion,'ENGRENAGEM DO MOTOR',-20,52); } }
  else if(t<E.c3){ card(t,E.c2,2,'DENTRO DO MOTOR',''); label(motor.children[1],'ÍMÃS',-62,0); label(arm,'BOBINAS',58,-14); if(t>=13.4) label(ring,'ANEL',58,-36); }
  else if(t<E.tudo){ card(t,E.c3,3,'QUEM DÁ ENERGIA?',''); label(sw,'BOTÃO',60,-20); label(batt,'PILHA 1,2V',58,10); if(t>=17.8){ label(coilG,'BOBINA DE CARGA',40,-40); label(base,'BASE (SEM FIO!)',-40,46); } }
  else if(t<E.cafe){ card(t,E.tudo,0,'TUDO JUNTO',''); label(arm,'MOTOR',58,0); label(wheel,'ENGRENAGENS',58,-24); label(batt,'PILHA',-56,0); label(headSpin,'CABEÇA',-56,-20); }
  else if(t<E.rampa){ card(t,E.cafe,0,'E DEPOIS DO CAFÉ?',''); if(t>E.cafe+1.1) card(t,E.cafe+1.1,0,'DENTES AMARELOS!',''); }
  else if(t<E.real){ gauge(t,Math.round(128/sl)); card(t,E.rampa,0,'BRANQUINHOS DE NOVO',''); }
  else if(t<E.pop) card(t,E.real,0,'ESCOVA ELÉTRICA','128 MOVIMENTOS POR SEGUNDO');
  else { const k=ease((t-E.pop)/.15); ctx.save(); ctx.translate(250,190); ctx.rotate(-.2); ctx.scale(k,k); txt('POP!',0,0,30,'#0a0a1a','center'); txt('POP!',-2,-2,30,'#ffd21f','center'); ctx.restore(); }
  if(whip>0){ ctx.fillStyle='rgba(255,255,255,'+(whip*.35)+')'; ctx.fillRect(0,0,w,h); }
};

</script></body></html>`;
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2], N=+process.argv[3]||180, step=+process.argv[4]||1; fs.mkdirSync(out,{recursive:true});
for(let i=+process.argv[5]||0;i<N;i+=step){await p.evaluate(t=>window.F_(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
