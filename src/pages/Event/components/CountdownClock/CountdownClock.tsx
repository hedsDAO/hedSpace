import React, { useState, useEffect } from "react";
import { Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";

interface TimeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownClock = ({ endTime }: { endTime: number }) => {
  const calculateTimeLeft = (): TimeLeftProps | null => {
    const difference = endTime - new Date().getTime();

    let timeLeft = {} as TimeLeftProps;
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps | null>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer
  });

  if (!timeLeft) return null; // Don't render anything if the event is over

  return (
    <SimpleGrid my={5} py={0} bg="heds.200" gap={0} columns={4}>
      <GridItem py={1} borderRight={"2px solid"} colSpan={1}>
        <Flex justifyContent={"center"} gap={1}>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            {timeLeft.days > 0 ? timeLeft.days : 0}
          </Text>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            DAYS
          </Text>
        </Flex>
      </GridItem>
      <GridItem py={1} borderRight={"2px solid"} colSpan={1}>
        <Flex justifyContent={"center"} gap={1}>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            {timeLeft.hours > 0 ? timeLeft.hours : 0}
          </Text>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            HOURS
          </Text>
        </Flex>
      </GridItem>
      <GridItem py={1} borderRight={"2px solid"} colSpan={1}>
        <Flex justifyContent={"center"} gap={1}>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            {timeLeft.minutes > 0 ? timeLeft.minutes : 0}
          </Text>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            MINS
          </Text>
        </Flex>
      </GridItem>
      <GridItem py={1} colSpan={1}>
        <Flex justifyContent={"center"} gap={1}>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            {timeLeft.seconds > 0 ? timeLeft.seconds : 0}
          </Text>
          <Text fontWeight={600} fontFamily={"hanken"} color="heds.900" fontSize="xs">
            SECS
          </Text>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};

export default CountdownClock;
