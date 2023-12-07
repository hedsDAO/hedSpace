import { useNavigate } from "react-router-dom";
import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import LoginButton from "./LoginButton";
//@ts-ignore
import HedLogo from "../../public/heddot.webp";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      position="fixed"
      justifyContent="center"
      alignItems="center"
      top={0}
      left={0}
      color="white"
      width="100%"
      //
      py={3}
      bg="rgba(0, 0, 0, 0.6)"
    >
      <Flex minW="full" justifyContent={"space-between"} alignItems="center" ml={{ base: "0" }} gap={2}>
        <Button type="button" onClick={() => navigate("/")} variant="transparent">
          <Image src={HedLogo} alt="heds logo" height="auto" boxSize={{ base: "30px", md: "30px", lg: "40px" }} />
        </Button>
        <Flex pr={{base:5, lg: 4}} alignItems={"baseline"}>
          <Text
            cursor="default"
            fontSize={{ base: "lg", lg: "2xl" }}
            fontFamily='"space-grotesk", sans-serif'
            textColor="#B9B9B9"
          >
            heds
          </Text>
          <Text cursor="default" ml={1} fontSize={{ base: "xl", lg: "3xl" }} fontFamily='"space-grotesk", sans-serif'>
            EVENTS
          </Text>
        </Flex>
      </Flex>
      {/* <LoginButton /> */}
    </Stack>
  );
};

export default Navbar;
