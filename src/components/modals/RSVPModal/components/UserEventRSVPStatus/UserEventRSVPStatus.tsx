import { Dispatch, store } from "@/store/store";
import { Button, Divider, Flex, ModalBody, ModalFooter, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const UserEventRSVPStatus = () => {
  const dispatch = useDispatch<Dispatch>();
  const rsvp = useSelector(store.select.rsvpModel.selectRSVP);
  const userData: any = useSelector(store.select.rsvpModel.selectUser);
  const firstName = useSelector(store.select.rsvpModel.selectFirstName);
  const lastName = useSelector(store.select.rsvpModel.selectLastName);
  const phoneNumber = useSelector(store.select.rsvpModel.selectPhoneNumber);
  return (
    <>
      <ModalBody
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="whiteAlpha.300"
        py={10}
        gap={{ base: 4, lg: 5 }}
        minW="100%"
        as={Flex}
      >
        <Flex gap={4} alignItems="center">
          <Text color="green.500">
            <i className="fa-solid fa-circle-check"></i>
          </Text>
          <Text fontSize={"sm"} fontWeight="bold" color="white">
            {rsvp?.status}
          </Text>
        </Flex>
        <Divider />
        <Flex gap={3} alignItems="center">
          <Text whiteSpace={"nowrap"} fontSize={"xs"} fontFamily={"open"} color="white">
            {userData?.displayName ? userData?.displayName : firstName && lastName ? `${firstName} ${lastName}` : ""}
          </Text>
          <Text fontSize="xs" fontFamily={"open"} color="whiteAlpha.700">
            {phoneNumber}
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter mt={2} px={4}>
        <Button
          onClick={() => dispatch.rsvpModel.clearState()}
          minW="20%"
          fontFamily={"open"}
          size="sm"
          bg="white"
          rounded={"3xl"}
        >
          close
        </Button>
      </ModalFooter>
    </>
  );
};

export default UserEventRSVPStatus;
