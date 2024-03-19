import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { store } from "@/store/store";
import { Box, Flex } from "@chakra-ui/react";
import MobileCalendarItem from "@/pages/Landing/components/MobileCalendarItem/MobileCalendarItem";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css";

const MobileCalendar = () => {
  const swiperRef = useRef<any>(null);
  const sortedCalendar = useSelector(store.select.landingModel.selectSortedCalendar);
  const [calendarLength, setCalendarLength] = useState(0);

  useEffect(() => {
    if (sortedCalendar && sortedCalendar.length === 0) {
      setCalendarLength(sortedCalendar?.length);
    }
  }, [sortedCalendar]);
  return (
    <Box
      display={{ base: "inline", lg: "none" }}
      mt={2}
      w="full"
      minH="100vh"
      minW="91.5vw"
      mx="auto"
      borderRadius="lg"
    >
      <Swiper
        slidesPerView={1}
        navigation
        modules={[EffectCreative, Pagination]}
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
        pagination={{ clickable: true, type: "bullets" }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Step 2: Assign the Swiper instance to the ref
        onSlideChange={() => {}}
      >
        {sortedCalendar?.map((calendarItem) => {
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
