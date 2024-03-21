import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const PRIVACY_POLICY =
  "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/terms%2FPrivacy%20Policy.pdf?alt=media&token=6ead266d-d9f0-4ef3-8413-798b221e1fb1";
const TERMS_OF_SERVICE =
  "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/terms%2FTerms%20of%20Service%20Updated.pdf?alt=media&token=d720d864-fc8a-4aba-8ba8-fe8be1390099";

const SendCodeButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputValue = useSelector(store.select.userModel.selectInputValue);
  const maxPhoneNumberLength = useSelector(store.select.userModel.selectMaxPhoneNumberLength);
  const isLoading = useSelector(store.select.userModel.selectIsLoading);
  return (
    <Stack>
      <Button
        isLoading={isLoading}
        onClick={() => {
          dispatch.userModel.setInputValue("");
          dispatch.userModel.setPhoneNumber(inputValue.split(""));
          dispatch.userModel.setIsVerifying(true);
          dispatch.userModel.sendVerificationCode("+1" + inputValue);
        }}
        isDisabled={inputValue.length !== maxPhoneNumberLength || isLoading}
        _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
        size={"md"}
        rounded="3xl"
        bg="heds.800"
        color="heds.green"
        _hover={inputValue.length !== maxPhoneNumberLength ? {} : { bg: "heds.green", borderColor: "heds.green", color: "heds.100" }}
        border="1.5px solid"
        borderColor="heds.green"
        fontWeight={"semibold"}
        fontFamily={"inter"}
        fontSize={"sm"}
        minW="100%"
      >
        Send Code
      </Button>{" "}
      <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={3}>
        <Text fontWeight={"medium"} fontFamily={"inter"} opacity={0.6} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.500">
          By entering your number, you agree to our{" "}
          <Text fontWeight={"semibold"} color="heds.400" href={TERMS_OF_SERVICE} target="blank" as={"a"}>
            Terms of Service{" "}
          </Text>{" "}
          and{" "}
          <Text fontWeight={"semibold"} color="heds.400" href={PRIVACY_POLICY} target="blank" as={"a"}>
            Privacy Policy
          </Text>
          . Message and data rates may apply.
        </Text>
      </Flex>
    </Stack>
  );
};

export default SendCodeButton;
