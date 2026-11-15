// ===== 2 FATOS (BR) — Parte 2: anelar preso + túnel → cara que derrete =====
const AN={sk:'#f4b48c',skD:'#d98e62',skL:'#ffd9bd'};
function anDedo(x1,y1,x2,y2,w){ return `<path d="M${x1},${y1} L${x2},${y2}" stroke="${FK}" stroke-width="${w+14}" stroke-linecap="round"/><path d="M${x1},${y1} L${x2},${y2}" stroke="${AN.sk}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x1},${y1-w*.22} L${x2},${y2-w*.22}" stroke="${AN.skL}" stroke-width="${w*.25}" stroke-linecap="round" opacity=".7"/>`; }
// gaps: {th,ix,rg,pk} distância entre as pontas (0 = encostadas)
function anMaos(t,g){ let o='';
  for(const side of [-1,1]){
    const cx=540+side*300;
    // antebraço + palma
    o+=`<path d="M${cx-side*40},1900 L${cx+side*60},1900 L${cx+side*90},1250 Q${cx+side*100},1060 ${cx},1000 Q${cx-side*150},980 ${cx-side*180},1080 L${cx-side*150},1300 L${cx-side*80},1900 Z" fill="${AN.sk}" stroke="${FK}" stroke-width="8" transform="translate(0 0)"/>`;
    o+=`<path d="M${cx-side*120},1120 q${side*40},60 ${side*30},140" fill="none" stroke="${AN.skD}" stroke-width="7"/>`;
  }
  // dedos: base no topo/ lado da palma, ponta no centro
  const F=[['th',[380,1130],[540,1010],62],['ix',[400,1010],[540,760],52],['rg',[420,1050],[540,890],50],['pk',[430,1110],[540,990],44]];
  // médios dobrados (nós encostados no centro)
  for(const side of [-1,1]){ const bx=540-side*130; o+=`<path d="M${bx},1010 Q${540-side*40},960 ${540-side*22},1040" stroke="${FK}" stroke-width="66" fill="none" stroke-linecap="round"/><path d="M${bx},1010 Q${540-side*40},960 ${540-side*22},1040" stroke="${AN.skD}" stroke-width="52" fill="none" stroke-linecap="round"/>`; }
  for(const [k,b,tp,w] of F){ const gap=(g[k]||0), tr=k==='rg'?Math.sin(t*40)*3*(g.try||0):0;
    for(const side of [-1,1]){ const bx=540+side*(540-b[0]), tx=540+side*(gap/2+w*.42)+tr*side, ty=tp[1]-(k==='rg'?0:gap*.15);
      o+=anDedo(bx,b[1],tx,ty,w); }
    if(k==='rg'&&g.try>0){ const p=.5+.5*Math.sin(t*12); o+=`<circle cx="540" cy="${tp[1]}" r="${46+p*8}" fill="none" stroke="#ff3b3b" stroke-width="8" opacity="${.5+p*.5}"/>`; } }
  return o; }
function anTunel(t,cx=540,cy=900){ let o=`<rect width="1080" height="1920" fill="#0b0a2a"/>`; const ph=(t*1.2)%1;
  for(let k=22;k>=0;k--){ const r=Math.pow(k+ph,1.9)*5.5, c=(k%2)?'#ffd21f':'#0b0a2a'; const rot=(k+ph)*18-t*60;
    o+=`<g transform="rotate(${rot} ${cx} ${cy})"><rect x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" rx="${r*.18}" fill="${c}"/></g>`; }
  return o; }
// tempos (acertar à voz)
const ANT={tenta:3.0, nao:5.5, tend:8.0, tunel:9.06, cara:22.78, end:28.85};
FP.an_scene=(t)=>{ let s='', o='';
  if(t<ANT.tunel){ let g={th:0,ix:0,rg:0,pk:0,try:0};
    if(t>=ANT.tenta){ const u=t-ANT.tenta, c=(u%1.6)/1.6, k=c<.5?ease(c/.5):1-ease((c-.5)/.5);
      g={th:120*ease(clamp(u/.4,0,1))*(t<ANT.nao?k:1),ix:110*(t<ANT.nao?k:ease(clamp((t-ANT.nao)/.4,0,1))),pk:100*(t<ANT.nao?k:ease(clamp((t-ANT.nao)/.4,0,1))),rg:4*k,try:1}; }
    s+=`<g transform="translate(540 1060) scale(1.45) translate(-540 -1000)">${anMaos(t,g)}</g>`; o+=`<g transform="translate(540 ${1060+(890-1000)*1.45})"><path d="M90,-10 L40,0" stroke="${FY}" stroke-width="8"/><rect x="90" y="-36" width="190" height="56" rx="16" fill="${FY}" stroke="${FK}" stroke-width="5"/><text x="185" y="4" font-family="M" font-weight="900" font-size="36" fill="${FK}" text-anchor="middle">ANELAR</text></g>`;
    if(t>=ANT.nao&&t<ANT.tend) o+=fStamp(t,ANT.nao+.2,540,560,'ANELAR PRESO!','#e0483a',84,-4);
    if(t>=ANT.tend){ o+=`<g opacity="${clamp((t-ANT.tend)/.3,0,1)}"><path d="M540,890 L540,1300" stroke="#ff7ab8" stroke-width="10" stroke-dasharray="18 12"/></g>`; o+=fStamp(t,ANT.tend+.2,540,560,'TENDÃO LIGADO','#2e86d0',80,-4); }
  } else if(t<ANT.cara){ o+=anTunel(t);
    o+=`<circle cx="540" cy="900" r="40" fill="#fff" stroke="${FK}" stroke-width="8"/><circle cx="540" cy="900" r="18" fill="#e0483a"/>`;
    const k=pop(t,ANT.tunel,.25); o+=`<g transform="translate(540 250) scale(${k})"><rect x="-300" y="-62" width="600" height="124" rx="62" fill="#e0483a" stroke="${FK}" stroke-width="8"/><text y="24" font-family="M" font-weight="900" font-size="70" fill="#fff" text-anchor="middle">NÃO PISCA</text></g>`;
    const pr=clamp((t-ANT.tunel)/(ANT.cara-ANT.tunel),0,1); o+=`<g transform="translate(540 380)"><rect x="-300" y="-16" width="600" height="32" rx="16" fill="${FK}" stroke="#fff" stroke-width="5"/><rect x="-294" y="-10" width="${588*pr}" height="20" rx="10" fill="#fff"/></g>`;
  } else { const u=t-ANT.cara, sc=(40*(1-ease(clamp(u/4,0,1)))+10).toFixed(1), bf=(0.011+0.003*Math.sin(t*2.2)).toFixed(4), bf2=(0.014+0.003*Math.cos(t*1.7)).toFixed(4);
    o+=`<rect width="1080" height="1920" fill="#fbe9d6"/><defs><filter id="anW" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="${bf} ${bf2}" numOctaves="2" seed="${Math.floor(t*6)%50}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${sc}" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
    o+=`<g filter="url(#anW)"><g transform="translate(540 1050) scale(1.15) translate(-540 -1000)">${lgDefs()}${lgFace(t,'feliz')}</g></g>`;
    if(u>1.2) o+=fStamp(t,ANT.cara+1.2,540,420,'DERRETENDO!','#e0483a',90,-4); }
  return {s,o}; };
