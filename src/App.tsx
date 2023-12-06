import { Route, Routes, Outlet } from "react-router-dom";
import LandingPage from "@/Pages/Landing";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Event from "@/Pages/Event";
import { Box, Spacer } from "@chakra-ui/react";
import { splineBgVideo1 } from "./Store/constants";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      minHeight="100vh"
    >
      <Box position="absolute" width="100%" height="100%" zIndex="-1">
        <video
          autoPlay
          muted
          loop
          playsInline
          typeof="video/mp4"
          src={splineBgVideo1}
          style={{
            position: "fixed",
            minHeight: "100vh",
            objectFit: "cover",
          }}
        ></video>
      </Box>
      <Navbar />
      <Box flex="1" display="flex" flexDirection="column">
        <Outlet />
      </Box>
      <Spacer />
      <Footer />
    </Box>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        {/* <Route path="/event" element={<Event />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
