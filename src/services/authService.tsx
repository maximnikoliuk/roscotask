import { auth, facebookProvider } from '../firebase/firebase';
import { signInWithPopup, FacebookAuthProvider, OAuthCredential, UserCredential } from "firebase/auth";

interface SignInResult {
  user: UserCredential['user'];
  token: string | null | undefined;
}

export const signInWithFacebook = async (): Promise<SignInResult | null> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result) as OAuthCredential;
    const accessToken = credential ? credential.accessToken : null;
    return { user, token: accessToken };
  } catch (error) {
    console.error('Error during Facebook sign-in:', error);
    return null;
  }
};
