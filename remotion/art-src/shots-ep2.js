// ===== Cenas animadas do Episódio 2 (Dia 2) =====
const D2=29; // dias restantes no HUD
let NOHUD=false;
function hud2(div,t=1,shake=0){ if(NOHUD) return '';const sx=shake?Math.sin(t*60)*shake:0;return `<g transform="translate(${sx} 0)">${hud(D2,div)}</g>`;}
// valor a flutuar ao lado do HUD (verde = desce dívida, vermelho = sobe)
function delta(txt,col,t,t0){ if(t<t0||NOHUD) return ''; const k=pop(t,t0,.25); const up=Math.min(1,(t-t0)/1.6)*40;
  return `<g transform="translate(700 ${260-up}) scale(${k}) rotate(-4)"><rect x="-170" y="-52" width="340" height="88" rx="44" fill="${col}"/><text x="0" y="12" font-size="58" fill="#fff" stroke="#1b1420" stroke-width="10" paint-order="stroke fill" text-anchor="middle">${txt}</text></g>`; }
function lerpDiv(a,b,t,t0,d=.8){return Math.round(a+(b-a)*ease((t-t0)/d));}
function liftScene(carY,dusty=true,extra=''){
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  for(const px of [110,900]) o+=`<rect x="${px}" y="560" width="80" height="1060" rx="6" fill="#2f6fb3"/><rect x="${px+14}" y="600" width="14" height="980" fill="#245a92" stroke="none"/><rect x="${px-20}" y="1610" width="120" height="30" rx="4" fill="#245a92"/>`;
  o+=`<rect x="190" y="${carY-30}" width="710" height="28" fill="#f2c230"/>`;
  o+=extra+corsa({x:545,y:carY,s:1.25,dusty});
  return o;
}
function stamp(t,t0,x,y,w,h,txt,size,col='#c8402f',rot=-10,fill='none'){ if(t<t0) return ''; const k=1+1.6*(1-ease((t-t0)/.16));
  return `<g transform="translate(${x} ${y}) scale(${k}) rotate(${rot})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="16" fill="${fill}" stroke="${col}" stroke-width="14"/><text x="0" y="${size*.36}" font-size="${size}" fill="${col}" text-anchor="middle" stroke="none">${txt}</text></g>`; }
function poeira(t,n=16){let o='';for(let i=0;i<n;i++){const x=(i*83)%1080,y=(i*131+t*80)%1400+300;o+=`<circle cx="${x}" cy="${y}" r="3" fill="#efe3c6" stroke="none" opacity=".7"/>`;}return o;}

// 1 · VOCÊS ESCOLHERAM: CORSA — elevador desce de uma vez
SH.e2escolha=(t,dur)=>{
  const drop=t<.5?0:ease((t-.5)/.35); const carY=1040+drop*560; const sh=t>.8&&t<1.1?Math.sin(t*90)*12:0;
  let o=`<g transform="translate(${sh} ${sh/2})">${liftScene(carY,true)}${poeira(t)}</g>`;
  o+=ono('CRÉÉÉC',300,620,t,.45,'#fff',-10,100);
  o+=stamp(t,.15,540,1230,860,250,'VOCÊS ESCOLHERAM',92,'#fff',-6,'#2f9e6e');
  if(t>.55){const k=pop(t,.55,.2);o+=`<g transform="translate(540 1420) scale(${k}) rotate(4)"><rect x="-260" y="-90" width="520" height="170" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="-40" y="50" font-size="140" fill="#1b1420" text-anchor="middle" stroke="none">CORSA</text><text x="0" y="140" font-size="48" fill="#fff" stroke="#1b1420" stroke-width="10" paint-order="stroke fill" text-anchor="middle">(vender as peças)</text><g transform="translate(180 0)"><circle r="56" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/><path d="M-26,0 l18,20 l34,-40" fill="none" stroke="#fff" stroke-width="14"/></g></g>`;}
  return o+hud2(87400);
};
// 2 · Sete anos de pó
SH.e2po=(t,dur)=>{
  const wipe=clamp((t-1.8)/1.6,0,1);
  let o=liftScene(1600,true);
  // pano a apagar o ME LAVA: retângulo da cor do vidro a avançar
  if(wipe>0) o+=`<g transform="translate(545 1600) scale(1.25)"><path d="M66,-272 L${66+182*wipe},-272 L${66+182*wipe},-174 L66,-174 Z" fill="#bfe3ea" stroke="none"/></g>`;
  // nuvem de pó
  for(let i=0;i<9;i++){const a=i*0.7, r=(t*140+i*40)%420, op=Math.max(0,.75-r/520);o+=`<circle cx="${560+Math.cos(a)*r}" cy="${1300+Math.sin(a)*r*.6-t*30}" r="${70+r*.25}" fill="#e9dcc0" stroke="none" opacity="${op}"/>`;}
  const cough=Math.floor(t*3)%2===0?6:0;
  o+=`<g transform="translate(0 ${cough})">${nando({x:820,y:1900,s:.7,face:'preocupado',hold:null,pose:'cabeca'})}</g>`;
  // pano vermelho na mão (a esfregar)
  const px=760+Math.sin(t*14)*30; o+=`<path d="M${px},1290 l50,-10 l-6,46 l-48,6 Z" fill="#e0483a" stroke-width="5"/>`;
  o+=ono('COF',260,800,t,.5,'#fff',-12,100)+ono('COF!',400,910,t,1.1,'#fff',8,90);
  if(t>1.4){const k=pop(t,1.4),sw=Math.sin(t*3)*6;o+=`<g transform="translate(430 540) scale(${k}) rotate(${-6+sw})"><path d="M0,-60 V0" stroke-width="5"/><rect x="-200" y="0" width="400" height="150" rx="12" fill="#fffaf0"/><text x="0" y="58" font-size="40" fill="#2b1d16" text-anchor="middle" stroke="none">DONA DO CARRO:</text><text x="0" y="122" font-family="PM" font-size="54" fill="#c8402f" text-anchor="middle" stroke="none">DONA CIDA</text></g>`;}
  return cam(o,t,dur,1.0,1.05,545,1300)+hud2(87400);
};
// 3 · Capô aberto — falta uma peça
SH.e2capo=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2a2a30" stroke="none"/>`;
  // capô aberto (tampa em cima)
  o+=`<path d="M60,240 L1020,240 L940,620 L140,620 Z" fill="#4fb3a0"/><path d="M180,560 L900,560" stroke="#3a8e7f" stroke-width="10"/>`;
  // compartimento do motor
  o+=`<path d="M80,640 H1000 L960,1600 H120 Z" fill="#3a3a42"/>`;
  o+=`<rect x="200" y="760" width="420" height="320" rx="24" fill="#6b7479"/><rect x="230" y="720" width="360" height="70" rx="14" fill="#8d979c"/>`;
  for(let k=0;k<4;k++) o+=`<rect x="${255+k*88}" y="700" width="50" height="40" rx="8" fill="#e0483a"/>`;
  o+=`<path d="M620,860 Q760,820 820,940 Q860,1040 760,1120" fill="none" stroke="#1b1b1f" stroke-width="40"/><path d="M620,860 Q760,820 820,940 Q860,1040 760,1120" fill="none" stroke="#2c2c32" stroke-width="26"/>`;
  o+=`<rect x="700" y="700" width="220" height="150" rx="16" fill="#1f1f24"/><text x="810" y="790" font-size="44" fill="#f6c744" text-anchor="middle" stroke="none">+ −</text>`;
  o+=`<rect x="190" y="1140" width="250" height="160" rx="18" fill="#2f6fb3"/><circle cx="315" cy="1220" r="40" fill="#bfe3ea"/>`;
  // buraco vazio onde devia estar a peça
  o+=`<rect x="540" y="1180" width="300" height="230" rx="20" fill="#121216" stroke="#f6c744" stroke-width="8" stroke-dasharray="26 18"/>`;
  const p=1+0.12*Math.sin(t*8); if(t>.6) o+=`<g transform="translate(690 1295) scale(${p*pop(t,.6)})"><path d="M-90,-90 L90,90 M90,-90 L-90,90" stroke="#1b1420" stroke-width="54"/><path d="M-90,-90 L90,90 M90,-90 L-90,90" stroke="#e0483a" stroke-width="34"/></g>`;
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(690 1520) scale(${k})"><rect x="-230" y="-56" width="460" height="100" rx="18" fill="#fff"/><text x="0" y="22" font-size="66" fill="#1b1420" text-anchor="middle" stroke="none">FALTA A PEÇA</text></g>`;}
  // mão do Nando com lanterna a entrar
  const hx=1080-ease(t/1.2)*220; o+=`<path d="M${hx+200},1000 L${hx},960" stroke="#2b1d16" stroke-width="70"/><path d="M${hx+200},1000 L${hx},960" stroke="#b9774c" stroke-width="56"/><rect x="${hx-90}" y="930" width="110" height="56" rx="10" fill="#f6c744"/><path d="M${hx-90},940 L${hx-260},900 L${hx-260},1040 L${hx-90},980 Z" fill="#fff6c4" stroke="none" opacity=".35"/>`;
  return cam(o,t,dur,1.06,1.0,690,1200)+hud2(87400);
};
// 4 · O Turbo tinha a peça — e pergunta de comentário a meio
SH.e2turbo=(t,dur)=>{
  let o=interior({});
  o+=corsa({x:300,y:1460,s:.9,dusty:false});
  // pneu-cama do Turbo
  o+=`<ellipse cx="760" cy="1640" rx="230" ry="90" fill="#2a2522"/><ellipse cx="760" cy="1630" rx="130" ry="44" fill="#141110" stroke-width="5"/>`;
  const out=ease(t/.9); const tx=760-out*120, ty=1700-out*40, wag=Math.sin(t*12)*6;
  o+=`<g transform="rotate(${wag} ${tx} ${ty})">${turbo({x:tx,y:ty,s:.62,mood:'calmo',flip:false})}</g>`;
  // caixa na boca
  const bx=tx-262, by=ty-200;
  o+=`<g transform="rotate(-8 ${bx} ${by})"><rect x="${bx-120}" y="${by-60}" width="240" height="120" rx="8" fill="#c79a5b"/><path d="M${bx-120},${by-30} H${bx+120}" stroke="#a87a3f" stroke-width="5"/><text x="${bx}" y="${by+10}" font-family="PM" font-size="30" fill="#2b1d16" text-anchor="middle" stroke="none">PEÇA CORSA</text><text x="${bx}" y="${by+46}" font-family="PM" font-size="28" fill="#c8402f" text-anchor="middle" stroke="none">2019</text></g>`;
  o+=ono('AU!',900,1300,t,.9,'#f6c744',8,100);
  // pergunta a meio
  if(t>1.0){const k=pop(t,1.0);o+=`<g transform="translate(540 640) scale(${k}) rotate(-3)"><rect x="-430" y="-150" width="860" height="300" rx="28" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-36" font-size="88" fill="#fff" text-anchor="middle" stroke="none">O DONO VAI PAGAR?</text><text x="0" y="82" font-size="84" fill="#f6c744" text-anchor="middle" stroke="none">COMENTA: SIM OU NÃO</text></g>`;
    const b=Math.sin(t*8)*12; o+=`<g transform="translate(540 ${840+b})"><path d="M-40,0 H40 V40 H80 L0,110 L-80,40 H-40 Z" fill="#f6c744" stroke="#1b1420" stroke-width="8"/></g>`;}
  return cam(o,t,dur,1.0,1.04,600,1500)+hud2(87400);
};
// 5 · VRUUUM — sete anos parado, vinte minutos de serviço
SH.e2motor=(t,dur)=>{
  const on=t>.6; const sh=on?Math.sin(t*70)*4:0;
  let o=liftScene(1600,false);
  o=`<g transform="translate(${sh} 0)">${o}</g>`;
  // fumo do escape (à esquerda, atrás do carro)
  if(on) for(let i=0;i<6;i++){const p=((t-.6)*1.2+i/6)%1; o+=`<circle cx="${110-p*260}" cy="${1560-p*200}" r="${30+p*90}" fill="#cfcfd4" stroke="#8d8d94" stroke-width="5" opacity="${1-p}"/>`;}
  o+=ono('VRUUUM!',560,720,t,.6,'#f6c744',-6,150);
  const hop=Math.abs(Math.sin(t*6))*30*(t>1.2?1:0);
  o+=`<g transform="translate(0 ${-hop})">${nando({x:860,y:1900,s:.62,face:t>1.2?'contente':'normal',hold:t>1.2?null:'chave',pose:t>1.2?'vitoria':'normal'})}</g>`;
  if(t>2.2){const k=pop(t,2.2);o+=`<g transform="translate(330 1160) scale(${k}) rotate(-5)"><rect x="-250" y="-60" width="500" height="120" rx="20" fill="#fff"/><text x="0" y="28" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">7 ANOS → 20 MIN</text></g>`;}
  return cam(o,t,dur,1.0,1.05,545,1400)+hud2(87400);
};
// 6 · WhatsApp + PIX
SH.e2whats=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2f9e6e" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.2;o+=`<path d="M540,1000 L${540+Math.cos(a)*1600},${1000+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${1000+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  // telemóvel
  o+=`<rect x="150" y="300" width="780" height="1540" rx="70" fill="#1d1d24"/><rect x="180" y="330" width="720" height="1480" rx="48" fill="#ece5dd" stroke="none"/>`;
  o+=`<path d="M180,380 Q180,330 228,330 H852 Q900,330 900,380 V480 H180 Z" fill="#075e54" stroke="none"/><circle cx="260" cy="405" r="40" fill="#c79a5b" stroke="#fff" stroke-width="4"/><text x="320" y="400" font-size="40" fill="#fff" stroke="none">DONA CIDA (CORSA)</text><text x="320" y="446" font-size="28" fill="#cfe9e2" stroke="none">${t>1.6&&t<2.6?'digitando...':'online'}</text>`;
  const bub=(y,txt,me,t0,lines=1)=>{ if(t<t0) return ''; const k=pop(t,t0,.2); const w=560, h=40+lines*58; const x=me?880-w:200;
    return `<g transform="translate(${me?880:200} ${y}) scale(${k}) translate(${me?-880:-200} ${-y})"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${me?'#dcf8c6':'#fff'}" stroke="#b9b2a2" stroke-width="3"/>${txt.map((s,i)=>`<text x="${x+30}" y="${y+64+i*58}" font-family="PM" font-size="40" fill="#1b1420" stroke="none">${s}</text>`).join('')}</g>`;};
  o+=bub(540,['Dona Cida, seu Corsa','tá pronto!'],true,.2,2);
  if(t>1.6&&t<2.6){const d=Math.floor(t*6)%3; o+=`<rect x="200" y="740" width="160" height="80" rx="22" fill="#fff" stroke="#b9b2a2" stroke-width="3"/>`+[0,1,2].map(i=>`<circle cx="${240+i*40}" cy="780" r="12" fill="${i===d?'#555':'#bbb'}" stroke="none"/>`).join('');}
  o+=bub(740,['CORSA?? achei que','tinham roubado kkkk'],false,2.6,2);
  o+=bub(940,['Mandando o PIX'],false,3.3,1);
  // notificação PIX
  let div=87400;
  if(t>3.9){const k=pop(t,3.9,.25); const y=360+(1-k)*-200; o+=`<g transform="translate(0 ${y-360})"><rect x="140" y="1150" width="800" height="200" rx="34" fill="#fff" stroke="#1b1420" stroke-width="8"/><circle cx="240" cy="1250" r="58" fill="#32bcad"/><path d="M240,1210 l40,40 l-40,40 l-40,-40 Z" fill="#fff" stroke="none"/><text x="320" y="1236" font-size="44" fill="#1b1420" stroke="none">PIX RECEBIDO</text><text x="320" y="1306" font-size="66" fill="#2f9e6e" stroke="none">R$ 1.500,00</text></g>`;
    div=lerpDiv(87400,85900,t,4.2); }
  o+=ono('PLIM!',840,1120,t,3.9,'#5fe08a',8,90);
  return o+hud2(div)+delta('−R$ 1.500','#2f9e6e',t,4.2);
};
// 7 · Festa… até o telefone tocar
SH.e2festa=(t,dur)=>{
  const ring=t>2.4;
  let o=interior({});
  o+=corsa({x:300,y:1460,s:.9,dusty:false});
  const b=ring?0:Math.abs(Math.sin(t*7))*40, r=ring?0:Math.sin(t*7)*8;
  o+=`<g transform="translate(0 ${-b}) rotate(${r} 600 1880)">${nando({x:600,y:1880,s:.72,face:ring?'choque':'contente',hold:null,pose:ring?'normal':'vitoria'})}</g>`;
  const tb=ring?0:Math.abs(Math.sin(t*7+1))*50; o+=`<g transform="translate(0 ${-tb})">${turbo({x:930,y:1890,s:.42,mood:'calmo'})}</g>`;
  if(!ring) for(let i=0;i<5;i++){const p=(t*.8+i*.2)%1; const x=200+i*170, y=1000-p*300; o+=`<g transform="translate(${x} ${y}) rotate(${Math.sin(t*4+i)*15})" opacity="${1-p}"><circle cx="0" cy="40" r="20" fill="#f6c744"/><path d="M18,40 V-30 Q40,-20 46,0" fill="none" stroke-width="8"/></g>`;}
  if(ring){ const sw=Math.sin(t*50)*12; o+=`<g transform="translate(290 800) rotate(${sw}) scale(${.8*pop(t,2.4)})"><rect x="-150" y="-260" width="300" height="520" rx="40" fill="#1d1d24"/><rect x="-126" y="-232" width="252" height="464" rx="24" fill="#c8402f" stroke-width="4"/><text x="0" y="-130" font-size="44" fill="#fff" text-anchor="middle" stroke="none">BANCO</text><text x="0" y="-80" font-size="44" fill="#fff" text-anchor="middle" stroke="none">NACIONAL</text><circle cx="0" cy="80" r="64" fill="#2f9e6e" stroke="#fff" stroke-width="6"/><path d="M-22,62 q10,-10 18,0 l-6,10 q8,14 20,20 l10,-6 q10,8 0,18 q-40,10 -42,-42 Z" fill="#fff" stroke-width="3"/></g>`;
    o+=ono('TRIIIM!',800,620,t,2.45,'#fff',8,100)+ono('TRIIIM!',330,470,t,2.9,'#fff',-8,90); }
  if(ring && t>3.2){ // grande plano da cara (estilo referência)
    let c=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
    for(let k=0;k<14;k++){const a=k*0.45+t*.8; c+=`<path d="M540,900 L${540+Math.cos(a)*1700},${900+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${900+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".1" stroke="none"/>`;}
    const z=2.7+ease((t-3.2)/1.6)*.25, j=Math.sin(t*60)*5;
    c+=`<g transform="translate(${j} 0)">${nando({x:540,y:900+(1740-815)*z,s:z,face:'choque',hold:null,pose:'normal'})}</g>`;
    c+=ono('BANCO?!',540,1500,t,3.35,'#fff',-6,170);
    return c+hud2(85900);
  }
  return cam(o,t,dur,1.0,1.04,600,1500)+hud2(85900);
};
// 8 · O banco: juros de atraso
SH.e2banco=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<14;k++){const a=k*0.45+t*.5; o+=`<path d="M540,1000 L${540+Math.cos(a)*1700},${1000+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${1000+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".08" stroke="none"/>`;}
  // ecrã de chamada
  o+=`<rect x="230" y="360" width="620" height="1100" rx="60" fill="#1d1d24"/><rect x="258" y="388" width="564" height="1044" rx="40" fill="#23283f" stroke="none"/>`;
  o+=`<circle cx="540" cy="560" r="90" fill="#fffaf0"/><text x="540" y="590" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">BN</text><text x="540" y="720" font-size="56" fill="#fff" text-anchor="middle" stroke="none">BANCO NACIONAL</text><text x="540" y="776" font-size="34" fill="#c9cde6" text-anchor="middle" stroke="none">em chamada · 0:${String(Math.floor(t*3)).padStart(2,'0')}</text>`;
  // música de espera
  for(let i=0;i<3;i++){const p=(t*.7+i/3)%1;o+=`<g transform="translate(${400+i*120} ${980-p*160})" opacity="${1-p}"><circle cx="0" cy="40" r="18" fill="#f6c744"/><path d="M16,40 V-26 L40,-16" fill="none" stroke="#f6c744" stroke-width="8"/></g>`;}
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(540 1220) scale(${k})"><rect x="-250" y="-64" width="500" height="118" rx="24" fill="#fff"/><text x="0" y="22" font-size="60" fill="#1b1420" text-anchor="middle" stroke="none">JUROS DE ATRASO</text></g>`;}
    o+=stamp(t,2.6,540,1470,640,220,'+R$ 2.000',150,'#fff',-10,'#1b1420');
  const div=t<2.8?85900:lerpDiv(85900,87900,t,2.8,.6);
  const sh=t>2.6&&t<3.2?Math.sin(t*90)*12:0;
  return `<g transform="translate(${sh} 0)">${o}</g>`+hud2(div,t,t>2.8&&t<3.6?8:0)+delta('+R$ 2.000','#e0483a',t,2.8);
};
// 9 · Cai com a cara na bancada
SH.e2queda=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="140" y="560" width="800" height="300" rx="10" fill="#c98a33"/>`; // painel de ferramentas
  for(let k=0;k<6;k++) o+=`<rect x="${190+k*125}" y="${600+(k%2)*60}" width="26" height="150" rx="10" fill="#c9d1d6"/>`;
  const fall=ease(clamp((t-.3)/.35,0,1));
  o+=`<g transform="translate(0 ${fall*150}) rotate(${fall*10} 540 1100)">${nando({x:540,y:1960,s:.95,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  // bancada à frente
  o+=`<rect x="40" y="1300" width="1000" height="70" fill="#8a5530"/><rect x="40" y="1370" width="1000" height="560" fill="#6e4325"/><path d="M40,1370 H1040" stroke-width="7"/>`;
  o+=`<rect x="120" y="1240" width="180" height="60" rx="8" fill="#e0483a"/><circle cx="880" cy="1270" r="34" fill="#c9d1d6"/>`;
  o+=ono('TUM!',780,1100,t,.62,'#fff',10,120);
  if(t>1.2){const tx=-200+ease((t-1.2)/.5)*480; o+=turbo({x:tx,y:1302,s:.42,mood:'calmo',flip:true});}
  return cam(o,t,dur,1.0,1.06,540,1300)+hud2(87900);
};
// 10 · Chega o Rubinho
SH.e2rubinho=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="0" y="0" width="1080" height="1920" fill="#fff" stroke="none" opacity="${t<.15?1-t/.15:0}"/>`;
  o+=nando({x:280,y:1920,s:.78,face:'choque',hold:null,pose:'normal'});
  const rx=760+600*(1-ease(t/.45));
  o+=rubinho({x:rx,y:1900,s:.8,face:'feliz',pose:'filma'});
  // linhas de velocidade
  if(t<.5) for(let i=0;i<5;i++) o+=`<path d="M${rx+220},${1200+i*90} h${200}" stroke="#fff" stroke-width="10" opacity="${1-t*2}"/>`;
  o+=tag('RUBINHO, 27',800,900,t,.5,780,1000);
  if(t>.9){const k=pop(t,.9);o+=`<g transform="translate(540 560) scale(${k}) rotate(-4)"><rect x="-460" y="-120" width="920" height="240" rx="60" fill="#fff"/><text x="0" y="-14" font-family="PM" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">MANO, A GENTE</text><text x="0" y="74" font-family="PM" font-size="66" fill="#c8402f" text-anchor="middle" stroke="none">VIRALIZA A OFICINA!</text><path d="M250,110 l60,110 l-140,-110" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.04)+hud2(87900);
};
// 11 · Votação: VIRALIZAR ✕ COBRAR
SH.e2votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#e08a2f" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 300) scale(${bk}) rotate(-3) translate(-540 -300)"><rect x="150" y="240" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="320" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  // VIRALIZAR: celular a filmar com corações
  o+=`<g transform="translate(${L} 0)"><text x="270" y="520" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">VIRALIZAR</text><text x="270" y="580" font-size="36" fill="#ecd9f7" text-anchor="middle" stroke="none">grátis… mas arriscado</text>`;
  o+=`<g transform="rotate(-8 270 820)"><rect x="180" y="650" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="670" width="148" height="290" rx="16" fill="#49f2ff" stroke-width="4"/><circle cx="230" cy="700" r="12" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="290" y="710" font-size="28" fill="#1b1420" stroke="none">REC</text></g>`;
  for(let i=0;i<3;i++){const p=(t*.9+i/3)%1;o+=`<g transform="translate(${150+i*120} ${960-p*260}) scale(${.8+p*.3})" opacity="${1-p}"><path d="M0,10 C-30,-20 -30,-50 0,-30 C30,-50 30,-20 0,10 Z" fill="#ff5a7a"/></g>`;}
  o+=`</g>`;
  // COBRAR: Seu Armando com a conta fiado
  o+=`<g transform="translate(${R} 0)"><text x="810" y="520" font-size="92" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">COBRAR</text><text x="810" y="580" font-size="36" fill="#fde9d2" text-anchor="middle" stroke="none">R$ 3.200… ou em ovos</text>`;
  o+=armando({x:860,y:1180,s:.46,face:'feliz'});
  o+=`<g transform="rotate(${6+Math.sin(t*3)*4} 700 760)"><rect x="600" y="650" width="210" height="140" rx="8" fill="#fffaf0"/><text x="705" y="705" font-family="PM" font-size="34" fill="#2b1d16" text-anchor="middle" stroke="none">FIADO</text><text x="705" y="760" font-family="PM" font-size="40" fill="#c8402f" text-anchor="middle" stroke="none">R$ 3.200</text></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 760) scale(${xp}) translate(-540 -760)"><circle cx="540" cy="760" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="790" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 1900)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud2(87900);
};
