import { TextProps } from "@chakra-ui/react";

export const $textStyles1: TextProps = {
  mixBlendMode: "difference",
  position: "relative",
  textAlign: "end",
  zIndex: 200,
  textTransform: "uppercase",
  color: "heds.200",
  lineHeight: { base: "10px", lg: "50px" },
  fontFamily: "hanken",
  fontWeight: { base: 300, lg: 300 },
  fontSize: { base: "25px", lg: "50px" },
};

export const $textStyles2: TextProps = {
  position: "relative",
  textAlign: "end",
  zIndex: 200,
  textTransform: "uppercase",
  color: "heds.200",
  lineHeight: { base: "50px", lg: "100px" },
  fontFamily: "hanken",
  fontWeight: { base: 600, lg: 600 },
  fontSize: { base: "30px", lg: "100px" },
};
