import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import validator from "validator";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [license, setLincense] = useState();
  const [email, setEmail] = useState("");
  const [expiry, setExpiry] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState("");

  const { user, setUser } = useContext(UserContext);
  let userInDb = JSON.parse(localStorage.getItem(user.email));
  const handleSubmit = (e) => {
    let driver = {
      firstname: firstName,
      lastname: lastName,
      DOB: DOB,
      license: license,
      email: email,
      expiry: expiry,
    };
    let updatedDrivers = [...userInDb.drivers, driver];
    localStorage.setItem(
      user.email,
      JSON.stringify({ ...userInDb, drivers: updatedDrivers })
    );
    if (!validator.isEmail(email)) {
      setEmailError("Enter valid Email");
    }
  };
  return (
    <div>
      <button className="btn btn-secondary p-1 m-3 w-auto rounded text-center">
        <Link to="/dashboard" className="text-decoration-none text-white">
          Back
        </Link>
      </button>
      <div className="container col-6">
        <h3 className="text-center mt-4">Form</h3>
        <form>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="form-control"
              placeholder="Firstname"
              type="text"
              name="firstname"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="form-control"
              placeholder="Lastname"
              type="text"
              name="lastname"
              required
            />
        
          </div>

          <div className="mb-3">
            <label className="mb-2">Date of Birth : </label>
            <input
              onChange={(e) => setDOB(e.target.value)}
              className="form-control"
              placeholder="DOB"
              type="date"
              name="DOB"
              required
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => {
                setLincense(e.target.value);
                
              }}
              className="form-control"
              placeholder="License Number"
              type="number"
              name="License Number"
              required
            />
            
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
              type="email"
              name="email"
              required
            />
            <br />
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {emailError}
            </span>
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setmobile(e.target.value);
                if (e.target.value.length > 10) {
                  setIsError("should contain only 10 digits");
                }
              }}
              className="form-control"
              placeholder="Phone Number"
              type="number"
              name="PhoneNumber"
              required
            />
            <br />
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {isError}
            </span>
          </div>
          <div className="mb-3">
            <label className="mb-2">License expiry Date : </label>
            <input
              onChange={(e) => setExpiry(e.target.value)}
              className="form-control"
              placeholder="License expiry Date"
              type="date"
              name="License expiry"
              required
            />
          </div>
          <div className="mb-3">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn btn-primary p-1 w-25 rounded text-center"
            >
              <Link to="/dashboard" className="text-decoration-none text-white">
                Submit
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
