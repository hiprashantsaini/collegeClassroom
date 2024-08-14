import axios from "axios";
import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

const ProtectedRoute = () => {
    const { userData, setUserData, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
    const navigate=useNavigate();
    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
              return  setIsAuthenticated(false);
            }
            const verifyToken = await axios.post("https://backendclassroom.onrender.com/api/verify-token", { token });
            setUserData(verifyToken.data.info);
            setIsAuthenticated(true);
            if(verifyToken.data.info?.role == "Principal"){
              return  navigate('/admin');
            }
            if(verifyToken.data.info?.role == "Teacher"){
                return  navigate('/teacher');
            }
            if(verifyToken.data.info?.role == "Student"){
                return  navigate('/student');
              }
        } catch (error) {
            if(error.response?.status == 401){
              alert(`${error.response?.data?.message}`);
             return setIsAuthenticated(false);
            }
            if(error.response?.status == 404){
               return setIsAuthenticated(false);
              }
            console.log(error);
            return setIsAuthenticated(false);
        }
    }
    useEffect(() => {
        if(isAuthenticated !== true){
            checkUser();
        }
    },[])
  return(
    <>
    {
        isAuthenticated === false ? <Navigate to={"/home"}/> : <Outlet/>
    }
    </>
  )
}

export default ProtectedRoute;