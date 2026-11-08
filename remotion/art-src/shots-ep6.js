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
