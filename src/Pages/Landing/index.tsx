import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box
      position="fixed"
      zIndex={100}
      top={{ base: "10%", lg: "20%" }}
      left={{ base: "10%", lg: "20%" }}
      right={{ base: "10%", lg: "20%" }}
      color="white"
      borderRadius={16}
      p={4}
      mt={4}
      bg="rgba(0, 0, 0, 0.5)"
      >
      <Stack direction={{ base: "column", lg: "row" }} alignItems="center">
        <Image
          src="https://www.heds.cloud/ipfs/QmXztcYBANafrL6jMaegFtPNk16qTHeqHhheNASUhv5t3F"
          boxSize={{ base: "212px", lg: "424px" }}
          borderRadius={16}
          // margin="8px"
        />
        <Stack ml={{ base: 0, lg: 8 }}>
          <Stack
            gap={1}
            maxWidth="380px"
            alignItems={{ base: "center", lg: "flex-start" }}
          >
            <Text
              fontSize={{ base: "xl", lg: "4xl" }}
              fontFamily="space-grotesque"
            >
              {" "}
              hedStore Grand Opening{" "}
            </Text>
            <Text
              textColor="#D7CCD0"
              fontFamily="space-grotesque"
              fontSize={{ base: "small", lg: "large" }}
            >
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque in
              at nisi voluptatum repellendus iure beatae a, illum hic tempore
              consequatur consectetur corrupti ut? Dignissimos at repudiandae
              maiores nulla ipsam.
            </Text>
          </Stack>
          <Stack
            pt={{ base: 0, lg: 4}}
            gap={0}
            alignItems={{ base: "center", lg: "flex-start" }}
          >
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                fontFamily="space-grotesque"
              >
                {" "}
                Where{" "}
              </Text>
              <Text
                textColor="#D9CCCE"
                fontSize={{ base: "xs", lg: "medium" }}
              >
                {" "}
                7515 Melrose Ave, Los Angeles{" "}
              </Text>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text
                fontSize={{ base: "lg", lg: "xl" }}
                fontFamily="space-grotesque"
              >
                {" "}
                When{" "}
              </Text>
              <Text
                ml={1}
                textColor="#D9CCCE"
                fontSize={{ base: "xs", lg: "medium" }}
              >
                {" "}
                Jan 12th 2024, 7:00PM PST{" "}
              </Text>
            </Stack>
            <Button
              alignItems="center"
              fontFamily="space-grotesque"
              justifyContent="center"
              textColor="#000000"
              bgColor="#B099A0"
              borderRadius={12}
              height="28px"
              width="96px"
              marginTop={{ base: "8px", lg: "30px" }}
            >
              RSVP
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingPage;
