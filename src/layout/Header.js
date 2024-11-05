// Header.js
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

import './css/Header.css'

function Header() {
  return (
    <Navbar expand="lg" className='position-fixed w-100 nav'>
      <Container>
        <Navbar.Brand href="/">Book Search</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
