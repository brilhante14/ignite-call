import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {
   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

   const isDateSelected = !!selectedDate;

   return (
      <Container isTimePickerOpen={isDateSelected}>
         <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
         {isDateSelected && (
            <TimePicker>
               <TimePickerHeader>
                  Terça Feira
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