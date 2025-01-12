import Container from "react-bootstrap/Container";

export default function NotFound() {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center p-5">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </Container>
  );
};
