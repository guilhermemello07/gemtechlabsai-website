// Language switcher for trilingual legal pages (EN/PT/ES)
(function () {
    var KEY = 'foodlens-lang';

    function switchLang(lang) {
        var content = document.getElementById('lang-' + lang);
        var btn = document.querySelector('.lang-btn[data-lang="' + lang + '"]');
        if (!content || !btn) return;
        document.querySelectorAll('.lang-content').forEach(function (el) { el.classList.remove('active'); });
        document.querySelectorAll('.lang-btn').forEach(function (el) { el.classList.remove('active'); });
        content.classList.add('active');
        btn.classList.add('active');
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
        try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode */ }
    }

    document.querySelectorAll('.lang-btn[data-lang]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            switchLang(btn.getAttribute('data-lang'));
        });
    });

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
    if (saved) { switchLang(saved); return; }

    var browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.indexOf('pt') === 0) switchLang('pt');
    else if (browserLang.indexOf('es') === 0) switchLang('es');
    else switchLang('en');
})();
