"use client"
import React, { Suspense } from 'react'
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/footer'
import ClothingList from './clothingList'
import Cart from '../components/Cart/cart'
import Loading from '../Loading'

const Clothings = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Navbar />
                <ClothingList />
                <Cart />
                <Footer />
            </Suspense>
        </>
    )
}

export default Clothings