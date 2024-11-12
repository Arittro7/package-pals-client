import Banner from "../../Components/Banner/Banner";
import TestMap from "../../Components/TestMap/TestMap";
import TopDeliveryMan from "../../Components/TopDeliveryMan/TopDeliveryMan";
import DeliveryManSecure from "../../DeliveryManSecure/DeliveryManSecure";
import Feature from "./../../Components/Feature/Feature";

const Home = () => {
  return (
    <div className="mt-[100px]">
      <Banner />
      <Feature />
      <TopDeliveryMan />
    </div>
  );
};

export default Home;
