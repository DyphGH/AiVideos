// HUD e legenda comuns (estilo referência)
function hud(dia=30, divida=87400, total=87400){
  const fmt=n=>'R$ '+n.toLocaleString('pt-BR');
  const box=(x,w,label,val,color,pct)=>`<rect x="${x}" y="40" width="${w}" height="140" rx="20" fill="#232a4d" stroke="#3b4472" stroke-width="6"/>
  <text x="${x+24}" y="86" font-size="${pct==null?30:34}" fill="#c9cde6" stroke="none" letter-spacing="1">${label}</text>
  ${pct==null?`<text x="${x+w/2}" y="164" font-size="74" fill="${color}" text-anchor="middle" stroke="none">${val}</text>`:`<text x="${x+w-24}" y="96" font-size="58" fill="${color}" text-anchor="end" stroke="none">${val}</text>
  <rect x="${x+24}" y="118" width="${w-48}" height="34" rx="17" fill="#141831" stroke="#3b4472" stroke-width="4"/><rect x="${x+28}" y="122" width="${Math.max(26,(w-56)*pct)}" height="26" rx="13" fill="#e0483a" stroke="none"/><circle cx="${x+40}" cy="135" r="11" fill="#ff8a7a" stroke="none"/>`}`;
  return `<g font-family="A" stroke="#2b1d16">${box(30,270,'DIAS RESTANTES',String(dia),'#f2c230',null)}${box(320,730,'DÍVIDA',fmt(divida),'#ff5a4a',divida/total)}</g>`;
}
function legenda(parts, y=1250, size=150){
  // parts: [['O ','#fff'],['NANDO','#4cc3f0']]
  return `<g font-family="A" font-size="${size}" text-anchor="middle" stroke="#1b1420" stroke-width="22" paint-order="stroke fill"><text x="540" y="${y}">${parts.map(([t,c])=>`<tspan fill="${c}">${t}</tspan>`).join('')}</text></g>`;
}
