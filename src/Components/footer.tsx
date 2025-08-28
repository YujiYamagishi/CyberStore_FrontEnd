import React from 'react';


function Footer() {
  return (
    <footer className="footer">
      
      <h1>cyber</h1>
      <p>
        We are a residential interior design firm located in Portland.
        Our boutique-studio offers more than
      </p>

      
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

     
      <div className="social">
        <a href="#">✕</a>
        <a href="#">📘</a>
        <a href="#">in</a>
        <a href="#">◎</a>
      </div>
    </footer>
  );
}

export default Footer;