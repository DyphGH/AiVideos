export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// cortes (pausas da voz)
const A1=5.09,TB=6.87,TB2=8.90,TBF=9.9,TC=11.81,TC2=14.53,TC3=16.77,TD=18.03,TD2=21.57,TE=23.30,TE2=24.28,TE3=26.70,TE4=28.65,TF=29.67,TF2=31.39,TG=33.53,TG2=35.78,TH=37.82;
const RED='#e5484d',GRN='#3ccf73',BLU='#2f6cf0';
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
function blueprint(){c.fillStyle=lin(0,0,0,1920,[[0,'#0f3a7d'],[1,'#0a2552']]);c.fillRect(0,0,1080,1920);
  c.save();c.strokeStyle='rgba(255,255,255,.07)';c.lineWidth=2;for(let x=0;x<=1080;x+=54){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<=1920;y+=54){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.restore();vign();}
function burst(x,y,s,txt,rot=0,bg='#fff',fg=RED,size=74){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,r=i%2?100:145+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.25,Math.sin(a)*r*.8);}c.closePath();fs(bg,8,NV);c.restore();
  fit(txt,0,6,size,280,fg,14);c.restore();}
function sun(x,y,r,t,a=1){c.save();c.globalAlpha=a;c.translate(x,y);c.rotate(t*.6);c.fillStyle='#ffd21f';for(let i=0;i<12;i++){c.save();c.rotate(i*Math.PI/6);c.beginPath();c.roundRect(r*1.15,-r*.12,r*.5,r*.24,r*.12);fs('#ffd21f',5,NV);c.restore();}
  c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.3,-r*.3,2,r*1.1,[[0,'#fff7b0'],[.6,'#ffd21f'],[1,'#f2a20d']]),7,NV);c.restore();}
function moon(x,y,r,a=1){c.save();c.globalAlpha=a;c.translate(x,y);c.beginPath();c.arc(0,0,r,.6,Math.PI*1.75+.3);c.arc(r*.45,-r*.25,r*.8,Math.PI*1.6,.85,true);c.closePath();fs('#f3f0ff',6,NV);c.restore();}
// ---------- olho (de frente) ----------
function eyeball(x,y,r,o={}){c.save();c.translate(x,y);
  c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.3,-r*.35,r*.05,r*1.05,[[0,'#ffffff'],[.7,'#eef1f7'],[1,'#c9d0de']]),Math.max(3,r*.05),NV);
  if(o.veins){c.strokeStyle='rgba(229,72,77,.35)';c.lineWidth=r*.012;for(let i=0;i<6;i++){const a=i*1.05+.3;c.beginPath();c.moveTo(Math.cos(a)*r*.95,Math.sin(a)*r*.95);c.quadraticCurveTo(Math.cos(a+.2)*r*.8,Math.sin(a+.2)*r*.8,Math.cos(a-.1)*r*.66,Math.sin(a-.1)*r*.66);c.stroke();}}
  const lx=(o.look||0)*r*.18,ly=(o.lookY||0)*r*.18;
  const ir=(o.iris||0);if(ir>0){const R=r*.56*ir;c.save();c.translate(lx,ly);c.beginPath();c.arc(0,0,R,0,7);fs(rad(0,0,R*.2,R,[[0,'#7fe0c8'],[.5,'#2aa4b8'],[1,'#13607a']]),Math.max(2,r*.03),NV);
    c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=Math.max(1,r*.012);for(let i=0;i<24;i++){const a=i/24*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*R*.35,Math.sin(a)*R*.35);c.lineTo(Math.cos(a)*R*.92,Math.sin(a)*R*.92);c.stroke();}c.restore();}
  const p=o.pupil||0;if(p>0){c.beginPath();c.arc(lx,ly,r*p,0,7);c.fillStyle='#070b1f';c.fill();}
  if(o.dizzy){c.save();c.translate(lx,ly);c.rotate(o.dizzy*6);c.strokeStyle=NV;c.lineWidth=Math.max(2,r*.07);c.lineCap='round';c.beginPath();for(let i=0;i<40;i++){const a=i*.45,rr=r*.04+i*r*.016;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.stroke();c.restore();}
  if(p>0||ir>0){c.beginPath();c.ellipse(lx-r*.18,ly-r*.2,r*.11,r*.07,-.6,0,7);c.fillStyle='rgba(255,255,255,.9)';c.fill();}
  else{c.beginPath();c.ellipse(-r*.35,-r*.42,r*.22,r*.1,-.6,0,7);c.fillStyle='rgba(255,255,255,.8)';c.fill();}
  c.restore();}
// ---------- boneco ----------
function boneco(x,y,s,t,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);c.scale(s,s);
  if(!o.noShadow){c.save();c.globalAlpha=.35;c.beginPath();c.ellipse(0,330,200,36,0,0,7);c.fillStyle='rgba(0,0,0,.55)';c.filter='blur(8px)';c.fill();c.restore();}
  const arm=o.arms??.3;
  for(const sd of [-1,1]){c.save();c.translate(sd*150,40);c.rotate(-sd*arm+(o.armWave?Math.sin(t*8+sd)*.15:0));c.beginPath();c.roundRect(-34,-10,68,200,34);fs('#2f6cf0',7,NV);c.beginPath();c.arc(0,200,40,0,7);fs('#ffd23f',7,NV);c.restore();}
  for(const sd of [-1,1]){c.beginPath();c.roundRect(sd*70-34,290,68,90,20);fs('#1d2a5c',6,NV);}
  c.beginPath();c.moveTo(-160,20);c.quadraticCurveTo(0,-30,160,20);c.lineTo(175,300);c.quadraticCurveTo(0,330,-175,300);c.closePath();fs(lin(-170,0,170,0,[[0,'#1e4fc9'],[.5,'#3b7bff'],[1,'#1e4fc9']]),8,NV);
  // cabeça
  c.save();c.translate(0,-140);const r=140;
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),9,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.6,r*.24,r*.1,-.5,0,7);c.fillStyle='rgba(255,255,255,.5)';c.fill();
  const e=o.eye||{};for(const ex of [-.34,.34]){if(o.wink&&ex>0){c.beginPath();c.arc(ex*r,-r*.14,r*.14,Math.PI+.3,-.3);c.lineWidth=r*.06;c.strokeStyle=NV;c.lineCap='round';c.stroke();continue;}
    if(o.shut){c.beginPath();c.moveTo(ex*r-r*.16,-r*.14);c.lineTo(ex*r+r*.16,-r*.14);c.lineWidth=r*.07;c.strokeStyle=NV;c.lineCap='round';c.stroke();continue;}
    eyeball(ex*r,-r*.14,r*.22,e);}
  for(const ex of [-.6,.6]){c.beginPath();c.ellipse(ex*r,r*.2,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}
  c.beginPath();if(o.mouth==='o'){c.ellipse(0,r*.42,r*.1,r*.13,0,0,7);fs('#7a2335',r*.035,NV);}else if(o.mouth==='sad'){c.arc(0,r*.55,r*.2,Math.PI+.4,-.4);c.lineWidth=r*.06;c.strokeStyle=NV;c.lineCap='round';c.stroke();}else{c.arc(0,r*.22,r*.3,.25,Math.PI-.25);c.lineWidth=r*.065;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  c.restore();c.restore();}
// ---------- paisagem (o que o boneco vê) ----------
function landscape(w,h,t){c.fillStyle=lin(0,-h/2,0,h/2,[[0,'#7cc8ff'],[.6,'#bfe6ff'],[1,'#bfe6ff']]);c.fillRect(-w/2,-h/2,w,h);
  sun(w*.3,-h*.28,h*.09,t);
  c.fillStyle='#4cc26a';c.beginPath();c.moveTo(-w/2,h*.12);c.quadraticCurveTo(0,h*.02,w/2,h*.14);c.lineTo(w/2,h/2);c.lineTo(-w/2,h/2);c.closePath();c.fill();
  // casa
  c.save();c.translate(-w*.2,h*.12);c.beginPath();c.rect(-90,-130,180,130);fs('#fff3e0',6,NV);c.beginPath();c.moveTo(-110,-125);c.lineTo(0,-215);c.lineTo(110,-125);c.closePath();fs(RED,6,NV);c.beginPath();c.roundRect(-25,-70,50,70,6);fs('#8a4b2a',5,NV);c.beginPath();c.rect(35,-105,40,36);fs('#7fd3ff',5,NV);c.restore();
  // árvore
  c.save();c.translate(w*.22,h*.16);c.beginPath();c.roundRect(-18,-110,36,110,8);fs('#8a4b2a',5,NV);for(const [dx,dy,rr] of [[0,-190,80],[-55,-140,60],[55,-140,60]]){c.beginPath();c.arc(dx,dy,rr,0,7);fs('#2f9e4f',5,NV);}c.restore();}
function viewPanel(x,y,w,h,t,o={}){c.save();c.translate(x,y);c.scale(o.s??1,o.s??1);
  c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();c.roundRect(-w/2-14,-h/2-14,w+28,h+28,36);fs('#fff',8,NV);c.restore();
  c.save();c.beginPath();c.roundRect(-w/2,-h/2,w,h,24);c.clip();c.rotate(o.rot||0);if(o.blur)c.filter=`blur(${o.blur}px)`;landscape(w+40,h+40,t);c.filter='none';
  if(o.white){c.fillStyle=`rgba(255,255,240,${o.white})`;c.fillRect(-w,-h,2*w,2*h);}if(o.dark){c.fillStyle=`rgba(5,8,25,${o.dark})`;c.fillRect(-w,-h,2*w,2*h);}c.restore();
  if(o.label)pill(0,-h/2-10,1,o.label,NV,'#fff',34);c.restore();}
// ---------- olho em corte (de lado): luz entra pela esquerda ----------
function tree(x,y,s,rot=0,a=1){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.globalAlpha=a;c.beginPath();c.roundRect(-16,-10,32,110,8);fs('#8a4b2a',5,NV);for(const [dx,dy,rr] of [[0,-80,70],[-48,-40,52],[48,-40,52]]){c.beginPath();c.arc(dx,dy,rr,0,7);fs('#2f9e4f',5,NV);}c.restore();}
function sideEye(cx,cy,R,t,o={}){c.save();
  // nervo
  if(o.nerve!==false){c.beginPath();c.moveTo(cx+R*.9,cy+R*.15);c.quadraticCurveTo(cx+R*1.25,cy+R*.2,cx+R*1.4,cy+R*.05);c.lineWidth=R*.2;c.strokeStyle=NV;c.lineCap='round';c.stroke();c.lineWidth=R*.14;c.strokeStyle='#ffcf6b';c.stroke();}
  c.beginPath();c.arc(cx,cy,R,0,7);fs(rad(cx-R*.3,cy-R*.3,R*.1,R*1.05,[[0,'#ffffff'],[1,'#dfe5f0']]),8,NV);
  c.beginPath();c.arc(cx,cy,R*.9,0,7);c.fillStyle='rgba(200,235,255,.45)';c.fill();
  // retina (fundo, lado direito)
  const rg=o.retina||0;c.beginPath();c.arc(cx,cy,R*.88,-1.0,1.0);c.lineWidth=R*.09;c.strokeStyle=rg>0?`rgba(255,110,150,${.55+.45*rg})`:'rgba(255,140,170,.5)';c.lineCap='round';c.stroke();
  if(rg>0){c.save();c.globalAlpha=rg*(.5+.5*Math.sin(t*8));c.shadowColor='#ff6b9a';c.shadowBlur=30;c.stroke();c.restore();}
  // córnea + íris + furo
  c.beginPath();c.arc(cx-R*.86,cy,R*.36,Math.PI*.62,Math.PI*1.38);c.lineWidth=7;c.strokeStyle=NV;c.stroke();
  for(const sd of [-1,1]){c.beginPath();c.roundRect(cx-R*.86-10,cy+sd*R*.1+(sd<0?-R*.26:0),22,R*.26,8);fs('#2aa4b8',5,NV);}
  // lente
  const L=o.lens??0;if(L>0){const ly=cy-(1-ease(L))*R*1.6;c.save();c.globalAlpha=Math.min(1,L*3);c.beginPath();c.ellipse(cx-R*.62,ly,R*.11,R*.3,0,0,7);fs(rad(cx-R*.65,ly-R*.1,4,R*.35,[[0,'rgba(255,255,255,.95)'],[1,'rgba(150,200,255,.75)']]),6,NV);c.restore();}
  c.restore();}
function ray(pts,col,a=1,w=7){c.save();c.globalAlpha=a;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.lineWidth=w+6;c.strokeStyle=NV;c.stroke();c.lineWidth=w;c.strokeStyle=col;c.stroke();c.restore();}
function partial(pts,p){// recorta a linha até a fração p
  let L=0;const seg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);seg.push(d);L+=d;}let rem=L*clamp(p,0,1);const out=[pts[0]];
  for(let i=1;i<pts.length;i++){if(rem>=seg[i-1]){out.push(pts[i]);rem-=seg[i-1];}else{const f=rem/seg[i-1];out.push([pts[i-1][0]+(pts[i][0]-pts[i-1][0])*f,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*f]);break;}}return out;}
function brainIcon(x,y,s,t,glow=0){c.save();c.translate(x,y);c.scale(s,s);c.rotate(Math.sin(t*3)*.05);
  if(glow>0){c.save();c.globalAlpha=glow;c.fillStyle=rad(0,0,40,240,[[0,'rgba(255,220,120,.8)'],[1,'rgba(255,220,120,0)']]);c.fillRect(-260,-260,520,520);c.restore();}
  c.beginPath();c.ellipse(0,0,150,110,0,0,7);fs(rad(-40,-40,10,170,[[0,'#ffd6e8'],[.6,'#ff9ccc'],[1,'#e56aa8']]),8,NV);
  c.strokeStyle='rgba(160,40,100,.45)';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(0,-105);c.lineTo(0,100);c.stroke();
  for(const sd of [-1,1]){c.beginPath();c.moveTo(sd*30,-60);c.bezierCurveTo(sd*80,-80,sd*110,-30,sd*70,0);c.bezierCurveTo(sd*120,20,sd*100,70,sd*40,60);c.stroke();}c.restore();}
// ---------- cenas ----------
function sceneA(t){// bola no lugar do olho, tudo escuro
  c.fillStyle='#05081a';c.fillRect(0,0,1080,1920);c.fillStyle=rad(540,980,40,620,[[0,'rgba(120,140,255,.22)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,1080,1920);dust(t,'160,170,255',24,.35);
  const sway=Math.sin(t*3.2);const lit=t>A1;
  cam(1.04+.05*ease(t/6.8),0,0,()=>{
    boneco(540+sway*40,1080,1.15,t,{eye:{},arms:1.35+.15*Math.sin(t*6),mouth:'o',rot:sway*.06});
    // pontos de interrogação
    for(let i=0;i<3;i++){c.save();c.translate(300+i*240,560+Math.sin(t*4+i)*18);c.rotate(Math.sin(t*2+i)*.2);text('?',0,0,110,'#9cc4ff',14);c.restore();}
    if(lit){const k=t-A1;sun(880,420,60,t,clamp(k*3,0,1));
      for(let i=0;i<3;i++){const ph=((k*1.2+i/3)%1);const sx=840,sy=470,ex=540+sway*40+60,ey=850;const x=sx+(ex-sx)*ph,y=sy+(ey-sy)*ph;c.beginPath();c.arc(x,y,14,0,7);fs('#ffd21f',5,NV);}
      const q=back((k-.5)/.3);if(q>0){c.save();c.translate(700,740);c.scale(q,q);c.lineWidth=18;c.lineCap='round';c.strokeStyle=RED;c.beginPath();c.moveTo(-36,-36);c.lineTo(36,36);c.moveTo(36,-36);c.lineTo(-36,36);c.stroke();c.restore();pill(760,1290,q,'A LUZ NÃO ENTRA',RED,'#fff',42,-.04);}}
  },sway*.01);
  header('COMO CONSTRUIR UM','OLHO DO ZERO?',0,t);}
function sceneB(t){// furo (pupila) → luz demais → cego
  const k=t-TB;const glare=t>TB2;
  if(t<TBF){
    K.sunburst(540,900,'#1f2a5c','#26336b',t*.1,22);dust(t);
    const drillIn=ease(clamp(k/.8,0,1)),drillOut=ease(clamp((k-1.6)/.4,0,1));const hole=ease(clamp((k-.7)/.9,0,1));
    cam(punch(t,TB)*(1+.05*ease(k/3)),0,0,()=>{
      eyeball(540,900,300,{pupil:.16*hole+(glare?.02*Math.sin(t*20):0),veins:glare});
      // broca
      if(drillOut<1){const dx=760-drillIn*170+drillOut*500;c.save();c.translate(dx,900);c.rotate(Math.sin(t*60)*.02);c.beginPath();c.roundRect(60,-60,360,120,30);fs(lin(0,-60,0,60,[[0,'#ffd21f'],[1,'#e0a000']]),7,NV);
        c.beginPath();c.moveTo(60,-26);c.lineTo(-40,-14);c.lineTo(-70,0);c.lineTo(-40,14);c.lineTo(60,26);c.closePath();fs(lin(0,-26,0,26,[[0,'#e8ecf4'],[1,'#8b94a7']]),6,NV);
        c.strokeStyle=NV;c.lineWidth=4;for(let i=0;i<4;i++){const xx=40-i*25+((t*300)%25);c.beginPath();c.moveTo(xx,-22+i*3);c.lineTo(xx-14,20-i*3);c.stroke();}c.restore();}
      if(k>.9&&!glare)pill(540,1310,back((k-.9)/.35),'PUPILA',Y,NV,58,-.03);
      if(glare){const g=t-TB2;sun(220,470,90,t,clamp(g*4,0,1));
        for(let i=0;i<9;i++){const a=-.15+i*.05;c.save();c.globalAlpha=clamp(g*2,0,1)*.8;c.strokeStyle='#fff3a0';c.lineWidth=16;c.lineCap='round';const ph=(g*2+i/9)%1;c.beginPath();c.moveTo(220+Math.cos(.62+a)*ph*500,470+Math.sin(.62+a)*ph*500);c.lineTo(220+Math.cos(.62+a)*(ph*500+120),470+Math.sin(.62+a)*(ph*500+120));c.stroke();c.restore();}}
    });
    if(glare){const g=t-TB2;c.fillStyle=`rgba(255,255,235,${clamp(g/1.0,0,1)*.92})`;c.fillRect(0,0,1080,1920);}
    if(!glare)header('ENTÃO FAZ UM FURO:','A PUPILA',TB,t);else header('MAS NO SOL…','LUZ DEMAIS!',TB2,t,'#ff8a8f');
  }else{// ecrã branco, boneco cai
    const g=t-TBF;c.fillStyle=rad(540,900,100,1200,[[0,'#ffffff'],[1,'#fff3b0']]);c.fillRect(0,0,1080,1920);
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2+t*.4;c.save();c.globalAlpha=.35;c.strokeStyle='#ffd21f';c.lineWidth=30;c.beginPath();c.moveTo(540+Math.cos(a)*200,900+Math.sin(a)*200);c.lineTo(540+Math.cos(a)*1400,900+Math.sin(a)*1400);c.stroke();c.restore();}
    const fall=ease(clamp((g-.35)/.6,0,1));
    cam(punch(t,TBF,.12),0,0,()=>{boneco(540+fall*160,1080+fall*120,1.05,t,{eye:{pupil:.5,dizzy:g},shut:g<.35,arms:2.4,mouth:'o',rot:fall*1.45,noShadow:fall>.2});
      if(g>.4)burst(760,560,back((g-.4)/.25),'CEGO!',.1,'#fff',RED,80);});
    header('MAS NO SOL…','LUZ DEMAIS!',0,t,'#ff8a8f');
  }
  flash(t,TB);flash(t,TBF);}
function sceneC(t){// íris = cortina
  const k=t-TC;const sunny=t>=TC2&&t<TC3,dark=t>=TC3;
  if(dark){c.fillStyle='#0b1030';c.fillRect(0,0,1080,1920);dust(t,'200,210,255',40,.6);}else K.sunburst(540,900,'#0e5a63','#127079',t*.12,22);
  const iris=ease(clamp(k/1.0,0,1));
  let p=.16;if(sunny)p=.16-.1*ease(clamp((t-TC2)/.5,0,1));if(dark)p=.06+.2*ease(clamp((t-TC3)/.5,0,1));
  cam(punch(t,TC)*(1+.04*ease(k/6)),0,0,()=>{
    // cortina a fechar (duas metades a deslizar até formar o anel)
    eyeball(540,900,300,{pupil:p,iris});
    if(k<1.0){for(const sd of [-1,1]){c.save();c.globalAlpha=1-iris;c.beginPath();c.rect(540+sd*(170+(1-iris)*200)-(sd<0?60:0),620,60,560);fs('#2aa4b8',5,NV);c.restore();}}
    if(k>.3&&!sunny&&!dark)pill(820,1250,back((k-.3)/.35),'ÍRIS',Y,NV,60,.05);
    if(sunny){const s=t-TC2;sun(230,470,80,t,clamp(s*4,0,1));pill(540,1310,back((s-.3)/.3),'APERTA O FURO',Y,NV,48,-.03);
      for(const sd of [-1,1]){c.save();c.globalAlpha=clamp((s-.2)*3,0,1);c.strokeStyle=Y;c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(540+sd*140,900);c.lineTo(540+sd*80,900);c.stroke();c.beginPath();c.moveTo(540+sd*100,880);c.lineTo(540+sd*80,900);c.lineTo(540+sd*100,920);c.stroke();c.restore();}}
    if(dark){const s=t-TC3;moon(220,470,70,clamp(s*4,0,1));pill(540,1310,back((s-.2)/.3),'NO ESCURO: ABRE',BLU,'#fff',48,.03);}
  });
  if(!sunny&&!dark)header('PÕE UMA CORTINA:','A ÍRIS',TC,t,'#7fe0c8');else if(sunny)header('COM MUITA LUZ…','ELA APERTA!',TC2,t,Y);else header('E NO ESCURO…','ELA ABRE!',TC3,t,'#9cc4ff');
  flash(t,TC);}
function sceneD(t){// borrado
  const k=t-TD;K.sunburst(540,900,'#5b2a86','#6b35a0',t*.12,22);dust(t,'255,220,255',30,.45);
  const spread=t>=TD2;const bump=t>19.8&&t<21.0?Math.exp(-(t-19.9)*6):0;
  cam(punch(t,TD)*(1+.04*ease(k/5)),0,0,()=>{
    viewPanel(540,760,760,560,t,{blur:16+3*Math.sin(t*3),label:'O QUE VOCÊ VÊ',s:back(k/.35)});
    if(spread){const s=t-TD2;c.save();c.beginPath();c.roundRect(160,480,760,560,24);c.clip();for(let i=0;i<7;i++){const ph=(s*.8+i/7)%1;c.beginPath();c.arc(540+((i*131)%5-2)*120,760+((i*71)%3-1)*150,40+ph*160,0,7);c.strokeStyle=`rgba(255,240,150,${(1-ph)*.8})`;c.lineWidth=10;c.stroke();}c.restore();}
    // boneco a bater na parede
    c.save();c.beginPath();c.roundRect(860,1060,60,420,10);fs('#c9b8a0',6,NV);c.restore();
    const bx=Math.min(720,560+k*90)-bump*40;boneco(bx,1260,.5,t,{eye:{pupil:.4,iris:1,look:1},arms:1.3,mouth:bump>.1?'o':'sad',rot:-bump*.25});
    if(bump>.05)burst(840,1080,bump*.7,'TUM!',.1,Y,NV,70);
  });
  if(!spread)header('A LUZ TÁ CERTA…','MAS TÁ BORRADO!',TD,t,'#ffb3e6');else header('A LUZ CHEGA','TODA ESPALHADA',TD2,t,Y);
  flash(t,TD);}
// geometria do corte
const EX=660,EY=880,ER=240,TX=175,TT=760,TBt=1000,LX=EX-ER*.62;
function raysSpread(t,a){// sem lente: cada ponto espalha-se no fundo
  for(const [y0,col] of [[TT,'#ffd21f'],[TBt,'#7fd3ff']])for(const dy of [-150,0,150])ray([[TX,y0],[EX-ER*.86,EY+(y0-EY)*.08],[EX+ER*.8,EY+(y0-EY)*.25+dy]],col,a*.85,5);}
function raysFocus(t,p,a=1,hi=0){// com lente: convergem num ponto (invertido)
  const top=[[TX,TT],[EX-ER*.86,EY-14],[LX,EY-10],[EX+ER*.83,EY+150]];const bot=[[TX,TBt],[EX-ER*.86,EY+14],[LX,EY+10],[EX+ER*.83,EY-150]];
  for(const [pts,col] of [[top,'#ffd21f'],[bot,'#7fd3ff']])for(const d of [-26,0,26]){const q=pts.map((pt,i)=>i===1||i===2?[pt[0],pt[1]+d*.5]:pt);ray(partial(q,p),col,a,hi?8:6);}}
function sceneE(t){// lente → foca
  const k=t-TE;blueprint();
  const L=clamp(k/.7,0,1);const bend=clamp((t-TE2)/1.0,0,1);const ret=t>=TE3?clamp((t-TE3)*2,0,1):0;const focus=t>=TE4;
  cam(punch(t,TE)*(1+.04*ease(k/6)),0,0,()=>{
    tree(TX,TBt-110,1.1);
    sideEye(EX,EY,ER,t,{lens:L,retina:ret});
    if(bend<.02)raysSpread(t,1);else{raysSpread(t,1-bend);raysFocus(t,bend);}
    if(k>.4&&k<2.2)pill(LX,EY-ER-70,back((k-.4)/.3),'LENTE','#fff',NV,48,-.04);
    if(t>TE2&&t<TE3)pill(540,1330,back((t-TE2)/.3),'DOBRA A LUZ',Y,NV,50,.03);
    if(ret>0)pill(EX+ER*.55,EY+ER+90,back((t-TE3)/.3),'RETINA',PINK,NV,50,.04);
    if(focus){const f=t-TE4;tree(EX+ER*.72,EY-40,.42,Math.PI,clamp(f*4,0,1));c.save();c.translate(900,560);const q=back(f/.3);c.scale(q,q);c.beginPath();c.arc(0,0,66,0,7);fs(GRN,8,NV);c.beginPath();c.moveTo(-30,2);c.lineTo(-8,26);c.lineTo(32,-24);c.lineCap='round';c.lineJoin='round';c.lineWidth=16;c.strokeStyle='#fff';c.stroke();c.restore();}
  });
  if(t<TE3)header('COLOCA UMA LENTE:','ELA DOBRA A LUZ',TE,t,'#bfe9ff');else if(!focus)header('E JUNTA TUDO','NA RETINA…',TE3,t,PINK);else header('…E FOCA!','NÍTIDO!',TE4,t,GRN);
  flash(t,TE);}
const PINK='#ff9cc0';
function sceneF(t){// os raios cruzam → de cabeça pra baixo
  const k=t-TF;blueprint();const inv=t>=TF2;const j=t-TF2;
  cam(punch(t,TF)*(1+.05*ease(k/3.8)),0,0,()=>{
    tree(TX,TBt-110,1.1);sideEye(EX,EY,ER,t,{lens:1,retina:1});raysFocus(t,1,1,1);
    // X a piscar onde cruzam
    const xx=LX+40,yy=EY;const q=back((k-.2)/.3);if(q>0){c.save();c.translate(xx,yy);c.scale(q,q);c.beginPath();c.arc(0,0,48,0,7);c.lineWidth=10;c.strokeStyle=`rgba(255,210,31,${.6+.4*Math.sin(t*10)})`;c.stroke();c.restore();pill(xx,EY-ER-60,q,'CRUZAM!',Y,NV,50,-.04);}
    tree(EX+ER*.72,EY-40,.42+(inv?.1*ease(j/.4):0),Math.PI);
    if(inv){viewPanel(470,1340,520,300,t,{rot:Math.PI,s:back(j/.35)});boneco(880,1370,.38,t,{eye:{pupil:.4,iris:1,dizzy:j},arms:.6,mouth:'o',rot:Math.PI,noShadow:1});}
  });
  if(!inv)header('MAS A LENTE','CRUZA OS RAIOS…',TF,t,'#bfe9ff');else header('DE CABEÇA','PRA BAIXO!',TF2,t,'#ff8a8f');
  flash(t,TF);flash(t,TF2);}
function sceneG(t){// cabo até o cérebro → desvira
  const k=t-TG;K.sunburst(540,820,'#7a1d4a','#8c2558',t*.12,22);dust(t,'255,200,220',26,.45);
  const turn=ease(clamp((t-TG2)/.8,0,1));const sig=clamp(k/2.0,0,1);
  cam(punch(t,TG)*(1+.04*ease(k/4.3)),0,0,()=>{
    sideEye(270,760,150,t,{lens:1,retina:1,nerve:false});
    const pts=[[400,770],[520,900],[640,620],[760,740]];c.beginPath();c.moveTo(...pts[0]);c.bezierCurveTo(...pts[1],...pts[2],...pts[3]);c.lineWidth=40;c.strokeStyle=NV;c.lineCap='round';c.stroke();c.lineWidth=26;c.strokeStyle='#ffcf6b';c.stroke();
    const bp=(u)=>{const m=1-u;return [m*m*m*pts[0][0]+3*m*m*u*pts[1][0]+3*m*u*u*pts[2][0]+u*u*u*pts[3][0],m*m*m*pts[0][1]+3*m*m*u*pts[1][1]+3*m*u*u*pts[2][1]+u*u*u*pts[3][1]];};
    for(let i=0;i<4;i++){const u=((k*1.1+i/4)%1);const [x,y]=bp(u);sparkle(x,y,30,1);}
    brainIcon(860,740,1.0,t,sig>.9?1:sig*.5);
    viewPanel(540,1270,600,380,t,{rot:Math.PI*(1-turn),label:'O QUE VOCÊ VÊ'});
    if(turn>=1){for(let i=0;i<10;i++){const a=i/10*Math.PI*2+t;sparkle(540+Math.cos(a)*360,1270+Math.sin(a)*230,22,.8);}}
  });
  if(t<TG2)header('LIGA UM CABO','ATÉ O CÉREBRO…',TG,t,Y);else header('E ELE DESVIRA','TUDO PRA VOCÊ!',TG2,t,GRN);
  flash(t,TG);}
function sceneH(t){// comenta GÊNIO / CURIOSO
  const k=t-TH;K.sunburst(540,820,'#ffcf3f','#ffbe1a',t*.2,20);
  cam(punch(t,TH),0,0,()=>{boneco(540,880,.85,t,{eye:{pupil:.4,iris:1,look:Math.sin(t*2)},wink:k>2.6&&k<3.0,armWave:1,arms:.9});
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2+t*.8;sparkle(540+Math.cos(a)*380,800+Math.sin(a)*170,22,.7+.3*Math.sin(t*6+i));}});
  header('COMENTA:','GÊNIO OU CURIOSO?',TH,t,'#fff');
  const pu=1+.05*Math.sin(t*8);
  if(k>.6){c.save();c.translate(280,1400);c.scale(back((k-.6)/.3)*pu,back((k-.6)/.3)*pu);c.rotate(-.05);text('JÁ SABIA?',0,-80,40,'#fff',10);pill(0,0,1,'GÊNIO 🤓'.replace(' 🤓',''),GRN,'#fff',66);c.restore();}
  if(k>1.9){c.save();c.translate(800,1400);c.scale(back((k-1.9)/.3)*pu,back((k-1.9)/.3)*pu);c.rotate(.05);text('NÃO SABIA?',0,-80,40,'#fff',10);pill(0,0,1,'CURIOSO',BLU,'#fff',66);c.restore();}
  flash(t,TH);}
function frame(t){if(t<TB)return sceneA(t);if(t<TC)return sceneB(t);if(t<TD)return sceneC(t);if(t<TE)return sceneD(t);if(t<TF)return sceneE(t);if(t<TG)return sceneF(t);if(t<TH)return sceneG(t);sceneH(t);}
return {frame};};
