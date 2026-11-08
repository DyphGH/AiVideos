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
