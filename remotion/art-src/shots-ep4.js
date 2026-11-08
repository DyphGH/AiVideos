// ===== Episódio 4 (Dia 4): "O vídeo" — gravar + a lona aparece + influencer =====
const D4=27;
function hud5(div,cli,t=1,cliPop=-1){
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `${hud(D4,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// cartão estático (já visível no frame 0)
function cartaoEp(n,titulo,y=380){return `<g transform="translate(540 ${y}) rotate(-3)"><rect x="-400" y="-110" width="800" height="210" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="12"/><text x="0" y="-22" font-size="62" fill="#f6c744" text-anchor="middle" stroke="none">EPISÓDIO ${n}</text><text x="0" y="70" font-size="96" fill="#fff" text-anchor="middle" stroke="none">${titulo}</text></g>`;}
// moldura de telemóvel a gravar, com contador de views
function camRec(inner,t,views,col='#1d1d24'){
  let o=`<rect x="110" y="330" width="860" height="1520" rx="70" fill="${col}"/><clipPath id="cr"><rect x="140" y="360" width="800" height="1460" rx="48"/></clipPath><g clip-path="url(#cr)">${inner}</g>`;
  o+=`<circle cx="200" cy="420" r="18" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="230" y="436" font-size="44" fill="#fff" stroke="#1b1420" stroke-width="8" paint-order="stroke fill">REC</text>`;
  if(views!=null) o+=`<g transform="translate(700 425)"><rect x="-190" y="-40" width="380" height="80" rx="40" fill="#000" opacity=".6" stroke="none"/><text x="0" y="18" font-size="50" fill="#fff" text-anchor="middle" stroke="none">${views} VIEWS</text></g>`;
  return o;
}
// carro tapado com lona (forma do coupé) + farol a espreitar
function lonaCarro(x,y,s,farol=false,t=0){
  const sk=(x0,x1,yb)=>{let h='';for(let xx=x1;xx>x0;xx-=46)h+=`Q${xx-23},${yb+10} ${Math.max(x0,xx-46)},${yb} `;return h;};
  let o=`<path d="M60,1640 L62,1540 Q66,1500 120,1492 L440,1474 Q510,1468 556,1414 Q600,1356 680,1350 L780,1350 Q836,1354 904,1414 Q984,1472 1040,1484 L1060,1500 L1060,1640 ${sk(60,1060,1640)} Z" fill="#b0a66b"/>`;
  for(const [a,b,c2,dd] of [[200,1490,190,1640],[380,1478,390,1640],[620,1390,630,1640],[800,1352,810,1640],[960,1460,970,1640]]) o+=`<path d="M${a},${b} Q${a+12},${(b+dd)/2} ${c2},${dd}" fill="none" stroke="#6b6440" stroke-width="5"/>`;
  if(farol){ o+=`<path d="M60,1560 Q110,1520 170,1540 L170,1640 L60,1640 Z" fill="#8a8256"/><circle cx="120" cy="1590" r="34" fill="#fff6c4" stroke-width="8"/><circle cx="120" cy="1590" r="16" fill="#fff" stroke="none" opacity="${.6+.4*Math.sin(t*6)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-560 -1500)">${o}</g>`;
}

// 1 · Abertura: frame 0 já cheio
SH.d4abre=(t,dur)=>{
  let o=caraNando(t,'contente','#7a3f9e','',0,'#fff',2.5);
  o+=cartaoEp(4,'O VÍDEO',420);
  o+=`<g transform="translate(540 1480) rotate(4)"><rect x="-430" y="-90" width="860" height="170" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="30" font-size="96" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS: GRAVAR!</text></g>`;
  return o+hud5(87050,6);
};
// 2 · Votos: barra de 3 + cartões
SH.d4votos=(t,dur)=>{
  let o=fundoEscuro(t);
  o+=`<g transform="translate(540 370) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="84" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text></g>`;
  const f=ease(t/.8), bw=900; const g=bw*.5*f, d=bw*.33*f;
  o+=`<rect x="90" y="490" width="${bw}" height="120" rx="60" fill="#3a3f45" stroke="#1b1420" stroke-width="8"/><rect x="90" y="490" width="${g+d+bw*.17*f}" height="120" rx="60" fill="#c8402f" stroke="none"/><rect x="90" y="490" width="${g+d}" height="120" rx="60" fill="#e08a2f" stroke="none"/><rect x="90" y="490" width="${Math.max(120,g)}" height="120" rx="60" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/>`;
  o+=`<text x="120" y="572" font-size="56" fill="#fff" stroke="none">GRAVAR ${Math.round(50*f)}%</text><text x="${90+g+d/2}" y="572" font-size="40" fill="#fff" text-anchor="middle" stroke="none">OS DOIS</text><text x="${90+g+d+bw*.085}" y="572" font-size="34" fill="#fff" text-anchor="middle" stroke="none">17%</text>`;
  o+=cartao3d(540,800,'_ricard0_silva_','Gravar vai dar bom','#7a3f9e',t,.4,{rot:-4});
  o+=cartao3d(540,1020,'hei7zin_crx_','Gravar, para ficar famoso','#2f6fb3',t,1.0,{rot:3,w:900});
  o+=cartao3d(540,1240,'_gabbszin','Pode gravar amigao','#e08a2f',t,1.6,{rot:-3});
  return o+hud5(87050,6);
};
// 3 · A ideia do sntz_
SH.d4ideia=(t,dur)=>{
  if(t>2.3){ let o=interior({}); o+=nando({x:300,y:1920,s:.74,face:'normal',hold:null,pose:'normal'});
    o+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*8))*30})">${rubinho({x:780,y:1900,s:.78,face:'feliz',pose:'filma'})}</g>`;
    o+=ono('GÊNIO!',780,760,t,2.35,'#f6c744',8,170); return o+hud5(87050,6); }
  let o=fundoEscuro(t,'#1e1424');
  o+=`<g transform="translate(540 470) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">MAS UM DE VOCÊS</text><text x="0" y="74" font-size="70" fill="#2f9e6e" text-anchor="middle" stroke="none">DEU A MELHOR IDEIA</text></g>`;
  o+=cartao3d(540,900,'sntz_','os dois, grava ele trabalhando','#2f9e6e',t,.4,{rot:3,w:960});
  return o+hud5(87050,6);
};
// 4 · 1.ª tentativa: dança
SH.d4danca=(t,dur)=>{
  let in_=interior({}); const fall=t>2.6;
  const r=fall?ease((t-2.6)/.3)*80:Math.sin(t*9)*18, j=fall?0:Math.abs(Math.sin(t*9))*40;
  in_+=`<g transform="translate(0 ${-j}) rotate(${r} 540 1880)">${nando({x:540,y:1880,s:.78,face:fall?'choque':'contente',hold:null,pose:'vitoria'})}</g>`;
  in_+=turbo({x:fall?760:900,y:1890,s:.45,mood:'calmo'});
  if(fall) in_+=ono('TOMBO!',540,1100,t,2.65,'#fff',-8,140);
  let o=`<rect width="1080" height="1920" fill="#2f6fb3" stroke="none"/>`+camRec(in_,t,fall?'32':'0');
  return o+tentativa(1,t,'#f6c744')+hud5(87050,6);
};
// 5 · 2.ª tentativa: desafio do Turbo
SH.d4turbo=(t,dur)=>{
  let in_=interior({}); const p=(t*.45)%1;
  const tx=1200-p*1600, nx=tx+520;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*14))*20})">${turbo({x:tx,y:1880,s:.5,mood:'calmo'})}</g>`;
  in_+=`<g transform="rotate(-30 ${tx-200} 1640)"><rect x="${tx-215}" y="1600" width="22" height="120" rx="8" fill="#c9d1d6" stroke-width="5"/></g>`;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*12))*25})">${nando({x:nx,y:1900,s:.66,face:'choque',hold:null,pose:'normal'})}</g>`;
  in_+=ono('VOLTA AQUI!',540,1100,t,.6,'#fff',-6,110);
  let o=`<rect width="1080" height="1920" fill="#e08a2f" stroke="none"/>`+camRec(in_,t,'140');
  return o+tentativa(2,t,'#5fe08a')+hud5(87050,6);
};
// 6 · 3.ª tentativa: a ideia do sntz_ — o Uno do Seu Armando; views a disparar; a lona aparece ao fundo
SH.d4uno=(t,dur)=>{
  let in_=interior({});
  in_+=lonaCarro(830,1380,.46,true,t);
  in_+=carroVelho({x:470,y:1560,s:1.0,color:'#e8e2d0'});
  if(t<2.4) for(let i=0;i<5;i++){const p=((t*.9)+i/5)%1;in_+=`<circle cx="${430+Math.sin(i)*30}" cy="${1300-p*360}" r="${30+p*70}" fill="#9a9aa3" stroke="#6b6b73" stroke-width="5" opacity="${1-p}"/>`;}
  in_+=nando({x:250,y:1920,s:.62,face:t<2.4?'choque':'contente',hold:'chave',pose:'normal'});
  if(t>2.4){ for(let i=0;i<6;i++){const a=i+t*20;in_+=`<path d="M560,1420 l${Math.cos(a)*60},${Math.sin(a)*60}" stroke="#f6c744" stroke-width="7"/>`;} in_+=ono('TEC TEC',650,1240,t,2.4,'#fff',6,90); }
  const v=t<3.2?'0':Math.round(48000*ease((t-3.2)/2.2)).toLocaleString('pt-BR');
  let o=`<rect width="1080" height="1920" fill="#2f9e6e" stroke="none"/>`+camRec(in_,t,v);
  if(t<2.4) o+=ono('FUMAÇA NO PORTA-LUVAS?!',540,900,t,.3,'#fff',-4,72);
  if(t>5.2){const k=pop(t,5.2);o+=`<g transform="translate(540 1000) scale(${k}) rotate(-5)"><rect x="-380" y="-80" width="760" height="150" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="88" fill="#1b1420" text-anchor="middle" stroke="none">ASMR MECÂNICO</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud5(87050,6);
};
// 7 · Progresso: agendamentos
SH.d4clientes=(t,dur)=>{
  let o=raios('#2f9e6e',t,1000,.08);
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#ece5dd" stroke="none"/>`;
  o+=`<path d="M180,460 Q180,410 228,410 H852 Q900,410 900,460 V540 H180 Z" fill="#075e54" stroke="none"/><text x="540" y="492" font-size="40" fill="#fff" text-anchor="middle" stroke="none">WHATSAPP · OFICINA</text>`;
  const msgs=[['Vi o vídeo! Tem horário amanhã?','R$ 280'],['Faz revisão? Vi no insta kkk','R$ 350'],['Meu carro faz o barulho do Uno','R$ 180'],['Freio + óleo, quanto fica?','R$ 340']];
  let cli=6,ganho=0;
  msgs.forEach(([m,v],i)=>{const t0=.3+i*.7; if(t<t0) return; cli++; ganho+=parseInt(v.replace(/\D/g,''));
    const k=pop(t,t0,.2), y=600+i*200; o+=`<g transform="translate(200 ${y}) scale(${k}) translate(-200 ${-y})"><rect x="200" y="${y}" width="660" height="150" rx="22" fill="#fff" stroke="#b9b2a2" stroke-width="3"/><text x="230" y="${y+62}" font-family="PM" font-size="36" fill="#1b1420" stroke="none">${m}</text><text x="830" y="${y+122}" font-size="44" fill="#2f9e6e" text-anchor="end" stroke="none">${v}</text></g>`;});
  if(t>3.3){const k=pop(t,3.3);o+=`<g transform="translate(540 1500) scale(${k}) rotate(-4)"><rect x="-380" y="-110" width="760" height="220" rx="24" fill="#fffaf0" stroke="#1b1420" stroke-width="8"/><text x="0" y="-20" font-family="PM" font-size="46" fill="#1b1420" text-anchor="middle" stroke="none">Seu Armando: R$ 60</text><text x="0" y="56" font-family="PM" font-size="46" fill="#c8402f" text-anchor="middle" stroke="none">+ uma dúzia de ovos</text></g>`; ganho+=60; }
  const div=87050-ganho;
  if(t>3.9) o+=ono('+R$ 1.210',540,340,t,3.9,'#5fe08a',-5,120);
  return o+hud5(div,cli,t,.3);
};
// 8 · A lona: comentários + Nando curioso
SH.d4lona=(t,dur)=>{
  if(t>3.4){ let o=caraNando(t-3.4,'normal','#3a2a4a','HMMM…',.05,'#f6c744',2.6); for(const [x,y,d] of [[180,700,0],[900,620,.2],[860,1000,.4]]) o+=ono('?',x,y,t,3.5+d,'#fff',0,150); return o+hud5(85840,10); }
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  const z=1+ease(t/1.2)*.9;
  in_=`<g transform="translate(540 1560) scale(${z}) translate(-560 -1450)">${in_}${lonaCarro(560,1400,.9,true,t)}</g>`;
  let o=`<rect width="1080" height="1920" fill="#151626" stroke="none"/>`+camRec(in_,t,'48.000');
  o+=cartao3d(540,820,'dudu.garagem','O QUE TEM DEBAIXO DA LONA??','#c8402f',t,1.2,{rot:-3,w:960});
  o+=cartao3d(540,1040,'rafa_motos','esse farol… é um clássico?','#2f6fb3',t,1.9,{rot:3,w:900});
  o+=cartao3d(540,1260,'bia.carros','MOSTRA A LONA!!!','#7a3f9e',t,2.6,{rot:-2,w:800});
  return o+hud5(85840,10);
};
// 9 · DM do influencer: 2 milhões… ou não?
SH.d4dm=(t,dur)=>{
  let o=raios('#7a3f9e',t,1000,.1);
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="540" cy="580" r="90" fill="#f6c744" stroke="#1b1420" stroke-width="6"/><text x="540" y="614" font-size="90" fill="#1b1420" text-anchor="middle" stroke="none">T</text>`;
  o+=`<text x="540" y="740" font-family="Arial, sans-serif" font-weight="700" font-size="48" fill="#1b1420" text-anchor="middle" stroke="none">thiagao.turbo</text><circle cx="745" cy="724" r="18" fill="#1d9bf0" stroke="none"/>`;
  const fl=t>2.6&&Math.floor(t*6)%2===0; o+=`<text x="540" y="820" font-size="64" fill="${fl?'#c8402f':'#1b1420'}" text-anchor="middle" stroke="none">${fl?'2.000':'2.000.000'} seguidores</text>`;
  if(t>.4){const k=pop(t,.4);o+=`<g transform="translate(220 920) scale(${k}) translate(-220 -920)"><rect x="210" y="900" width="660" height="290" rx="26" fill="#efefef"/><text x="240" y="970" font-family="PM" font-size="40" fill="#1b1420" stroke="none">Fala mecânico! Vi seu vídeo!!</text><text x="240" y="1040" font-family="PM" font-size="40" fill="#1b1420" stroke="none">Conserta meu carro AO VIVO</text><text x="240" y="1110" font-family="PM" font-size="40" fill="#1b1420" stroke="none">pros meus 2 milhões?</text><text x="240" y="1170" font-family="PM" font-size="40" fill="#c8402f" stroke="none">De graça né, é divulgação ;)</text></g>`;}
  if(t>2.6) o+=stamp(t,2.6,540,1440,600,200,'SERÁ?',150,'#c8402f',-8,'#fffaf0');
  return o+hud5(85840,10);
};
// 10 · Votação: INFLUENCER ✕ LONA
SH.d4votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#8a6a3a" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.1)/.35)), R=600*(1-ease((t-.3)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="84" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">INFLUENCER</text><text x="270" y="596" font-size="34" fill="#ecd9f7" text-anchor="middle" stroke="none">2 milhões… ou golpe?</text>`;
  o+=`<g transform="rotate(-8 270 830)"><rect x="180" y="660" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="680" width="148" height="290" rx="16" fill="#fff" stroke-width="4"/><circle cx="270" cy="760" r="40" fill="#f6c744" stroke-width="4"/><circle cx="305" cy="730" r="14" fill="#1d9bf0" stroke="none"/><text x="270" y="900" font-size="80" fill="#c8402f" text-anchor="middle" stroke="none">?</text></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="84" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">LONA</text><text x="810" y="596" font-size="34" fill="#fbe9cf" text-anchor="middle" stroke="none">convencer o pai a destapar</text>`;
  o+=lonaCarro(810,830,.42,true,t)+`<text x="810" y="760" font-size="100" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="12" paint-order="stroke fill">?</text></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'normal',hold:null,pose:'cruzados'})}</g>`;
  return o+hud5(85840,10);
};
