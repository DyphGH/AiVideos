// ===== 2 FATOS (BR) — Minecraft vs Roblox (arte genérica, sem logos nem personagens dos jogos) =====
function mrCubo(x,y,s,top,left,right){ // cubo isométrico genérico
  const h=s*.5; return `<g transform="translate(${x} ${y})" stroke="${FK}" stroke-width="${Math.max(3,s*.05)}" stroke-linejoin="round"><path d="M0,${-h} L${s},0 L0,${h} L${-s},0 Z" fill="${top}"/><path d="M${-s},0 L0,${h} L0,${h+s*1.1} L${-s},${s*1.1} Z" fill="${left}"/><path d="M${s},0 L0,${h} L0,${h+s*1.1} L${s},${s*1.1} Z" fill="${right}"/></g>`; }
function mrBoneco(x,y,s,c,t,ph=0){ const b=Math.sin(t*6+ph)*4*s; return `<g transform="translate(${x} ${y+b}) scale(${s})" stroke="${FK}" stroke-width="5" stroke-linejoin="round"><rect x="-22" y="-92" width="44" height="40" rx="6" fill="#f2c39c"/><rect x="-12" y="-80" width="7" height="9" fill="${FK}" stroke="none"/><rect x="5" y="-80" width="7" height="9" fill="${FK}" stroke="none"/><rect x="-26" y="-52" width="52" height="46" rx="6" fill="${c}"/><rect x="-24" y="-6" width="22" height="34" rx="4" fill="#3a4a8e"/><rect x="2" y="-6" width="22" height="34" rx="4" fill="#3a4a8e"/></g>`; }
function mrNum(t,t0,t1,to,fmt){ const k=ease(clamp((t-t0)/(t1-t0),0,1)); return fmt(Math.round(to*k)); }
const fmtBR=n=>n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');
// tempos (acertados à voz)
const MRT={um:5.66, rb:8.4, num:10.19, jp:14.48, vs:17.06, end:20.2};
FP.mr_scene=(t)=>{ let s='', o='';
  if(t<MRT.um){ // pilha de cubos a crescer + contador
    const n=Math.min(40,Math.floor(t*12)); const C=[['#6fcf5a','#7a5230','#5e3e22'],['#8a8a8a','#6a6a6a','#555'],['#3fa8e0','#2d7fb0','#1f5e85'],['#e0b84a','#b88a2a','#946a1a']];
    for(let i=0;i<n;i++){ const row=Math.floor(i/8), col=i%8, x=230+col*90-row*45+((row%2)*45), y=1350-row*100-(col%2)*10; const c=C[(i*7)%4]; const k=pop(t,i/12,.15); s+=`<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})">${mrCubo(x,y,44,...c)}</g>`; }
    o+=`<g transform="translate(540 560)"><rect x="-380" y="-90" width="760" height="180" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="30" font-family="M" font-weight="900" font-size="96" fill="${FY}" text-anchor="middle">${mrNum(t,1.5,4.8,300000000,fmtBR)}+</text></g>`;
    if(t>2.0) o+=fStamp(t,2.0,540,760,'#1 MAIS VENDIDO DA HISTÓRIA','#e0483a',50,-4);
  } else if(t<MRT.rb){ // uma pessoa só
    s+=`<rect x="300" y="1200" width="480" height="30" rx="8" fill="#8a5a3c" stroke="${FK}" stroke-width="6"/><rect x="420" y="900" width="300" height="200" rx="14" fill="#222a44" stroke="${FK}" stroke-width="8"/><rect x="440" y="920" width="260" height="160" rx="6" fill="#3fa8e0"/><rect x="545" y="1100" width="50" height="100" fill="#555" stroke="${FK}" stroke-width="6"/>`;
    for(let i=0;i<Math.min(9,Math.floor((t-MRT.um)*5));i++) s+=mrCubo(480+(i%3)*40,1060-Math.floor(i/3)*40,18,'#6fcf5a','#7a5230','#5e3e22');
    s+=mrBoneco(360,1200,2.1,'#e0483a',t);
    o+=fStamp(t,MRT.um+.3,540,560,'1 PESSOA SÓ','#2e86d0',100,-4);
  } else if(t<MRT.jp){ // multidão a crescer
    const n=Math.min(60,Math.floor((t-MRT.rb)*14)); const cs=['#e0483a','#2e86d0','#2fa860',FY,'#ff7ab8','#a06ae0'];
    for(let i=0;i<n;i++){ const row=Math.floor(i/10), col=i%10; s+=mrBoneco(95+col*98+(row%2)*40,1600-row*120,.95,cs[(i*5)%6],t,i); }
    if(t>=MRT.num) o+=`<g transform="translate(540 560)"><rect x="-400" y="-110" width="800" height="220" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="-6" font-family="M" font-weight="900" font-size="96" fill="${FY}" text-anchor="middle">${mrNum(t,MRT.num,MRT.num+2.5,120000000,fmtBR)}+</text><text y="66" font-family="M" font-weight="900" font-size="50" fill="#fff" text-anchor="middle">TODO SANTO DIA</text></g>`;
    else o+=fStamp(t,MRT.rb+.2,540,560,'OUTRO RECORDE','#e0483a',90,-4);
  } else if(t<MRT.vs){ // Japão inteiro
    const jp='M720,560 Q790,600 780,700 Q760,800 700,880 Q660,960 610,1030 Q560,1110 480,1150 Q410,1190 350,1260 Q300,1300 260,1280 Q280,1230 340,1190 Q420,1120 470,1060 Q520,980 560,900 Q600,820 630,740 Q650,640 720,560 Z M250,1320 Q290,1330 300,1380 Q270,1420 230,1400 Q215,1350 250,1320 Z M760,440 Q830,420 860,470 Q840,520 780,520 Q740,490 760,440 Z';
    s+=`<g transform="translate(540 950) scale(1.3) translate(-540 -880)"><path d="${jp}" fill="#f4f4f4" stroke="${FK}" stroke-width="10"/><clipPath id="jpc"><path d="${jp}"/></clipPath><g clip-path="url(#jpc)">`;
    const fill=ease(clamp((t-MRT.jp)/1.6,0,1));
    for(let i=0;i<120;i++){ const x=200+(i*53)%700, y=420+((i*97)%1000); if(i/120<fill) s+=`<circle cx="${x}" cy="${y}" r="16" fill="${['#e0483a','#2e86d0','#2fa860',FY][i%4]}" stroke="${FK}" stroke-width="3"/>`; }
    s+=`</g><circle cx="610" cy="900" r="40" fill="#e0483a" opacity=".9"/></g>`;
    o+=fStamp(t,MRT.jp+.2,540,330,'≈ JAPÃO INTEIRO','#e0483a',84,-4);
  } else { // VS
    const sh=Math.sin(t*20)*3;
    s+=`<rect x="0" y="0" width="540" height="1920" fill="#2fa860" opacity=".35"/><rect x="540" y="0" width="540" height="1920" fill="#e0483a" opacity=".35"/>`;
    s+=mrCubo(270,880,150,'#6fcf5a','#7a5230','#5e3e22')+mrBoneco(810,1180,3.2,'#e0483a',t);
    o+=`<path d="M560,${600+sh} L500,960 L580,960 L520,1320 L640,880 L560,880 L620,600 Z" fill="${FY}" stroke="${FK}" stroke-width="8"/>`;
    o+=`<g transform="translate(540 1000) scale(${pop(t,MRT.vs,.25)})"><circle r="90" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="30" font-family="M" font-weight="900" font-size="80" fill="${FY}" text-anchor="middle">VS</text></g>`;
    o+=fTxt(270,560,'TIME',70,'#fff')+fTxt(270,650,'MINECRAFT',64,'#7be08a')+fTxt(810,560,'TIME',70,'#fff')+fTxt(810,650,'ROBLOX',72,'#ff8a8a');
    if(t>19.5) o+=fStamp(t,19.5,540,1290,'COMENTA!','#2e86d0',90,-4); }
  return {s,o}; };
