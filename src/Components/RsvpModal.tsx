import {
  chakra,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@/Store";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const rsvpModal = ({ isOpen, onClose, onOpen }: RsvpModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const disptach = useDispatch<Dispatch>();
  const isLoggedin = useSelector(
    (state: RootState) => state.userModel.isLoggedIn
  );
  const didSendSMS = useSelector(
    (state: RootState) => state.userModel.didSendSMS
  );
  const isError = useSelector((state: RootState) => state.userModel.error);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    // This will check if the name contains at least two words
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    setIsFullNameValid(nameRegex.test(event.target.value));
  };

  const handleRSVP = () => {
    // Check if the full name is valid before proceeding
    if (!isFullNameValid) {
      alert("Please no special characters.");
      return;
    }

    if (fullName.trim().split(/\s+/).length < 2) {
      alert("Please enter your first and last name.");
      return;
    }

    // Check if the phone number is valid before proceeding
    if (phoneNumber.length !== 12) {
      alert("Please enter a valid phone number.");
      return;
    }

    disptach.userModel.loginUser(preparePhoneNumberForSubmission(phoneNumber));
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const preparePhoneNumberForSubmission = (value: string) => {
    if (!value) return value;
    // Remove any dashes and non-digit characters
    const phoneNumber = value.replace(/[-\s]+/g, "");
    return `+1${phoneNumber}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(event.target.value);

    // This will check if the code is 6 digits
    const codeRegex = /^\d{6}$/;
    setIsCodeValid(codeRegex.test(event.target.value));
  };

  const handleBackToNameScreen = () => {
    disptach.userModel.setDidSendSMS(false);
  };
  const handleVerifyCode = () => {
    // Check if the code is valid before proceeding
    if (!isCodeValid) {
      alert("Please enter a valid code.");
      return;
    }

    if (isError) {
      setVerificationCode("");
      alert("You entered the wrong code. Please try again.");
      disptach.userModel.setDidSendSMS(false);
      return;
    }
    disptach.userModel.verifyUser({
      to: preparePhoneNumberForSubmission(phoneNumber),
      code: verificationCode,
      name: fullName,
    });
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="#C6C7C7">
        <ModalHeader textColor="black">Sign In or Sign Up</ModalHeader>
        <ModalCloseButton />
        {!isLoggedin && !didSendSMS && (
          <>
            <ModalBody>
              <Input
                variant="flushed"
                placeholder="Full Name"
                value={fullName}
                onChange={handleNameChange}
                isInvalid={!isFullNameValid}
                errorBorderColor="red.300"
                mb={4}
              />
              <InputGroup>
                <InputLeftAddon children="(US)+1 " />
                <Input
                  type="tel"
                  placeholder="222-222-2222"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </InputGroup>
              <chakra.label
                display="flex"
                flexDirection="row"
                alignItems="center"
                gridColumnGap={2}
                rounded="lg"
                px={3}
                py={1}
                cursor="pointer"
              >
                <Text color="black">
                  By clicking RSVP I Agree to the{" "}
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/terms%2FTerms%20of%20Service.pdf?alt=media&token=48183469-816f-4143-af75-ee3f38ce3842"
                    target="_blank"
                    style={{ color: "blue" }}
                  >
                    Terms and Conditions
                  </a>
                </Text>
              </chakra.label>
            </ModalBody>
            <ModalFooter
              alignItems="space-between"
              justifyContent="space-between"
            >
              <Button bg="white" textColor="black" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleRSVP}>RSVP</Button>
            </ModalFooter>
          </>
        )}

        {!isLoggedin && didSendSMS && (
          <>
            <ModalBody>
              <Input
                variant="flushed"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                isInvalid={!!isError || !isCodeValid}
                errorBorderColor="crimson"
                mb={4}
              />
            </ModalBody>
            <ModalFooter
              alignItems="space-between"
              justifyContent="space-between"
            >
              <Button onClick={handleBackToNameScreen}>Back</Button>
              <Button onClick={handleVerifyCode}>Submit</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default rsvpModal;
