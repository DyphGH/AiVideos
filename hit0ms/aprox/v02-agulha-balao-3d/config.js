// Hit0Ms "aprox" #02 — AGULHA → BALÃO hiper-realista em 3D (three.js, render offline).
// A agulha chega, encosta e ENTRA na borracha: o balão afunda à volta da ponta e aparecem rugas/estrias de tensão
// cada vez mais fundas… e no frame antes de rebentar (0ms) aparece a palavra secreta impressa no balão. Depois rasga e rebenta em pedaços.
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export default (K)=>{const {c,W,H}=K;
const attempts=[
  {word:'POP',   col:0xd8121f,r:1.0},
  {word:'AIR',   col:0x1c62d6,r:1.04},
  {word:'SNAP',  col:0x0f9d50,r:1.08},
  {word:'LEGEND',col:0xd4a017,r:1.14,gold:true}];
// ---------- renderer / cena ----------
const R=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(W,H,false);
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=0.95;R.outputColorSpace=THREE.SRGBColorSpace;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;scene.environmentIntensity=0.55;
// fundo: degradê escuro de estúdio
{const cv=document.createElement('canvas');cv.width=8;cv.height=512;const g=cv.getContext('2d');const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#0b1120');gr.addColorStop(.5,'#1a2842');gr.addColorStop(1,'#05070c');g.fillStyle=gr;g.fillRect(0,0,8,512);
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;scene.background=t;}
const cam=new THREE.PerspectiveCamera(30,W/H,0.1,100);cam.position.set(0,0.1,12.5);cam.lookAt(0,-0.05,0);
// luzes: softbox grande em cima à esquerda, recorte azul à direita, enchimento quente
const key=new THREE.DirectionalLight(0xffffff,2.6);key.position.set(-4,5,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=4;key.shadow.camera.bottom=-4;key.shadow.radius=6;scene.add(key);
const rim=new THREE.DirectionalLight(0x9fc4ff,2.2);rim.position.set(5,1.5,-3);scene.add(rim);
const fill=new THREE.DirectionalLight(0xffd9b0,0.5);fill.position.set(2,-2,5);scene.add(fill);
// chão (só sombra + reflexo suave)
const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.ShadowMaterial({opacity:.45}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.75;floor.receiveShadow=true;scene.add(floor);
// ---------- balão ----------
const SEG=220;const geo=new THREE.SphereGeometry(1,SEG,SEG/2*1.2|0);
// forma de balão: mais alto, a estreitar em baixo até ao nó
const base=geo.attributes.position.array.slice();
for(let i=0;i<base.length;i+=3){let x=base[i],y=base[i+1],z=base[i+2];const k=y<0?1-0.38*Math.pow(-y,1.6):1+0.04*y;base[i]=x*k;base[i+2]=z*k;base[i+1]=y*1.17-(y<0?0.12*y*y:0);}
geo.attributes.position.array.set(base);geo.computeVertexNormals();
const baseN=geo.attributes.normal.array.slice();
const mat=new THREE.MeshPhysicalMaterial({color:0xd8121f,roughness:0.28,metalness:0,clearcoat:1,clearcoatRoughness:0.12,sheen:0.15,sheenRoughness:0.5,sheenColor:new THREE.Color(0xffffff),
  transmission:0.08,thickness:0.6,ior:1.45,attenuationColor:new THREE.Color(0xff2030),attenuationDistance:1.2,specularIntensity:1});
const ball=new THREE.Mesh(geo,mat);ball.castShadow=true;
// palavra secreta impressa (mesma geometria, por cima)
const wcv=document.createElement('canvas');wcv.width=2048;wcv.height=1024;const wg=wcv.getContext('2d');const wtex=new THREE.CanvasTexture(wcv);wtex.colorSpace=THREE.SRGBColorSpace;wtex.anisotropy=8;
const wmat=new THREE.MeshPhysicalMaterial({map:wtex,transparent:true,roughness:0.35,clearcoat:1,clearcoatRoughness:0.1,polygonOffset:true,polygonOffsetFactor:-2,depthWrite:false});
const wmesh=new THREE.Mesh(geo,wmat);wmesh.visible=false;
function paintWord(w){wg.clearRect(0,0,2048,1024);wg.save();wg.translate(512,560);wg.scale(1,1.15);wg.textAlign='center';wg.textBaseline='middle';wg.font=`400 ${w.length>4?190:270}px Anton`;wg.fillStyle='rgba(255,255,255,.96)';wg.fillText(w,0,0);wg.restore();wtex.needsUpdate=true;}
// nó + fio
const knot=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.09,0.16,32),mat);
const knotRing=new THREE.Mesh(new THREE.TorusGeometry(0.08,0.035,16,32),mat);
const bal=new THREE.Group();bal.add(ball,wmesh,knot,knotRing);scene.add(bal);
let stringMesh=null;function setString(t,yTop){if(stringMesh){bal.remove(stringMesh);stringMesh.geometry.dispose();}const pts=[];for(let i=0;i<=40;i++){const v=i/40;pts.push(new THREE.Vector3(Math.sin(v*6+t*2)*0.12*v+v*0.15,yTop-v*(yTop+2.7),Math.cos(v*5)*0.05*v));}
  stringMesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),80,0.008,6),new THREE.MeshStandardMaterial({color:0xeeeeee,roughness:.6}));stringMesh.castShadow=true;bal.add(stringMesh);}
// ---------- agulha ----------
const needle=new THREE.Group();
{const steel=new THREE.MeshPhysicalMaterial({color:0xd8dde6,metalness:1,roughness:0.14,clearcoat:.4});
 const L=3.4,rr=0.035;const shaft=new THREE.Mesh(new THREE.CylinderGeometry(rr,rr,L,48),steel);shaft.rotation.z=Math.PI/2;shaft.position.x=L/2+0.32;
 const tip=new THREE.Mesh(new THREE.ConeGeometry(rr,0.32,48),steel);tip.rotation.z=Math.PI/2;tip.position.x=0.16;
 const eye=new THREE.Mesh(new THREE.TorusGeometry(0.045,0.016,12,32),steel);eye.scale.set(2.2,1,1);eye.position.x=L+0.15;eye.rotation.x=Math.PI/2;
 const thread=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(L+0.15,0,0),new THREE.Vector3(L+0.6,-0.25,0.1),new THREE.Vector3(L+0.4,-1.0,0.3),new THREE.Vector3(L+0.9,-1.8,0.2),new THREE.Vector3(L+0.7,-2.6,0)]),80,0.012,8),new THREE.MeshStandardMaterial({color:0xc01428,roughness:.7}));
 for(const m of [shaft,tip,eye,thread]){m.castShadow=true;needle.add(m);}}
const NDIR=new THREE.Vector3(Math.cos(0.3),Math.sin(0.3),0.75).normalize();  // vem de cima à direita, um pouco para a câmara (vê-se a cova)
needle.quaternion.setFromUnitVectors(new THREE.Vector3(1,0,0),NDIR);scene.add(needle);
// ponto de entrada: onde o raio da ponta encontra o balão
const ray=new THREE.Raycaster();function entryPoint(){bal.updateMatrixWorld(true);geo.attributes.position.array.set(base);geo.attributes.position.needsUpdate=true;geo.computeBoundingSphere();
  const o=new THREE.Vector3(0.2,0.25,0).addScaledVector(NDIR,6);ray.set(o,NDIR.clone().negate());const h=ray.intersectObject(ball,false)[0];return h?ball.worldToLocal(h.point.clone()):new THREE.Vector3(1,0.3,0);}
// ---------- deformação (afundar + rugas de tensão) ----------
const pos=geo.attributes.position.array;const tmp=new THREE.Vector3(),loc=new THREE.Vector3();
function deform(P,depth,t){// P em coordenadas do balão; depth = quanto a ponta já entrou
  const ax=NDIR.clone().negate();// direção de empurrar (para dentro)
  // base perpendicular ao eixo
  const u=new THREE.Vector3(0,0,1).cross(ax).normalize(),v=ax.clone().cross(u).normalize();
  const Rd=0.1+depth*0.95;           // raio da cratera
  const Rw=Rd*2.3;                   // até onde vão as rugas
  const N=26;                        // número de estrias
  for(let i=0;i<pos.length;i+=3){const bx=base[i],by=base[i+1],bz=base[i+2];tmp.set(bx-P.x,by-P.y,bz-P.z);
    const along=tmp.dot(ax);const px=tmp.dot(u),py=tmp.dot(v);const r=Math.hypot(px,py);
    if(along<-0.05||r>Rw||tmp.lengthSq()>Rw*Rw*1.4){pos[i]=bx;pos[i+1]=by;pos[i+2]=bz;continue;}
    // cratera em forma de tenda (a borracha estica até à ponta)
    const q=Math.max(0,1-r/Rd);const dent=depth*(q*q*(3-2*q))*(1-0.15*q)+depth*0.0;
    // rugas radiais a partir da ponta: maiores perto da cratera, a desaparecer para fora
    const th=Math.atan2(py,px);const env=r<Rd*0.35?0:Math.min(1,(r-Rd*0.35)/(Rd*0.5))*Math.max(0,1-(r-Rd)/(Rw-Rd))**1.4;
    const wr=Math.sin(th*N+Math.sin(th*3+1.7)*1.3+r*6)*0.5+0.5;const amp=depth*0.075*env*Math.pow(wr,3);
    // pequena tremura (a borracha a vibrar)
    const jit=depth>0.05?Math.sin(t*90+r*40)*0.004*env:0;
    const ni=baseN[i],nj=baseN[i+1],nk=baseN[i+2];
    pos[i]=bx+ax.x*dent-ni*(amp+jit);pos[i+1]=by+ax.y*dent-nj*(amp+jit);pos[i+2]=bz+ax.z*dent-nk*(amp+jit);}
  geo.attributes.position.needsUpdate=true;geo.computeVertexNormals();}
function resetShape(){pos.set(base);geo.attributes.position.needsUpdate=true;geo.attributes.normal.array.set(baseN);geo.attributes.normal.needsUpdate=true;}
// ---------- rebentar: rasgo + pedaços de borracha ----------
const shards=new THREE.Group();scene.add(shards);let shardSet=null;
function makeShards(col,scale){shards.clear();K.setSeed(Math.round(scale*1000));const list=[];const m=new THREE.MeshPhysicalMaterial({color:col,roughness:.3,clearcoat:1,clearcoatRoughness:.15,side:THREE.DoubleSide,sheen:.5});
  for(let i=0;i<70;i++){const th0=K.rnd()*Math.PI*2,ph0=K.rnd()*Math.PI,sz=0.14+K.rnd()*0.32;
    const g=new THREE.SphereGeometry(scale,10,8,th0,sz,ph0,sz*0.7);const p=g.attributes.position.array;for(let j=0;j<p.length;j+=3){p[j+1]*=1.17;const cr=Math.sin(j*1.7+i)*0.06;p[j]+=cr;p[j+2]-=cr*.8;}g.computeVertexNormals();
    const mesh=new THREE.Mesh(g,m);mesh.castShadow=true;const cdir=new THREE.Vector3(-Math.cos(th0+sz/2)*Math.sin(ph0+sz*.35),Math.cos(ph0+sz*.35),Math.sin(th0+sz/2)*Math.sin(ph0+sz*.35));
    list.push({mesh,dir:cdir,sp:3+K.rnd()*7,rot:new THREE.Vector3(K.rnd()-.5,K.rnd()-.5,K.rnd()-.5).multiplyScalar(18)});shards.add(mesh);}
  return list;}
function placeShards(list,t,P){for(const s of list){const d=(1-Math.exp(-t*4))/4*s.sp;s.mesh.position.copy(s.dir).multiplyScalar(d).add(new THREE.Vector3(0,-2.2*t*t,0));
  s.mesh.position.y=Math.max(-2.7+0.05,s.mesh.position.y);s.mesh.rotation.set(s.rot.x*t,s.rot.y*t,s.rot.z*t);const sh=Math.max(.35,1-t*1.4);s.mesh.scale.set(sh,1-t*.5,sh);}}
// rasgo: material com recorte que cresce a partir do furo (2-3 frames de "câmara lenta")
const tearU={P:{value:new THREE.Vector3()},R:{value:0}};
for(const m of [mat,wmat])m.onBeforeCompile=sh=>{sh.uniforms.tearP=tearU.P;sh.uniforms.tearR=tearU.R;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vObj;').replace('#include <begin_vertex>','#include <begin_vertex>\nvObj=position;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vObj;uniform vec3 tearP;uniform float tearR;').replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(tearR>0.0){float d=distance(vObj,tearP);float n=sin(atan(vObj.y-tearP.y,vObj.z-tearP.z)*9.0)*0.08*tearR;if(d<tearR+n)discard;}');};
// ---------- desenhar um frame ----------
let cur=-1,P0=null,ENTRY={};
function setLevel(i){if(cur===i)return;cur=i;const A=attempts[i];mat.color.setHex(A.col);mat.attenuationColor.setHex(A.col);
  if(A.gold){mat.metalness=.55;mat.roughness=.22;mat.transmission=0;}else{mat.metalness=0;mat.roughness=.28;mat.transmission=.18;}
  bal.scale.setScalar(A.r);paintWord(A.word);
  const yb=-1.17-0.12-0.02;knot.position.set(0,yb-0.06,0);knotRing.position.set(0,yb-0.15,0);knotRing.rotation.x=Math.PI/2;
  resetShape();ENTRY[i]=ENTRY[i]||entryPoint();shardSet=makeShards(A.col,1);}
const APPROACH=0.62;   // parte da aproximação até tocar; o resto é a agulha a entrar
const MAXD=0.42;       // quanto entra antes de rebentar
function draw(st){const T=st.f/st.fps;const i=st.i;setLevel(i);const A=attempts[i];const P=ENTRY[i];
  bal.visible=true;shards.visible=false;wmesh.visible=false;tearU.R.value=0;
  let gap=0,depth=0;
  if(st.phase==='approach'||st.phase==='rewind'||st.phase==='contact'){const u=st.u;if(u<APPROACH){gap=2.6*(1-u/APPROACH)**1.15;}else{depth=MAXD*Math.pow((u-APPROACH)/(1-APPROACH),1.35);}}
  if(st.phase==='next'){gap=2.6;const s=.6+.4*K.ease(st.w);bal.scale.setScalar(A.r*s);}else bal.scale.setScalar(A.r);
  // balanço suave
  bal.rotation.z=Math.sin(T*1.3)*0.025;bal.position.y=Math.sin(T*1.7)*0.03+0.15;
  // agulha: ponta no ponto de entrada (em coordenadas do mundo) recuada por gap / avançada por depth
  bal.updateMatrixWorld(true);const Pw=P.clone().applyMatrix4(bal.matrixWorld);
  if(st.phase==='after'){const t=st.t;
    if(t<0.09){// rasgo a abrir
      tearU.P.value.copy(P).addScaledVector(NDIR,-MAXD/A.r);tearU.R.value=0.15+t*16;deform(P.clone().addScaledVector(NDIR,0),MAXD/A.r,T);}
    else{bal.visible=false;shards.visible=true;shards.position.copy(bal.position);shards.scale.setScalar(A.r);placeShards(shardSet,t-0.09,P);}
    needle.position.copy(Pw).addScaledVector(NDIR,-MAXD+Math.min(0.6,t*1.5));
  }else{
    if(depth>0)deform(P,depth/A.r,T);else resetShape();
    wmesh.visible=st.phase==='contact';
    needle.position.copy(Pw).addScaledVector(NDIR,gap-depth);}
  setString(T,-1.17-0.12-0.2);
  // flash do rebentamento
  R.render(scene,cam);c.drawImage(R.domElement,0,0);
  if(st.phase==='after'&&st.t<0.12){c.fillStyle=`rgba(255,255,255,${0.55*(1-st.t/0.12)})`;c.fillRect(0,0,W,H);}
  if(st.phase==='after'&&st.k<8){/* tremor */}
  // grão de filme leve
  }
return {tag:'REFLEX TEST · LEVEL UP',h2:'BEFORE IT POPS 🎈',ask:'Stop it at <b style="color:#d6141f">0ms</b> &mdash; the secret word only shows for 1 frame 👀',attempts,draw};};
