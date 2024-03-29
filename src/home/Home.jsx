import React, { useState } from "react";
import './home.css'
import { CreateTodoList } from "./components/CreateTodoList";

 
export const Home = () =>{

    const [params,setParams] = useState('incomplete')
    

    return(
    <div>
        <div className="header-bar bg-light">
            Todo List</div>
            <div className="filter-todo p-4">
                <select value={params} className="btn btn-secondary" onChange={(e)=>setParams(e.target.value)}>
                  <option value="all">All</option>  
                    <option value="complete">Complete</option>
                    <option value="incomplete">NotComplete</option>
                    <option value="inprogress">InProgress</option>
                </select>
                 </div>

                 <div className="todo-body p-3 bg-light rounded-2 m-3">
                    <CreateTodoList params={params}/>
                    </div>
                    </div>
    );

};