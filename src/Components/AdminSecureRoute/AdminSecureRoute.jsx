import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const AdminSecureRoute = ({ children }) => {
  const { user, notLoading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    isLoading,
    data: UserRole = "",
  } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/Role/${user?.email}`, {
        withCredentials: true,
      });
      return result?.data?.role;
    },
  });

  if (isLoading || notLoading) {
    return (
      <div className=" flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && UserRole === "Admin") {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location.pathname }}
      replace={true}
    ></Navigate>
  );
};

export default AdminSecureRoute;
