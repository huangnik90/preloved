import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {connect} from 'react-redux'
import PageNotFound from './404';
import '../support/product.css'


class ProductAdd extends React.Component{
    state ={selectedFile:null,success:"",dataCategory:[]}
    componentDidMount(){
        this.getAllCategory()
    }
    getAllCategory =()=>{
        axios.get("http://localhost:2000/category/getallcategory")
        .then((res)=>{
            this.setState({dataCategory:res.data})
        })
        .catch((err)=>console.log(err))
    }
    renderCategoryJSX=()=>{
        var jsx = this.state.dataCategory.map((val,index)=>{
            return(
                <option value={val.id}>{val.category}</option>
            )
        })
        return jsx
    }
    onChangeHandler = (event)=>{
        //untuk mendapatkan file image
        this.setState({selectedFile:event.target.files[0]})
    }
    valueHandler = ()=>{
        return  this.state.selectedFile ? this.state.selectedFile.name :"Browse Image"
    }
    cekNumber = () =>{
        var qty = this.refs.quantity.value
        var diskon = this.refs.diskon.value
        var price = this.refs.productharga.value
        if(qty){
            if(qty <0 || diskon <0 ||price<0){
                swal("Input","Data tidak boleh minus","error")
                this.refs.quantity.value=1
                this.refs.productharga.value=0
            }
        }
    }
    cekdiskon = () =>{
        var diskon = this.refs.diskon.value
        if(diskon){
            if(diskon <0){
                swal("Input","Data tidak boleh minus","error")
                this.refs.diskon.value=0
            }
        }
    }
    btnAdd =()=>{
            var discount = this.refs.diskon.value
            var product_name = this.refs.productname.value
            var price = this.refs.productharga.value
            var category_id = this.refs.category.value
            var quantity = this.refs.quantity.value
         
        if(price===''||product_name===''||category_id==="0" || quantity===""){
            swal("Input Error","Masih ada data kosong.. Harap di cek ulang","error")
        }else{
            var data = {
                    product_name,price,discount,category_id,quantity
                }
                var formData = new FormData()
                formData.append("image",this.state.selectedFile,this.state.selectedFile.name)
                formData.append('data',JSON.stringify(data))
                axios.post("http://localhost:2000/product/addproduct",formData)
                .then((res)=>{
                    console.log(res.data)
                    swal("Ok","Product added","success")
                    this.refs.diskon.value=0
                    this.refs.productname.value=""
                    this.refs.productharga.value=0
                    this.refs.quantity.value=1
                })
                .catch((err)=>console.log(err))
            
        }
        
    }
    
    render(){
        if(this.props.role===1){
            return(
                <div className="container-fluid form" style={{minHeight:"450px"}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                    <form className="border mb-3" style={{padding:"20px", width:"65%",borderRadius:"5%"}}>
                            <fieldset>
                                <div className="head">
                                    <h1>PRODUCT ADD</h1>
                                </div>
                                <hr/>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Nama Product</label>
                                    <div className="col-sm-9">
                                    <input type="text" ref="productname" className="form-control"  placeholder="Product name" required autoFocus/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Harga Product</label>
                                    <div className="col-sm-9">
                                    <input type="number" ref="productharga" className="form-control"   onChange={this.cekNumber} placeholder="Price (IDR)" required autoFocus/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Quantity Product</label>
                                    <div className="col-sm-9">
                                    <input type="number" defaultValue={1} onChange={this.cekNumber} ref="quantity" className="form-control"  placeholder="Stock awal.." required autoFocus/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Diskon Product</label>
                                    <div className="col-sm-9">
                                    <input type="number" defaultValue={0} ref="diskon" onChange={this.cekdiskon} className="form-control"  placeholder="Diskon" required autoFocus/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Category Product</label>
                                    <div className="col-sm-9 btn-group dropdown">
                                    <select ref="category" className="form-control" style={{width:"100%"}} >
                                        <option value="0">--- SELECT CATEGORY ---</option>
                                        {this.renderCategoryJSX()}
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Gambar Product</label>
                                    <div className="col-sm-9 form-inline">
                                    <input className="AddStyleButton" type="button" onClick={()=>this.refs.input.click()} value={this.valueHandler()}></input>
                                    <input ref="input" style={{display:"none"}} type="file" onChange={this.onChangeHandler}></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                <div className="col-3"/>
                            
                                    <div className="col-12" style={{textAlign:'center'}}>
                           
                                    <button type="button" className="AddStyleButton" onClick={this.btnAdd}>Add New Product</button>
                                   
                                    </div>
                                        
                                </div>
    
    
                            </fieldset>
                        </form>
                    </div>
                </div>
            )
        }else{
            return <PageNotFound></PageNotFound>
        }

    }
}

const mapStateToProp = (state)=>{
    return{
       
        role: state.user.role
       
    }
    
  }

export default connect(mapStateToProp)(ProductAdd);