import React from 'react'
import ReactImageMagnify from 'react-image-magnify';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class ProductDetail extends React.Component{
    
    state = {quantity:"",detailProduct:[]}

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
        alert(this.props.id +" product id:" + this.state.detailProduct.id)
    }

    render(){
        var {id,price,discount,category,description,extra_note,
            image,
            product_name,
            grade} = this.state.detailProduct
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
                    <h1>Product Detail {id} : {product_name} </h1>
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
                    </ul>
                    <hr/>
                    <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Jumlah
                                </div>
                                <input type="number" ref="quantity" min={1} className="form-control" onChange={this.cekQuantity} defaultValue="1" style={{marginTop:"13px",width:"60px"}}></input>
                    <div style={{color:"red",fontSize:"12px"}}> {this.state.quantity}</div>
                                 <div style={{fontSize:"14px",fontWeight:"700",marginTop:"10px"}} >
                                Catatan Untuk Penjual <i class="far fa-comments"></i> 
                                </div>
                                <input type="text" ref="pesanPenjual" placeholder="CONTOH: WARNA, UKURAN ATAU DESIGN" className="form-control" style={{marginTop:"13px"}}></input>
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
export default connect(mapStateToProps)(ProductDetail);