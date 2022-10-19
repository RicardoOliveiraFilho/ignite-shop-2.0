import { Handbag } from 'phosphor-react'
import { ComponentProps } from 'react';
import { CartButtonContainer } from "./styles";

// Dizemos que o nosso cart button terá todas as propriedades que existem em CartButtonContainer.
type CartButtonProps = ComponentProps<typeof CartButtonContainer>

export function CartButton({ ...rest }: CartButtonProps) { // '...rest': Propriedades passadas pelo Radix!
  return (
    <CartButtonContainer {...rest}>
      <Handbag weight='bold' />
    </CartButtonContainer>
  )
}