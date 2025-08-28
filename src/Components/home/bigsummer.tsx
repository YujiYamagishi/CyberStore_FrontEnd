import React from "react";
import summerBg from "../../assets/Banner.png"; 

export default function BigSummer() {
  return (
    <section
      className="big-summer"
      style={{ backgroundImage: `url(${summerBg})` }}
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