// Video #23 — Christmas 2: four new glass/ceramic ornaments (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function cap(y=-112,col='#cfd6df'){c.beginPath();c.roundRect(-24,y,48,28,6);shape(lin(-24,0,24,0,[[0,'#ffffff'],[.45,col],[1,'#6b7480']]),4,'#2a2f36');
  for(let i=-18;i<=18;i+=9){c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=2;c.beginPath();c.moveTo(i,y+3);c.lineTo(i,y+25);c.stroke();}
  c.strokeStyle='#8a929c';c.lineWidth=5;c.beginPath();c.arc(0,y-10,12,Math.PI,0);c.stroke();}
function flake(x,y,s,col='#fff'){c.save();c.translate(x,y);c.strokeStyle=col;c.lineWidth=3*s;c.lineCap='round';for(let k=0;k<6;k++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(0,-14*s);c.moveTo(0,-8*s);c.lineTo(-5*s,-12*s);c.moveTo(0,-8*s);c.lineTo(5*s,-12*s);c.stroke();}c.restore();}
// 1 — blue glass ball with snowflakes + glitter band
function blueBall(){cap();ell(0,0,95,95);shape(rad(-35,-35,8,110,[[0,'#9fd8ff'],[.45,'#1f6fd6'],[1,'#0a2a6a']]),5,'#051636');
  c.save();ell(0,0,95,95);c.clip();c.fillStyle='rgba(255,255,255,.18)';c.fillRect(-100,-14,200,28);
  for(let i=0;i<40;i++){ell(-95+((i*47)%190),-12+((i*13)%24),2,2);c.fillStyle=i%3?'#e8f6ff':'#ffd43b';c.fill();}
  flake(-40,-48,1.3);flake(36,-40,1);flake(-20,52,1);flake(46,46,1.4);flake(0,-70,.7);c.restore();gloss(-40,-44,26,13);gloss(52,38,8,4,0.6,.35);}
function bshard(i){c.beginPath();c.moveTo(0,-15-(i%3)*4);c.lineTo(13+(i%2)*6,6);c.lineTo(-11,10+(i%4)*2);c.closePath();shape(lin(-10,-10,10,10,[[0,'#9fd8ff'],[1,'#1450a8']]),2,'#051636');gloss(-2,-4,3,1.5,0,.8);}
const ballO={h:230,w:190,rot:-Math.PI*1.2,burst:660,up:1.2,spin:22,draw:blueBall,
  parts(){const o=[{dx:0,dy:-98,h:30,rest:14,draw:()=>{cap(-14);}}];for(let i=0;i<24;i++)o.push({dx:((i*37)%170)-85,dy:((i*53)%170)-85,h:20,rest:6,draw:()=>bshard(i)});return o;},
  decal(x,g){for(let i=0;i<30;i++){c.save();c.translate(x-130*g+((i*61)%260)*g,H.FLOOR_Y+((i*7)%8)-3);c.rotate(i);c.beginPath();c.moveTo(0,-4);c.lineTo(6,3);c.lineTo(-5,3);c.closePath();c.fillStyle=i%4?'rgba(31,111,214,.85)':'rgba(255,212,59,.9)';c.fill();c.restore();}}};
// 2 — golden glass star topper with lights
function starPath(R,r){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r:R;c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();}
function star(){c.beginPath();c.roundRect(-16,70,32,60,6);shape(lin(-16,0,16,0,[[0,'#fff3a0'],[.5,'#c9a227'],[1,'#7a5a00']]),4,'#3a2a00');
  starPath(110,48);shape(rad(-20,-30,6,120,[[0,'#fff8c4'],[.45,'#ffc61a'],[1,'#b07800']]),6,'#4a3200');
  starPath(70,30);c.fillStyle='rgba(255,255,255,.25)';c.fill();
  const L=['#ff4d6d','#4dabf7','#51cf66','#ffd43b','#ff922b'];for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;ell(Math.cos(a)*78,Math.sin(a)*78,8,8);c.fillStyle=L[i];c.fill();ell(Math.cos(a)*78,Math.sin(a)*78,16,16);c.fillStyle=L[i]+'55';c.fill();}
  gloss(-26,-36,18,9,-0.5,.7);}
function sshard(i){c.beginPath();c.moveTo(0,-16);c.lineTo(14+(i%3)*4,8);c.lineTo(-12,12);c.closePath();shape(lin(-10,-10,10,10,[[0,'#fff8c4'],[1,'#c48a00']]),2,'#4a3200');gloss(-2,-4,3,1.5,0,.8);}
const starO={h:250,w:230,rot:-Math.PI*1.4,burst:640,up:1.25,spin:20,draw:star,
  parts(){const o=[{dx:0,dy:100,h:60,rest:16,draw:()=>{c.save();c.translate(0,-100);c.beginPath();c.roundRect(-16,70,32,60,6);shape('#c9a227',4,'#3a2a00');c.restore();}}];
    for(let i=0;i<5;i++)o.push({dx:Math.cos(i*1.26)*70,dy:Math.sin(i*1.26)*70,h:16,rest:8,draw:()=>{ell(0,0,8,8);c.fillStyle=['#ff4d6d','#4dabf7','#51cf66','#ffd43b','#ff922b'][i];c.fill();c.lineWidth=2;c.strokeStyle='#222';c.stroke();}});
    for(let i=0;i<22;i++)o.push({dx:((i*41)%200)-100,dy:((i*59)%200)-100,h:22,rest:7,draw:()=>sshard(i)});return o;},
  decal(x,g){c.fillStyle='rgba(255,198,26,.9)';for(let i=0;i<34;i++){ell(x-130*g+((i*43)%260)*g,H.FLOOR_Y+((i*5)%8)-3,3,2);c.fill();}}};
// 3 — glass candy cane ornament
function caneStroke(lw,col,dash){c.save();c.lineCap='round';c.lineWidth=lw;c.strokeStyle=col;if(dash)c.setLineDash(dash);c.beginPath();c.moveTo(-10,120);c.lineTo(-10,-50);c.arc(30,-50,40,Math.PI,0);c.lineTo(70,-20);c.stroke();c.restore();}
function cane(){caneStroke(52,'#3a000a');caneStroke(42,'#fff6f0');caneStroke(42,'#e0102e',[22,22]);caneStroke(14,'rgba(255,255,255,.55)');
  c.save();c.translate(30,-108);c.fillStyle='#1f7a3a';c.beginPath();c.ellipse(-18,0,22,10,-.4,0,7);c.fill();c.beginPath();c.ellipse(18,0,22,10,.4,0,7);c.fill();ell(0,2,10,10);shape('#d6102e',3,'#3a000a');c.restore();}
function cshard(i){c.save();c.rotate(i);c.beginPath();c.roundRect(-14,-10,28,20,8);shape(i%2?'#e0102e':'#fff6f0',3,'#3a000a');c.restore();}
const caneO={h:270,w:150,rot:-Math.PI*1.3,burst:560,up:1.3,spin:18,draw:cane,
  parts(){const o=[{dx:30,dy:-108,h:24,rest:10,draw:()=>{ell(0,0,10,10);shape('#d6102e',3,'#3a000a');}}];for(let i=0;i<20;i++)o.push({dx:i<12?-10:((i-12)*12),dy:i<12?(-50+i*14):-70,h:20,rest:10,draw:()=>cshard(i)});return o;},
  decal(x,g){for(let i=0;i<26;i++){c.save();c.translate(x-110*g+((i*47)%220)*g,H.FLOOR_Y+((i*5)%8)-3);c.rotate(i);c.fillStyle=i%2?'rgba(224,16,46,.9)':'rgba(255,246,240,.95)';c.fillRect(-4,-2,8,4);c.restore();}}};
// 4 — ceramic Santa ornament
function santa(){cap(-150);
  ell(0,40,90,100);shape(rad(-30,10,10,120,[[0,'#ff6b6b'],[.6,'#d6102e'],[1,'#7a0010']]),5,'#3a000a');
  c.fillStyle='#1a1a1a';c.fillRect(-88,50,176,22);c.beginPath();c.roundRect(-18,46,36,30,4);shape('#ffd43b',3,'#7a5a00');
  ell(0,-60,62,58);shape(rad(-14,-74,6,70,[[0,'#ffe0c4'],[1,'#e8a87c']]),5,'#4a2408');
  c.beginPath();c.moveTo(-62,-34);c.quadraticCurveTo(-70,40,0,52);c.quadraticCurveTo(70,40,62,-34);c.quadraticCurveTo(30,-10,0,-14);c.quadraticCurveTo(-30,-10,-62,-34);c.closePath();shape('#ffffff',4,'#9aa');
  c.beginPath();c.moveTo(-60,-86);c.quadraticCurveTo(-10,-170,70,-140);c.lineTo(58,-92);c.closePath();shape(lin(0,-160,0,-90,[[0,'#ff4d4d'],[1,'#b0001c']]),4,'#3a000a');
  c.beginPath();c.roundRect(-70,-100,140,26,13);shape('#fff',4,'#9aa');ell(74,-140,16,16);shape('#fff',4,'#9aa');
  ell(-20,-62,6,7);c.fillStyle='#222';c.fill();ell(20,-62,6,7);c.fill();ell(0,-46,10,8);c.fillStyle='#ff8f8f';c.fill();
  c.beginPath();c.moveTo(-30,-34);c.quadraticCurveTo(-16,-24,0,-34);c.quadraticCurveTo(16,-24,30,-34);c.lineWidth=8;c.strokeStyle='#f2f2f2';c.stroke();gloss(-30,10,16,30,-0.2,.35);}
function pshard(i){c.beginPath();c.moveTo(-14,-12);c.lineTo(12+(i%3)*4,-14);c.lineTo(16,10);c.lineTo(-10,14);c.closePath();shape(['#d6102e','#ffffff','#ffe0c4','#1a1a1a'][i%4],3,'#3a000a');}
const santaO={h:300,w:190,rot:-Math.PI*1.1,burst:560,up:1.2,spin:16,draw:santa,
  parts(){const o=[{dx:0,dy:-140,h:30,rest:14,draw:()=>cap(-14)}];for(let i=0;i<22;i++)o.push({dx:((i*43)%170)-85,dy:((i*61)%240)-120,h:28,rest:12,draw:()=>pshard(i)});return o;},
  decal(x,g){c.fillStyle='rgba(214,16,46,.8)';for(let i=0;i<20;i++){ell(x-110*g+((i*53)%220)*g,H.FLOOR_Y+((i*5)%8)-3,4,2.5,i);c.fill();}}};
function S(o,k=1.2){const d=o.draw,p=o.parts;return Object.assign(o,{h:o.h*k,w:o.w*k,draw(){c.save();c.scale(k,k);d();c.restore();},
  parts(){return p().map(q=>({...q,dx:q.dx*k,dy:q.dy*k,h:q.h*k,rest:q.rest*k,draw:()=>{c.save();c.scale(k,k);q.draw();c.restore();}}));}});}
[ballO,starO,caneO,santaO].forEach(o=>S(o));
return {tag:'CHALLENGE #23',ask:'WHICH ORNAMENT IS THE PRETTIEST? &darr;',askStyle:{background:'#d6102e',color:'#fff'},
 palette:{wallTop:'#3a0d14',wallBot:'#7a1c28',sky1:'#13204a',sky2:'#5a78c0',night:true,floorA:'#f4ecdc',floorB:'#1f6b4a'},
 objects:{ball:ballO,star:starO,cane:caneO,santa:santaO},
 onTable(f){const y=880;// gift box + string of lights
   c.beginPath();c.roundRect(80,y-110,120,110,8);shape(lin(80,0,200,0,[[0,'#2fa860'],[1,'#1a6a3a']]),4,'#0d3a1a');c.fillStyle='#ffd43b';c.fillRect(132,y-110,16,110);c.fillRect(80,y-64,120,16);
   c.save();c.translate(140,y-112);c.fillStyle='#ffd43b';c.beginPath();c.ellipse(-22,-10,24,14,-.5,0,7);c.fill();c.beginPath();c.ellipse(22,-10,24,14,.5,0,7);c.fill();c.restore();
   const L=['#ff4d6d','#ffd43b','#4dabf7','#51cf66'];c.strokeStyle='#1a1a1a';c.lineWidth=3;c.beginPath();c.moveTo(230,y-6);for(let x=230;x<=600;x+=30)c.quadraticCurveTo(x+15,y+6,x+30,y-6);c.stroke();
   for(let i=0;i<12;i++){const x=245+i*30,on=((f>>3)+i)%2;ell(x,y+2,7,10);c.fillStyle=L[i%4];c.fill();if(on){ell(x,y+2,18,18);c.fillStyle=L[i%4]+'44';c.fill();}}}};};
