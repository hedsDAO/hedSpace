import { ModalBody, Spinner, Stack } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <ModalBody as={Stack} alignItems={"center"} justifyContent={"center"} minH="200px" minW="50%">
      <Spinner mt={-10} color="white" />
    </ModalBody>
  );
};

export default LoadingScreen;
