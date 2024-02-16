import { Dispatch, store } from "@/store/store";
import { ModalBody, Stack, Flex, ModalFooter, Button, Text, Input, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ValidateVerificationCode = () => {
  const hasDisplayName = useSelector(store.select.rsvpModel.selectHasDisplayName);
  const event = useSelector(store.select.rsvpModel.selectEvent);
  const dispatch = useDispatch<Dispatch>();
  const verifiedPhoneNumber = useSelector(store.select.rsvpModel.selectVerifiedPhoneNumber);
  const localCode = ["", "", "", "", "", ""];
  const firstName = useSelector(store.select.rsvpModel.selectFirstName);
  const lastName = useSelector(store.select.rsvpModel.selectLastName);
  const [inputValue, setInputValue] = useState("");
  const [maxLength, setMaxLength] = useState(6);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace" && inputValue.length > 0) {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (event.key !== "Backspace" && /^[0-9]$/.test(event.key) && inputValue.length < maxLength) {
      setInputValue((prev) => prev + event.key);
    }
  };
  return (
    <>
      <ModalBody gap={{ base: 4, lg: 5 }} minW="100%" as={Stack}>
        <Text fontFamily={"open"} textAlign={"start"} color="whiteAlpha.900" fontSize={{ base: "xs", lg: "sm" }}>
          Enter the verification code:
        </Text>
        <Flex minW="100%" alignItems={"center"} justifyContent={"center"} gap={{ base: 2, lg: 6 }}>
          {localCode?.map((value, index) => {
            return (
              <Input
                px={{ base: "5px", lg: "6px" }}
                border={"none"}
                textAlign={"center"}
                maxW={"2ch"}
                minW={"2ch"}
                fontSize={{ base: "md", lg: "2xl" }}
                key={index}
                color="white"
                _focus={{ border: "none" }}
                _focusVisible={{ border: "none" }}
                value={inputValue?.[index]?.length > 0 ? inputValue?.[index] : "_"}
              ></Input>
            );
          })}
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent={"center"} px={4} minW="100%" mt={{ base: 1, lg: 4 }} as={Flex}>
        <Button
          onClick={() => {
            if (verifiedPhoneNumber) {
              dispatch.rsvpModel.verifyUser({
                to: verifiedPhoneNumber,
                code: inputValue,
                eventId: event?.id || 0,
              });
            }
          }}
          isDisabled={inputValue.length < maxLength}
          py={4}
          size={{ base: "sm", lg: "md" }}
          rounded="xl"
          w="100%"
          minW="100%"
          bg="white"
        >
          VERIFY
        </Button>
      </ModalFooter>
    </>
  );
};

export default ValidateVerificationCode;
