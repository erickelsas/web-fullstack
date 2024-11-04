import React, { useContext, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { BookContext } from '../context/BookContext';

function SearchForm({ onSearch, setError, setQuery }) {
  const searchRef = useRef(null);
  const { searchResult, updateSearchResults } = useContext(BookContext);

  const handleSearchClick = () => {
    const query = searchRef.current.value.trim();
    if (query.length < 3) {
      setError('O título deve ter pelo menos 3 letras.');
      updateSearchResults([]);
      return;
    }

    setQuery(query);
    setError('');
    onSearch(query);
  };

  return (
      <Stack direction="horizontal" gap={3} className="mb-4">
        <Form.Control
          type="text"
          placeholder="Insira o título do livro que deseja buscar"
          id="inputName"
          ref={searchRef}
        />
        <Button variant="primary" onClick={handleSearchClick}>
          Buscar
        </Button>
      </Stack>
  );
}

export default SearchForm;
