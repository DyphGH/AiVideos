// =================== PESSOAS ===================
const CH=[
  {id:'car',name:'Carteiro',sub:'Agenda · mudar hora e pausar',shirt:0x2e5fb0,pants:0x23304f,hat:0x2e5fb0,hair:0x3a2a1a,cap:true,home:[-14.6,4.5],look:[-1,0],sec:'sec-car'},
  {id:'gui',name:'Guionista',sub:'Produção e a tua voz',shirt:0xf4b400,pants:0x2b2d55,hat:0x2a1a0e,hair:0x2a1a0e,glasses:true,home:[-14.2,-7.2],look:[0,-1],sec:'sec-gui'},
  {id:'rea',name:'Realizador',sub:'Vídeos dos últimos 28 dias',shirt:0x0ca678,pants:0x1d1838,hat:0x111111,hair:0x111111,beret:true,home:[-8.4,-7.2],look:[0,-1],sec:'sec-rea'},
  {id:'ana',name:'Analista',sub:'Números e gráficos',shirt:0x6c4cf0,pants:0x2b2d55,hat:0x3a2a1a,hair:0x3a2a1a,glasses:true,home:[0,-9.6],look:[0,-1],sec:'sec-ana'},
  {id:'eng',name:'Engenheiro',sub:'Trial reels vs normais',shirt:0xe03131,pants:0x1d1838,hat:0xffd21f,hair:0x111111,helmet:true,home:[9.6,-7.4],look:[1,-1],sec:'sec-eng'},
  {id:'ide',name:'Ideias',sub:'Escolhe e manda produzir',shirt:0xff8c1a,pants:0x2b2d55,hat:0x7a3a10,hair:0x7a3a10,home:[-4.2,0.6],look:[0,-1],sec:'sec-ide'},
  {id:'des',name:'Desafios',sub:'Desafios em imagem',shirt:0x1f9d55,pants:0x2b2d55,hat:0x6b3d1f,hair:0x6b3d1f,home:[4.4,0.6],look:[0,-1],sec:'sec-des'}];
const hex=n=>'#'+n.toString(16).padStart(6,'0');
function avatarTo(cv,c){const x=cv.getContext('2d');x.clearRect(0,0,16,16);const p=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h);};
  p(5,1,6,6,'#f2c39c');p(5,1,6,2,hex(c.hat));p(6,4,1,1,'#1d1838');p(9,4,1,1,'#1d1838');if(c.glasses){p(5,4,3,1,'#1d1838');p(8,4,3,1,'#1d1838');}
  p(4,7,8,5,hex(c.shirt));p(3,8,1,3,'#f2c39c');p(12,8,1,3,'#f2c39c');p(5,12,3,3,hex(c.pants));p(8,12,3,3,hex(c.pants));}
for(const c of CH){const b=document.createElement('button');b.type='button';b.dataset.id=c.id;b.setAttribute('aria-pressed','false');b.title='Ir ter com '+c.name;b.setAttribute('aria-label','Ir ter com '+c.name);
  const cv=document.createElement('canvas');cv.width=cv.height=16;avatarTo(cv,c);const dot=document.createElement('span');dot.className='dot';dot.hidden=true;b.append(cv,dot);$('dock').append(b);}
$('dclose').addEventListener('click',()=>select(null));
let selected=null,walkTo=()=>{},releaseLook=()=>{};
function select(c){selected=c;for(const b of $('dock').children)b.setAttribute('aria-pressed',String(!!c&&b.dataset.id===c.id));
  if(!c){$('drawer').classList.remove('open');return;}
  releaseLook();$('dtitle').textContent=c.name;$('dsub').textContent=c.sub;avatarTo($('dav'),c);
  for(const x of CH)$(x.sec).hidden=x!==c;$('dbody').scrollTop=0;$('drawer').classList.add('open');c.wave=1;}
$('dock').addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)walkTo(CH.find(c=>c.id===b.dataset.id));});
setTabs();

// =================== ARMAZÉM 3D ===================
(function(){
  if(!window.THREE){$('stage').innerHTML='<div class="nogl">Não consegui carregar o 3D. Usa os bonecos lá em baixo.</div>';$('enter').hidden=true;
    $('dock').onclick=e=>{const b=e.target.closest('button[data-id]');if(b)select(CH.find(c=>c.id===b.dataset.id));};return;}
  let renderer;try{renderer=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true,powerPreference:'high-performance'});}catch(e){$('stage').innerHTML='<div class="nogl">Este dispositivo não deixa usar 3D aqui.</div>';$('enter').hidden=true;$('dock').onclick=e2=>{const b=e2.target.closest('button[data-id]');if(b)select(CH.find(c=>c.id===b.dataset.id));};return;}
  const touch=matchMedia('(pointer:coarse)').matches;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x1b1a24);
  const cam=new THREE.PerspectiveCamera(70,1,0.05,200);cam.rotation.order='YXZ';
  const grad=(()=>{const d=new Uint8Array([120,190,255]);const t=new THREE.DataTexture(d,3,1,THREE.LuminanceFormat);t.minFilter=t.magFilter=THREE.NearestFilter;t.needsUpdate=true;return t;})();
  const mc={};const M=(c,o={})=>{const k=c+JSON.stringify(o);return mc[k]||(mc[k]=new THREE.MeshToonMaterial(Object.assign({color:c,gradientMap:grad},o)));};
  const gc={};const BG=(w,h,d)=>{const k=w+'_'+h+'_'+d;return gc[k]||(gc[k]=new THREE.BoxGeometry(w,h,d));};
  function B(w,h,d,col,x,y,z,parent=scene,o={}){const m=new THREE.Mesh(BG(w,h,d),col&&col.isMaterial?col:M(col,o.mat||{}));m.position.set(x,y,z);m.castShadow=o.cast!==false;m.receiveShadow=true;parent.add(m);return m;}
  function G(x=0,y=0,z=0,parent=scene){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
  function CT(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const t=new THREE.CanvasTexture(c);t.anisotropy=4;return {c,x:c.getContext('2d'),t};}
  function plane(w,h,tex,x,y,z,ry=0,parent=scene){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true}));m.position.set(x,y,z);m.rotation.y=ry;parent.add(m);return m;}
  const signs=[];function signTex(text,bg,fg,w=512,h=128,font=64){const s=CT(w,h);s.redraw=()=>{s.x.clearRect(0,0,w,h);if(bg){s.x.fillStyle=bg;s.x.fillRect(0,0,w,h);}s.x.fillStyle=fg;s.x.font=`bold ${font}px Silkscreen, monospace`;s.x.textAlign='center';s.x.textBaseline='middle';s.x.fillText(text,w/2,h/2+4);s.t.needsUpdate=true;};s.redraw();signs.push(s);return s;}
  // colisões (caixas no chão xz)
  const solids=[];function solid(x,z,w,d){solids.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});}
  const X0=-20,X1=20,Z0=-14,Z1=14,HH=8.5;

  // ---------- luzes ----------
  const hemi=new THREE.HemisphereLight(0xfff4e0,0x5a5560,0.62);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xfff0d8,0.55);sun.position.set(14,26,18);sun.castShadow=true;sun.shadow.mapSize.set(touch?1024:2048,touch?1024:2048);
  Object.assign(sun.shadow.camera,{left:-24,right:24,top:18,bottom:-18,near:1,far:70});sun.shadow.bias=-0.0006;sun.shadow.normalBias=0.03;scene.add(sun);
  const lampsL=[];for(const [x,z] of [[-10,-6],[8,-6],[-8,6],[8,6]]){const l=new THREE.PointLight(0xffe7c2,0.55,22,1.5);l.position.set(x,7,z);scene.add(l);lampsL.push(l);}

  // ---------- chão, paredes, teto ----------
  const ft=CT(256,256);{const x=ft.x;x.fillStyle='#9a9ca6';x.fillRect(0,0,256,256);for(let i=0;i<2500;i++){x.fillStyle=`rgba(${Math.random()<.5?40:255},${Math.random()<.5?40:255},${Math.random()<.5?50:255},${Math.random()*0.05})`;x.fillRect(Math.random()*256,Math.random()*256,2,2);}
    x.strokeStyle='rgba(60,60,70,.35)';x.lineWidth=2;x.strokeRect(0,0,256,256);ft.t.wrapS=ft.t.wrapT=THREE.RepeatWrapping;ft.t.repeat.set(10,7);}
  const floor=new THREE.Mesh(new THREE.BoxGeometry(X1-X0,0.4,Z1-Z0),new THREE.MeshToonMaterial({map:ft.t,gradientMap:grad}));floor.position.set(0,-0.2,0);floor.receiveShadow=true;scene.add(floor);
  // linhas amarelas de segurança (corredores)
  for(const [x,z,w,d] of [[0,5.2,34,0.14],[0,9.4,34,0.14],[-3,-3.6,26,0.14],[17.6,2,0.14,22]])B(w,0.02,d,0xffd21f,x,0.01,z,scene,{cast:false});
  for(let i=0;i<16;i++)B(0.5,0.02,0.9,0xffd21f,-15+i*2,0.012,7.3,scene,{cast:false});
  const wt=CT(64,64);{const x=wt.x;for(let i=0;i<64;i+=8){x.fillStyle=i%16?'#c7ccd8':'#b5bccb';x.fillRect(i,0,8,64);}wt.t.wrapS=wt.t.wrapT=THREE.RepeatWrapping;wt.t.repeat.set(12,2);}
  const wallM=new THREE.MeshToonMaterial({map:wt.t,gradientMap:grad});
  const wallN=B(X1-X0,HH,0.4,wallM,0,HH/2,Z0-0.2);const wallW=B(0.4,HH,Z1-Z0,wallM,X0-0.2,HH/2,0);const wallE=B(0.4,HH,Z1-Z0,wallM,X1+0.2,HH/2,0);
  B(15,HH,0.4,wallM,-12.5,HH/2,Z1+0.2);B(15,HH,0.4,wallM,12.5,HH/2,Z1+0.2);B(10,2.5,0.4,wallM,0,HH-1.25,Z1+0.2); // porta grande a sul
  solid(0,Z0-0.5,44,1);solid(0,Z1+0.5,44,1);solid(X0-0.5,0,1,32);solid(X1+0.5,0,1,32);
  B(4,0.5,0.6,0xe8ecf3,X0,0.25,0,scene);B(0.6,0.5,32,0x7b8296,X0+0.3,0.25,0,scene,{cast:false});
  // janelas altas
  const winMat=new THREE.MeshBasicMaterial({color:0xbfe3ff});
  for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(3,1.1),winMat);m.position.set(-17+i*4.9,HH-1.2,Z0+0.02);scene.add(m);}
  for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(3,1.1),winMat);m.position.set(X0+0.02,HH-1.2,-11+i*4.4);m.rotation.y=Math.PI/2;scene.add(m);}
  const outside=new THREE.Mesh(new THREE.PlaneGeometry(10,6),new THREE.MeshBasicMaterial({color:0xbfe3ff}));outside.position.set(0,3,Z1+1.2);outside.rotation.y=Math.PI;scene.add(outside);
  B(10,0.05,3,0x72b35a,0,-0.18,Z1+1.6,scene,{cast:false});
  // teto e treliças
  B(X1-X0,0.3,Z1-Z0,0x34323f,0,HH+0.15,0,scene,{cast:false});
  for(let i=0;i<9;i++){const x=-18+i*4.5;B(0.25,0.4,Z1-Z0,0x4d4a5a,x,HH-0.25,0,scene,{cast:false});}
  const panels=[];for(const [x,z] of [[-12,-8],[-4,-8],[4,-8],[12,-8],[-12,0],[-4,0],[4,0],[12,0],[-12,8],[-4,8],[4,8],[12,8]]){panels.push(B(2.4,0.12,0.6,0xfffbe8,x,HH-0.5,z,scene,{cast:false,mat:{emissive:0xfff2c8}}));B(0.04,0.5,0.04,0x222222,x-1,HH-0.2,z,scene,{cast:false});B(0.04,0.5,0.04,0x222222,x+1,HH-0.2,z,scene,{cast:false});}

  // ---------- zonas (pintadas no chão) ----------
  function zone(text,col,x,z,w,d){B(w,0.015,d,col,x,0.008,z,scene,{cast:false,mat:{transparent:true,opacity:.28}});const s=signTex(text,null,hex(col),512,96,56);const m=new THREE.Mesh(new THREE.PlaneGeometry(w*0.7,w*0.7*96/512),new THREE.MeshBasicMaterial({map:s.t,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,0.03,z+d/2-0.7);scene.add(m);}
  zone('2 FACTOS',0x1f9d55,-11.5,-9,13,8.6);zone('NÚMEROS',0x6c4cf0,0,-10.5,7,6);zone('HIT0MS',0xe03131,11.5,-9,12,8.6);zone('CORREIO',0x2e5fb0,-15,4.4,8,6);zone('IDEIAS',0xff8c1a,-4.2,0,5.4,5);zone('DESAFIOS',0x1f9d55,4.4,0,5.4,5);
  // placas penduradas
  function hang(text,col,x,z,ry=0){const s=signTex(text,hex(col),'#ffffff',512,128,62);const g=G(x,5.6,z);g.rotation.y=ry;B(3.2,0.86,0.08,0x1d1838,0,0,0,g);plane(3,0.75,s.t,0,0,0.05,0,g);plane(3,0.75,s.t,0,0,-0.05,Math.PI,g);B(0.03,2.4,0.03,0x222222,-1.2,1.6,0,g,{cast:false});B(0.03,2.4,0.03,0x222222,1.2,1.6,0,g,{cast:false});return g;}
  hang('2 FACTOS',0x1f9d55,-11.5,-6);hang('HIT0MS',0xe03131,11.5,-6);hang('CORREIO',0x2e5fb0,-15,2);hang('DOCAS',0x1d1838,16,2,Math.PI/2);

  // ---------- mobília ----------
  function desk(x,z,ry=0,w=2.2){const g=G(x,0,z);g.rotation.y=ry;B(w,0.1,1,0x9a6a3f,0,1.02,0,g);for(const [a,b] of [[-w/2+0.1,-0.4],[w/2-0.1,-0.4],[-w/2+0.1,0.4],[w/2-0.1,0.4]])B(0.08,1,0.08,0x6a4425,a,0.5,b,g);
    const wp=new THREE.Vector3(0,0,0).applyAxisAngle(new THREE.Vector3(0,1,0),ry);solid(x+wp.x,z+wp.z,Math.abs(Math.cos(ry))*w+Math.abs(Math.sin(ry))*1+0.1,Math.abs(Math.sin(ry))*w+Math.abs(Math.cos(ry))*1+0.1);return g;}
  function screenOn(parent,w,h,x,y,z,ry=0){const g=G(x,y,z,parent);g.rotation.y=ry;B(w+0.1,h+0.1,0.06,0x1d1838,0,0,0,g);const s=CT(256,Math.round(256*h/w));plane(w,h,s.t,0,0,0.04,0,g);B(0.08,0.3,0.08,0x1d1838,0,-h/2-0.15,0,g);return s;}
  function crate(x,z,s=1,col=0xc98f55){const m=B(0.9*s,0.9*s,0.9*s,col,x,0.45*s,z);B(0.92*s,0.12*s,0.92*s,0xa87444,x,0.45*s,z,scene,{cast:false});return m;}
  function pallet(x,z,n=4,ry=0){const g=G(x,0,z);g.rotation.y=ry;B(1.3,0.15,1.1,0xb88a55,0,0.08,0,g);for(let i=0;i<n;i++){B(0.6,0.5,0.5,[0xc98f55,0xd9a066,0xb8804a][i%3],(i%2)*0.62-0.31,0.42+Math.floor(i/4)*0.5,(Math.floor(i/2)%2)*0.52-0.26,g);}solid(x,z,1.4,1.3);return g;}
  const scr={};
  // prateleiras industriais (fundo sul e lado)
  function rack(x,z,len=6,ry=0){const g=G(x,0,z);g.rotation.y=ry;for(let i=0;i<=len;i+=len/3){B(0.12,4.4,0.12,0xff8c1a,i-len/2,2.2,-0.55,g);B(0.12,4.4,0.12,0xff8c1a,i-len/2,2.2,0.55,g);}
    for(const y of [0.2,1.6,3.0,4.3]){B(len,0.1,0.08,0x1c7ed6,0,y,-0.55,g);B(len,0.1,0.08,0x1c7ed6,0,y,0.55,g);B(len,0.05,1.1,0x8a8f9e,0,y+0.03,0,g,{cast:false});
      if(y<4)for(let k=0;k<Math.floor(len/1);k++)if((k*7+y*3|0)%4)B(0.75,0.62+((k+y*10|0)%3)*0.12,0.8,[0xc98f55,0xd9a066,0xb8804a,0xe8d8b8][(k+(y*10|0))%4],-len/2+0.55+k,y+0.38,0,g);}
    if(Math.abs(ry)<0.1)solid(x,z,len+0.3,1.4);else solid(x,z,1.4,len+0.3);return g;}
  rack(-12,12,9);rack(12,12,9);rack(-19,-1.5,7,Math.PI/2);
  pallet(-8,10.8);pallet(-5.5,11,6);pallet(5.6,10.8,8);pallet(8.2,11.2,3);pallet(14.6,-12.4,6);pallet(-3.4,-12.6,4);
  for(const [x,z] of [[18.6,-12.6],[17.4,-12.8],[18.4,-11.5]])crate(x,z);solid(18,-12.3,2.6,2.4);
  // ===== CORREIO =====
  {const d=desk(-16,4.5,Math.PI/2,2.4);scr.car=screenOn(d,1.2,0.72,-0.5,1.56,-0.3);for(let i=0;i<5;i++)B(0.45,0.04,0.32,0xf4e3c3,0.55,1.1+i*0.05,0.1,d);
    const cub=G(-19.5,0,7);['#d6336c','#111111','#e62117','#1877f2'].forEach((c,i)=>{const col=parseInt(c.slice(1),16);for(let r=0;r<3;r++){B(0.6,0.6,0.9,col,0,0.4+r*0.65,-1.5+i*1,cub);B(0.04,0.42,0.6,0x1d1838,0.31,0.4+r*0.65,-1.5+i*1,cub,{cast:false});}});solid(-19.4,7,1.2,4.2);
    const mb=G(-12.4,0,2.4);B(0.7,1.1,0.6,0xffd21f,0,0.55,0,mb);B(0.72,0.2,0.62,0xe03131,0,1.15,0,mb);solid(-12.4,2.4,0.8,0.7);}
  // tapete rolante do correio até às docas
  const beltT=CT(64,16);for(let i=0;i<8;i++){beltT.x.fillStyle=i%2?'#2b2d3a':'#3a3d50';beltT.x.fillRect(i*8,0,8,16);}beltT.t.wrapS=THREE.RepeatWrapping;beltT.t.magFilter=THREE.NearestFilter;beltT.t.repeat.set(36,1);
  const BELTZ=7.6,BX0=-13,BX1=15.6,BY=3.7;B(BX1-BX0,0.3,0.9,0x555b70,(BX0+BX1)/2,BY,BELTZ);B(BX1-BX0,0.12,0.06,0xffd21f,(BX0+BX1)/2,BY+0.2,BELTZ-0.47,scene,{cast:false});B(BX1-BX0,0.12,0.06,0xffd21f,(BX0+BX1)/2,BY+0.2,BELTZ+0.47,scene,{cast:false});{const m=new THREE.Mesh(new THREE.PlaneGeometry(BX1-BX0,0.8),new THREE.MeshBasicMaterial({map:beltT.t}));m.rotation.x=-Math.PI/2;m.position.set((BX0+BX1)/2,BY+0.16,BELTZ);scene.add(m);}
  for(const x of [-12.5,-8.5,-4.2,3.2,7.2,11.2,15.2]){B(0.12,BY,0.12,0x444455,x,BY/2,BELTZ-0.4);B(0.12,BY,0.12,0x444455,x,BY/2,BELTZ+0.4);solid(x,BELTZ,0.3,1);}
  B(0.9,BY,0.9,0x555b70,BX0-0.3,BY/2,BELTZ);solid(BX0-0.3,BELTZ,1,1);
  const parcels=[];for(let i=0;i<9;i++)parcels.push({m:B(0.5,0.38,0.5,[0xd9a066,0xf4e3c3,0xc98f55][i%3],BX0+1+i*3.1,BY+0.36,BELTZ),special:false});
  // ===== 2 FACTOS =====
  {B(8,4.6,0.1,0x2fd15a,-12,2.4,Z0+0.1,scene,{cast:false});
    const d1=desk(-14.2,-8.4,0,2.2);scr.gui=screenOn(d1,1.1,0.7,0.45,1.56,-0.25);B(0.7,0.28,0.5,0x2b2d3a,-0.5,1.22,0,d1);scr.paper=B(0.45,0.55,0.02,0xffffff,-0.5,1.55,-0.12,d1,{cast:false});
    const d2=desk(-8.4,-8.4,0,2.6);scr.rea=screenOn(d2,1.2,0.72,-0.6,1.58,-0.25);scr.rea2=screenOn(d2,1,0.62,0.7,1.54,-0.2,-0.3);
    const cg=G(-11.2,0,-11.6);for(const a of [0,2.1,4.2]){const l=B(0.05,1.6,0.05,0x222222,Math.sin(a)*0.3,0.78,Math.cos(a)*0.3,cg);l.rotation.set(Math.cos(a)*0.2,0,-Math.sin(a)*0.2);}
    const cam_=G(0,1.72,0,cg);B(0.45,0.38,0.65,0x222222,0,0,0,cam_);B(0.28,0.28,0.25,0x444444,0,0,-0.42,cam_);scr.rec=B(0.08,0.08,0.08,0xe03131,0.14,0.24,0.2,cam_,{cast:false,mat:{emissive:0xe03131}});cam_.rotation.y=Math.PI;solid(-11.2,-11.6,0.8,0.8);
    scr.tv2f=CT(512,288);B(3.6,2.1,0.12,0x1d1838,-16.6,3.4,Z0+0.2);plane(3.4,1.92,scr.tv2f.t,-16.6,3.4,Z0+0.28);
    for(let i=0;i<14;i++){const f=B(0.4,0.34,0.02,[0x1f9d55,0xffd21f,0x1c7ed6][i%3],-18.6+i*0.9,5.1-Math.sin(i/13*Math.PI)*0.5,Z0+0.3,scene,{cast:false});}}
  // ===== NÚMEROS: parede LED =====
  scr.bill=CT(1024,480);{B(10.4,5,0.2,0x111111,0,3.6,Z0+0.12);plane(10,4.68,scr.bill.t,0,3.6,Z0+0.24);B(0.3,1.2,0.3,0x222222,-4,0.6,Z0+0.4,scene);B(0.3,1.2,0.3,0x222222,4,0.6,Z0+0.4,scene);}
  {const d=desk(0,-10.8,0,2);scr.ana=screenOn(d,1.1,0.66,0,1.5,-0.25);}
  // ===== HIT0MS: máquina de deixar cair =====
  const rig=G(13.6,0,-10.6);{for(const [a,b] of [[-2,-1],[2,-1],[-2,1],[2,1]])B(0.16,4.6,0.16,0x777e95,a,2.3,b,rig);B(4.3,0.14,2.3,0x777e95,0,4.6,0,rig);B(4,0.04,2,0xffffff,0,0.03,0,rig,{cast:false});solid(13.6,-10.6,4.4,2.4);}
  const msS=CT(256,96);plane(2,0.75,msS.t,0,5.15,1.16,0,rig);
  const dropGeo=[new THREE.BoxGeometry(0.6,0.6,0.6),new THREE.SphereGeometry(0.36,14,10),new THREE.CylinderGeometry(0.3,0.3,0.6,12),new THREE.ConeGeometry(0.36,0.66,10)];
  const drops=[0,1,2,3].map(i=>{const m=new THREE.Mesh(dropGeo[i],M([0xff6b6b,0xffd21f,0x4dabf7,0x69db7c][i]));m.castShadow=true;m.position.set(-1.4+i*0.93,4.2,0);rig.add(m);return {m,y:4.2,v:0,t:-i*0.7,state:'wait'};});
  const splats=[];
  {const d=desk(9.6,-8.6,0,2.2);scr.eng=screenOn(d,1.1,0.66,-0.4,1.54,-0.25);B(0.5,0.3,0.4,0x666b80,0.6,1.22,0,d);}
  scr.tvh=CT(512,288);B(3.6,2.1,0.12,0x111111,8.2,3.4,Z0+0.2);plane(3.4,1.92,scr.tvh.t,8.2,3.4,Z0+0.28);
  // ===== IDEIAS =====
  {const g=G(-4.2,0,-1.2);B(3.4,2.1,0.08,0xb0b0c0,0,1.85,0,g);scr.ideaBoard=CT(512,320);plane(3.2,1.95,scr.ideaBoard.t,0,1.85,0.05,0,g);B(0.1,0.9,0.1,0x777777,-1.4,0.45,0,g);B(0.1,0.9,0.1,0x777777,1.4,0.45,0,g);solid(-4.2,-1.2,3.5,0.4);
    scr.bulb=new THREE.Mesh(new THREE.SphereGeometry(0.5,18,14),new THREE.MeshBasicMaterial({color:0xfff2a8}));scr.bulb.position.set(-4.2,4.3,0.2);scene.add(scr.bulb);B(0.02,3.8,0.02,0x222222,-4.2,6.3,0.2,scene,{cast:false});
    scr.bulbL=new THREE.PointLight(0xffd27a,0,10,1.5);scr.bulbL.position.set(-4.2,4.2,0.4);scene.add(scr.bulbL);}
  // ===== DESAFIOS =====
  {const e=G(4.4,0,-1.2);B(0.08,2.6,0.08,0x8a5a33,-0.6,1.3,0,e).rotation.z=0.1;B(0.08,2.6,0.08,0x8a5a33,0.6,1.3,0,e).rotation.z=-0.1;scr.easel=CT(256,256);plane(1.5,1.5,scr.easel.t,0,1.85,0.06,0,e);solid(4.4,-1.2,1.6,0.5);
    scr.shapes=[new THREE.Mesh(new THREE.ConeGeometry(0.4,0.75,3),M(0xe03131)),new THREE.Mesh(new THREE.BoxGeometry(0.55,0.55,0.55),M(0x1c7ed6)),new THREE.Mesh(new THREE.SphereGeometry(0.34,16,12),M(0xffd21f))];
    scr.shapes.forEach((m,i)=>{m.position.set(6.4,0.7+i*0.0,-0.6+i*1.1);m.castShadow=true;scene.add(m);});}
  // ===== DOCAS DAS REDES (parede este) =====
  const DOCK=[{k:'IG',z:-8,col:0xd6336c,label:'INSTAGRAM'},{k:'TT',z:-3,col:0x222222,label:'TIKTOK'},{k:'YT',z:2,col:0xe62117,label:'YOUTUBE'},{k:'FB',z:7.2,col:0x1877f2,label:'FACEBOOK'}];
  for(const d of DOCK){const g=G(X1-0.05,0,d.z);d.g=g;
    const rt=CT(64,128);for(let y=0;y<128;y+=8){rt.x.fillStyle=y%16?hex(d.col):'rgba(0,0,0,.25)';rt.x.fillRect(0,y,64,8);}if(d.k==='TT'){rt.x.fillStyle='#25f4ee';rt.x.fillRect(0,0,6,128);rt.x.fillStyle='#fe2c55';rt.x.fillRect(58,0,6,128);}rt.t.needsUpdate=true;
    const door=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.6),new THREE.MeshToonMaterial({map:rt.t,gradientMap:grad}));door.position.set(-0.03,1.8,0);door.rotation.y=-Math.PI/2;g.add(door);d.door=door;
    B(0.3,3.9,0.25,0x1d1838,-0.1,1.95,-1.7,g);B(0.3,3.9,0.25,0x1d1838,-0.1,1.95,1.7,g);B(0.3,0.3,3.65,0x1d1838,-0.1,3.75,0,g);
    d.sign=CT(512,256);const sm=plane(3.2,1.6,d.sign.t,-0.08,5.1,0,-Math.PI/2,g);
    d.light=B(0.3,0.3,0.3,0xdddddd,-0.25,4.1,0,g,{cast:false});B(0.8,0.12,3.6,0xffd21f,-0.6,0.01,0,g,{cast:false});}
  function drawDock(d,v,pend){const x=d.sign.x;x.fillStyle=hex(d.col===0x222222?0x111111:d.col);x.fillRect(0,0,512,256);x.fillStyle='#fff';x.textAlign='center';x.textBaseline='middle';
    x.font='bold 50px Silkscreen, monospace';x.fillText(d.label,256,62);x.font='bold 96px Silkscreen, monospace';x.fillText(short(v),256,150);x.font='bold 30px Inter, sans-serif';x.fillStyle=pend?'#ffd21f':'rgba(255,255,255,.75)';x.fillText(pend?'● post hoje':'views 7 dias',256,222);d.sign.t.needsUpdate=true;}
  // empilhador
  const fork=G(0,0,10.8);{B(1.4,0.9,2,0xffc107,0,0.75,0,fork);B(1.2,1.2,0.9,0xffc107,0,1.6,0.4,fork);B(1.2,0.08,0.9,0x222222,0,2.85,0.4,fork);for(const [a,b] of [[-0.6,0.6],[0.6,0.6]])B(0.06,1.7,0.06,0x222222,a,2.1,b+0.4,fork);
    B(0.1,2.4,0.1,0x333333,-0.4,1.4,-1.05,fork);B(0.1,2.4,0.1,0x333333,0.4,1.4,-1.05,fork);B(0.15,0.06,1.1,0x333333,-0.35,0.3,-1.6,fork);B(0.15,0.06,1.1,0x333333,0.35,0.3,-1.6,fork);
    for(const [a,b] of [[-0.75,-0.6],[0.75,-0.6],[-0.75,0.7],[0.75,0.7]])B(0.2,0.5,0.5,0x111111,a,0.25,b,fork);B(0.8,0.5,0.8,0xc98f55,0,0.65,-1.6,fork);fork.rotation.y=Math.PI/2;}
  let forkX=-6,forkDir=1;
  // plantas e uma máquina de café
  function plant(x,z,s=1){B(0.5*s,0.5*s,0.5*s,0xc9653a,x,0.25*s,z);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(0.45*s,0),M(0x2f9a48));c.position.set(x,0.85*s,z);c.castShadow=true;scene.add(c);solid(x,z,0.6*s,0.6*s);}
  plant(-19,-13,1.3);plant(-6.4,-13,1.1);plant(6.4,-13,1.1);plant(19,13,1.2);plant(-1.4,2.6,0.9);
  {const g=G(2,0,-13.3);B(0.9,1.8,0.7,0x2b2d3a,0,0.9,0,g);B(0.5,0.3,0.05,0xffd21f,0,1.3,0.36,g,{cast:false,mat:{emissive:0x332a00}});solid(2,-13.3,1,0.8);}

  // ---------- BONECOS ----------
  const pick=[];
  function makeBoneco(c){const g=G();const skin=0xf2c39c;
    const legL=G(-0.17,0.82,0,g),legR=G(0.17,0.82,0,g);
    B(0.27,0.8,0.3,c.pants,0,-0.4,0,legL);B(0.27,0.8,0.3,c.pants,0,-0.4,0,legR);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legL);B(0.3,0.16,0.44,0x1d1d1d,0,-0.78,0.06,legR);
    const torso=G(0,0.82,0,g);B(0.74,0.86,0.44,c.shirt,0,0.43,0,torso);B(0.76,0.12,0.46,0x2b2d3a,0,0.04,0,torso);
    if(c.id==='car')B(0.5,0.45,0.2,0x8a5a33,-0.42,0.15,0,torso);
    if(c.id==='eng'){B(0.76,0.1,0.46,0xffd21f,0,0.6,0,torso,{cast:false});}
    const armL=G(-0.5,1.6,0,g),armR=G(0.5,1.6,0,g);
    B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armL);B(0.22,0.7,0.24,c.shirt,0,-0.32,0,armR);B(0.2,0.18,0.22,skin,0,-0.74,0,armL);B(0.2,0.18,0.22,skin,0,-0.74,0,armR);
    const head=G(0,1.98,0,g);B(0.64,0.6,0.58,skin,0,0,0,head);B(0.68,0.2,0.62,c.hair,0,0.28,-0.02,head);B(0.68,0.42,0.12,c.hair,0,0.1,-0.3,head);
    if(c.cap){B(0.7,0.16,0.64,c.hat,0,0.36,0,head);B(0.5,0.06,0.3,c.hat,0,0.3,0.44,head);}
    if(c.beret){const b=B(0.78,0.12,0.72,c.hat,0.06,0.42,0,head);b.rotation.z=0.18;}
    if(c.helmet){B(0.74,0.26,0.68,c.hat,0,0.38,0,head);B(0.8,0.06,0.74,c.hat,0,0.26,0.04,head);}
    const eyeL=B(0.09,0.12,0.04,0x1d1838,-0.14,0.04,0.3,head,{cast:false}),eyeR=B(0.09,0.12,0.04,0x1d1838,0.14,0.04,0.3,head,{cast:false});
    if(c.glasses){B(0.5,0.04,0.03,0x1d1838,0,0.1,0.31,head,{cast:false});}
    const mouth=B(0.18,0.04,0.04,0x9a4a3a,0,-0.15,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,-0.22,-0.08,0.3,head,{cast:false});B(0.12,0.08,0.02,0xf5a3a3,0.22,-0.08,0.3,head,{cast:false});
    if(c.id==='ide'){c.idea=B(0.3,0.3,0.3,0xffe66d,0,0.85,0,head,{cast:false});c.idea.visible=false;}
    g.traverse(o=>{if(o.isMesh){o.userData.ch=c;pick.push(o);}});
    c.g=g;c.p={legL,legR,armL,armR,head,eyeL,eyeR,mouth};
    c.tag=document.createElement('div');c.tag.className='tag';c.tag.textContent=c.name;$('tags').append(c.tag);}
  for(const c of CH){makeBoneco(c);c.pos=new THREE.Vector3(c.home[0],0,c.home[1]);c.face=Math.atan2(c.look[0],c.look[1]);c.rot=c.face;c.g.rotation.y=c.face;c.blink=Math.random()*4;c.walk=0;c.wave=0;c.route=[];c.idle=8+Math.random()*12;solid(c.home[0],c.home[1],0.7,0.7);}
  const cSolids=solids.slice(-CH.length);

  // ---------- falas curtas ----------
  function line(c){const L=lis();if(!D)return '…';
    if(c.id==='car'){if(!D.hasMC)return 'A ver o Metricool…';const n=D.next;return n?`Próximo: ${n.date===L.date?'':dm(n.date)+' '}${n.time} · ${LABEL[n.acct]}`:'Hoje já saiu tudo! 📬';}
    if(c.id==='ana'){if(!D.hasW)return 'A fazer contas…';const a=D.a['2factos'],b=D.a.hit0ms;return `IG 7 dias: 2F ${short(a.ig7)} · H0 ${short(b.ig7)}`;}
    if(c.id==='rea'){if(!D.hasW)return 'A rever gravações…';const top=[...D.vids].sort((a,b)=>(+b.views||0)-(+a.views||0))[0];return top?`Campeão: ${capLine(top.cap).slice(0,26)}… ${short(top.views)}`:'Sem vídeos.';}
    if(c.id==='eng'){if(!D.hasW)return 'A calibrar…';const t=D.vids.filter(v=>v.k==='IG'&&v.trial).length;return `${t} trial reels testados 🧪`;}
    if(c.id==='ide'){const n=ST.db?.ideas?.length||0;return n?`${n} ideias novas! 💡`:'Ideias às 8:53 ☕';}
    if(c.id==='gui'){const v=ST.ped.filter(p=>p.estado==='precisa_voz').length,a=ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length;return v?`Preciso da tua voz! 🎙️`:a?`${a} em produção ✍️`:'Manda-me ideias!';}
    if(c.id==='des'){const n=ST.db?.challenges?.length||0;return n?`${n} desafios a correr 🔺`:'Quantos 🔺 vês?';}
    return '';}

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
    scrText(scr.gui,'PEDIDOS',String(ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length),ST.ped.some(p=>p.estado==='precisa_voz')?'falta a voz':'em produção','#ffe066');
    const a2=D.a['2factos'],ah=D.a.hit0ms,days=D.days.slice(-15,-1);
    scrText(scr.rea,'VÍDEOS',D.hasW?String(new Set(D.vids.map(x=>x.date+x.acct)).size):'...','28 dias','#ff6b6b');
    miniBars(scr.rea2,'IG 2F',days.map(d=>a2.igV[d]),'#0ca678');
    scrText(scr.eng,'TRIALS',D.hasW?String(D.vids.filter(x=>x.k==='IG'&&x.trial).length):'...','instagram','#b197fc');
    scrText(scr.ana,'VIEWS 7D',D.hasW?short(a2.ig7+ah.ig7+a2.fb7+ah.fb7+a2.tt7+ah.tt7+a2.yt7+ah.yt7):'...','todas','#5fe08a');
    miniBars(scr.tv2f,'2 FACTOS · IG POR DIA',days.map(d=>a2.igV[d]),'#ffd21f','#0d3b26');
    miniBars(scr.tvh,'HIT0MS · FB POR DIA',days.map(d=>ah.fbP[d]),'#ff6b6b','#1a0d0d');
    {const s=scr.bill,x=s.x,c=s.c;x.fillStyle='#07060f';x.fillRect(0,0,c.width,c.height);x.fillStyle='#fff';x.font='bold 40px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('VIEWS POR DIA · INSTAGRAM',36,26);
      const ds=D.days.slice(0,-1),A=ds.map(d=>a2.igV[d]||0),Hh=ds.map(d=>ah.igV[d]||0);const mx=Math.max(1,...A,...Hh);
      const px=i=>60+(c.width-110)*i/(ds.length-1),py=v=>c.height-60-(c.height-170)*v/mx;
      x.strokeStyle='rgba(255,255,255,.12)';x.lineWidth=2;for(let i=0;i<=3;i++){const yv=py(mx*i/3);x.beginPath();x.moveTo(60,yv);x.lineTo(c.width-50,yv);x.stroke();x.fillStyle='rgba(255,255,255,.5)';x.font='22px Inter';x.textAlign='right';x.fillText(short(mx*i/3),52,yv-12);}
      for(const [arr,col] of [[A,'#38d9a9'],[Hh,'#ff6b9a']]){x.strokeStyle=col;x.lineWidth=7;x.lineJoin='round';x.beginPath();arr.forEach((v,i)=>i?x.lineTo(px(i),py(v)):x.moveTo(px(i),py(v)));x.stroke();}
      x.textAlign='left';x.font='bold 28px Inter, sans-serif';x.fillStyle='#38d9a9';x.fillText('● 2 Factos '+short(a2.ig7),36,84);x.fillStyle='#ff6b9a';x.fillText('● Hit0Ms '+short(ah.ig7),330,84);x.fillStyle='rgba(255,255,255,.6)';x.fillText('7 dias',620,84);s.t.needsUpdate=true;}
    {const s=scr.ideaBoard,x=s.x;x.fillStyle='#fdfdfd';x.fillRect(0,0,512,320);x.fillStyle='#1d1838';x.font='bold 30px Silkscreen, monospace';x.textAlign='left';x.textBaseline='top';x.fillText('IDEIAS',18,14);
      const I=(ST.db?.ideas||[]);x.font='bold 20px Inter, sans-serif';if(!I.length){x.fillStyle='#6b6590';x.fillText('às 8:53',18,66);}
      I.slice(0,8).forEach((it,i)=>{x.fillStyle=['#d6336c','#6c4cf0','#0ca678'][i%3];x.fillText(`${it.n}. ${String(it.text).slice(0,34)}`,18,62+i*30);});if(I.length>8){x.fillStyle='#6b6590';x.fillText(`+${I.length-8}`,440,20);}s.t.needsUpdate=true;}
    for(const d of DOCK){const v=D.net7[d.k]||0;d.pend=D.today.some(p=>p.state==='pend'&&p.nets.some(n=>n.k===d.k&&n.s!=='done'));drawDock(d,v,d.pend);}
    ideasOn=(ST.db?.ideas||[]).length>0;}
  function drawEasel(k){const e=scr.easel,x=e.x;x.fillStyle='#fff';x.fillRect(0,0,256,256);x.lineWidth=4;x.strokeStyle='#1d1838';const cols=['#e03131','#1c7ed6','#ffd21f','#0ca678'];
    for(let i=0;i<9;i++){x.fillStyle=cols[(i+k)%4];const cx=50+(i%3)*78,cy=50+Math.floor(i/3)*70,s=24;x.beginPath();const kind=(i*2+k)%3;if(kind===0){x.moveTo(cx,cy-s);x.lineTo(cx-s,cy+s);x.lineTo(cx+s,cy+s);x.closePath();}else if(kind===1)x.rect(cx-s,cy-s,2*s,2*s);else x.arc(cx,cy,s,0,7);x.fill();x.stroke();}
    x.fillStyle='#1d1838';x.font='bold 24px Silkscreen, monospace';x.textAlign='center';x.fillText('QUANTOS?',128,246);e.t.needsUpdate=true;}
  let ek=0;drawEasel(0);setInterval(()=>drawEasel(++ek),3000);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{signs.forEach(s=>s.redraw());drawScreens();drawEasel(ek);});

  // ---------- entregas: caixa dourada no tapete até à doca ----------
  const seen={};let first=true;const conf=[];const confG=new THREE.BoxGeometry(0.12,0.12,0.04);
  function burst(p,n=50){if(reduce)return;for(let i=0;i<n;i++){const m=new THREE.Mesh(confG,new THREE.MeshBasicMaterial({color:[0xe64980,0xffd21f,0x25f4ee,0x339af0,0x69db7c][i%5]}));m.position.copy(p);m.userData={v:new THREE.Vector3(-Math.random()*5,3+Math.random()*5,(Math.random()-.5)*6),life:2.2};scene.add(m);conf.push(m);}}
  const golds=[];function deliver(k){const d=DOCK.find(x=>x.k===k)||DOCK[0];const m=B(0.6,0.45,0.6,0xffd21f,BX0+0.5,BY+0.38,BELTZ,scene,{mat:{emissive:0x553d00}});golds.push({m,d,stage:0});CH[0].wave=1;}
  onWorld=()=>{drawScreens();const fresh=[];for(const p of D.posts)for(const n of p.nets){const k=p.id+n.k;if(seen[k]&&seen[k]!=='done'&&n.s==='done')fresh.push(n.k);seen[k]=n.s;}
    if(!first)fresh.forEach(deliver);if(D.hasMC)first=false;};

  // ---------- JOGADOR (primeira pessoa) ----------
  const P={x:0,z:12.2,yaw:0,pitch:-0.05,vx:0,vz:0,bob:0};const EYE=1.62,R=0.32;
  let keys={},locked=false,auto=null,lookDrag=null;
  function collide(nx,nz){for(const s of solids){if(nx>s.x0-R&&nx<s.x1+R&&nz>s.z0-R&&nz<s.z1+R)return true;}return false;}
  function move(dx,dz){if(!collide(P.x+dx,P.z))P.x+=dx;else{}if(!collide(P.x,P.z+dz))P.z+=dz;}
  const canvas=renderer.domElement;
  function tryLock(){if(touch)return;try{const r=canvas.requestPointerLock&&canvas.requestPointerLock();if(r&&r.catch)r.catch(()=>{});}catch{}}
  releaseLook=()=>{if(document.pointerLockElement)try{document.exitPointerLock();}catch{}};
  document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;$('cross').style.opacity=locked?'.9':'.5';});
  $('enter').addEventListener('click',()=>{$('enter').hidden=true;canvas.focus();tryLock();if(touch)$('joy').hidden=false;});
  canvas.addEventListener('mousedown',e=>{canvas.focus();if(near&&!locked){}if(!locked&&!touch){lookDrag={x:e.clientX,y:e.clientY,moved:false};}});
  addEventListener('mousemove',e=>{if(locked){const mx_=THREE.MathUtils.clamp(e.movementX,-120,120),my_=THREE.MathUtils.clamp(e.movementY,-120,120);P.yaw-=mx_*0.0024;P.pitch=THREE.MathUtils.clamp(P.pitch-my_*0.0024,-1.2,1.2);}
    else if(lookDrag){const dx=e.clientX-lookDrag.x,dy=e.clientY-lookDrag.y;if(Math.abs(dx)+Math.abs(dy)>3)lookDrag.moved=true;P.yaw-=dx*0.005;P.pitch=THREE.MathUtils.clamp(P.pitch-dy*0.005,-1.3,1.3);lookDrag.x=e.clientX;lookDrag.y=e.clientY;}});
  addEventListener('mouseup',e=>{if(lookDrag&&!lookDrag.moved)clickPick(e.clientX,e.clientY);if(lookDrag&&!lookDrag.moved&&!touch&&!$('drawer').classList.contains('open'))tryLock();lookDrag=null;});
  canvas.addEventListener('click',()=>{if(locked){const c=aimAt();if(c){if(dist(c)<3.2)select(c);else walkTo(c);}}});
  const ray=new THREE.Raycaster(),ptr=new THREE.Vector2();
  function aimAt(cx,cy){if(cx==null){ptr.set(0,0);}else{const r=canvas.getBoundingClientRect();ptr.set(((cx-r.left)/r.width)*2-1,-((cy-r.top)/r.height)*2+1);}ray.setFromCamera(ptr,cam);const h=ray.intersectObjects(pick,false)[0];return h&&h.distance<40?h.object.userData.ch:null;}
  function clickPick(cx,cy){const c=aimAt(cx,cy);if(c){if(dist(c)<3.2)select(c);else walkTo(c);}}
  const dist=c=>Math.hypot(c.pos.x-P.x,c.pos.z-P.z);
  const typing=e=>/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||!$('modal').hidden;
  addEventListener('keydown',e=>{if(typing(e))return;const k=e.key.toLowerCase();
    if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright','shift'].includes(k)){keys[k]=true;auto=null;if(k.startsWith('arrow'))e.preventDefault();if(!$('enter').hidden)$('enter').hidden=true;}
    if(k==='e'&&near){select(near);}
    if(k==='escape'){if($('drawer').classList.contains('open'))select(null);}});
  addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
  addEventListener('blur',()=>{keys={};});
  // toque: joystick + arrastar para olhar
  const joy={id:null,x:0,y:0,dx:0,dy:0};const look={id:null,x:0,y:0,sx:0,sy:0,t:0};
  $('joy').addEventListener('pointerdown',e=>{joy.id=e.pointerId;const r=$('joy').getBoundingClientRect();joy.x=r.left+r.width/2;joy.y=r.top+r.height/2;$('joy').setPointerCapture(e.pointerId);jmove(e);auto=null;});
  function jmove(e){if(e.pointerId!==joy.id)return;let dx=(e.clientX-joy.x)/50,dy=(e.clientY-joy.y)/50;const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l;}joy.dx=dx;joy.dy=dy;$('joy-k').style.transform=`translate(${dx*36}px,${dy*36}px)`;}
  $('joy').addEventListener('pointermove',jmove);const jend=e=>{if(e.pointerId!==joy.id)return;joy.id=null;joy.dx=joy.dy=0;$('joy-k').style.transform='';};$('joy').addEventListener('pointerup',jend);$('joy').addEventListener('pointercancel',jend);
  canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')return;look.id=e.pointerId;look.x=look.sx=e.clientX;look.y=look.sy=e.clientY;look.t=performance.now();if(!$('enter').hidden){$('enter').hidden=true;$('joy').hidden=false;}});
  canvas.addEventListener('pointermove',e=>{if(e.pointerId!==look.id)return;P.yaw-=(e.clientX-look.x)*0.006;P.pitch=THREE.MathUtils.clamp(P.pitch-(e.clientY-look.y)*0.006,-1.3,1.3);look.x=e.clientX;look.y=e.clientY;});
  canvas.addEventListener('pointerup',e=>{if(e.pointerId!==look.id)return;look.id=null;if(Math.hypot(e.clientX-look.sx,e.clientY-look.sy)<8&&performance.now()-look.t<350)clickPick(e.clientX,e.clientY);});
  if(touch)$('enter').querySelector('b').textContent='Toca para entrar';
  // ir ter com alguém (auto-andar)
  const GS=0.5,GW=Math.round((X1-X0)/GS),GH=Math.round((Z1-Z0)/GS);let grid=null;
  function buildGrid(){grid=new Uint8Array(GW*GH);for(let j=0;j<GH;j++)for(let i=0;i<GW;i++){const x=X0+(i+0.5)*GS,z=Z0+(j+0.5)*GS;grid[j*GW+i]=collide(x,z)?1:0;}}
  function cellOf(x,z){return [Math.max(0,Math.min(GW-1,Math.floor((x-X0)/GS))),Math.max(0,Math.min(GH-1,Math.floor((z-Z0)/GS)))];}
  function path(tx,tz){if(!grid)buildGrid();const [si,sj]=cellOf(P.x,P.z);let [ti,tj]=cellOf(tx,tz);
    if(grid[tj*GW+ti]){let best=null,bd=1e9;for(let dj=-4;dj<=4;dj++)for(let di=-4;di<=4;di++){const i=ti+di,j=tj+dj;if(i<0||j<0||i>=GW||j>=GH||grid[j*GW+i])continue;const d=di*di+dj*dj;if(d<bd){bd=d;best=[i,j];}}if(!best)return null;[ti,tj]=best;}
    const prev=new Int32Array(GW*GH).fill(-1);const q=[sj*GW+si];prev[sj*GW+si]=sj*GW+si;let h=0;const goal=tj*GW+ti;
    while(h<q.length){const cur=q[h++];if(cur===goal)break;const ci=cur%GW,cj=(cur/GW)|0;for(const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const i=ci+di,j=cj+dj;if(i<0||j<0||i>=GW||j>=GH)continue;const n=j*GW+i;if(prev[n]>=0||grid[n])continue;if(di&&dj&&(grid[cj*GW+i]||grid[j*GW+ci]))continue;prev[n]=cur;q.push(n);}}
    if(prev[goal]<0)return null;const pts=[];for(let c=goal;c!==sj*GW+si;c=prev[c])pts.push({x:X0+((c%GW)+0.5)*GS,z:Z0+(((c/GW)|0)+0.5)*GS});pts.reverse();
    const out=[];let k=0;while(k<pts.length){let far=k;for(let m=pts.length-1;m>k;m--){if(clear(k===0?{x:P.x,z:P.z}:out[out.length-1],pts[m])){far=m;break;}}out.push(pts[far]);k=far+1;}return out;}
  function clear(a,b){const d=Math.hypot(b.x-a.x,b.z-a.z),n=Math.ceil(d/0.25);for(let i=1;i<=n;i++){const x=a.x+(b.x-a.x)*i/n,z=a.z+(b.z-a.z)*i/n;if(collide(x,z))return false;}return true;}
  walkTo=c=>{if(!c)return;$('enter').hidden=true;if(touch)$('joy').hidden=false;const fx=Math.sin(c.face),fz=Math.cos(c.face);const tx=c.pos.x-fx*2.3,tz=c.pos.z-fz*2.3;const pts=path(tx,tz)||[{x:tx,z:tz}];auto={c,pts,stuck:0,lx:P.x,lz:P.z};};
  $('talk-btn').addEventListener('click',()=>{if(near)select(near);});

  // ---------- mini mapa ----------
  const mini=$('mini'),mx=mini.getContext('2d');
  function drawMini(){const W=mini.width,H=mini.height,sx=v=>(v-X0)/(X1-X0)*(W-12)+6,sz=v=>(v-Z0)/(Z1-Z0)*(H-12)+6;
    mx.clearRect(0,0,W,H);mx.fillStyle='rgba(255,255,255,.08)';mx.fillRect(6,6,W-12,H-12);mx.strokeStyle='rgba(120,110,170,.8)';mx.lineWidth=1.5;mx.strokeRect(6,6,W-12,H-12);
    mx.fillStyle='rgba(130,130,150,.45)';for(const s of solids.slice(4)){if(cSolids.includes(s))continue;mx.fillRect(sx(s.x0),sz(s.z0),Math.max(1,sx(s.x1)-sx(s.x0)),Math.max(1,sz(s.z1)-sz(s.z0)));}
    for(const d of DOCK){mx.fillStyle=hex(d.col);mx.fillRect(sx(X1)-2,sz(d.z-1.4),4,sz(d.z+1.4)-sz(d.z-1.4));}
    for(const c of CH){mx.fillStyle=hex(c.shirt);mx.beginPath();mx.arc(sx(c.pos.x),sz(c.pos.z),3.4,0,7);mx.fill();if(c===near){mx.strokeStyle='#fff';mx.lineWidth=1.5;mx.stroke();}}
    mx.save();mx.translate(sx(P.x),sz(P.z));mx.rotate(-P.yaw);mx.fillStyle='#ffd21f';mx.strokeStyle='#1d1838';mx.lineWidth=1.2;mx.beginPath();mx.moveTo(0,-6);mx.lineTo(4.5,4.5);mx.lineTo(0,2.5);mx.lineTo(-4.5,4.5);mx.closePath();mx.fill();mx.stroke();mx.restore();}
  mini.addEventListener('click',e=>{const r=mini.getBoundingClientRect();const x=X0+((e.clientX-r.left)/r.width*mini.width-6)/(mini.width-12)*(X1-X0),z=Z0+((e.clientY-r.top)/r.height*mini.height-6)/(mini.height-12)*(Z1-Z0);
    let best=null,bd=4;for(const c of CH){const d=Math.hypot(c.pos.x-x,c.pos.z-z);if(d<bd){bd=d;best=c;}}if(best)walkTo(best);});

  // ---------- pixel & tamanho ----------
  let pixel=false;$('pixel').addEventListener('click',()=>{pixel=!pixel;$('pixel').setAttribute('aria-pressed',String(pixel));$('gl').classList.toggle('pixel',pixel);resize();});
  function resize(){const w=innerWidth,h=innerHeight;renderer.setPixelRatio(pixel?1/3:Math.min(devicePixelRatio,touch?1.6:2));renderer.setSize(w,h,false);cam.aspect=w/h;cam.fov=w<700?78:70;cam.updateProjectionMatrix();}
  addEventListener('resize',resize);resize();
  // luz do dia nas janelas
  let nightK=0;function sky(){const L=lis(),h=L.min/60;const n=h<6.5?1:h<8?1-(h-6.5)/1.5:h<17.3?0:h<19?(h-17.3)/1.7:1;nightK=n;
    const c=new THREE.Color(0xbfe3ff).lerp(new THREE.Color(0x1c2552),n).lerp(new THREE.Color(0xffb37a),Math.max(0,1-Math.abs(n-0.5)*2)*0.6);winMat.color.copy(c);outside.material.color.copy(c);
    sun.intensity=0.55*(1-n)+0.12;hemi.intensity=0.62-0.12*n;lampsL.forEach(l=>l.intensity=0.55+0.45*n);}
  sky();setInterval(sky,60000);

  // ---------- ciclo ----------
  let near=null;const clk=new THREE.Clock(),tmp=new THREE.Vector3();let occF=0,lastScreens=0,lastMini=0;
  function project(v,el,dy){tmp.copy(v);tmp.y+=dy;tmp.project(cam);const vis=tmp.z<1&&Math.abs(tmp.x)<1.05&&Math.abs(tmp.y)<1.05;el.style.display=vis?'':'none';if(vis)el.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,-100%)`;return vis;}
  function step(){requestAnimationFrame(step);const dt=Math.min(clk.getDelta(),0.05),t=clk.elapsedTime;
    // movimento
    let fwd=0,str=0;if(keys.w||keys.arrowup)fwd+=1;if(keys.s||keys.arrowdown)fwd-=1;if(keys.a)str-=1;if(keys.d)str+=1;if(keys.arrowleft)P.yaw+=dt*2.2;if(keys.arrowright)P.yaw-=dt*2.2;
    if(joy.id!=null){fwd=-joy.dy;str=joy.dx;}
    const drawerOpen=$('drawer').classList.contains('open');
    if(auto){const wp=auto.pts[0]||{x:P.x,z:P.z};const dx=wp.x-P.x,dz=wp.z-P.z,dd=Math.hypot(dx,dz);if(dd<0.3&&auto.pts.length>1){auto.pts.shift();}const lookAt=auto.pts.length>1?wp:auto.c.pos;const want=Math.atan2(-(lookAt.x-P.x),-(lookAt.z-P.z));let dy=want-P.yaw;dy=Math.atan2(Math.sin(dy),Math.cos(dy));P.yaw+=dy*Math.min(1,dt*5);P.pitch+=(-0.12-P.pitch)*Math.min(1,dt*4);
      if(dd<0.3&&auto.pts.length<=1){const c=auto.c;auto=null;select(c);}else{const sp=Math.min(dd,dt*5.2);move(dx/dd*sp,dz/dd*sp);if(Math.hypot(P.x-auto.lx,P.z-auto.lz)<dt*0.5)auto.stuck+=dt;else auto.stuck=0;auto.lx=P.x;auto.lz=P.z;if(auto.stuck>1.5){const c=auto.c;auto=null;select(c);}}}
    else if(fwd||str){const run=keys.shift?1.7:1;const sp=3.4*run*dt;const l=Math.hypot(fwd,str)||1;const f=fwd/l*Math.min(1,Math.hypot(fwd,str)),s=str/l*Math.min(1,Math.hypot(fwd,str));
      const sx=-Math.sin(P.yaw),sz=-Math.cos(P.yaw),rx=Math.cos(P.yaw),rz=-Math.sin(P.yaw);move((sx*f+rx*s)*sp,(sz*f+rz*s)*sp);P.bob+=dt*9*run;if(drawerOpen&&!touch)select(null);}
    const bob=(fwd||str||auto)&&!reduce?Math.sin(P.bob)*0.045:0;
    cam.position.set(P.x,EYE+bob,P.z);cam.rotation.set(P.pitch,P.yaw,0);
    // quem está perto
    let nb=null,nd=3.2;for(const c of CH){const d=dist(c);if(d<nd){const toC=Math.atan2(-(c.pos.x-P.x),-(c.pos.z-P.z));let a=toC-P.yaw;a=Math.atan2(Math.sin(a),Math.cos(a));if(Math.abs(a)<1.1||d<1.6){nd=d;nb=c;}}}
    if(nb!==near){near=nb;if(near){$('talk-name').textContent='Falar com '+near.name;$('bubble').textContent=line(near);near.wave=1;}$('talk').hidden=!near||drawerOpen;$('bubble').classList.toggle('on',!!near);}
    $('talk').hidden=!near||drawerOpen;
    // bonecos
    for(const c of CH){const p=c.p;const d=dist(c);const close=d<5;
      // passeio ocasional perto do posto
      if(!close&&!c.route.length&&!reduce){c.idle-=dt;if(c.idle<0){c.idle=18+Math.random()*20;const a=Math.random()*Math.PI*2;c.route=[new THREE.Vector3(c.home[0]+Math.cos(a)*1.2,0,c.home[1]+Math.sin(a)*1.2+0.6),new THREE.Vector3(c.home[0],0,c.home[1])];}}
      let moving=false;
      if(c.route.length&&!close){const tg=c.route[0];tmp.copy(tg).sub(c.pos);tmp.y=0;const dl=tmp.length();if(dl<0.06)c.route.shift();else{tmp.normalize();c.pos.addScaledVector(tmp,Math.min(dl,dt*1.6));c.rot=Math.atan2(tmp.x,tmp.z);c.walk+=dt*9;moving=true;}}
      else if(close){c.rot=Math.atan2(P.x-c.pos.x,P.z-c.pos.z);}
      else c.rot=c.face;
      let dr=c.rot-c.g.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));c.g.rotation.y+=dr*Math.min(1,dt*6);
      const sw=moving?Math.sin(c.walk)*0.7:0;p.legL.rotation.x=sw;p.legR.rotation.x=-sw;p.armL.rotation.z=p.armR.rotation.z=0;
      if(c.wave>0){c.wave-=dt*0.8;p.armR.rotation.z=2.6;p.armR.rotation.x=0;p.armR.rotation.y=Math.sin(t*14)*0.4;p.armL.rotation.x=-sw*0.8;}
      else if(close){p.armR.rotation.y=0;p.armL.rotation.x=p.armR.rotation.x=Math.sin(t*2+c.home[0])*0.06;}
      else if(!moving){p.armR.rotation.y=0;const ty=Math.sin(t*12+c.home[0])*0.22;p.armL.rotation.x=-1.15+ty;p.armR.rotation.x=-1.15-ty;}
      else{p.armR.rotation.y=0;p.armL.rotation.x=-sw*0.8;p.armR.rotation.x=sw*0.8;}
      // cabeça olha para ti
      if(close){const toP=Math.atan2(P.x-c.pos.x,P.z-c.pos.z);let hd=toP-c.g.rotation.y;hd=Math.atan2(Math.sin(hd),Math.cos(hd));p.head.rotation.y=THREE.MathUtils.clamp(hd,-0.8,0.8);p.head.rotation.x=THREE.MathUtils.clamp(Math.atan2(EYE-2.0,d)*-1,-0.4,0.3);}
      else{p.head.rotation.y=Math.sin(t*0.5+c.home[1])*0.15;p.head.rotation.x=moving?0:0.12;}
      p.mouth.scale.x=c===near&&Math.floor(t*6)%2?1.6:1;
      c.blink-=dt;const bl=c.blink<0.12;p.eyeL.scale.y=p.eyeR.scale.y=bl?0.15:1;if(c.blink<0)c.blink=2+Math.random()*4;
      if(c.idea)c.idea.visible=ideasOn&&Math.floor(t*1.2)%3===0;
      c.g.position.set(c.pos.x,0,c.pos.z);
      const showTag=d<14&&c!==near;if(showTag)project(c.g.position,c.tag,2.55);else c.tag.style.display='none';}
    if(near){const b=$('bubble');tmp.copy(near.g.position);tmp.y+=2.55;tmp.project(cam);if(tmp.z<1)b.style.transform=`translate(${(tmp.x+1)/2*innerWidth}px,${(1-tmp.y)/2*innerHeight}px) translate(-50%,-100%)`;}
    // máquina Hit0Ms
    for(const d of drops){d.t+=dt;if(d.state==='wait'&&d.t>0){d.state='fall';d.v=0;}
      if(d.state==='fall'){d.v-=dt*14;d.y+=d.v*dt;if(d.y<=0.34){d.y=0.34;d.state='squash';d.t=0;if(splats.length<10&&!reduce){const s=new THREE.Mesh(new THREE.CircleGeometry(0.45,10),new THREE.MeshBasicMaterial({color:d.m.material.color,transparent:true,opacity:.8}));s.rotation.x=-Math.PI/2;s.position.set(d.m.position.x,0.06,0);s.userData.life=1.4;rig.add(s);splats.push(s);}}}
      if(d.state==='squash'){const k=Math.min(1,d.t/0.5);d.m.scale.set(1+0.6*(1-k)*Math.sin(k*9),1-0.5*(1-k),1+0.6*(1-k)*Math.sin(k*9));if(d.t>1.4){d.state='wait';d.t=-1.5-Math.random()*1.5;d.y=4.2;d.m.scale.set(1,1,1);}}
      d.m.position.y=d.y;d.m.rotation.y+=dt;}
    for(let i=splats.length-1;i>=0;i--){const s=splats[i];s.userData.life-=dt;s.material.opacity=Math.max(0,s.userData.life/1.4*0.8);s.scale.setScalar(1+(1.4-s.userData.life));if(s.userData.life<=0){rig.remove(s);s.material.dispose();s.geometry.dispose();splats.splice(i,1);}}
    {const ms=Math.floor((t*1000)%1000);msS.x.fillStyle='#111';msS.x.fillRect(0,0,256,96);msS.x.fillStyle=ms<60?'#69db7c':'#ff6b6b';msS.x.font='bold 54px Silkscreen, monospace';msS.x.textAlign='center';msS.x.textBaseline='middle';msS.x.fillText(String(ms).padStart(3,'0')+'ms',128,52);msS.t.needsUpdate=true;}
    // tapete, encomendas, entregas
    beltT.t.offset.x=(beltT.t.offset.x-dt*0.8)%1;for(const pc of parcels){pc.m.position.x+=dt*1.1;if(pc.m.position.x>BX1-0.4)pc.m.position.x=BX0+0.4;}
    for(let i=golds.length-1;i>=0;i--){const g=golds[i];if(g.stage===0){g.m.position.x+=dt*2.4;if(g.m.position.x>=BX1-0.4){g.stage=1;}}
      else if(g.stage===1){const tx=X1-1.2,tz=g.d.z;g.m.position.x+=(tx-g.m.position.x)*Math.min(1,dt*2);g.m.position.z+=(tz-g.m.position.z)*Math.min(1,dt*2);g.m.position.y=BY+0.38+Math.sin(Math.min(1,Math.abs(tz-g.m.position.z)/Math.abs(tz-BELTZ||1))*Math.PI)*1.2;
        if(Math.abs(tz-g.m.position.z)<0.05){burst(new THREE.Vector3(X1-1.2,2.2,tz));g.d.flash=2;scene.remove(g.m);golds.splice(i,1);}}}
    for(const d of DOCK){if(d.flash>0)d.flash-=dt;d.light.material.color.set(d.flash>0?(Math.floor(t*10)%2?0xffd21f:0xffffff):d.pend?(Math.floor(t*2)%2?0xffd21f:0x886600):0x555555);}
    scr.shapes.forEach((m,i)=>{m.rotation.y+=dt*(0.6+i*0.3);m.position.y=0.7+Math.sin(t*1.5+i)*0.15;});
    scr.rec.visible=Math.floor(t*2)%2===0;scr.paper.position.y=1.55+Math.sin(t*3)*0.02;
    const pulse=ideasOn?0.75+0.25*Math.sin(t*3):0.1;scr.bulb.material.color.setHSL(0.14,ideasOn?1:0.15,ideasOn?0.55+0.15*pulse:0.78);scr.bulbL.intensity=ideasOn?1.2*pulse:0;
    // empilhador
    forkX+=forkDir*dt*1.6;if(forkX>9){forkDir=-1;fork.rotation.y=-Math.PI/2;}if(forkX<-9){forkDir=1;fork.rotation.y=Math.PI/2;}fork.position.x=forkX;
    // empilhador também bloqueia o caminho do jogador
    if(Math.abs(P.z-10.8)<1.3&&Math.abs(P.x-forkX)<1.5)P.z+=P.z>10.8?dt*3:-dt*3;
    for(let i=conf.length-1;i>=0;i--){const m=conf[i];m.userData.v.y-=dt*10;m.position.addScaledVector(m.userData.v,dt);m.rotation.x+=dt*8;m.userData.life-=dt;if(m.userData.life<=0){scene.remove(m);m.material.dispose();conf.splice(i,1);}}
    if(t-lastMini>0.12){lastMini=t;drawMini();}
    if(t-lastScreens>30){lastScreens=t;drawScreens();}
    renderer.render(scene,cam);}
  drawScreens();step();
})();
