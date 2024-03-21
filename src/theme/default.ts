import { extendTheme, position } from "@chakra-ui/react";
export const defaultTheme = extendTheme({
  colors: {
    heds: {
      yellow: "#f3cf6e",
      blue: "#209fd5",
      green: "#1ec258",
      red: "#d03e25",
      100: "#f5f4f5",
      200: "#cac4ce",
      300: "#aaa1ad",
      400: "#8a7d8c",
      500: "#675a68",
      600: "#433743",
      700: "#161214",
      800: "#0B0A0A",
      900: "#000000",
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
        background: "linear-gradient(190deg, rgba(22,18,20,1) 0%, rgba(0,0,0,1) 100%)",
        overscrollBehavior: "none !important",
      },
      '.chakra-input[type="search"]::-webkit-search-cancel-button': {
        display: "none",
      },
      "input:-webkit-autofill": {
        transition: "all 5000s ease-in-out 0s",
      },
      "input:-webkit-autofill:hover": {
        transition: "all 5000s ease-in-out 0s",
      },
      "input:-webkit-autofill:focus": {
        transition: "all 5000s ease-in-out 0s",
      },
      "input:-webkit-autofill:active": {
        transition: "all 5000s ease-in-out 0s",
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
      ".selector": {
        color: "transparent !important",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        MsUserSelect: "none",
        OUserSelect: "none",
        userSelect: "none",
        "&:focus": {
          outline: "none",
        },
      },
    }),
  },
});
