import { useQuery } from "@tanstack/react-query";
import AllUsersTable from "./AllUsersTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { refetch, data: allUserData = [] } = useQuery({
    queryKey: ["allUserData"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/allUser`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  // pagination implement start

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = allUserData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(allUserData.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // pagination implement end

  const handleMakeDeliveryMen = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to Deliveryman",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Deliveryman",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const Delivery = "Delivery Man";
        const res = await axiosSecure.patch(
          `/userRoleUpdateDelivery/${id}`,
          { Delivery },
          { withCredentials: true }
        );

        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "Yes Make Deliveryman",
            icon: "success",
          });
        }
      }
    });
  };

  const handleAlreadyDelivery = () => {
    Swal.fire("Already a Delivery Man");
  };

  const handleAlreadyAdmin = () => {
    Swal.fire("Already an Admin");
  };

  const handleMakeAdmin = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make an Admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const changeRole = "Admin";
        const res = await axiosSecure.patch(
          `/userRoleUpdateAdmin/${id}`,
          { changeRole },
          { withCredentials: true }
        );

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: "User role updated to admin.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="bg-[#ffffff] mt-6">
        <div className="p-12">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="font-bold text-base text-gray-600">
                    User Name
                  </th>
                  <th className="font-bold text-base text-gray-600">
                    Phone Number
                  </th>
                  <th className="font-bold text-base text-gray-600">
                    Total Parcel Booked
                  </th>
                  <th className="font-bold text-base text-gray-600">Status</th>
                  <th className="font-bold text-base text-gray-600">
                    Make Delivery Man
                  </th>
                  <th className="font-bold text-base text-gray-600">
                    Make Admin
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((allUser) => (
                  <AllUsersTable
                    key={allUser._id}
                    allUser={allUser}
                    handleMakeAdmin={handleMakeAdmin}
                    handleMakeDeliveryMen={handleMakeDeliveryMen}
                    handleAlreadyDelivery={handleAlreadyDelivery}
                    handleAlreadyAdmin={handleAlreadyAdmin}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex justify-center mt-4">
              <div className="flex">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-pointer rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600 ${
                    currentPage === 1 && "cursor-not-allowed"
                  }`}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${
                      currentPage === index + 1 && "bg-blue-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`flex items-center justify-center px-4 py-2 mx-1 text-blue-500 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${
                    currentPage === totalPages && "cursor-not-allowed"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
