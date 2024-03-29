import axiosPrivate from "../url/useAxios"

export const useTodoServices =() =>{

    const postTodoList =async (data) =>{
        const response = await axiosPrivate.post('todo/additem',data)
       return response.data
    }

    const putTodoList = async (id,data)=> {
        const response =await axiosPrivate.put('todo/update/'+id,data)
        return response.data
      }
      const getTodoList = async (data)=> {
        const response =await axiosPrivate.get('todo/gettask')
        return response.data
      }
    return{
       postTodoList,
       putTodoList,
       getTodoList,
       
    }
}