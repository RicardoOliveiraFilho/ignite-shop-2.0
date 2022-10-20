import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import { useRouter } from "next/router"
import Stripe from "stripe"
import { IProduct } from "../../contexts/CartContext"
import { useCart } from "../../hooks/useCart"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  if (isFallback) {
    return <p>Loading...</p> /* O ideal aqui é que se retorne uma Skeleton Screen! */
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={itemAlreadyInCart} onClick={() => addToCart(product)}>
              {itemAlreadyInCart ? 'Produto já na Sacola': 'Colocar na Sacola'}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
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
    /*
      Estando 'false', o Next nos retornará a página 404!
      Estando 'true', o Next tentará obter as informações pegando os parâmetros que não foram informados no 'paths'
      e tentará gerar a pagina estática com base neles.
      Aqui tem um porém, pois o Next exibirá a tela (O componente React e seu HTML) para só então ir atrás de suas informações.
      Nesses casos o ideal é ter também uma informação de loading!!! Veja o isFallback acima!
      NOTA: há também a opção de 'blocking', mas ela não é recomendada pois ela não exibirá nada até o Next ter os dados da página. Isso não dará uma boa experiência ao usuário.
    */
    fallback: true,
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
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id, // Possibilitará a API Route de obter o id do Produto!
      }
    },
    revalidate: 60 * 60 * 1, // 1 Hora
  }
}