import UserForm from "../../components/UserForm";
import Container from "react-bootstrap/Container";

export default function Form () {
  return (
    <Container fluid>
      <h2>Add new user</h2>
      <UserForm />
    </Container>
  )
}
