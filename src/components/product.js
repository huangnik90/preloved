import React from 'react'
import {Link} from 'react-router-dom'
import '../support/product.css'
import axios from 'axios'
import QueryString from 'query-string'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {cartLength} from '../1.actions'

class Product extends React.Component{
    state = {dataProduct:[],dataPerPage:12,searchData:'',dataCategory:[],filterCategory:0,filterGrade:''
}

componentDidMount(){
    this.getProduct()
    this.getAllCategory()
    this.getDataUrl()
}

getAllCategory =()=>{
    axios.get("http://localhost:2000/category/getallcategory")
    .then((res)=>{
        this.setState({dataCategory:res.data})
    })
    .catch((err)=>console.log(err))
}

getDataUrl = ()=>{
    if(this.props.location.search){
      var obj = QueryString.parse(this.props.location.search)
      if(obj.query){
        this.setState({searchData:obj.query})
      }if(obj.categoryProduct){
        this.setState({filterCategory:obj.categoryProduct})
      }if(obj.grade){
        this.setState({filterGrade:obj.grade})
      }
    }
  }

renderCategoryJSX=()=>{
    var jsx = this.state.dataCategory.map((val,index)=>{
        return(
            <option value={val.id}>{val.category}</option>
        )
    })
    return jsx
}

loadMore =()=>{
    this.setState({dataPerPage:this.state.dataPerPage+10})
}
getProduct =()=>{
    axios.get(`http://localhost:2000/product/getallproduct`)
    .then((res)=>{
        this.setState({dataProduct:res.data})
    })
    .catch((err)=>console.log(err))
}
onBtnCariSave = ()=>{
    this.pushUrl()
    var search = this.refs.search.value
    this.setState({searchData:search.toLowerCase()})
}
categorySearch=()=>{
    this.pushUrl()
    var searchCategory = this.refs.categoryDropdown.value
    this.setState({filterCategory:searchCategory})
}
gradeSearch=()=>{
    this.pushUrl()
    var grade = this.refs.gradeDropdown.value
    this.setState({filterGrade:grade})
}

pushUrl = ()=>{
    var newLink ='/product/search'
    var params =[]
    //categoryDropdown,search
    if(this.refs.search.value){
        params.push({
            params:'query',
            value:this.refs.search.value
        })
    }
    if(this.refs.categoryDropdown.value){
        params.push({
            params:'categoryProduct',
            value:this.refs.categoryDropdown.value
        })
    }
    if(this.refs.gradeDropdown.value){
        params.push({
            params:'grade',
            value:this.refs.gradeDropdown.value
        })
    }

    for (var i=0;i<params.length;i++){
        if(i===0){
            newLink += '?'+params[i].params+ '='+ params[i].value
        }else{
            newLink += '&'+params[i].params+ '='+ params[i].value
        }
    }
    this.props.history.push(newLink)
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
                this.props.cartLength(id)
                this.getProduct()
                swal("Cart",res.data,"success")

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
                    && (parseInt(val.category_id) === parseInt(this.state.filterCategory)||this.state.filterCategory<1)  &&
                    val.grade.toLowerCase().includes(this.state.filterGrade) 
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
            <div className="row">
                <div className="col-md-2 form-inline">
                    <h3 style={{marginTop:"10px"}}>Product List</h3>
                </div>
                <div className="col-md-2 " style={{marginTop:"10px"}}>
                        <select ref="gradeDropdown" onChange={this.gradeSearch} className="form-control">
                           <option value="">--Grade--</option>
                           <option value="a">--A--</option>
                           <option value="b">--B--</option>
                           <option value="c">--C--</option>
                        </select>
                </div>
                <div className="col-md-2 " style={{marginTop:"10px"}}>
                        <select ref="categoryDropdown" onChange={this.categorySearch} className="form-control">
                        <option value={0}>--CATEGORY--</option>
                            {this.renderCategoryJSX()}
                        </select>
                </div>
                <div className="col-md-4" style={{marginTop:"10px"}}>
                <input type="text" placeholder="Search product.."ref="search" className="form-control"/>
                </div>
                <div className="col-md-2" style={{marginTop:"10px"}}>
                <input type="button" value="Search" onClick={this.onBtnCariSave} className="btn btn-warning"/>
                </div>
             
               
            </div>
               
                
                <hr></hr>
                <div className="row justify-content-center">
                
                {this.renderProductJsx()}
            
                </div><br/>
                {this.state.dataPerPage > this.state.dataProduct.length ? null:
                    <div className="showMore">
                        <p onClick={this.loadMore}>
                            SHOW MORE
                        </p>
                    </div>
                }
                
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