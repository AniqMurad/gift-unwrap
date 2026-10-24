import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        // Reset for actual route/query navigation, not hash or state-only updates.
        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null; // This component does not render anything visually
};

export default ScrollToTop;
