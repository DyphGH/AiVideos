// Video #6 — four original toy-brick builds (generic studded bricks, no brand marks)
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
const car=makeBuild({width:12,rows:4,rot:-Math.PI*1.1,
  bricks:[[1,0,10,RED],[0,1,12,RED],[1,2,3,RED],[4,2,3,GLASS],[7,2,4,RED],[4,3,4,RED],[10,2,2,BLK],[0,2,1,YEL]],wheels:[[2.5,1.0],[9.5,1.0]]});
const house=makeBuild({width:12,rows:7,rot:-Math.PI*0.6,
  bricks:[[1,0,4,YEL],[5,0,2,BRN],[7,0,4,YEL],[1,1,4,YEL],[5,1,2,BRN],[7,1,4,YEL],[1,2,1,YEL],[2,2,2,GLASS],[4,2,4,YEL],[8,2,2,GLASS],[10,2,1,YEL],[1,3,10,YEL],[0,4,12,RED],[2,5,8,RED],[4,6,4,RED],[9,5,1,'#8d99ae']]});
const rocket=makeBuild({width:8,rows:9,rot:-Math.PI*1.4,
  bricks:[[0,0,2,BLUE],[2,0,4,WHITE],[6,0,2,BLUE],[1,1,1,BLUE],[2,1,4,WHITE],[6,1,1,BLUE],[2,2,4,RED],[2,3,4,WHITE],[2,4,1,WHITE],[3,4,2,GLASS],[5,4,1,WHITE],[2,5,4,WHITE],[2,6,4,WHITE],[3,7,2,RED],[3,8,2,RED]],
  extra:(pos)=>{const p=pos(3,0);c.beginPath();c.moveTo(p.x-6,p.y+BH);c.quadraticCurveTo(p.x+18,p.y+BH+50,p.x+42,p.y+BH);c.closePath();shape(lin(0,p.y+BH,0,p.y+BH+50,[[0,'#ffd23f'],[1,'rgba(255,90,0,.2)']]),0);}});
const dino=makeBuild({width:16,rows:8,shift:-1,rot:-Math.PI*0.9,
  bricks:[[4,0,2,DGRN],[10,0,2,DGRN],[3,1,10,GRN],[0,2,14,GRN],[-2,2,2,GRN],[4,3,8,GRN],[11,4,2,GRN],[12,5,2,GRN],[13,6,2,GRN],[13,7,4,GRN],[5,1,6,'#8fd694']],
  extra:(pos)=>{const p=pos(15,7);ell(p.x+4,p.y+BH/2,4,4);c.fillStyle='#111';c.fill();ell(p.x+5,p.y+BH/2-1,1.4,1.4);c.fillStyle='#fff';c.fill();}});
return {tag:'CHALLENGE #6',ask:'CAN YOU NAME ALL 4 BUILDS? &darr;',
 palette:{wallTop:'#1f3b3a',wallBot:'#2f5d5a',sky1:'#4aa3ff',sky2:'#cfe9ff',night:false,floorA:'#ece5d6',floorB:'#5b4636'},
 objects:{car,house,rocket,dino},
 onTable(){ // loose spare bricks on the table
   const bricks=[[120,870,2,'#2463c9'],[170,870,1,'#f4c430'],[150,848,2,'#d62828'],[230,870,3,'#2a9d6f']];
   for(const [x,y,u,col] of bricks){c.save();brick(x,y-BH+10,u*U,col);c.restore();}}};};
