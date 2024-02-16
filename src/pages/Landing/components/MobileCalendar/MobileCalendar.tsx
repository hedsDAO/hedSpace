import { useRef } from "react";
import { useSelector } from "react-redux";
import { EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { store } from "@/store/store";
import { Box } from "@chakra-ui/react";
import MobileCalendarItem from "@/pages/Landing/components/MobileCalendarItem/MobileCalendarItem";
import "swiper/css/effect-creative";
import "swiper/css";

const MobileCalendar = () => {
  const swiperRef = useRef<any>(null);
  const calendar = useSelector(store.select.landingModel.selectCalendar);

  return (
    <Box display={{ base: "inline", lg: "none" }} mt={2} w="full" maxH="65vh" minW="91.5vw" mx="auto" borderRadius="lg">
      <Swiper
        slidesPerView={1}
        navigation
        modules={[EffectCreative]}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Step 2: Assign the Swiper instance to the ref
        onSlideChange={() => {}}
      >
        {calendar?.map((calendarItem) => {
          if (calendarItem?.data?.event)
            return (
              <SwiperSlide key={calendarItem.day}>
                <MobileCalendarItem calendarItem={calendarItem} />
              </SwiperSlide>
            );
        })}
      </Swiper>
    </Box>
  );
};

export default MobileCalendar;
