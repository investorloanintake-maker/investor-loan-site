const metrics = { allin:"", ltv:"", ltc:"", dscr:"", signal:"", state:"", bsMonthly:"", bsAnnual:"" };
function setText(id, val){ const el = document.getElementById(id); if (el) el.textContent = val; }
function show(id){ const el = document.getElementById(id); if (el) el.style.display = "block"; }
function setVal(id, val){ const el = document.getElementById(id); if (el) el.value = val; }

function calculateFlip(){
  if (!document.getElementById("purchase")) return;
  const purchase = Number(document.getElementById("purchase").value || 0);
  const rehab = Number(document.getElementById("rehab").value || 0);
  const arv = Number(document.getElementById("arv").value || 0);
  const loan = Number(document.getElementById("loan").value || 0);
  const allin = purchase + rehab;
  const ltvNum = (arv > 0) ? (loan / arv) * 100 : NaN;
  const ltcNum = (allin > 0) ? (loan / allin) * 100 : NaN;
  let signal = "Strong";
  if (isFinite(ltvNum) && ltvNum > 80) signal = "Moderate";
  if (isFinite(ltvNum) && ltvNum > 85) signal = "Aggressive";
  setText("allin", allin ? "$" + allin.toLocaleString() : "—");
  setText("ltv", isFinite(ltvNum) ? ltvNum.toFixed(1) + "%" : "—");
  setText("ltc", isFinite(ltcNum) ? ltcNum.toFixed(1) + "%" : "—");
  setText("signal", signal);
  show("flipResults");
  metrics.allin = allin ? "$" + allin.toLocaleString() : "";
  metrics.ltv = isFinite(ltvNum) ? ltvNum.toFixed(1) + "%" : "";
  metrics.ltc = isFinite(ltcNum) ? ltcNum.toFixed(1) + "%" : "";
  metrics.signal = signal;
}
function calculateDSCR(){
  if (!document.getElementById("rent")) return;
  const rent = Number(document.getElementById("rent").value || 0);
  const pitia = Number(document.getElementById("pitia").value || 0);
  const st = (document.getElementById("state").value || "").toUpperCase();
  const dscrNum = (pitia > 0) ? (rent / pitia) : NaN;
  let signal = "—"; let next = "—";
  if (isFinite(dscrNum)) {
    if (dscrNum >= 1.25) { signal = "Strong"; next = "Likely DSCR-eligible lane"; }
    else if (dscrNum >= 1.00) { signal = "Borderline"; next = "May need structure changes"; }
    else { signal = "Tight"; next = "Consider more equity / lower PITIA"; }
  }
  setText("dscrVal", isFinite(dscrNum) ? dscrNum.toFixed(2) : "—");
  setText("dscrSignal", signal);
  setText("dscrNext", next);
  show("dscrResults");
  metrics.dscr = isFinite(dscrNum) ? dscrNum.toFixed(2) : "";
  metrics.signal = signal;
  metrics.state = st || "";
}
function calculateBankStatement(){
  if (!document.getElementById("bs_deposits")) return;
  const months = Number(document.getElementById("bs_months").value || 12);
  const deposits = Number(document.getElementById("bs_deposits").value || 0);
  const expensePct = Number(document.getElementById("bs_expense").value || 50) / 100;
  const ownPct = Number(document.getElementById("bs_own").value || 100) / 100;
  const net = deposits * (1 - expensePct);
  const netOwn = net * ownPct;
  const monthly = months > 0 ? netOwn / months : 0;
  const annual = monthly * 12;
  const fmt = (n) => n ? "$" + Math.round(n).toLocaleString() : "—";
  setText("bs_net", fmt(net)); setText("bs_net_own", fmt(netOwn)); setText("bs_monthly", fmt(monthly)); setText("bs_annual", fmt(annual));
  show("bsResults");
  metrics.signal = "Bank Statement Estimate";
  metrics.bsMonthly = fmt(monthly);
  metrics.bsAnnual = fmt(annual);
}
function openLeadModal(type){
  const modal = document.getElementById("leadModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("noScroll");
  const sel = document.getElementById("f_type");
  const clean = (type || "").toLowerCase();
  if (sel) {
    if (clean.includes("rental") || clean.includes("dscr")) sel.value = "Rental property";
    else if (clean.includes("fix")) sel.value = "Fix & Flip";
    else if (clean.includes("bridge")) sel.value = "Bridge / BPL";
    else if (clean.includes("refi")) sel.value = "Refinance / cash-out";
    else if (clean.includes("bank")) sel.value = "Not sure yet";
    else sel.value = "";
  }
  setVal("h_page", window.location.pathname.split("/").pop() || "index.html");
  setVal("h_type", type || "");
  setVal("h_allin", metrics.allin || "");
  setVal("h_ltv", metrics.ltv || "");
  setVal("h_ltc", metrics.ltc || "");
  setVal("h_dscr", metrics.dscr || "");
  setVal("h_signal", metrics.signal || "");
  setVal("h_state", metrics.state || "");
  setVal("h_bs_monthly", metrics.bsMonthly || "");
  setVal("h_bs_annual", metrics.bsAnnual || "");
  const sub = document.getElementById("modalSub");
  if (sub) sub.textContent = type ? ("Tell us about your " + type + " scenario.") : "Tell us about your scenario.";
  const stateInput = document.getElementById("f_state");
  if (stateInput && metrics.state) stateInput.value = metrics.state;
}
function openLeadModalWithPrefill(type, amount, state, value){
  openLeadModal(type || "General");
  const amt = document.getElementById("f_amount"); if (amt && amount) amt.value = amount;
  const st = document.getElementById("f_state"); if (st && state) st.value = String(state).toUpperCase();
  const hs = document.getElementById("h_state"); if (hs && state) hs.value = String(state).toUpperCase();
  const fv = document.getElementById("f_value"); if (fv && value) fv.value = value;
}
function closeLeadModal(){
  const modal = document.getElementById("leadModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("noScroll");
}
function toggleFAQ(btn){
  const wrap = btn.closest(".qa");
  if (!wrap) return;
  wrap.classList.toggle("open");
  const chev = wrap.querySelector(".chev");
  if (chev) chev.textContent = wrap.classList.contains("open") ? "—" : "+";
}
function smoothTo(id){
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded", () => {
  const fState = document.getElementById("f_state");
  const hState = document.getElementById("h_state");
  if (fState && hState) fState.addEventListener("input", (e)=>{ hState.value = (e.target.value || "").toUpperCase(); });
});
