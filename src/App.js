import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import HomePage from './components/HomePage/HomePage';
import Model from './components/Model/Model';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Error from './components/Error/Error';
import SendCode from './components/SendCode/SendCode';
import { jwtDecode } from 'jwt-decode';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import SideBar from './components/SideBar/SideBar';
import Body from './components/Body/Body';
import User from './components/User/user';
import AddUser from './components/AddUser/AddUser';
import AddPlant from './components/AddPlant/AddPlant';
import Single from './components/Single/Single';
import Contributions from './components/Contributions/Contributions';
import Spinner from './components/Spinner/Spinner'
import './App.css';
import Update from './components/Update/Update';
import FadeLoader from "react-spinners/FadeLoader";
import UserCont from './components/UserContributions/UserCont';
import UserProfile from './components/UserProfile/UserProfile';
import Updareherbs from './components/Updateherbs/Updareherbs'
import Herbs from './components/Herbs/Herbs';
import AllContributions from './components/AllContributions/AllContributions';


const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loginData, setLoginData] = useState('');
  const [loading, setLoading] = useState(true); 
  const [loadingDashboard, setloadingDashboard] = useState(true);

  const navigate = useNavigate();
  // const [loading, setloading] = useState(false);


  function logout() {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setLoginData(null);
 
   navigate('/login')
  }



  const searchBar = (planetName) => {
    console.log('plant name in arabic :', planetName)
    if (data && data.herb) {
      console.log('data herb ',data.herb);
      let plant = data.herb.filter((item) => item.ArabicName.includes(planetName) || item.EnglishName.includes(planetName) )
      setShow(true)
      setSearchResults(plant)
    }
    console.log(searchResults)
  }

  const shouldShowNavbar = () => {
    const hiddenRoutes = [
      '/dashboard',
      '/user',
      '/contribution',
      '/addUser',
      '/addPlant',
      '/Herbs',
    ];
  
    const currentRoute = window.location.pathname;
  
    // Check if the current route is not in the hiddenRoutes array
    const isHiddenRoute = hiddenRoutes.some(route => currentRoute.startsWith(route));
  
    // Special case: '/update/:id' should hide the Navbar
    const isUpdateRoute = currentRoute.startsWith('/update/');
    const isUpdateRoute1 = currentRoute.startsWith('/Updareherbs/');
    return !isHiddenRoute && !isUpdateRoute && !isUpdateRoute1;
  };

  const fetchUserData = () => {
    if (localStorage.getItem('token')) {
      let decoded = jwtDecode(localStorage.getItem('token'));
      setLoginData(decoded);
    }
  };

  

  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://spotless-moth-rugby-shirt.cyclic.app/api/v1/herb/');
          // const response = await fetch('http://localhost:3100/api/v1/herb/');

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log("the data to fitch search", response);
          const result = await response.json();
          console.log('result is :', result.herb);
          setData(result);
          console.log('data', data)
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // setloading(true)

      // const loadingFunc =()=>{
      //   setTimeout(() => {
      //       setloading(false)
      //   },5000)
      // };

      loadingFunc();

      fetchUserData();
      fetchData(); 



  
    }, []);
    
    const loadingFunc =()=>{
        setTimeout(() => {
            setloadingDashboard(false)
        },5000)
      };
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {loading ? (<>
        <div style={{ position: 'relative', minHeight: '100vh',display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Spinner/>
            </div>
    </>  ) : (
      <div>
     { 
      <div style={{ display: show ? 'block' : 'none' }}>
        <Model setShow={setShow} setSearchResults={setSearchResults} searchResults={searchResults} setValue={setValue} />
      </div>
      }
      {shouldShowNavbar() && <Navbar logout={logout} loginData={loginData} />}

      <Routes>
      


      <Route path='*' element={<Error/>}/>
        <Route path="/" element={<ProtectedRoutes loginData={loginData} />}>
          <Route index element={<Login />} setData={fetchUserData} />
          <Route path="home" element= {<HomePage setLoading={setLoading} value={value} setValue={setValue} data={data} setShow={setShow} searchBar={searchBar} />} />
          <Route path="usercontribution" element={<UserCont />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="addPlant" element={<AddPlant />} />
          <Route path='user/:id'element={<Single/>} />
          <Route path='update/:id' element={<Update />} />
          <Route path="/profile" element={<UserProfile userData={loginData} />} />
          <Route path="/profile" element={<UserProfile userData={loginData} />} />
          <Route path='Updareherbs/:id' element={<Updareherbs />} />
          <Route path='/AllContributions' element={<AllContributions />} />
        
          <Route
          path="/dashboard"
          element={
            loadingDashboard ? (
              <>
                <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Spinner />
                </div>
              </>
            ) : (
              <>
                <div className="containerApp">
                  <SideBar logout={logout} loginData={loginData} />
                  <Routes>
                    <Route path="/" element={<Body />} />
                  </Routes>
                </div>
              </>
            )
          }
        /> 
        </Route>

        


      <Route
          path="/user"
          element={
            <div className="containerApp">
              <SideBar logout={logout} loginData={loginData} />
              <Routes>
                <Route path="/" element={<User />} />

              </Routes>
            </div>
          }
        />
        <Route
          path="/contribution"
          element={
            <div className="containerApp">
              <SideBar logout={logout} loginData={loginData} />
              <Routes>
                <Route path="/" element={<Contributions/>} />
                
              </Routes>
            </div>
          }
        />
        <Route
        path="/Herbs"
        element={
          <div className="containerApp">
            <SideBar logout={logout} loginData={loginData} />
            <Routes>
              <Route path="/" element={<Herbs/>} />
              
            </Routes>
          </div>
        }
      />


        {/* Login and related pages */}
        <Route path="login" element={<Login setData={fetchUserData} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="SendCode" element={<SendCode />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
       

      </Routes>
    </div>
 )}
    </div>
  );   
};

export default App;