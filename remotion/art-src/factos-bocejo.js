// ===== 2 FACTOS — "Aposto que vais fazer isto agora" (4.º dedo do pé + bocejo) =====
function hookBoc(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="68" fill="${FK}" text-anchor="middle" stroke="none">APOSTO QUE VAIS</text><text x="540" y="318" font-family="M" font-weight="900" font-size="68" fill="#e0483a" text-anchor="middle" stroke="none">FAZER ISTO AGORA</text></g>`; }
// pé descalço visto de cima (dedos para cima). lift[i] = deslocação de cada dedo (0..1), red = índice destacado
function peCima(t,lift,{red=3,xray=0}={}){
  const SK='#f1c49d', SH='#d99d75', NL='#fbe6dc', W=8;
  let o=`<g stroke="${FK}" stroke-width="${W}" stroke-linejoin="round" stroke-linecap="round">`;
  // perna/tornozelo
  o+=`<path d="M380,1920 L400,1580 Q410,1480 470,1460 L650,1460 Q720,1480 730,1580 L760,1920 Z" fill="${SK}"/>`;
  o+=`<path d="M680,1920 L700,1600 Q700,1500 650,1470 L700,1500 Q740,1560 760,1920 Z" fill="${SH}" stroke="none"/>`;
  // planta / peito do pé
  o+=`<path d="M330,1520 Q300,1250 340,1060 Q370,960 460,940 L760,930 Q850,950 860,1060 Q880,1240 800,1520 Z" fill="${SK}"/>`;
  o+=`<path d="M780,1500 Q850,1260 830,1080 Q820,990 770,960 Q860,980 860,1080 Q880,1250 800,1520 Z" fill="${SH}" stroke="none"/>`;
  // tendões (raio-x)
  if(xray>0){ o+=`<rect x="300" y="900" width="600" height="700" fill="#0b1b3a" opacity="${.55*xray}" stroke="none"/>`;
    for(const [x,c] of [[400,'#9fd6ff'],[505,'#9fd6ff'],[600,'#ff5a4a'],[690,'#ff5a4a'],[770,'#ff5a4a']]) o+=`<path d="M${x},860 Q${x+10},1200 ${560+(x-560)*.3},1560" fill="none" stroke="${c}" stroke-width="10" opacity="${xray}"/>`;
    o+=`<path d="M600,1240 Q690,1270 770,1240" fill="none" stroke="#ff5a4a" stroke-width="12" opacity="${xray}"/>`; }
  // dedos: polegar grande + 4
  const toes=[[395,790,72,190],[518,770,56,160],[620,790,50,145],[712,820,46,128],[792,860,40,110]];
  toes.forEach(([x,y,r,h],i)=>{ const dy=-lift[i]*38, rot=lift[i]*(i-2)*3;
    const col=i===red?'#ffb3a7':SK;
    o+=`<g transform="translate(0 ${dy}) rotate(${rot} ${x} ${y+h})"><path d="M${x-r},${y+h+40} L${x-r},${y} Q${x-r},${y-r} ${x},${y-r} Q${x+r},${y-r} ${x+r},${y} L${x+r},${y+h+40} Z" fill="${col}"/>`;
    o+=`<path d="M${x-r*.55},${y-r*.1} Q${x},${y-r*.75} ${x+r*.55},${y-r*.1} Q${x},${y+r*.25} ${x-r*.55},${y-r*.1} Z" fill="${NL}" stroke-width="4"/>`;
    o+=`<path d="M${x-r*.6},${y+h*.55} q${r*.6},10 ${r*1.2},0" fill="none" stroke-width="3.5" opacity=".7"/></g>`;
    if(i===red){ const p=.5+.5*Math.sin(t*7); o+=`<circle cx="${x}" cy="${y+dy+h*.3}" r="${r+30+p*10}" fill="none" stroke="#e0483a" stroke-width="10" opacity="${.5+.5*p}"/>`; }
  });
  return o+`</g>`;
}
// 1.º facto (0 – 9,1 s)
FP.boc_pe=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1100);
  // 5,03 s "não dá": tentam o 4.º, mexem 3.º/4.º/5.º juntos
  const tryIt=t>=2.3&&t<5.0? Math.max(0,Math.sin((t-2.3)*9))*.6 : 0;
  const fail=t>=5.03? Math.max(0,Math.sin((t-5.03)*8)) : 0;
  const lift=[0,0, fail*.8, tryIt+fail, fail*.8];
  const xr=ease(clamp((t-6.6)/.5,0,1));
  o+=`<g transform="translate(540 1350) scale(1.2) translate(-540 -1300)">`+peCima(t,lift,{red:3,xray:xr})+`</g>`;
  if(t<5.03){ o+=`<g transform="translate(820 520) rotate(-8)"><rect x="-210" y="-60" width="420" height="120" rx="24" fill="#e0483a" stroke="${FK}" stroke-width="8"/><text x="0" y="22" font-family="M" font-weight="900" font-size="58" fill="#fff" text-anchor="middle" stroke="none">SÓ ESTE!</text></g>`;
    o+=`<path d="M${820+Math.sin(t*6)*8},590 Q800,680 760,720" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="18 12"/>`; }
  if(t>=5.03) o+=fStamp(t,5.03,540,480,'FALHOU!','#e0483a',130,-8);
  if(t>=6.6) o+=fTxt(540,640,'TENDÕES LIGADOS',70,'#ff5a4a');
  return o+hookBoc(t,2.3)+(t>2.3?fPill('FACTO 1/2',t-2.3):'');
};
// ponte sussurrada (9,1 – 12,0)
FP.boc_ponte=(t,dur)=>{ const z=1+ease(t/dur)*.15;
  return `<rect width="1080" height="1920" fill="#05060f" stroke="none"/><g transform="translate(540 960) scale(${z}) translate(-540 -960)">${fTxt(540,880,'O 2.º FACTO',120,'#fff')}${fTxt(540,1040,'VAIS FAZER',120,'#e0483a')}${fTxt(540,1180,'SEM QUERER',120,'#e0483a')}</g>`; };
// cara a bocejar (a = abertura 0..1)
function caraBoc(a,t){
  const SK='#f1c49d', SH='#d99d75';
  let o=`<g stroke="${FK}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">`;
  o+=`<path d="M200,1900 Q220,1560 540,1540 Q860,1560 880,1900 Z" fill="#2f6fb3"/>`;
  o+=`<rect x="470" y="1380" width="140" height="200" fill="${SK}"/>`;
  o+=`<ellipse cx="540" cy="1000" rx="330" ry="${400+a*30}" fill="${SK}"/>`;
  o+=`<path d="M220,820 Q260,560 540,560 Q820,560 860,820 Q760,700 540,700 Q320,700 220,820 Z" fill="#3b2a20"/>`;
  o+=`<ellipse cx="215" cy="1000" rx="40" ry="70" fill="${SK}"/><ellipse cx="865" cy="1000" rx="40" ry="70" fill="${SK}"/>`;
  // olhos: fecham a bocejar
  const e=1-a*.9; for(const x of [420,660]){ if(e<.25) o+=`<path d="M${x-55},${900} q55,${24} 110,0" fill="none" stroke-width="12"/>`; else o+=`<ellipse cx="${x}" cy="900" rx="48" ry="${52*e}" fill="#fff"/><circle cx="${x}" cy="${905}" r="${18*e}" fill="${FK}" stroke="none"/>`; }
  o+=`<path d="M350,${830-a*20} q70,${-20-a*10} 140,0 M590,${830-a*20} q70,${-20-a*10} 140,0" fill="none" stroke-width="14"/>`;
  if(a>.6) o+=`<path d="M${330},935 q-10,30 6,52" fill="none" stroke="#8fd3f4" stroke-width="10"/>`; // lagrimazinha
  o+=`<path d="M520,960 q20,40 0,60" fill="none" stroke-width="8"/>`;
  // boca
  const mh=20+a*230, mw=70+a*60;
  o+=`<ellipse cx="540" cy="${1150+a*20}" rx="${mw}" ry="${mh/2}" fill="#5a1f22"/>`;
  if(a>.3) o+=`<ellipse cx="540" cy="${1150+a*20+mh*.28}" rx="${mw*.6}" ry="${mh*.16}" fill="#e0707a" stroke="none"/>`;
  return o+`</g>`;
}
// 2.º facto (12,0 – 22,3)  bocejos aos ~0,1 s e ~7,2 s locais (12,1 e 19,2 globais)
FP.boc_bocejo=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const yawn=(t0,d=1.9)=>{const x=(t-t0)/d; return x<0||x>1?0:Math.sin(Math.PI*x)**.7;};
  const a=Math.max(yawn(0.05,2.2),yawn(7.15,2.4));
  o+=`<g transform="translate(540 1100) scale(${.85+a*.05}) translate(-540 -1100)">`+caraBoc(a,t)+`</g>`;
  // palavra BOCEJO a crescer durante "ou até ler a palavra bocejo" (~5,5 s locais)
  if(t>4.8&&t<7.2){ const k=ease(clamp((t-4.8)/1.6,0,1)); o+=`<g transform="translate(540 480) scale(${.6+k*.8})">${fTxt(0,0,'BOCEJO',150,FY)}</g>`; }
  const n=(t>=0.05?1:0)+(t>=7.15?1:0);
  o+=`<g transform="translate(860 480) rotate(6)"><rect x="-170" y="-60" width="340" height="120" rx="22" fill="#fffaf0" stroke="${FK}" stroke-width="8"/><text x="0" y="-10" font-family="M" font-weight="900" font-size="34" fill="${FK}" text-anchor="middle" stroke="none">BOCEJOS</text><text x="0" y="44" font-family="M" font-weight="900" font-size="56" fill="#e0483a" text-anchor="middle" stroke="none">${n}</text></g>`;
  if(t>7.2) o+=fTxt(540,640,'METADE DAS PESSOAS',72,'#fff')+fTxt(540,730,'BOCEJA TAMBÉM',72,FY);
  return o+fPill('FACTO 2/2',t);
};
// fim (22,3 – fim)
FP.boc_fim=(t,dur)=>{
  if(t>dur-.35) return FP.boc_pe(0.1,9.1);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const k=pop(t,0); o+=`<g transform="translate(540 700) scale(${k})">${fTxt(0,0,'BOCEJASTE?',140,FY)}</g>`;
  o+=`<g transform="translate(540 1050) rotate(${Math.sin(t*3)*4})"><text x="0" y="60" font-size="220" text-anchor="middle">🥱</text></g>`;
  if(t>.9) o+=fTxt(540,1350,'COMENTA!',110,'#fff');
  if(t>2.0){ const p=pop(t,2.0); o+=`<g transform="translate(540 1600) scale(${p})"><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${FY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle" stroke="none">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle" stroke="none">HÁ MAIS 2 FACTOS</text></g>`; }
  return o;
};
