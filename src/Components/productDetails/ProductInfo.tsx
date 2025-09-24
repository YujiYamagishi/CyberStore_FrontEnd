import { useState, useEffect } from 'react';
// Importamos o hook e a tipagem do nosso Context do carrinho
import { useCart, Product } from '../../context/CartContext'; 
import screensizeIcon from '../../assets/screensize.svg';
import cpuIcon from '../../assets/cpu.svg';
import coreIcon from '../../assets/core.svg';
import cameraIcon from '../../assets/camera.svg';
import fcameraIcon from '../../assets/fcamera.svg';
import batteryIcon from '../../assets/battery.svg';
import truckIcon from '../../assets/truck.svg';
import shopIcon from '../../assets/shop.svg';
import shieldCheckIcon from '../../assets/shieldcheck.svg';
import Notification from '../Notification';

export default function ProductInfo({ product }: { product: any }) {
  // Usamos o hook useCart para obter a função addToCart
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1); // Novo estado para a quantidade
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  const handleAddToCart = () => {
    // 1. Coleta os detalhes do produto e suas seleções
    const specs = [
      selectedColor ? `Color: ${selectedColor}` : null,
      selectedStorage ? `Storage: ${selectedStorage}` : null
    ].filter(Boolean).join(', ');

    // 2. Cria o objeto do produto conforme a interface do CartContext
    const productData: Omit<Product, 'quantity'> = {
      // ID Único para cada variação de produto
      id: `${product.id}-${selectedColor || 'none'}-${selectedStorage || 'none'}`, 
      name: product.name,
      specs: specs || 'N/A',
      code: product.code || 'N/A', 
      price: product.discounted_price || product.price,
      imageUrl: product.url_image || '',
    };
    
    // 3. Chama a função global do Context para adicionar ao carrinho
    addToCart(productData, quantity);

    setNotification(`${product.name} adicionado ao carrinho!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToWishlist = () => {
    setNotification('Product added to wishlist!');
    setTimeout(() => setNotification(null), 3000);
  };

  const hasColors = product.colors && product.colors.length > 0;
  const hasStorage = product.storageOptions && product.storageOptions.length > 0;
  const hasSpecs = product.smartphoneSpec !== null && product.smartphoneSpec !== undefined;

  const colorRequirementMet = !hasColors || (hasColors && selectedColor !== null);
  const storageRequirementMet = !hasStorage || (hasStorage && selectedStorage !== null);
  // O botão só é habilitado se a quantidade for maior que zero
  const isButtonEnabled = colorRequirementMet && storageRequirementMet && quantity > 0;

  const thumbnails = product.url_image ? [product.url_image, product.url_image, product.url_image, product.url_image] : [];

  const parseStorage = (storageStr: string) => {
    const value = parseInt(storageStr.replace(/\D/g, ''));
    if (storageStr.toUpperCase().includes('TB')) {
      return value * 1024;
    }
    return value;
  };
  
  const colors = hasColors ? product.colors.map((c: any) => c.hex_code) : [];
  const storageOptions = hasStorage ? [...product.storageOptions].sort((a, b) => parseStorage(a) - parseStorage(b)) : [];

  const specs = {
    screenSize: product.smartphoneSpec?.screen_size || 'N/A',
    cpu: product.smartphoneSpec?.cpu || 'N/A',
    cores: product.smartphoneSpec?.total_cores || 'N/A',
    mainCamera: product.smartphoneSpec?.main_camera || 'N/A',
    frontCamera: product.smartphoneSpec?.front_camera || 'N/A',
    battery: product.smartphoneSpec?.battery || 'N/A'
  };

  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <img src={thumbnails[activeIndex]} alt={product.name} className="gallery-main-image" />
        <div className="gallery-thumbnails">
          {thumbnails.map((thumb: string, index: number) => (
            <div 
              key={index} 
              className={`gallery-thumbnail ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={thumb} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="price-container">
          <p className="current-price">${product.discounted_price || product.price}</p>
          {product.discounted_price && <p className="original-price">${product.price}</p>}
        </div>

        {hasColors && (
          <div className="selection-container">
            <p className="selection-title">Select color:</p>
            <div className="colors">
              {colors.map((color: string) => (
                <button
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {hasStorage && (
          <div className="selection-container">
            <div className="storage-options">
              {storageOptions.map((storage: string) => (
                <button
                  key={storage}
                  className={`storage-button ${selectedStorage === storage ? 'selected' : ''}`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Adicionado: Seletor de quantidade */}
        <div className="selection-container">
          <p className="selection-title">Quantity:</p>
          <div className="quantity-controls">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))} 
              disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
        </div>

        {hasSpecs && (
        <div className="specs-grid">
          <div className="spec-item">
            <img src={screensizeIcon} alt="Screen size" />
            <div className="spec-item-text">
              <span>Screen size</span>
              <strong>{specs.screenSize}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={cpuIcon} alt="CPU" />
            <div className="spec-item-text">
              <span>CPU</span>
              <strong>{specs.cpu}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={coreIcon} alt="Number of Cores" />
            <div className="spec-item-text">
              <span>Number of Cores</span>
              <strong>{specs.cores}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={cameraIcon} alt="Main camera" />
            <div className="spec-item-text">
              <span>Main camera</span>
              <strong>{specs.mainCamera}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={fcameraIcon} alt="Front-camera" />
            <div className="spec-item-text">
              <span>Front-camera</span>
              <strong>{specs.frontCamera}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={batteryIcon} alt="Battery capacity" />
            <div className="spec-item-text">
              <span>Battery capacity</span>
              <strong>{specs.battery}</strong>
            </div>
          </div>
        </div>
        )}

        <p className="product-description">
          {isDescriptionExpanded ? product.description : `${product.description.substring(0, 150)}... `}
          <button className="more-button" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
            {isDescriptionExpanded ? 'less' : 'more...'}
          </button>
        </p>
        
        <div className="action-buttons">
          <button className="wishlist-button" disabled={!isButtonEnabled} onClick={handleAddToWishlist}>Add to Wishlist</button>
          <button className="add-to-cart-button" disabled={!isButtonEnabled} onClick={handleAddToCart}>Add to Cart</button>
        </div>

        <div className="service-info">
          <div className="service-item">
            <div className="service-icon-wrapper">
              <img src={truckIcon} alt="Free Delivery" />
            </div>
            <div className="service-item-text">
              <strong>Free Delivery</strong>
              <span>1-2 day</span>
            </div>
          </div>
          <div className="service-item">
            <div className="service-icon-wrapper">
              <img src={shopIcon} alt="In Stock" />
            </div>
            <div className="service-item-text">
              <strong>In Stock</strong>
              <span>Today</span>
            </div>
          </div>
          <div className="service-item">
            <div className="service-icon-wrapper">
              <img src={shieldCheckIcon} alt="Guaranteed" />
            </div>
            <div className="service-item-text">
              <strong>Guaranteed</strong>
              <span>1 year</span>
            </div>
          </div>
        </div>
      </div>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}
