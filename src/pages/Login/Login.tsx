import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import { FaFacebook } from 'react-icons/fa';
import { signInWithFacebook } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext.tsx';
import Container from "react-bootstrap/Container";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setFbAccessToken } = useContext(AuthContext);

  const handleFacebookLogin = async () => {
    const result = await signInWithFacebook();
    if (result && result.token && setFbAccessToken) {
      setFbAccessToken(result.token);
      navigate('/list');
    } else {
      console.log('Facebook login failed');
    }
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center p-5">
      <h1>Login</h1>
      <Button
        variant="primary"
        size="lg"
        className="facebook-button"
        onClick={handleFacebookLogin}
      >
        <FaFacebook style={{ marginRight: '8px' }} />
        Login with Facebook
      </Button>
    </Container>
  );
};

export default Login;
