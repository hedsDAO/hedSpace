import { Box, Button } from "@chakra-ui/react";
const LoginButton = () => {
  return (
    <Box mr={{ base: "52px", lg: "4px" }}>
      <Button
        size={{ base: "sm", lg: "md" }}
        fontSize={{ base: "xs", lg: "sm" }}
        fontFamily="space-grotesque"
        background="#1F1F1F"
        px={4}
        py={1}
        letterSpacing="wider"
      >
        LOGIN / SIGNUP
      </Button>
    </Box>
  );
};

export default LoginButton;
