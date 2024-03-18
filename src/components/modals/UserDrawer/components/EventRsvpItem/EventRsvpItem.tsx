import { getEventByEventId } from "@/store/api";
import { Dispatch } from "@/store/store";
import { Event } from "@/store/types";
import { Box, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
          bg="whiteAlpha.100"
          borderColor="whiteAlpha.100"
          minW="100%"
          gap={0}
          _hover={{
            bg: "whiteAlpha.200",
            borderColor: "#FFC300",
          }}
          transition={"0.3s all ease-in-out"}
        >
          <Box py={1.5} px={2.5} mb={0.5} as={Flex} justifyContent={"end"} alignItems={"center"} minW="100%">
            <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize={"2xs"} color="whiteAlpha.700">
              {DateTime.fromMillis(eventData?.startTime).toFormat("LLL dd, yyyy")}
            </Text>
          </Box>
          <Box minW="100%" maxH="25px">
            <Image objectFit={"cover"} minW="100%" maxH="25px" src={eventData?.image} alt={eventData?.name} />
          </Box>
          <Text
            py={1.5}
            mt={0.5}
            textTransform={"uppercase"}
            px={2.5}
            fontFamily={"Helvetica"}
            fontWeight={"bold"}
            color="whiteAlpha.600"
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
