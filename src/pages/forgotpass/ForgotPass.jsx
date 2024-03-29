import React, { useState } from "react";
import Swal from "sweetalert2";
import { userUserServices } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const ForgotPass=()=>{

    const [email,setEmail] =useState(null)
    const [loading,setLoading] =useState(false)

    const {forgotPass} =userUserServices();
    const navigate = useNavigate()

    const handleSubmit =async (e)=>{
        try{
            e.preventDefault()
            setLoading(true)
            const response = await forgotPass({email:email})
            if(response.success){
                setLoading(false)
                Swal.fire({
                    title:"Success",
                    text:"Email send Successfully.",
                    showConfirmButton:false,
                    timer:1300,
                
                })
        
            }
        }catch(err){}
    };

return(
    <div className="main-body">
        <div className="register-cont p-4 text-center rounded-1">
            Forgot Password
            <div className="pb-3 row mx-0 gap-3 mt-5">
                <div className="col-3 px-0">Email:</div>
                <input
                    text="text"
                    value={email|| ''}
                    className="col-8 px-2"
                    onChange={(e) =>setEmail(e.target.value)}
                    />
            </div>
            <div className ="row mx-0">
            <span className={`${!loading && "invisible"}`}>Loading pls wait</span>
            <button
            disabled={loading}
            className="btn py-0 bg-primary text-white mt-4"
            onClick={handleSubmit}
            >
                Submit
                </button>
                
          </div>
        </div>
    </div>
);
};