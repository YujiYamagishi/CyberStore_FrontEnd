import { useState } from 'react';
import { Smartphone, Cpu, HardDrive, Camera, Battery, ShieldCheck, Truck, Store } from 'lucide-react';

const productData = {
  name: 'Apple iPhone 14 Pro Max',
  price: 1399,
  originalPrice: 1499,
  mainImage: 'https://www.reliancedigital.in/medias/Apple-iPhone-14-Pro-Max-Mobile-Phone-493177919-i-1-1200x1200-Reprocessed-1200x1200.jpg?context=bWFzdGVyfGltYWdlc3w0NTQyNTR8aW1hZ2UvanBlZ3xpbWFnZXMvaGY3L2gwMC85ODk4NzYxMzczNTk4LmpwZ3w1MGE0NGYxNmI4ODQ3ZDBjN2MyNTg1NjNiZmI5YWEwZjE5ZjRkZDI3YTQzNmVjNmM2NDhmZmU5ZmI5Y2M0ZDVj',
  thumbnails: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703840578',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-gold?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703840519',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-silver?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703840595',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703840551'
  ],
  colors: ['#58565a', '#e4d6c9', '#f0f2f2', '#302f2d'],
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

  const areOptionsSelected = selectedColor && selectedStorage;

  return (
    <div className="product-details-container">
      <div className="product-gallery">
        <img src={productData.mainImage} alt={productData.name} className="gallery-main-image" />
        <div className="gallery-thumbnails">
          {productData.thumbnails.map((thumb, index) => (
            <img key={index} src={thumb} alt={`Thumbnail ${index + 1}`} className="gallery-thumbnail" />
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
              >
                {storage}
              </button>
            ))}
          </div>
        </div>

        <div className="specs-grid">
          <div className="spec-item"><Smartphone size={18} /> <strong>Screen size:</strong> {productData.specs.screenSize}</div>
          <div className="spec-item"><Cpu size={18} /> <strong>CPU:</strong> {productData.specs.cpu}</div>
          <div className="spec-item"><HardDrive size={18} /> <strong>Number of Cores:</strong> {productData.specs.cores}</div>
          <div className="spec-item"><Camera size={18} /> <strong>Main camera:</strong> {productData.specs.mainCamera}</div>
          <div className="spec-item"><Camera size={18} /> <strong>Front-camera:</strong> {productData.specs.frontCamera}</div>
          <div className="spec-item"><Battery size={18} /> <strong>Battery capacity:</strong> {productData.specs.battery}</div>
        </div>

        <p className="product-description">{productData.description}</p>
        
        <div className="action-buttons">
            <button className="wishlist-button" disabled={!areOptionsSelected}>Add to Wishlist</button>
            <button className="add-to-cart-button" disabled={!areOptionsSelected}>Add to Cart</button>
        </div>

        <div className="service-info">
          <div className="service-item"><Truck size={20} /> Free Delivery 1-2 day</div>
          <div className="service-item"><Store size={20} /> In Stock Today</div>
          <div className="service-item"><ShieldCheck size={20} /> Guaranteed 1 year</div>
        </div>
      </div>
    </div>
  );
}