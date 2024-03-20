import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Box, Container, Fade, Skeleton, Stack, useBoolean } from "@chakra-ui/react";
import LandingHedsText from "./components/LandingHedsText/LandingHedsText";
import LandingLatestEvent from "./components/LandingLatestEvent/LandingLatestEvent";

const Landing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoLoaded, setHasVideoLoaded] = useBoolean();
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  useEffect(() => {
    if (!latestEvent) dispatch.landingModel.getEvents();
  }, []);

  useEffect(() => {
    console.log(hasVideoLoaded);
  }, [hasVideoLoaded]);

  return (
    <Container minW="100vw">
      <Stack px={4} py={{ base: 5, lg: 10 }} alignItems={"center"} justifyContent={"center"} maxW="8xl" mx="auto" gap={2} minH={{ base: "82vh", lg: "92vh" }}>
        {latestEvent ? (
          <Fade
            style={{ zIndex: 1000 }}
            in={hasVideoLoaded && !isUnloading}
            transition={{
              enter: {
                duration: 0.5,
                delay: 0.5,
              },
              exit: {
                duration: 0.35,
                delay: 0.1,
              },
            }}
          >
            <Box
              aspectRatio={1}
              objectFit={"cover"}
              maxW={{ base: "100%", lg: "20vw" }}
              onPlay={() => setHasVideoLoaded.on()}
              as="video"
              ref={videoRef}
              autoPlay
              src={latestEvent?.video}
              muted
              playsInline
              loop
            />
          </Fade>
        ) : (
          <></>
        )}
        <Fade
          transition={{
            enter: {
              duration: 0.5,
              delay: 0.5,
            },
            exit: {
              duration: 0.35,
              delay: 0.1,
            },
          }}
          in={!isUnloading && hasVideoLoaded}
        >
          <Box
            position="absolute"
            top={20}
            bottom={0}
            right={0}
            left={0}
            backgroundImage={`url(${latestEvent?.image})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundPosition="center center"
            filter="blur(15px)"
            opacity={0.1}
            zIndex="0"
          />
        </Fade>
        <LandingLatestEvent />
      </Stack>
    </Container>
  );
};

export default Landing;
