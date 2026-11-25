export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// cortes (pausas da voz)
const T1=3.30,T2=5.70,T3=9.36,T3b=13.2,T4=15.58;
const RED='#e5484d',GRN='#3ccf73';
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
function sparkle(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=clamp(a,0,1);c.beginPath();for(let i=0;i<8;i++){const ang=i*Math.PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
const skin=(y0,y1)=>lin(0,y0,0,y1,[[0,'#ffd9c2'],[.6,'#f5b58f'],[1,'#e0936a']]);
// ---------- cara com nariz ----------
function nose(x,y,s,a=1){if(a<=0)return;c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=a;
  c.beginPath();c.ellipse(0,0,56,44,0,0,7);fs(rad(-16,-16,4,70,[[0,'#ffb0a0'],[.6,'#f27e6c'],[1,'#d65a4a']]),7,NV);
  c.beginPath();c.ellipse(-18,-18,16,9,-.5,0,7);c.fillStyle='rgba(255,255,255,.65)';c.fill();
  for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*20,18,9,6,0,0,7);c.fillStyle='rgba(122,35,53,.55)';c.fill();}c.restore();}
function face(x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate(o.shake?Math.sin(t*22)*.08*o.shake:(o.rot||0));
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=36;c.shadowOffsetY=14;c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),9,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.58,r*.26,r*.12,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const lk=o.look||0,ly=o.lookY||0,wide=o.wide||0;for(const ex of [-.34,.34]){const ey=-r*.22;
    if(o.wink&&ex>0){c.beginPath();c.arc(ex*r,ey,r*.12,Math.PI+.3,-.3);c.lineWidth=r*.06;c.strokeStyle=NV;c.lineCap='round';c.stroke();continue;}
    c.beginPath();c.ellipse(ex*r,ey,r*(.13+wide*.04),r*(.17+wide*.05),0,0,7);fs('#fff',r*.035,NV);c.beginPath();c.arc(ex*r+lk*r*.05,ey+r*.04+ly*r*.06,r*.07,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ex*r+lk*r*.05+r*.025,ey+ly*r*.06,r*.022,0,7);c.fillStyle='#fff';c.fill();}
  if(o.brow){c.lineWidth=r*.055;c.strokeStyle=NV;c.lineCap='round';c.beginPath();c.moveTo(-r*.5,-r*.5);c.lineTo(-r*.2,-r*.6);c.moveTo(r*.5,-r*.5);c.lineTo(r*.2,-r*.6);c.stroke();}
  for(const ex of [-.6,.6]){c.beginPath();c.ellipse(ex*r,r*.14,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}
  c.beginPath();if(o.mouth==='o'){c.ellipse(0,r*.52,r*.1,r*.13,0,0,7);fs('#7a2335',r*.035,NV);}else{c.arc(0,r*.38,r*.26,.3,Math.PI-.3);c.lineWidth=r*.055;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  const ns=r/240;const d=o.dbl||0;
  if(d>0){nose(-d*r*.32,r*.12,ns,.95);nose(d*r*.32,r*.12,ns,.95);}else nose(0,r*.12,ns,1);
  c.restore();}
// ---------- mão com dedos cruzados (aponta para cima; pontas perto de (0,0)) ----------
function hand(x,y,s,rot,o={}){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);const cross=o.cross??1;
  // manga
  c.beginPath();c.roundRect(-150,520,300,420,30);fs(lin(-150,0,150,0,[[0,'#2a6fd1'],[.5,'#4fa3ff'],[1,'#2a6fd1']]),8,NV);
  c.beginPath();c.roundRect(-160,500,320,60,18);fs(Y,7,NV);
  // dedos dobrados (anelar e mindinho)
  for(let i=0;i<2;i++){c.beginPath();c.roundRect(-20+i*0,270+i*70,170,70,35);fs(skin(270+i*70,340+i*70),7,NV);}
  // palma
  c.beginPath();c.roundRect(-140,220,270,320,110);fs(skin(220,540),8,NV);
  // polegar a segurar os dobrados
  c.save();c.translate(-120,330);c.rotate(-.5);c.beginPath();c.roundRect(-30,-40,210,76,38);fs(skin(-40,36),7,NV);c.beginPath();c.roundRect(130,-30,44,52,[8,22,22,8]);fs('#fbd9cf',4,'rgba(150,70,40,.7)');c.restore();
  // indicador (por baixo) e médio (por cima, cruzado)
  const fing=(bx,by,ang,len,front)=>{c.save();c.translate(bx,by);c.rotate(ang);c.beginPath();c.roundRect(-44,-len,88,len+40,44);fs(skin(-len,40),8,NV);
    c.beginPath();c.roundRect(-30,-len+12,60,70,[28,28,12,12]);fs(lin(0,-len,0,-len+80,[[0,'#fff1ec'],[1,'#f6c3b5']]),5,'rgba(150,70,40,.7)');
    c.lineWidth=5;c.strokeStyle='rgba(150,70,40,.5)';c.lineCap='round';for(const yy of [-len*.45,-len*.12]){c.beginPath();c.moveTo(-18,yy);c.quadraticCurveTo(0,yy+8,18,yy);c.stroke();}
    if(front){c.beginPath();c.ellipse(-20,-len*.55,8,len*.25,0,0,7);c.fillStyle='rgba(255,255,255,.35)';c.fill();}c.restore();};
  fing(-70,250,.06+cross*.30,330,0);
  fing(30,250,-.10-cross*.30,350,1);
  c.restore();}
function burstText(x,y,s,txt,rot=0,bg='#fff',fg=RED,size=70){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?118:170+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*.8);}c.closePath();fs(bg,8,NV);c.restore();
  fit(txt,0,6,size,330,fg,14);c.restore();}
// ---------- cenas ----------
function sceneA(t){// 0–T1: dedos cruzados já a tocar no nariz
  K.sunburst(540,800,'#0e5a63','#127079',t*.15,22);dust(t,'200,255,250',30,.5);
  const rub=Math.sin(t*9)*10;const d=.12+.1*Math.max(0,Math.sin(t*4));
  cam(1.02+.05*ease(t/3.3),0,0,()=>{
    face(540,820,300,t,{dbl:d,wide:.5,mouth:'o',lookY:.8});
    hand(540+rub,935,1.05,0,{});
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2+t*2;sparkle(540+Math.cos(a)*150,860+Math.sin(a)*90,20,.6+.4*Math.sin(t*7+i));}
    burstText(790,520,.85*back((t+.2)/.3)*(1+.04*Math.sin(t*8)),'2 NARIZES?!',.12);
  });
  header('CRUZA OS DEDOS','E TOCA NO NARIZ',0,t);}
function sceneB(t){// T1–T2: cara com dois narizes
  const k=t-T1;K.sunburst(540,900,'#5b2a86','#6b35a0',t*.12,22);dust(t,'255,220,255',30,.5);
  const d=.35+.08*Math.sin(t*5);
  cam(punch(t,T1)*(1+.08*ease(k/2.4)),0,0,()=>{
    face(540,920,330,t,{dbl:d,wide:1,brow:1,mouth:'o',shake:k<.6?1:.2,look:Math.sin(t*6)});
    for(const sd of [-1,1]){const q=back((k-.35-(sd>0?.15:0))/.3);if(q>0){c.save();c.translate(540+sd*250,1250);c.scale(q,q);c.beginPath();c.arc(0,0,58,0,7);fs(Y,7,NV);text(sd<0?'1':'2',0,6,72,NV,0);c.restore();
      c.save();c.globalAlpha=clamp((k-.4)*3,0,1);c.strokeStyle=Y;c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(540+sd*215,1200);c.lineTo(540+sd*125,1010);c.stroke();c.restore();}}
  });
  header('PARECE QUE TEM','DOIS NARIZES!',T1,t,'#ffd1f0');
  flash(t,T1);}
// busto grego
function bust(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);
  const M=(y0,y1)=>lin(-200,y0,200,y1,[[0,'#ffffff'],[.6,'#e3e7ef'],[1,'#b8c0d0']]);
  c.beginPath();c.roundRect(-230,330,460,110,20);fs(M(330,440),8,NV);c.beginPath();c.roundRect(-190,250,380,100,16);fs(M(250,350),7,NV);
  c.beginPath();c.moveTo(-210,260);c.quadraticCurveTo(-200,120,-90,90);c.lineTo(90,90);c.quadraticCurveTo(200,120,210,260);c.closePath();fs(M(90,260),8,NV);
  c.strokeStyle='rgba(13,22,54,.25)';c.lineWidth=5;for(const dx of [-120,-40,50,130]){c.beginPath();c.moveTo(dx,120);c.quadraticCurveTo(dx+20,190,dx,250);c.stroke();}
  c.beginPath();c.roundRect(-55,40,110,80,20);fs(M(40,120),7,NV);
  // cabeça
  c.beginPath();c.ellipse(0,-90,135,160,0,0,7);fs(M(-250,70),8,NV);
  // barba
  c.beginPath();c.moveTo(-125,-60);c.bezierCurveTo(-130,60,-60,120,0,125);c.bezierCurveTo(60,120,130,60,125,-60);c.bezierCurveTo(70,-10,-70,-10,-125,-60);c.closePath();fs(M(-60,125),7,NV);
  c.strokeStyle='rgba(13,22,54,.22)';c.lineWidth=5;for(const dx of [-70,-25,25,70]){c.beginPath();c.moveTo(dx,-10);c.bezierCurveTo(dx-15,30,dx+15,60,dx,95);c.stroke();}
  // olhos fechados e nariz
  c.lineWidth=7;c.strokeStyle=NV;c.lineCap='round';for(const ex of [-50,50]){c.beginPath();c.arc(ex,-105,22,.2,Math.PI-.2);c.stroke();}
  c.beginPath();c.moveTo(0,-110);c.lineTo(-14,-48);c.lineTo(10,-44);c.stroke();
  // coroa de louros
  for(const sd of [-1,1])for(let i=0;i<6;i++){const a=-Math.PI/2+sd*(.45+i*.32);const lx=Math.cos(a)*140,ly=-110+Math.sin(a)*150;c.save();c.translate(lx,ly);c.rotate(a+sd*.9);c.beginPath();c.ellipse(0,0,34,14,0,0,7);fs(lin(0,-14,0,14,[[0,'#8fe08a'],[1,'#3ca34a']]),5,NV);c.restore();}
  c.restore();}
function column(x,y,h){c.save();c.translate(x,y);c.beginPath();c.roundRect(-60,-h,120,h,6);fs(lin(-60,0,60,0,[[0,'#cfd5e0'],[.5,'#ffffff'],[1,'#b8c0d0']]),7,NV);
  c.strokeStyle='rgba(13,22,54,.2)';c.lineWidth=5;for(const dx of [-30,0,30]){c.beginPath();c.moveTo(dx,-h+30);c.lineTo(dx,-30);c.stroke();}
  c.beginPath();c.roundRect(-85,-h-36,170,40,10);fs('#fff',7,NV);c.beginPath();c.roundRect(-85,-30,170,40,10);fs('#e3e7ef',7,NV);c.restore();}
function sceneC(t){// T2–T3: Aristóteles, +2000 anos
  const k=t-T2;K.sunburst(540,820,'#9a6a12','#b07c16',t*.1,22);dust(t,'255,240,200',30,.5);
  const n=Math.round(2000*ease(clamp((k-1.6)/1.6,0,1)));
  cam(punch(t,T2)*(1+.05*ease(k/3.6)),0,0,()=>{
    column(150,1350,620);column(930,1350,620);
    bust(540,760,1.05+.01*Math.sin(t*2),t);
    if(k>1.5){const q=back((k-1.5)/.35)*(1+(k>3.2?.08*Math.exp(-(k-3.2)*6):0));c.save();c.translate(540,1330);c.scale(q,q);
      c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.beginPath();c.roundRect(-330,-110,660,220,40);fs(NV,0);c.restore();
      text('+'+n.toLocaleString('pt-BR')+' ANOS',0,6,104,k>3.2?Y:'#fff',0);c.restore();}
    if(k>3.2)for(let i=0;i<10;i++){const a=i/10*Math.PI*2+k;sparkle(540+Math.cos(a)*(380+(k-3.2)*80),1330+Math.sin(a)*(160+(k-3.2)*40),24,1-(k-3.2)*1.5);}
  });
  if(k<1.5)header('É A ILUSÃO DE','ARISTÓTELES',T2,t);else header('TEM MAIS DE','2 MIL ANOS!',T2+1.5,t,'#fff2b3');
  flash(t,T2);}
// dedos simples vistos de cima: duas pontas e uma bolinha
function tip(x,y,ang,s,label,col){c.save();c.translate(x,y);c.rotate(ang);c.scale(s,s);c.beginPath();c.roundRect(-46,-40,92,420,46);fs(skin(-40,380),8,NV);
  c.beginPath();c.roundRect(-30,-28,60,70,[28,28,12,12]);fs(lin(0,-28,0,42,[[0,'#fff1ec'],[1,'#f6c3b5']]),5,'rgba(150,70,40,.7)');c.restore();}
function ball(x,y,r,a=1,col='#f27e6c'){c.save();c.globalAlpha=a;c.beginPath();c.arc(x,y,r,0,7);fs(rad(x-r*.3,y-r*.3,2,r*1.2,[[0,'#ffb0a0'],[1,col]]),7,NV);c.restore();}
function brainIcon(x,y,s,t,txt){c.save();c.translate(x,y);c.scale(s,s);c.rotate(Math.sin(t*3)*.05);
  c.beginPath();c.ellipse(0,0,150,110,0,0,7);fs(rad(-40,-40,10,170,[[0,'#ffd6e8'],[.6,'#ff9ccc'],[1,'#e56aa8']]),8,NV);
  c.strokeStyle='rgba(160,40,100,.45)';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(0,-105);c.lineTo(0,100);c.stroke();
  for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*30,-60);c.bezierCurveTo(sd*80,-80,sd*110,-30,sd*70,0);c.bezierCurveTo(sd*120,20,sd*100,70,sd*40,60);c.stroke();}
  if(txt){c.beginPath();c.arc(150,-110,70,0,7);fs(Y,7,NV);text(txt,150,-104,80,NV,0);}
  c.restore();}
function sceneD(t){// T3–T4: explicação
  const k=t-T3;c.fillStyle=lin(0,0,0,1920,[[0,'#0f3a7d'],[1,'#0a2552']]);c.fillRect(0,0,1080,1920);
  c.save();c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=2;for(let x=0;x<=1080;x+=54){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<=1920;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.restore();vign();
  const second=t>=T3b;const k2=t-T3b;
  cam(punch(t,T3)*(second?punch(t,T3b):1)*(1+.04*ease(k/6)),0,0,()=>{
    if(!second){// normal: as faces de fora nunca tocam a mesma coisa
      const sep=ease(clamp(k/.6,0,1));
      tip(430,780,-.06,1,'',0);tip(650,780,.06,1,'',0);
      // bolinhas nos lados de fora
      const ba=clamp((k-.5)*3,0,1);ball(330,760,48,ba);ball(750,760,48,ba);
      if(k>1.3){c.save();c.globalAlpha=clamp((k-1.3)*3,0,1);c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';c.setLineDash([22,18]);c.beginPath();c.moveTo(330,700);c.quadraticCurveTo(540,560,750,700);c.stroke();c.setLineDash([]);c.restore();
        c.save();c.translate(540,600);const q=back((k-1.4)/.3);c.scale(q,q);c.lineWidth=16;c.strokeStyle=RED;c.lineCap='round';c.beginPath();c.arc(0,0,60,0,7);c.stroke();c.beginPath();c.moveTo(-42,42);c.lineTo(42,-42);c.stroke();c.restore();}
      pill(540,1240,back((k-.3)/.35),'NUNCA TOCAM','#fff',NV,52,-.03);pill(540,1360,back((k-.6)/.35),'A MESMA COISA',RED,'#fff',52,.03);
    }else{// cruzados: uma só bola toca os dois lados de fora → cérebro conta 2
      const cr=ease(clamp(k2/.5,0,1));
      tip(650-cr*135,800-cr*60,.06-cr*.41,1);tip(430+cr*135,800-cr*60,-.06+cr*.41,1);
      ball(540,700-cr*60,46,1);
      for(const sd of [-1,1]){const g=clamp((k2-.5)*3,0,1);c.save();c.globalAlpha=g;c.strokeStyle=Y;c.lineWidth=9;c.beginPath();c.arc(540+sd*40,650,26+6*Math.sin(t*10),0,7);c.stroke();c.restore();}
      brainIcon(540,1250,.9,t,k2>.9?'2!':'');
      if(k2>.9){ball(330+Math.sin(t*4)*6,1250,34,.95);ball(750-Math.sin(t*4)*6,1250,34,.95);}
    }
  });
  if(!second)header('ESSES DOIS LADOS','DOS DEDOS…',T3,t,'#9cc4ff');else header('O CÉREBRO JURA','QUE SÃO DOIS!',T3b,t,Y);
  flash(t,T3);flash(t,T3b);}
function sceneE(t){// T4–fim: funcionou?
  const k=t-T4;K.sunburst(540,820,'#ffcf3f','#ffbe1a',t*.2,20);
  cam(punch(t,T4),0,0,()=>{
    face(540,820,250,t,{dbl:.3+.06*Math.sin(t*5),wink:k>1.4,mouth:'smile'});
    hand(540+Math.sin(t*9)*8,915,.85,0,{});
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2+t*.8;sparkle(540+Math.cos(a)*360,760+Math.sin(a)*150,22,.7+.3*Math.sin(t*6+i));}
  });
  header('FUNCIONOU','COM VOCÊ?',T4,t,'#fff');
  const pu=1+.05*Math.sin(t*8);pill(300,1330,back((k-1.6)/.3)*pu,'SIM',GRN,'#fff',70,-.05);pill(780,1330,back((k-2.0)/.3)*pu,'NÃO',RED,'#fff',70,.05);
  if(k>.1)pill(540,470,back((k-.1)/.3),'COMENTA ↓',RED,'#fff',46,-.03);
  flash(t,T4);}
function frame(t){if(t<T1)return sceneA(t);if(t<T2)return sceneB(t);if(t<T3)return sceneC(t);if(t<T4)return sceneD(t);sceneE(t);}
return {frame};};
