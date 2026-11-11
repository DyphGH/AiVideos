// ===== 2 FATOS (BR) — Mosquito v3 (de raiz, com piada) =====
// mosquito cartoon. (x,y)=centro do corpo; s=escala; w=bater de asas (t); look: 'mau'|'feliz'|'triste'; straw: mostra canudinho
function mosq(x,y,s,t,{look='mau',flip=false,straw=false,napkin=false,beak=true}={}){
  const wa=Math.sin(t*70)*22;
  let o=`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" stroke="${FK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">`;
  // pernas
  o+=`<path d="M-40,20 q-40,40 -90,120 M-10,25 q-10,60 -30,140 M20,25 q20,60 40,140 M50,15 q50,40 110,110" fill="none" stroke-width="6"/>`;
  // asas
  o+=`<g opacity=".85"><ellipse cx="-30" cy="-70" rx="95" ry="34" fill="#d9f0ff" transform="rotate(${-35+wa} 0 -20)"/><ellipse cx="30" cy="-70" rx="95" ry="34" fill="#d9f0ff" transform="rotate(${35-wa} 0 -20)"/></g>`;
  // abdómen às riscas
  o+=`<ellipse cx="-70" cy="10" rx="85" ry="34" fill="#4a4a55" transform="rotate(-12 -70 10)"/>`;
  for(const dx of [-120,-90,-60,-30]) o+=`<path d="M${dx},${-8+(dx+70)*.2} q6,20 0,40" stroke="#f2f2f2" stroke-width="7" fill="none"/>`;
  // tórax + cabeça
  o+=`<ellipse cx="20" cy="0" rx="45" ry="38" fill="#5b5b68"/>`;
  o+=`<circle cx="80" cy="-18" r="42" fill="#6a6a78"/>`;
  // olhos
  if(look==='triste'){ o+=`<ellipse cx="72" cy="-24" rx="14" ry="16" fill="#fff"/><ellipse cx="100" cy="-24" rx="14" ry="16" fill="#fff"/><circle cx="72" cy="-18" r="6" fill="${FK}" stroke="none"/><circle cx="100" cy="-18" r="6" fill="${FK}" stroke="none"/><path d="M58,-44 l22,8 M114,-44 l-22,8" stroke-width="6"/>`; }
  else { o+=`<ellipse cx="72" cy="-26" rx="15" ry="${look==='feliz'?6:17}" fill="#fff"/><ellipse cx="100" cy="-26" rx="15" ry="${look==='feliz'?6:17}" fill="#fff"/>`;
    if(look!=='feliz') o+=`<circle cx="76" cy="-24" r="7" fill="#e0483a" stroke="none"/><circle cx="104" cy="-24" r="7" fill="#e0483a" stroke="none"/><path d="M56,-48 l26,12 M118,-48 l-26,12" stroke-width="7"/>`; }
  // boca / sorriso
  o+=`<path d="M70,4 q16,${look==='triste'?-10:12} 32,0" fill="none" stroke-width="5"/>`;
  // probóscide ou canudinho
  if(straw){ o+=`<path d="M108,0 L190,70" stroke="#ff4fa0" stroke-width="16"/><path d="M108,0 L190,70" stroke="#fff" stroke-width="5" stroke-dasharray="10 10"/>`; }
  else if(beak) o+=`<path d="M110,-4 L200,40" stroke-width="7"/>`;
  if(napkin) o+=`<path d="M40,30 L100,30 L70,85 Z" fill="#fff" stroke-width="5"/>`;
  return o+`</g>`;
}
function pele(t){ // fundo de pele com poros
  let o=`<rect width="1080" height="1920" fill="#f1c49d" stroke="none"/>`;
  for(let i=0;i<60;i++){ const x=(i*173)%1080, y=(i*331)%1920; o+=`<circle cx="${x}" cy="${y}" r="5" fill="#d99d75" opacity=".6" stroke="none"/>`; }
  for(let i=0;i<14;i++){ const x=(i*241)%1080, y=(i*509)%1920; o+=`<path d="M${x},${y} q20,-30 10,-60" fill="none" stroke="#b98260" stroke-width="3" opacity=".6"/>`; }
  return o;
}
function hookMq(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="64" fill="${FK}" text-anchor="middle" stroke="none">ESSE MOSQUITO VAI TE</text><text x="540" y="318" font-family="M" font-weight="900" font-size="64" fill="#e0483a" text-anchor="middle" stroke="none">PICAR COM 6 AGULHAS</text></g>`; }
// caixa de ferramentas com 6 agulhas
function caixa(x,y,s,open,t){
  let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<rect x="-220" y="-20" width="440" height="180" rx="18" fill="#e0483a"/><rect x="-60" y="-60" width="120" height="44" rx="14" fill="none" stroke-width="12"/>`;
  o+=`<text x="0" y="100" font-family="M" font-weight="900" font-size="54" fill="#fff" text-anchor="middle" stroke="none">KIT PICADA</text>`;
  if(open>0){ const tools=['🪚','🔧','💦','🥤','🔩','📌'];
    for(let i=0;i<6;i++){ const k=ease(clamp(open*1.6-i*.12,0,1)); const a=-150+i*24, r=210*k; o+=`<g transform="translate(${Math.cos(a*Math.PI/180)*r} ${-20+Math.sin(a*Math.PI/180)*r}) rotate(${Math.sin(t*6+i)*8})"><circle r="${46*k}" fill="#fffaf0"/><text y="${18*k}" font-size="${50*k}" text-anchor="middle" stroke="none">${tools[i]}</text></g>`; } }
  o+=`<g transform="translate(0 -20) rotate(${-open*70} -220 0)"><rect x="-220" y="-30" width="440" height="30" rx="10" fill="#c43a2e"/></g>`;
  return o+`</g>`;
}
// 1 · Frame 0: mosquito a chegar + kit (0 – 2,47)
FP.mq_abre=(t,dur)=>{
  let o=pele(t);
  const fx=820-ease(clamp(t/1.0,0,1))*300, fy=700+Math.sin(t*9)*30;
  o+=mosq(fx,fy,1.9,t,{look:'mau'});
  o+=caixa(540,1420,1.35,clamp((t-0.9)/1.0,0,1),t);
  if(t>1.7) o+=fStamp(t,1.7,860,1150,'6!','#e0483a',150,-10);
  return o+hookMq(t,2.47)+(t>2.0?fPill('FATO 1/2',t-2.0):'');
};
// 2 · As ferramentas (2,47 – 8,6) local: 0 serra · 1,0 abre · 2,31 saliva · 3,64 canudinho
FP.mq_kit=(t,dur)=>{
  let o=pele(t);
  o+=`<path d="M0,1250 Q540,1210 1080,1250 L1080,1920 L0,1920 Z" fill="#e7a6a0" stroke="none"/><path d="M0,1520 H1080" stroke="#c8402f" stroke-width="60" opacity=".85"/>`;
  for(let i=0;i<12;i++){ const x=((i*97+t*120)%1180)-50; o+=`<ellipse cx="${x}" cy="1520" rx="22" ry="12" fill="#e0483a" stroke="#8a1f16" stroke-width="3"/>`; }
  const step=t<1.0?0:t<2.31?1:t<3.64?2:3;
  const slurp=step===3;
  o+=mosq(470,900,1.3,t,{look:slurp?'feliz':'mau',straw:slurp,beak:!slurp});
  // ferramentas a atuar no ponto da picada (~720,1260)
  if(step===0){ const s=Math.sin(t*30)*20; o+=`<g transform="translate(${720+s} 1250) rotate(-20)" stroke="${FK}" stroke-width="6"><path d="M-90,0 h180 v-30 l-20,-10 h-160 Z" fill="#cfd6db"/>${[...Array(9)].map((_,k)=>`<path d="M${-80+k*20},0 l10,16 l10,-16" fill="#cfd6db"/>`).join('')}<rect x="90" y="-46" width="60" height="50" rx="12" fill="#a0522d"/></g>`; o+=fTxt(540,560,'SERRA!',110,FY); }
  if(step===1){ const k=Math.abs(Math.sin(t*6))*30; o+=`<g transform="translate(720 1220)" stroke="${FK}" stroke-width="7"><path d="M${-20-k},40 L-10,-80 M${20+k},40 L10,-80" stroke="#9aa3a8" stroke-width="18"/><path d="M-10,-80 L-40,-180 M10,-80 L40,-180" stroke="#e0483a" stroke-width="26"/></g>`; o+=fTxt(540,560,'ABRE CAMINHO!',96,FY); }
  if(step===2){ for(let i=0;i<5;i++){const p=((t*2+i*.2)%1); o+=`<circle cx="${700+i*12}" cy="${1060+p*200}" r="${14-p*6}" fill="#7fe7ff" stroke="${FK}" stroke-width="4"/>`;} o+=fTxt(540,560,'CUSPE DE SALIVA!',88,'#7fe7ff'); }
  if(slurp){ const lv=ease(clamp((t-3.64)/2.2,0,1)); o+=`<g transform="translate(250 640)"><rect x="-60" y="-120" width="120" height="240" rx="20" fill="#fff" stroke="${FK}" stroke-width="7"/><rect x="-50" y="${110-220*lv}" width="100" height="${220*lv}" rx="12" fill="#e0483a" stroke="none"/><text x="0" y="170" font-family="M" font-weight="900" font-size="40" fill="${FK}" text-anchor="middle" stroke="none">TANQUE</text></g>`;
    o+=ono('SLURP!',800,700,t,3.9,'#ff4fa0',8,110); o+=fTxt(540,470,'DE CANUDINHO 🥤',90,FY); }
  // contador de ferramentas
  const n=[2,4,5,6][step]; o+=`<g transform="translate(860 1760)"><rect x="-170" y="-50" width="340" height="100" rx="20" fill="#1b1420"/><text x="0" y="22" font-family="M" font-weight="900" font-size="60" fill="${FY}" text-anchor="middle" stroke="none">${n}/6</text></g>`;
  return o+fPill('FATO 1/2',1);
};
function pessoa(x,y,s,{triste=false}={}){
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8"><path d="M-150,400 Q-150,120 0,110 Q150,120 150,400 Z" fill="#2f6fb3"/><circle cx="0" cy="0" r="105" fill="#f1c49d"/><path d="M-100,-40 Q-80,-120 0,-120 Q80,-120 100,-40 Q60,-80 0,-80 Q-60,-80 -100,-40 Z" fill="#3b2a20"/><circle cx="-35" cy="0" r="10" fill="${FK}" stroke="none"/><circle cx="35" cy="0" r="10" fill="${FK}" stroke="none"/>${triste?'<path d="M-30,55 q30,-24 60,0" fill="none"/><path d="M48,14 q8,22 0,34" stroke="#7fc8f0" stroke-width="8" fill="none"/>':'<path d="M-30,45 q30,24 60,0" fill="none"/>'}</g>`; }
// 3 · Buffet (8,6 – 13,7) local: 0,2 "tem gente…"; 2,81 "não é azar… é o seu cheiro"
FP.mq_buffet=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const sh=t>2.81;
  if(sh) for(let i=0;i<5;i++){ const ph=(t*.8+i/5)%1; o+=`<path d="M${400+i*70},${1200-ph*500} q30,-40 0,-80 q-30,-40 0,-80" fill="none" stroke="#7fe08a" stroke-width="10" opacity="${1-ph}"/>`; }
  o+=pessoa(540,1250,1.4,{});
  // placa BUFFET
  o+=`<g transform="translate(540 1610) rotate(${Math.sin(t*2)*2})"><rect x="-300" y="-90" width="600" height="180" rx="20" fill="#fffaf0" stroke="${FK}" stroke-width="10"/><text x="0" y="-10" font-family="M" font-weight="900" font-size="78" fill="#e0483a" text-anchor="middle" stroke="none">BUFFET LIVRE</text><text x="0" y="60" font-family="M" font-weight="900" font-size="44" fill="${FK}" text-anchor="middle" stroke="none">ABERTO 24H</text></g>`;
  // fila de mosquitos com guardanapo
  for(let i=0;i<6;i++){ const k=ease(clamp((t-0.2-i*.2)/1.0,0,1)); const a=-2.4+i*0.48, R=420; const tx=540+Math.cos(a)*R, ty=1180+Math.sin(a)*R*0.9; const sx=1300+i*80, sy=700; const xx=sx+(tx-sx)*k, yy=sy+(ty-sy)*k; o+=mosq(xx,yy+Math.sin(t*8+i)*14,.55,t+i,{look:'feliz',napkin:true,flip:xx>540}); }
  const n=Math.round(clamp((t-0.6)/1.8,0,1)*100); o+=`<g transform="translate(540 520)">${fTxt(0,0,'ATÉ '+n+'×',130,FY)}${fTxt(0,80,'MAIS MOSQUITO',60,'#fff')}</g>`;
  if(sh) o+=fStamp(t,2.81,300,1000,'É O CHEIRO!','#2f9e6e',70,-8);
  return o+fPill('FATO 2/2',t);
};
// 4 · Não muda por anos + "sinto muito" (13,7 – 16,7) local: 0,14 anos; 1,99 sinto muito
FP.mq_sinto=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const yr=2024+Math.min(3,Math.floor(Math.max(0,t-0.2)/0.4));
  o+=`<g transform="translate(540 560) rotate(-3)"><rect x="-200" y="-150" width="400" height="300" rx="24" fill="#fffaf0" stroke="${FK}" stroke-width="10"/><rect x="-200" y="-150" width="400" height="80" rx="24" fill="#e0483a" stroke="${FK}" stroke-width="10"/><text x="0" y="70" font-family="M" font-weight="900" font-size="120" fill="${FK}" text-anchor="middle" stroke="none">${yr}</text></g>`;
  o+=fTxt(540,820,'CHEIRO: IGUAL',80,'#7fe08a');
  o+=pessoa(540,1250,1.3,{triste:t>1.99});
  if(t>1.99){ const pat=Math.abs(Math.sin((t-1.99)*10))*20; o+=mosq(760,1080-pat,.75,t,{look:'triste'}); o+=fStamp(t,1.99,540,1620,'SINTO MUITO','#2f6fb3',96,-5); }
  return o+fPill('FATO 2/2',t);
};
// 5 · Fim ≤2 s com movimento + loop
FP.mq_fim=(t,dur)=>{
  if(t>dur-.25) return FP.mq_abre(0.05,2.47);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const k=pop(t,0); o+=`<g transform="translate(540 640) scale(${k})">${fTxt(0,0,'MARCA QUEM É',104,'#fff')}${fTxt(0,125,'O BUFFET DOS',104,FY)}${fTxt(0,250,'MOSQUITOS 😂',104,FY)}</g>`;
  for(let i=0;i<3;i++) o+=mosq(540+Math.sin(t*4+i*2)*330, 1300+Math.cos(t*5+i)*160, .7, t+i, {look:'feliz',napkin:true});
  return o;
};
