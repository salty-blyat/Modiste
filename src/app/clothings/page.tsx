"use client"
import React from 'react'
import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/footer'
import ClothingList from './clothingList'
import Cart from '../components/Cart/cart'

const Clothings = () => {
    return (
        <>
            <Navbar />
            <ClothingList />
            <Cart />
            <Footer />
        </>
    )
}

export default Clothings