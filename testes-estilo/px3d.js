// Teste "nível engineeredwithin": 3D (Three.js) renderizado em baixa resolução + upscale nearest (pixel-art),
// toon shading + contornos, câmara a mexer, corte por dentro, HUD pixelizado. node px3d.js <outdir> <frames> [step] [start]
const {chromium}=require('playwright');const fs=require('fs');
const three=fs.readFileSync(__dirname+'/node_modules/three/build/three.cjs','utf8');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const W=1080,H=1920,PX=4,w=W/PX,h=H/PX;
const page=`<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font});font-weight:900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#000}
canvas#out{position:absolute;inset:0;width:${W}px;height:${H}px;image-rendering:pixelated}
#hook{position:absolute;left:40px;top:150px;width:1000px;height:200px;border-radius:28px;background:#ffd21f;border:10px solid #0a1633;box-sizing:border-box;box-shadow:0 14px 0 rgba(0,0,0,.25);font-family:M;font-weight:900;text-align:center;line-height:1}
#hook div:first-child{font-size:66px;color:#0a1633;margin-top:28px}#hook div:last-child{font-size:66px;color:#e0483a;margin-top:12px}
</style></head><body>
<canvas id=out width=${w} height=${h}></canvas>
<div id=hook><div>COMO FUNCIONA A</div><div>MÁQUINA DE CABELO?</div></div>
<script>window.THREE=(function(){var module={exports:{}},exports=module.exports;${three};return module.exports;})();</script>
<script>
const w=${w},h=${h};
const out=document.getElementById('out'), ctx=out.getContext('2d'); ctx.imageSmoothingEnabled=false;
const R=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true}); R.setSize(w,h,false); R.setPixelRatio(1);
const S=new THREE.Scene(), cam=new THREE.PerspectiveCamera(32,w/h,.1,100);
S.add(new THREE.HemisphereLight(0xfff0e0,0x3a2a6a,1.1)); const key=new THREE.DirectionalLight(0xffffff,2.2); key.position.set(4,6,5); S.add(key); const rim=new THREE.DirectionalLight(0x7fe3ff,1.4); rim.position.set(-5,2,-4); S.add(rim);
const grad=new THREE.DataTexture(new Uint8Array([70,70,70,255, 150,150,150,255, 255,255,255,255]),3,1); grad.needsUpdate=true; grad.minFilter=grad.magFilter=THREE.NearestFilter;
const M=(c,o={})=>new THREE.MeshToonMaterial(Object.assign({color:c,gradientMap:grad},o));
const OUT=new THREE.MeshBasicMaterial({color:0x0a0a1a,side:THREE.BackSide});
function add(geo,mat,par,{x=0,y=0,z=0,rx=0,ry=0,rz=0,ol=1.06}={}){ const m=new THREE.Mesh(geo,mat); m.position.set(x,y,z); m.rotation.set(rx,ry,rz); par.add(m);
  if(ol){ const o=new THREE.Mesh(geo,OUT); o.scale.setScalar(ol); m.add(o); m.userData.ol=o; } return m; }
const root=new THREE.Group(); S.add(root);
// corpo (casca) — fica transparente no corte
const bodyMat=M(0xe0483a,{transparent:true,opacity:1});
const body=add(new THREE.CapsuleGeometry(1.35,3.6,8,24),bodyMat,root,{y:-.4}); body.scale.set(1,1,.62);
const band=add(new THREE.CylinderGeometry(1.37,1.37,.35,24),M(0xffd21f,{transparent:true}),root,{y:.6}); band.scale.set(1,1,.62);
const sw=add(new THREE.BoxGeometry(.5,.9,.2),M(0x2a2a3a,{transparent:true}),root,{y:-.6,z:.85});
// lâminas
const head=new THREE.Group(); head.position.y=2.55; root.add(head);
add(new THREE.BoxGeometry(3.0,.55,.5),M(0xc9ced8),head,{});
for(let i=0;i<15;i++) add(new THREE.BoxGeometry(.1,.55,.12),M(0xdfe5ee),head,{x:-1.4+i*.2,y:.5,z:-.06,ol:1.15});
const topB=new THREE.Group(); topB.position.z=.2; head.add(topB);
add(new THREE.BoxGeometry(2.6,.4,.1),M(0xe6b84a),topB,{y:.05});
for(let i=0;i<14;i++) add(new THREE.BoxGeometry(.09,.35,.1),M(0xffd36a),topB,{x:-1.3+i*.2,y:.38,ol:1.15});
// interior: bateria, motor, veio, disco + pino, garfo
const inside=new THREE.Group(); root.add(inside);
add(new THREE.CylinderGeometry(.75,.75,1.7,20),M(0x5fe08a),inside,{y:-2.2});
add(new THREE.CylinderGeometry(.25,.25,.15,12),M(0x3fa868),inside,{y:-1.28});
add(new THREE.CylinderGeometry(.8,.8,1.6,20),M(0x9aa6bb),inside,{y:-.1});
for(let i=0;i<5;i++) add(new THREE.TorusGeometry(.82,.07,6,24),M(0xc77a2a),inside,{y:-.7+i*.3,rx:Math.PI/2,ol:0});
add(new THREE.CylinderGeometry(.07,.07,.7,8),M(0xdfe5ee),inside,{y:1.05});
const disc=add(new THREE.CylinderGeometry(.45,.45,.12,24),M(0xffffff),inside,{y:1.45});
const pin=add(new THREE.CylinderGeometry(.09,.09,.45,10),M(0xe0483a),disc,{x:.22,y:.25});
const yoke=new THREE.Group(); yoke.position.y=1.95; inside.add(yoke);
add(new THREE.BoxGeometry(1.0,1.1,.28),M(0xf4f4f8),yoke,{});
add(new THREE.BoxGeometry(.24,.7,.3),M(0x1b2340),yoke,{y:-.18,ol:0});
add(new THREE.BoxGeometry(.5,.35,.25),M(0xf4f4f8),yoke,{y:.68});
// cabelos
const hairs=[]; for(let i=0;i<40;i++){ const m=add(new THREE.BoxGeometry(.03,.35,.03),M(0x5a3214),S,{ol:0}); hairs.push(m); }
function setOpacity(g,o){ g.traverse(m=>{ if(m.material&&m.material!==OUT&&m.material.transparent!==undefined){ m.material.transparent=true; m.material.opacity=o; } if(m.material===OUT) m.visible=o>.6; }); }
// fundo pixel (céu roxo + riscas) e HUD em baixa resolução
function bg(t){ const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'#2a1d5c'); g.addColorStop(.6,'#5a3a8a'); g.addColorStop(1,'#1a1238'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(255,255,255,.05)'; for(let i=-h;i<w;i+=14){ ctx.beginPath(); ctx.moveTo(i+(t*8%14),0); ctx.lineTo(i+(t*8%14)+h*.6,h); ctx.lineTo(i+(t*8%14)+h*.6+5,h); ctx.lineTo(i+(t*8%14)+5,0); ctx.fill(); }
  ctx.fillStyle='#ffd27a'; for(let i=0;i<30;i++){ ctx.globalAlpha=.3+.3*Math.sin(t*2+i); ctx.fillRect((i*37)%w,(i*91+((t*6)|0))%h,1,1); } ctx.globalAlpha=1; }
function pixText(txt,x,y,size,col,bgc,align='left'){ ctx.font='900 '+size+'px M'; const tw=ctx.measureText(txt).width; const bx=align==='center'?x-tw/2-4:x-4;
  if(bgc){ ctx.fillStyle='#0a0a1a'; ctx.fillRect(bx-1,y-size-1,tw+10,size+7); ctx.fillStyle=bgc; ctx.fillRect(bx,y-size,tw+8,size+5); }
  ctx.fillStyle=col; ctx.textAlign=align==='center'?'center':'left'; ctx.fillText(txt,align==='center'?x:x,y); ctx.textAlign='left'; }
function label(obj,txt,dx,dy){ const v=new THREE.Vector3(); obj.getWorldPosition(v); v.project(cam); const x=(v.x*.5+.5)*w, y=(-v.y*.5+.5)*h;
  ctx.strokeStyle='#ffd21f'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x|0,y|0); ctx.lineTo((x+dx)|0,(y+dy)|0); ctx.stroke(); ctx.fillStyle='#ffd21f'; ctx.fillRect((x|0)-1,(y|0)-1,3,3); pixText(txt,x+dx+(dx>0?2:-ctx.measureText(txt).width-12),y+dy+4,9,'#0a0a1a','#ffd21f'); }
const ease=x=>1-Math.pow(1-Math.max(0,Math.min(1,x)),3);
window.F_=function(t){
  // velocidade: real até 1.5s, rampa até 256x
  const sl=t<1.4?1:1+255*ease((t-1.4)/.7), rpm=Math.round(7200/sl);
  const ph=t*120*2*Math.PI/sl;
  disc.rotation.y=ph; const off=.22*Math.cos(ph); yoke.position.x=off; topB.position.x=off*.9;
  // vibração em tempo real
  const vib=sl<1.5?Math.sin(t*95)*.03:0; root.position.x=vib;
  // corte: casca fica transparente
  const cut=ease((t-1.6)/.7); [body,band,sw].forEach(m=>{ m.material.opacity=1-.85*cut; if(m.userData.ol) m.userData.ol.visible=cut<.5; });
  inside.visible=cut>0.05;
  // câmara: exterior em 3/4 → mergulha para dentro e orbita
  const a=-.6+t*.18+cut*.5, rad=17-cut*7.5, cy=.5+cut*1.1;
  cam.position.set(Math.sin(a)*rad, cy+3.2-cut*2.2, Math.cos(a)*rad); cam.lookAt(0,cy+1.9-cut*.9,0);
  // cabelos a voar
  hairs.forEach((m,i)=>{ const p=((t*(sl<1.5?1.6:.03)+i/40)%1); m.position.set(Math.cos(i*2.3)*(.4+p*3), 3.2+p*2.2-p*p*3, Math.sin(i*1.7)*.8+.5); m.rotation.set(i+p*6,i*.7,p*4); m.visible=p<.95; });
  bg(t); R.render(S,cam); ctx.drawImage(R.domElement,0,0);
  // HUD pixelizado
  const real=sl<1.05; pixText(real?'VELOCIDADE REAL':(Math.round(sl)+'x MAIS DEVAGAR'),10,104,11,'#fff',real?'#e0483a':'#2e86d0');
  pixText('RPM '+String(rpm).padStart(4,' '),190,104,11,'#ffd21f','#0a0a1a');
  if(cut>.6){ label(yoke,'GARFO',40,-20); label(pin,'PINO',-42,6); label(inside.children[2],'MOTOR',44,10); }
  if(t<1.4) pixText('240 CORTES/S',w/2,140,14,'#0a0a1a','#fffaf0','center');
};
</script></body></html>`;
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2], N=+process.argv[3]||150, step=+process.argv[4]||1; fs.mkdirSync(out,{recursive:true});
for(let i=+process.argv[5]||0;i<N;i+=step){await p.evaluate(t=>window.F_(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
