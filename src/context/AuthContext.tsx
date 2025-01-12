import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase/firebase";
import { User } from "firebase/auth";

type ContextProps = {
  user: User | null;
  fbAccessToken: string | null;
  setFbAccessToken: (token: string | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [fbAccessToken, setFbAccessToken] = useState<string | null>(localStorage.getItem('fbAccessToken'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setFbAccessToken(null);
        localStorage.removeItem('fbAccessToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateFbAccessToken = (token: string | null) => {
    setFbAccessToken(token);
    if (token) {
      localStorage.setItem('fbAccessToken', token);
    } else {
      localStorage.removeItem('fbAccessToken');
    }
  };

  return (
    <AuthContext.Provider value={{ user, fbAccessToken, setFbAccessToken: updateFbAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
