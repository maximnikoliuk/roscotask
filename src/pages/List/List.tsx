import Container from "react-bootstrap/Container";
import Posts from '../../components/Tables/Posts';
import Likes from "../../components/Tables/Likes.tsx";

export default function List () {
  return (
    <Container fluid className="p-3">
      <h1>Facebook likes:</h1>
      <Likes/>
      <h1>Facebook posts:</h1>
      <Posts/>
    </Container>
  );
};
