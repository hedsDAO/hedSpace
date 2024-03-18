import { GridItem, Text } from "@chakra-ui/react";

const DesktopCalendarHeader = () => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      {daysOfWeek?.map((day) => (
        <GridItem mb={5} colSpan={1} key={day} minW="100%" minH="100%">
          <Text
            fontWeight={"medium"}
            letterSpacing={"widest"}
            fontFamily={"open"}
            textAlign={"start"}
            color="blackAlpha.800"
            fontSize={{ base: "xs", lg: "sm" }}
          >
            {day}
          </Text>
        </GridItem>
      ))}
    </>
  );
};

export default DesktopCalendarHeader;
