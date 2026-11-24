// =================== ESCRITÓRIO PIXEL (visto de cima) ===================
const T=16,MW=48,MH=33;
const ROOMS=[
  {id:'ana',name:'NÚMEROS',x:1,y:5,w:9,h:8,floor:'carpet',col:'#6c4cf0',f2:'#5a3fd0'},
  {id:'gui',name:'GUIÃO',x:11,y:5,w:9,h:8,floor:'wood',col:'#c98f55',f2:'#b07a44'},
  {id:'rea',name:'ESTÚDIO',x:21,y:5,w:9,h:8,floor:'tiles',col:'#d8e8e0',f2:'#c3d8cd'},
  {id:'eng',name:'LAB 0MS',x:31,y:5,w:7,h:8,floor:'tiles',col:'#3a3550',f2:'#322d47'},
  {id:'por',name:'COMENTÁRIOS',x:39,y:5,w:8,h:8,floor:'carpet',col:'#e64980',f2:'#cf3a70'},
  {id:'car',name:'CORREIO',x:1,y:17,w:11,h:9,floor:'wood',col:'#b9855a',f2:'#a6744c'},
  {id:'ide',name:'IDEIAS',x:13,y:17,w:9,h:9,floor:'carpet',col:'#ffb347',f2:'#f0a030'},
  {id:'des',name:'DESAFIOS',x:23,y:17,w:7,h:9,floor:'tiles',col:'#e3f2e6',f2:'#cfe6d4'},
  {id:'laz',name:'LAZER',x:31,y:17,w:16,h:9,floor:'wood',col:'#d9a066',f2:'#c98f55'}];
const RBY={};for(const r of ROOMS)RBY[r.id]=r;
const CH=[
  {id:'car',name:'Carteiro',sub:'Agenda · mudar hora e pausar',shirt:'#2e5fb0',pants:'#23304f',hair:'#3a2a1a',hat:'#2e5fb0',acc:'cap',seat:[4,21],sec:'sec-car'},
  {id:'des',name:'Desafios',sub:'Desafios em imagem',shirt:'#1f9d55',pants:'#2b2d55',hair:'#6b3d1f',seat:[27,22],sec:'sec-des'},
  {id:'gui',name:'Guionista',sub:'Produção e a tua voz',shirt:'#f4b400',pants:'#2b2d55',hair:'#2a1a0e',acc:'glasses',seat:[15,9],sec:'sec-gui'},
  {id:'rea',name:'Realizador',sub:'Vídeos dos últimos 28 dias',shirt:'#0ca678',pants:'#1d1838',hair:'#111111',hat:'#111111',acc:'beret',seat:[23,10],sec:'sec-rea'},
  {id:'eng',name:'Engenheiro',sub:'Trial reels vs normais',shirt:'#e03131',pants:'#1d1838',hair:'#111111',hat:'#ffd21f',acc:'helmet',seat:[33,11],sec:'sec-eng'},
  {id:'ana',name:'Analista',sub:'Números e gráficos',shirt:'#6c4cf0',pants:'#2b2d55',hair:'#3a2a1a',acc:'glasses',seat:[5,9],sec:'sec-ana'},
  {id:'por',name:'Porta-voz',sub:'Comentários de IG, TikTok e YouTube',shirt:'#e64980',pants:'#2b2d55',hair:'#1d1838',acc:'headset',seat:[42,9],sec:'sec-por'},
  {id:'ide',name:'Ideias',sub:'Escolhe e manda produzir',shirt:'#ff8c1a',pants:'#2b2d55',hair:'#7a3a10',seat:[17,20],sec:'sec-ide'}];
function avatarTo(cv,c){const x=cv.getContext('2d');x.clearRect(0,0,16,16);const p=(a,b,w,h,col)=>{x.fillStyle=col;x.fillRect(a,b,w,h);};
  p(5,1,6,6,'#f2c39c');p(5,1,6,2,c.hat||c.hair);p(6,4,1,1,'#1d1838');p(9,4,1,1,'#1d1838');if(c.acc==='glasses'){p(5,4,3,1,'#1d1838');p(8,4,3,1,'#1d1838');}
  p(4,7,8,5,c.shirt);p(3,8,1,3,'#f2c39c');p(12,8,1,3,'#f2c39c');p(5,12,3,3,c.pants);p(8,12,3,3,c.pants);}
for(const c of CH){const b=document.createElement('button');b.type='button';b.dataset.id=c.id;b.setAttribute('aria-pressed','false');b.title=c.sub;
  const cv=document.createElement('canvas');cv.width=cv.height=16;avatarTo(cv,c);const dot=document.createElement('span');dot.className='dot';dot.hidden=true;
  b.append(cv,document.createTextNode(c.name),dot);$('dock').append(b);}
let selected=null,focusOn=()=>{},say=()=>{};
function select(c,fly){selected=c;for(const b of $('dock').children)b.setAttribute('aria-pressed',String(!!c&&b.dataset.id===c.id));
  if(!c){$('drawer').classList.remove('open');$('bubble').classList.remove('on');return;}
  $('dtitle').textContent=c.name;$('dsub').textContent=c.sub;avatarTo($('dav'),c);
  for(const x of CH)$(x.sec).hidden=x!==c;$('dbody').scrollTop=0;$('drawer').classList.add('open');say(c);if(fly)focusOn(c);}
$('dock').addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)select(CH.find(c=>c.id===b.dataset.id),true);});
$('dclose').addEventListener('click',()=>select(null));
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('modal').hidden)select(null);});
setTabs();

(function(){
  const cv=$('gl'),ctx=cv.getContext('2d');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const mobile=matchMedia('(max-width:700px)').matches;
  // ---------- grelha ----------
  const solid=new Uint8Array(MW*MH).fill(1);const at=(x,y)=>y*MW+x;
  const S=(x,y,v=1)=>{if(x>=0&&y>=0&&x<MW&&y<MH)solid[at(x,y)]=v;};
  for(let y=5;y<=29;y++)for(let x=1;x<=46;x++)S(x,y,0);
  const walls=[];function hwall(y,x0,x1,doors=[]){for(let x=x0;x<=x1;x++)if(!doors.some(d=>x>=d&&x<=d+1)){S(x,y,1);walls.push([x,y]);}}
  function vwall(x,y0,y1){for(let y=y0;y<=y1;y++){S(x,y,1);walls.push([x,y]);}}
  hwall(13,1,46,[4,14,24,33,42]);hwall(16,1,46,[5,16,25,37]);hwall(26,1,46,[6,40]);
  vwall(10,5,12);vwall(20,5,12);vwall(30,5,12);vwall(38,5,12);vwall(12,17,25);vwall(22,17,25);vwall(30,17,25);
  const furn=[];function F(kind,x,y,w=1,h=1,o={}){const f={kind,x,y,w,h,...o};furn.push(f);if(o.walk!==true)for(let j=0;j<h;j++)for(let i=0;i<w;i++)S(x+i,y+j,1);return f;}
  // Números
  F('plant',1,5);F('plant',9,5);F('desk',4,8,3,1,{mon:'ana'});F('shelf',1,11,2,1);F('rug',3,10,5,2,{walk:true,col:'#8e7cf0'});F('chairs',7,11,2,1);
  // Guião
  F('shelf',11,5,3,1);F('plant',19,5);F('desk',14,8,3,1,{mon:'gui',paper:true});F('papers',18,11,1,1);F('rug',12,10,4,2,{walk:true,col:'#1f9d55'});
  // Estúdio
  F('green',22,5,5,1,{walk:true});F('desk',22,9,3,1,{mon:'rea',mon2:true});F('tripod',27,8);F('light',28,6);F('plant',29,11);
  // Lab 0ms
  F('rig',33,6,4,3);F('desk',32,10,3,1,{mon:'eng'});F('crate',37,11);
  // Comentários
  F('desk',41,8,3,1,{mon:'por'});F('plant',46,5);F('beanbag',45,10,1,1);F('beanbag',39,11,1,1);F('rug',40,10,5,2,{walk:true,col:'#ffd6e7'});
  // Correio
  F('cubbies',1,18,1,4);F('desk',3,20,3,1,{mon:'car'});F('parcels',9,18,2,2);F('parcels',10,23,1,2);F('bag',7,24);F('plant',11,18);
  // Ideias
  F('board',14,17,5,1);F('lamp',20,18);F('stool',16,21);F('stool',18,21);F('plant',13,25);F('rug',14,22,6,2,{walk:true,col:'#ffe066'});
  // Desafios
  F('easel',25,19,2,1);F('desk',26,21,3,1,{mon:'des'});F('shapes',23,24,3,1,{walk:true});
  // Lazer
  F('sofa',33,18,3,1);F('ctable',33,20,3,1);F('sofa2',33,22,3,1);F('pong',38,19,4,2);F('coffee',45,18);F('cooler',31,18);F('arcade',46,23);F('arcade',45,23);F('plant',46,25);F('plant',31,25);F('rug',32,18,5,6,{walk:true,col:'#c2b8ff'});F('vending',42,17,2,1);
  // portas das redes (parede de baixo)
  const NDOOR=[{k:'IG',x:4,col:'#d6336c'},{k:'TT',x:10,col:'#111111'},{k:'YT',x:16,col:'#e62117'},{k:'FB',x:22,col:'#1877f2'}];
  // ---------- pontos de lazer ----------
  const SPOTS=[{x:34,y:19,f:'down',a:'sofa'},{x:35,y:19,f:'down',a:'sofa'},{x:34,y:21,f:'up',a:'sofa'},{x:35,y:21,f:'up',a:'sofa'},{x:37,y:19,f:'right',a:'pong',p:0},{x:42,y:20,f:'left',a:'pong',p:1},{x:45,y:19,f:'up',a:'coffee'},{x:31,y:19,f:'up',a:'cooler'},{x:46,y:22,f:'up',a:'arcade'},{x:45,y:22,f:'up',a:'arcade'},{x:43,y:18,f:'up',a:'vending'}];
  for(const s of SPOTS)s.taken=null;

  // ---------- desenho estático ----------
  const map=document.createElement('canvas');map.width=MW*T;map.height=MH*T;const m=map.getContext('2d');
  const R=(x,y,w,h,c)=>{m.fillStyle=c;m.fillRect(x,y,w,h);};
  function rnd(i){const s=Math.sin(i*12.9898)*43758.5453;return s-Math.floor(s);}
  function floorTile(tx,ty,kind,c1,c2){const X=tx*T,Y=ty*T;
    if(kind==='wood'){R(X,Y,T,T,c1);for(let k=0;k<4;k++){R(X,Y+k*4+3,T,1,c2);R(X+((tx*7+k*5+ty*3)%T),Y+k*4,1,3,c2);}}
    else if(kind==='carpet'){R(X,Y,T,T,c1);for(let k=0;k<6;k++)R(X+Math.floor(rnd(tx*31+ty*17+k)*T),Y+Math.floor(rnd(tx*13+ty*7+k*3)*T),1,1,c2);}
    else if(kind==='tiles'){R(X,Y,T,T,(tx+ty)%2?c1:c2);R(X,Y,T,1,'rgba(0,0,0,.06)');R(X,Y,1,T,'rgba(0,0,0,.06)');}
    else if(kind==='corr'){R(X,Y,T,T,'#b8b4c8');R(X,Y,T,1,'#a9a4bb');R(X,Y,1,T,'#a9a4bb');if((tx+ty)%5===0)R(X+6,Y+6,2,2,'#c6c2d4');}
    else if(kind==='grass'){R(X,Y,T,T,'#6fbf57');for(let k=0;k<5;k++)R(X+Math.floor(rnd(tx*9+ty*5+k)*14),Y+Math.floor(rnd(tx*3+ty*11+k)*14),2,1,k%2?'#5aa84a':'#86d16a');}
    else if(kind==='path'){R(X,Y,T,T,'#e3d3a8');for(let k=0;k<3;k++)R(X+Math.floor(rnd(tx*5+ty*9+k)*14),Y+Math.floor(rnd(tx*7+ty*3+k)*14),2,2,'#d2c08f');}}
  for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){let k='grass';if(y>=4&&y<=30&&x>=0&&x<=47)k='corr';if(y===2||y===31)k='path';floorTile(x,y,k);}
  for(const r of ROOMS)for(let y=r.y;y<r.y+r.h;y++)for(let x=r.x;x<r.x+r.w;x++)floorTile(x,y,r.floor,r.col,r.f2);
  // tapetes
  for(const f of furn)if(f.kind==='rug'){R(f.x*T+2,f.y*T+2,f.w*T-4,f.h*T-4,f.col);m.strokeStyle='rgba(255,255,255,.5)';m.lineWidth=1;m.strokeRect(f.x*T+4.5,f.y*T+4.5,f.w*T-9,f.h*T-9);}
  // paredes (vista de cima: topo escuro + face clara a sul)
  const isW=(x,y)=>x<0||y<0||x>=MW||y>=MH?false:walls.some(w=>w[0]===x&&w[1]===y)||((y===4||y===30)&&x>=0&&x<=47)||((x===0||x===47)&&y>=4&&y<=30);
  for(let y=4;y<=30;y++)for(let x=0;x<=47;x++)if(isW(x,y)){const X=x*T,Y=y*T;R(X,Y,T,T,'#4a4366');R(X,Y,T,3,'#5d557e');if(!isW(x,y+1)&&y<30){R(X,Y+8,T,8,'#efe6d8');R(X,Y+8,T,1,'#d8cbb6');R(X,Y+15,T,1,'#c7b9a2');}}
  // janelas na parede de cima
  for(let x=2;x<46;x+=4){const X=x*T,Y=4*T;R(X,Y+5,T*2,9,'#9fd8ff');R(X,Y+5,T*2,1,'#ffffff');R(X+T-1,Y+5,2,9,'#e8f4ff');}
  // árvores lá fora
  function tree(tx,ty){const X=tx*T,Y=ty*T;R(X+6,Y+10,4,6,'#7a4b2a');m.fillStyle='#2f8a3e';m.beginPath();m.arc(X+8,Y+6,8,0,7);m.fill();m.fillStyle='#47ad52';m.beginPath();m.arc(X+6,Y+4,5,0,7);m.fill();R(X+4,Y+2,2,2,'#86d16a');}
  for(let x=1;x<47;x+=3)if(x%6!==4)tree(x,0);for(let x=3;x<47;x+=5)tree(x,3-(x%2));for(let x=2;x<47;x+=4)tree(x,32);
  // placas de nome das salas (na face da parede)
  function plate(r){const tw=r.name.length*4+6,X=(r.x+r.w/2)*T-tw/2,Y=(r.y-1)*T+9;R(X,Y,tw,7,'#1d1838');m.fillStyle='#fff';m.font='bold 6px Silkscreen, monospace';m.textBaseline='top';m.textAlign='center';m.fillText(r.name,X+tw/2,Y);}
  // mobília
  function drawFurn(f){const X=f.x*T,Y=f.y*T,W=f.w*T,H=f.h*T;
    switch(f.kind){
      case 'desk':R(X+1,Y+2,W-2,H-3,'#9a6a3f');R(X+1,Y+2,W-2,2,'#b88350');R(X+1,Y+H-3,W-2,2,'#6a4425');R(X+2,Y+H-1,2,1,'#5a3a20');R(X+W-4,Y+H-1,2,1,'#5a3a20');
        R(X+W/2-6,Y,12,9,'#1d1838');R(X+W/2-5,Y+1,10,6,'#0b1a2e');R(X+W/2-1,Y+9,2,1,'#1d1838');if(f.mon2){R(X+3,Y+1,9,7,'#1d1838');R(X+4,Y+2,7,4,'#0b1a2e');}
        R(X+W/2-4,Y+11,8,2,'#d8d4e8');if(f.paper){R(X+W-10,Y+4,6,7,'#ffffff');R(X+W-9,Y+6,4,1,'#bbb');R(X+W-9,Y+8,3,1,'#bbb');}break;
      case 'plant':R(X+5,Y+9,6,6,'#c9653a');R(X+5,Y+9,6,1,'#e07a4a');m.fillStyle='#2f9a48';m.beginPath();m.arc(X+8,Y+7,5,0,7);m.fill();R(X+5,Y+3,2,3,'#47ad52');R(X+10,Y+4,2,3,'#47ad52');break;
      case 'shelf':R(X,Y+1,W,H-1,'#7a4b2a');for(let r=0;r<2;r++){R(X+1,Y+3+r*6,W-2,1,'#5a3a20');for(let i=0;i<W-3;i+=3)R(X+2+i,Y+4+r*6-0,2,4,['#e03131','#1c7ed6','#ffd21f','#0ca678','#6c4cf0'][(i/3+r+f.x)%5|0]);}break;
      case 'papers':R(X+3,Y+5,9,8,'#ffffff');R(X+4,Y+4,9,8,'#f4f1e8');R(X+5,Y+6,6,1,'#bbb');break;
      case 'chairs':for(let i=0;i<f.w;i++){R(X+i*T+3,Y+3,10,10,'#444a66');R(X+i*T+4,Y+4,8,3,'#5d6488');}break;
      case 'green':R(X,Y-8,W,12,'#2fd15a');R(X,Y-8,W,1,'#5fe08a');break;
      case 'tripod':R(X+7,Y+6,2,9,'#222');R(X+3,Y+13,10,2,'#222');R(X+3,Y+1,10,6,'#222');R(X+4,Y+2,3,3,'#444');R(X+11,Y+2,1,1,'#e03131');break;
      case 'light':R(X+7,Y+4,2,11,'#333');R(X+3,Y,10,5,'#fffbe0');R(X+3,Y+5,10,1,'#333');break;
      case 'rig':R(X,Y,W,2,'#777e95');R(X,Y,2,H,'#777e95');R(X+W-2,Y,2,H,'#777e95');R(X+2,Y+H-3,W-4,3,'#ffffff');R(X+2,Y+H-3,W-4,1,'#e8e8f0');break;
      case 'crate':R(X+2,Y+3,12,12,'#c98f55');R(X+2,Y+3,12,2,'#d9a066');R(X+7,Y+3,2,12,'#a87444');break;
      case 'beanbag':m.fillStyle='#ffd21f';m.beginPath();m.ellipse(X+8,Y+9,7,6,0,0,7);m.fill();R(X+5,Y+5,4,2,'#ffe066');break;
      case 'cubbies':R(X,Y,W,H,'#6a4425');['#d6336c','#111111','#e62117','#1877f2'].forEach((c,i)=>{R(X+2,Y+i*T+3,W-4,T-6,c);R(X+3,Y+i*T+5,W-6,2,'rgba(255,255,255,.35)');});break;
      case 'parcels':for(let j=0;j<f.h;j++)for(let i=0;i<f.w;i++){const c=['#c98f55','#d9a066','#b8804a'][(i+j)%3];R(X+i*T+2,Y+j*T+2,12,12,c);R(X+i*T+2,Y+j*T+7,12,2,'#e8c98f');}break;
      case 'bag':R(X+3,Y+5,10,9,'#8a5a33');R(X+5,Y+3,6,3,'#6a4425');R(X+4,Y+7,8,1,'#f4e3c3');break;
      case 'board':R(X+2,Y-9,W-4,12,'#b0b0c0');R(X+3,Y-8,W-6,10,'#ffffff');break;
      case 'lamp':R(X+7,Y+5,2,10,'#666');R(X+4,Y+13,8,2,'#666');break;
      case 'stool':R(X+4,Y+5,8,8,'#6c4cf0');R(X+5,Y+6,6,2,'#8e7cf0');break;
      case 'easel':R(X+4,Y,2,H,'#8a5a33');R(X+W-6,Y,2,H,'#8a5a33');R(X+2,Y-2,W-4,12,'#ffffff');R(X+2,Y-2,W-4,1,'#ddd');break;
      case 'sofa':R(X,Y+2,W,12,'#e03131');R(X,Y+2,W,5,'#c92a2a');R(X,Y+2,3,12,'#c92a2a');R(X+W-3,Y+2,3,12,'#c92a2a');break;
      case 'sofa2':R(X,Y+2,W,12,'#1c7ed6');R(X,Y+9,W,5,'#1864ab');R(X,Y+2,3,12,'#1864ab');R(X+W-3,Y+2,3,12,'#1864ab');break;
      case 'ctable':R(X+4,Y+3,W-8,10,'#8a5a33');R(X+4,Y+3,W-8,2,'#a87444');R(X+10,Y+6,4,3,'#ffffff');R(X+22,Y+6,3,3,'#e03131');break;
      case 'pong':R(X,Y+2,W,H-4,'#1f7a4a');R(X+1,Y+3,W-2,H-6,'#2b9a5e');R(X+W/2,Y+2,1,H-4,'#ffffff');R(X+1,Y+H/2-0.5,W-2,1,'rgba(255,255,255,.6)');R(X+W/2-1,Y,3,H,'rgba(240,240,240,.85)');break;
      case 'coffee':R(X+2,Y,12,15,'#2b2d3a');R(X+4,Y+3,8,3,'#ffd21f');R(X+6,Y+9,4,4,'#ffffff');break;
      case 'cooler':R(X+4,Y+6,8,9,'#e0e4ee');m.fillStyle='#7ec8ff';m.beginPath();m.arc(X+8,Y+5,5,0,7);m.fill();break;
      case 'arcade':R(X+2,Y-2,12,17,'#6c4cf0');R(X+3,Y,10,7,'#0b1a2e');R(X+4,Y+9,2,2,'#e03131');R(X+9,Y+9,2,2,'#ffd21f');break;
      case 'vending':R(X+1,Y-3,W-2,18,'#e03131');R(X+3,Y-1,W-10,12,'#9fd8ff');for(let i=0;i<3;i++)R(X+4,Y+i*4,W-12,2,['#ffd21f','#0ca678','#ffffff'][i]);R(X+W-6,Y+2,3,6,'#2b2d3a');break;}}
  for(const f of furn)if(f.kind!=='rug'&&f.kind!=='shapes')drawFurn(f);
  for(const r of ROOMS)plate(r);
  // portas das redes
  for(const d of NDOOR){const X=d.x*T,Y=30*T;R(X,Y,T*2,T,'#1d1838');R(X+2,Y+1,T*2-4,T-1,d.col);for(let i=0;i<4;i++)R(X+2,Y+3+i*3,T*2-4,1,'rgba(0,0,0,.25)');R(X,Y-2,T*2,2,'#ffd21f');}
  // saída
  R(44*T,30*T,T*2,T,'#3b2a1a');R(44*T+2,30*T+2,T*2-4,T-2,'#7a4b2a');

  // ---------- bonecos ----------
  const BFS=(sx,sy,tx,ty)=>{sx|=0;sy|=0;tx|=0;ty|=0;if(solid[at(tx,ty)])return null;const prev=new Int32Array(MW*MH).fill(-1);const q=[at(sx,sy)];prev[at(sx,sy)]=at(sx,sy);let h=0;
    while(h<q.length){const c=q[h++];if(c===at(tx,ty))break;const cx=c%MW,cy=(c/MW)|0;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=MW||ny>=MH)continue;const n=at(nx,ny);if(prev[n]>=0||solid[n])continue;prev[n]=c;q.push(n);}}
    if(prev[at(tx,ty)]<0)return null;const pts=[];for(let c=at(tx,ty);c!==at(sx,sy);c=prev[c])pts.push({x:c%MW,y:(c/MW)|0});return pts.reverse();};
  for(const c of CH){c.x=c.seat[0];c.y=c.seat[1];c.dir='up';c.mode='work';c.path=[];c.walk=0;c.next=8+Math.random()*25;c.talk=null;c.blink=Math.random()*4;}
  function goTo(c,tx,ty,then){const p=BFS(Math.round(c.x),Math.round(c.y),tx,ty);if(!p){return false;}c.path=p;c.mode='walk';c.then=then;return true;}
  function goHome(c){if(c.spot){c.spot.taken=null;c.spot=null;}goTo(c,c.seat[0],c.seat[1],()=>{c.mode='work';c.dir='up';c.next=25+Math.random()*40;});}
  function goPlay(c){const free=SPOTS.filter(s=>!s.taken);if(!free.length){c.next=10;return;}
    // prefere juntar-se a quem já está lá (para conversarem)
    let s=free.find(s=>s.a==='pong'&&SPOTS.some(o=>o.a==='pong'&&o.taken))||free.find(s=>s.a==='sofa'&&SPOTS.some(o=>o.a==='sofa'&&o.taken))||free[Math.floor(Math.random()*free.length)];
    s.taken=c;c.spot=s;goTo(c,s.x,s.y,()=>{c.mode='play';c.dir=s.f;c.stay=12+Math.random()*14;});}
  // carteiro entrega
  const CAR=CH[0];const conf=[];const NDB={};for(const d of NDOOR)NDB[d.k]=d;
  function deliver(k){const d=NDB[k]||NDOOR[0];if(CAR.spot){CAR.spot.taken=null;CAR.spot=null;}CAR.letter=true;
    goTo(CAR,d.x,29,()=>{CAR.dir='down';CAR.letter=false;d.flash=2;if(!reduce)for(let i=0;i<30;i++)conf.push({x:(d.x+1)*T,y:30*T,vx:(Math.random()-.5)*90,vy:-60-Math.random()*90,c:['#e64980','#ffd21f','#25f4ee','#339af0','#69db7c'][i%5],l:1.6});
      setTimeout(()=>goHome(CAR),900);});}
  const seen={};let first=true;
  onWorld=()=>{const fresh=[];for(const p of D.posts)for(const n of p.nets){const k=p.id+n.k;if(seen[k]&&seen[k]!=='done'&&n.s==='done')fresh.push(n.k);seen[k]=n.s;}if(!first&&fresh.length)deliver(fresh[0]);if(D.hasMC)first=false;};

  // ---------- falas ----------
  function line(c){const L=lis();if(!D)return '…';
    if(c.id==='car'){if(!D.hasMC)return 'A ver o Metricool…';const n=D.next;return n?`Próximo: ${n.date===L.date?'':dm(n.date)+' '}${n.time} · ${LABEL[n.acct]}`:'Hoje já saiu tudo! 📬';}
    if(c.id==='ana'){if(!D.hasW)return 'A fazer contas…';const a=D.a['2factos'],b=D.a.hit0ms;return `IG 7 dias: 2F ${short(a.ig7)} · H0 ${short(b.ig7)}`;}
    if(c.id==='rea'){if(!D.hasW)return 'A rever gravações…';const top=[...D.vids].sort((a,b)=>(+b.views||0)-(+a.views||0))[0];return top?`Campeão: ${capLine(top.cap).slice(0,24)}… ${short(top.views)}`:'Sem vídeos.';}
    if(c.id==='eng'){if(!D.hasW)return 'A calibrar…';return `${D.vids.filter(v=>v.k==='IG'&&v.trial).length} trial reels testados 🧪`;}
    if(c.id==='ide'){const n=ST.db?.ideas?.length||0;return n?`${n} ideias novas! 💡`:'Ideias às 8:53 ☕';}
    if(c.id==='gui'){const v=ST.ped.filter(p=>p.estado==='precisa_voz').length,a=ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length;return v?'Preciso da tua voz! 🎙️':a?`${a} em produção ✍️`:'Manda-me ideias!';}
    if(c.id==='por'){const p_=ST.com.filter(x=>x.estado==='pendente').length;return p_?`${p_} comentários à tua espera 💬`:'Comentários em dia 💬';}
    if(c.id==='des'){const n=ST.db?.challenges?.length||0;return n?`${n} desafios a correr 🔺`:'Quantos 🔺 vês?';}
    return '';}
  const SMALL=['Já viste as views? 👀','Café? ☕','gg 🔥','Esse vídeo bombou!','Bora, próximo!','kkk','Pausa de 5 min 😴','Quem ganha? 🏓','Hit0Ms tá voando 🚀','E a 2 Factos? 🤔'];
  let sayT=0;say=c=>{$('bubble').textContent=line(c);$('bubble').classList.add('on');sayT=performance.now()+6000;};

  // ---------- câmara ----------
  const cam={x:MW*T/2,y:15*T,z:1};let W=0,H=0,dpr=1;
  function fitAll(){const zx=W/(MW*T+8),zy=(H-150)/(29*T);cam.z=mobile?Math.max(0.9,W/(24*T)):Math.max(0.6,Math.min(zx,zy));cam.x=mobile?16*T:MW*T/2;cam.y=17*T;}
  function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;}
  addEventListener('resize',resize);resize();fitAll();
  $('fit').addEventListener('click',()=>{fly=null;fitAll();for(const b of $('views').children)b.setAttribute('aria-pressed','false');});
  let fly=null;function flyTo(x,y,z){fly={t0:performance.now(),f:{...cam},t:{x,y,z}};}
  focusOn=c=>{const r=RBY[c.id];const z=Math.max(cam.z,mobile?2.2:2.6);const off=$('drawer').classList.contains('open')&&!mobile?(Math.min(470,W*0.4))/2/z:0;flyTo((c.x+0.5)*T+off,(c.y+0.5)*T+(mobile?H*0.27/z:0),z);};
  for(const r of ROOMS){if(r.id==='laz')continue;const b=document.createElement('button');b.type='button';b.dataset.k=r.id;b.textContent=r.name;b.setAttribute('aria-pressed','false');
    b.onclick=()=>{const c=CH.find(x=>x.id===r.id);select(c,true);for(const x of $('views').children)x.setAttribute('aria-pressed',String(x===b));};$('views').append(b);}
  {const b=document.createElement('button');b.type='button';b.textContent='LAZER';b.onclick=()=>{const r=RBY.laz;flyTo((r.x+r.w/2)*T,(r.y+r.h/2)*T,mobile?2:2.4);};$('views').append(b);}
  const toWorld=(sx,sy)=>({x:(sx-W/2)/cam.z+cam.x,y:(sy-H/2)/cam.z+cam.y});
  // arrastar / zoom / tocar
  const pts=new Map();let panStart=null,pinch=null,moved=false;
  cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);pts.set(e.pointerId,{x:e.clientX,y:e.clientY});fly=null;moved=false;hideHint();
    if(pts.size===1)panStart={x:e.clientX,y:e.clientY,cx:cam.x,cy:cam.y};if(pts.size===2){const [a,b]=[...pts.values()];pinch={d:Math.hypot(a.x-b.x,a.y-b.y),z:cam.z};}cv.style.cursor='grabbing';});
  cv.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)){hover(e);return;}pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pts.size===2&&pinch){const [a,b]=[...pts.values()];cam.z=Math.max(0.5,Math.min(6,pinch.z*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d));moved=true;return;}
    if(panStart){const dx=e.clientX-panStart.x,dy=e.clientY-panStart.y;if(Math.abs(dx)+Math.abs(dy)>5)moved=true;cam.x=panStart.cx-dx/cam.z;cam.y=panStart.cy-dy/cam.z;}});
  const end=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);if(pts.size<2)pinch=null;if(!pts.size){cv.style.cursor='grab';if(!moved)pick(e.clientX,e.clientY);panStart=null;}};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',e=>{e.preventDefault();fly=null;const w=toWorld(e.clientX,e.clientY);cam.z=Math.max(0.5,Math.min(6,cam.z*Math.exp(-e.deltaY*0.0015)));const w2=toWorld(e.clientX,e.clientY);cam.x+=w.x-w2.x;cam.y+=w.y-w2.y;},{passive:false});
  function charAt(sx,sy){const w=toWorld(sx,sy);let best=null;for(const c of CH){const cx=(c.x+0.5)*T,cy=(c.y+0.5)*T;if(Math.abs(w.x-cx)<9&&w.y>cy-20&&w.y<cy+9)best=c;}return best;}
  function pick(sx,sy){const c=charAt(sx,sy);if(c){select(c,true);return;}const w=toWorld(sx,sy);const tx=Math.floor(w.x/T),ty=Math.floor(w.y/T);const r=ROOMS.find(r=>tx>=r.x&&tx<r.x+r.w&&ty>=r.y&&ty<r.y+r.h);
    if(r&&r.id!=='laz')select(CH.find(c=>c.id===r.id),true);else if(!r)select(null);}
  let hoverC=null;function hover(e){hoverC=charAt(e.clientX,e.clientY);cv.style.cursor=hoverC?'pointer':'grab';}
  let hintGone=false;function hideHint(){if(hintGone)return;hintGone=true;$('hint').style.opacity='0';}setTimeout(hideHint,9000);

  // ---------- sprites dos bonecos ----------
  function drawChar(c,t){const X=Math.round((c.x+0.5)*T)-6,Y=Math.round((c.y+0.5)*T)-17;const P=(x,y,w,h,col)=>{ctx.fillStyle=col;ctx.fillRect(X+x,Y+y,w,h);};
    const skin='#f2c39c';const walking=c.mode==='walk';const fr=walking?Math.floor(c.walk*8)%2:0;const sit=c.mode==='work'||(c.mode==='play'&&c.spot&&c.spot.a==='sofa');
    ctx.fillStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.ellipse(X+6,Y+18,6,2.2,0,0,7);ctx.fill();
    const d=c.dir;const bob=walking?(fr?1:0):0;
    // pernas
    if(!sit){if(d==='left'||d==='right'){P(4,14,4,3,c.pants);P(fr?2:5,14+0,3,3,c.pants);P(3,17,6,1,'#1d1d1d');}
      else{P(3,14,3,fr?3:4,c.pants);P(6,14,3,fr?4:3,c.pants);P(3,17-(fr?1:0),3,1,'#1d1d1d');P(6,17-(fr?0:1),3,1,'#1d1d1d');}}
    else{P(3,14,6,2,c.pants);}
    // corpo
    P(2,8+bob,8,7,c.shirt);P(2,14+bob,8,1,'rgba(0,0,0,.2)');
    // braços
    const typing=c.mode==='work'&&Math.floor(t*6+c.seat[0])%2;
    if(d==='left'){P(4,9+bob,3,5,c.shirt);P(4,13+bob,3,1,skin);}else if(d==='right'){P(5,9+bob,3,5,c.shirt);P(5,13+bob,3,1,skin);}
    else{P(1,9+bob+(typing?-1:0),1,5,c.shirt);P(10,9+bob+(typing?0:-1),1,5,c.shirt);P(1,13+bob+(typing?-1:0),1,1,skin);P(10,13+bob+(typing?0:-1),1,1,skin);}
    if(c.letter){P(d==='left'?0:8,10+bob,5,4,'#f4e3c3');P(d==='left'?1:9,11+bob,3,1,'#e03131');}
    // cabeça
    const hy=bob;P(3,1+hy,6,7,skin);
    if(d==='up'){P(2,0+hy,8,6,c.hair);P(2,6+hy,1,1,c.hair);P(9,6+hy,1,1,c.hair);}
    else if(d==='down'){P(2,0+hy,8,3,c.hair);P(2,3+hy,1,2,c.hair);P(9,3+hy,1,2,c.hair);const bl=c.blink<0.12;P(4,4+hy,1,bl?1:2,'#1d1838');P(7,4+hy,1,bl?1:2,'#1d1838');P(3,6+hy,1,1,'#f5a3a3');P(8,6+hy,1,1,'#f5a3a3');if(c.talk&&Math.floor(t*8)%2)P(5,6+hy,2,1,'#9a4a3a');}
    else{const L=d==='left';P(2,0+hy,8,3,c.hair);P(L?8:2,3+hy,2,3,c.hair);P(L?4:7,4+hy,1,2,'#1d1838');P(L?3:8,6+hy,1,1,'#f5a3a3');}
    if(c.acc==='glasses'&&d!=='up'){if(d==='down'){P(3,4+hy,3,1,'#1d1838');P(6,4+hy,3,1,'#1d1838');}else P(d==='left'?3:6,4+hy,3,1,'#1d1838');}
    if(c.acc==='cap'){P(2,0+hy,8,2,c.hat);if(d==='down')P(3,2+hy,6,1,c.hat);if(d==='left')P(0,2+hy,4,1,c.hat);if(d==='right')P(8,2+hy,4,1,c.hat);}
    if(c.acc==='beret'){P(1,-1+hy,9,2,c.hat);P(8,-2+hy,2,1,c.hat);}
    if(c.acc==='helmet'){P(1,-1+hy,10,3,c.hat);P(1,1+hy,10,1,'#e6b800');}
    if(c.acc==='headset'){P(1,2+hy,1,4,'#1d1838');P(10,2+hy,1,4,'#1d1838');P(2,-1+hy,8,1,'#1d1838');if(d==='down')P(9,6+hy,2,1,'#1d1838');}
    if(c===selected||c===hoverC){ctx.strokeStyle='#ffd21f';ctx.lineWidth=1;ctx.strokeRect(X-2.5,Y-3.5,17,24);}}

  // ---------- conteúdos vivos (ecrãs, quadro, etc.) ----------
  function txt(s,x,y,size,col,align='center',font='Silkscreen, monospace'){ctx.fillStyle=col;ctx.font=`bold ${size}px ${font}`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(s,x,y);}
  function monitor(id){const f=furn.find(f=>f.mon===id);return f?{x:f.x*T+f.w*T/2-5,y:f.y*T+1}:null;}
  function drawLive(t){if(!D)return;const a2=D.a['2factos'],ah=D.a.hit0ms;
    const mon=(id,big,col)=>{const p=monitor(id);if(!p)return;ctx.fillStyle='#0b1a2e';ctx.fillRect(p.x,p.y,10,6);txt(String(big).slice(0,4),p.x+5,p.y+3.2,3.2,col);};
    mon('car',D.hasMC?`${D.today.filter(p=>p.state==='done').length}/${D.today.length}`:'..','#ffd21f');
    mon('ana',D.hasW?short(a2.ig7+ah.ig7):'..','#5fe08a');mon('gui',String(ST.ped.filter(p=>!['agendado','erro'].includes(p.estado)).length),'#ffe066');
    mon('rea','REC','#ff6b6b');mon('eng',D.hasW?String(D.vids.filter(x=>x.k==='IG'&&x.trial).length):'..','#b197fc');
    mon('por',String(ST.com.filter(x=>x.estado==='pendente').length),'#ff8cc6');mon('des',String(ST.db?.challenges?.length||0),'#7fe3a0');
    // ecrã grande dos números (parede de cima da sala)
    {const r=RBY.ana,X=(r.x+1)*T,Y=4*T+3,w=7*T,h=12;ctx.fillStyle='#111';ctx.fillRect(X-1,Y-1,w+2,h+2);ctx.fillStyle='#07060f';ctx.fillRect(X,Y,w,h);
      const ds=D.days.slice(-15,-1);for(const [obj,col] of [[a2.igV,'#38d9a9'],[ah.igV,'#ff6b9a']]){const v=ds.map(d=>obj[d]||0),mx=Math.max(1,...ds.map(d=>Math.max(a2.igV[d]||0,ah.igV[d]||0)));ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();v.forEach((y,i)=>{const px=X+2+i*(w-4)/(v.length-1),py=Y+h-2-(h-4)*y/mx;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.stroke();}}
    // quadro das ideias
    {const f=furn.find(f=>f.kind==='board');const X=f.x*T+3,Y=f.y*T-8,I=ST.db?.ideas||[];for(let i=0;i<Math.min(4,I.length);i++){ctx.fillStyle=['#d6336c','#6c4cf0','#0ca678','#f08c00'][i];ctx.fillRect(X+2,Y+2+i*2.2,Math.min(f.w*T-10,20+((I[i].text||'').length%30)),1.2);}
      if(!I.length)txt('8:53',X+(f.w*T-6)/2,Y+5,4,'#6b6590');
      if(I.length){const on=Math.floor(t*1.5)%2;ctx.fillStyle=on?'#ffe066':'#fff6c4';ctx.beginPath();ctx.arc(f.x*T+f.w*T+8,f.y*T+2,3.2,0,7);ctx.fill();if(on){ctx.fillStyle='rgba(255,230,102,.35)';ctx.beginPath();ctx.arc(f.x*T+f.w*T+8,f.y*T+2,7,0,7);ctx.fill();}}}
    // cavalete com formas
    {const f=furn.find(f=>f.kind==='easel');const X=f.x*T+3,Y=f.y*T-1,k=Math.floor(t/2)%3;const cols=['#e03131','#1c7ed6','#ffd21f'];for(let i=0;i<6;i++){ctx.fillStyle=cols[(i+k)%3];const cx=X+3+(i%3)*8,cy=Y+3+Math.floor(i/3)*4.5;ctx.beginPath();if((i+k)%3===0){ctx.moveTo(cx,cy-1.8);ctx.lineTo(cx-2,cy+1.8);ctx.lineTo(cx+2,cy+1.8);}else if((i+k)%3===1)ctx.rect(cx-1.8,cy-1.8,3.6,3.6);else ctx.arc(cx,cy,1.9,0,7);ctx.fill();}}
    {const f=furn.find(f=>f.kind==='shapes');for(let i=0;i<3;i++){const cx=f.x*T+8+i*T,cy=f.y*T+8+Math.sin(t*2+i)*2;ctx.fillStyle=['#e03131','#1c7ed6','#ffd21f'][i];ctx.beginPath();if(i===0){ctx.moveTo(cx,cy-5);ctx.lineTo(cx-5,cy+4);ctx.lineTo(cx+5,cy+4);}else if(i===1)ctx.rect(cx-4,cy-4,8,8);else ctx.arc(cx,cy,4.5,0,7);ctx.fill();}}
    // máquina 0ms
    {const f=furn.find(f=>f.kind==='rig');for(let i=0;i<4;i++){const ph=((t*0.7+i*0.37)%1.6);const fall=Math.min(1,ph/0.6);const y=f.y*T+4+fall*fall*(f.h*T-12);const x=f.x*T+7+i*13;const sq=ph>0.6&&ph<0.9;
      ctx.fillStyle=['#ff6b6b','#ffd21f','#4dabf7','#69db7c'][i];if(sq){ctx.fillRect(x-4,f.y*T+f.h*T-6,8,3);}else ctx.fillRect(x-2.5,y,5,5);}
      const ms=Math.floor((t*1000)%1000);ctx.fillStyle='#111';ctx.fillRect(f.x*T+f.w*T/2-11,f.y*T-6,22,7);txt(String(ms).padStart(3,'0')+'ms',f.x*T+f.w*T/2,f.y*T-2.4,4.6,ms<60?'#69db7c':'#ff6b6b');}
    // tripé: luz REC
    {const f=furn.find(f=>f.kind==='tripod');if(Math.floor(t*2)%2){ctx.fillStyle='#ff3b3b';ctx.fillRect(f.x*T+11,f.y*T+2,2,2);}}
    // portas das redes
    for(const d of NDOOR){const v=D.net7[d.k]||0;const pend=D.today.some(p=>p.state==='pend'&&p.nets.some(n=>n.k===d.k&&n.s!=='done'));const X=d.x*T,Y=30*T;
      ctx.fillStyle='#1d1838';ctx.fillRect(X-2,Y-14,T*2+4,10);txt(`${d.k} ${short(v)}`,X+T,Y-8.8,5,'#ffffff');
      if((d.flash||0)>0||pend){ctx.fillStyle=(d.flash>0?Math.floor(t*10)%2:Math.floor(t*2)%2)?'#ffd21f':'rgba(255,210,31,.25)';ctx.fillRect(X,Y-2,T*2,2);}}
    // sala dos comentários: balões
    {const n=ST.com.filter(x=>x.estado==='pendente').length;const X=44*T,Y=6*T;for(let i=0;i<Math.min(3,Math.max(1,n));i++){const yy=Y+i*9+Math.sin(t*2+i)*1.5;ctx.fillStyle=['#ffffff','#ffd21f','#4dabf7'][i];ctx.fillRect(X+i*4,yy,14,7);ctx.fillRect(X+i*4+2,yy+7,3,2);ctx.fillStyle='#1d1838';ctx.fillRect(X+i*4+3,yy+3,2,1);ctx.fillRect(X+i*4+6,yy+3,2,1);ctx.fillRect(X+i*4+9,yy+3,2,1);}
      if(n){ctx.fillStyle='#e03131';ctx.beginPath();ctx.arc(X+20,Y-1,4.5,0,7);ctx.fill();txt(String(n),X+20,Y-0.6,5,'#fff');}}
    // pingue-pongue
    {const a=SPOTS.filter(s=>s.a==='pong'&&s.taken);if(a.length===2){const f=furn.find(f=>f.kind==='pong');const k=(Math.sin(t*4)+1)/2;ctx.fillStyle='#ffffff';ctx.fillRect(f.x*T+4+k*(f.w*T-8),f.y*T+f.h*T/2-3+Math.abs(Math.sin(t*8))*-4,2.5,2.5);}}}

  // ---------- noite ----------
  function nightK(){const h=lis().min/60;return h<6.5?1:h<8?1-(h-6.5)/1.5:h<17.3?0:h<19?(h-17.3)/1.7:1;}

  // ---------- ciclo ----------
  let last=performance.now();const tagH=[];
  function frame(now){requestAnimationFrame(frame);const dt=Math.min(0.05,(now-last)/1000);last=now;const t=now/1000;
    if(fly){const k=Math.min(1,(now-fly.t0)/700),e=1-Math.pow(1-k,3);cam.x=fly.f.x+(fly.t.x-fly.f.x)*e;cam.y=fly.f.y+(fly.t.y-fly.f.y)*e;cam.z=fly.f.z+(fly.t.z-fly.f.z)*e;if(k>=1)fly=null;}
    // comportamento
    for(const c of CH){c.blink-=dt;if(c.blink<0)c.blink=2+Math.random()*4;
      if(c.mode==='walk'){const p=c.path[0];if(!p){c.mode='idle';c.then&&c.then();continue;}const dx=p.x-c.x,dy=p.y-c.y,dd=Math.hypot(dx,dy);const sp=dt*(c===CAR&&c.letter?4.2:3);
        if(dd<=sp){c.x=p.x;c.y=p.y;c.path.shift();if(!c.path.length){c.mode='idle';const th=c.then;c.then=null;th&&th();}}else{c.x+=dx/dd*sp;c.y+=dy/dd*sp;}
        c.dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');c.walk+=dt;}
      else if(c.mode==='work'&&!reduce){c.next-=dt;if(c.next<0&&c!==selected)goPlay(c);}
      else if(c.mode==='play'){c.stay-=dt;if(c.stay<0)goHome(c);}}
    // conversas no lazer
    const inLaz=CH.filter(c=>c.mode==='play');for(const c of CH)if(c.talk&&(c.talk.until<t||c.mode!=='play'))c.talk=null;
    if(inLaz.length>=2&&!inLaz.some(c=>c.talk)&&Math.random()<dt*0.5){const c=inLaz[Math.floor(Math.random()*inLaz.length)];const own=Math.random()<0.5?line(c):SMALL[Math.floor(Math.random()*SMALL.length)];c.talk={s:own,until:t+3.5};}
    // desenho
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#2a2540';ctx.fillRect(0,0,W,H);
    const z=cam.z;ctx.setTransform(dpr*z,0,0,dpr*z,dpr*(W/2-cam.x*z),dpr*(H/2-cam.y*z));ctx.imageSmoothingEnabled=false;
    ctx.drawImage(map,0,0);drawLive(t);
    for(const c of [...CH].sort((a,b)=>a.y-b.y))drawChar(c,t);
    for(let i=conf.length-1;i>=0;i--){const p=conf[i];p.vy+=200*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,2,2);if(p.l<=0)conf.splice(i,1);}
    for(const d of NDOOR)if(d.flash>0)d.flash-=dt;
    // noite: escurece lá fora e acende candeeiros
    const n=nightK();if(n>0.02){ctx.fillStyle=`rgba(15,20,60,${0.45*n})`;ctx.fillRect(0,0,MW*T,4*T);ctx.fillRect(0,31*T,MW*T,2*T);ctx.fillStyle=`rgba(15,20,60,${0.12*n})`;ctx.fillRect(0,4*T,MW*T,27*T);
      ctx.globalCompositeOperation='lighter';for(const r of ROOMS){const g=ctx.createRadialGradient((r.x+r.w/2)*T,(r.y+r.h/2)*T,4,(r.x+r.w/2)*T,(r.y+r.h/2)*T,r.w*T*0.6);g.addColorStop(0,`rgba(255,200,120,${0.12*n})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(r.x*T,r.y*T,r.w*T,r.h*T);}ctx.globalCompositeOperation='source-over';}
    // etiquetas e balões no ecrã
    ctx.setTransform(dpr,0,0,dpr,0,0);const fs=Math.max(9,Math.min(12,z*4.2));ctx.textAlign='center';ctx.textBaseline='bottom';
    for(const c of CH){const sx=((c.x+0.5)*T-cam.x)*z+W/2,sy=((c.y+0.5)*T-18-cam.y)*z+H/2;if(sx<-60||sx>W+60||sy<-30||sy>H+30)continue;
      if(z>=0.9||c===selected){ctx.font=`bold ${fs}px Silkscreen, monospace`;const tw=ctx.measureText(c.name).width+8;ctx.fillStyle='rgba(20,16,40,.82)';ctx.fillRect(sx-tw/2,sy-fs-6,tw,fs+5);ctx.fillStyle='#fff';ctx.fillText(c.name,sx,sy-3);}
      if(c.talk){ctx.font=`600 ${Math.max(11,fs+1)}px Inter, sans-serif`;const s=c.talk.s.slice(0,40);const tw=ctx.measureText(s).width+14,by=sy-fs-12;ctx.fillStyle='#ffffff';ctx.strokeStyle='#1d1838';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect?ctx.roundRect(sx-tw/2,by-22,tw,22,8):ctx.rect(sx-tw/2,by-22,tw,22);ctx.fill();ctx.stroke();ctx.fillStyle='#1d1838';ctx.fillText(s,sx,by-5);}}
    if(selected&&performance.now()<sayT){const b=$('bubble');const sx=((selected.x+0.5)*T-cam.x)*z+W/2,sy=((selected.y+0.5)*T-18-cam.y)*z+H/2;b.style.transform=`translate(${sx}px,${sy-fs-10}px) translate(-50%,-100%)`;}else $('bubble').classList.remove('on');}
  requestAnimationFrame(frame);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{m.font='bold 6px Silkscreen, monospace';for(const r of ROOMS)plate(r);});
})();
