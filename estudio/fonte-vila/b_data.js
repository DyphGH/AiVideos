// =================== BASE ===================
const MC='Metricool Social Media Management', WS='Windsor.ai';
const BRANDS=[{id:'8058431',acct:'2factos'},{id:'8123515',acct:'hit0ms'}];
const NET={IG:'Instagram',TT:'TikTok',YT:'YouTube',FB:'Facebook'};
const MCNET={instagram:'IG',tiktok:'TT',youtube:'YT',facebook:'FB'};
const LABEL={'2factos':'2 Factos','hit0ms':'Hit0Ms'};
const DENY=['needs_reauth','server_not_connected','blocked_by_policy','approval_required','not_in_manifest','consent_required','selection_required'];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>n==null||isNaN(n)?'—':Math.round(Number(n)).toLocaleString('pt-PT');
const short=n=>n==null||isNaN(n)?'—':Math.abs(n)>=1e6?(n/1e6).toFixed(1).replace('.',',')+'M':Math.abs(n)>=1e4?Math.round(n/1e3)+'k':Math.abs(n)>=1e3?(n/1e3).toFixed(1).replace('.',',')+'k':String(Math.round(n));
const pct=n=>n==null||isNaN(n)?'—':Math.round(n*100)+'%';
const acctOf=name=>/hit/i.test(String(name||''))?'hit0ms':'2factos';
const $=id=>document.getElementById(id);
const safeUrl=u=>/^https:\/\//.test(String(u||''))?String(u):'';
const normUrl=u=>String(u||'').replace(/\/+$/,'').toLowerCase();
const capLine=c=>String(c||'').split('\n')[0].replace(/#\S+/g,'').trim();
function lis(d=new Date()){const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Lisbon',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(d).map(x=>[x.type,x.value]));
  return {date:`${p.year}-${p.month}-${p.day}`,min:+p.hour*60+ +p.minute,hour:+p.hour};}
function lisOffset(){try{const n=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Lisbon',timeZoneName:'longOffset'}).formatToParts(new Date()).find(x=>x.type==='timeZoneName').value;const m=n.match(/([+-]\d\d:\d\d)/);return m?m[1]:'+00:00';}catch{return '+00:00';}}
function addDays(ds,k){const d=new Date(ds+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+k);return d.toISOString().slice(0,10);}
const dm=ds=>ds.slice(8,10)+'/'+ds.slice(5,7);
const WD=['dom','seg','ter','qua','qui','sex','sáb'];
const wd=ds=>WD[new Date(ds+'T12:00:00Z').getUTCDay()];
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),3800);}
function confirmBox(title,text,ok='Confirmar'){return new Promise(res=>{const m=$('modal');$('m-t').textContent=title;$('m-p').textContent=text;$('m-ok').textContent=ok;m.hidden=false;$('m-ok').focus();
  const done=v=>{m.hidden=true;$('m-ok').onclick=$('m-no').onclick=null;res(v);};$('m-ok').onclick=()=>done(true);$('m-no').onclick=()=>done(false);m.onkeydown=e=>{if(e.key==='Escape')done(false);};});}
function errMsg(e,server){const c=e&&e.code;
  if(c==='needs_reauth')return `volta a ligar o ${server} em Definições → Conectores do claude.ai.`;
  if(c==='server_not_connected'||c==='selection_required')return `adiciona ou escolhe o conector ${server} no claude.ai.`;
  if(c==='not_in_manifest'||c==='approval_required'||c==='consent_required')return `a página precisa da tua autorização para usar o ${server}. Carrega em "Atualizar".`;
  if(c==='server_unavailable')return `o ${server} não respondeu agora; tento outra vez sozinho.`;
  if(c==='tool_error')return `o ${server} devolveu um erro: ${String(e.message||'').slice(0,160)}`;
  return `não consegui falar com o ${server} agora.`;}

// =================== ESTADO ===================
const ST={mc:{},mcPast:{},mcErr:{},w:{},wErr:{},stamp:{},db:null,ped:[],pedOk:false};
const UI={anaAcct:'2factos',vidAcct:'all',vidSort:'date',pick:{},editing:null};
let D=null; // derivados
function derive(){const L=lis();const d={};
  // agenda
  const posts=[];const trial=new Set();
  for(const src of [ST.mc,ST.mcPast])for(const [acct,rows] of Object.entries(src))for(const r of rows||[]){
    const it=r.instagramData?.type==='TRIAL_REEL';
    for(const p of r.providers||[])if(p.network==='instagram'&&p.publicUrl&&it)trial.add(normUrl(p.publicUrl));}
  for(const b of BRANDS)for(const r of ST.mc[b.acct]||[]){const dt=r.publicationDate?.dateTime||'';
    const nets=(r.providers||[]).map(p=>{const s=String(p.status||'').toUpperCase();return {k:MCNET[p.network]||p.network,s:s==='PUBLISHED'?'done':/ERROR|FAIL/.test(s)?'err':'pend',url:safeUrl(p.publicUrl)};});
    const st=r.draft?'pause':nets.some(n=>n.s==='err')?'err':nets.length&&nets.every(n=>n.s==='done')?'done':'pend';
    const title=r.youtubeData?.title||r.tiktokData?.title||capLine(r.text);
    posts.push({raw:r,blog:b.id,id:String(r.uuid||r.id),acct:b.acct,date:dt.slice(0,10),time:dt.slice(11,16),min:+dt.slice(11,13)*60+ +dt.slice(14,16),title:String(title).replace(/\s*#shorts/i,''),nets,state:st,trial:r.instagramData?.type==='TRIAL_REEL',anyDone:nets.some(n=>n.s==='done')});}
  posts.sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));d.posts=posts;d.trial=trial;
  d.today=posts.filter(p=>p.date===L.date);
  d.next=posts.find(p=>(p.date>L.date||(p.date===L.date&&p.min>=L.min-5))&&p.state==='pend')||null;
  // windsor: diário
  const s28=addDays(L.date,-27);d.days=[];for(let i=27;i>=0;i--)d.days.push(addDays(L.date,-i));
  const A=()=>({igV:{},igR:{},igNew:{},fbP:{},fbF:{},igFol:null,ytSubs:null,fbFol:null});d.a={'2factos':A(),'hit0ms':A()};
  for(const r of ST.w.igDay||[]){const a=d.a[acctOf(r.account_name)];if(r.views!=null)a.igV[r.date]=r.views;if(r.reach!=null)a.igR[r.date]=r.reach;if(r.follower_count_1d!=null)a.igNew[r.date]=r.follower_count_1d;if(r.followers_count!=null)a.igFol=r.followers_count;}
  const fb=[...(ST.w.fb||[])].sort((x,y)=>String(x.date).localeCompare(String(y.date)));const lastF={};
  for(const r of fb){const k=acctOf(r.account_name),a=d.a[k];if(r.blue_reels_play_count!=null)a.fbP[r.date]=r.blue_reels_play_count;if(r.page_follows!=null){a.fbF[r.date]=lastF[k]!=null?Math.max(0,r.page_follows-lastF[k]):null;lastF[k]=r.page_follows;a.fbFol=r.page_follows;}}
  // vídeos
  const vids=[];
  for(const r of ST.w.igMedia||[])if((r.media_caption||r.media_permalink)&&r.date>=s28)vids.push({acct:acctOf(r.account_name),k:'IG',date:r.date,cap:r.media_caption,views:r.media_views,reach:r.media_reach,skip:r.media_reel_skip_rate,shares:r.media_shares,likes:r.media_like_count,com:r.media_comments_count,url:safeUrl(r.media_permalink),trial:trial.has(normUrl(r.media_permalink))});
  for(const r of ST.w.tt||[]){const dd=String(r.video_create_datetime||'').slice(0,10);if(dd>=s28)vids.push({acct:acctOf(r.username),k:'TT',date:dd,cap:r.video_caption,views:r.video_views_count,likes:r.video_likes,full:r.video_full_watched_rate});}
  for(const r of ST.w.yt||[]){const dd=String(r.published_at||'').slice(0,10);if(r.subscriber_count!=null)d.a[acctOf(r.account_name)].ytSubs=r.subscriber_count;if(dd>=s28)vids.push({acct:acctOf(r.account_name),k:'YT',date:dd,cap:r.video_title,views:r.video_view_count,likes:r.video_like_count});}
  d.vids=vids;
  // somas 7 dias
  const s7=addDays(L.date,-6),p7=addDays(L.date,-13);const y=addDays(L.date,-1);
  const sumRange=(obj,from,to)=>Object.entries(obj).reduce((s,[k,v])=>k>=from&&k<=to?s+(+v||0):s,0);
  for(const [k,a] of Object.entries(d.a)){
    a.ig7=sumRange(a.igV,addDays(y,-6),y);a.igP7=sumRange(a.igV,addDays(y,-13),addDays(y,-7));
    a.fb7=sumRange(a.fbP,addDays(y,-6),y);a.fbP7=sumRange(a.fbP,addDays(y,-13),addDays(y,-7));
    a.igNew7=sumRange(a.igNew,addDays(y,-6),y);a.fbNew7=sumRange(a.fbF,addDays(y,-6),y);
    const v7=vids.filter(v=>v.acct===k&&v.date>=s7);a.tt7=v7.filter(v=>v.k==='TT').reduce((s,v)=>s+(+v.views||0),0);a.yt7=v7.filter(v=>v.k==='YT').reduce((s,v)=>s+(+v.views||0),0);
    a.ttN=v7.filter(v=>v.k==='TT').length;a.ytN=v7.filter(v=>v.k==='YT').length;a.igYesterday=a.igV[y];}
  d.net7={IG:0,TT:0,YT:0,FB:0};for(const a of Object.values(d.a)){d.net7.IG+=a.ig7;d.net7.TT+=a.tt7;d.net7.YT+=a.yt7;d.net7.FB+=a.fb7;}
  d.hasW=Object.keys(ST.w).length>0;d.hasMC=Object.keys(ST.mc).length>0;
  D=d;return d;}

// =================== GRÁFICOS ===================
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
function lineChart(el,{dates,series,unit=''}){
  const W=440,H=170,P={l:40,r:10,t:10,b:22};el.innerHTML='';
  const all=series.flatMap(s=>s.values.filter(v=>v!=null));if(!all.length){el.innerHTML='<div class="empty">Ainda sem dados para este gráfico.</div>';return;}
  const max=Math.max(1,...all);const nice=(()=>{const p=Math.pow(10,Math.floor(Math.log10(max)));const m=max/p;return (m<=1?1:m<=2?2:m<=5?5:10)*p;})();
  const x=i=>P.l+(W-P.l-P.r)*i/(dates.length-1),yy=v=>P.t+(H-P.t-P.b)*(1-v/nice);
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de linhas">`;
  for(let i=0;i<=4;i++){const v=nice*i/4,Y=yy(v);g+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y}" y2="${Y}" stroke="var(--line)" stroke-width="1"/><text x="${P.l-6}" y="${Y+4}" text-anchor="end" font-size="10" fill="var(--muted)">${short(v)}</text>`;}
  dates.forEach((d,i)=>{if(i%7===0||i===dates.length-1)g+=`<text x="${x(i)}" y="${H-6}" text-anchor="middle" font-size="10" fill="var(--muted)">${dm(d)}</text>`;});
  for(const s of series){let path='',pen=false;s.values.forEach((v,i)=>{if(v==null){pen=false;return;}path+=(pen?'L':'M')+x(i).toFixed(1)+','+yy(v).toFixed(1);pen=true;});
    g+=`<path d="${path}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
    const li=s.values.map((v,i)=>v!=null?i:-1).filter(i=>i>=0).pop();if(li!=null)g+=`<circle cx="${x(li)}" cy="${yy(s.values[li])}" r="4" fill="${s.color}" stroke="var(--panel)" stroke-width="2"/>`;}
  g+=`<line id="xh" x1="0" x2="0" y1="${P.t}" y2="${H-P.b}" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 3" opacity="0"/><g id="dots"></g><rect x="${P.l}" y="0" width="${W-P.l-P.r}" height="${H}" fill="transparent" id="hit"/></svg><div class="tt"></div>`;
  el.innerHTML=g;const svg=el.querySelector('svg'),tt=el.querySelector('.tt'),xh=svg.querySelector('#xh'),dots=svg.querySelector('#dots');
  const move=e=>{const r=svg.getBoundingClientRect();const px=(e.clientX-r.left)/r.width*W;const i=Math.max(0,Math.min(dates.length-1,Math.round((px-P.l)/(W-P.l-P.r)*(dates.length-1))));
    xh.setAttribute('x1',x(i));xh.setAttribute('x2',x(i));xh.setAttribute('opacity',1);
    dots.innerHTML=series.map(s=>s.values[i]!=null?`<circle cx="${x(i)}" cy="${yy(s.values[i])}" r="4.5" fill="${s.color}" stroke="var(--panel)" stroke-width="2"/>`:'').join('');
    tt.innerHTML=`<b>${wd(dates[i])} ${dm(dates[i])}</b><br>`+series.map(s=>`${esc(s.name)}: <b>${s.values[i]==null?'—':fmt(s.values[i])}</b>${unit}`).join('<br>');
    tt.style.left=(x(i)/W*r.width)+'px';tt.style.top=(yy(Math.max(...series.map(s=>s.values[i]||0)))/H*r.height-10)+'px';tt.classList.add('on');};
  const hit=svg.querySelector('#hit');hit.addEventListener('pointermove',move);hit.addEventListener('pointerdown',move);hit.addEventListener('pointerleave',()=>{tt.classList.remove('on');xh.setAttribute('opacity',0);dots.innerHTML='';});}
function legend(el,items){el.innerHTML=items.map(i=>`<span><i style="background:${i.color}" class="${i.sq?'sq':''}"></i>${esc(i.name)}</span>`).join('');}
function barChart(el,{groups,series,fmtV=short}){// groups: [{label, values:[..per series]}]
  const W=440,H=160,P={l:40,r:10,t:16,b:24};const all=groups.flatMap(g=>g.values.filter(v=>v!=null));if(!all.length){el.innerHTML='<div class="empty">Sem dados suficientes.</div>';return;}
  const max=Math.max(1,...all);const nice=(()=>{const p=Math.pow(10,Math.floor(Math.log10(max)));const m=max/p;return (m<=1?1:m<=2?2:m<=5?5:10)*p;})();
  const yy=v=>P.t+(H-P.t-P.b)*(1-v/nice);const gw=(W-P.l-P.r)/groups.length,bw=Math.min(46,(gw-24)/series.length);
  let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de barras">`;
  for(let i=0;i<=4;i++){const v=nice*i/4,Y=yy(v);g+=`<line x1="${P.l}" x2="${W-P.r}" y1="${Y}" y2="${Y}" stroke="var(--line)"/><text x="${P.l-6}" y="${Y+4}" text-anchor="end" font-size="10" fill="var(--muted)">${fmtV(v)}</text>`;}
  groups.forEach((gr,gi)=>{const cx=P.l+gw*gi+gw/2;const x0=cx-(bw*series.length+2*(series.length-1))/2;
    g+=`<text x="${cx}" y="${H-6}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink2)">${esc(gr.label)}</text>`;
    gr.values.forEach((v,si)=>{if(v==null)return;const X=x0+si*(bw+2),Y=yy(v),h=Math.max(1,H-P.b-Y);
      g+=`<path d="M${X},${H-P.b}V${Y+4}Q${X},${Y} ${X+4},${Y}H${X+bw-4}Q${X+bw},${Y} ${X+bw},${Y+4}V${H-P.b}Z" fill="${series[si].color}"><title>${esc(series[si].name)} · ${esc(gr.label)}: ${fmt(v)}</title></path>`;
      g+=`<text x="${X+bw/2}" y="${Y-4}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--ink)">${fmtV(v)}</text>`;});});
  el.innerHTML=g+'</svg>';}

// =================== PAINÉIS ===================
function netChip(n){const name=NET[n.k]||n.k;const mark=n.s==='done'?' ✓':n.s==='err'?' ✗':'';const c=`chip ${n.s==='done'?'done':n.s==='err'?'err':'pend'}`;
  return n.url?`<a class="${c}" href="${esc(n.url)}" target="_blank" rel="noopener">${esc(name)}${mark}</a>`:`<span class="${c}">${esc(name)}${mark}</span>`;}
function renderAgenda(){const el=$('agenda');const errs=Object.entries(ST.mcErr).filter(([,e])=>e);if(!D.hasMC&&!errs.length)return;const L=lis();
  let h='';let last='';
  for(const p of D.posts){if(p.date<L.date)continue;
    if(p.date!==last){last=p.date;h+=`<div class="day">${p.date===L.date?'HOJE':p.date===addDays(L.date,1)?'AMANHÃ':wd(p.date).toUpperCase()+' '+dm(p.date)}</div>`;}
    const badge=p.state==='done'?'<span class="chip done">saiu em tudo</span>':p.state==='err'?'<span class="chip err">erro</span>':p.state==='pause'?'<span class="chip pause">em pausa</span>':p===D.next?'<span class="chip next">a seguir</span>':'';
    const future=p.date>L.date||p.min>L.min+2;const editable=future&&!p.anyDone;
    let acts='';
    if(editable){if(UI.editing===p.id)acts=`<div class="row"><input type="datetime-local" id="dt-${esc(p.id)}" value="${esc(p.date)}T${esc(p.time)}" min="${esc(L.date)}T00:00"><button type="button" class="sm primary" data-act="save" data-id="${esc(p.id)}">Guardar</button><button type="button" class="sm" data-act="cancel">Cancelar</button></div>`;
      else acts=`<div class="row"><button type="button" class="sm" data-act="edit" data-id="${esc(p.id)}">Mudar hora</button>${p.state==='pause'?`<button type="button" class="sm" data-act="resume" data-id="${esc(p.id)}">Retomar</button>`:`<button type="button" class="sm" data-act="pause" data-id="${esc(p.id)}">Pausar</button>`}</div>`;}
    h+=`<div class="post"><div class="time">${esc(p.time)}</div><div><div class="acct">${esc(LABEL[p.acct])}</div><div class="t">${esc(p.title)}</div><div class="chips">${p.nets.map(netChip).join('')}${p.trial?'<span class="chip trial">trial reel</span>':''}${badge}</div>${acts}</div></div>`;}
  if(!h)h='<div class="empty">Nada agendado nos próximos 7 dias.</div>';
  for(const [a,e] of errs)h+=`<p class="warnbox">${esc(LABEL[a])}: ${esc(errMsg(e,MC))}</p>`;
  h+='<p class="note">Só dá para mexer em posts que ainda não saíram.</p>';
  el.innerHTML=h;}
$('agenda').addEventListener('click',async e=>{const b=e.target.closest('button[data-act]');if(!b)return;const act=b.dataset.act;
  if(act==='cancel'){UI.editing=null;renderAgenda();return;}
  const p=D.posts.find(x=>x.id===b.dataset.id);if(!p)return;
  if(act==='edit'){UI.editing=p.id;renderAgenda();$('dt-'+p.id)?.focus();return;}
  let patch={},msg='';
  if(act==='save'){const v=$('dt-'+p.id).value;if(!v){return;}const [dd,tt]=v.split('T');const L=lis();if(dd<L.date||(dd===L.date&&(+tt.slice(0,2)*60+ +tt.slice(3,5))<=L.min)){toast('Essa hora já passou.');return;}
    patch={publicationDate:{dateTime:`${dd}T${tt.slice(0,5)}:00`,timezone:'Europe/Lisbon'}};msg=`Mudar "${p.title.slice(0,50)}" para ${wd(dd)} ${dm(dd)} às ${tt.slice(0,5)}?`;}
  if(act==='pause'){patch={draft:true};msg=`Pôr "${p.title.slice(0,50)}" em pausa? Fica em rascunho no Metricool e não sai até o retomares.`;}
  if(act==='resume'){patch={draft:false};msg=`Retomar "${p.title.slice(0,50)}"? Volta a sair às ${p.time} de ${dm(p.date)}.`;}
  if(!(await confirmBox(act==='save'?'Mudar hora':act==='pause'?'Pausar post':'Retomar post',msg)))return;
  const raw=JSON.parse(JSON.stringify(p.raw));for(const k of ['id','uuid','creationDate','creatorUserMail','creatorUserId','brandTags'])delete raw[k];
  raw.providers=(raw.providers||[]).map(x=>({network:x.network}));Object.assign(raw,patch);
  b.disabled=true;b.textContent='A guardar…';
  try{await mcp.callTool(MC,'updateScheduledPost',{id:String(p.raw.id),uuid:String(p.raw.uuid),blogId:p.blog,info:JSON.stringify(raw)});
    toast('Feito! O Metricool já tem a alteração.');UI.editing=null;refreshAll();}
  catch(err){toast('Não consegui: '+errMsg(err,MC));b.disabled=false;b.textContent='Tentar outra vez';}});

function setTabs(){for(const g of document.querySelectorAll('.tabs[data-k]'))for(const b of g.children)b.setAttribute('aria-pressed',String(b.dataset.v===UI[g.dataset.k]));}
document.addEventListener('click',e=>{const b=e.target.closest('.tabs[data-k] button');if(!b)return;UI[b.parentElement.dataset.k]=b.dataset.v;setTabs();renderAna();renderVids();});
function tile(k,color,v,d,dcls=''){return `<div class="tile"><div class="k">${color?`<i style="background:${color}"></i>`:''}${esc(k)}</div><div class="v">${v}</div><div class="d ${dcls}">${d}</div></div>`;}
function delta(a,b){if(!b)return ['sem semana anterior',''];const p=(a-b)/b;return [`${p>=0?'▲':'▼'} ${Math.abs(Math.round(p*100))}% vs semana anterior`,p>=0?'up':'down'];}
function renderAna(){if(!D.hasW&&!Object.values(ST.wErr).some(Boolean))return;const a=D.a[UI.anaAcct];
  const [d1,c1]=delta(a.ig7,a.igP7),[d2,c2]=delta(a.fb7,a.fbP7);
  $('tiles').innerHTML=`<div class="tiles">${tile('Instagram · views 7 dias',css('--s-ig'),short(a.ig7),d1,c1)}${tile('Facebook · plays de reels 7 dias',css('--s-fb'),short(a.fb7),d2,c2)}
    ${tile('TikTok · views dos vídeos da semana',css('--s-tt'),short(a.tt7),`${a.ttN} vídeos publicados`)}${tile('YouTube · views dos vídeos da semana',css('--s-yt'),short(a.yt7),`${a.ytN} vídeos publicados`)}
    ${tile('Seguidores Instagram','',fmt(a.igFol),`+${fmt(a.igNew7)} nos últimos 7 dias`,'up')}${tile('Seguidores Facebook','',fmt(a.fbFol),`+${fmt(a.fbNew7)} nos últimos 7 dias`,'up')}
    ${tile('Subscritores YouTube','',fmt(a.ytSubs),'total')}${tile('Instagram · ontem','',short(a.igYesterday),'views')}</div>`;
  const days=D.days.slice(0,-1);// sem hoje (incompleto)
  const sIG={name:'Instagram',color:css('--s-ig'),values:days.map(d=>a.igV[d]??null)},sFB={name:'Facebook (reels)',color:css('--s-fb'),values:days.map(d=>a.fbP[d]??null)};
  legend($('lg-views'),[sIG,sFB]);lineChart($('ch-views'),{dates:days,series:[sIG,sFB]});
  const fIG={name:'Instagram',color:css('--s-ig'),values:days.map(d=>a.igNew[d]??null)},fFB={name:'Facebook',color:css('--s-fb'),values:days.map(d=>a.fbF[d]??null)};
  legend($('lg-fol'),[fIG,fFB]);lineChart($('ch-fol'),{dates:days,series:[fIG,fFB]});
  $('tb-days').innerHTML=`<table><thead><tr><th>Dia</th><th class="n">IG views</th><th class="n">FB plays</th><th class="n">IG +seg.</th><th class="n">FB +seg.</th></tr></thead><tbody>${[...days].reverse().map(d=>`<tr><td>${wd(d)} ${dm(d)}</td><td class="n">${fmt(a.igV[d])}</td><td class="n">${fmt(a.fbP[d])}</td><td class="n">${fmt(a.igNew[d])}</td><td class="n">${fmt(a.fbF[d])}</td></tr>`).join('')}</tbody></table>`;
  const errs=Object.entries(ST.wErr).filter(([,e])=>e);
  $('verdict').innerHTML=(ST.db?.verdict?`<div class="tile"><div class="k">O que está a resultar (relatório da manhã)</div><div style="font-size:13px;margin-top:4px">${esc(ST.db.verdict)}</div></div>`:'')+errs.map(([k,e])=>`<p class="warnbox">${esc(k)}: ${esc(errMsg(e,WS))}</p>`).join('')+'<p class="note">Hoje fica de fora dos gráficos (ainda não acabou).</p>';}
function stats(arr,f){const v=arr.map(f).filter(x=>x!=null&&!isNaN(x)).map(Number);if(!v.length)return {n:0};const s=[...v].sort((a,b)=>a-b);return {n:v.length,avg:v.reduce((a,b)=>a+b,0)/v.length,med:s[Math.floor(s.length/2)]};}
function renderLab(){if(!D.hasW)return;const ig=D.vids.filter(v=>v.k==='IG');let h='';
  const rows={};for(const a of ['2factos','hit0ms']){const m=ig.filter(v=>v.acct===a);rows[a]={t:m.filter(v=>v.trial),n:m.filter(v=>!v.trial)};}
  const grp=['2factos','hit0ms'].map(a=>({label:LABEL[a],values:[stats(rows[a].n,v=>v.views).med??null,stats(rows[a].t,v=>v.views).med??null]}));
  const S=[{name:'Reels normais',color:css('--s-normal')},{name:'Trial reels',color:css('--s-trial')}];
  h+=`<div><h3>Views medianas por reel no Instagram · 28 dias</h3><div class="legend">${S.map(s=>`<span><i class="sq" style="background:${s.color}"></i>${s.name}</span>`).join('')}</div><div class="chart" id="ch-lab"></div></div>`;
  h+=`<div class="tbl"><table><thead><tr><th>Conta</th><th>Tipo</th><th class="n">Reels</th><th class="n">Mediana</th><th class="n">Média</th><th class="n">Salta 3s</th><th class="n">Partilhas</th></tr></thead><tbody>`;
  for(const a of ['2factos','hit0ms'])for(const [lab,arr] of [['Normal',rows[a].n],['Trial',rows[a].t]]){const v=stats(arr,x=>x.views),s=stats(arr,x=>x.skip),sh=stats(arr,x=>x.shares);
    h+=`<tr><td>${esc(LABEL[a])}</td><td>${lab}</td><td class="n">${v.n||0}</td><td class="n">${short(v.med)}</td><td class="n">${short(v.avg)}</td><td class="n">${pct(s.avg)}</td><td class="n">${s.n?(sh.avg??0).toFixed(1).replace('.',','):'—'}</td></tr>`;}
  h+='</tbody></table></div>';
  const tr=ig.filter(v=>v.trial).sort((a,b)=>b.date.localeCompare(a.date));
  h+=`<div><h3>Trial reels dos últimos 28 dias</h3>${tr.length?`<div class="tbl"><table><thead><tr><th>Dia</th><th>Reel</th><th class="n">Views</th><th class="n">Salta</th></tr></thead><tbody>${tr.map(v=>`<tr><td>${dm(v.date)}</td><td class="cap"><span class="acct">${esc(LABEL[v.acct])}</span><br>${v.url?`<a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(capLine(v.cap).slice(0,70))}</a>`:esc(capLine(v.cap).slice(0,70))}</td><td class="n">${fmt(v.views)}</td><td class="n">${pct(v.skip)}</td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">Ainda não há trial reels com números.</div>'}</div>`;
  h+='<p class="note">Salta 3s: quanto mais baixo, melhor o gancho.</p>';
  $('lab').innerHTML=h;barChart($('ch-lab'),{groups:grp,series:S});}
function key(s){return String(s||'').toLowerCase().replace(/#\S+/g,'').replace(/[^\p{L}\p{N} ]/gu,'').replace(/\s+/g,' ').trim().slice(0,22);}
function vidRows(){const vs=D.vids.filter(v=>UI.vidAcct==='all'||v.acct===UI.vidAcct);const groups=new Map();
  for(const v of vs){const kk=v.acct+'|'+v.date+'|'+key(v.cap);let g=groups.get(kk);if(!g){g={acct:v.acct,date:v.date,cap:v.cap,IG:null,TT:null,YT:null};groups.set(kk,g);}
    g[v.k]=(g[v.k]||0)+(+v.views||0);if(v.k==='IG'){g.url=v.url;g.trial=v.trial;g.skip=v.skip;}}
  const tot=r=>(r.IG||0)+(r.TT||0)+(r.YT||0);const rows=[...groups.values()];
  rows.sort(UI.vidSort==='views'?(a,b)=>tot(b)-tot(a):(a,b)=>b.date.localeCompare(a.date)||tot(b)-tot(a));return rows;}
function renderVids(){if(!D.hasW)return;const rows=vidRows();
  if(!rows.length){$('vids').innerHTML='<div class="empty">Sem vídeos nos últimos 28 dias.</div>';return;}
  $('vids').innerHTML=`<table><thead><tr><th>Dia</th><th>Vídeo</th><th class="n">IG</th><th class="n">TT</th><th class="n">YT</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${dm(r.date)}</td><td class="cap"><span class="acct">${esc(LABEL[r.acct])}</span>${r.trial?' <span class="chip trial">trial</span>':''}<br>${r.url?`<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(capLine(r.cap).slice(0,80))}</a>`:esc(capLine(r.cap).slice(0,80))}${r.skip!=null?`<br><span class="note">salta 3s: ${pct(r.skip)}</span>`:''}</td><td class="n">${short(r.IG)}</td><td class="n">${short(r.TT)}</td><td class="n">${short(r.YT)}</td></tr>`).join('')}</tbody></table>`;}

// ---------- ideias -> pedidos ----------
const DEF_T={'2 Factos':['12:30','22:30'],'Hit0Ms':['12:00','18:00'],'Desafio FB':['15:00','20:00']};
function renderIdeas(){const I=ST.db?.ideas||[];const L=lis();const taken=new Set(ST.ped.filter(p=>p.date>=L.date&&p.n!=null&&p.relatorio===ST.db?.updated).map(p=>p.n));
  let h='';
  if(!I.length)h+=`<div class="empty">As ideias chegam às 8:53.</div>`;
  else{h+=`<p class="note">Marca, escolhe dia e hora, manda.</p>`;
    for(const it of I){const id='i'+it.n;const on=!!UI.pick[id];const done=taken.has(it.n);const dt=DEF_T[it.acct]||['12:00','18:00'];
      h+=`<div class="idea ${on?'on':''}"><input type="checkbox" id="${id}" data-n="${esc(it.n)}" ${on?'checked':''} ${done?'disabled':''} aria-label="Escolher ideia ${esc(it.n)}"><label for="${id}"><span class="num">${esc(it.n)}</span><span class="acct">${esc(it.acct)}</span><br>${esc(it.text)}${done?' <span class="chip done">já pedida</span>':''}
      ${on?`<div class="when"><select data-f="day" data-n="${esc(it.n)}" aria-label="Dia"><option value="0" ${UI.pick[id].day==0?'selected':''}>Hoje</option><option value="1" ${UI.pick[id].day==1?'selected':''}>Amanhã</option><option value="2" ${UI.pick[id].day==2?'selected':''}>Depois de amanhã</option></select><input type="time" data-f="time" data-n="${esc(it.n)}" value="${esc(UI.pick[id].time||dt[0])}" aria-label="Hora"></div>`:''}</label></div>`;}}
  h+=`<details ${I.length?'':'open'}><summary>Pedir uma ideia minha</summary><div style="display:grid;gap:8px;margin-top:8px"><select class="field" id="own-acct"><option>2 Factos</option><option>Hit0Ms</option><option>Desafio FB</option></select><textarea class="field" id="own-text" placeholder="Ex.: Hit0Ms com copos de vidro a partir, 4 cores"></textarea><div style="display:flex;gap:6px;flex-wrap:wrap"><select class="field" id="own-day"><option value="0">Hoje</option><option value="1">Amanhã</option><option value="2">Depois de amanhã</option></select><input class="field" type="time" id="own-time" value="18:00"><button type="button" class="sm" id="own-go">Mandar esta</button></div></div></details>`;
  const n=Object.keys(UI.pick).length;
  if(I.length)h+=`<div class="sticky"><span class="note">${n?`${n} escolhida${n>1?'s':''}`:'Nenhuma escolhida'}</span><button type="button" class="primary" id="send-picks" ${n?'':'disabled'}>Mandar para a produção</button></div>`;
  $('ideas').innerHTML=h;}
$('ideas').addEventListener('change',e=>{const t=e.target;const id='i'+t.dataset.n;
  if(t.type==='checkbox'){const it=(ST.db?.ideas||[]).find(x=>String(x.n)===t.dataset.n);if(t.checked)UI.pick[id]={day:0,time:(DEF_T[it?.acct]||['12:00'])[0]};else delete UI.pick[id];renderIdeas();return;}
  if(t.dataset.f&&UI.pick[id])UI.pick[id][t.dataset.f]=t.value;});
async function addPedidos(list){if(!db){toast('Abre a página no claude.ai para mandar pedidos.');return false;}
  try{for(const p of list){await db.collection('pedidos').doc('p'+Date.now()+Math.floor(Math.random()*1000)).set(p);}return true;}
  catch(e){toast(e?.code==='quota_exceeded'?'A base de dados está cheia. Diz-me na conversa para limpar pedidos antigos.':'Não consegui guardar o pedido. Tenta outra vez.');return false;}}
$('ideas').addEventListener('click',async e=>{const L=lis();
  if(e.target.id==='send-picks'){const I=ST.db?.ideas||[];const list=[];
    for(const [id,v] of Object.entries(UI.pick)){const it=I.find(x=>'i'+x.n===id);if(!it)continue;const date=addDays(L.date,+v.day||0);const time=v.time||'12:00';
      if(date===L.date&&(+time.slice(0,2)*60+ +time.slice(3,5))<L.min+60){toast(`A ideia ${it.n} precisa de pelo menos 1 hora. Escolhe mais tarde.`);return;}
      list.push({n:it.n,acct:it.acct,text:String(it.text),date,time,estado:'novo',criado:new Date().toISOString(),relatorio:ST.db?.updated||'',nota:''});}
    if(!list.length)return;
    if(!(await confirmBox('Mandar para a produção',`${list.length} pedido${list.length>1?'s':''}: ${list.map(p=>`${p.n} (${wd(p.date)} ${p.time})`).join(', ')}. A oficina pega nisto na próxima ronda.`,'Mandar')))return;
    e.target.disabled=true;if(await addPedidos(list)){UI.pick={};toast('Mandado! O Guionista trata disso.');}else e.target.disabled=false;}
  if(e.target.id==='own-go'){const text=$('own-text').value.trim();if(text.length<6){toast('Escreve a ideia com um pouco mais de detalhe.');return;}
    const date=addDays(L.date,+$('own-day').value),time=$('own-time').value||'18:00';
    if(date===L.date&&(+time.slice(0,2)*60+ +time.slice(3,5))<L.min+60){toast('Precisa de pelo menos 1 hora. Escolhe mais tarde.');return;}
    if(await addPedidos([{n:null,acct:$('own-acct').value,text:text.slice(0,600),date,time,estado:'novo',criado:new Date().toISOString(),relatorio:'',nota:''}])){toast('Mandado! O Guionista trata disso.');}}});

// ---------- produção ----------
const ESTADOS=[['novo','Na fila'],['a_fazer','Em produção'],['precisa_voz','Precisa da tua voz'],['voz_recebida','Voz recebida'],['agendado','Agendado']];
function renderProd(){const P=[...ST.ped].sort((a,b)=>String(b.criado).localeCompare(String(a.criado)));
  if(!ST.pedOk){return;}
  if(!P.length){$('prod').innerHTML='<div class="empty">Sem pedidos. Vai às Ideias.</div>';return;}
  let h='<p class="note">A oficina passa de hora a hora (9h–23h).</p>';
  for(const p of P.slice(0,30)){const i=ESTADOS.findIndex(x=>x[0]===p.estado);const err=p.estado==='erro';
    h+=`<div class="ped"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span class="acct">${esc(p.acct)}${p.n!=null?' · ideia '+esc(p.n):''}</span><span class="note">${esc(wd(p.date||lis().date))} ${esc(dm(p.date||lis().date))} · ${esc(p.time||'')}</span></div>
    <div style="font-weight:600">${esc(p.text)}</div><div class="steps" aria-hidden="true">${ESTADOS.map((x,j)=>`<i class="${err?'err':j<=i?'on':''}"></i>`).join('')}</div>
    <div class="chips"><span class="chip ${err?'err':p.estado==='agendado'?'done':p.estado==='precisa_voz'?'next':''}">${esc(err?'Erro':(ESTADOS[i]?.[1]||p.estado))}</span></div>
    ${p.nota?`<p class="note">${esc(p.nota)}</p>`:''}
    ${p.guiao&&p.estado==='precisa_voz'?`<pre class="guiao">${esc(p.guiao)}</pre><div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" class="sm" data-act="copy" data-id="${esc(p._id)}">Copiar guião</button><label class="btn sm" style="padding:4px 9px;font-size:12px;border-width:1.5px;border-radius:8px">Enviar MP3<input type="file" accept="audio/mpeg,audio/mp3,.mp3,audio/*" data-act="mp3" data-id="${esc(p._id)}" class="sr"></label><span class="note" id="up-${esc(p._id)}"></span></div>`:''}
    ${(p.links||[]).filter(safeUrl).length?`<div class="chips">${p.links.filter(safeUrl).map(u=>`<a class="chip" href="${esc(u)}" target="_blank" rel="noopener">abrir</a>`).join('')}</div>`:''}
    ${p.estado==='novo'?`<div><button type="button" class="sm danger" data-act="del" data-id="${esc(p._id)}">Cancelar pedido</button></div>`:''}</div>`;}
  $('prod').innerHTML=h;}
$('prod').addEventListener('click',async e=>{const b=e.target.closest('button[data-act]');if(!b)return;const p=ST.ped.find(x=>x._id===b.dataset.id);if(!p)return;
  if(b.dataset.act==='copy'){try{await navigator.clipboard.writeText(p.guiao);toast('Guião copiado.');}catch{toast('Não deu para copiar; seleciona o texto à mão.');}}
  if(b.dataset.act==='del'){if(!(await confirmBox('Cancelar pedido',`Cancelar "${String(p.text).slice(0,60)}"?`,'Cancelar pedido')))return;try{await db.collection('pedidos').doc(p._id).delete();toast('Pedido cancelado.');}catch{toast('Não consegui cancelar. Tenta outra vez.');}}});
$('prod').addEventListener('change',async e=>{const inp=e.target;if(inp.dataset.act!=='mp3'||!inp.files?.[0])return;const f=inp.files[0];const p=ST.ped.find(x=>x._id===inp.dataset.id);const st=$('up-'+inp.dataset.id);
  if(f.size>6*1024*1024){toast('O MP3 é grande demais (máx. 6 MB).');return;}
  st.textContent='A ler…';const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]||'');r.onerror=rej;r.readAsDataURL(f);}).catch(()=>null);
  if(!b64){st.textContent='';toast('Não consegui ler o ficheiro.');return;}
  const CH_=180000,n=Math.ceil(b64.length/CH_);
  try{for(let i=0;i<n;i++){st.textContent=`A enviar ${Math.round(i/n*100)}%…`;await db.collection(`vozes/${p._id}/partes`).doc('p'+String(i).padStart(3,'0')).set({i,n,b64:b64.slice(i*CH_,(i+1)*CH_)});}
    await db.collection('pedidos').doc(p._id).update({estado:'voz_recebida',voz:{nome:f.name.slice(0,120),bytes:f.size,partes:n,mime:f.type||'audio/mpeg'},nota:'Voz recebida. A oficina monta o vídeo na próxima ronda.'});
    st.textContent='';toast('Voz enviada! O vídeo fica pronto na próxima ronda.');}
  catch(err){st.textContent='';toast(err?.code==='quota_exceeded'?'A base de dados está cheia. Diz-me na conversa para limpar vozes antigas.':'O envio falhou. Tenta outra vez.');}});
function renderChal(){const C=ST.db?.challenges||[];const I=(ST.db?.ideas||[]).filter(i=>/desafio/i.test(i.acct));let h='';
  h+=C.length?`<div><h3>Desafios em imagem publicados</h3><div class="tbl"><table><thead><tr><th>Desafio</th><th class="n">Alcance</th><th class="n">Coment.</th></tr></thead><tbody>${C.map(c=>`<tr><td>${esc(c.title)}</td><td class="n">${fmt(c.reach)}</td><td class="n">${fmt(c.comments)}</td></tr>`).join('')}</tbody></table></div></div>`:'<div class="empty">Ainda não há desafios em imagem com números.</div>';
  if(I.length)h+=`<div><h3>Propostos hoje</h3><ol>${I.map(i=>`<li value="${Number(i.n)||''}">${esc(i.text)}</li>`).join('')}</ol></div>`;
  $('chal').innerHTML=h;}
function renderHud(){
  const ts=Object.values(ST.stamp);if(ts.length){$('upd').textContent=''+new Date(Math.min(...ts)).toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Lisbon'});$('live').hidden=false;}
  const need=ST.ped.filter(p=>p.estado==='precisa_voz').length;const dot=document.querySelector('#dock button[data-id="gui"] .dot');if(dot){dot.textContent=need;dot.hidden=!need;}
  const nI=(ST.db?.ideas||[]).length;const dot2=document.querySelector('#dock button[data-id="ide"] .dot');if(dot2){dot2.textContent=nI;dot2.hidden=!nI;}}
let onWorld=()=>{};
let renderQ=false;function renderAll(){if(renderQ)return;renderQ=true;requestAnimationFrame(()=>{renderQ=false;derive();
  if(UI.editing==null)renderAgenda();renderAna();renderLab();renderVids();if(!document.activeElement?.closest?.('#ideas'))renderIdeas();renderProd();renderChal();renderHud();onWorld();});}
setInterval(renderAll,60000);

// =================== LIGAÇÕES AO VIVO ===================
let mcp=null,db=null;const unsubs=[];
function mcRange(b,from,to){const o=lisOffset();return {brandId:b.id,fromDate:`${from}T00:00:00${o}`,toDate:`${to}T23:59:59${o}`,timezone:'Europe/Lisbon'};}
const WIN={
  igDay:{connector:'instagram',fields:['account_name','date','views','reach','follower_count_1d','followers_count'],date_preset:'last_28dT'},
  igMedia:{connector:'instagram',fields:['account_name','date','media_caption','media_views','media_reach','media_reel_skip_rate','media_permalink','media_like_count','media_comments_count','media_shares'],date_preset:'last_28dT'},
  tt:{connector:'tiktok_organic',fields:['username','video_caption','video_views_count','video_likes','video_full_watched_rate','video_create_datetime'],date_preset:'last_28dT'},
  yt:{connector:'youtube',fields:['account_name','video_title','video_view_count','video_like_count','published_at','subscriber_count'],date_preset:'last_28dT'},
  fb:{connector:'facebook_organic',fields:['account_name','date','blue_reels_play_count','page_follows'],date_preset:'last_28dT'}};
const pendingRetry={};
function onWin(k){return ev=>{
  if(ev.type==='data'){const p=ev.result.payload;
    if(p&&p.status&&p.status!=='done'&&!(p.data&&p.data.length)){if(!pendingRetry[k])pendingRetry[k]=setTimeout(()=>{pendingRetry[k]=null;mcp.callTool(WS,'get_data',WIN[k],{cache:{staleTime:0,gcTime:3600000,refresh:true}}).catch(()=>{});},30000);return;}
    ST.w[k]=(p&&p.data)||[];ST.wErr[k]=null;ST.stamp['w'+k]=ev.result.cache?.storedAt||Date.now();}
  else{ST.wErr[k]=ev.error;if(DENY.includes(ev.error?.code))delete ST.w[k];}
  renderAll();};}
function onMc(b,store){return ev=>{
  if(ev.type==='data'){ST[store][b.acct]=(ev.result.payload&&ev.result.payload.data)||[];ST.mcErr[b.acct]=null;ST.stamp['m'+store+b.acct]=ev.result.cache?.storedAt||Date.now();}
  else{if(store==='mc')ST.mcErr[b.acct]=ev.error;if(DENY.includes(ev.error?.code))delete ST[store][b.acct];}
  renderAll();};}
let watchedDay='';
function inputs(){const L=lis();return {agenda:b=>mcRange(b,L.date,addDays(L.date,7)),past:b=>mcRange(b,addDays(L.date,-28),addDays(L.date,-1))};}
function startWatches(){while(unsubs.length)unsubs.pop()();watchedDay=lis().date;const I=inputs();
  for(const b of BRANDS){unsubs.push(mcp.watchTool(MC,'getScheduledPosts',I.agenda(b),onMc(b,'mc'),{cache:{staleTime:120000,gcTime:3600000},refetchInterval:180000}));
    unsubs.push(mcp.watchTool(MC,'getScheduledPosts',I.past(b),onMc(b,'mcPast'),{cache:{staleTime:1800000,gcTime:86400000},refetchInterval:3600000}));}
  for(const k of Object.keys(WIN))unsubs.push(mcp.watchTool(WS,'get_data',WIN[k],onWin(k),{cache:{staleTime:600000,gcTime:86400000},refetchInterval:900000}));}
setInterval(()=>{if(mcp&&lis().date!==watchedDay)startWatches();},60000);
async function refreshAll(){if(!mcp)return;const I=inputs();const o={cache:{staleTime:0,gcTime:3600000,refresh:true}};
  await Promise.allSettled([...BRANDS.map(b=>mcp.callTool(MC,'getScheduledPosts',I.agenda(b),o).then(r=>onMc(b,'mc')({type:'data',result:r}),e=>onMc(b,'mc')({type:'error',error:e}))),
    ...Object.keys(WIN).map(k=>mcp.callTool(WS,'get_data',WIN[k],o).then(r=>onWin(k)({type:'data',result:r}),e=>onWin(k)({type:'error',error:e})))]);}
$('refresh').addEventListener('click',async()=>{const bt=$('refresh');if(!mcp){toast('Abre a página no claude.ai com a tua conta.');return;}bt.disabled=true;bt.textContent='A atualizar…';await refreshAll();bt.disabled=false;bt.textContent='↻ Atualizar';toast('Tudo atualizado.');});
const loadT=setTimeout(()=>{if(!Object.keys(ST.stamp).length)$('upd').textContent='a ligar…';},10000);
claude.use('mcp').then(m=>{mcp=m;if(!m){clearTimeout(loadT);$('upd').textContent='abre no claude.ai';
    for(const id of ['agenda','lab','vids'])$(id).innerHTML='<div class="empty">Os dados ao vivo só aparecem a quem tem o Metricool e o Windsor ligados.</div>';return;}
  startWatches();});
claude.use('db').then(d=>{db=d;if(!d){$('prod').innerHTML='<div class="empty">Os pedidos só funcionam com a página aberta no claude.ai.</div>';return;}
  d.doc('estado/hoje').onSnapshot(s=>{ST.db=s.exists?s.data():null;renderAll();},()=>{});
  d.collection('pedidos').onSnapshot(s=>{ST.ped=s.docs.map(x=>({...x.data(),_id:x.id}));ST.pedOk=true;renderAll();},()=>{ST.pedOk=true;renderAll();});});
