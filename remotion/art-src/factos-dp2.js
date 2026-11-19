// ===== 2 FATOS (BR) — Dedo + pé v2 (2D premium; reutiliza maoCima/pernaCima/seis/setaCirc de factos-pe.js) =====
const DPT={dobra:1.19, tenta:2.9, agora:4.4, nao:5.34, sobem:6.52, preso:7.6, xray:9.34, pior:12.15, pe:13.61, seis:15.29, vira:16.2, viu:17.7, cer:19.97, curto:23.2, fim:26.28, end:29.65};
function dpMesa(){ let o=`<rect width="1080" height="1920" fill="#8a5a33"/>`; for(let y=0;y<1920;y+=110) o+=`<path d="M0,${y} Q540,${y+34} 1080,${y}" stroke="#7a4d2a" stroke-width="9" fill="none"/>`;
  return o+`<ellipse cx="540" cy="900" rx="620" ry="760" fill="#ffd9a8" opacity=".18"/>`; }
function dpCheck(x,y,k){ return `<g transform="translate(${x} ${y}) scale(${k})"><circle r="44" fill="#2fa860" stroke="${FK}" stroke-width="7"/><path d="M-20,0 L-5,16 L22,-16" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
// mão (coords da maoCima: x 150–850, y 630–1930) → ecrã
const DPM=(inner)=>`<g transform="translate(540 930) scale(.7) translate(-500 -1250)">${inner}</g>`;
const dpX=x=>540+(x-500)*.7, dpY=y=>930+(y-1250)*.7;
// cérebro visto de trás: esquerdo (lado do ecrã esquerdo) a acender
function dpCerebro(t,on){ let o=''; const g=.6+.4*Math.sin(t*9);
  const hemi=(cx,sd,lit)=>{ let p=`<path d="M${cx},560 Q${cx-sd*230},540 ${cx-sd*250},760 Q${cx-sd*262},960 ${cx-sd*120},1010 Q${cx-sd*40},1030 ${cx},1000 Z" fill="${lit?'#ff9cc0':'#c58aa3'}" stroke="${FK}" stroke-width="10" stroke-linejoin="round"/>`;
    for(let k=0;k<5;k++){ const y=620+k*80; p+=`<path d="M${cx-sd*20},${y} q${-sd*50},-30 ${-sd*100},0 q${-sd*50},30 ${-sd*100},0" fill="none" stroke="${FK}" stroke-width="7" opacity=".45"/>`; }
    if(lit) p+=`<path d="M${cx},560 Q${cx-sd*230},540 ${cx-sd*250},760 Q${cx-sd*262},960 ${cx-sd*120},1010 Q${cx-sd*40},1030 ${cx},1000 Z" fill="#fff" opacity="${.15*g}"/>`;
    return p; };
  if(on) o+=`<ellipse cx="400" cy="780" rx="330" ry="300" fill="#ff7ab8" opacity="${.22*g}" filter="url(#blur30)"/>`;
  o+=`<path d="M520,990 Q540,1080 540,1130 Q560,1080 560,990 Z" fill="#c58aa3" stroke="${FK}" stroke-width="9"/>`;
  o+=hemi(538,1,on)+hemi(542,-1,false);
  return o; }
FP.dp_scene=(t)=>{ let b='', s='', o='';
  if(t<DPT.xray){ b=dpMesa();
    const dobra=ease(clamp((t-DPT.dobra)/1.2,0,1)), treme=t>=DPT.tenta?1:0;
    s+=DPM(maoCima(t,{dobra:t<DPT.dobra?.15:dobra,treme}));
    if(t<DPT.dobra) o+=fTxt(540,520,'MÃO NA MESA',84,'#fff');
    else if(t<DPT.tenta) o+=fTxt(540,520,'DOBRA O DO MEIO',76,'#fff');
    else if(t<DPT.nao){ const ax=dpX(630)+50, ay=dpY(900); o+=`<path d="M${ax+130},${ay} H${ax+20}" stroke="${FY}" stroke-width="14" stroke-linecap="round"/><path d="M${ax+40},${ay-26} L${ax},${ay} L${ax+40},${ay+26} Z" fill="${FY}" stroke="${FK}" stroke-width="6"/>`+fTxt(ax+250,ay+20,'ANELAR',54,FY);
      if(t>=DPT.agora) o+=fStamp(t,DPT.agora,540,1230,'AGORA!','#e0483a',100,-6); }
    else { o+=fStamp(t,DPT.nao+.05,540,1230,'NÃO DÁ!','#e0483a',110,-6);
      if(t>=DPT.sobem){ [[370,780],[750,880],[200,1180]].forEach(([x,y],i)=>{ o+=dpCheck(dpX(x),dpY(y)-40,pop(t,DPT.sobem+i*.25,.2)); }); }
      if(t>=DPT.preso){ const ax=dpX(630), ay=dpY(720), p=.5+.5*Math.sin(t*12); o+=`<circle cx="${ax}" cy="${ay}" r="${70+p*8}" fill="none" stroke="#ff3b3b" stroke-width="10"/>`+fStamp(t,DPT.preso+.05,ax+140,ay+150,'PRESO!','#e0483a',64,6); } }
  } else if(t<DPT.pior){ // raio-X do tendão
    b=`<rect width="1080" height="1920" fill="#06122a"/>`; for(let y=0;y<1920;y+=40) b+=`<path d="M0,${y} H1080" stroke="#0e2a55" stroke-width="2"/>`;
    const sc=((t-DPT.xray)*.5)%1; b+=`<rect x="0" y="${200+sc*1500}" width="1080" height="60" fill="#7fe3ff" opacity=".12"/>`;
    o+=DPM(maoCima(t,{dobra:1,xray:1}));
    o+=fStamp(t,DPT.xray+.3,540,520,'O MESMO TENDÃO','#2e86d0',72,-4)+fTxt(dpX(880),dpY(1100),'RAIO-X',52,'#9fd4ff');
  } else if(t<DPT.pe){ // MAS O 2º É PIOR
    const u=t-DPT.pior, z=1+u*.18, sh=u<.25?Math.sin(u*90)*8:0;
    b=`<rect width="1080" height="1920" fill="#05060f"/>`;
    o+=`<g transform="translate(${540+sh} 900) scale(${z}) translate(-540 -900)">${fTxt(540,840,'MAS O 2º',140,'#fff')}${fTxt(540,1010,'É PIOR...',170,'#e0483a')}</g>`;
  } else if(t<DPT.cer){ // pé + 6
    const rev=t>=DPT.vira, dir=rev?-1:1, ph=t*5*dir;
    const draw=t>=DPT.seis, sh=draw?ease(clamp((t-DPT.seis)/.5,0,1)):0;
    const lx=540-sh*230, ly=1520+sh*60, ls=1.25-sh*.45;
    s+=pernaCima(lx,ly,ls,ph); o+=setaCirc(lx,ly-400*ls,210*ls,t,dir,rev?'#e0483a':'#5fe08a');
    if(draw){ const u=clamp((t-DPT.seis-.1)/1.9,0,1), ox=760, oy=700; let tr=[]; for(let i=0;i<=60;i++){ const [a,c]=seis(u*i/60); tr.push(`${ox+a},${oy+c}`); }
      o+=`<polyline points="${tr.join(' ')}" fill="none" stroke="${FY}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/><polyline points="${tr.join(' ')}" fill="none" stroke="#fff6c4" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
      const [fx,fy]=seis(u); s+=maoAponta(ox+fx,oy+fy,.95,-15); }
    if(!draw) o+=fTxt(540,520,'GIRA O PÉ',100,'#5fe08a'); else if(t<DPT.viu) o+=fTxt(540,520,'DESENHA UM 6',86,FY);
    if(t>=DPT.viu){ o+=fStamp(t,DPT.viu,540,520,'O PÉ TRAIU!','#e0483a',96,-6); if(t<DPT.viu+.4) o+=`<rect width="1080" height="1920" fill="#fff" opacity="${.45*(1-(t-DPT.viu)/.4)}"/>`; }
  } else if(t<DPT.fim){ // cérebro melhorado
    const u=t-DPT.cer; s+=`<g transform="translate(540 40) scale(.8) translate(-540 0)">${dpCerebro(t,true)}</g>`;
    const k=pop(t,DPT.cer+.3,.25);
    s+=`<g transform="translate(850 1010) scale(${.62*k})">${maoAponta(0,0,1,-15)}</g><g transform="translate(850 1380) scale(${.3*k})">${pernaCima(0,0,1,t*5)}</g>`;
    // dois sinais do lado esquerdo do cérebro
    const P1='M430,830 Q440,960 560,1000 Q690,1000 780,990', P2='M430,830 Q440,960 560,1000 Q690,1100 780,1300';
    const collide=t>=DPT.curto;
    o+=`<path d="${P1}" fill="none" stroke="${FK}" stroke-width="26"/><path d="${P2}" fill="none" stroke="${FK}" stroke-width="26"/><path d="${P1}" fill="none" stroke="#7fe3ff" stroke-width="12" stroke-dasharray="30 22" stroke-dashoffset="${-t*160}"/><path d="${P2}" fill="none" stroke="#5fe08a" stroke-width="12" stroke-dasharray="30 22" stroke-dashoffset="${t*160}"/>`;
    o+=`<g transform="translate(990 940)"><path d="M0,-40 a40,40 0 1,1 -40,40" fill="none" stroke="#7fe3ff" stroke-width="10"/></g><g transform="translate(990 1290)"><path d="M-40,0 a40,40 0 1,0 40,-40" fill="none" stroke="#5fe08a" stroke-width="10"/></g>`;
    if(collide){ const f=.5+.5*Math.sin(t*30); o+=`<g transform="translate(560 1000) scale(${pop(t,DPT.curto,.2)*(1+.12*f)})"><path d="M0,-110 L28,-34 L108,-40 L44,12 L76,90 L0,42 L-76,90 L-44,12 L-108,-40 L-28,-34 Z" fill="${FY}" stroke="${FK}" stroke-width="8"/></g>`;
      for(let i=0;i<8;i++){ const a=i*.785+t*2, r=120+((t*300+i*40)%120); o+=`<circle cx="${560+Math.cos(a)*r}" cy="${1000+Math.sin(a)*r}" r="7" fill="#fff6c4"/>`; }
      o+=fStamp(t,DPT.curto+.1,540,440,'CURTO-CIRCUITO','#e0483a',60,-4); }
    else o+=fStamp(t,DPT.cer+.2,540,440,'MESMO LADO','#2e86d0',76,-4);
  } else { // fim 0-1-2
    s+=DPM(maoCima(t,{dobra:1,treme:1})); b=dpMesa();
    const k=pop(t,DPT.fim,.25); o+=`<g transform="translate(540 520) scale(${k})">`;
    ['0','1','2'].forEach((n,i)=>{ const x=-240+i*240, bb=Math.sin(t*6+i)*8; o+=`<g transform="translate(${x} ${bb})"><circle r="88" fill="${['#e0483a',FY,'#2fa860'][i]}" stroke="${FK}" stroke-width="9"/><text y="36" font-family="M" font-weight="900" font-size="104" fill="${FK}" text-anchor="middle">${n}</text></g>`; });
    o+=`</g>`; }
  return {b,s,o}; };
