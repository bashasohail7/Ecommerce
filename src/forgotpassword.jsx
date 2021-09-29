import React,{useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router';

const Forgot=(props)=>{
    const { userid } = useParams();
 
    const[prev,updateprev]=useState([])
    const[fname,updatefname]=useState("")

    const[pass,updatePass]=useState("")
    const[repass,updateRePass]=useState("")
    const toggle1=()=>{
        var pass=document.getElementById("password");
        var icon= document.getElementById("passicon1")
        if(pass.type==="password"){
            icon.classList.add("fa-eye-slash")
            icon.classList.remove("fa-eye")
            pass.type="text"
        }
        else{
            icon.classList.remove("fa-eye-slash")
            icon.classList.add("fa-eye")
            pass.type="password"
        }
    }
    const toggle2=()=>{
        var pass=document.getElementById("repassword");
        var icon= document.getElementById("passicon2")

        if(pass.type==="password"){
            icon.classList.add("fa-eye-slash")
            icon.classList.remove("fa-eye")
            pass.type="text"
        }
        else{
            icon.classList.remove("fa-eye-slash")
            icon.classList.add("fa-eye")
            pass.type="password"
        }
    }
    const reset=()=>{
        var userid=localStorage.getItem("id");
        if(pass===repass){
        axios.patch("http://localhost:3003/vendorlist/"+userid,{password:pass})
        .then(res=>{alert("Password updated succesfully") 
                    window.location.href="http://localhost:3000/#/login"   })
        }
    else alert(0)
    }
    return(
        <div className="container">
            <p>{localStorage.getItem("id")}</p>
            <div className="row mt-5 mt-4">
                <div className="col-lg-4"></div>
                <div className="col-lg-4 ">
                    <h2>Password Reset</h2><hr />
                    <label >Email</label>
                    <input type="email" />
                <div className="mb-3">
                            <label >Password</label>
                          <div className="input-group">
                            <input  type="password" id="password" onChange={obj=>updatePass(obj.target.value)} className="password form-control" />
                            <div className="input-group-append"><i  id="passicon1" onClick={toggle1} className="input-group-text  fa fa-eye"></i></div>
                          </div>
                </div>
                <div className="mb-3">
                            <label >Confirm-Password</label>
                          <div className="input-group">
                            <input  type="password" id="repassword" onChange={obj=>updateRePass(obj.target.value)} className="password form-control" />
                            <div className="input-group-append"><i onClick={toggle2}  id="passicon2" className="input-group-text  fa fa-eye"></i></div>
                          </div>
                </div>
                <div className="mb-3 text-center">
                      <button onClick={reset} className="btn btn-primary"  type="button">Reset</button>
                </div>
                <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}
export default Forgot