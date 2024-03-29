import React, { useEffect, useState } from "react";
import { Form} from "react-bootstrap";
import userProfile from "../../assets/icons/profile/profile.png"
import { userUserServices } from "../../services/userServices";
import Swal from "sweetalert2";
import { URL} from '../../url/useAxios.js'


export const Profile = (props) =>{
  const {setShowProfile, user,setUser,imageUrl,setImageUrl, pass1,setPass1,pass2,setPass2} = props
  
  const [err, setErr]= useState(false);
  const {putUser}= userUserServices()

    const handleChange = (e)=>{
    if(e.target.value == "")
    setUser({...user,[e.target.name]:null})
  else
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleEdit = async (e) =>{
    e.preventDefault()
    if(pass1 && pass2 && pass1 !==pass2){
      setErr("password not equal")
      return 0
    }else if(err){
      setErr(false)
    }
    try{
      const {id,...SubmitData} =user;
      let data = new FormData();
      data.append("username",SubmitData.username);
      data.append("email",SubmitData.email);
      data.append("image",SubmitData.image);
      if (pass1 && pass2 && pass1=== pass2)
      data.append("password",pass1);
   

      const response =await putUser(data)
      if (response.success){

        Swal.fire('Success',"User upadted",'success')
        setShowProfile(false)
      }
    }catch(err){
  
      Swal.fire('Failed',err?.response?.data?.message||
      "user upadation failed",'error');
    }

  };
  const handleFileInput =(e) =>{
    console.log(e.target.files)
    setUser({...user,image: e.target.files[0] })
    setImageUrl(window.URL.createObjectURL(e.target.files[0]))
  }

  

    return(
        <form onSubmit={handleEdit}> 
            <div className=" bg-dark p-2 text-light rounded-top-2">Profile</div>
            <div className="p-2 text-center justify-content-center row mx-0">       
                <div>
                <label for="userIcon">
                <img src={imageUrl || userProfile} 
                width={100} alt="user-icon"  />
                </label>
                <input type="file" id="userIcon"className="d-none" onChange={handleFileInput} />
                </div>
                <Form.Group className="d-flex align-items-center gap-3 col-8 mt-4">
                  <Form.Label className="col-3 text-start ">Username</Form.Label>  
                <Form.Control 
                onChange={handleChange}
                value={user?.username|| ''}
                type="text"
                name="name"
                required
                />
                </Form.Group>
                <Form.Group className="d-flex align-items-center gap-3 col-8 mt-4">
                  <Form.Label className="col-3 text-start ">Email</Form.Label>  
                <Form.Control 
                onChange={handleChange}
                value={user?.email|| ''}
                type="text"
                name="email"
                required
                />
                </Form.Group>
                <Form.Group className="d-flex align-items-center gap-3 col-8 mt-4">
                  <Form.Label className="col-3 text-start ">Password</Form.Label>  
                <Form.Control 
                onChange={(e)=>setPass1(e.target.value)}
                value={pass1||""}
                type="text"
                name="password"
                required
                />
                </Form.Group>
                <Form.Group className="d-flex align-items-center gap-3 col-8 mt-4">
                  <Form.Label className="col-3 text-start ">Confirm Password</Form.Label>  
                <Form.Control 
                onChange={(e)=>setPass2(e.target.value)}
                value={pass2|| ""}
                type="text"
                name="password"
                required
                />
                </Form.Group>
                {err&&<span>{err}</span>}
                {/* <Form.Group className="d-flex align-item-center gap-3 col-8 mt-4">
                  <Form.Label className="col-3 text-start ">Password</Form.Label>  
                <Form.Control type="text"/>
                </Form.Group> */}
            </div>
            <div className=" p-2 d-flex justify-content-center my-3 gap-2">
                <div type="cancel" onClick={()=>setShowProfile(false)} className="bg-dark col-2 btn btn-sm text-light text-center">Close</div>
                <button className="bg-dark col-2 btn btn-sm text-light ">Save</button>
            </div>
        </form>
        
    );
};