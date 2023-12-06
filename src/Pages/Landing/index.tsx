import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const LandingPage = () => {
  const naviagte = useNavigate();
  const maxHeight = useBreakpointValue({ base: "45vh", lg: "55vh" });
  // const maxWidth = useBreakpointValue({ base: "80vw", lg: "20vw" });
  return (
    // <Flex dir="column" justifyContent="center" alignItems="center" mt={{ base: "140px", lg: "120px"}} >
    // <video
    //   autoPlay
    //   muted
    //   loop
    //   playsInline
    //   typeof="video/quicktime"
    //   src="https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/flyers%2FclubLIWAG-FLYER-3.5.mov?alt=media&token=7bc6a71b-c2c8-4556-8008-199249869d3c"
    //   style={{
    //     // top: "10%",
    //     // left: "25%",
    //     // right: "25%",
    //     // bottom: "55%",
    //     // position: "fixed",
    //     maxHeight,
    //     maxWidth,
    //     // objectFit: "cover",
    //   }}
    // >
    // </video>
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
          // boxSize={{ base: "212px", lg: "424px" }}
          // borderRadius={16}
          // margin="8px"
        />
        <Stack ml={{ base: 0, lg: 8 }}>
          <Stack
            gap={1}
            maxWidth="300px"
            maxHeight={maxHeight}
            alignItems={{ base: "center", lg: "flex-start" }}
          >
            <Stack flexDir="row" justifyContent="center" alignItems="baseline" gap={0}>
              <Text
                fontSize={{ base: "xl", lg: "6xl" }}
                fontFamily="space-grotesque"
                letterSpacing={3}
              >
                {" "}
                club{" "}
              </Text>
              <Text
                fontSize={{ base: "2xl", lg: "8xl" }}
                fontFamily="space-grotesque"
                letterSpacing={3}
              >
                {" "}
                LIWAG{" "}
              </Text>
            </Stack>
            <Text
              textColor="#D7CCD0"
              fontFamily="space-grotesque"
              fontSize={{ base: "small", lg: "large" }}
              minW={{ base: "100%", lg: "500px" }}
            >
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque in
              at nisi voluptatum repellendus iure beatae a, illum hic tempore
              consequatur consectetur corrupti ut? Dignissimos at repudiandae
              maiores nulla ipsam.
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
                fontFamily="space-grotesque"
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
                fontFamily="space-grotesque"
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
              fontFamily="space-grotesque"
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
    // </Flex>
  );
};

export default LandingPage;
