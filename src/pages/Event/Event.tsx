import IMAGES from "@/images";
import { Dispatch, store } from "@/store/store";
import { Box, Button, Flex, GridItem, Image, SimpleGrid, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CountdownClock from "./components/CountdownClock/CountdownClock";

const Event = () => {
  const [isExpanded, setIsExpanded] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.eventModel.selectEvent);
  const rsvps = useSelector(store.select.eventModel.selectRSVPs);
  const { id } = useParams();

  useEffect(() => {
    if (id && !event) {
      dispatch.eventModel.getEventById(id);
    }
    return () => {
      dispatch.eventModel.clearState();
    };
  }, [id]);

  const returnRandomColor = () => {
    const colors = ["red.500", "blue.500", "green.600", "teal.600", "orange.400", "gray.400"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Stack bg="blackAlpha.800" mt={-2} py={5} minH="90vh">
      <Box
        as={"video"}
        playsInline
        autoPlay
        loop
        muted
        maxH="100vh"
        minW="100vw"
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        backgroundImage={`url(${event?.image})`}
        src={event?.video}
        style={{ objectFit: "contain" }}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        filter="blur(10px)"
        opacity={0.6}
        zIndex="-1"
      />
      <SimpleGrid px={2} gap={2} columns={{ lg: 6 }}>
        <GridItem colSpan={2}>
          <Stack minH="full" gap={0}>
            <Image p={5} shadow="md" src={event?.image} objectFit={"fill"} bg="black" />
          </Stack>
        </GridItem>
        <GridItem as={Stack} px={2} gap={4} colSpan={4}>
          <Flex gap={6} py={5} px={0.5} bg="black" minW="100%">
            <Stack pl={5} gap={0}>
              <Box shadow="sm" roundedTop="0" bg="red.500" px={6} py={1.5}>
                {event?.endTime && (
                  <Text color="white" fontWeight={"bold"} fontSize={"xs"} textTransform={"uppercase"}>
                    {new Date(event?.endTime).toDateString().split(" ")?.[1]}
                  </Text>
                )}
              </Box>
              <Box shadow={"sm"} roundedBottom={"0"} bg="white" px={2} pb={1.5} pt={1}>
                {event?.endTime && (
                  <Text
                    textAlign={"center"}
                    color="black"
                    fontWeight={"normal"}
                    fontSize={"2xl"}
                    textTransform={"uppercase"}
                  >
                    {new Date(event?.endTime).toDateString().split(" ")?.[2]}
                  </Text>
                )}
              </Box>
            </Stack>
            <Stack alignItems={"start"} gap={0}>
              <Text fontWeight={"medium"} fontFamily={"open"} fontSize={"4xl"} color="white">
                {event?.name}
              </Text>
              <Text maxW="70ch" isTruncated color="whiteAlpha.700" fontSize={"xs"}>
                {event?.description}
              </Text>
            </Stack>
          </Flex>
          {event?.endTime && (
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={4}
              py={3.5}
              pl={5}
              pr={3.5}
              bg="black"
              minW="100%"
            >
              <CountdownClock endTime={event?.endTime} />
              <Button
                onClick={() => {
                  dispatch.rsvpModel.setEvent(event);
                }}
                px={5}
                bg="white"
                _hover={{ bg: "whiteAlpha.700" }}
                rounded="none"
                size="sm"
              >
                <Text color="black" fontWeight={"bold"} fontSize={"xs"}>
                  RSVP
                </Text>
              </Button>
            </Flex>
          )}
          <Flex alignItems={"center"} gap={4} p={3} bg="black" minW="100%">
            <SimpleGrid gap={2} minW="100%" columns={12}>
              {rsvps?.slice(0, isExpanded ? -1 : 21)?.map((rsvp) => {
                return (
                  <GridItem
                    key={rsvp.id}
                    justifyContent={"center"}
                    alignItems={"center"}
                    as={Stack}
                    aspectRatio={1}
                    colSpan={1}
                  >
                    <Box
                      as={Stack}
                      justifyContent={"center"}
                      alignItems={"center"}
                      aspectRatio={1}
                      boxSize="100%"
                      rounded={"none"}
                      bg={returnRandomColor()}
                    >
                      <Text fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} fontSize="2xs">
                        {rsvp.users.displayName.split(" ")?.[0]?.[0]}
                        {rsvp.users.displayName.split(" ")?.[1]?.[0]}
                      </Text>
                    </Box>
                  </GridItem>
                );
              })}
              <GridItem
                onClick={() => setIsExpanded.toggle()}
                justifyContent={"center"}
                alignItems={"center"}
                as={Stack}
                aspectRatio={1}
                colSpan={1}
              >
                <Box
                  as={Stack}
                  justifyContent={"center"}
                  alignItems={"center"}
                  aspectRatio={1}
                  boxSize="100%"
                  rounded={"sm"}
                >
                  <Text color="white" fontSize={"2xl"} as="i" className="fa-solid fa-ellipsis" />
                </Box>
              </GridItem>
            </SimpleGrid>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};

export default Event;
