import { getWeekDays } from "@/utils/get-week-days";
import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";

export function Calendar() {
   const [currentDate, setCurrentDate] = useState(() => {
      return dayjs().set('date', 1);
   });

   const currentMonth = currentDate.format("MMMM");
   const currentYear = currentDate.format("YYYY");

   const shortWeekDays = getWeekDays({ short: true });

   function handlePreviousMonth() {
      setCurrentDate(date => date.subtract(1, "month"));
   }

   function handleNextMonth() {
      setCurrentDate(date => date.add(1, "month"));
   }

   return (
      <CalendarContainer>
         <CalendarHeader>
            <CalendarTitle>{currentMonth} <span>{currentYear}</span></CalendarTitle>

            <CalendarActions>
               <button onClick={handlePreviousMonth} title="Mês anterior">
                  <CaretLeft />
               </button>

               <button onClick={handleNextMonth} title="Mês seguinte">
                  <CaretRight />
               </button>
            </CalendarActions>
         </CalendarHeader>

         <CalendarBody>
            <thead>
               <tr>
                  {shortWeekDays.map(weekDay => (
                     <th key={weekDay}>{weekDay}.</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               <tr>
                  {Array.from([1, 2, 3, 4, 5, 6, 7]).map(day => (
                     <td key={day}>
                        <CalendarDay>
                           {day}
                        </CalendarDay>
                     </td>
                  ))}
               </tr>
            </tbody>
         </CalendarBody>
      </CalendarContainer>
   );
}