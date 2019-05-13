import React from 'react'
import ReactImageMagnify from 'react-image-magnify';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import {cartLength} from '../1.actions'
class ProductDetail extends React.Component{
    
    state = {quantity:"",detailProduct:[],number:1}

    componentDidMount(){
        this.getDetailProduct()
    }
    getDetailProduct= ()=>{
        var id = this.props.match.params.id
        axios.get(`http://localhost:2000/product/getdetailproductbyid/${id}`)
        .then((res)=>{
            this.setState({detailProduct:res.data[0]})
        })
        .catch((err)=>console.log(err))
    }

    cekQuantity = ()=>{
        var jumlah = this.refs.quantity.value
        if (jumlah<1){
            this.refs.quantity.value=1
            this.setState({quantity:"Try Again"})
        }else{
            this.setState({quantity:""})
        }
    }
    addCart=()=>{
        var id = this.props.id
        var buyer_note = this.refs.buyer_note.value
        var product_id = this.props.match.params.id
       // var cart_quantity = this.refs.quantity.value
        var cart_quantity = this.state.number
        var stockItem = this.state.detailProduct.quantity
      // alert("product ID: "+id +"\nproduct ID ambil dari state: " +product+"\nproduct ambil dr url: "+ product2 +"\nquantity: "+quantity)
       
      if(cart_quantity>stockItem){
          swal("Warning",`Stock Item : ${stockItem} Unit, tolong di check kembali pembelian`,"info")
      }else{
        var newData = {
            user_id:id,
            product_id,
            cart_quantity,
            buyer_note
        }
        axios.post(`http://localhost:2000/cart/addcart?id=${id}&productid=${product_id}`,newData)
        .then((res)=>{
            swal("Cart",res.data,"success")
            this.props.cartLength(id)
            this.getDetailProduct()

        })
        .catch((err)=>console.log(err))
      }
      
     

    }

    render(){
        var {id,price,discount,category,description,extra_note,
            image,
            product_name,
            grade,quantity} = this.state.detailProduct
        return(
        <div className="container justify-content-sm-center ml-auto mr-auto mt-3">
            <div className="row">
                <div className="col-6 col-md-6">
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src:`http://localhost:2000/${image}`,
                        },
                        
                        largeImage: {
                            src: `http://localhost:2000/${image}`,
                    
                            width: 1200,
                            height: 1800
                        },
                        enlargedImagePosition:"over"
                        // enlargedImagePortalId:"gambargede",
                        
                        
                    }} />

                </div>
                <div className="col-6 col-md-6">
                    <h1>Product Detail #{id}:<br/>{product_name} </h1>
                    <hr/>
                    <p>
                    {description}
                    </p>
                    <hr/>
                    <ul className="ml-4">
                        <li>Category: {category}</li>
                        <li>Grade Quality: {grade}</li>
                        <li>Price Item: Rp. {price} / {discount}% = Rp. {price-(price*discount/100)}</li>
                        <li>Extra Note: {extra_note}</li>
                        <li>Stock Item: {quantity}</li>
                    </ul>
                    <hr/>
                    <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Jumlah
                                </div>
                                <i style={{color:"#FB9900"}} class="fas fa-minus-circle" onClick={()=>{
                                    if(this.state.number<2){
                                        this.setState({number:1})
                                    }else{
                                        this.setState({number:this.state.number-1})

                                    }
                                }}></i>
                                <span style={{marginLeft:"20px",marginRight:"20px"}}>{this.state.number}</span>
                                <i style={{color:"#FB9900"}} class="fas fa-plus-circle" onClick={()=>{this.setState({number:this.state.number+1})}}></i>
                                
                                {/* <input type="number" ref="quantity" min={1} className="form-control" onChange={this.cekQuantity} defaultValue="1" style={{marginTop:"13px",width:"60px"}}></input>
                    <div style={{color:"red",fontSize:"12px"}}> {this.state.quantity}</div> */}
                                 <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Catatan Untuk Penjual <i class="far fa-comments"></i> 
                                </div>
                                <input type="text" ref="buyer_note" placeholder="CONTOH: WARNA, UKURAN ATAU DESIGN" className="form-control" style={{marginTop:"13px"}}></input>
                    <br></br>
                
                    {this.props.id !==0 ?
                     <input type="button" className="btn border-warning col-md-4" value="Masukan Keranjang" onClick={this.addCart}/>
                    :
                    <Link to="/login">
                     <input disable type="button" className="btn border-success col-md-4" value="Redirect to Login"/> 
                    </Link>
                     
                    }
                   
                    
                </div>
                
            </div>
                <hr></hr>
                   {/* <div id="gambargede"></div> */}
        </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        id:state.user.id
    }
}
export default connect(mapStateToProps,{cartLength})(ProductDetail);