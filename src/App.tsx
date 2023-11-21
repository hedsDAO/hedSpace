import { Fragment, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Box } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

const Layout = () => {
  const splineUrl =
    "https://prod.spline.design/6O8A9d3yUvB0o6dE/scene.splinecode";

  return (
    <Box>
      <Box>
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
        {/* <Route index element={<LandingPage />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
