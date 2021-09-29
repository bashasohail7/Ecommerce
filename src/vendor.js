import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { RegisterLink } from './styledcomponents';

const Vendor=()=>{
    var forgottenid;
     const[username,pickusername]=useState("");
    // const[forgottenid,updatefid]=useState(0);
    const[pass,pickpassword]=useState("");
    const[loginmsg,updateloginmsg]=useState("")

    const login=()=>{
        updateloginmsg("Please wait.....");
        var loginstatus=false;
        var url="http://localhost:3003/vendorlist";
        axios.get(url).then(response=>{
        for(var i=0;i<response.data.length;i++){
                var vemail=response.data[i].email;
                var vpass=response.data[i].password;
                if(username===vemail && pass===vpass){
                    updateloginmsg("success.....");
                    loginstatus=true;
                    localStorage.setItem("name",response.data[i].vendorname);
                    localStorage.setItem("id",response.data[i].id);
                    window.location.href="http://localhost:3000/#/";
                    window.location.reload();
                    break;
                }}
                if(loginstatus==false){
        updateloginmsg("Login failed.....");}
           })
    }
    const togglePass=()=>{
        var pass=document.getElementById("password");
        if(pass.type==="password"){
            pass.type='text'
            document.getElementById("passicon").classList.remove('fa-eye')
            document.getElementById("passicon").classList.add('fa-eye-slash')
        }
        else{pass.type="password"
             document.getElementById("passicon").classList.add('fa-eye')
            document.getElementById("passicon").classList.remove('fa-eye-slash')
     }
    }
    const forgot=()=>{
        // window.location.href=
        axios.get("http://localhost:3003/vendorlist")
        .then(response=>{for(var i=0;i<response.data.length;i++){
            if(username===response.data[i].email){
                forgottenid= response.data[i].id;
                localStorage.setItem("id",response.data[i].id);
           window.location.href="http://localhost:3000/#/forgot" 
            }
        }})
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 ">
                    <div className="bg-light p-3 rounded">
                        <h3>User Login</h3>
                        <hr />
                        <p style={{color: "red"}}>{loginmsg}</p>
                          <div className="mb-3">
                            <label >Email Id</label>
                            <input type="email" onChange={obj=>pickusername(obj.target.value)} className="form-control" />
                          </div>
                          <label >Password</label>
                          <div className="input-group mb-3">
                            <input type="password" onChange={obj=>pickpassword(obj.target.value)} id="password" className="form-control" />
                                <div className="input-group-append"><i onClick={togglePass} id="passicon" className="input-group-text  fa fa-eye"></i></div>
                          </div>
                          <div className="text-center">
                              <button className="btn btn-warning" onClick={login} type="button">Login</button> &nbsp; &nbsp;&nbsp;
                              <RegisterLink  onClick={forgot}  style={{cursor: "pointer"}}>Forgot password ?</RegisterLink>
                          </div>
                    </div>
                </div>
                <div className='text-center'>
                <RegisterLink to ="/register"  >New to Bluedot, Register here</RegisterLink>
                

                </div>
            </div>
        </div>
    )
}
export default Vendor