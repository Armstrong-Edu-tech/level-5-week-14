export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    res.status(201).json({ message: `User ${name} added with email ${email}` });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
