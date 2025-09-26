import React from 'react';

interface CartItemProps {
  id: number; // <-- Ajustei para number, porque no seu CartContext o `id` é number
  name: string;
  specs: string;
  code: string;
  price: number;
  quantity: number;
  image: string;
  
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  specs,
  code,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}) => {
  const totalItemPrice = (price * quantity).toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0
  }).replace('$', '');

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={image} alt={name} />
      </div>
      <div className="item-details">
        <p className="item-name">{name}</p>
        <p className="item-specs">{specs}</p>
        <p className="item-code">#{code}</p>
      </div>
      <div className="item-quantity-controls">
        <button 
          onClick={() => onQuantityChange(id, quantity - 1)} 
          disabled={quantity <= 1}
        >
          –
        </button>
        <span>{quantity}</span>
        <button onClick={() => onQuantityChange(id, quantity + 1)}>+</button>
      </div>
      <div className="item-price-total">
        ${totalItemPrice}
      </div>
      <button className="item-remove-btn" onClick={() => onRemove(id)}>
        &times;
      </button>
    </div>
  );
};

export default CartItem;
