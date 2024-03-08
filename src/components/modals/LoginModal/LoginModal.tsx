import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex ml="auto">
      <Button
        mr={3.5}
        px={4}
        size="xs"
        fontSize="xs"
        border="1px solid"
        rounded="none"
        borderColor="whiteAlpha.700"
        bg="transparent"
        _hover={{ bg: "transparent", color: "white", borderColor: "whiteAlpha.900" }}
        color="whiteAlpha.700"
        fontWeight={"semibold"}
        fontFamily={"Helvetica"}
        ml="auto"
        onClick={onOpen}
      >
        login
      </Button>
      <Modal isCentered size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="whiteAlpha.200" />
        <ModalContent mx={4} minH="50%" bg="black">
          <ModalHeader color="white">Login</ModalHeader>
          <ModalCloseButton size="md" color="white" />
          <ModalBody as={Stack} mt={10} color="white"></ModalBody>
          <ModalFooter color="white"></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LoginModal;
