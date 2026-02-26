import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            NextShop
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
             <Link href="/login" className="text-blue-600">
              Login
            </Link>
            <Link href="/products" className="text-blue-600">
              Products
            </Link>
            <Link href="/cart" className="text-blue-600">
              Cart
            </Link>
            <Link href="/orders" className="text-blue-600">
              Orders
            </Link>
           
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        {children}
      </main>

      <footer className="bg-white border-t py-6 text-center text-gray-500">
        © {new Date().getFullYear()} NextShop
      </footer>

    </div>
  );
}
