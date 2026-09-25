/* ── BANDEAU COOKIES CONFORME CNIL / CONSENT MODE V2 ── */
(function(){
  var CONSENT_KEY = 'bn_cookie_consent';
  var CONSENT_DAYS = 180; /* 6 mois */
  var GA_ID = 'G-F28Q9KXGM9';

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  function readConsent(){
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if(!raw) return null;
      var data = JSON.parse(raw);
      if(!data || !data.ts || !data.value) return null;
      if((Date.now() - data.ts) > CONSENT_DAYS * 24 * 60 * 60 * 1000) return null;
      return data.value;
    } catch(e){ return null; }
  }

  function writeConsent(value){
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ value: value, ts: Date.now() }));
    } catch(e){}
  }

  var gaLoaded = false;
  function loadGA(){
    if(gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function applyConsent(value){
    if(value === 'accepted'){
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted'
      });
      loadGA();
    } else {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    }
  }

  var styleInjected = false;
  function injectStyle(){
    if(styleInjected) return;
    styleInjected = true;
    var css = ''
      + '#bn-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:10000;background:#FFFFFF;border-top:1px solid #EDE9E0;'
      + 'box-shadow:0 -4px 28px rgba(27,107,90,.14);padding:18px 5%;font-family:"DM Sans",sans-serif;color:#1C2826;}'
      + '#bn-cookie-banner .bn-cookie-inner{max-width:1140px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:22px;flex-wrap:wrap;}'
      + '#bn-cookie-banner p{font-size:.85rem;line-height:1.6;color:#5A6E6A;margin:0;max-width:640px;flex:1 1 320px;}'
      + '#bn-cookie-banner a{color:#1B6B5A;text-decoration:underline;}'
      + '#bn-cookie-banner .bn-cookie-actions{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;}'
      + '#bn-cookie-banner button{font-family:"DM Sans",sans-serif;font-size:.85rem;font-weight:600;padding:11px 24px;border-radius:50px;cursor:pointer;border:1.5px solid #1B6B5A;transition:all .2s;}'
      + '#bn-cookie-banner .bn-refuse{background:#FFFFFF;color:#1B6B5A;}'
      + '#bn-cookie-banner .bn-refuse:hover{background:#F8F5EF;}'
      + '#bn-cookie-banner .bn-accept{background:#1B6B5A;color:#FFFFFF;}'
      + '#bn-cookie-banner .bn-accept:hover{background:#124a3f;}'
      + '@media (max-width:640px){#bn-cookie-banner .bn-cookie-actions{width:100%;}#bn-cookie-banner button{flex:1 1 0;}}';
    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  function removeBanner(){
    var el = document.getElementById('bn-cookie-banner');
    if(el && el.parentNode) el.parentNode.removeChild(el);
  }

  function showBanner(){
    injectStyle();
    removeBanner();
    var el = document.createElement('div');
    el.id = 'bn-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Gestion des cookies');
    el.innerHTML =
      '<div class="bn-cookie-inner">'
      + '<p>Ce site utilise des cookies de mesure d\'audience (Google Analytics) uniquement avec votre accord. Ils ne sont déposés qu\'après acceptation. <a href="/confidentialite#cookies">En savoir plus</a></p>'
      + '<div class="bn-cookie-actions">'
      + '<button type="button" class="bn-refuse" id="bn-cookie-refuse">Refuser</button>'
      + '<button type="button" class="bn-accept" id="bn-cookie-accept">Accepter</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(el);
    document.getElementById('bn-cookie-accept').addEventListener('click', function(){
      writeConsent('accepted');
      applyConsent('accepted');
      removeBanner();
    });
    document.getElementById('bn-cookie-refuse').addEventListener('click', function(){
      writeConsent('refused');
      applyConsent('refused');
      removeBanner();
    });
  }

  window.openCookiePrefs = function(e){
    if(e && e.preventDefault) e.preventDefault();
    showBanner();
  };

  function init(){
    var existing = readConsent();
    if(existing){
      applyConsent(existing);
    } else {
      showBanner();
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── CALENDLY : chargé uniquement au premier clic ── */
  var CALENDLY_URL = 'https://calendly.com/estellessex';
  var calendlyLoading = false;
  window.openCalendly = function(){
    if(typeof Calendly !== 'undefined' && Calendly.initPopupWidget){
      Calendly.initPopupWidget({ url: CALENDLY_URL });
      return false;
    }
    if(calendlyLoading) return false;
    calendlyLoading = true;
    var s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.onload = function(){
      calendlyLoading = false;
      if(typeof Calendly !== 'undefined' && Calendly.initPopupWidget){
        Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else {
        window.open(CALENDLY_URL, '_blank');
      }
    };
    s.onerror = function(){
      calendlyLoading = false;
      window.open(CALENDLY_URL, '_blank');
    };
    document.body.appendChild(s);
    return false;
  };
})();
