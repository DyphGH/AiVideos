// usage: node shot5.js list5.json OUTDIR [DBGDIR]   (fonts must sit next to fb4.html)
// like shot2.js, plus: prints window.check for question AND answer, and for mode "legs" renders a legs-only
// debug PNG into DBGDIR (default OUTDIR) for verify3.py.
const {chromium}=require('playwright');const path=require('path');const L=require(path.resolve(process.argv[2]));const OUT=process.argv[3]||'.';const DBG=process.argv[4]||OUT;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
const go=async P=>{await p.goto('file://'+__dirname+'/fb4.html#'+encodeURIComponent(JSON.stringify(P)));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);await p.reload();await p.waitForFunction('window.done');await p.waitForTimeout(100);return p.evaluate(()=>window.check||null);};
const C={};
for(const it of L){for(const ans of [false,true]){const ck=await go({...it,answer:ans});C[it.n+(ans?'-resposta':'')]=ck;
 await p.screenshot({path:`${OUT}/fb-hit0ms-${it.n}${ans?'-resposta':''}.jpg`,type:'jpeg',quality:90});}
 if(it.mode==='legs'||it.mode==='legs2'){C[it.n+'-dbg']=await go({...it,dbg:true});await p.screenshot({path:`${DBG}/dbg-${it.n}.png`});}}
console.log(JSON.stringify(C));await b.close();})();
