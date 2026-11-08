// Cenários reutilizáveis (estilo referência: parede creme, azulejo, chão)
function interior({wall='#f3e6c4', tile='#2f9e6e', tileLine='#5ec393', floor='#b4523b', floorLine='#9a4331', tileTop=1110, floorTop=1470}={}){
  let o=`<rect x="0" y="0" width="1080" height="${tileTop}" fill="${wall}" stroke="none"/>`;
  o+=`<rect x="0" y="${tileTop}" width="1080" height="${floorTop-tileTop}" fill="${tile}" stroke="none"/>`;
  for(let x=0;x<=1080;x+=72) o+=`<path d="M${x},${tileTop} V${floorTop}" stroke="${tileLine}" stroke-width="4"/>`;
  for(let y=tileTop;y<=floorTop;y+=72) o+=`<path d="M0,${y} H1080" stroke="${tileLine}" stroke-width="4"/>`;
  o+=`<path d="M0,${tileTop} H1080" stroke-width="7"/>`;
  o+=`<rect x="0" y="${floorTop}" width="1080" height="${1920-floorTop}" fill="${floor}" stroke="none"/>`;
  for(let y=floorTop+70;y<1920;y+=70) o+=`<path d="M0,${y} H1080" stroke="${floorLine}" stroke-width="5"/>`;
  for(let y=floorTop,i=0;y<1920;y+=70,i++) for(const x of (i%2?[180,560,900]:[340,720])) o+=`<path d="M${x},${y} v70" stroke="${floorLine}" stroke-width="4"/>`;
  o+=`<path d="M0,${floorTop} H1080" stroke-width="7"/>`;
  return o;
}
function sepiaDefs(){return `<filter id="sepia"><feColorMatrix type="matrix" values="0.39 0.77 0.19 0 0  0.35 0.69 0.17 0 0  0.27 0.53 0.13 0 0  0 0 0 1 0"/></filter>
<radialGradient id="vig" cx=".5" cy=".5" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#2b1a0e" stop-opacity=".65"/></radialGradient>`;}
// Corsa C (lateral), origem = centro, rodas em y=0
function corsa({x=540,y=1200,s=1,dusty=true,tag=true}={}){
  let o='';
  const B=`M-330,-20 Q-342,-74 -326,-104 L-306,-134 Q-292,-154 -242,-164 L-162,-176 Q-122,-214 -72,-252 Q-30,-282 38,-288 L178,-288 Q230,-286 254,-252 Q278,-214 290,-164 L298,-114 Q308,-64 294,-20 Z`;
  o+=`<path d="${B}" fill="#4fb3a0"/>`;
  o+=`<path d="M-142,-174 Q-102,-214 -58,-246 Q-26,-268 26,-272 L48,-272 L48,-174 Z" fill="#bfe3ea"/><path d="M66,-272 L168,-272 Q210,-268 228,-238 L244,-194 L248,-174 L66,-174 Z" fill="#bfe3ea"/>`;
  o+=`<path d="M58,-268 V-26" stroke-width="6"/><rect x="70" y="-150" width="42" height="12" rx="6" fill="#c9d1d6" stroke-width="4"/>`;
  o+=`<path d="M-326,-96 H292" stroke="${INK}" stroke-width="16"/><path d="M-326,-96 H292" stroke="#6b7479" stroke-width="7"/>`;
  o+=`<path d="M-324,-128 Q-302,-154 -250,-158 L-246,-130 Q-292,-124 -324,-114 Z" fill="#fff6d8"/><path d="M288,-184 Q302,-154 300,-114 L276,-118 L270,-178 Z" fill="#e0483a"/>`;
  for(const wx of [-200,180]){ o+=`<path d="M${wx-80},-20 Q${wx-76},-104 ${wx},-108 Q${wx+76},-104 ${wx+80},-20 Z" fill="#1d1612"/><circle cx="${wx}" cy="-6" r="66" fill="#2a2522"/><circle cx="${wx}" cy="-6" r="38" fill="#d6dde1" stroke-width="6"/><circle cx="${wx}" cy="-6" r="10" fill="#6b7479" stroke-width="4"/>`; }
  if(dusty){ o+=`<path d="M-60,-286 Q60,-300 190,-286 L188,-274 Q60,-286 -56,-272 Z" fill="#efe3c6" stroke="none" opacity=".85"/>`;
    for(let i=0;i<40;i++){const a=-300+((i*53)%560), b=-250+((i*37)%220); o+=`<circle cx="${a}" cy="${b}" r="3" fill="#efe3c6" stroke="none" opacity=".6"/>`;}
    o+=`<text x="158" y="-212" font-family="PM" font-size="28" fill="#fff" stroke="none" opacity=".85" transform="rotate(-6 158 -212)" text-anchor="middle">ME LAVA</text>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${o}</g>`;
}
// Carro antigo (anos 80/90), origem = centro, rodas em y=0
function carroVelho({x=540,y=1200,s=1,color='#c8402f'}={}){
  let o='';
  o+=`<path d="M-320,-20 L-322,-100 Q-320,-130 -290,-136 L-180,-150 L-120,-250 Q-110,-266 -88,-266 L120,-266 Q140,-266 152,-250 L220,-150 L300,-140 Q326,-134 326,-104 L324,-20 Z" fill="${color}"/>`;
  o+=`<path d="M-106,-156 L-64,-244 L10,-244 L10,-156 Z M30,-156 L30,-244 L112,-244 L170,-156 Z" fill="#bfe3ea"/>`;
  o+=`<path d="M20,-262 V-30" stroke-width="6"/><rect x="40" y="-130" width="40" height="12" rx="6" fill="#c9d1d6" stroke-width="4"/>`;
  o+=`<rect x="-330" y="-60" width="70" height="30" rx="6" fill="#c9d1d6"/><rect x="262" y="-60" width="70" height="30" rx="6" fill="#c9d1d6"/>`;
  o+=`<rect x="-322" y="-126" width="40" height="28" rx="6" fill="#fff6d8"/><rect x="300" y="-126" width="22" height="34" rx="4" fill="#f6c744"/>`;
  for(const wx of [-190,190]){ o+=`<path d="M${wx-80},-20 Q${wx-76},-100 ${wx},-104 Q${wx+76},-100 ${wx+80},-20 Z" fill="#1d1612"/><circle cx="${wx}" cy="-6" r="62" fill="#2a2522"/><circle cx="${wx}" cy="-6" r="32" fill="#d6dde1" stroke-width="6"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${o}</g>`;
}
