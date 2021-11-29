import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Top = () => {
    return (
      <Navbar collapseOnSelect bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Extramile</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark" />
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="search"><Nav.Link>Search</Nav.Link></LinkContainer>
              <NavDropdown menuVariant="dark" title='Charts'>
                <NavDropdown.Item href='/analytics1'>Charts</NavDropdown.Item>
                <NavDropdown.Item href='/calendar'>Calendar</NavDropdown.Item>
                <NavDropdown.Item href='/swarmplot'>Swarm Plot</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Top;