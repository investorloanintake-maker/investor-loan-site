
const slider = document.getElementById('propertyCount');
const sliderLabel = document.getElementById('propertyCountLabel');
const portfolioValue = document.getElementById('portfolioValue');
const annualCashFlow = document.getElementById('annualCashFlow');
const equityPotential = document.getElementById('equityPotential');

function currency(n){
  return '$' + Number(n).toLocaleString();
}

function updatePortfolio(){
  if(!slider) return;
  const count = Number(slider.value);
  sliderLabel.textContent = count;
  portfolioValue.textContent = currency(count * 350000);
  annualCashFlow.textContent = currency(count * 4800);
  equityPotential.textContent = currency(count * 120000) + '+';
}
if(slider){
  slider.addEventListener('input', updatePortfolio);
  updatePortfolio();
}

function runFlipAnalyzer(){
  const purchase = Number(document.getElementById('flipPurchase').value || 0);
  const rehab = Number(document.getElementById('flipRehab').value || 0);
  const arv = Number(document.getElementById('flipArv').value || 0);
  const output = document.getElementById('flipResult');

  if(!purchase || !arv){
    output.textContent = 'Enter purchase price and ARV to estimate deal leverage.';
    return;
  }

  const total = purchase + rehab;
  const ltc = arv ? (total / arv) * 100 : 0;

  let signal = 'Conservative';
  if(ltc > 85) signal = 'Aggressive';
  else if(ltc > 70) signal = 'Moderate';

  output.textContent = `Estimated total cost: ${currency(total)} · Cost-to-value: ${ltc.toFixed(1)}% · Deal signal: ${signal}`;
}

function runDscrCheck(){
  const rent = Number(document.getElementById('rentIncome').value || 0);
  const pitia = Number(document.getElementById('pitia').value || 0);
  const output = document.getElementById('dscrResult');

  if(!rent || !pitia){
    output.textContent = 'Enter rent and payment to estimate DSCR.';
    return;
  }

  const dscr = rent / pitia;
  let signal = 'Likely strong';
  if(dscr < 1.0) signal = 'Likely weak';
  else if(dscr < 1.2) signal = 'Borderline';

  output.textContent = `Estimated DSCR: ${dscr.toFixed(2)} · Signal: ${signal}`;
}
