// CustomHook.tsx
import { Suspense } from 'react';
import { useRouter } from 'next/router';

const SuspenseBoundary = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useRouter();

    // Check if the page path requires the Suspense boundary
    const needsSuspense = ['/404', '/', '/setting', '/profile', '/login', '/contactus', '/clothings'].includes(pathname);

    if (needsSuspense) {
        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
    }

    return <>{children}</>;
};

export default SuspenseBoundary;
