// src/App.jsx
import { Toaster } from 'sonner';
import BlogGenerator from './components/blog-generator/BlogGenerator';
import './App.css';

function App() {
  return (
    <>
      <BlogGenerator />
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </>
  );
}

export default App;