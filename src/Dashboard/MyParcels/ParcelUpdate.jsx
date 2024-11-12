import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "./../../Hooks/useAxiosSecure/useAxiosSecure";
const ParcelUpdate = () => {
  const { notLoading, user } = useContext(AuthContext);
  const updateBook = useLoaderData();
  const navigate = useNavigate();

  const {
    weightPrice,
    phone,
    parcelType,
    parcelWeight,
    _id,
    receiverName,
    receiverPhone,
    parcelDeliveryAddress,
    Longitude,
    Latitude,
    requestDate,
  } = updateBook || {};

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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
    // const name = e.target.name.value;
    // const email = e.target.email.value;
    const phones = e.target.phone.value;
    const weightPrices = price || weightPrice;
    const parcelTypes = e.target.parcelType.value;
    const parcelWeights = e.target.weight.value;
    const receiverNames = e.target.receiveName.value;
    const receiverPhones = e.target.receivePhone.value;
    const parcelDeliveryAddressNew = e.target.parcelAddress.value;
    const Longitudes = e.target.Longitude.value;
    const Latitudes = e.target.Latitude.value;
    const requestDates = new Date(startDate).toLocaleDateString();
    const bookData = {
      weightPrices,
      phones,
      parcelTypes,
      parcelWeights,
      receiverNames,
      receiverPhones,
      parcelDeliveryAddressNew,
      Longitudes,
      Latitudes,
      requestDates,
    };

    const result = await axiosSecure.put(`/bookParcelUpdate/${_id}`, bookData, {
      withCredentials: true,
    });

    if (result.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Parcel Book Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/myParcel");
    }
  };

  return (
    <div className="bg-[#ffffff] mt-6">
      <div className="p-12">
        <h1 className="text-2xl font-semibold mb-8 uppercase text-center">
          Book Parcel Update
        </h1>
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold mb-4">
            Price : $ {weightPrice}
          </h1>
          <h1 className="text-lg font-semibold mb-4">
            Current Price : $ {price}
          </h1>
        </div>
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
                  defaultValue={phone}
                  className="w-full p-3 border outline-none "
                />
              </div>
              <div>
                <label className="text-[15px] font-semibold">Parcel Type</label>
                <input
                  type="text"
                  name="parcelType"
                  required
                  defaultValue={parcelType}
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
                  defaultValue={parcelWeight}
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
                  defaultValue={receiverName}
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
                  defaultValue={receiverPhone}
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
                  defaultValue={parcelDeliveryAddress}
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
                  defaultValue={Latitude}
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
                  defaultValue={Longitude}
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
                "Update Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParcelUpdate;
