export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;const PI=Math.PI;
// cortes (pausas da voz)
const T1=4.05,T1b=7.0,T1c=8.66,T2=10.53,T3=13.37,T3b=14.86,T3c=17.06,T4=19.46;
const RED='#e5484d',GRN='#3ccf73',BLUE='#4fa3ff';
// ---------- helpers ----------
function fit(s,x,y,size,maxW,fill='#fff',lw=18){c.font=`900 ${size}px M`;const w=c.measureText(s).width;const k=Math.min(1,maxW/w);text(s,x,y,size*k,fill,lw*Math.max(.7,k));}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);c.restore();text(txt,0,4,size,fg,0);c.restore();}
function header(l1,l2,t0,t,c2=Y){if(window.nohead)return;const p=t0<=0?1:back((t-t0)/.35);if(p<=0)return;const pu=1+.025*Math.sin(t*6);c.save();c.translate(540,215);c.scale(p*pu,p*pu);fit(l1,0,-62,78,980,'#fff',18);fit(l2,0,52,118,1000,c2,22);c.restore();}
function dust(t,col='255,255,255',n=40,a=.5){for(let i=0;i<n;i++){const sp=20+(i%7)*9;const x=(i*397+31+Math.sin(t*.6+i)*30)%1080;const y=((i*211+57)-t*sp+4000)%1920;const s=2+(i%4)*1.6;c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(${col},${a*(.4+.6*Math.abs(Math.sin(t*1.3+i)))})`;c.fill();}}
function vign(a=.5){c.fillStyle=rad(540,900,300,1300,[[0,'rgba(0,0,0,0)'],[1,`rgba(0,0,0,${a})`]]);c.fillRect(0,0,1080,1920);}
function flash(t,t0){const k=t-t0;if(k<0||k>.25)return;c.fillStyle=`rgba(255,255,255,${.7*(1-k/.25)})`;c.fillRect(0,0,1080,1920);}
function cam(s,x,y,fn,rot=0){c.save();c.translate(540,900);c.rotate(rot);c.scale(s,s);c.translate(-540+x,-900+y);fn();c.restore();}
function punch(t,t0,a=.08){const k=t-t0;return k<0?1:1+a*Math.exp(-k*7);}
function sparkle(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=clamp(a,0,1);c.beginPath();for(let i=0;i<8;i++){const ang=i*PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
function burstText(x,y,s,txt,rot=0,bg='#fff',fg=RED,size=70){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*PI*2,r=i%2?118:170+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*.8);}c.closePath();fs(bg,8,NV);c.restore();
  fit(txt,0,6,size,330,fg,14);c.restore();}
// seta de ar (curva com ponta), animada
function airArrow(pts,t,col='#bfe9ff',w=16,a=1){if(a<=0)return;c.save();c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';
  c.beginPath();c.moveTo(pts[0][0],pts[0][1]);c.quadraticCurveTo(pts[1][0],pts[1][1],pts[2][0],pts[2][1]);c.lineWidth=w+10;c.strokeStyle=NV;c.stroke();c.lineWidth=w;c.strokeStyle=col;c.setLineDash([w*1.6,w*1.2]);c.lineDashOffset=-t*120;c.stroke();c.setLineDash([]);
  const [x1,y1]=pts[2],[xm,ym]=pts[1];const ang=Math.atan2(y1-ym,x1-xm);c.translate(x1,y1);c.rotate(ang);c.beginPath();c.moveTo(18,0);c.lineTo(-22,-24);c.lineTo(-22,24);c.closePath();fs(col,7,NV);c.restore();}
// ---------- cara (de frente) com boca aberta/fechada e rosto que estica ----------
function face(x,y,r,t,o={}){const L=o.long||0;c.save();c.translate(x,y);c.scale(1-L*.12,1+L*.32);
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=36;c.shadowOffsetY=14;c.beginPath();
  // queixo mais estreito quando estica
  c.moveTo(0,-r);c.bezierCurveTo(r*.56,-r,r,-r*.56,r,0);c.bezierCurveTo(r,r*(.56+L*.1),r*(.56-L*.2),r,0,r);c.bezierCurveTo(-r*(.56-L*.2),r,-r,r*(.56+L*.1),-r,0);c.bezierCurveTo(-r,-r*.56,-r*.56,-r,0,-r);c.closePath();
  fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),9,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.58,r*.26,r*.12,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const sleep=o.sleep;for(const ex of [-.34,.34]){const ey=-r*.25;
    if(sleep){c.beginPath();c.arc(ex*r,ey,r*.11,.2,PI-.2);c.lineWidth=r*.05;c.strokeStyle=NV;c.lineCap='round';c.stroke();continue;}
    c.beginPath();c.ellipse(ex*r,ey,r*.13,r*.17,0,0,7);fs('#fff',r*.035,NV);c.beginPath();c.arc(ex*r+(o.look||0)*r*.05,ey+r*.04,r*.07,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ex*r+(o.look||0)*r*.05+r*.025,ey,r*.022,0,7);c.fillStyle='#fff';c.fill();}
  if(o.brow){c.lineWidth=r*.05;c.strokeStyle=NV;c.lineCap='round';c.beginPath();c.moveTo(-r*.52,-r*.55);c.lineTo(-r*.2,-r*.62);c.moveTo(r*.52,-r*.55);c.lineTo(r*.2,-r*.62);c.stroke();}
  for(const ex of [-.6,.6]){c.beginPath();c.ellipse(ex*r,r*.1,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}
  // nariz
  c.beginPath();c.ellipse(0,r*.05,r*.13,r*.1,0,0,7);fs(rad(-r*.04,0,2,r*.16,[[0,'#ffc36b'],[1,'#e8920a']]),r*.03,NV);for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*r*.05,r*.09,r*.025,r*.017,0,0,7);c.fillStyle='rgba(122,60,10,.6)';c.fill();}
  // boca: open 0..1
  const op=o.open??1;const my=r*.45;
  if(op>.05){c.beginPath();c.ellipse(0,my,r*.2,r*.2*op+2,0,0,7);fs('#7a2335',r*.035,NV);c.save();c.clip();c.beginPath();c.ellipse(0,my+r*.17*op,r*.13,r*.08,0,0,7);c.fillStyle='#ff7f94';c.fill();c.restore();
    c.beginPath();c.roundRect(-r*.12,my-r*.2*op,r*.24,r*.06,6);c.fillStyle='#fff';if(op>.4)c.fill();}
  else{c.beginPath();c.arc(0,my-r*.12,r*.2,.35,PI-.35);c.lineWidth=r*.05;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  if(o.drool){c.beginPath();c.moveTo(r*.12,my+r*.16);c.quadraticCurveTo(r*.15,my+r*.3+Math.sin(t*3)*6,r*.13,my+r*.36);c.lineWidth=r*.03;c.strokeStyle='#bfe9ff';c.stroke();}
  c.restore();}
// ---------- cabeça de perfil em corte (céu da boca, língua, queixo) ----------
function profile(x,y,s,t,o={}){const L=o.long||0,ch=o.chin||0,tg=o.tongue||0;c.save();c.translate(x,y);c.scale(s,s);
  // contorno da cabeça (olha para a direita)
  const chinX=200-ch*70,chinY=330+L*120;
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();
  c.moveTo(-230,-60);c.bezierCurveTo(-240,-330,40,-400,170,-250);c.bezierCurveTo(205,-200,215,-140,215,-90);   // testa
  c.lineTo(290,10);c.lineTo(222,40);                                                                                   // nariz
  c.lineTo(230,110+L*30);c.lineTo(205,150+L*40);c.lineTo(232,185+L*55);                                              // lábios
  c.bezierCurveTo(236,240+L*80,chinX+20,chinY-20,chinX,chinY);                                                        // queixo
  c.bezierCurveTo(chinX-60,chinY+30,-10,chinY+10,-40,280+L*90);c.lineTo(-60,470);c.lineTo(-200,470);c.lineTo(-170,200);c.bezierCurveTo(-240,120,-240,40,-230,-60);c.closePath();
  fs(lin(0,-380,0,470,[[0,'#ffd9c2'],[.6,'#f5b58f'],[1,'#e0936a']]),9,NV);c.restore();
  // orelha e olho
  c.beginPath();c.ellipse(-70,-20,40,62,0,0,7);fs('#f0a47a',7,NV);c.beginPath();c.ellipse(125,-120,18,22,0,0,7);c.fillStyle=NV;c.fill();
  // cavidade da boca (corte)
  c.save();c.beginPath();c.moveTo(60,60);c.quadraticCurveTo(150,40,215,120+L*35);c.lineTo(205,170+L*45);c.quadraticCurveTo(130,250+L*70+ch*10,40,220+L*60);c.quadraticCurveTo(10,140,60,60);c.closePath();fs('#7a2335',6,NV);c.clip();
  // céu da boca (palato) — linha
  c.beginPath();c.moveTo(40,70);c.quadraticCurveTo(140,45,220,118);c.lineWidth=14;c.strokeStyle='#ffb3c0';c.stroke();
  // língua: tg=0 encostada em cima; tg=1 lá embaixo
  const ty=85+tg*(110+L*40);c.beginPath();c.ellipse(120,ty+18,105,38,-.08+tg*.12,0,7);fs(lin(0,ty-20,0,ty+56,[[0,'#ff8fa3'],[1,'#e05a75']]),6,NV);c.beginPath();c.ellipse(95,ty+8,40,10,-.1,0,7);c.fillStyle='rgba(255,255,255,.35)';c.fill();
  c.restore();
  c.restore();}
function sceneA(t){// 0–T1: gancho — rosto a esticar, boca aberta, ar a entrar pela boca
  K.sunburst(540,840,'#7a1f3d','#8f2648',t*.15,22);dust(t,'255,210,230',30,.5);
  const L=.5+.5*Math.sin(t*2.6-1.2);
  cam(1.0+.05*ease(t/4),0,0,()=>{
    face(540,860,300,t,{long:L,open:1,brow:1,look:Math.sin(t*3)});
    airArrow([[960,700],[830,900],[640,1010]],t,'#bfe9ff',18,1);airArrow([[120,760],[240,960],[440,1010]],t+.3,'#bfe9ff',18,1);
    // antes / depois a pulsar
    burstText(820,520,.8*back((t-.2)/.3)*(1+.05*Math.sin(t*8)),'MUDA?!',.12,'#fff',RED,80);
    // régua vertical a medir o rosto
    c.save();c.globalAlpha=clamp((t-.6)*2,0,1);const top=860-300*(1+L*.32),bot=860+300*(1+L*.32);c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(150,top);c.lineTo(150,bot);c.moveTo(120,top);c.lineTo(180,top);c.moveTo(120,bot);c.lineTo(180,bot);c.stroke();c.restore();
  });
  header('RESPIRA PELA BOCA?','O ROSTO PODE MUDAR!',0,t,'#ffd1e0');}
function sceneB(t){// T1–T2: língua lá embaixo, rosto mais comprido, queixo para trás
  const k=t-T1;c.fillStyle=lin(0,0,0,1920,[[0,'#123a6b'],[1,'#0a2244']]);c.fillRect(0,0,1080,1920);
  c.save();c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=2;for(let x=0;x<=1080;x+=54){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<=1920;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.restore();vign();
  const tg=ease(clamp((k-.9)/1.0,0,1)),L=ease(clamp((t-T1b)/1.2,0,1)),ch=ease(clamp((t-T1c)/.9,0,1));
  cam(punch(t,T1)*(t>=T1b?punch(t,T1b):1)*(t>=T1c?punch(t,T1c):1),0,0,()=>{
    // fantasma do rosto normal (antes)
    if(L>0){c.save();c.globalAlpha=.25;profile(470,880,1.25,t,{});c.restore();}
    profile(470,880,1.25,t,{tongue:tg,long:L,chin:ch});
    // seta da língua a descer
    if(k>.6&&t<T1b){c.save();c.globalAlpha=clamp((k-.6)*3,0,1);c.strokeStyle=Y;c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(860,860);c.lineTo(860,1060);c.stroke();c.beginPath();c.moveTo(825,1020);c.lineTo(860,1070);c.lineTo(895,1020);c.stroke();c.restore();
      pill(840,780,back((k-.7)/.3),'LÍNGUA',Y,NV,46,-.05);}
    // régua do comprimento
    if(t>=T1b){const q=clamp((t-T1b)*3,0,1);c.save();c.globalAlpha=q;c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';const top=880-1.25*380,bot=880+1.25*(330+L*120);c.beginPath();c.moveTo(900,top);c.lineTo(900,bot);c.moveTo(870,top);c.lineTo(930,top);c.moveTo(870,bot);c.lineTo(930,bot);c.stroke();c.restore();
      pill(900,(top+bot)/2,back((t-T1b-.2)/.3),'+ COMPRIDO',Y,NV,40,-1.57*0);}
    // seta no queixo a recuar
    if(t>=T1c){const q=back((t-T1c)/.3);c.save();c.translate(470+1.25*(200-ch*70)+60,880+1.25*(330+L*120));c.scale(q,q);c.strokeStyle=RED;c.lineWidth=14;c.lineCap='round';c.beginPath();c.moveTo(120,0);c.lineTo(0,0);c.moveTo(40,-40);c.lineTo(0,0);c.lineTo(40,40);c.stroke();c.restore();
      pill(640,1480,back((t-T1c-.15)/.3),'QUEIXO PRA TRÁS',RED,'#fff',46,.03);}
  });
  if(t<T1b)header('A LÍNGUA FICA','LÁ EMBAIXO…',T1,t,'#9cc4ff');else if(t<T1c)header('O ROSTO CRESCE','MAIS COMPRIDO',T1b,t,Y);else header('COM O QUEIXO','PRA TRÁS!',T1c,t,'#ff9aa8');
  flash(t,T1);flash(t,T1b);flash(t,T1c);}
function sceneC(t){// T2–T3: fecha a boca e respira pelo nariz (faz agora)
  const k=t-T2;K.sunburst(540,860,'#0f7a55','#129163',t*.15,22);dust(t,'210,255,235',30,.5);
  const op=1-ease(clamp((k-.35)/.25,0,1));const shut=k>.6;
  cam(punch(t,T2)*(shut?punch(t,T2+.6,.06):1),0,0,()=>{
    face(540,880,300,t,{open:op,look:0});
    if(!shut)airArrow([[960,720],[830,930],[640,1020]],t,'#bfe9ff',18,1-clamp((k-.3)*4,0,1));
    if(shut){const a=clamp((k-.7)*3,0,1);airArrow([[950,640],[760,700],[600,880]],t,'#8ff0c4',18,a);airArrow([[130,640],[320,700],[480,880]],t+.4,'#8ff0c4',18,a);
      burstText(540,1330,back((k-.6)/.25),'CLIC!',-.06,'#fff',GRN,80);}
    pill(540,480,back((k-.1)/.3)*(1+.04*Math.sin(t*8)),'FAZ AGORA 👃',Y,NV,54,-.03);
  });
  header('FECHA A BOCA','E RESPIRA PELO NARIZ',T2,t,'#c8ffe6');flash(t,T2);}
// dentro do nariz: túnel com pelinhos, poeira presa, termómetro, gotas, pulmão
function sceneD(t){const k=t-T3;c.fillStyle=lin(0,0,0,1920,[[0,'#5a1630'],[1,'#2a0a18']]);c.fillRect(0,0,1080,1920);
  cam(punch(t,T3)*(t>=T3b?punch(t,T3b):1)*(t>=T3c?punch(t,T3c):1),0,0,()=>{
    // túnel (parede rosada) da esquerda para a direita
    c.beginPath();c.moveTo(-20,640);c.bezierCurveTo(300,560,700,620,1100,700);c.lineTo(1100,1180);c.bezierCurveTo(700,1100,300,1160,-20,1100);c.closePath();fs(lin(0,600,0,1180,[[0,'#ff9fb2'],[.5,'#ffc4cf'],[1,'#ff8aa2']]),9,NV);
    // muco brilhante
    c.save();c.globalAlpha=.35;c.fillStyle='#fff';for(let i=0;i<8;i++){c.beginPath();c.ellipse(80+i*130,700+Math.sin(i)*20,40,10,0,0,7);c.fill();}c.restore();
    // pelinhos em cima e em baixo
    c.lineCap='round';for(let i=0;i<24;i++){const x=20+i*45;const sw=Math.sin(t*4+i)*10;c.strokeStyle='#5a2b1a';c.lineWidth=7;
      c.beginPath();c.moveTo(x,660+Math.sin(i*1.3)*10+(x>500?(x-500)*.1:0));c.quadraticCurveTo(x+10+sw,760,x+sw*1.5,820);c.stroke();
      c.beginPath();c.moveTo(x,1110-(x>500?(x-500)*.08:0));c.quadraticCurveTo(x+10-sw,1010,x-sw*1.5,950);c.stroke();}
    // ar a passar (setas) e poeira: entra pela esquerda, fica presa nos pelos
    airArrow([[40,890],[500,860],[980,900]],t,'#bfe9ff',16,1);
    for(let i=0;i<14;i++){const ph=((t*.6+i*.137)%1);const x=40+ph*700,y=800+((i*53)%220);const caught=ph>.45+((i*7)%5)*.07;const xx=caught?40+(.45+((i*7)%5)*.07)*700:x;
      c.beginPath();c.arc(xx,y+(caught?Math.sin(t*6+i)*3:0),14+(i%3)*4,0,7);fs(rad(xx-4,y-4,2,22,[[0,'#d9c7a8'],[1,'#8a6d4a']]),5,NV);}
    if(t>=T3c){const q=back((t-T3c)/.3);c.save();c.translate(330,1330);c.scale(q,q);c.beginPath();c.roundRect(-190,-55,380,110,55);fs('#fff',7,NV);text('POEIRA PRESA',0,4,44,NV,0);c.restore();}
    // termómetro + gotas (esquenta e umedece)
    if(t>=T3b){const q=back((t-T3b)/.3);c.save();c.translate(870,1360);c.scale(q,q);c.beginPath();c.roundRect(-26,-200,52,220,26);fs('#fff',7,NV);const lv=ease(clamp((t-T3b)/1.2,0,1));c.beginPath();c.roundRect(-14,10-160*lv-30,28,160*lv+30,14);c.fillStyle=RED;c.fill();c.beginPath();c.arc(0,40,46,0,7);fs(RED,7,NV);c.restore();
      for(let i=0;i<4;i++){const dq=back((t-T3b-.6-i*.15)/.3);if(dq<=0)continue;c.save();c.translate(640+i*70,1300+Math.sin(t*3+i)*8);c.scale(dq,dq);c.beginPath();c.moveTo(0,-34);c.bezierCurveTo(22,-6,26,10,0,26);c.bezierCurveTo(-26,10,-22,-6,0,-34);fs('#7fd3ff',6,NV);c.restore();}}
    // pulmão à direita recebe ar limpo
    if(t>=T3c){const q=back((t-T3c-.5)/.35);c.save();c.translate(985,930);c.scale(q*.75,q*.75);for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*80,0,70,120,sd*.15,0,7);fs(rad(sd*60,-40,10,140,[[0,'#ffc0cc'],[1,'#f06b86']]),7,NV);}c.restore();
      sparkle(1000,780,30,Math.sin(t*6)*.5+.5);}
  });
  if(t<T3b)header('O SEU NARIZ','É UM FILTRO!',T3,t,Y);else if(t<T3c)header('ESQUENTA O AR','E DEIXA ÚMIDO',T3b,t,'#ffb3b3');else header('E PRENDE','A POEIRA!',T3c,t,'#e8d9b8');
  flash(t,T3);}
function sceneE(t){// T4–fim: você dorme de boca aberta?
  const k=t-T4;c.fillStyle=lin(0,0,0,1920,[[0,'#1a1d4f'],[1,'#0b0d2a']]);c.fillRect(0,0,1080,1920);
  for(let i=0;i<40;i++){c.beginPath();c.arc((i*277)%1080,(i*151)%1100,2+(i%3),0,7);c.fillStyle=`rgba(255,255,255,${.3+.5*Math.abs(Math.sin(t*2+i))})`;c.fill();}
  c.beginPath();c.arc(860,330,70,0,7);c.fillStyle='#fff4c9';c.fill();c.beginPath();c.arc(830,310,62,0,7);c.fillStyle='#1a1d4f';c.fill();
  cam(punch(t,T4),0,0,()=>{
    // almofada
    c.beginPath();c.roundRect(150,980,780,260,120);fs(lin(0,980,0,1240,[[0,'#ffffff'],[1,'#c9d3ff']]),8,NV);
    face(540,930,240,t,{open:.8+.15*Math.sin(t*2),sleep:1,drool:1});
    for(let i=0;i<3;i++){const ph=(t*.7+i*.33)%1;text('Z',760+ph*120+i*10,700-ph*220,60+i*20,'#fff',12,NV);}
  });
  header('VOCÊ DORME DE','BOCA ABERTA?',T4,t,'#c6c9ff');
  if(k>.05)pill(540,470,back((k-.05)/.3),'COMENTA ↓',RED,'#fff',46,-.03);
  const pu=1+.05*Math.sin(t*8);pill(300,1380,back((k-.9)/.3)*pu,'SIM',GRN,'#fff',70,-.05);pill(780,1380,back((k-1.2)/.3)*pu,'NÃO',RED,'#fff',70,.05);
  flash(t,T4);}
function frame(t){if(t<T1)return sceneA(t);if(t<T2)return sceneB(t);if(t<T3)return sceneC(t);if(t<T4)return sceneD(t);sceneE(t);}
return {frame};};
