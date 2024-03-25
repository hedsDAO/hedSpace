import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Container, Stack } from "@chakra-ui/react";
import LandingFeaturedEventVideo from "@/pages/Landing/components/LandingFeaturedEventVideo/LandingFeaturedEventVideo";
import LandingFeaturedHeadingText from "@/pages/Landing/components/LandingFeaturedHeadingText/LandingFeaturedHeadingText";
import LandingFeaturedEventDetails from "@/pages/Landing/components/LandingFeaturedEventDetails/LandingFeaturedEventDetails";
import LandingFeaturedEventRsvpButton from "@/pages/Landing/components/LandingFeaturedEventRsvpButton/LandingFeaturedEventRsvpButton";
import LandingPastEventsHeader from "@/pages/Landing/components/LandingPastEventsHeader/LandingPastEventsHeader";
import LandingPastEvents from "@/pages/Landing/components/LandingPastEvents/LandingPastEvents";
import * as styles from "@/pages/Landing/styles";

const Landing = () => {
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (!latestEvent) dispatch.landingModel.getEvents();
  }, []);

  return (
    <Container {...styles.$containerStyles}>
      <LandingFeaturedEventVideo />
      <Stack {...styles.$stackStyles}>
        <LandingFeaturedHeadingText />
        <LandingFeaturedEventDetails />
        <LandingFeaturedEventRsvpButton />
      </Stack>
      <LandingPastEventsHeader />
      <LandingPastEvents />
    </Container>
  );
};

export default Landing;
