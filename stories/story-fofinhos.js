const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const src=fs.readFileSync(process.argv[2]+'/car01b.js','utf8');
const lib=src.slice(src.indexOf('String.raw`')+11, src.indexOf('`;\nconst S=[]'));
const frame=`function F(t){
 let o=defs()+'<g transform="translate(0 0) scale(1 1.4222)">'+ceu(1)+'</g>';
 o+=lua(880,760,62);
 o+='<g transform="translate(0 260)">'+montes();
 o+='<g stroke="'+OL+'" stroke-width="6">'; for(let x=10;x<1080;x+=125) o+='<rect x="'+x+'" y="880" width="30" height="120" rx="8" fill="url(#wood)"/>'; o+='<rect x="-10" y="900" width="1100" height="22" rx="8" fill="url(#wood)"/><rect x="-10" y="950" width="1100" height="22" rx="8" fill="url(#wood)"/></g>';
 o+=relva('M-20,985 Q540,940 1100,985 V1700 H-20 Z')+folhas(0,1080,1000,1600,140,2);
 for(let i=0;i<14;i++) o+=flor((i*109+40)%1040,1030+(i*61)%500,.85,['#ff9ec4','#ffffff','#bfe0ff','#ffe9a0'][i%4]);
 const b=Math.sin(t*3)*6;
 o+='<circle cx="540" cy="830" r="360" fill="url(#pglow)"/>';
 o+='<g transform="translate(0 '+b+')">'+vaca(380,780,.72,1,{hr:10+Math.sin(t*3)*2,lenco:'#ffd21f'})+'</g><g transform="translate(0 '+(-b)+')">'+vaca(700,780,.72,-1,{hr:10+Math.sin(t*3)*2,lenco:'#7fd3ff',coroa:true})+'</g>';
 o+='</g>';
 for(let i=0;i<9;i++){const p=((t*.35+i/9)%1); o+=coracao(R(120+(i*113)%840+Math.sin(t*2+i)*20),R(1500-p*900),.5+(i%3)*.25,i%2?PK:YL,1-p);}
 o+=vagalumes(5,10,900,1500);
 const k=1+.04*Math.sin(t*6);
 o+='<g transform="translate(540 230) scale('+k+')"><rect x="-230" y="-55" width="460" height="110" rx="55" fill="#e0483a" stroke="#0a1633" stroke-width="8"/><text y="22" font-family="M" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">POST NOVO!</text></g>';
 o+=fTxt(540,420,'VACAS TÊM',100,'#fff')+fTxt(540,545,'MELHOR AMIGA?',108,PK,'middle',16);
 const by=10*Math.sin(t*6);
 o+='<g transform="translate(540 1600)"><rect x="-370" y="-62" width="740" height="124" rx="62" fill="#0a1633" opacity=".75"/><text y="20" font-family="M" font-weight="900" font-size="56" fill="#fff" text-anchor="middle">VÊ NO PERFIL E MANDA</text></g>';
 o+=fTxt(540,1735,'PRA SUA MELHOR AMIGA',62,YL)+'<path d="M540,'+(1770+by)+' v60 m-32,-32 l32,32 l32,-32" fill="none" stroke="'+YL+'" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
 return o; }`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.setContent(`<style>@font-face{font-family:M;src:url(${font});font-weight:900}body{margin:0}</style><svg id=s width=1080 height=1920 viewBox="0 0 1080 1920"></svg><script>window.window=window;${art};${lib};${frame}</script>`);
await p.evaluate(()=>document.fonts.ready);
const N=+process.argv[3]||210;
for(let i=0;i<N;i++){ await p.evaluate(t=>{document.getElementById('s').innerHTML=F(t);},i/30); await p.screenshot({path:`${process.argv[2]}/story01/f${String(i).padStart(4,'0')}.png`}); }
await b.close();})();
