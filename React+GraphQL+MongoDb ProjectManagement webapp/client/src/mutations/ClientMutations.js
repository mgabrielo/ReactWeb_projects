import { gql } from "@apollo/client";


const Add_Client = gql` mutation addClient($name: String!, $email: String!, $phone: String!){
    addClient(name: $ name, email:$email, phone: $phone){
        id
        name
        email
        phone
    }
}`;

const Delete_Client = gql`
mutation deleteClient($id: ID!){
    deleteClient(id : $id){
        id
        name
        email
        phone
    }
}
`;

export { Delete_Client, Add_Client };