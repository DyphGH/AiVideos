// ===== 2 FATOS (BR) — Órgãos impressos em 3D na ISS + 2026 ED138 (mundo de gelo além de Plutão) =====
const EST={espaco:4.59, mistura:5.84, monta:8.95, figado:10.2, rim:11.0, cart:11.8, porque:13.02, semg:14.48, fato2:18.12, alem:21.43, tam:23.16, esc:25.77, sexto:28.66, fim:31.49, botoes:32.6, end:34.5};
function esCeu(t,seed=1){ let o=`<defs><radialGradient id="esSky" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#1c1a4e"/><stop offset="1" stop-color="#03040f"/></radialGradient></defs><rect width="1080" height="1920" fill="url(#esSky)"/>`;
  for(let i=0;i<90;i++){ const x=(i*157*seed)%1080, y=(i*263+seed*37)%1920, r=1+(i%3)*.8, tw=.4+.6*Math.abs(Math.sin(t*1.5+i)); o+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${tw*.8}"/>`; }
  return o; }
// estação espacial pequena
function esISS(x,y,s,t){ const r=Math.sin(t*.5)*4; return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" stroke="${FK}" stroke-width="6" stroke-linejoin="round"><rect x="-260" y="-6" width="520" height="12" fill="#c9ced8"/>${[-220,-150,150,220].map(px=>`<rect x="${px-30}" y="-110" width="60" height="220" fill="#2e5fb0"/><path d="M${px-30},-55 h60 M${px-30},0 h60 M${px-30},55 h60" stroke="#7fb0ff" stroke-width="4"/>`).join('')}<rect x="-90" y="-30" width="180" height="60" rx="20" fill="#e9edf3"/><rect x="-30" y="-60" width="60" height="120" rx="18" fill="#dfe5ee"/></g>`; }
// impressora 3D: bico a mover e camadas a crescer
function esImpressora(t,cx,cy,prog,shape='figado'){ let o=`<g stroke="${FK}" stroke-width="9" stroke-linejoin="round">`;
  o+=`<rect x="${cx-330}" y="${cy-420}" width="660" height="640" rx="40" fill="#dfe5ee"/><rect x="${cx-290}" y="${cy-380}" width="580" height="560" rx="26" fill="#1a2240"/>`;
  o+=`<rect x="${cx-290}" y="${cy-360}" width="580" height="26" fill="#9aa6bb"/>`;
  const nx=cx+Math.sin(t*6)*170, ny=cy-200+Math.sin(t*2)*20;
  o+=`<rect x="${nx-50}" y="${cy-372}" width="100" height="50" rx="10" fill="#c9ced8"/><rect x="${nx-24}" y="${cy-322}" width="48" height="${ny-cy+322}" fill="#e9edf3"/><path d="M${nx-24},${ny} L${nx},${ny+40} L${nx+24},${ny} Z" fill="#ff7ab8"/>`;
  o+=`<rect x="${cx-220}" y="${cy+110}" width="440" height="40" rx="10" fill="#9aa6bb"/>`;
  // objeto a ser impresso (cresce por camadas)
  const h=180*prog; o+=`<clipPath id="esClip"><rect x="${cx-250}" y="${cy+110-h}" width="500" height="${h}"/></clipPath><g clip-path="url(#esClip)">${esOrgao(shape,cx,cy+20,1)}</g>`;
  for(let i=0;i<5;i++) o+=`<path d="M${cx-200},${cy+110-h+i*14} H${cx+200}" stroke="#fff" stroke-width="2" opacity=".25"/>`;
  o+=`<circle cx="${nx}" cy="${ny+50}" r="10" fill="#ff7ab8" stroke="none" opacity="${.5+.5*Math.sin(t*20)}"/>`;
  return o+`</g>`; }
function esOrgao(n,x,y,s){ let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round">`;
  if(n==='figado') o+=`<path d="M-170,-30 Q-160,-90 -60,-90 Q80,-100 170,-60 Q190,-30 150,0 Q60,70 -60,80 Q-170,70 -170,-30 Z" fill="#b5413a"/><path d="M-20,-90 Q0,-10 -40,70" fill="none" stroke="#7d2a24" stroke-width="7"/><ellipse cx="-90" cy="-40" rx="40" ry="16" fill="#e07068" stroke="none" opacity=".7"/>`;
  else if(n==='rim') o+=`<path d="M-60,-110 Q60,-130 90,-30 Q100,30 60,40 Q20,40 20,0 Q20,-20 0,-10 Q-30,10 0,60 Q30,110 -50,120 Q-140,110 -140,0 Q-140,-90 -60,-110 Z" fill="#a8434d"/><ellipse cx="-80" cy="-40" rx="30" ry="14" fill="#d87580" stroke="none" opacity=".7"/>`;
  else o+=`<path d="M-90,-100 Q60,-140 90,-20 Q110,90 10,120 Q-40,130 -40,80 Q20,70 30,10 Q30,-60 -50,-50 Q-110,-50 -90,-100 Z" fill="#d9e6f0"/><path d="M-60,-80 Q40,-100 60,-20" fill="none" stroke="#a9bccc" stroke-width="7"/>`;
  return o+`</g>`; }
function esMundo(x,y,r,t,q=false){ return `<g transform="translate(${x} ${y})"><circle r="${r*1.5}" fill="#7fe3ff" opacity=".12"/><circle r="${r}" fill="#d6ecff" stroke="${FK}" stroke-width="${Math.max(4,r*.06)}"/><circle cx="${r*.35}" cy="${r*.1}" r="${r*.2}" fill="#b9daf5" stroke="#8fb8dc" stroke-width="${r*.04}"/><circle cx="${-r*.25}" cy="${r*.45}" r="${r*.13}" fill="#b9daf5" stroke="#8fb8dc" stroke-width="${r*.04}"/><circle cx="${r*.1}" cy="${-r*.5}" r="${r*.09}" fill="#b9daf5"/><circle cx="${-r*.3}" cy="${-r*.35}" r="${r*.18}" fill="#fff" opacity=".7"/>${q?`<text y="${r*.35}" font-family="M" font-weight="900" font-size="${r*1.1}" fill="${FK}" text-anchor="middle" opacity=".85">?</text>`:''}</g>`; }
FP.es_scene=(t)=>{ let b=esCeu(t), s='', o='';
  if(t<EST.mistura){ // impressora na ISS
    s+=esImpressora(t,540,1000,clamp(t/5,0,1),'figado');
    o+=`<g transform="translate(880 520) scale(.85)"><circle r="120" fill="#03040f" stroke="#fff" stroke-width="8"/><clipPath id="esW"><circle r="114"/></clipPath><g clip-path="url(#esW)"><circle cy="300" r="260" fill="#2e86d0"/><path d="M-120,90 Q-40,60 20,90 Q80,120 140,80" fill="none" stroke="#2fa860" stroke-width="30"/>${esISS(0,-20,.3,t)}</g></g>`;
    if(t>=EST.espaco) o+=fStamp(t,EST.espaco,420,1260,'NO ESPAÇO!','#e0483a',90,-6); else o+=fTxt(370,480,'ÓRGÃOS EM 3D',70,'#ff7ab8');
  } else if(t<EST.monta){ // células + tinta
    const u=t-EST.mistura; s+=`<g stroke="${FK}" stroke-width="9"><rect x="380" y="560" width="320" height="640" rx="40" fill="#e9edf3" fill-opacity=".25"/><path d="M380,880 h320 v280 q0,40 -40,40 h-240 q-40,0 -40,-40 Z" fill="#ff7ab8" opacity=".75"/></g>`;
    for(let i=0;i<22;i++){ const a=i*1.7+u*2, rr=(i%5)*24, x=540+Math.cos(a)*rr*1.6, y=1040+Math.sin(a)*rr*1.3-(i%3)*30; s+=`<circle cx="${x}" cy="${y}" r="${14+i%3*4}" fill="#ffd9a8" stroke="${FK}" stroke-width="4"/><circle cx="${x+3}" cy="${y-2}" r="5" fill="#b5413a"/>`; }
    o+=fTxt(260,760,'CÉLULAS',62,'#ffd9a8')+fTxt(840,1180,'TINTA',62,'#ff7ab8');
    o+=`<path d="M300,790 Q360,880 450,960" fill="none" stroke="#ffd9a8" stroke-width="8" stroke-dasharray="16 10"/><path d="M820,1130 Q760,1110 700,1080" fill="none" stroke="#ff7ab8" stroke-width="8" stroke-dasharray="16 10"/>`;
  } else if(t<EST.porque){ // fígado, rim, cartilagem
    s+=esImpressora(t,540,830,clamp((t-EST.monta)/1.2,0,1),'figado');
    [['figado',EST.figado,230,'FÍGADO'],['rim',EST.rim,540,'RIM'],['cart',EST.cart,850,'CARTILAGEM']].forEach(([n,t0,x,nm])=>{ if(t<t0) return; const k=pop(t,t0,.25); s+=`<g transform="translate(${x} 1180) scale(${k*.75})">${esOrgao(n,0,0,1)}</g>`; o+=fTxt(x,1310,nm,n==='cart'?40:50,'#fff'); });
  } else if(t<EST.fato2){ // porquê sem gravidade
    const u=clamp((t-EST.semg)/1.2,0,1);
    b+=`<line x1="540" y1="430" x2="540" y2="1340" stroke="#fff" stroke-width="6" stroke-dasharray="20 14" opacity=".5"/>`;
    o+=fTxt(290,560,'NA TERRA',58,'#fff')+fTxt(790,560,'NO ESPAÇO',58,FY);
    for(let i=0;i<3;i++) o+=`<path d="M${200+i*90},680 v90 m-18,-24 l18,24 l18,-24" fill="none" stroke="#ff8a8a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
    const sq=1-.65*u; s+=`<g transform="translate(290 1180) scale(${1+.5*u} ${sq}) translate(0 -150)">${esOrgao('figado',0,0,.9)}</g><rect x="120" y="1180" width="340" height="24" rx="8" fill="#9aa6bb" stroke="${FK}" stroke-width="6"/>`;
    const fl=Math.sin(t*2)*16; s+=`<g transform="translate(790 ${1000+fl}) rotate(${Math.sin(t)*6})">${esOrgao('figado',0,0,.9)}</g>`;
    if(t>=EST.semg){ o+=ecX(t,EST.semg+.6,420,900,50)+ecOk(t,EST.semg+.9,960,860,50); o+=fStamp(t,EST.semg+.2,540,1300,'SEM GRAVIDADE','#2e86d0',64,-4); }
    else o+=fStamp(t,EST.porque+.1,540,430,'POR QUÊ?','#e0483a',90,-5);
  } else if(t<EST.tam){ // mundo de gelo além de Plutão
    b=esCeu(t,3); const u=t-EST.fato2;
    b+=`<circle cx="-600" cy="960" r="0"/>`; for(const r of [250,420,620,900,1250]) b+=`<ellipse cx="-80" cy="960" rx="${r}" ry="${r*.35}" fill="none" stroke="#5a6aa0" stroke-width="3" opacity=".5"/>`;
    s+=`<circle cx="-80" cy="960" r="90" fill="#ffd21f" stroke="${FK}" stroke-width="8"/>`;
    s+=`<g transform="translate(${-80+900*Math.cos(-.5)} ${960+900*.35*Math.sin(-.5)})"><circle r="26" fill="#c9a88a" stroke="${FK}" stroke-width="6"/></g>`;
    o+=fTxt(-80+900*Math.cos(-.5),960+900*.35*Math.sin(-.5)-50,'PLUTÃO',40,'#fff');
    const k=ease(clamp((u-.6)/1.2,0,1)); s+=`<g transform="translate(${880+(1-k)*200} ${1120}) scale(${.4+.6*k})">${esMundo(0,0,110,t,t<EST.alem)}</g>`;
    if(t<EST.alem) o+=fTxt(540,560,'FATO 2',100,FY); else o+=fStamp(t,EST.alem,540,520,'ALÉM DE PLUTÃO','#2e86d0',70,-4);
  } else if(t<EST.esc){ // tamanho
    b=esCeu(t,3); s+=esMundo(540,900,280,t);
    const km=Math.round(1500*ease(clamp((t-EST.tam-.2)/1.6,0,1))); const k=pop(t,EST.tam,.25);
    o+=`<g transform="translate(540 1270) scale(${k})"><path d="M-300,0 H300 M-300,-26 V26 M300,-26 V26" stroke="${FY}" stroke-width="10" fill="none"/><rect x="-220" y="-130" width="440" height="100" rx="24" fill="${FK}" stroke="${FY}" stroke-width="6"/><text y="-58" font-family="M" font-weight="900" font-size="64" fill="${FY}" text-anchor="middle">ATÉ ${km} KM</text></g>`;
  } else if(t<EST.sexto){ // escondido na Via Láctea
    b=esCeu(t,5); const band=`<g transform="rotate(-30 540 960)"><ellipse cx="540" cy="960" rx="900" ry="220" fill="#b9a2ff" opacity=".18"/><ellipse cx="540" cy="960" rx="900" ry="110" fill="#fff" opacity=".1"/></g>`; b+=band;
    for(let i=0;i<220;i++){ const a=(i*.618)%1, x=a*1080, y=960+(x-540)*(-.577)+((i*97)%300-150); b+=`<circle cx="${x}" cy="${y}" r="${1.5+(i%4)}" fill="#fff" opacity="${.4+(i%5)*.12}"/>`; }
    const mx=420+Math.sin((t-EST.esc)*1.5)*120*(1-clamp((t-EST.esc)/2,0,1)), my=1010; const found=t>EST.esc+1.9;
    s+=esMundo(420,1010,18,t);
    o+=`<g transform="translate(${mx} ${my})"><circle r="150" fill="none" stroke="${found?FY:'#fff'}" stroke-width="14"/><path d="M106,106 L210,210" stroke="${found?FY:'#fff'}" stroke-width="28" stroke-linecap="round"/></g>`;
    o+=fStamp(t,EST.esc+.2,540,500,'ESCONDIDO','#e0483a',90,-5);
  } else if(t<EST.fim){ // 6.º planeta anão
    b=esCeu(t,2); const N=[['CERES',40,'#9a8f86'],['PLUTÃO',70,'#c9a88a'],['ÉRIS',66,'#e8e8f0'],['HAUMEA',52,'#d9d0c8'],['MAKEMAKE',56,'#d9a07a']];
    N.forEach(([n,r,c],i)=>{ const x=180+(i%3)*360, y=i<3?720:960, k=pop(t,EST.sexto+i*.12,.2); s+=`<g transform="translate(${x} ${y}) scale(${k})"><circle r="${r}" fill="${c}" stroke="${FK}" stroke-width="6"/></g>`; o+=fTxt(x,y+r+50,n,34,'#fff'); });
    const k=pop(t,EST.sexto+.9,.3); s+=`<g transform="translate(900 960) scale(${k})">${esMundo(0,0,80,t,true)}</g>`;
    o+=fStamp(t,EST.sexto+1.1,540,1250,'O 6º?','#e0483a',110,-6);
  } else { // órgão ou planeta?
    s+=`<g transform="translate(300 900) scale(.9)">${esOrgao('figado',0,0,1)}</g>`+esMundo(780,900,120,t);
    if(t>=EST.botoes){ const k=pop(t,EST.botoes,.25); o+=`<g transform="translate(540 1200) scale(${k})">`;
      [['ÓRGÃO','#e0483a',-230],['PLANETA','#2e86d0',230]].forEach(([n,c,x],i)=>{ const bb=Math.sin(t*6+i*2)*8; o+=`<g transform="translate(${x} ${bb})"><rect x="-210" y="-80" width="420" height="160" rx="40" fill="${c}" stroke="${FK}" stroke-width="10"/><text y="30" font-family="M" font-weight="900" font-size="72" fill="#fff" text-anchor="middle">${n}</text></g>`; });
      o+=`</g>`; }
    o+=fStamp(t,EST.fim+.1,540,520,'QUAL TE CHOCOU?','#e0483a',56,-4); }
  return {b,s,o}; };
