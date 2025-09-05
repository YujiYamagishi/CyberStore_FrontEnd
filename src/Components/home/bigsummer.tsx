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
        width: "100%",          
        minWidth: "100%",       
        height: isDesktop ? "448px" : "512px",
        margin: 0,             
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
        {isDesktop ? (
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 300,
              marginBottom: "12px",
              lineHeight: 1.2,
              color: "#ddd",
            }}
          >
            Big Summer{" "}
            <span
              style={{
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Sale
            </span>
          </h1>
        ) : (
          <>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 300,
                marginBottom: "6px",
              }}
            >
              Big Summer
            </h2>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              Sale
            </h1>
          </>
        )}

        <p
          style={{
            fontSize: isDesktop ? "0.9rem" : "0.85rem",
            color: "#ccc",
            margin: "0 auto 20px",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          Commodo fames vitae vitae leo mauris in. Eu consequat.
        </p>

        <button
          style={{
            width: "191px",
            height: "56px",
            backgroundColor: "transparent",
            color: "#fff",
            border: "1px solid #fff",
            fontSize: isDesktop ? "14px" : "13px",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
