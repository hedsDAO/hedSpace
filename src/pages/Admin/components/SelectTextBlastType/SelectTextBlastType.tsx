import { AdminStep } from "@/models/admin";
import { Dispatch } from "@/store/store";
import { Button, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const SelectTextBlastType = () => {
  const dispatch = useDispatch<Dispatch>();

  return (
    <Flex gap={4}>
      <Button
        onClick={() => dispatch.adminModel.setAdminStep(AdminStep.TEXT_BLAST_FOR_EVENT)}
        fontFamily={"hanken"}
        fontWeight={300}
        bg="transparent"
        rounded="sm"
        border="0.5px solid"
        borderColor="heds.yellow"
        color="heds.yellow"
        _hover={{ bg: "heds.yellow", color: "heds.900" }}
      >
        Text Blast for Event
      </Button>
      <Button
        onClick={() => dispatch.adminModel.setAdminStep(AdminStep.TEXT_BLAST_FOR_ALL)}
        fontFamily={"hanken"}
        fontWeight={300}
        bg="transparent"
        rounded="sm"
        border="0.5px solid"
        borderColor="heds.green"
        color="heds.green"
        _hover={{ bg: "heds.green", color: "heds.900" }}
      >
        Text Blast for All
      </Button>
    </Flex>
  );
};

export default SelectTextBlastType;