/* Nəticələr və sizdən gələnlər — yeni şəkil əlavə etmək üçün bu siyahıya bir sətir yaz:
   ["img/results/r30.jpg", "kateqoriya", "Başlıq", "Qısa təsvir"]   kateqoriya: imtahan | rey | teltif */
const RESULTS = [
  ["img/results/r29.jpg", "imtahan", "96.2 bal", "Azərbaycan dili · qapalı testlərdə 21/22, açıq testlərin hamısı düz"],
  ["img/results/r13.jpg", "imtahan", "100/5", "“Müəllimə, Azərbaycan dilindən 100/5 aldım”"],
  ["img/results/r02.jpg", "imtahan", "91.7 bal", "Azərbaycan dili (dövlət dili) imtahanı · Məmmədli S."],
  ["img/results/r10.jpg", "imtahan", "100 bal", "Azərbaycan dili KSQ-dən maksimum nəticə"],
  ["img/results/r05.jpg", "imtahan", "Qəbul imtahanı", "İmanova Günel · ana dili 85 bal"],
  ["img/results/r01.jpg", "imtahan", "78.3 bal", "Azərbaycan dili (dövlət dili) imtahanı · Talıbzadə A."],
  ["img/results/r03.jpg", "imtahan", "78.3 bal", "Azərbaycan dili (dövlət dili) imtahanı · Ağazadə İ."],
  ["img/results/r23.jpg", "imtahan", "19 düz · 1 aylıq hazırlıq", "Müəllim: “Bu tələbə ilə cəmi 1 ay dərs keçmişəm”"],
  ["img/results/r26.jpg", "imtahan", "Tarixdən 13 düz · 14 gün", "Müəllim: “Cəmi 14 gün dərs keçmişəm, 13 düzü çıxıb”"],
  ["img/results/r27.jpg", "imtahan", "Tarixdən 20 düz", "Açıq suallar daxil 20 düz cavab"],
  ["img/results/r22.jpg", "imtahan", "10 sualdan 8-i düz", "Ülkər · 9-cu sinif · diaqnostik qiymətləndirmə, 2 aylıq hazırlıq"],
  ["img/results/r07.jpg", "teltif", "2-ci yer", "Polad Sadayev · bilik yarışmasının təltifnaməsi"],
  ["img/results/r14.jpg", "teltif", "Ay sonu söz yarışmasının qalibi", "Zeynəb İbrahimova · Spring Academy sertifikatı"],
  ["img/results/r15.jpg", "teltif", "İki sertifikat", "Məryəm Muradlı · Spring Academy"],
  ["img/results/r19.jpg", "rey", "“35 yaşımda qəbul oldum”", "Günel xanım: “Həm övladlarımın, həm mənim uğurlu nəticələrimizi görürük”"],
  ["img/results/r25.jpg", "rey", "İstədiyi ixtisasa qəbul", "“Müəllim heyətiniz məni 1 ay yarıma arzuma çatdırdı”"],
  ["img/results/r04.jpg", "rey", "“Təkrardan afərin, 5 aldım”", "Sevinc · 5-ci sinif"],
  ["img/results/r09.jpg", "rey", "“Fənninizi sevdirdiz”", "Zeynəb · 9-cu sinif"],
  ["img/results/r08.jpg", "rey", "İngilis dili · Aytən müəllimə", "Valideyn: sıfırdan sinif əlaçısına qədər"],
  ["img/results/r11.jpg", "rey", "Riyaziyyat · Əsmər müəllimə", "Valideyn razılığı"],
  ["img/results/r06.jpg", "rey", "Tövsiyə ilə gələn ailələr", "Valideyn: “Uğurun fəallığını görüb nömrə istəyirlər”"],
  ["img/results/r12.jpg", "rey", "Tarix və coğrafiya", "Şagird: “Məhz sizi seçdim”"],
  ["img/results/r24.jpg", "rey", "“İngilis dilinə bağlandım”", "Ülkər · 9-cu sinif: “Evdə ingiliscə danışıram”"],
  ["img/results/r21.jpg", "rey", "“KSQ-lər 90-ın üstü olur”", "Valideyn · Bənövşə müəllimə"],
  ["img/results/r20.jpg", "rey", "3-4-cü siniflərdə yüksək bal", "Bənövşə müəllimə: sınaq və monitorinqlərdə yüksək nəticələr"],
  ["img/results/r18.jpg", "rey", "“Sinifdə riyaziyyatdan ən güclüsü”", "Zəhra · 8-ci sinif · valideyn"],
  ["img/results/r17.jpg", "rey", "“Axtardığım elə sizsiz”", "Ləman · 7-ci sinif · valideyn"],
  ["img/results/r16.jpg", "rey", "Dostunu da gətirdi", "Gülyaz · 7-ci sinif: “Sinif yoldaşım da keçmək istəyir”"],
  ["img/results/r28.jpg", "rey", "Aysun müəllimə", "Məlahət xanım: “Hər şey üçün çox təşəkkür edirəm”"]
];
(function () {
  const box = document.getElementById("rgal"); if (!box) return;
  const CAT = { all: "Hamısı", imtahan: "İmtahan nəticələri", rey: "Sizdən gələnlər", teltif: "Təltiflər" };
  const cnt = k => k === "all" ? RESULTS.length : RESULTS.filter(r => r[1] === k).length;
  const tabs = document.getElementById("rtabs");
  tabs.innerHTML = Object.keys(CAT).filter(k => cnt(k)).map((k, i) => `<button type="button" data-k="${k}" class="${i ? "" : "on"}">${CAT[k]} <span>${cnt(k)}</span></button>`).join("");
  box.innerHTML = RESULTS.map((r, i) => `<figure class="rit" data-k="${r[1]}" data-i="${i}"><img src="${r[0]}" alt="${r[2]} — ${r[3]}" loading="lazy"><figcaption><span class="rk rk-${r[1]}">${CAT[r[1]]}</span><b>${r[2]}</b><small>${r[3]}</small></figcaption></figure>`).join("");
  tabs.onclick = e => { const b = e.target.closest("button"); if (!b) return; tabs.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); box.querySelectorAll(".rit").forEach(f => f.style.display = b.dataset.k === "all" || f.dataset.k === b.dataset.k ? "" : "none") };
  // böyütmə pəncərəsi
  const lb = document.createElement("div"); lb.className = "rlb"; lb.innerHTML = `<button class="rx" aria-label="Bağla">×</button><button class="rp" aria-label="Əvvəlki">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="rn" aria-label="Növbəti">›</button>`; document.body.appendChild(lb);
  let cur = 0; const vis = () => [...box.querySelectorAll(".rit")].filter(f => f.style.display !== "none").map(f => +f.dataset.i);
  const show = i => { cur = i; const r = RESULTS[i]; lb.querySelector("img").src = r[0]; lb.querySelector("img").alt = r[2]; lb.querySelector("figcaption").innerHTML = `<b>${r[2]}</b> · ${r[3]}`; lb.classList.add("on"); document.body.style.overflow = "hidden" };
  const step = d => { const v = vis(); const p = v.indexOf(cur); show(v[(p + d + v.length) % v.length]) };
  const close = () => { lb.classList.remove("on"); document.body.style.overflow = "" };
  box.onclick = e => { const f = e.target.closest(".rit"); if (f) show(+f.dataset.i) };
  lb.onclick = e => { if (e.target.closest(".rp")) step(-1); else if (e.target.closest(".rn")) step(1); else if (e.target === lb || e.target.closest(".rx")) close() };
  addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1) });
  let sx = 0; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true }); lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1) });
})();
