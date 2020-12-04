import logo from './logo.svg';
import './App.css';
import MainPage from  './components/mainpage.js'
import LoginPage from  './components/loginpage.js'
import ReportPage from './components/reportpage.js'
import UserPage from './components/userpage.js'

import {
  Redirect,
  HashRouter,
  Route,
} from "react-router-dom";
import RegisterPage from './components/registerpage';
import axios from 'axios';
import React, { useState } from 'react';
function App() {
  const [isLogin, setIslogin] = useState(true);
  function IsLogin(){
      console.log('check login')
      axios.get('http://localhost:9000/api/user/IsLogin').then((Response)=>{
            if (Response.data){
              setIslogin(true)
            }
            else{
              setIslogin(false)
            }
      })
  }
  return (
      <HashRouter>
         <Route exact  path="/" >
          
           {isLogin? <MainPage></MainPage>:  <Redirect to ='/login'></Redirect>}
          
         </Route>
         <Route   path="/login" component={LoginPage}>
         </Route>
         <Route   path="/register" component={RegisterPage}>
         </Route>
         <Route   path="/report" component={ReportPage}>
         </Route>
         <Route   path="/user" component={UserPage}>
         </Route>
      </HashRouter>
    
    
  );
}

export default App;
