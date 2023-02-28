import { getWeekDays } from "@/utils/get-week-days";
import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";

export function Calendar() {
   const shortWeekDays = getWeekDays({ short: true });

   return (
      <CalendarContainer>
         <CalendarHeader>
            <CalendarTitle>Setembro de 2022</CalendarTitle>

            <CalendarActions>
               <button>
                  <CaretLeft />
               </button>

               <button>
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