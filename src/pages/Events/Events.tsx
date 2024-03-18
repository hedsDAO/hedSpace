import { DAYS, MONTHS, PLACEHOLDER_IMAGE } from "@/store/constants";
import { Box, Button, Fade, Flex, GridItem, SimpleGrid, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import DesktopCalendar from "./components/DesktopCalendar/DesktopCalendar";
import MobileCalendar from "./components/MobileCalendar/MobileCalendar";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { useEffect } from "react";

const Events = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch<Dispatch>();
  const mobileSelectedEvent = useSelector(store.select.eventsModel.selectMobileSelectedEvent);
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);
  const events = useSelector(store.select.eventsModel.selectEvents);

  useEffect(() => {
    if (!events) {
      dispatch.eventsModel.getEvents();
    }
    return () => {
      dispatch.eventsModel.clearState();
    };
  }, []);
  return (
    <>
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
        {mobileSelectedEvent ? (
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
            <Flex mt={{ base: 2, lg: 10 }} px={{ base: 4, lg: 0 }}>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent", color: "white" }}
                color="whiteAlpha.700"
                onClick={() => {
                  dispatch.globalModel.handleUnload([
                    isUnloading,
                    () => dispatch.eventsModel.setMobileSelectedEvent(null),
                  ]);
                }}
              >
                <Text as="i" className="fas fa-chevron-left" fontSize={{ base: "sm", lg: "lg" }} />
                <Text color="whiteAlpha.800" fontWeight={"semibold"} fontFamily={"Helvetica"} fontSize="sm" ml={4}>
                  back
                </Text>
              </Button>
            </Flex>
          </Fade>
        ) : (
          <Fade
            unmountOnExit
            in={!isUnloading && !isMobile}
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
            <Flex
              my={{ base: 6, lg: 10 }}
              maxW="7xl"
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
        )}
      </Fade>
      <SimpleGrid display={{ base: "none", lg: "grid" }} maxW="7xl" mx="auto" columns={7}>
        {DAYS?.map((day, index) => (
          <Fade
            key={index}
            in={!isUnloading}
            transition={{
              enter: {
                duration: 0.35,
                delay: 0.25 * index,
              },
              exit: {
                duration: 0.35,
                delay: 0.1,
              },
            }}
          >
            <GridItem colSpan={1}>
              <Text
                fontWeight={"bold"}
                fontFamily={"Helvetica"}
                textAlign={"center"}
                color="whiteAlpha.700"
                fontSize={"xs"}
              >
                {day}
              </Text>
            </GridItem>
          </Fade>
        ))}
      </SimpleGrid>
      <Stack
        gap={0}
        minH={{ base: "79vh", lg: "90vh", xl: "87vh" }}
        minW="100vw"
        maxW="100vw"
        alignItems={"center"}
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          backgroundImage={`url(${PLACEHOLDER_IMAGE})`}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center center"
          filter="blur(15px)"
          opacity={0.75}
          zIndex="-1"
        />
        <DesktopCalendar />
        <MobileCalendar />
      </Stack>
    </>
  );
};

export default Events;
