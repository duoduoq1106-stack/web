/**
 * Yan Qian Portfolio — main.js
 * Preloader + GSAP reveals + clip-path inspired photo morph
 */

(function () {
  gsap.registerPlugin(ScrollTrigger);

  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('done');
      // Intro entrance
      gsap.from('.intro__eyebrow, .intro__name, .intro__tagline, .intro__meta, .intro__bio, .intro__cta', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.15
      });
      gsap.from('.intro__photo-wrap', {
        scale: 0.92,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.25
      });
    }, 1500);
  });

  // Nav scroll state
  const nav = document.querySelector('.nav');
  const intro = document.querySelector('.intro');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // Clip-path morph trigger (FullscreenClipEffect inspiration)
    if (window.scrollY > 120) {
      intro.classList.add('scrolled');
    } else {
      intro.classList.remove('scrolled');
    }
  });

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      if (!open) {
        Object.assign(links.style, {
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          flexDirection: 'column',
          background: 'rgba(250,250,250,0.98)',
          padding: '1.5rem',
          gap: '1rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        });
      }
    });
  }

  // Section reveals
  document.querySelectorAll('.section').forEach((section) => {
    const header = section.querySelector('.section__header');
    const items = section.querySelectorAll(
      '.edu-card, .exp-card, .project-card, .skill-group, .contact__content'
    );

    if (header) {
      gsap.from(header, {
        scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none none' },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    }
    if (items.length) {
      gsap.from(items, {
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }
  });

  // Smooth anchor offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        if (window.innerWidth <= 768 && links) links.style.display = 'none';
      }
    });
  });
})();
