(function(){
var SHEET_ID='1CowswonJ8zTqXzQ4vpAqd4JZHPYXYm4uLcxOhHq82qY';
var TABS=['기본설정','슬롯','진행방식','포트폴리오','견적','확인사항','신청양식'];
var B='#5f8fd4',BD='#3f6db5',S='#b7d5f1',SL='#e6f2fc',ST='#6b7280';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function won(n){return n.toLocaleString('ko-KR')+'원'}
function num(v){var n=parseInt(String(v==null?'':v).replace(/[^0-9\-]/g,''),10);return isNaN(n)?0:n}
function imgUrl(u){u=String(u||'').trim();var m=u.match(/drive\.google\.com\/file\/d\/([\w-]+)/)||u.match(/drive\.google\.com\/(?:open|uc)\?[^#]*id=([\w-]+)/);return m?'https://lh3.googleusercontent.com/d/'+m[1]:u}
function ytId(v){v=String(v||'').trim();var m=v.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{6,})/);return m?m[1]:v}

/* ---------- data helpers ---------- */
var DATA={};
function rowsOf(t){return (DATA[t]||[]).slice(1)}
function settings(){var o={};rowsOf('기본설정').forEach(function(r){if(r[0])o[String(r[0]).trim()]=r[1]==null?'':String(r[1])});return o}

/* ---------- html builders ---------- */
var SECKEYS=['슬롯','진행 방식','리깅 포폴','일러스트 포폴','확인사항','신청 · 견적','협업작가'];
var SECDEF=[['01','SLOT','작업 슬롯 현황'],['02','PROCESS','진행 방식'],['03','RIGGING PORTFOLIO','리깅 포트폴리오'],['04','ILLUSTRATION','일러스트 포트폴리오'],['05','MUST READ','확인 사항'],['06','APPLICATION & ESTIMATE','신청 양식과 견적 계산기'],['07','COLLABORATORS','협업 작가님']];
function secLabel(cfg,title){var i=SECKEYS.indexOf(title),d=SECDEF[i]||['','',''];var v=cfg['구역'+d[0]+' 번호/영문/한글'];if(v){var p=v.split('|').map(function(x){return x.trim()});if(p.length>=3)return p}return d}
var SECTITLE={'리깅 포폴':'리깅 포트폴리오','일러스트 포폴':'일러스트 포트폴리오'};
function sec(cfg,title,body,id,lab){
 var l=secLabel(cfg,title);var sd=SECDEF[SECKEYS.indexOf(title)]||['','',''];var shown=cfg['구역'+sd[0]+' 제목']||(lab?String(lab).replace(/포폴/g,'포트폴리오'):'')||SECTITLE[title]||title;
 return '<section'+(id?' id="'+id+'"':'')+' style="padding:44px 16px 48px;"><div style="max-width:960px;margin:0 auto;background:#fff;border:1.5px solid '+S+';border-radius:28px;padding:28px 22px 30px;box-shadow:0 10px 30px rgba(63,109,181,.06);">'+
 '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><span style="background:'+B+';color:#fff;border-radius:99px;padding:3px 10px;font-size:12px;font-weight:800;">'+esc(l[0])+'</span><span style="font-size:12px;font-weight:800;letter-spacing:2px;color:#222;white-space:nowrap;">'+esc(l[1])+'</span><span style="flex:1;border-top:1px dotted '+S+';"></span><span style="font-size:12px;color:'+ST+';white-space:nowrap;">'+esc(l[2])+'</span></div>'+
 '<h2 style="font-size:26px;font-weight:800;margin:0 0 20px;color:#111;">'+esc(shown)+'</h2>'+body+'</div></section>'}
function sub(t){return '<p style="margin:18px 0 10px;font-size:14px;font-weight:800;color:'+BD+';border-left:4px solid '+B+';padding-left:10px;">'+esc(t)+'</p>'}
var BX={open:['모집중'],wait:['대기중'],full:['마감'],closed:['닫힘']};
var SLOTIMG=__SLOTIMGS__;
function slotBox(st){return '<img data-slot="'+st+'" src="'+SLOTIMG[st]+'" alt="'+BX[st][0]+'" style="display:block;width:clamp(92px,25vw,132px);height:auto;">'}
function slotsSec(cfg){
 var html='';
 rowsOf('슬롯').forEach(function(r){var m=String(r[0]||'').trim();if(!m)return;
  var st=r.slice(1).map(function(x){return String(x==null?'':x).trim().toLowerCase()}).filter(function(x){return BX[x]});
  if(!st.length)return;
  html+='<div data-month="'+esc(m)+'" style="display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:6px;"><span style="width:44px;font-weight:800;color:#444;font-size:15px;flex-shrink:0;">'+esc(m)+'</span><div data-boxes style="display:flex;gap:16px;min-width:0;flex-wrap:wrap;justify-content:center;">'+st.map(slotBox).join('')+'</div></div>'});
 return sec(cfg,'슬롯','<div id="slots">'+html+'</div>','sec-slot')}
function procSec(cfg){
 var g={};rowsOf('진행방식').forEach(function(r){var k=String(r[0]||'').trim();if(!k||r[1]==null||r[1]==='')return;(g[k]=g[k]||[]).push(String(r[1]))});
 var CARD='background:#fff;border:1px solid '+S+';border-radius:10px;padding:20px;';
 var chips=(g['기본 풀리깅 포함']||[]).map(function(c){return '<span style="display:inline-block;background:'+SL+';color:'+BD+';border-radius:99px;padding:5px 13px;font-size:13px;font-weight:600;">'+esc(c)+'</span>'}).join('');
 function li(t){return '<p style="display:flex;gap:8px;align-items:baseline;margin:0 0 6px;color:#555;font-size:14px;"><i style="flex:0 0 5px;height:5px;border-radius:50%;background:'+B+';transform:translateY(-3px);"></i><span>'+esc(t)+'</span></p>'}
 function card(t){return '<div style="'+CARD+'"><p style="font-weight:700;font-size:16px;margin:0 0 12px;color:#111;">'+esc(t)+'</p>'+(g[t]||[]).map(li).join('')+'</div>'}
 var body='<div style="'+CARD+'margin-bottom:12px;"><p style="font-weight:700;font-size:16px;margin:0 0 12px;color:#111;">기본 풀리깅 포함</p><div style="display:flex;flex-wrap:wrap;gap:8px;">'+chips+'</div></div>'+
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px;">'+card('진행 순서')+card('받는 형태')+'</div>';
 return sec(cfg,'진행 방식',body,'sec-intro')}

/* portfolio */
function arrowStyle(){return 'width:40px;height:40px;border-radius:50%;border:1px solid '+S+';background:#fff;color:'+B+';font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 2px 8px rgba(63,109,181,.15);'}
function rowCard(title,items){
 var im=items.map(function(it){return '<div style="min-width:0;"><div style="aspect-ratio:1;background:#fff;border:1px solid '+S+';border-radius:18px;overflow:hidden;"><img data-lb src="'+esc(imgUrl(it.url))+'" loading="lazy" alt="" style="display:block;width:100%;height:100%;object-fit:'+(it.zoom?'cover':'contain')+';cursor:zoom-in;"></div>'+(it.cap?'<p style="margin:12px 0 0;text-align:center;font-size:clamp(14px,1.8vw,18px);font-weight:700;color:#111;line-height:1.25;">'+esc(it.cap)+'</p>':'')+'</div>'}).join('');
 return '<div style="background:#fff;border:1.5px solid '+S+';border-radius:28px;margin-bottom:22px;overflow:hidden;"><div style="padding:20px 26px;border-bottom:1px dashed '+S+';"><b style="font-size:22px;color:#111;">'+esc(title)+'</b></div><div style="padding:26px 20px 28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:18px;">'+im+'</div></div>'}
function videoCard(title,items){
 var data=JSON.stringify(items.map(function(it){return [it.cap||'',it.yt?ytId(it.url):imgUrl(it.url),it.yt?'y':'i']})).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
 var th=items.map(function(it,i){return '<img data-th="'+i+'" src="'+(it.yt?'https://img.youtube.com/vi/'+esc(ytId(it.url))+'/mqdefault.jpg':esc(imgUrl(it.url)))+'" alt="" loading="lazy" style="width:96px;aspect-ratio:16/9;object-fit:cover;border-radius:8px;border:2px solid transparent;cursor:pointer;opacity:.6;">'}).join('');
 var dots=items.map(function(it,i){return '<i data-dot="'+i+'" style="height:8px;border-radius:99px;background:'+S+';display:inline-block;cursor:pointer;"></i>'}).join('');
 var ar='position:absolute;top:50%;transform:translateY(-50%);'+arrowStyle();
 return '<div data-car="'+data+'" style="background:#fff;border:1px solid '+S+';border-radius:16px;margin-bottom:22px;box-shadow:0 6px 20px rgba(63,109,181,.08);overflow:hidden;"><p style="margin:0;padding:14px;text-align:center;font-weight:800;color:'+BD+';border-bottom:1px solid '+SL+';background:#f1f8fe;">'+esc(title)+'</p><div style="padding:14px;"><div style="position:relative;"><div style="position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#000;"><div data-vstage style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#000;"></div></div><button type="button" data-prev style="'+ar+'left:-10px;">‹</button><button type="button" data-next style="'+ar+'right:-10px;">›</button></div><p data-cap style="margin:12px 0 8px;text-align:center;font-weight:700;"></p><div style="display:flex;gap:6px;justify-content:center;margin-bottom:12px;">'+dots+'</div><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'+th+'</div></div></div>'}
function trackCard(title,items){
 var cards=items.map(function(it,i){
  var chips=String(it.tag||'').split(/[\s,]+/).filter(Boolean).map(function(x){return '<span style="display:inline-block;background:#fff;color:#333;border:1px solid '+S+';border-radius:99px;padding:4px 12px;font-size:12px;font-weight:600;">'+esc(x.charAt(0)==='#'?x:'#'+x)+'</span>'}).join('');
  return '<div data-card style="flex:0 0 min(86%,640px);scroll-snap-align:start;background:#fff;border:1px solid '+S+';border-radius:18px;padding:14px;box-shadow:0 8px 24px rgba(63,109,181,.10);box-sizing:border-box;"><img data-lb src="'+esc(imgUrl(it.url))+'" loading="lazy" alt="" style="display:block;width:100%;height:auto;border-radius:12px;cursor:zoom-in;background:'+SL+';"><p style="margin:12px 0 8px;font-size:17px;font-weight:800;color:#111;">'+esc(it.cap||'')+' <span style="font-size:12px;font-weight:600;color:'+ST+';margin-left:4px;">'+('0'+(i+1)).slice(-2)+'</span></p><div style="display:flex;gap:6px;flex-wrap:wrap;">'+chips+'</div></div>'}).join('');
 var tr='<div data-track style="min-width:0;max-width:100%;overflow:hidden;"><div data-scroller style="display:flex;gap:16px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:6px 2px 18px;scrollbar-width:none;">'+cards+'</div><div style="display:flex;align-items:center;gap:10px;margin-top:4px;"><button type="button" data-tp style="'+arrowStyle()+'flex-shrink:0;">‹</button><button type="button" data-tn style="'+arrowStyle()+'flex-shrink:0;">›</button><div style="flex:1;height:3px;background:'+S+';border-radius:3px;overflow:hidden;"><div data-bar style="height:100%;width:20%;background:'+B+';border-radius:3px;"></div></div></div></div>';
 return '<div style="background:linear-gradient(180deg,#fff,#f1f8fe);border:1px solid '+S+';border-radius:28px;padding:28px 20px 22px;margin-bottom:22px;box-shadow:0 10px 30px rgba(63,109,181,.08);overflow:hidden;box-sizing:border-box;max-width:100%;"><h3 style="margin:0 0 18px;font-size:26px;font-weight:800;color:#111;">'+esc(title)+'</h3>'+tr+'</div>'}
function galleryCard(title,items){
 var data=JSON.stringify(items.map(function(it){var yt=it.yt;return {t:yt?'y':'i',u:yt?ytId(it.url):imgUrl(it.url),c:it.cap||'',d:String(it.desc||'').split(/\||\n/).map(function(x){return x.trim()}).filter(Boolean)}})).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
 var ar='position:absolute;top:50%;transform:translateY(-50%);'+arrowStyle();
 var th=items.map(function(it,i){var src=it.yt?'https://img.youtube.com/vi/'+esc(ytId(it.url))+'/mqdefault.jpg':esc(imgUrl(it.url));return '<img data-th="'+i+'" src="'+src+'" alt="" loading="lazy" style="width:64px;height:64px;object-fit:cover;border-radius:10px;border:2px solid transparent;cursor:pointer;opacity:.55;background:'+SL+';">'}).join('');
 return '<div data-gal2="'+data+'" style="background:#fff;border:1.5px solid '+S+';border-radius:28px;margin-bottom:22px;overflow:hidden;"><div style="padding:20px 26px;border-bottom:1px dashed '+S+';"><b style="font-size:22px;color:#111;">'+esc(title)+'</b></div>'+
  '<div style="padding:22px 20px 26px;"><div style="position:relative;"><div data-stage style="min-height:clamp(240px,58vw,520px);display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#f1f8fe,'+SL+');border-radius:18px;overflow:hidden;padding:10px;box-sizing:border-box;"></div>'+
  (items.length>1?'<button type="button" data-prev style="'+ar+'left:10px;">‹</button><button type="button" data-next style="'+ar+'right:10px;">›</button>':'')+'</div>'+
  '<p data-cnt style="margin:12px 0 4px;text-align:center;font-size:12px;letter-spacing:2px;color:'+ST+';"></p><p data-cap style="margin:0 0 10px;text-align:center;font-size:clamp(15px,2vw,19px);font-weight:800;color:#111;"></p>'+
  '<div data-desc style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:12px;"></div>'+
  (items.length>1?'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:16px;">'+th+'</div>':'')+'</div></div>'}
function canon(x){var t=String(x||'').trim(),n=t.replace(/\s+/g,'').replace(/포트폴리오/g,'포폴');if(/리깅/.test(n))return '리깅 포폴';if(/일러/.test(n))return '일러스트 포폴';if(/협업/.test(n))return '협업작가';return t}
function portfolio(){
 var cols={},head=(DATA['포트폴리오']||[[]])[0]||[];head.forEach(function(h,i){cols[String(h||'').trim()]=i});
 function ci(name,fallback){for(var k in cols){if(k.indexOf(name)===0)return cols[k]}return fallback}
 var iS=ci('구역',0),iC=ci('카드',1),iT=ci('LD',2),iK=ci('종류',3),iU=ci('이미지',4),iP=ci('캡션',5),iG=ci('태그',6),iO=ci('순서',7),iZ=ci('확대',8),iD=ci('부연',9);
 var groups=[],map={},ytCards={};
 rowsOf('포트폴리오').forEach(function(r){if(/유튜브|youtube|영상/i.test(String(r[iK]||''))&&r[iU])ytCards[canon(r[iS])+'|'+String(r[iC]||'').trim()]=1});
 rowsOf('포트폴리오').forEach(function(r,n){
  var sc=canon(r[iS]),card=String(r[iC]||'').trim(),url=r[iU];
  if(!sc||!url)return;
  var kd=String(r[iK]||'').trim(),kc=/유튜브|youtube|영상/i.test(kd)?'v':(/슬라이드/.test(kd)?'s':'i');
  var kg=(sc==='일러스트 포폴'||card==='판매 모델'||/넘기기|갤러리/.test(kd))?'g':(ytCards[sc+'|'+card]?'v':kc);
  var key=sc+'|'+card+'|'+kg;
  if(!map[key]){map[key]={sec:sc,raw:String(r[iS]||'').trim(),title:card,tier:String(r[iT]||'').trim(),kind:kd,items:[]};groups.push(map[key])}
  map[key].items.push({yt:kc==='v',desc:r[iD]==null?'':String(r[iD]),url:String(url).trim(),cap:r[iP]==null?'':String(r[iP]),tag:r[iG]==null?'':String(r[iG]),ord:num(r[iO])||(n+1),zoom:/^(o|y|1|확대)/i.test(String(r[iZ]||'').trim())})});
 var out={};
 groups.forEach(function(g){
  var h='';var o=out[g.sec]=out[g.sec]||{html:'',tier:null,label:g.raw};
  var k=g.kind;
  var gal2=/넘기기|갤러리/.test(k)||g.sec==='일러스트 포폴'||g.title==='판매 모델';
  if(gal2){h=galleryCard(g.title,g.items)}
  else if(/유튜브|youtube|영상/i.test(k)||g.items.some(function(i){return i.yt})){h=videoCard(g.title,g.items)}
  else if(/슬라이드/.test(k)){h=trackCard(g.title,g.items)}
  else{
   if(g.sec==='리깅 포폴'&&g.tier&&g.tier!==o.tier){o.html+=sub(g.tier);o.tier=g.tier}
   h=rowCard(g.title,g.items)}
  o.html+=h});
 return out}

function infoSec(cfg){
 var steps=[],notes=[],tip='';
 rowsOf('확인사항').forEach(function(r){var k=String(r[0]||'').trim();
  if(k==='작업 순서')steps.push(String(r[2]||r[1]||''));
  else if(k==='작업 순서 안내')tip=String(r[2]||r[1]||'');
  else if(k==='참고사항'){var tt=String(r[1]||'').trim(),cc=String(r[2]||'');notes.push([tt||(cc.length>16?cc.slice(0,16)+'…':cc),cc])}});
 var flow='<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">'+steps.map(function(s,i){var last=i===steps.length-1;return (i?'<span style="color:'+S+';">→</span>':'')+'<span style="'+(last?'background:'+B+';color:#fff;border:1px solid '+B+';':'background:#fff;border:1px solid '+S+';')+'border-radius:8px;padding:9px 14px;font-weight:700;font-size:14px;">'+esc(s)+'</span>'}).join('')+'</div>'+(tip?'<p style="color:'+ST+';font-size:13px;margin:12px 0 0;">'+esc(tip)+'</p>':'');
 var nh=notes.map(function(n){return '<details style="background:#fff;border:1px solid '+S+';border-radius:10px;margin-bottom:8px;"><summary style="cursor:pointer;padding:14px 16px;font-weight:700;list-style:none;display:flex;justify-content:space-between;">'+esc(n[0])+'<span style="color:'+B+';">+</span></summary><div style="padding:0 16px 16px;color:#555;font-size:14px;">'+esc(n[1])+'</div></details>'}).join('');
 return sec(cfg,'확인사항','<h3 style="font-size:16px;margin:0 0 12px;">작업 순서</h3>'+flow+'<h3 style="font-size:16px;margin:26px 0 12px;">참고사항</h3>'+nh,'sec-info')}

/* estimate */
var ROFF='display:flex;justify-content:space-between;align-items:center;gap:12px;background:#fff;border:1px solid '+S+';border-radius:10px;padding:13px 16px;margin-bottom:8px;cursor:pointer;font-weight:700;font-size:14px;';
var RON=ROFF.replace('background:#fff;border:1px solid '+S,'background:#eaf3fd;border:1px solid '+B);
var GRP={'일러':'ill','리깅':'rig','일러+리깅':'both','일러 + 리깅':'both','-':'none','':'none','공통':''};
function qhead(id,t){return '<p id="'+id+'" style="font-weight:800;font-size:15px;margin:26px 0 10px;color:'+BD+';border-left:4px solid '+B+';padding-left:10px;scroll-margin-top:12px;">'+esc(t)+'</p>'}
function baseLabel(n,p,g,chk){return '<label data-opt="base" data-price="'+p+'" data-grp="'+g+'" style="'+ROFF+'"><span>'+esc(n)+'</span><span style="display:flex;gap:10px;align-items:center;">'+won(p)+'<input type="radio" name="base"'+(chk?' checked':'')+' style="accent-color:'+B+';"></span></label>'}
function addLabel(n,p,g,kind){return '<label data-opt="'+kind+'" data-price="'+p+'" data-grp="'+g+'" style="'+ROFF+'"><span>'+esc(n)+'</span><span style="display:flex;gap:10px;align-items:center;">+'+won(p)+'<input type="checkbox" style="accent-color:'+B+';"></span></label>'}
function estSec(cfg){
 var base={'프리미엄':[],'일러':[],'리깅':[],'일러 + 리깅':[]},baseOrder=[],add={ill:[],rig:[],both:[]},oth=[],priv=false;
 rowsOf('견적').forEach(function(r){
  var k=String(r[0]||'').trim().replace(/\s+/g,' '),g=String(r[1]||'').trim(),n=String(r[2]||'').trim(),praw=String(r[3]==null?'':r[3]).trim();
  if(!n)return;
  if(k==='일러+리깅')k='일러 + 리깅';
  if(/비공개/.test(n)){priv=n;return}
  var p=num(praw);
  if(k==='추가옵션'){var gg=GRP[g];if(add[gg])add[gg].push([n,p])}
  else if(k==='기타옵션')oth.push([n,p]);
  else if(k){if(!base[k]){base[k]=[];baseOrder.push(k)}
   var gr=GRP[g];if(gr==null||gr==='')gr=(k==='일러'?'ill':k==='리깅'?'rig':k==='일러 + 리깅'?'both':'none');
   base[k].push([n,p,gr])}});
 var q='',first=true;
 var cats=['프리미엄','일러','리깅','일러 + 리깅'].concat(baseOrder).filter(function(c,i,arr){return base[c]&&base[c].length&&arr.indexOf(c)===i});
 var cid=function(i){return 'q-b'+i};
 cats.forEach(function(c,i){q+=qhead(cid(i),c);base[c].forEach(function(b){q+=baseLabel(b[0],b[1],b[2],first);first=false})});
 q+=qhead('q-add','추가옵션')+'<p id="addhint" style="color:'+ST+';font-size:13px;margin:0 0 8px;">기본 양식을 선택하면 해당 옵션이 표시됩니다.</p>';
 ['ill','rig','both'].forEach(function(g){q+='<div data-addgrp="'+g+'" style="display:none;">'+add[g].map(function(a){return addLabel(a[0],a[1],g,'add')}).join('')+'</div>'});
 q+='<p style="font-weight:800;font-size:14px;margin:18px 0 10px;color:#444;">기타 옵션</p>'+oth.map(function(a){return addLabel(a[0],a[1],'','other')}).join('');
 if(priv)q+='<label id="priv" style="'+ROFF+'"><span>'+esc(priv)+'</span><input type="checkbox" style="accent-color:'+B+';"></label>';
 var toc=cats.map(function(c,i){return [cid(i),c]}).concat([['q-add','추가옵션']]).map(function(t){return '<a href="#'+t[0]+'" data-go="'+t[0]+'" style="display:inline-block;border:1px solid '+S+';background:#fff;color:'+BD+';border-radius:99px;padding:7px 16px;font-size:13px;font-weight:700;text-decoration:none;">'+t[1]+'</a>'}).join('');
 var INP='width:100%;box-sizing:border-box;border:1px solid '+S+';border-radius:8px;padding:11px 12px;font:inherit;font-size:14px;background:#fff;';
 var fields=rowsOf('신청양식').filter(function(r){return r[0]}).map(function(r,i){var l=String(r[0]),ph=String(r[1]||''),area=/참고/.test(l);
  return '<label style="display:block;margin-bottom:12px;"><span style="display:block;font-weight:700;font-size:13px;margin-bottom:5px;color:#444;">'+esc(l)+'</span>'+(area?'<textarea data-f="'+i+'" data-l="'+esc(l)+'" rows="3" placeholder="'+esc(ph)+'" style="'+INP+'resize:vertical;"></textarea>':'<input data-f="'+i+'" data-l="'+esc(l)+'" type="text" placeholder="'+esc(ph)+'" style="'+INP+'">')+'</label>'}).join('');
 var form='<div style="margin-top:34px;padding-top:6px;"><p style="font-weight:800;font-size:15px;margin:0 0 12px;color:'+BD+';border-left:4px solid '+B+';padding-left:10px;">신청 양식</p>'+fields+
  '<div style="display:flex;justify-content:space-between;align-items:center;background:'+B+';color:#fff;border-radius:10px;padding:18px 16px;margin-top:14px;"><span>예상 견적</span><b id="total" style="font-size:22px;">0원</b></div>'+
  '<p style="font-weight:700;font-size:13px;margin:16px 0 6px;color:#444;">복사될 내용 (견적 + 신청 양식)</p><textarea id="out" readonly rows="14" style="'+INP+'background:'+SL+';resize:vertical;line-height:1.55;"></textarea>'+
  '<button type="button" id="copy" style="margin-top:10px;width:100%;border:0;background:'+BD+';color:#fff;border-radius:10px;padding:15px;font-size:15px;font-weight:800;cursor:pointer;">전체 복사하기</button>'+
  (cfg['협업 작가님 할인']?'<p style="color:'+ST+';font-size:12px;margin:10px 0 0;">복사한 내용을 문의 시 그대로 붙여넣어 주세요. '+esc(cfg['협업 작가님 할인'])+'</p>':'')+'</div>';
 return sec(cfg,'신청 · 견적','<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;" id="toc">'+toc+'</div>'+q+form,'est')}

function heroHtml(cfg){
 var tx=(cfg['상단 흐르는 글자']||'').replace(/\s*•\s*/g,' &nbsp;•&nbsp; ');var rep='';for(var i=0;i<6;i++)rep+=tx+' &nbsp;&nbsp; ';
 var marq='<style>@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}</style><div style="overflow:hidden;background:#fff;border-bottom:1px solid '+S+';"><div style="display:flex;width:max-content;animation:mq 28s linear infinite;font-size:12px;font-weight:800;letter-spacing:2px;color:'+B+';padding:9px 0;white-space:nowrap;"><span>'+rep+'</span><span>'+rep+'</span></div></div>';
 return marq+'<section style="padding:22px 16px 6px;"><div style="max-width:960px;margin:0 auto;background:linear-gradient(135deg,'+BD+','+B+');color:#fff;border:1.5px solid '+S+';border-radius:28px;padding:48px 28px 52px;position:relative;overflow:hidden;box-shadow:0 10px 30px rgba(63,109,181,.18);"><i style="position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;background:rgba(183,213,241,.40);"></i><i style="position:absolute;left:-40px;bottom:-80px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.10);"></i><span style="position:relative;display:inline-block;border:1px solid '+S+';color:'+S+';padding:4px 12px;font-size:14px;font-weight:700;margin-bottom:20px;border-radius:99px;">'+esc(cfg['배너 라벨']||'')+'</span><h1 style="position:relative;font-size:34px;line-height:1.25;font-weight:800;margin:0 0 14px;color:#fff;">'+esc(cfg['배너 제목']||'')+'</h1><p style="position:relative;color:#e3effc;margin:0 0 22px;font-size:15px;">'+esc(cfg['배너 소개 1줄']||'')+'<br>'+esc(cfg['배너 소개 2줄']||'')+'</p><a href="#est" data-go="est" style="position:relative;display:inline-block;background:'+S+';color:#111;border-radius:99px;padding:12px 24px;font-weight:700;text-decoration:none;font-size:14px;">'+esc(cfg['배너 버튼']||'')+'</a></div></section>'}

function render(){
 var cfg=settings(),pf=portfolio();
 var html=heroHtml(cfg)+slotsSec(cfg)+procSec(cfg)+
  sec(cfg,'리깅 포폴',(pf['리깅 포폴']||{html:''}).html,'sec-rig',(pf['리깅 포폴']||{}).label)+
  sec(cfg,'일러스트 포폴',(pf['일러스트 포폴']||{html:''}).html,'sec-ill',(pf['일러스트 포폴']||{}).label)+
  infoSec(cfg)+estSec(cfg)+
  sec(cfg,'협업작가',(pf['협업작가']||{html:''}).html,'sec-collab',(pf['협업작가']||{}).label);
 $('#app').innerHTML=html;
 bind();
}

/* ---------- behaviours ---------- */
function bind(){
 $$('[data-go]').forEach(function(a){a.onclick=function(e){e.preventDefault();var t=document.getElementById(a.dataset.go);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}});
$$('[data-gal2]').forEach(function(c){var d=JSON.parse(c.dataset.gal2),n=0,st=$('[data-stage]',c);
  function show(i){n=(i+d.length)%d.length;var it=d[n];
   if(it.t==='y')st.innerHTML='<div style="position:relative;width:100%;padding-top:56.25%;border-radius:12px;overflow:hidden;background:#000;"><iframe src="https://www.youtube.com/embed/'+esc(it.u)+'?rel=0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe></div>';
   else st.innerHTML='<img data-lb src="'+esc(it.u)+'" alt="" style="max-width:100%;max-height:clamp(240px,58vw,520px);object-fit:contain;cursor:zoom-in;border-radius:8px;">';
   $('[data-cnt]',c).textContent=(n+1)+' / '+d.length;$('[data-cap]',c).textContent=it.c;
   $('[data-desc]',c).innerHTML=it.d.map(function(x){return '<div style="background:#fff;border:1px solid '+S+';border-radius:14px;padding:14px 12px;text-align:center;font-size:14px;font-weight:700;color:#7a1f2b;line-height:1.5;">'+esc(x)+'</div>'}).join('');
   $$('[data-th]',c).forEach(function(x,k){x.style.opacity=k===n?1:.55;x.style.borderColor=k===n?B:'transparent'});sendH()}
  var p=$('[data-prev]',c),nx=$('[data-next]',c);if(p)p.onclick=function(){show(n-1)};if(nx)nx.onclick=function(){show(n+1)};
  $$('[data-th]',c).forEach(function(x,k){x.onclick=function(){show(k)}});
  show(0)});
 $$('[data-car]').forEach(function(c){var d=JSON.parse(c.dataset.car),n=0,f=$('[data-vstage]',c);
  function go(i){n=(i+d.length)%d.length;if(d[n][2]==='y')f.innerHTML='<iframe src="https://www.youtube.com/embed/'+esc(d[n][1])+'?rel=0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe>';else f.innerHTML='<img data-lb src="'+esc(d[n][1])+'" alt="" style="max-width:100%;max-height:100%;object-fit:contain;cursor:zoom-in;">';$('[data-cap]',c).textContent=d[n][0];
   $$('[data-dot]',c).forEach(function(x,k){x.style.background=k===n?B:S;x.style.width=k===n?'22px':'8px'});
   $$('[data-th]',c).forEach(function(x,k){x.style.opacity=k===n?1:.6;x.style.borderColor=k===n?B:'transparent'})}
  $('[data-prev]',c).onclick=function(){go(n-1)};$('[data-next]',c).onclick=function(){go(n+1)};
  $$('[data-th],[data-dot]',c).forEach(function(x){x.onclick=function(){go(+(x.dataset.th||x.dataset.dot))}});
  go(0)});
 $$('[data-track]').forEach(function(t){var sc=$('[data-scroller]',t),bar=$('[data-bar]',t),orig=$$('[data-card]',sc),N=orig.length,GAP=16;
  if(!N)return;
  var pre=orig.map(function(c){return c.cloneNode(true)}),post=orig.map(function(c){return c.cloneNode(true)});
  pre.forEach(function(c){sc.insertBefore(c,sc.firstChild)});post.forEach(function(c){sc.appendChild(c)});
  var step=function(){return orig[0].offsetWidth+GAP},setW=function(){return N*step()},jumping=false,tm;
  function jump(d){jumping=true;sc.style.scrollSnapType='none';sc.style.scrollBehavior='auto';sc.scrollLeft+=d;sc.style.scrollBehavior='';requestAnimationFrame(function(){sc.style.scrollSnapType='x mandatory';jumping=false})}
  function upd(){var w=setW(),p=((sc.scrollLeft-w)%w+w)%w/w;bar.style.width=Math.max(12,100*(Math.round(p*N)%N+1)/N)+'%'}
  function fix(){if(jumping)return;var w=setW();if(sc.scrollLeft<w*0.5)jump(w);else if(sc.scrollLeft>w*1.5)jump(-w)}
  sc.onscroll=function(){upd();clearTimeout(tm);tm=setTimeout(fix,120)};
  $('[data-tp]',t).onclick=function(){sc.scrollBy({left:-step(),behavior:'smooth'})};
  $('[data-tn]',t).onclick=function(){sc.scrollBy({left:step(),behavior:'smooth'})};
  function init(){sc.style.scrollBehavior='auto';sc.scrollLeft=setW();sc.style.scrollBehavior='';upd()}
  init();window.addEventListener('load',init);window.addEventListener('resize',init)});
 $$('#est input, #est textarea').forEach(function(i){i.oninput=calc;i.onchange=calc});
 var cp=$('#copy');if(cp)cp.onclick=function(){var t=$('#out'),btn=this;t.select();
  var done=function(){btn.textContent='복사 완료!';setTimeout(function(){btn.textContent='전체 복사하기'},1800)};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t.value).then(done,function(){document.execCommand('copy');done()})}else{document.execCommand('copy');done()}};
 calc();
 sendH();
}
document.addEventListener('click',function(e){var im=e.target;if(!im||!im.matches||!im.matches('img[data-lb]'))return;
 var o=document.createElement('div');o.setAttribute('style','position:fixed;inset:0;z-index:9999;background:rgba(15,23,42,.88);display:flex;align-items:center;justify-content:center;padding:16px;cursor:zoom-out;');
 var x=document.createElement('img');x.src=im.src;x.setAttribute('style','max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;background:#fff;');o.appendChild(x);o.onclick=function(){document.body.removeChild(o)};document.body.appendChild(o)});
function nm(l){return l.querySelector('span').childNodes[0].textContent.trim()}
function calc(){
 if(!$('#total'))return;
 var g='',sum=0,lines=[];
 $$('[data-opt]').forEach(function(l){var c=$('input',l);l.setAttribute('style',c.checked?RON:ROFF)});
 var b=$('[data-opt="base"] input:checked');
 if(b){var l=b.parentNode.parentNode;g=l.dataset.grp;sum+=+l.dataset.price;lines.push('- 기본: '+nm(l)+' ('+won(+l.dataset.price)+')')}
 $$('[data-addgrp]').forEach(function(d){var on=d.dataset.addgrp===g;d.style.display=on?'block':'none';
  if(!on)$$('input',d).forEach(function(i){i.checked=false});
  else $$('[data-opt]',d).forEach(function(l){if($('input',l).checked){sum+=+l.dataset.price;lines.push('- 추가: '+nm(l)+' (+'+won(+l.dataset.price)+')')}})});
 $('#addhint').style.display=(g==='ill'||g==='rig'||g==='both')?'none':'block';
 $$('[data-opt="other"]').forEach(function(l){if($('input',l).checked){sum+=+l.dataset.price;lines.push('- 기타: '+nm(l)+' (+'+won(+l.dataset.price)+')')}});
 var pv=$('#priv input');if(pv&&pv.checked){sum*=2;lines.push('- 샘플 비공개 (가격 x2)')}
 $('#total').textContent=won(sum);
 var fl=$$('[data-f]').map(function(e){return '- '+e.dataset.l+': '+e.value.trim()}).join('\n');
 $('#out').value='[젠티 Live2D 신청]\n\n■ 신청 양식\n'+fl+'\n\n■ 견적\n'+(lines.length?lines.join('\n'):'- (선택 없음)')+'\n\n예상 견적: '+won(sum);
}
window.setSlots=function(d){if(Array.isArray(d))d={'슬롯':d};Object.keys(d).forEach(function(m){var row=$('[data-month="'+m+'"] [data-boxes]');if(!row)return;row.innerHTML='';d[m].forEach(function(st){if(BX[st])row.insertAdjacentHTML('beforeend',slotBox(st))})})};
function sendH(){try{parent.postMessage({action:'sync_height',payload:{value:document.documentElement.scrollHeight}},'*')}catch(e){}}
window.addEventListener('load',sendH);window.addEventListener('resize',sendH);
if(window.ResizeObserver){new ResizeObserver(sendH).observe(document.body)}else{setInterval(sendH,500)}

/* ---------- sheet loading (JSONP, 실패하면 내장 기본값 사용) ---------- */
function loadTab(name,cb){
 var fn='__gs_'+Math.random().toString(36).slice(2),done=false,s=document.createElement('script');
 function fin(rows){if(done)return;done=true;try{delete window[fn]}catch(e){window[fn]=undefined}if(s.parentNode)s.parentNode.removeChild(s);cb(rows)}
 window[fn]=function(r){
  try{if(!r||r.status==='error'||!r.table)return fin(null);
   var head=r.table.cols.map(function(c){return c.label||''});
   var rows=r.table.rows.map(function(row){return (row.c||[]).map(function(c){return c?(c.v==null?'':c.v):''})});
   fin([head].concat(rows))}catch(e){fin(null)}};
 s.onerror=function(){fin(null)};
 s.src='https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?headers=1&tqx=out:json;responseHandler:'+fn+'&sheet='+encodeURIComponent(name);
 document.head.appendChild(s);setTimeout(function(){fin(null)},8000)}
var DEF=JSON.parse(document.getElementById('def-data').textContent);
DATA=JSON.parse(JSON.stringify(DEF));
render();
var left=TABS.length;
TABS.forEach(function(t){loadTab(t,function(rows){
 if(rows&&rows.length>1){DATA[t]=rows}
 if(--left===0){render()}})});
})();
