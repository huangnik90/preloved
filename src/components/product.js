import React from 'react'
import {Link} from 'react-router-dom'
import '../support/product.css'
import axios from 'axios'

class Product extends React.Component{
    state = {dataProduct:[]
}

componentDidMount(){
    this.getProduct()
}
getProduct =()=>{
    axios.get(`http://localhost:2000/product/getallproduct`)
    .then((res)=>{
        this.setState({dataProduct:res.data})
    })
    .catch((err)=>console.log(err))
}

    renderProductJsx = ()=>{
        var jsx = this.state.dataProduct.map((val)=>{
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
        })
        return jsx
    }
    render(){
        
        return(
            <div className="container wrapProduct">
            <h3 style={{textAlign:"left",marginTop:"10px"}}>Product List</h3>
                <hr></hr>
                <div className="row justify-content-center">
                
                {this.renderProductJsx()}
            
                </div>
            
            </div>
        )
    }
}

export default Product