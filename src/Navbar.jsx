import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "./utils/userSlice";
import { base_url } from "./utils/constants";

import axios from "axios";

const Navbar = () => {
  
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        base_url + "logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  console.log(user?.ImageUrl);
  return (
    <div className="navbar bg-black-400 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          🧑‍💻DevTinder
        </Link>
      </div>
      <div>
        {user?.firstName ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">
              Hi,{" "}
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {user.firstName.split(" ")[0]}
              </span>
              <span className="animate-wave inline-block">👋</span>
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.ImageUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Connections">Connections</Link>
            </li>
            <li>
              <Link to="/ConnectionRequests">Recieved Connections</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
