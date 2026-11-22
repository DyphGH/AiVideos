export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const T1=4.3,T2=9.85,T3=15.1,T4=19.15;
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);text(txt,0,4,size,fg,0);c.restore();}
function denim(t){c.fillStyle=lin(0,0,1080,1920,[[0,'#2f5ea8'],[.5,'#244a8a'],[1,'#17305e']]);c.fillRect(0,0,1080,1920);
  c.save();c.globalAlpha=.13;c.strokeStyle='#fff';c.lineWidth=2;for(let i=-1920;i<1080;i+=9){c.beginPath();c.moveTo(i,0);c.lineTo(i+1920,1920);c.stroke();}c.globalAlpha=.08;c.strokeStyle='#000';for(let i=0;i<3000;i+=13){c.beginPath();c.moveTo(i,0);c.lineTo(i-1920,1920);c.stroke();}c.restore();
  c.fillStyle=rad(540,860,100,1200,[[0,'rgba(255,255,255,.1)'],[1,'rgba(0,0,0,.45)']]);c.fillRect(0,0,1080,1920);}
function stitch(x0,y0,x1,y1){c.save();c.setLineDash([22,14]);c.lineWidth=6;c.strokeStyle='#e8a33a';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.restore();}
// vertical zipper: teeth from y0..y1 around x, open below yOpen (spread)
function zipper(x,y0,y1,yS,t,s=1){const tw=34*s,th=20*s;
  for(let y=y0;y<y1;y+=th){const open=y>yS?Math.min(1,(y-yS)/220):0;const sp=open*70*s;
    for(const side of [-1,1]){const off=(side<0?0:th/2);const yy=y+off;const xx=x+side*(10*s+sp)+(side<0?-tw+8*s:-8*s);
      c.beginPath();c.roundRect(xx,yy,tw,th*0.62,5*s);fs(lin(xx,0,xx+tw,0,[[0,'#f7e7a6'],[.5,'#d8b04a'],[1,'#8c6a1a']]),2.5*s,'#4a3608');}}
  // tape
  for(const side of [-1,1]){c.fillStyle='#1a2a4a';c.fillRect(x+side*(44*s)+(side<0?-40*s:0),y0,40*s,y1-y0);}}
function slider(x,y,s,rot=0){c.save();c.translate(x,y);c.scale(s,s);
  c.beginPath();c.moveTo(-58,-40);c.lineTo(58,-40);c.lineTo(44,50);c.lineTo(-44,50);c.closePath();fs(lin(-58,0,58,0,[[0,'#8d96a3'],[.4,'#eef2f6'],[1,'#6b7480']]),6,NV);
  c.save();c.rotate(rot);c.beginPath();c.roundRect(-46,10,92,230,30);fs(lin(-46,0,46,0,[[0,'#7d8794'],[.45,'#f4f7fa'],[1,'#5f6873']]),7,NV);
  c.beginPath();c.roundRect(-26,190,52,28,14);c.fillStyle='rgba(13,22,54,.8)';c.fill();
  text('YKK',0,110,58,'#ffd21f',10,NV);c.beginPath();c.ellipse(-20,60,10,40,0,0,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();c.restore();c.restore();}
function globe(x,y,r,t,half){c.save();c.translate(x,y);c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.3,-r*.3,r*.1,r*1.1,[[0,'#7cc8ff'],[1,'#1f6fd1']]),9,NV);
  c.save();c.beginPath();c.arc(0,0,r,0,7);c.clip();c.fillStyle='#3ccf73';
  for(const [lx,ly,rx,ry,a] of [[-.35,-.35,.32,.2,.3],[.25,-.4,.4,.18,-.2],[-.2,.25,.18,.35,.4],[.35,.2,.28,.3,-.3],[.55,-.05,.12,.2,0]]){c.beginPath();c.ellipse(((lx*r+t*40)%(2*r))-0,ly*r,rx*r,ry*r,a,0,7);c.fill();}
  if(half>0){c.beginPath();c.rect(-r,-r,2*r*half,2*r);c.clip();c.fillStyle='rgba(13,22,54,.25)';c.fillRect(-r,-r,2*r,2*r);
    for(let yy=-r;yy<r;yy+=60){c.save();c.translate(0,yy);for(let xx=-r;xx<r;xx+=26){c.beginPath();c.roundRect(xx,-12,20,12,4);fs('#d8b04a',2,'#4a3608');c.beginPath();c.roundRect(xx+13,0,20,12,4);fs('#d8b04a',2,'#4a3608');}c.restore();}}
  c.restore();c.beginPath();c.ellipse(-r*.4,-r*.5,r*.25,r*.1,-.6,0,7);c.fillStyle='rgba(255,255,255,.45)';c.fill();c.restore();}
function flagJP(x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.rotate(-.06);c.beginPath();c.roundRect(-90,-60,180,120,10);fs('#fff',6,NV);c.beginPath();c.arc(0,0,34,0,7);c.fillStyle='#e5484d';c.fill();c.restore();}
function factory(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.moveTo(-160,80);c.lineTo(-160,-20);c.lineTo(-100,-60);c.lineTo(-100,-20);c.lineTo(-40,-60);c.lineTo(-40,-20);c.lineTo(20,-60);c.lineTo(20,-20);c.lineTo(160,-20);c.lineTo(160,80);c.closePath();fs('#dfe6f5',7,NV);
  c.beginPath();c.roundRect(100,-120,36,100,4);fs('#c7d2e8',6,NV);for(let i=0;i<3;i++){const k=(t*0.6+i/3)%1;c.beginPath();c.arc(118+k*30,-130-k*120,18+k*24,0,7);c.fillStyle=`rgba(255,255,255,${0.6*(1-k)})`;c.fill();}
  for(let i=0;i<4;i++){c.beginPath();c.roundRect(-140+i*70,10,44,36,4);fs('#4fa3ff',5,NV);}text('YKK',60,-48,0?0:44,'#e5484d',0);c.restore();}
function frame(t){
 if(t<T2&&t<T1){denim(t);stitch(300,0,300,1920);stitch(780,0,780,1920);
   const yS=520+ease(t/3.5)*260;const z=1+0.04*Math.sin(t*3);c.save();c.translate(540,0);c.scale(z,1);c.translate(-540,0);zipper(540,-40,1500,yS,t,2.1);c.restore();
   slider(540,yS-60,1.75+0.1*back(t/.4),Math.sin(t*2)*.08);
   const p=back(t/.35);c.save();c.translate(540,170);c.scale(p,p);text('O SEGREDO',0,0,104,'#fff',20);text('DO SEU ZÍPER',0,110,92,Y,20);c.restore();
   if(t>2.3){const q=back((t-2.3)/.3);c.save();c.translate(840,yS+60);c.scale(q,q);c.rotate(.1);c.beginPath();c.arc(0,0,74,0,7);fs('#e5484d',8,NV);text('?',0,8,100,'#fff',0);c.restore();
     c.save();c.globalAlpha=.6+.4*Math.sin(t*10);c.strokeStyle=Y;c.lineWidth=10;c.beginPath();c.roundRect(540-105,yS-60+190-70,210,140,30);c.stroke();c.restore();}
   return;}
 if(t<T2){const k=t-T1;K.sunburst(540,820,'#0b1a45','#10265e',t*.08,22);
   globe(540,860,Math.max(1,300*back(k/.45)),t,k>3.4?ease((k-3.4)/1.6)*0.5:0);
   if(k<3.4){flagJP(250,460,back((k-.2)/.4));factory(800,470,.95*back((k-.4)/.4),t);}
   if(k>3.5){const q=back((k-3.6)/.35);c.save();c.translate(540,420);c.scale(q,q);text('QUASE',0,-60,90,'#fff',18);text('METADE DO MUNDO',0,50,86,Y,18);c.restore();}
   if(k>.1&&k<3.4){const q=back((k-.1)/.35);c.save();c.translate(540,240);c.scale(q,q);text('FÁBRICA JAPONESA',0,0,74,'#fff',16);c.restore();}
   return;}
 if(t<T3){const k=t-T2;denim(t);
   const L=[['Y','OSHIDA','#ffd21f'],['K','OGYO','#7be0a8'],['K','ABUSHIKI-KAISHA','#ff9fbd']];
   L.forEach(([a,rest,col],i)=>{const y=520+i*230;const p=back((k-i*.25)/.35);if(p<=0)return;const ex=ease((k-1.0-i*.15)/.6);
     c.save();c.translate(540,y);c.scale(p,p);c.font='900 150px M';const wa=c.measureText(a).width;c.font=`900 ${i==2?62:84}px M`;const wr=c.measureText(rest).width*ex;const W=wa+wr;
     c.beginPath();c.roundRect(-W/2-40,-105,W+80,190,40);fs('rgba(13,22,54,.75)',6,col);
     K.rich([[a,col]],-W/2+wa/2,0,150,18);c.save();c.beginPath();c.rect(-W/2+wa,-100,wr+10,200);c.clip();c.font=`900 ${i==2?62:84}px M`;c.textAlign='left';c.textBaseline='middle';c.lineWidth=14;c.strokeStyle=NV;c.strokeText(rest,-W/2+wa+6,14);c.fillStyle='#fff';c.fillText(rest,-W/2+wa+6,14);c.restore();c.restore();});
   if(k>2.85){const q=back((k-2.85)/.35);pill(540,1230,q,'SOBRENOME DO FUNDADOR · 1934',Y,NV,40,-.03);}
   const p=back(k/.3);c.save();c.translate(540,230);c.scale(p,p);text('Y K K =',0,0,120,'#fff',20);c.restore();
   return;}
 if(t<T4){const k=t-T3;K.sunburst(540,860,'#ffcf3f','#ffbe1a',t*.2,20);
   // horizontal zipper closing fast at 1.95s
   const cl=ease((k-1.75)/.45);const xs=80+cl*920;
   c.save();c.translate(0,860);c.rotate(-Math.PI/2);c.translate(-860,0);c.restore();
   c.save();c.translate(540,860);c.rotate(-Math.PI/2);zipper(0,-560,560,(xs-540),t,1.4);c.restore();
   slider(xs,860,1.0,-Math.PI/2+0.0);
   if(k<1.8){const q=back(k/.35);c.save();c.translate(540,360);c.scale(q,q);text('POR QUE',0,-60,110,'#fff',20);text('"ZÍPER"?',0,70,130,'#e5484d',20);c.restore();}
   if(k>1.85){const q=back((k-1.85)/.3);c.save();c.translate(540,420);c.scale(q*1.1,q*1.1);c.rotate(-.08);c.beginPath();for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,r=i%2?150:210;c.lineTo(Math.cos(a)*r*1.4,Math.sin(a)*r);}c.closePath();fs('#fff',9,NV);text('ZIP!',0,10,150,'#e5484d',0);c.restore();
     for(let i=0;i<6;i++){c.save();c.globalAlpha=clamp(1-(k-1.85)*1.5,0,1);c.fillStyle='#fff';c.fillRect(xs-120-i*90,860-60+i*20,70,10);c.restore();}}
   return;}
 const k=t-T4;denim(t);zipper(540,-40,1100,2000,t,1.7);slider(540,620,1.4,Math.sin(t*3)*.1);
 const q=back(k/.35);c.save();c.translate(540,220);c.scale(q,q);text('O SEU TEM',0,-55,96,'#fff',20);text('YKK?',0,65,120,Y,20);c.restore();
 const pulse=1+.05*Math.sin(t*8);pill(300,1180,back((k-1.6)/.3)*pulse,'✓ SIM'.replace('✓ ',''),'#3ccf73','#fff',64,-.04);pill(780,1180,back((k-2.05)/.3)*pulse,'NÃO','#e5484d','#fff',64,.04);
 if(k>2.6)pill(540,1360,back((k-2.6)/.3),'COMENTA ↓','#fff',NV,44);
}
return {frame};};
