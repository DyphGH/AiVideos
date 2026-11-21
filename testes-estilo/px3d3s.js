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
#cap{position:absolute;left:0;right:0;top:1400px;text-align:center;font-family:M;font-weight:900;font-size:84px;line-height:1.15}
#cap span{display:inline-block;margin:0 10px;color:#fff;-webkit-text-stroke:16px #0a1633;paint-order:stroke fill}
#cap span.on{color:#0a1633;-webkit-text-stroke:0;background:#ffd21f;border-radius:18px;padding:0 18px;box-shadow:0 8px 0 #0a1633}
#cap span.y{color:#ffd21f}
</style></head><body>
<canvas id=out width=${w} height=${h}></canvas>
<div id=hook><div>COMO FUNCIONA A</div><div>MÁQUINA DE CABELO?</div></div><div id=cap></div>
<script>window.THREE=(function(){var module={exports:{}},exports=module.exports;${three};return module.exports;})();</script>
<script>
const w=${w},h=${h}; const ease=x=>1-Math.pow(1-Math.max(0,Math.min(1,x)),3), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const out=document.getElementById('out'), ctx=out.getContext('2d',{willReadFrequently:true}); ctx.imageSmoothingEnabled=false;
const R=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true}); R.setSize(w,h,false); R.setPixelRatio(1);
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
// ---- corpo por torno (perfil afunilado) + aderência + LED + cabo
const prof=[[0,-3.4],[0.9,-3.35],[1.15,-3.1],[1.22,-2.4],[1.3,-1.0],[1.38,0.6],[1.42,1.8],[1.36,2.2],[1.2,2.35],[0,2.36]].map(p=>new THREE.Vector2(p[0],p[1]));
const shell=new THREE.Group(); root.add(shell);
const bodyM=M({map:T.plastic,transparent:true}); const body=add(new THREE.LatheGeometry(prof,40),bodyM,shell,{sc:[1,1,.62]});
const gripM=M({map:T.ribs,transparent:true}); add(new THREE.CylinderGeometry(1.25,1.18,1.6,40,1,true),gripM,shell,{y:-2.2,sc:[1.01,1,.63],ol:0});
const bandM=M({color:0xffd21f,transparent:true}); add(new THREE.CylinderGeometry(1.4,1.39,.28,40),bandM,shell,{y:.8,sc:[1,1,.63]});
const swM=M({color:0x23233a,transparent:true}); add(new THREE.BoxGeometry(.55,1.0,.25),swM,shell,{y:-.4,z:.82}); const knob=add(new THREE.BoxGeometry(.4,.35,.2),M({color:0xffffff,transparent:true}),shell,{y:-.15,z:.95,ol:1.08});
const ledM=M({color:0x5fe08a,emissive:0x2fd06a,transparent:true}); add(new THREE.SphereGeometry(.08,8,6),ledM,shell,{y:.35,z:.86,ol:0});
for(const sx of [-1,1]) add(new THREE.CylinderGeometry(.07,.07,.06,10),M({color:0x8f97a8,transparent:true}),shell,{x:sx*.75,y:1.6,z:.86,rx:Math.PI/2,ol:0});
const cable=add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0,-3.4,0),new THREE.Vector3(.2,-4.4,.3),new THREE.Vector3(1.4,-5.2,.8),new THREE.Vector3(2.8,-5.6,.4)]),24,.13,8),M({color:0x2a2a3a}),root,{ol:1.15});
// ---- cabeça: lâminas com dentes reais (extrusão)
function bladeShape(n,wd,toothH,toothW){ const s=new THREE.Shape(); s.moveTo(-wd/2,0); for(let i=0;i<n;i++){ const x=-wd/2+(i+.5)*wd/n; s.lineTo(x-toothW/2,0); s.lineTo(x-toothW*.35,toothH); s.quadraticCurveTo(x,toothH*1.08,x+toothW*.35,toothH); s.lineTo(x+toothW/2,0); } s.lineTo(wd/2,0); s.lineTo(wd/2,-.55); s.lineTo(-wd/2,-.55); s.closePath(); return s; }
const head=new THREE.Group(); head.position.y=2.45; root.add(head);
const bot=add(new THREE.ExtrudeGeometry(bladeShape(18,2.9,.62,.11),{depth:.14,bevelEnabled:true,bevelSize:.015,bevelThickness:.015,bevelSegments:1}),M({map:T.steel}),head,{z:-.12,ol:1.02});
add(new THREE.BoxGeometry(3.0,.35,.42),M({map:T.steel}),head,{y:-.62,z:-.06});
const topB=new THREE.Group(); topB.position.z=.06; head.add(topB);
add(new THREE.ExtrudeGeometry(bladeShape(16,2.5,.42,.1),{depth:.08,bevelEnabled:true,bevelSize:.01,bevelThickness:.01,bevelSegments:1}),M({map:T.gold}),topB,{y:-.02,ol:1.02});
for(const sx of [-.7,.7]){ const sc=add(new THREE.CylinderGeometry(.1,.1,.06,12),M({color:0xdfe5ee}),head,{x:sx,y:-.62,z:.18,rx:Math.PI/2,ol:1.1}); add(new THREE.BoxGeometry(.16,.03,.02),M({color:0x333344}),sc,{y:.04,ol:0}); }
// ---- interior
const inside=new THREE.Group(); root.add(inside);
const batt=add(new THREE.CylinderGeometry(.7,.7,1.7,24),M({map:T.batt}),inside,{y:-2.35}); add(new THREE.CylinderGeometry(.22,.22,.14,12),M({color:0xdfe5ee}),inside,{y:-1.44});
const pcb=add(new THREE.BoxGeometry(1.5,.9,.08),M({map:T.pcb}),inside,{y:-1.0,z:-.55}); for(let i=0;i<4;i++) add(new THREE.BoxGeometry(.18,.14,.08),M({color:0x1a1a22}),pcb,{x:-.5+i*.33,y:(i%2)*.25-.1,z:.07,ol:0});
for(const [c,dx] of [[0xe0483a,.3],[0x1a1a22,-.3]]) add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(dx*.6,-1.45,0),new THREE.Vector3(dx*2.5,-1.1,.5),new THREE.Vector3(dx*2.2,-.6,.6),new THREE.Vector3(dx*1.2,-.75,.3)]),16,.045,6),M({color:c}),inside,{ol:0});
const motor=new THREE.Group(); motor.position.y=-.1; inside.add(motor);
add(new THREE.CylinderGeometry(.85,.85,1.5,32,1,true),M({color:0x9aa6bb,side:THREE.DoubleSide,transparent:true,opacity:.55}),motor,{ol:0});
for(const [c,a] of [[0xe0483a,0],[0x2e86d0,Math.PI]]) add(new THREE.CylinderGeometry(.8,.8,1.3,24,1,true,a-1,2),M({color:c,side:THREE.DoubleSide}),motor,{ol:0});
const arm=new THREE.Group(); motor.add(arm);
add(new THREE.CylinderGeometry(.5,.5,1.1,6),M({map:T.copper}),arm,{ol:1.03});
add(new THREE.CylinderGeometry(.22,.22,.25,10),M({color:0xe6b84a}),arm,{y:-.7,ol:0});
const shaft=add(new THREE.CylinderGeometry(.06,.06,2.0,8),M({color:0xdfe5ee}),arm,{y:.55,ol:0});
add(new THREE.CylinderGeometry(.86,.86,.12,32),M({color:0x7a8498}),motor,{y:.78});
const disc=add(new THREE.CylinderGeometry(.42,.42,.12,28),M({color:0xffffff}),inside,{y:1.5});
const pin=add(new THREE.CylinderGeometry(.09,.09,.42,12),M({color:0xe0483a}),disc,{x:.22,y:.24});
const yoke=new THREE.Group(); yoke.position.y=1.95; inside.add(yoke);
add(new THREE.BoxGeometry(1.0,.9,.26),M({map:T.yoke}),yoke,{});
add(new THREE.BoxGeometry(.24,.62,.3),M({color:0x1b2340}),yoke,{y:-.12,ol:0});
add(new THREE.BoxGeometry(.6,.4,.22),M({map:T.yoke}),yoke,{y:.6});
// cabelos (fios) a cortar
const hairs=[]; for(let i=0;i<60;i++) hairs.push(add(new THREE.CylinderGeometry(.012,.012,.5,4),M({color:0x4a2a12}),S,{ol:0}));
const strand=add(new THREE.CylinderGeometry(.02,.02,1.6,6),M({color:0x4a2a12}),S,{ol:0});
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
function setShell(o){ [bodyM,gripM,bandM,swM,ledM].forEach(m=>m.opacity=o); knob.material.opacity=o; shell.traverse(m=>{ if(m.material===OUT) m.visible=o>.6; }); }
// ---- pessoa (cabeça vista de trás) + capa + cabelo com textura dinâmica (risca rapada)
const person=new THREE.Group(); S.add(person); person.position.set(0,0,0);
const skin=M({color:0xe2b48c});
const headM=add(new THREE.SphereGeometry(1,32,24),skin,person,{sc:[.95,1.08,1]});
for(const sx of [-1,1]) add(new THREE.SphereGeometry(.22,12,10),skin,person,{x:sx*.95,y:.05,z:-.05,sc:[.5,1,.8]});
add(new THREE.CylinderGeometry(.45,.5,.7,20),skin,person,{y:-1.15});
const capeT=tex((g,s)=>{ for(let x=0;x<s;x++){ g.fillStyle=(x>>2)%2?'#ffffff':'#2e5fb0'; g.fillRect(x,0,1,s);} },32,[6,1]);
add(new THREE.ConeGeometry(2.6,2.6,32,1,true),M({map:capeT,side:THREE.DoubleSide}),person,{y:-2.6});
const hc=document.createElement('canvas'); hc.width=128; hc.height=64; const hg=hc.getContext('2d');
function hairPaint(cutY){ hg.fillStyle='#5a3214'; hg.fillRect(0,0,128,64); for(let i=0;i<500;i++){ hg.fillStyle=['#4a2810','#6a3f1c','#3e2008'][i%3]; hg.fillRect((i*37)%128,(i*53)%64,1,2); }
  // risca rapada: centrada em u=.25 (parte de trás virada para +z), do fundo (y=64) até cutY
  hg.fillStyle='#c9946a'; hg.fillRect(22,cutY,20,64-cutY); for(let i=0;i<80;i++){ hg.fillStyle='#8a5a38'; hg.fillRect(22+(i*7)%20,cutY+((i*13)%Math.max(1,64-cutY)),1,1); } hairT.needsUpdate=true; }
const hairT=new THREE.CanvasTexture(hc); hairT.magFilter=hairT.minFilter=THREE.NearestFilter; hairT.colorSpace=THREE.SRGBColorSpace;
add(new THREE.SphereGeometry(1.06,32,24,0,Math.PI*2,0,Math.PI*.62),M({map:hairT}),person,{sc:[.95,1.08,1],ol:1.02});
// pente de plástico (acessório)
const guard=new THREE.Group(); head.add(guard); guard.visible=false;
add(new THREE.BoxGeometry(3.1,.5,.18),M({color:0x2a2a3a}),guard,{y:-.4,z:.55});
for(let i=0;i<13;i++){ add(new THREE.BoxGeometry(.1,.12,1.3),M({color:0x2a2a3a}),guard,{x:-1.44+i*.24,y:.7,z:.15,rx:-.5,ol:1.12}); }
const gnum=add(new THREE.CircleGeometry(.28,16),M({color:0xffd21f}),guard,{y:-.4,z:.65,ol:0});
// ---- legendas DOM
const LINES=[{s:0,e:2.6,w:['ESSA','MÁQUINA','DÁ','240','CORTES','POR','SEGUNDO.'],hl:[3,4]},{s:2.66,e:4.2,w:['OLHA','EM','CÂMERA','LENTA!'],hl:[2,3]},
{s:4.44,e:5.1,w:['SÃO','DUAS','LÂMINAS.'],hl:[1,2]},{s:5.2,e:6.6,w:['A','DE','BAIXO','FICA','PARADA...'],hl:[2,4]},{s:6.73,e:8.75,w:['E','A','DE','CIMA','DESLIZA','POR','CIMA','DELA.'],hl:[3,4]},
{s:8.83,e:11.15,w:['CADA','DENTINHO','FUNCIONA','COMO','UMA','TESOURA.'],hl:[1,5]},{s:11.27,e:12.7,w:['MAS','QUEM','MEXE','A','LÂMINA?'],hl:[1,2]},
{s:12.79,e:14.85,w:['UM','MOTORZINHO','GIRA','UM','PINO','TORTO,'],hl:[1,4,5]},{s:14.94,e:15.6,w:['FORA','DO','CENTRO.'],hl:[2]},
{s:15.7,e:18.4,w:['O','PINO','EMPURRA','UM','GARFO','DE','UM','LADO','PRO','OUTRO...'],hl:[1,4]},{s:18.45,e:20.4,w:['E','O','GARFO','ARRASTA','A','LÂMINA.'],hl:[2,5]},
{s:20.55,e:22.3,w:['SETE','MIL','E','DUZENTAS','VOLTAS','POR','MINUTO.'],hl:[0,1,3]},{s:22.39,e:23.7,w:['CADA','VOLTA,','DOIS','CORTES!'],hl:[2,3]},
{s:23.79,e:25.1,w:['E','O','PENTE','DE','PLÁSTICO?'],hl:[2]},{s:25.22,e:27.1,w:['SÓ','ESCOLHE','O','TAMANHO','DO','CABELO.'],hl:[3]},
{s:27.2,e:29.5,w:['COMENTA:','QUAL','NÚMERO','VOCÊ','USA?'],hl:[0,2]}];
function caption(t){ const L=LINES.find(l=>t>=l.s&&t<l.e), el=document.getElementById('cap'); if(!L){el.innerHTML='';return;}
  const n=L.w.length,wt=L.w.map(x=>x.length+2),tot=wt.reduce((a,b)=>a+b,0); let acc=0,i=0,ws=L.s; for(;i<n;i++){ if(t<L.s+(acc+wt[i])/tot*(L.e-L.s)){ ws=L.s+acc/tot*(L.e-L.s); break;} acc+=wt[i]; } i=Math.min(n-1,i);
  const b0=Math.floor(i/3)*3; let hh=''; for(let k=b0;k<Math.min(n,b0+3);k++){ const cls=k===i?'on':(L.hl.includes(k)?'y':''); const sc=k===i?(1.12-.12*ease((t-ws)/.12)):1; hh+='<span class="'+cls+'" style="transform:scale('+sc.toFixed(3)+')">'+L.w[k]+'</span>'; } el.innerHTML=hh; }
const Q={lenta:2.66,lam:4.44,fixa:5.2,desl:6.73,tes:8.83,quem:11.27,motor:12.79,fora:14.94,garfo:15.7,arr:18.45,rpm:20.55,dois:22.39,pente:23.79,so:25.22,fim:27.2,bt:27.94};
function chain(k){ const C=['BATERIA','MOTOR','PINO','GARFO','LÂMINA']; ctx.font='900 9px M'; let x=8; C.forEach((c,i)=>{ const tw=ctx.measureText(c).width+8; box(x,598,tw,13,i<=k?'#ffd21f':'#2a2a44'); txt(c,x+4,608,9,i<=k?'#0a0a1a':'#8890aa'); x+=tw+2; if(i<4){ txt('›',x+1,608,10,'#fff'); x+=9; } }); }
function speed(t){ if(t<Q.lenta) return 1; if(t<Q.lenta+.6) return 1+255*ease((t-Q.lenta)/.6); if(t<Q.rpm) return 256; if(t<Q.pente){ const u=clamp((t-Q.rpm)/2.6,0,1); return Math.pow(2,8*(1-u)); } return 1; }
let lastCut=-1;
window.F_=function(t){
  const sl=speed(t), ph=t*120*2*Math.PI/sl;
  disc.rotation.y=ph; arm.rotation.y=ph; const off=.22*Math.cos(ph); yoke.position.x=off; topB.position.x=off*.9;
  const onHead=t<Q.lam||t>=Q.pente; person.visible=onHead;
  let cut=0, a=0, rad=10, cy=2, ly=1, lx=0, rel=null;
  // tremor de câmara + "whip" nos cortes
  const shots=[0,1.3,Q.lenta,Q.lam,Q.desl,Q.tes,Q.quem,Q.motor,Q.fora,Q.garfo,Q.arr,Q.rpm,Q.dois,Q.pente,Q.so,Q.fim]; let s0=0; shots.forEach(x=>{ if(t>=x) s0=x; }); const since=t-s0, whip=Math.max(0,1-since/.18);
  guard.visible=t>=Q.pente+.4;
  if(onHead){ // máquina na nuca
    root.scale.setScalar(.24); const prog=t<Q.lam?clamp(t/4.4,0,1):clamp((t-Q.pente-.6)/2.4,0,.7);
    const th=(118-60*(t<Q.lam?((t*.45)%1)*.0+prog:prog))*Math.PI/180;
    const P=new THREE.Vector3(0,Math.cos(th)*1.08*1.08,Math.sin(th)*1.08), T3=new THREE.Vector3(0,Math.sin(th),-Math.cos(th)), N=new THREE.Vector3(0,Math.cos(th),Math.sin(th));
    root.rotation.set(th-Math.PI/2,0,0); root.position.copy(P).addScaledVector(T3,-3.15*.24).addScaledVector(N,.12);
    if(sl<1.5) root.position.x+=Math.sin(t*97)*.006;
    const cutY=Math.round(64-clamp((118-th*180/Math.PI)/62,0,1)*40); if(cutY!==lastCut){ hairPaint(cutY); lastCut=cutY; }
    const C=root.position;
    if(t<1.3){ a=.12*Math.sin(t); rad=6.8; cy=1.0; ly=.0; }
    else if(t<Q.lam){ a=.55+(t-1.3)*.04; rel=[P.x,P.y,P.z,3.0,.7]; }
    else if(t<Q.so){ a=-.5+(t-Q.pente)*.05; rel=[P.x,P.y,P.z,3.2,.8]; } else { a=.15*Math.sin(t*.8); rad=7.2; cy=.9; ly=-.1; }
    setShell(1); inside.visible=false;
  } else { root.scale.setScalar(1); root.rotation.set(0,0,0); root.position.set(0,0,0);
    if(t<Q.tes){ a=(t<Q.desl?-.45:.45)+(t-Q.lam)*.04; rad=6.2; cy=4.0; ly=3.0; setShell(1); inside.visible=false; }
    else if(t<Q.quem){ a=.08*Math.sin(t*2); rad=3.6; cy=3.5; ly=2.9; setShell(1); inside.visible=false; }
    else if(t<Q.motor){ const u=ease((t-Q.quem)/1.2); a=-.2+u*1.2; rad=8+u*12; cy=3-u*.5; ly=2.4-u*1.6; cut=u; }
    else if(t<Q.fora){ a=.9+(t-Q.motor)*.15; rad=19; cy=2.4; ly=.6; cut=1; }
    else if(t<Q.garfo){ const u=ease((t-Q.fora)/.4); a=.9-u*.6; rad=19-u*13; cy=2.4+u*1.8; ly=.6+u*.95; cut=1; }
    else if(t<Q.rpm){ const u=ease((t-Q.garfo)/.4); a=.3+(t-Q.garfo)*.08; rad=6.5+(t>=Q.arr?ease((t-Q.arr)/.4)*1.5:0); cy=5.0; ly=(t>=Q.arr?1.9+ease((t-Q.arr)/.4)*.5:1.85); cut=1; }
    else { a=(t-Q.rpm)*.9; rad=14; cy=3.4; ly=1.0; cut=1; }
    setShell(1-.88*cut); inside.visible=cut>.03; }
  a+=whip*.35*Math.sin(since*60); rad*=1+whip*.15;
  if(rel){ const [x0,y0,z0,d,up]=rel; cam.position.set(x0+Math.sin(a)*d,y0+up,z0+Math.cos(a)*d); cam.lookAt(x0,y0,z0); } else { cam.position.set(Math.sin(a)*rad,cy,Math.cos(a)*rad); cam.lookAt(lx,ly,0); }
  // cabelos a voar
  const tip=new THREE.Vector3(); head.getWorldPosition(tip);
  hairs.forEach((m,i)=>{ const p=((t*(sl<1.5?1.6:.03)+i/60)%1); const sc=onHead?.3:.35; m.scale.setScalar(sc); m.position.set(tip.x+Math.cos(i*2.3)*(.1+p*2.2)*sc, tip.y+(p*2-p*p*3.2)*sc, tip.z+(Math.sin(i*1.7)*.6+.4+p)*sc); m.rotation.set(i+p*7,i*.7,p*5); m.visible=(onHead||(t>=Q.lam&&t<Q.quem)) && p<.95; });
  strand.visible=t>=Q.tes&&t<Q.quem; const cyc=((t-Q.tes)%1.2)/1.2; strand.position.set(.13,3.05+(cyc>.55?(cyc-.55)*1.4:0),.25); strand.rotation.z=cyc>.55?(cyc-.55)*1.2:0;
  if(onHead) barbearia(t); else blueprint(t);
  R.render(S,cam); ctx.drawImage(R.domElement,0,0); dither();
  hud(t,sl);
  // cartões e etiquetas em português
  if(t<Q.lam){ card(t,.05,0,'240 CORTES/S','7200 VOLTAS POR MINUTO'); }
  else if(t<Q.tes){ card(t,Q.lam,1,'DUAS LÂMINAS','UMA FICA, A OUTRA DESLIZA'); if(t>=Q.fixa) label(bot,'FIXA',-62,40); if(t>=Q.desl) label(topB,'DESLIZA ↔',50,-46); }
  else if(t<Q.quem){ card(t,Q.tes,2,'CADA DENTE = TESOURA',''); label(strand,'FIO DE CABELO',56,-30); }
  else if(t<Q.motor){ card(t,Q.quem,0,'QUEM MEXE A LÂMINA?',''); }
  else if(t<Q.garfo){ card(t,Q.motor,3,'UM MOTORZINHO','GIRA UM PINO FORA DO CENTRO'); label(batt,'BATERIA',-60,0); label(pcb,'PLACA',58,6); label(arm,'MOTOR',62,-8); if(t>=Q.fora){ label(pin,'PINO TORTO',-64,-20); } }
  else if(t<Q.rpm){ card(t,Q.garfo,4,'O PINO EMPURRA O GARFO','E O GARFO ARRASTA A LÂMINA'); label(yoke,'GARFO',58,10); label(pin,'PINO',-56,30); if(t>=Q.arr) label(topB,'LÂMINA',58,-30); chain(t<Q.arr?Math.min(3,Math.floor((t-Q.garfo)/.7)):4); }
  else if(t<Q.pente){ if(t<Q.dois) card(t,Q.rpm,5,'7200 VOLTAS POR MINUTO',''); else card(t,Q.dois,5,'1 VOLTA = 2 CORTES','120 VOLTAS/S × 2 = 240 CORTES/S'); chain(4); }
  else if(t<Q.fim){ if(t<Q.so) card(t,Q.pente,6,'E O PENTE?',''); else card(t,Q.so,6,'SÓ ESCOLHE O TAMANHO','Nº1 3MM · Nº2 6MM · Nº3 10MM · Nº4 13MM'); if(guard.visible) label(guard,'PENTE Nº 2',60,-20); }
  else { card(t,Q.fim,0,'QUAL NÚMERO VOCÊ USA?',''); if(t>=Q.bt){ for(let i=0;i<4;i++){ const k=ease((t-Q.bt-i*.08)/.2), x=60+i*80, y=228+Math.sin(t*6+i)*3; ctx.save(); ctx.translate(x,y); ctx.scale(k,k); box(-30,-24,60,48,['#e0483a','#ff8a1f','#ffd21f','#2fa860'][i]); txt(String(i+1),0,12,34,'#0a0a1a','center'); ctx.restore(); } } }
  // flashes nas transições
  if(whip>0){ ctx.fillStyle='rgba(255,255,255,'+(whip*.35)+')'; ctx.fillRect(0,0,w,h); }
  if(!window.NOCAP) caption(t);
};

</script></body></html>`;
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>{window.NOCAP=1;});await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2], N=+process.argv[3]||180, step=+process.argv[4]||1; fs.mkdirSync(out,{recursive:true});
for(let i=+process.argv[5]||0;i<N;i+=step){await p.evaluate(t=>window.F_(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
