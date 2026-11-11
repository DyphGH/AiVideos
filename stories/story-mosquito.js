const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  for(let k=0;k<20;k++){ o+='<circle cx="'+((k*151)%1080)+'" cy="'+((k*263)%1920)+'" r="'+(2+k%3)+'" fill="#fff" opacity="'+(.15+.3*Math.abs(Math.sin(t*3+k)))+'"/>'; }
  // janela com o corte da pele (as agulhas a entrar)
  const ct=t%6.9;
  o+='<defs><clipPath id="stC"><rect x="130" y="610" width="820" height="900" rx="40"/></clipPath></defs>';
  o+='<rect x="138" y="622" width="820" height="900" rx="40" fill="#000" opacity=".35"/>';
  o+='<g clip-path="url(#stC)"><g transform="translate(130 610) scale(.82) translate(-40 -400)">'+FP.mq_corte(ct,8.65)+'</g></g>';
  o+='<rect x="130" y="610" width="820" height="900" rx="40" fill="none" stroke="'+FK+'" stroke-width="12"/><rect x="130" y="610" width="820" height="900" rx="40" fill="none" stroke="'+FY+'" stroke-width="5"/>';
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 200) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,390,'QUANTAS AGULHAS',88,'#fff')+fTxt(540,505,'O MOSQUITO USA?',92,FY);
  const by=10*Math.sin(t*6);
  o+=fTxt(540,1760,'VÊ O VÍDEO NOVO',66,'#fff')+'<path d="M540,'+(1790+by)+' v60 m-32,-32 l32,32 l32,-32" fill="none" stroke="'+FY+'" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210;
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storym/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
