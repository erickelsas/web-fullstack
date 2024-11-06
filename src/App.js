import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
