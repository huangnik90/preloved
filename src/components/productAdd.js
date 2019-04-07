import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
class ProductAdd extends React.Component{
    state ={selectedFile:null,success:""}

    onChangeHandler = (event)=>{
        //untuk mendapatkan file image
        this.setState({selectedFile:event.target.files[0]})
    }
    valueHandler = ()=>{
        return  this.state.selectedFile ? this.state.selectedFile.name :"Browse Image"
    }
    btnAdd =()=>{
        var discount = this.refs.diskon.value
        var product_name = this.refs.productname.value
        var price = this.refs.productharga.value
       
        var data = {
                product_name,price,discount
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
            })
            .catch((err)=>console.log(err))
        

    }

    


    render(){
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
                                <input type="number" ref="productharga" className="form-control"  placeholder="Price (IDR)" required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Diskon Product</label>
                                <div className="col-sm-9">
                                <input type="number" defaultValue={0} ref="diskon" className="form-control"  placeholder="Diskon" required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Gambar Product</label>
                                <div className="col-sm-9">
                                <input className="form-control btn-success" type="button" onClick={()=>this.refs.input.click()} value={this.valueHandler()}></input>
                                <input ref="input" style={{display:"none"}} type="file" onChange={this.onChangeHandler}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                            <div className="col-3"/>
                        
                                <div className="col-9" style={{textAlign:'center'}}>

                                <button type="button" className="btn btn-warning" onClick={this.btnAdd} style={{width:"100%"}} ><i class="fas fa-plus"></i></button>
                                
                                </div>
                                    
                            </div>


                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductAdd;