const AllUsersTable = ({
  allUser,
  handleMakeAdmin,
  handleMakeDeliveryMen,
  handleAlreadyDelivery,
  handleAlreadyAdmin,
}) => {
  const { name, phone, Role, TotalBookCount, _id } = allUser || {};

  return (
    <>
      <tr>
        <td>
          <h1 className="font-semibold text-gray-500">{name}</h1>
        </td>
        <td>
          <h2 className="font-semibold text-gray-500">{phone}</h2>
        </td>
        <td>
          <h2 className="font-semibold text-gray-500">{TotalBookCount}</h2>
        </td>
        <td>
          <h2 className="font-semibold text-gray-500">{Role}</h2>
        </td>
        <td>
          <h2 className="font-semibold ">
            {Role === "Delivery Man" ? (
              <button
                onClick={handleAlreadyDelivery}
                className="bg-blue-400 px-4 py-2 text-white rounded-md"
              >
                Delivery Men
              </button>
            ) : (
              <button
                onClick={() => handleMakeDeliveryMen(_id)}
                className="bg-blue-400 px-4 py-2 text-white rounded-md"
              >
                Delivery Men
              </button>
            )}
          </h2>
        </td>
        <td>
          <h2 className="font-semibold">
            {Role === "Admin" ? (
              <button
                onClick={handleAlreadyAdmin}
                className="bg-blue-400 px-4 py-2 text-white rounded-md"
              >
                Admin
              </button>
            ) : (
              <button
                onClick={() => handleMakeAdmin(_id)}
                className="bg-blue-400 px-4 py-2 text-white rounded-md"
              >
                Admin
              </button>
            )}
          </h2>
        </td>
      </tr>
    </>
  );
};

export default AllUsersTable;
