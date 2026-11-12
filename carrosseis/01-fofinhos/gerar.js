const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const lib=String.raw`
const OL='#2a2440', PK='#ff9ec4', YL='#ffd21f';
function R(n){ return Math.round(n*10)/10; }
function defs(){ return '<defs>'+
 '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123f"/><stop offset=".45" stop-color="#28216a"/><stop offset=".75" stop-color="#4a3289"/><stop offset="1" stop-color="#7a4a9e"/></linearGradient>'+
 '<filter id="b4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>'+
 '<filter id="b10" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>'+
 '<filter id="b25" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>'+
 '<radialGradient id="moon" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#fffdf0"/><stop offset=".7" stop-color="#fff0b8"/><stop offset="1" stop-color="#f3d98a"/></radialGradient>'+
 '<linearGradient id="hFar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c4f78"/><stop offset="1" stop-color="#1d3358"/></linearGradient>'+
 '<linearGradient id="hMid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f7d6a"/><stop offset="1" stop-color="#1f5a4c"/></linearGradient>'+
 '<linearGradient id="hNear" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6bd18a"/><stop offset=".5" stop-color="#43a865"/><stop offset="1" stop-color="#2d7f4b"/></linearGradient>'+
 '<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb4f0"/><stop offset=".5" stop-color="#2e86d0"/><stop offset="1" stop-color="#1c5aa0"/></linearGradient>'+
 '<linearGradient id="waterT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cc0ff" stop-opacity=".85"/><stop offset="1" stop-color="#1c5aa0" stop-opacity=".95"/></linearGradient>'+
 '<radialGradient id="tree" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#5fc27e"/><stop offset="1" stop-color="#2a7a4e"/></radialGradient>'+
 '<radialGradient id="cowW" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f7f2f6"/><stop offset="1" stop-color="#d9cde4"/></radialGradient>'+
 '<radialGradient id="cowS" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#5d5580"/><stop offset="1" stop-color="#2a2440"/></radialGradient>'+
 '<radialGradient id="cowP" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#ffd3e4"/><stop offset=".6" stop-color="#ffa6c8"/><stop offset="1" stop-color="#ee7fae"/></radialGradient>'+
 '<linearGradient id="horn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6d6"/><stop offset="1" stop-color="#e9c77e"/></linearGradient>'+
 '<linearGradient id="hoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a5a"/><stop offset="1" stop-color="#4a3328"/></linearGradient>'+
 '<radialGradient id="eye" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4a4070"/><stop offset="1" stop-color="#0d0b20"/></radialGradient>'+
 '<radialGradient id="ofur" cx=".4" cy=".3" r=".85"><stop offset="0" stop-color="#c48a5e"/><stop offset=".6" stop-color="#9c6640"/><stop offset="1" stop-color="#6e4428"/></radialGradient>'+
 '<radialGradient id="obel" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff4e2"/><stop offset="1" stop-color="#e6c79c"/></radialGradient>'+
 '<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a46a"/><stop offset="1" stop-color="#a8733f"/></linearGradient>'+
 '<radialGradient id="ff" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7a0"/><stop offset=".4" stop-color="#ffe14a" stop-opacity=".8"/><stop offset="1" stop-color="#ffe14a" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="pglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9ec4" stop-opacity=".45"/><stop offset="1" stop-color="#ff9ec4" stop-opacity="0"/></radialGradient>'+
 '</defs>'; }
function ceu(seed){ let o='<rect width="1080" height="1350" fill="url(#sky)"/>';
 for(let k=0;k<18;k++){const a=k*0.349+seed*.1; o+='<path d="M540,700 L'+R(540+Math.cos(a)*1700)+','+R(700+Math.sin(a)*1700)+' L'+R(540+Math.cos(a+0.17)*1700)+','+R(700+Math.sin(a+0.17)*1700)+' Z" fill="#fff" opacity=".028"/>';}
 for(let i=0;i<60;i++){const x=(i*173+seed*61)%1080, y=(i*97+seed*37)%820; o+='<circle cx="'+x+'" cy="'+y+'" r="'+(1+i%3*.8)+'" fill="#fff" opacity="'+(.25+(i%5)*.12)+'"/>';}
 for(let i=0;i<7;i++){const x=(i*157+seed*83+90)%1000+40, y=(i*113+seed*29)%600+120; o+=brilho(x,y,.35+(i%3)*.15,i%2?'#fff':'#ffe9a0');}
 o+='<g filter="url(#b25)" opacity=".35"><ellipse cx="'+(200+seed*40)+'" cy="560" rx="170" ry="38" fill="#8a7ad0"/><ellipse cx="'+(820-seed*30)+'" cy="480" rx="140" ry="30" fill="#8a7ad0"/></g>';
 return o; }
function brilho(x,y,s,c){ return '<path transform="translate('+x+' '+y+') scale('+s+')" d="M0,-24 Q4,-4 24,0 Q4,4 0,24 Q-4,4 -24,0 Q-4,-4 0,-24 Z" fill="'+c+'"/>'; }
function lua(x,y,r){ return '<circle cx="'+x+'" cy="'+y+'" r="'+(r*2.4)+'" fill="#fff4c0" opacity=".18" filter="url(#b25)"/><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="url(#moon)" stroke="'+OL+'" stroke-width="6"/><circle cx="'+R(x+r*.35)+'" cy="'+R(y-r*.3)+'" r="'+R(r*.16)+'" fill="#f0d68a" opacity=".8"/><circle cx="'+R(x-r*.4)+'" cy="'+R(y+r*.42)+'" r="'+R(r*.1)+'" fill="#f0d68a" opacity=".8"/><path d="M'+R(x-r*.42)+','+R(y-r*.05)+' q'+R(r*.14)+','+R(-r*.14)+' '+R(r*.28)+',0 M'+R(x+r*.08)+','+R(y-r*.05)+' q'+R(r*.14)+','+R(-r*.14)+' '+R(r*.28)+',0" fill="none" stroke="'+OL+'" stroke-width="5" stroke-linecap="round"/><path d="M'+R(x-r*.15)+','+R(y+r*.2)+' q'+R(r*.15)+','+R(r*.14)+' '+R(r*.3)+',0" fill="none" stroke="'+OL+'" stroke-width="5" stroke-linecap="round"/><ellipse cx="'+R(x-r*.55)+'" cy="'+R(y+r*.15)+'" rx="'+R(r*.14)+'" ry="'+R(r*.08)+'" fill="#ffb3cf" opacity=".8"/><ellipse cx="'+R(x+r*.55)+'" cy="'+R(y+r*.15)+'" rx="'+R(r*.14)+'" ry="'+R(r*.08)+'" fill="#ffb3cf" opacity=".8"/>'; }
function arvore(x,y,s){ return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+OL+'" stroke-width="5"><path d="M-8,0 L-6,-60 L6,-60 L8,0 Z" fill="#7a4e32"/><circle cx="-26" cy="-80" r="34" fill="url(#tree)"/><circle cx="26" cy="-82" r="32" fill="url(#tree)"/><circle cx="0" cy="-110" r="38" fill="url(#tree)"/><path d="M-30,-120 q10,-14 24,-12" fill="none" stroke="#9be0a8" stroke-width="6" opacity=".8"/></g>'; }
function vagalumes(seed,n=12,y0=760,y1=1200){ let o=''; for(let i=0;i<n;i++){const x=(i*211+seed*97)%1040+20, y=y0+((i*137+seed*53)%(y1-y0)); o+='<circle cx="'+x+'" cy="'+y+'" r="22" fill="url(#ff)"/><circle cx="'+x+'" cy="'+y+'" r="4" fill="#fffbd0"/>';} return o; }
function montes(){ let o='<path d="M-20,880 Q140,770 300,840 Q460,760 640,830 Q820,750 1100,840 V1360 H-20 Z" fill="url(#hFar)" stroke="'+OL+'" stroke-width="6"/>';
 o+='<path d="M-20,930 Q200,840 420,910 Q640,850 860,905 Q980,880 1100,900 V1360 H-20 Z" fill="url(#hMid)" stroke="'+OL+'" stroke-width="6"/>';
 o+=arvore(120,905,.75)+arvore(205,890,.55)+arvore(890,905,.7)+arvore(970,895,.5)+arvore(560,880,.45);
 return o; }
function relva(path){ return '<path d="'+path+'" fill="url(#hNear)" stroke="'+OL+'" stroke-width="7"/>'; }
function folhas(x0,x1,y0,y1,n,seed){ let o=''; const C=['#2d7f4b','#3c9a5c','#5cc078']; for(let i=0;i<n;i++){const x=x0+((i*97+seed*31)%(x1-x0)), y=y0+((i*53+seed*17)%(y1-y0)); const h=14+(i%4)*5; o+='<path d="M'+x+','+y+' q'+(-3+(i%3)*3)+','+(-h)+' '+(2+(i%2)*3)+','+(-h-6)+' M'+(x+6)+','+y+' q'+(4)+','+(-h*.8)+' '+(10)+','+(-h)+'" fill="none" stroke="'+C[i%3]+'" stroke-width="4" stroke-linecap="round"/>';} return o; }
function flor(x,y,s,c){ let o='<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0,10 q-4,24 2,40" stroke="#2d7f4b" stroke-width="5" fill="none"/><path d="M0,30 q-18,-6 -22,6 q12,8 22,-6 Z" fill="#4fb06e" stroke="'+OL+'" stroke-width="3"/>'; for(let k=0;k<6;k++){const a=k*60*Math.PI/180; o+='<ellipse cx="'+R(Math.cos(a)*13)+'" cy="'+R(Math.sin(a)*13)+'" rx="10" ry="7" transform="rotate('+(k*60)+' '+R(Math.cos(a)*13)+' '+R(Math.sin(a)*13)+')" fill="'+c+'" stroke="'+OL+'" stroke-width="3"/>';} return o+'<circle r="8" fill="'+YL+'" stroke="'+OL+'" stroke-width="3"/><circle cx="-2" cy="-2" r="3" fill="#fff" opacity=".8"/></g>'; }
function pedra(x,y,s){ return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-40,10 Q-38,-26 0,-30 Q40,-28 44,6 Q30,22 -30,22 Z" fill="#8c86a8" stroke="'+OL+'" stroke-width="5"/><path d="M-20,-18 q16,-8 32,-2" fill="none" stroke="#c9c4df" stroke-width="5" stroke-linecap="round"/></g>'; }
function junco(x,y,s){ return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke-linecap="round"><path d="M0,0 Q-6,-80 4,-150 M14,0 Q20,-70 30,-120 M-14,0 Q-24,-60 -30,-100" fill="none" stroke="#2d6b45" stroke-width="7"/><rect x="-4" y="-170" width="16" height="44" rx="8" fill="#8a5a3c" stroke="'+OL+'" stroke-width="4"/><path d="M-20,-10 Q-50,-60 -44,-90 M24,-10 Q60,-50 58,-80" fill="none" stroke="#4fa86a" stroke-width="8"/></g>'; }
function nenufar(x,y,s,florC){ let o='<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0,0 m-50,0 a50,20 0 1,0 100,0 a50,20 0 1,0 -100,0 Z" fill="#3fae6a" stroke="'+OL+'" stroke-width="4"/><path d="M0,0 L40,-8" stroke="#2a7a48" stroke-width="5"/>'; if(florC) o+='<g transform="translate(-10 -14)"><path d="M0,0 Q-22,-10 -14,-30 Q-4,-22 0,-8 Q4,-22 14,-30 Q22,-10 0,0 Z" fill="'+florC+'" stroke="'+OL+'" stroke-width="3"/><path d="M0,-4 Q-6,-26 0,-36 Q6,-26 0,-4 Z" fill="#ffd3e4" stroke="'+OL+'" stroke-width="3"/></g>'; return o+'</g>'; }
function coracao(x,y,s,c,op=1){ return '<g transform="translate('+x+' '+y+') scale('+s+')" opacity="'+op+'"><path d="M0,22 C-36,-4 -34,-34 -14,-36 C-4,-37 0,-28 0,-24 C0,-28 4,-37 14,-36 C34,-34 36,-4 0,22 Z" fill="'+c+'" stroke="'+OL+'" stroke-width="5" stroke-linejoin="round"/><ellipse cx="-14" cy="-22" rx="7" ry="4.5" fill="#fff" opacity=".75"/></g>'; }
// ---------- VACA ----------
function vaca(cx,cy,s,dir=1,o2={}){ const hr=o2.hr||0, lenco=o2.lenco||null, coroa=o2.coroa||false, olho=o2.olho||'feliz';
 let o='<g transform="translate('+cx+' '+cy+') scale('+(s*dir)+' '+s+')" stroke="'+OL+'" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">';
 o+='<ellipse cx="0" cy="345" rx="190" ry="26" fill="#000" opacity=".28" stroke="none" filter="url(#b10)"/>';
 // cauda
 o+='<path d="M140,140 C200,120 230,60 210,20" fill="none" stroke-width="10"/><path d="M140,140 C200,120 230,60 210,20" fill="none" stroke="#f3eef7" stroke-width="4"/><path d="M196,26 C188,-6 222,-16 232,8 C240,26 222,40 210,30 Z" fill="url(#cowS)"/>';
 // pernas traseiras
 o+='<rect x="-150" y="215" width="54" height="110" rx="24" fill="#d9cde4"/><rect x="96" y="215" width="54" height="110" rx="24" fill="#d9cde4"/><path d="M-150,300 h54 v14 q0,14 -14,14 h-26 q-14,0 -14,-14 Z" fill="url(#hoof)"/><path d="M96,300 h54 v14 q0,14 -14,14 h-26 q-14,0 -14,-14 Z" fill="url(#hoof)"/>';
 // corpo
 o+='<path d="M-155,70 C-180,190 -130,300 0,302 C130,300 180,190 155,70 C120,10 -120,10 -155,70 Z" fill="url(#cowW)"/>';
 o+='<path d="M-140,120 C-120,90 -80,100 -78,130 C-76,170 -120,180 -136,160 Z" fill="url(#cowS)"/><path d="M70,190 C100,170 140,180 140,210 C140,240 100,248 80,232 C64,220 60,200 70,190 Z" fill="url(#cowS)"/>';
 o+='<ellipse cx="0" cy="235" rx="62" ry="34" fill="#f0e6f2" stroke="none"/><path d="M-120,230 q120,70 240,0" fill="none" stroke="#d9cde4" stroke-width="6" opacity=".8"/>';
 o+='<path d="M-60,95 q-30,40 -20,90" fill="none" stroke="#fff" stroke-width="10" opacity=".6"/>';
 // pernas da frente
 for(const lx of [-72,72]){ o+='<rect x="'+(lx-30)+'" y="235" width="60" height="100" rx="26" fill="url(#cowW)"/><path d="M'+(lx-30)+',304 h60 v14 q0,16 -16,16 h-28 q-16,0 -16,-16 Z" fill="url(#hoof)"/><path d="M'+lx+',306 v28" stroke-width="5"/><path d="M'+(lx-20)+',310 h12" stroke="#c9a898" stroke-width="5"/>'; }
 // lenço/sino
 if(lenco) o+='<path d="M-118,38 Q0,98 118,38 L96,96 Q0,140 -96,96 Z" fill="'+lenco+'"/><path d="M-96,62 Q0,112 96,62" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="10 12" opacity=".85"/><path d="M-14,118 l-26,46 l34,-8 Z M14,118 l26,46 l-34,-8 Z" fill="'+lenco+'"/><circle cx="0" cy="118" r="18" fill="'+lenco+'"/><circle cx="-6" cy="112" r="5" fill="#fff" opacity=".7" stroke="none"/>';
 else o+='<path d="M-110,40 Q0,96 110,40" fill="none" stroke="#c0392b" stroke-width="14"/><path d="M-26,86 Q-28,140 0,142 Q28,140 26,86 Q0,76 -26,86 Z" fill="'+YL+'"/><circle cx="0" cy="138" r="7" fill="'+OL+'"/><path d="M-12,96 q-4,20 2,34" fill="none" stroke="#fff6c0" stroke-width="5"/>';
 // cabeça
 o+='<g transform="rotate('+hr+' 0 0)">';
 // orelhas
 for(const sx of [-1,1]){ o+='<g transform="translate('+(sx*168)+' -150) rotate('+(sx*-22)+')"><ellipse rx="62" ry="27" fill="url(#cowW)"/><ellipse cx="'+(sx*6)+'" rx="42" ry="14" fill="url(#cowP)" stroke="none"/></g>'; }
 // chifres
 for(const sx of [-1,1]){ o+='<g transform="scale('+sx+' 1)"><path d="M-92,-226 C-118,-270 -96,-312 -62,-304 C-74,-284 -72,-258 -58,-238 Z" fill="url(#horn)"/><path d="M-96,-262 q16,6 30,0 M-90,-282 q12,5 24,0" fill="none" stroke="#c9a85a" stroke-width="4"/></g>'; }
 o+='<path d="M-150,-120 C-162,-212 -92,-252 0,-252 C92,-252 162,-212 150,-120 C150,-38 108,12 0,14 C-108,12 -150,-38 -150,-120 Z" fill="url(#cowW)"/>';
 o+='<path d="M54,-246 C110,-238 150,-200 148,-150 C120,-140 80,-150 64,-180 C52,-204 40,-230 54,-246 Z" fill="url(#cowS)"/><path d="M-120,-200 C-104,-214 -80,-206 -84,-186 C-90,-170 -114,-172 -120,-184 Z" fill="url(#cowS)"/>';
 o+='<ellipse cx="-62" cy="-214" rx="46" ry="14" fill="#fff" opacity=".85" stroke="none"/>';
 // franja
 o+='<path d="M-34,-246 C-40,-282 -6,-292 2,-266 C8,-292 44,-288 36,-252 C26,-232 -26,-230 -34,-246 Z" fill="url(#cowS)"/><path d="M-14,-266 q8,-10 16,-4" fill="none" stroke="#8a80b0" stroke-width="4"/>';
 if(coroa){ for(let k=0;k<5;k++){const a=(-150+k*30)*Math.PI/180; o+=flor(R(Math.cos(a)*150),R(-140+Math.sin(a)*110),.9,['#ffffff','#ff9ec4','#bfe0ff','#ffffff','#ff9ec4'][k]);} }
 // olhos
 if(olho==='feliz'){ for(const ex of [-60,60]){ o+='<path d="M'+(ex-30)+',-112 Q'+ex+',-150 '+(ex+30)+',-112" fill="none" stroke-width="11"/><path d="M'+(ex-32)+',-114 l-12,-10 M'+(ex-24)+',-128 l-8,-14 M'+(ex+32)+',-114 l12,-10 M'+(ex+24)+',-128 l8,-14" stroke-width="5"/>'; } }
 else { for(const ex of [-60,60]){ o+='<ellipse cx="'+ex+'" cy="-118" rx="28" ry="34" fill="url(#eye)"/><circle cx="'+(ex+9)+'" cy="-132" r="11" fill="#fff" stroke="none"/><circle cx="'+(ex-9)+'" cy="-104" r="5" fill="#fff" stroke="none"/><path d="M'+(ex-22)+',-160 q22,-12 44,0" fill="none" stroke-width="6"/>'; } }
 o+='<ellipse cx="-112" cy="-72" rx="30" ry="17" fill="#ff8fb8" opacity=".65" stroke="none" filter="url(#b4)"/><ellipse cx="112" cy="-72" rx="30" ry="17" fill="#ff8fb8" opacity=".65" stroke="none" filter="url(#b4)"/>';
 // focinho
 o+='<ellipse cx="0" cy="-36" rx="112" ry="62" fill="url(#cowP)"/><ellipse cx="-26" cy="-74" rx="52" ry="14" fill="#fff" opacity=".6" stroke="none"/>';
 o+='<ellipse cx="-40" cy="-42" rx="14" ry="19" fill="#d65a8c"/><ellipse cx="40" cy="-42" rx="14" ry="19" fill="#d65a8c"/><ellipse cx="-42" cy="-38" rx="6" ry="9" fill="#9e2f5e" stroke="none"/><ellipse cx="38" cy="-38" rx="6" ry="9" fill="#9e2f5e" stroke="none"/>';
 o+='<path d="M-30,-6 Q0,18 30,-6" fill="none" stroke-width="6"/><path d="M-12,4 Q0,20 12,4" fill="#ff6f9c" stroke-width="4"/>';
 o+='</g>';
 return o+'</g>'; }
// ---------- LONTRA (a flutuar de barriga para cima; cabeça à esquerda; dir=-1 vira) ----------
function lontra(cx,cy,s,dir=1,o2={}){ const mao=o2.mao||'dada', agua=o2.agua!==false;
 let o='<g transform="translate('+cx+' '+cy+') scale('+(s*dir)+' '+s+')" stroke="'+OL+'" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">';
 o+='<path d="M140,-6 C220,-20 292,0 318,32 C286,48 212,42 140,30 Z" fill="url(#ofur)"/><path d="M200,6 q40,0 70,14" fill="none" stroke="#c48a5e" stroke-width="4"/>';
 o+='<path d="M-120,-40 C-60,-78 92,-72 162,-22 C188,0 182,42 150,56 C80,82 -60,82 -122,50 Z" fill="url(#ofur)"/>';
 o+='<path d="M-100,-22 C-40,-54 82,-48 132,-16 C122,22 60,36 -20,36 C-70,32 -100,10 -100,-22 Z" fill="url(#obel)" stroke="none"/>';
 for(const [fx,fy] of [[-50,-20],[0,-30],[50,-22],[-20,10],[30,6],[80,-6]]) o+='<path d="M'+fx+','+fy+' q8,-8 16,0" fill="none" stroke="#d2b088" stroke-width="4"/>';
 // patas de trás levantadas
 for(const [px,py,r] of [[120,-60,-20],[160,-48,10]]){ o+='<g transform="translate('+px+' '+py+') rotate('+r+')"><path d="M-14,30 L-16,-6 Q0,-26 16,-6 L14,30 Z" fill="#7a4a2c"/><ellipse cx="0" cy="-8" rx="10" ry="7" fill="#f2a7b8" stroke="none"/><circle cx="-8" cy="-20" r="4" fill="#f2a7b8" stroke="none"/><circle cx="0" cy="-23" r="4" fill="#f2a7b8" stroke="none"/><circle cx="8" cy="-20" r="4" fill="#f2a7b8" stroke="none"/></g>'; }
 // cabeça
 o+='<circle cx="-162" cy="-22" r="80" fill="url(#ofur)"/>';
 for(const [ex,ey] of [[-210,-86],[-118,-92]]) o+='<circle cx="'+ex+'" cy="'+ey+'" r="20" fill="url(#ofur)"/><circle cx="'+ex+'" cy="'+(ey+3)+'" r="9" fill="#e8a08a" stroke="none"/>';
 o+='<circle cx="-162" cy="-22" r="80" fill="none"/>';
 o+='<ellipse cx="-176" cy="6" rx="56" ry="42" fill="url(#obel)" stroke="none"/><ellipse cx="-196" cy="-74" rx="30" ry="10" fill="#fff" opacity=".28" stroke="none"/>';
 o+='<path d="M-224,-30 q16,-15 32,0 M-160,-34 q16,-15 32,0" fill="none" stroke-width="7"/><path d="M-226,-32 l-8,-6 M-128,-36 l8,-6" stroke-width="4"/>';
 o+='<path d="M-196,-6 Q-178,-18 -160,-6 Q-162,8 -178,10 Q-194,8 -196,-6 Z" fill="#2a1a12"/><ellipse cx="-184" cy="-8" rx="6" ry="3.5" fill="#fff" opacity=".8" stroke="none"/>';
 o+='<path d="M-178,10 v8 M-178,18 q-12,10 -22,2 M-178,18 q12,10 22,2" fill="none" stroke-width="4"/>';
 for(const [dx,dy] of [[-210,6],[-212,16],[-146,4],[-144,14]]) o+='<circle cx="'+dx+'" cy="'+dy+'" r="2.5" fill="'+OL+'" stroke="none"/>';
 o+='<path d="M-214,10 l-46,-8 M-214,20 l-46,6 M-142,8 l44,-10 M-142,18 l44,4" stroke-width="2.5"/>';
 o+='<ellipse cx="-232" cy="0" rx="17" ry="9" fill="#ff8fb4" opacity=".7" stroke="none" filter="url(#b4)"/><ellipse cx="-122" cy="-4" rx="17" ry="9" fill="#ff8fb4" opacity=".7" stroke="none" filter="url(#b4)"/>';
 // braços
 if(mao==='dada'){ o+='<path d="M-50,30 Q-150,58 -268,26" fill="none" stroke="#5e3a22" stroke-width="30"/><path d="M-50,30 Q-150,58 -268,26" fill="none" stroke="#9c6640" stroke-width="17"/>'; }
 o+='<path d="M-60,-30 Q-40,-60 -10,-52" fill="none" stroke="#5e3a22" stroke-width="28"/><path d="M-60,-30 Q-40,-60 -10,-52" fill="none" stroke="#9c6640" stroke-width="15"/><ellipse cx="0" cy="-56" rx="22" ry="16" fill="#cfc6e0"/><path d="M-10,-60 q10,-6 20,0" fill="none" stroke="#fff" stroke-width="3"/>';
 if(agua){ o+='<path d="M-300,52 Q-240,36 -180,52 T-60,52 T60,52 T180,52 T300,52 Q340,80 300,112 Q0,150 -300,112 Q-340,80 -300,52 Z" fill="#3a8fd6" opacity=".7" stroke="none" filter="url(#b4)"/><path d="M-290,52 Q-240,40 -180,52 T-60,52 T60,52 T180,52 T300,52" fill="none" stroke="#c9ecff" stroke-width="6" opacity=".9"/>'; }
 return o+'</g>'; }
function maos(x,y,s){ return '<g transform="translate('+x+' '+y+') scale('+s+')" stroke="'+OL+'" stroke-width="6"><ellipse rx="44" ry="28" fill="#7a4a2c"/><path d="M-20,-12 v20 M0,-16 v24 M20,-12 v20" stroke="#5e3a22" stroke-width="5"/></g>'; }
function rio(path){ return '<path d="'+path+'" fill="url(#water)" stroke="'+OL+'" stroke-width="7"/>'; }
function ondas(x0,x1,y0,y1,n,seed){ let o=''; for(let i=0;i<n;i++){const x=x0+((i*83+seed*29)%(x1-x0)), y=y0+((i*61+seed*13)%(y1-y0)); o+='<path d="M'+x+','+y+' q16,-9 32,0 q16,9 32,0" fill="none" stroke="#c9ecff" stroke-width="5" stroke-linecap="round" opacity=".75"/>';} return o; }
function reflexo(x,y){ let o='<g filter="url(#b4)" opacity=".55">'; for(let i=0;i<5;i++) o+='<rect x="'+(x-50+i*6)+'" y="'+(y+i*26)+'" width="'+(100-i*12)+'" height="8" rx="4" fill="#fff6c8"/>'; return o+'</g>'; }
// ---------- UI ----------
function marca(){ return '<g transform="translate(130 92)"><rect x="-92" y="-36" width="184" height="72" rx="36" fill="#0a1633" stroke="'+YL+'" stroke-width="5"/><text y="15" font-family="M" font-weight="900" font-size="34" fill="'+YL+'" text-anchor="middle">2 FATOS</text></g>'; }
function canto(n){ return '<g transform="translate(985 92)"><rect x="-64" y="-36" width="128" height="72" rx="36" fill="'+YL+'" stroke="#0a1633" stroke-width="6"/><text y="15" font-family="M" font-weight="900" font-size="40" fill="#0a1633" text-anchor="middle">#'+n+'</text></g>'; }
function pill(x,y,txt,bg,fg,sz,w){ w=w||txt.length*sz*.66+70; return '<g transform="translate('+x+' '+y+')"><rect x="'+(-w/2+6)+'" y="-32" width="'+w+'" height="80" rx="40" fill="#000" opacity=".3"/><rect x="'+(-w/2)+'" y="-40" width="'+w+'" height="80" rx="40" fill="'+bg+'" stroke="#0a1633" stroke-width="6"/><text y="'+R(sz*.36)+'" font-family="M" font-weight="900" font-size="'+sz+'" fill="'+fg+'" text-anchor="middle">'+txt+'</text></g>'; }
function caixa(l1,l2){ return '<rect x="96" y="1136" width="900" height="150" rx="36" fill="#000" opacity=".3"/><rect x="90" y="1128" width="900" height="150" rx="36" fill="#fffaf0" stroke="#0a1633" stroke-width="7"/><text x="540" y="1193" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">'+l1+'</text><text x="540" y="1248" font-family="M" font-weight="900" font-size="44" fill="#0a1633" text-anchor="middle">'+l2+'</text>'+coracao(940,1140,.7,PK); }
`;
const S=[];
S.push(`(()=>{let o=defs()+ceu(0)+lua(880,640,58)+montes();
 o+=relva('M-20,975 Q260,900 600,950 Q760,975 860,1010 L720,1360 H-20 Z');
 o+=rio('M610,925 Q760,940 830,975 Q950,1025 1100,1010 V1360 H520 Q660,1210 720,1110 Q752,1040 680,975 Z');
 o+=ondas(700,1060,1040,1250,9,1)+reflexo(900,1040)+nenufar(1010,1210,.7,'#ff9ec4')+nenufar(760,1240,.55,null);
 o+=folhas(10,640,1000,1300,70,1)+junco(640,1010,.6)+junco(560,1180,.7)+pedra(690,1240,.8)+pedra(600,1300,.6);
 for(let i=0;i<8;i++) o+=flor((i*79+30)%560,1050+(i*57)%220,.8,['#ff9ec4','#ffffff','#bfe0ff','#ffe9a0'][i%4]);
 o+='<circle cx="300" cy="930" r="290" fill="url(#pglow)"/>'+vaca(300,880,.66,1,{lenco:'#ff9ec4',coroa:true});
 o+=lontra(790,1125,.48,-1)+lontra(1058,1125,.48,1)+maos(924,1138,.5)+coracao(924,1050,.8,PK);
 o+=vagalumes(1,10,760,1200);
 o+=marca()+canto('01');
 o+=fTxt(540,280,'2 FATOS',92,'#fff')+fTxt(540,410,'FOFINHOS',150,PK,'middle',18);
 o+=pill(540,515,'QUE VÃO TE DERRETER',YL,'#0a1633',44);
 o+='<g transform="translate(540 1262)"><rect x="-300" y="-50" width="612" height="116" rx="58" fill="#000" opacity=".35"/><rect x="-306" y="-58" width="612" height="116" rx="58" fill="'+YL+'" stroke="#0a1633" stroke-width="8"/><text x="-40" y="24" font-family="M" font-weight="900" font-size="72" fill="#0a1633" text-anchor="middle">DESLIZA</text><path d="M150,0 h100 m-36,-36 l36,36 l-36,36" fill="none" stroke="#0a1633" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>';
 return o;})()`);
S.push(`(()=>{let o=defs()+ceu(1)+lua(150,640,50)+montes();
 o+='<g stroke="'+OL+'" stroke-width="6">'; for(let x=10;x<1080;x+=125) o+='<rect x="'+x+'" y="880" width="30" height="120" rx="8" fill="url(#wood)"/><path d="M'+(x+8)+',900 v80" stroke="#8a5a2c" stroke-width="3"/>'; o+='<rect x="-10" y="900" width="1100" height="22" rx="8" fill="url(#wood)"/><rect x="-10" y="950" width="1100" height="22" rx="8" fill="url(#wood)"/></g>';
 o+=relva('M-20,985 Q540,940 1100,985 V1360 H-20 Z')+folhas(0,1080,1000,1300,90,2);
 for(let i=0;i<10;i++) o+=flor((i*109+40)%1040,1020+(i*41)%110,.8,['#ff9ec4','#ffffff','#bfe0ff','#ffe9a0'][i%4]);
 o+='<circle cx="540" cy="830" r="330" fill="url(#pglow)"/>';
 o+=vaca(380,780,.68,1,{hr:10,lenco:'#ffd21f'})+vaca(700,780,.68,-1,{hr:10,lenco:'#7fd3ff',coroa:true});
 o+=coracao(540,600,1.5,PK)+coracao(455,545,.7,YL)+coracao(625,530,.6,PK)+vagalumes(2,9,700,1100);
 o+=marca()+canto('02')+pill(540,210,'FATO 1',YL,'#0a1633',44,240);
 o+=fTxt(540,350,'VACAS TÊM',96,'#fff')+fTxt(540,465,'MELHOR AMIGA',104,PK,'middle',16);
 o+=caixa('Juntas, elas ficam bem','menos <tspan fill="#e8649a">estressadas</tspan>');
 return o;})()`);
S.push(`(()=>{let o=defs()+ceu(2)+lua(880,620,54)+montes();
 o+=relva('M-20,880 Q200,850 380,880 L320,920 Q160,930 -20,920 Z')+junco(80,905,.7)+junco(300,900,.55);
 o+=rio('M-20,900 Q540,860 1100,900 V1360 H-20 Z')+reflexo(880,930)+ondas(20,1060,940,1300,16,3);
 o+=nenufar(140,1050,.8,'#ff9ec4')+nenufar(960,1080,.7,'#fff')+nenufar(220,1240,.6,null)+nenufar(880,1270,.6,'#ff9ec4');
 o+=lontra(374,1005,.62,-1)+lontra(706,1005,.62,1)+maos(540,1021,.62)+coracao(540,920,1.2,PK);
 o+='<text x="190" y="800" font-family="M" font-weight="900" font-size="58" fill="#bfe9ff" opacity=".85">z</text><text x="235" y="750" font-family="M" font-weight="900" font-size="42" fill="#bfe9ff" opacity=".65">z</text><text x="860" y="800" font-family="M" font-weight="900" font-size="58" fill="#bfe9ff" opacity=".85">z</text>';
 o+=vagalumes(3,8,700,900);
 o+=marca()+canto('03')+pill(540,210,'FATO 2',YL,'#0a1633',44,240);
 o+=fTxt(540,350,'LONTRAS DORMEM',90,'#fff')+fTxt(540,465,'DE MÃOS DADAS',104,PK,'middle',16);
 o+=caixa('Pra corrente não separar','uma da <tspan fill="#e8649a">outra</tspan>');
 return o;})()`);
S.push(`(()=>{let o=defs()+ceu(3)+lua(900,640,50)+montes();
 o+=relva('M-20,960 Q280,900 560,950 Q640,970 700,1000 L560,1360 H-20 Z');
 o+=rio('M560,930 Q720,940 800,975 Q940,1020 1100,1000 V1360 H420 Q540,1200 600,1100 Q620,1030 560,975 Z')+ondas(600,1060,1040,1200,7,4)+nenufar(990,1200,.6,'#ff9ec4');
 o+=folhas(10,540,990,1110,50,4);
 for(let i=0;i<6;i++) o+=flor((i*83+30)%480,1000+(i*37)%90,.75,['#ff9ec4','#ffffff','#bfe0ff'][i%3]);
 o+='<circle cx="290" cy="820" r="280" fill="url(#pglow)"/>'+vaca(210,760,.5,1,{hr:10,lenco:PK})+vaca(400,760,.5,-1,{hr:10,lenco:YL,coroa:true});
 o+=lontra(700,1060,.42,-1)+lontra(934,1060,.42,1)+maos(817,1071,.42);
 o+=coracao(305,620,1,PK)+coracao(817,990,.8,PK)+vagalumes(4,8,700,1050);
 o+=marca()+canto('04');
 o+=fTxt(540,280,'MANDA PRA SUA',96,'#fff')+fTxt(540,410,'MELHOR AMIGA',120,PK,'middle',18);
 o+='<g transform="translate(540 1135)"><rect x="-294" y="-42" width="600" height="100" rx="50" fill="#000" opacity=".35"/><rect x="-300" y="-50" width="600" height="100" rx="50" fill="'+YL+'" stroke="#0a1633" stroke-width="7"/><path d="M-230,-14 L-180,0 L-230,14 Z M-180,0 L-235,-30 L-215,0 L-235,30 Z" fill="#0a1633"/><text x="30" y="16" font-family="M" font-weight="900" font-size="46" fill="#0a1633" text-anchor="middle">ENVIA AGORA</text></g>';
 o+=pill(540,1265,'SEGUE: TODO DIA MAIS 2 FATOS','#0a1633','#fff',32,640);
 return o;})()`);
(async()=>{const b=await chromium.launch();
for(let i=0;i<S.length;i++){const p=await b.newPage({viewport:{width:1080,height:1350}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1350 viewBox="0 0 1080 1350"></svg><script>window.window=window;${art};${lib}; try{document.getElementById('s').innerHTML=${S[i]};}catch(e){document.title='ERR '+e.message}</script>`);
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
const t=await p.title(); if(t.startsWith('ERR')) console.log('slide',i+1,t);
await p.screenshot({path:`${process.argv[2]}/car01b/slide${i+1}.png`}); await p.close();}
await b.close();})();
