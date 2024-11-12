import Confetti from "react-confetti";
import successImg from "../../../public/payment.gif";
import Arrow from "../../../public/arrow.png";

const SuccessPayment = () => {
  return (
    <div>
      <div className="bg-[#ffffff] mt-6">
        <div className="p-12">
          <div>
            <Confetti width={1200} height={400} />
          </div>
          <div>
            <div className="flex flex-col max-w-lg mx-auto p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
              <div>
                <img
                  src={successImg}
                  alt=""
                  className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                />
                <h2 className="mb-1 text-xl uppercase text-center font-semibold">
                  Payment Successfully Done
                </h2>
                <div className="flex justify-center items-center">
                  <img src={Arrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
