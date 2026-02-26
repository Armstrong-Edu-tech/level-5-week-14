export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/order");
  const orders = await res.json();

  return {
    props: { orders },
  };
}


export default function Orders({ orders }) {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl text-blue-500 font-bold text-center mb-8">
          Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-blue-500">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 shadow rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-blue-600">
                    Order ID: #{order.id ?? "N/A"}
                  </span>
                  <span className="font-bold text-green-600">
                    Total: ${order.total?.toFixed(2) ?? "0.00"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold">Items:</span>
                  <ul className="list-disc list-inside mt-1 text-gray-700">
                    {(order.items ?? []).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  Date: {order.date ? new Date(order.date).toLocaleString() : "-"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
