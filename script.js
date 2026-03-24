/* ── Viador Partners V4 — script.js ─────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll shadow ───────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Mobile burger ───────────────────────────────────── */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      drawer.style.display = open ? 'flex' : 'none';
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        drawer.style.display = 'none';
      });
    });
  }

  /* ── Two-step deal form ──────────────────────────────── */
  const step1El  = document.getElementById('step1');
  const step2El  = document.getElementById('step2');
  const successEl = document.getElementById('formSuccess');
  const pip1     = document.getElementById('pip1');
  const pip2     = document.getElementById('pip2');
  const nextBtn  = document.getElementById('step1Next');
  const backBtn  = document.getElementById('step2Back');
  const submitBtn = document.getElementById('submitDeal');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      step1El.style.display = 'none';
      step2El.style.display = 'block';
      backBtn.style.display = 'block';
      pip1.classList.remove('active');
      pip2.classList.add('active');
      step2El.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      step2El.style.display = 'none';
      backBtn.style.display = 'none';
      step1El.style.display = 'block';
      pip2.classList.remove('active');
      pip1.classList.add('active');
    });
  }

  /* ── HubSpot config — paste your Form GUID below ── */
  const HS_PORTAL_ID  = '245454217';
  const HS_FORM_GUID  = 'e463e10b-4cb3-4d79-8915-2d6c62d4cc58';

  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {

      /* Validate required fields */
      const fnameEl  = document.getElementById('fname');
      const femailEl = document.getElementById('femail');
      if (!fnameEl?.value.trim()) { fnameEl.focus(); fnameEl.style.outline = '2px solid #c0392b'; return; }
      if (!femailEl?.value.trim()) { femailEl.focus(); femailEl.style.outline = '2px solid #c0392b'; return; }

      /* Show loading state */
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      /* Split name into first / last */
      const fullName  = fnameEl.value.trim().split(' ');
      const firstName = fullName[0] || '';
      const lastName  = fullName.slice(1).join(' ') || '';

      /* Helper to get field value safely */
      const val = id => document.getElementById(id)?.value?.trim() || '';

      /* Build HubSpot fields array */
      const fields = [
        { name: 'firstname',            value: firstName },
        { name: 'lastname',             value: lastName },
        { name: 'email',                value: femailEl.value.trim() },
        { name: 'phone',                value: val('phone') },
        { name: 'investor_experience',  value: val('exp') },
        { name: 'deal_type_interest',   value: val('dealtype') },
        { name: 'has_entity',           value: val('entity') },
        { name: 'property_state',       value: val('propstate') },
        { name: 'property_address',     value: val('address') },
        { name: 'listing_url',          value: val('listing') },
        { name: 'purchase_price',       value: val('price').replace(/[^0-9.]/g, '') },
        { name: 'loan_amount_requested',value: val('loanamt').replace(/[^0-9.]/g, '') },
        { name: 'monthly_rent',         value: val('rent-est').replace(/[^0-9.]/g, '') },
        { name: 'estimated_arv',        value: val('arv-est').replace(/[^0-9.]/g, '') },
        { name: 'message',              value: val('notes') },
        { name: 'hs_page_url',          value: window.location.href },
      ].filter(f => f.value !== ''); /* strip empty fields */

      const payload = {
        fields,
        context: {
          pageUri:  window.location.href,
          pageName: document.title
        }
      };

      try {
        const res = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        );

        if (res.ok) {
          /* Success — redirect to thank you page, fallback to inline */
          try { window.location.href = 'thank-you.html'; } catch(e) {}
          var fp = document.querySelector('.form-panel') || document.getElementById('dealForm');
          if (fp) fp.style.display = 'none';
          if (successEl) {
            successEl.style.display = 'block';
            successEl.style.position = 'relative';
            successEl.style.opacity = '1';
            successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          const err = await res.json().catch(() => ({}));
          console.error('HubSpot error:', err);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Deal for Review';
          alert('Something went wrong. Please try again or email us directly.');
        }
      } catch (e) {
        console.error('Submission failed:', e);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Deal for Review';
        alert('Network error. Please check your connection and try again.');
      }
    });
  }

  /* ── Fix & Flip Analyzer ─────────────────────────────── */
  window.runFlip = function () {
    const p  = parseFloat(document.getElementById('t-purchase')?.value) || 0;
    const r  = parseFloat(document.getElementById('t-rehab')?.value)    || 0;
    const a  = parseFloat(document.getElementById('t-arv')?.value)      || 0;
    const el = document.getElementById('flipResult');
    if (!el) return;
    if (!p || !r || !a) { el.textContent = 'Enter all three figures to see the scenario.'; return; }
    const totalCost   = p + r;
    const grossProfit = a - totalCost;
    const ltv         = (totalCost / a * 100).toFixed(1);
    const margin      = (grossProfit / a * 100).toFixed(1);
    const ok = grossProfit > 0 && ltv < 80;
    el.innerHTML = `
      <strong style="color:${ok ? 'var(--gold)' : 'var(--ink-soft)'}">
        ${ok ? '✓ Deal pencils' : '⚠ Thin margins — review numbers'}
      </strong><br>
      Total cost: <strong>$${totalCost.toLocaleString()}</strong> &nbsp;·&nbsp;
      LTC: <strong>${ltv}%</strong><br>
      Gross profit (pre-carry): <strong>$${grossProfit.toLocaleString()}</strong> &nbsp;·&nbsp;
      Margin: <strong>${margin}%</strong>
    `;
  };

  /* ── DSCR Quick Check ───────────────────────────────── */
  window.runDscr = function () {
    const rent    = parseFloat(document.getElementById('t-rent')?.value)    || 0;
    const payment = parseFloat(document.getElementById('t-payment')?.value) || 0;
    const el      = document.getElementById('dscrResult');
    if (!el) return;
    if (!rent || !payment) { el.textContent = 'Enter rent and payment to check coverage.'; return; }
    const ratio = (rent / payment).toFixed(2);
    let msg, color;
    if (ratio >= 1.25)      { msg = `✓ Strong — DSCR ${ratio}. Well above typical 1.25 threshold.`;  color = 'var(--gold)'; }
    else if (ratio >= 1.0)  { msg = `~ Marginal — DSCR ${ratio}. Qualifies at some lenders, tighter terms.`; color = 'var(--ink-soft)'; }
    else                    { msg = `⚠ Below 1.0 — DSCR ${ratio}. Property income doesn't cover payment.`; color = '#b45309'; }
    el.innerHTML = `<strong style="color:${color}">${msg}</strong>`;
  };

  /* ── Sticky mobile CTA — hide when near form ── */
  const mobileCta = document.getElementById('mobileCta');
  const dealForm  = document.getElementById('dealform');
  if (mobileCta && dealForm) {
    window.addEventListener('scroll', () => {
      const r = dealForm.getBoundingClientRect();
      const visible = r.top < window.innerHeight && r.bottom > 0;
      mobileCta.style.opacity = visible ? '0' : '1';
      mobileCta.style.pointerEvents = visible ? 'none' : 'auto';
    }, { passive: true });
  }

  /* ── Scroll reveals ─────────────────────────────────── */
  const revealEls = document.querySelectorAll('.path-card, .program, .testimonial, .tool-card, .partner-feat, .how-step, .faq-item');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = `opacity .5s ease ${i % 3 * 0.08}s, transform .5s ease ${i % 3 * 0.08}s`;
      io.observe(el);
    });
  }

});
