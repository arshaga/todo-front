import React, { useEffect, useState } from "react";
import {FaRegEdit} from "react-icons/fa"
import {useLocation} from "react-router-dom";
import { useTodoServices } from "../../services/todoServices";
import Swal from "sweetalert2";

 
export const CreateTodoList = (props) =>{
    const { createTodo,setCreateTodo,submit,params} = props
    const [todoList, setTodoList] = useState([])
    const [searchedList,setSearchedList] =useState([]);
    const {getTodoList,putTodoList} = useTodoServices()


  


    useEffect(()=>{
        let tempList = todoList
        if(params != 'all'&& params){
            tempList =todoList.filter(data=>{
            return data.status == params;
            });
        }
        setSearchedList(tempList)
    },[params,todoList])

    useEffect(()=>{
        getData()
    },[submit])

    const getData = async() =>{
        try{
             const response =await getTodoList()
             if(response.success)
             setTodoList(response.data)
        }catch(err){}
    }


    const location =useLocation()

    const handleEdit =(data) =>{
        setCreateTodo({
            id:data._id,
            title:data.title,
            message:data.message,
            status:data.status,
        });
    };

    const handleEditStatus = async(value,id)=>{
        try{
            const response = await putTodoList(id,{status:value})
            if(response.success)
            Swal.fire({
                title:"Success",
                text:"Status edit successfully",
                icon:"success",
               showConfirmButton:false,
               timer:1000

        })
        getData()
        }catch(err){
            Swal.fire('Error',"Failed to update status",'error')
        }
    }
    

    return(
        <div className={`todo-list-table-cont ${location.pathname=="/"&&"big"}`}>
    <table className="todo-list table">
                        <thead>
                            <tr>
                                <th width="500">Title</th>
                                <th width="500">Message</th>
                                <th>Status</th>
                                {location.pathname == "/create"&& <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {searchedList?.length>0 ?
                            searchedList.map((data,i)=>(
                             <tr key={i}>
                               <td><div className="td-data rounded-1">{data.title ||''}</div></td>
                               <td><div className="td-data rounded-1">{data.message ||''} </div></td> 
                               <td>
                                <div className={`td-data ${
                                    location.pathname !== "/creat" && "rounded-1"
                                }`}
                                >
                                
                                <select value={data.status||''}
                                onChange={(e)=>handleEditStatus(e.target.value,data._id)}
                                >
                                    <option value={'complete'}>COMPLETE</option>
                                    <option value={'incomplete'}>INCOMPLETE</option>
                                    <option value={'inprogress'}>INPROGRESS</option>
                                    </select></div>
                               </td>

                               {location.pathname == "/create" &&
                               <td>
                                <div className="td-data rounded-end-2 text-center h-100">
                                <FaRegEdit onClick={() => handleEdit(data)} size={18}/></div>

                               </td>}
                               </tr>
                            ))
                            :<tr><td colSpan={5} className="fs-5 text-center">
                                <div className="td-data">No Task Created Yet</div></td></tr>
                            }
                        </tbody>
                    </table>
                    </div>
    );

};