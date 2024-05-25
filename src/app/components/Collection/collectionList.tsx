"use client"

import Collection from './collection';
import men from '../../../../public/collections/men.webp'
import women from '../../../../public/collections/women.webp'
import unisex from '../../../../public/collections/unisex.webp'
import kid from '../../../../public/collections/kid.webp'

const CollectionList = () => {
    return (
        <div className="py-28">
            <div className="flex   flex-col items-center md:px-16 lg:px-0">
                <div className=" lg:w-[40rem] xl:w-[60rem]">
                    <Collection
                        title="Men"
                        subtitle="See our men collection for summer"
                        image={men}
                        href='/clothings'
                    />
                    <Collection
                        title="Women"
                        subtitle="Fresh summer collection available now"
                        image={women}
                        right
                        href='/clothings'
                    />
                </div>
                <div className="w-full lg:w-[40rem] xl:w-[60rem]">
                    <Collection
                        title="Kid"
                        subtitle="See what we offer to kids"
                        image={kid}
                        href='/clothings'
                    />
                    <Collection
                        title="Unisex"
                        subtitle="See what we have in our offer"
                        image={unisex}
                        right
                        href='/clothings'
                    />
                </div>
            </div>
        </div>
    );
};

export default CollectionList;
