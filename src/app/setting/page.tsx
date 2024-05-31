"use client"
import { Suspense } from "react";
import Loading from "../Loading";
import Cart from "../components/Cart/cart";
import Navbar from "../components/Navbar/navbar";


const Setting = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Cart />
        <section className="transition-all mx-4 transform ease-in delay-100 mt-36 shadow-lg flex flex-col md:flex-row gap-4">
          
        </section>
      </Suspense>


    </>
  );
};

export default Setting;
