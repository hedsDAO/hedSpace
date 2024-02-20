import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface TimeLeftProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownClock = ({ endTime }: { endTime: number }) => {
  const calculateTimeLeft = (): TimeLeftProps => {
    const difference = endTime - new Date().getTime();

    let timeLeft = {} as TimeLeftProps;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <Flex gap={3}>
      <Flex gap={1.5} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="xl" color="white" fontWeight={"bold"}>
          {timeLeft.days || 0}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600" fontWeight={"bold"}>
          DAYS
        </Text>
      </Flex>
      <Flex gap={1.5} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="xl" color="white" fontWeight={"bold"}>
          {timeLeft.hours || 0}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600" fontWeight={"bold"}>
          HOURS
        </Text>
      </Flex>
      <Flex gap={1.5} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="xl" color="white" fontWeight={"bold"}>
          {timeLeft.minutes || 0}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600" fontWeight={"bold"}>
          MINS
        </Text>
      </Flex>
      <Flex gap={1.5} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="xl" color="white" fontWeight={"bold"}>
          {timeLeft.seconds || 0}
        </Text>
        <Text fontSize="xl" color="whiteAlpha.600" fontWeight={"bold"}>
          SECS
        </Text>
      </Flex>
      {/*  <Text fontSize='xl' color="white">{renderCountdown()}</Text> */}
    </Flex>
  );
};

export default CountdownClock;
