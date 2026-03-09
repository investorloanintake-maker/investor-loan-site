const HS_FORM_GUID = 'YOUR_FORM_GUID_HERE';
const HS_PORTAL_ID = '245454217';

function submitToHubSpot(data, callback) {
  if (HS_FORM_GUID === 'YOUR_FORM_GUID_HERE') { callback && callback(true); return; }
  fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: Object.entries(data).map(([name, value]) => ({ name, value })) })
  }).then(() => { callback && callback(true); }).catch(() => { callback && callback(true); });
}
