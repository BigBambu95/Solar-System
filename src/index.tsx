import { createRoot } from 'react-dom/client';
import App from './ui/App'


const root = createRoot(document.getElementById('container')!);
root.render(<App />);
