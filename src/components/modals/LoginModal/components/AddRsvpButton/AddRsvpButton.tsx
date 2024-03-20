import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddRsvpButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.userModel.selectEvent);
  const userData = useSelector(store.select.userModel.selectUser);
  const isLoading = useSelector(store.select.userModel.selectIsLoading);
  return (
    <Stack>
      <Button
        isLoading={isLoading}
        onClick={() => {
          if (userData?.id && event?.id) {
            dispatch.userModel.addRSVP([userData?.id, event?.id]);
          }
        }}
        isDisabled={!userData?.id || !userData?.displayName?.length || !event?.id || isLoading}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg="heds.800"
        color="heds.green"
        _hover={!userData?.id || !userData?.displayName?.length || !event?.id ? {} : { bg: "heds.green", borderColor: "heds.green", color: "heds.100" }}
        border="1.5px solid"
        fontWeight={"bold"}
        fontFamily={"Helvetica"}
        fontSize={"sm"}
        borderColor="heds.green"
        minW="100%"
      >
        RSVP
      </Button>
      <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={3}>
        <Text fontWeight={"medium"} fontFamily={"inter"} opacity={0.6} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.500">
          Your RSVP will be saved on your account and will be used for entry.
        </Text>
      </Flex>
    </Stack>
  );
};

export default AddRsvpButton;
