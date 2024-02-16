import { DesktopCalendarItemProps } from "@/store/types";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { SwiperSlide } from "swiper/react";
import RSVPModal from "@/components/modals/RSVPModal/RSVPModal";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch } from "react-redux";
import { Dispatch } from "@/store/store";

const MobileCalendarItem = ({ calendarItem }: { calendarItem: DesktopCalendarItemProps }) => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <SwiperSlide key={calendarItem.day}>
      <Flex
        onClick={() => dispatch.rsvpModel.setEvent(calendarItem?.data?.event)}
        bg="black"
        mixBlendMode={"difference"}
        justifyContent="center"
      >
        <Text
          fontFamily={"karla"}
          fontWeight={"bold"}
          left={9}
          top={3}
          zIndex={100}
          position={"absolute"}
          color="black"
        >
          {calendarItem.month} / {calendarItem.day}
        </Text>
        <Box
          autoPlay
          playsInline
          loop
          muted
          as={"video"}
          rounded="2xl"
          maxW={"90%"}
          objectFit={"contain"}
          aspectRatio={1}
          src={calendarItem?.data?.event?.video}
        />
      </Flex>
      <Stack pt={3} bg="black" gap={1} px={6}>
        <Text fontSize={"sm"} color="whiteAlpha.800">
          {calendarItem?.data?.event?.name}
        </Text>
        <Text fontSize={"xs"} color="whiteAlpha.600">
          {calendarItem?.data?.event?.description}
        </Text>
        <RSVPModal />
      </Stack>
    </SwiperSlide>
  );
};

export default MobileCalendarItem;
