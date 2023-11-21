import { Box, Button } from "@chakra-ui/react";
const LoginButton = () => {
  return (
    <Box mr={{ base: "2px", lg: "4px" }}>
      <Button
        size={{ base: "sm", lg: "md" }}
        fontSize={{ base: "sm", lg: "md" }}
        fontFamily="space-mono"
        background="#1F1F1F"
        px={4}
        py={1}
      >
        Login/Signup
      </Button>
    </Box>
  );
};

export default LoginButton;
