export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'Upstash env vars not set' });
  }

  if (req.method === 'POST') {
    const r = await fetch(`${url}/incr/claim_count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    return res.json({ count: d.result });
  }

  if (req.method === 'GET') {
    const r = await fetch(`${url}/get/claim_count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await r.json();
    return res.json({ count: d.result || 0 });
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ error: 'Method not allowed' });
}
