import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router";
import Navbar from "../navs/Navbar/Navbar";
import Footer from "../navs/Footer/Footer";
import { useLocation } from "react-router-dom";

const LayoutWrapper = () => {
  const { pathname } = useLocation();
  return (
    <Container px={0} minH="100vh" minW="100vw" maxW="100vw">
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default LayoutWrapper;
