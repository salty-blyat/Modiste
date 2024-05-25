"use client"
import { Suspense } from "react";
import Loading from "../Loading";
import Cart from "../components/Cart/cart";
import { useAuthContext } from "../components/Context/auth";
import Navbar from "../components/Navbar/navbar";


const Setting = () => {
  // const { user } = useAuthContext();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Cart />
        <section className="w-full overflow-hidden dark:bg-gray-900">
          adsfdsaf
        </section>
      </Suspense>


    </>
  );
};

export default Setting;
