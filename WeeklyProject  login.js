export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Simple mock validation
    if (email === "test@test.com" && password === "123456") {
      return res.status(200).json({ message: "Login successful" });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
