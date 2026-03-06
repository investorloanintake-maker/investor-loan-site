<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Full Qualification | Investor Loan Marketplace</title>
  <meta name="description" content="Complete the full investor borrower and property qualification form for Investor Loan Marketplace." />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="page-glow glow-one"></div>
  <div class="page-glow glow-two"></div>

  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="index.html" aria-label="Investor Loan Marketplace home">
        <img src="assets/logo.svg" alt="Investor Loan Marketplace" class="brand-logo" />
      </a>
      <nav class="site-nav" aria-label="Primary">
        <a href="index.html">Home</a>
        <a href="index.html#quick-request">Quick Request</a>
        <a href="qualification.html" class="active-link">Full Qualification</a>
      </nav>
    </header>

    <main>
      <section class="page-hero compact-hero">
        <p class="eyebrow">Detailed intake</p>
        <h1>Full Qualification Form</h1>
        <p>
          Use this form for borrowers who are ready to provide more deal detail. It supports cleaner review,
          stronger routing, and better downstream CRM tracking.
        </p>
      </section>

      <section class="section qualification-shell">
        <form class="loan-form long-form" action="https://formsubmit.co/Investorloanintake@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="New Investor Loan Marketplace Full Qualification" />
          <input type="hidden" name="_next" value="https://example.com/thank-you.html" data-local-next="thank-you.html" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="Form Type" value="Full Qualification" />

          <section class="form-section-block">
            <div class="block-head">
              <p class="eyebrow">Borrower profile</p>
              <h2>Contact Information</h2>
            </div>
            <div class="field-grid two-col">
              <label>First Name<input type="text" name="First Name" required /></label>
              <label>Last Name<input type="text" name="Last Name" required /></label>
              <label>Email<input type="email" name="Email" required /></label>
              <label>Phone<input type="tel" name="Phone" required /></label>
              <label>Entity Name<input type="text" name="Entity Name" /></label>
              <label>Ownership Percentage<input type="number" name="Ownership Percentage" min="0" max="100" step="0.01" /></label>
            </div>
          </section>

          <section class="form-section-block">
            <div class="block-head">
              <p class="eyebrow">Property</p>
              <h2>Property and Deal Details</h2>
            </div>
            <div class="field-grid two-col">
              <label>Property Address<input type="text" name="Property Address" /></label>
              <label>City<input type="text" name="City" /></label>
              <label>State<input type="text" name="State" required /></label>
              <label>ZIP Code<input type="text" name="ZIP Code" /></label>
              <label>Property Type
                <select name="Property Type" required>
                  <option value="">Select</option>
                  <option>Single Family</option>
                  <option>2-4 Unit</option>
                  <option>Multifamily</option>
                  <option>Mixed Use</option>
                  <option>Commercial</option>
                </select>
              </label>
              <label>Loan Purpose
                <select name="Loan Purpose" required>
                  <option value="">Select</option>
                  <option>Purchase</option>
                  <option>Refinance</option>
                  <option>Cash-Out Refinance</option>
                </select>
              </label>
              <label>Purchase Price<input type="number" name="Purchase Price" min="0" step="0.01" /></label>
              <label>Estimated Value<input type="number" name="Estimated Value" min="0" step="0.01" /></label>
              <label>Loan Amount Requested<input type="number" name="Loan Amount Requested" min="0" step="0.01" required /></label>
              <label>Down Payment or Equity<input type="number" name="Down Payment or Equity" min="0" step="0.01" /></label>
            </div>
          </section>

          <section class="form-section-block">
            <div class="block-head">
              <p class="eyebrow">Loan scenario</p>
              <h2>Program Fit and Readiness</h2>
            </div>
            <div class="field-grid two-col">
              <label>Loan Type
                <select name="Loan Type" required>
                  <option value="">Select</option>
                  <option>DSCR Rental Loan</option>
                  <option>Fix &amp; Flip</option>
                  <option>Bridge Loan</option>
                  <option>Bank Statement Loan</option>
                  <option>Ground Up Construction</option>
                  <option>Commercial Loan</option>
                  <option>Not Sure</option>
                </select>
              </label>
              <label>Timeline
                <select name="Timeline" required>
                  <option value="">Select</option>
                  <option>ASAP</option>
                  <option>Within 30 Days</option>
                  <option>Within 60+ Days</option>
                  <option>Just Exploring</option>
                </select>
              </label>
              <label>Estimated Rental Income<input type="number" name="Estimated Rental Income" min="0" step="0.01" /></label>
              <label>Rehab Budget<input type="number" name="Rehab Budget" min="0" step="0.01" /></label>
              <label>After Repair Value (ARV)<input type="number" name="After Repair Value (ARV)" min="0" step="0.01" /></label>
              <label>Credit Score Range
                <select name="Credit Score Range" required>
                  <option value="">Select</option>
                  <option>760+</option>
                  <option>720-759</option>
                  <option>680-719</option>
                  <option>640-679</option>
                  <option>Below 640</option>
                </select>
              </label>
              <label>Experience Level
                <select name="Experience Level" required>
                  <option value="">Select</option>
                  <option>First Deal</option>
                  <option>1-3 Deals</option>
                  <option>4-10 Deals</option>
                  <option>10+ Deals</option>
                </select>
              </label>
              <label>Documents Readiness
                <select name="Documents Readiness">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>Some</option>
                  <option>Not Yet</option>
                </select>
              </label>
            </div>
          </section>

          <section class="form-section-block">
            <div class="block-head">
              <p class="eyebrow">Additional context</p>
              <h2>Notes</h2>
            </div>
            <div class="field-grid">
              <label class="full-width">Additional Notes<textarea name="Additional Notes" rows="6"></textarea></label>
            </div>
          </section>

          <div class="form-actions spread-actions">
            <a class="btn btn-secondary" href="index.html#quick-request">Back to Quick Request</a>
            <button class="btn btn-primary" type="submit">Submit Deal for Review</button>
          </div>
        </form>
      </section>
    </main>

    <footer class="site-footer">
      <p>Detailed intake for stronger qualification, routing, and lender matching.</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>
</html>
