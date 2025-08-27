
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // importa o componente App
import '../src/styles/index.css'; // seu CSS global

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

