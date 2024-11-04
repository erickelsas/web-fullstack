// Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

import './css/Footer.css'

function Footer() {
  return (
    <footer className="text-center position-absolute bottom-0 w-100">
      <Container>
        <p>© {new Date().getFullYear()} Book Search. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}

export default Footer;
