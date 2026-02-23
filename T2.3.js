// pages/products/[id].js
export async function getStaticPaths() {
  const res = await fetch('https://dummyjson.com/products'); // or your API
  const data = await res.json();

  const paths = data.products.map(product => ({
    params: { id: product.id.toString() } // dynamic param must be string
  }));

  return { paths, fallback: 'blocking' };
}


export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`);
    if (!res.ok) return { notFound: true }; // handles invalid IDs
    const product = await res.json();

    return { 
      props: { product },
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function ProductPage({ product }) {
  if (!product) return <p>Loading...</p>; // fallback placeholder

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
