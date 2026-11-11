// ===== 2 FATOS (BR) — Tendão do pulso + espiral (a mão "derrete") =====
const TSK='#f1c49d', TSH='#d99d75', THL='#fde3cb', TLN='#3a2418';
const lerp=(a,b,k)=>a+(b-a)*k;
const lp=(A,B,k)=>[lerp(A[0],B[0],k),lerp(A[1],B[1],k)];
function tdDefs(){ return `<defs><linearGradient id="tdArm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d99d75"/><stop offset=".25" stop-color="#f1c49d"/><stop offset=".6" stop-color="#f6cfab"/><stop offset="1" stop-color="#d39568"/></linearGradient><radialGradient id="tdPalm" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#f8d4b2"/><stop offset=".7" stop-color="#f1c49d"/><stop offset="1" stop-color="#dfa77e"/></radialGradient><radialGradient id="tdVig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient></defs>`; }
// mão direita, palma virada para quem vê (POV). pinch 0..1 (polegar+mindinho), flex 0..1 (tendão)
function maoPalma(t,{pinch=1,flex=0,tendao=true}={}){
  let o=`<g stroke-linecap="round" stroke-linejoin="round">`;
  // antebraço
  o+=`<path d="M420,1330 C408,1500 398,1700 388,1940 L702,1940 C694,1700 676,1500 662,1330 Z" fill="url(#tdArm)" stroke="${FK}" stroke-width="8"/>`;
  // tendões do antebraço
  o+=`<path d="M600,1340 C605,1500 610,1650 615,1900" fill="none" stroke="${TSH}" stroke-width="5" opacity=".5"/><path d="M470,1340 C468,1500 466,1650 462,1900" fill="none" stroke="${TSH}" stroke-width="5" opacity=".4"/>`;
  if(tendao&&flex>0){ const k=flex;
    o+=`<g opacity="${k}"><path d="M530,1290 C528,1420 527,1560 532,1760" fill="none" stroke="#a8704c" stroke-width="12"/><path d="M566,1290 C568,1420 569,1560 562,1760" fill="none" stroke="#a8704c" stroke-width="12"/><path d="M548,1290 C548,1420 548,1560 547,1770" fill="none" stroke="${THL}" stroke-width="${10+12*k}"/><path d="M542,1300 C542,1420 542,1560 541,1740" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/></g>`; }
  // dedos esticados (indicador, médio, anelar) — lado da palma, sem unhas
  const dedo=(x,yb,yt,w,rot)=>{ const h=yb-yt; return `<g transform="rotate(${rot} ${x} ${yb})"><rect x="${x-w/2}" y="${yt}" width="${w}" height="${h+40}" rx="${w/2}" fill="${TSK}" stroke="${FK}" stroke-width="8"/><ellipse cx="${x}" cy="${yt+w*.55}" rx="${w*.3}" ry="${w*.38}" fill="${THL}" opacity=".7"/><path d="M${x-w*.32},${yt+h*.38} q${w*.32},${w*.14} ${w*.64},0 M${x-w*.34},${yt+h*.66} q${w*.34},${w*.16} ${w*.68},0" fill="none" stroke="${TSH}" stroke-width="5"/><path d="M${x+w*.3},${yt+w*.4} L${x+w*.32},${yb}" stroke="${TSH}" stroke-width="6" opacity=".5"/></g>`; };
  o+=dedo(652,1015,655,72,6)+dedo(568,1005,598,76,1)+dedo(488,1012,648,70,-5);
  // palma
  o+=`<path d="M430,1332 C414,1240 376,1140 384,1022 Q540,975 692,1000 C702,1040 706,1070 714,1096 C752,1150 748,1250 652,1332 Z" fill="url(#tdPalm)" stroke="${FK}" stroke-width="8"/>`;
  // linhas da mão
  o+=`<path d="M395,1085 Q520,1060 640,1040 M400,1150 Q500,1130 590,1160 M690,1110 Q600,1180 610,1300" fill="none" stroke="#c88a62" stroke-width="5"/><path d="M700,1140 Q730,1220 660,1300" fill="none" stroke="${TSH}" stroke-width="7" opacity=".6"/>`;
  // pulso (pregas)
  o+=`<path d="M440,1318 q100,18 205,0 M448,1342 q95,14 192,0" fill="none" stroke="#c88a62" stroke-width="5"/>`;
  // mindinho (abre → dobra até ao polegar)
  const P0=[406,1032], PcO=[400,900], PeO=[394,770], PcC=[452,1018], PeC=[524,1094];
  const pc=lp(PcO,PcC,pinch), pe=lp(PeO,PeC,pinch);
  const pd=`M${P0} Q${pc} ${pe}`;
  o+=`<path d="${pd}" fill="none" stroke="${FK}" stroke-width="72"/><path d="${pd}" fill="none" stroke="${TSK}" stroke-width="56"/><path d="${pd}" fill="none" stroke="${THL}" stroke-width="16" opacity=".5"/>`;
  // polegar (abre → cruza a palma)
  const T0=[702,1196], TcO=[770,1080], TeO=[800,960], TcC=[700,1080], TeC=[552,1100];
  const tc=lp(TcO,TcC,pinch), te=lp(TeO,TeC,pinch);
  const td=`M${T0} Q${tc} ${te}`;
  o+=`<path d="${td}" fill="none" stroke="${FK}" stroke-width="88"/><path d="${td}" fill="none" stroke="${TSK}" stroke-width="72"/><path d="${td}" fill="none" stroke="${THL}" stroke-width="20" opacity=".5"/><ellipse cx="${te[0]+10}" cy="${te[1]-4}" rx="20" ry="16" fill="${THL}" opacity=".6"/>`;
  if(pinch>0.95){ const g=.5+.5*Math.sin(t*12); o+=`<circle cx="538" cy="1098" r="${18+g*10}" fill="none" stroke="#fff" stroke-width="5" opacity="${.5+g*.4}"/>`; }
  return o+`</g>`;
}
function tdHook(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="48" y="162" width="1000" height="200" rx="26" fill="#000" opacity=".25"/><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="66" fill="${FK}" text-anchor="middle">EM 20 SEGUNDOS SUA</text><text x="540" y="318" font-family="M" font-weight="900" font-size="66" fill="#e0483a" text-anchor="middle">MÃO VAI DERRETER</text></g>`; }
function bonecos(x,y,t,t0){ let o=''; for(let i=0;i<7;i++){ const k=pop(t,t0+i*.06,.18), red=i===6, cx=x-270+i*90; o+=`<g transform="translate(${cx} ${y}) scale(${k})"><circle cy="-30" r="22" fill="${red?'#e0483a':'#fff'}" stroke="${FK}" stroke-width="6"/><path d="M-30,30 Q-30,-4 0,-4 Q30,-4 30,30 Z" fill="${red?'#e0483a':'#fff'}" stroke="${FK}" stroke-width="6"/></g>`; } return o; }

// 1 · Tendão (0 – 10,63) · "viu?" 3,38 · "se não saltou" 6,02
FP.td_tendao=(t,dur)=>{
  let o=tdDefs()+fBg(t,'#2a2470','#0b0a2a',1100);
  const pinch=clamp(.55+ease(clamp(t/0.9,0,1))*.45,0,1);
  const flex=ease(clamp((t-2.2)/1.1,0,1));
  const z=1.06-.06*ease(clamp(t/3,0,1)), bend=flex*.035;
  o+=`<g transform="translate(540 1330) scale(${z+bend} ${z}) translate(-540 -1330)">`+maoPalma(t,{pinch,flex})+`</g>`;
  if(t>=3.38){ const k=t-3.38; for(let i=0;i<3;i++){ const p=((k*1.4+i/3)%1); if(k<2.5) o+=`<ellipse cx="548" cy="1460" rx="${40+p*160}" ry="${60+p*200}" fill="none" stroke="${FY}" stroke-width="${8*(1-p)}" opacity="${1-p}"/>`; }
    if(t<6.02){ const s=pop(t,3.5,.2); o+=`<g transform="translate(820 1230) scale(${s}) rotate(-6)"><path d="M-150,40 L-260,190" stroke="${FK}" stroke-width="14" stroke-linecap="round"/><path d="M-150,40 L-260,190" stroke="${FY}" stroke-width="6" stroke-linecap="round"/><rect x="-185" y="-55" width="370" height="110" rx="20" fill="${FY}" stroke="${FK}" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="62" fill="${FK}" text-anchor="middle">TENDÃO!</text></g>`; } }
  if(t>=6.02){ o+=`<g>${bonecos(540,520,t,6.1)}</g>`; if(t>=7.39) o+=fStamp(t,7.39,540,700,'1 EM 7 NASCE SEM','#e0483a',70,-4); }
  return o+tdHook(t,10.63);
};
// 2 · Espiral (10,63 – 21,38) — fixar 10 s
function espiral(cx,cy,rot,R=1400,N=6,a=0.0068,c1=FY,c2=FK){
  let o=`<rect x="${cx-R}" y="${cy-R}" width="${2*R}" height="${2*R}" fill="${c2}"/>`;
  for(let k=0;k<N;k++){ const off=k*2*Math.PI/N+rot, w=Math.PI/N; let A=[],B=[];
    for(let r=0;r<=R;r+=18){ const th=a*r+off; A.push(`${(cx+Math.cos(th)*r).toFixed(1)},${(cy+Math.sin(th)*r).toFixed(1)}`); const th2=th+w; B.push(`${(cx+Math.cos(th2)*r).toFixed(1)},${(cy+Math.sin(th2)*r).toFixed(1)}`); }
    o+=`<path d="M${A.join(' L')} L${B.reverse().join(' L')} Z" fill="${c1}"/>`; }
  return o; }
FP.td_espiral=(t,dur)=>{
  const rot=-t*3.2; let o=tdDefs();
  o+=`<g>${espiral(540,960,rot)}</g><rect width="1080" height="1920" fill="url(#tdVig)"/>`;
  const pl=.5+.5*Math.sin(t*8);
  o+=`<circle cx="540" cy="960" r="44" fill="#fff" stroke="${FK}" stroke-width="8"/><circle cx="540" cy="960" r="${18+pl*4}" fill="#e0483a"/>`;
  const k=pop(t,0,.25); o+=`<g transform="translate(540 250) scale(${k})"><rect x="-300" y="-62" width="600" height="124" rx="62" fill="#e0483a" stroke="${FK}" stroke-width="8"/><text y="24" font-family="M" font-weight="900" font-size="70" fill="#fff" text-anchor="middle">NÃO PISCA</text></g>`;
  const pr=clamp(t/(dur-.05),0,1); o+=`<g transform="translate(540 380)"><rect x="-300" y="-16" width="600" height="32" rx="16" fill="${FK}" stroke="#fff" stroke-width="5"/><rect x="-294" y="-10" width="${588*pr}" height="20" rx="10" fill="#fff"/></g>`;
  return o; };
// 3 · A mão "mexe" (21,38 – 26,43) · cérebro 23,93 → local 2,55
FP.td_mao=(t,dur)=>{
  let o=tdDefs()+`<rect width="1080" height="1920" fill="#fbe9d6"/>`;
  for(let i=0;i<14;i++){ const a=i*Math.PI/7; o+=`<path d="M540,1100 L${540+Math.cos(a)*1600},${1100+Math.sin(a)*1600} L${540+Math.cos(a+.12)*1600},${1100+Math.sin(a+.12)*1600} Z" fill="#fff" opacity=".35"/>`; }
  const sc=(36*(1-ease(clamp(t/4.5,0,1)))+8).toFixed(1), bf=(0.011+0.003*Math.sin(t*2.2)).toFixed(4), bf2=(0.014+0.003*Math.cos(t*1.7)).toFixed(4);
  o+=`<defs><filter id="tdW" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="${bf} ${bf2}" numOctaves="2" seed="${Math.floor(t*6)%50}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${sc}" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
  o+=`<g filter="url(#tdW)">`+maoPalma(t,{pinch:0,flex:0,tendao:false})+`</g>`;
  if(t<2.55){ const s=pop(t,0.1,.2); o+=`<g transform="translate(540 340) scale(${s})">${fTxt(0,0,'TÁ SE',110,'#fff')}${fTxt(0,120,'MEXENDO?',130,FY)}</g>`; }
  else { const s=pop(t,2.55,.2), r=(t-2.55)*200;
    o+=`<g transform="translate(540 400) scale(${s})"><g transform="rotate(${r})"><path d="M-170,0 A170,170 0 0 1 120,-120" fill="none" stroke="#e0483a" stroke-width="16"/><path d="M120,-120 l-6,44 l40,-20 Z" fill="#e0483a"/><path d="M170,0 A170,170 0 0 1 -120,120" fill="none" stroke="#e0483a" stroke-width="16"/><path d="M-120,120 l6,-44 l-40,20 Z" fill="#e0483a"/></g>`;
    o+=`<path d="M-110,30 C-150,-10 -130,-90 -60,-95 C-40,-140 40,-140 60,-95 C130,-90 150,-10 110,30 C110,80 40,95 0,80 C-40,95 -110,80 -110,30 Z" fill="#f4a4b6" stroke="${FK}" stroke-width="8"/><path d="M0,-118 V80 M-80,-40 q30,-20 50,10 M30,-30 q30,-30 60,0 M-70,30 q30,10 40,-20 M30,30 q30,20 50,-10" fill="none" stroke="#c2617a" stroke-width="6"/></g>`;
    o+=fStamp(t,2.75,540,690,'AINDA GIRANDO','#e0483a',64,-4); }
  return o; };
// 4 · Fim (≤2–4 s com voz, movimento) + loop
FP.td_fim=(t,dur)=>{
  if(t>dur-.25) return FP.td_tendao(0.05,10.63);
  let o=tdDefs()+fBg(t,'#2a2470','#0b0a2a',1000);
  o+=`<g opacity=".18"><g transform="translate(540 1150) scale(.45) translate(-540 -960)">${espiral(540,960,-t*3.2,900,6,0.0068,FY,'none')}</g></g>`;
  const k=pop(t,0); o+=`<g transform="translate(540 560) scale(${k})">${fTxt(0,0,'MANDA PRA QUEM',100,'#fff')}${fTxt(0,120,'NÃO ACREDITA 😂',100,FY)}</g>`;
  const w=Math.sin(t*6)*8; o+=`<g transform="translate(540 1050) rotate(${w}) scale(.55) translate(-540 -1150)">`+maoPalma(t,{pinch:0,flex:0,tendao:false})+`</g>`;
  if(t>0.15){ const p=pop(t,0.15); o+=`<g transform="translate(540 1420) scale(${p})"><rect x="-414" y="-67" width="840" height="150" rx="75" fill="#000" opacity=".3"/><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${FY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle">TEM MAIS 2 FATOS</text></g>`; }
  return o; };
