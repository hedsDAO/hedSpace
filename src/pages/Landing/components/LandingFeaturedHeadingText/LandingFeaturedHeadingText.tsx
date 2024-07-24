import { store } from "@/store/store";
import { Fade, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as styles from "./styles";
import * as constants from "./constants";

const LandingFeaturedHeadingText = () => {
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  return (
    <Stack>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS}>
        <Text {...styles.$textStyles}>{!latestEvent ? constants.HEADING_1 : ""}</Text>
      </Fade>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS}>
        <Text {...styles.$textStyles}>{!latestEvent ? constants.HEADING_1 : ""}</Text>
      </Fade>
    </Stack>
  );
};

export default LandingFeaturedHeadingText;
