import { SlideFade, Stack, Text } from "@chakra-ui/react";
import { store } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingLatestEvent = () => {
  const navigate = useNavigate();
  const latestEvent = useSelector(store?.select?.landingModel?.selectLatestEvent);

  return (
    <SlideFade
      transition={{
        enter: {
          delay: 2,
          duration: 1,
        },
      }}
      in={!!latestEvent && true}
    >
      <Stack gap={0}>
        <Text
          mt={14}
          mb={8}
          color="white"
          fontWeight={"medium"}
          lineHeight={{ base: "30px", lg: "60px" }}
          fontSize={{ base: "xl", lg: "3xl" }}
        >
          {latestEvent?.startTime ? (
            <>{`our next event, ${latestEvent.name} is on ${new Date(
              latestEvent?.startTime
            ).toLocaleDateString()} at the hedSTORE`}</>
          ) : null}
        </Text>
        <Text
          onClick={() => navigate("/event/" + latestEvent?.id)}
          _hover={{ cursor: "pointer", borderColor: "white", color: "white !important" }}
          _focus={{ borderColor: "white", color: "white !important" }}
          transition={"0.3s all ease-in-out"}
          py={{ base: 3, lg: 1 }}
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
          FREE ENTRY WITH{" "}
          <Text textUnderlineOffset={"6px"} textDecoration={"underline"} as="span">
            RSVP
          </Text>
        </Text>
      </Stack>
    </SlideFade>
  );
};

export default LandingLatestEvent;
