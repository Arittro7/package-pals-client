import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
const ParcelTable = ({ bookData, handleDelete, handleWaitForDelivery }) => {
  const { user } = useContext(AuthContext);
  const {
    parcelType,
    requestDate,
    BookingDate,
    status,
    _id,
    ApproximateDate,
    DeliveryMenID,
    paid,
  } = bookData || {};

  const axiosSecure = useAxiosSecure();

  // modal code here

  let [isOpen, setIsOpen] = useState(false);

  const handleReview = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const rating = parseFloat(e.target.rating.value);
    const feedBack = e.target.FeedBack.value;
    const image = user?.photoURL;
    const ReviewEmail = user?.email;
    const ManID = DeliveryMenID;
    const date = new Date().toLocaleDateString();
    const Review = { name, rating, feedBack, date, image, ManID, ReviewEmail };
    const result = await axiosSecure.post(`/reviewDeliveryMan`, Review, {
      withCredentials: true,
    });
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review Add Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Already Add The Review!",
      });
    }
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <tr>
        <td className="font-medium text-[14px]">{parcelType}</td>
        <td className="font-medium text-[14px]">{requestDate}</td>
        <td className="font-medium text-[14px]">{BookingDate}</td>
        <td className="font-medium text-[14px]">{ApproximateDate}</td>
        <td className="font-medium text-[14px]">{DeliveryMenID}</td>
        <td className="font-medium text-[14px]">
          <button className="bg-orange-200 rounded-md px-4 py-2">
            {status}
          </button>
        </td>

        <td className="font-medium text-[14px]">
          {status === "Pending" ? (
            <NavLink to={`/dashboard/parcelUpdate/${_id}`}>
              <button className="bg-green-500 px-4 text-white rounded-md py-2">
                Update
              </button>
            </NavLink>
          ) : (
            <button className="bg-green-500 px-4 text-white rounded-md py-2">
              Update
            </button>
          )}
        </td>

        <td className="font-medium text-[14px]">
          {status === "Delivered" ? (
            <>
              <Button
                onClick={open}
                className="rounded-md bg-[#60a5fa] py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Review
              </Button>

              <Transition appear show={isOpen}>
                <Dialog
                  as="div"
                  className="relative z-10 focus:outline-none"
                  onClose={close}
                >
                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                      <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                      >
                        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                          <h2 className="font-semibold text-center uppercase text-xl">
                            My Review
                          </h2>
                          <div>
                            <form onSubmit={handleReview}>
                              <div>
                                <label className="text-[15px] font-semibold">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  defaultValue={user?.displayName}
                                  readOnly
                                  placeholder=""
                                  required
                                  className="w-full p-3 border outline-none "
                                />
                              </div>
                              <div>
                                <label className="text-[15px] font-semibold">
                                  Rating
                                </label>
                                <input
                                  type="text"
                                  name="rating"
                                  placeholder=""
                                  required
                                  className="w-full p-3 border outline-none "
                                />
                              </div>
                              <div>
                                <label className="text-[15px] font-semibold">
                                  FeedBack
                                </label>
                                <textarea
                                  className="textarea textarea-bordered w-full"
                                  placeholder="FeedBack..."
                                  name="FeedBack"
                                  required
                                ></textarea>
                              </div>
                              <div className="mt-4 text-right">
                                <button
                                  onClick={close}
                                  className="inline-flex items-center gap-2 rounded-md bg-[#60a5fa] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                  {" "}
                                  Add Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
          ) : (
            <button
              onClick={handleWaitForDelivery}
              className="bg-[#60a5fa] px-4 rounded-md py-2 text-white"
            >
              Review
            </button>
          )}
        </td>
        <td className="font-medium text-[14px]">
          {" "}
          <span>
            {bookData ? (
              <Link to={`/dashboard/payment/${_id}`}>
                <button
                  disabled={paid ? true : false}
                  className="text-base px-4 py-1 bg-[#0984e2] rounded-md text-white"
                >
                  Pay
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="text-base px-4 py-1 bg-purple-500 rounded-md text-white"
              >
                Pay
              </button>
            )}
          </span>
        </td>
        <td className="font-medium text-[14px]">
          {status === "Pending" ? (
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 px-4 rounded-md py-2 text-white"
            >
              Cancel
            </button>
          ) : (
            <button className="bg-red-500 px-4 rounded-md py-2 text-white">
              Cancel
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default ParcelTable;
