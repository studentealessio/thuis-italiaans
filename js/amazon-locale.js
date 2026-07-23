/* amazon-locale.js — thuisitaliaans
 * Riscrive i link Amazon /dp/ verso il marketplace del visitatore.
 * Privacy: nessuna chiamata di rete, nessun cookie/localStorage, tutto nel browser.
 * Ordine dei segnali:
 *   1. data-paese sull'<html> (iniettato opzionalmente dal Worker Cloudflare via request.cf.country)
 *   2. fuso orario del browser (Intl) — locale, affidabile per i paesi europei
 *   3. regione della lingua del browser (es. nl-NL, en-GB)
 *   4. lingua "nuda" (nl, it, de, fr, es)
 * Se nessun segnale è conclusivo, i link restano come sono.
 * Nota: gli ASIN Kindle (B0...) sono identici su tutti i marketplace Amazon.
 */
(function () {
  "use strict";
  var MKT = { NL:"nl", IT:"it", DE:"de", AT:"de", CH:"de", FR:"fr", BE:"com.be",
              ES:"es", PT:"es", GB:"co.uk", UK:"co.uk", IE:"co.uk", US:"com",
              CA:"ca", AU:"com.au", JP:"co.jp" };
  var TZ = { "Europe/Amsterdam":"NL", "Europe/Rome":"IT", "Europe/Berlin":"DE",
             "Europe/Vienna":"AT", "Europe/Zurich":"CH", "Europe/Paris":"FR",
             "Europe/Brussels":"BE", "Europe/Madrid":"ES", "Europe/Lisbon":"PT",
             "Europe/London":"GB", "Europe/Dublin":"IE" };
  var LINGUA = { nl:"NL", it:"IT", de:"DE", fr:"FR", es:"ES", pt:"PT", ja:"JP" };

  function paese() {
    // 1) iniettato dal Worker (facoltativo)
    var p = document.documentElement.getAttribute("data-paese");
    if (p && MKT[p.toUpperCase()]) return p.toUpperCase();
    // 2) fuso orario
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && TZ[tz]) return TZ[tz];
    } catch (e) {}
    // 3) regione della lingua
    var lingue = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < lingue.length; i++) {
      var m = /^[a-zA-Z]{2,3}-([a-zA-Z]{2})\b/.exec(lingue[i]);
      if (m && MKT[m[1].toUpperCase()]) return m[1].toUpperCase();
    }
    // 4) lingua nuda
    for (var j = 0; j < lingue.length; j++) {
      var base = (lingue[j] || "").slice(0, 2).toLowerCase();
      if (LINGUA[base]) return LINGUA[base];
    }
    return null;
  }

  function applica() {
    var p = paese();
    if (!p || !MKT[p]) return;
    var dominio = "www.amazon." + MKT[p];
    var link = document.querySelectorAll('a[href*="amazon."][href*="/dp/"]');
    for (var i = 0; i < link.length; i++) {
      try {
        var u = new URL(link[i].href);
        if (u.hostname === dominio) continue;
        u.hostname = dominio;
        link[i].href = u.toString();
      } catch (e) {}
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applica);
  } else {
    applica();
  }
})();
