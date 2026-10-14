(() => {
  'use strict';
  const id = 'G-J70XQ6WJ61';
  const key = 'hc-telegram-analytics-v1';
  const panel = document.getElementById('analytics-choice');
  const status = document.getElementById('analytics-status');
  let allowed = false;
  let started = false;
  let preference;
  try { preference = JSON.parse(localStorage.getItem(key)); } catch (_) {}
  const valid = preference && Date.now() - preference.at < 180 * 86400000;
  function start() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('js', new Date());
    const clean = new URL(location.origin + location.pathname);
    const incoming = new URLSearchParams(location.search);
    const campaigns = {utm_source:['reddit','n8n','github','apify','google'],utm_medium:['community','referral','organic','cpc'],utm_campaign:['telegram_sheets_launch','telegram_sheets_search']};
    for (const [name, values] of Object.entries(campaigns)) {
      const value = incoming.get(name);
      if (values.includes(value)) clean.searchParams.set(name, value);
    }
    window.gtag('config', id, {page_location:clean.href,page_referrer:'',page_title:'Telegram to Google Sheets | Humming Cobalt',allow_google_signals:false,allow_ad_personalization_signals:false,cookie_prefix:'hc_tgs',cookie_domain:'none',cookie_path:'/telegram-to-google-sheets/',cookie_expires:15552000,cookie_update:false});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  function choose(value) {
    allowed = value;
    try { localStorage.setItem(key, JSON.stringify({allowed:value,at:Date.now()})); } catch (_) {}
    panel.hidden = true;
    status.textContent = value ? 'Analytics allowed.' : 'Analytics off.';
    if (value) start();
    else if (started) {
      window['ga-disable-' + id] = true;
      document.cookie.split(';').forEach(item => {
        const name = item.split('=')[0].trim();
        if (name.startsWith('hc_tgs')) document.cookie = name + '=; Max-Age=0; Path=/telegram-to-google-sheets/; SameSite=Lax; Secure';
      });
      location.reload();
    }
  }
  document.getElementById('analytics-accept').addEventListener('click', () => choose(true));
  document.getElementById('analytics-decline').addEventListener('click', () => choose(false));
  document.getElementById('analytics-settings').addEventListener('click', () => { panel.hidden = false; document.getElementById('analytics-decline').focus(); });
  function event(name, params = {}) { if (allowed && window.gtag) window.gtag('event', name, params); }
  document.querySelectorAll('a[download]').forEach(link => link.addEventListener('click', () => {
    const filename = link.getAttribute('href');
    if (['telegram-to-sheets-v1.0.0.zip','telegram-to-sheets.json'].includes(filename)) event('workflow_download', {file_format: filename.endsWith('.zip') ? 'zip' : 'json'});
  }));
  document.querySelectorAll('a[href="https://apify.com/humming_cobalt/telegram-channel-watch"]').forEach(link => link.addEventListener('click', () => event('apify_click')));
  document.querySelector('video').addEventListener('play', () => event('demo_start'), {once:true});
  if (valid) { allowed = preference.allowed === true; panel.hidden = true; status.textContent = allowed ? 'Analytics allowed.' : 'Analytics off.'; if (allowed) start(); }
  else panel.hidden = false;
})();
