export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { endpoint, phone, customerId, book, days } = req.query;
  const API_KEY = '4771bf1aab5a6a3581c83f9a565466db';
  const BASE    = 'https://api.digitalwallet.cards/api/v2';
  const WEBHOOK = 'https://hook.integrator.boost.space/5ixwtqbs2l45rkl8ipxl3m4a07ai9xuq';

  try {
    let url;

    if (endpoint === 'customer') {
      url = `${BASE}/customers?phone=${encodeURIComponent(phone)}`;
      const r = await fetch(url, { headers: { 'X-API-KEY': API_KEY } });
      return res.status(200).json(await r.json());

    } else if (endpoint === 'card') {
      url = `${BASE}/cards?customerId=${encodeURIComponent(customerId)}`;
      const r = await fetch(url, { headers: { 'X-API-KEY': API_KEY } });
      return res.status(200).json(await r.json());

    } else if (endpoint === 'webhook') {
      url = `${WEBHOOK}?phone=${encodeURIComponent(phone)}&book=${encodeURIComponent(book)}&days=${encodeURIComponent(days)}`;
      const r = await fetch(url);
      return res.status(200).json({ ok: true, status: r.status });

    } else {
      return res.status(400).json({ error: 'Invalid endpoint' });
    }

  } catch(e) {
    return res.status(500).json({ error: 'Proxy error', detail: e.message });
  }
}
