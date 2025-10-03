import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '@clerk/clerk-react';
import Notification from '../Notification';

const baseURL = 'https://cyber-imgs-bucket.s3.us-east-2.amazonaws.com/';

const screensizeIcon = `${baseURL}screensize.svg`;
const cpuIcon = `${baseURL}cpu.svg`;
const coreIcon = `${baseURL}core.svg`;
const cameraIcon = `${baseURL}camera.svg`;
const fcameraIcon = `${baseURL}fcamera.svg`;
const batteryIcon = `${baseURL}battery.svg`;
const truckIcon = `${baseURL}truck.svg`;
const shopIcon = `${baseURL}shop.svg`;
const shieldCheckIcon = `${baseURL}shieldcheck.svg`;

export default function ProductInfo({ product }: { product: any }) {
  if (!product) return <div>Loading product information...</div>;

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const { addToCart, isLoading } = useCart();
  const { isSignedIn } = useAuth();

  useEffect(() => setActiveIndex(0), [product]);

  const hasColors = product.colors && product.colors.length > 0;
  const hasStorage = product.storageOptions && product.storageOptions.length > 0;
  const hasSpecs = product.smartphoneSpec !== null && product.smartphoneSpec !== undefined;

  const colorRequirementMet = !hasColors || (hasColors && selectedColor !== null);
  const storageRequirementMet = !hasStorage || (hasStorage && selectedStorage !== null);

  const thumbnails = product.url_image ? [product.url_image, product.url_image, product.url_image, product.url_image] : [];

  const parseStorage = (storageStr: string) => {
    if (!storageStr) return 0;
    const value = parseInt(storageStr.replace(/\D/g, ''));
    if (storageStr.toUpperCase().includes('TB')) return value * 1024;
    return value;
  };

  const colors = hasColors ? product.colors.map((c: any) => c.hex_code) : [];
  const storageOptions = hasStorage
    ? [...product.storageOptions].sort((a: string, b: string) => parseStorage(a) - parseStorage(b))
    : [];

  const specs = {
    screenSize: product.smartphoneSpec?.screen_size || 'N/A',
    cpu: product.smartphoneSpec?.cpu || 'N/A',
    cores: product.smartphoneSpec?.total_cores || 'N/A',
    mainCamera: product.smartphoneSpec?.main_camera || 'N/A',
    frontCamera: product.smartphoneSpec?.front_camera || 'N/A',
    battery: product.smartphoneSpec?.battery || 'N/A'
  };

  const handleAddToCart = async () => {
    if (isLoading) return;

    if (!colorRequirementMet || !storageRequirementMet) {
      setNotification('Please select color and storage before adding to cart.');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.discounted_price || product.price,
      image: product.url_image,
      selectedColor,
      selectedStorage,
      quantity: 1,
      specs: product.smartphoneSpec?.screen_size || '',
      code: product.id.toString(),
    };

    if (!isSignedIn) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(itemToAdd);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setNotification('Product added to cart!');
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    try {
      await addToCart(itemToAdd as any, 1);
      setNotification('Product added to cart!');
      setTimeout(() => setNotification(null), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setNotification('Error adding product. Please try again.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleAddToWishlist = () => {
    if (!colorRequirementMet || !storageRequirementMet) {
      setNotification('Please select color and storage before adding to wishlist.');
      setTimeout(() => setNotification(null), 3000);
      return;
    }
    setNotification('Product added to wishlist!');
    setTimeout(() => setNotification(null), 3000);
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
        {hasSpecs && (
          <div className="specs-grid">
            <div className="spec-item"><img src={screensizeIcon} alt="Screen size" /><div><span>Screen size</span><strong>{specs.screenSize}</strong></div></div>
            <div className="spec-item"><img src={cpuIcon} alt="CPU" /><div><span>CPU</span><strong>{specs.cpu}</strong></div></div>
            <div className="spec-item"><img src={coreIcon} alt="Number of Cores" /><div><span>Number of Cores</span><strong>{specs.cores}</strong></div></div>
            <div className="spec-item"><img src={cameraIcon} alt="Main camera" /><div><span>Main camera</span><strong>{specs.mainCamera}</strong></div></div>
            <div className="spec-item"><img src={fcameraIcon} alt="Front-camera" /><div><span>Front-camera</span><strong>{specs.frontCamera}</strong></div></div>
            <div className="spec-item"><img src={batteryIcon} alt="Battery capacity" /><div><span>Battery capacity</span><strong>{specs.battery}</strong></div></div>
          </div>
        )}

        
        <div className="product-description">
          <span>
            {isDescriptionExpanded ? product.description : `${product.description?.substring(0, 150) || ''}... `}
          </span>
          {product.description && product.description.length > 150 && (
            <button className="more-button" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
              {isDescriptionExpanded ? ' less' : ' more...'}
            </button>
          )}
        </div>
        

        <div className="action-buttons">
          <button className="wishlist-button" onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            {isLoading ? 'Loading...' : 'Add to Cart'}
          </button>
        </div>

        <div className="service-info">
          <div className="service-item"><div><img src={truckIcon} alt="Free Delivery" /></div><div><strong>Free Delivery</strong><span>1-2 day</span></div></div>
          <div className="service-item"><div><img src={shopIcon} alt="In Stock" /></div><div><strong>In Stock</strong><span>Today</span></div></div>
          <div className="service-item"><div><img src={shieldCheckIcon} alt="Guaranteed" /></div><div><strong>Guaranteed</strong><span>1 year</span></div></div>
        </div>
      </div>

      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
    </div>
  );
}