// Story do carrossel #02 (espaço) — espaço livre no MEIO (y≈770–1170) para o autocolante do link
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const g=fs.readFileSync(__dirname+'/../carrosseis/02-espaco/gerar.js','utf8');
const lib=g.slice(g.indexOf('const lib=String.raw`')+21, g.indexOf('\n`;\nconst S'));
const frame=`function F(t){
  let o=defs()+'<g transform="translate(0 -60) scale(1 1.36)">'+ceu(1)+'</g>';
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 200) scale('+k+')"><rect x="-250" y="-55" width="500" height="110" rx="55" fill="#e0483a" stroke="#0a1633" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="62" fill="#fff" text-anchor="middle">POST NOVO!</text></g>';
  o+=fTxt(540,380,'2 FATOS DO ESPAÇO',82,'#fff')+fTxt(540,490,'QUE PARECEM MENTIRA',66,CY,'middle',14);
  const by=8*Math.sin(t*6);
  o+=fTxt(540,640,'TOCA NO LINK',58,'#fff')+'<path d="M540,'+(670+by)+' v50 m-28,-28 l28,28 l28,-28" fill="none" stroke="'+YL+'" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>';
  // zona do link vazia (770–1170)
  const vb=8*Math.sin(t*2.2);
  o+=venus(250,1400+vb,150,'o')+relogio(420,1250+vb,.55,t*.4,t*4.8);
  const sb=6*Math.sin(t*2.6+1);
  o+=banheira(760,1520,.62)+saturno(760,1450+sb,110,-10+3*Math.sin(t*1.6),'smile')+aguaFrente(760,1505,.62)+espuma(760,1500,.62,2)+patinho(920+6*Math.sin(t*3),1482,.45,-1);
  for(let i=0;i<6;i++){ const p=((t*.35+i/6)%1); o+='<circle cx="'+(620+i*45+10*Math.sin(t*2+i))+'" cy="'+(1440-p*260)+'" r="'+(8+i%3*5)+'" fill="url(#bolha)" stroke="#bfe9ff" stroke-width="2.5" opacity="'+(1-p)+'"/>'; }
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art};${lib}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210; fs.mkdirSync(`${process.argv[2]}/storyesp`,{recursive:true});
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storyesp/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
