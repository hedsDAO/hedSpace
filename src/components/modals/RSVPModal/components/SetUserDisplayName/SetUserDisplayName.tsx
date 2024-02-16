import { Dispatch, store } from "@/store/store";
import { Button, Flex, Input, ModalBody, ModalFooter, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const SetUserDisplayName = () => {
  const event = useSelector(store.select.rsvpModel.selectEvent);
  const user: any = useSelector(store.select.rsvpModel.selectUser);
  const firstName = useSelector(store.select.rsvpModel.selectFirstName);
  const lastName = useSelector(store.select.rsvpModel.selectLastName);
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      <ModalBody as={Stack}>
        <Text fontFamily={"open"} textAlign={"start"} color="whiteAlpha.900" fontSize={{ base: "xs", lg: "sm" }}>
          Enter your first and last name:
        </Text>
        <Flex flexDirection={{ base: "column", lg: "row" }} gap={2}>
          <Input
            rounded="none"
            size={{ base: "sm", lg: "md" }}
            color="white"
            value={firstName || ""}
            onChange={(e) => {
              dispatch.rsvpModel.setFirstName(e.target.value);
            }}
            placeholder="first name"
          ></Input>
          <Input
            rounded="none"
            size={{ base: "sm", lg: "md" }}
            color="white"
            value={lastName || ""}
            onChange={(e) => {
              dispatch.rsvpModel.setLastName(e.target.value);
            }}
            placeholder="last name"
          ></Input>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent={"center"} px={4} minW="100%" mt={{ base: 1, lg: 4 }} as={Flex}>
        <Button
          onClick={() => {
            if (user.id && firstName && lastName && event?.id) {
              dispatch.rsvpModel.addDisplayNameToUser({ id: user.id, firstName, lastName, eventId: event?.id });
            }
          }}
          isDisabled={firstName?.length === 0 || lastName?.length === 0}
          py={4}
          size={{ base: "sm", lg: "md" }}
          rounded="xl"
          w="100%"
          minW="100%"
          bg="white"
        >
          Set Name
        </Button>
      </ModalFooter>
    </>
  );
};

export default SetUserDisplayName;
