import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const DashBoardNavigate = () => {
  const { user, notLoading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const {
    data: UserRole = "",
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["NavigateRole", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is not available");
      }
      const result = await axiosSecure.get(`/Role/${user.email}`, {
        withCredentials: true,
      });
      return result?.data?.role;
    },
    enabled: !!user?.email, // Only run the query if user.email is available
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching user role:", error);
    }
  }, [isError, error]);

  if (isLoading || !UserRole) {
    return <div>Loading...</div>;
  }

  return (
    <Navigate
      to={
        UserRole === "Admin"
          ? "/dashboard/statistics"
          : UserRole === "Delivery Man"
          ? "/dashboard/myDeliveryList"
          : UserRole === "User"
          ? "/dashboard/bookParcel"
          : "/"
      }
    />
  );
};

export default DashBoardNavigate;
