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
                <NavDropdown.Item href='/analytics1'>Charts 1</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to="/calendar"><Nav.Link>Calendar</Nav.Link></LinkContainer>
              <LinkContainer to="/swarmplot"><Nav.Link>Swarmplot</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Top;