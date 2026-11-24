// usage: node shot2.js list2.json OUTDIR   (fonts must sit next to fb2.html)
const {chromium}=require('playwright');const path=require('path');const L=require(path.resolve(process.argv[2]));const OUT=process.argv[3]||'/mnt/user-data/outputs';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const it of L){for(const ans of [false,true]){const P={...it,answer:ans};await p.goto('file://'+__dirname+'/fb2.html#'+encodeURIComponent(JSON.stringify(P)));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);await p.reload();await p.waitForFunction('window.done');await p.waitForTimeout(100);
 const ck=await p.evaluate(()=>window.check||null);if(ck&&!ans)console.log(it.n,JSON.stringify(ck));
 await p.screenshot({path:`${OUT}/fb-hit0ms-${it.n}${ans?'-resposta':''}.jpg`,type:'jpeg',quality:90});}}
await b.close();})();
