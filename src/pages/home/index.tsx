import { Heading, Text } from "@ignite-ui/react";
import Head from "next/head";
import Image from "next/image";

import previewImage from "../../assets/app-preview.png";
import { ClaimUsernameForm } from "./components/ClaimUsernameForms";

import { Container, Hero, Preview } from "./styles";

export default function Home() {
   return (
      <>
         <Head>
            <title>Home | Ignite Call</title>
         </Head>
         <Container>
            <Hero>
               <Heading as="h1" size="4xl">Agendamento descomplicado</Heading>

               <Text size="xl">
                  Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
               </Text>

               <ClaimUsernameForm />
            </Hero>

            <Preview>
               <Image
                  src={previewImage}
                  alt="Calendário simulando a aplicação"
                  priority
                  quality={100}
                  height={400}
               />
            </Preview>
         </Container>
      </>
   );
}
