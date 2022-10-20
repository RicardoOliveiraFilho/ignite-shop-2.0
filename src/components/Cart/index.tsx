import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';
import Image from 'next/future/image';
import { useCart } from '../../hooks/useCart';

export function Cart() {
  const { cartItems, cartTotal,removeCartItem } = useCart()
  const cartQuantity = cartItems.length
  const cartTotalFormatted = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight='bold' />
          </CartClose>

          <h2>Sacola de compras</h2>

          <section>
            {cartQuantity <= 0 && (
              <p>Parece que seu carrinho está vazio :(</p>
            )}

            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image width={100} height={93} alt="" src={cartItem.imageUrl} />
                </CartProductImage>

                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>Remover</button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>{cartQuantity <= 0 ? `Nenhum item` : (cartQuantity >= 2 ? `${cartQuantity} itens` : `${cartQuantity} item`)}</p>
              </div>

              <div>
                <span>Valor total</span>
                <p>{cartTotalFormatted}</p>
              </div>
            </FinalizationDetails>
            <button>Finalizar compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}