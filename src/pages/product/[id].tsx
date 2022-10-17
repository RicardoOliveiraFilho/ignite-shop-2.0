import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, omnis consequuntur! Dolores deleniti consectetur atque dolore quas voluptatum iure temporibus enim itaque libero corporis accusamus, velit aliquam rerum esse et!</p>

        <button>
            Comprar Agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}