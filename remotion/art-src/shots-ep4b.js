// ===== Episódio 4 — telemóvel realista (o Rubinho a filmar) + hook novo =====
// mode: 'rec' (app da câmara a gravar) | 'post' (reel publicado com views/gostos a subir)
function phoneCam(inner,t,{mode='rec',views=0,likes=0,coms=0,user='oficinatioze',cap=''}={}){
  const jx=Math.sin(t*7.3)*5+Math.sin(t*13.1)*3, jy=Math.sin(t*6.1)*4, jr=Math.sin(t*4.7)*1.2;
  const SKR='#7a4a2c';
  let s=`<clipPath id="scr"><rect x="160" y="330" width="760" height="1500" rx="56"/></clipPath>`;
  s+=`<rect x="128" y="298" width="824" height="1564" rx="84" fill="#141418"/><rect x="138" y="308" width="804" height="1544" rx="76" fill="#22232a" stroke="none"/>`;
  s+=`<rect x="950" y="620" width="12" height="150" rx="6" fill="#2c2d35" stroke="none"/><rect x="118" y="560" width="12" height="90" rx="6" fill="#2c2d35" stroke="none"/>`;
  s+=`<g clip-path="url(#scr)">`;
  s+=`<g transform="translate(540 1080) scale(.72) translate(-540 -1080)">${inner}</g>`;
  let seed=Math.floor(t*15); for(let i=0;i<70;i++){seed=(seed*9301+49297)%233280;const x=160+seed%760;seed=(seed*9301+49297)%233280;const y=330+seed%1500;s+=`<rect x="${x}" y="${y}" width="3" height="3" fill="#fff" opacity=".12" stroke="none"/>`;}
  s+=`<rect x="160" y="330" width="760" height="1500" fill="url(#vigPh)" stroke="none"/>`;
  if(mode==='rec'){
    s+=`<g font-family="Arial, sans-serif" font-weight="700" stroke="none"><text x="210" y="385" font-size="30" fill="#fff">10:26</text><rect x="800" y="364" width="56" height="26" rx="6" fill="none" stroke="#fff" stroke-width="3"/><rect x="805" y="369" width="36" height="16" rx="3" fill="#fff"/><rect x="858" y="371" width="5" height="12" rx="2" fill="#fff"/></g>`;
    const sec=Math.floor(t); s+=`<g transform="translate(540 450)"><rect x="-90" y="-30" width="180" height="60" rx="30" fill="#e0483a" stroke="none"/><text x="0" y="13" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#fff" text-anchor="middle" stroke="none">00:${String(sec).padStart(2,'0')}</text></g>`;
    const f=1+.06*Math.sin(t*5), c=110*f; s+=`<g transform="translate(540 1080)" stroke="#f6c744" stroke-width="6" fill="none"><path d="M${-c},${-c+40} V${-c} H${-c+40} M${c-40},${-c} H${c} V${-c+40} M${c},${c-40} V${c} H${c-40} M${-c+40},${c} H${-c} V${c-40}"/></g>`;
    s+=`<g transform="translate(540 1690)"><circle r="78" fill="none" stroke="#fff" stroke-width="10"/><rect x="-34" y="-34" width="68" height="68" rx="14" fill="#e0483a" stroke="none"/></g>`;
    s+=`<g transform="translate(540 1560)"><circle r="34" fill="#000" opacity=".45" stroke="none"/><text x="0" y="11" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#f6c744" text-anchor="middle" stroke="none">1x</text></g>`;
    s+=`<g font-family="Arial, sans-serif" font-weight="700" font-size="28" stroke="none" text-anchor="middle"><text x="540" y="1800" fill="#f6c744">VÍDEO</text><text x="420" y="1800" fill="#fff" opacity=".6">FOTO</text><text x="670" y="1800" fill="#fff" opacity=".6">LENTO</text></g>`;
    s+=`<g transform="translate(820 1690)"><circle r="44" fill="#000" opacity=".45" stroke="none"/><path d="M-16,-8 a18,18 0 0 1 32,-4 M16,8 a18,18 0 0 1 -32,4" fill="none" stroke="#fff" stroke-width="5"/></g><rect x="214" y="1650" width="80" height="80" rx="14" fill="#7a3f9e" stroke="#fff" stroke-width="4"/>`;
  } else {
    s+=`<rect x="160" y="1380" width="760" height="450" fill="url(#fadeB)" stroke="none"/>`;
    s+=`<g font-family="Arial, sans-serif" font-weight="700" stroke="none"><text x="205" y="400" font-size="40" fill="#fff">Reels</text></g>`;
    const ic=(y,svg,num)=>`<g transform="translate(860 ${y})">${svg}<text x="0" y="70" font-family="Arial, sans-serif" font-weight="700" font-size="28" fill="#fff" text-anchor="middle" stroke="none">${num}</text></g>`;
    const hb=1+.15*Math.max(0,Math.sin(t*8));
    s+=ic(1180,`<path transform="scale(${hb})" d="M0,26 C-40,-6 -40,-40 0,-18 C40,-40 40,-6 0,26 Z" fill="#ff3b5c" stroke="none"/>`,likes);
    s+=ic(1310,`<path d="M-26,-20 h52 a8,8 0 0 1 8,8 v30 a8,8 0 0 1 -8,8 h-30 l-16,14 v-14 h-6 a8,8 0 0 1 -8,-8 v-30 a8,8 0 0 1 8,-8 Z" fill="none" stroke="#fff" stroke-width="5"/>`,coms);
    s+=ic(1440,`<path d="M-24,0 L24,-20 L12,24 L2,6 Z" fill="none" stroke="#fff" stroke-width="5"/>`,'');
    s+=`<g font-family="Arial, sans-serif" stroke="none"><circle cx="220" cy="1640" r="30" fill="#f6c744"/><text x="265" y="1652" font-weight="700" font-size="34" fill="#fff">${user}</text><rect x="560" y="1620" width="120" height="44" rx="10" fill="none" stroke="#fff" stroke-width="3"/><text x="620" y="1651" font-weight="700" font-size="26" fill="#fff" text-anchor="middle">Seguir</text><text x="200" y="1710" font-size="30" fill="#fff">${cap}</text></g>`;
    s+=`<g transform="translate(540 470)"><rect x="-230" y="-46" width="460" height="92" rx="46" fill="#000" opacity=".55" stroke="none"/><text x="0" y="20" font-size="56" fill="#fff" text-anchor="middle" stroke="none">${views} VIEWS</text></g>`;
    if(likes&&String(likes).length>3) for(let i=0;i<6;i++){const p=((t*1.1)+i/6)%1; s+=`<path transform="translate(${860-Math.sin(i*2+p*6)*40} ${1160-p*520}) scale(${.6+p*.5})" d="M0,26 C-40,-6 -40,-40 0,-18 C40,-40 40,-6 0,26 Z" fill="#ff3b5c" opacity="${1-p}" stroke="none"/>`;}
  }
  s+=`</g>`;
  s+=`<rect x="460" y="346" width="160" height="40" rx="20" fill="#000" stroke="none"/>`;
  s+=`<g stroke="#2b1d16" stroke-width="7"><path d="M60,1500 Q40,1700 120,1900 L300,1920 Q250,1760 170,1700 Q150,1600 150,1500 Z" fill="${SKR}"/><ellipse cx="150" cy="1470" rx="40" ry="60" fill="${SKR}"/><ellipse cx="146" cy="1330" rx="34" ry="52" fill="${SKR}"/><path d="M1020,1500 Q1040,1700 960,1900 L780,1920 Q830,1760 910,1700 Q930,1600 930,1500 Z" fill="${SKR}"/><ellipse cx="930" cy="1470" rx="40" ry="60" fill="${SKR}"/><ellipse cx="936" cy="1330" rx="34" ry="52" fill="${SKR}"/></g>`;
  return `<defs><radialGradient id="vigPh" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient><linearGradient id="fadeB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient></defs><g transform="translate(${jx} ${jy}) rotate(${jr} 540 1100)">${s}</g>`;
}
function bgBlur(col){return `<rect width="1080" height="1920" fill="${col}" stroke="none"/><circle cx="200" cy="300" r="260" fill="#fff" opacity=".06" stroke="none"/><circle cx="900" cy="1700" r="320" fill="#000" opacity=".12" stroke="none"/>`;}

// 0 · HOOK: flash-forward — o vídeo viral e a lona ao fundo (frame 0 já cheio)
SH.d4abre=(t,dur)=>{
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  in_+=lonaCarro(560,1450,.95,true,t)+nando({x:250,y:1920,s:.62,face:'choque',hold:null,pose:'normal'});
  const v=Math.round(41000+7000*ease(t/1.8)).toLocaleString('pt-BR');
  let o=bgBlur('#1a1a22')+phoneCam(in_,t,{mode:'post',views:v,likes:'9.812',coms:'1.204',cap:'consertou em 10 min kkk'});
  o+=`<g transform="translate(540 900) rotate(-3)"><rect x="-470" y="-140" width="940" height="270" rx="30" fill="#f6c744" stroke="#1b1420" stroke-width="12"/><text x="0" y="-26" font-size="82" fill="#1b1420" text-anchor="middle" stroke="none">ESSE VÍDEO VIRALIZOU…</text><text x="0" y="80" font-size="82" fill="#c8402f" text-anchor="middle" stroke="none">MAS OLHA O FUNDO...</text></g>`;
  o+=`<g transform="translate(860 1420) rotate(${30+Math.sin(t*8)*6})"><path d="M0,0 L-70,-36 L-56,0 L-70,36 Z" fill="#fff" stroke="#1b1420" stroke-width="6"/><path d="M-56,0 H-200" stroke="#1b1420" stroke-width="26"/><path d="M-56,0 H-200" stroke="#fff" stroke-width="14"/></g>`;
  return o+hud5(87050,6);
};
SH.d4danca=(t,dur)=>{
  const fall=t>2.6; let in_=interior({});
  const r=fall?ease((t-2.6)/.3)*80:Math.sin(t*9)*18, j=fall?0:Math.abs(Math.sin(t*9))*40;
  in_+=`<g transform="translate(0 ${-j}) rotate(${r} 540 1880)">${nando({x:540,y:1880,s:.78,face:fall?'choque':'contente',hold:null,pose:'vitoria'})}</g>`;
  in_+=turbo({x:fall?760:900,y:1890,s:.45,mood:'calmo'});
  let o=bgBlur('#2f6fb3')+phoneCam(in_,t,fall?{mode:'post',views:'32',likes:'3',coms:'1',cap:'dancinha da oficina'}:{mode:'rec'});
  if(!fall) o+=ono('♪ ♫',320,900,t,.2,'#fff',-8,120);
  if(fall) o+=ono('TOMBO!',540,1000,t,2.65,'#fff',-8,150)+ono('32 VIEWS…',540,1250,t,3.0,'#f6c744',4,110);
  return o+tentativa(1,t,'#f6c744')+hud5(87050,6);
};
SH.d4turbo=(t,dur)=>{
  let in_=interior({}); const p=(t*.45)%1; const tx=1200-p*1600, nx=tx+520;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*14))*20})">${turbo({x:tx,y:1880,s:.5,mood:'calmo'})}</g>`;
  in_+=`<g transform="rotate(-30 ${tx-200} 1640)"><rect x="${tx-215}" y="1600" width="22" height="120" rx="8" fill="#c9d1d6" stroke-width="5"/></g>`;
  in_+=`<g transform="translate(0 ${-Math.abs(Math.sin(t*12))*25})">${nando({x:nx,y:1900,s:.66,face:'choque',hold:null,pose:'normal'})}</g>`;
  const post=t>2.8;
  let o=bgBlur('#e08a2f')+phoneCam(in_,t,post?{mode:'post',views:'140',likes:'11',coms:'2',cap:'desafio do turbo'}:{mode:'rec'});
  o+=ono('VOLTA AQUI!',540,1000,t,.5,'#fff',-6,120); if(post) o+=ono('140…',540,1250,t,2.85,'#f6c744',4,120);
  return o+tentativa(2,t,'#5fe08a')+hud5(87050,6);
};
SH.d4uno=(t,dur)=>{
  let in_=interior({});
  in_+=lonaCarro(830,1380,.46,true,t)+carroVelho({x:470,y:1560,s:1.0,color:'#e8e2d0'});
  if(t<2.4) for(let i=0;i<5;i++){const p=((t*.9)+i/5)%1;in_+=`<circle cx="${430+Math.sin(i)*30}" cy="${1300-p*360}" r="${30+p*70}" fill="#9a9aa3" stroke="#6b6b73" stroke-width="5" opacity="${1-p}"/>`;}
  in_+=nando({x:250,y:1920,s:.62,face:t<2.4?'choque':'contente',hold:'chave',pose:'normal'});
  if(t>2.4) for(let i=0;i<6;i++){const a=i+t*20;in_+=`<path d="M560,1420 l${Math.cos(a)*60},${Math.sin(a)*60}" stroke="#f6c744" stroke-width="7"/>`;}
  const post=t>3.4, e=ease((t-3.4)/2.4);
  const v=Math.round(48000*e).toLocaleString('pt-BR'), l=Math.round(9812*e).toLocaleString('pt-BR'), c=Math.round(1204*e).toLocaleString('pt-BR');
  let o=bgBlur('#2f9e6e')+phoneCam(in_,t,post?{mode:'post',views:v,likes:l,coms:c,cap:'consertou em 10 min kkk'}:{mode:'rec'});
  if(t<2.4) o+=ono('FUMAÇA NO PORTA-LUVAS?!',540,1000,t,.3,'#fff',-4,72); else if(!post) o+=ono('TEC TEC TEC',540,1000,t,2.4,'#fff',6,100);
  if(t>5.6){const k=pop(t,5.6);o+=`<g transform="translate(540 1000) scale(${k}) rotate(-5)"><rect x="-380" y="-80" width="760" height="150" rx="24" fill="#f6c744" stroke="#1b1420" stroke-width="10"/><text x="0" y="28" font-size="88" fill="#1b1420" text-anchor="middle" stroke="none">VIRALIZOU!</text></g>`;}
  return o+tentativa(3,t,'#4cc3f0')+hud5(87050,6);
};
SH.d4lona=(t,dur)=>{
  if(t>3.4){ let o=caraNando(t-3.4,'normal','#3a2a4a','HMMM…',.05,'#f6c744',2.6); for(const [x,y,d] of [[180,700,0],[900,620,.2],[860,1000,.4]]) o+=ono('?',x,y,t,3.5+d,'#fff',0,150); return o+hud5(85840,10); }
  let in_=interior({wall:'#d9c79f',tile:'#237a56',tileLine:'#3f9c74',floor:'#8f3f2e',floorLine:'#7a3426'});
  const z=1+ease(t/1.2)*.9; in_=`<g transform="translate(540 1560) scale(${z}) translate(-560 -1450)">${in_}${lonaCarro(560,1400,.9,true,t)}</g>`;
  let o=bgBlur('#151626')+phoneCam(in_,t,{mode:'post',views:'48.000',likes:'9.812',coms:'1.204',cap:'consertou em 10 min kkk'});
  o+=cartao3d(540,760,'dudu.garagem','O QUE TEM DEBAIXO DA LONA??','#c8402f',t,.9,{rot:-3,w:960});
  o+=cartao3d(540,980,'rafa_motos','esse farol… é um clássico?','#2f6fb3',t,1.6,{rot:3,w:900});
  o+=cartao3d(540,1200,'bia.carros','MOSTRA A LONA!!!','#7a3f9e',t,2.3,{rot:-2,w:800});
  return o+hud5(85840,10);
};
