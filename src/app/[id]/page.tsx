'use client';

import Recommended from '@/app/[id]/recommended';
import { useState } from 'react';
import { FaShippingFast as Ship } from 'react-icons/fa';
import Footer from '@/app/components/footer';
import Nav from '@/app/components/nav';

const items = [
    {
        id: '1',
        name: 'Funda Distorsion - Pink',
        price: 2500,
        images: [
            'https://mukbarcelona.com/cdn/shop/files/cherrybomb.jpg?v=1687182950&width=400',
            'https://mukbarcelona.com/cdn/shop/files/DISTORSION-PINK.png?v=1688399135&width=600',
            'https://mukbarcelona.com/cdn/shop/files/distorsion_8a396539-5071-4d48-a057-07724763c47e.jpg?v=1688399135&width=600',
        ],
    },
    {
        id: '2',
        name: 'Funda Portrait - Pink',
        price: 2500,
        images: [
            'https://mukbarcelona.com/cdn/shop/files/portraitpinkcopia.jpg?v=1688399449&width=400',
            'https://mukbarcelona.com/cdn/shop/files/cherrybomb.jpg?v=1687182950&width=400',
            'https://mukbarcelona.com/cdn/shop/files/distorsion_8a396539-5071-4d48-a057-07724763c47e.jpg?v=1688399135&width=600',
        ],
    },
    {
        id: '3',
        name: 'Funda Cherrybomb - Pink',
        price: 2500,
        images: [
            'https://mukbarcelona.com/cdn/shop/files/cherrybomb.jpg?v=1687182950&width=400',
            'https://mukbarcelona.com/cdn/shop/files/distorsion_8a396539-5071-4d48-a057-07724763c47e.jpg?v=1688399135&width=600',
            'https://mukbarcelona.com/cdn/shop/files/portraitpinkcopia.jpg?v=1688399449&width=400',
        ],
    },
];

const models = {
    apple: [
        {
            name: 'iPhone 12 Pro Max',
            value: 'iphone-12-pro-max',
        },
        {
            name: 'iPhone 12 Pro',
            value: 'iphone-12-pro',
        },
        {
            name: 'iPhone 12',
            value: 'iphone-12',
        },
    ],
    samsung: [
        {
            name: 'Galaxy S21 Ultra',
            value: 'galaxy-s21-ultra',
        },
        {
            name: 'Galaxy S21+',
            value: 'galaxy-s21-plus',
        },
        {
            name: 'Galaxy S21',
            value: 'galaxy-s21',
        },
    ],
    motorola: [
        {
            name: 'Moto G60',
            value: 'moto-g60',
        },
        {
            name: 'Moto G40 Fusion',
            value: 'moto-g40-fusion',
        },
        {
            name: 'Moto G20',
            value: 'moto-g20',
        },
    ],
};

interface Props {
    params: { id: string };
}

const Page: React.FC<Props> = ({ params }) => {
    const item = items.find((i) => i.id === params.id);
    const [selectedModel, setSelectedModel] = useState(models.apple);

    return (
        <>
            <Nav />
            <div className="h-[70px]" />
            <div className="p-4">
                {item ? (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="overflow-x-auto">
                                <div className="flex w-full items-start justify-center">
                                    <img src={item.images[0]} alt={item.name} className="max-h-[320px] w-auto" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-xl font-semibold text-gray-800">{item.name}</h1>
                                <p className="text-xl font-bold text-pink-500">$ {item.price}</p>
                                <div className="flex items-center gap-2">
                                    <Ship className="h-4 w-auto text-gray-600" />
                                    <p className="text-md font-normal text-gray-600">Recibelo el 20 de octubre</p>
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
                            <div className="flex w-full py-4">
                                <button className="w-full rounded-sm bg-pink-500 py-2.5 font-normal text-white">
                                    Agregar al carrito
                                </button>
                            </div>
                            <hr />
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
