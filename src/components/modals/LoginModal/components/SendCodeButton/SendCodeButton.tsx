import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const SendCodeButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputValue = useSelector(store.select.userModel.selectInputValue);
  const maxPhoneNumberLength = useSelector(store.select.userModel.selectMaxPhoneNumberLength);
  return (
    <Stack>
      <Button
        onClick={() => {
          dispatch.userModel.setInputValue('');
          dispatch.userModel.setPhoneNumber(inputValue.split(""));
          dispatch.userModel.setIsVerifying(true);
          dispatch.userModel.sendVerificationCode("+1" + inputValue);
        }}
        isDisabled={inputValue.length !== maxPhoneNumberLength}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg="heds.800"
        color="heds.400"
        _hover={inputValue.length !== maxPhoneNumberLength ? {} : { bg: "heds.600", borderColor: "whiteAlpha.300", color: "heds.300" }}
        border="1.5px solid"
        fontWeight={"semibold"}
        fontFamily={"inter"}
        fontSize={"sm"}
        borderColor="whiteAlpha.400"
        minW="100%"
      >
        Send Code
      </Button>{" "}
      <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={3}>
        <Text fontWeight={"medium"} fontFamily={"inter"} opacity={0.6} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.600">
          By entering your number, you agree to our{" "}
          <Text color="heds.400" href="/" target="blank" as={"a"}>
            Terms of Service{" "}
          </Text>{" "}
          and{" "}
          <Text color="heds.400" href="/" target="blank" as={"a"}>
            Privacy Policy
          </Text>
          . Message and data rates may apply.
        </Text>
      </Flex>
    </Stack>
  );
};

export default SendCodeButton;
