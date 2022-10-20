import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/future/image";
import Link from 'next/link';

import Stripe from "stripe";
import useEmblaCarousel from "embla-carousel-react";

import { stripe } from "../lib/stripe";

import { HomeContainer, Product, SliderContainer } from "../styles/pages/home";

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true
  })

  /*
    prefetch - O Next faz um prévio carregamento (Intersection Observer) de todos os
    links presentes na página e visíveis em tela (Não ocorre no ambiente de desenvolvimento).
    Isso faz com que quando o usuário clicar no link o carregamento da página ocorra mais rápido!
    Para tomar cuidado com isso e evitar uma sobrecarga no servidor caso a página tenha muitos links,
    podemos passar 'prefetch={false}' para informar ao Next para fazer isso apenas no momento do Hover no link!
  */
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <div style={{ overflow: 'hidden', width: '100%' }}>
        <HomeContainer>
          <div className="embla" ref={emblaRef}>
            <SliderContainer className="embla__container container">
              {products.map(product => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  prefetch={false}
                >
                  <Product className="embla__slide">
                    <Image src={product.imageUrl} width={520} height={480} alt="" />

                    <footer>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </footer>
                  </Product>
                </Link>
              ))}
            </SliderContainer>
          </div>
        </HomeContainer>
      </div>
    </>
  )
}

/*
  getStaticProps: Chamada no momento do build e no completar de cada ciclo do revalidate! Ficamos também sem acesso ao contexto da requisição! (req, res e etc...)
  getServerSideProps: Chamada a cada requisição a API! Possuímos o acesso ao contexto!
  Ambas executadas no servidor Node (Server side) do Next!
*/
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100) /*unit_amount vem em centavos*/
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, /*O Next revalida a página e a recria por baixo do panos ao passar o tempo informado, que será medido em segundos (O tempo passado foi de 2 horas!)*/
  }
}