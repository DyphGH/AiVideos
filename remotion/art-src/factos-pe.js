// ===== 2 FACTOS — "O teu corpo vai desobedecer-te" =====
// Estilo 2 Factos: fundo azul-escuro com raios, Montserrat 900, amarelo #ffd21f
const FK='#0a1633', FY='#ffd21f';
function fBg(t,c1='#13285a',c2='#07112a',cy=960){
  let o=`<defs><radialGradient id="fbg" cx=".5" cy="${cy/1920}" r=".8"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#fbg)" stroke="none"/>`;
  for(let k=0;k<18;k++){const a=k*0.349+t*.15;o+=`<path d="M540,${cy} L${540+Math.cos(a)*1800},${cy+Math.sin(a)*1800} L${540+Math.cos(a+0.17)*1800},${cy+Math.sin(a+0.17)*1800} Z" fill="#fff" opacity=".035" stroke="none"/>`;}
  return o;
}
function fTxt(x,y,txt,size,col='#fff',anchor='middle',sw=14){return `<text x="${x}" y="${y}" font-family="M" font-weight="900" font-size="${size}" fill="${col}" stroke="${FK}" stroke-width="${sw}" paint-order="stroke fill" stroke-linejoin="round" text-anchor="${anchor}">${txt}</text>`;}
function fPill(txt,t,y=330){const k=pop(t,0,.2);return `<g transform="translate(540 ${y}) scale(${k})"><rect x="-150" y="-40" width="300" height="80" rx="40" fill="${FY}" stroke="${FK}" stroke-width="6"/><text x="0" y="16" font-family="M" font-weight="900" font-size="44" fill="${FK}" text-anchor="middle" stroke="none">${txt}</text></g>`;}
function fStamp(t,t0,x,y,txt,col='#e0483a',size=150,rot=-10){ if(t<t0) return ''; const k=1+1.6*(1-ease((t-t0)/.16)); const w=txt.length*size*.62+80;
  return `<g transform="translate(${x} ${y}) scale(${k}) rotate(${rot})"><rect x="${-w/2}" y="${-size*.75}" width="${w}" height="${size*1.4}" rx="20" fill="#fffaf0" stroke="${col}" stroke-width="16"/><text x="0" y="${size*.36}" font-family="M" font-weight="900" font-size="${size}" fill="${col}" text-anchor="middle" stroke="none">${txt}</text></g>`; }
function hookBand(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="74" fill="${FK}" text-anchor="middle" stroke="none">O TEU CORPO VAI</text><text x="540" y="318" font-family="M" font-weight="900" font-size="74" fill="#e0483a" text-anchor="middle" stroke="none">DESOBEDECER-TE</text></g>`; }

// --- perna + sapatilha (vista de lado). origem = tornozelo. ang = rotação do pé em graus
function perna(x,y,s,ang){
  let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<path d="M-80,-900 L-70,-40 Q-60,20 0,24 Q70,20 76,-40 L86,-900 Z" fill="#3b6fc2"/><path d="M-30,-700 l10,40 M30,-500 l-12,30" stroke="#2c56a0" stroke-width="6"/>`;
  o+=`<rect x="-84" y="-120" width="164" height="90" rx="20" fill="#f4f4f4"/><path d="M-84,-90 H80" stroke="#c9c9c9" stroke-width="6"/>`;
  o+=`<g transform="rotate(${ang})">`;
  o+=`<path d="M-110,-40 Q-120,40 -100,110 L260,120 Q330,118 330,80 Q326,30 250,10 L120,-30 Q60,-60 0,-60 Q-70,-60 -110,-40 Z" fill="#fff"/>`;
  o+=`<path d="M-104,96 L326,96 L330,120 Q320,146 280,146 L-90,140 Q-112,136 -104,96 Z" fill="#7a3f9e"/>`;
  o+=`<path d="M20,-30 Q110,-10 200,30" fill="none" stroke="#7a3f9e" stroke-width="18"/>`;
  for(let k=0;k<4;k++) o+=`<path d="M${30+k*34},${-44+k*10} l26,22" stroke="${FK}" stroke-width="7"/>`;
  o+=`<circle cx="-60" cy="40" r="16" fill="#ffd21f" stroke-width="5"/></g></g>`;
  return o;
}
// --- pé visto de cima (o que vês quando olhas para o teu próprio pé). origem = tornozelo; o pé aponta para cima
function pernaCima(x,y,s,ph){
  const a=Math.sin(ph)*16, sy=1-.13*Math.cos(ph), dx=Math.sin(ph)*18;
  let o=`<g transform="translate(${x+dx} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<g transform="rotate(${a}) scale(1 ${sy})">`;
  // sola (rebordo roxo)
  o+=`<path d="M-125,40 Q-150,-150 -120,-330 Q-90,-520 0,-540 Q95,-520 122,-330 Q150,-150 125,40 Q100,120 0,125 Q-100,120 -125,40 Z" fill="#7a3f9e"/>`;
  // parte de cima branca
  o+=`<path d="M-105,30 Q-128,-150 -100,-320 Q-75,-495 0,-512 Q78,-495 102,-320 Q128,-150 105,30 Q85,100 0,104 Q-85,100 -105,30 Z" fill="#fff"/>`;
  // biqueira
  o+=`<path d="M-85,-380 Q-60,-495 0,-505 Q62,-495 86,-380 Q40,-405 0,-405 Q-40,-405 -85,-380 Z" fill="#ececf2" stroke-width="6"/>`;
  // lingueta + atacadores
  o+=`<path d="M-55,-330 Q0,-350 55,-330 L60,-60 Q0,-40 -60,-60 Z" fill="#f4f0ff" stroke-width="6"/>`;
  for(let k=0;k<6;k++){const yy=-300+k*44; o+=`<path d="M-62,${yy} L62,${yy+26} M62,${yy} L-62,${yy+26}" stroke="${FK}" stroke-width="9"/>`; o+=`<circle cx="-66" cy="${yy+13}" r="7" fill="${FK}"/><circle cx="66" cy="${yy+13}" r="7" fill="${FK}"/>`;}
  // risca roxa lateral
  o+=`<path d="M-110,-120 Q-90,-200 -60,-230 M110,-120 Q90,-200 60,-230" fill="none" stroke="#7a3f9e" stroke-width="16"/>`;
  o+=`</g>`;
  // canela/calça a vir na direção de quem olha (por cima do calcanhar)
  o+=`<ellipse cx="0" cy="40" rx="150" ry="120" fill="#2c56a0"/><ellipse cx="0" cy="56" rx="150" ry="118" fill="#3b6fc2"/><path d="M-120,10 Q0,-30 120,10" fill="none" stroke="#2c56a0" stroke-width="10"/><path d="M-40,120 l10,30 M50,110 l-6,30" stroke="#2c56a0" stroke-width="6"/>`;
  o+=`</g>`;
  return o;
}
// --- mão com o indicador esticado (ponta do dedo = origem)
function maoAponta(x,y,s,rot=-20){
  const SK='#e2b48c';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${FK}" stroke-width="7" stroke-linejoin="round"><path d="M-22,0 Q-24,-20 0,-22 Q24,-20 22,0 L26,150 L-26,150 Z" fill="${SK}"/><path d="M-60,140 Q-70,120 -40,118 L70,118 Q100,120 96,150 L90,260 Q80,320 10,320 Q-70,316 -80,250 Z" fill="${SK}"/><path d="M30,150 q24,-10 40,6 M30,190 q30,-8 46,8 M30,230 q26,-6 40,8" fill="none" stroke-width="6"/><path d="M-8,16 q8,-8 16,0" fill="none" stroke="#c48a64" stroke-width="5"/><rect x="-80" y="300" width="180" height="160" rx="20" fill="#7a3f9e"/></g>`;
}
// ponto ao longo de um "6" (u de 0 a 1). cauda de cima + círculo em baixo
function seis(u){
  const cx=0, cy=150, r=110;
  if(u<.38){const p=u/.38; const x=110-220*Math.sin(p*Math.PI/2), y=-170+320*p; return [x,y]; }
  const p=(u-.38)/.62; const a=Math.PI-p*Math.PI*2; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r];
}
// seta circular (sentido: 1 = horário, -1 = anti-horário)
function setaCirc(x,y,r,t,dir,col){
  const a0=t*3*dir, a1=a0+dir*4.4; const pts=[];
  for(let i=0;i<=30;i++){const a=a0+(a1-a0)*i/30; pts.push(`${x+Math.cos(a)*r},${y+Math.sin(a)*r*.55}`);}
  const ae=a1, hx=x+Math.cos(ae)*r, hy=y+Math.sin(ae)*r*.55, tx=-Math.sin(ae)*dir, ty=Math.cos(ae)*.55*dir;
  const L=Math.hypot(tx,ty), ux=tx/L, uy=ty/L;
  return `<polyline points="${pts.join(' ')}" fill="none" stroke="${FK}" stroke-width="30" stroke-linecap="round"/><polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round"/><path d="M${hx+ux*40},${hy+uy*40} L${hx-uy*34},${hy+ux*34} L${hx+uy*34},${hy-ux*34} Z" fill="${col}" stroke="${FK}" stroke-width="6"/>`;
}

const FP={};
// 1 · O pé + o 6 (0 – 9,7 s)
FP.pe=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1250);
  const rev=t>7.83; const dir=rev?-1:1;
  const draw=t>3.52;
  const sh=draw?ease(clamp((t-3.52)/.6,0,1)):0;          // a perna encolhe e vai para baixo/esquerda
  const lx=540-sh*230, ly=1560+sh*140, ls=1.45-sh*.55;
  const ang=Math.sin(t*5*dir)*18;
  o+=pernaCima(lx,ly,ls,t*5*dir);
  o+=setaCirc(lx,ly-400*ls,210*ls,t,dir,rev?'#e0483a':'#5fe08a');
    if(draw){ // mão a desenhar o 6 no ar (canto superior direito)
    const u=clamp((t-3.7)/2.6,0,1); const ox=780, oy=760;
    let trail=[]; for(let i=0;i<=60;i++){const [a,b]=seis(u*i/60); trail.push(`${ox+a},${oy+b}`);}
    o+=`<polyline points="${trail.join(' ')}" fill="none" stroke="${FY}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><polyline points="${trail.join(' ')}" fill="none" stroke="#fff6c4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
    const [fx,fy]=seis(u); o+=maoAponta(ox+fx,oy+fy,.95,-15);
    if(u>=1) o+=fTxt(ox+200,oy+60,'6',150,FY);
  }
  if(t>3.52&&t<7.83) o+=fTxt(540,560,'DESENHA UM 6',86,FY);
  if(!draw) o+=fTxt(540,620,'RODA O PÉ',110,'#5fe08a');
  o+=fStamp(t,7.83,540,600,'MUDOU!','#e0483a',140,-8);
  if(t>7.83&&t<8.4){const f=1-(t-7.83)/.57; o+=`<rect width="1080" height="1920" fill="#fff" opacity="${.5*f}" stroke="none"/>`;}
  return o+fPill('FACTO 2/2',t);
};
// 2 · O cérebro (9,7 – 15,4 s)
FP.cerebro=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',900);
  const br=(cx,on)=>`<path d="M${cx-170},900 Q${cx-180},700 ${cx-40},680 Q${cx+20},640 ${cx+60},700 Q${cx+180},720 ${cx+170},880 Q${cx+190},1040 ${cx+60},1080 Q${cx},1120 ${cx-60},1090 Q${cx-190},1060 ${cx-170},900 Z" fill="${on?'#ff8fb1':'#c98aa0'}" stroke="${FK}" stroke-width="10"/><path d="M${cx-110},800 q40,-30 80,0 q40,30 80,0 M${cx-120},900 q50,-30 100,0 q40,30 90,0 M${cx-100},1000 q40,-26 80,0" fill="none" stroke="${FK}" stroke-width="7" opacity=".6"/>`;
  const on=Math.floor(t*4)%2===0;
  o+=br(370,on)+br(710,!on);
  o+=`<path d="M540,660 V1120" stroke="${FK}" stroke-width="10"/>`;
  if(on) o+=`<circle cx="370" cy="880" r="230" fill="#ff8fb1" opacity=".18" stroke="none"/>`; else o+=`<circle cx="710" cy="880" r="230" fill="#ff8fb1" opacity=".18" stroke="none"/>`;
  // ícones: mão e pé ligados ao mesmo lado
  const k=pop(t,.6);
  o+=`<g transform="translate(300 1400) scale(${k})">${maoAponta(0,-60,.7,0)}</g>`;
  o+=`<g transform="translate(760 1360) scale(${k})">${pernaCima(0,60,.38,t*5)}</g>`;
  if(t>.6){ o+=`<path d="M380,1120 Q300,1220 300,1300" fill="none" stroke="${FY}" stroke-width="14" stroke-dasharray="26 18"/><path d="M700,1120 Q780,1200 760,1280" fill="none" stroke="${FY}" stroke-width="14" stroke-dasharray="26 18"/>`;}
  if(t>1.8){const k2=pop(t,1.8); o+=`<g transform="translate(540 1220) scale(${k2})"><circle r="70" fill="#e0483a" stroke="${FK}" stroke-width="8"/><text y="28" font-family="M" font-weight="900" font-size="90" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;}
  o+=fTxt(540,560,'O TEU CÉREBRO',96,'#fff')+fTxt(540,660,'JUNTA OS DOIS',70,FY);
  return o+fPill('FACTO 2/2',1);
};
// 3 · "Mas o segundo é ainda pior…" (15,4 – 17,5 s)
FP.pior=(t,dur)=>{
  const z=1+ease(t/dur)*.4;
  let o=`<rect width="1080" height="1920" fill="#05060f" stroke="none"/>`;
  o+=`<g transform="translate(540 960) scale(${z}) translate(-540 -960)">${fTxt(540,900,'MAS O 2.º',140,'#fff')}${fTxt(540,1080,'É PIOR…',170,'#e0483a')}</g>`;
  return o;
};
// mão vista de cima, dedos: polegar, indicador, médio, anelar, mindinho
function maoCima(t,{dobra=0,treme=0,xray=0}={}){
  const SK=xray?'#9fd4ff':'#e2b48c', ST=xray?'#bfe8ff':FK;
  let o=`<g stroke="${ST}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<path d="M290,1720 Q260,1420 310,1230 L800,1230 Q850,1420 810,1720 Z" fill="${SK}" opacity="${xray?.35:1}"/>`;
  const fing=[['ind',370,1250,520,104],['med',500,1235,600,110],['ane',630,1250,550,104],['min',750,1290,400,92]];
  for(const [n,x,yb,len,w] of fing){
    let L=len, dy=0, dx=0;
    if(n==='med') L=len*(1-dobra*.82);
    if(n==='ane'&&treme) {dy=-Math.abs(Math.sin(t*40))*14*treme; dx=Math.sin(t*55)*5*treme;}
    o+=`<g transform="translate(${dx} ${dy})"><rect x="${x-w/2}" y="${yb-L}" width="${w}" height="${L+40}" rx="${w/2}" fill="${SK}" opacity="${xray?.35:1}"/>`;
    if(!xray&&L>200) o+=`<path d="M${x-w/4},${yb-L+60} h${w/2} M${x-w/4},${yb-L*.45} h${w/2}" stroke-width="5" opacity=".5"/>`;
    if(xray){ o+=`<path d="M${x},${yb+300} V${yb-L+40}" stroke="#ffffff" stroke-width="22" opacity=".9"/>`; }
    o+=`</g>`;
    if(n==='med'&&dobra>.3) o+=`<ellipse cx="${x}" cy="${yb-L+20}" rx="${w/2+6}" ry="34" fill="${xray?'none':'#d6a07a'}" stroke="${ST}" stroke-width="8"/>`;
  }
  o+=`<path d="M310,1520 Q170,1440 150,1300 Q146,1230 210,1240 Q270,1260 320,1380" fill="${SK}" opacity="${xray?.35:1}"/>`;
  o+=`<rect x="290" y="1700" width="520" height="230" fill="#7a3f9e"/>`;
  o+=`</g>`;
  if(xray){ // tendão partilhado médio-anelar, a brilhar
    const g=.6+.4*Math.sin(t*8);
    o+=`<path d="M500,1600 Q500,1400 500,1180 M630,1600 Q630,1400 630,1200 M500,1400 Q565,1340 630,1410" fill="none" stroke="${FY}" stroke-width="40" opacity="${.35*g}"/><path d="M500,1600 Q500,1400 500,1180 M630,1600 Q630,1400 630,1200 M500,1400 Q565,1340 630,1410" fill="none" stroke="#fff6c4" stroke-width="14"/>`;
  }
  return o;
}
// 4 · A mão: dobrar o dedo do meio e tentar levantar o anelar (17,5 – 23,1 s)
FP.mao=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#8a5a33" stroke="none"/>`;
  for(let y=0;y<1920;y+=120) o+=`<path d="M0,${y} Q540,${y+30} 1080,${y}" stroke="#7a4d2a" stroke-width="8" fill="none"/>`;
  const dobra=ease(clamp((t-.6)/1.0,0,1));
  const treme=t>3.8?1:0;
  o+=maoCima(t,{dobra,treme});
  if(t>3.8){ o+=`<path d="M630,${560} V${400}" stroke="${FY}" stroke-width="16"/><path d="M600,430 L630,380 L660,430 Z" fill="${FY}" stroke="${FK}" stroke-width="6"/>`; o+=fTxt(860,720,'ANELAR',64,FY); }
  if(t>.6&&t<3.8) o+=fTxt(500,500,'DOBRA O DO MEIO',72,'#fff');
  return o+fPill('FACTO 1/2',t);
};
// 5 · NÃO DÁ! + raio-X do tendão (23,1 – 28,0 s)
FP.naoda=(t,dur)=>{
  const xr=t>1.9; let o;
  if(!xr){ o=`<rect width="1080" height="1920" fill="#8a5a33" stroke="none"/>`+maoCima(t,{dobra:1,treme:1}); o+=fStamp(t,.15,540,640,'NÃO DÁ!','#e0483a',150,-8); }
  else { o=`<rect width="1080" height="1920" fill="#06122a" stroke="none"/>`; for(let y=0;y<1920;y+=40) o+=`<path d="M0,${y} H1080" stroke="#0e2a55" stroke-width="2"/>`;
    o+=maoCima(t,{dobra:1,xray:1}); o+=fTxt(540,620,'O MESMO TENDÃO',92,FY); o+=`<g transform="translate(860 1100)">${fTxt(0,0,'RAIO-X',56,'#9fd4ff')}</g>`; }
  return o+fPill('FACTO 1/2',1);
};
// 6 · SIM ou NÃO + volta ao início (28,0 – fim)
FP.fim=(t,dur)=>{
  if(t>dur-.35) return FP.mao(0.1,5.6)+FP.hook(0.1);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  o+=`<g transform="translate(0 470)">${`<rect width="1080" height="1920" fill="none"/>`}${maoCima(t,{dobra:1,treme:1})}</g>`;
  o+=fTxt(540,600,'CONSEGUISTE?',120,'#fff');
  const b=Math.floor(t*4)%2===0;
  o+=`<g transform="translate(300 860) scale(${b?1.08:1})"><rect x="-190" y="-90" width="380" height="180" rx="40" fill="#2f9e6e" stroke="${FK}" stroke-width="10"/><text y="40" font-family="M" font-weight="900" font-size="110" fill="#fff" text-anchor="middle" stroke="none">SIM</text></g>`;
  o+=`<g transform="translate(780 860) scale(${b?1:1.08})"><rect x="-190" y="-90" width="380" height="180" rx="40" fill="#e0483a" stroke="${FK}" stroke-width="10"/><text y="40" font-family="M" font-weight="900" font-size="110" fill="#fff" text-anchor="middle" stroke="none">NÃO</text></g>`;
  o+=fTxt(540,1080,'COMENTA!',90,FY);
  return o;
};
FP.hook=(t)=>hookBand(t,3.0);
function buildFacto(name,t,dur){ return `<g font-family="M">${FP[name](t,dur)}</g>`; }
