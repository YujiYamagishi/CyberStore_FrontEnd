import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import popular from "../../assets/popular.png";
import ipad from "../../assets/ipadpro.png";
import galaxy from "../../assets/galaxy-samsung.png";
import macbook from "../../assets/macbook.png";

const products = [
  {
    id: 1,
    title: "Popular Products",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    images: [popular],
    background: "#fff",
    color: "#000",
    buttonWhite: false,
    category: "All",
  },
  {
    id: 2,
    title: "Ipad Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    images: [ipad],
    background: "#F9F9F9",
    color: "#000",
    buttonWhite: false,
    category: "Tablets",
  },
  {
    id: 3,
    title: "Samsung Galaxy",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    images: [galaxy],
    background: "#EAEAEA",
    color: "#000",
    buttonWhite: false,
    category: "Phones",
  },
  {
    id: 4,
    title: "Macbook Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    images: [macbook],
    background: "#2C2C2C",
    color:"white",
    buttonWhite: true,
    category: "Notebooks",
  },
];

export default function ProductsNavigation() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShopNow = (category: string) => {
    if (category === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  if (isDesktop) {
    return (
      <section className="product-grid-wrapper">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-grid-card"
            style={{
              backgroundColor: product.background,
              color: product.color,
            }}
          >
            <div className="product-grid-images">
              {product.images.map((img, i) => (
                <img key={i} src={img} alt={product.title} />
              ))}
            </div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <button
              className="product-grid-button"
              style={
                product.buttonWhite
                  ? {
                      backgroundColor: product.background,
                      color: "#fff",
                      border: `1px solid #ffffffff`,
                    }
                  : {}
              }
              onClick={() => handleShopNow(product.category)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="product-mobile-scroll-container">
      <div className="product-scroll-wrapper">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-mobile-container"
            style={{
              backgroundColor: product.background,
              color: product.color,
            }}
          >
            <div className="product-nav-images">
              {product.images.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`${product.title} image ${i + 1}`}
                  className="product-image"
                />
              ))}
            </div>

            <h2>{product.title}</h2>
            <p>{product.description}</p>

            <button
              className="button-product-nav"
              style={
                product.buttonWhite
                  ? {
                      backgroundColor: product.background,
                      color: "#fff",
                      border: `1px solid #fff`,
                    }
                  : {}
              }
              onClick={() => handleShopNow(product.category)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}