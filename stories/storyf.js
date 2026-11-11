const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  const wob=Math.sin(t*3)*1.2;
  o+='<g transform="translate(540 1060) rotate('+wob+') scale(.7) translate(-540 -900)">';
  o+='<path d="M540,420 L1060,1360 L20,1360 Z" fill="'+FY+'" stroke="'+FK+'" stroke-width="16" stroke-linejoin="round"/>'+olhoIcon(540,800,.85,false);
  const SZ=82,l1=linhaPal(['UM','PASSEIO','NO'],540,SZ),l2=linhaPal(['NO','PARQUE'],540,SZ);
  const ws=[...l1.map(p=>({...p,y:1185})),...l2.map(p=>({...p,y:1295}))];
  const rev=t>=2.08;
  ws.forEach((p,i)=>{const r=rev&&(i===2||i===3); o+='<text x="'+p.c+'" y="'+p.y+'" font-family="M" font-weight="900" font-size="'+SZ+'" fill="'+(r?'#e0483a':FK)+'" text-anchor="middle">'+p.w+'</text>'; if(r){const k=ease((t-2.08)/.3); o+='<ellipse cx="'+p.c+'" cy="'+(p.y-22)+'" rx="'+((p.wd/2+26)*k)+'" ry="'+(52*k)+'" fill="none" stroke="#e0483a" stroke-width="10"/>';}});
  o+='</g>';
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 260) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,420,'LÊ EM VOZ ALTA',96,'#fff')+fTxt(540,530,'RÁPIDO!',110,FY);
  if(t>=2.08) o+=fStamp(t,2.08,540,1490,'ERROU? 😏','#e0483a',90,-6);
  o+='<rect x="0" y="1410" width="1080" height="510" fill="#0b0a2a" opacity=".55"/>';
  const by=(t>=4.2?22:10)*Math.sin(t*(t>=4.2?9:5));
  o+=fTxt(540,1650,'VÊ O VÍDEO NOVO',66,'#fff')+'<path d="M540,'+(1680+by)+' v70 m-36,-36 l36,36 l36,-36" fill="none" stroke="'+FY+'" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
for(let i=0;i<200;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storyf/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
