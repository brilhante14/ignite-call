import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";

const confirmFormSchema = z.object({
   name: z.string().min(3, { message: "O nome precisa de no mínimo 3 caracteres." }),
   email: z.string().email({ message: "Digite um email válido." }),
   observations: z.string().nullable(),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

interface IConfirmStepProps {
   schedulingDate: Date;
   returnToCalendarView: () => void;
}

export function ConfirmStep({ schedulingDate, returnToCalendarView }: IConfirmStepProps) {
   const describredDate = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY")
   const describedTime = dayjs(schedulingDate).format("HH:mm[h]")

   const router = useRouter();
   const username = String(router.query.username)

   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
   } = useForm<ConfirmFormData>({ resolver: zodResolver(confirmFormSchema) });

   async function handleConfirmScheduling(data: ConfirmFormData) {
      const { email, name, observations } = data;

      await api.post(`/users/${username}/schedule`, {
         name,
         email,
         observations,
         date: schedulingDate,
      });

      returnToCalendarView();
   }

   return (
      <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
         <FormHeader>
            <Text>
               <CalendarBlank />
               {describredDate}
            </Text>
            <Text>
               <Clock />
               {describedTime}
            </Text>
         </FormHeader>

         <label>
            <Text size="sm">Nome Completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
               <FormError size="sm">
                  {errors.name.message}
               </FormError>
            )}
         </label>

         <label>
            <Text size="sm">Endereço de email</Text>
            <TextInput type="email" placeholder="johndoe@example.com" {...register("email")} />
            {errors.email && (
               <FormError size="sm">
                  {errors.email.message}
               </FormError>
            )}
         </label>

         <label>
            <Text size="sm">Obervações</Text>
            <TextArea {...register("observations")} />
         </label>

         <FormActions>
            <Button type="button" variant="tertiary" onClick={returnToCalendarView}>Cancelar</Button>
            <Button
               type="submit"
               disabled={isSubmitting}
            >
               Confirmar
            </Button>
         </FormActions>
      </ConfirmForm>
   );
}