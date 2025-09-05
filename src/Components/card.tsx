import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/card.css";

type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  image?: string; // pode vir vazio
};

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${id}`);
  };

  // fallback se não vier imagem da API
  const fallbackImage =
    "https://via.placeholder.com/180x180.png?text=No+Image";

  return (
    <div className="product-card">
      <div className="card-header">
        <Heart size={20} className="heart-icon" />
      </div>
      <img
        src={image && image.trim() !== "" ? image : fallbackImage}
        alt={title}
        className="product-img"
      />
      <h4 className="product-title">{title}</h4>
      <p className="product-price">{price}</p>
      <button className="buy-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
}
 