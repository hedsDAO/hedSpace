import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") setTimeout(() => window.scrollTo(0, 0), 3000);
  }, [pathname]);

  return null;
};

export default ScrollWrapper;
