import { Dispatch, store } from "@/store/store";
import { isEventOver } from "@/store/utils";
import { Box, Fade, Flex, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as styles from "./styles";
import * as constants from "./constants";

const LandingPastEvents = () => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const [hasVideoLoaded, setHasVideoLoaded] = useBoolean();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const allEvents = useSelector(store.select.landingModel.selectEvents);
  return (
    <Stack>
      {allEvents
        ?.sort((a, b) => b.endTime - a.endTime)
        ?.map((event, index) => {
          if (isEventOver(event))
            return (
              <Flex key={event?.id} {...styles.$videoStyle} onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + event.name.replace(/ /g,'-'))])}>
                <Fade style={{ zIndex: 1000 }} in={hasVideoLoaded && !isUnloading} transition={constants.FADE_TRANSITIONS_UTIL(index)}>
                  <Box {...styles.$boxStyles} as={constants.AS_VIDEO} onPlay={setHasVideoLoaded.on} autoPlay src={event?.video} muted playsInline loop />
                  <Text {...styles.$textStyles}>{event.name}</Text>
                </Fade>
              </Flex>
            );
        })}
    </Stack>
  );
};

export default LandingPastEvents;
