// ===== 2 FATOS (BR) — A bandeira é uma foto do céu (15/11/1889) =====
const BD={g:'#009c3b',y:'#ffdf00',b:'#002776',w:'#ffffff'};
// estrelas (aprox.) em coordenadas do círculo (-1..1), tamanho 1..5
// [x, y, tamanho, sigla] — posições aproximadas por constelação (Cão Menor/Maior à esquerda, Cruzeiro ao centro, Escorpião à direita)
const BDS=[[-.72,.05,4,'AM'],[-.55,.32,5,'MT',1],[-.74,.33,3,'AP'],[-.48,.14,2,'RO'],[-.4,.48,3,'RR'],[-.56,.56,3,'TO'],[-.3,.74,5,'GO'],
 [.12,.1,3,'MS'],[.32,.06,2,'AC'],[.0,.72,4,'SP'],[-.02,.26,3,'BA'],[.18,.47,3,'RJ'],[-.2,.45,2,'MG'],[.07,.57,1.6,'ES'],
 [.6,.2,4,'PI'],[.74,.07,2,'MA'],[.58,.37,2,'CE'],[.52,.5,2,'PE'],[.66,.64,2,'AL'],[.74,.52,2,'SE'],[.86,.7,2,'PB'],[.88,.36,2,'RN'],
 [.38,.64,3,'RS'],[.48,.8,2,'SC'],[.3,.84,2,'PR'],[.1,.94,1.6,'DF']];
const BDPARA=[-.12,-.55,4];
function bdStar(x,y,r,c){ let d=''; for(let k=0;k<10;k++){const rr=k%2?r*.42:r,a=(k*36-90)*Math.PI/180;d+=(k?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+','+(y+Math.sin(a)*rr).toFixed(1);} return `<path d="${d}Z" fill="${c||'#fff'}"/>`; }
function bdFlag(cx,cy,W,{tw=0,para=0,band=true}={}){ const H=W*.7,x0=cx-W/2,y0=cy-H/2,m=W*.085,R=W*.175;
  let o=`<rect x="${x0}" y="${y0}" width="${W}" height="${H}" rx="${W*.02}" fill="${BD.g}"/>`;
  o+=`<path d="M${cx},${y0+m} L${x0+W-m},${cy} L${cx},${y0+H-m} L${x0+m},${cy} Z" fill="${BD.y}"/>`;
  o+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${BD.b}"/><clipPath id="bdc${Math.round(W)}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><g clip-path="url(#bdc${Math.round(W)})">`;
  if(band) o+=`<path d="M${cx-R*1.3},${cy+R*.05} Q${cx},${cy-R*.75} ${cx+R*1.3},${cy+R*.25}" fill="none" stroke="#fff" stroke-width="${R*.2}"/><path id="bdArc${Math.round(W)}" d="M${cx-R*.95},${cy-R*.1} Q${cx},${cy-R*.62} ${cx+R*.95},${cy+R*.06}" fill="none"/><text font-family="M" font-weight="900" font-size="${R*.13}" fill="${BD.g}" letter-spacing="${R*.01}"><textPath href="#bdArc${Math.round(W)}" startOffset="50%" text-anchor="middle">ORDEM E PROGRESSO</textPath></text>`;
  BDS.forEach(([a,b,s],i)=>{ const k=1+tw*.35*Math.sin(i*1.7+tw*9); o+=bdStar(cx+a*R,cy+b*R,R*.011*s*k); });
  const [pa,pb,ps]=BDPARA; o+=bdStar(cx+pa*R,cy+pb*R,R*.013*ps*(1+para*(.5+.3*Math.sin(tw*12))),para?BD.y:'#fff');
  return o+`</g>`; }
function bdRio(y,s=1){ // silhueta: Pão de Açúcar + Corcovado com Cristo
  return `<g transform="translate(0 ${y}) scale(1 ${s})"><path d="M-20,260 L-20,120 Q80,40 160,110 Q230,-60 330,90 Q380,140 430,130 Q560,40 640,120 Q720,-140 800,40 Q840,60 860,-10 Q880,-120 930,-20 Q980,60 1100,110 L1100,260 Z" fill="#071233"/>
  <g transform="translate(896 -118)"><rect x="-4" y="0" width="8" height="40" fill="#071233"/><rect x="-26" y="8" width="52" height="7" fill="#071233"/><circle cy="-5" r="6" fill="#071233"/></g>
  ${[...Array(26)].map((_,i)=>`<circle cx="${(i*41+13)%1080}" cy="${200+(i*17)%50}" r="3" fill="#ffd27a" opacity=".8"/>`).join('')}</g>`; }
function bdBolo(x,y,s,t){ const f=1+.15*Math.sin(t*20); return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="6" stroke-linejoin="round"><path d="M-110,0 h220 v80 q-110,24 -220,0 Z" fill="#ff9ec4"/><path d="M-110,0 q20,26 40,0 q20,26 40,0 q20,26 40,0 q20,26 40,0 q20,26 40,0 q20,26 30,0" fill="#fff"/><path d="M-80,-70 h160 v70 h-160 Z" fill="#ffd3e4"/><rect x="-6" y="-120" width="12" height="50" fill="#7fe3ff"/><path d="M0,${-150*f} q14,16 0,28 q-14,-12 0,-28 Z" fill="${FY}" stroke="#ff8a1f" stroke-width="4"/><text y="56" font-family="M" font-weight="900" font-size="36" fill="${FK}" stroke="none" text-anchor="middle">137</text></g>`; }
function bdMapa(t,n,{cx=540,cy=860,R=420,para=0}={}){ let o=`<circle cx="${cx}" cy="${cy}" r="${R+14}" fill="${BD.y}" stroke="${FK}" stroke-width="8"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="${BD.b}"/>`;
  o+=`<path d="M${cx-R*.98},${cy-R*.12} Q${cx},${cy-R*.72} ${cx+R*.98},${cy+R*.1}" fill="none" stroke="#fff" stroke-width="${R*.16}" opacity=".9"/>`;
  BDS.forEach(([a,b,sz,lb,dd],i)=>{ const x=cx+a*R, y=cy+b*R, r=sz*7*(1+.15*Math.sin(t*4+i)); o+=bdStar(x,y,r);
    if(i<n){ const dir=dd||(a<0?-1:1), lx=x+dir*(r+8), ly=y; const w=lb.length*22+16;
      o+=`<path d="M${x+dir*r*.8},${y} l${dir*10},0" stroke="${FY}" stroke-width="4"/><g transform="translate(${lx+dir*(w/2+10)} ${ly})"><path d="M${-dir*(w/2)},0 l${-dir*10},-8 v16 Z" fill="${FY}"/><rect x="${-w/2}" y="-17" width="${w}" height="34" rx="10" fill="${FY}" stroke="${FK}" stroke-width="3"/><text y="11" font-family="M" font-weight="900" font-size="26" fill="${FK}" text-anchor="middle">${lb}</text></g>`; } });
  const [pa,pb,ps]=BDPARA, px=cx+pa*R, py=cy+pb*R; o+=bdStar(px,py,ps*8*(1+para*.4*Math.sin(t*10)),para?BD.y:'#fff');
  if(n>=27){ o+=`<path d="M${px+22},${py-14} L${px+52},${py-40}" stroke="${FY}" stroke-width="4"/><g transform="translate(${px+86} ${py-48})"><rect x="-34" y="-20" width="68" height="40" rx="12" fill="${FY}" stroke="${FK}" stroke-width="4"/><text y="13" font-family="M" font-weight="900" font-size="30" fill="${FK}" text-anchor="middle">PA</text></g>`; }
  return o; }
// tempos (acertar à voz)
const BDT={ceu:2.41, hoje:10.78, estados:12.67, para:14.33, paraN:17.42, cast:18.28, avesso:19.97, fim:26.0};
FP.bd_scene=(t)=>{ let s='', o='';
  if(t<BDT.ceu){ // a bandeira vira foto (polaroid + flash)
    const k=ease(clamp(t/.6,0,1)); s+=`<g transform="translate(540 980) rotate(${-4+2*Math.sin(t*2)})"><rect x="-430" y="-360" width="860" height="760" rx="16" fill="#fffdf6" stroke="${FK}" stroke-width="8"/><g transform="translate(-540 -1020)">${bdFlag(540,980,780,{tw:t})}</g><text y="350" font-family="M" font-weight="900" font-size="44" fill="${FK}" text-anchor="middle">CÉU DO RIO · 1889</text></g>`;
    o+=`<g transform="translate(870 600) rotate(12) scale(${pop(t,.3,.25)})"><rect x="-90" y="-60" width="180" height="120" rx="20" fill="#2a2a3a" stroke="${FK}" stroke-width="6"/><circle r="38" fill="#4a4a6a" stroke="#fff" stroke-width="6"/><circle r="18" fill="#7fe3ff"/><rect x="40" y="-80" width="36" height="20" rx="6" fill="#2a2a3a"/></g>`;
  } else if(t<BDT.estados){ // céu do Rio de madrugada
    const u=t-BDT.ceu; let k2=`<defs><linearGradient id="bdSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040a24"/><stop offset=".7" stop-color="#10245e"/><stop offset="1" stop-color="#3a4a8e"/></linearGradient></defs><rect width="1080" height="1920" fill="url(#bdSky)"/>`;
    k2+=`<g transform="translate(540 820) scale(${1+u*.02}) translate(-540 -820)">`;
    BDS.forEach(([a,b,sz],i)=>{ const tw=.6+.4*Math.sin(t*3+i); k2+=`<g opacity="${tw}">${bdStar(540+a*430,760+b*430,sz*6.5)}</g>`; });
    k2+=bdStar(540+BDPARA[0]*430,760+BDPARA[1]*430,26)+`</g>`+bdRio(1180); o+=k2;
    o+=`<g transform="translate(540 560) scale(${pop(t,BDT.ceu+.4,.25)})"><rect x="-300" y="-60" width="600" height="120" rx="24" fill="#fffdf6" stroke="${FK}" stroke-width="8"/><text y="20" font-family="M" font-weight="900" font-size="58" fill="${FK}" text-anchor="middle">15/11/1889</text></g>`;
    if(t>=BDT.hoje){ o+=bdBolo(540,1520,1.3,t)+fStamp(t,BDT.hoje+.2,540,1330,'HOJE FAZ 137 ANOS!','#e0483a',60,-4);
      for(let i=0;i<14;i++){ const p=((t-BDT.hoje)*.8+i/14)%1; o+=`<rect x="${(i*157)%1080}" y="${-40+p*1960}" width="18" height="30" fill="${['#ffd21f','#ff7ab8','#7fe3ff','#009c3b'][i%4]}" transform="rotate(${p*720+i*30} ${(i*157)%1080+9} ${-40+p*1960+15})"/>`; } }
  } else if(t<BDT.avesso){ // estados + Pará de castigo
    const z=t<BDT.para?1:1+.35*ease(clamp((t-BDT.para)/.6,0,1));
    s+=`<g transform="translate(540 980) scale(${z}) translate(${-540+ (t<BDT.para?0:60*ease(clamp((t-BDT.para)/.6,0,1)))} -980)">${bdFlag(540,980,1000,{tw:t,para:t>=BDT.para?1:0})}</g>`;
    if(t<BDT.para){ const n=Math.min(27,Math.floor((t-BDT.estados)*20)); s=bdMapa(t,n); o+=fStamp(t,BDT.estados+.1,540,330,'CADA ESTRELA = 1 ESTADO','#e0483a',56,-3); if(false) o+=`<g transform="translate(540 560)">${fTxt(0,0,'27 ESTRELAS',90,'#fff')}${fTxt(0,100,'= 26 ESTADOS + DF',56,FY)}</g>`; }
    else { const px=540+(BDPARA[0]*175)*z+60, py=980+BDPARA[1]*175*z; const b=Math.sin(t*3)*4;
      if(t>BDT.cast) o+=`<g transform="translate(${px+20} ${py-70+b})"><path d="M-34,0 L0,-90 L34,0 Z" fill="#fff" stroke="${FK}" stroke-width="6"/><text y="-14" font-family="M" font-weight="900" font-size="26" fill="${FK}" text-anchor="middle">CASTIGO</text></g>`;
      if(t>=BDT.paraN) o+=fStamp(t,BDT.paraN,540,560,'PARÁ','#2e86d0',110,-4); else o+=`<g transform="translate(540 560)">${fTxt(0,0,'A SOZINHA',90,'#fff')}${fTxt(0,100,'LÁ EM CIMA',70,FY)}</g>`; if(t>BDT.cast) o+=`<g transform="translate(540 420)">${fTxt(0,0,'TÁ DE CASTIGO? 😅'.replace(' 😅',''),64,'#fff')}</g>`; }
  } else { // céu ao contrário: visto de fora do universo
    const u=t-BDT.avesso, sp=u*.6;
    s+=`<g transform="translate(540 1000)"><circle r="360" fill="#0b1b4a" stroke="#7fe3ff" stroke-width="6"/><ellipse rx="360" ry="90" fill="none" stroke="#7fe3ff" stroke-width="3" opacity=".5"/><path d="M0,-360 A140,360 0 0 1 0,360" fill="none" stroke="#7fe3ff" stroke-width="3" opacity=".5" transform="rotate(${sp*40})"/>`;
    BDS.forEach(([a,b,sz],i)=>{ s+=bdStar(-a*260,b*260-80,sz*5); });
    s+=`<circle cx="0" cy="80" r="40" fill="#3fa860" stroke="${FK}" stroke-width="5"/></g>`;
    // ETzinho lá fora a olhar
    const ex=880+10*Math.sin(t*2), ey=620; s+=`<g transform="translate(${ex} ${ey}) rotate(-12)"><ellipse cy="60" rx="70" ry="80" fill="#7be08a" stroke="${FK}" stroke-width="6"/><ellipse cx="-24" cy="40" rx="20" ry="26" fill="${FK}"/><ellipse cx="24" cy="40" rx="20" ry="26" fill="${FK}"/><circle cx="-18" cy="32" r="6" fill="#fff"/><circle cx="30" cy="32" r="6" fill="#fff"/><path d="M-30,-14 l-16,-40 M30,-14 l16,-40" stroke="${FK}" stroke-width="6"/><circle cx="-46" cy="-56" r="10" fill="${FY}" stroke="${FK}" stroke-width="5"/><circle cx="46" cy="-56" r="10" fill="${FY}" stroke="${FK}" stroke-width="5"/><path d="M-20,92 q20,12 40,0" fill="none" stroke="${FK}" stroke-width="6"/></g>`;
    o+=`<path d="M780,680 Q680,760 640,860" fill="none" stroke="${FY}" stroke-width="10" stroke-dasharray="20 14" stroke-linecap="round"/><path d="M640,860 l-6,-40 l36,18 Z" fill="${FY}"/>`;
    o+=fStamp(t,BDT.avesso+.2,540,500,'CÉU AO CONTRÁRIO','#e0483a',74,-4);
    if(t>=BDT.fim){ s=bdMapa(t,27,{para:1}); o=`<g transform="translate(540 300) scale(${pop(t,BDT.fim,.25)})"><rect x="-430" y="-80" width="860" height="160" rx="80" fill="#e0483a" stroke="${FK}" stroke-width="8"/><rect x="-370" y="-38" width="22" height="76" rx="6" fill="#fff"/><rect x="-336" y="-38" width="22" height="76" rx="6" fill="#fff"/><text x="40" y="-4" font-family="M" font-weight="900" font-size="60" fill="#fff" text-anchor="middle">PAUSA AQUI</text><text x="40" y="52" font-family="M" font-weight="900" font-size="40" fill="${FY}" text-anchor="middle">ACHA O SEU ESTADO</text></g>`; }
  }
  return {s,o}; };
