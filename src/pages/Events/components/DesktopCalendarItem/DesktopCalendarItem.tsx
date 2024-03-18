import { Dispatch, store } from "@/store/store";
import { CalendarItemProps } from "@/store/types";
import { Box, GridItem, Text, Flex, Stack, Image, Fade } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEventOver } from "@/store/utils";

const DesktopCalendarItem = ({ calendarItem }: { calendarItem: CalendarItemProps }) => {
  const dispatch = useDispatch<Dispatch>();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const navigate = useNavigate();
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);

  const handleNavigate = (id: number) => {
    if (calendarItem?.data?.event) {
      dispatch.globalModel.handleUnload([isUnloading, () => navigate(`/event/${id}`)]);
    }
  };

  return (
    <Fade
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
      <GridItem
        onClick={() => (calendarItem?.data?.event?.id ? handleNavigate(calendarItem?.data?.event?.id) : {})}
        key={calendarItem.day}
        w="100%"
        h="0"
        paddingBottom="100%"
        position="relative"
      >
        <Box
          rounded="2xl"
          border="1px"
          borderColor={calendarItem?.month === currentMonth ? "whiteAlpha.400" : "whiteAlpha.100"}
          shadow="sm"
          bg={calendarItem?.month === currentMonth ? "transparent" : "blackAlpha.400"}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          zIndex={1000}
        >
          <Stack mixBlendMode={"difference"} gap={0} h="100%" minW="100%">
            <Text
              ml={2}
              mt={0.5}
              position={"absolute"}
              color={calendarItem?.month === currentMonth ? "whiteAlpha.700" : "whiteAlpha.400"}
              fontSize={"xs"}
              p={1}
              fontFamily={"open"}
              letterSpacing={"tighter"}
              fontWeight={"medium"}
            >
              {calendarItem.month + 1} / {calendarItem.day}
              {calendarItem?.data?.isToday && (
                <Text ml={2} fontSize="xs" as="span">
                  <i className="fa-solid fa-star-of-life"></i>
                </Text>
              )}
            </Text>
            <Flex mixBlendMode={"difference"} alignItems={"center"} position={"relative"} overflow={"hidden"} justifyContent={"center"}>
              {calendarItem?.data?.event?.image && (
                <Image
                  rounded="2xl"
                  _hover={{ opacity: 0.5 }}
                  transition={"all 0.3s ease-in-out"}
                  src={calendarItem?.data?.event?.image}
                  objectFit="cover"
                />
              )}
            </Flex>
          </Stack>
        </Box>
      </GridItem>
    </Fade>
  );
};

export default DesktopCalendarItem;
