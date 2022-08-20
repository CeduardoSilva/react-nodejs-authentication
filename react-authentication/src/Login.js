import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";

import axios from './api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  // Focus the user input field when the component is mounted.
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // Clear the error message when the user starts typing.
  useEffect(() => {
    setErr("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({
            user,
            pwd
        }), {
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            }
        });

        console.log(JSON.stringify(response?.data));

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;

        setAuth({ user, pwd, roles, accessToken });
        setSuccess(true);
        setUser("");
        setPwd("");

    } catch (err) {

        if(!err?.response) {
            setErr("Error: No response from server.");
        } else if(err.response?.status === 400) { 
            setErr("Error: Invalid username or password.");
        } else if(err.response?.status === 401) {
            setErr("Error: Unauthorized.");
        } else {
            setErr("Error: Unknown error.");
        }
        errRef.current.focus();
    }
    
  };

  return success ? (
    <p>You're logged in!</p>
  ) : (
    <section>
      <p
        ref={errRef}
        className={err ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {err}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>{" "}
        {/* No need to use onClick event handler here. */}
      </form>
    </section>
  );
};

export default Login;
