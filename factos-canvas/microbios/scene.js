export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const T1=4.6,T2=11.15,T3=14.95,T4=20.8,T5=25.65;
const GREEN=['#9cf5b8','#3ccf73','#1d8a4a'],PURP=['#dcc6ff','#a67bff','#6a3fd1'],ORA=['#ffe0a3','#ffb13b','#d9730d'];
// ---------- helpers ----------
function stars(t,n=60){for(let i=0;i<n;i++){const x=(i*397+31)%1080,y=(i*211+57)%1400;const s=1.5+(i%3)*1.2;const a=.35+.35*Math.sin(t*3+i*1.7);c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(255,255,255,${a})`;c.fill();}}
function night(t){c.fillStyle=lin(0,0,0,1920,[[0,'#0a0f2e'],[.55,'#1d1452'],[1,'#3a1a5e']]);c.fillRect(0,0,1080,1920);stars(t);
  c.fillStyle=rad(540,820,60,1100,[[0,'rgba(160,120,255,.22)'],[1,'rgba(0,0,0,0)']]);c.fillRect(0,0,1080,1920);
  c.save();c.translate(900,200);c.beginPath();c.arc(0,0,62,0,7);fs(rad(-15,-15,5,70,[[0,'#fffbe0'],[1,'#ffe27a']]),0);c.globalCompositeOperation='source-atop';c.restore();
  c.save();c.translate(900,200);c.beginPath();c.arc(26,-14,56,0,7);c.fillStyle='#120f38';c.fill();c.restore();}
function header(t){const p=back(t/.35);c.save();c.translate(540,150);c.scale(p,p);c.font='900 48px M';const w=c.measureText('2 FATOS SOBRE O SONO').width+80;c.beginPath();c.roundRect(-w/2,-44,w,88,44);fs(Y,7,NV);text('2 FATOS SOBRE O SONO',0,4,48,NV,0);c.restore();
  c.save();c.translate(540,250);c.scale(p,p);text('QUE NINGUÉM TE CONTOU',0,0,52,'#fff',14);c.restore();}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);text(txt,0,4,size,fg,0);c.restore();}
function zzz(x,y,t,s=1){for(let i=0;i<3;i++){const k=((t*0.7+i/3)%1);c.save();c.translate(x+k*60*s+Math.sin(k*6)*10,y-k*140*s);c.globalAlpha=Math.sin(k*Math.PI);text('Z',0,0,(36+i*14)*s,'#c9d8ff',8*s);c.restore();}}
// ---------- bacterium ----------
function bac(x,y,s,col,t,o={}){c.save();c.translate(x,y);c.rotate((o.rot||0)+Math.sin(t*4+(o.ph||0))*.12);c.scale(s*(o.flip?-1:1),s);
  // flagella
  c.lineCap='round';c.strokeStyle=col[2];c.lineWidth=6;for(let k=-1;k<=1;k++){c.beginPath();c.moveTo(-58,k*12);for(let i=1;i<=6;i++)c.lineTo(-58-i*12,k*12+Math.sin(t*14+i+k+(o.ph||0))*9+k*i*3);c.stroke();}
  c.beginPath();c.roundRect(-64,-36,128,72,36);fs(lin(0,-36,0,36,[[0,col[0]],[.45,col[1]],[1,col[2]]]),6,NV);
  c.fillStyle='rgba(255,255,255,.35)';for(const [px,py,r] of [[-34,14,6],[30,-16,5],[44,14,4]]){c.beginPath();c.arc(px,py,r,0,7);c.fill();}
  c.beginPath();c.ellipse(-20,-22,26,7,-.1,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const ex=[8,38];c.lineWidth=5;c.strokeStyle=NV;
  if(o.sleep){for(const e of ex){c.beginPath();c.arc(e,0,9,0.15,Math.PI-0.15);c.stroke();}}
  else if(o.dizzy){for(const e of ex){c.beginPath();for(let a=0;a<12;a+=0.4){const r=a*0.9;c.lineTo(e+Math.cos(a+t*10)*r,-2+Math.sin(a+t*10)*r);}c.lineWidth=3;c.stroke();}}
  else{for(const e of ex){c.beginPath();c.ellipse(e,-4,10,13,0,0,7);fs('#fff',4,NV);c.beginPath();c.arc(e+3,-2,5.5,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(e+5,-5,2,0,7);c.fillStyle='#fff';c.fill();}}
  c.lineWidth=4;c.strokeStyle=NV;c.beginPath();if(o.dizzy){c.moveTo(14,20);c.quadraticCurveTo(22,14,30,20);c.quadraticCurveTo(38,26,44,20);}else c.arc(24,14,9,0.2,Math.PI-0.2);c.stroke();
  c.beginPath();c.ellipse(-2,12,7,4,0,0,7);c.fillStyle='rgba(255,90,130,.5)';c.fill();
  if(o.cap){c.beginPath();c.moveTo(-30,-30);c.quadraticCurveTo(10,-80,70,-70);c.quadraticCurveTo(40,-50,40,-28);c.closePath();fs(lin(0,-80,0,-30,[[0,'#6f8cff'],[1,'#3a4fcf']]),5,NV);c.beginPath();c.arc(72,-70,11,0,7);fs('#fff',4,NV);c.beginPath();c.roundRect(-34,-36,78,14,7);fs('#fff',4,NV);}
  if(o.hard){c.beginPath();c.arc(14,-30,40,Math.PI,0);c.closePath();fs(lin(0,-70,0,-30,[[0,'#ffe066'],[1,'#f2a900']]),5,NV);c.beginPath();c.roundRect(-34,-34,96,12,6);fs('#f2a900',5,NV);c.beginPath();c.roundRect(8,-68,12,36,6);c.fillStyle='rgba(255,255,255,.5)';c.fill();}
  c.restore();}
function coccus(x,y,s,col,t,ph=0){c.save();c.translate(x,y+Math.sin(t*3+ph)*6);c.scale(s,s);c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=40+Math.sin(i*3+t*5+ph)*2.5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();fs(rad(-12,-14,4,46,[[0,col[0]],[.6,col[1]],[1,col[2]]]),6,NV);
  for(const e of [-12,12]){c.beginPath();c.ellipse(e,-4,7,9,0,0,7);fs('#fff',3,NV);c.beginPath();c.arc(e+2,-3,4,0,7);c.fillStyle=NV;c.fill();}c.beginPath();c.arc(0,12,6,0.2,Math.PI-0.2);c.lineWidth=3.5;c.strokeStyle=NV;c.stroke();c.restore();}
// ---------- brain ----------
function brainPath(){c.beginPath();for(let i=0;i<=60;i++){const a=i/60*Math.PI*2;const r=1+0.05*Math.sin(i*1.9)+0.035*Math.sin(i*4.3);c.lineTo(Math.cos(a)*300*r,Math.sin(a)*215*r-(Math.sin(a)>0?Math.sin(a)*30:0));}c.closePath();}
function brain(x,y,s,t,o={}){c.save();c.translate(x,y+Math.sin(t*2)*8);c.scale(s,s);
  c.save();c.shadowColor=o.glow||'rgba(255,120,180,.55)';c.shadowBlur=70;brainPath();fs(rad(-80,-90,20,340,[[0,'#ffd6e2'],[.55,'#ff9fbd'],[1,'#e2577f']]),9,NV);c.restore();
  c.save();brainPath();c.clip();c.strokeStyle='rgba(176,40,88,.55)';c.lineWidth=9;c.lineCap='round';
  const G=[[-250,-40,-180,-120,-90,-60],[-230,60,-150,10,-70,70],[-160,-170,-110,-110,-40,-160],[-200,130,-120,90,-40,140],[60,-160,120,-100,190,-150],[80,-40,150,-110,240,-30],[70,60,150,0,230,70],[60,140,130,100,210,150],[-120,-20,-80,20,-20,-30],[30,-20,80,30,120,-10]];
  for(const [a,b,c1,d,e,f] of G){c.beginPath();c.moveTo(a,b);c.bezierCurveTo(c1,d,c1+30,d+60,e,f);c.stroke();}
  c.lineWidth=11;c.strokeStyle='rgba(150,30,70,.6)';c.beginPath();c.moveTo(0,-230);c.bezierCurveTo(-20,-120,20,-60,0,40);c.stroke();
  if(o.inside)o.inside();c.restore();
  c.beginPath();c.ellipse(-120,-130,70,22,-.4,0,7);c.fillStyle='rgba(255,255,255,.45)';c.fill();
  // face
  c.lineWidth=8;c.strokeStyle=NV;c.lineCap='round';
  for(const e of [-80,80]){if(o.awake){c.beginPath();c.ellipse(e,40,26,32,0,0,7);fs('#fff',6,NV);c.beginPath();c.arc(e+(o.look||0),46,13,0,7);c.fillStyle=NV;c.fill();if(o.tired){c.beginPath();c.ellipse(e,22,30,16,0,Math.PI,0);c.fillStyle='#e2577f';c.fill();c.stroke();c.beginPath();c.arc(e,78,22,0.3,Math.PI-0.3);c.lineWidth=5;c.strokeStyle='rgba(90,40,120,.6)';c.stroke();c.lineWidth=8;c.strokeStyle=NV;}}
   else{c.beginPath();c.arc(e,36,24,0.2,Math.PI-0.2);c.stroke();}}
  for(const e of [-130,130]){c.beginPath();c.ellipse(e,95,26,13,0,0,7);c.fillStyle='rgba(255,70,120,.45)';c.fill();}
  c.beginPath();if(o.awake&&o.tired){c.moveTo(-30,120);c.quadraticCurveTo(0,108,30,120);}else if(o.awake){c.arc(0,100,26,0.2,Math.PI-0.2);}else{c.ellipse(0,112,14,10,0,0,7);}c.stroke();
  c.restore();}
// ---------- gut ----------
function gut(x,y,s,t,inner){c.save();c.translate(x,y);c.scale(s,s);
  c.beginPath();c.roundRect(-330,-250,660,500,200);fs(lin(0,-250,0,250,[[0,'#ffd9c2'],[1,'#f2a884']]),9,NV);
  const P=()=>{c.beginPath();c.moveTo(-230,-150);c.lineTo(230,-150);c.quadraticCurveTo(290,-150,290,-90);c.quadraticCurveTo(290,-30,230,-30);c.lineTo(-230,-30);c.quadraticCurveTo(-290,-30,-290,30);c.quadraticCurveTo(-290,90,-230,90);c.lineTo(230,90);c.quadraticCurveTo(290,90,290,150);};
  c.lineCap='round';c.lineJoin='round';P();c.lineWidth=96;c.strokeStyle=NV;c.stroke();P();c.lineWidth=80;c.strokeStyle='#f27a9b';c.stroke();P();c.lineWidth=30;c.strokeStyle='rgba(255,190,210,.7)';c.stroke();
  c.save();c.translate(0,-10);P();c.lineWidth=8;c.strokeStyle='rgba(255,255,255,.5)';c.stroke();c.restore();
  if(inner)inner();c.restore();}
// ---------- clock ----------
function clock(x,y,s,h,m,o={}){c.save();c.translate(x,y);c.scale(s,s);
  for(const k of [-1,1]){c.save();c.rotate(k*0.55);c.beginPath();c.arc(0,-150,40,Math.PI,0);fs('#e5484d',7,NV);c.restore();}
  c.beginPath();c.arc(0,0,140,0,7);fs(rad(-40,-40,10,150,[[0,'#ffffff'],[1,'#dfe6f5']]),10,NV);
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*112,Math.sin(a)*112);c.lineTo(Math.cos(a)*(i%3?124:100),Math.sin(a)*(i%3?124:100));c.lineWidth=i%3?5:9;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  c.save();c.rotate(h);c.beginPath();c.moveTo(0,10);c.lineTo(0,-62);c.lineWidth=14;c.strokeStyle=NV;c.stroke();c.restore();
  c.save();c.rotate(m);c.beginPath();c.moveTo(0,14);c.lineTo(0,-98);c.lineWidth=9;c.strokeStyle=o.red||NV;c.stroke();c.restore();
  c.beginPath();c.arc(0,0,12,0,7);fs(Y,5,NV);c.beginPath();c.ellipse(-60,-80,40,14,-.6,0,7);c.fillStyle='rgba(255,255,255,.8)';c.fill();c.restore();}
function plane(x,y,s,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.beginPath();c.moveTo(-40,0);c.lineTo(-110,-90);c.lineTo(-70,-92);c.lineTo(30,-10);c.closePath();fs('#cfd8ea',6,NV);
  c.beginPath();c.moveTo(-40,0);c.lineTo(-110,90);c.lineTo(-70,92);c.lineTo(30,10);c.closePath();fs('#b4c0d8',6,NV);
  c.beginPath();c.moveTo(-170,0);c.lineTo(-200,-50);c.lineTo(-180,-50);c.lineTo(-140,-8);c.closePath();fs('#e5484d',6,NV);
  c.beginPath();c.ellipse(0,0,190,32,0,0,7);fs(lin(0,-32,0,32,[[0,'#ffffff'],[1,'#c7d2e8']]),7,NV);
  c.beginPath();c.ellipse(150,-8,26,14,0.1,0,7);fs('#4fa3ff',4,NV);for(let i=0;i<6;i++){c.beginPath();c.arc(-90+i*36,-6,7,0,7);fs('#4fa3ff',3,NV);}
  c.restore();}
function dayNight(t,mix){ // left sun, right moon
  c.fillStyle=lin(0,0,0,1920,[[0,'#ffcf6b'],[1,'#ff8a3d']]);c.fillRect(0,0,540,1920);c.fillStyle=lin(0,0,0,1920,[[0,'#0b1240'],[1,'#2c1a66']]);c.fillRect(540,0,540,1920);
  c.save();c.beginPath();c.rect(0,0,540,1920);c.clip();c.translate(270,420);c.rotate(t*.3);c.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<14;i++){c.beginPath();c.moveTo(0,0);c.arc(0,0,1400,i*Math.PI/7,(i+.5)*Math.PI/7);c.closePath();c.fill();}c.restore();
  c.save();c.beginPath();c.rect(540,0,540,1920);c.clip();stars(t,70);c.restore();
  c.fillStyle=rad(540,960,80,1200,[[0,'rgba(255,255,255,0)'],[1,'rgba(0,0,0,.35)']]);c.fillRect(0,0,1080,1920);
  c.beginPath();c.moveTo(540,0);c.lineTo(540,1920);c.lineWidth=10;c.strokeStyle=NV;c.stroke();}
function sun(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.rotate(t*.6);for(let i=0;i<12;i++){c.save();c.rotate(i*Math.PI/6);c.beginPath();c.roundRect(-10,-120,20,40,10);fs('#ffe066',5,NV);c.restore();}c.beginPath();c.arc(0,0,72,0,7);fs(rad(-20,-20,5,80,[[0,'#fff6c2'],[1,'#ffc928']]),7,NV);c.restore();}
function moon(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.arc(0,0,72,-1.2,1.9+0.5);c.arc(34,-26,60,1.9,-1.4,true);c.closePath();fs(rad(-20,-20,5,80,[[0,'#fffbe0'],[1,'#ffe27a']]),7,NV);c.restore();}
// ---------- frame ----------
function frame(t){
 if(t<T2){night(t);
   // gut at bottom (fact 1), bacteria travel to brain
   const bp=t<T1?1:Math.max(0.62,1-ease((t-T1)/.6)*0.38);const by=t<T1?560:560+ease((t-T1)/.6)*140;
   const gy=t<T1?1230:1230+ease((t-T1)/.6)*1000;
   if(gy<1900)gut(540,gy,.62,t);
   // trail of bacteria rising
   const N=t<T1?9:6;for(let i=0;i<N;i++){const k=((t*0.35+i/N)%1);const x=540+Math.sin(k*9+i)*140;const y=gy-130-(gy-130-by-40)*k;if(t<T1){const col=i%3===0?PURP:i%3===1?GREEN:ORA;if(i%2)coccus(x,y,.6,col,t,i);else bac(x,y,.55,col,t,{rot:-Math.PI/2+.3,ph:i});}}
   const counting=t>8.85;const hrs=Math.floor(clamp((t-8.85)/1.9,0,1)*36);
   brain(540,by,t<T1?0.95*(0.9+0.1*back(t/.3)):bp*1.05+(t>T1?0.25:0),t,{awake:t>4.4,tired:counting,look:Math.sin(t*2)*6,glow:counting?'rgba(255,60,90,.7)':undefined,
     inside:()=>{if(t<T1+0.2)return;const M=counting?8+Math.floor(hrs/36*26):6;for(let i=0;i<M;i++){const a=i*2.4,r=40+((i*53)%170);const x=Math.cos(a)*r*1.25,y=Math.sin(a)*r*0.85-30;const ap=back((t-T1-0.2-i*.05)/.3);if(ap<=0)continue;if(i%2)coccus(x,y,.55*ap,i%4===1?PURP:ORA,t,i);else bac(x,y,.5*ap,GREEN,t,{rot:i,ph:i});}}});
   if(t<T1)zzz(860,by-60,t,1.1);
   if(t>T1+0.1&&t<8.9){const p=back((t-T1-0.1)/.35);pill(540,by+390,p,'🦠 → 🧠'.length?'DA BARRIGA → PRO CÉREBRO':'','#7be0a8',NV,44);}
   if(counting){const p=back((t-8.85)/.3);c.save();c.translate(540,by+410);c.scale(p,p);c.beginPath();c.roundRect(-330,-80,660,160,40);fs('#e5484d',8,NV);text('SEM DORMIR',0,-30,44,'#fff',0);text(String(hrs).padStart(2,'0')+' HORAS',0,32,72,Y,0);c.restore();
     const up=back((t-9.4)/.3);pill(860,by-260,up,'BACTÉRIAS ↑','#fff',NV,40,.12);}
   header(t);pill(540,365,back((t-.15)/.35),'FATO 1','#ff5ca8','#fff',50,-.04);
   return;}
 if(t<T3){night(t);const k=t-T2;
   // sleeping bacteria = origin of sleep
   const p=back(k/.4);c.save();c.translate(540,820);c.scale(p,p);c.beginPath();c.arc(0,0,330,0,7);fs(rad(0,0,30,330,[[0,'rgba(160,120,255,.35)'],[1,'rgba(160,120,255,0)']]),0);
   bac(-120,40,1.5,GREEN,t*.3,{sleep:true,cap:true,ph:1});coccus(170,90,1.3,PURP,t*.3,2);c.restore();
   
   zzz(720,650,t,1.3);zzz(330,640,t+.4,1);
   const q=back((k-0.3)/.4);c.save();c.translate(540,360);c.scale(q,q);text('O SONO',0,0,110,'#fff',20);text('COMEÇOU COM ELAS?',0,120,76,Y,18);c.restore();
   if(k>2.2){const r=back((k-2.2)/.3);pill(540,1210,r,'HIPÓTESE DE CIENTISTAS','#fff',NV,40,-.03);}
   return;}
 if(t<T4){const k=t-T3;dayNight(t);
   const g=back(k/.45);gut(540,1050,.95*g,t,()=>{
     // day shift on left, night shift on right inside gut
     const shift=t>17.85;bac(-170,-90,.75,GREEN,t,{hard:true,ph:1,sleep:false});bac(-160,90,.7,ORA,t,{hard:true,ph:2,flip:false});
     bac(170,-90,.75,PURP,t,{cap:true,sleep:!shift||t<19.0,ph:3,flip:true});bac(170,90,.7,PURP,t,{cap:true,sleep:t<19.1,ph:4,flip:true});});
   const cs=back((k-.2)/.4);clock(540,560,cs*0.95,t*0.5,t*6,{red:'#e5484d'});
   sun(150,300,.8*back((k-.1)/.4),t);moon(930,300,.85*back((k-.1)/.4));
   header(t);pill(540,365,back((k-.05)/.35),'FATO 2','#ff5ca8','#fff',50,-.04);
   if(t>17.85){pill(270,1360,back((t-17.85)/.3),'TURNO DO DIA','#fff',NV,38,-.04);}
   if(t>19.05){pill(810,1360,back((t-19.05)/.3),'TURNO DA NOITE',Y,NV,38,.04);}
   return;}
 if(t<T5){const k=t-T4;dayNight(t);
   const chaos=t>23.75;const spin=chaos?(t-23.75)*28:0;
   // plane flies across
   const px=-300+((k*420)%1700);plane(px,330+Math.sin(k*2)*20,0.85,-0.05);
   const sh=chaos?Math.sin(t*40)*10:0;c.save();c.translate(sh,0);
   clock(540,700,1.05+(chaos?.05*Math.sin(t*20):0),t*0.5+spin*0.3,t*6+spin,{red:'#e5484d'});c.restore();
   if(t>21.9){const p=back((t-21.9)/.3);pill(540,470,p,'🕐'.length?'OUTRO FUSO':'','#4fa3ff','#fff',46,.05);}
   if(t>21.0&&t<21.9){const p=back((t-21.0)/.3);pill(540,470,p,'DORMIR TARDE','#ff5ca8','#fff',46,-.05);}
   gut(540,1150,.75,t,()=>{const d=chaos;bac(-160,-90,.75,GREEN,t,{hard:true,dizzy:d,rot:d?t*3:0,ph:1});bac(170,-90,.75,PURP,t,{cap:true,dizzy:d,rot:d?-t*3:0,ph:3,flip:true});bac(-150,90,.7,ORA,t,{hard:true,dizzy:d,rot:d?t*2:0,ph:2});bac(170,90,.7,PURP,t,{cap:true,dizzy:d,rot:d?-t*2.5:0,ph:4,flip:true});});
   if(chaos){const p=back((t-23.8)/.3);pill(540,905,p,'BAGUNÇOU! 😵'.replace(' 😵',''),'#e5484d','#fff',64,-.05);}
   return;}
 // end: choice
 const k=t-T5;night(t);
 brain(290,800,.62*back(k/.4),t,{awake:true});clock(800,800,1.0*back((k-.1)/.4),t*.5,t*6,{red:'#e5484d'});
 const q=back((k-0.15)/.35);c.save();c.translate(540,330);c.scale(q,q);text('QUAL TE',0,-60,96,'#fff',20);text('CHOCOU MAIS?',0,60,96,Y,20);c.restore();
 const a=back((k-1.0)/.3),b=back((k-1.45)/.3);const pulse=1+.05*Math.sin(t*8);pill(290,1110,a*pulse,'CÉREBRO','#ff9fbd',NV,54,-.04);pill(800,1110,b*pulse,'RELÓGIO',Y,NV,54,.04);
 if(k>2.4)pill(540,1330,back((k-2.4)/.3),'COMENTA 👇'.replace(' 👇','')+' ↓','#fff',NV,44);
}
return {frame};};
