import { Dispatch, store } from "@/store/store";
import { GridItem, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const SelectEvent = () => {
  const dispatch = useDispatch<Dispatch>();
  const events = useSelector(store.select.adminModel.selectEvents);
  return (
    <SimpleGrid mb={10} columns={{ base: 2, lg: 6 }} gap={4}>
      <GridItem my={{ base: 10, lg: 5 }} colSpan={{ base: 2, lg: 6 }}>
        <Text fontFamily={"hanken"} fontWeight={600} color="white" fontSize="2xl" textAlign="center">
          Select Event
        </Text>
      </GridItem>
      {events?.map((event) => (
        <GridItem
          onClick={() => {
            dispatch.adminModel.setSelectedEvent(event);
          }}
          key={event.id}
          colSpan={1}
        >
          <Stack alignItems={"center"} justifyContent={"center"} gap={4}>
            <Image src={event.image} boxSize="100px" />
            <Text fontWeight={400} fontFamily={"hanken"} textTransform={"uppercase"} fontSize={"2xs"} color="heds.300">
              {event.name}
            </Text>
          </Stack>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default SelectEvent;
