// ===== 2 FATOS (BR) — Ponta do mindinho + bandeira invertida (pós-imagem) =====
// mão de lado (vista do lado do mindinho): palma para a esquerda, dedos para cima.
// dobrar = rodar para a esquerda (ângulos negativos).
function mbDefs(){ return `<defs>
<linearGradient id="mbSk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3a67c"/><stop offset=".35" stop-color="#f3c9a3"/><stop offset=".75" stop-color="#f7d3b1"/><stop offset="1" stop-color="#d9976b"/></linearGradient>
<linearGradient id="mbSkB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c98a62"/><stop offset=".5" stop-color="#dba57f"/><stop offset="1" stop-color="#b97b55"/></linearGradient>
<linearGradient id="mbArm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d99d75"/><stop offset=".4" stop-color="#f3c9a3"/><stop offset="1" stop-color="#cf9066"/></linearGradient>
<linearGradient id="mbNail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9e1"/><stop offset="1" stop-color="#f0b9a8"/></linearGradient>
<radialGradient id="mbVig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
<radialGradient id="mbMus" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ff8a8a"/><stop offset="1" stop-color="#c2364a"/></radialGradient>
<filter id="mbGl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
</defs>`; }
// dedo em 3 falanges. ang = [MCP, PIP, DIP] em graus. back=true → dedo de trás (mais escuro)
function mbDedo(x,y,L,w,ang,back){
  const fill=back?'url(#mbSkB)':'url(#mbSk)', sw=back?7:8;
  const seg=(l,last)=>{ let s=`<rect x="${-w/2}" y="${-l-w*.15}" width="${w}" height="${l+w*.3}" rx="${w/2}" fill="${fill}" stroke="${FK}" stroke-width="${sw}"/>`;
    if(!last) s+=`<path d="M${-w*.42},${-l+6} q${-6},10 0,20" fill="none" stroke="${back?'#9c6544':TSH}" stroke-width="5"/>`; // prega do lado da palma
    if(last&&!back) s+=`<path d="M${w*.12},${-l+10} q${w*.36},6 ${w*.36},${l*.45} l-${w*.08},2 q-${w*.24},-${l*.18} -${w*.28},-${l*.4} Z" fill="url(#mbNail)" stroke="#c7866f" stroke-width="4"/>`;
    if(!back) s+=`<path d="M${w*.18},${-l+8} L${w*.2},${-8}" stroke="#fff" stroke-width="6" opacity=".35" stroke-linecap="round"/>`;
    return s; };
  let o=`<g transform="translate(${x} ${y}) rotate(${ang[0]})">${seg(L[0])}`;
  o+=`<g transform="translate(0 ${-L[0]}) rotate(${ang[1]})">${seg(L[1])}`;
  o+=`<g transform="translate(0 ${-L[1]}) rotate(${ang[2]})">${seg(L[2],true)}</g></g></g>`;
  return o; }
// posição da ponta (para setas/brilhos)
function mbTip(x,y,L,ang){ let a=0, px=x, py=y; for(let i=0;i<3;i++){ a+=ang[i]*Math.PI/180; px+=Math.sin(a)*L[i]; py-=Math.cos(a)*L[i]; } return [px,py]; }
function mbJoint(x,y,L,ang,n){ let a=0, px=x, py=y; for(let i=0;i<n;i++){ a+=ang[i]*Math.PI/180; px+=Math.sin(a)*L[i]; py-=Math.cos(a)*L[i]; } return [px,py]; }
// estado da mão no tempo t: tentativa repetida de dobrar só a ponta
function mbPose(t){
  const cyc=(t%1.7)/1.7, k=cyc<.55?ease(cyc/.55):(cyc<.8?1:1-ease((cyc-.8)/.2));
  const tr=Math.sin(t*47)*2.2*k;           // a ponta treme
  const dip=-48*k+tr, pip=-34*k+Math.sin(t*31)*1.5*k, mcp=-6*k;
  const ring=[-4*k,-22*k+Math.sin(t*29)*1.2*k,-18*k];
  return {k,pinky:[mcp,pip,dip],ring}; }
const MBP={x:560,y:1060,L:[170,112,92],w:74}, MBR={x:600,y:1035,L:[196,128,98],w:80}, MBM={x:632,y:1022,L:[206,134,102],w:80};
function mbMao(t,{xray=0}={}){
  const P=mbPose(t);
  let o=`<g stroke-linecap="round" stroke-linejoin="round">`;
  // antebraço
  o+=`<path d="M470,1400 C462,1560 452,1740 440,1960 L760,1960 C752,1740 740,1560 732,1400 Z" fill="url(#mbArm)" stroke="${FK}" stroke-width="8"/>`;
  // dedos de trás (médio + anelar)
  o+=mbDedo(MBM.x,MBM.y,MBM.L,MBM.w,[-3*P.k,-12*P.k,-8*P.k],true);
  o+=mbDedo(MBR.x,MBR.y,MBR.L,MBR.w,P.ring,true);
  // palma (de lado)
  o+=`<path d="M478,1408 C456,1300 470,1150 516,1040 Q600,1000 690,1010 C722,1080 752,1200 742,1300 C738,1350 736,1380 732,1408 Z" fill="url(#mbSk)" stroke="${FK}" stroke-width="8"/>`;
  o+=`<path d="M505,1120 q-14,60 -8,140 M712,1060 q22,90 14,200" fill="none" stroke="${TSH}" stroke-width="6" opacity=".55"/>`;
  o+=`<path d="M482,1360 q120,16 250,-2" fill="none" stroke="#c88a62" stroke-width="5"/>`;
  // polegar (atrás, do lado esquerdo — palma)
  o+=`<path d="M520,1250 C470,1200 440,1140 432,1080" fill="none" stroke="${FK}" stroke-width="84"/><path d="M520,1250 C470,1200 440,1140 432,1080" fill="none" stroke="#e7b089" stroke-width="68"/>`;
  // mindinho (frente)
  o+=mbDedo(MBP.x,MBP.y,MBP.L,MBP.w,P.pinky,false);
  // raio-X: músculo flexor profundo + tendões para anelar e mindinho
  if(xray>0){
    const tP=mbTip(MBP.x,MBP.y,MBP.L,P.pinky), tR=mbTip(MBR.x,MBR.y,MBR.L,P.ring);
    const jP=mbJoint(MBP.x,MBP.y,MBP.L,P.pinky,2), jR=mbJoint(MBR.x,MBR.y,MBR.L,P.ring,2);
    const jP1=mbJoint(MBP.x,MBP.y,MBP.L,P.pinky,1), jR1=mbJoint(MBR.x,MBR.y,MBR.L,P.ring,1);
    const pul=.6+.4*Math.sin(t*9)*P.k;
    o+=`<g opacity="${xray}">`;
    o+=`<path d="M560,1880 C520,1760 520,1560 580,1470 C640,1560 660,1760 640,1880 Z" fill="url(#mbMus)" stroke="#fff" stroke-width="5" opacity=".95" transform="translate(600 1680) scale(${1+.04*P.k} ${1-.05*P.k}) translate(-600 -1680)"/>`;
    o+=`<path d="M570,1600 q30,-60 30,-120 M610,1610 q-6,-70 -4,-130" stroke="#ffb3b3" stroke-width="4" fill="none"/>`;
    const tend=(j1,j2,tp,c)=>`<path d="M600,1470 C590,1300 ${j1[0]-28},${j1[1]+40} ${j1[0]-26},${j1[1]} S${j2[0]-24},${j2[1]} ${tp[0]-18},${tp[1]+14}" fill="none" stroke="${c}" stroke-width="10"/>`;
    o+=`<g filter="url(#mbGl)" opacity="${pul}">${tend(jR1,jR,tR,FY)}${tend(jP1,jP,tP,FY)}</g>`;
    o+=tend(jR1,jR,tR,'#fff')+tend(jP1,jP,tP,'#fff');
    o+=`</g>`; }
  // brilho nas articulações que não deviam mexer
  return o+`</g>`; }
function mbHook(t,end,l1,l2){ if(t>end) return ''; const op=t>end-.2?(end-t)/.2:1;
  return `<g opacity="${op}"><rect x="48" y="162" width="1000" height="200" rx="26" fill="#000" opacity=".25"/><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="68" fill="${FK}" text-anchor="middle">${l1}</text><text x="540" y="318" font-family="M" font-weight="900" font-size="68" fill="#e0483a" text-anchor="middle">${l2}</text></g>`; }

// tempos (provisórios até chegar a voz): L2 "não dá" 2,5 · L3 "o músculo" 4,4
const MB={nao:2.5, mus:4.4, flag:7.9, branco:21.3, fim:25.6};
// 1 · Mindinho (0 – 7,9)
FP.mb_mindinho=(t,dur)=>{
  let o=mbDefs()+fBg(t,'#2a2470','#0b0a2a',1100);
  const z=1.36-.06*ease(clamp(t/3,0,1));
  const xr=ease(clamp((t-MB.mus)/.5,0,1));
  o+=`<g transform="translate(600 1150) scale(${z}) translate(-600 -1150)">`+mbMao(t,{xray:xr})+`</g>`;
  const P=mbPose(t);
  // círculos de "isto não devia mexer" no PIP do mindinho e no anelar
  if(t>=MB.nao&&t<MB.mus+.3){ const s=pop(t,MB.nao,.2);
    const sc=(x,y)=>{ const X=600+(x-600)*z, Y=1150+(y-1150)*z; return [X,Y]; };
    const a=sc(...mbJoint(MBP.x,MBP.y,MBP.L,P.pinky,1)), b=sc(...mbJoint(MBR.x,MBR.y,MBR.L,P.ring,2));
    o+=`<g transform="translate(${a[0]} ${a[1]}) scale(${s})"><circle r="64" fill="none" stroke="#e0483a" stroke-width="10"/></g><g transform="translate(${b[0]} ${b[1]}) scale(${s})"><circle r="64" fill="none" stroke="#e0483a" stroke-width="10"/></g>`;
    o+=fStamp(t,MB.nao+.15,560,1290,'NÃO DÁ!','#e0483a',110,-6); }
  if(t>=MB.mus){ o+=fStamp(t,MB.mus+.6,560,1290,'1 MÚSCULO SÓ','#e0483a',90,-5);
  }
  return o+mbHook(t,dur,'DOBRA SÓ A PONTA','DO MINDINHO');
};
// 2 · Bandeira invertida (7,9 – 21,3) — tudo PARADO (só o contador muda)
function mbBandeira(cx,cy,W){ const H=W*.7, x0=cx-W/2, y0=cy-H/2, m=W*.085, R=W*.175;
  let o=`<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#ff63c4"/>`;
  o+=`<path d="M${cx},${y0+m} L${x0+W-m},${cy} L${cx},${y0+H-m} L${x0+m},${cy} Z" fill="#0020ff"/>`;
  o+=`<clipPath id="mbC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${R}" fill="#ffd889"/>`;
  o+=`<g clip-path="url(#mbC)"><path d="M${cx-R*1.3},${cy+R*.05} Q${cx},${cy-R*.75} ${cx+R*1.3},${cy+R*.25}" fill="none" stroke="#111" stroke-width="${R*.2}"/>`;
  const st=[[-.4,.35],[-.15,.5],[.1,.42],[.35,.55],[.2,.75],[-.3,.7],[0,.8],[.5,.3],[-.55,.15]];
  for(const [a,b] of st) o+=`<circle cx="${cx+a*R}" cy="${cy+b*R}" r="${R*.035}" fill="#111"/>`;
  o+=`</g>`; return o; }
FP.mb_bandeira=(t,dur)=>{
  let o=`<rect width="1080" height="1920" fill="#3a3a3a"/>`+mbBandeira(540,960,1040);
  o+=`<circle cx="540" cy="960" r="15" fill="#000"/><circle cx="540" cy="960" r="5" fill="#fff"/>`;
  o+=`<g transform="translate(540 330)"><rect x="-430" y="-80" width="860" height="160" rx="80" fill="#e0483a" stroke="${FK}" stroke-width="8"/><text y="-6" font-family="M" font-weight="900" font-size="58" fill="#fff" text-anchor="middle">OLHA SÓ PRO PONTO</text><text y="54" font-family="M" font-weight="900" font-size="46" fill="${FY}" text-anchor="middle">E NÃO PISCA</text></g>`;
  const left=Math.max(1,Math.ceil(Math.min(10,dur-t)));
  if(dur-t<=10.5){ o+=`<g transform="translate(540 1600)"><circle r="92" fill="${FK}" stroke="#fff" stroke-width="8"/><text y="34" font-family="M" font-weight="900" font-size="100" fill="#fff" text-anchor="middle">${left}</text></g>`; }
  const pr=clamp(t/(dur-.05),0,1); o+=`<g transform="translate(540 470)"><rect x="-300" y="-14" width="600" height="28" rx="14" fill="${FK}" stroke="#fff" stroke-width="4"/><rect x="-294" y="-8" width="${588*pr}" height="16" rx="8" fill="#fff"/></g>`;
  return o; };
// 3 · Branco (21,3 – fim) — só o ponto, no mesmo sítio
FP.mb_branco=(t,dur)=>`<rect width="1080" height="1920" fill="#ffffff"/><circle cx="540" cy="960" r="15" fill="#000"/><circle cx="540" cy="960" r="5" fill="#fff"/>`;
