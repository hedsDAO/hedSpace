import { Button, Fade, SlideFade, Stack, Text } from "@chakra-ui/react";
import { store } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingLatestEvent = () => {
  const navigate = useNavigate();
  const isUnloading = useSelector(store?.select?.globalModel?.selectIsUnloading);
  const latestEvent = useSelector(store?.select?.landingModel?.selectLatestEvent);

  return (
    <SlideFade
      style={{ zIndex: 1000 }}
      transition={{
        enter: {
          delay: 2,
          duration: 1,
        },
      }}
      in={!isUnloading}
    >
      {latestEvent?.id ? (
        <Stack alignItems={"start"} gap={0}>
          <Stack gap={0} alignItems={"start"}>
            <SlideFade
              style={{ zIndex: 1000 }}
              transition={{
                enter: {
                  delay: 2.5,
                  duration: 1,
                },
              }}
              in={!isUnloading}
            >
              <Text textAlign={{ base: "center", lg: "center" }} color="heds.300" fontFamily={"open"} fontWeight={"light"}>
                OUR NEXT EVENT
              </Text>
            </SlideFade>
            <SlideFade
              style={{ zIndex: 1000 }}
              transition={{
                enter: {
                  delay: 3,
                  duration: 1,
                },
              }}
              in={!isUnloading}
            >
              <Text textTransform={"uppercase"} textAlign={{ base: "center", lg: "center" }} color="heds.100" fontFamily={"open"} fontWeight={"bold"}>
                {latestEvent.name}
              </Text>
            </SlideFade>
            <SlideFade
              style={{ zIndex: 1000 }}
              transition={{
                enter: {
                  delay: 3.5,
                  duration: 1,
                },
              }}
              in={!isUnloading}
            >
              <Text textAlign={{ base: "center", lg: "center" }} color="heds.300" fontFamily={"open"} fontWeight={"light"}>
                IS ON
              </Text>
            </SlideFade>
            <SlideFade
              style={{ zIndex: 1000 }}
              transition={{
                enter: {
                  delay: 4,
                  duration: 1,
                },
              }}
              in={!isUnloading}
            >
              <Text
                letterSpacing={"wider"}
                textTransform={"uppercase"}
                textAlign={{ base: "center", lg: "center" }}
                color="heds.100"
                fontFamily={"open"}
                fontWeight={"bold"}
              >
                {new Date(latestEvent?.startTime).toLocaleDateString()}
              </Text>
            </SlideFade>
          </Stack>
          <Button
            onClick={() => navigate("/event/" + latestEvent?.id)}
            _hover={{ cursor: "pointer", borderColor: "white", color: "white !important" }}
            _focus={{ borderColor: "white", color: "white !important" }}
            transition={"0.3s all ease-in-out"}
            py={{ base: 2, lg: 4 }}
            px={8}
            borderRadius={"full"}
            size="sm"
            bg="transparent"
            w={"fit-content"}
            border={"1px solid"}
            borderColor={"heds.green"}
            mt={7}
            color="heds.green"
            fontWeight={"medium"}
            lineHeight={{ base: "30px", lg: "50px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            RSVP
          </Button>
        </Stack>
      ) : (
        <Stack gap={0}>
          <Text mt={14} mb={8} color="white" fontWeight={"medium"} lineHeight={{ base: "30px", lg: "60px" }} fontSize={{ base: "xl", lg: "3xl" }}>
            view our upcoming events
          </Text>
          <Text
            onClick={() => navigate("/events")}
            _hover={{ cursor: "pointer", borderColor: "white", color: "white !important" }}
            _focus={{ borderColor: "white", color: "white !important" }}
            transition={"0.3s all ease-in-out"}
            py={{ base: 3, lg: 0 }}
            px={8}
            w={"fit-content"}
            border={"1px solid"}
            borderColor={"whiteAlpha.400"}
            mt={{ base: 2, lg: -2 }}
            color="whiteAlpha.700"
            fontWeight={"medium"}
            lineHeight={{ base: "30px", lg: "50px" }}
            fontSize={{ base: "md", lg: "lg" }}
          >
            all events <Text ml={1.5} mr={-1} fontSize="sm" as="i" className="fas fa-chevron-right" />
          </Text>
        </Stack>
      )}
    </SlideFade>
  );
};

export default LandingLatestEvent;
