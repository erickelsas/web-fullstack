import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBooks from './pages/SearchBooks';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<SearchBooks />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;