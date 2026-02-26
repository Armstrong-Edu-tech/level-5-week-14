// pages/products.js
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: { products: data },
    revalidate: 60, // ISR
  };
}

export default function Products({ products }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mx-auto mb-4"
            />

            <h3 className="font-semibold mt-2 line-clamp-2">{product.title}</h3>

            <p className="text-blue-600 font-bold mt-2">${product.price}</p>

            {/* Add to Cart Button */}
            <Link
              href={`/products/${product.id}`}
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center transition"
            >
              Add to Cart
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}