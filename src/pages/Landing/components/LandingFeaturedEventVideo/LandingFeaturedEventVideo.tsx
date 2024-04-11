import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch, store } from "@/store/store";
import { Box, Fade, useBoolean } from "@chakra-ui/react";
import * as constants from "./constants";
import * as styles from "./styles";

const LandingFeaturedEventVideo = () => {
  const navigate = useNavigate();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoLoaded, setHasVideoLoaded] = useBoolean();
  return (
    <Fade
      onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + latestEvent?.name)])}
      in={hasVideoLoaded && !isUnloading}
      style={{ zIndex: 2000 }}
      transition={constants.FADE_TRANSITIONS}
    >
      <Box {...styles.$boxStyles} as={constants.AS_VIDEO} ref={videoRef} autoPlay onPlay={setHasVideoLoaded.on} src={latestEvent?.video} muted playsInline loop />
    </Fade>
  );
};

export default LandingFeaturedEventVideo;
