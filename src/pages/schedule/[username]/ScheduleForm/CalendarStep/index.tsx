import { Calendar } from "@/components/Calendar";
import dayjs from "dayjs";
import { useState } from "react";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   const isDateSelected = !!selectedDate;

   const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
   const describeDate = selectedDate ? dayjs(selectedDate).format("DD[ de ]MMMM") : null;

   return (
      <Container isTimePickerOpen={isDateSelected}>
         <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
         {isDateSelected && (
            <TimePicker>
               <TimePickerHeader>
                  {weekDay} <span>{describeDate}</span>
               </TimePickerHeader>
               <TimePickerList>
                  <TimePickerItem>
                     08:00
                  </TimePickerItem>
               </TimePickerList>
            </TimePicker>
         )}
      </Container>
   );
}