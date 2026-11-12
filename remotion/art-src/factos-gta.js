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
  if(!car){ for(let i=0;i<9;i++){ const x=((i*160-t*900)%1440+1440)%1440-200; o+=`<rect x="${x}" y="${horizon+450}" width="90" height="14" rx="7" fill="#ffd98a" opacity=".8"/>`; }
  for(let i=0;i<8;i++){ const x=((i*150-t*400)%1200+1200)%1200-60; o+=`<path d="M${x},${horizon+40} L${x+70},${horizon+40}" stroke="${NC}" stroke-width="3" opacity=".5"/>`; } }
  else o+=ruaBase(horizon);
  o+=palmeira(90,horizon+40,1.0,t,0)+palmeira(1000,horizon+60,1.1,t,1.3)+palmeira(250,horizon+20,.7,t,2.1)+palmeira(840,horizon+20,.75,t,.7);
  if(car) o+=drift(t,horizon);
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

// ---- rua vista de cima + carro a estacionar em drift (loop 4,2 s) ----
function ruaBase(H){ let o=`<rect x="0" y="${H}" width="1080" height="70" fill="#3a1f55"/>`;
  for(let x=0;x<1080;x+=60) o+=`<path d="M${x},${H} v70" stroke="#2a1240" stroke-width="3"/>`;
  o+=`<path d="M0,${H+70} H1080" stroke="#c9d1d6" stroke-width="10"/>`;
  for(let x=60;x<1080;x+=240) o+=`<path d="M${x},${H+80} v150" stroke="#fff" stroke-width="5" opacity=".35"/>`;
  o+=`<path d="M0,${H+240} H1080" stroke="#fff" stroke-width="4" opacity=".25" stroke-dasharray="30 20"/>`;
  for(let x=-20;x<1100;x+=140) o+=`<rect x="${x}" y="${H+415}" width="80" height="12" rx="6" fill="#ffd98a" opacity=".8"/>`;
  return o; }
function carTop(x,y,ang,col,{lights=false,brake=false,sq=1}={}){
  let o=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(1 ${sq})">`;
  if(lights) o+=`<path d="M110,-40 L360,-110 L360,110 L110,40 Z" fill="#fff6a0" opacity=".14"/>`;
  o+=`<rect x="-112" y="-50" width="236" height="114" rx="34" fill="#000" opacity=".35" transform="translate(8 10)"/>`;
  for(const [wx,wy] of [[-70,-58],[70,-58],[-70,58],[70,58]]) o+=`<rect x="${wx-22}" y="${wy-9}" width="44" height="18" rx="5" fill="#0c0518"/>`;
  o+=`<rect x="-115" y="-55" width="230" height="110" rx="34" fill="${col}" stroke="#0c0518" stroke-width="6"/>`;
  o+=`<path d="M40,-42 L72,-36 L72,36 L40,42 Z" fill="#2fe6ff" stroke="#0c0518" stroke-width="5"/><path d="M-62,-38 L-82,-32 L-82,32 L-62,38 Z" fill="#2fe6ff" stroke="#0c0518" stroke-width="5"/>`;
  o+=`<rect x="-62" y="-40" width="102" height="80" rx="14" fill="#000" opacity=".22"/><path d="M80,-30 Q100,0 80,30" fill="none" stroke="#fff" stroke-width="3" opacity=".4"/>`;
  o+=`<rect x="-118" y="-46" width="14" height="92" rx="5" fill="#0c0518"/>`;
  o+=`<rect x="104" y="-46" width="12" height="20" rx="5" fill="#fff6a0"/><rect x="104" y="26" width="12" height="20" rx="5" fill="#fff6a0"/>`;
  o+=`<rect x="-114" y="-48" width="10" height="20" rx="4" fill="${brake?'#ff2a2a':'#a01818'}"/><rect x="-114" y="28" width="10" height="20" rx="4" fill="${brake?'#ff2a2a':'#a01818'}"/>`;
  return o+`</g>`; }
function driftPos(c,H){ const yP=H+165, yD=H+545;
  if(c<1.3){ const k=c/1.3; return [-280+k*1040, yD, 0]; }
  if(c<2.3){ const k=(c-1.3)/1.0, e=ease(k), ea=Math.pow(ease(k),0.75); return [760-e*220, yD-(yD-yP)*e, ea*180]; }
  if(c<3.2) return [540, yP, 180];
  const k=ease((c-3.2)/1.0), kk=Math.min(1,k*2.2); return [540-k*900, yP+(yD-yP)*kk, 180-18*Math.sin(Math.PI*kk)]; }
function rearPt(x,y,a,side){ const r=a*Math.PI/180; const rx=-80, ry=side*48; return [x+rx*Math.cos(r)-ry*Math.sin(r), y+rx*Math.sin(r)+ry*Math.cos(r)]; }
function drift(t,H){ const P=4.2, c=t%P; let o='';
  // carros estacionados
  o+=carTop(300,H+165,0,'#2fa3ff')+carTop(780,H+165,0,'#ffd21f')+carTop(-40,H+165,0,'#7fe08a')+carTop(1130,H+165,0,'#ff8a5c');
  // marcas de pneu
  const fade=c<3.2?1:Math.max(0,1-(c-3.2)/0.8);
  if(c>1.3){ for(const sd of [-1,1]){ let pts=[]; for(let i=0;i<=24;i++){ const tc=1.3+Math.min(c-1.3,1.0)*i/24; const [x,y,a]=driftPos(tc,H); pts.push(rearPt(x,y,a,sd).map(v=>v.toFixed(1)).join(',')); } o+=`<path d="M${pts.join(' L')}" fill="none" stroke="#000" stroke-width="12" stroke-linecap="round" opacity="${.45*fade}"/>`; } }
  // fumo
  for(let i=0;i<14;i++){ const tc=c-i*0.05; if(tc<1.3||tc>2.5) continue; const age=c-tc; const [x,y,a]=driftPos(Math.min(tc,2.3),H); for(const sd of [-1,1]){ const [px,py]=rearPt(x,y,a,sd); o+=`<circle cx="${(px+Math.sin(i*3+sd)*age*40).toFixed(1)}" cy="${(py-age*60).toFixed(1)}" r="${(18+age*90).toFixed(1)}" fill="#e9e4f0" opacity="${Math.max(0,.55-age*.8).toFixed(2)}"/>`; } }
  const [x,y,a]=driftPos(c,H); const sq=(c>2.3&&c<2.5)?1-0.06*Math.sin((c-2.3)/0.2*Math.PI):1;
  o+=carTop(x,y,a,'url(#gCar)',{lights:c<1.3||c>3.2,brake:c>1.2&&c<2.4,sq});
  if(c>2.3&&c<3.2){ const k=pop(c,2.35,.18); o+=`<g transform="translate(540 ${H+20}) scale(${k}) rotate(-6)"><rect x="-150" y="-40" width="300" height="80" rx="18" fill="#fffaf0" stroke="#2f9e5a" stroke-width="8"/><text y="16" font-family="M" font-weight="900" font-size="46" fill="#2f9e5a" text-anchor="middle">PERFEITO!</text></g>`; }
  return o; }

// ===== v2 · PARQUE DE ESTACIONAMENTO — drift contínuo (satisfatório) =====
const GP=5.4125; // 4 voltas em 21,65 s
function gPos(u){const a=u*2*Math.PI;return [540+330*Math.sin(2*a),1290+430*Math.sin(a)];}
function gCar(u){const e=.004;const A=gPos(u-e),O=gPos(u),B=gPos(u+e);
 const vx=(B[0]-A[0])/(2*e),vy=(B[1]-A[1])/(2*e),ax=(B[0]-2*O[0]+A[0])/(e*e),ay=(B[1]-2*O[1]+A[1])/(e*e);
 const sp=Math.hypot(vx,vy)||1;const k=(vx*ay-vy*ax)/(sp*sp*sp);
 const sl=Math.max(-38,Math.min(38,k*9500));
 return [O[0],O[1],Math.atan2(vy,vx)*180/Math.PI+sl,sl];}
function gRear(u,side){const c=gCar(u);const r=c[2]*Math.PI/180;const rx=-88,ry=side*52;
 return [c[0]+rx*Math.cos(r)-ry*Math.sin(r),c[1]+rx*Math.sin(r)+ry*Math.cos(r)];}
function gIsla(x,y){let o=`<g transform="translate(${x} ${y})"><rect x="-80" y="-80" width="160" height="160" rx="24" fill="#150a26" stroke="#ffd21f" stroke-width="5" stroke-dasharray="26 14"/>`;
 for(let k=-2;k<=2;k++)o+=`<path d="M${-64+k*34},72 L${-30+k*34},-72" stroke="#ffd21f" stroke-width="5" opacity=".3"/>`;
 o+=`<circle r="18" fill="#0c0518" stroke="#3a2a55" stroke-width="5"/><circle r="8" fill="#ffe9a0"/></g>`;return o;}
function gCone(x,y,r,s,op){return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(0)}) scale(${s.toFixed(2)})" opacity="${op.toFixed(2)}"><rect x="-26" y="-26" width="52" height="52" rx="8" fill="#c2430c" stroke="#0c0518" stroke-width="4"/><circle r="16" fill="#ff8a2a" stroke="#0c0518" stroke-width="4"/><circle r="6" fill="#ffd9b0"/></g>`;}
function gWorld(tg){
 const u=tg/GP;
 let o=`<defs><radialGradient id="gUG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3fa4" stop-opacity=".5"/><stop offset="1" stop-color="#ff3fa4" stop-opacity="0"/></radialGradient><radialGradient id="gLmp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd98a" stop-opacity=".15"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient><linearGradient id="gAsf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#231337"/><stop offset="1" stop-color="#150a26"/></linearGradient></defs>`;
 o+=`<rect width="1080" height="1920" fill="url(#gAsf)"/>`;
 for(let i=0;i<46;i++){o+=`<circle cx="${(i*167)%1080}" cy="${(i*293)%1920}" r="${1+i%3}" fill="#fff" opacity=".035"/>`;}
 o+=`<ellipse cx="250" cy="830" rx="90" ry="38" fill="#0c0518" opacity=".5"/><ellipse cx="295" cy="852" rx="38" ry="16" fill="#0c0518" opacity=".5"/><ellipse cx="850" cy="1770" rx="70" ry="28" fill="#0c0518" opacity=".45"/>`;
 o+=`<g transform="translate(150 1800)"><rect x="-55" y="-30" width="110" height="60" rx="8" fill="#0c0518" stroke="#3a2a55" stroke-width="4"/>${[...Array(5)].map((_,k)=>`<path d="M${-40+k*20},-22 V22" stroke="#3a2a55" stroke-width="5"/>`).join('')}</g>`;
 // lugares nas bermas + linhas
 for(let k=0;k<5;k++){o+=`<path d="M0,${790+k*248} H150" stroke="#fff" stroke-width="6" opacity=".28"/><path d="M1080,${790+k*248} h-150" stroke="#fff" stroke-width="6" opacity=".28"/>`;}
 o+=`<path d="M150,790 V1782" stroke="#fff" stroke-width="4" opacity=".12"/><path d="M930,790 V1782" stroke="#fff" stroke-width="4" opacity=".12"/>`;
 for(const s of [[540,880,180],[310,1290,90],[770,1290,-90]]) o+=`<g transform="translate(${s[0]} ${s[1]}) rotate(${s[2]})" opacity=".18"><path d="M0,30 V-14 M0,-30 L-20,-6 M0,-30 L20,-6" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
 o+=`<text x="952" y="1878" font-family="M" font-weight="900" font-size="130" fill="#fff" opacity=".08" text-anchor="middle">P</text>`;
 // ilhas + candeeiros nos centros dos dois lacos
 o+=`<circle cx="540" cy="1035" r="340" fill="url(#gLmp)"/><circle cx="540" cy="1545" r="340" fill="url(#gLmp)"/>`;
 o+=gIsla(540,1035)+gIsla(540,1545);
 // carros estacionados
 o+=carTop(58,1040,90,'#2fa3ff',{})+carTop(58,1530,90,'#7fe08a',{})+carTop(1022,912,-90,'#ffd21f',{})+carTop(1022,1655,-90,'#ff8a5c',{});
 // marcas de pneu persistentes (voltas anteriores)
 for(const sd of [-1,1]){let p=[];for(let i=0;i<=150;i++)p.push(gRear(i/150,sd).map(v=>v.toFixed(0)).join(','));
  o+=`<path d="M${p.join(' L')}" fill="none" stroke="#0a0514" stroke-width="13" opacity=".5" stroke-linejoin="round"/>`;}
 // rasto fresco atras do carro
 for(const sd of [-1,1]){let p=[];for(let i=0;i<=26;i++)p.push(gRear(u-(1.2/GP)*(i/26),sd).map(v=>v.toFixed(0)).join(','));
  o+=`<path d="M${p.join(' L')}" fill="none" stroke="#040209" stroke-width="15" opacity=".8" stroke-linecap="round" stroke-linejoin="round"/>`;}
 // rasto neon
 {let p=[];for(let i=0;i<=16;i++){const c=gCar(u-(0.55/GP)*(i/16));p.push(c[0].toFixed(0)+','+c[1].toFixed(0));}
  o+=`<path d="M${p.join(' L')}" fill="none" stroke="#ff3fa4" stroke-width="56" opacity=".12" stroke-linecap="round"/>`;}
 // cones que o carro derruba
 const cones=[{u0:.17,fx:50,fy:30,dx:210,dy:130},{u0:.67,fx:44,fy:-32,dx:190,dy:-150}];
 for(const cn of cones){const P=gPos(cn.u0);const bx=P[0]+cn.fx,by=P[1]+cn.fy;
  const tS=(((u-cn.u0)%1)+1)%1*GP;
  if(tS<0.85){const k=ease(tS/.85);o+=gCone(bx+cn.dx*k,by+cn.dy*k,k*660,1,Math.max(0,1-Math.max(0,(tS-.55)/.3)));}
  else if(tS>1.6){const f=Math.min(1,(tS-1.6)/.5);o+=gCone(bx,by,0,.6+.4*f,f);}}
 // moedas que o carro apanha
 const CU=[.08,.3,.45,.58,.82];
 CU.forEach((cu,i)=>{const P=gPos(cu);const tS=(((u-cu)%1)+1)%1*GP;
  if(tS<0.5){const k=tS/.5;o+=`<circle cx="${P[0].toFixed(0)}" cy="${P[1].toFixed(0)}" r="${(20+k*110).toFixed(0)}" fill="none" stroke="#ffd21f" stroke-width="${(7*(1-k)).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`+fTxt(P[0],P[1]-50-k*90,'+R$',52,'#ffd21f','middle',10);}
  else if(tS>1.4){const f=Math.min(1,(tS-1.4)/.4);const w=Math.abs(Math.cos(tg*3+i));
   o+=`<g opacity="${f.toFixed(2)}" transform="translate(${P[0].toFixed(0)} ${P[1].toFixed(0)})"><ellipse rx="${(10+24*w).toFixed(1)}" ry="32" fill="url(#gCoin)" stroke="#8a5a00" stroke-width="5"/><path d="M${(20+12*w).toFixed(0)},-28 l10,-10" stroke="#fff6c0" stroke-width="5" opacity="${(.4+.5*Math.abs(Math.sin(tg*5+i))).toFixed(2)}"/></g>`;}});
 // fumo dos pneus
 for(let i=0;i<16;i++){const age=i*.06;const ut=u-age/GP;const c2=gCar(ut);const inten=Math.min(1,Math.abs(c2[3])/26);
  if(inten<.12)continue;
  for(const sd of [-1,1]){const w=gRear(ut,sd);
   o+=`<circle cx="${(w[0]+Math.sin(i*2.7+sd*3)*age*55).toFixed(0)}" cy="${(w[1]-age*30).toFixed(0)}" r="${(15+age*100).toFixed(0)}" fill="#d8cfe8" opacity="${Math.max(0,(.5-age*.52)*inten).toFixed(2)}"/>`;}}
 // carro com neon por baixo
 const c=gCar(u);
 o+=`<g transform="translate(${c[0].toFixed(1)} ${c[1].toFixed(1)}) rotate(${c[2].toFixed(1)})"><ellipse rx="190" ry="120" fill="url(#gUG)"/></g>`;
 o+=carTop(c[0],c[1],c[2],'url(#gCar)',{lights:true,brake:Math.abs(c[3])>16});
 return o;}
function gCam(tg,inner){const z=1.03+.035*Math.sin(tg*.5);const r=.8*Math.sin(tg*.3);
 return `<g transform="translate(540 1200) scale(${z.toFixed(3)}) rotate(${r.toFixed(2)}) translate(-540 -1200)">${inner}</g>`;}

// --- cenas v2 (sobrepoem as anteriores) ---
FP.gta_hype=(t,dur,tw)=>{const g=tw===undefined?t:tw;
 let o=gDefs()+gCam(g,gWorld(g));
 const secs=Math.max(0,59-Math.floor(t*6)%60);
 const k=(0.7+0.3*ease(clamp(t/.3,0,1)))*(1+.03*Math.sin(t*8));
 o+=`<g transform="translate(540 610) scale(${k})"><rect x="-380" y="-130" width="760" height="260" rx="34" fill="#0c0518" opacity=".8" stroke="${NP}" stroke-width="8"/>`;
 const dig=['6D','23H','59M',String(secs).padStart(2,'0')+'S'];
 dig.forEach((d,i)=>{o+=`<g transform="translate(${-270+i*180} 0)"><rect x="-80" y="-90" width="160" height="150" rx="16" fill="#1d0c33" stroke="${NC}" stroke-width="4"/><path d="M-80,-15 H80" stroke="#0c0518" stroke-width="4"/><text y="22" font-family="M" font-weight="900" font-size="${d.length>2?54:64}" fill="#fff" text-anchor="middle">${d}</text></g>`;});
 o+=`<text y="110" font-family="M" font-weight="900" font-size="34" fill="${NC}" text-anchor="middle" letter-spacing="6">LANÇAMENTO 19/11</text></g>`;
 o+=`<rect width="1080" height="1920" fill="url(#gVig)"/>`;
 return o+gHook(t,2.52);};
FP.gta_espera=(t,dur)=>{let o=gDefs()+gCam(t+2.52,gWorld(t+2.52));
 const yr=2013+Math.min(13,Math.floor(clamp(t/2.2,0,1)*13));
 o+=`<g transform="translate(540 540) rotate(-3)" stroke="${FK}"><rect x="-216" y="-156" width="432" height="316" rx="26" fill="#000" opacity=".4" stroke="none"/><rect x="-210" y="-160" width="420" height="320" rx="24" fill="#fffaf0" stroke-width="10"/><rect x="-210" y="-160" width="420" height="80" rx="24" fill="${NP}" stroke-width="10"/><text y="-104" font-family="M" font-weight="900" font-size="38" fill="#fff" text-anchor="middle" stroke="none">ESPERANDO DESDE</text><text y="80" font-family="M" font-weight="900" font-size="140" fill="${FK}" text-anchor="middle" stroke="none">${yr}</text>`;
 for(const rx of [-110,110]) o+=`<rect x="${rx-14}" y="-190" width="28" height="64" rx="14" fill="#c9d1d6" stroke-width="6"/>`;
 o+=`</g>`;
 if(t>=2.57) o+=fStamp(t,2.57,540,880,'13 ANOS ESPERANDO','#e0483a',64,-4);
 return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`;};
FP.gta_pergunta=(t,dur)=>{let o=gDefs()+gCam(t+6.25,gWorld(t+6.25));
 const k=pop(t,0,.25); o+=`<g transform="translate(540 300) scale(${k})">${neonTxt(0,0,'QUANTOS ANOS',96,NP)}${neonTxt(0,115,'VOCÊ TINHA?',110,NC)}</g>`;
 const C=['eu tinha 9','nem tinha nascido','15 kkkk','tinha 21','6 anos','12 e jogava escondido'];
 C.forEach((c,i)=>{const t0=0.5+i*0.62; if(t<t0) return; const p=ease(clamp((t-t0)/.35,0,1)); const y=1210-(t-t0)*180; if(y<540) return; const x=i%2?620:460;
  o+=`<g transform="translate(${x} ${y}) scale(${p})" opacity="${Math.min(1,(y-540)/120).toFixed(2)}"><rect x="-350" y="-46" width="700" height="92" rx="46" fill="#fff" stroke="${FK}" stroke-width="5"/><circle cx="-296" cy="0" r="28" fill="${['#ff8a5c','#2fe6ff','#ff3fa4','#7fe08a'][i%4]}" stroke="${FK}" stroke-width="4"/><text x="-252" y="14" font-family="M" font-weight="900" font-size="40" fill="${FK}">${c}</text></g>`;});
 return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`;};
FP.gta_custo=(t,dur)=>{let o=gDefs()+gCam(t+11.26,gWorld(t+11.26));
 o+=chuvaNotas(t,10,.3);
 const v=(ease(clamp(t/2.6,0,1))*5).toFixed(1).replace('.',',');
 o+=`<g transform="translate(540 480)">${fTxt(0,-80,'CUSTOU',80,'#fff')}${fTxt(0,70,'R$ '+v+' BI',150,'#e0483a','middle',18)}</g>`;
 if(t>2.2) o+=fStamp(t,2.2,540,760,'O JOGO MAIS CARO','#e0483a',58,-5);
 return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`;};
FP.gta_pre=(t,dur)=>{let o=gDefs()+gCam(t+14.72,gWorld(t+14.72));
 const k=ease(clamp(t/1.8,0,1)); const ang=(1-k)*-16+Math.sin(t*6)*(1-k)*2;
 let b=`<g stroke="${FK}" stroke-width="10"><path d="M540,1560 V820" stroke="#c9d1d6" stroke-width="22"/><path d="M420,1570 H660" stroke="#c9d1d6" stroke-width="26" stroke-linecap="round"/><circle cx="540" cy="800" r="26" fill="${NY}"/></g>`;
 b+=`<g transform="rotate(${ang.toFixed(2)} 540 800)"><path d="M180,800 H900" stroke="#c9d1d6" stroke-width="20"/>`;
 for(const pc of [[220,'CUSTO','#e0483a'],[860,'PRÉ-VENDA','#2f9e5a']]){const px=pc[0],lab=pc[1],col=pc[2];const yy=800;
  b+=`<g transform="rotate(${(-ang).toFixed(2)} ${px} ${yy})"><path d="M${px},${yy} L${px-120},${yy+260} M${px},${yy} L${px+120},${yy+260}" stroke="#c9d1d6" stroke-width="6"/><path d="M${px-150},${yy+260} Q${px},${yy+360} ${px+150},${yy+260} Z" fill="#c9d1d6" stroke="${FK}" stroke-width="8"/>`;
  const m=px<540?10:Math.floor(k*10); for(let i=0;i<m;i++) b+=nota(px+((i%2)?-12:12),yy+236-i*16,(i%3-1)*4,1);
  b+=`<g transform="translate(${px} ${yy+420})"><rect x="-150" y="-46" width="300" height="92" rx="20" fill="${col}" stroke="${FK}" stroke-width="7"/><text y="16" font-family="M" font-weight="900" font-size="44" fill="#fff" text-anchor="middle">${lab}</text></g></g>`;}
 b+=`</g>`;
 o+=`<g transform="translate(540 430) scale(.62) translate(-540 -800)">${b}</g>`;
 if(t>1.8) o+=fStamp(t,1.8,540,1060,'QUASE EMPATOU!','#2f9e5a',80,-6);
 else o+=`<g transform="translate(540 230)">${fTxt(0,0,'SÓ NA PRÉ-VENDA',80,'#fff')}</g>`;
 return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`;};
FP.gta_semana=(t,dur)=>{
 if(t>dur-.2) return FP.gta_hype(0.05,2.52,t+17.56);
 let o=gDefs()+gCam(t+17.56,gWorld(t+17.56));
 for(let i=0;i<4;i++){const t0=1.2+i*.7; if(t>t0){const p=clamp((t-t0)/1.2,0,1); const fx=200+i*230, fy=520+(i%2)*150; for(let j=0;j<14;j++){const a=j*Math.PI/7; o+=`<circle cx="${(fx+Math.cos(a)*p*170).toFixed(0)}" cy="${(fy+Math.sin(a)*p*170+p*p*60).toFixed(0)}" r="${(8*(1-p)+2).toFixed(1)}" fill="${[NP,NC,NY][j%3]}" opacity="${(1-p).toFixed(2)}"/>`;}}}
 o+=chuvaNotas(t,14,.6);
 const v=Math.min(25,Math.floor(ease(clamp(t/2.4,0,1))*25)+5*(t<0.2?1:0));
 const sh=t<2.4?Math.sin(t*50)*4:0;
 o+=`<g transform="translate(${(540+sh).toFixed(1)} 470)">${fTxt(0,-90,'1ª SEMANA',80,'#fff')}${neonTxt(0,90,'R$ '+v+' BI',180,'#2f9e5a')}</g>`;
 o+=`<g transform="translate(540 720)">${estrelas(0,0,5,t,0.3)}</g>`;
 if(t>2.5) o+=fStamp(t,2.5,540,900,'5× O QUE CUSTOU','#e0483a',70,-5);
 if(t>2.9){const p=pop(t,2.9,.2); o+=`<g transform="translate(540 1090) scale(${(p*.8).toFixed(2)})"><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${NY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle">TEM MAIS 2 FATOS</text></g>`;}
 return o+`<rect width="1080" height="1920" fill="url(#gVig)"/>`;};
