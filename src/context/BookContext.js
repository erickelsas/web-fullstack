import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const updateSearchResults = (books) => {
    setSearchResult(books);
  };

  return (
    <BookContext.Provider value={{ searchResult, updateSearchResults, selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};
