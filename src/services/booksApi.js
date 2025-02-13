import axios from 'axios';

export const fetchBooks = async (token, query = '', page = 1, limit = 20) => {
  const response = await axios.get(`https://webfullstack-back.onrender.com/books?page=${page}&pageSize=${limit}&title=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchBookById = async (token, bookId) => {
  const response = await axios.get(`https://webfullstack-back.onrender.com/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchAuthorData = async (token, authorId) => {
  const response = await axios.get(`https://webfullstack-back.onrender.com/authors/${authorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};