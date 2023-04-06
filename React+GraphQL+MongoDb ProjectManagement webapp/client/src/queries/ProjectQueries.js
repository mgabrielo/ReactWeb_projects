import { gql } from "@apollo/client";

const Get_Projects = gql` query getProjects{
    projects{
        id,
        name,
        status
    }
}`


const Get_Project = gql`
    query getProject($id : ID!){
        project(id : $id){
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
export { Get_Projects, Get_Project };