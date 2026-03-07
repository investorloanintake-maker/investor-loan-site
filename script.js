
function flip(){

let purchase = parseFloat(document.getElementById('purchase').value || 0)
let rehab = parseFloat(document.getElementById('rehab').value || 0)
let arv = parseFloat(document.getElementById('arv').value || 0)

let cost = purchase + rehab
let ltv = (cost / arv) * 100

document.getElementById('flipResult').innerText =
"Estimated cost: $" + cost.toLocaleString() +
" | Cost to value: " + ltv.toFixed(1) + "%"

}

function dscr(){

let rent = parseFloat(document.getElementById('rent').value || 0)
let pay = parseFloat(document.getElementById('payment').value || 0)

let ratio = rent / pay

document.getElementById('dscrResult').innerText =
"Estimated DSCR: " + ratio.toFixed(2)

}
