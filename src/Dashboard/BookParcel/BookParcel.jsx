import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookParcel = () => {
  const { notLoading, user } = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [price, setPrice] = useState();

  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    const current = parseFloat(priceValue);
    const total = current * 50;
    setPrice(total);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const weightPrice = price;
    const parcelType = e.target.parcelType.value;
    const parcelWeight = e.target.weight.value;
    const receiverName = e.target.receiveName.value;
    const receiverPhone = e.target.receivePhone.value;
    const parcelDeliveryAddress = e.target.parcelAddress.value;
    const ApproximateDate = "Process";
    const DeliveryMenID = "Process";
    const paid = false;
    const Longitude = e.target.Longitude.value;
    const Latitude = e.target.Latitude.value;
    const BookingDate = new Date().toLocaleDateString();
    const requestDate = new Date(startDate).toLocaleDateString();
    const status = "Pending";
    const bookData = {
      name,
      email,
      status,
      weightPrice,
      paid,
      phone,
      ApproximateDate,
      DeliveryMenID,
      parcelType,
      parcelWeight,
      receiverName,
      receiverPhone,
      parcelDeliveryAddress,
      Longitude,
      Latitude,
      requestDate,
      BookingDate,
    };
    const res = await axiosPublic.post("/bookParcel", bookData);
    if (res.data.insertedId) {
      const countUpdate = await axiosPublic.patch(
        `/totalBookCount/${user?.email}`
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book Parcel Added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate("/dashboard/myParcel");
  };

  return (
    <div className="bg-[#ffffff] mt-6">
      <div className="p-12">
        <h1 className="text-2xl font-semibold mb-8 uppercase text-center">
          Book Parcel
        </h1>
        <h1 className="text-xl font-semibold mb-4">Price : {price}$</h1>
        <form onSubmit={handleBook}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-[15px] font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.displayName}
                  readOnly
                  placeholder=""
                  className="w-full p-3 border outline-none "
                  required
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user?.email}
                  readOnly
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">Parcel Type</label>
                <input
                  type="text"
                  name="parcelType"
                  required
                  placeholder=""
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">
                  Parcel Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  required
                  onChange={handlePriceChange}
                  placeholder=""
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[15px] font-semibold">
                  Requested Delivery Date
                </label>

                <span className="border px-4 py-3">
                  <DatePicker
                    className="outline-none font-semibold"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[15px] font-semibold">
                  Receiver Name
                </label>
                <input
                  type="text"
                  name="receiveName"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">
                  Receiver Phone
                </label>
                <input
                  type="text"
                  name="receivePhone"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">
                  Parcel Delivery Address
                </label>
                <input
                  type="text"
                  name="parcelAddress"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">
                  Delivery Address Latitude
                </label>
                <input
                  type="text"
                  name="Latitude"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">
                  Delivery Address longitude
                </label>
                <input
                  type="text"
                  name="Longitude"
                  placeholder=""
                  required
                  className="w-full p-3 border outline-none "
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              disabled={notLoading}
              className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-[#0984e2] text-white "
            >
              {notLoading ? (
                <span className="flex justify-center items-center">
                  <TbFidgetSpinner className="animate-spin" size={22} />
                </span>
              ) : (
                "Book Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookParcel;
