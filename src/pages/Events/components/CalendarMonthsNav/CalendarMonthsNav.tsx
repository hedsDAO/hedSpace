import { Dispatch, store } from "@/store/store";
import { Button, Fade, Flex, Grid, GridItem, SimpleGrid, SlideFade, Text, useBoolean } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { MONTHS } from "@/store/constants";

const CalendarMonthsNav = () => {
  const [isExpanded, setIsExpanded] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const currentMonth = useSelector(store.select.eventsModel.selectCurrentMonth);
  return (
    <SimpleGrid alignItems={"center"} mt={4} px={4} columns={12} spacing={2}>
      {MONTHS.map((month, index) => (
        <Fade
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
          unmountOnExit
          in={isExpanded || index === currentMonth}
        >
          <GridItem key={index} colSpan={1}>
            <Button
              color={currentMonth === index ? "white" : "whiteAlpha.400"}
              _hover={{ color: "white", bg: "transparent" }}
              transition={"all 0.2s ease-in-out"}
              rounded="none"
              border={"1px solid"}
              size="sm"
              bg="transparent"
              w="100%"
              onClick={() => {
                dispatch.eventsModel.setCurrentMonth(index);
                setIsExpanded.off();
              }}
            >
              {month}
            </Button>
          </GridItem>
        </Fade>
      ))}
      <Fade
        transition={{ enter: { delay: 0.5, duration: 0.35 }, exit: { delay: 0.1, duration: 0.1 } }}
        unmountOnExit
        in={!isExpanded}
      >
        <GridItem as={Flex} alignItems={"center"} colSpan={1}>
          <Text
            transition={"all 0.2s ease-in-out"}
            ml={4}
            color={isExpanded ? "transparent" : "white"}
            cursor={"pointer"}
            onClick={setIsExpanded.toggle}
            as="i"
            className="fas fa-chevron-right"
          />
        </GridItem>
      </Fade>
    </SimpleGrid>
  );
};

export default CalendarMonthsNav;
