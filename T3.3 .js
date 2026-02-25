// pages/api/secure-data.js
import { getSession } from '../../lib/session'; // your session helper

export default async function handler(req, res) {
  const session = await getSession(req);

  //  Check if user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  //  Proceed with protected API logic
  res.status(200).json({ message: 'Protected content' });
}
