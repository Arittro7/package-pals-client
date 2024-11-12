import Icon1 from "../../../public/features-icon1.png";
import Icon2 from "../../../public/features-icon2.png";
import Icon3 from "../../../public/features-icon3.png";
import { GoBookmark } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import useAxiosSecure from "./../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

const Feature = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: featureData = [] } = useQuery({
    queryKey: ["featureData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/featureAllData`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { totalDelivery, totalParcel, totalUser } = featureData || {};

  return (
    <div className="container mx-auto">
      <div className="text-center my-12">
        <h1 className="text-[26px] uppercase font-semibold">Our Features</h1>
        <p className="font-semibold text-gray-500">
          Optimize parcel handling with seamless tracking and automated
          notifications.
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 border rounded-none pt-6">
            <figure className="bg-[#0984e2] h-[80px] w-[80px] mx-auto rounded-full px-4 py-4">
              <img src={Icon1} alt="" className=" " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Apply Online</h2>
              <p className="text-center text-lg">
                Apply online effortlessly. Enter your details, upload documents,
                and submit—all from home. Receive swift responses and track your
                application's progress in real time.
              </p>
              <div className="flex p-4 space-x-4 w-full rounded-lg md:space-x-6 border dark:bg-gray-50 dark:text-gray-800">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-[#0984e2]">
                  <GoBookmark size={40} color="#ffffff" />
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">
                    <CountUp end={totalParcel} />+
                  </p>
                  <p className="capitalize font-semibold text-gray-500">
                    Total Parcel Booked
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 border rounded-none pt-6">
            <figure className="bg-[#0984e2] h-[80px] w-[80px] mx-auto rounded-full px-4 py-4">
              <img src={Icon2} alt="" className=" " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Submit Documents</h2>
              <p className="text-center text-lg">
                Easily submit your documents online. Upload required files
                securely and ensure your application is complete in just a few
                clicks.
              </p>
              <div className="flex p-4 space-x-4 w-full rounded-lg border md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-[#0984e2]">
                  <LiaShippingFastSolid size={40} color="#ffffff" />
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">
                    <CountUp end={totalDelivery} />+
                  </p>
                  <p className="capitalize font-semibold text-gray-500">
                    Total Parcel Delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 border rounded-none pt-6">
            <figure className="bg-[#0984e2] h-[80px] w-[80px] mx-auto rounded-full px-4 py-4">
              <img src={Icon3} alt="" className=" " />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Receive Goods</h2>
              <p className="text-center text-lg">
                Seamlessly receive goods with our efficient system. Track
                shipments in real-time and confirm deliveries with ease.
              </p>
              <div className="flex p-4 space-x-4 w-full rounded-lg border md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
                <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-[#0984e2]">
                  <HiOutlineUserGroup size={40} color="#ffffff" />
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">
                    <CountUp end={totalUser} />+
                  </p>
                  <p className="capitalize font-semibold text-gray-500">
                    Total User
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
