import React, { useState, useEffect } from "react";
import summerMobile from "../../assets/Banner-mobile.png";
import summerDesktop from "../../assets/Banner-desktop.png";

export default function BigSummer() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="big-summer"
      style={{
        backgroundImage: `url(${isDesktop ? summerDesktop : summerMobile})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "500px",
      }}
    >
      <div className="big-summer-text">
        <h2>Big Summer</h2>
        <h1>Sale</h1>
        <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <button className="btn">Shop Now</button>
      </div>
    </section>
  );
}
