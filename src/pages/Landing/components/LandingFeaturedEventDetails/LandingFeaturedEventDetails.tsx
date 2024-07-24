import { store } from "@/store/store";
import { Fade, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as styles from "./styles";
import * as constants from "./constants";

const LandingFeaturedEventDetails = () => {
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);

  return (
    <Stack mt={{ base: !latestEvent ? 0 : "60px", lg: !latestEvent ? 0 : "420px" }}>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS_1}>
        <Text mt={{ base: !latestEvent ? 0 : "240px" }} t {...styles.$textStyles1}>
          {constants.handleDateDetails(latestEvent)}
        </Text>
      </Fade>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS_2}>
        <Text {...styles.$textStyles2}>{latestEvent?.name}</Text>
      </Fade>
    </Stack>
  );
};

export default LandingFeaturedEventDetails;
