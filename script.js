// script.js - handles typing effect, theme switching, scroll, menu toggle, mouse background
(function () {
  // Titles for typing
  const titles = ['Software Engineer', 'AI/ML Developer', 'Problem Solver', 'Tech Enthusiast'];
  let currentTitle = 0;
  let charIndex = 0;
  const typedEl = document.getElementById('typed');

  function typeLoop() {
    const text = titles[currentTitle];
    if (charIndex <= text.length) {
      typedEl.textContent = text.slice(0, charIndex) + (charIndex % 2 === 0 ? '|' : '');
      charIndex++;
      setTimeout(typeLoop, 90);
    } else {
      setTimeout(() => {
        currentTitle = (currentTitle + 1) % titles.length;
        charIndex = 0;
        typeLoop();
      }, 1600);
    }
  }
  typeLoop();

  // Theme handling
  const themes = {
    cyber: {
      bg: 'from-slate-900 via-purple-900 to-slate-900',
      cardBorder: 'border-purple-500/20',
      textFrom: 'from-purple-400',
      textTo: 'to-pink-400',
      accent: 'bg-purple-600'
    },
    ocean: {
      bg: 'from-blue-900 via-cyan-900 to-blue-900',
      cardBorder: 'border-cyan-500/20',
      textFrom: 'from-cyan-400',
      textTo: 'to-blue-400',
      accent: 'bg-cyan-600'
    },
    sunset: {
      bg: 'from-orange-900 via-red-900 to-pink-900',
      cardBorder: 'border-orange-500/20',
      textFrom: 'from-orange-400',
      textTo: 'to-pink-400',
      accent: 'bg-orange-600'
    }
  };

  let currentTheme = 'cyber';

  function applyTheme(themeName) {
    currentTheme = themeName;
    const root = document.getElementById('root');
    // replace bg classes
    root.className = root.className.replace(/\bfrom-[^\s]+(?:\svia-[^\s]+\sto-[^\s]+)?\b/g, '');
    root.classList.add('bg-gradient-to-br');
    const t = themes[themeName];
    root.classList.remove('from-slate-900','via-purple-900','to-slate-900','from-blue-900','via-cyan-900','to-blue-900','from-orange-900','via-red-900','to-pink-900');
    root.classList.add(...(' '+t.bg).trim().split(' '));
    // update heading gradients
    const headings = document.querySelectorAll('[class*=\"bg-clip-text\"]');
    headings.forEach(h => {
      h.classList.remove('from-purple-400','to-pink-400','from-cyan-400','to-blue-400','from-orange-400','to-pink-400');
      h.classList.add(t.textFrom, t.textTo);
    });
    // update accent buttons
    document.querySelectorAll('.bg-purple-600, .bg-cyan-600, .bg-orange-600').forEach(btn => {
      btn.classList.remove('bg-purple-600','bg-cyan-600','bg-orange-600');
      btn.classList.add(t.accent);
    });
    // update card borders
    document.querySelectorAll('[class*=\"border-\"]').forEach(el => {
      el.classList.remove('border-purple-500/20','border-cyan-500/20','border-orange-500/20');
      el.classList.add(t.cardBorder);
    });
  }

  // wire theme buttons
  document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  // apply initial theme
  applyTheme(currentTheme);

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Scroll-based nav active
  const sections = ['home','about','skills','projects','experience','contact'];
  const navButtons = document.querySelectorAll('[data-target]');
  function onScroll() {
    const scrolled = window.scrollY > 50;
    const nav = document.getElementById('nav');
    if (scrolled) {
      nav.classList.add('bg-slate-900/95','backdrop-blur-sm','shadow-lg');
    } else {
      nav.classList.remove('bg-slate-900/95','backdrop-blur-sm','shadow-lg');
    }

    sections.forEach(section => {
      const el = document.getElementById(section);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const btn = document.querySelector('[data-target=\"' + section + '\"]');
      if (rect.top <= 120 && rect.bottom >= 120) {
        btn && btn.classList.add('text-purple-400','font-semibold');
      } else {
        btn && btn.classList.remove('text-purple-400','font-semibold');
      }
    });

    // Scroll top button show/hide
    let scrollTopBtn = document.getElementById('scroll-top-btn');
    if (!scrollTopBtn) {
      scrollTopBtn = document.createElement('button');
      scrollTopBtn.id = 'scroll-top-btn';
      scrollTopBtn.className = 'fixed bottom-8 right-8 bg-purple-600 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-50 animate-bounce';
      scrollTopBtn.innerHTML = '<svg width=\"24\" height=\"24\"><use href=\"#icon-chevron\"></use></svg>';
      scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
      document.body.appendChild(scrollTopBtn);
    }
    if (window.scrollY > 500) scrollTopBtn.style.display = 'block'; else scrollTopBtn.style.display = 'none';
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // smooth scrolling for nav buttons
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-target');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
      // hide mobile menu
      if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    });
  });

  // scroll-down arrow
  const scrollDownBtn = document.getElementById('scroll-down');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const about = document.getElementById('about');
      about && about.scrollIntoView({behavior:'smooth'});
    });
  }

  // Mouse tracking for the blob
  const blob1 = document.getElementById('blob1');
  window.addEventListener('mousemove', (e) => {
    if (!blob1) return;
    const x = e.clientX - 192;
    const y = e.clientY - 192;
    blob1.style.left = (x) + 'px';
    blob1.style.top = (y) + 'px';
  });

  // initial small delay to ensure elements exist
  setTimeout(() => {
    onScroll();
  }, 300);

})();