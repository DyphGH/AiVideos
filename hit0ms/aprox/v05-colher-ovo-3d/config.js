// Hit0Ms "aprox" #05 — COLHER → OVO CRU em 3D realista (three.js). Remake dos ovos (#26) no formato "pause at 0ms before it cracks".
// Um ovo cru deitado numa tábua de ardósia escura; uma colher de inox (as costas da concha viradas para baixo) desce devagar.
// No frame em que a concha toca na casca (0ms) aparece a palavra secreta carimbada no ovo (como o carimbo dos ovos de supermercado).
// Depois: covinha + rachas finas a partir do ponto do toque (k=1), racha principal à volta do ovo (k=2), a casca abre-se em duas
// metades de bordo serrilhado (com espessura e membrana branca por dentro), saltam lascas de casca, e a clara (translúcida, brilhante)
// cai e espalha-se na ardósia com a gema laranja por cima a abanar. Rewind volta tudo atrás e o ovo seguinte cresce.
// Toque exato: a concha desce na vertical por cima do ponto da silhueta do ovo (o ponto mais alto visto pela câmara) e a altura do
// toque é calibrada NO ECRÃ (sobreposição ≈ 0.5 px entre a silhueta da colher e o contorno do ovo), com controlo 3D (0 vértices dentro).
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export default (K)=>{const {c,W,H}=K;const PI=Math.PI;
// L = comprimento, B = largura, w = assimetria (ponta romba para -x). ink = cor do carimbo.
const attempts=[
  {word:'YOLK',    kind:'white',L:2.0, B:1.5, w:0.10,ink:'#c8141b'},
  {word:'CRACK',   kind:'brown',L:2.06,B:1.56,w:0.11,ink:'#10226a'},
  {word:'GOLDEN',  kind:'gold', L:2.0, B:1.5, w:0.10,ink:'#4a1600'},
  {word:'EGGSPERT',kind:'giant',L:2.62,B:2.02,w:0.14,ink:'#b8121a'}];
const D=0.85;   // distância que a colher desce até tocar
// ---------- renderer / cena ----------
const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});R.setPixelRatio(1);R.setSize(W,H,false);
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.0;R.outputColorSpace=THREE.SRGBColorSpace;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;scene.environmentIntensity=0.75;
{const cv=document.createElement('canvas');cv.width=8;cv.height=512;const g=cv.getContext('2d');const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#0d0e10');gr.addColorStop(.5,'#1d1f22');gr.addColorStop(1,'#060708');g.fillStyle=gr;g.fillRect(0,0,8,512);
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;scene.background=t;}
const CAMY=4.3,CAMZ=14.2,LOOKY=1.12;const cam=new THREE.PerspectiveCamera(28,W/H,0.1,100);cam.position.set(0,CAMY,CAMZ);cam.lookAt(0,LOOKY,0);
const key=new THREE.DirectionalLight(0xfff1de,3.0);key.position.set(-4,8,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5});key.shadow.radius=5;key.shadow.bias=-0.0005;key.shadow.normalBias=0.01;scene.add(key);
const rim=new THREE.DirectionalLight(0xbcd4ff,1.8);rim.position.set(5,4,-5);scene.add(rim);
const fill=new THREE.DirectionalLight(0xffd9b5,0.55);fill.position.set(3,1,7);scene.add(fill);
const rnd=(()=>{let s=11;return ()=>{s=(s*16807)%2147483647;return (s-1)/2147483646;};})();
function tex(cv,srgb=true){const t=new THREE.CanvasTexture(cv);if(srgb)t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
// ---------- bancada de madeira + tábua de ardósia ----------
function woodTex(){const cv=document.createElement('canvas');cv.width=1024;cv.height=512;const g=cv.getContext('2d');g.fillStyle='#5a3a22';g.fillRect(0,0,1024,512);
  for(let i=0;i<160;i++){const y0=rnd()*512,a=4+rnd()*12,f=0.002+rnd()*0.01,ph=rnd()*9;g.strokeStyle=rnd()<.6?'#2e1a0c':'#8a5a36';g.globalAlpha=0.08+rnd()*0.2;g.lineWidth=0.6+rnd()*2.6;g.beginPath();
    for(let x=0;x<=1024;x+=8){const y=y0+Math.sin(x*f+ph)*a;x?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}g.globalAlpha=1;const t=tex(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(3,3);return t;}
const counter=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({map:woodTex(),color:0x3e342e,roughness:0.6}));counter.rotation.x=-PI/2;counter.position.y=-0.24;counter.receiveShadow=true;scene.add(counter);
const rig=new THREE.Group();rig.rotation.y=0.26;scene.add(rig);   // ovo deitado ao longo do eixo x do rig
let slateT,slateB;{const cv=document.createElement('canvas');cv.width=cv.height=1024;const g=cv.getContext('2d');g.fillStyle='#2a2c2f';g.fillRect(0,0,1024,1024);
  const cb=document.createElement('canvas');cb.width=cb.height=1024;const gb=cb.getContext('2d');gb.fillStyle='#808080';gb.fillRect(0,0,1024,1024);
  for(let i=0;i<260;i++){const y=rnd()*1024,x=rnd()*1024,l=80+rnd()*500;const v=rnd()<.5;g.strokeStyle=v?'rgba(255,255,255,0.035)':'rgba(0,0,0,0.12)';g.lineWidth=1+rnd()*6;g.beginPath();g.moveTo(x,y);g.lineTo(x+l,y+(rnd()-.5)*30);g.stroke();
    gb.strokeStyle=v?'rgba(200,200,200,0.25)':'rgba(40,40,40,0.25)';gb.lineWidth=1+rnd()*4;gb.beginPath();gb.moveTo(x,y);gb.lineTo(x+l,y+(rnd()-.5)*30);gb.stroke();}
  for(let i=0;i<20000;i++){const v=rnd();g.fillStyle=`rgba(${v<.5?0:255},${v<.5?0:255},${v<.5?0:255},${0.03+rnd()*0.05})`;g.fillRect(rnd()*1024,rnd()*1024,1+rnd()*2,1+rnd()*2);}
  slateT=tex(cv);slateB=tex(cb,false);}
const board=new THREE.Mesh(new RoundedBoxGeometry(11,0.24,9,4,0.06),new THREE.MeshPhysicalMaterial({map:slateT,bumpMap:slateB,bumpScale:0.8,roughness:0.62,clearcoat:0.15,clearcoatRoughness:0.6}));
board.position.set(0,-0.12,-2.2);board.receiveShadow=true;board.castShadow=true;rig.add(board);
// ---------- colher de inox ----------
let brushed;{const cv=document.createElement('canvas');cv.width=1024;cv.height=256;const g=cv.getContext('2d');g.fillStyle='#2a2a2a';g.fillRect(0,0,1024,256);
  for(let i=0;i<700;i++){const y=rnd()*256;g.fillStyle=`rgba(${rnd()<.5?80:20},${rnd()<.5?80:20},${rnd()<.5?80:20},${0.12+rnd()*0.25})`;g.fillRect(rnd()*1024-200,y,200+rnd()*600,0.6+rnd()*1.2);}brushed=tex(cv,false);}
const steel=new THREE.MeshPhysicalMaterial({color:0xe6eaf0,metalness:1,roughness:0.07,roughnessMap:brushed,envMapIntensity:3.6,clearcoat:0.4,clearcoatRoughness:0.05,side:THREE.DoubleSide});
const BA=0.47,BC=0.17,BB=0.33;   // concha: meio-comprimento, fundo, meia-largura
const spoon=new THREE.Group();rig.add(spoon);const SRY=0.42;spoon.rotation.y=SRY;
{const bg=new THREE.SphereGeometry(1,96,40,0,2*PI,PI/2,PI/2);   // meia esfera de baixo → concha
  const p=bg.attributes.position;for(let q=0;q<p.count;q++){let x=p.getX(q),y=p.getY(q),z=p.getZ(q);const wz=1-0.16*x;   // ponta mais larga (-x), mais estreita junto ao cabo
    p.setXYZ(q,x*BA,y*BC+BC,z*BB*wz);}bg.computeVertexNormals();
  const bowl=new THREE.Mesh(bg,steel);bowl.castShadow=true;spoon.add(bowl);
  const pts=[];for(let i=0;i<=128;i++){const t=i/128*2*PI;const x=Math.cos(t);pts.push(new THREE.Vector3(x*BA,BC,Math.sin(t)*BB*(1-0.16*x)));}
  const lip=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts,true),160,0.013,10,true),steel);spoon.add(lip);
  // cabo: perfil em planta, extrudido (espessura para cima), a subir a partir do pescoço
  const s=new THREE.Shape();const N=40,X0=0,X1=1.85;const wd=t=>t<0.14?0.05-0.018*(t/0.14):0.032+0.11*Math.pow((t-0.14)/0.86,1.6);
  for(let i=0;i<=N;i++){const t=i/N,x=X0+(X1-X0)*t;i?s.lineTo(x,wd(t)):s.moveTo(x,wd(t));}
  s.absarc(X1,0,wd(1),PI/2,-PI/2,true);for(let i=N;i>=0;i--){const t=i/N;s.lineTo(X0+(X1-X0)*t,-wd(t));}
  const hg=new THREE.ExtrudeGeometry(s,{depth:0.028,bevelEnabled:true,bevelThickness:0.008,bevelSize:0.008,bevelSegments:3,curveSegments:24});hg.rotateX(-PI/2);
  const handle=new THREE.Mesh(hg,steel);handle.castShadow=true;const hgp=new THREE.Group();hgp.position.set(BA-0.05,BC-0.02,0);hgp.rotation.z=0.34;hgp.add(handle);spoon.add(hgp);}
// ---------- ovo ----------
const eR=(x,A)=>{const L=A.L;const q=L*L-4*x*x;return q<=0?0:A.B/2*Math.sqrt(q/(L*L+8*A.w*x+4*A.w*A.w));};
const TW=1024,TH=2048;
const tri=t=>2/PI*Math.asin(Math.sin(t));
const jag=ph=>0.05*tri(ph*5+0.3)+0.028*tri(ph*11+1.7)+0.012*Math.sin(ph*23+0.4);   // racha principal (serrilhada, periódica)
let A=attempts[0],XM=0,RM=0,CY=0,PHC=0,ZC=0,YC=0,cur=-1;
const notch=ph=>0.15*Math.exp(-((((ph-PHC+PI)%(2*PI)+2*PI)%(2*PI)-PI)**2)/0.18);   // buraco onde a colher esmaga a casca
function shellGeo(th0,th1,rs=1,NT=150,NP=140){const pos=[],uv=[],idx=[];
  for(let j=0;j<=NP;j++){const ph=-PI+2*PI*j/NP;const a=th0(ph),b=th1(ph);
    for(let i=0;i<=NT;i++){const th=a+(b-a)*i/NT;const x=-(A.L/2)*Math.cos(th);const r=eR(x,A)*rs;pos.push(x,r*Math.cos(ph),r*Math.sin(ph));uv.push((x+A.L/2)/A.L,(ph+PI)/(2*PI));}}
  for(let j=0;j<NP;j++)for(let i=0;i<NT;i++){const a=j*(NT+1)+i,b=a+1,cc=a+NT+1,d=cc+1;idx.push(a,cc,b,b,cc,d);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;}
const thx=x=>Math.acos(Math.max(-1,Math.min(1,-x/(A.L/2))));
const xeL=ph=>XM+jag(ph)-notch(ph),xeR=ph=>XM+jag(ph)+notch(ph);
function rimGeo(xe,NP=140){const pos=[],idx=[];for(let j=0;j<=NP;j++){const ph=-PI+2*PI*j/NP;const x=xe(ph),r=eR(x,A);pos.push(x,r*Math.cos(ph),r*Math.sin(ph),x,0.955*r*Math.cos(ph),0.955*r*Math.sin(ph));}
  for(let j=0;j<NP;j++){const a=2*j;idx.push(a,a+1,a+2,a+1,a+3,a+2);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g;}
// texturas da casca (u = ao longo do ovo, v = à volta; flipY=false → no canvas "para baixo" = descer pela face da frente)
const PALS={white:{base:'#ece3d4',b2:'#ddd0bb',spk:null,crack:'#3c3226'},brown:{base:'#c88d5a',b2:'#b0723f',spk:'#6a3a1c',crack:'#2c160a'},
  gold:{base:'#f0c045',b2:'#d99a1c',spk:null,crack:'#3a2200'},giant:{base:'#efe3c8',b2:'#ddcca8',spk:'#b9a47c',crack:'#3a3020'}};
const U=x=>(x+A.L/2)/A.L*TW,V=ph=>(ph+PI)/(2*PI)*TH;   // unidades → píxeis da textura
function shellCanvas(word,stage){const P=PALS[A.kind];const cv=document.createElement('canvas');cv.width=TW;cv.height=TH;const g=cv.getContext('2d');
  let s=A.kind.length*977+3;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};
  g.fillStyle=P.base;g.fillRect(0,0,TW,TH);
  for(let i=0;i<2600;i++){g.fillStyle=r()<.5?P.b2:P.base;g.globalAlpha=0.10+r()*0.18;g.beginPath();g.ellipse(r()*TW,r()*TH,10+r()*50,6+r()*40,r()*3,0,PI*2);g.fill();}
  g.globalAlpha=1;
  if(P.spk)for(let i=0;i<(A.kind==='brown'?2200:900);i++){g.fillStyle=P.spk;g.globalAlpha=0.15+r()*0.45;g.beginPath();g.ellipse(r()*TW,r()*TH,0.8+r()*r()*5,0.8+r()*r()*4,r()*3,0,PI*2);g.fill();}
  g.globalAlpha=1;for(let i=0;i<9000;i++){g.fillStyle=r()<.5?'rgba(255,255,255,0.10)':'rgba(60,40,20,0.06)';g.fillRect(r()*TW,r()*TH,1+r()*2,1+r()*2);}
  if(word){const phf=1.06,xf=-0.04*A.L;const ky=(TH/(2*PI*RM))/(TW/A.L);let fpx=0.34*A.B*(TW/A.L);g.font=`400 ${fpx}px Anton`;const mw=0.52*A.L*(TW/A.L),w0=g.measureText(word).width;if(w0>mw)fpx*=mw/w0;   // a palavra cabe na face da frente
    g.save();g.translate(U(xf),V(phf));g.scale(1,ky);g.textAlign='center';g.textBaseline='middle';g.font=`400 ${fpx}px Anton`;
    // carimbo: moldura oval + letras, tinta com falhas
    const tw=g.measureText(word).width;g.strokeStyle=A.ink;g.globalAlpha=0.9;g.lineWidth=fpx*0.06;g.beginPath();g.ellipse(0,0,tw/2+fpx*0.38,fpx*0.78,0,0,PI*2);g.stroke();
    g.font=`400 ${fpx*0.17}px Mono`;g.fillStyle=A.ink;g.fillText('★ 0 ms ★',0,-fpx*0.58);g.fillText('GRADE A · FRESH',0,fpx*0.6);
    g.font=`400 ${fpx}px Anton`;g.globalAlpha=0.94;g.fillText(word,0,fpx*0.04);g.restore();}
  if(word){// falhas da tinta: pintar pontinhos da cor da casca por cima do carimbo
    const ky=(TH/(2*PI*RM))/(TW/A.L);g.save();g.translate(U(-0.04*A.L),V(1.06));g.scale(1,ky);g.globalCompositeOperation='source-atop';
    for(let i=0;i<700;i++){g.fillStyle=P.base;g.globalAlpha=0.25+r()*0.5;g.beginPath();g.arc((r()-.5)*TW*0.85,(r()-.5)*TW*0.5,0.6+r()*r()*3.5,0,PI*2);g.fill();}g.restore();}
  if(stage>0){// rachas: a partir do ponto do toque (XM, PHC); em unidades (x, arco) convertidas para píxeis
    const arc=a=>a/RM;const pt=(x,a)=>[U(XM+x),V(PHC+arc(a))];
    const line=(ps,w,al)=>{g.lineCap='round';g.lineJoin='round';
      g.strokeStyle='rgba(255,255,255,0.55)';g.lineWidth=w+2.2;g.globalAlpha=al*0.7;g.beginPath();ps.forEach(([x,y],q)=>q?g.lineTo(x+1.3,y+1.6):g.moveTo(x+1.3,y+1.6));g.stroke();
      g.strokeStyle=P.crack;g.lineWidth=w;g.globalAlpha=al;g.beginPath();ps.forEach(([x,y],q)=>q?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.globalAlpha=1;};
    let s2=1234+A.kind.length*7;const r2=()=>{s2=(s2*16807)%2147483647;return s2/2147483647;};
    const walk=(x,a,dir,len,w,depth)=>{const ps=[pt(x,a)];let L0=0;while(L0<len){const st=0.025+r2()*0.03;dir+=(r2()-.5)*0.9;x+=Math.cos(dir)*st;a+=Math.sin(dir)*st;L0+=st;ps.push(pt(x,a));
        if(depth<2&&r2()<0.09)walk(x,a,dir+(r2()<.5?1:-1)*(0.6+r2()*0.6),(len-L0)*0.6,w*0.7,depth+1);}
      line(ps,w,0.92);};
    const sc=stage===1?0.7:1;const NR=stage===1?7:11;
    for(let k=0;k<NR;k++)walk(0,0,k/NR*2*PI+r2()*0.4+(k%2?0.9:0),(0.18+r2()*0.32)*sc*(A.L/2),4.2,0);
    // esmagado no centro do toque: anel de pedacinhos
    for(let k=0;k<14;k++){const a0=k/14*2*PI,rr=0.05+r2()*0.04;line([pt(Math.cos(a0)*rr,Math.sin(a0)*rr),pt(Math.cos(a0+0.5)*rr*1.1,Math.sin(a0+0.5)*rr*1.1)],2.6,0.85);}
    {// racha principal à volta do ovo (onde ele se vai abrir): k=1 já desce pela frente, k=2 dá a volta quase toda
      const ext=stage===1?1.05:2.3;for(const sg of [1,-1]){const ps=[];for(let q=0;q<=80;q++){const ph=PHC+sg*q/80*(sg>0?ext:ext*0.8);ps.push([U(XM+jag(ph)),V(ph)]);}line(ps,4.2,0.95);}}}
  const t=tex(cv);t.flipY=false;t.wrapT=THREE.RepeatWrapping;return t;}
let poreT;{const cv=document.createElement('canvas');cv.width=1024;cv.height=2048;const g=cv.getContext('2d');g.fillStyle='#808080';g.fillRect(0,0,1024,2048);
  for(let i=0;i<60000;i++){const v=rnd()<.6?70:180;g.fillStyle=`rgba(${v},${v},${v},0.22)`;g.beginPath();g.arc(rnd()*1024,rnd()*2048,0.5+rnd()*1.6,0,PI*2);g.fill();}poreT=tex(cv,false);poreT.flipY=false;}
const shellM=new THREE.MeshPhysicalMaterial({roughness:0.62,bumpMap:poreT,bumpScale:0.35,sheen:0.3,sheenRoughness:0.6,sheenColor:new THREE.Color(0xffffff),specularIntensity:0.5,clearcoat:0.08,clearcoatRoughness:0.6});
const memM=new THREE.MeshPhysicalMaterial({color:0xf6f2e6,roughness:0.55,side:THREE.BackSide,sheen:0.4,sheenColor:new THREE.Color(0xffffff)});
const rimM=new THREE.MeshStandardMaterial({color:0xf7f3ea,roughness:0.7,side:THREE.DoubleSide});
const eggGrp=new THREE.Group();rig.add(eggGrp);
let whole=null,wholeBase=null,halves=[];const shards=[],drops=[];
// clara (lente: cúpula de cima + cúpula de baixo que achata quando assenta) e gema
const albM=new THREE.MeshPhysicalMaterial({color:0xf6f0cf,roughness:0.03,metalness:0,transparent:true,opacity:0.66,clearcoat:1,clearcoatRoughness:0.02,specularIntensity:1,envMapIntensity:1.6,depthWrite:false});
const albEdgeM=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:0.05,transparent:true,opacity:0.18,depthWrite:false});
function puddleGeo(seed,sgn){let s=seed;const r=()=>{s=(s*16807)%2147483647;return s/2147483647;};const ph=[r()*9,r()*9,r()*9,r()*9];
  const Rr=a=>1+0.10*Math.sin(3*a+ph[0])+0.07*Math.sin(5*a+ph[1])+0.035*Math.sin(9*a+ph[2])+0.02*Math.sin(15*a+ph[3]);
  const NR=26,NA=160,pos=[],idx=[];pos.push(0,sgn,0);
  for(let i=1;i<=NR;i++){const rho=i/NR;const h=(0.55*Math.pow(1-rho*rho,0.45)+0.45*Math.exp(-((rho/0.4)**2))*(1-rho*rho));for(let j=0;j<NA;j++){const a=j/NA*2*PI,R0=Rr(a);pos.push(rho*R0*Math.cos(a),sgn*h,rho*R0*Math.sin(a));}}
  for(let j=0;j<NA;j++){const a=1+j,b=1+(j+1)%NA;sgn>0?idx.push(0,b,a):idx.push(0,a,b);}
  for(let i=1;i<NR;i++)for(let j=0;j<NA;j++){const a=1+(i-1)*NA+j,b=1+(i-1)*NA+(j+1)%NA,cc=1+i*NA+j,d=1+i*NA+(j+1)%NA;sgn>0?idx.push(a,b,cc,b,d,cc):idx.push(a,cc,b,b,cc,d);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g;}
const albTop=new THREE.Mesh(puddleGeo(77,1),albM),albBot=new THREE.Mesh(puddleGeo(77,-1),albM);albTop.renderOrder=albBot.renderOrder=5;
const albGrp=new THREE.Group();albGrp.add(albTop,albBot);rig.add(albGrp);
const sats=[];for(let i=0;i<7;i++){const m=new THREE.Mesh(puddleGeo(100+i*13,1),albM);m.renderOrder=5;rig.add(m);sats.push({m,a:rnd()*2*PI,d:0.95+rnd()*0.35,s:0.08+rnd()*0.12,td:rnd()*4});}
const yolkM=new THREE.MeshPhysicalMaterial({color:0xff9a08,roughness:0.12,clearcoat:1,clearcoatRoughness:0.04,emissive:0x6a2000,emissiveIntensity:0.35,sheen:0.5,sheenColor:new THREE.Color(0xffd070),specularIntensity:1});
const yolk=new THREE.Mesh(new THREE.SphereGeometry(1,64,40),yolkM);yolk.castShadow=true;rig.add(yolk);
// lascas de casca e gotas de clara
{for(let i=0;i<12;i++){const sh=new THREE.Shape();const n=4+Math.floor(rnd()*3),sz=0.035+rnd()*0.05;for(let q=0;q<n;q++){const a=q/n*2*PI+(rnd()-.5)*0.6,rr=sz*(0.6+rnd()*0.6);q?sh.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):sh.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);}
   const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshStandardMaterial({color:0xf2ece1,roughness:0.6,side:THREE.DoubleSide}));m.castShadow=true;rig.add(m);
   shards.push({m,vx:(rnd()-.5)*2.4,vy:1.2+rnd()*2.6,vz:(rnd()-.3)*2.2,rx:rnd()*20-10,ry:rnd()*20-10,td:rnd()*1.5});}
 const sg=new THREE.SphereGeometry(1,14,10);for(let i=0;i<14;i++){const m=new THREE.Mesh(sg,albM);m.renderOrder=6;rig.add(m);drops.push({m,vx:(rnd()-.5)*3,vy:0.8+rnd()*2.4,vz:(rnd()-.3)*2.4,s:0.018+rnd()*0.03,td:1+rnd()*3});}}
// ---------- níveis ----------
const _v=new THREE.Vector3();
function scr(x,y,z){_v.set(x,y,z).applyMatrix4(rig.matrixWorld).project(cam);return [(_v.x+1)/2*W,(1-_v.y)/2*H];}
let T0=null,T1=null,TC1=null,TC2=null,spoonLoc=null;
function setLevel(i){if(cur===i)return;cur=i;A=attempts[i];
  let best=0;for(let q=0;q<=4000;q++){const x=-A.L/2+A.L*q/4000;const r=eR(x,A);if(r>best){best=r;XM=x;}}RM=best;CY=RM;
  cam.position.set(0,CAMY,CAMZ);cam.lookAt(0,LOOKY,0);cam.updateMatrixWorld(true);rig.updateMatrixWorld(true);
  // ponto da silhueta de cima (visto pela câmara) na secção x=XM
  let bs=1e9;for(let q=0;q<=600;q++){const ph=-0.8+0.9*q/600;const [,sy]=scr(XM,CY+RM*Math.cos(ph),RM*Math.sin(ph));if(sy<bs){bs=sy;PHC=ph;}}ZC=RM*Math.sin(PHC);
  for(const t of [T0,T1,TC1,TC2])if(t)t.dispose();
  T0=shellCanvas(null,0);T1=shellCanvas(A.word,0);TC1=shellCanvas(null,1);TC2=shellCanvas(null,2);
  const P=PALS[A.kind];shellM.map=T0;shellM.color.set(0xffffff);shellM.metalness=A.kind==='gold'?0.75:0;shellM.roughness=A.kind==='gold'?0.3:0.62;shellM.needsUpdate=true;
  for(const s of shards)s.m.material.color.set(P.base),s.m.material.metalness=A.kind==='gold'?0.7:0;
  // geometria
  eggGrp.clear();for(const h of halves)h.grp.removeFromParent();halves=[];
  if(whole)whole.geometry.dispose();
  whole=new THREE.Mesh(shellGeo(()=>0,()=>PI),shellM);whole.castShadow=true;whole.receiveShadow=true;eggGrp.add(whole);wholeBase=whole.geometry.attributes.position.array.slice();
  eggGrp.position.set(0,CY,0);
  for(const sg of [-1,1]){const grp=new THREE.Group();const inner=new THREE.Group();grp.add(inner);rig.add(grp);
    const th0=sg<0?()=>0:ph=>thx(xeR(ph)),th1=sg<0?ph=>thx(xeL(ph)):()=>PI;
    const out=new THREE.Mesh(shellGeo(th0,th1,1,110,140),shellM);out.castShadow=true;out.receiveShadow=true;
    const inn=new THREE.Mesh(shellGeo(th0,th1,0.955,110,140),memM);inn.receiveShadow=true;
    const rm=new THREE.Mesh(rimGeo(sg<0?xeL:xeR),rimM);inner.add(out,inn,rm);halves.push({grp,inner,sg,out});}
  calibrate();}
const BOWL_LOW=0;   // o fundo da concha fica no y local 0 do grupo da colher
function calibrate(){spoon.position.set(XM,0,ZC);spoon.updateMatrixWorld(true);
  // contorno de cima do ovo, por coluna de píxel
  const top=new Float32Array(W+1).fill(1e9);
  for(let a=0;a<=700;a++){const th=a/700*PI;const x=-(A.L/2)*Math.cos(th),r=eR(x,A);for(let b=0;b<=360;b++){const ph=-PI/2+PI*b/360;
    const [sx,sy]=scr(x,CY+r*Math.cos(ph),r*Math.sin(ph));const ix=Math.round(sx);if(ix>=0&&ix<=W&&sy<top[ix])top[ix]=sy;}}
  const loc=[];const inv=new THREE.Matrix4().copy(spoon.matrixWorld).invert();spoon.traverse(o=>{if(!o.isMesh)return;o.updateMatrixWorld(true);const m=new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld);
    const p=o.geometry.attributes.position;for(let q=0;q<p.count;q++){_v.fromBufferAttribute(p,q).applyMatrix4(m);// para o referencial do rig (rotação y da colher)
      const cs=Math.cos(SRY),sn=Math.sin(SRY);loc.push(_v.x*cs+_v.z*sn,_v.y,-_v.x*sn+_v.z*cs);}});
  spoonLoc=loc;
  const over=y=>{let w=-1e9;for(let q=0;q<loc.length;q+=3){const [sx,sy]=scr(loc[q]+XM,loc[q+1]+y,loc[q+2]+ZC);const ix=Math.round(sx);if(ix>=0&&ix<=W&&top[ix]<1e8)w=Math.max(w,sy-top[ix]);}return w;};
  let lo=CY+RM-0.4,hi=CY+RM+0.4;for(let it=0;it<34;it++){const mid=(lo+hi)/2;if(over(mid)>0.5)lo=mid;else hi=mid;}YC=hi;
  // controlo 3D: vértices da colher dentro do ovo / folga mínima
  const ins=y=>{let n=0,gap=1e9;for(let q=0;q<loc.length;q+=3){const x=loc[q]+XM,yy=loc[q+1]+y-CY,z=loc[q+2]+ZC;const rr=Math.hypot(yy,z),e=eR(x,A);if(rr<e)n++;gap=Math.min(gap,rr-e);}return [n,+gap.toFixed(4)];};
  console.error("CAL "+JSON.stringify({lvl:cur,ZC:+ZC.toFixed(3),PHC:+PHC.toFixed(3),dY:+(YC-CY-RM).toFixed(4),over0:+over(YC).toFixed(2),overPrev:[78,57,42,30].map(n=>+over(YC+D/n).toFixed(2)),ins0:ins(YC),insPrev:ins(YC+D/30)}));}
function dent(depth){const p=whole.geometry.attributes.position,b=wholeBase;const cx=XM,cy=RM*Math.cos(PHC),cz=RM*Math.sin(PHC);const rd=0.30*(A.B/1.5);
  for(let q=0;q<p.count;q++){const x=b[3*q],y=b[3*q+1],z=b[3*q+2];let nx=x,ny=y,nz=z;if(depth>0){const d=Math.hypot(x-cx,y-cy,z-cz);if(d<rd){const f=(1-(d/rd)**2)**2*depth;const rr=Math.hypot(y,z)||1;ny=y-y/rr*f;nz=z-z/rr*f;}}p.setXYZ(q,nx,ny,nz);}
  p.needsUpdate=true;whole.geometry.computeVertexNormals();}
let dented=-1;
function placeHalves(kf){const t=Math.max(0,(kf-2.5)/30);const e=1-Math.pow(1-Math.min(1,t/0.38),3);
  const inv=new THREE.Matrix4();const v=new THREE.Vector3();rig.updateMatrixWorld(true);inv.copy(rig.matrixWorld).invert();
  for(const h of halves){h.grp.position.set(0,CY,0);h.grp.rotation.set(0,0,0);h.inner.rotation.set(h.sg*0.18*e,h.sg*0.10*e,-h.sg*0.30*e);h.grp.updateMatrixWorld(true);
    const pts=h.out.geometry.attributes.position;const M=h.out.matrixWorld;let minY=1e9,minX=1e9,maxX=-1e9;
    for(let q=0;q<pts.count;q+=5){v.fromBufferAttribute(pts,q).applyMatrix4(M).applyMatrix4(inv);minY=Math.min(minY,v.y);minX=Math.min(minX,v.x);maxX=Math.max(maxX,v.x);}
    h.grp.position.y+=-minY*e;   // assenta na ardósia aos poucos
    h.grp.position.x+=h.sg*(0.015+e*0.42*(A.L/2));h.grp.position.z+=(h.sg>0?0.18:-0.30)*e;}}
function draw(st){const T=st.f/st.fps;const i=st.i;setLevel(i);
  scene.environmentRotation.y=T*0.3;
  let mode='whole',sy=0,kf=0;   // sy: altura do fundo da concha
  if(st.phase==='approach'||st.phase==='contact'){sy=YC+D*(1-st.u);}
  else if(st.phase==='next'){sy=YC+D;}
  else if(st.phase==='after'){kf=st.k;mode=kf<3?'crack':'open';}
  else{const p=st.rw/0.7;if(p<0.5){kf=1+(25-1)*(1-p/0.5);mode=kf<3?'crack':'open';}else{sy=YC+D*K.inout((p-0.5)/0.5);}}
  if(mode!=='whole'){// colher: carrega (covinha) → atravessa → levanta
    if(kf<3)sy=YC-0.035*kf;
    else if(kf<7)sy=YC-0.07-(YC-0.07-(CY+0.12*RM))*K.ease((kf-3)/4);
    else sy=(CY+0.12*RM)+(YC+0.55-(CY+0.12*RM))*K.inout(Math.min(1,(kf-7)/16));}
  spoon.position.set(XM,sy,ZC);
  // ovo
  whole.visible=mode!=='open';for(const h of halves)h.grp.visible=mode==='open';
  const dd=mode==='crack'?0.035*kf:0;if(dd!==dented){dent(dd);dented=dd;}
  shellM.map=st.phase==='contact'?T1:mode==='whole'?T0:kf<2?TC1:TC2;shellM.needsUpdate=true;
  eggGrp.scale.setScalar(st.phase==='next'?0.7+0.3*K.ease(st.w):1);eggGrp.position.y=CY*(st.phase==='next'?0.7+0.3*K.ease(st.w):1);
  if(mode==='open')placeHalves(kf);
  // clara + gema
  const on=mode==='open';albGrp.visible=on;yolk.visible=on;
  const YR=0.31*(A.B/1.5);yolk.scale.set(YR,YR*0.82,YR);
  if(on){const fall=Math.min(1,Math.max(0,(kf-3)/4))**2;const sp=1-Math.pow(1-Math.min(1,(kf-3)/20),3);const sl=1-Math.pow(1-Math.min(1,(kf-3)/7),2);
    const S=(0.55+(1.55-0.55)*sp)*RM,Ht=(0.75-(0.75-0.2)*sl)*RM*(A.kind==='giant'?0.85:1);const y0=(CY-0.55*RM)*(1-fall)+0.004*fall;
    albGrp.position.set(XM+0.05,y0,0.05);albTop.scale.set(S,Ht,S*0.92);albBot.scale.set(S,Math.max(0.001,0.55*Ht*(1-fall)),S*0.92);
    const land=Math.max(0,(kf-6)/30);const wob=1-0.16*Math.sin(land*30)*Math.exp(-land*7);
    yolk.scale.set(YR/Math.sqrt(wob),YR*0.82*wob,YR/Math.sqrt(wob));yolk.position.set(XM+0.02,y0+Ht*0.62+YR*0.8*wob,0.02);
    for(const s of sats){const q=Math.min(1,Math.max(0,(kf-6-s.td)/8));s.m.visible=q>0;s.m.position.set(XM+0.05+Math.cos(s.a)*S*s.d,0.004,0.05+Math.sin(s.a)*S*s.d*0.92);s.m.scale.set(s.s*RM*q,0.05*RM*q,s.s*RM*q);}}
  else for(const s of sats)s.m.visible=false;
  // lascas e gotas (balística, assentam na ardósia)
  const G=-12,P0=[XM,CY+RM*Math.cos(PHC),ZC];
  for(const s of shards){const tt=(kf-1-s.td)/30;if(mode==='whole'||tt<=0){s.m.visible=false;continue;}s.m.visible=true;
    const th=(s.vy+Math.sqrt(s.vy*s.vy-2*G*P0[1]))/(-G);const t2=Math.min(tt,th);
    s.m.position.set(P0[0]+s.vx*t2,Math.max(0.006,P0[1]+s.vy*t2+0.5*G*t2*t2),P0[2]+s.vz*t2);
    if(tt<th)s.m.rotation.set(s.rx*tt,s.ry*tt,0);else s.m.rotation.set(-PI/2,0,s.ry);}
  for(const d of drops){const tt=(kf-1-d.td)/30;if(!on||tt<=0){d.m.visible=false;continue;}d.m.visible=true;
    const p1=CY*0.8;const th=(d.vy+Math.sqrt(d.vy*d.vy-2*G*p1))/(-G);
    if(tt<th){d.m.position.set(XM+d.vx*tt,p1+d.vy*tt+0.5*G*tt*tt,d.vz*tt);const v=Math.hypot(d.vx,d.vy+G*tt);d.m.scale.set(d.s,d.s*(1+Math.min(1.6,v*0.3)),d.s);}
    else{d.m.position.set(XM+d.vx*th,0.004,d.vz*th);d.m.scale.set(d.s*2.4,d.s*0.35,d.s*2.4);}}
  // tremor no impacto
  const shk=mode!=='whole'&&kf<6?(6-kf)/6*0.025:0;cam.position.set(Math.sin(st.f*2.1)*shk,CAMY+Math.cos(st.f*2.7)*shk,CAMZ);cam.lookAt(0,LOOKY,0);
  R.render(scene,cam);c.drawImage(R.domElement,0,0);
  {const g=c.createRadialGradient(W/2,H*0.5,H*0.25,W/2,H*0.5,H*0.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0.55)');c.fillStyle=g;c.fillRect(0,0,W,H);}
  if(st.phase==='after'&&st.k>=1&&st.k<=2){c.fillStyle=`rgba(255,250,235,${0.16*(1-(st.k-1)/2)})`;c.fillRect(0,0,W,H);}}
return {tag:'REFLEX TEST · LEVEL UP',h2:'BEFORE THE EGG CRACKS 🥚',ask:'WHICH EGG WOULD YOU CRACK? 🥄<br><span style="font-size:32px">the secret word only shows at <b style="color:#d6141f">0ms</b> 👀</span>',attempts,draw};};
