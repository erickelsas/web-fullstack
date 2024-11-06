import axios from 'axios'

export const fetchBooks = async(query, page = 1, limit = 20) => {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=seed,author_key,key,title,author_name,cover_edition_key,edition_key,publish_date,publish_year&page=${page}&limit=${limit}`);
    return response.data;
}

export const fetchBookById = async (bookId) => {
    const response = await axios.get(`https://openlibrary.org/books/${bookId}.json`);
    //console.log(response.data)
    return response.data;
}

export const fetchAuthorData = async (authorKey) => {
    const response = await axios.get(`https://openlibrary.org${authorKey}.json`);
    //console.log(response.data);
    return response.data;
}