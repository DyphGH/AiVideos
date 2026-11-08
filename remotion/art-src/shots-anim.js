// ===== Cenas animadas do Episódio 1 =====
// buildShot(nome, t, dur) -> string SVG interior (1080x1920). t em segundos dentro do plano.
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const ease=x=>1-Math.pow(1-clamp(x,0,1),3);
const pop=(t,t0,d=.25)=>{const x=clamp((t-t0)/d,0,1);return x<=0?0:(x<1? 1+0.25*Math.sin(x*Math.PI)*(1-x)+ (x*.0) : 1)*ease(x);};
function cam(inner,t,dur,z0=1,z1=1.05,cx=540,cy=960){const z=z0+(z1-z0)*(t/dur);return `<g transform="translate(${cx} ${cy}) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`;}
function hudAnim(t,dia=30,div=87400,shake=0){const y=t<.4?-200*(1-ease(t/.4)):0;const sx=shake?Math.sin(t*60)*shake:0;return `<g transform="translate(${sx} ${y})">${hud(dia,div)}</g>`;}

const SH={};
function ono(txt,x,y,t,t0,col='#f6c744',rot=-8,size=110){ if(t<t0) return ''; const k=pop(t,t0,.2); const j=t-t0<.5?Math.sin((t-t0)*60)*4:0;
  return `<g transform="translate(${x+j} ${y}) scale(${k}) rotate(${rot})"><text x="0" y="0" font-size="${size}" fill="${col}" stroke="#1b1420" stroke-width="16" paint-order="stroke fill" text-anchor="middle">${txt}</text></g>`; }
function tag(txt,x,y,t,t0,ax,ay){ if(t<t0) return ''; const k=pop(t,t0,.2); const w=txt.length*26+50;
  return `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0,0 L${ax-x},${ay-y}" stroke="#fff" stroke-width="8"/><rect x="${-w/2}" y="-40" width="${w}" height="76" rx="14" fill="#fff"/><text x="0" y="16" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">${txt}</text></g>`; }
// ---------- 0. PENHORA (abertura) ----------
SH.penhora=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<14;k++){const a=k*0.45+t*.6; o+=`<path d="M540,980 L${540+Math.cos(a)*1700},${980+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${980+Math.sin(a+0.22)*1700} Z" fill="#000" opacity=".08" stroke="none"/>`;}
  const z=1.15-0.15*ease(t/dur);
  o+=`<g transform="translate(540 980) scale(${z}) rotate(-4) translate(-540 -980)"><rect x="140" y="420" width="800" height="1120" rx="10" fill="#fffaf0"/>`;
  o+=`<text x="540" y="540" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">BANCO NACIONAL</text><path d="M200,580 H880" stroke-width="5"/>`;
  o+=`<text x="540" y="660" font-size="50" fill="#1b1420" text-anchor="middle" stroke="none">NOTIFICAÇÃO DE DÉBITO</text>`;
  for(let k=0;k<6;k++) o+=`<path d="M220,${740+k*60} H${k%2?760:860}" stroke="#bdb6a6" stroke-width="10"/>`;
  o+=`<text x="540" y="1180" font-size="110" fill="#c8402f" text-anchor="middle" stroke="none">R$ 87.400</text>`;
  o+=`<text x="540" y="1260" font-size="44" fill="#1b1420" text-anchor="middle" stroke="none">PRAZO: 30 DIAS</text></g>`;
  if(t>.2){const k=1+2.2*(1-ease((t-.2)/.15)); o+=`<g transform="translate(540 900) scale(${k}) rotate(-16)"><rect x="-380" y="-110" width="760" height="220" rx="20" fill="none" stroke="#c8402f" stroke-width="18"/><text x="0" y="70" font-size="200" fill="#c8402f" text-anchor="middle" stroke="none">PENHORA</text></g>`;}
  const sh=t>.35&&t<.6?Math.sin(t*90)*14:0;
  return `<g transform="translate(${sh} ${sh/2})">${o}</g>`+hud(30,87400);
};
SH.fachada=(t,dur)=>{
  let o='';
  o+=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/>`;
  o+=`<path d="M${780+t*20},250 q20,-40 70,-30 q30,-40 80,-10 q50,-6 50,40 h-200 Z" fill="#fff" stroke="none" opacity=".9"/>`;
  o+=`<rect x="20" y="300" width="1040" height="1220" fill="#e9a640"/><rect x="0" y="282" width="1080" height="36" fill="#7a3d2a"/>`;
  for(const [x,y] of [[90,660],[960,1120],[930,660]]) o+=`<path d="M${x},${y} l14,30 l-10,24 l16,34" fill="none" stroke="#a8691f" stroke-width="5"/>`;
  o+=`<rect x="56" y="370" width="968" height="230" rx="10" fill="#c8402f"/><rect x="80" y="392" width="920" height="186" rx="6" fill="none" stroke="#f6c744" stroke-width="6" stroke-dasharray="18 14"/>`;
  { const zr=-14+Math.sin(t*6)*6-(t>2.2?ease((t-2.2)/.3)*10:0), zd=10+(t>2.2?ease((t-2.2)/.3)*16:0);
    o+=`<text x="540" y="545" font-size="150" fill="#f6c744" stroke="#5a1a12" stroke-width="10" paint-order="stroke fill" text-anchor="middle" letter-spacing="2">MECÂNICA TIO <tspan rotate="${zr}" dy="${zd}">Z</tspan><tspan dy="${-zd}">É</tspan></text>`; }
  o+=`<g transform="rotate(-3 540 300)"><rect x="150" y="236" width="780" height="96" rx="12" fill="#1f2340"/><text x="540" y="306" font-size="64" fill="#f6c744" text-anchor="middle" stroke="none">30 DIAS PRA SALVAR A OFICINA</text></g>`;
  o+=`<path d="M60,600 H1020 L990,660 H90 Z" fill="#2f6fb3"/>`; for(let k=0;k<12;k++) o+=`<path d="M${90+k*78},660 q39,40 78,0 Z" fill="${k%2?'#2f6fb3':'#fff'}"/>`;
  o+=`<rect x="200" y="660" width="680" height="860" fill="#3b3036"/><rect x="260" y="980" width="34" height="540" fill="#2f6fb3" opacity=".7"/><rect x="786" y="980" width="34" height="540" fill="#2f6fb3" opacity=".7"/>`;
  o+=`<rect x="200" y="660" width="680" height="300" fill="url(#slats)"/><path d="M200,960 H880" stroke-width="10"/><rect x="500" y="954" width="80" height="22" rx="8" fill="#6e7880"/><rect x="186" y="640" width="708" height="34" rx="6" fill="#8d97a0"/><rect x="176" y="640" width="24" height="880" fill="#c98a33"/><rect x="880" y="640" width="24" height="880" fill="#c98a33"/>`;
  o+=`<g transform="rotate(${-5+Math.sin(t*2)*1.5} 105 700)"><rect x="34" y="700" width="150" height="230" fill="#fffaf0"/><text x="109" y="770" font-family="PM" font-size="34" fill="#c8402f" text-anchor="middle" stroke="none">ACEITA</text><text x="109" y="820" font-family="PM" font-size="40" fill="#2f6fb3" text-anchor="middle" stroke="none">PIX</text><text x="109" y="880" font-family="PM" font-size="20" fill="#2b1d16" text-anchor="middle" stroke="none">(quase</text><text x="109" y="906" font-family="PM" font-size="20" fill="#2b1d16" text-anchor="middle" stroke="none">sempre)</text></g>`;
  for(let k=0;k<4;k++){const y=1500-k*70;o+=`<ellipse cx="985" cy="${y}" rx="78" ry="34" fill="#3a3533"/><ellipse cx="985" cy="${y-4}" rx="36" ry="14" fill="#1f1b1a" stroke-width="5"/>`;}
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="url(#walk)" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/><rect x="0" y="1880" width="1080" height="40" fill="#8d8d8d" stroke-width="6"/>`;
  const sh=Math.sin(t*40)*(t>3.2?4:1.2);
  o+=`<g transform="translate(${sh} 0)">${nando({x:540,y:1800,s:.95,face:t>2.6?'choque':'preocupado',hold:'carta'})}</g>`;
  o+=ono('CRAC!',820,700,t,2.3,'#f6c744',10,100);
  o+=tag('NANDO, 28',300,1000,t,.5,430,1080);
  return cam(o,t,dur,1.0,1.06,540,1100)+hud(30,87400);
};
SH.flashback=(t,dur)=>{
  let f=interior({wall:'#f3e6c4'});
  f+=`<rect x="760" y="300" width="230" height="290" rx="6" fill="#7a4a28"/><rect x="778" y="318" width="194" height="254" fill="#fffaf0" stroke-width="5"/><text x="875" y="380" font-size="34" fill="#e0483a" text-anchor="middle" stroke="none">AUTO PEÇAS</text><circle cx="875" cy="470" r="50" fill="#3a3a3a" stroke-width="6"/><circle cx="875" cy="470" r="20" fill="#9a9a9a" stroke-width="4"/>`;
  f+=`<rect x="90" y="380" width="460" height="22" fill="#b97a45"/>`;
  [['#2f9e6e',140],['#e0483a',220],['#f2c230',300],['#2f6fb3',380],['#7a3f9e',460]].forEach(([c,x])=>f+=`<rect x="${x-26}" y="290" width="52" height="90" rx="8" fill="${c}"/><rect x="${x-12}" y="274" width="24" height="18" rx="4" fill="#d9d9d9" stroke-width="5"/>`);
  f+=carroVelho({x:560,y:1560,s:1.25,color:'#c8402f'});
  f+=tioZe({x:330,y:1820,s:.82,age:'jovem',face:'feliz',pose:'baixo'});
  const jump=Math.abs(Math.sin(t*5))*18;
  f+=`<g transform="translate(0 ${-jump})">${nandoKid({x:780,y:1840,s:.78,face:'feliz'})}</g>`;
  let o=`<g filter="url(#sepia)">${cam(f,t,dur,1.04,1.0)}</g>`;
  // grão de filme
  let seed=Math.floor(t*12); for(let i=0;i<60;i++){seed=(seed*9301+49297)%233280;const x=seed%1080;seed=(seed*9301+49297)%233280;const y=seed%1920;o+=`<circle cx="${x}" cy="${y}" r="2" fill="#fff" opacity=".35" stroke="none"/>`;}
  o+=`<rect width="1080" height="1920" fill="url(#vig)" stroke="none"/>`;
  const st=pop(t,.5); o+=`<g transform="translate(860 300) scale(${st}) rotate(-6) translate(-860 -300)"><rect x="740" y="250" width="240" height="90" rx="10" fill="none" stroke="#c8402f" stroke-width="8"/><text x="860" y="318" font-size="64" fill="#c8402f" text-anchor="middle" stroke="none">1996</text></g>`;
  o+=tag('PAI',330,880,t,1.0,330,980)+tag('NANDINHO',780,1060,t,1.6,780,1140);
  return o+hud(30,87400);
};
SH.callcenter=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#c9ced3" stroke="none"/>`;
  for(let x=0;x<1080;x+=180) o+=`<rect x="${x+20}" y="230" width="140" height="40" rx="6" fill="${Math.floor(t*8)%7===2&&x===360?'#c9d2d6':'#eef4f7'}" stroke-width="4"/>`;
  o+=`<rect x="0" y="1150" width="1080" height="770" fill="#8d959c" stroke="none"/><path d="M0,1150 H1080" stroke-width="7"/><rect x="40" y="620" width="1000" height="540" fill="#7e8a95"/>`;
  for(let x=60;x<1040;x+=60) o+=`<path d="M${x},640 v500" stroke="#6f7a84" stroke-width="3"/>`;
  o+=`<g transform="rotate(4 220 760)"><rect x="150" y="700" width="140" height="140" fill="#f6e36a" stroke-width="4"/><text x="220" y="760" font-family="PM" font-size="26" fill="#2b1d16" text-anchor="middle" stroke="none">META:</text><text x="220" y="800" font-family="PM" font-size="30" fill="#c8402f" text-anchor="middle" stroke="none">200</text><text x="220" y="828" font-family="PM" font-size="18" fill="#2b1d16" text-anchor="middle" stroke="none">ligações</text></g>`;
  o+=`<g transform="rotate(-5 860 740)"><rect x="790" y="680" width="140" height="140" fill="#9be3f0" stroke-width="4"/><text x="860" y="750" font-family="PM" font-size="24" fill="#2b1d16" text-anchor="middle" stroke="none">SORRIA</text><text x="860" y="790" font-family="PM" font-size="34" fill="#2b1d16" text-anchor="middle" stroke="none">:)</text></g>`;
  o+=`<rect x="0" y="1290" width="1080" height="60" fill="#5f6870"/>`;
  const slump=ease(t/dur)*40;
  o+=`<g transform="translate(0 ${slump})">`+nando({x:540,y:1990,s:1.05,face:'preocupado',hold:null});
  o+=`<g stroke="#2b1d16"><path d="M400,1040 Q410,790 540,786 Q670,790 680,1040" fill="none" stroke-width="22"/><path d="M400,1040 Q410,790 540,786 Q670,790 680,1040" fill="none" stroke="#3a3a3a" stroke-width="12"/><rect x="378" y="990" width="48" height="96" rx="18" fill="#3a3a3a" stroke-width="6"/><rect x="654" y="990" width="48" height="96" rx="18" fill="#3a3a3a" stroke-width="6"/><path d="M402,1080 Q420,1150 500,1146" fill="none" stroke-width="8"/><circle cx="508" cy="1146" r="14" fill="#3a3a3a" stroke-width="5"/></g></g>`;
  o+=`<rect x="0" y="1350" width="1080" height="80" fill="#b9a68a"/><rect x="0" y="1430" width="1080" height="490" fill="#9c8a70" stroke="none"/>`;
  const fila=Math.round(47+52*ease(t/dur));
  o+=`<rect x="700" y="1150" width="320" height="210" rx="12" fill="#3a3f45"/><rect x="718" y="1168" width="284" height="170" rx="6" fill="${fila>90?'#e0483a':'#6fa8dc'}" stroke-width="4"/><text x="860" y="1272" font-size="56" fill="#fff" text-anchor="middle" stroke="none">FILA: ${fila}</text><rect x="840" y="1360" width="40" height="40" fill="#3a3f45" stroke-width="5"/>`;
  o+=`<rect x="80" y="1260" width="160" height="100" rx="8" fill="#f2efe6"/><path d="M180,1280 q30,6 0,40" fill="none" stroke-width="6"/><text x="160" y="1325" font-size="26" fill="#2f6fb3" text-anchor="middle" stroke="none">SEG.</text>`;
  // ícone de telefone a tocar
  if(Math.floor(t*6)%2===0) o+=`<g transform="translate(940 560) rotate(${Math.sin(t*50)*12})"><circle r="56" fill="#e0483a"/><path d="M-22,-18 q10,-10 18,0 l-6,10 q8,14 20,20 l10,-6 q10,8 0,18 q-40,10 -42,-42 Z" fill="#fff" stroke-width="4"/></g>`;
  o+=ono('TRIIIM!',860,470,t,.3,'#fff',8,90)+ono('TRIIIM!',220,1000,t,1.6,'#fff',-8,90);
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.praia=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#8fd6f5" stroke="none"/><circle cx="860" cy="420" r="90" fill="#ffe27a" stroke="none"/>`;
  o+=`<path d="M${120+t*12},380 q20,-40 70,-30 q30,-40 80,-10 q50,-6 50,40 h-200 Z" fill="#fff" stroke="none" opacity=".9"/>`;
  const wv=(t*60)%120;
  o+=`<rect x="0" y="900" width="1080" height="320" fill="#2fa3d6"/><g transform="translate(${-wv} 0)"><path d="M0,950 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/><path d="M0,1060 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/></g>`;
  o+=`<path d="M0,1220 Q540,1160 1080,1220 V1920 H0 Z" fill="#f6dc9a"/>`;
  for(let i=0;i<40;i++) o+=`<circle cx="${(i*97)%1080}" cy="${1300+(i*53)%600}" r="4" fill="#e3c47a" stroke="none"/>`;
  o+=`<path d="M200,1600 L330,820" stroke-width="14"/><path d="M60,900 Q330,640 600,860 Q330,780 60,900 Z" fill="#e0483a"/><path d="M200,820 Q330,700 470,800" fill="none" stroke="#fff" stroke-width="30" opacity=".8"/>`;
  o+=`<path d="M720,1600 L800,1380 H990 L940,1600 M760,1520 H960" fill="none" stroke-width="12"/><path d="M790,1400 L960,1400 L930,1560 L760,1560 Z" fill="#2fb36e" stroke-width="6"/><rect x="80" y="1610" width="160" height="110" rx="12" fill="#2f6fb3"/><rect x="80" y="1610" width="160" height="34" rx="10" fill="#fff"/>`;
  // gaivota
  const gx=(t*140)%1300-100; o+=`<path d="M${gx},560 q20,-20 40,0 q20,-20 40,0" fill="none" stroke-width="6"/>`;
  const sway=Math.sin(t*4)*3;
  o+=`<g transform="rotate(${sway} 540 1820)">${tioZe({x:540,y:1820,s:.95,age:'velho',face:'feliz',pose:'acena'})}</g>`;
  // áudio do WhatsApp (parte opcional, a partir de 4 s)
  if(t>4){const k=pop(t,4);o+=`<g transform="translate(540 1420) scale(${k}) translate(-540 -1420)"><rect x="150" y="1360" width="780" height="130" rx="40" fill="#dcf8c6"/><circle cx="230" cy="1425" r="40" fill="#25d366"/><path d="M218,1405 v40 l34,-20 Z" fill="#fff" stroke="none"/>`;
    for(let i=0;i<22;i++){const h=10+Math.abs(Math.sin(i*1.7+t*8))*34;o+=`<rect x="${300+i*24}" y="${1425-h/2}" width="12" height="${h}" rx="6" fill="#4a8f5a" stroke="none"/>`;}
    o+=`<text x="890" y="1470" font-size="26" fill="#6b8f6b" text-anchor="end" stroke="none">0:04</text></g>`;}
  o+=tag('PAI, 62',760,760,t,.6,640,860)+ono('SLURP',840,1060,t,2.2,'#f6c744',10,80);
  return cam(o,t,dur,1.0,1.05)+hud(30,87400);
};
SH.lista=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a0683a" stroke="none"/>`;
  for(let y=0;y<1920;y+=110) o+=`<path d="M0,${y} H1080" stroke="#8a5530" stroke-width="5"/>`;
  const unroll=ease(t/0.8);
  o+=`<defs><clipPath id="roll"><rect x="0" y="0" width="1080" height="${300+1700*unroll}"/></clipPath></defs>`;
  o+=`<g clip-path="url(#roll)"><g transform="rotate(-3 540 1100)"><rect x="160" y="300" width="760" height="1700" fill="#fffaf0"/>`;
  for(let y=420;y<2000;y+=70) o+=`<path d="M200,${y} H880" stroke="#c7dbe8" stroke-width="3"/>`;
  o+=`<path d="M260,300 V2000" stroke="#eaa3a3" stroke-width="3"/><text x="540" y="400" font-size="60" fill="#2b1d16" text-anchor="middle" stroke="none">DÍVIDAS DO TIO ZÉ</text>`;
  const items=[['Banco','R$ 61.000'],['Peças fiado (2019)','R$ 9.800'],['Luz atrasada','R$ 4.200'],['Aluguel do galpão','R$ 7.600'],['Elevador (parcelas)','R$ 3.900'],['Juros','R$ 900']];
  items.forEach(([a,b],i)=>{const tt=.6+i*.28; if(t<tt) return; const y=480+i*90; o+=`<text x="290" y="${y}" font-family="PM" font-size="40" fill="#1f3f77" stroke="none">${a}</text><text x="860" y="${y}" font-family="PM" font-size="40" fill="#c8402f" text-anchor="end" stroke="none">${b}</text>`;});
  if(t>2.3){const tot=Math.round(87400*ease((t-2.3)/.6)); o+=`<path d="M290,1050 H860" stroke-width="6"/><text x="290" y="1130" font-size="64" fill="#2b1d16" stroke="none">TOTAL</text><text x="860" y="1130" font-size="72" fill="#c8402f" text-anchor="end" stroke="none">R$ ${tot.toLocaleString('pt-BR')}</text>`;}
  o+=`</g></g>`;
  if(t>3.0){const k=1+1.5*(1-ease((t-3.0)/.18)); o+=`<g transform="translate(600 1290) scale(${k}) rotate(-14) translate(-600 -1290)"><rect x="380" y="1220" width="440" height="140" rx="12" fill="none" stroke="#c8402f" stroke-width="10"/><text x="600" y="1320" font-size="76" fill="#c8402f" text-anchor="middle" stroke="none">VENCE EM 30 DIAS</text></g>`;}
  return o+hudAnim(1,30,87400,t>3.0&&t<3.4?8:0);
};
SH.corsa=(t,dur)=>{
  let o=interior({});
  o+=`<text x="540" y="420" font-size="110" fill="#e4c48e" text-anchor="middle" stroke="none">MECÂNICA TIO ZÉ</text>`;
  for(const px of [110,900]) o+=`<rect x="${px}" y="560" width="80" height="1060" rx="6" fill="#2f6fb3"/><rect x="${px+14}" y="600" width="14" height="980" fill="#245a92" stroke="none"/><rect x="${px-20}" y="1610" width="120" height="30" rx="4" fill="#245a92"/>`;
  o+=`<rect x="190" y="1010" width="710" height="28" fill="#f2c230"/>`;
  o+=corsa({x:545,y:1040,s:1.25,dusty:true});
  o+=`<path d="M190,700 L360,880 M190,760 L320,900 M190,700 Q240,780 210,860" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/><path d="M900,720 L760,860 M900,780 L800,880" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>`;
  const sy=700+Math.sin(t*1.5)*60+60; o+=`<path d="M300,560 V${sy}" stroke="#fff" stroke-width="2"/><circle cx="300" cy="${sy+8}" r="10" fill="#2b1d16" stroke="none"/>`;
  const sw=Math.sin(t*3)*8;
  o+=`<path d="M560,1050 v70" stroke-width="5"/><g transform="rotate(${-7+sw} 560 1060)"><rect x="390" y="1120" width="340" height="150" rx="12" fill="#fffaf0"/><text x="560" y="1180" font-size="40" fill="#2b1d16" text-anchor="middle" stroke="none">PEÇA ENCOMENDADA</text><text x="560" y="1250" font-size="64" fill="#e0483a" text-anchor="middle" stroke="none">2019</text></g>`;
  for(let i=0;i<14;i++){const x=(i*83)%1080, y=(i*131+t*80)%1400+300;o+=`<circle cx="${x}" cy="${y}" r="3" fill="#efe3c6" stroke="none" opacity=".7"/>`;}
  o+=`<path d="M440,1660 h220 l-20,30 h-180 Z" fill="#4a4048"/>`;
  o+=ono('CRÉÉÉC',300,560,t,.8,'#fff',-10,90);
  return cam(o,t,dur,1.0,1.06,545,1000)+hud(30,87400);
};
SH.armando=(t,dur)=>{
  let o=interior({});
  o+=`<rect x="0" y="1010" width="1080" height="70" fill="#b97a45"/><rect x="0" y="1080" width="1080" height="390" fill="#9a6034" stroke="none"/><path d="M0,1080 H1080" stroke-width="6"/>`;
  for(const x of [60,330,600,870]) o+=`<rect x="${x}" y="1110" width="220" height="330" rx="8" fill="#a86a3c" stroke-width="5"/>`;
  const blink=Math.floor(t*4)%2===0;
  o+=`<rect x="760" y="880" width="240" height="130" rx="10" fill="#7a7f86"/><rect x="780" y="900" width="200" height="50" rx="6" fill="#1f2a1f" stroke-width="4"/><text x="880" y="938" font-size="34" fill="${blink?'#5fe08a':'#2e6b42'}" text-anchor="middle" stroke="none">R$ 0,00</text>`;
  o+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*3))*8})">${armando({x:300,y:1840,s:.92,face:'feliz'})}</g>`;
  o+=nando({x:820,y:1890,s:.78,face:t>2.2?'choque':'normal',hold:null,pose:t>2.2?'cabeca':'normal'});
  o+=tag('SEU ARMANDO, 70',300,800,t,.3,300,880)+ono('PLIM!',880,840,t,2.2,'#5fe08a',8,80);
  if(t>1.2){const k=pop(t,1.2);o+=`<g transform="translate(540 600) scale(${k}) translate(-540 -600)"><g transform="rotate(-6 540 600)"><rect x="350" y="530" width="380" height="120" rx="60" fill="#fff"/><text x="540" y="612" font-family="PM" font-size="44" fill="#2b1d16" text-anchor="middle" stroke="none">Põe na conta!</text></g><path d="M400,640 l-40,90 l90,-70" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.speedfix=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="420" width="1040" height="1100" fill="#eef3f7"/><rect x="0" y="400" width="1080" height="40" fill="#1f6fd6"/>`;
  const on=t>.4 && !(t>.6&&t<.75) && !(t>.9&&t<1.0);
  o+=`<rect x="80" y="480" width="920" height="200" rx="30" fill="#10233c"/>`;
  o+=`<g ${on?'filter="url(#glow)"':''} stroke="none" opacity="${on?1:.25}"><text x="540" y="630" font-size="140" fill="#49f2ff" text-anchor="middle">SPEEDFIX</text><path d="M150,520 l-34,60 h28 l-18,50 l52,-70 h-28 l20,-40 Z" fill="#ffe14a"/><path d="M930,520 l-34,60 h28 l-18,50 l52,-70 h-28 l20,-40 Z" fill="#ffe14a"/></g>`;
  o+=`<rect x="390" y="700" width="300" height="56" rx="28" fill="#ffe14a"/><text x="540" y="742" font-size="40" fill="#10233c" text-anchor="middle" stroke="none" letter-spacing="6">EXPRESS</text>`;
  for(let k=0;k<3;k++){const x=60+k*330; o+=`<rect x="${x}" y="800" width="300" height="720" fill="#7fd0f0"/><path d="M${x+30},830 h120 M${x+30},860 h80" stroke="#fff" stroke-width="8" opacity=".7"/>`;}
  o+=`<rect x="880" y="840" width="120" height="200" rx="14" fill="#10233c"/><rect x="896" y="860" width="88" height="120" rx="8" fill="#49f2ff" stroke-width="4"/><text x="940" y="910" font-size="24" fill="#10233c" text-anchor="middle" stroke="none">CHECK-IN</text><text x="940" y="946" font-size="24" fill="#10233c" text-anchor="middle" stroke="none">NO APP</text>`;
  const a=Math.sin(t*7)*12, b=Math.sin(t*9+1)*30;
  o+=`<g transform="rotate(${a} 180 1500)"><path d="M160,1500 V1010 Q160,980 180,980 Q200,980 200,1010 V1500 Z" fill="#ff5a3c"/><circle cx="180" cy="960" r="34" fill="#ff5a3c"/><circle cx="168" cy="952" r="6" fill="#2b1d16" stroke="none"/><circle cx="192" cy="952" r="6" fill="#2b1d16" stroke="none"/><path d="M166,972 q14,12 28,0" fill="none" stroke-width="5"/>
  <g transform="rotate(${b} 164 1060)"><path d="M164,1060 Q100,1010 90,920" fill="none" stroke="#2b1d16" stroke-width="40"/><path d="M164,1060 Q100,1010 90,920" fill="none" stroke="#ff5a3c" stroke-width="28"/></g>
  <g transform="rotate(${-b} 198 1070)"><path d="M198,1070 Q270,1110 300,1020" fill="none" stroke="#2b1d16" stroke-width="40"/><path d="M198,1070 Q270,1110 300,1020" fill="none" stroke="#ff5a3c" stroke-width="28"/></g></g>`;
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="#3d3a42" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/><path d="M0,1760 h1080" stroke="#f2c230" stroke-width="10" stroke-dasharray="90 60"/>`;
  const car=(x,c)=>`<g><path d="M${x},1700 v-60 q0,-24 28,-28 l36,-4 q24,-46 70,-50 h78 q40,4 60,50 l24,4 q24,4 24,28 v60 Z" fill="${c}"/><path d="M${x+74},1612 q20,-34 56,-38 h34 v38 Z M${x+180},1612 v-38 h24 q28,4 46,38 Z" fill="#bfe3ea" stroke-width="5"/><circle cx="${x+70}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/><circle cx="${x+230}" cy="1702" r="26" fill="#2a2522" stroke-width="6"/></g>`;
  const dx=-ease(t/dur)*60; o+=`<g transform="translate(${dx} 0)">${car(40,'#f2c230')+car(390,'#ef4f6b')+car(740,'#5fd17c')}</g>`;
  o+=ono('BZZT',900,450,t,.4,'#49f2ff',10,80)+ono('BI-BI!',800,1480,t,2.0,'#f6c744',-6,90);
  return cam(o,t,dur,1.0,1.04)+hud(30,87400);
};
SH.lonas=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" stroke="none" opacity=".28"/>`;
  const sw=Math.sin(t*2)*10;
  o+=`<g transform="rotate(${sw} 540 0)"><path d="M540,0 V230" stroke-width="5"/><rect x="526" y="230" width="28" height="30" rx="4" fill="#4a4048"/><path d="M520,260 q20,60 40,0 Z" fill="#b8c2c7"/></g>`;
  const sk=(x0,x1,yb)=>{let h='';for(let x=x1;x>x0;x-=46)h+=`Q${x-23},${yb+10} ${Math.max(x0,x-46)},${yb} `;return h;};
  o+=`<path d="M40,1330 L42,1260 Q46,1230 84,1222 Q134,1212 166,1180 Q214,1096 284,1088 Q364,1086 410,1140 Q454,1190 468,1250 L470,1330 ${sk(40,470,1330)} Z" fill="#9a915c"/>`;
  o+=`<path d="M580,1340 L582,1262 Q586,1236 620,1232 L702,1226 Q730,1170 762,1140 L900,1138 Q930,1170 952,1220 L1016,1226 Q1044,1232 1046,1262 L1048,1340 ${sk(580,1048,1340)} Z" fill="#9a915c"/>`;
  o+=`<path d="M60,1640 L62,1540 Q66,1500 120,1492 L440,1474 Q510,1468 556,1414 Q600,1356 680,1350 L780,1350 Q836,1354 904,1414 Q984,1472 1040,1484 L1060,1500 L1060,1640 ${sk(60,1060,1640)} Z" fill="#b0a66b"/>`;
  for(const [a,b,c2,dd] of [[200,1490,190,1640],[380,1478,390,1640],[620,1390,630,1640],[800,1352,810,1640],[960,1460,970,1640]]) o+=`<path d="M${a},${b} Q${a+12},${(b+dd)/2} ${c2},${dd}" fill="none" stroke="#6b6440" stroke-width="5"/>`;
  o+=`<path d="M120,1496 L440,1478 Q510,1472 558,1418 Q600,1360 680,1354 L780,1354" fill="none" stroke="#e0d79f" stroke-width="7" opacity=".8"/>`;
  const growl=t>2.2; const shake=growl?Math.sin(t*70)*4:0;
  o+=`<g transform="translate(${shake} 0)">${turbo({x:700,y:1880,s:.72,mood:growl?'rosna':'calmo'})}</g>`;
  if(growl){const k=pop(t,2.2);o+=`<g transform="translate(330 1740) scale(${k}) translate(-330 -1740)"><g font-size="70" fill="#f6c744" stroke="#2b1d16" stroke-width="10" paint-order="stroke fill"><text x="300" y="1760" transform="rotate(-10 300 1760)">GRRR</text></g></g>`;}
  o+=ono('?',250,1060,t,.8,'#fff',-10,140)+ono('?',820,1080,t,1.2,'#fff',10,140)+ono('?',560,1300,t,1.6,'#f6c744',0,160);
  return cam(o,t,dur,1.0,1.05,540,1300)+hud(30,87400);
};
SH.votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f6fb3" stroke="none"/><rect x="540" width="540" height="1920" fill="#2fa36e" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 300) scale(${bk}) rotate(-3) translate(-540 -300)"><rect x="150" y="240" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="320" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="520" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">CORSA</text><text x="270" y="580" font-size="36" fill="#cfe3ff" text-anchor="middle" stroke="none">vender as peças do Corsa</text>${corsa({x:270,y:900,s:.62,dusty:true})}<rect x="70" y="910" width="400" height="20" fill="#f2c230"/></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="520" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">FAXINA</text><text x="810" y="580" font-size="36" fill="#d4f5e2" text-anchor="middle" stroke="none">arrumar a oficina</text>`;
  // vassoura e balde
  o+=`<g transform="rotate(${-18+Math.sin(t*6)*8} 760 900)"><path d="M760,900 L840,640" stroke-width="20"/><path d="M760,900 L840,640" stroke="#b97a45" stroke-width="10"/><path d="M700,880 L800,910 L790,960 L680,930 Z" fill="#f2c230"/><path d="M700,930 l-10,40 M725,936 l-8,42 M750,942 l-6,42 M775,948 l-4,40" stroke-width="5"/></g>`;
  o+=`<path d="M860,780 L960,780 L944,900 L876,900 Z" fill="#2f6fb3"/><path d="M864,780 q46,-60 92,0" fill="none" stroke-width="6"/><ellipse cx="910" cy="780" rx="50" ry="12" fill="#9fdcf2"/>`;
  for(let k=0;k<3;k++){const bt=(t*1.5+k*.33)%1; o+=`<circle cx="${880+k*30}" cy="${770-bt*90}" r="${10-bt*6}" fill="#fff" opacity="${1-bt}" stroke-width="3"/>`;}
  o+=`</g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 760) scale(${xp}) translate(-540 -760)"><circle cx="540" cy="760" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="790" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 1900)">${nando({x:540,y:1900,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud(30,87400);
};
const DEFS=()=>sepiaDefs()+`<pattern id="slats" width="40" height="34" patternUnits="userSpaceOnUse"><rect width="40" height="34" fill="#9aa3a8"/><rect width="40" height="10" fill="#b7c0c4"/><rect y="28" width="40" height="6" fill="#7b858b"/></pattern>
<pattern id="walk" width="120" height="80" patternUnits="userSpaceOnUse"><rect width="120" height="80" fill="#cfcfcf"/><path d="M0,0 H120 M0,0 V80" stroke="#b3b3b3" stroke-width="5"/></pattern>
<filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
function buildShot(name,t,dur){
  window.__carta=window.__carta||'';
  return `<defs>${DEFS()}</defs><g stroke="#2b1d16" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" font-family="A">${SH[name](t,dur)}</g>`;
}
