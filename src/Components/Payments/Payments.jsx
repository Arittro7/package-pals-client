import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payments = () => {
  const PaymentPrice = useLoaderData();
  // console.log(PaymentPrice);

  const Price = PaymentPrice.reduce(
    (after, before) => after + before.weightPrice,
    0
  );

  const parcelId = PaymentPrice.map((parcel) => parcel._id);
  const originalId = parcelId.toString();

  return (
    <div className="bg-[#ffffff] mt-6">
      <div className="p-12">
        <h1 className="text-2xl font-semibold mb-6 uppercase text-center">
          My Payment
        </h1>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm Price={Price} originalId={originalId} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payments;
