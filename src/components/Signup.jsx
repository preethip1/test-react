import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import validator from "validator";

function Signup() {
  let [email, setEmail] = useState("");
  let [err, setErr] = useState(null);
  let [password, setPassword] = useState("");
  let [signupError, setSignupError] = useState("");

  const { user, setUser } = useContext(UserContext);
  const checkError = () => {
    if (!validator.isEmail(email)) {
      setErr("Enter valid Email!");
      return;
    }
    if (password.length < 3) {
      setErr("Password length should be minimum of 3");
      return;
    }
    if (!localStorage.getItem(email)) {
      let updatedUser = {
        email: email,
        password: password,
        drivers: [],
      };
      setUser(updatedUser);
      setErr(null);
    } else {
      setErr("user already registered");
    }
  };

  const handleSingup = () => {
    if (err) {
      setSignupError(err);
    } else {
      localStorage.setItem(email, JSON.stringify(user));
    }
  };
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-25 h-75 border rounded d-flex flex-column m-2">
        <h4 className="p-2 m-1 d-flex justify-content-center font-weight-bold text-secondary ">
          SIGN UP
        </h4>
        <input
          onChange={(e) => {
            email = e.target.value;
            setEmail(email);
            checkError();
          }}
          type="email"
          placeholder="Enter your email"
          className="p-1 m-3 rounded bg-light border border-light"
        />
        <input
          onChange={(e) => {
            password = e.target.value;
            setPassword(password);
            checkError();
          }}
          type="password"
          placeholder="Enter your password"
          className="p-1 m-3 rounded bg-light border border-light"
        />
        <div className="d-flex justify-content-center align-center">
          <button
            onClick={() => handleSingup()}
            type="button"
            className="btn btn-primary p-1 m-3 w-25 rounded"
          >
            {err ? (
              <span>Sign Up</span>
            ) : (
              <Link to="/dashboard" className="text-white text-decoration-none">
                Sign Up
              </Link>
            )}
          </button>
        </div>
        <div className="d-flex justify-content-center text-secondary p-1 m-1 ">
          Already have an account?
          <Link to="/signin" className="text-decoration-none">
            Login
          </Link>
        </div>
        <span
          style={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          {signupError}
        </span>
      </div>
    </div>
  );
}

export default Signup;
