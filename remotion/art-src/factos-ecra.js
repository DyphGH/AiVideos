// ===== 2 FATOS (BR) — Porque é que o ecrã só sente o dedo (ecrã capacitivo) =====
const EC={body:'#1b2140',scr1:'#3a4fb8',scr2:'#17204e',line1:'#7fe3ff',line2:'#ffd21f',ok:'#2fa860',no:'#e0483a'};
// tempos (acertados à voz)
const ECT={nada:1.52, dedo:2.21, toca:3.2, func:3.5, grade:4.45, corpo:8.31, rouba:10.68, sente:12.58, scan:15.5, nao:19.1, unha:19.9, luva:20.55, caneta:21.1, sals:22.39, funcS:23.2, ban:24.27, sim:26.3, end:27.9};
function ecIcons(t,t0,cx,cy,w,h){ if(t<t0) return ''; let o=''; const C=['#ff7a59','#2fa860','#3fa8e0','#ffd21f','#ff7ab8','#a06ae0','#e0483a','#2e86d0','#6fcf5a','#ff8a1f','#7fe3ff','#f2c39c'];
  for(let i=0;i<12;i++){ const c=i%3, r=Math.floor(i/3), x=cx-w*.3+c*w*.3, y=cy-h*.28+r*h*.17, k=pop(t,t0+i*.03,.22), s=w*.2;
    o+=`<g transform="translate(${x} ${y}) scale(${k})"><rect x="${-s/2}" y="${-s/2}" width="${s}" height="${s}" rx="${s*.26}" fill="${C[i]}" stroke="${FK}" stroke-width="5"/><circle cx="${-s*.15}" cy="${-s*.15}" r="${s*.12}" fill="#fff" opacity=".45"/></g>`; }
  return o; }
// telemóvel de frente. lit=t em que o ecrã acende (ou 1e9)
function ecPhone(t,cx,cy,s,lit=1e9,q=false){ const w=520*s, h=1000*s; let o=`<g>`;
  o+=`<rect x="${cx-w/2-14*s}" y="${cy-h/2-14*s}" width="${w+28*s}" height="${h+28*s}" rx="${80*s}" fill="${EC.body}" stroke="${FK}" stroke-width="10"/>`;
  o+=`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${66*s}" fill="url(#ecScr)"/>`;
  o+=`<rect x="${cx-70*s}" y="${cy-h/2+18*s}" width="${140*s}" height="${38*s}" rx="${19*s}" fill="${FK}"/>`;
  if(t<lit){ o+=`<text x="${cx}" y="${cy-h*.22}" font-family="M" font-weight="900" font-size="${130*s}" fill="#fff" opacity=".85" text-anchor="middle">12:30</text>`;
    if(q) o+=`<text x="${cx}" y="${cy+h*.15}" font-family="M" font-weight="900" font-size="${300*s}" fill="${FY}" stroke="${FK}" stroke-width="12" paint-order="stroke" text-anchor="middle">?</text>`; }
  else { o+=`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${66*s}" fill="#fff" opacity="${.5*(1-ease((t-lit)/.4))}"/>`+ecIcons(t,lit,cx,cy,w,h); }
  o+=`<path d="M${cx-w/2+30*s},${cy-h/2+90*s} L${cx-w/2+150*s},${cy-h/2+20*s} L${cx-w/2+230*s},${cy-h/2+20*s} L${cx-w/2+30*s},${cy-h/2+260*s} Z" fill="#fff" opacity=".10"/>`;
  return o+`</g>`; }
// dedo visto de trás (unha à vista). ponta em (tx,ty), ang = direção para onde aponta (graus, 0 = para cima)
function ecDedo(tx,ty,ang,s=1,{glove=false,glow=0}={}){ const sk=glove?'#3fa8e0':LG.sk, skD=glove?'#2d7fb0':LG.skD, skL=glove?'#9fdcff':LG.skL;
  let o=`<g transform="translate(${tx} ${ty}) rotate(${ang}) scale(${s})" stroke-linejoin="round">`;
  o+=`<path d="M-78,1100 L-78,70 Q-78,-12 0,-12 Q78,-12 78,70 L78,1100 Z" fill="${sk}" stroke="${FK}" stroke-width="10"/>`;
  o+=`<path d="M-50,1100 L-50,90 Q-50,30 -20,20" fill="none" stroke="${skL}" stroke-width="18" opacity=".6" stroke-linecap="round"/>`;
  for(const y of [300,560]) o+=`<path d="M-40,${y} q40,-16 80,0 M-30,${y+22} q30,-10 60,0" fill="none" stroke="${skD}" stroke-width="7" stroke-linecap="round"/>`;
  if(!glove) o+=`<rect x="-50" y="8" width="100" height="130" rx="40" fill="#ffd3d8" stroke="${skD}" stroke-width="6"/><path d="M-46,30 Q0,0 46,30" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/><ellipse cx="-16" cy="80" rx="12" ry="30" fill="#fff" opacity=".5"/>`;
  else o+=`<path d="M-78,980 L78,980 L78,1100 L-78,1100 Z" fill="${skD}"/>`;
  if(glow>0) o+=`<path d="M-78,1100 L-78,70 Q-78,-12 0,-12 Q78,-12 78,70 L78,1100 Z" fill="${FY}" opacity="${glow*.35}"/>`;
  return o+`</g>`; }
function ecRipple(t,t0,x,y,col=FY,sc=1){ if(t<t0) return ''; let o=''; for(let i=0;i<3;i++){ const p=((t-t0)*1.4+i/3)%1; o+=`<ellipse cx="${x}" cy="${y}" rx="${(30+p*160)*sc}" ry="${(30+p*160)*sc*.9}" fill="none" stroke="${col}" stroke-width="${10*(1-p)+2}" opacity="${1-p}"/>`; } return o; }
function ecX(t,t0,x,y,r=80){ if(t<t0) return ''; const k=pop(t,t0,.2); return `<g transform="translate(${x} ${y}) scale(${k}) rotate(-8)"><circle r="${r}" fill="${EC.no}" stroke="${FK}" stroke-width="8"/><path d="M${-r*.4},${-r*.4} L${r*.4},${r*.4} M${r*.4},${-r*.4} L${-r*.4},${r*.4}" stroke="#fff" stroke-width="${r*.22}" stroke-linecap="round"/></g>`; }
function ecOk(t,t0,x,y,r=80){ if(t<t0) return ''; const k=pop(t,t0,.2); return `<g transform="translate(${x} ${y}) scale(${k}) rotate(-8)"><circle r="${r}" fill="${EC.ok}" stroke="${FK}" stroke-width="8"/><path d="M${-r*.45},0 L${-r*.1},${r*.35} L${r*.5},${-r*.35}" fill="none" stroke="#fff" stroke-width="${r*.22}" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
// projeção isométrica do plano do ecrã
function ecIsoK(k){ return {a:45*k, sy:1-.45*k}; }
function ecProj(x,y,k,cx=540,cy=930,s=.95){ const {a,sy}=ecIsoK(k), r=a*Math.PI/180; const X=(x*Math.cos(r)-y*Math.sin(r))*s, Y=(x*Math.sin(r)+y*Math.cos(r))*s*sy; return [cx+X,cy+Y]; }
// ecrã com grade (coordenadas locais centradas, 520x1000). tch=[x,y] toque local, dr=0..1 roubo, scanR = linha em varrimento
const ECG={cols:6,rows:11};
function ecGrade(t,k,{glass=0,tch=null,dr=0,nums=false,scanR=-1,ring=0}={}){ const {a,sy}=ecIsoK(k); const W=520,H=1000; let s='',o='';
  const T=`translate(540 930) scale(.95) scale(1 ${sy}) rotate(${a})`;
  s+=`<g transform="${T}"><rect x="${-W/2-16}" y="${-H/2-16}" width="${W+32}" height="${H+32}" rx="80" fill="${EC.body}" stroke="${FK}" stroke-width="10"/><rect x="${-W/2}" y="${-H/2}" width="${W}" height="${H}" rx="66" fill="#0d1436"/>`;
  const cx=i=>-W/2+W*(i+.5)/ECG.cols, ry=j=>-H/2+H*(j+.5)/ECG.rows;
  for(let j=0;j<ECG.rows;j++){ const hot=j===scanR; s+=`<line x1="${-W/2+14}" y1="${ry(j)}" x2="${W/2-14}" y2="${ry(j)}" stroke="${hot?'#fff':EC.line1}" stroke-width="${hot?14:7}" opacity="${hot?1:.75}"/>`; }
  for(let i=0;i<ECG.cols;i++) s+=`<line x1="${cx(i)}" y1="${-H/2+14}" x2="${cx(i)}" y2="${H/2-14}" stroke="${EC.line2}" stroke-width="7" opacity=".8"/>`;
  // faíscas a correr nas linhas
  for(let n=0;n<14;n++){ const p=((t*.6+n*.137)%1); if(n%2){ const j=n%ECG.rows; s+=`<circle cx="${-W/2+W*p}" cy="${ry(j)}" r="9" fill="#fff"/>`; } else { const i=n%ECG.cols; s+=`<circle cx="${cx(i)}" cy="${-H/2+H*p}" r="9" fill="#fff"/>`; } }
  s+=`</g>`;
  if(glass>0){ s+=`<g transform="translate(0 ${-150*glass})"><g transform="${T}"><rect x="${-W/2-16}" y="${-H/2-16}" width="${W+32}" height="${H+32}" rx="80" fill="#bfefff" opacity=".22" stroke="#e6fbff" stroke-width="8"/><path d="M${-W/2+40},${-H/2+120} L${-W/2+200},${-H/2+20} L${-W/2+300},${-H/2+20} L${-W/2+40},${-H/2+320} Z" fill="#fff" opacity=".25"/></g></g>`; }
  // números de carga (100 = normal)
  if(nums){ for(let j=0;j<ECG.rows;j++) for(let i=0;i<ECG.cols;i++){ let v=100; if(tch){ const d=Math.hypot(cx(i)-tch[0],ry(j)-tch[1]); v=Math.round(100-dr*Math.max(0,40-d*.18)); }
      if(scanR>=0&&j===scanR) v=Math.max(0,v-Math.floor((t*97+i*13)%7));
      const [X,Y]=ecProj(cx(i),ry(j),k); const low=v<90; o+=`<text x="${X}" y="${Y+12}" font-family="M" font-weight="900" font-size="${low?40:30}" fill="${low?'#ff8a8a':'#fff'}" stroke="${FK}" stroke-width="8" paint-order="stroke" text-anchor="middle" opacity="${low?1:.85}">${v}</text>`; } }
  if(ring>0&&tch){ const [X,Y]=ecProj(tch[0],tch[1],k); const pr=.5+.5*Math.sin(t*10); o+=`<ellipse cx="${X}" cy="${Y}" rx="${150+pr*10}" ry="${95+pr*6}" fill="none" stroke="#ff3b3b" stroke-width="10" opacity="${ring}"/><path d="M${X-200},${Y} L${X-160},${Y} M${X+160},${Y} L${X+200},${Y} M${X},${Y-130} L${X},${Y-105} M${X},${Y+105} L${X},${Y+130}" stroke="#ff3b3b" stroke-width="10" stroke-linecap="round" opacity="${ring}"/>`; }
  return {s,o}; }
// dedo por dentro: iões a brilhar
function ecDedoIoes(t){ let s=''; const tx=540, ty=600;
  s+=ecDedo(tx,ty,0,2.1,{glow:.6+.4*Math.sin(t*6)});
  s+=`<defs><clipPath id="ecFc"><path transform="translate(${tx} ${ty}) scale(2.1)" d="M-78,1100 L-78,70 Q-78,-12 0,-12 Q78,-12 78,70 L78,1100 Z"/></clipPath></defs><g clip-path="url(#ecFc)">`;
  for(let i=0;i<26;i++){ const x=tx-130+((i*53)%260)+Math.sin(t*2+i)*14, y=ty+60+((i*97+t*60*(1+i%3))%1300), na=i%2===0;
    s+=`<g transform="translate(${x} ${y})"><circle r="30" fill="${na?'#ffd21f':'#7fe3ff'}" stroke="${FK}" stroke-width="5" opacity=".95"/><text y="11" font-family="M" font-weight="900" font-size="${na?26:28}" fill="${FK}" text-anchor="middle">${na?'Na+':'Cl-'}</text></g>`; }
  s+=`</g>`;
  // raios elétricos à volta da ponta
  let o=''; for(let i=0;i<5;i++){ const a=(-150+i*30+Math.sin(t*9+i)*8)*Math.PI/180, r1=200, r2=300+Math.sin(t*13+i)*20; const x1=tx+Math.cos(a)*r1, y1=ty+120+Math.sin(a)*r1, x2=tx+Math.cos(a)*r2, y2=ty+120+Math.sin(a)*r2, mx=(x1+x2)/2+Math.sin(t*20+i)*18, my=(y1+y2)/2+Math.cos(t*20+i)*18;
    o+=`<path d="M${x1},${y1} L${mx},${my} L${x2},${y2}" fill="none" stroke="${FY}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; }
  return {s,o}; }
// objetos
function ecLuva(x,y,s){ return ecDedo(x,y,0,s,{glove:true}); }
function ecCaneta(x,y,s){ return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="8" stroke-linejoin="round"><path d="M0,0 L-22,60 L22,60 Z" fill="#e0b84a"/><path d="M0,0 L-7,20 L7,20 Z" fill="${FK}"/><rect x="-30" y="60" width="60" height="420" rx="14" fill="#2e86d0"/><rect x="-18" y="80" width="12" height="380" rx="6" fill="#9fdcff" stroke="none" opacity=".6"/><rect x="24" y="120" width="16" height="180" rx="8" fill="#ccc"/></g>`; }
function ecSals(x,y,ang,s){ return `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" stroke="${FK}" stroke-width="9"><rect x="-80" y="-10" width="160" height="820" rx="80" fill="#d9734e"/><rect x="-50" y="30" width="22" height="720" rx="11" fill="#f2a47e" stroke="none" opacity=".8"/><path d="M-60,200 q60,30 120,0 M-60,420 q60,30 120,0 M-60,620 q60,30 120,0" fill="none" stroke="#a84a2c" stroke-width="7"/><path d="M0,810 q10,40 -10,70" fill="none" stroke-width="10"/></g>`; }
function ecBanana(x,y,ang,s){ return `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" stroke="${FK}" stroke-width="9" stroke-linejoin="round"><path d="M0,0 Q-40,350 120,700 Q220,800 280,760 Q140,560 120,300 Q110,120 60,-10 Z" fill="#ffd84a"/><path d="M40,60 Q20,340 160,640" fill="none" stroke="#e0b030" stroke-width="10"/><path d="M0,0 L60,-10 L55,-50 L10,-45 Z" fill="#7a5a2a"/><path d="M230,740 L280,760 L265,790 Z" fill="#5a3a1a"/></g>`; }
FP.ec_scene=(t)=>{ let s=`<defs><linearGradient id="ecScr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${EC.scr1}"/><stop offset="1" stop-color="${EC.scr2}"/></linearGradient></defs>`, o='';
  if(t<ECT.grade){ // unha não funciona → dedo funciona
    s+=ecPhone(t,540,900,1,ECT.func); const P=[540,780];
    if(t<ECT.dedo){ const tap=Math.abs(Math.sin(t*8))*50;
      s+=ecDedo(P[0]+tap*.6,P[1]+tap*.8,-37,.8);
      if(Math.abs(Math.sin(t*8))<.25) o+=`<path d="M${P[0]-60},${P[1]-50} l-30,-30 M${P[0]},${P[1]-70} l0,-40 M${P[0]+60},${P[1]-50} l30,-30" stroke="#ddd" stroke-width="8" stroke-linecap="round"/>`;
      o+=ecX(t,.35,800,560,85); o+=`<text x="150" y="1010" font-family="M" font-weight="900" font-size="60" fill="#fff" stroke="${FK}" stroke-width="14" paint-order="stroke" text-anchor="middle">UNHA</text>`;
      if(t>=ECT.nada) o+=fStamp(t,ECT.nada,540,1220,'NADA!','#e0483a',90,-5);
    } else { const k=ease(clamp((t-ECT.dedo)/(ECT.toca-ECT.dedo),0,1)); const d=(1-k)*160;
      s+=ecDedo(P[0]+d*.6,P[1]+d*.8+40,-37,.8);
      if(t>=ECT.toca) o+=ecRipple(t,ECT.toca,P[0],P[1],FY,1.1);
      o+=`<text x="150" y="1010" font-family="M" font-weight="900" font-size="60" fill="${FY}" stroke="${FK}" stroke-width="14" paint-order="stroke" text-anchor="middle">DEDO</text>`;
      o+=ecOk(t,ECT.func,800,560,85); if(t>=ECT.func) o+=fStamp(t,ECT.func+.1,540,1220,'FUNCIONOU!','#2fa860',84,-5); }
  } else if(t<ECT.corpo){ // vidro abre → grade
    const k=ease(clamp((t-ECT.grade)/.9,0,1)), g=ease(clamp((t-ECT.grade-.6)/.8,0,1)); const G=ecGrade(t,k,{glass:g}); s+=G.s; o+=G.o;
    if(g>.5){ o+=`<g opacity="${clamp((g-.5)*2,0,1)}">`+fTxt(200,560,'VIDRO',58,'#bfefff')+fTxt(880,1060,'FILAS',56,EC.line1)+fTxt(200,1240,'COLUNAS',56,FY)+`</g>`; }
    if(t>ECT.grade+1.6) o+=fStamp(t,ECT.grade+1.6,540,1320,'GRADE INVISÍVEL','#2e86d0',70,-4);
    if(t>6.7){ const z=.5+.5*Math.sin(t*14); o+=`<path d="M540,${470} l-40,90 l40,0 l-30,90" fill="none" stroke="${FY}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round" opacity="${.6+.4*z}"/>`; }
  } else if(t<ECT.rouba){ const D=ecDedoIoes(t); s+=D.s; o+=D.o;
    o+=fStamp(t,ECT.corpo+.6,540,1250,'O CORPO CONDUZ','#e0483a',60,-4);
  } else if(t<ECT.scan){ // dedo encosta e rouba carga; o celular acha o sítio
    const tch=[60,-80], dr=ease(clamp((t-ECT.rouba-.3)/1.2,0,1)), ring=t>=ECT.sente?ease(clamp((t-ECT.sente)/.3,0,1)):0;
    const G=ecGrade(t,1,{tch,dr,nums:true,ring}); s+=G.s; const [X,Y]=ecProj(tch[0],tch[1],1);
    const dn=ease(clamp((t-ECT.rouba)/.5,0,1)); s+=ecDedo(X+40,Y-40-(1-dn)*260,-18,.75);
    // faíscas a subir da grade para o dedo
    if(dr>0&&t<ECT.sente+1) for(let i=0;i<10;i++){ const p=((t*1.8+i/10)%1); const a=i*.63; o+=`<circle cx="${X+Math.cos(a)*120*(1-p)}" cy="${Y+Math.sin(a)*70*(1-p)-p*60}" r="${10*(1-p)+3}" fill="${FY}" stroke="${FK}" stroke-width="3"/>`; }
    o+=G.o;
    if(t<ECT.sente) o+=fStamp(t,ECT.rouba+.5,540,520,'ROUBA UM POUQUINHO','#e0483a',48,-4);
    else o+=fStamp(t,ECT.sente+.3,540,520,'ACHOU: AQUI!','#2fa860',80,-4);
  } else if(t<ECT.nao){ // varrimento
    const scanR=Math.floor(t*30)%ECG.rows; const G=ecGrade(t,1,{nums:true,scanR}); s+=G.s; o+=G.o;
    const n=Math.min(60,Math.floor((t-ECT.scan)*60/1.6)); const k=pop(t,ECT.scan+.2,.25);
    o+=`<g transform="translate(540 540) scale(${k})"><rect x="-380" y="-100" width="760" height="200" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="10" font-family="M" font-weight="900" font-size="104" fill="${FY}" text-anchor="middle">${n}${n>=60?'+':''}</text><text y="72" font-family="M" font-weight="900" font-size="46" fill="#fff" text-anchor="middle">VEZES POR SEGUNDO</text></g>`;
  } else if(t<ECT.sals){ // o que não funciona
    const items=[[ECT.unha,'UNHA'],[ECT.luva,'LUVA'],[ECT.caneta,'CANETA']];
    items.forEach(([t0,nm],i)=>{ if(t<t0-.15) return; const x=200+i*340, y=950, k=pop(t,t0-.15,.25);
      s+=`<g transform="translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})"><circle cx="${x}" cy="${y}" r="150" fill="#fffaf0" stroke="${FK}" stroke-width="10"/><clipPath id="ecC${i}"><circle cx="${x}" cy="${y}" r="146"/></clipPath><g clip-path="url(#ecC${i})">`+
        (i===0?ecDedo(x,y-80,0,.9):i===1?ecLuva(x,y-80,.9):ecCaneta(x,y-120,.75))+`</g></g>`;
      o+=fTxt(x,y+230,nm,56,'#fff'); o+=ecX(t,t0+.12,x+100,y-110,58); });
    o+=fStamp(t,ECT.unha-.2,540,560,'NÃO FUNCIONA','#e0483a',66,-4);
  } else if(t<ECT.ban){ // salsicha!
    s+=ecPhone(t,540,930,.95,ECT.funcS); const P=[560,820]; const k=ease(clamp((t-ECT.sals)/.6,0,1)), tap=t>ECT.funcS?Math.abs(Math.sin((t-ECT.funcS)*7))*20:0;
    s+=ecSals(P[0]+(1-k)*260+tap*.5,P[1]+(1-k)*380+tap,-30,.85);
    if(t>=ECT.funcS-.15) o+=ecRipple(t,ECT.funcS-.15,P[0],P[1],FY,1.1);
    o+=ecOk(t,ECT.funcS,820,560,85); if(t>=ECT.funcS) o+=fStamp(t,ECT.funcS+.1,540,1250,'FUNCIONA!','#2fa860',96,-6);
  } else { // e a banana?
    s+=ecPhone(t,540,1010,.72,1e9,true); const u=clamp((t-ECT.ban)/2.5,0,1), wob=Math.sin(t*3)*5;
    s+=ecBanana(700-u*60,820+(1-u)*260,-28+wob,.9);
    if(t>=ECT.sim){ const k=pop(t,ECT.sim,.25); o+=`<g transform="translate(540 540) scale(${k})">`;
      [['SIM',EC.ok,-210],['NÃO',EC.no,210]].forEach(([n,c,x],i)=>{ const b=Math.sin(t*6+i*2)*8; o+=`<g transform="translate(${x} ${b})"><rect x="-170" y="-80" width="340" height="160" rx="40" fill="${c}" stroke="${FK}" stroke-width="10"/><text y="34" font-family="M" font-weight="900" font-size="96" fill="#fff" text-anchor="middle">${n}</text></g>`; });
      o+=`</g>`; }
    else o+=fStamp(t,ECT.ban+.2,540,540,'E A BANANA?','#ff8a1f',90,-5); }
  return {s,o}; };
