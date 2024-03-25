import { Dispatch, store } from "@/store/store";
import { Fade, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LandingFeaturedEventRsvpButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  return (
    <Fade
      style={{ zIndex: 1000 }}
      in={!isUnloading}
      transition={{
        enter: {
          duration: 0.5,
          delay: 1.35,
        },
        exit: {
          duration: 0.35,
          delay: 0.1,
        },
      }}
    >
      <Text
        cursor={"pointer"}
        onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + latestEvent?.id)])}
        position={"relative"}
        textAlign={"end"}
        zIndex={200}
        textTransform={"uppercase"}
        color="heds.100"
        lineHeight={{ base: "50px", lg: "30px" }}
        fontFamily="hanken"
        fontWeight={{ base: 300, lg: 300 }}
        fontSize={{ base: "20px", lg: "30px" }}
      >
        RSVP <Text ml={1} mb={"-0.5px"} as="i" className="fal fa-arrow-right" />
      </Text>
    </Fade>
  );
};

export default LandingFeaturedEventRsvpButton;
