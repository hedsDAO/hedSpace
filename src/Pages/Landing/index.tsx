import {
  Stack,
  Box,
  useDisclosure,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import RsvpModal from "../../Components/RsvpModal";
import LandingDetails from "@/Components/LandingDetails";
import { FLYER_PROMO_IMAGE, splineBgVideo1 } from "@/Store/constants";

const LandingPage = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showVideo = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing="0"
        minH="92vh"
        maxH="92vh"
        // overflowY="hidden"
        // mt={{ base: "64px", lg: "78px" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          typeof="video/quicktime"
          src={FLYER_PROMO_IMAGE}
          style={{
            width: showVideo ? "60vw" : "100vw",
            minHeight: showVideo ? "92vh" : "40vh",
            objectFit: showVideo ? "fill" : "fill",
          }}
        />

        <Box
          display={showVideo ? "flex" : "initial"}
          overflowY={"auto"}
          paddingTop={showVideo ? "0" : "10"}
          width={{ base: "100vw", lg: "50vw" }}
          height={{ base: "24rem", lg: "92vh" }}
        >
          {showVideo && (
            <video
              autoPlay
              muted
              loop
              playsInline
              typeof="video/mp4"
              src={splineBgVideo1}
              style={{
                width: "40%",
                height: "100%",
                minHeight: "90vh",
                objectFit: "cover",
              }}
            />
          )}
          <LandingDetails onOpen={onOpen} showVideo={showVideo} />
        </Box>
      </Stack>
      <RsvpModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

export default LandingPage;
