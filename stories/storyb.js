const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){
  const yawn=(t0,d=2.0)=>{const x=(t-t0)/d; return x<0||x>1?0:Math.sin(Math.PI*x)**.7;};
  const a=Math.max(yawn(-0.25,1.45),yawn(3.9,1.8));
  let o=fBg(t,'#2a2470','#0b0a2a',950);
  o+='<g transform="translate(540 1180) scale(.72) translate(-540 -1100)">'+caraBoc(a,t)+'</g>';
  const k=1+.04*Math.sin(t*6);
  o+='<g transform="translate(540 280) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="'+FK+'" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">NOVO VÍDEO!</text></g>';
  o+=fTxt(540,450,'APOSTO QUE',100,'#fff')+fTxt(540,570,'VAIS BOCEJAR',110,FY)+fTxt(540,690,'AGORA 🥱',110,'#e0483a');
  const n=(t>=0.05?1:0)+(t>=3.9?1:0);
  o+='<g transform="translate(860 880) rotate(6)"><rect x="-150" y="-55" width="300" height="110" rx="20" fill="#fffaf0" stroke="'+FK+'" stroke-width="7"/><text y="-8" font-family="M" font-weight="900" font-size="30" fill="'+FK+'" text-anchor="middle">BOCEJOS</text><text y="42" font-family="M" font-weight="900" font-size="50" fill="#e0483a" text-anchor="middle">'+n+'</text></g>';
  o+='<rect x="0" y="1440" width="1080" height="480" fill="#0b0a2a" opacity=".55"/>';
  const by=(t>=7.25?22:10)*Math.sin(t*(t>=7.25?9:5));
  o+=fTxt(540,1530,'VÊ ATÉ AO FIM NO REEL',62,'#fff')+'<path d="M540,'+(1560+by)+' v70 m-36,-36 l36,36 l36,-36" fill="none" stroke="'+FY+'" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
for(let i=0;i<258;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/storyb/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
