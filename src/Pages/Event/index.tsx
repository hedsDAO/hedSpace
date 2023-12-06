import {
  Box,
  SimpleGrid,
  GridItem,
  Stack,
  Flex,
  Image,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log("URL Search Params: ", Array.from(query.entries()));

    const successMessage = query.get("success");
    const canceledMessage = query.get("canceled");

    if (successMessage) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (canceledMessage) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  console.log("Message: ", message);

  return (
    <Box
      position="relative"
      overflowY={{ base: "hidden", lg: "hidden" }}
      // top={{ base: "12%", lg: "10%" }}
      // left={{ base: "2.5%", lg: "0" }}
      // right={{ base: "5%", lg: "0" }}
      // minW={{ base: "95%", lg: "95%" }}
      mt={{ base: 52, lg: 28 }}
      // height={{ base: "auto", lg: "auto" }}
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }}>
        <GridItem
          colSpan={1}
          display="flex"
          justifyContent={{ base: "center", lg: "flex-end" }}
          alignItems={{ base: "center", lg: "normal" }}
          boxSize={{ base: "100%", lg: "800px" }}
        >
          <Image
            src="https://www.heds.cloud/ipfs/QmW9KRsc8LZNUAJG59ZHxqZcGPppSn1LzSC3qoZEJtPaoT"
            borderRadius="12px"
            h={{ base: "400px", lg: "780px" }}
            w={{ base: "300px", lg: "600px" }}
            // zIndex={100}
          />
        </GridItem>
        <GridItem colSpan={1} ml={{ base: 0, lg: 20 }}>
          <Box maxHeight="80vh" overflowY={{ lg: "auto" }} maxW="100vw">
            <Stack mr={{ base: 0, lg: 20 }}>
              <Flex
                direction="column"
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="16px"
                p={{ base: 2, lg: 4 }}
                alignItems="center"
                mt={{ base: 4, lg: 0 }}
              >
                <Text
                  fontSize={{ base: "2xl", lg: "6xl" }}
                  fontFamily="space-grotesque"
                  textColor="white"
                >
                  {" "}
                  hedStore Grand Opening{" "}
                </Text>
                <Text
                  textColor="#D7CCD0"
                  fontFamily="space-grotesque"
                  fontSize={{ base: "small", lg: "large" }}
                >
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque in at nisi voluptatum repellendus iure beatae a, illum
                  hic tempore consequatur consectetur corrupti ut? Dignissimos
                  at repudiandae maiores nulla ipsam.
                </Text>
              </Flex>

              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="16px"
                justifyContent={{ base: "center", lg: "flex-start" }}
                alignItems="center"
                mt={2}
                p={{ base: 2, lg: 4 }}
              >
                <Avatar size={"large"} boxSize="32px" />
                <Flex
                  direction={{ base: "row", lg: "column" }}
                  alignItems="center"
                  mx={4}
                >
                  <Text
                    fontSize="md"
                    fontFamily="space-grotesque"
                    textColor="#D9CCCE"
                    mr={{ base: 2, lg: 0 }}
                  >
                    {" "}
                    Hosted by{" "}
                  </Text>
                  <Text
                    fontSize="xl"
                    fontFamily="space-grotesque"
                    textColor="white"
                  >
                    {" "}
                    heds{" "}
                  </Text>
                </Flex>
              </Flex>

              <Flex
                direction={{ base: "column", lg: "row" }}
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="16px"
                alignItems="center"
                justifyContent="space-between"
                mt={{ base: 2, lg: 16 }}
              >
                <Flex
                  ml={{ base: 0, lg: 4 }}
                  mt={{ base: 4, lg: 0 }}
                  alignItems="center"
                >
                  <Text
                    fontSize="md"
                    fontFamily="space-grotesque"
                    textColor="white"
                    mx={0.5}
                  >
                    {" "}
                    10
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="space-grotesque"
                    textColor="#C09999"
                    mx={0.5}
                  >
                    {" "}
                    DAYS
                  </Text>
                  <Text
                    fontSize="md"
                    fontFamily="space-grotesque"
                    textColor="white"
                    mx={0.5}
                  >
                    {" "}
                    5
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="space-grotesque"
                    textColor="#C09999"
                    mx={0.5}
                  >
                    {" "}
                    HOURS
                  </Text>
                  <Text
                    fontSize="md"
                    fontFamily="space-grotesque"
                    textColor="white"
                    mx={0.5}
                  >
                    {" "}
                    12
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="space-grotesque"
                    textColor="#C09999"
                    mx={0.5}
                  >
                    {" "}
                    MINUTES
                  </Text>
                  <Text
                    fontSize="md"
                    fontFamily="space-grotesque"
                    textColor="white"
                    mx={0.5}
                  >
                    {" "}
                    57
                  </Text>
                  <Text
                    fontSize="sm"
                    fontFamily="space-grotesque"
                    textColor="#C09999"
                    mx={0.5}
                  >
                    {" "}
                    SECONDS
                  </Text>
                </Flex>
                <Button
                  w={{ base: "80%", lg: "40%" }}
                  h={{ base: "42px", lg: "34px" }}
                  mx={{ base: 0, lg: 4 }}
                  my={{ base: 4, lg: 2 }}
                  borderRadius="16px"
                  bg="#D9CCCE"
                  textColor="black"
                  fontFamily="space-grotesque"
                  fontSize="md"
                >
                  {" "}
                  Login to RSVP{" "}
                </Button>
              </Flex>

              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="16px"
                alignItems="center"
                justifyContent={{ base: "space-around", lg: "space-between" }}
                mt={2}
                px={4}
                py={2}
              >
                <Text
                  fontSize={{ base: "md", lg: "2xl" }}
                  fontFamily="space-grotesque"
                  textColor="white"
                >
                  {" "}
                  WHEN{" "}
                </Text>
                <Text
                  fontSize={{ base: "sm", lg: "lg" }}
                  fontFamily="space-grotesque"
                  textColor="white"
                >
                  {" "}
                  Jan 19th 2024, 7:00PM PST{" "}
                </Text>
              </Flex>

              <Flex
                bg="rgba(0, 0, 0, 0.5)"
                borderRadius="16px"
                alignItems="center"
                justifyContent={{ base: "space-around", lg: "space-between" }}
                mt={2}
                px={4}
                py={2}
              >
                <Text
                  fontSize={{ base: "md", lg: "2xl" }}
                  fontFamily="space-grotesque"
                  textColor="white"
                >
                  {" "}
                  WHERE{" "}
                </Text>
                <Text
                  fontSize={{ base: "xs", lg: "lg" }}
                  fontFamily="space-grotesque"
                  textColor="white"
                >
                  {" "}
                  7515 Melrose Ave, Los Angeles CA 90040{" "}
                </Text>
              </Flex>
              <form
                action="https://stripe-v6adscuyxq-uc.a.run.app/create-checkout-session"
                method="POST"
              >
                <Button
                  w={{ base: "80%", lg: "40%" }}
                  h={{ base: "42px", lg: "34px" }}
                  mx={{ base: 0, lg: 4 }}
                  my={{ base: 4, lg: 2 }}
                  borderRadius="16px"
                  bg="#D9CCCE"
                  textColor="black"
                  fontFamily="space-grotesque"
                  fontSize="md"
                  type="submit"
                >
                  {" "}
                  Buy
                </Button>
              </form>
            </Stack>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Event;
