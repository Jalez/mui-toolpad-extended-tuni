/** @format */
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

(async () => {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./LMSToolpad/mocks/browser');
    await worker.start();
    console.log('Mock service worker started');
  }

  // Render the app after MSW has started
  createRoot(document.getElementById('root')!).render(<App />);
})();
