// ===== Episódio 5 (Dia 5): "O golpe e a lona" =====
const D5=26;
function hud6(div=81050,cli=21,t=1,shake=0){
  const sx=shake?Math.sin(t*60)*shake:0;
  return `<g transform="translate(${sx} 0)">${hud(D5,div)}<g font-family="A" stroke="#2b1d16"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g>`;
}
// Tio Zé em grande plano (cabeça a ocupar o ecrã), com óculos de sol opcionais e boca aberta a gritar
function paiGrande(t,{grito=false,oculos=true,y=1000,s=2.2}={}){
  const Y=v=>y+(v+960)*s; // centro da cara (local -960) em y
  let o=tioZe({x:540,y:y+960*s,s,age:'velho',face:grito?'choque':'feliz',pose:'baixo'});
  if(oculos&&!grito) o+=`<g stroke="#1b1420" stroke-width="10"><rect x="${540-46*s-40*s}" y="${Y(-1000)}" width="${80*s}" height="${52*s}" rx="${18*s}" fill="#141414"/><rect x="${540+46*s-40*s}" y="${Y(-1000)}" width="${80*s}" height="${52*s}" rx="${18*s}" fill="#141414"/><path d="M${540-6*s},${Y(-980)} h${12*s}"/></g>`;
  if(grito) o+=`<ellipse cx="540" cy="${Y(-860)}" rx="${46*s}" ry="${40*s}" fill="#3b1f1a" stroke="#1b1420" stroke-width="10"/><ellipse cx="540" cy="${Y(-840)}" rx="${26*s}" ry="${14*s}" fill="#e0483a" stroke="none"/>`;
  return o;
}
function praiaFundo(t){
  let o=`<rect width="1080" height="1920" fill="#8fd6f5" stroke="none"/><circle cx="880" cy="380" r="90" fill="#ffe27a" stroke="none"/>`;
  const wv=(t*60)%120;
  o+=`<rect x="0" y="1100" width="1080" height="300" fill="#2fa3d6"/><g transform="translate(${-wv} 0)"><path d="M0,1150 q60,-20 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0" fill="none" stroke="#bfeaf7" stroke-width="7"/></g>`;
  o+=`<path d="M0,1400 Q540,1340 1080,1400 V1920 H0 Z" fill="#f6dc9a"/>`;
  return o;
}

// 1 · Frame 0 cheio: o perfil dos "2 milhões" racha para 2 mil
SH.e5golpe=(t,dur)=>{
  let o=raios('#7a3f9e',t,1000,.12);
  o+=`<rect x="110" y="330" width="860" height="1460" rx="70" fill="#1d1d24"/><rect x="140" y="360" width="800" height="1400" rx="48" fill="#fff" stroke="none"/>`;
  o+=`<circle cx="540" cy="620" r="130" fill="#f6c744" stroke="#1b1420" stroke-width="8"/><text x="540" y="670" font-size="140" fill="#1b1420" text-anchor="middle" stroke="none">T</text>`;
  o+=`<text x="540" y="840" font-family="Arial, sans-serif" font-weight="700" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">thiagao.turbo</text><circle cx="800" cy="820" r="24" fill="#1d9bf0" stroke="none"/>`;
  const crack=t>.8, fell=t>1.15;
  if(!fell){ const sh=crack?Math.sin(t*80)*6:0; o+=`<g transform="translate(${sh} 0)"><text x="540" y="1060" font-size="170" fill="#1b1420" text-anchor="middle" stroke="none">2.000.000</text></g>`;
    if(crack) o+=`<path d="M470,930 l40,60 l-30,40 l50,60 M640,930 l-30,50 l40,40 l-20,70" fill="none" stroke="#c8402f" stroke-width="10"/>`; }
  else { const k=pop(t,1.15,.2); o+=`<g transform="translate(540 1040) scale(${k})"><text x="0" y="0" font-size="210" fill="#c8402f" text-anchor="middle" stroke="none">2.000</text></g>`;
    for(const [x,r,d] of [[380,-30,0],[520,20,.1],[700,40,.05]]){const p=clamp((t-1.15-d)/.6,0,1);o+=`<text x="${x}" y="${1080+p*600}" font-size="120" fill="#1b1420" opacity="${1-p}" transform="rotate(${r*p} ${x} ${1080+p*600})" stroke="none">0</text>`;} }
  o+=`<text x="540" y="1150" font-size="58" fill="#7a808a" text-anchor="middle" stroke="none">seguidores</text>`;
  o+=`<rect x="200" y="1220" width="680" height="110" rx="24" fill="#1d9bf0"/><text x="540" y="1295" font-family="Arial, sans-serif" font-weight="700" font-size="52" fill="#fff" text-anchor="middle" stroke="none">Seguir</text>`;
  o+=stamp(t,1.6,540,1520,620,220,'GOLPE!',170,'#c8402f',-10,'#fffaf0');
  return o+hud6();
};
// 2 · Um de vocês descobriu
SH.e5gleeb=(t,dur)=>{
  let o=fundoEscuro(t,'#1e1424');
  o+=`<g transform="translate(540 470) rotate(-3)"><rect x="-460" y="-120" width="920" height="230" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-18" font-size="70" fill="#1b1420" text-anchor="middle" stroke="none">E UM DE VOCÊS</text><text x="0" y="74" font-size="70" fill="#2f9e6e" text-anchor="middle" stroke="none">DESCOBRIU ANTES!</text></g>`;
  o+=cartao3d(540,820,'Gleebzito','"mostra que você tem 2M…','#3a3f45',t,.15,{rot:-3,w:980});
  o+=cartao3d(540,1030,'Gleebzito','…quando na verdade tem 2k"','#3a3f45',t,.55,{rot:3,w:980,like:false});
  if(t>1.4){const k=pop(t,1.4);o+=`<g transform="translate(540 1330) scale(${k}) rotate(-6)"><rect x="-300" y="-80" width="600" height="160" rx="80" fill="#5fe08a" stroke="#1b1420" stroke-width="10"/><text x="0" y="34" font-size="100" fill="#1b1420" text-anchor="middle" stroke="none">ACERTOU!</text></g>`;
    for(let i=0;i<10;i++){const a=i*0.63, r=ease((t-1.4)/.5)*360; o+=`<rect x="${540+Math.cos(a)*r}" y="${1330+Math.sin(a)*r*.6}" width="22" height="14" fill="${['#f6c744','#4cc3f0','#ff5a7a','#5fe08a'][i%4]}" transform="rotate(${i*40+t*200} ${540+Math.cos(a)*r} ${1330+Math.sin(a)*r*.6})" stroke="none"/>`;}}
  return o+hud6();
};
// 3 · Vocês escolheram: LONA
SH.e5lona=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" opacity=".35" stroke="none"/>`;
  const z=1.6+ease(t/dur)*.5; o=`<g transform="translate(300 1560) scale(${z}) translate(-246 -1576)">${o}${lonaCarro(620,1500,.85,true,t)}</g>`;
  o+=`<circle cx="300" cy="1560" r="${180+Math.sin(t*6)*20}" fill="#fff6c4" opacity=".18" stroke="none"/>`;
  o+=`<g transform="translate(540 760) rotate(-4)"><rect x="-440" y="-150" width="880" height="300" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-40" font-size="76" fill="#fff" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text><text x="-50" y="88" font-size="130" fill="#f6c744" text-anchor="middle" stroke="none">A LONA!</text><g transform="translate(290 46)"><circle r="56" fill="#2f9e6e" stroke="#fff" stroke-width="6"/><path d="M-26,0 l18,20 l34,-40" fill="none" stroke="#fff" stroke-width="14"/></g></g>`;
  return o+hud6();
};
// 4 · Videochamada com o pai
SH.e5chamada=(t,dur)=>{
  if(t>3.2){ let c=caraNando(t-3.2,'preocupado','#2f6fb3','',0,'#fff',2.6);
    const k=pop(t,3.3); c+=`<g transform="translate(540 1500) scale(${k}) rotate(-3)"><rect x="-450" y="-110" width="900" height="220" rx="60" fill="#fff" stroke="#1b1420" stroke-width="8"/><text x="0" y="-12" font-family="PM" font-size="62" fill="#1b1420" text-anchor="middle" stroke="none">Pai… e se eu</text><text x="0" y="66" font-family="PM" font-size="62" fill="#c8402f" text-anchor="middle" stroke="none">tirar a lona?</text></g>`;
    return c+hud6(); }
  let o=raios('#2f9e6e',t,1000,.08);
  o+=`<rect x="110" y="330" width="860" height="1520" rx="70" fill="#1d1d24"/><clipPath id="vc"><rect x="140" y="360" width="800" height="1460" rx="48"/></clipPath><g clip-path="url(#vc)">`;
  o+=`<g transform="translate(540 1090) scale(.74) translate(-540 -1090)">${praiaFundo(t)}<g transform="rotate(${Math.sin(t*3)*2} 540 1900)">${paiGrande(t,{y:820,s:1.55})}</g></g>`;
  o+=`<text x="540" y="440" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="6" paint-order="stroke fill">PAI</text><text x="540" y="490" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="5" paint-order="stroke fill">0:${String(Math.floor(t)+3).padStart(2,'0')}</text>`;
  // janela pequena do Nando
  o+=`<rect x="680" y="1260" width="220" height="300" rx="24" fill="#d9c79f" stroke="#fff" stroke-width="6"/><g transform="translate(790 1590) scale(.28) translate(-540 -1900)">${nando({x:540,y:2500,s:1.2,face:'normal',hold:null})}</g>`;
  o+=`<g transform="translate(540 1720)"><circle cx="-150" r="58" fill="#3a3f45"/><circle cx="0" r="64" fill="#e0483a"/><path d="M-30,6 q30,-26 60,0" fill="none" stroke="#fff" stroke-width="10"/><circle cx="150" r="58" fill="#3a3f45"/></g></g>`;
  o+=ono('TUTUM',820,560,t,.15,'#fff',8,80);
  return o+hud6();
};
// 5 · NÃO MEXE NAS LONAS!
SH.e5grito=(t,dur)=>{
  if(t>3.6){ let o=`<rect width="1080" height="1920" fill="#1d1d24" stroke="none"/>`;
    o+=`<circle cx="540" cy="860" r="120" fill="#c8402f"/><path d="M490,850 q50,-40 100,0" fill="none" stroke="#fff" stroke-width="18" transform="rotate(180 540 860)"/>`;
    o+=`<text x="540" y="1100" font-family="Arial, sans-serif" font-weight="700" font-size="66" fill="#fff" text-anchor="middle" stroke="none">Chamada encerrada</text><text x="540" y="1180" font-family="Arial, sans-serif" font-size="44" fill="#9aa0a6" text-anchor="middle" stroke="none">PAI · 0:07</text>`;
    o+=ono('TU-TU-TU',540,1420,t,3.7,'#fff',-4,110); return o+hud6(); }
  const sh=Math.sin(t*70)*14, sy=Math.cos(t*55)*8;
  let o=praiaFundo(t);
  o+=`<g transform="translate(${sh} ${sy})">${paiGrande(t,{grito:t>.3,oculos:t<=.3,y:820,s:2.4})}</g>`;
  if(t>.4) for(let i=0;i<8;i++){const p=((t-.4)*1.5+i/8)%1; o+=`<ellipse cx="${540+(i-4)*60*p*3}" cy="${1060+p*500}" rx="14" ry="20" fill="#f6efe0" stroke="#bfb6a0" stroke-width="4" opacity="${1-p}"/>`;}
  if(t>.35){const k=pop(t,.35,.18); o+=`<g transform="translate(540 1520) scale(${k}) rotate(-5)"><rect x="-480" y="-130" width="960" height="260" rx="30" fill="#c8402f" stroke="#1b1420" stroke-width="12"/><text x="0" y="-12" font-size="104" fill="#fff" text-anchor="middle" stroke="none">NÃO MEXE</text><text x="0" y="96" font-size="104" fill="#f6c744" text-anchor="middle" stroke="none">NAS LONAS!</text></g>`;}
  return `<g transform="translate(${sh*.4} 0)">${o}</g>`+hud6(81050,21,t,6);
};
// 6 · DESLIGOU?!
SH.e5desligou=(t,dur)=>caraNando(t,'choque','#c8402f','DESLIGOU?!',.05)+hud6();
// 7 · O Turbo puxa a lona: grade cromada + farol redondo
SH.e5turbo=(t,dur)=>{
  let o=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  o+=`<rect width="1080" height="1920" fill="#1a0f20" opacity=".3" stroke="none"/>`;
  // carro por baixo (frente de coupé clássico)
  const rev=t<4.6?ease(clamp((t-.8)/1.6,0,1)):1-ease(clamp((t-4.6)/.6,0,1));
  const W=360*rev;
  let car=`<path d="M190,1640 L190,1500 Q200,1440 280,1430 L560,1420 L560,1640 Z" fill="#7a1d2a"/>`;
  car+=`<rect x="200" y="1500" width="150" height="110" rx="14" fill="#c9d1d6"/>`;
  for(let k=0;k<6;k++) car+=`<path d="M${212+k*24},1508 V1602" stroke="#6b7479" stroke-width="7"/>`;
  car+=`<circle cx="410" cy="1520" r="52" fill="#c9d1d6"/><circle cx="410" cy="1520" r="38" fill="#fff6c4"/><circle cx="410" cy="1520" r="20" fill="#fff" stroke="none" opacity="${.7+.3*Math.sin(t*8)}"/>`;
  car+=`<path d="M190,1620 H560" stroke="#c9d1d6" stroke-width="18"/>`;
  o+=`<clipPath id="rv"><rect x="150" y="1300" width="${40+W}" height="400"/></clipPath>`;
  o+=lonaCarro(640,1500,.85,false,t);
  o+=`<g clip-path="url(#rv)">${car}</g>`;
  if(rev>0.02){ const fx=190+W; o+=`<path d="M${fx},1360 Q${fx+60},1450 ${fx+30},1650 L${fx-10},1650 Q${fx+10},1480 ${fx-20},1380 Z" fill="#b0a66b"/>`;
    o+=`<circle cx="410" cy="1520" r="${120+Math.sin(t*6)*20}" fill="#fff6c4" opacity="${.22*rev}" stroke="none"/>`; }
  // Turbo a puxar (vira para a direita)
  const tx=-60+rev*(W*.4), tug=t<4.6?Math.sin(t*14)*8:0;
  o+=`<g transform="translate(${tug} 0)">${turbo({x:tx,y:1880,s:.55,mood:'rosna',flip:true})}</g>`;
  if(t>.8&&t<4.6) o+=`<path d="M${tx+190},1620 Q${tx+220},1560 ${190+W},1500" fill="none" stroke="#b0a66b" stroke-width="14"/>`;
  if(t>2.2&&t<4.6) o+=ono('UAU…',420,1200,t,2.2,'#f6c744',-6,90);
  if(t>4.4){ const nx=1300-ease((t-4.4)/.4)*560; o+=nando({x:nx,y:1920,s:.7,face:'choque',hold:null,pose:'normal'}); o+=ono('NÃO!',560,1150,t,4.5,'#fff',8,100); }
  return cam(o,t,dur,1.45,1.55,420,1460)+hud6();
};
// 8 · Alguém viu: o Kléber na porta
SH.e5porta=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#2a2030" stroke="none"/>`;
  o+=`<rect x="240" y="420" width="600" height="1180" fill="#a9dcf5"/><rect x="240" y="1480" width="600" height="120" fill="#cfcfcf"/>`;
  o+=`<rect x="200" y="380" width="680" height="60" fill="#5a3a22"/><rect x="200" y="380" width="60" height="1260" fill="#5a3a22"/><rect x="820" y="380" width="60" height="1260" fill="#5a3a22"/>`;
  const kx=540+(1-ease(t/.5))*300;
  o+=`<g opacity="${.4+.6*ease(t/.6)}">${kleber({x:kx,y:1620,s:.95,face:'sorriso',pose:'normal'})}</g>`;
  o+=`<rect x="0" y="1640" width="1080" height="280" fill="#8f3f2e" stroke="none"/><path d="M0,1640 H1080" stroke-width="7"/>`;
  o+=`<rect width="1080" height="1920" fill="url(#vig)" stroke="none"/>`;
  o+=ono('!',870,520,t,.6,'#f6c744',8,200);
  o+=tag('KLÉBER',540,370,t,.9,540,470);
  return cam(o,t,dur,1.0,1.08,540,1000)+hud6();
};
// 9 · A oferta: 40 mil com TUDO dentro
SH.e5oferta=(t,dur)=>{
  let c=raios('#1f6fd6',t,900,.12);
  c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'sorriso',pose:'normal'});
  if(t>.3){const k=pop(t,.3),sw=Math.sin(t*3)*4; c+=`<g transform="translate(540 1420) scale(${k}) rotate(${-5+sw})"><rect x="-400" y="-230" width="800" height="460" rx="14" fill="#fffaf0" stroke="#1b1420" stroke-width="10"/><text x="0" y="-150" font-size="52" fill="#1b1420" text-anchor="middle" stroke="none">PROPOSTA DE COMPRA</text><path d="M-340,-120 H340" stroke-width="5"/><text x="0" y="-20" font-size="140" fill="#2f9e6e" text-anchor="middle" stroke="none">R$ 40.000</text>`;
    c+=`<text x="0" y="90" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">pela oficina</text>`;
    if(t>2.4){const u=ease((t-2.4)/.4); c+=`<text x="0" y="180" font-size="66" fill="#c8402f" text-anchor="middle" stroke="none">COM TUDO QUE TÁ DENTRO</text><path d="M-330,200 H${-330+660*u}" stroke="#c8402f" stroke-width="10"/>`;}
    c+=`</g>`;}
  if(t>3.2){const k=pop(t,3.2); c+=`<g transform="translate(540 1745) scale(${k}) rotate(3)"><rect x="-330" y="-50" width="660" height="100" rx="50" fill="#f6c744" stroke="#1b1420" stroke-width="8"/><text x="0" y="22" font-size="60" fill="#1b1420" text-anchor="middle" stroke="none">INCLUSIVE A LONA...</text></g>`; }
  return c+hud6(81050,21,t,t>2.4&&t<3.2?6:0);
};
// 10 · Votação: ACEITAR ✕ RECUSAR
SH.e5votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f9e6e" stroke="none"/><rect x="540" width="540" height="1920" fill="#8a6a3a" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  o+=`<g transform="translate(540 330) rotate(-3)"><rect x="-390" y="-60" width="780" height="110" rx="14" fill="#f6c744"/><text x="0" y="20" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.05)/.3)), R=600*(1-ease((t-.2)/.3));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">ACEITAR</text><text x="270" y="596" font-size="34" fill="#d4f5e2" text-anchor="middle" stroke="none">R$ 40 mil… e perde tudo</text>`;
  for(let i=0;i<6;i++){const y=900-i*36; o+=`<rect x="${170+(i%2)*10}" y="${y}" width="200" height="70" rx="8" fill="#5fd17c" stroke="#1b1420" stroke-width="6"/><circle cx="${270+(i%2)*10}" cy="${y+35}" r="20" fill="#2f9e6e" stroke-width="4"/>`;}
  o+=`</g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="96" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">RECUSAR</text><text x="810" y="596" font-size="34" fill="#fbe9cf" text-anchor="middle" stroke="none">fica com a dívida… e o mistério</text>`;
  o+=`<g transform="translate(1620 0) scale(-1 1)">${lonaCarro(810,860,.42,true,t)}</g><text x="810" y="790" font-size="100" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="12" paint-order="stroke fill">?</text></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 1060) scale(${xp}) translate(-540 -1060)"><circle cx="540" cy="1060" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="1090" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud6();
};
