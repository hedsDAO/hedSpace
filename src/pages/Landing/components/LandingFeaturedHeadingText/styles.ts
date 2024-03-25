import { TextProps } from "@chakra-ui/react";

export const $textStyles: TextProps = {
  mixBlendMode: "difference",
  position: "relative",
  zIndex: 200,
  color: "transparent",
  style: {
    WebkitTextStrokeWidth: "1.5px",
    WebkitTextStrokeColor: "white",
  },
  lineHeight: { base: "35px", lg: "200px" },
  fontFamily: "Helvetica",
  letterSpacing: "tight",
  fontSize: { base: "35px", lg: "200px" },
};
