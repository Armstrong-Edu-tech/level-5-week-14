// pages/products/[id].js
export async function getStaticPaths() {
 
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json(); // data.products contains the array

  
  const paths = data.products.map((product) => ({
    params: { id: product.id.toString() }, 
  }));

  return {
    paths,          
    fallback: false 
  };
}

export async function getStaticProps({ params }) {

  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: { product },
  };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
