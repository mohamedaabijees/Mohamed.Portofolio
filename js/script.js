/**
 * Mohamed Portfolio — Premium Maroon Redesign
 * JS: Scroll progress, Navbar, Fade-up, Filters, Skill bars, Counters, Typing, Form
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = ((scrolled / total) * 100).toFixed(2) + '%';
  });

  /* ── Navbar scroll state ── */
  const navbar = document.getElementById('navbar-main');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 55);
  });

  /* ── Back to top ── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
    btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ── Smooth Scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navH + 10, behavior: 'smooth' });
      // Close mobile menu
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ── Intersection Observer (fade-up + skill bars + counters) ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  const ioFade = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => ioFade.observe(el));

  /* Skill bars animate when visible */
  const ioSkills = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        bar.style.width = bar.dataset.width || '0%';
        ioSkills.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => ioSkills.observe(bar));

  /* Animated counters */
  const ioCounters = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1600;
      const step = Math.ceil(duration / target);
      const timer = setInterval(() => {
        start += Math.ceil(target / (duration / 16));
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = start.toLocaleString() + suffix;
      }, 16);
      ioCounters.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => ioCounters.observe(el));

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  /* ── Typing effect for hero eyebrow ── */
  const typingEl = document.getElementById('typing-role');
  if (typingEl) {
    const roles = ['Software Engineer', 'AI Engineer', 'Network Engineer', 'Technical Solutions Architect'];
    let roleIdx = 0, charIdx = 0, deleting = false;
    function typeLoop() {
      const current = roles[roleIdx];
      if (!deleting) {
        typingEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
      } else {
        typingEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
      }
      setTimeout(typeLoop, deleting ? 50 : 75);
    }
    setTimeout(typeLoop, 800);
  }

  /* ── Project filter ── */
  const filterBtns = document.querySelectorAll('.btn-filter');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.project-item').forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        if (show) {
          item.style.display = '';
          requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = ''; });
        } else {
          item.style.opacity = '0'; item.style.transform = 'scale(0.92)';
          setTimeout(() => { if (filter !== 'all' && item.dataset.category !== filter) item.classList.add('hidden'); }, 300);
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-submit');
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...`;
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!`;
        btn.style.background = 'linear-gradient(135deg,#1a7a1a,#27ae60)';
        setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; this.reset(); }, 3000);
      }, 1500);
    });
  }

  /* ── Spin keyframe injection for loading icon ── */
  const styleTag = document.createElement('style');
  styleTag.textContent = `@keyframes spin-icon { to { transform: rotate(360deg); } } .spin-icon { animation: spin-icon .8s linear infinite; }`;
  document.head.appendChild(styleTag);

});
