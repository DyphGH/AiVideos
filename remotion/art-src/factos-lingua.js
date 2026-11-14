// ===== 2 FATOS (BR) — Língua no nariz + tubinho + trevo =====
// Cada cena devolve {s: sujeito (leva luz/sombra premium), o: sobreposição (sem filtro)}
const LG={sk:'#f6c39c',skD:'#e09a6e',skL:'#ffe0c4',lip:'#d9626e',tg:'#ff7f93',tgD:'#d94f68',tgL:'#ffb3c0',hair:'#3a2418',mouth:'#5a1424'};
function lgDefs(){ return `<defs>
<radialGradient id="lgFace" cx=".45" cy=".38" r=".7"><stop offset="0" stop-color="${LG.skL}"/><stop offset=".55" stop-color="${LG.sk}"/><stop offset="1" stop-color="${LG.skD}"/></radialGradient>
<radialGradient id="lgTg" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="${LG.tgL}"/><stop offset=".6" stop-color="${LG.tg}"/><stop offset="1" stop-color="${LG.tgD}"/></radialGradient>
<linearGradient id="lgHair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3826"/><stop offset="1" stop-color="${LG.hair}"/></linearGradient>
<radialGradient id="lgEye" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e9eef8"/></radialGradient>
</defs>`; }
// rosto de frente. mode: 'nariz' (língua para cima), 'tubo', 'trevo', 'feliz'
function lgFace(t,mode,k=1){
  const cx=540, cy=1000; let o=`<g stroke-linecap="round" stroke-linejoin="round">`;
  // pescoço + ombros
  o+=`<path d="M440,1290 L440,1420 Q540,1450 640,1420 L640,1290 Z" fill="${LG.skD}" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M170,1960 Q190,1500 440,1420 Q540,1470 640,1420 Q890,1500 910,1960 Z" fill="#3c6fd8" stroke="${FK}" stroke-width="8"/><path d="M440,1420 Q540,1520 640,1420" fill="none" stroke="#2a54b0" stroke-width="10"/>`;
  // orelhas
  o+=`<ellipse cx="${cx-322}" cy="${cy+20}" rx="52" ry="80" fill="${LG.sk}" stroke="${FK}" stroke-width="8"/><ellipse cx="${cx+322}" cy="${cy+20}" rx="52" ry="80" fill="${LG.sk}" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M${cx-330},${cy-10} q-20,30 0,60 M${cx+330},${cy-10} q20,30 0,60" fill="none" stroke="${LG.skD}" stroke-width="7"/>`;
  // cabeça
  o+=`<path d="M${cx-310},${cy-60} Q${cx-320},${cy-380} ${cx},${cy-390} Q${cx+320},${cy-380} ${cx+310},${cy-60} Q${cx+300},${cy+250} ${cx},${cy+300} Q${cx-300},${cy+250} ${cx-310},${cy-60} Z" fill="url(#lgFace)" stroke="${FK}" stroke-width="8"/>`;
  // cabelo
  o+=`<path d="M${cx-318},${cy-80} Q${cx-340},${cy-420} ${cx-40},${cy-420} Q${cx+330},${cy-430} ${cx+318},${cy-80} Q${cx+290},${cy-230} ${cx+150},${cy-260} Q${cx+40},${cy-200} ${cx-80},${cy-250} Q${cx-230},${cy-250} ${cx-318},${cy-80} Z" fill="url(#lgHair)" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M${cx-160},${cy-360} q60,-30 140,-10 M${cx+40},${cy-370} q70,-10 130,20" fill="none" stroke="#7a5238" stroke-width="8" opacity=".7"/>`;
  // bochechas
  o+=`<ellipse cx="${cx-190}" cy="${cy+90}" rx="62" ry="34" fill="#ff8fa0" opacity=".45"/><ellipse cx="${cx+190}" cy="${cy+90}" rx="62" ry="34" fill="#ff8fa0" opacity=".45"/>`;
  // olhos: no modo nariz ficam vesgos a olhar para baixo/centro
  const look= mode==='nariz' ? [[22,22],[-22,22]] : mode==='trevo' ? [[0,-6],[0,-6]] : [[8,10],[8,10]];
  for(const [i,ex] of [[0,cx-120],[1,cx+120]]){ const [dx,dy]=look[i];
    o+=`<ellipse cx="${ex}" cy="${cy-60}" rx="62" ry="${mode==='trevo'?70:56}" fill="url(#lgEye)" stroke="${FK}" stroke-width="7"/><circle cx="${ex+dx}" cy="${cy-60+dy}" r="30" fill="#5a3a22"/><circle cx="${ex+dx}" cy="${cy-60+dy}" r="16" fill="${FK}"/><circle cx="${ex+dx-9}" cy="${cy-60+dy-10}" r="7" fill="#fff"/>`; }
  // sobrancelhas
  const br= mode==='nariz' ? 14+4*Math.sin(t*9) : mode==='trevo' ? -16 : 0;
  o+=`<path d="M${cx-185},${cy-150+br*.3} Q${cx-120},${cy-175-br} ${cx-60},${cy-150+br}" fill="none" stroke="${FK}" stroke-width="16"/><path d="M${cx+60},${cy-150+br} Q${cx+120},${cy-175-br} ${cx+185},${cy-150+br*.3}" fill="none" stroke="${FK}" stroke-width="16"/>`;
  // nariz
  o+=`<path d="M${cx-12},${cy-30} Q${cx-30},${cy+40} ${cx-52},${cy+62} Q${cx-30},${cy+92} ${cx},${cy+86} Q${cx+30},${cy+92} ${cx+52},${cy+62} Q${cx+30},${cy+40} ${cx+12},${cy-30}" fill="${LG.sk}" stroke="${FK}" stroke-width="7"/><ellipse cx="${cx-22}" cy="${cy+70}" rx="9" ry="6" fill="${LG.skD}"/><ellipse cx="${cx+22}" cy="${cy+70}" rx="9" ry="6" fill="${LG.skD}"/><ellipse cx="${cx-6}" cy="${cy+30}" rx="8" ry="18" fill="#fff" opacity=".55"/>`;
  // boca + língua
  if(mode==='nariz'){
    const tr=Math.sin(t*38)*4*k, up=k*(.92+.08*Math.sin(t*3.2));
    o+=`<path d="M${cx-95},${cy+150} Q${cx},${cy+120} ${cx+95},${cy+150} Q${cx+80},${cy+250} ${cx},${cy+255} Q${cx-80},${cy+250} ${cx-95},${cy+150} Z" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/>`;
    o+=`<path d="M${cx-110},${cy+150} Q${cx},${cy+110} ${cx+110},${cy+150}" fill="none" stroke="${LG.lip}" stroke-width="16"/>`;
    const tipY=cy+150-48*up; // ponta quase a tocar o nariz (y≈86)
    o+=`<path d="M${cx-62},${cy+215} Q${cx-66},${tipY+30} ${cx-34+tr},${tipY+4} Q${cx+tr},${tipY-26} ${cx+34+tr},${tipY+4} Q${cx+66},${tipY+30} ${cx+62},${cy+215} Z" fill="url(#lgTg)" stroke="${FK}" stroke-width="8"/><path d="M${cx+tr*.5},${tipY+8} L${cx},${cy+200}" stroke="${LG.tgD}" stroke-width="6"/><ellipse cx="${cx-22+tr}" cy="${tipY+22}" rx="10" ry="14" fill="#fff" opacity=".5"/>`;
  } else if(mode==='tubo'||mode==='trevo'){
    o+=`<ellipse cx="${cx}" cy="${cy+180}" rx="100" ry="70" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/>`;
    const s=1+.04*Math.sin(t*6);
    if(mode==='tubo'){
      o+=`<g transform="translate(${cx} ${cy+200}) scale(${s})"><path d="M-70,-10 Q-80,90 0,110 Q80,90 70,-10 Q40,30 0,30 Q-40,30 -70,-10 Z" fill="url(#lgTg)" stroke="${FK}" stroke-width="8"/>`;
      o+=`<path d="M-70,-10 Q-30,-40 -20,20 Q-40,30 -70,-10 Z M70,-10 Q30,-40 20,20 Q40,30 70,-10 Z" fill="${LG.tgD}" stroke="${FK}" stroke-width="7"/><ellipse cx="0" cy="22" rx="20" ry="12" fill="#5a1424"/><ellipse cx="-34" cy="64" rx="12" ry="18" fill="#fff" opacity=".45"/></g>`;
    } else {
      o+=`<g transform="translate(${cx} ${cy+210}) scale(${s})">`;
      for(const [x,y] of [[-48,10],[48,10],[0,62]]) o+=`<circle cx="${x}" cy="${y}" r="50" fill="url(#lgTg)" stroke="${FK}" stroke-width="8"/>`;
      o+=`<circle cx="0" cy="26" r="26" fill="url(#lgTg)"/><path d="M0,26 L-30,0 M0,26 L30,0 M0,26 L0,60" stroke="${LG.tgD}" stroke-width="7"/><ellipse cx="-58" cy="-4" rx="12" ry="16" fill="#fff" opacity=".45"/></g>`;
    }
    o+=`<path d="M${cx-100},${cy+170} Q${cx},${cy+100} ${cx+100},${cy+170}" fill="none" stroke="${LG.lip}" stroke-width="14"/>`;
  } else {
    o+=`<path d="M${cx-110},${cy+150} Q${cx},${cy+260} ${cx+110},${cy+150} Z" fill="${LG.mouth}" stroke="${FK}" stroke-width="8"/><path d="M${cx-60},${cy+200} Q${cx},${cy+180} ${cx+60},${cy+200} Q${cx},${cy+240} ${cx-60},${cy+200} Z" fill="url(#lgTg)"/>`;
  }
  return o+`</g>`; }
function lgBonecos(t,t0){ let o=''; for(let i=0;i<10;i++){ const k=pop(t,t0+i*.05,.18), on=i===9, x=90+i*100;
  o+=`<g transform="translate(${x} 560) scale(${k})"><circle cy="-34" r="24" fill="${on?FY:'#fff'}" stroke="${FK}" stroke-width="6"/><path d="M-32,34 Q-32,-6 0,-6 Q32,-6 32,34 Z" fill="${on?FY:'#fff'}" stroke="${FK}" stroke-width="6"/>${on?'<path d="M-8,-24 q8,14 16,0" fill="#ff7f93" stroke="'+FK+'" stroke-width="4"/>':''}</g>`; } return o; }
// tempos (acertar à voz)
const LGT={nao:3.95, tubo:6.41, trevo:10.82, fim:13.99, end:15.3};
FP.lg_scene=(t)=>{ // devolve {s,o}
  let s=lgDefs(), o='';
  if(t<LGT.tubo){ s+=lgFace(t,'nariz',ease(clamp(t/0.4,0,1))*.0+1);
    // seta/gap a brilhar entre a ponta e o nariz
    const g=.5+.5*Math.sin(t*10); o+=`<g opacity="${.6+.4*g}"><path d="M640,1075 q40,-20 80,-10" fill="none" stroke="${FY}" stroke-width="8"/><text x="735" y="1068" font-family="M" font-weight="900" font-size="46" fill="${FY}" stroke="${FK}" stroke-width="10" paint-order="stroke">QUASE!</text></g>`;
    if(t>=LGT.nao){ o+=lgBonecos(t,LGT.nao+.3); o+=fStamp(t,LGT.nao+.9,540,720,'SÓ 1 EM 10','#e0483a',80,-4); }
  } else if(t<LGT.trevo){ s+=lgFace(t,'tubo'); o+=fStamp(t,LGT.tubo+.3,540,560,'TUBINHO 🌀'.replace(' 🌀',''),'#2e86d0',90,-4); o+=`<g opacity="${clamp((t-9.26)/.25,0,1)}">${fTxt(540,700,'A MAIORIA CONSEGUE',58,'#fff')}</g>`; }
  else { s+=lgFace(t,'trevo'); o+=fStamp(t,LGT.trevo+.2,540,560,'TREVO','#2fa860',110,-4);
    if(t>12.83) o+=fStamp(t,12.83,540,710,'QUASE NINGUÉM','#e0483a',72,4);
    for(let i=0;i<6;i++){ const a=t*1.5+i*Math.PI/3, r=300+20*Math.sin(t*3+i); o+=`<path transform="translate(${540+Math.cos(a)*r} ${1210+Math.sin(a)*r*.5}) scale(.6)" d="M0,-24 Q4,-4 24,0 Q4,4 0,24 Q-4,4 -24,0 Q-4,-4 0,-24 Z" fill="${FY}"/>`; } }
  return {s,o}; };
