import { Route, Routes, Outlet } from "react-router-dom";
import LandingPage from "@/Pages/Landing";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Event from "@/Pages/Event";
import { Box } from "@chakra-ui/react";
import { splineBgVideo1 } from "./Store/constants";

const Layout = () => {
  return (
    <Box>
      <Box>
        <video
          autoPlay
          muted
          loop
          style={{
            position: "relative",
            minWidth: "100vw",
            minHeight: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={splineBgVideo1} type="video/webm" />
          Your browser does not support the video tag.
        </video>
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
