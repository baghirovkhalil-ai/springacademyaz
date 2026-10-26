const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n,s=el.dataset.s||"";const st=performance.now();(function f(now){const t=Math.min(1,(now-st)/1400);el.textContent=Math.round(n*(1-Math.pow(1-t,3)))+s;if(t<1)requestAnimationFrame(f)})(st)});
const sd=document.getElementById("send");
if(sd)sd.onclick=()=>{const g=i=>document.getElementById(i).value;
const t="Salam! Mən "+g("nm")+". "+g("sb")+" ("+g("bl")+") üzrə nümunə dərsə yazılmaq istəyirəm. "+g("ms");
window.open("https://wa.me/994504517423?text="+encodeURIComponent(t),"_blank")};
(function(){const c=document.getElementById("cv"),x=c.getContext("2d");let W,H,P=[];
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(70,Math.round(W*H/20000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
function dr(){const col=getComputedStyle(document.documentElement).getPropertyValue("--cv").trim()||"120,160,255";x.clearRect(0,0,W,H);
for(const p of P){if(!rm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}
x.fillStyle="rgba("+col+",.7)";x.beginPath();x.arc(p.x,p.y,1.8,0,7);x.fill()}
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<130){x.strokeStyle="rgba("+col+","+(.28*(1-d/130))+")";x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
if(!rm)requestAnimationFrame(dr)}
addEventListener("resize",()=>{rs();if(rm)dr()});rs();dr()})();

/* teacher filter */
(function(){const fl=document.querySelectorAll(".fl");if(!fl.length)return;
const ap=f=>{fl.forEach(b=>b.setAttribute("aria-pressed",b.dataset.f===f));document.querySelectorAll(".tc").forEach(c=>{c.hidden=!(f==="hamisi"||c.dataset.s===f)})};
fl.forEach(b=>b.addEventListener("click",()=>{ap(b.dataset.f);history.replaceState(null,"","?f="+b.dataset.f)}));
const q=new URLSearchParams(location.search).get("f");
ap(q&&[...fl].some(b=>b.dataset.f===q)?q:"hamisi")})();

(function(){const m=document.getElementById("menu"),n=document.getElementById("nav");if(!m||!n)return;
m.addEventListener("click",()=>{const o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)});
n.addEventListener("click",e=>{if(e.target.closest("a")){n.classList.remove("open");m.setAttribute("aria-expanded","false")}})})();

/* quiz game */
(function(){const box=document.getElementById("quiz");if(!box)return;
const Q=[
{s:"Azərbaycan dili",c:"#ff4d5a",f:"az",q:"“Kitab” sözü nitqin hansı hissəsidir?",o:["Sifət","İsim","Fel","Zərf"],a:1,x:"“Nə?” sualına cavab verən, əşya bildirən sözlər isimdir."},
{s:"Riyaziyyat",c:"#3b7bff",f:"riy",q:"12 × 12 − 44 = ?",o:["88","96","100","108"],a:2,x:"12 × 12 = 144, 144 − 44 = 100."},
{s:"Kimya",c:"#34d399",f:"kim",q:"Havada ən çox hansı qaz var?",o:["Oksigen","Karbon qazı","Hidrogen","Azot"],a:3,x:"Havanın təxminən 78%-i azotdur, oksigen isə təxminən 21%."},
{s:"Fizika",c:"#a78bfa",f:"fiz",q:"İşığın vakuumda sürəti təxminən nə qədərdir?",o:["300 000 km/san","30 000 km/san","3 000 km/san","3 000 000 km/san"],a:0,x:"İşıq vakuumda saniyədə təxminən 300 000 km yol gedir."},
{s:"Coğrafiya",c:"#fb923c",f:"cog",q:"Yer kürəsinin ən böyük okeanı hansıdır?",o:["Atlantik","Hind","Şimal Buzlu","Sakit"],a:3,x:"Sakit okean Yer səthinin təxminən üçdə birini əhatə edir."},
{s:"İngilis dili",c:"#2dd4bf",f:"ing",q:"“Yesterday I ___ to school.” boşluğa hansı söz yazılmalıdır?",o:["go","went","gone","going"],a:1,x:"Yesterday keçmiş zaman bildirir; go feli düzgünsüz fel olub keçmişdə went olur."}];
const L="ABCD",WA="https://wa.me/994504517423?text=";let i,sc,res;
const $=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
function start(){box.innerHTML="";const w=$("div","qs");w.append($("span","qtag","MİNİ OYUN"),$("h3","","Biliyini yoxla"),$("p","","6 sual, hər fənndən biri. Düzgün cavab verdikcə yaşıl, səhv etdikcə qırmızı yanır. Hazırsan?"));
const b=$("button","btn","Oyuna başla →");b.onclick=()=>{i=0;sc=0;res=[];ask()};w.append(b);box.append(w)}
function dots(){const d=$("div","qdots");Q.forEach((_,k)=>d.append($("i",k<res.length?(res[k]?"ok":"no"):(k===i?"on":""))));d.append($("b","",(i+1)+" / "+Q.length));return d}
function ask(){const q=Q[i];box.innerHTML="";const w=$("div","qs");w.append(dots());const t=$("span","qtag",q.s);t.style.setProperty("--c",q.c);w.append(t,$("p","qq",q.q));
const o=$("div","qo");let done=false;
q.o.forEach((x,k)=>{const b=$("button","","<b>"+L[k]+"</b>"+x);b.onclick=()=>{if(done)return;done=true;const ok=k===q.a;if(ok)sc++;res.push(ok);
o.querySelectorAll("button").forEach((y,n)=>{y.disabled=true;if(n===q.a)y.classList.add("ok");else if(n===k)y.classList.add("no");else y.classList.add("dim")});
w.querySelector(".qdots").replaceWith(dots());
const e=$("div","qx","<b>"+(ok?"Düzdür! 🎉":"Düzgün cavab: "+L[q.a]+") "+q.o[q.a])+"</b>"+q.x);
const n=$("button","btn",i<Q.length-1?"Növbəti sual →":"Nəticəni gör →");n.onclick=()=>{i++;i<Q.length?ask():fin()};w.append(e,n)};o.append(b)});
w.append(o);box.append(w)}
function fin(){box.innerHTML="";const w=$("div","qres");
const r=$("div","qring",'<svg viewBox="0 0 160 160"><circle class="bg" cx="80" cy="80" r="70"/><circle class="fg" cx="80" cy="80" r="70"/></svg><span>'+sc+"/"+Q.length+"</span>");
const m=sc===6?["Əla nəticə!","Hər fənndən xəta etmədin. Səni nümunə dərsdə görmək istərdik."]:sc>=4?["Çox yaxşı!","Bilikli görünürsən. Zəif qalan mövzuları müəllimlə möhkəmləndirmək olar."]:sc>=2?["Pis deyil!","Yaxşı başlanğıcdır. Düzgün plan və müəllimlə nəticə sürətlə artar."]:["Hələ başlanğıcdır!","Narahat olma, məhz bunun üçün buradayıq. Birlikdə addım-addım irəliləyərik."];
const c=$("div","qs");c.append($("h3","",m[0]),$("p","",m[1]));
const bd=$("div","qbad");Q.forEach((q,k)=>bd.append($("span",res[k]?"ok":"no",(res[k]?"✓ ":"✗ ")+q.s)));c.append(bd);
const miss=Q.filter((q,k)=>!res[k]);const row=$("div","btns");row.style.margin="6px 0 0";
const txt="Salam! Spring Academy saytındakı mini oyunda "+sc+"/"+Q.length+" bal topladım. Nümunə dərsə yazılmaq istəyirəm.";
const a1=$("a","btn","Nümunə dərsə yaz →");a1.href=WA+encodeURIComponent(txt);a1.target="_blank";a1.rel="noopener";row.append(a1);
if(miss.length){const a2=$("a","btn o","Zəif fənn: "+miss[0].s);a2.href="muellimler.html?f="+miss[0].f;row.append(a2)}
const a3=$("button","btn o","Yenidən oyna");a3.onclick=start;row.append(a3);c.append(row);
w.append(r,c);box.append(w);requestAnimationFrame(()=>requestAnimationFrame(()=>{r.querySelector(".fg").style.strokeDashoffset=440*(1-sc/Q.length)}))}
start()})();
