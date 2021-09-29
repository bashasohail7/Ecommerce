import React from 'react';
import { HashRouter,Route } from 'react-router-dom';
import Vendor from './vendor';
import Dashboard from './dashboard';
import Register from './register';
import Home from './home';
import './App.css'
import Forgot from './forgotpassword';
import Cart from './cart';
import Footer from './footer';

function App() {
  if(localStorage.getItem("id")==null){
   return(
    <HashRouter>
      
    <Route exact path ="/" component={Home}/>
    <Route  path ="/login" component={Vendor}/>
    <Route  path ="/register" component={Register}/>
    <Route  path ="/forgot" component={Forgot}/>
    {/* <Route  path ="/cart" component={Cart}/> */}


    </HashRouter>)
  }
  else{
   return(<HashRouter>
    <Route exact path ="/" component={Home}/>
    <Route  path ="/cart" component={Cart}/>

                 <Route exact path ="/login" component={Vendor}/>
                  <Route  path ="/register" component={Register}/>
    <Route  path ="/forgot" component={Forgot}/>

          </HashRouter>)}
 
}

export default App;
