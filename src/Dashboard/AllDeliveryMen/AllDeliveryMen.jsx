import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import AllDeliveryMenTable from "./AllDeliveryMenTable";

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();

  const { data: AllDeliveryMen = [] } = useQuery({
    queryKey: ["allDeliveryMen"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/allDeliveryMan`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  const { data: ReviewAverage = [] } = useQuery({
    queryKey: ["Review"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/deliverymanAverageReview`, {
        withCredentials: true,
      });
      return result.data;
    },
  });

  return (
    <div className="bg-[#ffffff] mt-6">
      <div className="p-12">
        <h1 className="text-2xl font-semibold mb-6 uppercase text-center">
          All Delivery Man
        </h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th className="text-[16px]">Delivery Man Name</th>
                  <th className="text-[16px]">Phone Number</th>
                  <th className="text-[16px]">Number of parcel delivered</th>
                  <th className="text-[16px]">Average review</th>
                </tr>
              </thead>
              <tbody>
                {AllDeliveryMen.map((deliveryMan) => (
                  <AllDeliveryMenTable
                    key={deliveryMan._id}
                    deliveryMan={deliveryMan}
                    ReviewAverage={ReviewAverage}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
