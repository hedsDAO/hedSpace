import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { Stack } from "@chakra-ui/react";
import DesktopCalendar from "@/pages/Landing/components/DesktopCalendar/DesktopCalendar";
import MobileCalendar from "@/pages/Landing/components/MobileCalendar/MobileCalendar";
import RSVPModal from "@/components/modals/RSVPModal/RSVPModal";

const Landing = () => {
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.landingModel.getEvents();
  }, []);

  return (
    <Stack
      gap={0}
      maxH="100vh"
      minH={{ base: "79vh", lg: "90vh", xl: "87vh" }}
      minW="100vw"
      maxW="100vw"
      alignItems={"center"}
    >
      <DesktopCalendar />
      <MobileCalendar />
      <RSVPModal />
    </Stack>
  );
};

export default Landing;
