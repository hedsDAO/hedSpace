import React, { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

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
    <Flex  gap={timeLeft.days ? 3 : 1}>
      <Flex gap={timeLeft.days ? 1.5 : 0} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="sm" color="white" fontWeight={"bold"}>
          {timeLeft.days || 0}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800" fontWeight={"light"}>
          {timeLeft.days ? "DAYS" : ""}
        </Text>
      </Flex>
      <Flex gap={timeLeft.days ? 1.5 : 0} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="sm" color="white" fontWeight={"bold"}>
          {timeLeft.hours}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800" fontWeight={"light"}>
          HRS
        </Text>
      </Flex>
      <Flex gap={timeLeft.days ? 1.5 : 0} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="sm" color="white" fontWeight={"bold"}>
          {timeLeft.minutes}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800" fontWeight={"light"}>
          MINS
        </Text>
      </Flex>
      <Flex gap={timeLeft.days ? 1.5 : 0} alignItems={"baseline"}>
        <Text textAlign={"end"} fontSize="sm" color="white" fontWeight={"bold"}>
          {timeLeft.seconds}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800" fontWeight={"light"}>
          SECS
        </Text>
      </Flex>
    </Flex>
  );
};

export default CountdownClock;
