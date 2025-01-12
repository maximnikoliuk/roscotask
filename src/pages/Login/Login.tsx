
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithFacebook } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext.tsx';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setFbAccessToken } = useContext(AuthContext);

  const handleFacebookLogin = async () => {
    const result = await signInWithFacebook();
    if (result && result.token ) {
      if (setFbAccessToken) {
        setFbAccessToken(result.token);
      }
      navigate('/list');
    } else {
      console.log('Facebook login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;
