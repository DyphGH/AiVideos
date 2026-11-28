export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;const PI=Math.PI;
// cortes = inícios das frases (align3.py, voz 1.28x)
const T2=1.72,T3=4.37,T4=6.77,T4b=10.93,T4c=11.35,T4d=11.76,T5=12.78,T5b=13.46,T5c=15.12,T6=16.99,T6b=19.09,T6c=20.27,T6d=21.69,T7=22.43,T7r=23.0,T7w=23.47,T7b=24.04,T8=24.65,T9=25.62,T9b=26.17,T9c=27.43,T9d=28.26;
const RED='#e5484d',GRN='#3ccf73',BLUE='#4fa3ff';
// ---------- helpers ----------
function fit(s,x,y,size,maxW,fill='#fff',lw=18){c.font=`900 ${size}px M`;const w=c.measureText(s).width;const k=Math.min(1,maxW/w);text(s,x,y,size*k,fill,lw*Math.max(.7,k));}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=24;c.shadowOffsetY=10;c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);c.restore();text(txt,0,4,size,fg,0);c.restore();}
function header(l1,l2,t0,t,c2=Y,icons=0){if(window.nohead)return;const p=t0<=0?1:back((t-t0)/.35);if(p<=0)return;const pu=1+.025*Math.sin(t*6);c.save();c.translate(540,215);c.scale(p*pu,p*pu);fit(l1,0,-62,78,980,'#fff',18);
  if(icons){c.font='900 118px M';const w=Math.min(1000-230,c.measureText(l2).width);fit(l2,-95,52,118,780,c2,22);miniTree(-95+w/2+70,52,.9,t);miniCal(-95+w/2+175,52,.9,t);}else fit(l2,0,52,118,1000,c2,22);c.restore();}
function miniTree(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.rotate(.08*Math.sin(t*4));c.beginPath();c.moveTo(0,-62);c.lineTo(44,30);c.lineTo(-44,30);c.closePath();fs('#2fae5a',8,NV);c.beginPath();c.rect(-10,30,20,22);fs('#8a4b1e',6,NV);
  star(0,-62,20,t,1);for(let i=0;i<4;i++){c.beginPath();c.arc([-14,12,-20,20][i],[-18,-2,14,16][i],6,0,7);c.fillStyle=['#ff4d5e','#ffd21f','#4fa3ff','#fff'][(i+Math.floor(t*4))%4];c.fill();}c.restore();}
function miniCal(x,y,s,t){c.save();c.translate(x,y+4*Math.sin(t*7));c.scale(s,s);c.rotate(-.08);c.beginPath();c.roundRect(-42,-48,84,92,12);fs('#fff',8,NV);c.beginPath();c.roundRect(-42,-48,84,28,[12,12,0,0]);fs(RED,8,NV);text('29',0,14,40,NV,0);c.restore();}
function dust(t,col='255,255,255',n=40,a=.5){for(let i=0;i<n;i++){const sp=20+(i%7)*9;const x=(i*397+31+Math.sin(t*.6+i)*30)%1080;const y=((i*211+57)-t*sp+4000)%1920;const s=2+(i%4)*1.6;c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(${col},${a*(.4+.6*Math.abs(Math.sin(t*1.3+i)))})`;c.fill();}}
function snow(t,n=70,a=.85){for(let i=0;i<n;i++){const sp=60+(i%5)*25;const x=((i*397+31)+Math.sin(t*1.2+i)*40+1080)%1080;const y=((i*211+57)+t*sp)%1920;const s=3+(i%4)*2;c.beginPath();c.arc(x,y,s,0,7);c.fillStyle=`rgba(255,255,255,${a*(.5+.5*((i%3)/2))})`;c.fill();}}
function vign(a=.5){c.fillStyle=rad(540,900,300,1300,[[0,'rgba(0,0,0,0)'],[1,`rgba(0,0,0,${a})`]]);c.fillRect(0,0,1080,1920);}
function flash(t,t0,a=.7){const k=t-t0;if(k<0||k>.25)return;c.fillStyle=`rgba(255,255,255,${a*(1-k/.25)})`;c.fillRect(0,0,1080,1920);}
function cam(s,x,y,fn,rot=0){c.save();c.translate(540,900);c.rotate(rot);c.scale(s,s);c.translate(-540+x,-900+y);fn();c.restore();}
function punch(t,t0,a=.08){const k=t-t0;return k<0?1:1+a*Math.exp(-k*7);}
function sparkle(x,y,r,a){if(a<=0)return;c.save();c.translate(x,y);c.globalAlpha=clamp(a,0,1);c.beginPath();for(let i=0;i<8;i++){const ang=i*PI/4,rr=i%2?r*.28:r;c.lineTo(Math.cos(ang)*rr,Math.sin(ang)*rr);}c.closePath();c.fillStyle='#fff7c2';c.fill();c.restore();}
function burstText(x,y,s,txt,rot=0,bg='#fff',fg=RED,size=70){if(s<=.01)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.35)';c.shadowBlur=26;c.shadowOffsetY=10;c.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*PI*2,r=i%2?118:170+((i*7)%3)*10;c.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*.8);}c.closePath();fs(bg,8,NV);c.restore();
  fit(txt,0,6,size,330,fg,14);c.restore();}
function star(x,y,r,t,glow=1){c.save();c.translate(x,y);c.rotate(.15*Math.sin(t*2));if(glow>0){c.fillStyle=rad(0,0,r*.3,r*3.2,[[0,`rgba(255,240,150,${.55*glow})`],[1,'rgba(255,240,150,0)']]);c.beginPath();c.arc(0,0,r*3.2,0,7);c.fill();}
  c.beginPath();for(let i=0;i<10;i++){const a=-PI/2+i*PI/5,rr=i%2?r*.45:r;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();fs(glow>0?'#ffd21f':'#b8a76a',Math.max(4,r*.12),NV);c.restore();}
// ---------- árvore 2D com "profundidade" (enfeites num cone que pode rodar) ----------
// o: {rot, sway, kind:'lights'|'old'|'candles'|'bulbs'|'none', lit:0..1, n, apples, nuts, flowers, cand, bulbOn(i)->0..1, colGlow, starOn}
function tree(cx,top,H,t,o={}){const W=H*.42;const sw=(o.sway??1)*.012*Math.sin(t*1.6);c.save();c.translate(cx,top+H);c.rotate(sw);c.translate(-cx,-(top+H));
  const bot=top+H*.88;
  // tronco
  c.beginPath();c.rect(cx-H*.05,bot-10,H*.1,H*.1);fs(lin(cx-H*.05,0,cx+H*.05,0,[[0,'#6b3a17'],[1,'#a2602b']]),7,NV);
  // base
  if(o.box){const bw=H*.34,bh=H*.12,by=top+H*.95;c.save();c.beginPath();c.roundRect(cx-bw/2,by-bh/2,bw,bh,14);fs(lin(0,by-bh/2,0,by+bh/2,[[0,'#c8a46a'],[1,'#8a6a3a']]),7,NV);
    // marcas a rodar
    c.beginPath();c.roundRect(cx-bw/2,by-bh/2,bw,bh,14);c.clip();c.strokeStyle='rgba(13,22,54,.35)';c.lineWidth=6;for(let i=0;i<8;i++){const ph=((i/8+(o.rot||0)/(2*PI))%1+1)%1;const xx=cx-bw/2+ph*bw;c.beginPath();c.moveTo(xx,by-bh/2);c.lineTo(xx,by+bh/2);c.stroke();}c.restore();}
  else{const by=top+H*.97;c.beginPath();c.moveTo(cx-H*.13,by-H*.07);c.lineTo(cx+H*.13,by-H*.07);c.lineTo(cx+H*.1,by+H*.05);c.lineTo(cx-H*.1,by+H*.05);c.closePath();fs(o.pot||RED,7,NV);}
  // copa: 4 andares
  const tiers=[[0,.36,.42],[.18,.58,.66],[.38,.78,.86],[.56,1,1]];
  const col=o.dark?['#1d6b3c','#2a8a4c','#3aa35c']:['#1f8f48','#2fae5a','#49c96f'];
  for(let k=tiers.length-1;k>=0;k--){const [a,b,wf]=tiers[k];const y0=top+a*(bot-top),y1=top+b*(bot-top),hw=W*wf;c.beginPath();c.moveTo(cx,y0);c.quadraticCurveTo(cx+hw*.5,y0+(y1-y0)*.5,cx+hw,y1);
    const nS=4+k;for(let i=0;i<nS;i++){const xa=cx+hw-(i)*(2*hw/nS),xb=cx+hw-(i+1)*(2*hw/nS);c.quadraticCurveTo((xa+xb)/2,y1+22,xb,y1);}c.quadraticCurveTo(cx-hw*.5,y0+(y1-y0)*.5,cx,y0);c.closePath();
    fs(lin(cx-hw,0,cx+hw,0,[[0,col[0]],[.45,col[2]],[1,col[0]]]),8,NV);
    // brilho
    c.save();c.globalAlpha=.25;c.beginPath();c.moveTo(cx-8,y0+30);c.quadraticCurveTo(cx-hw*.35,y0+(y1-y0)*.55,cx-hw*.6,y1-12);c.lineWidth=10;c.strokeStyle='#d8ffd0';c.lineCap='round';c.stroke();c.restore();}
  // enfeites no cone
  const n=o.n||40,rot=o.rot||0;const items=[];
  for(let i=0;i<n;i++){const v=.1+.86*((i*.7548777+.31)%1);const th=((i*.5698403+.13)%1)*2*PI+rot;const cs=Math.cos(th);if(cs<-.05)continue;const hw=W*(.1+.86*v)*.8;const x=cx+hw*Math.sin(th),y=top+v*(bot-top)+cs*10+8;items.push([i,x,y,cs]);}
  items.sort((a,b)=>a[3]-b[3]);
  for(const [i,x,y,cs] of items){const a=clamp(cs*3,0,1);c.save();c.globalAlpha=a;
    if(o.kind==='lights'){const cols=['#ff4d5e','#ffd21f','#4fa3ff','#7cf29c','#ff8ae2'];const cl=cols[i%5];const tw=.55+.45*Math.sin(t*7+i*1.7);const on=(o.lit??1);
      if(on>0){c.fillStyle=rad(x,y,2,40,[[0,cl],[1,'rgba(0,0,0,0)']]);c.globalAlpha=a*.6*tw*on;c.beginPath();c.arc(x,y,40,0,7);c.fill();c.globalAlpha=a;}
      c.beginPath();c.arc(x,y,14,0,7);fs(on>0?cl:'#556',4,NV);c.beginPath();c.arc(x-5,y-5,5,0,7);c.fillStyle=`rgba(255,255,255,${.4+.5*tw*on})`;c.fill();}
    else if(o.kind==='old'){const g=i%3;const tA=g===0?(o.apples??1):g===1?(o.nuts??1):(o.flowers??1);const d=(i*37%11)*.04;
      const p=typeof tA==='number'?tA:1;const tt=tA===true?1:p;if(tt<=0){c.restore();continue;}const q=clamp((tt-d)/(1-.44),0,1);if(q<=0){c.restore();continue;}
      const fall=(1-ease(q))*-260;const s=back(q)*1.45;c.translate(x,y+fall);c.scale(s,s);
      if(g===0){c.beginPath();c.moveTo(0,-14);c.lineTo(0,-24);c.lineWidth=4;c.strokeStyle='#5a2b1a';c.stroke();c.beginPath();c.arc(0,4,19,0,7);fs(rad(-6,-4,2,22,[[0,'#ff7b7b'],[1,'#c8102e']]),5,NV);c.beginPath();c.ellipse(8,-18,8,4,-.5,0,7);fs('#3ccf73',3,NV);}
      else if(g===1){c.beginPath();c.ellipse(0,4,13,16,0,0,7);fs(rad(-4,-2,2,18,[[0,'#d9a066'],[1,'#8a5a2b']]),5,NV);c.beginPath();c.moveTo(0,-10);c.lineTo(0,18);c.lineWidth=3;c.strokeStyle='rgba(13,22,54,.5)';c.stroke();}
      else{const fc=['#fff3f7','#ffd1e0','#fff7c2'][i%3];for(let k=0;k<5;k++){c.save();c.rotate(k*2*PI/5+t*.3);c.beginPath();c.ellipse(0,-12,8,12,0,0,7);fs(fc,3,NV);c.restore();}c.beginPath();c.arc(0,0,7,0,7);fs(Y,3,NV);}}
    else if(o.kind==='candles'){const on=o.cand?o.cand(i):0;c.beginPath();c.roundRect(x-6,y-26,12,32,3);fs('#fff8e6',4,NV);
      if(on>0){const fl=1+.12*Math.sin(t*23+i*3);c.fillStyle=rad(x,y-36,2,46,[[0,'rgba(255,200,80,.55)'],[1,'rgba(255,200,80,0)']]);c.beginPath();c.arc(x,y-36,46*on,0,7);c.fill();flame(x,y-30,on*fl,t+i);}}
    else if(o.kind==='bulbs'){const cols=['#ff3b4f','#ffffff','#3d8bff'];const g=i%3;const on=o.bulbOn?o.bulbOn(i,g):0;const pulse=o.pulse?o.pulse(g):1;const cl=cols[g];
      c.translate(x,y);c.scale(pulse,pulse);if(on>0){c.fillStyle=rad(0,0,2,48,[[0,g===1?'rgba(255,255,220,.9)':cl],[1,'rgba(0,0,0,0)']]);c.globalAlpha=a*.75*on;c.beginPath();c.arc(0,0,48,0,7);c.fill();c.globalAlpha=a;}
      c.beginPath();c.rect(-6,-24,12,10);fs('#b9b9c9',3,NV);c.beginPath();c.moveTo(0,-16);c.bezierCurveTo(14,-14,16,4,0,18);c.bezierCurveTo(-16,4,-14,-14,0,-16);fs(on>0?cl:'#8890a6',4,NV);
      c.beginPath();c.ellipse(-4,-4,3,6,0,0,7);c.fillStyle='rgba(255,255,255,.7)';c.fill();}
    c.restore();}
  if(o.garland){c.save();c.lineWidth=7;c.strokeStyle='#ffd21f';c.lineCap='round';for(let s=0;s<3;s++){c.beginPath();let st=false;for(let k=0;k<=60;k++){const u=k/60;const v=.2+s*.27+u*.22;const th=u*PI*1.2-PI*.6+rot*0;const hw=W*(.1+.86*v)*.85;const x=cx+hw*Math.sin(th),y=top+v*(bot-top)+Math.cos(th)*14;if(!st){c.moveTo(x,y);st=true;}else c.lineTo(x,y);}c.stroke();}c.restore();}
  star(cx,top-4,H*.07,t,o.starOn??1);
  c.restore();}
function flame(x,y,s,t){if(s<=0)return;c.save();c.translate(x,y);c.scale(s,s);const w=1+.08*Math.sin(t*17);c.beginPath();c.moveTo(0,-30*w);c.bezierCurveTo(12,-12,12,4,0,6);c.bezierCurveTo(-12,4,-12,-12,0,-30*w);fs(lin(0,-30,0,6,[[0,'#ffe27a'],[.6,'#ff9a1f'],[1,'#ff5a1f']]),3,NV);
  c.beginPath();c.moveTo(0,-14);c.bezierCurveTo(5,-6,5,2,0,3);c.bezierCurveTo(-5,2,-5,-6,0,-14);c.fillStyle='#fff6c8';c.fill();c.restore();}
// cara (boneco) com expressões
function face(x,y,r,t,o={}){c.save();c.translate(x,y);c.rotate(o.rot||0);
  c.save();c.shadowColor='rgba(0,0,0,.3)';c.shadowBlur=30;c.shadowOffsetY=12;c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.35,-r*.4,r*.1,r*1.1,[[0,'#fff3a8'],[.55,'#ffd23f'],[1,'#f2a20d']]),r*.07,NV);c.restore();
  c.beginPath();c.ellipse(-r*.38,-r*.58,r*.24,r*.11,-.5,0,7);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  const shock=o.shock||0;for(const ex of [-.34,.34]){const ey=-r*.2;const er=r*(.13+shock*.05);c.beginPath();c.ellipse(ex*r,ey,er,er*1.25,0,0,7);fs('#fff',r*.035,NV);c.beginPath();c.arc(ex*r+(o.look||0)*r*.04,ey+r*.02,r*(.07-shock*.02),0,7);c.fillStyle=NV;c.fill();}
  c.lineWidth=r*.055;c.strokeStyle=NV;c.lineCap='round';const bu=shock*r*.12;c.beginPath();c.moveTo(-r*.52,-r*.5-bu);c.quadraticCurveTo(-r*.36,-r*.62-bu,-r*.18,-r*.52-bu);c.moveTo(r*.52,-r*.5-bu);c.quadraticCurveTo(r*.36,-r*.62-bu,r*.18,-r*.52-bu);c.stroke();
  for(const ex of [-.6,.6]){c.beginPath();c.ellipse(ex*r,r*.12,r*.12,r*.07,0,0,7);c.fillStyle='rgba(255,100,120,.45)';c.fill();}
  if(shock>.3){c.beginPath();c.ellipse(0,r*.42,r*.16,r*.22*shock,0,0,7);fs('#7a2335',r*.035,NV);}
  else{c.beginPath();c.arc(0,r*.22,r*.3,.25,PI-.25);c.closePath();fs('#7a2335',r*.035,NV);}
  if(o.sweat){c.beginPath();c.moveTo(r*.78,-r*.5);c.bezierCurveTo(r*.92,-r*.3,r*.9,-r*.15,r*.8,-r*.15);c.bezierCurveTo(r*.68,-r*.15,r*.66,-r*.3,r*.78,-r*.5);fs('#7fd3ff',r*.03,NV);}
  c.restore();}
// calendário
function cal(x,y,s,rot,mon,dd,day,col=RED,extra){if(s<=0)return;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);
  c.save();c.shadowColor='rgba(0,0,0,.4)';c.shadowBlur=30;c.shadowOffsetY=14;c.beginPath();c.roundRect(-150,-170,300,330,34);fs('#fff',9,NV);c.restore();
  c.beginPath();c.roundRect(-150,-170,300,92,[34,34,0,0]);fs(col,9,NV);text(mon,0,-122,56,'#fff',0);
  for(const xx of [-80,80]){c.beginPath();c.roundRect(xx-12,-196,24,54,12);fs('#cfd6e6',6,NV);}
  text(dd,0,10,150,NV,0);text(day,0,112,50,col,0);if(extra)extra();c.restore();}
function crown(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(-50,26);c.lineTo(-56,-24);c.lineTo(-26,0);c.lineTo(0,-36);c.lineTo(26,0);c.lineTo(56,-24);c.lineTo(50,26);c.closePath();fs(lin(0,-36,0,26,[[0,'#ffe98a'],[1,'#f0a800']]),7,NV);
  for(const [xx,cl] of [[-28,RED],[0,BLUE],[28,GRN]]){c.beginPath();c.arc(xx,12,7,0,7);fs(cl,3,NV);}c.restore();}
function bucket(x,y,s,tilt){c.save();c.translate(x,y);c.rotate(tilt);c.scale(s,s);c.beginPath();c.moveTo(-70,-70);c.lineTo(70,-70);c.lineTo(52,80);c.lineTo(-52,80);c.closePath();fs(lin(-70,0,70,0,[[0,'#7d8aa6'],[.5,'#d7deea'],[1,'#7d8aa6']]),8,NV);
  c.beginPath();c.ellipse(0,-70,70,18,0,0,7);fs('#3d8bff',7,NV);c.beginPath();c.arc(0,-70,80,PI*1.05,PI*1.95);c.lineWidth=7;c.strokeStyle=NV;c.stroke();c.restore();}
function skyline(t,a=1){c.save();c.globalAlpha=a;c.fillStyle='#0a1230';const b=[[0,1500,120],[110,1420,90],[190,1460,140],[320,1380,80],[390,1440,130],[510,1400,100],[600,1470,150],[740,1390,90],[820,1450,130],[940,1410,140]];
  for(const [x,y,w] of b){c.fillRect(x,y,w,1920-y);}for(let i=0;i<60;i++){const x=(i*173)%1080,y=1400+(i*97)%420;if(Math.sin(i*7.3)>.2){c.fillStyle=`rgba(255,220,120,${.5+.4*Math.sin(t*2+i)})`;c.fillRect(x,y,10,14);}}c.restore();}
function stars(t,n=50){for(let i=0;i<n;i++){c.beginPath();c.arc((i*277)%1080,(i*151)%1300,2+(i%3),0,7);c.fillStyle=`rgba(255,255,255,${.3+.5*Math.abs(Math.sin(t*2+i))})`;c.fill();}}
// ---------- cenas ----------
function sceneA(t){// 0–T4: quando montar? árvore acesa + calendário DOM 29/11 → 6/1 REIS
  K.sunburst(540,820,'#a3162a','#b81d33',t*.15,22);snow(t,50,.7);
  cam(1.0+.04*ease(t/6.7)*(1+0)+0*punch(t,T3),0,0,()=>{
    // árvore a acender: onda de brilho a subir desde o frame 0
    tree(400,470,860,t,{kind:'lights',n:64,rot:t*.9,lit:1,garland:1});
    // ondas de luz
    for(let i=0;i<10;i++)sparkle(400+Math.sin(i*2.3)*260,560+((i*97+t*160)%700),18+(i%3)*8,.5+.5*Math.sin(t*5+i));
    const j=Math.abs(Math.sin(t*4.2))*30;
    const s1=t<T3?1:1-0.25*ease((t-T3)/.3);
    cal(820,640-j*(t<T3?1:.3),s1*(t<T2?.95:punch(t,T2,.15)*.95),.08+.04*Math.sin(t*3),'NOVEMBRO','29','DOMINGO',RED,()=>{});
    if(t>=T2&&t<T3+.2){pill(820,880,back((t-T2-.2)/.3),'MONTA!',GRN,'#fff',46,-.05);}
    if(t>=T3){const q=back((t-T3)/.35);const j2=Math.abs(Math.sin((t-T3)*4.2))*24;cal(830,1010-j2,q*.82,-.07,'JANEIRO','6','DIA DE REIS','#7b3fe4',()=>crown(110,-200,.9));
      pill(830,1205,back((t-T3-.4)/.3),'DESMONTA',Y,NV,42,.04);}
  });
  header('QUANDO MONTAR A ÁRVORE','EM 2026?',0,t,Y,1);flash(t,T2,.35);flash(t,T3,.5);}
function sceneB(t){// T4–T5: Alemanha, +400 anos, maçãs, nozes e flores de papel
  const k=t-T4;c.fillStyle=lin(0,0,0,1920,[[0,'#1b3a5c'],[1,'#0e2038']]);c.fillRect(0,0,1080,1920);
  // janela/salão de madeira ao fundo
  c.fillStyle='#3a2414';c.fillRect(0,1240,1080,700);c.fillStyle='rgba(255,255,255,.92)';c.beginPath();c.ellipse(540,1260,700,60,0,0,7);c.fill();
  snow(t,70,.85);vign(.45);
  const zoom=1+.05*ease(k/6);
  cam(punch(t,T4)*zoom*(t>=T4b?punch(t,T4b,.05):1),0,0,()=>{
    tree(540,440,820,t,{kind:'old',dark:1,n:66,rot:.4,pot:'#8a5a2b',apples:clamp((t-9.9)/1.1,0,1),nuts:clamp((t-(T4c-.3))/.8,0,1),flowers:clamp((t-(T4d-.2))/.8,0,1),starOn:0});
    // "+400 ANOS" e bandeira
    const q=back((k-.7)/.35);if(q>0){c.save();c.translate(230,560);c.rotate(-.08);c.scale(q,q);c.beginPath();c.roundRect(-110,-70,220,140,14);c.clip();
      for(const [i,cl] of [[0,'#111'],[1,'#dd0000'],[2,'#ffce00']]){c.fillStyle=cl;c.fillRect(-110,-70+i*46.7,220,47);}c.restore();
      c.save();c.translate(230,560);c.rotate(-.08);c.scale(q,q);c.beginPath();c.roundRect(-110,-70,220,140,14);c.lineWidth=8;c.strokeStyle=NV;c.stroke();c.restore();}
    pill(850,560,back((t-7.72)/.3)*(1+.04*Math.sin(t*7)),'+400 ANOS',Y,NV,54,.06);
    if(t>=T4b)burstText(850,1080,back((t-T4b)/.3)*.75,'MAÇÃS!',.1,'#fff',RED,80);
  });
  if(t<T4b)header('LÁ NA ALEMANHA,','HÁ +400 ANOS…',T4,t,'#ffe08a');else header('ENFEITADA COM','MAÇÃS E NOZES!',T4b,t,'#ff8f8f');
  flash(t,T4,.6);}
function sceneC(t){// T5–T6: velas acesas de verdade → uma pega fogo → balde de água
  const k=t-T5;c.fillStyle=lin(0,0,0,1920,[[0,'#2a1438'],[1,'#120818']]);c.fillRect(0,0,1080,1920);
  const glow=clamp((t-T5b)/1.2,0,1);c.fillStyle=rad(540,850,50,800,[[0,`rgba(255,170,60,${.35*glow})`],[1,'rgba(255,170,60,0)']]);c.fillRect(0,0,1080,1920);dust(t,'255,210,150',25,.4);
  // fogo cresce em T5c+.2..T5c+1.1 ; balde em 16.2 ; água 16.45 ; apaga 16.6
  const fg=clamp((t-T5c-.15)/.9,0,1),wet=clamp((t-16.42)/.25,0,1);const big=fg*(1-wet);
  const shake=big>.2&&wet<1?Math.sin(t*60)*5*big:0;
  cam(punch(t,T5)*(t>=T5c?punch(t,T5c,.07):1),shake,0,()=>{
    tree(540,440,820,t,{kind:'candles',n:44,rot:.2,starOn:0,sway:.6,cand:(i)=>clamp((t-T5b-((i*.37)%1)*.8)/.15,0,1)});
    // ramo a pegar fogo (à direita)
    const fx=720,fy=920;if(big>0){c.fillStyle=rad(fx,fy-40,10,260*big,[[0,`rgba(255,120,30,${.5*big})`],[1,'rgba(255,120,30,0)']]);c.beginPath();c.arc(fx,fy-40,260*big,0,7);c.fill();
      for(let i=0;i<3;i++)flame(fx-30+i*30,fy+(i===1?-6:0),big*(2.6+.5*Math.sin(t*13+i))*(i===1?1.2:.85),t+i);}
    // vapor depois da água
    if(wet>0){for(let i=0;i<6;i++){const ph=clamp((t-16.5-i*.04)/.6,0,1);if(ph<=0)continue;c.beginPath();c.arc(fx-40+i*18,fy-40-ph*150,26+ph*30,0,7);c.fillStyle=`rgba(230,235,245,${.6*(1-ph)})`;c.fill();}}
    // balde entra da direita e despeja
    if(t>=16.1){const q=ease((t-16.1)/.3);const tilt=-1.1*ease((t-16.3)/.2);bucket(1180-q*260,720,1,tilt);
      if(t>16.35&&t<16.85){c.save();c.globalAlpha=1-clamp((t-16.65)/.2,0,1);for(let i=0;i<14;i++){const u=((t-16.35)*3+i/14)%1;const xx=880-u*170,yy=670+u*u*250;c.beginPath();c.arc(xx+Math.sin(i)*8,yy,14,0,7);fs('#7fd3ff',4,NV);}c.restore();}}
    // boneco em choque
    if(t>=T5c){const q=back((t-T5c-.25)/.3);c.save();c.translate(185,1110);c.scale(q,q);face(0,0,125,t,{shock:wet>.5?.4:1,sweat:1,rot:-.08+.04*Math.sin(t*20)*(1-wet)});c.restore();}
    if(t>=T5c+.3&&t<16.1)burstText(860,640,back((t-T5c-.3)/.3)*.68,'FOGO!',-.08,'#fff',RED,90);
    if(t>=T5c+.5)pill(640,1285,back((t-T5c-.5)/.3),'NÃO TENTE EM CASA!',Y,NV,38,0);
  });
  if(t<T5b)header('E A LUZ?','VELAS!',T5,t,'#ffd38a');else if(t<T5c)header('ERAM VELAS','ACESAS DE VERDADE',T5b,t,'#ffd38a');else header('E ÀS VEZES','PEGAVA FOGO!',T5c,t,'#ff8f6b');
  flash(t,T5,.6);}
function yearRoll(t){const p=ease(clamp((t-T6-.2)/1.6,0,1));const y=Math.round(1570+(1882-1570)*p);return String(y);}
function sceneDE(t){// T6–T9: 1882, sócio do Edison, árvore com luzes elétricas, 80 lâmpadas, a girar
  c.fillStyle=lin(0,0,0,1920,[[0,'#0d1a4a'],[1,'#060c26']]);c.fillRect(0,0,1080,1920);stars(t);skyline(t,.9);vign(.35);
  const treeIn=ease(clamp((t-T6c)/.45,0,1));
  // rotação: a partir de T8 acelera
  const rk=Math.max(0,t-T8);const rot=rk<=0?0:(rk*rk*2.2<rk*4?rk*rk*2.2:rk*4-1.8);
  cam(punch(t,T6)*(t>=T6d?punch(t,T6d,.06):1)*(t>=T7?punch(t,T7,.06):1)*(t>=T8?punch(t,T8,.06):1),0,0,()=>{
    // ano a rolar
    const yq=t<T6b?1:1-ease((t-T6b)/.3);
    if(yq>0){c.save();c.translate(540,820);c.scale(yq*punch(t,T6+1.8,.15),yq*punch(t,T6+1.8,.15));c.beginPath();c.roundRect(-330,-150,660,300,40);fs('#fff',10,NV);text(yearRoll(t),0,10,220,NV,0);c.restore();
      if(t>=T6+1.7)pill(540,1040,back((t-T6-1.7)/.3)*yq,'NOVA YORK',Y,NV,44,-.03);}
    if(t>=T6b&&t<T7)pill(200,470,back((t-T6b-.1)/.3),'1882 · NOVA YORK',Y,NV,30,-.04);
    // lâmpada do Edison
    if(t>=T6b){const q=back((t-T6b)/.35);const x=t<T6c?540:540-ease((t-T6c)/.4)*400,y=t<T6c?780:1080,s=t<T6c?1.35:1.35-ease((t-T6c)/.4)*.75;
      if(t<T7+.6){const fade=t>T7?1-clamp((t-T7)/.4,0,1):1;c.save();c.globalAlpha=fade;c.translate(x,y);c.scale(q*s,q*s);
        const on=t>=T6d?1:.35+.25*Math.sin(t*12);c.fillStyle=rad(0,-30,10,240,[[0,`rgba(255,230,120,${.6*on})`],[1,'rgba(255,230,120,0)']]);c.beginPath();c.arc(0,-30,240,0,7);c.fill();
        c.beginPath();c.arc(0,-60,110,PI*.75,PI*2.25);c.lineTo(40,60);c.lineTo(-40,60);c.closePath();fs(`rgba(255,248,200,${.55+.4*on})`,9,NV);
        c.beginPath();c.moveTo(-30,40);c.lineTo(-20,-50);c.lineTo(-8,-30);c.lineTo(0,-60);c.lineTo(8,-30);c.lineTo(20,-50);c.lineTo(30,40);c.lineWidth=6;c.strokeStyle=on>.9?'#ff9a1f':'#8a6a3a';c.stroke();
        c.beginPath();c.roundRect(-46,60,92,70,12);fs('#b9b9c9',8,NV);for(let i=0;i<3;i++){c.beginPath();c.moveTo(-46,78+i*18);c.lineTo(46,78+i*18);c.lineWidth=5;c.strokeStyle=NV;c.stroke();}c.restore();
        if(t<T6c)pill(540,1050,back((t-T6b-.3)/.3),'SÓCIO DO EDISON',Y,NV,50,.03);}}
    // árvore elétrica
    if(treeIn>0){c.save();c.translate(0,(1-treeIn)*900);
      const cnt=t<T7?0:Math.min(80,Math.floor(ease(clamp((t-T7)/.55,0,1))*80));
      tree(580,440,850,t,{kind:'bulbs',n:80,rot,box:1,starOn:t>=T6d?1:0,
        bulbOn:(i,g)=>t<T6d?0:(t<T7?(i<12?1:0):(i<cnt?1:0)),
        pulse:(g)=>{const tg=[T7r,T7w,T7b][g];return t>=tg&&t<T8+.4?1+.35*Math.exp(-(t-tg)*5)*(t-tg<.6?1:0)+.08*Math.sin(t*10):1;}});
      c.restore();
      if(t>=T6d&&t<T7+.3){for(let i=0;i<8;i++)sparkle(580+Math.cos(i*.8)*(120+(t-T6d)*300),600+Math.sin(i*.8)*(120+(t-T6d)*300),26,1-(t-T6d)*1.5);}
      // contador 80
      if(t>=T7){const q=back((t-T7)/.25)*punch(t,T7+.55,.2);c.save();c.translate(870,520);c.rotate(.06);c.scale(q,q);c.beginPath();c.arc(0,0,120,0,7);fs(Y,9,NV);text(String(Math.min(80,Math.floor(ease(clamp((t-T7)/.55,0,1))*80))),0,-6,104,NV,0);text('LÂMPADAS',0,64,26,NV,0);c.restore();}
      // cores
      const cols=[[T7r,'VERMELHAS','#ff3b4f','#fff'],[T7w,'BRANCAS','#ffffff',NV],[T7b,'AZUIS','#3d8bff','#fff']];
      if(t<T8)cols.forEach(([tg,txt,bg,fg],k)=>{if(t>=tg)pill(200,1080+k*0-0,0,txt,bg,fg,44,0);});
      if(t>=T7r&&t<T8){const k=t>=T7b?2:t>=T7w?1:0;const [tg,txt,bg,fg]=cols[k];pill(210,1250,back((t-tg)/.25),txt,bg,fg,46,-.05);}
      if(t>=T8){// linhas de movimento + GIRAVA
        c.save();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=8;c.lineCap='round';const sp=clamp(rk*1.5,0,1);for(let i=0;i<4;i++){const yy=640+i*150;const ph=(t*3+i*.3)%1;c.globalAlpha=sp*(1-ph);c.beginPath();c.arc(540,yy,250+i*40,PI*.1+ph,PI*.35+ph);c.stroke();c.beginPath();c.arc(540,yy,250+i*40,PI*1.1+ph,PI*1.35+ph);c.stroke();}c.restore();
        burstText(860,1120,back((t-T8-.2)/.3)*.7,'GIRAVA!',.1,'#fff','#3d8bff',84);}
    }
  });
  if(t<T6b)header('ATÉ QUE, EM','1882…',T6,t,'#9cc4ff');else if(t<T6c)header('UM SÓCIO DO','THOMAS EDISON',T6b,t,Y);else if(t<T7)header('FEZ A 1ª ÁRVORE','COM LUZ ELÉTRICA!',T6c,t,Y);
  else if(t<T8)header('80 LÂMPADAS','EM 3 CORES!',T7,t,'#ff8f9a');else header('E A ÁRVORE','GIRAVA!',T8,t,'#9cc4ff');
  flash(t,T6,.6);flash(t,T6d,.8);}
function sceneF(t){// T9–fim: comenta SIM/NÃO, manda pra quem monta em outubro
  const k=t-T9;K.sunburst(540,820,'#1f6b3f','#25804a',t*.2,22);snow(t,50,.7);
  cam(punch(t,T9),0,0,()=>{
    tree(540,530,660,t,{kind:'lights',n:56,rot:t*1.2,lit:1,garland:1});
    face(860,620,105,t,{shock:0,look:-1,rot:.1*Math.sin(t*3)});
    const pu=1+.06*Math.sin(t*8);
    pill(300,1235,back((t-T9c+.15)/.3)*pu,'SIM',GRN,'#fff',84,-.05);pill(780,1235,back((t-T9c-.05)/.3)*pu,'NÃO',RED,'#fff',84,.05);
    if(t>=T9d){const q=back((t-T9d)/.3);cal(190,700,q*.7,-.12,'OUTUBRO','?!','JÁ?!','#ff8a1f');}
  });
  header('A SUA ÁRVORE','JÁ TÁ MONTADA?',T9,t,Y);
  pill(540,430,back((k-.05)/.3),'COMENTA',RED,'#fff',46,-.03);
  flash(t,T9,.5);}
function frame(t){if(t<T4)return sceneA(t);if(t<T5)return sceneB(t);if(t<T6)return sceneC(t);if(t<T9)return sceneDE(t);sceneF(t);}
return {frame};};
