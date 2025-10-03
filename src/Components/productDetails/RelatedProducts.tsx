import ProductCard from "../card";
export default function RelatedProducts({ products }: { products: any[] }) {
  return (
    <section className="related-products-section">
      <h2 className="section-title">Related Products</h2>
      <div className="related-products-grid">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            price={`$${product.price}`}
            image={product.url_image}
          />
        ))}
      </div>
    </section>
  );
}
