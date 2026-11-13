// Carrossel #02 — 2 fatos do espaço (Vênus: dia > ano · Saturno boiaria na banheira) — 3:4 1080x1440
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const lib=String.raw`
const OL='#1c1838', PK='#ff9ec4', YL='#ffd21f', CY='#7fe3ff';
function R(n){ return Math.round(n*10)/10; }
function marca(){ return '<g transform="translate(130 92)"><rect x="-92" y="-36" width="184" height="72" rx="36" fill="#0a1633" stroke="'+YL+'" stroke-width="5"/><text y="15" font-family="M" font-weight="900" font-size="34" fill="'+YL+'" text-anchor="middle">2 FATOS</text></g>'; }
function canto(n){ return '<g transform="translate(985 92)"><rect x="-64" y="-36" width="128" height="72" rx="36" fill="'+YL+'" stroke="#0a1633" stroke-width="6"/><text y="15" font-family="M" font-weight="900" font-size="40" fill="#0a1633" text-anchor="middle">#'+n+'</text></g>'; }
function pill(x,y,txt,bg,fg,sz,w){ w=w||txt.length*sz*.66+70; return '<g transform="translate('+x+' '+y+')"><rect x="'+(-w/2+6)+'" y="-32" width="'+w+'" height="80" rx="40" fill="#000" opacity=".3"/><rect x="'+(-w/2)+'" y="-40" width="'+w+'" height="80" rx="40" fill="'+bg+'" stroke="#0a1633" stroke-width="6"/><text y="'+R(sz*.36)+'" font-family="M" font-weight="900" font-size="'+sz+'" fill="'+fg+'" text-anchor="middle">'+txt+'</text></g>'; }
function progresso(i,n=4){ const x0=90,x1=990,y=1308,w=x1-x0, f=w*i/n; let o='';
 o+='<rect x="'+(x0-14)+'" y="1236" width="'+(w+28)+'" height="104" rx="34" fill="#0a1633" opacity=".72"/>';
 o+='<text x="'+x0+'" y="1284" font-family="M" font-weight="900" font-size="34" fill="#fff" opacity=".85">'+i+'/'+n+'</text>';
 if(i<n){ o+='<text x="'+(x1-74)+'" y="1286" font-family="M" font-weight="900" font-size="46" fill="'+YL+'" text-anchor="end">DESLIZA</text><path d="M'+(x1-60)+',1270 h48 m-20,-20 l20,20 l-20,20" fill="none" stroke="'+YL+'" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'; }
 else { o+='<text x="'+x1+'" y="1286" font-family="M" font-weight="900" font-size="40" fill="'+YL+'" text-anchor="end">SEGUE: TODO DIA MAIS 2</text>'; }
 o+='<rect x="'+x0+'" y="'+y+'" width="'+w+'" height="18" rx="9" fill="#ffffff" opacity=".2"/>';
 o+='<rect x="'+x0+'" y="'+y+'" width="'+f+'" height="18" rx="9" fill="'+YL+'"/>';
 for(let k=1;k<n;k++){ const cx=x0+w*k/n; o+='<circle cx="'+cx+'" cy="'+(y+9)+'" r="6" fill="'+(k<=i?'#0a1633':'#ffffff')+'" opacity="'+(k<=i?.6:.45)+'"/>'; }
 o+=coracao(x0+f,y+8,.62,PK);
 return o; }
function caixa(l1,l2){ return '<rect x="96" y="1076" width="900" height="140" rx="36" fill="#000" opacity=".3"/><rect x="90" y="1068" width="900" height="140" rx="36" fill="#fffaf0" stroke="#0a1633" stroke-width="7"/><text x="540" y="1128" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">'+l1+'</text><text x="540" y="1183" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">'+l2+'</text>'+coracao(940,1080,.7,PK); }
function estrela(x,y,s,c){ let d=''; for(let k=0;k<10;k++){const r=k%2?13:32, a=(k*36-90)*Math.PI/180; d+=(k?'L':'M')+R(Math.cos(a)*r)+','+R(Math.sin(a)*r);} return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="'+d+'Z" fill="'+c+'" stroke="'+OL+'" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-6" cy="-10" rx="5" ry="3" fill="#fff" opacity=".8"/></g>'; }
function coracao(x,y,s,c){ return estrela(x,y,s*1.1,YL); }
function defs(){ return '<defs>'+
 '<linearGradient id="space" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05061c"/><stop offset=".5" stop-color="#11113a"/><stop offset="1" stop-color="#241a55"/></linearGradient>'+
 '<filter id="b4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>'+
 '<filter id="b40" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="40"/></filter>'+
 '<radialGradient id="ven" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".45" stop-color="#ffa63d"/><stop offset="1" stop-color="#c8501a"/></radialGradient>'+
 '<radialGradient id="sat" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff3d2"/><stop offset=".5" stop-color="#ecc88a"/><stop offset="1" stop-color="#a8773e"/></radialGradient>'+
 '<radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe0"/><stop offset=".55" stop-color="#ffd84a"/><stop offset="1" stop-color="#ff9a1f"/></radialGradient>'+
 '<radialGradient id="sunG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf4a" stop-opacity=".7"/><stop offset="1" stop-color="#ff8a1f" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="earth" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#8fd8ff"/><stop offset=".6" stop-color="#2f8de0"/><stop offset="1" stop-color="#1a4f9c"/></radialGradient>'+
 '<linearGradient id="tub" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e8ecf8"/><stop offset="1" stop-color="#b9c2de"/></linearGradient>'+
 '<linearGradient id="agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fe6ff" stop-opacity=".9"/><stop offset="1" stop-color="#2e9ad6" stop-opacity=".95"/></linearGradient>'+
 '<radialGradient id="bolha" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#e9f8ff" stop-opacity=".7"/><stop offset="1" stop-color="#bfe9ff" stop-opacity=".35"/></radialGradient>'+
 '<linearGradient id="clk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe4f5"/></linearGradient>'+
 '</defs>'; }
function ceu(seed){ let o='<rect y="-60" width="1080" height="1520" fill="url(#space)"/>';
 o+='<ellipse cx="'+(200+seed*170%600)+'" cy="520" rx="380" ry="200" fill="#6a3aa8" opacity=".35" filter="url(#b40)"/><ellipse cx="'+(820-seed*130%500)+'" cy="980" rx="360" ry="220" fill="#1f7ab0" opacity=".3" filter="url(#b40)"/><ellipse cx="540" cy="200" rx="420" ry="140" fill="#b04a8a" opacity=".22" filter="url(#b40)"/>';
 for(let i=0;i<140;i++){ const x=(i*373+seed*131)%1080, y=((i*211+seed*59)%1500)-50, r=((i*7)%5)*.5+.8; o+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="#fff" opacity="'+(.35+((i*13)%6)/10)+'"/>'; }
 for(let i=0;i<9;i++){ const x=(i*241+seed*77)%1000+40, y=(i*167+seed*41)%1200+40; o+='<path transform="translate('+x+' '+y+') scale('+(.5+(i%3)*.25)+')" d="M0,-18 Q3,-3 18,0 Q3,3 0,18 Q-3,3 -18,0 Q-3,-3 0,-18 Z" fill="#fffbe0"/>'; }
 return o; }
function cara(r,mood){ // carinha fofa no planeta
 let o='<ellipse cx="'+R(-r*.32)+'" cy="'+R(-r*.02)+'" rx="'+R(r*.09)+'" ry="'+R(r*.12)+'" fill="'+OL+'"/><ellipse cx="'+R(r*.32)+'" cy="'+R(-r*.02)+'" rx="'+R(r*.09)+'" ry="'+R(r*.12)+'" fill="'+OL+'"/><circle cx="'+R(-r*.29)+'" cy="'+R(-r*.07)+'" r="'+R(r*.035)+'" fill="#fff"/><circle cx="'+R(r*.35)+'" cy="'+R(-r*.07)+'" r="'+R(r*.035)+'" fill="#fff"/>';
 o+='<ellipse cx="'+R(-r*.52)+'" cy="'+R(r*.18)+'" rx="'+R(r*.13)+'" ry="'+R(r*.07)+'" fill="#ff8fb0" opacity=".75"/><ellipse cx="'+R(r*.52)+'" cy="'+R(r*.18)+'" rx="'+R(r*.13)+'" ry="'+R(r*.07)+'" fill="#ff8fb0" opacity=".75"/>';
 if(mood==='o') o+='<ellipse cx="0" cy="'+R(r*.26)+'" rx="'+R(r*.09)+'" ry="'+R(r*.12)+'" fill="#7a2a3a" stroke="'+OL+'" stroke-width="5"/>';
 else if(mood==='zz') o+='<path d="M'+R(-r*.14)+','+R(r*.22)+' q'+R(r*.14)+','+R(r*.12)+' '+R(r*.28)+',0" fill="none" stroke="'+OL+'" stroke-width="6" stroke-linecap="round"/>';
 else o+='<path d="M'+R(-r*.16)+','+R(r*.2)+' q'+R(r*.16)+','+R(r*.2)+' '+R(r*.32)+',0" fill="#7a2a3a" stroke="'+OL+'" stroke-width="6" stroke-linejoin="round"/>';
 return o; }
function venus(x,y,r,mood){ let o='<g transform="translate('+x+' '+y+')"><circle r="'+R(r*1.5)+'" fill="#ff9a3a" opacity=".28" filter="url(#b40)"/><circle r="'+r+'" fill="url(#ven)" stroke="'+OL+'" stroke-width="7"/>';
 o+='<clipPath id="vc'+x+'"><circle r="'+r+'"/></clipPath><g clip-path="url(#vc'+x+')" fill="none" stroke-linecap="round">';
 o+='<path d="M'+(-r)+','+R(-r*.55)+' Q'+R(-r*.3)+','+R(-r*.75)+' 0,'+R(-r*.5)+' T'+r+','+R(-r*.55)+'" stroke="#fff1c9" stroke-width="'+R(r*.09)+'" opacity=".7"/>';
 o+='<path d="M'+(-r)+','+R(r*.5)+' Q'+R(-r*.4)+','+R(r*.3)+' 0,'+R(r*.55)+' T'+r+','+R(r*.45)+'" stroke="#d2601e" stroke-width="'+R(r*.1)+'" opacity=".7"/>';
 o+='<path d="M'+R(-r*.9)+','+R(r*.75)+' Q0,'+R(r*.6)+' '+R(r*.9)+','+R(r*.8)+'" stroke="#b8481a" stroke-width="'+R(r*.07)+'" opacity=".6"/><path d="M'+R(-r*.8)+','+R(-r*.8)+' Q0,'+R(-r*.95)+' '+R(r*.8)+','+R(-r*.82)+'" stroke="#fff6d8" stroke-width="'+R(r*.06)+'" opacity=".6"/></g>';
 o+='<ellipse cx="'+R(-r*.4)+'" cy="'+R(-r*.48)+'" rx="'+R(r*.22)+'" ry="'+R(r*.12)+'" fill="#fff" opacity=".55" transform="rotate(-30 '+R(-r*.4)+' '+R(-r*.48)+')"/>';
 return o+cara(r,mood)+'</g>'; }
function anel(r,front){ // metade de trás ou da frente do anel
 const rx=r*1.9, ry=r*.42; const d=front?'M'+R(-rx)+',0 A'+R(rx)+','+R(ry)+' 0 0 0 '+R(rx)+',0':'M'+R(-rx)+',0 A'+R(rx)+','+R(ry)+' 0 0 1 '+R(rx)+',0';
 return '<path d="'+d+'" fill="none" stroke="'+OL+'" stroke-width="'+R(r*.34)+'"/><path d="'+d+'" fill="none" stroke="#e9cf9a" stroke-width="'+R(r*.26)+'"/><path d="'+d+'" fill="none" stroke="#b98a52" stroke-width="'+R(r*.05)+'"/><path d="'+d.replace(R(rx)+','+R(ry),R(rx*.92)+','+R(ry*.86)).replace('M'+R(-rx),'M'+R(-rx*.92)).replace(' '+R(rx)+',0',' '+R(rx*.92)+',0')+'" fill="none" stroke="#fff4d6" stroke-width="'+R(r*.04)+'" opacity=".8"/>'; }
function saturno(x,y,r,rot,mood,agua){ let o='<g transform="translate('+x+' '+y+') rotate('+rot+')"><circle r="'+R(r*1.4)+'" fill="#ffd98a" opacity=".18" filter="url(#b40)"/>'+anel(r,false);
 o+='<circle r="'+r+'" fill="url(#sat)" stroke="'+OL+'" stroke-width="7"/><clipPath id="sc'+x+'"><circle r="'+r+'"/></clipPath><g clip-path="url(#sc'+x+')">';
 const B=[[-.62,'#d8a865',.13],[-.32,'#f6dfae',.08],[.36,'#d29a55',.11],[.62,'#c48a48',.09],[.82,'#f2d7a2',.07]];
 for(const [yy,c,w] of B) o+='<path d="M'+(-r)+','+R(r*yy)+' Q0,'+R(r*(yy+.08))+' '+r+','+R(r*yy)+'" fill="none" stroke="'+c+'" stroke-width="'+R(r*w)+'" opacity=".8"/>';
 o+='</g><ellipse cx="'+R(-r*.4)+'" cy="'+R(-r*.5)+'" rx="'+R(r*.22)+'" ry="'+R(r*.12)+'" fill="#fff" opacity=".55" transform="rotate(-30 '+R(-r*.4)+' '+R(-r*.5)+')"/>'+cara(r,mood);
 o+=anel(r,true)+'</g>'; return o; }
function sol(x,y,r){ let o='<g transform="translate('+x+' '+y+')"><circle r="'+R(r*2.2)+'" fill="url(#sunG)"/>'; for(let k=0;k<12;k++){ o+='<path transform="rotate('+(k*30)+')" d="M0,'+R(-r*1.12)+' L'+R(r*.16)+','+R(-r*1.42)+' L'+R(-r*.16)+','+R(-r*1.42)+' Z" fill="#ffb52e" stroke="'+OL+'" stroke-width="4" transform-origin="0 0"/>'; }
 return o+'<circle r="'+r+'" fill="url(#sun)" stroke="'+OL+'" stroke-width="6"/>'+cara(r,'smile')+'</g>'; }
function terra(x,y,r){ return '<g transform="translate('+x+' '+y+')"><circle r="'+r+'" fill="url(#earth)" stroke="'+OL+'" stroke-width="5"/><path d="M'+R(-r*.6)+','+R(-r*.3)+' q'+R(r*.3)+','+R(-r*.4)+' '+R(r*.6)+',-'+R(r*.1)+' q'+R(r*.1)+','+R(r*.4)+' -'+R(r*.3)+','+R(r*.5)+' Z M'+R(r*.1)+','+R(r*.3)+' q'+R(r*.4)+',-'+R(r*.1)+' '+R(r*.5)+','+R(r*.3)+' q-'+R(r*.3)+','+R(r*.2)+' -'+R(r*.5)+',-'+R(r*.3)+' Z" fill="#5cc078" stroke="'+OL+'" stroke-width="3"/></g>'; }
function orbita(cx,cy,rx,ry,c){ return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" fill="none" stroke="'+c+'" stroke-width="5" stroke-dasharray="4 16" stroke-linecap="round" opacity=".8"/>'; }
function relogio(x,y,s,h,m){ let o='<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-40,-62 L-56,-82 M40,-62 L56,-82" stroke="'+OL+'" stroke-width="10" stroke-linecap="round"/><circle cx="-56" cy="-84" r="16" fill="'+YL+'" stroke="'+OL+'" stroke-width="6"/><circle cx="56" cy="-84" r="16" fill="'+YL+'" stroke="'+OL+'" stroke-width="6"/><circle r="74" fill="url(#clk)" stroke="'+OL+'" stroke-width="8"/>';
 for(let k=0;k<12;k++){ const a=k*30*Math.PI/180; o+='<circle cx="'+R(Math.sin(a)*58)+'" cy="'+R(-Math.cos(a)*58)+'" r="'+(k%3?3:6)+'" fill="'+OL+'"/>'; }
 return o+'<path d="M0,0 L'+R(Math.sin(h)*34)+','+R(-Math.cos(h)*34)+' M0,0 L'+R(Math.sin(m)*50)+','+R(-Math.cos(m)*50)+'" stroke="'+OL+'" stroke-width="8" stroke-linecap="round"/><circle r="7" fill="#e0483a"/></g>'; }
function calendario(x,y,s,txt){ return '<g transform="translate('+x+' '+y+') scale('+s+')"><rect x="-70" y="-64" width="140" height="140" rx="18" fill="#fff" stroke="'+OL+'" stroke-width="8"/><path d="M-70,-30 V-46 A18,18 0 0 1 -52,-64 H52 A18,18 0 0 1 70,-46 V-30 Z" fill="#e0483a" stroke="'+OL+'" stroke-width="8"/><circle cx="-36" cy="-66" r="9" fill="'+OL+'"/><circle cx="36" cy="-66" r="9" fill="'+OL+'"/><text y="42" font-family="M" font-weight="900" font-size="40" fill="'+OL+'" text-anchor="middle">'+txt+'</text></g>'; }
function banheira(x,y,s){ // corpo da banheira (a água vem por cima do planeta)
 return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+OL+'" stroke-width="8" stroke-linejoin="round"><path d="M-300,120 L-270,150 M300,120 L270,150" stroke-width="14" stroke-linecap="round"/><circle cx="-268" cy="160" r="16" fill="#e9b84a"/><circle cx="268" cy="160" r="16" fill="#e9b84a"/><path d="M-340,-20 H340 Q336,130 200,140 H-200 Q-336,130 -340,-20 Z" fill="url(#tub)"/><path d="M-300,40 Q-290,110 -200,118" fill="none" stroke="#fff" stroke-width="10" opacity=".9"/><rect x="-360" y="-40" width="720" height="34" rx="17" fill="#fff"/><path d="M300,-40 V-120 Q300,-160 260,-160 H230" fill="none" stroke-width="16" stroke="'+OL+'"/><path d="M300,-40 V-120 Q300,-160 260,-160 H230" fill="none" stroke-width="8" stroke="#c9d2ea"/><rect x="214" y="-172" width="30" height="34" rx="6" fill="#c9d2ea"/></g>'; }
function aguaFrente(x,y,s){ let o='<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-334,-8 Q-250,-30 -170,-10 T0,-10 T170,-10 T334,-8 L330,30 Q200,60 -330,30 Z" fill="url(#agua)" stroke="'+OL+'" stroke-width="6" opacity=".92"/><path d="M-280,4 q30,-10 60,0 M-60,4 q30,-10 60,0 M160,4 q30,-10 60,0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>';
 return o+'</g>'; }
function espuma(x,y,s,seed){ let o=''; for(let i=0;i<14;i++){ let dx=((i*97+seed*31)%640)-320; if(Math.abs(dx)<170) dx=dx<0?dx-170:dx+170; const dy=-((i*53+seed*7)%60), r=14+(i*11)%24; o+='<circle cx="'+R(x+dx*s)+'" cy="'+R(y+dy*s)+'" r="'+R(r*s)+'" fill="url(#bolha)" stroke="#bfe9ff" stroke-width="3"/>'; } return o; }
function bolhasAr(x0,x1,y0,y1,n,seed){ let o=''; for(let i=0;i<n;i++){ const x=x0+((i*83+seed*29)%(x1-x0)), y=y0+((i*61+seed*13)%(y1-y0)), r=8+(i*7)%18; o+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="url(#bolha)" stroke="#bfe9ff" stroke-width="2.5" opacity=".9"/><circle cx="'+(x-r*.3)+'" cy="'+(y-r*.3)+'" r="'+(r*.22)+'" fill="#fff"/>'; } return o; }
function patinho(x,y,s,dir=1){ return '<g transform="translate('+x+' '+y+') scale('+(s*dir)+' '+s+')" stroke="'+OL+'" stroke-width="6" stroke-linejoin="round"><path d="M-50,10 Q-60,-20 -30,-22 L10,-20 Q50,-24 54,6 Q50,40 0,40 Q-44,40 -50,10 Z" fill="#ffd21f"/><circle cx="12" cy="-40" r="28" fill="#ffd21f"/><path d="M36,-42 L62,-36 L36,-28 Z" fill="#ff8a1f"/><circle cx="18" cy="-46" r="5" fill="'+OL+'" stroke="none"/><path d="M-30,0 q20,14 40,0" fill="none" stroke="#e0a800" stroke-width="5"/></g>'; }
function foguete(x,y,s,rot){ return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+s+')" stroke="'+OL+'" stroke-width="6" stroke-linejoin="round"><path d="M-18,60 Q0,130 18,60 Z" fill="#ff8a1f" stroke="none"/><path d="M-10,60 Q0,100 10,60 Z" fill="#ffe14a" stroke="none"/><path d="M-30,30 L-56,70 L-24,60 Z M30,30 L56,70 L24,60 Z" fill="#e0483a"/><path d="M0,-90 Q40,-50 32,60 H-32 Q-40,-50 0,-90 Z" fill="#f4f6ff"/><path d="M0,-90 Q22,-68 28,-40 H-28 Q-22,-68 0,-90 Z" fill="#e0483a"/><circle cy="0" r="17" fill="#7fe3ff"/><circle cx="-5" cy="-5" r="5" fill="#fff" stroke="none"/></g>'; }
`;
const S=[];
// #01 capa
S.push(`(()=>{let o=defs()+ceu(0);
 o+=sol(930,610,52)+venus(225,720,130,'o')+relogio(395,640,.55,2.2,5.6);
 o+=bolhasAr(480,1040,600,760,6,1);
 o+=banheira(660,1040,.82)+saturno(660,940,135,-12,'smile')+aguaFrente(660,1018,.82)+espuma(660,1013,.82,1)+patinho(920,990,.55,-1);
 o+=marca()+canto('01');
 o+=fTxt(540,280,'2 FATOS DO',92,'#fff')+fTxt(540,410,'ESPAÇO',160,CY,'middle',18);
 o+=pill(540,515,'QUE PARECEM MENTIRA',YL,'#0a1633',44);
 o+=progresso(1);
 return o;})()`);
// #02 Vênus: o dia é maior que o ano
S.push(`(()=>{let o=defs()+ceu(1);
 o+=orbita(540,810,450,150,'#ffd98a')+sol(540,810,72);
 o+=venus(300,860,150,'o');
 o+=relogio(820,700,.85,1.0,4.8)+calendario(840,920,.85,'ANO');
 o+='<g font-family="M" font-weight="900" text-anchor="middle"><text x="820" y="604" font-size="34" fill="#fff">1 DIA</text></g>';
 o+=marca()+canto('02')+pill(540,210,'FATO 1',YL,'#0a1633',44,240);
 o+=fTxt(540,345,'EM VÊNUS, 1 DIA',84,'#fff')+fTxt(540,460,'DURA MAIS QUE 1 ANO',80,'#ffd98a','middle',16);
 o+=caixa('Dia: <tspan fill="#e0483a">243</tspan> dias da Terra','Ano: só <tspan fill="#2e86d0">225</tspan> dias da Terra')+progresso(2);
 return o;})()`);
// #03 Saturno boiaria
S.push(`(()=>{let o=defs()+ceu(2);
 o+=terra(140,640,40)+foguete(930,600,.6,30);
 o+=banheira(540,900,1.0)+saturno(540,770,170,-10,'smile')+aguaFrente(540,880,1.0)+espuma(540,875,1.0,3)+patinho(840,850,.65,-1)+patinho(245,858,.52,1);
 o+=bolhasAr(80,1000,540,620,6,3);
 o+=marca()+canto('03')+pill(540,210,'FATO 2',YL,'#0a1633',44,240);
 o+=fTxt(540,345,'SATURNO BOIARIA',86,'#fff')+fTxt(540,460,'NUMA BANHEIRA',104,CY,'middle',16);
 o+=caixa('Ele é <tspan fill="#2e86d0">menos denso</tspan>','que a <tspan fill="#2e86d0">água</tspan> (só falta a banheira)')+progresso(3);
 return o;})()`);
// #04 CTA
S.push(`(()=>{let o=defs()+ceu(3);
 o+=orbita(540,860,470,160,'#ffd98a')+sol(540,860,64);
 o+=venus(220,830,105,'smile')+saturno(860,860,95,-14,'o');
 o+=foguete(540,640,.7,0)+estrela(200,620,1.1,YL)+estrela(880,610,.8,YL)+estrela(640,1000,.6,YL);
 o+=marca()+canto('04');
 o+=fTxt(540,280,'MANDA PRA QUEM',96,'#fff')+fTxt(540,410,'AMA O ESPAÇO',120,CY,'middle',18);
 o+='<g transform="translate(540 1158)"><rect x="-294" y="-42" width="600" height="100" rx="50" fill="#000" opacity=".35"/><rect x="-300" y="-50" width="600" height="100" rx="50" fill="'+YL+'" stroke="#0a1633" stroke-width="7"/><path d="M-230,-14 L-180,0 L-230,14 Z M-180,0 L-235,-30 L-215,0 L-235,30 Z" fill="#0a1633"/><text x="30" y="16" font-family="M" font-weight="900" font-size="46" fill="#0a1633" text-anchor="middle">ENVIA AGORA</text></g>';
 o+=progresso(4);
 return o;})()`);
(async()=>{const b=await chromium.launch(); const out=process.argv[2]||'.';
for(let i=0;i<S.length;i++){const p=await b.newPage({viewport:{width:1080,height:1440}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1440 viewBox="0 0 1080 1440"></svg><script>window.window=window;${art};${lib}; try{document.getElementById('s').innerHTML='<g transform="translate(0 45)">'+${S[i]}+'</g>';}catch(e){document.title='ERR '+e.message}</script>`);
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
const t=await p.title(); if(t.startsWith('ERR')) console.log('slide',i+1,t);
await p.screenshot({path:`${out}/slide${i+1}.png`}); await p.close();}
await b.close();})();
