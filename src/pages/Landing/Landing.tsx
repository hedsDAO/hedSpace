import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";
import { Box, Stack } from "@chakra-ui/react";
import DesktopCalendar from "@/pages/Landing/components/DesktopCalendar/DesktopCalendar";
import MobileCalendar from "@/pages/Landing/components/MobileCalendar/MobileCalendar";
import RSVPModal from "@/components/modals/RSVPModal/RSVPModal";
import { PLACEHOLDER_IMAGE } from "@/store/constants";

const Landing = () => {
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.landingModel.getEvents();
  }, []);

  return (
    <Stack
      gap={0}
      // justifyContent={"center"}
      maxH="100vh"
      minH={{ base: "79vh", lg: "90vh", xl: "87vh" }}
      minW="100vw"
      maxW="100vw"
      alignItems={"center"}
    >
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        backgroundImage={`url(${PLACEHOLDER_IMAGE})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        filter="blur(15px)"
        opacity={0.75}
        zIndex="-1"
      />
      <DesktopCalendar />
      <MobileCalendar />
      <RSVPModal />
    </Stack>
  );
};

export default Landing;
