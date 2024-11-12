import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const AllParcelTable = ({ parcel, refetch }) => {
  const {
    BookingDate,
    name,
    phone,
    requestDate,
    weightPrice,
    status,
    _id,
    paid,
  } = parcel || {};

  const [startDate, setStartDate] = useState(new Date());

  const axiosSecure = useAxiosSecure();

  const { data: AllDeliveryMen = [] } = useQuery({
    queryKey: ["allDeliveryMens"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/allDeliveryMan`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const handleManageParcel = async (e) => {
    e.preventDefault();
    const ApproximateDate = new Date(startDate).toLocaleDateString();
    const DeliveryMan = JSON.parse(e.target.deliveryMan.value);
    const { name, _id: newId } = DeliveryMan;
    const NewApproximateDate = ApproximateDate;
    const NewDeliveryMenID = newId;
    const NewStatus = "On The Way";
    const manageParcel = { NewApproximateDate, NewDeliveryMenID, NewStatus };

    const result = await axiosSecure.patch(
      `/manageAllParcel/${_id}`,
      manageParcel,
      { withCredentials: true }
    );
    if (result.data.matchedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Deliveryman Assign Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleChanges = (e) => {
    // console.log(JSON.parse(e.target.value));
  };

  const handleManageFinish = () => {
    Swal.fire("Already On The Way");
  };
  const handleDelivery = () => {
    Swal.fire("Already Delivered");
  };

  return (
    <>
      <tr>
        <td className="font-medium text-[14px]">{name}</td>
        <td className="font-medium text-[14px]">{phone}</td>
        <td className="font-medium text-[14px]">{BookingDate}</td>
        <td className="font-medium text-[14px]">{requestDate}</td>
        <td className="font-medium text-[14px]">{paid ? "Paid" : "N/A"}</td>
        <td className="font-medium text-[14px]">{weightPrice}$</td>
        <td className="font-medium text-[14px]">{status}</td>
        <td className="font-medium text-[14px]">
          <div>
            {status === "On The Way" ? (
              <button
                onClick={handleManageFinish}
                className="rounded-md  py-2 px-4 bg-[#60a5fa] text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Manage
              </button>
            ) : status === "Delivered" ? (
              <button
                onClick={handleDelivery}
                className="rounded-md  py-2 px-4 bg-[#60a5fa] text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Manage
              </button>
            ) : (
              <Button
                onClick={open}
                className="rounded-md  py-2 px-4 bg-[#60a5fa] text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                Manage
              </Button>
            )}

            <Transition appear show={isOpen}>
              <Dialog
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={close}
              >
                <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
                  <div className="flex min-h-full items-center text-black  justify-center p-4">
                    <TransitionChild
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 transform-[scale(95%)]"
                      enterTo="opacity-100 transform-[scale(100%)]"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 transform-[scale(100%)]"
                      leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                      <DialogPanel className="w-full max-w-md rounded-xl bg-white shadow-xl ">
                        <DialogTitle
                          as="h3"
                          className="font-semibold text-xl uppercase text-center"
                        >
                          Manage Parcel
                        </DialogTitle>

                        <form className="p-6" onSubmit={handleManageParcel}>
                          <label className="text-[15px] font-semibold">
                            Select Delivery Man
                          </label>
                          <select
                            onChange={handleChanges}
                            name="deliveryMan"
                            className="select select-bordered rounded-none mt-2 font-semibold w-full"
                          >
                            {AllDeliveryMen.map((deliveryMan) => (
                              <option
                                key={deliveryMan._id}
                                value={JSON.stringify(deliveryMan)}
                                className="font-semibold"
                              >
                                {deliveryMan.name}
                              </option>
                            ))}
                          </select>
                          <div className="flex flex-col">
                            <label className="text-[15px] my-2 font-semibold">
                              Approximate Delivery Date
                            </label>

                            <span className="border px-4 py-3">
                              <DatePicker
                                className="outline-none font-semibold"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                            </span>
                          </div>
                          <div className="text-right mt-4">
                            <button
                              onClick={close}
                              className="px-6 py-2 bg-[#0984e2] text-white font-semibold rounded-md"
                            >
                              Assign
                            </button>
                          </div>
                        </form>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </td>
      </tr>
    </>
  );
};

export default AllParcelTable;
