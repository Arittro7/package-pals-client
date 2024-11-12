import { useQuery } from "@tanstack/react-query";
import Man1 from "../../../public/service-4.jpg";

import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: TopDeliveryMan = [] } = useQuery({
    queryKey: ["allDeliveryMan"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allDeliveryMan`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: ReviewAverage = [] } = useQuery({
    queryKey: ["Review"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/deliverymanAverageReview`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  const sortedDeliveryMen = [...TopDeliveryMan].sort(
    (a, b) => b.TotalDelivery - a.TotalDelivery
  );
  const topDelivery = sortedDeliveryMen.slice(0, 3);

  return (
    <div className="container mx-auto">
      <div>
        <div className="text-center my-12">
          <h1 className="text-[26px] uppercase font-semibold">
            Our Top Delivery Man
          </h1>
          <p className="font-semibold text-gray-500">
            Meet our top delivery man, ensuring timely and secure deliveries
            with exceptional service every time.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {topDelivery.map((top) => (
            <div
              key={top._id}
              className="rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <div className="relative">
                <img
                  src={top?.photo}
                  alt=""
                  className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
                />
                <div className="bg-[#0984e2] font-semibold absolute text-white px-4 top-[220px] right-0 py-2">
                  <h2>{top?.name}</h2>
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-wide">
                    Total Delivered : {top?.TotalDelivery}+
                  </h2>
                  <h2 className="text-xl font-semibold tracking-wide">
                    Average Ratings :{" "}
                    {ReviewAverage.map(
                      (average) =>
                        average._id === top?._id &&
                        average.averageReview.toFixed(1)
                    )}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
