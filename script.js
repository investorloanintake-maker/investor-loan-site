/* ============================================================
   CAPVIA — Script
   - Scroll header shadow
   - Mobile nav toggle
   - Scroll reveal animations
   - Fix & Flip analyzer (improved)
   - DSCR Quick Check (improved)
   - Form submission handler
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
    // Close on link click
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
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
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

    const total    = purchase + rehab;
    const profit   = arv - total;
    const ltv      = (total / arv) * 100;
    const margin   = (profit / arv) * 100;

    const fmt = n => '$' + Math.round(n).toLocaleString();
    const isHealthy = ltv <= 85 && profit > 0;

    result.className = 'result-box ' + (isHealthy ? 'has-result' : 'warning');
    result.innerHTML =
      `<strong>Total cost:</strong> ${fmt(total)} &nbsp;|&nbsp; <strong>Cost-to-value:</strong> ${ltv.toFixed(1)}%<br>` +
      `<strong>Gross profit:</strong> ${fmt(profit)} &nbsp;|&nbsp; <strong>Margin:</strong> ${margin.toFixed(1)}%<br>` +
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

    const ratio = rent / payment;
    const isGood = ratio >= 1.25;
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

  /* ── Form submission ──────────────────────────────────── */
  const dealForm = document.querySelector('#dealform form');
  const submitBtn = dealForm?.querySelector('button[type="button"]');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name  = dealForm.querySelector('input[placeholder="Your name"]')?.value.trim();
      const email = dealForm.querySelector('input[type="email"]')?.value.trim();

      if (!name || !email) {
        alert('Please enter your name and email before submitting.');
        return;
      }
      // Replace with your actual form handler / Netlify / Formspree endpoint
      submitBtn.textContent = 'Submitted — We\'ll be in touch!';
      submitBtn.disabled = true;
      submitBtn.style.background = '#22C55E';
    });
  }

})();
