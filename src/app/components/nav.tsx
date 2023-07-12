'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { HiOutlineMenu as Menu, HiOutlineShoppingBag as Cart } from 'react-icons/hi';
import { IoCloseSharp as Close } from 'react-icons/io5';
import * as Dialog from '@radix-ui/react-dialog';

const links = [
    {
        text: 'about',
        onClick: () => null,
    },
    {
        text: 'projects',
        onClick: () => null,
    },
    {
        text: 'contact',
        onClick: () => null,
    },
];

const MenuDrawer = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* DESKTOP */}
            <ul className="hidden sm:flex sm:gap-4">
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

            <Dialog.Root open={open} onOpenChange={() => setOpen((x) => !x)}>
                <Dialog.Content
                    className={clsx(
                        'absolute z-50',
                        'w-[94vw] max-w-md rounded-xl p-4',
                        'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                        'bg-white dark:bg-gray-800',
                        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                    )}
                >
                    <div className="mx-auto flex h-fit w-full flex-col bg-white p-4 shadow-[0px_8px_4px_rgba(0,0,0,0.05)]">
                        <ul className="flex flex-grow flex-col items-center gap-4">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <span
                                        onClick={() => {
                                            link.onClick();
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer text-xl font-semibold text-gray-800"
                                    >
                                        {link.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

const CartDrawer = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* DESKTOP */}
            <ul className="hidden sm:flex sm:gap-4">
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

            <Dialog.Root open={open} onOpenChange={() => setOpen((x) => !x)}>
                <Dialog.Content
                    className="visible fixed inset-0 z-50 flex h-fit w-full justify-end sm:invisible"
                    aria-label="Drawer"
                >
                    <div className="mx-auto flex min-h-[100dvh] w-full flex-col overflow-y-auto bg-white px-4 py-5 lg:px-6 lg:py-6">
                        <button onClick={() => setOpen(false)} className="flex w-full justify-end">
                            <Close className="text-primary h-6 w-auto" />
                        </button>
                        <ul className="flex h-auto flex-grow flex-col items-center justify-center gap-8">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <span
                                        onClick={() => {
                                            link.onClick();
                                            setOpen(false);
                                        }}
                                        className="text-primary cursor-pointer text-2xl font-semibold"
                                    >
                                        {link.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

const Nav: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const checkScroll = () => setIsScrolled(window.scrollY > 10);

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <nav
            className={clsx(
                'fixed z-50 w-full bg-white/95 py-4 backdrop-blur-sm transition-all duration-300 ease-in-out lg:py-6',
                isScrolled && 'border-b-0 shadow-[0px_8px_4px_rgba(0,0,0,0.05)]'
            )}
        >
            <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between px-4 lg:px-6">
                <MenuDrawer />
                <Link href="/">
                    <h1 className="sr-only">Jetlag Fundas</h1>
                    <Image src="/jetlag.png" alt="jetlag" width={200} height={104} className="h-8 w-auto" />
                </Link>
                <button>
                    <Cart className="h-[26px] w-auto text-gray-800" />
                </button>
            </div>
        </nav>
    );
};

export default Nav;
