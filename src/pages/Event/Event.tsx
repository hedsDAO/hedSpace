import { Dispatch, store } from "@/store/store";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CountdownClock from "./components/CountdownClock/CountdownClock";
import { isEventOver } from "@/store/utils";
import { DateTime } from "luxon";
import { isIOS } from "react-device-detect";
import addToAppleId from "../../../public/addToAppleWallet.svg";

const Event = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const checkoutSession = pathname.split("/").pop() ?? "";
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isAttending, setIsAttending] = useBoolean();
  const [isExpanded, setIsExpanded] = useBoolean();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const isTierOneDisabled = useSelector(store.select.eventModel.selectIsTierOneDisabled);
  // const isTierTwoDisabled = useSelector(store.select.eventModel.selectIsTierTwoDisabled);
  // const isTierThreeDisabled = useSelector(store.select.eventModel.selectIsTierThreeDisabled);
  const event = useSelector(store.select.eventModel.selectEvent);
  const rsvps = useSelector(store.select.eventModel.selectRSVPs);
  const userData = useSelector(store.select.userModel.selectUser);
  const ifPhorin = event?.id === 9;

  useEffect(() => {
    if (id && !event) {
      dispatch.eventModel.getEventByName(id);
    } else if (id && event?.id && event?.name !== id) {
      dispatch.eventModel.getEventByName(id);
    }
    if (userData?.id && userData?.eventRsvps && id && event?.id) {
      const isAttending = userData?.eventRsvps?.find((rsvp) => rsvp.eventId == event?.id);
      if (isAttending) setIsAttending.on();
      else setIsAttending.off();
    } else setIsAttending.off();
  }, [id, userData]);

  useEffect(() => {
    if (event && id && userData?.eventRsvps?.length) {
      if (userData?.id && userData?.eventRsvps && id && event?.id) {
        const isAttending = userData?.eventRsvps?.find((rsvp) => rsvp.eventId == event?.id);
        if (isAttending) setIsAttending.on();
        else setIsAttending.off();
      } else setIsAttending.off();
    }
  }, [event, userData]);

  useEffect(() => {
    if (checkoutSession?.startsWith("cs") && checkoutSession && event?.id) {
      dispatch.eventModel.verifyPayment([checkoutSession, userData?.id || 0, event?.id || 0]);
      dispatch.rsvpModel.addRSVP([userData?.id || 0, event?.id || 0]);
      navigate(`/event/${event?.name}`);
    }
  }, [event]);

  return (
    <Container px={0} minW="100vw" minH="100vh">
      <Helmet>
        <title>{event?.name}</title>
        <meta property="og:title" content={event?.name} />
        <meta property="og:description" content={event?.description} />
        <meta property="og:image" content={event?.image} />
        <meta property="og:url" content={`https://heds.space/events/${event?.name}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Box
        autoPlay
        src={event?.video}
        muted
        playsInline
        zIndex={1000}
        loop
        as="video"
        position={"absolute"}
        opacity="0.2"
        aspectRatio={1}
        objectFit="cover"
        minH="100vh"
        maxH="100vh"
        minW="100vw"
        transition="0.25s all ease-in-out"
      />
      <Image shadow="sm" right={"23%"} top={"20%"} src={event?.image} objectFit="cover" minH="60vh" maxH="60vh" position="absolute" zIndex={1000} />
      {event && (
        <Stack
          pt={{ base: 8, lg: 12 }}
          px={{ base: 10, lg: 16 }}
          minH="100vh"
          alignItems={"center"}
          position={"relative"}
          zIndex={1001}
          bg={"heds.700"}
          maxW={{ base: "100%", lg: "27%" }}
        >
          <Stack maxW={{ base: "100%", lg: "100%" }} minW={{ base: "100%", lg: "100%" }}>
            <Flex
              pt={{ lg: 8 }}
              pb={5}
              cursor={"pointer"}
              onClick={() =>
                dispatch.globalModel.handleUnload([
                  isUnloading,
                  () => {
                    dispatch.eventModel.clearState();
                    navigate("/events");
                  },
                ])
              }
              color="heds.200"
              _hover={{ color: "heds.100" }}
              transition={"0.3s all ease-in-out"}
              gap={4}
              alignItems={"center"}
            >
              <Text as="i" className="fa-solid fa-sharp fa-chevron-left" fontSize={{ base: "2xs", lg: "xs" }} />
              <Text fontFamily={"hanken"} fontSize={{ base: "2xs", lg: "xs" }}>
                BACK TO EVENTS
              </Text>
            </Flex>
            <Flex direction={{ base: "column", lg: "column" }} gap={{ base: 5, lg: 10 }}>
              {isMobile ? <Image src={event?.image} objectFit={"cover"} minH={{ base: "40vh", lg: "60vh" }} maxH={{ base: "40vh", lg: "60vh" }} /> : <></>}
              <Stack>
                <Flex alignItems={"center"}>
                  <Text
                    isTruncated={false}
                    whiteSpace={"nowrap"}
                    textTransform={"uppercase"}
                    fontWeight={700}
                    color="heds.100"
                    fontFamily={"hanken"}
                    fontSize={{ base: "25px", lg: "30px" }}
                  >
                    {event?.name}
                  </Text>
                  <Text ml={3} color="heds.100" fontSize={{ base: "xl", lg: "20px" }} className="fa-sharp fa-solid fa-asterisk" as="i" />
                </Flex>
                <Text mt={-1} fontSize={{ base: "2xs", lg: "sm" }} fontWeight={300} color="heds.200">
                  {event?.description}
                </Text>
                <Stack mt={4} gap={0}>
                  {isEventOver(event) ? (
                    <Flex mb={4} alignItems={"center"} justifyContent={"center"} py={1} minW="100%" bg={"heds.red"}>
                      <Text textAlign={"start"} fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", lg: "xs" }} px={2}>
                        THIS EVENT HAS ENDED
                      </Text>
                    </Flex>
                  ) : (
                    <CountdownClock endTime={event?.endTime} />
                  )}
                  <Flex alignItems={"center"} justifyContent={"space-between"} py={1} minW="100%">
                    <Text fontFamily={"hanken"} fontWeight={500} fontSize={{ base: "2xs", lg: "xs" }} color="heds.300">
                      DATE
                    </Text>
                    <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", lg: "xs" }} color="heds.100">
                      {DateTime.fromMillis(event?.startTime).toFormat("D")}
                    </Text>
                  </Flex>
                  <Flex alignItems={"center"} justifyContent={"space-between"} py={1} minW="100%">
                    <Text fontFamily={"hanken"} fontWeight={500} fontSize={{ base: "2xs", lg: "xs" }} color="heds.300">
                      TIME
                    </Text>
                    <Flex gap={1}>
                      <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", lg: "xs" }} color="heds.100">
                        {DateTime.fromMillis(event?.startTime).toFormat("t")}
                      </Text>
                      <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", lg: "xs" }} color="heds.100">
                        -
                      </Text>
                      <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", lg: "xs" }} color="heds.100">
                        {DateTime.fromMillis(event?.endTime).toFormat("t")}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex alignItems={"center"} justifyContent={"space-between"} py={1} minW="100%">
                    <Text fontFamily={"hanken"} fontWeight={500} fontSize={{ base: "2xs", lg: "xs" }} color="heds.300">
                      LOCATION
                    </Text>
                    <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "2xs", sm: "2xs", lg: "xs" }} color="heds.100">
                      {event.id === 16 ? " 944 PALISADES BEACH RD, SANTA MONICA" : "7515 MELROSE AVE, LA"}
                    </Text>
                  </Flex>
                  {!isEventOver(event) && !isAttending ? (
                    <Flex direction={"column"} alignItems={"center"} justifyContent={"space-between"} py={1}>
                      <Button
                        onClick={() => {
                          //send them to the stripe checkout page at https://checkout.heds.space/b/8wMaGLdOH6td6Mo4gh
                          if (!userData?.displayName) {
                            dispatch.userModel.setIsUserModalOpen(true);
                          } else {
                            dispatch.rsvpModel.addRSVP([userData?.id || 0, event?.id || 0]);
                          }
                          // if (userData?.displayName) {
                          //   // console.log(event.stripeUrl);
                          //   window.location.href = event.stripeUrl.tierOne;
                          // }
                        }}
                        _hover={{
                          bg: isTierOneDisabled ? "transparent" : "heds.green",
                          color: isTierOneDisabled ? "grey.800" : "grey.100",
                          borderColor: isTierOneDisabled ? "grey.100" : "heds.green",
                        }}
                        minW="100%"
                        px={5}
                        letterSpacing={"wide"}
                        fontWeight={"semibold"}
                        py={4}
                        fontFamily={"Helvetica"}
                        fontSize={"sm"}
                        textAlign={"center"}
                        bg="transparent"
                        size="lg"
                        border="0.25px solid black"
                        color={isTierOneDisabled ? "grey.50" : "heds.green"}
                        borderColor={isTierOneDisabled ? "grey.50" : "heds.green"}
                        rounded="lg"
                        mt={6}
                        isDisabled={isTierOneDisabled}
                      >
                        Free RSVP
                      </Button>
                      {/* <Button
                        onClick={() => {
                          //send them to the stripe checkout page at https://checkout.heds.space/b/8wMaGLdOH6td6Mo4gh
                          if (!userData?.displayName) {
                            dispatch.userModel.setIsUserModalOpen(true);
                          }
                          if (userData?.displayName) {
                            // console.log(event.stripeUrl);
                            window.location.href = event.stripeUrl.tierOne;
                          }
                        }}
                        _hover={{
                          bg: isTierOneDisabled ? "transparent" : "heds.green",
                          color: isTierOneDisabled ? "grey.800" : "grey.100",
                          borderColor: isTierOneDisabled ? "grey.100" : "heds.green",
                        }}
                        minW="100%"
                        px={5}
                        letterSpacing={"wide"}
                        fontWeight={"semibold"}
                        py={4}
                        fontFamily={"Helvetica"}
                        fontSize={"sm"}
                        textAlign={"center"}
                        bg="transparent"
                        size="lg"
                        border="0.25px solid black"
                        color={isTierOneDisabled ? "grey.50" : "heds.green"}
                        borderColor={isTierOneDisabled ? "grey.50" : "heds.green"}
                        rounded="lg"
                        mt={6}
                        isDisabled={isTierOneDisabled}
                      >
                        {event.id !== 17 ? "$10 EARLY TICKET" : "$10 TICKET"}
                      </Button> */}
                      {/* {event.id !== 17 && (
                        <Button
                          onClick={() => {
                            //send them to the stripe checkout page at https://checkout.heds.space/b/8wMaGLdOH6td6Mo4gh
                            if (!userData?.displayName) {
                              dispatch.userModel.setIsUserModalOpen(true);
                            }
                            if (userData?.displayName) {
                              window.location.href = event.stripeUrl.tierTwo;
                            }
                          }}
                          _hover={{
                            bg: isTierTwoDisabled ? "transparent" : "heds.green",
                            color: isTierTwoDisabled ? "grey.800" : "grey.100",
                            borderColor: isTierTwoDisabled ? "grey.100" : "heds.green",
                          }}
                          minW="100%"
                          px={5}
                          letterSpacing={"wide"}
                          fontWeight={"semibold"}
                          py={4}
                          fontFamily={"Helvetica"}
                          fontSize={"sm"}
                          textAlign={"center"}
                          bg="transparent"
                          size="lg"
                          border="0.25px solid black"
                          color={isTierTwoDisabled ? "grey.50" : "heds.green"}
                          borderColor={isTierTwoDisabled ? "grey.50" : "heds.green"}
                          rounded="lg"
                          mt={6}
                          isDisabled={isTierTwoDisabled}
                        >
                          $15 GENERAL TICKET
                        </Button>
                      )} */}
                      {/* {event.id !== 17 && (
                        <Button
                          onClick={() => {
                            //send them to the stripe checkout page at https://checkout.heds.space/b/8wMaGLdOH6td6Mo4gh
                            if (!userData?.displayName) {
                              dispatch.userModel.setIsUserModalOpen(true);
                            }
                            if (userData?.displayName) {
                              window.location.href = event.stripeUrl.tierThree;
                            }
                          }}
                          _hover={{
                            bg: isTierThreeDisabled ? "transparent" : "heds.green",
                            color: isTierThreeDisabled ? "grey.800" : "grey.100",
                            borderColor: isTierThreeDisabled ? "grey.100" : "heds.green",
                          }}
                          minW="100%"
                          px={5}
                          letterSpacing={"wide"}
                          fontWeight={"semibold"}
                          py={4}
                          fontFamily={"Helvetica"}
                          fontSize={"sm"}
                          textAlign={"center"}
                          bg="transparent"
                          size="lg"
                          border="0.25px solid black"
                          color={isTierThreeDisabled ? "grey.50" : "heds.green"}
                          borderColor={isTierThreeDisabled ? "grey.50" : "heds.green"}
                          rounded="lg"
                          mt={6}
                          isDisabled={isTierThreeDisabled}
                        >
                          $20 LAST CHANCE TICKET
                        </Button>
                      )} */}
                    </Flex>
                  ) : !isEventOver(event) && isAttending ? (
                    <Stack justifyContent={"start"} gap={3} mt={7} alignItems={"center"} minW="100%">
                      <Tooltip color="heds.200" fontFamily="Helvetica" label="Check email for receipt of purchased ticket" fontSize="sm" backgroundColor="transparent">
                        <Text
                          minW="100%"
                          px={5}
                          letterSpacing="wide"
                          fontWeight="semibold"
                          py={3}
                          fontFamily="Helvetica"
                          fontSize="sm"
                          textAlign="center"
                          bg="heds.green"
                          border="0.25px solid black"
                          color="black"
                          borderColor="heds.green"
                          rounded="lg"
                        >
                          ATTENDING
                        </Text>
                      </Tooltip>
                      {/* apple wallet integration */}
                      {isIOS ? (
                        <Button
                          px={0}
                          mt={3}
                          fontWeight={"medium"}
                          py={1.5}
                          fontSize={"xs"}
                          textAlign={"center"}
                          size="sm"
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          border="1px solid"
                          color="black"
                          borderColor="transparent"
                          rounded="none"
                          onClick={() => {
                            if (userData?.displayName) {
                              dispatch.userModel.fetchApplePass({ eventId: event?.id, displayName: userData.displayName });
                            }
                          }}
                        >
                          <Image minH="46px" maxH="46px" src={addToAppleId}></Image>
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Stack>
            </Flex>
            {!ifPhorin && isAttending && (
              <Stack my={10}>
                <Flex cursor={"pointer"} minW="100%" justifyContent={"space-between"} onClick={() => setIsExpanded.toggle()} alignItems={"center"} gap={3}>
                  <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "12px", lg: "20px" }} color="heds.200">
                    {event?.eventRsvps?.length} {!isEventOver(event) ? "ATTENDING" : "ATTENDED"}
                  </Text>
                  <Flex alignItems={"center"} gap={2}>
                    <Text fontFamily={"hanken"} fontWeight={700} fontSize={{ base: "xs", lg: "sm" }} color="heds.200">
                      {isExpanded ? "view less" : "view all"}
                    </Text>
                    <Text
                      transform={isExpanded ? "rotate(180deg)" : "rotate(0deg)"}
                      transition={"0.3s all ease-in-out"}
                      color="heds.100"
                      as="i"
                      className="fa-solid fa-sharp fa-chevron-down"
                      fontSize={{ base: "10px", lg: "13px" }}
                    />
                  </Flex>
                </Flex>

                <Box overflowY={"auto"} maxH="300px">
                  <SimpleGrid mt={3} gap={1} columns={{ base: 7, lg: 5 }}>
                    {rsvps?.slice(0, isExpanded ? -1 : 15)?.map((rsvp) => {
                      return (
                        <GridItem key={rsvp.id}>
                          <Flex alignItems={"center"} justifyContent={"center"} aspectRatio={1} bg="heds.800" rounded="2px">
                            <Text
                              fontWeight={800}
                              fontFamily={"hanken"}
                              color="heds.200"
                              fontSize={{ base: "xs", lg: "xs" }}
                              textAlign={"center"}
                              textTransform={"uppercase"}
                            >
                              {rsvp.users?.displayName?.[0]}
                              {rsvp.users?.displayName?.split(" ")?.[1][0] || ""}
                            </Text>
                          </Flex>
                        </GridItem>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default Event;
