import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import PhoneNumberInput from "./components/PhoneNumberInput/PhoneNumberInput";
import VerificationNumberInput from "./components/VerificationNumberInput/VericationNumberInput";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { useEffect, useRef } from "react";
import UserDrawer from "../UserDrawer/UserDrawer";

const RSVPModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isVerifying = useSelector(store.select.userModel.selectIsVerifying);
  const userData = useSelector(store.select.userModel.selectUser);

  useEffect(() => {
    if (isMobile) {
      inputRef.current?.focus();
    }
    return () => {
      dispatch.userModel.closeAndReset();
    };
  }, []);

  useEffect(() => {
    if (userData?.id) onClose();
  }, [userData]);

  return (
    <Flex ml="auto" mr={{ base: 3, lg: 1 }}>
      {userData ? (
        <Flex alignItems={"center"} gap={2} mr={{ base: 4, lg: 3 }}>
          <Button
            pl={{ base: 3, lg: 4 }}
            pr={{ base: 3, lg: 3.5 }}
            py={{ lg: 3 }}
            size="xs"
            fontSize="xs"
            bg="transparent"
            rounded="100"
            border="1px solid"
            _hover={{ bg: "transparent", color: "whiteAlpha.800", borderColor: "whiteAlpha.900" }}
            color="whiteAlpha.700"
            fontWeight={"normal"}
            letterSpacing={"widest"}
            fontFamily={"Helvetica"}
            onClick={() => dispatch.userModel.setIsUserDrawerOpen(true)}
          >
            <Text mr={{ base: "-1.5px", lg: 0 }} as="i" textAlign={"center"} fontSize={{ base: "xs", lg: "base" }} className="fas fa-user" />
          </Button>
          <UserDrawer />
        </Flex>
      ) : (
        <Button
          h="unset"
          minH="unset"
          letterSpacing={"widest"}
          fontWeight={"medium"}
          fontFamily={"Helvetica"}
          fontSize="13px"
          color="heds.300"
          bg="transparent"
          _hover={{ bg: "transparent", color: "heds.100" }}
          onClick={onOpen}
        >
          login
        </Button>
      )}
      <Modal motionPreset={"slideInTop"} isCentered size={{ base: "md", lg: "lg" }} autoFocus={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient="linear(to-l, heds.600, heds.700)" />
        <ModalContent
          bg="transparent"
          border="2px solid"
          borderColor={"black"}
          rounded={"3xl"}
          bgGradient="linear(to-l, heds.800, heds.900)"
          mx={{ base: 2, lg: 4 }}
        >
          <ModalCloseButton fontSize={"xs"} size={"md"} color="heds.600" _hover={{ color: "heds.300" }} />
          <ModalBody gap={0} as={Stack}>
            <Stack gap={0} justifyContent={"center"} px={{ base: 1, lg: 1 }} minW="100%">
              {!isVerifying ? <PhoneNumberInput /> : <VerificationNumberInput />}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default RSVPModal;
