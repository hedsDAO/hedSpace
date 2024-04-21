import { Dispatch, store } from "@/store/store";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Button, Stack, Text, Flex, DrawerCloseButton, Divider, useBoolean, Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventRsvpItem from "./components/EventRsvpItem/EventRsvpItem";
import { DateTime } from "luxon";

const UserDrawer = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isExpanded, setIsExpanded] = useBoolean();
  const [showArrows, setShowArrows] = useBoolean();
  const userData = useSelector(store.select.userModel.selectUser);
  const isUserDrawerOpen = useSelector(store.select.userModel.selectIsUserDrawerOpen);
  const btnRef = useRef(null);
  const allEvents = useSelector(store.select.eventsModel.selectEvents);
  const sortedEventRsvps = userData?.eventRsvps
    ?.map((eventRsvp) => ({
      ...eventRsvp,
      event: allEvents?.find((e) => e.id === eventRsvp?.eventId),
    }))
    .filter((eventRsvp) => eventRsvp?.event)
    ?.sort((a, b) => new Date(b.event?.startTime || 0).getTime() - new Date(a.event?.startTime || 0).getTime());

  useEffect(() => {
    if (!allEvents) {
      dispatch.eventsModel.getEvents();
    }
  }, []);

  return (
    <>
      <Drawer isOpen={isUserDrawerOpen} placement="right" onClose={() => dispatch.userModel.setIsUserDrawerOpen(false)} finalFocusRef={btnRef}>
        <DrawerOverlay bg="blackAlpha.800" />
        <DrawerContent pt={4} bgGradient="linear(to-l, heds.800, heds.700)">
          <DrawerCloseButton size="sm" color="whiteAlpha.600" />
          {userData && (
            <DrawerBody gap={1.5} as={Stack}>
              <Flex justifyContent={"center"} my={5}>
                <Text as="i" className="fas fa-user-circle" fontSize="120px" color="whiteAlpha.600" mr={2} />
                <Box
                  as="i"
                  className={showArrows ? "fas fa-check" : "fas fa-pencil-alt"}
                  position="absolute"
                  color={showArrows ? "green.700" : "whiteAlpha.700"}
                  top="128px"
                  right="48px"
                  fontSize="16px"
                  p="4px"
                  borderRadius="full"
                  transform="translate(50%,50%)"
                  _hover={{ color: showArrows ? "green.400" : "whiteAlpha.900" }}
                  onClick={() => setShowArrows.toggle()}
                />
                {showArrows && (
                  <Flex direction="row" position="absolute" top="156px" right="16px" transform="translate(-50%, -50%)">
                    <Box as="i" className="fas fa-arrow-left" fontSize="16px" color="whiteAlpha.800" _hover={{ color: "whiteAlpha.600" }} mr="120px" />
                    <Box as="i" className="fas fa-arrow-right" fontSize="16px" color="whiteAlpha.800" />
                  </Flex>
                )}
              </Flex>
              <Stack px={4} py={2.5} rounded="xl" bg="whiteAlpha.50">
                <Flex alignItems={"baseline"} justifyContent={"space-between"} gap={2}>
                  <Text fontWeight={"bold"} fontFamily={"Helvetica"} fontSize={"2xs"} color="whiteAlpha.400">
                    NAME
                  </Text>
                  <Text fontWeight={"medium"} fontFamily={"open"} fontSize={"xs"} color="whiteAlpha.700">
                    {userData?.displayName}
                  </Text>
                </Flex>
                <Flex alignItems={"baseline"} justifyContent={"space-between"} gap={2}>
                  <Text fontWeight={"bold"} fontFamily={"Helvetica"} fontSize={"2xs"} color="whiteAlpha.400">
                    PHONE NUMBER
                  </Text>
                  <Text fontWeight={"medium"} fontFamily={"space"} fontSize={"xs"} color="whiteAlpha.600">
                    {userData?.phoneNumber}
                  </Text>
                </Flex>
                <Flex alignItems={"baseline"} justifyContent={"space-between"} gap={2}>
                  <Text fontWeight={"bold"} fontFamily={"Helvetica"} fontSize={"2xs"} color="whiteAlpha.400">
                    JOINED
                  </Text>
                  <Text fontWeight={"medium"} fontFamily={"open"} fontSize={"xs"} color="whiteAlpha.700">
                    {DateTime.fromMillis(userData?.joined).toFormat("LLL dd, yyyy")}
                  </Text>
                </Flex>
              </Stack>
              <Divider mx="auto" maxW="85%" borderColor="whiteAlpha.300" my={7} />
              <Stack pb={10} mt={-2.5} minW="100%" gap={2.5}>
                <Text textAlign={"start"} mb={1} color="heds.200" fontSize="md" fontWeight={"bold"} fontFamily={"open"}>
                  RSVPs
                </Text>
                {(isExpanded ? sortedEventRsvps : sortedEventRsvps?.slice(0, 3))?.map((eventRsvp) => {
                  if (eventRsvp.event?.name) return <EventRsvpItem key={eventRsvp.eventId} eventId={eventRsvp.event.name} />;
                })}
                {(sortedEventRsvps?.length ?? 0) > 3 && (
                  <Button
                    onClick={() => setIsExpanded.toggle()}
                    size="sm"
                    textColor="heds.300"
                    background="transparent"
                    _hover={{ color: "heds.100", background: "transparent" }}
                  >
                    {isExpanded ? "Show Less" : "Show All"}
                  </Button>
                )}
              </Stack>
              <Button
                mt={"auto"}
                mb={4}
                py={4}
                size="xs"
                borderRadius={"2xl"}
                transition={"0.3s all ease-in-out"}
                bg="transparent"
                color="whiteAlpha.600"
                border="1px solid"
                borderColor="whiteAlpha.600"
                _hover={{ bg: "transparent", borderColor: "whiteAlpha.900", color: "white" }}
                onClick={() => dispatch.userModel.logout()}
              >
                Logout
              </Button>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserDrawer;
