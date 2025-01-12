import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { User } from "firebase/auth";

type ContextProps = {
  user: User | null;
  fbAccessToken: string | null;
  setFbAccessToken: (token: string | null) => void;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as User | null);
  const [fbAccessToken, setFbAccessToken] = useState<string | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });
  }, [auth.currentUser]);

  return (
      <AuthContext.Provider value={{ user, fbAccessToken, setFbAccessToken }}>
        { children }
      </AuthContext.Provider>
  );
};
