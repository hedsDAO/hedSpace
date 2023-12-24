import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import RsvpModal from "../../Components/RsvpModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";

const LandingPage = (props: any) => {
  const naviagte = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedin = useSelector(
    (state: RootState) => state.userModel.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.userModel.user);

  const maxHeight = useBreakpointValue({ base: "35vh", lg: "45vh" });

  return (
    <>
      <Box
        position="fixed"
        maxWidth={{ base: "full", "2xl": "1200px" }}
        minW={{ base: "100%", xl: "full", "2xl": "unset" }}
        minH={{ base: "80%", lg: "unset" }}
        top={{ base: "10%", lg: "20%" }}
        left={{ base: "0", lg: "20%" }}
        right={{ base: "0", lg: "20%" }}
        color="white"
        borderRadius={{ base: 0, lg: 2 }}
        p={4}
        mt={{ base: 2.5, lg: 4 }}
        bg="rgba(0, 0, 0, 0.65)"
      >
        <Stack
          mt={{ base: 2, lg: 0 }}
          gap={{ base: 7, lg: 0 }}
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            typeof="video/quicktime"
            src="https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/flyers%2F2652e281-abd8-46b7-bd8f-db19fd1f9719.mp4?alt=media&token=a18ae904-4699-420e-b989-081fc8989332"
            style={{ maxHeight, borderRadius: "4px" }}
          />
          <Stack gap={{ base: 1, lg: 0 }} ml={{ base: 0, lg: 8 }}>
            <Stack
              gap={{ base: 2, lg: 1 }}
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
                  fontSize={{ base: "4xl", lg: "5xl" }}
                  opacity={0.75}
                  fontFamily='"space-grotesk", sans-serif'
                  letterSpacing="-0.08em"
                >
                  {" "}
                  club{" "}
                </Text>
                <Text
                  fontSize={{ base: "5xl", lg: "7xl" }}
                  opacity={0.9}
                  fontFamily='"space-grotesk", sans-serif'
                  letterSpacing="-0.08em"
                >
                  {" "}
                  LIWAG{" "}
                </Text>
              </Stack>
              <Text
                textColor=""
                textAlign={{ base: "center", lg: "left" }}
                fontFamily='"space-grotesk", sans-serif'
                fontSize={{ base: "xs", lg: "large" }}
                minW={{ base: "100%", lg: "520px" }}
                px={{ base: 2, lg: 0 }}
              >
                {" "}
                <Text mr={0.5} as="span" fontWeight={"bold"}>
                  ATTN: LOS ANGELES
                </Text>{" "}
                <Text fontWeight="light" as="span" color="#D7CCD0">
                  Live and direct from the new{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/hedsDAO"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.800"
                      as="span"
                      fontWeight={"semibold"}
                    >
                      @heds.app
                    </Text>{" "}
                  </Link>
                  space on December 20, we proudly announce an audiovisual
                  show/experience by{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/JohnLiwag"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.800"
                      as="span"
                      fontWeight={"semibold"}
                    >
                      @johnliwag
                    </Text>{" "}
                  </Link>
                  x{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/clubacti0n"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.800"
                      as="span"
                      fontWeight={"semibold"}
                    >
                      @clubaction
                    </Text>
                  </Link>
                </Text>
              </Text>
            </Stack>
            <Stack
              pb={1}
              pt={{ base: 1.5, lg: 4 }}
              gap={{ base: 1, lg: 0 }}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="start"
              >
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  fontWeight={"semibold"}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  WHERE{" "}
                </Text>
                <Text
                  fontFamily='"space-grotesk", sans-serif'
                  textColor="whiteAlpha.800"
                  fontSize={{ base: "xs", lg: "medium" }}
                >
                  {" "}
                  7515 Melrose Ave, Los Angeles{" "}
                </Text>
              </Stack>
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="start"
              >
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  fontWeight={"semibold"}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  WHEN{" "}
                </Text>
                <Text
                  ml={1}
                  textColor="whiteAlpha.800"
                  fontSize={{ base: "xs", lg: "medium" }}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  Dec 20th 2023, 7:00PM PST{" "}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <RsvpModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

export default LandingPage;
