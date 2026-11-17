import sys,json,subprocess
a=json.loads(sys.argv[1])
css="""@font-face{font-family:M;font-weight:900;src:url(mont900.woff2)}*{margin:0;padding:0;box-sizing:border-box}
.f{position:relative;width:1080px;height:1920px;overflow:hidden;background-size:cover}.c{position:absolute;left:0;right:0;text-align:center;font-family:M;font-weight:900}
.t{color:#fff;-webkit-text-stroke:18px #0d1636;paint-order:stroke fill;line-height:1.05}.t b{color:#ffd21f}.t i{font-style:normal;color:#7be0a8}
.pill{display:inline-block;background:#ffd21f;color:#0d1636;border:7px solid #0d1636;border-radius:99px;padding:14px 44px;font-size:52px}
.box{display:inline-block;background:#fff;color:#0d1636;border:8px solid #0d1636;border-radius:40px;padding:24px 44px;font-size:54px;line-height:1.15}.box b{color:#e5484d}"""
for kind in ('cover','story'):
  body=a[kind]
  html=f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="f" id="x" style="background-image:url({a["bg"]})">{body}</div></body></html>'
  open(f'_{kind}.html','w').write(html)
js='''const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [f,o,t] of [['_cover.html',process.argv[2],'jpeg'],['_story.html',process.argv[3],'png']]){await p.goto('file://'+__dirname+'/'+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await (await p.$('#x')).screenshot({path:o,type:t,...(t==='jpeg'?{quality:92}:{})});}await b.close();})();'''
open('_shot.js','w').write(js)
subprocess.run(['node','_shot.js',a['out_cover'],a['out_story']],check=True);print('ok')
