import { Outlet } from "react-router";
import { Container } from "@chakra-ui/react";
import Footer from "@/components/navs/Footer/Footer";
import Navbar from "@/components/navs/Navbar/Navbar";
import * as styles from "@/components/wrappers/LayoutWrapper/styles";

const LayoutWrapper = () => {
  return (
    <Container {...styles.$containerStyles}>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default LayoutWrapper;
