import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand className="text-white">Hősök</Navbar.Brand>
        <Nav>
          <Nav.Link href="/heroes" className="text-white">
            Hősök listája
          </Nav.Link>
          <Nav.Link href="/cart" className="text-white">
            Kosár
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
