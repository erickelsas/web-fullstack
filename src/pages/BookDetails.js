import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBookById, fetchAuthorData } from '../services/booksApi';
import Book3d from '../components/Book3d';
import { Container } from 'react-bootstrap';

import { FaUser } from 'react-icons/fa';
import { IoArrowBack } from "react-icons/io5";

import './css/BookDetails.css'
import { BookContext } from '../context/BookContext';

function BookDetails() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { selectedBook } = useContext(BookContext);

  const [ book, setBook ] = useState(null);
  const [ author, setAuthor ] = useState(null);

  let { bookId } = useParams();

  useEffect(() => {  
    if (selectedBook === null) {
      navigate('/');
    }
    const fetchAuthor = async () => {
      const authorKey = selectedBook.seed.find(item => item.includes('/authors/'));

      if (!authorKey) {
        console.log('Item não tem autor.');
      }

      try{
        const data = await fetchAuthorData(authorKey);

        if(data){
          setAuthor(data);
        } else{
          console.error("Nenhum dado encontrado.");
        }
      }catch (error) {
        console.error("Erro ao buscar o autor:", error);
      }
    }

    if(Array.isArray(selectedBook?.seed)){
      fetchAuthor();
    }  
  }, [selectedBook]);
  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await fetchBookById(bookId);
  
        if (data) {
          const date = new Date(data.publish_date);
          const options = { year: 'numeric', month: 'long', day: '2-digit' };

          data.publish_date = date.toLocaleDateString('pt-BR', options);

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

    navigate('/');
  }
  
  return (
    <div className='left-background'>
      <button className='back' onClick={handleClick}>
        <IoArrowBack />
        Voltar
      </button>
      <Container className='book-details'>
        {loading && (<div className='d-flex justify-content-center'><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)}
        {!loading && book && (<div className='left-container'><Book3d book={book} /></div>)}
        {!loading && book && (
          <div className='right-container'>
            <p className='info'>INFO</p>
            <div className='info-container'>
              <div>
                <h1 className='book-title'>{book.title}</h1>
                <div className='author-container'>
                  <div className='image-container'>
                    <FaUser size={48} style={{position: 'absolute', bottom:0, left: 8}} color='#2D92F6'/>
                    {author && author['key'] !== undefined && <img className='author-image' src={`https://covers.openlibrary.org/a/olid/${author.key.split('/')[2]}-M.jpg`}/>}
                  </div>
                  {author && author['name'] !== undefined && <h2 className='author-title'>{author.name}</h2>}
              </div>
              </div>
              <div className='publication-info'>
                {book && book['publish_date'] !== undefined && <p className='publish-date'>Publicado em {book.publish_date}</p>}
                {book && book['publishers'] !== undefined &&  <p className='publishers'>Publicado por {book.publishers.join(', ')}</p>}
                </div>
            </div>
          </div>
        )}
      </Container>
    </div>

  )
}

export default BookDetails