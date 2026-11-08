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
