import axios from 'axios'

export const fetchBooks = async(query, page = 1, limit = 20) => {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,cover_edition_key,edition_key,publish_date,publish_year&page=${page}&limit=${limit}`);
    return response.data;
}
