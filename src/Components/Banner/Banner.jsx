import banner from "../../../public/banner.jpg";
import truck from "../../../public/delivery-truck.png";
import { VscArrowSmallRight } from "react-icons/vsc";
const Banner = () => {
  return (
    <div className="container mx-auto">
      <div
        className="hero h-[700px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)),url(${banner})`,
        }}
      >
        <div className="hero-overlay "></div>
        <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-[100px]">
          <div className="hero-content text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
                Parcel Delivery Packages in Sustainable
              </h1>
              <p className="mb-5">
                Transcrew a household name for having been the pioneer of
                Courier and Parcel Services in the country from the Corporate
                Clients to the average person.
              </p>
              <label className="input input-bordered flex bg-gray-500 items-center gap-2">
                <input
                  type="text"
                  className="grow text-black font-semibold"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-6 h-6 opacity-80 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div>
            <div className="max-w-xs p-6 rounded-md shadow-md text-center dark:bg-gray-50">
              <img src={truck} alt="" className="h-20 mx-auto" />
              <div className="mb-2">
                <h2 className="text-2xl font-semibold tracking-wide text-gray-600">
                  Our Vision
                </h2>
              </div>
              <p className=" text-gray-500 lg:w-[200px] mb-2">
                Utilizing lates processes solutions and decades of work
                experience
              </p>
              <h2 className="bg-[#0984e2] py-2 px-2 cursor-pointer rounded-full mt-4 flex w-[40px] h-[40px] mx-auto justify-center items-center">
                <VscArrowSmallRight size={30} color="#ffffff" />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
