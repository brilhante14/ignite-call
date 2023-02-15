import { Heading, Text } from "@ignite-ui/react";
import Head from "next/head";
import { Container, Hero, Preview } from "./styles";

import previewImage from "../../assets/app-preview.png";
import Image from "next/image";

export default function Home() {
   return (
      <>
         <Head>
            <title>Ignite Call</title>
         </Head>
         <Container>
            <Hero>
               <Heading size="4xl">Agendamento descomplicado</Heading>

               <Text size="lg">
                  Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
               </Text>
            </Hero>

            <Preview>
               <Image 
                  src={previewImage}
                  height={400}
                  priority
                  quality={100}
                  alt="Calendário simulando a aplicação"
               />
            </Preview>
         </Container>
      </>
   );
}
