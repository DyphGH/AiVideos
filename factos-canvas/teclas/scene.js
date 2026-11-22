export default (K)=>{const {c,NV,Y,clamp,ease,back,lin,rad,fs,text}=K;
const T1=4.3,T2=11.5,T3=17.0,T4=20.6;
function pill(x,y,s,txt,bg=Y,fg=NV,size=56,rot=0){if(s<=0)return;c.font=`900 ${size}px M`;const w=c.measureText(txt).width+80;c.save();c.translate(x,y);c.rotate(rot);c.scale(s,s);c.beginPath();c.roundRect(-w/2,-size*.95,w,size*1.9,size*.95);fs(bg,7,NV);text(txt,0,4,size,fg,0);c.restore();}
function bg(t,a='#1b1f3a',b='#2a3170'){c.fillStyle=lin(0,0,0,1920,[[0,a],[1,b]]);c.fillRect(0,0,1080,1920);
  c.save();c.globalAlpha=.07;c.strokeStyle='#fff';c.lineWidth=2;for(let x=0;x<1080;x+=60){c.beginPath();c.moveTo(x,0);c.lineTo(x,1920);c.stroke();}for(let y=0;y<1920;y+=60){c.beginPath();c.moveTo(0,y);c.lineTo(1080,y);c.stroke();}c.restore();
  c.fillStyle=rad(540,860,100,1200,[[0,'rgba(140,160,255,.18)'],[1,'rgba(0,0,0,.45)']]);c.fillRect(0,0,1080,1920);}
// keycap: x,y center, size s(px of top), label, bump, glow, pressed
function key(x,y,s,lab,o={}){const d=s*0.16*(o.press?0.35:1);c.save();c.translate(x,y);
  c.beginPath();c.roundRect(-s/2-s*.06,-s/2+d*0.2,s*1.12,s*1.05,s*.16);fs(lin(0,-s/2,0,s/2+d,[[0,'#9aa3b5'],[1,'#596178']]),Math.max(3,s*.035),NV);
  c.beginPath();c.roundRect(-s/2,-s/2-d,s,s*0.92,s*.14);fs(lin(0,-s/2,0,s/2,[[0,o.col||'#ffffff'],[1,o.col2||'#dfe4ef']]),Math.max(3,s*.035),NV);
  if(o.glow){c.save();c.globalAlpha=o.glow;c.shadowColor=Y;c.shadowBlur=s*.5;c.lineWidth=s*.05;c.strokeStyle=Y;c.beginPath();c.roundRect(-s/2,-s/2-d,s,s*0.92,s*.14);c.stroke();c.restore();}
  if(lab){c.font=`900 ${s*.42}px M`;c.textAlign='left';c.textBaseline='top';c.fillStyle=NV;c.fillText(lab,-s/2+s*.14,-s/2-d+s*.1);}
  if(o.bump){const by=-d+s*0.22;c.beginPath();c.roundRect(-s*.16,by-s*.03,s*.32,s*.06,s*.03);fs(o.bumpCol||'#9aa3b5',Math.max(2,s*.02),NV);}
  if(o.dot){c.beginPath();c.arc(0,-d+s*0.26,s*.05,0,7);fs(o.bumpCol||'#9aa3b5',Math.max(2,s*.02),NV);}
  c.restore();}
function finger(x,y,s,t,press){c.save();c.translate(x,y-(press?0:40));c.scale(s,s);c.beginPath();c.roundRect(-38,-420,76,440,38);fs(lin(-38,0,38,0,[[0,'#f2b48c'],[.5,'#ffd1b0'],[1,'#d9906a']]),6,NV);
  c.beginPath();c.roundRect(-26,-6,52,22,10);c.fillStyle='rgba(255,240,230,.9)';c.fill();for(const yy of [-140,-280]){c.beginPath();c.moveTo(-22,yy);c.quadraticCurveTo(0,yy+10,22,yy);c.lineWidth=4;c.strokeStyle='rgba(150,80,50,.6)';c.stroke();}c.restore();}
function remote(x,y,s,t,hl){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-90,-260,180,520,60);fs(lin(-90,0,90,0,[[0,'#2b2f3a'],[.5,'#4a5060'],[1,'#22252e']]),6,'#000');c.beginPath();c.arc(-40,-200,20,0,7);fs('#e5484d',4,'#000');
  for(let r=0;r<3;r++)for(let q=0;q<3;q++){const n=r*3+q+1;const kx=-55+q*55,ky=-110+r*62;c.beginPath();c.roundRect(kx-22,ky-20,44,40,10);fs(n===5?(hl?'#ffd21f':'#cfd6e4'):'#cfd6e4',3,'#000');c.font='900 22px M';c.textAlign='center';c.textBaseline='middle';c.fillStyle=NV;c.fillText(String(n),kx,ky+2);if(n===5){c.beginPath();c.arc(kx,ky-11,3.5,0,7);c.fillStyle=NV;c.fill();}}
  c.restore();}
function atm(x,y,s,hl){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-150,-230,300,460,24);fs(lin(0,-230,0,230,[[0,'#5d6b82'],[1,'#2f3849']]),6,NV);c.beginPath();c.roundRect(-120,-200,240,120,12);fs('#4fa3ff',5,NV);text('R$',0,-140,48,'#fff',0);
  for(let r=0;r<3;r++)for(let q=0;q<3;q++){const n=r*3+q+1;const kx=-70+q*70,ky=-20+r*66;c.beginPath();c.roundRect(kx-28,ky-26,56,52,10);fs(n===5?(hl?'#ffd21f':'#e9edf2'):'#e9edf2',3,NV);c.font='900 28px M';c.textAlign='center';c.textBaseline='middle';c.fillStyle=NV;c.fillText(String(n),kx,ky+2);if(n===5){c.beginPath();c.arc(kx,ky-15,4,0,7);c.fillStyle=NV;c.fill();}}
  c.restore();}
function numpad(x,y,s,hl,ring=0){c.save();c.translate(x,y);c.scale(s,s);c.beginPath();c.roundRect(-150,-200,300,400,26);fs('#3a4160',6,NV);
  const L=[[7,8,9],[4,5,6],[1,2,3]];for(let r=0;r<3;r++)for(let q=0;q<3;q++){const n=L[r][q];const isC=n===5;const lit=!isC&&ring>0&&((q+r*3)*.12<ring);key(-90+q*90,-110+r*95,78,String(n),{dot:isC,glow:isC&&hl?1:lit?.8:0,col:isC&&hl?'#fff3b0':lit?'#e8fff0':'#fff',bumpCol:'#596178'});}
  key(-45,175,78*1.0,'0',{});c.restore();}
function frame(t){
 if(t<T1){bg(t);const z=1+0.03*Math.sin(t*3);
   key(540,860,520*z*(0.92+0.08*back(t/.3)),'F',{bump:true,glow:.5+.5*Math.sin(t*8),bumpCol:'#ffd21f'});
   const p=back(t/.35);c.save();c.translate(540,230);c.scale(p,p);text('PRA QUE',0,-60,110,'#fff',20);text('SERVE ISSO?',0,65,110,Y,20);c.restore();
   if(t>.3){const a=back((t-.3)/.3);c.save();c.translate(820,560);c.scale(a,a);c.rotate(.5+Math.sin(t*6)*.05);c.beginPath();c.moveTo(-30,-110);c.lineTo(30,-110);c.lineTo(30,0);c.lineTo(70,0);c.lineTo(0,80);c.lineTo(-70,0);c.lineTo(-30,0);c.closePath();fs('#e5484d',7,NV);c.restore();}
   if(t>3.05){const a=back((t-3.05)/.3);pill(540,1290,a,'NÃO É DEFEITO!','#3ccf73','#fff',56,-.04);}
   return;}
 if(t<T2){const k=t-T1;bg(t,'#141a33','#24306a');
   // keyboard home row
   const row=['A','S','D','F','G','H','J','K','L'];const S=104;const x0=540-(row.length-1)*S/2;const y=960;
   c.beginPath();c.roundRect(20,y-260,1040,520,40);fs('#2b3150',7,NV);
   const top=['Q','W','E','R','T','Y','U','I','O'];top.forEach((l,i)=>key(x0+i*S+20,y-S,S*.9,l,{}));
   const bot=['Z','X','C','V','B','N','M',',','.'];bot.forEach((l,i)=>key(x0+i*S+40,y+S,S*.9,l,{}));
   const land=ease((k-2.4)/.5);const done=k>2.9;
   row.forEach((l,i)=>{const isFJ=l==='F'||l==='J';key(x0+i*S,y,S*.9,l,{bump:isFJ,glow:isFJ&&done?1:0,press:done&&['A','S','D','F','J','K','L'].includes(l),bumpCol:isFJ?'#ffd21f':'#9aa3b5'});});
   // fingers descend
   const fy=y-30-(1-land)*360;const L=[['A',.8],['S',.88],['D',.95],['F',1.0]],R=[['J',1.0],['K',.95],['L',.88]];
   for(const [l,sc] of [...L,...R]){const i=row.indexOf(l);finger(x0+i*S,fy+(l==="F"||l==="J"?0:-10),0.62*sc,t,done);}
   // blindfold
   const bp=back((k-.15)/.35);if(k<2.4||true){c.save();c.translate(540,330);c.scale(bp,bp);c.beginPath();c.moveTo(-260,-40);c.quadraticCurveTo(0,-80,260,-40);c.quadraticCurveTo(280,60,140,70);c.quadraticCurveTo(0,40,-140,70);c.quadraticCurveTo(-280,60,-260,-40);c.closePath();fs(lin(0,-80,0,70,[[0,'#5a4ad1'],[1,'#3a2a9a']]),8,NV);text('SEM OLHAR',0,6,62,'#fff',0);c.restore();}
   if(done){const q=back((k-2.9)/.3);for(const l of ['F','J']){const i=row.indexOf(l);c.save();c.translate(x0+i*S,y-150);c.scale(q,q);c.beginPath();c.arc(0,0,40,0,7);fs(Y,6,NV);text('✓'.length?'OK':'',0,4,30,NV,0);c.restore();}}
   if(k>4.0){pill(540,1350,back((k-4.0)/.3),'OS OUTROS DEDOS NO LUGAR CERTO','#fff',NV,38,-.03);}
   return;}
 if(t<T3){const k=t-T2;bg(t,'#2a1446','#5a2a8a');
   const hl=Math.sin(t*8)>0;
   const a=back(k/.35),b=back((k-2.3)/.35),d=back((k-3.6)/.35),e=back((k-4.6)/.35);
   if(k<2.3){c.save();c.translate(540,880);c.scale(a*1.9,a*1.9);numpad(0,0,1,hl);c.restore();
     c.save();c.translate(540,880);c.scale(a,a);c.restore();}
   else{c.save();c.translate(230,820);c.scale(.85,.85);numpad(0,0,1,hl);c.restore();
     if(b>0){c.save();c.translate(560,860);c.scale(b*.95,b*.95);remote(0,0,1,t,hl);c.restore();}
     if(d>0){c.save();c.translate(850,820);c.scale(d*.75,d*.75);atm(0,0,1,hl);c.restore();}
     if(k>2.3)pill(230,1080,back((k-2.4)/.3),'TECLADO','#fff',NV,34);if(d>0)pill(560,1240,back((k-3.0)/.3),'CONTROLE','#fff',NV,34);if(k>3.8)pill(850,1080,back((k-3.9)/.3),'CAIXA','#fff',NV,34);}
   const q=back(k/.35);c.save();c.translate(540,300);c.scale(q,q);text('O 5 TEM',0,-55,100,'#fff',20);text('BOLINHA',0,60,110,Y,20);c.restore();
   return;}
 if(t<T4){const k=t-T3;bg(t,'#0f2a2a','#1f6f5a');
   const ring=ease((k-.4)/1.6);c.save();c.translate(540,860);c.scale(1.9,1.9);numpad(0,0,1,true,ring);c.restore();
   const q=back(k/.35);c.save();c.translate(540,270);c.scale(q,q);text('É O MEIO!',0,0,124,Y,22);c.restore();
   return;}
 const k=t-T4;bg(t);key(540,760,300,'F',{bump:true,glow:.6,bumpCol:'#ffd21f'});
 const q=back(k/.35);c.save();c.translate(540,300);c.scale(q,q);text('VOCÊ JÁ',0,-55,100,'#fff',20);text('SABIA?',0,65,120,Y,20);c.restore();
 const pulse=1+.05*Math.sin(t*8);pill(300,1180,back((k-1.2)/.3)*pulse,'SIM','#3ccf73','#fff',64,-.04);pill(780,1180,back((k-1.6)/.3)*pulse,'NÃO','#e5484d','#fff',64,.04);
 if(k>2.1)pill(540,1360,back((k-2.1)/.3),'COMENTA ↓','#fff',NV,44);
}
return {frame};};
