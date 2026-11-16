// ===== 2 FATOS (BR) — Lamber o cotovelo + uma sobrancelha + mexer as orelhas =====
function cvFace(t,{browL=0,browR=0,ear=0,mouth='feliz',look=[8,10],tilt=0}={}){
  const cx=540, cy=1000; let o=`<g transform="rotate(${tilt} ${cx} ${cy+200})" stroke-linecap="round" stroke-linejoin="round">`;
  o+=`<path d="M440,1290 L440,1420 Q540,1450 640,1420 L640,1290 Z" fill="${LG.skD}" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M170,1960 Q190,1500 440,1420 Q540,1470 640,1420 Q890,1500 910,1960 Z" fill="#3c6fd8" stroke="${FK}" stroke-width="8"/><path d="M440,1420 Q540,1520 640,1420" fill="none" stroke="#2a54b0" stroke-width="10"/>`;
  for(const sd of [-1,1]){ const ex=cx+sd*322, ey=cy+20-ear, rr=sd*ear*.6;
    o+=`<g transform="rotate(${rr} ${ex} ${ey+60})"><ellipse cx="${ex}" cy="${ey}" rx="52" ry="80" fill="${LG.sk}" stroke="${FK}" stroke-width="8"/><path d="M${ex+sd*-8},${ey-30} q${sd*-20},30 0,60" fill="none" stroke="${LG.skD}" stroke-width="7"/></g>`;
    if(Math.abs(ear)>2) o+=`<path d="M${ex+sd*70},${ey-40} q${sd*20},20 0,40 M${ex+sd*90},${ey-55} q${sd*28},35 0,70" fill="none" stroke="${FY}" stroke-width="6" opacity=".9"/>`; }
  o+=`<path d="M${cx-310},${cy-60} Q${cx-320},${cy-380} ${cx},${cy-390} Q${cx+320},${cy-380} ${cx+310},${cy-60} Q${cx+300},${cy+250} ${cx},${cy+300} Q${cx-300},${cy+250} ${cx-310},${cy-60} Z" fill="url(#lgFace)" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M${cx-318},${cy-80} Q${cx-340},${cy-420} ${cx-40},${cy-420} Q${cx+330},${cy-430} ${cx+318},${cy-80} Q${cx+290},${cy-230} ${cx+150},${cy-260} Q${cx+40},${cy-200} ${cx-80},${cy-250} Q${cx-230},${cy-250} ${cx-318},${cy-80} Z" fill="url(#lgHair)" stroke="${FK}" stroke-width="8"/>`;
  o+=`<ellipse cx="${cx-190}" cy="${cy+90}" rx="62" ry="34" fill="#ff8fa0" opacity=".45"/><ellipse cx="${cx+190}" cy="${cy+90}" rx="62" ry="34" fill="#ff8fa0" opacity=".45"/>`;
  for(const [i,ex] of [[0,cx-120],[1,cx+120]]){ const [dx,dy]=Array.isArray(look[0])?look[i]:look; const big=(i===0?browL:browR)>20?1.12:1;
    o+=`<ellipse cx="${ex}" cy="${cy-60}" rx="${62*big}" ry="${56*big}" fill="url(#lgEye)" stroke="${FK}" stroke-width="7"/><circle cx="${ex+dx}" cy="${cy-60+dy}" r="30" fill="#5a3a22"/><circle cx="${ex+dx}" cy="${cy-60+dy}" r="16" fill="${FK}"/><circle cx="${ex+dx-9}" cy="${cy-60+dy-10}" r="7" fill="#fff"/>`; }
  o+=`<path d="M${cx-185},${cy-150-browL*.6} Q${cx-120},${cy-178-browL} ${cx-60},${cy-150-browL*.5}" fill="none" stroke="${FK}" stroke-width="16"/><path d="M${cx+60},${cy-150-browR*.5} Q${cx+120},${cy-178-browR} ${cx+185},${cy-150-browR*.6}" fill="none" stroke="${FK}" stroke-width="16"/>`;
  if(browL>20) o+=`<path d="M${cx-150},${cy-140} q30,-12 60,0" fill="none" stroke="${LG.skD}" stroke-width="5" opacity=".7"/>`;
  o+=`<path d="M${cx-12},${cy-30} Q${cx-30},${cy+40} ${cx-52},${cy+62} Q${cx-30},${cy+92} ${cx},${cy+86} Q${cx+30},${cy+92} ${cx+52},${cy+62} Q${cx+30},${cy+40} ${cx+12},${cy-30}" fill="${LG.sk}" stroke="${FK}" stroke-width="7"/><ellipse cx="${cx-22}" cy="${cy+70}" rx="9" ry="6" fill="${LG.skD}"/><ellipse cx="${cx+22}" cy="${cy+70}" rx="9" ry="6" fill="${LG.skD}"/><ellipse cx="${cx-6}" cy="${cy+30}" rx="8" ry="18" fill="#fff" opacity=".55"/>`;
  if(mouth==='lingua'){ const tr=Math.sin(t*38)*4;
    o+=`<ellipse cx="${cx+20}" cy="${cy+175}" rx="70" ry="50" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/>`;
    o+=`<path d="M${cx-10},${cy+170} Q${cx+60},${cy+180} ${cx+120+tr},${cy+215} Q${cx+132+tr},${cy+238} ${cx+110+tr},${cy+246} Q${cx+50},${cy+230} ${cx-5},${cy+205} Z" fill="url(#lgTg)" stroke="${FK}" stroke-width="7"/><path d="M${cx+10},${cy+192} Q${cx+60},${cy+205} ${cx+105+tr},${cy+228}" fill="none" stroke="${LG.tgD}" stroke-width="5"/>`;
  } else if(mouth==='o'){ o+=`<ellipse cx="${cx}" cy="${cy+180}" rx="44" ry="54" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/>`; }
  else o+=`<path d="M${cx-110},${cy+150} Q${cx},${cy+260} ${cx+110},${cy+150} Z" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/><path d="M${cx-60},${cy+200} Q${cx},${cy+180} ${cx+60},${cy+200} Q${cx},${cy+240} ${cx-60},${cy+200} Z" fill="url(#lgTg)"/>`;
  return o+`</g>`; }
// braço dobrado com o cotovelo à frente da boca (fora do alcance da língua)
function cvBraco(t){ const w=Math.sin(t*2.6)*10; const E=[745+w*.4,1300+w]; let o='';
  o+=`<path d="M840,1560 L${E[0]},${E[1]}" stroke="${FK}" stroke-width="128" stroke-linecap="round"/><path d="M840,1560 L${E[0]},${E[1]}" stroke="#3c6fd8" stroke-width="112" stroke-linecap="round"/>`;
  o+=`<path d="M${E[0]},${E[1]} L860,760" stroke="${FK}" stroke-width="104" stroke-linecap="round"/><path d="M${E[0]},${E[1]} L860,760" stroke="${LG.sk}" stroke-width="88" stroke-linecap="round"/><path d="M${E[0]+20},${E[1]-60} L850,800" stroke="${LG.skL}" stroke-width="18" stroke-linecap="round" opacity=".6"/>`;
  o+=`<circle cx="${E[0]}" cy="${E[1]}" r="58" fill="${LG.sk}" stroke="${FK}" stroke-width="8"/><path d="M${E[0]-20},${E[1]+10} q20,14 40,0" fill="none" stroke="${LG.skD}" stroke-width="6"/>`;
  o+=`<ellipse cx="866" cy="742" rx="62" ry="56" fill="${LG.sk}" stroke="${FK}" stroke-width="8"/>`;
  return {o,E}; }
// tempos (acertar à voz)
const CVT={nao:3.7, sob:9.36, ore:11.52, fim:14.86};
FP.cv_scene=(t)=>{ let s=lgDefs(), o='';
  if(t<CVT.sob){ const tilt=-8+Math.sin(t*3)*2;
    s+=cvFace(t,{mouth:'lingua',look:[[30,26],[18,26]],tilt,browL:6,browR:6}); const B=cvBraco(t); s+=B.o;
    const g=.5+.5*Math.sin(t*10); o+=`<g opacity="${.6+.4*g}"><path d="M420,1330 Q560,1330 ${B.E[0]-62},${B.E[1]-8}" fill="none" stroke="${FY}" stroke-width="8" stroke-dasharray="14 10"/><text x="400" y="1345" font-family="M" font-weight="900" font-size="54" fill="${FY}" stroke="${FK}" stroke-width="12" paint-order="stroke" text-anchor="end">QUASE!</text></g>`;
    for(let i=0;i<3;i++){ const p=((t*.9+i/3)%1); o+=`<path transform="translate(${300+i*40} ${820+p*120})" d="M0,-18 Q12,4 0,14 Q-12,4 0,-18 Z" fill="#7fe3ff" stroke="${FK}" stroke-width="4" opacity="${1-p}"/>`; }
    if(t>=CVT.nao) o+=fStamp(t,CVT.nao+.15,540,520,'NÃO DÁ!','#e0483a',100,-5);
  } else if(t<CVT.ore){ const u=t-CVT.sob, c=(u%1.4)/1.4, up=c<.5?ease(c/.5):1-ease((c-.5)/.5);
    s+=cvFace(t,{browL:60*up,browR:0,mouth:'o',look:[0,-8]});
    o+=fStamp(t,CVT.sob+.2,540,520,'SÓ UMA!','#2e86d0',100,-4);
  } else if(t<CVT.fim){ const e=Math.sin(t*16)*14;
    s+=cvFace(t,{ear:e,mouth:'feliz',look:[0,0]});
    o+=fStamp(t,CVT.ore+.2,540,520,'MEXE AS ORELHAS','#e0483a',80,-4);
  } else { s+=cvFace(t,{mouth:'feliz',look:[0,0],browL:20*Math.max(0,Math.sin(t*5)),ear:Math.sin(t*12)*6});
    const k=pop(t,CVT.fim,.25); o+=`<g transform="translate(540 520) scale(${k})">`;
    ['0','1','2','3'].forEach((n,i)=>{ const x=-300+i*200, b=Math.sin(t*6+i)*8; o+=`<g transform="translate(${x} ${b})"><circle r="72" fill="${[ '#e0483a','#ff8a1f',FY,'#2fa860'][i]}" stroke="${FK}" stroke-width="8"/><text y="30" font-family="M" font-weight="900" font-size="86" fill="${FK}" text-anchor="middle">${n}</text></g>`; });
    o+=`</g>`; }
  return {s,o}; };
