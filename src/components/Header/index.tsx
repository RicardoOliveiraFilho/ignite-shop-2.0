import Link from "next/link";
import Image from "next/future/image"
import { HeaderContainer } from './styles'
import logoImg from '../../assets/logo.svg'
import { Cart } from "../Cart";
import { useRouter } from "next/router";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const { pathname } = useRouter()
  const showCartButton = pathname !== '/success'

  const { cartQuantity } = useCart()

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      {showCartButton && (
        <>
          {cartQuantity > 0 && <span>{cartQuantity}</span>}
          <Cart />
        </>
      )}
    </HeaderContainer>
  )
}