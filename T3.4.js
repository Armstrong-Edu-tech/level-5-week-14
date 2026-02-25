// pages/api/auth/login.js
export default function handler(req, res) {
  // Mock user
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "test@example.com",
    password: "123456"
  }

  if (req.method === "POST") {
    const { email, password } = req.body

    // Check credentials
    if (email === mockUser.email && password === mockUser.password) {
      res.status(200).json({
        success: true,
        user: { id: mockUser.id, name: mockUser.name, email: mockUser.email }
      })
    } else {
      res.status(401).json({ success: false, error: "Invalid email or password" })
    }
  } 
  else if (req.method === "GET") {
    // Return user data
    res.status(200).json({ id: mockUser.id, name: mockUser.name, email: mockUser.email })
  } 
  else {
 
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
