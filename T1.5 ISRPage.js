export async function getStaticProps() {
  try {
    const res = await fetch("https://dummyjson.com/posts/2");

    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();

    return {
      props: { post: data },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: { error: "Failed to load content." },
      revalidate: 10,
    };
  }
}

export default function ISRPage({ post, error }) {
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>ISR Page</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
