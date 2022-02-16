import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import validator from "validator";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState("");

  const handleSignup = async () => {
    let user = JSON.parse(localStorage.getItem(email));
    if (user) {
      if (user.password === password) {
        setUser(user);
      } else {
        setLoginError("wrong password");
      }
    } else {
      let data = {
        email: email,
        password: password,
      };
      let response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let result = await response.json();
      console.log(result);
      if (response.status !== 200){
        throw new Error("user not present")
      }
      else {
        user = {
          email:email,
          password:password,
          drivers:[]
        }
        setUser(user);
        localStorage.setItem(
          email,
          JSON.stringify(user)
        );
      }
    }
    if (!validator.isEmail(email)) {
      setLoginError("Enter valid Email!");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-25 h-75 border rounded d-flex flex-column m-2">
        <h4 className="p-2 m-1 d-flex justify-content-center font-weight-bold text-secondary ">
          LOGIN
        </h4>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-1 m-3 rounded bg-light border border-light"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="p-1 m-3 rounded bg-light border border-light"
        />
        <div className="d-flex justify-content-center align-center">
          <button
            onClick={() => handleSignup()}
            type="button"
            className="btn btn-primary p-1 m-3 w-25 rounded "
          >
            {user ? (
              <Link to="/dashboard" className="text-white text-decoration-none">
                Sign In
              </Link>
            ) : <span>Sign In</span>

                }
          </button>
        </div>
        <div className="d-flex justify-content-center text-secondary p-1 m-1">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Create one
          </Link>
        </div>
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {loginError}
        </span>
      </div>
    </div>
  );
}

export default Login;
