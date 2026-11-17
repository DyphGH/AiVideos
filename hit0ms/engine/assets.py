import sys,json,subprocess
# usage: assets.py id dir frame level speed cover_h1 story_h1 story_box num
a=json.loads(sys.argv[1])
head=open('covers.html').read().split('<body>')[0]
cv=f'''{head}<body><div class="f" id="x"><div class="bg" style="background-image:url({a['dir']}/clean_{a['frame']}.png)"></div><div class="shade"></div>
 <div class="c" style="top:260px"><h1 style="font-size:150px">{a['cover']}</h1></div>
 <div class="hud"><div class="top"><span>LEVEL {a['level']} / 4</span><span>SPEED {a['speed']}%</span></div><div class="row"><span class="res">TOO EARLY</span><span class="val">-133 ms</span></div><div class="bar"><div class="mk"></div></div></div>
 <div class="c big0" style="top:1400px">0 ms?</div></div></body></html>'''
sh=open('stories2.html').read().split('<body>')[0]
st=f'''{sh}<body><div class="f" id="x"><div class="bg" style="background-image:url({a['dir']}/clean_{a['frame']}.png)"></div><div class="shade"></div>
 <div class="c" style="top:250px"><span class="pill">NEW CHALLENGE #{a['num']}</span></div>
 <div class="c" style="top:370px"><h1 style="font-size:130px">{a['story']}</h1></div>
 <div class="c" style="top:1330px"><div class="box">{a['box']}</div></div>
 <div class="c sm" style="top:1560px">Watch it below &darr;</div>
 <div class="c handle" style="top:1650px">@hit0ms</div></div></body></html>'''
open('_cv.html','w').write(cv);open('_st.html','w').write(st)
js='''const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [f,o,t] of [['_cv.html',process.argv[2],'jpeg'],['_st.html',process.argv[3],'png']]){await p.goto('file://'+__dirname+'/'+f);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await (await p.$('#x')).screenshot({path:o,type:t,...(t==='jpeg'?{quality:92}:{})});}await b.close();})();'''
open('_shot.js','w').write(js)
n=a['num'];slug=a['slug']
subprocess.run(['node','_shot.js',f'/mnt/user-data/outputs/hit0ms-{n}-capa.jpg',f'/mnt/user-data/outputs/hit0ms-{n}-story.png'],check=True);print('ok')
