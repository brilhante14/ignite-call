import { convertTimeStringToMinutes } from "@/utils/convert-time-string-to-minutes";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import Head from "next/head";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Header } from "../styles";
import { FormError, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./styles";

const timeIntervalsFormSchema = z.object({
   intervals: z.array(
      z.object({
         weekDay: z.number().min(0).max(6),
         enabled: z.boolean(),
         startTime: z.string(),
         endTime: z.string(),
      }),
   )
      .length(7)
      .transform(intervals => intervals.filter(interval => interval.enabled).map(interval => ({
         weekDay: interval.weekDay,
         startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
         endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      })))
      .refine(intervals =>
         intervals.length > 0, {
         message: "Você precisa selecionar pelo menos um dia da semana!",
      })
      .refine(intervals =>
         intervals.every(interval => interval.endTimeInMinutes >= interval.startTimeInMinutes + 60), {
         message: "Os intervalos devem ser de ao menos 1 hora."
      }),
});

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;

export default function TimeIntervals() {
   const {
      register,
      handleSubmit,
      watch,
      formState: {
         isSubmitting,
         errors
      },
      control,
   } = useForm<TimeIntervalsFormInput>({
      defaultValues: {
         intervals: [
            { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
            { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
            { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
            { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
            { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
            { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
            { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
         ]
      },
      resolver: zodResolver(timeIntervalsFormSchema),
   });

   const { fields } = useFieldArray({
      control,
      name: "intervals",
   });

   const weekDays = getWeekDays();

   const intervals = watch("intervals");

   async function handleSetTimeIntervals(data: any) {
      const formData = data as TimeIntervalsFormOutput;
      console.log(data);
   }

   return (
      <>
         <Head>
            <title>Registro | Ignite Call</title>
         </Head>
         <Container>
            <Header>
               <Heading as="strong">Quase lá</Heading>
               <Text>
                  Defina o intervalo de horários que você está disponível em cada dia da semana.
               </Text>

               <MultiStep size={4} currentStep={3} />
            </Header>

            <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
               <IntervalContainer>
                  {fields.map((field, index) => (
                     <IntervalItem key={field.id}>
                        <IntervalDay>
                           <Controller
                              name={`intervals.${index}.enabled`}
                              control={control}
                              render={({ field }) => (
                                 <Checkbox
                                    onCheckedChange={checked => field.onChange(checked === true)}
                                    checked={field.value}
                                 />
                              )}
                           />
                           <Text>{weekDays[field.weekDay]}</Text>
                        </IntervalDay>
                        <IntervalInputs>
                           <TextInput
                              disabled={!intervals[index].enabled}
                              size="sm"
                              type="time"
                              step={60}
                              {...register(`intervals.${index}.startTime`)}
                           />
                           <TextInput
                              disabled={!intervals[index].enabled}
                              size="sm"
                              type="time"
                              step={60}
                              {...register(`intervals.${index}.endTime`)}
                           />
                        </IntervalInputs>
                     </IntervalItem>
                  ))}
               </IntervalContainer>

               {errors.intervals && (
                  <FormError size="sm">{errors.intervals.message}</FormError>
               )}

               <Button type="submit" disabled={isSubmitting}>
                  Próximo passo
                  <ArrowRight />
               </Button>
            </IntervalBox>
         </Container>
      </>
   )
}