// ===== 2 FACTOS — "O teu cérebro vai enganar-te" (palavra repetida + letras baralhadas) =====
function hookLer(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="70" fill="${FK}" text-anchor="middle" stroke="none">O TEU CÉREBRO</text><text x="540" y="318" font-family="M" font-weight="900" font-size="70" fill="#e0483a" text-anchor="middle" stroke="none">VAI ENGANAR-TE</text></g>`; }
// layout das palavras dentro do triângulo (posição x central de cada palavra)
const LW=(w,sz)=>[...w].reduce((a,c)=>a+(c==='I'?0.38:c==='M'||c==='W'?1.02:0.8),0)*sz;
function linhaPal(words,cx,sz){ const sp=sz*0.32; const tot=words.reduce((a,w)=>a+LW(w,sz),0)+sp*(words.length-1); let x=cx-tot/2; return words.map(w=>{const c=x+LW(w,sz)/2; x+=LW(w,sz)+sp; return {w,c,wd:LW(w,sz)};}); }
// 1.º facto (0 – 11,6)
FP.ler1=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  const wob=Math.sin(t*3)*1.2, sc=1+0.012*Math.sin(t*5);
  o+=`<g transform="translate(540 900) rotate(${wob}) scale(${sc}) translate(-540 -900)">`;
  o+=`<path d="M540,420 L1060,1360 L20,1360 Z" fill="${FY}" stroke="${FK}" stroke-width="16" stroke-linejoin="round"/>`;
  
  o+=olhoIcon(540,800,.85,false);
  const SZ=82, l1=linhaPal(['UM','PASSEIO','NO'],540,SZ), l2=linhaPal(['NO','PARQUE'],540,SZ), Y1=1185, Y2=1295;
  const words=[...l1.map(p=>({...p,y:Y1})),...l2.map(p=>({...p,y:Y2}))];
  // marcador a ler devagar (3,57 – 5,43)
  const tm=[3.6,3.9,4.25,4.85,5.1];
  if(t>=3.57&&t<5.79){ let k=0; for(let i=0;i<5;i++) if(t>=tm[i]) k=i; const p=words[k]; o+=`<rect x="${p.c-p.wd/2-10}" y="${p.y-58}" width="${p.wd+20}" height="76" rx="14" fill="#ffffff" opacity=".75" stroke="none"/>`; }
  // segundo "NO" salta fora quando ele diz "e salta…"
  words.forEach((p,i)=>{ let dy=0, op=1;
    if(i===3&&t>=9.58){const k=ease((t-9.58)/0.6); dy=-140*k; op=1-k*.85;}
    const col=(t>=5.79&&(i===2||i===3))?'#e0483a':FK;
    o+=`<text x="${p.c}" y="${p.y+dy}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none" opacity="${op}">${p.w}</text>`; });
  if(t>=5.79&&t<9.58){ for(const i of [2,3]){const p=words[i]; const k=ease((t-5.79)/.3); o+=`<ellipse cx="${p.c}" cy="${p.y-22}" rx="${(p.wd/2+26)*k}" ry="${52*k}" fill="none" stroke="#e0483a" stroke-width="10"/>`;} }
  o+=`</g>`;
  if(t<5.79){ const bl=(Math.floor(t*3)%2===0); o+=fTxt(540,1480,'LÊ EM VOZ ALTA!',86,bl?'#fff':FY); if(t>=1.26&&t<3.5) o+=fStamp(t,1.26,540,1610,'RÁPIDO!','#e0483a',90,-6); }
  if(t>=5.79) o+=fStamp(t,5.79,540,1510,'APANHADO!','#e0483a',88,-7);
  if(t>=7.76){ const k=pop(t,7.76); o+=`<g transform="translate(540 1665) scale(${k})">${fTxt(0,0,'O CÉREBRO ADIVINHA',62,'#fff')}</g>`; }
  return o+hookLer(t,2.9)+(t>2.9?fPill('FACTO 1/2',t-2.9):'');
};
// ponte sussurrada (11,6 – 14,4)
FP.ler_ponte=(t,dur)=>{
  const z=1+ease(t/dur)*.15;
  return `<rect width="1080" height="1920" fill="#05060f" stroke="none"/><g transform="translate(540 960) scale(${z}) translate(-540 -960)">${fTxt(540,880,'MAS O 2.º…',120,'#fff')}${fTxt(540,1040,'É AINDA MAIS',110,'#e0483a')}${fTxt(540,1170,'ESTRANHO',140,'#e0483a')}</g>`;
};
// 2.º facto (14,4 – 25,0) — local: 0,09 "lê esta frase"; pausa; 4,27 "as letras estão todas trocadas"; 6,36 "e tu leste na mesma"; 7,77 explicação
const CW=c=>('iíl'.includes(c)?0.32:'tfjr'.includes(c)?0.45:'mw'.includes(c)?0.98:',.'.includes(c)?0.3:c==='?'?0.56:'E'===c?0.66:0.66);
const FR_ERR=['Etsás','a','ler','itso','sem','pboemrlas,','não','etsás?'];
const FR_OK =['Estás','a','ler','isto','sem','problemas,','não','estás?'];
function mapLetras(err,ok){ // para cada letra baralhada, a posição certa
  const used=Array(ok.length).fill(false); return [...err].map((ch,j)=>{ if(ok[j]===ch&&!used[j]){used[j]=true;return j;} for(let i=0;i<ok.length;i++) if(!used[i]&&ok[i]===ch&&err[i]!==ok[i]){used[i]=true;return i;} for(let i=0;i<ok.length;i++) if(!used[i]&&ok[i]===ch){used[i]=true;return i;} return j; }); }
FP.ler2=(t,dur)=>{
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  o+=`<rect x="70" y="600" width="940" height="640" rx="40" fill="#fffaf0" stroke="${FK}" stroke-width="12"/>`;
  const SZ=96, ADV=SZ*0.66, lines=[[0,1,2],[3,4],[5],[6,7]], Y0=740, DY=140;
  const fix=ease(clamp((t-6.36)/0.8,0,1)), red=t>=4.27;
  lines.forEach((ids,li)=>{
    const wl=w=>[...w].reduce((q,c)=>q+CW(c),0)*SZ, SP=SZ*0.3;
    const tot=ids.reduce((q,i)=>q+wl(FR_OK[i]),0)+SP*(ids.length-1); let x=540-tot/2;
    ids.forEach((wi)=>{ const err=FR_ERR[wi], ok=FR_OK[wi], mp=mapLetras(err,ok);
      const posOk=[],posErr=[]; let a1=0,a2=0; [...ok].forEach(c=>{posOk.push(x+a1+CW(c)*SZ/2); a1+=CW(c)*SZ;}); [...err].forEach(c=>{posErr.push(x+a2+CW(c)*SZ/2); a2+=CW(c)*SZ;});
      [...err].forEach((ch,j)=>{ const i=mp[j], xs=posErr[j], xe=posOk[i], xx=xs+(xe-xs)*fix, moved=i!==j;
        const hop=moved?-40*Math.sin(Math.PI*fix):0;
        const col=moved&&red&&fix<1?'#e0483a':(moved&&fix>=1&&t<7.77?'#2f9e6e':FK);
        o+=`<text x="${xx}" y="${Y0+li*DY+hop}" font-family="M" font-weight="900" font-size="${SZ}" fill="${col}" text-anchor="middle" stroke="none">${ch}</text>`; });
      if(t>=7.77){ const k=ease((t-7.77)/.4); o+=`<rect x="${x-10}" y="${Y0+li*DY-80}" width="${wl(ok)+20}" height="104" rx="18" fill="none" stroke="#4cc3f0" stroke-width="6" opacity="${k}"/>`; }
      x+=wl(ok)+SP; });
  });
  if(t<4.27){ const k=pop(t,0.09); const pl=1+.06*Math.sin(t*6); o+=`<g transform="translate(540 470) scale(${k*pl})">${fTxt(0,0,'LÊ ESTA FRASE',96,FY)}</g>`; }
  if(t>=4.27&&t<6.36) o+=fTxt(540,470,'LETRAS TROCADAS!',90,'#e0483a');
  if(t>=6.36) o+=fStamp(t,6.36,540,1400,'LESTE NA MESMA!','#2f9e6e',84,-6);
  if(t>=7.77){ const k=pop(t,7.77); o+=`<g transform="translate(540 470) scale(${k})">${fTxt(0,0,'LÊS A PALAVRA',86,'#fff')}${fTxt(0,96,'INTEIRA',96,FY)}</g>`; }
  return o+fPill('FACTO 2/2',t);
};
// fim (25,0 – fim)
FP.ler_fim=(t,dur)=>{
  if(t>dur-.35) return FP.ler1(0.1,11.6);
  let o=fBg(t,'#2a2470','#0b0a2a',1000);
  o+=fTxt(540,640,'QUANTAS TE',115,'#fff')+fTxt(540,780,'APANHARAM?',120,FY);
  const cols=['#e0483a','#f6c744','#2f9e6e'];
  for(let i=0;i<3;i++){const on=Math.floor(t*5)%3===i; o+=`<g transform="translate(${260+i*280} 1100) scale(${on?1.15:1})"><circle r="115" fill="${cols[i]}" stroke="${FK}" stroke-width="12"/><text y="62" font-family="M" font-weight="900" font-size="180" fill="#fff" text-anchor="middle" stroke="none">${i}</text></g>`;}
  o+=fTxt(540,1420,'COMENTA!',100,'#fff');
  return o;
};
