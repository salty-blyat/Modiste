"use client"

import kid from '../../../../public/collections/kid.webp';
import men from '../../../../public/collections/men.webp';
import unisex from '../../../../public/collections/unisex.webp';
import women from '../../../../public/collections/women.webp';
import { useAppContext } from '../Context';
import Collection from './collection';

const CollectionList = () => {
    const { handleCheckboxChange } = useAppContext();
    return (
        <div className="py-28">
            <div className="flex flex-col items-center md:px-16 lg:px-0">
                <div className=" lg:w-[40rem] xl:w-[60rem]">
                    <Collection
                        title="Men"
                        subtitle="See our men collection for summer"
                        image={men}
                        href='/clothings'
                        handleClick={() => handleCheckboxChange('Men')}
                    />
                    <Collection
                        title="Women"
                        subtitle="Fresh summer collection available now"
                        image={women}
                        right
                        href='/clothings'
                        handleClick={() => handleCheckboxChange('Woman')}

                    />
                    <Collection
                        title="Kid"
                        subtitle="See what we offer to kids"
                        image={kid}
                        handleClick={() => handleCheckboxChange('Kids')}

                        href='/clothings'
                    />
                    <Collection
                        title="Unisex"
                        subtitle="See what we have in our offer"
                        image={unisex}
                        right
                        href='/clothings'
                        handleClick={() => handleCheckboxChange('Unisex')}

                    />
                </div>
            </div>
        </div>
    );
};

export default CollectionList;
