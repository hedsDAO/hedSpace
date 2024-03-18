import { Stack, Text } from "@chakra-ui/react";

const PhoneNumberInputText = () => {
  return (
    <Stack gap={0} mb={4} mt={2}>
      <Text mb={1} fontFamily={"Helvetica"} fontWeight={"bold"} opacity={{ lg: "0.9" }} color="heds.200" fontSize={{ base: "xl", lg: "2xl" }}>
        Log In
      </Text>
      <Text mt={0} fontFamily={"inter"} color="heds.300" opacity={{ lg: "0.7" }} fontWeight={"medium"} fontSize={{ base: "2xs", lg: "sm" }}>
        Enter your phone number to receive a verification code.
      </Text>
      <Text color="heds.400" fontFamily={"inter"} fontWeight={"medium"} opacity={{ lg: "0.6" }} fontSize={"2xs"}>
        message and data rates may apply
      </Text>
    </Stack>
  );
};

export default PhoneNumberInputText;
