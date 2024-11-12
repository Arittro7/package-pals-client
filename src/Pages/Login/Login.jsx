import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import google from "../../../public/google.png";
import github from "../../../public/github.png";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const { logInEmailPassword, setNotLoading, notLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    try {
      setNotLoading(true);
      logInEmailPassword(email, password)
        .then(async (result) => {
          toast.success("Login Successfully");
          navigate(from);
        })
        .catch((error) => {
          toast.error("Please enter a valid email & password");
        });
    } catch (err) {
      // console.log(err);
    }
  };

  const googleLogin = () => {
    setNotLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;
        const timeStamp = new Date();
        const Role = "User";
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
          TotalBookCount,
        };
        toast.success("Google Login Successfully");
        navigate(from);
        const res = await axiosPublic.post("/userRole", UserInfo);
        // console.log(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const githubLogin = () => {
    setNotLoading(true);
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        toast.success("Github Login Successfully");
        navigate(from);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-332px)]">
        <div className="mt-[80px]">
          <div className="px-8 py-16 mx-auto rounded-lg md:px-12 lg:w-1/2 lg:px-16 xl:px-32">
            <div className="border">
              <h2 className="text-3xl font-semibold mt-12 text-center">
                Login
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 lg:p-8"
              >
                <div>
                  <label className="text-[15px] font-semibold">
                    Username or email
                  </label>
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

                <div>
                  <div className="text-center space-x-4 flex items-center lg:flex-row flex-col justify-center">
                    <button onClick={googleLogin}>
                      <span className="font-semibold flex items-center gap-2 border p-2">
                        <img className="h-[27px]" src={google} alt="" />
                        Continue Google
                      </span>
                    </button>
                    <button onClick={githubLogin}>
                      <span className="font-semibold flex items-center gap-2 border p-2">
                        <img className="h-[30px]" src={github} alt="" />
                        Continue Github
                      </span>
                    </button>
                  </div>
                </div>

                <button
                  disabled={notLoading}
                  className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-[#0984e2] text-white "
                >
                  {notLoading ? (
                    <span className="flex justify-center items-center">
                      <TbFidgetSpinner className="animate-spin" size={22} />
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
                <div>
                  <h2 className="text-center font-semibold">
                    Do not Have An Account ?{" "}
                    <NavLink to="/register" className="text-[#0984e2]">
                      Register
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

export default Login;
