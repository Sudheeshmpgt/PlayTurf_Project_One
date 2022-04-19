
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminHome from './Pages/AdminHome'
import AdminLogin from './Pages/AdminLogin';
import Userpage from './Pages/Userpage';
import Userupdate from './Components/Admin/Userupdate';
import Turfpage from './Pages/Turfpage';
import Turfadd from './Components/Admin/Turfadd';
import Turfupdate from './Components/Admin/Turfupdate';
import Turf from './Pages/Turf';
import Turfview from './Pages/Turfview';
import Categorypage from './Pages/Categorypage';
import Categoryadd from './Components/Admin/Categoryadd';
import Categoryupdate from './Components/Admin/Categoryupdate';



function App() {
  
  return (
   <Routes>
     <Route path='/' element={<Home/>}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path='/signup' element={ <SignUp/>}/> 
     <Route path='/adminlogin' element={ <AdminLogin/>}/> 
     <Route path='/adminhome' element={ <AdminHome/>}/> 
     <Route path='/userpage' element={ <Userpage/>}/> 
     <Route path='/userupdate' element={ <Userupdate/>}/> 
     <Route path='/turfpage' element={ <Turfpage/>}/> 
     <Route path='/turfadd' element={ <Turfadd/>}/> 
     <Route path='/turfupdate' element={ <Turfupdate/>}/>
     <Route path='/turf' element={ <Turf/>}/>  
     <Route path='/turfview' element={ <Turfview/>}/> 
     <Route path='/categorypage' element={ <Categorypage/>}/>
     <Route path='/categoryadd' element={ <Categoryadd/>}/>
     <Route path='/categoryupdate' element={ <Categoryupdate/>}/>
   </Routes>
  );
}

export default App;
