
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminHome from './Pages/AdminHome'
import AdminLogin from './Pages/AdminLogin';
import Userpage from './Pages/Userpage';
import Turfpage from './Pages/Turfpage';
import Turf from './Pages/Turf';
import Turfview from './Pages/Turfview';
import Categorypage from './Pages/Categorypage';
import Userupdatepage from './Pages/Userupdatepage';
import Turfaddpage from './Pages/Turfaddpage';
import Turfupdatepage from './Pages/Turfupdatepage';
import Categoryaddpage from './Pages/Categoryaddpage';
import Categoryupdatepage from './Pages/Categoryupdatepage';



function App() {
  
  return (
   <Routes>
     <Route path='/' element={<Home/>}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path='/signup' element={ <SignUp/>}/> 
     <Route path='/adminlogin' element={ <AdminLogin/>}/> 
     <Route path='/adminhome' element={ <AdminHome/>}/> 
     <Route path='/userpage' element={ <Userpage/>}/> 
     <Route path='/userupdate' element={ <Userupdatepage/>}/> 
     <Route path='/turfpage' element={ <Turfpage/>}/> 
     <Route path='/turfadd' element={ <Turfaddpage/>}/> 
     <Route path='/turfupdate' element={ <Turfupdatepage/>}/>
     <Route path='/turf' element={ <Turf/>}/>  
     <Route path='/turfview' element={ <Turfview/>}/> 
     <Route path='/categorypage' element={ <Categorypage/>}/>
     <Route path='/categoryadd' element={ <Categoryaddpage/>}/>
     <Route path='/categoryupdate' element={ <Categoryupdatepage/>}/>
   </Routes>
  );
}

export default App;
