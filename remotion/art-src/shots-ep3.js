// ===== Episódio 3 (Dia 3): resultado com comentários em 3D + progresso =====
const D3=28;
function hud4(div,cli,t=1,shake=0,cliPop=-1){
  const sx=shake?Math.sin(t*60)*shake:0; const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `<g transform="translate(${sx} 0)">${hud(D3,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g></g>`;
}
function passo(n,txt,t,col='#f6c744'){const k=pop(t,0,.22);
  return `<g transform="translate(540 330) scale(${k}) rotate(-3)"><rect x="-380" y="-62" width="760" height="112" rx="18" fill="${col}" stroke="#1b1420" stroke-width="10"/><text x="0" y="24" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">PASSO ${n}: ${txt}</text></g>`;}
// cartão de comentário "3D": entra a rodar sobre o eixo vertical, com sombra e flutuação
function cartao3d(x,y,user,txt,col,t,t0,{w=820,like=true,rot=-4,emoji=''}={}){
  if(t<t0) return '';
  const p=clamp((t-t0)/.45,0,1), e=ease(p);
  const ang=(1-e)*80, sx=Math.max(.05,Math.cos(ang*Math.PI/180)), sk=(1-e)*-18;
  const bob=Math.sin((t-t0)*2.4)*8, h=170, z=.86+.14*e;
  const ini=user.replace(/[^a-z]/i,'').charAt(0).toUpperCase();
  let c=`<g transform="translate(${x} ${y+bob}) rotate(${rot*e}) scale(${sx*z} ${z}) skewY(${sk})">`;
  c+=`<rect x="${-w/2+18}" y="${-h/2+22}" width="${w}" height="${h}" rx="30" fill="#000" opacity=".35" stroke="none"/>`;
  c+=`<rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="30" fill="#24252e" stroke="#3d3f4d" stroke-width="5"/>`;
  c+=`<circle cx="${-w/2+80}" cy="0" r="50" fill="${col}" stroke="#fff" stroke-width="5"/><text x="${-w/2+80}" y="22" font-size="60" fill="#fff" text-anchor="middle" stroke="none">${ini}</text>`;
  c+=`<text x="${-w/2+155}" y="-22" font-family="Arial, sans-serif" font-weight="700" font-size="38" fill="#fff" stroke="none">${user}</text>`;
  c+=`<text x="${-w/2+155}" y="44" font-family="Arial, sans-serif" font-size="50" fill="#f2f2f2" stroke="none">${txt}</text>`;
  if(like) c+=`<path d="M${w/2-70},20 C${w/2-100},-6 ${w/2-100},-36 ${w/2-70},-18 C${w/2-40},-36 ${w/2-40},-6 ${w/2-70},20 Z" fill="#ff3b5c" stroke="none"/>`;
  if(emoji) c+=emoji;
  return c+`</g>`;
}
function fundoEscuro(t,col='#151626'){let o=`<rect width="1080" height="1920" fill="${col}" stroke="none"/>`;for(let k=0;k<14;k++){const a=k*0.45+t*.4;o+=`<path d="M540,1000 L${540+Math.cos(a)*1700},${1000+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${1000+Math.sin(a+0.22)*1700} Z" fill="#fff" opacity=".04" stroke="none"/>`;}return o;}

// 1 · Resultado: 75% DESCULPA + 3 comentários
SH.c3votos=(t,dur)=>{
  let o=fundoEscuro(t);
  const k=pop(t,.05,.2); o+=`<g transform="translate(540 380) scale(${k}) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="84" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text></g>`;
  // barra de percentagem
  const pc=Math.round(75*ease((t-.3)/.9)); const bw=900;
  o+=`<rect x="90" y="500" width="${bw}" height="120" rx="60" fill="#c8402f" stroke="#1b1420" stroke-width="8"/><rect x="90" y="500" width="${Math.max(120,bw*pc/100)}" height="120" rx="60" fill="#2f9e6e" stroke="#1b1420" stroke-width="8"/>`;
  o+=`<text x="130" y="585" font-size="72" fill="#fff" stroke="none">DESCULPA ${pc}%</text><text x="960" y="585" font-size="52" fill="#fff" text-anchor="end" stroke="none">${100-pc}%</text>`;
  o+=cartao3d(540,830,'baxin_228','Desculpa','#2f6fb3',t,.9,{rot:-4});
  o+=cartao3d(540,1050,'_ricard0_silva_','Desculpa','#7a3f9e',t,1.5,{rot:3});
  o+=cartao3d(540,1270,'pedroca__244','Desculpa','#e08a2f',t,2.1,{rot:-3});
  return o+hud4(87900,1);
};
// 2 · "teve um fortão que queria bater nele kkk"
SH.c3fortao=(t,dur)=>{
  if(t>2.6) return caraNando(t-2.6,'choque','#c8402f','EU HEIN?!',.05)+hud4(87900,1);
  let o=fundoEscuro(t,'#1e1424');
  const k=pop(t,.05,.2); o+=`<g transform="translate(540 470) scale(${k}) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">ATÉ TEVE UM FORTÃO</text><text x="0" y="74" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">QUE QUERIA BATER NELE</text></g>`;
  const glove=`<g transform="translate(330 -20) rotate(${-20+Math.sin(t*14)*14}) scale(.7)"><path d="M-90,-60 Q-100,-120 -40,-120 H60 Q110,-120 110,-60 V40 Q110,90 60,90 H-50 Q-100,90 -96,40 Z" fill="#e0483a" stroke="#1b1420" stroke-width="8"/><rect x="-80" y="90" width="150" height="60" rx="10" fill="#fff" stroke="#1b1420" stroke-width="8"/></g>`;
  o+=cartao3d(540,900,'vinicius_mxf_140cc','Bste','#3a3f45',t,.6,{rot:4,emoji:glove});
  o+=ono('KKKKK',540,1180,t,1.2,'#f6c744',-6,140);
  return o+hud4(87900,1);
};
// 3 · Passo 1: atravessar a rua e pedir desculpa — o Kléber grava
SH.c3loja=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="420" width="1040" height="1100" fill="#eef3f7"/><rect x="0" y="400" width="1080" height="40" fill="#1f6fd6"/><rect x="80" y="480" width="920" height="200" rx="30" fill="#10233c"/><g filter="url(#glow)" stroke="none"><text x="540" y="630" font-size="140" fill="#49f2ff" text-anchor="middle">SPEEDFIX</text></g>`;
  for(let k=0;k<3;k++){const x=60+k*330; o+=`<rect x="${x}" y="800" width="300" height="720" fill="#7fd0f0"/>`;}
  o+=`<rect x="0" y="1520" width="1080" height="400" fill="#3d3a42" stroke="none"/><path d="M0,1520 H1080" stroke-width="8"/>`;
  // clientes a olhar
  for(const [x,c] of [[150,'#e0483a'],[930,'#7a3f9e']]) o+=`<g><circle cx="${x}" cy="1180" r="50" fill="#e2b48c"/><rect x="${x-60}" y="1230" width="120" height="230" rx="40" fill="${c}"/><circle cx="${x-14}" cy="1176" r="7" fill="#2b1d16" stroke="none"/><circle cx="${x+14}" cy="1176" r="7" fill="#2b1d16" stroke="none"/></g>`;
  const walk=ease(clamp(t/1.6,0,1)); const nx=-200+walk*520;
  o+=`<g transform="translate(0 ${Math.abs(Math.sin(t*9))*10*(1-walk)})">${nando({x:nx,y:1900,s:.66,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  o+=kleber({x:800,y:1900,s:.66,face:'sorriso',pose:'normal',flip:true});
  // celular a gravar
  if(t>1.8){const k=pop(t,1.8);o+=`<g transform="translate(690 1170) scale(${k}) rotate(-10)"><rect x="-60" y="-100" width="120" height="200" rx="16" fill="#1d1d24"/><rect x="-48" y="-88" width="96" height="176" rx="8" fill="#49f2ff" stroke-width="4"/><circle cx="-24" cy="-64" r="10" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/></g>`;
    o+=ono('REC ●',820,1000,t,1.9,'#e0483a',6,80);}
  return cam(o,t,dur,1.0,1.05)+passo(1,'PEDIR DESCULPA',t)+hud4(87900,1);
};
// 4 · Humilhação: "mais alto!"
SH.c3humilha=(t,dur)=>{
  let o=caraNando(t,'preocupado','#7a3f9e','',0,'#fff',2.6);
  // moldura de câmera a gravar
  o+=`<rect x="40" y="300" width="1000" height="1560" rx="40" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="80 1400" opacity=".9"/><circle cx="110" cy="370" r="20" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/><text x="145" y="388" font-size="48" fill="#fff" stroke="none">REC</text>`;
  if(t>.4){const k=pop(t,.4);o+=`<g transform="translate(540 1520) scale(${k})"><rect x="-260" y="-70" width="520" height="130" rx="65" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="24" font-family="PM" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">d-desculpa…</text></g>`;}
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(760 560) scale(${k}) rotate(6)"><rect x="-260" y="-90" width="520" height="170" rx="50" fill="#1f6fd6" stroke="#1b1420" stroke-width="8"/><text x="0" y="22" font-family="PM" font-size="72" fill="#fff" text-anchor="middle" stroke="none">MAIS ALTO! KKK</text></g>`;}
  return o+hud4(87900,1);
};
// 5 · Postou: o vídeo bombou
SH.c3post=(t,dur)=>{
  let o=fundoEscuro(t,'#1f6fd6');
  o+=`<rect x="150" y="380" width="780" height="1460" rx="70" fill="#1d1d24"/><rect x="180" y="410" width="720" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="250" cy="480" r="38" fill="#1f6fd6"/><path d="M244,462 l-10,18 h10 l-6,18 l18,-24 h-10 l8,-12 Z" fill="#ffe14a" stroke="none"/><text x="305" y="495" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#1b1420" stroke="none">kleber.speedfix</text>`;
  // vídeo dentro do post
  o+=`<rect x="180" y="540" width="720" height="700" fill="#7a3f9e" stroke="none"/>`;
  o+=`<g transform="translate(540 1240)">${nando({x:0,y:0,s:.55,face:'preocupado',hold:null,pose:'normal'})}</g>`;
  o+=`<text x="210" y="1310" font-family="Arial, sans-serif" font-size="34" fill="#1b1420" stroke="none">Olha o "mecânico" que esqueceu o</text><text x="210" y="1356" font-family="Arial, sans-serif" font-size="34" fill="#1b1420" stroke="none">carro da minha mãe 7 ANOS kkkkk</text>`;
  const v=Math.round(12400*ease((t-.6)/2.6)); o+=`<rect x="210" y="1400" width="660" height="110" rx="20" fill="#f0f2f5"/><text x="240" y="1475" font-size="60" fill="#1b1420" stroke="none">${v.toLocaleString('pt-BR')} views</text>`;
  if(t>3.2) o+=ono('BOMBOU!',540,1650,t,3.2,'#f6c744',-6,130);
  return o+hud4(87900,1);
};
// 6 · Os comentários viraram contra o Kléber
SH.c3coments=(t,dur)=>{
  let o=fundoEscuro(t,'#151626');
  const k=pop(t,.05); o+=`<g transform="translate(540 380) scale(${k}) rotate(-3)"><rect x="-420" y="-70" width="840" height="130" rx="20" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="76" fill="#1b1420" text-anchor="middle" stroke="none">OS COMENTÁRIOS…</text></g>`;
  o+=cartao3d(540,640,'ze.do.gas','esse cara é HONESTO','#2f9e6e',t,.3,{rot:-3,w:900});
  o+=cartao3d(540,860,'tati_lima','consertou em 20 min??','#e08a2f',t,1.0,{rot:3,w:900});
  o+=cartao3d(540,1080,'cida.oliveira','Ele é um ANJO!!','#c8402f',t,1.9,{rot:-2,w:900});
  if(t>2.5){const k2=pop(t,2.5);o+=`<g transform="translate(830 1000) scale(${k2}) rotate(10)"><rect x="-150" y="-36" width="300" height="70" rx="35" fill="#f6c744" stroke="#1b1420" stroke-width="6"/><text x="0" y="20" font-size="40" fill="#1b1420" text-anchor="middle" stroke="none">A DONA CIDA!</text></g>`;}
  o+=cartao3d(540,1300,'rafa_motos','humilhar trabalhador? feio','#3a3f45',t,2.9,{rot:3,w:900});
  return o+hud4(87900,1);
};
// 7 · Passo 2: fila na porta — clientes e dinheiro
SH.c3fila=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#a9dcf5" stroke="none"/><rect x="20" y="380" width="1040" height="760" fill="#e9a640"/><rect x="56" y="420" width="968" height="190" rx="10" fill="#c8402f"/><text x="540" y="560" font-size="130" fill="#f6c744" stroke="#5a1a12" stroke-width="10" paint-order="stroke fill" text-anchor="middle">MECÂNICA TIO ZÉ</text><rect x="240" y="660" width="600" height="480" fill="#3b3036"/>`;
  o+=`<rect x="0" y="1140" width="1080" height="780" fill="#3d3a42" stroke="none"/><path d="M0,1140 H1080" stroke-width="8"/>`;
  const items=[['ÓLEO',90,'#f2c230'],['FREIO',220,'#ef4f6b'],['BATERIA',380,'#5fd17c'],['LÂMPADA',40,'#4cc3f0'],['ALINHAMENTO',120,'#c79a5b']];
  const car=(x,y,c)=>`<g><path d="M${x},${y} v-60 q0,-24 28,-28 l36,-4 q24,-46 70,-50 h78 q40,4 60,50 l24,4 q24,4 24,28 v60 Z" fill="${c}"/><path d="M${x+74},${y-88} q20,-34 56,-38 h34 v38 Z M${x+180},${y-88} v-38 h24 q28,4 46,38 Z" fill="#bfe3ea" stroke-width="5"/><circle cx="${x+70}" cy="${y+2}" r="26" fill="#2a2522" stroke-width="6"/><circle cx="${x+230}" cy="${y+2}" r="26" fill="#2a2522" stroke-width="6"/></g>`;
  let cli=1, ganho=0;
  const POS=[[40,1460],[390,1460],[740,1460],[210,1760],[570,1760]];
  items.forEach(([n,v,c],i)=>{const t0=.4+i*.8; const row=i%2, [x,y]=POS[i];
    const dx=(1-ease(clamp((t-t0+.6)/.5,0,1)))*1200;
    o+=`<g transform="translate(${dx} 0)">${car(x,y,c)}</g>`;
    if(t>t0){cli++;ganho+=v;const k=pop(t,t0);o+=`<g transform="translate(${x+150} ${y-160}) scale(${k}) rotate(${row?5:-5})"><rect x="-160" y="-40" width="320" height="80" rx="16" fill="#fff" stroke="#1b1420" stroke-width="6"/><text x="0" y="16" font-size="44" fill="#2f9e6e" text-anchor="middle" stroke="none">${n} R$ ${v}</text></g>`;}
  });
  const div=87900-ganho;
  if(t<2.6) o+=ono('FILA!',540,820,t,.2,'#fff',-6,130);
  if(t>4.4) o+=ono('+R$ 850',540,820,t,4.4,'#5fe08a',-6,160);
  return o+passo(2,'CLIENTES',t,'#5fe08a')+hud4(div,cli,t,0,.4);
};
// 8 · O Kléber vê tudo
SH.c3kleber=(t,dur)=>{
  let c=raios('#10233c',t,900,.14); c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'raiva',pose:'normal'});
  // tablet a rachar
  if(t>1.4){c+=`<path d="M200,1500 l60,-40 l-20,-30 l70,-50 M260,1460 l40,30" stroke="#fff" stroke-width="8" fill="none"/>`; c+=ono('CRACK!',300,1380,t,1.4,'#fff',-8,110);}
  if(t>.4){const k=pop(t,.4);c+=`<g transform="translate(540 1560) scale(${k}) rotate(-3)"><rect x="-470" y="-90" width="940" height="170" rx="30" fill="#1b1420"/><text x="0" y="30" font-family="PM" font-size="62" fill="#fff" text-anchor="middle" stroke="none">ISSO NÃO VAI FICAR ASSIM.</text></g>`;}
  return c+hud4(87050,6);
};
// 9 · Rubinho + votação GRAVAR ✕ TRABALHAR
SH.c3votacao=(t,dur)=>{
  if(t<2.4){ let o=interior({}); o+=nando({x:300,y:1920,s:.74,face:'contente',hold:null,pose:'normal'});
    const rx=780+500*(1-ease(t/.4)); o+=rubinho({x:rx,y:1900,s:.78,face:'feliz',pose:'filma'});
    if(t>.5){const k=pop(t,.5);o+=`<g transform="translate(540 560) scale(${k}) rotate(-3)"><rect x="-470" y="-130" width="940" height="260" rx="60" fill="#fff"/><text x="0" y="-20" font-family="PM" font-size="64" fill="#1b1420" text-anchor="middle" stroke="none">MANO, VOCÊ VIRALIZOU!</text><text x="0" y="70" font-family="PM" font-size="64" fill="#c8402f" text-anchor="middle" stroke="none">BORA GRAVAR MAIS?</text><path d="M260,120 l60,110 l-150,-110" fill="#fff"/></g>`;}
    return cam(o,t,2.4,1,1.04)+hud4(87050,6); }
  t-=2.4;
  let o=`<rect width="540" height="1920" fill="#7a3f9e" stroke="none"/><rect x="540" width="540" height="1920" fill="#2f6fb3" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.05); o+=`<g transform="translate(540 330) scale(${bk}) rotate(-3) translate(-540 -330)"><rect x="150" y="270" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="350" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.15)/.35)), R=600*(1-ease((t-.35)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">GRAVAR</text><text x="270" y="596" font-size="34" fill="#ecd9f7" text-anchor="middle" stroke="none">pode bombar… ou virar meme</text>`;
  o+=`<g transform="rotate(-8 270 820)"><rect x="180" y="650" width="180" height="330" rx="26" fill="#1d1d24"/><rect x="196" y="670" width="148" height="290" rx="16" fill="#49f2ff" stroke-width="4"/><circle cx="230" cy="700" r="12" fill="#e0483a" stroke="none" opacity="${Math.floor(t*3)%2?1:.3}"/></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">TRABALHAR</text><text x="810" y="596" font-size="34" fill="#d6e6fb" text-anchor="middle" stroke="none">dinheiro certo, mas devagar</text>`;
  o+=`<g transform="rotate(${-20+Math.sin(t*5)*10} 820 900)"><rect x="800" y="700" width="34" height="260" rx="10" fill="#c9d1d6"/><path d="M790,700 q-14,-60 34,-74 q48,14 34,74 l-18,-12 v-24 h-32 v24 Z" fill="#c9d1d6"/></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 780) scale(${xp}) translate(-540 -780)"><circle cx="540" cy="780" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="810" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'normal',hold:null,pose:'cruzados'})}</g>`;
  return o+hud4(87050,6);
};
