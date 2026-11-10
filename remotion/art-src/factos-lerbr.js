// ===== 2 FATOS (BR) — "Seu cérebro tá te enganando" v2: sem ponte, ~21 s =====
function hookLerBR(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="70" fill="${FK}" text-anchor="middle" stroke="none">SEU CÉREBRO</text><text x="540" y="318" font-family="M" font-weight="900" font-size="70" fill="#e0483a" text-anchor="middle" stroke="none">TÁ TE ENGANANDO</text></g>`; }
const BR_ERR=['Se','vcoê','cnoesguiu','ler','isos,','seu','ceérbro','é','mias','rpiádo','que','o','seu','wfi-i'];
const BR_OK =['Se','você','conseguiu','ler','isso,','seu','cérebro','é','mais','rápido','que','o','seu','wi-fi'];
FP.lerBR1=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  const wob=Math.sin(t*3)*1.2, sc=1+0.012*Math.sin(t*5);
  o+=`<g transform="translate(540 900) rotate(${wob}) scale(${sc}) translate(-540 -900)">`;
  o+=`<path d="M540,420 L1060,1360 L20,1360 Z" fill="${FY}" stroke="${FK}" stroke-width="16" stroke-linejoin="round"/>`;
  
  o+=olhoIcon(540,800,.85,false);
  const SZ=82, l1=linhaPal(['UM','PASSEIO','NO'],540,SZ), l2=linhaPal(['NO','PARQUE'],540,SZ), Y1=1185, Y2=1295;
  const words=[...l1.map(p=>({...p,y:Y1})),...l2.map(p=>({...p,y:Y2}))];
  // marcador a ler devagar (3,57 – 5,43)
  const tm=[2.1,2.4,2.75,3.1,3.4];
  if(t>=2.05&&t<3.75){ let k=0; for(let i=0;i<5;i++) if(t>=tm[i]) k=i; const p=words[k]; o+=`<rect x="${p.c-p.wd/2-10}" y="${p.y-58}" width="${p.wd+20}" height="76" rx="14" fill="#ffffff" opacity=".75" stroke="none"/>`; }
  // segundo "NO" salta fora quando ele diz "e salta…"
  words.forEach((p,i)=>{ let dy=0, op=1;
    if(i===3&&t>=6.64){const k=ease((t-6.64)/0.6); dy=-140*k; op=1-k*.85;}
    const col=(t>=4.93&&(i===2||i===3))?'#e0483a':FK;
    o+=`<text x="${p.c}" y="${p.y+dy}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none" opacity="${op}">${p.w}</text>`; });
  if(t>=4.93&&t<6.64){ for(const i of [2,3]){const p=words[i]; const k=ease((t-4.93)/.3); o+=`<ellipse cx="${p.c}" cy="${p.y-22}" rx="${(p.wd/2+26)*k}" ry="${52*k}" fill="none" stroke="#e0483a" stroke-width="10"/>`;} }
  o+=`</g>`;
  if(t<4.1){ const bl=(Math.floor(t*3)%2===0); o+=fTxt(540,1480,'LÊ EM VOZ ALTA!',86,bl?'#fff':FY); if(t>=1.28&&t<2.05) o+=fStamp(t,1.28,540,1610,'RÁPIDO!','#e0483a',90,-6); }
  if(t>=4.1&&t<6.64) o+=fStamp(t,4.1,540,1510,'ERROU!','#e0483a',88,-7);
  if(t>=6.64){ const k=pop(t,6.64); o+=`<g transform="translate(540 1665) scale(${k})">${fTxt(0,0,'PULOU UMA PALAVRA',62,'#fff')}</g>`; }
  return o+hookLerBR(t,2.0)+(t>2.0?fPill('FATO 1/2',t-2.0):'');
};
FP.lerBR2=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  o+=`<rect x="70" y="600" width="940" height="640" rx="40" fill="#fffaf0" stroke="${FK}" stroke-width="12"/>`;
  const SZ=74, ADV=SZ*0.66, lines=[[0,1,2],[3,4,5,6],[7,8,9],[10,11,12,13]], Y0=760, DY=130;
  const fix=ease(clamp((t-5.1)/0.8,0,1)), red=t>=4.03;
  lines.forEach((ids,li)=>{
    const wl=w=>[...w].reduce((q,c)=>q+CW(c),0)*SZ, SP=SZ*0.3;
    const tot=ids.reduce((q,i)=>q+wl(BR_OK[i]),0)+SP*(ids.length-1); let x=540-tot/2;
    ids.forEach((wi)=>{ const err=BR_ERR[wi], ok=BR_OK[wi], mp=mapLetras(err,ok);
      const posOk=[],posErr=[]; let a1=0,a2=0; [...ok].forEach(c=>{posOk.push(x+a1+CW(c)*SZ/2); a1+=CW(c)*SZ;}); [...err].forEach(c=>{posErr.push(x+a2+CW(c)*SZ/2); a2+=CW(c)*SZ;});
      [...err].forEach((ch,j)=>{ const i=mp[j], xs=posErr[j], xe=posOk[i], xx=xs+(xe-xs)*fix, moved=i!==j;
        const hop=moved?-40*Math.sin(Math.PI*fix):0;
        const col=moved&&red&&fix<1?'#e0483a':(moved&&fix>=1?'#2f9e6e':FK);
        o+=`<text x="${xx}" y="${Y0+li*DY+hop}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none">${ch}</text>`; });
      if(false){ const k=0; o+=`<rect x="${x-10}" y="${Y0+li*DY-80}" width="${wl(ok)+20}" height="104" rx="18" fill="none" stroke="#4cc3f0" stroke-width="6" opacity="${k}"/>`; }
      x+=wl(ok)+SP; });
  });
  if(t<4.03){ const k=pop(t,0.24); const pl=1+.06*Math.sin(t*6); o+=`<g transform="translate(540 470) scale(${k*pl})">${fTxt(0,0,'LÊ ESSA AQUI',96,FY)}</g>`; }
  if(t>=4.03&&t<5.6) o+=fTxt(540,470,'TUDO EMBARALHADO!',84,'#e0483a');
  if(t>=5.6) o+=fStamp(t,5.6,540,1390,'LEU DE BOA!','#2f9e6e',92,-6);
  if(t>=5.9){ const k=pop(t,5.9); o+=`<g transform="translate(540 470) scale(${k})">${fTxt(0,0,'MAIS RÁPIDO',86,'#fff')}${fTxt(0,96,'QUE O WI-FI 😂',86,FY)}</g>`; }
  return o+fPill('FATO 2/2',t);
};
FP.lerBR_fim=(t,dur)=>{
  if(t>dur-.3) return FP.lerBR1(0.1,9.4);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  const k=pop(t,0); o+=`<g transform="translate(540 760) scale(${k})">${fTxt(0,0,'MANDA PRA QUEM',96,'#fff')}${fTxt(0,120,'ACHA QUE NÃO CAI',96,FY)}</g>`;
  o+=`<g transform="translate(540 1160) rotate(${Math.sin(t*3)*5})"><text x="0" y="60" font-size="220" text-anchor="middle">😏</text></g>`;
  if(t>1.6){ const p=pop(t,1.6); o+=`<g transform="translate(540 1560) scale(${p})"><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${FY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle" stroke="none">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle" stroke="none">TEM MAIS 2 FATOS</text></g>`; }
  return o;
};
