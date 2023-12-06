import { useNavigate } from "react-router-dom";
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
  Stack,
  Text,
  useBreakpointValue,
  useCheckbox,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

const LandingPage = (props: any) => {
  const naviagte = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  const [phoneNumber, setPhoneNumber] = useState("");
  const maxHeight = useBreakpointValue({ base: "35vh", lg: "55vh" });

  const [fullName, setFullName] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(true);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };
  return (
    <>
      <Box
        position="fixed"
        maxWidth="900px"
        top={{ base: "10%", lg: "20%" }}
        left={{ base: "10%", lg: "20%" }}
        right={{ base: "10%", lg: "20%" }}
        color="white"
        borderRadius={16}
        p={4}
        mt={4}
        bg="rgba(0, 0, 0, 0.5)"
      >
        <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
          <video
            autoPlay
            muted
            loop
            playsInline
            typeof="video/quicktime"
            src="https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/flyers%2FclubLIWAG-FLYER-3.5.mov?alt=media&token=7bc6a71b-c2c8-4556-8008-199249869d3c"
            style={{ maxHeight }}
          />
          <Stack ml={{ base: 0, lg: 8 }}>
            <Stack
              gap={1}
              maxWidth="320px"
              maxHeight={maxHeight}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Stack
                flexDir="row"
                justifyContent="center"
                alignItems="baseline"
                gap={0}
              >
                <Text
                  fontSize={{ base: "xl", lg: "6xl" }}
                  fontFamily='"space-grotesk", sans-serif'
                  letterSpacing={3}
                >
                  {" "}
                  club{" "}
                </Text>
                <Text
                  fontSize={{ base: "2xl", lg: "8xl" }}
                  fontFamily='"space-grotesk", sans-serif'
                  letterSpacing={3}
                >
                  {" "}
                  LIWAG{" "}
                </Text>
              </Stack>
              <Text
                textColor="#D7CCD0"
                fontFamily='"space-grotesk", sans-serif'
                fontSize={{ base: "sm", lg: "large" }}
                minW={{ base: "100%", lg: "500px" }}
                fontWeight="bold"
              >
                {" "}
                ATTN: LOS ANGELES! Live and direct from the new @heds.app space
                on December 20, we proudly announce an audiovisual
                show/experience by @johnliwag x @clubaction
              </Text>
            </Stack>
            <Stack
              pt={{ base: 0, lg: 4 }}
              gap={0}
              alignItems={{ base: "center", lg: "flex-start" }}
            >
              <Stack direction="row" alignItems="center" justifyContent="start">
                <Text
                  fontSize={{ base: "lg", lg: "xl" }}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  Where{" "}
                </Text>
                <Text
                  fontFamily='"space-grotesk", sans-serif'
                  textColor="#D9CCCE"
                  fontSize={{ base: "xs", lg: "medium" }}
                >
                  {" "}
                  7515 Melrose Ave, Los Angeles{" "}
                </Text>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="start">
                <Text
                  fontSize={{ base: "lg", lg: "xl" }}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  When{" "}
                </Text>
                <Text
                  ml={1}
                  textColor="#D9CCCE"
                  fontSize={{ base: "xs", lg: "medium" }}
                  fontFamily='"space-grotesk", sans-serif'
                >
                  {" "}
                  Dec 20th 2023, 7:00PM PST{" "}
                </Text>
              </Stack>
              <Button
                alignItems="center"
                fontFamily='"space-grotesk", sans-serif'
                justifyContent="center"
                textColor="#000000"
                bgColor="#CECFCF"
                borderRadius={12}
                height="28px"
                width="96px"
                marginTop={{ base: "8px", lg: "30px" }}
                onClick={onOpen}
              >
                RSVP
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
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
                placeholder="222-222-222"
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
              {...htmlProps}
            >
              <Text color="gray.700" {...getLabelProps()}>
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
            <Button onClick={onClose}>Close</Button>
            <Button onClick={handleRSVP}>RSVP</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LandingPage;
