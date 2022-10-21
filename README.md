<a id="topo"></a>

![Captura de tela de 2022-10-21 10-02-48](https://user-images.githubusercontent.com/2540737/197209307-ae5aaae3-fb4d-48f5-9af0-e66cd8e1b166.png)


<p align="center">
  <a href="https://github.com/RicardoOliveiraFilho">
    <img alt="Feito pelo Ricardo Oliveira" src="https://img.shields.io/badge/FEITO%20POR-RICARDO%20OLIVEIRA-blue">
  </a>
  <img alt="Licença do Projeto" src="https://img.shields.io/badge/LICENSE-MIT-blue"/>
<p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#pre-requisitos">Pré-requisitos</a> •
  <a href="#rodando">Rodando a Aplicação</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#autor">Autor</a>
</p>

App construída juntamente com o framework Next.js que simula algumas funcionalidades bastante básicas de um e-Commerce!

### Features<a id="features"></a> - <a href="#topo">Topo</a>
- [x] Listagem dos produtos através do acesso a API do Stripe (Os produtos foram cadastrados na plataforma).
- [x] Uma página com as informações dos detalhes do produto.
- [x] Adição do produto na sacola do e-commerce.
- [x] Dialog mostrando os detalhes da sacola, como os produtos inseridos nela e o total da compra.
- [x] Checkout da compra realizando chamada a API do Stripe, onde finalizamos a compra dos produtos.
- [x] Página de sucesso informando a finalização da compra, após o usuário ser redirecionado de volta do Stripe para aplicação.

<h4  align="left">
Projeto finalizado ✔
</h4>

###  Pré-requisitos<a id="pre-requisitos"></a> - <a href="#topo">Topo</a>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
 [Git](https://git-scm.com/)
 e [Node.js](https://nodejs.org/pt-br/)
 
 Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
 
 Para finalizar, precisará também criar uma conta no [Stripe](https://stripe.com/br) para poder cadastrar os produtos na plataforma. Além disso, será necessário configurar algumas variáveis de ambiente, como mostrado abaixo:
 
 ````bash
 # Utilize o arquivo presente no projeto chamado .env.example. O renomeie apenas para .env
 
 #App
NEXT_URL=[endereço da aplicação]

# Stripe
STRIPE_PUBLIC_KEY=[chave pública do stripe]
STRIPE_SECRET_KEY=[chave privada do stripe]
 ````

##### Configurando a aplicação e o Stripe

Após criar sua conta no Stripe e realizar o login, observe o canto superior esquerdo de sua tela para visualizar algo como a imagem abaixo:

![Captura de tela de 2022-10-21 11-09-24](https://user-images.githubusercontent.com/2540737/197215929-5f020595-5c3a-4034-819b-921c8709436c.png)

Tomado a imagem acima como base, clique na seta que está ao lado de <i>Ignite Shop</i> e em seguido em <i>"Nova conta"</i>.

![Captura de tela de 2022-10-21 11-10-41](https://user-images.githubusercontent.com/2540737/197216368-7dda5be5-d65e-4566-9a76-54e8ccd7195d.png)

No dialog que aparecerá, você definirá o nome da conta... No meu caso foi <i>Ignite Shop</i>, como já vimos. Informando o nome da conta, basta clicar no botão Criar conta!

![Captura de tela de 2022-10-21 11-12-08](https://user-images.githubusercontent.com/2540737/197216752-486526ff-c940-4a84-8f1c-96d3f3f50f76.png)

Após isso, observe o canto superior direito de sua tela para visualizar algo como a imagem abaixo:

![Captura de tela de 2022-10-21 10-53-17](https://user-images.githubusercontent.com/2540737/197212432-f8b25e23-cac9-43a0-9798-cb0fc9f36203.png)

Clique em "Desenvolvedores". Em seguida observe o lado esquerdo da tela, haverá um menu lateral onde existirá a opção "Chaves da API" (vide imagem):

![Captura de tela de 2022-10-21 10-54-39](https://user-images.githubusercontent.com/2540737/197212923-0bc4ce91-8711-4d77-bf96-7a2e0266ad5d.png)

Nesta tela haverá a seção <b>"Chaves padrão"</b>, onde você conseguirá obter sua <b>"chave publicável"</b> e sua <b>"chave secreta"</b>, clicando no botão <b>"Revelar chave de teste"</b>. São essas chaves que você colocará em seus respectivos lugares no arquivo <i>.env</i>. <b>(<i>Não esqueça de renomear o arquivo .env.example</i>)</b>

![Captura de tela de 2022-10-21 10-58-29](https://user-images.githubusercontent.com/2540737/197214954-8c113f39-106a-496f-867c-14c048d23bda.jpg)

##### Cadastrando os produtos

Feito tudo isso, chegou a hora de cadastrar-mos os produtos para que a API do Stripe possa retorná-los para a nossa aplicação.
Observe o menu superior e vá até a seção de "Produtos":

![Captura de tela de 2022-10-21 11-19-16](https://user-images.githubusercontent.com/2540737/197218155-4d3dc0a0-eb5c-47c8-9f10-82c4273799f9.png)

No canto superior direito da tela haverá um botão "Adicionar produto":

![Captura de tela de 2022-10-21 11-20-52](https://user-images.githubusercontent.com/2540737/197218506-a6cba267-12ce-4b3e-9c0b-62db4fc06228.png)

Esse botão abrirá a tela onde informamos os dados do produto:

![Captura de tela de 2022-10-21 11-23-16](https://user-images.githubusercontent.com/2540737/197219553-e97977c2-7334-469b-bc96-35457c72759b.jpg)

Insira o nome do produto, sua descrição e uma imagem para ele (Caso deseje, deixei no diretório assets as imagens de exemplo). Você só precisa se atentar a apenas as informações presentes na seção "Informações de preço".
Elas devem estar configuradas conforme a imagem acima para todos os produtos que forem adicionados. Exceto apenas o valor em si do preço, onde vc poderá variar caso preferir. Para todos eu usei o padrão de moeda "BRL", já setado por default!

Feito isso é só repetir esse processo de adicionar produtos para quantos produtos você desejar, você poderá continuar ficar adicionando clicando no botão "Salvar e adicionar" ou finalizar a adição clicando no outro botão "Salvar produto", posicionados no canto superior direito da tela.

![Captura de tela de 2022-10-21 11-31-38](https://user-images.githubusercontent.com/2540737/197221158-6482f136-d418-4fb2-bbaf-ff4942ec9196.png)

Após finalizar todos os cadastros de seus produtos, você será redirecionado para a listagem dos mesmo. Será uma tela semelhante a essa:

![Captura de tela de 2022-10-21 11-35-11](https://user-images.githubusercontent.com/2540737/197221663-3213fbae-e6bb-445a-8912-eb1e5d66774d.png)


### Rodando a Aplicação<a id="rodando"></a> - <a href="#topo">Topo</a>
   
````bash 
 # Clone este repositório
 git clone https://github.com/RicardoOliveiraFilho/ignite-shop-2.0.git
 
 # Acesse a pasta do projeto no terminal, a partir do diretório ao qual o comando de clonagem foi executado
 cd ignite-shop-2.0
 
 # Instale as dependências
 $ yarn install ou
 $ npm i 
 
 # Execute a aplicação em modo de desenvolvimento
 $ npm run dev 
 $ yarn dev
 
 # O servidor iniciará na porta:3000
 # Acesse http://localhost:3000
 ````

### Tecnologias<a id="tecnologias"></a> - <a href="#topo">Topo</a>
 As seguintes ferramentas foram usadas na construção do projeto:
 
  - [Stitches](https://stitches.dev/)
  - [Node.js](https://nodejs.org/pt-br/)
  - [ReactJS](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [Radix](https://www.radix-ui.com/)
  - [Stripe](https://stripe.com/br)

### Autor <a id="autor"> </a> - <a href="#topo">Topo</a>

<a href="https://github.com/RicardoOliveiraFilho" style="text-decoration: none;">

<span> Feito por Ricardo Oliveira - Entre em contato! </span> 
</a>
