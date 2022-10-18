import { NextApiRequest, NextApiResponse } from "next";

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
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ message: 'Olá Mundo' })
}