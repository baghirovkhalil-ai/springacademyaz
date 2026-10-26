(function(){const C=window.SB||{},U=C.url,K=C.key;if(!U||!K)return;
const H={apikey:K,Authorization:"Bearer "+K};
const g=p=>fetch(U+"/rest/v1/"+p,{headers:H}).then(r=>r.ok?r.json():[]).catch(()=>[]);
const $=s=>document.querySelector(s);
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
function body(box,text){(text||"").split(/\n{2,}/).forEach(b=>{b=b.trim();if(!b)return;if(b.startsWith("## "))box.append(el("h3","",b.slice(3)));else{const p=el("p","",b);p.style.whiteSpace="pre-line";box.append(p)}})}
const send=$("#send");if(send)send.addEventListener("click",()=>{const v=i=>document.getElementById(i).value.trim();if(!v("nm"))return;
fetch(U+"/rest/v1/leads",{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({name:v("nm"),subject:v("sb"),section:v("bl"),message:v("ms")})}).catch(()=>{})});
if($("#postgrid"))g("posts?published=eq.true&order=created_at.desc&select=id,title,category,excerpt").then(rows=>{const gr=$("#postgrid");rows.reverse().forEach(r=>{const a=el("a","card post in");a.href="post.html?id="+encodeURIComponent(r.id);a.style.setProperty("--c","var(--acc)");a.append(el("small","",r.category||"Yeni"),el("h3","",r.title),el("p","",r.excerpt||""),el("span","more","Oxu →"));gr.prepend(a)})});
if($("#subjgrid"))g("subjects?order=sort.asc&select=*").then(rows=>{if(!rows.length)return;const gr=$("#subjgrid");gr.textContent="";rows.forEach(r=>{const c=el("div","card in");c.append(el("span","ic",r.icon||"📘"),el("h3","",r.title),el("p","",r.description||""));gr.append(c)})});
if($("#p_az")||$("#p_ru"))g("settings?select=*").then(rows=>{const m={};rows.forEach(r=>m[r.key]=r.value);if(m.price_az&&$("#p_az"))$("#p_az").textContent=m.price_az+" AZN";if(m.price_ru&&$("#p_ru"))$("#p_ru").textContent=m.price_ru+" AZN"});
if($("#resgrid"))g("results?published=eq.true&order=created_at.desc&select=*").then(rows=>{const gr=$("#resgrid");rows.forEach(r=>{const c=el("div","card in");if(r.image_url&&r.image_url.startsWith("https://")){const i=el("img");i.src=r.image_url;i.alt=r.title;i.loading="lazy";i.style.cssText="width:100%;border-radius:10px;margin-bottom:12px";c.append(i)}
if(r.score){const s=el("span","num",r.score);c.append(s)}c.append(el("h3","",r.title),el("p","",r.text||""));gr.append(c)})});
if($("#art")){const id=new URLSearchParams(location.search).get("id")||"";g("posts?id=eq."+encodeURIComponent(id)+"&published=eq.true&select=*").then(rows=>{const a=$("#art"),r=rows[0];if(!r){a.querySelector("h1").textContent="Yazı tapılmadı";return}
document.title=r.title+" | Spring Academy";a.querySelector(".eb").textContent=r.category||"Bloq";a.querySelector("h1").textContent=r.title;body($("#abody"),r.body)})}
})();
