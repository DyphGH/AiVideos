// Video #28 — hot dog crimes: four cursed hot dogs (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#2a1a10';
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function blob(col,i,r=12,st='#2a1a10'){ell(0,0,r+(i%3)*4,r*.8+(i%2)*3,i);shape(col,2,st);ell(-r*.3,-r*.3,r*.3,r*.18,i);c.fillStyle='rgba(255,255,255,.45)';c.fill();}
const SPR=['#ff4d6d','#4dabf7','#51cf66','#ffd43b','#cc5de8','#ff922b'];
function sprinkle(x,y,i){c.save();c.translate(x,y);c.rotate(i*1.7);c.beginPath();c.roundRect(-6,-2,12,4,2);c.fillStyle=SPR[i%6];c.fill();c.restore();}
// ---------- shared hot dog: checker liner, bun, sausage, paper tray ----------
function liner(){c.save();c.beginPath();c.moveTo(-126,46);for(let x=-126;x<=126;x+=18)c.lineTo(x+9,(x/18)%2?20:30),c.lineTo(x+18,26);c.lineTo(126,46);c.closePath();c.fillStyle='#fffaf0';c.fill();c.clip();
  c.fillStyle='#e03131';for(let x=-130;x<130;x+=16)for(let y=16;y<50;y+=16)if(((x+130)/16+(y-16)/16)%2<1)c.fillRect(x,y,16,16);c.restore();
  c.beginPath();c.moveTo(-126,46);for(let x=-126;x<=126;x+=18)c.lineTo(x+9,(x/18)%2?20:30),c.lineTo(x+18,26);c.lineTo(126,46);c.lineWidth=3;c.strokeStyle='#7a1010';c.lineJoin='round';c.stroke();}
function bunBack(){c.beginPath();c.roundRect(-118,-34,236,76,36);shape(lin(0,-34,0,40,[[0,'#b85e18'],[.25,'#e39a45'],[.7,'#f4c27a'],[1,'#f7d49a']]),5,O);
  ell(-40,-22,60,7,-.03);c.fillStyle='rgba(255,236,190,.5)';c.fill();ell(70,-24,24,4);c.fillStyle='rgba(255,236,190,.35)';c.fill();
  c.fillStyle='rgba(120,60,10,.25)';for(let i=0;i<14;i++){ell(-96+i*14,-14+((i*7)%10),1.6,1.2);c.fill();}}
function sausage(){c.beginPath();c.roundRect(-140,-10,280,38,19);shape(lin(0,-10,0,28,[[0,'#f0704a'],[.35,'#c93b22'],[.8,'#8e2412'],[1,'#6a1a0c']]),5,'#3a0e06');
  c.save();c.beginPath();c.roundRect(-140,-10,280,38,19);c.clip();c.strokeStyle='rgba(60,15,5,.55)';c.lineWidth=6;c.lineCap='round';
  for(let x=-108;x<=120;x+=34){c.beginPath();c.moveTo(x,-12);c.lineTo(x-16,30);c.stroke();}
  c.fillStyle='rgba(60,15,5,.35)';ell(-140,9,14,19);c.fill();ell(140,9,14,19);c.fill();c.restore();
  c.beginPath();c.roundRect(-118,-4,200,5,3);c.fillStyle='rgba(255,220,200,.55)';c.fill();ell(-128,0,4,3);c.fillStyle='rgba(255,230,210,.6)';c.fill();}
function bunFront(){c.beginPath();c.moveTo(-122,12);c.quadraticCurveTo(-130,62,-92,64);c.lineTo(92,64);c.quadraticCurveTo(130,62,122,12);c.quadraticCurveTo(60,30,0,28);c.quadraticCurveTo(-60,30,-122,12);c.closePath();
  shape(lin(0,12,0,64,[[0,'#fbe6bd'],[.14,'#f2bd6e'],[.5,'#d98b3a'],[1,'#a8581c']]),5,O);
  c.beginPath();c.moveTo(-116,18);c.quadraticCurveTo(-60,34,0,32);c.quadraticCurveTo(60,34,116,18);c.lineWidth=4;c.strokeStyle='rgba(255,248,225,.85)';c.stroke();
  ell(-60,46,30,5,.05);c.fillStyle='rgba(255,230,180,.35)';c.fill();}
function trayFront(){c.beginPath();c.moveTo(-134,50);c.lineTo(134,50);c.lineTo(114,100);c.quadraticCurveTo(0,106,-114,100);c.closePath();
  shape(lin(0,50,0,104,[[0,'#ff5a5f'],[.5,'#e03131'],[1,'#9d0208']]),5,'#3a0606');
  c.save();c.beginPath();c.moveTo(-134,50);c.lineTo(134,50);c.lineTo(114,100);c.quadraticCurveTo(0,106,-114,100);c.closePath();c.clip();
  c.fillStyle='#fff6e0';c.fillRect(-140,64,280,22);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(-140,50,280,6);
  c.fillStyle='rgba(0,0,0,.12)';for(let x=-120;x<130;x+=22)c.fillRect(x,56,2,8);c.restore();
  c.save();c.fillStyle='#c1121f';c.font='400 20px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText('★ HOT DOGS ★',0,75.5);c.restore();}
function hotdog(top,over){liner();bunBack();sausage();top();bunFront();if(over)over();trayFront();}
// shared break parts
function baseParts(){return [
  {dx:0,dy:78,h:50,rest:20,draw:()=>{c.save();c.scale(.62,.62);c.translate(0,-70);trayFront();c.restore();}},
  {dx:-70,dy:20,h:56,rest:26,draw:()=>{c.beginPath();c.roundRect(-66,-26,132,52,26);shape(lin(0,-26,0,26,[[0,'#c46a1c'],[.4,'#f0b060'],[1,'#f7d49a']]),4,O);ell(-14,-16,34,5);c.fillStyle='rgba(255,236,190,.5)';c.fill();}},
  {dx:70,dy:40,h:44,rest:20,draw:()=>{c.beginPath();c.moveTo(-64,-14);c.quadraticCurveTo(0,0,64,-14);c.quadraticCurveTo(70,20,44,22);c.lineTo(-44,22);c.quadraticCurveTo(-70,20,-64,-14);c.closePath();shape(lin(0,-14,0,22,[[0,'#fbe6bd'],[.4,'#f0b060'],[1,'#b8662a']]),4,O);}},
  {dx:-50,dy:10,h:36,rest:17,draw:()=>sausageHalf(1)},{dx:50,dy:10,h:36,rest:17,draw:()=>sausageHalf(-1)},
  {dx:-20,dy:40,h:30,rest:4,drag:2.5,vmax:260,flut:120,draw:()=>linerScrap(0)},{dx:30,dy:40,h:30,rest:4,drag:2.5,vmax:240,flut:140,draw:()=>linerScrap(1)}];}
function sausageHalf(s){c.save();c.scale(s,1);c.beginPath();c.moveTo(66,-17);c.lineTo(-52,-17);c.arc(-52,0,17,-Math.PI/2,Math.PI/2,true);c.lineTo(66,17);c.lineTo(60,10);c.lineTo(68,3);c.lineTo(58,-5);c.lineTo(66,-11);c.closePath();
  shape(lin(0,-17,0,17,[[0,'#f0704a'],[.4,'#c93b22'],[1,'#7a1c0e']]),4,'#3a0e06');c.beginPath();c.moveTo(64,-14);c.lineTo(58,-5);c.lineTo(68,3);c.lineTo(60,10);c.lineTo(64,15);c.lineTo(72,0);c.closePath();c.fillStyle='#f2a08a';c.fill();
  c.strokeStyle='rgba(60,15,5,.5)';c.lineWidth=5;c.lineCap='round';for(const x of [-30,6,40]){c.beginPath();c.moveTo(x,-15);c.lineTo(x-10,15);c.stroke();}c.beginPath();c.roundRect(-50,-11,90,4,2);c.fillStyle='rgba(255,220,200,.5)';c.fill();c.restore();}
function linerScrap(i){c.save();c.rotate(i?.4:-.3);c.beginPath();c.roundRect(-22,-18,44,36,3);c.fillStyle='#fffaf0';c.fill();c.clip();c.fillStyle='#e03131';for(let x=-24;x<24;x+=12)for(let y=-20;y<20;y+=12)if(((x+24)/12+(y+20)/12)%2<1)c.fillRect(x,y,12,12);c.restore();
  c.save();c.rotate(i?.4:-.3);c.beginPath();c.roundRect(-22,-18,44,36,3);c.lineWidth=2;c.strokeStyle='#7a1010';c.stroke();c.restore();}
function pool(x,g,R,col,n=24,seedK=2.7,yo=2){c.beginPath();for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,r=(R+Math.sin(i*seedK)*R*.2)*g;c.lineTo(x+Math.cos(a)*r*1.45,H.FLOOR_Y+yo+Math.sin(a)*r*0.27);}c.closePath();c.fillStyle=col;c.fill();}
// ================= 1 — ICE CREAM DOG =================
function scoop(x,y,r,c1,c2,c3,drip=0){c.beginPath();c.arc(x,y,r,Math.PI*1.02,Math.PI*-0.02);
  const pts=6;for(let i=0;i<=pts;i++){const px=x+r-(2*r)*i/pts,py=y+r*.42+(i%2?r*.2:0)+(i===drip?r*.55:0);c.quadraticCurveTo(px+r/pts,py+(i%2?r*.12:-r*.02),px,py);}c.closePath();
  shape(rad(x-r*.35,y-r*.45,3,r*1.3,[[0,c1],[.55,c2],[1,c3]]),5,O);
  c.save();c.clip();ell(x+r*.25,y+r*.55,r*.95,r*.35);c.fillStyle='rgba(0,0,0,.07)';c.fill();c.restore();
  gloss(x-r*.38,y-r*.48,r*.24,r*.12,-.5,.7);}
function icecreamTop(){
  c.save();c.translate(52,-74);c.rotate(.5);c.beginPath();c.roundRect(-9,-44,18,84,8);shape(lin(-9,0,9,0,[[0,'#f6d28c'],[.5,'#e2a54a'],[1,'#b8742a']]),4,O);c.strokeStyle='rgba(120,60,10,.5)';c.lineWidth=2;for(let y=-36;y<36;y+=10){c.beginPath();c.moveTo(-8,y);c.lineTo(8,y+6);c.stroke();}c.restore();
  scoop(-70,-30,44,'#ffe0ef','#ff8cc0','#d14a86',3);scoop(72,-30,44,'#e6fff3','#8fe3bf','#3ea57a',4);scoop(0,-56,50,'#ffffff','#fff1d0','#e0c28a',2);
  c.fillStyle='#3a1d0e';for(const [x,y] of [[-30,-36],[18,-44],[60,-24]]){ell(x,y,3,3);c.fill();}
  c.beginPath();c.moveTo(-104,-46);c.bezierCurveTo(-80,-80,-50,-20,-24,-74);c.bezierCurveTo(0,-104,20,-40,46,-72);c.bezierCurveTo(70,-96,90,-40,112,-50);c.lineWidth=11;c.strokeStyle=O;c.lineCap='round';c.stroke();c.lineWidth=7;c.strokeStyle='#6b3a1e';c.stroke();
  c.beginPath();c.moveTo(-90,-60);c.bezierCurveTo(-78,-70,-64,-50,-56,-60);c.lineWidth=2;c.strokeStyle='rgba(255,220,190,.6)';c.stroke();
  for(let i=0;i<54;i++){const ring=i%3;const [cx,cy,r]=ring===0?[-70,-30,40]:ring===1?[72,-30,40]:[0,-56,46];const a=Math.PI*(1.1+((i*37)%80)/100),d=r*(.25+((i*53)%60)/100);sprinkle(cx+Math.cos(a)*d,cy+Math.sin(a)*d+r*.2,i);}
  c.beginPath();c.moveTo(0,-118);c.quadraticCurveTo(6,-140,22,-148);c.lineWidth=4;c.strokeStyle='#3d6b1e';c.stroke();
  ell(0,-112,16,15);shape(rad(-5,-117,2,18,[[0,'#ff8a8a'],[.5,'#e0102e'],[1,'#8a0010']]),4,'#3a0006');gloss(-6,-118,5,3,-.5,.85);}
function icecreamOver(){for(const [x,w,l,cA,cB] of [[-82,14,34,'#ff8cc0','#d14a86'],[-46,10,22,'#ff8cc0','#d14a86'],[10,13,40,'#fff6e2','#e0c28a'],[64,11,26,'#8fe3bf','#3ea57a'],[96,9,18,'#8fe3bf','#3ea57a']]){
  c.beginPath();c.moveTo(x-w,16);c.lineTo(x-w*.7,16+l);c.arc(x,16+l,w*.7,Math.PI,0,true);c.lineTo(x+w,16);c.closePath();shape(lin(0,16,0,16+l,[[0,cA],[1,cB]]),3,O);gloss(x-w*.3,18+l*.6,2.5,5,0,.6);}}
const iceO={h:220,w:290,rot:-Math.PI*0.85,burst:560,up:1.3,spin:12,draw:()=>{c.save();c.translate(0,7);hotdog(icecreamTop,icecreamOver);c.restore();},
  parts(){const o=baseParts();
    const S=[['#ffe0ef','#ff8cc0','#d14a86'],['#ffffff','#fff1d0','#e0c28a'],['#e6fff3','#8fe3bf','#3ea57a']];
    S.forEach((s,i)=>o.push({dx:(i-1)*60,dy:-60,h:52,rest:20,draw:()=>{c.save();c.scale(.7,.7);scoop(0,-6,40,...s,2);c.restore();}}));
    o.push({dx:10,dy:-110,h:30,rest:13,draw:()=>{ell(0,0,16,15);shape(rad(-5,-5,2,18,[[0,'#ff8a8a'],[.5,'#e0102e'],[1,'#8a0010']]),4,'#3a0006');gloss(-6,-6,5,3,-.5,.85);c.beginPath();c.moveTo(0,-14);c.quadraticCurveTo(6,-30,20,-34);c.lineWidth=4;c.strokeStyle='#3d6b1e';c.stroke();}});
    o.push({dx:50,dy:-80,h:18,rest:9,draw:()=>{c.save();c.rotate(1.57);c.beginPath();c.roundRect(-9,-40,18,80,8);shape('#e2a54a',4,O);c.restore();}});
    for(let i=0;i<26;i++)o.push({dx:((i*37)%220)-110,dy:-70,h:6,rest:2,draw:()=>sprinkle(0,0,i)});
    for(let i=0;i<14;i++)o.push({dx:((i*31)%200)-100,dy:-40,h:14,rest:5,drag:.5,draw:()=>blob(['#ff8cc0','#fff1d0','#8fe3bf'][i%3],i,10,'#8a5a4a')});return o;},
  decal(x,g){pool(x-30,g,70,'rgba(255,140,192,.92)',22,2.3);pool(x+50,g,56,'rgba(255,246,226,.95)',22,3.1,4);pool(x+120*g,g,34,'rgba(143,227,191,.92)',18,2.9,1);
    ell(x-30,H.FLOOR_Y-1,40*g,3*g);c.fillStyle='rgba(255,255,255,.5)';c.fill();
    for(let i=0;i<34;i++){c.save();c.translate(x-140*g+((i*41)%300)*g,H.FLOOR_Y-4+(i%6)*1.6);c.rotate(i*.9);c.fillStyle=SPR[i%6];c.fillRect(-5,-1.5,10,3);c.restore();}}};
// ================= 2 — CEREAL DOG =================
const RC=['#ff4d6d','#ff922b','#ffd43b','#51cf66','#9775fa','#4dabf7'];
function ring(x,y,r,col,rot=0){c.save();c.translate(x,y);c.rotate(rot);ell(0,0,r,r*.82);shape(rad(-r*.3,-r*.35,1,r*1.2,[[0,'rgba(255,255,255,.55)'],[.25,col],[1,col]]),3,'#4a2a10');
  ell(0,0,r*.36,r*.3);c.fillStyle='#7a4a1a';c.fill();ell(0,r*.05,r*.34,r*.22);c.fillStyle='#fffdf6';c.fill();
  c.fillStyle='rgba(0,0,0,.15)';for(let k=0;k<5;k++){ell(Math.cos(k*1.3)*r*.66,Math.sin(k*1.3)*r*.56,1.4,1.4);c.fill();}ell(-r*.45,-r*.45,r*.2,r*.1,-.6);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.restore();}
function flake(x,y,s,rot){c.save();c.translate(x,y);c.rotate(rot);c.beginPath();c.moveTo(-14*s,-6*s);c.quadraticCurveTo(-4*s,-14*s,10*s,-9*s);c.lineTo(15*s,4*s);c.quadraticCurveTo(2*s,12*s,-12*s,8*s);c.closePath();shape(lin(0,-12*s,0,10*s,[[0,'#ffd27a'],[1,'#c8781e']]),2.5,'#6a3a0a');c.restore();}
function milkTop(){c.beginPath();c.moveTo(-128,6);c.quadraticCurveTo(-120,-16,-96,-14);for(let x=-96;x<=96;x+=24)c.quadraticCurveTo(x+12,-24+((x/24)%2?4:-2),x+24,-14);c.quadraticCurveTo(124,-14,128,6);c.quadraticCurveTo(0,20,-128,6);c.closePath();
  shape(lin(0,-24,0,14,[[0,'#ffffff'],[1,'#dfe9f5']]),4,'#4a5a70');gloss(-60,-12,26,4,0,.9);}
function cerealTop(){milkTop();
  c.save();c.translate(-78,-78);c.rotate(-.55);c.beginPath();c.roundRect(-6,-56,12,80,6);shape(lin(-6,0,6,0,[[0,'#ffffff'],[.5,'#c9d1db'],[1,'#7d8794']]),3,'#2f3640');ell(0,30,17,24);shape(rad(-5,24,2,26,[[0,'#ffffff'],[1,'#9aa4b2']]),3,'#2f3640');ell(0,34,11,15);c.fillStyle='rgba(255,255,255,.95)';c.fill();c.restore();
  const rows=[[-18,7,96],[-38,6,80],[-56,5,62],[-73,3,38],[-88,2,16]];let i=0;
  for(const [y,n,span] of rows)for(let k=0;k<n;k++){const x=n>1?-span+k*(2*span/(n-1)):0;ring(x+((i*13)%9)-4,y+((i*7)%6),16+(i%3)*2,RC[(i*5)%6],i*.7);
    if(i%4===1)flake(x+14,y-10,.8+(i%2)*.2,i);i++;}
  ring(6,-104,15,RC[0],.3);
  for(const [x,y,r] of [[-30,-112,5],[40,-104,4],[70,-74,6],[-104,-40,4],[100,-50,4],[14,-128,3]]){ell(x,y,r,r*1.15);shape('#ffffff',2,'#4a5a70');}}
function cerealOver(){c.beginPath();c.moveTo(-122,14);c.quadraticCurveTo(-60,30,0,28);c.quadraticCurveTo(60,30,122,14);for(const [x,l] of [[100,22],[56,40],[10,26],[-40,48],[-90,30]]){c.lineTo(x+10,22);c.lineTo(x+8,20+l);c.arc(x,20+l,8,0,Math.PI);c.lineTo(x-10,24);}c.closePath();
  shape(lin(0,14,0,70,[[0,'#ffffff'],[1,'#dfe9f5']]),3,'#4a5a70');gloss(-40,62,2.5,5,0,.8);ring(-104,26,14,RC[2],.4);ring(84,24,13,RC[3],1);}
const cerealO={h:224,w:290,rot:-Math.PI*0.95,burst:580,up:1.35,spin:14,draw:()=>{c.save();c.translate(0,9);hotdog(cerealTop,cerealOver);c.restore();},
  parts(){const o=baseParts();for(let i=0;i<28;i++)o.push({dx:((i*41)%220)-110,dy:-50-((i*17)%40),h:30,rest:12,draw:()=>ring(0,0,15+(i%3)*2,RC[(i*5)%6],i)});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*40,dy:-40,h:18,rest:7,draw:()=>flake(0,0,1,i)});
    o.push({dx:-60,dy:-90,h:20,rest:9,draw:()=>{c.save();c.rotate(1.5);c.beginPath();c.roundRect(-6,-56,12,80,6);shape('#c9d1db',3,'#2f3640');ell(0,30,17,24);shape('#c9d1db',3,'#2f3640');c.restore();}});
    for(let i=0;i<18;i++)o.push({dx:((i*29)%200)-100,dy:-20,h:14,rest:5,drag:.5,draw:()=>blob('#ffffff',i,10,'#7a8aa0')});return o;},
  decal(x,g){pool(x,g,92,'rgba(250,252,255,.95)',26,2.6);pool(x-30,g,50,'rgba(220,232,248,.9)',20,3.3,3);ell(x-40,H.FLOOR_Y,50*g,3*g);c.fillStyle='rgba(255,255,255,.9)';c.fill();
    for(let i=0;i<9;i++){c.save();c.translate(x-120*g+((i*53)%240)*g,H.FLOOR_Y+((i*3)%6)-2);c.scale(.7,.3);ring(0,0,15,RC[i%6],0);c.restore();}}};
// ================= 3 — CHOCOLATE DOG =================
function chocSauce(){c.beginPath();c.moveTo(-138,8);c.quadraticCurveTo(-140,-18,-110,-20);for(let x=-110;x<=110;x+=22)c.quadraticCurveTo(x+11,-30+((x/22)%2?6:0),x+22,-20);c.quadraticCurveTo(140,-18,138,8);
  for(const [x,l] of [[118,14],[84,30],[46,18],[8,34],[-36,20],[-80,32],[-118,16]]){c.lineTo(x+9,14);c.lineTo(x+8,14+l);c.arc(x,14+l,8,0,Math.PI);c.lineTo(x-9,16);}c.closePath();
  shape(lin(0,-30,0,50,[[0,'#7a4426'],[.5,'#4a2412'],[1,'#2a1208']]),5,'#1a0a04');
  c.beginPath();c.moveTo(-104,-18);c.quadraticCurveTo(-40,-26,30,-20);c.lineWidth=5;c.strokeStyle='rgba(255,220,190,.45)';c.lineCap='round';c.stroke();for(const x of [84,8,-80]){gloss(x-3,22+((x+80)%20),2.5,6,0,.5);}}
function chocBar(){c.save();c.translate(-46,-62);c.rotate(-.32);c.beginPath();c.roundRect(-46,-52,92,104,8);shape(lin(-46,0,46,0,[[0,'#7a4426'],[.5,'#5a2e16'],[1,'#3a1a0a']]),5,'#1a0a04');
  for(let i=0;i<2;i++)for(let j=0;j<3;j++){c.beginPath();c.roundRect(-40+i*42,-46+j*32,38,28,5);c.fillStyle='rgba(255,210,170,.14)';c.fill();c.lineWidth=2;c.strokeStyle='rgba(20,8,2,.6)';c.stroke();}
  c.beginPath();c.moveTo(-50,10);c.lineTo(50,-2);c.lineTo(50,56);c.lineTo(-50,56);c.closePath();c.fillStyle='#c1121f';c.fill();c.lineWidth=4;c.strokeStyle='#3a0606';c.stroke();c.beginPath();c.moveTo(-50,18);c.lineTo(50,6);c.lineWidth=3;c.strokeStyle='#ffd43b';c.stroke();
  c.fillStyle='#fff';c.font='400 22px Anton';c.textAlign='center';c.fillText('CHOCO',0,40);c.restore();}
function cream(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(-40,10);c.quadraticCurveTo(-46,-10,-26,-12);c.quadraticCurveTo(-34,-30,-12,-32);c.quadraticCurveTo(-14,-50,4,-54);c.quadraticCurveTo(10,-66,6,-74);c.quadraticCurveTo(30,-60,18,-46);c.quadraticCurveTo(38,-42,30,-24);c.quadraticCurveTo(48,-18,40,10);c.closePath();
  shape(lin(0,-74,0,10,[[0,'#ffffff'],[1,'#ece4d8']]),4,'#6a5a4a');c.strokeStyle='rgba(150,130,110,.4)';c.lineWidth=2.5;for(const [a,b] of [[-30,-4],[-16,-26],[2,-46]]){c.beginPath();c.moveTo(a,b);c.quadraticCurveTo(a+20,b+6,a+44,b-2);c.stroke();}gloss(-14,-36,8,4,-.4,.9);c.restore();}
function chocTop(){chocSauce();chocBar();cream(52,-30,1.1);
  c.beginPath();c.moveTo(-120,-24);for(let x=-120;x<=120;x+=20)c.lineTo(x+10,(x/20)%2?-40:-14);c.lineWidth=5;c.strokeStyle='#fff8ea';c.lineJoin='round';c.stroke();
  for(const [x,y,r] of [[40,-114,8],[64,-98,7],[30,-92,6],[92,-36,8],[-104,-34,7],[110,-14,6],[0,-30,7]]){c.beginPath();c.moveTo(x,y-r*1.4);c.quadraticCurveTo(x+r*1.3,y+r*.6,x,y+r*.6);c.quadraticCurveTo(x-r*1.3,y+r*.6,x,y-r*1.4);shape('#3a1a0a',2,'#1a0a04');}
  for(let i=0;i<14;i++){c.save();c.translate(20+((i*23)%70),-84+((i*13)%40));c.rotate(i);c.fillStyle=i%2?'#5a2e16':'#3a1a0a';c.fillRect(-4,-1.5,8,3);c.restore();}}
function chocOver(){for(const [x,l] of [[-96,36],[-30,50],[40,30],[98,44]]){c.beginPath();c.moveTo(x-11,18);c.lineTo(x-7,18+l);c.arc(x,18+l,7,Math.PI,0,true);c.lineTo(x+11,18);c.closePath();shape(lin(0,18,0,18+l,[[0,'#5a2e16'],[1,'#2a1208']]),3,'#1a0a04');gloss(x-2,22+l*.6,2,5,0,.5);}}
const chocO={h:224,w:290,rot:-Math.PI*1.05,burst:540,up:1.3,spin:13,draw:()=>{c.save();c.translate(0,9);hotdog(chocTop,chocOver);c.restore();},
  parts(){const o=baseParts();for(let i=0;i<4;i++)o.push({dx:(i-1.5)*40,dy:-70,h:30,rest:12,draw:()=>{c.save();c.rotate(i);c.beginPath();c.roundRect(-20,-15,40,30,5);shape(lin(-20,0,20,0,[[0,'#7a4426'],[1,'#3a1a0a']]),3,'#1a0a04');c.beginPath();c.roundRect(-14,-10,28,20,4);c.fillStyle='rgba(255,210,170,.15)';c.fill();c.restore();}});
    o.push({dx:-40,dy:-40,h:30,rest:10,draw:()=>{c.save();c.rotate(.4);c.beginPath();c.moveTo(-40,-14);c.lineTo(40,-24);c.lineTo(40,14);c.lineTo(-40,14);c.closePath();shape('#c1121f',3,'#3a0606');c.fillStyle='#fff';c.font='400 16px Anton';c.textAlign='center';c.fillText('CHOCO',0,8);c.restore();}});
    o.push({dx:50,dy:-60,h:40,rest:16,draw:()=>cream(0,20,.6)});
    for(let i=0;i<10;i++)o.push({dx:((i*37)%200)-100,dy:-60,h:12,rest:5,draw:()=>{c.beginPath();c.moveTo(0,-10);c.quadraticCurveTo(9,4,0,4);c.quadraticCurveTo(-9,4,0,-10);shape('#3a1a0a',2,'#1a0a04');}});
    for(let i=0;i<20;i++)o.push({dx:((i*29)%220)-110,dy:-20,h:14,rest:5,drag:.5,draw:()=>blob(i%5?'#4a2412':'#fff8ea',i,10,'#1a0a04')});return o;},
  decal(x,g){pool(x,g,96,'rgba(58,26,10,.95)',26,2.4);pool(x+20,g,60,'rgba(90,46,22,.9)',20,3.1,3);ell(x-30,H.FLOOR_Y,56*g,3*g);c.fillStyle='rgba(255,220,190,.45)';c.fill();
    for(let i=0;i<8;i++){ell(x-110*g+((i*47)%220)*g,H.FLOOR_Y+((i*3)%5)-1,6*g+1,2*g+.5);c.fillStyle='rgba(255,248,234,.9)';c.fill();}}};
// ================= 4 — SUSHI DOG =================
function rice(w,h){c.beginPath();c.roundRect(-w/2,-h/2,w,h,h*.45);shape(lin(0,-h/2,0,h/2,[[0,'#ffffff'],[1,'#e4e0d4']]),4,'#4a4438');
  c.fillStyle='rgba(160,150,130,.45)';for(let i=0;i<22;i++){ell(-w/2+8+((i*29)%(w-16)),-h/2+6+((i*11)%(h-12)),4,2.2,i);c.fill();}}
function salmon(w){c.beginPath();c.moveTo(-w/2-6,4);c.quadraticCurveTo(-w/2-8,-16,-w/2+10,-20);c.quadraticCurveTo(0,-30,w/2+4,-18);c.quadraticCurveTo(w/2+14,-6,w/2+8,8);c.quadraticCurveTo(0,0,-w/2-6,4);c.closePath();
  shape(lin(0,-28,0,8,[[0,'#ffb27a'],[.5,'#ff7a3d'],[1,'#e0541a']]),4,'#5a1a00');
  c.save();c.clip();c.strokeStyle='rgba(255,240,225,.85)';c.lineWidth=4;for(let x=-w/2;x<w/2+20;x+=18){c.beginPath();c.moveTo(x,-32);c.quadraticCurveTo(x-6,-12,x-14,10);c.stroke();}c.restore();
  gloss(-w*.2,-20,w*.18,3,-.08,.75);}
function nigiri(x,y,rot,nori){c.save();c.translate(x,y);c.rotate(rot);rice(96,40);c.save();c.translate(0,-14);salmon(96);c.restore();
  if(nori){c.beginPath();c.roundRect(-12,-38,24,56,3);shape(lin(-12,0,12,0,[[0,'#2b3a2a'],[.5,'#1a2a1c'],[1,'#0c140c']]),3,'#050805');c.fillStyle='rgba(120,160,110,.25)';c.fillRect(-8,-34,3,48);}c.restore();}
function wasabi(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(-22,8);c.quadraticCurveTo(-26,-8,-12,-10);c.quadraticCurveTo(-8,-24,4,-22);c.quadraticCurveTo(6,-32,2,-38);c.quadraticCurveTo(18,-28,14,-14);c.quadraticCurveTo(28,-10,22,8);c.closePath();
  shape(rad(-6,-14,2,30,[[0,'#d6f5a0'],[.6,'#8cc63f'],[1,'#5a8a1e']]),3.5,'#24400a');c.fillStyle='rgba(40,70,10,.3)';for(let i=0;i<8;i++){ell(-14+((i*11)%28),-6+((i*7)%12),1.5,1.5);c.fill();}gloss(-8,-12,5,3,-.4,.7);c.restore();}
function ginger(x,y,r){c.save();c.translate(x,y);c.rotate(r);c.beginPath();c.moveTo(-18,0);c.quadraticCurveTo(-10,-16,8,-14);c.quadraticCurveTo(22,-8,18,4);c.quadraticCurveTo(0,10,-18,0);c.closePath();shape(lin(0,-16,0,8,[[0,'#ffd6e0'],[1,'#f78fb3']]),2.5,'#8a2a4a');c.restore();}
function chopstick(x,y,rot){c.save();c.translate(x,y);c.rotate(rot);c.beginPath();c.moveTo(-90,-5);c.lineTo(90,-2.5);c.lineTo(90,2.5);c.lineTo(-90,5);c.closePath();shape(lin(0,-5,0,5,[[0,'#f2d3a0'],[1,'#b98a4e']]),3,'#4a2a10');c.fillStyle='#c1121f';c.fillRect(-90,-5,24,10);c.restore();}
function sushiTop(){chopstick(10,-104,-.18);chopstick(0,-94,.12);nigiri(-56,-34,-.08,false);nigiri(58,-30,.1,true);wasabi(2,-58,1);ginger(-108,-14,-.4);ginger(-118,-26,.2);ginger(112,-62,.5);
  c.fillStyle='#000';for(const [x,y] of [[-20,-70],[36,-70],[-74,-64],[90,-60]]){ell(x,y,1.6,1.6);c.fillStyle=['#111','#ffffff'][(x>0)|0];c.fill();}}
function sushiOver(){for(const [x,l] of [[-70,30],[20,42],[80,24]]){c.beginPath();c.moveTo(x-8,20);c.lineTo(x-6,20+l);c.arc(x,20+l,6,Math.PI,0,true);c.lineTo(x+8,20);c.closePath();shape(lin(0,20,0,20+l,[[0,'#5a2e12'],[1,'#2a1208']]),2.5,'#140802');gloss(x-1.5,24+l*.6,1.5,4,0,.5);}}
const sushiO={h:224,w:290,rot:-Math.PI*0.9,burst:560,up:1.3,spin:14,draw:()=>{c.save();c.translate(0,9);hotdog(sushiTop,sushiOver);c.restore();},
  parts(){const o=baseParts();o.push({dx:-56,dy:-50,h:40,rest:20,draw:()=>rice(96,40)},{dx:58,dy:-50,h:40,rest:20,draw:()=>rice(96,40)},
      {dx:-40,dy:-80,h:30,rest:9,draw:()=>salmon(96)},{dx:50,dy:-80,h:30,rest:9,draw:()=>salmon(96)},
      {dx:0,dy:-60,h:30,rest:10,draw:()=>wasabi(0,8,.9)},
      {dx:-80,dy:-104,h:10,rest:5,draw:()=>chopstick(0,0,0)},{dx:80,dy:-94,h:10,rest:5,draw:()=>chopstick(0,0,.05)});
    for(let i=0;i<3;i++)o.push({dx:(i-1)*90,dy:-30,h:14,rest:6,drag:1,draw:()=>ginger(0,0,i)});
    for(let i=0;i<26;i++)o.push({dx:((i*37)%220)-110,dy:-40,h:6,rest:3,draw:()=>{ell(0,0,5,2.6,i);shape('#fffdf6',1.5,'#8a8270');}});
    for(let i=0;i<12;i++)o.push({dx:((i*29)%200)-100,dy:-10,h:14,rest:5,drag:.5,draw:()=>blob('#3a1a0a',i,9,'#140802')});return o;},
  decal(x,g){pool(x+10,g,88,'rgba(42,18,8,.93)',24,2.8);ell(x-24,H.FLOOR_Y,46*g,3*g);c.fillStyle='rgba(255,200,160,.35)';c.fill();
    pool(x-90*g,g,16,'rgba(140,198,63,.95)',14,3.3,1);
    for(let i=0;i<22;i++){ell(x-130*g+((i*43)%260)*g,H.FLOOR_Y-2+((i*3)%6),4,2,i);c.fillStyle='#fffdf6';c.fill();}}};
// ---------- scale ----------
function S(o,k=1.1){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[iceO,cerealO,chocO,sushiO].forEach(o=>S(o));
// ---------- table: ketchup + mustard squeeze bottles, napkin box ----------
function bottle(x,y,body,dark,label,txt){c.save();c.translate(x,y);
  c.beginPath();c.moveTo(-6,-196);c.lineTo(6,-196);c.lineTo(10,-168);c.lineTo(-10,-168);c.closePath();shape(body,4,O);
  c.beginPath();c.moveTo(-26,-150);c.lineTo(-14,-170);c.lineTo(14,-170);c.lineTo(26,-150);c.closePath();shape(lin(-26,0,26,0,[[0,'#ffffff'],[1,'#b0b6be']]),4,O);
  c.beginPath();c.roundRect(-36,-152,72,152,[20,20,12,12]);shape(lin(-36,0,36,0,[[0,dark],[.3,body],[.6,body],[1,dark]]),5,O);
  c.beginPath();c.roundRect(-30,-100,60,46,6);shape(label,3,O);c.fillStyle=dark;c.font='400 17px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,0,-77);
  c.beginPath();c.roundRect(-24,-142,8,128,4);c.fillStyle='rgba(255,255,255,.4)';c.fill();c.restore();}
function onTable(){const y=880;
  bottle(100,y,'#e03131','#8a0a0a','#fff6e0','KETCHUP');bottle(196,y,'#ffd21a','#b88a00','#c1121f','MUSTARD');
  c.save();c.translate(196,y);c.fillStyle='#ffd21a';c.font='400 17px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText('MUSTARD',0,-77);c.restore();
  c.beginPath();c.roundRect(262,y-92,110,92,10);shape(lin(262,0,372,0,[[0,'#eef1f5'],[.5,'#b8c0cb'],[1,'#7d8794']]),4,'#2a2f36');
  c.beginPath();c.moveTo(288,y-92);c.quadraticCurveTo(300,y-128,318,y-116);c.quadraticCurveTo(334,y-136,346,y-92);c.closePath();shape('#ffffff',3,'#6a7280');
  c.beginPath();c.roundRect(276,y-60,82,30,5);c.fillStyle='#c1121f';c.fill();c.fillStyle='#fff';c.font='400 18px Anton';c.textAlign='center';c.textBaseline='middle';c.fillText('NAPKINS',317,y-45);}
return {tag:'CHALLENGE #28',ask:'WORST HOT DOG CRIME? &darr;',askStyle:{background:'#ffc81a',color:'#c1121f',border:'5px solid #c1121f'},
 palette:{wallTop:'#6a1a12',wallBot:'#d9822b',sky1:'#ff9e5e',sky2:'#ffe4b8',night:false,floorA:'#fff4dc',floorB:'#d62828'},
 objects:{icecream:iceO,cereal:cerealO,choc:chocO,sushi:sushiO},onTable};};
