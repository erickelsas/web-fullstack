import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
