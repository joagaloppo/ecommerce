'use client';

import Recommended from '@/app/[slug]/recommended';
import items from '@/app/constants/items';
import models from '@/app/constants/models';
import { useState } from 'react';
import { FaShippingFast as Ship } from 'react-icons/fa';
import { HiShoppingBag as Cart } from 'react-icons/hi';
import Footer from '@/app/components/footer';
import Nav from '@/app/components/nav';
import ScrollUp from '@/app/utils/scrollUp';

interface Props {
    params: { slug: string };
}

const Page: React.FC<Props> = ({ params }) => {
    const item = items.find((i) => i.slug === params.slug);
    const [selectedModel, setSelectedModel] = useState(models.apple);

    return (
        <>
            <ScrollUp />
            <Nav />
            <div className="h-[70px]" />
            <div className="p-4">
                {item ? (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="overflow-x-auto">
                                <div className="flex w-full items-start justify-center">
                                    <img src={item.image} alt={item.name} className="max-h-[320px] w-auto" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-xl font-semibold text-gray-800">{item.name}</h1>
                                <p className="text-xl font-bold text-pink-500">$ {item.price}</p>
                                <div className="flex items-center gap-2">
                                    <Ship className="h-4 w-auto text-gray-600" />
                                    <p className="text-md font-normal text-gray-600">A partir del 20 de octubre</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 py-2">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-normal text-gray-800">Marca:</p>
                                    <select
                                        className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800"
                                        onChange={(e) =>
                                            setSelectedModel(models[e.target.value as 'apple' | 'samsung' | 'motorola'])
                                        }
                                    >
                                        <option selected value="apple">
                                            Apple
                                        </option>
                                        <option value="samsung">Samsung</option>
                                        <option value="motorola">Motorola</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-normal text-gray-800">Modelo:</p>
                                    <select className="w-full appearance-none rounded-sm border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800">
                                        {selectedModel.map((model, index) => (
                                            <option key={index} value={model.value}>
                                                {model.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex w-full py-2">
                                <button className="flex w-full items-center justify-center gap-2 rounded-sm bg-pink-500 py-2.5 font-normal text-white">
                                    <Cart className="h-4 w-auto" />
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Not found</div>
                )}
            </div>
            <Recommended />
            <Footer />
        </>
    );
};

export default Page;
