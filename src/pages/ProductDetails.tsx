import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProductInfo from '../Components/productDetails/ProductInfo';
import Reviews from '../Components/productDetails/Reviews';
import RelatedProducts from '../Components/productDetails/RelatedProducts';
import Breadcrumb from '../Components/Breadcrumb';

import '../styles/product-details.css';

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [reviewsSummary, setReviewsSummary] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productResponse = await axios.get(`http://localhost:8000/api/product/${productId}`);
        const productData = productResponse.data.products;
        setProduct(productData);

        const reviewsSummaryResponse = await axios.get(`http://localhost:8000/api/reviews/summary/${productId}`);
        setReviewsSummary(reviewsSummaryResponse.data.data);

        if (productData.brand) {
          const relatedProductsResponse = await axios.get(`http://localhost:8000/api/products/related/${productData.brand}`);
          setRelatedProducts(relatedProductsResponse.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div className="page-content-wrapper"><p>Loading product...</p></div>;
  }

  if (error) {
    return <div className="page-content-wrapper"><p>Error: {error}</p></div>;
  }

  if (!product) {
    return <div className="page-content-wrapper"><p>Product not found.</p></div>;
  }
  
  const breadcrumbCrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/products' },
    { label: product.id_category === 3 ? 'Smartphones' : 'Category', path: `/products/smartphones` },
    { label: product.brand, path: `/products/${product.brand}` },
    { label: product.name }
  ];

  return (
    <div className="page-content-wrapper">
      <Breadcrumb crumbs={breadcrumbCrumbs} />
      <ProductInfo product={product} />
      <Reviews summary={reviewsSummary} productId={productId} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}