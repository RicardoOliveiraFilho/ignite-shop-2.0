import { X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from "../CartButton";
import { CartClose, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from './styles';
import Image from 'next/future/image';

export function Cart() {
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
            {/*<p>Parece que seu carrinho está vazio :(</p>*/}
            <CartProduct>
              <CartProductImage>
                <Image width={100} height={93} alt="" src="https://s3-alpha-sig.figma.com/img/fd95/f0b2/85d51884517403ad7e3fc5c12726f99a?Expires=1667174400&Signature=K8pwSIEDKrppt2wt3YJW8NVhtrawZptFlkdw24m11H~2WisUNjXgyGoBxP0F5Ju~~qJqKEammLbZzbAQFufuDQhY4EKu-kgeX38BV5brMRA1EGR~LxxuVU3cKCFFLJ6ziQElOIG4JTLBdgShqcFlY74ekMIKV345Fl55RATmEzzqqabz47pQvOUxVlKdiTg1J8Vt57tzk7s5bCKx2CrSqcqEj96l9M-Nhmtf7Q9OnpQJ3PA7yi0canXOgiEtmKMUxMKzi~KMa4OaNFf9eQuxy-TOXUmsWewhmi0XYLT93kO7AQ~cHkuNiJl--zA1lWSdjc8LrHrUtcH6K6RoXYX0Gw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
              </CartProductImage>

              <CartProductDetails>
                <p>Produto 1</p>
                <strong>R$ 50,00</strong>
                <button>Remover</button>
              </CartProductDetails>
            </CartProduct>
          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>2 itens</p>
              </div>

              <div>
                <span>Valor total</span>
                <p>R$ 100,00</p>
              </div>
            </FinalizationDetails>
            <button>Finalizar compra</button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}