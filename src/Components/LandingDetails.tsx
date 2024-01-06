import {
  Stack,
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";

const LandingDetails = ({
  onOpen,
  showVideo,
}: {
  onOpen: () => void;
  showVideo?: boolean;
}) => {
  const isLoggedin = useSelector(
    (state: RootState) => state.userModel.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.userModel.user);
  return (
    <>
      {showVideo ? (
        <Stack
          gap={4}
          mt={"12"}
          justifyContent={"start"}
          minH="92vh"
          width="55%"
          bg="rgba(255, 255, 255, 0.98)"
        >
          <Stack
            display="flex"
            wrap="wrap"
            gap="0"
            ml={{ base: "0px", lg: "24px" }}
            alignItems="baseline"
            maxWidth={{ xl: "80%" }}
            flexDir="column"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }}
              fontWeight="bolder"
              //   height="72px"
              fontFamily="space"
              mb="12px"
            >
              GO!
            </Text>
            <Text
              fontSize={{ base: "2xl", xl: "lg" }}
              fontWeight="normal"
              mb="24px"
              fontFamily={"inter"}
            >
              {/* A NEW ERA OF SOBER ROB BEGINS JANUARY 19TH AT THE HEDS LABORATORY ON MELROSE */}
              a new era of sober rob begins january 19th at the heds laboratory
              on melrose.
            </Text>
            {/* <Text
              fontFamily={"inter"}
              fontSize={{ base: "xl", xl: "3xl" }}
              fontWeight="normal"
              mb="24px"
            //   lineHeight={"22px"}
            >
              BEGINS JANUARY 19TH AT THE HEDS LABORATORY ON MELROSE.
            </Text> */}
            <Flex
              fontSize={{ base: "xl", xl: "lg" }}
              fontWeight="normal"
              flexDir="column"
              fontFamily={"inter"}
              mb="24px"
            >
              <Text>1.19.2023</Text>
              <Text>8PM - Late</Text>
              <Text>7515 Melrose Ave</Text>
            </Flex>
            <Text
              fontSize={{ base: "xl", xl: "lg" }}
              fontWeight="normal"
              letterSpacing={"tight"}
              lineHeight="22px"
              fontFamily={"inter"}
              mb="24px"
            >
              {/* THIS IS AN INTIMATE SPACE BUILT BY ARTISTS WITH THE HIGHEST
              QUALITY SOUND, HIGHEST QUALITY VISUALS, INTERACTIVE ART
              INSTALLATIONS, CUSTOM EVENT CLOTHING, AND A BLOSSOMING COMMUNITY
              OF FANS TO BRING IT ALL TOGETHER.  */}
              this is an intimate space built by artists with the highest
              quality sound, highest quality visuals, interactive art
              installations, custom event clothing, and a blossoming community
              of fans to bring it all together.
            </Text>
            {/* <Text
              fontSize={{ base: "xl", xl: "lg" }}
              fontWeight="normal"
              letterSpacing={"tight"}
              lineHeight="22px"
              fontFamily={"inter"}
              mb="24px"
            >
              Hosted at the all new hedSTORE on Melrose, this event captures the
              heart of hi-fi sound system culture, promising a night that sets
              the tone for the year to come with a live countdown to the stroke
              of midnight.
            </Text> */}
            <Stack
              align="center"
              mb="24px"
              border={isLoggedin ? "0" : "1px"}
              justifyContent="center"
            >
              {!isLoggedin ? (
                <Button onClick={onOpen}>
                  <Flex align="center" mr="-8px">
                    <Box
                      width="40px"
                      height="1px"
                      bg="currentColor"
                      mr="-8px"
                    />
                    <ChevronRightIcon gap="0" />
                  </Flex>
                  <Text
                    bg="transparent"
                    fontSize="xl"
                    fontWeight="normal"
                    ml="16px"
                  >
                    free rsvp
                  </Text>
                </Button>
              ) : (
                <Text
                  mt={{ base: "12px", lg: "30px" }}
                  fontFamily='"space-grotesk", sans-serif'
                  fontSize={{ base: "lg", lg: "2xl" }}
                  fontWeight="bold"
                  color="green.500"
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
      ) : (
        <Box bg="rgba(255, 255, 255, 0.98)" overflowY="hidden" mb="12px">
          <Flex
            direction="column" // Flex container with column direction
            alignItems="center" // Align items to the start
            justifyContent="center"
            px="36px" // Padding for mobile
            gap="0" // Gap between elements
            height="100%"
          >
            <Flex
              direction="column"
              width="100%"
              alignItems="baseline"
              height="100%"
              justifyContent="flex-start"
              overflowY="hidden"
              gap="1"
            >
              <Text
                fontSize="4xl"
                fontWeight="bold"
                fontFamily="space"
                lineHeight="36px"
                mb="4px"
              >
                GO!
              </Text>
              {!isLoggedin ? (
                <Button onClick={onOpen} mb="4px">
                  <Flex align="center" mr="-8px">
                    <Box
                      width="40px"
                      height="1px"
                      bg="currentColor"
                      mr="-8px"
                    />
                    <ChevronRightIcon gap="0" />
                  </Flex>
                  <Text
                    bg="transparent"
                    fontSize="xl"
                    fontWeight="normal"
                    ml="16px"
                  >
                    free rsvp
                  </Text>
                </Button>
              ) : (
                <Text
                  // mt={{ base: "0", lg: "30px" }}
                  mb="4px"
                  fontFamily='"space-grotesk", sans-serif'
                  fontSize={{ base: "lg", lg: "2xl" }}
                  fontWeight="bold"
                  color="green.500"
                >
                  {user?.displayName ? (
                    <Text as="span">RSVP confirmed for {user.displayName}</Text>
                  ) : (
                    <Spinner size="xs" />
                  )}
                </Text>
              )}
              <Text
                fontSize="md"
                fontWeight="normal"
                fontFamily="inter"
                mb="8px"
              >
                a new era of sober rob begins january 19th at the heds
                laboratory on melrose.
              </Text>
              <Flex
                fontSize="md"
                fontWeight="normal"
                flexDir="column"
                fontFamily="inter"
                mb="8px"
              >
                <Text>1.19.2023</Text>
                <Text>8PM - Late</Text>
                <Text>7515 Melrose Ave</Text>
              </Flex>
              <Text
                fontSize="md"
                fontWeight="normal"
                letterSpacing="tight"
                lineHeight="22px"
                fontFamily="inter"
                mb="4px"
              >
                this is an intimate space built by artists with the highest
                quality sound, highest quality visuals, interactive art
                installations, custom event clothing, and a blossoming community
                of fans to bring it all together.
              </Text>
              <HStack align="center" justifyContent="center"></HStack>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default LandingDetails;
