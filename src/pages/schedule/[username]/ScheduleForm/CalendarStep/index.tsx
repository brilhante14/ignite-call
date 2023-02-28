import { Calendar } from "@/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {
   const isDateSelected = true;

   return (
      <Container isTimePickerOpen={isDateSelected}>
         <Calendar />
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