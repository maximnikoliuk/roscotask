import Container from "react-bootstrap/Container";
import Users from "../../components/Tables/Users.tsx";

export default function Home () {
  return (
    <Container fluid className="p-3">
      <h2>User list</h2>
      <Users />
    </Container>
  )
}
