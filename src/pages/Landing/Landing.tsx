import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Container, Stack } from "@chakra-ui/react";
import LandingHedsText from "./components/LandingHedsText/LandingHedsText";
import LandingLatestEvent from "./components/LandingLatestEvent/LandingLatestEvent";

const Landing = () => {
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (!latestEvent) dispatch.landingModel.getEvents();
  }, []);
  return (
    <Container minW="100vw">
      <Stack px={4} justifyContent={"center"} alignItems={"start"} maxW="8xl" mx="auto" gap={0} minH={{ base: "87vh", lg: "96.5vh" }}>
        <LandingHedsText />
        <LandingLatestEvent />
      </Stack>
    </Container>
  );
};

export default Landing;
