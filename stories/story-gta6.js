const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  let o=gDefs()+cidade(t,{car:true});
  o+='<rect width="1080" height="1920" fill="#0c0518" opacity=".4"/>'+chuvaNotas(t,10,.4);
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 230) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">VÍDEO NOVO!</text></g>';
  o+=fTxt(540,420,'QUANTO O GTA 6',92,'#fff')+fTxt(540,530,'VAI FATURAR?',100,'#ffd21f');
  const dig=t<3.5?String(10+Math.floor((t*37)%89)):'??';
  const sh=t<3.5?Math.sin(t*50)*4:0;
  o+='<g transform="translate('+(540+sh)+' 780)">'+neonTxt(0,0,'R$ '+dig+' BI',170,'#2f9e5a')+'</g>';
  o+='<g transform="translate(540 930)">'+estrelas(0,0,5,t,0.3)+'</g>';
  const by=10*Math.sin(t*6);
  o+=fTxt(540,1250,'VÊ O VÍDEO NOVO',66,'#fff')+'<path d="M540,'+(1280+by)+' v60 m-32,-32 l32,32 l32,-32" fill="none" stroke="#ffd21f" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  return o+'<rect width="1080" height="1920" fill="url(#gVig)"/>'; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210;
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storygta/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
