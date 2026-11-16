// Story do cotovelo — espaço livre no MEIO (y≈770–1170) para o autocolante do link
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=fBg(t,'#2a2470','#0b0a2a',960);
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 200) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,390,'TENTA LAMBER O',80,'#fff')+fTxt(540,505,'SEU COTOVELO',100,FY,'middle',16);
  const by=8*Math.sin(t*6);
  o+=fTxt(540,650,'TOCA NO LINK',58,'#fff')+'<path d="M540,'+(680+by)+' v50 m-28,-28 l28,28 l28,-28" fill="none" stroke="'+FY+'" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>';
  // zona do link: vazia de propósito (770–1170)
  o+='<g transform="translate(540 1530) scale(.5) translate(-540 -1000)">'+lgDefs()+cvFace(t,{mouth:'lingua',look:[[30,26],[18,26]],tilt:-8,browL:6,browR:6})+cvBraco(t).o+'</g>';
  o+=fStamp(t,0.2,820,1300,'QUASE IMPOSSÍVEL','#e0483a',40,6);
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210; fs.mkdirSync(`${process.argv[2]}/storycv`,{recursive:true});
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storycv/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
