export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// cenas: A gancho (dedos + salsicha) | B olha pro fundo (dedos duplicam) | C PLOP salsicha | D cada olho vê diferente -> cérebro mistura | E olho que pula | F olho que manda | G comenta
const TA=3.85,TB=7.15,TC=9.95,TD=15.1,TE=20.7,TF=22.75;
const SK=['#ffe2c6','#f7bf95','#d98c62'],RED='#e5484d',GRN='#3ccf73';
// ---------- quarto (desenhado uma vez num canvas fora do ecrã) ----------
const room=document.createElement('canvas');room.width=1080;room.height=1920;
{const g=room.getContext('2d');const L=(x0,y0,x1,y1,st)=>{const q=g.createLinearGradient(x0,y0,x1,y1);st.forEach(([o,col])=>q.addColorStop(o,col));return q;};
 const R=(x,y,r0,r1,st)=>{const q=g.createRadialGradient(x,y,r0,x,y,r1);st.forEach(([o,col])=>q.addColorStop(o,col));return q;};
 const F=(fill,lw=0)=>{g.fillStyle=fill;g.fill();if(lw){g.lineWidth=lw;g.strokeStyle=NV;g.lineJoin='round';g.stroke();}};
 g.fillStyle=L(0,0,0,1920,[[0,'#ffe9c9'],[.6,'#ffd2a6'],[1,'#f0b27e']]);g.fillRect(0,0,1080,1920);
 // papel de parede com bolinhas
 g.fillStyle='rgba(255,255,255,.35)';for(let y=40;y<1500;y+=110)for(let x=(y/110%2)*55+20;x<1080;x+=110){g.beginPath();g.arc(x,y,10,0,7);g.fill();}
 // chão de madeira
 g.fillStyle=L(0,1480,0,1920,[[0,'#b86b3c'],[1,'#7a3e1d']]);g.fillRect(0,1480,1080,440);g.strokeStyle='rgba(0,0,0,.18)';g.lineWidth=4;for(let y=1540;y<1920;y+=70){g.beginPath();g.moveTo(0,y);g.lineTo(1080,y);g.stroke();}
 g.fillStyle='#fff3e0';g.fillRect(0,1460,1080,26);
 // janela
 g.beginPath();g.roundRect(250,320,580,640,30);F('#fff6ea',10);
 g.save();g.beginPath();g.roundRect(280,350,520,580,16);g.clip();
 g.fillStyle=L(0,350,0,930,[[0,'#59b8ff'],[1,'#bfe8ff']]);g.fillRect(280,350,520,580);
 g.beginPath();g.arc(700,450,60,0,7);F(R(700,450,10,70,[[0,'#fffbe0'],[1,'#ffd21f']]));
 for(const [x,y,s] of [[380,450,1],[600,560,.7]]){g.fillStyle='#fff';for(const [dx,dy,r] of [[0,0,40],[40,-15,48],[85,0,38]]){g.beginPath();g.arc(x+dx*s,y+dy*s,r*s,0,7);g.fill();}}
 g.beginPath();g.ellipse(420,960,260,170,0,0,7);F('#5cc96b');g.beginPath();g.ellipse(720,980,240,150,0,0,7);F('#3fae57');
 g.fillStyle='#7a4a2a';g.fillRect(345,700,26,140);g.beginPath();g.arc(358,680,80,0,7);F('#2f9a4b',6);
 g.restore();g.lineWidth=14;g.strokeStyle='#fff6ea';g.beginPath();g.moveTo(540,350);g.lineTo(540,930);g.moveTo(280,640);g.lineTo(800,640);g.stroke();
 g.beginPath();g.roundRect(220,950,640,44,14);F('#fff6ea',8);
 // gato no parapeito
 g.save();g.translate(640,950);
 g.beginPath();g.moveTo(60,-10);g.bezierCurveTo(140,-10,150,-90,110,-110);g.lineWidth=22;g.lineCap='round';g.strokeStyle='#ff9a3c';g.stroke();
 g.beginPath();g.ellipse(0,-70,70,75,0,0,7);F(L(0,-150,0,0,[[0,'#ffb35c'],[1,'#e9771f']]),7);
 g.beginPath();g.arc(0,-170,62,0,7);F('#ffa548',7);
 for(const s of [-1,1]){g.beginPath();g.moveTo(s*52,-200);g.lineTo(s*44,-262);g.lineTo(s*12,-226);g.closePath();F('#ffa548',7);}
 for(const s of [-1,1]){g.beginPath();g.arc(s*22,-176,9,0,7);g.fillStyle=NV;g.fill();g.beginPath();g.arc(s*22+3,-180,3,0,7);g.fillStyle='#fff';g.fill();}
 g.beginPath();g.arc(0,-158,6,0,7);g.fillStyle='#ff6d8a';g.fill();g.lineWidth=4;g.strokeStyle=NV;g.beginPath();g.arc(-8,-150,8,0,Math.PI*.9);g.stroke();g.beginPath();g.arc(8,-150,8,Math.PI*.1,Math.PI);g.stroke();
 g.restore();
 // prateleira com livros (esquerda) e planta (direita)
 g.beginPath();g.roundRect(20,560,190,24,6);F('#a8602f',6);
 [['#e5484d',60],['#4fa3ff',75],['#3ccf73',55],['#ffd21f',70]].forEach(([col,h],i)=>{g.beginPath();g.roundRect(34+i*42,560-h*1.6,36,h*1.6,5);F(col,5);});
 g.beginPath();g.moveTo(880,1460);g.lineTo(1040,1460);g.lineTo(1020,1300);g.lineTo(900,1300);g.closePath();F('#e86f3c',7);
 for(let i=0;i<7;i++){const a=-Math.PI/2+(i-3)*.32;g.beginPath();g.ellipse(960+Math.cos(a)*110,1300+Math.sin(a)*120,30,75,a+Math.PI/2,0,7);F('#2f9a4b',5);}
 g.fillStyle=R(540,640,60,1100,[[0,'rgba(255,255,255,.25)'],[1,'rgba(80,30,0,.35)']]);g.fillRect(0,0,1080,1920);}
function drawRoom(blur,z=1,dark=0){c.save();c.translate(540,800);c.scale(z,z);c.translate(-540,-800);if(blur>.3)c.filter=`blur(${blur}px)`;c.drawImage(room,-30,-30,1140,1980);c.filter='none';c.restore();
  if(dark>0){c.fillStyle=`rgba(13,22,54,${dark})`;c.fillRect(0,0,1080,1920);}}
// ---------- mãos / dedos ----------
const skinV=(y0,y1)=>lin(0,y0,0,y1,[[0,SK[0]],[.55,SK[1]],[1,SK[2]]]);
function hand(s,sleeve){// aponta para +x, ponta do dedo em (0,0)
  c.beginPath();c.roundRect(-1010,-90,380,290,30);fs(lin(0,-90,0,200,[[0,sleeve[0]],[1,sleeve[1]]]),8,NV);
  c.beginPath();c.roundRect(-660,-82,60,274,18);fs(sleeve[2],7,NV);
  c.beginPath();c.roundRect(-650,-70,300,290,120);fs(skinV(-70,220),8,NV);
  for(let i=2;i>=0;i--){c.beginPath();c.roundRect(-500,62+i*54,170,62,31);fs(skinV(62+i*54,124+i*54),7,NV);c.beginPath();c.ellipse(-365,80+i*54,14,8,0,0,7);c.fillStyle='rgba(255,255,255,.45)';c.fill();}
  c.beginPath();c.roundRect(-410,-50,410,100,[20,50,50,20]);fs(skinV(-50,50),8,NV);
  c.lineWidth=5;c.strokeStyle='rgba(150,70,40,.55)';c.lineCap='round';for(const x of [-150,-275]){c.beginPath();c.moveTo(x,-32);c.quadraticCurveTo(x-10,-10,x,6);c.stroke();c.beginPath();c.moveTo(x+14,-28);c.quadraticCurveTo(x+6,-12,x+14,0);c.stroke();}
  c.beginPath();c.roundRect(-94,-34,76,62,[12,28,28,12]);fs(lin(0,-34,0,28,[[0,'#fff1ec'],[1,'#f6c3b5']]),5,'rgba(150,70,40,.7)');
  c.beginPath();c.ellipse(-60,-18,20,6,0,0,7);c.fillStyle='rgba(255,255,255,.8)';c.fill();
  c.beginPath();c.ellipse(-230,-32,130,9,0,0,7);c.fillStyle='rgba(255,255,255,.4)';c.fill();
  c.save();c.translate(-460,-70);c.rotate(.12);c.beginPath();c.roundRect(-60,-34,200,68,34);fs(skinV(-34,34),7,NV);c.beginPath();c.roundRect(80,-24,46,44,[8,20,20,8]);fs('#fbd9cf',4,'rgba(150,70,40,.7)');c.restore();}
const SLV_L=['#4fa3ff','#2a6fd1','#ffd21f'],SLV_R=['#ff7aa8','#d9407a','#ffd21f'];
function finger(tx,y,side,s,alpha=1,blur=0,rot=0){if(alpha<=0)return;c.save();c.globalAlpha=alpha;if(blur>.3)c.filter=`blur(${blur}px)`;c.translate(tx,y);c.rotate(rot);c.scale(side*s,s);hand(s,side>0?SLV_L:SLV_R);c.restore();}
function pair(cx,y,gap,s,alpha=1,blur=0,dbl=0,rot=0){rot+=-.42;return pair0(cx,y,gap,s,alpha,blur,dbl,rot);}
function pair0(cx,y,gap,s,alpha,blur,dbl,rot){// dbl = separação da visão dupla
  if(dbl>0){for(const d of [-dbl,dbl]){finger(cx-gap/2+d,y,1,s,alpha*.55,blur,rot);finger(cx+gap/2+d,y,-1,s,alpha*.55,blur,-rot);}}
  else{finger(cx-gap/2,y,1,s,alpha,blur,rot);finger(cx+gap/2,y,-1,s,alpha,blur,-rot);}}
function pointer(x,y,s){c.save();c.translate(x,y);c.rotate(-Math.PI/2);c.scale(s,s);hand(s,SLV_L);c.restore();}
// ---------- salsicha ----------
function glow(x,y,r,col='255,220,90',a=.6){c.fillStyle=rad(x,y,0,r,[[0,`rgba(${col},${a})`],[1,`rgba(${col},0)`]]);c.fillRect(x-r,y-r,2*r,2*r);}
function sausage(x,y,s,t,o={}){const a=o.alpha??1;if(a<=0||s<=0)return;c.save();c.translate(x,y);c.rotate(o.rot||0);c.scale(s,s);c.globalAlpha=a;
  if(o.glow!==false)glow(0,0,260,'255,220,90',.55+.15*Math.sin(t*6));
  c.beginPath();c.roundRect(-130,-50,260,100,50);fs(lin(0,-50,0,50,[[0,'#ffd6b5'],[.5,'#f5a77a'],[1,'#c7724a']]),8,NV);
  for(const sd of [-1,1]){c.save();c.scale(sd,1);c.beginPath();c.roundRect(-122,-30,60,58,[26,10,10,26]);fs(lin(0,-30,0,28,[[0,'#fff1ec'],[1,'#f6c3b5']]),5,'rgba(150,70,40,.7)');c.beginPath();c.ellipse(-96,-16,16,5,0,0,7);c.fillStyle='rgba(255,255,255,.85)';c.fill();c.restore();}
  c.beginPath();c.ellipse(-10,-32,70,8,0,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  if(o.face){const bl=(t%2.6)<.12?.15:1;for(const sd of [-1,1]){c.beginPath();c.ellipse(sd*22,-6,8,11*bl,0,0,7);c.fillStyle=NV;c.fill();if(bl>.5){c.beginPath();c.arc(sd*22+3,-10,3,0,7);c.fillStyle='#fff';c.fill();}
      c.beginPath();c.ellipse(sd*42,12,11,6,0,0,7);c.fillStyle='rgba(255,90,120,.5)';c.fill();}
    c.beginPath();c.arc(0,8,13,.15,Math.PI-.15);c.lineWidth=5;c.strokeStyle=NV;c.lineCap='round';c.stroke();}
  c.restore();}
// ---------- olhos, cérebro, coroa, partículas ----------
function eye(x,y,r,open,lx=0,ly=0,s=1){c.save();c.translate(x,y);c.scale(s,s);open=clamp(open,0,1);
  if(open<.12){c.lineWidth=10;c.strokeStyle=NV;c.lineCap='round';c.beginPath();c.arc(0,-r*.35,r,Math.PI*.22,Math.PI*.78);c.stroke();
    for(let i=0;i<4;i++){const a=Math.PI*(.3+i*.13);c.beginPath();c.moveTo(Math.cos(a)*r,-r*.35+Math.sin(a)*r);c.lineTo(Math.cos(a)*r*1.18,-r*.35+Math.sin(a)*r*1.2);c.stroke();}c.restore();return;}
  const ry=r*.82*open;c.beginPath();c.ellipse(0,0,r,ry,0,0,7);fs(rad(-r*.2,-ry*.3,5,r*1.1,[[0,'#ffffff'],[1,'#dfe6f5']]),9,NV);
  c.save();c.beginPath();c.ellipse(0,0,r,ry,0,0,7);c.clip();const ix=lx*r*.35,iy=ly*r*.3;c.beginPath();c.arc(ix,iy,r*.5,0,7);fs(rad(ix,iy,r*.1,r*.5,[[0,'#7fd3ff'],[1,'#2a6fd1']]),5,NV);
  c.beginPath();c.arc(ix,iy,r*.24,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(ix-r*.14,iy-r*.15,r*.11,0,7);c.fillStyle='#fff';c.fill();c.restore();
  c.lineWidth=8;c.strokeStyle=NV;c.lineCap='round';for(let i=0;i<3;i++){const a=-Math.PI*(.32+i*.18);c.beginPath();c.moveTo(Math.cos(a)*r*.95,Math.sin(a)*ry*.95);c.lineTo(Math.cos(a)*r*1.2,Math.sin(a)*ry*1.0-r*.25);c.stroke();}
  c.restore();}
function brain(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.rotate(Math.sin(t*3)*.05);
  const B=[[-70,-20,70],[-20,-55,72],[45,-45,70],[80,10,62],[20,30,70],[-55,35,60]];c.beginPath();for(const [bx,by,r] of B){c.moveTo(bx+r,by);c.arc(bx,by,r,0,7);}c.fillStyle=NV;c.save();c.lineWidth=18;c.strokeStyle=NV;c.stroke();c.restore();
  c.fillStyle=lin(0,-120,0,100,[[0,'#ffc1d6'],[1,'#ff7fae']]);c.fill();
  c.lineWidth=6;c.strokeStyle='#c94a7d';c.lineCap='round';c.beginPath();c.moveTo(5,-110);c.bezierCurveTo(-15,-60,25,-20,0,40);c.stroke();
  for(const [a,b,d,e] of [[-90,-30,-50,-10],[-60,40,-20,20],[40,-70,70,-30],[50,20,100,10]]){c.beginPath();c.moveTo(a,b);c.quadraticCurveTo((a+d)/2,b-25,d,e);c.stroke();}
  c.beginPath();c.ellipse(-30,-80,30,10,-.4,0,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();
  for(const sd of [-1,1]){c.beginPath();c.arc(sd*30,-5,10,0,7);c.fillStyle=NV;c.fill();}c.beginPath();c.arc(0,15,16,.2,Math.PI-.2);c.lineWidth=6;c.strokeStyle=NV;c.stroke();c.restore();}
function crown(x,y,s,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.moveTo(-110,50);c.lineTo(-120,-50);c.lineTo(-60,0);c.lineTo(0,-75);c.lineTo(60,0);c.lineTo(120,-50);c.lineTo(110,50);c.closePath();
  fs(lin(0,-75,0,50,[[0,'#fff3a0'],[.5,'#ffd21f'],[1,'#e19a00']]),8,NV);for(const [gx,gy,col] of [[-60,22,RED],[0,22,'#4fa3ff'],[60,22,GRN]]){c.beginPath();c.arc(gx,gy,13,0,7);fs(col,5,NV);}
  for(const [gx,gy] of [[-120,-50],[0,-75],[120,-50]]){c.beginPath();c.arc(gx,gy,12,0,7);fs('#fff3a0',5,NV);}c.restore();}
function spark(x,y,r,a=1,col='#fff'){if(r<=0)return;c.save();c.globalAlpha=clamp(a,0,1);c.translate(x,y);c.beginPath();for(let i=0;i<8;i++){const rr=i%2?r*.28:r;const an=i*Math.PI/4;c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();c.fillStyle=col;c.fill();c.restore();}
function sparkles(cx,cy,R,t,n=10,col='#fff'){for(let i=0;i<n;i++){const a=i*2.399+t*.6;const rr=R*(.55+.45*((i*37)%10)/10);const k=(t*1.3+i*.37)%1;spark(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.8,(10+(i%3)*8)*Math.sin(k*Math.PI),Math.sin(k*Math.PI),col);}}
function burst(cx,cy,k,n=14,col=Y){if(k<0||k>1)return;for(let i=0;i<n;i++){const a=i/n*Math.PI*2+i;const d=60+k*360*(.7+.3*((i*7)%5)/5);c.save();c.globalAlpha=1-k;c.beginPath();c.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,(14+(i%3)*6)*(1-k*.6),0,7);fs(i%2?col:'#fff',4,NV);c.restore();}}
function motes(t){for(let i=0;i<26;i++){const x=(i*173+t*20*(1+i%3))%1080,y=(i*331+Math.sin(t+i)*40)%1400+100;c.beginPath();c.arc(x,y,2+(i%3)*1.5,0,7);c.fillStyle=`rgba(255,255,255,${.25+.2*Math.sin(t*2+i)})`;c.fill();}}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);text(txt,0,4,size,fg,0);c.restore();}
function title(a,b,s,y=190,sa=92,sb=104,cb=Y){if(s<=0)return;c.save();c.translate(540,y);c.scale(s,s);text(a,0,-56,sa,'#fff',20);text(b,0,56,sb,cb,20);c.restore();}
function cam(z,dx=0,dy=0){c.translate(540+dx,960+dy);c.scale(z,z);c.translate(-540,-960);}
function speedLines(x,y,dir,k){if(k<0||k>1)return;c.save();c.globalAlpha=1-k;c.strokeStyle='#fff';c.lineWidth=10;c.lineCap='round';for(let i=0;i<4;i++){const yy=y-90+i*60;c.beginPath();c.moveTo(x-dir*(60+k*40),yy);c.lineTo(x-dir*(200+k*40-i*20),yy);c.stroke();}c.restore();}
// ---------- quadro ----------
function frame(t){
 // A — gancho: dedos já a juntar e salsicha a brilhar entre eles
 if(t<TA){const z=1.04+.05*ease(t/TA);c.save();cam(z,0,0);drawRoom(14);c.restore();motes(t);
   c.save();cam(1+.03*Math.sin(t*1.5));const gap=200-110*ease(t/1.2)+6*Math.sin(t*5);
   sausage(540,980+Math.sin(t*3)*8,.95+.04*Math.sin(t*6),t,{alpha:.55+.15*Math.sin(t*5),face:true});
   pair(540,980,gap,1.0,1,0,0,Math.sin(t*2)*.02);sparkles(540,980,240,t,10,'#fff6b0');c.restore();
   title('SEU DEDO VIRA','UMA SALSICHA!',1+.03*Math.sin(t*5),200,96,100);
   if(t>2.2)pill(540,1260,back((t-2.2)/.3),'NA FRENTE DOS OLHOS','#fff',NV,44,-.03);
   return;}
 // B — olha lá pro fundo: o fundo fica nítido, os dedos ficam duplos e transparentes
 if(t<TB){const k=t-TA;const f=ease(k/1.4);c.save();cam(1.09-.04*f);drawRoom(14*(1-f));c.restore();motes(t);
   const dbl=f*58;c.save();cam(1.02);pair(540,1000,70,1.0,1,4*f,dbl,0);c.restore();
   // alvo no gato
   if(k>.5){const q=back((k-.5)/.35);c.save();c.translate(640,800);c.scale(q,q);c.globalAlpha=.85;c.lineWidth=9;c.strokeStyle=Y;c.setLineDash([26,16]);c.lineDashOffset=-t*60;c.beginPath();c.arc(0,0,150+6*Math.sin(t*6),0,7);c.stroke();c.restore();}
   title('OLHA LÁ','NO FUNDO!',back(k/.35),200,96,110);
   if(k>2.05){const q=back((k-2.05)/.3);pill(540,1270,q,'NÃO OLHA PROS DEDOS!',RED,'#fff',46,.03);}
   return;}
 // C — PLOP: a salsicha aparece a flutuar
 if(t<TC){const k=t-TB;const sh=k>.15&&k<.45?Math.sin(k*90)*10*(1-(k-.15)/.3):0;
   c.save();cam(1.05+.03*ease(k/2.5),sh,0);drawRoom(4,1,.25);c.restore();
   c.save();cam(1.06+.04*ease(k/2.5),sh,0);pair(540,1000,250,1.0,.95,2.5,0,0);
   const s=k<.15?0:back((k-.15)/.4)*1.25;burst(540,990,(k-.15)/.7,16);sausage(540,990+Math.sin(t*3)*14,s,t,{face:true,rot:Math.sin(t*2)*.06});sparkles(540,990,300,t,12,'#fff6b0');c.restore();
   if(k>.15&&k<1.1){const q=back((k-.15)/.25);c.save();c.translate(800,770);c.rotate(.15);c.scale(q,q);c.globalAlpha=clamp((1.1-k)/.25,0,1);c.beginPath();for(let i=0;i<=20;i++){const a=i/20*Math.PI*2,r=i%2?85:125;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r);}c.closePath();fs('#fff',8,NV);text('PLOP!',0,6,62,RED,0);c.restore();}
   title('APARECEU UMA','SALSICHA!',back(k/.3),200,86,124);
   if(k>.7)pill(540,1280,back((k-.7)/.3),'FLUTUANDO NO MEIO',Y,NV,46,-.03);
   return;}
 // D — cada olho vê de um jeito; o cérebro mistura
 if(t<TD){const k=t-TC;K.sunburst(540,900,'#0e1b4a','#132460',t*.06,22);
   const m=ease((k-2.85)/.9);// fusão (cérebro mistura)
   const ey=470-m*80;const ea=1-m;
   if(ea>0){c.save();c.globalAlpha=ea;eye(330,ey,105,clamp(back(k/.35),0,1),.3,.3);eye(750,ey,105,clamp(back((k-.1)/.35),0,1),-.3,.3);
     text('ESQUERDO',330,ey-150,40,'#fff',10);text('DIREITO',750,ey-150,40,'#fff',10);c.restore();}
   const pw=420-(-280)*m*0,ph=380;const xs=[330+210*m,750-210*m];const sh=[34,-34];
   xs.forEach((px,i)=>{const p=back((k-.25-i*.15)/.4);if(p<=0)return;c.save();c.translate(px,930);c.scale(p,p);
     // cone de visão
     if(ea>.05){c.save();c.globalAlpha=.35*ea;c.fillStyle='#ffd21f';c.beginPath();c.moveTo(0,ey-930+70);c.lineTo(-pw/2,-ph/2);c.lineTo(pw/2,-ph/2);c.closePath();c.fill();c.restore();}
     c.globalAlpha=m>0?1-.45*m:1;c.beginPath();c.roundRect(-pw/2,-ph/2,pw,ph,36);c.save();c.clip();c.drawImage(room,-pw/2-260,-ph/2-520,1080*.92,1920*.92);
     c.fillStyle='rgba(255,255,255,.15)';c.fillRect(-pw/2,-ph/2,pw,ph);
     c.save();c.translate(sh[i]*(1-m*0),40);pair(0,0,46,.34,1,0,0,0);c.restore();c.restore();
     c.lineWidth=9;c.strokeStyle=i?'#ff7aa8':'#4fa3ff';c.stroke();c.restore();});
   if(m>0){const q=back((k-2.85)/.4);brain(540,ey+10,q*.95,t);sparkles(540,ey+10,200,t,8,'#ffc1d6');}
   if(k>3.75){const q=back((k-3.75)/.35);sausage(540,970,q*.62,t,{face:true});burst(540,970,(k-3.75)/.6,12);}
   if(m<.5)title('CADA OLHO','VÊ DIFERENTE',back(k/.35),180,84,92);
   else title('O CÉREBRO','MISTURA TUDO!',back((k-2.9)/.35),160,84,92,'#ffc1d6');
   return;}
 // E — aponta e fecha um olho de cada vez: num deles o dedo PULA
 if(t<TE){const k=t-TD;c.save();cam(1.02+.03*ease(k/5));drawRoom(1.5);c.restore();motes(t);
   // olho esquerdo fecha 17.4–18.5, direito fecha 18.7–20.6
   const L=t>17.4&&t<18.5?0:1,R=t>18.7?0:1;const jump=t>19.7?ease((t-19.7)/.18):0;const up=ease((k-.95)/.6);
   const px=600+jump*230;const py=2100-up*(2100-1060);
   if(k>.9){c.save();c.translate(0,0);pointer(px+Math.sin(t*4)*3*(1-jump),py,1.05);c.restore();
     if(t>17.4&&t<18.5){const q=back((t-17.4)/.3);c.save();c.translate(640,730);c.scale(q,q);c.beginPath();c.arc(0,0,60,0,7);fs(GRN,7,NV);c.lineWidth=14;c.strokeStyle='#fff';c.lineCap='round';c.beginPath();c.moveTo(-26,2);c.lineTo(-6,22);c.lineTo(28,-20);c.stroke();c.restore();}
     speedLines(px-60,1000,1,(t-19.7)/.5);
     if(t>19.75){const q=back((t-19.75)/.25);c.save();c.translate(870,820);c.rotate(.12);c.scale(q,q);c.beginPath();for(let i=0;i<=20;i++){const a=i/20*Math.PI*2,r=i%2?80:120;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r);}c.closePath();fs(Y,8,NV);text('PULA!',0,6,60,RED,0);c.restore();}}
   if(k<1.05){const q=back((k-.12)/.3);c.save();c.translate(540,860);c.scale(q*1.1,q*1.1);c.rotate(-.06);c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=i%2?150:200;c.lineTo(Math.cos(a)*r*1.5,Math.sin(a)*r);}c.closePath();fs(Y,9,NV);text('E TEM',0,-40,80,NV,0);text('MAIS!',0,50,96,RED,0);c.restore();}
   else{// olhos HUD no topo
     const hs=back((k-1.05)/.3);c.save();c.translate(540,330);c.scale(hs,hs);c.beginPath();c.roundRect(-330,-120,660,240,60);fs('rgba(13,22,54,.8)',6,'#fff');
     eye(-150,0,82,L,.1,-.4);eye(150,0,82,R,-.1,-.4);c.restore();
     if(t>17.2)pill(540,560,back((t-17.2)/.3),t<18.6?'FECHA UM OLHO…':'AGORA O OUTRO!','#fff',NV,44,-.02);
     if(t<17.2)pill(540,560,back((k-1.1)/.3),'APONTA PRO GATO',Y,NV,44,.02);}
   return;}
 // F — esse é o seu olho que manda
 if(t<TF){const k=t-TE;K.sunburst(540,900,'#6a3fd1','#7d52e6',t*.15,22);sparkles(540,880,380,t,14,'#fff3a0');
   const s=back(k/.35);eye(540,900,210,1,Math.sin(t*2)*.3,0,s);
   const cy=-200+ease((k-.25)/.35)*(900-250+200);const bounce=k>.6?Math.sin((k-.6)*14)*Math.exp(-(k-.6)*5)*18:0;crown(540,cy+bounce,1.35,Math.sin(t*3)*.05);
   if(k>.6)burst(540,650,(k-.6)/.7,12);
   title('ESSE É O SEU','OLHO QUE MANDA',back(k/.3),190,84,92);
   pill(540,1250,back((k-.8)/.3),'OLHO DOMINANTE',Y,NV,50,-.03);
   return;}
 // G — comenta: viu a salsicha?
 const k=t-TF;c.save();cam(1.06);drawRoom(12,1,.15);c.restore();motes(t);
 c.save();cam(1+.02*Math.sin(t*2));pair(540,930,250,1.0,1,0,0,0);sausage(540,930+Math.sin(t*3)*12,1.05,t,{face:true,rot:Math.sin(t*2)*.06});sparkles(540,930,280,t,10,'#fff6b0');c.restore();
 title('VIU A','SALSICHA?',back(k/.3),200,96,124);
 const pulse=1+.05*Math.sin(t*8);pill(350,1330,back((k-.55)/.3)*pulse,'SIM',GRN,'#fff',70,-.04);pill(730,1330,back((k-.8)/.3)*pulse,'NÃO',RED,'#fff',70,.04);
}
return {frame};};
