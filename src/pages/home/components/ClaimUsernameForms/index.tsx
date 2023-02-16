import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, InputValidation } from "./styles";

const claimUsernameFormSchema = z.object({
   username: z.string()
      .min(3, { message: "O usuário precisa ter ao menos 3 caracteres" })
      .regex(/^([a-z\\-]+)$/i, { message: "O usuário pode ter apenas letras e hifens" })
      .transform(username => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
   const router = useRouter();

   const {
      formState: { errors, isSubmitting },
      handleSubmit,
      register
   } = useForm<ClaimUsernameFormData>({
      resolver: zodResolver(claimUsernameFormSchema),
   });

   async function handleClaimUsername(data: ClaimUsernameFormData) {
      const { username } = data;

      await router.push(`/register?username=${username}`);
   }

   return (
      <>
         <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
            <TextInput
               size="sm"
               prefix="ignite.com/"
               placeholder="seu-usuario"
               {...register("username")}
            />

            <Button
               size="sm"
               type="submit"
               disabled={isSubmitting}
            >
               Reservar usuário
               <ArrowRight />
            </Button>

         </Form>
         <InputValidation>
            <Text size="sm">
               {errors.username ? errors.username.message : "Digite o nome de usuário desejado"}
            </Text>
         </InputValidation>
      </>
   );
}
