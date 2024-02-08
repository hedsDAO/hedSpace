import { DesktopCalendarItemProps } from "@/store/types";
import { Box, GridItem, Text, Flex, Stack } from "@chakra-ui/react";

const DesktopCalendarItem = ({ calendarItem }: { calendarItem: DesktopCalendarItemProps }) => {
  return (
    <GridItem key={calendarItem.day} w="100%" h="0" paddingBottom="100%" position="relative">
      <Box
        rounded="2xl"
        border="1px"
        borderColor="whiteAlpha.400"
        shadow="sm"
        _hover={{ bg: calendarItem?.data?.isToday ? "blackAlpha.800" : "blackAlpha.300" }}
        transition={"all 0.3s ease-in-out"}
        bg={calendarItem?.data?.isToday ? "blackAlpha.500" : "blackAlpha.100"}
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
            color={"whiteAlpha.900"}
            fontSize={"sm"}
            p={1}
            fontFamily={"open"}
            letterSpacing={"tighter"}
            fontWeight={"medium"}
          >
            {calendarItem.month} / {calendarItem.day}
            {calendarItem?.data?.isToday && (
              <Text ml={2} fontSize="xs" as="span">
                <i className="fa-solid fa-star-of-life"></i>
              </Text>
            )}
          </Text>
          <Flex
            mixBlendMode={"difference"}
            alignItems={"center"}
            position={"relative"}
            overflow={"hidden"}
            justifyContent={"center"}
          >
            {calendarItem?.data?.event?.image && (
              <Box
                rounded="2xl"
                _hover={{ opacity: 0.5 }}
                transition={"all 0.3s ease-in-out"}
                as="video"
                playsInline
                autoPlay
                loop
                muted
                // height={"500px"}
                src={
                  "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/flyers%2Fgo.mov?alt=media&token=afc198bd-dbce-45d2-b188-35f8b4f34b00"
                }
                objectFit="cover"
              />
            )}
          </Flex>
        </Stack>
      </Box>
    </GridItem>
  );
};

export default DesktopCalendarItem;
