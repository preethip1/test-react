import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Block from "./components/Block";
import React, { useState, createContext } from "react";
import Form from "./components/Form";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const UserContext = createContext({
  user:null,
  setUser: ()=>{}
});

function App() {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/signin" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/form" element={<Form />}></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
