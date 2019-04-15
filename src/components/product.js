import React from 'react'
import {Link} from 'react-router-dom'
import '../support/product.css'
import axios from 'axios'
import QueryString from 'query-string'

class Product extends React.Component{
    state = {dataProduct:[],dataPerPage:12,searchData:'',dataCategory:[],filterCategory:0
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

    for (var i=0;i<params.length;i++){
        if(i===0){
            newLink += '?'+params[i].params+ '='+ params[i].value
        }else{
            newLink += '&'+params[i].params+ '='+ params[i].value
        }
    }
    this.props.history.push(newLink)
}
    renderProductJsx = ()=>{
        var arrSearchAndFilter = this.state.dataProduct.filter((val) => {
            return val.product_name.toLowerCase().includes(this.state.searchData) 
                    && (parseInt(val.category_id) === parseInt(this.state.filterCategory)||this.state.filterCategory<1)  
        })


        var jsx = arrSearchAndFilter.slice(0,this.state.dataPerPage).map((val)=>{
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
            <div className="row">
                <div className="col-md-9 form-inline">
                    <h3 style={{marginTop:"10px"}}>Product List</h3>
                </div>
                <div className="col-md-3 " style={{marginTop:"10px"}}>
                        <select ref="categoryDropdown" onChange={this.categorySearch} className="form-control">
                        <option value={0}>--- SELECT CATEGORY ---</option>
                            
                            {this.renderCategoryJSX()}
                        </select>
                        <input type="text" placeholder="Search product.."ref="search" className="form-control"/>
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

export default Product