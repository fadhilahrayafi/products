"use client"; // Ensure this is a Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    } else {
      router.push('/'); // Redirect if no product is found
    }
  }, [router]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5 justify-center" style={{width:'100%', justifyContent:'center', display:'flex', flexDirection:'column'}}>
      <h1 className="text-center mb-4">{product.title}</h1>
      <div style={{justifyContent:'center'}}>
        <img src={product.thumbnail} className="img-fluid" alt={product.title} />
      </div>
    </div>
  );
};

export default ProductDetail;