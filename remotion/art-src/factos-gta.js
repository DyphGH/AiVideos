// ===== 2 FATOS (BR) — GTA 6 (arte original, sem marcas da Rockstar) =====
const NP='#ff3fa4', NC='#2fe6ff', NY='#ffd21f';
function gDefs(){ return `<defs><linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140733"/><stop offset=".35" stop-color="#4a1670"/><stop offset=".62" stop-color="#c2347e"/><stop offset=".8" stop-color="#ff7a5c"/><stop offset="1" stop-color="#ffc06a"/></linearGradient><linearGradient id="gSun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe46a"/><stop offset=".6" stop-color="#ff8a5c"/><stop offset="1" stop-color="#ff3fa4"/></linearGradient><linearGradient id="gRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1240"/><stop offset="1" stop-color="#0c0518"/></linearGradient><linearGradient id="gCar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7ac4"/><stop offset="1" stop-color="#c41f78"/></linearGradient><radialGradient id="gVig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient><linearGradient id="gBill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fe08a"/><stop offset="1" stop-color="#2f9e5a"/></linearGradient><radialGradient id="gCoin" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff3a0"/><stop offset=".6" stop-color="#ffc21f"/><stop offset="1" stop-color="#c98a00"/></radialGradient></defs>`; }
function palmeira(x,y,s,t,ph=0){ const sw=Math.sin(t*1.6+ph)*6;
  let o=`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0,0 Q${-20+sw},-200 ${sw*2},-420" fill="none" stroke="#1a0a2c" stroke-width="30" stroke-linecap="round"/>`;
  for(let k=0;k<7;k++){ const a=-160+k*40+sw*1.5, r=230; const ex=sw*2+Math.cos(a*Math.PI/180)*r, ey=-420+Math.sin(a*Math.PI/180)*r*0.6+60; o+=`<path d="M${sw*2},-420 Q${(sw*2+ex)/2},${-500+(k%2)*20} ${ex.toFixed(1)},${ey.toFixed(1)}" fill="none" stroke="#1a0a2c" stroke-width="26" stroke-linecap="round"/>`; }
  return o+`</g>`; }
function cidade(t,{car=true,horizon=1160}={}){
  let o=`<rect width="1080" height="1920" fill="url(#gSky)"/>`;
  for(let k=0;k<26;k++){ const sx=(k*173)%1080, sy=(k*97)%600+40; o+=`<circle cx="${sx}" cy="${sy}" r="${1.5+k%3}" fill="#fff" opacity="${.3+.5*Math.abs(Math.sin(t*2+k))}"/>`; }
  // sol retro com riscas
  o+=`<defs><clipPath id="gSc"><circle cx="540" cy="${horizon-300}" r="260"/></clipPath></defs><g clip-path="url(#gSc)"><rect x="200" y="${horizon-580}" width="680" height="560" fill="url(#gSun)"/>`;
  for(let i=0;i<7;i++){ const yy=horizon-380+i*30+(t*20)%30; o+=`<rect x="200" y="${yy}" width="680" height="${4+i*2.2}" fill="#c2347e"/>`; }
  o+=`</g>`;
  // prédios
  const B=[[0,260,130],[120,380,110],[220,300,140],[350,470,90],[430,340,120],[540,520,110],[640,360,130],[760,440,100],[850,300,120],[960,400,140]];
  B.forEach(([bx,h,w],i)=>{ const top=horizon-h; o+=`<rect x="${bx}" y="${top}" width="${w}" height="${h+10}" fill="#260b42"/>`;
    for(let r=0;r<Math.floor(h/36);r++) for(let c=0;c<Math.floor(w/28);c++){ const on=((r*7+c*13+i*5)%5)<2; if(on) o+=`<rect x="${bx+10+c*28}" y="${top+14+r*36}" width="12" height="16" fill="${(r+c+i)%3?'#ffd98a':'#9ff3ff'}" opacity="${.55+.4*Math.abs(Math.sin(t*1.3+r+c+i))}"/>`; }
    if(i%3===1) o+=`<rect x="${bx+4}" y="${top+4}" width="${w-8}" height="${h}" fill="none" stroke="${i%2?NP:NC}" stroke-width="5" opacity=".85"/>`; });
  // estrada
  o+=`<rect x="0" y="${horizon}" width="1080" height="${1920-horizon}" fill="url(#gRoad)"/><path d="M0,${horizon} H1080" stroke="${NP}" stroke-width="6"/>`;
  for(let i=0;i<9;i++){ const x=((i*160-t*900)%1440+1440)%1440-200; o+=`<rect x="${x}" y="${horizon+450}" width="90" height="14" rx="7" fill="#ffd98a" opacity=".8"/>`; }
  for(let i=0;i<8;i++){ const x=((i*150-t*400)%1200+1200)%1200-60; o+=`<path d="M${x},${horizon+40} L${x+70},${horizon+40}" stroke="${NC}" stroke-width="3" opacity=".5"/>`; }
  o+=palmeira(90,horizon+40,1.0,t,0)+palmeira(1000,horizon+60,1.1,t,1.3)+palmeira(250,horizon+20,.7,t,2.1)+palmeira(840,horizon+20,.75,t,.7);
  if(car){ const cx=((t*520+700)%1700)-300; o+=carro(cx,horizon+400,1,t); }
  return o; }
function carro(x,y,s,t){ let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="#0c0518" stroke-width="6" stroke-linejoin="round">`;
  for(let k=0;k<4;k++) o+=`<path d="M${-200-k*60},${-40+k*18} h-${80+k*20}" stroke="${NC}" stroke-width="5" opacity="${.7-k*.15}"/>`;
  o+=`<ellipse cx="0" cy="40" rx="190" ry="16" fill="#000" opacity=".4" stroke="none"/><g transform="scale(-1 1)"><path d="M-190,20 L-180,-20 Q-120,-34 -70,-40 L-20,-90 Q60,-96 120,-60 L180,-34 Q205,-26 200,20 Z" fill="url(#gCar)"/><path d="M-50,-40 L-10,-80 Q50,-84 95,-56 L95,-40 Z" fill="#2fe6ff" opacity=".85"/></g><path d="M-196,-22 v20" stroke="#ff2a2a" stroke-width="10" stroke-linecap="round"/><path d="M182,-6 h16" stroke="#fff6a0" stroke-width="12" stroke-linecap="round"/><path d="M196,-6 L420,-50 L420,40 Z" fill="#fff6a0" opacity=".18" stroke="none"/>`;
  const r=t*30; for(const wx of [-120,120]) o+=`<g transform="translate(${wx} 22) rotate(${r*57})"><circle r="36" fill="#1a0a2c"/><circle r="18" fill="#c9d1d6"/><path d="M-18,0 H18 M0,-18 V18" stroke="#1a0a2c" stroke-width="4"/></g>`;
  return o+`</g>`; }
function gHook(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="48" y="162" width="1000" height="200" rx="26" fill="#000" opacity=".3"/><rect x="40" y="150" width="1000" height="200" rx="26" fill="${NY}" stroke="${FK}" stroke-width="10"/><text x="540" y="232" font-family="M" font-weight="900" font-size="64" fill="${FK}" text-anchor="middle">O GTA 6 VAI FATURAR</text><g transform="translate(${Math.sin(t*40)*4} ${Math.cos(t*33)*2})"><text x="540" y="322" font-family="M" font-weight="900" font-size="78" fill="#e0483a" text-anchor="middle">R$25 BI EM 7 DIAS</text></g></g>`; }
function neonTxt(x,y,txt,size,col){ return `<text x="${x}" y="${y}" font-family="M" font-weight="900" font-size="${size}" fill="none" stroke="${col}" stroke-width="14" opacity=".35" text-anchor="middle">${txt}</text><text x="${x}" y="${y}" font-family="M" font-weight="900" font-size="${size}" fill="#fff" stroke="${col}" stroke-width="5" paint-order="stroke fill" text-anchor="middle">${txt}</text>`; }
function nota(x,y,r,s=1){ return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><rect x="-80" y="-40" width="160" height="80" rx="8" fill="url(#gBill)" stroke="#1b5e34" stroke-width="5"/><circle r="24" fill="none" stroke="#1b5e34" stroke-width="4"/><text y="10" font-family="M" font-weight="900" font-size="26" fill="#1b5e34" text-anchor="middle">R$</text></g>`; }
function moeda(x,y,s=1){ return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="34" fill="url(#gCoin)" stroke="#8a5a00" stroke-width="5"/><text y="12" font-family="M" font-weight="900" font-size="32" fill="#8a5a00" text-anchor="middle">R$</text></g>`; }
function chuvaNotas(t,n=14,seed=0){ let o=''; for(let i=0;i<n;i++){ const p=((t*.6+i/n+seed)%1), x=(i*151+seed*300)%1080, y=-100+p*2100, r=Math.sin(t*3+i)*40; o+=i%3?nota(x,y,r,.8):moeda(x,y,.9); } return o; }
function estrelas(x,y,n,t,t0){ let o=''; for(let i=0;i<5;i++){ const on=i<n; const k=on?pop(t,t0+i*.18,.2):1; const cx=x-220+i*110; o+=`<g transform="translate(${cx} ${y}) scale(${k})"><path d="M0,-44 L13,-14 L46,-12 L20,9 L28,42 L0,24 L-28,42 L-20,9 L-46,-12 L-13,-14 Z" fill="${on?NY:'#ffffff22'}" stroke="${on?FK:'#ffffff55'}" stroke-width="6" stroke-linejoin="round"/></g>`; } return o; }

// 1 · Hype: cidade néon + contagem (0 – 2,52)
FP.gta_hype=(t,dur)=>{
  let o=gDefs()+cidade(t);
  const secs=Math.max(0,59-Math.floor(t*6)%60);
  const k=(0.7+0.3*ease(clamp(t/.3,0,1)))*(1+.03*Math.sin(t*8));
  o+=`<g transform="translate(540 640) scale(${k})"><rect x="-380" y="-130" width="760" height="260" rx="34" fill="#0c0518" opacity=".75" stroke="${NP}" stroke-width="8"/>`;
  const dig=['6D','23H','59M',String(secs).padStart(2,'0')+'S'];
  dig.forEach((d,i)=>{ o+=`<g transform="translate(${-270+i*180} 0)"><rect x="-80" y="-90" width="160" height="150" rx="16" fill="#1d0c33" stroke="${NC}" stroke-width="4"/><path d="M-80,-15 H80" stroke="#0c0518" stroke-width="4"/><text y="22" font-family="M" font-weight="900" font-size="${d.length>2?54:64}" fill="#fff" text-anchor="middle">${d}</text></g>`; });
  o+=`<text y="110" font-family="M" font-weight="900" font-size="34" fill="${NC}" text-anchor="middle" letter-spacing="6">LANÇAMENTO 19/11</text></g>`;
  o+=`<rect width="1080" height="1920" fill="url(#gVig)"/>`;
  return o+gHook(t,2.52); };
// 2 · 13 anos esperando: sofá, barba a crescer, calendário 2013→2026 (2,52 – 6,25)
FP.gta_espera=(t,dur)=>{
  let o=gDefs()+mqDefs()+`<rect width="1080" height="1920" fill="#1d0c33"/>`;
  for(let i=0;i<10;i++) o+=`<rect x="${i*110}" y="0" width="55" height="1400" fill="#fff" opacity=".025"/>`;
  // calendário
  const yr=2013+Math.min(13,Math.floor(clamp(t/2.2,0,1)*13));
  o+=`<g transform="translate(540 560) rotate(-3)" stroke="${FK}"><rect x="-210" y="-160" width="420" height="320" rx="24" fill="#fffaf0" stroke-width="10"/><rect x="-210" y="-160" width="420" height="80" rx="24" fill="${NP}" stroke-width="10"/><text y="-104" font-family="M" font-weight="900" font-size="38" fill="#fff" text-anchor="middle" stroke="none">ESPERANDO DESDE</text><text y="80" font-family="M" font-weight="900" font-size="140" fill="${FK}" text-anchor="middle" stroke="none">${yr}</text>`;
  for(const rx of [-110,110]) o+=`<rect x="${rx-14}" y="-190" width="28" height="64" rx="14" fill="#c9d1d6" stroke-width="6"/>`;
  o+=`</g>`;
  // TV com "EM BREVE"
  o+=`<g transform="translate(830 1060)" stroke="${FK}" stroke-width="8"><rect x="-170" y="-110" width="340" height="220" rx="18" fill="#0c0518"/><rect x="-150" y="-92" width="300" height="184" rx="10" fill="url(#gSky)"/><text y="20" font-family="M" font-weight="900" font-size="44" fill="#fff" text-anchor="middle" stroke="${NP}" stroke-width="4" paint-order="stroke fill">EM BREVE…</text><path d="M-60,110 L-90,170 M60,110 L90,170" stroke-width="10"/></g>`;
  // sofá + pessoa com barba
  o+=`<g stroke="${FK}" stroke-width="10"><rect x="60" y="1180" width="600" height="300" rx="50" fill="#6b3fa0"/><rect x="40" y="1300" width="640" height="200" rx="50" fill="#7d4cb8"/></g>`;
  o+=pessoaD(340,1100,1.15,{mood:'triste',t});
  const b=ease(clamp((t-0.2)/3,0,1));
  o+=`<path d="M${340-95},${1110} Q${340-90},${1110+b*240} 340,${1130+b*300} Q${340+90},${1110+b*240} ${340+95},${1110} Q340,${1180} ${340-95},${1110} Z" fill="#7a5a44" stroke="${FK}" stroke-width="6" opacity="${b>0.02?1:0}"/>`;
  o+=`<g transform="translate(340 ${1290+b*40})"><rect x="-70" y="-30" width="140" height="60" rx="28" fill="#2a2a36" stroke="${FK}" stroke-width="6"/><circle cx="-36" cy="0" r="9" fill="${NP}"/><circle cx="36" cy="0" r="9" fill="${NC}"/></g>`;
  // teia de aranha
  if(t>1.4){ const k=ease(clamp((t-1.4)/.8,0,1)); o+=`<g opacity="${k}" stroke="#fff" stroke-width="3" fill="none"><path d="M0,0 L220,40 M0,0 L160,160 M0,0 L40,220 M60,12 Q50,50 12,60 M120,24 Q100,100 24,120 M180,34 Q150,150 34,180"/></g>`; }
  if(t>=2.57) o+=fStamp(t,2.57,540,860,'13 ANOS ESPERANDO','#e0483a',64,-4);
  return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`; };
// 3 · Quantos anos você tinha? (6,25 – 11,26) — balões de comentários
FP.gta_pergunta=(t,dur)=>{
  let o=gDefs()+cidade(t,{car:false});
  o+=`<rect width="1080" height="1920" fill="#0c0518" opacity=".55"/>`;
  const k=pop(t,0,.25); o+=`<g transform="translate(540 330) scale(${k})">${neonTxt(0,0,'QUANTOS ANOS',96,NP)}${neonTxt(0,115,'VOCÊ TINHA?',110,NC)}</g>`;
  const C=['eu tinha 9 😭','nem tinha nascido 💀','15 kkkk','tinha 21 😳','6 anos 🥲','12 e jogava escondido 😂','30 e ainda tô esperando'];
  C.forEach((c,i)=>{ const t0=0.5+i*0.55; if(t<t0) return; const p=ease(clamp((t-t0)/.35,0,1)); const y=1290-(t-t0)*190-(1-p)*-80; if(y<560) return; const x=i%2?600:480;
    o+=`<g transform="translate(${x} ${y}) scale(${p})" opacity="${Math.min(1,(y-560)/120)}"><rect x="-380" y="-48" width="760" height="96" rx="48" fill="#fff" stroke="${FK}" stroke-width="5"/><circle cx="-325" cy="0" r="30" fill="${['#ff8a5c','#2fe6ff','#ff3fa4','#7fe08a'][i%4]}" stroke="${FK}" stroke-width="4"/><text x="-280" y="14" font-family="M" font-weight="900" font-size="40" fill="${FK}">${c}</text></g>`; });
  // mão a escrever / ícone comentário
  const b=Math.abs(Math.sin(t*5))*10; o+=`<g transform="translate(540 ${1640-b})"><path d="M-70,-50 h140 a20,20 0 0 1 20,20 v60 a20,20 0 0 1 -20,20 h-80 l-40,34 v-34 h-20 a20,20 0 0 1 -20,-20 v-60 a20,20 0 0 1 20,-20 Z" fill="${NY}" stroke="${FK}" stroke-width="7"/><circle cx="-34" cy="0" r="9" fill="${FK}"/><circle cx="0" cy="0" r="9" fill="${FK}"/><circle cx="34" cy="0" r="9" fill="${FK}"/></g>`;
  return o; };
// 4 · Custou R$5 bi (11,26 – 14,72)
FP.gta_custo=(t,dur)=>{
  let o=gDefs()+`<rect width="1080" height="1920" fill="#14071f"/>`;
  for(let k=0;k<16;k++){ const a=k*0.39+t*.2; o+=`<path d="M540,1000 L${540+Math.cos(a)*1800},${1000+Math.sin(a)*1800} L${540+Math.cos(a+.16)*1800},${1000+Math.sin(a+.16)*1800} Z" fill="${NP}" opacity=".06"/>`; }
  // pilha de notas a crescer
  const h=ease(clamp(t/2.6,0,1)); const n=Math.floor(h*16);
  for(let i=0;i<n;i++) o+=nota(540+((i%2)?-6:6),1250-i*26,(i%3-1)*3,1.9);
  for(let i=0;i<Math.floor(h*8);i++) o+=moeda(300+(i%2)*50,1290-i*30,1.1)+moeda(780-(i%2)*50,1290-i*30,1.1);
  o+=chuvaNotas(t,10,.3);
  const v=(h*5).toFixed(1).replace('.',',');
  o+=`<g transform="translate(540 560)">${fTxt(0,-80,'CUSTOU',80,'#fff')}${fTxt(0,70,'R$ '+v+' BI',150,'#e0483a','middle',18)}</g>`;
  if(t>2.2) o+=fStamp(t,2.2,540,800,'O JOGO MAIS CARO','#e0483a',58,-5);
  return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`; };
// 5 · Pré-venda: balança empata (14,72 – 17,56)
FP.gta_pre=(t,dur)=>{
  let o=gDefs()+`<rect width="1080" height="1920" fill="#14071f"/>`;
  for(let k=0;k<16;k++){ const a=k*0.39-t*.2; o+=`<path d="M540,1000 L${540+Math.cos(a)*1800},${1000+Math.sin(a)*1800} L${540+Math.cos(a+.16)*1800},${1000+Math.sin(a+.16)*1800} Z" fill="${NC}" opacity=".06"/>`; }
  const k=ease(clamp(t/1.8,0,1)); const ang=(1-k)*-16+Math.sin(t*6)*(1-k)*2;
  o+=`<g stroke="${FK}" stroke-width="10"><path d="M540,1600 V820" stroke="#c9d1d6" stroke-width="22"/><path d="M420,1610 H660" stroke="#c9d1d6" stroke-width="26" stroke-linecap="round"/><circle cx="540" cy="800" r="26" fill="${NY}"/></g>`;
  o+=`<g transform="rotate(${ang} 540 800)"><path d="M180,800 H900" stroke="#c9d1d6" stroke-width="20"/>`;
  for(const [px,lab,col] of [[220,'CUSTO','#e0483a'],[860,'PRÉ-VENDA','#2f9e5a']]){ const yy=800;
    o+=`<g transform="rotate(${-ang} ${px} ${yy})"><path d="M${px},${yy} L${px-120},${yy+260} M${px},${yy} L${px+120},${yy+260}" stroke="#c9d1d6" stroke-width="6"/><path d="M${px-150},${yy+260} Q${px},${yy+360} ${px+150},${yy+260} Z" fill="#c9d1d6" stroke="${FK}" stroke-width="8"/>`;
    const m=px<540?10:Math.floor(k*10); for(let i=0;i<m;i++) o+=nota(px+((i%2)?-12:12),yy+236-i*16,(i%3-1)*4,1);
    o+=`<g transform="translate(${px} ${yy+420})"><rect x="-150" y="-46" width="300" height="92" rx="20" fill="${col}" stroke="${FK}" stroke-width="7"/><text y="16" font-family="M" font-weight="900" font-size="44" fill="#fff" text-anchor="middle">${lab}</text></g></g>`; }
  o+=`</g>`;
  if(t>1.8) o+=fStamp(t,1.8,540,520,'QUASE EMPATOU!','#2f9e5a',86,-6);
  else o+=`<g transform="translate(540 520)">${fTxt(0,0,'SÓ NA PRÉ-VENDA',84,'#fff')}</g>`;
  return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`; };
// 6 · 1.ª semana: R$25 bi (17,56 – 21,63)
FP.gta_semana=(t,dur)=>{
  if(t>dur-.2) return FP.gta_hype(0.05,2.52);
  let o=gDefs()+cidade(t,{car:true});
  o+=`<rect width="1080" height="1920" fill="#0c0518" opacity=".45"/>`;
  for(let i=0;i<4;i++){ const t0=1.2+i*.7; if(t>t0){ const p=clamp((t-t0)/1.2,0,1); const fx=200+i*230, fy=600+(i%2)*160; for(let j=0;j<14;j++){ const a=j*Math.PI/7; o+=`<circle cx="${fx+Math.cos(a)*p*170}" cy="${fy+Math.sin(a)*p*170+p*p*60}" r="${8*(1-p)+2}" fill="${[NP,NC,NY][j%3]}" opacity="${1-p}"/>`; } } }
  o+=chuvaNotas(t,16,.6);
  const v=Math.min(25,Math.floor(ease(clamp(t/2.4,0,1))*25)+5*(t<0.2?1:0));
  const sh=t<2.4?Math.sin(t*50)*4:0;
  o+=`<g transform="translate(${540+sh} 560)">${fTxt(0,-90,'1ª SEMANA',80,'#fff')}${neonTxt(0,90,'R$ '+v+' BI',180,'#2f9e5a')}</g>`;
  o+=`<g transform="translate(540 820)">${estrelas(0,0,5,t,0.3)}</g>`;
  if(t>2.5) o+=fStamp(t,2.5,540,1010,'5× O QUE CUSTOU','#e0483a',70,-5);
  if(t>2.9){ const p=pop(t,2.9,.2); o+=`<g transform="translate(540 1200) scale(${p*.8})"><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${NY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle">TEM MAIS 2 FATOS</text></g>`; }
  return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`; };
// 7 · Fim (só texto) + loop
FP.gta_fim=(t,dur)=>{
  if(t>dur-.25) return FP.gta_hype(0.05,2.52);
  let o=gDefs()+cidade(t);
  o+=`<rect width="1080" height="1920" fill="#0c0518" opacity=".35"/>`;
  const p=pop(t,0,.2); o+=`<g transform="translate(540 760) scale(${p})"><rect x="-414" y="-67" width="840" height="150" rx="75" fill="#000" opacity=".3"/><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${NY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle">TEM MAIS 2 FATOS</text></g>`;
  return o; };
