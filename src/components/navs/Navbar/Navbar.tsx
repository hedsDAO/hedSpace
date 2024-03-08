import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch, store } from "@/store/store";
import { Button, Fade, Flex, Image, Text } from "@chakra-ui/react";
import * as constants from "./constants";
import IMAGES from "@/images";
import LoginModal from "@/components/modals/LoginModal/LoginModal";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const isUnloading = useSelector(store.select.globalModel.selectIsUnloading);

  return (
    <Flex bg="black" gap={{ base: 5, lg: 6 }} alignItems={"center"} minW="100vw" py={"10px"} pl={6} pb={2}>
      <Image
        pointerEvents={"auto"}
        cursor={"pointer"}
        onClick={() =>
          dispatch.globalModel.handleUnload([isUnloading, () => window?.location?.replace("https://heds.world")])
        }
        objectFit={"contain"}
        boxSize={{ base: "1.75rem", lg: "1.9rem" }}
        src={IMAGES.logo}
      />
      {constants.NavLinks?.map((navLink: constants.NavLink, index: number) => {
        const active = pathname === navLink.path;
        if (navLink.external)
          return (
            <Fade
              key={navLink.id}
              style={{ display: "flex" }}
              in={true && !isUnloading}
              transition={{ enter: { delay: (index + 1) / 10 }, exit: { delay: (index + 1) / 10 } }}
            >
              <Text
                _hover={{ color: "whiteAlpha.900" }}
                transition={"0.25s all ease-in-out"}
                as={"a"}
                href={navLink.path}
                target={"_blank"}
                fontWeight={"semibold"}
                fontSize={{ base: "xs", lg: "sm" }}
                fontFamily={"karla"}
                color={active ? "whiteAlpha.900" : "whiteAlpha.600"}
              >
                {navLink.name}
              </Text>
            </Fade>
          );
        else
          return (
            <Fade
              key={navLink.id}
              style={{ display: "flex" }}
              in={true && !isUnloading}
              transition={{ enter: { delay: (index + 1) / 10 }, exit: { delay: (index + 1) / 10 } }}
            >
              <Text
                _hover={{ color: "whiteAlpha.900" }}
                transition={"0.25s all ease-in-out"}
                cursor={"pointer"}
                pointerEvents={"auto"}
                onClick={() => dispatch.globalModel.handleUnload([isUnloading, () => navigate(navLink.path)])}
                fontWeight={"semibold"}
                fontSize={{ base: "sm", lg: "sm" }}
                fontFamily={"karla"}
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
