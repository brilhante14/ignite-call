import Head from "next/head";
import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm() {
   const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

   return (
      <>
         <Head>
            <title>Agendamento | Ignite Call</title>
         </Head>
         {selectedDateTime ?
            <ConfirmStep schedulingDate={selectedDateTime} />
            :
            <CalendarStep handleSelectingDateTime={setSelectedDateTime} />
         }
      </>
   )
}