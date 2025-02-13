import React, { useContext, useEffect, useState, useMemo } from 'react';
import './css/SearchBooks.css';
import SearchForm from '../components/SearchForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { fetchBooks } from '../services/booksApi';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import { Pagination, Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function SearchBooks() {
    const { token } = useAuth();
    const { searchResult, updateSearchResults } = useContext(BookContext);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        publish_year: '',
        coverUri: '',
        authorId: ''
    });
    const [authors, setAuthors] = useState([]);
    const [isNewAuthor, setIsNewAuthor] = useState(false);
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        photoUri: ''
    });

    const handleSearch = async (query, page = 1) => {
        setError('');
        setLoading(true);
        try {
            if (page === 1) {
                setPage(1);
            }

            const res = await fetchBooks(token, query, page, 10);

            if (res.books) {
                updateSearchResults(res.books);
                setTotalPages(res.totalPages);
            } else {
                console.error("Nenhum resultado encontrado.");
                setError('Nenhum livro encontrado.');
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            setError("Erro ao buscar livros");
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
        handleSearch(query, page);
    }, []);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('https://webfullstack-back.onrender.com/authors', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Erro ao buscar autores:', error);
            }
        };
        fetchAuthors();
    }, [token]);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let authorId = newBook.authorId;

            if (isNewAuthor) {
                const authorResponse = await fetch('https://webfullstack-back.onrender.com/authors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newAuthor)
                });
                const authorData = await authorResponse.json();
                if (authorData.id) {
                    authorId = authorData.id;
                } else {
                    console.error('Erro ao criar autor');
                    return;
                }
            }

            const bookResponse = await fetch('https://webfullstack-back.onrender.com/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...newBook, authorId })
            });
            const bookData = await bookResponse.json();
            if (bookData.id) {
                console.log('Livro adicionado com sucesso:', bookData);
            } else {
                console.error('Erro ao adicionar livro');
            }
        } catch (error) {
            console.error('Erro ao criar livro:', error);
        }
        handleCloseModal();
    };

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
            <div className='title-container'>
                <div></div>
                <h1>BookSearch</h1>
                <button className='addButton' onClick={handleShowModal}>+</button>
            </div>
            <SearchForm setError={setError} setQuery={setQuery} onSearch={(query) => handleSearch(query)}/>
            <Row className='books-container'>
                {loading && (<div className='d-flex justify-content-center'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)}
                {error && (<div className='d-flex justify-content-center'><Alert variant='danger'> {error} </Alert></div>)}
                <Row className="justify-content-center gap-3">
                    {!loading && searchResult.map(book => <BookCard key={book.id} book={book}/>)}
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

            {/* Modal de Adição de Livro */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={newBook.title} 
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ano de Publicação</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={newBook.publish_year} 
                                onChange={(e) => setNewBook({ ...newBook, publish_year: e.target.value })}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL da Foto da Capa</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Insira a URL da capa" 
                                value={newBook.coverUri} 
                                onChange={(e) => setNewBook({ ...newBook, coverUri: e.target.value })}
                                required 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Autor</Form.Label>
                            <div>
                                <Form.Check
                                    type="radio"
                                    label="Selecionar Autor Existente"
                                    name="authorType"
                                    checked={!isNewAuthor}
                                    onChange={() => setIsNewAuthor(false)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Adicionar Novo Autor"
                                    name="authorType"
                                    checked={isNewAuthor}
                                    onChange={() => setIsNewAuthor(true)}
                                />
                            </div>
                            {!isNewAuthor ? (
                                <Form.Control 
                                    as="select" 
                                    value={newBook.authorId} 
                                    onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
                                >
                                    <option value="">Selecione</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    ))}
                                </Form.Control>
                            ) : (
                                <div className="mt-2">
                                    <Form.Label>Nome do Autor</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Nome do autor" 
                                        value={newAuthor.name} 
                                        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                        style={{ color: 'white' }}
                                    />
                                    <Form.Label>Foto do Autor</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="URL da foto do autor" 
                                        value={newAuthor.photoUri} 
                                        onChange={(e) => setNewAuthor({ ...newAuthor, photoUri: e.target.value })}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Adicionar Livro
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default SearchBooks;