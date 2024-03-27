import React, { ChangeEvent, useState } from "react";
import { Box, Button, Divider, Image, Stack, Text, Textarea, useBoolean } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { AdminStep } from "@/models/admin";

const SelectMessageAndSubmit = () => {
  const dispatch = useDispatch<Dispatch>();
  const selectedEvent = useSelector(store.select.adminModel.selectSelectedEvent);
  const message = useSelector(store.select.adminModel.selectMessage);
  const adminStep = useSelector(store.select.adminModel.selectAdminStep);
  const [isVerifying, setIsVerifying] = useBoolean();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch.adminModel.setMessage(e.target.value);
  };

  return (
    <Stack px={{ base: 10, lg: 0 }} minW={{ base: "80%", lg: "30%" }} spacing={4}>
      {!isVerifying ? (
        <>
          {selectedEvent && (
            <Text color="heds.300" fontWeight="semibold" fontFamily={"hanken"} textTransform={"uppercase"}>
              Sending message for:{" "}
              <Text as="span" color="heds.100">
                {" "}
                {selectedEvent.name}
              </Text>
            </Text>
          )}
          <Textarea
            noOfLines={10}
            whiteSpace={"pre-line"}
            color="white"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => handleInputChange(e)}
            size="sm"
          />
          <Button colorScheme="blue" onClick={setIsVerifying.toggle} isDisabled={!message.trim().length}>
            Preview and Submit
          </Button>
        </>
      ) : (
        <Stack gap={5}>
          <Text fontFamily={"hanken"} fontWeight={800} color="heds.100" fontSize={{ base: "2xl", lg: "3xl" }}>
            {adminStep === AdminStep.TEXT_BLAST_FOR_ALL ? "TEXT BLAST TO ALL" : `EVENT TEXT BLAST`}
          </Text>
          {selectedEvent && (
            <Stack>
              <Image src={selectedEvent.image} boxSize="100px" />
              <Text fontWeight={400} fontFamily={"hanken"} textTransform={"uppercase"} fontSize={"2xs"} color="heds.300">
                {selectedEvent.name}
              </Text>
              <Text fontFamily={"hanken"} fontWeight={800} color="heds.200" fontSize={"xl"}>
                {selectedEvent?.eventRsvps?.length} Recipients
              </Text>
            </Stack>
          )}
          <Stack gap={3}>
            <Text color="heds.300" fontWeight="semibold" fontFamily={"hanken"} textTransform={"uppercase"}>
              Message Preview:
            </Text>
            <Box rounded="2xl" px={5} py={3} bg="heds.blue">
              <Text whiteSpace={"pre-line"} color="white">
                {message}
              </Text>
            </Box>
          </Stack>
          <Button
            onClick={() => {
              if (adminStep === AdminStep.TEXT_BLAST_FOR_EVENT && selectedEvent?.id) {
                dispatch.adminModel.sendTextToAllForEvent([selectedEvent.id, message]);
              }
            }}
            border="1px solid"
            color="heds.100"
            borderColor="heds.green"
            mt={5}
            bg="heds.green"
            rounded="full"
            _hover={{ bg: "transparent", color: "heds.green", borderColor: "heds.green" }}
          >
            <Text fontFamily={"hanken"} fontWeight={500}>
              Confirm & Send Blast
            </Text>
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default SelectMessageAndSubmit;
