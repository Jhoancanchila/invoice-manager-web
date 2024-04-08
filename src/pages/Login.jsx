import { useCookies } from "react-cookie";

import SignIn from '../components/SignIn';
import { useAuth } from "../context/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [ cookies, setCookies ]= useCookies();
  const { setAuthToken, setUser } = useAuth();

  const [signinError, setSigninError] = useState("");

  const successfullLogin = async ( token, user ) => {

    let fecha = new Date();
    let tokenExpire = 0;
    fecha.getUTCHours() < 8
      ? (tokenExpire = (8 - fecha.getUTCHours()) * 60 * 60)
      : (tokenExpire = (32 - fecha.getUTCHours()) * 60 * 60);
    setCookies("token", token, { maxAge: tokenExpire, sameSite: 'None', secure: true });
    setCookies("user", user, { maxAge: tokenExpire, sameSite: 'None', secure: true });
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
      const response = await fetch("http://localhost:3001/auth/sign-in",
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