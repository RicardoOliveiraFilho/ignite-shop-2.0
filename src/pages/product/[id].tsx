import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>
            Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

/*
  Quando temos páginas estáticas que possuem parâmetros, como é o nosso caso, nós precisamos da 'getStaticPaths'.
  Sempre a utilizaremos para informar ao Next quais serão os parâmetros que a página que desejamos gerar estaticamente precisa.
*/
export const getStaticPaths: GetStaticPaths = async () => {
  /*
    Apesar de podermos informar os parâmetros de forma direta, temos também outras maneiras.
  */
  return {
    paths: [
      { params: { id: 'prod_Mcks9Dc2s2h2Wm' } }
    ],
    fallback: false,
  }
}

/*
  Poderíamos carregar os dados do produto como já visto, utilizando useEffect. Obtendo suas informações a partir do parâmetro 'query'.
  Mas vimos também que há um risco nessa abordagem, caso o Javascript seja desabilitado no navegador os dados nem serão obtidos e muito menos vistos.
  E ainda por cima, indexadores, bots não conseguirão carregar esses dados ao visualizarem a página.

  A melhor forma de carregar esses dados é com alguma função server-side já vista (SSR ou SSG).
  Para saber qual usar, há algumas perguntas a serem respondidas:
  1.) Os dados carregados serão atemporais (Serem mantidos em cache por um tempo)?
      Se sim a escolha é SSG, se não a escolha é SSR!
  2.) Os dados carregados dependem de alguma informação do contexto de execução da página (Cookies, Usuário logado ou outra informação em tempo real)?
      Se sim a escolha é SSR, se não a escolha é SSG!
  
  Nesse nosso caso da página de produto, a escolha será SSG!
*/
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1, // 1 Hora
  }
}