import { useCookies } from "react-cookie";

import SignIn from '../components/SignIn';
import { useAuth } from "../context/auth";
import { useState } from "react";

const Login = () => {

  const [cookies, setCookies] = useCookies();
  const { setAuthToken, setUser } = useAuth();

  const [signinError, setSigninError] = useState("");

  const successfullLogin = async ( token, user ) => {

    
    setCookies("token", token, { maxAge: 3600, sameSite: 'None', secure: true });
    setCookies("user", user, { maxAge: 3600, sameSite: 'None', secure: true });
    setAuthToken(token);
    setUser(user);

    window.location.href = '/invoice';
  }

  const HandleSignin = async ( username, password ) => {

    setSigninError("");
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        reg.update();
      }
    }

    try {
        const requestBody = {
          username: username,
          password: password
      };
      const response = await fetch("https://api-invoice-dev-mjzx.3.us-1.fl0.io/api/auth/sign-in",
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( requestBody )
      });

      const data = await response.json();

      if (response.ok) {
        successfullLogin(data.token, data.user);
      } else {
        setSigninError(data);
      }
    } catch (e) {
      throw e;      
    }
  };

  return (
    <SignIn HandleSignin={HandleSignin} errorMessage = {signinError}/>
  )
}

export default Login