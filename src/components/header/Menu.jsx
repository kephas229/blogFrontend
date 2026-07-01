import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { isLoggedIn } from '../auth/auth';
import LogoutButton from '../auth/LogoutButton';

const Menu = () => {
  const connecte = isLoggedIn();

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm px-4 border-bottom">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="fs-5 fw-bold py-3">BlogFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-lg-flex justify-content-end align-items-center">
          <Nav className="fs-5 align-items-lg-center gap-lg-3">
            {connecte ? (
              <>
                <Nav.Link as={NavLink} to="/admin" className="text-dark">Tableau de bord</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/comments" className="text-dark">Commentaires</Nav.Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-dark">Connexion</Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="text-dark">Inscription</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;