import { ReactChild, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Cart from "./cart";
const Home = () => {
  // const{userid}=useParams

  var len;
  const [login, updatelogin] = useState()
  const [cartitems, updateCartitems] = useState([])
  let [cartLen, updatecartLen] = useState(0)
  const [logstatus, updatelogstatus] = useState(localStorage.getItem("name"))
  const [logoutstatus, updatelogoutstatus] = useState("")
  const [product, productlist] = useState([]);

  const loggingstatus = () => {
    if (localStorage.getItem("name") != null) {
      updatelogin("Login with other account")
      document.getElementById("login").setAttribute("target", "_self")
      updatelogoutstatus(" - Logout")
    }
    else {
      updatelogoutstatus("")
      updatelogin("Login")
      document.getElementById("logoutbtn").disabled = true
    }
  }
  var totalProduct;
  axios.get("http://localhost:3001/product")
    .then(response => {
      totalProduct = response.data
    })

  const getproducts = () => {
    axios.get("http://localhost:3001/product/")
      .then(response => {
        productlist(response.data)
      })
  }
  const getcat = (cat) => productlist(totalProduct.filter(x => x.category === cat))
  const getCartLength = () => {
    axios
      .get("http://localhost:3001/myorder")
      .then(response => {
        len = response.data.length
        response.data.map((info, index) => {
          if (info.userid === localStorage.getItem("id")) { updatecartLen(cartLen++) }
        })
        updatecartLen(cartLen++)
      })
  }
  const reload=()=>{
    // window.location.reload()
alert(1)
  }
  const cart = (index) => {
    
    var currentuserid = localStorage.getItem("id")
    var Id;
    axios.get("http://localhost:3001/myorder")
      .then(response => {

        var Data = response.data
        len = response.data.length
        for (var j = 0; j < len + 1; j++) {
          if (len === 0) Id = 1
          else Id = Data[len - 1].id + 1;
          // break;
        }
        axios.post("http://localhost:3001/myorder", product[index])
        axios.patch("http://localhost:3001/myorder/" + Id, { userid: currentuserid })
        // window.location.reload()
        updatecartLen(cartLen=cartLen+1)

      }
      )
    }
  useEffect(() => { getproducts() }, [true])
  useEffect(() => { loggingstatus() }, [true])
  useEffect(() => { getCartLength() }, [])
  const logout = () => {
    localStorage.clear()
    window.location.href = "http://localhost:3000"
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top  navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/#">
              <span style={{fontSize: "30px"}}>Blue Dot</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse ml-auto" id="navbarText">
            <ul className="navbar-nav navv">
              {/* <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li> */}
              <li className="nav-item"><Link className="nav-link" target="_new" id="login" to="/login">{login}</Link></li>
              <li className="nav-item"><button style={{ backgroundColor: "transparent", border: "none" }} className="nav-link" id="logoutbtn" onClick={logout} > {logstatus}{logoutstatus}</button></li>
              <li className="nav-item cart"><Link className="nav-link" to="/cart"> <i style={{ fontSize: "25px" }} className="fa  fa-shopping-cart"> </i>{cartLen}</Link></li>
            </ul>

          </div>
        </div>
      </nav>
      <br /><br /><br /><br />
      <div className="filters container-fluid">
        <ul id="filtersul">
          <li onClick={getproducts}>All</li>
          <li onClick={() => getcat('Electronics')}>Electronics </li>
          <li onClick={() => getcat('Home Appliances')} >Home Appliances</li>
          <li onClick={() => getcat('Fashion')}>Fashion</li>
          <li onClick={() => getcat('Food')}>Food</li>
          <li onClick={() => getcat('Beauty')}>Beauty</li>
          <li onClick={() => getcat('Fitness')}>Fitness</li>
          <li onClick={() => getcat('Grocery')}>Grocery</li>
        </ul>
      </div>
      {
        product.map((info, index) => {
          return (
            <div key={index} className="productCard">
              <div className=" text-center ">
                <img className="productImg " src={info.img}></img>
                <p id="desc">{info.desc}</p>
                <h4 align="center">Rs.{info.price}</h4>
                <button onClick={cart.bind(this, index)} className="btn btn-primary m-1 mb-3">Add to cart</button>
              </div>
            </div>
          )
        })
      }
    </>

  )

}
export default Home;

