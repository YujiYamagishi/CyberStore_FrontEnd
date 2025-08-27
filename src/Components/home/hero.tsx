import iphone from '../../assets/iphone.png'
import airpods from '../../assets/airpods.png'
import visionpro from '../../assets/visionpro.png'
import playstation from '../../assets/playstation.png'
import macbook from '../../assets/macbook.png'

export default function Hero() {
  return (
    <>
      {/* Hero iPhone */}
      <section className="iphone">
        <div className="iphone-text">
          <p className="subtitle">Pro. Beyond.</p>
          <h2>
            IPhone 14 <span>Pro</span>
          </h2>
          <p className="desc">Created to change everything for the better. For everyone.</p>
          <button className="btn">Shop Now</button>
        </div>
        <img src={iphone} alt="iPhone 14 Pro" />
      </section>

      {/* Product AirPods */}
      <section className="airpods">
        <img src={airpods} alt="AirPods Max" />
        <h3>
          Apple <span>AirPods Max</span>
        </h3>
        <p>Computational audio. Listen, it’s powerful</p>
      </section>

      {/* Product Vision Pro */}
      <section className="visionpro">
        <img src={visionpro} alt="Apple Vision Pro" />
        <h3>
          Apple Vision <span>Pro</span>
        </h3>
        <p>An immersive way to experience entertainment</p>
      </section>

      {/* Playstation */}
      <section className="playstation">
        <img src={playstation} alt="Playstation 5" />
        <h3>Playstation 5</h3>
        <p>
          Incredibly powerful CPU, GPU, and an SSD with integrated I/O will
          redefine your PlayStation experience.
        </p>
      </section>

      {/* Macbook */}
      <section className="macbook">
        <img src={macbook} alt="Macbook Air" />
        <h3>Macbook Air</h3>
        <p>
          The new 15-inch MacBook Air makes room for more of what you love with
          a spacious Liquid Retina display.
        </p>
        <button className="btn-mac">Shop Now</button>
      </section>
    </>
  );
}
