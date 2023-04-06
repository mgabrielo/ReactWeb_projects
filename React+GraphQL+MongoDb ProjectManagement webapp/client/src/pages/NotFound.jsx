import { FaExclamationTriangle } from "react-icons/fa"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <FaExclamationTriangle className="text-danger" size='5em'/>
         <h1> NotFound </h1>
         <p className="lead"> Page does not Exist</p>
         <Link to="/"  className="btn btn-dark"> Go To HomePage</Link>
         </div>
  )
}
