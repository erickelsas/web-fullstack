import React, { useContext, useEffect, useState, useMemo } from 'react';

import './css/SearchBooks.css';

import SearchForm from '../components/SearchForm';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { fetchBooks } from '../services/booksApi';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import { Pagination } from 'react-bootstrap';

function SearchBooks() {
    const { searchResult, updateSearchResults } = useContext(BookContext);
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (query, page = 1) => {
        setLoading(true);
        try {
            if (page === 1) {
                setPage(1);
            }
        
            const res = await fetchBooks(query, page);
        
            const books = res.docs;
            const numberOfBooks = res.numFound;

            if (books) {
                updateSearchResults(books);
                setTotalPages(Math.round(numberOfBooks / 20));
            } else {
                console.error("Nenhum resultado encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        } finally {
            setLoading(false);
            setHasSearched(true);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        handleSearch(query, newPage);
    };

    useEffect(() => {
        if (hasSearched && !error) {
            if (searchResult.length === 0) {
                setError('Nenhum livro encontrado.');
            } else {
                setError('');
            }
        }
    }, [searchResult, hasSearched]);

    const maxVisiblePages = 2;

    const { startPage, endPage } = useMemo(() => {
        const start = Math.max(1, page - maxVisiblePages);
        const end = Math.min(totalPages, page + maxVisiblePages);
        return { startPage: start, endPage: end };
    }, [page, totalPages, maxVisiblePages]);

    const paginationItems = useMemo(() => {
        return [...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
                <Pagination.Item 
                    key={pageNumber} 
                    active={pageNumber === page} 
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </Pagination.Item>
            );
        });
    }, [startPage, endPage, page]);

    return (
        <Container className='search-books'>
            <h1>BookSearch</h1>
            <SearchForm setError={setError} setQuery={setQuery} onSearch={(query) => handleSearch(query)}/>
            <Row className='books-container'>
                {loading && (<div className='d-flex justify-content-center'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)}
                {error && (<div className='d-flex justify-content-center'><Alert variant='danger'> {error} </Alert></div>)}
                <Row className="justify-content-center gap-3">
                    {!loading && searchResult.map(book => <BookCard key={book.key} book={book}/>)}
                </Row>
            </Row>
            {!loading && totalPages > 1 && (
                <Row className="justify-content-center mt-3">
                    <Pagination className="justify-content-center">
                        <Pagination.First 
                            onClick={() => handlePageChange(1)} 
                            disabled={page === 1} 
                        />
                        <Pagination.Prev 
                            onClick={() => handlePageChange(page - 1)} 
                            disabled={page === 1} 
                        />

                        {paginationItems}

                        <Pagination.Next 
                            onClick={() => handlePageChange(page + 1)} 
                            disabled={page === totalPages} 
                        />
                        <Pagination.Last 
                            onClick={() => handlePageChange(totalPages)} 
                            disabled={page === totalPages} 
                        />
                    </Pagination>
                </Row>
            )}
        </Container>
    );
}

export default SearchBooks;
