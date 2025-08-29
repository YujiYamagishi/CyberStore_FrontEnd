
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import '../src/styles/index.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App'; 
import '../src/styles/index.css'; 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);