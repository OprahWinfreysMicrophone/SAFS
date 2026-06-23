document.getElementById('year').textContent = new Date().getFullYear();

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.nav-toggle');
  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.add('hidden');
  }
});

/*
  BANNER - loads from a published Google Sheet (CSV)

  SETUP:
  1. Create a Google Sheet:
     A1: active   B1: message
     A2: TRUE     B2: Your announcement text
  2. File > Share > Publish to web > Sheet1 > CSV > Publish
  3. Copy the URL and paste it below
*/
const SHEET_URL = 'PASTE_YOUR_SHEET_CSV_URL_HERE';

async function loadBanner() {
  if (SHEET_URL.includes('PASTE_YOUR')) return;
  try {
    const res = await fetch(SHEET_URL);
    const csv = await res.text();
    const rows = csv.trim().split('\n').map(r => r.split(','));
    if (rows.length < 2) return;
    const active = rows[1][0]?.trim().toUpperCase();
    const message = rows[1].slice(1).join(',').trim().replace(/^"|"$/g, '');
    if (active === 'TRUE' && message) {
      document.getElementById('banner-text').textContent = message;
      document.getElementById('banner').classList.remove('hidden');
    }
  } catch (e) {}
}

loadBanner();
