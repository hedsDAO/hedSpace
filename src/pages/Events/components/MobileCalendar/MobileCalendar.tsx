import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MONTHS } from "@/store/constants";
import { Dispatch, store } from "@/store/store";
import { Box, Button, Divider, Fade, Flex, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import { CalendarItemProps } from "@/store/types";
import { useNavigate } from "react-router-dom";

const MobileCalendar = () => {
  const navigate = useNavigate();
  const elementRef = useRef(null);
  const events = useSelector(store.select.eventsModel.selectEvents);
  const dispatch = useDispatch<Dispatch>();
  const mobileSelectedEvent = useSelector(store.select.eventsModel.selectMobileSelectedEvent);
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);
  const swiperRef = useRef<any>(null);
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const calendar = useSelector(store.select.eventsModel.selectCalendar);

  return (
    <Stack
      display={{ base: "flex", lg: "none" }}
      w="100%"
      gap={0}
      alignItems={"center"}
      minH="20vh"
      justifyContent={"center"}
      ref={elementRef}
      position="relative"
    >
      <Fade
        in={!isUnloading}
        transition={{
          enter: {
            duration: 0.35,
            delay: 0.25,
          },
          exit: {
            duration: 0.35,
            delay: 0.1,
          },
        }}
      >
        <Stack mt={5} alignItems="center" gap={4}>
          <Text
            alignSelf={"start"}
            px={5}
            fontWeight={"semibold"}
            fontFamily={"Helvetica"}
            fontSize={"lg"}
            color="whiteAlpha.900"
          >
            Upcoming Events
          </Text>
          {events?.map((event) => {
            const currentEndTimeForEvent = new Date(event.endTime).getTime();
            if (currentEndTimeForEvent > new Date().getTime())
              return (
                <Stack alignItems="center" minW="90vw">
                  <Image
                    maxW="95vw"
                    minW="95vw"
                    maxH="80px"
                    objectFit={"cover"}
                    key={event.id}
                    src={event.image}
                    alt={event.name}
                  />
                  <Flex alignSelf={"center"} minW="100%" justifyContent={"space-between"}>
                    <Text
                      alignSelf={"end"}
                      px={2.5}
                      mt={2}
                      fontFamily={"Helvetica"}
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      color="whiteAlpha.600"
                    >
                      {new Date(event.startTime).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                    </Text>
                    <Text
                      alignSelf={"end"}
                      px={3}
                      mt={1}
                      fontFamily={"Helvetica"}
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      color="whiteAlpha.600"
                    >
                      {event.name}
                    </Text>
                  </Flex>
                </Stack>
              );
          })}
          <Divider maxW="93%" borderColor={"whiteAlpha.500"} borderWidth={"1"} />
        </Stack>
        <Flex
          mt={8}
          minW="100vw"
          px={{ base: 4, lg: 0 }}
          mx="auto"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            bg="transparent"
            isDisabled={currentMonth === 0}
            _hover={{ bg: "transparent", color: "white" }}
            color="whiteAlpha.700"
            onClick={() => {
              if (currentMonth === 0) return;
              dispatch.globalModel.handleUnload([
                isUnloading,
                () => dispatch.eventsModel.setCurrentMonth(currentMonth - 1),
              ]);
            }}
          >
            <Text as="i" className="fas fa-chevron-left" fontSize={{ base: "sm", lg: "lg" }} />
          </Button>
          <Text
            color="whiteAlpha.800"
            fontSize={{ base: "sm", lg: "lg" }}
            fontWeight="bold"
            fontFamily="Helvetica"
            textAlign="center"
          >
            {MONTHS[currentMonth]}
          </Text>
          <Button
            bg="transparent"
            isDisabled={currentMonth === 11}
            _hover={{ bg: "transparent", color: "white" }}
            color="whiteAlpha.700"
            onClick={() => {
              if (currentMonth === 11) return;
              dispatch.globalModel.handleUnload([
                isUnloading,
                () => dispatch.eventsModel.setCurrentMonth(currentMonth + 1),
              ]);
            }}
          >
            <Text as="i" className="fas fa-chevron-right" fontSize={{ base: "sm", lg: "lg" }} />
          </Button>
        </Flex>
      </Fade>
      <Fade
        style={{ width: "100%", zIndex: 1000 }}
        in={!isUnloading}
        transition={{
          enter: {
            duration: 0.5,
            delay: 0.35,
          },
          exit: {
            duration: 0.2,
            delay: 0.2,
          },
        }}
      >
        {mobileSelectedEvent ? (
          <Stack mt={3} px={8} gap={5} alignItems={"center"}>
            <Image src={mobileSelectedEvent?.image} />
            <Text mb={-4} ml={3} fontFamily={"Helvetica"} fontSize="md" color="whiteAlpha.800" alignSelf={"start"}>
              {mobileSelectedEvent?.name}
            </Text>
            <Text ml={3} fontFamily={"Helvetica"} fontSize="xs" color="whiteAlpha.600" alignSelf={"start"}>
              {mobileSelectedEvent?.description}
            </Text>
            <Button
              minW="95%"
              rounded="none"
              border="1px solid"
              borderColor="whiteAlpha.700"
              bg="transparent"
              color="whiteAlpha.700"
              fontFamily={"Helvetica"}
              _hover={{ bg: "transparent", color: "white", borderColor: "whiteAlpha.900" }}
              transition={"0.35s all ease-in-out"}
              mt={4}
              size="sm"
              onClick={() =>
                dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + mobileSelectedEvent?.id)])
              }
            >
              View Event
            </Button>
          </Stack>
        ) : (
          <Grid px={5} gap={5} templateRows="repeat(3, 1fr)" templateColumns="repeat(7, 1fr)">
            <GridItem as={Stack} colSpan={7}>
              <Flex></Flex>
            </GridItem>
            {calendar?.[currentMonth]?.map((calendarItem: CalendarItemProps, index: number) => (
              <GridItem colSpan={1}>
                <Text
                  cursor={calendarItem?.data?.event?.id ? "pointer" : "none"}
                  onClick={() => {
                    if (calendarItem?.data?.event?.id) {
                      dispatch.globalModel.handleUnload([
                        isUnloading,
                        () => dispatch.eventsModel.setMobileSelectedEvent(calendarItem?.data?.event),
                      ]);
                    }
                  }}
                  fontFamily={"Helvetica"}
                  textAlign={"center"}
                  color={currentMonth === calendarItem?.month ? "white" : "whiteAlpha.400"}
                >
                  {calendarItem?.day}
                </Text>
                <Box
                  my={1.5}
                  mx="auto"
                  h="7px"
                  w="7px"
                  rounded="100%"
                  bg={!!calendarItem?.data?.event ? "whiteAlpha.500" : "transparent"}
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </Fade>
    </Stack>
  );
};

export default MobileCalendar;
