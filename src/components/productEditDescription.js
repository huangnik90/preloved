import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import PageNotFound from './404';
import {connect} from 'react-redux'

class ProductAddDescription extends React.Component{
    state = {editDataDes:[]}
    componentDidMount(){
        this.getAllDescription()
    }
    getAllDescription = () =>{
        var id = this.props.match.params.id
        
       axios.get(`http://localhost:2000/product/getproductdetailbyid/${id}`)
       .then((res)=>{
           this.setState({editDataDes:res.data})
       })
       .catch((err)=>console.log(err))
    }
    

    onBtnEditDescription =()=>{
        var id_product = this.props.match.params.id   
        var description = this.refs.deskripsi.value
        var grade = this.refs.grade.value
        var extra_note = this.refs.extranote.value
        var newData = {
            id_product,description,grade,extra_note
        }
        
        axios.put(`http://localhost:2000/product/editproductdescription/${id_product}`,newData)
        .then((res)=>{
            swal("ok",res.data,"success")
           
        })
        .catch((err)=>console.log(err))
    }
    renderJsx = ()=>{
        var jsx = this.state.editDataDes.map((val)=>{
            return(
                <fieldset>
                            <div className="head">
                                <h1>PRODUCT EDIT DETAIL</h1>
                            </div>
                            <hr/>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">ID Product</label>
                                <div className="col-sm-9">
                                <input type="text" disabled  value={this.props.match.params.id} className="form-control" ref="idproduct"  required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Grade Quality Product</label>
                                <div className="col-sm-9">
                                <select defaultValue={val.grade} ref="grade" className="form-control" style={{width:"100%"}} >
                                    <option>--- SELECT CATEGORY ---</option>
                                    <option value="A">A - Super Good Condition</option>
                                    <option value="B">B - Good Condition Damages Hardly Seen</option>
                                    <option value="C">C - OK Condition Damages Clearly Seen</option>
                                </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Seller Note</label>
                                <div className="col-sm-9 btn-group">
                                <input defaultValue={val.extra_note} type="text" className="form-control" ref="extranote" placeholder="condition of the item.." required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Deskripsi Product</label>
                                <div className="col-sm-9">
                                <textarea defaultValue={val.description} rows="10" ref="deskripsi" className="form-control"  placeholder="Description" required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                            <div className="col-3"/>
                        
                                <div className="col-9" style={{textAlign:'center'}}>
                               
                                
                                <button type="button" className="btn btn-warning" onClick={this.onBtnEditDescription} style={{width:"100%"}} >
                                <i class="far fa-edit"></i>
                                </button>
                                
                                </div>
                                    
                            </div>
            </fieldset>
            )
            
        })
        return jsx
    }

    render(){
        if(this.props.role===1){
            return(
                <div className="container-fluid form" style={{minHeight:"450px"}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                    <form className="border mb-3" style={{padding:"20px", width:"65%",borderRadius:"5%"}}>
                            {this.renderJsx()}
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

export default connect(mapStateToProp)(ProductAddDescription);