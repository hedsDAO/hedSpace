import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import RsvpModal from "../../Components/RsvpModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { FLYER_PROMO_IMAGE } from "@/Store/constants";

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
        maxWidth={{ base: "full", "lg": "880px" }}
        // minW={{ base: "full", xl: "full", "2xl": "unset" }}
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
          gap={{ base: 7, lg: 2 }}
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            typeof="video/quicktime"
            src={FLYER_PROMO_IMAGE}
            style={{ maxHeight, borderRadius: "4px" }}
          />
          <Stack gap={{ base: 1, lg: 0 }} ml={{ base: 0, lg: 8 }}>
            <Stack
              gap={{ base: 2, lg: 1 }}
              maxWidth="350px"
              maxHeight={maxHeight}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Stack gap={0}>
                <Text
                  fontSize={{ base: "xl", lg: "3xl" }}
                  opacity={0.9}
                  fontWeight={"bold"}
                  textAlign={{ base: "center", lg: "left" }}
                  fontFamily={"sans-serif"}
                  // fontFamily='"space-mono", sans-serif'
                >
                  NEW YEARS EVE 2024
                </Text>
                <Text
                  fontSize={{ base: "lg", lg: "2xl" }}
                  opacity={0.75}
                  mt={-1}
                  textAlign={{ base: "center", lg: "left" }}
                  fontFamily='"space-grotesk", sans-serif'
                  fontStyle={"italic"}
                >
                  @ hedSTORE
                </Text>
              </Stack>
              <Text
                textColor=""
                textAlign={{ base: "center", lg: "left" }}
                fontFamily='"space-grotesk", sans-serif'
                fontSize={{ base: "s", lg: "large" }}
                minW={{ base: "100%", lg: "520px" }}
                px={{ base: 2, lg: 0 }}
              >
                {" "}
                <Text
                  mr={0.5}
                  fontFamily="monospace"
                  as="span"
                  color="#dbffd6"
                  fontWeight={"medium"}
                  fontSize="md"
                >
                  <Text fontWeight={"bold"} as="span" fontSize={"lg"}>
                    LOS ANGELES
                  </Text>{" "}
                </Text>{" "}
                <Text fontWeight="light" color="#D7CCD0">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/hedsDAO"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="white"
                      as="span"
                      textUnderlineOffset={"2px"}
                      fontWeight={"bold"}
                    >
                      @heds.app
                    </Text>{" "}
                  </Link>
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.900"
                    fontWeight={"medium"}
                    as="span"
                  >
                    featuring VOID Acoustics & DJ sets from{" "}
                  </Text>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/madimakesmusica"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.900"
                      as="span"
                      fontWeight={"semibold"}
                    >
                      @madimakesmusica
                    </Text>{" "}
                  </Link>
                  x{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/DeffieDeff"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.900"
                      as="span"
                      fontWeight={"semibold"}
                      mr="8px"
                    >
                      @deffiedeff
                    </Text>
                  </Link>
                  x <br />
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/sober_rob"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.900"
                      as="span"
                      fontWeight={"semibold"}
                      mr="8px"
                    >
                      @soberrob
                    </Text>
                  </Link>
                  x{" "}
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={"https://twitter.com/JohnLiwag"}
                  >
                    <Text
                      _hover={{ textDecoration: "underline" }}
                      color="whiteAlpha.900"
                      as="span"
                      fontWeight={"semibold"}
                      mr="8px"
                    >
                      @JOHN LIWAG
                    </Text>
                  </Link>
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.900"
                    fontWeight={"medium"}
                    as="span"
                  >
                    & more.{" "}
                  </Text>
                </Text>
              </Text>
            </Stack>
            <Stack
              pb={1}
              pt={{ base: 1.5, lg: 4 }}
              gap={{ base: 0, lg: 0 }}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="start"
              >
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  fontWeight={"bold"}
                  color="#dbffd6"
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  WHERE{" "}
                </Text>
                <Text
                  fontFamily='"space-grotesk", sans-serif'
                  textColor="whiteAlpha.900"
                  fontWeight={"semibold"}
                  fontSize={{ base: "xs", lg: "medium" }}
                  textTransform="uppercase"
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
                  fontWeight={"bold"}
                  color="#dbffd6"
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  WHEN{" "}
                </Text>
                <Text
                  ml={1}
                  textColor="whiteAlpha.900"
                  fontSize={{ base: "xs", lg: "medium" }}
                  fontFamily='"space-grotesk", sans-serif'
                  fontWeight={"semibold"}
                  textTransform="uppercase"
                >
                  {" "}
                  Dec 31st 2023, 7:00PM PST{" "}
                </Text>
              </Stack>
              {!isLoggedin ? (
                <Button
                  _hover={{ color: "black", bg: "white" }}
                  alignItems="center"
                  fontFamily='"space-grotesk", sans-serif'
                  justifyContent="center"
                  textColor="black"
                  bgColor="white"
                  borderRadius={"none"}
                  height={{ base: "32px", lg: "46px" }}
                  fontSize={{ base: "lg", lg: "2xl" }}
                  width="100%"
                  marginTop={{ base: "4px", lg: "30px" }}
                  onClick={onOpen}
                >
                  RSVP
                </Button>
              ) : (
                <Text
                  mt={{ base: "12px", lg: "30px" }}
                  fontFamily='"space-grotesk", sans-serif'
                  fontSize={{ base: "lg", lg: "2xl" }}
                  fontWeight={"semibold"}
                  color="#dbffd6"
                >
                  {user?.displayName ? (
                    <Text as="span">RSVP confirmed for {user.displayName}</Text>
                  ) : (
                    <Spinner size="xs" />
                  )}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <RsvpModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </>
  );
};

export default LandingPage;
