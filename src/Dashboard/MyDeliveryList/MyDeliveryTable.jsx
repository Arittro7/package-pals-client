import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyDeliveryTable = ({
  assignData,
  indx,
  handleCancel,
  handleAlreadyCancel,
  handleDelivered,
  handleDeliveryCancel,
}) => {
  const {
    name,
    receiverName,
    receiverPhone,
    phone,
    requestDate,
    ApproximateDate,
    parcelDeliveryAddress,
    status,
    Latitude,
    Longitude,
    _id,
  } = assignData || {};

  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <tr>
        <td>
          {" "}
          <h1 className="font-semibold text-[14px]">{indx + 1}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{name}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{receiverName}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{phone}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{requestDate}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{ApproximateDate}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{receiverPhone}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">{parcelDeliveryAddress}</h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">
            {/* <button className="bg-[#60a5fa] px-4 py-2 text-white rounded-md">
              Open
            </button> */}
            <Button
              onClick={open}
              className="rounded-md bg-green-500 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Map
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
                      <DialogPanel className="w-full  rounded-xl  p-6 backdrop-blur-2xl">
                        <div>
                          {" "}
                          <MapContainer
                            center={[
                              parseFloat(Latitude),
                              parseFloat(Longitude),
                            ]}
                            zoom={13}
                            scrollWheelZoom={false}
                            style={{ height: "100vh", width: "100%" }}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                              position={[
                                parseFloat(Latitude),
                                parseFloat(Longitude),
                              ]}
                            >
                              <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </div>
                        <div className="mt-4 text-right">
                          <Button
                            className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                            onClick={close}
                          >
                            Close
                          </Button>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">
            {status === "On The Way" ? (
              <button
                onClick={() => handleDelivered(_id)}
                className="bg-[#60a5fa] px-4 py-2 text-white rounded-md"
              >
                Deliver
              </button>
            ) : status === "Cancelled" ? (
              <button
                onClick={handleAlreadyCancel}
                className="bg-[#60a5fa] px-4 py-2 text-white rounded-md"
              >
                Deliver
              </button>
            ) : (
              <button
                onClick={handleDeliveryCancel}
                className="bg-[#60a5fa] px-4 py-2 text-white rounded-md"
              >
                Deliver
              </button>
            )}
          </h1>
        </td>
        <td>
          <h1 className="font-semibold text-[14px]">
            {status === "On The Way" ? (
              <button
                onClick={() => handleCancel(_id)}
                className="bg-red-500 px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
            ) : status === "Delivered" ? (
              <button
                onClick={handleDeliveryCancel}
                className="bg-red-500 px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleAlreadyCancel}
                className="bg-red-500 px-4 py-2 text-white rounded-md"
              >
                Cancel
              </button>
            )}
          </h1>
        </td>
      </tr>
    </>
  );
};

export default MyDeliveryTable;
