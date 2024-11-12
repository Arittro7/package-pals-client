import { NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        toast.success("Logout Successful");
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full top-0 fixed z-50 lg:py-[10px] shadow-navBar bg-[#ffffff]">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <h2 className="hidden lg:flex">
            <img src={logo} alt="" />
          </h2>
          <div className="dropdown lg:hidden flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <ul className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#0984e2]" : "text-black"
              }
            >
              <li className="text-[17px] cursor-pointer font-semibold">Home</li>
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-[#0984e2]" : "text-black"
              }
            >
              <li className="text-[17px] cursor-pointer font-semibold">
                Dashboard
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end space-x-2">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-12 rounded-full border-[2px] p-[2px] border-[#0984e2]">
                    <img
                      className="rounded-full"
                      alt="error"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="font-semibold text-[16px]">
                      {user?.displayName}
                    </a>
                  </li>
                  <li>
                    <NavLink to="/dashboard">
                      <a className="font-semibold text-[16px]">Dashboard</a>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="font-semibold text-[16px] text-[#0984e2]"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="font-semibold text-[16px]">Notification</a>
                  </li>
                  <li>
                    <a className="font-semibold text-[16px]">Notification</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <NavLink to="/login">
              <button className="text-[16px] bg-[#0984e2] px-4 py-2 rounded-md text-white font-semibold">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
