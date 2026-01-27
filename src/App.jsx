import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import About from './components/About';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <About />
      <Tools />
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
