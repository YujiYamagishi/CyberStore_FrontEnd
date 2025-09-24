import React from 'react';

interface CartItemProps {
  id: string; // Adicionado: O ID é essencial para identificar qual item mudar/remover
  name: string;
  specs: string;
  code: string;
  price: number;
  quantity: number;
  imageUrl: string;
  // Assinaturas atualizadas para passar o ID de volta para o pai
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void; 
}

const CartItem: React.FC<CartItemProps> = ({
  id, // Desestruturando o ID
  name,
  specs,
  code,
  price,
  quantity,
  imageUrl,
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
        <img src={imageUrl} alt={name} />
      </div>
      <div className="item-details">
        <p className="item-name">{name}</p>
        <p className="item-specs">{specs}</p>
        <p className="item-code">#{code}</p>
      </div>
      <div className="item-quantity-controls">
        {/* Passa o ID e a mudança (-1) */}
        <button onClick={() => onQuantityChange(id, -1)} disabled={quantity <= 1}>
          –
        </button>
        <span>{quantity}</span>
        {/* Passa o ID e a mudança (+1) */}
        <button onClick={() => onQuantityChange(id, 1)}>+</button>
      </div>
      <div className="item-price-total">
        ${totalItemPrice}
      </div>
      {/* Passa o ID na remoção */}
      <button className="item-remove-btn" onClick={() => onRemove(id)}>
        &times;
      </button>
    </div>
  );
};

export default CartItem;