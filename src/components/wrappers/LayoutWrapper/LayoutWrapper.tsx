import { Outlet } from "react-router";
import { Container } from "@chakra-ui/react";
import Footer from "@/components/navs/Footer/Footer";
import Navbar from "@/components/navs/Navbar/Navbar";
import * as styles from "@/components/wrappers/LayoutWrapper/styles";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store/store";

const LayoutWrapper = () => {
  const { pathname } = useLocation();
  const isUnloading = useSelector(store?.select?.globalModel?.selectIsUnloading);
  useEffect(() => {
    if (typeof window !== "undefined" && !isUnloading) {
      setTimeout(() => window.scrollTo(0, 0), 1000);
    }
  }, [pathname, isUnloading]);

  return (
    <Container {...styles.$containerStyles}>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default LayoutWrapper;
