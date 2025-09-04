import { Heart } from "lucide-react";
import "../styles/card.css";

type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  image: string;
};

export default function ProductCard({ id, title, price, image }: ProductCardProps) {
  return (
    <div className="product-card" key={id}>
      <div className="related-product-header">
        <Heart size={20} className="heart-icon" />
      </div>
      <img src={image} alt={title} className="product-img" />
      <h4 className="product-title">{title}</h4>
      <p className="product-price">{price}</p>
      <button className="buy-button">Buy Now</button>
    </div>
  );
}
