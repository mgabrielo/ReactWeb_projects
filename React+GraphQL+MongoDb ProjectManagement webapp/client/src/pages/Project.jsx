import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import EditProject from "../components/EditProject"
import { Get_Project } from "../queries/ProjectQueries"
import ClientInfo from "../components/ClientInfo"
import DeleteProBtn from "../components/DeleteProBtn"

export default function Project() {
    const {id} = useParams();
    const {loading, error, data} = useQuery(Get_Project,
        {variables: {id} });

    if (loading) return <Spinner/>
    if(error)  return <p>Something went Wrong</p>

  return <>
  {!loading && !error && (
    <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-primary btn-sm w-25 d-inline ms-auto"> Back</Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data.project.status}</p>

        <ClientInfo client={data.project.client}/>

        <EditProject project={data.project}/>

        <DeleteProBtn projectId= {data.project.id}/>
    </div>
  )}
  </>
}
