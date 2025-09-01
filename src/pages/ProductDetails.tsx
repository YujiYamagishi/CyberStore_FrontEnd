import { useParams } from 'react-router-dom';
import ProductInfo from '../Components/productDetails/ProductInfo';
import '../styles/product-details.css';
import Reviews from '../Components/productDetails/Reviews';
import RelatedProducts from '../Components/productDetails/RelatedProducts';

export default function ProductDetails() {
  const { productId } = useParams();

  return (
    <div className="page-content-wrapper">
      <ProductInfo />
      <Reviews />
      <RelatedProducts />
    </div>
  );
}