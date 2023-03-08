import Head from "next/head";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";

export function ScheduleForm() {

   return (
      <>
         <Head>
            <title>Agendamento | Ignite Call</title>
         </Head>
         {/* <ConfirmStep /> */}
         <CalendarStep />
      </>
   )
}