import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import AllParcelTable from "./AllParcelTable";
import { useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
const AllParcels = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const fromDate = new Date(startDate).toLocaleDateString();
  const toDate = new Date(startDate2).toLocaleDateString();

  const handleSearch = (e) => {
    e.preventDefault();
    setFrom(fromDate);
    setTo(toDate);
  };

  const { refetch, data: allParcelManage = [] } = useQuery({
    queryKey: ["allParcel", from, to],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allUserParcel?from=${from}&to=${to}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
  });

  return (
    <div>
      <div className="bg-[#ffffff] mt-6">
        <div className="p-12">
          <h1 className="text-2xl font-semibold mb-6 uppercase text-center">
            All Parcels
          </h1>

          <div>
            <div className="mb-12">
              <form onSubmit={handleSearch}>
                <div className="">
                  <div className="flex justify-center items-center gap-6">
                    <div className="flex flex-col">
                      <label className="text-[15px] my-2 font-semibold">
                        From
                      </label>

                      <span className="border px-4 py-2">
                        <DatePicker
                          className="outline-none font-semibold"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[15px] my-2 font-semibold">
                        To
                      </label>

                      <span className="border px-4 py-2">
                        <DatePicker
                          className="outline-none font-semibold"
                          selected={startDate2}
                          onChange={(date) => setStartDate2(date)}
                        />
                      </span>
                    </div>
                    <div className="mt-10">
                      <button className="px-4 py-2  font-semibold rounded-md text-white bg-[#60a5fa]">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th className="text-[16px]">User Name</th>
                    <th className="text-[16px]">User Phone</th>
                    <th className="text-[16px]">Booking Date</th>
                    <th className="text-[16px]">Requested Date</th>
                    <th className="text-[16px]">Paid</th>
                    <th className="text-[16px]">Cost</th>
                    <th className="text-[16px]">Status</th>
                    <th className="text-[16px]">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {allParcelManage.map((parcel) => (
                    <AllParcelTable
                      key={parcel._id}
                      parcel={parcel}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
