import ProductList from "./components/ProductList";

const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products.map((product: any) => ({
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
  }));
};

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 style={{fontSize: '40px'}}>Product List</h1>
      <ProductList/>
    </div>
  );
}
