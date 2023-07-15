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
import Spinner from '@/app/components/spinner';

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

const CartSkeleton: React.FC = () => {
    return (
        <>
            <div className="mx-auto flex w-full flex-grow flex-col items-center justify-center">
                <Spinner theme="dark" className="mb-8 h-16" />
                <span className="text-lg font-bold text-gray-800">Cargando...</span>
                <span className="text-sm font-normal text-gray-600">Estamos preparando tu carrito.</span>
            </div>
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
                    'fixed z-50 flex flex-col',
                    'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2',
                    'rounded-lg shadow-lg',
                    'w-[94vw] max-w-screen-sm bg-white',
                    'h-full max-h-[calc(100dvh_-_6vw)]',
                    'focus:outline-none',
                    'overflow-auto'
                )}
            >
                <div>
                    <div
                        className="left-0 top-0 z-[60] flex w-full rounded-t-lg border-b border-gray-100 bg-white px-6 py-4"
                        style={{ backdropFilter: 'blur(2px)' }}
                    >
                        <div className="flex justify-between gap-3">
                            <div className="flex gap-0.5">
                                <span className="text-lg font-bold text-gray-800">Carrito</span>
                                {!!cartItems.length && (
                                    <span className="box-content flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-normal text-white">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            <Dialog.Close
                                className="absolute right-5 top-5 box-content flex cursor-pointer items-center justify-center rounded-full text-gray-800"
                                asChild
                            >
                                <Close className="h-5 w-auto text-gray-800" />
                            </Dialog.Close>
                        </div>
                    </div>
                </div>
                {cartItems.length ? (
                    <>
                        <div
                            className={clsx(
                                'flex flex-col overflow-auto',
                                cartItems.length > 0 && 'h-full max-h-[calc(100%_-_184.6px)]'
                            )}
                        >
                            <ul className="flex max-h-full flex-col gap-4 divide-y divide-gray-100 overflow-auto">
                                {cartItems.map((link, index) => (
                                    <li key={index} className="flex justify-between gap-2 px-6 py-4">
                                        <div className="flex w-full flex-col justify-start">
                                            <span
                                                className="overflow-hidden text-ellipsis whitespace-nowrap 
          text-lg font-bold text-gray-800"
                                            >
                                                {link.name}
                                            </span>
                                            <span className="text-sm font-normal text-gray-600">iPhone 14</span>
                                            <span className="text-sm font-normal text-pink-500">
                                                $ {link.price} x 1
                                            </span>
                                            <span className="text-sm font-normal text-gray-600  underline underline-offset-2">
                                                Remover
                                            </span>
                                        </div>
                                        <img src={link.image} alt={link.name} className="h-24 w-24 object-contain" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/*  */}
                        <div className="flex flex-col rounded-b-lg border-t border-gray-100 bg-white px-6 py-4">
                            <div className="flex justify-center gap-3">
                                <span className="text-xl font-extrabold text-gray-800">Subtotal</span>
                                <span className="text-xl font-extrabold text-gray-800">$ 7.500</span>
                            </div>
                            <div className="pb-2">
                                <p className="text-center text-[10px] font-normal text-gray-600">
                                    Impuestos y gastos de envío calculados al finalizar.
                                </p>
                            </div>
                            <div>
                                <Link onClick={() => setOpen(false)} href="/checkout">
                                    <button className="flex w-full items-center justify-center gap-2 rounded-sm bg-pink-500 py-2 font-semibold text-white">
                                        <Lock className="h-4 w-auto" />
                                        Comprar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    // <CartSkeleton />
                    <div className="flex flex-grow flex-col items-center justify-center">
                        <Cart className="mb-8 h-16 w-auto text-gray-800" />
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
                    'fixed z-10 w-full',
                    'bg-white/95 backdrop-blur',
                    'transition-all duration-300 ease-in-out',
                    isScrolled && 'border-b-0 shadow-[0px_4px_8px_rgba(0,0,0,0.05)]'
                )}
            >
                <div className={clsx('mx-auto flex w-full max-w-screen-lg items-center justify-between p-4')}>
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
