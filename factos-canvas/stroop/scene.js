export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const C={VERMELHO:'#ff3b3b',AZUL:'#2f7bff',VERDE:'#2fd15a',AMARELO:'#ffd21f',ROXO:'#a64dff',LARANJA:'#ff8a1f'};
const G=[['AZUL','VERMELHO'],['VERDE','ROXO'],['AMARELO','AZUL'],['VERMELHO','VERDE'],['ROXO','LARANJA'],['LARANJA','AZUL'],['AZUL','AMARELO'],['VERDE','VERMELHO'],['AMARELO','ROXO'],['VERMELHO','AMARELO'],['ROXO','VERDE'],['LARANJA','VERMELHO']];
const T0=5.9,T1=13.9,END=22.4;
function bg(t){K.sunburst(540,820,'#151033','#1d1745',t*.06,24);}
function word(w,col,x,y,s,size=78,dim=1){c.save();c.translate(x,y);c.scale(s,s);c.globalAlpha=dim;c.font=`900 ${size}px M`;c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';c.lineWidth=16;c.strokeStyle='#0b0820';c.strokeText(w,0,4);c.fillStyle=col;c.fillText(w,0,4);c.restore();}
function brain(x,y,s,t){c.save();c.translate(x,y);c.scale(s,s);for(const sx of [-1,1]){c.save();c.translate(sx*(6+4*Math.sin(t*20)),0);c.beginPath();
  c.moveTo(0,-150);c.bezierCurveTo(sx*120,-170,sx*200,-90,sx*190,-10);c.bezierCurveTo(sx*200,80,sx*120,140,0,130);c.closePath();fs(rad(sx*60,-50,10,220,[[0,'#ffc2d8'],[1,'#f06595']]),8,NV);
  c.strokeStyle='rgba(160,30,80,.55)';c.lineWidth=7;c.lineCap='round';for(const [a,b,d] of [[-110,-60,40],[-60,0,60],[-10,60,50],[40,100,40]]){c.beginPath();c.moveTo(sx*20,a);c.quadraticCurveTo(sx*(d+60),(a+b)/2-30,sx*(d+100),b);c.stroke();}
  c.restore();}
  // angry eyes
  for(const sx of [-1,1]){c.beginPath();c.arc(sx*80,-20,22,0,7);fs('#fff',5,NV);c.beginPath();c.arc(sx*80+sx*-4,-16,10,0,7);c.fillStyle=NV;c.fill();c.lineWidth=8;c.strokeStyle=NV;c.beginPath();c.moveTo(sx*50,-58);c.lineTo(sx*110,-44);c.stroke();}
  c.beginPath();c.moveTo(-18,-170);c.lineTo(10,-100);c.lineTo(-10,-100);c.lineTo(18,-20);c.lineTo(-30,-110);c.lineTo(-8,-110);c.closePath();fs(Y,5,NV);c.restore();}
function frame(t){bg(t);
 if(t<T0){const p=back(t/.4);c.save();c.translate(540,250);c.scale(p,p);c.beginPath();c.roundRect(-440,-110,880,220,50);fs(Y,9,NV);text('DIGA A COR',0,-38,84,NV,0);text('NÃO A PALAVRA',0,50,64,'#e5484d',0);c.restore();
   const q=back((t-1.0)/.4);if(q>0){c.save();c.translate(540,640);c.scale(q,q);c.beginPath();c.roundRect(-400,-170,800,340,44);fs('rgba(255,255,255,.96)',9,NV);word('AZUL',C.VERMELHO,0,-60,1,150);
     const r=ease((t-2.6)/.4);if(r>0){c.globalAlpha=r;K.rich([['✗ ','#e5484d'],['"AZUL"','#9aa3b5']],-170,90,52,0);K.rich([['✓ ','#2fd15a'],['VERMELHO','#ff3b3b']],170,90,52,0);c.lineWidth=6;c.strokeStyle='#e5484d';c.beginPath();c.moveTo(-250,92);c.lineTo(-80,92);c.stroke();}c.restore();}
   if(t>4.5){const k=t-4.5;const n=k<0.85?'PRONTO?':'JÁ!';const s=back((k%0.85)/.3);c.save();c.translate(540,1040);c.scale(s,s);text(n,0,0,110,n==='JÁ!'?'#2fd15a':'#fff',20);c.restore();}
   return;}
 // grid
 const cols=2,gx=[275,805],gy0=290,dy=172;const active=t<T1?Math.floor((t-T0)/((T1-T0)/12)):-1;
 G.forEach(([w,col],i)=>{const x=gx[i%cols],y=gy0+Math.floor(i/cols)*dy;const ap=back((t-T0-i*.04)/.3);const on=i===active;
   if(on){c.beginPath();c.roundRect(x-235,y-70,470,140,30);fs('rgba(255,255,255,.14)',6,Y);}
   word(w,C[col],x,y,ap*(on?1.12:1),w.length>6?72:92,t>T1?0.35:1);});
 if(t<T1){const p=(t-T0)/(T1-T0);c.beginPath();c.roundRect(140,1360,800,34,17);fs('rgba(255,255,255,.15)',5,NV);c.beginPath();c.roundRect(140,1360,800*(1-p),34,17);fs(p>.75?'#e5484d':Y,0);
   text(String(Math.ceil((1-p)*8))+'s',540,1300,64,'#fff',14);}
 else{const k=t-T1;c.fillStyle='rgba(21,16,51,.55)';c.fillRect(0,0,1080,1920);brain(540,760,back(k/.4)*1.7,t);
   if(t>END-1.3){const q=back((t-END+1.3)/.3);c.save();c.translate(540,1250);c.scale(q,q);c.beginPath();c.roundRect(-420,-50,840,100,50);K.fs(Y,6,NV);K.text('SEGUE · AMANHÃ TEM MAIS 2 FATOS',0,4,38,NV,0);c.restore();}}
}
return {frame};};
