// ===== 2 FATOS (BR) — Peixe de cabeça transparente (barreleye) + baleia de cara torta (Scaphokogia) =====
const PBT={metros:3.67, nariz:7.55, nariz2:10.38, olhos:11.68, gira:14.89, baleia:17.48, anos:19.6, torta:22.2, narinas:23.86, sonar:26.71, comida:30.13, fim:31.88, botoes:33.06, end:34.93};
function pbMar(t,deep=1){ let o=`<defs><linearGradient id="pbSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e3a66"/><stop offset=".55" stop-color="#06203f"/><stop offset="1" stop-color="#020a18"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#pbSea)"/>`;
  for(let i=0;i<4;i++) o+=`<path d="M${200+i*220},0 L${80+i*260},1920 L${180+i*260},1920 L${260+i*220},0 Z" fill="#7fe3ff" opacity="${.035+.02*Math.sin(t*.8+i)}"/>`;
  for(let i=0;i<60;i++){ const x=(i*173)%1080+Math.sin(t*.6+i)*14, y=((i*311)+t*(18+i%4*8))%1920, r=1.5+(i%3); o+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#dff6ff" opacity="${.2+(i%4)*.1}"/>`; }
  return o; }
// barreleye de lado, a olhar para a direita. ea = rotação dos olhos (0 = para cima, 70 = para a frente)
function pbPeixe(x,y,s,t,ea=0,{hlN=0,hlE=0}={}){ const sw=Math.sin(t*3)*4, tl=Math.sin(t*5)*10;
  let o=`<g transform="translate(${x} ${y+sw}) scale(${s})" stroke="${FK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">`;
  // cauda
  o+=`<path d="M-360,0 L-470,${-90+tl} Q-440,0 -470,${90+tl} Z" fill="#5a4a40"/><path d="M-370,0 L-450,${-60+tl} M-370,0 L-450,${60+tl}" stroke="#3e322b" stroke-width="5"/>`;
  // barbatana peitoral grande (translúcida)
  o+=`<path d="M40,40 Q-60,${170+tl} -200,${150+tl} Q-120,90 40,40 Z" fill="#a08a7a" opacity=".55"/>`;
  // corpo
  o+=`<path d="M305,25 Q318,-30 255,-58 L-150,-70 Q-300,-60 -370,0 Q-300,60 -150,72 L250,80 Q312,72 305,25 Z" fill="#6b5a4e"/>`;
  o+=`<path d="M250,62 L-150,58 Q-280,50 -350,8 Q-290,70 -150,72 L250,80 Z" fill="#9c8574" stroke="none"/>`;
  for(let i=0;i<7;i++) o+=`<path d="M${-260+i*70},-40 q20,40 0,80" fill="none" stroke="#4e4038" stroke-width="5" opacity=".7"/>`;
  o+=`<path d="M-60,-70 Q-20,-140 40,-66" fill="#5a4a40"/>`;
  // boca pequena
  o+=`<path d="M300,40 L318,46" stroke-width="6"/>`;
  // narinas (parecem olhos)
  o+=`<g><circle cx="270" cy="-6" r="17" fill="#1a1412"/><circle cx="264" cy="-11" r="5" fill="#fff" stroke="none" opacity=".7"/><circle cx="240" cy="6" r="13" fill="#1a1412"/></g>`;
  if(hlN>0){ const p=.5+.5*Math.sin(t*10); o+=`<circle cx="257" cy="0" r="${52+p*6}" fill="none" stroke="#ff3b3b" stroke-width="9" opacity="${hlN}"/>`; }
  // olhos tubulares verdes dentro da cúpula
  for(const [ex,d] of [[150,0],[175,1]]){ o+=`<g transform="rotate(${ea} ${ex} -40)" opacity="${d?.75:1}"><rect x="${ex-24}" y="-140" width="48" height="104" rx="22" fill="#2fa860" stroke="#164f2e" stroke-width="5"/><circle cx="${ex}" cy="-140" r="30" fill="#7dff9e" stroke="#164f2e" stroke-width="5"/><circle cx="${ex-8}" cy="-150" r="9" fill="#fff" stroke="none" opacity=".85"/></g>`; }
  if(hlE>0) o+=`<ellipse cx="165" cy="-110" rx="${150+Math.sin(t*10)*6}" ry="110" fill="#7dff9e" opacity="${.18*hlE}" stroke="none"/>`;
  // cúpula transparente
  o+=`<path d="M40,-62 Q40,-230 175,-235 Q305,-232 300,-40" fill="#bff3ff" fill-opacity=".18" stroke="#dff9ff" stroke-width="6" stroke-opacity=".9"/><path d="M70,-110 Q90,-200 170,-212" fill="none" stroke="#fff" stroke-width="10" opacity=".55"/>`;
  return o+`</g>`; }
function pbPresa(x,y,t){ const b=Math.sin(t*4)*8; return `<g transform="translate(${x} ${y+b})"><circle r="46" fill="#ffd21f" opacity=".25"/><ellipse rx="24" ry="14" fill="#ff8a5c" stroke="${FK}" stroke-width="5"/><path d="M-22,0 l-18,-12 M-22,0 l-18,12 M20,-6 l16,-14 M20,6 l16,14" stroke="${FK}" stroke-width="4"/><circle cx="12" cy="-3" r="4" fill="${FK}"/></g>`; }
// baleia de lado (parente do cachalote-pigmeu), focinho a apontar para baixo
function pbBaleia(x,y,s,t,tilt=0){ const tl=Math.sin(t*2.5)*12;
  let o=`<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<path d="M-420,-10 L-560,${-110+tl} Q-520,-10 -560,${100+tl} Z" fill="#5a7088"/>`;
  o+=`<path d="M330,10 Q340,-120 220,-150 Q40,-180 -150,-110 Q-330,-50 -430,-10 Q-330,60 -150,100 Q60,150 230,130 Q330,110 330,10 Z" fill="#7d93ab"/>`;
  o+=`<path d="M230,130 Q60,150 -150,100 Q-300,60 -400,10 Q-260,110 -100,128 Q90,160 230,130 Z" fill="#c9d6e2" stroke="none"/>`;
  o+=`<path d="M-120,-118 Q-80,-190 -30,-140" fill="#5a7088"/><path d="M60,70 Q20,170 -60,180 Q0,110 40,60" fill="#5a7088"/>`;
  o+=`<path d="M300,70 Q250,96 180,92" fill="none" stroke-width="6"/><circle cx="200" cy="-30" r="14" fill="${FK}"/><circle cx="195" cy="-35" r="5" fill="#fff" stroke="none"/>`;
  o+=`<path d="M250,-60 Q290,-20 300,40" fill="none" stroke="#a9bdd0" stroke-width="10" opacity=".7"/>`;
  return o+`</g>`; }
// crânio visto de cima (focinho para cima): narinas as duas à esquerda da linha do meio
function pbCranio(t,hl=0){ const cx=540, cy=880; let o=`<g stroke="${FK}" stroke-width="9" stroke-linejoin="round">`;
  o+=`<path d="M${cx-40},${cy-420} Q${cx-120},${cy-400} ${cx-150},${cy-200} Q${cx-330},${cy-80} ${cx-320},${cy+120} Q${cx-300},${cy+330} ${cx-60},${cy+360} Q${cx+180},${cy+380} ${cx+260},${cy+200} Q${cx+300},${cy+40} ${cx+150},${cy-120} Q${cx+80},${cy-300} ${cx+20},${cy-420} Q${cx-10},${cy-440} ${cx-40},${cy-420} Z" fill="#efe3c8"/>`;
  o+=`<path d="M${cx-250},${cy+80} Q${cx-120},${cy-60} ${cx+40},${cy-40} Q${cx+200},${cy-20} ${cx+230},${cy+120} Q${cx+60},${cy+300} ${cx-120},${cy+280} Q${cx-260},${cy+240} ${cx-250},${cy+80} Z" fill="#d9c9a6" stroke-width="6"/>`;
  o+=`<path d="M${cx},${cy-460} V${cy+400}" stroke="${FY}" stroke-width="8" stroke-dasharray="26 18"/>`;
  o+=`<ellipse cx="${cx-120}" cy="${cy-10}" rx="70" ry="54" fill="#3a2a1a"/><ellipse cx="${cx-40}" cy="${cy+50}" rx="26" ry="22" fill="#3a2a1a"/>`;
  o+=`</g>`;
  if(hl>0){ const p=.5+.5*Math.sin(t*10); o+=`<ellipse cx="${cx-95}" cy="${cy+15}" rx="${150+p*8}" ry="${115+p*6}" fill="none" stroke="#ff3b3b" stroke-width="10" opacity="${hl}"/>`; }
  return o; }
FP.pb_scene=(t)=>{ let b=pbMar(t), s='', o='';
  if(t<PBT.nariz){ // peixe a nadar + profundidade
    const k=ease(clamp(t/1.2,0,1)); s+=pbPeixe(560-(1-k)*80,940,1.45,t,0);
    if(t>=PBT.metros){ const d=Math.round(600*ease(clamp((t-PBT.metros)/1.8,0,1))); const ky=pop(t,PBT.metros,.25);
      o+=`<g transform="translate(540 1230) scale(${ky})"><rect x="-260" y="-80" width="520" height="160" rx="30" fill="${FK}" stroke="#7fe3ff" stroke-width="8"/><text y="28" font-family="M" font-weight="900" font-size="92" fill="#7fe3ff" text-anchor="middle">${d} M ↓</text></g>`; }
    else o+=fStamp(t,.3,540,560,'CABEÇA TRANSPARENTE','#2e86d0',44,-4);
  } else if(t<PBT.olhos){ // zoom: não são os olhos
    const z=ease(clamp((t-PBT.nariz)/.6,0,1)); s+=pbPeixe(540-z*360,900+z*60,1.25+z*.85,t,0,{hlN:t>PBT.nariz+.8?1:0});
    if(t<PBT.nariz2) o+=fStamp(t,PBT.nariz+.8,540,520,'NÃO SÃO OS OLHOS','#e0483a',62,-4);
    else o+=fStamp(t,PBT.nariz2,540,520,'É O NARIZ!','#e0483a',100,-6);
  } else if(t<PBT.baleia){ // olhos verdes a rodar
    const ea=t<PBT.gira?Math.sin(t*2)*6:70*ease(clamp((t-PBT.gira)/.6,0,1));
    s+=pbPeixe(180,960,2.1,t,ea,{hlE:1});
    if(t>=PBT.gira) o+=`<g transform="translate(880 600) scale(1.6) translate(-880 -600)">${pbPresa(880,600+Math.sin(t)*20,t)}</g>`;
    o+=fTxt(470,560,'OLHOS',72,'#7dff9e');
    if(t>=PBT.gira) o+=fStamp(t,PBT.gira+.3,540,1260,'GIRAM PRA FRENTE','#2fa860',60,-4);
  } else if(t<PBT.torta){ // baleia de 6 milhões de anos
    const k=ease(clamp((t-PBT.baleia)/.8,0,1)); s+=pbBaleia(560+(1-k)*400,920,1.05,t,18);
    if(t>=PBT.anos&&t<PBT.torta) o+=fStamp(t,PBT.anos,540,520,'6 MILHÕES DE ANOS','#2e86d0',62,-4);
    if(t<PBT.anos) o+=fTxt(540,560,'FATO 2',100,FY);
  } else if(t<PBT.sonar){ // crânio de cima
    b=`<rect width="1080" height="1920" fill="#1d1a55"/>`;
    const k=pop(t,PBT.torta,.3); s+=`<g transform="translate(540 900) scale(${.9*k}) rotate(${Math.sin(t*2)*3}) translate(-540 -880)">${pbCranio(t,t>PBT.narinas+.3?1:0)}</g>`;
    o+=fTxt(640,1310,'MEIO',52,FY)+(t<PBT.narinas?fStamp(t,PBT.torta,540,420,'CARA TORTA!','#e0483a',96,-6):fStamp(t,PBT.narinas+.3,540,420,'NARIZ DE UM LADO SÓ','#e0483a',50,-4));
  } else if(t<PBT.fim){ // sonar no fundo
    b+=`<path d="M0,1180 Q270,1150 540,1180 Q810,1210 1080,1170 L1080,1920 L0,1920 Z" fill="#c9a86a"/><path d="M0,1180 Q270,1150 540,1180 Q810,1210 1080,1170" fill="none" stroke="${FK}" stroke-width="8"/>`;
    for(let i=0;i<14;i++) b+=`<circle cx="${(i*97)%1080}" cy="${1230+(i*53)%120}" r="${6+i%4*3}" fill="#a8874c"/>`;
    s+=pbBaleia(560,820,.95,t,28);
    for(let i=0;i<4;i++){ const p=((t-PBT.sonar)*.9+i/4)%1; o+=`<path d="M${780-p*80},${960+p*240} q${120+p*200},${-30} ${200+p*260},${60+p*80}" fill="none" stroke="#7fe3ff" stroke-width="${10*(1-p)+3}" opacity="${1-p}" transform="rotate(${-10} 780 960)"/>`; }
    if(t>=PBT.comida){ const k=pop(t,PBT.comida,.25); o+=`<g transform="translate(860 1240) scale(${1.6*k})"><circle r="70" fill="${FY}" opacity=".35"/>${pbPresa(0,0,t)}</g>`; }
    o+=fStamp(t,PBT.sonar+.3,540,450,'SONAR','#2e86d0',90,-4);
  } else { // peixe ou baleia?
    s+=pbPeixe(300,860,.6,t,0)+pbBaleia(800,880,.42,t,0);
    if(t>=PBT.botoes){ const k=pop(t,PBT.botoes,.25); o+=`<g transform="translate(540 1180) scale(${k})">`;
      [['PEIXE','#2fa860',-230],['BALEIA','#2e86d0',230]].forEach(([n,c,x],i)=>{ const bb=Math.sin(t*6+i*2)*8; o+=`<g transform="translate(${x} ${bb})"><rect x="-200" y="-80" width="400" height="160" rx="40" fill="${c}" stroke="${FK}" stroke-width="10"/><text y="32" font-family="M" font-weight="900" font-size="80" fill="#fff" text-anchor="middle">${n}</text></g>`; });
      o+=`</g>`; }
    o+=fStamp(t,PBT.fim+.1,540,520,'QUAL TE CHOCOU?','#e0483a',56,-4); }
  return {b,s,o}; };
