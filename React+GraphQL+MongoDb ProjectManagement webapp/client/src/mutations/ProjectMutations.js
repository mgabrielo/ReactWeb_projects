import { gql } from "@apollo/client";

const Add_Project = gql`
mutation AddProject($name: String!, $description: String!,$status : ProjectStatus! $clientId :ID!){
    addProject(name : $name, description : $description, status: $status, clientId : $clientId){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
        }
    }
}
`
const Delete_Project = gql`
 mutation DeleteProject($id: ID!){
    deleteProject(id : $id){
        id
    }
 }
`


const Update_Project = gql`
mutation UpdateProject($id: ID!, $name: String!, $description: String!,$status: ProjectStatusUpdate!){
    updateProject(id: $id, name : $name, description : $description, status: $status){
        id
        name
        description
        status
        client{
            id
            name
            email
            phone
        }
    }
}
`
export { Add_Project, Delete_Project, Update_Project };