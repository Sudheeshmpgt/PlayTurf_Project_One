
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
import UserAccountPage from './Pages/UserAccountPage';
import UserEditPage from './Pages/UserEditPage';
import Bannerpage from './Pages/Bannerpage';
import Banneraddpage from './Pages/Banneraddpage';
import Bannerupdatepage from './Pages/Bannerupdatepage'
import Bookingconfirmationpage from './Pages/Bookingconfirmationpage';
import Mybookingpage from './Pages/Mybookingpage';
import Bookingpage from './Pages/Bookingpage';
import Myfavouritespage from './Pages/Myfavouritespage';
import Offerpage from './Pages/Offerpage';
import Offeraddpage from './Pages/Offeraddpage';
import Offerupdatepage from './Pages/Offerupdatepage';
import Admindashboard from './Pages/Admindashboard';
import Changepasswordpage from './Pages/Changepasswordpage';
import Successpage from './Pages/Successpage';
import Couponpage from './Pages/Couponpage';
import Couponaddpage from './Pages/Couponaddpage';
import Couponupdatepage from './Pages/Couponupdatepage';



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
     <Route path='/account' element={ <UserAccountPage/>}/>
     <Route path='/useredit' element={ <UserEditPage/>}/>
     <Route path='/bannerpage' element={ <Bannerpage/>}/>
     <Route path='/banneradd' element={ <Banneraddpage/>}/> 
     <Route path='/bannerupdate' element={ <Bannerupdatepage/>}/> 
     <Route path='/bookingpage' element={ <Bookingconfirmationpage/>}/> 
     <Route path='/bookings' element={ <Mybookingpage/>}/>
     <Route path='/adminbookingpage' element={ <Bookingpage/>}/>  
     <Route path='/favourites' element={ <Myfavouritespage/>}/>  
     <Route path='/offerpage' element={ <Offerpage/>}/> 
     <Route path='/offeradd' element={ <Offeraddpage/>}/>  
     <Route path='/offerupdate' element={ <Offerupdatepage/>}/>  
     <Route path='/dashboard' element={ <Admindashboard/>}/>  
     <Route path='/updatedata' element={ <Changepasswordpage/>}/>  
     <Route path='/preview' element={ <Successpage/>}/> 
     <Route path='/couponpage' element={ <Couponpage/>}/>
     <Route path='/couponadd' element={ <Couponaddpage/>}/>  
     <Route path='/couponupdate' element={ <Couponupdatepage/>}/> 
   </Routes>
  );
}

export default App;
