import axiosPrivate from "../url/useAxios"
  
export const userUserServices=()=>{

    const registerUser = async (data)=>{
        const response =await axiosPrivate
        .post('/user/reg',data)
        return response.data
    }

    const loginUser = async (data)=>{
        const response = await axiosPrivate
        .post('/user/login',data)
        return response.data
    }

    const getUser = async ()=>{
        const response = await axiosPrivate
        .get('/user/getuser')
        return response.data
    }
    const putUser = async (data)=>{
        const response = await axiosPrivate
        .put('/user/putuser',data)
        return response.data
    }
    const logoutUser = async ()=>{
        const response = await axiosPrivate
        .post('/user/logout')
        return response.data
    }
    const forgotPass  = async (data)=>{
        const response = await axiosPrivate
        .post('/user/forgotpass',data)
        return response.data
    }

    return{
        registerUser,
        getUser,
        loginUser,
        putUser,
        logoutUser,
        forgotPass
    }

}

