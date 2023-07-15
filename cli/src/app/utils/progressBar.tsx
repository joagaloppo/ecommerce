'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const ProgressBar: React.FC = () => {
    return <AppProgressBar height="2px" color="#ec4899" options={{ showSpinner: false }} shallowRouting />;
};

export default ProgressBar;
