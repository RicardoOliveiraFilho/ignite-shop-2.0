import { HomeContainer, Product } from "../styles/pages/home";

import camiseta1 from '../assets/camisetas/Shirt_1.png'
import camiseta2 from '../assets/camisetas/Shirt_2.png'
import camiseta3 from '../assets/camisetas/Shirt_3.png'
import Image from "next/future/image";

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
