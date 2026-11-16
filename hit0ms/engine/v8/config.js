// Video #8 — polemic pizza toppings (original illustrations)
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#3a1c0c';
function base(){c.beginPath();c.moveTo(-100,-58);c.quadraticCurveTo(0,-84,100,-58);c.lineTo(0,78);c.closePath();shape(lin(0,-60,0,78,[[0,'#ffd65a'],[1,'#f4a92a']]),5,'#8a4a00');
  c.beginPath();c.moveTo(-104,-59);c.quadraticCurveTo(0,-88,104,-59);c.lineTo(97,-46);c.quadraticCurveTo(0,-73,-97,-46);c.closePath();shape(lin(0,-84,0,-46,[[0,'#e8a45a'],[1,'#b8702c']]),5,O);
  c.strokeStyle='rgba(255,240,180,.8)';c.lineWidth=3;c.beginPath();c.moveTo(-60,-38);c.quadraticCurveTo(-30,-8,-50,12);c.stroke();}
const SP=[[-48,-30],[28,-30],[-4,4],[-14,38],[30,10]];
const T={
 pineapple:{col:'#ffd43b',piece(){c.beginPath();c.moveTo(-14,-10);c.lineTo(14,-10);c.lineTo(10,10);c.lineTo(-10,10);c.closePath();shape(lin(0,-10,0,10,[[0,'#fff3a0'],[1,'#f5c400']]),3,'#9a7400');c.strokeStyle='rgba(180,140,0,.6)';c.lineWidth=2;c.beginPath();c.moveTo(-6,-8);c.lineTo(-4,8);c.moveTo(4,-8);c.lineTo(5,8);c.stroke();}},
 chocolate:{col:'#6b3a1c',piece(){ell(0,0,11,9);shape(rad(-3,-3,1,12,[[0,'#8a5230'],[1,'#3d1f0b']]),3,'#2a1206');},
   over(){c.strokeStyle='#4a240c';c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(-80,-46);for(let i=0;i<7;i++)c.lineTo(-60+i*22,-46+(i%2?36:8)+i*10);c.stroke();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=3;c.stroke();}},
 gummies:{cols:['#ff4d6d','#51cf66','#ffd43b','#4dabf7','#ff922b'],piece(i=0){const col=T.gummies.cols[i%5];c.fillStyle=col;c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=2;
   ell(0,4,9,11);c.fill();c.stroke();ell(0,-9,7,6);c.fill();c.stroke();ell(-6,-14,3,3);c.fill();ell(6,-14,3,3);c.fill();ell(-3,-4,3,4);c.fillStyle='rgba(255,255,255,.5)';c.fill();}},
 ketchup:{col:'#d6281f',piece(){c.beginPath();c.roundRect(-5,-16,10,32,3);shape(lin(-5,0,5,0,[[0,'#ffd23f'],[1,'#e6a800']]),2,'#8a6400');},
   over(){c.strokeStyle='#c81e14';c.lineWidth=10;c.lineCap='round';c.lineJoin='round';c.beginPath();c.moveTo(-70,-40);for(let i=0;i<8;i++)c.lineTo(-60+i*17,-36+(i%2?26:0)+i*12);c.stroke();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=3;c.stroke();}}};
function slice(kind){return ()=>{c.save();c.scale(1.3,1.3);base();const t=T[kind];if(t.over)t.over();SP.forEach(([x,y],i)=>{c.save();c.translate(x,y);c.rotate(i*0.7);t.piece(i);c.restore();});c.restore();};}
function mk(kind){const t=T[kind];return {h:208,w:260,rot:-Math.PI*1.4,burst:430,up:1.0,spin:12,draw:slice(kind),
  parts(){return [{dx:0,dy:0,h:22,rest:10,draw:()=>{c.save();c.scale(1,0.33);slice(kind)();c.restore();}},...SP.map((p,i)=>({dx:(i-2)*26,dy:-14,h:20,rest:9,draw:()=>t.piece(i)}))];},
  decal(x,g){c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2;const r=(80+Math.sin(i*2.7)*14)*g;c.lineTo(x+Math.cos(a)*r*1.3,H.FLOOR_Y+2+Math.sin(a)*r*0.2);}c.closePath();c.fillStyle='rgba(255,210,70,.92)';c.fill();
    ell(x+26,H.FLOOR_Y+1,30*g,5*g);c.fillStyle=t.col||'#ff4d6d';c.fill();}};}
return {tag:'CHALLENGE #8',ask:'WHICH ONE IS A CRIME? &darr;',askStyle:{background:'#ff4747',color:'#fff'},
 palette:{wallTop:'#173323',wallBot:'#2e5a3d',sky1:'#ff9a76',sky2:'#ffe1a8',night:false,floorA:'#f4ecdc',floorB:'#2f6b3f'},
 objects:{pineapple:mk('pineapple'),chocolate:mk('chocolate'),gummies:mk('gummies'),ketchup:mk('ketchup')},
 onTable(){const x=160,y=880;ell(x,y-6,70,12);shape(lin(0,y-18,0,y+6,[[0,'#f1f3f5'],[1,'#adb5bd']]),3,'#495057');
   c.beginPath();c.roundRect(240,y-60,34,60,6);shape(lin(240,0,274,0,[[0,'#ff6b6b'],[1,'#c92a2a']]),3,'#5a0a0a');c.fillStyle='#fff';c.fillRect(246,y-40,22,14);}};};
