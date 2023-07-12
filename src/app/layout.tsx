import { Inter, Chivo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const chivo = Chivo({ subsets: ['latin'] });

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
            <body className={`${chivo.className} debug-screens`}>{children}</body>
        </html>
    );
}
