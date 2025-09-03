import React, { useState, useEffect } from "react";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-left">
          <h1>cyber</h1>
          <p>
            We are a residential interior design firm located in Portland.
            Our boutique-studio offers more than
          </p>
          {!isMobile && (
            <div className="social">
              <a href="https://x.com/compassuol" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://www.facebook.com/share/177w58QzDs/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/company/compass-uol/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/compass.uol?igsh=NmwycHI5ZGJzZ2xo" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          )}
        </div>

        <div className="footer-section">
          <h2>Services</h2>
          <ul>
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Assistance to the buyer</h2>
          <ul>
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>

        {isMobile && (
          <div className="social mobile-social">
            <a href="https://x.com/compassuol" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://www.facebook.com/share/177w58QzDs/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/company/compass-uol/" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/compass.uol?igsh=NmwycHI5ZGJzZ2xo" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
