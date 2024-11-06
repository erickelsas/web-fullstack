import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
    </HashRouter>
  );
}

export default App;
