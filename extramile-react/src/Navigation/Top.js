import { Navbar, Container, Nav } from 'react-bootstrap';
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
              <LinkContainer to="/bar"><Nav.Link>Bar Chart</Nav.Link></LinkContainer>
              <LinkContainer to="/pie"><Nav.Link>Pie Chart</Nav.Link></LinkContainer>
              <LinkContainer to="/calendar"><Nav.Link>Calendar Heatmap</Nav.Link></LinkContainer>
              <LinkContainer to="/swarmplot"><Nav.Link>Swarmplot</Nav.Link></LinkContainer>
              <LinkContainer to="/statesMap"><Nav.Link>States Map</Nav.Link></LinkContainer>
              <LinkContainer to="/countiesMap"><Nav.Link>County Map</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Top;