import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import iphone from "../../assets/iphone.png";
import iphoneDesktop from "../../assets/iphone-desktop.png";
import airpods from "../../assets/airpods.png";
import airpodsDesktop from "../../assets/airpods-desktop.png";
import visionpro from "../../assets/visionpro.png";
import visionproDesktop from "../../assets/visionpro-desktop.png";
import playstation from "../../assets/playstation.png";
import playstationDesktop from "../../assets/playstation-desktop.png";
import macbook from "../../assets/macbook.png";
import macbookDesktop from "../../assets/macbook-desktop.png";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToCategory = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="hero-container">
      <section className="iphone">
        {isDesktop ? (
          <>
            <div className="iphone-text">
              <p className="subtitle">Pro. Beyond.</p>
              <h2>
                IPhone 14 <span>Pro</span>
              </h2>
              <p className="desc">
                Created to change everything for the better. For everyone.
              </p>
              <button
                className="btn-iphone"
                onClick={() => goToCategory("Phones")}
              >
                Shop Now
              </button>
            </div>
            <img
              src={isDesktop ? iphoneDesktop : iphone}
              alt="iPhone 14 Pro"
            />
          </>
        ) : (
          <>
            <img
              src={isDesktop ? iphoneDesktop : iphone}
              alt="iPhone 14 Pro"
            />
            <div className="iphone-text">
              <p className="subtitle">Pro. Beyond.</p>
              <h2>
                IPhone 14 <span>Pro</span>
              </h2>
              <p className="desc">
                Created to change everything for the better. For everyone.
              </p>
              <button
                className="btn-iphone"
                onClick={() => goToCategory("Phones")}
              >
                Shop Now
              </button>
            </div>
          </>
        )}
      </section>

      <section className="airpods">
        <img
          src={isDesktop ? airpodsDesktop : airpods}
          alt="AirPods Max"
        />
        <div className="text">
          <h3>
            Apple AirPods <span>Max</span>
          </h3>
          <p>Computational audio. Listen, it’s powerful</p>
        </div>
      </section>

      <section className="visionpro">
        <img
          src={isDesktop ? visionproDesktop : visionpro}
          alt="Apple Vision Pro"
        />
        <div className="text">
          <h3>
            Apple Vision <span>Pro</span>
          </h3>
          <p>An immersive way to experience entertainment</p>
        </div>
      </section>

      <section className="playstation">
        <img
          src={isDesktop ? playstationDesktop : playstation}
          alt="Playstation 5"
        />
        <div className="text">
          <h3>
            Playstation <span>5</span>
          </h3>
          <p>
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will
            redefine your PlayStation experience.
          </p>
        </div>
      </section>

      <section className="macbook">
        <img
          src={isDesktop ? macbookDesktop : macbook}
          alt="Macbook Air"
        />
        <div className="text">
          <h3>
            Macbook <span>Air</span>
          </h3>
          <p>
            The new 15-inch MacBook Air makes room for more of what you love
            with a spacious Liquid Retina display.
          </p>
          <button
            className="btn-mac"
            onClick={() => goToCategory("Notebooks")}
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}
