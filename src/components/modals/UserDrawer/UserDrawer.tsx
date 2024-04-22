import { Dispatch, store } from "@/store/store";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Button, Stack, Text, Flex, DrawerCloseButton, Divider, useBoolean, Box, Image } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventRsvpItem from "./components/EventRsvpItem/EventRsvpItem";
import { DateTime } from "luxon";
import {
  HEDS_AVATAR_1,
  HEDS_AVATAR_2,
  HEDS_AVATAR_3,
  HEDS_AVATAR_4,
  HEDS_AVATAR_5,
  HEDS_AVATAR_6,
  HEDS_AVATAR_7,
  HEDS_AVATAR_8,
  HEDS_AVATAR_9,
  HEDS_AVATAR_10,
} from "@/store/constants";

const avatarArray = [
  "fas fa-user-circle",
  HEDS_AVATAR_1,
  HEDS_AVATAR_2,
  HEDS_AVATAR_3,
  HEDS_AVATAR_4,
  HEDS_AVATAR_5,
  HEDS_AVATAR_6,
  HEDS_AVATAR_7,
  HEDS_AVATAR_8,
  HEDS_AVATAR_9,
  HEDS_AVATAR_10,
];

const UserDrawer = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isExpanded, setIsExpanded] = useBoolean();
  const [showArrows, setShowArrows] = useBoolean();
  const avatarIndex: number = useSelector(store.select.userModel.selectAvatarIndex);
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

  const handleArrowClick = (direction: number) => {
    const newIndex = (avatarIndex + direction + avatarArray.length) % avatarArray.length;
    dispatch.userModel.setAvatarIndex(newIndex);
  };

  const getAvatarImage = (index: number) => {
    console.log(avatarIndex - 1 + avatarArray.length);

    const avatar = avatarArray[index <= 0 ? 0 : index];
    console.log(avatar, "avatar");
    console.log(avatarArray[10]);
    return avatar.startsWith("fas") ? (
      <i className={avatar} style={{ fontSize: showArrows ? "80px" : "120px", marginRight: "2px" }} />
    ) : (
      <Image src={avatar} w={showArrows ? "80px" : "120px"} h={showArrows ? "80px" : "120px"} borderRadius="full" />
    );
  };

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
              <Flex justifyContent={"center"} my={5} position="relative">
                {showArrows && (
                  <>
                    <Box position="absolute" left="0" top="40px" transform="translateY(-50%)">
                      {getAvatarImage(avatarIndex - 1 + avatarArray.length === 10 ? 10 : (avatarIndex - 1 + avatarArray.length) % avatarArray.length)}
                    </Box>
                    <Box position="absolute" right="0" top="40px" transform="translateY(-50%)">
                      {getAvatarImage((avatarIndex + 1) % avatarArray.length)}
                    </Box>
                    <Box
                      as="i"
                      className="fas fa-arrow-left"
                      onClick={() => handleArrowClick(-1)}
                      position="absolute"
                      top="90px"
                      left="32px"
                      cursor="pointer"
                      color="heds.200"
                      _hover={{ color: "heds.100" }}
                    />
                    <Box
                      as="i"
                      className="fas fa-arrow-right"
                      onClick={() => handleArrowClick(1)}
                      position="absolute"
                      top="90px"
                      right="32px"
                      cursor="pointer"
                      color="heds.200"
                      _hover={{ color: "heds.100" }}
                    />
                  </>
                )}
                {getAvatarImage(avatarIndex)}
                <Box
                  as="i"
                  className={showArrows ? "fas fa-check" : "fas fa-pencil-alt"}
                  position="absolute"
                  color={showArrows ? "green.700" : "whiteAlpha.700"}
                  top="74px"
                  right="0"
                  fontSize="16px"
                  p="4px"
                  borderRadius="full"
                  transform="translate(50%,50%)"
                  _hover={{ color: showArrows ? "green.400" : "whiteAlpha.900" }}
                  onClick={() => {
                    setShowArrows.toggle();
                    if (showArrows) {
                    }
                  }}
                />
              </Flex>
              <Stack mt={4} px={4} py={2.5} rounded="xl" bg="whiteAlpha.50">
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
