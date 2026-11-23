// Video #26 — eggs: four eggs that crack and splat (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function eggPath(rx,ry){c.beginPath();c.moveTo(0,-ry);c.bezierCurveTo(rx*.95,-ry,rx*1.05,ry*.55,0,ry);c.bezierCurveTo(-rx*1.05,ry*.55,-rx*.95,-ry,0,-ry);c.closePath();}
function egg(rx,ry,c1,c2,c3,deco){eggPath(rx,ry);shape(rad(-rx*.35,-ry*.4,4,ry*1.2,[[0,c1],[.6,c2],[1,c3]]),5,'#3a2a1a');if(deco){c.save();eggPath(rx,ry);c.clip();deco(rx,ry);c.restore();}gloss(-rx*.38,-ry*.45,rx*.2,ry*.14,-0.5,.7);}
function shellBit(col,i){c.save();c.rotate(i*1.3);c.beginPath();c.moveTo(-14,-8);c.lineTo(4,-14);c.lineTo(16,-2);c.lineTo(8,10);c.lineTo(-12,8);c.closePath();shape(col,3,'#3a2a1a');c.restore();}
function mkEgg(rx,ry,c1,c2,c3,deco,shellCol,yolkCol,big,burst){
  return {h:ry*2,w:rx*2,rot:-Math.PI*0.5,burst,up:1.2,spin:16,draw:()=>egg(rx,ry,c1,c2,c3,deco),
    parts(){const o=[];for(let i=0;i<Math.round(10*big);i++)o.push({dx:((i*37)%(rx*2))-rx,dy:((i*53)%(ry*2))-ry,h:18,rest:6,draw:()=>shellBit(shellCol,i)});
      for(let i=0;i<Math.round(8*big);i++)o.push({dx:((i*29)%(rx))-rx/2,dy:0,h:14,rest:4,drag:.6,draw:()=>{ell(0,0,8+(i%3)*3,6);shape(i%2?'rgba(255,255,240,.85)':yolkCol,2,'#a06a00');}});return o;},
    decal(x,g){const R=(70*big)*g;c.beginPath();for(let i=0;i<=26;i++){const a=i/26*Math.PI*2,r=R*(1+Math.sin(i*2.9)*.15);c.lineTo(x+Math.cos(a)*r*1.4,H.FLOOR_Y+2+Math.sin(a)*r*0.18);}c.closePath();c.fillStyle='rgba(255,255,245,.92)';c.fill();c.lineWidth=2;c.strokeStyle='rgba(200,190,160,.8)';c.stroke();
      ell(x+8*big,H.FLOOR_Y,26*big*g+2,8*big*g+1);c.fillStyle=rad(x,H.FLOOR_Y-4,2,30*big,[[0,'#fff2a0'],[1,yolkCol]]);c.fill();ell(x,H.FLOOR_Y-3,8*big*g,2.5*g);c.fillStyle='rgba(255,255,255,.7)';c.fill();}};}
const white=mkEgg(70,92,'#ffffff','#f1ece2','#c9bfae',null,'#f8f4ec','#ffb000',1,560);
const brown=mkEgg(72,94,'#f2c79a','#c98a52','#7a4a22',(rx,ry)=>{c.fillStyle='rgba(90,50,20,.35)';for(let i=0;i<26;i++){ell(-rx+((i*37)%(rx*2)),-ry+((i*53)%(ry*2)),3,2);c.fill();}},'#d9a06a','#ff9a00',1,560);
const gold=mkEgg(74,96,'#fff6b0','#f2c21a','#8a6400',(rx,ry)=>{c.strokeStyle='rgba(255,255,255,.5)';c.lineWidth=6;for(const y of [-40,0,40]){c.beginPath();c.moveTo(-rx,y);for(let x=-rx;x<=rx;x+=16)c.lineTo(x,y+((x/16)%2?-8:8));c.stroke();}c.fillStyle='#e03131';for(const [x,y] of [[-30,-60],[30,-20],[-20,20],[24,60]]){ell(x,y,7,7);c.fill();}},'#f2c21a','#ffb000',1.1,600);
const giant=mkEgg(108,140,'#fffdf5','#ede4d2','#b8aa8e',(rx,ry)=>{c.fillStyle='rgba(150,130,100,.18)';for(let i=0;i<40;i++){ell(-rx+((i*41)%(rx*2)),-ry+((i*59)%(ry*2)),2,2);c.fill();}},'#f4eee2','#ff9800',2.2,720);
return {tag:'CHALLENGE #26',ask:'WHICH EGG WOULD YOU SAVE? &darr;',askStyle:{background:'#ffd43b',color:'#111'},
 palette:{wallTop:'#2a4a2a',wallBot:'#6aa36a',sky1:'#6ec6ff',sky2:'#e3f6ff',night:false,floorA:'#fff8e6',floorB:'#d9a441'},
 objects:{white,brown,gold,giant},
 onTable(){const y=880;// egg carton + frying pan
   c.beginPath();c.roundRect(80,y-50,200,50,8);shape(lin(0,y-50,0,y,[[0,'#d8cbb0'],[1,'#a8987a']]),4,'#5a4a2a');
   for(let i=0;i<5;i++){const x=100+i*40;c.beginPath();c.moveTo(x-16,y-50);c.bezierCurveTo(x-16,y-90,x+16,y-90,x+16,y-50);shape(i%2?'#f1ece2':'#c98a52',3,'#3a2a1a');}
   ell(380,y-14,70,16);shape(lin(0,y-30,0,y,[[0,'#495057'],[1,'#212529']]),4,'#000');c.beginPath();c.roundRect(440,y-20,110,12,6);shape('#343a40',3,'#000');}};};
