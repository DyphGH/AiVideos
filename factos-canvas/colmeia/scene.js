export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
// início de cada frase da voz (s) — ajustar ao MP3
const T=[0,3.56,6.66,9.85,14.26,19.11,24.12,28.21,32.12,35.27,38.37],END=43.4;
const RED='#e5484d',GRN='#3ccf73',HON='#ffb31a',WAX='#ffe08a',BARK='#8a5a32',BARKD='#5e3a1e';
// ---------- helpers ----------
function fit(s,x,y,size,maxW,fill='#fff',lw=18){c.font=`900 ${size}px M`;const w=c.measureText(s).width;const k=Math.min(1,maxW/w);text(s,x,y,size*k,fill,lw*Math.max(.7,k));}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);c.restore();text(txt,0,4,size,fg,0);c.restore();}
function header(l1,l2,t0,t,c2=Y){if(window.nohead)return;const p=t0<=0?1:back((t-t0)/.35);if(p<=0)return;const pu=1+.025*Math.sin(t*6);c.save();c.translate(540,215);c.scale(p*pu,p*pu);fit(l1,0,-62,78,980,'#fff',18);fit(l2,0,52,118,1000,c2,22);c.restore();}
function flash(t,t0){const k=t-t0;if(k<0||k>.25)return;c.fillStyle=`rgba(255,255,255,${.7*(1-k/.25)})`;c.fillRect(0,0,1080,1920);}
function cam(s,x,y,fn,rot=0){c.save();c.translate(540,900);c.rotate(rot);c.scale(s,s);c.translate(-540+x,-900+y);fn();c.restore();}
function punch(t,t0,a=.08){const k=t-t0;return k<0?1:1+a*Math.exp(-k*7);}
function sparkle(x,y,r,a){c.save();c.translate(x,y);c.globalAlpha=clamp(a,0,1);c.beginPath();for(let i=0;i<8;i++){const ang=i*Math.PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
function check(x,y,s){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.arc(0,0,60,0,7);fs(GRN,8,NV);c.beginPath();c.moveTo(-28,2);c.lineTo(-8,24);c.lineTo(30,-22);c.lineCap='round';c.lineJoin='round';c.lineWidth=16;c.strokeStyle='#fff';c.stroke();c.restore();}
function cross(x,y,s){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.arc(0,0,60,0,7);fs(RED,8,NV);c.lineCap='round';c.lineWidth=16;c.strokeStyle='#fff';c.beginPath();c.moveTo(-24,-24);c.lineTo(24,24);c.moveTo(24,-24);c.lineTo(-24,24);c.stroke();c.restore();}
const sp=(t,i)=>T[i]??END;const kk=(t,i)=>t-sp(t,i);
// ---------- abelha ----------
function bee(x,y,s,t,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);c.scale((o.flip?-1:1)*s,s);
  const fl=o.fan?Math.sin(t*70):Math.sin(t*55);
  // asas
  for(const [dx,ry] of [[-14,1],[12,.85]]){c.save();c.translate(dx,-34);c.rotate(-.5+fl*.45);c.beginPath();c.ellipse(0,-34*ry,22,40*ry,0,0,7);c.fillStyle='rgba(220,240,255,.75)';c.fill();c.lineWidth=4;c.strokeStyle=NV;c.stroke();c.restore();}
  // ferrão
  c.beginPath();c.moveTo(-70,8);c.lineTo(-92,14);c.lineTo(-70,20);c.closePath();fs('#2a2a3a',4,NV);
  // corpo
  c.beginPath();c.ellipse(-20,10,56,44,0,0,7);fs(rad(-36,-10,6,70,[[0,'#fff3a8'],[.5,'#ffd21f'],[1,'#e09a00']]),6,NV);
  c.save();c.beginPath();c.ellipse(-20,10,56,44,0,0,7);c.clip();c.fillStyle='#1d1d2a';for(const sx of [-52,-26,0])c.fillRect(sx,-40,13,100);c.restore();
  c.beginPath();c.ellipse(-20,10,56,44,0,0,7);c.lineWidth=6;c.strokeStyle=NV;c.stroke();
  // cabeça
  c.beginPath();c.arc(40,0,36,0,7);fs(rad(30,-12,4,44,[[0,'#3a3a4e'],[1,'#15151f']]),6,NV);
  for(const [ax,ay] of [[34,-30],[52,-28]]){c.beginPath();c.moveTo(ax,ay);c.quadraticCurveTo(ax+10,ay-30,ax+22,ay-36);c.lineWidth=5;c.strokeStyle=NV;c.lineCap='round';c.stroke();c.beginPath();c.arc(ax+22,ay-36,6,0,7);fs('#1d1d2a',0);}
  c.beginPath();c.ellipse(52,-6,12,15,0,0,7);fs('#fff',4,NV);c.beginPath();c.arc(55+(o.look||0)*3,-4,6,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(57,-7,2.2,0,7);c.fillStyle='#fff';c.fill();
  c.beginPath();c.ellipse(60,14,7,4,0,0,7);c.fillStyle='rgba(255,120,150,.6)';c.fill();
  c.beginPath();if(o.sad){c.arc(52,26,9,Math.PI+.4,-.4);}else c.arc(50,12,10,.3,Math.PI-.3);c.lineWidth=4;c.strokeStyle='#fff';c.stroke();
  // perninhas
  c.lineWidth=5;c.strokeStyle=NV;for(const lx of [-34,-14,6]){c.beginPath();c.moveTo(lx,48);c.lineTo(lx-6,66);c.stroke();}
  if(o.brush){c.save();c.translate(70,30);c.rotate(.6+Math.sin(t*10)*.3);c.beginPath();c.roundRect(-4,0,8,40,4);fs('#c98a4b',3,NV);c.beginPath();c.ellipse(0,46,10,12,0,0,7);fs('#ff8a1c',3,NV);c.restore();}
  if(o.wet){for(let i=0;i<3;i++){const ph=(t*1.5+i/3)%1;c.beginPath();c.ellipse(-30+i*30,50+ph*40,5,8,0,0,7);c.fillStyle=`rgba(120,200,255,${1-ph})`;c.fill();}}
  c.restore();}
// ---------- hexágonos / favos ----------
function hexPath(x,y,r){c.beginPath();for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}c.closePath();}
function hexGrid(cx,cy,r,cols,rows,fn){const w=Math.sqrt(3)*r,h=1.5*r;for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=cx+(i-(cols-1)/2)*w+(j%2?w/2:0),y=cy+(j-(rows-1)/2)*h;fn(x,y,i,j);}}
function cell(x,y,r,fill=WAX,cap=0,honey=0,shine=0){hexPath(x,y,r);fs(fill,Math.max(2,r*.1),'#b07800');
  if(honey>0){hexPath(x,y,r*.78);c.fillStyle=rad(x-r*.2,y-r*.2,1,r,[[0,`rgba(255,220,120,${honey})`],[1,`rgba(230,140,0,${honey})`]]);c.fill();}
  if(cap>0){c.save();c.globalAlpha=cap;hexPath(x,y,r*.86);c.fillStyle=lin(x,y-r,x,y+r,[[0,'#ffffff'],[1,'#f1e6c8']]);c.fill();c.restore();}
  if(shine){c.beginPath();c.ellipse(x-r*.25,y-r*.3,r*.2,r*.1,-.6,0,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();}}
// ---------- cenário ----------
function sky(t){c.fillStyle=lin(0,0,0,1920,[[0,'#7cc8ff'],[.55,'#cdeeff'],[.56,'#6cc45a'],[1,'#3f9a3a']]);c.fillRect(0,0,1080,1920);
  for(let i=0;i<3;i++){const x=((i*400+t*25)%1400)-200,y=420+i*90;c.fillStyle='rgba(255,255,255,.9)';for(const [dx,r] of [[0,40],[40,55],[90,40]]){c.beginPath();c.arc(x+dx,y,r,0,7);c.fill();}}
  for(let i=0;i<14;i++){const x=(i*83)%1080,y=1100+(i*37)%500;c.fillStyle=['#ff6b9a','#ffd21f','#ffffff','#b197fc'][i%4];for(let p=0;p<5;p++){c.beginPath();c.arc(x+Math.cos(p*1.26)*9,y+Math.sin(p*1.26)*9,7,0,7);c.fill();}c.beginPath();c.arc(x,y,6,0,7);c.fillStyle='#ffb31a';c.fill();}}
function trunk(cx,w,t,o={}){c.save();c.beginPath();c.moveTo(cx-w/2,1920);c.lineTo(cx-w/2+20,-20);c.lineTo(cx+w/2-20,-20);c.lineTo(cx+w/2,1920);c.closePath();fs(lin(cx-w/2,0,cx+w/2,0,[[0,BARKD],[.3,BARK],[.6,'#a8703f'],[1,BARKD]]),8,'#3a2410');
  c.save();c.clip();c.strokeStyle='rgba(40,20,5,.35)';c.lineWidth=6;for(let i=0;i<18;i++){const x=cx-w/2+((i*61)%w);c.beginPath();c.moveTo(x,(i*97)%1900);c.quadraticCurveTo(x+12,((i*97)%1900)+90,x-4,((i*97)%1900)+200);c.stroke();}c.restore();
  if(o.hole){const r=o.hole;c.beginPath();c.ellipse(cx,o.hy,r,r*1.1,0,0,7);fs(rad(cx,o.hy,2,r,[[0,'#120a04'],[1,'#3a2410']]),6,'#2a1408');}
  c.restore();}
function hollow(cx,cy,w,h,t,o={}){// corte do tronco: madeira por fora, oco claro por dentro
  c.save();c.beginPath();c.roundRect(cx-w/2,cy-h/2,w,h,60);fs(lin(cx-w/2,0,cx+w/2,0,[[0,BARKD],[.2,BARK],[.8,BARK],[1,BARKD]]),8,'#3a2410');
  c.beginPath();c.roundRect(cx-w/2+70,cy-h/2+70,w-140,h-140,90);fs(lin(0,cy-h/2,0,cy+h/2,[[0,'#3a2410'],[.15,'#d9b07a'],[1,'#c4955c']]),6,'#3a2410');c.restore();}
function crack(x,y,L,t,sealed=0){c.save();c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(x,y);for(let i=1;i<=6;i++)c.lineTo(x+((i%2)?10:-8),y+L*i/6);c.lineWidth=12;c.strokeStyle='#1a0c04';c.stroke();
  if(sealed>0){c.globalAlpha=sealed;c.lineWidth=20;c.strokeStyle='#e8791a';c.stroke();c.lineWidth=7;c.strokeStyle='#ffb35c';c.stroke();}c.restore();}
// ---------- cenas ----------
function s0(t){// gancho: abelha a voar até ao tronco
  sky(t);trunk(720,380,t,{hole:46,hy:1080});
  const p=ease(clamp(t/3,0,1));const bx=280+p*350,by=760+Math.sin(t*5)*30+p*250;
  cam(1.04+.05*ease(t/3.2),0,0,()=>{bee(bx,by,1.5,t,{look:1});
    const q=back((t+.3)/.3);c.save();c.translate(bx+120,by-170);c.scale(q,q);c.beginPath();c.arc(0,0,58,0,7);fs('#fff',7,NV);text('?',0,6,84,NV,0);c.restore();});
  header('VOCÊ PRECISA CONSTRUIR','UMA COLMEIA!',0,t);}
function s1(t){const k=kk(t,1);c.fillStyle='#f6e7c8';c.fillRect(0,0,1080,1920);
  cam(punch(t,T[1])*(1+.05*ease(k/3.4)),0,0,()=>{hollow(540,900,700,1200,t);bee(540,820+Math.sin(t*5)*20,1.2,t);
    pill(540,1350,back((k-.4)/.3),'DE GRAÇA!',GRN,'#fff',58,-.04);});
  header('UMA CASA GRÁTIS:','ÁRVORE OCA',T[1],t);flash(t,T[1]);}
function rain(t,a=1){c.save();c.globalAlpha=a;c.strokeStyle='rgba(170,215,255,.85)';c.lineWidth=5;c.lineCap='round';for(let i=0;i<70;i++){const x=(i*137)%1100,y=((i*251)+t*1400)%2000-40;c.beginPath();c.moveTo(x,y);c.lineTo(x-14,y+50);c.stroke();}c.restore();}
const CR=[[290,520,260],[790,700,300],[300,1100,240],[780,1250,200]];
function s2(t){const k=kk(t,2);c.fillStyle='#4a5a70';c.fillRect(0,0,1080,1920);
  cam(punch(t,T[2])*(1+.05*ease(k/2.8)),0,0,()=>{hollow(540,900,700,1200,t);
    for(const [x,y,L] of CR){crack(x,y,L,t);for(let i=0;i<3;i++){const ph=(t*1.2+i/3+x)%1;c.beginPath();c.ellipse(x+(x<540?40:-40)*ph,y+L*.5+ph*120,8,12,0,0,7);c.fillStyle=`rgba(120,200,255,${1-ph})`;c.fill();}}
    // poça
    c.beginPath();c.ellipse(540,1400,220*ease(k/2),30,0,0,7);c.fillStyle='rgba(120,200,255,.6)';c.fill();
    bee(540,900+Math.sin(t*3)*10,1.15,t,{sad:1,wet:1});});
  rain(t);header('MAS AÍ CHOVE…','E A ÁGUA ENTRA!',T[2],t,'#9cd4ff');flash(t,T[2]);}
function s3(t){const k=kk(t,3);const dur=sp(t,4)-T[3];c.fillStyle='#f6e7c8';c.fillRect(0,0,1080,1920);
  cam(punch(t,T[3])*(1+.04*ease(k/5)),0,0,()=>{hollow(540,900,700,1200,t);
    CR.forEach(([x,y,L],i)=>{const sd=clamp((k-.4-i*dur*.17)/(dur*.15),0,1);crack(x,y,L,t,sd);});
    const i=Math.min(3,Math.floor(clamp((k-.4)/(dur*.17),0,3.99)));const [x,y,L]=CR[i];const u=clamp(((k-.4)-i*dur*.17)/(dur*.15),0,1);
    bee(x+(x<540?90:-90),y+L*u,1.0,t,{brush:1,flip:x>540});
    if(k>.6){pill(540,1440,back((k-.6)/.3),'PRÓPOLIS',HON,NV,62,-.03);}
    if(k>dur*.55){c.save();c.translate(540,600);c.globalAlpha=clamp((k-dur*.55)*3,0,1);text('🌿 RESINA DAS PLANTAS'.replace('🌿 ',''),0,0,44,'#2f6b2a',10);c.restore();}});
  header('TAPA AS FRESTAS','COM PRÓPOLIS',T[3],t,HON);flash(t,T[3]);}
function s4(t){const k=kk(t,4);const dur=sp(t,5)-T[4];c.fillStyle=lin(0,0,0,1920,[[0,'#fff3d0'],[1,'#ffd98a']]);c.fillRect(0,0,1080,1920);
  const n=clamp(k/1.2,0,1);const R=66;
  cam(punch(t,T[4])*(1+.04*ease(k/5)),0,0,()=>{let idx=0;
    for(let j=0;j<5;j++)for(let i=0;i<6;i++){const x=540+(i-2.5)*2*R,y=760+(j-2)*2*R;if(idx++/30>n)continue;c.beginPath();c.arc(x,y,R-3,0,7);fs(rad(x-20,y-20,4,R,[[0,'#ffe9a8'],[1,'#ffc21f']]),6,'#b07800');}
    // buracos entre círculos a piscar
    if(k>dur*.35){const a=.5+.5*Math.sin(t*10);for(let j=0;j<4;j++)for(let i=0;i<5;i++){const x=540+(i-2)*2*R,y=760+(j-1.5)*2*R;c.beginPath();c.moveTo(x,y-R*.42);c.quadraticCurveTo(x,y,x+R*.42,y);c.quadraticCurveTo(x,y,x,y+R*.42);c.quadraticCurveTo(x,y,x-R*.42,y);c.quadraticCurveTo(x,y,x,y-R*.42);c.fillStyle=`rgba(229,72,77,${a})`;c.fill();}}
    if(k>dur*.6){cross(860,1180,back((k-dur*.6)/.3));pill(450,1200,back((k-dur*.65)/.3),'CERA = $$$',RED,'#fff',56,-.04);}});
  if(k<dur*.35)header('POTES PRO MEL:','REDONDOS?',T[4],t,HON);else header('SOBRA BURACO…','E CERA É CARA!',T[4]+dur*.35,t,'#ff8a8f');flash(t,T[4]);}
function s5(t){const k=kk(t,5);const dur=sp(t,6)-T[5];c.fillStyle=lin(0,0,0,1920,[[0,'#fff3d0'],[1,'#ffd98a']]);c.fillRect(0,0,1080,1920);
  const m=ease(clamp(k/.8,0,1));
  cam(punch(t,T[5])*(1+.04*ease(k/6)),0,0,()=>{hexGrid(540,720,64,7,6,(x,y,i,j)=>{c.save();c.globalAlpha=1;const r=64*(1-m*.04);if(m<1){c.beginPath();c.arc(x,y,r*.95,0,7);c.globalAlpha=1-m;fs(WAX,5,'#b07800');c.globalAlpha=m;}cell(x,y,r,rad(x-20,y-20,4,64,[[0,'#ffe9a8'],[1,'#ffc21f']]),0,0,1);c.restore();});
    if(k>1.0)check(880,520,back((k-1.0)/.3));
    if(k>dur*.5){// comparação de formas
      const q=back((k-dur*.5)/.35);c.save();c.translate(540,1330);c.scale(q,q);c.beginPath();c.roundRect(-420,-120,840,240,40);fs('#fff',7,NV);
      c.beginPath();c.moveTo(-280,-60);c.lineTo(-220,50);c.lineTo(-340,50);c.closePath();fs(WAX,5,'#b07800');c.beginPath();c.rect(-60,-55,110,110);fs(WAX,5,'#b07800');hexPath(270,0,66);fs(HON,6,'#b07800');
      text('OK',-280,92,32,NV,0);text('OK',0,92,32,NV,0);text('MELHOR!',270,92,32,'#2f9e44',0);c.restore();}});
  if(k<dur*.38)header('O HEXÁGONO','ENCAIXA PERFEITO!',T[5],t,HON);else header('MAIS MEL,','MENOS CERA!',T[5]+dur*.38,t,GRN);flash(t,T[5]);}
function comb(x,y,h,t){c.save();c.beginPath();c.roundRect(x-22,y,44,h,[6,6,22,22]);fs(lin(x-22,0,x+22,0,[[0,'#e0a800'],[.5,WAX],[1,'#e0a800']]),5,'#8a5a00');
  c.save();c.clip();c.strokeStyle='rgba(140,90,0,.45)';c.lineWidth=2;for(let yy=y;yy<y+h;yy+=14){c.beginPath();c.moveTo(x-22,yy);c.lineTo(x+22,yy+7);c.stroke();}c.restore();c.restore();}
function s6(t){const k=kk(t,6);const dur=sp(t,7)-T[6];c.fillStyle='#f6e7c8';c.fillRect(0,0,1080,1920);
  cam(punch(t,T[6])*(1+.04*ease(k/5)),0,0,()=>{hollow(540,900,760,1240,t);
    const xs=[340,470,600,730];xs.forEach((x,i)=>{const g=ease(clamp((k-i*.35)/.8,0,1));comb(x,350,820*g,t);});
    const by=700+((t*160)%560);bee(405,by,.55,t,{rot:Math.PI/2});
    if(k>dur*.45){const q=back((k-dur*.45)/.3);c.save();c.translate(405,1240);c.scale(q,q);c.lineWidth=8;c.strokeStyle=RED;c.lineCap='round';c.beginPath();c.moveTo(-44,0);c.lineTo(44,0);c.moveTo(-44,-14);c.lineTo(-44,14);c.moveTo(44,-14);c.lineTo(44,14);c.stroke();c.restore();pill(540,1440,q,'ESPAÇO DE ABELHA',Y,NV,50,-.03);}
    pill(540,400,back((k-.3)/.3),'PENDURADOS NO TETO','#fff',NV,40,.02);});
  header('FAVOS PENDURADOS','NO TETO!',T[6],t,HON);flash(t,T[6]);}
function s7(t){const k=kk(t,7);const dur=sp(t,8)-T[7];c.fillStyle=lin(0,0,0,1920,[[0,'#fff3d0'],[1,'#ffd98a']]);c.fillRect(0,0,1080,1920);
  const dry=ease(clamp((k-dur*.35)/(dur*.6),0,1));
  cam(punch(t,T[7])*(1+.04*ease(k/5)),0,0,()=>{hexGrid(540,860,70,7,6,(x,y)=>{cell(x,y,70,rad(x-20,y-20,4,70,[[0,'#ffe9a8'],[1,'#ffc21f']]),0,.25+.75*dry,1);
      if(dry<1){hexPath(x,y,70*.78);c.fillStyle=`rgba(150,210,255,${.55*(1-dry)})`;c.fill();}});
    if(k>dur*.3){for(const [bx,by] of [[300,560],[780,600],[540,1220]])bee(bx,by,.9,t,{fan:1});
      for(let i=0;i<14;i++){const ph=(t*.8+i/14)%1;c.beginPath();c.arc(200+(i*61)%700+Math.sin(t*3+i)*20,1000-ph*700,10+ph*16,0,7);c.fillStyle=`rgba(255,255,255,${(1-ph)*.6*(1-dry*.5)})`;c.fill();}}
    pill(540,1440,back((k-.3)/.3),dry>.9?'VIROU MEL!':'ÁGUA DEMAIS',dry>.9?GRN:'#4dabf7','#fff',56,-.03);});
  if(k<dur*.4)header('O NÉCTAR É','AGUADO DEMAIS…',T[7],t,'#9cd4ff');else header('ABANA AS ASAS','ATÉ A ÁGUA SUMIR!',T[7]+dur*.4,t,HON);flash(t,T[7]);}
function s8(t){const k=kk(t,8);const dur=sp(t,9)-T[8];c.fillStyle=lin(0,0,0,1920,[[0,'#fff3d0'],[1,'#ffd98a']]);c.fillRect(0,0,1080,1920);
  cam(punch(t,T[8])*(1+.05*ease(k/4)),0,0,()=>{let n=0;hexGrid(540,860,70,7,6,(x,y,i,j)=>{const order=(j*7+i)/42;const cap=clamp((k/(dur*.8)-order)*4,0,1);cell(x,y,70,rad(x-20,y-20,4,70,[[0,'#ffe9a8'],[1,'#ffc21f']]),cap,1,1);});
    bee(300+((k*260)%500),620+Math.sin(t*4)*20,.8,t);
    pill(540,1440,back((k-.5)/.3),'OPÉRCULO','#fff',NV,62,-.03);});
  header('TAMPA DE CERA','EM CADA CASINHA',T[8],t,'#fff');flash(t,T[8]);}
function s9(t){const k=kk(t,9);sky(t);trunk(540,520,t,{hole:42,hy:1000});
  cam(punch(t,T[9])*(1+.08*ease(k/3.8)),0,0,()=>{
    c.save();c.beginPath();c.ellipse(540,1000,42,46,0,0,7);c.clip();bee(552,1010,.45,t,{look:-1});c.restore();
    for(let i=0;i<3;i++){const ph=(t*.5+i/3)%1;bee(200+ph*330,1300-ph*300+Math.sin(t*6+i)*20,.55,t);}
    pill(540,1180,back((k-.4)/.3),'ALVADO',Y,NV,60,-.03);
    if(k>1.5){c.save();c.translate(780,820);const q=back((k-1.5)/.3);c.scale(q,q);c.beginPath();c.moveTo(0,-70);c.lineTo(60,-44);c.lineTo(52,30);c.quadraticCurveTo(30,64,0,80);c.quadraticCurveTo(-30,64,-52,30);c.lineTo(-60,-44);c.closePath();fs(lin(0,-70,0,80,[[0,'#69db7c'],[1,'#2f9e44']]),7,NV);check(0,4,.6);c.restore();}});
  header('A PORTA:','UM BURAQUINHO!',T[9],t,Y);flash(t,T[9]);}
function s10(t){const k=kk(t,10);K.sunburst(540,820,'#ffcf3f','#ffbe1a',t*.2,20);
  cam(punch(t,T[10]),0,0,()=>{hexGrid(540,820,58,7,5,(x,y,i,j)=>cell(x,y,58,rad(x-20,y-20,4,58,[[0,'#ffe9a8'],[1,'#ffc21f']]),(i+j)%3===0?1:0,1,1));
    for(let i=0;i<3;i++)bee(300+i*240,560+Math.sin(t*4+i)*24,.75,t,{flip:i===1});
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2+t*.8;sparkle(540+Math.cos(a)*400,820+Math.sin(a)*240,22,.7+.3*Math.sin(t*6+i));}});
  header('VOCÊ CONSTRUIU','UMA COLMEIA!',T[10],t,'#fff');
  const pu=1+.05*Math.sin(t*8);
  if(k>1.4){c.save();c.translate(290,1330);c.scale(back((k-1.4)/.3)*pu,back((k-1.4)/.3)*pu);text('JÁ SABIA?',0,-80,40,'#fff',10);pill(0,0,1,'ABELHA',GRN,'#fff',64);c.restore();}
  if(k>2.6){c.save();c.translate(790,1330);c.scale(back((k-2.6)/.3)*pu,back((k-2.6)/.3)*pu);text('NÃO SABIA?',0,-80,40,'#fff',10);pill(0,0,1,'MEL',HON,NV,64);c.restore();}
  flash(t,T[10]);}
const S=[s0,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10];
function frame(t){let i=0;while(i<T.length-1&&t>=T[i+1])i++;S[i](t);}
return {frame};};
