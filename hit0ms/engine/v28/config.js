// Video #27 — Black Friday: four original gadgets/deals that smash (original illustrations, no brands)
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
export default (H)=>{const {c,lin,rad,shape,ell}=H;
const INK='#0b0b10';
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function txt(s,x,y,font,fill,stroke,lw=4){c.save();c.textAlign='center';c.textBaseline='middle';c.font=font;if(stroke){c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=fill;c.fillText(s,x,y);c.restore();}
// ---------- shared bits ----------
function shard(i,fill,s=1,stroke=INK){c.save();c.rotate(i*.77);const a=(9+(i%4)*4)*s,b=(7+(i%3)*5)*s;c.beginPath();c.moveTo(0,-a);c.lineTo(b,a*.55);c.lineTo(-b*.85,a*.4);c.closePath();shape(fill,2,stroke);
  c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=1.6;c.beginPath();c.moveTo(-1,-a*.55);c.lineTo(b*.35,0);c.stroke();c.restore();}
function chip(i,col,s=1,stroke=INK){c.save();c.rotate(i*1.31);c.beginPath();c.moveTo(-10*s,-7*s);c.lineTo(5*s,-10*s);c.lineTo(11*s,2*s);c.lineTo(3*s,9*s);c.lineTo(-9*s,6*s);c.closePath();shape(col,2.5,stroke);c.restore();}
function screw(){c.save();c.beginPath();c.roundRect(-3,-9,6,14,1);shape('#b8c0cc',1.5,'#3a3f48');c.beginPath();c.roundRect(-6,-12,12,4,2);shape('#dfe5ee',1.5,'#3a3f48');c.restore();}
function spark(i){ell(0,0,9,9);c.fillStyle='rgba(255,200,60,.35)';c.fill();ell(0,0,3.5,3.5);c.fillStyle=i%2?'#fff6c2':'#ffd23f';c.fill();}
function priceTag(old,now,col='#ffffff'){c.save();c.beginPath();c.moveTo(-34,-17);c.lineTo(22,-17);c.lineTo(38,0);c.lineTo(22,17);c.lineTo(-34,17);c.closePath();shape(col,3,'#2a2a2a');
  ell(25,0,4,4);c.fillStyle='#2a2a2a';c.fill();txt(old,-6,-7,'800 11px Inter','#7a7f88');c.strokeStyle='#e0102e';c.lineWidth=2;c.beginPath();c.moveTo(-20,-6);c.lineTo(8,-8);c.stroke();txt(now,-6,7,'400 17px Anton','#e0102e');c.restore();}
function cord(len,col,plug='#2a2d36'){c.save();c.lineCap='round';c.lineWidth=7;c.strokeStyle=INK;c.beginPath();c.moveTo(-len/2,0);c.bezierCurveTo(-len/5,-26,len/5,26,len/2-14,0);c.stroke();c.lineWidth=4;c.strokeStyle=col;c.stroke();
  c.beginPath();c.roundRect(len/2-16,-7,22,14,3);shape(plug,2,INK);c.fillStyle='#d7dde6';c.fillRect(len/2+6,-4,9,3);c.fillRect(len/2+6,2,9,3);c.restore();}
function board(w=60,h=40){c.beginPath();c.roundRect(-w/2,-h/2,w,h,4);shape(lin(0,-h/2,0,h/2,[[0,'#2fb36a'],[1,'#137a40']]),2.5,'#06301a');
  c.strokeStyle='rgba(255,220,120,.8)';c.lineWidth=1.5;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-w/2+6,-h/2+8+i*8);c.lineTo(-4,-h/2+8+i*8);c.lineTo(2,-h/2+4+i*8);c.stroke();}
  c.beginPath();c.roundRect(4,-h/2+6,w/2-10,h-14,2);shape('#1b1d22',1.5,'#000');c.fillStyle='#c9ced8';for(let i=0;i<4;i++){c.fillRect(6+i*6,h/2-6,3,4);}}

// ============ 1) SNEAKERS in a shoebox lid ============
function soleShape(){c.beginPath();c.roundRect(-110,30,222,16,8);shape('#2b2b30',3,INK);
  c.beginPath();c.moveTo(-112,8);c.lineTo(102,8);c.quadraticCurveTo(126,10,121,26);c.quadraticCurveTo(116,40,96,40);c.lineTo(-104,40);c.quadraticCurveTo(-120,40,-117,24);c.closePath();shape(lin(0,8,0,40,[[0,'#ffffff'],[1,'#d6dae2']]),3.5,INK);
  c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=2;c.beginPath();c.moveTo(-100,24);c.quadraticCurveTo(0,30,104,22);c.stroke();
  c.fillStyle='rgba(0,0,0,.25)';for(let x=-96;x<100;x+=16)c.fillRect(x,40,8,4);}
function upperPath(){c.beginPath();c.moveTo(-108,10);c.lineTo(-114,-30);c.quadraticCurveTo(-114,-54,-92,-56);c.lineTo(-64,-52);c.quadraticCurveTo(-44,-38,-24,-46);c.lineTo(26,-30);c.quadraticCurveTo(84,-12,106,-4);c.quadraticCurveTo(124,2,117,10);c.closePath();}
function upper(acc,acc2){upperPath();shape(lin(0,-56,0,10,[[0,'#ffffff'],[1,'#dfe3ea']]),3.5,INK);
  c.save();upperPath();c.clip();
  c.beginPath();c.moveTo(-120,-8);c.bezierCurveTo(-60,-34,-10,14,40,-12);c.bezierCurveTo(70,-26,100,-6,130,-14);c.lineTo(130,12);c.lineTo(-120,12);c.closePath();c.fillStyle=lin(-110,0,120,0,[[0,acc],[1,acc2]]);c.fill();
  c.lineWidth=3;c.strokeStyle=INK;c.beginPath();c.moveTo(-120,-8);c.bezierCurveTo(-60,-34,-10,14,40,-12);c.bezierCurveTo(70,-26,100,-6,130,-14);c.stroke();
  c.setLineDash([5,5]);c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=1.5;c.beginPath();c.moveTo(-120,-15);c.bezierCurveTo(-60,-41,-10,7,40,-19);c.bezierCurveTo(70,-33,100,-13,130,-21);c.stroke();c.setLineDash([]);
  c.beginPath();c.moveTo(70,-20);c.quadraticCurveTo(96,-14,120,0);c.lineTo(120,12);c.lineTo(66,12);c.quadraticCurveTo(58,-6,70,-20);c.fillStyle='rgba(255,255,255,.55)';c.fill();
  c.fillStyle='rgba(0,0,0,.18)';for(let i=0;i<5;i++)for(let j=0;j<2;j++){ell(84+i*7,-6+j*7,1.6,1.6);c.fill();}
  c.restore();
  c.beginPath();c.roundRect(-118,-52,14,36,5);shape(acc2,3,INK);
  c.beginPath();c.moveTo(-40,-44);c.quadraticCurveTo(-36,-70,-12,-66);c.lineTo(-6,-40);c.closePath();shape(lin(0,-70,0,-40,[[0,'#f1f3f5'],[1,'#c9ced8']]),3,INK);
  for(let i=0;i<5;i++){const x=-24+i*13,y=-40+i*4.6;ell(x,y,2.6,2.6);c.fillStyle='#3a3f48';c.fill();}
  c.lineCap='round';for(let i=0;i<4;i++){const x=-24+i*13,y=-40+i*4.6;for(const [col,w] of [[INK,7],['#fff',4]]){c.lineWidth=w;c.strokeStyle=col;c.beginPath();c.moveTo(x,y-6);c.lineTo(x+13,y+4.6+6);c.moveTo(x,y+6);c.lineTo(x+13,y+4.6-6);c.stroke();}}
  gloss(-80,-40,14,5,-.1,.6);}
function sneaker(acc='#00e0a4',acc2='#00a3ff'){soleShape();upper(acc,acc2);}
function laceBit(){c.save();c.lineCap='round';for(const [col,w] of [[INK,7],['#fff',4]]){c.lineWidth=w;c.strokeStyle=col;c.beginPath();c.moveTo(-40,0);c.bezierCurveTo(-20,-22,0,22,20,-6);c.quadraticCurveTo(30,-16,40,-4);c.stroke();}c.fillStyle='#2a2a2a';c.fillRect(36,-8,10,6);c.restore();}
function lidFront(){c.beginPath();c.moveTo(-158,36);c.lineTo(158,36);c.lineTo(152,88);c.lineTo(-152,88);c.closePath();shape(lin(0,30,0,88,[[0,'#ff7a1a'],[1,'#d94e00']]),4,'#2a1200');
  c.fillStyle='#111';c.fillRect(-155,46,310,9);c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-152,39,304,4);
  c.beginPath();c.roundRect(64,58,66,24,3);shape('#fff',2,'#2a1200');c.fillStyle='#111';for(let i=0;i<14;i++)c.fillRect(70+i*4,62,i%3?1.5:2.5,12);txt('10',112,70,'800 14px Inter','#111');
  txt('KICKS',-90,71,'400 22px Anton','#111');}
function tissue(){c.beginPath();c.moveTo(-150,40);c.lineTo(-138,-2);c.lineTo(-110,14);c.lineTo(-84,-14);c.lineTo(-40,4);c.lineTo(10,-10);c.lineTo(60,6);c.lineTo(104,-16);c.lineTo(136,4);c.lineTo(152,-6);c.lineTo(154,40);c.closePath();shape(lin(0,-16,0,40,[[0,'#ffffff'],[1,'#d9dde6']]),3,'#5a5f6a');
  c.strokeStyle='rgba(0,0,0,.12)';c.lineWidth=2;for(const x of [-120,-70,-10,50,120]){c.beginPath();c.moveTo(x,0);c.lineTo(x+14,34);c.stroke();}}
function lidBack(){c.beginPath();c.moveTo(-150,6);c.lineTo(150,6);c.lineTo(156,40);c.lineTo(-156,40);c.closePath();shape(lin(0,6,0,40,[[0,'#8a3200'],[1,'#c24600']]),4,'#2a1200');}
function kicks(){c.save();c.translate(0,4);lidBack();c.save();c.translate(0,-12);tissue();c.restore();
  c.save();c.translate(36,-36);c.scale(.94,.94);sneaker('#ff3d6e','#ffd23f');c.restore();
  c.save();c.translate(-18,-2);sneaker();c.restore();
  c.save();c.translate(0,-4);lidFront();c.restore();
  c.strokeStyle='#ddd';c.lineWidth=2;c.beginPath();c.moveTo(-36,-44);c.quadraticCurveTo(-100,-60,-124,-46);c.stroke();c.save();c.translate(-146,-40);c.rotate(-.25);c.scale(1.25,1.25);priceTag('$180','$59');c.restore();c.restore();}
const kicksO={h:186,w:300,rot:-Math.PI*0.55,burst:600,up:1.25,spin:12,draw:kicks,
  parts(){const o=[];
    o.push({dx:-16,dy:-10,h:62,rest:30,draw:()=>{c.save();c.translate(0,-10);upper('#00e0a4','#00a3ff');c.restore();}});
    o.push({dx:-16,dy:30,h:36,rest:14,draw:()=>{c.save();c.translate(0,-28);soleShape();c.restore();}});
    o.push({dx:34,dy:-14,h:96,rest:40,draw:()=>{c.save();c.scale(.92,.92);sneaker('#ff3d6e','#ffd23f');c.restore();}});
    for(let i=0;i<2;i++)o.push({dx:i?20:-40,dy:-40,h:16,rest:6,drag:.6,flut:60,draw:()=>laceBit()});
    for(let i=0;i<5;i++)o.push({dx:-130+i*65,dy:58,h:26,rest:10,draw:()=>{c.save();c.rotate(i*.6);c.beginPath();c.moveTo(-30,-14);c.lineTo(26,-16);c.lineTo(32,12);c.lineTo(-26,14);c.closePath();shape(lin(0,-14,0,14,[[0,'#ff7a1a'],[1,'#c24600']]),3,'#2a1200');c.fillStyle='#111';c.fillRect(-28,-4,58,6);c.restore();}});
    for(let i=0;i<6;i++)o.push({dx:-120+i*48,dy:-10,h:20,rest:5,drag:1.6,vmax:420,flut:140,g:.55,draw:()=>{c.save();c.rotate(i);c.beginPath();c.moveTo(-26,-10);c.lineTo(-6,-16);c.lineTo(24,-8);c.lineTo(20,12);c.lineTo(-22,14);c.closePath();shape('rgba(250,250,255,.95)',2,'#8a8f9a');c.restore();}});
    o.push({dx:-140,dy:-30,h:30,rest:8,drag:1.2,vmax:500,flut:120,g:.7,draw:()=>priceTag('$180','$59')});
    for(let i=0;i<10;i++)o.push({dx:((i*37)%240)-120,dy:30,h:12,rest:4,draw:()=>chip(i,i%2?'#ff7a1a':'#f1f3f5',.9)});
    return o;},
  decal(x,g){const y=H.FLOOR_Y;c.save();c.lineCap='round';for(let i=0;i<4;i++){c.strokeStyle=`rgba(20,20,24,${.55-i*.08})`;c.lineWidth=5-i;c.beginPath();c.moveTo(x-30*g-i*14,y-3+i*2);c.lineTo(x-(130+i*20)*g,y-2+i*3);c.stroke();}c.restore();
    for(let i=0;i<22;i++){c.fillStyle=i%3?'rgba(255,122,26,.9)':'rgba(255,255,255,.9)';c.save();c.translate(x-120*g+((i*53)%240)*g,y+((i*7)%8)-4);c.rotate(i);c.fillRect(-4,-2,8,4);c.restore();}}};

// ============ 2) OVER-EAR HEADPHONES ============
function band(){c.save();c.lineCap='round';c.beginPath();c.moveTo(-96,-6);c.bezierCurveTo(-110,-150,110,-150,96,-6);
  c.lineWidth=30;c.strokeStyle=INK;c.stroke();c.lineWidth=22;c.strokeStyle='#e0263a';c.stroke();c.lineWidth=8;c.strokeStyle='rgba(255,255,255,.25)';c.beginPath();c.moveTo(-90,-40);c.bezierCurveTo(-90,-128,90,-128,90,-40);c.stroke();
  c.beginPath();c.moveTo(-70,-78);c.bezierCurveTo(-60,-124,60,-124,70,-78);c.lineWidth=26;c.strokeStyle=INK;c.stroke();c.lineWidth=19;c.strokeStyle='#26272e';c.stroke();
  c.setLineDash([4,5]);c.lineWidth=1.5;c.strokeStyle='rgba(255,255,255,.35)';c.beginPath();c.moveTo(-64,-82);c.bezierCurveTo(-54,-118,54,-118,64,-82);c.stroke();c.setLineDash([]);c.restore();}
function slider(){c.beginPath();c.roundRect(-6,-34,12,44,4);shape(lin(-6,0,6,0,[[0,'#f1f3f5'],[.5,'#9aa3ae'],[1,'#5a6370']]),2.5,INK);c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=1.5;for(let y=-28;y<6;y+=7){c.beginPath();c.moveTo(-6,y);c.lineTo(6,y);c.stroke();}}
function cup(side){c.save();c.scale(side,1);
  c.beginPath();c.roundRect(-14,-62,40,124,20);shape(lin(-14,0,26,0,[[0,'#3a3b44'],[1,'#121318']]),3.5,INK);
  c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=2;for(let y=-50;y<56;y+=12){c.beginPath();c.moveTo(-8,y);c.quadraticCurveTo(6,y+3,20,y);c.stroke();}
  c.beginPath();c.roundRect(-50,-58,46,116,22);shape(rad(-40,-24,4,90,[[0,'#ff7a86'],[.5,'#e0263a'],[1,'#7a0010']]),4,INK);
  ell(-27,0,14,30);shape(lin(0,-30,0,30,[[0,'#d9dde6'],[1,'#7a828e']]),3,INK);ell(-27,0,7,16);c.fillStyle='#e0263a';c.fill();
  gloss(-40,-30,5,16,0,.55);c.restore();}
function headphones(){c.save();c.translate(0,22);band();
  c.save();c.translate(-100,-14);slider();c.restore();c.save();c.translate(100,-14);slider();c.restore();
  c.save();c.translate(-96,48);cup(1);c.restore();c.save();c.translate(96,48);cup(-1);c.restore();
  c.strokeStyle=INK;c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(-118,96);c.bezierCurveTo(-130,120,-60,118,-40,108);c.stroke();c.lineWidth=3.5;c.strokeStyle='#2a2b33';c.stroke();
  c.beginPath();c.roundRect(-44,100,22,12,3);shape('#2a2d36',2,INK);c.fillStyle='#d7dde6';c.fillRect(-22,104,12,4);
  c.save();c.translate(120,-40);c.rotate(.3);c.strokeStyle='#ddd';c.lineWidth=2;c.beginPath();c.moveTo(-14,-20);c.lineTo(0,0);c.stroke();c.translate(22,12);c.rotate(.6);priceTag('$349','$99','#ffd23f');c.restore();c.restore();}
const phonesO={h:236,w:280,rot:-Math.PI*1.1,burst:640,up:1.35,spin:20,draw:headphones,
  parts(){const o=[];
    o.push({dx:-96,dy:68,h:120,rest:24,draw:()=>{c.rotate(Math.PI/2);c.save();c.translate(18,0);cup(1);c.restore();}});
    o.push({dx:96,dy:68,h:120,rest:24,draw:()=>{c.rotate(-Math.PI/2);c.save();c.translate(-18,0);cup(-1);c.restore();}});
    o.push({dx:-50,dy:-80,h:40,rest:14,draw:()=>{c.save();c.lineCap='round';c.beginPath();c.moveTo(-46,40);c.bezierCurveTo(-50,-10,0,-28,40,-30);c.lineWidth=30;c.strokeStyle=INK;c.stroke();c.lineWidth=22;c.strokeStyle='#e0263a';c.stroke();c.lineWidth=16;c.strokeStyle='#26272e';c.beginPath();c.moveTo(-20,-4);c.quadraticCurveTo(0,-22,30,-24);c.stroke();c.restore();}});
    o.push({dx:50,dy:-80,h:40,rest:14,draw:()=>{c.save();c.scale(-1,1);c.lineCap='round';c.beginPath();c.moveTo(-46,40);c.bezierCurveTo(-50,-10,0,-28,40,-30);c.lineWidth=30;c.strokeStyle=INK;c.stroke();c.lineWidth=22;c.strokeStyle='#e0263a';c.stroke();c.restore();}});
    for(let i=0;i<2;i++)o.push({dx:i?100:-100,dy:0,h:12,rest:6,draw:()=>{c.rotate(Math.PI/2);slider();}});
    for(let i=0;i<2;i++)o.push({dx:i?60:-60,dy:60,h:30,rest:12,draw:()=>{c.beginPath();c.roundRect(-20,-14,40,28,12);shape(lin(0,-14,0,14,[[0,'#3a3b44'],[1,'#121318']]),3,INK);}});
    o.push({dx:-30,dy:110,h:14,rest:5,draw:()=>cord(120,'#2a2b33')});
    o.push({dx:130,dy:-30,h:30,rest:8,drag:1.2,vmax:500,flut:120,g:.7,draw:()=>priceTag('$349','$99','#ffd23f')});
    for(let i=0;i<6;i++)o.push({dx:((i*41)%200)-100,dy:20,h:12,rest:5,draw:()=>screw()});
    for(let i=0;i<14;i++)o.push({dx:((i*37)%240)-120,dy:((i*29)%120)-40,h:14,rest:5,draw:()=>chip(i,i%3?'#e0263a':'#26272e')});
    for(let i=0;i<2;i++)o.push({dx:i?40:-40,dy:40,h:20,rest:6,draw:()=>{c.save();c.strokeStyle='#c9ced8';c.lineWidth=3;c.beginPath();for(let t=0;t<=1;t+=.02)c.lineTo(-20+t*40,Math.sin(t*Math.PI*10)*7);c.stroke();c.restore();}});
    return o;},
  decal(x,g){const y=H.FLOOR_Y;for(let i=0;i<26;i++){c.save();c.translate(x-130*g+((i*47)%260)*g,y+((i*5)%8)-4);c.rotate(i);c.beginPath();c.moveTo(-5,-3);c.lineTo(4,-4);c.lineTo(5,3);c.lineTo(-4,3);c.closePath();c.fillStyle=i%3?'rgba(224,38,58,.9)':'rgba(40,40,48,.9)';c.fill();c.restore();}}};

// ============ 3) GAME CONSOLE + CONTROLLER (generic) ============
function consoleBody(){
  c.beginPath();c.roundRect(-146,-30,292,96,14);shape(lin(0,-30,0,66,[[0,'#ffffff'],[.55,'#e6e9ef'],[1,'#b9bfca']]),4,INK);
  c.beginPath();c.roundRect(-146,4,292,26,4);shape(lin(0,4,0,30,[[0,'#2a2c34'],[1,'#0e0f14']]),3,INK);
  c.fillStyle='rgba(255,255,255,.08)';for(let x=-136;x<136;x+=10)c.fillRect(x,8,5,18);
  c.save();c.shadowColor='#3dd6ff';c.shadowBlur=18;c.fillStyle='#7fe6ff';c.fillRect(-140,15,280,3);c.restore();
  c.fillStyle='#1b1d22';c.beginPath();c.roundRect(-110,-14,150,5,2);c.fill();
  ell(118,-14,7,7);shape('#e9ecef',2,'#5a5f6a');ell(118,-14,3,3);c.fillStyle='#3dd6ff';c.fill();
  for(const x of [76,94]){c.beginPath();c.roundRect(x,46,12,7,1.5);shape('#1b1d22',1.5,'#000');}
  c.fillStyle='rgba(255,255,255,.7)';c.fillRect(-138,-26,276,3);
  c.fillStyle='#2a2c34';c.fillRect(-128,66,30,6);c.fillRect(98,66,30,6);}
function pad(col='#2b2f3a'){c.beginPath();c.moveTo(-70,-26);c.quadraticCurveTo(0,-34,70,-26);c.quadraticCurveTo(92,-24,96,0);c.lineTo(104,30);c.quadraticCurveTo(108,52,88,54);c.quadraticCurveTo(72,56,62,36);c.quadraticCurveTo(0,26,-62,36);c.quadraticCurveTo(-72,56,-88,54);c.quadraticCurveTo(-108,52,-104,30);c.lineTo(-96,0);c.quadraticCurveTo(-92,-24,-70,-26);c.closePath();
  shape(lin(0,-30,0,56,[[0,'#4a4f5c'],[.5,col],[1,'#15171d']]),4,INK);
  c.beginPath();c.roundRect(-28,-22,56,22,6);shape('#16181e',2,INK);c.save();c.shadowColor='#3dd6ff';c.shadowBlur=10;c.fillStyle='#7fe6ff';c.fillRect(-20,-27,40,3);c.restore();
  c.fillStyle='#c9ced8';for(const [x,y,w,h] of [[-74,-6,12,30],[-83,3,30,12]]){c.beginPath();c.roundRect(x,y,w,h,3);c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke();}
  const B=[['#3dd68c',0,-14],['#ff4d6d',13,-1],['#4dabf7',-13,-1],['#ffd23f',0,12]];for(const [col,x,y] of B){ell(68+x,y,7,7);shape(col,2,INK);gloss(66+x,y-2,2.5,1.5,0,.7);}
  for(const x of [-34,34]){ell(x,18,15,15);shape('#16181e',3,INK);ell(x,17,10,10);shape(rad(x-3,14,1,12,[[0,'#5a5f6a'],[1,'#22252c']]),2,INK);}
  gloss(-60,-18,18,4,-.05,.25);}
function consoleSet(){c.save();c.translate(0,-30);consoleBody();c.restore();
  c.save();c.translate(-34,64);c.rotate(-.08);pad();c.restore();
  c.save();c.translate(130,-60);c.strokeStyle='#ddd';c.lineWidth=2;c.beginPath();c.moveTo(-6,0);c.lineTo(10,18);c.stroke();c.translate(14,36);c.rotate(.9);priceTag('$499','$249');c.restore();}
function disc(){ell(0,0,30,30);const g=c.createConicGradient(0,0,0);[[0,'#e9ecef'],[.15,'#ff9ad5'],[.3,'#9ad8ff'],[.45,'#f1f3f5'],[.6,'#b6ffcf'],[.75,'#ffe59a'],[1,'#e9ecef']].forEach(([o,col])=>g.addColorStop(o,col));shape(g,2.5,'#5a5f6a');ell(0,0,7,7);shape('#2b2f3a',2,'#5a5f6a');}
const consoleO={h:220,w:300,rot:-Math.PI*0.6,burst:620,up:1.3,spin:16,draw:consoleSet,
  parts(){const o=[];
    o.push({dx:-74,dy:-30,h:96,rest:30,draw:()=>{c.save();c.beginPath();c.rect(-72,-60,146,120);c.clip();c.translate(74,0);consoleBody();c.restore();c.strokeStyle=INK;c.lineWidth=3;c.beginPath();c.moveTo(72,-30);c.lineTo(64,0);c.lineTo(74,20);c.lineTo(66,66);c.stroke();}});
    o.push({dx:74,dy:-30,h:96,rest:30,draw:()=>{c.save();c.beginPath();c.rect(-74,-60,146,140);c.clip();c.translate(-74,0);consoleBody();c.restore();}});
    o.push({dx:-34,dy:64,h:60,rest:24,draw:()=>{c.save();c.beginPath();c.rect(-110,-40,110,100);c.clip();pad();c.restore();}});
    o.push({dx:20,dy:64,h:60,rest:24,draw:()=>{c.save();c.beginPath();c.rect(0,-40,110,100);c.clip();c.translate(-54,0);pad();c.restore();}});
    o.push({dx:0,dy:-50,h:8,rest:4,g:.8,draw:()=>disc()});
    o.push({dx:20,dy:-20,h:40,rest:12,draw:()=>board(70,44)});
    const B=['#3dd68c','#ff4d6d','#4dabf7','#ffd23f'];for(let i=0;i<4;i++)o.push({dx:30+i*12,dy:56,h:14,rest:7,draw:()=>{ell(0,0,7,7);shape(B[i],2,INK);gloss(-2,-2,2.5,1.5,0,.7);}});
    for(let i=0;i<2;i++)o.push({dx:i?0:-68,dy:80,h:22,rest:10,draw:()=>{ell(0,0,10,10);shape('#22252c',2,INK);c.beginPath();c.roundRect(-4,8,8,10,2);shape('#16181e',2,INK);}});
    o.push({dx:-110,dy:62,h:10,rest:4,draw:()=>{c.fillStyle='#c9ced8';c.beginPath();c.roundRect(-6,-15,12,30,3);c.fill();c.beginPath();c.roundRect(-15,-6,30,12,3);c.fill();c.lineWidth=2;c.strokeStyle=INK;c.stroke();}});
    o.push({dx:140,dy:-30,h:30,rest:8,drag:1.2,vmax:500,flut:120,g:.7,draw:()=>priceTag('$499','$249')});
    for(let i=0;i<16;i++)o.push({dx:((i*37)%280)-140,dy:((i*23)%80)-40,h:14,rest:5,draw:()=>chip(i,i%3?'#f1f3f5':'#1b1d22')});
    for(let i=0;i<5;i++)o.push({dx:((i*53)%200)-100,dy:-10,h:12,rest:5,draw:()=>screw()});
    for(let i=0;i<8;i++)o.push({dx:((i*31)%160)-80,dy:-20,h:8,rest:3,g:.5,draw:()=>spark(i)});
    return o;},
  decal(x,g){const y=H.FLOOR_Y;c.save();ell(x,y+1,150*g,10*g);c.fillStyle=rad(x,y,4,150,[[0,'rgba(61,214,255,.35)'],[1,'rgba(61,214,255,0)']]);c.fill();c.restore();
    for(let i=0;i<30;i++){c.save();c.translate(x-140*g+((i*43)%280)*g,y+((i*7)%8)-4);c.rotate(i);c.fillStyle=['rgba(241,243,245,.95)','rgba(27,29,34,.95)','rgba(241,243,245,.95)','#3dd68c','#ff4d6d','#4dabf7','#ffd23f'][i%7];c.fillRect(-4,-2.5,8,5);c.restore();}}};

// ============ 4) FLAT-SCREEN TV with -70% sticker ============
function screenArt(){
  c.fillStyle=lin(0,-112,0,62,[[0,'#1c0a4a'],[.45,'#c2185b'],[.7,'#ff8a3d'],[.72,'#14052a'],[1,'#0a0220']]);c.fillRect(-142,-114,284,178);
  c.fillStyle='rgba(255,255,255,.85)';for(let i=0;i<18;i++){c.fillRect(-136+((i*61)%270),-108+((i*37)%60),2,2);}
  c.save();c.beginPath();c.rect(-142,-114,284,124);c.clip();ell(20,-6,50,50);c.fillStyle=lin(0,-56,0,44,[[0,'#fff3b0'],[.5,'#ffb000'],[1,'#ff3d6e']]);c.fill();
  c.fillStyle='#c2185b';for(let i=0;i<5;i++)c.fillRect(-40,-14+i*9,120,2+i*1.2);c.restore();
  c.beginPath();c.moveTo(-142,10);c.lineTo(-100,-30);c.lineTo(-70,-8);c.lineTo(-30,-44);c.lineTo(-4,10);c.closePath();c.fillStyle='#3a1060';c.fill();
  c.beginPath();c.moveTo(40,10);c.lineTo(84,-36);c.lineTo(110,-14);c.lineTo(142,-40);c.lineTo(142,10);c.closePath();c.fillStyle='#2a0a4a';c.fill();
  c.fillStyle='#14052a';c.fillRect(-142,10,284,54);
  c.strokeStyle='rgba(255,61,166,.85)';c.lineWidth=1.6;for(let k=-8;k<=8;k++){c.beginPath();c.moveTo(20+k*6,10);c.lineTo(20+k*40,64);c.stroke();}
  for(const yy of [14,20,28,38,52]){c.beginPath();c.moveTo(-142,yy);c.lineTo(142,yy);c.stroke();}
  c.fillStyle='rgba(255,255,255,.08)';c.beginPath();c.moveTo(-142,-114);c.lineTo(-40,-114);c.lineTo(-150,64);c.closePath();c.fill();
  c.fillStyle='rgba(255,255,255,.05)';c.beginPath();c.moveTo(-10,-114);c.lineTo(20,-114);c.lineTo(-90,64);c.lineTo(-120,64);c.closePath();c.fill();}
function starburst(R,r,n,ts){c.beginPath();for(let i=0;i<n*2;i++){const a=i*Math.PI/n,rr=i%2?r:R;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();shape(rad(-10,-12,4,R,[[0,'#ff5a5a'],[.6,'#e8001c'],[1,'#a00014']]),4,'#2a0006');
  ell(0,0,r*.8,r*.8);c.lineWidth=2.5;c.setLineDash([5,4]);c.strokeStyle='rgba(255,255,255,.75)';c.stroke();c.setLineDash([]);
  txt('-70%',0,-4,`400 ${ts}px Anton`,'#fff','#5a000a',5);txt('OFF',0,ts*.62,'800 13px Inter','#ffd23f');}
function tvBezel(){c.beginPath();c.roundRect(-152,-124,304,200,10);shape(lin(0,-124,0,76,[[0,'#3a3d48'],[.5,'#1b1d24'],[1,'#0c0d12']]),4,'#000');
  c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=2;c.beginPath();c.moveTo(-146,-121);c.lineTo(146,-121);c.stroke();}
function tv(){
  c.beginPath();c.roundRect(-20,72,40,34,4);shape(lin(-20,0,20,0,[[0,'#5a5f6a'],[.5,'#c9ced8'],[1,'#3a3f48']]),3,'#000');
  c.beginPath();c.moveTo(-90,124);c.lineTo(-70,102);c.lineTo(70,102);c.lineTo(90,124);c.closePath();shape(lin(0,102,0,124,[[0,'#c9ced8'],[1,'#5a5f6a']]),3,'#000');
  tvBezel();c.save();c.beginPath();c.rect(-142,-114,284,178);c.clip();screenArt();c.restore();
  c.beginPath();c.rect(-142,-114,284,178);c.lineWidth=2;c.strokeStyle='#000';c.stroke();
  ell(0,70,3,2);c.fillStyle='#ff3b3b';c.fill();ell(0,70,7,4);c.fillStyle='rgba(255,59,59,.3)';c.fill();
  c.save();c.translate(116,-96);c.rotate(-.22);starburst(54,44,16,34);c.restore();
  c.save();c.translate(-150,-60);c.strokeStyle='#ddd';c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(-10,20);c.stroke();c.translate(-12,40);c.rotate(-1.35);priceTag('$1999','$599');c.restore();}
const GL=['#ff8a3d','#c2185b','#7b2ff7','#ffb000','#3dd6ff','#ff3da6'];
const tvO={h:250,w:320,rot:-Math.PI*0.4,burst:700,up:1.3,spin:22,draw:tv,
  parts(){const o=[];
    const P=[];for(let i=0;i<=4;i++){P.push([]);for(let j=0;j<=2;j++){const jx=(i%4?1:0)*(((i*7+j*13)%9)-4)*5,jy=(j%2?1:0)*(((i*11+j*5)%9)-4)*5;P[i].push([-142+i*71+jx,-114+j*89+jy]);}}
    for(let i=0;i<4;i++)for(let j=0;j<2;j++){const q=[P[i][j],P[i+1][j],P[i+1][j+1],P[i][j+1]];const cx=q.reduce((a,b)=>a+b[0],0)/4,cy=q.reduce((a,b)=>a+b[1],0)/4;
      o.push({dx:cx,dy:cy,h:30,rest:8,draw:()=>{c.save();c.translate(-cx,-cy);c.beginPath();q.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.save();c.clip();screenArt();c.restore();c.beginPath();q.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.lineWidth=3;c.strokeStyle='#000';c.stroke();c.lineWidth=1.5;c.strokeStyle='rgba(255,255,255,.8)';c.stroke();
        c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=1.2;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+20,cy-24);c.moveTo(cx,cy);c.lineTo(cx-26,cy+10);c.moveTo(cx,cy);c.lineTo(cx+8,cy+30);c.stroke();c.restore();}});}
    for(let i=0;i<34;i++){const col=GL[i%6];o.push({dx:((i*47)%280)-140,dy:((i*61)%170)-112,h:16,rest:4,draw:()=>shard(i,lin(-10,-12,10,12,[[0,'#ffffff'],[.25,col],[1,'#3a1060']]),1.1)});}
    const corner=(sx,sy)=>()=>{c.save();c.scale(sx,sy);c.beginPath();c.moveTo(-60,-50);c.lineTo(60,-50);c.lineTo(54,-40);c.lineTo(-50,-40);c.lineTo(-50,40);c.lineTo(-60,52);c.closePath();shape(lin(-60,-50,0,0,[[0,'#3a3d48'],[1,'#15161c']]),3,'#000');c.restore();};
    o.push({dx:-92,dy:-74,h:20,rest:8,draw:corner(1,1)});o.push({dx:92,dy:-74,h:20,rest:8,draw:corner(-1,1)});o.push({dx:-92,dy:26,h:20,rest:8,draw:corner(1,-1)});o.push({dx:92,dy:26,h:20,rest:8,draw:corner(-1,-1)});
    o.push({dx:0,dy:70,h:16,rest:8,draw:()=>{c.beginPath();c.roundRect(-150,-8,300,16,5);shape('#15161c',3,'#000');ell(0,0,3,2);c.fillStyle='#ff3b3b';c.fill();}});
    o.push({dx:0,dy:112,h:24,rest:11,draw:()=>{c.beginPath();c.moveTo(-90,12);c.lineTo(-70,-10);c.lineTo(70,-10);c.lineTo(90,12);c.closePath();shape(lin(0,-10,0,12,[[0,'#c9ced8'],[1,'#5a5f6a']]),3,'#000');}});
    o.push({dx:-10,dy:86,h:34,rest:10,draw:()=>{c.beginPath();c.roundRect(-20,-17,40,34,4);shape('#9aa3ae',3,'#000');}});
    o.push({dx:116,dy:-96,h:20,rest:4,drag:1.1,vmax:520,flut:160,g:.65,draw:()=>starburst(54,44,16,34)});
    o.push({dx:-160,dy:-20,h:30,rest:8,drag:1.2,vmax:500,flut:120,g:.7,draw:()=>priceTag('$1999','$599')});
    o.push({dx:-40,dy:0,h:44,rest:12,draw:()=>board(90,50)});o.push({dx:40,dy:-20,h:40,rest:12,draw:()=>board(60,40)});
    o.push({dx:60,dy:60,h:14,rest:5,draw:()=>cord(140,'#1b1d24')});
    for(let i=0;i<14;i++)o.push({dx:((i*29)%200)-100,dy:-30,h:8,rest:3,g:.45,draw:()=>spark(i)});
    for(let i=0;i<8;i++)o.push({dx:((i*41)%260)-130,dy:40,h:14,rest:5,draw:()=>chip(i,'#1b1d24',1,'#000')});
    return o;},
  decal(x,g){const y=H.FLOOR_Y;c.save();ell(x,y+1,190*g,13*g);c.fillStyle=rad(x,y,4,190,[[0,'rgba(255,61,166,.45)'],[.5,'rgba(123,47,247,.25)'],[1,'rgba(123,47,247,0)']]);c.fill();c.restore();
    for(let i=0;i<46;i++){c.save();c.translate(x-170*g+((i*61)%340)*g,y+((i*7)%10)-5);c.rotate(i);c.beginPath();c.moveTo(0,-4);c.lineTo(6,3);c.lineTo(-5,3);c.closePath();c.fillStyle=i%5?['rgba(255,138,61,.95)','rgba(194,24,91,.95)','rgba(123,47,247,.95)','rgba(61,214,255,.95)'][i%4]:'rgba(255,255,255,.95)';c.fill();c.restore();}}};

function S(o,k=1.1){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[kicksO,phonesO,consoleO,tvO].forEach(o=>S(o,1.05));

return {tag:'CHALLENGE #27',ask:'WHICH DEAL WOULD YOU GRAB? &darr;',askStyle:{background:'#ffd400',color:'#0b0b10',border:'5px solid #0b0b10',boxShadow:'0 0 0 4px #ffd400, 0 10px 40px rgba(0,0,0,.7)'},
 palette:{wallTop:'#07070b',wallBot:'#2a2433',sky1:'#0a0f2a',sky2:'#3a2a6a',night:true,floorA:'#16161c',floorB:'#d6a600'},
 objects:{sneakers:kicksO,headphones:phonesO,console:consoleO,tv:tvO},
 onTable(f){const y=880;
   // hanging BLACK FRIDAY sale sign (on the wall above the table)
   const sx=80,sy=566,sw=400,sh=128;c.strokeStyle='#8a8f9a';c.lineWidth=3;c.beginPath();c.moveTo(sx+60,sy);c.lineTo(sx+90,sy-26);c.lineTo(sx+sw-90,sy-26);c.lineTo(sx+sw-60,sy);c.stroke();
   ell(sx+90,sy-26,5,5);c.fillStyle='#c9ced8';c.fill();ell(sx+sw-90,sy-26,5,5);c.fill();
   c.save();c.shadowColor='rgba(255,212,0,.45)';c.shadowBlur=40;c.beginPath();c.roundRect(sx,sy,sw,sh,16);c.fillStyle='#0b0b10';c.fill();c.restore();
   c.beginPath();c.roundRect(sx,sy,sw,sh,16);c.lineWidth=6;c.strokeStyle='#ffd400';c.stroke();
   for(let i=0;i<22;i++){const t=i/22;let bx,by;const per=2*(sw+sh);let d=t*per;if(d<sw){bx=sx+d;by=sy;}else if(d<sw+sh){bx=sx+sw;by=sy+d-sw;}else if(d<2*sw+sh){bx=sx+sw-(d-sw-sh);by=sy+sh;}else{bx=sx;by=sy+sh-(d-2*sw-sh);}
     const on=((i+(f>>2))%3)!==0;ell(bx,by,5,5);c.fillStyle=on?'#fff6c2':'#6a5a10';c.fill();if(on){ell(bx,by,11,11);c.fillStyle='rgba(255,220,80,.3)';c.fill();}}
   c.save();c.shadowColor='rgba(255,212,0,.8)';c.shadowBlur=18;txt('BLACK FRIDAY',sx+sw/2,sy+52,'400 66px Anton','#ffd400');c.restore();
   c.beginPath();c.roundRect(sx+70,sy+86,sw-140,30,8);c.fillStyle='#e8001c';c.fill();txt('UP TO 70% OFF',sx+sw/2,sy+102,'800 24px Inter','#fff');
   // shopping bags
   function bag(x,w,h,col1,col2,handle,label,lc){const top=y-h;
     c.lineCap='round';c.lineWidth=7;c.strokeStyle=INK;c.beginPath();c.moveTo(x+w*.3,top+4);c.bezierCurveTo(x+w*.3,top-52,x+w*.7,top-52,x+w*.7,top+4);c.stroke();c.lineWidth=4;c.strokeStyle=handle;c.stroke();
     c.beginPath();c.moveTo(x,top);c.lineTo(x+w,top);c.lineTo(x+w+6,y);c.lineTo(x-6,y);c.closePath();shape(lin(x,0,x+w,0,[[0,col1],[1,col2]]),4,INK);
     c.fillStyle='rgba(255,255,255,.14)';c.fillRect(x+6,top+4,8,h-8);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(x,top,w,8);
     txt(label,x+w/2,top+h*.55,`400 ${Math.round(w*.3)}px Anton`,lc);}
   bag(52,124,124,'#1b1d24','#07070b','#ffd400','SALE','#ffd400');
   bag(186,108,104,'#ff2a3d','#b80018','#fff','-50%','#fff');}};};
