import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

function Products() {
  return (
    <div className="app">
      {/* Navbar no topo */}
      <Navbar />

      {/* Conteúdo da página */}
      <main className="content">
        <h1>Produtos</h1>
        <p>Aqui você vai listar os produtos da API...</p>
      </main>

      {/* Footer no fim */}
      <Footer />
    </div>
  );
}

export default Products;
