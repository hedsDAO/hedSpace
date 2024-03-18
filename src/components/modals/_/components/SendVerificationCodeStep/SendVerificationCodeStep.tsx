import { Dispatch, store } from "@/store/store";
import { ModalBody, Stack, Flex, ModalFooter, Button, Text, Input, Box, Divider } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SendVerificationCodeStep = () => {
  const event = useSelector(store.select.rsvpModel.selectEvent);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const localNumber = ["", "", "", "", "", "", "", "", "", ""];
  const [inputValue, setInputValue] = useState("");
  const [maxLength, setMaxLength] = useState(10);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputValue]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isInputFocused) return;
    if (event.key === "Backspace" && inputValue.length > 0) {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (event.key !== "Backspace" && /^[0-9]$/.test(event.key) && inputValue.length < maxLength) {
      setInputValue((prev) => prev + event.key);
    }
  };

  const handleTimeString = (time: number) => {
    if (time > 12) {
      return `${time - 12}:00 PM`;
    } else if (time === 0) {
      return `12:00 AM`;
    } else if (time === 12) {
      return `12:00 PM`;
    }
    return `${time}:00 AM`;
  };
  return (
    <>
      <ModalBody gap={{ base: 4, lg: 5 }} minW="100%" as={Stack}>
        <Flex
          minW="100%"
          alignItems={{ base: "center", lg: "start" }}
          direction={{ base: "column", lg: "row" }}
          gap={5}
        >
          <Box
            as="video"
            src={event?.video}
            autoPlay
            loop
            muted
            playsInline
            rounded="2xl"
            height={{ base: "140px", lg: "220px" }}
            objectFit={"contain"}
            aspectRatio={1}
          />
          <Stack alignItems={{ base: "center", lg: "start" }} gap={1}>
            <Text fontWeight={"semibold"} mt={0} color="whiteAlpha.900" fontFamily={"open"} fontSize={"md"}>
              {event?.startTime ? new Date(event?.startTime).toDateString() : null}
            </Text>
            <Flex alignItems={"baseline"} gap={1}>
              <Text fontWeight={"semibold"} mt={0} color="whiteAlpha.700" fontFamily={"open"} fontSize={"sm"}>
                {event?.startTime ? handleTimeString(new Date(event?.startTime).getHours()) : null}
              </Text>
              <Text color="whiteAlpha.700">-</Text>
              <Text fontWeight={"semibold"} mt={0} color="whiteAlpha.700" fontFamily={"open"} fontSize={"sm"}>
                {event?.endTime ? handleTimeString(new Date(event?.endTime).getHours()) : null}
              </Text>
            </Flex>
            <Text fontFamily={"open"} fontSize={"3xl"} color="white">
              {event?.name}
            </Text>
            <Text
              textAlign={{ base: "center", lg: "start" }}
              maxW="50%"
              fontSize={"xs"}
              fontFamily={"open"}
              color="whiteAlpha.600"
            >
              {event?.description}
            </Text>
            <Text
              textAlign={{ base: "center", lg: "start" }}
              lineHeight={"18px"}
              fontSize="sm"
              fontFamily={"open"}
              mt={2}
              color="whiteAlpha.800"
            >
              7515 Melrose Ave. <br /> Los Angeles, CA 90046
            </Text>
          </Stack>
        </Flex>
        <Divider borderColor={"whiteAlpha.400"} mt={3} />
        <Text fontFamily={"open"} textAlign={"start"} color="whiteAlpha.900" fontSize={{ base: "xs", lg: "sm" }}>
          Enter your phone number:
        </Text>
        <Flex minW="100%" alignItems={"center"} justifyContent={"center"} gap={{ base: 2, lg: 6 }}>
          <Text mb={{ base: "-2px", lg: 0 }} color="whiteAlpha.700" mr={1} fontSize={{ base: "md", lg: "2xl" }}>
            + 1
          </Text>
          {localNumber?.map((value, index) => {
            return (
              <Input
                px={{ base: "5px", lg: "6px" }}
                border={"none"}
                textAlign={"center"}
                maxW={"2ch"}
                minW={"2ch"}
                fontSize={{ base: "md", lg: "2xl" }}
                key={index}
                _focus={{ borderColor: "transparent" }}
                _focusVisible={{ borderColor: "transparent" }}
                value={inputValue?.[index]?.length > 0 ? inputValue?.[index] : "_"}
                color="white"
              ></Input>
            );
          })}
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent={"center"} px={4} minW="100%" mt={{ base: 1, lg: 4 }} as={Flex}>
        <Button
          onClick={() => {
            dispatch.rsvpModel.loginUser(inputValue);
          }}
          isDisabled={inputValue.length < maxLength}
          py={4}
          size={{ base: "sm", lg: "md" }}
          rounded="xl"
          w="100%"
          minW="100%"
          bg="white"
        >
          RSVP
        </Button>
      </ModalFooter>
    </>
  );
};

export default SendVerificationCodeStep;
