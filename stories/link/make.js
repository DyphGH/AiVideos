// Story "vídeo novo" 1080x1920 com espaço vazio no meio para o sticker de link (posto à mão na app).
// Uso: node make.js <capa.jpg> <saida.jpg> <conta: 2factos|hit0ms> "<TÍTULO>" ["<sub>"]
// Precisa das fontes Anton e Inter (woff2) em FONTS_DIR (por defeito ./fonts ao lado deste ficheiro):
//   npm pack @fontsource/anton @fontsource/inter  → anton-latin-400-normal.woff2, inter-latin-800-normal.woff2
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const [capa,out,acct='hit0ms',title='NEW VIDEO',sub='']=process.argv.slice(2);
const FD=process.env.FONTS_DIR||path.join(__dirname,'fonts');
const f64=n=>{try{return fs.readFileSync(path.join(FD,n)).toString('base64')}catch{return ''}};
const img='data:image/jpeg;base64,'+fs.readFileSync(capa).toString('base64');
const T=acct==='2factos'?{top:'VÍDEO NOVO!',tap:'TOCA AQUI 👇',handle:'@2factos',c1:'#ffd21f',c2:'#ff3d7f',ink:'#1d1838'}
                        :{top:'NEW VIDEO!',tap:'TAP HERE 👇',handle:'@hit0ms',c1:'#2bff7a',c2:'#ffd21f',ink:'#0b0b14'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const html=`<!doctype html><html><head><meta charset=utf8><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${f64('anton-latin-400-normal.woff2')})}
@font-face{font-family:I;font-weight:800;src:url(data:font/woff2;base64,${f64('inter-latin-800-normal.woff2')})}
*{margin:0;box-sizing:border-box}body{width:1080px;height:1920px;overflow:hidden;font-family:I,sans-serif;background:${T.ink}}
.bg{position:absolute;inset:-60px;background:url(${img}) center/cover;filter:blur(38px) brightness(.45) saturate(1.3)}
.c{position:absolute;left:0;right:0;display:flex;justify-content:center;text-align:center}
.pill{font:800 46px I;letter-spacing:2px;padding:14px 34px;border-radius:99px;background:${T.c1};color:${T.ink};box-shadow:0 8px 0 rgba(0,0,0,.35)}
.card{width:500px;height:889px;border-radius:46px;background:url(${img}) center/cover;border:10px solid #fff;box-shadow:0 30px 80px rgba(0,0,0,.6);transform:rotate(-3deg)}
h1{font:400 96px/1 A;color:#fff;text-shadow:0 8px 0 rgba(0,0,0,.45);padding:0 50px;text-transform:uppercase}
.sub{font:800 44px I;color:${T.c1};text-shadow:0 4px 0 rgba(0,0,0,.5)}
.slot{width:620px;height:170px;border:8px dashed rgba(255,255,255,.85);border-radius:40px;display:flex;align-items:center;justify-content:center;font:800 46px I;color:rgba(255,255,255,.9);background:rgba(0,0,0,.35)}
.h{font:400 70px A;color:${T.c1};text-shadow:0 0 30px ${T.c1}}
</style></head><body><div class="bg"></div>
<div class="c" style="top:120px"><span class="pill">${esc(T.top)}</span></div>
<div class="c" style="top:225px"><div class="card"></div></div>
<div class="c" style="top:1160px"><h1>${esc(title)}</h1></div>
${sub?`<div class="c" style="top:1282px"><div class="sub">${esc(sub)}</div></div>`:''}
<div class="c" style="top:1400px"><div class="slot">${esc(T.tap)}</div></div>
<div class="c" style="top:1700px"><div class="h">${esc(T.handle)}</div></div>
</body></html>`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.setContent(html);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
await p.screenshot({path:out,type:'jpeg',quality:88});await b.close();console.log('ok',out);})();
