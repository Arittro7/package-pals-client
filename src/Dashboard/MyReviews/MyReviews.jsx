import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import MyReviewCard from "./MyReviewCard";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: MyAllReview = [] } = useQuery({
    queryKey: ["myReview", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/deliveryManReview/${user?.email}`);
      return result.data;
    },
  });

  return (
    <div className="bg-[#ffffff] mt-6">
      <div className="p-12">
        <h1 className="text-2xl font-semibold mb-6 uppercase text-center">
          My Reviews
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {MyAllReview.map((review) => (
            <MyReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
