import CheckMarkAnimation from "@/components/animations/Checkmark/Checkmark";
import { Dispatch, store } from "@/store/store";
import { Stack, Button, Flex, Text, Fade, useBoolean, Box } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddRsvpButton = ({
  isRsvping,
  setIsRsvping,
}: {
  isRsvping: boolean;
  setIsRsvping: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}) => {
  const dispatch = useDispatch<Dispatch>();
  const event = useSelector(store.select.userModel.selectEvent);
  const userData = useSelector(store.select.userModel.selectUser);
  const isLoading = useSelector(store.select.userModel.selectIsLoading);

  const handleRsvpAnimation = (userId: number, eventId: number) => {
    setIsRsvping.on();
    setTimeout(() => {
      dispatch.userModel.addRSVP([userId, eventId]);
    }, 1500);
  };

  useEffect(() => {

    return () => {
      setIsRsvping.off();
    };
  }, []);
  return (
    <Stack>
      <Fade unmountOnExit in={isRsvping}>
        <Stack minH={{ base: "38vh", lg: "40vh" }} maxW="100%" alignItems={"center"} justifyContent={"center"}>
          <Box mt={10} maxW="150px">
            <CheckMarkAnimation />
          </Box>
          <Fade
            transition={{
              enter: { delay: 0.5, duration: 0.75 },
              exit: {
                delay: 0.5,
                duration: 0.4,
              },
            }}
            in={isRsvping}
            unmountOnExit
          >
            <Text textAlign={'center'} fontFamily={"open"} fontWeight={"bold"} textTransform={"uppercase"} fontSize="md" color="heds.green">
              your rsvp is confirmed
            </Text>
          </Fade>
        </Stack>
      </Fade>
      <Fade in={!isRsvping}>
        <Button
          isLoading={isLoading}
          onClick={() => {
            if (userData?.id && event?.id) {
              handleRsvpAnimation(userData.id, event.id);
            }
          }}
          isDisabled={!userData?.id || !userData?.displayName?.length || !event?.id || isLoading}
          _disabled={{ bg: "heds.700", opacity: 0.4, borderColor: "whiteAlpha.300" }}
          size={"md"}
          rounded="3xl"
          bg="heds.800"
          color="heds.green"
          _hover={!userData?.id || !userData?.displayName?.length || !event?.id ? {} : { bg: "heds.green", borderColor: "heds.green", color: "heds.100" }}
          border="1.5px solid"
          borderColor="heds.green"
          fontWeight={"bold"}
          fontFamily={"Helvetica"}
          fontSize={"sm"}

          minW="100%"
        >
          RSVP
        </Button>
        <Flex maxW={{ base: "100%", lg: "80%" }} mx="auto" mt={3}>
          <Text fontWeight={"medium"} fontFamily={"inter"} opacity={0.6} textAlign={"center"} fontSize={{ base: "2xs", lg: "xs" }} color="heds.500">
            Your RSVP will be saved on your account and will be used for entry.
          </Text>
        </Flex>
      </Fade>
    </Stack>
  );
};

export default AddRsvpButton;
