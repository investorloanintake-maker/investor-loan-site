/* ============================================================
   CAPVIA v2 — Script
   - Scroll header shadow
   - Mobile nav toggle
   - Scroll reveal animations
   - Two-step form logic
   - Fix & Flip analyzer
   - DSCR Quick Check
   - Exit intent popup
   ============================================================ */

(function () {
  'use strict';

  /* ── Header scroll shadow ─────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Mobile nav ───────────────────────────────────────── */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ── Scroll reveal ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Two-step form ────────────────────────────────────── */
  const step1    = document.getElementById('formStep1');
  const step2    = document.getElementById('formStep2');
  const success  = document.getElementById('formSuccess');
  const nextBtn  = document.getElementById('step1Next');
  const backBtn  = document.getElementById('step2Back');
  const submitBtn = document.getElementById('submitDeal');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const exp  = document.getElementById('exp')?.value;
      const deal = document.getElementById('dealtype')?.value;
      if (!exp || !deal) {
        alert('Please select your experience level and deal type to continue.');
        return;
      }
      step1.style.display = 'none';
      step2.style.display = 'block';
      // Scroll form into view smoothly
      document.getElementById('dealform')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = document.getElementById('fname')?.value.trim();
      const email = document.getElementById('femail')?.value.trim();
      if (!name || !email) {
        alert('Please enter your name and email before submitting.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      // Replace with your actual form endpoint (Netlify Forms, Formspree, etc.)
      step2.style.display = 'none';
      success.style.display = 'block';
      // Prevent exit intent from showing after submission
      exitShown = true;
    });
  }

  /* ── Fix & Flip Analyzer ──────────────────────────────── */
  window.flip = function () {
    const purchase = parseFloat(document.getElementById('purchase')?.value) || 0;
    const rehab    = parseFloat(document.getElementById('rehab')?.value) || 0;
    const arv      = parseFloat(document.getElementById('arv')?.value) || 0;
    const result   = document.getElementById('flipResult');
    if (!result) return;

    if (!purchase || !arv) {
      result.textContent = 'Enter at least a purchase price and ARV to analyze.';
      result.className = 'result-box';
      return;
    }

    const total  = purchase + rehab;
    const profit = arv - total;
    const ltv    = (total / arv) * 100;
    const margin = (profit / arv) * 100;
    const fmt    = n => '$' + Math.round(n).toLocaleString();
    const good   = ltv <= 85 && profit > 0;

    result.className = 'result-box ' + (good ? 'has-result' : 'warning');
    result.innerHTML =
      `<strong>Total cost:</strong> ${fmt(total)} &nbsp;·&nbsp; <strong>Cost-to-value:</strong> ${ltv.toFixed(1)}%<br>` +
      `<strong>Gross profit:</strong> ${fmt(profit)} &nbsp;·&nbsp; <strong>Margin:</strong> ${margin.toFixed(1)}%<br>` +
      (ltv > 90 ? '⚠ High leverage — lender may require additional equity.' :
       profit < 0 ? '⚠ Numbers show a loss at current values.' :
       '✓ Deal appears within typical fix & flip leverage range.');
  };

  /* ── DSCR Quick Check ─────────────────────────────────── */
  window.dscr = function () {
    const rent    = parseFloat(document.getElementById('rent')?.value) || 0;
    const payment = parseFloat(document.getElementById('payment')?.value) || 0;
    const result  = document.getElementById('dscrResult');
    if (!result) return;

    if (!rent || !payment) {
      result.textContent = 'Enter both monthly rent and estimated payment.';
      result.className = 'result-box';
      return;
    }

    const ratio       = rent / payment;
    const isGood      = ratio >= 1.25;
    const isBorderline = ratio >= 1.0 && ratio < 1.25;

    result.className = 'result-box ' + (isGood ? 'has-result' : 'warning');
    result.innerHTML =
      `<strong>Estimated DSCR: ${ratio.toFixed(2)}</strong><br>` +
      (isGood
        ? `✓ Appears to meet a typical 1.25 DSCR threshold.`
        : isBorderline
        ? `⚠ Between 1.0–1.25 — some programs may accept this; review required.`
        : `⚠ Below 1.0 — rent does not appear to cover the estimated payment.`);
  };

  /* ── Exit intent popup ────────────────────────────────── */
  let exitShown = false;
  const overlay   = document.getElementById('exitOverlay');
  const closeBtn  = document.getElementById('exitClose');
  const exitSub   = document.getElementById('exitSubmit');

  function showExit() {
    if (exitShown || !overlay) return;
    exitShown = true;
    overlay.removeAttribute('aria-hidden');
    overlay.classList.add('visible');
    document.getElementById('exitEmail')?.focus();
  }

  function hideExit() {
    if (!overlay) return;
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
  }

  // Trigger on mouse leaving the viewport upward (desktop)
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) showExit();
  });

  // Trigger on mobile: after 45 seconds of inactivity
  let idleTimer = setTimeout(() => showExit(), 45000);
  ['touchstart', 'scroll', 'keypress'].forEach(ev => {
    window.addEventListener(ev, () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => showExit(), 45000);
    }, { passive: true });
  });

  if (closeBtn) closeBtn.addEventListener('click', hideExit);
  if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) hideExit(); });

  // Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideExit(); });

  if (exitSub) {
    exitSub.addEventListener('click', () => {
      const email = document.getElementById('exitEmail')?.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      // Replace with your email capture endpoint
      exitSub.textContent = '✓ Check your inbox!';
      exitSub.disabled = true;
      setTimeout(hideExit, 1800);
    });
  }

})();
