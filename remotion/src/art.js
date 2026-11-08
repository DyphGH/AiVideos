/* eslint-disable */
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
// HUD e legenda comuns (estilo referência)
function hud(dia=30, divida=87400, total=87400){
  const fmt=n=>'R$ '+n.toLocaleString('pt-BR');
  const box=(x,w,label,val,color,pct)=>`<rect x="${x}" y="40" width="${w}" height="140" rx="20" fill="#232a4d" stroke="#3b4472" stroke-width="6"/>
  <text x="${x+24}" y="86" font-size="${pct==null?30:34}" fill="#c9cde6" stroke="none" letter-spacing="1">${label}</text>
  ${pct==null?`<text x="${x+w/2}" y="164" font-size="74" fill="${color}" text-anchor="middle" stroke="none">${val}</text>`:`<text x="${x+w-24}" y="96" font-size="58" fill="${color}" text-anchor="end" stroke="none">${val}</text>
  <rect x="${x+24}" y="118" width="${w-48}" height="34" rx="17" fill="#141831" stroke="#3b4472" stroke-width="4"/><rect x="${x+28}" y="122" width="${Math.max(26,(w-56)*pct)}" height="26" rx="13" fill="#e0483a" stroke="none"/><circle cx="${x+40}" cy="135" r="11" fill="#ff8a7a" stroke="none"/>`}`;
  return `<g font-family="A" stroke="#2b1d16">${box(30,270,'DIAS RESTANTES',String(dia),'#f2c230',null)}${box(320,730,'DÍVIDA',fmt(divida),'#ff5a4a',divida/total)}</g>`;
}
function legenda(parts, y=1250, size=150){
  // parts: [['O ','#fff'],['NANDO','#4cc3f0']]
  return `<g font-family="A" font-size="${size}" text-anchor="middle" stroke="#1b1420" stroke-width="22" paint-order="stroke fill"><text x="540" y="${y}">${parts.map(([t,c])=>`<tspan fill="${c}">${t}</tspan>`).join('')}</text></g>`;
}
// Personagens secundárias — mesmo traço do Nando. Origem = centro dos pés.
const INK='#2b1d16';
function grp(x,y,s,inner,flip){return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${inner}</g>`;}
function eyesFace(face,cy,sp=46,rx=32,ry=36){
  let o=`<ellipse cx="${-sp}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="${sp}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  const pr= face==='choque'?7:12, dy= face==='preocupado'?8:4;
  o+=`<circle cx="${-sp+4}" cy="${cy+dy}" r="${pr}" fill="${INK}"/><circle cx="${sp+4}" cy="${cy+dy}" r="${pr}" fill="${INK}"/><circle cx="${-sp+8}" cy="${cy+dy-5}" r="4" fill="#fff" stroke="none"/><circle cx="${sp+8}" cy="${cy+dy-5}" r="4" fill="#fff" stroke="none"/>`;
  if(face==='feliz') o=`<path d="M${-sp-30},${cy+6} Q${-sp},${cy-30} ${-sp+30},${cy+6}" fill="none" stroke-width="10"/><path d="M${sp-30},${cy+6} Q${sp},${cy-30} ${sp+30},${cy+6}" fill="none" stroke-width="10"/>`;
  return o;
}
function limb(x1,y1,cx,cy,x2,y2,color,w=44){return `<path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" fill="none" stroke="${INK}" stroke-width="${w+12}"/><path d="M${x1},${y1} Q${cx},${cy} ${x2},${y2}" fill="none" stroke="${color}" stroke-width="${w}"/>`;}

// ---------- TIO ZÉ ----------
// age: 'jovem' (35, flashback) | 'velho' (62, praia)
function tioZe({x=540,y=1740,s=1,age='velho',face='feliz',pose='acena',flip=false}={}){
  const SK='#c58a5f', SKD='#b07448';
  let o=`<ellipse cx="0" cy="0" rx="230" ry="24" fill="#000" stroke="none" opacity=".16"/>`;
  const old=age==='velho';
  // pernas
  if(old){ // calções e chinelos
    o+=limb(-60,-420,-62,-250,-64,-40,SK,46)+limb(60,-420,62,-250,64,-40,SK,46);
    o+=`<path d="M-150,-470 H150 L160,-330 H10 L0,-380 L-10,-330 H-160 Z" fill="#f2a33a"/>`;
    o+=`<path d="M-120,-430 l20,20 M90,-420 l20,30 M-40,-400 l14,14" stroke="#e0483a" stroke-width="8"/>`;
    for(const d of [-1,1]) o+=`<ellipse cx="${d*70}" cy="-12" rx="62" ry="18" fill="#2fb36e"/><path d="M${d*70-20},-30 l20,14 l20,-14" fill="none" stroke="#f6c744" stroke-width="8"/>`;
  } else { // macacão de mecânico
    o+=`<path d="M-120,-480 L-12,-480 L-22,-40 L-110,-40 Z" fill="#3b6fc2"/><path d="M120,-480 L12,-480 L22,-40 L110,-40 Z" fill="#3b6fc2"/>`;
    for(const d of [-1,1]) o+=`<path d="M${d*120},-44 H${d*14} V-14 Q${d*14},0 ${d*40},0 H${d*130} Q${d*150},0 ${d*146},-18 Q${d*140},-40 ${d*120},-44 Z" fill="#3a2c22"/>`;
  }
  // braços
  if(pose==='acena'){ o+=limb(-150,-760,-230,-860,-250,-990,SK); o+=`<circle cx="-252" cy="-1004" r="32" fill="${SK}"/>`; }
  else { o+=limb(-150,-760,-200,-640,-190,-520,SK); o+=`<circle cx="-190" cy="-506" r="32" fill="${SK}"/>`; }
  o+=limb(150,-760,210,-660,200,-540,SK);
  // tronco
  if(old){
    o+=`<path d="M-160,-800 Q-190,-640 -150,-470 H150 Q190,-640 160,-800 Q0,-830 -160,-800 Z" fill="${SK}"/>`; // barriga
    o+=`<ellipse cx="0" cy="-560" rx="120" ry="90" fill="${SKD}" stroke="none" opacity=".35"/><path d="M-6,-560 q6,8 12,0" fill="none" stroke-width="5"/>`;
    // camisa havaiana aberta
    o+=`<path d="M-170,-800 Q-200,-640 -170,-480 L-90,-480 Q-110,-640 -60,-800 Z" fill="#2fb3c9"/><path d="M170,-800 Q200,-640 170,-480 L90,-480 Q110,-640 60,-800 Z" fill="#2fb3c9"/>`;
    for(const [a,b] of [[-130,-720],[-150,-600],[-120,-520],[130,-700],[140,-590],[120,-520]]) o+=`<circle cx="${a}" cy="${b}" r="14" fill="#f6c744" stroke-width="4"/><circle cx="${a}" cy="${b}" r="5" fill="#e0483a" stroke="none"/>`;
    o+=`<path d="M-170,-800 Q-220,-780 -226,-700 L-160,-690 Z M170,-800 Q220,-780 226,-700 L160,-690 Z" fill="#2fb3c9"/>`;
  } else {
    o+=`<path d="M-150,-800 Q-160,-640 -130,-470 H130 Q160,-640 150,-800 Q0,-830 -150,-800 Z" fill="#3b6fc2"/>`;
    o+=`<path d="M-150,-800 Q-200,-780 -206,-700 L-146,-690 Z M150,-800 Q200,-780 206,-700 L146,-690 Z" fill="#3b6fc2"/>`;
    o+=`<rect x="-60" y="-700" width="120" height="40" rx="6" fill="#fff"/><text x="0" y="-670" font-family="A" font-size="30" fill="#c8402f" text-anchor="middle" stroke="none">ZÉ</text>`;
    o+=`<path d="M0,-800 V-480" stroke-width="5"/>`;
  }
  // pescoço e cabeça
  o+=`<rect x="-36" y="-850" width="72" height="60" fill="${SKD}"/>`;
  o+=`<circle cx="-126" cy="-960" r="30" fill="${SK}"/><circle cx="126" cy="-960" r="30" fill="${SK}"/>`;
  o+=`<path d="M-128,-960 Q-134,-830 0,-818 Q134,-830 128,-960 Q122,-1090 0,-1094 Q-122,-1090 -128,-960 Z" fill="${SK}"/>`;
  if(old){ o+=`<path d="M-132,-1000 q-20,40 0,80 q18,-40 22,-80 Z M132,-1000 q20,40 0,80 q-18,-40 -22,-80 Z" fill="#dcdcdc"/>`; o+=`<path d="M-70,-1070 q30,-14 60,-4" fill="none" stroke="#e0a77c" stroke-width="7"/>`; }
  else { o+=`<path d="M-128,-990 Q-130,-1110 0,-1112 Q130,-1110 128,-990 Q90,-1050 0,-1050 Q-90,-1050 -128,-990 Z" fill="#2a1a12"/>`; }
  o+=eyesFace(face,-975);
  o+=`<path d="M-50,-1030 Q-80,-1040 -100,-1020 M50,-1030 Q80,-1040 100,-1020" fill="none" stroke-width="12"/>`;
  o+=`<path d="M-6,-950 Q-26,-916 0,-904 Q26,-912 12,-946" fill="${SKD}" stroke-width="5"/>`;
  o+=`<path d="M-90,-886 Q-60,-920 -6,-900 Q0,-904 6,-900 Q60,-920 90,-886 Q60,-870 6,-880 Q0,-876 -6,-880 Q-60,-870 -90,-886 Z" fill="${old?'#9a9a9a':'#2a1a12'}"/>`;
  o+=face==='feliz'?`<path d="M-36,-862 Q0,-834 36,-862" fill="none" stroke-width="7"/>`:`<path d="M-30,-856 H30" stroke-width="7"/>`;
  // coco na mão direita (velho)
  if(old){ o+=`<circle cx="210" cy="-560" r="54" fill="#8a5a2b"/><ellipse cx="210" cy="-600" rx="34" ry="12" fill="#f6efe0" stroke-width="5"/><path d="M220,-604 l30,-80" stroke="#e0483a" stroke-width="10"/><path d="M240,-690 l26,-8" stroke="#e0483a" stroke-width="10"/><circle cx="200" cy="-540" r="32" fill="${SK}"/>`; }
  else { o+=`<circle cx="200" cy="-526" r="32" fill="${SK}"/>`; }
  return grp(x,y,s,o,flip);
}

// ---------- NANDO CRIANÇA (8 anos) ----------
function nandoKid({x=540,y=1740,s=1,face='feliz'}={}){
  const SK='#b9774c';
  let o=`<ellipse cx="0" cy="0" rx="140" ry="18" fill="#000" stroke="none" opacity=".16"/>`;
  o+=limb(-40,-300,-42,-170,-44,-30,SK,36)+limb(40,-300,42,-170,44,-30,SK,36);
  o+=`<path d="M-110,-340 H110 L116,-250 H8 L0,-280 L-8,-250 H-116 Z" fill="#2f6fb3"/>`;
  for(const d of [-1,1]) o+=`<path d="M${d*80},-34 H${d*10} V-12 Q${d*10},0 ${d*30},0 H${d*90} Q${d*104},0 ${d*100},-16 Q${d*96},-34 ${d*80},-34 Z" fill="#e0483a"/>`;
  o+=limb(-100,-560,-140,-470,-130,-380,SK,34)+`<circle cx="-130" cy="-370" r="24" fill="${SK}"/>`;
  // braço direito a segurar chave inglesa gigante
  o+=limb(100,-560,170,-560,200,-640,SK,34);
  o+=`<g transform="rotate(20 210 -660)"><rect x="196" y="-880" width="30" height="300" rx="12" fill="#c9d1d6"/><path d="M182,-880 q-10,-50 30,-62 q40,12 30,62 l-14,-10 v-20 h-32 v20 Z" fill="#c9d1d6"/></g>`;
  o+=`<circle cx="204" cy="-650" r="24" fill="${SK}"/>`;
  o+=`<path d="M-110,-590 Q-120,-460 -100,-330 H100 Q120,-460 110,-590 Q0,-612 -110,-590 Z" fill="#f6c744"/>`;
  o+=`<path d="M-110,-590 Q-150,-570 -150,-510 L-104,-506 Z M110,-590 Q150,-570 150,-510 L104,-506 Z" fill="#f6c744"/>`;
  o+=`<path d="M-30,-500 h60" stroke="#e0a32a" stroke-width="10"/>`;
  o+=`<rect x="-26" y="-630" width="52" height="44" fill="#a8683f"/>`;
  o+=`<circle cx="-112" cy="-740" r="26" fill="${SK}"/><circle cx="112" cy="-740" r="26" fill="${SK}"/>`;
  for(const [a,b,r] of [[-100,-820,30],[-60,-850,32],[-16,-862,32],[30,-860,32],[74,-842,30],[106,-806,26],[-114,-780,22]]) o+=`<circle cx="${a}" cy="${b}" r="${r}" fill="#2a1a12"/>`;
  o+=`<path d="M-114,-750 Q-120,-640 0,-626 Q120,-640 114,-750 Q110,-830 0,-834 Q-110,-830 -114,-750 Z" fill="${SK}"/>`;
  for(const [a,b,r] of [[-70,-820,24],[-30,-834,24],[14,-834,24],[56,-824,22]]) o+=`<circle cx="${a}" cy="${b}" r="${r}" fill="#2a1a12" stroke="none"/>`;
  o+=eyesFace(face,-740,40,28,32);
  o+=`<path d="M-4,-716 Q-18,-694 0,-688 Q16,-692 8,-712" fill="#a8683f" stroke-width="5"/>`;
  o+=`<path d="M-40,-672 Q0,-640 40,-672 Q0,-660 -40,-672 Z" fill="#3b1f1a" stroke-width="6"/>`;
  o+=`<ellipse cx="-74" cy="-690" rx="12" ry="7" fill="#e07a5f" stroke="none" opacity=".5"/><ellipse cx="74" cy="-690" rx="12" ry="7" fill="#e07a5f" stroke="none" opacity=".5"/>`;
  return grp(x,y,s,o,false);
}

// ---------- SEU ARMANDO (70) ----------
function armando({x=540,y=1740,s=1,face='feliz',flip=false}={}){
  const SK='#e2b48c', SKD='#cf9c72';
  let o=`<ellipse cx="0" cy="0" rx="200" ry="22" fill="#000" stroke="none" opacity=".16"/>`;
  o+=`<path d="M-110,-560 L-10,-560 L-20,-40 L-100,-40 Z" fill="#8a7a62"/><path d="M110,-560 L10,-560 L20,-40 L100,-40 Z" fill="#8a7a62"/>`;
  for(const d of [-1,1]) o+=`<path d="M${d*112},-44 H${d*14} V-14 Q${d*14},0 ${d*40},0 H${d*124} Q${d*142},0 ${d*138},-18 Q${d*132},-40 ${d*112},-44 Z" fill="#4a2f22"/>`;
  // bengala
  o+=`<path d="M-230,-10 V-470 q0,-40 40,-40 q30,0 30,30" fill="none" stroke="${INK}" stroke-width="22"/><path d="M-230,-10 V-470 q0,-40 40,-40 q30,0 30,30" fill="none" stroke="#9a5a2b" stroke-width="12"/>`;
  o+=limb(-130,-820,-210,-700,-226,-560,'#c46a4f',42)+`<circle cx="-226" cy="-540" r="28" fill="${SK}"/>`;
  // braço direito com caixa de ovos
  o+=limb(130,-820,200,-760,150,-650,'#c46a4f',42);
  o+=`<rect x="20" y="-700" width="240" height="90" rx="10" fill="#d8c3a0"/>`;
  for(let k=0;k<4;k++) o+=`<ellipse cx="${56+k*56}" cy="-708" rx="24" ry="30" fill="#fbf3e2" stroke-width="5"/>`;
  o+=`<path d="M20,-670 h240" stroke="#b9a07a" stroke-width="5"/><circle cx="140" cy="-640" r="28" fill="${SK}"/>`;
  // cardigã e camisa
  o+=`<path d="M-140,-840 Q-150,-700 -130,-540 H130 Q150,-700 140,-840 Q0,-866 -140,-840 Z" fill="#c46a4f"/>`;
  o+=`<path d="M-40,-850 L0,-720 L40,-850 Z" fill="#f2efe6"/><path d="M0,-720 V-540" stroke-width="5"/>`;
  for(const b of [-680,-620,-560]) o+=`<circle cx="0" cy="${b}" r="7" fill="#f6c744" stroke-width="3"/>`;
  o+=`<rect x="-34" y="-890" width="68" height="56" fill="${SKD}"/>`;
  o+=`<circle cx="-118" cy="-990" r="28" fill="${SK}"/><circle cx="118" cy="-990" r="28" fill="${SK}"/>`;
  o+=`<path d="M-120,-990 Q-124,-870 0,-860 Q124,-870 120,-990 Q116,-1110 0,-1114 Q-116,-1110 -120,-990 Z" fill="${SK}"/>`;
  o+=`<path d="M-124,-1020 q-16,30 2,60 M124,-1020 q16,30 -2,60" fill="none" stroke="#e8e8e8" stroke-width="18"/>`;
  // boina
  o+=`<path d="M-130,-1060 Q-120,-1150 10,-1150 Q150,-1146 140,-1066 Q0,-1090 -130,-1060 Z" fill="#4a5a7a"/><circle cx="10" cy="-1150" r="9" fill="#4a5a7a"/>`;
  // óculos grossos
  o+=eyesFace(face,-1000,44,26,30);
  o+=`<circle cx="-44" cy="-1000" r="40" fill="none" stroke-width="9"/><circle cx="44" cy="-1000" r="40" fill="none" stroke-width="9"/><path d="M-4,-1004 h8" stroke-width="9"/>`;
  o+=`<path d="M-6,-966 Q-24,-934 0,-926 Q22,-932 10,-962" fill="${SKD}" stroke-width="5"/>`;
  o+=`<path d="M-36,-900 Q0,-878 36,-900" fill="none" stroke-width="7"/>`;
  o+=`<path d="M-70,-940 q10,6 20,0 M50,-940 q10,6 20,0" fill="none" stroke="#c48a64" stroke-width="4"/>`;
  return grp(x,y,s,o,flip);
}

// ---------- TURBO (vira-lata caramelo) ----------
function turbo({x=540,y=1740,s=1,mood='rosna',flip=false}={}){
  const C='#d9934a', CD='#b8742f', CL='#f2c48a';
  let o=`<ellipse cx="0" cy="0" rx="230" ry="22" fill="#000" stroke="none" opacity=".16"/>`;
  // cauda
  o+=`<path d="M190,-250 Q280,-330 260,-400" fill="none" stroke="${INK}" stroke-width="40"/><path d="M190,-250 Q280,-330 260,-400" fill="none" stroke="${C}" stroke-width="28"/>`;
  // patas
  for(const px of [-140,-80,110,170]) o+=`<path d="M${px-22},-180 V-10 Q${px-22},0 ${px-10},0 H${px+18} Q${px+30},0 ${px+26},-14 L${px+22},-180 Z" fill="${px<0?C:CD}"/>`;
  // corpo
  o+=`<path d="M-200,-320 Q-210,-170 -120,-150 H180 Q250,-170 240,-300 Q220,-380 100,-380 H-120 Q-190,-380 -200,-320 Z" fill="${C}"/>`;
  o+=`<path d="M-140,-200 Q20,-170 180,-200 Q40,-150 -140,-200 Z" fill="${CL}" stroke="none"/>`;
  if(mood==='rosna') o+=`<path d="M-80,-384 l14,-26 l14,22 l14,-26 l14,24 l14,-24 l14,26" fill="${CD}" stroke-width="5"/>`;
  // cabeça
  o+=`<path d="M-330,-430 Q-340,-330 -260,-300 Q-180,-280 -140,-330 Q-110,-400 -170,-460 Q-250,-500 -330,-430 Z" fill="${C}"/>`;
  o+=`<path d="M-200,-470 Q-170,-560 -130,-520 Q-140,-470 -170,-440 Z" fill="${CD}"/>`; // orelha de pé
  o+=`<path d="M-300,-460 Q-350,-500 -360,-420 Q-340,-400 -310,-420 Z" fill="${CD}"/>`; // orelha caída
  o+=`<path d="M-340,-360 Q-400,-350 -400,-320 Q-396,-290 -340,-296 Z" fill="${CL}"/>`; // focinho
  o+=`<ellipse cx="-396" cy="-330" rx="16" ry="12" fill="${INK}"/>`;
  o+=`<ellipse cx="-262" cy="-410" rx="24" ry="26" fill="#fff"/><circle cx="-270" cy="-404" r="10" fill="${INK}"/>`;
  if(mood==='rosna'){ o+=`<path d="M-300,-440 L-236,-428" stroke-width="10"/>`;
    o+=`<path d="M-386,-306 Q-340,-280 -300,-300" fill="#fff" stroke-width="5"/><path d="M-374,-304 l6,12 l6,-12 M-346,-296 l6,12 l6,-12 M-320,-300 l6,10 l6,-10" fill="none" stroke-width="4"/>`; }
  else { o+=`<path d="M-380,-300 Q-350,-284 -320,-300" fill="none" stroke-width="5"/>`; }
  // coleira
  o+=`<path d="M-190,-330 Q-150,-300 -136,-352" fill="none" stroke="#e0483a" stroke-width="18"/><circle cx="-160" cy="-318" r="10" fill="#f6c744" stroke-width="4"/>`;
  return grp(x,y,s,o,flip);
}

// ---------- RUBINHO, 27 (melhor amigo; óculos escuros, celular sempre na mão) ----------
// face: 'feliz' | 'normal'   pose: 'filma' (celular erguido) | 'normal'
function rubinho({x=540,y=1740,s=1,face='feliz',pose='filma',flip=false}={}){
  const SK='#7a4a2c', SKD='#653b22', HAIR='#151010', SHIRT='#f2c230', SHIRTD='#d9a91e', SH='#2fa36e';
  let o=`<ellipse cx="0" cy="0" rx="200" ry="22" fill="#000" stroke="none" opacity=".16"/>`;
  // bermuda e pernas
  o+=`<path d="M-118,-560 L-8,-560 L-16,-330 L-112,-330 Z" fill="${SH}"/><path d="M118,-560 L8,-560 L16,-330 L112,-330 Z" fill="${SH}"/>`;
  o+=`<path d="M-100,-330 H-30 L-36,-50 H-94 Z" fill="${SK}"/><path d="M100,-330 H30 L36,-50 H94 Z" fill="${SK}"/>`;
  // chinelos-tênis vermelhos
  for(const d of [-1,1]) o+=`<path d="M${d*112},-54 H${d*14} V-20 Q${d*14},0 ${d*40},0 H${d*128} Q${d*148},0 ${d*144},-20 Q${d*138},-50 ${d*112},-54 Z" fill="#e0483a"/><path d="M${d*130},-12 H${d*20}" stroke="#fff" stroke-width="7"/>`;
  // braço esquerdo
  o+=limb(-140,-830,-210,-700,-200,-570,SK,42)+`<circle cx="-200" cy="-552" r="28" fill="${SK}"/>`;
  // camisa estampada
  o+=`<path d="M-150,-850 Q-162,-700 -136,-540 H136 Q162,-700 150,-850 Q0,-880 -150,-850 Z" fill="${SHIRT}"/>`;
  o+=`<path d="M-150,-850 Q-200,-830 -210,-760 L-150,-748 Z M150,-850 Q200,-830 210,-760 L150,-748 Z" fill="${SHIRT}"/>`;
  for(const [a,b] of [[-90,-780],[60,-700],[-40,-620],[100,-800],[-110,-660],[20,-790]]) o+=`<g transform="translate(${a} ${b})"><circle r="14" fill="#e0483a" stroke-width="4"/><path d="M-22,6 q10,-26 22,-8 q12,-18 22,8" fill="${SHIRTD}" stroke="none"/></g>`;
  o+=`<path d="M-44,-860 L0,-790 L44,-860" fill="none" stroke-width="6"/>`;
  // corrente
  o+=`<path d="M-40,-852 Q0,-780 40,-852" fill="none" stroke="#f6e27a" stroke-width="8"/>`;
  // braço direito (celular)
  if(pose==='filma'){ o+=limb(140,-830,260,-900,230,-1080,SK,42);
    o+=`<g transform="rotate(-8 230 -1130)"><rect x="180" y="-1250" width="110" height="200" rx="18" fill="#1d1d24"/><rect x="190" y="-1238" width="90" height="170" rx="10" fill="#49f2ff" stroke-width="4"/><circle cx="235" cy="-1150" r="16" fill="#e0483a" stroke="none"/></g><circle cx="232" cy="-1070" r="30" fill="${SK}"/>`; }
  else o+=limb(140,-830,210,-700,200,-570,SK,42)+`<circle cx="200" cy="-552" r="28" fill="${SK}"/>`;
  // pescoço e cabeça
  o+=`<rect x="-34" y="-900" width="68" height="60" fill="${SKD}"/>`;
  o+=`<circle cx="-124" cy="-1000" r="28" fill="${SK}"/><circle cx="124" cy="-1000" r="28" fill="${SK}"/>`;
  o+=`<path d="M-126,-1000 Q-130,-878 0,-866 Q130,-878 126,-1000 Q120,-1124 0,-1128 Q-120,-1124 -126,-1000 Z" fill="${SK}"/>`;
  // cabelo degradê com risquinho
  o+=`<path d="M-128,-1030 Q-130,-1150 0,-1160 Q130,-1150 128,-1030 Q100,-1090 0,-1094 Q-100,-1090 -128,-1030 Z" fill="${HAIR}"/><path d="M-70,-1120 l40,-14" stroke="${SK}" stroke-width="6"/>`;
  // óculos escuros
  o+=`<path d="M-118,-1030 H118 V-1018 Q110,-960 56,-962 Q14,-964 8,-1012 H-8 Q-14,-964 -56,-962 Q-110,-960 -118,-1018 Z" fill="#141414"/><path d="M-90,-1010 l26,-10 M30,-1010 l26,-10" stroke="#7fd0f0" stroke-width="6"/>`;
  o+=`<path d="M-6,-956 Q-24,-922 0,-914 Q22,-920 10,-952" fill="${SKD}" stroke-width="5"/>`;
  o+= face==='feliz' ? `<path d="M-56,-900 Q0,-898 56,-904 Q44,-852 0,-850 Q-44,-852 -56,-900 Z" fill="#3b1f1a" stroke-width="7"/><path d="M-48,-900 H48 V-890 Q0,-884 -48,-890 Z" fill="#fff" stroke="none"/>` : `<path d="M-36,-892 Q0,-874 36,-892" fill="none" stroke-width="7"/>`;
  return grp(x,y,s,o,flip);
}

// ---------- KLÉBER (gerente da SpeedFix: polo, tablet, sorriso falso) ----------
// face: 'sorriso' | 'raiva'
function kleber({x=540,y=1740,s=1,face='raiva',pose='aponta',flip=false}={}){
  const SK='#efc3a0', SKD='#d9a37c', HAIR='#3a2a1e', POLO='#1f6fd6', POLOD='#16529f';
  let o=`<ellipse cx="0" cy="0" rx="200" ry="22" fill="#000" stroke="none" opacity=".16"/>`;
  o+=`<path d="M-112,-600 L-12,-600 L-20,-40 L-102,-40 Z" fill="#2b2f3a"/><path d="M112,-600 L12,-600 L20,-40 L102,-40 Z" fill="#2b2f3a"/>`;
  for(const d of [-1,1]) o+=`<path d="M${d*114},-44 H${d*14} V-14 Q${d*14},0 ${d*40},0 H${d*130} Q${d*150},0 ${d*144},-20 Q${d*136},-44 ${d*114},-44 Z" fill="#111"/>`;
  o+=`<rect x="-140" y="-640" width="280" height="44" rx="8" fill="#5a3a22"/><rect x="-24" y="-636" width="48" height="36" rx="6" fill="#f6c744" stroke-width="4"/>`;
  // braço com tablet
  o+=limb(-140,-880,-230,-760,-170,-660,POLO,46)+`<g transform="rotate(-12 -150 -640)"><rect x="-250" y="-740" width="170" height="220" rx="16" fill="#1d1d24"/><rect x="-238" y="-728" width="146" height="196" rx="8" fill="#49f2ff" stroke-width="4"/></g><circle cx="-160" cy="-650" r="28" fill="${SK}"/>`;
  // polo
  o+=`<path d="M-160,-900 Q-172,-760 -142,-600 H142 Q172,-760 160,-900 Q0,-932 -160,-900 Z" fill="${POLO}"/>`;
  o+=`<path d="M-160,-900 Q-214,-880 -222,-800 L-160,-790 Z M160,-900 Q214,-880 222,-800 L160,-790 Z" fill="${POLO}"/>`;
  o+=`<path d="M-50,-912 L0,-860 L50,-912 L30,-930 L0,-900 L-30,-930 Z" fill="#fff"/><path d="M0,-860 V-780" stroke-width="5"/><circle cx="0" cy="-830" r="6" fill="#fff" stroke-width="3"/>`;
  o+=`<path d="M70,-830 l-18,32 h16 l-10,28 l30,-40 h-16 l12,-20 Z" fill="#ffe14a" stroke-width="3"/>${flip?'':'<text x="96" y="-760" font-size="22" fill="#fff" stroke="none">SPEEDFIX</text>'}`;
  // braço direito
  if(pose==='aponta'){ o+=limb(140,-880,260,-880,330,-960,POLO,46)+`<circle cx="340" cy="-968" r="28" fill="${SK}"/><path d="M356,-980 l44,-30" stroke="${INK}" stroke-width="22"/><path d="M356,-980 l44,-30" stroke="${SK}" stroke-width="12"/>`; }
  else o+=limb(140,-880,220,-760,200,-640,POLO,46)+`<circle cx="200" cy="-620" r="28" fill="${SK}"/>`;
  // cabeça
  o+=`<rect x="-36" y="-950" width="72" height="60" fill="${SKD}"/>`;
  o+=`<circle cx="-124" cy="-1050" r="28" fill="${SK}"/><circle cx="124" cy="-1050" r="28" fill="${SK}"/>`;
  o+=`<path d="M-126,-1050 Q-130,-930 0,-918 Q130,-930 126,-1050 Q120,-1176 0,-1180 Q-120,-1176 -126,-1050 Z" fill="${SK}"/>`;
  // cabelo com gel (topete)
  o+=`<path d="M-130,-1070 Q-140,-1220 10,-1230 Q170,-1226 130,-1070 Q110,-1150 30,-1150 Q-70,-1150 -130,-1070 Z" fill="${HAIR}"/><path d="M-60,-1200 q60,-40 140,-6" fill="none" stroke="#5a4636" stroke-width="8"/>`;
  if(face==='raiva'){
    o+=eyesFace('normal',-1056,44,24,22);
    o+=`<path d="M-86,-1100 L-14,-1078 M86,-1100 L14,-1078" stroke-width="13"/>`;
    o+=`<path d="M-58,-968 Q0,-980 58,-968 Q48,-900 0,-898 Q-48,-900 -58,-968 Z" fill="#3b1f1a" stroke-width="7"/><path d="M-48,-966 H48 V-952 Q0,-946 -48,-952 Z" fill="#fff" stroke="none"/><path d="M-30,-916 Q0,-930 30,-916" fill="#e0483a" stroke="none"/>`;
    o+=`<path d="M134,-1110 q14,24 0,36 q-14,-12 0,-36 Z" fill="#e0483a" stroke="none" opacity=".0"/>`;
  } else {
    o+=eyesFace('feliz',-1056,44,24,22);
    o+=`<path d="M-64,-976 Q0,-960 64,-976 Q52,-926 0,-924 Q-52,-926 -64,-976 Z" fill="#fff" stroke-width="7"/><path d="M-60,-966 H60 M-30,-976 V-930 M0,-976 V-926 M30,-976 V-930" stroke="#c9c9c9" stroke-width="3"/>`;
  }
  o+=`<path d="M-6,-1014 Q-24,-984 0,-976 Q22,-982 10,-1010" fill="${SKD}" stroke-width="5"/>`;
  return grp(x,y,s,o,flip);
}
// Cenários reutilizáveis (estilo referência: parede creme, azulejo, chão)
function interior({wall='#f3e6c4', tile='#2f9e6e', tileLine='#5ec393', floor='#b4523b', floorLine='#9a4331', tileTop=1110, floorTop=1470}={}){
  let o=`<rect x="0" y="0" width="1080" height="${tileTop}" fill="${wall}" stroke="none"/>`;
  o+=`<rect x="0" y="${tileTop}" width="1080" height="${floorTop-tileTop}" fill="${tile}" stroke="none"/>`;
  for(let x=0;x<=1080;x+=72) o+=`<path d="M${x},${tileTop} V${floorTop}" stroke="${tileLine}" stroke-width="4"/>`;
  for(let y=tileTop;y<=floorTop;y+=72) o+=`<path d="M0,${y} H1080" stroke="${tileLine}" stroke-width="4"/>`;
  o+=`<path d="M0,${tileTop} H1080" stroke-width="7"/>`;
  o+=`<rect x="0" y="${floorTop}" width="1080" height="${1920-floorTop}" fill="${floor}" stroke="none"/>`;
  for(let y=floorTop+70;y<1920;y+=70) o+=`<path d="M0,${y} H1080" stroke="${floorLine}" stroke-width="5"/>`;
  for(let y=floorTop,i=0;y<1920;y+=70,i++) for(const x of (i%2?[180,560,900]:[340,720])) o+=`<path d="M${x},${y} v70" stroke="${floorLine}" stroke-width="4"/>`;
  o+=`<path d="M0,${floorTop} H1080" stroke-width="7"/>`;
  return o;
}
function sepiaDefs(){return `<filter id="sepia"><feColorMatrix type="matrix" values="0.39 0.77 0.19 0 0  0.35 0.69 0.17 0 0  0.27 0.53 0.13 0 0  0 0 0 1 0"/></filter>
<radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2b1a0e" stop-opacity=".65"/></radialGradient>`;}
// Corsa C (lateral), origem = centro, rodas em y=0
function corsa({x=540,y=1200,s=1,dusty=true,tag=true}={}){
  let o='';
  const B=`M-330,-20 Q-342,-74 -326,-104 L-306,-134 Q-292,-154 -242,-164 L-162,-176 Q-122,-214 -72,-252 Q-30,-282 38,-288 L178,-288 Q230,-286 254,-252 Q278,-214 290,-164 L298,-114 Q308,-64 294,-20 Z`;
  o+=`<path d="${B}" fill="#4fb3a0"/>`;
  o+=`<path d="M-142,-174 Q-102,-214 -58,-246 Q-26,-268 26,-272 L48,-272 L48,-174 Z" fill="#bfe3ea"/><path d="M66,-272 L168,-272 Q210,-268 228,-238 L244,-194 L248,-174 L66,-174 Z" fill="#bfe3ea"/>`;
  o+=`<path d="M58,-268 V-26" stroke-width="6"/><rect x="70" y="-150" width="42" height="12" rx="6" fill="#c9d1d6" stroke-width="4"/>`;
  o+=`<path d="M-326,-96 H292" stroke="${INK}" stroke-width="16"/><path d="M-326,-96 H292" stroke="#6b7479" stroke-width="7"/>`;
  o+=`<path d="M-324,-128 Q-302,-154 -250,-158 L-246,-130 Q-292,-124 -324,-114 Z" fill="#fff6d8"/><path d="M288,-184 Q302,-154 300,-114 L276,-118 L270,-178 Z" fill="#e0483a"/>`;
  for(const wx of [-200,180]){ o+=`<path d="M${wx-80},-20 Q${wx-76},-104 ${wx},-108 Q${wx+76},-104 ${wx+80},-20 Z" fill="#1d1612"/><circle cx="${wx}" cy="-6" r="66" fill="#2a2522"/><circle cx="${wx}" cy="-6" r="38" fill="#d6dde1" stroke-width="6"/><circle cx="${wx}" cy="-6" r="10" fill="#6b7479" stroke-width="4"/>`; }
  if(dusty){ o+=`<path d="M-60,-286 Q60,-300 190,-286 L188,-274 Q60,-286 -56,-272 Z" fill="#efe3c6" stroke="none" opacity=".85"/>`;
    for(let i=0;i<40;i++){const a=-300+((i*53)%560), b=-250+((i*37)%220); o+=`<circle cx="${a}" cy="${b}" r="3" fill="#efe3c6" stroke="none" opacity=".6"/>`;}
    o+=`<text x="158" y="-212" font-family="PM" font-size="28" fill="#fff" stroke="none" opacity=".85" transform="rotate(-6 158 -212)" text-anchor="middle">ME LAVA</text>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${o}</g>`;
}
// Carro antigo (anos 80/90), origem = centro, rodas em y=0
function carroVelho({x=540,y=1200,s=1,color='#c8402f'}={}){
  let o='';
  o+=`<path d="M-320,-20 L-322,-100 Q-320,-130 -290,-136 L-180,-150 L-120,-250 Q-110,-266 -88,-266 L120,-266 Q140,-266 152,-250 L220,-150 L300,-140 Q326,-134 326,-104 L324,-20 Z" fill="${color}"/>`;
  o+=`<path d="M-106,-156 L-64,-244 L10,-244 L10,-156 Z M30,-156 L30,-244 L112,-244 L170,-156 Z" fill="#bfe3ea"/>`;
  o+=`<path d="M20,-262 V-30" stroke-width="6"/><rect x="40" y="-130" width="40" height="12" rx="6" fill="#c9d1d6" stroke-width="4"/>`;
  o+=`<rect x="-330" y="-60" width="70" height="30" rx="6" fill="#c9d1d6"/><rect x="262" y="-60" width="70" height="30" rx="6" fill="#c9d1d6"/>`;
  o+=`<rect x="-322" y="-126" width="40" height="28" rx="6" fill="#fff6d8"/><rect x="300" y="-126" width="22" height="34" rx="4" fill="#f6c744"/>`;
  for(const wx of [-190,190]){ o+=`<path d="M${wx-80},-20 Q${wx-76},-100 ${wx},-104 Q${wx+76},-100 ${wx+80},-20 Z" fill="#1d1612"/><circle cx="${wx}" cy="-6" r="62" fill="#2a2522"/><circle cx="${wx}" cy="-6" r="32" fill="#d6dde1" stroke-width="6"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${o}</g>`;
}
// ===== Cenas animadas do Episódio 1 =====
// buildShot(nome, t, dur) -> string SVG interior (1080x1920). t em segundos dentro do plano.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=x=>1-Math.pow(1-clamp(x,0,1),3);
const pop=(t,t0,d=.25)=>{const x=clamp((t-t0)/d,0,1);return x<=0?0:(x<1? 1+0.25*Math.sin(x*Math.PI)*(1-x)+ (x*.0) : 1)*ease(x);};
function cam(inner,t,dur,z0=1,z1=1.05,cx=540,cy=960){const z=z0+(z1-z0)*(t/dur);return `<g transform="translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`;}
function hudAnim(t,dia=30,div=87400,shake=0){const y=t<.4?-200*(1-ease(t/.4)):0;const sx=shake?Math.sin(t*60)*shake:0;return `<g transform="translate(${sx} ${y})">${hud(dia,div)}</g>`;}

const SH={};
function ono(txt,x,y,t,t0,col='#f6c744',rot=-8,size=110){ if(t<t0) return ''; const k=pop(t,t0,.2); const j=t-t0<.5?Math.sin((t-t0)*60)*4:0;
  return `<g transform="translate(${x+j} ${y}) scale(${k}) rotate(${rot})"><text x="0" y="0" font-size="${size}" fill="${col}" stroke="#1b1420" stroke-width="16" paint-order="stroke fill" text-anchor="middle">${txt}</text></g>`; }
function tag(txt,x,y,t,t0,ax,ay){ if(t<t0) return ''; const k=pop(t,t0,.2); const w=txt.length*26+50;
  return `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0,0 L${ax-x},${ay-y}" stroke="#fff" stroke-width="8"/><rect x="${-w/2}" y="-40" width="${w}" height="76" rx="14" fill="#fff"/><text x="0" y="16" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">${txt}</text></g>`; }
// ---------- 0. PENHORA (abertura) ----------
SH.penhora=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<14;k++){const a=k*0.45+t*.6; o+=`<path d="M540,980 L${540+Math.cos(a)*1700},${980+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${980+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".08" stroke="none"/>`;}
  const z=1.15-0.15*ease(t/dur);
  o+=`<g transform="translate(540 980) scale(${z}) rotate(-4) translate(-540 -980)"><rect x="140" y="420" width="800" height="1120" rx="10" fill="#fffaf0"/>`;
  o+=`<text x="540" y="540" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">BANCO NACIONAL</text><path d="M200,580 H880" stroke-width="5"/>`;
  o+=`<text x="540" y="660" font-size="50" fill="#1b1420" text-anchor="middle" stroke="none">NOTIFICAÇÃO DE DÉBITO</text>`;
  for(let k=0;k<6;k++) o+=`<path d="M220,${740+k*60} H${k%2?760:860}" stroke="#bdb6a6" stroke-width="10"/>`;
  o+=`<text x="540" y="1180" font-size="110" fill="#c8402f" text-anchor="middle" stroke="none">R$ 87.400</text>`;
  o+=`<text x="540" y="1260" font-size="44" fill="#1b1420" text-anchor="middle" stroke="none">PRAZO: 30 DIAS</text></g>`;
  if(t>.2){const k=1+2.2*(1-ease((t-.2)/.15)); o+=`<g transform="translate(540 900) scale(${k}) rotate(-16)"><rect x="-380" y="-110" width="760" height="220" rx="20" fill="none" stroke="#c8402f" stroke-width="18"/><text x="0" y="70" font-size="200" fill="#c8402f" text-anchor="middle" stroke="none">PENHORA</text></g>`;}
  const sh=t>.35&&t<.6?Math.sin(t*90)*14:0;
  return `<g transform="translate(${sh} ${sh/2})">${o}</g>`+hud(30,87400);
};
SH.fachada=(t,dur)=>{
  let o='';
  o+=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/>`;
  o+=`<path d="M${780+t*20},250 q20,-40 70,-30 q30,-40 80,-10 q50,-6 50,40 h-200 Z" fill="#fff" stroke="none" opacity=".9"/>`;
  o+=`<rect x="20" y="300" width="1040" height="1220" fill="#e9a640"/><rect x="0" y="282" width="1080" height="36" fill="#7a3d2a"/>`;
  for(const [x,y] of [[90,660],[960,1120],[930,660]]) o+=`<path d="M${x},${y} l14,30 l-10,24 l16,34" fill="none" stroke="#a8691f" stroke-width="5"/>`;
  o+=`<rect x="56" y="370" width="968" height="230" rx="10" fill="#c8402f"/><rect x="80" y="392" width="920" height="186" rx="6" fill="none" stroke="#f6c744" stroke-width="6" stroke-dasharray="18 14"/>`;
  { const zr=-14+Math.sin(t*6)*6-(t>2.2?ease((t-2.2)/.3)*10:0), zd=10+(t>2.2?ease((t-2.2)/.3)*16:0);
    o+=`<text x="540" y="545" font-size="150" fill="#f6c744" stroke="#5a1a12" stroke-width="10" paint-order="stroke fill" text-anchor="middle" letter-spacing="2">MECÂNICA TIO <tspan rotate="${zr}" dy="${zd}">Z</tspan><tspan dy="${-zd}">É</tspan></text>`; }
  o+=`<g transform="rotate(-3 540 300)"><rect x="150" y="236" width="780" height="96" rx="12" fill="#1f2340"/><text x="540" y="306" font-size="64" fill="#f6c744" text-anchor="middle" stroke="none">30 DIAS PRA SALVAR A OFICINA</text></g>`;
  o+=`<path d="M60,600 H1020 L990,660 H90 Z" fill="#2f6fb3"/>`; for(let k=0;k<12;k++) o+=`<path d="M${90+k*78},660 q39,40 78,0 Z" fill="${k%2?'#2f6fb3':'#fff'}"/>`;
  o+=`<rect x="200" y="660" width="680" height="860" fill="#3b3036"/><rect x="260" y="980" width="34" height="540" fill="#2f6fb3" opacity=".7"/><rect x="786" y="980" width="34" height="540" fill="#2f6fb3" opacity=".7"/>`;
  o+=`<rect x="200" y="660" width="680" height="300" fill="url(#slats)"/><path d="M200,960 H880" stroke-width="10"/><rect x="500" y="954" width="80" height="22" rx="8" fill="#6e7880"/><rect x="186" y="640" width="708" height="34" rx="6" fill="#8d97a0"/><rect x="176" y="640" width="24" height="880" fill="#c98a33"/><rect x="880" y="640" width="24" height="880" fill="#c98a33"/>`;
  o+=`<g transform="rotate(${-5+Math.sin(t*2)*1.5} 105 700)"><rect x="34" y="700" width="150" height="230" fill="#fffaf0"/><text x="109" y="770" font-family="PM" font-size="34" fill="#c8402f" text-anchor="middle" stroke="none">ACEITA</text><text x="109" y="820" font-family="PM" font-size="40" fill="#2f6fb3" text-anchor="middle" stroke="none">PIX</text><text x="109" y="880" font-family="PM" font-size="20" fill="#2b1d16" text-anchor="middle" stroke="none">(quase</text><text x="109" y="906" font-family="PM" font-size="20" fill="#2b1d16" text-anchor="middle" stroke="none">sempre)</text></g>`;
  for(let k=0;k<4;k++){const y=1500-k*70;o+=`<ellipse cx="985" cy="${y}" rx="78" ry="34" fill="#3a3533"/><ellipse cx="985" cy="${y-4}" rx="36" ry="14" fill="#1f1b1a" stroke-width="5"/>`;}
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="url(#walk)" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/><rect x="0" y="1880" width="1080" height="40" fill="#8d8d8d" stroke-width="6"/>`;
  const sh=Math.sin(t*40)*(t>3.2?4:1.2);
  o+=`<g transform="translate(${sh} 0)">${nando({x:540,y:1800,s:.95,face:t>2.6?'choque':'preocupado',hold:'carta'})}</g>`;
  o+=ono('CRAC!',820,700,t,2.3,'#f6c744',10,100);
  o+=tag('NANDO, 28',300,1000,t,.5,430,1080);
  return cam(o,t,dur,1.0,1.06,540,1100)+hud(30,87400);
};
SH.flashback=(t,dur)=>{
  let f=interior({wall:'#f3e6c4'});
  f+=`<rect x="760" y="300" width="230" height="290" rx="6" fill="#7a4a28"/><rect x="778" y="318" width="194" height="254" fill="#fffaf0" stroke-width="5"/><text x="875" y="380" font-size="34" fill="#e0483a" text-anchor="middle" stroke="none">AUTO PEÇAS</text><circle cx="875" cy="470" r="50" fill="#3a3a3a" stroke-width="6"/><circle cx="875" cy="470" r="20" fill="#9a9a9a" stroke-width="4"/>`;
  f+=`<rect x="90" y="380" width="460" height="22" fill="#b97a45"/>`;
  [['#2f9e6e',140],['#e0483a',220],['#f2c230',300],['#2f6fb3',380],['#7a3f9e',460]].forEach(([c,x])=>f+=`<rect x="${x-26}" y="290" width="52" height="90" rx="8" fill="${c}"/><rect x="${x-12}" y="274" width="24" height="18" rx="4" fill="#d9d9d9" stroke-width="5"/>`);
  f+=carroVelho({x:560,y:1560,s:1.25,color:'#c8402f'});
  f+=tioZe({x:330,y:1820,s:.82,age:'jovem',face:'feliz',pose:'baixo'});
  const jump=Math.abs(Math.sin(t*5))*18;
  f+=`<g transform="translate(0 ${-jump})">${nandoKid({x:780,y:1840,s:.78,face:'feliz'})}</g>`;
  let o=`<g filter="url(#sepia)">${cam(f,t,dur,1.04,1.0)}</g>`;
  // grão de filme
  let seed=Math.floor(t*12); for(let i=0;i<60;i++){seed=(seed*9301+49297)%233280;const x=seed%1080;seed=(seed*9301+49297)%233280;const y=seed%1920;o+=`<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".35" stroke="none"/>`;}
  o+=`<rect width="1080" height="1920" fill="url(#vig)" stroke="none"/>`;
  const st=pop(t,.5); o+=`<g transform="translate(860 300) scale(${st}) rotate(-6) translate(-860 -300)"><rect x="740" y="250" width="240" height="90" rx="10" fill="none" stroke="#c8402f" stroke-width="8"/><text x="860" y="318" font-size="64" fill="#c8402f" text-anchor="middle" stroke="none">1996</text></g>`;
  o+=tag('PAI',330,880,t,1.0,330,980)+tag('NANDINHO',780,1060,t,1.6,780,1140);
  return o+hud(30,87400);
};
SH.callcenter=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c9ced3" stroke="none"/>`;
  for(let x=0;x<1080;x+=180) o+=`<rect x="${x+20}" y="230" width="140" height="40" rx="6" fill="${Math.floor(t*8)%7===2&&x===360?'#c9d2d6':'#eef4f7'}" stroke-width="4"/>`;
  o+=`<rect x="0" y="1150" width="1080" height="770" fill="#8d959c" stroke="none"/><path d="M0,1150 H1080" stroke-width="7"/><rect x="40" y="620" width="1000" height="540" fill="#7e8a95"/>`;
  for(let x=60;x<1040;x+=60) o+=`<path d="M${x},640 v500" stroke="#6f7a84" stroke-width="3"/>`;
  o+=`<g transform="rotate(4 220 760)"><rect x="150" y="700" width="140" height="140" fill="#f6e36a" stroke-width="4"/><text x="220" y="760" font-family="PM" font-size="26" fill="#2b1d16" text-anchor="middle" stroke="none">META:</text><text x="220" y="800" font-family="PM" font-size="30" fill="#c8402f" text-anchor="middle" stroke="none">200</text><text x="220" y="828" font-family="PM" font-size="18" fill="#2b1d16" text-anchor="middle" stroke="none">ligações</text></g>`;
  o+=`<g transform="rotate(-5 860 740)"><rect x="790" y="680" width="140" height="140" fill="#9be3f0" stroke-width="4"/><text x="860" y="750" font-family="PM" font-size="24" fill="#2b1d16" text-anchor="middle" stroke="none">SORRIA</text><text x="860" y="790" font-family="PM" font-size="34" fill="#2b1d16" text-anchor="middle" stroke="none">:)</text></g>`;
  o+=`<rect x="0" y="1290" width="1080" height="60" fill="#5f6870"/>`;
  const slump=ease(t/dur)*40;
  o+=`<g transform="translate(0 ${slump})">`+nando({x:540,y:1990,s:1.05,face:'preocupado',hold:null});
  o+=`<g stroke="#2b1d16"><path d="M400,1040 Q410,790 540,786 Q670,790 680,1040" fill="none" stroke-width="22"/><path d="M400,1040 Q410,790 540,786 Q670,790 680,1040" fill="none" stroke="#3a3a3a" stroke-width="12"/><rect x="378" y="990" width="48" height="96" rx="18" fill="#3a3a3a" stroke-width="6"/><rect x="654" y="990" width="48" height="96" rx="18" fill="#3a3a3a" stroke-width="6"/><path d="M402,1080 Q420,1150 500,1146" fill="none" stroke-width="8"/><circle cx="508" cy="1146" r="14" fill="#3a3a3a" stroke-width="5"/></g></g>`;
  o+=`<rect x="0" y="1350" width="1080" height="80" fill="#b9a68a"/><rect x="0" y="1430" width="1080" height="490" fill="#9c8a70" stroke="none"/>`;
  const fila=Math.round(47+52*ease(t/dur));
  o+=`<rect x="700" y="1150" width="320" height="210" rx="12" fill="#3a3f45"/><rect x="718" y="1168" width="284" height="170" rx="6" fill="${fila>90?'#e0483a':'#6fa8dc'}" stroke-width="4"/><text x="860" y="1272" font-size="56" fill="#fff" text-anchor="middle" stroke="none">FILA: ${fila}</text><rect x="840" y="1360" width="40" height="40" fill="#3a3f45" stroke-width="5"/>`;
  o+=`<rect x="80" y="1260" width="160" height="100" rx="8" fill="#f2efe6"/><path d="M180,1280 q30,6 0,40" fill="none" stroke-width="6"/><text x="160" y="1325" font-size="26" fill="#2f6fb3" text-anchor="middle" stroke="none">SEG.</text>`;
  // ícone de telefone a tocar
  if(Math.floor(t*6)%2===0) o+=`<g transform="translate(940 560) rotate(${Math.sin(t*50)*12})"><circle r="56" fill="#e0483a"/><path d="M-22,-18 q10,-10 18,0 l-6,10 q8,14 20,20 l10,-6 q10,8 0,18 q-40,10 -42,-42 Z" fill="#fff" stroke-width="4"/></g>`;
  o+=ono('TRIIIM!',860,470,t,.3,'#fff',8,90)+ono('TRIIIM!',220,1000,t,1.6,'#fff',-8,90);
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.praia=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#8fd6f5" stroke="none"/><circle cx="860" cy="420" r="90" fill="#ffe27a" stroke="none"/>`;
  o+=`<path d="M${120+t*12},380 q20,-40 70,-30 q30,-40 80,-10 q50,-6 50,40 h-200 Z" fill="#fff" stroke="none" opacity=".9"/>`;
  const wv=(t*60)%120;
  o+=`<rect x="0" y="900" width="1080" height="320" fill="#2fa3d6"/><g transform="translate(${-wv} 0)"><path d="M0,950 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/><path d="M0,1060 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/></g>`;
  o+=`<path d="M0,1220 Q540,1160 1080,1220 V1920 H0 Z" fill="#f6dc9a"/>`;
  for(let i=0;i<40;i++) o+=`<circle cx="${(i*97)%1080}" cy="${1300+(i*53)%600}" r="4" fill="#e3c47a" stroke="none"/>`;
  o+=`<path d="M200,1600 L330,820" stroke-width="14"/><path d="M60,900 Q330,640 600,860 Q330,780 60,900 Z" fill="#e0483a"/><path d="M200,820 Q330,700 470,800" fill="none" stroke="#fff" stroke-width="30" opacity=".8"/>`;
  o+=`<path d="M720,1600 L800,1380 H990 L940,1600 M760,1520 H960" fill="none" stroke-width="12"/><path d="M790,1400 L960,1400 L930,1560 L760,1560 Z" fill="#2fb36e" stroke-width="6"/><rect x="80" y="1610" width="160" height="110" rx="12" fill="#2f6fb3"/><rect x="80" y="1610" width="160" height="34" rx="10" fill="#fff"/>`;
  // gaivota
  const gx=(t*140)%1300-100; o+=`<path d="M${gx},560 q20,-20 40,0 q20,-20 40,0" fill="none" stroke-width="6"/>`;
  const sway=Math.sin(t*4)*3;
  o+=`<g transform="rotate(${sway} 540 1820)">${tioZe({x:540,y:1820,s:.95,age:'velho',face:'feliz',pose:'acena'})}</g>`;
  // áudio do WhatsApp (parte opcional, a partir de 4 s)
  if(t>4){const k=pop(t,4);o+=`<g transform="translate(540 1420) scale(${k}) translate(-540 -1420)"><rect x="150" y="1360" width="780" height="130" rx="40" fill="#dcf8c6"/><circle cx="230" cy="1425" r="40" fill="#25d366"/><path d="M218,1405 v40 l34,-20 Z" fill="#fff" stroke="none"/>`;
    for(let i=0;i<22;i++){const h=10+Math.abs(Math.sin(i*1.7+t*8))*34;o+=`<rect x="${300+i*24}" y="${1425-h/2}" width="12" height="${h}" rx="6" fill="#4a8f5a" stroke="none"/>`;}
    o+=`<text x="890" y="1470" font-size="26" fill="#6b8f6b" text-anchor="end" stroke="none">0:04</text></g>`;}
  o+=tag('PAI, 62',760,760,t,.6,640,860)+ono('SLURP',840,1060,t,2.2,'#f6c744',10,80);
  return cam(o,t,dur,1.0,1.05)+hud(30,87400);
};
SH.lista=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a0683a" stroke="none"/>`;
  for(let y=0;y<1920;y+=110) o+=`<path d="M0,${y} H1080" stroke="#8a5530" stroke-width="5"/>`;
  const unroll=ease(t/0.8);
  o+=`<defs><clipPath id="roll"><rect x="0" y="0" width="1080" height="${300+1700*unroll}"/></clipPath></defs>`;
  o+=`<g clip-path="url(#roll)"><g transform="rotate(-3 540 1100)"><rect x="160" y="300" width="760" height="1700" fill="#fffaf0"/>`;
  for(let y=420;y<2000;y+=70) o+=`<path d="M200,${y} H880" stroke="#c7dbe8" stroke-width="3"/>`;
  o+=`<path d="M260,300 V2000" stroke="#eaa3a3" stroke-width="3"/><text x="540" y="400" font-size="60" fill="#2b1d16" text-anchor="middle" stroke="none">DÍVIDAS DO TIO ZÉ</text>`;
  const items=[['Banco','R$ 61.000'],['Peças fiado (2019)','R$ 9.800'],['Luz atrasada','R$ 4.200'],['Aluguel do galpão','R$ 7.600'],['Elevador (parcelas)','R$ 3.900'],['Juros','R$ 900']];
  items.forEach(([a,b],i)=>{const tt=.6+i*.28; if(t<tt) return; const y=480+i*90; o+=`<text x="290" y="${y}" font-family="PM" font-size="40" fill="#1f3f77" stroke="none">${a}</text><text x="860" y="${y}" font-family="PM" font-size="40" fill="#c8402f" text-anchor="end" stroke="none">${b}</text>`;});
  if(t>2.3){const tot=Math.round(87400*ease((t-2.3)/.6)); o+=`<path d="M290,1050 H860" stroke-width="6"/><text x="290" y="1130" font-size="64" fill="#2b1d16" stroke="none">TOTAL</text><text x="860" y="1130" font-size="72" fill="#c8402f" text-anchor="end" stroke="none">R$ ${tot.toLocaleString('pt-BR')}</text>`;}
  o+=`</g></g>`;
  if(t>3.0){const k=1+1.5*(1-ease((t-3.0)/.18)); o+=`<g transform="translate(600 1290) scale(${k}) rotate(-14) translate(-600 -1290)"><rect x="380" y="1220" width="440" height="140" rx="12" fill="none" stroke="#c8402f" stroke-width="10"/><text x="600" y="1320" font-size="76" fill="#c8402f" text-anchor="middle" stroke="none">VENCE EM 30 DIAS</text></g>`;}
  return o+hudAnim(1,30,87400,t>3.0&&t<3.4?8:0);
};
SH.corsa=(t,dur)=>{
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  for(const px of [110,900]) o+=`<rect x="${px}" y="560" width="80" height="1060" rx="6" fill="#2f6fb3"/><rect x="${px+14}" y="600" width="14" height="980" fill="#245a92" stroke="none"/><rect x="${px-20}" y="1610" width="120" height="30" rx="4" fill="#245a92"/>`;
  o+=`<rect x="190" y="1010" width="710" height="28" fill="#f2c230"/>`;
  o+=corsa({x:545,y:1040,s:1.25,dusty:true});
  o+=`<path d="M190,700 L360,880 M190,760 L320,900 M190,700 Q240,780 210,860" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/><path d="M900,720 L760,860 M900,780 L800,880" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>`;
  const sy=700+Math.sin(t*1.5)*60+60; o+=`<path d="M300,560 V${sy}" stroke="#fff" stroke-width="2"/><circle cx="300" cy="${sy+8}" r="10" fill="#2b1d16" stroke="none"/>`;
  const sw=Math.sin(t*3)*8;
  o+=`<path d="M560,1050 v70" stroke-width="5"/><g transform="rotate(${-7+sw} 560 1060)"><rect x="390" y="1120" width="340" height="150" rx="12" fill="#fffaf0"/><text x="560" y="1180" font-size="40" fill="#2b1d16" text-anchor="middle" stroke="none">PEÇA ENCOMENDADA</text><text x="560" y="1250" font-size="64" fill="#e0483a" text-anchor="middle" stroke="none">2019</text></g>`;
  for(let i=0;i<14;i++){const x=(i*83)%1080, y=(i*131+t*80)%1400+300;o+=`<circle cx="${x}" cy="${y}" r="3" fill="#efe3c6" stroke="none" opacity=".7"/>`;}
  o+=`<path d="M440,1660 h220 l-20,30 h-180 Z" fill="#4a4048"/>`;
  o+=ono('CRÉÉÉC',300,560,t,.8,'#fff',-10,90);
  return cam(o,t,dur,1.0,1.06,545,1000)+hud(30,87400);
};
SH.armando=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="0" y="1010" width="1080" height="70" fill="#b97a45"/><rect x="0" y="1080" width="1080" height="390" fill="#9a6034" stroke="none"/><path d="M0,1080 H1080" stroke-width="6"/>`;
  for(const x of [60,330,600,870]) o+=`<rect x="${x}" y="1110" width="220" height="330" rx="8" fill="#a86a3c" stroke-width="5"/>`;
  const blink=Math.floor(t*4)%2===0;
  o+=`<rect x="760" y="880" width="240" height="130" rx="10" fill="#7a7f86"/><rect x="780" y="900" width="200" height="50" rx="6" fill="#1f2a1f" stroke-width="4"/><text x="880" y="938" font-size="34" fill="${blink?'#5fe08a':'#2e6b42'}" text-anchor="middle" stroke="none">R$ 0,00</text>`;
  o+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*3))*8})">${armando({x:300,y:1840,s:.92,face:'feliz'})}</g>`;
  o+=nando({x:820,y:1890,s:.78,face:t>2.2?'choque':'normal',hold:null,pose:t>2.2?'cabeca':'normal'});
  o+=tag('SEU ARMANDO, 70',300,800,t,.3,300,880)+ono('PLIM!',880,840,t,2.2,'#5fe08a',8,80);
  if(t>1.2){const k=pop(t,1.2);o+=`<g transform="translate(540 600) scale(${k}) translate(-540 -600)"><g transform="rotate(-6 540 600)"><rect x="350" y="530" width="380" height="120" rx="60" fill="#fff"/><text x="540" y="612" font-family="PM" font-size="44" fill="#2b1d16" text-anchor="middle" stroke="none">Põe na conta!</text></g><path d="M400,640 l-40,90 l90,-70" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.speedfix=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="420" width="1040" height="1100" fill="#eef3f7"/><rect x="0" y="400" width="1080" height="40" fill="#1f6fd6"/>`;
  const on=t>.4 && !(t>.6&&t<.75) && !(t>.9&&t<1.0);
  o+=`<rect x="80" y="480" width="920" height="200" rx="30" fill="#10233c"/>`;
  o+=`<g ${on?'filter="url(#glow)"':''} stroke="none" opacity="${on?1:.25}"><text x="540" y="630" font-size="140" fill="#49f2ff" text-anchor="middle">SPEEDFIX</text><path d="M150,520 l-34,60 h28 l-18,50 l52,-70 h-28 l20,-40 Z" fill="#ffe14a"/><path d="M930,520 l-34,60 h28 l-18,50 l52,-70 h-28 l20,-40 Z" fill="#ffe14a"/></g>`;
  o+=`<rect x="390" y="700" width="300" height="56" rx="28" fill="#ffe14a"/><text x="540" y="742" font-size="40" fill="#10233c" text-anchor="middle" stroke="none" letter-spacing="6">EXPRESS</text>`;
  for(let k=0;k<3;k++){const x=60+k*330; o+=`<rect x="${x}" y="800" width="300" height="720" fill="#7fd0f0"/><path d="M${x+30},830 h120 M${x+30},860 h80" stroke="#fff" stroke-width="8" opacity=".7"/>`;}
  o+=`<rect x="880" y="840" width="120" height="200" rx="14" fill="#10233c"/><rect x="896" y="860" width="88" height="120" rx="8" fill="#49f2ff" stroke-width="4"/><text x="940" y="910" font-size="24" fill="#10233c" text-anchor="middle" stroke="none">CHECK-IN</text><text x="940" y="946" font-size="24" fill="#10233c" text-anchor="middle" stroke="none">NO APP</text>`;
  const a=Math.sin(t*7)*12, b=Math.sin(t*9+1)*30;
  o+=`<g transform="rotate(${a} 180 1500)"><path d="M160,1500 V1010 Q160,980 180,980 Q200,980 200,1010 V1500 Z" fill="#ff5a3c"/><circle cx="180" cy="960" r="34" fill="#ff5a3c"/><circle cx="168" cy="952" r="6" fill="#2b1d16" stroke="none"/><circle cx="192" cy="952" r="6" fill="#2b1d16" stroke="none"/><path d="M166,972 q14,12 28,0" fill="none" stroke-width="5"/>
  <g transform="rotate(${b} 164 1060)"><path d="M164,1060 Q100,1010 90,920" fill="none" stroke="#2b1d16" stroke-width="40"/><path d="M164,1060 Q100,1010 90,920" fill="none" stroke="#ff5a3c" stroke-width="28"/></g>
  <g transform="rotate(${-b} 198 1070)"><path d="M198,1070 Q270,1110 300,1020" fill="none" stroke="#2b1d16" stroke-width="40"/><path d="M198,1070 Q270,1110 300,1020" fill="none" stroke="#ff5a3c" stroke-width="28"/></g></g>`;
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="#3d3a42" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/><path d="M0,1760 h1080" stroke="#f2c230" stroke-width="10" stroke-dasharray="90 60"/>`;
  const car=(x,c)=>`<g><path d="M${x},1700 v-60 q0,-24 28,-28 l36,-4 q24,-46 70,-50 h78 q40,4 60,50 l24,4 q24,4 24,28 v60 Z" fill="${c}"/><path d="M${x+74},1612 q20,-34 56,-38 h34 v38 Z M${x+180},1612 v-38 h24 q28,4 46,38 Z" fill="#bfe3ea" stroke-width="5"/><circle cx="${x+70}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/><circle cx="${x+230}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/></g>`;
  const dx=-ease(t/dur)*60; o+=`<g transform="translate(${dx} 0)">${car(40,'#f2c230')+car(390,'#ef4f6b')+car(740,'#5fd17c')}</g>`;
  o+=ono('BZZT',900,450,t,.4,'#49f2ff',10,80)+ono('BI-BI!',800,1480,t,2.0,'#f6c744',-6,90);
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.lonas=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" stroke="none" opacity=".28"/>`;
  const sw=Math.sin(t*2)*10;
  o+=`<g transform="rotate(${sw} 540 0)"><path d="M540,0 V230" stroke-width="5"/><rect x="526" y="230" width="28" height="30" rx="4" fill="#4a4048"/><path d="M520,260 q20,60 40,0 Z" fill="#b8c2c7"/></g>`;
  const sk=(x0,x1,yb)=>{let h='';for(let x=x1;x>x0;x-=46)h+=`Q${x-23},${yb+10} ${Math.max(x0,x-46)},${yb} `;return h;};
  o+=`<path d="M40,1330 L42,1260 Q46,1230 84,1222 Q134,1212 166,1180 Q214,1096 284,1088 Q364,1086 410,1140 Q454,1190 468,1250 L470,1330 ${sk(40,470,1330)} Z" fill="#9a915c"/>`;
  o+=`<path d="M580,1340 L582,1262 Q586,1236 620,1232 L702,1226 Q730,1170 762,1140 L900,1138 Q930,1170 952,1220 L1016,1226 Q1044,1232 1046,1262 L1048,1340 ${sk(580,1048,1340)} Z" fill="#9a915c"/>`;
  o+=`<path d="M60,1640 L62,1540 Q66,1500 120,1492 L440,1474 Q510,1468 556,1414 Q600,1356 680,1350 L780,1350 Q836,1354 904,1414 Q984,1472 1040,1484 L1060,1500 L1060,1640 ${sk(60,1060,1640)} Z" fill="#b0a66b"/>`;
  for(const [a,b,c2,dd] of [[200,1490,190,1640],[380,1478,390,1640],[620,1390,630,1640],[800,1352,810,1640],[960,1460,970,1640]]) o+=`<path d="M${a},${b} Q${a+12},${(b+dd)/2} ${c2},${dd}" fill="none" stroke="#6b6440" stroke-width="5"/>`;
  o+=`<path d="M120,1496 L440,1478 Q510,1472 558,1418 Q600,1360 680,1354 L780,1354" fill="none" stroke="#e0d79f" stroke-width="7" opacity=".8"/>`;
  const growl=t>2.2; const shake=growl?Math.sin(t*70)*4:0;
  o+=`<g transform="translate(${shake} 0)">${turbo({x:700,y:1880,s:.72,mood:growl?'rosna':'calmo'})}</g>`;
  if(growl){const k=pop(t,2.2);o+=`<g transform="translate(330 1740) scale(${k}) translate(-330 -1740)"><g font-size="70" fill="#f6c744" stroke="#2b1d16" stroke-width="10" paint-order="stroke fill"><text x="300" y="1760" transform="rotate(-10 300 1760)">GRRR</text></g></g>`;}
  o+=ono('?',250,1060,t,.8,'#fff',-10,140)+ono('?',820,1080,t,1.2,'#fff',10,140)+ono('?',560,1300,t,1.6,'#f6c744',0,160);
  return cam(o,t,dur,1.0,1.05,540,1300)+hud(30,87400);
};
SH.votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f6fb3" stroke="none"/><rect x="540" width="540" height="1920" fill="#2fa36e" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 300) scale(${bk}) rotate(-3) translate(-540 -300)"><rect x="150" y="240" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="320" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="520" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">CORSA</text><text x="270" y="580" font-size="36" fill="#cfe3ff" text-anchor="middle" stroke="none">vender as peças do Corsa</text>${corsa({x:270,y:900,s:.62,dusty:true})}<rect x="70" y="910" width="400" height="20" fill="#f2c230"/></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="520" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">FAXINA</text><text x="810" y="580" font-size="36" fill="#d4f5e2" text-anchor="middle" stroke="none">arrumar a oficina</text>`;
  // vassoura e balde
  o+=`<g transform="rotate(${-18+Math.sin(t*6)*8} 760 900)"><path d="M760,900 L840,640" stroke-width="20"/><path d="M760,900 L840,640" stroke="#b97a45" stroke-width="10"/><path d="M700,880 L800,910 L790,960 L680,930 Z" fill="#f2c230"/><path d="M700,930 l-10,40 M725,936 l-8,42 M750,942 l-6,42 M775,948 l-4,40" stroke-width="5"/></g>`;
  o+=`<path d="M860,780 L960,780 L944,900 L876,900 Z" fill="#2f6fb3"/><path d="M864,780 q46,-60 92,0" fill="none" stroke-width="6"/><ellipse cx="910" cy="780" rx="50" ry="12" fill="#9fdcf2"/>`;
  for(let k=0;k<3;k++){const bt=(t*1.5+k*.33)%1; o+=`<circle cx="${880+k*30}" cy="${770-bt*90}" r="${10-bt*6}" fill="#fff" opacity="${1-bt}" stroke-width="3"/>`;}
  o+=`</g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 760) scale(${xp}) translate(-540 -760)"><circle cx="540" cy="760" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="790" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 1900)">${nando({x:540,y:1900,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud(30,87400);
};
const DEFS=()=>sepiaDefs()+`<pattern id="slats" width="40" height="34" patternUnits="userSpaceOnUse"><rect width="40" height="34" fill="#9aa3a8"/><rect width="40" height="10" fill="#b7c0c4"/><rect y="28" width="40" height="6" fill="#7b858b"/></pattern>
<pattern id="walk" width="120" height="80" patternUnits="userSpaceOnUse"><rect width="120" height="80" fill="#cfcfcf"/><path d="M0,0 H120 M0,0 V80" stroke="#b3b3b3" stroke-width="5"/></pattern>
<filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
function buildShot(name,t,dur){
  window.__carta=window.__carta||'';
  return `<defs>${DEFS()}</defs><g stroke="#2b1d16" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" font-family="A">${SH[name](t,dur)}</g>`;
}
// ===== Cenas animadas do Episódio 2 (Dia 2) =====
const D2=29; // dias restantes no HUD
let NOHUD=false;
function hud2(div,t=1,shake=0){ if(NOHUD) return '';const sx=shake?Math.sin(t*60)*shake:0;return `<g transform="translate(${sx} 0)">${hud(D2,div)}</g>`;}
// valor a flutuar ao lado do HUD (verde = desce dívida, vermelho = sobe)
function delta(txt,col,t,t0){ if(t<t0||NOHUD) return ''; const k=pop(t,t0,.25); const up=Math.min(1,(t-t0)/1.6)*40;
  return `<g transform="translate(700 ${260-up}) scale(${k}) rotate(-4)"><rect x="-170" y="-52" width="340" height="88" rx="44" fill="${col}"/><text x="0" y="12" font-size="58" fill="#fff" stroke="#1b1420" stroke-width="10" paint-order="stroke fill" text-anchor="middle">${txt}</text></g>`; }
function lerpDiv(a,b,t,t0,d=.8){return Math.round(a+(b-a)*ease((t-t0)/d));}
function liftScene(carY,dusty=true,extra=''){
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  for(const px of [110,900]) o+=`<rect x="${px}" y="560" width="80" height="1060" rx="6" fill="#2f6fb3"/><rect x="${px+14}" y="600" width="14" height="980" fill="#245a92" stroke="none"/><rect x="${px-20}" y="1610" width="120" height="30" rx="4" fill="#245a92"/>`;
  o+=`<rect x="190" y="${carY-30}" width="710" height="28" fill="#f2c230"/>`;
  o+=extra+corsa({x:545,y:carY,s:1.25,dusty});
  return o;
}
function stamp(t,t0,x,y,w,h,txt,size,col='#c8402f',rot=-10,fill='none'){ if(t<t0) return ''; const k=1+1.6*(1-ease((t-t0)/.16));
  return `<g transform="translate(${x} ${y}) scale(${k}) rotate(${rot})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${col}" stroke-width="14"/><text x="0" y="${size*.36}" font-size="${size}" fill="${col}" text-anchor="middle" stroke="none">${txt}</text></g>`; }
function poeira(t,n=16){let o='';for(let i=0;i<n;i++){const x=(i*83)%1080,y=(i*131+t*80)%1400+300;o+=`<circle cx="${x}" cy="${y}" r="3" fill="#efe3c6" stroke="none" opacity=".7"/>`;}return o;}

// 1 · VOCÊS ESCOLHERAM: CORSA — elevador desce de uma vez
SH.e2escolha=(t,dur)=>{
  const drop=t<.5?0:ease((t-.5)/.35); const carY=1040+drop*560; const sh=t>.8&&t<1.1?Math.sin(t*90)*12:0;
  let o=`<g transform="translate(${sh} ${sh/2})">${liftScene(carY,true)}${poeira(t)}</g>`;
  o+=ono('CRÉÉÉC',300,620,t,.45,'#fff',-10,100);
  o+=stamp(t,.15,540,1230,860,250,'VOCÊS ESCOLHERAM',92,'#fff',-6,'#2f9e6e');
  if(t>.55){const k=pop(t,.55,.2);o+=`<g transform="translate(540 1420) scale(${k}) rotate(4)"><rect x="-260" y="-90" width="520" height="170" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="-40" y="50" font-size="140" fill="#1b1420" text-anchor="middle" stroke="none">CORSA</text><text x="0" y="140" font-size="48" fill="#fff" stroke="#1b1420" stroke-width="10" paint-order="stroke fill" text-anchor="middle">(vender as peças)</text><g transform="translate(180 0)"><circle r="56" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/><path d="M-26,0 l18,20 l34,-40" fill="none" stroke="#fff" stroke-width="14"/></g></g>`;}
  return o+hud2(87400);
};
// 2 · Sete anos de pó
SH.e2po=(t,dur)=>{
  const wipe=clamp((t-1.8)/1.6,0,1);
  let o=liftScene(1600,true);
  // pano a apagar o ME LAVA: retângulo da cor do vidro a avançar
  if(wipe>0) o+=`<g transform="translate(545 1600) scale(1.25)"><path d="M66,-272 L${66+182*wipe},-272 L${66+182*wipe},-174 L66,-174 Z" fill="#bfe3ea" stroke="none"/></g>`;
  // nuvem de pó
  for(let i=0;i<9;i++){const a=i*0.7, r=(t*140+i*40)%420, op=Math.max(0,.75-r/520);o+=`<circle cx="${560+Math.cos(a)*r}" cy="${1300+Math.sin(a)*r*.6-t*30}" r="${70+r*.25}" fill="#e9dcc0" stroke="none" opacity="${op}"/>`;}
  const cough=Math.floor(t*3)%2===0?6:0;
  o+=`<g transform="translate(0 ${cough})">${nando({x:820,y:1900,s:.7,face:'preocupado',hold:null,pose:'cabeca'})}</g>`;
  // pano vermelho na mão (a esfregar)
  const px=760+Math.sin(t*14)*30; o+=`<path d="M${px},1290 l50,-10 l-6,46 l-48,6 Z" fill="#e0483a" stroke-width="5"/>`;
  o+=ono('COF',260,800,t,.5,'#fff',-12,100)+ono('COF!',400,910,t,1.1,'#fff',8,90);
  if(t>1.4){const k=pop(t,1.4),sw=Math.sin(t*3)*6;o+=`<g transform="translate(430 540) scale(${k}) rotate(${-6+sw})"><path d="M0,-60 V0" stroke-width="5"/><rect x="-200" y="0" width="400" height="150" rx="12" fill="#fffaf0"/><text x="0" y="58" font-size="40" fill="#2b1d16" text-anchor="middle" stroke="none">DONA DO CARRO:</text><text x="0" y="122" font-family="PM" font-size="54" fill="#c8402f" text-anchor="middle" stroke="none">DONA CIDA</text></g>`;}
  return cam(o,t,dur,1.0,1.05,545,1300)+hud2(87400);
};
// 3 · Capô aberto — falta uma peça
SH.e2capo=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2a2a30" stroke="none"/>`;
  // capô aberto (tampa em cima)
  o+=`<path d="M60,240 L1020,240 L940,620 L140,620 Z" fill="#4fb3a0"/><path d="M180,560 L900,560" stroke="#3a8e7f" stroke-width="10"/>`;
  // compartimento do motor
  o+=`<path d="M80,640 H1000 L960,1600 H120 Z" fill="#3a3a42"/>`;
  o+=`<rect x="200" y="760" width="420" height="320" rx="24" fill="#6b7479"/><rect x="230" y="720" width="360" height="70" rx="14" fill="#8d979c"/>`;
  for(let k=0;k<4;k++) o+=`<rect x="${255+k*88}" y="700" width="50" height="40" rx="8" fill="#e0483a"/>`;
  o+=`<path d="M620,860 Q760,820 820,940 Q860,1040 760,1120" fill="none" stroke="#1b1b1f" stroke-width="40"/><path d="M620,860 Q760,820 820,940 Q860,1040 760,1120" fill="none" stroke="#2c2c32" stroke-width="26"/>`;
  o+=`<rect x="700" y="700" width="220" height="150" rx="16" fill="#1f1f24"/><text x="810" y="790" font-size="44" fill="#f6c744" text-anchor="middle" stroke="none">+ −</text>`;
  o+=`<rect x="190" y="1140" width="250" height="160" rx="18" fill="#2f6fb3"/><circle cx="315" cy="1220" r="40" fill="#bfe3ea"/>`;
  // buraco vazio onde devia estar a peça
  o+=`<rect x="540" y="1180" width="300" height="230" rx="20" fill="#121216" stroke="#f6c744" stroke-width="8" stroke-dasharray="26 18"/>`;
  const p=1+0.12*Math.sin(t*8); if(t>.6) o+=`<g transform="translate(690 1295) scale(${p*pop(t,.6)})"><path d="M-90,-90 L90,90 M90,-90 L-90,90" stroke="#1b1420" stroke-width="54"/><path d="M-90,-90 L90,90 M90,-90 L-90,90" stroke="#e0483a" stroke-width="34"/></g>`;
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(690 1520) scale(${k})"><rect x="-230" y="-56" width="460" height="100" rx="18" fill="#fff"/><text x="0" y="22" font-size="66" fill="#1b1420" text-anchor="middle" stroke="none">FALTA A PEÇA</text></g>`;}
  // mão do Nando com lanterna a entrar
  const hx=1080-ease(t/1.2)*220; o+=`<path d="M${hx+200},1000 L${hx},960" stroke="#2b1d16" stroke-width="70"/><path d="M${hx+200},1000 L${hx},960" stroke="#b9774c" stroke-width="56"/><rect x="${hx-90}" y="930" width="110" height="56" rx="10" fill="#f6c744"/><path d="M${hx-90},940 L${hx-260},900 L${hx-260},1040 L${hx-90},980 Z" fill="#fff6c4" stroke="none" opacity=".35"/>`;
  return cam(o,t,dur,1.06,1.0,690,1200)+hud2(87400);
};
// 4 · O Turbo tinha a peça — e pergunta de comentário a meio
SH.e2turbo=(t,dur)=>{
  let o=interior({});
  o+=corsa({x:300,y:1460,s:.9,dusty:false});
  // pneu-cama do Turbo
  o+=`<ellipse cx="760" cy="1640" rx="230" ry="90" fill="#2a2522"/><ellipse cx="760" cy="1630" rx="130" ry="44" fill="#141110" stroke-width="5"/>`;
  const out=ease(t/.9); const tx=760-out*120, ty=1700-out*40, wag=Math.sin(t*12)*6;
  o+=`<g transform="rotate(${wag} ${tx} ${ty})">${turbo({x:tx,y:ty,s:.62,mood:'calmo',flip:false})}</g>`;
  // caixa na boca
  const bx=tx-262, by=ty-200;
  o+=`<g transform="rotate(-8 ${bx} ${by})"><rect x="${bx-120}" y="${by-60}" width="240" height="120" rx="8" fill="#c79a5b"/><path d="M${bx-120},${by-30} H${bx+120}" stroke="#a87a3f" stroke-width="5"/><text x="${bx}" y="${by+10}" font-family="PM" font-size="30" fill="#2b1d16" text-anchor="middle" stroke="none">PEÇA CORSA</text><text x="${bx}" y="${by+46}" font-family="PM" font-size="28" fill="#c8402f" text-anchor="middle" stroke="none">2019</text></g>`;
  o+=ono('AU!',900,1300,t,.9,'#f6c744',8,100);
  // pergunta a meio
  if(t>1.0){const k=pop(t,1.0);o+=`<g transform="translate(540 640) scale(${k}) rotate(-3)"><rect x="-430" y="-150" width="860" height="300" rx="28" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-36" font-size="88" fill="#fff" text-anchor="middle" stroke="none">O DONO VAI PAGAR?</text><text x="0" y="82" font-size="84" fill="#f6c744" text-anchor="middle" stroke="none">COMENTA: SIM OU NÃO</text></g>`;
    const b=Math.sin(t*8)*12; o+=`<g transform="translate(540 ${840+b})"><path d="M-40,0 H40 V40 H80 L0,110 L-80,40 H-40 Z" fill="#f6c744" stroke="#1b1420" stroke-width="8"/></g>`;}
  return cam(o,t,dur,1.0,1.04,600,1500)+hud2(87400);
};
// 5 · VRUUUM — sete anos parado, vinte minutos de serviço
SH.e2motor=(t,dur)=>{
  const on=t>.6; const sh=on?Math.sin(t*70)*4:0;
  let o=liftScene(1600,false);
  o=`<g transform="translate(${sh} 0)">${o}</g>`;
  // fumo do escape (à esquerda, atrás do carro)
  if(on) for(let i=0;i<6;i++){const p=((t-.6)*1.2+i/6)%1; o+=`<circle cx="${110-p*260}" cy="${1560-p*200}" r="${30+p*90}" fill="#cfcfd4" stroke="#8d8d94" stroke-width="5" opacity="${1-p}"/>`;}
  o+=ono('VRUUUM!',560,720,t,.6,'#f6c744',-6,150);
  const hop=Math.abs(Math.sin(t*6))*30*(t>1.2?1:0);
  o+=`<g transform="translate(0 ${-hop})">${nando({x:860,y:1900,s:.62,face:t>1.2?'contente':'normal',hold:t>1.2?null:'chave',pose:t>1.2?'vitoria':'normal'})}</g>`;
  if(t>2.2){const k=pop(t,2.2);o+=`<g transform="translate(330 1160) scale(${k}) rotate(-5)"><rect x="-250" y="-60" width="500" height="120" rx="20" fill="#fff"/><text x="0" y="28" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">7 ANOS → 20 MIN</text></g>`;}
  return cam(o,t,dur,1.0,1.05,545,1400)+hud2(87400);
};
// 6 · WhatsApp + PIX
SH.e2whats=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2f9e6e" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.2;o+=`<path d="M540,1000 L${540+Math.cos(a)*1600},${1000+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${1000+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  // telemóvel
  o+=`<rect x="150" y="300" width="780" height="1540" rx="70" fill="#1d1d24"/><rect x="180" y="330" width="720" height="1480" rx="48" fill="#ece5dd" stroke="none"/>`;
  o+=`<path d="M180,380 Q180,330 228,330 H852 Q900,330 900,380 V480 H180 Z" fill="#075e54" stroke="none"/><circle cx="260" cy="405" r="40" fill="#c79a5b" stroke="#fff" stroke-width="4"/><text x="320" y="400" font-size="40" fill="#fff" stroke="none">DONA CIDA (CORSA)</text><text x="320" y="446" font-size="28" fill="#cfe9e2" stroke="none">${t>1.6&&t<2.6?'digitando...':'online'}</text>`;
  const bub=(y,txt,me,t0,lines=1)=>{ if(t<t0) return ''; const k=pop(t,t0,.2); const w=560, h=40+lines*58; const x=me?880-w:200;
    return `<g transform="translate(${me?880:200} ${y}) scale(${k}) translate(${me?-880:-200} ${-y})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${me?'#dcf8c6':'#fff'}" stroke="#b9b2a2" stroke-width="3"/>${txt.map((s,i)=>`<text x="${x+30}" y="${y+64+i*58}" font-family="PM" font-size="40" fill="#1b1420" stroke="none">${s}</text>`).join('')}</g>`;};
  o+=bub(540,['Dona Cida, seu Corsa','tá pronto!'],true,.2,2);
  if(t>1.6&&t<2.6){const d=Math.floor(t*6)%3; o+=`<rect x="200" y="740" width="160" height="80" rx="22" fill="#fff" stroke="#b9b2a2" stroke-width="3"/>`+[0,1,2].map(i=>`<circle cx="${240+i*40}" cy="780" r="12" fill="${i===d?'#555':'#bbb'}" stroke="none"/>`).join('');}
  o+=bub(740,['CORSA?? achei que','tinham roubado kkkk'],false,2.6,2);
  o+=bub(940,['Mandando o PIX'],false,3.3,1);
  // notificação PIX
  let div=87400;
  if(t>3.9){const k=pop(t,3.9,.25); const y=360+(1-k)*-200; o+=`<g transform="translate(0 ${y-360})"><rect x="140" y="1150" width="800" height="200" rx="34" fill="#fff" stroke="#1b1420" stroke-width="8"/><circle cx="240" cy="1250" r="58" fill="#32bcad"/><path d="M240,1210 l40,40 l-40,40 l-40,-40 Z" fill="#fff" stroke="none"/><text x="320" y="1236" font-size="44" fill="#1b1420" stroke="none">PIX RECEBIDO</text><text x="320" y="1306" font-size="66" fill="#2f9e6e" stroke="none">R$ 1.500,00</text></g>`;
    div=lerpDiv(87400,85900,t,4.2); }
  o+=ono('PLIM!',840,1120,t,3.9,'#5fe08a',8,90);
  return o+hud2(div)+delta('−R$ 1.500','#2f9e6e',t,4.2);
};
// 7 · Festa… até o telefone tocar
SH.e2festa=(t,dur)=>{
  const ring=t>2.4;
  let o=interior({});
  o+=corsa({x:300,y:1460,s:.9,dusty:false});
  const b=ring?0:Math.abs(Math.sin(t*7))*40, r=ring?0:Math.sin(t*7)*8;
  o+=`<g transform="translate(0 ${-b}) rotate(${r} 600 1880)">${nando({x:600,y:1880,s:.72,face:ring?'choque':'contente',hold:null,pose:ring?'normal':'vitoria'})}</g>`;
  const tb=ring?0:Math.abs(Math.sin(t*7+1))*50; o+=`<g transform="translate(0 ${-tb})">${turbo({x:930,y:1890,s:.42,mood:'calmo'})}</g>`;
  if(!ring) for(let i=0;i<5;i++){const p=(t*.8+i*.2)%1; const x=200+i*170, y=1000-p*300; o+=`<g transform="translate(${x} ${y}) rotate(${Math.sin(t*4+i)*15})" opacity="${1-p}"><circle cx="0" cy="40" r="20" fill="#f6c744"/><path d="M18,40 V-30 Q40,-20 46,0" fill="none" stroke-width="8"/></g>`;}
  if(ring){ const sw=Math.sin(t*50)*12; o+=`<g transform="translate(290 800) rotate(${sw}) scale(${.8*pop(t,2.4)})"><rect x="-150" y="-260" width="300" height="520" rx="40" fill="#1d1d24"/><rect x="-126" y="-232" width="252" height="464" rx="24" fill="#c8402f" stroke-width="4"/><text x="0" y="-130" font-size="44" fill="#fff" text-anchor="middle" stroke="none">BANCO</text><text x="0" y="-80" font-size="44" fill="#fff" text-anchor="middle" stroke="none">NACIONAL</text><circle cx="0" cy="80" r="64" fill="#2f9e6e" stroke="#fff" stroke-width="6"/><path d="M-22,62 q10,-10 18,0 l-6,10 q8,14 20,20 l10,-6 q10,8 0,18 q-40,10 -42,-42 Z" fill="#fff" stroke-width="3"/></g>`;
    o+=ono('TRIIIM!',800,620,t,2.45,'#fff',8,100)+ono('TRIIIM!',330,470,t,2.9,'#fff',-8,90); }
  if(ring && t>3.2){ // grande plano da cara (estilo referência)
    let c=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
    for(let k=0;k<14;k++){const a=k*0.45+t*.8; c+=`<path d="M540,900 L${540+Math.cos(a)*1700},${900+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${900+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".1" stroke="none"/>`;}
    const z=2.7+ease((t-3.2)/1.6)*.25, j=Math.sin(t*60)*5;
    c+=`<g transform="translate(${j} 0)">${nando({x:540,y:900+(1740-815)*z,s:z,face:'choque',hold:null,pose:'normal'})}</g>`;
    c+=ono('BANCO?!',540,1500,t,3.35,'#fff',-6,170);
    return c+hud2(85900);
  }
  return cam(o,t,dur,1.0,1.04,600,1500)+hud2(85900);
};
// 8 · O banco: juros de atraso
SH.e2banco=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<14;k++){const a=k*0.45+t*.5; o+=`<path d="M540,1000 L${540+Math.cos(a)*1700},${1000+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${1000+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".08" stroke="none"/>`;}
  // ecrã de chamada
  o+=`<rect x="230" y="360" width="620" height="1100" rx="60" fill="#1d1d24"/><rect x="258" y="388" width="564" height="1044" rx="40" fill="#23283f" stroke="none"/>`;
  o+=`<circle cx="540" cy="560" r="90" fill="#fffaf0"/><text x="540" y="590" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">BN</text><text x="540" y="720" font-size="56" fill="#fff" text-anchor="middle" stroke="none">BANCO NACIONAL</text><text x="540" y="776" font-size="34" fill="#c9cde6" text-anchor="middle" stroke="none">em chamada · 0:${String(Math.floor(t*3)).padStart(2,'0')}</text>`;
  // música de espera
  for(let i=0;i<3;i++){const p=(t*.7+i/3)%1;o+=`<g transform="translate(${400+i*120} ${980-p*160})" opacity="${1-p}"><circle cx="0" cy="40" r="18" fill="#f6c744"/><path d="M16,40 V-26 L40,-16" fill="none" stroke="#f6c744" stroke-width="8"/></g>`;}
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(540 1220) scale(${k})"><rect x="-250" y="-64" width="500" height="118" rx="24" fill="#fff"/><text x="0" y="22" font-size="60" fill="#1b1420" text-anchor="middle" stroke="none">JUROS DE ATRASO</text></g>`;}
    o+=stamp(t,2.6,540,1470,640,220,'+R$ 2.000',150,'#fff',-10,'#1b1420');
  const div=t<2.8?85900:lerpDiv(85900,87900,t,2.8,.6);
  const sh=t>2.6&&t<3.2?Math.sin(t*90)*12:0;
  return `<g transform="translate(${sh} 0)">${o}</g>`+hud2(div,t,t>2.8&&t<3.6?8:0)+delta('+R$ 2.000','#e0483a',t,2.8);
};
// 9 · Cai com a cara na bancada
SH.e2queda=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="140" y="560" width="800" height="300" rx="10" fill="#c98a33"/>`; // painel de ferramentas
  for(let k=0;k<6;k++) o+=`<rect x="${190+k*125}" y="${600+(k%2)*60}" width="26" height="150" rx="10" fill="#c9d1d6"/>`;
  const fall=ease(clamp((t-.3)/.35,0,1));
  o+=`<g transform="translate(0 ${fall*150}) rotate(${fall*10} 540 1100)">${nando({x:540,y:1960,s:.95,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  // bancada à frente
  o+=`<rect x="40" y="1300" width="1000" height="70" fill="#8a5530"/><rect x="40" y="1370" width="1000" height="560" fill="#6e4325"/><path d="M40,1370 H1040" stroke-width="7"/>`;
  o+=`<rect x="120" y="1240" width="180" height="60" rx="8" fill="#e0483a"/><circle cx="880" cy="1270" r="34" fill="#c9d1d6"/>`;
  o+=ono('TUM!',780,1100,t,.62,'#fff',10,120);
  if(t>1.2){const tx=-200+ease((t-1.2)/.5)*480; o+=turbo({x:tx,y:1302,s:.42,mood:'calmo',flip:true});}
  return cam(o,t,dur,1.0,1.06,540,1300)+hud2(87900);
};
// 10 · Chega o Rubinho
SH.e2rubinho=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="0" y="0" width="1080" height="1920" fill="#fff" stroke="none" opacity="${t<.15?1-t/.15:0}"/>`;
  o+=nando({x:280,y:1920,s:.78,face:'choque',hold:null,pose:'normal'});
  const rx=760+600*(1-ease(t/.45));
  o+=rubinho({x:rx,y:1900,s:.8,face:'feliz',pose:'filma'});
  // linhas de velocidade
  if(t<.5) for(let i=0;i<5;i++) o+=`<path d="M${rx+220},${1200+i*90} h${200}" stroke="#fff" stroke-width="10" opacity="${1-t*2}"/>`;
  o+=tag('RUBINHO, 27',800,900,t,.5,780,1000);
  if(t>.9){const k=pop(t,.9);o+=`<g transform="translate(540 560) scale(${k}) rotate(-4)"><rect x="-460" y="-120" width="920" height="240" rx="60" fill="#fff"/><text x="0" y="-14" font-family="PM" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">MANO, A GENTE</text><text x="0" y="74" font-family="PM" font-size="66" fill="#c8402f" text-anchor="middle" stroke="none">VIRALIZA A OFICINA!</text><path d="M250,110 l60,110 l-140,-110" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.04)+hud2(87900);
};
// 11 · Votação: VIRALIZAR ✕ COBRAR
SH.e2votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#e08a2f" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 300) scale(${bk}) rotate(-3) translate(-540 -300)"><rect x="150" y="240" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="320" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  // VIRALIZAR: celular a filmar com corações
  o+=`<g transform="translate(${L} 0)"><text x="270" y="520" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">VIRALIZAR</text><text x="270" y="580" font-size="36" fill="#ecd9f7" text-anchor="middle" stroke="none">grátis… mas arriscado</text>`;
  o+=`<g transform="rotate(-8 270 820)"><rect x="180" y="650" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="670" width="148" height="290" rx="16" fill="#49f2ff" stroke-width="4"/><circle cx="230" cy="700" r="12" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="290" y="710" font-size="28" fill="#1b1420" stroke="none">REC</text></g>`;
  for(let i=0;i<3;i++){const p=(t*.9+i/3)%1;o+=`<g transform="translate(${150+i*120} ${960-p*260}) scale(${.8+p*.3})" opacity="${1-p}"><path d="M0,10 C-30,-20 -30,-50 0,-30 C30,-50 30,-20 0,10 Z" fill="#ff5a7a"/></g>`;}
  o+=`</g>`;
  // COBRAR: Seu Armando com a conta fiado
  o+=`<g transform="translate(${R} 0)"><text x="810" y="520" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">COBRAR</text><text x="810" y="580" font-size="36" fill="#fde9d2" text-anchor="middle" stroke="none">R$ 3.200… ou em ovos</text>`;
  o+=armando({x:860,y:1180,s:.46,face:'feliz'});
  o+=`<g transform="rotate(${6+Math.sin(t*3)*4} 700 760)"><rect x="600" y="650" width="210" height="140" rx="8" fill="#fffaf0"/><text x="705" y="705" font-family="PM" font-size="34" fill="#2b1d16" text-anchor="middle" stroke="none">FIADO</text><text x="705" y="760" font-family="PM" font-size="40" fill="#c8402f" text-anchor="middle" stroke="none">R$ 3.200</text></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 760) scale(${xp}) translate(-540 -760)"><circle cx="540" cy="760" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="790" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 1900)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud2(87900);
};
// ===== Episódio 2 — versão 2 (3 tentativas + reviravolta do Kléber) =====
// HUD com contador de clientes por baixo
function noHud(f){NOHUD=true;try{return f();}finally{NOHUD=false;}}
function hud3(div,cli=0,t=1,shake=0,cliPop=-1){
  const sx=shake?Math.sin(t*60)*shake:0;
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `<g transform="translate(${sx} 0)">${hud(D2,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g></g>`;
}
function tentativa(n,t,col='#f6c744'){ const k=pop(t,0,.22);
  return `<g transform="translate(540 330) scale(${k}) rotate(-3)"><rect x="-300" y="-62" width="600" height="112" rx="18" fill="${col}" stroke="#1b1420" stroke-width="10"/><text x="0" y="24" font-size="78" fill="#1b1420" text-anchor="middle" stroke="none">${n}ª TENTATIVA</text></g>`; }
function raios(col,t,cy=960,op=.1){let o=`<rect width="1080" height="1920" fill="${col}" stroke="none"/>`;for(let k=0;k<14;k++){const a=k*0.45+t*.6;o+=`<path d="M540,${cy} L${540+Math.cos(a)*1700},${cy+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${cy+Math.sin(a+0.22)*1700} Z" fill="#000" opacity="${op}" stroke="none"/>`;}return o;}
// grande plano da cara do Nando
function caraNando(t,face,bg,txt,t0=.1,col='#fff',z0=2.7){
  let c=raios(bg,t,900);
  const z=z0+ease(t/2)*.2, j=face==='choque'?Math.sin(t*60)*4:0;
  c+=`<g transform="translate(${j} 0)">${nando({x:540,y:900+(1740-815)*z,s:z,face,hold:null,pose:'normal'})}</g>`;
  if(txt) c+=ono(txt,540,1500,t,t0,col,-6,170);
  return c;
}

// 1 · Abertura — grande plano + VOCÊS ESCOLHERAM
SH.b2abre=(t,dur)=>{
  let o=caraNando(t,'contente','#2f9e6e','',0,'#fff',2.5);
  if(t>.05){const k=pop(t,.05,.2);o+=`<g transform="translate(540 1420) scale(${k}) rotate(-4)"><rect x="-440" y="-150" width="880" height="300" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-40" font-size="76" fill="#fff" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text><text x="0" y="80" font-size="110" fill="#f6c744" text-anchor="middle" stroke="none">VENDER AS PEÇAS!</text></g>`;}
  return o+hud3(87400,0);
};
// 2 · 1.ª tentativa — Marketplace: "aceita 50?"
SH.b2market=(t,dur)=>{
  if(t>3.6) return caraNando(t-3.6,'choque','#c8402f','50 REAIS?!',.05)+hud3(87400,0);
  let o=raios('#2f6fb3',t,1000,.08);
  o+=`<rect x="150" y="440" width="780" height="1400" rx="70" fill="#1d1d24"/><rect x="180" y="470" width="720" height="1340" rx="48" fill="#f0f2f5" stroke="none"/>`;
  o+=`<path d="M180,520 Q180,470 228,470 H852 Q900,470 900,520 V600 H180 Z" fill="#1877f2" stroke="none"/><text x="540" y="555" font-size="42" fill="#fff" text-anchor="middle" stroke="none">MARKETPLACE</text>`;
  // anúncio
  o+=`<rect x="210" y="630" width="660" height="420" rx="20" fill="#fff" stroke="#c9ced6" stroke-width="3"/>`;
  o+=`<g transform="translate(540 870) scale(.62)">${corsa({x:0,y:0,s:1,dusty:true})}</g>`;
  o+=`<text x="240" y="1110" font-size="54" fill="#1b1420" stroke="none">PEÇAS DE CORSA</text><text x="240" y="1180" font-size="66" fill="#2f9e6e" stroke="none">R$ 3.000</text><text x="240" y="1230" font-size="30" fill="#7a808a" stroke="none">Tudo original · retirar no local</text>`;
  // mensagem
  if(t>1.6){const k=pop(t,1.6,.2);o+=`<g transform="translate(220 1300) scale(${k}) translate(-220 -1300)"><circle cx="250" cy="1360" r="36" fill="#c79a5b"/><rect x="300" y="1300" width="560" height="130" rx="24" fill="#fff" stroke="#c9ced6" stroke-width="3"/><text x="330" y="1350" font-size="30" fill="#7a808a" stroke="none">Comprador</text><text x="330" y="1405" font-family="PM" font-size="44" fill="#1b1420" stroke="none">aceita 50 reais em tudo?</text></g>`;}
  o+=ono('PLIM!',830,1270,t,1.6,'#5fe08a',8,80);
  return o+tentativa(1,t)+hud3(87400,0);
};
// 3 · 2.ª tentativa — ferro-velho: R$ 80 pelo carro inteiro
SH.b2ferro=(t,dur)=>{
  if(t>3.2) return caraNando(t-3.2,'choque','#7a3f9e','OITENTA?!',.05,'#f6c744')+hud3(87400,0);
  let o=`<rect width="1080" height="1920" fill="#f1c27d" stroke="none"/><circle cx="880" cy="560" r="80" fill="#fff2b0" stroke="none"/>`;
  // pilhas de sucata
  o+=`<path d="M0,1200 L120,980 L260,1060 L380,900 L520,1100 L640,960 L780,1080 L900,940 L1080,1120 V1500 H0 Z" fill="#8a7f74"/>`;
  for(const [x,y,r] of [[150,1150,60],[330,1210,50],[700,1180,70],[930,1220,55]]) o+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#2a2522"/><circle cx="${x}" cy="${y}" r="${r*.45}" fill="#55504b" stroke-width="5"/>`;
  o+=`<rect x="0" y="1500" width="1080" height="420" fill="#a68c6d" stroke="none"/><path d="M0,1500 H1080" stroke-width="7"/>`;
  o+=`<rect x="200" y="640" width="680" height="170" rx="12" fill="#5a3a22"/><text x="540" y="755" font-size="110" fill="#f6c744" text-anchor="middle" stroke="none">FERRO-VELHO</text><path d="M300,810 V900 M780,810 V900" stroke-width="12"/>`;
  o+=corsa({x:540,y:1640,s:1.05,dusty:true});
  // oferta
  if(t>1.2) o+=stamp(t,1.2,540,1160,780,260,'R$ 80',170,'#c8402f',-8,'#fffaf0');
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(540 1340) scale(${k})"><rect x="-300" y="-46" width="600" height="84" rx="18" fill="#1b1420"/><text x="0" y="18" font-size="50" fill="#fff" text-anchor="middle" stroke="none">PELO CARRO INTEIRO</text></g>`;}
  return o+tentativa(2,t,'#5fe08a')+hud3(87400,0);
};
// 4 · 3.ª tentativa — arrancar as peças… e a etiqueta
SH.b2etiqueta=(t,dur)=>{
  if(t>4.6) return caraNando(t-4.6,'choque','#c8402f','NÃO É MEU?!',.05)+hud3(87400,0);
  let o=noHud(()=>SH.e2capo(Math.min(t,3.5),4));
  if(t>2.2){const k=pop(t,2.2,.25),sw=Math.sin(t*4)*5;o+=`<rect width="1080" height="1920" fill="#000" opacity="${.45*ease((t-2.2)/.3)}" stroke="none"/><g transform="translate(540 980) scale(${1.6*k}) rotate(${-6+sw})"><path d="M0,-130 V-70" stroke-width="5"/><circle cx="0" cy="-134" r="8" fill="#999"/><rect x="-220" y="-70" width="440" height="190" rx="14" fill="#fffaf0"/><text x="0" y="0" font-size="44" fill="#2b1d16" text-anchor="middle" stroke="none">DONA DO CARRO:</text><text x="0" y="86" font-family="PM" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">DONA CIDA</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud3(87400,0);
};
// 5 · Turbo com a peça → VRUUUM
SH.b2turbo=(t,dur)=>{ const hud=hud3(87400,1>2?1:0);
  if(t<2.6) return noHud(()=>SH.e2turbo(t+.6,4)).replace('O DONO VAI PAGAR?','A DONA VAI PAGAR?')+hud;
  return noHud(()=>SH.e2motor(t-2.6+.5,5))+hud; };
// 6 · WhatsApp + PIX + 1.º cliente
SH.b2whats=(t,dur)=>{
  let s=noHud(()=>SH.e2whats(t,dur));
  const div=t>4.2?lerpDiv(87400,85900,t,4.2):87400;
  return s+hud3(div,t>4.6?1:0,t,0,4.6)+delta('−R$ 1.500','#2f9e6e',t,4.2)+(t>4.6?ono('+1 CLIENTE!',540,1560,t,4.6,'#5fe08a',-4,110):'');
};
// 7 · O banco liga → +R$ 2.000 + GLUP
SH.b2banco=(t,dur)=>{
  if(t>4.3) return caraNando(t-4.3,'preocupado','#c8402f','GLUP!',.05)+hud3(87900,1);
  let s=noHud(()=>SH.e2banco(t,dur));
  const div=t<2.8?85900:lerpDiv(85900,87900,t,2.8,.6);
  return s+hud3(div,1,t,t>2.8&&t<3.6?8:0)+delta('+R$ 2.000','#e0483a',t,2.8);
};
// 8 · Reviravolta: o Kléber
SH.b2kleber=(t,dur)=>{
  if(t>4.6){ let c=raios('#1f6fd6',t,900,.12); c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'raiva',pose:'normal'});
    const k=pop(t-4.6,.05); c+=`<g transform="translate(540 1500) scale(${k}) rotate(-4)"><rect x="-470" y="-130" width="940" height="260" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-22" font-size="66" fill="#1b1420" text-anchor="middle" stroke="none">A DONA CIDA É MÃE</text><text x="0" y="78" font-size="78" fill="#c8402f" text-anchor="middle" stroke="none">DO KLÉBER!</text></g>`;
    return c+hud3(87900,1); }
  let o=interior({});
  o+=corsa({x:250,y:1460,s:.8,dusty:false});
  o+=nando({x:330,y:1920,s:.74,face:t>.6?'choque':'normal',hold:null,pose:'normal'});
  const kx=800+500*(1-ease(t/.45));
  o+=kleber({x:kx,y:1900,s:.74,face:'raiva',pose:'aponta',flip:true});
  if(t<.5) for(let i=0;i<5;i++) o+=`<path d="M${kx+220},${1200+i*90} h200" stroke="#fff" stroke-width="10" opacity="${1-t*2}"/>`;
  o+=tag('KLÉBER · SPEEDFIX',780,860,t,.5,790,960);
  if(t>1.0){const k=pop(t,1.0);o+=`<g transform="translate(540 560) scale(${k}) rotate(-3)"><rect x="-480" y="-150" width="960" height="300" rx="60" fill="#fff"/><text x="0" y="-50" font-family="PM" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊ TAVA COM O CARRO</text><text x="0" y="30" font-family="PM" font-size="60" fill="#c8402f" text-anchor="middle" stroke="none">DA MINHA MÃE</text><text x="0" y="110" font-family="PM" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">DESDE 2019?!</text><path d="M300,140 l40,110 l-150,-110" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.05)+hud3(87900,1);
};
// 9 · Votação: PEDIR DESCULPA ✕ ENFRENTAR
SH.b2votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f9e6e" stroke="none"/><rect x="540" width="540" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 330) scale(${bk}) rotate(-3) translate(-540 -330)"><rect x="150" y="270" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="350" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="80" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">DESCULPA</text><text x="270" y="596" font-size="34" fill="#d4f5e2" text-anchor="middle" stroke="none">perde o orgulho</text>`;
  const wv=Math.sin(t*5)*8; o+=`<g transform="rotate(${wv} 200 1000)"><path d="M200,1000 V660" stroke-width="16"/><path d="M200,1000 V660" stroke="#b97a45" stroke-width="8"/><path d="M206,670 Q300,640 380,680 Q300,720 380,770 Q300,740 206,770 Z" fill="#fff"/></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="80" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">ENFRENTAR</text><text x="810" y="596" font-size="34" fill="#fde2dd" text-anchor="middle" stroke="none">arrisca um processo</text>`;
  const pb=Math.sin(t*8)*14; o+=`<g transform="translate(${830+pb} 820) rotate(-20)"><path d="M-90,-60 Q-100,-120 -40,-120 H60 Q110,-120 110,-60 V40 Q110,90 60,90 H-50 Q-100,90 -96,40 Z" fill="#e0483a"/><path d="M-60,-110 V-30 M-10,-118 V-30 M40,-118 V-30" stroke-width="6"/><rect x="-80" y="90" width="150" height="70" rx="10" fill="#fff"/></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 780) scale(${xp}) translate(-540 -780)"><circle cx="540" cy="780" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="810" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud3(87900,1);
};
// ===== Episódio 3 (Dia 3): resultado com comentários em 3D + progresso =====
const D3=28;
function hud4(div,cli,t=1,shake=0,cliPop=-1){
  const sx=shake?Math.sin(t*60)*shake:0; const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `<g transform="translate(${sx} 0)">${hud(D3,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g></g>`;
}
function passo(n,txt,t,col='#f6c744'){const k=pop(t,0,.22);
  return `<g transform="translate(540 330) scale(${k}) rotate(-3)"><rect x="-380" y="-62" width="760" height="112" rx="18" fill="${col}" stroke="#1b1420" stroke-width="10"/><text x="0" y="24" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">PASSO ${n}: ${txt}</text></g>`;}
// cartão de comentário "3D": entra a rodar sobre o eixo vertical, com sombra e flutuação
function cartao3d(x,y,user,txt,col,t,t0,{w=820,like=true,rot=-4,emoji=''}={}){
  if(t<t0) return '';
  const p=clamp((t-t0)/.45,0,1), e=ease(p);
  const ang=(1-e)*80, sx=Math.max(.05,Math.cos(ang*Math.PI/180)), sk=(1-e)*-18;
  const bob=Math.sin((t-t0)*2.4)*8, h=170, z=.86+.14*e;
  const ini=user.replace(/[^a-z]/i,'').charAt(0).toUpperCase();
  let c=`<g transform="translate(${x} ${y+bob}) rotate(${rot*e}) scale(${sx*z} ${z}) skewY(${sk})">`;
  c+=`<rect x="${-w/2+18}" y="${-h/2+22}" width="${w}" height="${h}" rx="30" fill="#000" opacity=".35" stroke="none"/>`;
  c+=`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="30" fill="#24252e" stroke="#3d3f4d" stroke-width="5"/>`;
  c+=`<circle cx="${-w/2+80}" cy="0" r="50" fill="${col}" stroke="#fff" stroke-width="5"/><text x="${-w/2+80}" y="22" font-size="60" fill="#fff" text-anchor="middle" stroke="none">${ini}</text>`;
  c+=`<text x="${-w/2+155}" y="-22" font-family="Arial, sans-serif" font-weight="700" font-size="38" fill="#fff" stroke="none">${user}</text>`;
  c+=`<text x="${-w/2+155}" y="44" font-family="Arial, sans-serif" font-size="50" fill="#f2f2f2" stroke="none">${txt}</text>`;
  if(like) c+=`<path d="M${w/2-70},20 C${w/2-100},-6 ${w/2-100},-36 ${w/2-70},-18 C${w/2-40},-36 ${w/2-40},-6 ${w/2-70},20 Z" fill="#ff3b5c" stroke="none"/>`;
  if(emoji) c+=emoji;
  return c+`</g>`;
}
function fundoEscuro(t,col='#151626'){let o=`<rect width="1080" height="1920" fill="${col}" stroke="none"/>`;for(let k=0;k<14;k++){const a=k*0.45+t*.4;o+=`<path d="M540,1000 L${540+Math.cos(a)*1700},${1000+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${1000+Math.sin(a+0.22)*1700} Z" fill="#fff" opacity=".04" stroke="none"/>`;}return o;}

// 1 · Resultado: 75% DESCULPA + 3 comentários
SH.c3votos=(t,dur)=>{
  let o=fundoEscuro(t);
  const k=pop(t,.05,.2); o+=`<g transform="translate(540 380) scale(${k}) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="84" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text></g>`;
  // barra de percentagem
  const pc=Math.round(75*ease((t-.3)/.9)); const bw=900;
  o+=`<rect x="90" y="500" width="${bw}" height="120" rx="60" fill="#c8402f" stroke="#1b1420" stroke-width="8"/><rect x="90" y="500" width="${Math.max(120,bw*pc/100)}" height="120" rx="60" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/>`;
  o+=`<text x="130" y="585" font-size="72" fill="#fff" stroke="none">DESCULPA ${pc}%</text><text x="960" y="585" font-size="52" fill="#fff" text-anchor="end" stroke="none">${100-pc}%</text>`;
  o+=cartao3d(540,830,'baxin_228','Desculpa','#2f6fb3',t,.9,{rot:-4});
  o+=cartao3d(540,1050,'_ricard0_silva_','Desculpa','#7a3f9e',t,1.5,{rot:3});
  o+=cartao3d(540,1270,'pedroca__244','Desculpa','#e08a2f',t,2.1,{rot:-3});
  return o+hud4(87900,1);
};
// 2 · "teve um fortão que queria bater nele kkk"
SH.c3fortao=(t,dur)=>{
  if(t>2.6) return caraNando(t-2.6,'choque','#c8402f','EU HEIN?!',.05)+hud4(87900,1);
  let o=fundoEscuro(t,'#1e1424');
  const k=pop(t,.05,.2); o+=`<g transform="translate(540 470) scale(${k}) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">ATÉ TEVE UM FORTÃO</text><text x="0" y="74" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">QUE QUERIA BATER NELE</text></g>`;
  const glove=`<g transform="translate(330 -20) rotate(${-20+Math.sin(t*14)*14}) scale(.7)"><path d="M-90,-60 Q-100,-120 -40,-120 H60 Q110,-120 110,-60 V40 Q110,90 60,90 H-50 Q-100,90 -96,40 Z" fill="#e0483a" stroke="#1b1420" stroke-width="8"/><rect x="-80" y="90" width="150" height="60" rx="10" fill="#fff" stroke="#1b1420" stroke-width="8"/></g>`;
  o+=cartao3d(540,900,'vinicius_mxf_140cc','Bste','#3a3f45',t,.6,{rot:4,emoji:glove});
  o+=ono('KKKKK',540,1180,t,1.2,'#f6c744',-6,140);
  return o+hud4(87900,1);
};
// 3 · Passo 1: atravessar a rua e pedir desculpa — o Kléber grava
SH.c3loja=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="420" width="1040" height="1100" fill="#eef3f7"/><rect x="0" y="400" width="1080" height="40" fill="#1f6fd6"/><rect x="80" y="480" width="920" height="200" rx="30" fill="#10233c"/><g filter="url(#glow)" stroke="none"><text x="540" y="630" font-size="140" fill="#49f2ff" text-anchor="middle">SPEEDFIX</text></g>`;
  for(let k=0;k<3;k++){const x=60+k*330; o+=`<rect x="${x}" y="800" width="300" height="720" fill="#7fd0f0"/>`;}
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="#3d3a42" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/>`;
  // clientes a olhar
  for(const [x,c] of [[150,'#e0483a'],[930,'#7a3f9e']]) o+=`<g><circle cx="${x}" cy="1180" r="50" fill="#e2b48c"/><rect x="${x-60}" y="1230" width="120" height="230" rx="40" fill="${c}"/><circle cx="${x-14}" cy="1176" r="7" fill="#2b1d16" stroke="none"/><circle cx="${x+14}" cy="1176" r="7" fill="#2b1d16" stroke="none"/></g>`;
  const walk=ease(clamp(t/1.6,0,1)); const nx=-200+walk*520;
  o+=`<g transform="translate(0 ${Math.abs(Math.sin(t*9))*10*(1-walk)})">${nando({x:nx,y:1900,s:.66,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  o+=kleber({x:800,y:1900,s:.66,face:'sorriso',pose:'normal',flip:true});
  // celular a gravar
  if(t>1.8){const k=pop(t,1.8);o+=`<g transform="translate(690 1170) scale(${k}) rotate(-10)"><rect x="-60" y="-100" width="120" height="200" rx="16" fill="#1d1d24"/><rect x="-48" y="-88" width="96" height="176" rx="8" fill="#49f2ff" stroke-width="4"/><circle cx="-24" cy="-64" r="10" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/></g>`;
    o+=ono('REC ●',820,1000,t,1.9,'#e0483a',6,80);}
  return cam(o,t,dur,1.0,1.05)+passo(1,'PEDIR DESCULPA',t)+hud4(87900,1);
};
// 4 · Humilhação: "mais alto!"
SH.c3humilha=(t,dur)=>{
  let o=caraNando(t,'preocupado','#7a3f9e','',0,'#fff',2.6);
  // moldura de câmera a gravar
  o+=`<rect x="40" y="300" width="1000" height="1560" rx="40" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="80 1400" opacity=".9"/><circle cx="110" cy="370" r="20" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="145" y="388" font-size="48" fill="#fff" stroke="none">REC</text>`;
  if(t>.4){const k=pop(t,.4);o+=`<g transform="translate(540 1520) scale(${k})"><rect x="-260" y="-70" width="520" height="130" rx="65" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="24" font-family="PM" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">d-desculpa…</text></g>`;}
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(760 560) scale(${k}) rotate(6)"><rect x="-260" y="-90" width="520" height="170" rx="50" fill="#1f6fd6" stroke="#1b1420" stroke-width="8"/><text x="0" y="22" font-family="PM" font-size="72" fill="#fff" text-anchor="middle" stroke="none">MAIS ALTO! KKK</text></g>`;}
  return o+hud4(87900,1);
};
// 5 · Postou: o vídeo bombou
SH.c3post=(t,dur)=>{
  let o=fundoEscuro(t,'#1f6fd6');
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="250" cy="480" r="38" fill="#1f6fd6"/><path d="M244,462 l-10,18 h10 l-6,18 l18,-24 h-10 l8,-12 Z" fill="#ffe14a" stroke="none"/><text x="305" y="495" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#1b1420" stroke="none">kleber.speedfix</text>`;
  // vídeo dentro do post
  o+=`<rect x="180" y="540" width="720" height="700" fill="#7a3f9e" stroke="none"/>`;
  o+=`<g transform="translate(540 1240)">${nando({x:0,y:0,s:.55,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  o+=`<text x="210" y="1310" font-family="Arial, sans-serif" font-size="34" fill="#1b1420" stroke="none">Olha o "mecânico" que esqueceu o</text><text x="210" y="1356" font-family="Arial, sans-serif" font-size="34" fill="#1b1420" stroke="none">carro da minha mãe 7 ANOS kkkkk</text>`;
  const v=Math.round(12400*ease((t-.6)/2.6)); o+=`<rect x="210" y="1400" width="660" height="110" rx="20" fill="#f0f2f5"/><text x="240" y="1475" font-size="60" fill="#1b1420" stroke="none">${v.toLocaleString('pt-BR')} views</text>`;
  if(t>3.2) o+=ono('BOMBOU!',540,1650,t,3.2,'#f6c744',-6,130);
  return o+hud4(87900,1);
};
// 6 · Os comentários viraram contra o Kléber
SH.c3coments=(t,dur)=>{
  let o=fundoEscuro(t,'#151626');
  const k=pop(t,.05); o+=`<g transform="translate(540 380) scale(${k}) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="76" fill="#1b1420" text-anchor="middle" stroke="none">OS COMENTÁRIOS…</text></g>`;
  o+=cartao3d(540,640,'ze.do.gas','esse cara é HONESTO','#2f9e6e',t,.3,{rot:-3,w:900});
  o+=cartao3d(540,860,'tati_lima','consertou em 20 min??','#e08a2f',t,1.0,{rot:3,w:900});
  o+=cartao3d(540,1080,'cida.oliveira','Ele é um ANJO!!','#c8402f',t,1.9,{rot:-2,w:900});
  if(t>2.5){const k2=pop(t,2.5);o+=`<g transform="translate(830 1000) scale(${k2}) rotate(10)"><rect x="-150" y="-36" width="300" height="70" rx="35" fill="#f6c744" stroke="#1b1420" stroke-width="6"/><text x="0" y="20" font-size="40" fill="#1b1420" text-anchor="middle" stroke="none">A DONA CIDA!</text></g>`;}
  o+=cartao3d(540,1300,'rafa_motos','humilhar trabalhador? feio','#3a3f45',t,2.9,{rot:3,w:900});
  return o+hud4(87900,1);
};
// 7 · Passo 2: fila na porta — clientes e dinheiro
SH.c3fila=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="380" width="1040" height="760" fill="#e9a640"/><rect x="56" y="420" width="968" height="190" rx="10" fill="#c8402f"/><text x="540" y="560" font-size="130" fill="#f6c744" stroke="#5a1a12" stroke-width="10" paint-order="stroke fill" text-anchor="middle">MECÂNICA TIO ZÉ</text><rect x="240" y="660" width="600" height="480" fill="#3b3036"/>`;
  o+=`<rect x="0" y="1140" width="1080" height="780" fill="#3d3a42" stroke="none"/><path d="M0,1140 H1080" stroke-width="8"/>`;
  const items=[['ÓLEO',90,'#f2c230'],['FREIO',220,'#ef4f6b'],['BATERIA',380,'#5fd17c'],['LÂMPADA',40,'#4cc3f0'],['ALINHAMENTO',120,'#c79a5b']];
  const car=(x,y,c)=>`<g><path d="M${x},${y} v-60 q0,-24 28,-28 l36,-4 q24,-46 70,-50 h78 q40,4 60,50 l24,4 q24,4 24,28 v60 Z" fill="${c}"/><path d="M${x+74},${y-88} q20,-34 56,-38 h34 v38 Z M${x+180},${y-88} v-38 h24 q28,4 46,38 Z" fill="#bfe3ea" stroke-width="5"/><circle cx="${x+70}" cy="${y+2}" r="26" fill="#2a2522" stroke-width="6"/><circle cx="${x+230}" cy="${y+2}" r="26" fill="#2a2522" stroke-width="6"/></g>`;
  let cli=1, ganho=0;
  const POS=[[40,1460],[390,1460],[740,1460],[210,1760],[570,1760]];
  items.forEach(([n,v,c],i)=>{const t0=.4+i*.8; const row=i%2, [x,y]=POS[i];
    const dx=(1-ease(clamp((t-t0+.6)/.5,0,1)))*1200;
    o+=`<g transform="translate(${dx} 0)">${car(x,y,c)}</g>`;
    if(t>t0){cli++;ganho+=v;const k=pop(t,t0);o+=`<g transform="translate(${x+150} ${y-160}) scale(${k}) rotate(${row?5:-5})"><rect x="-160" y="-40" width="320" height="80" rx="16" fill="#fff" stroke="#1b1420" stroke-width="6"/><text x="0" y="16" font-size="44" fill="#2f9e6e" text-anchor="middle" stroke="none">${n} R$ ${v}</text></g>`;}
  });
  const div=87900-ganho;
  if(t<2.6) o+=ono('FILA!',540,820,t,.2,'#fff',-6,130);
  if(t>4.4) o+=ono('+R$ 850',540,820,t,4.4,'#5fe08a',-6,160);
  return o+passo(2,'CLIENTES',t,'#5fe08a')+hud4(div,cli,t,0,.4);
};
// 8 · O Kléber vê tudo
SH.c3kleber=(t,dur)=>{
  let c=raios('#10233c',t,900,.14); c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'raiva',pose:'normal'});
  // tablet a rachar
  if(t>1.4){c+=`<path d="M200,1500 l60,-40 l-20,-30 l70,-50 M260,1460 l40,30" stroke="#fff" stroke-width="8" fill="none"/>`; c+=ono('CRACK!',300,1380,t,1.4,'#fff',-8,110);}
  if(t>.4){const k=pop(t,.4);c+=`<g transform="translate(540 1560) scale(${k}) rotate(-3)"><rect x="-470" y="-90" width="940" height="170" rx="30" fill="#1b1420"/><text x="0" y="30" font-family="PM" font-size="62" fill="#fff" text-anchor="middle" stroke="none">ISSO NÃO VAI FICAR ASSIM.</text></g>`;}
  return c+hud4(87050,6);
};
// 9 · Rubinho + votação GRAVAR ✕ TRABALHAR
SH.c3votacao=(t,dur)=>{
  if(t<2.4){ let o=interior({}); o+=nando({x:300,y:1920,s:.74,face:'contente',hold:null,pose:'normal'});
    const rx=780+500*(1-ease(t/.4)); o+=rubinho({x:rx,y:1900,s:.78,face:'feliz',pose:'filma'});
    if(t>.5){const k=pop(t,.5);o+=`<g transform="translate(540 560) scale(${k}) rotate(-3)"><rect x="-470" y="-130" width="940" height="260" rx="60" fill="#fff"/><text x="0" y="-20" font-family="PM" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">MANO, VOCÊ VIRALIZOU!</text><text x="0" y="70" font-family="PM" font-size="64" fill="#c8402f" text-anchor="middle" stroke="none">BORA GRAVAR MAIS?</text><path d="M260,120 l60,110 l-150,-110" fill="#fff"/></g>`;}
    return cam(o,t,2.4,1,1.04)+hud4(87050,6); }
  t-=2.4;
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#2f6fb3" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.05); o+=`<g transform="translate(540 330) scale(${bk}) rotate(-3) translate(-540 -330)"><rect x="150" y="270" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="350" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.15)/.35)), R=600*(1-ease((t-.35)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">GRAVAR</text><text x="270" y="596" font-size="34" fill="#ecd9f7" text-anchor="middle" stroke="none">pode bombar… ou virar meme</text>`;
  o+=`<g transform="rotate(-8 270 820)"><rect x="180" y="650" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="670" width="148" height="290" rx="16" fill="#49f2ff" stroke-width="4"/><circle cx="230" cy="700" r="12" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">TRABALHAR</text><text x="810" y="596" font-size="34" fill="#d6e6fb" text-anchor="middle" stroke="none">dinheiro certo, mas devagar</text>`;
  o+=`<g transform="rotate(${-20+Math.sin(t*5)*10} 820 900)"><rect x="800" y="700" width="34" height="260" rx="10" fill="#c9d1d6"/><path d="M790,700 q-14,-60 34,-74 q48,14 34,74 l-18,-12 v-24 h-32 v24 Z" fill="#c9d1d6"/></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 780) scale(${xp}) translate(-540 -780)"><circle cx="540" cy="780" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="810" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'normal',hold:null,pose:'cruzados'})}</g>`;
  return o+hud4(87050,6);
};
// ===== Story: "Episódio 3 no ar" — Nando a falar e a apontar para o link =====
// janelas de fala (s) para a boca mexer; ajusta aos tempos da voz
const FALA=[[0.0,1.89],[2.08,3.28],[3.63,6.18],[6.46,8.86],[9.10,11.2]];
SH.story3=(t,dur)=>{
  let o=raios('#c8402f',t,1100,.1);
  // cartão do episódio
  const k=pop(t,.05,.25);
  o+=`<g transform="translate(540 330) scale(${k}) rotate(-3)"><rect x="-420" y="-150" width="840" height="290" rx="34" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-38" font-size="70" fill="#fff" text-anchor="middle" stroke="none">30 DIAS PRA SALVAR A OFICINA</text><text x="0" y="90" font-size="140" fill="#f6c744" text-anchor="middle" stroke="none">EP. 3 NO AR!</text></g>`;
  // zona do link (espaço livre para o sticker) + seta
  const b=Math.sin(t*6)*14;
  o+=`<text x="540" y="640" font-size="80" fill="#fff" stroke="#1b1420" stroke-width="16" paint-order="stroke fill" text-anchor="middle">CLICA NO LINK</text>`;
  o+=`<rect x="190" y="830" width="700" height="230" rx="40" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="30 22" opacity=".8"/>`;
  o+=`<g transform="translate(540 ${700+b})"><path d="M-40,0 H40 V40 H80 L0,110 L-80,40 H-40 Z" fill="#f6c744" stroke="#1b1420" stroke-width="8"/></g>`;
  // Nando a falar
  const fala=FALA.some(([a,c])=>t>=a&&t<=c); const aberta=fala&&Math.floor(t*8)%2===0;
  const nod=fala?Math.sin(t*9)*2:0;
  const face = t>9.1 ? (aberta?'contente':'normal') : (aberta?'contente':'normal');
  o+=`<g transform="rotate(${nod} 430 2150)">${nando({x:430,y:2150,s:.9,face,hold:null,pose:t>2.0&&t<3.6?'aponta':'normal'})}</g>`;
  // selos que aparecem com a fala
  if(t>3.63){const k2=pop(t,3.63);o+=`<g transform="translate(790 1330) scale(${k2}) rotate(6)"><rect x="-230" y="-80" width="460" height="160" rx="24" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-12" font-size="46" fill="#1b1420" text-anchor="middle" stroke="none">SEU COMENTÁRIO</text><text x="0" y="50" font-size="50" fill="#c8402f" text-anchor="middle" stroke="none">PODE APARECER!</text></g>`;}
  if(t>9.43){const k3=pop(t,9.43);o+=`<g transform="translate(790 1560) scale(${k3}) rotate(-5)"><rect x="-240" y="-70" width="480" height="140" rx="70" fill="#5fe08a" stroke="#1b1420" stroke-width="8"/><text x="0" y="26" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">VOTA AÍ!</text></g>`;}
  return o;
};

// ===== Story do episódio 4 =====
const FALA4=[[0.0,2.05],[2.30,3.40],[3.99,9.18],[9.43,9.90],[10.15,11.6]];
SH.story4=(t,dur)=>{
  let o=raios('#7a3f9e',t,1100,.1);
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-420" y="-150" width="840" height="290" rx="34" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-38" font-size="70" fill="#fff" text-anchor="middle" stroke="none">30 DIAS PRA SALVAR A OFICINA</text><text x="0" y="90" font-size="140" fill="#f6c744" text-anchor="middle" stroke="none">EP. 4 NO AR!</text></g>`;
  const b=Math.sin(t*6)*14;
  o+=`<text x="540" y="640" font-size="80" fill="#fff" stroke="#1b1420" stroke-width="16" paint-order="stroke fill" text-anchor="middle">CLICA NO LINK</text>`;
  o+=`<g transform="translate(540 ${700+b})"><path d="M-40,0 H40 V40 H80 L0,110 L-80,40 H-40 Z" fill="#f6c744" stroke="#1b1420" stroke-width="8"/></g>`;
  o+=`<rect x="190" y="830" width="700" height="230" rx="40" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="30 22" opacity=".8"/>`;
  // lona ao fundo, a espreitar
  o+=`<g transform="translate(1300 0) scale(-1 1)">${lonaCarro(560,1720,.75,true,t)}</g>`;
  const fala=FALA4.some(([a,c])=>t>=a&&t<=c); const aberta=fala&&Math.floor(t*8)%2===0; const nod=fala?Math.sin(t*9)*2:0;
  o+=`<g transform="rotate(${nod} 360 2150)">${nando({x:360,y:2150,s:.9,face:aberta?'contente':'normal',hold:null,pose:t>2.2&&t<3.7?'aponta':'normal'})}</g>`;
  if(t>4.0){const k=pop(t,4.0);o+=`<g transform="translate(790 1400) scale(${k}) rotate(6)"><rect x="-230" y="-80" width="460" height="160" rx="24" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-12" font-size="46" fill="#1b1420" text-anchor="middle" stroke="none">O QUE TEM</text><text x="0" y="50" font-size="50" fill="#c8402f" text-anchor="middle" stroke="none">DEBAIXO DA LONA?</text></g>`; o+=ono("?",960,1600,t,4.2,'#fff',8,130);}
  if(t>9.43){const k3=pop(t,9.43);o+=`<g transform="translate(540 1180) scale(${k3}) rotate(-5)"><rect x="-300" y="-70" width="600" height="140" rx="70" fill="#5fe08a" stroke="#1b1420" stroke-width="8"/><text x="0" y="24" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">INFLUENCER OU LONA?</text></g>`;}
  return o;
};

// ===== Story do episódio 6 (sem voz: só texto + música) =====
SH.story6=(t,dur)=>{
  let o=raios('#c8402f',t,1100,.1);
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-420" y="-150" width="840" height="290" rx="34" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-38" font-size="70" fill="#fff" text-anchor="middle" stroke="none">30 DIAS PRA SALVAR A OFICINA</text><text x="0" y="90" font-size="140" fill="#f6c744" text-anchor="middle" stroke="none">EP. 6 NO AR!</text></g>`;
  const b=Math.sin(t*6)*14;
  o+=`<text x="540" y="640" font-size="80" fill="#fff" stroke="#1b1420" stroke-width="16" paint-order="stroke fill" text-anchor="middle">CLICA NO LINK</text>`;
  o+=`<g transform="translate(540 ${700+b})"><path d="M-40,0 H40 V40 H80 L0,110 L-80,40 H-40 Z" fill="#f6c744" stroke="#1b1420" stroke-width="8"/></g>`;
  o+=`<rect x="190" y="830" width="700" height="230" rx="40" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="30 22" opacity=".8"/>`;
  o+=`<g transform="translate(1300 0) scale(-1 1)">${lonaCarro(560,1720,.75,true,t)}</g>`;
  const nod=Math.sin(t*3)*2;
  o+=`<g transform="rotate(${nod} 360 2150)">${nando({x:360,y:2150,s:.9,face:t>3?'choque':'contente',hold:null,pose:t<2.5?'aponta':'normal'})}</g>`;
  if(t>1.5){const k=pop(t,1.5);o+=`<g transform="translate(790 1300) scale(${k}) rotate(6)"><rect x="-240" y="-90" width="480" height="180" rx="24" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-14" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">ELE ACHOU</text><text x="0" y="56" font-size="56" fill="#c8402f" text-anchor="middle" stroke="none">UMA CHAVE…</text></g>`;
    o+=`<g transform="translate(930 1110) rotate(-20)"><circle cx="-50" cy="0" r="36" fill="none" stroke="#f6c744" stroke-width="16"/><path d="M-14,0 H96 M72,0 v28 M90,0 v20" stroke="#f6c744" stroke-width="16"/></g>`;}
  if(t>4){const k3=pop(t,4);o+=`<g transform="translate(540 1600) scale(${k3}) rotate(-5)"><rect x="-320" y="-70" width="640" height="140" rx="70" fill="#5fe08a" stroke="#1b1420" stroke-width="8"/><text x="0" y="24" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">DESTAPAR OU ESPERAR?</text></g>`;}
  return o;
};
// ===== Episódio 4 (Dia 4): "O vídeo" — gravar + a lona aparece + influencer =====
const D4=27;
function hud5(div,cli,t=1,cliPop=-1){
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `${hud(D4,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// cartão estático (já visível no frame 0)
function cartaoEp(n,titulo,y=380){return `<g transform="translate(540 ${y}) rotate(-3)"><rect x="-400" y="-110" width="800" height="210" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-22" font-size="62" fill="#f6c744" text-anchor="middle" stroke="none">EPISÓDIO ${n}</text><text x="0" y="70" font-size="96" fill="#fff" text-anchor="middle" stroke="none">${titulo}</text></g>`;}
// moldura de telemóvel a gravar, com contador de views
function camRec(inner,t,views,col='#1d1d24'){
  let o=`<rect x="110" y="330" width="860" height="1520" rx="70" fill="${col}"/><clipPath id="cr"><rect x="140" y="360" width="800" height="1460" rx="48"/></clipPath><g clip-path="url(#cr)">${inner}</g>`;
  o+=`<circle cx="200" cy="420" r="18" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="230" y="436" font-size="44" fill="#fff" stroke="#1b1420" stroke-width="8" paint-order="stroke fill">REC</text>`;
  if(views!=null) o+=`<g transform="translate(700 425)"><rect x="-190" y="-40" width="380" height="80" rx="40" fill="#000" opacity=".6" stroke="none"/><text x="0" y="18" font-size="50" fill="#fff" text-anchor="middle" stroke="none">${views} VIEWS</text></g>`;
  return o;
}
// carro tapado com lona (forma do coupé) + farol a espreitar
function lonaCarro(x,y,s,farol=false,t=0){
  const sk=(x0,x1,yb)=>{let h='';for(let xx=x1;xx>x0;xx-=46)h+=`Q${xx-23},${yb+10} ${Math.max(x0,xx-46)},${yb} `;return h;};
  let o=`<path d="M60,1640 L62,1540 Q66,1500 120,1492 L440,1474 Q510,1468 556,1414 Q600,1356 680,1350 L780,1350 Q836,1354 904,1414 Q984,1472 1040,1484 L1060,1500 L1060,1640 ${sk(60,1060,1640)} Z" fill="#b0a66b"/>`;
  for(const [a,b,c2,dd] of [[200,1490,190,1640],[380,1478,390,1640],[620,1390,630,1640],[800,1352,810,1640],[960,1460,970,1640]]) o+=`<path d="M${a},${b} Q${a+12},${(b+dd)/2} ${c2},${dd}" fill="none" stroke="#6b6440" stroke-width="5"/>`;
  if(farol){ o+=`<path d="M60,1560 Q110,1520 170,1540 L170,1640 L60,1640 Z" fill="#8a8256"/><circle cx="120" cy="1590" r="34" fill="#fff6c4" stroke-width="8"/><circle cx="120" cy="1590" r="16" fill="#fff" stroke="none" opacity="${.6+.4*Math.sin(t*6)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-560 -1500)">${o}</g>`;
}

// 1 · Abertura: frame 0 já cheio
SH.d4abre=(t,dur)=>{
  let o=caraNando(t,'contente','#7a3f9e','',0,'#fff',2.5);
  o+=cartaoEp(4,'O VÍDEO',420);
  o+=`<g transform="translate(540 1480) rotate(4)"><rect x="-430" y="-90" width="860" height="170" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="30" font-size="96" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS: GRAVAR!</text></g>`;
  return o+hud5(87050,6);
};
// 2 · Votos: barra de 3 + cartões
SH.d4votos=(t,dur)=>{
  let o=fundoEscuro(t);
  o+=`<g transform="translate(540 370) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="84" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text></g>`;
  const f=ease(t/.8), bw=900; const g=bw*.5*f, d=bw*.33*f;
  o+=`<rect x="90" y="490" width="${bw}" height="120" rx="60" fill="#3a3f45" stroke="#1b1420" stroke-width="8"/><rect x="90" y="490" width="${g+d+bw*.17*f}" height="120" rx="60" fill="#c8402f" stroke="none"/><rect x="90" y="490" width="${g+d}" height="120" rx="60" fill="#e08a2f" stroke="none"/><rect x="90" y="490" width="${Math.max(120,g)}" height="120" rx="60" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/>`;
  o+=`<text x="120" y="572" font-size="56" fill="#fff" stroke="none">GRAVAR ${Math.round(50*f)}%</text><text x="${90+g+d/2}" y="572" font-size="40" fill="#fff" text-anchor="middle" stroke="none">OS DOIS</text><text x="${90+g+d+bw*.085}" y="572" font-size="34" fill="#fff" text-anchor="middle" stroke="none">17%</text>`;
  o+=cartao3d(540,800,'_ricard0_silva_','Gravar vai dar bom','#7a3f9e',t,.4,{rot:-4});
  o+=cartao3d(540,1020,'hei7zin_crx_','Gravar, para ficar famoso','#2f6fb3',t,1.0,{rot:3,w:900});
  o+=cartao3d(540,1240,'_gabbszin','Pode gravar amigao','#e08a2f',t,1.6,{rot:-3});
  return o+hud5(87050,6);
};
// 3 · A ideia do sntz_
SH.d4ideia=(t,dur)=>{
  if(t>2.3){ let o=interior({}); o+=nando({x:300,y:1920,s:.74,face:'normal',hold:null,pose:'normal'});
    o+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*8))*30})">${rubinho({x:780,y:1900,s:.78,face:'feliz',pose:'filma'})}</g>`;
    o+=ono('GÊNIO!',780,760,t,2.35,'#f6c744',8,170); return o+hud5(87050,6); }
  let o=fundoEscuro(t,'#1e1424');
  o+=`<g transform="translate(540 470) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">MAS UM DE VOCÊS</text><text x="0" y="74" font-size="70" fill="#2f9e6e" text-anchor="middle" stroke="none">DEU A MELHOR IDEIA</text></g>`;
  o+=cartao3d(540,900,'sntz_','os dois, grava ele trabalhando','#2f9e6e',t,.4,{rot:3,w:960});
  return o+hud5(87050,6);
};
// 4 · 1.ª tentativa: dança
SH.d4danca=(t,dur)=>{
  let in_=interior({}); const fall=t>2.6;
  const r=fall?ease((t-2.6)/.3)*80:Math.sin(t*9)*18, j=fall?0:Math.abs(Math.sin(t*9))*40;
  in_+=`<g transform="translate(0 ${-j}) rotate(${r} 540 1880)">${nando({x:540,y:1880,s:.78,face:fall?'choque':'contente',hold:null,pose:'vitoria'})}</g>`;
  in_+=turbo({x:fall?760:900,y:1890,s:.45,mood:'calmo'});
  if(fall) in_+=ono('TOMBO!',540,1100,t,2.65,'#fff',-8,140);
  let o=`<rect width="1080" height="1920" fill="#2f6fb3" stroke="none"/>`+camRec(in_,t,fall?'32':'0');
  return o+tentativa(1,t,'#f6c744')+hud5(87050,6);
};
// 5 · 2.ª tentativa: desafio do Turbo
SH.d4turbo=(t,dur)=>{
  let in_=interior({}); const p=(t*.45)%1;
  const tx=1200-p*1600, nx=tx+520;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*14))*20})">${turbo({x:tx,y:1880,s:.5,mood:'calmo'})}</g>`;
  in_+=`<g transform="rotate(-30 ${tx-200} 1640)"><rect x="${tx-215}" y="1600" width="22" height="120" rx="8" fill="#c9d1d6" stroke-width="5"/></g>`;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*12))*25})">${nando({x:nx,y:1900,s:.66,face:'choque',hold:null,pose:'normal'})}</g>`;
  in_+=ono('VOLTA AQUI!',540,1100,t,.6,'#fff',-6,110);
  let o=`<rect width="1080" height="1920" fill="#e08a2f" stroke="none"/>`+camRec(in_,t,'140');
  return o+tentativa(2,t,'#5fe08a')+hud5(87050,6);
};
// 6 · 3.ª tentativa: a ideia do sntz_ — o Uno do Seu Armando; views a disparar; a lona aparece ao fundo
SH.d4uno=(t,dur)=>{
  let in_=interior({});
  in_+=lonaCarro(830,1380,.46,true,t);
  in_+=carroVelho({x:470,y:1560,s:1.0,color:'#e8e2d0'});
  if(t<2.4) for(let i=0;i<5;i++){const p=((t*.9)+i/5)%1;in_+=`<circle cx="${430+Math.sin(i)*30}" cy="${1300-p*360}" r="${30+p*70}" fill="#9a9aa3" stroke="#6b6b73" stroke-width="5" opacity="${1-p}"/>`;}
  in_+=nando({x:250,y:1920,s:.62,face:t<2.4?'choque':'contente',hold:'chave',pose:'normal'});
  if(t>2.4){ for(let i=0;i<6;i++){const a=i+t*20;in_+=`<path d="M560,1420 l${Math.cos(a)*60},${Math.sin(a)*60}" stroke="#f6c744" stroke-width="7"/>`;} in_+=ono('TEC TEC',650,1240,t,2.4,'#fff',6,90); }
  const v=t<3.2?'0':Math.round(48000*ease((t-3.2)/2.2)).toLocaleString('pt-BR');
  let o=`<rect width="1080" height="1920" fill="#2f9e6e" stroke="none"/>`+camRec(in_,t,v);
  if(t<2.4) o+=ono('FUMAÇA NO PORTA-LUVAS?!',540,900,t,.3,'#fff',-4,72);
  if(t>5.2){const k=pop(t,5.2);o+=`<g transform="translate(540 1000) scale(${k}) rotate(-5)"><rect x="-380" y="-80" width="760" height="150" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="88" fill="#1b1420" text-anchor="middle" stroke="none">ASMR MECÂNICO</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud5(87050,6);
};
// 7 · Progresso: agendamentos
SH.d4clientes=(t,dur)=>{
  let o=raios('#2f9e6e',t,1000,.08);
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#ece5dd" stroke="none"/>`;
  o+=`<path d="M180,460 Q180,410 228,410 H852 Q900,410 900,460 V540 H180 Z" fill="#075e54" stroke="none"/><text x="540" y="492" font-size="40" fill="#fff" text-anchor="middle" stroke="none">WHATSAPP · OFICINA</text>`;
  const msgs=[['Vi o vídeo! Tem horário amanhã?','R$ 280'],['Faz revisão? Vi no insta kkk','R$ 350'],['Meu carro faz o barulho do Uno','R$ 180'],['Freio + óleo, quanto fica?','R$ 340']];
  let cli=6,ganho=0;
  msgs.forEach(([m,v],i)=>{const t0=.3+i*.7; if(t<t0) return; cli++; ganho+=parseInt(v.replace(/\D/g,''));
    const k=pop(t,t0,.2), y=600+i*200; o+=`<g transform="translate(200 ${y}) scale(${k}) translate(-200 ${-y})"><rect x="200" y="${y}" width="660" height="150" rx="22" fill="#fff" stroke="#b9b2a2" stroke-width="3"/><text x="230" y="${y+62}" font-family="PM" font-size="36" fill="#1b1420" stroke="none">${m}</text><text x="830" y="${y+122}" font-size="44" fill="#2f9e6e" text-anchor="end" stroke="none">${v}</text></g>`;});
  if(t>3.3){const k=pop(t,3.3);o+=`<g transform="translate(540 1500) scale(${k}) rotate(-4)"><rect x="-380" y="-110" width="760" height="220" rx="24" fill="#fffaf0" stroke="#1b1420" stroke-width="8"/><text x="0" y="-20" font-family="PM" font-size="46" fill="#1b1420" text-anchor="middle" stroke="none">Seu Armando: R$ 60</text><text x="0" y="56" font-family="PM" font-size="46" fill="#c8402f" text-anchor="middle" stroke="none">+ uma dúzia de ovos</text></g>`; ganho+=60; }
  const div=87050-ganho;
  if(t>3.9) o+=ono('+R$ 1.210',540,340,t,3.9,'#5fe08a',-5,120);
  return o+hud5(div,cli,t,.3);
};
// 8 · A lona: comentários + Nando curioso
SH.d4lona=(t,dur)=>{
  if(t>3.4){ let o=caraNando(t-3.4,'normal','#3a2a4a','HMMM…',.05,'#f6c744',2.6); for(const [x,y,d] of [[180,700,0],[900,620,.2],[860,1000,.4]]) o+=ono('?',x,y,t,3.5+d,'#fff',0,150); return o+hud5(85840,10); }
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  const z=1+ease(t/1.2)*.9;
  in_=`<g transform="translate(540 1560) scale(${z}) translate(-560 -1450)">${in_}${lonaCarro(560,1400,.9,true,t)}</g>`;
  let o=`<rect width="1080" height="1920" fill="#151626" stroke="none"/>`+camRec(in_,t,'48.000');
  o+=cartao3d(540,820,'dudu.garagem','O QUE TEM DEBAIXO DA LONA??','#c8402f',t,1.2,{rot:-3,w:960});
  o+=cartao3d(540,1040,'rafa_motos','esse farol… é um clássico?','#2f6fb3',t,1.9,{rot:3,w:900});
  o+=cartao3d(540,1260,'bia.carros','MOSTRA A LONA!!!','#7a3f9e',t,2.6,{rot:-2,w:800});
  return o+hud5(85840,10);
};
// 9 · DM do influencer: 2 milhões… ou não?
SH.d4dm=(t,dur)=>{
  let o=raios('#7a3f9e',t,1000,.1);
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="540" cy="580" r="90" fill="#f6c744" stroke="#1b1420" stroke-width="6"/><text x="540" y="614" font-size="90" fill="#1b1420" text-anchor="middle" stroke="none">T</text>`;
  o+=`<text x="540" y="740" font-family="Arial, sans-serif" font-weight="700" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">thiagao.turbo</text><circle cx="745" cy="724" r="18" fill="#1d9bf0" stroke="none"/>`;
  const fl=t>2.6&&Math.floor(t*6)%2===0; o+=`<text x="540" y="820" font-size="64" fill="${fl?'#c8402f':'#1b1420'}" text-anchor="middle" stroke="none">${fl?'2.000':'2.000.000'} seguidores</text>`;
  if(t>.4){const k=pop(t,.4);o+=`<g transform="translate(220 920) scale(${k}) translate(-220 -920)"><rect x="210" y="900" width="660" height="290" rx="26" fill="#efefef"/><text x="240" y="970" font-family="PM" font-size="40" fill="#1b1420" stroke="none">Fala mecânico! Vi seu vídeo!!</text><text x="240" y="1040" font-family="PM" font-size="40" fill="#1b1420" stroke="none">Conserta meu carro AO VIVO</text><text x="240" y="1110" font-family="PM" font-size="40" fill="#1b1420" stroke="none">pros meus 2 milhões?</text><text x="240" y="1170" font-family="PM" font-size="40" fill="#c8402f" stroke="none">De graça né, é divulgação ;)</text></g>`;}
  if(t>2.6) o+=stamp(t,2.6,540,1440,600,200,'SERÁ?',150,'#c8402f',-8,'#fffaf0');
  return o+hud5(85840,10);
};
// 10 · Votação: INFLUENCER ✕ LONA
SH.d4votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#8a6a3a" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.1)/.35)), R=600*(1-ease((t-.3)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="84" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">INFLUENCER</text><text x="270" y="596" font-size="34" fill="#ecd9f7" text-anchor="middle" stroke="none">2 milhões… ou golpe?</text>`;
  o+=`<g transform="rotate(-8 270 830)"><rect x="180" y="660" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="680" width="148" height="290" rx="16" fill="#fff" stroke-width="4"/><circle cx="270" cy="760" r="40" fill="#f6c744" stroke-width="4"/><circle cx="305" cy="730" r="14" fill="#1d9bf0" stroke="none"/><text x="270" y="900" font-size="80" fill="#c8402f" text-anchor="middle" stroke="none">?</text></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="84" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">LONA</text><text x="810" y="596" font-size="34" fill="#fbe9cf" text-anchor="middle" stroke="none">convencer o pai a destapar</text>`;
  o+=lonaCarro(810,830,.42,true,t)+`<text x="810" y="760" font-size="100" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="12" paint-order="stroke fill">?</text></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'normal',hold:null,pose:'cruzados'})}</g>`;
  return o+hud5(85840,10);
};
// ===== Episódio 4 — telemóvel realista (o Rubinho a filmar) + hook novo =====
// mode: 'rec' (app da câmara a gravar) | 'post' (reel publicado com views/gostos a subir)
function phoneCam(inner,t,{mode='rec',views=0,likes=0,coms=0,user='oficinatioze',cap=''}={}){
  const jx=Math.sin(t*7.3)*5+Math.sin(t*13.1)*3, jy=Math.sin(t*6.1)*4, jr=Math.sin(t*4.7)*1.2;
  const SKR='#7a4a2c';
  let s=`<clipPath id="scr"><rect x="160" y="330" width="760" height="1500" rx="56"/></clipPath>`;
  s+=`<rect x="128" y="298" width="824" height="1564" rx="84" fill="#141418"/><rect x="138" y="308" width="804" height="1544" rx="76" fill="#22232a" stroke="none"/>`;
  s+=`<rect x="950" y="620" width="12" height="150" rx="6" fill="#2c2d35" stroke="none"/><rect x="118" y="560" width="12" height="90" rx="6" fill="#2c2d35" stroke="none"/>`;
  s+=`<g clip-path="url(#scr)">`;
  s+=`<g transform="translate(540 1080) scale(.72) translate(-540 -1080)">${inner}</g>`;
  let seed=Math.floor(t*15); for(let i=0;i<70;i++){seed=(seed*9301+49297)%233280;const x=160+seed%760;seed=(seed*9301+49297)%233280;const y=330+seed%1500;s+=`<rect x="${x}" y="${y}" width="3" height="3" fill="#fff" opacity=".12" stroke="none"/>`;}
  s+=`<rect x="160" y="330" width="760" height="1500" fill="url(#vigPh)" stroke="none"/>`;
  if(mode==='rec'){
    s+=`<g font-family="Arial, sans-serif" font-weight="700" stroke="none"><text x="210" y="385" font-size="30" fill="#fff">10:26</text><rect x="800" y="364" width="56" height="26" rx="6" fill="none" stroke="#fff" stroke-width="3"/><rect x="805" y="369" width="36" height="16" rx="3" fill="#fff"/><rect x="858" y="371" width="5" height="12" rx="2" fill="#fff"/></g>`;
    const sec=Math.floor(t); s+=`<g transform="translate(540 450)"><rect x="-90" y="-30" width="180" height="60" rx="30" fill="#e0483a" stroke="none"/><text x="0" y="13" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#fff" text-anchor="middle" stroke="none">00:${String(sec).padStart(2,'0')}</text></g>`;
    const f=1+.06*Math.sin(t*5), c=110*f; s+=`<g transform="translate(540 1080)" stroke="#f6c744" stroke-width="6" fill="none"><path d="M${-c},${-c+40} V${-c} H${-c+40} M${c-40},${-c} H${c} V${-c+40} M${c},${c-40} V${c} H${c-40} M${-c+40},${c} H${-c} V${c-40}"/></g>`;
    s+=`<g transform="translate(540 1690)"><circle r="78" fill="none" stroke="#fff" stroke-width="10"/><rect x="-34" y="-34" width="68" height="68" rx="14" fill="#e0483a" stroke="none"/></g>`;
    s+=`<g transform="translate(540 1560)"><circle r="34" fill="#000" opacity=".45" stroke="none"/><text x="0" y="11" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#f6c744" text-anchor="middle" stroke="none">1x</text></g>`;
    s+=`<g font-family="Arial, sans-serif" font-weight="700" font-size="28" stroke="none" text-anchor="middle"><text x="540" y="1800" fill="#f6c744">VÍDEO</text><text x="420" y="1800" fill="#fff" opacity=".6">FOTO</text><text x="670" y="1800" fill="#fff" opacity=".6">LENTO</text></g>`;
    s+=`<g transform="translate(820 1690)"><circle r="44" fill="#000" opacity=".45" stroke="none"/><path d="M-16,-8 a18,18 0 0 1 32,-4 M16,8 a18,18 0 0 1 -32,4" fill="none" stroke="#fff" stroke-width="5"/></g><rect x="214" y="1650" width="80" height="80" rx="14" fill="#7a3f9e" stroke="#fff" stroke-width="4"/>`;
  } else {
    s+=`<rect x="160" y="1380" width="760" height="450" fill="url(#fadeB)" stroke="none"/>`;
    s+=`<g font-family="Arial, sans-serif" font-weight="700" stroke="none"><text x="205" y="400" font-size="40" fill="#fff">Reels</text></g>`;
    const ic=(y,svg,num)=>`<g transform="translate(860 ${y})">${svg}<text x="0" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#fff" text-anchor="middle" stroke="none">${num}</text></g>`;
    const hb=1+.15*Math.max(0,Math.sin(t*8));
    s+=ic(1180,`<path transform="scale(${hb})" d="M0,26 C-40,-6 -40,-40 0,-18 C40,-40 40,-6 0,26 Z" fill="#ff3b5c" stroke="none"/>`,likes);
    s+=ic(1310,`<path d="M-26,-20 h52 a8,8 0 0 1 8,8 v30 a8,8 0 0 1 -8,8 h-30 l-16,14 v-14 h-6 a8,8 0 0 1 -8,-8 v-30 a8,8 0 0 1 8,-8 Z" fill="none" stroke="#fff" stroke-width="5"/>`,coms);
    s+=ic(1440,`<path d="M-24,0 L24,-20 L12,24 L2,6 Z" fill="none" stroke="#fff" stroke-width="5"/>`,'');
    s+=`<g font-family="Arial, sans-serif" stroke="none"><circle cx="220" cy="1640" r="30" fill="#f6c744"/><text x="265" y="1652" font-weight="700" font-size="34" fill="#fff">${user}</text><rect x="560" y="1620" width="120" height="44" rx="10" fill="none" stroke="#fff" stroke-width="3"/><text x="620" y="1651" font-weight="700" font-size="26" fill="#fff" text-anchor="middle">Seguir</text><text x="200" y="1710" font-size="30" fill="#fff">${cap}</text></g>`;
    s+=`<g transform="translate(540 470)"><rect x="-230" y="-46" width="460" height="92" rx="46" fill="#000" opacity=".55" stroke="none"/><text x="0" y="20" font-size="56" fill="#fff" text-anchor="middle" stroke="none">${views} VIEWS</text></g>`;
    if(likes&&String(likes).length>3) for(let i=0;i<6;i++){const p=((t*1.1)+i/6)%1; s+=`<path transform="translate(${860-Math.sin(i*2+p*6)*40} ${1160-p*520}) scale(${.6+p*.5})" d="M0,26 C-40,-6 -40,-40 0,-18 C40,-40 40,-6 0,26 Z" fill="#ff3b5c" opacity="${1-p}" stroke="none"/>`;}
  }
  s+=`</g>`;
  s+=`<rect x="460" y="346" width="160" height="40" rx="20" fill="#000" stroke="none"/>`;
  s+=`<g stroke="#2b1d16" stroke-width="7"><path d="M60,1500 Q40,1700 120,1900 L300,1920 Q250,1760 170,1700 Q150,1600 150,1500 Z" fill="${SKR}"/><ellipse cx="150" cy="1470" rx="40" ry="60" fill="${SKR}"/><ellipse cx="146" cy="1330" rx="34" ry="52" fill="${SKR}"/><path d="M1020,1500 Q1040,1700 960,1900 L780,1920 Q830,1760 910,1700 Q930,1600 930,1500 Z" fill="${SKR}"/><ellipse cx="930" cy="1470" rx="40" ry="60" fill="${SKR}"/><ellipse cx="936" cy="1330" rx="34" ry="52" fill="${SKR}"/></g>`;
  return `<defs><radialGradient id="vigPh" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient><linearGradient id="fadeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient></defs><g transform="translate(${jx} ${jy}) rotate(${jr} 540 1100)">${s}</g>`;
}
function bgBlur(col){return `<rect width="1080" height="1920" fill="${col}" stroke="none"/><circle cx="200" cy="300" r="260" fill="#fff" opacity=".06" stroke="none"/><circle cx="900" cy="1700" r="320" fill="#000" opacity=".12" stroke="none"/>`;}

// 0 · HOOK: flash-forward — o vídeo viral e a lona ao fundo (frame 0 já cheio)
SH.d4abre=(t,dur)=>{
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  in_+=lonaCarro(560,1450,.95,true,t)+nando({x:250,y:1920,s:.62,face:'choque',hold:null,pose:'normal'});
  const v=Math.round(41000+7000*ease(t/1.8)).toLocaleString('pt-BR');
  let o=bgBlur('#1a1a22')+phoneCam(in_,t,{mode:'post',views:v,likes:'9.812',coms:'1.204',cap:'consertou em 10 min kkk'});
  o+=`<g transform="translate(540 900) rotate(-3)"><rect x="-470" y="-140" width="940" height="270" rx="30" fill="#f6c744" stroke="#1b1420" stroke-width="12"/><text x="0" y="-26" font-size="82" fill="#1b1420" text-anchor="middle" stroke="none">ESSE VÍDEO VIRALIZOU…</text><text x="0" y="80" font-size="82" fill="#c8402f" text-anchor="middle" stroke="none">MAS OLHA O FUNDO...</text></g>`;
  o+=`<g transform="translate(860 1420) rotate(${30+Math.sin(t*8)*6})"><path d="M0,0 L-70,-36 L-56,0 L-70,36 Z" fill="#fff" stroke="#1b1420" stroke-width="6"/><path d="M-56,0 H-200" stroke="#1b1420" stroke-width="26"/><path d="M-56,0 H-200" stroke="#fff" stroke-width="14"/></g>`;
  return o+hud5(87050,6);
};
SH.d4danca=(t,dur)=>{
  const fall=t>2.6; let in_=interior({});
  const r=fall?ease((t-2.6)/.3)*80:Math.sin(t*9)*18, j=fall?0:Math.abs(Math.sin(t*9))*40;
  in_+=`<g transform="translate(0 ${-j}) rotate(${r} 540 1880)">${nando({x:540,y:1880,s:.78,face:fall?'choque':'contente',hold:null,pose:'vitoria'})}</g>`;
  in_+=turbo({x:fall?760:900,y:1890,s:.45,mood:'calmo'});
  let o=bgBlur('#2f6fb3')+phoneCam(in_,t,fall?{mode:'post',views:'32',likes:'3',coms:'1',cap:'dancinha da oficina'}:{mode:'rec'});
  if(!fall) o+=ono('♪ ♫',320,900,t,.2,'#fff',-8,120);
  if(fall) o+=ono('TOMBO!',540,1000,t,2.65,'#fff',-8,150)+ono('32 VIEWS…',540,1250,t,3.0,'#f6c744',4,110);
  return o+tentativa(1,t,'#f6c744')+hud5(87050,6);
};
SH.d4turbo=(t,dur)=>{
  let in_=interior({}); const p=(t*.45)%1; const tx=1200-p*1600, nx=tx+520;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*14))*20})">${turbo({x:tx,y:1880,s:.5,mood:'calmo'})}</g>`;
  in_+=`<g transform="rotate(-30 ${tx-200} 1640)"><rect x="${tx-215}" y="1600" width="22" height="120" rx="8" fill="#c9d1d6" stroke-width="5"/></g>`;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*12))*25})">${nando({x:nx,y:1900,s:.66,face:'choque',hold:null,pose:'normal'})}</g>`;
  const post=t>2.8;
  let o=bgBlur('#e08a2f')+phoneCam(in_,t,post?{mode:'post',views:'140',likes:'11',coms:'2',cap:'desafio do turbo'}:{mode:'rec'});
  o+=ono('VOLTA AQUI!',540,1000,t,.5,'#fff',-6,120); if(post) o+=ono('140…',540,1250,t,2.85,'#f6c744',4,120);
  return o+tentativa(2,t,'#5fe08a')+hud5(87050,6);
};
SH.d4uno=(t,dur)=>{
  let in_=interior({});
  in_+=lonaCarro(830,1380,.46,true,t)+carroVelho({x:470,y:1560,s:1.0,color:'#e8e2d0'});
  if(t<2.4) for(let i=0;i<5;i++){const p=((t*.9)+i/5)%1;in_+=`<circle cx="${430+Math.sin(i)*30}" cy="${1300-p*360}" r="${30+p*70}" fill="#9a9aa3" stroke="#6b6b73" stroke-width="5" opacity="${1-p}"/>`;}
  in_+=nando({x:250,y:1920,s:.62,face:t<2.4?'choque':'contente',hold:'chave',pose:'normal'});
  if(t>2.4) for(let i=0;i<6;i++){const a=i+t*20;in_+=`<path d="M560,1420 l${Math.cos(a)*60},${Math.sin(a)*60}" stroke="#f6c744" stroke-width="7"/>`;}
  const post=t>3.4, e=ease((t-3.4)/2.4);
  const v=Math.round(48000*e).toLocaleString('pt-BR'), l=Math.round(9812*e).toLocaleString('pt-BR'), c=Math.round(1204*e).toLocaleString('pt-BR');
  let o=bgBlur('#2f9e6e')+phoneCam(in_,t,post?{mode:'post',views:v,likes:l,coms:c,cap:'consertou em 10 min kkk'}:{mode:'rec'});
  if(t<2.4) o+=ono('FUMAÇA NO PORTA-LUVAS?!',540,1000,t,.3,'#fff',-4,72); else if(!post) o+=ono('TEC TEC TEC',540,1000,t,2.4,'#fff',6,100);
  if(t>5.6){const k=pop(t,5.6);o+=`<g transform="translate(540 1000) scale(${k}) rotate(-5)"><rect x="-380" y="-80" width="760" height="150" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="88" fill="#1b1420" text-anchor="middle" stroke="none">VIRALIZOU!</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud5(87050,6);
};
SH.d4lona=(t,dur)=>{
  if(t>3.4){ let o=caraNando(t-3.4,'normal','#3a2a4a','HMMM…',.05,'#f6c744',2.6); for(const [x,y,d] of [[180,700,0],[900,620,.2],[860,1000,.4]]) o+=ono('?',x,y,t,3.5+d,'#fff',0,150); return o+hud5(85840,10); }
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  const z=1+ease(t/1.2)*.9; in_=`<g transform="translate(540 1560) scale(${z}) translate(-560 -1450)">${in_}${lonaCarro(560,1400,.9,true,t)}</g>`;
  let o=bgBlur('#151626')+phoneCam(in_,t,{mode:'post',views:'48.000',likes:'9.812',coms:'1.204',cap:'consertou em 10 min kkk'});
  o+=cartao3d(540,760,'dudu.garagem','O QUE TEM DEBAIXO DA LONA??','#c8402f',t,.9,{rot:-3,w:960});
  o+=cartao3d(540,980,'rafa_motos','esse farol… é um clássico?','#2f6fb3',t,1.6,{rot:3,w:900});
  o+=cartao3d(540,1200,'bia.carros','MOSTRA A LONA!!!','#7a3f9e',t,2.3,{rot:-2,w:800});
  return o+hud5(85840,10);
};
// ===== Episódio 5 (Dia 5): "O golpe e a lona" =====
const D5=26;
function hud6(div=81050,cli=21,t=1,shake=0){
  const sx=shake?Math.sin(t*60)*shake:0;
  return `<g transform="translate(${sx} 0)">${hud(D5,div)}<g font-family="A" stroke="#2b1d16"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// Tio Zé em grande plano (cabeça a ocupar o ecrã), com óculos de sol opcionais e boca aberta a gritar
function paiGrande(t,{grito=false,oculos=true,y=1000,s=2.2}={}){
  const Y=v=>y+(v+960)*s; // centro da cara (local -960) em y
  let o=tioZe({x:540,y:y+960*s,s,age:'velho',face:grito?'choque':'feliz',pose:'baixo'});
  if(oculos&&!grito) o+=`<g stroke="#1b1420" stroke-width="10"><rect x="${540-46*s-40*s}" y="${Y(-1000)}" width="${80*s}" height="${52*s}" rx="${18*s}" fill="#141414"/><rect x="${540+46*s-40*s}" y="${Y(-1000)}" width="${80*s}" height="${52*s}" rx="${18*s}" fill="#141414"/><path d="M${540-6*s},${Y(-980)} h${12*s}"/></g>`;
  if(grito) o+=`<ellipse cx="540" cy="${Y(-860)}" rx="${46*s}" ry="${40*s}" fill="#3b1f1a" stroke="#1b1420" stroke-width="10"/><ellipse cx="540" cy="${Y(-840)}" rx="${26*s}" ry="${14*s}" fill="#e0483a" stroke="none"/>`;
  return o;
}
function praiaFundo(t){
  let o=`<rect width="1080" height="1920" fill="#8fd6f5" stroke="none"/><circle cx="880" cy="380" r="90" fill="#ffe27a" stroke="none"/>`;
  const wv=(t*60)%120;
  o+=`<rect x="0" y="1100" width="1080" height="300" fill="#2fa3d6"/><g transform="translate(${-wv} 0)"><path d="M0,1150 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/></g>`;
  o+=`<path d="M0,1400 Q540,1340 1080,1400 V1920 H0 Z" fill="#f6dc9a"/>`;
  return o;
}

// 1 · Frame 0 cheio: o perfil dos "2 milhões" racha para 2 mil
SH.e5golpe=(t,dur)=>{
  let o=raios('#7a3f9e',t,1000,.12);
  o+=`<rect x="110" y="330" width="860" height="1460" rx="70" fill="#1d1d24"/><rect x="140" y="360" width="800" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="540" cy="620" r="130" fill="#f6c744" stroke="#1b1420" stroke-width="8"/><text x="540" y="670" font-size="140" fill="#1b1420" text-anchor="middle" stroke="none">T</text>`;
  o+=`<text x="540" y="840" font-family="Arial, sans-serif" font-weight="700" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">thiagao.turbo</text><circle cx="800" cy="820" r="24" fill="#1d9bf0" stroke="none"/>`;
  const crack=t>.8, fell=t>1.15;
  if(!fell){ const sh=crack?Math.sin(t*80)*6:0; o+=`<g transform="translate(${sh} 0)"><text x="540" y="1060" font-size="170" fill="#1b1420" text-anchor="middle" stroke="none">2.000.000</text></g>`;
    if(crack) o+=`<path d="M470,930 l40,60 l-30,40 l50,60 M640,930 l-30,50 l40,40 l-20,70" fill="none" stroke="#c8402f" stroke-width="10"/>`; }
  else { const k=pop(t,1.15,.2); o+=`<g transform="translate(540 1040) scale(${k})"><text x="0" y="0" font-size="210" fill="#c8402f" text-anchor="middle" stroke="none">2.000</text></g>`;
    for(const [x,r,d] of [[380,-30,0],[520,20,.1],[700,40,.05]]){const p=clamp((t-1.15-d)/.6,0,1);o+=`<text x="${x}" y="${1080+p*600}" font-size="120" fill="#1b1420" opacity="${1-p}" transform="rotate(${r*p} ${x} ${1080+p*600})" stroke="none">0</text>`;} }
  o+=`<text x="540" y="1150" font-size="58" fill="#7a808a" text-anchor="middle" stroke="none">seguidores</text>`;
  o+=`<rect x="200" y="1220" width="680" height="110" rx="24" fill="#1d9bf0"/><text x="540" y="1295" font-family="Arial, sans-serif" font-weight="700" font-size="52" fill="#fff" text-anchor="middle" stroke="none">Seguir</text>`;
  o+=stamp(t,1.6,540,1520,620,220,'GOLPE!',170,'#c8402f',-10,'#fffaf0');
  return o+hud6();
};
// 2 · Um de vocês descobriu
SH.e5gleeb=(t,dur)=>{
  let o=fundoEscuro(t,'#1e1424');
  o+=`<g transform="translate(540 470) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">E UM DE VOCÊS</text><text x="0" y="74" font-size="70" fill="#2f9e6e" text-anchor="middle" stroke="none">DESCOBRIU ANTES!</text></g>`;
  o+=cartao3d(540,820,'Gleebzito','"mostra que você tem 2M…','#3a3f45',t,.15,{rot:-3,w:980});
  o+=cartao3d(540,1030,'Gleebzito','…quando na verdade tem 2k"','#3a3f45',t,.55,{rot:3,w:980,like:false});
  if(t>1.4){const k=pop(t,1.4);o+=`<g transform="translate(540 1330) scale(${k}) rotate(-6)"><rect x="-300" y="-80" width="600" height="160" rx="80" fill="#5fe08a" stroke="#1b1420" stroke-width="10"/><text x="0" y="34" font-size="100" fill="#1b1420" text-anchor="middle" stroke="none">ACERTOU!</text></g>`;
    for(let i=0;i<10;i++){const a=i*0.63, r=ease((t-1.4)/.5)*360; o+=`<rect x="${540+Math.cos(a)*r}" y="${1330+Math.sin(a)*r*.6}" width="22" height="14" fill="${['#f6c744','#4cc3f0','#ff5a7a','#5fe08a'][i%4]}" transform="rotate(${i*40+t*200} ${540+Math.cos(a)*r} ${1330+Math.sin(a)*r*.6})" stroke="none"/>`;}}
  return o+hud6();
};
// 3 · Vocês escolheram: LONA
SH.e5lona=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" opacity=".35" stroke="none"/>`;
  const z=1.6+ease(t/dur)*.5; o=`<g transform="translate(300 1560) scale(${z}) translate(-246 -1576)">${o}${lonaCarro(620,1500,.85,true,t)}</g>`;
  o+=`<circle cx="300" cy="1560" r="${180+Math.sin(t*6)*20}" fill="#fff6c4" opacity=".18" stroke="none"/>`;
  o+=`<g transform="translate(540 760) rotate(-4)"><rect x="-440" y="-150" width="880" height="300" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-40" font-size="76" fill="#fff" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text><text x="-50" y="88" font-size="130" fill="#f6c744" text-anchor="middle" stroke="none">A LONA!</text><g transform="translate(290 46)"><circle r="56" fill="#2f9e6e" stroke="#fff" stroke-width="6"/><path d="M-26,0 l18,20 l34,-40" fill="none" stroke="#fff" stroke-width="14"/></g></g>`;
  return o+hud6();
};
// 4 · Videochamada com o pai
SH.e5chamada=(t,dur)=>{
  if(t>3.2){ let c=caraNando(t-3.2,'preocupado','#2f6fb3','',0,'#fff',2.6);
    const k=pop(t,3.3); c+=`<g transform="translate(540 1500) scale(${k}) rotate(-3)"><rect x="-450" y="-110" width="900" height="220" rx="60" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-12" font-family="PM" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">Pai… e se eu</text><text x="0" y="66" font-family="PM" font-size="62" fill="#c8402f" text-anchor="middle" stroke="none">tirar a lona?</text></g>`;
    return c+hud6(); }
  let o=raios('#2f9e6e',t,1000,.08);
  o+=`<rect x="110" y="330" width="860" height="1520" rx="70" fill="#1d1d24"/><clipPath id="vc"><rect x="140" y="360" width="800" height="1460" rx="48"/></clipPath><g clip-path="url(#vc)">`;
  o+=`<g transform="translate(540 1090) scale(.74) translate(-540 -1090)">${praiaFundo(t)}<g transform="rotate(${Math.sin(t*3)*2} 540 1900)">${paiGrande(t,{y:820,s:1.55})}</g></g>`;
  o+=`<text x="540" y="440" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="6" paint-order="stroke fill">PAI</text><text x="540" y="490" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="5" paint-order="stroke fill">0:${String(Math.floor(t)+3).padStart(2,'0')}</text>`;
  // janela pequena do Nando
  o+=`<rect x="680" y="1260" width="220" height="300" rx="24" fill="#d9c79f" stroke="#fff" stroke-width="6"/><g transform="translate(790 1590) scale(.28) translate(-540 -1900)">${nando({x:540,y:2500,s:1.2,face:'normal',hold:null})}</g>`;
  o+=`<g transform="translate(540 1720)"><circle cx="-150" r="58" fill="#3a3f45"/><circle cx="0" r="64" fill="#e0483a"/><path d="M-30,6 q30,-26 60,0" fill="none" stroke="#fff" stroke-width="10"/><circle cx="150" r="58" fill="#3a3f45"/></g></g>`;
  o+=ono('TUTUM',820,560,t,.15,'#fff',8,80);
  return o+hud6();
};
// 5 · NÃO MEXE NAS LONAS!
SH.e5grito=(t,dur)=>{
  if(t>3.6){ let o=`<rect width="1080" height="1920" fill="#1d1d24" stroke="none"/>`;
    o+=`<circle cx="540" cy="860" r="120" fill="#c8402f"/><path d="M490,850 q50,-40 100,0" fill="none" stroke="#fff" stroke-width="18" transform="rotate(180 540 860)"/>`;
    o+=`<text x="540" y="1100" font-family="Arial, sans-serif" font-weight="700" font-size="66" fill="#fff" text-anchor="middle" stroke="none">Chamada encerrada</text><text x="540" y="1180" font-family="Arial, sans-serif" font-size="44" fill="#9aa0a6" text-anchor="middle" stroke="none">PAI · 0:07</text>`;
    o+=ono('TU-TU-TU',540,1420,t,3.7,'#fff',-4,110); return o+hud6(); }
  const sh=Math.sin(t*70)*14, sy=Math.cos(t*55)*8;
  let o=praiaFundo(t);
  o+=`<g transform="translate(${sh} ${sy})">${paiGrande(t,{grito:t>.3,oculos:t<=.3,y:820,s:2.4})}</g>`;
  if(t>.4) for(let i=0;i<8;i++){const p=((t-.4)*1.5+i/8)%1; o+=`<ellipse cx="${540+(i-4)*60*p*3}" cy="${1060+p*500}" rx="14" ry="20" fill="#f6efe0" stroke="#bfb6a0" stroke-width="4" opacity="${1-p}"/>`;}
  if(t>.35){const k=pop(t,.35,.18); o+=`<g transform="translate(540 1520) scale(${k}) rotate(-5)"><rect x="-480" y="-130" width="960" height="260" rx="30" fill="#c8402f" stroke="#1b1420" stroke-width="12"/><text x="0" y="-12" font-size="104" fill="#fff" text-anchor="middle" stroke="none">NÃO MEXE</text><text x="0" y="96" font-size="104" fill="#f6c744" text-anchor="middle" stroke="none">NAS LONAS!</text></g>`;}
  return `<g transform="translate(${sh*.4} 0)">${o}</g>`+hud6(81050,21,t,6);
};
// 6 · DESLIGOU?!
SH.e5desligou=(t,dur)=>caraNando(t,'choque','#c8402f','DESLIGOU?!',.05)+hud6();
// 7 · O Turbo puxa a lona: grade cromada + farol redondo
SH.e5turbo=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" opacity=".3" stroke="none"/>`;
  // carro por baixo (frente de coupé clássico)
  const rev=t<4.6?ease(clamp((t-.8)/1.6,0,1)):1-ease(clamp((t-4.6)/.6,0,1));
  const W=360*rev;
  let car=`<path d="M190,1640 L190,1500 Q200,1440 280,1430 L560,1420 L560,1640 Z" fill="#7a1d2a"/>`;
  car+=`<rect x="200" y="1500" width="150" height="110" rx="14" fill="#c9d1d6"/>`;
  for(let k=0;k<6;k++) car+=`<path d="M${212+k*24},1508 V1602" stroke="#6b7479" stroke-width="7"/>`;
  car+=`<circle cx="410" cy="1520" r="52" fill="#c9d1d6"/><circle cx="410" cy="1520" r="38" fill="#fff6c4"/><circle cx="410" cy="1520" r="20" fill="#fff" stroke="none" opacity="${.7+.3*Math.sin(t*8)}"/>`;
  car+=`<path d="M190,1620 H560" stroke="#c9d1d6" stroke-width="18"/>`;
  o+=`<clipPath id="rv"><rect x="150" y="1300" width="${40+W}" height="400"/></clipPath>`;
  o+=lonaCarro(640,1500,.85,false,t);
  o+=`<g clip-path="url(#rv)">${car}</g>`;
  if(rev>0.02){ const fx=190+W; o+=`<path d="M${fx},1360 Q${fx+60},1450 ${fx+30},1650 L${fx-10},1650 Q${fx+10},1480 ${fx-20},1380 Z" fill="#b0a66b"/>`;
    o+=`<circle cx="410" cy="1520" r="${120+Math.sin(t*6)*20}" fill="#fff6c4" opacity="${.22*rev}" stroke="none"/>`; }
  // Turbo a puxar (vira para a direita)
  const tx=-60+rev*(W*.4), tug=t<4.6?Math.sin(t*14)*8:0;
  o+=`<g transform="translate(${tug} 0)">${turbo({x:tx,y:1880,s:.55,mood:'rosna',flip:true})}</g>`;
  if(t>.8&&t<4.6) o+=`<path d="M${tx+190},1620 Q${tx+220},1560 ${190+W},1500" fill="none" stroke="#b0a66b" stroke-width="14"/>`;
  if(t>2.2&&t<4.6) o+=ono('UAU…',420,1200,t,2.2,'#f6c744',-6,90);
  if(t>4.4){ const nx=1300-ease((t-4.4)/.4)*560; o+=nando({x:nx,y:1920,s:.7,face:'choque',hold:null,pose:'normal'}); o+=ono('NÃO!',560,1150,t,4.5,'#fff',8,100); }
  return cam(o,t,dur,1.45,1.55,420,1460)+hud6();
};
// 8 · Alguém viu: o Kléber na porta
SH.e5porta=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2a2030" stroke="none"/>`;
  o+=`<rect x="240" y="420" width="600" height="1180" fill="#a9dcf5"/><rect x="240" y="1480" width="600" height="120" fill="#cfcfcf"/>`;
  o+=`<rect x="200" y="380" width="680" height="60" fill="#5a3a22"/><rect x="200" y="380" width="60" height="1260" fill="#5a3a22"/><rect x="820" y="380" width="60" height="1260" fill="#5a3a22"/>`;
  const kx=540+(1-ease(t/.5))*300;
  o+=`<g opacity="${.4+.6*ease(t/.6)}">${kleber({x:kx,y:1620,s:.95,face:'sorriso',pose:'normal'})}</g>`;
  o+=`<rect x="0" y="1640" width="1080" height="280" fill="#8f3f2e" stroke="none"/><path d="M0,1640 H1080" stroke-width="7"/>`;
  o+=`<rect width="1080" height="1920" fill="url(#vig)" stroke="none"/>`;
  o+=ono('!',870,520,t,.6,'#f6c744',8,200);
  o+=tag('KLÉBER',540,370,t,.9,540,470);
  return cam(o,t,dur,1.0,1.08,540,1000)+hud6();
};
// 9 · A oferta: 40 mil com TUDO dentro
SH.e5oferta=(t,dur)=>{
  let c=raios('#1f6fd6',t,900,.12);
  c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'sorriso',pose:'normal'});
  if(t>.3){const k=pop(t,.3),sw=Math.sin(t*3)*4; c+=`<g transform="translate(540 1420) scale(${k}) rotate(${-5+sw})"><rect x="-400" y="-230" width="800" height="460" rx="14" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><text x="0" y="-150" font-size="52" fill="#1b1420" text-anchor="middle" stroke="none">PROPOSTA DE COMPRA</text><path d="M-340,-120 H340" stroke-width="5"/><text x="0" y="-20" font-size="140" fill="#2f9e6e" text-anchor="middle" stroke="none">R$ 40.000</text>`;
    c+=`<text x="0" y="90" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">pela oficina</text>`;
    if(t>2.4){const u=ease((t-2.4)/.4); c+=`<text x="0" y="180" font-size="66" fill="#c8402f" text-anchor="middle" stroke="none">COM TUDO QUE TÁ DENTRO</text><path d="M-330,200 H${-330+660*u}" stroke="#c8402f" stroke-width="10"/>`;}
    c+=`</g>`;}
  if(t>3.2){const k=pop(t,3.2); c+=`<g transform="translate(540 1745) scale(${k}) rotate(3)"><rect x="-330" y="-50" width="660" height="100" rx="50" fill="#f6c744" stroke="#1b1420" stroke-width="8"/><text x="0" y="22" font-size="60" fill="#1b1420" text-anchor="middle" stroke="none">INCLUSIVE A LONA...</text></g>`; }
  return c+hud6(81050,21,t,t>2.4&&t<3.2?6:0);
};
// 10 · Votação: ACEITAR ✕ RECUSAR
SH.e5votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f9e6e" stroke="none"/><rect x="540" width="540" height="1920" fill="#8a6a3a" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.05)/.3)), R=600*(1-ease((t-.2)/.3));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">ACEITAR</text><text x="270" y="596" font-size="34" fill="#d4f5e2" text-anchor="middle" stroke="none">R$ 40 mil… e perde tudo</text>`;
  for(let i=0;i<6;i++){const y=900-i*36; o+=`<rect x="${170+(i%2)*10}" y="${y}" width="200" height="70" rx="8" fill="#5fd17c" stroke="#1b1420" stroke-width="6"/><circle cx="${270+(i%2)*10}" cy="${y+35}" r="20" fill="#2f9e6e" stroke-width="4"/>`;}
  o+=`</g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">RECUSAR</text><text x="810" y="596" font-size="34" fill="#fbe9cf" text-anchor="middle" stroke="none">fica com a dívida… e o mistério</text>`;
  o+=`<g transform="translate(1620 0) scale(-1 1)">${lonaCarro(810,860,.42,true,t)}</g><text x="810" y="790" font-size="100" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="12" paint-order="stroke fill">?</text></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud6();
};
// ===== Episódio 6 (Dia 6): "Recusou… e o Kléber vingou-se" =====
const D6=25;
function hud7(div=81050,cli=21,t=1,cliPop=-1){
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `${hud(D6,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="${cli<10?'#ff5a4a':'#5fe08a'}" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// contrato a rasgar ao meio (r de 0 a 1)
function contrato(x,y,s,r){
  const half=(side)=>{const dx=side*r*170, rot=side*r*14;
    return `<g transform="translate(${dx} ${r*30}) rotate(${rot} ${side*200} 0)"><clipPath id="ct${side<0?'l':'r'}"><path d="${side<0?'M-260,-320 H6 L-14,-200 L10,-60 L-12,60 L8,200 L-10,320 H-260 Z':'M260,-320 H6 L-14,-200 L10,-60 L-12,60 L8,200 L-10,320 H260 Z'}"/></clipPath><g clip-path="url(#ct${side<0?'l':'r'})"><rect x="-250" y="-310" width="500" height="620" rx="10" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><text x="0" y="-220" font-size="40" fill="#1b1420" text-anchor="middle" stroke="none">PROPOSTA DE COMPRA</text><path d="M-200,-190 H200" stroke-width="5"/><text x="0" y="-60" font-size="110" fill="#2f9e6e" text-anchor="middle" stroke="none">R$ 40.000</text><text x="0" y="20" font-size="44" fill="#1b1420" text-anchor="middle" stroke="none">pela oficina</text>${[110,160,210].map(yy=>`<path d="M-190,${yy} H190" stroke="#bdb6a6" stroke-width="10"/>`).join('')}<text x="120" y="280" font-family="PM" font-size="40" fill="#1f6fd6" text-anchor="middle" stroke="none">Kléber</text></g></g>`;};
  return `<g transform="translate(${x} ${y}) scale(${s})">${half(-1)}${half(1)}</g>`;
}

// 1 · Frame 0 para quem nunca viu: rasga R$ 40 mil, a lona brilha atrás
SH.f6abre=(t,dur)=>{
  let o=raios('#c8402f',t,1000,.1);
  o+=`<g transform="translate(1260 -40) scale(-1 1)">${lonaCarro(620,1180,1.05,true,t)}</g>`;
  o+=`<circle cx="${1260-80*1.05-0}" cy="1180" r="${150+Math.sin(t*6)*20}" fill="#fff6c4" opacity=".2" stroke="none"/>`;
  o+=nando({x:300,y:2150,s:1.15,face:'contente',hold:null,pose:'normal'});
  const r=t<.25?0:ease(clamp((t-.25)/.5,0,1));
  o+=contrato(330,1330,.95,r);
  o+=ono('RRRASGA!',330,960,t,.3,'#fff',-8,110);
  o+=`<g transform="translate(540 470) rotate(-3)"><rect x="-480" y="-150" width="960" height="290" rx="30" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-40" font-size="88" fill="#fff" text-anchor="middle" stroke="none">ELE RECUSOU R$ 40 MIL…</text><text x="0" y="78" font-size="96" fill="#f6c744" text-anchor="middle" stroke="none">POR CAUSA DISTO</text></g>`;
  o+=`<g transform="translate(${880+Math.sin(t*8)*10} 900) rotate(60)"><path d="M0,0 L-70,-36 L-56,0 L-70,36 Z" fill="#f6c744" stroke="#1b1420" stroke-width="6"/><path d="M-56,0 H-200" stroke="#1b1420" stroke-width="28"/><path d="M-56,0 H-200" stroke="#f6c744" stroke-width="14"/></g>`;
  return o+hud7();
};
// 2 · Contexto em 3 s para quem chegou agora
SH.f6contexto=(t,dur)=>{
  let o=caraNando(t,'preocupado','#1f2340','',0,'#fff',2.4);
  const k=pop(t,.05); o+=`<g transform="translate(540 1450) scale(${k}) rotate(-3)"><rect x="-470" y="-170" width="940" height="340" rx="30" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><text x="0" y="-60" font-size="66" fill="#1b1420" text-anchor="middle" stroke="none">25 DIAS PRA PAGAR</text><text x="0" y="60" font-size="130" fill="#c8402f" text-anchor="middle" stroke="none">R$ 81.050</text><text x="0" y="135" font-size="46" fill="#1b1420" text-anchor="middle" stroke="none">ou perde a oficina do pai</text></g>`;
  return o+hud7();
};
// 3 · O Kléber: "você vai se arrepender"
SH.f6kleber=(t,dur)=>{
  let c=raios('#1f6fd6',t,900,.14); const sh=Math.sin(t*50)*4;
  c+=`<g transform="translate(${sh} 0)">${kleber({x:540,y:900+1050*2.2,s:2.2,face:'raiva',pose:'normal'})}</g>`;
  if(t>.3){const k=pop(t,.3);c+=`<g transform="translate(540 1560) scale(${k}) rotate(-3)"><rect x="-470" y="-100" width="940" height="200" rx="40" fill="#1b1420"/><text x="0" y="-8" font-family="PM" font-size="62" fill="#fff" text-anchor="middle" stroke="none">Você vai se</text><text x="0" y="70" font-family="PM" font-size="72" fill="#ff5a4a" text-anchor="middle" stroke="none">ARREPENDER.</text></g>`;}
  return c+hud7();
};
// 4 · A vingança: troca de óleo a R$ 9,90 do outro lado da rua
SH.f6promo=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="420" width="1040" height="1100" fill="#eef3f7"/><rect x="0" y="400" width="1080" height="40" fill="#1f6fd6"/><rect x="80" y="480" width="920" height="200" rx="30" fill="#10233c"/><g filter="url(#glow)" stroke="none"><text x="540" y="630" font-size="140" fill="#49f2ff" text-anchor="middle">SPEEDFIX</text></g>`;
  for(let k=0;k<3;k++){const x=60+k*330; o+=`<rect x="${x}" y="800" width="300" height="720" fill="#7fd0f0"/>`;}
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="#3d3a42" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/><path d="M0,1760 h1080" stroke="#f2c230" stroke-width="10" stroke-dasharray="90 60"/>`;
  // faixa gigante a cair
  const drop=ease(clamp((t-.2)/.4,0,1)); const by=-400+drop*1150, sw=Math.sin(t*4)*2;
  o+=`<g transform="translate(540 ${by}) rotate(${sw})"><path d="M-480,-20 V-120 M480,-20 V-120" stroke-width="10"/><rect x="-500" y="-20" width="1000" height="380" rx="20" fill="#ffe14a" stroke="#1b1420" stroke-width="12"/><text x="0" y="90" font-size="92" fill="#1b1420" text-anchor="middle" stroke="none">TROCA DE ÓLEO</text><text x="0" y="250" font-size="190" fill="#e0483a" text-anchor="middle" stroke="none">R$ 9,90</text><text x="0" y="330" font-size="42" fill="#1b1420" text-anchor="middle" stroke="none">SÓ HOJE · PRA SEMPRE</text></g>`;
  // carros a atravessar a rua da esquerda (oficina) para a SpeedFix
  const car=(x,c)=>`<g><path d="M${x},1700 v-60 q0,-24 28,-28 l36,-4 q24,-46 70,-50 h78 q40,4 60,50 l24,4 q24,4 24,28 v60 Z" fill="${c}"/><path d="M${x+74},1612 q20,-34 56,-38 h34 v38 Z M${x+180},1612 v-38 h24 q28,4 46,38 Z" fill="#bfe3ea" stroke-width="5"/><circle cx="${x+70}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/><circle cx="${x+230}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/></g>`;
  const p=Math.max(0,t-1.4)*260; o+=`<g transform="translate(${-900+p} 0)">${car(40,'#f2c230')+car(390,'#ef4f6b')+car(740,'#5fd17c')}</g>`;
  if(t>1.0) o+=ono('BLIM BLIM!',820,1440,t,1.0,'#fff',8,80);
  return o+hud7();
};
// 5 · Oficina vazia: os clientes foram todos
SH.f6vazio=(t,dur)=>{
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  // feno a rolar
  const tx=1200-((t*320)%1500), rr=t*300; o+=`<g transform="translate(${tx} 1640) rotate(${-rr})"><circle r="70" fill="none" stroke="#c9a35a" stroke-width="10"/><path d="M-60,-20 Q0,40 60,-10 M-50,30 Q0,-40 50,40 M-30,-60 Q10,0 -20,60" fill="none" stroke="#c9a35a" stroke-width="8"/></g>`;
  o+=nando({x:380,y:1920,s:.8,face:'preocupado',hold:null,pose:'cruzados'});
  o+=turbo({x:820,y:1900,s:.45,mood:'calmo'});
  const cli=Math.max(4,Math.round(21-17*ease(clamp((t-.3)/1.6,0,1))));
  if(t>.3) o+=ono(`−${21-cli} CLIENTES`,540,640,t,.4,'#ff5a4a',-6,110);
  o+=ono('…',780,1180,t,1.2,'#fff',0,140);
  return cam(o,t,dur,1.0,1.05)+hud7(81050,cli,t,.3);
};
// 6 · Noite: o Nando sozinho com a lona
SH.f6noite=(t,dur)=>{
  let o=interior({wall:'#3a3550',tile:'#1f3d4a',tileLine:'#2c5566',floor:'#4a2a2a',floorLine:'#3a2020'});
  o+=`<rect width="1080" height="1920" fill="#0a0820" opacity=".45" stroke="none"/>`;
  const sw=Math.sin(t*1.6)*8; o+=`<g transform="rotate(${sw} 540 0)"><path d="M540,0 V260" stroke-width="5"/><rect x="526" y="260" width="28" height="30" rx="4" fill="#4a4048"/><path d="M520,290 q20,60 40,0 Z" fill="#fff6c4"/></g><path d="M${540+sw*6},300 L${200+sw*20},1700 L${880+sw*20},1700 Z" fill="#fff6c4" opacity=".08" stroke="none"/>`;
  const lift=ease(clamp((t-2.2)/1.2,0,1));
  o+=`<g transform="translate(1180 0) scale(-1 1)">${lonaCarro(620,1560,.95,false,t)}</g>`;
  // canto levantado: roda de raios cromada a brilhar
  if(lift>0){ o+=`<g opacity="${lift}"><circle cx="760" cy="1610" r="${70*lift}" fill="#2a2522" stroke-width="7"/><circle cx="760" cy="1610" r="${46*lift}" fill="#e8edf0" stroke-width="5"/>`; for(let k=0;k<12;k++){const a=k*Math.PI/6+t; o+=`<path d="M760,1610 l${Math.cos(a)*44*lift},${Math.sin(a)*44*lift}" stroke="#9aa3a8" stroke-width="3"/>`;} o+=`<circle cx="760" cy="1610" r="12" fill="#f6c744" stroke-width="3"/></g>`;
    o+=`<path d="M680,${1520-lift*60} Q760,${1460-lift*90} 860,${1520-lift*40}" fill="#b0a66b" stroke-width="6"/>`;
    o+=`<circle cx="760" cy="1610" r="${130+Math.sin(t*6)*15}" fill="#f6c744" opacity="${.18*lift}" stroke="none"/>`; }
  o+=`<g transform="translate(${-lift*60} 0)">${nando({x:380,y:1960,s:.85,face:lift>.5?'choque':'normal',hold:null,pose:'normal'})}</g>`;
  if(t>3.2) o+=ono('RAIOS CROMADOS?!',540,1080,t,3.2,'#f6c744',-5,80);
  return cam(o,t,dur,1.0,1.08,620,1500)+hud7(81050,4);
};
// 7 · Áudio do pai a chegar
SH.f6audio=(t,dur)=>{
  let o=raios('#2f9e6e',t,1000,.08);
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#ece5dd" stroke="none"/>`;
  o+=`<path d="M180,460 Q180,410 228,410 H852 Q900,410 900,460 V540 H180 Z" fill="#075e54" stroke="none"/><text x="540" y="492" font-size="44" fill="#fff" text-anchor="middle" stroke="none">PAI · 23:47</text>`;
  if(t>.2){const k=pop(t,.2);o+=`<g transform="translate(220 640) scale(${k}) translate(-220 -640)"><rect x="210" y="600" width="660" height="150" rx="40" fill="#fff" stroke="#b9b2a2" stroke-width="3"/><circle cx="290" cy="675" r="44" fill="#25d366"/><path d="M276,652 v46 l38,-23 Z" fill="#fff" stroke="none"/>`;
    for(let i=0;i<20;i++){const h=10+Math.abs(Math.sin(i*1.7+t*8))*40;o+=`<rect x="${360+i*22}" y="${675-h/2}" width="11" height="${h}" rx="5" fill="#4a8f5a" stroke="none"/>`;}
    o+=`<text x="850" y="740" font-size="26" fill="#6b8f6b" text-anchor="end" stroke="none">0:06</text></g>`;}
  if(t>1.2){const k=pop(t,1.2);o+=`<g transform="translate(540 1150) scale(${k}) rotate(-2)"><rect x="-430" y="-200" width="860" height="400" rx="34" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-100" font-family="PM" font-size="50" fill="#1b1420" text-anchor="middle" stroke="none">"Filho… se apertar mesmo…</text><text x="0" y="-20" font-family="PM" font-size="50" fill="#1b1420" text-anchor="middle" stroke="none">a chave tá na</text><text x="0" y="80" font-family="PM" font-size="62" fill="#c8402f" text-anchor="middle" stroke="none">lata de biscoito.</text><text x="0" y="160" font-family="PM" font-size="44" fill="#1b1420" text-anchor="middle" stroke="none">Mas só se apertar!"</text></g>`;}
  o+=ono('PLIM',820,560,t,.2,'#5fe08a',8,80);
  return o+hud7(81050,4);
};
// 8 · A lata: a chave
SH.f6chave=(t,dur)=>{
  if(t>2.2) return caraNando(t-2.2,'choque','#7a3f9e','A CHAVE!',.05,'#f6c744')+hud7(81050,4);
  let o=raios('#1f2340',t,1100,.12);
  const open=ease(clamp((t-.3)/.5,0,1));
  o+=`<g transform="translate(540 1300)"><ellipse cx="0" cy="190" rx="300" ry="50" fill="#000" opacity=".3" stroke="none"/><rect x="-260" y="-80" width="520" height="280" rx="30" fill="#2f6fb3" stroke="#1b1420" stroke-width="10"/><path d="M-260,-20 H260 M-260,140 H260" stroke="#f6c744" stroke-width="12"/><text x="0" y="80" font-size="70" fill="#fff" text-anchor="middle" stroke="none">BISCOITOS</text>`;
  o+=`<g transform="translate(${open*240} ${-open*240}) rotate(${open*30})"><ellipse cx="0" cy="-80" rx="280" ry="50" fill="#245a92" stroke="#1b1420" stroke-width="10"/></g>`;
  if(open>.5){ const up=ease(clamp((t-.7)/.6,0,1))*260; o+=`<g transform="translate(0 ${-up})"><circle cx="0" cy="-160" r="${140*open}" fill="#f6c744" opacity=".25" stroke="none"/><circle cx="-40" cy="-160" r="36" fill="none" stroke="#c9a35a" stroke-width="16"/><path d="M-4,-160 H120 M90,-160 v30 M110,-160 v22" stroke="#c9a35a" stroke-width="16"/><rect x="-140" y="-120" width="110" height="70" rx="10" fill="#fffaf0" stroke="#1b1420" stroke-width="5" transform="rotate(-12 -85 -85)"/><text x="-85" y="-72" font-family="PM" font-size="40" fill="#c8402f" text-anchor="middle" stroke="none" transform="rotate(-12 -85 -85)">?</text></g>`; }
  o+=`</g>`;
  if(t>.8) o+=ono('BRILHO!',820,820,t,.8,'#f6c744',8,80);
  return o+hud7(81050,4);
};
// 9 · Votação: DESTAPAR ✕ ESPERAR
SH.f6votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#c8402f" stroke="none"/><rect x="540" width="540" height="1920" fill="#2f6fb3" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.05)/.3)), R=600*(1-ease((t-.2)/.3));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">DESTAPAR</text><text x="270" y="596" font-size="34" fill="#fde2dd" text-anchor="middle" stroke="none">usar a chave hoje</text>`;
  o+=`<g transform="translate(270 820) rotate(-20)"><circle cx="-60" cy="0" r="46" fill="none" stroke="#f6c744" stroke-width="20"/><path d="M-14,0 H120 M90,0 v36 M112,0 v26" stroke="#f6c744" stroke-width="20"/></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">ESPERAR</text><text x="810" y="596" font-size="34" fill="#d6e6fb" text-anchor="middle" stroke="none">o pai disse: só se apertar</text>`;
  o+=`<g transform="translate(1620 0) scale(-1 1)">${lonaCarro(810,860,.42,true,t)}</g><text x="810" y="790" font-size="100" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="12" paint-order="stroke fill">?</text></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud7(81050,4);
};
// ===== Episódio 7 (Dia 7): "Ele guardou a chave… e o Kléber errou" =====
const D7=24;
function hud8(div=81050,cli=4,t=1,cliPop=-1){
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `${hud(D7,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="${cli<10?'#ff5a4a':'#5fe08a'}" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// selo pequeno "VOCÊ DECIDE NO FINAL"
function selo7(t,t0=0){ if(t<t0) return ''; const k=pop(t,t0,.3), b=1+.04*Math.sin(t*5);
  return `<g transform="translate(860 330) scale(${k*b}) rotate(4)"><rect x="-190" y="-44" width="380" height="88" rx="18" fill="#e0483a" stroke="#1b1420" stroke-width="7"/><text x="-20" y="-2" font-size="34" fill="#fff" text-anchor="middle" stroke="none">VOCÊ DECIDE</text><text x="-20" y="34" font-size="30" fill="#f6c744" text-anchor="middle" stroke="none">NO FINAL</text><path d="M140,-14 v34 m-16,-16 l16,16 l16,-16" fill="none" stroke="#fff" stroke-width="8"/></g>`; }
function lata7(x,y,s,open){ // lata de biscoito com tampa (open 0..1)
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="190" rx="300" ry="50" fill="#000" opacity=".3" stroke="none"/><rect x="-260" y="-80" width="520" height="280" rx="30" fill="#2f6fb3" stroke="#1b1420" stroke-width="10"/><path d="M-260,-20 H260 M-260,140 H260" stroke="#f6c744" stroke-width="12"/><text x="0" y="80" font-size="70" fill="#fff" text-anchor="middle" stroke="none">BISCOITOS</text><g transform="translate(${open*200} ${-open*220}) rotate(${open*24})"><ellipse cx="0" cy="-80" rx="280" ry="50" fill="#245a92" stroke="#1b1420" stroke-width="10"/></g></g>`; }
function chave7(x,y,s,rot){ return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle cx="-40" cy="0" r="36" fill="none" stroke="#c9a35a" stroke-width="16"/><path d="M-4,0 H120 M90,0 v30 M110,0 v22" stroke="#c9a35a" stroke-width="16"/></g>`; }
function fumo7(t,x,y,n=6,sc=1){ let o=''; for(let i=0;i<n;i++){const ph=(t*.9+i/n)%1, r=(40+ph*110)*sc; o+=`<circle cx="${x-ph*260*sc+Math.sin(i*2+t*3)*20}" cy="${y-ph*320*sc}" r="${r}" fill="#9aa0a6" opacity="${.55*(1-ph)}" stroke="none"/>`;} return o; }

// 1 · Frame 0: a chave em cima da lona… volta para a lata (CLACK)
SH.g7chave=(t,dur)=>{
  let o=interior({wall:'#3a3550',tile:'#1f3d4a',tileLine:'#2c5566',floor:'#4a2a2a',floorLine:'#3a2020'});
  o+=`<rect width="1080" height="1920" fill="#0a0820" opacity=".45" stroke="none"/>`;
  o+=`<g transform="translate(1180 0) scale(-1 1)">${lonaCarro(620,1560,.95,true,t)}</g>`;
  const back=ease(clamp((t-1.0)/1.0,0,1)); // chave desce para a lata
  const kx=640-back*360, ky=980+back*330, rot=-20+back*80+Math.sin(t*5)*6*(1-back);
  const shut=t>2.1?ease(clamp((t-2.1)/.15,0,1)):0;
  o+=lata7(260,1340,.62,1-shut);
  if(t<2.15){ o+=`<circle cx="${kx}" cy="${ky}" r="${90+Math.sin(t*8)*10}" fill="#f6c744" opacity=".28" stroke="none"/>`+chave7(kx,ky,1.3,rot); }
  if(t>=2.1) o+=ono('CLACK!',300,1080,t,2.1,'#fff',-8,110);
  o+=`<g transform="translate(540 450) rotate(-3)"><rect x="-480" y="-150" width="960" height="290" rx="30" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-40" font-size="84" fill="#fff" text-anchor="middle" stroke="none">ELE TINHA A CHAVE…</text><text x="0" y="78" font-size="96" fill="#f6c744" text-anchor="middle" stroke="none">E NÃO USOU</text></g>`;
  return cam(o,t,dur,1.0,1.06,540,1300)+hud8();
};
// 2 · Os votos: 62% ESPERAR
SH.g7votos=(t,dur)=>{
  let o=fundoEscuro(t);
  o+=`<g transform="translate(540 380) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="84" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS DECIDIRAM</text></g>`;
  const f=ease(t/.8), bw=900, e=bw*.62*f;
  o+=`<rect x="90" y="500" width="${bw}" height="120" rx="60" fill="#c8402f" stroke="#1b1420" stroke-width="8"/><rect x="90" y="500" width="${Math.max(120,e)}" height="120" rx="60" fill="#2f6fb3" stroke="#1b1420" stroke-width="8"/>`;
  o+=`<text x="120" y="582" font-size="56" fill="#fff" stroke="none">ESPERAR ${Math.round(62*f)}%</text><text x="960" y="582" font-size="40" fill="#fff" text-anchor="end" stroke="none">DESTAPAR 38%</text>`;
  o+=cartao3d(540,860,'thiago_trumpet_','Primeiro fixa Esperar!','#2f6fb3',t,.5,{rot:-4});
  o+=cartao3d(540,1090,'bart_inglese','destapar 😅','#c8402f',t,1.2,{rot:3,w:700});
  o+=`<g transform="translate(540 2080)">${''}</g>`+nando({x:540,y:2120,s:.62,face:'contente',hold:null,pose:'normal'});
  return o+hud8();
};
// 3 · A conta: 24 dias · 81 mil · 4 clientes  (+ selo)
SH.g7conta=(t,dur)=>{
  let o=caraNando(t,'preocupado','#1f2340','',0,'#fff',2.4);
  const k=pop(t,.05); o+=`<g transform="translate(540 1450) scale(${k}) rotate(-3)"><rect x="-470" y="-190" width="940" height="380" rx="30" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><text x="0" y="-80" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">24 DIAS</text><text x="0" y="50" font-size="130" fill="#c8402f" text-anchor="middle" stroke="none">R$ 81.050</text><text x="0" y="140" font-size="58" fill="#1b1420" text-anchor="middle" stroke="none">SÓ <tspan fill="#c8402f">4</tspan> CLIENTES</text></g>`;
  return o+hud8()+selo7(t,.15);
};
// 4 · Um Gol a deitar fumo entra na oficina
SH.g7gol=(t,dur)=>{
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  const x=1500-ease(clamp(t/1.1,0,1))*960, sh=Math.sin(t*40)*4;
  o+=fumo7(t,x+300,1540,7,1.1);
  o+=`<g transform="translate(0 ${sh})">${carroVelho({x,y:1700,s:1.25,color:'#e8e2d0'})}</g>`;
  o+=`<g transform="translate(${x} 1300)"><rect x="-80" y="-50" width="160" height="80" rx="14" fill="#1b1420"/><text x="0" y="14" font-size="56" fill="#fff" text-anchor="middle" stroke="none">GOL</text></g>`;
  o+=ono('COF COF!',780,1060,t,.5,'#fff',8,100);
  return o+hud8()+selo7(t);
};
// 5 · O cliente: "fiz a troca de 9,90 no Kléber… motor batendo!"
SH.g7cliente=(t,dur)=>{
  let o=raios('#e08a2f',t,1000,.1);
  o+=fumo7(t,900,1300,5,.8);
  o+=`<g transform="translate(${Math.sin(t*3)*6} 0)">${armando({x:540,y:900+1050*2.0,s:2.0,face:'feliz'})}</g>`;
  o+=`<g transform="translate(540 600) rotate(-3)"><rect x="-300" y="-60" width="600" height="110" rx="20" fill="#1b1420"/><text x="0" y="20" font-size="70" fill="#fff" text-anchor="middle" stroke="none">SEU ARNALDO</text></g>`;
  if(t>.3){const k=pop(t,.3);o+=`<g transform="translate(540 1400) scale(${k}) rotate(3)"><rect x="-440" y="-90" width="880" height="180" rx="30" fill="#ffe14a" stroke="#1b1420" stroke-width="10"/><text x="0" y="-10" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">ÓLEO DE R$ 9,90</text><text x="0" y="62" font-size="54" fill="#c8402f" text-anchor="middle" stroke="none">NO KLÉBER</text></g>`;}
  if(t>2.6){ o+=ono('TEC TEC TEC!',540,1150,t,2.6,'#ff5a4a',-6,100); }
  return o+hud8()+selo7(t);
};
// 6 · Nando: "ele botou óleo errado!"
SH.g7nando=(t,dur)=>{
  let o=caraNando(t,'choque','#c8402f','',0,'#fff',2.5);
  const k=pop(t,.2), sw=Math.sin(t*4)*5;
  o+=`<g transform="translate(830 1380) rotate(${12+sw}) scale(${k})"><rect x="-90" y="-210" width="180" height="300" rx="26" fill="#2b2b33" stroke="#1b1420" stroke-width="9"/><rect x="-40" y="-260" width="80" height="60" rx="10" fill="#c8402f" stroke="#1b1420" stroke-width="8"/><rect x="-70" y="-120" width="140" height="130" rx="10" fill="#fffaf0" stroke="#1b1420" stroke-width="5"/><text x="0" y="-62" font-size="40" fill="#1b1420" text-anchor="middle" stroke="none">ÓLEO</text><text x="0" y="-12" font-size="34" fill="#c8402f" text-anchor="middle" stroke="none">2T MOTO</text></g>`;
  if(t>.6) o+=`<g transform="translate(540 1650) rotate(-4) scale(${pop(t,.6)})"><rect x="-440" y="-90" width="880" height="180" rx="30" fill="#1b1420"/><text x="0" y="30" font-size="96" fill="#ff5a4a" text-anchor="middle" stroke="none">ÓLEO ERRADO!</text></g>`;
  return o+hud8()+selo7(t);
};
// 7 · O dinheiro: +R$ 1.200, a dívida desce; o cliente traz mais 5
SH.g7grana=(t,dur)=>{
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  const pay=ease(clamp((t-.2)/.8,0,1));
  const div=Math.round(81050-1200*ease(clamp((t-.6)/1.2,0,1)));
  o+=nando({x:330,y:1920,s:.8,face:'contente',hold:null,pose:t>3.3?'vitoria':'normal'});
  o+=armando({x:800,y:1920,s:.75,face:'feliz',flip:true});
  // notas a voar para o Nando
  for(let i=0;i<5;i++){ const p=clamp(pay*1.4-i*.12,0,1); if(p<=0) continue; const x=760-p*380+i*14, y=1100-Math.sin(p*Math.PI)*200+i*30; o+=`<g transform="translate(${x} ${y}) rotate(${-20+i*9})"><rect x="-80" y="-40" width="160" height="80" rx="8" fill="#5fd17c" stroke="#1b1420" stroke-width="6"/><text x="0" y="16" font-size="40" fill="#1b1420" text-anchor="middle" stroke="none">R$</text></g>`; }
  if(t>.3) o+=ono('+R$ 1.200',540,700,t,.3,'#5fe08a',-6,140);
  // +5 clientes a entrar (aos 3,5 s locais = "trouxe mais cinco")
  const cliPop=3.7, cli=t>=cliPop?9:4;
  if(t>=cliPop){ for(let i=0;i<5;i++){const p=ease(clamp((t-cliPop-i*.12)/.5,0,1)); o+=`<g transform="translate(${1180-p*(420-i*70)} ${1260+i*14}) scale(.9)"><circle cx="0" cy="-90" r="40" fill="#e2b48c" stroke="#1b1420" stroke-width="6"/><path d="M-50,40 Q-50,-40 0,-44 Q50,-40 50,40 Z" fill="${['#2f9e6e','#e0483a','#7a3f9e','#f6c744','#4cc3f0'][i]}" stroke="#1b1420" stroke-width="6"/></g>`;}
    o+=ono('+5 CLIENTES!',540,880,t,cliPop,'#f6c744',6,100); }
  return o+hud8(div,cli,t,cliPop)+selo7(t);
};
// 8 · "E esse carro aí debaixo da lona… tá à venda?"
SH.g7lona=(t,dur)=>{
  let o=interior({wall:'#e9d9b0'});
  o+=`<g transform="translate(1180 0) scale(-1 1)">${lonaCarro(560,1560,1.0,true,t)}</g>`;
  o+=`<circle cx="760" cy="1440" r="${180+Math.sin(t*5)*20}" fill="#f6c744" opacity=".15" stroke="none"/>`;
  o+=armando({x:260,y:1960,s:.85,face:'feliz'});
  // braço a apontar (seta)
  o+=`<g transform="translate(${470+Math.sin(t*6)*12} 1180) rotate(25)"><path d="M0,0 L-70,-36 L-56,0 L-70,36 Z" fill="#f6c744" stroke="#1b1420" stroke-width="6" transform="rotate(180)"/><path d="M0,0 H180" stroke="#1b1420" stroke-width="28"/><path d="M0,0 H180" stroke="#f6c744" stroke-width="14"/></g>`;
  if(t>1.2) o+=`<g transform="translate(540 620) rotate(-3) scale(${pop(t,1.2)})"><rect x="-440" y="-110" width="880" height="220" rx="34" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-10" font-family="PM" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">"Esse carro aí…</text><text x="0" y="74" font-family="PM" font-size="76" fill="#c8402f" text-anchor="middle" stroke="none">TÁ À VENDA?"</text></g>`;
  return cam(o,t,dur,1.0,1.08,760,1450)+hud8(79850,9)+selo7(t);
};
// 9 · A prova: frasco de óleo errado + recibo SPEEDFIX
SH.g7prova=(t,dur)=>{
  let o=raios('#1f2340',t,1000,.12);
  const k=pop(t,.05);
  o+=`<g transform="translate(540 1150) scale(${k}) rotate(-5)"><rect x="-300" y="-420" width="600" height="840" rx="14" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><rect x="-300" y="-420" width="600" height="130" fill="#10233c" stroke="#1b1420" stroke-width="10"/><text x="0" y="-330" font-size="80" fill="#49f2ff" text-anchor="middle" stroke="none">SPEEDFIX</text><text x="0" y="-210" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">RECIBO</text><text x="-250" y="-110" font-size="44" fill="#1b1420" stroke="none">TROCA DE ÓLEO</text><text x="250" y="-110" font-size="44" fill="#1b1420" text-anchor="end" stroke="none">9,90</text><text x="-250" y="-30" font-size="44" fill="#1b1420" stroke="none">ÓLEO 2T MOTO</text><text x="250" y="-30" font-size="44" fill="#1b1420" text-anchor="end" stroke="none">✓</text>${[60,130,200].map(yy=>`<path d="M-250,${yy} H250" stroke="#bdb6a6" stroke-width="10"/>`).join('')}<text x="120" y="330" font-family="PM" font-size="50" fill="#1f6fd6" text-anchor="middle" stroke="none">Kléber</text></g>`;
  if(t>.5){ const c=ease(clamp((t-.5)/.4,0,1)); o+=`<ellipse cx="410" cy="1110" rx="${330*c}" ry="${80*c}" fill="none" stroke="#e0483a" stroke-width="12" transform="rotate(-5 540 1150)"/>`; }
  if(t>.7) o+=ono('A PROVA!',540,560,t,.7,'#f6c744',-6,130);
  return o+hud8(79850,9)+selo7(t);
};
// 10 · Votação: EXPOR ✕ CALAR (curta)
SH.g7votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#c8402f" stroke="none"/><rect x="540" width="540" height="1920" fill="#2f6fb3" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.05)/.3)), R=600*(1-ease((t-.2)/.3));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="110" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">EXPOR</text><text x="270" y="596" font-size="34" fill="#fde2dd" text-anchor="middle" stroke="none">postar a prova hoje</text>`;
  o+=`<g transform="translate(270 820) rotate(-8)"><rect x="-90" y="-150" width="180" height="300" rx="26" fill="#1d1d24" stroke="#1b1420" stroke-width="8"/><rect x="-74" y="-130" width="148" height="250" rx="14" fill="#fffaf0" stroke="none"/><circle cx="0" cy="-40" r="34" fill="#e0483a" stroke="none"/><text x="0" y="-26" font-size="40" fill="#fff" text-anchor="middle" stroke="none">!</text><text x="0" y="60" font-size="30" fill="#1b1420" text-anchor="middle" stroke="none">SPEEDFIX</text><text x="0" y="96" font-size="26" fill="#e0483a" text-anchor="middle" stroke="none">GOLPE?</text></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="110" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">CALAR</text><text x="810" y="596" font-size="34" fill="#d6e6fb" text-anchor="middle" stroke="none">roubar os clientes devagar</text>`;
  o+=`<g transform="translate(810 820)"><circle r="120" fill="#f6c744" stroke="#1b1420" stroke-width="9"/><circle cx="-40" cy="-30" r="14" fill="#1b1420" stroke="none"/><circle cx="40" cy="-30" r="14" fill="#1b1420" stroke="none"/><path d="M-50,40 H50" stroke="#1b1420" stroke-width="10"/><path d="M-40,28 v24 M-20,28 v24 M0,28 v24 M20,28 v24 M40,28 v24" stroke="#1b1420" stroke-width="5"/></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud8(79850,9);
};
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
// ===== 2 FACTOS — "O teu olho tem um buraco" (ponto cego + dedos magnéticos) =====
function hookOlho(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="70" fill="${FK}" text-anchor="middle" stroke="none">2 FACTOS QUE O TEU</text><text x="540" y="318" font-family="M" font-weight="900" font-size="70" fill="#e0483a" text-anchor="middle" stroke="none">CORPO TE ESCONDE</text></g>`; }
function hookDedos(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="66" fill="${FK}" text-anchor="middle" stroke="none">OS TEUS DEDOS VÃO</text><text x="540" y="318" font-family="M" font-weight="900" font-size="66" fill="#e0483a" text-anchor="middle" stroke="none">MEXER-SE SOZINHOS</text></g>`; }
// X à esquerda, bola à direita (para o olho DIREITO: fechar o esquerdo, fixar o X)
function testeCego(t,z,dotOn){
  // X e bola o mais afastados possível (≈5 cm num telemóvel) → a bola some a ~20 cm do olho
  let o=`<rect x="20" y="640" width="1040" height="320" rx="40" fill="#0d0d1a" stroke="#2a2a44" stroke-width="6"/>`;
  o+=`<g transform="translate(110 800)"><path d="M-45,-45 L45,45 M45,-45 L-45,45" stroke="#fff" stroke-width="22" stroke-linecap="round"/></g>`;
  if(dotOn) o+=`<circle cx="975" cy="800" r="48" fill="${FY}" stroke="none"/>`;
  return o;
}
function olhoIcon(x,y,s,fechado){
  let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linecap="round">`;
  if(fechado) o+=`<path d="M-90,0 Q0,60 90,0" fill="none" stroke="#fff" stroke-width="14"/><path d="M-60,30 l-14,26 M0,46 v28 M60,30 l14,26" stroke="#fff" stroke-width="10"/>`;
  else o+=`<path d="M-100,0 Q0,-80 100,0 Q0,80 -100,0 Z" fill="#fff"/><circle r="34" fill="#4cc3f0"/><circle r="16" fill="${FK}"/><circle cx="8" cy="-8" r="6" fill="#fff" stroke="none"/>`;
  return o+`</g>`;
}
// 2.º facto · O teste do ponto cego — sem aproximar: fixa o X ~5 s e a bola some
// local: 0–3,2 "o teu olho tem um buraco"; 3,28–6,8 fecha o esquerdo; 6,8–11,88 fixa (silêncio); 11,88 sumiu
FP.olho=(t,dur)=>{
  // local: 0,03 "olha para o X"; 1,63 fecha o esquerdo; 2,92 foca; silêncio; 8,11 "de repente"; 9,14 desaparece
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const gone=t>=9.31;
  o+=testeCego(t,1,true);
  if(t<3.09){ const k=pop(t,0); const bob=10*Math.sin(t*7); o+=`<g transform="translate(0 ${bob})">`+maoAponta(150,880,k*1.0,-14)+`</g>`; }
  if(t>1.65&&t<3.09){ o+=olhoIcon(430,1420,1.1,true)+olhoIcon(730,1420,1.1,false); o+=fTxt(430,1560,'FECHA',54,'#e0483a')+fTxt(730,1560,'OLHA O X',54,'#5fe08a'); }
  if(t>=3.09&&!gone){ const k=pop(t,3.09);
    o+=`<g transform="translate(540 1220) scale(${k})">${fTxt(0,0,'FOCA SÓ NO X',90,FY)}${fTxt(0,100,'NÃO PISQUES...',70,'#fff')}</g>`;
    const r=70+12*Math.sin(t*4); o+=`<circle cx="110" cy="800" r="${r}" fill="none" stroke="#5fe08a" stroke-width="6" opacity=".7"/>`; }
  if(gone) o+=fStamp(t,9.31,540,1250,'SUMIU?','#e0483a',140,-8);
  return o+fPill('FACTO 2/2',t);
};
// 2 · Explicação: corte do olho com o ponto cego (11,5 – 19,3 s)
FP.cego=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  o+=`<g transform="translate(540 1050)" stroke="${FK}" stroke-width="10"><circle r="330" fill="#fff"/><circle r="300" fill="#ffd9d9" stroke="none"/>`;
  o+=`<path d="M-330,-90 Q-380,0 -330,90" fill="#4cc3f0"/><ellipse cx="-300" cy="0" rx="40" ry="110" fill="#bfe8ff"/>`;
  for(let k=0;k<26;k++){const a=-1.2+k*0.095; if(Math.abs(a-0.18)<0.12) continue; o+=`<circle cx="${Math.cos(a)*285}" cy="${Math.sin(a)*285}" r="9" fill="#e0483a" stroke="none"/>`;}
  // nervo ótico
  o+=`<path d="M270,30 Q380,60 460,40 L460,140 Q380,150 270,90 Z" fill="#f6c744"/>`;
  const g=.5+.5*Math.sin(t*6); o+=`<circle cx="285" cy="55" r="${46+g*10}" fill="none" stroke="#e0483a" stroke-width="12"/>`;
  o+=`</g>`;
  o+=`<path d="M200,1050 L800,1105" stroke="#ffd21f" stroke-width="8" stroke-dasharray="24 16"/>`;
  if(t>.4) o+=fTxt(620,1500,'PONTO CEGO',100,'#e0483a');
  if(t>.8) o+=fTxt(880,960,'NERVO',62,FY);
  if(t>4.23){const k=pop(t,4.23); o+=`<g transform="translate(540 600) scale(${k})">${fTxt(0,0,'O CÉREBRO',100,'#fff')}${fTxt(0,110,'INVENTA O RESTO',80,FY)}</g>`;}
  return o+fPill('FACTO 2/2',1);
};
// 3 · "Mas o segundo facto…" (19,3 – 22,3 s)
FP.pior2=(t,dur)=>{
  const z=1+ease(t/dur)*.15;
  return `<rect width="1080" height="1920" fill="#05060f" stroke="none"/><g transform="translate(540 960) scale(${z}) translate(-540 -960)">${fTxt(540,900,'O 2.º FACTO',130,'#fff')}${fTxt(540,1060,'É AINDA',140,'#e0483a')+fTxt(540,1210,'PIOR',160,'#e0483a')}</g>`;
};
// mãos entrelaçadas vistas de frente, indicadores esticados com afastamento gap
function maosIndicadores(t,gap){
  const SK='#e2b48c', SKD='#c9966c';
  let o=`<g stroke="${FK}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<rect x="250" y="1700" width="230" height="260" fill="#7a3f9e"/><rect x="600" y="1700" width="230" height="260" fill="#2f6fb3"/>`;
  o+=`<path d="M230,1720 Q200,1420 330,1300 L750,1300 Q880,1420 850,1720 Z" fill="${SK}"/>`;
  for(let k=0;k<3;k++){const y=1330+k*70; o+=`<path d="M340,${y} Q540,${y-30} 740,${y}" fill="none" stroke="${SKD}" stroke-width="40"/><path d="M340,${y} Q540,${y-30} 740,${y}" fill="none" stroke="${FK}" stroke-width="6"/>`;}
  o+=`<path d="M330,1500 Q290,1380 330,1300 M750,1500 Q790,1380 750,1300" fill="none" stroke-width="7"/>`;
  // polegares
  o+=`<rect x="470" y="1460" width="66" height="200" rx="33" fill="${SK}" transform="rotate(-8 503 1560)"/><rect x="545" y="1460" width="66" height="200" rx="33" fill="${SK}" transform="rotate(8 578 1560)"/>`;
  // indicadores
  const half=gap/2, top=760;
  const fx=(side)=>540+side*(half+44);
  for(const side of [-1,1]){ const x=fx(side), bend=side*-0.5*(1-gap/240)*20;
    o+=`<g transform="rotate(${bend} ${x} 1300)"><rect x="${x-44}" y="${top}" width="88" height="560" rx="44" fill="${SK}"/><path d="M${x-26},${top+140} h52 M${x-26},${top+330} h52" stroke-width="6" opacity=".6"/><ellipse cx="${x}" cy="${top+50}" rx="28" ry="34" fill="#f2cfb1" stroke-width="5"/></g>`; }
  return o+`</g>`;
}
// 1.º facto · Dedos magnéticos em POV (0 – 12 s)
FP.dedos=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const ext=t<3.05?0:ease((t-3.05)/0.9);
  const open=ease(clamp((t-4.75)/1.5,0,1));
  const close=ease(clamp((t-8.0)/2.9,0,1));
  const trem=(close>0&&close<1)?Math.sin(t*28)*4:0;
  const gap=Math.max(0,260*open*(1-close)+trem);
  const shake=t<1.0?14*(1-t):(t>=1.26&&t<1.6?8:0);
  o+=maosV6(t,gap,shake,ext);
  // flash inicial
  if(t<1.15) o+=fStamp(t,-0.12,540,520,'PARA TUDO!','#e0483a',130,-6);
  if(t>=3.05&&t<4.6) o+=fTxt(540,560,'ESTICA!',110,FY);
  if(t>=4.75&&t<7.2){ o+=fTxt(540,560,'AFASTA!',110,FY);
    const d=20*Math.sin(t*10); o+=`<path d="M${380-d},640 l-70,0 m24,-24 l-24,24 l24,24 M${700+d},640 l70,0 m-24,-24 l24,24 l-24,24" fill="none" stroke="${FY}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`; }
  if(t>=7.29&&t<11.0) o+=fTxt(540,560,'RELAXA...',100,'#fff');
  if(close>0&&close<1) for(let i=0;i<3;i++){const r=40+i*30+((t*80)%30); o+=`<path d="M${540-r},700 a${r},${r} 0 0 1 ${2*r},0" fill="none" stroke="#4cc3f0" stroke-width="5" opacity="${.6-i*.15}"/>`;}
  o+=fStamp(t,11.18,540,560,'ÍMAN!','#e0483a',150,-8);
  return o+(t<3.05?hookDedos(t,3.05):'')+(t>=3.05?fPill('FACTO 1/2',t-3.05):'');
};
// 5 · Quantos aguentaste? 0 · 1 · 2 (30,2 – fim)
FP.fim2=(t,dur)=>{
  if(t>dur-.35) return FP.dedos(0.1,12);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  o+=fTxt(540,640,'QUANTOS',120,'#fff')+fTxt(540,780,'CONSEGUISTE?',115,FY);
  const cols=['#e0483a','#f6c744','#2f9e6e'];
  for(let i=0;i<3;i++){const on=Math.floor(t*5)%3===i; o+=`<g transform="translate(${260+i*280} 1100) scale(${on?1.15:1})"><circle r="115" fill="${cols[i]}" stroke="${FK}" stroke-width="12"/><text y="62" font-family="M" font-weight="900" font-size="180" fill="#fff" text-anchor="middle" stroke="none">${i}</text></g>`;}
  o+=fTxt(540,1420,'COMENTA!',100,'#fff');
  return o;
};
// ===== mãos entrelaçadas detalhadas: indicadores esticados com afastamento gap =====
function maosPolegares(t,gap,shake=0){
  const SK='#eabf98', SKM='#d9a77e', SKD='#b07a58', NAIL='#f7dcd0', NAILD='#d9a596';
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  let o=`<defs>
  <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8d8b8"/><stop offset=".5" stop-color="${SK}"/><stop offset="1" stop-color="#cf9b73"/></linearGradient>
  <linearGradient id="gF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d2b6"/><stop offset=".5" stop-color="#e7b694"/><stop offset="1" stop-color="#c9926c"/></linearGradient>
  <linearGradient id="gT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9926c"/><stop offset=".3" stop-color="#f8d8b8"/><stop offset=".7" stop-color="${SK}"/><stop offset="1" stop-color="#c08a64"/></linearGradient>
  <linearGradient id="gHL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bf8862"/><stop offset=".35" stop-color="#e8b991"/><stop offset="1" stop-color="#f3cba6"/></linearGradient>
  <linearGradient id="gHR" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#bf8862"/><stop offset=".35" stop-color="#e5b48f"/><stop offset="1" stop-color="#f0c6a2"/></linearGradient>
  <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3ee"/><stop offset="1" stop-color="${NAIL}"/></linearGradient></defs>`;
  o+=`<g transform="translate(${sx} ${sy}) translate(540 1500) scale(1.22) translate(-540 -1500)" stroke="${FK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">`;
  // mangas com punho e pregas
  o+=`<path d="M210,1920 L270,1640 L500,1660 L470,1920 Z" fill="#7a3f9e"/><path d="M262,1650 L505,1672 L498,1730 L252,1708 Z" fill="#62307f"/>`;
  o+=`<path d="M870,1920 L810,1640 L580,1660 L610,1920 Z" fill="#2f6fb3"/><path d="M818,1650 L575,1672 L582,1730 L828,1708 Z" fill="#245a93"/>`;
  for(let k=0;k<5;k++){o+=`<path d="M${290+k*45},1662 l-6,48" stroke-width="3" opacity=".45"/><path d="M${600+k*45},1664 l6,48" stroke-width="3" opacity=".45"/>`;}
  o+=`<path d="M300,1780 q60,30 130,10 M330,1850 q50,20 110,5 M780,1780 q-60,30 -130,10 M750,1850 q-50,20 -110,5" fill="none" stroke-width="4" opacity=".4"/>`;
  // massas das mãos com sombra na lateral, vinco da palma e almofada do mindinho
  o+=`<path d="M290,1660 Q236,1510 292,1360 Q330,1272 440,1262 L540,1262 L540,1690 Q400,1702 290,1660 Z" fill="url(#gHL)"/>`;
  o+=`<path d="M790,1660 Q844,1510 788,1360 Q750,1272 640,1262 L540,1262 L540,1690 Q680,1702 790,1660 Z" fill="url(#gHR)"/>`;
  o+=`<path d="M268,1440 q-10,60 6,120 M812,1440 q10,60 -6,120" fill="none" stroke="${SKD}" stroke-width="4" opacity=".7"/>`;
  o+=`<path d="M300,1600 q30,40 90,58 M780,1600 q-30,40 -90,58 M330,1640 q40,22 80,26 M750,1640 q-40,22 -80,26" fill="none" stroke="${SKD}" stroke-width="4" opacity=".6"/>`;
  o+=`<ellipse cx="330" cy="1380" rx="26" ry="60" fill="#fff" opacity=".18" stroke="none"/><ellipse cx="750" cy="1380" rx="26" ry="60" fill="#fff" opacity=".14" stroke="none"/>`;
  // dedos entrelaçados: afunilados, ponta redonda, 2 articulações com rugas, unha com cutícula
  for(let i=0;i<6;i++){
    const y=1390+i*44, fromL=i%2===0, len=300-Math.abs(i-2.5)*16, h=56;
    const x0=fromL?318:762, dir=fromL?1:-1, tip=x0+dir*len, tb=tip-dir*26, sw=dir>0?1:0;
    const fg=fromL?'gF':'gF2';
    o+=`<path d="M${x0},${y+10} L${tb},${y+12} A24,24 0 0 ${sw} ${tb},${y+h+8} L${x0},${y+h+12} Z" fill="${SKD}" opacity=".5" stroke="none"/>`;
    o+=`<path d="M${x0-dir*14},${y} L${tb},${y+3} A26,26 0 0 ${sw} ${tb},${y+h-1} L${x0-dir*14},${y+h+2} Z" fill="url(#${fg})" stroke="none"/><path d="M${x0-dir*14},${y} L${tb},${y+3} A26,26 0 0 ${sw} ${tb},${y+h-1} L${x0-dir*14},${y+h+2}" fill="none"/>`;
    o+=`<path d="M${x0+dir*24},${y+12} L${tb-dir*20},${y+13}" stroke="#fff" stroke-width="5" opacity=".35"/>`;
    for(const f of [.4,.72]){ const kx=x0+dir*len*f;
      o+=`<ellipse cx="${kx}" cy="${y+h/2}" rx="20" ry="22" fill="${SKD}" opacity=".18" stroke="none"/>`;
      for(const d of [-8,0,8]) o+=`<path d="M${kx+d},${y+12+Math.abs(d)/2} q${dir*5},${(h-24)/2} 0,${h-24-Math.abs(d)}" fill="none" stroke="${SKD}" stroke-width="3"/>`; }
    const nx=tip-dir*36;
    o+=`<rect x="${nx-22}" y="${y+12}" width="44" height="32" rx="14" fill="url(#gN)" stroke="${NAILD}" stroke-width="3"/>`;
    o+=`<path d="M${nx-dir*12},${y+15} q${-dir*8},13 0,26" fill="none" stroke="${NAILD}" stroke-width="3"/><path d="M${nx+dir*16},${y+16} q${dir*5},12 0,24" fill="none" stroke="#fff" stroke-width="5"/>`;
  }
  // indicadores esticados: afunilados, articulações com rugas, unha com lúnula e bordo livre
  const g=clamp(gap/260,0,1), half=g*120;
  for(const side of [-1,1]){
    const bx=540+side*(half+46), rot=side*(10*g-2*(1-g));
    o+=`<g transform="translate(${bx} 1360) rotate(${rot})">`;
    o+=`<path d="M-48,40 L-40,-380 Q-40,-428 0,-432 Q40,-428 40,-380 L48,40 Z" fill="url(#gT)"/>`;
    o+=`<path d="M${side*-34},-370 L${side*-40},30" stroke="#fff" stroke-width="6" opacity=".25"/>`;
    o+=`<path d="M${side*36},-370 L${side*42},30" stroke="${SKD}" stroke-width="8" opacity=".25"/>`;
    for(const ky of [-140,-280]){ o+=`<ellipse cx="0" cy="${ky+8}" rx="34" ry="22" fill="${SKD}" opacity=".16" stroke="none"/>`;
      o+=`<path d="M-24,${ky} q24,9 48,0 M-28,${ky+9} q28,10 56,0 M-22,${ky+19} q22,8 44,0" fill="none" stroke="${SKD}" stroke-width="3"/>`; }
    o+=`<path d="M0,-60 q-6,-20 0,-40 M-14,-90 q0,-14 6,-24 M14,-90 q0,-14 -6,-24" fill="none" stroke="${SKD}" stroke-width="2.5" opacity=".5"/>`;
    o+=`<path d="M-25,-364 Q-26,-406 0,-410 Q26,-406 25,-364 Q0,-354 -25,-364 Z" fill="url(#gN)" stroke="${NAILD}" stroke-width="3"/>`;
    o+=`<path d="M-14,-366 q14,-12 28,0" fill="#fff" opacity=".6" stroke="none"/><path d="M-18,-398 q18,-10 36,0" fill="none" stroke="#fff" stroke-width="5"/>`;
    o+=`</g>`;
  }
  // polegares cruzados à frente, com base a fundir na mão
  for(const side of [1,-1]){
    o+=`<g transform="translate(${540+side*95} 1420) rotate(${-side*58}) scale(${side} 1)">`;
    o+=`<path d="M-50,40 C-52,-20 -40,-60 -36,-80 C-44,-110 -40,-150 -12,-166 Q18,-180 38,-156 C48,-134 42,-104 34,-86 C40,-50 52,-14 56,40" fill="url(#gT)"/>`;
    o+=`<ellipse cx="3" cy="40" rx="56" ry="22" fill="url(#gT)" stroke="none"/>`;
    o+=`<g transform="rotate(20 18 -140)"><path d="M0,-156 Q18,-168 36,-156 L34,-124 Q18,-118 2,-124 Z" fill="url(#gN)" stroke="${NAILD}" stroke-width="3"/><path d="M4,-152 q14,-8 28,0" fill="none" stroke="#fff" stroke-width="4"/></g>`;
    o+=`<path d="M34,-92 q-14,4 -16,14 M37,-80 q-13,3 -15,12 M36,-68 q-10,3 -12,9" fill="none" stroke="${SKD}" stroke-width="3"/>`;
    o+=`<path d="M-38,-82 q12,8 24,2" fill="none" stroke="${SKD}" stroke-width="3"/>`;
    o+=`</g>`;
  }
  return o+`</g>`;
}
// ===== mãos estilo foto (frente, braços em V, dedos de uma mão por cima em filas, indicadores para cima) =====
function maosPOV(t,gap,shake=0){
  const SK='#e8b993', SKD='#a8714f', SKL='#f7d6b8', NAIL='#f4d3c6', NAILD='#cf9c8c';
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  let o=`<defs>
  <linearGradient id="pA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b98058"/><stop offset=".45" stop-color="${SK}"/><stop offset="1" stop-color="#c88f68"/></linearGradient>
  <linearGradient id="pF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKL}"/><stop offset=".55" stop-color="${SK}"/><stop offset="1" stop-color="#c48a63"/></linearGradient>
  <linearGradient id="pI" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c48a63"/><stop offset=".35" stop-color="${SKL}"/><stop offset=".75" stop-color="${SK}"/><stop offset="1" stop-color="#b98058"/></linearGradient>
  <linearGradient id="pN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2ec"/><stop offset="1" stop-color="${NAIL}"/></linearGradient>
  <radialGradient id="pT" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#3a3f4a"/><stop offset="1" stop-color="#1c1f26"/></radialGradient></defs>`;
  // tronco com t-shirt escura atrás
  o+=`<path d="M60,1920 L120,1150 Q160,980 330,930 L750,930 Q920,980 960,1150 L1020,1920 Z" fill="url(#pT)" stroke="none" opacity=".95"/>`;
  o+=`<path d="M430,930 Q540,990 650,930" fill="none" stroke="#14161c" stroke-width="10"/>`;
  o+=`<g transform="translate(${sx} ${sy}) translate(540 1500) scale(1.18) translate(-540 -1500)" stroke="#3a2418" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">`;
  // antebraços em V (grossos) com pelos
  o+=`<path d="M-20,1920 L170,1920 Q330,1790 520,1660 L430,1500 Q220,1640 -20,1740 Z" fill="url(#pA)"/>`;
  o+=`<path d="M1100,1920 L910,1920 Q750,1790 560,1660 L650,1500 Q860,1640 1100,1740 Z" fill="url(#pA)"/>`;
  for(let k=0;k<26;k++){const x=40+(k%13)*30+(k>12?20:0), y=1800-(k%13)*20+(k>12?40:0); o+=`<path d="M${x},${y} l12,-5" stroke="${SKD}" stroke-width="2" opacity=".45"/><path d="M${1080-x},${y} l-12,-5" stroke="${SKD}" stroke-width="2" opacity=".45"/>`;}
  // mão de trás (esquerda): palma/lateral até ao pulso
  o+=`<path d="M430,1500 Q370,1400 400,1310 Q440,1250 560,1262 L590,1640 Q540,1690 500,1660 Z" fill="${SK}"/>`;
  o+=`<path d="M410,1420 q20,60 60,110" fill="none" stroke="${SKD}" stroke-width="3" opacity=".55"/>`;
  // dorso da mão da frente (direita), de onde saem as filas de dedos
  o+=`<path d="M720,1300 Q860,1300 880,1420 Q895,1560 800,1640 Q700,1700 600,1660 L620,1300 Z" fill="${SK}"/>`;
  o+=`<path d="M830,1360 q26,50 18,120 M800,1560 q30,-20 46,-70" fill="none" stroke="${SKD}" stroke-width="3" opacity=".6"/><ellipse cx="830" cy="1420" rx="30" ry="80" fill="#fff" opacity=".12" stroke="none"/>`;
  // indicadores para cima (atrás das filas), afastados por gap
  const g=clamp(gap/260,0,1), half=g*110;
  for(const side of [-1,1]){
    const bx=540+side*(half*0.8+40), rot=side*(5*g-2.5*(1-g));
    o+=`<g transform="translate(${bx} 1330) rotate(${rot})">`;
    o+=`<path d="M-44,160 L-36,-330 Q-34,-372 0,-376 Q34,-372 36,-330 L44,160 Z" fill="url(#pI)"/>`;
    for(const ky of [-120,-245]){ o+=`<ellipse cx="0" cy="${ky+6}" rx="28" ry="16" fill="${SKD}" opacity=".15" stroke="none"/><path d="M-20,${ky} q20,7 40,0 M-23,${ky+8} q23,8 46,0 M-18,${ky+16} q18,6 36,0" fill="none" stroke="${SKD}" stroke-width="2.5"/>`; }
    o+=`<path d="M-20,-334 Q-21,-364 0,-367 Q21,-364 20,-334 Q0,-326 -20,-334 Z" fill="url(#pN)" stroke="${NAILD}" stroke-width="3"/><path d="M-13,-356 q13,-7 26,0" fill="none" stroke="#fff" stroke-width="4"/>`;
    o+=`<path d="M${-side*26},-320 L${-side*32},30" stroke="#fff" stroke-width="5" opacity=".22"/>`;
    o+=`</g>`;
  }
  // dedos da mão da frente: 4 filas horizontais, ligeiramente a descer para a esquerda, nós dos dedos visíveis
  const rows=[[1340,400],[1402,370],[1464,380],[1526,410]];
  rows.forEach(([y,tipX],i)=>{
    const h=58, base=780, tb=tipX+28;
    o+=`<path d="M${base},${y+6} L${tb},${y+12} A28,28 0 0 0 ${tb},${y+h+12} L${base},${y+h+8} Z" fill="${SKD}" opacity=".45" stroke="none"/>`;
    o+=`<path d="M${base},${y} L${tb},${y+6} A28,28 0 0 0 ${tb},${y+h+6} L${base},${y+h}" fill="url(#pF)"/>`;
    o+=`<path d="M${base-20},${y+12} L${tb+20},${y+16}" stroke="#fff" stroke-width="5" opacity=".3"/>`;
    // nós (articulações) com rugas circulares
    for(const kx of [tipX+120, tipX+250]){ o+=`<ellipse cx="${kx}" cy="${y+h/2+3}" rx="22" ry="20" fill="${SKD}" opacity=".14" stroke="none"/>`;
      o+=`<path d="M${kx-10},${y+14} q-8,16 0,32 M${kx},${y+12} q-9,18 0,36 M${kx+10},${y+14} q-8,16 0,32" fill="none" stroke="${SKD}" stroke-width="2.5"/>`; }
    // unha com cutícula e bordo livre (ponta à esquerda)
    o+=`<path d="M${tipX+60},${y+18} Q${tipX+20},${y+16} ${tipX+16},${y+36} Q${tipX+20},${y+54} ${tipX+60},${y+52} Q${tipX+68},${y+35} ${tipX+60},${y+18} Z" fill="url(#pN)" stroke="${NAILD}" stroke-width="3"/>`;
    o+=`<path d="M${tipX+26},${y+24} q-8,12 0,24" fill="none" stroke="#fff" stroke-width="5"/>`;
  });
  return o+`</g>`;
}
// ===== POV: a pessoa a olhar para as próprias mãos entrelaçadas (braços a sair dos cantos de baixo) =====
function maosPOV2(t,gap,shake=0,ext=1){
  const SK='#e9ba94', SK2='#e2b08a', SKD='#a46e4c', SKL='#f8d9bc', NAIL='#f6d6ca', NAILD='#cf9c8c', LN='#3a2418';
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  let o=`<defs>
  <linearGradient id="vAL" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#b47a54"/><stop offset=".5" stop-color="${SK}"/><stop offset="1" stop-color="${SKL}"/></linearGradient>
  <linearGradient id="vAR" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ad7550"/><stop offset=".5" stop-color="${SK2}"/><stop offset="1" stop-color="#f3d0b2"/></linearGradient>
  <linearGradient id="vF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKL}"/><stop offset=".5" stop-color="${SK}"/><stop offset="1" stop-color="#c38960"/></linearGradient>
  <linearGradient id="vF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d0b2"/><stop offset=".5" stop-color="${SK2}"/><stop offset="1" stop-color="#bb825b"/></linearGradient>
  <linearGradient id="vI" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c38960"/><stop offset=".35" stop-color="${SKL}"/><stop offset=".75" stop-color="${SK}"/><stop offset="1" stop-color="#b47a54"/></linearGradient>
  <linearGradient id="vN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3ee"/><stop offset="1" stop-color="${NAIL}"/></linearGradient>
  <linearGradient id="vJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3a55"/><stop offset="1" stop-color="#1a2338"/></linearGradient></defs>`;
  // colo (calças) lá em baixo, desfocado
  o+=`<path d="M-40,1560 Q300,1470 540,1560 Q780,1470 1120,1560 L1120,1960 L-40,1960 Z" fill="url(#vJ)" opacity=".9"/><path d="M540,1560 L540,1960" stroke="#141b2c" stroke-width="10" opacity=".7"/>`;
  o+=`<g transform="translate(${sx} ${sy})" stroke="${LN}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">`;
  // antebraços a vir dos cantos de baixo (perspetiva: largos em baixo)
  o+=`<path d="M-80,1960 L330,1960 Q420,1640 480,1420 L330,1330 Q160,1600 -80,1760 Z" fill="url(#vAL)"/>`;
  o+=`<path d="M1160,1960 L750,1960 Q660,1640 600,1420 L750,1330 Q920,1600 1160,1760 Z" fill="url(#vAR)"/>`;
  for(let k=0;k<30;k++){ const u=(k*37%100)/100, v=(k*61%100)/100; const x=20+u*300-v*40, y=1900-v*450+u*60; if(y<1380) continue;
    o+=`<path d="M${x},${y} l9,-9" stroke="${SKD}" stroke-width="2.2" opacity=".45"/><path d="M${1080-x},${y} l-9,-9" stroke="${SKD}" stroke-width="2.2" opacity=".45"/>`; }
  o+=`<path d="M350,1400 q50,30 110,40 M730,1400 q-50,30 -110,40" fill="none" stroke="${SKD}" stroke-width="3" opacity=".55"/>`;
  // costas das mãos (esq. e dir.), com tendões e nós
  o+=`<path d="M330,1330 Q270,1200 300,1080 Q330,1010 420,1000 L540,1010 L540,1400 Q500,1430 480,1420 Z" fill="url(#vAL)"/>`;
  o+=`<path d="M750,1330 Q810,1200 780,1080 Q750,1010 660,1000 L540,1010 L540,1400 Q580,1430 600,1420 Z" fill="url(#vAR)"/>`;
  o+=`<path d="M360,1300 Q350,1180 380,1060 M400,1320 Q400,1190 430,1050 M720,1300 Q730,1180 700,1060 M680,1320 Q680,1190 650,1050" fill="none" stroke="${SKD}" stroke-width="3" opacity=".45"/>`;
  // indicadores esticados para cima (vistos de trás, com perspetiva)
  const g=clamp(gap/260,0,1), half=g*95;
  for(const side of [-1,1]){
    const bx=540+side*(half+38), rot=side*(6*g-2.5*(1-g));
    o+=`<g transform="translate(${bx} ${1060+(1-ext)*300}) rotate(${rot})">`;
    o+=`<path d="M-40,92 L-34,-300 Q-32,-338 0,-342 Q32,-338 34,-300 L40,92 Z" fill="url(#vI)"/>`;
    for(const ky of [-90,-200]){ o+=`<ellipse cx="0" cy="${ky+6}" rx="26" ry="15" fill="${SKD}" opacity=".16" stroke="none"/><path d="M-19,${ky} q19,7 38,0 M-22,${ky+8} q22,8 44,0 M-17,${ky+16} q17,6 34,0" fill="none" stroke="${SKD}" stroke-width="2.5"/>`; }
    o+=`<path d="M-19,-302 Q-20,-330 0,-333 Q20,-330 19,-302 Q0,-295 -19,-302 Z" fill="url(#vN)" stroke="${NAILD}" stroke-width="3"/><path d="M-12,-322 q12,-6 24,0" fill="none" stroke="#fff" stroke-width="4"/>`;
    o+=`<path d="M${-side*24},-290 L${-side*30},100" stroke="#fff" stroke-width="5" opacity=".22"/><path d="M${side*28},-290 L${side*34},100" stroke="${SKD}" stroke-width="7" opacity=".22"/>`;
    o+=`</g>`;
  }
  // dedos ENTRELAÇADOS: 6 filas alternadas (esq→dir com unha à direita / dir→esq com unha à esquerda)
  for(let i=0;i<6;i++){
    const y=1110+i*46, fromL=i%2===0, h=50, len=330-Math.abs(i-2.5)*18;
    const x0=fromL?370:710, dir=fromL?1:-1, tip=x0+dir*len, tb=tip-dir*25, swp=dir>0?1:0, fg=fromL?'vF':'vF2';
    o+=`<path d="M${x0},${y+8} L${tb},${y+11} A23,23 0 0 ${swp} ${tb},${y+h+7} L${x0},${y+h+10} Z" fill="${SKD}" opacity=".45" stroke="none"/>`;
    const xb=x0-dir*30;
    o+=`<path d="M${xb},${y} L${tb},${y+2} A25,25 0 0 ${swp} ${tb},${y+h-2} L${xb},${y+h} A25,25 0 0 ${swp} ${xb},${y} Z" fill="url(#${fg})" stroke="none"/>`;
    o+=`<path d="M${xb},${y} L${tb},${y+2} A25,25 0 0 ${swp} ${tb},${y+h-2} L${xb},${y+h}" fill="none"/>`;
    o+=`<path d="M${xb-dir*8},${y+10} q${-dir*14},15 0,30" fill="none" stroke="${SKD}" stroke-width="3" opacity=".6"/>`;
    o+=`<path d="M${x0+dir*20},${y+11} L${tb-dir*14},${y+12}" stroke="#fff" stroke-width="5" opacity=".32"/>`;
    for(const f of [.38,.7]){ const kx=x0+dir*len*f;
      o+=`<ellipse cx="${kx}" cy="${y+h/2}" rx="20" ry="20" fill="${SKD}" opacity=".15" stroke="none"/>`;
      for(const d of [-8,0,8]) o+=`<path d="M${kx+d},${y+11+Math.abs(d)/2} q${dir*5},${(h-22)/2} 0,${h-22-Math.abs(d)}" fill="none" stroke="${SKD}" stroke-width="2.6"/>`; }
    const nx=tip-dir*33;
    o+=`<path d="M${nx-dir*16},${y+12} Q${nx+dir*20},${y+9} ${nx+dir*22},${y+25} Q${nx+dir*20},${y+41} ${nx-dir*16},${y+38} Q${nx-dir*22},${y+25} ${nx-dir*16},${y+12} Z" fill="url(#vN)" stroke="${NAILD}" stroke-width="2.6"/>`;
    o+=`<path d="M${nx+dir*13},${y+14} q${dir*5},11 0,22" fill="none" stroke="#fff" stroke-width="4.5"/>`;
  }
  // polegares: saem da base interior de cada mão (com a "almofada" do polegar ligada à mão) e deitam-se por cima
  for(const h of [1,-1]){ const side=-h;
    const grad=h<0?'vAL':'vAR';
    // almofada/teia do polegar, da lateral de baixo da mão até à base do polegar
    o+=`<g transform="translate(540 0) scale(${side} 1) translate(-540 0)">`;
    o+=`<path d="M335,1300 Q360,1400 450,1430 Q510,1440 528,1400 L520,1300 Q470,1290 420,1250 Z" fill="url(#${grad})" stroke="none"/>`;
    o+=`<path d="M335,1300 Q360,1400 450,1430 Q505,1440 524,1405" fill="none"/>`;
    o+=`<path d="M380,1340 q40,40 90,50" fill="none" stroke="${SKD}" stroke-width="3" opacity=".5"/>`;
    o+=`</g>`;
    o+=`<g transform="translate(${540+h*100} 1385) rotate(${-h*42}) scale(${-h*1.12} 1.12)">`;
    o+=`<path d="M-50,30 C-54,-20 -44,-56 -40,-78 C-48,-112 -44,-152 -14,-170 Q18,-186 40,-160 C50,-136 44,-104 36,-86 C42,-50 54,-10 56,30 Z" fill="url(#${grad})" stroke="none"/>`;
    o+=`<path d="M-50,30 C-54,-20 -44,-56 -40,-78 C-48,-112 -44,-152 -14,-170 Q18,-186 40,-160 C50,-136 44,-104 36,-86 C42,-50 54,-10 56,30" fill="none"/>`;
    o+=`<g transform="rotate(16 18 -144)"><path d="M0,-162 Q18,-176 38,-162 L36,-128 Q18,-121 2,-128 Z" fill="url(#vN)" stroke="${NAILD}" stroke-width="3"/><path d="M5,-158 q14,-8 28,0" fill="none" stroke="#fff" stroke-width="4"/></g>`;
    o+=`<path d="M36,-92 q-14,4 -16,14 M39,-80 q-13,3 -15,12 M38,-68 q-10,3 -12,9" fill="none" stroke="${SKD}" stroke-width="2.6"/>`;
    o+=`</g>`;
  }
  return o+`</g>`;
}
// ===== POV v3 (baseado na foto real): mãos vistas pelo lado do polegar, indicadores em V, polegares cruzados em baixo =====
function maosPOV3(t,gap,shake=0,ext=1){
  const SK='#e7b48c', SKL='#f6d2b2', SKD='#a26a48', NAIL='#f5d4c8', NAILD='#c9937f', LN='#3a2418';
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  let o=`<defs>
  <linearGradient id="wS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9783f"/><stop offset=".5" stop-color="#e9a83a"/><stop offset="1" stop-color="#c98a2e"/></linearGradient>
  <linearGradient id="wH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c58b63"/><stop offset=".45" stop-color="${SKL}"/><stop offset="1" stop-color="#d69e76"/></linearGradient>
  <linearGradient id="wI" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c58b63"/><stop offset=".4" stop-color="${SKL}"/><stop offset=".8" stop-color="${SK}"/><stop offset="1" stop-color="#b47b56"/></linearGradient>
  <linearGradient id="wT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKL}"/><stop offset=".6" stop-color="${SK}"/><stop offset="1" stop-color="#bf845d"/></linearGradient>
  <linearGradient id="wN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3ee"/><stop offset="1" stop-color="${NAIL}"/></linearGradient>
  <linearGradient id="wJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab3d6"/><stop offset="1" stop-color="#6f87ad"/></linearGradient></defs>`;
  // colo (calças de ganga) em baixo
  o+=`<path d="M300,1920 Q330,1560 520,1520 Q700,1530 720,1920 Z" fill="url(#wJ)" opacity=".85"/>`;
  o+=`<g transform="translate(${sx} ${sy})" stroke="${LN}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">`;
  // mangas (casaco) a vir dos cantos de baixo
  for(const s of [-1,1]){
    o+=`<g transform="translate(540 0) scale(${s} 1) translate(-540 0)">`;
    o+=`<path d="M40,1920 Q120,1640 300,1440 L480,1560 Q400,1720 380,1920 Z" fill="url(#wS)"/>`;
    o+=`<path d="M296,1446 L478,1566" stroke-width="5"/><path d="M290,1470 L470,1590 L455,1625 L272,1505 Z" fill="#c98a2e" stroke-width="4"/>`;
    o+=`<path d="M180,1680 q60,20 110,70 M140,1800 q70,10 130,60 M250,1580 q40,30 60,80" fill="none" stroke="#8a5a20" stroke-width="5" opacity=".45"/>`;
    o+=`</g>`;
  }
  // indicadores (atrás) — rodam de V aberto a colados
  const g=clamp(gap/260,0,1);
  for(const s of [-1,1]){
    const bx=540+s*(54+g*34), rot=s*(18*g-1.5*(1-g)), L=300*(0.25+0.75*ext);
    o+=`<g transform="translate(${bx} 1090) rotate(${rot})">`;
    o+=`<path d="M-60,70 L-50,${-L+50} Q-48,${-L} 0,${-L-8} Q48,${-L} 50,${-L+50} L60,70 Z" fill="url(#wI)"/>`;
    if(ext>.5){ for(const k of [.33,.62]){ const ky=-L*k; o+=`<path d="M${s*20},${ky} q${s*16},6 ${s*22},16 M${s*16},${ky+12} q${s*14},6 ${s*22},14" fill="none" stroke="${SKD}" stroke-width="3"/>`; }
      // unha de perfil, do lado de fora
      o+=`<path d="M${s*6},${-L+2} Q${s*34},${-L+6} ${s*36},${-L+46} Q${s*22},${-L+44} ${s*12},${-L+30} Z" fill="url(#wN)" stroke="${NAILD}" stroke-width="3"/>`; }
    o+=`<path d="M${-s*26},${-L+40} L${-s*30},50" stroke="#fff" stroke-width="6" opacity=".22"/>`;
    o+=`</g>`;
  }
  // corpo das mãos (lado do polegar), do pulso até à base do indicador
  for(const s of [-1,1]){
    o+=`<g transform="translate(540 0) scale(${s} 1) translate(-540 0)">`;
    o+=`<path d="M300,1440 Q270,1330 330,1230 Q380,1130 440,1090 Q480,1060 510,1062 L560,1080 L560,1500 Q520,1570 460,1566 Z" fill="url(#wH)"/>`;
    o+=`<path d="M380,1330 q30,-80 80,-150" fill="none" stroke="${SKD}" stroke-width="3" opacity=".5"/>`;
    o+=`</g>`;
  }
  // nós dos dedos entrelaçados no meio (entre as bases dos indicadores)
  const kn=[[1115,-1],[1170,1],[1225,-1]];
  for(const [y,s] of kn){
    o+=`<path d="M${540-s*70},${y+30} Q${540-s*70},${y-20} ${540},${y-22} Q${540+s*58},${y-22} ${540+s*62},${y+12} Q${540+s*58},${y+44} ${540},${y+44} Q${540-s*60},${y+44} ${540-s*70},${y+30} Z" fill="url(#wT)"/>`;
    o+=`<path d="M${540+s*38},${y-12} Q${540+s*60},${y-10} ${540+s*60},${y+12} Q${540+s*58},${y+30} ${540+s*38},${y+30} Z" fill="url(#wN)" stroke="${NAILD}" stroke-width="3"/>`;
    o+=`<path d="M${540-s*20},${y-8} q${-s*6},18 0,34 M${540-s*8},${y-10} q${-s*6},20 0,38" fill="none" stroke="${SKD}" stroke-width="2.5"/>`;
  }
  // polegares cruzados em baixo (o da mão direita por cima, a apontar para a esquerda)
  const thumb=(bx,by,ang)=>{
    let p=`<g transform="translate(${bx} ${by}) rotate(${ang})">`;
    p+=`<path d="M-20,-62 L190,-42 Q262,-38 266,8 Q262,54 190,52 L-20,70 Q-96,64 -100,4 Q-96,-56 -20,-62 Z" fill="url(#wT)"/>`;
    p+=`<path d="M-40,40 q30,20 70,10" fill="none" stroke="${SKD}" stroke-width="3" opacity=".5"/>`;
    p+=`<path d="M178,-34 Q240,-34 248,4 Q240,38 178,34 Q166,0 178,-34 Z" fill="url(#wN)" stroke="${NAILD}" stroke-width="3"/><path d="M226,-22 q16,16 0,40" fill="none" stroke="#fff" stroke-width="5"/>`;
    p+=`<path d="M100,-48 q-10,26 0,56 M112,-47 q-10,26 0,58 M124,-46 q-8,24 0,52" fill="none" stroke="${SKD}" stroke-width="2.6"/>`;
    p+=`<ellipse cx="200" cy="40" rx="40" ry="10" fill="${SKD}" opacity=".2" stroke="none"/>`;
    return p+`</g>`;
  };
  o+=thumb(370,1400,-16);   // polegar da mão esquerda (por baixo), aponta para a direita
  o+=thumb(712,1352,196);   // polegar da mão direita (por cima), aponta para a esquerda
  return o+`</g>`;
}
// ===== MÃOS v4 (refeitas do zero): POV, estilo da marca (contorno azul-escuro, cor lisa + sombra) =====
// Desenhada a mão esquerda; a direita é espelho. Ordem: indicadores → mangas → corpos → nós/pontas entrelaçadas → polegares (dir. por cima)
function maosV4(t,gap,shake=0,ext=1){
  const SK='#f1c49d', SH='#d89c74', HL='#fde3cb', NL='#fbe6dc', NS='#e9bfae', OL=FK, W=8;
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  const g=clamp(gap/260,0,1);
  const mir=(s,inner)=>`<g transform="translate(540 0) scale(${s} 1) translate(-540 0)">${inner}</g>`;
  let o=`<g transform="translate(${sx} ${sy}) translate(540 1560) scale(1.32) translate(-540 -1460)" stroke="${OL}" stroke-width="${W}" stroke-linejoin="round" stroke-linecap="round">`;
  // --- indicador (mão esquerda), roda à volta da base (492,1150)
  const indicador=(ang,len)=>{
    const L=len; // comprimento acima da base
    let p=`<g transform="rotate(${ang} 492 1150)">`;
    // dedo: base larga (88) → ponta (74), articulações ligeiramente marcadas
    p+=`<path d="M448,1230 L450,${1150-L*0.55} Q448,${1150-L*0.6} 452,${1150-L*0.66} L456,${1150-L+40} Q458,${1150-L-4} 492,${1150-L-6} Q526,${1150-L-4} 528,${1150-L+40} L532,${1150-L*0.66} Q536,${1150-L*0.6} 534,${1150-L*0.55} L536,1230 Z" fill="${SK}"/>`;
    // sombra do lado de dentro (virado para o outro dedo)
    p+=`<path d="M520,1225 L522,${1150-L*0.55} L520,${1150-L+44} Q524,${1150-L+10} 512,${1150-L-2} Q528,${1150-L+6} 528,${1150-L+40} L532,${1150-L*0.66} Q536,${1150-L*0.6} 534,${1150-L*0.55} L536,1225 Z" fill="${SH}" stroke="none"/>`;
    // brilho do lado de fora
    p+=`<path d="M462,${1150-L+50} L460,1180" stroke="${HL}" stroke-width="10" opacity=".9"/>`;
    // vincos das articulações (do lado de dentro, como se vê na foto)
    for(const k of [.36,.66]){const y=1150-L*k; p+=`<path d="M506,${y-8} q14,4 22,-2 M504,${y+6} q16,4 26,-2" fill="none" stroke-width="3.5"/>`;}
    // unha de perfil, no lado de fora (costas do dedo)
    p+=`<path d="M466,${1150-L+4} Q470,${1150-L-2} 482,${1150-L-2} L478,${1150-L+38} Q466,${1150-L+34} 462,${1150-L+24} Z" fill="${NL}" stroke-width="4"/>`;
    return p+`</g>`;
  };
  const L=330*(0.22+0.78*ext);
  const ang=-17*g+2.2*(1-g);
  o+=indicador(ang,L)+mir(-1,indicador(ang,L));
  // --- corpo da mão (lado do polegar), do pulso à base do indicador
  const corpo=`<path d="M380,1600 Q350,1420 384,1290 Q418,1196 452,1160 Q492,1136 536,1160 L540,1600 Z" fill="${SK}"/>`+
    `<path d="M540,1230 Q512,1300 516,1420 Q520,1520 540,1600 Z" fill="${SH}" stroke="none"/>`+
    `<path d="M392,1300 Q410,1240 446,1200" fill="none" stroke="${HL}" stroke-width="10"/>`;
  o+=corpo+mir(-1,corpo);
  // --- mangas do casaco (vêm dos cantos de baixo) + punho
  const manga=`<path d="M40,1960 Q110,1700 330,1480 L520,1600 Q430,1760 410,1960 Z" fill="#e8a93b"/><path d="M330,1480 L520,1600 L502,1650 L306,1528 Z" fill="#c98a2e"/><path d="M140,1820 q70,0 120,60 M190,1700 q60,10 100,60 M260,1600 q40,20 70,60" fill="none" stroke-width="5" opacity=".45"/>`;
  o+=manga+mir(-1,manga);
  // linha do meio (palmas encostadas)
  o+=`<path d="M540,1170 L540,1560" fill="none" stroke-width="6"/>`;
  // --- dedos entrelaçados: nós entre as bases dos indicadores
  
  // --- pontas dos dedos da outra mão a espreitar na lateral (prova de que estão entrelaçados)
  const pontas=()=>{let p='';
    [[1235,0],[1300,6],[1362,14]].forEach(([y,dx])=>{const x=372+dx;
      p+=`<path d="M${x+40},${y-26} Q${x-12},${y-30} ${x-14},${y} Q${x-12},${y+30} ${x+40},${y+28}" fill="${SK}"/>`;
      p+=`<path d="M${x+6},${y-16} Q${x-6},${y-14} ${x-6},${y} Q${x-6},${y+14} ${x+6},${y+16} Q${x+14},${y} ${x+6},${y-16} Z" fill="${NL}" stroke-width="3.5"/>`;});
    return p;};
  o+=pontas()+mir(-1,pontas());
  // --- polegar (mão esquerda): sai da almofada, cruza na diagonal para a direita
  const polegar=(cx,cy,ang)=>{
    let p=`<g transform="translate(${cx} ${cy}) rotate(${ang})">`;
    p+=`<path d="M-30,-48 C40,-50 130,-44 170,-38 Q218,-32 220,4 Q218,40 170,42 C130,46 40,52 -30,50 Z" fill="${SK}"/>`;
    p+=`<path d="M-24,28 C40,34 130,30 170,30 Q206,28 212,12 Q214,40 170,42 C130,46 40,52 -24,48 Z" fill="${SH}" stroke="none"/>`;
    p+=`<path d="M-30,-48 C40,-50 130,-44 170,-38 Q218,-32 220,4 Q218,40 170,42 C130,46 40,52 -30,50" fill="none"/>`;
    // unha (vista de cima) e vincos da articulação
    p+=`<path d="M150,-24 Q196,-26 204,2 Q196,26 150,24 Q142,0 150,-24 Z" fill="${NL}" stroke-width="4"/><path d="M186,-14 q10,14 0,28" fill="none" stroke="#fff" stroke-width="5"/>`;
    p+=`<path d="M92,-40 q-8,20 -2,40 M104,-40 q-8,22 -2,44" fill="none" stroke-width="3.5"/>`;
    return p+`</g>`;
  };
  const almofada=`<path d="M392,1480 Q380,1400 420,1362 Q462,1334 512,1350 L516,1500 Q460,1520 392,1480 Z" fill="${SK}" stroke="none"/><path d="M386,1440 Q390,1390 420,1362" fill="none" stroke-width="6"/>`;
  // esquerdo por baixo, direito por cima
  o+=polegar(440,1405,-24)+almofada;
  o+=mir(-1,polegar(440,1405,-24)+almofada);
  return o+`</g>`;
}
// ===== MÃOS v5: POV de cima (como a foto da mesa). Polegares para cima com unha à vista, indicadores em V sem unha, braços em V =====
function maosV5(t,gap,shake=0,ext=1){
  const SK='#f1c49d', SH='#d89c74', HL='#fde3cb', NL='#fbe6dc', OL=FK, W=8;
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  const g=clamp(gap/260,0,1);
  let o=`<g transform="translate(${sx} ${sy}) translate(540 1300) scale(1.25) translate(-540 -1300)" stroke="${OL}" stroke-width="${W}" stroke-linejoin="round" stroke-linecap="round">`;
  // --- antebraços (pele, com pelos) em V a partir de baixo
  const braco=(s)=>{ let p=`<g transform="translate(540 0) scale(${s} 1) translate(-540 0)">`;
    p+=`<path d="M60,2000 Q200,1700 420,1440 L560,1500 Q440,1760 400,2000 Z" fill="${SK}"/>`;
    p+=`<path d="M380,2000 Q420,1780 530,1520 L556,1505 Q446,1760 400,2000 Z" fill="${SH}" stroke="none"/>`;
    p+=`<path d="M150,1880 Q260,1660 420,1480" fill="none" stroke="${HL}" stroke-width="12" opacity=".8"/>`;
    for(let k=0;k<16;k++){const u=(k*37%100)/100,v=(k*53%100)/100; const x=170+u*170+v*60, y=1880-u*300-v*120; p+=`<path d="M${x},${y} l10,-9" stroke-width="2.5" opacity=".35"/>`;}
    return p+`</g>`; };
  o+=braco(-1)+braco(1);
  // --- indicadores (sem unha à vista, apontam para longe) — rodam na base
  const L=320*(0.22+0.78*ext), ang=-15*g+2*(1-g);
  const indicador=(s)=>{ const bx=540+s*44;
    let p=`<g transform="rotate(${s*-ang} ${bx} 1120)">`;
    p+=`<path d="M${bx-44},1200 L${bx-38},${1120-L+36} Q${bx-36},${1120-L-6} ${bx},${1120-L-8} Q${bx+36},${1120-L-6} ${bx+38},${1120-L+36} L${bx+44},1200 Z" fill="${SK}"/>`;
    p+=`<path d="M${bx-s*-30},1195 L${bx-s*-26},${1120-L+40} Q${bx-s*-24},${1120-L+4} ${bx-s*-6},${1120-L-6} Q${bx+s*38},${1120-L-4} ${bx+s*38},${1120-L+36} L${bx+s*44},1195 Z" fill="${SH}" stroke="none"/>`;
    p+=`<path d="M${bx-s*22},${1120-L+30} L${bx-s*26},1170" stroke="${HL}" stroke-width="10"/>`;
    for(const k of [.38,.7]){const y=1120-L*k; p+=`<path d="M${bx-18},${y} q18,8 36,0 M${bx-14},${y+12} q14,6 28,0" fill="none" stroke-width="3.5"/>`;}
    // ponta: almofada ligeiramente visível
    p+=`<path d="M${bx-20},${1120-L+22} q20,-12 40,0" fill="none" stroke-width="3" opacity=".6"/>`;
    return p+`</g>`; };
  o+=indicador(-1)+indicador(1);
  // --- corpos das mãos (costas/lado), do pulso às bases dos indicadores
  const corpo=(s)=>`<g transform="translate(540 0) scale(${s} 1) translate(-540 0)"><path d="M414,1470 Q386,1330 420,1210 Q446,1130 490,1110 Q530,1100 548,1130 L556,1500 Z" fill="${SK}"/><path d="M548,1150 Q520,1260 526,1380 Q530,1450 556,1500 Z" fill="${SH}" stroke="none"/><path d="M420,1340 Q424,1250 456,1180" fill="none" stroke="${HL}" stroke-width="10"/></g>`;
  o+=corpo(-1)+corpo(1);
  // nó do dedo médio dobrado entre os indicadores
  o+=`<path d="M512,1150 Q514,1120 540,1118 Q566,1120 568,1150 Q554,1162 540,1162 Q526,1162 512,1150 Z" fill="${SK}"/><path d="M528,1136 q12,-6 24,0" fill="none" stroke-width="3"/>`;
  // --- pontas dos dedos da outra mão a espreitar dos lados
  const ponta=(x,y,s)=>`<path d="M${x+s*34},${y-24} Q${x-s*14},${y-28} ${x-s*16},${y} Q${x-s*14},${y+28} ${x+s*34},${y+26}" fill="${SK}"/><path d="M${x+s*4},${y-14} Q${x-s*8},${y-12} ${x-s*8},${y} Q${x-s*8},${y+12} ${x+s*4},${y+14}" fill="none" stroke-width="3.5"/>`;
  o+=ponta(418,1160,1)+ponta(412,1220,1)+ponta(662,1150,-1)+ponta(668,1212,-1);
  // --- polegares a apontar para cima, unha virada para quem olha (o da direita mais alto, por cima)
  const polegar=(bx,by,len,ang)=>{
    let p=`<g transform="translate(${bx} ${by}) rotate(${ang})">`;
    const fill=`M-56,50 C-58,-30 -54,${-len+70} -46,${-len+34} Q-40,${-len-8} 0,${-len-10} Q40,${-len-8} 46,${-len+34} C54,${-len+70} 58,-30 56,50 Z`;
    p+=`<path d="${fill}" fill="${SK}" stroke="none"/>`;
    p+=`<path d="M26,46 C30,-20 34,${-len+70} 36,${-len+36} Q38,${-len+4} 30,${-len-4} Q44,${-len+8} 46,${-len+34} C54,${-len+70} 58,-30 56,46 Z" fill="${SH}" stroke="none"/>`;
    p+=`<path d="M-56,40 C-58,-30 -54,${-len+70} -46,${-len+34} Q-40,${-len-8} 0,${-len-10} Q40,${-len-8} 46,${-len+34} C54,${-len+70} 58,-30 56,40" fill="none"/>`;
    // unha larga
    p+=`<path d="M-32,${-len+64} Q-34,${-len+6} 0,${-len+2} Q34,${-len+6} 32,${-len+64} Q0,${-len+74} -32,${-len+64} Z" fill="${NL}" stroke-width="4"/>`;
    p+=`<path d="M-20,${-len+18} q20,-9 40,0" fill="none" stroke="#fff" stroke-width="5"/>`;
    // vincos da articulação
    p+=`<path d="M-34,${-len+112} q34,12 68,0 M-30,${-len+128} q30,9 60,0" fill="none" stroke-width="3.5"/>`;
    return p+`</g>`; };
  o+=polegar(476,1400,200,-12);   // polegar esquerdo (inclina para fora)
  o+=polegar(600,1372,240,3);     // polegar direito (por cima, mais alto)
  return o+`</g>`;
}
// ===== MÃOS v6 (do zero, direitas e simétricas): POV, braços a subir na vertical, polegares lado a lado, indicadores para cima =====
function maosV6(t,gap,shake=0,ext=1){
  const SK='#f1c49d', SH='#d99d75', HL='#fde3cb', NL='#fbe6dc', W=8;
  const sx=shake?Math.sin(t*55)*shake:0, sy=shake?Math.cos(t*47)*shake*.6:0;
  const g=clamp(gap/260,0,1);
  const M=(inner)=>inner+`<g transform="translate(1080 0) scale(-1 1)">${inner}</g>`; // desenha lado esquerdo + espelho
  let o=`<g transform="translate(${sx} ${sy}) translate(540 1380) scale(1.3) translate(-540 -1380)" stroke="${FK}" stroke-width="${W}" stroke-linejoin="round" stroke-linecap="round">`;
  // antebraços
  o+=M(`<path d="M290,2000 Q330,1700 392,1470 L540,1470 L540,2000 Z" fill="${SK}" stroke="none"/><path d="M290,2000 Q330,1700 392,1470" fill="none"/><path d="M470,2000 Q480,1740 500,1480 L540,1480 L540,2000 Z" fill="${SH}" stroke="none"/><path d="M335,1880 Q352,1700 400,1520" fill="none" stroke="${HL}" stroke-width="12"/>`);
  for(let k=0;k<12;k++){const y=1560+k*36, x=350+(k%3)*30; o+=`<path d="M${x},${y} l8,-10 M${1080-x},${y} l-8,-10" stroke-width="2.5" opacity=".35"/>`;}
  // corpo das mãos
  o+=M(`<path d="M392,1480 Q366,1360 384,1250 Q404,1166 452,1142 Q500,1124 540,1150 L540,1480 Z" fill="${SK}" stroke="none"/><path d="M392,1480 Q366,1360 384,1250 Q404,1166 452,1142 Q500,1124 540,1150" fill="none"/><path d="M540,1170 Q514,1260 518,1380 Q520,1440 540,1480 Z" fill="${SH}" stroke="none"/><path d="M392,1400 Q384,1300 412,1220" fill="none" stroke="${HL}" stroke-width="10"/>`);
  o+=`<path d="M540,1160 L540,2000" fill="none" stroke-width="5"/>`;
  // nó do dedo médio entre os indicadores
  
  // dedos da outra mão a dar a volta por cima das costas da mão (entrelaçados): segmentos diagonais com nós e pontas
  // os dedos dão a volta à mão e as pontas desaparecem por trás (sem unhas à vista)
  const dedoLado=(y,len)=>{ const x1=470, y1=y, x2=x1-len, y2=y+40, ang=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${x1} ${y1}) rotate(${ang})"><path d="M0,-27 L${len-6},-25 Q${len+16},-10 ${len+14},6 Q${len+10},22 ${len-6},26 L0,27 Z" fill="${SK}" stroke="none"/><path d="M0,20 L${len-6},18 Q${len+8},12 ${len+13},4 Q${len+10},22 ${len-6},26 L0,27 Z" fill="${SH}" stroke="none"/><path d="M0,-27 L${len-6},-25 Q${len+16},-10 ${len+14},6 Q${len+10},22 ${len-6},26 L0,27" fill="none"/><path d="M${len*0.45},-18 q-6,18 0,36 M${len*0.45+10},-18 q-6,18 0,36" fill="none" stroke-width="3"/><path d="M${len-2},-18 q8,14 2,30" fill="none" stroke="${SH}" stroke-width="6"/></g>`; };
  o+=M(dedoLado(1200,96)+dedoLado(1262,100)+dedoLado(1324,94));
  // indicadores (à frente das mãos, só atrás dos polegares), rodam na base
  const L=320*(0.22+0.78*ext), ang=16*g-1.5*(1-g);
  const ind=`<g transform="rotate(${-ang} 494 1300)"><path d="M448,1320 L456,${1150-L+36} Q458,${1150-L-6} 494,${1150-L-8} Q530,${1150-L-6} 532,${1150-L+36} L540,1320 Z" fill="${SK}"/>`+
    `<path d="M516,1315 L518,${1150-L+40} Q520,${1150-L+6} 506,${1150-L-4} Q530,${1150-L} 532,${1150-L+36} L540,1315 Z" fill="${SH}" stroke="none"/>`+
    `<path d="M468,${1150-L+40} L466,1190" stroke="${HL}" stroke-width="10"/>`+
    `<path d="M476,${1150-L*0.38} q18,7 36,0 M480,${1150-L*0.38+12} q14,5 28,0 M476,${1150-L*0.7} q18,7 36,0 M480,${1150-L*0.7+12} q14,5 28,0" fill="none" stroke-width="3.5"/></g>`;
  o+=M(ind);
  // polegares direitos, lado a lado, unha à vista
  const pol=`<path d="M440,1470 L440,1290 Q440,1218 490,1214 Q536,1218 536,1290 L536,1470 Z" fill="${SK}" stroke="none"/>`+
    `<path d="M516,1470 L516,1300 Q516,1240 500,1222 Q536,1230 536,1290 L536,1470 Z" fill="${SH}" stroke="none"/>`+
    `<path d="M440,1478 L440,1290 Q440,1218 490,1214 Q536,1218 536,1290 L536,1478" fill="none"/>`+
    `<path d="M466,1292 Q464,1252 488,1249 Q512,1252 510,1292 Q488,1300 466,1292 Z" fill="#f4cdbb" stroke-width="3.5"/><path d="M472,1262 q16,-7 32,0" fill="none" stroke="#fbe6dc" stroke-width="3.5"/><path d="M470,1286 q18,6 36,0" fill="none" stroke="${SH}" stroke-width="3"/>`+
    `<path d="M454,1340 q34,12 68,0 M458,1356 q30,9 60,0" fill="none" stroke-width="3.5"/>`;
  o+=M(pol);
  return o+`</g>`;
}
// ===== 2 FACTOS — "O teu cérebro vai enganar-te" (palavra repetida + letras baralhadas) =====
function hookLer(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="70" fill="${FK}" text-anchor="middle" stroke="none">O TEU CÉREBRO</text><text x="540" y="318" font-family="M" font-weight="900" font-size="70" fill="#e0483a" text-anchor="middle" stroke="none">VAI ENGANAR-TE</text></g>`; }
// layout das palavras dentro do triângulo (posição x central de cada palavra)
const LW=(w,sz)=>[...w].reduce((a,c)=>a+(c==='I'?0.38:c==='M'||c==='W'?1.02:0.8),0)*sz;
function linhaPal(words,cx,sz){ const sp=sz*0.32; const tot=words.reduce((a,w)=>a+LW(w,sz),0)+sp*(words.length-1); let x=cx-tot/2; return words.map(w=>{const c=x+LW(w,sz)/2; x+=LW(w,sz)+sp; return {w,c,wd:LW(w,sz)};}); }
// 1.º facto (0 – 11,6)
FP.ler1=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  const wob=Math.sin(t*3)*1.2, sc=1+0.012*Math.sin(t*5);
  o+=`<g transform="translate(540 900) rotate(${wob}) scale(${sc}) translate(-540 -900)">`;
  o+=`<path d="M540,420 L1060,1360 L20,1360 Z" fill="${FY}" stroke="${FK}" stroke-width="16" stroke-linejoin="round"/>`;
  
  o+=olhoIcon(540,800,.85,false);
  const SZ=82, l1=linhaPal(['UM','PASSEIO','NO'],540,SZ), l2=linhaPal(['NO','PARQUE'],540,SZ), Y1=1185, Y2=1295;
  const words=[...l1.map(p=>({...p,y:Y1})),...l2.map(p=>({...p,y:Y2}))];
  // marcador a ler devagar (3,57 – 5,43)
  const tm=[3.6,3.9,4.25,4.85,5.1];
  if(t>=3.57&&t<5.79){ let k=0; for(let i=0;i<5;i++) if(t>=tm[i]) k=i; const p=words[k]; o+=`<rect x="${p.c-p.wd/2-10}" y="${p.y-58}" width="${p.wd+20}" height="76" rx="14" fill="#ffffff" opacity=".75" stroke="none"/>`; }
  // segundo "NO" salta fora quando ele diz "e salta…"
  words.forEach((p,i)=>{ let dy=0, op=1;
    if(i===3&&t>=9.58){const k=ease((t-9.58)/0.6); dy=-140*k; op=1-k*.85;}
    const col=(t>=5.79&&(i===2||i===3))?'#e0483a':FK;
    o+=`<text x="${p.c}" y="${p.y+dy}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none" opacity="${op}">${p.w}</text>`; });
  if(t>=5.79&&t<9.58){ for(const i of [2,3]){const p=words[i]; const k=ease((t-5.79)/.3); o+=`<ellipse cx="${p.c}" cy="${p.y-22}" rx="${(p.wd/2+26)*k}" ry="${52*k}" fill="none" stroke="#e0483a" stroke-width="10"/>`;} }
  o+=`</g>`;
  if(t<5.79){ const bl=(Math.floor(t*3)%2===0); o+=fTxt(540,1480,'LÊ EM VOZ ALTA!',86,bl?'#fff':FY); if(t>=1.26&&t<3.5) o+=fStamp(t,1.26,540,1610,'RÁPIDO!','#e0483a',90,-6); }
  if(t>=5.79) o+=fStamp(t,5.79,540,1510,'APANHADO!','#e0483a',88,-7);
  if(t>=7.76){ const k=pop(t,7.76); o+=`<g transform="translate(540 1665) scale(${k})">${fTxt(0,0,'O CÉREBRO ADIVINHA',62,'#fff')}</g>`; }
  return o+hookLer(t,2.9)+(t>2.9?fPill('FACTO 1/2',t-2.9):'');
};
// ponte sussurrada (11,6 – 14,4)
FP.ler_ponte=(t,dur)=>{
  const z=1+ease(t/dur)*.15;
  return `<rect width="1080" height="1920" fill="#05060f" stroke="none"/><g transform="translate(540 960) scale(${z}) translate(-540 -960)">${fTxt(540,880,'MAS O 2.º…',120,'#fff')}${fTxt(540,1040,'É AINDA MAIS',110,'#e0483a')}${fTxt(540,1170,'ESTRANHO',140,'#e0483a')}</g>`;
};
// 2.º facto (14,4 – 25,0) — local: 0,09 "lê esta frase"; pausa; 4,27 "as letras estão todas trocadas"; 6,36 "e tu leste na mesma"; 7,77 explicação
const CW=c=>('iíl'.includes(c)?0.32:'tfjr'.includes(c)?0.45:'mw'.includes(c)?0.98:',.'.includes(c)?0.3:c==='?'?0.56:'E'===c?0.66:0.66);
const FR_ERR=['Etsás','a','ler','itso','sem','pboemrlas,','não','etsás?'];
const FR_OK =['Estás','a','ler','isto','sem','problemas,','não','estás?'];
function mapLetras(err,ok){ // para cada letra baralhada, a posição certa
  const used=Array(ok.length).fill(false); return [...err].map((ch,j)=>{ if(ok[j]===ch&&!used[j]){used[j]=true;return j;} for(let i=0;i<ok.length;i++) if(!used[i]&&ok[i]===ch&&err[i]!==ok[i]){used[i]=true;return i;} for(let i=0;i<ok.length;i++) if(!used[i]&&ok[i]===ch){used[i]=true;return i;} return j; }); }
FP.ler2=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  o+=`<rect x="70" y="600" width="940" height="640" rx="40" fill="#fffaf0" stroke="${FK}" stroke-width="12"/>`;
  const SZ=96, ADV=SZ*0.66, lines=[[0,1,2],[3,4],[5],[6,7]], Y0=740, DY=140;
  const fix=ease(clamp((t-6.36)/0.8,0,1)), red=t>=4.27;
  lines.forEach((ids,li)=>{
    const wl=w=>[...w].reduce((q,c)=>q+CW(c),0)*SZ, SP=SZ*0.3;
    const tot=ids.reduce((q,i)=>q+wl(FR_OK[i]),0)+SP*(ids.length-1); let x=540-tot/2;
    ids.forEach((wi)=>{ const err=FR_ERR[wi], ok=FR_OK[wi], mp=mapLetras(err,ok);
      const posOk=[],posErr=[]; let a1=0,a2=0; [...ok].forEach(c=>{posOk.push(x+a1+CW(c)*SZ/2); a1+=CW(c)*SZ;}); [...err].forEach(c=>{posErr.push(x+a2+CW(c)*SZ/2); a2+=CW(c)*SZ;});
      [...err].forEach((ch,j)=>{ const i=mp[j], xs=posErr[j], xe=posOk[i], xx=xs+(xe-xs)*fix, moved=i!==j;
        const hop=moved?-40*Math.sin(Math.PI*fix):0;
        const col=moved&&red&&fix<1?'#e0483a':(moved&&fix>=1&&t<7.77?'#2f9e6e':FK);
        o+=`<text x="${xx}" y="${Y0+li*DY+hop}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none">${ch}</text>`; });
      if(t>=7.77){ const k=ease((t-7.77)/.4); o+=`<rect x="${x-10}" y="${Y0+li*DY-80}" width="${wl(ok)+20}" height="104" rx="18" fill="none" stroke="#4cc3f0" stroke-width="6" opacity="${k}"/>`; }
      x+=wl(ok)+SP; });
  });
  if(t<4.27){ const k=pop(t,0.09); const pl=1+.06*Math.sin(t*6); o+=`<g transform="translate(540 470) scale(${k*pl})">${fTxt(0,0,'LÊ ESTA FRASE',96,FY)}</g>`; }
  if(t>=4.27&&t<6.36) o+=fTxt(540,470,'LETRAS TROCADAS!',90,'#e0483a');
  if(t>=6.36) o+=fStamp(t,6.36,540,1400,'LESTE NA MESMA!','#2f9e6e',84,-6);
  if(t>=7.77){ const k=pop(t,7.77); o+=`<g transform="translate(540 470) scale(${k})">${fTxt(0,0,'LÊS A PALAVRA',86,'#fff')}${fTxt(0,96,'INTEIRA',96,FY)}</g>`; }
  return o+fPill('FACTO 2/2',t);
};
// fim (25,0 – fim)
FP.ler_fim=(t,dur)=>{
  if(t>dur-.35) return FP.ler1(0.1,11.6);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  o+=fTxt(540,640,'QUANTAS TE',115,'#fff')+fTxt(540,780,'APANHARAM?',120,FY);
  const cols=['#e0483a','#f6c744','#2f9e6e'];
  for(let i=0;i<3;i++){const on=Math.floor(t*5)%3===i; o+=`<g transform="translate(${260+i*280} 1100) scale(${on?1.15:1})"><circle r="115" fill="${cols[i]}" stroke="${FK}" stroke-width="12"/><text y="62" font-family="M" font-weight="900" font-size="180" fill="#fff" text-anchor="middle" stroke="none">${i}</text></g>`;}
  o+=fTxt(540,1420,'COMENTA!',100,'#fff');
  return o;
};
export {buildShot, buildFacto};
