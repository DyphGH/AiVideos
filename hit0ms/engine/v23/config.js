// Video #22 — bricks 2: four original toy-brick builds (generic studded bricks, no brand marks)
export default (H)=>{const {c,lin,shape,ell}=H;
const U=26,BH=30;
function shade(hex,amt){const n=parseInt(hex.slice(1),16);let r=(n>>16)+amt,g=((n>>8)&255)+amt,b=(n&255)+amt;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return `rgb(${r},${g},${b})`;}
function brick(x,y,w,col){ // x,y = top-left of brick body
  for(let i=0;i<w/U;i++){const sx=x+i*U+U/2-5;c.beginPath();c.roundRect(sx,y-6,10,7,2);c.fillStyle=lin(sx,0,sx+10,0,[[0,shade(col,30)],[1,shade(col,-25)]]);c.fill();c.lineWidth=2;c.strokeStyle=shade(col,-80);c.stroke();}
  c.beginPath();c.roundRect(x,y,w,BH,3);c.fillStyle=lin(0,y,0,y+BH,[[0,shade(col,35)],[.5,col],[1,shade(col,-35)]]);c.fill();c.lineWidth=2.5;c.strokeStyle=shade(col,-80);c.stroke();
  c.fillStyle='rgba(255,255,255,.35)';c.fillRect(x+3,y+3,w-6,3);}
function wheel(x,y,r){ell(x,y,r,r);shape(H.rad(x-4,y-4,2,r,[[0,'#555'],[1,'#111']]),3,'#000');ell(x,y,r*0.45,r*0.45);c.fillStyle='#bfc5cc';c.fill();ell(x,y,r*0.15,r*0.15);c.fillStyle='#666';c.fill();}
function makeBuild(spec){ // spec: {bricks:[[col,row,units,color]], width, rows, wheels:[[col,r]], extra}
  const w=spec.width*U,h=spec.rows*BH+8;const left=-w/2+(spec.shift||0)*U,bottom=h/2;
  const pos=(col,row)=>({x:left+col*U,y:bottom-(row+1)*BH});
  const draw=()=>{for(const [col,row,u,colr] of spec.bricks){const p=pos(col,row);brick(p.x,p.y,u*U,colr);}
    for(const [col,r] of (spec.wheels||[])){const p=pos(col,0);wheel(p.x,bottom-4,r*U);}if(spec.extra)spec.extra(pos);};
  const parts=()=>{const out=[];for(const [col,row,u,colr] of spec.bricks){let rem=u,cc=col;while(rem>0){const n=Math.min(rem,rem>4?2+((cc*7+row)%3):rem);const p=pos(cc,row);const ww=n*U;
      out.push({dx:p.x+ww/2,dy:p.y+BH/2-bottom+h/2,h:BH,rest:BH/2,draw:()=>brick(-ww/2,-BH/2,ww,colr)});rem-=n;cc+=n;}}
    for(const [col,r] of (spec.wheels||[])){const p=pos(col,0);out.push({dx:p.x,dy:h/2-4-bottom+h/2,h:r*U*2,rest:r*U,draw:()=>wheel(0,0,r*U)});}
    return out;};
  return {h,w,draw,parts,rot:spec.rot,burst:620,up:1.15,spin:16};}
const RED='#d62828',BLUE='#2463c9',YEL='#f4c430',WHITE='#eef1f4',GRN='#2a9d6f',DGRN='#1f6f50',BLK='#2b2d31',ORG='#f77f00',GLASS='#7fd3f7',BRN='#7a4a26';
const GRY='#8d99ae',DGRY='#5c677d',PURP='#7b2cbf';
const castle=makeBuild({width:14,rows:9,rot:-Math.PI*0.6,
  bricks:[[0,0,14,GRY],[0,1,5,GRY],[5,1,4,BRN],[9,1,5,GRY],[0,2,5,GRY],[5,2,4,BRN],[9,2,5,GRY],[0,3,14,GRY],[0,4,3,DGRY],[3,4,8,GRY],[11,4,3,DGRY],[0,5,3,DGRY],[4,5,2,GLASS],[6,5,2,GRY],[8,5,2,GLASS],[11,5,3,DGRY],[0,6,1,DGRY],[2,6,1,DGRY],[3,6,8,GRY],[11,6,1,DGRY],[13,6,1,DGRY],[3,7,1,GRY],[5,7,1,GRY],[7,7,1,GRY],[9,7,1,GRY]],
  extra:(pos)=>{const p=pos(7,8);c.strokeStyle='#333';c.lineWidth=4;c.beginPath();c.moveTo(p.x+4,p.y+BH);c.lineTo(p.x+4,p.y-30);c.stroke();c.beginPath();c.moveTo(p.x+4,p.y-30);c.lineTo(p.x+50,p.y-18);c.lineTo(p.x+4,p.y-6);c.closePath();shape(RED,3,'#5a0a0a');}});
const ship=makeBuild({width:16,rows:8,rot:-Math.PI*1.1,
  bricks:[[2,0,12,BRN],[0,1,16,BRN],[0,2,16,BRN],[0,3,2,BRN],[14,3,2,BRN],[2,2,12,'#9c6b3c'],[5,1,1,YEL],[8,1,1,YEL],[11,1,1,YEL]],
  extra:(pos)=>{const m=pos(8,3);c.fillStyle='#5a3a1a';c.fillRect(m.x-4,m.y-150,10,180);
    c.beginPath();c.moveTo(m.x-70,m.y-140);c.quadraticCurveTo(m.x,m.y-120,m.x+74,m.y-140);c.lineTo(m.x+70,m.y-30);c.quadraticCurveTo(m.x,m.y-10,m.x-66,m.y-30);c.closePath();shape(lin(0,m.y-140,0,m.y-20,[[0,'#ffffff'],[1,'#d8dde3']]),4,'#333');
    c.fillStyle='#222';ell(m.x+2,m.y-90,16,14);c.fill();c.fillStyle='#fff';ell(m.x-4,m.y-92,4,5);c.fill();ell(m.x+8,m.y-92,4,5);c.fill();c.fillRect(m.x-10,m.y-72,24,4);
    c.beginPath();c.moveTo(m.x+6,m.y-150);c.lineTo(m.x+44,m.y-140);c.lineTo(m.x+6,m.y-130);c.closePath();shape(BLK,3,'#000');}});
const robot=makeBuild({width:10,rows:10,rot:-Math.PI*1.3,
  bricks:[[2,0,2,DGRY],[6,0,2,DGRY],[2,1,2,DGRY],[6,1,2,DGRY],[1,2,8,BLUE],[0,3,10,BLUE],[0,4,1,GRY],[1,4,8,BLUE],[9,4,1,GRY],[0,5,1,GRY],[1,5,8,BLUE],[9,5,1,GRY],[2,6,6,BLUE],[2,7,6,WHITE],[2,8,1,WHITE],[3,8,1,GLASS],[4,8,2,WHITE],[6,8,1,GLASS],[7,8,1,WHITE],[2,9,6,WHITE]],
  extra:(pos)=>{const p=pos(4,9);c.strokeStyle='#333';c.lineWidth=4;c.beginPath();c.moveTo(p.x+26,p.y);c.lineTo(p.x+26,p.y-30);c.stroke();ell(p.x+26,p.y-34,8,8);shape(RED,3,'#5a0a0a');
    const q=pos(4,4);c.beginPath();c.roundRect(q.x-4,q.y+4,60,22,4);shape('#111',2,'#000');c.fillStyle='#2fd15a';c.fillRect(q.x+2,q.y+10,10,10);c.fillStyle='#ffd23f';c.fillRect(q.x+20,q.y+10,10,10);c.fillStyle='#e5484d';c.fillRect(q.x+38,q.y+10,10,10);}});
const heli=makeBuild({width:16,rows:6,rot:-Math.PI*0.9,
  bricks:[[3,0,1,BLK],[9,0,1,BLK],[2,1,10,ORG],[1,2,12,ORG],[12,2,4,ORG],[1,3,3,GLASS],[4,3,8,ORG],[14,3,2,ORG],[2,4,9,ORG],[15,4,1,ORG],[5,5,4,DGRY]],
  extra:(pos)=>{const p=pos(7,5);c.fillStyle='#333';c.fillRect(p.x-10,p.y-14,10,14);c.beginPath();c.roundRect(p.x-200,p.y-24,380,12,6);shape('#444',3,'#111');
    const s=pos(2,-1);c.beginPath();c.roundRect(s.x-10,s.y-8,300,8,4);shape(BLK,2,'#000');
    const t=pos(15,4);ell(t.x+14,t.y-6,30,6);c.fillStyle='rgba(60,60,60,.8)';c.fill();}});
return {tag:'CHALLENGE #22',ask:'CAN YOU NAME ALL 4 BUILDS? &darr;',
 palette:{wallTop:'#1c2a4a',wallBot:'#3a5a9a',sky1:'#4aa3ff',sky2:'#cfe9ff',night:false,floorA:'#ece5d6',floorB:'#d62828'},
 objects:{castle,ship,robot,heli},
 onTable(){ // loose spare bricks on the table
   const bricks=[[120,870,2,'#2463c9'],[170,870,1,'#f4c430'],[150,848,2,'#d62828'],[230,870,3,'#2a9d6f']];
   for(const [x,y,u,col] of bricks){c.save();brick(x,y-BH+10,u*U,col);c.restore();}}};};
