import React, { useState, useEffect } from "react";

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
        
        {}
        <div className="footer-left">
          <h1>cyber</h1>
          <p>
            We are a residential interior design firm located in Portland.
            Our boutique-studio offers more than
          </p>
          {}
          {!isMobile && (
            <div className="social">
              <a href="https://x.com/compassuol">✕</a>
              <a href="https://www.facebook.com/share/177w58QzDs/">📘</a>
              <a href="https://www.linkedin.com/company/compass-uol/">in</a>
              <a href="https://www.instagram.com/compass.uol?igsh=NmwycHI5ZGJzZ2xo">◎</a>
            </div>
          )}
        </div>

        {}
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

        {}
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

        {}
        {isMobile && (
          <div className="social mobile-social">
            <a href="https://x.com/compassuol">✕</a>
            <a href="https://www.facebook.com/share/177w58QzDs/">📘</a>
            <a href="https://www.linkedin.com/company/compass-uol/">in</a>
            <a href="https://www.instagram.com/compass.uol?igsh=NmwycHI5ZGJzZ2xo">◎</a>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
