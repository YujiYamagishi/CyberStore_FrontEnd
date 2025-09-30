import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import App from './App';
import '../src/styles/home.css';


const PUBLISHABLE_KEY = "pk_test_aGlwLW11c3RhbmctMy5jbGVyay5hY2NvdW50cy5kZXYk";

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
