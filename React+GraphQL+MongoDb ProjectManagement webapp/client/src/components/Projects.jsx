
import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { Get_Projects } from "../queries/ProjectQueries"
import ProjectCard from "./ProjectCard"

export default function Projects() {
    const {loading, error, data} =useQuery(Get_Projects)

    if(loading) return <Spinner/>
    if(error) return <p>Something went Wrong</p>

    return <>
        {data.projects.length > 0 ? 
        
        (<div className="row mt-3">
            {data.projects.map((project)=> (
                <ProjectCard key={project.id} project = {project}/>
            ))}

        </div>) 
        
        : (<p> no projects </p>)}
    </>;
}