import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AddRsvpButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.userModel.selectEvent);
  const userData = useSelector(store.select.userModel.selectUser);
  return (
    <Stack>
      <Button
        onClick={() => {
          if (userData?.id && event?.id) {
            dispatch.userModel.addRSVP([userData?.id, event?.id]);
          }
        }}
        isDisabled={!userData?.id || !userData?.displayName?.length || !event?.id}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg="heds.800"
        color="heds.400"
        _hover={!userData?.id || !userData?.displayName?.length || !event?.id ? {} : { bg: "heds.600", borderColor: "whiteAlpha.300", color: "heds.300" }}
        border="1.5px solid"
        fontWeight={"semibold"}
        fontFamily={"inter"}
        fontSize={"sm"}
        borderColor="whiteAlpha.400"
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
