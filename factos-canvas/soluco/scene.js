export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// cortes (pausas da voz)
const T1=2.70,T2=6.93,HIC=10.16,T3=10.95,T4=13.12,T5=16.76;
const RED='#e5484d',GRN='#3ccf73',PINK='#ff8fa3',SKY='#bfe9ff';
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
function sparkle(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=Math.max(0,a);c.beginPath();for(let i=0;i<8;i++){const ang=i*Math.PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
// soluço: impulso que repete; 1 no pico, cai depressa
function jolt(t,per=.95,ph=0){const k=((t+ph)%per+per)%per;return {j:Math.exp(-k*9),k};}
// balão "HIC!" em estrela
function burst(x,y,s,txt='HIC!',rot=0,bg='#fff',fg=RED,size=86){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?118:170+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.25,Math.sin(a)*r*.82);}c.closePath();fs(bg,8,NV);c.restore();
  text(txt,0,6,size,fg,14);c.restore();}
function hicBubble(x,y,t,per,ph,size=1,rot=-.12){const {k}=jolt(t,per,ph);if(k>.62)return;const s=back(k/.16)*(1-clamp((k-.45)/.17,0,1))*size;burst(x-k*20,y-k*60,s,'HIC!',rot+Math.sin(k*30)*.04);}
function motion(x,y,w,a){if(a<=.02)return;c.save();c.globalAlpha=a;c.strokeStyle='#fff';c.lineWidth=9;c.lineCap='round';for(const dx of [-w,0,w]){c.beginPath();c.moveTo(x+dx,y);c.lineTo(x+dx*1.1,y+60);c.stroke();}c.restore();}
// ---------- carinha ----------
function face(x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate(o.shake?Math.sin(t*22)*.12*o.shake:(o.rot||0));
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();c.arc(0,0,r,0,7);fs(o.skin||rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),9,NV);c.restore();
  if(!o.old){c.beginPath();c.ellipse(-r*.38,-r*.55,r*.26,r*.12,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();}
  else{c.beginPath();c.ellipse(-r*.3,-r*.62,r*.3,r*.13,-.3,0,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();
    for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*r*.92,-r*.05,r*.2,r*.3,0,0,7);fs('#f3f4f8',r*.04,NV);}}
  const lk=o.look||0,wide=o.wide||0;for(const ex of [-.34,.34]){const ey=-r*.14;
    c.beginPath();c.ellipse(ex*r,ey,r*(.13+wide*.05),r*(.17+wide*.06),0,0,7);fs('#fff',r*.04,NV);const pr=r*(.075-wide*.02);c.beginPath();c.arc(ex*r+lk*r*.05,ey+r*.04,pr,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ex*r+lk*r*.05+r*.03,ey,r*.025,0,7);c.fillStyle='#fff';c.fill();}
  if(o.glasses){c.lineWidth=r*.045;c.strokeStyle=NV;for(const ex of [-.34,.34]){c.beginPath();c.arc(ex*r,-r*.14,r*.24,0,7);c.stroke();}c.beginPath();c.moveTo(-r*.1,-r*.16);c.lineTo(r*.1,-r*.16);c.stroke();}
  if(o.brow){c.lineWidth=r*.07;c.strokeStyle=o.old?'#f3f4f8':NV;c.lineCap='round';const b=o.brow;c.beginPath();c.moveTo(-r*.5,-r*.42-b*r*.08);c.lineTo(-r*.2,-r*.5-b*r*.12);c.moveTo(r*.5,-r*.42-b*r*.08);c.lineTo(r*.2,-r*.5-b*r*.12);c.stroke();}
  for(const ex of [-.58,.58]){c.beginPath();c.ellipse(ex*r,r*.2,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}
  if(o.old){c.save();c.beginPath();const bw=r*.82;c.moveTo(-bw,r*.05);c.bezierCurveTo(-bw,r*.9,-r*.4,r*1.45,0,r*1.5);c.bezierCurveTo(r*.4,r*1.45,bw,r*.9,bw,r*.05);c.bezierCurveTo(r*.5,r*.35,-r*.5,r*.35,-bw,r*.05);c.closePath();fs('#f3f4f8',r*.045,NV);
    c.strokeStyle='rgba(13,22,54,.18)';c.lineWidth=r*.03;for(const dx of [-.4,0,.4]){c.beginPath();c.moveTo(dx*r,r*.55);c.quadraticCurveTo(dx*r*1.1,r*.9,dx*r*.8,r*1.2);c.stroke();}
    c.beginPath();c.moveTo(-r*.45,r*.22);c.quadraticCurveTo(-r*.2,r*.08,0,r*.2);c.quadraticCurveTo(r*.2,r*.08,r*.45,r*.22);c.lineWidth=r*.09;c.strokeStyle='#e4e6ee';c.stroke();c.restore();}
  if(!o.old||o.mouth==='o'){c.beginPath();if(o.mouth==='o'){c.ellipse(0,r*(o.old?.42:.38),r*.11,r*.14,0,0,7);fs('#7a2335',r*.04,NV);}else{c.arc(0,r*.22,r*.3,.25,Math.PI-.25);c.lineWidth=r*.065;c.strokeStyle=NV;c.lineCap='round';c.stroke();}}
  c.restore();}
// boneco inteiro (cabeça + corpo) a soluçar
function boneco(x,y,s,t,o={}){const j=o.j||0;c.save();c.translate(x,y);c.scale(s,s);
  c.save();c.globalAlpha=.35*(1-j*.4);c.beginPath();c.ellipse(0,330,200*(1-j*.15),36,0,0,7);c.fillStyle='rgba(0,0,0,.55)';c.filter='blur(8px)';c.fill();c.restore();
  const by=-j*70;c.translate(0,by);
  const sh=j*40;// ombros sobem
  // braços
  for(const sd of [-1,1]){c.save();c.translate(sd*150,40-sh);c.rotate(-sd*(.3+j*.5));c.beginPath();c.roundRect(-34,-10,68,200,34);fs(o.shirt2||'#2f6cf0',7,NV);c.beginPath();c.arc(0,200,40,0,7);fs(o.skin2||'#ffd23f',7,NV);c.restore();}
  // corpo
  c.beginPath();c.moveTo(-160,20-sh);c.quadraticCurveTo(0,-30-sh,160,20-sh);c.lineTo(175,300);c.quadraticCurveTo(0,330,-175,300);c.closePath();fs(lin(-170,0,170,0,[[0,o.shirtA||'#1e4fc9'],[.5,o.shirt||'#3b7bff'],[1,o.shirtA||'#1e4fc9']]),8,NV);
  if(o.xray)o.xray();
  // cabeça
  face(0,-140-sh*1.2,140,t,{mouth:j>.35?'o':(o.mouth||'smile'),wide:j,brow:o.brow??(j>.35?1:0),look:o.look||0,old:o.old,glasses:o.glasses,skin:o.skin});
  c.restore();}
// pulmões + diafragma (dentro do peito)
function lungs(inf,t){for(const sd of [-1,1]){c.save();c.scale(sd,1);c.beginPath();const w=1+inf*.12;c.moveTo(-28,-150);c.bezierCurveTo(-90*w,-170,-150*w,-80,-150*w,40);c.bezierCurveTo(-150*w,140,-90*w,170,-40,150);c.bezierCurveTo(-24,110,-30,0,-28,-150);c.closePath();
  fs(rad(-90,-40,10,180,[[0,'#ffc2cf'],[.6,PINK],[1,'#e55a7a']]),7,NV);
  c.strokeStyle='rgba(160,30,70,.45)';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(-30,-90);c.quadraticCurveTo(-70,-40,-95,20);c.moveTo(-60,-50);c.quadraticCurveTo(-110,-50,-120,-10);c.moveTo(-80,0);c.quadraticCurveTo(-90,60,-70,110);c.stroke();c.restore();}
  c.beginPath();c.roundRect(-20,-260,40,130,18);fs('#ffd9df',6,NV);
  c.lineWidth=8;c.strokeStyle='rgba(160,30,70,.35)';for(let i=0;i<4;i++){c.beginPath();c.moveTo(-14,-245+i*30);c.lineTo(14,-245+i*30);c.stroke();}}
function diaphragm(y0,h,t){c.save();c.lineCap='round';c.beginPath();c.moveTo(-250,y0+40);c.bezierCurveTo(-150,y0-h,150,y0-h,250,y0+40);c.lineWidth=52;c.strokeStyle=NV;c.stroke();c.lineWidth=36;c.strokeStyle=lin(0,y0-h,0,y0+40,[[0,'#ff6b6f'],[1,'#c4262b']]);c.stroke();
  c.lineWidth=6;c.strokeStyle='rgba(255,255,255,.45)';c.beginPath();c.moveTo(-200,y0+10);c.bezierCurveTo(-120,y0-h*.85,120,y0-h*.85,200,y0+10);c.stroke();c.restore();}
// ---------- cenas ----------
function sceneA(t){// 0 – T1: gancho, boneco já a meio do soluço
  K.sunburst(540,950,'#3a1d7a','#4a2894',t*.15,22);dust(t,'255,220,255',30,.5);
  const {j}=jolt(t,.92,.1);
  cam(1.02+.05*ease(t/2.7)+j*.03,0,0,()=>{
    boneco(540,1060,1.35,t,{j,look:Math.sin(t*2)*.5});
    motion(540,560-j*90,120,j*.9);
    hicBubble(800,520,t,.92,.1,1.05,.12);
  },Math.sin(t*30)*j*.012);
  header('NINGUÉM TE','EXPLICOU ISSO',0,t);}
function sceneB(t){// T1 – T2: o diafragma dá um pulo
  const k=t-T1;c.fillStyle=lin(0,0,0,1920,[[0,'#0f3a7d'],[1,'#0a2552']]);c.fillRect(0,0,1080,1920);
  c.save();c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=2;for(let x=0;x<=1080;x+=54){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<=1920;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.restore();vign();
  // pulo: forte em ~5.6 s ("pulo sozinho") e pequenos antes
  const big=Math.exp(-Math.max(0,t-5.55)*7)*(t>5.55?1:0);const small=k>.4&&t<5.55?jolt(t,1.1,.2).j*.45:0;const J=Math.max(big,small);
  cam(punch(t,T1)*(1+.06*ease(k/4)),0,0,()=>{
    c.save();c.translate(540,1000);
    // peito em corte
    c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=40;c.beginPath();c.moveTo(-330,-330);c.quadraticCurveTo(0,-400,330,-330);c.lineTo(350,360);c.quadraticCurveTo(0,420,-350,360);c.closePath();fs(lin(-350,0,350,0,[[0,'#ffe3cf'],[.5,'#fff3e8'],[1,'#ffe3cf']]),8,NV);c.restore();
    c.save();c.translate(0,-40);c.scale(1.15,1.15);lungs(J,t);c.restore();
    // ar a entrar no pulo
    if(J>.15){for(let i=0;i<10;i++){const ph=(t*1.6+i/10)%1;const y=-420+ph*260;c.beginPath();c.arc(((i*37)%9-4)*6,y,6+(i%3)*2,0,7);c.fillStyle=`rgba(127,211,255,${J})`;c.fill();}}
    diaphragm(190+J*80,90-J*120,t);
    c.restore();
    // "trampolim" boing
    if(J>.2){c.save();c.globalAlpha=J;c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';for(const sd of [-1,1]){for(let i=0;i<3;i++){c.beginPath();c.moveTo(540+sd*(300+i*24),1150+i*24);c.lineTo(540+sd*(350+i*30),1180+i*30);c.stroke();}}c.restore();}
    const pa=back((t-3.15)/.35);if(t>3.15){pill(540,1330+J*40,pa,'DIAFRAGMA',RED,'#fff',58,-.03);
      c.save();c.globalAlpha=clamp((t-3.3)*3,0,1);c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(540,1270+J*40);c.lineTo(540,1215+J*80);c.stroke();c.beginPath();c.moveTo(515,1240+J*80);c.lineTo(540,1212+J*80);c.lineTo(565,1240+J*80);c.stroke();c.restore();}
    if(t>4.2&&t<5.5){pill(870,470,back((t-4.2)/.3),'PULMÃO',PINK,NV,44,.08);}
    if(t>5.55)burst(850,560,back((t-5.55)/.2)*(1-clamp((t-6.5)/.3,0,1))*.8,'BOING!',.12,Y,NV,74);
  },Math.sin(t*28)*big*.015);
  if(t<5.45)header('É O DIAFRAGMA','QUE DÁ UM PULO',T1,t,'#ff8a8f');else header('ELE PULA','SOZINHO!',5.45,t,Y);
  flash(t,T1);}
function sceneC(t){// T2 – T3: cordas vocais fecham → HIC!
  const k=t-T2;K.sunburst(540,900,'#7a1d4a','#8c2558',t*.12,22);dust(t,'255,200,220',26,.45);
  const shut=clamp((t-9.9)/.12,0,1);const hk=t-HIC;const hit=hk>0?Math.exp(-hk*6):0;
  cam(punch(t,T2)*(1+.12*ease(k/3))*(1+hit*.1),0,0,()=>{
    // garganta (tubo)
    const top=380,bot=1380,hw=120;
    c.beginPath();c.roundRect(540-hw-40,top,2*(hw+40),bot-top,60);fs(lin(0,0,1080,0,[[0,'#ff8fa3'],[.5,'#ffc2cf'],[1,'#ff8fa3']]),8,NV);
    c.beginPath();c.rect(540-hw,top-12,2*hw,bot-top+24);fs(lin(540-hw,0,540+hw,0,[[0,'#7a2335'],[.5,'#a8364e'],[1,'#7a2335']]),0);
    c.strokeStyle=NV;c.lineWidth=6;c.beginPath();c.moveTo(540-hw,top);c.lineTo(540-hw,bot);c.moveTo(540+hw,top);c.lineTo(540+hw,bot);c.stroke();
    // ar a descer (soluço puxa o ar)
    const dy=820;for(let i=0;i<22;i++){const ph=(t*1.3+i/22)%1;let y=top+ph*(bot-top);const x=540+((i*41)%11-5)*18;let al=Math.sin(ph*Math.PI);
      if(shut>0&&y>dy-30){y=dy-40-((i*13)%5)*14;} if(shut>=1&&y<dy-200)al*=.6;
      c.beginPath();c.arc(x,y,9+(i%3)*3,0,7);c.fillStyle=`rgba(127,211,255,${al*.9})`;c.fill();c.beginPath();c.arc(x,y,4,0,7);c.fillStyle=`rgba(255,255,255,${al})`;c.fill();}
    // portinhas (cordas vocais)
    const shake=hit*Math.sin(t*60)*8;
    for(const sd of [-1,1]){const ang=(1-shut)*1.1+Math.sin(t*9)*.03*(1-shut);c.save();c.translate(540+sd*hw,dy+shake);c.rotate(-sd*ang);
      c.beginPath();if(sd<0)c.roundRect(-4,-16,hw+6,32,16);else c.roundRect(-(hw+2),-16,hw+6,32,16);fs(lin(0,-16,0,16,[[0,'#fff3f5'],[1,'#ffb3c0']]),6,NV);c.restore();}
    if(t<9.9){const q=back((k-.5)/.3);pill(790,690,q,'CORDAS VOCAIS','#fff',NV,40,.06);
      c.save();c.globalAlpha=clamp((k-.6)*3,0,1);c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(760,745);c.quadraticCurveTo(700,800,650,800);c.stroke();c.restore();}
    if(shut>0&&t<HIC+.1){c.save();c.globalAlpha=shut*(1-clamp((t-HIC)/.1,0,1));for(let i=0;i<6;i++){const a=i/6*Math.PI*2;c.strokeStyle=Y;c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(540+Math.cos(a)*170,dy+Math.sin(a)*90);c.lineTo(540+Math.cos(a)*230,dy+Math.sin(a)*130);c.stroke();}c.restore();}
    if(hk>0){burst(540,560,back(hk/.18)*1.35,'HIC!',-.08+Math.sin(hk*40)*.05*hit);for(let i=0;i<10;i++){const a=i/10*Math.PI*2+hk;sparkle(540+Math.cos(a)*(260+hk*200),560+Math.sin(a)*(180+hk*140),24,1-hk*1.2);}}
  },hit*Math.sin(t*50)*.02);
  if(t<9.85)header('AS CORDAS VOCAIS','FECHAM DE REPENTE',T2,t,'#ffd1dc');else header('E FAZEM:','HIC!',9.85,t,Y);
  flash(t,T2);flash(t,HIC);}
function sceneD(t){// T3 – T4: "e isso nem é o mais estranho…" zoom + escurecer
  const k=t-T3;K.sunburst(540,900,'#141a3a','#1a2250',t*.1,20);
  const z=punch(t,T3,.15)*(1+.35*ease(k/2.2));
  cam(z,0,60*ease(k/2.2),()=>{
    c.fillStyle=rad(540,980,60,560,[[0,'rgba(255,240,180,.35)'],[1,'rgba(255,240,180,0)']]);c.fillRect(0,300,1080,1400);
    face(540,980,230,t,{look:Math.sin(k*3)>0?1:-1,wide:.5,brow:1,mouth:'o'});
    for(let i=0;i<3;i++){const q=back((k-.25-i*.18)/.3);c.save();c.translate(330+i*210,620-Math.sin(t*4+i)*14);c.scale(q,q);text('?',0,0,120,Y,16);c.restore();}
  });
  vign(.75);
  header('E ISSO NEM É','O MAIS ESTRANHO…',T3,t,'#c7b8ff');
  flash(t,T3);}
function sceneE(t){// T4 – T5: 68 anos
  const k=t-T4;K.sunburst(540,960,'#c2410c','#d9540f',t*.15,22);dust(t,'255,230,180',30,.5);
  const n=Math.round(68*ease(clamp((k-.25)/2.1,0,1)));const done=k>2.35;const dk=k-2.35;
  const {j}=jolt(t,.85,.3);
  cam(punch(t,T4)*(1+.05*ease(k/3.6))*(done?punch(t,T4+2.35,.06):1),0,0,()=>{
    // calendário a voar páginas
    const cx=280,cy=560;c.save();c.translate(cx,cy);c.rotate(-.08);
    c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-140,-120,280,260,24);fs('#fff',8,NV);c.restore();
    c.beginPath();c.roundRect(-140,-120,280,70,[24,24,0,0]);fs(RED,8,NV);for(const dx of [-70,70]){c.beginPath();c.roundRect(dx-10,-145,20,50,10);fs('#c9ced8',5,NV);}
    text(String(1922+n),0,40,84,NV,0);c.restore();
    if(!done)for(let i=0;i<4;i++){const ph=(t*3.2+i/4)%1;c.save();c.translate(cx+ph*420,cy+40-ph*260+ph*ph*300);c.rotate(ph*5+i);c.globalAlpha=1-ph;c.beginPath();c.roundRect(-110,-80,220,170,14);fs('#fff',6,NV);c.restore();}
    // velhinho a soluçar
    boneco(720,1090,1.0,t,{j,old:1,glasses:1,skin:rad(-40,-50,10,160,[[0,'#ffe2c4'],[.6,'#f5c59a'],[1,'#d9965f']]),skin2:'#f5c59a',shirt:'#8b5cf6',shirtA:'#6d3fd6',shirt2:'#7c4ae8',look:-1});
    hicBubble(940,660,t,.85,.3,.8,.12);
    // contador
    const sc=done?1+.12*Math.exp(-dk*6)+.03*Math.sin(t*8):1;c.save();c.translate(300,1110);c.scale(sc,sc);
    c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.beginPath();c.roundRect(-210,-150,420,300,40);fs(NV,0);c.restore();
    text(String(n),0,-25,190,done?Y:'#fff',0);text('ANOS',0,95,70,'#fff',0);c.restore();
    if(done)for(let i=0;i<12;i++){const a=i/12*Math.PI*2+dk;sparkle(300+Math.cos(a)*(250+dk*120),1110+Math.sin(a)*(200+dk*90),26,1-dk*.8);}
  });
  if(k<1.3)header('UM HOMEM','SOLUÇOU POR…',T4,t,'#ffe08a');else header('68 ANOS','SEGUIDOS!',T4+1.3,t,Y);
  flash(t,T4);flash(t,T4+2.35);}
// ícones dos truques
function glass(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(-70,-100);c.lineTo(70,-100);c.lineTo(55,110);c.lineTo(-55,110);c.closePath();fs('rgba(220,240,255,.85)',8,NV);
  c.save();c.beginPath();c.moveTo(-64,-30);c.lineTo(64,-30);c.lineTo(55,110);c.lineTo(-55,110);c.closePath();c.fillStyle=lin(0,-30,0,110,[[0,'#7fd3ff'],[1,'#2f8ae0']]);c.fill();c.restore();
  c.beginPath();c.roundRect(-45,-85,14,160,7);c.fillStyle='rgba(255,255,255,.7)';c.fill();c.restore();}
function lungIcon(x,y,s,t){c.save();c.translate(x,y);c.scale(s*.62,s*.62);lungs(.5+.5*Math.sin(t*4),t);c.restore();}
function sceneF(t){// T5 – fim: truques + comenta
  const k=t-T5;K.sunburst(540,820,'#ffcf3f','#ffbe1a',t*.2,20);
  const {j}=jolt(t,1.0,.1);
  cam(punch(t,T5),0,0,()=>{
    const items=[[200,'ÁGUA',0],[540,'SUSTO',.25],[880,'SEGURAR O AR',.5]];
    for(const [x,lab,d] of items){const q=back((k-.15-d)/.3);if(q<=0)continue;const bob=Math.sin(t*3+x)*10;c.save();c.translate(x,760+bob);c.scale(q,q);
      c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-150,-170,300,340,40);fs('#fff',8,NV);c.restore();
      if(lab==='ÁGUA')glass(0,-10,1);else if(lab==='SUSTO')face(0,-10,110,t,{mouth:'o',wide:1,brow:1,shake:.6});else lungIcon(0,10,1,t);
      c.restore();pill(x,975+bob,q,lab,NV,'#fff',lab.length>6?34:44);}
    boneco(540,1230,.55,t,{j:j*.8});
    hicBubble(740,1040,t,1.0,.1,.5,.12);
  });
  header('QUAL É O TEU','TRUQUE?',T5,t,'#fff');
  if(t>18.5)pill(540,470,back((t-18.5)/.3)*(1+.04*Math.sin(t*8)),'COMENTA ↓',RED,'#fff',52,-.03);
  flash(t,T5);}
function frame(t){if(t<T1)return sceneA(t);if(t<T2)return sceneB(t);if(t<T3)return sceneC(t);if(t<T4)return sceneD(t);if(t<T5)return sceneE(t);sceneF(t);}
return {frame};};
