const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=tdDefs()+fBg(t,'#2a2470','#0b0a2a',950);
  o+='<defs><clipPath id="sC"><circle cx="540" cy="1080" r="430"/></clipPath><filter id="sw"><feTurbulence type="fractalNoise" baseFrequency="'+(0.011+0.003*Math.sin(t*2)).toFixed(4)+' 0.014" numOctaves="2" seed="'+(Math.floor(t*6)%40)+'"/><feDisplacementMap in="SourceGraphic" scale="'+(14+10*Math.sin(t*3))+'" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
  o+='<circle cx="548" cy="1092" r="438" fill="#000" opacity=".35"/><g clip-path="url(#sC)">'+espiral(540,1080,-t*3.2,650)+'</g><circle cx="540" cy="1080" r="430" fill="none" stroke="'+FK+'" stroke-width="14"/><circle cx="540" cy="1080" r="430" fill="none" stroke="'+FY+'" stroke-width="6"/>';
  if(t>3.2){ const k=ease(Math.min(1,(t-3.2)/.4)); o+='<g clip-path="url(#sC)"><g opacity="'+k+'" filter="url(#sw)"><g transform="translate(540 1200) scale(.66) translate(-540 -1150)">'+maoPalma(t,{pinch:0,flex:0,tendao:false})+'</g></g></g>'; }
  else o+='<circle cx="540" cy="1080" r="40" fill="#fff" stroke="'+FK+'" stroke-width="8"/><circle cx="540" cy="1080" r="18" fill="#e0483a"/>';
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 220) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,410,'SUA MÃO VAI',96,'#fff')+fTxt(540,530,'DERRETER?',110,FY);
  const by=10*Math.sin(t*6);
  o+=fTxt(540,1640,'VÊ O VÍDEO NOVO',66,'#fff')+'<path d="M540,'+(1670+by)+' v60 m-32,-32 l32,32 l32,-32" fill="none" stroke="'+FY+'" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210;
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storytd/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
