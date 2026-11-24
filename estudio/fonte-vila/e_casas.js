// =================== GARAGENS & BONECOS ===================
const GAR=[
  {id:'ana',label:'NÚMEROS',col:0x6c4cf0,x:-16,z:-8},
  {id:'gui',label:'GUIÃO',col:0xf4b400,x:-8,z:-8},
  {id:'rea',label:'ESTÚDIO',col:0x0ca678,x:0,z:-8},
  {id:'eng',label:'LAB 0MS',col:0xe03131,x:8,z:-8},
  {id:'car',label:'CORREIO',col:0x2e5fb0,x:-12,z:6},
  {id:'ide',label:'IDEIAS',col:0xff8c1a,x:-4,z:6},
  {id:'des',label:'DESAFIOS',col:0x1f9d55,x:4,z:6},
  {id:'por',label:'COMENTÁRIOS',col:0xe64980,x:12,z:6}];
const GBY={};for(const g of GAR)GBY[g.id]=g;
const CH=[
  {id:'car',name:'Carteiro',sub:'Agenda · mudar hora e pausar',shirt:0x2e5fb0,pants:0x23304f,hat:0x2e5fb0,hair:0x3a2a1a,cap:true,loc:[-0.6,-0.2],sec:'sec-car'},
  {id:'des',name:'Desafios',sub:'Desafios em imagem',shirt:0x1f9d55,pants:0x2b2d55,hat:0x6b3d1f,hair:0x6b3d1f,loc:[-0.9,-0.2],sec:'sec-des'},
  {id:'gui',name:'Guionista',sub:'Produção e a tua voz',shirt:0xf4b400,pants:0x2b2d55,hat:0x2a1a0e,hair:0x2a1a0e,glasses:true,loc:[0,-0.2],sec:'sec-gui'},
  {id:'rea',name:'Realizador',sub:'Vídeos dos últimos 28 dias',shirt:0x0ca678,pants:0x1d1838,hat:0x111111,hair:0x111111,beret:true,loc:[-1.1,-0.1],sec:'sec-rea'},
  {id:'eng',name:'Engenheiro',sub:'Trial reels vs normais',shirt:0xe03131,pants:0x1d1838,hat:0xffd21f,hair:0x111111,helmet:true,loc:[-1.4,-0.2],sec:'sec-eng'},
  {id:'ana',name:'Analista',sub:'Números e gráficos',shirt:0x6c4cf0,pants:0x2b2d55,hat:0x3a2a1a,hair:0x3a2a1a,glasses:true,loc:[0,0.6],sec:'sec-ana'},
  {id:'por',name:'Porta-voz',sub:'Comentários de IG, TikTok e YouTube',shirt:0xe64980,pants:0x2b2d55,hat:0x1d1838,hair:0x1d1838,headset:true,loc:[-0.6,-0.2],sec:'sec-por'},
  {id:'ide',name:'Ideias',sub:'Escolhe e manda produzir',shirt:0xff8c1a,pants:0x2b2d55,hat:0x7a3a10,hair:0x7a3a10,loc:[0,0.2],sec:'sec-ide'}];
for(const c of CH){const g=GBY[c.id];c.home=[g.x+c.loc[0],g.z+c.loc[1]];c.face=Math.PI;}
const hex=n=>'#'+n.toString(16).padStart(6,'0');
function avatarTo(cv,c){const x=cv.getContext('2d');x.clearRect(0,0,16,16);const p=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h);};
  p(5,1,6,6,'#f2c39c');p(5,1,6,2,hex(c.hat));p(6,4,1,1,'#1d1838');p(9,4,1,1,'#1d1838');if(c.glasses){p(5,4,3,1,'#1d1838');p(8,4,3,1,'#1d1838');}
  p(4,7,8,5,hex(c.shirt));p(3,8,1,3,'#f2c39c');p(12,8,1,3,'#f2c39c');p(5,12,3,3,hex(c.pants));p(8,12,3,3,hex(c.pants));}
for(const c of CH){const b=document.createElement('button');b.type='button';b.dataset.id=c.id;b.setAttribute('aria-pressed','false');b.title=c.sub;
  const cv=document.createElement('canvas');cv.width=cv.height=16;avatarTo(cv,c);const dot=document.createElement('span');dot.className='dot';dot.hidden=true;
  b.append(cv,document.createTextNode(c.name),dot);$('dock').append(b);}
$('dock').addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)select(CH.find(c=>c.id===b.dataset.id),true);});
$('dclose').addEventListener('click',()=>{select(null);if(window.__unfade)window.__unfade();});
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('modal').hidden)select(null);});
let selected=null,say=()=>{},flyTo=()=>{};
function select(c,fly){selected=c;for(const b of $('dock').children)b.setAttribute('aria-pressed',String(!!c&&b.dataset.id===c.id));
  if(!c){$('drawer').classList.remove('open');$('bubble').classList.remove('on');return;}
  $('dtitle').textContent=c.name;$('dsub').textContent=c.sub;avatarTo($('dav'),c);
  for(const x of CH)$(x.sec).hidden=x!==c;$('dbody').scrollTop=0;$('drawer').classList.add('open');c.jump=0.001;say(c);if(fly)flyTo(c);}
setTabs();

// =================== VILA 3D ===================
(function(){
  if(!window.THREE){$('stage').innerHTML='<div class="nogl">Não consegui carregar o 3D. Usa os bonecos lá em baixo.</div>';return;}
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true,powerPreference:'high-performance'});}catch(e){$('stage').innerHTML='<div class="nogl">Este dispositivo não deixa usar 3D aqui.</div>';return;}
  const mobile=matchMedia('(max-width:700px)').matches;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(30,1,0.5,400);
  const controls=new THREE.OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.maxPolarAngle=1.42;controls.minDistance=6;controls.maxDistance=120;
  const grad=(()=>{const d=new Uint8Array([110,180,255]);const t=new THREE.DataTexture(d,3,1,THREE.LuminanceFormat);t.minFilter=t.magFilter=THREE.NearestFilter;t.needsUpdate=true;return t;})();
  const mc={};const M=(c,o={})=>{const k=c+JSON.stringify(o);return mc[k]||(mc[k]=new THREE.MeshToonMaterial(Object.assign({color:c,gradientMap:grad},o)));};
  const gc={};const BG=(w,h,d)=>{const k=w+'_'+h+'_'+d;return gc[k]||(gc[k]=new THREE.BoxGeometry(w,h,d));};
  function B(w,h,d,col,x,y,z,parent=scene,o={}){const m=new THREE.Mesh(BG(w,h,d),col&&col.isMaterial?col:M(col,o.mat||{}));m.position.set(x,y,z);m.castShadow=o.cast!==false;m.receiveShadow=true;parent.add(m);return m;}
  function G(x=0,y=0,z=0,parent=scene){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
  function CT(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const t=new THREE.CanvasTexture(c);t.anisotropy=4;return {c,x:c.getContext('2d'),t};}
  function plane(w,h,tex,x,y,z,ry=0,parent=scene){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex}));m.position.set(x,y,z);m.rotation.y=ry;parent.add(m);return m;}
  const signs=[];function signTex(text,bg,fg,w=512,h=128,font=64){const s=CT(w,h);s.redraw=()=>{s.x.fillStyle=bg;s.x.fillRect(0,0,w,h);s.x.fillStyle=fg;s.x.font=`bold ${font}px Silkscreen, monospace`;s.x.textAlign='center';s.x.textBaseline='middle';s.x.fillText(text,w/2,h/2+4);s.t.needsUpdate=true;};s.redraw();signs.push(s);return s;}
  const occluders=[];

  // ---------- luz e céu ----------
  const hemi=new THREE.HemisphereLight(0xdfefff,0x6a8a50,0.7);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff2dc,0.95);sun.castShadow=true;sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);
  Object.assign(sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:140});sun.shadow.bias=-0.0006;sun.shadow.normalBias=0.02;scene.add(sun);scene.add(sun.target);sun.target.position.set(-4,0,-6);
  const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(0x6ab8ff)},bot:{value:new THREE.Color(0xdff1ff)}},
    vertexShader:'varying float h;void main(){h=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform vec3 top;uniform vec3 bot;varying float h;void main(){gl_FragColor=vec4(mix(bot,top,clamp(h*1.6+.1,0.,1.)),1.);}'});
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(200,24,12),skyMat));
  const stars=new THREE.Points((()=>{const g=new THREE.BufferGeometry();const p=[];for(let i=0;i<400;i++){const t=Math.random()*Math.PI*2,u=Math.random()*0.9+0.1;p.push(Math.cos(t)*190*Math.sqrt(1-u*u),u*190,Math.sin(t)*190*Math.sqrt(1-u*u));}g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));return g;})(),new THREE.PointsMaterial({color:0xffffff,size:1.2,sizeAttenuation:false,transparent:true,opacity:0}));scene.add(stars);

  // ---------- terreno ----------
  B(90,0.4,140,0x74c05a,4,-0.42,0,scene,{cast:false});
  const seaGeo=new THREE.PlaneGeometry(120,260,24,60);seaGeo.rotateX(-Math.PI/2);const sea=new THREE.Mesh(seaGeo,new THREE.MeshToonMaterial({color:0x2f8fd8,gradientMap:grad,transparent:true,opacity:.95}));sea.position.set(-100,-0.5,0);scene.add(sea);const seaBase=seaGeo.attributes.position.array.slice();
  B(3,0.5,140,0xf2dca5,-41.5,-0.38,0,scene,{cast:false});
  const mountMat=[M(0x3f8f4a),M(0x4f9e52),M(0x2f7a3e)];
  for(let i=0;i<14;i++){const h=18+((i*37)%17),r=14+((i*13)%9);const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,6+(i%3)),mountMat[i%3]);m.position.set(-80+i*14,h/2-1,-62-((i*29)%25));m.rotation.y=i;scene.add(m);
    if(h>28){const cap=new THREE.Mesh(new THREE.ConeGeometry(r*0.28,h*0.28,6+(i%3)),M(0xf4f4f4));cap.position.set(m.position.x,h-1-h*0.14,m.position.z);cap.rotation.y=i;scene.add(cap);}}
  for(let i=0;i<22;i++){const x=-50+((i*41)%110),z=-34-((i*17)%20);const g=G(x,0,z);B(2.2,1.6,2,0xf7f3ea,0,0.8,0,g);const roof=new THREE.Mesh(new THREE.ConeGeometry(1.75,1,4),M(0xd9622b));roof.position.y=2.1;roof.rotation.y=Math.PI/4;roof.castShadow=true;g.add(roof);}
  // praça
  const pv=CT(64,64);{const x=pv.x;x.fillStyle='#d9d2c3';x.fillRect(0,0,64,64);x.fillStyle='#c9c0ae';for(let i=0;i<64;i+=16)for(let j=0;j<64;j+=16)if((i+j)%32===0)x.fillRect(i,j,16,16);pv.t.wrapS=pv.t.wrapT=THREE.RepeatWrapping;pv.t.repeat.set(10,5);pv.t.magFilter=THREE.NearestFilter;}
  {const m=new THREE.Mesh(new THREE.BoxGeometry(34,0.1,9),new THREE.MeshToonMaterial({map:pv.t,gradientMap:grad}));m.position.set(-4,-0.17,-1);m.receiveShadow=true;scene.add(m);}
  // fonte no meio da praça
  {const g=G(-4,0,-1);B(2.6,0.5,2.6,0xe8e2d4,0,0.25,0,g);const w=B(2.2,0.1,2.2,0x4dabf7,0,0.48,0,g,{cast:false,mat:{transparent:true,opacity:.85}});B(0.4,1.1,0.4,0xe8e2d4,0,0.8,0,g);B(0.9,0.15,0.9,0xe8e2d4,0,1.35,0,g);}
  // rua atrás
  const RZ=-17,XW=-12;B(90,0.06,7,0x5b6075,0,-0.2,RZ,scene,{cast:false});
  for(let x=-42;x<=42;x+=4)B(1.8,0.07,0.25,0xf5f5f5,x,-0.17,RZ,scene,{cast:false});
  B(90,0.25,1.6,0xc9ccd6,0,-0.08,RZ+4.3,scene,{cast:false});B(90,0.25,1.6,0xc9ccd6,0,-0.08,RZ-4.3,scene,{cast:false});
  for(let i=0;i<6;i++)B(0.6,0.08,5.6,0xffffff,XW-2.2+i*0.9,-0.15,RZ,scene,{cast:false});
  const lamps=[];for(const [x,z] of [[-20,-1],[-4,2.6],[12,-1],[-22,RZ+4.6],[-4,RZ+4.6],[10,RZ+4.6]]){const g=G(x,0,z);B(0.16,4.2,0.16,0x2b2d3a,0,2.1,0,g);B(1,0.12,0.16,0x2b2d3a,0.45,4.2,0,g);lamps.push(B(0.36,0.14,0.3,0xfff2b0,0.85,4.1,0,g,{mat:{emissive:0x000000}}));}
  const lampLights=[[-4,-1],[-4,RZ+3.8]].map(([x,z])=>{const l=new THREE.PointLight(0xffd59a,0,16,1.6);l.position.set(x,4,z);scene.add(l);return l;});
  function tree(x,z,s=1){const g=G(x,0,z);B(0.35*s,1.4*s,0.35*s,0x7a4b2a,0,0.7*s,0,g);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2*s,0),M([0x3c9a48,0x47ad52,0x2f8a3e][Math.abs(Math.round(x*z))%3]));c.position.y=2.1*s;c.castShadow=true;g.add(c);}
  for(const [x,z,s] of [[-22,-3,1.3],[-20,7,1.1],[13,-2,1.2],[17,11,1],[-18,14,1.2],[6,14,1],[-2,15,1.3],[14,-11,1.1],[-26,-10,1.4],[17,5,1.2],[-12,15,1],[20,14,1.3],[-28,3,1.2]])tree(x,z,s);
  for(let i=0;i<5;i++){const g=G(-17+i*7,0,12.6);B(1.4,0.5,0.6,0x6a4425,0,0.25,0,g);for(let j=0;j<3;j++)B(0.2,0.2,0.2,[0xff6b9a,0xffd21f,0xffffff][(i+j)%3],-0.4+j*0.4,0.6,0,g);}
  {const g=G(-4,0,1.6);B(1.8,0.12,0.5,0x9a6a3f,0,0.5,0,g);B(1.8,0.5,0.1,0x9a6a3f,0,0.8,0.25,g);B(0.1,0.5,0.4,0x333333,-0.8,0.25,0,g);B(0.1,0.5,0.4,0x333333,0.8,0.25,0,g);}
  const cars=[];const carCols=[0xe03131,0xffd21f,0x1c7ed6,0xffffff,0x0ca678];
  for(let i=0;i<5;i++){const g=G(-40+i*17,0,RZ+(i%2?-1.6:1.6));const c=carCols[i];B(1.6,0.7,3,c,0,0.55,0,g);B(1.4,0.6,1.6,c,0,1.15,-0.1,g);B(1.42,0.45,1.5,0x9fd8ff,0,1.15,-0.1,g,{cast:false});
    for(const [a,b] of [[-0.8,-1],[0.8,-1],[-0.8,1],[0.8,1]])B(0.25,0.5,0.5,0x1d1d1d,a,0.25,b,g);
    const hl=B(1.2,0.18,0.06,0xfff6c0,0,0.62,i%2?-1.52:1.52,g,{cast:false});g.rotation.y=i%2?-Math.PI/2:Math.PI/2;cars.push({g,dir:i%2?-1:1,speed:5+i,hl});}

  // ---------- GARAGENS ----------
  const garLights=[];const scr={};
  function garage(gd){const g=G(gd.x,0,gd.z);gd.g=g;const W=5.2,D=4.6,H=3.4;const wall=0xf7f3ea;
    B(W,0.06,D,0xcfc9bb,0,0.03,0,g,{cast:false});
    occluders.push(B(W,H,0.2,wall,0,H/2,-D/2,g),B(0.2,H,D,wall,-W/2,H/2,0,g),B(0.2,H,D,wall,W/2,H/2,0,g));
    // janelas laterais
    for(const sx of [-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(1.4,0.9),new THREE.MeshBasicMaterial({color:0xbfe3ff}));w.position.set(sx*(W/2+0.11),1.9,-0.3);w.rotation.y=sx*Math.PI/2;g.add(w);gd.wins=(gd.wins||[]).concat(w);B(0.06,1.05,1.55,0xffffff,sx*(W/2+0.1),1.9,-0.3,g,{cast:false});}
    // frente: pilares, verga e portão enrolado
    B(0.3,H,0.3,wall,-W/2+0.05,H/2,D/2,g);B(0.3,H,0.3,wall,W/2-0.05,H/2,D/2,g);
    const FM=c=>new THREE.MeshToonMaterial({color:c,gradientMap:grad,transparent:true,opacity:1});gd.fade=[];
    gd.fade.push(B(W+0.1,0.45,0.3,FM(wall),0,H-0.02,D/2,g));
    const roll=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,W-0.4,14),FM(gd.col));gd.fade.push(roll);roll.rotation.z=Math.PI/2;roll.position.set(0,H-0.4,D/2-0.3);roll.castShadow=true;g.add(roll);
    const s=signTex(gd.label,hex(gd.col),'#ffffff',512,128,60);const sp=plane(2.2,0.42,s.t,0,H-0.05,D/2+0.17,0,g);sp.material.transparent=true;gd.fade.push(sp);
    // telhado de duas águas (telha laranja à madeirense)
    const rf=FM(0xd9622b);const r1=B(W+0.6,0.16,D/2+0.55,rf,0,H+0.55,-D/4-0.12,g);r1.rotation.x=0.42;const r2=B(W+0.6,0.16,D/2+0.55,rf,0,H+0.55,D/4+0.12,g);r2.rotation.x=-0.42;occluders.push(r1,r2);gd.fade.push(r1,r2);gd.op=1;gd.opT=1;
    const tri=new THREE.Shape();tri.moveTo(-D/2,0);tri.lineTo(D/2,0);tri.lineTo(0,0.9);tri.lineTo(-D/2,0);const tg=new THREE.ExtrudeGeometry(tri,{depth:0.18,bevelEnabled:false});
    for(const sx of [-1,1]){const t=new THREE.Mesh(tg,FM(wall));gd.fade.push(t);t.rotation.y=Math.PI/2;t.position.set(sx*(W/2)-(sx>0?0.18:0),H,0);t.castShadow=true;g.add(t);}
    // entrada
    B(W,0.04,2.6,0xb9b2a3,0,0.0,D/2+1.3,g,{cast:false});
    // luz de teto
    B(1.6,0.06,0.4,0xfffbe8,0,H-0.1,-0.4,g,{cast:false,mat:{emissive:0xfff2c8}});
    const L=new THREE.PointLight(0xffe2b0,0.2,6,1.8);L.position.set(0,H-0.6,0);g.add(L);garLights.push(L);
    return g;}
  GAR.forEach(garage);
  function desk(parent,x,z,w=1.8){const g=G(x,0,z,parent);B(w,0.1,0.9,0x9a6a3f,0,1.0,0,g);for(const [a,b] of [[-w/2+0.08,-0.36],[w/2-0.08,-0.36],[-w/2+0.08,0.36],[w/2-0.08,0.36]])B(0.08,1,0.08,0x6a4425,a,0.5,b,g);return g;}
  function screenOn(parent,w,h,x,y,z,ry=0){const g=G(x,y,z,parent);g.rotation.y=ry;B(w+0.1,h+0.1,0.06,0x1d1838,0,0,0,g);const s=CT(256,Math.round(256*h/w));plane(w,h,s.t,0,0,0.04,0,g);B(0.08,0.3,0.08,0x1d1838,0,-h/2-0.15,0,g);return s;}
  function wallTV(parent,w,h,x,y,z,ry=0,cw=512){const g=G(x,y,z,parent);g.rotation.y=ry;B(w+0.14,h+0.14,0.08,0x111111,0,0,0,g);const s=CT(cw,Math.round(cw*h/w));plane(w,h,s.t,0,0,0.05,0,g);return s;}
  // CORREIO
  {const g=GBY.car.g;const d=desk(g,-0.6,-1.3);scr.car=screenOn(d,1.1,0.66,-0.3,1.52,-0.2);for(let i=0;i<4;i++)B(0.4,0.04,0.3,0xf4e3c3,0.55,1.08+i*0.05,0.1,d);
    ['#d6336c','#111111','#e62117','#1877f2'].forEach((c,i)=>{const col=parseInt(c.slice(1),16);for(let r=0;r<3;r++)B(0.5,0.55,0.7,col,2.05,0.35+r*0.6,-1.6+i*0.8,g);});
    for(let i=0;i<3;i++)B(0.6,0.45,0.6,[0xc98f55,0xd9a066,0xb8804a][i],-1.9,0.23+i*0.46,1.4-i*0.1,g);
    const mb=G(2.9,0,2.9,g);B(0.6,1,0.5,0xffd21f,0,0.5,0,mb);B(0.62,0.18,0.52,0xe03131,0,1.05,0,mb);}
  // DESAFIOS
  {const g=GBY.des.g;const d=desk(g,-0.9,-1.4,1.6);scr.des=screenOn(d,1,0.6,0,1.48,-0.2);
    const e=G(1.2,0,-1.3,g);B(0.07,2.3,0.07,0x8a5a33,-0.5,1.15,0,e).rotation.z=0.1;B(0.07,2.3,0.07,0x8a5a33,0.5,1.15,0,e).rotation.z=-0.1;scr.easel=CT(256,256);plane(1.2,1.2,scr.easel.t,0,1.7,0.06,0,e);
    scr.shapes=[new THREE.Mesh(new THREE.ConeGeometry(0.4,0.75,3),M(0xe03131)),new THREE.Mesh(new THREE.BoxGeometry(0.55,0.55,0.55),M(0x1c7ed6)),new THREE.Mesh(new THREE.SphereGeometry(0.34,16,12),M(0xffd21f))];
    scr.shapes.forEach((m,i)=>{m.position.set(-1.4+i*1.4,0.7,3.6);m.castShadow=true;g.add(m);});}
  // GUIÃO (2 Factos)
  {const g=GBY.gui.g;const d=desk(g,0,-1.4,2);scr.gui=screenOn(d,1,0.62,0.45,1.5,-0.2);B(0.6,0.26,0.45,0x2b2d3a,-0.5,1.18,0,d);scr.paper=B(0.4,0.5,0.02,0xffffff,-0.5,1.5,-0.1,d,{cast:false});
    const sh=G(-2.05,0,0.4,g);B(0.4,2.2,1.6,0x8a5a33,0,1.1,0,sh);for(let r=0;r<4;r++)for(let k=0;k<5;k++)B(0.3,0.38,0.12,[0xe03131,0x1c7ed6,0xffd21f,0x0ca678,0x6c4cf0][(r+k)%5],0.05,0.3+r*0.52,-0.6+k*0.28,sh,{cast:false});
    for(let i=0;i<9;i++){B(0.34,0.3,0.02,[0x1f9d55,0xffd21f,0x1c7ed6][i%3],-2.1+i*0.52,2.55-Math.sin(i/8*Math.PI)*0.25,2.4,g,{cast:false});}}
  // ESTÚDIO (2 Factos)
  {const g=GBY.rea.g;B(4.4,2.6,0.06,0x2fd15a,0,1.4,-2.05,g,{cast:false});const d=desk(g,-1.1,-1.3,1.8);scr.rea=screenOn(d,0.9,0.55,-0.4,1.45,-0.2);scr.rea2=screenOn(d,0.8,0.5,0.5,1.42,-0.15,-0.3);
    const cg=G(1.2,0,0.5,g);for(const a of [0,2.1,4.2]){const l=B(0.05,1.5,0.05,0x222222,Math.sin(a)*0.28,0.72,Math.cos(a)*0.28,cg);l.rotation.set(Math.cos(a)*0.2,0,-Math.sin(a)*0.2);}
    const cm=G(0,1.6,0,cg);B(0.4,0.34,0.6,0x222222,0,0,0,cm);B(0.26,0.26,0.22,0x444444,0,0,-0.4,cm);scr.rec=B(0.08,0.08,0.08,0xe03131,0.12,0.22,0.18,cm,{cast:false,mat:{emissive:0xe03131}});
    scr.tv2f=wallTV(g,1.8,1.05,-2.3,1.9,0.6,Math.PI/2);}
  // LAB 0MS (Hit0Ms)
  const rig=G(0.9,0,-0.9,GBY.eng.g);{for(const [a,b] of [[-1,-0.6],[1,-0.6],[-1,0.6],[1,0.6]])B(0.1,2.5,0.1,0x777e95,a,1.25,b,rig);B(2.2,0.1,1.3,0x777e95,0,2.5,0,rig);B(2,0.03,1.2,0xffffff,0,0.07,0,rig,{cast:false});}
  const msS=CT(256,96);plane(1.2,0.45,msS.t,0,2.8,0.66,0,rig);
  const dropGeo=[new THREE.BoxGeometry(0.34,0.34,0.34),new THREE.SphereGeometry(0.2,12,10),new THREE.CylinderGeometry(0.17,0.17,0.34,10),new THREE.ConeGeometry(0.2,0.38,10)];
  const drops=[0,1,2,3].map(i=>{const m=new THREE.Mesh(dropGeo[i],M([0xff6b6b,0xffd21f,0x4dabf7,0x69db7c][i]));m.castShadow=true;m.position.set(-0.7+i*0.47,2.2,0);rig.add(m);return {m,y:2.2,v:0,t:-i*0.7,state:'wait'};});
  const splats=[];
  {const g=GBY.eng.g;const d=desk(g,-1.4,-1.4,1.5);scr.eng=screenOn(d,0.9,0.55,0,1.45,-0.2);scr.tvh=wallTV(g,1.8,1.05,-2.3,1.9,0.6,Math.PI/2);}
  // NÚMEROS
  {const g=GBY.ana.g;scr.bill=wallTV(g,4.2,2.2,0,1.75,-2.05,0,1024);const d=desk(g,0,-0.5,1.6);scr.ana=screenOn(d,0.9,0.55,0,1.45,-0.2);}
  // COMENTÁRIOS
  {const g=GBY.por.g;const d=desk(g,-0.6,-1.4,1.8);scr.por=screenOn(d,1,0.6,0,1.48,-0.2);
    const bub=G(1.4,0,-1.2,g);scr.bubbles=[];[[0xffffff,0.2,1.9],[0xffd21f,-0.3,1.3],[0x4dabf7,0.5,0.8]].forEach(([c,x,y],i)=>{const m=B(0.9,0.5,0.1,c,x,y,0,bub);B(0.16,0.16,0.1,c,x-0.25,y-0.3,0,bub,{cast:false});scr.bubbles.push(m);});
    const sb=G(0,4.5,0,g);B(1.6,0.9,0.2,0xe64980,0,0,0,sb);B(0.3,0.3,0.2,0xe64980,-0.5,-0.55,0,sb);for(let i=0;i<3;i++)B(0.18,0.18,0.22,0xffffff,-0.4+i*0.4,0,0,sb,{cast:false});scr.roofBubble=sb;}
  // IDEIAS
  {const g=GBY.ide.g;B(3.4,2,0.06,0xb0b0c0,0,1.7,-2.06,g,{cast:false});scr.ideaBoard=CT(512,300);plane(3.2,1.88,scr.ideaBoard.t,0,1.7,-2.02,0,g);
    scr.bulb=new THREE.Mesh(new THREE.SphereGeometry(0.7,18,14),new THREE.MeshBasicMaterial({color:0xfff2a8}));scr.bulb.position.set(0,5.2,0);g.add(scr.bulb);B(0.4,0.5,0.4,0xb0b6c6,0,4.45,0,g);
    scr.bulbL=new THREE.PointLight(0xffd27a,0,12,1.4);scr.bulbL.position.set(0,5.2,1);g.add(scr.bulbL);}

  // ---------- torres das redes ----------
  const TOW=[{k:'IG',x:-15,z:-26,col:0xd6336c,top:0xf77737,label:'INSTAGRAM'},{k:'TT',x:-8,z:-26,col:0x1b1b1b,top:0x25f4ee,label:'TIKTOK'},{k:'YT',x:-1,z:-26,col:0xe62117,top:0xffffff,label:'YOUTUBE'},{k:'FB',x:6,z:-26,col:0x1877f2,top:0xffffff,label:'FACEBOOK'}];
  for(const t of TOW){t.g=G(t.x,0,t.z);const wt=CT(64,128);const cs=hex(t.col);t.winT=wt;t.paintWin=(night)=>{wt.x.fillStyle=cs;wt.x.fillRect(0,0,64,128);for(let y=6;y<128;y+=16)for(let x=6;x<64;x+=16){wt.x.fillStyle=night&&((x*7+y*3)%5)?'rgba(255,226,140,.95)':'rgba(220,240,255,.55)';wt.x.fillRect(x,y,8,9);}wt.t.needsUpdate=true;};t.paintWin(false);
    wt.t.wrapS=wt.t.wrapT=THREE.RepeatWrapping;t.body=new THREE.Mesh(new THREE.BoxGeometry(4,1,4),new THREE.MeshToonMaterial({map:wt.t,gradientMap:grad}));t.body.castShadow=t.body.receiveShadow=true;t.g.add(t.body);
    t.roof=B(4.3,0.3,4.3,t.top,0,1,0,t.g);B(1.2,1.4,0.06,0x3b2a1a,0,0.7,2.01,t.g);const s=signTex(t.label,'#1d1838','#ffffff',512,96,52);t.sign=plane(3.6,0.68,s.t,0,2,2.04,0,t.g);
    t.beacon=B(0.4,0.4,0.4,0xffffff,0,1.4,0,t.g,{cast:false});t.h=2;t.goal=2;t.tag=document.createElement('div');t.tag.className='tag net';$('tags').append(t.tag);}
  function setTowerH(t,h){t.h=h;t.body.scale.y=h;t.body.position.y=h/2;t.roof.position.y=h+0.15;t.beacon.position.y=h+0.55;t.winT.t.repeat.set(1,Math.max(1,h/4));t.sign.position.y=Math.min(h-0.6,3.2);}
  TOW.forEach(t=>setTowerH(t,2));
  const clouds=[];for(let i=0;i<9;i++){const c=G(-80+i*20,22+(i%3)*4,-40+((i*23)%60));for(let j=0;j<4;j++)B(3-j*0.4,1.3,2.2,M(0xffffff,{transparent:true,opacity:.95}),j*1.6,j%2?0.5:0,(j%2)*0.4,c,{cast:false});clouds.push(c);}
  const birds=[];for(let i=0;i<5;i++){const b=G(0,16+i,0);const w1=B(0.8,0.06,0.25,0x1d1838,-0.4,0,0,b,{cast:false}),w2=B(0.8,0.06,0.25,0x1d1838,0.4,0,0,b,{cast:false});birds.push({b,w1,w2,ph:i*1.3,r:26+i*3});}

  // ---------- bonecos ----------
  const pick=[];
  function makeBoneco(c){const g=G();const skin=0xf2c39c;
    const legL=G(-0.17,0.82,0,g),legR=G(0.17,0.82,0,g);
    B(0.27,0.8,0.3,c.pants,0,-0.4,0,legL);B(0.27,0.8,0.3,c.pants,0,-0.4,0,legR);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legL);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legR);
    const torso=G(0,0.82,0,g);B(0.74,0.86,0.44,c.shirt,0,0.43,0,torso);B(0.76,0.12,0.46,0x2b2d3a,0,0.04,0,torso);
    if(c.id==='car')B(0.5,0.45,0.2,0x8a5a33,-0.42,0.15,0,torso);
    const armL=G(-0.5,1.6,0,g),armR=G(0.5,1.6,0,g);
    B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armL);B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armR);B(0.2,0.18,0.22,skin,0,-0.74,0,armL);B(0.2,0.18,0.22,skin,0,-0.74,0,armR);
    const head=G(0,1.98,0,g);B(0.64,0.6,0.58,skin,0,0,0,head);B(0.68,0.2,0.62,c.hair,0,0.28,-0.02,head);B(0.68,0.42,0.12,c.hair,0,0.1,-0.3,head);
    if(c.cap){B(0.7,0.16,0.64,c.hat,0,0.36,0,head);B(0.5,0.06,0.3,c.hat,0,0.3,0.44,head);}
    if(c.beret){const b=B(0.78,0.12,0.72,c.hat,0.06,0.42,0,head);b.rotation.z=0.18;}
    if(c.headset){B(0.08,0.34,0.08,0x1d1838,-0.36,0.05,0,head);B(0.08,0.34,0.08,0x1d1838,0.36,0.05,0,head);B(0.74,0.07,0.1,0x1d1838,0,0.36,0,head);B(0.05,0.05,0.32,0x1d1838,0.3,-0.15,0.18,head);}
    if(c.helmet){B(0.74,0.26,0.68,c.hat,0,0.38,0,head);B(0.8,0.06,0.74,c.hat,0,0.26,0.04,head);}
    const eyeL=B(0.09,0.12,0.04,0x1d1838,-0.14,0.04,0.3,head,{cast:false}),eyeR=B(0.09,0.12,0.04,0x1d1838,0.14,0.04,0.3,head,{cast:false});
    if(c.glasses)B(0.5,0.04,0.03,0x1d1838,0,0.1,0.31,head,{cast:false});
    B(0.18,0.04,0.04,0x9a4a3a,0,-0.15,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,-0.22,-0.08,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,0.22,-0.08,0.3,head,{cast:false});
    if(c.id==='car'){c.letter=B(0.45,0.3,0.06,0xf4e3c3,0,-0.62,0.2,armR);c.letter.visible=false;}
    if(c.id==='ide'){c.idea=B(0.3,0.3,0.3,0xffe66d,0,0.85,0,head,{cast:false});c.idea.visible=false;}
    const sh=new THREE.Mesh(new THREE.CircleGeometry(0.45,16),new THREE.MeshBasicMaterial({color:0,transparent:true,opacity:.22,depthWrite:false}));sh.rotation.x=-Math.PI/2;scene.add(sh);c.shadowDisc=sh;
    g.traverse(o=>{if(o.isMesh){o.userData.ch=c;pick.push(o);}});
    c.g=g;c.p={legL,legR,armL,armR,head,eyeL,eyeR};
    c.tag=document.createElement('div');c.tag.className='tag';c.tag.textContent=c.name;$('tags').append(c.tag);}
  let saved={};try{saved=JSON.parse(localStorage.getItem('estudio-pos-v3')||'{}')||{};}catch{}
  for(const c of CH){makeBoneco(c);const s=saved[c.id];c.pos=new THREE.Vector3(s?s.x:c.home[0],0,s?s.z:c.home[1]);c.mode=s?'free':'work';c.route=[];c.walk=Math.random()*6;c.jump=0;c.rot=c.face;c.blink=Math.random()*4;c.idle=10+Math.random()*12;c.g.position.copy(c.pos);c.g.rotation.y=c.face;}
  function savePos(){try{const o={};for(const c of CH)if(c.mode==='free')o[c.id]={x:+c.pos.x.toFixed(2),z:+c.pos.z.toFixed(2)};localStorage.setItem('estudio-pos-v3',JSON.stringify(o));}catch{}}
  function door(c){const g=GBY[c.id];return new THREE.Vector3(g.x,0,g.z+3.4);}
  function goHome(c){const h=new THREE.Vector3(c.home[0],0,c.home[1]);c.route=[door(c),h];c.mode='walk';c.after='work';}
  $('home').addEventListener('click',()=>{for(const c of CH)goHome(c);try{localStorage.removeItem('estudio-pos-v3');}catch{}toast('Todos de volta à garagem!');});

  // ---------- falas ----------
  function line(c){const L=lis();if(!D)return '…';
    if(c.id==='car'){if(!D.hasMC)return 'A ver o Metricool…';const n=D.next;return n?`Próximo: ${n.date===L.date?'':dm(n.date)+' '}${n.time} · ${LABEL[n.acct]}`:'Hoje já saiu tudo! 📬';}
    if(c.id==='ana'){if(!D.hasW)return 'A fazer contas…';const a=D.a['2factos'],b=D.a.hit0ms;return `IG 7 dias: 2F ${short(a.ig7)} · H0 ${short(b.ig7)}`;}
    if(c.id==='rea'){if(!D.hasW)return 'A rever gravações…';const top=[...D.vids].sort((a,b)=>(+b.views||0)-(+a.views||0))[0];return top?`Campeão: ${capLine(top.cap).slice(0,26)}… ${short(top.views)}`:'Sem vídeos.';}
    if(c.id==='eng'){if(!D.hasW)return 'A calibrar…';return `${D.vids.filter(v=>v.k==='IG'&&v.trial).length} trial reels testados 🧪`;}
    if(c.id==='ide'){const n=ST.db?.ideas?.length||0;return n?`${n} ideias novas! 💡`:'Ideias às 8:53 ☕';}
    if(c.id==='gui'){const v=ST.ped.filter(p=>p.estado==='precisa_voz').length,a=ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length;return v?'Preciso da tua voz! 🎙️':a?`${a} em produção ✍️`:'Manda-me ideias!';}
    if(c.id==='por'){const p_=ST.com.filter(x=>x.estado==='pendente').length;return p_?`${p_} comentários à tua espera 💬`:'Comentários em dia 💬';}
    if(c.id==='des'){const n=ST.db?.challenges?.length||0;return n?`${n} desafios a correr 🔺`:'Quantos 🔺 vês?';}
    return '';}
  let sayT=0;say=function(c){$('bubble').textContent=line(c);$('bubble').classList.add('on');sayT=performance.now()+6000;};

  // ---------- ecrãs ----------
  function scrText(s,title,big,small,col='#5fe08a',bg='#0b1a2e'){const {x,c}=s;x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=col;x.textAlign='center';x.textBaseline='middle';
    x.font=`bold ${Math.round(c.height*0.13)}px Silkscreen, monospace`;x.fillText(title,c.width/2,c.height*0.18);x.font=`bold ${Math.round(c.height*0.34)}px Silkscreen, monospace`;x.fillText(big,c.width/2,c.height*0.52);
    x.font=`${Math.round(c.height*0.11)}px Silkscreen, monospace`;x.fillStyle='#cfd8ff';x.fillText(small,c.width/2,c.height*0.85);s.t.needsUpdate=true;}
  function miniBars(s,title,vals,col,bg='#0b1a2e'){const {x,c}=s;x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font=`bold ${Math.round(c.height*0.09)}px Silkscreen, monospace`;x.textAlign='left';x.textBaseline='top';x.fillText(title,c.width*0.05,c.height*0.05);
    const v=vals.map(a=>+a||0);const mx=Math.max(1,...v);const bw=c.width*0.9/v.length;v.forEach((a,i)=>{const h=(c.height*0.62)*a/mx;x.fillStyle=col;x.fillRect(c.width*0.05+i*bw+1,c.height*0.88-h,bw-3,h);});
    x.fillStyle='#cfd8ff';x.font=`${Math.round(c.height*0.075)}px Silkscreen, monospace`;x.textAlign='right';x.fillText(short(mx),c.width*0.95,c.height*0.05);s.t.needsUpdate=true;}
  let ideasOn=false;
  function drawScreens(){if(!D)return;const t=D.today;
    scrText(scr.car,'HOJE',D.hasMC?`${t.filter(p=>p.state==='done').length}/${t.length}`:'...',D.next?`a seguir ${D.next.time}`:'posts','#ffd21f');
    {const p_=ST.com.filter(x=>x.estado==='pendente').length;scrText(scr.por,'COMENTÁRIOS',String(p_),p_?'à tua espera':'tudo em dia','#ff8cc6');}
    scrText(scr.des,'DESAFIOS',String(ST.db?.challenges?.length||0),'facebook','#7fe3a0');
    scrText(scr.gui,'PEDIDOS',String(ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length),ST.ped.some(p=>p.estado==='precisa_voz')?'falta a voz':'em produção','#ffe066');
    const a2=D.a['2factos'],ah=D.a.hit0ms,days=D.days.slice(-15,-1);
    scrText(scr.rea,'VÍDEOS',D.hasW?String(new Set(D.vids.map(x=>x.date+x.acct)).size):'...','28 dias','#ff6b6b');
    miniBars(scr.rea2,'IG 2F',days.map(d=>a2.igV[d]),'#0ca678');
    scrText(scr.eng,'TRIALS',D.hasW?String(D.vids.filter(x=>x.k==='IG'&&x.trial).length):'...','instagram','#b197fc');
    scrText(scr.ana,'VIEWS 7D',D.hasW?short(a2.ig7+ah.ig7+a2.fb7+ah.fb7+a2.tt7+ah.tt7+a2.yt7+ah.yt7):'...','todas','#5fe08a');
    miniBars(scr.tv2f,'2 FACTOS · IG',days.map(d=>a2.igV[d]),'#ffd21f','#0d3b26');
    miniBars(scr.tvh,'HIT0MS · FB',days.map(d=>ah.fbP[d]),'#ff6b6b','#1a0d0d');
    {const s=scr.bill,x=s.x,c=s.c;x.fillStyle='#07060f';x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font='bold 40px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('INSTAGRAM POR DIA',36,24);
      const ds=D.days.slice(0,-1),A=ds.map(d=>a2.igV[d]||0),Hh=ds.map(d=>ah.igV[d]||0);const mx=Math.max(1,...A,...Hh);
      const px=i=>60+(c.width-110)*i/(ds.length-1),py=v=>c.height-50-(c.height-160)*v/mx;
      x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=2;for(let i=0;i<=3;i++){const yv=py(mx*i/3);x.beginPath();x.moveTo(60,yv);x.lineTo(c.width-50,yv);x.stroke();}
      for(const [arr,col] of [[A,'#38d9a9'],[Hh,'#ff6b9a']]){x.strokeStyle=col;x.lineWidth=8;x.lineJoin='round';x.beginPath();arr.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));x.stroke();}
      x.font='bold 30px Inter, sans-serif';x.fillStyle='#38d9a9';x.fillText('● 2 Factos '+short(a2.ig7),36,80);x.fillStyle='#ff6b9a';x.fillText('● Hit0Ms '+short(ah.ig7),360,80);x.fillStyle='rgba(255,255,255,.6)';x.fillText('7 dias',660,80);s.t.needsUpdate=true;}
    {const s=scr.ideaBoard,x=s.x;x.fillStyle='#fdfdfd';x.fillRect(0,0,512,300);x.fillStyle='#1d1838';x.font='bold 30px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('IDEIAS',18,14);
      const I=(ST.db?.ideas||[]);x.font='bold 20px Inter, sans-serif';if(!I.length){x.fillStyle='#6b6590';x.fillText('às 8:53',18,66);}
      I.slice(0,7).forEach((it,i)=>{x.fillStyle=['#d6336c','#6c4cf0','#0ca678'][i%3];x.fillText(`${it.n}. ${String(it.text).slice(0,34)}`,18,60+i*32);});if(I.length>7){x.fillStyle='#6b6590';x.fillText(`+${I.length-7}`,440,20);}s.t.needsUpdate=true;}
    for(const t_ of TOW){const v=D.net7[t_.k]||0;t_.goal=2.2+Math.min(13,Math.log10(1+v)*2.1);t_.pending=D.today.some(p=>p.state==='pend'&&p.nets.some(n=>n.k===t_.k&&n.s!=='done'));
      t_.tag.innerHTML=`${esc(NET[t_.k])} · ${esc(short(v))}${t_.pending?'<span class="badge">hoje</span>':''}`;}
    ideasOn=(ST.db?.ideas||[]).length>0;}
  function drawEasel(k){const e=scr.easel,x=e.x;x.fillStyle='#fff';x.fillRect(0,0,256,256);x.lineWidth=4;x.strokeStyle='#1d1838';const cols=['#e03131','#1c7ed6','#ffd21f','#0ca678'];
    for(let i=0;i<9;i++){x.fillStyle=cols[(i+k)%4];const cx=50+(i%3)*78,cy=50+Math.floor(i/3)*70,s=24;x.beginPath();const kind=(i*2+k)%3;if(kind===0){x.moveTo(cx,cy-s);x.lineTo(cx-s,cy+s);x.lineTo(cx+s,cy+s);x.closePath();}else if(kind===1)x.rect(cx-s,cy-s,2*s,2*s);else x.arc(cx,cy,s,0,7);x.fill();x.stroke();}
    x.fillStyle='#1d1838';x.font='bold 24px Silkscreen, monospace';x.textAlign='center';x.fillText('QUANTOS?',128,246);e.t.needsUpdate=true;}
  let ek=0;drawEasel(0);setInterval(()=>drawEasel(++ek),3000);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{signs.forEach(s=>s.redraw());drawScreens();drawEasel(ek);});

  // ---------- carteiro entrega ----------
  const seen={};let first=true;const car=CH[0];
  function deliver(k){const t=TOW.find(x=>x.k===k)||TOW[0];if(car.mode==='held')return;const V=(x,z)=>new THREE.Vector3(x,0,z);const g=GBY.car;
    car.route=[V(car.pos.x,g.z+3.4),V(g.x-3.2,g.z+3.4),V(g.x-3.2,-1.6),V(XW,-1.6),V(XW,RZ+3.8),V(XW,RZ-3.8),V(t.x,RZ-3.8),V(t.x,t.z+2.6),V(t.x,RZ-3.8),V(XW,RZ-3.8),V(XW,RZ+3.8),V(XW,-1.6),V(g.x-3.2,-1.6),V(g.x-3.2,g.z+3.4),V(g.x,g.z+3.4),V(car.home[0],car.home[1])];
    car.mode='walk';car.after='work';car.letter.visible=true;car.dropAt=8;car.dropT=t;}
  onWorld=()=>{drawScreens();const fresh=[];for(const p of D.posts)for(const n of p.nets){const k=p.id+n.k;if(seen[k]&&seen[k]!=='done'&&n.s==='done')fresh.push(n.k);seen[k]=n.s;}
    if(!first&&fresh.length)deliver(fresh[0]);if(D.hasMC)first=false;if(selected&&performance.now()<sayT)$('bubble').textContent=line(selected);};
  const conf=[];const confG=new THREE.BoxGeometry(0.18,0.18,0.05);
  function burst(p,n=50){if(reduce)return;for(let i=0;i<n;i++){const m=new THREE.Mesh(confG,new THREE.MeshBasicMaterial({color:[0xe64980,0xffd21f,0x25f4ee,0x339af0,0x69db7c][i%5]}));m.position.copy(p);m.userData={v:new THREE.Vector3((Math.random()-.5)*8,5+Math.random()*6,(Math.random()-.5)*8),life:2.4};scene.add(m);conf.push(m);}}

  // ---------- câmara ----------
  const VIEWS=[{k:'geral',n:'Vila',t:mobile?[-5,0,-3]:[-4,0,-5],d:mobile?84:62,dir:[0.55,0.85,1.1]},{k:'rua',n:'Rua e redes',t:[-5,3,-22],d:40,dir:[0.35,0.5,1]}];
  let fly=null;function goTo(tgt,pos,instant){if(instant||reduce){controls.target.copy(tgt);cam.position.copy(pos);controls.update();}else fly={t0:performance.now(),dur:900,fromT:controls.target.clone(),fromP:cam.position.clone(),toT:tgt,toP:pos};}
  function goView(v,instant){for(const g_ of GAR)g_.opT=1;const dir=new THREE.Vector3(...v.dir).normalize();const tgt=new THREE.Vector3(...v.t);goTo(tgt,tgt.clone().addScaledVector(dir,v.d),instant);for(const b of $('views').children)b.setAttribute('aria-pressed',String(b.dataset.k===v.k));}
  for(const v of VIEWS){const b=document.createElement('button');b.type='button';b.dataset.k=v.k;b.textContent=v.n;b.setAttribute('aria-pressed','false');b.onclick=()=>goView(v);$('views').append(b);}
  for(const gd of GAR){const c=CH.find(x=>x.id===gd.id);const b=document.createElement('button');b.type='button';b.dataset.k=gd.id;b.textContent=gd.label;b.setAttribute('aria-pressed','false');b.onclick=()=>{flyTo(c);for(const x of $('views').children)x.setAttribute('aria-pressed',String(x===b));};$('views').append(b);}
  flyTo=c=>{for(const g_ of GAR)g_.opT=g_.id===c.id?0.1:1;const tgt=new THREE.Vector3(c.pos.x+(mobile?0:1.8),mobile?0.2:1.3,c.pos.z+0.6);const dir=new THREE.Vector3(-0.04,0.75,1).normalize();goTo(tgt,tgt.clone().addScaledVector(dir,mobile?18:14));for(const x of $('views').children)x.setAttribute('aria-pressed',String(x.dataset.k===c.id));};
  goView(VIEWS[0],true);window.__unfade=()=>{for(const g_ of GAR)g_.opT=1;};

  // ---------- arrastar ----------
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2(),ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
  let drag=null,down=null;
  function setPtr(e){const r=renderer.domElement.getBoundingClientRect();ptr.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ptr,cam);}
  renderer.domElement.addEventListener('pointerdown',e=>{setPtr(e);const h=ray.intersectObjects(pick,false)[0];hideHint();
    if(h){drag=h.object.userData.ch;down={x:e.clientX,y:e.clientY,moved:false};controls.enabled=false;renderer.domElement.setPointerCapture(e.pointerId);renderer.domElement.style.cursor='grabbing';}});
  renderer.domElement.addEventListener('pointermove',e=>{setPtr(e);
    if(!drag){const h=ray.intersectObjects(pick,false)[0];renderer.domElement.style.cursor=h?'grab':'';return;}
    if(!down.moved&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down.moved=true;drag.mode='held';drag.route=[];if(drag.letter)drag.letter.visible=false;}
    if(down.moved&&ray.ray.intersectPlane(ground,hit))drag.pos.set(THREE.MathUtils.clamp(hit.x,-30,20),0,THREE.MathUtils.clamp(hit.z,-28,14));});
  function up(){if(!drag)return;const c=drag;drag=null;controls.enabled=true;renderer.domElement.style.cursor='';if(down.moved){c.mode='free';c.jump=0.001;savePos();}else select(c);}
  renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);
  let hintGone=false;function hideHint(){if(hintGone)return;hintGone=true;$('hint').style.opacity='0';}setTimeout(hideHint,8000);

  // ---------- pixel & tamanho ----------
  let pixel=false;$('pixel').addEventListener('click',()=>{pixel=!pixel;$('pixel').setAttribute('aria-pressed',String(pixel));$('gl').classList.toggle('pixel',pixel);resize();});
  function resize(){const w=innerWidth,h=innerHeight;renderer.setPixelRatio(pixel?1/3:Math.min(devicePixelRatio,mobile?1.75:2));renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
  addEventListener('resize',resize);resize();

  // ---------- dia / noite ----------
  let nightK=0;
  function sky_(){const L=lis();const h=L.min/60;const n=h<6.5?1:h<8?1-(h-6.5)/1.5:h<17.3?0:h<19?(h-17.3)/1.7:1;nightK=n;const dusk=Math.max(0,1-Math.abs(n-0.5)*2);
    const top=new THREE.Color(0x58a8f5).lerp(new THREE.Color(0x0b1030),n),bot=new THREE.Color(0xdff1ff).lerp(new THREE.Color(0x1d2350),n).lerp(new THREE.Color(0xffa36b),dusk*0.7);
    skyMat.uniforms.top.value.copy(top);skyMat.uniforms.bot.value.copy(bot);scene.fog=new THREE.Fog(bot.getHex(),90,230);
    const ang=(h-6)/12*Math.PI;sun.position.set(Math.cos(ang)*40+5,Math.max(10,Math.sin(ang)*45),30);sun.intensity=0.95*(1-n)+0.2;sun.color.set(n>0.5?0x9fb4ff:dusk>0.3?0xffc28a:0xfff2dc);
    hemi.intensity=0.72-0.36*n;stars.material.opacity=n;garLights.forEach(l=>l.intensity=0.2+0.7*n);lampLights.forEach(l=>l.intensity=1.6*n);
    lamps.forEach(b=>b.material.emissive.setHex(n>0.4?0xffd27a:0x000000));sea.material.color.set(new THREE.Color(0x2f8fd8).lerp(new THREE.Color(0x0e2650),n));
    GAR.forEach(g=>g.wins.forEach(w=>w.material.color.set(n>0.4?0xffd88a:0xbfe3ff)));
    TOW.forEach(t=>t.paintWin(n>0.4));cars.forEach(c=>c.hl.material.emissive.setHex(n>0.4?0xfff2a0:0));}
  sky_();setInterval(sky_,60000);

  // ---------- ciclo ----------
  const clk=new THREE.Clock(),tmp=new THREE.Vector3(),tmp2=new THREE.Vector3();let occF=0,lastScreens=0;const occRay=new THREE.Raycaster();
  function occlusion(){for(const c of CH){tmp.copy(c.g.position);tmp.y+=1.4;const dir=tmp.clone().sub(cam.position);const dist=dir.length();occRay.set(cam.position,dir.normalize());occRay.far=dist-0.3;c.occ=occRay.intersectObjects(occluders,false).length>0;}}
  function project(v,el,dy=0){tmp.copy(v);tmp.y+=dy;tmp.project(cam);const vis=tmp.z<1&&Math.abs(tmp.x)<1.05&&Math.abs(tmp.y)<1.05;el.style.display=vis?'':'none';if(vis)el.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,-100%)`;return vis;}
  function step(){requestAnimationFrame(step);const dt=Math.min(clk.getDelta(),0.05),t=clk.elapsedTime;
    if(fly){const k=Math.min(1,(performance.now()-fly.t0)/fly.dur),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;controls.target.lerpVectors(fly.fromT,fly.toT,e);cam.position.lerpVectors(fly.fromP,fly.toP,e);if(k>=1)fly=null;}
    controls.update();if(++occF%6===0)occlusion();
    if(!reduce){const p=seaGeo.attributes.position.array;for(let i=0;i<p.length;i+=3)p[i+1]=Math.sin(seaBase[i+2]*0.12+t*1.1)*0.25+Math.cos(seaBase[i]*0.18+t*0.8)*0.2;seaGeo.attributes.position.needsUpdate=true;}
    for(const c of CH){const p=c.p;
      if(c.mode==='walk'&&c.route.length){const tg=c.route[0];tmp2.copy(tg).sub(c.pos);tmp2.y=0;const dist=tmp2.length();
        if(dist<0.08){c.route.shift();if(c.dropAt!=null){c.dropAt--;if(c.dropAt===0){c.letter.visible=false;c.dropT.flash=1.5;burst(c.dropT.g.position.clone().setY(c.dropT.h+0.8));c.jump=0.001;}}if(!c.route.length){c.mode=c.after||'free';c.dropAt=null;}}
        else{tmp2.normalize();c.pos.addScaledVector(tmp2,Math.min(dist,dt*(c.id==='car'?3.6:2.4)));c.rot=Math.atan2(tmp2.x,tmp2.z);c.walk+=dt*11;}}
      const moving=c.mode==='walk'&&c.route.length>0;
      // passeio: sai à porta da garagem, espreita e volta
      if(c.mode==='work'&&!reduce){c.idle-=dt;if(c.idle<0){c.idle=20+Math.random()*20;const g=GBY[c.id];c.route=[new THREE.Vector3(g.x+(Math.random()-.5)*2,0,g.z+3.2+Math.random()),new THREE.Vector3(c.home[0],0,c.home[1])];c.mode='walk';c.after='work';}}
      if(c.mode==='work')c.rot=c.face;
      let dr=c.rot-c.g.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));c.g.rotation.y+=dr*Math.min(1,dt*10);
      const sw=moving?Math.sin(c.walk)*0.75:0;p.armL.rotation.z=p.armR.rotation.z=0;
      if(c.mode==='held'){const w=Math.sin(t*14)*0.6;p.legL.rotation.x=w;p.legR.rotation.x=-w;p.armL.rotation.x=p.armR.rotation.x=0;p.armL.rotation.z=-2.5;p.armR.rotation.z=2.5;}
      else if(c.mode==='work'){p.legL.rotation.x=p.legR.rotation.x=0;const ty=Math.sin(t*12+c.home[0])*0.22;p.armL.rotation.x=-1.15+ty;p.armR.rotation.x=-1.15-ty;p.head.rotation.x=0.12;p.head.rotation.y=Math.sin(t*0.5+c.home[1])*0.15;}
      else{p.legL.rotation.x=sw;p.legR.rotation.x=-sw;p.armL.rotation.x=-sw*0.8;p.armR.rotation.x=(c.letter&&c.letter.visible)?-1.4:sw*0.8;p.head.rotation.x=0;p.head.rotation.y=moving?0:Math.sin(t*0.7+c.home[1])*0.5;}
      c.blink-=dt;p.eyeL.scale.y=p.eyeR.scale.y=c.blink<0.12?0.15:1;if(c.blink<0)c.blink=2+Math.random()*4;
      if(c.idea)c.idea.visible=c.mode==='work'&&ideasOn&&Math.floor(t*1.2)%3===0;
      let y=0;if(c.mode==='held')y+=1.3+Math.sin(t*6)*0.08;if(c.jump>0){c.jump+=dt*2.6;y+=Math.sin(Math.min(Math.PI,c.jump*Math.PI))*0.9;if(c.jump>=1)c.jump=0;}if(moving)y+=Math.abs(Math.sin(c.walk))*0.07;
      c.g.position.set(c.pos.x,y,c.pos.z);c.shadowDisc.position.set(c.pos.x,0.07,c.pos.z);c.shadowDisc.material.opacity=c.mode==='held'?0.12:0.22;
      if(c.occ&&c.mode!=='held')c.tag.style.display='none';else project(c.g.position,c.tag,2.55);}
    for(const d of drops){d.t+=dt;if(d.state==='wait'&&d.t>0){d.state='fall';d.v=0;}
      if(d.state==='fall'){d.v-=dt*12;d.y+=d.v*dt;if(d.y<=0.2){d.y=0.2;d.state='squash';d.t=0;if(splats.length<8&&!reduce){const s=new THREE.Mesh(new THREE.CircleGeometry(0.26,10),new THREE.MeshBasicMaterial({color:d.m.material.color,transparent:true,opacity:.8}));s.rotation.x=-Math.PI/2;s.position.set(d.m.position.x,0.1,0);s.userData.life=1.4;rig.add(s);splats.push(s);}}}
      if(d.state==='squash'){const k=Math.min(1,d.t/0.5);d.m.scale.set(1+0.6*(1-k)*Math.sin(k*9),1-0.5*(1-k),1+0.6*(1-k)*Math.sin(k*9));if(d.t>1.4){d.state='wait';d.t=-1.5-Math.random()*1.5;d.y=2.2;d.m.scale.set(1,1,1);}}
      d.m.position.y=d.y;d.m.rotation.y+=dt;}
    for(let i=splats.length-1;i>=0;i--){const s=splats[i];s.userData.life-=dt;s.material.opacity=Math.max(0,s.userData.life/1.4*0.8);s.scale.setScalar(1+(1.4-s.userData.life));if(s.userData.life<=0){rig.remove(s);s.material.dispose();s.geometry.dispose();splats.splice(i,1);}}
    {const ms=Math.floor((t*1000)%1000);msS.x.fillStyle='#111';msS.x.fillRect(0,0,256,96);msS.x.fillStyle=ms<60?'#69db7c':'#ff6b6b';msS.x.font='bold 54px Silkscreen, monospace';msS.x.textAlign='center';msS.x.textBaseline='middle';msS.x.fillText(String(ms).padStart(3,'0')+'ms',128,52);msS.t.needsUpdate=true;}
    scr.bubbles.forEach((m,i)=>{m.position.y+=Math.sin(t*2+i)*0.002;});scr.roofBubble.rotation.y=Math.sin(t*0.8)*0.4;scr.roofBubble.position.y=4.5+Math.sin(t*1.6)*0.12;
    scr.shapes.forEach((m,i)=>{m.rotation.y+=dt*(0.6+i*0.3);m.position.y=0.6+Math.sin(t*1.5+i)*0.15;});
    scr.rec.visible=Math.floor(t*2)%2===0;scr.paper.position.y=1.5+Math.sin(t*3)*0.02;
    const pulse=ideasOn?0.75+0.25*Math.sin(t*3):0.1;scr.bulb.material.color.setHSL(0.14,ideasOn?1:0.15,ideasOn?0.55+0.15*pulse:0.78);scr.bulbL.intensity=ideasOn?1.3*pulse+nightK:0;
    for(const tw of TOW){if(Math.abs(tw.goal-tw.h)>0.01)setTowerH(tw,tw.h+(tw.goal-tw.h)*0.05);if(tw.flash>0)tw.flash-=dt;
      tw.beacon.material.color.set(tw.flash>0?(Math.floor(t*10)%2?0xffd21f:0xffffff):tw.pending?(Math.floor(t*2)%2?0xffd21f:0x886600):0xdddddd);project(tw.g.position,tw.tag,tw.h+1.4);}
    for(const c of cars){c.g.position.x+=c.dir*c.speed*dt;if(c.g.position.x>44)c.g.position.x=-44;if(c.g.position.x<-44)c.g.position.x=44;}
    for(const cl of clouds){cl.position.x+=dt*0.8;if(cl.position.x>90)cl.position.x=-90;}
    for(const b of birds){const a=t*0.25+b.ph;b.b.position.set(Math.cos(a)*b.r-6,16+Math.sin(t+b.ph)*1.5,Math.sin(a)*b.r-10);b.b.rotation.y=-a;const f=Math.sin(t*9+b.ph)*0.6;b.w1.rotation.z=f;b.w2.rotation.z=-f;}
    for(let i=conf.length-1;i>=0;i--){const m=conf[i];m.userData.v.y-=dt*10;m.position.addScaledVector(m.userData.v,dt);m.rotation.x+=dt*8;m.userData.life-=dt;if(m.userData.life<=0){scene.remove(m);m.material.dispose();conf.splice(i,1);}}
    if(selected&&performance.now()<sayT){const b=$('bubble');tmp.copy(selected.g.position);tmp.y+=2.8;tmp.project(cam);b.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,calc(-100% - 26px))`;}
    else $('bubble').classList.remove('on');
    for(const g_ of GAR){if(Math.abs(g_.op-g_.opT)>0.005){g_.op+=(g_.opT-g_.op)*Math.min(1,dt*6);for(const m of new Set(g_.fade.map(x=>x.material))){m.opacity=g_.op;m.depthWrite=g_.op>0.95;}for(const x of g_.fade)x.castShadow=g_.op>0.5;}}
    if(t-lastScreens>30){lastScreens=t;drawScreens();}
    renderer.render(scene,cam);}
  drawScreens();step();
})();
