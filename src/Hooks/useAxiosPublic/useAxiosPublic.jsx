import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://transcreaw.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
