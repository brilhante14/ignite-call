import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container, Form, FormValidation, Header } from "./styles";

const registerFormSchema = z.object({
   username: z.string()
      .min(3, { message: "O usuário precisa ter ao menos 3 caracteres" })
      .regex(/^([a-z\\-]+)$/i, { message: "O usuário pode ter apenas letras e hifens" })
      .transform(username => username.toLowerCase()),
   name: z.string().min(3, { message: "O nome precisa ter pelo menos 3 caracteres." })
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
   const router = useRouter();

   const {
      formState: { errors, isSubmitting },
      handleSubmit,
      register,
      setValue,
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema),
   });

   useEffect(() => {
      if (router.query.username) {
         setValue("username", String(router.query.username));
      }
   }, [router.query?.username, setValue]);

   async function handleRegister(data: RegisterFormData) {
      const { name, username } = data;

      try {
         await api.post('/users', {
            name,
            username,
         });

         await router.push('/register/connect-calendar');
      } catch (error) {
         if (error instanceof AxiosError && error.response?.data.message) {
            alert(error.response.data.message);
         } else {
            console.error(error);
         }
      }
   }

   return (
      <>
         <Head>
            <title>Registro | Ignite Call</title>
         </Head>
         <Container>
            <Header>
               <Heading as="strong">Bem vindo ao Ignite Call!</Heading>
               <Text>Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>

               <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
               <label>
                  <Text size="sm">Nome de usuário</Text>
                  <TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register("username")} />

                  {errors.username && (
                     <FormValidation size="sm">{errors.username.message}</FormValidation>
                  )}
               </label>

               <label>
                  <Text size="sm">Nome completo</Text>
                  <TextInput placeholder="Seu nome" {...register("name")} />

                  {errors.name && (
                     <FormValidation size="sm">{errors.name.message}</FormValidation>
                  )}
               </label>

               <Button type="submit" disabled={isSubmitting}>
                  Próximo passo
                  <ArrowRight />
               </Button>
            </Form>
         </Container>
      </>
   );
}