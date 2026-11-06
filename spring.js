/* Spring Academy — qiymətlər, qeydiyyat, vakansiya, sınaqlar.
   Qiymət və ya yer vəziyyəti dəyişəndə yalnız PRICES hissəsini dəyiş: bütün səhifələr özü yenilənir.
   p: aylıq qrup qiyməti (AZN) · full: yerlər dolub · solo: yalnız fərdi yer (qiymət) */
const WA_NUM = "994504517423";
const PRICES = {
  az: { name: "Azərbaycan bölməsi", group: 15,
    subjects: [["Azərbaycan dili", { p: 15 }], ["Riyaziyyat", { p: 15 }], ["İngilis dili", { p: 15 }], ["Rus dili", { p: 15 }], ["Kimya", { p: 15 }], ["Biologiya", { p: 15 }], ["Coğrafiya", { p: 15 }], ["Tarix", { p: 15 }], ["Ədəbiyyat", { p: 15 }], ["İnformatika", { p: 15 }], ["Fizika", { p: 15 }]],
    solo: [["Fərdi · həftədə 2 dəfə", 38, "aylıq 8 dərs"], ["Fərdi · həftədə 3 dəfə", 45, "aylıq 12 dərs"]] },
  ru: { name: "Rus bölməsi", group: 20,
    subjects: [["Azərbaycan dili", { p: 20 }], ["Riyaziyyat", { full: 1 }], ["Rus dili", { p: 20 }], ["İngilis dili", { full: 1 }], ["Kimya", { full: 1 }], ["Fizika", { p: 20 }], ["Biologiya", { full: 1 }], ["Coğrafiya", { full: 1 }], ["Tarix", { solo: 45 }], ["Ədəbiyyat", { full: 1 }], ["İnformatika", { full: 1 }]],
    solo: [["Fərdi · həftədə 2 dəfə", 45, "aylıq 8 dərs"]] }
};
const GRADES = ["Məktəbəqədər", "1-ci sinif", "2-ci sinif", "3-cü sinif", "4-cü sinif", "5-ci sinif", "6-cı sinif", "7-ci sinif", "8-ci sinif", "9-cu sinif", "10-cu sinif", "11-ci sinif", "Abituriyent"];
const wa = t => window.open("https://wa.me/" + WA_NUM + "?text=" + encodeURIComponent(t), "_blank", "noopener");
const esc2 = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- 1. Qiymətlər ---------- */
(function () {
  const box = document.getElementById("pricing"); if (!box) return;
  const card = (k) => { const S = PRICES[k];
    return `<div class="pcol rv"><div class="phd"><span class="eb">${S.name}</span><div class="pbig">${S.group} <small>AZN / aylıq</small></div><p>Qrup dərsi · hər fənn üzrə</p></div>
      <ul class="plist">${S.subjects.map(([n, o]) => `<li class="${o.full ? "full" : ""}"><span>${n}</span>${o.full ? `<em class="bad">Yerlər dolub</em>` : o.solo ? `<em class="solo">Yalnız fərdi · ${o.solo} AZN</em>` : `<b>${o.p} AZN</b>`}</li>`).join("")}</ul>
      <div class="psolo">${S.solo.map(([n, p, d]) => `<div><span>${n}<small>${d}</small></span><b>${p} AZN</b></div>`).join("")}</div></div>` };
  box.innerHTML = `<div class="pgrid">${card("az")}${card("ru")}</div>
    <div class="pnote rv"><div><b>👥 4–5 şagird</b><span>Qrupda bundan artıq şagird olmur</span></div><div><b>📅 Həftədə 2 dəfə</b><span>Aylıq 8 dərs</span></div><div><b>⏱ 1 saat və ya 70 dəqiqə</b><span>Bir dərsin müddəti</span></div><div><b>💻 Yalnız onlayn</b><span>Əyani dərs keçirilmir</span></div></div>`;
})();

/* ---------- 2. Qeydiyyat (bir evdən bir neçə şagird) ---------- */
(function () {
  const box = document.getElementById("regform"); if (!box) return;
  let sec = "az", fmt = "qrup"; const chosen = new Set();
  const gopts = `<option value="">Sinif seçin</option>` + GRADES.map(g => `<option>${g}</option>`).join("");
  const stuRow = i => `<div class="srow" data-i="${i}"><input class="sn" placeholder="Şagirdin adı və soyadı" maxlength="60" autocomplete="off"><select class="sg" aria-label="Sinif">${gopts}</select>${i ? `<button type="button" class="sdel" aria-label="Şagirdi sil">×</button>` : ""}</div>`;
  box.innerHTML = `<div class="card regc rv">
    <div class="rstep"><b>1</b>Bölmə</div><div class="seg2" id="rsec"><button type="button" data-v="az" class="on">Azərbaycan bölməsi</button><button type="button" data-v="ru">Rus bölməsi</button></div>
    <div class="rstep"><b>2</b>Dərs formatı</div><div class="seg2" id="rfmt"></div>
    <div class="rstep"><b>3</b>Fənlər <small>(bir neçəsini seçə bilərsiniz)</small></div><div class="rchips" id="rsub"></div>
    <div class="rstep"><b>4</b>Şagirdlər <small>(bir evdən bir neçə şagird yazıla bilər)</small></div><div id="rstu">${stuRow(0)}</div>
    <button type="button" class="addst" id="radd">+ Daha bir şagird əlavə et</button>
    <div class="rsum"><span>Təxmini aylıq ödəniş</span><b id="rtot">0 AZN</b></div>
    <button type="button" class="btn rsend" id="rgo">WhatsApp-da qeydiyyatdan keç →</button>
    <p class="rhint" id="rerr" role="alert"></p></div>`;
  const $q = s => box.querySelector(s);
  const subjOk = o => !o.full && (fmt !== "qrup" || !o.solo);
  function drawFmt() { const S = PRICES[sec]; const opts = [["qrup", `Qrup · ${S.group} AZN`]].concat(S.solo.map((s, i) => ["f" + i, `${s[0]} · ${s[1]} AZN`]));
    if (!opts.some(o => o[0] === fmt)) fmt = "qrup";
    $q("#rfmt").innerHTML = opts.map(([v, t]) => `<button type="button" data-v="${v}" class="${v === fmt ? "on" : ""}">${t}</button>`).join(""); }
  function drawSub() { const S = PRICES[sec];
    [...chosen].forEach(n => { const o = S.subjects.find(x => x[0] === n); if (!o || !subjOk(o[1])) chosen.delete(n) });
    $q("#rsub").innerHTML = S.subjects.map(([n, o]) => { const ok = subjOk(o); return `<button type="button" data-n="${n}" class="${chosen.has(n) ? "on" : ""}" ${ok ? "" : "disabled"}>${n}${o.full ? " · dolub" : (o.solo && fmt === "qrup") ? " · yalnız fərdi" : ""}</button>` }).join(""); }
  function price() { const S = PRICES[sec]; const each = fmt === "qrup" ? S.group : S.solo[+fmt.slice(1)][1];
    const kids = Math.max(1, [...box.querySelectorAll(".sn")].filter(x => x.value.trim()).length); return each * chosen.size * kids; }
  function upd() { $q("#rtot").textContent = price() + " AZN" }
  function all() { drawFmt(); drawSub(); upd() }
  $q("#rsec").onclick = e => { const b = e.target.closest("button"); if (!b) return; sec = b.dataset.v; $q("#rsec").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); all() };
  $q("#rfmt").onclick = e => { const b = e.target.closest("button"); if (!b) return; fmt = b.dataset.v; all() };
  $q("#rsub").onclick = e => { const b = e.target.closest("button"); if (!b || b.disabled) return; const n = b.dataset.n; chosen.has(n) ? chosen.delete(n) : chosen.add(n); b.classList.toggle("on"); upd() };
  let n = 1; $q("#radd").onclick = () => { if ($q("#rstu").children.length >= 6) return; $q("#rstu").insertAdjacentHTML("beforeend", stuRow(n++)); $q("#rstu").lastElementChild.querySelector("input").focus() };
  $q("#rstu").addEventListener("click", e => { const d = e.target.closest(".sdel"); if (d) { d.parentElement.remove(); upd() } });
  $q("#rstu").addEventListener("input", upd);
  $q("#rgo").onclick = () => {
    const kids = [...box.querySelectorAll(".srow")].map(r => [r.querySelector(".sn").value.trim(), r.querySelector(".sg").value]).filter(k => k[0]);
    const err = $q("#rerr");
    if (!chosen.size) { err.textContent = "Ən azı bir fənn seçin."; return }
    if (!kids.length) { err.textContent = "Şagirdin adını və soyadını yazın."; box.querySelector(".sn").focus(); return }
    if (kids.some(k => !k[1])) { err.textContent = "Hər şagird üçün sinfi seçin."; return }
    err.textContent = "";
    const S = PRICES[sec], f = fmt === "qrup" ? `Qrup (${S.group} AZN)` : `${S.solo[+fmt.slice(1)][0]} (${S.solo[+fmt.slice(1)][1]} AZN)`;
    const t = `Salam! Spring Academy-də qeydiyyatdan keçmək istəyirəm.\n\nBölmə: ${S.name}\nFormat: ${f}\nFənlər: ${[...chosen].join(", ")}\nŞagird${kids.length > 1 ? "lər" : ""}:\n${kids.map((k, i) => `${i + 1}) ${k[0]} — ${k[1]}`).join("\n")}\n\nTəxmini aylıq: ${price()} AZN`;
    try { const C = window.SB || {}; if (C.url && C.key) fetch(C.url + "/rest/v1/leads", { method: "POST", headers: { apikey: C.key, Authorization: "Bearer " + C.key, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ name: kids.map(k => k[0]).join(", "), subject: [...chosen].join(", "), section: S.name, message: `${f}. ${kids.map(k => k[0] + " — " + k[1]).join("; ")}` }) }).catch(() => { }) } catch (e) { }
    wa(t);
  };
  all();
})();

/* ---------- 5. Müəllimlər üçün vakansiya ---------- */
(function () {
  const box = document.getElementById("vacform"); if (!box) return;
  const subs = PRICES.az.subjects.map(s => s[0]).concat(["Ibtidai siniflər", "Digər"]);
  const lv = ["İbtidai (1–4)", "5–8-ci siniflər", "9–11-ci siniflər", "Abituriyent", "Məktəbəqədər"];
  box.innerHTML = `<div class="card regc rv">
    <label class="vf">Ad, soyad<input id="vnm" maxlength="60" autocomplete="name"></label>
    <label class="vf">Fənn<select id="vsb"><option value="">Fənn seçin</option>${subs.map(s => `<option>${s.replace("Ibtidai", "İbtidai")}</option>`).join("")}</select></label>
    <div class="rstep" style="margin-top:6px">Hansı siniflər üçün tədris edirsiniz?</div><div class="rchips" id="vlv">${lv.map(l => `<button type="button" data-n="${l}">${l}</button>`).join("")}</div>
    <div class="rstep">Hansı bölmə üçün?</div><div class="seg2" id="vsec"><button type="button" data-v="Azərbaycan bölməsi" class="on">Azərbaycan</button><button type="button" data-v="Rus bölməsi">Rus</button><button type="button" data-v="Hər iki bölmə">Hər ikisi</button></div>
    <label class="vf">Təcrübə<select id="vex"><option value="">Seçin</option><option>2–3 il</option><option>4–5 il</option><option>6–10 il</option><option>10 ildən çox</option><option>2 ildən az</option></select></label>
    <div class="vdoc">📎 <span><b>Diplom və CV</b> WhatsApp-da bu mesajdan sonra göndərilir.</span></div>
    <button type="button" class="btn rsend" id="vgo">WhatsApp-da müraciət et →</button><p class="rhint" id="verr" role="alert"></p></div>`;
  const $q = s => box.querySelector(s); let vsec = "Azərbaycan bölməsi"; const lvs = new Set();
  $q("#vlv").onclick = e => { const b = e.target.closest("button"); if (!b) return; const n = b.dataset.n; lvs.has(n) ? lvs.delete(n) : lvs.add(n); b.classList.toggle("on") };
  $q("#vsec").onclick = e => { const b = e.target.closest("button"); if (!b) return; vsec = b.dataset.v; $q("#vsec").querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)) };
  $q("#vgo").onclick = () => { const nm = $q("#vnm").value.trim(), sb = $q("#vsb").value, ex = $q("#vex").value, er = $q("#verr");
    if (!nm || !sb || !lvs.size) { er.textContent = "Ad, fənn və sinifləri qeyd edin."; return } er.textContent = "";
    wa(`Salam! Spring Academy-də müəllim kimi çalışmaq istəyirəm.\n\nAd, soyad: ${nm}\nFənn: ${sb}\nSiniflər: ${[...lvs].join(", ")}\nBölmə: ${vsec}${ex ? `\nTəcrübə: ${ex}` : ""}\n\nDiplom və CV-ni bu mesajdan sonra göndərirəm.`) };
})();

/* ---------- 6. Sınaqlar ---------- */
(function () {
  const box = document.getElementById("exams"); if (!box) return;
  box.innerHTML = `<div class="egrid">${[1, 2, 3, 4, 5].map(i => `<div class="ecard rv"><span class="enum">${i}</span><b>${i}-ci qrup sınaqları</b><em>Hazırlanır</em></div>`).join("")}</div>
    <div class="band rv" style="margin-top:22px"><h2>Sınaq tapşırığını həll edə bilmədin?</h2><p>Yaz, həllini bizdən soruş: müəllimlərimiz izah edəcək.</p><div class="btns" style="justify-content:center"><button type="button" class="btn" id="eask">Həllini soruş →</button></div></div>`;
  box.querySelector("#eask").onclick = () => wa("Salam! Sınaq tapşırığının həllini soruşmaq istəyirəm.");
})();
