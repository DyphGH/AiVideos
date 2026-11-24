export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// cortes (pausas da voz)
const T1=4.25,T2=5.98,T3=10.6,T4=16.55,T5=20.62;
const BLUE=['#0b2f8a','#2f6cf0','#9cc4ff'],RED='#e5484d',GRN='#3ccf73',SKY='#bfe9ff';
// ---------- helpers ----------
function fit(s,x,y,size,maxW,fill='#fff',lw=18){c.font=`900 ${size}px M`;const w=c.measureText(s).width;const k=Math.min(1,maxW/w);text(s,x,y,size*k,fill,lw*Math.max(.7,k));}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);c.restore();text(txt,0,4,size,fg,0);c.restore();}
function header(l1,l2,t0,t,c2=Y){const p=t0<=0?1:back((t-t0)/.35);if(p<=0)return;const pu=1+.025*Math.sin(t*6);c.save();c.translate(540,215);c.scale(p*pu,p*pu);fit(l1,0,-62,78,980,'#fff',18);fit(l2,0,52,118,1000,c2,22);c.restore();}
function dust(t,col='255,255,255',n=40,a=.5){for(let i=0;i<n;i++){const sp=20+(i%7)*9;const x=(i*397+31+Math.sin(t*.6+i)*30)%1080;const y=((i*211+57)-t*sp+4000)%1920;const s=2+(i%4)*1.6;c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(${col},${a*(.4+.6*Math.abs(Math.sin(t*1.3+i)))})`;c.fill();}}
function vign(){c.fillStyle=rad(540,900,300,1300,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.5)']]);c.fillRect(0,0,1080,1920);}
function desk(t){c.fillStyle=lin(0,0,0,1920,[[0,'#0e1b4d'],[.55,'#1a3a8f'],[1,'#0b1638']]);c.fillRect(0,0,1080,1920);
  c.fillStyle=rad(540,820,40,900,[[0,'rgba(120,180,255,.35)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,1080,1920);
  for(let i=0;i<9;i++){const x=(i*233+80)%1080,y=(i*389+200)%1700,r=60+(i%3)*50;c.beginPath();c.arc(x+Math.sin(t*.5+i)*20,y,r,0,7);c.fillStyle=`rgba(150,200,255,${.05+.03*(i%3)})`;c.fill();}
  dust(t,'190,220,255',36,.45);}
function blueprint(t){c.fillStyle=lin(0,0,0,1920,[[0,'#0f3a7d'],[1,'#0a2552']]);c.fillRect(0,0,1080,1920);
  c.save();c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=2;for(let x=0;x<=1080;x+=54){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<=1920;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}
  c.strokeStyle='rgba(255,255,255,.13)';for(let x=0;x<=1080;x+=270){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}c.restore();vign();}
function flash(t,t0){const k=t-t0;if(k<0||k>.25)return;c.fillStyle=`rgba(255,255,255,${.7*(1-k/.25)})`;c.fillRect(0,0,1080,1920);}
function cam(s,x,y,fn){c.save();c.translate(540,900);c.scale(s,s);c.translate(-540+x,-900+y);fn();c.restore();}
function punch(t,t0){const k=t-t0;return k<0?1:1+.08*Math.exp(-k*7);}
function arrowUp(x,y,s,a=1,col=SKY){c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=a;c.beginPath();c.moveTo(0,-34);c.lineTo(26,-6);c.lineTo(10,-6);c.lineTo(10,30);c.lineTo(-10,30);c.lineTo(-10,-6);c.lineTo(-26,-6);c.closePath();fs(col,5,NV);c.restore();}
function check(x,y,s,col=GRN){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.arc(0,0,60,0,7);fs(col,8,NV);c.beginPath();c.moveTo(-28,2);c.lineTo(-8,24);c.lineTo(30,-22);c.lineCap='round';c.lineJoin='round';c.lineWidth=16;c.strokeStyle='#fff';c.stroke();c.restore();}
function heart(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.save();c.shadowColor='rgba(255,80,110,.8)';c.shadowBlur=60;c.beginPath();c.moveTo(0,60);c.bezierCurveTo(-140,-30,-80,-140,0,-70);c.bezierCurveTo(80,-140,140,-30,0,60);c.closePath();fs(rad(-40,-60,5,150,[[0,'#ff9db0'],[.5,'#ff4d6d'],[1,'#c81d3f']]),8,NV);c.restore();
  c.beginPath();c.ellipse(-48,-62,22,12,-.6,0,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.restore();}
function sparkle(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=a;c.beginPath();for(let i=0;i<8;i++){const ang=i*Math.PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
// ---------- tampa de caneta (ponta com furo em cima, aberta em baixo) ----------
function cap(x,y,s,rot,t,o={}){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);const al=o.alpha??1;
  if(!o.noShadow){c.save();c.globalAlpha=.35*al;c.beginPath();c.ellipse(30,330,90,22,0,0,7);c.fillStyle='rgba(0,0,0,.6)';c.filter='blur(10px)';c.fill();c.restore();}
  c.save();c.globalAlpha=al;
  const body=()=>{c.beginPath();c.moveTo(-62,300);c.lineTo(-54,-215);c.bezierCurveTo(-54,-305,54,-305,54,-215);c.lineTo(62,300);c.closePath();};
  body();fs(lin(-62,0,62,0,[[0,BLUE[0]],[.28,BLUE[1]],[.5,BLUE[2]],[.7,BLUE[1]],[1,BLUE[0]]]),7,NV);
  // aneis de grip
  c.save();body();c.clip();c.strokeStyle='rgba(13,22,54,.35)';c.lineWidth=4;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-70,215+i*20);c.lineTo(70,215+i*20);c.stroke();}
  c.fillStyle=lin(0,-300,0,300,[[0,'rgba(255,255,255,.0)'],[.5,'rgba(255,255,255,.0)'],[1,'rgba(0,0,0,.25)']]);c.fillRect(-70,-310,140,620);c.restore();
  // brilho
  c.beginPath();c.roundRect(-36,-230,14,480,7);c.fillStyle='rgba(255,255,255,.5)';c.fill();c.beginPath();c.ellipse(-16,-262,18,8,-.3,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  // boca da tampa
  c.beginPath();c.ellipse(0,300,62,15,0,0,7);fs('#0a1f5e',5,NV);
  // clipe
  c.beginPath();c.moveTo(48,-200);c.quadraticCurveTo(96,-205,96,-160);c.lineTo(94,150);c.quadraticCurveTo(94,175,78,178);c.lineTo(70,178);c.lineTo(64,-150);c.closePath();fs(lin(60,0,100,0,[[0,'#1d4fc4'],[.5,'#6fa2ff'],[1,'#14378f']]),6,NV);
  c.beginPath();c.ellipse(84,168,14,12,0,0,7);fs('#1d4fc4',5,NV);
  // furo
  const hy=-262;if(o.glow){const g=o.glow*(0.75+.25*Math.sin(t*8));c.save();c.globalCompositeOperation='lighter';c.fillStyle=rad(0,hy,2,90,[[0,`rgba(255,240,140,${g})`],[1,'rgba(255,210,31,0)']]);c.beginPath();c.arc(0,hy,90,0,7);c.fill();c.restore();}
  c.beginPath();c.ellipse(0,hy,15,11,0,0,7);fs('#050b24',4,NV);c.beginPath();c.ellipse(-4,hy-3,5,3,0,0,7);c.fillStyle='rgba(255,255,255,.35)';c.fill();
  if(o.face){const e=o.face;c.save();c.translate(0,-20);for(const ex of [-24,24]){c.beginPath();c.ellipse(ex,0,15,19,0,0,7);fs('#fff',5,NV);c.beginPath();c.arc(ex+(e.look||0)*6,3,8,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ex+(e.look||0)*6+3,-1,3,0,7);c.fillStyle='#fff';c.fill();}
    c.beginPath();if(e.sad){c.arc(0,58,16,Math.PI+.3,-.3);}else c.arc(0,34,18,.2,Math.PI-.2);c.lineWidth=6;c.strokeStyle=NV;c.lineCap='round';c.stroke();
    for(const ex of [-44,44]){c.beginPath();c.ellipse(ex,30,11,6,0,0,7);c.fillStyle='rgba(255,120,160,.55)';c.fill();}c.restore();}
  c.restore();c.restore();}
// ---------- carinha ----------
function face(x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate(o.shake?Math.sin(t*22)*.12*o.shake:0);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=40;c.shadowOffsetY=18;c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),9,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.55,r*.26,r*.12,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const lk=o.look||0;for(const ex of [-.34,.34]){if(o.wink&&ex>0){c.beginPath();c.arc(ex*r,-r*.12,r*.12,Math.PI+.3,-.3);c.lineWidth=r*.06;c.strokeStyle=NV;c.lineCap='round';c.stroke();continue;}
    c.beginPath();c.ellipse(ex*r,-r*.14,r*.13,r*.17,0,0,7);fs('#fff',r*.04,NV);c.beginPath();c.arc(ex*r+lk*r*.05,-r*.1,r*.075,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ex*r+lk*r*.05+r*.03,-r*.14,r*.025,0,7);c.fillStyle='#fff';c.fill();}
  if(o.brow){c.lineWidth=r*.05;c.strokeStyle=NV;c.lineCap='round';c.beginPath();c.moveTo(-r*.48,-r*.38);c.lineTo(-r*.2,-r*.48);c.moveTo(r*.48,-r*.38);c.lineTo(r*.2,-r*.48);c.stroke();}
  c.beginPath();if(o.mouth==='o'){c.ellipse(0,r*.38,r*.1,r*.13,0,0,7);fs('#7a2335',r*.04,NV);}else{c.arc(0,r*.22,r*.3,.25,Math.PI-.25);c.lineWidth=r*.065;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  for(const ex of [-.58,.58]){c.beginPath();c.ellipse(ex*r,r*.2,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}c.restore();}
function stop(x,y,s,rot=0){if(s<=0)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;c.lineTo(Math.cos(a)*150,Math.sin(a)*150);}c.closePath();fs('#fff',10,NV);c.restore();
  c.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4;c.lineTo(Math.cos(a)*128,Math.sin(a)*128);}c.closePath();fs(lin(0,-128,0,128,[[0,'#ff6b6f'],[1,'#c4262b']]),0);text('NÃO!',0,8,78,'#fff',0);c.restore();}
// ---------- caneta transparente (eixo x: cauda -440 → ponta +440) ----------
function pen(ink,t,o={}){
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=40;c.shadowOffsetY=24;c.beginPath();c.roundRect(-405,-54,710,108,20);c.fillStyle='rgba(200,225,255,.28)';c.fill();c.restore();
  // carga
  c.beginPath();c.roundRect(-390,-13,750,26,10);fs('rgba(255,255,255,.55)',3,'rgba(13,22,54,.6)');
  c.beginPath();c.roundRect(ink,-10,365-ink,20,8);c.fillStyle=lin(0,-10,0,10,[[0,'#4a74ff'],[.5,'#1e3fc2'],[1,'#0f2580']]);c.fill();
  // bolhas de ar a seguir a tinta
  for(let i=0;i<4;i++){const bx=ink-22-i*34+Math.sin(t*5+i)*3;if(bx>-385){c.beginPath();c.arc(bx,0,6-i,0,7);c.fillStyle='rgba(191,233,255,.85)';c.fill();}}
  // corpo transparente
  c.beginPath();c.roundRect(-405,-54,710,108,20);c.fillStyle=lin(0,-54,0,54,[[0,'rgba(230,242,255,.55)'],[.25,'rgba(255,255,255,.12)'],[.6,'rgba(190,215,255,.2)'],[1,'rgba(120,150,210,.45)']]);c.fill();c.lineWidth=6;c.strokeStyle=NV;c.stroke();
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=3;for(const yy of [-22,20]){c.beginPath();c.moveTo(-395,yy);c.lineTo(296,yy);c.stroke();}
  c.beginPath();c.roundRect(-380,-44,660,10,5);c.fillStyle='rgba(255,255,255,.7)';c.fill();
  // cone + ponta
  c.beginPath();c.moveTo(300,-50);c.lineTo(410,-16);c.lineTo(410,16);c.lineTo(300,50);c.closePath();fs(lin(0,-50,0,50,[[0,'rgba(230,242,255,.7)'],[1,'rgba(130,160,220,.6)']]),6,NV);
  c.beginPath();c.moveTo(405,-15);c.lineTo(448,-6);c.lineTo(448,6);c.lineTo(405,15);c.closePath();fs(lin(0,-15,0,15,[[0,'#f4f6fa'],[.5,'#a9b1bf'],[1,'#5e6675']]),4,NV);
  c.beginPath();c.arc(452,0,7,0,7);fs('#c9ced8',3,NV);
  // tampinha traseira
  c.beginPath();c.roundRect(-445,-44,52,88,14);fs(lin(0,-44,0,44,[[0,'#6fa2ff'],[.5,'#2f6cf0'],[1,'#0b2f8a']]),6,NV);
  // furo lateral
  const hx=-40;if(o.glow){const g=o.glow*(.75+.25*Math.sin(t*8));c.save();c.globalCompositeOperation='lighter';c.fillStyle=rad(hx,-30,2,80,[[0,`rgba(255,240,140,${g})`],[1,'rgba(255,210,31,0)']]);c.beginPath();c.arc(hx,-30,80,0,7);c.fill();c.restore();}
  c.beginPath();c.ellipse(hx,-30,11,9,0,0,7);fs('#0a1f5e',4,NV);}
// ---------- scenes ----------
function sceneA(t){// 0 – T2: gancho + salvar vidas
  const B=t>=T1;
  if(!B){desk(t);}else{K.sunburst(540,860,'#0d2a7a','#143894',t*.15,22);dust(t,'255,240,180',30,.6);}
  const z=(B?1.0:1+.12*ease(t/4))*punch(t,T1);
  cam(z,0,B?0:40*ease(t/4),()=>{
    const sway=Math.sin(t*1.6)*.07;const cx=B?420:540,cy=B?950:1000,s=B?1.15:1.38;
    cap(cx,cy,s,B?-.18+sway*.5:sway,t,{glow:1});
    if(!B){// seta "ISTO?"
      const hx=cx+Math.sin(sway)*262*s,hy=cy-Math.cos(sway)*262*s;const a=.55+.45*Math.sin(t*9);
      c.save();c.strokeStyle=`rgba(255,210,31,${a})`;c.lineWidth=10;c.beginPath();c.arc(hx,hy,52+6*Math.sin(t*9),0,7);c.stroke();c.restore();
      const q=t<.01?1:Math.min(1,.85+t);c.save();c.translate(840,560);c.scale(q,q);c.lineWidth=12;c.strokeStyle=NV;c.lineCap='round';
      c.beginPath();c.moveTo(-60,40);c.quadraticCurveTo(-150,80,hx-840+70,hy-560-10);c.stroke();c.lineWidth=7;c.strokeStyle=Y;c.stroke();
      c.restore();pill(850,540,1+.04*Math.sin(t*7),'ISTO?',Y,NV,64,.08);
      // "secar a tinta?" riscado
      if(t>2.6){const p=back((t-2.6)/.3);
        pill(540,1200,p,'SECAR A TINTA?','#fff',NV,54,-.04);
        if(t>3.15){const x=clamp((t-3.15)/.25,0,1);c.save();c.translate(540,1200);c.rotate(-.04);c.lineCap='round';c.lineWidth=22;c.strokeStyle=RED;c.beginPath();c.moveTo(-270,0);c.lineTo(-270+540*x,0);c.stroke();c.restore();
          if(t>3.4)pill(820,1085,back((t-3.4)/.3),'NÃO!',RED,'#fff',60,.1);}}
    }else{const k=t-T1;const hs=back(k/.35)*(1+.12*Math.max(0,Math.sin(k*9)));
      for(let i=0;i<10;i++){const a=i/10*Math.PI*2+k*.6,r=170+ease(k/.5)*120;sparkle(760+Math.cos(a)*r,820+Math.sin(a)*r*.9,26+8*Math.sin(k*8+i),clamp(k*3,0,1)*(.6+.4*Math.sin(k*6+i)));}
      heart(760,840,1.55*hs);
      // pulso de vida
      if(k>.3){const p=clamp((k-.3)/.8,0,1);c.save();c.translate(560,1240);c.lineWidth=12;c.lineCap='round';c.lineJoin='round';c.strokeStyle='#ff6b81';c.shadowColor='#ff6b81';c.shadowBlur=20;c.beginPath();
        const pts=[[-380,0],[-120,0],[-80,-70],[-30,90],[20,-140],[70,40],[110,0],[380,0]];let L=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d;}
        let rem=L*p;c.moveTo(...pts[0]);for(let i=1;i<pts.length;i++){if(rem>=seg[i-1]){c.lineTo(...pts[i]);rem-=seg[i-1];}else{const f=rem/seg[i-1];c.lineTo(pts[i-1][0]+(pts[i][0]-pts[i-1][0])*f,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f);break;}}c.stroke();c.restore();}
    }});
  header('O FURINHO DA TAMPA','SALVA VIDAS!',0,t);
  flash(t,T1);}
function sceneC(t){const k=t-T2;blueprint(t);
  cam(punch(t,T2)*(1+.05*ease(k/4.5)),0,0,()=>{
    // tubo esquemático
    const top=360,bot=1380,hw=66;c.save();
    c.beginPath();c.roundRect(540-hw-34,top,2*hw+68,bot-top,40);c.fillStyle=lin(0,0,1080,0,[[0,'#f7b6b6'],[.5,'#ffd9d0'],[1,'#f7b6b6']]);c.fill();c.lineWidth=7;c.strokeStyle=NV;c.stroke();
    c.beginPath();c.rect(540-hw,top-10,2*hw,bot-top+20);c.fillStyle=lin(540-hw,0,540+hw,0,[[0,'#ffe9e2'],[.5,'#fff6f2'],[1,'#ffe9e2']]);c.fill();
    c.strokeStyle='rgba(13,22,54,.55)';c.lineWidth=5;c.beginPath();c.moveTo(540-hw,top);c.lineTo(540-hw,bot);c.moveTo(540+hw,top);c.lineTo(540+hw,bot);c.stroke();
    // cotas tipo planta
    c.strokeStyle='rgba(255,255,255,.5)';c.setLineDash([12,10]);c.lineWidth=3;c.beginPath();c.moveTo(540,top-40);c.lineTo(540,top-5);c.moveTo(540,bot+5);c.lineTo(540,bot+40);c.stroke();c.setLineDash([]);c.restore();
    c.save();c.translate(255,860);c.rotate(-Math.PI/2);pill(0,0,1,'TUBO DO AR','#fff',NV,40);c.restore();
    // tampa a descer e a entalar
    const yin=-300+ease(clamp((k-.05)/1.25,0,1))*1110;let jig=0;if(k>1.1&&k<2.0)jig=Math.sin((k-1.1)*40)*10*(1-(k-1.1)/.9);
    const cy=Math.min(yin,810)+(k>1.2?0:0);const air=k>2.42;
    cap(540+jig,cy,.86,0,t,{alpha:air?.78:.95,noShadow:1,glow:air?.8:0});
    if(k>1.15&&k<2.4){const q=back((k-1.15)/.25);for(const sd of [-1,1])for(let i=0;i<3;i++){c.save();c.translate(540+sd*140,620+i*60);c.scale(q,q);c.rotate(sd*(i-1)*.25);c.fillStyle=Y;c.fillRect(sd>0?0:-60,-6,60,12);c.restore();}
      c.save();c.translate(800,640);c.scale(q,q);c.beginPath();c.arc(0,0,58,0,7);fs(Y,7,NV);text('!',0,6,84,NV,0);c.restore();}
    if(air){const a=k-2.42;const hy=810-262*.86,by=810+300*.86;
      for(let i=0;i<34;i++){const ph=((a*.55+i/34)%1);const off=((i*37)%11-5)/5;let y=1400-ph*1150,x;
        if(y>by){x=540+off*55;}else if(y>hy){x=540+off*(14+30*clamp((y-hy)/(by-hy),0,1));}else{x=540+off*(14+(hy-y)*.35);}
        const al=clamp(a*2,0,1)*Math.sin(ph*Math.PI);c.beginPath();c.arc(x,y,5+(i%3)*2.5,0,7);c.fillStyle=`rgba(80,190,255,${al})`;c.fill();c.beginPath();c.arc(x,y,2.5,0,7);c.fillStyle=`rgba(255,255,255,${al})`;c.fill();}
      for(let i=0;i<4;i++){const ph=((a*.7+i/4)%1);const y=bot-ph*1000;arrowUp(540+(y<hy?(i%2?-1:1)*(hy-y)*.25:0),y,1.1,clamp(a*2,0,1)*Math.sin(ph*Math.PI),'#7fd3ff');}
      check(840,520,back((a-.3)/.35));
      pill(830,1260,back((a-.15)/.35),'O AR PASSA',GRN,'#fff',46,-.05);}
  });
  if(k<2.42)header('E SE ALGUÉM','ENGOLIR A TAMPA?',T2,t,'#ffb3c0');else header('O FURO DEIXA','O AR PASSAR!',T2+2.42,t,'#7fd3ff');
  flash(t,T2);}
function sceneD(t){const k=t-T3;K.sunburst(540,860,'#0e5a63','#127079',t*.1,20);dust(t,'200,255,250',30,.45);
  const zoomIn=ease(clamp((k-2.05)/.6,0,1))*(1-ease(clamp((k-3.45)/.5,0,1)));
  const ang=1.12,cx=540,cy=820;
  const wr=clamp((k-3.6)/2.3,0,1);const dx=-170+ease(wr)*240*(wr>0?1:0)+(wr<=0?0:0);const px=cx+(k>3.6?dx:-170)+(k<3.6?0:0);
  const hx=px+Math.cos(ang)*-40-Math.sin(ang)*-30,hy=cy+Math.sin(ang)*-40+Math.cos(ang)*-30;
  const z=punch(t,T3)*(1+1.0*zoomIn);
  c.save();c.translate(540,900);c.scale(z,z);c.translate(-(540+(hx-540)*zoomIn),-(900+(hy-900)*zoomIn));
  // papel
  c.save();c.translate(540,1270);c.rotate(-.04);c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=30;c.shadowOffsetY=14;c.beginPath();c.roundRect(-430,-110,860,230,16);fs('#fdfcf6',6,NV);c.restore();
  c.strokeStyle='rgba(80,140,220,.35)';c.lineWidth=3;for(let y=-60;y<=90;y+=50){c.beginPath();c.moveTo(-410,y);c.lineTo(410,y);c.stroke();}c.strokeStyle='rgba(229,72,77,.5)';c.beginPath();c.moveTo(-340,-110);c.lineTo(-340,120);c.stroke();c.restore();
  // traço escrito
  const tipAt=(xx)=>[xx+Math.cos(ang)*452,cy+Math.sin(ang)*452];
  if(k>3.6){c.save();c.lineWidth=9;c.lineCap='round';c.lineJoin='round';c.strokeStyle='#1e3fc2';c.beginPath();const n=60;for(let i=0;i<=n;i++){const w=ease(wr*i/n);const xx=cx-170+w*240;const [tx,ty]=tipAt(xx);const yy=ty+Math.sin(i/n*wr*26)*16;i?c.lineTo(tx,yy):c.moveTo(tx,yy);}c.stroke();c.restore();}
  const wob=k>3.6&&wr<1?Math.sin(k*26)*.02:0;
  c.save();c.translate(px,cy+(k>3.6&&wr<1?Math.sin(k*26)*8:0));c.rotate(ang+wob);const ink=-260+ease(clamp((k-3.6)/2.2,0,1))*150;pen(ink,t,{glow:k>.2?1:0});
  // ar a entrar pelo furo
  if(k>1.85){const a=k-1.85;for(let i=0;i<14;i++){const ph=(a*.9+i/14)%1;const r=220*(1-ph);const ang2=-Math.PI/2+((i*53)%9-4)*.12;const x=-40+Math.cos(ang2)*r,y=-30+Math.sin(ang2)*r;const al=clamp(a*2,0,1)*Math.sin(ph*Math.PI);
    c.beginPath();c.arc(x,y,7+(i%3)*2,0,7);c.fillStyle=`rgba(127,211,255,${al})`;c.fill();c.beginPath();c.arc(x,y,3,0,7);c.fillStyle=`rgba(255,255,255,${al})`;c.fill();}
    for(let i=0;i<2;i++){const ph=(a*.8+i/2)%1;c.save();c.translate(-40,-30-150*(1-ph)-40);c.rotate(Math.PI);arrowUp(0,0,1.1,clamp(a*2,0,1)*Math.sin(ph*Math.PI),'#7fd3ff');c.restore();}}
  c.restore();
  c.restore();
  if(k>1.0&&k<3.45){const q=back((k-1.0)/.3);pill(810,560,q,'FURO!',Y,NV,52,.08);}
  if(k>5.0)check(860,1060,back((k-5.0)/.35));
  if(k>5.0)pill(300,1080,back((k-5.05)/.35),'NÃO VAZA',GRN,'#fff',50,-.05);
  if(k<2.1)header('E O FURINHO','DO CORPO?',T3,t);else if(k<3.55)header('ELE DEIXA','O AR ENTRAR…',T3+2.1,t,'#7fd3ff');else header('E A TINTA','DESCE CERTINHO!',T3+3.55,t,'#9db6ff');
  flash(t,T3);}
function sceneE(t){const k=t-T4;K.sunburst(540,900,'#5b2a86','#6b35a0',t*.12,20);dust(t,'255,220,255',30,.45);
  const no=k>1.4,ok=k>3.15;
  cam(punch(t,T4)*(1+.04*ease(k/4)),0,0,()=>{
    face(330,960,200,t,{look:no?0:1,mouth:no&&!ok?'o':'smile',brow:no&&!ok,shake:no&&!ok&&k<2.4?1:0,wink:ok});
    const capX=no?800+ease((k-1.4)/.3)*40:760-Math.sin(k*3)*10;cap(capX,980,.72,no?.35:.15+Math.sin(t*3)*.08,t,{face:{look:-1,sad:no&&!ok}});
    if(!no){const q=back((k-.2)/.3);c.save();c.translate(560,660);c.scale(q,q);c.beginPath();c.arc(0,0,64,0,7);fs('#fff',7,NV);text('?',0,6,90,NV,0);c.restore();}
    if(no&&!ok){const q=back((k-1.4)/.35);stop(560,690,q*(1+.04*Math.sin(t*10)),-.08);}
    if(ok){const q=back((k-3.15)/.35);c.save();c.translate(560,660);c.scale(q,q);c.beginPath();c.arc(0,0,120,0,7);fs(GRN,9,NV);c.beginPath();c.moveTo(-56,4);c.lineTo(-16,46);c.lineTo(60,-44);c.lineCap='round';c.lineJoin='round';c.lineWidth=30;c.strokeStyle='#fff';c.stroke();c.restore();}
  });
  if(!no)header('MAS ATENÇÃO:','MESMO ASSIM…',T4,t,'#ffb3c0');else header('TAMPA DE CANETA','NÃO VAI NA BOCA!',T4+1.4,t,'#ff8a8f');
  flash(t,T4);}
function sceneF(t){const k=t-T5;K.sunburst(540,820,'#ffcf3f','#ffbe1a',t*.2,20);
  cam(punch(t,T5),0,0,()=>{cap(540,820,1.05,Math.sin(t*2.2)*.12,t,{glow:1});
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2+t*.8;sparkle(540+Math.cos(a)*330,640+Math.sin(a)*120,22,.7+.3*Math.sin(t*6+i));}});
  header('VOCÊ JÁ','SABIA?',T5,t,'#fff');
  const pu=1+.05*Math.sin(t*8);pill(310,1220,back((k-1.9)/.3)*pu,'SIM',GRN,'#fff',70,-.05);pill(770,1220,back((k-2.4)/.3)*pu,'NÃO',RED,'#fff',70,.05);
  if(k>.2)pill(540,1360,back((k-.2)/.3),'COMENTA ↓','#fff',NV,44);
  flash(t,T5);}
function frame(t){if(t<T2)return sceneA(t);if(t<T3)return sceneC(t);if(t<T4)return sceneD(t);if(t<T5)return sceneE(t);sceneF(t);}
return {frame};};
