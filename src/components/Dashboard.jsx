import Block from "./Block";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  let drivers = JSON.parse(localStorage.getItem(user.email)).drivers;
  return (
    <div>
      <button className="btn btn-primary p-1 m-3 w-auto rounded">
        <Link to="/form" className="text-white text-decoration-none">
          Add driver
        </Link>
      </button>
      {drivers.map((driver) => (
        <Block driver={driver} />
      ))}
    </div>
  );
}

export default Dashboard;
