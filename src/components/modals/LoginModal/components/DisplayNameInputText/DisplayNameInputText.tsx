import { Stack, Text } from "@chakra-ui/react";

const DisplayNameInputText = () => {
  return (
    <Stack gap={0} mb={4} mt={2}>
      <Text mb={1} fontFamily={"Helvetica"} fontWeight={"bold"} opacity={{ lg: "0.9" }} color="heds.200" fontSize={{ base: "xl", lg: "2xl" }}>
        Enter your name
      </Text>
      <Text mt={0} fontFamily={"inter"} color="heds.300" opacity={{ lg: "0.7" }} fontWeight={"medium"} fontSize={{ base: "2xs", lg: "sm" }}>
        Add you first and last name to your account.
      </Text>
      <Text color="heds.400" fontFamily={"inter"} fontWeight={"medium"} opacity={{ lg: "0.6" }} fontSize={"2xs"}>
        this will be used for entry into events
      </Text>
    </Stack>
  );
};

export default DisplayNameInputText;
