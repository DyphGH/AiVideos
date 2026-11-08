// ===== Episódio 2 — versão 2 (3 tentativas + reviravolta do Kléber) =====
// HUD com contador de clientes por baixo
function noHud(f){NOHUD=true;try{return f();}finally{NOHUD=false;}}
function hud3(div,cli=0,t=1,shake=0,cliPop=-1){
  const sx=shake?Math.sin(t*60)*shake:0;
  const k=cliPop>=0&&t>=cliPop?pop(t,cliPop,.3):1;
  return `<g transform="translate(${sx} 0)">${hud(D2,div)}<g font-family="A" stroke="#2b1d16"><g transform="translate(165 228) scale(${k}) translate(-165 -228)"><rect x="30" y="196" width="270" height="64" rx="16" fill="#232a4d" stroke="#3b4472" stroke-width="5"/><text x="54" y="240" font-size="30" fill="#c9cde6" stroke="none">CLIENTES</text><text x="276" y="244" font-size="46" fill="#5fe08a" stroke="none" text-anchor="end">${cli}</text></g></g></g>`;
}
function tentativa(n,t,col='#f6c744'){ const k=pop(t,0,.22);
  return `<g transform="translate(540 330) scale(${k}) rotate(-3)"><rect x="-300" y="-62" width="600" height="112" rx="18" fill="${col}" stroke="#1b1420" stroke-width="10"/><text x="0" y="24" font-size="78" fill="#1b1420" text-anchor="middle" stroke="none">${n}ª TENTATIVA</text></g>`; }
function raios(col,t,cy=960,op=.1){let o=`<rect width="1080" height="1920" fill="${col}" stroke="none"/>`;for(let k=0;k<14;k++){const a=k*0.45+t*.6;o+=`<path d="M540,${cy} L${540+Math.cos(a)*1700},${cy+Math.sin(a)*1700} L${540+Math.cos(a+0.22)*1700},${cy+Math.sin(a+0.22)*1700} Z" fill="#000" opacity="${op}" stroke="none"/>`;}return o;}
// grande plano da cara do Nando
function caraNando(t,face,bg,txt,t0=.1,col='#fff',z0=2.7){
  let c=raios(bg,t,900);
  const z=z0+ease(t/2)*.2, j=face==='choque'?Math.sin(t*60)*4:0;
  c+=`<g transform="translate(${j} 0)">${nando({x:540,y:900+(1740-815)*z,s:z,face,hold:null,pose:'normal'})}</g>`;
  if(txt) c+=ono(txt,540,1500,t,t0,col,-6,170);
  return c;
}

// 1 · Abertura — grande plano + VOCÊS ESCOLHERAM
SH.b2abre=(t,dur)=>{
  let o=caraNando(t,'contente','#2f9e6e','',0,'#fff',2.5);
  if(t>.05){const k=pop(t,.05,.2);o+=`<g transform="translate(540 1420) scale(${k}) rotate(-4)"><rect x="-440" y="-150" width="880" height="300" rx="26" fill="#1f2340" stroke="#f6c744" stroke-width="10"/><text x="0" y="-40" font-size="76" fill="#fff" text-anchor="middle" stroke="none">VOCÊS ESCOLHERAM</text><text x="0" y="80" font-size="110" fill="#f6c744" text-anchor="middle" stroke="none">VENDER AS PEÇAS!</text></g>`;}
  return o+hud3(87400,0);
};
// 2 · 1.ª tentativa — Marketplace: "aceita 50?"
SH.b2market=(t,dur)=>{
  if(t>3.6) return caraNando(t-3.6,'choque','#c8402f','50 REAIS?!',.05)+hud3(87400,0);
  let o=raios('#2f6fb3',t,1000,.08);
  o+=`<rect x="150" y="440" width="780" height="1400" rx="70" fill="#1d1d24"/><rect x="180" y="470" width="720" height="1340" rx="48" fill="#f0f2f5" stroke="none"/>`;
  o+=`<path d="M180,520 Q180,470 228,470 H852 Q900,470 900,520 V600 H180 Z" fill="#1877f2" stroke="none"/><text x="540" y="555" font-size="42" fill="#fff" text-anchor="middle" stroke="none">MARKETPLACE</text>`;
  // anúncio
  o+=`<rect x="210" y="630" width="660" height="420" rx="20" fill="#fff" stroke="#c9ced6" stroke-width="3"/>`;
  o+=`<g transform="translate(540 870) scale(.62)">${corsa({x:0,y:0,s:1,dusty:true})}</g>`;
  o+=`<text x="240" y="1110" font-size="54" fill="#1b1420" stroke="none">PEÇAS DE CORSA</text><text x="240" y="1180" font-size="66" fill="#2f9e6e" stroke="none">R$ 3.000</text><text x="240" y="1230" font-size="30" fill="#7a808a" stroke="none">Tudo original · retirar no local</text>`;
  // mensagem
  if(t>1.6){const k=pop(t,1.6,.2);o+=`<g transform="translate(220 1300) scale(${k}) translate(-220 -1300)"><circle cx="250" cy="1360" r="36" fill="#c79a5b"/><rect x="300" y="1300" width="560" height="130" rx="24" fill="#fff" stroke="#c9ced6" stroke-width="3"/><text x="330" y="1350" font-size="30" fill="#7a808a" stroke="none">Comprador</text><text x="330" y="1405" font-family="PM" font-size="44" fill="#1b1420" stroke="none">aceita 50 reais em tudo?</text></g>`;}
  o+=ono('PLIM!',830,1270,t,1.6,'#5fe08a',8,80);
  return o+tentativa(1,t)+hud3(87400,0);
};
// 3 · 2.ª tentativa — ferro-velho: R$ 80 pelo carro inteiro
SH.b2ferro=(t,dur)=>{
  if(t>3.2) return caraNando(t-3.2,'choque','#7a3f9e','OITENTA?!',.05,'#f6c744')+hud3(87400,0);
  let o=`<rect width="1080" height="1920" fill="#f1c27d" stroke="none"/><circle cx="880" cy="560" r="80" fill="#fff2b0" stroke="none"/>`;
  // pilhas de sucata
  o+=`<path d="M0,1200 L120,980 L260,1060 L380,900 L520,1100 L640,960 L780,1080 L900,940 L1080,1120 V1500 H0 Z" fill="#8a7f74"/>`;
  for(const [x,y,r] of [[150,1150,60],[330,1210,50],[700,1180,70],[930,1220,55]]) o+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#2a2522"/><circle cx="${x}" cy="${y}" r="${r*.45}" fill="#55504b" stroke-width="5"/>`;
  o+=`<rect x="0" y="1500" width="1080" height="420" fill="#a68c6d" stroke="none"/><path d="M0,1500 H1080" stroke-width="7"/>`;
  o+=`<rect x="200" y="640" width="680" height="170" rx="12" fill="#5a3a22"/><text x="540" y="755" font-size="110" fill="#f6c744" text-anchor="middle" stroke="none">FERRO-VELHO</text><path d="M300,810 V900 M780,810 V900" stroke-width="12"/>`;
  o+=corsa({x:540,y:1640,s:1.05,dusty:true});
  // oferta
  if(t>1.2) o+=stamp(t,1.2,540,1160,780,260,'R$ 80',170,'#c8402f',-8,'#fffaf0');
  if(t>1.6){const k=pop(t,1.6);o+=`<g transform="translate(540 1340) scale(${k})"><rect x="-300" y="-46" width="600" height="84" rx="18" fill="#1b1420"/><text x="0" y="18" font-size="50" fill="#fff" text-anchor="middle" stroke="none">PELO CARRO INTEIRO</text></g>`;}
  return o+tentativa(2,t,'#5fe08a')+hud3(87400,0);
};
// 4 · 3.ª tentativa — arrancar as peças… e a etiqueta
SH.b2etiqueta=(t,dur)=>{
  if(t>4.6) return caraNando(t-4.6,'choque','#c8402f','NÃO É MEU?!',.05)+hud3(87400,0);
  let o=noHud(()=>SH.e2capo(Math.min(t,3.5),4));
  if(t>2.2){const k=pop(t,2.2,.25),sw=Math.sin(t*4)*5;o+=`<rect width="1080" height="1920" fill="#000" opacity="${.45*ease((t-2.2)/.3)}" stroke="none"/><g transform="translate(540 980) scale(${1.6*k}) rotate(${-6+sw})"><path d="M0,-130 V-70" stroke-width="5"/><circle cx="0" cy="-134" r="8" fill="#999"/><rect x="-220" y="-70" width="440" height="190" rx="14" fill="#fffaf0"/><text x="0" y="0" font-size="44" fill="#2b1d16" text-anchor="middle" stroke="none">DONA DO CARRO:</text><text x="0" y="86" font-family="PM" font-size="70" fill="#c8402f" text-anchor="middle" stroke="none">DONA CIDA</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud3(87400,0);
};
// 5 · Turbo com a peça → VRUUUM
SH.b2turbo=(t,dur)=>{ const hud=hud3(87400,1>2?1:0);
  if(t<2.6) return noHud(()=>SH.e2turbo(t+.6,4)).replace('O DONO VAI PAGAR?','A DONA VAI PAGAR?')+hud;
  return noHud(()=>SH.e2motor(t-2.6+.5,5))+hud; };
// 6 · WhatsApp + PIX + 1.º cliente
SH.b2whats=(t,dur)=>{
  let s=noHud(()=>SH.e2whats(t,dur));
  const div=t>4.2?lerpDiv(87400,85900,t,4.2):87400;
  return s+hud3(div,t>4.6?1:0,t,0,4.6)+delta('−R$ 1.500','#2f9e6e',t,4.2)+(t>4.6?ono('+1 CLIENTE!',540,1560,t,4.6,'#5fe08a',-4,110):'');
};
// 7 · O banco liga → +R$ 2.000 + GLUP
SH.b2banco=(t,dur)=>{
  if(t>4.3) return caraNando(t-4.3,'preocupado','#c8402f','GLUP!',.05)+hud3(87900,1);
  let s=noHud(()=>SH.e2banco(t,dur));
  const div=t<2.8?85900:lerpDiv(85900,87900,t,2.8,.6);
  return s+hud3(div,1,t,t>2.8&&t<3.6?8:0)+delta('+R$ 2.000','#e0483a',t,2.8);
};
// 8 · Reviravolta: o Kléber
SH.b2kleber=(t,dur)=>{
  if(t>4.6){ let c=raios('#1f6fd6',t,900,.12); c+=kleber({x:540,y:900+1050*2.2,s:2.2,face:'raiva',pose:'normal'});
    const k=pop(t-4.6,.05); c+=`<g transform="translate(540 1500) scale(${k}) rotate(-4)"><rect x="-470" y="-130" width="940" height="260" rx="24" fill="#fff" stroke="#1b1420" stroke-width="10"/><text x="0" y="-22" font-size="66" fill="#1b1420" text-anchor="middle" stroke="none">A DONA CIDA É MÃE</text><text x="0" y="78" font-size="78" fill="#c8402f" text-anchor="middle" stroke="none">DO KLÉBER!</text></g>`;
    return c+hud3(87900,1); }
  let o=interior({});
  o+=corsa({x:250,y:1460,s:.8,dusty:false});
  o+=nando({x:330,y:1920,s:.74,face:t>.6?'choque':'normal',hold:null,pose:'normal'});
  const kx=800+500*(1-ease(t/.45));
  o+=kleber({x:kx,y:1900,s:.74,face:'raiva',pose:'aponta',flip:true});
  if(t<.5) for(let i=0;i<5;i++) o+=`<path d="M${kx+220},${1200+i*90} h200" stroke="#fff" stroke-width="10" opacity="${1-t*2}"/>`;
  o+=tag('KLÉBER · SPEEDFIX',780,860,t,.5,790,960);
  if(t>1.0){const k=pop(t,1.0);o+=`<g transform="translate(540 560) scale(${k}) rotate(-3)"><rect x="-480" y="-150" width="960" height="300" rx="60" fill="#fff"/><text x="0" y="-50" font-family="PM" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">VOCÊ TAVA COM O CARRO</text><text x="0" y="30" font-family="PM" font-size="60" fill="#c8402f" text-anchor="middle" stroke="none">DA MINHA MÃE</text><text x="0" y="110" font-family="PM" font-size="56" fill="#1b1420" text-anchor="middle" stroke="none">DESDE 2019?!</text><path d="M300,140 l40,110 l-150,-110" fill="#fff"/></g>`;}
  return cam(o,t,dur,1.0,1.05)+hud3(87900,1);
};
// 9 · Votação: PEDIR DESCULPA ✕ ENFRENTAR
SH.b2votacao=(t,dur)=>{
  let o=`<rect width="540" height="1920" fill="#2f9e6e" stroke="none"/><rect x="540" width="540" height="1920" fill="#c8402f" stroke="none"/>`;
  for(let k=0;k<12;k++){const a=k*0.52+t*.3; o+=`<path d="M540,960 L${540+Math.cos(a)*1600},${960+Math.sin(a)*1600} L${540+Math.cos(a+0.2)*1600},${960+Math.sin(a+0.2)*1600} Z" fill="#fff" opacity=".07" stroke="none"/>`;}
  const bk=pop(t,.1); o+=`<g transform="translate(540 330) scale(${bk}) rotate(-3) translate(-540 -330)"><rect x="150" y="270" width="780" height="110" rx="14" fill="#f6c744"/><text x="540" y="350" font-size="72" fill="#1f2340" text-anchor="middle" stroke="none">COMENTE UMA PALAVRA</text></g>`;
  const L=-600*(1-ease((t-.3)/.35)), R=600*(1-ease((t-.6)/.35));
  o+=`<g transform="translate(${L} 0)"><text x="270" y="540" font-size="80" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">DESCULPA</text><text x="270" y="596" font-size="34" fill="#d4f5e2" text-anchor="middle" stroke="none">perde o orgulho</text>`;
  const wv=Math.sin(t*5)*8; o+=`<g transform="rotate(${wv} 200 1000)"><path d="M200,1000 V660" stroke-width="16"/><path d="M200,1000 V660" stroke="#b97a45" stroke-width="8"/><path d="M206,670 Q300,640 380,680 Q300,720 380,770 Q300,740 206,770 Z" fill="#fff"/></g></g>`;
  o+=`<g transform="translate(${R} 0)"><text x="810" y="540" font-size="80" fill="#fff" text-anchor="middle" stroke="#1b1420" stroke-width="16" paint-order="stroke fill">ENFRENTAR</text><text x="810" y="596" font-size="34" fill="#fde2dd" text-anchor="middle" stroke="none">arrisca um processo</text>`;
  const pb=Math.sin(t*8)*14; o+=`<g transform="translate(${830+pb} 820) rotate(-20)"><path d="M-90,-60 Q-100,-120 -40,-120 H60 Q110,-120 110,-60 V40 Q110,90 60,90 H-50 Q-100,90 -96,40 Z" fill="#e0483a"/><path d="M-60,-110 V-30 M-10,-118 V-30 M40,-118 V-30" stroke-width="6"/><rect x="-80" y="90" width="150" height="70" rx="10" fill="#fff"/></g></g>`;
  const xp=1+0.12*Math.sin(t*6); o+=`<g transform="translate(540 780) scale(${xp}) translate(-540 -780)"><circle cx="540" cy="780" r="70" fill="#1f2340" stroke="#fff" stroke-width="8"/><text x="540" y="810" font-size="84" fill="#fff" text-anchor="middle" stroke="none">X</text></g>`;
  const look=Math.sin(t*2.2)*22;
  o+=`<g transform="translate(${look} 0) rotate(${look/8} 540 2060)">${nando({x:540,y:2060,s:.82,face:'preocupado',hold:null,pose:'cruzados'})}</g>`;
  return o+hud3(87900,1);
};
