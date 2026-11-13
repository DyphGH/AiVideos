// Teste B — mão 3D estilizada (Three.js) + legendas novas + grão. node b3d.js <outdir> <frames>
const {chromium}=require('playwright');const fs=require('fs');
const three=fs.readFileSync(__dirname+'/node_modules/three/build/three.cjs','utf8');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const W=1080,H=1920;
const page=`<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font});font-weight:900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#0b0a2a}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 45% at 50% 52%,#5a3fc0 0%,#2a2470 45%,#0b0a2a 100%)}
.bk{position:absolute;border-radius:50%;filter:blur(18px);mix-blend-mode:screen}
canvas{position:absolute;inset:0}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,.55) 100%);pointer-events:none}
#grain{position:absolute;inset:-50px;opacity:.10;mix-blend-mode:overlay;pointer-events:none}
#hook{position:absolute;left:40px;top:150px;width:1000px;height:200px;border-radius:28px;background:#ffd21f;border:10px solid #0a1633;box-sizing:border-box;box-shadow:0 14px 0 rgba(0,0,0,.25);font-family:M;font-weight:900;text-align:center;line-height:1}
#hook div:first-child{font-size:66px;color:#0a1633;margin-top:28px}#hook div:last-child{font-size:66px;color:#e0483a;margin-top:12px}
#cap{position:absolute;left:0;right:0;top:1400px;text-align:center;font-family:M;font-weight:900;font-size:84px;line-height:1.15}
#cap span{display:inline-block;margin:0 10px;color:#fff;-webkit-text-stroke:16px #0a1633;paint-order:stroke fill;transition:none}
#cap span.on{color:#0a1633;-webkit-text-stroke:0;background:#ffd21f;border-radius:18px;padding:0 18px;box-shadow:0 8px 0 #0a1633}
#cap span.y{color:#ffd21f}
#stamp{position:absolute;left:540px;top:1170px;font-family:M;font-weight:900;font-size:120px;color:#e0483a;background:#fff;border:12px solid #e0483a;border-radius:26px;padding:10px 40px;transform-origin:center;white-space:nowrap;box-shadow:0 14px 0 rgba(0,0,0,.3)}
</style></head><body>
<div id=bg></div><div id=bks></div><canvas id=c width=${W} height=${H}></canvas><div id=vig></div><canvas id=grain width=${W+100} height=${H+100}></canvas>
<div id=hook><div>DOBRA SÓ A PONTA</div><div>DO MINDINHO</div></div>
<div id=stamp style="display:none">NÃO DÁ!</div>
<div id=cap></div>
<script>window.THREE=(function(){var module={exports:{}},exports=module.exports;${three};return module.exports;})();</script>
<script>
const THREE=window.THREE;const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ease=x=>1-Math.pow(1-clamp(x,0,1),3);
const R=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true,alpha:true,preserveDrawingBuffer:true});
R.setPixelRatio(1);R.setSize(${W},${H},false);R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.outputColorSpace=THREE.SRGBColorSpace;
const S=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(30,${W}/${H},.1,100);
// luzes: chave quente, recorte frio, enchimento
S.add(new THREE.HemisphereLight(0xb7a8ff,0x2a1440,.55));
const key=new THREE.DirectionalLight(0xffe6c8,4.2);key.position.set(-4,6,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.radius=6;key.shadow.bias=-.0004;
Object.assign(key.shadow.camera,{left:-3,right:3,top:4,bottom:-4,near:.5,far:30});S.add(key);
const rim=new THREE.DirectionalLight(0x8fd8ff,4.0);rim.position.set(5,3,-5);S.add(rim);
const rim2=new THREE.DirectionalLight(0xff7ab8,2.0);rim2.position.set(-5,1,-4);S.add(rim2);
const skin=new THREE.MeshPhysicalMaterial({color:0xf4a07a,roughness:.48,sheen:.8,sheenRoughness:.4,sheenColor:new THREE.Color(0xff9a7a),clearcoat:.15,clearcoatRoughness:.5,emissive:0x5a1408,emissiveIntensity:.3});
const nailM=new THREE.MeshPhysicalMaterial({color:0xffd9d0,roughness:.2,clearcoat:1,clearcoatRoughness:.1});
const glowM=new THREE.MeshBasicMaterial({color:0xff3b3b,transparent:true,opacity:0});
function mesh(g,m){const o=new THREE.Mesh(g,m||skin);o.castShadow=true;o.receiveShadow=true;return o;}
const hand=new THREE.Group();S.add(hand);
// palma (elipsoide achatado) + antebraço
function rbox(w,h,d,r){const g=new THREE.BoxGeometry(w,h,d,24,24,12);const p=g.attributes.position,v=new THREE.Vector3(),c=new THREE.Vector3();
  for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);c.set(clamp(v.x,-w/2+r,w/2-r),clamp(v.y,-h/2+r,h/2-r),clamp(v.z,-d/2+r,d/2-r));const n=v.clone().sub(c);if(n.length()>1e-6)n.normalize().multiplyScalar(r);v.copy(c).add(n);p.setXYZ(i,v.x,v.y,v.z);}
  g.computeVertexNormals();return g;}
function taper(g,h,k){const p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),f=1-k*clamp((h/2-y)/h,0,1);p.setX(i,p.getX(i)*f);p.setZ(i,p.getZ(i)*(1-.15*clamp((h/2-y)/h,0,1)));}g.computeVertexNormals();return g;}
const palm=mesh(taper(rbox(1.62,1.6,.56,.26),1.6,.2));palm.position.set(0,.08,0);hand.add(palm);
const pad=mesh(new THREE.SphereGeometry(1,48,32));pad.scale.set(.42,.6,.24);pad.position.set(-.42,-.25,.06);hand.add(pad);

const arm=mesh(new THREE.CylinderGeometry(.5,.6,4,48,1,false));arm.position.set(0,-2.6,-.02);arm.scale.set(1,1,.72);hand.add(arm);
const wr=mesh(new THREE.SphereGeometry(1,48,32));wr.scale.set(.62,.35,.4);wr.position.set(0,-.62,0);hand.add(wr);
// dedo = cadeia de cápsulas. x = posição na palma (+x = mindinho)
const glows=[];
function dedo(x,y,z,L,r,splay){const root=new THREE.Group();root.position.set(x,y,z);root.rotation.z=splay;hand.add(root);
  const segs=[];let parent=root;
  for(let i=0;i<3;i++){const j=new THREE.Group();if(i>0)j.position.y=L[i-1];parent.add(j);
    const rr=r*(1-i*.07);const c=mesh(new THREE.CapsuleGeometry(rr,L[i]-rr*.6,12,32));c.position.y=L[i]/2;c.scale.z=.92;j.add(c);
    const k=mesh(new THREE.SphereGeometry(rr*.99,32,24));k.scale.z=.92;j.add(k);
    if(i>0){const g=new THREE.Mesh(new THREE.TorusGeometry(rr*1.35,rr*.16,16,48),glowM.clone());g.rotation.y=Math.PI/2;j.add(g);glows.push(g);}
    if(i===2){const n=mesh(new THREE.SphereGeometry(rr*.78,32,16),nailM);n.scale.set(.9,1.25,.35);n.position.set(0,L[i]*.62,-rr*.72);j.add(n);}
    segs.push(j);parent=j;}
  return segs;}
const F={
  idx:dedo(-.58,.8,0,[.72,.46,.36],.19,.08),
  mid:dedo(-.19,.86,0,[.8,.5,.38],.2,.02),
  ring:dedo(.21,.83,0,[.74,.47,.36],.19,-.05),
  pink:dedo(.58,.72,0,[.58,.38,.31],.165,-.14)};
// polegar
const th=new THREE.Group();th.position.set(-.7,-.3,.15);th.rotation.set(.2,-.5,.9);hand.add(th);
{let p=th;const L=[.55,.42,.34];for(let i=0;i<3;i++){const j=new THREE.Group();if(i>0)j.position.y=L[i-1];p.add(j);const rr=.2*(1-i*.08);const c=mesh(new THREE.CapsuleGeometry(rr,L[i]-rr*.6,12,32));c.position.y=L[i]/2;j.add(c);j.add(mesh(new THREE.SphereGeometry(rr*1.04,32,24)));if(i===2){const n=mesh(new THREE.SphereGeometry(rr*.78,32,16),nailM);n.scale.set(.9,1.25,.35);n.position.set(0,L[i]*.62,-rr*.72);j.add(n);}p=j;}}
hand.rotation.set(0,0,0);
// pose
function pose(t){const cyc=(t%1.7)/1.7,k=cyc<.55?ease(cyc/.55):(cyc<.8?1:1-ease((cyc-.8)/.2));
  const tr=Math.sin(t*47)*.035*k, d=Math.PI/180;
  const P=F.pink;P[0].rotation.x=6*d*k;P[1].rotation.x=36*d*k+Math.sin(t*31)*.02*k;P[2].rotation.x=55*d*k+tr;
  const Rg=F.ring;Rg[0].rotation.x=5*d*k;Rg[1].rotation.x=24*d*k;Rg[2].rotation.x=18*d*k;
  const M=F.mid;M[1].rotation.x=10*d*k;M[2].rotation.x=7*d*k;
  return k;}
// bokeh
const bks=document.getElementById('bks');const BK=[];for(let i=0;i<14;i++){const d=document.createElement('div');d.className='bk';const s=40+(i*37)%110;Object.assign(d.style,{width:s+'px',height:s+'px',background:['#ffd21f','#7fe3ff','#ff7ab8','#b9a2ff'][i%4],opacity:.3+(i%3)*.12});bks.appendChild(d);BK.push({d,x:(i*211)%1080,y:(i*367)%1920,s:.3+(i%5)*.15});}
// grão
const gc=document.getElementById('grain').getContext('2d');const gi=gc.createImageData(${W+100},${H+100});
function grain(seed){let s=seed*9301+49297;const a=gi.data;for(let i=0;i<a.length;i+=4){s=(s*1103515245+12345)&0x7fffffff;const v=(s>>16)&255;a[i]=a[i+1]=a[i+2]=v;a[i+3]=255;}gc.putImageData(gi,0,0);}
// legendas palavra a palavra
const LINES=[{s:0,e:1.63,w:['DOBRA','SÓ','A','PONTA','DO','MINDINHO'],hl:[5]},{s:1.84,e:2.85,w:['SÓ','A','PONTINHA!'],hl:[2]},{s:3.08,e:4.7,w:['NÃO','DÁ','SEM','DOBRAR','O','RESTO,','NÉ?'],hl:[5]}];
function caption(t){const L=LINES.find(l=>t>=l.s&&t<l.e);const el=document.getElementById('cap');if(!L){el.innerHTML='';return;}
  const n=L.w.length,per=(L.e-L.s)/n,i=Math.min(n-1,Math.floor((t-L.s)/per));
  // mostra blocos de até 3 palavras
  const b0=Math.floor(i/3)*3;let h='';for(let k=b0;k<Math.min(n,b0+3);k++){const cls=k===i?'on':(L.hl.includes(k)?'y':'');const sc=k===i?(1.12-.12*ease((t-L.s-i*per)/.12)):1;h+='<span class="'+cls+'" style="transform:scale('+sc.toFixed(3)+')">'+L.w[k]+'</span>';}
  el.innerHTML=h;}
window.F_=function(t){
  const k=pose(t);
  // brilho vermelho nas articulações que não deviam mexer (depois de "não dá")
  const g=t>3.08?Math.min(1,(t-3.08)/.25)*(0.55+.45*Math.sin(t*10)):0;
  glows.forEach((m,i)=>{m.material.opacity=(i===2||i===3)?0:g*.9;});
  // câmara orbital (3/4 do lado do mindinho → mais frontal) com leve respiração
  const az=(62-24*ease(t/5))*Math.PI/180, el=(8+3*Math.sin(t*.8))*Math.PI/180, dist=12.6-1.1*ease(t/5);
  const tgt=new THREE.Vector3(.1,1.0,0);
  cam.position.set(tgt.x+Math.sin(az)*Math.cos(el)*dist,tgt.y+Math.sin(el)*dist,tgt.z+Math.cos(az)*Math.cos(el)*dist);cam.lookAt(tgt);
  hand.rotation.z=.04*Math.sin(t*1.3);hand.position.y=.03*Math.sin(t*2);
  R.render(S,cam);
  BK.forEach((b,i)=>{b.d.style.transform='translate('+(b.x+Math.sin(t*.5+i)*30*b.s - az*180*b.s)+'px,'+(b.y-t*20*b.s)+'px)';});
  grain(Math.floor(t*30));caption(t);
  const st=document.getElementById('stamp');if(t>=3.2){const x=clamp((t-3.2)/.16,0,1);st.style.display='block';st.style.transform='translate(-50%,0) rotate(-6deg) scale('+(1+1.6*(1-ease(x)))+')';st.style.opacity=x<.05?0:1;}else st.style.display='none';
};
</script></body></html>`;
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}});p.on('console',m=>console.log('PAGE',m.text()));p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2], N=+process.argv[3]||150, step=+process.argv[4]||1; fs.mkdirSync(out,{recursive:true});
for(let i=0;i<N;i+=step){await p.evaluate(t=>window.F_(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
