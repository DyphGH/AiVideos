// =================== BONECOS & PAINEL ===================
const FY=[0,3.6,7.2,10.8]; // altura de cada piso (topo da laje)
const CH=[
  {id:'car',name:'Carteiro',sub:'Agenda dos próximos 7 dias · mudar hora e pausar',shirt:0x2e5fb0,pants:0x23304f,hat:0x2e5fb0,hair:0x3a2a1a,cap:true,lv:0,home:[-7.2,-0.6],face:Math.PI,sec:'sec-car'},
  {id:'des',name:'Desafios',sub:'Desafios em imagem do Facebook',shirt:0x1f9d55,pants:0x2b2d55,hat:0x6b3d1f,hair:0x6b3d1f,lv:0,home:[-1.2,-0.6],face:Math.PI,sec:'sec-des'},
  {id:'gui',name:'Guionista',sub:'Produção: pedidos, guiões e a tua voz',shirt:0xf4b400,pants:0x2b2d55,hat:0x2a1a0e,hair:0x2a1a0e,glasses:true,lv:1,home:[-7,-0.6],face:Math.PI,sec:'sec-gui'},
  {id:'rea',name:'Realizador',sub:'Todos os vídeos dos últimos 28 dias',shirt:0x0ca678,pants:0x1d1838,hat:0x111111,hair:0x111111,beret:true,lv:1,home:[-1.4,-0.6],face:Math.PI,sec:'sec-rea'},
  {id:'eng',name:'Engenheiro',sub:'Laboratório: trial reels vs reels normais',shirt:0xe03131,pants:0x1d1838,hat:0xffd21f,hair:0x111111,helmet:true,lv:2,home:[-6.8,-0.6],face:Math.PI,sec:'sec-eng'},
  {id:'ana',name:'Analista',sub:'Números e gráficos de 28 dias · Windsor',shirt:0x6c4cf0,pants:0x2b2d55,hat:0x3a2a1a,hair:0x3a2a1a,glasses:true,lv:3,home:[-6.4,0.6],face:Math.PI,sec:'sec-ana'},
  {id:'ide',name:'Ideias',sub:'Escolhe ideias e horas e manda produzir',shirt:0xff8c1a,pants:0x2b2d55,hat:0x7a3a10,hair:0x7a3a10,lv:3,home:[-0.6,0.6],face:Math.PI,sec:'sec-ide'}];
const hex=n=>'#'+n.toString(16).padStart(6,'0');
function avatarTo(cv,c){const x=cv.getContext('2d');x.clearRect(0,0,16,16);const p=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h);};
  p(5,1,6,6,'#f2c39c');p(5,1,6,2,hex(c.hat));p(6,4,1,1,'#1d1838');p(9,4,1,1,'#1d1838');if(c.glasses){p(5,4,3,1,'#1d1838');p(8,4,3,1,'#1d1838');}
  p(4,7,8,5,hex(c.shirt));p(3,8,1,3,'#f2c39c');p(12,8,1,3,'#f2c39c');p(5,12,3,3,hex(c.pants));p(8,12,3,3,hex(c.pants));}
for(const c of CH){const b=document.createElement('button');b.type='button';b.dataset.id=c.id;b.setAttribute('aria-pressed','false');b.title=c.sub;
  const cv=document.createElement('canvas');cv.width=cv.height=16;avatarTo(cv,c);const dot=document.createElement('span');dot.className='dot';dot.hidden=true;
  b.append(cv,document.createTextNode(c.name),dot);$('dock').append(b);}
$('dock').addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)select(CH.find(c=>c.id===b.dataset.id),true);});
$('dclose').addEventListener('click',()=>select(null));
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('modal').hidden)select(null);});
let selected=null,say=()=>{},flyTo=()=>{};
function select(c,fly){selected=c;for(const b of $('dock').children)b.setAttribute('aria-pressed',String(!!c&&b.dataset.id===c.id));
  if(!c){$('drawer').classList.remove('open');$('bubble').classList.remove('on');return;}
  $('dtitle').textContent=c.name;$('dsub').textContent=c.sub;avatarTo($('dav'),c);
  for(const x of CH)$(x.sec).hidden=x!==c;$('dbody').scrollTop=0;$('drawer').classList.add('open');c.jump=0.001;say(c);if(fly)flyTo(c);}
setTabs();

// =================== CIDADE 3D ===================
(function(){
  if(!window.THREE){$('stage').innerHTML='<div class="nogl">Não consegui carregar o motor 3D. Os painéis continuam nos bonecos lá em baixo.</div>';return;}
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true,powerPreference:'high-performance'});}catch(e){$('stage').innerHTML='<div class="nogl">Este dispositivo não deixa usar 3D aqui. Os painéis continuam nos bonecos lá em baixo.</div>';return;}
  const mobile=matchMedia('(max-width:700px)').matches;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(30,1,0.5,400);
  const controls=new THREE.OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.maxPolarAngle=1.42;controls.minDistance=8;controls.maxDistance=120;
  const grad=(()=>{const d=new Uint8Array([110,180,255]);const t=new THREE.DataTexture(d,3,1,THREE.LuminanceFormat);t.minFilter=t.magFilter=THREE.NearestFilter;t.needsUpdate=true;return t;})();
  const matCache={};const M=(c,o={})=>{const k=c+JSON.stringify(o);return matCache[k]||(matCache[k]=new THREE.MeshToonMaterial(Object.assign({color:c,gradientMap:grad},o)));};
  const geoCache={};const BG=(w,h,d)=>{const k=w+'_'+h+'_'+d;return geoCache[k]||(geoCache[k]=new THREE.BoxGeometry(w,h,d));};
  function B(w,h,d,col,x,y,z,parent=scene,o={}){const m=new THREE.Mesh(BG(w,h,d),col&&col.isMaterial?col:M(col,o.mat||{}));m.position.set(x,y,z);m.castShadow=o.cast!==false;m.receiveShadow=true;parent.add(m);return m;}
  function G(x=0,y=0,z=0,parent=scene){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
  function CT(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const t=new THREE.CanvasTexture(c);t.anisotropy=4;return {c,x:c.getContext('2d'),t};}
  function plane(w,h,tex,x,y,z,ry=0,parent=scene,basic=true){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),basic?new THREE.MeshBasicMaterial({map:tex,toneMapped:false}):new THREE.MeshToonMaterial({map:tex,gradientMap:grad}));m.position.set(x,y,z);m.rotation.y=ry;parent.add(m);return m;}
  function signTex(text,bg,fg,w=512,h=128,font=64){const s=CT(w,h);s.x.fillStyle=bg;s.x.fillRect(0,0,w,h);s.x.fillStyle=fg;s.x.font=`bold ${font}px Silkscreen, monospace`;s.x.textAlign='center';s.x.textBaseline='middle';s.x.fillText(text,w/2,h/2+4);s.t.needsUpdate=true;s.redraw=()=>{s.x.fillStyle=bg;s.x.fillRect(0,0,w,h);s.x.fillStyle=fg;s.x.font=`bold ${font}px Silkscreen, monospace`;s.x.fillText(text,w/2,h/2+4);s.t.needsUpdate=true;};return s;}
  const signs=[];

  // ---------- luzes & céu ----------
  const hemi=new THREE.HemisphereLight(0xdfefff,0x6a8a50,0.7);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff2dc,0.95);sun.castShadow=true;sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);
  Object.assign(sun.shadow.camera,{left:-26,right:26,top:26,bottom:-26,near:1,far:120});sun.shadow.bias=-0.0006;sun.shadow.normalBias=0.02;scene.add(sun);scene.add(sun.target);sun.target.position.set(0,0,0);
  const skyGeo=new THREE.SphereGeometry(200,24,12);const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(0x6ab8ff)},bot:{value:new THREE.Color(0xdff1ff)}},
    vertexShader:'varying float h;void main(){h=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform vec3 top;uniform vec3 bot;varying float h;void main(){gl_FragColor=vec4(mix(bot,top,clamp(h*1.6+.1,0.,1.)),1.);}'});
  const sky=new THREE.Mesh(skyGeo,skyMat);scene.add(sky);
  const stars=new THREE.Points((()=>{const g=new THREE.BufferGeometry();const p=[];for(let i=0;i<400;i++){const t=Math.random()*Math.PI*2,u=Math.random()*0.9+0.1;p.push(Math.cos(t)*190*Math.sqrt(1-u*u),u*190,Math.sin(t)*190*Math.sqrt(1-u*u));}g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));return g;})(),new THREE.PointsMaterial({color:0xffffff,size:1.2,sizeAttenuation:false,transparent:true,opacity:0}));scene.add(stars);

  // ---------- terreno: relva, mar, montanhas ----------
  const grass=B(76,0.4,140,0x74c05a,0,-0.42,0,scene,{cast:false});
  const seaGeo=new THREE.PlaneGeometry(120,260,24,60);seaGeo.rotateX(-Math.PI/2);const sea=new THREE.Mesh(seaGeo,new THREE.MeshToonMaterial({color:0x2f8fd8,gradientMap:grad,transparent:true,opacity:.95}));sea.position.set(-98,-0.5,0);scene.add(sea);
  const seaBase=seaGeo.attributes.position.array.slice();
  B(3,0.5,140,0xf2dca5,-36.5,-0.38,0,scene,{cast:false}); // praia
  const mountMat=[M(0x3f8f4a),M(0x4f9e52),M(0x2f7a3e)];
  for(let i=0;i<14;i++){const h=18+((i*37)%17),r=14+((i*13)%9);const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,6+(i%3)),mountMat[i%3]);m.position.set(-90+i*14,h/2-1,-60-((i*29)%25));m.rotation.y=i;scene.add(m);
    if(h>28){const cap=new THREE.Mesh(new THREE.ConeGeometry(r*0.28,h*0.28,6+(i%3)),M(0xf4f4f4));cap.position.set(m.position.x,h-1-h*0.14,m.position.z);cap.rotation.y=i;scene.add(cap);}}
  // casinhas madeirenses nas encostas (branco + telhado laranja)
  for(let i=0;i<22;i++){const x=-60+((i*41)%120),z=-30-((i*17)%22);if(Math.abs(x)<26&&z>-36)continue;const g=G(x,0,z);B(2.2,1.6,2,0xf7f3ea,0,0.8,0,g);const roof=new THREE.Mesh(new THREE.ConeGeometry(1.75,1,4),M(0xd9622b));roof.position.y=2.1;roof.rotation.y=Math.PI/4;roof.castShadow=true;g.add(roof);}

  // ---------- rua ----------
  const RZ=-10,XW=4.4;B(90,0.06,7,0x5b6075,0,-0.2,RZ,scene,{cast:false});
  for(let x=-42;x<=42;x+=4)B(1.8,0.07,0.25,0xf5f5f5,x,-0.17,RZ,scene,{cast:false});
  B(90,0.25,1.6,0xc9ccd6,0,-0.08,RZ+4.3,scene,{cast:false});B(90,0.25,1.6,0xc9ccd6,0,-0.08,RZ-4.3,scene,{cast:false});
  for(let i=0;i<6;i++)B(0.6,0.08,5.6,0xffffff,XW-2.2+i*0.9,-0.15,RZ,scene,{cast:false}); // passadeira
  const lamps=[];for(const x of [-18,-6,6,18]){const g=G(x,0,RZ+4.6);g.rotation.y=Math.PI/2;B(0.16,4.2,0.16,0x2b2d3a,0,2.1,0,g);B(1,0.12,0.16,0x2b2d3a,0.45,4.2,0,g);const bulb=B(0.36,0.14,0.3,0xfff2b0,0.85,4.1,0,g,{mat:{emissive:0x000000}});lamps.push(bulb);}
  const lampLights=[-6,6].map(x=>{const l=new THREE.PointLight(0xffd59a,0,14,1.6);l.position.set(x,3.8,RZ+3.8);scene.add(l);return l;});
  // árvores
  function tree(x,z,s=1){const g=G(x,0,z);B(0.35*s,1.4*s,0.35*s,0x7a4b2a,0,0.7*s,0,g);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2*s,0),M([0x3c9a48,0x47ad52,0x2f8a3e][Math.abs(Math.round(x*z))%3]));c.position.y=2.1*s;c.castShadow=true;g.add(c);return g;}
  for(const [x,z,s] of [[-13,7,1.1],[-14,-2,1.3],[-12.5,12,0.9],[6,9,1],[-5,10,1.2],[22,-22,1.2],[12,4,1],[16,12,1.3],[20,-2,1],[-16,18,1.2],[-20,4,1.4],[10,20,1.1],[0,22,1.3],[-8,26,1],[-24,-20,1.3],[26,-24,1.1],[-28,-5,1.2]])tree(x,z,s);
  for(let i=0;i<8;i++){const g=G(-11+i*1.8,0,6.2);B(1.2,0.5,0.6,0x6a4425,0,0.25,0,g);for(let j=0;j<3;j++){const f=B(0.18,0.18,0.18,[0xff6b9a,0xffd21f,0xffffff][(i+j)%3],-0.35+j*0.35,0.6,0,g);} }
  // carros
  const cars=[];const carCols=[0xe03131,0xffd21f,0x1c7ed6,0xffffff,0x0ca678];
  for(let i=0;i<5;i++){const g=G(-40+i*17,0,RZ+(i%2?-1.6:1.6));const c=carCols[i];B(1.6,0.7,3,c,0,0.55,0,g);B(1.4,0.6,1.6,c,0,1.15,-0.1,g);B(1.42,0.45,1.5,0x9fd8ff,0,1.15,-0.1,g,{cast:false});
    for(const [a,b] of [[-0.8,-1],[0.8,-1],[-0.8,1],[0.8,1]]){const w=B(0.25,0.5,0.5,0x1d1d1d,a,0.25,b,g);}
    const hl=B(1.2,0.18,0.06,0xfff6c0,0,0.62,i%2?-1.52:1.52,g,{cast:false});g.rotation.y=i%2?-Math.PI/2:Math.PI/2;cars.push({g,dir:i%2?-1:1,speed:5+i,hl});}

  // ---------- PRÉDIO DO ESTÚDIO (corte) ----------
  const BX0=-10,BX1=2.6,BZ0=-4.2,BZ1=3.4;const W_=BX1-BX0,D_=BZ1-BZ0,CX=(BX0+BX1)/2,CZ=(BZ0+BZ1)/2;
  const floorCols=[0xe9d6b0,0xd9c7f0,0x3a3550,0xb9d3c4];const wallCols=[0xf6ecdd,0xfff4c9,0x2b2640,null];const edgeCols=[0xc9653a,0x1f9d55,0xe03131,0x6c4cf0];
  const floors=[];// para arrastar bonecos
  const roomLights=[];
  for(let lv=0;lv<4;lv++){const y=FY[lv];
    const slab=B(W_+0.4,0.36,D_+0.4,floorCols[lv],CX,y-0.18,CZ);slab.userData.floor=lv;floors.push(slab);
    B(W_+0.42,0.2,0.06,edgeCols[lv],CX,y-0.1,BZ1+0.2,scene,{cast:false});B(0.06,0.2,D_+0.42,edgeCols[lv],BX1+0.2,y-0.1,CZ,scene,{cast:false});
    if(lv<3){const wc=wallCols[lv];B(W_,3.24,0.3,wc,CX,y+1.62,BZ0+0.15);B(0.3,3.24,D_,wc,BX0+0.15,y+1.62,CZ);
      B(0.3,3.24,0.3,0xdddddd,BX1,y+1.62,BZ1);B(0.3,3.24,0.3,0xdddddd,BX1,y+1.62,BZ0+0.3);B(0.3,3.24,0.3,0xdddddd,BX0+0.3,y+1.62,BZ1);
      const L=new THREE.PointLight(lv===2?0xff8a8a:0xffe2b0,0.25,13,1.6);L.position.set(CX,y+2.8,CZ-0.5);scene.add(L);roomLights.push(L);
      for(const dx of [-3.4,1.6]){B(1.2,0.08,0.4,0xfafafa,CX+dx,y+3.1,CZ-0.6,scene,{cast:false,mat:{emissive:0x333322}});}}}
  // tapete com padrão do piso 0
  B(4.6,0.04,3,0x8e7cf0,-1.6,0.03,1.4,scene,{cast:false});
  // letreiro no topo
  const brandSign=signTex('ESTÚDIO DOS BONECOS','#1d1838','#ffd21f',1024,128,64);signs.push(brandSign);
  const bs=plane(9,1.12,brandSign.t,CX,FY[3]+2.9,BZ0+0.02);B(9.3,1.4,0.2,0x1d1838,CX,FY[3]+2.9,BZ0-0.1);B(0.2,2.3,0.2,0x1d1838,CX-3.8,FY[3]+1.15,BZ0-0.1);B(0.2,2.3,0.2,0x1d1838,CX+3.8,FY[3]+1.15,BZ0-0.1);
  // nomes dos pisos na parede de trás
  const floorSigns=[['CORREIO','#c9653a'],['2 FACTOS','#1f9d55'],['HIT0MS','#e03131']];
  floorSigns.forEach(([t,c],lv)=>{const s=signTex(t,c,'#ffffff',512,128,60);signs.push(s);plane(2.6,0.65,s.t,BX0+2.2,FY[lv]+2.7,BZ0+0.31);});
  const desafSign=signTex('DESAFIOS','#1f9d55','#ffffff',512,128,60);signs.push(desafSign);plane(2.4,0.6,desafSign.t,-0.6,FY[0]+2.7,BZ0+0.31);
  // porta do rés-do-chão para a rua (lado direito aberto) + caminho
  B(1.8,0.08,4.2,0xc9ccd6,XW,-0.16,-3.6,scene,{cast:false});
  // elevador de vidro (lado esquerdo exterior)
  const shaft=G(BX0-1.3,0,1.2);B(1.9,FY[3]+0.2,0.1,M(0x9fd8ff,{transparent:true,opacity:.25}),0,(FY[3]+0.2)/2,-0.95,shaft,{cast:false});B(0.12,FY[3]+0.4,0.12,0x666b80,-0.95,(FY[3])/2,-0.95,shaft);B(0.12,FY[3]+0.4,0.12,0x666b80,0.95,FY[3]/2,-0.95,shaft);B(0.12,FY[3]+0.4,0.12,0x666b80,-0.95,FY[3]/2,0.95,shaft);B(0.12,FY[3]+0.4,0.12,0x666b80,0.95,FY[3]/2,0.95,shaft);
  const cab=G(0,0,0,shaft);B(1.6,0.12,1.6,0xc0c4d0,0,0.06,0,cab);B(1.6,0.12,1.6,0xc0c4d0,0,2.6,0,cab);B(0.08,2.5,1.6,M(0xbfe6ff,{transparent:true,opacity:.35}),-0.78,1.3,0,cab,{cast:false});
  let cabLv=0,cabTo=0,cabT=0;

  // ---------- mobília genérica ----------
  function desk(parent,x,z,w=2.4){const g=G(x,0,z,parent);B(w,0.12,1.1,0x9a6a3f,0,1.02,0,g);for(const [a,b] of [[-w/2+0.12,-0.45],[w/2-0.12,-0.45],[-w/2+0.12,0.45],[w/2-0.12,0.45]])B(0.1,1,0.1,0x6a4425,a,0.5,b,g);
    const ch=G(0,0,1.15,g);B(0.7,0.12,0.7,0x444a66,0,0.62,0,ch);B(0.7,0.7,0.1,0x444a66,0,1.0,0.33,ch);B(0.1,0.58,0.1,0x2b2d3a,0,0.3,0,ch);return g;}
  function screenOn(parent,w,h,x,y,z,ry=0){const g=G(x,y,z,parent);g.rotation.y=ry;B(w+0.12,h+0.12,0.08,0x1d1838,0,0,0,g);const s=CT(256,Math.round(256*h/w));plane(w,h,s.t,0,0,0.05,0,g);B(0.1,0.32,0.1,0x1d1838,0,-h/2-0.16,0,g);s.g=g;return s;}
  function plant(parent,x,z,s=1){const g=G(x,0,z,parent);B(0.5*s,0.5*s,0.5*s,0xc9653a,0,0.25*s,0,g);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(0.45*s,0),M(0x2f9a48));c.position.y=0.85*s;c.castShadow=true;g.add(c);}
  const scr={};
  // ===== Piso 0: CORREIO + DESAFIOS =====
  const P0=G(0,FY[0],0);
  {const d=desk(P0,-7.2,-1.9);scr.car=screenOn(d,1.2,0.72,-0.4,1.6,-0.25);for(let i=0;i<4;i++)B(0.45,0.04,0.32,0xf4e3c3,0.55,1.1+i*0.05,0.1,d);
    // cacifos coloridos por rede
    const cub=G(-9.4,0,-1.2,P0);['#d6336c','#111111','#e62117','#1877f2'].forEach((c,i)=>{B(0.5,0.6,0.9,parseInt(c.slice(1),16),0,0.5+i*0.65,0,cub);B(0.06,0.4,0.6,0x1d1838,0.26,0.5+i*0.65,0,cub,{cast:false});});
    // tapete rolante com encomendas
    const belt=G(-5,0,1.6,P0);B(4.6,0.5,0.8,0x555b70,0,0.25,0,belt);const beltTop=CT(64,16);for(let i=0;i<8;i++){beltTop.x.fillStyle=i%2?'#2b2d3a':'#3a3d50';beltTop.x.fillRect(i*8,0,8,16);}beltTop.t.wrapS=THREE.RepeatWrapping;beltTop.t.repeat.set(6,1);beltTop.t.magFilter=THREE.NearestFilter;
    const bt=new THREE.Mesh(new THREE.PlaneGeometry(4.6,0.7),new THREE.MeshBasicMaterial({map:beltTop.t}));bt.rotation.x=-Math.PI/2;bt.position.y=0.51;belt.add(bt);scr.belt=beltTop;
    scr.parcels=[0,1,2].map(i=>{const p=B(0.45,0.35,0.45,[0xd9a066,0xf4e3c3,0xc98f55][i],-2+i*1.5,0.7,0,belt);return p;});
    // marco do correio
    const mb=G(1.8,0,2.6,P0);B(0.7,1.1,0.6,0xffd21f,0,0.55,0,mb);B(0.72,0.2,0.62,0xe03131,0,1.15,0,mb);
    plant(P0,-9.3,2.7,1.1);}
  {const d=desk(P0,-1.2,-1.9);scr.des=screenOn(d,1.1,0.66,-0.5,1.56,-0.25);
    const e=G(1.6,0,-2.4,P0);B(0.08,2.6,0.08,0x8a5a33,-0.55,1.3,0,e).rotation.z=0.1;B(0.08,2.6,0.08,0x8a5a33,0.55,1.3,0,e).rotation.z=-0.1;scr.easel=CT(256,256);plane(1.4,1.4,scr.easel.t,0,1.95,0.08,0,e);
    // formas gigantes a rodar
    scr.shapes=[new THREE.Mesh(new THREE.ConeGeometry(0.45,0.8,3),M(0xe03131)),new THREE.Mesh(new THREE.BoxGeometry(0.6,0.6,0.6),M(0x1c7ed6)),new THREE.Mesh(new THREE.SphereGeometry(0.38,16,12),M(0xffd21f))];
    scr.shapes.forEach((m,i)=>{m.position.set(-2.4+i*1.2,0.5,2.2);m.castShadow=true;P0.add(m);});}
  // ===== Piso 1: 2 FACTOS =====
  const P1=G(0,FY[1],0);
  {const d=desk(P1,-7,-1.9);scr.gui=screenOn(d,1.1,0.7,0.5,1.58,-0.25);B(0.8,0.3,0.6,0x2b2d3a,-0.5,1.24,0,d);for(let i=0;i<5;i++)B(0.55,0.02,0.75,0xffffff,-0.5+((i*7)%3-1)*0.1,1.4+i*0.02,0.05,d,{cast:false});
    scr.paper=B(0.5,0.6,0.02,0xffffff,-0.5,1.6,-0.15,d,{cast:false});}
  {const d=desk(P1,-1.4,-1.9,2.8);scr.rea=screenOn(d,1.3,0.75,-0.55,1.6,-0.25);scr.rea2=screenOn(d,1.1,0.66,0.75,1.56,-0.2,-0.3);}
  // TV grande + green screen
  scr.tv2f=CT(512,288);{B(3.3,1.9,0.12,0x1d1838,-4.2,FY[1]+2.1,BZ0+0.38);plane(3.1,1.74,scr.tv2f.t,-4.2,FY[1]+2.1,BZ0+0.45);}
  {B(0.1,2.6,2.6,0x2fd15a,1.9,FY[1]+1.4,1.2,scene,{cast:false});const cg=G(-0.2,FY[1],1.6);for(const a of [0,2.1,4.2]){const l=B(0.06,1.6,0.06,0x222222,Math.sin(a)*0.3,0.78,Math.cos(a)*0.3,cg);l.rotation.set(Math.cos(a)*0.2,0,-Math.sin(a)*0.2);}
    const cam_=G(0,1.75,0,cg);B(0.5,0.4,0.7,0x222222,0,0,0,cam_);B(0.3,0.3,0.25,0x444444,0.42,0,0,cam_);scr.rec=B(0.1,0.1,0.1,0xe03131,-0.15,0.26,0.2,cam_,{cast:false,mat:{emissive:0xe03131}});cam_.rotation.y=-Math.PI/2+0.3;}
  plant(P1,-9.3,2.7);
  // bandeirinhas do Brasil (vibe 2 Factos)
  for(let i=0;i<10;i++){const f=B(0.35,0.3,0.02,[0x1f9d55,0xffd21f,0x1c7ed6][i%3],-9.4+i*1.2,FY[1]+3.05,BZ0+0.4,scene,{cast:false});f.rotation.z=0.1*((i%2)*2-1);}
  // ===== Piso 2: HIT0MS LAB =====
  const P2=G(0,FY[2],0);
  {const d=desk(P2,-6.8,-1.9);scr.eng=screenOn(d,1.2,0.72,-0.4,1.6,-0.25);B(0.5,0.3,0.4,0x666b80,0.7,1.23,0,d);}
  // máquina de deixar cair (o formato Hit0Ms!)
  const rig=G(-1.2,FY[2],-0.6);B(3.4,0.12,1.6,0x777e95,0,2.95,0,rig);B(0.14,3,0.14,0x777e95,-1.6,1.5,-0.7,rig);B(0.14,3,0.14,0x777e95,1.6,1.5,-0.7,rig);B(0.14,3,0.14,0x777e95,-1.6,1.5,0.7,rig);B(0.14,3,0.14,0x777e95,1.6,1.5,0.7,rig);
  B(3.2,0.04,1.4,0xffffff,0,0.04,0,rig,{cast:false});
  const msSign=CT(256,96);const msm=plane(1.8,0.68,msSign.t,0,3.45,0.8,0,rig);
  const dropGeo=[new THREE.BoxGeometry(0.5,0.5,0.5),new THREE.SphereGeometry(0.3,14,10),new THREE.CylinderGeometry(0.25,0.25,0.5,12),new THREE.ConeGeometry(0.3,0.55,10)];
  const drops=[0,1,2,3].map(i=>{const m=new THREE.Mesh(dropGeo[i],M([0xff6b6b,0xffd21f,0x4dabf7,0x69db7c][i]));m.castShadow=true;m.position.set(-1.1+i*0.75,2.7,0);rig.add(m);return {m,y:2.7,v:0,t:-i*0.7,state:'wait'};});
  const splats=[];
  B(0.1,2.4,2.4,0x111111,1.9,FY[2]+1.4,-1.8,scene,{cast:false});
  scr.tvh=CT(512,288);{B(3.3,1.9,0.12,0x111111,-4.2,FY[2]+2.1,BZ0+0.38);plane(3.1,1.74,scr.tvh.t,-4.2,FY[2]+2.1,BZ0+0.45);}
  // ===== Terraço: ANALISTA + IDEIAS =====
  const P3=G(0,FY[3],0);
  for(let i=0;i<4;i++){B(W_+0.4,0.6,0.12,0xb7b2c8,CX,0.3,BZ1+0.14,P3);}
  B(W_+0.4,0.6,0.12,0xb7b2c8,CX,FY[3]+0.3,BZ1+0.14);B(0.12,0.6,D_+0.4,0xb7b2c8,BX1+0.14,FY[3]+0.3,CZ);
  {const d=desk(P3,-6.4,-0.6,2);scr.ana=screenOn(d,1.1,0.66,0,1.55,-0.25);}
  // outdoor com gráfico
  scr.bill=CT(640,360);{const g=G(-6.2,FY[3],-2.8);B(0.2,2.4,0.2,0x2b2d3a,-2,1.2,0,g);B(0.2,2.4,0.2,0x2b2d3a,2,1.2,0,g);B(4.6,2.7,0.16,0x2b2d3a,0,3.7,-0.05,g);plane(4.4,2.48,scr.bill.t,0,3.7,0.04,0,g);}
  // lâmpada gigante das ideias
  {const g=G(-0.4,FY[3],-2.4);B(0.8,0.5,0.8,0x888ea0,0,0.25,0,g);B(0.5,0.5,0.5,0xb0b6c6,0,0.75,0,g);
    scr.bulb=new THREE.Mesh(new THREE.SphereGeometry(0.9,20,16),new THREE.MeshBasicMaterial({color:0xfff2a8}));scr.bulb.position.y=1.85;g.add(scr.bulb);
    scr.bulbL=new THREE.PointLight(0xffd27a,0.0,14,1.4);scr.bulbL.position.set(0,1.9,0.4);g.add(scr.bulbL);
    scr.ideaBoard=CT(512,320);plane(3,1.86,scr.ideaBoard.t,0,1.7,0,0,G(2.2,FY[3],-2.6));B(3.2,2.06,0.1,0xb0b0c0,2.2,FY[3]+1.7,-2.68);B(0.12,0.9,0.12,0x777,2.2,FY[3]+0.4,-2.68);}
  // antena
  {const g=G(BX0+1,FY[3],BZ0+0.8);B(0.12,4,0.12,0x777e95,0,2,0,g);scr.beacon=B(0.3,0.3,0.3,0xff3b3b,0,4.1,0,g,{cast:false,mat:{emissive:0x000000}});}
  plant(P3,1.6,2.6,1.2);plant(P3,-9.3,2.6,1.2);
  // cadeiras de praia no terraço
  {const g=G(-3.2,FY[3],2.4);B(0.9,0.1,1.8,0x1c7ed6,0,0.35,0,g);B(0.9,0.9,0.1,0x1c7ed6,0,0.75,-0.85,g).rotation.x=-0.4;const u=G(0.9,0,0,g);B(0.06,2,0.06,0xdddddd,0,1,0,u);const um=new THREE.Mesh(new THREE.ConeGeometry(1.1,0.5,8),M(0xff6b9a));um.position.y=2.1;um.castShadow=true;u.add(um);}

  // ---------- TORRES DAS REDES (do outro lado da rua) ----------
  const TOW=[{k:'IG',x:-9.5,z:-18.5,col:0xd6336c,top:0xf77737,label:'INSTAGRAM'},{k:'TT',x:-3.5,z:-18.5,col:0x1b1b1b,top:0x25f4ee,label:'TIKTOK'},{k:'YT',x:2.5,z:-18.5,col:0xe62117,top:0xffffff,label:'YOUTUBE'},{k:'FB',x:8.5,z:-18.5,col:0x1877f2,top:0xffffff,label:'FACEBOOK'}];
  for(const t of TOW){t.g=G(t.x,0,t.z);const wt=CT(64,128);const cs='#'+t.col.toString(16).padStart(6,'0');wt.x.fillStyle=cs;wt.x.fillRect(0,0,64,128);
    t.winT=wt;t.paintWin=(night)=>{wt.x.fillStyle=cs;wt.x.fillRect(0,0,64,128);for(let y=6;y<128;y+=16)for(let x=6;x<64;x+=16){wt.x.fillStyle=night&&((x*7+y*3)%5)?'rgba(255,226,140,.95)':'rgba(220,240,255,.55)';wt.x.fillRect(x,y,8,9);}wt.t.needsUpdate=true;};t.paintWin(false);
    wt.t.wrapS=wt.t.wrapT=THREE.RepeatWrapping;
    t.body=new THREE.Mesh(new THREE.BoxGeometry(4,1,4),new THREE.MeshToonMaterial({map:wt.t,gradientMap:grad}));t.body.castShadow=t.body.receiveShadow=true;t.g.add(t.body);
    t.roof=B(4.3,0.3,4.3,t.top,0,1,0,t.g);t.door=B(1.2,1.4,0.06,0x3b2a1a,0,0.7,2.01,t.g);
    const s=signTex(t.label,'#1d1838','#ffffff',512,96,52);signs.push(s);t.sign=plane(3.6,0.68,s.t,0,2,2.04,0,t.g);
    t.beacon=B(0.4,0.4,0.4,0xffffff,0,1.4,0,t.g,{cast:false});t.h=2;t.goal=2;
    t.tag=document.createElement('div');t.tag.className='tag net';$('tags').append(t.tag);}
  function setTowerH(t,h){t.h=h;t.body.scale.y=h;t.body.position.y=h/2;t.roof.position.y=h+0.15;t.beacon.position.y=h+0.55;t.winT.t.repeat.set(1,Math.max(1,h/4));t.sign.position.y=Math.min(h-0.6,3.2);}
  TOW.forEach(t=>setTowerH(t,2));
  // nuvens & pássaros
  const clouds=[];for(let i=0;i<9;i++){const c=G(-80+i*20,22+(i%3)*4,-40+((i*23)%60));for(let j=0;j<4;j++)B(3-j*0.4,1.3,2.2,M(0xffffff,{transparent:true,opacity:.95}),j*1.6,j%2?0.5:0,(j%2)*0.4,c,{cast:false});clouds.push(c);}
  const birds=[];for(let i=0;i<5;i++){const b=G(0,16+i,0);const w1=B(0.8,0.06,0.25,0x1d1838,-0.4,0,0,b,{cast:false}),w2=B(0.8,0.06,0.25,0x1d1838,0.4,0,0,b,{cast:false});birds.push({b,w1,w2,ph:i*1.3,r:28+i*3});}

  // ---------- BONECOS ----------
  const pick=[];
  function makeBoneco(c){const g=G();const skin=0xf2c39c;
    const legL=G(-0.17,0.82,0,g),legR=G(0.17,0.82,0,g);
    B(0.27,0.8,0.3,c.pants,0,-0.4,0,legL);B(0.27,0.8,0.3,c.pants,0,-0.4,0,legR);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legL);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legR);
    const torso=G(0,0.82,0,g);B(0.74,0.86,0.44,c.shirt,0,0.43,0,torso);B(0.76,0.12,0.46,0x2b2d3a,0,0.04,0,torso);
    if(c.id==='car'){B(0.2,0.7,0.06,0x8a5a33,0.25,0.5,-0.24,torso).rotation.z=0.6;const bag=B(0.5,0.45,0.2,0x8a5a33,-0.42,0.15,0.0,torso);}
    const armL=G(-0.5,1.6,0,g),armR=G(0.5,1.6,0,g);
    B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armL);B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armR);B(0.2,0.18,0.22,skin,0,-0.74,0,armL);B(0.2,0.18,0.22,skin,0,-0.74,0,armR);
    const head=G(0,1.98,0,g);B(0.64,0.6,0.58,skin,0,0,0,head);B(0.68,0.2,0.62,c.hair,0,0.28,-0.02,head);B(0.68,0.42,0.12,c.hair,0,0.1,-0.3,head);
    if(c.cap){B(0.7,0.16,0.64,c.hat,0,0.36,0,head);B(0.5,0.06,0.3,c.hat,0,0.3,0.44,head);}
    if(c.beret){const b=B(0.78,0.12,0.72,c.hat,0.06,0.42,0,head);b.rotation.z=0.18;}
    if(c.helmet){B(0.74,0.26,0.68,c.hat,0,0.38,0,head);B(0.8,0.06,0.74,c.hat,0,0.26,0.04,head);}
    const eyeL=B(0.09,0.12,0.04,0x1d1838,-0.14,0.04,0.3,head,{cast:false}),eyeR=B(0.09,0.12,0.04,0x1d1838,0.14,0.04,0.3,head,{cast:false});
    if(c.glasses){B(0.5,0.04,0.03,0x1d1838,0,0.1,0.31,head,{cast:false});B(0.18,0.16,0.02,M(0xbfe6ff,{transparent:true,opacity:.5}),-0.14,0.04,0.32,head,{cast:false});B(0.18,0.16,0.02,M(0xbfe6ff,{transparent:true,opacity:.5}),0.14,0.04,0.32,head,{cast:false});}
    B(0.18,0.04,0.04,0x9a4a3a,0,-0.15,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,-0.22,-0.08,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,0.22,-0.08,0.3,head,{cast:false});
    if(c.id==='car'){c.letter=B(0.45,0.3,0.06,0xf4e3c3,0,-0.62,0.2,armR);c.letter.visible=false;}
    if(c.id==='ide'){c.idea=B(0.3,0.3,0.3,0xffe66d,0,0.85,0,head,{cast:false});c.idea.visible=false;}
    const sh=new THREE.Mesh(new THREE.CircleGeometry(0.45,16),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.22,depthWrite:false}));sh.rotation.x=-Math.PI/2;scene.add(sh);c.shadowDisc=sh;
    g.traverse(o=>{if(o.isMesh){o.userData.ch=c;pick.push(o);}});
    c.g=g;c.p={legL,legR,armL,armR,head,torso,eyeL,eyeR};
    c.tag=document.createElement('div');c.tag.className='tag';c.tag.textContent=c.name;$('tags').append(c.tag);}
  let saved={};try{saved=JSON.parse(localStorage.getItem('estudio-pos-v2')||'{}')||{};}catch{}
  for(const c of CH){makeBoneco(c);const s=saved[c.id];c.lv=s?s.lv:c.lv;c.pos=new THREE.Vector3(s?s.x:c.home[0],FY[c.lv],s?s.z:c.home[1]);
    c.mode=s?'free':'work';c.route=[];c.walk=Math.random()*6;c.jump=0;c.rot=c.face;c.blink=Math.random()*4;c.idle=3+Math.random()*5;c.g.position.copy(c.pos);c.g.rotation.y=c.face;}
  const HOME={};for(const c of CH)HOME[c.id]={lv:[0,0,1,1,2,3,3][CH.indexOf(c)],x:c.home[0],z:c.home[1]};
  function savePos(){try{const o={};for(const c of CH)if(c.mode==='free')o[c.id]={lv:c.lv,x:+c.pos.x.toFixed(2),z:+c.pos.z.toFixed(2)};localStorage.setItem('estudio-pos-v2',JSON.stringify(o));}catch{}}
  function goHome(c){const h=HOME[c.id];if(c.lv!==h.lv){c.lv=h.lv;c.pos.set(h.x,FY[h.lv],h.z+1.2);c.jump=0.001;}c.route=[new THREE.Vector3(h.x,FY[h.lv],h.z)];c.mode='walk';c.after='work';}
  $('home').addEventListener('click',()=>{for(const c of CH)goHome(c);try{localStorage.removeItem('estudio-pos-v2');}catch{}toast('Todos de volta ao trabalho!');});

  // ---------- falas ----------
  function line(c){const L=lis();if(!D)return '…';
    if(c.id==='car'){if(!D.hasMC)return 'Ainda à espera do Metricool…';const n=D.next;const t=D.today;if(n)return `Próximo: ${n.date===L.date?'hoje':dm(n.date)} às ${n.time} · ${LABEL[n.acct]} · ${n.title.slice(0,36)}`;return t.length?`Hoje já saiu tudo (${t.length} posts)! 📬`:'Não há nada pendente.';}
    if(c.id==='ana'){if(!D.hasW)return 'A fazer contas no Windsor…';const a=D.a['2factos'],b=D.a.hit0ms;return `IG 7 dias: 2 Factos ${short(a.ig7)} · Hit0Ms ${short(b.ig7)}. Facebook Hit0Ms ${short(b.fb7)} plays!`;}
    if(c.id==='rea'){if(!D.hasW)return 'A rever as gravações…';const top=[...D.vids].sort((a,b)=>(+b.views||0)-(+a.views||0))[0];return top?`Campeão do mês: ${capLine(top.cap).slice(0,38)} (${short(top.views)} no ${NET[top.k]})`:'Sem vídeos ainda.';}
    if(c.id==='eng'){if(!D.hasW)return 'A calibrar a máquina…';const t=D.vids.filter(v=>v.k==='IG'&&v.trial).length;return t?`Já testámos ${t} trial reels. Vê o laboratório!`:'Ainda sem trial reels com números.';}
    if(c.id==='ide'){const n=ST.db?.ideas?.length||0;return n?`Tenho ${n} ideias fresquinhas! Escolhe 💡`:'As ideias chegam às 8:53 ☕';}
    if(c.id==='gui'){const v=ST.ped.filter(p=>p.estado==='precisa_voz').length,a=ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length;return v?`Preciso da tua voz em ${v} guião${v>1?'s':''}! 🎙️`:a?`${a} pedido${a>1?'s':''} em produção ✍️`:'Sem pedidos. Manda-me ideias!';}
    if(c.id==='des'){const n=ST.db?.challenges?.length||0;return n?`${n} desafios em imagem a correr 🔺`:'Quantos triângulos vês? 🔺🔺';}
    return '';}
  let sayT=0;say=function(c){$('bubble').textContent=line(c);$('bubble').classList.add('on');sayT=performance.now()+6500;};

  // ---------- ecrãs ----------
  function scrText(s,title,big,small,col='#5fe08a',bg='#0b1a2e'){const {x,c}=s;x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle=col;x.textAlign='center';x.textBaseline='middle';
    x.font=`bold ${Math.round(c.height*0.13)}px Silkscreen, monospace`;x.fillText(title,c.width/2,c.height*0.18);x.font=`bold ${Math.round(c.height*0.34)}px Silkscreen, monospace`;x.fillText(big,c.width/2,c.height*0.52);
    x.font=`${Math.round(c.height*0.11)}px Silkscreen, monospace`;x.fillStyle='#cfd8ff';x.fillText(small,c.width/2,c.height*0.85);s.t.needsUpdate=true;}
  function miniBars(s,title,vals,col,bg='#0b1a2e'){const {x,c}=s;x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font=`bold ${Math.round(c.height*0.09)}px Silkscreen, monospace`;x.textAlign='left';x.textBaseline='top';x.fillText(title,c.width*0.05,c.height*0.05);
    const v=vals.map(a=>+a||0);const mx=Math.max(1,...v);const bw=c.width*0.9/v.length;v.forEach((a,i)=>{const h=(c.height*0.62)*a/mx;x.fillStyle=col;x.fillRect(c.width*0.05+i*bw+1,c.height*0.88-h,bw-3,h);});
    x.fillStyle='#cfd8ff';x.font=`${Math.round(c.height*0.075)}px Silkscreen, monospace`;x.textAlign='right';x.fillText('máx '+short(mx),c.width*0.95,c.height*0.05);s.t.needsUpdate=true;}
  function drawScreens(){if(!D)return;const L=lis();const t=D.today;
    scrText(scr.car,'POSTS HOJE',D.hasMC?`${t.filter(p=>p.state==='done').length}/${t.length}`:'...',D.next?`a seguir ${D.next.time}`:'metricool','#ffd21f');
    scrText(scr.des,'DESAFIOS',String(ST.db?.challenges?.length||0),'facebook','#7fe3a0');
    const v=ST.ped.filter(p=>p.estado==='precisa_voz').length;scrText(scr.gui,'GUIÕES',String(ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length),v?`${v} à espera da voz`:'em produção','#ffe066');
    const a2=D.a['2factos'],ah=D.a.hit0ms,days=D.days.slice(-15,-1);
    scrText(scr.rea,'VÍDEOS 28D',D.hasW?String(new Set(D.vids.map(x=>x.date+x.acct)).size):'...','REC ●','#ff6b6b');
    miniBars(scr.rea2,'IG 2F',days.map(d=>a2.igV[d]),'#0ca678');
    scrText(scr.eng,'TRIALS',D.hasW?String(D.vids.filter(x=>x.k==='IG'&&x.trial).length):'...','instagram','#b197fc');
    scrText(scr.ana,'VIEWS 7D',D.hasW?short(a2.ig7+ah.ig7+a2.fb7+ah.fb7+a2.tt7+ah.tt7+a2.yt7+ah.yt7):'...','todas as redes','#5fe08a');
    miniBars(scr.tv2f,'2 FACTOS · INSTAGRAM POR DIA',days.map(d=>a2.igV[d]),'#ffd21f','#0d3b26');
    miniBars(scr.tvh,'HIT0MS · FACEBOOK POR DIA',days.map(d=>ah.fbP[d]),'#ff6b6b','#1a0d0d');
    // outdoor: views IG por dia das duas contas
    {const s=scr.bill,x=s.x,c=s.c;x.fillStyle='#fdfcff';x.fillRect(0,0,c.width,c.height);x.fillStyle='#1d1838';x.font='bold 30px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('INSTAGRAM · VIEWS POR DIA',24,18);
      const ds=D.days.slice(0,-1),A=ds.map(d=>a2.igV[d]||0),Hh=ds.map(d=>ah.igV[d]||0);const mx=Math.max(1,...A,...Hh);
      const px=i=>40+(c.width-70)*i/(ds.length-1),py=v=>c.height-50-(c.height-120)*v/mx;
      x.strokeStyle='#e4dff2';x.lineWidth=2;for(let i=0;i<=3;i++){const yv=py(mx*i/3);x.beginPath();x.moveTo(40,yv);x.lineTo(c.width-30,yv);x.stroke();}
      for(const [arr,col,nm] of [[A,'#0ca678','2 Factos'],[Hh,'#d6336c','Hit0Ms']]){x.strokeStyle=col;x.lineWidth=6;x.lineJoin='round';x.beginPath();arr.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));x.stroke();}
      x.font='bold 22px Inter, sans-serif';x.fillStyle='#0ca678';x.fillText('● 2 Factos',24,62);x.fillStyle='#d6336c';x.fillText('● Hit0Ms',190,62);x.fillStyle='#6b6590';x.textAlign='right';x.fillText('máx '+short(mx),c.width-24,62);s.t.needsUpdate=true;}
    // quadro das ideias
    {const s=scr.ideaBoard,x=s.x;x.fillStyle='#fdfdfd';x.fillRect(0,0,512,320);x.fillStyle='#1d1838';x.font='bold 28px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('IDEIAS DE HOJE',18,14);
      const I=(ST.db?.ideas||[]).slice(0,9);x.font='18px Inter, sans-serif';if(!I.length){x.fillStyle='#6b6590';x.fillText('chegam com o relatório das 8:53',18,64);}
      I.forEach((it,i)=>{x.fillStyle=['#d6336c','#6c4cf0','#0ca678'][i%3];x.fillText(`${it.n}. ${String(it.text).slice(0,40)}`,18,58+i*28);});s.t.needsUpdate=true;}
    for(const t of TOW){const v=D.net7[t.k]||0;t.goal=2.2+Math.min(13,Math.log10(1+v)*2.1);
      const pend=D.today.some(p=>p.state==='pend'&&p.nets.some(n=>n.k===t.k&&n.s!=='done'));t.pending=pend;
      t.tag.innerHTML=`${esc(NET[t.k])} · ${esc(short(v))} views 7d${pend?'<span class="badge">post hoje</span>':''}`;}
    const nI=(ST.db?.ideas||[]).length;scr.ideasOn=nI>0;}
  function drawEasel(k){const e=scr.easel,x=e.x;x.fillStyle='#fff';x.fillRect(0,0,256,256);x.lineWidth=4;x.strokeStyle='#1d1838';const cols=['#e03131','#1c7ed6','#ffd21f','#0ca678'];
    for(let i=0;i<9;i++){x.fillStyle=cols[(i+k)%4];const cx=50+(i%3)*78,cy=50+Math.floor(i/3)*70,s=24;x.beginPath();const kind=(i*2+k)%3;if(kind===0){x.moveTo(cx,cy-s);x.lineTo(cx-s,cy+s);x.lineTo(cx+s,cy+s);x.closePath();}else if(kind===1)x.rect(cx-s,cy-s,2*s,2*s);else x.arc(cx,cy,s,0,7);x.fill();x.stroke();}
    x.fillStyle='#1d1838';x.font='bold 22px Silkscreen, monospace';x.textAlign='center';x.fillText('QUANTOS 🔺?',128,244);e.t.needsUpdate=true;}
  let ek=0;drawEasel(0);setInterval(()=>drawEasel(++ek),3000);
  function redrawSigns(){signs.forEach(s=>s.redraw());drawScreens();drawEasel(ek);}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(redrawSigns);

  // ---------- carteiro entrega ----------
  const seen={};let first=true;const car=CH[0];
  function deliver(k){const t=TOW.find(x=>x.k===k)||TOW[0];if(car.mode==='held')return;
    if(car.lv!==0){car.lv=0;car.pos.set(HOME.car.x,0,HOME.car.z+1.2);}
    const V=(x,z)=>new THREE.Vector3(x,0,z);car.route=[V(HOME.car.x,1.6),V(XW,1.6),V(XW,RZ+3.6),V(XW,RZ-3.6),V(t.x,RZ-3.6),V(t.x,t.z+2.6),V(t.x,RZ-3.6),V(XW,RZ-3.6),V(XW,RZ+3.6),V(XW,1.6),V(HOME.car.x,1.6),V(HOME.car.x,HOME.car.z)];
    car.mode='walk';car.after='work';car.letter.visible=true;car.dropAt=6;car.dropT=t;}
  onWorld=()=>{drawScreens();const fresh=[];for(const p of D.posts)for(const n of p.nets){const k=p.id+n.k;if(seen[k]&&seen[k]!=='done'&&n.s==='done')fresh.push(n.k);seen[k]=n.s;}
    if(!first&&fresh.length)deliver(fresh[0]);if(D.hasMC)first=false;if(selected&&performance.now()<sayT)$('bubble').textContent=line(selected);};
  const conf=[];const confG=new THREE.BoxGeometry(0.18,0.18,0.05);
  function burst(p,n=50){if(reduce)return;for(let i=0;i<n;i++){const m=new THREE.Mesh(confG,new THREE.MeshBasicMaterial({color:[0xe64980,0xffd21f,0x25f4ee,0x339af0,0x69db7c][i%5]}));m.position.copy(p);m.userData={v:new THREE.Vector3((Math.random()-.5)*8,5+Math.random()*6,(Math.random()-.5)*8),life:2.4};scene.add(m);conf.push(m);}}

  // ---------- câmara ----------
  const VIEWS=[{k:'geral',n:'Geral',t:mobile?[-3.5,5,-5]:[-1,5,-6],d:mobile?84:60,dir:[0.75,0.5,1.1]},{k:'p3',n:'Terraço',t:[-4,FY[3]+1.2,0],d:22,dir:[0.9,0.75,1.1]},{k:'p2',n:'Hit0Ms',t:[-4,FY[2]+1.2,0],d:20,dir:[0.8,0.4,1.2]},{k:'p1',n:'2 Factos',t:[-4,FY[1]+1.2,0],d:20,dir:[0.8,0.4,1.2]},{k:'p0',n:'Correio',t:[-4,FY[0]+1.2,0],d:20,dir:[0.8,0.42,1.2]},{k:'rua',n:'Rua e redes',t:[-0.5,4,-16],d:38,dir:[0.35,0.42,1]}];
  let fly=null;function goView(v,instant){const dir=new THREE.Vector3(...v.dir).normalize();const tgt=new THREE.Vector3(...v.t);const pos=tgt.clone().addScaledVector(dir,v.d);
    if(instant||reduce){controls.target.copy(tgt);cam.position.copy(pos);controls.update();}else fly={t0:performance.now(),dur:900,fromT:controls.target.clone(),fromP:cam.position.clone(),toT:tgt,toP:pos};
    for(const b of $('views').children)b.setAttribute('aria-pressed',String(b.dataset.k===v.k));}
  for(const v of VIEWS){const b=document.createElement('button');b.type='button';b.dataset.k=v.k;b.textContent=v.n;b.setAttribute('aria-pressed','false');b.onclick=()=>goView(v);$('views').append(b);}
  flyTo=c=>{const v=VIEWS.find(x=>x.k==='p'+c.lv);if(v)goView(v);};
  goView(VIEWS[0],true);

  // ---------- arrastar entre andares ----------
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2(),ground=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
  let drag=null,down=null;
  function setPtr(e){const r=renderer.domElement.getBoundingClientRect();ptr.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ptr,cam);}
  function dropTarget(){// pisos primeiro (de cima para baixo), depois o chão
    const h=ray.intersectObjects(floors,false).filter(x=>x.face&&x.face.normal.y>0.5)[0];
    if(h){const lv=h.object.userData.floor;return {lv,x:THREE.MathUtils.clamp(h.point.x,BX0+0.7,BX1-0.3),z:THREE.MathUtils.clamp(h.point.z,BZ0+0.7,BZ1-0.2)};}
    ground.constant=0;if(ray.ray.intersectPlane(ground,hit))return {lv:0,x:THREE.MathUtils.clamp(hit.x,-30,30),z:THREE.MathUtils.clamp(hit.z,-30,30)};return null;}
  renderer.domElement.addEventListener('pointerdown',e=>{setPtr(e);const h=ray.intersectObjects(pick,false)[0];hideHint();
    if(h){drag=h.object.userData.ch;down={x:e.clientX,y:e.clientY,moved:false};controls.enabled=false;renderer.domElement.setPointerCapture(e.pointerId);renderer.domElement.style.cursor='grabbing';}});
  renderer.domElement.addEventListener('pointermove',e=>{setPtr(e);
    if(!drag){const h=ray.intersectObjects(pick,false)[0];renderer.domElement.style.cursor=h?'grab':'';return;}
    if(!down.moved&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down.moved=true;drag.mode='held';drag.route=[];if(drag.letter)drag.letter.visible=false;}
    if(down.moved){const t=dropTarget();if(t){drag.lv=t.lv;drag.pos.set(t.x,FY[t.lv],t.z);}}});
  function up(){if(!drag)return;const c=drag;drag=null;controls.enabled=true;renderer.domElement.style.cursor='';
    if(down.moved){c.mode='free';c.jump=0.001;savePos();}else select(c);}
  renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);
  let hintGone=false;function hideHint(){if(hintGone)return;hintGone=true;$('hint').style.opacity='0';}setTimeout(hideHint,10000);

  // ---------- pixel & tamanho ----------
  let pixel=false;$('pixel').addEventListener('click',()=>{pixel=!pixel;$('pixel').setAttribute('aria-pressed',String(pixel));$('gl').classList.toggle('pixel',pixel);resize();});
  function resize(){const w=innerWidth,h=innerHeight;renderer.setPixelRatio(pixel?1/3:Math.min(devicePixelRatio,mobile?1.75:2));renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
  addEventListener('resize',resize);resize();

  // ---------- dia / noite ----------
  let nightK=0;
  function sky_(){const L=lis();const h=L.min/60;
    // 0 = dia, 1 = noite; transições ao nascer (7-8h) e pôr do sol (17:30-19h, novembro)
    const n=h<6.5?1:h<8?1-(h-6.5)/1.5:h<17.3?0:h<19?(h-17.3)/1.7:1;nightK=n;const dusk=Math.max(0,1-Math.abs(n-0.5)*2);
    const top=new THREE.Color(0x58a8f5).lerp(new THREE.Color(0x0b1030),n),bot=new THREE.Color(0xdff1ff).lerp(new THREE.Color(0x1d2350),n).lerp(new THREE.Color(0xffa36b),dusk*0.7);
    skyMat.uniforms.top.value.copy(top);skyMat.uniforms.bot.value.copy(bot);scene.fog=new THREE.Fog(bot.getHex(),90,230);
    const ang=(h-6)/12*Math.PI;sun.position.set(Math.cos(ang)*40+10,Math.max(8,Math.sin(ang)*45),30);sun.intensity=0.95*(1-n)+0.18;sun.color.set(n>0.5?0x9fb4ff:dusk>0.3?0xffc28a:0xfff2dc);
    hemi.intensity=0.7-0.38*n;stars.material.opacity=n;roomLights.forEach(l=>l.intensity=0.25+1.1*n);lampLights.forEach(l=>l.intensity=1.6*n);
    lamps.forEach(b=>b.material.emissive&&b.material.emissive.setHex(n>0.4?0xffd27a:0x000000));
    sea.material.color.set(new THREE.Color(0x2f8fd8).lerp(new THREE.Color(0x0e2650),n));
    TOW.forEach(t=>t.paintWin(n>0.4));cars.forEach(c=>c.hl.material.emissive&&c.hl.material.emissive.setHex(n>0.4?0xfff2a0:0));}
  sky_();setInterval(sky_,60000);

  // ---------- ciclo ----------
  const clk=new THREE.Clock(),tmp=new THREE.Vector3(),tmp2=new THREE.Vector3();
  function project(v,el,dy=0){tmp.copy(v);tmp.y+=dy;tmp.project(cam);const vis=tmp.z<1&&Math.abs(tmp.x)<1.05&&Math.abs(tmp.y)<1.05;el.style.display=vis?'':'none';
    if(vis)el.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,-100%)`;return vis;}
  let lastScreens=0,occF=0;const occRay=new THREE.Raycaster();
  function occlusion(){for(const c of CH){tmp.copy(c.g.position);tmp.y+=1.0;const dir=tmp.clone().sub(cam.position);const dist=dir.length();occRay.set(cam.position,dir.normalize());occRay.far=dist-0.4;c.occ=occRay.intersectObjects(floors,false).length>0;}}
  function step(){requestAnimationFrame(step);const dt=Math.min(clk.getDelta(),0.05),t=clk.elapsedTime;
    if(fly){const k=Math.min(1,(performance.now()-fly.t0)/fly.dur),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;controls.target.lerpVectors(fly.fromT,fly.toT,e);cam.position.lerpVectors(fly.fromP,fly.toP,e);if(k>=1)fly=null;}
    controls.update();if(++occF%6===0)occlusion();
    // mar
    if(!reduce){const p=seaGeo.attributes.position.array;for(let i=0;i<p.length;i+=3){p[i+1]=Math.sin(seaBase[i+2]*0.12+t*1.1)*0.25+Math.cos(seaBase[i]*0.18+t*0.8)*0.2;}seaGeo.attributes.position.needsUpdate=true;}
    // bonecos
    for(const c of CH){const p=c.p;
      if(c.mode==='walk'&&c.route.length){const tg=c.route[0];tmp2.copy(tg).sub(c.pos);tmp2.y=0;const dist=tmp2.length();
        if(dist<0.08){c.route.shift();if(c.dropAt!=null){c.dropAt--;if(c.dropAt===0){c.letter.visible=false;c.dropT.flash=1.5;burst(c.dropT.g.position.clone().setY(c.dropT.h+0.8));c.jump=0.001;}}if(!c.route.length){c.mode=c.after||'free';c.dropAt=null;}}
        else{tmp2.normalize();c.pos.addScaledVector(tmp2,Math.min(dist,dt*(c.id==='car'?3.6:2.6)));c.rot=Math.atan2(tmp2.x,tmp2.z);c.walk+=dt*11;}}
      const moving=c.mode==='walk'&&c.route.length>0;
      // passeio de vez em quando (só em modo livre/trabalho no próprio piso)
      if(c.mode==='work'&&!reduce){c.idle-=dt;if(c.idle<0){c.idle=14+Math.random()*16;const h=HOME[c.id];if(c.lv===h.lv){const wx=THREE.MathUtils.clamp(h.x+(Math.random()-.5)*3,BX0+0.8,BX1-0.4),wz=THREE.MathUtils.clamp(h.z+1.2+Math.random()*1.6,BZ0+0.8,BZ1-0.3);
        c.route=[new THREE.Vector3(wx,FY[c.lv],wz),new THREE.Vector3(h.x,FY[c.lv],h.z)];c.mode='walk';c.after='work';}}}
      if(c.mode==='work')c.rot=c.face;
      let dr=c.rot-c.g.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));c.g.rotation.y+=dr*Math.min(1,dt*10);
      const sw=moving?Math.sin(c.walk)*0.75:0;
      p.armL.rotation.z=p.armR.rotation.z=0;p.head.rotation.x=0;
      if(c.mode==='held'){const w=Math.sin(t*14)*0.6;p.legL.rotation.x=w;p.legR.rotation.x=-w;p.armL.rotation.x=p.armR.rotation.x=0;p.armL.rotation.z=-2.5;p.armR.rotation.z=2.5;}
      else if(c.mode==='work'){p.legL.rotation.x=p.legR.rotation.x=0;const ty=Math.sin(t*12+c.home[0])*0.22;p.armL.rotation.x=-1.15+ty;p.armR.rotation.x=-1.15-ty;p.head.rotation.x=0.12+Math.sin(t*1.2+c.home[0])*0.05;p.head.rotation.y=Math.sin(t*0.5+c.home[1])*0.15;}
      else{p.legL.rotation.x=sw;p.legR.rotation.x=-sw;p.armL.rotation.x=-sw*0.8;p.armR.rotation.x=(c.letter&&c.letter.visible)?-1.4:sw*0.8;p.head.rotation.y=moving?0:Math.sin(t*0.7+c.home[1])*0.5;}
      c.blink-=dt;const bl=c.blink<0.12;p.eyeL.scale.y=p.eyeR.scale.y=bl?0.15:1;if(c.blink<0)c.blink=2+Math.random()*4;
      if(c.idea)c.idea.visible=c.mode==='work'&&scr.ideasOn&&Math.floor(t*1.2)%3===0;
      let y=FY[c.lv];if(c.mode==='held')y+=1.3+Math.sin(t*6)*0.08;
      if(c.jump>0){c.jump+=dt*2.6;y+=Math.sin(Math.min(Math.PI,c.jump*Math.PI))*0.9;if(c.jump>=1)c.jump=0;}
      if(moving)y+=Math.abs(Math.sin(c.walk))*0.07;
      c.g.position.set(c.pos.x,y,c.pos.z);c.shadowDisc.position.set(c.pos.x,FY[c.lv]+0.02,c.pos.z);c.shadowDisc.material.opacity=c.mode==='held'?0.12:0.22;
      if(c.occ&&c.mode!=='held')c.tag.style.display='none';else project(c.g.position,c.tag,2.55);}
    // máquina Hit0Ms
    for(const d of drops){d.t+=dt;if(d.state==='wait'&&d.t>0){d.state='fall';d.v=0;}
      if(d.state==='fall'){d.v-=dt*14;d.y+=d.v*dt;if(d.y<=0.3){d.y=0.3;d.state='squash';d.t=0;if(splats.length<10&&!reduce){const s=new THREE.Mesh(new THREE.CircleGeometry(0.4,10),new THREE.MeshBasicMaterial({color:d.m.material.color,transparent:true,opacity:.8}));s.rotation.x=-Math.PI/2;s.position.set(d.m.position.x,0.07,0);s.userData.life=1.4;rig.add(s);splats.push(s);}}}
      if(d.state==='squash'){const k=Math.min(1,d.t/0.5);d.m.scale.set(1+0.6*(1-k)*Math.sin(k*9),1-0.5*(1-k),1+0.6*(1-k)*Math.sin(k*9));if(d.t>1.4){d.state='wait';d.t=-1.5-Math.random()*1.5;d.y=2.7;d.m.scale.set(1,1,1);}}
      d.m.position.y=d.y;d.m.rotation.y+=dt;}
    for(let i=splats.length-1;i>=0;i--){const s=splats[i];s.userData.life-=dt;s.material.opacity=Math.max(0,s.userData.life/1.4*0.8);s.scale.setScalar(1+(1.4-s.userData.life));if(s.userData.life<=0){rig.remove(s);s.material.dispose();s.geometry.dispose();splats.splice(i,1);}}
    {const ms=Math.floor((t*1000)%1000);msSign.x.fillStyle='#111';msSign.x.fillRect(0,0,256,96);msSign.x.fillStyle=ms<60?'#69db7c':'#ff6b6b';msSign.x.font='bold 54px Silkscreen, monospace';msSign.x.textAlign='center';msSign.x.textBaseline='middle';msSign.x.fillText(String(ms).padStart(3,'0')+'ms',128,52);msSign.t.needsUpdate=true;}
    // correio
    scr.belt.t.offset.x=(scr.belt.t.offset.x-dt*0.6)%1;scr.parcels.forEach(p=>{p.position.x+=dt*0.9;if(p.position.x>2.1)p.position.x=-2.1;});
    scr.shapes.forEach((m,i)=>{m.rotation.y+=dt*(0.6+i*0.3);m.position.y=0.55+Math.sin(t*1.5+i)*0.15;});
    scr.rec.visible=Math.floor(t*2)%2===0;scr.paper.position.y=1.6+Math.sin(t*3)*0.02;
    // lâmpada das ideias
    const on=scr.ideasOn;const pulse=on?0.75+0.25*Math.sin(t*3):0.1;scr.bulb.material.color.setHSL(0.14,on?1:0.15,on?0.55+0.15*pulse:0.75);scr.bulbL.intensity=on?1.4*pulse+nightK:0;
    scr.beacon.material.color.set(Math.floor(t*1.5)%2?0xff3b3b:0x551111);
    // elevador
    cabT-=dt;if(cabT<0){cabTo=(cabLv+1+Math.floor(Math.random()*3))%4;cabT=7;}cabLv+= (cabTo-cabLv)*Math.min(1,dt*1.2);cab.position.y=FY[0]+(FY[3]-FY[0])*(cabLv/3);
    // torres
    for(const tw of TOW){if(Math.abs(tw.goal-tw.h)>0.01)setTowerH(tw,tw.h+(tw.goal-tw.h)*0.05);
      if(tw.flash>0)tw.flash-=dt;tw.beacon.material.color.set(tw.flash>0?(Math.floor(t*10)%2?0xffd21f:0xffffff):tw.pending?(Math.floor(t*2)%2?0xffd21f:0x886600):0xdddddd);
      project(tw.g.position,tw.tag,tw.h+1.4);}
    // carros, nuvens, pássaros
    for(const c of cars){c.g.position.x+=c.dir*c.speed*dt;if(c.g.position.x>44)c.g.position.x=-44;if(c.g.position.x<-44)c.g.position.x=44;}
    for(const cl of clouds){cl.position.x+=dt*0.8;if(cl.position.x>90)cl.position.x=-90;}
    for(const b of birds){const a=t*0.25+b.ph;b.b.position.set(Math.cos(a)*b.r-6,16+Math.sin(t+b.ph)*1.5,Math.sin(a)*b.r-10);b.b.rotation.y=-a;const f=Math.sin(t*9+b.ph)*0.6;b.w1.rotation.z=f;b.w2.rotation.z=-f;}
    // confettis
    for(let i=conf.length-1;i>=0;i--){const m=conf[i];m.userData.v.y-=dt*10;m.position.addScaledVector(m.userData.v,dt);m.rotation.x+=dt*8;m.rotation.y+=dt*6;m.userData.life-=dt;if(m.userData.life<=0){scene.remove(m);m.material.dispose();conf.splice(i,1);}}
    if(selected&&performance.now()<sayT){const b=$('bubble');tmp.copy(selected.g.position);tmp.y+=2.8;tmp.project(cam);b.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,calc(-100% - 26px))`;}
    else $('bubble').classList.remove('on');
    if(t-lastScreens>30){lastScreens=t;drawScreens();}
    renderer.render(scene,cam);}
  drawScreens();step();
})();
