import { Dispatch, store } from "@/store/store";
import { Box, Button, Fade, Flex, GridItem, Image, SimpleGrid, Spinner, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CountdownClock from "./components/CountdownClock/CountdownClock";
import { isEventOver } from "@/store/utils";
import { EventRsvp } from "@/store/types";

const Event = () => {
  const attendingButtonRef = useRef<HTMLButtonElement>(null);
  const [userRsvp, setUserRsvp] = useState<EventRsvp | null>(null);
  const [isAttending, setIsAttending] = useBoolean();
  const [isExpanded, setIsExpanded] = useBoolean();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.eventModel.selectEvent);
  const rsvps = useSelector(store.select.eventModel.selectRSVPs);
  const userData = useSelector(store?.select.userModel.selectUser);
  const isLoading = useSelector(store?.select.eventModel.selectIsLoading);
  const { id } = useParams();

  useEffect(() => {
    if (userData?.eventRsvps && id) {
      userData?.eventRsvps?.filter((rsvp) => rsvp.eventId === parseInt(id)).length > 0 ? setIsAttending.on() : setIsAttending.off();
      if (userData?.eventRsvps?.filter((rsvp) => rsvp.eventId === parseInt(id)).length > 0) {
        const userDataRsvp = userData?.eventRsvps?.filter((rsvp) => rsvp.eventId === parseInt(id))[0];
        setUserRsvp(userDataRsvp);
        setIsAttending.on();
        if (attendingButtonRef?.current) {
          attendingButtonRef.current.textContent = "ATTENDING";
        }
      } else {
        setIsAttending.off();
        setUserRsvp(null);
      }
    }
  }, [userData, event, attendingButtonRef]);

  useEffect(() => {
    if (id && !event) {
      dispatch.eventModel.getEventById(id);
    } else if (id && event?.id && event?.id !== parseInt(id)) {
      dispatch.eventModel.getEventById(id);
    }
    return () => {
      dispatch.eventModel.clearState();
    };
  }, [id]);

  const returnRandomColor = () => {
    const colors = ["red.500", "blue.500", "green.600", "teal.600", "orange.400", "gray.400", "purple.500", "pink.500", "yellow.500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Stack minH="90vh">
      {event && rsvps ? (
        <Fade
          in={!isUnloading}
          transition={{
            enter: {
              duration: 0.35,
              delay: 0.25,
            },
            exit: {
              duration: 0.35,
              delay: 0.1,
            },
          }}
        >
          <Stack mt={{ lg: 20 }} mx={{ lg: "auto" }} maxW="5xl" py={{ lg: 5 }} minH="90vh">
            <SimpleGrid px={2} gap={2} columns={{ base: 6, lg: 6 }}>
              <GridItem py={{ base: 12, lg: 0 }} colSpan={{ base: 6, lg: 2 }}>
                <Stack alignItems={"start"} minH="100%" gap={0}>
                  <Image maxH={{ base: "140px", lg: "100%" }} objectFit={"cover"} px={{ lg: 5 }} minW="100%" shadow="md" src={event?.image} />
                </Stack>
              </GridItem>
              <GridItem mt={1} as={Stack} gap={4} colSpan={{ base: 6, lg: 4 }}>
                <Stack pl={3} alignItems={{ base: "center", lg: "start" }} direction={{ base: "column", lg: "column" }} gap={6} minW="100%">
                  <Stack gap={0}>
                    <Box shadow="sm" roundedTop="0" bg="red.500" px={5} py={1}>
                      {event?.startTime && (
                        <Text color="white" fontWeight={"bold"} fontSize={"xs"} textTransform={"uppercase"}>
                          {new Date(event?.startTime).toDateString().split(" ")?.[1]}
                        </Text>
                      )}
                    </Box>
                    <Box shadow={"sm"} roundedBottom={"0"} bg="white" px={1} pb={1.5} pt={1}>
                      {event?.startTime && (
                        <Text textAlign={"center"} color="blackAlpha.700" fontWeight={"bold"} fontSize={"xl"} textTransform={"uppercase"}>
                          {new Date(event?.startTime).toDateString().split(" ")?.[2]}
                        </Text>
                      )}
                    </Box>
                  </Stack>
                  <Stack gap={2} justifyContent={"start"}>
                    <Text
                      textTransform={"uppercase"}
                      mb={{ base: 2, lg: 2 }}
                      lineHeight={{ base: "35px", lg: "30px" }}
                      fontWeight={"semibold"}
                      textAlign={{ base: "center", lg: "start" }}
                      fontFamily={"inter"}
                      fontSize={{ base: "2xl", lg: "3xl" }}
                      color="heds.200"
                    >
                      {event?.name}
                    </Text>
                    <Text
                      maxW={{ base: "80vw", lg: "70ch" }}
                      color="heds.500"
                      textAlign={{ base: "center", lg: "start" }}
                      fontWeight="medium"
                      fontFamily={"open"}
                      fontSize={"xs"}
                    >
                      {event?.description}
                    </Text>
                  </Stack>
                </Stack>
                {event?.endTime && event?.endTime > new Date().getTime() ? (
                  <Flex
                    direction={{ base: "column", lg: "row" }}
                    justifyContent={"space-between"}
                    alignItems={{ base: "center", lg: "center" }}
                    gap={{ base: 6, lg: 4 }}
                    py={3.5}
                    pl={3}
                    pr={3.5}
                    minW="100%"
                  >
                    <CountdownClock endTime={event?.endTime} />
                    {isAttending && userRsvp ? (
                      <Button
                        key={userData?.eventRsvps?.length}
                        isLoading={isLoading}
                        ref={attendingButtonRef}
                        onMouseEnter={() => {
                          if (attendingButtonRef.current) {
                            attendingButtonRef.current.textContent = "REMOVE RSVP";
                          }
                        }}
                        onMouseLeave={() => {
                          if (attendingButtonRef.current) {
                            attendingButtonRef.current.textContent = "ATTENDING";
                          }
                        }}
                        size="sm"
                        onClick={async () => {
                          if (userData) {
                            await dispatch.eventModel.removeRsvp([userRsvp.id, event?.id, userData?.id]);
                            if (attendingButtonRef?.current) attendingButtonRef.current.textContent = "";
                          }
                        }}
                        borderRadius={"2xl"}
                        textAlign={{ base: "center", lg: "start" }}
                        minW={{ base: "100%", lg: "auto" }}
                        fontWeight={"bold"}
                        fontSize="xs"
                        bg="transparent"
                        _hover={{ bg: "transparent", color: "heds.red", borderColor: "heds.red" }}
                        border="1px solid"
                        borderColor={"heds.green"}
                        color="heds.green"
                        transition={"0.15s all ease-in-out"}
                        px={6}
                        py={1}
                        children={"ATTENDING"}
                      />
                    ) : (
                      <Button
                        mt={{ base: 1, lg: 0 }}
                        onClick={() => {
                          if (attendingButtonRef?.current) attendingButtonRef.current.textContent = "ATTENDING";
                          dispatch.userModel.setEvent(event);
                          dispatch.userModel.setIsRsvping(true);
                          dispatch.userModel.setIsUserModalOpen(true);
                        }}
                        px={5}
                        border="1px"
                        bg="transparent"
                        _hover={{ bg: "transparent", borderColor: "white", color: "white" }}
                        rounded="none"
                        borderColor="whiteAlpha.600"
                        color="whiteAlpha.600"
                        transition={"0.3s all ease-in-out"}
                        size="sm"
                        minW={{ base: "100%", lg: "auto" }}
                      >
                        <Text fontWeight={"bold"} fontSize={"xs"}>
                          RSVP
                        </Text>
                      </Button>
                    )}
                  </Flex>
                ) : (
                  <></>
                )}
              </GridItem>
              <GridItem px={3} colSpan={6}>
                <Stack mt={4} alignItems={"start"} gap={4} p={3} minW="100%">
                  <Text fontSize="sm" fontWeight={"bold"} fontFamily={"Helvetica"} color="whiteAlpha.900">
                    {rsvps?.length} RSVPS
                  </Text>
                  <SimpleGrid gap={2} minW="100%" columns={{ base: 4, lg: 8 }}>
                    {rsvps?.slice(0, isExpanded ? -1 : 7)?.map((rsvp) => {
                      return (
                        <GridItem key={rsvp.id} justifyContent={"center"} alignItems={"center"} as={Stack} aspectRatio={1} colSpan={1}>
                          <Box
                            as={Stack}
                            justifyContent={"center"}
                            alignItems={"center"}
                            aspectRatio={1}
                            boxSize="100%"
                            rounded={"none"}
                            border="1px"
                            borderColor={returnRandomColor()}
                            color={"white"}
                          >
                            <Text fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} fontSize="2xs">
                              {rsvp.users.displayName.split(" ")?.[0]?.[0]}
                              {rsvp.users.displayName.split(" ")?.[1]?.[0]}
                            </Text>
                          </Box>
                        </GridItem>
                      );
                    })}
                    <GridItem onClick={() => setIsExpanded.toggle()} justifyContent={"center"} alignItems={"center"} as={Stack} aspectRatio={1} colSpan={1}>
                      <Box as={Stack} justifyContent={"center"} alignItems={"center"} aspectRatio={1} boxSize="100%" rounded={"sm"}>
                        <Text color="whiteAlpha.500" fontSize={"2xl"} as="i" className="fa-solid fa-ellipsis" />
                      </Box>
                    </GridItem>
                  </SimpleGrid>
                </Stack>
              </GridItem>
            </SimpleGrid>
          </Stack>
        </Fade>
      ) : (
        <Stack alignItems={"center"} justifyContent={"center"} minW="100vw" minH="90vh">
          <Spinner color="white" />
        </Stack>
      )}
    </Stack>
  );
};

export default Event;
