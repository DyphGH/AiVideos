// ===== 2 FATOS (BR) — Mosquito v3 · versão detalhada =====
const MQK='#14141c', MQB='#2b2b36';
// gradientes / texturas partilhadas pelos mosquitos
function mqDefs(){ return `<defs>
<linearGradient id="mqBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#626274"/><stop offset=".5" stop-color="#2e2e3a"/><stop offset="1" stop-color="#121218"/></linearGradient>
<linearGradient id="mqAbd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55556a"/><stop offset=".6" stop-color="#25252f"/><stop offset="1" stop-color="#101016"/></linearGradient>
<radialGradient id="mqBlood" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ff7a68"/><stop offset=".55" stop-color="#d1281e"/><stop offset="1" stop-color="#7a0f0a"/></radialGradient>
<radialGradient id="mqEye" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#8a3640"/><stop offset=".5" stop-color="#3e1119"/><stop offset="1" stop-color="#0e0407"/></radialGradient>
<radialGradient id="mqIris" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd0a0"/><stop offset=".25" stop-color="#ff5a3a"/><stop offset=".7" stop-color="#d6201a" stop-opacity=".8"/><stop offset="1" stop-color="#d6201a" stop-opacity="0"/></radialGradient>
<linearGradient id="mqWing" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".8"/><stop offset=".45" stop-color="#cfe9ff" stop-opacity=".45"/><stop offset=".75" stop-color="#f0d4ff" stop-opacity=".4"/><stop offset="1" stop-color="#d4fff0" stop-opacity=".35"/></linearGradient>
<pattern id="mqHex" width="18" height="15.6" patternUnits="userSpaceOnUse"><path d="M4.5,0 H13.5 L18,7.8 L13.5,15.6 H4.5 L0,7.8 Z" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="1.6"/><circle cx="9" cy="7.8" r="2" fill="#fff" opacity=".08"/></pattern>
<radialGradient id="skinG" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#ffd9b8"/><stop offset=".7" stop-color="#f1c49d"/><stop offset="1" stop-color="#dba57c"/></radialGradient>
</defs>`; }
// asa (origem na raiz)
function mqWing(ang,op,sc=1,tx=-6,ty=-42){
  return `<g transform="translate(${tx} ${ty}) rotate(${ang}) scale(${sc})" opacity="${op}"><path d="M0,0 C-50,-46 -190,-62 -262,-28 C-278,-18 -270,-4 -250,0 C-180,14 -70,18 0,0 Z" fill="url(#mqWing)" stroke="#7f9bb8" stroke-width="2.5"/><path d="M-8,-4 C-80,-30 -170,-38 -252,-18 M-18,2 C-90,-8 -170,-12 -256,-6 M-60,-22 L-118,6 M-128,-36 L-166,8 M-196,-36 L-212,2 M-230,-30 L-240,-2" fill="none" stroke="#7f9bb8" stroke-width="1.7"/><path d="M-30,12 C-110,24 -200,16 -264,-12" fill="none" stroke="#a9bfd3" stroke-width="3" stroke-dasharray="1.5 5"/><path d="M-40,-20 C-100,-40 -170,-44 -220,-34" fill="none" stroke="#fff" stroke-width="5" opacity=".5"/></g>`; }
// mosquito detalhado de perfil (Aedes): (x,y)=tórax · s=escala · virado à direita (flip=esquerda)
function mosqD(x,y,s,t,{look='mau',flip=false,straw=false,napkin=false,full=0,rot=0}={}){
  let o=`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip?-s:s} ${s})" stroke-linecap="round" stroke-linejoin="round">`;
  const ph=Math.sin(t*70), a=-6+ph*24;
  o+=mqWing(a-34,.22)+mqWing(a+6,.5,.94,-14,-46); // asa de trás + rasto de movimento
  // patas (3 de trás primeiro) com riscas brancas
  const legs=[[[20,40],[70,100],[110,180],[140,262]],[[-10,45],[-50,112],[-62,192],[-72,268]],[[-25,40],[-90,112],[-170,72],[-252,34]],
              [[30,40],[92,92],[152,172],[214,252]],[[0,46],[-18,112],[-8,194],[12,272]],[[-32,40],[-112,92],[-212,40],[-302,-32]]];
  legs.forEach((L,i)=>{ const far=i<3, w=Math.sin(t*3+i*1.7)*6;
    const p=L.map((q,k)=>[q[0]+(k>1?w:0),q[1]+(k>2?w*.6:0)]);
    o+=`<g opacity="${far?.75:1}"><path d="M${p[0]} L${p[1]} L${p[2]} L${p[3]}" fill="none" stroke="${MQK}" stroke-width="${far?7:9}"/><path d="M${p[1]} L${p[2]} L${p[3]}" fill="none" stroke="#f4f4f4" stroke-width="${far?3:4}" stroke-dasharray="7 13"/><circle cx="${p[1][0]}" cy="${p[1][1]}" r="${far?5:7}" fill="${MQK}"/><circle cx="${p[2][0]}" cy="${p[2][1]}" r="${far?4:5}" fill="${MQK}"/><path d="M${p[3][0]},${p[3][1]} l9,7 M${p[3][0]},${p[3][1]} l-6,9" stroke="${MQK}" stroke-width="3"/></g>`; });
  // abdómen segmentado (enche de sangue com 'full')
  const ux=-0.978, uy=0.208, g0=[-48,14];
  for(let i=7;i>=0;i--){ const d=18+i*33, cx=g0[0]+ux*d, cy=g0[1]+uy*d, ry=(42-i*2.8)*(1+full*.55), rx=24+full*4;
    o+=`<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(-12)"><ellipse rx="${rx}" ry="${ry}" fill="url(#mqAbd)" stroke="${MQK}" stroke-width="4"/>${full>0?`<ellipse rx="${rx-4}" ry="${ry-4}" fill="url(#mqBlood)" opacity="${full}" stroke="none"/>`:''}<path d="M${-rx+6},${ry*.35} q${rx*.4},${ry*.5} ${rx*1.1},${ry*.45}" stroke="#f4f4f4" stroke-width="5" fill="none"/><path d="M${-rx*.4},${-ry*.72} q${rx*.5},-6 ${rx*.9},${ry*.1}" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/></g>`; }
  const tip=[g0[0]+ux*268,g0[1]+uy*268];
  o+=`<path d="M${tip[0]},${tip[1]} l-24,4 M${tip[0]},${tip[1]} l-18,-10" stroke="${MQK}" stroke-width="5"/>`;
  // balanceiro
  o+=`<path d="M-40,-18 l-28,-14" stroke="${MQK}" stroke-width="3"/><circle cx="-70" cy="-33" r="7" fill="#e8e0c0" stroke="${MQK}" stroke-width="3"/>`;
  // tórax com padrão de lira
  o+=`<path d="M-62,20 C-70,-40 -20,-66 30,-58 C70,-50 86,-10 74,26 C60,58 -40,62 -62,20 Z" fill="url(#mqBody)" stroke="${MQK}" stroke-width="5"/>`;
  o+=`<path d="M-10,-46 C-34,-30 -32,0 -14,14 M34,-48 C56,-30 52,0 34,14 M9,-50 V6 M19,-50 V6" fill="none" stroke="#f2f2f2" stroke-width="4"/>`;
  o+=`<ellipse cx="4" cy="-38" rx="40" ry="9" fill="#fff" opacity=".2" stroke="none"/><circle cx="-42" cy="22" r="6" fill="#f2f2f2"/><circle cx="42" cy="30" r="6" fill="#f2f2f2"/><circle cx="-20" cy="38" r="4" fill="#f2f2f2"/>`;
  for(let k=0;k<8;k++){ const hx=-44+k*13; o+=`<path d="M${hx},${-50+Math.abs(hx)*.15} l${-5+k*1.4},-13" stroke="${MQK}" stroke-width="2"/>`; }
  // babete
  if(napkin) o+=`<path d="M58,14 L124,22 L86,96 Z" fill="#fff" stroke="${MQK}" stroke-width="4"/><path d="M68,28 L112,32 M74,46 L104,48 M80,64 L96,66 M86,24 L84,78 M100,26 L92,60" stroke="#e0483a" stroke-width="4"/>`;
  // cabeça
  o+=`<circle cx="98" cy="-4" r="44" fill="url(#mqBody)" stroke="${MQK}" stroke-width="5"/><path d="M76,-40 q20,-10 40,0" stroke="#f2f2f2" stroke-width="4" fill="none"/>`;
  // probóscide / canudinho
  if(straw) o+=`<path d="M134,10 L300,92" stroke="${MQK}" stroke-width="24"/><path d="M134,10 L300,92" stroke="#ff4fa0" stroke-width="16"/><path d="M134,10 L300,92" stroke="#fff" stroke-width="16" stroke-dasharray="12 12"/><path d="M298,90 l14,-10" stroke="${MQK}" stroke-width="10"/>`;
  else o+=`<path d="M134,10 Q220,40 312,86" fill="none" stroke="${MQK}" stroke-width="8"/><path d="M198,35 L232,50" stroke="#f4f4f4" stroke-width="5"/><path d="M300,80 l16,9" stroke="${MQK}" stroke-width="12"/>`;
  // palpos
  o+=`<path d="M128,0 Q158,8 180,22" fill="none" stroke="${MQK}" stroke-width="9"/><path d="M168,15 L180,22" stroke="#f4f4f4" stroke-width="6"/>`;
  // antenas com tufos
  const ant=(x0,y0,x1,y1)=>{ let r=`<path d="M${x0},${y0} L${x1},${y1}" stroke="${MQK}" stroke-width="4"/><circle cx="${x0}" cy="${y0}" r="7" fill="${MQK}"/>`; for(let k=1;k<=6;k++){ const px=x0+(x1-x0)*k/7, py=y0+(y1-y0)*k/7; r+=`<path d="M${px-9},${py-5} L${px+9},${py+5} M${px-8},${py+7} L${px+8},${py-7}" stroke="${MQK}" stroke-width="1.8"/>`; } return r; };
  o+=ant(108,-40,140,-128)+ant(118,-36,180,-116);
  // olho composto + expressão
  o+=`<ellipse cx="102" cy="-10" rx="34" ry="37" fill="url(#mqEye)" stroke="${MQK}" stroke-width="4"/><ellipse cx="102" cy="-10" rx="33" ry="36" fill="url(#mqHex)" stroke="none"/>`;
  if(look==='feliz'){ o+=`<path d="M66,-2 Q102,-34 138,-2 L138,32 L66,32 Z" fill="${MQB}" stroke="none"/><path d="M68,-2 Q102,-32 136,-2" fill="none" stroke="${MQK}" stroke-width="6"/><ellipse cx="92" cy="-22" rx="7" ry="5" fill="#fff" opacity=".8" stroke="none"/><ellipse cx="84" cy="12" rx="12" ry="7" fill="#ff7aa0" opacity=".6" stroke="none"/><path d="M110,20 q11,12 22,0" fill="none" stroke="${MQK}" stroke-width="5"/>`; }
  else { o+=`<circle cx="110" cy="-6" r="16" fill="url(#mqIris)" stroke="none"/><circle cx="112" cy="-6" r="5" fill="#1a0306" stroke="none"/><ellipse cx="90" cy="-26" rx="9" ry="6" fill="#fff" opacity=".85" stroke="none"/><circle cx="118" cy="4" r="3" fill="#fff" opacity=".7" stroke="none"/>`;
    if(look==='triste') o+=`<path d="M74,-30 L130,-52" stroke="${MQK}" stroke-width="9"/><path d="M110,22 q11,-9 22,0" fill="none" stroke="${MQK}" stroke-width="5"/><path d="M96,28 q-8,16 0,22 q8,-6 0,-22 Z" fill="#7fc8f0" stroke="${MQK}" stroke-width="2"/>`;
    else o+=`<path d="M70,-48 L136,-24" stroke="${MQK}" stroke-width="11"/><path d="M110,26 q11,-9 22,0" fill="none" stroke="${MQK}" stroke-width="5"/>`; }
  // asa da frente
  o+=mqWing(a,.75);
  return o+`</g>`;
}
function hookMq(t,end){ if(t>end) return ''; const op=t>end-.25?(end-t)/.25:1;
  return `<g opacity="${op}"><rect x="48" y="162" width="1000" height="200" rx="26" fill="#000" opacity=".25"/><rect x="40" y="150" width="1000" height="200" rx="26" fill="${FY}" stroke="${FK}" stroke-width="10"/><text x="540" y="235" font-family="M" font-weight="900" font-size="64" fill="${FK}" text-anchor="middle" stroke="none">ESSE MOSQUITO VAI TE</text><text x="540" y="318" font-family="M" font-weight="900" font-size="64" fill="#e0483a" text-anchor="middle" stroke="none">PICAR COM 6 AGULHAS</text></g>`; }

// ===== pessoa detalhada =====
function pessoaD(x,y,s,{mood='normal',bites=0,t=0}={}){
  const SK='#f1c49d', SKD='#d39a72', HR='#3b2a20';
  let o=`<g transform="translate(${x} ${y}) scale(${s})" stroke="${FK}" stroke-linejoin="round" stroke-linecap="round">`;
  // braços em baixo (normal/triste)
  if(mood!=='choque') for(const d of [-1,1]) o+=`<path d="M${d*120},170 Q${d*175},260 ${d*168},400" fill="none" stroke="${FK}" stroke-width="66"/><path d="M${d*120},170 Q${d*175},260 ${d*168},400" fill="none" stroke="#3f7fd0" stroke-width="52"/>`;
  // tronco pijama
  o+=`<path d="M-160,430 Q-170,170 -60,126 L60,126 Q170,170 160,430 Z" fill="#3f7fd0" stroke-width="8"/><path d="M60,126 Q170,170 160,430 L112,430 Q124,230 50,140 Z" fill="#2c5fa5" stroke="none"/>`;
  for(let k=0;k<6;k++) o+=`<path d="M${-125+k*50},175 L${-132+k*50},428" stroke="#fff" stroke-width="7" opacity=".22"/>`;
  // pescoço
  o+=`<path d="M-36,60 L-36,140 Q0,160 36,140 L36,60 Z" fill="${SK}" stroke-width="7"/><path d="M-34,100 Q0,124 34,100" stroke="${SKD}" stroke-width="12" fill="none"/>`;
  // gola + botões
  o+=`<path d="M-62,124 L0,196 L-14,124 Z M62,124 L0,196 L14,124 Z" fill="#f3f0ea" stroke-width="6"/>`;
  for(let k=0;k<3;k++) o+=`<circle cx="0" cy="${230+k*60}" r="8" fill="#f3f0ea" stroke-width="4"/>`;
  // orelhas
  for(const d of [-1,1]) o+=`<ellipse cx="${d*104}" cy="10" rx="22" ry="30" fill="${SK}" stroke-width="7"/><path d="M${d*106},-6 q${d*10},14 0,30" fill="none" stroke="${SKD}" stroke-width="5"/>`;
  // cara
  o+=`<ellipse cx="0" cy="0" rx="102" ry="112" fill="url(#skinG)" stroke-width="8"/><ellipse cx="0" cy="96" rx="50" ry="10" fill="${SKD}" opacity=".35" stroke="none"/>`;
  // cabelo com madeixas
  o+=`<path d="M-108,-6 C-124,-110 -40,-156 22,-146 C96,-140 128,-82 108,-6 C98,-56 62,-80 30,-70 C12,-96 -30,-94 -52,-70 C-72,-82 -98,-54 -108,-6 Z" fill="${HR}" stroke-width="8"/>`;
  o+=`<path d="M-70,-110 q30,-14 60,-8 M-20,-128 q40,0 70,20 M-90,-60 q10,-30 40,-44 M60,-110 q30,16 40,50" fill="none" stroke="#6a4c38" stroke-width="5"/><path d="M-40,-136 q30,-8 56,0" fill="none" stroke="#8a6a52" stroke-width="6" opacity=".7"/>`;
  // bochechas
  o+=`<ellipse cx="-58" cy="42" rx="22" ry="12" fill="#f29a8a" opacity=".55" stroke="none"/><ellipse cx="58" cy="42" rx="22" ry="12" fill="#f29a8a" opacity=".55" stroke="none"/>`;
  // olhos / sobrancelhas / boca
  const eye=(ex,rx,ry,pr)=>`<ellipse cx="${ex}" cy="0" rx="${rx}" ry="${ry}" fill="#fff" stroke-width="5"/><circle cx="${ex+2}" cy="2" r="${pr}" fill="#6b4226" stroke="none"/><circle cx="${ex+2}" cy="2" r="${pr*.5}" fill="#120a06" stroke="none"/><circle cx="${ex-pr*.4}" cy="${-pr*.4}" r="${pr*.35}" fill="#fff" stroke="none"/>`;
  if(mood==='choque'){ o+=eye(-38,24,28,8)+eye(38,24,28,8);
    o+=`<path d="M-66,-52 Q-40,-72 -14,-56 M66,-52 Q40,-72 14,-56" fill="none" stroke="${HR}" stroke-width="10"/>`;
    o+=`<ellipse cx="0" cy="62" rx="24" ry="32" fill="#4a1a16" stroke-width="6"/><path d="M-14,82 Q0,70 14,82 Q0,92 -14,82 Z" fill="#e8737a" stroke="none"/><path d="M84,-40 q10,18 0,28 q-10,-10 0,-28 Z" fill="#9fd8ff" stroke-width="3"/>`; }
  else if(mood==='triste'){ o+=eye(-38,18,20,9)+eye(38,18,20,9);
    o+=`<path d="M-58,-8 Q-38,-26 -18,-8 L-18,-24 L-58,-24 Z M58,-8 Q38,-26 18,-8 L18,-24 L58,-24 Z" fill="${SK}" stroke="none"/><path d="M-58,-8 Q-38,-24 -18,-8 M58,-8 Q38,-24 18,-8" fill="none" stroke-width="5"/>`;
    o+=`<path d="M-62,-30 L-18,-44 M62,-30 L18,-44" stroke="${HR}" stroke-width="10"/><path d="M-30,62 Q0,40 30,62" fill="none" stroke-width="7"/>`;
    const dr=(t*1.2)%1; o+=`<path d="M48,${18+dr*60} q-8,14 0,20 q8,-6 0,-20 Z" fill="#7fc8f0" stroke-width="3" opacity="${1-dr}"/>`; }
  else { o+=eye(-38,18,20,9)+eye(38,18,20,9)+`<path d="M-58,-34 Q-38,-44 -18,-34 M58,-34 Q38,-44 18,-34" fill="none" stroke="${HR}" stroke-width="9"/><path d="M-30,52 Q0,74 30,52" fill="none" stroke-width="7"/>`; }
  o+=`<path d="M2,14 q12,22 -6,30" fill="none" stroke="${SKD}" stroke-width="6"/>`;
  // picadas (borbulhas vermelhas com risquinhos de comichão)
  const B=[[-70,70],[60,-60],[-20,120],[30,250],[-90,320],[110,300],[-60,-90],[80,60]];
  for(let k=0;k<Math.min(bites,B.length);k++){ const [bx,by]=B[k], j=Math.sin(t*20+k)*2; o+=`<circle cx="${bx}" cy="${by}" r="13" fill="#e8584a" stroke="#a8322a" stroke-width="3"/><circle cx="${bx-3}" cy="${by-3}" r="5" fill="#ffb3a6" stroke="none"/><path d="M${bx+16+j},${by-14} l8,-8 M${bx+20+j},${by} l10,0 M${bx+16+j},${by+14} l8,8" stroke="#e0483a" stroke-width="3"/>`; }
  // braços para a cara (choque)
  if(mood==='choque') for(const d of [-1,1]){ o+=`<path d="M${d*130},190 Q${d*190},120 ${d*112},50" fill="none" stroke="${FK}" stroke-width="66"/><path d="M${d*130},190 Q${d*190},120 ${d*112},50" fill="none" stroke="#3f7fd0" stroke-width="52"/>`;
    o+=`<ellipse cx="${d*96}" cy="34" rx="34" ry="40" fill="${SK}" stroke-width="7"/><path d="M${d*80},2 v30 M${d*96},-2 v32 M${d*112},4 v28" stroke="${SKD}" stroke-width="5"/>`; }
  return o+`</g>`;
}
// quarto à noite (cenário)
function quarto(t,{cal=false}={}){
  let o=`<defs><linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#25285e"/><stop offset="1" stop-color="#0c0d26"/></linearGradient><radialGradient id="lampG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".5"/><stop offset="1" stop-color="#ffcf6a" stop-opacity="0"/></radialGradient><radialGradient id="vigQ" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient><linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a34"/><stop offset="1" stop-color="#5a3a20"/></linearGradient></defs>`;
  o+=`<rect width="1080" height="1920" fill="url(#wallG)"/>`;
  for(let k=0;k<14;k++) o+=`<rect x="${k*80}" y="0" width="40" height="1500" fill="#fff" opacity=".03"/>`;
  for(let k=0;k<30;k++) o+=`<circle cx="${40+(k*137)%1000}" cy="${60+(k*211)%1300}" r="4" fill="#fff" opacity=".05"/>`;
  // janela com lua e estrelas
  if(!cal){ o+=`<g transform="translate(870 830)"><rect x="-140" y="-180" width="280" height="360" fill="#0a1238"/>`;
    for(let k=0;k<9;k++){ const sx=-120+(k*67)%240, sy=-160+(k*53)%320, tw=.4+.6*Math.abs(Math.sin(t*3+k)); o+=`<circle cx="${sx}" cy="${sy}" r="${2+k%3}" fill="#fff" opacity="${tw}"/>`; }
    o+=`<circle cx="50" cy="-90" r="50" fill="#fff3c4"/><circle cx="74" cy="-106" r="44" fill="#0a1238"/><path d="M0,-180 V180 M-140,0 H140" stroke="#5a3a20" stroke-width="12"/><rect x="-140" y="-180" width="280" height="360" fill="none" stroke="#5a3a20" stroke-width="20"/>`;
    o+=`<path d="M-170,-200 Q-120,-40 -160,200 L-200,200 L-200,-200 Z" fill="#8a2e52" stroke="${FK}" stroke-width="6"/><path d="M-180,-150 Q-150,0 -180,160" fill="none" stroke="#b04a72" stroke-width="6"/></g>`; }
  // candeeiro na mesinha
  o+=`<circle cx="140" cy="1180" r="320" fill="url(#lampG)"/><g stroke="${FK}" stroke-width="7" stroke-linejoin="round"><rect x="40" y="1330" width="200" height="200" rx="10" fill="url(#woodG)"/><path d="M60,1400 H220" stroke="#3a2412"/><circle cx="140" cy="1450" r="8" fill="#e8c27a"/><path d="M128,1330 V1220 H152 V1330 Z" fill="#c9b9a0"/><path d="M80,1230 L104,1120 H176 L200,1230 Z" fill="#ffd27a"/></g>`;
  // cabeceira da cama
  o+=`<g stroke="${FK}" stroke-width="10"><path d="M200,1500 V1160 Q200,1080 280,1080 H800 Q880,1080 880,1160 V1500 Z" fill="url(#woodG)"/></g>`;
  for(let k=0;k<5;k++) o+=`<path d="M${300+k*120},1110 V1480" stroke="#4a2e18" stroke-width="5" opacity=".6"/>`;
  o+=`<rect x="290" y="1290" width="500" height="160" rx="74" fill="#f3f0ea" stroke="${FK}" stroke-width="8"/><path d="M330,1330 q40,20 80,0 M640,1340 q40,20 80,0" stroke="#d8d2c6" stroke-width="6" fill="none"/>`;
  return o;
}
function cobertor(y){
  let o=`<path d="M40,${y+40} Q60,${y} 160,${y+6} Q540,${y-26} 920,${y+6} Q1020,${y} 1040,${y+40} L1060,1920 L20,1920 Z" fill="#c84b5a" stroke="${FK}" stroke-width="10"/>`;
  o+=`<path d="M60,${y+30} Q540,${y-6} 1020,${y+30} L1022,${y+80} Q540,${y+44} 58,${y+80} Z" fill="#f3f0ea" stroke="${FK}" stroke-width="6"/>`;
  for(let k=0;k<12;k++){ const sx=100+(k*173)%880, sy=y+140+(k*97)%220; o+=`<path d="M${sx},${sy-14} l4,10 l11,1 l-8,7 l3,11 l-10,-6 l-10,6 l3,-11 l-8,-7 l11,-1 Z" fill="#f6c3a0" opacity=".7"/>`; }
  o+=`<path d="M220,${y+110} q30,120 10,260 M820,${y+110} q-30,120 -10,260" fill="none" stroke="#9e3242" stroke-width="8"/>`;
  return o;
}
const vinheta=()=>`<rect width="1080" height="1920" fill="url(#vigQ)" stroke="none"/>`;

// ===== 1 · Corte da pele: as 6 agulhas a entrar (0 – 8,65) =====
// passos (tempo global): serram 0 · abrem 3,5 · saliva 4,78 · suga 6,11
FP.mq_corte=(t,dur)=>{
  const SY=900, VY=1430, cx=540, MY=715; // pele, vaso, boca
  const enter=ease(clamp(t/0.7,0,1)), happy=t>=6.11;
  const depth=SY+70+enter*300;
  let o=mqDefs()+`<defs><linearGradient id="airG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6ec"/><stop offset="1" stop-color="#f6d6ba"/></linearGradient><linearGradient id="derG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6b8aa"/><stop offset="1" stop-color="#d77a72"/></linearGradient><linearGradient id="vesG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e1f18"/><stop offset=".22" stop-color="#d2493c"/><stop offset=".6" stop-color="#b3322a"/><stop offset="1" stop-color="#6e140e"/></linearGradient><radialGradient id="rbcG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#a81f16"/><stop offset=".45" stop-color="#d93a2e"/><stop offset=".82" stop-color="#f45e4a"/><stop offset="1" stop-color="#c22f1e"/></radialGradient><radialGradient id="vigC" cx=".5" cy=".45" r=".78"><stop offset=".6" stop-color="#3a0d08" stop-opacity="0"/><stop offset="1" stop-color="#3a0d08" stop-opacity=".45"/></radialGradient><radialGradient id="redG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff3b3b" stop-opacity=".35"/><stop offset="1" stop-color="#ff3b3b" stop-opacity="0"/></radialGradient><clipPath id="mqHC"><ellipse cx="${cx}" cy="560" rx="200" ry="165"/></clipPath></defs>`;
  let s=`<rect width="1080" height="1920" fill="url(#airG)"/>`;
  for(let k=0;k<6;k++) s+=`<path d="M${120+k*180},0 L${40+k*180},${SY} L${130+k*180},${SY} Z" fill="#fff" opacity=".2"/>`;
  for(let k=0;k<16;k++){ const px=(k*157+t*18*(k%3+1))%1080, py=(k*97)%800+60+Math.sin(t+k)*10; s+=`<circle cx="${px}" cy="${py}" r="${2+k%3}" fill="#e2bd9c" opacity=".7"/>`; }
  // ---- pele em corte ----
  // epiderme com células
  s+=`<rect x="0" y="${SY}" width="1080" height="190" fill="#f3c19b"/>`;
  for(let r=0;r<5;r++) for(let c=0;c<21;c++){ const ex=c*56+(r%2?28:0), ey=SY+48+r*28; const bas=r>=3; s+=`<ellipse cx="${ex}" cy="${ey}" rx="25" ry="12" fill="${bas?'#ebae86':'#f7cfad'}" stroke="#d99a72" stroke-width="2.5"/><circle cx="${ex+3}" cy="${ey}" r="4" fill="${bas?'#9a5a3a':'#c08060'}"/>`; }
  // camada córnea a descamar
  s+=`<rect x="0" y="${SY}" width="1080" height="34" fill="#f5dcc0"/><path d="M0,${SY+10} H1080 M0,${SY+20} H1080 M0,${SY+29} H1080" stroke="#d9b08c" stroke-width="2.5" stroke-dasharray="70 10 40 8"/>`;
  for(let k=0;k<7;k++){ const fx=60+k*150; s+=`<path d="M${fx},${SY} q20,-16 46,-10 l-6,10 Z" fill="#f5dcc0" stroke="#c99a74" stroke-width="2"/>`; }
  s+=`<path d="M0,${SY} H1080" stroke="#a8704c" stroke-width="5"/>`;
  // derme com papilas onduladas
  const wav=(y0,A,P)=>{ let d=`M-20,${y0}`; let k=0; for(let x=-20;x<1100;x+=P/2,k++) d+=` Q${x+P/4},${y0+(k%2?A:-A)} ${x+P/2},${y0}`; return d; };
  s+=`<path d="${wav(SY+160,24,180)} L1100,1920 L-20,1920 Z" fill="url(#derG)" stroke="#c2766a" stroke-width="4"/>`;
  for(let k=0;k<17;k++){ const yy=SY+220+k*46; s+=`<path d="M-30,${yy} q90,${k%2?-22:22} 180,0 t180,0 t180,0 t180,0 t180,0 t180,0 t180,0" fill="none" stroke="#fcd6cc" stroke-width="5" opacity=".5"/>`; }
  for(let k=0;k<14;k++){ const fx=(k*173+40)%1080, fy=SY+230+(k*131)%560; s+=`<g transform="translate(${fx} ${fy}) rotate(${(k*37)%60-30})"><ellipse rx="18" ry="5" fill="#c66a62"/><circle r="3.5" fill="#7e3530"/></g>`; }
  // nervo
  s+=`<path d="M-20,${SY+330} C200,${SY+290} 300,${SY+400} 500,${SY+360} S820,${SY+300} 1100,${SY+350}" fill="none" stroke="#9e6e18" stroke-width="22"/><path d="M-20,${SY+330} C200,${SY+290} 300,${SY+400} 500,${SY+360} S820,${SY+300} 1100,${SY+350}" fill="none" stroke="#f0c552" stroke-width="13"/><path d="M300,${SY+372} q20,-60 70,-90 M760,${SY+322} q-10,-60 30,-100" fill="none" stroke="#f0c552" stroke-width="7"/>`;
  // folículos com pelos
  const pelo=(fx,ang)=>{ const bx=fx-40, by=SY+330; let r=`<path d="M${fx-26},${SY} L${bx-28},${by-10} Q${bx},${by+40} ${bx+28},${by-10} L${fx+26},${SY}" fill="#e8a48a" stroke="#b86e58" stroke-width="4"/><ellipse cx="${bx+34}" cy="${SY+150}" rx="26" ry="18" fill="#f6e2a8" stroke="#c9a85a" stroke-width="3"/><circle cx="${bx}" cy="${by}" r="20" fill="#7a4a30" stroke="${FK}" stroke-width="3"/>`;
    r+=`<path d="M${bx},${by} L${fx},${SY} Q${fx+ang*60},${SY-160} ${fx+ang*160},${SY-300}" fill="none" stroke="#2a1a12" stroke-width="16"/><path d="M${bx},${by} L${fx},${SY} Q${fx+ang*60},${SY-160} ${fx+ang*160},${SY-300}" fill="none" stroke="#6a4632" stroke-width="8"/>`; return r; };
  s+=pelo(150,-1)+pelo(950,1);
  // poro de suor
  s+=`<path d="M300,${SY} q-6,60 10,120 q20,40 -10,60 q-30,20 0,50 q30,20 0,40" fill="none" stroke="#d98e80" stroke-width="10"/><path d="M296,${SY-2} q4,-22 8,0" fill="#bfe8ff" stroke="#6aa8cc" stroke-width="3"/>`;
  // vermelhidão da picada (cresce com a saliva)
  const red=clamp((t-4.78)/1.2,0,1); s+=`<ellipse cx="${cx}" cy="${SY+140}" rx="${200+red*80}" ry="${150+red*40}" fill="url(#redG)" opacity="${.3+red*.7}"/>`;
  // canal rasgado no tecido
  s+=`<path d="M${cx},${SY} L${cx},${depth+20}" stroke="#8a1f18" stroke-width="${60*enter+6}" opacity=".22"/>`;
  // vaso sanguíneo
  s+=`<rect x="-20" y="${VY-80}" width="1120" height="160" fill="url(#vesG)" stroke="#5e100c" stroke-width="10"/><path d="M0,${VY-64} H1080 M0,${VY+64} H1080" stroke="#ef8a7a" stroke-width="5" stroke-dasharray="44 12" opacity=".7"/>`;
  for(let i=0;i<13;i++){ let x=((i*112+t*170)%1300)-110, y=VY+((i*37)%90)-45; if(happy&&Math.abs(x-cx)<160) y-=(1-Math.abs(x-cx)/160)*30*clamp((t-6.11)/.5,0,1);
    const ph=t*3+i*1.3, ry=Math.max(9,34*Math.abs(Math.cos(ph))); s+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(i*29)%50-25})"><ellipse rx="36" ry="${ry.toFixed(1)}" fill="url(#rbcG)" stroke="#6e140e" stroke-width="3"/><ellipse rx="13" ry="${(ry*.38).toFixed(1)}" fill="#9e1c14" opacity=".55"/><ellipse cx="-14" cy="${(-ry*.45).toFixed(1)}" rx="9" ry="${(ry*.15).toFixed(1)}" fill="#fff" opacity=".35"/></g>`; }
  { const wx=((t*170+600)%1300)-110; s+=`<g transform="translate(${wx} ${VY+20})"><circle r="30" fill="#f4efe6" stroke="#8a7a8a" stroke-width="3"/><path d="M-12,-6 q6,-12 14,-4 q10,-6 10,8 q-6,12 -16,4 q-12,4 -8,-8 Z" fill="#7a4aa0" opacity=".85"/></g>`; }
  // ---- mosquito de frente, por cima da pele ----
  const ph=Math.sin(t*70);
  // asas
  for(const d of [-1,1]) for(const [g,op] of [[-14,.25],[0,.6]]) s+=`<g transform="translate(${cx+d*150} 330) scale(${d*-1.7} 1.5)">${mqWing(-12+ph*20+g,op,1,0,0)}</g>`;
  // patas apoiadas na pele (+ traseiras levantadas)
  const leg=(p,far)=>`<path d="M${p[0]} L${p[1]} L${p[2]} L${p[3]}" fill="none" stroke="${MQK}" stroke-width="${far?12:15}"/><path d="M${p[1]} L${p[2]} L${p[3]}" fill="none" stroke="#f4f4f4" stroke-width="6" stroke-dasharray="10 18"/><circle cx="${p[1][0]}" cy="${p[1][1]}" r="11" fill="${MQK}"/><circle cx="${p[2][0]}" cy="${p[2][1]}" r="8" fill="${MQK}"/>`;
  for(const d of [-1,1]){ const X=v=>cx+d*v, w=Math.sin(t*4+d)*6;
    s+=leg([[X(150),360],[X(330),220+w],[X(470),150],[X(530),70+w]],1);
    s+=leg([[X(170),440],[X(360),380],[X(460),640],[X(472),SY-4]],0)+`<path d="M${X(472)},${SY-4} l${d*16},6 M${X(472)},${SY-4} l${-d*10},8" stroke="${MQK}" stroke-width="5"/>`;
    s+=leg([[X(130),640],[X(270),570+w],[X(330),770],[X(300),SY-4]],0)+`<path d="M${X(300)},${SY-4} l${d*16},6 M${X(300)},${SY-4} l${-d*10},8" stroke="${MQK}" stroke-width="5"/>`; }
  // tórax (atrás da cabeça)
  s+=`<ellipse cx="${cx}" cy="330" rx="215" ry="125" fill="url(#mqBody)" stroke="${MQK}" stroke-width="8"/><path d="M${cx-60},250 C${cx-120},300 ${cx-110},380 ${cx-60},420 M${cx+60},250 C${cx+120},300 ${cx+110},380 ${cx+60},420 M${cx-10},240 V410 M${cx+10},240 V410" fill="none" stroke="#f2f2f2" stroke-width="7"/><ellipse cx="${cx}" cy="260" rx="120" ry="24" fill="#fff" opacity=".18"/>`;
  for(let k=0;k<14;k++){ const hx=cx-180+k*28; s+=`<path d="M${hx},${250-Math.sqrt(Math.max(0,1-((hx-cx)/215)**2))*110+20} l${(hx-cx)*.08},-20" stroke="${MQK}" stroke-width="3"/>`; }
  // cabeça
  s+=`<ellipse cx="${cx}" cy="560" rx="200" ry="165" fill="url(#mqBody)" stroke="${MQK}" stroke-width="9"/>`;
  s+=`<path d="M${cx-50},410 q50,-26 100,0 M${cx-30},430 q30,-14 60,0" fill="none" stroke="#f2f2f2" stroke-width="6"/>`;
  // antenas
  for(const d of [-1,1]){ const x0=cx+d*48, y0=432, x1=cx+d*200, y1=170; s+=`<circle cx="${x0}" cy="${y0}" r="22" fill="#3a3a48" stroke="${MQK}" stroke-width="6"/><path d="M${x0},${y0} Q${cx+d*110},${300} ${x1},${y1}" fill="none" stroke="${MQK}" stroke-width="7"/>`;
    for(let k=1;k<=8;k++){ const u=k/9, px=(1-u)*(1-u)*x0+2*u*(1-u)*(cx+d*110)+u*u*x1, py=(1-u)*(1-u)*y0+2*u*(1-u)*300+u*u*y1; s+=`<path d="M${px-14},${py-4} L${px+14},${py+4} M${px-12},${py+9} L${px+12},${py-9}" stroke="${MQK}" stroke-width="2.5"/>`; } }
  // olhos compostos
  let e='';
  for(const d of [-1,1]){ const ex=cx+d*100, ey=545; e+=`<ellipse cx="${ex}" cy="${ey}" rx="100" ry="118" fill="url(#mqEye)" stroke="${MQK}" stroke-width="6"/><ellipse cx="${ex}" cy="${ey}" rx="98" ry="116" fill="url(#mqHex)"/>`;
    if(happy){ e+=`<path d="M${ex-104},${ey+14} Q${ex},${ey-96} ${ex+104},${ey+14} L${ex+104},${ey+140} L${ex-104},${ey+140} Z" fill="${MQB}"/><path d="M${ex-96},${ey+10} Q${ex},${ey-88} ${ex+96},${ey+10}" fill="none" stroke="${MQK}" stroke-width="12"/><ellipse cx="${ex-30}" cy="${ey-46}" rx="22" ry="12" fill="#fff" opacity=".8"/><ellipse cx="${ex+d*10}" cy="${ey+70}" rx="40" ry="18" fill="#ff7aa0" opacity=".55"/>`; }
    else { e+=`<circle cx="${ex-d*22}" cy="${ey+18}" r="46" fill="url(#mqIris)"/><circle cx="${ex-d*22}" cy="${ey+18}" r="13" fill="#1a0306"/><ellipse cx="${ex-34}" cy="${ey-56}" rx="26" ry="15" fill="#fff" opacity=".85"/><circle cx="${ex+30}" cy="${ey+60}" r="8" fill="#fff" opacity=".6"/>`; } }
  s+=`<g clip-path="url(#mqHC)">${e}</g><ellipse cx="${cx}" cy="560" rx="200" ry="165" fill="none" stroke="${MQK}" stroke-width="9"/>`;
  if(!happy) s+=`<path d="M${cx-205},430 L${cx-26},494 L${cx-30},520 L${cx-200},462 Z M${cx+205},430 L${cx+26},494 L${cx+30},520 L${cx+200},462 Z" fill="${MQK}"/>`;
  s+=happy?`<path d="M${cx-34},676 q34,30 68,0" fill="none" stroke="${MQK}" stroke-width="9"/>`:`<path d="M${cx-34},690 q34,-20 68,0" fill="none" stroke="${MQK}" stroke-width="9"/>`;
  // palpos
  for(const d of [-1,1]) s+=`<path d="M${cx+d*30},${MY-10} Q${cx+d*60},${MY+40} ${cx+d*72},${MY+110}" fill="none" stroke="${MQK}" stroke-width="20"/><path d="M${cx+d*68},${MY+86} L${cx+d*72},${MY+110}" stroke="#f4f4f4" stroke-width="12"/>`;
  // lábio (bainha) que se dobra enquanto as agulhas entram
  const bow=40+enter*150; const lab=`M${cx-10},${MY} Q${cx-10-bow},${(MY+SY)/2} ${cx-8},${SY-6}`;
  s+=`<path d="${lab}" fill="none" stroke="${MQK}" stroke-width="30"/><path d="${lab}" fill="none" stroke="#4a4a5a" stroke-width="16"/><path d="${lab}" fill="none" stroke="#f4f4f4" stroke-width="16" stroke-dasharray="0 120 26 400"/><ellipse cx="${cx-8}" cy="${SY-8}" rx="22" ry="12" fill="#3a3a48" stroke="${MQK}" stroke-width="5"/>`;
  // ---- as 6 agulhas ----
  const saw=t<3.5?Math.sin(t*22)*16:0, open=ease(clamp((t-3.5)/0.5,0,1))*60;
  const C={o:'#ff8a2a',b:'#3fa4ff',g:'#3fd47a',p:'#ff4fa0'};
  const S=[ // off, fim x, fim y, cor, largura, tipo, lado
    [-15,cx-75,depth+saw,C.o,18,'serra',-1],[15,cx+75,depth-saw,C.o,18,'serra',1],
    [-9,cx-34-open*1.6,depth-16,C.b,16,'gancho',-1],[9,cx+34+open*1.6,depth-16,C.b,16,'gancho',1],
    [-3,cx-14,depth-34,C.g,13,'',0],[3,cx+8,Math.min(VY-50,depth+55),C.p,24,'tubo',0]];
  // feixe acima da pele (fino, junto)
  for(const [off,,,col] of S) s+=`<path d="M${cx+off*1.1},${MY+6} L${cx+off*1.1},${SY}" stroke="${FK}" stroke-width="9"/>`;
  for(const [off,,,col] of S) s+=`<path d="M${cx+off*1.1},${MY+6} L${cx+off*1.1},${SY}" stroke="${col}" stroke-width="5"/>`;
  // abaixo da pele (grossas, abertas em leque)
  for(const [off,ex,ey,col,w,kind,side] of S){ const sx=cx+off*1.4, P=`M${sx},${SY} L${ex.toFixed(1)},${ey.toFixed(1)}`;
    s+=`<path d="${P}" stroke="${FK}" stroke-width="${w+9}"/><path d="${P}" stroke="${col}" stroke-width="${w}"/><path d="M${sx-w*.22},${SY+4} L${(ex-w*.22).toFixed(1)},${(ey-6).toFixed(1)}" stroke="#fff" stroke-width="${Math.max(2.5,w*.22)}" opacity=".5"/>`;
    const L=Math.hypot(ex-sx,ey-SY), dx=(ex-sx)/L, dy=(ey-SY)/L, nx=-dy*side, ny=dx*side;
    if(kind==='serra') for(let k=0;k<6;k++){ const bx=ex-dx*(10+k*15), by=ey-dy*(10+k*15); s+=`<path d="M${(bx+nx*w*.4).toFixed(1)},${(by+ny*w*.4).toFixed(1)} l${(nx*14-dx*8).toFixed(1)},${(ny*14-dy*8).toFixed(1)} l${(dx*12).toFixed(1)},${(dy*12).toFixed(1)} Z" fill="${col}" stroke="${FK}" stroke-width="3"/>`; }
    if(kind==='gancho') s+=`<path d="M${ex.toFixed(1)},${ey.toFixed(1)} q${side*-6},22 ${side*-26},18" fill="none" stroke="${FK}" stroke-width="${w}"/><path d="M${ex.toFixed(1)},${ey.toFixed(1)} q${side*-6},22 ${side*-26},18" fill="none" stroke="${col}" stroke-width="${w-7}"/>`;
    if(kind==='tubo'){ s+=`<path d="${P}" stroke="#8a1040" stroke-width="${w*.34}"/>`;
      if(happy){ s+=`<path d="${P}" stroke="#fff" stroke-width="${w}" stroke-dasharray="14 14" opacity=".9"/>`;
        const lv=ease(clamp((t-6.11)/1.4,0,1)); const up=`M${ex.toFixed(1)},${ey.toFixed(1)} L${sx},${SY} L${cx+3.3},${MY+6}`;
        s+=`<path d="${up}" fill="none" stroke="#d1281e" stroke-width="${w*.4}" pathLength="1" stroke-dasharray="${lv.toFixed(3)} 2"/>`;
        for(let k=0;k<4;k++){ const p=((t*2.2+k*.25)%1); s+=`<circle cx="${(ex+(1-p)*(k%2?40:-40)).toFixed(1)}" cy="${(ey+20+(1-p)*40).toFixed(1)}" r="${(9*(1-p)+3).toFixed(1)}" fill="#e0483a" stroke="#6e140e" stroke-width="2"/>`; } } } }
  // saliva
  if(t>=4.78&&t<6.4) for(let i=0;i<6;i++){ const p=((t*1.4+i/6)%1), gx=cx-14+Math.sin(i*2.3)*(30+p*70), gy=depth-30+p*90; s+=`<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="${(18-p*8).toFixed(1)}" fill="#7fffb0" stroke="#1f7a4a" stroke-width="3" opacity="${(1-p*.6).toFixed(2)}"/><circle cx="${(gx-5).toFixed(1)}" cy="${(gy-5).toFixed(1)}" r="4" fill="#fff" opacity=".7"/>`; }
  // pequeno tremor na entrada
  const sh=t<0.7?Math.sin(t*90)*5*(1-t/0.7):0;
  const z=1.14-0.14*ease(clamp(t/2.6,0,1));
  o+=`<g transform="translate(${540+sh} 1000) scale(${z}) translate(-540 -1000)">${s}</g><rect width="1080" height="1920" fill="url(#vigC)"/>`;
  // etiquetas com seta
  const tag=(txt,col,x,y,px,py)=>`<path d="M${x},${y} L${px},${py}" stroke="${FK}" stroke-width="10"/><path d="M${x},${y} L${px},${py}" stroke="#fff" stroke-width="4"/><circle cx="${px}" cy="${py}" r="9" fill="#fff" stroke="${FK}" stroke-width="4"/><g transform="translate(${x} ${y})"><rect x="-128" y="-30" width="256" height="76" rx="18" fill="#000" opacity=".25"/><rect x="-124" y="-38" width="248" height="76" rx="18" fill="${col}" stroke="${FK}" stroke-width="6"/><text x="0" y="14" font-family="M" font-weight="900" font-size="44" fill="#fff" text-anchor="middle" stroke="${FK}" stroke-width="6" paint-order="stroke fill">${txt}</text></g>`;
  if(t>=2.47&&t<3.5) o+=tag('SERRAM','#ff8a2a',230,1140,cx-62,depth-30);
  if(t>=3.5&&t<4.78) o+=tag('ABREM','#3fa4ff',860,1140,cx+60+open*1.4,depth-40);
  if(t>=4.78&&t<6.11) o+=tag('SALIVA','#2f9e6e',230,1140,cx-16,depth-20);
  if(happy) o+=ono('SLURP!',830,780,t,6.3,'#ff4fa0',8,110);
  // contador das 6 agulhas
  const n=t<3.5?2:t<4.78?4:t<6.11?5:6, cols=[C.o,C.o,C.b,C.b,C.g,C.p];
  o+=`<g transform="translate(540 1610)"><rect x="-230" y="-58" width="460" height="116" rx="58" fill="${FK}" opacity=".85"/>${cols.map((c,k)=>`<path d="M${-180+k*46},-30 L${-180+k*46},22 L${-186+k*46},10" stroke="${k<n?c:'#ffffff30'}" stroke-width="14" stroke-linecap="round" fill="none"/>`).join('')}<text x="150" y="20" font-family="M" font-weight="900" font-size="56" fill="#fff" text-anchor="middle">${n}/6</text></g>`;
  return o+hookMq(t,2.47)+(t>2.47?fPill('FATO 1/2',t-2.47):'');
};

// ===== 2 · Buffet (8,65 – 13,7) local: 0,2 "tem gente…"; 2,81 "não é azar… é o seu cheiro"
FP.mq_buffet=(t,dur)=>{
  let o=mqDefs()+quarto(t);
  const sh=t>2.81;
  if(sh) for(let i=0;i<6;i++){ const ph=(t*.8+i/6)%1; o+=`<path d="M${380+i*64},${1180-ph*520} q34,-40 0,-80 q-34,-40 0,-80" fill="none" stroke="#1f6a2a" stroke-width="18" opacity="${(1-ph)*.6}"/><path d="M${380+i*64},${1180-ph*520} q34,-40 0,-80 q-34,-40 0,-80" fill="none" stroke="#7fe08a" stroke-width="9" opacity="${1-ph}"/>`; }
  const bites=Math.floor(clamp((t-0.6)/2.4,0,1)*8);
  o+=`<g transform="translate(${!sh?Math.sin(t*40)*5:0} 0)">`+pessoaD(540,1250,1.35,{mood:t>0.3&&!sh?'choque':sh?'triste':'normal',bites,t})+`</g>`;
  o+=cobertor(1560);
  // placa BUFFET com lâmpadas
  o+=`<g transform="translate(540 1650) rotate(${Math.sin(t*2)*2})"><path d="M-220,-110 L-180,-150 M220,-110 L180,-150" stroke="#c9b9a0" stroke-width="6"/><rect x="-312" y="-96" width="624" height="200" rx="22" fill="#000" opacity=".3"/><rect x="-310" y="-104" width="620" height="200" rx="22" fill="#fffaf0" stroke="${FK}" stroke-width="10"/><rect x="-286" y="-80" width="572" height="152" rx="14" fill="none" stroke="#e0483a" stroke-width="5"/>`;
  for(let k=0;k<22;k++){ const per=1640, d=(k/22)*per; let bx,by; if(d<620){bx=-310+d;by=-104;} else if(d<820){bx=310;by=-104+(d-620);} else if(d<1440){bx=310-(d-820);by=96;} else {bx=-310;by=96-(d-1440);} const on=(Math.floor(t*8)+k)%2===0; o+=`<circle cx="${bx}" cy="${by}" r="11" fill="${on?'#ffe36a':'#b08a2a'}" stroke="${FK}" stroke-width="3"/>${on?`<circle cx="${bx}" cy="${by}" r="20" fill="#ffe36a" opacity=".3"/>`:''}`; }
  o+=`<text x="0" y="-12" font-family="M" font-weight="900" font-size="82" fill="#e0483a" text-anchor="middle" stroke="${FK}" stroke-width="5" paint-order="stroke fill">BUFFET LIVRE</text><text x="0" y="58" font-family="M" font-weight="900" font-size="46" fill="${FK}" text-anchor="middle">🍽 ABERTO 24H</text></g>`;
  // fila de mosquitos de babete
  for(let i=0;i<6;i++){ const k=ease(clamp((t-0.2-i*.2)/1.0,0,1)); const a=-2.5+i*0.5, R=430; const tx=540+Math.cos(a)*R, ty=1170+Math.sin(a)*R*0.85; const sx=1300+i*80, sy=700; const xx=sx+(tx-sx)*k, yy=sy+(ty-sy)*k;
    o+=mosqD(xx,yy+Math.sin(t*8+i)*14,.44,t+i,{look:'feliz',napkin:true,flip:xx>540}); }
  o+=vinheta();
  const n=Math.round(clamp((t-0.6)/1.8,0,1)*100); o+=`<g transform="translate(540 530)">${fTxt(0,0,'ATÉ '+n+'×',140,FY)}${fTxt(0,84,'MAIS MOSQUITO',64,'#fff')}</g>`;
  return o+fPill('FATO 2/2',t);
};
// ===== 3 · Não muda por anos + "sinto muito" (13,7 – 16,7) local: 0,14 anos; 1,99 sinto muito
FP.mq_sinto=(t,dur)=>{
  let o=mqDefs()+quarto(t,{cal:true});
  // calendário de arrancar folhas
  const idx=Math.min(3,Math.floor(Math.max(0,t-0.2)/0.4)), yr=2024+idx, tt=Math.max(0,t-0.2)-idx*0.4;
  o+=`<g transform="translate(540 600) rotate(-3)" stroke="${FK}" stroke-linejoin="round"><rect x="-226" y="-176" width="452" height="372" rx="26" fill="#000" opacity=".3" stroke="none"/><rect x="-220" y="-180" width="440" height="360" rx="24" fill="#fffaf0" stroke-width="10"/><path d="M-200,170 H200 M-204,160 H204" stroke="#d8d2c6" stroke-width="4"/><rect x="-220" y="-180" width="440" height="90" rx="24" fill="#e0483a" stroke-width="10"/><text x="0" y="-118" font-family="M" font-weight="900" font-size="36" fill="#fff" text-anchor="middle" stroke="none" dy="14">SEU CHEIRO EM</text>`;
  for(const rx of [-120,120]) o+=`<rect x="${rx-14}" y="-210" width="28" height="70" rx="14" fill="#c9d1d6" stroke-width="6"/>`;
  o+=`<text x="0" y="80" font-family="M" font-weight="900" font-size="130" fill="${FK}" text-anchor="middle" stroke="none">${yr}</text>`;
  if(idx>0&&tt<0.35){ const k=tt/0.35; o+=`<g transform="translate(${k*700} ${-k*260}) rotate(${k*80})" opacity="${1-k}"><rect x="-220" y="-90" width="440" height="270" fill="#fffaf0" stroke-width="8"/><text x="0" y="80" font-family="M" font-weight="900" font-size="130" fill="${FK}" text-anchor="middle" stroke="none">${yr-1}</text></g>`; }
  o+=`</g>`;
  o+=`<g transform="translate(540 880)">${fTxt(0,0,'CHEIRO: IGUAL',84,'#7fe08a')}</g>`;
  for(let i=0;i<5;i++){ const ph=(t*.7+i/5)%1; o+=`<path d="M${400+i*70},${1160-ph*180} q30,-30 0,-60 q-30,-30 0,-60" fill="none" stroke="#7fe08a" stroke-width="8" opacity="${(1-ph)*.8}"/>`; }
  o+=pessoaD(540,1250,1.3,{mood:'triste',bites:8,t});
  o+=cobertor(1560);
  if(t>1.99){ const pat=Math.abs(Math.sin((t-1.99)*10))*18; o+=mosqD(780,1080-pat,.52,t,{look:'triste',flip:true,full:1}); }
  o+=vinheta();
  return o+fPill('FATO 2/2',t);
};
// ===== 4 · Fim ≤2 s com movimento + loop
FP.mq_fim=(t,dur)=>{
  if(t>dur-.25) return FP.mq_corte(0.05,8.65);
  let o=mqDefs()+fBg(t,'#2a2470','#0b0a2a',1000);
  for(let k=0;k<20;k++){ const sx=(k*151)%1080, sy=(k*263)%1920; o+=`<circle cx="${sx}" cy="${sy}" r="${2+k%3}" fill="#fff" opacity="${.15+.3*Math.abs(Math.sin(t*3+k))}"/>`; }
  const k=pop(t,0); o+=`<g transform="translate(540 640) scale(${k})">${fTxt(0,0,'MARCA QUEM É',104,'#fff')}${fTxt(0,125,'O BUFFET DOS',104,FY)}${fTxt(0,250,'MOSQUITOS 😂',104,FY)}</g>`;
  for(let i=0;i<3;i++){ const mx=540+Math.sin(t*4+i*2)*330, vx=Math.cos(t*4+i*2); o+=mosqD(mx, 1250+Math.cos(t*5+i)*140, .58, t+i, {look:'feliz',napkin:true,flip:vx<0,full:.6}); }
  if(t>0.5){ const p=pop(t,0.5); o+=`<g transform="translate(540 1600) scale(${p})"><rect x="-414" y="-67" width="840" height="150" rx="75" fill="#000" opacity=".3"/><rect x="-420" y="-75" width="840" height="150" rx="75" fill="${FY}" stroke="${FK}" stroke-width="8"/><text x="0" y="-8" font-family="M" font-weight="900" font-size="54" fill="${FK}" text-anchor="middle" stroke="none">SEGUE · AMANHÃ</text><text x="0" y="52" font-family="M" font-weight="900" font-size="46" fill="#e0483a" text-anchor="middle" stroke="none">TEM MAIS 2 FATOS</text></g>`; }
  return o;
};
