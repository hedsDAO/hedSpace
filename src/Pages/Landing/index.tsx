import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const LandingPage = () => {
  const naviagte = useNavigate();
  const maxHeight = useBreakpointValue({ base: "45vh", lg: "55vh" });
  return (
    <Box
      position="fixed"
      maxWidth="900px"
      top={{ base: "10%", lg: "20%" }}
      left={{ base: "10%", lg: "20%" }}
      right={{ base: "10%", lg: "20%" }}
      color="white"
      borderRadius={16}
      p={4}
      mt={4}
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
        <video
          autoPlay
          muted
          loop
          playsInline
          typeof="video/quicktime"
          src="https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/flyers%2FclubLIWAG-FLYER-3.5.mov?alt=media&token=7bc6a71b-c2c8-4556-8008-199249869d3c"
          style={{ maxHeight }}
        />
        <Stack ml={{ base: 0, lg: 8 }}>
          <Stack
            gap={1}
            maxWidth="320px"
            maxHeight={maxHeight}
            alignItems={{ base: "center", lg: "flex-start" }}
          >
            <Stack
              flexDir="row"
              justifyContent="center"
              alignItems="baseline"
              gap={0}
            >
              <Text
                fontSize={{ base: "xl", lg: "6xl" }}
                fontFamily='"space-grotesk", sans-serif'
                letterSpacing={3}
              >
                {" "}
                club{" "}
              </Text>
              <Text
                fontSize={{ base: "2xl", lg: "8xl" }}
                fontFamily='"space-grotesk", sans-serif'
                letterSpacing={3}
              >
                {" "}
                LIWAG{" "}
              </Text>
            </Stack>
            <Text
              textColor="#D7CCD0"
              fontFamily= '"space-grotesk", sans-serif'
              fontSize={{ base: "sm", lg: "large" }}
              minW={{ base: "100%", lg: "500px" }}
              fontWeight="bold"
            >
              {" "}
              ATTN: LOS ANGELES! Live and direct from the new @heds.app space on
              December 20, we proudly announce an audiovisual show/experience by
              @johnliwag x @clubaction
            </Text>
          </Stack>
          <Stack
            pt={{ base: 0, lg: 4 }}
            gap={0}
            alignItems={{ base: "center", lg: "flex-start" }}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                fontFamily='"space-grotesk", sans-serif'
              >
                {" "}
                Where{" "}
              </Text>
              <Text textColor="#D9CCCE" fontSize={{ base: "xs", lg: "medium" }}>
                {" "}
                7515 Melrose Ave, Los Angeles{" "}
              </Text>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                fontFamily='"space-grotesk", sans-serif'
              >
                {" "}
                When{" "}
              </Text>
              <Text
                ml={1}
                textColor="#D9CCCE"
                fontSize={{ base: "xs", lg: "medium" }}
              >
                {" "}
                Dec 20th 2023, 7:00PM PST{" "}
              </Text>
            </Stack>
            <Button
              alignItems="center"
              fontFamily='"space-grotesk", sans-serif'
              justifyContent="center"
              textColor="#000000"
              bgColor="#B099A0"
              borderRadius={12}
              height="28px"
              width="96px"
              marginTop={{ base: "8px", lg: "30px" }}
              onClick={() => naviagte("/event")}
            >
              RSVP
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingPage;
