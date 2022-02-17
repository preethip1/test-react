import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import validator from "validator";
import { useLocation } from "react-router-dom";

// params={{ firstname: props.driver.firstname }}

function Form() {
  const location = useLocation();
  const st = location.state;
  console.log(st);

  let defaultFirstname = st ? st.firstname : "";
  let defaultLastname = st ? st.lastname : "";
  let defaultDOB = st ? st.DOB : "";
  let defaultLicense = st ? st.license : "";
  let defaultEmail = st ? st.email : "";
  let defaultExpiry = st ? st.expiry : "";
  let defaultMobile = st ? st.mobile : "";

  const [firstName, setFirstName] = useState(defaultFirstname);
  const [lastName, setLastName] = useState(defaultLastname);
  const [DOB, setDOB] = useState(defaultDOB);
  const [license, setLincense] = useState(defaultLicense);
  const [email, setEmail] = useState(defaultEmail);
  const [expiry, setExpiry] = useState(defaultExpiry);
  const [emailError, setEmailError] = useState("");
  const [mobile, setmobile] = useState(defaultMobile);
  const [isError, setIsError] = useState("");

  const { user, setUser } = useContext(UserContext);
  let userInDb = JSON.parse(localStorage.getItem(user.email));

  const validate = () => {
    if (firstName.length < 1) {
      setIsError("all fields are mandatory");
    }
  };
  const handleSubmit = (e) => {
    validate();
    let driver = {
      firstname: firstName,
      lastname: lastName,
      DOB: DOB,
      license: license,
      email: email,
      mobile: mobile,
      expiry: expiry,
    };
    let updatedDrivers;
    if (st) {
      let dr = userInDb.drivers.find((d) => d.email === st.email);
      dr.firstname = firstName;
      dr.lastname = lastName;
      dr.DOB = DOB;
      dr.license = license;
      dr.expiry = expiry;
      dr.mobile = mobile;
      updatedDrivers = userInDb.drivers;
    } else {
      updatedDrivers = [...userInDb.drivers, driver];
    }
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
              value={firstName}
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
              value={lastName}
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
              value={DOB}
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
              value={license}
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
              value={email}
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
              value={mobile}
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
              value={expiry}
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
