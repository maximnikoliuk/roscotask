import { useContext } from "react";
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/logo.svg';
import { AuthContext } from "../../context/AuthContext.tsx";

function Header() {
  const context = useContext(AuthContext);
  const { user } = context;

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Add something here
      })
      .catch((error) => {
        console.log("Logout error: ", error);
      });
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} alt="logo" width="120" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/form">Form</Nav.Link>
                <Nav.Link as={Link} to="/slider">Slider</Nav.Link>
                <Nav.Link as={Link} to="/list">List</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <Button
                variant="primary"
                onClick={logout}
              >
                Log out
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
