import { Fragment, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import LandingPage from "@/Pages/Landing";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Event from "@/Pages/Event";
import { Box } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

const Layout = () => {
  const splineUrl =
    "https://draft.spline.design/j4oadUDBeyeihaPx/scene.splinecode";

  return (
    <Box>
      <Box cursor="grab">
        <Spline scene={splineUrl} />
      </Box>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/event" element={<Event />} />
      </Route>
    </Routes>
  );
};

export default App;
