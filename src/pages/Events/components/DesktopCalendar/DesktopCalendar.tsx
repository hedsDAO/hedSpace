import { Grid, Box, Flex, GridItem, SimpleGrid, Stack, Fade, SlideFade } from "@chakra-ui/react";
import { DAYS, MONTHS, MONTH_DAYS, PLACEHOLDER_IMAGE } from "@/store/constants";
import { useSize } from "@chakra-ui/react-use-size";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store/store";
import { CalendarItemProps } from "@/store/types";
import DesktopCalendarItem from "../DesktopCalendarItem/DesktopCalendarItem";
import IMAGES from "@/images";

const DesktopCalendar = () => {
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);
  const calendar = useSelector(store.select.eventsModel.selectCalendar);
  const elementRef = useRef(null);
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const dimensions = useSize(elementRef);

  return (
    <SlideFade
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
      <Flex
        display={{ base: "none", lg: "flex" }}
        gap={5}
        my={10}
        maxW="7xl"
        
        justifyContent={"center"}
        ref={elementRef}
        position="relative"
        width="99vw"
      >
        <Box
          minH={{ base: 0, lg: "80vh" }}
          rounded="2xl"
          position="absolute"
          top="0"
          left="0"
          width={dimensions && dimensions.width > 0 ? dimensions.width : "100%"}
          height={dimensions && dimensions.height > 0 ? dimensions.height : "100%"}
          zIndex="0"
          opacity={0.55}
          maxH="150vh"
          bgImage={`url(${IMAGES.placeholder})`}
          bgSize="cover"
          style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,100))", maskSize: "cover" }}
        />

        <Grid
          p={2}
          position="relative"
          zIndex="10"
          display={{ base: "none", lg: "grid" }}
          width="100%"
          height="80%"
          gap={2}
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(7, 1fr)"
        >
          {calendar?.[currentMonth]?.map((calendarItem: CalendarItemProps, index: number) => (
            <DesktopCalendarItem key={index} calendarItem={calendarItem} />
          ))}
        </Grid>
      </Flex>
    </SlideFade>
  );
};

export default DesktopCalendar;
