# VIADOR PARTNERS — CREDENTIALS & ACCOUNT MAP
*Last updated: April 13, 2026 | v1.0*
*Add to BRIEF.md. Update at every session closedown.*
*[CONFIRM] = uncertain — verify and update*

---

## 1. GOOGLE ACCOUNTS

| Account | Controls | Notes |
|---|---|---|
| chad@viadorpartners.com | Primary Google Workspace account | GSC, GA4, GBP, Google Ads, Google Cloud all under this account |
| chad@nextdutyvet.com | Alias on same Workspace | Not a separate Google account — alias domain added to existing Workspace, verified via Cloudflare OAuth |

---

## 2. GOOGLE SEARCH CONSOLE

| Property | Verification Method | Status |
|---|---|---|
| viadorpartners.com | [CONFIRM] | ✅ Verified |
| viascore.ai | [CONFIRM] | ✅ Verified |
| viadormarkets.com | [CONFIRM] | ✅ Verified |
| nextdutyvet.com | Not yet added | ⬜ Add this week |

Login: chad@viadorpartners.com
Sitemaps submitted: All 3 active Viador domains ✅

---

## 3. GOOGLE ANALYTICS

| Property | Measurement ID | Status |
|---|---|---|
| All platforms (unified) | G-LQWW7XCPVS | ✅ Active on all sites |

Account login: chad@viadorpartners.com

GA4 custom events — nextdutyvet.com:
- ndv_diag_q1 / ndv_diag_q2 / ndv_diag_path
- ndv_diag_cta_calendar / ndv_diag_cta_brief
- veteran_{page_slug}_cta_viewed (7 events)
- intake_form_started / intake_form_submitted / calendly_fallback

GA4 custom events — viadorpartners.com:
- AI referral detection active
- Source tags: refi-calc / deal-form / viascore / propstream

---

## 4. GOOGLE BUSINESS PROFILE

| Detail | Value |
|---|---|
| Business name | Viador Partners LLC |
| Status | ✅ Verified April 2, 2026 |
| Login | chad@viadorpartners.com |
| Reviews | 0 — need 5+ for Map Pack |
| GBP ID | [CONFIRM] |

---

## 5. GOOGLE WORKSPACE

| Detail | Value |
|---|---|
| Primary domain | viadorpartners.com |
| Alias domain | nextdutyvet.com — added free, verified via Cloudflare OAuth |
| Primary account | chad@viadorpartners.com |
| Active aliases | chad@nextdutyvet.com / hello@nextdutyvet.com |
| DKIM — viadorpartners.com | ✅ Active (fixed April 9) |
| DKIM — nextdutyvet.com | ✅ Active (generated April 9) |
| Plan | [CONFIRM] |
| Billing | [CONFIRM] |

---

## 6. GOOGLE CLOUD

| Detail | Value |
|---|---|
| Project ID | stone-index-490722-r2 |
| APIs enabled | Maps JavaScript API + Places API |
| Login | chad@viadorpartners.com |
| Billing | [CONFIRM] |
| Usage | viascore.ai address autocomplete (stealth) |

---

## 7. GOOGLE ADS

| Detail | Value |
|---|---|
| Status | Not yet live — planned $300/mo |
| Login | chad@viadorpartners.com |
| Campaign structure | Written — 3 campaigns ready |
| Launch trigger | After Focus agreement signed + funnel verified |

---

## 8. HOSTING & DNS — CLOUDFLARE

| Detail | Value |
|---|---|
| Account ID | 7f6528edbccc49f689f5e9d4ee619477 |
| Login email | [CONFIRM] |

Zones:

| Domain | Zone ID | Hosting | Status |
|---|---|---|---|
| viadorpartners.com | [CONFIRM] | GitHub Pages | ✅ Active |
| viascore.ai | [CONFIRM] | Cloudflare Pages | ✅ Stealth |
| viadormarkets.com | [CONFIRM] | Cloudflare Pages | ✅ Stealth |
| nextdutyvet.com | 5590d29a87c768eca06e74a22a330a36 | Cloudflare Pages | ✅ Active |

Cloudflare Worker:

| Detail | Value |
|---|---|
| Worker name | viador-ai-proxy |
| Worker URL | viador-ai-proxy.chad-7f6.workers.dev |
| Function | Anthropic API proxy — wildcard CORS, 24hr cache on /score |
| Deploy command | cd C:\Users\chadr\viador-ai-proxy && wrangler deploy |

Cloudflare Pages projects:

| Project | Domain | Repo |
|---|---|---|
| viascore.ai | viascore.ai | viascore-project |
| viadormarkets.com | viadormarkets.com | viadormarkets |
| nextdutyvet.com | nextdutyvet.com | nextdutyvet |

---

## 9. GITHUB

| Detail | Value |
|---|---|
| Organization | investorloanintake-maker |
| Login | [CONFIRM] |

Repositories:

| Repo | Site | Notes |
|---|---|---|
| investor-loan-site | viadorpartners.com | BRIEF.md + viador-data.json. Auto-deploys to GitHub Pages. |
| viadorpartners | viadorpartners.com | [CONFIRM — relationship to investor-loan-site] |
| viascore-project | viascore.ai | Scoring engine + content. Stealth. |
| viadormarkets | viadormarkets.com | In buildout. Stealth. |
| nextdutyvet | nextdutyvet.com | 6 pages live. Active. |
| viador-ai-proxy | Cloudflare Worker | Anthropic API proxy |

Last commit: cc7a738 — April 10, 2026
Auto-deploy: investor-loan-site → GitHub Pages on push to main

---

## 10. DNS RECORDS — KEY ENTRIES

viadorpartners.com:

| Type | Name | Value | Status |
|---|---|---|---|
| MX | @ | Google Workspace | ✅ |
| SPF | @ | v=spf1 include:_spf.google.com ~all | ✅ |
| DKIM | google._domainkey | Google-generated key | ✅ Fixed April 9 |
| DMARC | _dmarc | v=DMARC1; p=quarantine | ✅ |
| A | campaign | 192.0.2.1 | ✅ |
| MX | campaign | smtp.google.com | ✅ |
| DKIM | google._domainkey.campaign | 2048-bit Google key | ✅ |

nextdutyvet.com:

| Type | Name | Value | Status |
|---|---|---|---|
| NS | @ | curt.ns.cloudflare.com + wanda.ns.cloudflare.com | ✅ |
| MX | @ | Google Workspace | ✅ |
| SPF | @ | v=spf1 include:_spf.google.com ~all | ✅ |
| DKIM | google._domainkey | Google-generated key | ✅ |
| DMARC | _dmarc | v=DMARC1; p=quarantine | ✅ |

---

## 11. EMAIL INFRASTRUCTURE

Platform: Smartlead Pro
Cost: $94/mo monthly billing — started April 9, 2026
Login: [CONFIRM]

Warming inboxes:

| Inbox | Status | Warm-up Start |
|---|---|---|
| chad@viadorpartners.com | ✅ Warming | April 7, 2026 |
| chad@nextdutyvet.com | ✅ Warming | April 9, 2026 |
| hello@nextdutyvet.com | ✅ Warming | April 9, 2026 |

First safe send date: ~April 30, 2026
Backup domain: ndvmail.com — ⬜ not yet registered (~$12)
P.O. box: ⬜ not yet obtained — required for CAN-SPAM

Sequences loaded:

| ID | Name | Target |
|---|---|---|
| A | BPL Rate Urgency | 212 HIGH + 401 MEDIUM BPL leads |
| B | BPL Equity Deployer | 500 leads |
| C | Realtor B2B | 400–800 agent records |
| D | Veterans Seg 2 | 375 Prime Equity VA leads |

---

## 12. HUBSPOT

| Detail | Value |
|---|---|
| Portal ID | 245454217 |
| Login | chad@viadorpartners.com |
| Plan | [CONFIRM] |
| Primary form ID | e463e10b-4cb3-4d79-8915-2d6c62d4cc58 |
| Token | REDACTED — stored in environment variable |
| Smartlead integration | ⬜ Not yet connected |

Pipeline stages: New Inquiry → Contacted → Docs Requested → Application Submitted → Under Review → Approved → Closed

---

## 13. META / FACEBOOK

| Platform | Page | Pixel ID | Status |
|---|---|---|---|
| Viador Partners | Viador Partners page | [CONFIRM] | ✅ Page + pixel exist |
| NextDutyVet | NextDutyVet page | Not yet created | ⬜ Create separately |

Meta Custom Audience plan:
- Hashed veteran email lists → NextDutyVet ad account
- Budget: $10–15/day
- All veteran ads → nextdutyvet.com/analysis
- Keep Viador Partners and NextDutyVet audiences completely separate

---

## 14. APIs & KEYS

Anthropic:

| Detail | Value |
|---|---|
| API key name | viadorpartners-worker |
| Credits | $5 initial |
| Model | claude-sonnet-4-20250514 |
| Storage | Cloudflare Worker environment variable |

OpenAI:

| Detail | Value |
|---|---|
| Model | GPT-4o mini |
| Cost | ~$0.0005/score |
| Usage | viascore.ai scoring engine (stealth) |
| Storage | [CONFIRM — Worker env or wrangler.toml] |

Google Maps/Places:

| Detail | Value |
|---|---|
| Project | stone-index-490722-r2 |
| Key storage | [CONFIRM — viascore frontend env] |
| Note | Must enable BOTH Maps JavaScript API AND Places API |

---

## 15. LEAD DATA PLATFORMS

PropStream:

| Detail | Value |
|---|---|
| Plan | Pro — $199/mo |
| Login | [CONFIRM] |
| BPL leads | 9,416 Hillsborough investor leads (skip-traced) |
| VA leads analyzed | 20,027 across Hillsborough, Duval, Okaloosa |
| VA file ready | VA_Opportunities_Hillsborough.xlsx |
| Pending pulls | Escambia, Pinellas, Pasco, Manatee, Sarasota FL; Montgomery+Greene OH, Franklin OH, Hamilton OH |

ATTOM Data:

| Detail | Value |
|---|---|
| Status | Free trial — not yet activated |
| Purpose | AVM upgrade for viascore.ai rebuild |
| Trigger | Activate when viascore.ai exits stealth |

---

## 16. LICENSING & COMPLIANCE

| Detail | Value |
|---|---|
| NMLS # | 2822744 |
| EIN | 41-4907672 |
| Entity | Viador Partners LLC |
| State | Florida (Tampa) |
| FL Prometric | ✅ PASSED April 9, 2026 |
| MU4 Florida | ⬜ Pending submission (~$305) |
| MU4 Ohio | ⬜ Pending submission (~$250) |
| FDLE fingerprints | ⬜ ORI: FL737111Z — Live Scan Tampa |
| Temp Authority | Eligible same day as MU4 submission |
| MD expansion | ⬜ Confirm Focus company license active |
| TN expansion | ⬜ Confirm Focus company license active |

Lending platform — Focus Home Mortgage:

| Detail | Value |
|---|---|
| Contact | Jason McBride, CEO — 614-362-8801 ext 2 |
| Entity (primary) | Focus Home Mortgage Inc |
| Entity (DSCR) | Focus DSCR Inc |
| Entity (commercial) | Focus Lending Inc |
| Status | Confirmed platform — agreement in negotiation |
| NDA | Signed |

---

## 17. THIRD-PARTY TOOLS

| Tool | Detail | Login | Status |
|---|---|---|---|
| Calendly | calendly.com/chad-viadorpartners/30min | [CONFIRM] | ✅ Active sitewide |
| Bing Webmaster Tools | All 3 Viador domains verified | [CONFIRM] | ✅ Active |
| Wikidata | Entity Q138857219 | [CONFIRM] | ✅ Live |
| Reddit | u/ViaScore | [CONFIRM] | Aging — genuine participation only |
| Google Sheet | ID: 13tBkar44YoHj8PMvpweU-5kf6os2j1dNK5xdoZW21_4 | chad@viadorpartners.com | ✅ Active |

---

## 18. DOMAIN REGISTRARS

| Domain | Registrar | DNS | Status |
|---|---|---|---|
| viadorpartners.com | [CONFIRM] | Cloudflare | ✅ Active |
| viascore.ai | [CONFIRM] | Cloudflare | ✅ Stealth |
| viadormarkets.com | [CONFIRM] | Cloudflare | ✅ Stealth |
| nextdutyvet.com | GoDaddy | Cloudflare | ✅ Active |
| ndvmail.com | Not registered | — | ⬜ Register ~$12 |

---

## 19. SESSION CLOSEDOWN PROTOCOL

At end of every session submit to Claude Code:
