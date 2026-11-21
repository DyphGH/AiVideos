// ===== 2 FATOS (BR) — Porque é que o celular deixa de carregar (fiapos na entrada) =====
const CFT={bolso:3.83, fiapos:5.69, empurra:8.62, fundo:11.08, feltro:12.76, naoenc:16.0, contatos:18.33, parada:20.16, limpar:21.82, palito:22.57, clique:25.0, metal:26.21, fim:27.35, botoes:28.0, end:30.12};
const CFP={x0:330,x1:750,y0:500,y1:1000}; // cavidade da entrada (fundo em cima)
function cfFundo(){ let o=`<rect width="1080" height="1920" fill="#120a2a"/>`;
  for(let i=-20;i<40;i++) o+=`<path d="M${i*60},0 L${i*60+1920},1920" stroke="#2a1a55" stroke-width="18" opacity=".5"/>`;
  return o; }
// corpo do telemóvel em corte + cavidade + contactos
function cfPorta(t){ const {x0,x1,y0,y1}=CFP; let o=`<g stroke-linejoin="round">`;
  o+=`<rect x="-20" y="260" width="1120" height="${y1-260}" fill="#2a1d5c"/><path d="M-20,${y1} H1100" stroke="#b56cff" stroke-width="10"/>`;
  o+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="#05030f" stroke="#ff7ab8" stroke-width="8"/>`;
  for(let i=0;i<8;i++){ const x=x0+40+i*((x1-x0-80)/7); o+=`<path d="M${x},${y0+4} q14,20 0,40" fill="none" stroke="#ffcc4d" stroke-width="10" stroke-linecap="round"/>`; }
  return o+`</g>`; }
// fiapos soltos dentro da cavidade
function cfFiapos(t,n,seed=1){ const {x0,x1,y0,y1}=CFP; let o='';
  for(let i=0;i<n;i++){ const x=x0+20+((i*97*seed)%(x1-x0-40)), y=y0+60+((i*53+t*30*(1+i%3))%(y1-y0-80)), a=(i*37)%180, L=30+i%4*12;
    o+=`<path d="M${x},${y} q${L/2*Math.cos(a)},${L/2} ${L*Math.cos(a)},${L*Math.sin(a)*.4}" fill="none" stroke="#f0e6ff" stroke-width="3" opacity=".85"/>`; }
  return o; }
// camada de feltro no fundo (espessura f)
function cfFeltro(f,glow=0){ if(f<=0) return ''; const {x0,x1,y0}=CFP; let o=`<rect x="${x0+4}" y="${y0+4}" width="${x1-x0-8}" height="${f}" fill="#d8cdea"/>`;
  for(let i=0;i<70;i++){ const x=x0+8+((i*61)%(x1-x0-16)), y=y0+8+((i*29)%Math.max(4,f-8)); o+=`<path d="M${x},${y} l${(i%5-2)*9},${(i%3)*5+3}" stroke="#8d7aa8" stroke-width="3"/>`; }
  if(glow) o+=`<rect x="${x0+4}" y="${y0+4}" width="${x1-x0-8}" height="${f}" fill="none" stroke="#ff3b3b" stroke-width="8"/>`;
  return o; }
// ficha do cabo (ponta em tipY)
function cfFicha(tipY,ok=false){ const {x0,x1}=CFP; let o=`<g stroke="${FK}" stroke-width="7" stroke-linejoin="round">`;
  o+=`<defs><linearGradient id="cfMet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f8fb0"/><stop offset=".5" stop-color="#e6e6f5"/><stop offset="1" stop-color="#7a7a9a"/></linearGradient></defs>`;
  o+=`<rect x="${x0+24}" y="${tipY}" width="${x1-x0-48}" height="${1150-tipY}" rx="16" fill="url(#cfMet)"/>`;
  for(let i=0;i<8;i++){ const x=x0+52+i*((x1-x0-104)/7); o+=`<rect x="${x-11}" y="${tipY+14}" width="22" height="150" rx="10" fill="${ok?'#ffe27a':'#e0a830'}" stroke="#8a5a10" stroke-width="4"/>`; }
  o+=`<rect x="250" y="1150" width="580" height="260" rx="60" fill="#eeeef6"/>`;
  return o+`</g>`; }
function cfBateria(x,y,s,t,pct,ok){ const blink=ok?1:(Math.sin(t*8)>0?1:.35); const w=Math.max(.12,pct/100);
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="7"><rect x="-120" y="-55" width="240" height="110" rx="22" fill="#1a1238" stroke="${ok?'#5fe08a':'#ff5a6a'}" stroke-width="9"/><rect x="120" y="-20" width="16" height="40" rx="6" fill="${ok?'#5fe08a':'#ff5a6a'}"/><rect x="-104" y="-39" width="${208*w}" height="78" rx="12" fill="${ok?'#5fe08a':'#ff5a6a'}" opacity="${blink}" stroke="none"/>${ok?`<path d="M10,-40 L-20,6 L4,6 L-8,42 L26,-6 L2,-6 Z" fill="#fff" stroke-width="5"/>`:''}<text y="120" font-family="M" font-weight="900" font-size="70" fill="${ok?'#5fe08a':'#ff5a6a'}" text-anchor="middle" stroke-width="10" paint-order="stroke">${Math.round(pct)}%</text></g>`; }
FP.cf_scene=(t)=>{ let b=cfFundo(), s='', o='';
  if(t<CFT.bolso){ // cabo a tentar entrar, não carrega
    const wig=Math.sin(t*7)*14; s+=cfPorta(t)+cfFeltro(150)+cfFicha(CFP.y0+170+Math.abs(Math.sin(t*4))*40)+`<g transform="rotate(${wig*.1} 540 1150)"></g>`;
    o+=cfBateria(880,1260,.75,t,31,false)+ecX(t,.4,880,420,62);
  } else if(t<CFT.fiapos){ // bolso de ganga
    const u=t-CFT.bolso; s+=`<path d="M140,520 Q540,600 940,520 L900,1290 Q540,1390 180,1290 Z" fill="#2f4f8f" stroke="${FK}" stroke-width="10"/><path d="M140,520 Q540,600 940,520" fill="none" stroke="#ffd27a" stroke-width="8" stroke-dasharray="20 12"/><path d="M180,560 L210,1260" stroke="#ffd27a" stroke-width="6" stroke-dasharray="16 12" fill="none"/><path d="M900,560 L870,1260" stroke="#ffd27a" stroke-width="6" stroke-dasharray="16 12" fill="none"/>`;
    s+=`<g transform="translate(540 ${880+Math.sin(t*2)*10})"><rect x="-150" y="-300" width="300" height="560" rx="40" fill="#1a1238" stroke="#b56cff" stroke-width="10"/><rect x="-40" y="248" width="80" height="16" rx="6" fill="#ff7ab8"/></g>`;
    for(let i=0;i<16;i++){ const p=((u*.7+i/16)%1), x=420+(i*53)%240+Math.sin(t*3+i)*12, y=700+p*440; o+=`<path d="M${x},${y} q10,12 0,26 q-8,10 4,20" fill="none" stroke="#f0e6ff" stroke-width="4" opacity="${1-p*.6}"/>`; }
    o+=fStamp(t,CFT.bolso+.2,540,470,'NO TEU BOLSO','#e0483a',80,-5);
  } else if(t<CFT.empurra){ // fiapos entram
    s+=cfPorta(t)+cfFiapos(t,26)+cfFeltro(20);
    o+=fStamp(t,CFT.fiapos+.3,540,420,'FIAPOS','#2e86d0',100,-5);
  } else if(t<CFT.feltro){ // cada vez que enfias, empurra
    const u=t-CFT.empurra, c=(u%1.1)/1.1, ins=c<.45?ease(c/.45):1-ease((c-.45)/.55), f=20+u*22;
    s+=cfPorta(t)+cfFeltro(f)+cfFiapos(t,Math.max(4,20-u*4))+cfFicha(CFP.y0+f+20+(1-ins)*330);
    const n=Math.min(300,Math.round(u*75)); o+=`<g transform="translate(540 420)"><rect x="-200" y="-70" width="400" height="140" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="30" font-family="M" font-weight="900" font-size="90" fill="${FY}" text-anchor="middle">x${n}</text></g>`;
    if(t>=CFT.fundo) o+=`<path d="M540,620 v-70 m-30,30 l30,-30 l30,30" fill="none" stroke="#ff7ab8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if(t<CFT.contatos){ // feltro + não encaixa
    const f=110+ease(clamp((t-CFT.feltro)/1.5,0,1))*60; const stuck=t>=CFT.naoenc;
    s+=cfPorta(t)+cfFeltro(f,stuck?1:0)+cfFicha(CFP.y0+f+10+(stuck?Math.abs(Math.sin(t*9))*12:260));
    if(!stuck) o+=fStamp(t,CFT.feltro+.6,540,420,'VIRA FELTRO','#e0483a',84,-5);
    else { o+=fStamp(t,CFT.naoenc+.1,540,420,'NÃO ENCAIXA!','#e0483a',84,-5); o+=`<path d="M840,${CFP.y0} V${CFP.y0+f}" stroke="${FY}" stroke-width="8"/><path d="M820,${CFP.y0} h40 M820,${CFP.y0+f} h40" stroke="${FY}" stroke-width="8"/>`+fTxt(930,CFP.y0+f/2+20,'FALTA',40,FY); }
  } else if(t<CFT.limpar){ // contactos não tocam + bateria parada
    const z=ease(clamp((t-CFT.contatos)/.5,0,1)); s+=`<g transform="translate(540 600) scale(${1+.5*z}) translate(-540 -600)">${cfPorta(t)}${cfFeltro(170)}${cfFicha(CFP.y0+180)}</g>`;
    o+=ecX(t,CFT.contatos+.4,540,600,70);
    if(t>=CFT.parada) o+=cfBateria(860,1250,.75,t,31,false)+fStamp(t,CFT.parada+.2,540,420,'BATERIA PARADA','#e0483a',70,-5);
  } else if(t<CFT.fim){ // limpar com palito
    const off=t<CFT.palito+.9; const pull=ease(clamp((t-CFT.palito-1.0)/1.8,0,1)), clk=t>=CFT.clique;
    s+=cfPorta(t);
    if(!clk){ s+=`<g transform="translate(0 ${pull*620})">${cfFeltro(170)}</g>`;
      if(!off){ const tipX=520, tipY=CFP.y0+150+pull*620; s+=`<g transform="translate(${tipX} ${tipY}) rotate(${20})" stroke="${FK}" stroke-width="7"><path d="M-14,0 L0,-40 L14,0 L14,900 L-14,900 Z" fill="#d9a66b"/><path d="M-6,40 V880" stroke="#b8844a" stroke-width="4"/></g>`; } }
    else { s+=cfFicha(CFP.y0+10,true); o+=ecRipple(t,CFT.clique,540,CFP.y0+60,FY,1)+cfBateria(860,1260,.7,t,31+Math.min(69,(t-CFT.clique)*20),true)+fStamp(t,CFT.clique+.05,540,420,'CLIQUE!','#2fa860',100,-6); }
    if(off){ o+=`<g transform="translate(540 420) scale(${pop(t,CFT.limpar,.25)})"><circle r="90" fill="${FK}" stroke="#ff5a6a" stroke-width="10"/><path d="M0,-50 V0 M-34,-30 A50,50 0 1,0 34,-30" fill="none" stroke="#ff5a6a" stroke-width="14" stroke-linecap="round"/></g>`; }
    else if(!clk) o+=fStamp(t,CFT.palito+.9,540,420,'PALITO DE MADEIRA','#ff8a1f',56,-4);
    if(t>=CFT.metal){ o+=`<g transform="translate(220 1210) rotate(-30)" stroke="${FK}" stroke-width="6"><rect x="-8" y="-170" width="16" height="300" fill="#c9ced8"/><circle cy="-185" r="22" fill="#e0483a"/></g>`+ecX(t,CFT.metal+.1,280,1100,58)+fTxt(250,1330,'METAL',50,'#ff8a8a'); }
  } else { // sim ou não
    s+=cfPorta(t)+cfFeltro(120)+cfFicha(CFP.y0+140);
    if(t>=CFT.botoes){ const k=pop(t,CFT.botoes,.25); o+=`<g transform="translate(540 1240) scale(${k})">`;
      [['SIM','#2fa860',-210],['NÃO','#e0483a',210]].forEach(([n,c,x],i)=>{ const bb=Math.sin(t*6+i*2)*8; o+=`<g transform="translate(${x} ${bb})"><rect x="-170" y="-80" width="340" height="160" rx="40" fill="${c}" stroke="${FK}" stroke-width="10"/><text y="34" font-family="M" font-weight="900" font-size="96" fill="#fff" text-anchor="middle">${n}</text></g>`; });
      o+=`</g>`; }
    o+=fStamp(t,CFT.fim+.1,540,420,'O TEU JÁ FEZ?','#e0483a',76,-5); }
  return {b,s,o}; };
