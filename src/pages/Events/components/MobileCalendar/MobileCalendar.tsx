import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MONTHS } from "@/store/constants";
import { Dispatch, store } from "@/store/store";
import { Box, Button, Divider, Fade, Flex, Grid, GridItem, Image, Stack, Text, useBoolean } from "@chakra-ui/react";
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
      mt={{ base: 3, lg: 0 }}
      minH="20vh"
      justifyContent={"center"}
      ref={elementRef}
      position="relative"
    >
      {!mobileSelectedEvent &&
        events?.sort((a, b) => b.startTime - a.startTime)?.map((event) => {
          const currentEndTimeForEvent = new Date(event.endTime).getTime();
          if (currentEndTimeForEvent > new Date().getTime() && event?.name?.toLowerCase() !== 'test') {
            return (
              <Fade
                key={event?.id}
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
                <Stack
                  onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + event.name.replace(/ /g,'-'))])}
                  boxShadow={"sm"}
                  p={1.5}
                  rounded={"lg"}
                  bg="heds.800"
                  my={{ base: 0.5, lg: 5 }}
                  alignItems="center"
                >
                  <Flex minW="90vw">
                    <Image
                      boxShadow={"md"}
                      aspectRatio={1}
                      maxH="50px"
                      minH="50px"
                      bg="heds.600"
                      rounded="md"
                      objectFit={"cover"}
                      key={event.id}
                      src={event.image}
                      alt={event.name}
                      onClick={() => navigate("/event/" + event.name.replace(/ /g,'-'))}
                    />
                    <Stack alignSelf={"center"} gap={0} justifyContent={"start"}>
                      <Text textTransform={"uppercase"} px={2.5} fontFamily={"inter"} fontSize={"2xs"} fontWeight={"bold"} color="heds.300">
                        {new Date(event.startTime).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                      </Text>
                      <Text textTransform={"uppercase"} px={2.5} mt={-0.5} fontFamily={"inter"} fontSize={"2xs"} fontWeight={"light"} color="heds.400">
                        {event.name}
                      </Text>
                    </Stack>
                  </Flex>
                </Stack>
              </Fade>
            );
          }
        })}

      <Fade
        in={!isUnloading && !mobileSelectedEvent}
        unmountOnExit
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
        <Flex mt={4} minW="100vw" px={{ base: 4, lg: 0 }} mx="auto" alignItems={"center"} justifyContent={"space-between"}>
          <Button
            bg="transparent"
            isDisabled={currentMonth === 0}
            _hover={{ bg: "transparent", color: "white" }}
            color="whiteAlpha.700"
            onClick={() => {
              if (currentMonth === 0) return;
              dispatch.globalModel.handleUnload([isUnloading, () => dispatch.eventsModel.setCurrentMonth(currentMonth - 1)]);
            }}
          >
            <Text as="i" className="fas fa-chevron-left" fontSize={{ base: "sm", lg: "lg" }} />
          </Button>
          <Text color="whiteAlpha.800" fontSize={{ base: "sm", lg: "lg" }} fontWeight="bold" fontFamily="Helvetica" textAlign="center">
            {MONTHS[currentMonth]}
          </Text>
          <Button
            bg="transparent"
            isDisabled={currentMonth === 11}
            _hover={{ bg: "transparent", color: "white" }}
            color="whiteAlpha.700"
            onClick={() => {
              if (currentMonth === 11) return;
              dispatch.globalModel.handleUnload([isUnloading, () => dispatch.eventsModel.setCurrentMonth(currentMonth + 1)]);
            }}
          >
            <Text as="i" className="fas fa-chevron-right" fontSize={{ base: "sm", lg: "lg" }} />
          </Button>
        </Flex>
      </Fade>

      {mobileSelectedEvent ? (
        <Fade
          style={{ minWidth: "100%", zIndex: 1000 }}
          in={!isUnloading}
          unmountOnExit
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
          <Stack minW="100%" mt={3} px={8} gap={5} alignItems={"center"}>
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
              onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + mobileSelectedEvent?.name)])}
            >
              View Event
            </Button>
          </Stack>
        </Fade>
      ) : (
        <Fade
          style={{ minWidth: "100%", zIndex: 1000 }}
          in={!isUnloading}
          unmountOnExit
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
          <Grid mt={10} px={5} gap={5} mb={10} templateRows="repeat(3, 1fr)" templateColumns="repeat(7, 1fr)">
            {calendar?.[currentMonth]?.map((calendarItem: CalendarItemProps, index: number) => (
              <GridItem key={calendarItem?.month + index} colSpan={1}>
                <Text
                  cursor={calendarItem?.data?.event?.id ? "pointer" : "none"}
                  onClick={() => {
                    if (calendarItem?.data?.event?.id) {
                      dispatch.globalModel.handleUnload([isUnloading, () => dispatch.eventsModel.setMobileSelectedEvent(calendarItem?.data?.event)]);
                    }
                  }}
                  fontFamily={"Helvetica"}
                  textAlign={"center"}
                  color={currentMonth === calendarItem?.month ? "white" : "whiteAlpha.400"}
                >
                  {calendarItem?.day}
                </Text>
                <Box my={1.5} mx="auto" h="7px" w="7px" rounded="100%" bg={!!calendarItem?.data?.event ? "whiteAlpha.500" : "transparent"} />
              </GridItem>
            ))}
          </Grid>
        </Fade>
      )}
    </Stack>
  );
};

export default MobileCalendar;
