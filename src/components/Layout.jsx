import React, { useEffect, useState } from "react";
import "./layout.css";
import { FaList } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Profile } from "./profile/Profile";
import { userUserServices } from "../services/userServices";
import Swal from "sweetalert2";
import { URL } from "../url/useAxios.js";
import userIcon from "../assets/icons/profile/profile.png"


export const Layout = () => {
  const[showProfile, setShowProfile] =useState(false)
  const [imageUrl,setImageUrl]= useState()
  const[showDrop,setShowDrop]= useState(false)
  const[pass1,setPass1]=useState()
  const[pass2,setPass2]=useState()
  const [user,setUser] = useState({
    username:null,
    password:null,
    email:null,
    image:null,
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  const {getUser,logoutUser}= userUserServices()
  const handleLogout =async()=>{
    await logoutUser(); 
    localStorage.removeItem('login')
    Swal.fire('Success',"Logged Out",'success')
    navigate('/login')
  }
  useEffect(()=>{
    getData()
  },[showProfile])

  const getData = async () =>{
    try{
     const response = await getUser()
     if(response.success){
       setUser({...response.data})
       if(response.data.image){
         setImageUrl(URL+response.data.image)
       }
     }
    }catch(err){}
 };





 console.log(user)

  return (
    <div className="d-flex">
      <div className="bg-secondary text-light sidebar vh-100 pt-5">
        <div
          onClick={() => navigate("/")}
          className={`mt-5 py-2 d-flex align-items-center ps-4 ${
            location.pathname == "/" && "bg-secondary"
          }`}
        >
          <FaList className="me-3" />
          Todo List
        </div>

        <div
          onClick={() => navigate("/create")}
          className={`mt-3 py-2 d-flex align-items-center ps-4 ${
            location.pathname == "/create" && "bg-secondary"
          }`}
        >
          <FaList className="me-3" />
          Create Todo{" "}
        </div>
        <div onClick={handleLogout} className={`lo mt-3 py-2 d-flex align-items-center ps-4 ${location.pathname == '/logout' && "bg-danger"}`}><FaList className="me-3"/>
        Logout</div>
        </div>
        <div className="w-100">
        <div 
        className=" header d-flex justify-content-between align-items-center bg-secondary text-light w-100 p-2 py-3 rounded-bottom-3">
          Todo App
        <img 
        onClick={()=>setShowDrop(!showDrop)} 
        src={imageUrl||userIcon}
         alt="user-proof"
          width={40} 
          height={34}
           className="rounded-circle btn p-0 "
           style={{aspectRatio:'1:1'}}/>
           {showDrop&&<div className="settings">
            <div onClick={()=> setShowProfile(true)} className="s-item">Profile</div>
            <div onClick={()=> handleLogout()} className="s-item">Logout</div>
            </div>}
        </div>
        <Outlet />
      </div>
      <Modal
      show={showProfile}
      centered
      size="md"
      onHide={()=>setShowProfile(false)}
      >
        <Profile  {...{ pass1,setPass1,pass2,setPass2,setShowProfile,showProfile,user,setUser,imageUrl,setImageUrl}}/>
      </Modal>
    </div>
  );
};
