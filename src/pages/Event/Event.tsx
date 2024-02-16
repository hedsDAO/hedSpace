import { MANAGE_EVENTS_API_ENDPOINT } from "@/store/constants";
import { Dispatch, store } from "@/store/store";
import { Box, GridItem, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Event = () => {
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.eventModel.selectEvent);
  const { id } = useParams();

  useEffect(() => {
    if (id && !event) {
      dispatch.eventModel.getEventById(id);
    }
  }, [id]);
  return (
    <Stack py={5} px={10} minH="85vh">
      <SimpleGrid columns={{ lg: 4 }}>
        <GridItem colSpan={1}>
          <Stack>
            <Image src={event?.image} rounded="20px" aspectRatio={1} bg="white" />
            <Text px={2} fontSize={"5xl"} fontFamily={"Helvetica"} color="whiteAlpha.800">
              {event?.name}
            </Text>
            <Text px={2} fontSize="2xs" color="whiteAlpha.500">
              {event?.description}
            </Text>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </Stack>
  );
};

export default Event;
