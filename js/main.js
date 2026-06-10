// Reveal styles only apply when JS is available (no-JS users see everything)
document.documentElement.classList.add('js');

// ---- Navbar scroll state ----
var nav = document.getElementById('nav');
function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Mobile menu ----
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ---- Scroll reveal with sibling stagger ----
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(
            entry.target.parentElement.querySelectorAll(':scope > .reveal')
        );
        var i = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(i * 0.08, 0.4) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});
