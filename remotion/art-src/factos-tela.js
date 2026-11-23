// ===== 2 FATOS (BR) — Luz escondida do controle (infravermelho) + Gota de água mostra os pixels =====
const IRT={aperta:3.24, flash:4.6, viu:5.15, olhos:6.65, camera:8.73, infra:10.24, codigo:11.73, canal:15.37, volume:18.16, fim:19.6, botoes:20.77, end:22.6};
function irControle(x,y,s,rot,press=0,ledOn=0){ let o=`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${FK}" stroke-linejoin="round">`;
  o+=`<rect x="-80" y="-260" width="160" height="520" rx="60" fill="#2a2d3a" stroke-width="9"/><rect x="-62" y="-240" width="40" height="480" rx="20" fill="#3a3e50" stroke="none" opacity=".7"/>`;
  o+=`<ellipse cx="0" cy="-262" rx="30" ry="14" fill="#16161e" stroke-width="6"/>`;
  if(ledOn>0) o+=`<ellipse cx="0" cy="-266" rx="${22+ledOn*30}" ry="${12+ledOn*18}" fill="#c77dff" opacity="${.35*ledOn}" stroke="none"/><ellipse cx="0" cy="-264" rx="14" ry="8" fill="#e7c6ff" stroke="none" opacity="${ledOn}"/>`;
  o+=`<circle cx="0" cy="-180" r="26" fill="#e0483a" stroke-width="6"/><path d="M0,-196 V-176 M-12,-188 A16,16 0 1,0 12,-188" fill="none" stroke="#fff" stroke-width="5"/>`;
  for(let r=0;r<3;r++) for(let k=0;k<3;k++){ const bx=-46+k*46, by=-100+r*50, pr=(r===1&&k===1)?press:0; o+=`<rect x="${bx-17}" y="${by-15+pr*5}" width="34" height="30" rx="9" fill="${pr?'#ffd21f':'#5a5f78'}" stroke-width="5"/>`; }
  o+=`<circle cx="0" cy="110" r="60" fill="#3a3e50" stroke-width="6"/><circle cx="0" cy="110" r="22" fill="#5a5f78" stroke-width="5"/>`;
  o+=`<rect x="-50" y="190" width="40" height="40" rx="10" fill="#2fa860" stroke-width="5"/><rect x="10" y="190" width="40" height="40" rx="10" fill="#2e86d0" stroke-width="5"/>`;
  return o+`</g>`; }
// ecrã do telemóvel a mostrar a câmara de selfie
function irPhoneCam(t,cx,cy,s,led){ const w=520*s, h=1000*s; let o=`<g>`;
  o+=`<rect x="${cx-w/2-14*s}" y="${cy-h/2-14*s}" width="${w+28*s}" height="${h+28*s}" rx="${80*s}" fill="${EC.body}" stroke="${FK}" stroke-width="10"/>`;
  o+=`<clipPath id="irScr"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${66*s}"/></clipPath><g clip-path="url(#irScr)"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" fill="#3b3f4f"/>`;
  o+=`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" fill="url(#irVign)"/>`;
  o+=irControle(cx,cy+h*.12,s*.95,180,0,led);
  if(led>0) o+=`<circle cx="${cx}" cy="${cy+h*.12+262*s*.95}" r="${70*s+led*60*s}" fill="#c77dff" opacity="${.45*led}"/>`;
  o+=`</g><circle cx="${cx}" cy="${cy-h/2+38*s}" r="${14*s}" fill="${FK}"/><rect x="${cx-w/2+20*s}" y="${cy+h/2-120*s}" width="${w-40*s}" height="${100*s}" rx="${20*s}" fill="#000" opacity=".35"/><circle cx="${cx}" cy="${cy+h/2-70*s}" r="${36*s}" fill="#fff" stroke="${FK}" stroke-width="5"/>`;
  return o+`</g>`; }
function irOlho(x,y,s,t){ const bl=Math.abs(Math.sin(t*1.3))>.97?.15:1; return `<g transform="translate(${x} ${y}) scale(${s} ${s*bl})" stroke="${FK}" stroke-width="8"><path d="M-120,0 Q0,-90 120,0 Q0,90 -120,0 Z" fill="#fff"/><circle r="44" fill="#5a3a22"/><circle r="22" fill="${FK}"/><circle cx="-12" cy="-14" r="9" fill="#fff" stroke="none"/></g>`; }
function irTV(x,y,s,ch,vol){ let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-width="9"><rect x="-300" y="-200" width="600" height="380" rx="28" fill="#1b1d26"/><rect x="-272" y="-174" width="544" height="320" rx="14" fill="${['#2e86d0','#2fa860','#e0483a','#a06ae0'][ch%4]}"/><path d="M-80,180 L-110,240 M80,180 L110,240 M-140,240 H140" stroke-width="14" stroke-linecap="round"/>`;
  o+=`<text x="230" y="-110" font-family="M" font-weight="900" font-size="64" fill="#fff" stroke="${FK}" stroke-width="10" paint-order="stroke" text-anchor="end">${ch}</text>`;
  if(vol>=0){ o+=`<g transform="translate(-200 80)"><path d="M0,-20 h20 l26,-22 v84 l-26,-22 h-20 z" fill="#fff" stroke-width="5"/>`; for(let i=0;i<10;i++) o+=`<rect x="${70+i*30}" y="-14" width="22" height="34" rx="4" fill="${i<vol?'#ffd21f':'#3a3e50'}" stroke-width="4"/>`; o+=`</g>`; }
  return o+`</g>`; }
FP.ir_scene=(t)=>{ let b='', s=`<defs><radialGradient id="irVign" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#6a6f85" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>`, o='';
  const pressT=t>=IRT.flash&&t<IRT.olhos+.2, blink=pressT?(.5+.5*Math.sin(t*28)>.4?1:.25):0;
  if(t<IRT.olhos){ // controle apontado à câmara de selfie
    const ap=ease(clamp(t/1.2,0,1)); s+=irPhoneCam(t,380,930,.82,t>=IRT.flash?blink:0);
    s+=irControle(860-(1-ap)*200,1240-(1-ap)*120,.75,-58,t>=IRT.aperta&&t<IRT.viu?1:0,0);
    o+=`<path d="M${790},${1080} Q600,980 460,${700}" fill="none" stroke="${FY}" stroke-width="8" stroke-dasharray="18 12" opacity="${ap}"/>`;
    if(t<IRT.aperta) o+=fStamp(t,.3,540,470,'CÂMERA DE SELFIE','#2e86d0',60,-4);
    else if(t<IRT.flash) o+=fStamp(t,IRT.aperta+.1,540,470,'APERTA!','#e0483a',100,-6);
    else o+=fStamp(t,IRT.viu,540,470,'LUZ ROXA!','#a06ae0',100,-6);
  } else if(t<IRT.infra){ // olho não vê, câmara vê
    s+=irOlho(300,800,1.1,t)+irPhoneCam(t,780,980,.6,.6+.4*Math.sin(t*20));
    o+=ecX(t,IRT.olhos+.2,300,640,62)+fTxt(300,960,'TEU OLHO',54,'#fff');
    if(t>=IRT.camera) o+=ecOk(t,IRT.camera+.1,780,560,62)+fTxt(780,1350,'A CÂMERA',54,FY);
  } else if(t<IRT.codigo){ // espetro: infravermelho depois do vermelho
    const u=ease(clamp((t-IRT.infra)/.6,0,1)); const C=['#8a3ffc','#2e86d0','#2fa860','#ffd21f','#ff8a1f','#e0483a'];
    C.forEach((c,i)=>{ s+=`<rect x="${110+i*110}" y="760" width="110" height="200" fill="${c}" stroke="${FK}" stroke-width="6"/>`; });
    s+=`<rect x="770" y="760" width="${200*u}" height="200" fill="#3b1a4a" stroke="${FK}" stroke-width="6"/>`;
    for(let i=0;i<6;i++) s+=`<path d="M${790+i*30},${780} v160" stroke="#c77dff" stroke-width="4" opacity="${u*(.4+.6*Math.abs(Math.sin(t*6+i)))}"/>`;
    o+=fTxt(440,1040,'O QUE VOCÊ VÊ',50,'#fff')+(u>.5?fTxt(870,1040,'INFRA-',46,'#c77dff')+fTxt(870,1095,'VERMELHO',46,'#c77dff'):'');
    o+=fStamp(t,IRT.infra+.2,540,520,'LUZ INFRAVERMELHA','#a06ae0',56,-4);
  } else if(t<IRT.canal){ // código de piscadas
    const code=[1,0,1,1,0,1,0,0,1,1,0,1]; const u=t-IRT.codigo, n=Math.min(code.length,Math.floor(u*5));
    s+=irControle(220,960,.7,-90,0,code[Math.floor(u*5)%code.length]);
    for(let i=0;i<n;i++){ const x=380+i*55, on=code[i]; s+=`<rect x="${x}" y="${on?860:930}" width="40" height="${on?140:70}" rx="8" fill="${on?'#c77dff':'#3a3e50'}" stroke="${FK}" stroke-width="5"/>`; o+=fTxt(x+20,1060,String(on),34,on?'#c77dff':'#9aa6bb'); }
    o+=fStamp(t,IRT.codigo+.2,540,520,'CADA BOTÃO = UM CÓDIGO','#2e86d0',50,-4);
  } else if(t<IRT.fim){ // TV: canal e volume
    const ch=t<IRT.volume?3+Math.floor((t-IRT.canal)*1.4):7, vol=t>=IRT.volume?Math.min(10,Math.floor((t-IRT.volume)*6)+3):-1;
    s+=irTV(540,860,1.15,ch,vol)+irControle(820,1250,.5,-30,(Math.floor(t*4)%2),Math.floor(t*8)%2);
    o+=fStamp(t,t<IRT.volume?IRT.canal+.1:IRT.volume,540,470,t<IRT.volume?'MUDA O CANAL':'AUMENTA O VOLUME','#e0483a',64,-5);
  } else { s+=irPhoneCam(t,540,930,.6,.5+.5*Math.sin(t*22));
    if(t>=IRT.botoes){ const k=pop(t,IRT.botoes,.25); o+=`<g transform="translate(540 1260) scale(${k})">`;
      [['SIM',EC.ok,-210],['NÃO',EC.no,210]].forEach(([n,c,x],i)=>{ const bb=Math.sin(t*6+i*2)*8; o+=`<g transform="translate(${x} ${bb})"><rect x="-170" y="-80" width="340" height="160" rx="40" fill="${c}" stroke="${FK}" stroke-width="10"/><text y="34" font-family="M" font-weight="900" font-size="96" fill="#fff" text-anchor="middle">${n}</text></g>`; }); o+=`</g>`; }
    o+=fStamp(t,IRT.fim+.1,540,470,'TESTA AÍ!','#e0483a',100,-6); }
  return {b,s,o}; };

const GTT={olha:2.5, cores:4.5, lupa:7.1, milhoes:8.96, branco:12.16, seca:16.9, fim:18.64, botoes:19.26, end:20.7};
function gtSub(x,y,s,int=1){ return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-27" y="-40" width="16" height="80" rx="6" fill="#ff2a2a" opacity="${int}"/><rect x="-8" y="-40" width="16" height="80" rx="6" fill="#2aff5a" opacity="${int}"/><rect x="11" y="-40" width="16" height="80" rx="6" fill="#2a6aff" opacity="${int}"/></g>`; }
function gtGota(x,y,r,t){ return `<g><ellipse cx="${x}" cy="${y+r*.15}" rx="${r}" ry="${r*.8}" fill="#7fd3f7" fill-opacity=".35" stroke="#3a9ad9" stroke-width="6"/><ellipse cx="${x-r*.35}" cy="${y-r*.25}" rx="${r*.25}" ry="${r*.12}" fill="#fff" opacity=".85"/></g>`; }
FP.gt_scene=(t)=>{ let b='', s=`<defs><linearGradient id="ecScr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#eef2f8"/></linearGradient></defs>`, o='';
  if(t<GTT.cores){ // conta-gotas + gota no ecrã branco
    const z=t<GTT.olha?1:1+ease((t-GTT.olha)/1.6)*1.6;
    s+=`<g transform="translate(540 900) scale(${z}) translate(-540 -900)">`+ecPhone(1e9,540,930,1,1e9)+`<rect x="280" y="430" width="520" height="1000" rx="66" fill="#fff"/>`;
    const fallU=clamp((t-.6)/.7,0,1), dy=fallU*fallU*360, land=fallU>=1;
    s+=`<g transform="translate(540 ${640-Math.max(0,(1-ease(clamp(t/.5,0,1)))*200)})" stroke="${FK}" stroke-width="8"><rect x="-26" y="-260" width="52" height="200" rx="20" fill="#e0483a"/><path d="M-20,-60 L20,-60 L8,60 L-8,60 Z" fill="#bfefff" fill-opacity=".7"/></g>`;
    if(!land) s+=`<path d="M540,${700+dy*.55-20} q22,30 0,44 q-22,-14 0,-44 Z" fill="#7fd3f7" stroke="${FK}" stroke-width="5"/>`;
    else { const sp=ease(clamp((t-1.3)/.25,0,1)); s+=gtGota(540,900,70*sp+10,t); if(t<1.7) for(let i=0;i<6;i++){ const a=i*1.05, r=60+((t-1.3)*400); s+=`<circle cx="${540+Math.cos(a)*r}" cy="${900+Math.sin(a)*r*.5}" r="6" fill="#bfefff" stroke="${FK}" stroke-width="3" opacity="${1-(t-1.3)/.4}"/>`; } }
    s+=`</g>`;
    if(t<GTT.olha) o+=fStamp(t,.2,540,420,'TELA BRANCA','#2e86d0',80,-5); else o+=fStamp(t,GTT.olha+.1,540,420,'OLHA DE PERTINHO','#e0483a',64,-5);
  } else if(t<GTT.lupa){ // dentro da gota: subpíxeis RGB
    b=`<rect width="1080" height="1920" fill="#f4f6fb"/>`; const z=1+.08*Math.sin(t);
    s+=`<g transform="translate(540 900) scale(${z}) translate(-540 -900)"><clipPath id="gtC"><circle cx="540" cy="900" r="380"/></clipPath><circle cx="540" cy="900" r="380" fill="#101018"/><g clip-path="url(#gtC)">`;
    for(let r=-5;r<=5;r++) for(let k=-5;k<=5;k++){ const x=540+k*80, y=900+r*100; const d=Math.hypot(x-540,y-900)/380; s+=gtSub(x,y,1.1-d*.3,1); }
    s+=`</g><circle cx="540" cy="900" r="380" fill="none" stroke="#e6fbff" stroke-width="14"/><ellipse cx="420" cy="700" rx="90" ry="40" fill="#fff" opacity=".5"/></g>`;
    o+=fTxt(180,1380,'VERMELHO',50,'#ff4a4a')+fTxt(540,1380,'VERDE',50,'#3aff6a')+fTxt(880,1380,'AZUL',50,'#4a8aff');
    o+=fStamp(t,GTT.cores+.1,540,420,'PONTINHOS!','#e0483a',100,-6);
  } else if(t<GTT.milhoes){ // a gota é uma lupa
    s+=`<rect x="140" y="1050" width="800" height="40" fill="#f4f6fb" stroke="${FK}" stroke-width="6"/>`; for(let i=0;i<16;i++) s+=gtSub(180+i*48,1070,.35,1);
    s+=`<path d="M200,1050 Q540,620 880,1050 Z" fill="#bfefff" fill-opacity=".35" stroke="#7fd3f7" stroke-width="8"/>`;
    for(let i=0;i<4;i++){ const x=380+i*110; s+=`<path d="M${x},1050 L${540+(x-540)*.3},780 L${540+(x-540)*2.2},480" fill="none" stroke="${FY}" stroke-width="6" stroke-dasharray="14 10"/>`; }
    s+=irOlho(540,420,.8,t).replace('translate(540 420)','translate(540 420) rotate(180)');
    o+=`<g transform="translate(860 720)"><circle r="80" fill="none" stroke="${FK}" stroke-width="16"/><circle r="80" fill="none" stroke="#9aa6bb" stroke-width="10"/><path d="M58,58 L130,130" stroke="${FK}" stroke-width="30" stroke-linecap="round"/><path d="M58,58 L130,130" stroke="#8a5a3c" stroke-width="20" stroke-linecap="round"/></g>`;
    o+=fStamp(t,GTT.lupa+.1,540,1260,'A GOTA = LUPA','#2e86d0',80,-5);
  } else if(t<GTT.branco){ // milhões de pontinhos
    const z=Math.max(.12,1-ease((t-GTT.milhoes)/2.2)*.88); b=`<rect width="1080" height="1920" fill="#101018"/>`;
    s+=`<g transform="translate(540 930) scale(${z}) translate(-540 -930)">`; for(let r=-14;r<=14;r++) for(let k=-14;k<=14;k++) s+=gtSub(540+k*80,930+r*100,1,1); s+=`</g>`;
    const n=Math.round(ease(clamp((t-GTT.milhoes-.3)/2.2,0,1))*8000000);
    o+=`<g transform="translate(540 470)"><rect x="-360" y="-80" width="720" height="160" rx="30" fill="${FK}" stroke="${FY}" stroke-width="8"/><text y="32" font-family="M" font-weight="900" font-size="84" fill="${FY}" text-anchor="middle">${fmtBR(n)}+</text></g>`;
  } else if(t<GTT.seca){ // vermelho+verde+azul = branco
    const u=ease(clamp((t-GTT.branco-.8)/1.6,0,1)), d=180*(1-u)+40;
    s+=`<g style="isolation:isolate"><circle cx="${540}" cy="${830-d*.6}" r="200" fill="#ff0000" style="mix-blend-mode:screen"/><circle cx="${540-d*.7}" cy="${830+d*.5}" r="200" fill="#00ff00" style="mix-blend-mode:screen"/><circle cx="${540+d*.7}" cy="${830+d*.5}" r="200" fill="#0000ff" style="mix-blend-mode:screen"/></g>`;
    b=`<rect width="1080" height="1920" fill="#101018"/>`;
    o+=fStamp(t,GTT.branco+.2,540,420,t<14.2?'VERMELHO + VERDE + AZUL':'= BRANCO!','#e0483a',t<14.2?50:100,-5);
  } else if(t<GTT.fim){ // seca com paninho
    s+=ecPhone(1e9,540,930,.9,1e9)+`<rect x="306" y="480" width="468" height="900" rx="60" fill="#fff"/>`;
    const u=(t-GTT.seca)*3; s+=gtGota(540,930,60*Math.max(0,1-(t-GTT.seca)/1.2),t);
    s+=`<g transform="translate(${540+Math.sin(u)*120} ${930+Math.cos(u*1.3)*40}) rotate(${Math.sin(u)*12})"><path d="M-120,-80 Q0,-110 120,-80 L130,80 Q0,110 -130,80 Z" fill="#7fd3f7" stroke="${FK}" stroke-width="8"/><path d="M-100,-40 H100 M-104,0 H104 M-100,40 H100" stroke="#5ab3d9" stroke-width="6"/></g>`;
    o+=fStamp(t,GTT.seca+.1,540,420,'SECA DEPOIS!','#2fa860',90,-5);
  } else { b=`<rect width="1080" height="1920" fill="#101018"/>`;
    if(t>=GTT.botoes){ const k=pop(t,GTT.botoes,.25); o+=`<g transform="translate(540 900) scale(${k})">`;
      [['#ff2a2a',-260],['#2aff5a',0],['#2a6aff',260]].forEach(([c,x],i)=>{ const bb=Math.sin(t*6+i*2)*10; o+=`<g transform="translate(${x} ${bb})"><circle r="110" fill="${c}" stroke="${FK}" stroke-width="10"/></g>`; }); o+=`</g>`; }
    o+=fStamp(t,GTT.fim+.1,540,470,'QUAL COR PRIMEIRO?','#e0483a',70,-5); }
  return {b,s,o}; };
