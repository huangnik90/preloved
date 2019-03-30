import React from 'react'
import {Link} from 'react-router-dom'
import '../support/product.css'

class Product extends React.Component{
    state = {dataProduct:[
        {id:1, namaProduct:"item #1",category:"tas", harga:200000,diskon:0,deskripsi:"ini adalah item#1",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545041708/569712_1B90X_3154_002_075_0000_Light.jpg"},
        {id:2, namaProduct:"item #2",category:"tas", harga:500000,diskon:10,deskripsi:"ini adalah item#2",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545042621/569712_1B90X_1000_002_075_0000_Light.jpg"},
        {id:3, namaProduct:"item #3",category:"tas", harga:800000,diskon:50,deskripsi:"ini adalah item#3",img:"https://media.gucci.com/style/White_South_0_160_470x470/1545326107/564714_05J0X_6433_002_080_0000_Light.jpg"},
        {id:4, namaProduct:"item #4",category:"aksesoris", harga:5000000,diskon:0,deskripsi:"ini adalah item#4",img:"https://media.gucci.com/style/White_South_0_160_470x470/1473095707/451268_K551N_8666_001_080_0000_Light.jpg"}
    ]
}

    renderProductJsx = ()=>{
        var jsx = this.state.dataProduct.map((val)=>{
            
            return(
                
            <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                
                <img src={val.img} className="card-img-top gambar" width="200px" height="200px;" alt="..." />
            
                {
                    val.diskon>0 ? 
                        <div className="diskon">
                    <p>
                        {val.diskon} %
                    </p>
                        </div>:null
                }
                <div className="card-body">
                <div className="kategori">
                <p >{val.category}</p>
                </div>
                    <p className="card-text">{val.desc}</p>
                {  
                     val.diskon>0?
                    <p className="card-text" style={{display:"inline",textDecoration:"line-through",color:"red"}}>Rp. {val.harga}</p>:null
                }
                    <p className="card-text" style={{marginLeft:"5px",display:"inline",color:"black",fontWeight:"500"}}>Rp. {val.harga - (val.harga*val.diskon/100)}</p>
                    <hr/>
                    {this.props.username!==""?
                    <input type="button" className="d-block btn border-warning" onClick={() =>this.addCart(val)}value="Add to Cart"/>
                    : 
                    <Link to="/login"><input type="button" className="d-block btn border-warning" value="Add to Cart"/></Link>
                    }
                </div>

            </div>
            
            )  
        })
        return jsx
    }
    render(){
        
        return(
            <div className="container">
                <div className="row justify-content-center">
                {this.renderProductJsx()}
                </div>
             
            </div>
        )
    }
}

export default Product