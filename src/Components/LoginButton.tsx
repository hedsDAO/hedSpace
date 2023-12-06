import { Box, Button } from "@chakra-ui/react";
const LoginButton = () => {
  return (
    <Box mr={{ base: "0px", lg: "4px" }}>
      <Button
        size={{ base: "xs", lg: "xl" }}
        fontSize={{ base: "xs", lg: "sm" }}
        fontFamily='"space-grotesk", sans-serif'
        bg="white"
        px={4}
        py={1}
        letterSpacing="wider"
        variant="outline"
      >
        LOGIN / SIGNUP
      </Button>
    </Box>
  );
};

export default LoginButton;
