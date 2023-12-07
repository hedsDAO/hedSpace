import { Avatar, Flex, Text, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HedLogo from "../../public/heddot.webp";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <Flex
      direction="row"
      position="relative"
      justifyContent={{ base: "space-between", lg: "space-between" }}
      alignItems="center"
      color="white"
      width="100%"
      bg="rgba(0, 0, 0, 0.65)"
      py={{ base: 1.5, lg: 2 }}
      px={3}
    >
      {/* Temp Below */}
      <Flex gap={2} alignItems={"baseline"}>
        <Text
          ml={{ base: "0", lg: "8px" }}
          letterSpacing={"wide"}
          fontFamily={"space mono"}
          opacity={"60%"}
          fontWeight={100}
          fontSize={{ base: "xs", lg: "xs" }}
          color="white"
        >
          heds / 2023
        </Text>
      </Flex>
      <Flex>
        <Text fontSize='xs' opacity={'0.5'}>
          7515 Melrose Ave
        </Text>
      </Flex>
      {/* <Flex display={{ base: "flex", lg: "flex" }} ml={-1} gap={{ base: 2, lg: 4 }} alignItems={"center"}>
        <Avatar
          borderRadius={"none"}
          size="xs"
          src={HedLogo}
          aspectRatio={1}
          maxH={{ base: "20px", md: "25px", lg: "25px" }}
          minH={{ base: "20px", md: "25px", lg: "25px" }}
        /> */}
      {/* <Flex gap={2} alignItems={"baseline"}>
          <Text
            letterSpacing={"wide"}
            fontFamily={"space mono"}
            opacity={"80%"}
            fontWeight={100}
            fontSize={"md"}
            color="white"
          >
            heds
          </Text>
        </Flex> */}
      {/* </Flex> */}
      {/* <Flex
        justifyContent={"space-between"}
        fontFamily={"space mono"}
        minW={{ base: "full", lg: "auto" }}
        gap={6}
      >
        <Flex alignItems={"center"} gap={3}>
          <Text
            onClick={() => {
              if (window) window?.scrollTo(0, 0);
              navigate(`/faq`);
            }}
            letterSpacing={"widest"}
            opacity={"70%"}
            fontSize={"2xs"}
            color={"white"}
            _hover={{ cursor: "pointer" }}
          >
            FAQ
          </Text>
          <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            PRIVACY
          </Text>
          <Text letterSpacing={'widest'} opacity={'70%'} fontSize={'2xs'} color={'white'}>
            TERMS
          </Text>
        </Flex>
        <Flex
          fontSize={{ base: "sm", lg: "md" }}
          alignItems={"center"}
          gap={4}
          color="white"
          opacity={"70%"}
        >
          <a
            href="https://twitter.com/hedsDAO"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href="https://discord.gg/cc9wF23r"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-discord"></i>
          </a>
        </Flex> */}
      {/* </Flex> */}
    </Flex>
  );
};

export default Footer;
