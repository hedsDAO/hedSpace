import { getEventByEventId } from "@/store/api";
import { Dispatch } from "@/store/store";
import { Event } from "@/store/types";
import { Box, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEventOver } from "@/store/utils";

const EventRsvpItem = ({ eventId }: { eventId: number }) => {
  const dispatch = useDispatch<Dispatch>();
  const [eventData, setEventData] = useState<null | Event>();
  const navigate = useNavigate();
  const fetchEventData = async () => {
    const response = await getEventByEventId(eventId);
    setEventData(response.data);
  };

  const handleNavigate = () => {
    if (eventData?.id) {
      navigate(`/event/${eventData.id}`);
      dispatch.userModel.setIsUserDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (!eventData) {
      fetchEventData();
    } else if (eventData?.id !== eventId) {
      fetchEventData();
    } else {
      return;
    }
  }, [eventId]);

  return (
    <>
      {eventData ? (
        <Stack
          onClick={() => handleNavigate()}
          rounded="lg"
          border="1px solid"
          bg={isEventOver(eventData) ? "heds.800" : "heds.900"}
          borderColor={isEventOver(eventData) ? "heds.700" : "heds.green"}
          minW="100%"
          gap={1}
          _hover={{
            bg: isEventOver(eventData) ? "heds.700" : "whiteAlpha.200",

            borderColor: isEventOver(eventData) ? "heds.600" : "heds.green",
          }}
          transition={"0.3s all ease-in-out"}
        >
          <Box py={"8px"} px={2.5} my={0.5} as={Flex} justifyContent={"end"} alignItems={"center"} minW="100%">
            <Text
              as={isEventOver(eventData) ? "s" : "p"}
              textTransform={"uppercase"}
              fontWeight={"bold"}
              fontSize={"xs"}
              color={isEventOver(eventData) ? "whiteAlpha.300" : "heds.green"}
            >
              {DateTime.fromMillis(eventData?.startTime).toFormat("LLL dd, yyyy")}
            </Text>
          </Box>
          <Box minW="100%" maxH="25px">
            <Image objectFit={"cover"} minW="100%" maxH="25px" src={eventData?.image} alt={eventData?.name} />
          </Box>
          <Text
            py={2}
            my={0.5}
            textTransform={"uppercase"}
            px={2.5}
            fontFamily={"open"}
            fontWeight={"bold"}
            color={isEventOver(eventData) ? "whiteAlpha.300" : "heds.green"}
            fontSize="2xs"
          >
            {eventData?.name}
          </Text>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default EventRsvpItem;
