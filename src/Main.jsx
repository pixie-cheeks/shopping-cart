import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import './main.css';

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
