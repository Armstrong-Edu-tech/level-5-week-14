export async function getServerSideProps() {
  try {
    const res = await fetch("https://dummyjson.com/posts/1");

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    return { props: { post: data } };
  } catch (error) {
    return { props: { error: "Error loading data." } };
  }
}

export default function SSRPage({ post, error }) {
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>SSR Page</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
