// Video #6 — four original toy-brick builds (generic studded bricks, no brand marks)
export default (H)=>{const {c,lin,shape,ell}=H;
const U=33,BH=37;
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
const G='#2a9d6f',G2='#1f7a52',YEL='#f4c430',GOLD='#f2b705',GOLD2='#d99a00',CY='#59d8ff',CY2='#2fb3e6',LT='#e8fbff',BLK='#2b2d31',BRN='#7a4a26',PINK='#ff2e88';
const bag=makeBuild({width:10,rows:8,rot:-Math.PI*1.1,
  bricks:[[1,0,8,G2],[0,1,10,G],[0,2,4,G],[4,2,2,YEL],[6,2,4,G],[0,3,3,G],[3,3,4,YEL],[7,3,3,G],[0,4,4,G],[4,4,2,YEL],[6,4,4,G],[1,5,8,G2],[3,6,4,BRN],[2,7,2,G],[6,7,2,G]]});
const gold=makeBuild({width:9,rows:4,rot:-Math.PI*0.7,
  bricks:[[0,0,3,GOLD],[3,0,3,GOLD2],[6,0,3,GOLD],[1,1,3,GOLD2],[4,1,3,GOLD],[2,2,3,GOLD],[5,2,2,GOLD2],[3,3,3,GOLD2]]});
const diamond=makeBuild({width:8,rows:6,rot:-Math.PI*1.3,
  bricks:[[3,0,2,CY2],[2,1,4,CY2],[1,2,6,CY],[0,3,8,CY],[1,4,6,LT],[2,5,4,LT]]});
const brief=makeBuild({width:10,rows:5,rot:-Math.PI*0.9,
  bricks:[[0,0,10,BLK],[0,1,4,BLK],[4,1,2,GOLD],[6,1,4,BLK],[0,2,10,BLK],[1,3,8,G],[4,4,2,BLK]]});
return {tag:'CHALLENGE #16',ask:'WHICH ONE WOULD YOU STEAL? &darr;',askStyle:{background:'#ff2e88',color:'#fff'},
 palette:{wallTop:'#2b1055',wallBot:'#b8337a',sky1:'#ff6a5f',sky2:'#ffc36b',night:false,floorA:'#20163a',floorB:'#ff2e88'},
 objects:{bag,gold,diamond,brief},
 onTable(){ // spare cash bricks + neon '$'
   const bricks=[[110,870,2,G],[160,870,2,G2],[135,848,2,G],[230,870,1,GOLD]];for(const [x,y,u,col] of bricks){brick(x,y-BH+10,u*U,col);}
   c.save();c.font='900 120px Inter';c.textAlign='center';c.shadowColor='#ff2e88';c.shadowBlur=40;c.fillStyle='#ff7ab8';c.fillText('$',150,520);c.restore();}};};
