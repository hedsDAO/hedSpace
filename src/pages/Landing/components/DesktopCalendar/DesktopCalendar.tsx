import { Grid, Box } from "@chakra-ui/react";
import { PLACEHOLDER_IMAGE } from "@/store/constants";
import { useSize } from "@chakra-ui/react-use-size";
import { useEffect, useRef } from "react";

const DesktopCalendar = ({ children }: { children: React.ReactNode }) => {
  const elementRef = useRef(null);
  const dimensions = useSize(elementRef);

  useEffect(() => {
    if (dimensions && dimensions.height > 0) {
      console.log("dimensions", dimensions);
    }
  }, []);

  return (
    <Box position="relative" width="95vw">
      <Box
        rounded='3xl'
        position="absolute"
        top="0"
        left="0"
        width={dimensions && dimensions.width > 0 ? dimensions.width : "100%"}
        height={dimensions && dimensions.height > 0 ? dimensions.height : "100%"}
        zIndex="0"
        bgImage={`url(${PLACEHOLDER_IMAGE})`}
        bgSize="cover"
        style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,100))", maskSize: "cover" }}
      ></Box>
      <Grid
        ref={elementRef}
        position="relative"
        zIndex="10"
        // bg="whiteAlpha.300"
        display={{ base: "none", lg: "grid" }}
        width="100%"
        height="100%"
        gap={2}
        p={2.5}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(7, 1fr)"
      >
        {children}
      </Grid>
    </Box>
  );
};

export default DesktopCalendar;
