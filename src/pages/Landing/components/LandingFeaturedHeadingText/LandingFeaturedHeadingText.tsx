import { store } from "@/store/store";
import { Fade, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as styles from "./styles";
import * as constants from "./constants";

const LandingFeaturedHeadingText = () => {
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  return (
    <Stack>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS}>
        <Text {...styles.$textStyles}>{constants.HEADING_1}</Text>
      </Fade>
      <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS}>
        <Text {...styles.$textStyles}>{constants.HEADING_2}</Text>
      </Fade>
    </Stack>
  );
};

export default LandingFeaturedHeadingText;
