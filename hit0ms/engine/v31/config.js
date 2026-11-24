// Video #30 — gift boxes: four original wrapped presents that burst open on impact (original illustrations, no brands)
//  1 RED FOIL box, gold ribbon      -> a teddy bear pops out        word TEDDY
//  2 tall PURPLE polka-dot box, lime ribbon -> a toy rocket blasts out word ROCKET
//  3 wide YELLOW candy-stripe box, red ribbon -> lollipops, candy canes, wrapped sweets  word CANDY
//  4 big PINK star box, aqua-silver ribbon -> party balloons float up + streamers  word PARTY
// Every box: lid flies off, the bow + ribbon snap, wrapping paper shreds, confetti bursts, and the box unfolds flat on the floor (decal).
// make sure the canvas fonts are loaded before the engine paints the static background (brand text)
await Promise.all(['400 80px Anton','800 27px Inter','700 30px Mono'].map(f=>document.fonts.load(f).catch(()=>{})));
export default (H)=>{const {c,lin,rad,shape,ell}=H;const O='#1c1424';const F=H.FLOOR_Y;
function gloss(x,y,rx,ry,a=-0.4,o=.6){ell(x,y,rx,ry,a);c.fillStyle=`rgba(255,255,255,${o})`;c.fill();}
function star(x,y,R,r,n=5){c.beginPath();for(let i=0;i<2*n;i++){const a=-Math.PI/2+i*Math.PI/n,rr=i%2?r:R;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}c.closePath();}
function txt(s,x,y,font,fill,stroke,lw=4){c.save();c.textAlign='center';c.textBaseline='middle';c.font=font;if(stroke){c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=fill;c.fillText(s,x,y);c.restore();}
const CONF=['#ff4d6d','#ffd43b','#4dabf7','#51cf66','#cc5de8','#ff922b','#ffffff'];

// ---------- wrapping-paper patterns (drawn in face-local coords, w x h) ----------
const PAT={
 foil(w,h){c.fillStyle='rgba(255,255,255,.14)';for(let x=-h;x<w+h;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x+18,0);c.lineTo(x+18-h,h);c.lineTo(x-h,h);c.closePath();c.fill();}
   c.fillStyle='rgba(120,0,0,.18)';for(let x=-h+24;x<w+h;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x+6,0);c.lineTo(x+6-h,h);c.lineTo(x-h,h);c.closePath();c.fill();}
   for(let i=0;i<Math.ceil(w*h/700)+2;i++){star((i*53)%Math.max(1,w),(i*37)%Math.max(1,h),5,1.6,4);c.fillStyle='rgba(255,226,130,.95)';c.fill();}},
 dots(w,h){for(let y=10,r=0;y<h+14;y+=30,r++)for(let x=(r%2)*18+4;x<w+14;x+=36){ell(x,y,8.5,8.5);c.fillStyle='#ffffff';c.fill();ell(x+2,y+2.5,8.5,8.5);c.fillStyle='rgba(60,20,120,.0)';c.fill();}
   for(let y=25,r=0;y<h+14;y+=30,r++)for(let x=(r%2)*18+22;x<w+14;x+=36){ell(x,y,3,3);c.fillStyle='rgba(255,236,153,.9)';c.fill();}},
 stripes(w,h){for(let x=-h;x<w+h;x+=42){c.beginPath();c.moveTo(x,0);c.lineTo(x+15,0);c.lineTo(x+15+h,h);c.lineTo(x+h,h);c.closePath();c.fillStyle='#fffaf0';c.fill();
     c.beginPath();c.moveTo(x+20,0);c.lineTo(x+25,0);c.lineTo(x+25+h,h);c.lineTo(x+20+h,h);c.closePath();c.fillStyle='#ff6b9a';c.fill();}},
 stars(w,h){for(let y=16,r=0;y<h+20;y+=40,r++)for(let x=(r%2)*23+10;x<w+20;x+=46){star(x,y,11,4.6);shape('#ffd43b',1.6,'#9a5a00');}
   c.fillStyle='rgba(255,255,255,.75)';for(let y=36,r=0;y<h+20;y+=40,r++)for(let x=(r%2)*23+33;x<w+20;x+=46){ell(x,y,2.6,2.6);c.fill();}}};

// ---------- 3D box faces: a rect drawn through an affine map M (front [1,0,0,1], top [1,0,1,-.6], side [1,-.6,0,1]) ----------
function ribbonRect(x,y,w,h,rc){c.beginPath();c.rect(x,y,w,h);const g=w<h?lin(x,0,x+w,0,[[0,rc[2]],[.22,rc[1]],[.48,rc[0]],[.72,rc[1]],[1,rc[2]]]):lin(0,y,0,y+h,[[0,rc[2]],[.22,rc[1]],[.48,rc[0]],[.72,rc[1]],[1,rc[2]]]);
  c.fillStyle=g;c.fill();c.lineWidth=2.5;c.strokeStyle='rgba(0,0,0,.35)';c.stroke();
  c.beginPath();if(w<h){c.moveTo(x+w*.32,y);c.lineTo(x+w*.32,y+h);}else{c.moveTo(x,y+h*.32);c.lineTo(x+w,y+h*.32);}c.lineWidth=1.6;c.strokeStyle='rgba(255,255,255,.55)';c.stroke();}
function face(ox,oy,M,fw,fh,base,pat,shade,ribs,rc,r=0){c.save();c.translate(ox,oy);c.transform(...M,0,0);
  c.beginPath();c.roundRect(0,0,fw,fh,r);c.fillStyle=base;c.fill();
  c.save();c.clip();if(pat)pat(fw,fh);for(const q of ribs||[])ribbonRect(...q,rc);if(shade){c.fillStyle=shade;c.fillRect(-2,-2,fw+4,fh+4);}c.restore();
  c.beginPath();c.roundRect(0,0,fw,fh,r);c.lineWidth=4;c.strokeStyle=O;c.lineJoin='round';c.stroke();c.restore();}
const FRONT=[1,0,0,1],TOP=[1,0,1,-.6],SIDE=[1,-.6,0,1];
function spec(o){o.d=o.d||34;o.dy=o.d*.6;o.bs=o.bs||1;o.h=o.bh+o.lh-6+o.dy+52*o.bs;o.w=o.W+o.d;return o;}
function body(G,bot){const {W,bh,d,rw}=G;const bt=bot-bh;
  face(W/2,bt,SIDE,d,bh,G.side,G.pat,'rgba(10,0,30,.34)',[[d/2-rw*.3,0,rw*.6,bh]],G.rib);
  face(-W/2,bt,FRONT,W,bh,lin(0,0,W,0,G.body),G.pat,lin(0,0,0,bh,[[0,'rgba(0,0,0,.34)'],[.1,'rgba(0,0,0,.06)'],[.6,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.18)']]),[[W/2-rw/2,0,rw,bh]],G.rib,[0,0,8,8]);}
function lid(G,lt){const {W,lh,d,rw}=G;const L=W/2+8;
  face(L,lt,SIDE,d,lh,G.side,G.pat,'rgba(10,0,30,.34)',[[d/2-rw*.3,0,rw*.6,lh]],G.rib);
  face(-L,lt,TOP,2*L,d,G.top,G.pat,'rgba(255,255,255,.14)',[[L-rw/2,0,rw,d],[0,d/2-rw*.3,2*L,rw*.6]],G.rib);
  face(-L,lt,FRONT,2*L,lh,lin(0,0,2*L,0,G.body),G.pat,lin(0,0,0,lh,[[0,'rgba(255,255,255,.22)'],[.35,'rgba(255,255,255,0)'],[1,'rgba(0,0,0,.2)']]),[[L-rw/2,0,rw,lh]],G.rib,[4,4,6,6]);}
function bow(x,y,s,rc){c.save();c.translate(x,y);c.scale(s,s);
  for(const k of [-1,1]){c.beginPath();c.moveTo(k*-6,2);c.lineTo(k*8,-2);c.lineTo(k*42,44);c.lineTo(k*31,42);c.lineTo(k*26,58);c.closePath();shape(lin(0,0,0,58,[[0,rc[1]],[1,rc[2]]]),3.5,O);
    c.beginPath();c.moveTo(k*4,4);c.lineTo(k*30,42);c.lineWidth=2;c.strokeStyle='rgba(255,255,255,.45)';c.stroke();}
  for(const k of [-1,1]){c.beginPath();c.moveTo(0,0);c.bezierCurveTo(k*18,-56,k*88,-58,k*78,-14);c.bezierCurveTo(k*72,8,k*30,12,0,0);c.closePath();shape(lin(0,-50,0,12,[[0,rc[0]],[.45,rc[1]],[1,rc[2]]]),4,O);
    c.beginPath();c.moveTo(k*10,-4);c.bezierCurveTo(k*22,-34,k*60,-38,k*60,-14);c.bezierCurveTo(k*52,-4,k*30,-2,k*10,-4);c.fillStyle='rgba(0,0,0,.24)';c.fill();
    gloss(k*44,-36,13,4.5,k*.25,.6);}
  c.beginPath();c.roundRect(-15,-15,30,28,10);shape(lin(0,-15,0,13,[[0,rc[0]],[.5,rc[1]],[1,rc[2]]]),4,O);gloss(-5,-8,6,3,-.3,.65);c.restore();}
function giftTag(x,y,rot,label,bx,by){c.beginPath();c.moveTo(bx,by);c.quadraticCurveTo((bx+x)/2+10,(by+y)/2+20,x,y);c.lineWidth=2.5;c.strokeStyle='#f8f0e0';c.stroke();
  c.save();c.translate(x,y);c.rotate(rot);c.beginPath();c.moveTo(-14,0);c.lineTo(14,0);c.lineTo(22,10);c.lineTo(22,58);c.lineTo(-22,58);c.lineTo(-22,10);c.closePath();shape(lin(0,0,0,58,[[0,'#fffaf0'],[1,'#ead9b8']]),3,O);
  ell(0,9,3.5,3.5);c.fillStyle=O;c.fill();c.save();c.translate(0,34);c.rotate(-Math.PI/2);txt(label,0,0,'400 15px Anton','#c92a2a');c.restore();c.restore();}
function gift(G){const bot=G.h/2,bt=bot-G.bh,lt=bt-G.lh+6;body(G,bot);lid(G,lt);
  if(G.tag)giftTag(G.W/2-24,lt+G.lh+6,.18,G.tag,G.d/2+6,lt-G.dy/2+4);
  bow(G.d/2,lt-G.dy/2,G.bs,G.rib);}

// ---------- break pieces ----------
function curl(rc,i,s=1){c.save();c.scale(s,s);c.beginPath();c.moveTo(-44,0);for(let k=1;k<=4;k++)c.quadraticCurveTo(-44+k*22-11,(k%2?-1:1)*(16+(i%3)*4),-44+k*22,0);
  c.lineCap='round';c.lineJoin='round';c.lineWidth=15;c.strokeStyle=O;c.stroke();c.lineWidth=10;c.strokeStyle=rc[1];c.stroke();c.lineWidth=3;c.strokeStyle=rc[0];c.stroke();c.restore();}
function snapped(rc,i){c.save();c.rotate(i*.6);c.beginPath();c.moveTo(-36,-8);c.lineTo(30,-8);c.lineTo(36,-3);c.lineTo(30,0);c.lineTo(37,5);c.lineTo(30,8);c.lineTo(-36,8);c.closePath();
  shape(lin(0,-8,0,8,[[0,rc[0]],[.5,rc[1]],[1,rc[2]]]),3,O);c.restore();}
function shred(G,i,s=1){const n=9,pts=[];for(let k=0;k<n;k++){const a=k/n*Math.PI*2,r=(20+((i*7+k*13)%14))*s*(k%2?1:.72);pts.push([Math.cos(a)*r*1.25,Math.sin(a)*r]);}
  c.save();c.rotate(i*.9);c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=G.side;c.fill();c.save();c.clip();c.translate(-40,-40);c.fillStyle=lin(0,0,80,0,G.body);c.fillRect(0,0,80,80);G.pat(80,80);c.restore();
  c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.lineWidth=3;c.strokeStyle=O;c.stroke();c.restore();}
function conf(i){c.save();c.rotate(i*1.3);const col=CONF[i%7];if(i%4===0){ell(0,0,6,6);shape(col,1.5,'rgba(0,0,0,.45)');}
  else if(i%4===1){star(0,0,8,3.4);shape(col,1.5,'rgba(0,0,0,.45)');}else{c.beginPath();c.rect(-8,-3.5,16,7);shape(col,1.5,'rgba(0,0,0,.45)');}c.restore();}
function streamer(i){c.save();c.beginPath();c.moveTo(-30,-10);c.bezierCurveTo(-10,-34,4,14,16,-6);c.bezierCurveTo(26,-22,34,6,40,-2);c.lineCap='round';c.lineWidth=8;c.strokeStyle='rgba(0,0,0,.4)';c.stroke();c.lineWidth=5;c.strokeStyle=CONF[(i*3)%6];c.stroke();c.restore();}
// lid as a flying piece (centered)
function lidPiece(G){c.save();c.translate(-G.d/2,G.dy/2);lid(G,-G.lh/2);c.restore();}
function commonParts(G){const bot=G.h/2,bt=bot-G.bh,lt=bt-G.lh+6;const o=[];
  o.push({dx:-8,dy:lt+G.lh/2,h:G.lh+G.dy,rest:(G.lh+G.dy)/2-4,draw:()=>lidPiece(G)});
  o.push({dx:12,dy:lt-30,h:46*G.bs,rest:20*G.bs,draw:()=>bow(0,0,G.bs*.85,G.rib)});
  for(let i=0;i<3;i++)o.push({dx:(i-1)*50,dy:lt+10,h:16,rest:8,drag:1,draw:()=>curl(G.rib,i)});
  for(let i=0;i<2;i++)o.push({dx:i?40:-40,dy:bt+G.bh*.4,h:16,rest:8,draw:()=>snapped(G.rib,i)});
  for(let i=0;i<6;i++)o.push({dx:((i*47)%(G.W))-G.W/2,dy:bt+((i*29)%G.bh),h:24,rest:4,drag:2,vmax:300,flut:90,g:.8,draw:()=>shred(G,i,.9)});
  for(let i=0;i<46;i++)o.push({dx:((i*37)%(G.W+40))-G.W/2-20,dy:bt+10-((i*13)%40),h:8,rest:2,drag:2.4,vmax:210,flut:90+(i%5)*20,g:.75,draw:()=>conf(i)});
  return o;}
// the box unfolds flat on the floor + tissue paper + confetti on the floor + a pop flash
function openBox(G,x,g){const W=G.W,rw=G.rw,u=Math.min(1,g*1.15),fl=G.bh*.82*u,dep=40,y0=F-dep/2+6;
  if(g<1){c.save();c.globalAlpha=Math.min(1,(1-g)*1.7);c.lineCap='round';for(let i=0;i<16;i++){const a=-Math.PI+i/15*Math.PI,r0=70*g+30,r1=110+260*g;c.beginPath();c.moveTo(x+Math.cos(a)*r0,F-40+Math.sin(a)*r0*.9);c.lineTo(x+Math.cos(a)*r1,F-40+Math.sin(a)*r1*.9);
    c.lineWidth=i%2?8:13;c.strokeStyle=i%2?'#ffffff':'#ffe066';c.stroke();}ell(x,F-40,90*g+30,70*g+20);c.fillStyle='rgba(255,250,220,.55)';c.fill();c.restore();}
  ell(x,F+8,W/2+fl*.95,22+fl*.15);c.fillStyle='rgba(0,0,0,.22)';c.fill();
  face(x-W/2,y0,[1,0,0,-.26],W,fl,lin(0,0,W,0,G.body),G.pat,'rgba(0,0,0,.18)',[[W/2-rw/2,0,rw,fl]],G.rib);          // back flap
  face(x-W/2,y0,[-1,0,-.15,1],fl,dep,lin(0,0,fl,0,G.body),G.pat,'rgba(0,0,0,.1)',[[0,dep/2-rw*.2,fl,rw*.4]],G.rib);   // left flap
  face(x+W/2,y0,[1,0,.15,1],fl,dep,lin(0,0,fl,0,G.body),G.pat,'rgba(0,0,0,.22)',[[0,dep/2-rw*.2,fl,rw*.4]],G.rib);   // right flap
  face(x-W/2,y0,FRONT,W,dep,G.inner,null,lin(0,0,0,dep,[[0,'rgba(0,0,0,.2)'],[1,'rgba(0,0,0,0)']]),[],G.rib);        // base (inside)
  c.beginPath();c.moveTo(x-W*.42,y0+dep*.7);for(let k=0;k<=10;k++){const px=x-W*.42+k*W*.084,py=y0+dep*.5-(k%2?34:14)*u-((k*7)%10)*u;c.lineTo(px,py);}c.lineTo(x+W*.42,y0+dep*.7);c.closePath();
  shape(lin(0,y0-40,0,y0+dep,[[0,'#ffffff'],[1,G.tissue]]),3,O);                                                     // tissue paper
  face(x-W/2,y0+dep,[1,0,0,.3],W,fl,lin(0,0,W,0,G.body),G.pat,lin(0,0,0,fl,[[0,'rgba(255,255,255,.1)'],[1,'rgba(0,0,0,.15)']]),[[W/2-rw/2,0,rw,fl]],G.rib); // front flap
  for(let i=0;i<40;i++){c.save();c.translate(x+(((i*71)%340)-170)*(.4+.6*g),F+((i*17)%34)-6);c.rotate(i*.7);c.scale(1,.45);c.fillStyle=CONF[i%7];if(i%3)c.fillRect(-7,-4,14,8);else{ell(0,0,5,5);c.fill();}c.restore();}}

// ================= 1 — RED FOIL BOX + TEDDY =================
function teddy(){const B='#b8743c',D='#7a4520',L='#f1c79b',bodyG=()=>rad(-12,-10,4,60,[[0,'#d99a5c'],[.6,B],[1,D]]);
  for(const k of [-1,1]){ell(k*28,44,21,17);shape(bodyG(),4,O);ell(k*28,48,11,8);c.fillStyle=L;c.fill();}
  ell(0,16,42,38);shape(bodyG(),4,O);ell(0,24,24,21);c.fillStyle=L;c.fill();
  c.beginPath();c.moveTo(0,34);c.bezierCurveTo(-14,22,-8,12,0,20);c.bezierCurveTo(8,12,14,22,0,34);shape('#ff6b8a',2,'#8a1a3a');
  for(const k of [-1,1]){ell(k*42,8,14,23,k*-.55);shape(bodyG(),4,O);}
  for(const k of [-1,1]){ell(k*31,-62,16,16);shape(bodyG(),4,O);ell(k*31,-61,8,8);c.fillStyle=L;c.fill();}
  ell(0,-34,44,37);shape(rad(-14,-48,4,56,[[0,'#dca066'],[.6,B],[1,D]]),4,O);
  ell(0,-22,19,14);shape(L,3,O);ell(0,-28,8,5.5);c.fillStyle='#2a160a';c.fill();gloss(-2,-30,3,1.5,0,.7);
  c.beginPath();c.moveTo(0,-23);c.lineTo(0,-17);c.moveTo(-7,-15);c.quadraticCurveTo(0,-10,7,-15);c.lineWidth=2.5;c.strokeStyle='#2a160a';c.lineCap='round';c.stroke();
  for(const k of [-1,1]){ell(k*16,-44,5.5,6.5);c.fillStyle='#1a0d05';c.fill();ell(k*16-1.5,-46.5,2,2);c.fillStyle='#fff';c.fill();ell(k*26,-30,6,3.5);c.fillStyle='rgba(255,110,130,.45)';c.fill();}
  for(const k of [-1,1]){c.beginPath();c.moveTo(0,0);c.lineTo(k*20,-10);c.lineTo(k*20,10);c.closePath();shape('#e03131',3,O);}ell(0,0,6,6);shape('#ff6b6b',2.5,O);}
const G1=spec({W:190,bh:150,lh:42,rw:30,bs:1.05,tag:'TO: YOU',pat:PAT.foil,
  body:[[0,'#a51111'],[.3,'#ff5252'],[.55,'#e03131'],[1,'#8f0d0d']],side:'#a51111',top:'#ff6b6b',inner:'#fff1e6',tissue:'#ffe08a',
  rib:['#fff6c2','#ffcf3a','#a87400']});
const redO={h:G1.h,w:G1.w,rot:-Math.PI*0.85,burst:560,up:1.3,spin:12,draw:()=>gift(G1),
  parts(){const o=commonParts(G1);const bt=G1.h/2-G1.bh;
    o.push({dx:-6,dy:bt+30,h:120,rest:56,drag:1.6,draw:()=>teddy()});
    for(let i=0;i<5;i++)o.push({dx:(i-2)*34,dy:bt+20,h:14,rest:7,drag:1.8,vmax:260,flut:70,g:.7,draw:()=>{c.beginPath();c.moveTo(0,10);c.bezierCurveTo(-16,-2,-8,-12,0,-4);c.bezierCurveTo(8,-12,16,-2,0,10);shape(['#ff6b8a','#e03131','#ffd43b'][i%3],2.5,O);}});
    return o;},
  decal(x,g){openBox(G1,x,g);}};

// ================= 2 — PURPLE POLKA BOX + TOY ROCKET =================
function rocket(){c.save();
  c.beginPath();c.moveTo(-14,42);c.quadraticCurveTo(0,92,14,42);c.closePath();shape(lin(0,42,0,90,[[0,'#fff3a0'],[.4,'#ffa94d'],[1,'rgba(255,80,30,.2)']]),0);
  c.beginPath();c.moveTo(-8,42);c.quadraticCurveTo(0,70,8,42);c.fillStyle='#fffbe0';c.fill();
  for(const k of [-1,1]){c.beginPath();c.moveTo(k*20,6);c.quadraticCurveTo(k*44,20,k*42,50);c.lineTo(k*18,36);c.closePath();shape(lin(0,6,0,50,[[0,'#ff6b6b'],[1,'#b51d1d']]),4,O);}
  c.beginPath();c.roundRect(-14,30,28,14,4);shape('#868e96',3.5,O);
  c.beginPath();c.moveTo(0,-74);c.bezierCurveTo(34,-48,30,10,22,38);c.lineTo(-22,38);c.bezierCurveTo(-30,10,-34,-48,0,-74);c.closePath();shape(lin(-26,0,26,0,[[0,'#ced4da'],[.35,'#ffffff'],[.7,'#e9ecef'],[1,'#a5abb3']]),4.5,O);
  c.save();c.clip();c.fillStyle=lin(-26,0,26,0,[[0,'#c92a2a'],[.4,'#ff6b6b'],[1,'#a51111']]);c.fillRect(-40,-80,80,36);c.fillRect(-40,24,80,20);c.restore();
  c.beginPath();c.moveTo(0,-74);c.bezierCurveTo(34,-48,30,10,22,38);c.lineTo(-22,38);c.bezierCurveTo(-30,10,-34,-48,0,-74);c.closePath();c.lineWidth=4.5;c.strokeStyle=O;c.stroke();
  ell(0,-14,14,14);shape('#e9ecef',4,O);ell(0,-14,9,9);c.fillStyle=rad(-3,-17,1,11,[[0,'#d0ebff'],[.5,'#4dabf7'],[1,'#1864ab']]);c.fill();gloss(-3,-18,3.5,2,-.5,.85);
  c.beginPath();c.roundRect(-4,-4+30,8,30,4);c.fillStyle='rgba(0,0,0,.0)';c.fill();
  c.beginPath();c.moveTo(-14,-50);c.quadraticCurveTo(-18,-10,-14,20);c.lineWidth=4;c.strokeStyle='rgba(255,255,255,.7)';c.stroke();c.restore();}
const G2=spec({W:150,bh:205,lh:38,rw:26,bs:.95,pat:PAT.dots,
  body:[[0,'#4c2a9e'],[.35,'#8c5cf5'],[.6,'#7048e8'],[1,'#3b1f86']],side:'#4c2a9e',top:'#9775fa',inner:'#f3f0ff',tissue:'#d0bfff',
  rib:['#f4ffd0','#94d82d','#4f7f0d']});
const purpleO={h:G2.h,w:G2.w,rot:-Math.PI*1.0,burst:560,up:1.35,spin:13,draw:()=>gift(G2),
  parts(){const o=commonParts(G2);const bt=G2.h/2-G2.bh;
    o.push({dx:-4,dy:bt+20,h:150,rest:26,drag:1.4,g:.55,draw:()=>rocket()});
    for(let i=0;i<7;i++)o.push({dx:(i-3)*26,dy:bt+30,h:16,rest:9,drag:1.6,vmax:260,flut:80,g:.7,draw:()=>{star(0,0,12,5);shape(i%2?'#ffd43b':'#ffffff',2.5,O);}});
    for(let i=0;i<6;i++)o.push({dx:(i-2.5)*20,dy:bt+60,h:20,rest:4,drag:2.5,vmax:140,flut:60,g:.5,draw:()=>{ell(0,0,10+(i%3)*3,9+(i%2)*3);c.fillStyle='rgba(235,235,245,.85)';c.fill();}});
    return o;},
  decal(x,g){openBox(G2,x,g);}};

// ================= 3 — YELLOW CANDY-STRIPE BOX + SWEETS =================
function wrapped(col,i){c.save();c.rotate(i*.8);for(const k of [-1,1]){c.beginPath();c.moveTo(k*14,0);c.lineTo(k*30,-11);c.lineTo(k*27,0);c.lineTo(k*30,11);c.closePath();shape(col,3,O);}
  ell(0,0,17,13);shape(rad(-5,-5,1,20,[[0,'#ffffff'],[.3,col],[1,col]]),3.5,O);c.save();c.clip();c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=3;for(let x=-20;x<20;x+=9){c.beginPath();c.moveTo(x,-14);c.lineTo(x+8,14);c.stroke();}c.restore();c.restore();}
function lolly(col,i){c.save();c.rotate(i*.5-.4);c.beginPath();c.roundRect(-3.5,0,7,60,3);shape('#fffaf0',2.5,O);
  ell(0,-6,26,26);shape(col,4,O);c.beginPath();for(let a=0;a<Math.PI*6;a+=.2){const r=a*1.3;c.lineTo(Math.cos(a)*r,-6+Math.sin(a)*r);}c.lineWidth=5;c.strokeStyle='rgba(255,255,255,.9)';c.stroke();gloss(-9,-16,6,3,-.5,.7);c.restore();}
function cane(i){c.save();c.rotate(i*.7);c.beginPath();c.moveTo(0,40);c.lineTo(0,-20);c.arc(-14,-20,14,0,Math.PI,true);c.lineCap='round';c.lineWidth=15;c.strokeStyle=O;c.stroke();c.lineWidth=10;c.strokeStyle='#ffffff';c.stroke();
  c.setLineDash([7,7]);c.strokeStyle='#e03131';c.stroke();c.setLineDash([]);c.restore();}
const G3=spec({W:250,bh:100,lh:36,rw:28,bs:1.0,tag:'SWEET!',pat:PAT.stripes,
  body:[[0,'#e67700'],[.3,'#ffd43b'],[.6,'#fcc419'],[1,'#d9480f']],side:'#e08a00',top:'#ffe066',inner:'#fff9db',tissue:'#ffc9de',
  rib:['#ffc9c9','#f03e3e','#9a1515']});
const yellowO={h:G3.h,w:G3.w,rot:-Math.PI*0.9,burst:580,up:1.35,spin:14,draw:()=>gift(G3),
  parts(){const o=commonParts(G3);const bt=G3.h/2-G3.bh;const LC=['#ff4d6d','#4dabf7','#51cf66'];
    for(let i=0;i<3;i++)o.push({dx:(i-1)*60,dy:bt+10,h:30,rest:14,drag:1,draw:()=>lolly(LC[i],i)});
    for(let i=0;i<2;i++)o.push({dx:i?50:-50,dy:bt+20,h:20,rest:8,drag:1,draw:()=>cane(i)});
    for(let i=0;i<9;i++)o.push({dx:((i*53)%200)-100,dy:bt+20,h:24,rest:12,drag:.8,draw:()=>wrapped(CONF[i%6],i)});
    return o;},
  decal(x,g){openBox(G3,x,g);}};

// ================= 4 — BIG PINK STAR BOX + BALLOONS =================
function balloon(col,i){c.save();c.beginPath();c.moveTo(0,40);for(let k=1;k<=4;k++)c.quadraticCurveTo((k%2?8:-8),40+k*14-7,0,40+k*14);c.lineWidth=2.5;c.strokeStyle='#f1f3f5';c.stroke();
  c.beginPath();c.moveTo(0,32);c.lineTo(-6,42);c.lineTo(6,42);c.closePath();shape(col,2.5,O);
  c.beginPath();c.moveTo(0,34);c.bezierCurveTo(-40,26,-34,-40,0,-40);c.bezierCurveTo(34,-40,40,26,0,34);c.closePath();shape(rad(-10,-16,3,46,[[0,'#ffffff'],[.25,col],[1,col]]),4,O);
  c.beginPath();c.moveTo(0,34);c.bezierCurveTo(-40,26,-34,-40,0,-40);c.bezierCurveTo(34,-40,40,26,0,34);c.closePath();c.save();c.clip();ell(12,10,30,34);c.fillStyle='rgba(0,0,0,.14)';c.fill();c.restore();
  gloss(-13,-20,7,11,.4,.7);c.restore();}
const G4=spec({W:236,bh:180,lh:44,rw:34,bs:1.2,tag:'OPEN ME',pat:PAT.stars,
  body:[[0,'#a61e4d'],[.3,'#f06595'],[.6,'#e64980'],[1,'#8f1740']],side:'#a61e4d',top:'#f783ac',inner:'#fff0f6',tissue:'#c5f6fa',
  rib:['#ffffff','#99e9f2','#2f8ba0']});
const pinkO={h:G4.h,w:G4.w,rot:-Math.PI*0.95,burst:600,up:1.3,spin:12,draw:()=>gift(G4),
  parts(){const o=commonParts(G4);const bt=G4.h/2-G4.bh;const BC=['#ff4d6d','#4dabf7','#ffd43b','#51cf66','#cc5de8'];
    for(let i=0;i<5;i++)o.push({dx:(i-2)*44,dy:bt+30,h:150,rest:75,drag:1.2,g:-.32,draw:()=>balloon(BC[i],i)});
    for(let i=0;i<10;i++)o.push({dx:((i*41)%220)-110,dy:bt+30,h:12,rest:4,drag:2,vmax:220,flut:110,g:.6,draw:()=>streamer(i)});
    for(let i=0;i<20;i++)o.push({dx:((i*29)%240)-120,dy:bt+10,h:8,rest:2,drag:2.4,vmax:200,flut:100,g:.7,draw:()=>conf(i+3)});
    return o;},
  decal(x,g){openBox(G4,x,g);}};

// ---------- table: two mini presents, a party hat, an upright wrapping-paper roll; bunting on the wall ----------
const M1=spec({W:110,bh:70,lh:24,rw:16,bs:.55,d:24,pat:PAT.dots,body:[[0,'#087f5b'],[.35,'#20c997'],[1,'#066649']],side:'#087f5b',top:'#63e6be',rib:['#ffc9c9','#f03e3e','#9a1515']});
const M2=spec({W:74,bh:50,lh:20,rw:13,bs:.45,d:20,pat:PAT.stripes,body:[[0,'#1864ab'],[.35,'#4dabf7'],[1,'#123f6e']],side:'#1864ab',top:'#74c0fc',rib:['#fff6c2','#ffcf3a','#a87400']});
function partyHat(x,y){c.save();c.translate(x,y);c.beginPath();c.moveTo(-40,0);c.lineTo(0,-120);c.lineTo(40,0);c.quadraticCurveTo(0,12,-40,0);c.closePath();shape(lin(-40,0,40,0,[[0,'#ae3ec9'],[.4,'#da77f2'],[1,'#862e9c']]),4,O);
  c.save();c.clip();for(let k=0;k<5;k++){c.beginPath();c.moveTo(-60,-14-k*24);c.lineTo(60,-30-k*24);c.lineWidth=7;c.strokeStyle=k%2?'#ffd43b':'#ffffff';c.stroke();}c.restore();
  c.beginPath();c.moveTo(-40,0);c.lineTo(0,-120);c.lineTo(40,0);c.quadraticCurveTo(0,12,-40,0);c.closePath();c.lineWidth=4;c.strokeStyle=O;c.stroke();
  for(let k=0;k<8;k++){ell(Math.cos(k*.8)*9,-124+Math.sin(k*.8)*9,8,8);c.fillStyle='#ffd43b';c.fill();}ell(0,-124,11,11);shape('#ffe066',3,O);c.restore();}
function roll(x,y){c.save();c.translate(x,y);c.beginPath();c.rect(-26,-150,52,150);c.fillStyle=lin(-26,0,26,0,[[0,'#2f9e44'],[.35,'#69db7c'],[1,'#1e6b2e']]);c.fill();
  c.save();c.clip();for(let yy=-140;yy<10;yy+=28)for(let xx=-30;xx<30;xx+=22){star(xx+((yy/28)%2?11:0),yy,7,3);c.fillStyle='#ffd43b';c.fill();}c.fillStyle=lin(-26,0,26,0,[[0,'rgba(0,0,0,.25)'],[.4,'rgba(255,255,255,.15)'],[1,'rgba(0,0,0,.3)']]);c.fillRect(-26,-150,52,150);c.restore();
  c.beginPath();c.rect(-26,-150,52,150);c.lineWidth=4;c.strokeStyle=O;c.stroke();
  c.beginPath();c.moveTo(26,-60);c.lineTo(46,-46);c.lineTo(46,0);c.lineTo(26,0);c.closePath();shape(lin(26,0,46,0,[[0,'#40c057'],[1,'#2b8a3e']]),3,O);
  ell(0,-150,26,8);shape('#d8c29a',4,O);ell(0,-150,12,4);c.fillStyle='#8a6a3a';c.fill();c.restore();}
function bunting(){const x0=-20,x1=700,y0=598,sag=46;c.beginPath();for(let t=0;t<=1;t+=.05)c.lineTo(x0+(x1-x0)*t,y0+Math.sin(t*Math.PI)*sag);c.lineWidth=3;c.strokeStyle='#f8f0e0';c.stroke();
  for(let k=0;k<12;k++){const t=(k+.5)/12,x=x0+(x1-x0)*t,y=y0+Math.sin(t*Math.PI)*sag;c.beginPath();c.moveTo(x-22,y);c.lineTo(x+22,y+2);c.lineTo(x,y+40);c.closePath();shape(CONF[k%6],3,O);gloss(x-6,y+10,5,2.5,0,.4);}}
function onTable(){const y=880;bunting();
  c.save();c.translate(92,y-M1.h/2);gift(M1);c.restore();c.save();c.translate(86,y-M1.bh-M1.lh+6-M2.h/2+2);gift(M2);c.restore();
  partyHat(222,y);roll(314,y);}
return {tag:'CHALLENGE #30',ask:'WHICH GIFT WOULD YOU OPEN FIRST? &darr;',askStyle:{background:'#ffffff',color:'#e03131',border:'5px solid #e03131',fontSize:'40px',left:'90px',right:'90px'},
 palette:{wallTop:'#0e2a47',wallBot:'#1f6f8b',sky1:'#0a1430',sky2:'#24406e',night:true,floorA:'#fff4e3',floorB:'#3ccf9e'},
 objects:{red:redO,purple:purpleO,yellow:yellowO,pink:pinkO},onTable};};
