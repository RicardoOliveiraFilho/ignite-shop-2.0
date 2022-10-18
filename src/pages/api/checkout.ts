import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

/*
  Para se implementar rotas no Next (API Routes), basta criar arquivos assim
  dentro de um diretório denominado 'api' dentro da pasta 'pages'
  Nós acessamos essa rota através do endereço http://localhost:3000/api/hello
  Todo o código executado dentro de uma API Route, é executado no server side!

  Tanto getServerSideProps quanto o getStaticProps são executados apenas no
  carregamento da página (Seu primeiro loading). Caso precisemos executar uma ação
  pelo server side que esteja atrelada a uma ação do usuário da aplicação (clique botão, etc)
  nós precisaremos de uma API Route!
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtemos agora o priceId da requisição a API Route
  const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success`
  const cancelUrl = `${process.env.NEXT_URL}`

  /*
    Quando o usuário finalizar sua compra, precisamos informar ao Stripe isso!
    Fazemos isso criando uma Checkout Session. É nela que passamos os itens que
    o usuário deseja comprar, podemos passar também informações do próprio usuário e etc.
  */
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, // Para onde o usuário deve ser redirecionado após a finalização da compra com sucesso!
    cancel_url: cancelUrl, // Para onde o usuário deve ser redirecionado caso ele cancele a compra dentro do Stripe!
    mode: 'payment', // Como o usuário realizará apenas um pagamento e não criará um conta ou realizará uma inscrição de uma assinatura, o mode será 'payment'!
    line_items: [ // Um array que conterá várias informações sobre os produtos aos quais o usuário deseja comprar!
      /*
        Nesse array podemos passar toda e qualquer informação sobre o produto do total zero,
        caso esse produto não esteja cadastrado na plataforma do Stripe. 
      */
      {
        price: priceId, // Caso haja produtos cadastrados no Stripe, podemos passar apenas a informação referente ao Price (um ID)! As informações do produto e de seu preço (pelo fato do produto poder ter vários) são duas entidades diferente que se relacionam no Stripe!
        quantity: 1, // Quantos itens do mesmo produto serão comprados
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url // Url onde o usuário irá finalizar sua compra!
  })
}