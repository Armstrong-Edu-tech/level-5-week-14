export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ data: ['Next.js', 'React', 'JavaScript'] });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
