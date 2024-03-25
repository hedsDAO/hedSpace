import { store } from "@/store/store";
import { Fade, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import * as constants from "./constants";
import * as styles from "./styles";

const LandingPastEventsHeader = () => {
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  return (
    <Fade style={{ zIndex: 1000 }} in={!isUnloading} transition={constants.FADE_TRANSITIONS}>
      <Flex {...styles.$flexStyles}>
        <Text {...styles.$textStyles}>{constants.PAST_EVENTS_TEXT}</Text>
        <Text {...styles.$arrowStyles} />
      </Flex>
    </Fade>
  );
};

export default LandingPastEventsHeader;
