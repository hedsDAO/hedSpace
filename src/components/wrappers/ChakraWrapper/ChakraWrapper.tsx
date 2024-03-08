import { ChakraProvider } from "@chakra-ui/provider";
import { defaultTheme } from "@/theme/default";

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider theme={defaultTheme}>{children}</ChakraProvider>;
};

export default ChakraWrapper;
