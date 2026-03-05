// Shared calculators + modal

const metrics = { allin:"", ltv:"", ltc:"", dscr:"", signal:"", state:"" };

function calculateFlip(){
  const purchaseEl = document.getElementById("purchase");
  if (!purchaseEl) return;

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

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("allin", allin ? ("$" + allin.toLocaleString()) : "—");
  set("ltv", isFinite(ltvNum) ? (ltvNum.toFixed(1) + "%") : "—");
  set("ltc", isFinite(ltcNum) ? (ltcNum.toFixed(1) + "%") : "—");
  set("signal", signal);

  const results = document.getElementById("flipResults");
  if (results) results.style.display = "block";

  metrics.allin = allin ? ("$" + allin.toLocaleString()) : "";
  metrics.ltv = isFinite(ltvNum) ? (ltvNum.toFixed(1) + "%") : "";
  metrics.ltc = isFinite(ltcNum) ? (ltcNum.toFixed(1) + "%") : "";
  metrics.signal = signal;
}

function calculateDSCR(){
  const rentEl = document.getElementById("rent");
  if (!rentEl) return;

  const rent = Number(document.getElementById("rent").value || 0);
  const pitia = Number(document.getElementById("pitia").value || 0);
  const st = (document.getElementById("state").value || "").toUpperCase();

  const dscrNum = (pitia > 0) ? (rent / pitia) : NaN;

  let signal = "—";
  let next = "—";
  if (isFinite(dscrNum)) {
    if (dscrNum >= 1.25) { signal = "Strong"; next = "Likely DSCR-eligible lane"; }
    else if (dscrNum >= 1.00) { signal = "Borderline"; next = "May need structure changes"; }
    else { signal = "Tight"; next = "Consider more equity / lower PITIA"; }
  }

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  set("dscrVal", isFinite(dscrNum) ? dscrNum.toFixed(2) : "—");
  set("dscrSignal", signal);
  set("dscrNext", next);

  const results = document.getElementById("dscrResults");
  if (results) results.style.display = "block";

  metrics.dscr = isFinite(dscrNum) ? dscrNum.toFixed(2) : "";
  metrics.signal = signal;
  metrics.state = st || "";
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
    if (clean.includes("dscr")) sel.value = "DSCR";
    else if (clean.includes("fix")) sel.value = "Fix & Flip";
    else if (clean.includes("bridge")) sel.value = "Bridge";
    else sel.value = "";
  }

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

  setVal("h_page", window.location.pathname.split("/").pop() || "index.html");
  setVal("h_type", type || "");
  setVal("h_allin", metrics.allin || "");
  setVal("h_ltv", metrics.ltv || "");
  setVal("h_ltc", metrics.ltc || "");
  setVal("h_dscr", metrics.dscr || "");
  setVal("h_signal", metrics.signal || "");
  setVal("h_state", metrics.state || "");

  const stateInput = document.getElementById("f_state");
  if (stateInput && metrics.state) stateInput.value = metrics.state;

  const sub = document.getElementById("modalSub");
  if (sub) {
    sub.textContent = type
      ? ("Talk to an expert about: " + type + ".")
      : "Talk to an expert — we’ll route you to the right investor lane.";
  }
}

function closeLeadModal(){
  const modal = document.getElementById("leadModal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("noScroll");
}

document.addEventListener("DOMContentLoaded", () => {
  const fState = document.getElementById("f_state");
  const hState = document.getElementById("h_state");
  if (fState && hState) {
    fState.addEventListener("input", (e) => {
      hState.value = (e.target.value || "").toUpperCase();
    });
  }
});
