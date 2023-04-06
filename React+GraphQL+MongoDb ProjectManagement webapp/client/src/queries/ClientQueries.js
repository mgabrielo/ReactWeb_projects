import { gql } from "@apollo/client"

const Get_Clients = gql`
query getClients{
    clients{
        id
        name
        email
        phone
      }
}
`
export { Get_Clients };