// Temporary in-memory storage for orders
let orders = [""];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { items, total } = req.body;

    if (!items || total == null) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = {
      id: orders.length + 1,
      items,
      total,
      date: new Date().toISOString(),
    };

    orders.push(newOrder);

    return res.status(201).json(newOrder);
  }

  if (req.method === "GET") {
    return res.status(200).json(orders);
  }

  res.status(405).json({ message: `Method ${req.method} not allowed` });
}
