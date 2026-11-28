export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;const PI=Math.PI;
// cortes = inícios das frases (align3.py, voz à velocidade normal, 25,16 s)
const T1b=2.23,T2=4.26,T2e=6.04,T2c=7.42,T2f=8.36,T2s=9.36,T3=10.63,T3r=11.91,T3s=13.05,T3p=14.66,T3x=15.31,T4=16.10,T4k=16.65,T4s=17.11,T4c=17.94,T4m=18.67,T4u=19.21,T4p=19.94,T4q=20.89,T5=21.47,T5b=22.08,T5c=22.97,T5d=23.82,T5e=24.55;
const RED='#e5484d',GRN='#3ccf73',BLUE='#4fa3ff',SKIN='#ffd23f',SHIRT='#ff6b4a',PANTS='#2f55c8';
const ARM=290;
// ---------- helpers ----------
function fit(s,x,y,size,maxW,fill='#fff',lw=18){c.font=`900 ${size}px M`;const w=c.measureText(s).width;const k=Math.min(1,maxW/w);text(s,x,y,size*k,fill,lw*Math.max(.7,k));}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);c.restore();text(txt,0,4,size,fg,0);c.restore();}
function header(l1,l2,t0,t,c2=Y,icon=0){if(window.nohead)return;const p=t0<=0?1:back((t-t0)/.35);if(p<=0)return;const pu=1+.025*Math.sin(t*6);c.save();c.translate(540,215);c.scale(p*pu,p*pu);fit(l1,0,-62,78,980,'#fff',18);
  if(icon){c.font='900 118px M';const w=Math.min(800,c.measureText(l2).width);fit(l2,-60,52,118,800,c2,22);face(-60+w/2+80,48,52,t,{shock:1,rot:.15*Math.sin(t*5)});}else fit(l2,0,52,118,1000,c2,22);c.restore();}
function dust(t,col='255,255,255',n=40,a=.5){for(let i=0;i<n;i++){const sp=20+(i%7)*9;const x=(i*397+31+Math.sin(t*.6+i)*30)%1080;const y=((i*211+57)-t*sp+4000)%1920;const s=2+(i%4)*1.6;c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(${col},${a*(.4+.6*Math.abs(Math.sin(t*1.3+i)))})`;c.fill();}}
function vign(a=.5){c.fillStyle=rad(540,900,300,1300,[[0,'rgba(0,0,0,0)'],[1,`rgba(0,0,0,${a})`]]);c.fillRect(0,0,1080,1920);}
function flash(t,t0,a=.7){const k=t-t0;if(k<0||k>.25)return;c.fillStyle=`rgba(255,255,255,${a*(1-k/.25)})`;c.fillRect(0,0,1080,1920);}
function cam(s,x,y,fn,rot=0,cx=540,cy=900){c.save();c.translate(cx,cy);c.rotate(rot);c.scale(s,s);c.translate(-cx+x,-cy+y);fn();c.restore();}
function punch(t,t0,a=.08){const k=t-t0;return k<0?1:1+a*Math.exp(-k*7);}
function sparkle(x,y,r,a){if(a<=0)return;c.save();c.translate(x,y);c.globalAlpha=clamp(a,0,1);c.beginPath();for(let i=0;i<8;i++){const ang=i*PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
function burstText(x,y,s,txt,rot=0,bg='#fff',fg=RED,size=70){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*PI*2,r=i%2?118:170+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*.8);}c.closePath();fs(bg,8,NV);c.restore();
  fit(txt,0,6,size,330,fg,14);c.restore();}
const sm=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};
// "?!" a pulsar
function qmark(x,y,s,t,rot=0){if(s<=0)return;const pu=1+.12*Math.abs(Math.sin(t*7));c.save();c.translate(x,y);c.rotate(rot+.08*Math.sin(t*5));c.scale(s*pu,s*pu);text('?!',0,0,120,Y,22);c.restore();}
// ---------- cara ----------
function face(x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),r*.07,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.58,r*.24,r*.11,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const shock=o.shock||0,strain=o.strain||0,relax=o.relax||0;c.lineCap='round';
  if(strain>.5){c.lineWidth=r*.07;c.strokeStyle=NV;for(const sx of [-1,1]){c.beginPath();c.moveTo(sx*r*.5,-r*.32);c.lineTo(sx*r*.24,-r*.2);c.lineTo(sx*r*.5,-r*.08);c.stroke();}
    c.beginPath();c.roundRect(-r*.36,r*.18,r*.72,r*.3,r*.1);fs('#fff',r*.045,NV);c.beginPath();c.moveTo(-r*.36,r*.33);c.lineTo(r*.36,r*.33);for(const xx of [-.18,0,.18]){c.moveTo(xx*r,r*.18);c.lineTo(xx*r,r*.48);}c.lineWidth=r*.03;c.stroke();}
  else if(relax>.5){c.lineWidth=r*.06;c.strokeStyle=NV;for(const sx of [-1,1]){c.beginPath();c.arc(sx*r*.34,-r*.2,r*.13,PI*1.1,PI*1.9);c.stroke();}
    c.beginPath();c.arc(0,r*.2,r*.2,.3,PI-.3);c.stroke();}
  else{for(const ex of [-.34,.34]){const ey=-r*.2;const er=r*(.13+shock*.05);c.beginPath();c.ellipse(ex*r,ey,er,er*1.25,0,0,7);fs('#fff',r*.035,NV);c.beginPath();c.arc(ex*r+(o.look||0)*r*.04,ey+r*.02,r*(.07-shock*.02),0,7);c.fillStyle=NV;c.fill();}
    c.lineWidth=r*.055;c.strokeStyle=NV;const bu=shock*r*.12;c.beginPath();c.moveTo(-r*.52,-r*.5-bu);c.quadraticCurveTo(-r*.36,-r*.62-bu,-r*.18,-r*.52-bu);c.moveTo(r*.52,-r*.5-bu);c.quadraticCurveTo(r*.36,-r*.62-bu,r*.18,-r*.52-bu);c.stroke();
    if(shock>.3){c.beginPath();c.ellipse(0,r*.42,r*.16,r*.22*shock,0,0,7);fs('#7a2335',r*.035,NV);}
    else{c.beginPath();c.arc(0,r*.22,r*.3,.25,PI-.25);c.closePath();fs('#7a2335',r*.035,NV);}}
  for(const ex of [-.6,.6]){c.beginPath();c.ellipse(ex*r,r*.12,r*.12,r*.07,0,0,7);c.fillStyle=`rgba(255,${strain>.5?60:100},${strain>.5?80:120},${strain>.5?.7:.45})`;c.fill();}
  if(o.sweat){c.beginPath();c.moveTo(r*.78,-r*.5);c.bezierCurveTo(r*.92,-r*.3,r*.9,-r*.15,r*.8,-r*.15);c.bezierCurveTo(r*.68,-r*.15,r*.66,-r*.3,r*.78,-r*.5);fs('#7fd3ff',r*.03,NV);}
  c.restore();}
// ---------- boneco (vista de frente). (x,y)=bacia. o.aR/o.aL = ângulo do braço a partir de "para baixo" (rad, para fora) ----------
function armDraw(sx,ang,t,o){c.save();c.translate(sx*96,-262);c.rotate(sx>0?-ang:ang);const L=ARM;const bend=sx*10*Math.sin(ang*.5);
  c.lineCap='round';c.beginPath();c.moveTo(0,40);c.quadraticCurveTo(bend,L*.55,0,L);c.lineWidth=64;c.strokeStyle=NV;c.stroke();
  c.lineWidth=50;c.strokeStyle=lin(-25,0,25,0,[[0,'#f2a20d'],[.45,SKIN],[1,'#ffe27a']]);c.stroke();
  // manga
  c.beginPath();c.roundRect(-40,-34,80,112,34);fs(lin(-40,0,40,0,[[0,'#e0482c'],[.5,SHIRT],[1,'#ff8a6b']]),7,NV);
  // mão (costas da mão para fora)
  c.save();c.translate(0,L);c.beginPath();c.ellipse(0,8,34,40,0,0,7);fs(rad(-8,-6,4,44,[[0,'#fff0a0'],[1,'#f2b01d']]),7,NV);
  c.beginPath();c.ellipse(-sx*30,-4,12,20,-sx*.5,0,7);fs(SKIN,6,NV);
  c.lineWidth=4;c.strokeStyle='rgba(13,22,54,.45)';for(let k=0;k<3;k++){c.beginPath();c.moveTo(sx*14,18+k*10);c.lineTo(sx*28,16+k*10);c.stroke();}c.restore();
  c.restore();}
function boneco(x,y,s,t,o={}){c.save();c.translate(x,y);c.scale(s,s);
  c.beginPath();c.ellipse(0,312,170,26,0,0,7);c.fillStyle='rgba(0,0,0,.28)';c.fill();
  const wk=o.walk||0;// fase da passada (0 = parado)
  for(const sx of [-1,1]){const sw=Math.sin(wk*PI*2)*sx*28*(o.walkAmp??0);const lift=Math.max(0,Math.sin(wk*PI*2)*sx)*(o.walkAmp??0)*18;
    c.lineCap='round';c.beginPath();c.moveTo(sx*42,-10);c.lineTo(sx*50+sw,278-lift);c.lineWidth=68;c.strokeStyle=NV;c.stroke();c.lineWidth=54;c.strokeStyle=lin(sx*20,0,sx*80,0,[[0,PANTS],[1,'#4b74e8']]);c.stroke();
    c.beginPath();c.ellipse(sx*62+sw,300-lift,56,28,0,0,7);fs(lin(0,280,0,330,[[0,'#ffffff'],[1,'#c9d3ea']]),7,NV);c.beginPath();c.ellipse(sx*62+sw,316-lift,54,10,0,0,PI);c.fillStyle=RED;c.fill();}
  // braço de trás (esquerda do ecrã)
  armDraw(-1,o.aL??(.1+.03*Math.sin(t*2)),t,o);
  // tronco
  c.save();c.shadowColor='rgba(0,0,0,.25)';c.shadowBlur=20;c.shadowOffsetY=8;c.beginPath();c.roundRect(-112,-305,224,335,[78,78,40,40]);fs(lin(-112,0,112,0,[[0,'#e0482c'],[.5,SHIRT],[1,'#ff8a6b']]),8,NV);c.restore();
  c.beginPath();c.roundRect(-112,-20,224,50,[0,0,40,40]);fs(PANTS,8,NV);
  c.beginPath();c.arc(0,-150,46,0,7);fs('#fff',6,NV);text('2',0,-146,60,RED,0);
  c.beginPath();c.arc(0,-300,44,.15,PI-.15);c.lineWidth=8;c.strokeStyle='#fff';c.stroke();
  armDraw(1,o.aR??(.1+.03*Math.sin(t*2+1)),t,o);
  // ombro a brilhar (músculo a trabalhar)
  if(o.glow>0){const g=o.glow*(.75+.25*Math.sin(t*14));c.fillStyle=rad(100,-250,6,120,[[0,`rgba(255,120,40,${.95*g})`],[.5,`rgba(255,80,40,${.45*g})`],[1,'rgba(255,80,40,0)']]);c.beginPath();c.arc(100,-250,120,0,7);c.fill();}
  // pescoço + cabeça + cabelo
  c.beginPath();c.roundRect(-30,-345,60,55,14);fs(SKIN,7,NV);
  const hx=o.headX||0;c.save();c.translate(hx,0);face(0,-425,122,t,o);
  c.beginPath();c.moveTo(-112,-470);c.quadraticCurveTo(-120,-560,-30,-552);c.quadraticCurveTo(10,-590,50,-548);c.quadraticCurveTo(122,-548,112,-470);c.quadraticCurveTo(70,-520,0,-510);c.quadraticCurveTo(-60,-520,-112,-470);c.closePath();fs(lin(0,-590,0,-470,[[0,'#6b3a17'],[1,'#3d1f0a']]),7,NV);
  c.restore();
  c.restore();}
// posições no mundo
const shoulder=(x,y,s)=>[x+s*96,y-s*262];
const hand=(x,y,s,a)=>{const [sx,sy]=shoulder(x,y,s);return [sx+s*ARM*Math.sin(a),sy+s*ARM*Math.cos(a)];};
// linhas de movimento atrás do braço a subir
function motion(x,y,s,a,amt,t){if(amt<=0)return;const [sx,sy]=shoulder(x,y,s);c.save();c.lineCap='round';
  for(let i=0;i<3;i++){const r=s*(ARM*(.55+i*.22));const ph=(t*2.2+i*.33)%1;c.globalAlpha=amt*(.85-ph*.6);c.beginPath();
    // ângulo canvas: o braço aponta (sin a, cos a) → atan2
    const ca=Math.atan2(Math.cos(a),Math.sin(a));c.arc(sx,sy,r,ca+.12,ca+.55+ph*.25);c.lineWidth=10-i*2;c.strokeStyle='#fff';c.stroke();}c.restore();}
// parede de tijolos
function bricks(x0,y0,x1,y1,t,shake=0){c.save();c.translate(shake,0);c.beginPath();c.rect(x0,y0,x1-x0,y1-y0);c.save();c.clip();c.fillStyle=lin(x0,0,x1,0,[[0,'#a8401f'],[1,'#c85a30']]);c.fillRect(x0,y0,x1-x0,y1-y0);
  const bh=64,bw=150;c.strokeStyle='#e8c9a8';c.lineWidth=7;for(let r=0;r*bh<y1-y0;r++){const yy=y0+r*bh;c.beginPath();c.moveTo(x0,yy);c.lineTo(x1,yy);c.stroke();const off=r%2?bw/2:0;for(let xx=x0-off;xx<x1;xx+=bw){c.beginPath();c.moveTo(xx,yy);c.lineTo(xx,yy+bh);c.stroke();}
    for(let xx=x0-off;xx<x1;xx+=bw){c.fillStyle=`rgba(255,255,255,${.05+.06*(((r*7+xx)|0)%3)})`;c.fillRect(xx+8,yy+8,bw-16,12);}}
  c.fillStyle=lin(x0,0,x0+60,0,[[0,'rgba(0,0,0,.35)'],[1,'rgba(0,0,0,0)']]);c.fillRect(x0,y0,60,y1-y0);c.restore();
  c.beginPath();c.moveTo(x0,y0);c.lineTo(x0,y1);c.lineWidth=9;c.strokeStyle=NV;c.stroke();c.restore();}
function room(t){c.fillStyle=lin(0,0,0,1920,[[0,'#2b4790'],[.68,'#1a2d66'],[.69,'#14214b'],[1,'#0d1636']]);c.fillRect(0,0,1080,1920);
  c.fillStyle='rgba(255,255,255,.06)';for(let i=0;i<9;i++)c.fillRect(i*130-20,0,60,1320);
  c.fillStyle='rgba(255,255,255,.12)';c.fillRect(0,1318,1080,8);c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=4;for(let i=-8;i<=8;i++){c.beginPath();c.moveTo(540+i*70,1326);c.lineTo(540+i*260,1920);c.stroke();}for(const yy of [1400,1500,1640,1820]){c.beginPath();c.moveTo(0,yy);c.lineTo(1080,yy);c.stroke();}dust(t,'255,255,255',28,.35);}
// cronómetro
function timer(x,y,s,sec,t){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=26;c.shadowOffsetY=12;c.beginPath();c.arc(0,0,132,0,7);fs('#fff',9,NV);c.restore();
  c.beginPath();c.roundRect(-26,-172,52,36,10);fs('#cfd6e6',7,NV);
  c.beginPath();c.arc(0,0,104,0,7);c.lineWidth=22;c.strokeStyle='#e3e8f3';c.stroke();
  c.beginPath();c.arc(0,0,104,-PI/2,-PI/2+2*PI*clamp(sec/30,0,1));c.lineWidth=22;c.lineCap='round';c.strokeStyle=sec>=30?GRN:RED;c.stroke();
  text(String(Math.floor(sec)),0,-8,104,NV,0);text('SEG',0,56,30,NV,0);
  // "acelerado"
  c.save();c.translate(0,170);c.beginPath();c.roundRect(-92,-34,184,68,34);fs(Y,7,NV);c.fillStyle=NV;const fx=-58+((t*6)%1)*6;for(const dx of [0,30]){c.beginPath();c.moveTo(fx+dx,-17);c.lineTo(fx+dx+26,0);c.lineTo(fx+dx,17);c.closePath();c.fill();}text('x10',36,3,38,NV,0);c.restore();
  c.restore();}
// cérebro
function brain(x,y,r,t,glow=0){c.save();c.translate(x,y);
  if(glow>0){c.fillStyle=rad(0,0,r*.3,r*1.8,[[0,`rgba(255,240,140,${.55*glow})`],[1,'rgba(255,240,140,0)']]);c.beginPath();c.arc(0,0,r*1.8,0,7);c.fill();}
  c.beginPath();c.ellipse(r*.35,r*.62,r*.32,r*.22,.2,0,7);fs('#e86a8c',r*.05,NV);
  c.beginPath();c.roundRect(r*.05,r*.55,r*.22,r*.55,r*.1);fs('#e86a8c',r*.05,NV);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();
  const n=11;for(let i=0;i<=n;i++){const a=PI+i/n*PI;const rr=r*(1+.06*Math.sin(i*2.7));c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr*.82);}c.quadraticCurveTo(r*1.05,r*.55,r*.3,r*.62);c.quadraticCurveTo(-r*.4,r*.75,-r*1.0,r*.25);c.closePath();
  fs(rad(-r*.3,-r*.4,r*.1,r*1.2,[[0,'#ffd1dd'],[.6,'#ff98b3'],[1,'#e86a8c']]),r*.05,NV);c.restore();
  c.save();c.clip();c.lineWidth=r*.045;c.strokeStyle='rgba(160,40,80,.55)';c.lineCap='round';
  const sq=[[-.7,-.3,-.35,-.55,-.05,-.3],[-.85,.1,-.5,-.1,-.2,.15],[.05,-.6,.3,-.35,.6,-.5],[.2,-.1,.5,.1,.85,-.1],[-.5,.4,-.2,.25,.1,.45],[.3,.3,.55,.45,.8,.3],[-.2,-.75,0,-.5,-.05,-.15]];
  for(const [a,b,cc,d,e,f] of sq){c.beginPath();c.moveTo(a*r,b*r);c.quadraticCurveTo(cc*r,d*r,e*r,f*r);c.stroke();}
  c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.5,r*.24,r*.09,-.4,0,7);c.fillStyle='rgba(255,255,255,.5)';c.fill();c.restore();}
function bez(p0,p1,p2,p3,u){const v=1-u;return [v*v*v*p0[0]+3*v*v*u*p1[0]+3*v*u*u*p2[0]+u*u*u*p3[0],v*v*v*p0[1]+3*v*v*u*p1[1]+3*v*u*u*p2[1]+u*u*u*p3[1]];}
function bolt(x,y,s,col=Y){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(6,-30);c.lineTo(-14,4);c.lineTo(0,4);c.lineTo(-6,30);c.lineTo(14,-6);c.lineTo(0,-6);c.closePath();fs(col,4,NV);c.restore();}
// botões SIM / NÃO
function btn(x,y,s,label,col,ok,t){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=26;c.shadowOffsetY=12;c.beginPath();c.roundRect(-190,-88,380,176,88);fs(col,9,NV);c.restore();
  c.beginPath();c.roundRect(-176,-80,352,60,30);c.fillStyle='rgba(255,255,255,.22)';c.fill();
  c.beginPath();c.arc(-100,0,52,0,7);fs('#fff',7,NV);c.lineWidth=15;c.lineCap='round';c.lineJoin='round';c.strokeStyle=col;c.beginPath();
  if(ok){c.moveTo(-124,0);c.lineTo(-106,20);c.lineTo(-74,-18);}else{c.moveTo(-120,-20);c.lineTo(-80,20);c.moveTo(-80,-20);c.lineTo(-120,20);}c.stroke();
  text(label,44,6,84,'#fff',16);c.restore();}
function plane(x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.moveTo(90,0);c.lineTo(-70,-60);c.lineTo(-40,0);c.lineTo(-70,60);c.closePath();fs('#fff',7,NV);c.beginPath();c.moveTo(90,0);c.lineTo(-40,0);c.lineTo(-30,40);c.closePath();fs('#cfe3ff',6,NV);c.restore();}
// ---------- cenas ----------
function sceneA(t){// 0–T2: o resultado primeiro — braço já a subir sozinho
  K.sunburst(540,900,'#1d3f9e','#2552c4',t*.18,22);dust(t,'255,255,255',36,.5);
  const a=.55+.95*ease(t/1.9)+.05*Math.sin(t*3.2)*clamp((t-1.6)/.4,0,1);const sh=t<T1b?.55+.45*clamp(t/1.2,0,1):1;
  const BX=440,BY=1060,S=.88;
  cam(punch(t,T1b,.1)*(1+.03*ease(t/4)),0,0,()=>{
    motion(BX,BY,S,a,1-clamp((t-2.6)/.8,0,1)*.6,t);
    boneco(BX,BY,S,t,{aR:a,shock:sh,look:1,rot:0,sweat:t>=T1b});
    const [hx,hy]=hand(BX,BY,S,a);for(let i=0;i<5;i++)sparkle(hx-30+Math.sin(i*2.1+t*3)*60,hy+40+((i*53+t*140)%160),14+(i%3)*6,.5+.5*Math.sin(t*6+i));
    qmark(hx+10,hy-150,1,t,.1);
    if(t>=T1b){burstText(190,660,back((t-T1b)/.3)*.62,'COMO?!',-.1,'#fff',RED,84);}
  });
  header('SEU BRAÇO VAI','SUBIR SOZINHO',0,t,Y,1);flash(t,T1b,.4);}
function sceneB(t){// T2–T3: ao lado da parede, empurra com as costas da mão, contador 30 s acelerado
  room(t);const k=t-T2;
  const walkP=clamp(k/.9,0,1);const BX=370+150*ease(walkP),BY=1060,S=.88;
  const push=ease(clamp((t-T2e)/.3,0,1));const strong=t>=T2f?1:0;const sh=strong?Math.sin(t*55)*3:push>.9?Math.sin(t*40)*1.2:0;
  const aWall=Math.asin(clamp((770-34-shoulder(BX,BY,S)[0])/(S*ARM),0,1));const a=.1+(aWall-.1)*push;
  const sec=clamp((t-(T2e+.2))/4.1,0,1)*30;
  cam(punch(t,T2)*(t>=T2f?punch(t,T2f,.07):1)*(1+.04*ease(k/6)),0,0,()=>{
    bricks(770,330,1080,1322,t,push>.9?sh*.4:0);
    boneco(BX+sh,BY,S,t,{aR:a,walk:walkP*2,walkAmp:walkP<1?1:0,strain:t>=T2e+.25?1:0,sweat:strong,look:1});
    if(push>.9){const [hx,hy]=hand(BX+sh,BY,S,a);
      for(let i=0;i<3;i++){const ph=((t-T2e)*(strong?2.6:1.6)+i/3)%1;c.beginPath();c.ellipse(772,hy+8,10+ph*60,30+ph*90,0,-PI/2,PI/2);c.lineWidth=7;c.strokeStyle=`rgba(255,255,255,${.8*(1-ph)})`;c.stroke();}
      // setas a empurrar
      for(let i=0;i<2;i++){const ox=(t*3+i*.5)%1*22;c.save();c.translate(hx-120+ox,hy-60+i*120);c.beginPath();c.moveTo(0,-14);c.lineTo(40,-14);c.lineTo(40,-30);c.lineTo(72,0);c.lineTo(40,30);c.lineTo(40,14);c.lineTo(0,14);c.closePath();fs(Y,6,NV);c.restore();}
      if(strong){c.save();c.strokeStyle='#fff';c.lineWidth=7;c.lineCap='round';const [sx,sy]=shoulder(BX,BY,S);for(let i=0;i<4;i++){const an=-PI*.15-i*.28+.05*Math.sin(t*30);c.beginPath();c.moveTo(sx+Math.cos(an)*110,sy-30+Math.sin(an)*110);c.lineTo(sx+Math.cos(an)*150,sy-30+Math.sin(an)*150);c.stroke();}c.restore();}}
    // lupa "costas da mão"
    const lz=t>=T2c&&t<T2s+.2?back((t-T2c)/.35)*(t>T2s?1-ease((t-T2s)/.2):1):0;
    if(lz>0){const [hx,hy]=hand(BX+sh,BY,S,a);const lx=250,ly=600,R=165;
      c.save();c.beginPath();c.moveTo(lx+R*.6,ly+R*.75);c.lineTo(hx-30,hy-30);c.lineWidth=8;c.strokeStyle='rgba(255,255,255,.8)';c.setLineDash([16,14]);c.stroke();c.restore();
      c.save();c.translate(lx,ly);c.scale(lz,lz);c.beginPath();c.arc(0,0,R,0,7);c.save();c.clip();c.fillStyle='#2b4790';c.fillRect(-R,-R,2*R,2*R);
      c.translate(-(hx+25)*2.4,-(hy)*2.4);c.scale(2.4,2.4);bricks(770,330,1080,1322,t,0);boneco(BX+sh,BY,S,t,{aR:a,strain:1});c.restore();
      c.beginPath();c.arc(0,0,R,0,7);c.lineWidth=14;c.strokeStyle=NV;c.stroke();c.lineWidth=6;c.strokeStyle='#fff';c.stroke();c.restore();
      pill(lx,ly+R+60,lz,'COSTAS DA MÃO',Y,NV,40,-.03);}
    if(t>=T2f&&t<T2s)burstText(250,1170,back((t-T2f)/.3)*.62,'FORÇA!',.08,'#fff',RED,90);
  });
  // contador (fora da câmara, sempre visível)
  if(t>=T2e){const q=back((t-T2e)/.35)*(t>=T2s?punch(t,T2s,.25):1)*(sec>=30?punch(t,T2e+4.3,.3):1);const mv=ease(clamp((t-T2s)/.35,0,1));timer(900-20*mv,570+30*mv,q*(.78+.17*mv),sec,t);
    if(sec>=30){pill(780,820,back((t-(T2e+4.3))/.3),'30 SEGUNDOS!',GRN,'#fff',40,.04);}}
  if(t<T2e)header('FICA DO LADO','DE UMA PAREDE',T2,t,Y);else if(t<T2f)header('EMPURRA COM AS','COSTAS DA MÃO',T2e,t,Y);else header('COM FORÇA, POR','30 SEGUNDOS',T2f,t,'#ff9a8a');
  flash(t,T2,.5);}
function sceneC(t){// T3–T4: sai da parede, relaxa, o braço sobe sozinho; "como se alguém puxasse" → fio some
  room(t);const k=t-T3;
  const walkP=clamp((t-T3-.08)/.75,0,1);const BX=520-170*ease(walkP),BY=1060,S=.88;
  const rise=sm((t-(T3s-.05))/2.5);const relaxA=.1+.03*Math.sin(t*2);
  const aOff=.1+(Math.asin(clamp((770-34-shoulder(520,BY,S)[0])/(S*ARM),0,1))-.1)*(1-ease(clamp((t-T3)/.35,0,1)));
  const a=t<T3r?aOff:relaxA+(1.48-relaxA)*rise+.04*Math.sin(t*2.4)*rise;
  const relax=t>=T3r&&t<T3s+.3?1:0;const sh=t>=T3s+.3?clamp((t-T3s-.3)/.6,0,1):0;
  const z=t<T3r?1:1+.1*ease((t-T3r)/1.2);
  cam(punch(t,T3)*(t>=T3r?punch(t,T3r,.05):1)*(t>=T3p?punch(t,T3p,.06):1)*z,0,0,()=>{
    bricks(770,330,1080,1322,t,0);
    if(rise>0&&rise<1)motion(BX,BY,S,a,clamp(rise*4,0,1),t);
    boneco(BX,BY,S,t,{aR:a,walk:walkP*1.5,walkAmp:walkP>0&&walkP<1?1:0,relax,shock:sh,look:1});
    const [hx,hy]=hand(BX,BY,S,a);
    if(rise>0){for(let i=0;i<6;i++)sparkle(hx-40+Math.sin(i*2.1+t*2)*70,hy+30+((i*61+t*120)%180),12+(i%3)*6,(.4+.6*Math.sin(t*6+i))*clamp(rise*3,0,1));}
    if(relax)pill(BX+235,600,back((t-T3r-.2)/.3),'RELAXA…',BLUE,'#fff',46,-.04);
    if(t>=T3s+.5&&t<T3p)qmark(hx+20,hy-160,back((t-T3s-.5)/.3),t,.12);
    // fio de marioneta
    if(t>=T3p){const q=ease((t-T3p)/.3);const gone=clamp((t-(T3x+.3))/.5,0,1);const px=hx,py=560-(1-q)*500;
      c.save();c.globalAlpha=1-gone;c.setLineDash(gone>0?[10,18+gone*40]:[]);c.beginPath();c.moveTo(px,py+20);c.lineTo(hx,hy-20);c.lineWidth=5;c.strokeStyle='#fff';c.stroke();c.setLineDash([]);
      c.translate(px,py);c.rotate(.08*Math.sin(t*3));c.beginPath();c.roundRect(-110,-16,220,32,10);fs('#c8894a',6,NV);c.beginPath();c.roundRect(-16,-80,32,150,10);fs('#a86a32',6,NV);c.restore();
      if(gone>0){for(let i=0;i<8;i++){const u=i/8;sparkle(px+(hx-px)*u+Math.sin(i*3)*20,py+(hy-py)*u-gone*60,14,1-gone);}}
      if(t>=T3x+.55){const q2=back((t-T3x-.55)/.3);c.save();c.translate(px,(py+hy)/2);c.scale(q2,q2);c.lineWidth=26;c.lineCap='round';c.strokeStyle=NV;c.beginPath();c.moveTo(-70,-70);c.lineTo(70,70);c.moveTo(70,-70);c.lineTo(-70,70);c.stroke();c.lineWidth=16;c.strokeStyle=RED;c.stroke();c.restore();
        pill(BX,1230,q2,'NINGUÉM ESTÁ PUXANDO!',Y,NV,40,-.02);}}
  });
  if(t<T3s)header('AGORA SAI','E RELAXA O BRAÇO',T3,t,'#9cc4ff');else if(t<T3p)header('ELE SOBE','SOZINHO!',T3s,t,Y);else header('COMO SE ALGUÉM','PUXASSE!',T3p,t,'#ff9a8a');
  flash(t,T3,.5);}
function sceneD(t){// T4–T5: efeito Kohnstamm — o cérebro continua a mandar o sinal ao ombro
  const k=t-T4;c.fillStyle=lin(0,0,0,1920,[[0,'#1a1450'],[1,'#0a0a26']]);c.fillRect(0,0,1080,1920);
  for(let i=0;i<26;i++){const x=(i*397+50)%1080,y=(i*251+120)%1500+200;c.beginPath();c.arc(x,y,3+(i%3),0,7);c.fillStyle=`rgba(160,140,255,${.25+.25*Math.sin(t*2+i)})`;c.fill();if(i%2){const j=(i+5)%26;c.beginPath();c.moveTo(x,y);c.lineTo((j*397+50)%1080,(j*251+120)%1500+200);c.lineWidth=2;c.strokeStyle='rgba(160,140,255,.12)';c.stroke();}}
  vign(.4);
  const BX=540,BY=1080,S=.82;const a=1.38+.06*Math.sin(t*2.2);
  const send=t>=T4m?1:0;const glow=t>=T4u?clamp((t-T4u)/.3,0,1):0;
  cam(punch(t,T4)*(t>=T4c?punch(t,T4c,.05):1)*(t>=T4p?punch(t,T4p,.05):1)*(1+.03*ease(k/5)),0,0,()=>{
    const BRx=840,BRy=620;
    const p0=[BRx-30,BRy+110],[ssx,ssy]=shoulder(BX,BY,S),p3=[ssx-6,ssy-6],p1=[BRx-20,BRy+230],p2=[ssx+70,ssy-70];
    // caminho do sinal
    c.save();c.setLineDash([18,16]);c.lineDashOffset=-t*90;c.beginPath();c.moveTo(...p0);c.bezierCurveTo(...p1,...p2,...p3);c.lineWidth=12;c.strokeStyle=send?'rgba(255,230,120,.85)':'rgba(255,255,255,.25)';c.stroke();c.restore();
    boneco(BX,BY,S,t,{aR:a,relax:t>=T4p?1:0,shock:t<T4p?.6:0,look:1,glow});
    if(send){for(let i=0;i<4;i++){const u=((t-T4m)*1.4+i/4)%1;const [x,y]=bez(p0,p1,p2,p3,u);c.fillStyle=rad(x,y,2,40,[[0,'rgba(255,240,150,.95)'],[1,'rgba(255,240,150,0)']]);c.beginPath();c.arc(x,y,40,0,7);c.fill();bolt(x,y,.9);}
      const bl=.5+.5*Math.sin(t*14);c.save();c.globalAlpha=bl;c.translate(...p3);c.rotate(Math.atan2(p3[1]-p2[1],p3[0]-p2[0]));c.beginPath();c.moveTo(10,0);c.lineTo(-40,-30);c.lineTo(-40,30);c.closePath();fs(Y,6,NV);c.restore();}
    brain(BRx,BRy,135*(1+.04*Math.sin(t*5))*(t>=T4c?punch(t,T4c,.18):1),t,t>=T4c?.7+.3*Math.sin(t*10):.25);
    if(t>=T4s&&t<T4p)pill(BRx-90,BRy-215,back((t-T4s)/.3),'TEORIA DOS CIENTISTAS',Y,NV,34,-.03);
    if(t>=T4u&&t<T4p){const [sx,sy]=shoulder(BX,BY,S);pill(sx+110,sy+130,back((t-T4u)/.3),'MÚSCULO',RED,'#fff',42,.05);}
    if(t>=T4p){pill(BX+40,1230,back((t-T4p)/.3),'VOCÊ: PAROU',RED,'#fff',44,.03);pill(BRx-90,BRy-215,back((t-T4q+.2)/.3),'CÉREBRO: CONTINUA!',GRN,'#fff',38,-.04);}
  });
  if(t<T4c)header('É O EFEITO','KOHNSTAMM!',T4,t,Y);else if(t<T4p)header('O CÉREBRO CONTINUA','MANDANDO O SINAL',T4c,t,'#ffe08a');else header('MESMO DEPOIS','QUE VOCÊ PAROU!',T4p,t,'#ff9a8a');
  flash(t,T4,.55);}
function sceneE(t){// T5–fim: o seu subiu? SIM/NÃO + manda pra quem não acredita
  const k=t-T5;K.sunburst(540,820,'#7a2fd0','#8b3ee0',t*.22,22);dust(t,'255,255,255',30,.5);
  const BX=470,BY=905,S=.7;const a=1.42+.07*Math.sin(t*2.6);
  cam(punch(t,T5)*(t>=T5c?punch(t,T5c,.05):1)*(t>=T5d?punch(t,T5d,.05):1),0,0,()=>{
    motion(BX,BY,S,a,.5,t);boneco(BX,BY,S,t,{aR:a,shock:1,look:1});
    const [hx,hy]=hand(BX,BY,S,a);qmark(hx+10,hy-130,.8,t,.1);
    const pu=1+.06*Math.sin(t*8);
    btn(300,1240,back((t-T5c+.1)/.3)*pu*.78,'SIM',GRN,1,t);btn(780,1240,back((t-T5c-.25)/.3)*pu*.78,'NÃO',RED,0,t);
    if(t>=T5d){const q=clamp((t-T5d)/1.2,0,1);plane(-120+q*1400,980-Math.sin(q*PI)*260,1.1,-.25+q*.5);
      pill(540,400,back((t-T5d-.1)/.3),'MANDA PRA UM AMIGO!',GRN,'#fff',44,.03);}
  });
  header('O SEU BRAÇO','SUBIU?',T5,t,Y,1);
  if(t<T5d)pill(540,400,back((k-.05)/.3),'COMENTA',RED,'#fff',46,-.03);
  flash(t,T5,.45);}
function frame(t){if(t<T2)return sceneA(t);if(t<T3)return sceneB(t);if(t<T4)return sceneC(t);if(t<T5)return sceneD(t);sceneE(t);}
return {frame};};
