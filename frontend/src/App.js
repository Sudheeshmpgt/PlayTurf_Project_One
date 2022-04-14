
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Components/User/Home';
import Login from './Components/User/Login';
import SignUp from './Components/User/SignUp';
import AdminHome from './Components/Admin/AdminHome'
import AdminLogin from './Components/Admin/AdminLogin';
import Userpage from './Components/Admin/Pages/UserPage/Userpage';
import Userupdate from './Components/Admin/Pages/UserPage/Userupdate';
import Turfpage from './Components/Admin/Pages/TurfPage/Turfpage';
import Turfadd from './Components/Admin/Turfadd';
import Turfupdate from './Components/Admin/Turfupdate';

function App() {
  
  return (
   <Routes>
     <Route exact path='/' element={<Home/>}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path='/signup' element={ <SignUp/>}/> 
     <Route path='/adminlogin' element={ <AdminLogin/>}/> 
     <Route path='/adminhome' element={ <AdminHome/>}/> 
     <Route path='/userpage' element={ <Userpage/>}/> 
     <Route path='/userupdate' element={ <Userupdate/>}/> 
     <Route path='/turfpage' element={ <Turfpage/>}/> 
     <Route path='/turfadd' element={ <Turfadd/>}/> 
     <Route path='/turfupdate' element={ <Turfupdate/>}/> 
   </Routes>
  );
}

export default App;
