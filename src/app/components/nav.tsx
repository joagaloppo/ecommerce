'use client';

import cartItems from '@/app/constants/cart';
import links from '@/app/constants/menu';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { BiChevronRight as ArrowRight } from 'react-icons/bi';
import { HiOutlineMenu as Menu, HiOutlineShoppingBag as Cart } from 'react-icons/hi';
import { IoIosLock as Lock } from 'react-icons/io';
import { IoCloseSharp as Close } from 'react-icons/io5';
import * as Dialog from '@radix-ui/react-dialog';

const MenuTrigger: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
    return (
        <>
            {/* DESKTOP */}
            <ul className="hidden sm:mx-auto sm:flex sm:w-full sm:items-center sm:justify-center sm:gap-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <span
                            onClick={link.onClick}
                            className="text-primary cursor-pointer font-semibold tracking-tight underline-offset-2 hover:underline"
                        >
                            {link.text}
                        </span>
                    </li>
                ))}
            </ul>
            {/* MOBILE */}
            <button onClick={() => setOpen(true)} className="sm:hidden">
                <Menu className="h-[26px] w-auto text-gray-800" />
            </button>
        </>
    );
};

const MenuDialog: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
    const handleOpenChange = (o: boolean) => setOpen(o);
    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Overlay className="pointer-events-none fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" />
            <Dialog.Content
                className={clsx(
                    'fixed z-50',
                    'bottom-[3vw] left-1/2 -translate-x-1/2',
                    'rounded-lg p-6 shadow-lg',
                    'h-fit w-[94vw] max-w-screen-sm bg-white',
                    'focus:outline-none'
                )}
            >
                <Dialog.Close
                    className="absolute -top-20 left-1/2 box-content flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-gray-800"
                    asChild
                >
                    <Close className="h-[26px] w-auto text-gray-800" />
                </Dialog.Close>
                <div>
                    <ul className="flex flex-grow flex-col gap-4">
                        {links.map((link, index) => (
                            <li key={index} className="flex justify-between">
                                <span
                                    onClick={() => {
                                        link.onClick();
                                        setOpen(false);
                                    }}
                                    className="text-lg font-semibold text-gray-800"
                                >
                                    {link.text}
                                </span>
                                <ArrowRight className="box-content h-6 w-auto rounded-full bg-gray-100 p-1 text-gray-800" />
                            </li>
                        ))}
                    </ul>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};

const CartTrigger: React.FC<{ setOpen: (open: boolean) => void }> = ({ setOpen }) => {
    return (
        <>
            <button onClick={() => setOpen(true)}>
                <Cart className="h-[26px] w-auto text-gray-800" />
            </button>
        </>
    );
};

const CartDialog: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
    const handleOpenChange = (o: boolean) => setOpen(o);
    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange}>
            <Dialog.Overlay className="pointer-events-none fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]" />
            <Dialog.Content
                className={clsx(
                    'fixed z-50',
                    'bottom-3 left-1/2 -translate-x-1/2',
                    'rounded-lg px-6 py-6 shadow-lg',
                    'w-[94vw] max-w-screen-sm bg-white',
                    'h-[calc(100dvh_-_6vw)]',
                    'focus:outline-none'
                )}
            >
                <div>
                    <Dialog.Close
                        className="absolute right-5 top-7 box-content flex cursor-pointer items-center justify-center rounded-full text-gray-800"
                        asChild
                    >
                        <Close className="h-5 w-auto text-gray-800" />
                    </Dialog.Close>
                    {!!cartItems.length && (
                        <div className="flex gap-0.5">
                            <span className="text-lg font-bold text-gray-800">Carrito</span>
                            <span className="box-content flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-normal text-white">
                                {cartItems.length}
                            </span>
                        </div>
                    )}
                </div>
                {cartItems.length ? (
                    <div className="flex h-full flex-col overflow-auto pt-6">
                        <ul className="flex h-[calc(100dvh_-_6vw_-_12rem)] flex-col gap-4 overflow-auto pb-6">
                            {cartItems.map((link, index) => (
                                <li key={index} className="flex justify-between gap-2 pb-2">
                                    <div className="flex w-full flex-col justify-center overflow-auto">
                                        <span
                                            className="text-md overflow-hidden text-ellipsis 
          whitespace-nowrap font-bold text-gray-800"
                                        >
                                            {link.name}
                                        </span>
                                        <span className="text-sm font-normal text-gray-600">Apple / iPhone 14</span>
                                        <span className="text-sm font-normal text-pink-500">$ {link.price} x 1</span>
                                        <span className="text-sm font-normal text-gray-600  underline underline-offset-2">
                                            Remover
                                        </span>
                                    </div>
                                    <img
                                        src={link.image}
                                        alt={link.name}
                                        className="h-24 w-24
                                    rounded-md border object-contain"
                                    />
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div
                            className="absolute bottom-0 left-0 z-[60] w-full rounded-b-lg border-t bg-white p-6"
                            style={{ backdropFilter: 'blur(2px)' }}
                        >
                            <div className="flex justify-center gap-3">
                                <span className="text-xl font-extrabold text-gray-800">Subtotal</span>
                                <span className="text-xl font-extrabold text-gray-800">$ 7.500</span>
                            </div>
                            <div className="pb-2">
                                <p className="text-center text-[10px] font-normal text-gray-600">
                                    Impuestos y gastos de envío calculados al finalizar.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Link onClick={() => setOpen(false)} href="/checkout">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-sm bg-pink-500 py-2 font-semibold text-white">
                                        <Lock className="h-4 w-auto" />
                                        Comprar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <Cart className="h-16 w-auto text-gray-800" />
                        <span className="text-lg font-bold text-gray-800">Carrito vacío</span>
                        <span className="text-sm font-normal text-gray-600">Aún no agregaste ningún producto.</span>
                    </div>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
};

const Nav: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const checkScroll = () => setIsScrolled(window.scrollY > 10);

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <>
            <MenuDialog open={menuOpen} setOpen={setMenuOpen} />
            <CartDialog open={cartOpen} setOpen={setCartOpen} />
            <nav
                className={clsx(
                    'fixed z-40 w-full bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 ease-in-out lg:py-6',
                    isScrolled && 'border-b-0 shadow-[0px_4px_8px_rgba(0,0,0,0.05)]'
                )}
            >
                <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between px-4 lg:px-6">
                    <div className="flex w-full sm:flex-row-reverse sm:justify-end">
                        <MenuTrigger setOpen={setMenuOpen} />
                        <Link className="flex w-full justify-center sm:w-auto" href="/">
                            <h1 className="sr-only">Jetlag Fundas</h1>
                            <Image src="/jetlag.png" alt="jetlag" width={200} height={104} className="h-8 w-auto" />
                        </Link>
                    </div>
                    <CartTrigger setOpen={setCartOpen} />
                </div>
            </nav>
        </>
    );
};

export default Nav;
