import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // We use window.scrollTo with a smooth behavior for a premium UX
        // You can use 'auto' for instant jump, but 'smooth' is more elegant
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
