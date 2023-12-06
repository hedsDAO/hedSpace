import { useNavigate } from "react-router-dom";
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
import HedLogo from "../../public/heddot.webp";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      position="fixed"
      justifyContent={{ base: "space-between", lg: "space-between" }}
      alignItems="center"
      top={0}
      left={0}
      color="white"
      width="100%"
      //
      p={4}
      bg="rgba(0, 0, 0, 0.5)"
    >
      <Flex alignItems="center" ml={{ base: "0" }} gap={0}>
        <Button
          type="button"
          onClick={() => navigate("/")}
          variant="transparent"
        >
          <Image
            src={HedLogo}
            alt="heds logo"
            height="auto"
            boxSize={{ base: "40px", md: "40px", lg: "52px" }}
          />
        </Button>
        <Text
          cursor="default"
          fontSize={{ base: "xl", lg: "3xl" }}
          fontFamily='"space-grotesk", sans-serif'
          textColor="#B9B9B9"
        >
          heds
        </Text>
        <Text
          cursor="default"
          fontSize={{ base: "2xl", lg: "5xl" }}
          fontFamily='"space-grotesk", sans-serif'
        >
          EVENTS
        </Text>
      </Flex>
      <LoginButton />
    </Stack>
  );
};

export default Navbar;
