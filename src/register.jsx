import React,{useState} from 'react'
import axios from 'axios'

import { RegisterLink } from './styledcomponents';
import { useEffect } from 'react/cjs/react.development';

export default function Register() {
          const[login,updateLogin]=useState("")
          const[repassMsg,updaterepassMsg]=useState("")
          const[user,setuser]=useState({fullname:"",mobile:"",email:"",password:"",repassword:"",state:"",city:"",pincode:"",address:""})
          const[error,errorlist]=useState({nameError:"",mobileError:"",emailError:"",passwordError:"",stateError:"",cityError:"",pincodeError:"",addressError:""})
          const newReg=(obj)=>setuser({...user,[obj.target.name]:obj.target.value})
          const borderRed=(id)=>document.getElementById(id).style.border="1px solid red"
          const borderNone=(id)=>document.getElementById(id).style.border=""


         const getdata=()=>{
            var url="http://localhost:3002/state_dist"
            var state="<option name='states' value=''>Choose a state</option>";
            axios.get(url).then(res=>{
                for(var i=0;i<res.data.length;i++){
                         state+="<option value="+res.data[i].id+">"+res.data[i].name+"</option>"
                }
                document.getElementById('states').innerHTML=state;
            })
        }
       const dist=()=>{
            var url="http://localhost:3002/state_dist";
            var stateid=document.getElementById('states').value;
          
            var dist="<option  value='' >Choose a district</option>";
      axios.get(url).then(res=>{
    // alert(res.data[stateid].id)
        for(var i=0;i<res.data[stateid].districts.length;i++){
                 dist+="<option  >"+res.data[stateid].districts[i].name+"</option>"
        }
        document.getElementById('dist').innerHTML=dist;
    })
        }
useEffect(()=>{getdata()},[true])

        
        const register=()=>{
          
          let mpattern = /^[6-9]\d{9,11}$/;
          let epattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

          if((!user.fullname || user.fullname=="")||! mpattern.test(user.mobile)||! epattern.test(user.email)||(!user.state||!user.state=="")||(!user.city||!user.city=="")||document.getElementById('password').value!=document.getElementById('repassword').value){
            if( !user.fullname || user.fullname==""){borderRed('Name');error.nameError ="Please Enter ur Name !"}
            else{error.nameError ="";borderNone('Name')}
 
            if( ! mpattern.test(user.mobile)){error.mobileError="Please enter valid mobile number !";borderRed('mobile')}
            else{error.mobileError="";borderNone('mobile')}
    
            if( !epattern.test(user.email)){error.emailError="Please enter valid emailid !";borderRed('email')}
            else{error.emailError="";borderNone('email')}

              if(document.getElementById('password').value!=document.getElementById('repassword').value)updaterepassMsg("Passwords not matching !")
           
          }
              else { 
              var data={"vendorname":user.fullname,"email":user.email,"mobile":user.mobile,"password":user.password,"state":user.state,"city":user.city,"pincode":user.pincode,"address":user.address};
              var url="http://localhost:3003/vendorlist";
              axios.post(url,data)
              alert('Registration succesfull,can login now')
              updateLogin("login")
              document.getElementById("login").classList+= " btn btn-primary"

              }
        }
       const togglePass=()=>{
           var pass=document.getElementById("password");
           if(pass.type==="password"){
               pass.type='text'
               document.getElementById("passicon1").classList.remove('fa-eye')
               document.getElementById("passicon1").classList.add('fa-eye-slash')
           }
           else{pass.type="password"
                document.getElementById("passicon1").classList.add('fa-eye')
               document.getElementById("passicon1").classList.remove('fa-eye-slash')
        }
       }
       const togglePass2=()=>{
        var repass=document.getElementById('repassword')
        if(repass.type==="password"){
            repass.type='text'
            document.getElementById("passicon2").classList.remove('fa-eye')
            document.getElementById("passicon2").classList.add('fa-eye-slash')
        }
        else{repass.type="password"
             document.getElementById("passicon2").classList.add('fa-eye')
             document.getElementById("passicon2").classList.remove('fa-eye-slash')
     }
       }
    
    return (
        <div className="row">
            <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="bg-light p-3 rounded">
                        <h3 > Registration</h3>
                        <hr />
                        <div className="mb-3">
                            <label >User Name</label>
                            <input name="fullname" id="Name" onChange={newReg} type="name" className="form-control" />
                            <small style={{color: 'red'}}>{error.nameError}</small>
                        </div>
                        <div className="mb-3">
                            <label >Contact Number</label>
                            <input name="mobile"type="number" id="mobile"  onChange={newReg} className="form-control" />
                            <small style={{color: 'red'}}>{error.mobileError}</small>
                        </div>
                        <div className="mb-3">
                            <label >Email Id</label>
                            <input name="email"  type="email" id="email" onChange={newReg} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label >Password</label>
                          <div className="input-group">
                            <input name="password"  type="password" onChange={newReg} id="password" className="password form-control" />
                            <div className="input-group-append"><i onClick={togglePass} id="passicon1" className="input-group-text  fa fa-eye"></i></div>
                          </div>
                        </div>
                        <div className="mb-3">
                            <label >Re-Password</label>
                          <div className="input-group">
                            <input name="repassword"  type="password" onChange={newReg} id="repassword" className="form-control" />
                            <div className="input-group-append"><i onClick={togglePass2} id="passicon2" className="input-group-text  fa fa-eye"></i></div>
                          </div>
                          <small style={{color: "red"}}>{repassMsg}</small>
                        </div>
                        <div className="mb-3" style={{display: "flex",justifyContent: "space-between"}}>
                        
                           <div className="row mb-3">
                                <label>State  </label>
                                <div>
                                <select className='form form-control' name='states'  onChange={dist}  id='states'>
                                    <option  value="">Choose state</option>
                                </select>
                                </div>
                            </div>
                         
                           <div className="row mb-3">
                                <label>District </label>
                                <div>
                                <select  id='dist' className='form form-control'>
                                    <option value="">First select a State </option>
                                </select>
                                </div>
                            </div>
                          
                        </div>
                        <div >
                        <small style={{color: 'red'}}>{error.stateError}</small><small style={{color: 'red'}}>{error.cityError}</small>
                        </div>
                        <div className="mb-3">
                            <label >Pincode</label>
                            <input name="fullname" id="Name" onChange={newReg} type="number" className="form-control" />
                            <small style={{color: 'red'}}>{error.pincodeError}</small>
                        </div>
                        <div className="mb-3 input-group">
                        <label >Address</label> &nbsp; &nbsp; &nbsp;
                          <textarea  onchange ={newReg} style={{boxShadow: "1px 2px 2px grey"}} className="form-control form-control-color-dark" name="" id=""  rows="5"></textarea>
                          <small style={{color: 'red'}}>{error.addressError}</small>
                        </div>
                          <div className="text-center">
                          <RegisterLink onClick={register} className="btn btn-primary" type="button">Register</RegisterLink>
                              <RegisterLink to="/login"  style={{marginLeft: "10px"}}  id="login"  type="button">{login}</RegisterLink>
                          </div>
                    </div>
                  
                    <div className="col-lg-4"></div>
                </div>

         </div>
        
    )
}
