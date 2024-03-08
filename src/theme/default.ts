import { extendTheme, position } from "@chakra-ui/react";
export const defaultTheme = extendTheme({
  colors: {
    heds: {
      nuBlack: "black",
      white50: "#ffffff",
      white100: "#f0f0f0",
      white200: "#e1e1e1",
    },
  },
  fonts: {
    space: "'Space Mono', sans-serif",
    inter: "'Inter', sans-serif",
    karla: "'Karla', sans-serif",
    poppins: "'Poppins', sans-serif",
    open: "'Open Sans Variable', sans-serif",
    lora: "'Lora Variable', serif",
    domine: "'Domine Variable', sans-serif",
  },
  styles: {
    global: (props: any) => ({
      ":root": {
        "--swiper-pagination-color": "#1c1c1c",
        "--swiper-pagination-bullet-border-radius": "0px",
        "--swiper-pagination-bullet-size": "8px",
        "--swiper-pagination-bullet-width": "8px",
        "--swiper-pagination-bullet-height": "8px",
        "--swiper-pagination-bullet-inactive-color": "#000",
        "--swiper-pagination-bullet-inactive-opacity": 0.2,
        "--swiper-pagination-bullet-opacity": 1,
        "--swiper-pagination-bullet-horizontal-gap": "4px",
        "--swiper-pagination-bullet-vertical-gap": "6px",
      },
      "html, body": {
        height: "100%",
        minHeight: "100vh",
        minWidth: "100vw",
        overflowX: "hidden",
        bg: "black",
        overscrollBehavior: "none !important",
      },
      '.chakra-input[type="search"]::-webkit-search-cancel-button': {
        display: "none",
      },
      ".highlight": {
        ".ais-Highlight-highlighted": {
          backgroundColor: "heds.bg3",
          color: "white",
          fontStyle: "normal",
        },
      },
      "video::-webkit-media-controls": {
        position: "absolute !important",
        top: "-9999px",
      },
    }),
  },
});
