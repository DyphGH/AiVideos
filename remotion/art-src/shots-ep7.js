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
