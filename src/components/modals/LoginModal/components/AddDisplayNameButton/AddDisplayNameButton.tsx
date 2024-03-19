import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddDisplayNameButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const firstName = useSelector(store.select.userModel.selectFirstName);
  const lastName = useSelector(store.select.userModel.selectLastName);
  const userData = useSelector(store.select.userModel.selectUser);
  return (
    <Stack>
      <Button
        onClick={() => {
          if (userData?.id) {
            dispatch.userModel.addDisplayName([userData?.id, firstName, lastName]);
          }
        }}
        isDisabled={firstName.length < 1 || lastName.length < 2}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg="heds.800"
        color="heds.400"
        _hover={firstName.length === 0 || lastName.length === 0 ? {} : { bg: "heds.600", borderColor: "whiteAlpha.300", color: "heds.300" }}
        border="1.5px solid"
        fontWeight={"semibold"}
        fontFamily={"inter"}
        fontSize={"sm"}
        borderColor="whiteAlpha.400"
        minW="100%"
      >
        Create my account
      </Button>{" "}
      <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={3}>
        <Text fontWeight={"medium"} fontFamily={"inter"} opacity={0.6} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.500">
          <Text color="heds.300" as="span">
            You wont be able to change your name after this.
          </Text>{" "}
          Double check your spelling before submitting.
        </Text>
      </Flex>
    </Stack>
  );
};

export default AddDisplayNameButton;
