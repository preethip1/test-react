import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const handleSignup = () => {
    if (!localStorage.getItem(email)) {
      let updatedUser = {
        email: email,
        password: password,
        drivers: [],
      }
      setUser(updatedUser);
      localStorage.setItem(
        email,
        JSON.stringify(updatedUser)
      );
    } else {
      console.log("user already registered");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="w-25 h-75 border rounded d-flex flex-column m-2">
        <h4 className="p-2 m-1 d-flex justify-content-center font-weight-bold text-secondary ">
          SIGN UP
        </h4>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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
            className="btn btn-primary p-1 m-3 w-25 rounded"
          >
            <Link to="/dashboard" className="text-white text-decoration-none">
              {" "}
              Sign Up
            </Link>
          </button>
        </div>
        <div className="d-flex justify-content-center text-secondary p-1 m-1 ">
          Already have an account?
          <Link to="/signin" className="text-decoration-none">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
