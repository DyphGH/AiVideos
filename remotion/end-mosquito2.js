const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const frame=`function F(t){ let o=fBg(t,'#2a2470','#0b0a2a',1000);
 const k=pop(t,0); o+='<g transform="translate(540 700) scale('+k+')">'+fTxt(0,0,'MANDA PRA QUEM',100,'#fff')+fTxt(0,125,'SEMPRE É PICADO',100,FY)+'</g>';
 const x=540+Math.sin(t*5)*260, y=1180+Math.sin(t*9)*80;
 const w=Math.sin(t*60)*25; o+='<g transform="translate('+x+' '+y+') rotate('+(Math.cos(t*5)*15)+') scale(1.6)" stroke="#1b1420" stroke-width="5" stroke-linecap="round">'+
 '<ellipse cx="-20" cy="-40" rx="70" ry="22" fill="#d6ecff" opacity=".8" transform="rotate('+(-30+w)+' 0 -10)"/><ellipse cx="20" cy="-40" rx="70" ry="22" fill="#d6ecff" opacity=".8" transform="rotate('+(30-w)+' 0 -10)"/>'+
 '<path d="M-60,10 l-50,60 M-30,15 l-30,80 M0,15 l10,85 M30,12 l50,70 M50,5 l80,40" fill="none"/>'+
 '<ellipse cx="0" cy="0" rx="60" ry="16" fill="#3b3b44"/><path d="M-50,-4 h100" stroke="#f6f6f6" stroke-width="4"/><circle cx="72" cy="-4" r="18" fill="#3b3b44"/><circle cx="78" cy="-8" r="7" fill="#e0483a" stroke="none"/><path d="M88,0 l60,22" stroke-width="4"/></g>';
 return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art}; ${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
for(let i=0;i<62;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/mq/end/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
