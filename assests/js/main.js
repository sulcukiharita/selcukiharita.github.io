/* COMPANY nesnesini (company.js) kullanır; WhatsApp ve bağlantılar. */
(function(){
  const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();
  const frame = document.getElementById('pageFrame');
  document.querySelectorAll('[data-page]').forEach(a=>{
    a.addEventListener('click',e=>{ e.preventDefault(); frame.src = a.getAttribute('data-page');
      document.getElementById('menuToggle')?.setAttribute('aria-expanded','false');
      document.querySelector('.menu')?.classList.remove('open');
    });
  });
  const toggle = document.getElementById('menuToggle');
  toggle?.addEventListener('click',()=>{
    const m = document.querySelector('.menu');
    const open = m.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open? 'true':'false');
    m.style.display = open ? 'flex' : '';
  });
  function isMobile(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}
  function waNumber(n){return (n||'').replace(/[^0-9]/g,'')}
  function openWhatsApp(phone){
    const mobile = isMobile();
    const base = mobile? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
    const url = `${base}?phone=${waNumber(phone)}&text=${encodeURIComponent('Merhaba, bilgi ve teklif almak istiyorum.')}`;
    window.open(url, '_blank','noopener');
  }
  document.querySelectorAll('.btn-wa').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault(); openWhatsApp((window.COMPANY||{}).phone)}));
  document.getElementById('waBtn')?.addEventListener('click', ()=> openWhatsApp((window.COMPANY||{}).phone));
})();