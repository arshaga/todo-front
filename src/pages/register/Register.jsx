import React, { useState } from 'react'
import './register.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import axiosPrivate from '../../url/useAxios';
import { userUserServices } from '../../services/userServices';


export const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errMessage,setErrMessage] =useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const {registerUser, loginUser}= userUserServices()

    const handleRedirection = () => {
        if (location.pathname == '/login') {
            navigate('/register');
        } else {
            navigate("/login");
        }
    };

    const handleSubmit   = async (e) =>{
        e.preventDefault()
        try{
            let response 
            
                const data ={
                username:username,
                password:password
            };
            if (location.pathname== "/register")
            response =await registerUser(data);
        else{
            response =await loginUser(data);
        }

        if(response.success){

            if (location.pathname=="/register")
            navigate('/login');
        else{
            localStorage.setItem("login",true)
            navigate('/')
        }
        setErrMessage(false);
        }else{
            setErrMessage(response.data.message);
        }
    }catch(err){
        console.log(err);
        setErrMessage(err?.response?.data?.message);
    }
    };

    return (
        <div className='main-body'>

            <div className='register-cont p-4 text-center rounded-1'>
                {location.pathname == "/login" ? "Login" : "Register"}
                <div className='pb-3 row mx-0 gap-3 mt-5'>
                    <div className='col-3 px-0'>Username:</div>
                    {/* <div className='pb-3 row px-0 gap-3 mt'> */}
                        <input
                            type='text'
                            className='col-8 px-0'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='row mx-0 gap-3'>
                        <div className='col-3 px-0'>Password:</div>
                        <div className='col-8 px-0 position-relative'>
                        <input
                            type={showPass ? "text" : "password"}
                            className='w-100'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPass ?
                            <BsEyeSlashFill onClik={() => setShowPass(!showPass)}
                                className="position-absolute col-1 px-0"
                                style={{ right: "10px", top: "6px" }}
                            /> :
                            <BsEyeSlashFill onClik={() => setShowPass(!showPass)}
                                className="position-absolute col-1 px-0"
                                style={{ right: "10px", top: "6px" }}
                            />}
                    </div>
                    <div className='btn border-0' onClick={()=>navigate('/forgot-pass')}>Forgot 
                    password</div>

                    <div className={ `${!errMessage?"invisible":"visible"}text-danger`}>{errMessage||''}</div>
                    <div className="btn col-12 border-0" onClick={handleRedirection}>
                        go to {location.pathname == "/login" ? " Register " : " Login "}page
                    </div>
                    <div className='btn py-0 bg-primary text-white mt-4' onClick={handleSubmit}>
                        {location.pathname == "/login" ? "Login" : "Register"}
                    </div>
                </div>
            </div>
        </div>
    );
};
