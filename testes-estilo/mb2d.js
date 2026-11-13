// Mindinho completo — 2D premium (luz, sombra, recorte, câmara, partículas) + legendas novas + grão. node b3d.js <outdir> <frames>
const {chromium}=require('playwright');const fs=require('fs');
const art=fs.readFileSync('/home/claude/oficina-remotion/src/art.js','utf8').replace(/export \{[^}]*\};?/,'');
const font='data:font/woff2;base64,'+fs.readFileSync('/home/claude/oficina-remotion/public/fonts/mont900.woff2').toString('base64');
const W=1080,H=1920;
const page=`<!doctype html><html><head><style>
@font-face{font-family:M;src:url(${font});font-weight:900}
html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#0b0a2a}
#bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 45% at 50% 52%,#5a3fc0 0%,#2a2470 45%,#0b0a2a 100%)}
.bk{position:absolute;border-radius:50%;filter:blur(18px);mix-blend-mode:screen}
canvas,svg#c{position:absolute;inset:0}
#vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 55%,rgba(0,0,0,.55) 100%);pointer-events:none}
#grain{position:absolute;inset:-50px;opacity:.10;mix-blend-mode:overlay;pointer-events:none}
#hook{position:absolute;left:40px;top:150px;width:1000px;height:200px;border-radius:28px;background:#ffd21f;border:10px solid #0a1633;box-sizing:border-box;box-shadow:0 14px 0 rgba(0,0,0,.25);font-family:M;font-weight:900;text-align:center;line-height:1}
#hook div:first-child{font-size:66px;color:#0a1633;margin-top:28px}#hook div:last-child{font-size:66px;color:#e0483a;margin-top:12px}
#cap{position:absolute;left:0;right:0;top:1400px;text-align:center;font-family:M;font-weight:900;font-size:84px;line-height:1.15}
#cap span{display:inline-block;margin:0 10px;color:#fff;-webkit-text-stroke:16px #0a1633;paint-order:stroke fill;transition:none}
#cap span.on{color:#0a1633;-webkit-text-stroke:0;background:#ffd21f;border-radius:18px;padding:0 18px;box-shadow:0 8px 0 #0a1633}
#cap span.y{color:#ffd21f}
#stamp{position:absolute;left:540px;top:1170px;font-family:M;font-weight:900;font-size:120px;color:#e0483a;background:#fff;border:12px solid #e0483a;border-radius:26px;padding:10px 40px;transform-origin:center;white-space:nowrap;box-shadow:0 14px 0 rgba(0,0,0,.3)}
</style></head><body>
<div id=bg></div><div id=bks></div><svg id=c width=${W} height=${H} viewBox="0 0 ${W} ${H}"></svg><div id=vig></div><canvas id=grain width=${W+100} height=${H+100}></canvas>
<div id=hook><div>DOBRA SÓ A PONTA</div><div>DO MINDINHO</div></div>
<div id=stamp style="display:none">NÃO DÁ!</div>
<div id=cap></div>
<script>window.window=window;${art}</script>
<script>
const clamp2=(v,a,b)=>Math.max(a,Math.min(b,v)), ease2=x=>1-Math.pow(1-clamp2(x,0,1),3);
const DEF='<defs>'+
 '<filter id="lit" x="-20%" y="-20%" width="140%" height="140%">'+
  '<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" result="A"/>'+
  '<feOffset in="SourceAlpha" dx="-14" dy="6" result="off"/><feComposite in="SourceAlpha" in2="off" operator="out" result="edge"/><feGaussianBlur in="edge" stdDeviation="3" result="edgeB"/>'+
  '<feFlood flood-color="#8fe3ff" result="cy"/><feComposite in="cy" in2="edgeB" operator="in" result="rim0"/><feComposite in="rim0" in2="SourceAlpha" operator="in" result="rim"/>'+
  '<feOffset in="SourceAlpha" dx="22" dy="-10" result="off2"/><feComposite in="SourceAlpha" in2="off2" operator="out" result="sh"/><feGaussianBlur in="sh" stdDeviation="12" result="shB"/>'+
  '<feFlood flood-color="#7a2a3a" flood-opacity=".55" result="sc"/><feComposite in="sc" in2="shB" operator="in" result="shade"/><feComposite in="shade" in2="SourceAlpha" operator="in" result="shadeIn"/>'+
  '<feOffset in="SourceAlpha" dx="-10" dy="12" result="off3"/><feComposite in="SourceAlpha" in2="off3" operator="out" result="hl"/><feGaussianBlur in="hl" stdDeviation="6" result="hlB"/>'+
  '<feFlood flood-color="#fff3df" flood-opacity=".6" result="wc"/><feComposite in="wc" in2="hlB" operator="in" result="hi0"/><feComposite in="hi0" in2="SourceAlpha" operator="in" result="hi"/>'+
  '<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shadeIn"/><feMergeNode in="hi"/><feMergeNode in="rim"/></feMerge></filter>'+
 '<filter id="ds" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="30"/><feOffset dx="40" dy="40" result="b"/><feFlood flood-color="#05041a" flood-opacity=".7"/><feComposite in2="b" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>'+
 '<filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter><filter id="blur30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>'+
 '<radialGradient id="spot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd9a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient>'+
 '<linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'+
'</defs>';
// bokeh
const bks=document.getElementById('bks');const BK=[];for(let i=0;i<14;i++){const d=document.createElement('div');d.className='bk';const s=40+(i*37)%110;Object.assign(d.style,{width:s+'px',height:s+'px',background:['#ffd21f','#7fe3ff','#ff7ab8','#b9a2ff'][i%4],opacity:.3+(i%3)*.12});bks.appendChild(d);BK.push({d,x:(i*211)%1080,y:(i*367)%1920,s:.3+(i%5)*.15});}
// grão
const gc=document.getElementById('grain').getContext('2d');const gi=gc.createImageData(${W+100},${H+100});
function grain(seed){let s=seed*9301+49297;const a=gi.data;for(let i=0;i<a.length;i+=4){s=(s*1103515245+12345)&0x7fffffff;const v=(s>>16)&255;a[i]=a[i+1]=a[i+2]=v;a[i+3]=255;}gc.putImageData(gi,0,0);}
// legendas palavra a palavra
const LINES=[{s:0,e:1.63,w:['DOBRA','SÓ','A','PONTA','DO','MINDINHO'],hl:[5]},{s:1.84,e:2.85,w:['SÓ','A','PONTINHA!'],hl:[2]},{s:3.08,e:4.7,w:['NÃO','DÁ','SEM','DOBRAR','O','RESTO,','NÉ?'],hl:[5]},
{s:5.03,e:8.35,w:['O','MÚSCULO','QUE','DOBRA','A','PONTA','É','O','MESMO','QUE','PUXA','OS','OUTROS','DEDOS'],hl:[8]},
{s:8.64,e:11.8,w:['OLHA','PRO','PONTO','NO','MEIO','DA','BANDEIRA','E','NÃO','PISCA'],hl:[2,8,9]},{s:12.16,e:13.1,w:['CONTINUA...'],hl:[]},
{s:21.98,e:23.1,w:['AGORA','OLHA','PRO','BRANCO'],hl:[3]},{s:23.36,e:25.43,w:['VIU','A','BANDEIRA','DO','BRASIL','DE','VERDADE?'],hl:[2,6]}];
function caption(t){const L=LINES.find(l=>t>=l.s&&t<l.e);const el=document.getElementById('cap');if(!L){el.innerHTML='';return;}
  const n=L.w.length,per=(L.e-L.s)/n,i=Math.min(n-1,Math.floor((t-L.s)/per));
  // mostra blocos de até 3 palavras
  const b0=Math.floor(i/3)*3;let h='';for(let k=b0;k<Math.min(n,b0+3);k++){const cls=k===i?'on':(L.hl.includes(k)?'y':'');const sc=k===i?(1.12-.12*ease((t-L.s-i*per)/.12)):1;h+='<span class="'+cls+'" style="transform:scale('+sc.toFixed(3)+')">'+L.w[k]+'</span>';}
  el.innerHTML=h;}
function maoScene(t){
  let o=mbDefs()+DEF;
  // raios de luz e mancha quente atrás da mão
  const pz=ease2(t/8.6);
  o+='<g transform="translate(540 700) rotate('+(-18+4*Math.sin(t*.6))+')">';for(let i=0;i<5;i++)o+='<path d="M'+(-60+i*40)+',-900 L'+(-260+i*130)+',1400 L'+(-160+i*130)+',1400 L'+(-30+i*40)+',-900 Z" fill="url(#ray)" opacity="'+(.5+.5*Math.sin(t*1.3+i))+'"/>';o+='</g>';
  o+='<ellipse cx="560" cy="880" rx="520" ry="620" fill="url(#spot)"/>';
  // partículas de pó (paralaxe)
  for(let i=0;i<40;i++){const x=(i*233)%1080+Math.sin(t*.7+i)*20-pz*30*(i%3),y=((i*397)%1700+100-t*(10+i%5*6))%1920,r=1.5+(i%4);o+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="'+r+'" fill="#ffe7b8" opacity="'+(.25+(i%5)*.1)+'"/>';}
  // mão com luz/sombra/recorte + câmara
  const z=1.1+.1*pz, rot=-2+3*pz+Math.sin(t*1.1)*.6, dx=20-40*pz;
  o+='<g transform="translate('+(600+dx)+' 1250) rotate('+rot+') scale('+z+') translate(-600 -1150)"><g filter="url(#ds)"><g filter="url(#lit)">'+mbMao(t,{xray:ease2((t-5.03)/.5)})+'</g></g>';
  // brilho vermelho nas articulações (depois de "não dá")
  if(t>3.08&&t<5.3){const P=mbPose(t),g=Math.min(1,(t-3.08)/.25)*(.55+.45*Math.sin(t*10));const a=mbJoint(MBP.x,MBP.y,MBP.L,P.pinky,1),b=mbJoint(MBR.x,MBR.y,MBR.L,P.ring,2);
    for(const q of [a,b]) o+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="46" fill="none" stroke="#ff3b3b" stroke-width="10" opacity="'+g+'"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="46" fill="none" stroke="#ff3b3b" stroke-width="22" opacity="'+(g*.4)+'" filter="url(#blur8)"/>';}
  o+='</g>';
  // primeiro plano desfocado (profundidade)
  o+='<circle cx="'+(90-pz*60)+'" cy="1650" r="120" fill="#7fe3ff" opacity=".25" filter="url(#blur30)"/><circle cx="'+(1010-pz*90)+'" cy="560" r="90" fill="#ff7ab8" opacity=".25" filter="url(#blur30)"/>';
  document.getElementById('c').innerHTML=o;
  return pz;}
window.F_=function(t){
  const flag=t>=8.6, show=v=>v?'':'none';
  ['bg','bks','vig','grain'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display=show(!flag);});
  document.getElementById('hook').style.display=show(t<8.6);
  let pz=0;
  if(!flag){pz=maoScene(t);BK.forEach((b,i)=>{b.d.style.transform='translate('+(b.x+Math.sin(t*.5+i)*30*b.s - pz*120*b.s)+'px,'+(b.y-t*20*b.s)+'px)';});grain(Math.floor(t*30));}
  else if(t<21.95) document.getElementById('c').innerHTML=FP.mb_bandeira(t-8.6,13.35);
  else document.getElementById('c').innerHTML=FP.mb_branco(t-21.95,3.48);
  caption(t);
  const st=document.getElementById('stamp');
  if(t>=3.2&&t<5.6){const x=clamp((t-3.2)/.16,0,1);st.style.display='block';st.textContent='NÃO DÁ!';st.style.transform='translate(-50%,0) rotate(-6deg) scale('+(1+1.6*(1-ease(x)))+')';}
  else if(t>=5.6&&t<8.6){const x=clamp((t-5.6)/.16,0,1);st.style.display='block';st.textContent='1 MÚSCULO SÓ';st.style.fontSize='92px';st.style.transform='translate(-50%,0) rotate(-5deg) scale('+(1+1.6*(1-ease(x)))+')';}
  else st.style.display='none';
};
</script></body></html>`;
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:W,height:H}});p.on('console',m=>console.log('PAGE',m.text()));p.on('pageerror',e=>console.log('ERR',e.message));
await p.setContent(page);await p.evaluate(()=>document.fonts.ready);
const out=process.argv[2], N=+process.argv[3]||150, step=+process.argv[4]||1; fs.mkdirSync(out,{recursive:true});
for(let i=0;i<N;i+=step){await p.evaluate(t=>window.F_(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.png`});}
await b.close();})();
