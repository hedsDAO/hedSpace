import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch, store } from "@/store/store";
import { Button, Fade, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import * as constants from "./constants";
import IMAGES from "@/images";
import LoginModal from "@/components/modals/LoginModal/LoginModal";

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);

  return (
    <Flex gap={{ base: 5, lg: 6 }} alignItems={"center"} minW="100vw" py={{ base: 4, lg: "14px" }} pl={7} pb={4}>
      {/* <Image
        pointerEvents={"auto"}
        cursor={"pointer"}
        onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => window?.location?.replace("https://heds.world")])}
        objectFit={"contain"}
        boxSize={{ base: "2.1rem", lg: "1.9rem" }}
        src={IMAGES.logo}
      /> */}
      {constants.NavLinks?.map((navLink: constants.NavLink, index: number) => {
        const active = pathname === navLink.path;
        return (
          <Fade
            key={navLink.id}
            style={{ display: "flex" }}
            in={true && !isUnloading}
            transition={{ enter: { delay: (index + 1) / 10 }, exit: { delay: (index + 1) / 10 } }}
          >
            {/* {isMobile ? (
              <Text
                color={active ? "heds.200" : "heds.600"}
                as="i"
                fontSize={"14px"}
                className={navLink.icon}
                onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate(navLink.path)])}
              />
            ) : ( */}
              <Text
                _hover={{ color: "whiteAlpha.900" }}
                transition={"0.25s all ease-in-out"}
                cursor={"pointer"}
                textTransform={'uppercase'}
                pointerEvents={"auto"}
                onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate(navLink.path)])}
                fontWeight={600}
                letterSpacing={'wide'}
                fontSize={{ base: "xs", lg: "xs" }}
                fontFamily={"hanken"}
                color={active ? "whiteAlpha.900" : "whiteAlpha.600"}
              >
                {navLink.name}
              </Text>
            
          </Fade>
        );
      })}
      <LoginModal />
    </Flex>
  );
};

export default Navbar;
