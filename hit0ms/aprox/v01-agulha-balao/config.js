// Hit0Ms "aprox" #01 — AGULHA → BALÃO hiper-realista. A agulha aproxima-se devagar; pausa no frame exato do toque (0ms).
// No frame do toque aparece a palavra secreta impressa no balão. Depois rebenta em pedaços de borracha.
export default (K)=>{const {c,W,H,lin,rad,ell,ease}=K;const PI=Math.PI;
const attempts=[
  {word:'POP',   base:'#e0182d',hi:'#ff8a8f',dk:'#5c0610',r:215},
  {word:'AIR',   base:'#1f6fe0',hi:'#8cc2ff',dk:'#071f55',r:225},
  {word:'SNAP',  base:'#11a35a',hi:'#8af0b8',dk:'#03381c',r:235},
  {word:'LEGEND',base:'#d9a514',hi:'#fff0a3',dk:'#5a3a00',r:255,gold:true}];
const CX=500,CY=850,FLOOR=1270;
// ---------- fundo de estúdio (fixo) ----------
const bg=document.createElement('canvas');bg.width=W;bg.height=H;{const g=bg.getContext('2d');
  let gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0c1220');gr.addColorStop(.55,'#17233a');gr.addColorStop(.66,'#1b2a44');gr.addColorStop(.67,'#121a2b');gr.addColorStop(1,'#05070c');g.fillStyle=gr;g.fillRect(0,0,W,H);
  gr=g.createRadialGradient(CX,CY-40,40,CX,CY,760);gr.addColorStop(0,'rgba(120,170,255,.28)');gr.addColorStop(.5,'rgba(70,110,200,.10)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);
  // chão brilhante (curva do fundo infinito)
  gr=g.createLinearGradient(0,FLOOR-60,0,FLOOR+260);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.3,'rgba(160,190,255,.08)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,FLOOR-60,W,320);
  // grão fino
  const id=g.getImageData(0,0,W,H),d=id.data;let s=7;for(let i=0;i<d.length;i+=4){s=(s*16807)%2147483647;const n=(s/2147483647-.5)*7;d[i]+=n;d[i+1]+=n;d[i+2]+=n;}g.putImageData(id,0,0);
  g.save();g.textAlign='center';g.font='400 64px Anton';g.fillStyle='rgba(255,255,255,.10)';g.fillText('@hit0ms',CX+20,FLOOR+150);g.restore();}
// ---------- balão ----------
function shape(r,sx=1){const rx=r*sx,ry=r*1.16;c.beginPath();c.moveTo(CX,CY-ry);
  c.bezierCurveTo(CX+rx*1.02,CY-ry,CX+rx*1.08,CY+ry*.35,CX+rx*.32,CY+ry*.86);c.quadraticCurveTo(CX+rx*.1,CY+ry*1.0,CX,CY+ry*1.02);
  c.quadraticCurveTo(CX-rx*.1,CY+ry*1.0,CX-rx*.32,CY+ry*.86);c.bezierCurveTo(CX-rx*1.08,CY+ry*.35,CX-rx*1.02,CY-ry,CX,CY-ry);c.closePath();}
function stringPath(r,t,drop=0){const y0=CY+r*1.16*1.02+26;c.beginPath();c.moveTo(CX,y0+drop);for(let i=1;i<=24;i++){const v=i/24;c.lineTo(CX+Math.sin(v*7+t*2)*16*v+v*20,y0+drop+v*(FLOOR-y0-20));}
  c.lineWidth=2.4;c.strokeStyle='rgba(240,240,255,.75)';c.stroke();}
function balloon(B,o={}){const r=B.r*(o.s||1);const t=o.t||0;
  // sombra no chão
  c.save();c.filter='blur(18px)';ell(CX+10,FLOOR+8,r*.8,26);c.fillStyle='rgba(0,0,0,.55)';c.fill();c.restore();
  stringPath(r,t);
  // nó
  const ky=CY+r*1.16*1.02;c.beginPath();c.moveTo(CX-14,ky+2);c.quadraticCurveTo(CX,ky-6,CX+14,ky+2);c.lineTo(CX+9,ky+22);c.quadraticCurveTo(CX,ky+30,CX-9,ky+22);c.closePath();c.fillStyle=lin(CX-14,0,CX+14,0,[[0,B.dk],[.45,B.base],[1,B.dk]]);c.fill();
  ell(CX,ky+24,11,5);c.fillStyle=B.dk;c.fill();
  // corpo: luz de cima à esquerda
  shape(r,o.sx||1);c.save();c.clip();
  c.fillStyle=rad(CX-r*.42,CY-r*.55,r*.05,r*1.55,[[0,B.hi],[.32,B.base],[.8,B.dk],[1,B.dk]]);c.fillRect(CX-r*1.4,CY-r*1.5,r*2.8,r*3);
  // luz que atravessa a borracha (translúcido) — brilho interno em baixo à direita
  c.globalCompositeOperation='lighter';c.fillStyle=rad(CX+r*.3,CY+r*.55,0,r*.75,[[0,B.gold?'rgba(255,220,120,.55)':'rgba(255,255,255,.18)'],[1,'rgba(0,0,0,0)']]);c.fillRect(CX-r*1.4,CY-r*1.5,r*2.8,r*3);
  // luz de recorte (rim) à direita
  c.globalCompositeOperation='source-over';c.lineWidth=r*.09;c.strokeStyle=rad(CX+r*1.1,CY-r*.1,0,r*.9,[[0,'rgba(180,210,255,.55)'],[1,'rgba(180,210,255,0)']]);shape(r*.985,o.sx||1);c.stroke();
  // palavra secreta impressa no balão (só no frame do toque)
  if(o.word){c.save();c.translate(CX-r*.05,CY+r*.05);c.rotate(-.06);c.scale(1,1.08);c.textAlign='center';c.textBaseline='middle';c.font=`400 ${Math.round(r*(B.word.length>4?.42:.62))}px Anton`;
    c.fillStyle='rgba(255,255,255,.92)';c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=6;c.fillText(B.word,0,0);c.restore();}
  // reflexo da janela do estúdio (especular nítido)
  c.save();c.translate(CX-r*.46,CY-r*.6);c.rotate(-.5);c.filter='blur(3px)';c.beginPath();c.roundRect(-r*.2,-r*.12,r*.34,r*.26,r*.08);c.fillStyle='rgba(255,255,255,.92)';c.fill();
  c.beginPath();c.roundRect(r*.18,-r*.1,r*.1,r*.22,r*.04);c.fillStyle='rgba(255,255,255,.55)';c.fill();c.restore();
  c.save();c.filter='blur(14px)';ell(CX-r*.35,CY-r*.42,r*.38,r*.26,-.6);c.fillStyle='rgba(255,255,255,.22)';c.fill();c.restore();
  ell(CX+r*.42,CY+r*.62,r*.05,r*.03,-.6);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  // covinha onde a agulha toca
  if(o.dent){const [px,py]=o.dent;c.fillStyle=rad(px-6,py,0,40,[[0,'rgba(0,0,0,.45)'],[1,'rgba(0,0,0,0)']]);ell(px-10,py,36,26);c.fill();c.fillStyle=rad(px-24,py-10,0,18,[[0,'rgba(255,255,255,.45)'],[1,'rgba(255,255,255,0)']]);ell(px-24,py-10,18,12);c.fill();}
  c.restore();
  // contorno subtil
  shape(r,o.sx||1);c.lineWidth=2;c.strokeStyle='rgba(0,0,0,.35)';c.stroke();}
// ponto do toque: lado direito do balão, um pouco acima do centro
const ANG=-0.32;const DIR=[Math.cos(ANG),Math.sin(ANG)];
const CP={};function contactPt(B){if(CP[B.r])return CP[B.r];const r=B.r,y=CY-r*.18;shape(r);let x=CX+r*1.3;while(x>CX&&!c.isPointInPath(x,y))x-=1;return CP[B.r]=[x+1,y];}
// ---------- agulha ----------
function needle(tx,ty){const L=640,th=20;c.save();c.translate(tx,ty);c.rotate(ANG);
  // linha vermelha a sair do buraco
  c.beginPath();c.moveTo(L-30,0);c.bezierCurveTo(L+60,-30,L+120,80,L+40,190);c.bezierCurveTo(L,250,L+120,320,L+90,420);c.lineWidth=4;c.strokeStyle='#c4142b';c.stroke();c.lineWidth=1.5;c.strokeStyle='rgba(255,140,150,.6)';c.stroke();
  // sombra suave
  c.save();c.filter='blur(10px)';c.beginPath();c.moveTo(20,26);c.lineTo(L,30);c.lineTo(L,44);c.lineTo(40,36);c.fillStyle='rgba(0,0,0,.35)';c.fill();c.restore();
  // corpo de aço
  c.beginPath();c.moveTo(0,0);c.lineTo(120,-th/2);c.lineTo(L-18,-th/2);c.quadraticCurveTo(L,-th/2,L,0);c.quadraticCurveTo(L,th/2,L-18,th/2);c.lineTo(120,th/2);c.closePath();
  c.fillStyle=lin(0,-th/2,0,th/2,[[0,'#5d6470'],[.22,'#f5f8fc'],[.42,'#aab3c0'],[.7,'#4b525d'],[1,'#20242b']]);c.fill();
  // buraco
  c.beginPath();c.roundRect(L-72,-4,48,8,4);c.fillStyle='#0b0d12';c.fill();
  // brilho
  c.beginPath();c.moveTo(14,-1);c.lineTo(L-30,-th/2+3);c.lineWidth=1.6;c.strokeStyle='rgba(255,255,255,.85)';c.stroke();
  c.restore();}
// ---------- pedaços de borracha ----------
function shreds(B,t){K.setSeed(B.r*31+B.word.length);const r=B.r;
  // flash + onda de ar
  if(t<.18){const g=t/.18;c.save();c.globalAlpha=(1-g);c.fillStyle=rad(CX,CY,0,r*1.6,[[0,'rgba(255,255,255,.95)'],[.4,B.gold?'rgba(255,230,140,.6)':'rgba(255,255,255,.35)'],[1,'rgba(255,255,255,0)']]);c.fillRect(0,0,W,H);
    c.lineWidth=10*(1-g);c.strokeStyle='rgba(255,255,255,.8)';ell(CX,CY,r*(1+g*1.6),r*1.16*(1+g*1.6));c.stroke();c.restore();}
  for(let i=0;i<34;i++){const a=K.rnd()*PI*2,sp=(700+K.rnd()*1500)*(r/220),vx=Math.cos(a)*sp,vy=Math.sin(a)*sp*.8-300,vr=(K.rnd()-.5)*24;const sx=CX+Math.cos(a)*r*.9,sy=CY+Math.sin(a)*r*1.05;
    const drag=Math.exp(-t*2.6),x=sx+vx*(1-drag)/2.6,y=Math.min(FLOOR-6,sy+vy*(1-drag)/2.6+900*t*t);const sz=(18+K.rnd()*46)*(r/220);
    c.save();c.translate(x,y);c.rotate(vr*t+a);c.globalAlpha=Math.min(1,Math.max(0,1.4-t*.9));c.beginPath();c.moveTo(-sz,-sz*.2);c.quadraticCurveTo(-sz*.2,-sz*.7,sz*.8,-sz*.3);c.quadraticCurveTo(sz*.5,sz*.1,sz,sz*.4);c.quadraticCurveTo(0,sz*.25,-sz*.7,sz*.5);c.closePath();
    c.fillStyle=lin(-sz,-sz,sz,sz,[[0,B.hi],[.45,B.base],[1,B.dk]]);c.fill();c.restore();}
  // nó com o fio a cair
  const ky=CY+r*1.16*1.02,fy=Math.min(FLOOR-30,ky+900*t*t*.7);ell(CX,fy+18,12,10);c.fillStyle=B.dk;c.fill();
  c.beginPath();c.moveTo(CX,fy+26);for(let i=1;i<=12;i++){const v=i/12;c.lineTo(CX+Math.sin(v*6+t*8)*20*v,Math.min(FLOOR,fy+26+v*(FLOOR-fy-26)));}c.lineWidth=2.4;c.strokeStyle='rgba(240,240,255,.7)';c.stroke();}
// ---------- cena ----------
function draw(st){const B=attempts[st.i];c.drawImage(bg,0,0);const [cx,cy]=contactPt(B);const D0=470;const T=st.f/st.fps;
  if(st.phase==='after'){const sh=st.k<8?(8-st.k)/8:0;c.translate(Math.sin(st.f*7.1)*14*sh,Math.cos(st.f*9.3)*14*sh);shreds(B,st.t);const back=Math.min(1,st.t*1.2);needle(cx+DIR[0]*(30+back*120),cy+DIR[1]*(30+back*120));return;}
  if(st.phase==='next'){const N=attempts[st.i];const s=.55+.45*ease(st.w);balloon(N,{s,t:T});const [nx,ny]=contactPt(N);needle(nx+DIR[0]*D0,ny+DIR[1]*D0);return;}
  const d=D0*(1-st.u);const contact=st.phase==='contact';
  // tremor de respiração do balão (vivo)
  const sx=1+Math.sin(T*2.1)*.006;
  balloon(B,{t:T,sx,word:contact,dent:contact?[cx,cy]:null});
  if(st.phase==='rewind'&&st.rw<.25){c.fillStyle=`rgba(255,255,255,${.5*(1-st.rw/.25)})`;c.fillRect(0,0,W,H);}
  needle(cx+DIR[0]*d,cy+DIR[1]*d);}
return {tag:'REFLEX TEST · LEVEL UP',h2:'BEFORE IT POPS 🎈',ask:'Stop it at <b style="color:#d6141f">0ms</b> &mdash; the secret word only shows for 1 frame 👀',attempts,draw};};
