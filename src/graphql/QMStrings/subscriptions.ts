import { gql } from '..'

export const S_SOMETHING = gql`
  subscription something {
    something {
      a
    }
  }
`
