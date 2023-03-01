import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
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

export function ConfirmStep() {
   const {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
   } = useForm<ConfirmFormData>({ resolver: zodResolver(confirmFormSchema) });

   async function handleConfirmScheduling(data: ConfirmFormData) {

   }

   return (
      <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
         <FormHeader>
            <Text>
               <CalendarBlank />
               22 de setembro de 2022
            </Text>
            <Text>
               <Clock />
               18:00h
            </Text>
         </FormHeader>

         <label>
            <Text size="sm">Nome Completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
               <FormError>
                  {errors.name.message}
               </FormError>
            )}
         </label>

         <label>
            <Text size="sm">Endereço de email</Text>
            <TextInput type="email" placeholder="johndoe@example.com" {...register("email")} />
            {errors.email && (
               <FormError>
                  {errors.email.message}
               </FormError>
            )}
         </label>

         <label>
            <Text size="sm">Obervações</Text>
            <TextArea {...register("observations")} />
         </label>

         <FormActions>
            <Button type="button" variant="tertiary">Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>Confirmar</Button>
         </FormActions>
      </ConfirmForm>
   );
}