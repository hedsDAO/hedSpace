import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, store } from "@/store/store";
import { DesktopCalendarItemProps } from "@/store/types";
import { Stack } from "@chakra-ui/react";
import DesktopCalendar from "@/pages/Landing/components/DesktopCalendar/DesktopCalendar";
import DesktopCalendarHeader from "@/pages/Landing/components/DesktopCalendarHeader/DesktopCalendarHeader";
import DesktopCalendarItem from "@/pages/Landing/components/DesktopCalendarItem/DesktopCalendarItem";

const Landing = () => {
  const dispatch = useDispatch<Dispatch>();
  const events = useSelector(store.select.landingModel.selectEvents);
  const calendar = useSelector(store.select.landingModel.selectCalendar);

  useEffect(() => {
    dispatch.landingModel.getEvents();
  }, []);

  return (
    <Stack pt={10} minH="100vh" minW="100vw" alignItems={"center"}>
      <DesktopCalendar>
        {/* <DesktopCalendarHeader /> */}
        {calendar?.length &&
          calendar?.map((calendarItem: DesktopCalendarItemProps, index: number) => (
            <DesktopCalendarItem key={index} calendarItem={calendarItem} />
          ))}
      </DesktopCalendar>
    </Stack>
  );
};

export default Landing;
