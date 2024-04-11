import { Dispatch, store } from "@/store/store";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Button, Stack, Text, Flex, DrawerCloseButton, Divider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventRsvpItem from "./components/EventRsvpItem/EventRsvpItem";
import { DateTime } from "luxon";

const UserDrawer = () => {
  const userData = useSelector(store.select.userModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const allEvents = useSelector(store.select.landingModel.selectEvents);
  const isUserDrawerOpen = useSelector(store.select.userModel.selectIsUserDrawerOpen);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!allEvents) {
      dispatch.landingModel.getEvents();
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
                {userData?.eventRsvps
                  ?.sort((eventA, eventB) => eventB?.createdAt - eventA?.createdAt)
                  ?.map((event) => {
                    const eventName = allEvents?.find((e) => e.id === event?.eventId)?.name;
                    if (eventName) return <EventRsvpItem key={event?.eventId} eventId={eventName} />
})}
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
