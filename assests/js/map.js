/* COMPANY nesnesini (company.js) kullanır; Google Maps yönlendirmesi. */
(function(){
  if(!window.COMPANY){ console.warn('COMPANY tanımsız'); return; }
  const c = window.COMPANY;
  const list = document.getElementById('contactList');
  if(list){
    list.innerHTML = `
      <li>Telefon: <a id="contactCall" href="tel:${c.phone}">${c.phone}</a></li>
      <li>E-posta: <a id="contactMail" href="mailto:${c.email}">${c.email}</a></li>
      <li>Adres: ${c.address}</li>
      <li>Çalışma Saatleri: ${c.hours||'Hafta içi 09:00–18:00'}</li>`;
  }
  const {lat,lng,name,address} = c;
  if(typeof L !== 'undefined'){
    const map = L.map('map',{scrollWheelZoom:false}).setView([lat,lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19, attribution:'&copy; OpenStreetMap katkıda bulunanlar'}).addTo(map);
    const m = L.marker([lat,lng]).addTo(map);
    m.bindPopup(`<b>${name}</b><br>${address}`).openPopup();
  }
  // Hızlı aksiyon butonları
  const btnCall = document.getElementById('btnCall');
  const btnMail = document.getElementById('btnMail');
  const btnWa   = document.getElementById('btnWa');
  const btnMap  = document.getElementById('btnMap');
  if(btnCall) btnCall.href = `tel:${c.phone}`;
  if(btnMail) btnMail.href = `mailto:${c.email}`;
  if(btnWa)   btnWa.addEventListener('click', e=>{e.preventDefault();
    const mobile = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const base = mobile? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
    const phone = (c.phone||'').replace(/[^0-9]/g,'');
    const url = `${base}?phone=${phone}&text=${encodeURIComponent('Merhaba, bilgi ve teklif almak istiyorum.')}`;
    window.open(url,'_blank','noopener');
  });
  if(btnMap){
    const isAndroid = /Android/i.test(navigator.userAgent);
    const url = isAndroid
      ? `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(name)})`
      : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    btnMap.href = url;
    const mapsDeep = document.getElementById('mapsLink');
    if(mapsDeep) mapsDeep.href = url;
  }
})();