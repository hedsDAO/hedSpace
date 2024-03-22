import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { Box, Container, Fade, Flex, Skeleton, SlideFade, Spinner, Stack, Text, useBoolean } from "@chakra-ui/react";
import LandingHedsText from "./components/LandingHedsText/LandingHedsText";
import LandingLatestEvent from "./components/LandingLatestEvent/LandingLatestEvent";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoLoaded, setHasVideoLoaded] = useBoolean();
  const latestEvent = useSelector(store.select.landingModel.selectLatestEvent);
  const dispatch = useDispatch<Dispatch>();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);

  useEffect(() => {
    if (!latestEvent) dispatch.landingModel.getEvents();
  }, []);

  return (
    <Container px={0} minW="100vw">
      <Stack>
        <Fade
          onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate("/event/" + latestEvent?.id)])}
          in={!isUnloading}
          transition={{
            enter: {
              duration: 0.5,
              delay: 0.25,
            },
            exit: {
              duration: 0.35,
              delay: 0.1,
            },
          }}
        >
          <SlideFade
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
              opacity={"0.25"}
              position={"absolute"}
              aspectRatio={1}
              objectFit={"cover"}
              minW="100%"
              maxH={{ base: "400px", lg: "720px" }}
              onPlay={() => setHasVideoLoaded.on()}
              as="video"
              ref={videoRef}
              autoPlay
              src={latestEvent?.video}
              muted
              playsInline
              loop
            />
          </SlideFade>
          <Stack minH={{ base: "400px", lg: "720px" }} justifyContent={"space-between"} py={{ base: 5, lg: 8 }} px={{ base: 5, lg: 10 }}>
            <Stack>
              {" "}
              <Text
                mixBlendMode={"difference"}
                position={"relative"}
                zIndex={200}
                color="heds.100"
                lineHeight={{ base: "40px", lg: "180px" }}
                fontFamily="Helvetica"
                fontWeight={{ base: 500, lg: 500 }}
                fontSize={{ base: "40px", lg: "190px" }}
              >
                UP <br /> NEXT
              </Text>
              <Text
                pl={{ lg: 3 }}
                mixBlendMode={"difference"}
                position={"relative"}
                zIndex={200}
                color="heds.200"
                lineHeight={{ base: "30px", lg: "60px" }}
                fontFamily="hanken"
                fontWeight={{ base: 100, lg: 100 }}
                fontSize={{ base: "20px", lg: "40px" }}
              >
                AT THE HEDSTORE
              </Text>
            </Stack>
            <Stack>
              <Text
                mixBlendMode={"difference"}
                position={"relative"}
                textAlign={"end"}
                zIndex={200}
                textTransform={"uppercase"}
                color="heds.300"
                lineHeight={{ base: "20px", lg: "50px" }}
                fontFamily="hanken"
                fontWeight={{ base: 300, lg: 300 }}
                fontSize={{ base: "30px", lg: "50px" }}
              >
                {latestEvent?.startTime ? DateTime.fromMillis(latestEvent?.startTime).toFormat("D").replaceAll("/", ".") : ""}
              </Text>
              <Text
                mixBlendMode={"difference"}
                position={"relative"}
                textAlign={"end"}
                zIndex={200}
                textTransform={"uppercase"}
                color="heds.100"
                lineHeight={{ base: "50px", lg: "100px" }}
                fontFamily="hanken"
                fontWeight={{ base: 600, lg: 600 }}
                fontSize={{ base: "30px", lg: "100px" }}
              >
                {latestEvent?.name}
              </Text>
            </Stack>
          </Stack>
        </Fade>
      </Stack>
      {/* <Stack px={4} alignItems={"center"} justifyContent={"center"} maxW="8xl" mx="auto" gap={2} minH={{ base: "82vh", lg: "92vh" }}>
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
            <Stack px={{ base: 4, lg: 0 }} minW="100vw" alignItems={"center"}>
              <Flex alignItems={{ base: "start", lg: "center" }} gap={10} direction={{ base: "column", lg: "row" }}>
                <Box
                  aspectRatio={1}
                  objectFit={"cover"}
                  rounded={"10%"}
                  maxW={{ base: "100%", lg: "300px" }}
                  onPlay={() => setHasVideoLoaded.on()}
                  as="video"
                  ref={videoRef}
                  autoPlay
                  src={latestEvent?.video}
                  muted
                  playsInline
                  loop
                />
                <LandingLatestEvent />
              </Flex>
            </Stack>
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
      </Stack> */}
    </Container>
  );
};

export default Landing;
