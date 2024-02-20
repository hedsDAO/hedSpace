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
    <>
      <SwiperSlide key={calendarItem.day}>
        <Flex
          bg="black"
          py={5}
          onClick={() => dispatch.rsvpModel.setEvent(calendarItem?.data?.event)}
          mixBlendMode={"difference"}
          justifyContent="center"
        >
          <Text
            fontFamily={"karla"}
            fontSize={"xs"}
            fontWeight={"bold"}
            left={9}
            top={8}
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
      </SwiperSlide>
      <Stack bg="black" pt={6} mb={10} pb={6} gap={1} px={6}>
        <Text fontSize={"sm"} px={2} pb={"1.5px"} color="whiteAlpha.900">
          {calendarItem?.data?.event?.name}
        </Text>
        <Text py={1} fontSize={"xs"} px={2} color="whiteAlpha.900">
          {calendarItem?.data?.event?.description}
        </Text>
        <RSVPModal />
      </Stack>
    </>
  );
};

export default MobileCalendarItem;
