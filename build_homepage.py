#!/usr/bin/env python3
"""
Viador homepage rebuild — dark-dominant institutional
Assembles new index.html from preserved sections + new body.
2026-05-11
"""
import os, shutil

REPO = os.path.dirname(os.path.abspath(__file__))
src    = os.path.join(REPO, 'index.html')
dst    = os.path.join(REPO, 'index.html')
backup = os.path.join(REPO, 'index.html.bak-2026-05-11')

with open(src, 'r', encoding='utf-8-sig') as f:
    lines = f.readlines()

print(f"Source: {len(lines)} lines")

# Python 0-indexed; file line N = lines[N-1]
head         = ''.join(lines[0:583])     # lines 1-583  (<head> ... </head>)
deal_and_faq = ''.join(lines[908:1070])  # lines 909-1070 (deal form + realtor + FAQ)
scripts_end  = ''.join(lines[1133:])     # lines 1134+ (scripts, tracking, exit intent)

BODY_START = """\
<body>

<!-- GRAIN OVERLAY -->
<div class="grain" aria-hidden="true"></div>

<!-- NAV dark institutional -->
<header class="vp-nav" id="nav">
  <div class="vp-nav-inner">
    <a href="/" class="vp-nav-logo" aria-label="Viador Partners">
      <img src="/assets/brand/viador-lockup-dark.png" alt="Viador Partners" class="vp-lockup-img"
           onerror="this.style.display='none';this.nextSibling.style.display='flex'"/>
      <span class="vp-lockup-fallback" style="display:none">
        <img src="/assets/brand/viador_vp_mark_dark_transparent.png" alt="" style="height:36px;width:auto;display:block"/>
        <span class="vp-lockup-text">
          <span class="vp-lockup-brand">VIADOR</span>
          <span class="vp-lockup-sub">PARTNERS</span>
        </span>
      </span>
    </a>
    <nav class="vp-nav-links" aria-label="Primary navigation">
      <div class="vp-dropdown">
        <button class="vp-dropdown-trigger" aria-haspopup="true" aria-expanded="false">Programs</button>
        <div class="vp-dropdown-menu">
          <a href="dscr.html">DSCR Loans</a>
          <a href="fix-and-flip.html">Fix &amp; Flip</a>
          <a href="bpl.html">Business Purpose Loans (BPL)</a>
          <a href="non-qm-loans-florida.html">Bank Statement &amp; Non-QM</a>
          <a href="bridge-loans-florida.html">Bridge Loans</a>
          <a href="dscr.html">Rental Portfolio Loans</a>
        </div>
      </div>
      <div class="vp-dropdown">
        <button class="vp-dropdown-trigger" aria-haspopup="true" aria-expanded="false">Tools</button>
        <div class="vp-dropdown-menu">
          <a href="deal-analyzer.html">Deal Calculator</a>
          <a href="dscr-calculator.html">Rate Explorer</a>
          <a href="deal-analyzer.html">Scenario Analyzer</a>
          <a href="deal-analyzer.html">Loan Comparison</a>
        </div>
      </div>
      <a href="about.html" class="vp-nav-link">About</a>
      <a href="#faq" class="vp-nav-link">Resources</a>
    </nav>
    <div class="vp-nav-ctas">
      <a href="#dealform" class="vp-btn-nav-primary">Review My Deal</a>
      <a href="tel:+18134192983" class="vp-btn-nav-ghost">Talk to an Expert &rarr;</a>
    </div>
    <button class="vp-burger" id="vp-burger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="vp-mobile-drawer" id="vp-drawer" aria-hidden="true">
    <div class="vp-drawer-group">
      <div class="vp-drawer-label">Programs</div>
      <a href="dscr.html">DSCR Loans</a>
      <a href="fix-and-flip.html">Fix &amp; Flip</a>
      <a href="bpl.html">Business Purpose Loans (BPL)</a>
      <a href="non-qm-loans-florida.html">Bank Statement / Non-QM</a>
      <a href="bridge-loans-florida.html">Bridge Loans</a>
      <a href="dscr.html">Rental Portfolio Loans</a>
    </div>
    <div class="vp-drawer-group">
      <div class="vp-drawer-label">Tools</div>
      <a href="deal-analyzer.html">Deal Calculator</a>
      <a href="dscr-calculator.html">DSCR Calculator</a>
    </div>
    <a href="about.html" style="color:var(--vp-muted-on-dark);padding:10px 0;display:block;font-weight:500;border-bottom:1px solid var(--vp-border-on-dark)">About</a>
    <a href="#dealform" class="vp-drawer-cta">Review My Deal &rarr;</a>
  </div>
</header>

<main>

<!-- HERO cinematic full-width -->
<section class="vp-hero-cinematic" aria-labelledby="vp-h1">
  <div class="vp-hero-bg" aria-hidden="true"></div>
  <div class="vp-hero-overlay" aria-hidden="true"></div>
  <div class="vp-hero-content container">
    <div class="vp-hero-left">
      <p class="vp-eyebrow-olive">Real Estate Investor Lending Advisory</p>
      <h1 class="vp-hero-h1" id="vp-h1">
        Investment property<br>financing built for<br>real-world <em>investors.</em>
      </h1>
      <p class="vp-hero-sub">DSCR, Fix &amp; Flip, BPL, and cash-out refi &mdash; structured around the property, not your tax return.</p>
      <div class="vp-hero-tags">
        DSCR <span>&middot;</span> BRIDGE <span>&middot;</span> FIX &amp; FLIP <span>&middot;</span> RENTAL PORTFOLIO <span>&middot;</span> NON-QM
      </div>
      <div class="vp-hero-ctas">
        <a href="#dealform" class="vp-btn-primary">Review My Deal</a>
        <a href="#programs" class="vp-btn-secondary">Not sure which program fits?</a>
      </div>
      <div class="vp-hero-trust">
        <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>24-hour review</span>
        <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>No obligation</span>
        <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>NMLS #2822744</span>
      </div>
    </div>
    <aside class="vp-hero-panel" aria-label="Why investors use Viador">
      <p class="vp-panel-title">Why Investors Use Viador</p>
      <ul class="vp-panel-list">
        <li class="vp-panel-item">
          <div class="vp-panel-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div class="vp-panel-body"><div class="vp-panel-headline">Deal reviewed in 24 hours</div><div class="vp-panel-detail">Submit today. Know where you stand tomorrow &mdash; not next week.</div></div>
        </li>
        <li class="vp-panel-item">
          <div class="vp-panel-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
          <div class="vp-panel-body"><div class="vp-panel-headline">Right financing for every strategy</div><div class="vp-panel-detail">DSCR, BPL, fix &amp; flip, bridge, and more &mdash; matched to the deal.</div></div>
        </li>
        <li class="vp-panel-item">
          <div class="vp-panel-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
          <div class="vp-panel-body"><div class="vp-panel-headline">No property count limits</div><div class="vp-panel-detail">BPL loans through your LLC &mdash; scale past the conventional limit.</div></div>
        </li>
        <li class="vp-panel-item">
          <div class="vp-panel-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="vp-panel-body"><div class="vp-panel-headline">No W-2s. No tax returns.</div><div class="vp-panel-detail">DSCR qualifies on rental income. BPL qualifies on the property.</div></div>
        </li>
      </ul>
      <p class="vp-panel-footer">Free Review &middot; No Obligation</p>
    </aside>
  </div>
</section>

<!-- STATS BAR dark -->
<section class="vp-stats-bar" aria-label="Platform credentials">
  <div class="container">
    <div class="vp-stats-grid">
      <div class="vp-stat">
        <div class="vp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div class="vp-stat-body"><div class="vp-stat-num">$1B+</div><div class="vp-stat-label">Career loan volume originated</div></div>
      </div>
      <div class="vp-stat">
        <div class="vp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
        <div class="vp-stat-body"><div class="vp-stat-num">20+ Years</div><div class="vp-stat-label">Institutional lending experience</div></div>
      </div>
      <div class="vp-stat">
        <div class="vp-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div class="vp-stat-body"><div class="vp-stat-num">NMLS #2822744</div><div class="vp-stat-label">Verified originator</div></div>
      </div>
    </div>
  </div>
</section>

<!-- HOW WE WORK light/cream -->
<section class="vp-section-light" aria-labelledby="how-work-hed">
  <div class="container">
    <div class="vp-section-head">
      <p class="vp-eyebrow-dark">How We Work</p>
      <h2 class="vp-h2-light" id="how-work-hed">Three steps from first call to close.</h2>
    </div>
    <div class="vp-steps">
      <div class="vp-step">
        <div class="vp-step-num-circle">01</div>
        <div class="vp-step-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
        <h3 class="vp-step-title">Analyze</h3>
        <p class="vp-step-body">We review your deal, property, and financing situation. No application required.</p>
      </div>
      <div class="vp-step-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
      <div class="vp-step">
        <div class="vp-step-num-circle">02</div>
        <div class="vp-step-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
        <h3 class="vp-step-title">Structure</h3>
        <p class="vp-step-body">We identify the right loan structure, rate, and terms for your specific scenario.</p>
      </div>
      <div class="vp-step-arrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
      <div class="vp-step">
        <div class="vp-step-num-circle">03</div>
        <div class="vp-step-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
        <h3 class="vp-step-title">Execute</h3>
        <p class="vp-step-body">We move from term sheet to close with no income verification required for investment properties.</p>
      </div>
    </div>
  </div>
</section>

<!-- EXAMPLE SCENARIOS dark -->
<section class="vp-section-dark" aria-labelledby="scenarios-hed">
  <div class="container">
    <div class="vp-section-head">
      <p class="vp-eyebrow-olive">Example Scenarios</p>
      <h2 class="vp-h2-dark" id="scenarios-hed">What this looks like in practice.</h2>
      <p class="vp-sub-dark">Illustrative scenarios reflecting the kinds of deals we structure every week.</p>
    </div>
    <div class="vp-scenarios-grid">
      <article class="vp-scenario-card">
        <span class="vp-scenario-badge">Hypothetical Example</span>
        <h3 class="vp-scenario-title">DSCR Refinance</h3>
        <div class="vp-scenario-rows">
          <div class="vp-scenario-row"><span class="vp-scenario-key">Property</span><span class="vp-scenario-val">SFR, Tampa FL</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Loan</span><span class="vp-scenario-val">$480K cash-out refi</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">DSCR</span><span class="vp-scenario-val">1.28x</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Income docs</span><span class="vp-scenario-val">None required</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Result</span><span class="vp-scenario-val">Closed in 28 days</span></div>
        </div>
        <a href="dscr.html" class="vp-scenario-link">View details &rarr;</a>
      </article>
      <article class="vp-scenario-card">
        <span class="vp-scenario-badge">Hypothetical Example</span>
        <h3 class="vp-scenario-title">DSCR Second Mortgage</h3>
        <div class="vp-scenario-rows">
          <div class="vp-scenario-row"><span class="vp-scenario-key">Property</span><span class="vp-scenario-val">Rental, Hillsborough County FL</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Loan</span><span class="vp-scenario-val">$210K second mortgage</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">First rate preserved</span><span class="vp-scenario-val">3.1%</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Net monthly improvement</span><span class="vp-scenario-val vp-success">+$640/mo</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Result</span><span class="vp-scenario-val">Equity accessed without touching first</span></div>
        </div>
        <a href="dscr.html" class="vp-scenario-link">View details &rarr;</a>
      </article>
      <article class="vp-scenario-card">
        <span class="vp-scenario-badge">Hypothetical Example</span>
        <h3 class="vp-scenario-title">Business Purpose Loan</h3>
        <div class="vp-scenario-rows">
          <div class="vp-scenario-row"><span class="vp-scenario-key">Property</span><span class="vp-scenario-val">4-unit, investor LLC</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Loan</span><span class="vp-scenario-val">$385K BPL acquisition</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Qualification</span><span class="vp-scenario-val">Deal cash flow only</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Borrower</span><span class="vp-scenario-val">LLC</span></div>
          <div class="vp-scenario-row"><span class="vp-scenario-key">Result</span><span class="vp-scenario-val">Closed, no personal income review</span></div>
        </div>
        <a href="bpl.html" class="vp-scenario-link">View details &rarr;</a>
      </article>
    </div>
  </div>
</section>

<!-- LOAN PROGRAMS light/white -->
<section class="vp-section-light vp-bg-white" id="programs" aria-labelledby="programs-hed">
  <div class="container">
    <div class="vp-section-head">
      <p class="vp-eyebrow-dark">Loan Programs</p>
      <h2 class="vp-h2-light" id="programs-hed">Every deal is different.</h2>
      <p class="vp-sub-light">Four core programs covering most investor scenarios. We match the structure to the deal.</p>
    </div>
    <div class="vp-programs-grid">
      <div class="vp-program-tile">
        <div class="vp-program-icon-wrap"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
        <h3 class="vp-program-name">DSCR Loans</h3>
        <p class="vp-program-desc">Qualify on rental income &mdash; not W-2s or tax returns. For rental property acquisitions and refinances.</p>
        <a href="dscr.html" class="vp-program-link-dark">DSCR guide &rarr;</a>
      </div>
      <div class="vp-program-tile">
        <div class="vp-program-icon-wrap"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
        <h3 class="vp-program-name">Fix &amp; Flip</h3>
        <p class="vp-program-desc">Fast bridge capital for value-add deals. Borrow on purchase and rehab, repay at sale or refi.</p>
        <a href="fix-and-flip.html" class="vp-program-link-dark">Fix &amp; flip guide &rarr;</a>
      </div>
      <div class="vp-program-tile">
        <div class="vp-program-icon-wrap"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></div>
        <h3 class="vp-program-name">Business Purpose Loans (BPL)</h3>
        <p class="vp-program-desc">Entity-based lending for serious scaling. No property count cap, no personal income scrutiny.</p>
        <a href="bpl.html" class="vp-program-link-dark">BPL guide &rarr;</a>
      </div>
      <div class="vp-program-tile">
        <div class="vp-program-icon-wrap"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div>
        <h3 class="vp-program-name">Bank Statement / Non-QM</h3>
        <p class="vp-program-desc">12&ndash;24 months of deposits replace tax returns. Built for self-employed and complex-income borrowers.</p>
        <a href="non-qm-loans-florida.html" class="vp-program-link-dark">Non-QM guide &rarr;</a>
      </div>
    </div>
  </div>
</section>

<!-- WHO THIS IS FOR dark -->
<section class="vp-section-dark" aria-labelledby="who-for-hed">
  <div class="container">
    <div class="vp-section-head">
      <p class="vp-eyebrow-olive">Who This Is For</p>
      <h2 class="vp-h2-dark" id="who-for-hed">Built for investors at every stage.</h2>
    </div>
    <div class="vp-who-for-grid">
      <div class="vp-who-col">
        <div class="vp-who-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
        <h3 class="vp-who-title">Investors Refinancing</h3>
        <p class="vp-who-body">You own 1&ndash;10 rental properties and want to pull cash out, lower your rate, or restructure debt. No W-2 required.</p>
      </div>
      <div class="vp-who-col">
        <div class="vp-who-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <h3 class="vp-who-title">Active Buyers</h3>
        <p class="vp-who-body">You&#8217;re acquiring your next property and need fast, flexible financing that qualifies on the deal &mdash; not your tax return.</p>
      </div>
      <div class="vp-who-col">
        <div class="vp-who-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
        <h3 class="vp-who-title">Portfolio Builders</h3>
        <p class="vp-who-body">You&#8217;re scaling and need a lending partner who understands the math &mdash; DSCR, cash-on-cash, equity deployment.</p>
      </div>
    </div>
  </div>
</section>

<!-- FOUNDER SECTION dark -->
<section class="vp-founder-section" aria-labelledby="founder-hed">
  <div class="container">
    <div class="vp-founder-inner">
      <div class="vp-founder-left">
        <img src="/assets/brand/chad-evers.jpg" alt="Chad Evers, Founder of Viador Partners" class="vp-founder-photo"
             onerror="this.style.display='none';this.nextSibling.style.display='flex'"/>
        <span class="vp-founder-photo-placeholder" style="display:none" aria-hidden="true">CE</span>
        <div class="vp-founder-bio">
          <p class="vp-founder-tagline">Built from institutional lending experience.</p>
          <p class="vp-founder-name" id="founder-hed">Chad Evers &middot; Founder</p>
          <p class="vp-founder-creds">NMLS #2822744 &middot; 20+ years institutional lending<br>Built national mortgage teams &middot; 3 years Citi global experience</p>
          <a href="https://www.linkedin.com/in/chadevers" target="_blank" rel="noopener noreferrer" class="vp-founder-linkedin">Connect on LinkedIn &rarr;</a>
        </div>
      </div>
      <div class="vp-founder-divider"></div>
      <div class="vp-founder-right">
        <blockquote class="vp-founder-quote">
          Viador is what I built instead. For the people the system was never designed to serve.
        </blockquote>
      </div>
    </div>
  </div>
</section>

"""

NEW_CTA_FOOTER = """\

<!-- FINAL CTA BAND dark -->
<section class="vp-cta-final" aria-label="Start your deal review">
  <div class="container">
    <div class="vp-cta-final-inner">
      <div class="vp-cta-final-left">
        <div class="vp-cta-final-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B745E" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
        <div>
          <h2 class="vp-cta-final-hed">Ready to see what your deal looks like?</h2>
          <p class="vp-cta-final-sub">We&#8217;ll review it and respond with a clear path forward within 24 hours.</p>
        </div>
      </div>
      <div class="vp-cta-final-buttons">
        <a href="#dealform" class="vp-btn-primary">Review My Deal</a>
        <a href="tel:+18134192983" class="vp-btn-outline-dark">Talk to an Expert &rarr;</a>
      </div>
    </div>
  </div>
</section>

</main>

<!-- FOOTER dark canonical Variant B — no VA disclaimer -->
<footer class="vp-footer">
  <div class="container">
    <div class="vp-footer-top">
      <div class="vp-footer-brand">
        <img src="/assets/brand/viador_vp_mark_dark_transparent.png" alt="Viador Partners" class="vp-footer-logo"/>
        <p class="vp-footer-tagline">Real estate investor lending advisory.</p>
      </div>
      <div class="vp-footer-col">
        <h4 class="vp-footer-col-head">Programs</h4>
        <a href="dscr.html">DSCR Loans</a>
        <a href="fix-and-flip.html">Fix &amp; Flip</a>
        <a href="bpl.html">Business Purpose Loans (BPL)</a>
        <a href="bridge-loans-florida.html">Bridge Loans</a>
        <a href="non-qm-loans-florida.html">Bank Statement &amp; Non-QM</a>
        <a href="dscr.html">Rental Portfolio Loans</a>
      </div>
      <div class="vp-footer-col">
        <h4 class="vp-footer-col-head">Tools</h4>
        <a href="deal-analyzer.html">Deal Calculator</a>
        <a href="dscr-calculator.html">Rate Explorer</a>
        <a href="deal-analyzer.html">Scenario Analyzer</a>
        <a href="deal-analyzer.html">Loan Comparison</a>
      </div>
      <div class="vp-footer-col">
        <h4 class="vp-footer-col-head">Company</h4>
        <a href="about.html">About Viador</a>
        <a href="about.html">Our Approach</a>
        <a href="about.html">Careers</a>
        <a href="#dealform">Contact</a>
      </div>
    </div>
    <div class="vp-footer-bottom">
      <p class="vp-footer-compliance">
        &copy; 2026 Viador Partners LLC &middot; chad&#64;viadorpartners.com &middot; (813) 419-2983<br>
        Chad Evers NMLS #2822744 | Lending through Focus Home Mortgage Inc. NMLS #2769672 | Equal Housing Lender<br>
        <a href="privacy-policy.html">Privacy Policy</a> &middot; <a href="terms.html">Terms of Use</a>
      </p>
    </div>
  </div>
</footer>

"""

new_content = head + BODY_START + deal_and_faq + NEW_CTA_FOOTER + scripts_end

shutil.copy(src, backup)
print(f"Backup: {backup}")

with open(dst, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Written: {new_content.count(chr(10))} lines")
print("Done.")
