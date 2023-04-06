import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { Get_Projects } from "../queries/ProjectQueries"
import { useMutation } from "@apollo/client"
import { Delete_Project } from "../mutations/ProjectMutations"

export default function DeleteProBtn({projectId}) {

const navigate  = useNavigate();

const [deleteProject] = useMutation(Delete_Project, {
    variables :{id : projectId},
    onCompleted: ()=> navigate('/'),
    refetchQueries: [{query : Get_Projects}]
})

  return (
    <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m-2" onClick={deleteProject}>
            <FaTrash className="icon"/> Delete Project
        </button>
    </div>
  )
}
