// Hit0Ms "aprox" #04 — FACA → MELANCIA em 3D realista (three.js).
// Uma faca de chef de aço polido (cabo de madeira com rebites) desce devagar sobre uma melancia cerosa em cima de uma tábua.
// No frame em que o gume toca a casca (0ms) aparece a palavra secreta gravada na casca. A seguir a faca atravessa, a melancia
// abre-se em duas metades (polpa, sementes), que tombam para os lados, com sumo a espirrar em gotas.
// Geometria analítica: o ponto mais baixo do gume está sempre por cima do topo da melancia (vértice exato do elipsoide),
// por isso no frame do 0ms o gume encosta mesmo no contorno e antes disso há sempre folga.
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export default (K)=>{const {c,W,H}=K;const PI=Math.PI;
const attempts=[
  {word:'SLICE', kind:'classic',rx:1.42,ry:1.0, rz:1.0, flesh:'red'},
  {word:'JUICY', kind:'yellow', rx:1.36,ry:0.97,rz:0.97,flesh:'yellow'},
  {word:'SPLIT', kind:'mini',   rx:0.9, ry:0.88,rz:0.88,flesh:'red'},
  {word:'LEGEND',kind:'gold',   rx:1.56,ry:1.09,rz:1.09,flesh:'red'}];
const D=0.95;   // distância que a faca desce até tocar
// ---------- renderer / cena ----------
const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(W,H,false);
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.0;R.outputColorSpace=THREE.SRGBColorSpace;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;scene.environmentIntensity=0.7;
{const cv=document.createElement('canvas');cv.width=8;cv.height=512;const g=cv.getContext('2d');const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#0c0f0b');gr.addColorStop(.5,'#1e2219');gr.addColorStop(1,'#070806');g.fillStyle=gr;g.fillRect(0,0,8,512);
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;scene.background=t;}
const CAMY=4.5,CAMZ=16.6,LOOKY=1.32;const cam=new THREE.PerspectiveCamera(28,W/H,0.1,100);cam.position.set(0,CAMY,CAMZ);cam.lookAt(0,LOOKY,0);
const key=new THREE.DirectionalLight(0xfff3e0,3.0);key.position.set(-4,8,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5});key.shadow.radius=4;key.shadow.bias=-0.0006;scene.add(key);
const rim=new THREE.DirectionalLight(0xbcd4ff,2.0);rim.position.set(5,4,-5);scene.add(rim);
const fill=new THREE.DirectionalLight(0xffd2a8,0.5);fill.position.set(3,1,7);scene.add(fill);
const rnd=(()=>{let s=7;return ()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};})();
function woodTex(base,dark,light,n,w=1024,h=512){const cv=document.createElement('canvas');cv.width=w;cv.height=h;const g=cv.getContext('2d');g.fillStyle=base;g.fillRect(0,0,w,h);
  for(let i=0;i<n;i++){const y0=rnd()*h,a=4+rnd()*14,f=0.002+rnd()*0.01,ph=rnd()*9;g.strokeStyle=rnd()<.6?dark:light;g.globalAlpha=0.08+rnd()*0.22;g.lineWidth=0.6+rnd()*2.6;g.beginPath();
    for(let x=0;x<=w;x+=8){const y=y0+Math.sin(x*f+ph)*a+Math.sin(x*f*3.1+ph*2)*a*.3;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}
  g.globalAlpha=1;const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
// bancada (pedra escura) + tábua de madeira
const counter=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshLambertMaterial({color:0x2a231c}));counter.rotation.x=-PI/2;counter.position.y=-0.34;counter.receiveShadow=true;scene.add(counter);
const rig=new THREE.Group();rig.rotation.y=0.62;scene.add(rig);   // melancia (eixo x do rig) e lâmina (plano x=0 do rig)
const board=new THREE.Mesh(new RoundedBoxGeometry(6.6,0.34,4.4,4,0.1),new THREE.MeshPhysicalMaterial({map:woodTex('#a8723f','#5c3417','#d9a36a',140),roughness:0.55,clearcoat:0.25,clearcoatRoughness:0.5}));
board.position.y=-0.17;board.receiveShadow=true;board.castShadow=true;rig.add(board);
// ---------- faca ----------
const L=2.75,HB=0.54,S0=0.40*L,TMAX=0.034;
const edgeY=s=>s<S0?0.07*((S0-s)/S0)**1.6:0.30*((s-S0)/(L-S0))**2.1;
const spineY=s=>s<0.62*L?HB:HB-(HB-edgeY(L))*((s-0.62*L)/(0.38*L))**1.9;
function bladeGeo(){const N=120,M=24,pos=[],uv=[],idx=[];const thick=(s,h)=>TMAX*(1-0.65*(s/L)**2)*Math.pow(Math.min(1,h/0.42),0.85);
  for(const sg of [1,-1])for(let i=0;i<=N;i++){const s=L*i/N,e=edgeY(s),sp=Math.max(e+1e-4,spineY(s));for(let j=0;j<=M;j++){const h=j/M,t=e+(sp-e)*h;pos.push(sg*thick(s,h)/2,t,S0-s);uv.push(s/L,t/HB);}}
  const NV=(N+1)*(M+1),id=(sd,i,j)=>sd*NV+i*(M+1)+j;
  for(let sd=0;sd<2;sd++)for(let i=0;i<N;i++)for(let j=0;j<M;j++){const a=id(sd,i,j),b=id(sd,i+1,j),cc=id(sd,i,j+1),d=id(sd,i+1,j+1);if(sd===0)idx.push(a,b,cc,b,d,cc);else idx.push(a,cc,b,b,cc,d);}
  for(let i=0;i<N;i++){const a=id(0,i,M),b=id(0,i+1,M),cc=id(1,i,M),d=id(1,i+1,M);idx.push(a,cc,b,b,cc,d);}           // lombo
  for(let j=0;j<M;j++){const a=id(0,0,j),b=id(0,0,j+1),cc=id(1,0,j),d=id(1,0,j+1);idx.push(a,b,cc,b,d,cc);}            // calcanhar
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;}
let brushed;{const cv=document.createElement('canvas');cv.width=1024;cv.height=256;const g=cv.getContext('2d');g.fillStyle='#3a3a3a';g.fillRect(0,0,1024,256);
  for(let i=0;i<900;i++){const y=rnd()*256;g.fillStyle=`rgba(${rnd()<.5?90:20},${rnd()<.5?90:20},${rnd()<.5?90:20},${0.15+rnd()*0.3})`;g.fillRect(rnd()*1024-200,y,200+rnd()*600,0.6+rnd()*1.2);}
  brushed=new THREE.CanvasTexture(cv);}
const steel=new THREE.MeshPhysicalMaterial({color:0xe9edf2,metalness:1,roughness:0.06,roughnessMap:brushed,envMapIntensity:4.2,clearcoat:0.4,clearcoatRoughness:0.05,side:THREE.DoubleSide});
const knife=new THREE.Group();rig.add(knife);
const blade=new THREE.Mesh(bladeGeo(),steel);blade.castShadow=true;knife.add(blade);
const bol=new THREE.Mesh(new RoundedBoxGeometry(0.075,0.30,0.12,3,0.025),steel);bol.position.set(0,HB-0.15,S0+0.05);bol.castShadow=true;knife.add(bol);
const HL=1.2;const handle=new THREE.Mesh(new RoundedBoxGeometry(0.17,0.25,HL,5,0.07),new THREE.MeshPhysicalMaterial({map:woodTex('#4a2a17','#1e0f06','#7a4a2a',90,512,256),roughness:0.4,clearcoat:0.7,clearcoatRoughness:0.15}));
handle.position.set(0,HB-0.14,S0+0.11+HL/2);handle.castShadow=true;knife.add(handle);
for(const z of [0.24,0.6,0.95]){const rv=new THREE.Mesh(new THREE.CylinderGeometry(0.032,0.032,0.176,20),steel);rv.rotation.z=PI/2;rv.position.set(0,HB-0.14,S0+0.11+z);knife.add(rv);}
// ---------- melancia ----------
function rindTex(kind,word){const cv=document.createElement('canvas');cv.width=2048;cv.height=1024;const g=cv.getContext('2d');
  const P={classic:{base:'#86b64a',dark:'#1f4a19',mid:'#4f7f2c',n:16,wd:62},yellow:{base:'#9cc55a',dark:'#2a5a1e',mid:'#5d8c35',n:22,wd:38},mini:{base:'#3c6a2a',dark:'#173512',mid:'#2b5420',n:18,wd:58},gold:{base:'#f2c14a',dark:'#9a6412',mid:'#d29a26',n:16,wd:58}}[kind];
  g.fillStyle=P.base;g.fillRect(0,0,2048,1024);
  let s=kind.length*131;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  for(let i=0;i<3000;i++){g.fillStyle=r()<.5?P.mid:P.base;g.globalAlpha=0.12+r()*0.25;g.beginPath();g.ellipse(r()*2048,r()*1024,4+r()*20,2+r()*10,r()*3,0,PI*2);g.fill();}
  g.globalAlpha=1;
  for(let k=0;k<P.n;k++){const x0=k/P.n*2048+r()*20;const pts=[],pts2=[];const ph=r()*9;
    for(let y=-10;y<=1034;y+=6){const env=Math.sin(Math.max(0,Math.min(1,y/1024))*PI)**0.35;const cx=x0+Math.sin(y*0.012+ph)*14+Math.sin(y*0.05+ph*2)*5;const w=P.wd*(0.55+0.45*env)*(0.8+0.4*r());
      pts.push([cx-w/2-r()*10,y]);pts2.push([cx+w/2+r()*10,y]);}
    for(const sh of [0,2048,-2048]){g.fillStyle=P.dark;g.globalAlpha=0.92;g.beginPath();pts.forEach(([x,y],q)=>q?g.lineTo(x+sh,y):g.moveTo(x+sh,y));for(let q=pts2.length-1;q>=0;q--)g.lineTo(pts2[q][0]+sh,pts2[q][1]);g.closePath();g.fill();
      g.globalAlpha=0.5;g.strokeStyle=P.mid;g.lineWidth=5;g.stroke();}}
  g.globalAlpha=1;
  for(let i=0;i<1600;i++){g.fillStyle=r()<.5?'rgba(255,255,230,0.10)':'rgba(0,20,0,0.10)';g.fillRect(r()*2048,r()*1024,1+r()*3,1+r()*3);}
  // mancha de campo (por baixo, u≈0)
  for(const x of [0,2048]){const gr=g.createRadialGradient(x,512,0,x,512,200);gr.addColorStop(0,kind==='gold'?'rgba(255,236,170,.9)':'rgba(226,214,120,.85)');gr.addColorStop(1,'rgba(226,214,120,0)');g.fillStyle=gr;g.fillRect(x-220,280,440,470);}
  if(word){const u=0.285;g.save();g.translate(u*2048,440);g.rotate(PI/2);g.textAlign='center';g.textBaseline='middle';g.font=`400 ${kind==='mini'?150:word.length>5?165:200}px Anton`;
    g.lineJoin='round';g.lineWidth=30;g.strokeStyle=kind==='gold'?'#3a1c02':'#0b1f08';g.strokeText(word,0,0);
    g.fillStyle=kind==='gold'?'#fff4c4':'#f4ffd6';g.fillText(word,0,0);g.lineWidth=3;g.strokeStyle=kind==='gold'?'#c98a12':'#a9d47a';g.strokeText(word,0,0);g.restore();}
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
let bumpT;{const cv=document.createElement('canvas');cv.width=1024;cv.height=512;const g=cv.getContext('2d');g.fillStyle='#808080';g.fillRect(0,0,1024,512);for(let i=0;i<14000;i++){const v=rnd()<.5?60:200;g.fillStyle=`rgba(${v},${v},${v},0.18)`;g.beginPath();g.arc(rnd()*1024,rnd()*512,0.5+rnd()*2.5,0,PI*2);g.fill();}bumpT=new THREE.CanvasTexture(cv);}
function fleshTex(flesh,outer,nseeds){const cv=document.createElement('canvas');cv.width=cv.height=1024;const g=cv.getContext('2d');const C=512;
  const red=flesh==='red'?['#ff3b52','#d81a33','#b00d24']:['#ffc000','#f0a000','#d87e00'];
  g.fillStyle=outer;g.fillRect(0,0,1024,1024);
  const ring=(r0,r1,c0,c1)=>{const gr=g.createRadialGradient(C,C,r0*C,C,C,r1*C);gr.addColorStop(0,c0);gr.addColorStop(1,c1);g.fillStyle=gr;g.beginPath();g.arc(C,C,r1*C,0,PI*2);g.fill();};
  ring(0.955,0.99,'#cfe3a6',outer);ring(0.88,0.955,'#f5f7dc','#dcebb8');ring(0.80,0.88,flesh==='red'?'#ff9aa4':'#fff0b0','#f8f6de');
  {const gr=g.createRadialGradient(C*0.9,C*0.85,0,C,C,0.8*C);gr.addColorStop(0,red[0]);gr.addColorStop(0.6,red[1]);gr.addColorStop(1,red[2]);g.fillStyle=gr;g.beginPath();g.arc(C,C,0.8*C,0,PI*2);g.fill();
   const gr2=g.createRadialGradient(C,C,0.7*C,C,C,0.82*C);gr2.addColorStop(0,'rgba(255,255,255,0)');gr2.addColorStop(1,flesh==='red'?'rgba(255,170,180,.8)':'rgba(255,245,200,.8)');g.fillStyle=gr2;g.beginPath();g.arc(C,C,0.82*C,0,PI*2);g.fill();}
  // grão cristalino da polpa + fibras radiais
  let s=nseeds*17+3;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  for(let i=0;i<5000;i++){const a=r()*PI*2,d=Math.sqrt(r())*0.78*C;g.fillStyle=r()<.55?'rgba(255,255,255,0.10)':(flesh==='red'?'rgba(120,0,20,0.14)':'rgba(170,100,0,0.12)');g.beginPath();g.ellipse(C+Math.cos(a)*d,C+Math.sin(a)*d,2+r()*5,1+r()*2.5,a,0,PI*2);g.fill();}
  g.strokeStyle=flesh==='red'?'rgba(255,200,205,0.12)':'rgba(255,250,220,0.15)';for(let i=0;i<40;i++){const a=r()*PI*2;g.lineWidth=1+r()*2;g.beginPath();g.moveTo(C+Math.cos(a)*0.1*C,C+Math.sin(a)*0.1*C);g.lineTo(C+Math.cos(a+0.1)*0.75*C,C+Math.sin(a+0.1)*0.75*C);g.stroke();}
  // sementes (gotas pretas orientadas para o centro, com brilho)
  for(let i=0;i<nseeds;i++){const a=i/nseeds*PI*2+r()*0.25,d=(0.42+r()*0.22)*C;const x=C+Math.cos(a)*d,y=C+Math.sin(a)*d;g.save();g.translate(x,y);g.rotate(a);
    g.fillStyle='#120806';g.beginPath();g.moveTo(-24,0);g.quadraticCurveTo(-4,-15,20,0);g.quadraticCurveTo(-4,15,-24,0);g.fill();g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.ellipse(4,-4,8,2.5,0,0,PI*2);g.fill();g.restore();}
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t;}
const rindM=new THREE.MeshPhysicalMaterial({roughness:0.38,bumpMap:bumpT,bumpScale:0.6,clearcoat:0.9,clearcoatRoughness:0.12,specularIntensity:1});
const fleshM=new THREE.MeshPhysicalMaterial({color:0xb8b8b8,roughness:0.5,clearcoat:0.25,clearcoatRoughness:0.3,specularIntensity:0.35,envMapIntensity:0.2,side:THREE.DoubleSide});
const shellGeo=(t0,tl)=>{const g=new THREE.SphereGeometry(1,128,96,0,PI*2,t0,tl);g.rotateZ(PI/2);return g;};   // polos no eixo x
const melon=new THREE.Mesh(shellGeo(0,PI),rindM);melon.castShadow=true;melon.receiveShadow=true;rig.add(melon);
const halves=[];for(const sg of [-1,1]){const grp=new THREE.Group();const sh=new THREE.Mesh(shellGeo(sg<0?0:PI/2,PI/2),rindM);sh.castShadow=true;sh.receiveShadow=true;
  const cap=new THREE.Mesh(new THREE.CircleGeometry(1,96),fleshM);cap.rotation.y=sg<0?PI/2:-PI/2;   // face do corte virada para dentro (±x)
  const inner=new THREE.Group();inner.add(sh,cap);grp.add(inner);rig.add(grp);halves.push({grp,inner,sg});}
// sumo + sementes a voar
const dropG=new THREE.Group();rig.add(dropG);const drops=[];const juiceM=new THREE.MeshPhysicalMaterial({color:0xe0102a,roughness:0.08,clearcoat:1,clearcoatRoughness:0.02,transparent:true,opacity:0.9});
const seedM=new THREE.MeshPhysicalMaterial({color:0x140906,roughness:0.25,clearcoat:1});
{const sg=new THREE.SphereGeometry(1,12,8);for(let i=0;i<150;i++){const seed=i>=138;const m=new THREE.Mesh(sg,seed?seedM:juiceM);m.castShadow=!seed;dropG.add(m);drops.push({m,seed,a:(rnd()-.5)*2.2,side:rnd()<.5?-1:1,vx:0.4+rnd()*2.4,vy:0.8+rnd()*3.4,vz:(rnd()-.35)*2.8,td:rnd()*0.12,s:seed?0.03:0.01+rnd()*rnd()*0.04});}}
// ---------- níveis ----------
let cur=-1,T0=null,T1=null,TF=null;let A=attempts[0],CY=0,TOP=0,YC=0,KMIN=0;
function setLevel(i){if(cur===i)return;cur=i;A=attempts[i];if(T0){T0.dispose();T1.dispose();TF.dispose();}
  T0=rindTex(A.kind,null);T1=rindTex(A.kind,A.word);TF=fleshTex(A.flesh,A.kind==='gold'?'#8a5a10':A.kind==='mini'?'#1d3a14':'#2b5a1e',A.kind==='mini'?14:A.kind==='gold'?30:24);
  rindM.map=T0;rindM.needsUpdate=true;fleshM.map=TF;fleshM.needsUpdate=true;
  rindM.metalness=A.kind==='gold'?0.45:0;rindM.roughness=A.kind==='gold'?0.26:0.38;
  juiceM.color.set(A.flesh==='red'?0xe0102a:0xffb81a);
  CY=A.ry-0.025;TOP=CY+A.ry;   // o vértice do topo do elipsoide fica exatamente em (0,TOP,0)
  melon.scale.set(A.rx,A.ry,A.rz);melon.position.set(0,CY,0);
  for(const h of halves){h.inner.scale.set(A.rx,A.ry,A.rz);}
  calibrate();}
// Calibração do toque NO ECRÃ: inclina a faca para anular a perspetiva (o lado do cabo fica mais perto da câmara) e procura a
// altura YC em que o gume encosta exatamente no contorno visível da melancia (sobreposição ≈ 0.5 px). Antes disso há folga.
const _v=new THREE.Vector3();
function scr(x,y,z){_v.set(x,y,z).applyMatrix4(rig.matrixWorld).project(cam);return [(_v.x+1)/2*W,(1-_v.y)/2*H];}
function calibrate(){cam.position.set(0,CAMY,CAMZ);cam.lookAt(0,LOOKY,0);cam.updateMatrixWorld(true);rig.updateMatrixWorld(true);
  knife.rotation.x=-Math.atan(Math.cos(rig.rotation.y)*(CAMY-TOP)/CAMZ);knife.position.set(0,0,0);knife.updateMatrixWorld(true);
  const top=new Float32Array(W+1).fill(1e9);   // contorno de cima da melancia, por coluna de píxel
  for(let a=0;a<=600;a++){const ph=(a/600-0.5)*PI;for(let b=0;b<=500;b++){const th=(b/500)*PI;const x=A.rx*Math.cos(th),r=Math.sin(th);
    const [sx,sy]=scr(x,CY+A.ry*r*Math.cos(ph),A.rz*r*Math.sin(ph));const ix=Math.round(sx);if(ix>=0&&ix<=W&&sy<top[ix])top[ix]=sy;}}
  const bp=blade.geometry.attributes.position;const loc=[];const m=new THREE.Matrix4().makeRotationX(knife.rotation.x);KMIN=1e9;
  for(let q=0;q<bp.count;q++){_v.fromBufferAttribute(bp,q).applyMatrix4(m);loc.push(_v.x,_v.y,_v.z);KMIN=Math.min(KMIN,_v.y);}
  const over=y=>{let w=-1e9;for(let q=0;q<loc.length;q+=3){const [sx,sy]=scr(loc[q],loc[q+1]+y,loc[q+2]);const ix=Math.round(sx);if(ix>=0&&ix<=W&&top[ix]<1e8)w=Math.max(w,sy-top[ix]);}return w;};
  let lo=TOP-0.3,hi=TOP+0.3;for(let it=0;it<30;it++){const mid=(lo+hi)/2;if(over(mid)>0.5)lo=mid;else hi=mid;}YC=hi;
  // controlo 3D: vértices do gume dentro do elipsoide no frame do toque
  let inside=0;for(let q=0;q<loc.length;q+=3){const x=loc[q],y=loc[q+1]+YC,z=loc[q+2];if((x/A.rx)**2+((y-CY)/A.ry)**2+(z/A.rz)**2<1)inside++;}
  console.error("CAL "+JSON.stringify({lvl:cur,dY:+(YC-TOP).toFixed(4),over0:+over(YC).toFixed(2),overPrev:[78,57,42,30].map(n=>+over(YC+D/n).toFixed(2)),inside}));}
const box=new THREE.Box3();
function placeHalves(kf){// kf: frames depois do toque (>=1)
  const t=Math.max(0,(kf-2)/30);const e=Math.min(1,t/0.42);const ang=(PI*0.30)*(1-Math.pow(1-e,3))+Math.sin(Math.min(1,Math.max(0,(t-0.42)/0.3))*PI)*0.06*(t>0.42?1:0);
  const gap=0.012+(1-Math.pow(1-Math.min(1,t/0.5),2))*A.rx*0.2;
  for(const h of halves){h.grp.position.set(0,CY,0);h.grp.rotation.set(0,0,0);h.inner.rotation.z=-h.sg*ang;h.grp.updateMatrixWorld(true);
    // assentar na tábua e afastar do plano do corte
    rig.updateMatrixWorld(true);const inv=rig.matrixWorld.clone().invert();box.makeEmpty();h.inner.children[0].geometry.computeBoundingBox();
    const pts=h.inner.children[0].geometry.attributes.position;const v=new THREE.Vector3();const M=h.inner.children[0].matrixWorld;let minY=1e9,minX=1e9,maxX=-1e9;
    for(let q=0;q<pts.count;q+=3){v.fromBufferAttribute(pts,q).applyMatrix4(M).applyMatrix4(inv);minY=Math.min(minY,v.y);minX=Math.min(minX,v.x);maxX=Math.max(maxX,v.x);}
    h.grp.position.y+=-minY;h.grp.position.x+=h.sg>0?(gap-minX):(-gap-maxX);h.grp.position.z+=(h.sg>0?0.25:-0.55)*Math.min(1,gap/(A.rx*0.2));}}
function draw(st){const T=st.f/st.fps;const i=st.i;setLevel(i);
  scene.environmentRotation.y=T*0.35;
  let mode='whole',ky=0,kf=0;   // ky: altura do gume
  if(st.phase==='approach'||st.phase==='contact'){ky=YC+D*(1-st.u);}
  else if(st.phase==='next'){ky=YC+D;melon.scale.set(A.rx,A.ry,A.rz).multiplyScalar(.7+.3*K.ease(st.w));}
  else if(st.phase==='after'){mode='cut';kf=st.k;}
  else{const p=st.rw/0.7;if(p<0.5){mode='cut';kf=1+(26-2)*(1-p/0.5);}else{ky=YC+D*K.inout((p-0.5)/0.5);}}
  if(mode==='cut'){const fl=0.004-KMIN;ky=kf<=1?YC-(YC-fl)*0.55*kf:Math.max(fl,YC-(YC-fl)*(0.55+0.45*(kf-1)));}
  knife.position.set(0,ky,0);
  melon.visible=mode==='whole';for(const h of halves)h.grp.visible=mode==='cut';
  rindM.map=st.phase==='contact'?T1:T0;rindM.needsUpdate=true;
  if(mode==='cut')placeHalves(Math.max(1.5,kf));
  // sumo
  dropG.visible=mode==='cut';if(mode==='cut'){const t=(kf-1.5)/30;const G=-13;
    for(const d of drops){const tt=t-d.td;if(tt<=0){d.m.visible=false;continue;}d.m.visible=true;
      const p0=new THREE.Vector3(0,CY+A.ry*Math.cos(d.a),A.rz*Math.sin(d.a));const vx=d.side*d.vx,vy=d.vy,vz=d.vz;
      const floorY=Math.abs(p0.x+vx*2)<3.2?0.0:-0.34;let th=(vy+Math.sqrt(vy*vy-2*G*(p0.y-floorY)))/(-G);
      if(tt<th){d.m.position.set(p0.x+vx*tt,p0.y+vy*tt+0.5*G*tt*tt,p0.z+vz*tt);const sp=Math.hypot(vx,vy+G*tt);d.m.scale.set(d.s,d.s*(1+Math.min(2.2,sp*0.35)),d.s);}
      else{d.m.position.set(p0.x+vx*th,floorY+0.004,p0.z+vz*th);d.m.scale.set(d.s*(d.seed?1:2.3),d.s*(d.seed?0.5:0.22),d.s*(d.seed?1.6:2.3));}}}
  // tremor no corte
  const sh=mode==='cut'&&kf<6?(6-kf)/6*0.03:0;cam.position.set(Math.sin(st.f*2.1)*sh,CAMY+Math.cos(st.f*2.7)*sh,CAMZ);cam.lookAt(0,LOOKY,0);
  R.render(scene,cam);c.drawImage(R.domElement,0,0);
  {const g=c.createRadialGradient(W/2,H*0.5,H*0.25,W/2,H*0.5,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');c.fillStyle=g;c.fillRect(0,0,W,H);}
  if(st.phase==='after'&&st.k>=1&&st.k<=3){c.fillStyle=`rgba(255,235,235,${0.28*(1-(st.k-1)/3)})`;c.fillRect(0,0,W,H);}}
return {tag:'REFLEX TEST · LEVEL UP',h2:'BEFORE THE KNIFE TOUCHES IT 🔪',ask:'WHICH ONE WOULD YOU SLICE? 🍉<br><span style="font-size:32px">the secret word only shows at <b style="color:#d6141f">0ms</b> 👀</span>',attempts,draw};};
