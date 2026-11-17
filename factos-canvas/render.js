const http=require('http'),fs=require('fs'),path=require('path'),{spawn}=require('child_process');const {chromium}=require('playwright');
const dir=path.resolve(process.argv[2]),mode=process.argv[3];const port=9000+Math.floor(Math.random()*500);
const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);let p=['/engine.html','/mont900.woff2'].includes(u)?path.join(__dirname,u):path.join(dir,u);
 fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);return r.end();}r.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'text/javascript','.json':'application/json'}[path.extname(p)]||'application/octet-stream'});r.end(d);});}).listen(port);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto(`http://localhost:${port}/engine.html`);await p.waitForFunction('window.ready===true',null,{timeout:60000});
 if(mode==='test'||mode==='clean'){for(const f of process.argv.slice(4).map(Number)){await p.evaluate(([f,m])=>{window.nocap=m==='clean';renderAt(f);},[f,mode]);await p.screenshot({path:`${dir}/${mode}_${f}.${mode==='clean'?'png':'jpg'}`,...(mode==='clean'?{}:{type:'jpeg',quality:85})});}}
 else{const N=+process.argv[4];const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',dir+'/video_tmp.mp4'],{stdio:['pipe','inherit','inherit']});
  for(let f=0;f<N;f++){await p.evaluate(f=>renderAt(f),f);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
  ff.stdin.end();await new Promise(r=>ff.on('close',c=>{console.log('ffmpeg',c);r();}));}
 await b.close();srv.close();})();
