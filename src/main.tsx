import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import '../src/styles/home.css';

// Importe sua chave publicável das variáveis de ambiente
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Adicione uma verificação para garantir que a chave foi carregada
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key from .env.local");
}

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

// Renderiza a aplicação
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      {/* Envolva o <App /> com o <ClerkProvider> */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
