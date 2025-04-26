import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top of the page whenever the location changes
        window.scrollTo(0, 0);
    }, [location]); // Depend on location so it triggers when the route changes

    return null; // This component does not render anything visually
};

export default ScrollToTop;
