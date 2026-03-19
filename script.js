(function () {
  'use strict';

  // Countdown timer — 10 hours from now (demo)
  const endTime = new Date(Date.now() + 10 * 60 * 60 * 1000);

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, Math.floor((endTime - now) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;

    const ids = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];
    const idsBottom = ['h1b', 'h2b', 'm1b', 'm2b', 's1b', 's2b'];
    const hStr = pad(h);
    const mStr = pad(m);
    const sStr = pad(s);

    [ids, idsBottom].forEach(set => {
      const h1 = document.getElementById(set[0]);
      const h2 = document.getElementById(set[1]);
      const m1 = document.getElementById(set[2]);
      const m2 = document.getElementById(set[3]);
      const s1 = document.getElementById(set[4]);
      const s2 = document.getElementById(set[5]);
      if (h1) h1.textContent = hStr[0];
      if (h2) h2.textContent = hStr[1];
      if (m1) m1.textContent = mStr[0];
      if (m2) m2.textContent = mStr[1];
      if (s1) s1.textContent = sStr[0];
      if (s2) s2.textContent = sStr[1];
    });
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Stock scarcity (random 18–32)
  const stock = 18 + Math.floor(Math.random() * 15);
  const stockEl = document.getElementById('stock');
  const stockBottomEl = document.getElementById('stock-bottom');
  if (stockEl) stockEl.textContent = stock;
  if (stockBottomEl) stockBottomEl.textContent = Math.max(15, stock - 6);

  // Валидация телефона (Узбекистан: 998 XX XXX XX XX или 90/91/93/94/97 XXX XX XX)
  function isValidUzPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return (cleaned.length === 12 && cleaned.startsWith('998')) ||
           (cleaned.length === 9 && /^[789]\d{8}$/.test(cleaned));
  }

  // Form submit
  function handleSubmit(e, formId) {
    e.preventDefault();
    const form = document.getElementById(formId);
    if (!form) return;
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    if (!name) {
      nameInput.focus();
      return;
    }
    if (!phone) {
      phoneInput.focus();
      return;
    }
    if (!isValidUzPhone(phone)) {
      alert('Введите корректный номер телефона (например: 90 123 45 67)');
      phoneInput.focus();
      return;
    }
    // Здесь: отправка на сервер / CRM / Telegram
    alert('Спасибо! Мы перезвоним вам в ближайшее время.');
    form.reset();
  }

  const formTop = document.getElementById('order-form');
  const formBottom = document.getElementById('order-form-bottom');
  if (formTop) formTop.addEventListener('submit', e => handleSubmit(e, 'order-form'));
  if (formBottom) formBottom.addEventListener('submit', e => handleSubmit(e, 'order-form-bottom'));

  // Sticky CTA — показывать после скролла
  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    const observer = new IntersectionObserver(
      ([e]) => stickyCta.classList.toggle('visible', !e.isIntersecting),
      { threshold: 0.1, rootMargin: '-80px 0px 0px 0px' }
    );
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);
  }
})();
