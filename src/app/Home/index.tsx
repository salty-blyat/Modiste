// components/Home.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../Loading";

const Cart = dynamic(() => import("../components/Cart/cart"), { ssr: false });
const CollectionList = dynamic(() => import("../components/Collection/collectionList"), { ssr: false });
const Footer = dynamic(() => import("../components/Footer/footer"), { ssr: false });
const Hero = dynamic(() => import("../components/Hero/hero"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar/navbar"), { ssr: false });

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const lastLoadTime = localStorage.getItem("lastLoadTime");
        const hasLoadedOnce = localStorage.getItem("hasLoadedOnce");
        const currentTime = new Date().getTime();

        if (!hasLoadedOnce || (lastLoadTime && currentTime - parseInt(lastLoadTime) > 3600 * 1000)) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
                localStorage.setItem("hasLoadedOnce", "true");
                localStorage.setItem("lastLoadTime", new Date().getTime().toString());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <Navbar />
                    <Hero />
                    <CollectionList />
                    <Cart />
                    <Footer />
                </div>
            )}
        </>
    );
};

export default Home;
