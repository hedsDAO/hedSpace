import { Box, Flex, Image, Stack, Text, useBoolean } from "@chakra-ui/react";
import EventRsvpFormText from "../EventRsvpFormText/EventRsvpFormText";
import { useSelector } from "react-redux";
import { store } from "@/store/store";
import AddRsvpButton from "../AddRsvpButton/AddRsvpButton";
import { formatEventDescription, returnMidnightString } from "@/store/utils";
import { DateTime } from "luxon";

const EventRsvpForm = () => {
  const event = useSelector(store?.select?.userModel?.selectEvent);

  return (
    <Stack justifyContent={"space-between"} minH={{ base: "38vh", lg: "40vh" }} py={4} gap={4} px={3} mb={5}>
      <EventRsvpFormText />
      {event ? (
        <Stack mb={6} gap={3} alignItems={"start"}>
          <Flex direction={{ base: "column", lg: "row" }} bg="heds.700" p={1} rounded="lg" gap={1}>
            <Image
              maxH={{ base: "15vh", lg: "100%" }}
              maxW={{ base: "100%", lg: "30%" }}
              objectFit={"cover"}
              aspectRatio={1}
              src={event?.image}
              alt={event?.name}
              borderRadius={"lg"}
            />
            <Stack maxW={{ base: "100%", lg: "70%" }} bg="heds.800" px={3.5} py={2.5} rounded="lg">
              <Text mt={-1} fontFamily={"Helvetica"} fontWeight={"bold"} fontSize={{ base: "md", lg: "lg" }} color="heds.400">
                {event.name}
              </Text>
              <Text fontWeight={400} fontFamily={"open"} whiteSpace={"pre-line"} fontSize={{ base: "2xs", lg: "2xs" }} color="heds.500">
                {formatEventDescription(event?.description)}
              </Text>
            </Stack>
          </Flex>
          <Stack bg="heds.700" p={1} rounded="lg" minW="100%">
            <Stack bg="heds.800" rounded="lg" p={1} py={2.5} gap={1} alignItems={"center"}>
              <Text color="heds.400" fontWeight={"semibold"} fontSize={"xs"} fontFamily={"open"}>
                <Text fontWeight={"medium"} color="heds.500" as="span">
                  STARTS:
                </Text>{" "}
                {returnMidnightString(DateTime.fromMillis(event?.startTime).toFormat("f"))}
              </Text>
              <Text color="heds.400" fontSize={"xs"} fontWeight={"semibold"} fontFamily={"open"}>
                <Text fontWeight={"medium"} color="heds.500" as="span">
                  ENDS:
                </Text>{" "}
                {returnMidnightString(DateTime.fromMillis(event?.endTime).toFormat("f"))}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
      <AddRsvpButton />
    </Stack>
  );
};

export default EventRsvpForm;
