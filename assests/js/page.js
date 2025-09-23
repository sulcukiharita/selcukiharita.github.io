(() => {
const me = document.currentScript;
const txtPath = me?.getAttribute('data-text');
if(!txtPath) return;
fetch(txtPath).then(r=>r.text()).then(t=>{
const el = document.getElementById('content'); if(!el) return; el.innerText = t.trim();
}).catch(()=>{
const el = document.getElementById('content'); if(el) el.innerText = 'İçerik yüklenemedi.';
});
})();