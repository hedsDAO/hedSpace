import { Dispatch, store } from "@/store/store";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, Button, Stack, Text, Flex, DrawerCloseButton, Divider } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventRsvpItem from "./components/EventRsvpItem/EventRsvpItem";
import { DateTime } from "luxon";

const UserDrawer = () => {
  const userData = useSelector(store.select.userModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const isUserDrawerOpen = useSelector(store.select.userModel.selectIsUserDrawerOpen);
  const btnRef = useRef(null);
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
              <Stack mt={0} minW="100%" gap={2}>
                {userData?.eventRsvps?.map((event) => (
                  <EventRsvpItem key={event.eventId} eventId={event.eventId} />
                ))}
              </Stack>
              <Button
                mt={"auto"}
                mb={4}
                py={4}
                size="xs"
                borderRadius={"lg"}
                transition={"0.3s all ease-in-out"}
                bg="whiteAlpha.100"
                color="whiteAlpha.600"
                border="1px solid"
                borderColor="whiteAlpha.600"
                _hover={{ bg: "transparent", borderColor: "whiteAlpha.600", color: "white" }}
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
