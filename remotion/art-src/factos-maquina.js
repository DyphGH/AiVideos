// ===== 2 FATOS (BR) — Como funciona a máquina de cortar cabelo (formato câmara lenta + RPM) =====
const MQT={lenta:2.66, laminas:4.44, fixa:5.2, desliza:6.73, tesoura:8.83, quem:11.27, motor:12.79, fora:14.94, garfo:15.7, arrasta:18.45, rpm:20.55, dois:22.39, pente:23.79, so:25.22, fim:27.2, botoes:27.94, end:29.57};
const MQ={red:'#e0483a',redD:'#a82a20',redL:'#ff8a7a',st:'#c9ced8',stD:'#8f97a8',gd:'#e6b84a',gdD:'#a87a1a'};
// fator de câmara lenta por cena (1 = real)
function mqSlow(t){ if(t<MQT.lenta) return 1; if(t<MQT.lenta+.6) return 1+255*ease((t-MQT.lenta)/.6); if(t<MQT.rpm) return 256;
  if(t<MQT.pente){ const u=clamp((t-MQT.rpm)/2.6,0,1); return Math.pow(2,8*(1-u)); } return 1; }
function mqHUD(t){ const sl=mqSlow(t), rpm=Math.round(7200/sl), real=sl<1.05; let o='';
  const lab=real?'VELOCIDADE REAL':(sl>200?'256x MAIS DEVAGAR':`${Math.round(sl)}x MAIS DEVAGAR`), col=real?'#e0483a':'#2e86d0';
  o+=`<g transform="translate(40 380)"><rect width="${lab.length*25+40}" height="64" rx="14" fill="${col}" stroke="${FK}" stroke-width="6"/><text x="20" y="45" font-family="M" font-weight="900" font-size="38" fill="#fff">${lab}</text></g>`;
  // velocímetro
  const a=-120+240*clamp(Math.log2(7200/sl+1)/13,0,1); o+=`<g transform="translate(700 420)"><path d="M-50,20 A55,55 0 1,1 50,20" fill="#fffaf0" stroke="${FK}" stroke-width="6"/>${[-120,-60,0,60,120].map(d=>`<path d="M0,-44 V-34" transform="rotate(${d})" stroke="${FK}" stroke-width="5"/>`).join('')}<path d="M0,0 L0,-40" transform="rotate(${a})" stroke="${MQ.red}" stroke-width="7" stroke-linecap="round"/><circle r="8" fill="${FK}"/></g>`;
  o+=`<g transform="translate(780 380)"><rect width="260" height="64" rx="14" fill="${FK}" stroke="${FY}" stroke-width="5"/><text x="18" y="44" font-family="M" font-weight="900" font-size="30" fill="${FY}">RPM</text><text x="240" y="46" font-family="M" font-weight="900" font-size="40" fill="#fff" text-anchor="end">${rpm}</text></g>`;
  return o; }
function mqCard(t,t0,n,txt,sub=''){ if(t<t0) return ''; const k=pop(t,t0,.25), w=Math.max(txt.length*34,sub.length*20)+140;
  return `<g transform="translate(540 530) scale(${k})"><rect x="${-w/2}" y="-58" width="${w}" height="${sub?124:100}" rx="18" fill="#fffaf0" stroke="${FK}" stroke-width="8"/><rect x="${-w/2+8}" y="-50" width="${w-16}" height="${sub?108:84}" rx="12" fill="none" stroke="${MQ.red}" stroke-width="4" stroke-dasharray="14 8"/>${n?`<g transform="translate(${-w/2} -58)"><circle r="34" fill="${MQ.red}" stroke="${FK}" stroke-width="6"/><text y="14" font-family="M" font-weight="900" font-size="40" fill="#fff" text-anchor="middle">${n}</text></g>`:''}<text y="${sub?6:16}" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle">${txt}</text>${sub?`<text y="50" font-family="M" font-weight="900" font-size="30" fill="${MQ.red}" text-anchor="middle">${sub}</text>`:''}</g>`; }
function mqGrid(){ let o=`<rect width="1080" height="1920" fill="#1b2340"/>`; for(let x=0;x<1080;x+=60) o+=`<path d="M${x},0 V1920" stroke="#26305a" stroke-width="2"/>`; for(let y=0;y<1920;y+=60) o+=`<path d="M0,${y} H1080" stroke="#26305a" stroke-width="2"/>`; return o; }
function mqBarbearia(){ let o=`<rect width="1080" height="1920" fill="#3fa39a"/><rect x="0" y="1200" width="1080" height="720" fill="#e8e2d2"/>`;
  for(let x=0;x<1080;x+=90) o+=`<path d="M${x},1200 V1920" stroke="#cfc7b2" stroke-width="4"/>`;
  o+=`<rect x="140" y="420" width="800" height="760" rx="30" fill="#bfe8e2" stroke="#8a6a3a" stroke-width="22"/>`;
  for(let i=0;i<6;i++) o+=`<circle cx="${190+i*140}" cy="400" r="22" fill="#ffe9a8" stroke="#8a6a3a" stroke-width="6"/><circle cx="${190+i*140}" cy="400" r="40" fill="#ffe9a8" opacity=".3"/>`;
  return o; }
// máquina vista de frente (cabeça em cima). blur = vibração
function mqMaquina(x,y,s,t,rot=0,blur=0){ const v=blur?Math.sin(t*90)*4:0; let o=`<g transform="translate(${x+v} ${y}) rotate(${rot}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round">`;
  o+=`<path d="M-130,-220 L130,-220 L150,330 Q150,400 80,410 L-80,410 Q-150,400 -150,330 Z" fill="${MQ.red}"/><path d="M-110,-200 L-125,330" stroke="${MQ.redL}" stroke-width="20" opacity=".6" stroke-linecap="round"/>`;
  o+=`<rect x="-150" y="40" width="300" height="40" fill="${FY}"/><rect x="-36" y="160" width="72" height="120" rx="18" fill="#2a2a3a"/><rect x="-22" y="176" width="44" height="44" rx="10" fill="#fff"/>`;
  o+=`<rect x="-150" y="-280" width="300" height="70" rx="10" fill="${MQ.st}"/>`;
  for(let i=0;i<12;i++) o+=`<rect x="${-142+i*24.5}" y="-320" width="15" height="48" rx="6" fill="${MQ.st}" stroke-width="4"/>`;
  for(let i=0;i<12;i++) o+=`<rect x="${-142+i*24.5+(blur?Math.sin(t*80)*6:0)}" y="-300" width="15" height="34" rx="5" fill="${MQ.gd}" stroke-width="4"/>`;
  return o+`</g>`; }
// lâminas em grande: off = deslocamento da de cima
function mqLaminas(off,{lblFix=0,lblDes=0}={}){ let o=`<g stroke="${FK}" stroke-width="7" stroke-linejoin="round">`;
  o+=`<rect x="90" y="900" width="900" height="150" rx="16" fill="${MQ.st}"/><rect x="90" y="900" width="900" height="30" fill="#e6e9ef" stroke="none"/>`;
  for(let i=0;i<11;i++) o+=`<path d="M${120+i*80},905 L${120+i*80},740 Q${145+i*80},710 ${170+i*80},740 L${170+i*80},905 Z" fill="${MQ.st}"/>`;
  o+=`<g transform="translate(${off} 0)"><rect x="140" y="930" width="800" height="120" rx="14" fill="${MQ.gd}" opacity=".95"/>`;
  for(let i=0;i<10;i++) o+=`<path d="M${170+i*80},935 L${172+i*80},820 Q${190+i*80},800 ${208+i*80},820 L${210+i*80},935 Z" fill="${MQ.gd}"/>`;
  o+=`<path d="M160,960 H920" stroke="#fff2c4" stroke-width="10" opacity=".7"/></g>`;
  o+=`</g>`;
  if(lblFix) o+=`<g opacity="${lblFix}"><path d="M120,1110 H960" stroke="#9fd4ff" stroke-width="8"/>${fTxt(540,1180,'FIXA',60,'#9fd4ff')}</g>`;
  if(lblDes){ o+=`<g opacity="${lblDes}"><path d="M300,700 H780 M300,700 l30,-24 M300,700 l30,24 M780,700 l-30,-24 M780,700 l-30,24" stroke="${FY}" stroke-width="12" stroke-linecap="round" fill="none"/>${fTxt(540,670,'DESLIZA',60,FY)}</g>`; }
  return o; }
// motor + pino excêntrico (corte)
function mqCorte(t,ang,{lblM=0,lblP=0}={}){ let o=`<g stroke="${FK}" stroke-width="8" stroke-linejoin="round">`;
  o+=`<path d="M340,620 L740,620 L760,1330 Q760,1400 690,1400 L390,1400 Q320,1400 320,1330 Z" fill="#ff8a7a" fill-opacity=".22" stroke="${MQ.red}"/>`;
  // bateria
  o+=`<rect x="420" y="1110" width="240" height="250" rx="30" fill="#5fe08a"/><rect x="500" y="1092" width="80" height="22" rx="6" fill="#3fa868"/><path d="M540,1180 v60 M510,1210 h60" stroke="#1e5e36" stroke-width="12" stroke-linecap="round"/>`;
  // motor
  o+=`<rect x="430" y="860" width="220" height="220" rx="24" fill="#9aa6bb"/>`;
  for(let i=0;i<7;i++) o+=`<path d="M440,${880+i*28} H640" stroke="#c77a2a" stroke-width="12"/>`;
  o+=`<rect x="520" y="800" width="40" height="70" fill="#dfe5ee"/>`;
  // disco + pino fora do centro
  const px=540+40*Math.cos(ang), py=770+14*Math.sin(ang);
  o+=`<ellipse cx="540" cy="780" rx="90" ry="34" fill="#f4f4f8"/><ellipse cx="540" cy="770" rx="90" ry="34" fill="#fff"/><rect x="${px-14}" y="${py-60}" width="28" height="60" rx="10" fill="${MQ.red}"/><ellipse cx="${px}" cy="${py-60}" rx="14" ry="6" fill="${MQ.redL}"/>`;
  o+=`</g>`;
  if(lblM) o+=`<g opacity="${lblM}">${fTxt(860,980,'MOTOR',48,'#fff')}<path d="M790,965 H670" stroke="#fff" stroke-width="6"/>${fTxt(860,1250,'BATERIA',44,'#5fe08a')}<path d="M780,1235 H680" stroke="#5fe08a" stroke-width="6"/></g>`;
  if(lblP){ o+=`<g opacity="${lblP}"><ellipse cx="540" cy="770" rx="40" ry="14" fill="none" stroke="${FY}" stroke-width="5" stroke-dasharray="10 8"/><circle cx="540" cy="770" r="7" fill="${FY}"/>${fTxt(220,760,'PINO',52,FY)}<path d="M290,745 L${px-20},${py-40}" stroke="${FY}" stroke-width="6"/>${fTxt(200,830,'FORA DO',40,FY)}${fTxt(200,875,'CENTRO',40,FY)}</g>`; }
  return o; }
// vista de cima: pino a rodar dentro da ranhura do garfo, garfo leva a lâmina
function mqGarfo(t,ang,{chain=-1,blur=0}={}){ const R=70, px=540+R*Math.cos(ang), py=1080+R*Math.sin(ang), gx=px-540; let o='';
  o+=mqLaminas(gx*1.2).replace('<g stroke=','<g transform="translate(0 -150)" stroke=');
  o+=`<g stroke="${FK}" stroke-width="8" stroke-linejoin="round">`;
  o+=`<circle cx="540" cy="1080" r="140" fill="#dfe5ee"/><circle cx="540" cy="1080" r="${R}" fill="none" stroke="${FY}" stroke-width="5" stroke-dasharray="12 8"/><circle cx="540" cy="1080" r="10" fill="${FK}"/>`;
  // garfo (yoke) só anda para os lados
  o+=`<g transform="translate(${gx} 0)"><path d="M470,640 L610,640 L610,940 L590,940 L590,1180 L490,1180 L490,940 L470,940 Z" fill="#fff" opacity=".96"/><rect x="518" y="960" width="44" height="210" rx="20" fill="#1b2340"/></g>`;
  o+=`<circle cx="${px}" cy="${py}" r="20" fill="${MQ.red}"/>`;
  if(blur) o+=`<circle cx="540" cy="1080" r="${R}" fill="none" stroke="${MQ.red}" stroke-width="40" opacity=".35"/>`;
  o+=`</g>`;
  o+=`<path d="M${400+gx},1230 H${680+gx} M${400+gx},1230 l26,-20 M${400+gx},1230 l26,20 M${680+gx},1230 l-26,-20 M${680+gx},1230 l-26,20" stroke="${FY}" stroke-width="10" stroke-linecap="round"/>`;
  o+=fTxt(860,1090,'PINO',44,MQ.redL)+fTxt(860,880,'GARFO',44,'#fff');
  if(chain>=0){ const C=['BATERIA','MOTOR','PINO','GARFO','LÂMINA']; o+=`<g transform="translate(0 1320)">`; let cx=40; C.forEach((c,i)=>{ const w=c.length*19+24, on=i<=chain; o+=`<rect x="${cx}" y="-30" width="${w}" height="50" rx="10" fill="${on?FY:'#2a3460'}" stroke="${FK}" stroke-width="5"/><text x="${cx+w/2}" y="7" font-family="M" font-weight="900" font-size="25" fill="${on?FK:'#9aa6bb'}" text-anchor="middle">${c}</text>`; cx+=w; if(i<4){ o+=`<text x="${cx+14}" y="9" font-family="M" font-weight="900" font-size="30" fill="#fff" text-anchor="middle">›</text>`; cx+=28; } }); o+=`</g>`; }
  return o; }
function mqPente(x,y,h,n,mm,k){ return `<g transform="translate(${x} ${y}) scale(${k})" stroke="${FK}" stroke-width="6" stroke-linejoin="round"><path d="M-70,0 L70,0 L70,${-h} L-70,${-h} Z" fill="#2a2a3a"/>${[0,1,2,3,4].map(i=>`<path d="M${-56+i*28},${-h} V${-h-60}" stroke="#2a2a3a" stroke-width="14" stroke-linecap="round"/>`).join('')}<circle cy="${-h/2}" r="34" fill="${FY}"/><text y="${-h/2+14}" font-family="M" font-weight="900" font-size="40" fill="${FK}" text-anchor="middle" stroke="none">${n}</text><text y="64" font-family="M" font-weight="900" font-size="38" fill="#fff" text-anchor="middle" stroke="${FK}" stroke-width="10" paint-order="stroke">${mm} MM</text></g>`; }
FP.mq_scene=(t)=>{ let b=mqGrid(), s='', o='';
  const sl=mqSlow(t), ph=t*(120*2*Math.PI)/sl; // fase do motor (120 voltas/s reais)
  if(t<MQT.laminas){ // cabeça + máquina a cortar
    b=mqBarbearia(); const z=t<MQT.lenta?1:1+ease((t-MQT.lenta)/1.2)*.8;
    s+=`<g transform="translate(540 980) scale(${z}) translate(-540 -980)">`;
    s+=`<path d="M230,1500 Q240,1220 540,1200 Q840,1220 850,1500 Z" fill="#2e5fb0"/><path d="M330,1500 L380,1230 M480,1500 L500,1210 M600,1500 L590,1210 M720,1500 L700,1230" stroke="#fff" stroke-width="22"/>`;
    s+=`<ellipse cx="540" cy="900" rx="250" ry="300" fill="#e2b48c"/><path d="M290,880 Q280,600 540,580 Q800,600 790,880 Q760,760 540,750 Q320,760 290,880 Z" fill="#6a3f22"/>`;
    s+=`<path d="M420,1080 Q540,1140 660,1080 L640,1180 Q540,1200 440,1180 Z" fill="#8a5a38" opacity=".55"/>`;
    const my=1020-((t*1.2)%1)*260; s+=mqMaquina(700,my+220,.6,t,-8,t<MQT.lenta?1:0)+`</g>`;
    const n=t<MQT.lenta?24:10; for(let i=0;i<n;i++){ const p=((t*(t<MQT.lenta?2.5:.25)+i/n)%1), x=650+Math.cos(i*2.1)*p*300, y=my+40-p*200+p*p*300; o+=`<path d="M${x},${y} l${8+i%3*6},${4+i%2*8}" stroke="#4a2a14" stroke-width="5" stroke-linecap="round"/>`; }
    o+=mqCard(t,.1,0,'240 CORTES/S','7200 RPM');
    if(t>=MQT.lenta) o+=`<rect width="1080" height="1920" fill="#7fe3ff" opacity="${.25*(1-clamp((t-MQT.lenta)/.4,0,1))}"/>`;
  } else if(t<MQT.tesoura){ // duas lâminas
    const off=Math.sin(ph)*38; s+=mqLaminas(off,{lblFix:t>=MQT.fixa?ease((t-MQT.fixa)/.3):0,lblDes:t>=MQT.desliza?ease((t-MQT.desliza)/.3):0});
    o+=mqCard(t,MQT.laminas,1,'DUAS LÂMINAS','UMA FIXA, OUTRA DESLIZA');
    for(let i=0;i<8;i++) o+=`<path d="M${180+i*95},${1240+Math.sin(i)*20} q20,-60 0,-120" fill="none" stroke="#6a3f22" stroke-width="6"/>`;
  } else if(t<MQT.quem){ // cada vão = tesoura
    const u=t-MQT.tesoura, c=(u%1.2)/1.2, cl=c<.5?ease(c/.5):1-ease((c-.5)/.5), cut=c>.45;
    s+=`<g transform="translate(540 900) scale(2.4) translate(-540 -900)"><g stroke="${FK}" stroke-width="3.5"><path d="M440,1010 L440,820 Q470,790 500,820 L500,1010 Z" fill="${MQ.st}"/><path d="M580,1010 L580,820 Q610,790 640,820 L640,1010 Z" fill="${MQ.st}"/><g transform="translate(${-70*cl} 0)"><path d="M600,1030 L602,870 Q620,850 638,870 L640,1030 Z" fill="${MQ.gd}"/></g></g></g>`;
    s+=`<path d="M540,${cut?720:420} V${cut?820:1200}" stroke="#6a3f22" stroke-width="14" stroke-linecap="round"/>`;
    if(cut){ const f=((c-.45)/.55); s+=`<path d="M540,${420+f*300} V${700+f*300}" stroke="#6a3f22" stroke-width="14" stroke-linecap="round" opacity="${1-f}"/>`; }
    o+=mqCard(t,MQT.tesoura,2,'CADA VÃO = TESOURA');
    o+=`<g transform="translate(880 1250) rotate(-30)" stroke="${FK}" stroke-width="6"><circle cx="-30" cy="60" r="26" fill="none" stroke="${MQ.red}" stroke-width="12"/><circle cx="30" cy="60" r="26" fill="none" stroke="${MQ.red}" stroke-width="12"/><path d="M-20,36 L${10+8*cl},-80 M20,36 L${-10-8*cl},-80" stroke="${MQ.st}" stroke-width="14" stroke-linecap="round"/></g>`;
  } else if(t<MQT.garfo){ // motor + pino excêntrico
    s+=mqCorte(t,ph,{lblM:t>=MQT.motor?ease((t-MQT.motor)/.3):0,lblP:t>=MQT.fora?ease((t-MQT.fora)/.3):0});
    if(t<MQT.motor) o+=fStamp(t,MQT.quem+.1,540,540,'QUEM MEXE?','#e0483a',90,-5);
    else o+=mqCard(t,MQT.motor,3,'UM MOTORZINHO','GIRA UM PINO TORTO');
  } else if(t<MQT.rpm){ // garfo
    const chain=t<MQT.arrasta?Math.min(3,Math.floor((t-MQT.garfo)/.6)):4;
    s+=mqGarfo(t,ph,{chain});
    o+=mqCard(t,MQT.garfo,4,'O PINO EMPURRA O GARFO');
  } else if(t<MQT.pente){ // acelera até à velocidade real
    s+=mqGarfo(t,ph,{blur:sl<8?1:0});
    const k=pop(t,MQT.rpm,.25); o+=`<g transform="translate(540 1310) scale(${k*.8})"><rect x="-330" y="-70" width="660" height="140" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="28" font-family="M" font-weight="900" font-size="74" fill="${FY}" text-anchor="middle">${Math.round(7200/sl)} RPM</text></g>`;
    if(t>=MQT.dois) o+=mqCard(t,MQT.dois,5,'1 VOLTA = 2 CORTES','120 VOLTAS/S × 2 = 240 CORTES/S');
    else o+=mqCard(t,MQT.rpm,5,'7200 VOLTAS/MIN');
  } else { // pentes
    b=mqBarbearia(); s+=`<rect x="60" y="640" width="960" height="720" rx="40" fill="#1b2340" opacity=".85" stroke="${FK}" stroke-width="8"/>`;
    const P=[[1,3,120],[2,6,170],[3,10,230],[4,13,290]];
    P.forEach(([n,mm,h],i)=>{ const x=200+i*230, k=pop(t,MQT.pente+.15*i,.25), on=t>=MQT.botoes; s+=mqPente(x,1230,h*1.25,n,mm,k*1.25*(on?1+.06*Math.sin(t*8+i):1));
      if(t>=MQT.so){ const hl=ease(clamp((t-MQT.so-.15*i)/.4,0,1))*h*.8; s+=`<path d="M${x-40},1280 V${1280-hl} M${x},1280 V${1280-hl-8} M${x+40},1280 V${1280-hl}" stroke="#6a3f22" stroke-width="12" stroke-linecap="round" opacity="0"/>`; } });
    if(t<MQT.so) o+=mqCard(t,MQT.pente,6,'E O PENTE?');
    else if(t<MQT.fim) o+=mqCard(t,MQT.so,6,'SÓ ESCOLHE O TAMANHO');
    else o+=fStamp(t,MQT.fim,540,540,'QUAL VOCÊ USA?','#e0483a',76,-5); }
  o+=mqHUD(t);
  return {b,s,o}; };
