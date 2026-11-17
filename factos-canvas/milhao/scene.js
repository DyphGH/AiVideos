export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text,rich}=K;
const fmt=v=>'R$ '+v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const val=d=>0.01*Math.pow(2,d-1);
function coin(x,y,r,rot=0,lab=true){c.save();c.translate(x,y);c.scale(Math.max(0.02,Math.abs(Math.cos(rot))),1);
  c.beginPath();c.arc(0,0,r,0,7);fs(rad(-r*.3,-r*.35,r*.1,r*1.1,[[0,'#fff3b0'],[.45,'#ffc928'],[1,'#c07a00']]),Math.max(3,r*.07),NV);
  c.beginPath();c.arc(0,0,r*.78,0,7);c.lineWidth=r*.05;c.strokeStyle='rgba(150,90,0,.6)';c.stroke();
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;c.beginPath();c.moveTo(Math.cos(a)*r*.86,Math.sin(a)*r*.86);c.lineTo(Math.cos(a)*r*.95,Math.sin(a)*r*.95);c.lineWidth=r*.02;c.stroke();}
  if(lab){c.font=`900 ${r*.75}px M`;c.textAlign='center';c.textBaseline='middle';c.fillStyle='rgba(150,90,0,.85)';c.fillText('1',0,-r*.08);c.font=`900 ${r*.17}px M`;c.fillText('CENTAVO',0,r*.45);}
  c.beginPath();c.ellipse(-r*.35,-r*.45,r*.28,r*.1,-0.6,0,7);c.fillStyle='rgba(255,255,255,.7)';c.fill();c.restore();}
function bill(x,y,w,h,a=0){c.save();c.translate(x,y);c.rotate(a);c.beginPath();c.roundRect(-w/2,-h/2,w,h,8);fs(lin(-w/2,0,w/2,0,[[0,'#3fbf7f'],[.5,'#7be0a8'],[1,'#2a9d6a']]),5,NV);
  c.beginPath();c.roundRect(-w/2+10,-h/2+10,w-20,h-20,6);c.lineWidth=3;c.strokeStyle='rgba(13,22,54,.35)';c.stroke();
  c.beginPath();c.arc(0,0,h*.28,0,7);fs('rgba(255,255,255,.35)',3,'rgba(13,22,54,.35)');c.font=`900 ${h*.26}px M`;c.textAlign='center';c.textBaseline='middle';c.fillStyle='#0d4a2e';c.fillText('R$',0,2);
  c.font=`900 ${h*.2}px M`;c.fillText('100',-w/2+38,-h/2+26);c.fillText('100',w/2-38,h/2-24);c.restore();}
function stack(x,y,n,w=230,h=110){for(let i=0;i<n;i++){c.save();c.translate(x,y-i*14);c.beginPath();c.roundRect(-w/2,-h/2,w,h,8);fs(lin(0,-h/2,0,h/2,[[0,'#6fd89c'],[1,'#2a9d6a']]),5,NV);c.restore();}
  bill(x,y-(n-1)*14,w,h);c.beginPath();c.rect(x-24,y-(n-1)*14-h/2-2,48,(n-1)*14+h+4);fs('#ffd21f',4,NV);}
function moneyPile(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);const P=[[-130,60,6],[130,60,6],[0,60,7],[-65,-40,6],[65,-40,6],[0,-140,6]];P.forEach(([px,py,n],i)=>stack(px,py+Math.sin(t*3+i)*3,n));c.restore();}
function pill(x,y,s,txt,bg=Y,fg=NV,size=56){c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);text(txt,0,4,size,fg,0);c.restore();}
function split(t,p){ // p 0..1 intro
  c.fillStyle='#1f5a52';c.fillRect(0,0,540,1920);c.fillStyle='#4a2a6b';c.fillRect(540,0,540,1920);
  c.save();c.globalAlpha=.12;c.translate(540,900);c.rotate(t*.1);c.fillStyle='#fff';for(let i=0;i<24;i++){c.beginPath();c.moveTo(0,0);c.arc(0,0,2400,i*Math.PI/12,(i+.5)*Math.PI/12);c.closePath();c.fill();}c.restore();
  c.fillStyle=rad(540,900,50,1300,[[0,'rgba(255,255,255,.08)'],[1,'rgba(0,0,0,.5)']]);c.fillRect(0,0,1080,1920);}
function vs(t,s){c.save();c.translate(540,880);c.scale(s,s);c.beginPath();c.moveTo(40,-330);c.lineTo(-20,-30);c.lineTo(40,-30);c.lineTo(-30,330);c.lineTo(10,20);c.lineTo(-40,20);c.closePath();fs(Y,7,NV);
  c.beginPath();c.arc(0,0,92,0,7);fs(NV,8,Y);text('VS',0,6,78,Y,0);c.restore();}
function sparkles(t,n=26,col='255,230,120'){for(let i=0;i<n;i++){const x=(i*397)%1080,y=((i*211)-t*60*(1+i%3))%1920;const yy=y<0?y+1920:y;const s=2+(i%4)*2*(0.6+0.4*Math.sin(t*4+i));c.beginPath();c.arc(x,yy,s,0,7);c.fillStyle=`rgba(${col},.5)`;c.fill();}}
function calendar(x,y,d,s){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-170,-150,340,320,34);fs('#fff',8,NV);c.beginPath();c.roundRect(-170,-150,340,100,[34,34,0,0]);fs('#e5484d',8,NV);
  text('DIA',0,-100,56,'#fff',0);text(String(d),0,60,170,NV,0);for(const xx of [-90,90]){c.beginPath();c.roundRect(xx-12,-180,24,60,12);fs('#cfd6e4',6,NV);}c.restore();}
function coinTower(x,y,n,t){const m=Math.min(n,24);for(let i=0;i<m;i++){const yy=y-i*13;c.save();c.translate(x+Math.sin(i*1.3)*4,yy);c.scale(1,.32);coin(0,0,70,0,false);c.restore();}}
function bg2(t){K.sunburst(540,700,'#0b1a45','#10265e',t*.08,22);sparkles(t);}
const A=6.25,B=9.1,C=12.15,D=14.2,E=18.4,F=20.0;
function frame(t){
 if(t<B){split(t);const p=ease(t/.5);
   // left money
   c.save();c.translate(-300*(1-p),0);moneyPile(270,880,.75,t);text('R$ 1',270,470,96,'#7be0a8',16);text('MILHÃO',270,570,84,'#7be0a8',16);pill(270,1180,1,'AGORA',Y,NV,50);c.restore();
   // right coin
   c.save();c.translate(300*(1-p),0);const bob=Math.sin(t*3)*14;c.save();c.translate(810,880+bob);c.rotate(Math.sin(t*2)*.08);coin(0,0,150,t*1.4%(Math.PI*2));c.restore();
   text('1',810,470,96,Y,16);text('CENTAVO',810,570,76,Y,16);
   const q=ease((t-2.6)/.4);if(q>0){pill(810,1150,back((t-2.6)/.4),'x2 TODO DIA','#ff5ca8','#fff',46);}const r=ease((t-4.2)/.4);if(r>0)pill(810,1260,back((t-4.2)/.4),'30 DIAS','#fff',NV,46);c.restore();
   vs(t,back((t-.4)/.4)*(1+.04*Math.sin(t*6)));
   const tp=back(t/.4);c.save();c.translate(540,250);c.scale(tp,tp);text('VOCÊ PREFERE?',0,0,96,'#fff',20);c.restore();
   if(t>A){const k=t-A;const n=3-Math.floor(k/.95);if(n>0){const sc=1.3-((k%.95)/.95)*.3;c.save();c.translate(540,880);c.scale(sc,sc);c.beginPath();c.arc(0,0,130,0,7);fs('#e5484d',10,NV);text(String(n),0,8,150,'#fff',0);c.restore();}}
   return;}
 bg2(t);
 let d,ph;if(t<C){ph=(t-B)/1.6;d=1+Math.round(9*ease(ph));}else if(t<D){ph=(t-C)/1.4;d=10+Math.round(10*ease(ph));}else{ph=(t-D)/2.2;d=20+Math.round(10*ease(ph));}
 if(t>=E)d=30;
 const v=val(d);
 calendar(270,380,d,1+.05*Math.max(0,1-((t*30)%15)/15)*(d<30?1:0));
 // value card
 c.save();c.translate(540,690);const vs2=d===30&&t>D+2.2?1+.06*Math.sin(t*10):1;c.scale(vs2,vs2);c.beginPath();c.roundRect(-470,-80,940,160,80);fs(d===30?Y:'#fff',8,NV);text(fmt(v),0,6,d>=28?88:100,NV,0);c.restore();
 // coin tower right of calendar
 const nT=Math.max(1,Math.round(Math.log2(v*100+1)));coinTower(800,560,nT,t);
 // bar chart vs 1 milhão
 const bx=140,by=1300,bw=800,bh=330;c.beginPath();c.roundRect(bx-30,by-bh-60,bw+60,bh+110,30);fs('rgba(13,22,54,.75)',6,'rgba(255,255,255,.15)');
 const M=5368709.12,lineY=by-bh*(1e6/M);c.setLineDash([18,14]);c.lineWidth=6;c.strokeStyle='#7be0a8';c.beginPath();c.moveTo(bx,lineY);c.lineTo(bx+bw,lineY);c.stroke();c.setLineDash([]);
 text('R$ 1 MILHÃO',bx+bw-150,lineY-34,40,'#7be0a8',10);
 const hh=bh*Math.min(1,v/M);const g=lin(0,by,0,by-bh,[[0,'#ffb000'],[1,'#fff07a']]);c.beginPath();c.roundRect(bx+bw/2-120,by-hh-2,240,hh+2,[16,16,0,0]);fs(g,6,NV);
 text('CENTAVO',bx+bw/2,by+30,40,Y,10);
 if(v>1e6){const k=t-(D+2.2*0.62);const fl=t<15.9?0:clamp(1-(t-15.9)/0.6,0,1);c.fillStyle=`rgba(255,255,255,${fl*.6})`;c.fillRect(0,0,1080,1920);
   const p=back((t-15.9)/.35);if(p>0){c.save();c.translate(540,lineY-110);c.scale(p,p);c.rotate(-.06);pill(0,0,1,'PASSOU! 🤯'.replace(' 🤯',''),'#e5484d','#fff',64);c.restore();}}
 if(d===30&&t>D+2.0){const k=t-(D+2.0);for(let i=0;i<34;i++){const a=i*2.4,sp=500+(i%5)*120;const x=540+Math.cos(a)*sp*k,y=690+Math.sin(a)*sp*k+900*k*k;if(y<1950)coin(x,y,30+(i%3)*8,k*8+i,false);}}
 if(t>=E){const p=back((t-E)/.35);c.fillStyle='rgba(7,12,35,.55)';c.fillRect(0,0,1080,1920);c.save();c.translate(540,820);c.scale(p,p);
   c.beginPath();c.roundRect(-430,-190,860,380,50);fs('#fff',9,NV);text('MANDA PRA QUEM',0,-90,70,NV,0);text('ESCOLHEU O',0,0,70,NV,0);text('MILHÃO 😅'.replace(' 😅',''),0,96,96,'#2a9d6a',0);c.restore();
   if(t>F){const q=back((t-F)/.3);pill(540,1180,q,'SEGUE · AMANHÃ TEM MAIS 2 FATOS',Y,NV,40);}}
}
return {frame};};
