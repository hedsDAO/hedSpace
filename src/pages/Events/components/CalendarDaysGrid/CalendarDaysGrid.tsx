import { Grid, GridItem, Text } from "@chakra-ui/react";
import { MONTH_DAYS } from "@/store/constants";
import { useSelector } from "react-redux";
import { store } from "@/store/store";

const CalendarDaysGrid = () => {
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);
  const currentDay = useSelector(store.select.eventsModel.selectCurrentDay);
  console.log(new Array(MONTH_DAYS[currentMonth]));
  return (
    <Grid gap={2} templateRows={"repeat(4, 1fr)"} templateColumns={"repeat(7, 1fr)"}>
      {new Array(MONTH_DAYS[currentMonth]).fill(null).map((_, index) => (
        <GridItem colSpan={1} rowSpan={1}>
          <Text color="white"> {index + 1}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CalendarDaysGrid;
