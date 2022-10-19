import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua casa.
      </p>

      {/* A partir da versão 12 do Next.js não é mais necessário o componente 'Link' ter o elemento 'a' como filho. */}
      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}