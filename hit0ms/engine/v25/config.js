// Video #24 — water balloons: four original balloons that burst into a big splash
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function balloon(rx,ry,c1,c2,c3,deco){ // tied knot at the bottom, water inside
  c.beginPath();c.moveTo(-8,ry-4);c.lineTo(8,ry-4);c.lineTo(12,ry+16);c.lineTo(-12,ry+16);c.closePath();shape(c2,4,'#102030');
  ell(0,0,rx,ry);shape(rad(-rx*.35,-ry*.4,4,Math.max(rx,ry)*1.15,[[0,c1],[.55,c2],[1,c3]]),5,'#0a1420');
  c.save();ell(0,0,rx,ry);c.clip();c.fillStyle='rgba(120,200,255,.22)';c.beginPath();c.moveTo(-rx,ry*.15);for(let x=-rx;x<=rx;x+=12)c.lineTo(x,ry*.15+Math.sin(x*.08)*6);c.lineTo(rx,ry);c.lineTo(-rx,ry);c.closePath();c.fill();
  if(deco)deco(rx,ry);c.restore();gloss(-rx*.38,-ry*.45,rx*.22,ry*.14,-0.6,.75);gloss(rx*.4,ry*.3,rx*.06,ry*.1,0.4,.35);}
function drop(i){ c.save();c.scale(2,2);c.beginPath();c.moveTo(0,-9-(i%3)*3);c.quadraticCurveTo(8,2,0,8);c.quadraticCurveTo(-8,2,0,-9-(i%3)*3);shape(i%2?'rgba(140,210,255,.95)':'rgba(90,170,240,.95)',2,'#1a4a80');ell(-2,-1,2,3);c.fillStyle='rgba(255,255,255,.8)';c.fill();c.restore();}
function blob(i){const r=18+(i%3)*8;ell(0,0,r*1.3,r);shape(rad(-r*.3,-r*.3,2,r*1.4,[[0,'rgba(200,235,255,.95)'],[1,'rgba(60,150,230,.9)']]),3,'#1a4a80');ell(-r*.4,-r*.35,r*.35,r*.2,-.5);c.fillStyle='rgba(255,255,255,.8)';c.fill();}
function rubber(col,i){c.save();c.rotate(i*1.7);c.beginPath();c.moveTo(-18,-6);c.quadraticCurveTo(0,-18,20,-4);c.quadraticCurveTo(6,4,14,12);c.quadraticCurveTo(-4,6,-16,10);c.closePath();shape(col,3,'#0a1420');c.restore();}
function mkBalloon(rx,ry,c1,c2,c3,deco,nDrops,burst){
  return {h:ry*2+20,w:rx*2,rot:-Math.PI*0.25,burst,up:1.7,spin:8,draw:()=>balloon(rx,ry,c1,c2,c3,deco),
    parts(){const o=[];for(let i=0;i<5;i++)o.push({dx:((i*37)%(rx*2))-rx,dy:((i*53)%(ry*2))-ry,h:16,rest:6,draw:()=>rubber(c2,i)});
      o.push({dx:0,dy:ry,h:20,rest:8,draw:()=>{c.beginPath();c.moveTo(-8,-10);c.lineTo(8,-10);c.lineTo(12,10);c.lineTo(-12,10);c.closePath();shape(c2,3,'#102030');}});
      for(let i=0;i<nDrops;i++)o.push({dx:((i*31)%(rx*2))-rx,dy:((i*47)%(ry*2))-ry,h:24,rest:8,drag:.5,draw:()=>drop(i)});for(let i=0;i<Math.round(nDrops/6);i++)o.push({dx:((i*53)%(rx*2))-rx,dy:((i*29)%ry),h:40,rest:12,drag:.8,draw:()=>blob(i)});return o;},
    decal(x,g){const R=(rx*1.9+nDrops*1.6)*g;c.beginPath();for(let i=0;i<=28;i++){const a=i/28*Math.PI*2,r=R*(1+Math.sin(i*2.7)*.12);c.lineTo(x+Math.cos(a)*r*1.25,H.FLOOR_Y+2+Math.sin(a)*r*0.16);}c.closePath();
      c.fillStyle=lin(0,H.FLOOR_Y-20,0,H.FLOOR_Y+20,[[0,'rgba(150,215,255,.92)'],[1,'rgba(40,120,210,.92)']]);c.fill();c.fillStyle='rgba(255,255,255,.55)';ell(x-R*.4,H.FLOOR_Y-2,R*.25,3);c.fill();}};}
const red=mkBalloon(80,92,'#ff9aa8','#e0102e','#6a0010',null,40,820);
const blue=mkBalloon(86,98,'#b8e2ff','#2e86d0','#0a3a7a',(rx,ry)=>{c.fillStyle='#ffd43b';for(const [x,y,s] of [[-30,-30,1],[28,-10,.8],[-6,30,.9],[40,40,.6]]){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?7:16;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.restore();}},50,880);
const green=mkBalloon(66,128,'#b9f5c6','#2fa860','#0f5a2a',(rx,ry)=>{c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=10;for(const y of [-70,-30,10,50]){c.beginPath();c.moveTo(-rx,y);c.quadraticCurveTo(0,y+18,rx,y);c.stroke();}},56,900);
const xl=mkBalloon(128,138,'#e2b8ff','#8a3fd6','#3a0a6a',(rx,ry)=>{c.font='900 58px Inter';c.textAlign='center';c.fillStyle='rgba(255,255,255,.9)';c.fillText('XXL',0,20);c.lineWidth=3;c.strokeStyle='#3a0a6a';c.strokeText('XXL',0,20);},90,1000);
return {tag:'CHALLENGE #24',ask:'BIGGEST SPLASH? COMMENT 1, 2, 3 OR 4 &darr;',askStyle:{background:'#2e86d0',color:'#fff'},
 palette:{wallTop:'#0f4a5a',wallBot:'#2a9ab0',sky1:'#4aa3ff',sky2:'#cfe9ff',night:false,floorA:'#eef8ff',floorB:'#2e86d0'},
 objects:{red,blue,green,xl},
 onTable(){const y=880;// bucket full of balloons
   c.beginPath();c.moveTo(90,y-120);c.lineTo(230,y-120);c.lineTo(214,y);c.lineTo(106,y);c.closePath();shape(lin(90,0,230,0,[[0,'#ffd43b'],[1,'#e0a000']]),4,'#5a3a00');
   ell(160,y-120,70,14);shape('rgba(120,200,255,.9)',4,'#1a4a80');
   for(const [x,yy,col] of [[130,y-130,'#ff4d6d'],[165,y-138,'#51cf66'],[195,y-128,'#ffd43b']]){ell(x,yy,20,22);shape(col,3,'#102030');gloss(x-6,yy-8,5,3,-.5,.7);}
   c.beginPath();c.arc(160,y-120,64,Math.PI,0);c.lineWidth=5;c.strokeStyle='#5a3a00';c.stroke();}};};
