import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


const ProtectedRoute=({children})=>{

    const token=Cookies.get("jwt_token")
    if(token===undefined){
        return <Navigate to="/"/>
    }
    return children
}
export default ProtectedRoute
