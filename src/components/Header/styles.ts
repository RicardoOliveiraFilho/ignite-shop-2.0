import { styled } from "../../styles";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  span: {
    position: 'absolute',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    border: '3px solid $gray900',
    top: 26,
    right: -11,
    zIndex: 1,
    padding: '0.75rem',
    color: '$white',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: '0.875rem',
    fontWeight: 700,
    lineHeight: 1.6,

    background: '$green500',
  },

  button: {
    marginLeft: 'auto',
  }
})