import '@/app/globals.css';
import { Inter } from 'next/font/google';
import ProgressBar from '@/app/utils/progressBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </head>
            <body className={`${inter.className} debug-screens`}>
                {children}
                <ProgressBar />
            </body>
        </html>
    );
}
