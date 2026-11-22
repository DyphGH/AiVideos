const {chromium}=require('playwright');const L=require(process.argv[2]);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const it of L){for(const ans of [false,true]){const P={...it,answer:ans};await p.goto('file://'+__dirname+'/fb.html#'+encodeURIComponent(JSON.stringify(P)));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);await p.reload();await p.waitForFunction('window.done');await p.waitForTimeout(100);
 await p.screenshot({path:`/mnt/user-data/outputs/fb-hit0ms-${it.n}${ans?'-resposta':''}.jpg`,type:'jpeg',quality:92});}}
await b.close();})();
