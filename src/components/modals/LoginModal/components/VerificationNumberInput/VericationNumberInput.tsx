import { Dispatch, store } from "@/store/store";
import { Button, Fade, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const VerificationNumberInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const error = useSelector(store?.select.userModel.selectError);
  const phoneNumber = useSelector(store?.select.userModel.selectPhoneNumber);
  const isVerifying = useSelector(store?.select.userModel.selectIsVerifying);
  const inputValue = useSelector(store?.select.userModel.selectInputValue);
  const maxVerificationCodeLength = useSelector(store?.select?.userModel.selectMaxVerificationCodeLength);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.length === maxVerificationCodeLength && isVerifying) {
      const verificationCode = inputValue;
      const toNumber = "+1" + phoneNumber.join("");
      dispatch.userModel.verifyCode([toNumber, verificationCode]);
    } else if (event.key === "Backspace" && inputValue.length > 0) {
      dispatch.userModel.setInputValue(inputValue.slice(0, -1));
    } else if (event.key !== "Backspace" && /^[0-9]$/.test(event.key) && inputValue.length < maxVerificationCodeLength) {
      dispatch.userModel.setInputValue(inputValue + event.key);
    }
  };

  const handleShownInputValue = () => {
    const remainder = Math.abs(inputValue.length - maxVerificationCodeLength);
    if (remainder === 0) return inputValue;
    else {
      return inputValue + "_".repeat(remainder);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const filteredText = text.replace(/[^0-9]/g, "");
    if (filteredText && filteredText.length === maxVerificationCodeLength) {
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length === maxVerificationCodeLength) {
        dispatch.userModel.setInputValue(filteredText);
      }
    }
  };

  const handleOnInputChange = (input: string) => {
    const filteredText = input.replace(/[^0-9]/g, "");
    if (filteredText && filteredText.length === maxVerificationCodeLength) {
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length === maxVerificationCodeLength) {
        dispatch.userModel.setInputValue(filteredText);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (isVerifying) window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue, maxVerificationCodeLength]);

  return (
    <Stack justifyContent={"space-between"} minH={{ base: "35vh", lg: "40vh" }} py={4} px={3} mb={5}>
      <Stack gap={0} mb={4} mt={2}>
        <Text mb={0} fontFamily={"Helvetica"} fontWeight={"bold"} color="whiteAlpha.600" fontSize={{ base: "xl", lg: "2xl" }}>
          Verify Code
        </Text>
        <Text fontFamily={"inter"} color="heds.300" opacity={{ lg: "0.7" }} fontWeight={"medium"} fontSize={{ base: "2xs", lg: "sm" }}>
          Enter the 6-digit code sent to +1{phoneNumber.join("")}
        </Text>
      </Stack>
      <Stack mt={10} minW="100%" mx="auto" justifyContent={"center"}>
        <Input
          ref={inputRef}
          as={"input"}
          className="selector"
          type="text"
          name="auth-token"
          id="single-factor-code-text-field"
          //@ts-ignore
          autocomplete="one-time-code"
          inputMode="numeric"
          pattern="[0-9]*"
          onPaste={(e) => {
            handlePaste(e);
          }}
          px={0}
          textAlign={"center"}
          letterSpacing={{ base: "13px", lg: "20px" }}
          value={handleShownInputValue()}
          border="none"
          boxShadow="none"
          outline="none"
          fontSize={{ base: "2xl", lg: "3xl" }}
          fontFamily={"Helvetica"}
          _focus={{ border: "none", boxShadow: "none", outline: "none", color: "transparent", textShadow: "0 0 0 #aaa1ad" }}
          _active={{ border: "none", boxShadow: "none", outline: "none", color: "transparent", textShadow: "0 0 0 #aaa1ad" }}
          textShadow="0 0 0 #aaa1ad"
          color="transparent"
          max={maxVerificationCodeLength}
        />
      </Stack>
      <Fade
        transition={{
          enter: {
            duration: 0.35,
            delay: 0.25,
          },
          exit: {
            duration: 0.35,
            delay: 0.1,
          },
        }}
        in={typeof error === "string"}
      >
        <Text right={2} position={"absolute"} w="100%" fontFamily={"inter"} fontSize={"xs"} textAlign={"center"} opacity={0.7} color="heds.red">
          {error}
        </Text>
      </Fade>
      <Stack>
        <Button
          onClick={() => {
            const verificationCode = inputValue;
            const toNumber = "+1" + phoneNumber.join("");
            dispatch.userModel.verifyCode([toNumber, verificationCode]);
          }}
          isDisabled={inputValue.length < maxVerificationCodeLength || !isVerifying}
          size={"md"}
          rounded="xl"
          bg="whiteAlpha.200"
          _hover={{ bg: "transparent", borderColor: "whiteAlpha.300" }}
          border="1px solid"
          fontWeight={"semibold"}
          fontFamily={"Helvetica"}
          color="whiteAlpha.700"
          fontSize={"sm"}
          borderColor="whiteAlpha.400"
          minW="100%"
        >
          Verify Code
        </Button>
        <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={2}>
          <Text fontWeight={"semibold"} fontFamily={"inter"} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="whiteAlpha.400">
            Having issues verifying your code?
            <Text
              onClick={() => {
                dispatch.userModel.setIsVerifying(false);
                dispatch.userModel.setPhoneNumber([]);
              }}
              color="whiteAlpha.500"
              fontSize={"2xs"}
              textDecoration={"underline"}
              cursor={"pointer"}
            >
              Resend The Code
            </Text>
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};
export default VerificationNumberInput;
