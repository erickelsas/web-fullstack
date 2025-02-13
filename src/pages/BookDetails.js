import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBookById, fetchAuthorData } from '../services/booksApi';
import Book3d from '../components/Book3d';
import { Container } from 'react-bootstrap';

import { FaUser } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";

import './css/BookDetails.css'
import { BookContext } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';

function BookDetails() {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const { selectedBook } = useContext(BookContext);

  const [book, setBook] = useState(null);

  let { bookId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchBookById(token, bookId);


        if (data) {
          setBook(data);
        } else {
          console.error("Nenhum dado encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      }
    };

    fetchData();
    setLoading(false);
  }, [bookId]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className='left-background'>
      <button className='back' onClick={handleClick}>
        <IoArrowBack />
        Voltar
      </button>
      <Container className='book-details'>
        {loading && (
          <div className='d-flex justify-content-center'>
            <div className="lds-ellipsis">
              <div></div><div></div><div></div><div></div>
            </div>
          </div>
        )}
        {!loading && book && (
          <div className='left-container'>
            <Book3d book={book} />
          </div>
        )}
        {!loading && book && (
          <div className='right-container'>
            <p className='info'>INFO</p>
            <div className='info-container'>
              <div>
                <h1 className='book-title'>{book.title}</h1>
                <div className='author-container'>
                  <div className='image-container'>
                    <FaUser size={48} style={{ position: 'absolute', bottom: 0, left: 8 }} color='#2D92F6' />
                    {book.author && book.author.photoUri && (
                      <img 
                        alt={book.author.name} 
                        className='author-image' 
                        src={book.author.photoUri} 
                      />
                    )}
                  </div>
                  {book && book.author?.name && (
                    <h2 className='author-title'>{book.author.name}</h2>
                  )}
                </div>
              </div>
              <div className='publication-info'>
                {book && book.publish_year && (
                  <p className='publish-date'>Publicado em {book.publish_year}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BookDetails;
