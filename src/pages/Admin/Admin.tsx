import { AdminStep } from "@/models/admin";
import { Dispatch, store } from "@/store/store";
import { Button, Flex, GridItem, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectTextBlastType from "./components/SelectTextBlastType/SelectTextBlastType";
import SelectEvent from "./components/SelectEvent/SelectEvent";
import SelectMessageAndSubmit from "./components/SelectMessageAndSubmit/SelectMessageAndSubmit";

const Admin = () => {
  const dispatch = useDispatch<Dispatch>();
  const events = useSelector(store.select.adminModel.selectEvents);
  const adminStep = useSelector(store.select.adminModel.selectAdminStep);
  const selectedEvent = useSelector(store.select.adminModel.selectSelectedEvent);

  useEffect(() => {
    if (!events) {
      dispatch.adminModel.getAllEvents();
    }
    return () => {
      dispatch.adminModel.clearState();
    };
  }, []);

  return (
    <Stack alignItems={"center"} justifyContent={"center"} minW="100vw" minH="90vh" bg="heds.700">
      {adminStep === null && <SelectTextBlastType />}
      {adminStep === AdminStep.TEXT_BLAST_FOR_EVENT && selectedEvent === null && <SelectEvent />}
      {adminStep === AdminStep.TEXT_BLAST_FOR_ALL && <SelectMessageAndSubmit />}
      {adminStep === AdminStep.TEXT_BLAST_FOR_EVENT && selectedEvent?.eventRsvps?.length && <SelectMessageAndSubmit />}
    </Stack>
  );
};

export default Admin;
