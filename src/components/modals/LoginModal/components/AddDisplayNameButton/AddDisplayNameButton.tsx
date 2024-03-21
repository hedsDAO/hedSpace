import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddDisplayNameButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const firstName = useSelector(store.select.userModel.selectFirstName);
  const lastName = useSelector(store.select.userModel.selectLastName);
  const userData = useSelector(store.select.userModel.selectUser);
  const isLoading = useSelector(store.select.userModel.selectIsLoading);
  return (
    <Stack>
      <Button
        isLoading={isLoading}
        onClick={() => {
          if (userData?.id) {
            dispatch.userModel.setIsLoading(true);
            dispatch.userModel.addDisplayName([userData?.id, firstName, lastName]);
          }
        }}
        isDisabled={firstName.length < 1 || lastName.length < 1 || isLoading}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg='heds.800'
        _hover={firstName.length === 0 || lastName.length === 0 ? {} : { bg: "heds.green", borderColor: "heds.green", color: "white" }}
        fontWeight={"semibold"}
        border='1px solid'
        fontFamily={"open"}
        fontSize={"sm"}
        color="heds.green"
        borderColor="heds.green"
        minW="100%"
      >
        Create my account
      </Button>{" "}
      <Flex maxW={{ base: "100%", lg: "70%" }} mx="auto" mt={3}>
        <Text fontWeight={"semibold"} fontFamily={"inter"} opacity={0.5} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.yellow">
          Double check your spelling before submitting.
        </Text>
      </Flex>
    </Stack>
  );
};

export default AddDisplayNameButton;
