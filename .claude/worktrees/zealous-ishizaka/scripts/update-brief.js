const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'viador-data.json');
const briefPath = path.join(__dirname, '..', 'BRIEF.md');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Update timestamp
data.meta.last_updated = new Date().toISOString().split('T')[0];

// Calculate monthly expense total
const expenses = data.financials.monthly_expenses;
const monthlyTotal = Object.values(expenses).reduce((a, b) => a + b, 0);

// Generate BRIEF.md
const md = `# VIADOR PARTNERS — MASTER BRIEF
**Version ${data.meta.version} | Last Updated: ${data.meta.last_updated}**

> Load this file at the start of every Claude session.
> Single source of truth — all platforms and scripts read from viador-data.json

---

## FOUNDER
| Field | Detail |
|-------|--------|
| Name | ${data.founder.name} |
| NMLS | ${data.founder.nmls} |
| Phone | ${data.founder.phone} |
| Email | ${data.founder.email} |
| LinkedIn | ${data.founder.connections.toLocaleString()} connections |
| Background | ${data.founder.background} |
| Entity | ${data.founder.entity} |
| EIN | ${data.founder.ein} |

---

## PLATFORMS
| Platform | Domain | Status |
|----------|--------|--------|
| Viador Partners | ${data.platforms.viador_partners.domain} | ${data.platforms.viador_partners.status} |
| ViaScore | ${data.platforms.viascore.domain} | ${data.platforms.viascore.status} |
| Viador Markets | ${data.platforms.viador_markets.domain} | ${data.platforms.viador_markets.status} |
| Viador Realty | Future | ${data.platforms.viador_realty.status} |

---

## LICENSING STATUS
| Item | Status |
|------|--------|
| SAFE Coursework | ${data.licensing.safe_coursework.completed_hours}h done / ${data.licensing.safe_coursework.required_hours}h required |
| SAFE Exam | ${data.licensing.safe_exam.status} — ${data.licensing.safe_exam.target_date} |
| Ohio License | ${data.licensing.ohio_license.status} — target ${data.licensing.ohio_license.target} |
| Florida License | ${data.licensing.florida_license.status} — target ${data.licensing.florida_license.target} |

---

## KEY CONTACTS
${data.contacts.map(c => `### ${c.name}
- **Role:** ${c.role}
- **Status:** ${c.status}
- **Next Action:** ${c.next_action || 'See priority stack'}
`).join('\n')}

---

## PRIORITY STACK

### Today
${data.priority_stack.today.map(i => `- ${i}`).join('\n')}

### This Week
${data.priority_stack.this_week.map(i => `- ${i}`).join('\n')}

### Sprint 2 (April)
${data.priority_stack.sprint_2_april.map(i => `- ${i}`).join('\n')}

### Sprint 3 (After Licensing)
${data.priority_stack.sprint_3_after_licensing.map(i => `- ${i}`).join('\n')}

---

## FINANCIAL PROJECTIONS
| Year | Revenue | Net Income | Loans | Platform Value |
|------|---------|------------|-------|----------------|
| Y1 2026 | $${data.financials.projections.y1.revenue.toLocaleString()} | $${data.financials.projections.y1.net.toLocaleString()} | ${data.financials.projections.y1.loans} | ${data.financials.projections.y1.platform_value} |
| Y2 2027 | $${data.financials.projections.y2.revenue.toLocaleString()} | $${data.financials.projections.y2.net.toLocaleString()} | ${data.financials.projections.y2.loans} | ${data.financials.projections.y2.platform_value} |
| Y3 2028 | $${data.financials.projections.y3.revenue.toLocaleString()} | $${data.financials.projections.y3.net.toLocaleString()} | ${data.financials.projections.y3.loans} | ${data.financials.projections.y3.platform_value} |

**Monthly Expenses:** $${monthlyTotal.toLocaleString()}/mo

---

## CREDENTIALS (CONFIDENTIAL)
| Service | Detail |
|---------|--------|
| HubSpot Portal | ${data.credentials.hubspot_portal} |
| GA4 | ${data.credentials.ga4} |
| Cloudflare Worker | ${data.credentials.cloudflare_worker} |
| Admin Dashboard | ${data.platforms.viador_partners.admin} |

---

## TECHNOLOGY
- **Worker endpoints:** ${data.technology.cloudflare_worker.endpoints.join(', ')}
- **AI model:** ${data.technology.cloudflare_worker.model}
- **ViaScore backtest:** ${data.technology.viascore_backtest.transactions} transactions, ${data.technology.viascore_backtest.zip_codes} zip codes
- **AVM stack:** ${data.technology.avm_stack.current.join(' + ')}

---

## SESSION LOG
${data.session_log.map(s => `### ${s.date}
${s.key_wins.map(w => `- ${w}`).join('\n')}
`).join('\n')}

---

*Viador Partners LLC | ${data.founder.phone} | ${data.founder.email} | NMLS #${data.founder.nmls}*
`;

fs.writeFileSync(briefPath, md);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('');
console.log('======================================');
console.log('  VIADOR PARTNERS — SESSION SUMMARY');
console.log('======================================');
console.log('  Brief updated: ' + data.meta.last_updated);
console.log('  BRIEF.md regenerated');
console.log('  viador-data.json saved');
console.log('--------------------------------------');
console.log('  SAFE: ' + data.licensing.safe_coursework.completed_hours + 'h / ' + data.licensing.safe_coursework.required_hours + 'h');
console.log('  OH License: ' + data.licensing.ohio_license.status);
console.log('  LinkedIn post: ' + data.founder.linkedin_post_target);
console.log('======================================');
console.log('');
