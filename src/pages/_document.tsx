import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles'

export default function Document() {
  return (
    <Html>
      {/* Caso nã carregue as fonts, basta remover a pasta .next e restart a app! */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        {/*
          Faz com que o css seja renderizado também com SSR.
          getCssText(): Antes de renderizar a página, irá identificar todo o código css
          necessitado pela página e o escreverá dentro de uma tag 'style'.
        */}
        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </Head>
      <body>
        <Main /> {/* O Main seria mais ou menos a <div id="root"></div> em outras aplicações ReactJS */}
        <NextScript /> {/* Onde na página se carregará os scripts JS da aplicação. Algo semelhante ao que ocorre com o Vite no arquivo index.html (a tag script) */}
      </body>
    </Html>
  )
}