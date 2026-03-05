<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Investor Loan Marketplace | Investor Financing Tools</title>
  <meta name="description" content="Investor loan calculators and guidance for Fix & Flip and DSCR. Run numbers and request lender options."/>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>
<header class="header">
  <div class="brand">
    <div class="logo" aria-hidden="true"></div>
    <div>
      <h1>Investor Loan Marketplace</h1>
    </div>
  </div>
  <nav class="nav" aria-label="Primary">
    <a href="index.html">Home</a>
    <a href="fix-and-flip.html">Fix &amp; Flip</a>
    <a href="dscr.html">DSCR</a>
  </nav>
  <div class="headerActions">
    <button class="btn btnGhost" type="button" onclick="openLeadModal('General')">Get Loan Options</button>
  </div>
</header>

<section class="hero">
  <div class="heroInner">
    <div class="heroCopy">
      <h2>Choose your lane. Run numbers. Submit for options.</h2>
      <p>
        This is a fast intake site for business-purpose investor financing.
        Start with the calculator that matches your deal type.
      </p>
      <div class="heroBtns">
        <a class="btn btnPrimary" href="fix-and-flip.html">Fix &amp; Flip Analyzer</a>
        <a class="btn btnGhost" href="dscr.html">DSCR Calculator</a>
      </div>
      <p class="micro">Not a lender. Not a commitment to lend. Program availability varies by lender and jurisdiction.</p>
    </div>
    <div class="heroArt" aria-hidden="true">
      <img src="assets/hero.svg" alt=""/>
    </div>
  </div>
</section>

<main class="wrap">

  <section class="card">
    <div class="cardHead">
      <div>
        <h2>Tools</h2>
        <p>Each calculator is its own page so we can add deal-specific guidance (and rank better in search).</p>
      </div>
    </div>

    <div class="tiles">
      <div class="tile">
        <div class="tileTop">
          <div class="tileIcon">F</div>
          <div>
            <strong>Fix &amp; Flip</strong>
            <div class="micro">LTV / LTC, quick deal signal</div>
          </div>
        </div>
        <div class="tileBody">
          <p>Use for purchase + rehab + ARV scenarios. Great for bridge / flip programs.</p>
        </div>
        <div class="tileActions">
          <a class="btn btnPrimary" href="fix-and-flip.html">Open Analyzer</a>
          <button class="btn btnGhost" type="button" onclick="openLeadModal('Fix & Flip')">Request Options</button>
        </div>
      </div>

      <div class="tile">
        <div class="tileTop">
          <div class="tileIcon">D</div>
          <div>
            <strong>DSCR</strong>
            <div class="micro">Rent ÷ PITIA, eligibility signal</div>
          </div>
        </div>
        <div class="tileBody">
          <p>Use for long-term rentals. Quick check before you talk structure and leverage.</p>
        </div>
        <div class="tileActions">
          <a class="btn btnPrimary" href="dscr.html">Open Calculator</a>
          <button class="btn btnGhost" type="button" onclick="openLeadModal('DSCR')">Request Options</button>
        </div>
      </div>

      <div class="tile">
        <div class="tileTop">
          <div class="tileIcon">B</div>
          <div>
            <strong>Bridge / BPL</strong>
            <div class="micro">Coming next</div>
          </div>
        </div>
        <div class="tileBody">
          <p>Short-term investor financing for speed, flexibility, and execution.</p>
        </div>
        <div class="tileActions">
          <button class="btn btnGhost" type="button" onclick="openLeadModal('Bridge')">Request Options</button>
        </div>
      </div>
    </div>
  </section>

  <section class="card cardSoft">
    <h2 style="margin:0 0 8px;">How it works</h2>
    <div class="grid2">
      <div>
        <strong>1) Run numbers</strong>
        <p class="micro">Use the calculator page that matches your deal type.</p>
      </div>
      <div>
        <strong>2) Submit scenario</strong>
        <p class="micro">We capture your inputs and route your request to the right lane.</p>
      </div>
    </div>
    <div class="grid2">
      <div>
        <strong>3) Lender routing</strong>
        <p class="micro">We follow up with 1–2 questions to match program fit and terms.</p>
      </div>
      <div>
        <strong>4) Next steps</strong>
        <p class="micro">If it’s a fit, we’ll request docs and move to prequal.</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p><strong>Disclosures:</strong> Not a lender. Not a commitment to lend. For business-purpose investor financing only. This site does not provide legal, tax, or financial advice.</p>
  </footer>

</main>

<div class="modal" id="leadModal" aria-hidden="true">
  <div class="modalBackdrop" onclick="closeLeadModal()" aria-label="Close"></div>
  <div class="modalPanel" role="dialog" aria-modal="true" aria-label="Request loan options">
    <div class="modalTop">
      <div>
        <h3>Request Loan Options</h3>
        <p class="micro" id="modalSub">Submit your scenario — we’ll route you to the right investor lane.</p>
      </div>
      <button class="iconBtn" type="button" onclick="closeLeadModal()" aria-label="Close">✕</button>
    </div>

    <!-- Netlify Form -->
    <form class="form" name="request-options" method="POST" data-netlify="true" action="/?submitted=request-options">
      <input type="hidden" name="form-name" value="request-options"/>
      <input type="hidden" name="source" id="h_source" value="site"/>
      <input type="hidden" name="loan_type_prefill" id="h_type" value=""/>
      <input type="hidden" name="calc_allin" id="h_allin" value=""/>
      <input type="hidden" name="calc_ltv" id="h_ltv" value=""/>
      <input type="hidden" name="calc_ltc" id="h_ltc" value=""/>
      <input type="hidden" name="calc_dscr" id="h_dscr" value=""/>
      <input type="hidden" name="calc_signal" id="h_signal" value=""/>
      <input type="hidden" name="state" id="h_state" value=""/>

      <label>Loan Type</label>
      <select name="loan_type" id="f_type" required>
        <option value="">Select</option>
        <option>Fix &amp; Flip</option>
        <option>Bridge</option>
        <option>DSCR</option>
        <option>Other</option>
      </select>

      <div class="grid2 modalGrid">
        <div>
          <label>Estimated Loan Amount</label>
          <input type="number" name="loan_amount" id="f_amount" placeholder="450000" inputmode="numeric" required>
        </div>
        <div>
          <label>State</label>
          <input type="text" name="state_display" id="f_state" placeholder="FL" maxlength="2">
        </div>
      </div>

      <div class="grid2 modalGrid">
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Jane Investor" required>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="jane@email.com" required>
        </div>
      </div>

      <label>Phone</label>
      <input type="tel" name="phone" placeholder="(555) 555-5555" required>

      <label class="consent">
        <input type="checkbox" name="consent" required>
        <span>I agree to be contacted by phone/SMS/email. Message/data rates may apply.</span>
      </label>

      <button class="btn btnPrimary" type="submit">Submit</button>
      <p class="micro">Not a lender. Not a commitment to lend. Business-purpose investor financing only.</p>
    </form>
  </div>
</div>
<script src="script.js"></script>
</body>
</html>
