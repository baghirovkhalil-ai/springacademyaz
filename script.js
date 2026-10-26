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
(function(){const a=document.querySelector("nav a.on");if(a&&a.scrollIntoView&&a.parentElement.scrollWidth>a.parentElement.clientWidth){a.parentElement.scrollLeft=a.offsetLeft-20}})();
