import React, { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const updateSearchResults = (books) => {
    setSearchResult(books);
  };

  return (
    <BookContext.Provider value={{ searchResult, updateSearchResults }}>
      {children}
    </BookContext.Provider>
  );
};
