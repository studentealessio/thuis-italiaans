/* ==========================================================================
   app-nav.js — Navigazione condivisa in 14 lingue per le pagine app-*.html
   Include: stringhe nav/footer e funzione applyAppNav(lang).
   Ogni pagina deve avere elementi con questi data-attribute:
     data-i18n-nav="chisono|app|supporto|privacy|termini"
     data-i18n-cta="scarica|scrivici"
     data-i18n-footer="copy|kvk"
   ========================================================================== */

window.APP_NAV_I18N = {
    "sq": {
        "chisono":"Për mua","app":"App-i Ti","supporto":"Mbështetja","privacy":"Privatësia","termini":"Kushtet",
        "cta_scarica":"Shkarko","cta_scrivici":"Na shkruaj",
        "footer_copy":"© 2026 Thuis Italiaans. Të gjitha të drejtat e rezervuara.",
        "footer_kvk":"Në përpunim pranë KvK"
    },
    "ar": {
        "chisono":"من أنا","app":"تطبيق Ti","supporto":"الدعم","privacy":"الخصوصية","termini":"الشروط",
        "cta_scarica":"تنزيل","cta_scrivici":"اكتب لنا",
        "footer_copy":"© 2026 Thuis Italiaans. جميع الحقوق محفوظة.",
        "footer_kvk":"قيد المعالجة لدى KvK"
    },
    "bn": {
        "chisono":"আমার সম্পর্কে","app":"Ti অ্যাপ","supporto":"সহায়তা","privacy":"গোপনীয়তা","termini":"শর্তাবলী",
        "cta_scarica":"ডাউনলোড","cta_scrivici":"আমাদের লিখুন",
        "footer_copy":"© 2026 Thuis Italiaans. সর্বস্বত্ব সংরক্ষিত।",
        "footer_kvk":"KvK-এ প্রক্রিয়াধীন"
    },
    "zh": {
        "chisono":"关于我","app":"Ti 应用","supporto":"支持","privacy":"隐私","termini":"条款",
        "cta_scarica":"下载","cta_scrivici":"联系我们",
        "footer_copy":"© 2026 Thuis Italiaans. 保留所有权利。",
        "footer_kvk":"KvK 处理中"
    },
    "de": {
        "chisono":"Über mich","app":"Die Ti-App","supporto":"Support","privacy":"Datenschutz","termini":"Nutzungsbedingungen",
        "cta_scarica":"Herunterladen","cta_scrivici":"Schreib uns",
        "footer_copy":"© 2026 Thuis Italiaans. Alle Rechte vorbehalten.",
        "footer_kvk":"In Bearbeitung bei der KvK"
    },
    "en": {
        "chisono":"About me","app":"The Ti app","supporto":"Support","privacy":"Privacy","termini":"Terms",
        "cta_scarica":"Download","cta_scrivici":"Write to us",
        "footer_copy":"© 2026 Thuis Italiaans. All rights reserved.",
        "footer_kvk":"Being processed at the KvK"
    },
    "es": {
        "chisono":"Sobre mí","app":"La app Ti","supporto":"Soporte","privacy":"Privacidad","termini":"Términos",
        "cta_scarica":"Descargar","cta_scrivici":"Escríbenos",
        "footer_copy":"© 2026 Thuis Italiaans. Todos los derechos reservados.",
        "footer_kvk":"En trámite ante la KvK"
    },
    "fr": {
        "chisono":"À propos","app":"L'app Ti","supporto":"Support","privacy":"Confidentialité","termini":"Conditions",
        "cta_scarica":"Télécharger","cta_scrivici":"Écris-nous",
        "footer_copy":"© 2026 Thuis Italiaans. Tous droits réservés.",
        "footer_kvk":"En cours de traitement auprès de la KvK"
    },
    "it": {
        "chisono":"Chi sono","app":"L'app Ti","supporto":"Supporto","privacy":"Privacy","termini":"Termini",
        "cta_scarica":"Scarica","cta_scrivici":"Scrivici",
        "footer_copy":"© 2026 Thuis Italiaans. Tutti i diritti riservati.",
        "footer_kvk":"In elaborazione presso la KvK"
    },
    "nl": {
        "chisono":"Over mij","app":"De Ti-app","supporto":"Support","privacy":"Privacy","termini":"Voorwaarden",
        "cta_scarica":"Download","cta_scrivici":"Schrijf ons",
        "footer_copy":"© 2026 Thuis Italiaans. Alle rechten voorbehouden.",
        "footer_kvk":"In behandeling bij de KvK"
    },
    "pt": {
        "chisono":"Sobre mim","app":"O app Ti","supporto":"Suporte","privacy":"Privacidade","termini":"Termos",
        "cta_scarica":"Baixar","cta_scrivici":"Escreva-nos",
        "footer_copy":"© 2026 Thuis Italiaans. Todos os direitos reservados.",
        "footer_kvk":"Em processamento junto à KvK"
    },
    "ro": {
        "chisono":"Despre mine","app":"Aplicația Ti","supporto":"Suport","privacy":"Confidențialitate","termini":"Termeni",
        "cta_scarica":"Descarcă","cta_scrivici":"Scrie-ne",
        "footer_copy":"© 2026 Thuis Italiaans. Toate drepturile rezervate.",
        "footer_kvk":"În procesare la KvK"
    },
    "tl": {
        "chisono":"Tungkol sa akin","app":"Ang Ti app","supporto":"Suporta","privacy":"Privacy","termini":"Mga Tuntunin",
        "cta_scarica":"I-download","cta_scrivici":"Sumulat sa amin",
        "footer_copy":"© 2026 Thuis Italiaans. Lahat ng karapatan ay nakalaan.",
        "footer_kvk":"Pinoproseso sa KvK"
    },
    "ti": {
        "chisono":"ብዛዕባይ","app":"Ti መተግበሪ","supporto":"ደገፍ","privacy":"ግላዊነት","termini":"ውዕላት",
        "cta_scarica":"ኣውርድ","cta_scrivici":"ጽሓፉልና",
        "footer_copy":"© 2026 Thuis Italiaans. ኩሉ መሰላት ዝተሓለወ።",
        "footer_kvk":"ኣብ KvK ይካየድ ኣሎ"
    },
    "uk": {
        "chisono":"Про мене","app":"Застосунок Ti","supporto":"Підтримка","privacy":"Конфіденційність","termini":"Умови",
        "cta_scarica":"Завантажити","cta_scrivici":"Напишіть нам",
        "footer_copy":"© 2026 Thuis Italiaans. Усі права захищені.",
        "footer_kvk":"На реєстрації в KvK"
    }
};

/* Applica le stringhe nav/footer alla lingua indicata */
window.applyAppNav = function(lang){
    var pack = window.APP_NAV_I18N[lang] || window.APP_NAV_I18N["it"];
    document.querySelectorAll("[data-i18n-nav]").forEach(function(el){
        var k = el.getAttribute("data-i18n-nav");
        if(pack[k]) el.textContent = pack[k];
    });
    document.querySelectorAll("[data-i18n-cta]").forEach(function(el){
        var k = "cta_" + el.getAttribute("data-i18n-cta");
        if(pack[k]) el.textContent = pack[k];
    });
    document.querySelectorAll("[data-i18n-footer]").forEach(function(el){
        var k = "footer_" + el.getAttribute("data-i18n-footer");
        if(pack[k]) el.textContent = pack[k];
    });
};
