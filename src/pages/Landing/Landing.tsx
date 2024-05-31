import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch, store } from "@/store/store";
import { Container, Stack } from "@chakra-ui/react";
import LandingFeaturedEventDetails from "@/pages/Landing/components/LandingFeaturedEventDetails/LandingFeaturedEventDetails";
import LandingFeaturedEventRsvpButton from "@/pages/Landing/components/LandingFeaturedEventRsvpButton/LandingFeaturedEventRsvpButton";
import LandingFeaturedEventVideo from "@/pages/Landing/components/LandingFeaturedEventVideo/LandingFeaturedEventVideo";
import LandingFeaturedHeadingText from "@/pages/Landing/components/LandingFeaturedHeadingText/LandingFeaturedHeadingText";
import LandingPastEvents from "@/pages/Landing/components/LandingPastEvents/LandingPastEvents";
import LandingPastEventsHeader from "@/pages/Landing/components/LandingPastEventsHeader/LandingPastEventsHeader";
import * as styles from "@/pages/Landing/styles";

const Landing = () => {
  const navigate = useNavigate();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (!latestEvent) dispatch.landingModel.getEvents();
  }, []);

  return (
    <Container {...styles.$containerStyles}>
      <LandingFeaturedEventVideo />
      <Stack onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + latestEvent?.name.replace(/ /g, "-"))])} {...styles.$stackStyles}>
        <LandingFeaturedHeadingText />
        <LandingFeaturedEventDetails />
        {latestEvent && <LandingFeaturedEventRsvpButton />}
      </Stack>
      <LandingPastEventsHeader />
      <LandingPastEvents />
    </Container>
  );
};

export default Landing;
