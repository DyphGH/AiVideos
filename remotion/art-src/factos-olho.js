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
