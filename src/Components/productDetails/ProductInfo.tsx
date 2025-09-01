import { useState } from 'react';
import mainImageFromFile from '../../assets/image.svg';
import thumb1 from '../../assets/image57.svg';
import thumb2 from '../../assets/image61.svg';
import thumb3 from '../../assets/image62.svg';
import thumb4 from '../../assets/image63.svg';
import screensizeIcon from '../../assets/screensize.svg';
import cpuIcon from '../../assets/cpu.svg';
import coreIcon from '../../assets/core.svg';
import cameraIcon from '../../assets/camera.svg';
import fcameraIcon from '../../assets/fcamera.svg';
import batteryIcon from '../../assets/battery.svg';
import truckIcon from '../../assets/truck.svg';
import shopIcon from '../../assets/shop.svg';
import shieldCheckIcon from '../../assets/shieldcheck.svg';

const productData = {
  name: 'Apple iPhone 14 Pro Max',
  price: 1399,
  originalPrice: 1499,
  mainImage: mainImageFromFile,
  thumbnails: [
    thumb1,
    thumb2,
    thumb3,
    thumb4
  ],
  colors: ['#000000', '#7B1B9C', '#B10000', '#E1B000', '#E8E8E8'],
  storageOptions: ['128GB', '256GB', '512GB', '1TB'],
  description: 'Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos as in weak, yes and in bright light using the new system with two cameras more...',
  specs: {
    screenSize: '6.7"',
    cpu: 'Apple A16 Bionic',
    cores: '6',
    mainCamera: '48-12-12 MP',
    frontCamera: '12 MP',
    battery: '4323 mAh'
  }
};

export default function ProductInfo() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const areOptionsSelected = selectedColor && selectedStorage;

  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <img src={mainImageFromFile} alt={productData.name} className="gallery-main-image" />
        <div className="gallery-thumbnails">
          {productData.thumbnails.map((thumb, index) => (
            <div key={index} className="gallery-thumbnail">
              <img src={thumb} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{productData.name}</h1>
        <div className="price-container">
          <p className="current-price">${productData.price}</p>
          <p className="original-price">${productData.originalPrice}</p>
        </div>

        <div className="selection-container">
          <p className="selection-title">Select color:</p>
          <div className="colors">
            {productData.colors.map((color) => (
              <button
                key={color}
                className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="selection-container">
          <div className="storage-options">
            {productData.storageOptions.map((storage) => (
              <button
                key={storage}
                className={`storage-button ${selectedStorage === storage ? 'selected' : ''}`}
                onClick={() => setSelectedStorage(storage)}
                disabled={storage === '128GB'}
              >
                {storage}
              </button>
            ))}
          </div>
        </div>

        <div className="specs-grid">
          <div className="spec-item">
            <img src={screensizeIcon} alt="Screen size" />
            <div className="spec-item-text">
              <span>Screen size</span>
              <strong>{productData.specs.screenSize}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={cpuIcon} alt="CPU" />
            <div className="spec-item-text">
              <span>CPU</span>
              <strong>{productData.specs.cpu}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={coreIcon} alt="Number of Cores" />
            <div className="spec-item-text">
              <span>Number of Cores</span>
              <strong>{productData.specs.cores}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={cameraIcon} alt="Main camera" />
            <div className="spec-item-text">
              <span>Main camera</span>
              <strong>{productData.specs.mainCamera}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={fcameraIcon} alt="Front-camera" />
            <div className="spec-item-text">
              <span>Front-camera</span>
              <strong>{productData.specs.frontCamera}</strong>
            </div>
          </div>
          <div className="spec-item">
            <img src={batteryIcon} alt="Battery capacity" />
            <div className="spec-item-text">
              <span>Battery capacity</span>
              <strong>{productData.specs.battery}</strong>
            </div>
          </div>
        </div>

        <p className="product-description">
          {isDescriptionExpanded ? productData.description : `${productData.description.substring(0, 150)}... `}
          <button className="more-button" onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
            {isDescriptionExpanded ? 'less' : 'more...'}
          </button>
        </p>
        
        <div className="action-buttons">
            <button className="wishlist-button" disabled={!areOptionsSelected}>Add to Wishlist</button>
            <button className="add-to-cart-button" disabled={!areOptionsSelected}>Add to Cart</button>
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
    </div>
  );
}