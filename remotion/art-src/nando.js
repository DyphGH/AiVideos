// Nando — personagem principal (estilo cartoon plano, referência @escolhadagalera)
// nando({x, y, s, face, hold}) -> string SVG. (x,y) = centro dos pés. s = escala (1 ≈ 1100px de altura)
// face: 'normal' | 'choque' | 'contente' | 'preocupado'   hold: null | 'chave' | 'carta'
function nando(opt={}){
  const {x=540,y=1740,s=1,face='normal',hold='chave',pose='normal'}=opt;
  const cx=0, Y=v=>v-1740; // desenhado com pés em y=1740, centrado em x=0
  let o='';
  const SK='#b9774c', SKD='#a8683f', HAIR='#2a1a12', JEANS='#3b6fc2', JEANSD='#2c56a0', CAP='#2f4b8c', CAPD='#23356e';
  o+=`<ellipse cx="0" cy="${Y(1740)}" rx="210" ry="24" fill="#000" stroke="none" opacity=".18"/>`;
  // pernas e sapatilhas
  o+=`<path d="M-110,${Y(1330)} L-12,${Y(1330)} L-22,${Y(1690)} L-104,${Y(1690)} Z" fill="${JEANS}"/>`;
  o+=`<path d="M110,${Y(1330)} L12,${Y(1330)} L22,${Y(1690)} L104,${Y(1690)} Z" fill="${JEANS}"/>`;
  o+=`<path d="M-90,${Y(1480)} l30,-10 M60,${Y(1560)} l30,10" stroke="${JEANSD}" stroke-width="5"/>`;
  for(const d of [-1,1]){
    o+=`<path d="M${d*118},${Y(1690)} H${d*14} V${Y(1716)} Q${d*14},${Y(1740)} ${d*40},${Y(1740)} H${d*130} Q${d*150},${Y(1740)} ${d*146},${Y(1720)} Q${d*140},${Y(1694)} ${d*118},${Y(1690)} Z" fill="#f4f4f4"/><path d="M${d*138},${Y(1726)} H${d*16}" stroke="#e0483a" stroke-width="7"/>`;
  }
  // pano vermelho no bolso
  o+=`<path d="M92,${Y(1320)} L138,${Y(1326)} L132,${Y(1440)} L120,${Y(1426)} L110,${Y(1444)} L100,${Y(1428)} L90,${Y(1440)} Z" fill="#e0483a"/>`;
  // braços
  const arm=(d)=>`<path d="M${d*140},${Y(1030)} Q${d*195},${Y(1120)} ${d*196},${Y(1250)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M${d*140},${Y(1030)} Q${d*195},${Y(1120)} ${d*196},${Y(1250)}" fill="none" stroke="${SK}" stroke-width="44"/>`;
  if(pose==='normal') o+=arm(-1)+arm(1);
  else if(pose==='cabeca'||pose==='aponta') o+=arm(-1);
  const handsNormal = pose==='normal';
  if(handsNormal && hold==='chave') o+=`<g transform="rotate(-20 206 ${Y(1250)})"><rect x="194" y="${Y(1150)}" width="26" height="190" rx="10" fill="#c9d1d6"/><path d="M184,${Y(1150)} q-8,-36 24,-46 q32,10 24,46 l-12,-8 v-16 h-24 v16 Z" fill="#c9d1d6"/></g>`;
  if(hold==='carta') o+=`<g transform="rotate(8 0 ${Y(1180)})"><rect x="-150" y="${Y(1120)}" width="300" height="200" rx="6" fill="#fffaf0"/><path d="M-120,${Y(1160)} h180 M-120,${Y(1190)} h220 M-120,${Y(1220)} h200" stroke="#b9b2a2" stroke-width="6"/><g transform="rotate(-12 60 ${Y(1270)})"><rect x="-10" y="${Y(1240)}" width="150" height="56" rx="6" fill="none" stroke="#e0483a" stroke-width="7"/><text x="65" y="${Y(1280)}" font-family="A" font-size="38" fill="#e0483a" text-anchor="middle" stroke="none">PENHORA</text></g></g>`;
  const hy= hold==='carta'? Y(1230):Y(1262);
  if(handsNormal) o+=`<circle cx="${hold==='carta'?-140:-196}" cy="${hy}" r="30" fill="${SK}"/><circle cx="${hold==='carta'?150:198}" cy="${hold==='carta'?Y(1210):Y(1256)}" r="30" fill="${SK}"/>`;
  else if(pose!=='cruzados') o+=`<circle cx="-196" cy="${Y(1262)}" r="30" fill="${SK}"/>`;
  // tronco
  o+=`<path d="M-150,${Y(1000)} Q-160,${Y(1010)} -150,${Y(1060)} L-130,${Y(1320)} H130 L150,${Y(1060)} Q160,${Y(1010)} 150,${Y(1000)} Q0,${Y(968)} -150,${Y(1000)} Z" fill="#fbfbf7"/>`;
  o+=`<path d="M-150,${Y(1000)} Q-196,${Y(1020)} -204,${Y(1090)} L-148,${Y(1104)} Z" fill="#fbfbf7"/><path d="M150,${Y(1000)} Q196,${Y(1020)} 204,${Y(1090)} L148,${Y(1104)} Z" fill="#fbfbf7"/>`;
  o+=`<circle cx="60" cy="${Y(1180)}" r="30" fill="#d9774f" stroke="none"/><circle cx="-50" cy="${Y(1240)}" r="8" fill="#d9774f" stroke="none"/><circle cx="-70" cy="${Y(1090)}" r="12" fill="#c9b9a0" stroke="none"/>`;
  // re-desenhar a carta por cima do tronco se estiver a segurar
  if(hold==='carta'){o=o.replace(/<g transform="rotate\(8[\s\S]*?<\/g><\/g>/, m=>{window.__carta=m;return '';});}
  o+=`<path d="M-140,${Y(1290)} H140 V${Y(1340)} H-140 Z" fill="${JEANS}"/>`;
  o+=`<path d="M-24,${Y(1286)} Q0,${Y(1270)} 24,${Y(1286)} L30,${Y(1340)} Q0,${Y(1352)} -30,${Y(1340)} Z" fill="${JEANSD}"/>`;
  o+=`<path d="M-14,${Y(1338)} Q-36,${Y(1400)} -56,${Y(1440)} L-24,${Y(1446)} Q-6,${Y(1400)} 4,${Y(1340)} Z" fill="${JEANS}"/><path d="M14,${Y(1338)} Q30,${Y(1396)} 44,${Y(1436)} L74,${Y(1428)} Q50,${Y(1388)} 26,${Y(1338)} Z" fill="${JEANS}"/>`;
  if(hold==='carta') o+=window.__carta+`<circle cx="-140" cy="${Y(1230)}" r="30" fill="${SK}"/><circle cx="150" cy="${Y(1210)}" r="30" fill="${SK}"/>`;
  if(pose==='cruzados'){
    o+=`<path d="M-150,${Y(1010)} Q-200,${Y(1080)} -170,${Y(1150)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M-150,${Y(1010)} Q-200,${Y(1080)} -170,${Y(1150)}" fill="none" stroke="${SK}" stroke-width="44"/>`;
    o+=`<path d="M150,${Y(1010)} Q200,${Y(1080)} 170,${Y(1150)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M150,${Y(1010)} Q200,${Y(1080)} 170,${Y(1150)}" fill="none" stroke="${SK}" stroke-width="44"/>`;
    o+=`<path d="M-170,${Y(1150)} L120,${Y(1120)}" stroke="#2b1d16" stroke-width="58"/><path d="M-170,${Y(1150)} L120,${Y(1120)}" stroke="${SK}" stroke-width="46"/>`;
    o+=`<path d="M170,${Y(1150)} L-120,${Y(1110)}" stroke="#2b1d16" stroke-width="58"/><path d="M170,${Y(1150)} L-120,${Y(1110)}" stroke="${SK}" stroke-width="46"/>`;
    o+=`<circle cx="128" cy="${Y(1118)}" r="28" fill="${SK}"/><circle cx="-128" cy="${Y(1108)}" r="28" fill="${SK}"/>`;
  }
  if(pose==='aponta'){
    o+=`<path d="M140,${Y(1030)} Q250,${Y(1010)} 330,${Y(960)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M140,${Y(1030)} Q250,${Y(1010)} 330,${Y(960)}" fill="none" stroke="${SK}" stroke-width="44"/>`;
    o+=`<circle cx="340" cy="${Y(954)}" r="30" fill="${SK}"/><path d="M360,${Y(946)} l50,-26" stroke="#2b1d16" stroke-width="22"/><path d="M360,${Y(946)} l50,-26" stroke="${SK}" stroke-width="12"/>`;
  }
  // pescoço e cabeça
  o+=`<rect x="-34" y="${Y(930)}" width="68" height="60" fill="${SKD}"/>`;
  o+=`<circle cx="-128" cy="${Y(830)}" r="30" fill="${SK}"/><circle cx="128" cy="${Y(830)}" r="30" fill="${SK}"/>`;
  for(const [a,b,r] of [[-120,760,34],[-136,800,28],[120,760,34],[136,800,28],[-96,724,30],[96,724,30]]) o+=`<circle cx="${a}" cy="${Y(b)}" r="${r}" fill="${HAIR}"/>`;
  o+=`<path d="M-130,${Y(800)} Q-138,${Y(930)} 0,${Y(950)} Q138,${Y(930)} 130,${Y(800)} Q124,${Y(680)} 0,${Y(676)} Q-124,${Y(680)} -130,${Y(800)} Z" fill="${SK}"/>`;
  o+=`<path d="M-100,${Y(880)} Q0,${Y(968)} 100,${Y(880)} Q0,${Y(920)} -100,${Y(880)} Z" fill="#8b5434" stroke="none" opacity=".35"/>`;
  // boné virado
  o+=`<path d="M60,${Y(690)} Q170,${Y(660)} 230,${Y(700)} Q214,${Y(722)} 150,${Y(716)} Q100,${Y(712)} 70,${Y(716)} Z" fill="${CAPD}"/>`;
  o+=`<path d="M-136,${Y(760)} Q-140,${Y(640)} 0,${Y(632)} Q140,${Y(640)} 136,${Y(760)} Q0,${Y(740)} -136,${Y(760)} Z" fill="${CAP}"/>`;
  o+=`<circle cx="0" cy="${Y(634)}" r="10" fill="${CAPD}"/><path d="M-90,${Y(700)} Q-60,${Y(660)} -10,${Y(650)}" fill="none" stroke="#4f6fb6" stroke-width="7"/>`;
  o+=`<path d="M-44,${Y(752)} Q0,${Y(700)} 44,${Y(752)} Z" fill="${HAIR}"/><circle cx="-14" cy="${Y(734)}" r="13" fill="${HAIR}" stroke="none"/><circle cx="14" cy="${Y(730)}" r="13" fill="${HAIR}" stroke="none"/>`;
  o+=`<path d="M-40,${Y(754)} H40" stroke="#1b2a57" stroke-width="10"/>`;
  if(pose==='vitoria'){
    for(const d of [-1,1]){o+=`<path d="M${d*140},${Y(1030)} Q${d*250},${Y(900)} ${d*230},${Y(640)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M${d*140},${Y(1030)} Q${d*250},${Y(900)} ${d*230},${Y(640)}" fill="none" stroke="${SK}" stroke-width="44"/><circle cx="${d*228}" cy="${Y(610)}" r="32" fill="${SK}"/>`;}
  }
  if(pose==='cabeca'){
    o+=`<path d="M140,${Y(1030)} Q240,${Y(960)} 200,${Y(800)}" fill="none" stroke="#2b1d16" stroke-width="56"/><path d="M140,${Y(1030)} Q240,${Y(960)} 200,${Y(800)}" fill="none" stroke="${SK}" stroke-width="44"/>`;
    o+=`<circle cx="176" cy="${Y(770)}" r="32" fill="${SK}"/>`;
  }
  // cara
  const eyes=(rx,ry,pr,dx,dy)=>`<ellipse cx="-50" cy="${Y(815)}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="50" cy="${Y(815)}" rx="${rx}" ry="${ry}" fill="#fff"/><circle cx="${-50+dx}" cy="${Y(815)+dy}" r="${pr}" fill="#2b1d16"/><circle cx="${50+dx}" cy="${Y(815)+dy}" r="${pr}" fill="#2b1d16"/><circle cx="${-46+dx}" cy="${Y(810)+dy}" r="${pr/3}" fill="#fff" stroke="none"/><circle cx="${54+dx}" cy="${Y(810)+dy}" r="${pr/3}" fill="#fff" stroke="none"/>`;
  const nose=`<path d="M-6,${Y(850)} Q-26,${Y(880)} 0,${Y(892)} Q24,${Y(884)} 12,${Y(858)}" fill="${SKD}" stroke-width="5"/>`;
  if(face==='normal'){o+=eyes(36,40,14,6,7)+`<path d="M-96,${Y(768)} Q-56,${Y(752)} -16,${Y(770)}" fill="none" stroke-width="13"/><path d="M16,${Y(770)} Q56,${Y(752)} 96,${Y(768)}" fill="none" stroke-width="13"/>`+nose+`<path d="M-40,${Y(914)} Q4,${Y(938)} 48,${Y(908)}" fill="none" stroke-width="7"/>`;}
  if(face==='choque'){o+=eyes(42,46,8,0,0)+`<path d="M-100,${Y(752)} Q-60,${Y(724)} -20,${Y(750)}" fill="none" stroke-width="13"/><path d="M20,${Y(750)} Q60,${Y(724)} 100,${Y(752)}" fill="none" stroke-width="13"/>`+nose+`<ellipse cx="4" cy="${Y(918)}" rx="26" ry="30" fill="#3b1f1a" stroke-width="7"/><path d="M114,${Y(760)} q10,22 0,34 q-12,-12 0,-34 Z" fill="#8fd3f4" stroke-width="4"/>`;}
  if(face==='contente'){o+=`<path d="M-84,${Y(822)} Q-50,${Y(786)} -16,${Y(822)}" fill="none" stroke-width="11"/><path d="M16,${Y(822)} Q50,${Y(786)} 84,${Y(822)}" fill="none" stroke-width="11"/><path d="M-96,${Y(762)} Q-56,${Y(744)} -16,${Y(760)}" fill="none" stroke-width="13"/><path d="M16,${Y(760)} Q56,${Y(744)} 96,${Y(762)}" fill="none" stroke-width="13"/>`+nose+`<path d="M-54,${Y(900)} Q4,${Y(902)} 60,${Y(898)} Q50,${Y(948)} 4,${Y(950)} Q-44,${Y(948)} -54,${Y(900)} Z" fill="#3b1f1a" stroke-width="7"/><path d="M-46,${Y(902)} H52 V${Y(914)} Q4,${Y(920)} -46,${Y(914)} Z" fill="#fff" stroke="none"/>`;}
  if(face==='preocupado'){o+=eyes(36,40,12,0,10)+`<path d="M-96,${Y(780)} Q-60,${Y(770)} -20,${Y(750)}" fill="none" stroke-width="13"/><path d="M20,${Y(750)} Q60,${Y(770)} 96,${Y(780)}" fill="none" stroke-width="13"/>`+nose+`<path d="M-36,${Y(922)} q12,-10 24,0 q12,10 24,0 q12,-10 24,0" fill="none" stroke-width="7"/><path d="M114,${Y(760)} q10,22 0,34 q-12,-12 0,-34 Z" fill="#8fd3f4" stroke-width="4"/>`;}
  o+=`<ellipse cx="92" cy="${Y(880)}" rx="20" ry="9" fill="#5a3a26" stroke="none" opacity=".6" transform="rotate(-20 92 ${Y(880)})"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="#2b1d16" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${o}</g>`;
}
