import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaFacebook } from 'react-icons/fa';
import { signInWithFacebook } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import { auth } from "../../firebase/firebase.tsx";
import { showSnackbar } from "../../redux/sliceNotifs.tsx";
import { useAppDispatch } from "../../redux/store.tsx";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setFbAccessToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleFacebookLogin = async () => {
    const result = await signInWithFacebook();
    if (result && result.token && setFbAccessToken) {
      setFbAccessToken(result.token);
      navigate('/list');
    } else {
      console.log('Facebook login failed');
    }
  };

  const handleEmailPasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error: any) {
      console.log('Email/password login failed:', error);
      dispatch(showSnackbar({
        variant: 'danger',
        message: error?.message || 'Sign in error'
      }));
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center p-5">
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h1 className="text-center">Login</h1>
        <Form noValidate validated={validated} onSubmit={handleEmailPasswordLogin}>
          <Row className="mb-3">
            <Form.Group as={Col} md={{ span: 6, offset: 3 }} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={{ span: 6, offset: 3 }} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Login with Email
            </Button>
          </div>
        </Form>
        <div className="divider">OR</div>
        <div className="text-center mt-3">
          <Button
            variant="primary"
            size="lg"
            className="facebook-button"
            onClick={handleFacebookLogin}
          >
            <FaFacebook style={{ marginRight: '8px' }} />
            Login with Facebook
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
