import React from 'react'
import axios from 'axios';
import swal from 'sweetalert'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {cartLength} from '../1.actions'
import '../support/product.css'
import CurrencyFormat from 'react-currency-format';

class ProductOnsale extends React.Component{
    state={data:[]}
    componentDidMount(){
        this.getOnSale()
    }
    getOnSale=()=>{
        axios.get('http://localhost:2000/product/onsale')
        .then((res)=>{
            this.setState({data:res.data})
        })
        .catch((err)=>console.log(err))
    }
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
    renderJsx =()=>{
        var jsx = this.state.data.map((val)=>{
            
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
                              <p className="card-text" style={{fontSize:"12px",display:"inline",textDecoration:"line-through",color:"red"}}>
            <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                               
                               </p>:null
                          }
                              <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"500"}}>
            <CurrencyFormat value={val.price - (val.price*val.discount/100)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                              
                              </p>
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
                            </Link>
                            {
                                val.discount>0 ? 
                                    <div className="diskon">
                                <p>
                                    {val.discount} %
                                </p>
                                    </div>:null
                            }
                            <div className="card-body">
                            
                            <div className="row">
                                 <div className="col-6 col-md-6">
                                 <div className="kategori">
                            <p>Grade: {val.grade}</p>
                            </div> 
                                 </div>
                                 <div className="col-6 col-md-6">
                                 <div className="addcart">
                                     <p  onClick={()=>this.addCart(val.id)}>BUY <i class="fas fa-shopping-cart"></i></p>
                                 </div>
                                 </div>
                            </div>
                            
                            <div className="quantity">
                            <p>Available: {val.quantity} Unit(s)</p>
                            </div> 
                          
                                <p className="card-text">{val.desc}</p>
                            {  
                                 val.discount>0?
                                <p className="card-text" style={{fontSize:"12px",display:"inline",textDecoration:"line-through",color:"red"}}>
            <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                                
                                </p>:null
                            }
                                <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"599",fontSize:"26px"}}>
            <CurrencyFormat value={val.price - (val.price*val.discount/100)} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <div>{value}</div>} />
                                
                                </p>
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
        return(<div className="container">
                    
                   
                        <div className="row justify-content-center">
                                  {this.renderJsx()}
                        </div>
                        <div>
                       <br></br>
                        
                        
                       
                        
                    </div>
                    <div className="onSale "> 
                    <Link to="/product" style={{textDecoration:"none",color:'grey'}}>
                    SHOP NOW
                    </Link>
                 
                    </div>
                  
                  
              
            </div>)
    }
}
const mapStateToProps = (state)=>{
    return{
        id : state.user.id
    }
}
export default connect(mapStateToProps,{cartLength})(ProductOnsale);