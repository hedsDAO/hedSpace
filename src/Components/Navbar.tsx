import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import HedLogo from "../../public/heddot.png";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      position="fixed"
      justifyContent="space-between"
      alignItems="center"
      top={0}
      left={0}
      zIndex={100}
      color="white"
      width="100%"
      p={4}
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Flex alignItems="center" ml={{ base: "0" }}>
        <Button type="button">
          <Image
            src={HedLogo}
            alt="heds logo"
            height="auto"
            boxSize={{ base: "32px", md: "40px", lg: "52px" }}
          />
        </Button>
        <Text
          cursor="default"
          fontSize={{ base: "md", lg: "2xl" }}
          fontFamily="space-mono"
          textColor="#B9B9B9"
        >
          heds
        </Text>
        <Text
          cursor="default"
          fontSize={{ base: "lg", lg: "3xl" }}
          fontFamily="space-mono"
        >
          EVENTS
        </Text>
      </Flex>
      <LoginButton />
    </Stack>
  );
};

export default Navbar;
