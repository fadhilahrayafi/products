"use client"; // Ensure this is a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (product: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    router.push(`/products/${product.id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card" onClick={() => handleClick(product)}>
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .card-img-top {
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default ProductList;