import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import './css/BookCard.css'

function BookCard({ book }) {
  return (
    <Card style={{ maxWidth: '18rem' }} className="cardContainer">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Autor:</strong> {book.author_name?.join(', ') || 'Desconhecido'}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Ano de publicação:</strong> {Array.isArray(book.publish_year) && book.publish_year.length > 0 
                                                        ? book.publish_year[0] 
                                                        : book.publish_year || 'Indisponível'}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
