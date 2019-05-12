import React from 'react'
import {Link} from 'react-router-dom'
import '../support/product.css'
import axios from 'axios'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {cartLength} from '../1.actions'

class Product extends React.Component{
    state = {dataProduct:[],dataPerPage:12,searchData:'',dataCategory:[],filterCategory:0
}

componentDidMount(){
    this.getProduct()

}

getProduct =()=>{
    axios.get(`http://localhost:2000/product/onsale`)
    .then((res)=>{
        this.setState({dataProduct:res.data})
    })
    .catch((err)=>console.log(err))
}


//--------------------------------ADD CART-----------------------------------------------------------------------------------------------------------------
    addCart = (idProduct)=>{
        var id = this.props.id
        if(id){
            var cart_quantity =1
            var newData = {
                user_id:id,
                product_id:idProduct,
                cart_quantity
            }
            axios.post(`http://localhost:2000/cart/addcart?id=${id}&productid=${idProduct}`,newData)
            .then((res)=>{
                swal("Cart",res.data,"success")
                this.props.cartLength(id)
                this.getProduct()
            })
            .catch((err)=>console.log(err))
        }else{
           
        
           swal({ title: "User Required",
            text: "Please Login or Register first",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/login";
            }
            });
        }


    }
    
    renderProductJsx = ()=>{
        var arrSearchAndFilter = this.state.dataProduct.filter((val) => {
            return val.product_name.toLowerCase().includes(this.state.searchData) 
                    && (parseInt(val.category_id) === parseInt(this.state.filterCategory)||this.state.filterCategory<1)  
        })


        var jsx = arrSearchAndFilter.slice(0,this.state.dataPerPage).map((val)=>{
            if(val.quantity===0){
                return(
                    <div className="card col-md-3 mt-3" style={{width: '18rem'}}>
                        <Link to={`/productdetail/${val.id}`}>
                        <img src={`http://localhost:2000/${val.image}`} className="card-img-top gambarStockAbis" width="20%" alt="..." />
                        </Link>
    
                      <div className="outofstock">OUT OF STOCK</div>
                      {
                          val.discount>0 ? 
                              <div className="diskon">
                          <p>
                              {val.discount} %
                          </p>
                              </div>:null
                      }
                      <div className="card-body">
                      
                      <div className="kategori">
                      <p>Grade: {val.grade}</p>
                      </div> 

                          <p className="card-text">{val.desc}</p>
                      {  
                           val.discount>0?
                          <p className="card-text" style={{fontSize:"12px",display:"inline",textDecoration:"line-through",color:"red"}}>Rp. {val.price}</p>:null
                      }
                          <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"500"}}>Rp. {val.price - (val.price*val.discount/100)}</p>
                          <hr/>
                          <div>
                           <h3>{val.product_name}</h3>
                          </div>
                      </div>
      
                  </div>
                )
            }else{
                return(
                    <div className="card col-md-3 mt-3" style={{width: '18rem'}}>
                    
                        <Link to={`/productdetail/${val.id}`}>
                        <img src={`http://localhost:2000/${val.image}`} className="card-img-top gambar" width="20%" alt="..." />
                       
                        {
                            val.discount>0 ? 
                                <div className="diskon">
                            <p>
                                {val.discount} %
                            </p>
                                </div>:null
                        }
                         </Link>
                        <div className="card-body">
                        
                        <div className="row">
                             <div className="col-6 col-md-6">
                             <div className="kategori">
                        <p>Grade: {val.grade}</p>
                        </div> 
                             </div>
                             <div className="col-6 col-md-6">
                             <div className="addcart">
                                 <p  onClick={()=>this.addCart(val.id)}>Buy <i class="fas fa-shopping-cart"></i></p>
                             </div>
                             </div>
                        </div>
                        
                        <div className="quantity">
                        <p>Available: {val.quantity} Unit(s)</p>
                        </div> 
                      
                            <p className="card-text">{val.desc}</p>
                        {  
                             val.discount>0?
                            <p className="card-text" style={{fontSize:"12px",display:"inline",textDecoration:"line-through",color:"red"}}>Rp. {val.price}</p>:null
                        }
                            <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"500"}}>Rp. {val.price - (val.price*val.discount/100)}</p>
                            <hr/>
                            <div>
                             <h5>{val.product_name}</h5>
                             <hr></hr>
                             
                            </div>
                        </div>
        
                    </div>
                    
                    )  

            }
            
        })
        return jsx
    }
    render(){
        
        return(
            <div className="container wrapProduct">
                <div className="row justify-content-center">
                
                {this.renderProductJsx()}
                <Link to="/product">
                <input type="button" className="AddStyleButton mt-2" style={{border:"1px solid black"}} value="BROWSE MORE"/>
                
                </Link>
                </div>
                
                
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        id : state.user.id
    }
}

export default connect(mapStateToProps,{cartLength})(Product)