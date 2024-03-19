import { Dispatch, store } from "@/store/store";
import { Flex, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayNameInputText from "../DisplayNameInputText/DisplayNameInputText";
import AddDisplayNameButton from "../AddDisplayNameButton/AddDisplayNameButton";

const DisplayNameInput = () => {
  const dispatch = useDispatch<Dispatch>();
  const isVerifying = useSelector(store?.select.userModel.selectIsVerifying);
  const firstName = useSelector(store?.select.userModel.selectFirstName);
  const lastName = useSelector(store?.select.userModel.selectLastName);
  return (
    <Stack justifyContent={"space-between"} minH={{ base: "38vh", lg: "40vh" }} py={4} px={3} mb={5}>

        <>
          <DisplayNameInputText />
          <Stack mt={5} mb={8} gap={4}>
            <Input
              value={firstName}
              onChange={(e) => {
                if (e.target.value.length === 0) dispatch.userModel.setFirstName("");
                if (e.target.value.length > 17) return;
                if (/^[A-Za-z]+$/.test(e.target.value)) {
                  dispatch.userModel.setFirstName(e.target.value);
                }
              }}
              max={17}
              _placeholder={{ color: "heds.600" }}
              placeholder="First Name"
              color={"heds.200"}
              border="1px solid"
              borderColor={"heds.500"}
              _hover={{ border: "1px solid", borderColor: "heds.300", outline: "none", boxShadow: "none" }}
              _focus={{ border: "1px solid", borderColor: "heds.300", outline: "none", boxShadow: "none" }}
            />
            <Input
              value={lastName}
              max={17}
              onChange={(e) => {
                if (e.target.value.length === 0) dispatch.userModel.setLastName("");
                if (e.target.value.length > 17) return;
                if (/^[A-Za-z]+$/.test(e.target.value)) {
                  dispatch.userModel.setLastName(e.target.value);
                }
              }}
              _placeholder={{ color: "heds.600" }}
              placeholder="Last Name"
              color={"heds.200"}
              border="1px solid"
              borderColor={"heds.500"}
              _hover={{ border: "1px solid", borderColor: "heds.300", outline: "none", boxShadow: "none" }}
              _focus={{ border: "1px solid", borderColor: "heds.300", outline: "none", boxShadow: "none" }}
            />
          </Stack>
          <AddDisplayNameButton />
        </>

    </Stack>
  );
};

export default DisplayNameInput;
