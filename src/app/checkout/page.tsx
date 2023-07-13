'use client';

import cartItems from '@/app/constants/cart';
import clsx from 'clsx';
import { HiOutlineShoppingBag as Cart } from 'react-icons/hi';
import Nav from '@/app/components/nav';
import ScrollUp from '@/app/utils/scrollUp';

const Checkout: React.FC = () => {
    return (
        <>
            <ScrollUp />
            <Nav />
            <div className="h-[70px]" />
            <div className="p-4">
                {cartItems.length ? (
                    <div className="flex h-full flex-col gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">Envío</h2>
                        {/* <div className="flex flex-col gap-2">
                            <span className="text-sm font-bold text-gray-800">Código postal</span>
                            <input
                                className={clsx('rounded-sm border border-gray-300 p-2', 'focus:outline-none')}
                                type="text"
                                placeholder="Ingresa tu código postal"
                            />
                            <button className="rounded-sm bg-gray-800 p-2 font-bold text-white">Calcular envío</button>
                        </div> */}

                        {/* OPCIONES */}
                        <div className={clsx('rounded-lg border border-gray-300 p-4')}>
                            <div className="flex items-center gap-6">
                                <div>
                                    <input
                                        className="rounded-sm border border-gray-300 p-2 focus:outline-none"
                                        type="radio"
                                        name="shipping"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between gap-2">
                                        <span className="text-sm font-bold text-gray-800">Envío a domicilio</span>
                                        <span className="text-sm font-bold text-pink-500">+$1.308,40</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-normal text-gray-800">
                                            Pje. Pujato 536, Rosario, Santa Fe
                                        </span>
                                        <span className="text-xs font-normal text-gray-800">
                                            Llega entre el 1 y el 3 de agosto
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={clsx('rounded-lg border border-gray-300 p-6')}>
                            <div className="flex items-center gap-6">
                                <div>
                                    <input
                                        className="rounded-sm border border-gray-300 p-2 focus:outline-none"
                                        type="radio"
                                        name="shipping"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between gap-2">
                                        <span className="text-sm font-bold text-gray-800">Retiro en sucursal</span>
                                        <span className="text-sm font-bold text-pink-500">+$900,30</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-normal text-gray-800">
                                            San Martín 1240, Rosario, Santa Fe
                                        </span>
                                        <span className="text-xs font-normal text-gray-800">
                                            Llega entre el 1 y el 3 de agosto
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* OPCIONES */}
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <Cart className="h-16 w-auto text-gray-800" />
                        <span className="text-lg font-bold text-gray-800">Carrito vacío</span>
                        <span className="text-sm font-normal text-gray-600">Aún no agregaste ningún producto.</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;
