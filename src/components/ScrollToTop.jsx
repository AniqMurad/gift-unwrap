import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const frame = window.requestAnimationFrame(() => {
                document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
            });
            return () => window.cancelAnimationFrame(frame);
        }

        window.scrollTo(0, 0);
        return undefined;
    }, [pathname, search, hash]);

    return null; // This component does not render anything visually
};

export default ScrollToTop;
