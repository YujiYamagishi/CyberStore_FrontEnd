// src/App.tsx
import Navbar from './Components/navbar'
import Hero from './Components/home/hero'
import Browse from './Components/home/browse'
import '../src/styles/index.css'// ou App.css, dependendo de onde está o estilo

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4">
        <Hero />
        <Browse/>
      </main>
    </div>
  );
}

export default App;
