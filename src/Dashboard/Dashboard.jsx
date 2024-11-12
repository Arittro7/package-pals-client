import { NavLink, Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();

  const { data: userRole = [] } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/Role/${user?.email}`, {
        withCredentials: true,
      });
      return res?.data?.role;
    },
  });

  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      <div className="container mx-auto ">
        <div>
          <div className="grid lg:grid-cols-4 gap-6 grid-cols-1">
            <div className="col-span-1">
              <aside className="w-full min-h-screen p-6 bg-[#ffffff] dark:text-gray-800">
                <nav className="space-y-8 text-sm">
                  <div className="space-y-2">
                    <h2 className="text-xl mb-6 font-semibold tracking-widest uppercase">
                      Dashboard
                    </h2>
                    {/* guest user role nav link */}
                    <div className="flex flex-col space-y-4 mt-12">
                      {userRole === "User" && (
                        <>
                          <NavLink
                            to="/dashboard/bookParcel"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              Book a Parcel
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/myParcel"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase"
                            >
                              My Parcels
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/myProfile"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              My Profile
                            </button>
                          </NavLink>
                        </>
                      )}
                    </div>

                    {/* Delivery men role nav link */}

                    <div className="flex flex-col space-y-4 mt-12">
                      {userRole === "Delivery Man" && (
                        <>
                          <NavLink
                            to="/dashboard/myDeliveryList"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              My Delivery List
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/myReviews"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase"
                            >
                              My Reviews
                            </button>
                          </NavLink>
                        </>
                      )}
                    </div>

                    {/* Admin  role nav link */}

                    <div className="flex flex-col space-y-4 mt-12">
                      {userRole === "Admin" && (
                        <>
                          <NavLink
                            to="/dashboard/statistics"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              Statistics
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/allParcels"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase"
                            >
                              All Parcels
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/allUsers"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              All Users
                            </button>
                          </NavLink>
                          <NavLink
                            to="/dashboard/allDeliveryMen"
                            className={({ isActive }) =>
                              isActive
                                ? "bg-gray-500 text-white py-2 rounded-md"
                                : ""
                            }
                          >
                            <button
                              rel="noopener noreferrer"
                              className="text-sm px-2 font-semibold tracking-widest uppercase "
                            >
                              All Delivery Men
                            </button>
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div className="flex flex-col space-y-4">
                      <NavLink to="/">
                        <button
                          rel="noopener noreferrer"
                          className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600"
                        >
                          Home
                        </button>
                      </NavLink>
                      <a
                        rel="noopener noreferrer"
                        className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600"
                      >
                        Contact
                      </a>
                      <a
                        rel="noopener noreferrer"
                        className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600"
                      >
                        About
                      </a>
                    </div>
                  </div>
                </nav>
              </aside>
            </div>
            <div className="col-span-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
