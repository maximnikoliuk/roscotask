import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../../assets/logo.svg';
import { AuthContext } from "../../context/AuthContext.tsx";

function Header () {
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
        <Navbar.Brand href="/">
          <Image src={logo} alt="logo" width="120" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              user ? (
                <>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/form">Form</Nav.Link>
                  <Nav.Link href="/slider">Slider</Nav.Link>
                  <Nav.Link href="/list">List</Nav.Link>
                </>
              ) : (
                ''
              )
            }
            {
              user ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </Button>
              ) : (
                <Nav.Link href="/login">Login</Nav.Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
