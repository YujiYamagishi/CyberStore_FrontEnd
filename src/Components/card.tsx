import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import '../styles/card.css'


type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  image: string;
};

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <div className="related-product-header">
        <Heart size={20} className="heart-icon" />
      </div>
      <img src={image} alt={title} className="product-img" />
      <h4 className="product-title">{title}</h4>
      <p className="product-price">{price}</p>
      <button className="buy-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
}
