(function(){
var nav=document.getElementById('nav'),mb=document.getElementById('menu');
if(mb)mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
var w=document.querySelectorAll('.watch');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.4});
  w.forEach(function(el){io.observe(el)});
}else{w.forEach(function(el){el.classList.add('in')})}
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
var fm=document.getElementById('reg');
if(fm)fm.addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(n){return fm.elements[n].value.trim()};
  var t='Salam! Mən '+g('ad')+'. '+g('sinif')+' üçün '+g('fenn')+' ('+g('bolme')+') üzrə nümunə dərsə yazılmaq istəyirəm.'+(g('qeyd')?' Qeyd: '+g('qeyd'):'');
  window.open('https://wa.me/994504517423?text='+encodeURIComponent(t),'_blank','noopener');
});
})();
