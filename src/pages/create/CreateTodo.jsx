import React,{useState} from 'react'
import './create.css'
import { Form } from 'react-bootstrap'
import { CreateTodoList } from '../../home/components/CreateTodoList'
import { useTodoServices } from '../../services/todoServices'
import Swal from 'sweetalert2'

export const CreateTodo = () =>{
     const [createTodo,setCreateTodo] = useState({
        title:null,
        message:null,
        status:'notComplete',
     })
     const [submit,setSubmit]= useState(false)

      const handleChange = (e) =>{
        if(e.target.value == ""){
            setCreateTodo({...createTodo,[e.target.name]:null})
        }else{
            setCreateTodo({...createTodo,[e.target.name]:e.target.value}) 
        }
      }
      const { postTodoList , putTodoList} = useTodoServices()

      const handleSubmit =async (e) =>{
        e.preventDefault()
        try{
            let response
            if(createTodo.id)
             response = await putTodoList(createTodo.id,createTodo)
            else
            response =await postTodoList(createTodo)

            if(response.success){
                Swal.fire('Successfully added','Todo list','success')
                handleReset()
                setSubmit(!submit)
            }else{
                Swal.fire('Failed','Failed to create Todo list','error')
            }
        }catch(err){
            Swal.fire('Failed','Failed to create Todo list','error')
        }
      }
 const handleReset =() =>{
    setCreateTodo({
        title:null,
        message:null,
        status:'notComplete',
    })

}


    return(
        <div>
            <div className='header-bar bg-light'>Create Todo</div>
        <div className='m-3 crate-todo-form row'>
            <div className='form-title px-0'> Create Your Task Here</div>
            <div className='p=2 col-6 px-0 mb-4'>
                 <Form.Group className='row mx-0  align-items-center-start mt-2'>
                    <Form.Label className='col-4 px-0'>Title</Form.Label>
                    <div className='col-7 px-0'>
                        <Form.Control
                        onChange={handleChange}
                        type='text'
                        required
                        name="title"
                        value={createTodo.title || ''}/>
                    </div>
                 </Form.Group>
                 <Form.Group className='row mx-0  align-items-center-start mt-3'>
                    <Form.Label className='col-4 px-0'>Message</Form.Label>
                    <div className='col-7 px-0'>
                        <textarea
                         onChange={handleChange}
                         name='message'
                        rows={5}
                        className='form-control'
                        value={createTodo.message || ''}
                        />
                    </div>
                    </Form.Group>
            </div>
            <div className='p-2 col-6 px-0 mb-4'>
            <Form.Group className='row mx-0  align-items-center mt-3'>
                    <Form.Label className='col-4 px-0'>Status</Form.Label>
                    <div className='col-7 px-0'>
                        <Form.Select
                        type='select'
                        required
                        onChange={handleChange}
                        name='status'
                        value={createTodo.status || ''}
                        >
                            <option value={'complete'}>COMPLETE</option>
                            <option value={'incomplete'}>INCOMPLETE</option>
                            <option value={'inprogress'}>INPROGRESS</option>
                        </Form.Select>
                    </div>
                    </Form.Group>
                    <div className='px-0 h-100 align-items-end d-flex justify-content-end p-2'>
                        <div onClick={handleReset} className='btn btn-dark text-light col-3 rb-4 mb-4 me-2'>{"Clear"}</div>
                        <div onClick={handleSubmit} className='btn btn-dark text-light col-3 mb-4 '>{createTodo.id?"update":"Submit"}</div>
                    </div>

            </div>
            <CreateTodoList{...{createTodo,setCreateTodo,submit}}/>
         </div>
    </div>
    )
}