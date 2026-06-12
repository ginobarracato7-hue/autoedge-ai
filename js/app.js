'use strict';

/* ── Lenis smooth scroll ── */
const lenis = new Lenis({
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Nav: becomes opaque on scroll ── */
const nav = document.getElementById('nav');
ScrollTrigger.create({
  start: 'top+=80 top',
  onEnter:    () => nav.classList.add('scrolled'),
  onLeaveBack:() => nav.classList.remove('scrolled')
});

/* ── Hero text reveal on load ── */
gsap.timeline({ delay: 0.2 })
  .to('.hero-text .reveal', {
    opacity: 1, y: 0,
    stagger: 0.14, duration: 0.85,
    ease: 'power3.out'
  })
  .to('.hero-visual.reveal', {
    opacity: 1, y: 0,
    duration: 0.9, ease: 'power3.out'
  }, '-=0.4');

/* ── Scroll-triggered fade-up for all sections ── */
document.querySelectorAll('.fade-up').forEach(el => {
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    onEnter: () => el.classList.add('in'),
    onLeaveBack: () => el.classList.remove('in')
  });
});

/* ── Section headers animate in ── */
document.querySelectorAll('.section-header').forEach(el => {
  gsap.from(el.children, {
    y: 30, opacity: 0,
    stagger: 0.1, duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%'
    }
  });
});

/* ── System cards: slide up as a group ── */
gsap.from('.system-card', {
  y: 28, opacity: 0,
  stagger: 0.07, duration: 0.65,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.systems-grid',
    start: 'top 85%'
  }
});

/* ── Pricing cards: scale up as a group ── */
gsap.from('.pkg-card', {
  y: 24, opacity: 0,
  stagger: 0.1, duration: 0.7,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing-grid',
    start: 'top 85%'
  }
});

/* ── CTA strip ── */
gsap.from('.cta-strip-inner', {
  y: 40, opacity: 0,
  duration: 0.9, ease: 'power3.out',
  scrollTrigger: {
    trigger: '.cta-strip-inner',
    start: 'top 82%'
  }
});

/* ── Benefit cards stagger ── */
gsap.from('.benefit-card', {
  y: 40, opacity: 0,
  stagger: 0.1, duration: 0.75,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.benefits-grid',
    start: 'top 80%'
  }
});

/* ── Smooth anchor scroll through Lenis ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    }
  });
});

/* ── Btn hover pulse on primary CTA ── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.fromTo(btn,
      { boxShadow: '0 0 0 0 rgba(59,126,248,0.5)' },
      { boxShadow: '0 0 0 10px rgba(59,126,248,0)', duration: 0.6, ease: 'power2.out' }
    );
  });
});

/* ── Newsletter form submission ── */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('nl-first-name').value.trim();
    const email = document.getElementById('nl-email').value.trim();

    if (!firstName || !email) {
      alert('Please fill in all fields');
      return;
    }

    const payload = {
      first_name: firstName,
      email: email,
      subscribed_at: new Date().toISOString(),
      source: 'website_newsletter'
    };

    /* Replace with your webhook URL (Google Sheets, n8n, Zapier, etc.) */
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';

    try {
      if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });
      }
    } catch (err) {
      console.warn('Newsletter signup note:', err.message);
    }

    /* Show success message */
    newsletterForm.style.display = 'none';
    document.getElementById('newsletter-success').style.display = 'block';

    /* Reset form for next visitor after a delay */
    setTimeout(() => {
      newsletterForm.reset();
      newsletterForm.style.display = 'flex';
      document.getElementById('newsletter-success').style.display = 'none';
    }, 5000);
  });
}
