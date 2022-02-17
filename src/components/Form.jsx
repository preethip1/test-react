import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import validator from "validator";
import { useLocation } from "react-router-dom";

function Form() {
  const location = useLocation();
  const st = location.state;

  let defaultFirstname = st ? st.firstname : "";
  let defaultLastname = st ? st.lastname : "";
  let defaultDOB = st ? st.DOB : "";
  let defaultLicense = st ? st.license : "";
  let defaultEmail = st ? st.email : "";
  let defaultExpiry = st ? st.expiry : "";
  let defaultMobile = st ? st.mobile : "";

  let [firstName, setFirstName] = useState(defaultFirstname);
  let [lastName, setLastName] = useState(defaultLastname);
  let [DOB, setDOB] = useState(defaultDOB);
  let [license, setLincense] = useState(defaultLicense);
  let [email, setEmail] = useState(defaultEmail);
  let [expiry, setExpiry] = useState(defaultExpiry);
  let [emailError, setEmailError] = useState("");
  let [mobile, setmobile] = useState(defaultMobile);
  let [isError, setIsError] = useState("");

  const { user, setUser } = useContext(UserContext);
  let userInDb = JSON.parse(localStorage.getItem(user.email));

  const validate = () => {
    if (
      firstName.length < 1 ||
      lastName.length < 1 ||
      license.length < 1 ||
      DOB.length < 1 ||
      email.length < 1 ||
      expiry.length < 1
    ) {
      setIsError("all fields are mandatory");
    } else if (mobile.length !== 10) {
      setIsError("should contain only 10 digits");
    } else if (!validator.isEmail(email)) {
      setIsError("Enter valid Email!");
    } else {
      setIsError(null);
    }
  };
  const onHandleSubmit = (e) => {
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
                firstName = e.target.value;
                setFirstName(firstName);
                validate();
              }}
              value={firstName}
              className="form-control"
              placeholder="Firstname"
              type="text"
              name="firstname"
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                lastName = e.target.value;
                setLastName(lastName);
                validate();
              }}
              value={lastName}
              className="form-control"
              placeholder="Lastname"
              type="text"
              name="lastname"
            />
          </div>

          <div className="mb-3">
            <label className="mb-2">Date of Birth : </label>
            <input
              onChange={(e) => {
                DOB = e.target.value;
                setDOB(DOB);
                validate();
              }}
              value={DOB}
              className="form-control"
              placeholder="DOB"
              type="date"
              name="DOB"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => {
                license = e.target.value;
                setLincense(license);
                validate();
              }}
              value={license}
              className="form-control"
              placeholder="License Number"
              type="number"
              name="License Number"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={(e) => {
                email = e.target.value;
                setEmail(email);
                validate();
              }}
              value={email}
              className="form-control"
              placeholder="Email"
              type="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                mobile = e.target.value;
                setmobile(mobile);
              }}
              value={mobile}
              className="form-control"
              placeholder="Phone Number"
              type="number"
              name="PhoneNumber"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">License expiry Date : </label>
            <input
              onChange={(e) => {
                expiry = e.target.value;
                setExpiry(expiry);
                validate();
              }}
              value={expiry}
              className="form-control"
              placeholder="License expiry Date"
              type="date"
              name="License expiry"
            />
          </div>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {isError}
          </span>
          <div className="mb-3">
            <button
              onClick={() => onHandleSubmit()}
              type="button"
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
