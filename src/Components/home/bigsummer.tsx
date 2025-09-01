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
      style={{
        backgroundImage: `url(${isDesktop ? summerDesktop : summerMobile})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%", // sempre ocupa toda a largura da tela
        minWidth: isDesktop ? "1024px" : "375px", // 👈 mobile parte de 375px
        height: isDesktop ? "448px" : "512px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: isDesktop ? "600px" : "320px",
          padding: "0 12px",
        }}
      >
        <h2
          style={{
            fontSize: isDesktop ? "1.5rem" : "1.25rem",
            fontWeight: 300,
            marginBottom: "6px",
          }}
        >
          Big Summer
        </h2>
        <h1
          style={{
            fontSize: isDesktop ? "2.5rem" : "2rem",
            fontWeight: 700,
            marginBottom: "12px",
            lineHeight: 1.1,
          }}
        >
          Sale
        </h1>
        <p
          style={{
            fontSize: isDesktop ? "0.9rem" : "0.85rem",
            color: "#e6e6e6",
            margin: "0 auto 20px",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>
        <button
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #fff",
            padding: isDesktop ? "8px 20px" : "10px 22px",
            fontSize: isDesktop ? "14px" : "13px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Shop Now
        </button>
      </div>
      <div
        style={{
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </section>
  );
}
