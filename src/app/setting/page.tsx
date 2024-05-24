"use client"
import Cart from "../components/Cart/cart";
import { useAuthContext } from "../components/Context/auth";
import Navbar from "../components/Navbar/navbar";


const Setting = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Navbar />
      <Cart />
      <section className="w-full overflow-hidden dark:bg-gray-900">

      </section>


    </>
  );
};

export default Setting;
