import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Footer from './footer';
import { Link } from 'react-router-dom';
const Cart=()=>{
    var total=0;
    const[cartproducts,updatecartproducts]=useState([])//! Dont forget to put square brackets if ur using it for multiDimeniosnl Arrays
    const getCartItems=()=>{
        axios.get("http://localhost:3001/myorder/")
                .then(response=>{updatecartproducts(response.data)
                                })
                            }
    const dlt=(id,name)=>{
       if( window.confirm(`Are you sure to remove ${name}  from cart ?`)){
           axios.delete("http://localhost:3001/myorder/"+id)
           .then(response=>{
               getCartItems()
           })
       }
    }                        
useEffect(()=>{getCartItems()},[true])
    return(
    <>
    <h1 style={{"fontFamily": "'Permanent Marker', cursive","textAlign": "center","letterSpacing": "0px"}}>Blue Dot</h1>
    <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 text-end">
        <Link to ="/" className="btn btn-outline-success  mb-4" type="button">Back to Home</Link>
        </div>
        <div className="col-lg-3"></div>
        <div className="col-lg-3"></div>
        <div style={{"borderRadius": "10px"}} className="col-lg-6 py-4 container cartConatiner bg-light">
          <table cellPadding="10">
          {
               cartproducts.map((info,index)=>{
                   if(info.userid===localStorage.getItem("id")){
                 var  price=info.price;
                var priceInt=  price.replace(",","");
                   total+=parseInt(priceInt);
                   return(
                       <>
                       <tr key={index}>
                           <td><img className="rounded" src={info.img} alt=""  style={{"height": "50px","width": "60px"}} /></td>
                           <td ><label style={{"fontWeight":"bold"}}>{info.name}</label>
                           <br /><small>{info.desc}</small>
                           </td>
                           <td>Rs.{info.price}</td>
                           <td><i  onClick={dlt.bind(this,info.id,info.name)} className="fa text-danger fa-trash-alt"></i></td>
                       </tr>
                       </>
                   )
               }})
           }
           <tr>
               <td></td>
               <td></td>
               <th colSpan="4" className="border-top">Total : Rs.{total.toLocaleString('en-UK')}</th>
           </tr>
          </table>
        </div>
        <div className="col-lg-3"></div>
        <br />
        <div className="text-center">
            <Link to="/buy" className="btn btn-primary" style={{boxShadow: "1px 2px 3px grey"}} type="button">Proceed to Buy</Link>
        </div>
    </div>
    </>
    )
}
export default Cart;