import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    createUser,
    updateUserProfile,
    notLoading,
    setNotLoading,
    setProfileLoad,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const image = data.image[0];
    const formData = new FormData();
    formData.append(`image`, image);

    try {
      setNotLoading(true);
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/from-data",
        },
      });

      const photo = res.data.data.display_url;

      createUser(email, password)
        .then((result) => {
          updateUserProfile(name, photo)
            .then(async () => {
              const name = data?.name;
              const email = data?.email;
              const phone = data.phone;
              const photo = res?.data.data.display_url;
              const timeStamp = new Date();
              const Role = data.role;
              const TotalBookCount = 0;
              const AverageReview = 0;
              const TotalDelivery = 0;
              const UserInfo = {
                name,
                email,
                photo,
                timeStamp,
                AverageReview,
                TotalDelivery,
                Role,
                phone,
                TotalBookCount,
              };
              const result = await axiosPublic.post("/userRole", UserInfo);
              // console.log(result.data);
              setProfileLoad(true);
              navigate(from);
              toast.success("Register Successful");
            })
            .catch((error) => {
              // console.log(error);
            });
        })
        .catch((error) => {
          // console.log(error);
        });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-332px)]">
        <div className="mt-[80px]">
          <div className="px-8 py-16 mx-auto rounded-lg md:px-12 lg:w-1/2 lg:px-16 xl:px-32">
            <div className="border">
              <h2 className="text-3xl font-semibold mt-12 text-center">
                Sign Up
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 lg:p-8"
              >
                <div>
                  <label className="text-[15px] font-semibold">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    className="w-full p-3 border outline-none "
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">
                      This Email field is required
                    </span>
                  )}
                </div>
                <fieldset className="w-full space-y-1 dark:text-gray-800">
                  <label htmlFor="files" className="block text-sm font-medium">
                    Choose Photo
                  </label>
                  <div className="flex">
                    <input
                      type="file"
                      id="files"
                      className="px-8 py-8 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-50 font-semibold"
                      {...register("image", { required: true })}
                    />
                  </div>
                  {errors.image && (
                    <span className="text-red-500">
                      This Email field is required
                    </span>
                  )}
                </fieldset>

                <div>
                  <label className="text-[15px] font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder=""
                    className="w-full p-3 border outline-none "
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      This Email field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-[15px] font-semibold">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder=""
                    className="w-full p-3 border outline-none "
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      This Phone field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-[15px] font-semibold">Passwords</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 border outline-none  "
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        This Password field is required
                      </span>
                    )}

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer top-[16px] right-[16px]"
                    >
                      {showPassword ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </span>
                  </div>
                </div>
                <select
                  required
                  {...register("role", { required: true })}
                  className="select font-semibold text-base select-bordered rounded-none w-full"
                >
                  <option value="User" className="font-semibold text-base">
                    User
                  </option>
                  <option
                    value="Delivery Man"
                    className="font-semibold text-base"
                  >
                    Delivery Man
                  </option>
                </select>
                {errors.role && (
                  <span className="text-red-500">
                    This Password field is required
                  </span>
                )}

                <button
                  disabled={notLoading}
                  className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-[#0984e2] text-white "
                >
                  {notLoading ? (
                    <span className="flex justify-center items-center">
                      <TbFidgetSpinner className="animate-spin" size={22} />
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <div>
                  <h2 className="text-center font-semibold">
                    Already have an account ?{" "}
                    <NavLink to="/login" className="text-[#0984e2]">
                      Login
                    </NavLink>
                  </h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
