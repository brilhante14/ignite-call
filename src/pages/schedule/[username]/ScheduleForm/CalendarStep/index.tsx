import { Calendar } from "@/components/Calendar";
import { api } from "@/lib/axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

interface IAvailability {
   availableHours: number[];
   possibleHours: number[];
}

export function CalendarStep() {
   const router = useRouter();
   const username = String(router.query.username);

   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   const [availability, setAvailability] = useState<IAvailability | null>(null);

   const isDateSelected = !!selectedDate;

   const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
   const describeDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;

   useEffect(() => {
      (async () => {
         if (!selectedDate) {
            return;
         }

         const { data } = await api.get(`/users/${username}/availability`, {
            params: {
               date: dayjs(selectedDate).format("YYYY-MM-DD"),
            },
         });

         setAvailability({
            availableHours: data.availableHours,
            possibleHours: data.possibleHours,
         });

      })()
   }, [selectedDate, username]);

   function isHourDisabled(possibleHour: number) {
      return !availability?.availableHours.includes(possibleHour);
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
                     <TimePickerItem disabled={isHourDisabled(hour)} key={hour}>
                        {String(hour).padStart(2, "0")}:00h
                     </TimePickerItem>
                  ))}
               </TimePickerList>
            </TimePicker>
         )}
      </Container>
   );
}