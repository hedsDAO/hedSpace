import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

import UserDrawer from "../UserDrawer/UserDrawer";
import DisplayNameInput from "./components/DisplayNameInput/DisplayNameInput";
import EventRsvpForm from "./components/EventRsvpForm/EventRsvpForm";
import PhoneNumberInput from "./components/PhoneNumberInput/PhoneNumberInput";
import VerificationNumberInput from "./components/VerificationNumberInput/VericationNumberInput";

const LoginModal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const dispatch = useDispatch<Dispatch>();
  const isUserModalOpen = useSelector(store.select.userModel.selectIsUserModalOpen);
  const isVerifying = useSelector(store.select.userModel.selectIsVerifying);
  const userData = useSelector(store.select.userModel.selectUser);
  const isMissingDisplayName = useSelector(store.select.userModel.selectIsMissingDisplayName);
  const isRsvping = useSelector(store.select.userModel.selectIsRsvping);
  const event = useSelector(store.select.userModel.selectEvent);

  useEffect(() => {
    if (userData?.id && !isMissingDisplayName && !isRsvping && !event?.id) {
      dispatch.userModel.closeAndReset();
    }
    if (isRsvping) {
      const doesUserHaveAnExistingRsvp = userData?.eventRsvps?.filter((rsvp) => rsvp.eventId === event?.id);
      if (doesUserHaveAnExistingRsvp?.length) {
        dispatch.userModel.closeAndReset();
      }
    }
  }, [userData]);

  return (
    <Flex ml="auto" mr={{ base: 3, lg: 1 }}>
      {userData ? (
        <Flex alignItems={"center"} gap={2} mr={{ base: 2, lg: 3 }}>
          <Button
            pl={{ base: 3.5, lg: 4 }}
            pr={{ base: 3.5, lg: 3.5 }}
            py={{ lg: 3 }}
            size="xs"
            fontSize="xs"
            bg="transparent"
            rounded="sm"
            // border={{ base: "0.75px solid", lg: "1px solid" }}
            _hover={{ bg: "transparent", color: "whiteAlpha.800", borderColor: "whiteAlpha.900" }}
            color="whiteAlpha.700"
            fontWeight={"normal"}
            letterSpacing={"widest"}
            fontFamily={"Helvetica"}
            onClick={() => dispatch.userModel.setIsUserDrawerOpen(true)}
          >
            <Text mr={{ base: "-1.5px", lg: 0 }} as="i" textAlign={"center"} fontSize={{ base: "2xs", lg: "base" }} className="fas fa-user" />
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
          fontSize={{ base: "12px", lg: "13px" }}
          color="heds.300"
          bg="transparent"
          _hover={{ bg: "transparent", color: "heds.100" }}
          onClick={() => dispatch.userModel.setIsUserModalOpen(true)}
        >
          login
        </Button>
      )}
      <Modal
        motionPreset={"slideInTop"}
        isCentered
        size={{ base: "md", lg: "lg" }}
        autoFocus={false}
        isOpen={isUserModalOpen}
        onClose={isVerifying && !event ? () => {} : () => dispatch.userModel.closeAndReset()}
      >
        <ModalOverlay bgGradient="linear(to-l, heds.700, heds.900)" />
        <ModalContent bg="transparent" border="2px solid" borderColor={"heds.600"} rounded={"3xl"} bgGradient="linear(to-l, heds.800, heds.900)" mx={{ base: 2, lg: 4 }}>
          <ModalCloseButton fontSize={"xs"} size={"md"} color="heds.600" _hover={{ color: "heds.300" }} />
          <ModalBody gap={0} as={Stack}>
            <Stack gap={0} justifyContent={"center"} px={{ base: 1, lg: 1 }} minW="100%">
              {!isVerifying && !isMissingDisplayName && !userData?.id ? <PhoneNumberInput /> : <></>}
              {isVerifying && !isMissingDisplayName && !userData?.id ? <VerificationNumberInput /> : <></>}
              {isVerifying && isMissingDisplayName && userData?.id ? <DisplayNameInput /> : <></>}
              {isRsvping && event && userData?.id && !isMissingDisplayName ? <EventRsvpForm /> : <></>}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default LoginModal;
