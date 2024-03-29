import './App.css';
import { BrowserRouter, Route, Routes ,Navigate,Outlet} from 'react-router-dom';
import { Register } from './pages/register/Register';
import { Layout} from './components/Layout'
import { Home} from './home/Home'
import { CreateTodo} from './pages/create/CreateTodo'
import { ForgotPass } from './pages/forgotpass/ForgotPass';



function App() {
  const Auth = () =>{
    const login = localStorage.getItem('login')
    return login ? <Outlet/>: <Navigate to="/login"/>
  }
  return (
  <BrowserRouter>
    <Routes>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Register/>}/>
       <Route path='/forgot-pass' element={<ForgotPass/>}/>
       <Route element={<Auth/>}>
       <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/create' element={<CreateTodo/>}/>
        </Route>
        </Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App;
