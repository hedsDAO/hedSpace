import { Dispatch, store } from "@/store/store";
import { Flex, Input, Spinner, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendCodeButton from "../SendCodeButton/SendCodeButton";
import PhoneNumberInputText from "../PhoneNumberInputText/PhoneNumberInputText";
import _ from "lodash";

const PhoneNumberInput = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch<Dispatch>();
  const inputValue = useSelector(store?.select.userModel.selectInputValue);
  const isVerifying = useSelector(store?.select.userModel.selectIsVerifying);
  const maxPhoneNumberLength = useSelector(store?.select?.userModel.selectMaxPhoneNumberLength);

  const handleShownInputValue = () => {
    const remainder = Math.abs(inputValue.length - maxPhoneNumberLength);
    if (remainder === 0) return inputValue;
    else {
      return inputValue + "_".repeat(remainder);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.length === maxPhoneNumberLength) {
      dispatch.userModel.setInputValue("");
      dispatch.userModel.setPhoneNumber(inputValue.split(""));
      dispatch.userModel.setIsVerifying(true);
      dispatch.userModel.sendVerificationCode("+1" + inputValue);
    } else if (event.key === "Backspace" && inputValue.length > 0) {
      dispatch.userModel.setInputValue(inputValue.slice(0, -1));
    } else if (event.key !== "Backspace" && /^[0-9]$/.test(event.key) && inputValue.length < maxPhoneNumberLength) {
      dispatch.userModel.setInputValue(inputValue + event.key);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    const filteredText = text.replace(/[^0-9]/g, "");
    if (filteredText) {
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length === maxPhoneNumberLength) {
        dispatch.userModel.setInputValue(filteredText);
      }
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length > maxPhoneNumberLength) {
        if (filteredText[0] === "1" && filteredText?.length === maxPhoneNumberLength + 1) {
          const filteredString = filteredText.slice(1);
          dispatch.userModel.setInputValue(filteredString);
        }
      }
    }
  };

  const handleOnInputChange = (input: string) => {
    const filteredText = input.replace(/[^0-9]/g, "");
    if (filteredText) {
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length === maxPhoneNumberLength) {
        dispatch.userModel.setInputValue(filteredText);
      }
      if (/^-?\d*\.?\d*$/.test(filteredText) && filteredText?.length > maxPhoneNumberLength) {
        if (filteredText[0] === "1" && filteredText?.length === maxPhoneNumberLength + 1) {
          const filteredString = filteredText.slice(1);
          dispatch.userModel.setInputValue(filteredString);
        }
      }
    }
  };

  useEffect(() => {
    if (!isVerifying) window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue, maxPhoneNumberLength]);

  return (
    <Stack justifyContent={"space-between"} minH={{ base: "38vh", lg: "40vh" }} py={4} px={3} mb={5}>
      {isVerifying ? (
        <Stack minH={{ base: "30vh", lg: "37vh" }} minW="100%" alignItems={"center"} justifyContent={"center"}>
          <Spinner color="whiteAlpha.500" size={"lg"} />
        </Stack>
      ) : (
        <>
          <PhoneNumberInputText />
          <Stack mb={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontWeight={"semibold"} letterSpacing={"3px"} mr={{ base: 0, lg: 4 }} color="heds.400" fontSize={{ base: "sm", lg: "xs" }}>
                +1
              </Text>
              <Input
                className="selector"
                autoComplete="tel"
                type="tel"
                inputMode="tel"
                onPaste={(e) => {
                  _.debounce(() => handlePaste(e), 150);
                }}
                onInput={(e) => {
                  _.debounce(() => handleOnInputChange(e.currentTarget.value), 100);
                }}
                width={{ base: "90%", lg: "80%" }}
                px={0}
                textAlign={"center"}
                letterSpacing={{ base: "13px", lg: "20px" }}
                value={handleShownInputValue()}
                border="none"
                boxShadow="none"
                outline="none"
                fontSize={{ base: "xl", lg: "2xl" }}
                fontFamily={"Helvetica"}
                _focus={{ border: "none", boxShadow: "none", outline: "none", color: "transparent", textShadow: "0 0 0 #aaa1ad" }}
                _active={{ border: "none", boxShadow: "none", outline: "none", color: "transparent", textShadow: "0 0 0 #aaa1ad" }}
                textShadow="0 0 0 #aaa1ad"
                color="transparent"
                max={maxPhoneNumberLength}
              />
            </Flex>
          </Stack>
          <SendCodeButton />
        </>
      )}
    </Stack>
  );
};
export default PhoneNumberInput;
