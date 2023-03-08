import { Calendar } from "@/components/Calendar";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

interface IAvailability {
   availableHours: number[];
   possibleHours: number[];
}

interface ICalendarStepProps {
   handleSelectingDateTime: (date: Date) => void;
}

export function CalendarStep({ handleSelectingDateTime }: ICalendarStepProps) {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   const router = useRouter();
   const username = String(router.query.username);

   const selectedDateWithoutTimestamp = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null;
   const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
   const describeDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;

   const { data: availability } = useQuery<IAvailability>(
      ["availability", selectedDateWithoutTimestamp],
      async () => {
         const { data } = await api.get(`/users/${username}/availability`, {
            params: {
               date: selectedDateWithoutTimestamp,
            },
         });
         return data;
      },
      {
         enabled: !!selectedDate,
      },
   );

   const isDateSelected = !!selectedDate;

   function isHourDisabled(possibleHour: number) {
      return !availability?.availableHours.includes(possibleHour);
   }

   function handleSelectTime(hour: number) {
      const dateTime = dayjs(selectedDate)
         .set("hour", hour)
         .startOf("hour")
         .toDate();

      handleSelectingDateTime(dateTime);
   }

   return (
      <Container isTimePickerOpen={isDateSelected}>
         <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
         {isDateSelected && (
            <TimePicker>
               <TimePickerHeader>
                  {weekDay} <span>{describeDate}</span>
               </TimePickerHeader>
               <TimePickerList>
                  {availability?.possibleHours.map(hour => (
                     <TimePickerItem
                        disabled={isHourDisabled(hour)}
                        key={hour}
                        onClick={() => handleSelectTime(hour)}
                     >
                        {String(hour).padStart(2, "0")}:00h
                     </TimePickerItem>
                  ))}
               </TimePickerList>
            </TimePicker>
         )}
      </Container>
   );
}