"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const metadata = {
  title: "Cart | NextShop",
  description: "Your shopping cart",
};

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (cart.length === 0) return alert("Your cart is empty");

    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => item.title),
          total,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const newOrder = await res.json();

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      alert(`Order #${newOrder.id} placed successfully!`);

      // Redirect to Orders page
      router.push("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="bg-white p-8 shadow rounded max-w-3xl mx-auto">
        <h2 className="text-blue-600 text-2xl font-bold mb-6">
          Your Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 object-contain"
                  />
                  <span className="font-medium">{item.title}</span>
                </div>

                <span className="font-bold">${item.price.toFixed(2)}</span>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right font-bold text-xl mt-4">
              Total: ${total.toFixed(2)}
            </div>

            <div className="text-right mt-4">
              <button
                onClick={placeOrder}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}