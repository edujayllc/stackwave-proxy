export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint, phone, customerId } = req.query;
  const API_KEY = '4771bf1aab5a6a3581c83f9a565466db';
  const BASE = 'https://api.digitalwallet.cards/api/v2';

  let url;
  if (endpoint === 'customer') {
    url = `${BASE}/customers?phone=${encodeURIComponent(phone)}`;
  } else if (endpoint === 'card') {
    url = `${BASE}/cards?customerId=${encodeURIComponent(customerId)}`;
  } else {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  try {
    const response = await fetch(url, {
      headers: { 'X-API-KEY': API_KEY }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Proxy error', detail: e.message });
  }
}
