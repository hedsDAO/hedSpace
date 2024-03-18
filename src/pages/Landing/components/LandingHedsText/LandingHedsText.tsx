import { store } from "@/store/store";
import { Fade, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LandingHedsText = () => {
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);
  const [isFading, setIsFading] = useState(false);
  useEffect(() => {
    if (!isFading) {
      setIsFading(true);
    }
    return () => {
      setIsFading(false);
    };
  }, []);
  return (
    <Stack gap={0}>
      <Fade in={!isUnloading && isFading} transition={{ enter: { delay: 0.35 } }}>
        <Text
          color="white"
          fontWeight={"medium"}
          lineHeight={{ base: "40px", lg: "60px" }}
          fontSize={{ base: "3xl", lg: "5xl" }}
        >
          we are heds.
        </Text>
      </Fade>
      <Fade in={!isUnloading && isFading} transition={{ enter: { delay: 1.5 } }}>
        <Text
          color="whiteAlpha.700"
          fontWeight={"medium"}
          lineHeight={{ base: "40px", lg: "60px" }}
          fontSize={{ base: "3xl", lg: "5xl" }}
        >
          we are a music-technology brand + company.
        </Text>
      </Fade>
    </Stack>
  );
};

export default LandingHedsText;
