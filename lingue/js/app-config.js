/*
 * ============================================================
 *  Ti — Central App Store configuration
 * ============================================================
 *  ⚠️ WHEN THE APP GOES LIVE ON THE APP STORE:
 *      Change ONLY the APP_STORE_URL below.
 *      All 30+ language pages will pick it up automatically.
 * ============================================================
 */
(function () {
  'use strict';

  // 👉 CHANGE THIS ONE URL when the app is published
  const APP_STORE_URL = 'https://apps.apple.com/app/ti-tuffo-italiano/id0000000000';

  // Small "Download on the" line above "App Store" — localized
  const SMALL_LABELS = {
    en: 'Download on the',
    it: 'Scarica su',
    es: 'Descargar en',
    fr: "Télécharger sur l'",
    de: 'Laden im',
    pt: 'Baixar na',
    nl: 'Download in de',
    ro: 'Descarcă din',
    sq: 'Shkarko në',
    uk: 'Завантажити з',
    zh: '下载于',
    ar: 'حمّل من',
    fil: 'I-download sa',
    bn: 'ডাউনলোড করুন',
    ti: 'ኣውርድ ካብ'
  };

  const isAppLive = !APP_STORE_URL.includes('id0000000000');
  const lang = (document.documentElement.lang || 'en').split('-')[0];
  const small = SMALL_LABELS[lang] || SMALL_LABELS.en;

  document.querySelectorAll('[data-app-store]').forEach(el => {
    // set href
    el.href = APP_STORE_URL;

    // update the small localized label if the button has the .app-store-small span
    const smallEl = el.querySelector('.app-store-small');
    if (smallEl) smallEl.textContent = small;

    // if the app isn't live yet, gray the button and change target
    if (!isAppLive) {
      el.classList.add('app-store-coming-soon');
      el.setAttribute('aria-disabled', 'true');
      // Don't remove the button — keep the visual — but soften the click
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const msg = {
          en: 'Coming soon on the App Store.',
          it: 'Presto disponibile su App Store.',
          es: 'Disponible pronto en la App Store.',
          fr: "Bientôt disponible sur l'App Store.",
          de: 'Bald im App Store verfügbar.',
          pt: 'Em breve na App Store.',
          nl: 'Binnenkort in de App Store.',
          ro: 'În curând în App Store.',
          sq: 'Së shpejti në App Store.',
          uk: 'Незабаром в App Store.',
          zh: '即将在 App Store 上线。',
          ar: 'قريباً على متجر App Store.',
          fil: 'Malapit nang mailunsad sa App Store.',
          bn: 'শীঘ্রই App Store এ আসছে।',
          ti: 'ብቐረባ ኣብ App Store።'
        }[lang] || 'Coming soon on the App Store.';
        alert(msg);
      });
    }
  });
})();
