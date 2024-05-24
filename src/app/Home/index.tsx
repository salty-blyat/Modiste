"use client"
import Cart from "../components/Cart/cart";
import CollectionList from "../components/Collection/collectionList";
import Footer from "../components/Footer/footer";
import Hero from "../components/Hero/hero";
import Navbar from "../components/Navbar/navbar";


export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <CollectionList />
            <Cart />
            <Footer />
        </main>
    );
}