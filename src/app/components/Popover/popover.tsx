"use client"
import { useAppContext } from '../Context';


export const PopoverContent = () => {

    const { cartItems } = useAppContext()
    return (

        <div>
            {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div key={index} className='flex justify-between'>
                        <span>{item.name}</span>
                        <span>x {item.inCart}</span>
                    </div>
                ))
            ) : (
                <p>No items in cart</p>
            )}
        </div>
    )
}

