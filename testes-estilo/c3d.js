// Teste C — 3D PREMIUM: mão orgânica (SDF + marching cubes), luz de estúdio, sombra no fundo,
// raios de luz, bokeh, pó, grão, legendas palavra a palavra.  node c3d.js <outdir> <frames> [step]
const {chromium}=require('playwright');const fs=require('fs');
const three=fs.readFileSync(__dirname+'/node_modules/three/build/three.cjs','utf8');
const mc=fs.readFileSync(__dirname+'/mc.js','utf8');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const W=1080,H=1920;
const page=`<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font});font-weight:900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#0b0a2a}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse 75% 50% at 52% 50%,#6a4bd6 0%,#2e2580 42%,#0d0b30 78%,#07061c 100%)}
#rays,#dust{position:absolute;inset:0}
.bk{position:absolute;border-radius:50%;mix-blend-mode:screen}
canvas#c{position:absolute;inset:0;filter:contrast(1.05) saturate(1.12)}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,transparent 52%,rgba(0,0,0,.6) 100%)}
#grain{position:absolute;inset:0;opacity:.09;mix-blend-mode:overlay}
#hook{position:absolute;left:40px;top:150px;width:1000px;height:200px;border-radius:28px;background:#ffd21f;border:10px solid #0a1633;box-sizing:border-box;box-shadow:0 14px 0 rgba(0,0,0,.25);font-family:M;font-weight:900;text-align:center;line-height:1}
#hook div:first-child{font-size:66px;color:#0a1633;margin-top:28px}#hook div:last-child{font-size:66px;color:#e0483a;margin-top:12px}
#cap{position:absolute;left:0;right:0;top:1400px;text-align:center;font-family:M;font-weight:900;font-size:84px;line-height:1.15}
#cap span{display:inline-block;margin:0 10px;color:#fff;-webkit-text-stroke:16px #0a1633;paint-order:stroke fill}
#cap span.on{color:#0a1633;-webkit-text-stroke:0;background:#ffd21f;border-radius:18px;padding:0 18px;box-shadow:0 8px 0 #0a1633}
#cap span.y{color:#ffd21f}
#stamp{position:absolute;left:540px;top:1170px;font-family:M;font-weight:900;font-size:120px;color:#e0483a;background:#fff;border:12px solid #e0483a;border-radius:26px;padding:10px 40px;white-space:nowrap;box-shadow:0 14px 0 rgba(0,0,0,.3)}
</style></head><body>
<div id=bg></div><svg id=rays width=${W} height=${H}></svg><div id=bks></div><canvas id=c width=${W} height=${H}></canvas><svg id=dust width=${W} height=${H}></svg><div id=vig></div><canvas id=grain width=${W} height=${H}></canvas>
<div id=hook><div>DOBRA SÓ A PONTA</div><div>DO MINDINHO</div></div>
<div id=stamp style="display:none">NÃO DÁ!</div><div id=cap></div>
<script>window.THREE=(function(){var module={exports:{}},exports=module.exports;${three};return module.exports;})();</script>
<script>${mc}</script>
<script>
const THREE=window.THREE;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ease=x=>1-Math.pow(1-clamp(x,0,1),3), mix=(a,b,k)=>a+(b-a)*k;
const R=new THREE.WebGLRenderer({canvas:document.getElementById('c'),antialias:true,alpha:true,preserveDrawingBuffer:true});
R.setPixelRatio(1);R.setSize(${W},${H},false);R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;R.outputColorSpace=THREE.SRGBColorSpace;
const S=new THREE.Scene(), cam=new THREE.PerspectiveCamera(30,${W}/${H},.1,100);
S.add(new THREE.HemisphereLight(0xb9a8ff,0x2a1440,.6));
const key=new THREE.DirectionalLight(0xffe2c0,4.4);key.position.set(-4,6,6);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.radius=8;key.shadow.bias=-.0005;key.shadow.normalBias=.02;
Object.assign(key.shadow.camera,{left:-4,right:4,top:5,bottom:-5,near:.5,far:30});S.add(key);
const rim=new THREE.DirectionalLight(0x8fe3ff,5.2);rim.position.set(5,3,-5);S.add(rim);
const rim2=new THREE.DirectionalLight(0xff6fb0,2.6);rim2.position.set(-6,1,-4);S.add(rim2);
const bounce=new THREE.PointLight(0xff9a6a,6,8,2);bounce.position.set(.5,-1.5,2.5);S.add(bounce);
const skin=new THREE.MeshPhysicalMaterial({color:0xf2a984,roughness:.46,sheen:1,sheenRoughness:.35,sheenColor:new THREE.Color(0xff8a70),clearcoat:.2,clearcoatRoughness:.45,emissive:0x5a1408,emissiveIntensity:.32});
const nailM=new THREE.MeshPhysicalMaterial({color:0xf2b3a4,roughness:.32,clearcoat:.6,clearcoatRoughness:.2});
// fundo que recebe sombra (dá profundidade)
const back=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.32}));back.position.set(0,0,-2.2);back.receiveShadow=true;S.add(back);
const hand=new THREE.Group();S.add(hand);
// ---------- SDF da mão ----------
const E=2.95, C=new THREE.Vector3(0,0,.15), RES=176;
const MC=new MarchingCubes(RES,skin,false,false,400000);MC.isolation=0;MC.scale.setScalar(E);MC.position.copy(C);MC.castShadow=true;MC.receiveShadow=true;hand.add(MC);
function smin(a,b,k){const h=clamp(.5+.5*(b-a)/k,0,1);return mix(b,a,h)-k*h*(1-h);}
function sdCap(px,py,pz,a,b,ra,rb){const bx=b[0]-a[0],by=b[1]-a[1],bz=b[2]-a[2],qx=px-a[0],qy=py-a[1],qz=pz-a[2];const h=clamp((qx*bx+qy*by+qz*bz)/(bx*bx+by*by+bz*bz),0,1);const dx=qx-bx*h,dy=qy-by*h,dz=qz-bz*h;return Math.sqrt(dx*dx+dy*dy+dz*dz)-mix(ra,rb,h);}
function sdPalm(px,py,pz){ // caixa arredondada, mais estreita no pulso e mais fina em baixo
  const yy=py-.1, f=1-.17*clamp((.8-yy)/1.6,0,1), x=px/f, z=(pz-.0)/(1-.18*clamp((.8-yy)/1.6,0,1));
  const r=.27, qx=Math.abs(x)-(.8-r), qy=Math.abs(yy)-(.78-r), qz=Math.abs(z)-(.27-r);
  const ox=Math.max(qx,0),oy=Math.max(qy,0),oz=Math.max(qz,0);return (Math.sqrt(ox*ox+oy*oy+oz*oz)+Math.min(Math.max(qx,qy,qz),0)-r)*f;}
// dedos: [x,y,z,splay, L[3], r]
const FD={idx:[-.58,.82,0,.08,[.72,.46,.36],.19],mid:[-.19,.88,0,.02,[.8,.5,.38],.2],ring:[.21,.85,0,-.05,[.74,.47,.36],.19],pink:[.58,.74,0,-.14,[.58,.38,.31],.165]};
let ANG={idx:[0,0,0],mid:[0,0,0],ring:[0,0,0],pink:[0,0,0]};
function fk(name){const [x,y,z,s,L,r]=FD[name],A=ANG[name];const dx0=-Math.sin(s),dy0=Math.cos(s);let a=0,p=[x,y,z];const P=[p.slice()],D=[];
  for(let i=0;i<3;i++){a+=A[i];const d=[dx0*Math.cos(a),dy0*Math.cos(a),Math.sin(a)];D.push({d,n:[-dx0*Math.sin(a),-dy0*Math.sin(a),Math.cos(a)]});p=[p[0]+d[0]*L[i],p[1]+d[1]*L[i],p[2]+d[2]*L[i]];P.push(p.slice());}
  return {P,D,r};}
const TH=[[-.62,-.38,.12],[-.98,.02,.3],[-1.17,.36,.42],[-1.27,.62,.47]];
let PR=[];
function buildPrims(){PR=[];for(const n of ['idx','mid','ring','pink']){const f=fk(n);for(let i=0;i<3;i++){const r0=f.r*(1-i*.07),r1=f.r*(1-(i+1)*.07)*(i===2?.92:1);PR.push({a:f.P[i],b:f.P[i+1],ra:r0,rb:r1,k:.035});}
   // nó dos dedos (costas) — pequena saliência
   PR.push({a:[f.P[0][0],f.P[0][1]-.05,f.P[0][2]-.12],b:[f.P[0][0],f.P[0][1]+.05,f.P[0][2]-.12],ra:f.r*.85,rb:f.r*.8,k:.12});}
  for(let i=0;i<3;i++)PR.push({a:TH[i],b:TH[i+1],ra:[.24,.21,.19][i],rb:[.21,.19,.17][i],k:.05});
  PR.push({a:[-.5,-.1,.05],b:[-.35,-.55,.08],ra:.32,rb:.3,k:.15}); // eminência tenar
  PR.push({a:[.45,-.1,.05],b:[.45,-.5,.06],ra:.24,rb:.24,k:.15});  // hipotenar
  PR.push({a:[0,-.75,0],b:[0,-3.4,-.02],ra:.47,rb:.55,k:.2});      // antebraço
}
function sdf(x,y,z){let d=sdPalm(x,y,z);for(const p of PR){d=smin(d,sdCap(x,y,z,p.a,p.b,p.ra,p.rb),p.k);}return d;}
function fill(){const n=RES,F=MC.field,h=n/2;
  for(let k=0;k<n;k++){const z=C.z+(k-h)/h*E;for(let j=0;j<n;j++){const y=C.y+(j-h)/h*E;const off=k*n*n+j*n;
    if(y<-2.9||y>2.9||z<-.8||z>1.25){for(let i=0;i<n;i++)F[off+i]=-1;continue;}
    for(let i=0;i<n;i++){const x=C.x+(i-h)/h*E;F[off+i]=(x<-1.7||x>1.3)?-1:-sdf(x,y,z);}}}
  MC.update();}
// unhas
const nails={};for(const n of ['idx','mid','ring','pink','th']){const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,16),nailM);m.castShadow=true;hand.add(m);nails[n]=m;}
function placeNails(){const up=new THREE.Vector3(),nn=new THREE.Vector3(),side=new THREE.Vector3(),M=new THREE.Matrix4();
  for(const n of ['idx','mid','ring','pink']){const f=fk(n),L=FD[n][4][2],r=f.r*.86;const d=f.D[2].d,nr=f.D[2].n;
    up.set(...d);nn.set(...nr);side.crossVectors(up,nn);M.makeBasis(side,up,nn);
    const m=nails[n];m.quaternion.setFromRotationMatrix(M);m.scale.set(r*.78,r*1.15,r*.28);
    m.position.set(f.P[2][0]+d[0]*L*.6-nr[0]*r*.86,f.P[2][1]+d[1]*L*.6-nr[1]*r*.86,f.P[2][2]+d[2]*L*.6-nr[2]*r*.86);}
  const a=TH[2],b=TH[3];up.set(b[0]-a[0],b[1]-a[1],b[2]-a[2]).normalize();nn.set(.55,0,1).normalize();side.crossVectors(up,nn);nn.crossVectors(side,up);M.makeBasis(side,up,nn);
  const m=nails.th;m.quaternion.setFromRotationMatrix(M);m.scale.set(.14,.19,.05);m.position.set(b[0]-nn.x*.12-up.x*.06,b[1]-nn.y*.12-up.y*.06,b[2]-nn.z*.12-up.z*.06);}
// anéis vermelhos nas articulações
const ringsG=[];for(let i=0;i<2;i++){const g=new THREE.Mesh(new THREE.TorusGeometry(.25,.035,16,64),new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:0}));hand.add(g);ringsG.push(g);
  const h=new THREE.Mesh(new THREE.TorusGeometry(.25,.09,16,64),new THREE.MeshBasicMaterial({color:0xff3030,transparent:true,opacity:0,depthWrite:false}));hand.add(h);ringsG.push(h);}
function pose(t){const cyc=(t%1.7)/1.7,k=cyc<.55?ease(cyc/.55):(cyc<.8?1:1-ease((cyc-.8)/.2)),d=Math.PI/180,tr=Math.sin(t*47)*.035*k;
  ANG.pink=[6*d*k,38*d*k+Math.sin(t*31)*.02*k,58*d*k+tr];ANG.ring=[5*d*k,26*d*k,20*d*k];ANG.mid=[0,10*d*k,7*d*k];ANG.idx=[0,0,0];return k;}
// ---------- fundo: raios, bokeh, pó, grão ----------
const bks=document.getElementById('bks');const BK=[];for(let i=0;i<16;i++){const el=document.createElement('div');el.className='bk';const s=50+(i*37)%130;const c=['#ffd21f','#7fe3ff','#ff7ab8','#b9a2ff'][i%4];
  Object.assign(el.style,{width:s+'px',height:s+'px',background:'radial-gradient(circle,'+c+' 0%,'+c+' 45%,transparent 72%)',opacity:.22+(i%3)*.1,filter:'blur('+(6+(i%4)*5)+'px)'});bks.appendChild(el);BK.push({el,x:(i*211)%1080,y:(i*367)%1920,s:.3+(i%5)*.15});}
const gc=document.getElementById('grain').getContext('2d'),gi=gc.createImageData(${W},${H});
function grain(seed){let s=seed*9301+49297;const a=gi.data;for(let i=0;i<a.length;i+=4){s=(s*1103515245+12345)&0x7fffffff;const v=(s>>16)&255;a[i]=a[i+1]=a[i+2]=v;a[i+3]=255;}gc.putImageData(gi,0,0);}
function rays(t){let o='<defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2d8" stop-opacity=".2"/><stop offset="1" stop-color="#fff2d8" stop-opacity="0"/></linearGradient><filter id="rb"><feGaussianBlur stdDeviation="14"/></filter></defs><g filter="url(#rb)" transform="translate(300 -200) rotate('+(-24+3*Math.sin(t*.5))+')">';
  for(let i=0;i<6;i++){const w=50+(i*37)%90,x=i*120-200;o+='<path d="M'+x+',0 L'+(x+w)+',0 L'+(x+w*3.2+180)+',2300 L'+(x+180)+',2300 Z" fill="url(#rg)" opacity="'+(.45+.55*Math.abs(Math.sin(t*.9+i*1.7)))+'"/>';}
  document.getElementById('rays').innerHTML=o+'</g>';}
function dust(t,pz){let o='';for(let i=0;i<55;i++){const z=(i%5)/4,x=((i*233)%1180-50)+Math.sin(t*.6+i)*25-pz*(40+80*z),y=((i*397)%1900+60-t*(8+z*22)+1920)%1920,r=1+z*3.5;
  o+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r.toFixed(1)+'" fill="#ffe7c2" opacity="'+(.18+z*.4)*(.6+.4*Math.sin(t*2+i))+'"'+(z>.7?' style="filter:blur(2px)"':'')+'/>';}
  document.getElementById('dust').innerHTML=o;}
const LINES=[{s:0,e:1.63,w:['DOBRA','SÓ','A','PONTA','DO','MINDINHO'],hl:[5]},{s:1.84,e:2.85,w:['SÓ','A','PONTINHA!'],hl:[2]},{s:3.08,e:4.7,w:['NÃO','DÁ','SEM','DOBRAR','O','RESTO,','NÉ?'],hl:[5]}];
function caption(t){const L=LINES.find(l=>t>=l.s&&t<l.e);const el=document.getElementById('cap');if(!L){el.innerHTML='';return;}
  const n=L.w.length,per=(L.e-L.s)/n,i=Math.min(n-1,Math.floor((t-L.s)/per)),b0=Math.floor(i/3)*3;let h='';
  for(let k=b0;k<Math.min(n,b0+3);k++){const cls=k===i?'on':(L.hl.includes(k)?'y':'');const sc=k===i?(1.12-.12*ease((t-L.s-i*per)/.12)):1;h+='<span class="'+cls+'" style="transform:scale('+sc.toFixed(3)+')">'+L.w[k]+'</span>';}
  el.innerHTML=h;}
window.F_=function(t){
  pose(t);buildPrims();fill();placeNails();
  const g=t>3.08?Math.min(1,(t-3.08)/.25)*(.55+.45*Math.sin(t*10)):0;
  const jp=[['pink',1],['ring',2]];jp.forEach(([n,j],q)=>{const f=fk(n),P=f.P[j],d=f.D[Math.min(2,j)].d;for(const m of [ringsG[q*2],ringsG[q*2+1]]){m.position.set(...P);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...d));m.scale.setScalar(f.r/.19);}
    ringsG[q*2].material.opacity=g;ringsG[q*2+1].material.opacity=g*.35;});
  const pz=ease(t/5), az=(60-24*pz)*Math.PI/180, el=(8+3*Math.sin(t*.8))*Math.PI/180, dist=12.4-1.1*pz, tgt=new THREE.Vector3(.1,1.0,0);
  cam.position.set(tgt.x+Math.sin(az)*Math.cos(el)*dist,tgt.y+Math.sin(el)*dist,tgt.z+Math.cos(az)*Math.cos(el)*dist);cam.lookAt(tgt);
  back.lookAt(cam.position.x,0,cam.position.z);back.position.set(-Math.sin(az)*2.2,0,-Math.cos(az)*2.2);
  hand.rotation.z=.04*Math.sin(t*1.3);hand.position.y=.03*Math.sin(t*2);
  R.render(S,cam);
  BK.forEach((b,i)=>{b.el.style.transform='translate('+(b.x+Math.sin(t*.5+i)*30*b.s-pz*140*b.s)+'px,'+(b.y-t*18*b.s)+'px)';});
  rays(t);dust(t,pz);grain(Math.floor(t*30));caption(t);
  const st=document.getElementById('stamp');if(t>=3.2){const x=clamp((t-3.2)/.16,0,1);st.style.display='block';st.style.transform='translate(-50%,0) rotate(-6deg) scale('+(1+1.6*(1-ease(x)))+')';}else st.style.display='none';
  return MC.count;
};
</script></body></html>`;
(async()=>{const b=await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:W,height:H}});p.on('console',m=>console.log('PAGE',m.text()));p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2],N=+process.argv[3]||150,step=+process.argv[4]||1;fs.mkdirSync(out,{recursive:true});
for(let i=0;i<N;i+=step){const c=await p.evaluate(t=>window.F_(t),i/30);if(i===0)console.log('tris',c/3);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
