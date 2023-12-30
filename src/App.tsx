import { Route, Routes, Outlet } from "react-router-dom";
import LandingPage from "@/Pages/Landing";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Event from "@/Pages/Event";
import { Box, Spacer, Stack } from "@chakra-ui/react";
import { splineBgVideo1 } from "./Store/constants";

const Layout = () => {
  return (
    <Stack minW='100%' minH="100vh" maxH="100vh" overflowY={"hidden"} gap={0} bg="white">
      <Navbar />
      <Outlet />
    </Stack>
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
