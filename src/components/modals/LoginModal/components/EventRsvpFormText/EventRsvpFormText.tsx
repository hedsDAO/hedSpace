import { store } from "@/store/store";
import { Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const EventRsvpFormText = () => {
  const event = useSelector(store?.select?.userModel?.selectEvent);
  return (
    <Stack gap={0} mb={4} mt={2}>
      <Text mb={1} fontFamily={"Helvetica"} maxW="80%" isTruncated fontWeight={"bold"} opacity={{ lg: "0.9" }} color="heds.200" fontSize={{ base: "xl", lg: "2xl" }}>
        RSVP to {event?.name}
      </Text>
      <Text mt={0} fontFamily={"inter"} color="heds.300" opacity={{ lg: "0.7" }} fontWeight={"medium"} fontSize={{ base: "2xs", lg: "sm" }}>
        Add your name to the guest list.
      </Text>
      <Text color="heds.400" fontFamily={"inter"} fontWeight={"medium"} opacity={{ lg: "0.6" }} fontSize={"2xs"}>
        This will be used for entry into the event.
      </Text>
    </Stack>
  );
};

export default EventRsvpFormText;
