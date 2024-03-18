import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import SendVerificationCodeStep from "@/components/modals/RSVPModal/components/SendVerificationCodeStep/SendVerificationCodeStep";
import ValidateVerificationCode from "@/components/modals/RSVPModal/components/ValidateVerificationCodeStep/ValidateVerificationCodeStep";
import UserEventRSVPStatus from "@/components/modals/RSVPModal/components/UserEventRSVPStatus/UserEventRSVPStatus";
import SetUserDisplayName from "@/components/modals/RSVPModal/components/SetUserDisplayName/SetUserDisplayName";
import LoadingScreen from "@/components/modals/RSVPModal/components/LoadingScreen/LoadingScreen";

const RSVPModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.rsvpModel.selectEvent);
  const didSendSMS = useSelector(store.select.rsvpModel.selectDidSendSMS);
  const hasDisplayName = useSelector(store.select.rsvpModel.selectHasDisplayName);
  const userData = useSelector(store.select.rsvpModel.selectUser);
  const rsvp = useSelector(store.select.rsvpModel.selectRSVP);
  const isLoading = useSelector(store.select.rsvpModel.selectIsLoading);

  return (
    <>
      <Modal
        autoFocus={false}
        isCentered
        size={{ base: "sm", lg: "2xl" }}
        allowPinchZoom={false}
        isOpen={!!event}
        onClose={() => dispatch.rsvpModel.setEvent(null)}
      >
        <ModalOverlay bg="whiteAlpha.600" />
        <ModalContent mx={{ base: 2, lg: 0 }} bg="black" rounded={"3xl"}>
          <ModalHeader color="white">RSVP</ModalHeader>
          <ModalCloseButton color="white" />
          {isLoading ? <LoadingScreen /> : <></>}
          {!isLoading && !userData && !didSendSMS ? <SendVerificationCodeStep /> : <></>}
          {!isLoading && !userData && didSendSMS ? <ValidateVerificationCode /> : <></>}
          {!isLoading && !!userData && !hasDisplayName ? <SetUserDisplayName /> : <></>}
          {!isLoading && rsvp && hasDisplayName ? <UserEventRSVPStatus /> : <></>}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RSVPModal;
