import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box
      position="fixed"
      zIndex={100}
      top="20%"
      left="20%"
      right="20%"
      color="white"
      borderRadius={16}
      p={4}
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Stack direction="row">
        <Image
          src="https://www.heds.cloud/ipfs/QmXztcYBANafrL6jMaegFtPNk16qTHeqHhheNASUhv5t3F"
          boxSize="424px"
          borderRadius={16}
        />
        <Stack ml={8}>
          <Stack gap={1} maxWidth="380px">
            <Text fontSize="4xl" fontFamily="space-grotesque">
              {" "}
              hedStore Grand Opening{" "}
            </Text>
            <Text textColor="#D7CCD0" fontFamily="space-grotesque">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque in
              at nisi voluptatum repellendus iure beatae a, illum hic tempore
              consequatur consectetur corrupti ut? Dignissimos at repudiandae
              maiores nulla ipsam.
            </Text>
          </Stack>
          <Stack pt={4} gap={0}>
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text fontSize="xl" fontFamily="space-grotesque">
                {" "}
                Where{" "}
              </Text>
              <Text textColor="#D9CCCE">
                {" "}
                7515 Melrose Avenue, Los Angeles, CA 90040{" "}
              </Text>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Text fontSize="xl" fontFamily="space-grotesque">
                {" "}
                When{" "}
              </Text>
              <Text ml={1} textColor="#D9CCCE">
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
              marginTop="30px"
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
