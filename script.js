(function(){
var nav=document.getElementById('nav'),mb=document.getElementById('menu');
if(mb)mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});

/* subject bloom */
var fan=document.querySelector('.fan');
if(fan){
  var bloom=fan.closest('.bloom'),pets=fan.querySelectorAll('.pet'),panels=document.querySelectorAll('.panel');
  var pick=function(k,user){
    fan.classList.add('has-on');
    pets.forEach(function(p){var on=p.dataset.k===k;p.classList.toggle('on',on);p.setAttribute('aria-pressed',on)});
    panels.forEach(function(p){p.hidden=p.dataset.k!==k});
  };
  pets.forEach(function(p){
    p.addEventListener('click',function(){pick(p.dataset.k,true)});
    p.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover)').matches)pick(p.dataset.k)});
    p.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(p.dataset.k,true)}});
  });
  pick(pets[3].dataset.k);
  requestAnimationFrame(function(){bloom.classList.add('go')});
}

/* teacher filter */
var fl=document.querySelectorAll('.fl');
if(fl.length){
  var apply=function(f){
    fl.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.f===f)});
    document.querySelectorAll('.tc').forEach(function(c){c.hidden=!(f==='hamisi'||c.dataset.s===f)});
  };
  fl.forEach(function(b){b.addEventListener('click',function(){apply(b.dataset.f);history.replaceState(null,'','?f='+b.dataset.f)})});
  var q=new URLSearchParams(location.search).get('f');
  apply(q&&Array.prototype.some.call(fl,function(b){return b.dataset.f===q})?q:'hamisi');
}

/* registration -> WhatsApp */
var fm=document.getElementById('reg');
if(fm)fm.addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(n){return fm.elements[n].value.trim()};
  var t='Salam! Mən '+g('ad')+'. '+g('sinif')+' üçün '+g('fenn')+' ('+g('bolme')+') üzrə nümunə dərsə yazılmaq istəyirəm.'+(g('qeyd')?' Qeyd: '+g('qeyd'):'');
  window.open('https://wa.me/994504517423?text='+encodeURIComponent(t),'_blank','noopener');
});
})();
