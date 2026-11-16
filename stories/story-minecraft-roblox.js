// Story Minecraft vs Roblox — espaço livre no MEIO (y≈770–1170) para o autocolante do link
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=fBg(t,'#2a2470','#0b0a2a',960);
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 200) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,390,'MINECRAFT OU',84,'#fff')+fTxt(540,505,'ROBLOX?',120,FY,'middle',16);
  const by=8*Math.sin(t*6);
  o+=fTxt(540,650,'TOCA NO LINK',58,'#fff')+'<path d="M540,'+(680+by)+' v50 m-28,-28 l28,28 l28,-28" fill="none" stroke="'+FY+'" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>';
  // zona do link: vazia de propósito (770–1170)
  o+='<rect x="0" y="1200" width="540" height="720" fill="#2fa860" opacity=".3"/><rect x="540" y="1200" width="540" height="720" fill="#e0483a" opacity=".3"/>';
  o+=mrCubo(270,1420,110,'#6fcf5a','#7a5230','#5e3e22')+mrBoneco(810,1640,2.3,'#e0483a',t);
  o+='<g transform="translate(540 1480)"><circle r="70" fill="'+FK+'" stroke="'+FY+'" stroke-width="6"/><text y="24" font-family="M" font-weight="900" font-size="60" fill="'+FY+'" text-anchor="middle">VS</text></g>';
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210; fs.mkdirSync(`${process.argv[2]}/storymr`,{recursive:true});
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storymr/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
