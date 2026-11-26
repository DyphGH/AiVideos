// Hit0Ms "aprox" #03 — PEDRA → VASO DE PORCELANA em 3D realista (three.js).
// Uma pedra vem a voar em câmara lenta, a rodar, contra um vaso de porcelana pintado à mão. No frame do toque (0ms) aparece a
// palavra secreta pintada no vaso. A seguir: estala (fissuras a partir do impacto) e explode em centenas de cacos com pó,
// que voam, rodam, batem no chão e escorregam.
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export default (K)=>{const {c,W,H}=K;const PI=Math.PI;
const attempts=[
  {word:'CRACK', style:'ming',   h:1.0},
  {word:'OOPS',  style:'celadon',h:1.05},
  {word:'SMASH', style:'ruby',   h:1.1},
  {word:'LEGEND',style:'gold',   h:1.2}];
// ---------- renderer / cena ----------
const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(W,H,false);
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.0;R.outputColorSpace=THREE.SRGBColorSpace;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;scene.environmentIntensity=0.6;
{const cv=document.createElement('canvas');cv.width=8;cv.height=512;const g=cv.getContext('2d');const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#120d0a');gr.addColorStop(.55,'#2a1f18');gr.addColorStop(1,'#080605');g.fillStyle=gr;g.fillRect(0,0,8,512);
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;scene.background=t;}
const cam=new THREE.PerspectiveCamera(30,W/H,0.1,100);cam.position.set(0,1.2,12);cam.lookAt(0,-0.62,0);
const key=new THREE.DirectionalLight(0xfff1dc,3.0);key.position.set(-4,7,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5});key.shadow.radius=4;key.shadow.bias=-0.0005;scene.add(key);
const rim=new THREE.DirectionalLight(0xb8d0ff,1.8);rim.position.set(5,3,-4);scene.add(rim);
const fill=new THREE.DirectionalLight(0xffc89a,0.4);fill.position.set(3,0,6);scene.add(fill);
// chão de mármore escuro e polido
let marble;{const cv=document.createElement('canvas');cv.width=cv.height=1024;const g=cv.getContext('2d');g.fillStyle='#2b2622';g.fillRect(0,0,1024,1024);
  for(let i=0;i<70;i++){g.strokeStyle=`rgba(${200+Math.random()*40},${190+Math.random()*30},${170},${0.04+Math.random()*0.08})`;g.lineWidth=0.5+Math.random()*2.5;g.beginPath();let x=Math.random()*1024,y=Math.random()*1024;g.moveTo(x,y);for(let k=0;k<30;k++){x+=(Math.random()-.4)*60;y+=(Math.random()-.5)*40;g.lineTo(x,y);}g.stroke();}
  marble=new THREE.CanvasTexture(cv);marble.wrapS=marble.wrapT=THREE.RepeatWrapping;marble.repeat.set(3,3);marble.colorSpace=THREE.SRGBColorSpace;}
const FLOOR=-1.6;const floor=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.MeshPhysicalMaterial({map:marble,roughness:0.18,clearcoat:1,clearcoatRoughness:0.05}));floor.rotation.x=-PI/2;floor.position.y=FLOOR;floor.receiveShadow=true;scene.add(floor);
// ---------- vaso (torno) ----------
const PROF=[[0,0],[0.42,0],[0.46,0.04],[0.5,0.18],[0.66,0.55],[0.78,0.95],[0.8,1.25],[0.72,1.6],[0.5,1.95],[0.3,2.2],[0.25,2.45],[0.27,2.7],[0.36,2.86],[0.38,2.92],[0.33,2.93]];
const curve=new THREE.SplineCurve(PROF.map(p=>new THREE.Vector2(p[0],p[1])));const PTS=curve.getPoints(90);
const VH=2.93;
function sampleR(v){// raio no parâmetro de altura v (0..1)
  const y=v*VH;let best=PTS[0];for(const p of PTS)if(Math.abs(p.y-y)<Math.abs(best.y-y))best=p;return Math.max(0.02,best.x);}
// textura pintada (porcelana)
function paintTex(style,word){const cv=document.createElement('canvas');cv.width=2048;cv.height=1024;const g=cv.getContext('2d');
  const S={ming:{bg:'#f4f1ea',ink:'#1d3f9a',ink2:'#5a7fd6'},celadon:{bg:'#a9c9b0',ink:'#4f7f63',ink2:'#2f5a42'},ruby:{bg:'#f2ece4',ink:'#a3121b',ink2:'#d4a017'},gold:{bg:'#101012',ink:'#d4a017',ink2:'#f3d77a'}}[style];
  g.fillStyle=S.bg;g.fillRect(0,0,2048,1024);
  const band=(y,h)=>{g.fillStyle=S.ink;g.fillRect(0,y,2048,h);};band(70,14);band(110,6);band(900,10);band(930,18);
  // greca
  g.strokeStyle=S.ink;g.lineWidth=6;for(let x=0;x<2048;x+=64){g.beginPath();g.moveTo(x,880);g.lineTo(x,850);g.lineTo(x+40,850);g.lineTo(x+40,870);g.lineTo(x+20,870);g.stroke();}
  // flores e ramos
  let s=style.length*97;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  for(let k=0;k<14;k++){const cx=r()*2048,cy=260+r()*480,R=40+r()*55;g.strokeStyle=S.ink2;g.lineWidth=5;g.beginPath();g.moveTo(cx,cy);g.bezierCurveTo(cx+120,cy-90,cx+180,cy+60,cx+300,cy-30);g.stroke();
    for(let p=0;p<8;p++){const a=p/8*PI*2;g.fillStyle=p%2?S.ink:S.ink2;g.beginPath();g.ellipse(cx+Math.cos(a)*R*.55,cy+Math.sin(a)*R*.55,R*.5,R*.22,a,0,PI*2);g.fill();}
    g.fillStyle=S.bg;g.beginPath();g.arc(cx,cy,R*.22,0,PI*2);g.fill();g.fillStyle=S.ink;g.beginPath();g.arc(cx,cy,R*.12,0,PI*2);g.fill();
    for(let l=0;l<5;l++){const lx=cx+60+l*45,ly=cy-20+Math.sin(l)*40;g.fillStyle=S.ink2;g.beginPath();g.ellipse(lx,ly,26,10,0.6,0,PI*2);g.fill();}}
  if(word){g.save();g.translate(1358,563);g.scale(1,1.2);g.textAlign='center';g.textBaseline='middle';g.font=`400 ${word.length>5?170:220}px Anton`;g.lineWidth=18;g.strokeStyle=S.bg;g.strokeText(word,0,0);g.fillStyle=style==='gold'?'#f3d77a':'#c8101c';g.fillText(word,0,0);g.restore();}
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
// fissuras (desenhadas por cima no frame do estalo)
function crackTex(base,style){const cv=document.createElement('canvas');cv.width=2048;cv.height=1024;const g=cv.getContext('2d');g.drawImage(base.image,0,0);
  g.strokeStyle=style==='gold'?'#fff6d0':'#2a1a10';g.lineCap='round';let s=11;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  for(let k=0;k<16;k++){let x=1536,y=594,a=k/16*PI*2+r()*.3;g.lineWidth=7;g.beginPath();g.moveTo(x,y);for(let j=0;j<14;j++){a+=(r()-.5)*.8;const L=30+r()*60;x+=Math.cos(a)*L;y+=Math.sin(a)*L*.7;g.lineTo(x,y);g.lineWidth=Math.max(1.5,7-j*.45);}g.stroke();}
  const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t;}
const vmat=new THREE.MeshPhysicalMaterial({roughness:0.12,clearcoat:1,clearcoatRoughness:0.04,specularIntensity:1,side:THREE.DoubleSide});
const vaseGeo=new THREE.LatheGeometry(PTS,200);{const uv=vaseGeo.attributes.uv,ps=vaseGeo.attributes.position;for(let i=0;i<uv.count;i++)uv.setY(i,ps.getY(i)/VH);}
// rodar o UV para que u=0.75 (palavra) fique virado para a câmara/pedra
const vase=new THREE.Mesh(vaseGeo,vmat);vase.castShadow=true;vase.receiveShadow=true;const vg=new THREE.Group();vg.add(vase);vg.position.y=FLOOR;scene.add(vg);
// interior escuro (boca)
const inner=new THREE.Mesh(new THREE.CircleGeometry(0.3,48),new THREE.MeshBasicMaterial({color:0x0d0a08}));inner.rotation.x=-PI/2;inner.position.y=2.88;vg.add(inner);
// ---------- pedra ----------
const stoneGeo=new THREE.IcosahedronGeometry(0.42,5);{const p=stoneGeo.attributes.position;const v=new THREE.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i);const n=v.clone().normalize();
  const d=1+0.16*Math.sin(n.x*4.1+1)*Math.sin(n.y*3.3+2)+0.08*Math.sin(n.z*9+n.x*5)+0.03*Math.sin(n.x*23+n.y*19)+0.015*Math.sin(n.y*41+n.z*37);v.copy(n).multiplyScalar(0.42*d);v.y*=0.82;p.setXYZ(i,v.x,v.y,v.z);}stoneGeo.computeVertexNormals();}
let stoneTex;{const cv=document.createElement('canvas');cv.width=cv.height=512;const g=cv.getContext('2d');g.fillStyle='#6d6660';g.fillRect(0,0,512,512);for(let i=0;i<9000;i++){const s=Math.random();g.fillStyle=`rgba(${s>.5?190:30},${s>.5?180:28},${s>.5?165:25},${Math.random()*.25})`;g.fillRect(Math.random()*512,Math.random()*512,1+Math.random()*3,1+Math.random()*3);}
  stoneTex=new THREE.CanvasTexture(cv);stoneTex.colorSpace=THREE.SRGBColorSpace;}
const stone=new THREE.Mesh(stoneGeo,new THREE.MeshStandardMaterial({map:stoneTex,bumpMap:stoneTex,bumpScale:3,roughness:0.92}));stone.castShadow=true;scene.add(stone);
// ---------- cacos ----------
// grelha de pedaços na superfície do torno, com bordas irregulares partilhadas (encaixam uns nos outros); mais pequenos perto do impacto
const IMPU=0.75,IMPV=0.42;   // impacto: u (à volta) e v (altura 0..1) — lado virado para a pedra
function fragGrid(){const out=[];const NU=30,NV=18;const jit=(a,b)=>Math.sin(a*12.9898+b*78.233)*0.5;
  for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const u0=i/NU,u1=(i+1)/NU,v0=j/NV,v1=(j+1)/NV;const du=Math.min(Math.abs(u0+.5/NU-IMPU),1-Math.abs(u0+.5/NU-IMPU)),dv=Math.abs(v0+.5/NV-IMPV);const near=Math.hypot(du*2,dv)<0.18;
    const sub=near?2:1;for(let a=0;a<sub;a++)for(let b=0;b<sub;b++){const ua=u0+(u1-u0)*a/sub,ub=u0+(u1-u0)*(a+1)/sub,va=v0+(v1-v0)*b/sub,vb=v0+(v1-v0)*(b+1)/sub;
      const big=!near&&((i*7+j*3)%5===0);const flip=((i*13+j*7+a+b)%2)===0;
      if(big)out.push({ua,ub,va,vb,tri:0});else{out.push({ua,ub,va,vb,tri:flip?1:3});out.push({ua,ub,va,vb,tri:flip?2:4});}}}
  return out;}
function fragGeo(f,tex){const n=5;const posA=[],uvA=[],idx=[];const TH=0.035;
  const P=(u,v,inset)=>{const r=sampleR(v)-inset;const a=u*PI*2;return [Math.sin(a)*r,v*VH,Math.cos(a)*r];};
  const jitU=(u,v)=>u+Math.sin(u*91.7+v*47.3)*0.18*(f.ub-f.ua),jitV=(u,v)=>v+Math.sin(u*63.1+v*29.9)*0.22*(f.vb-f.va);
  const map=(x,y)=>{let s=x/n,t=y/n;// tri 1: (0,0)(1,0)(1,1)  2:(0,0)(1,1)(0,1)  3:(0,0)(1,0)(0,1)  4:(1,0)(1,1)(0,1)
    if(f.tri===1){t=t*s;}else if(f.tri===2){s=s*t;}else if(f.tri===3){t=t*(1-s);}else if(f.tri===4){s=1-(1-s)*(t);t=t;s=Math.max(s,1-t);}return [f.ua+(f.ub-f.ua)*s,f.va+(f.vb-f.va)*t];};
  for(const inset of [0,TH])for(let y=0;y<=n;y++)for(let x=0;x<=n;x++){let [u,v]=map(x,y);if(x===0||x===n||y===0||y===n){u=jitU(u,v);v=jitV(u,v);}
    posA.push(...P(u,v,inset));uvA.push(u,v);}
  const L=(n+1)*(n+1);for(let s=0;s<2;s++)for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=s*L+y*(n+1)+x,b=a+1,c2=a+n+1,d=c2+1;if(s)idx.push(a,c2,b,b,c2,d);else idx.push(a,b,c2,b,d,c2);}
  // paredes da espessura (bordas brancas do caco partido)
  const edge=[];for(let x=0;x<n;x++)edge.push([x,0]);for(let y=0;y<n;y++)edge.push([n,y]);for(let x=n;x>0;x--)edge.push([x,n]);for(let y=n;y>0;y--)edge.push([0,y]);
  for(let k=0;k<edge.length;k++){const [x0,y0]=edge[k],[x1,y1]=edge[(k+1)%edge.length];const a=y0*(n+1)+x0,b=y1*(n+1)+x1;idx.push(a,b,a+L,b,b+L,a+L);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(posA,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvA,2));g.setIndex(idx);g.computeVertexNormals();
  // centrar no próprio centro (para rodar à volta dele)
  g.computeBoundingBox();const ctr=new THREE.Vector3();g.boundingBox.getCenter(ctr);g.translate(-ctr.x,-ctr.y,-ctr.z);return {g,ctr};}
const shardG=new THREE.Group();scene.add(shardG);let shards=[];
const dustG=new THREE.Group();scene.add(dustG);let dust=[];
let dustTex;{const cv=document.createElement('canvas');cv.width=cv.height=64;const g=cv.getContext('2d');const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,250,240,.9)');gr.addColorStop(1,'rgba(255,250,240,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);dustTex=new THREE.CanvasTexture(cv);}
function buildShards(tex,style,hs){shardG.clear();dustG.clear();shards=[];dust=[];const m=new THREE.MeshPhysicalMaterial({map:tex,roughness:0.14,clearcoat:1,clearcoatRoughness:0.05,side:THREE.DoubleSide});
  K.setSeed(1234+style.length);const imp=new THREE.Vector3(Math.sin(IMPU*PI*2)*sampleR(IMPV),IMPV*VH,Math.cos(IMPU*PI*2)*sampleR(IMPV));
  for(const f of fragGrid()){const {g,ctr}=fragGeo(f,tex);const mesh=new THREE.Mesh(g,m);mesh.castShadow=true;shardG.add(mesh);
    const out=new THREE.Vector3(ctr.x,0,ctr.z).normalize();const toImp=ctr.clone().sub(imp);const dImp=toImp.length();
    const push=Math.max(0,1.5-dImp)*3.2;   // perto do impacto voam muito; longe quase só caem (o vaso desaba)
    const away=toImp.clone().normalize();
    const vel=away.multiplyScalar(push*(1+K.rnd()*0.8)).add(out.clone().multiplyScalar(0.25+K.rnd()*0.5)).add(new THREE.Vector3((K.rnd()-.5)*.4,push*.35+K.rnd()*0.6,(K.rnd()-.5)*.4)); // a pedra vem da direita → empurra para a esquerda
    shards.push({mesh,p0:ctr.clone(),vel,rv:new THREE.Vector3(K.rnd()-.5,K.rnd()-.5,K.rnd()-.5).multiplyScalar(10+push*6),y0:ctr.y});}
  // lascas pequeninas + pó
  const chipM=new THREE.MeshPhysicalMaterial({color:style==='gold'?0x1a1a1c:style==='celadon'?0xa9c9b0:0xf4f1ea,roughness:.2,clearcoat:1});
  for(let i=0;i<160;i++){const s=0.015+K.rnd()*0.035;const mesh=new THREE.Mesh(new THREE.TetrahedronGeometry(s),chipM);mesh.castShadow=true;dustG.add(mesh);
    const a=(K.rnd()-.5)*2.2+PI*0.5;dust.push({mesh,p0:imp.clone(),vel:new THREE.Vector3(-Math.abs(Math.cos(a))*(2+K.rnd()*5),K.rnd()*4,Math.sin(a)*(2+K.rnd()*4)),rv:K.rnd()*30});}
  for(let i=0;i<40;i++){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:dustTex,transparent:true,depthWrite:false,opacity:.5}));dustG.add(sp);dust.push({sprite:sp,p0:imp.clone(),vel:new THREE.Vector3((K.rnd()-.7)*2,K.rnd()*1.2,(K.rnd()-.3)*1.5),s:0.2+K.rnd()*0.5});}}
function simShards(t){const G=-9.8;const fy=0.02;
  for(const s of shards){let x=s.p0.x,y=s.p0.y,z=s.p0.z,vx=s.vel.x,vy=s.vel.y,vz=s.vel.z;let rot=t;const dt=1/120;let st=0;
    for(let k=0;k<t;k+=dt){vy+=G*dt;x+=vx*dt;y+=vy*dt;z+=vz*dt;if(y<fy){y=fy;vy*=-0.25;vx*=0.6;vz*=0.6;st+=dt;}}
    s.mesh.position.set(x,y,z);const k=Math.max(0,t-st*0.8);s.mesh.rotation.set(s.rv.x*k,s.rv.y*k,s.rv.z*k);}
  for(const d of dust){if(d.sprite){const k=1-Math.exp(-t*3);d.sprite.position.copy(d.p0).addScaledVector(d.vel,k).add(new THREE.Vector3(0,-0.2*t,0));const sc=d.s*(1+t*3);d.sprite.scale.set(sc,sc,sc);d.sprite.material.opacity=Math.max(0,.45*(1-t/1.1));continue;}
    let p=d.p0.clone(),v=d.vel.clone();for(let k=0;k<t;k+=1/120){v.y+=G/120;p.addScaledVector(v,1/120);if(p.y<0.01){p.y=0.01;v.y*=-.3;v.x*=.5;v.z*=.5;}}d.mesh.position.copy(p);d.mesh.rotation.set(d.rv*t,d.rv*t*.7,0);}}
// ---------- níveis ----------
let cur=-1,T0=null,T1=null,T2=null;
function setLevel(i){if(cur===i)return;cur=i;const A=attempts[i];if(T0){T0.dispose();T1.dispose();T2.dispose();}
  T0=paintTex(A.style,null);T1=paintTex(A.style,A.word);T2=crackTex(T0,A.style);vmat.map=T0;vmat.needsUpdate=true;
  if(A.style==='gold'){vmat.metalness=0.15;}else vmat.metalness=0;
  vg.scale.setScalar(A.h);shardG.scale.setScalar(A.h);dustG.scale.setScalar(A.h);shardG.position.y=dustG.position.y=FLOOR;buildShards(T2,A.style,A.h);}
// impacto em coordenadas do mundo (lado direito do vaso, virado ligeiramente para a câmara)
function impW(A){const r=sampleR(IMPV)*A.h;return new THREE.Vector3(Math.sin(IMPU*PI*2)*r,FLOOR+IMPV*VH*A.h,Math.cos(IMPU*PI*2)*r);}
// rodar o vaso para o ponto de impacto (u=.75 → x negativo?) ficar à direita e meio de frente
vg.rotation.y=PI*0.5+0.55;shardG.rotation.y=dustG.rotation.y=vg.rotation.y;
function draw(st){const T=st.f/st.fps;const i=st.i;setLevel(i);const A=attempts[i];
  vg.updateMatrixWorld(true);const I=new THREE.Vector3(Math.sin(IMPU*PI*2)*sampleR(IMPV),IMPV*VH,Math.cos(IMPU*PI*2)*sampleR(IMPV)).applyMatrix4(vase.matrixWorld);
  const from=new THREE.Vector3(4.6,4.2,3.2);const dir=I.clone().sub(from).normalize();const SR=0.42;const hit=I.clone().addScaledVector(dir,-SR*0.98);
  vg.visible=true;shardG.visible=false;dustG.visible=false;stone.visible=true;
  if(st.phase==='after'){const t=st.t;
    if(st.k<=2){vmat.map=T2;vmat.needsUpdate=true;stone.position.copy(hit).addScaledVector(dir,0.05*st.k);}   // 2 frames: estala
    else{vg.visible=false;shardG.visible=true;dustG.visible=true;simShards(t-2/30);const ts=t-2/30;stone.position.copy(hit).addScaledVector(dir,ts*2.6).add(new THREE.Vector3(0,-4.9*ts*ts,0));stone.position.y=Math.max(FLOOR+0.36,stone.position.y);}
    stone.rotation.set(T*3,T*2,T*1.3);
  }else{
    vmat.map=st.phase==='contact'?T1:T0;vmat.needsUpdate=true;
    let u=st.phase==='next'?0:st.u;if(st.phase==='next'){vg.scale.setScalar(A.h*(.7+.3*K.ease(st.w)));}else vg.scale.setScalar(A.h);
    // pedra: arco em câmara lenta, a rodar
    const p=from.clone().lerp(hit,u);p.y+=Math.sin(u*PI)*0.6;stone.position.copy(p);stone.rotation.set(T*3,T*2,T*1.3);
    if(st.phase==='next')stone.visible=false;}
  R.render(scene,cam);c.drawImage(R.domElement,0,0);
  if(st.phase==='after'&&st.k>=1&&st.k<=3){c.fillStyle=`rgba(255,245,230,${0.35*(1-(st.k-1)/3)})`;c.fillRect(0,0,W,H);}}
return {tag:'REFLEX TEST · LEVEL UP',h2:'BEFORE IT SHATTERS 🏺',ask:'Stop it at <b style="color:#d6141f">0ms</b> &mdash; the secret word only shows for 1 frame 👀',attempts,draw};};
