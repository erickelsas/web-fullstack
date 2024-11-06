import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
