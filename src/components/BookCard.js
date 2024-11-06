import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

import './css/BookCard.css'
import { BookContext } from '../context/BookContext';

function BookCard({ book }) {
  const { setSelectedBook } = useContext(BookContext);

  const [ coverUrl, setCoverUrl ] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedBook(book);
    console.log(book);
    if(book.cover_edition_key !== undefined){
      navigate(`/book/${book.cover_edition_key}`);
    } else {
      navigate(`/book/${book.edition_key[0]}`)
    }
  }

  useEffect(() => {
      const getCover = () => {
          if (book.cover_edition_key) {
            setCoverUrl(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`);
          }
      };

      getCover();
  }, [book.cover_edition_key]);

  return (
    <Card style={{ maxWidth: '18rem' }} className="cardContainer" onClick={handleClick}>
        
          {coverUrl && (<div className='card-image-container'>
          <Card.Img variant="top" src={coverUrl} alt={book.title} />
        </div>)}
        
        <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <p><strong>Autor:</strong> {book.author_name?.join(', ') || 'Desconhecido'}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p><strong>Ano de publicação:</strong> {Array.isArray(book.publish_date) && book.publish_date.length > 0 
                                                                ? book.publish_date[0] 
                                                                : book.publish_date || 'Indisponível'}</p>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  );
}

export default BookCard;
