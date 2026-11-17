export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const ST=3.3,HIDE=6.45,Q=7.0,REV=13.1,END=19.8;
const D={
 duck(){c.beginPath();c.ellipse(0,30,70,46,0,0,7);fs(rad(-20,10,5,80,[[0,'#fff27a'],[1,'#ffc400']]),6,NV);c.beginPath();c.arc(-20,-30,42,0,7);fs(rad(-30,-40,5,45,[[0,'#fff27a'],[1,'#ffc400']]),6,NV);
   c.beginPath();c.moveTo(-60,-28);c.quadraticCurveTo(-95,-24,-92,-10);c.quadraticCurveTo(-75,-6,-58,-14);c.closePath();fs('#ff8a1f',5,NV);c.beginPath();c.arc(-30,-38,7,0,7);c.fillStyle=NV;c.fill();c.beginPath();c.arc(-32,-40,2.5,0,7);c.fillStyle='#fff';c.fill();
   c.beginPath();c.moveTo(10,20);c.quadraticCurveTo(50,0,60,30);c.lineWidth=5;c.strokeStyle='rgba(200,140,0,.8)';c.stroke();},
 apple(){c.beginPath();c.moveTo(0,-40);c.bezierCurveTo(50,-70,80,-10,60,30);c.bezierCurveTo(45,70,15,70,0,60);c.bezierCurveTo(-15,70,-45,70,-60,30);c.bezierCurveTo(-80,-10,-50,-70,0,-40);fs(rad(-20,-20,5,80,[[0,'#ff6b6b'],[1,'#c8102e']]),6,NV);
   c.lineWidth=7;c.strokeStyle='#6b3415';c.beginPath();c.moveTo(0,-40);c.lineTo(6,-66);c.stroke();c.beginPath();c.ellipse(26,-62,20,9,-0.4,0,7);fs('#2fd15a',4,NV);c.beginPath();c.ellipse(-28,-20,10,16,0.4,0,7);c.fillStyle='rgba(255,255,255,.5)';c.fill();},
 star(){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?32:72;c.lineTo(Math.cos(a)*r,Math.sin(a)*r+6);}c.closePath();fs(rad(-15,-15,5,75,[[0,'#fff6a0'],[1,'#ffb000']]),6,NV);c.beginPath();c.arc(-14,0,6,0,7);c.arc(14,0,6,0,7);c.fillStyle=NV;c.fill();},
 icecream(){c.beginPath();c.moveTo(-40,0);c.lineTo(40,0);c.lineTo(0,80);c.closePath();fs(lin(-40,0,40,0,[[0,'#f0b56c'],[1,'#c07a30']]),6,NV);c.strokeStyle='rgba(120,60,10,.5)';c.lineWidth=3;for(let i=-2;i<=2;i++){c.beginPath();c.moveTo(i*16-10,0);c.lineTo(i*8+10,50);c.stroke();}
   c.beginPath();c.arc(-18,-12,30,0,7);fs('#ffb3d1',6,NV);c.beginPath();c.arc(18,-12,30,0,7);fs('#a5e8ff',6,NV);c.beginPath();c.arc(0,-44,30,0,7);fs('#fff3c4',6,NV);c.beginPath();c.arc(4,-82,12,0,7);fs('#e5484d',5,NV);},
 rocket(){c.save();c.rotate(0.5);c.beginPath();c.moveTo(0,-80);c.quadraticCurveTo(36,-40,30,40);c.lineTo(-30,40);c.quadraticCurveTo(-36,-40,0,-80);fs(lin(-30,0,30,0,[[0,'#ffffff'],[1,'#b8c2d6']]),6,NV);c.beginPath();c.arc(0,-18,14,0,7);fs('#4dabf7',5,NV);
   for(const s of [-1,1]){c.beginPath();c.moveTo(s*28,10);c.lineTo(s*52,52);c.lineTo(s*26,42);c.closePath();fs('#e5484d',5,NV);}c.beginPath();c.moveTo(-18,44);c.quadraticCurveTo(0,96,18,44);fs('#ff8a1f',5,NV);c.restore();},
 crown(){c.beginPath();c.moveTo(-70,40);c.lineTo(-78,-40);c.lineTo(-38,-4);c.lineTo(0,-56);c.lineTo(38,-4);c.lineTo(78,-40);c.lineTo(70,40);c.closePath();fs(lin(0,-56,0,40,[[0,'#fff27a'],[1,'#e0a000']]),6,NV);
   for(const [x,col] of [[-40,'#e5484d'],[0,'#4dabf7'],[40,'#2fd15a']]){c.beginPath();c.arc(x,18,10,0,7);fs(col,4,NV);}},
 balloon(){c.beginPath();c.ellipse(0,-20,52,64,0,0,7);fs(rad(-18,-40,5,70,[[0,'#d8a5ff'],[1,'#8a3ffc']]),6,NV);c.beginPath();c.moveTo(-8,44);c.lineTo(8,44);c.lineTo(0,54);c.closePath();fs('#8a3ffc',4,NV);c.beginPath();c.moveTo(0,54);c.quadraticCurveTo(-14,70,4,84);c.lineWidth=4;c.strokeStyle=NV;c.stroke();c.beginPath();c.ellipse(-20,-46,10,18,0.4,0,7);c.fillStyle='rgba(255,255,255,.5)';c.fill();},
 donut(){c.beginPath();c.arc(0,0,66,0,7);fs('#e0a060',6,NV);c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=56+Math.sin(i*1.9)*5;c.lineTo(Math.cos(a)*r,Math.sin(a)*r-4);}c.closePath();fs('#ff6fa8',5,NV);c.beginPath();c.arc(0,-2,20,0,7);fs('#7a4a1c',5,NV);
   const S=['#4dabf7','#ffd21f','#2fd15a','#fff'];for(let i=0;i<14;i++){const a=i*2.4,r=30+(i*7%20);c.save();c.translate(Math.cos(a)*r,Math.sin(a)*r);c.rotate(a);c.fillStyle=S[i%4];c.fillRect(-6,-2,12,4);c.restore();}}};
const A=['duck','apple','star','icecream','rocket','crown','balloon','donut'];
const B=['crown','donut','apple','rocket','star','balloon','icecream'];
function card(x,y,name,s,hl=0){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-115,-115,230,230,36);fs(hl?'#fff7c2':'#ffffff',8,hl?Y:NV);if(name){c.save();c.scale(1.05,1.05);D[name]();c.restore();}else{K.text('?',0,8,140,'#c9cfe0',0);}c.restore();}
function pos(i,n=8){const col=i%2,row=Math.floor(i/2);return [290+col*500*0+ (col?790:290)-290, 330+row*260];}
function grid(list,t0,t,extra){list.forEach((nm,i)=>{const x=i%2?790:290,y=330+Math.floor(i/2)*260;card(x,y,nm,back((t-t0-i*.05)/.3));});}
function frame(t){K.sunburst(540,800,'#0e2a3a','#123647',t*.06,24);
 if(t<ST){const p=back(t/.4);c.save();c.translate(540,500);c.scale(p,p);c.beginPath();c.roundRect(-420,-170,840,340,50);fs(Y,9,NV);text('TESTE DE',0,-70,90,NV,0);text('MEMÓRIA',0,40,120,'#e5484d',0);c.restore();
   const q=back((t-1.6)/.4);if(q>0){c.save();c.translate(540,900);c.scale(q,q);c.beginPath();c.arc(0,0,120,0,7);fs('#fff',9,NV);text('3s',0,8,110,NV,0);c.restore();}return;}
 if(t<HIDE){grid(A,ST,t);const k=t-ST;const n=3-Math.floor(k/((HIDE-ST)/3));c.save();c.translate(540,1330);c.scale(1+.15*(1-((k%1.05)/1.05)),1+.15*(1-((k%1.05)/1.05)));c.beginPath();c.arc(0,0,80,0,7);fs('#e5484d',8,NV);text(String(Math.max(1,n)),0,6,96,'#fff',0);c.restore();return;}
 if(t<Q){const k=(t-HIDE)/(Q-HIDE);c.fillStyle=`rgba(255,255,255,${1-k})`;c.fillRect(0,0,1080,1920);const p=back((t-HIDE)/.25);c.save();c.translate(540,800);c.scale(p,p);text('PRONTO!',0,0,150,Y,24);c.restore();return;}
 grid(B,Q,t);
 const tp=back((t-Q)/.3);c.save();c.translate(540,1330);c.scale(tp,tp);c.beginPath();c.roundRect(-380,-62,760,124,62);fs(t<REV?'#fff':'#2fd15a',7,NV);text(t<REV?'QUAL SUMIU?':'ERA O PATINHO!',0,4,62,t<REV?NV:'#fff',0);c.restore();
 if(t>9.1&&t<REV){const p=(t-9.1)/(REV-9.1);c.beginPath();c.roundRect(240,1420,600,26,13);fs('rgba(255,255,255,.2)',4,NV);c.beginPath();c.roundRect(240,1420,600*(1-p),26,13);fs(Y,0);}
 if(t>=REV){const k=t-REV;c.fillStyle='rgba(8,20,30,.55)';c.fillRect(0,0,1080,1920);const p=back(k/.4);c.save();c.translate(540,720);c.rotate(Math.sin(k*6)*.06*Math.exp(-k));card(0,0,'duck',p*1.6,1);c.restore();
   for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=180+k*500;if(k<1){c.beginPath();c.arc(540+Math.cos(a)*r,720+Math.sin(a)*r,10*(1-k),0,7);c.fillStyle=['#ffd21f','#e5484d','#2fd15a','#4dabf7'][i%4];c.fill();}}
   if(t>END-1.2){const q=back((t-END+1.2)/.3);c.save();c.translate(540,1700);c.scale(q,q);c.beginPath();c.roundRect(-420,-50,840,100,50);K.fs(Y,6,NV);K.text('SEGUE · AMANHÃ TEM MAIS 2 FATOS',0,4,38,NV,0);c.restore();}}
}
return {frame};};
