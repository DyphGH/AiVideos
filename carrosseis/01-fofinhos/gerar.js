const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const lib=`
const W=1080,H=1350, PK='#ff9ec4', PKD='#e8649a', CR='#fff4e6', BLU='#7fd3ff';
function fundo(seed){ let o='<defs><radialGradient id="cbg" cx=".5" cy=".55" r=".8"><stop offset="0" stop-color="#2d2a78"/><stop offset="1" stop-color="#0d0b33"/></radialGradient></defs><rect width="1080" height="1350" fill="url(#cbg)"/>';
  for(let k=0;k<18;k++){const a=k*0.349+seed;o+='<path d="M540,760 L'+(540+Math.cos(a)*1600)+','+(760+Math.sin(a)*1600)+' L'+(540+Math.cos(a+0.17)*1600)+','+(760+Math.sin(a+0.17)*1600)+' Z" fill="#fff" opacity=".035"/>';}
  for(let i=0;i<26;i++){const x=(i*173+seed*90)%1080,y=(i*271)%1350,r=2+i%3; o+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#fff" opacity="'+(.15+(i%4)*.08)+'"/>';}
  for(let i=0;i<7;i++){const x=(i*211+60)%1040+20,y=(i*389+120)%1250+40,s=.5+(i%3)*.25; o+=coracao(x,y,s,i%2?PK:'#ffd21f',.35);}
  return o; }
function coracao(x,y,s,c,op=1){ return '<g transform="translate('+x+' '+y+') scale('+s+')" opacity="'+op+'"><path d="M0,22 C-36,-4 -34,-34 -14,-36 C-4,-37 0,-28 0,-24 C0,-28 4,-37 14,-36 C34,-34 36,-4 0,22 Z" fill="'+c+'" stroke="#0a1633" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-14" cy="-22" rx="6" ry="4" fill="#fff" opacity=".7"/></g>'; }
function canto(n){ return '<g transform="translate(985 92)"><rect x="-64" y="-36" width="128" height="72" rx="36" fill="#ffd21f" stroke="#0a1633" stroke-width="6"/><text y="15" font-family="M" font-weight="900" font-size="40" fill="#0a1633" text-anchor="middle">#'+n+'</text></g>'; }
function marca(){ return '<g transform="translate(130 92)"><rect x="-92" y="-36" width="184" height="72" rx="36" fill="#0a1633" stroke="#ffd21f" stroke-width="5"/><text y="15" font-family="M" font-weight="900" font-size="34" fill="#ffd21f" text-anchor="middle">2 FATOS</text></g>'; }
function pill(x,y,txt,bg,fg,sz=44,w){ w=w||txt.length*sz*.66+70; return '<g transform="translate('+x+' '+y+')"><rect x="'+(-w/2+6)+'" y="-34" width="'+w+'" height="80" rx="40" fill="#000" opacity=".25"/><rect x="'+(-w/2)+'" y="-40" width="'+w+'" height="80" rx="40" fill="'+bg+'" stroke="#0a1633" stroke-width="6"/><text y="'+(sz*.36)+'" font-family="M" font-weight="900" font-size="'+sz+'" fill="'+fg+'" text-anchor="middle">'+txt+'</text></g>'; }
function seta(x,y){ return '<g transform="translate('+x+' '+y+')">'+fTxt(-30,14,'DESLIZA',44,'#fff','end',10)+'<path d="M0,0 h70 m-26,-26 l26,26 l-26,26" fill="none" stroke="#ffd21f" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></g>'; }
// vaca fofinha (cx,cy,s, dir 1/-1, olhos: 'aberto'|'feliz')
function vaca(cx,cy,s,dir=1,olhos='aberto',lenco=null){
  let o='<g transform="translate('+cx+' '+cy+') scale('+(s*dir)+' '+s+')" stroke="#0a1633" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">';
  // corpo
  o+='<ellipse cx="-10" cy="230" rx="185" ry="140" fill="#fffaf2"/><path d="M-120,170 q40,-30 70,10 q-10,50 -60,40 q-30,-20 -10,-50 Z" fill="#3a3550"/><path d="M60,260 q40,-20 60,20 q-20,40 -60,20 Z" fill="#3a3550"/>';
  o+='<rect x="-130" y="320" width="60" height="70" rx="26" fill="#fffaf2"/><rect x="40" y="320" width="60" height="70" rx="26" fill="#fffaf2"/><rect x="-130" y="360" width="60" height="30" rx="12" fill="#6b5a4e"/><rect x="40" y="360" width="60" height="30" rx="12" fill="#6b5a4e"/>';
  o+='<ellipse cx="0" cy="300" rx="60" ry="30" fill="'+PK+'"/>';
  // orelhas e chifres
  o+='<path d="M-150,-40 q-90,-10 -100,40 q60,20 110,-10 Z" fill="#fffaf2"/><path d="M-160,-30 q-60,0 -70,30 q40,10 75,-10 Z" fill="'+PK+'" stroke="none"/>';
  o+='<path d="M150,-40 q90,-10 100,40 q-60,20 -110,-10 Z" fill="#fffaf2"/><path d="M160,-30 q60,0 70,30 q-40,10 -75,-10 Z" fill="'+PK+'" stroke="none"/>';
  o+='<path d="M-80,-120 q-20,-50 10,-70 q10,40 20,60 Z" fill="#ffe39a"/><path d="M80,-120 q20,-50 -10,-70 q-10,40 -20,60 Z" fill="#ffe39a"/>';
  // cabeça
  o+='<rect x="-160" y="-140" width="320" height="270" rx="130" fill="#fffaf2"/>';
  o+='<path d="M60,-136 q70,10 90,70 q-50,30 -90,-10 q-20,-40 0,-60 Z" fill="#3a3550"/><path d="M-30,-140 q-20,-10 -50,0 q20,30 50,0 Z" fill="#3a3550"/>';
  o+='<path d="M-20,-150 q20,-40 40,0" fill="none" stroke-width="6"/><path d="M0,-152 q10,-30 30,-10" fill="none" stroke-width="6"/>';
  // focinho
  o+='<ellipse cx="0" cy="70" rx="130" ry="78" fill="'+PK+'"/><ellipse cx="-45" cy="70" rx="16" ry="22" fill="'+PKD+'"/><ellipse cx="45" cy="70" rx="16" ry="22" fill="'+PKD+'"/>';
  o+='<path d="M-30,118 q30,22 60,0" fill="none" stroke-width="6"/>';
  // olhos
  if(olhos==='feliz') o+='<path d="M-110,-30 q35,-36 70,0" fill="none" stroke-width="11"/><path d="M40,-30 q35,-36 70,0" fill="none" stroke-width="11"/>';
  else o+='<ellipse cx="-75" cy="-30" rx="30" ry="36" fill="#0a1633"/><ellipse cx="75" cy="-30" rx="30" ry="36" fill="#0a1633"/><circle cx="-64" cy="-44" r="11" fill="#fff" stroke="none"/><circle cx="86" cy="-44" r="11" fill="#fff" stroke="none"/><circle cx="-84" cy="-18" r="5" fill="#fff" stroke="none"/><circle cx="66" cy="-18" r="5" fill="#fff" stroke="none"/>';
  o+='<ellipse cx="-120" cy="20" rx="28" ry="16" fill="#ff7aa8" opacity=".6" stroke="none"/><ellipse cx="120" cy="20" rx="28" ry="16" fill="#ff7aa8" opacity=".6" stroke="none"/>';
  // sininho / lenço
  if(lenco) o+='<path d="M-110,130 q110,60 220,0 l-30,60 q-80,30 -160,0 Z" fill="'+lenco+'"/>';
  else o+='<path d="M-60,140 q60,26 120,0" fill="none" stroke="#c9a227" stroke-width="12"/><circle cx="0" cy="175" r="30" fill="#ffd21f"/><circle cx="0" cy="186" r="7" fill="#0a1633" stroke="none"/>';
  return o+'</g>'; }
// lontra fofinha a flutuar de barriga para cima
function lontra(cx,cy,s,dir=1,maoX=0){
  let o='<g transform="translate('+cx+' '+cy+') scale('+(s*dir)+' '+s+')" stroke="#0a1633" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">';
  o+='<path d="M120,40 q120,10 160,60 q-60,30 -170,0 Z" fill="#8a5a3c"/>';
  o+='<ellipse cx="0" cy="40" rx="170" ry="85" fill="#9b6a48"/><ellipse cx="10" cy="30" rx="120" ry="55" fill="#e8c9a0" stroke="none"/>';
  o+='<ellipse cx="150" cy="95" rx="38" ry="20" fill="#7a4e32"/>';
  // cabeça
  o+='<circle cx="-170" cy="-10" r="95" fill="#9b6a48"/><ellipse cx="-185" cy="15" rx="70" ry="58" fill="#f3dcb8" stroke="none"/>';
  o+='<circle cx="-235" cy="-85" r="22" fill="#9b6a48"/><circle cx="-110" cy="-90" r="22" fill="#9b6a48"/>';
  o+='<path d="M-225,-20 q18,-16 36,0" fill="none" stroke-width="8"/><path d="M-160,-24 q18,-16 36,0" fill="none" stroke-width="8"/>';
  o+='<ellipse cx="-178" cy="12" rx="20" ry="14" fill="#3a2418"/><path d="M-178,26 v10 m0,0 q-14,12 -26,2 m26,-2 q14,12 26,2" fill="none" stroke-width="5"/>';
  o+='<path d="M-230,20 l-50,-8 M-230,32 l-50,6 M-128,20 l46,-10 M-128,32 l46,4" stroke-width="3"/>';
  o+='<ellipse cx="-235" cy="22" rx="18" ry="10" fill="#ff8fb4" opacity=".7" stroke="none"/><ellipse cx="-120" cy="18" rx="18" ry="10" fill="#ff8fb4" opacity=".7" stroke="none"/>';
  if(maoX===-999){ o+='<path d="M-40,50 Q-150,120 -268,98" fill="none" stroke="#7a4e32" stroke-width="30"/><path d="M-40,50 Q-150,120 -268,98" fill="none" stroke="#9b6a48" stroke-width="16"/>'; return o+'</g>'; }
  o+='<path d="M-70,-10 q'+(20+maoX)+',-60 '+(50+maoX)+',-70" fill="none" stroke="#7a4e32" stroke-width="30"/><path d="M-70,-10 q'+(20+maoX)+',-60 '+(50+maoX)+',-70" fill="none" stroke="#9b6a48" stroke-width="16"/>';
  return o+'</g>'; }
function agua(y,t){ let o='<path d="M0,'+y+' Q135,'+(y-30)+' 270,'+y+' T540,'+y+' T810,'+y+' T1080,'+y+' V1350 H0 Z" fill="#3fa4ff" opacity=".85"/><path d="M0,'+(y+40)+' Q135,'+(y+10)+' 270,'+(y+40)+' T540,'+(y+40)+' T810,'+(y+40)+' T1080,'+(y+40)+' V1350 H0 Z" fill="#2a7fd4"/>';
  for(let i=0;i<9;i++) o+='<path d="M'+(60+i*120)+','+(y+100+(i%3)*60)+' q20,-12 40,0" fill="none" stroke="#bfe9ff" stroke-width="6" stroke-linecap="round" opacity=".7"/>';
  return o; }
`;
const S=[];
// 1 · CAPA
S.push(`(()=>{let o=fundo(0)+marca()+canto('01');
 o+=fTxt(540,300,'2 FATOS',92,'#fff')+fTxt(540,430,'FOFINHOS',150,'#ff9ec4','middle',18);
 o+=pill(540,540,'QUE VÃO TE DERRETER','#ffd21f','#0a1633',44);
 o+='<circle cx="540" cy="920" r="300" fill="#ff9ec4" opacity=".12"/>';
 o+=vaca(390,860,.85,1,'feliz','#ff9ec4')+lontra(800,1010,.8,-1,30);
 o+=coracao(560,700,1.6,'#ff9ec4')+coracao(470,640,.9,'#ffd21f')+coracao(650,610,.7,'#ff9ec4');
 o+=seta(890,1250);
 return o;})()`);
// 2 · FATO 1 — vacas
S.push(`(()=>{let o=fundo(1)+marca()+canto('01');
 o+=pill(540,210,'FATO 1','#ffd21f','#0a1633',44,240);
 o+=fTxt(540,350,'VACAS TÊM',96,'#fff')+fTxt(540,465,'MELHOR AMIGA',104,'#ff9ec4','middle',16);
 o+='<circle cx="540" cy="860" r="320" fill="#ff9ec4" opacity=".12"/>';
 o+=vaca(370,820,.78,1,'feliz','#ffd21f')+vaca(710,820,.78,-1,'feliz','#7fd3ff');
 o+=coracao(540,600,1.4,'#ff9ec4')+coracao(455,545,.7,'#ffd21f')+coracao(625,530,.6,'#ff9ec4');
 o+='<rect x="90" y="1130" width="900" height="150" rx="36" fill="#fffaf0" stroke="#0a1633" stroke-width="7"/>';
 o+='<text x="540" y="1195" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">Juntas, elas ficam bem</text><text x="540" y="1250" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">menos <tspan fill="#e8649a">estressadas</tspan> 🥹</text>';
 return o;})()`);
// 3 · FATO 2 — lontras
S.push(`(()=>{let o=fundo(2)+marca()+canto('01');
 o+=pill(540,210,'FATO 2','#ffd21f','#0a1633',44,240);
 o+=fTxt(540,350,'LONTRAS DORMEM',90,'#fff')+fTxt(540,465,'DE MÃOS DADAS',104,'#ff9ec4','middle',16);
 o+='<g opacity=".9">'+[0,1,2,3,4].map(i=>'<circle cx="'+(200+i*170)+'" cy="'+(620+(i%2)*40)+'" r="'+(4+i%3)+'" fill="#fff"/>').join('')+'</g>';
 o+=agua(900,0);
 o+=lontra(320,880,.78,-1,-999)+lontra(760,880,.78,1,-999);
 o+='<ellipse cx="540" cy="956" rx="40" ry="26" fill="#9b6a48" stroke="#0a1633" stroke-width="6"/><path d="M522,946 v18 M540,943 v22 M558,946 v18" stroke="#7a4e32" stroke-width="5" stroke-linecap="round"/>';
 o+=coracao(540,770,1.1,'#ff9ec4');
 o+='<text x="210" y="640" font-family="M" font-weight="900" font-size="54" fill="#bfe9ff" opacity=".8">z</text><text x="250" y="590" font-family="M" font-weight="900" font-size="40" fill="#bfe9ff" opacity=".6">z</text><text x="880" y="640" font-family="M" font-weight="900" font-size="54" fill="#bfe9ff" opacity=".8">z</text>';
 o+='<rect x="90" y="1130" width="900" height="150" rx="36" fill="#fffaf0" stroke="#0a1633" stroke-width="7"/>';
 o+='<text x="540" y="1195" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">Pra corrente não separar</text><text x="540" y="1250" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">uma da <tspan fill="#e8649a">outra</tspan> 🥹</text>';
 return o;})()`);
// 4 · FINAL — manda pra sua melhor amiga
S.push(`(()=>{let o=fundo(3)+marca()+canto('01');
 o+=fTxt(540,280,'MANDA PRA SUA',96,'#fff')+fTxt(540,410,'MELHOR AMIGA',120,'#ff9ec4','middle',18);
 o+='<circle cx="540" cy="820" r="300" fill="#ff9ec4" opacity=".14"/>';
 o+=vaca(400,800,.72,1,'feliz','#ff9ec4')+vaca(680,800,.72,-1,'feliz','#ffd21f');
 o+=coracao(540,560,1.5,'#ff9ec4')+coracao(430,520,.8,'#ffd21f')+coracao(650,505,.8,'#ff9ec4')+coracao(540,470,.5,'#ffd21f');
 o+='<g transform="translate(540 1135)"><rect x="-300" y="-50" width="600" height="100" rx="50" fill="#ffd21f" stroke="#0a1633" stroke-width="7"/><path d="M-230,-14 L-180,0 L-230,14 Z M-180,0 L-235,-30 L-215,0 L-235,30 Z" fill="#0a1633"/><text x="30" y="16" font-family="M" font-weight="900" font-size="46" fill="#0a1633" text-anchor="middle">ENVIA AGORA</text></g>';
 o+=pill(540,1265,'SEGUE: TODO DIA MAIS 2 FATOS','#0a1633','#fff',32,640);
 return o;})()`);
(async()=>{const b=await chromium.launch();
for(let i=0;i<S.length;i++){const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1350 viewBox="0 0 1080 1350"></svg><script>window.window=window;${art};${lib}; document.getElementById('s').innerHTML=${S[i]};</script>`);
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({path:`${process.argv[2]}/car01/slide${i+1}.png`}); await p.close();}
await b.close();})();
