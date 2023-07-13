'use client';

import Featured from '@/app/landing/featured';
import Products from '@/app/landing/products';
import Footer from '@/app/components/footer';
import Nav from '@/app/components/nav';
import ScrollUp from '@/app/utils/scrollUp';

const Page = () => {
    return (
        <>
            <ScrollUp />
            <Nav />
            <div className="h-[70px]" />
            <Featured />
            <hr />
            <Products />
            <Footer />
        </>
    );
};

export default Page;
