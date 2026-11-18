const TL=await (await fetch('/timeline.json')).json();
const cv=document.getElementById('cv');let c=cv.getContext('2d');
const W=1080,H=1920,OUT='#1d2430',SC=1.25;
const lin=(x0,y0,x1,y1,st)=>{const g=c.createLinearGradient(x0,y0,x1,y1);st.forEach(([o,k])=>g.addColorStop(o,k));return g;};
const rad=(x,y,r0,r1,st)=>{const g=c.createRadialGradient(x,y,r0,x,y,r1);st.forEach(([o,k])=>g.addColorStop(o,k));return g;};
const shape=(f,lw=4,s=OUT)=>{c.fillStyle=f;c.fill();if(lw){c.lineWidth=lw;c.strokeStyle=s;c.lineJoin='round';c.lineCap='round';c.stroke();}};
const ell=(x,y,rx,ry,r=0)=>{c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),r,0,7);};
const ease=t=>1-Math.pow(1-t,3),inout=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,L=(a,b,t)=>a+(b-a)*t,cl=(x,a,b)=>Math.max(a,Math.min(b,x));
function $(id){return document.getElementById(id);}
$('tag').textContent='CHALLENGE #15';$('ask').innerHTML='WHICH GOAL WAS THE BEST? &darr;';Object.assign($('ask').style,{background:'#c6f432',color:'#111'});
/*PERSON*/
// ---------- stadium (camera behind the goal) ----------
const HZ=760,GND=1300,PL=46,PR=1034,BAR=450;
const bg=document.createElement('canvas');bg.width=W;bg.height=H;{const g=bg.getContext('2d');
 const sky=g.createLinearGradient(0,0,0,HZ);sky.addColorStop(0,'#04071a');sky.addColorStop(1,'#1b2a5e');g.fillStyle=sky;g.fillRect(0,0,W,HZ);
 for(let r=0;r<11;r++){const y=420+r*28;g.fillStyle=r%2?'#1d2547':'#232d55';g.fillRect(0,y,W,28);for(let x=6;x<W;x+=14){const h=(x*7+r*13)%4;const col=['#e5484d','#f5f5f5','#3b82f6','#ffd21f','#2fd15a','#ff8a2b'][(x*3+r*5)%6];
  g.fillStyle=col;g.fillRect(x-5,y+13-h,10,11);g.fillStyle=['#f1c19a','#c98a5f','#8a5a35','#e8b48f'][(x+r)%4];g.beginPath();g.arc(x,y+9-h,4.2,0,7);g.fill();}}
 g.fillStyle='#0d1636';g.fillRect(0,HZ-44,W,44);g.font='900 26px Inter';g.textBaseline='middle';const ads=['HIT 0 MS','PAUSE AT 0ms','HIT 0 MS','SAVE IT'];for(let i=0;i<4;i++){g.fillStyle=i%2?'#c6f432':'#2bff7a';g.fillText(ads[i],24+i*270,HZ-22);}
 for(const x of [120,960]){const lg=g.createRadialGradient(x,110,5,x,110,460);lg.addColorStop(0,'rgba(255,255,240,.95)');lg.addColorStop(.1,'rgba(255,255,220,.35)');lg.addColorStop(1,'rgba(255,255,220,0)');g.fillStyle=lg;g.fillRect(0,0,W,HZ);
  g.fillStyle='#e6ebf5';for(let i=0;i<3;i++)for(let k=0;k<4;k++){g.beginPath();g.arc(x-36+k*24,80+i*22,9,0,7);g.fill();}}
 for(let i=0;i<24;i++){const y0=HZ+i*i*2.3+i*6,y1=HZ+(i+1)*(i+1)*2.3+(i+1)*6;g.fillStyle=i%2?'#2f9a3d':'#36a945';g.fillRect(0,y0,W,y1-y0+1);}
 const VP=[540,HZ-300];const P=(x,y)=>[x,y];g.strokeStyle='rgba(255,255,255,.85)';g.lineCap='round';
 // penalty box & 6-yard box (perspective trapezoids)
 g.lineWidth=4;g.beginPath();g.moveTo(170,HZ+40);g.lineTo(910,HZ+40);g.moveTo(170,HZ+40);g.lineTo(-60,GND);g.moveTo(910,HZ+40);g.lineTo(1140,GND);g.stroke();
 g.lineWidth=7;g.beginPath();g.moveTo(300,1090);g.lineTo(780,1090);g.moveTo(300,1090);g.lineTo(230,GND);g.moveTo(780,1090);g.lineTo(850,GND);g.stroke();
 g.beginPath();g.ellipse(540,HZ+52,90,12,0,0,Math.PI);g.lineWidth=4;g.stroke();g.fillStyle='#fff';g.beginPath();g.ellipse(585,940,9,3,0,0,7);g.fill();
 const vg=g.createRadialGradient(540,900,300,540,900,1100);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.4)');g.fillStyle=vg;g.fillRect(0,0,W,H);}
function goalFrame(){const post=(x0,y0,x1,y1,w)=>{c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.lineCap='round';c.lineWidth=w+8;c.strokeStyle=OUT;c.stroke();c.lineWidth=w;c.strokeStyle=lin(x0-w,0,x0+w,0,[[0,'#cfd6e2'],[.5,'#ffffff'],[1,'#b8c2d2']]);c.stroke();};
 post(PL,H+40,PL,BAR,30);post(PR,H+40,PR,BAR,30);post(PL,BAR,PR,BAR,30);}
function net(cx,cy,bulge){const step=46;const disp=(x,y)=>{if(bulge<=0)return [x,y];const dx=x-cx,dy=y-cy,d2=dx*dx+dy*dy;const k=bulge*Math.exp(-d2/(2*170*170));return [x+dx*k*0.55,y+dy*k*0.55];};
 c.save();c.beginPath();c.rect(PL,BAR,PR-PL,H-BAR);c.clip();c.lineWidth=2.2;
 for(let i=-30;i<30;i++){for(const dir of [1,-1]){c.beginPath();let first=true;for(let t=0;t<=1;t+=0.02){const x=PL+(i*step)+dir*t*(H-BAR),y=BAR+t*(H-BAR);if(x<PL-60||x>PR+60){first=true;continue;}const [px,py]=disp(x,y);first?c.moveTo(px,py):c.lineTo(px,py);first=false;}
   c.strokeStyle='rgba(255,255,255,.32)';c.stroke();}}
 c.restore();}
function ball(x,y,r,spin){c.save();c.translate(x,y);c.rotate(spin);c.beginPath();c.arc(0,0,r,0,7);c.fillStyle=rad(-r*.35,-r*.35,r*.1,r*1.2,[[0,'#ffffff'],[.7,'#e9edf5'],[1,'#9aa6ba']]);c.fill();c.lineWidth=Math.max(2,r*0.06);c.strokeStyle=OUT;c.stroke();
 c.save();c.clip();c.fillStyle='#1d2430';const pent=(px,py,s)=>{c.beginPath();for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;c.lineTo(px+Math.cos(a)*s,py+Math.sin(a)*s);}c.closePath();c.fill();};
 pent(0,0,r*0.32);for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;pent(Math.cos(a)*r*0.95,Math.sin(a)*r*0.95,r*0.28);c.strokeStyle='rgba(29,36,48,.55)';c.lineWidth=Math.max(1,r*0.035);c.beginPath();c.moveTo(Math.cos(a)*r*0.32,Math.sin(a)*r*0.32);c.lineTo(Math.cos(a)*r*0.7,Math.sin(a)*r*0.7);c.stroke();}c.restore();
 c.beginPath();c.ellipse(-r*0.35,-r*0.42,r*0.32,r*0.15,-0.6,0,7);c.fillStyle='rgba(255,255,255,.75)';c.fill();c.restore();}
function glove(x,y,r,sd){c.save();c.translate(x,y);c.scale(sd,1);c.rotate(0.35);
 c.beginPath();c.roundRect(-r*0.15,r*0.55,r*0.75,r*0.9,r*0.2);shape(lin(0,r*.5,0,r*1.5,[[0,'#2b2b2b'],[1,'#111']]),5);
 c.beginPath();c.roundRect(-r*0.25,-r*0.55,r*0.95,r*1.25,r*0.35);shape(lin(-r*.3,0,r*.7,0,[[0,'#ffffff'],[1,'#d5dbe6']]),5);
 for(let i=0;i<4;i++){c.beginPath();c.roundRect(-r*0.22+i*r*0.23,-r*1.15,r*0.21,r*0.7,r*0.1);shape(lin(0,-r*1.15,0,-r*0.45,[[0,'#ffffff'],[1,'#dfe4ee']]),4);}
 c.beginPath();c.roundRect(-r*0.62,-r*0.25,r*0.42,r*0.28,r*0.12);shape('#ffffff',4);c.beginPath();c.roundRect(-r*0.2,r*0.3,r*0.85,r*0.22,6);shape('#c6f432',4);c.restore();}
function gloves(x,y,r){glove(x-r*1.55,y+r*0.25,r*0.85,1);glove(x+r*1.55,y+r*0.25,r*0.85,-1);}
// ---------- shots ----------
const SHOT={
 penalty:{kick:[560,900],ks:0.62,from:[585,936],to:[770,870],arc:-150,curve:0,r0:11,r1:115},
 freekick:{kick:[300,850],ks:0.55,from:[338,886],to:[380,800],arc:-210,curve:330,r0:10,r1:110,wall:true},
 bicycle:{kick:[690,820],ks:0.58,from:[672,770],to:[420,760],arc:-60,curve:-80,r0:12,r1:112,bike:true},
 rocket:{kick:[840,830],ks:0.5,from:[862,866],to:[570,690],arc:-90,curve:-120,r0:9,r1:120,fire:true}};
function bpos(s,u){const p=Math.pow(u,1.8);const x=L(s.from[0],s.to[0],p)+s.curve*Math.sin(Math.PI*u)*(1-u),y=L(s.from[1],s.to[1],p)+s.arc*Math.sin(Math.PI*u),r=s.r0*Math.pow(s.r1/s.r0,Math.pow(u,2.2));return [x,y,r];}
const KP={stand:POSES.stand,back:{...POSES.stand,tor:-0.15,hpN:-0.9,knN:1.3,shN:0.7,shF:-0.6,elN:0.3},kick:{...POSES.stand,tor:-0.25,hpN:1.5,knN:-0.1,shN:-0.8,shF:0.9,elN:0.4,ft:1}};
function kicker(s,u,phase){const [kx,ky]=s.kick;let P,rot=0,yy=ky;
 if(s.bike){const b=cl(phase<0?(phase+1)*0.5:0.5+u,0,1);P=mix(KP.back,{...POSES.dive,hpN:2.7,knN:-0.2,hpF:0.4,shN:-1.2,shF:-1.4,ft:1},b);rot=Math.PI*0.9*b;yy=ky-110*Math.sin(Math.PI*b);}
 else P=phase<0?mix(KP.stand,KP.back,cl(phase+1,0,1)):mix(KP.back,KP.kick,cl(phase*4,0,1));
 person(CH.striker,P,kx,yy,rot,s.ks);}
function wall(){for(let i=0;i<4;i++){const x=440+i*82,y=1010;person(CH.keeper,{...POSES.stand,shN:0.5,elN:2.3,shF:0.45,elF:2.4,face:'o'},x,y,0,0.95);}}
function goalFX(t){c.save();c.globalAlpha=Math.max(0,1-t*1.2);c.fillStyle='rgba(255,255,255,.45)';c.fillRect(0,0,W,H);c.restore();
 for(let i=0;i<46;i++){const a=i*2.4,sp=300+(i*53)%420;const px=540+Math.cos(a)*sp*t*1.4,py=640+Math.sin(a)*sp*t-260*t+700*t*t;c.save();c.translate(px,py);c.rotate(i+t*9);c.fillStyle=['#ffd21f','#e5484d','#2bff7a','#3b82f6','#fff'][i%5];c.fillRect(-8,-4,16,8);c.restore();}
 const s=t<0.12?L(2.4,1,t/0.12):1+0.035*Math.sin(t*22);c.save();c.translate(540,560);c.scale(s,s);c.rotate(-0.06);c.font='400 200px Anton';c.textAlign='center';c.textBaseline='middle';c.lineWidth=24;c.strokeStyle='#0d1636';c.lineJoin='round';c.strokeText('GOAL!',0,0);c.fillStyle=lin(0,-90,0,90,[[0,'#fff6a0'],[1,'#ffb000']]);c.fillText('GOAL!',0,0);c.restore();
 for(let i=0;i<14;i++){if(((i*37+Math.floor(t*30))%6)===0){const fx=(i*97)%W,fy=430+(i*61)%300;c.beginPath();c.arc(fx,fy,9,0,7);c.fillStyle='rgba(255,255,255,.95)';c.fill();}}}
window.renderAt=(f0)=>{const fps=TL.fps;const f=(f0+TL.offset)%TL.total;const ff=f*30/fps;const A=TL.attempts;const ai=A.findIndex(x=>f>=x.start&&f<x.end);const a=A[ai];const nx=A[(ai+1)%A.length];const k=f-a.impact;
 let s=SHOT[a.obj],u=0,phase=-1,caught=false,fx=-1,rwv=-1,shake=0;
 if(f<a.release){phase=-1+(f-a.start)/(a.release-a.start);}
 else if(f<a.impact){u=(f-a.release)/(a.impact-a.release);phase=1;}
 else if(k===0){u=1;caught=true;phase=1;}
 else if(k<a.hold){fx=k/fps;u=1;phase=1;shake=k<14?(14-k)/14:0;}
 else{rwv=(k-a.hold+1)/(a.rw+1);if(rwv<0.75){u=1-inout(rwv/0.75);phase=u>0?1:-0.01;}else{s=SHOT[nx.obj];u=0;phase=-1;}}
 c.save();if(shake)c.translate(Math.sin(ff*7.1)*12*shake,Math.cos(ff*9.3)*12*shake);c.drawImage(bg,0,0);
 if(s.wall)wall();kicker(s,u,phase);
 let [X,Y,R]=bpos(s,u);if(fx>=0){const pr=Math.sin(Math.PI*cl(fx/0.35,0,1));R=s.r1*(1+0.12*pr);Y=s.to[1]+Math.max(0,fx-0.3)*Math.max(0,fx-0.3)*2600;R*=1-Math.min(0.5,Math.max(0,fx-0.3)*0.9);}
 if(u>0&&!caught&&fx<0){for(let i=1;i<8;i++){const [tx,ty,tr]=bpos(s,Math.max(0,u-i*0.03));c.beginPath();c.arc(tx,ty,tr*(1-i*0.08),0,7);c.fillStyle=s.fire?`rgba(255,${150-i*14},20,${0.5-i*0.06})`:`rgba(255,255,255,${0.25-i*0.03})`;c.fill();}}
 if(u>0||phase>0.2)ball(X,Y,R,ff*0.6*(fx>=0?0.3:1));else ball(s.from[0],s.from[1],s.r0,0);
 if(caught)gloves(X,Y,R);
 const bulge=fx>=0?Math.sin(Math.PI*cl(fx/0.45,0,1))*1.3:0;net(s.to[0],s.to[1],bulge);goalFrame();
 if(fx>=0)goalFX(fx);
 c.restore();
 const ms=Math.round(k*1000/fps);let res,col;if(ms===0){res='PERFECT!';col='var(--g)';}else if(Math.abs(ms)<=100){res='ALMOST!';col='var(--y)';}else if(ms<0){res='TOO EARLY';col='var(--r)';}else{res='TOO LATE';col='var(--o)';}
 $('lv').textContent=`LEVEL ${a.level} / ${A.length}`;$('sp').textContent=`SPEED ${Math.round(a.speed*100)}%`;$('res').textContent=res;$('res').style.color=col;$('val').textContent=(ms>0?'+':'')+ms+' ms';$('val').style.color=col;
 $('mk').style.left=(50+Math.max(-1,Math.min(1,ms/1000))*50)+'%';$('hud').classList.toggle('perfect',ms===0);$('secret').style.display=caught?'flex':'none';$('word').textContent=`"${a.word}"`;
 $('rw').style.opacity=rwv>=0?(0.55+0.45*Math.abs(Math.sin(ff*0.9))):0;};
window.hideUI=()=>{$('ui').style.display='none';};
await document.fonts.ready;window.ready=true;
