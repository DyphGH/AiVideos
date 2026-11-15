// capa: frame 3D da mão + título
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const bg='data:image/png;base64,'+fs.readFileSync(process.argv[3]).toString('base64');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art};
let o='<image href="${bg}" x="-260" y="-40" width="1600" height="2844"/><rect width="1080" height="560" fill="#0b0a2a" opacity=".55"/>';
o+=fTxt(540,250,'FECHA A MÃO E',86,'#fff')+fTxt(540,380,'ESTICA SÓ O',96,'#fff')+fTxt(540,520,'ANELAR',150,FY,'middle',18);
o+=fStamp(9,0,780,700,'NÃO DÁ!','#e0483a',80,-6)+fStamp(9,0,300,1500,'+ ILUSÃO','#2e86d0',60,5)+fPill('2 FATOS',9,1700);
document.getElementById('s').innerHTML=o;</script>`);
await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400);
await p.screenshot({path:process.argv[2]+'/capa-anelar.png'}); await b.close();})();
